<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');

    $logomain = $path.'/image/rtrw.jpeg';
    $mainname = $_SESSION['namaPP'];


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

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $saldo = $path . "image/agg2.png";
    $setor = $path . "image/payment.png";
    $kas = $path . "image/pay.png";
    $keu = $path . "image/keu.jpg";
    $rekap = $path . "image/report-icon.jpg";
	echo "$header
    <div class='panel' style='$padding'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border: none;box-shadow: none;'>
                            <div class='box-body no-padding'>
                            <ul class='users-list clearfix'>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashWargaDet.php&param=all/keu'><img src='$keu' width='80px' alt='User Image'><br>
                                    Keuangan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashWargaDet.php&param=all/rekap'><img src='$rekap' width='80px' alt='User Image'><br>
                                    Rekap</a>
                                </li>
                            </ul>
                            <!-- /.users-list -->
                            </div>
                        </div>
                    </div>
                </div>";   
        echo"</div>
       </div>";    
       
       
                		
		echo "
        <script type='text/javascript'>
        </script>        
        ";

   
?>
