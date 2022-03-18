<?php

    global $dirSeparator;
    global $serverDir;
    if (!defined('NEW_LINE'))
        define("NEW_LINE", "<br>\r\n");

    define("WIN", "win");
    define("LINUX", "linux");
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
    {
        $platform = WIN;
        $dirSeparator = "\\";
        $separator = ";";
    }
    else
    {
        $platform = LINUX;
        $dirSeparator = "/";
        $separator = ":";
    }
    error_reporting (E_ALL & ~E_NOTICE );

    $serverDir = __FILE__;

    global $rootDir;

    $pos = strrpos($serverDir, $dirSeparator);
    $serverDir = substr($serverDir, 0, $pos);
    $pos = strrpos($serverDir, $dirSeparator);
    $rootDir = substr($serverDir, 0, $pos);
    $pos = strrpos($rootDir, $dirSeparator);
    $path = $rootDir;
    $rootDir = substr($rootDir,$pos);

    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function getMaps(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $post= $_POST;

        $kode_lokasi = $_POST['kode_lokasi'];  
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select distinct a.id_lahan,a.nama_lahan,a.alamat,a.coor_x,a.coor_y,b.nama as provinsi,c.nama as kota, d.nama as kecamatan,e.nama as desa,a.nilai_perolehan, a.cara_perolehan,a.atas_nama 
        from amu_lahan a
        left join amu_provinsi b on a.id_provinsi=b.id
        left join amu_kota c on a.id_kota=c.id and b.id=c.id_provinsi
        left join amu_kecamatan d on a.id_kecamatan=d.id and c.id=d.id_kota
        left join amu_desa e on a.id_kota=e.id and d.id=e.id_kecamatan
        where coor_x <> '' or coor_y <> '' ";
        $rs = $dbLib->execute($sql);
        while($row = $rs->FetchNextObject($toupper))
        {
            $result['hasil'][] = (array)$row;
        
        }

        /*$sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
        $rs = $dbLib->execute($sql2);
        while($row = $rs->FetchNextObject($toupper))
        {
            $result['hasil']['pbb'] = (array)$row;
        
        }*/
        					
        $result['status'] = true;
        $result['sql'] = $sql;
        echo json_encode($result);
        // echo $html;
    }

    function getMapsCari(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $kode_lokasi = $_POST['kode_lokasi'];  
        $id = $_POST['id_lahan'];  
        $result = array("message" => "", "rows" => 0, "status" => "" ); 
        $sql = "select distinct a.id_lahan,a.nama_lahan,a.alamat,a.coor_x,a.coor_y,b.nama as provinsi,c.nama as kota, d.nama as kecamatan,e.nama as desa,a.nilai_perolehan, a.cara_perolehan,a.atas_nama 
        from amu_lahan a
        left join amu_provinsi b on a.id_provinsi=b.id
        left join amu_kota c on a.id_kota=c.id and b.id=c.id_provinsi
        left join amu_kecamatan d on a.id_kecamatan=d.id and c.id=d.id_kota
        left join amu_desa e on a.id_kota=e.id and d.id=e.id_kecamatan
        where (coor_x <> '' or coor_y <> '')  and a.id_lahan='$id' ";
        $rs = $dbLib->execute($sql);
        while($row = $rs->FetchNextObject($toupper))
        {
            $result['hasil'][] = (array)$row;
        
        }

        // $sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
        // $rs = $dbLib->execute($sql2);
        // while($row = $rs->FetchNextObject($toupper))
        // {
        //     $result['hasil']['pbb'] = (array)$row;
        
        // }
        					
        $result['status'] = true;
        $result['sql'] = $sql;
        echo json_encode($result);
    }

   
?>
