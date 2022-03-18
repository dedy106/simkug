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
$sql="select no_bukti,tanggal,keterangan,akun_debet,akun_kredit,nilai,periode from xjan where periode='201903' ";
$rs = execute($sql,$error);
$i=1;
while ($row = $rs->FetchNextObject($toupper=false))
{
	$sql="insert into gldt(kode_lokasi, periode, no_bukti, tanggal, kode_akun, dc, keterangan, nilai, kode_pp, nu) 
		  values ('37','$row->periode','$row->no_bukti','$row->tanggal','$row->akun_debet','D','$row->keterangan',$row->nilai,'KUG',$i);";
	//echo $sql;
	$i=$i+1;
	$rs2 = execute($sql,$error);
	//echo "<br>";
	$sql="insert into gldt(kode_lokasi, periode, no_bukti, tanggal, kode_akun, dc, keterangan, nilai, kode_pp, nu) 
		  values ('37','$row->periode','$row->no_bukti','$row->tanggal','$row->akun_kredit','C','$row->keterangan',$row->nilai,'KUG',$i);";
	$rs2 = execute($sql,$error);
	//echo $sql;
	//echo "<br>";
	$i=$i+1;
}
echo "Proses Berhasi";
ob_end_flush();
?>