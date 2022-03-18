<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_saiba_rptPinjam extends server_report_basic
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
		$sql="select a.kdpinjam, a.kdlender,a.noloan,a.tgclosing,a.nonpln,a.noreksus,a.nmbank,a.nonol,a.tgnol from t_pinjam a
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
    <td width='150' align='center' class='header_laporan'>KODE PINJAM</td>
    <td width='150' align='center' class='header_laporan'>KODE LENDER</td>
    <td width='150' align='center' class='header_laporan'>NO.LOAN</td>
    <td width='150' align='center' class='header_laporan'>TGL CLOSING</td>
    <td width='300' align='center' class='header_laporan'>NO.NPLN</td>
    <td width='300' align='center' class='header_laporan'>NO.REKSUS</td>
    <td width='300' align='center' class='header_laporan'>NAMA BANK</td>
     <td width='300' align='center' class='header_laporan'>TGL NOL</td>
    <td width='300' align='center' class='header_laporan'>NO.NOL</td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$row->kdpinjam</td>
    <td class='isi_laporan' align='center'>$row->kdlender</td>
   <td class='isi_laporan' align='center'>$row->noloan</td>
    <td class='isi_laporan' align='center'>$row->tgclosing</td>
   <td class='isi_laporan' align='center'>$row->nonpln</td>
    <td class='isi_laporan' align='center'>$row->noreksus</td>
    <td class='isi_laporan' align='center'>$row->nmbank</td>
    <td class='isi_laporan' align='center'>$row->tgnol</td>
    <td class='isi_laporan' align='center'>$row->nonol</td>
</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
