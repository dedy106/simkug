<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sppd_rptUhar extends server_report_basic
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
		$sql="select a.sts_spj,a.kode_jab, a.nilai,b.nama 
from sp_uhar a 
inner join sp_jab b on a.kode_jab=b.kode_jab and a.kode_lokasi=b.kode_lokasi 
$this->filter
order by a.kode_jab ";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Uang Harian",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo 
		"<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
		<tr bgcolor='#CCCCCC'>
			<td width='30' align='center' class='header_laporan'>No</td>
			<td width='60' align='center' class='header_laporan'>Status</td>
			<td width='80' align='center' class='header_laporan'>Kode</td>
			<td width='250' align='center' class='header_laporan'>Nama Jabatan</td>
			<td width='100' align='center' class='header_laporan'>Nilai</td>
			
		</tr>
		";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
		
		echo 
		"<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->sts_spj</td>
			<td class='isi_laporan'>$row->kode_jab</td>
			<td class='isi_laporan'>$row->nama </td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
			
		</tr>
		";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
