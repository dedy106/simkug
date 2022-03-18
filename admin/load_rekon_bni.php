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
function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

echo "Transfer Data". "<br>";
$kode_lokasi="02";
$kode_fs="FS1";

$time_start = microtime_float();
$sql4="select nim,nilai from xbni3  ";

$rs4 = execute($sql4,$error);
$j=1;
while ($row4 = $rs4->FetchNextObject($toupper=false))
{
	$sql="select nim,no_bill,no_inv,kode_produk,nilai from aka_bill_d
where kode_lokasi='02' and nim='$row4->nim'
order by kode_produk ";
	$total=$row4->nilai;
	//$total=4600000;
	$rs = execute($sql,$error);
	while ($row = $rs->FetchNextObject($toupper=false))
	{
		if ($total > $row->nilai)
		{
			$nilai=$row->nilai;
		}
		else
		{
			$nilai=$total;
		}
		
		if ($nilai>0)
		{
		$sql2="insert into aka_rekon_d(no_rekon, nim, no_inv, periode, nilai, kode_lokasi, akun_titip, akun_piutang, kode_produk, dc, modul, id_bank) ";
		$sql2.="values('02-REK1209.006','$row->nim','$row->no_inv','201209',$nilai,'02','-','-','$row->kode_produk','D','LOAD','-'); ";
		$rs2 = execute($sql2,$error);
		
		$total=$total-$row->nilai;
		}
		
		
	}
}
$time_end = microtime_float();
$time1 = $time_end - $time_start;
echo "Transfer Selesai ".number_format($time1,4,".",",")." detik <br>";

ob_end_flush();
?>