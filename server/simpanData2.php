<?php
	try{
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
		
		include_once("library.php");
		uses("server_DBConnection_dbLib");
		$done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");	

        $str_format="0000";
        $periode=date('Y').date('m');
        $prefix=$_POST['kode_lokasi']."-CM".$periode;
        $query = $dbLib->execute("select right(max(kode_com), ".strlen($str_format).")+1 as id from uin_comment_d where kode_com like '$prefix%'", 1);
        $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

        $result = array("message" => "", "rows" => 0, "status" => "" );
        $sql="insert into uin_comment_d (kode_com,kode_dok,no_gambar,nu,comment,nik_user,tgl_input,kode_lokasi,no_agenda,time) values ('".$id."','".$_POST['kode_dok']."','".$_POST['no_gambar']."',1,'".$_POST['comment']."','".$_POST['nik']."',getdate(),'".$_POST['kode_lokasi']."','".$_POST['no_agenda']."','".date("h:i:sa")."') ";
			
			$rs = $dbLib->execute($sql);					
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

        
        // $rs=$dbLib->execute($sql);
                
        // if($rs){
        //     echo json_encode(array('status'=>true));
        // }else{
        //     echo json_encode(array('status'=>false));
        // }
	}catch(Exception $e){
	error_log($e->GetMessage() );
		echo $e->GetMessage() . "...\n";
	}
?>
