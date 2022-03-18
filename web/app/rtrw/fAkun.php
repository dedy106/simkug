<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $kode_fs="FS1";
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	
    
    $notifikasi= $path . "image/dok.png";

    $domain=$_SERVER['SERVER_NAME'];
    if($domain == "tbp.simkug.com"){
        $logomain = $path.'/image/tbp.jpeg';
    }else{
        $logomain = $path.'/image/rtrw.jpeg';
    }
    $mainname = $_SESSION['namaPP'];

    $sql = "select a.nik, a.nama, b.status_huni, b.keterangan, b.alamat,b.no_tel,c.foto from hakakses a
    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi left join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi where a.nik='$nik' ";
    $rs = execute($sql);
    $row = $rs->FetchNextObject($toupper=false);

    if($row->foto == "-" OR $row->foto == ""){
        $user2 = $path ."image/user3.png";
    }else{
        $user2 = $path ."image/".$row->foto;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 1px solid #e6e2e2;'>
        <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b></span>
        </a>
        </header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }
 
	echo "$header
    <div class='panel' style='$padding'>
            <div class='panel-heading' style='font-size:25px;padding:10px 0px 0px 20px;color:#dd4b39'>Profile
            </div>
            <div class='panel-body' style='padding:0px'> ";
            echo"
                <div class='row' style='margin:0px'>
                
                    <div class='col-md-12' style='padding:0px'>
                        <div class='box-body box-profile'>
                                <div>
                                    <img class='profile-user-img img-responsive img-circle' src='$user2' alt='User profile picture' style='width: 80px;margin: auto;border: none;'>
                                    <p class='text-muted' style='margin:auto;text-align:center'>$row->nik</p>
                                    <h3 class='profile-username' style='margin-left: auto;text-align:center;padding-bottom:10px;font-size:18px'>&nbsp;</h3>
                                </div>

                                <ul class='list-group list-group-unbordered'>
                                    <li class='list-group-item'>
                                    <b>Nama</b> <br>
                                    <a>$row->nama</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>Status Huni</b> <br>
                                    <a>$row->status_huni</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>No Telp</b><br> <a>$row->no_tel</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>Alamat</b><br><a>$row->alamat</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>No Telp</b><br> <a>$row->no_telp</a>
                                    </li>
                                    <li class='list-group-item'>
                                    <b>Keterangan</b><br> <a>$row->keterangan</a>
                                    </li>
                                </ul>
                                <!-- <a href='#' class='btn btn-success '><b>Edit Profile</b></a> -->
                                <a href='".$_SESSION['exit_url']."' class='btn btn-danger  '><b>Logout</b></a>
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
