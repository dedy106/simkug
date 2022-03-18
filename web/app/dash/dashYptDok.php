<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $kode_fs="FS1";
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	
    
    $notifikasi= $path . "image/dok.png";
    $logomain = $path.'/image/ypt.jpeg';
    $mainname="Yayasan Pendidikan Telkom";

    $header= "<header class='main-header' id='header'>
    <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 1px solid #e6e2e2;'>
    <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b></span>
    </a>
    </header>";
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    $style = "box-shadow: 0 0 0 white;";
 
	echo "$header
		<div class='panel' style='margin:0px;$padding'>
            <div class='panel-heading' style='font-size:25px;padding:10px 0px 10px 20px;color:#dd4b39'>Dokumen
            </div>
            <div class='panel-body' style='padding:0px'>
                <div class='row' style='margin:0px'>
                    <div class='col-md-12' style='padding:0px'>
                        <div class='box-footer box-comments' style='background:white;box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height:70px'>
                            <div class='box-comment'>
                            <img class='img-circle img-sm' style='width: 50px !important;height: 50px !important;' src='$notifikasi' alt='User Image'>
                            <div class='comment-text' style='margin-left: 60px;'>
                                    <span class='username'>
                                    Judul Dokumen
                                    <span class='text-muted pull-right'>12-02-2019<i class='fa  fa-angle-right' style='font-size:30px;padding-left: 20px;'></i></span>
                                    </span><!-- /.username -->
                                    Ket (unread) ...
                            </div>
                            </div>
                        </div>
                        <div class='box-footer box-comments' style='background:white;box-shadow: 1px 1px 2px 1px rgba(0,0,0,0.1);height:70px'>
                            <div class='box-comment'>
                            <img class='img-circle img-sm' style='width: 50px !important;height: 50px !important;' src='$notifikasi' alt='User Image'>
                            <div class='comment-text' style='margin-left: 60px;'>
                                    <span class='username'>
                                    Judul Dokumen
                                    <span class='text-muted pull-right'>12-02-2019<i class='fa  fa-angle-right' style='font-size:30px;padding-left: 20px;'></i></span>
                                    </span><!-- /.username -->
                                    Ket (unread) ...
                            </div>
                            </div>
                        </div>
                    </div>
                </div>";
            echo"               
            </div>
       </div>";    
       
       
                		
		echo "
        <script type='text/javascript'>
        </script>";

   
?>
