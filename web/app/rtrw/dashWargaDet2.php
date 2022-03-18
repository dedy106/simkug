<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');

    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];
    $param=$tmp[2];
    $tahun=$tmp[3];
    $no_rumah=$tmp[4];
    $blok=$tmp[5];

    $path = "http://".$_SERVER["SERVER_NAME"]."/";					
    $path2 = $path . "image/yspt2.png";
    
    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){

        $back1="";
        switch($param){
            case "detKeu" :
                $judul = "Riwayat Transaksi";
            break;
            case "detRekap" :
                $judul = "Detail Rekap";
            break;
        }
        

        if($tmp[6] == "" OR $tmp[6]==0){
            $backto="fMainMobile.php?hal=app/rtrw/dashWargaDet.php&param=$jenis/$kunci/$blok/$no_rumah";
        }else{
            $prev=intval($tmp[6])-1;
            // if($next == 1) $next = 0;
            $backto="fMainMobile.php?hal=app/rtrw/dashWargaDet2.php&param=$jenis/$kunci/$param/$tahun/$no_rumah/$blok/$prev";
        }

        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";
    }else{

        if($tmp[3] == "" OR $tmp[3]==0){
            $back1="<div class='panel-heading'>
            <a href='fMainMobile.php?hal=app/rtrw/dashWargaDet.php&param=$jenis/$kunci/$blok/$no_rumah' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
            </div>";
        }else{
            $prev=intval($tmp[3])-1;
            // if($next == 1) $next = 0;
            $back1="<div class='panel-heading'>
            <a href='fMainMobile.php?hal=app/rtrw/dashWargaDet2.php&param=$jenis/$kunci/$param/$tahun/$no_rumah/$blok/$prev' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a>
            </div>";
        }

        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }

    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1 ";
                switch($param){
                    
                    
                    case "detKeu" :
                   
                echo"
                <div class='box box-widget'>
                    <div class='box-body'>
                        <h4> Riwayat Transaksi </h4>
                    </div>";

                    
                    $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
                    $kode_akun= $sqlakun->fields[0];
                    
                     $sql2="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
                          from gldt where kode_akun ='$kode_akun' and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi'
                          order by tgl_input desc ";

                     $rs=execute($sql2);
                     $torecord =  $rs->RecordCount();
                     if($tmp[6] == ""){
                        $page = 0;
                        $nextpage = 0;
                     }else{
                        $page = $tmp[6];
                        $nextpage = ($page * 20) + 1;
                     }
                     $jumpage = ceil($torecord/20);
                    
                     $sql = $sql2." 
                     OFFSET ".$nextpage." ROWS FETCH NEXT 20 ROWS ONLY";
                     $rs2 = execute($sql);  
                    while ($row2 = $rs2->FetchNextObject($toupper=false)){
                        $jenis2 = strtoupper($row2->jenis);

                            if ($jenis2 == "BK"){
                                $color="color:#dd4b39";//merah
                                // $total=$row2->tagihan;
                                $gmbr=$path."image/red4.png";
                            }else{
                                // $color="color:#1cbbff";
                                $color="color:#01f400"; //hijau
                                // $total=$row2->bayar;
                                $gmbr=$path."image/green4.png";
                            }
                            echo"
                            <div class='box-footer box-comments' style='background:white'>
                                <div class='box-comment'>
                                    <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                    <div class='comment-text'>
                                        <span class='username'>
                                            $row2->keterangan
                                            <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($row2->nilai1,0,",",".")."</b></span>
                                        </span><!-- /.username -->
                                            Tanggal $row2->tgl
                                    </div>
                                </div>
                            </div>";

                        }
                        if($jumpage > 1 AND $page < ($jumpage-1) ){
                            $page++;
                            echo "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/rtrw/dashWargaDet2.php&param=$jenis/$kunci/$param/$tahun/$no_rumah/$blok/$page';\">Next Page
                            </a>";
                        }
                echo"
                </div>                   
                ";
                    break;
                    case "detRekap" :
                   
                    $kode_drk = $tmp[3];
                    echo"
                    <div class='box box-widget'>
                        <div class='box-body'>
                            <h4> Riwayat Transaksi </h4>
                        </div>";
    
                        
                        $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
                        $kode_akun= $sqlakun->fields[0];
                        
                         $sql2="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
                              from gldt where kode_akun ='$kode_akun' and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi' and kode_drk ='$kode_drk'
                              order by tgl_input desc ";
    
                         $rs=execute($sql2);
                         $torecord =  $rs->RecordCount();
                         if($tmp[6] == ""){
                            $page = 0;
                            $nextpage = 0;
                         }else{
                            $page = $tmp[6];
                            $nextpage = ($page * 20) + 1;
                         }
                         $jumpage = ceil($torecord/20);
                        
                        //  $sql = $sql2." 
                        // OFFSET ".$nextpage." ROWS FETCH NEXT 20 ROWS ONLY";
                        $sql = $sql2;
                         $rs2 = execute($sql);  
                        while ($row2 = $rs2->FetchNextObject($toupper=false)){
                            $jenis2 = strtoupper($row2->jenis);
    
                                if ($jenis2 == "BK"){
                                    $color="color:#dd4b39";//merah
                                    // $total=$row2->tagihan;
                                    $gmbr=$path."image/red4.png";
                                }else{
                                    // $color="color:#1cbbff";
                                    $color="color:#01f400"; //hijau
                                    // $total=$row2->bayar;
                                    $gmbr=$path."image/green4.png";
                                }
                                echo"
                                <div class='box-footer box-comments' style='background:white'>
                                    <div class='box-comment'>
                                        <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                        <div class='comment-text'>
                                            <span class='username'>
                                                $row2->keterangan
                                                <span class='text-muted pull-right' style='$color;font-size:14px'><b>Rp. ".number_format($row2->nilai1,0,",",".")."</b></span>
                                            </span><!-- /.username -->
                                                Tanggal $row2->tgl
                                        </div>
                                    </div>
                                </div>";
    
                        }
                            // if($jumpage > 1 AND $page < ($jumpage-1) ){
                            //     $page++;
                            //     echo "<a style='cursor:pointer;'  class='btn btn-default btn-block' onclick=\"window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/$param/$kode_drk/$page';\">Next Page
                            //     </a>";
                            // }
                    echo"
                    </div>                   
                    ";
                        break;
                    
          
                }
           
        
        echo"   
            </div>
        </div>";

?>
