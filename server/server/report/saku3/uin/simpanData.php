<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

// class server_report_saku3_uin_simpanData extends server_report_basic
// {
    
// 	function getHtml()
// 	{
        global $dbLib;
        $data = $_POST;

        $sql="insert into uin_comment_d (kode_com,kode_dok,no_gambar,nu,comment,nik_user,tgl_input,kode_lokasi) values ('CM001','111','11232',1,'".$data['comment']."','uin',getdate(),'23') ";

        $rs=$dbLib->execute($sql);
                
        if($rs){
            echo json_encode(array('status'=>true));
        }else{
            echo json_encode(array('status'=>false));
        }

//     }
       
// }
?>
