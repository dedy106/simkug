<?php
    
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    $periode=date('Y').date('m');

    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];
    $blok=$tmp[2];
    $kode_rumah=$tmp[3];
    $tahun=substr($periode,0,4);

    // echo $kode_rumah;

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $path2 = $path . "image/keubg.png";
    $foto = $path . "image/wallpaper/Forest.jpg";

    switch($kunci){
        case "bp" :
        $judul = "Buku Penghubung";
        break;
        case "keu" :
        $judul = "Keuangan";
        break;
        case "news" :
        $judul = "News";
        break;
        case "iuran" :
        $judul = "Iuran";
        break;
        case "list" :
        $judul = "List Iuran";
        break;
        case "bayar" :
        $judul = "Bayar Iuran";
        break;
        case "kas" :
        $judul = "Kas Masuk / Keluar";
        break;
        case "saldo" :
        if($tmp[4] != ""){
            $per = $tmp[4];
        }
    
        if($tmp[5] != ""){
            $rt = $tmp[5];
        }
        $judul = "Saldo Tagihan";
        break;
        case "setor" :
        if($tmp[4] != ""){
            $per = $tmp[4];
        }
    
        if($tmp[5] != ""){
            $rt = $tmp[5];
        }
        $judul = "Setoran";
        break;
        case "bayar2" :
            $judul = "Bayar Iuran 2";
        break;
        case "setor2" :
            if($tmp[4] != ""){
                $per = $tmp[4];
            }
        
            if($tmp[5] != ""){
                $rt = $tmp[5];
            }
            $judul = "Setoran 2";
        break;
        case "rekap2" :
            $judul = "Rekap 2";
            if($tmp[4] != ""){
                $per = $tmp[4];
            }else{
                $per = $periode;
            }
        break;
        
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="fMainMobile.php?hal=app/rtrw/dashRtRw.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashRtRw.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }

    if($kunci != "warga"){
    
    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";
                switch($kunci){
                    case "bp" :
                    echo "
                <div class='row'>
                    <div class='col-md-12'>
                        <ul class='timeline'>";

                        $sql="select distinct convert(varchar,tanggal,103) as tgl from rt_buku_p where kode_lokasi='$kode_lokasi' order by convert(varchar,tanggal,103)   ";

                        $rs = execute($sql);  
                        while ($row = $rs->FetchNextObject($toupper=false)){

                        echo"    
                            <li class='time-label'>
                                <span class='bg-blue'>
                                    $row->tgl
                                </span>
                            </li>
                            ";

                            $sql2="select no_bukti, tanggal, keterangan, convert(varchar(10), tgl_input, 108) as jam,file_gambar,jenis,file_dok from rt_buku_p where convert(varchar,tanggal,103) = '$row->tgl' order by convert(varchar(10), tgl_input, 108)  ";

                            $rs2 = execute($sql2);  
                            while ($row2 = $rs2->FetchNextObject($toupper=false)){

                            $gambar= $path."web".$row2->file_gambar;
                            $pathdok= $path."web".$row2->file_dok;
                            $keterangan= urldecode($row2->keterangan);
                                
                        echo"
                            <li>
                            <i class='fa fa-envelope bg-blue'></i>
                            <div class='timeline-item'>
                                <span class='time'><i class='fa fa-clock-o'></i> $row2->jam</span>
                                <h3 class='timeline-header'><a href='#'>$row2->no_bukti</a> $row2->jenis</h3>
                                <div class='timeline-body'>
                                    <img src='$gambar' alt='...' class='margin' width='150px'>
                                    ".$keterangan."
                                </div>
                                <div class='timeline-footer'>
                                <a class='btn btn-primary btn-xs' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwNews.php&param=$row2->no_bukti/bp/$blok/$kode_rumah' >Read More</a>
                                <a class='btn btn-success btn-xs' href='$pathdok' target='_blank'>Download Dokumen</a>
                                </div>
                            </div>
                            </li>
                        ";
                            }

                        }
                        echo"
                            <li>
                            <i class='fa fa-clock-o bg-gray'></i>
                            </li>
                        </ul>
                        </div>
                    </div> ";
                        break;
                        case "keu" :
                            echo"
                            <div class='box box-widget'>
                                <div class='box-header'>
                                <select class='form-control input-sm selectize' id='dash_tahun2' style='margin-bottom:5px;'>
                                <option value=''>Pilih Tahun</option>";
            
                                // if(isset($tmp[4])){
                                //     echo " <option value=".$tmp[4]." selected >".$tmp[4]."</option>";
                                // }else{
                                //     echo " <option value=".$tahun." selected >".$tahun."</option>";
                                // }
                                $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
                                $kode_akun= $sqlakun->fields[0];
            
                                if(isset($tmp[4])){
                                    $filthn = $tmp[4];
                                }else{
                                    $filthn = $tahun;
                                }
    
    
                                if(isset($tmp[5])){
                                    $kode_akun = $tmp[5];
                                }else{
                                    $kode_akun = $kode_akun;
                                }
    
                                $sql="select distinct a.periode from (select (substring(periode,1,4)) as periode from gldt where kode_akun='$kode_akun' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' 
                                union all
                                select 
                                (substring(periode,1,4)) as periode from glma_pp where kode_akun='$kode_akun' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' ) a
                                order by a.periode desc ";
                                
                                $resLok = execute($sql);
                            
                                while ($row = $resLok->FetchNextObject(false)){
                                    if($filthn == $row->periode){
                                        $selected = "selected";
                                    }else{
                                        $selected="";
                                    }
                                    echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
                                }
                        
                            echo"  
                                </select>
                                <select class='form-control selectize' id='kode_akun' name='kode_akun'>
                                    <option value=''>--- Pilih Akun ---</option>
                                ";
                                $sql="select a.kode_akun,a.nama 
                                from masakun a 
                                inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$kode_pp'
                                inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='$kode_lokasi'  ";
                                
                                $resakun = execute($sql);
                            
                                while ($row = $resakun->FetchNextObject(false)){
                                    if($kode_akun == $row->kode_akun){
                                        $selected = "selected";
                                    }else{
                                        $selected="";
                                    }
                                    echo " <option value=".$row->kode_akun." $selected>".$row->nama." - ".$row->kode_akun."</option>";
                                }
                            echo"
                                </select>
                                </div>";
                               
                                $sql="select sum(nilai) as saldo from
                                (
                                    select so_akhir as nilai from glma_pp where kode_akun ='$kode_akun' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode like '$filthn%'
                                    union 
                                    select sum(case dc when 'D' then nilai else -nilai end) as nilai 
                                    from gldt where kode_akun ='$kode_akun' and kode_lokasi='$kode_lokasi' and periode like '$filthn%'
                                ) a
                                ";
            
                                // echo $sql;
            
                                $rs = execute($sql);  
                                $row = $rs->FetchNextObject($toupper=false);
                                echo"        
                        <div class='box-body'>
                            <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                                    <p>Saldo Kas <span style='text-align:right'>$tahun</span></p>
                                    <h4>Rp. ".number_format($row->saldo,0,",",".")."</h4>
                                    <p>Untuk informasi lebih lanjut hubungi Bendahara </p>                              
                            </div>
                            <h4> Riwayat Transaksi </h4>
                        </div>";
    
                         $sql="select top 10 convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
                              from gldt where kode_akun ='$kode_akun' and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi' and periode like '$filthn%'
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
                            echo"<a href='fMainMobile.php?hal=app/rtrw/dashRtRwDet2.php&param=$jenis/$kunci/detKeu/$filthn/$kode_rumah/$blok/$kode_akun' style='cursor:pointer;' >
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
                        case "news" :

                        $sql="select no_konten,convert(varchar,tanggal,105) as tgl,judul,file_dok from sis_konten where kode_lokasi = '$kode_lokasi' and kode_pp ='$kode_pp' ";

                        $rs = execute($sql);  
                        while ($row = $rs->FetchNextObject($toupper=false)){
                            $foto2 = $path . "web".$row->file_dok;
                     echo "
                        <div class='col-md-12 col-md-12'>
                            <!-- Widget: user widget style 1 -->
                            <div class='box box-widget widget-user'>
                                <!-- Add the bg color to the header using any of the bg-* classes -->
                                <div class='widget-user-header bg-black' style='background: url($foto2) center center;'>
                                    <h3 class='widget-user-username'></h3>
                                    <h5 class='widget-user-desc'></h5>
                                </div>
                                
                                <div class='box-footer'>
                                    <h5 class='description-header'>$row->judul</h5>
                                    <span class='description-text'>$row->tgl</span>  
                                </div>
                                <!-- /.widget-user -->
                            </div>
                        </div> ";
            
                        }
                        break;
                        case "iuran" :

                        $sql="select sum(nilai) as saldo from 
                        (
                        select sum(a.nilai_rt+a.nilai_rw) as nilai
                        from rt_bill_d a
                        where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                        union 
                        select -sum(a.nilai_rt+a.nilai_rw) as nilai
                        from rt_angs_d a
                        where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                        ) a ";

                        // echo $sql;


                        $rs = execute($sql);  
                        $row = $rs->FetchNextObject($toupper=false);
                        $saldo=$row->saldo;

                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <div class='pull-right' style='color: black;padding: 10px 10px 10px 10px;'>No Rumah : <span style='font-weight: bold;'> &nbsp;&nbsp;$kode_rumah</span></div><br/><br/>
                                    <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                                        <p>Saldo Tagihan</p>
                                        <h4>Rp. ".number_format($saldo,0,",",".")."</h4>
                                        <p>Untuk informasi lebih lanjut hubungi bendahara </p>               <a href='fMainMobile.php?hal=app/rtrw/dashRtRwDet2.php&param=$jenis/$kunci/detTagih/$tahun/$kode_rumah/$blok' style='cursor:pointer;'><span class='pull-right'><i class='fa fa-chevron-circle-right ' style='font-size:30px'></i></span></a>
                                        <br>               
                                    </div>
                                    <h4> Riwayat Pembayaran </h4>
                                </div>";
        
                                $sql="select a.no_bukti, a.keterangan, convert(varchar,a.tanggal,105) as tgl,a.nilai1 as nilai1 from trans_m a 
                                where a.periode <= '$periode' and a.kode_lokasi='$kode_lokasi' and a.param1='$kode_rumah' and a.param2='IWAJIB'
                                order by a.no_bukti desc";
                                // echo $sql;
        
                                $rs2 = execute($sql);  
                                while ($row2 = $rs2->FetchNextObject($toupper=false)){
        
                                    // if ($row2->modul == "bill"){
                                        $color="color:#01f400";
                                        // $total=$row2->tagihan;
                                        $gmbr=$path."image/green2.png";
                                    // }else{
                                    //     $color="color:#1cbbff";
                                    //     $total=$row2->bayar;
                                    //     $gmbr=$path2."image/blue.png";
                                    // }
                                    echo"
                                    <div class='box-footer box-comments' style='background:white'>
                                        <div class='box-comment'>
                                            <img class='img-circle img-sm' src='$gmbr' alt='User Image'>
                                            <div class='comment-text'>
                                                <span class='username'>
                                                    $row2->keterangan
                                                    <span class='text-muted pull-right' style='$color;font-size:14px'><b>".number_format($row2->nilai1,0,",",".")."</b></span>
                                                </span><!-- /.username -->
                                                    Tanggal $row2->tgl
                                            </div>
                                        </div>
                                    </div>";
        
                                }
                                
                        echo"
                        </div>                   
                        ";
                        break;
                        case "list":

                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <div class='row'>
                                        <div class='col-md-1'><label>Blok</label>
                                        </div>
                                        <div class='col-md-3'>
                                        <select class='form-control input-sm selectize' id='dash_blok' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Blok</option>";
                                        $resLok = execute("select blok from rt_blok where kode_lokasi='$kode_lokasi' order by blok ");
                                    
                                        echo " <option value=".$blok." selected>".$blok."</option>";

                                        while ($row = $resLok->FetchNextObject(false)){
                                            echo " <option value=".$row->blok.">".$row->blok."</option>";
                                        }
                                
                                    echo"  
                                        </select>
                                        </div>
                                    </diV>
                                </div>";
        
                                
                                    $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');

                                    echo"
                                    <table class='table no-margin'>
                                    <thead>
                                    <tr>
                                        
                                        <th width='50%' colspan='2' style='border-bottom: 1px solid white;'>No Rumah</th>
                                        <th width='50%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Saldo Tagihan</th>
                                    </tr>
                                    </thead>
                                    <tbody>";

                                    $sql="select a.kode_rumah,case when sum(nilai) < 0 then 0 else sum(nilai)end as saldo from 
                                    (
                                    select a.kode_rumah,sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_bill_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    union 
                                    select a.kode_rumah,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_angs_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    ) a
                                    group by a.kode_rumah ";

                                    $x=0;
            
                                    $rs2 = execute($sql);  
                                    while ($row = $rs2->FetchNextObject($toupper=false)){
                                        if($x % 2 == 1){
                                            $clr=$colors[1];
                                        }else{
                                            $clr=$colors[2];
                                        }
                                        echo"
                                        <tr>
                                            <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                            <td width='48%'><b>$row->kode_rumah</b></td>
                                            <td width='48%'style='text-align:right;color:".$clr."'><b>".number_format($row->saldo,0,",",".")."</b></td>
                                            <td width='2%'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwDet2.php&param=$jenis/$kunci/detTagih/$tahun/$row->kode_rumah/$blok' style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
                                        </tr>";
                                        $x++;
                                    }
                                    echo"
                                    </tbody>
                                    </table>
                                     ";
                                    
                                    
                                // }
                        echo"
                        </div>
                        ";
                        break;
                        case "bayar" :
                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <div class='row'>
                                        <div class='col-md-1'><label>Blok</label>
                                        </div>
                                        <div class='col-md-3'>
                                        <select class='form-control input-sm selectize' id='dash_blok' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Blok</option>";
                                        $resLok = execute("select blok from rt_blok where kode_lokasi='$kode_lokasi' order by blok ");

                                        echo " <option value=".$blok." selected>".$blok."</option>";
                                    
                                        while ($row = $resLok->FetchNextObject(false)){
                                            echo " <option value=".$row->blok.">".$row->blok."</option>";
                                        }
                                
                                    echo"  
                                        </select>
                                        </div>
                                    </diV>
                                </div>";
    
                                    $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');

                                    echo"
                                    <table class='table no-margin'>
                                    <thead>
                                    <tr>
                                        
                                        <th width='50%' colspan='2' style='border-bottom: 1px solid white;'>No Rumah</th>
                                        <th width='50%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Saldo Tagihan</th>
                                    </tr>
                                    </thead>
                                    <tbody>";
                                   
                                    $sql="select a.kode_rumah,case when sum(nilai) < 0 then 0 else sum(nilai)end as saldo from 
                                    (
                                    select a.kode_rumah,sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_bill_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    union 
                                    select a.kode_rumah,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                    from rt_angs_d a
                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                    group by a.kode_rumah
                                    ) a
                                    group by a.kode_rumah";

                                    $x=0;
            
                                    $rs2 = execute($sql);  
                                    while ($row = $rs2->FetchNextObject($toupper=false)){
                                        if($x % 2 == 1){
                                            $clr=$colors[1];
                                        }else{
                                            $clr=$colors[2];
                                        }
                                        echo"
                                        <tr>
                                            <td width='2%'><div style='width:30px;height:30px;color:".$clr.";border:2px solid ".$clr.";border-radius:50%;background:".$clr."'>OR9</div></td>
                                            <td width='48%'><b>$row->kode_rumah</b></td>
                                            <td width='48%'style='text-align:right;color:".$clr."'><b>Rp. ".number_format($row->saldo,0,",",".")."</b></td>
                                            <td width='2%'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwDet2.php&param=$jenis/$kunci/detBayar/$tahun/$row->kode_rumah/$blok' style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
                                        </tr>";
                                        $x++;
                                    }
                                    echo"
                                    </tbody>
                                    </table>
                                     ";
                                    
                                    
                                // }
                        echo"
                        </div>
                        ";
                        break;
                        case "kas" :
                        echo"
                        <div class='row'>
                            <div class='col-md-6'>
                                <form class='kas_insert' method='POST'>
                                    <div class='box-body'>
                                        <div class='form-group'>
                                            <label>Jenis Kas</label>
                                            <select class='form-control' id='kas-jenis' name='kode_jenis'>
                                                <option value=''>--- Pilih Jenis ---</option>
                                                <option value='Masuk'>Masuk</option>
                                                <option value='keluar'>Keluar</option>
                                            </select>
                                        </div>
                                        <div class='form-group'>
                                            <label>Referensi</label>
                                            <select class='form-control' id='kas-ref' name='kode_ref'>
                                            <option value='' disabled>--- Pilih Ref ---</option>
                                            </select>
                                        </div>
                                        <div class='form-group'>
                                            <label for='InputKet'>Keterangan</label>
                                            <input type='text' class='form-control' id='InputKet' name='keterangan'>
                                        </div>
                                        <div class='form-group'>
                                            <label for='InputNil'>Nilai</label>
                                            <input type='text'  id='InputNil' class='form-control currency' name='nilai'>
                                        </div>
                                        <div class='form-group'>
                                            <input type='hidden' class='form-control' name='kode_lokasi' value='$kode_lokasi'>
                                        </div>
                                        <div class='form-group'>
                                            <input type='hidden' class='form-control' name='nik' value='$kode_rumah'>
                                        </div>
                                        <div class='form-group'>
                                            <input type='hidden' class='form-control' name='kode_pp' value='05'>
                                        </div>
                                       
                                    </div>
                                    <!-- /.box-body -->

                                    <div class='box-footer'>
                                        <button id='btnSubmit' class='btn btn-primary'>Submit</button>
                                    </div>
                                   
                                </form>
                            </div>
                        </div>";

                        
                        break;
                        case "dash" :
                        echo"
                        <div id='sai_home_grafik'>
                            <div class='row'>
                                <div class='col-md-12'>
                                    <div class='box'>
                                        <div class='box-header'>
                                            <i class='fa fa-bar-chart'></i>
                                            <h3 class='box-title'>Collection Payment</h3>
                                            <div class='col-md-3 pull-right'><label>Tahun</label>
                                                
                                                <select class='form-control input-sm selectize' id='dash_tahun' style='margin-bottom:5px;'>
                                                <option value=''>Pilih Tahun</option>";

                                                if(isset($tmp[4])){
                                                    echo " <option value=".$tmp[4]." selected >".$tmp[4]."</option>";
                                                }else{
                                                    echo " <option value=".$tahun." selected >".$tahun."</option>";
                                                }
                                                

                                                $sql="select distinct (substring(periode_bill,1,4)) as periode from rt_angs_d where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' order by substring(periode_bill,1,4) desc ";
                                                // echo $sql;
                                                $resLok = execute($sql);
                                            
                                                while ($row = $resLok->FetchNextObject(false)){
                                                    echo " <option value=".$row->periode.">".$row->periode."</option>";
                                                }
                                        
                                            echo"  
                                                </select>
                                            </div>
                                        </div>
                                        <div class='box-body'>
                                            <div id='chart_rtrw_py'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>";

                        //GRAFIK KOMBINASI

                        // $fields = ['BILL', 'BYR'];

                        // for($s=0; $s<count($fields); $s++){
                            // $field = $fields[$s];
                            if(isset($tmp[4])){
                                $filtahun=$tmp[4];
                            }else{
                                $filtahun=substr($periode,0,4);
                            }
                            

                            $sql="
                            select a.kode_lokasi,
                                count(case when substring(a.periode_bill,5,2)='01' then a.kode_rumah else null end) n1,
                                count(case when substring(a.periode_bill,5,2)='02' then a.kode_rumah  else null end) n2,   
                                count(case when substring(a.periode_bill,5,2)='03' then a.kode_rumah  else null end) n3,
                                count(case when substring(a.periode_bill,5,2)='04' then a.kode_rumah  else null end) n4,
                                count(case when substring(a.periode_bill,5,2)='05' then a.kode_rumah  else null end) n5,
                                count(case when substring(a.periode_bill,5,2)='06' then a.kode_rumah  else null end) n6,
                                count(case when substring(a.periode_bill,5,2)='07' then a.kode_rumah  else null end) n7,
                                count(case when substring(a.periode_bill,5,2)='08' then a.kode_rumah  else null end) n8,
                                count(case when substring(a.periode_bill,5,2)='09' then a.kode_rumah  else null end) n9,
                                count(case when substring(a.periode_bill,5,2)='10' then a.kode_rumah else null end) n10,
                                count(case when substring(a.periode_bill,5,2)='11' then a.kode_rumah else null end) n11,
                                count(case when substring(a.periode_bill,5,2)='12' then a.kode_rumah else null end) n12	   
                            from rt_angs_d a
                            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and substring(a.periode_bill,1,4)='".$filtahun."' 
                            group by a.kode_lokasi
                            ";

                            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
                
                            $resPy = execute($sql);
                            while ($row = $resPy->FetchNextObject(false)){
                        
                                            $n1=$row->n1;
                                            $n2=$row->n2;
                                            $n3=$row->n3;
                                            $n4=$row->n4;
                                            $n5=$row->n5;
                                            $n6=$row->n6;
                                            $n7=$row->n7;
                                            $n8=$row->n8;
                                            $n9=$row->n9;
                                            $n10=$row->n10;
                                            $n11=$row->n11;
                                            $n12=$row->n12;
                        
                                            
                            }
                        
                            $Py[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                                            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                                            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                                            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                            );

                            $sql2="
                            select count(a.kode_rumah) as jum
                            from rt_rumah a
                            where a.rt='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
                            group by a.kode_lokasi
                            ";
                            $resPy2 = execute($sql2);
                            $row = $resPy2->FetchNextObject(false);
                            $to_rumah=$row->jum;              
                            
                            
                        // }   
                        
                        
                        
                            $no=1;
                            for($n=0;$n<=11;$n++){
                                
                                ${"nr" . $no}= ($Py[0][$n]/$to_rumah)*100;
                                $no++;

                            }

                            $Py[1]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
                            round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
                            round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
                            round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
                            );

                        
                        break;
                        case "saldo":

                    $filter = "";
                    $filter2 = "";
                    if($rt == "All"){
                        $filter = "";
                        $filter2 = "";
                    }else{
                        $filter = " and a.rt = '$rt' ";
                        $filter2 = " and kode_pp = '$rt' ";
                    }

                    if($tmp[4] !="" OR $tmp[5] !=""){
                        
                        $sql="select sum(a.bayar) as total from (select a.kode_rumah,a.keterangan, b.bill-isnull(c.bayar,0) as bayar
                                from rt_rumah a 
                                inner join 
                                
                                (select kode_rumah,kode_lokasi,sum(nilai_rt+nilai_rw) as bill 
                                from rt_bill_d 
                                where kode_lokasi='$kode_lokasi' and periode<='$per' and kode_jenis='IWAJIB'
                                group by kode_rumah,kode_lokasi
                                ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                
                                left join (
                                select kode_rumah,kode_lokasi,sum(nilai_rt+nilai_rw) as bayar
                                from rt_angs_d 
                                where kode_lokasi='$kode_lokasi' and periode_bill<='$per' and kode_jenis='IWAJIB'
                                group by kode_rumah,kode_lokasi
                                ) c on b.kode_rumah=c.kode_rumah and b.kode_lokasi=c.kode_lokasi 
                                
                                where a.kode_lokasi = '$kode_lokasi' $filter
                        ) a";
                        $rst=execute($sql);
                    }

                    echo"
                    <div class='box box-widget'>";
                    echo"<div class='box-body'>
                            <div class='row'>
                                <div class='col-xs-6'><label>RT</label>
                                </div>
                                <div class='col-xs-6'>
                                <select class='form-control input-sm selectize' id='dash_rt' style='margin-bottom:5px;'>
                                <option value=''>Pilih RT</option>";

                                $resLok = execute("select a.kode_pp,a.nama from pp a where kode_lokasi='$kode_lokasi' and a.kode_pp not in ('00')
                                order by a.kode_pp ");

                                if($rt == "All"){
                                    echo "<option value='All' selected>All</option>";
                                }else{
                                    echo "<option value='All'>All</option>";
                                }
                                
                                while ($row = $resLok->FetchNextObject(false)){
                                    if($rt == $row->kode_pp){
                                        $selected = "selected";
                                    }else{
                                        $selected = "";
                                    }
                                    echo " <option value=".$row->kode_pp." $selected>".$row->kode_pp." - ".$row->nama."</option>";
                                }
                        
                            echo"  
                                </select>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'><label>Periode</label>
                                </div>
                                <div class='col-xs-6'>
                                <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                                <option value=''>Pilih Periode</option>";
                                $resLok = execute("select distinct a.periode 
                                from (select periode from rt_setor_m where kode_lokasi='$kode_lokasi'
                                    union 
                                    select convert(varchar(6),getdate(),112) as periode 
                                ) a
                                order by a.periode desc ");
                            
                                echo " <option value=".$per." selected>".$per."</option>";

                                while ($row = $resLok->FetchNextObject(false)){
                                    echo " <option value=".$row->periode.">".$row->periode."</option>";
                                }
                        
                            echo"  
                                </select>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'><label>Total</label>
                                </div>
                                <div class='col-xs-6 text-right'><label><b>".number_format($rst->fields[0],0,",",".")."</b></label>
                                </div>
                            </div>
                        </div>";
                        $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                        
                        echo"
                        <table class='table no-margin'>
                            <thead>
                                <tr>
                                    <th width='30%'  style='border-bottom: 1px solid white;'>No Rumah</th>
                                    <th width='40%' style='border-bottom: 1px solid white;'>Keterangan</th>
                                    <th width='30%' style='text-align:right;border-bottom: 1px solid white;'>Saldo</th>
                                </tr>
                            </thead>
                            <tbody>";

                            if($tmp[4] != "" OR $tmp[5] != ""){
                                $sql="select a.kode_rumah,a.keterangan, b.bill-isnull(c.bayar,0) as bayar
                                from rt_rumah a 
                                inner join 
                                
                                (select kode_rumah,kode_lokasi,sum(nilai_rt+nilai_rw) as bill 
                                from rt_bill_d 
                                where kode_lokasi='$kode_lokasi' and periode<='$per' and kode_jenis='IWAJIB'
                                group by kode_rumah,kode_lokasi
                                ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                
                                left join (
                                select kode_rumah,kode_lokasi,sum(nilai_rt+nilai_rw) as bayar
                                from rt_angs_d 
                                where kode_lokasi='$kode_lokasi' and periode_bill<='$per' and kode_jenis='IWAJIB'
                                group by kode_rumah,kode_lokasi
                                ) c on b.kode_rumah=c.kode_rumah and b.kode_lokasi=c.kode_lokasi 
                                
                                where a.kode_lokasi = '$kode_lokasi' $filter
                                order by a.kode_rumah ";
                                
                                $x=0;
                                $rs2 = execute($sql);  
                                while ($row = $rs2->FetchNextObject($toupper=false)){
                                    if($x % 2 == 1){
                                        $clr=$colors[1];
                                    }else{
                                        $clr=$colors[2];
                                    }
                                    echo"
                                    <tr>
                                        <td width='30%'><b>$row->kode_rumah</b></td>
                                        <td width='40%'><b>$row->keterangan</b></td>
                                        <td width='30%'style='text-align:right;color:".$clr."'><b>".number_format($row->bayar,0,",",".")."</b></td>
                                    </tr>";
                                    $x++;
                                }
                            }
                            echo"
                            </tbody>
                        </table>";
                echo"</div>";
                echo"<script type='text/javascript'>             
    
                    $('#dash_periode').change(function(e) { 
                        e.preventDefault();
                        var periode = this.value;
                        var rt = $('#dash_rt').val();
    
                        window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+periode+'/'+rt;
                    });
    
                    $('#dash_rt').change(function(e) { 
                        e.preventDefault();
                        var rt = this.value;
                        var periode = $('#dash_periode').val();
    
                        window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+periode+'/'+rt;
                    });
    
                
                </script>";
                    break;
                    case "setor":

                    $filter = "";
                    $filter2 = "";
                    if($rt == "All"){
                        $filter = "";
                        $filter2 = "";
                    }else{
                        $filter = " and a.rt = '$rt' ";
                        $filter2 = " and kode_pp = '$rt' ";
                    }

                    if($tmp[4] !="" OR $tmp[5] !=""){
                        $sql=" select sum(a.bayar) from (select a.kode_rumah,a.keterangan,isnull(c.bayar,0) as bayar
                        from rt_rumah a 
                        left join 
                        (
                            select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as bayar 
                            from rt_angs_d a inner join rt_setor_m b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi
                            where b.periode = '$per'
                            group by a.kode_rumah,a.kode_lokasi 
                        
                        ) c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi 
                        where a.kode_lokasi ='$kode_lokasi' $filter
                        ) a ";
                        $rst = execute($sql);  

                        $sql3 = "select sum(jml_iuran) as iur,sum(sumbangan) as sumb,sum(gaji_bersih) as gaji,sum(kas_rt) as kas_rt,sum(kas_rw) as kas_rw 
                        from rt_setor_m
                        where periode = '$per' and kode_lokasi='$kode_lokasi' $filter2 ";
                        $rst2 = execute($sql3);
                        $row3 = $rst2->FetchNextObject($toupper=false);
                    }
                    
                    echo"
                    <div class='box box-widget'>";
                    echo"<div class='box-body'>
                            <div class='row'>
                                <div class='col-xs-6'><label>RT</label>
                                </div>
                                <div class='col-xs-6'>
                                <select class='form-control input-sm selectize' id='dash_rt' style='margin-bottom:5px;'>
                                <option value=''>Pilih RT</option>";

                                $resLok = execute("select a.kode_pp,a.nama from pp a where kode_lokasi='$kode_lokasi' and a.kode_pp not in ('00')
                                order by a.kode_pp ");

                                if($rt == "All"){
                                    echo "<option value='All' selected>All</option>";
                                }else{
                                    echo "<option value='All'>All</option>";
                                }
                                
                                while ($row = $resLok->FetchNextObject(false)){
                                    if($rt == $row->kode_pp){
                                        $selected = "selected";
                                    }else{
                                        $selected = "";
                                    }
                                    echo " <option value=".$row->kode_pp." $selected>".$row->kode_pp." - ".$row->nama."</option>";
                                }
                        
                            echo"  
                                </select>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'><label>Periode</label>
                                </div>
                                <div class='col-xs-6'>
                                <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                                <option value=''>Pilih Periode</option>";
                                $resLok = execute("select distinct a.periode 
                                from (select periode from rt_setor_m where kode_lokasi='$kode_lokasi'
                                    union 
                                    select convert(varchar(6),getdate(),112) as periode 
                                ) a
                                order by a.periode desc ");
                            
                                echo " <option value=".$per." selected>".$per."</option>";

                                while ($row = $resLok->FetchNextObject(false)){
                                    echo " <option value=".$row->periode.">".$row->periode."</option>";
                                }
                        
                            echo"  
                                </select>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'>
                                    <label>Total Terima</label>
                                </div>
                                <div class='col-xs-6 text-right'>
                                    <label>".number_format($rst->fields[0],0,",",".")."</label>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6 '>
                                    <label>Jml Rumah</label>
                                </div>
                                <div class='col-xs-6 text-right'>
                                    <label>".number_format($row3->iur,0,",",".")."</label>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'>
                                    <label>Sumb Mesjid</label>
                                </div>
                                <div class='col-xs-6 text-right'>
                                    <label>".number_format($row3->sumb,0,",",".")."</label>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'>
                                    <label>Masuk Kas RT</label>
                                </div>
                                <div class='col-xs-6 text-right'>
                                    <label>".number_format($row3->kas_rt,0,",",".")."</label>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'>
                                    <label>Gaji Kebersihan</label>
                                </div>
                                <div class='col-xs-6 text-right'>
                                    <label>".number_format($row3->gaji,0,",",".")."</label>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-xs-6'>
                                    <label>Setor RW</label>
                                </div>
                                <div class='col-xs-6 text-right'>
                                    <label>".number_format($row3->kas_rw,0,",",".")."</label>
                                </div>
                            </div>
                        </div>";
                    
                        $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                        
                        echo"
                        <table class='table no-margin'>
                            <thead>
                                <tr>
                                    <th width='30%'  style='border-bottom: 1px solid white;'>No Rumah</th>
                                    <th width='40%' style='border-bottom: 1px solid white;'>Keterangan</th>
                                    <th width='30%' style='text-align:right;border-bottom: 1px solid white;'>Bayar</th>
                                </tr>
                            </thead>
                            <tbody>";
                        
                            if($tmp[4] !="" OR $tmp[5] !=""){
                                $sql="select a.kode_rumah,a.keterangan,isnull(c.bayar,0) as bayar
                                from rt_rumah a 
                                left join 
                                (
                                    select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as bayar 
                                    from rt_angs_d a inner join rt_setor_m b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi
                                    where b.periode = '$per'
                                    group by a.kode_rumah,a.kode_lokasi 
                                
                                ) c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi 
                                where a.kode_lokasi ='$kode_lokasi' $filter 
                                order by a.kode_rumah ";
                                
                                $x=0;
                                $rs2 = execute($sql);  
                                while ($row = $rs2->FetchNextObject($toupper=false)){
                                    if($x % 2 == 1){
                                        $clr=$colors[1];
                                    }else{
                                        $clr=$colors[2];
                                    }
                                    echo"
                                    <tr>
                                        <td width='30%'><b>$row->kode_rumah</b></td>
                                        <td width='40%'><b>$row->keterangan</b></td>
                                        <td width='30%'style='text-align:right;color:".$clr."'><b>".number_format($row->bayar,0,",",".")."</b></td>
                                    </tr>";
                                    $x++;
                                }
                            }
                            echo"
                            </tbody>
                        </table>";
                echo"</div>";
                echo"<script type='text/javascript'>             
    
                    $('#dash_periode').change(function(e) { 
                        e.preventDefault();
                        var periode = this.value;
                        var rt = $('#dash_rt').val();
    
                        window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+periode+'/'+rt;
                    });
    
                    $('#dash_rt').change(function(e) { 
                        e.preventDefault();
                        var rt = this.value;
                        var periode = $('#dash_periode').val();
    
                        window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+periode+'/'+rt;
                    });
    
                
                </script>";
                    break;
                    case "bayar2" :
                        echo"
                        <div class='box box-widget'>
                                <div class='box-body'>
                                    <div class='row'>
                                        <div class='col-md-1'><label>Blok</label>
                                        </div>
                                        <div class='col-md-3'>
                                        <select class='form-control input-sm selectize' id='dash_blok' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Blok</option>";
                                        $resLok = execute("select blok from rt_blok where kode_lokasi='$kode_lokasi' order by blok ");
    
                                        echo " <option value=".$blok." selected>".$blok."</option>";
                                    
                                        while ($row = $resLok->FetchNextObject(false)){
                                            echo " <option value=".$row->blok.">".$row->blok."</option>";
                                        }
                                
                                    echo"  
                                        </select>
                                        </div>
                                    </diV>
                                </div>";
    
                                    $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
    
                                    echo"
                                    <table class='table no-margin'>
                                    <thead>
                                    <tr>
                                        
                                        <th width='20%'  style='border-bottom: 1px solid white;'>No Rumah</th>
                                        <th width='40%'  style='text-align:right;border-bottom: 1px solid white;'>Saldo</th>
                                        <th width='40%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Total Bayar</th>
                                        </tr>
                                    </thead>
                                    <tbody>";
                                   
                                    // $sql="select a.kode_rumah,case when sum(nilai) < 0 then 0 else sum(nilai)end as saldo,0 as bayar from 
                                    // (
                                    // select a.kode_rumah,sum(a.nilai_rt+a.nilai_rw) as nilai
                                    // from rt_bill_d a
                                    // inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                    // where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                    // group by a.kode_rumah
                                    // union 
                                    // select a.kode_rumah,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                    // from rt_angs_d a
                                    // inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                    // where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                    // group by a.kode_rumah
                                    // ) a
                                    // group by a.kode_rumah";
                                    $sql = "select a.kode_rumah,a.saldo,isnull(b.nilai,0) as bayar 
                                    from (
                                        select a.kode_rumah,a.kode_lokasi,case when sum(a.nilai) < 0 then 0 else sum(a.nilai)end as saldo
                                        from 
                                        (
                                            select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                                            from rt_bill_d a
                                            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                            where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                            group by a.kode_rumah,a.kode_lokasi
                                            union all
                                            select a.kode_rumah,a.kode_lokasi,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                            from rt_angs_d a
                                            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                            where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                            group by a.kode_rumah,a.kode_lokasi
                                        ) a
                                        group by a.kode_rumah,a.kode_lokasi
                                    ) a
                                    left join (	select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                                                from rt_angs_d a
                                                inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                                where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok'
                                                and a.kode_jenis='IWAJIB' and a.no_setor='-'
                                                group by a.kode_rumah,a.kode_lokasi
                                    ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                    ";
    
                                    $x=0;
            
                                    $rs2 = execute($sql);  
                                    while ($row = $rs2->FetchNextObject($toupper=false)){
                                        if($x % 2 == 1){
                                            $clr=$colors[1];
                                        }else{
                                            $clr=$colors[2];
                                        }
                                        echo"
                                        <tr>
                                            <td width='20%'><b>$row->kode_rumah</b></td>
                                            <td width='40%'style='text-align:right;color:".$clr."'><b>Rp. ".number_format($row->saldo,0,",",".")."</b></td>
                                            <td width='38%'style='text-align:right;color:".$clr."'><b>Rp. ".number_format($row->bayar,0,",",".")."</b></td>
                                            <td width='2%'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwDet2.php&param=$jenis/$kunci/detBayar2/$tahun/$row->kode_rumah/$blok' style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
                                        </tr>";
                                        $x++;
                                    }
                                    echo"
                                    </tbody>
                                    </table>
                                     ";
                                    
                                    
                                // }
                        echo"
                        </div>
                        ";
                        break;
                        case "setor2" :
                            echo"
                            <div class='box box-widget'>
                                <form class='form-setor' method='POST' >
                                    <div class='row'>
                                        <div class='col-xs-12'>
                                            <div class='box-header'>
                                                <button id='btnSubmit' class='btn btn-primary pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                                            </div>
                                            <div class='box-body'>
                                                <div class='row'>
                                                    <div class='form-group'>
                                                        <label for='inputTgl' class='col-sm-2 control-label'>Tanggal</label>
                                                        <div class='input-group date col-sm-4' style='padding-right:15px; padding-left:15px;'>
                                                        <div class='input-group-addon'>
                                                        <i class='fa fa-calendar'></i>
                                                        </div>
                                                        <input name='tanggal' class='form-control datepicker-dmy' id='tanggal' required value=".date('d-m-Y').">
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row'>
                                                    <div class='form-group'>
                                                        <label for='inputNilai' class='col-sm-2 control-label'>Total</label>
                                                        <div class='col-sm-4'>
                                                            <input type='text' name='bayar' class='form-control' id='inputNilai' readonly value='0'>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row'>
                                                    <div class='form-group'>
                                                        <div class='col-sm-3'>
                                                            <input type='hidden' name='nilRT' class='form-control' id='inputNilRT' readonly value='0'>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row'>
                                                    <div class='form-group'>
                                                        <div class='col-sm-3'>
                                                            <input type='hidden' name='nilRW' class='form-control' id='inputNilRW' readonly value='0'>
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <input type='hidden' name='kode_lokasi' class='form-control' readonly value='$kode_lokasi'>
                                                       
                                                <input type='hidden' name='nik' class='form-control' readonly value='$nik'>
                                                       
                                                <input type='hidden' name='kode_pp' class='form-control' readonly value='05' >
                                                       
                                                <input type='hidden' name='no_rumah' class='form-control' readonly value='$no_rumah' >
                                                        
                                            </div>
                                        ";
                                       
                                        $colors = array('#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F');
                                       
                                        echo"
                                        <table class='table no-margin'>
                                        <thead>
                                        <tr>
                                            
                                            <th width='50%' style='border-bottom: 1px solid white;'>No Rumah</th>
                                            <th width='50%' style='text-align:right;border-bottom: 1px solid white;' colspan='3'>Nilai</th>
                                            <th style='text-align:right;border-bottom: 1px solid white;'>&nbsp;</th>
                                        </tr>
                                        </thead>
                                        <tbody>
                                        <style>
                                        .toggle.ios, .toggle-on.ios, .toggle-off.ios { border-radius: 20px; }
                                        .toggle.ios .toggle-handle { border-radius: 20px; }
                                        </style>
                                        ";
        
                                        $sql=" select kode_lokasi,kode_rumah,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw,sum(nilai_rt+nilai_rw) as bayar
                                        from rt_angs_d where kode_lokasi ='$kode_lokasi' and no_setor='-' and kode_jenis='IWAJIB' group by kode_lokasi,kode_rumah
                                        ";
        
                                        // echo $sql;
                
                                        $rs = execute($sql);  
                                        $x=0;
                                        $total=0;
                                        while ($row = $rs->FetchNextObject($toupper=false)){
                                            if($x % 2 == 1){
                                                $clr=$colors[1];
                                            }else{
                                                $clr=$colors[2];
                                            }
                                            echo"
                                            <tr class='sai-grid-row'>
                                                <td width='25%'>".$row->kode_rumah." <input name='kode_rumah[]' value='$row->kode_rumah' type='hidden'></input></td>
                                                <td width='15%' style='text-align:right;color:".$clr."'>
                                                <input name='nilai_rt[]' class='input-nilrt' value='$row->nilai_rt' type='hidden'></input>
                                                <td width='15%' style='text-align:right;color:".$clr."'>
                                                <input name='nilai_rw[]' class='input-nilrw' value='$row->nilai_rw' type='hidden'></input>
                                                </td>
                                                <td width='18%' style='text-align:right;color:".$clr."'>Rp.".number_format($row->bayar,0,",",".")."
                                                <input name='nilai_tot[]' class='input-nilai' value='$row->bayar' type='hidden'></input>
                                                </td>
                                                <td width='2%'><input type='checkbox' checked name='toggle2[]' class='inputToggle' data-on=' ' data-off=' ' data-toggle='toggle' data-size='mini' data-style='ios'>
                                                <input type='hidden' name='toggle[]' class='input-tog'><div id='console-event$x'></div></td>
                                            </tr>";
                                            $x++;
                                            $total+=$row->bill;
                                        }
                                        echo"
                                        </tbody>
                                        </table>
                                         ";
                                        
                                        
                                    // }
                                echo"
                                    </div>
                                </div>
                            </form>
                        </div>
                            ";              
                            break;
                            case "rekap2" :
                                echo" <div class='box' style='border: none;box-shadow: none;'>
                                <div class='box-body'>
                                    <div class='row'>
                                        <div class='col-md-1' style='padding-left: 5px;
                                        padding-right: 5px;'><label>Periode</label>
                                        </div>
                                        <div class='col-md-3'  style='padding-left: 5px;
                                        padding-right: 5px;'>
                                            <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                                            <option value=''>Pilih Periode</option>";
                                            $resLok = execute("select 'all' as periode union all select distinct periode from rt_setor_m where kode_lokasi='$kode_lokasi' order by periode desc ");
        
                                            echo " <option value=".$per." selected>".$per."</option>";
                                        
                                            while ($row = $resLok->FetchNextObject(false)){
                                                echo " <option value=".$row->periode.">".$row->periode."</option>";
                                            }
                                    
                                        echo"  
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                </div>";
                                if($per == "" or $per == "all"){
                                    $filter = "";
                                }else{
                                    $filter = " and periode='$per' ";
                                }
        
                                $sql="select no_setor,convert(varchar,tanggal,103) as tanggal,isnull(sum(nilai),0)+isnull(sum(kas_rt),0)+isnull(sum(sumbangan),0) as total from rt_setor_m where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and modul='IWAJIB' $filter  group by no_setor,tanggal order by no_setor desc ";
        
                                // echo $sql;
                                $total1 = 0;
                                $rs = execute($sql);  
                                echo"
                                <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                                    <div class='col-xs-5' style='padding-left:0px'>No Setor</div>
                                    <div class='col-xs-3' style='padding-left:0px'>Tanggal</div>
                                    <div class='col-xs-4' style='padding-left:0px'>TOTAL</div>
                                </div>";
                                while ($row = $rs->FetchNextObject($toupper=false)){
                                    $total1+=+$row->total;
                                    echo"
                                    <div class='row' style='margin-left:0px;margin-right:0px;font-size:12px'>
                                        <div class='col-xs-5' style='padding-left:0px;'>$row->no_setor</div>
                                        <div class='col-xs-3' style='padding-left:0px;'>$row->tanggal</div>
                                        <div class='col-xs-4 text-right' style='padding-left:0px;' ><a href='fMainMobile.php?hal=app/rtrw/dashRtRwDet2.php&param=$jenis/$kunci/detRekap2/$tahun/$kode_rumah/$blok/$row->no_setor' style='cursor:pointer;color:blue' >".number_format($row->total,0,",",".")."</a></div>
                                    </div>";
                                }
                                echo"
                                <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px;font-size:12px'>
                                    <div class='col-xs-8' style='padding-left:0px'>TOTAL</div>
                                    <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total1,0,",",".")."</div>
                                </div>";
        
                                break;
                        
                    }
               
            
            echo"   
                </div>
            </div>";
            }else{
                        echo "<form id='rt-form-warga'>
                                <div class='row'>
                                    <div class='col-xs-12'>
                                        <div class='box'>
                                            <div class='box-header'>
                                                <h3 class='box-title'><i class='fa fa-inbox'></i> Input Data Warga</h3>
                                                <button type='submit' class='btn btn-success pull-right'><i class='fa fa-floppy-o'></i> Save</button>
                                                <a class='btn btn-default pull-right' style='margin-right: 5px;' href='fMainMobile.php?hal=app/rtrw/dashRtRw.php'><i class='fa fa-ban'></i> Cancel</a>
                                            </div>
                                        </div>
                                        <div class='box box-warning'>
                                            <div class='box-body pad'>
                                                <div class='row'>
                                                    <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Nama RT</label>
                                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <select name='kode_rt' class='form-control' id='warga-kode-rt' required >
                                                        <option value=''>--- Pilih RT ---</option>";
                                                        $sql="select a.kode_pp,a.nama from pp a inner join karyawan b on a.kode_pp=b.kode_pp where b.nik='$kode_rumah'
                                                        ";
                                                        $resRT = execute($sql);
                                                     
                                                        while ($row = $resRT->FetchNextObject(false)){
                                                            echo " <option value=".$row->kode_pp.">".$row->kode_pp."-".$row->nama."</option>";
                                                        }
                                                      
                                                        echo"
                                                        </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row'>
                                                    <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Nama Blok</label>
                                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <select name='kode_blok' class='form-control' id='warga-kode-blok' required >
                                                        <option value=''>--- Pilih Blok ---</option>";
                
                                                        echo"
                                                        </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row'>
                                                    <div class='form-group' >
                                                    <label class='control-label col-sm-3'>No Rumah</label>
                                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <select name='no_rumah' class='form-control' id='warga-no-rumah' required >
                                                        <option value=''>--- Pilih No Rumah ---</option>
                                                        ";
                                                        
                                                        echo"
                                                        </select>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row' >
                                                    <div class='form-group' style='margin-bottom:5px;'>
                                                        <label class='control-label col-sm-3'>Tgl Masuk</label>
                                                        <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                                                            <div class='input-group-addon'>
                                                                <i class='fa fa-calendar'></i>
                                                            </div>
                                                            <input name='tgl_masuk' class='form-control datepicker' >
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row' >
                                                    <div class='form-group'>
                                                        <label class='control-label col-sm-3'>Status Masuk</label>
                                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                                            <input type='text' name='sts_masuk' class='form-control' value='Pindah' maxlength='10'>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row' >
                                                    <div class='form-group'>
                                                        <div class='col-sm-9' style='margin-bottom:5px;'>
                                                            <input type='hidden' name='nik_user' class='form-control ' maxlength='20' value='$nik'>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div class='row'>
                                                    <div class='form-group'>
                                                    <a href='#' class='btn btn-primary sai-btn pull-left' id='sai-grid-add-warga' data-edit='0' style='margin-left: 15px;'><i class='fa fa-plus'> Tambah Warga </i></a>
                                                    </div>                                                
                                                </div>
                                                <hr style='margin-bottom:10px;'>
                                                    <div class='row'>
                                                        <div class='col-md-12 sai-container-overflow'>
                                                            <table class='table table-striped table-bordered' id='sai-grid-table-warga'>
                                                                <tr>
                                                                    <th>No Urut</th>
                                                                    <th>NIK</th>
                                                                    <th>Nama</th>
                                                                    <th>Alias</th>
                                                                    <th>Jenis Kelamin</th>
                                                                    <th>Tempat Lahir</th>
                                                                    <th>Tanggal Lahir</th>
                                                                    <th>Agama</th>
                                                                    <th>Golongan Darah</th>
                                                                    <th>Pendidikan</th>
                                                                    <th>Pekerjaan</th>
                                                                    <th>Status Pernikahan</th>
                                                                    <th>KB</th>
                                                                    <th>Status Hubungan</th>
                                                                    <th>Status WNI</th>
                                                                    <th>No HP</th>
                                                                    <th>No Tlp Emergency</th>
                                                                    <th>Ket Emergency</th>
                                                                    <th>Detail</th>
                                                                </tr>
                                                            </table>
                                                        </div>
                                                    </div>";
                                                    echo "              
                                                    <div id='validation-box'></div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </form>
                                <div class='modal' id='sai-grid-table-modal-warga' tabindex='-1' role='dialog'>
                                    <div class='modal-dialog' role='document'>
                                    <div class='modal-content'>
                                        <form id='sai-grid-table-form-warga'>
                                        <div class='modal-header'>
                                            <h5 class='modal-title'>Input Data Warga</h5>
                                            <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                                            </button>
                                        </div>
                                        <div class='modal-body'>
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='hidden' name='id_edit' class='form-control' id='modal-warga-id' maxlength='10'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <label class='control-label col-sm-3'>NIK</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='text' name='nik' class='form-control ' maxlength='100' id='modal-warga-nik'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <label class='control-label col-sm-3'>Nama Lengkap</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='text' name='nama' class='form-control ' maxlength='100' id='modal-warga-nama'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <label class='control-label col-sm-3'>Alias</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='text' name='alias' class='form-control ' maxlength='100' id='modal-warga-alias'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                   <label class='control-label col-sm-3'>Jenis Kelamin</label>
                                                   <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <select name='kode_jk' class='form-control selectize' id='modal-warga-kode_jk' required >
                                                        <option value=''>--- Pilih Jenis Kelamin ---</option>
                                                        <option value='L'>L-Laki-laki</option><option value='P'>P-Perempuan</option>";
                                                        echo"
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <label class='control-label col-sm-3'>Tempat Lahir</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='text' name='tempat_lahir' class='form-control ' maxlength='100' id='modal-warga-tempat_lahir'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row' >
                                                <div class='form-group' style='margin-bottom:5px;'>
                                                    <label class='control-label col-sm-3'>Tanggal Lahir</label>
                                                    <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                                                        <div class='input-group-addon'>
                                                            <i class='fa fa-calendar'></i>
                                                        </div>
                                                        <input name='tgl_lahir' class='form-control datepicker' id='modal-warga-tgl_lahir'>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Agama</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='kode_agama' class='form-control selectize' id='modal-warga-kode_agama' required >
                                                        <option value=''>--- Pilih Agama ---</option>
                                                        <option value='Islam'>Islam</option>
                                                        <option value='Katolik'>Katolik</option>
                                                        <option value='Protestan'>Protestan</option>
                                                        <option value='Hindu'>Hindu</option>
                                                        <option value='Budha'>Budha</option>
                                                        <option value='Lainnya'>Lainnya</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Golongan Darah</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='kode_goldar' class='form-control selectize' id='modal-warga-kode_goldar' required >
                                                        <option value=''>--- Pilih Golongan Darah ---</option>
                                                        <option value='A'>A</option>
                                                        <option value='B'>B</option>
                                                        <option value='AB'>AB</option>
                                                        <option value='O'>O</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Pendidikan</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='kode_didik' class='form-control selectize' id='modal-warga-kode_didik' required >
                                                        <option value=''>--- Pilih Pendidikan ---</option>
                                                        <option value='SD'>SD</option>
                                                        <option value='SMP'>SMP</option>
                                                        <option value='SMA'>SMA</option>
                                                        <option value='D1'>D1</option>
                                                        <option value='D2'>D2</option>
                                                        <option value='D3'>D3</option>
                                                        <option value='D4'>D4</option>
                                                        <option value='S1'>S1</option>
                                                        <option value='S2'>S2</option>
                                                        <option value='S3'>S3</option>
                                                        <option value='Non'>Non</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Pekerjaan</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='kode_kerja' class='form-control selectize' id='modal-warga-kode_kerja' required >
                                                        <option value=''>--- Pilih Pekerjaan ---</option>
                                                        <option value='IRT'>IRT</option>
                                                        <option value='PNS'>PNS</option>
                                                        <option value='SWASTA'>SWASTA</option>
                                                        <option value='PELAJAR'>PELAJAR</option>
                                                        <option value='PENSIUN'>PENSIUN</option>
                                                        <option value='MAHASISWA'>MAHASISWA</option>
                                                        <option value='TNI'>TNI</option>
                                                        <option value='POLRI'>POLRI</option>
                                                        <option value='TENAGA MEDIS'>D4</option>
                                                        <option value='S1'>S1</option>
                                                        <option value='S2'>S2</option>
                                                        <option value='S3'>S3</option>
                                                        <option value='Non'>Non</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Status Pernikahan</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='sts_nikah' class='form-control selectize' id='modal-warga-sts_nikah' required >
                                                        <option value=''>--- Pilih Status Pernikahan ---</option>
                                                        <option value='KAWIN'>KAWIN</option>
                                                        <option value='BELUM'>BELUM</option>
                                                        <option value='DUDA'>DUDA</option>
                                                        <option value='JANDA'>JANDA</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>KB</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='kb' class='form-control selectize' id='modal-warga-kb' required >
                                                        <option value=''>--- Pilih Jenis KB ---</option>
                                                        <option value='-'>-</option>
                                                        <option value='Implant KB'>Implant KB</option>
                                                        <option value='Pil KB'>Pil KB</option>
                                                        <option value='Suntik KB'>Suntik KB</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Status Hubungan</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='sts_keluarga' class='form-control selectize' id='modal-warga-sts_hub' required >
                                                        <option value=''>--- Pilih Status Hubungan ---</option>
                                                        <option value='Anak'>Anak</option>
                                                        <option value='Istri'>Istri</option>
                                                        <option value='Kepala Keluarga'>Kepala Keluarga</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div class='row'>
                                                <div class='form-group' >
                                                    <label class='control-label col-sm-3'>Status WNI</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                       <select name='sts_wni' class='form-control selectize' id='modal-warga-sts_wni' required >
                                                        <option value=''>--- Pilih Status WNI ---</option>
                                                        <option value='WNI'>WNI</option>
                                                        <option value='WNA'>WNA</option>
                                                        </select>
                                                    </div>
                                                </div>
                                            </div> 
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <label class='control-label col-sm-3'>No HP</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='text' name='no_hp' class='form-control ' maxlength='100' id='modal-warga-no_hp'>
                                                    </div>
                                                </div>
                                            </div>    
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <label class='control-label col-sm-3'>No Emergency</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='text' name='no_emergency' class='form-control ' maxlength='100' id='modal-warga-no_emergency'>
                                                    </div>
                                                </div>
                                            </div>  
                                            <div class='row' >
                                                <div class='form-group'>
                                                    <label class='control-label col-sm-3'>Status Keluarga</label>
                                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                                        <input type='text' name='ket_emergency' class='form-control ' maxlength='100' id='modal-warga-ket_emergency'>
                                                    </div>
                                                </div>
                                            </div>                       
                                        </div>
                                        <div class='modal-footer'>
                                            <button type='submit' class='btn btn-primary'>Simpan</button> 
                                            <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>
                                        </div>
                                        </form>
                                    </div>
                                </div>";                   
            }
    
        echo "<script type='text/javascript'>
            $(document).ready(function(){                 
        ";
        if($kunci =="bayar2" OR $kunci =="setor2" OR $kunci == "rekap2"){
        
            echo"
            $('#dash_blok').change(function(e) { 
                e.preventDefault();
                var blok = this.value;
  
                window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/'+blok;
            });

            $('#dash_periode').change(function(e) { 
                e.preventDefault();
                var periode = this.value;
  
                window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+periode;
            });

            function sepNum(x){
                if (typeof x === 'undefined' || !x) { 
                    return 0;
                }else{
                    if(x < 0){
                        var x = parseFloat(x).toFixed(0);
                    }
                    
                    var parts = x.toString().split(',');
                    parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
                    return parts.join('.');
                }
            }
            function hitungSaldo(){

                totSal = 0;totRT = 0;totRW = 0;
                $('.sai-grid-row').each(function(){
                    var nilai=$(this).closest('tr').find('.input-nilai').val();
                    var rt=$(this).closest('tr').find('.input-nilrt').val();
                    var rw=$(this).closest('tr').find('.input-nilrw').val();
                    $(this).closest('tr').find('.input-tog').val('on');
                    
                    totSal+=+nilai;
                    totRT+=+rt;
                    totRW+=+rw;
  
                });
                
                $('#inputNilai').val(sepNum(totSal));
                $('#inputNilRT').val(sepNum(totRT));
                $('#inputNilRW').val(sepNum(totRW));
               
  
            }
  
            hitungSaldo();
            $('.inputToggle').prop('checked');

            $('.inputToggle').change(function() {  
            
                
                $('#inputNilai').val(0);
                
                total = 0;
                totRT = 0;
                totRW = 0;
                $('.sai-grid-row').each(function(){
                    var cek=$(this).closest('tr').find('.inputToggle').prop('checked');
                    var tog=$(this).closest('tr').find('.inputToggle').val();
                    var nilai=$(this).closest('tr').find('.input-nilai').val();
                    var rt=$(this).closest('tr').find('.input-nilrt').val();
                    var rw=$(this).closest('tr').find('.input-nilrw').val();
  
                    if(cek == true){
                        total+=+nilai;
                        totRT+=+rt;
                        totRW+=+rw;
                        $(this).closest('tr').find('.input-tog').val('on');
                    }else{
                        $(this).closest('tr').find('.input-tog').val('off');
                    }
                    
                });
                $('#inputNilai').val(sepNum(total));
                $('#inputNilRT').val(sepNum(totRT));
                $('#inputNilRW').val(sepNum(totRW));
                 
                
                
            }); 
            
            $('input').on('keyup keypress', function(e) {
                var keyCode = e.keyCode || e.which;
                if (keyCode === 13) { 
                  e.preventDefault();
                  return false;
                }
            });  
  
            $('#btnSubmit').click(function(e){
                e.preventDefault();
                // alert('test');
                myForm = $('.form-setor').serialize();
  
                // alert(myForm);
               
                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanSetoran',
                    dataType: 'json',
                    data: myForm,
                    cache: false,
                    success:function(result){
                        alert('Input data '+result.message);
  
                        if(result.status){
                            location.reload();
                        }
                    }
                });
  
            });";
        
        }else{
        echo"
                $('#kode_akun').change(function(e) { 
                    e.preventDefault();
                    var tahun = $('#dash_tahun2').val();
                    var akun = $('#kode_akun').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+tahun+'/'+akun;
                });

                $('#dash_tahun2').change(function(e) { 
                    e.preventDefault();
                    var tahun = this.value;
                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+tahun;
                });

                var select_kas_ref = $('#kas-ref').selectize();

                var select_kas_jenis = $('#kas-jenis').selectize({
                    onChange: function(value) { 
                        if(select_kas_jenis[0].selectize.getValue()!='undefined'){
                            select_kas_ref[0].selectize.clearOptions();
                        } 
                        var nik='$kode_rumah';

                        $.ajax({
                            type: 'POST',
                            url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getsel',
                            dataType: 'json',
                            data: {'kode_lokasi':18, 'jenis':value,'nik':nik},
                            success:function(result){    
                                if(result.status){
                                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                        for(i=0;i<result.daftar.length;i++){
                                            select_kas_ref[0].selectize.addOption([{text:result.daftar[i].kode_ref + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_ref}]);  
                                        }
                                    }
                                }
                            }
                        });
                      
                    }
                });  

                $('#dash_blok').change(function(e) { 
                    e.preventDefault();
                    var blok = this.value;
      
                    // alert('blok:'+blok);
                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashRtRwDet','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/'+blok+'/$kode_rumah');
                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/'+blok+'/$kode_rumah';
                });


                $('input').on('keyup keypress', function(e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === 13) { 
                      e.preventDefault();
                      return false;
                    }
                });

                $('#btnSubmit').click(function(e){
                    e.preventDefault();
                    // alert('test');
                    myForm = $('.kas_insert').serialize();

                    // alert(myForm);
                   
                    $.ajax({
                        type: 'POST',
                        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpan',
                        dataType: 'json',
                        data: myForm,
                        cache: false,
                        success:function(result){
                            alert('Input data '+result.message);

                            if(result.status){
                                location.reload();
                            }
                        }
                    });

                });               

                // $('#InputNil').inputmask('numeric', {
                //     radixPoint: ',',
                //     groupSeparator: '.',
                //     digits: 2,
                //     autoGroup: true,
                //     rightAlign: true,
                //     oncleared: function () { self.Value(''); }
                // });
                    
                var select_rumah = $('#warga-no-rumah').selectize();

                var select_blok = $('#warga-kode-blok').selectize({
                    onChange: function(value) { 
                        if(select_blok[0].selectize.getValue()!='undefined'){
                            select_rumah[0].selectize.clearOptions();
                        } 

                        $.ajax({
                            type: 'POST',
                            url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getRumah',
                            dataType: 'json',
                            data: {'kode_lokasi':".$kode_lokasi.", 'blok':value},
                            success:function(result){    
                                if(result.status){
                                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                        for(i=0;i<result.daftar.length;i++){
                                            select_rumah[0].selectize.addOption([{text:result.daftar[i].kode_rumah, value:result.daftar[i].kode_rumah}]);  
                                        }
                                    }
                                }
                            }
                        });
                      
                    }
                });  

                var select_rt = $('#warga-kode-rt').selectize({
                    onChange: function(value) { 
                        if(select_rt[0].selectize.getValue()!='undefined'){
                            select_blok[0].selectize.clearOptions();
                        } 

                        $.ajax({
                            type: 'POST',
                            url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getBlok',
                            dataType: 'json',
                            data: {'kode_lokasi':".$kode_lokasi.", 'rt':value},
                            success:function(result){    
                                if(result.status){
                                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                        for(i=0;i<result.daftar.length;i++){
                                            select_blok[0].selectize.addOption([{text:result.daftar[i].blok, value:result.daftar[i].blok}]);  
                                        }
                                    }
                                }
                            }
                        });
                      
                    }
                });  


                $('.datepicker').datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd'
                });
                
                $('.datepicker-dmy').datepicker({
                    autoclose: true,
                    format: 'dd-mm-yyyy'
                });
            
                $('.datepicker-yyyy').datepicker({
                    autoclose: true,
                    viewMode: 'years', 
                    minViewMode: 'years',
                    format: 'yyyy'
                });
            
                $('.datepicker, .daterangepicker').on('keydown keyup keypress', function(e){
                    e.preventDefault();
                    return false;
                });
            
                $('.daterangepicker').daterangepicker();
            

                $('#ajax-content-section').on('submit', '#rt-form-warga', function(e){
                    e.preventDefault();
                    var myForm =$('#rt-form-warga').serialize();
                    $.ajax({
                        type: 'POST',
                        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanWarga',
                        dataType: 'json',
                        data: myForm,
                        cache: false,
                        success:function(result){
                            alert('Input data '+result.message);

                            if(result.status){
                                location.reload();
                            }
                        }
                    });
                });
                
                 //-----Data Warga------
                
                $('#ajax-content-section').on('click', '#sai-grid-add-warga', function(){
                    // $('#sai-grid-table-modal-warga').modal('show');
                    if($(this).data('edit')=='1'){
                        $('.sai-grid-input-row').removeClass('set-selected');
                        $(this).closest('tr').addClass('set-selected');
                        
                        var nama= $(this).closest('tr').find('.set-nama').val();
                        var nik= $(this).closest('tr').find('.set-nik').val();
                        var alias= $(this).closest('tr').find('.set-alias').val();
                        var tempat_lahir= $(this).closest('tr').find('.set-tempat_lahir').val();
                        var tgl_lahir= $(this).closest('tr').find('.set-tgl_lahir').val();
                        var kode_jk= $(this).closest('tr').find('.set-kode_jk').val();
                        var kode_agama= $(this).closest('tr').find('.set-kode_agama').val();
                        var kode_goldar= $(this).closest('tr').find('.set-kode_goldar').val();
                        var kode_didik= $(this).closest('tr').find('.set-kode_didik').val();
                        var kode_kerja= $(this).closest('tr').find('.set-kode_kerja').val();
                        var kode_sts_nikah= $(this).closest('tr').find('.set-kode_sts_nikah').val();
                        var kb= $(this).closest('tr').find('.set-kb').val();
                        var kode_sts_hub= $(this).closest('tr').find('.set-kode_sts_hub').val();
                        var kode_sts_wni= $(this).closest('tr').find('.set-kode_sts_wni').val();
                        var no_emergency= $(this).closest('tr').find('.set-no_emergency').val();
                        var no_hp= $(this).closest('tr').find('.set-no_hp').val();
                        var ket_emergency= $(this).closest('tr').find('.set-ket_emergency').val();
            
                       $('#modal-warga-id').val('1');
                       $('#modal-warga-nama').val(nama);
                       $('#modal-warga-alias').val(alias);
                       $('#modal-warga-nik').val(nik);
                       $('#modal-warga-tempat_lahir').val(tempat_lahir);
                       $('#modal-warga-tgl_lahir').val(tgl_lahir);
                       $('#modal-warga-no_hp').val(no_hp);
                       $('#modal-warga-kode_jk')[0].selectize.setValue(kode_jk);
                       $('#modal-warga-kode_agama')[0].selectize.setValue(kode_agama);
                       $('#modal-warga-kode_goldar')[0].selectize.setValue(kode_goldar);
                       $('#modal-warga-kb')[0].selectize.setValue(kb);
                       $('#modal-warga-kode_didik')[0].selectize.setValue(kode_didik);
                       $('#modal-warga-kode_kerja')[0].selectize.setValue(kode_kerja);
                       $('#modal-warga-sts_nikah')[0].selectize.setValue(kode_sts_nikah);
                       $('#modal-warga-sts_hub')[0].selectize.setValue(kode_sts_hub);
                       $('#modal-warga-no_emergency').val(no_emergency);
                       $('#modal-warga-ket_emergency').val(ket_emergency);

                       $('#sai-grid-table-modal-warga').modal('show');
                    }else{
                       $('#modal-warga-id').val('0');
                       $('#sai-grid-table-modal-warga').modal('show');
                    }
                });
            
                $('#ajax-content-section').on('click', '.sai-grid-del-warga', function(){
                    // if(confirm('Hapus item ini?')){
                        $(this).closest('tr').remove();
                        $('html, body').anisate({ scrollTop: $(document).height() }, 1000);
                    // }else{
                    //     return false;
                    // }
                });
            
                $('#sai-grid-table-form-warga').submit(function(e){
                    e.preventDefault();

                    var nama = $('#modal-warga-nama').val();
                    var nik = $('#modal-warga-nik').val();
                    var alias = $('#modal-warga-alias').val();
                    var kode_jk = $('#modal-warga-kode_jk')[0].selectize.getValue();
                    var tempat_lahir = $('#modal-warga-tempat_lahir').val();
                    var tgl_lahir = $('#modal-warga-tgl_lahir').val();
                    var kode_agama = $('#modal-warga-kode_agama')[0].selectize.getValue();
                    var kode_goldar = $('#modal-warga-kode_goldar')[0].selectize.getValue();
                    var kb = $('#modal-warga-kb')[0].selectize.getValue();
                    var kode_didik = $('#modal-warga-kode_didik')[0].selectize.getValue();
                    var kode_kerja = $('#modal-warga-kode_kerja')[0].selectize.getValue();
                    var kode_sts_nikah = $('#modal-warga-sts_nikah')[0].selectize.getValue();
                    var kode_sts_hub = $('#modal-warga-sts_hub')[0].selectize.getValue();
                    var kode_sts_wni = $('#modal-warga-sts_wni')[0].selectize.getValue();
                    var ket_emergency = $('#modal-warga-ket_emergency').val();
                    var no_hp = $('#modal-warga-no_hp').val();
                    var no_emergency = $('#modal-warga-no_emergency').val();

                    var id = $('#modal-warga-id').val();
                    
                    if(id == 1){
                        var no=$('.set-selected').closest('tr').index();
                    }else{
                        var no=$('#sai-grid-table-warga tbody tr:last').index();
                        no++;
                    }
                    // var no_urut = no_urut.split(' - ')[0];
                    // var nama = no_urut.split(' - ')[1];
            
                    //var item = $('#sai-grid-table-modal-warga-no_urut')[0];
                    //var data = $(item.selectize.getItem(no_urut)[0]).text();
                    //var nama = data.split(' - ')[1];
            
                    var row = 
                    \"<tr class='sai-grid-input-row'>\"+
                        \"<td>\"+
                            no+
                            \"<input type='hidden' name='no_urut[]' value='\"+no+\"' readonly class='form-control set-no_urut'>\"+
                        \"</td>\"+
                        \"<td>\"+
                        nik+
                            \"<input type='hidden' name='nik[]' value='\"+nik+\"' required readonly class='form-control set-nik'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            nama+
                            \"<input type='hidden' name='nama[]' value='\"+nama+\"' readonly class='form-control set-nama'>\"+
                        \"</td>\"+
                        \"<td>\"+
                        alias+
                            \"<input type='hidden' name='alias[]' value='\"+alias+\"' required readonly class='form-control set-alias'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            kode_jk+
                            \"<input type='hidden' name='kode_jk[]' value='\"+kode_jk+\"' required readonly class='form-control set-kode_jk'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            tempat_lahir+
                            \"<input type='hidden' name='tempat_lahir[]' value='\"+tempat_lahir+\"' readonly class='form-control set-tempat_lahir'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            tgl_lahir+
                            \"<input type='hidden' name='tgl_lahir[]' value='\"+tgl_lahir+\"' required readonly class='form-control set-tgl_lahir'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_agama+
                            \"<input type='hidden' name='kode_agama[]' value='\"+kode_agama+\"' readonly class='form-control set-kode_agama'>\"+
                        \"</td>\"+ \"<td>\"+
                            kode_goldar+
                            \"<input type='hidden' name='kode_goldar[]' value='\"+kode_goldar+\"' required readonly class='form-control set-kode_goldar'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_didik+
                            \"<input type='hidden' name='kode_didik[]' value='\"+kode_didik+\"' readonly class='form-control set-kode_didik'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_kerja+
                            \"<input type='hidden' name='kode_kerja[]' value='\"+kode_kerja+\"' readonly class='form-control set-kode_kerja'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_sts_nikah+
                            \"<input type='hidden' name='kode_sts_nikah[]' value='\"+kode_sts_nikah+\"' readonly class='form-control set-kode_sts_nikah'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            kb+
                            \"<input type='hidden' name='kb[]' value='\"+kb+\"' required readonly class='form-control set-kb'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_sts_hub+
                            \"<input type='hidden' name='kode_sts_hub[]' value='\"+kode_sts_hub+\"' readonly class='form-control set-kode_sts_hub'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            kode_sts_wni+
                            \"<input type='hidden' name='kode_sts_wni[]' value='\"+kode_sts_wni+\"' required readonly class='form-control set-kode_sts_wni'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            no_hp+
                            \"<input type='hidden' name='no_hp[]' value='\"+no_hp+\"' readonly class='form-control set-no_hp'>\"+
                        \"</td>\"+ 
                        \"<td>\"+
                        no_emergency+
                            \"<input type='hidden' name='no_emergency[]' value='\"+no_emergency+\"' readonly class='form-control set-no_emergency'>\"+
                        \"</td>\"+ 
                        \"<td>\"+
                            ket_emergency+
                            \"<input type='hidden' name='ket_emergency[]' value='\"+ket_emergency+\"' readonly class='form-control set-ket_emergency'>\"+
                        \"</td>\"+ 
                        \"<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-warga' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-warga'><i class='fa fa-times'></i></a></td>\"+
                    \"</tr>\";
            
                    var row2=\"<td>\"+
                            no+
                            \"<input type='hidden' name='no_urut[]' value='\"+no+\"'  readonly class='form-control set-no_urut'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            nik+
                            \"<input type='hidden' name='nik[]' value='\"+nik+\"' required readonly class='form-control set-nik'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            nama+
                            \"<input type='hidden' name='nama[]' value='\"+nama+\"' readonly class='form-control set-nama'>\"+
                        \"</td>\"+                        
                        \"<td>\"+
                            alias+
                            \"<input type='hidden' name='alias[]' value='\"+alias+\"' required readonly class='form-control set-alias'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            kode_jk+
                            \"<input type='hidden' name='kode_jk[]' value='\"+kode_jk+\"' required readonly class='form-control set-kode_jk'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            tempat_lahir+
                            \"<input type='hidden' name='tempat_lahir[]' value='\"+tempat_lahir+\"' readonly class='form-control set-tempat_lahir'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            tgl_lahir+
                            \"<input type='hidden' name='tgl_lahir[]' value='\"+tgl_lahir+\"' required readonly class='form-control set-tgl_lahir'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_agama+
                            \"<input type='hidden' name='kode_agama[]' value='\"+kode_agama+\"' readonly class='form-control set-kode_agama'>\"+
                        \"</td>\"+ 
                        \"<td>\"+
                            kode_goldar+
                            \"<input type='hidden' name='kode_goldar[]' value='\"+kode_goldar+\"' required readonly class='form-control set-kode_goldar'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_didik+
                            \"<input type='hidden' name='kode_didik[]' value='\"+kode_didik+\"' readonly class='form-control set-kode_didik'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_kerja+
                            \"<input type='hidden' name='kode_kerja[]' value='\"+kode_kerja+\"' readonly class='form-control set-kode_kerja'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_sts_nikah+
                            \"<input type='hidden' name='kode_sts_nikah[]' value='\"+kode_sts_nikah+\"' readonly class='form-control set-kode_sts_nikah'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            kb+
                            \"<input type='hidden' name='kb[]' value='\"+kb+\"' required readonly class='form-control set-kb'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            kode_sts_hub+
                            \"<input type='hidden' name='kode_sts_hub[]' value='\"+kode_sts_hub+\"' readonly class='form-control set-kode_sts_hub'>\"+
                        \"</td>\"+
                         \"<td>\"+
                            kode_sts_wni+
                            \"<input type='hidden' name='kode_sts_wni[]' value='\"+kode_sts_wni+\"' required readonly class='form-control set-kode_sts_wni'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            no_hp+
                            \"<input type='hidden' name='no_hp[]' value='\"+no_hp+\"' readonly class='form-control set-no_hp'>\"+
                        \"</td>\"+ 
                        \"<td>\"+
                        no_emergency+
                            \"<input type='hidden' name='no_emergency[]' value='\"+no_emergency+\"' required readonly class='form-control set-no_emergency'>\"+
                        \"</td>\"+
                        \"<td>\"+
                            ket_emergency+
                            \"<input type='hidden' name='ket_emergency[]' value='\"+ket_emergency+\"' required readonly class='form-control set-ket_emergency'>\"+
                        \"</td>\"+
                    \"<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-warga' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-warga'><i class='fa fa-times'></i></td>\";
            
                    // jQuery.validator.setDefaults({
                    //     debug: true,
                    //     success: 'valid'
                    //   });
                      
                    // var form = $('#sai-grid-table2-form');
                    // form.validate();
                    if(id=='1'){
                        $('.set-selected').closest('tr').text('');
                        $('.set-selected').closest('tr').append(row2);
                    }else{
                        $('#sai-grid-table-warga').append(row);
                    }
                    
                    // if(form.valid()){
                        $('#sai-grid-table-modal-warga').modal('hide');
                    // }
                });

             ";
        }
    if($kunci == "dash"){
            echo"
            Highcharts.chart('chart_rtrw_py', {
                title: {
                    text: ''
                },
                xAxis: {
                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                },
                yAxis: [{ // Primary yAxis
                    labels: {
                        format: '{value}',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    },
                    title: {
                        text: 'Jumlah',
                        style: {
                            color: Highcharts.getOptions().colors[1]
                        }
                    }
                }, { // Secondary yAxis
                    title: {
                        text: 'Rasio',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    labels: {
                        format: '{value} %',
                        style: {
                            color: Highcharts.getOptions().colors[0]
                        }
                    },
                    opposite: true
                }],
                labels: {
                    items: [{
                        html: '',
                        style: {
                            left: '50px',
                            top: '18px',
                            color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                        }
                    }]
                },
                tooltip: {
                    shared: true
                },
                series: [{
                    type: 'column',
                    name: 'Jumlah',
                    data: ".json_encode($Py[0]).",
                    color:'#0e9aa7',
                    tooltip: {
                        valuePrefix: ' '
                    }
                }, {
                    type: 'column',
                    name: 'Persentase',
                    color:'#ff6f69',
                    yAxis:1,
                    data: ".json_encode($Py[1]).",
                    tooltip: {
                        valuePrefix: '% '
                    }
                }]
            });  
            
            $('#dash_tahun').change(function(e) { 
                e.preventDefault();
                var tahun = this.value;
                window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+tahun;
            });
            
            ";
    }     
        echo "
        });
			 </script>";
?>
