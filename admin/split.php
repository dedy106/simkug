<?php
ob_start();
function db_Connect() { 
	include_once( "../server/server/ADODB/adodb5/adodb.inc.php");
	include_once( "../server/server/ADODB/adodb5/adodb-xmlschema.inc.php" ); # or adodb-xmlschema03.inc.php
	include_once("../server/server/conf/dbSetting.php");
	//include_once("../server/server/conf/mssql.conf");
	global $host;
	global $user;
	global $pass;
	global $database;
	global $driver;
	define("CONN_DB",$database);
	define("CONN_DBDRIVER",$driver);
	define("CONN_HOST",$host);
	
	$adoc = ADONewConnection($driver);
	$connected = $adoc->PConnect($host, $user, $pass, $database); 				  		
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
$sql="select  akun from xakun2";
$rs = execute($sql,$error);
$i=1;
while ($row = $rs->FetchNextObject($toupper=false))
{
	$tmp=explode('-',$row->akun);
	//echo "kode :".$tmp[0]." - nama :".$tmp[1];
	$sql="update xakun2 set kode_akun='$tmp[0]',nama='$tmp[1] $tmp[2]' where akun='$row->akun'";
	$rs2 = execute($sql,$error);
}

$sql="select no_bukti,nu,ket from xjurnal2";
$rs = execute($sql,$error);
$i=1;
while ($row = $rs->FetchNextObject($toupper=false))
{
	$tmp=explode('-',$row->ket);
	//echo "kode :".$tmp[0]." - nama :".$tmp[1];
	$sql="update xjurnal2 set kode_akun='$tmp[0]',keterangan='$tmp[1] $tmp[2]' where no_bukti='$row->no_bukti' and nu=$row->nu";
	$rs2 = execute($sql,$error);
}
echo "selesai";

ob_end_flush();
?>