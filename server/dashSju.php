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

    function getPolis(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $post= $_POST;

        $sql = "select a.no_polis,a.no_dok
                from sju_polis_m a
                inner join (select a.no_polis,a.kode_lokasi
                from sju_klaim a
                inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='11' and b.kode_cust = '".$post['cust']."'
                group by a.no_polis,a.kode_lokasi 
                        )b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='".$post['kode_lokasi']."' and a.kode_cust = '".$post['cust']."' ";

        $rs=$dbLib->execute($sql);
        $html ="";
     
        while ($row = $rs->FetchNextObject($toupper=false))
		{
            $html.="<option value='$row->no_polis'>$row->no_polis - $row->no_dok</option>";
        }

        $result = array(
            "html" => $html,
            "sql"=>$sql
        );
        echo json_encode($result);
        // echo $html;
    }

   
?>
