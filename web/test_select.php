<?php

    include_once( "lib/koneksi.php");
    echo "Transaksi";
    echo "<br>";
    $sql = "select * from hakakses where nik ='dev'";
    $result = execute($sql);

    while($row=$result->FetchNextObject($toupper=false)){
        echo $row->nik;
    }

    if($result){
        echo "sukses";
    }else{
        echo "gagal";
    }

?>