<?php
$root=$_SERVER["DOCUMENT_ROOT"];
echo $root."web/";
echo "<br>";
echo $_SERVER['SERVER_NAME'];
echo "<br>";
echo $_SERVER['HTTP_HOST'];
echo "<br>";
$folder_img=$root."web/img";
include_once($root."web/lib/koneksi.php");
$sql="select kode_lokasi,nama from lokasi ";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	
	echo "Nama :".$row->kode_lokasi."-".$row->nama."<br>";
	
}
echo "Proses Berhasi";


?>