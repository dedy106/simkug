<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_saiba_rptLender extends server_report_basic
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
		$sql="select a.kdlender, a.nmlender1,a.nmlender2,a.alamat1 from t_lender a
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
    <td width='100' align='center' class='header_laporan'>KODE LENDER</td>
    <td width='150' align='center' class='header_laporan'>NAMA LENDER</td>
    <td width='150' align='center' class='header_laporan'>NAMA LENDER 2</td>
    <td width='350' align='center' class='header_laporan'>ALAMAT</td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$row->kdlender</td>
    <td class='isi_laporan' align='center'>$row->nmlender1</td>
   <td class='isi_laporan' align='center'>$row->nmlender2</td>
    <td class='isi_laporan' align='center'>$row->alamat1</td>
</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
