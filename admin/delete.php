<?php
ob_start();
function db_Connect() { 
	include_once( "../server/server/ADODB/adodb5/adodb.inc.php");
	include_once( "../server/server/ADODB/adodb5/adodb-xmlschema.inc.php" ); # or adodb-xmlschema03.inc.php
	include_once("../server/server/conf/dbSetting.php");		
	global $dbhost;
	global $dbuser;
	global $dbpass;
	global $database;
	global $dbdriver;
	define("CONN_DB",$database);
	define("CONN_DBDRIVER",$dbdriver);
	define("CONN_HOST",$dbhost);
	
	$adoc = ADONewConnection($dbdriver);
	$connected = $adoc->PConnect($dbhost, $dbuser, $dbpass, $database); 				  		
	if (!$connected){
		error_log($adoc->ErrorMsg());
	}
	return $adoc;
}
function execute($sql, &$error) { 	
	$schema = db_Connect();
	$resultSet = $schema->execute($sql);
	$error = false;
	if (!$resultSet){
		error_log($schema->ErrorMsg());
		error_log($sql);
		echo "error::" . $schema->ErrorMsg();
		$error = true;
		return null;
	}else return $resultSet;
}
$sql="show tables";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	//echo "Delete Tabel Gaji $row->Tables_in_dbsai2"."<br>";
	if (substr($row->Tables_in_dbsai,0,4)=="kop_")
	{
		$sql2="update $row->Tables_in_dbsai set kode_lokasi='31';"."<br>";
		//$rs1 = execute($sql2,$error);
		echo $sql2;
	}
	/*if (substr($row->Tables_in_dbsai,0,5)=="gaji_")
	{
		$sql2="delete from $row->Tables_in_dbsai;"."<br>";
		//$rs1 = execute($sql2,$error);
		echo $sql2;
	}
	*/
}

ob_end_flush();
?>