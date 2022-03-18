<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_saiba_rptRegis extends server_report_basic
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
		$sql="select a.register, a.nonpln,a.kdvalas,a.tglnpln,a.kddonor,a.kdkreditor,a.nmdonor from t_regist a
		$this->filter
 			 ";
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar register","","");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='150' align='center' class='header_laporan'>REGISTER</td>
    <td width='150' align='center' class='header_laporan'>No.NPLN</td>
    <td width='150' align='center' class='header_laporan'>VALAS</td>
    <td width='150' align='center' class='header_laporan'>TGL.NPLN</td>
    <td width='300' align='center' class='header_laporan'>DONOR</td>
    <td width='300' align='center' class='header_laporan'>KREDITOR</td>
    <td width='300' align='center' class='header_laporan'>NAMA DONOR</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$row->register</td>
    <td class='isi_laporan' align='center'>$row->nonpln</td>
   <td class='isi_laporan' align='center'>$row->kdvalas</td>
    <td class='isi_laporan' align='center'>$row->tglnpln</td>
   <td class='isi_laporan' align='center'>$row->kddonor</td>
    <td class='isi_laporan' align='center'>$row->kdkreditor</td>
    <td class='isi_laporan' align='center'>$row->nmdonor</td>
</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
