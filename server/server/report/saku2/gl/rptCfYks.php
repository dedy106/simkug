<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptCfYks extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi1=$tmp[1];
		if ($kode_lokasi1=="01") { $lokasi="AREA I";}
		if ($kode_lokasi1=="02") { $lokasi="AREA II";}
		if ($kode_lokasi1=="03") { $lokasi="AREA III";}
		if ($kode_lokasi1=="04") { $lokasi="AREA IV";}
		if ($kode_lokasi1=="05") { $lokasi="AREA V";}
		if ($kode_lokasi1=="06") { $lokasi="AREA VI";}
		if ($kode_lokasi1=="07") { $lokasi="AREA VII";}
		if ($kode_lokasi1=="99") { $lokasi="PUSAT";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="07") { $lokasi="SELURUH AREA [I - VII]";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="99") { $lokasi="KONSOLIDASI NASIONAL";}
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,jenis_akun,tipe,level_spasi,n4,n8,case when n1<>0 then (n2-n1)/n1 else 0 end as growth 
from neraca_tmp 
where nik_user='$nik_user' 
order by rowindex ";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN ARUS KAS<br>PERIODE $periode <br></div>$tanggal";
		echo "<div align='center'>$judul<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
	<td width='60' class='header_laporan'><div align='center'>Kode CF</div></td>
    <td width='400' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td width='100' class='header_laporan'><div align='center'>Nilai</div></td>
</tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
	<td height='20' class='isi_laporan' align='center'>$row->kode_neraca</td>		
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
	if (($row->tipe!="Header" && $row->nama!="." && $row->nama!="") || $row->jenis_akun=="SA")
	{
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,",",".")."</div></td>";
	
	}
	else
	{
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
	}
		
		echo "</tr>";
			
			$i=$i+1;
		}
			
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
