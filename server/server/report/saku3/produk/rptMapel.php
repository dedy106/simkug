<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_produk_rptMapel extends server_report_basic
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
		$sql="select a.kode_matpel, a.nama, a.sifat, a.keterangan
		from sis_matpel a
		
		$this->filter
 			order by kode_matpel ";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar mata pelajaran",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>Kode Pelajaran</td>
    <td width='250' align='center' class='header_laporan'>Nama</td>
     <td width='250' align='center' class='header_laporan'>Sifat</td>
    <td width='250' align='center' class='header_laporan'>Keterangan</td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
<td class='isi_laporan' align='center'>$i</td>
<td class='isi_laporan'>$row->kode_matpel</td>
		<td class='isi_laporan'>$row->nama</td>
<td class='isi_laporan'>$row->sifat</td>
		<td class='isi_laporan'>$row->keterangan</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
