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

    $sqlpp="select rt from rt_rumah where kode_lokasi='$kode_lokasi' and kode_rumah='$kode_rumah' ";
    $rspp=execute($sqlpp);
    $kode_pp=$rspp->fields[0];

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
        case "dash" :
        $judul = "Dashboard";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="fMainMobile.php?hal=app/rtrw/dashRtRwU.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashRtRwU.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }
    
    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";
                switch($kunci){
                    case "bp" :
                    echo "
                <div class='row'>
                    <div class='col-md-12'>
                        <ul class='timeline'>";

                        $sql=" select distinct a.tgl from (
                        select convert(varchar,tanggal,103) as tgl from rt_buku_p where kode_lokasi='$kode_lokasi' and jenis in ('UMUM','RW')
                        union all
                        select convert(varchar,tanggal,103) as tgl from rt_buku_p where kode_lokasi='$kode_lokasi' and rt='$kode_pp'
                        union all
                        select convert(varchar,tanggal,103) as tgl from rt_buku_p where kode_lokasi='$kode_lokasi' and no_rumah='$kode_rumah' 
                        ) a 
                        order by a.tgl ";

                        // echo $sql;

                        $rs = execute($sql);  
                        while ($row = $rs->FetchNextObject($toupper=false)){

                        echo"    
                            <li class='time-label'>
                                <span class='bg-blue'>
                                    $row->tgl
                                </span>
                            </li>
                            ";

                            $sql2="select no_bukti, tanggal, keterangan, convert(varchar(10), tgl_input, 108) as jam,file_gambar,jenis,file_dok from rt_buku_p where convert(varchar,tanggal,103) = '$row->tgl' and kode_lokasi='$kode_lokasi' and jenis in ('UMUM','RW')
                            union all
                            select no_bukti, tanggal, keterangan, convert(varchar(10), tgl_input, 108) as jam,file_gambar,jenis,file_dok from rt_buku_p where convert(varchar,tanggal,103) = '$row->tgl' and kode_lokasi='$kode_lokasi' and rt='$kode_pp'
                            union all
                            select no_bukti, tanggal, keterangan, convert(varchar(10), tgl_input, 108) as jam,file_gambar,jenis,file_dok from rt_buku_p where convert(varchar,tanggal,103) = '$row->tgl' and kode_lokasi='$kode_lokasi' and no_rumah='$kode_rumah'
                            order by convert(varchar(10), tgl_input, 108)   ";

                            // echo $sql2;

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
                                <a class='btn btn-primary btn-xs' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/dashRtRwUNews.php&param=$row2->no_bukti/bp/$blok/$kode_rumah' >Read More</a>
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
                            echo"<a href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet2.php&param=$jenis/$kunci/detKeu/$filthn/$kode_rumah/$blok/$kode_akun' style='cursor:pointer;' >
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
                                        <p>Untuk informasi lebih lanjut hubungi bendahara </p>               <a href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet2.php&param=$jenis/$kunci/detTagih/$tahun/$kode_rumah/$blok' style='cursor:pointer;'><span class='pull-right'><i class='fa fa-chevron-circle-right ' style='font-size:30px'></i></span></a>
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
                                
                    }
               
            
            echo"   
                </div>
            </div>";
       
       
        echo "<script type='text/javascript'>
            $(document).ready(function(){  
                $('#kode_akun').change(function(e) { 
                    e.preventDefault();
                    var tahun = $('#dash_tahun2').val();
                    var akun = $('#kode_akun').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+tahun+'/'+akun;
                });

                $('#dash_tahun2').change(function(e) { 
                    e.preventDefault();
                    var tahun = this.value;
                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+tahun;
                });
                                   
                  
                $('#dash_blok').change(function(e) { 
                    e.preventDefault();
                    var blok = this.value;
      
                    // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptdashRtRwUDet','','$kode_lokasi/$periode/$jenis/$kunci/$kode_pp/$nik/'+blok+'/$kode_rumah');
                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=$jenis/$kunci/'+blok+'/$kode_rumah';
                });

            
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
                window.location.href='fMainMobile.php?hal=app/rtrw/dashRtRwUDet.php&param=$jenis/$kunci/$blok/$kode_rumah/'+tahun;
            });

                    
        });
                
			 </script>";
?>
