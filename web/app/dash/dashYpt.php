<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $logomain = $path.'/image/ypt.jpeg';
    $mainname="Yayasan Pendidikan Telkom";

    // echo $kode_fs;

    $kode_fs="FS1";

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
    }

   

    // // $sql3="select top 6 a.id, convert(varchar,tanggal,103) as tgl, judul, a.keterangan, a.nik_user, a.tgl_input, c.file_gambar , c.file_type 
    // // from lab_konten a 
    // // left join lab_konten_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi 
    // // left join lab_konten_galeri c on a.header_url=c.id and a.kode_lokasi=c.kode_lokasi 
    // // where a.kode_klp='KLP01' and a.kode_lokasi='$kode_lokasi' 
    // // order by tanggal desc ";
    // // $rs3 = execute($sql3);

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $keu = $path . "image/keu.jpg";
    $pbh = $path . "image/pbh.png";
    $rra = $path . "image/agg2.png";
    $agg = $path . "image/pbh3.png";
 
	echo "$header
    <div class='panel' style='$padding'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border-top:white'>
                            <div class='box-body no-padding'>
                            <ul class='users-list clearfix'>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='$fmain?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|keu'><img src='$keu' width='80px' alt='User Image'><br>
                                    Keuangan</a>
                                </li> 
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='$fmain?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|pbh'><img src='$pbh' width='80px' alt='User Image'><br>
                                    Pembendaharaan</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;' href='$fmain?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|rra'><img src='$rra' width='80px'  alt='User Image'><br>
                                    RRA Anggaran</a>
                                </li>
                                <li style='width:$width'>
                                    <a class='users-list-name' style='cursor:pointer;'  href='$fmain?hal=app/dash/dashYptDet.php&param=$periode|$kode_pp|agg'><img src='$agg' width='80px'  alt='User Image'><br>
                                    Anggaran</a>
                                </li>
                            </ul>
                            <!-- /.users-list -->
                            </div>
                        </div>
                    </div>
                </div>";
                // echo"
                // <div class='row'>
                //     <div class='col-md-12'>
                //         <div class='box-header with-border'>
                //             <h3 class='box-title'>Info</h3>                      
                //             <div class='box-tools pull-right'>
                //                 <a type='button' class='btn btn-box-tool' style='cursor:pointer;'> See More
                //                 </a>
                //             </div>
                //         </div>
                //         <div class='box-body'>";

                //         while ($row = $rs3->FetchNextObject($toupper=false)){
                //             $nama_foto=str_replace(" ","%",$row->file_gambar);
                //             $foto= $path."web".$nama_foto;
                //         echo "
                //             <a style='cursor:pointer;' href='$fmain?hal=app/rtrw/dashRtRwNews.php&param=$row->id/news/$blok/$kode_rumah'>
                //             <div class='col-md-12 col-md-2'>
                //                 <div class='box box-widget widget-user'>
                //                     <div class='widget-user-header bg-black' style='background: url($foto); background-size:100% 100%'>
                //                         <h3 class='widget-user-username'></h3>
                //                         <h5 class='widget-user-desc'></h5>
                //                     </div>
                //                     <div class='box-footer'>
                //                         <h5 class='description-header'>$row->judul</h5>
                //                         <span class='description-text'>$row->tgl</span>
                //                     </div>
                //                 </div>
                //             </div> 
                //             </a>
                //             ";
                //         }
                //         echo"
                //         </div>
                //     </div>
                // </div>";
            echo"               
            </div>
       </div>";    
       
       
                		
		echo "
        <script type='text/javascript'>
        </script>";

   
?>
