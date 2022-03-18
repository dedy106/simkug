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

echo "Generate gldt akun";
$sql="delete from exs_gldt_akun";
$rs = execute($sql,$error);
$sql="select periode,kode_lokasi from periode where periode>='201501' order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_exs_gldt_akun '$row->kode_lokasi','$row->periode'";
	//echo $sql2;
	$rs2 = execute($sql2,$error);
}
echo "<br>Generate gldt pp";
$sql="delete from exs_gldt_pp";
$rs = execute($sql,$error);
$sql="select periode,kode_lokasi from periode where periode>='201501' order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_exs_gldt_pp '$row->kode_lokasi','$row->periode'";
	//echo $sql2;
	$rs2 = execute($sql2,$error);
}

echo "<br>Generate glma";
$sql="delete from exs_glma";
$rs = execute($sql,$error);
$sql="select periode,kode_lokasi from periode where periode>='201501' order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_exs_glma '$row->kode_lokasi','$row->periode'";
	//echo $sql2;
	$rs2 = execute($sql2,$error);
}
echo "<br>Generate glma pp";
$sql="delete from exs_glma_pp";
$rs = execute($sql,$error);
$sql="select periode,kode_lokasi from periode where periode>='201501' order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_exs_glma_pp '$row->kode_lokasi','$row->periode'";
	//echo $sql2;
	$rs2 = execute($sql2,$error);
}


echo "<br>Generate neraca";
$sql="delete from exs_neraca";
$rs = execute($sql,$error);
$sql="select periode,kode_lokasi from periode where periode>='201501' order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_exs_neraca 'FS1','$row->kode_lokasi','$row->periode'";
	$rs2 = execute($sql2,$error);
	
}

echo "<br>Generate neraca pp";
$sql="delete from exs_neraca_pp";
$rs = execute($sql,$error);
$sql="select periode,kode_lokasi from periode where  periode>='201501' order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_exs_neraca_pp 'FS1','$row->kode_lokasi','$row->periode'";
	
	$rs2 = execute($sql2,$error);
}

echo "<br>Generate neraca bidang";
$sql="delete from exs_neraca_bidang";
$rs = execute($sql,$error);
$sql="select periode,kode_lokasi from periode where  periode>='201501' order by periode";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql2="exec sp_exs_neraca_bidang 'FS1','$row->kode_lokasi','$row->periode'";
	//echo $sql2;
	$rs2 = execute($sql2,$error);
}

ob_end_flush();
?>