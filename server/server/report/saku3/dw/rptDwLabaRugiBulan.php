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
class server_report_saku3_dw_rptDwLabaRugiBulan extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
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
		$tahun=$tmp[1];
		$bentuk=$tmp[2];
		$jenis=$tmp[3];
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan laba rugi",$this->lokasi,"Tahun $tahun");
		echo "<table width='2000' border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' class='kotak'>
<tr bgcolor='#CCCCCC' >
    <td rowspan='2'  class='header_laporan' align='center'>Keterangan</td>
    <td height='20' colspan='3'  class='header_laporan' align='center'>Januari</td>
    <td colspan='3'  class='header_laporan' align='center'>Februari</td>
    <td colspan='3'  class='header_laporan' align='center'>Maret </td>
    <td colspan='3'  class='header_laporan' align='center'>April</td>
	<td colspan='3'  class='header_laporan' align='center'>Mei</td>
    <td colspan='3'  class='header_laporan' align='center'>Juni </td>
    <td colspan='3'  class='header_laporan' align='center'>Juli</td>
	<td colspan='3'  class='header_laporan' align='center'>Agustus</td>
    <td colspan='3'  class='header_laporan' align='center'>September </td>
    <td colspan='3'  class='header_laporan' align='center'>Oktober</td>
	<td colspan='3'  class='header_laporan' align='center'>November</td>
    <td colspan='3'  class='header_laporan' align='center'>Desember </td>
	<td colspan='3'  class='header_laporan' align='center'>Total </td>
   </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
	 <td width='80  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
	<td width='80' class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
    <td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
	<td width='80'  class='header_laporan' align='center'>Sisa</td>
    <td width='80'  class='header_laporan' align='center'>Anggaran</td>
    <td width='80'  class='header_laporan' align='center'>Realisasi</td>
	<td width='80'  class='header_laporan' align='center'>Sisa</td>
  </tr>
	";
		$sql = "select a.kode_neraca,a.nama,a.level_spasi,a.tipe,a.kode_lokasi,a.tipe,a.kode_fs,
	   case when a.jenis_akun='Beban' then a.n1 else -a.n1 end as n1,
	   case when a.jenis_akun='Beban' then a.n2 else -a.n2 end as n2,
	   case when a.jenis_akun='Beban' then a.n3 else -a.n3 end as n3,
	   case when a.jenis_akun='Beban' then a.n4 else -a.n4 end as n4,
	   case when a.jenis_akun='Beban' then a.n5 else -a.n5 end as n5,
	   case when a.jenis_akun='Beban' then a.n6 else -a.n6 end as n6,
	   case when a.jenis_akun='Beban' then a.n7 else -a.n7 end as n7,
	   case when a.jenis_akun='Beban' then a.n8 else -a.n8 end as n8,
	   case when a.jenis_akun='Beban' then a.n9 else -a.n9 end as n9,
	   case when a.jenis_akun='Beban' then a.n10 else -a.n10 end as n10,
	   case when a.jenis_akun='Beban' then a.n11 else -a.n11 end as n11,
	   case when a.jenis_akun='Beban' then a.n12 else -a.n12 end as n12,
	   case when a.jenis_akun='Beban' then a.n13 else -a.n13 end as n13,
	   case when a.jenis_akun='Beban' then a.r1 else -a.r1 end as r1,
	   case when a.jenis_akun='Beban' then a.r2 else -a.r2 end as r2,
	   case when a.jenis_akun='Beban' then a.r3 else -a.r3 end as r3,
	   case when a.jenis_akun='Beban' then a.r4 else -a.r4 end as r4,
	   case when a.jenis_akun='Beban' then a.r5 else -a.r5 end as r5,
	   case when a.jenis_akun='Beban' then a.r6 else -a.r6 end as r6,
	   case when a.jenis_akun='Beban' then a.r7 else -a.r7 end as r7,
	   case when a.jenis_akun='Beban' then a.r8 else -a.r8 end as r8,
	   case when a.jenis_akun='Beban' then a.r9 else -a.r9 end as r9,
	   case when a.jenis_akun='Beban' then a.r10 else -a.r10 end as r10,
	   case when a.jenis_akun='Beban' then a.r11 else -a.r11 end as r11,
	   case when a.jenis_akun='Beban' then a.r12 else -a.r12 end as r12,
	   case when a.jenis_akun='Beban' then a.r13 else -a.r13 end as r13
from exs_neraca_tahun a
$this->filter and a.modul='L' 
order by a.rowindex ";
		
		$rs = $dbLib->execute($sql);	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";$n10="";$n11="";$n12="";
			
			echo "<tr>
				<td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>";
			
			
				echo "<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r1,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n1-$row->r1,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r2,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n2-$row->r2,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r3,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n3-$row->r3,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r4,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n4-$row->r4,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r5,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n5-$row->r5,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r6,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n6-$row->r6,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r7,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n7-$row->r7,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r8,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n8-$row->r8,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r9,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n9-$row->r9,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r10,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n10-$row->r10,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r11,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n11-$row->r11,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r12,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n12-$row->r12,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n13,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->r13,0,',','.')."</td>";
				echo "<td class='isi_laporan' align='right'>".number_format($row->n13-$row->r13,0,',','.')."</td>";
			
			
			echo "<tr>";
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	
	
}
?>
