<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"])."/web/";
include_once($root."lib/koneksi.php");

$sql="select kode_lokasi,nama from lokasi ";
echo $sql;
$rs = execute($sql,$error);
echo "err :".$error;

while ($row = $rs->FetchNextObject($toupper=false))
{
	
	echo "Nama :".$row->kode_lokasi."-".$row->nama."<br>";
	
}

echo "Proses Berhasi";

?>