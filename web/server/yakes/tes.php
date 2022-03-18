<?php
$root=realpath($_SERVER["DOCUMENT_ROOT"])."/";
include_once($root."web/lib/koneksi.php");
echo $root."web/lib/koneksi.php";
$sql="select kode_lokasi,nama from lokasi ";
$rs = execute($sql,$error);
echo $rs->recordCount();
while ($row = $rs->FetchNextObject($toupper=false))
{
	echo "Nama :".$row->kode_lokasi."-".$row->nama."<br>";
	
}
echo "Proses Berhasi";

?>