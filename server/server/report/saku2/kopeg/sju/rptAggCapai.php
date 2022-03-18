<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptAggCapai extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		
		return $totPage;
	}

	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$lokasi=$tmp[2];
		$jenis=$tmp[3];
		$tahun=substr($periode,0,4);
		$tahun_rev=strval(intval($tahun)-1);
		$bulan=substr($periode,4,2);
		$periode_rev=strval(intval($tahun)-1).$bulan;
		if ($bulan=="01") {$bulan="JANUARI";};
		if ($bulan=="02") {$bulan="FEBRUARI";};
		if ($bulan=="03") {$bulan="MARET";};
		if ($bulan=="04") {$bulan="APRIL";};
		if ($bulan=="05") {$bulan="MEI";};
		if ($bulan=="06") {$bulan="JUNI";};
		if ($bulan=="07") {$bulan="JULI";};
		if ($bulan=="08") {$bulan="AGUSTUS";};
		if ($bulan=="09") {$bulan="SEPTEMBER";};
		if ($bulan=="10") {$bulan="OKTOBER";};
		if ($bulan=="11") {$bulan="NOVEMBER";};
		if ($bulan=="12") {$bulan="DESEMBER";};
		if ($bulan=="13") {$bulan="DESEMBER";};
		
		$sql="exec sp_agg_capai_sju '$lokasi','$jenis','$periode','$periode_rev','$nik_user' ";
		$rs = $dbLib->execute($sql);
		
		$sql = "select  a.kode_akun, a.kode_lokasi, substring(a.periode,1,4) as tahun, a.nama_akun, a.periode, 
		case when b.jenis='Pendapatan' then -n1 else n1 end as n1,
		case when b.jenis='Pendapatan' then -n2 else n2 end as n2,
		case when b.jenis='Pendapatan' then -n3 else n3 end as n3,
		case when b.jenis='Pendapatan' then -n4 else n4 end as n4,
		case when b.jenis='Pendapatan' then -n5 else n5 end as n5
from glma_drk_tmp a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.nik_user='$nik_user' ".$this->filter." order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];		
		$i = $start+1;
		if ($i<0) {$i=1;}
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pencapaian anggaran beban",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1100'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='30' rowspan='3' class='header_laporan'>No</td>
    <td width='80' rowspan='3' class='header_laporan'>Kode Akun </td>
    <td width='250' rowspan='3' class='header_laporan'>Nama Akun </td>
    <td colspan='2' class='header_laporan'>ANGGARAN</td>
    <td colspan='2' class='header_laporan'>REALISASI</td>
    <td colspan='2' rowspan='2' class='header_laporan'>'% PENCAPAIAN</td>
    <td rowspan='2' class='header_laporan'>% GROWTH</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>TH $tahun</td>
    <td align='center' class='header_laporan'>S/D $bulan $tahun</td>
    <td align='center' class='header_laporan'>S/D $bulan $tahun</td>
    <td align='center' class='header_laporan'>S/D $bulan $tahun_rev</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>1</td>
    <td width='90' align='center' class='header_laporan'>2</td>
    <td width='90' align='center' class='header_laporan'>3</td>
    <td width='90' align='center' class='header_laporan'>4</td>
    <td width='60' align='center' class='header_laporan'>(3)/(1)</td>
    <td width='60' align='center' class='header_laporan'>(3)/(2)</td>
    <td width='60' align='center' class='header_laporan'>(3)/(4)</td>
  </tr>
";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$persen1="'";$persen2="'";$persen3="'";
			if ($row->n1 > 0)
			{
				$persen1=($row->n4 *100 )/ $row->n1;
			}
			if ($row->n2 > 0)
			{
				$persen2=($row->n4 *100 )/ $row->n2;
			}
			if ($row->n5 > 0)
			{
				$persen3=($row->n4 *100 )/ $row->n5;
			}
			echo "<tr><td class='isi_laporan'><div align='center'>$i</div></td>
    <td height='20' class='isi_laporan' >".$AddOnLib->fnAkun($row->kode_akun)."</td>
    <td class='isi_laporan'>$row->nama_akun</td>
     <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
		 <td class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
		  <td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."</td>
    <td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr><td class='isi_laporan' colspan='3' align='center'>Total</td>
    
     <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
	   <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
	    <td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
		 <td class='isi_laporan' align='center'>&nbsp;</td>
		  <td class='isi_laporan' align='center'>&nbsp;</td>
    <td class='isi_laporan' align='center'>&nbsp;</td>
  </tr>";
		
		echo "</table></div>";
		return "";
	}
	
}

