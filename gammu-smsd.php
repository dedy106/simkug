<?php 
if ($argv[1] == 'install') 
{
    $installDir = __FILE__;

    $dirSeparator = "\\";
    $separator = ";";
        
    $pos = strrpos($installDir, $dirSeparator);
    $installDir = substr($installDir, 0, $pos); // www/esaku2
    
    $pos = strrpos($installDir, $dirSeparator);
    $installDir = substr($installDir, 0, $pos); // www
    
    $pos = strrpos($installDir, $dirSeparator);
    $installDir = substr($installDir, 0, $pos); // root

	$x = win32_create_service(array(
		                              'service' => $argv[2],
		                              'display' => $argv[2],
		                              'path' => '' . $installDir . '\\php\\php-win.exe',
		                              'params' => '-c ' .$installDir . '\\Apache2\\bin ' .$installDir . '\\www\\esaku2\\gammu-smsd.php run',
	                               ));
} 
else if ($argv[1] == 'uninstall') 
{
	$x = win32_delete_service($argv[2]);
	debug_zval_dump($x);
} 
else if ($argv[1] == 'run')
{
    $x = win32_start_service_ctrl_dispatcher($argv[2]);
    $installDir = __FILE__;

    $dirSeparator = "\\";
    $separator = ";";
        
    $pos = strrpos($installDir, $dirSeparator);
    $installDir = substr($installDir, 0, $pos); // www/esaku2
    
    $pos = strrpos($installDir, $dirSeparator);
    $installDir = substr($installDir, 0, $pos); // www
    
    $pos = strrpos($installDir, $dirSeparator);
    $installDir = substr($installDir, 0, $pos); // root
		
	include_once($installDir . "\www\esaku2\server\gammu.php");		
    while (WIN32_SERVICE_CONTROL_STOP != win32_get_last_control_message()) 
    {
		//error_log("get inbox");
		
		try
		{  						
			$handle= fopen("http://127.0.0.1/esaku2/smsd.php","r");		
			fclose($handle);							
		}
		catch (Exception $e)
		{
			error_log("exception->".$e->getMessage());
		}

        //sleep(10);
	}
}

function db_Connect($addPath = "") { 
	include_once( $addPath . "server\server\ADODB\adodb5\adodb.inc.php");
	include_once( $addPath . "server\server\ADODB\adodb5\adodb-xmlschema.inc.php" ); # or adodb-xmlschema03.inc.php
	include_once( $addPath . "server\server\conf\dbSetting.php");		
	global $dbhost;
	global $dbuser;
	global $dbpass;
	global $database;
	global $dbdriver;
	define("CONN_DB",$database);
	define("CONN_DBDRIVER",$dbdriver);
	define("CONN_HOST",$dbhost);
	
	$adoc = ADONewConnection($dbdriver);
	if ($driver == "ado_mssql")
	{
	  $connected = $adoc->Connect($host, $user, $pass);
	  $adoc->hasTop = "TOP";			  
	}else 			
	  $connected = $adoc->PConnect($dbhost, $dbuser, $dbpass, $database); 				  		
	if (!$connected){
		error_log($adoc->ErrorMsg());
	}
	return $adoc;
}
?>

