<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku2_kopeg_sju_rptGlPasivaRincianSimulasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
		$kode_lokasi2=$tmp[3];
		$kode_fs=$tmp[4];
		$cabang="";
		if ($kode_lokasi2=="")
		{
			if ($kode_lokasi=="00") {$cabang="KANTOR PUSAT";};
			if ($kode_lokasi=="01") {$cabang="KANTOR JAKARTA";};
			if ($kode_lokasi=="02") {$cabang="KANTOR BANDUNG";};
			if ($kode_lokasi=="03") {$cabang="KANTOR SEMARANG";};
			if ($kode_lokasi=="04") {$cabang="KANTOR SURABAYA";};
			if ($kode_lokasi=="05") {$cabang="KANTOR SOLO";};
		}
		if ($kode_lokasi2=="")
		{
			$kode_lokasi2=$kode_lokasi;
		}
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
		$sql="call sp_produk_sju '$kode_fs','N','S','1','$periode','$periode_rev','$kode_lokasi','$kode_lokasi','$kode_lokasi2','$nik_user' ";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n2,n3,n4*-1 as n4,n5*-1 as n5
			from neraca_tmp 
			where nik_user='$nik_user' and modul='P'
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo "<table border='0' cellspacing='0' cellpadding='0' width ='100%'>
  <tr>
    <td colspan='2' class='lokasi_laporan' align='center'>PT SARANA JANESIA UTAMA</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>RINCIAN LAPORAN POSISI KEUANGAN $cabang</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Per $bulan $tahun dan $bulan $tahun_rev</td>
  </tr>
 
</table>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='300' class='header_laporan'>URAIAN</td>
	
   <td width='90' class='header_laporan'>REALISASI TAHUN $tahun_rev</td>
    <td width='90' class='header_laporan'>REALISASI  S/D $bulan $tahun</td>
    <td width='90' class='header_laporan'>NAIK / (TURUN)</td>
	<td width='50' class='header_laporan'>GROWTH</td>
  </tr>
    <tr align='center' bgcolor='#dbeef3'>
    <td width='300' class='header_laporan'>&nbsp;</td>
   <td width='90' class='header_laporan'>1</td>
    <td width='90' class='header_laporan'>2</td>
    <td width='90' class='header_laporan'>(2-1)</td>
	<td width='50' class='header_laporan'>(2/1)</td>
 </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="-'";
			
			
			$n2="";	$n3="";	$n4="";	$n5=""; $selisih="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$selisih=number_format($row->n4-$row->n5,0,",",".");
				if ($row->n5 > 0)
				{
					$persen1=(($row->n4 / $row->n5)*100)-100;
				}
			}
		
			echo "<tr>
    <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting")
			{
				echo ucwords(strtolower($row->nama));
			}
			else
			{
				echo $row->nama;
			}
			
			echo "</td>
     <td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n5 != 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$kode_lokasi','$periode_rev');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td>
    <td  class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n4 != 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$kode_lokasi','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>
   <td valign='top' class='isi_laporan' align='right'>$selisih</td>
   <td valign='top' class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
	
	
		
		echo "</div>";
		return "";
	}
	
}
?>
