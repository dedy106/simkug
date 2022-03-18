<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    // echo $kode_fs;

    $kode_fs="FS1";

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
    }else{
        $width="25%";
    }

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $keu = $path . "image/keu.jpg";
    $pbh = $path . "image/pbh.png";
    $rra = $path . "image/agg2.png";
    $agg = $path . "image/pbh3.png";
 
	echo "
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard 
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border-top:white'>
                            <div class='box-body no-padding'>
                            <ul class='users-list clearfix'>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|keu'><img src='$keu' width='80px' alt='User Image'><br>
                                    Keuangan</a>
                                </li> 
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMain.php?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                
                            </ul>
                            <!-- /.users-list -->
                            </div>
                        </div>
                    </div>
                </div>";
            echo"               
            </div>
       </div>"; 		

       include("navbottom.php");
       
		echo "
        <script type='text/javascript'>
        </script>";

   
?>
