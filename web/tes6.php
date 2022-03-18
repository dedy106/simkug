<?php
	include_once( "lib/koneksi_cli.php");
    echo "Transaksi";
    echo "<br>";
    $sql = "select kode_lokasi,nama from lokasi ";
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