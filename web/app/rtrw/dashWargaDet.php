<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');
    

    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];

    if($tmp[2] != ""){
        $per = $tmp[2];
    }

    if($tmp[3] != ""){
        $rt = $tmp[3];
    }

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $path2 = $path . "image/keubg.png";
    $foto = $path . "image/wallpaper/Forest.jpg";

    switch($kunci){
        case "keu" :
        $judul = "Keuangan";
        break;
        case "rekap" :
        $judul = "Rekap";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="fMainMobile.php?hal=app/rtrw/dashWarga.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashWarga.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }
    
    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";
                switch($kunci){
                    case "keu" :

                    
                    $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
                    $kode_akun= $sqlakun->fields[0];

                    $sql="select sum(nilai) as saldo from
                    (
                        select so_akhir as nilai from glma_pp where kode_akun ='$kode_akun' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' 
                        union 
                        select sum(case dc when 'D' then nilai else -nilai end) as nilai 
                        from gldt where kode_akun ='$kode_akun' and kode_lokasi='$kode_lokasi' 
                    ) a
                    ";

                    // echo $sql;

                    $rs = execute($sql);  
                    $row = $rs->FetchNextObject($toupper=false);
                echo"
                <div class='box box-widget'>
                    <div class='box-body'>
                        <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                                <p>Saldo Kas</p>
                                <h4>Rp. ".number_format($row->saldo,0,",",".")."</h4>
                                <p>Untuk informasi lebih lanjut hubungi Bendahara </p>                              
                        </div>
                        <h4> Riwayat Transaksi </h4>
                    </div>";

                     $sql="select top 10 convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
                          from gldt where kode_akun ='$kode_akun' and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi'
                          order by tgl_input desc ";

                        //   echo $sql;

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
                        echo"<a href='fMainMobile.php?hal=app/rtrw/dashWargaDet2.php&param=$jenis/$kunci/detKeu/' style='cursor:pointer;' >
                        <div class='box-footer box-comments' style='background:white'>
                            <div class='box-comment'>
                                
                                <div class='comment-text'>
                                    <span class='username' style='text-align:center'>
                                        View More 
                                        <span class='text-muted pull-right' style='font-size:14px'><b></b><i class='fa fa-angle-right'></i></span>
                                    </span><!-- /.username -->
                                </div>
                            </div>
                        </div>
                        </a>";
                echo"
                </div>                   
                ";

                        break;
                        case "rekap" :

                        $sql="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                        from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                        where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '2019%' and a.kode_akun not in ('11101') and b.jenis ='PENERIMAAN'
                        group by a.kode_drk,b.nama,b.jenis,b.idx
                        order by b.jenis,b.idx";

                        // echo $sql;
                        $total1 = 0;
                        $rs = execute($sql);  
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-1' style='padding-left:0px'>I</div>
                            <div class='col-xs-7' style='padding-left:0px'>PENERIMAAN</div>
                            <div class='col-xs-4' style='padding-left:0px'>TOTAL</div>
                        </div>";
                        while ($row = $rs->FetchNextObject($toupper=false)){
                            $total1+=+$row->total;
                            echo"
                            <div class='row' style='margin-left:0px;margin-right:0px'>
                                <div class='col-xs-1' style='padding-left:0px'></div>
                                <div class='col-xs-1' style='padding-left:0px;padding-right:5px'>$row->kode_drk</div>
                                <div class='col-xs-6' style='padding-left:10px;'>$row->nama</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px'><a href='fMainMobile.php?hal=app/rtrw/dashWargaDet2.php&param=$jenis/$kunci/detRekap/$row->kode_drk' style='cursor:pointer;color:blue' >".number_format($row->total*-1,0,",",".")."</a></div>
                            </div>";
                        }
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>TOTAL PENERIMAAN</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total1*-1,0,",",".")."</div>
                        </div>";

                        $sql2="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                        from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                        where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '2019%' and a.kode_akun not in ('11101') and b.jenis ='PENGELUARAN'
                        group by a.kode_drk,b.nama,b.jenis,b.idx
                        order by b.jenis,b.idx";

                        $rs2 = execute($sql2);
                        $total2 = 0;  
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-1' style='padding-left:0px'>II</div>
                            <div class='col-xs-7' style='padding-left:0px'>PENGELUARAN</div>
                            <div class='col-xs-4 ' style='padding-left:0px'>TOTAL</div>
                        </div>";
                        while ($row2 = $rs2->FetchNextObject($toupper=false)){
                            $total2+=+$row2->total;
                            echo"
                            <div class='row' style='margin-left:0px;margin-right:0px'>
                                <div class='col-xs-1' style='padding-left:0px'></div>
                                <div class='col-xs-1' style='padding-left:0px;padding-right:5px'>$row2->kode_drk</div>
                                <div class='col-xs-6' style='padding-left:10px'>$row2->nama</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px'><a href='fMainMobile.php?hal=app/rtrw/dashWargaDet2.php&param=$jenis/$kunci/detRekap/$row2->kode_drk' style='cursor:pointer;color:blue' >".number_format($row2->total,0,",",".")."</a></div>
                            </div>";
                        }
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>TOTAL PENGELUARAN</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px;'>".number_format($total2,0,",",".")."</div>
                        </div>";
                        $total = $total1+$total2;
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>SALDO KAS</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total*-1,0,",",".")."</div>
                        </div>";



                        
                        break;
                        
                }
               
            
            echo"   
                </div>
            </div>";
           
    
        echo "<script type='text/javascript'>
            $(document).ready(function(){                 

                $('#dash_periode').change(function(e) { 
                    e.preventDefault();
                    var periode = this.value;
                    var rt = $('#dash_rt').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashWargaDet.php&param=$jenis/$kunci/'+periode+'/'+rt;
                });

                $('#dash_rt').change(function(e) { 
                    e.preventDefault();
                    var rt = this.value;
                    var periode = $('#dash_periode').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashWargaDet.php&param=$jenis/$kunci/'+periode+'/'+rt;
                });

            });
			</script>";
?>
