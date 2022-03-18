<?php
$root_lib=$_SERVER["DOCUMENT_ROOT"];
include_once($root_lib."web/lib/koneksi.php");

echo "Transaksi Array";
echo "<br>";

$sql=array();
$sql1="insert into xtes(nik,nilai) values('yadit',1)"; 
array_push($sql,$sql1);
$sql2="insert into xtes(nik,nilai) values('yidan',20)"; 
array_push($sql,$sql2);
$sql3="insert into xtes(nik,nilai) values('yina',10)";
array_push($sql,$sql3);

$rs = executeArray($sql);
var_dump($rs);
 
		

?>