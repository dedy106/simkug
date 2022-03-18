<?php
	try{
		/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
//----------------------------------------------------	
	
	
	$result = "";
	include("library.php");
    if (!defined('NEW_LINE'))
	   define("NEW_LINE", "<br>\r\n");
	
    define("WIN", "win");
    define("LINUX", "linux");

    // OS Base separator
    global $platform;
    global $dirSeparator;
    global $separator;
    global $serverDir;
    
    $serverDir = __FILE__;

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

	global $rootDir;

	$pos = strrpos($serverDir, $dirSeparator);
	$serverDir = substr($serverDir, 0, $pos);
	$pos = strrpos($serverDir, $dirSeparator);
	$rootDir = substr($serverDir, 0, $pos);
	$pos = strrpos($rootDir, $dirSeparator);
	$path = $rootDir;
	$rootDir = substr($rootDir,$pos);
	
//----------------------------------
//-------------- error_log8

	ini_set('display_errors', 'Off');
	ini_set ('track_errors', 'On');	 
	ini_set ('max_execution_time', '3000');	 
	ini_set ('memory_limit', '1024M');
	ini_set ('log_errors',   'On');
	ini_set ('error_log',    $path .'/server/tmp/php_error.log');	
	//ini_set ('zlib.output_compression', 0);
	
	set_include_path(get_include_path() . PATH_SEPARATOR . $path ."/server");	
	
	//error_reporting (E_ALL & ~E_NOTICE & ~E_STRICT );	
	error_reporting (E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_USER_DEPRECATED & ~E_STRICT & ~E_WARNING);
	
		error_reporting (E_ALL & ~E_NOTICE);
		uses("server_DBConnection_dbLib");
		
		$periode = $_GET["periode"];
		$lokasi = $_GET["lokasi"];
		$db = new server_DBConnection_dbLib("mssql");
		
		$sql="select kode_lokasi,kode_akun, kode_pp,kode_ba,round(nilai,0) as nilai_ytd,round(mutasi,0) as nilai_cm,round(gar_nilai,0) as gar_ytd,round(gar_mutasi,0) as gar_cm,substring(periode,5,2) as bulan,substring(periode,1,4) as tahun 
		from ypt_tb_pp where kode_lokasi='$lokasi' and periode='$periode' and (mutasi<>0 or nilai<>0) order by kode_akun";
		if ($lokasi=="")
		{
			$sql="select kode_lokasi,kode_akun, kode_pp,kode_ba,round(nilai,0) as nilai_ytd,round(mutasi,0) as nilai_cm,round(gar_nilai,0) as gar_ytd,round(gar_mutasi,0) as gar_cm,substring(periode,5,2) as bulan,substring(periode,1,4) as tahun 
		from ypt_tb_pp where periode='$periode' and (mutasi<>0 or nilai<>0) order by kode_akun";
		}
		
		$rs = $db->execute($sql);
		$result = array();
		while ($row = $rs->FetchNextObject(false)){
			$result[] = (array) $row;
		}
		
		echo json_encode($result);		
		if ($res == "process completed"){
			echo "Done";
		}else echo $res ."";
		

	}catch(Exception $e){
		echo $e->getMessage() . "...\n";
	}
?>
