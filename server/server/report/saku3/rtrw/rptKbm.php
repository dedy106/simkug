<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rtrw_rptKbm extends server_report_basic
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
		$sql="select kode_rumah,id_kartu, no_polisi, jenis,merk,tipe,pemilik from rt_kbm
		$this->filter
 			order by kode_rumah ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar kendaraan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode Rumah</td>	
    <td width='500' align='center' class='header_laporan'>ID Kartu</td>
    <td width='150' align='center' class='header_laporan'>No. Polisi</td>
	<td width='150' align='center' class='header_laporan'>Jenis</td>
    <td width='200' align='center' class='header_laporan'>Merk</td>
 	<td width='150' align='center' class='header_laporan'>Type</td>
    <td width='200' align='center' class='header_laporan'>Pemilik</td>
 </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_rumah</td>  
    <td class='isi_laporan'>$row->id_kartu</td>
			<td class='isi_laporan'>$row->no_polisi</td>
			<td class='isi_laporan'>$row->jenis</td>
			<td class='isi_laporan'>$row->merk</td>
 			<td class='isi_laporan'>$row->tipe</td>
			<td class='isi_laporan'>$row->pemilik</td>
   </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
