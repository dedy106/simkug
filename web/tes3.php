<?php
include_once( "lib/koneksi.php");
echo "Transaksi";
echo "<br>";
$sql="insert into xtes(nik,nilai) values('adit',1)"; 
$sql2="insert into xtes(nik,nilai) values('idan','ccc')"; 
try { 
	$conn = db_Connect();
	$conn->StartTrans();
	$conn->Execute($sql);
	$conn->Execute($sql2);
	$conn->CompleteTrans();
} catch (exception $e) { 
	var_dump($conn->ErrorMsg()); 
} 



		

?>