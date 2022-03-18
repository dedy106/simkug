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

    function getKelasSiswa(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $kode_lokasi=$_POST['kode_lokasi'];
        $kode_pp=$_POST['kode_pp'];
        $kode_jur=$_POST['kode_jur'];

        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="select 'All' as kode_kelas, 'All' as nama
        union all
        select a.kode_kelas, a.nama 
        from sis_kelas a 
        where a.kode_jur='$kode_jur' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'";
        
        $rs = $dbLib->execute($sql);
        
        $sql2="select 'All' as nis, 'All' as nama
        union all
        select a.nis, a.nama 
        from sis_siswa a 
        inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        where b.kode_jur='$kode_jur' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'";
        
        $rs2 = $dbLib->execute($sql2);
        
        $result['daftar'] = array();
        $result['daftar2'] = array();
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }

        while ($row2 = $rs2->FetchNextObject(false)){
            $result['daftar2'][] = (array)$row2;
        }
        $result['status']=TRUE;
        $result['sql']=$sql;
        $result['sql2']=$sql2;
        echo json_encode($result);
    }

    function getSiswa(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $kode_lokasi=$_POST['kode_lokasi'];
        $kode_pp=$_POST['kode_pp'];
        $kode_jur=$_POST['kode_jur'];
        $kode_kelas=trim($_POST['kode_kelas']);

        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="
        select 'All' as nis, 'All' as nama
        union all
        select a.nis, a.nama 
        from sis_siswa a 
        inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
        where a.kode_kelas ='$kode_kelas' and b.kode_jur='$kode_jur' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'";
        
        $rs = $dbLib->execute($sql);
        
        $result['daftar'] = array();
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }

        $result['status']=TRUE;
        $result['sql']=$sql;
        echo json_encode($result);
    }

    
    
?>
