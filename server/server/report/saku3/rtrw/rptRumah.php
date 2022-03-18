<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rtrw_rptRumah extends server_report_basic
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
		$sql="select kode_rumah,alamat, rt, rw,no_tel,status_huni,kode_pemilik,pbb,pln from rt_rumah
		$this->filter
 			order by kode_rumah ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar rumah",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode Rumah</td>	
    <td width='500' align='center' class='header_laporan'>Alamat</td>
    <td width='150' align='center' class='header_laporan'>RT</td>
	<td width='150' align='center' class='header_laporan'>RW</td>
    <td width='200' align='center' class='header_laporan'>Telp</td>
 	<td width='150' align='center' class='header_laporan'>Status Huni</td>
    <td width='200' align='center' class='header_laporan'>Kode Pemilik</td>
  	<td width='150' align='center' class='header_laporan'>PBB</td>
    <td width='200' align='center' class='header_laporan'>PLN</td>
 </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_rumah</td>  
    <td class='isi_laporan'>$row->alamat</td>
			<td class='isi_laporan'>$row->rt</td>
			<td class='isi_laporan'>$row->rw</td>
			<td class='isi_laporan'>$row->no_tel</td>
 			<td class='isi_laporan'>$row->status_huni</td>
			<td class='isi_laporan'>$row->kode_pemilik</td>
			<td class='isi_laporan'>$row->pbb</td>
 			<td class='isi_laporan'>$row->pln</td>
   </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
