<?php

    include_once( "lib/koneksi.php");
    echo "Transaksi";
    echo "<br>";
    $sql1="insert into xtes(nik,nilai) values('n1',300) "; 
    $sql2="insert into xtes(nik,nilai) values('n2',400) "; 

    $sqlx=array($sql1,$sql2);
    for($i=3;$i<5;$i++){
        $sql3[$i]= "insert into xtes(nik,nilai) values ('n$i',10) ";
        array_push($sqlx,$sql3[$i]);
    }
    print_r($sqlx);

    
    // $sql= array_merge($sqlx,$sql3);
    // echo"<br>";
    // print_r($sql);
    
    $result = executeArray($sqlx);

    if($result){
        echo "sukses";
    }else{
        echo "gagal";
    }

?>