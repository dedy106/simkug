<?php
$root = realpath($_SERVER["DOCUMENT_ROOT"]);
echo  $root;
include_once($root."/lib/koneksi3.php");
echo "Transaksi";
    echo "<br>";
    $sql = "select * from lokasi";
    $result = execute($sql);

    while($row=$result->FetchNextObject($toupper=false)){
        echo $row->nama;
    }

    if($result){
        echo "sukses";
    }else{
        echo "gagal";
    }
?>
