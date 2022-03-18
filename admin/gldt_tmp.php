<?php
ob_start();
function db_Connect() { 
	include_once( "../server/server/ADODB/adodb5/adodb.inc.php");
	include_once( "../server/server/ADODB/adodb5/adodb-xmlschema.inc.php" ); # or adodb-xmlschema03.inc.php
	include_once("../server/server/conf/dbSetting.php");
	//include_once("../server/server/conf/mssql.conf");
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
$sql="insert into gldt_tmp
select * from gldt_h where periode<'201401' ";
$rs = execute($sql,$error);

$lokasi='04';
$sql="select periode,kode_lokasi 
from periode 
where periode>='201401' 
order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_post_simulasi_lokasi '$row->lokasi','$row->periode'";
	//echo $sql2;
	$rs2 = execute($sql2,$error);
}
echo "Ok";
ob_end_flush();
?>