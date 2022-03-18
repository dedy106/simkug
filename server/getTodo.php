<?php
	try{
		global $dirSeparator;
		global $serverDir;
		if (!defined('NEW_LINE'))
		   define("NEW_LINE", "<br>\r\n");
		
		define("WIN", "win");
		define("LINUX", "linux");
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
		{
			$platform = WIN;
			$dirSeparator = "\\";
			$separator = ";";
		}
		else
		{
			$platform = LINUX;
			$dirSeparator = "/";
			$separator = ":";
		}
		error_reporting (E_ALL & ~E_NOTICE );
		
		$serverDir = __FILE__;
		
		global $rootDir;

		$pos = strrpos($serverDir, $dirSeparator);
		$serverDir = substr($serverDir, 0, $pos);
		$pos = strrpos($serverDir, $dirSeparator);
		$rootDir = substr($serverDir, 0, $pos);
		$pos = strrpos($rootDir, $dirSeparator);
		$path = $rootDir;
		$rootDir = substr($rootDir,$pos);
		
		include_once("library.php");
		uses("server_DBConnection_dbLib");
		$done = false;	
		$dbLib = new server_DBConnection_dbLib("mssql");	
		$result = array("message" => "", "rows" => 0, "kode" => "" );			
			$rs = $dbLib->execute("select no_konten,judul from sai_konten where kode_klp='TDL' ");					
			$tmp=array();
			$kode = array();
			if (!$rs->EOF)
			{	
				
				while ($row = $rs->FetchNextObject(false)){
					$tmp[]=$row->judul;
					$kode[] = $row->no_konten;
				}
			}		
			$result["message"] = $tmp;
			$result["kode"] = $kode;
			echo json_encode($result);
	}catch(Exception $e){
	error_log($e->GetMessage() );
		echo $e->GetMessage() . "...\n";
	}
?>
