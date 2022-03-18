<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $fmain=$_SESSION['fMain'];

    $kode_fs="FS1";

    $tmp=explode("|",$_GET['param']);
    $periode=$tmp[0];
    $kode_pp=$tmp[1];
    $box=$tmp[2];
    $jenis=$tmp[3];
    $kunci=$tmp[4];
    $nama=$tmp[5];
    $param=$tmp[6];
    $key=$tmp[7];
    $key2=$tmp[8];
    
    $judul="Buku Besar";

    

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){

        $mobile=true;
        $back1="";
        $backto="$fmain?hal=app/ypt/dashYptPpDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$param|$key";
    
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$fmain?hal=app/ypt/dashYptPpDet3.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$param|$key' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

	echo "<div class='panel' style='$padding'>
                <div class='panel-body'>
                    $back1
                    <div class='col-md-12' style='padding-left: 0px;padding-top: 0px;'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-book'></i>
                            <h3 class='box-title'>Buku Besar</h3>
                        </div>
                        <div class='box-body'>";
                        echo"<div class='row invoice-info'>";

                            if($tmp[9] == "semua"){
                                $sql="select a.kode_lokasi,a.kode_akun,b.nama,a.so_awal,a.periode,case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit from exs_glma a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi  where a.kode_lokasi='$kode_lokasi' and a.periode='".substr($periode,0,4)."01' and a.kode_akun='$key2' order by a.kode_akun";
                                $per= substr($periode,0,4)."01 s.d ".$periode;
                            }else{
                                $sql=" select a.kode_lokasi,a.kode_akun,b.nama,a.so_awal,a.periode,case when a.so_awal>=0 then a.so_awal else 0 end as so_debet,case when a.so_awal<0 then a.so_awal else 0 end as so_kredit 
                                from exs_glma a
                                inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.kode_akun='$key2' 
                                order by a.kode_akun";
                                $per=$periode;
                            }

                                // echo $sql;

                                $rs=execute($sql);
                                $row = $rs->FetchNextObject($toupper=false);
                                echo"
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Kode Akun
                                            </strong>
                                            <br>
                                            $row->kode_akun
                                        </address>
                                    </div>
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Nama Akun
                                            </strong>
                                            <br>
                                            $row->nama
                                        </address>
                                    </div>
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Periode
                                            </strong>
                                            <br>
                                            $per
                                        </address>
                                    </div>
                                    <div class='col-sm-3 invoice-col'>
                                        <address style='margin-bottom: 5px;'>
                                            <strong>
                                            Saldo Awal 
                                            </strong>
                                            <br>
                                            ".number_format($row->so_awal,0,',','.')."
                                        </address>
                                    </div>
                                    <div class='col-sm-12 invoice-col' style='padding-top:10px'>
                                    <a class='btn btn-primary btn-sm' id='btnTampil' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYptPpDet4.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$param|$key|$key2|semua';\">Tampil Semua</a>
                                    </div>
                                </div>
                            </div> 
                            <div class='row'>";
                                   
                                        if($tmp[9] == "semua"){
                                            $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen,a.tanggal,a.dc
                                            from gldt a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode='$periode' 
                                            union all 
                                            select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                                    case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen,a.tanggal,a.dc
                                            from gldt_h a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode between '".substr($periode,0,4)."01' and '$periode'
                                            order by a.tanggal,a.no_bukti,a.dc ";
                                            
                                        }else{
                                            $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                                            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen,a.dc
                                            from gldt a
                                            where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun' and a.periode ='$periode'
                                            order by a.tanggal,a.no_bukti,a.dc";
                                        }

                                        
                                            // echo $sql;

                                        $rs1 = execute($sql);

                                        $saldo=$row->so_awal;
                                        $debet=0;
                                        $kredit=0;

                                        while ($row1 = $rs1->FetchNextObject($toupper=false))
                                        {
                                            $saldo=$saldo + $row1->debet - $row1->kredit;	
                                            $debet=$debet+$row1->debet;
                                            $kredit=$kredit+$row1->kredit;	

                                            echo"
                                            <a style='cursor:pointer;color:blue' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYptPpDet5.php&param=$periode|$kode_pp|$box|$jenis|$kunci|$nama|$param|$key|$key2|$row1->no_bukti';\">
                                            <div class='box-footer box-comments' style='background:white;border-top:0px solid white'>
                                                <div class='box-comment'>
                                                    <div class='comment-text' style='margin-left: 13px;'>
                                                        <span class='username'>
                                                            $row1->no_bukti - $row1->tgl
                                                            <span class='text-muted pull-right' style='font-size:14px'>$row1->dc</span>
                                                        </span><!-- /.username -->
                                                        <span class='username'>
                                                            Kode PP : $row1->kode_pp | Kode DRK :  $row1->kode_drk
                                                            <span class='text-muted pull-right' style='font-size:14px'></span>
                                                        </span><!-- /.username -->
                                                        $row1->keterangan ";
                                                        if ($row1->dc == 'D') {
                                                            echo"
                                                            <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row1->debet,0,",",".")."</b></span>";
                                                        }else{
                                                            echo"
                                                            <span class='text-muted pull-right' style='font-size:14px'><b>".number_format($row1->kredit,0,",",".")."</b></span>";
                                                        }
                                                        echo"
                                                    </div>
                                                </div>
                                            </div>
                                            </a>";                                                
                                        }
                            echo"</div>
                            </div>";    
                    echo"</div>
                    </div>";                
        echo"   </div>
            </div>";
        
        echo"
        <script type='text/javascript'>
       
        </script>
        ";
    
?>
