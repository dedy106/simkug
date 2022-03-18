<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim2_rptBackup extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "1 ";
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
		//$path = $_SERVER["SCRIPT_NAME"];				
		//$path = substr($path,0,strpos($path,"serverApp.php"))."";
		//echo $path;
		//$db="eclaimtlk2.sql";
		
		//$command = "mysqldump -uroot -psai eclaimtlk > d:\tes.sql ";
		$command = "/opt/lampp/bin/mysqldump -uroot -padminsai2007 eclaimtlk > tes.sql ";
		//$command="nslookup -type=mx mysai.co.id ";
		exec($command);
		//$tmp=exec($command,$tmp);
		//echo $tmp;
		header("Content-Disposition: attachment; filename=tes.sql");
		header("Content-type: application/download");
		$fp  = fopen("tes.sql", 'r');
		$content = fread($fp, filesize("tes.sql"));
		fclose($fp);
		echo $content;
		
		return "";
	}
	
}
?>
  
