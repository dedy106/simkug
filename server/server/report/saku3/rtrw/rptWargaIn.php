<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rtrw_rptWargaIn extends server_report_basic
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
		$sql="select a.no_masuk,a.tanggal, a.kode_rumah, a.nik,a.sts_masuk,b.nama
		from rt_warga_in a
		inner join rt_warga b on a.nik=b.nik 
		
		$this->filter
 		order by a.no_masuk ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar warga masuk",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>No. Masuk</td>	
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='150' align='center' class='header_laporan'>Kode Rumah</td>
	<td width='150' align='center' class='header_laporan'>NIK</td>
    <td width='200' align='center' class='header_laporan'>Pemilik</td>	
    <td width='200' align='center' class='header_laporan'>Status Masuk</td>
 </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_masuk</td>  
    <td class='isi_laporan'>$row->tanggal</td>
			<td class='isi_laporan'>$row->kode_rumah</td>
			<td class='isi_laporan'>$row->nik</td>
			<td class='isi_laporan'>$row->nama</td>
 			<td class='isi_laporan'>$row->sts_masuk</td>
   </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
