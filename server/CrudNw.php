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

    function simpan(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");
        
        $sql="insert into lab_form (kode_form, nama, id_form) values ('".$_POST['kode_form']."', '".$_POST['nama']."', '".$_POST['id_form']."') ";
        
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
    

    function ubah(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");
        
        $sql="update lab_form set nama='".$_POST['nama']."', id_form='".$_POST['id_form']."' where kode_form = '".$_POST['kode_form']."'";
        
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
    

    function hapus(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");
        
        $sql="delete from lab_form where kode_form='".$_POST['kode_form']."'";
        
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

    // function simpan(){
    //     try{
    //         $sql="insert into lab_form (kode_form, nama, id_form) values ('".$_POST['kode_form']."', '".$_POST['nama']."', '".$_POST['id_form']."') ";
    //             // $post = $_POST[]
                
    //         // $rs = $dbLib->AutoExecute('lab_form', $_POST, 'INSERT');		
    //         $rs=$dbLib->execute($sql);
    
    //         $tmp=array();
    //         $kode = array();
    //         if ($rs)
    //         {	
    //             $tmp="sukses";
    //             $sts=true;
    //         }else{
    //             $tmp="gagal";
    //             $sts=false;
    //         }		
    //         $result["message"] =$tmp;
    //         $result["status"] = $sts;
    //         echo json_encode($result);
    //     }catch(Exception $e){
    //         error_log($e->GetMessage() );
    //         echo $e->GetMessage() . "...\n";
    //     }
    // }

    // function ubah(){

    // }

    // function delete(){

    // }

    // }

    // BISA
	// try{
    //     $sql="insert into lab_form (kode_form, nama, id_form) values ('".$_POST['kode_form']."', '".$_POST['nama']."', '".$_POST['id_form']."') ";
        
    //     $rs=$dbLib->execute($sql);

    //     $tmp=array();
    //     $kode = array();
    //     if ($rs)
    //     {	
    //         $tmp="sukses";
    //         $sts=true;
    //     }else{
    //         $tmp="gagal";
    //         $sts=false;
    //     }		
    //     $result["message"] =$tmp;
    //     $result["status"] = $sts;
    //     echo json_encode($result);
        
	// }catch(Exception $e){
	// error_log($e->GetMessage() );
	// 	echo $e->GetMessage() . "...\n";
	// }
?>
