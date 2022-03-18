<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $kode_fs="FS1";
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	
    
    $notifikasi= $path . "image/dok.png";

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
            
        $logomain = $path.'/image/ypt.jpeg';
        $mainname="Yayasan Pendidikan Telkom";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 1px solid #e6e2e2;'>
        <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b></span>
        </a>
        </header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";
    }else{
        $header= "";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }
    

    $sql = "select a.nik,a.nama, b.alamat,b.email,b.tgl_lahir,b.tempat_lahir, b.no_telp,b.jabatan,b.foto from hakakses a inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi where a.nik='$nik' ";
    $rs = execute($sql);
    $row = $rs->FetchNextObject($toupper=false);

    if($row->foto == "-" OR $row->foto == ""){
        $user2 = $path ."image/user.png";
    }else{
        $user2 = $path ."image/".$row->foto;
    }
    
    $user2 = $path ."image/user3.png";

    
 
	echo "$header
		<div class='panel' style='margin:0px;$padding'>
            <div class='panel-heading' style='font-size:25px;padding:10px 0px 10px 20px;color:#dd4b39'>Akun
            </div>
            <div class='panel-body' style='padding:0px'> ";
            echo"
                <div class='row' style='margin:0px'>
                
                    <div class='col-md-12' style='padding:0px'>
                        <div class='box-body box-profile'>
                            <div>
                                <img class='profile-user-img img-responsive img-circle' src='$user2' alt='User profile picture' style='width: 80px;margin: auto;border: none;'>
                                <p class='text-muted' style='margin:auto;text-align:center'>$row->nik</p>
                                <h3 class='profile-username' style='margin-left: auto;text-align:center;padding-bottom:10px;font-size:18px'>$row->nama</h3>
                                
                            </div>
                            <style>
                                .head-profile {
                                    color:grey;
                                }
                                .isi-profile{
                                    color:black;
                                }
                            </style>

                                <ul class='list-group list-group-unbordered'>
                                    <li class='list-group-item'>
                                    <b>Jabatan</b> <br>
                                    <a>$row->jabatan</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>Tempat Tgl Lahir</b><br> <a>$row->tempat_lahir , $row->tgl_lahir</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>Email</b><br><a>$row->email</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>No Telp</b><br> <a>$row->no_telp</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>Alamat</b><br> <a>$row->alamat</a>
                                    </li>
                                </ul>
                                <a href='#' class='btn btn-default btn-block disabled' ><b>Edit Profile</b></a>
                                <a href='".$_SESSION['exit_url']."' class='btn btn-danger btn-block  '><b>Logout</b></a>
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
