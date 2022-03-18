<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');

    $sql="select kode_rumah from hakakses where kode_lokasi='$kode_lokasi' and nik='$nik' ";
    $rs2=execute($sql);
    $kode_rumah=$rs2->fields[0];

    $sqlBlok="select blok from rt_rumah where kode_lokasi='$kode_lokasi' and kode_rumah='$kode_rumah' ";
    $rs4=execute($sqlBlok);
    $blok=$rs4->fields[0];

    $sqlpp="select a.rt,b.nama from rt_rumah a
    left join pp b on a.rt=b.kode_pp and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' and a.kode_rumah='$kode_rumah' ";
    $rspp=execute($sqlpp);

    $kode_pp=$rspp->fields[0];
    $_SESSION['namaPP'] = $rspp->fields[1];

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

    $sql3="select top 6 a.id, convert(varchar,tanggal,103) as tgl, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar , c.file_type 
    from lab_konten a 
    left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
    left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi 
    where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' 
    order by tanggal desc ";
    $rs3 = execute($sql3);

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $bp = $path . "image/inv2.png";
    $keu = $path . "image/keu.jpg";
    $bayar = $path . "image/payment.png";
    $iuran = $path . "image/bayar.jpg";
    $tamu = $path . "image/tamu2.png";
    $kas = $path . "image/pay.png";
    $notifikasi= $path . "image/notif.png";
    $dok = $path . "image/dok.png";
    $user = $path . "image/user2.png";
    $penghuni = $path . "image/tamu.png";    
    $warga = $path . "image/warga.jpg";
    $dash = $path . "image/dash.png";
 
	echo "$header
    <div class='panel' style='$padding'>
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border-top:white'>
                            <div class='box-body no-padding'>
                            <ul class='users-list clearfix'>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=all/bp/$blok/$kode_rumah'><img src='$bp' width='80px' alt='User Image'><br>
                                    Info Warga</a>
                                </li> 
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=all/keu/$blok/$kode_rumah'><img src='$keu' width='80px' alt='User Image'><br>
                                    Keuangan</a>
                                </li>
                                <!--<li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=all/bayar/$blok/$kode_rumah'><img src='$bayar' width='80px'  alt='User Image'><br>
                                    Bayar Iuran</a>
                                </li>-->
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=all/iuran/$blok/$kode_rumah'><img src='$iuran' width='80px' alt='User Image'><br>
                                    Iuran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/fWarga.php&param=all/warga/$blok/$kode_rumah'><img src='$warga' width='80px' alt='User Image'><br>
                                    Warga </a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=all/dash/$blok/$kode_rumah'><img src='$dash' width='80px' alt='User Image'><br>
                                    Dashboard </a>
                                </li>
                                
                            </ul>
                            <!-- /.users-list -->
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box-header with-border'>
                            <h3 class='box-title'>Info</h3>                      
                            <div class='box-tools pull-right'>
                                <a type='button' class='btn btn-box-tool' style='cursor:pointer;'> See More
                                </a>
                            </div>
                        </div>
                        <div class='box-body'>";

                        while ($row = $rs3->FetchNextObject($toupper=false)){
                            $foto= $path."web".$row->file_gambar;
                        echo "
                            <a style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwUNews.php&param=$row->id/news/$blok/$kode_rumah'>
                            <div class='col-md-12 col-md-2'>
                                <div class='box box-widget widget-user'>
                                    <div class='widget-user-header bg-black' style='background: url($foto) ;'>
                                        <h3 class='widget-user-username'></h3>
                                        <h5 class='widget-user-desc'></h5>
                                    </div>
                                    <div class='box-footer'>
                                        <h5 class='description-header'>$row->judul</h5>
                                        <span class='description-text'>$row->tgl</span>
                                    </div>
                                </div>
                            </div> 
                            </a>
                            ";
                        }
                        echo"
                        </div>";            
        echo"       </div> 
                </div>                
            </div>
       </div>";     
                		
		echo "
        <script type='text/javascript'>
        </script>";

   
?>
