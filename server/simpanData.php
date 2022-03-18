<?php
	try{
		global $dirSeparator;
		global $serverDir;
		
        uses("server_DBConnection_dbLib");
		$done = false;	
		$dbLib = new server_DBConnection_dbLib("mssql");	
		// $result = array("message" => "", "rows" => 0, "kode" => "" );			
		// 	$rs = $dbLib->execute("select no_konten,judul from sai_konten where kode_klp='DOC' ");					
		// 	$tmp=array();
		// 	$kode = array();
		// 	if (!$rs->EOF)
		// 	{	
				
		// 		while ($row = $rs->FetchNextObject(false)){
		// 			$tmp[]=$row->judul;
		// 			$kode[] = $row->no_konten;
		// 		}
		// 	}		
		// 	$result["message"] = $tmp;
		// 	$result["kode"] = $kode;
        // 	echo json_encode($result);
        $sql="insert into uin_comment_d (kode_com,kode_dok,no_gambar,nu,comment,nik_user,tgl_input,kode_lokasi) values ('CM001','111','11232',1,'".$data['comment']."','uin',getdate(),'23') ";

        $rs=$dbLib->execute($sql);
                
        if($rs){
            echo json_encode(array('status'=>true));
        }else{
            echo json_encode(array('status'=>false));
        }
	}catch(Exception $e){
	error_log($e->GetMessage() );
		echo $e->GetMessage() . "...\n";
	}
?>
