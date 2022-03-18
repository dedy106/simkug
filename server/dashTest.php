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

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function view(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");
        
        $sql="select * from dev_jur where kode_jur='JUR001' ";
        
        $rs=$dbLib->execute($sql);

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }		
        $result["message"] =$tmp;
        $result["status"] = $sts;
        echo json_encode($result);
    }
    
?>
