<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_produk_rptAggPakai extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$nik_user=$tmp[3];
		$sql="exec sp_agg_pakai_pp '$kode_lokasi','$jenis','$periode','$nik_user';";
		
		$rs = $dbLib->execute($sql);
		$sql = "select  a.kode_akun,a.kode_pp,c.nama as nama_pp, a.kode_lokasi, substring(a.periode,1,4) as tahun, a.nama_akun, a.periode, 
		a.kode_pp,c.nama as nama_pp,
		case when b.jenis='Pendapatan' then -n1 else n4 end as n1,
		case when b.jenis='Pendapatan' then -n2 else n4 end as n2,
		case when b.jenis='Pendapatan' then -n3 else n4 end as n3,
		case when b.jenis='Pendapatan' then -n4 else n4 end as n4,
		case when b.jenis='Pendapatan' then -n5 else n5 end as n5
from glma_drk_tmp a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter and a.nik_user='$nik_user'
order by a.kode_akun";
		
		$rs = $dbLib->execute($sql);		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];		
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pemakaian anggaran beban",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='27' rowspan='2'  class='header_laporan' align='center'>No</td>
    <td width='69' rowspan='2'  class='header_laporan' align='center'>Kode Akun</td>
    <td width='250' rowspan='2' class='header_laporan' align='center'>Nama Akun </td>
	<td width='60' rowspan='2'  class='header_laporan' align='center'>Kode PP</td>
    <td width='200' rowspan='2' class='header_laporan' align='center'>Nama PP </td>
    <td width='90' rowspan='2' class='header_laporan' align='center'>Target / Tahun </td>
    <td width='90' rowspan='2' class='header_laporan' align='center'>Target S.D Bulan Berjalan </td>
	<td width='90' rowspan='2' class='header_laporan' align='center'>Target Bulan Berjalan </td>
    <td height='25' colspan='2' class='header_laporan' align='center'>Realisasi</td>
    <td width='90' rowspan='2' class='header_laporan' align='center'> Sisa Anggaran </td>
  </tr>
   <tr bgcolor='#CCCCCC'>
    <td width='90' height='25' class='header_laporan' align='center'>Bulan Berjalan </td>
    <td width='90' class='header_laporan' align='center'>S.D Bulan Berjalan </td>
  </tr>";
		
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$sisa=$sisa+($row->n1-$row->n5);
			echo "<tr><td class='isi_laporan'><div align='center'>$i</div></td>
    <td height='20' class='isi_laporan'>".$AddOnLib->fnAkun($row->kode_akun)."</td>
    <td class='isi_laporan'>$row->nama_akun</td>
	<td class='isi_laporan'>$row->kode_pp</td>
	<td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan' align='right'>";
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n1,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right' >".number_format($row->n2,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n3,0,',','.')."</div></td>
	<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n4,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->kode_akun','$row->kode_lokasi','$row->tahun');\">".number_format($row->n5,0,',','.')."</a>";
			echo "</td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n1-$row->n5,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		echo "<tr>
    <td height='20' colspan='5' class='sum_laporan'><div align='right'>Total</div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n1,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n2,0,',','.')."</span></div></td>
	<td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n3,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n4,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($n5,0,',','.')."</span></div></td>
    <td class='header_laporan'><div align='right'><span class='sum_laporan'>".number_format($sisa,0,',','.')."</span></div></td>
  </tr>";
		
		echo "</table></div>";
		return "";
	}
	
}

