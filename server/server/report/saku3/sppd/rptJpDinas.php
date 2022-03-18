<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sppd_rptJpDinas extends server_report_basic
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
		$sql="select a.sts_spj, a.nama, a.kode_lokasi 
		from sp_status a
		
		$this->filter
 			order by sts_spj ";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Jenis Perjalanan Dinas",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo 
			"<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
			<tr bgcolor='#CCCCCC'>
				<td width='30' align='center' class='header_laporan'>No</td>
				<td width='150' align='center' class='header_laporan'>Kode</td>
				<td width='300' align='center' class='header_laporan'>Nama </td>
				
			</tr>
			";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo 
			"<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row->sts_spj</td>
				<td class='isi_laporan'>$row->nama</td>
			
			</tr>
			";		 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
