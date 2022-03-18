<?php
/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
//----------------------------------------------------	
	ob_end_clean();		
	if (substr_count($_SERVER['HTTP_ACCEPT_ENCODING'], 'gzip')) {
		ob_start("ob_gzhandler"); 
		header("Content-Encoding: gzip");
	}else ob_start();
	$result = "";

	$tempStr = $_POST['request'];	
	
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
	set_include_path(get_include_path() . PATH_SEPARATOR ."/appl/php/lib/php");
	set_include_path(get_include_path() . PATH_SEPARATOR ."/appl/php/lib/php/PEAR");
	set_include_path(get_include_path() . PATH_SEPARATOR . $path ."/server");	
	set_include_path(get_include_path() . PATH_SEPARATOR . $path ."/server/OLE");	
	set_include_path(get_include_path() . PATH_SEPARATOR . $path ."/server/PHPExcel/Shared");	
	set_include_path(get_include_path() . PATH_SEPARATOR . $path ."/server/PHPExcel/Shared/OLE");	
	//error_reporting (E_ALL & ~E_NOTICE & ~E_STRICT );	
	error_reporting (E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_USER_DEPRECATED & ~E_STRICT & ~E_WARNING);
	error_log("test error log");
//------------------
uses("server_httpRequest");
uses("server_Request");
uses("server_Response");
uses("server_Manager");
global $manager;

$manager = new server_Manager($serverDir);

/*
$zlibOn = ini_get('zlib.output_compression') || (ini_set('zlib.output_compression', 0) === false);
$encodings = (isset($_SERVER['HTTP_ACCEPT_ENCODING'])) ? strtolower($_SERVER['HTTP_ACCEPT_ENCODING']) : "";
$encoding = preg_match( '/\b(x-gzip|gzip)\b/', $encodings, $match) ? $match[1] : "";
*/

//if (isset($_SERVER['---------------']))
//			$encoding = "x-gzip";
//$supportsGzip =  !empty($encoding) && !$zlibOn && function_exists('gzencode');
		
header("ETag: PUB" . time());
header("Last-Modified: " . gmdate("D, d M Y H:i:s", time()-10) . " GMT");
header("Expires: " . gmdate("D, d M Y H:i:s", time() + 5) . " GMT");
//header("Vary: Accept-Encoding");  // Handle proxies	    
header("Pragma: no-cache");
header("Cache-Control: max-age=1, s-maxage=1, no-cache, must-revalidate");
session_cache_limiter("nocache");
//error_log(gmdate("D, d M Y H:i:s", time() + 5) ." ".gmdate("D, d M Y H:i:s", time() - 5));

//if ($supportsGzip)
//	header("Content-Encoding: " . $encoding);			
//-------------- Working Dir -----------------

//--------------------------------------------

$reqStr = $httpRequest->getParameter("request");
//error_log($reqStr);
//$reqStr = AesCtr::decrypt($reqStr, "saisaisai", 128);
if ($httpRequest->getParameter("status") == "file"){

}else {
	include("jsend.class.php");
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$jSEND = new jSEND();       
		$reqStr = $jSEND->getData($reqStr);      
	}else {
		$reqStr = base64_decode($reqStr);
	}
}

$reqStr = str_replace("\\\"", "\"", $reqStr);
$request = new server_Request();
//error_log($reqStr);
$response = null;
try
{   $step = $reqStr;	
    $request->fromXML($reqStr);
	$step = "invoke manager";		
    $response = $manager->invoke($request);
}
catch (Exception $e)
{
    $response = new server_Response();
//    write($request->getObjectId() ." ".$request->getMethodName() . " " );     	
    $response->setCode(1);
    $response-> setValue("error response " . $tempStr. " ". $reqStr);
	error_log("error response " . $tempStr. " ". $reqStr);
}

if ($response == null)
{
    $response = new server_Response();
//	write($request->getObjectId() ." ".$request->getMethodName() . " " );     
    $response->setCode(1);
    $response-> setValue("Invalid server response !");
	error_log("invalid response " . $tempStr. " ". $reqStr);
}

if ($manager->isSendResponse())
{   		
    header("Content-Type: text/xml"); 
	//$packer = new JavaScriptPacker($response->toXML(), 'Normal', false, false);
	//$data = $packer->pack();
	//error_log($data);
    //write($data);		    
    //if ($supportsGzip){
	//	$buffer = gzencode($response->toXML(), 9, FORCE_GZIP);		
	//	echo $buffer;
	//}else 
	error_log($response->toXML());
	write($response->toXML());	
}
	
?>
