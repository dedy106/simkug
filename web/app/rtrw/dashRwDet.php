<?php
    
    // function getNamaBulan($no_bulan){
    //     switch ($no_bulan){
    //         case 1 : case '1' : case '01': $bulan = "Januari"; break;
    //         case 2 : case '2' : case '02': $bulan = "Februari"; break;
    //         case 3 : case '3' : case '03': $bulan = "Maret"; break;
    //         case 4 : case '4' : case '04': $bulan = "April"; break;
    //         case 5 : case '5' : case '05': $bulan = "Mei"; break;
    //         case 6 : case '6' : case '06': $bulan = "Juni"; break;
    //         case 7 : case '7' : case '07': $bulan = "Juli"; break;
    //         case 8 : case '8' : case '08': $bulan = "Agustus"; break;
    //         case 9 : case '9' : case '09': $bulan = "September"; break;
    //         case 10 : case '10' : case '10': $bulan = "Oktober"; break;
    //         case 11 : case '11' : case '11': $bulan = "November"; break;
    //         case 12 : case '12' : case '12': $bulan = "Desember"; break;
    //         default: $bulan = null;
    //     }
    //     return $bulan;
    // }
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

    if($tmp[4] != ""){
        $blok = $tmp[4];
    }
    
    $tahun=substr($periode,0,4);
    $bulan=substr($periode,4,2);

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $path2 = $path . "image/keubg.png";
    $foto = $path . "image/wallpaper/Forest.jpg";

    switch($kunci){
        case "saldo" :
        $judul = "Saldo Tagihan";
        break;
        case "setor" :
        $judul = "Setoran";
        break;
        case "keu" :
        $judul = "Keuangan";
        break;
        case "rekap" :
        $judul = "Rekap";
        break;
        case "rekap2" :
            $judul = "Rekap Bulanan";
        break;
        case "bayar" :
            $judul = "Bayar Iuran";
        break;
    }

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="fMainMobile.php?hal=app/rtrw/dashRw.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashRw.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }
    
    echo "<div class='panel' style='$padding'>
			<div class='panel-body'>
                $back1";
                switch($kunci){
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

                    if($tmp[2] !="" OR $tmp[3] !=""){
                        
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

                            if($tmp[2] != "" OR $tmp[3] != ""){
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

                    if($tmp[2] !="" OR $tmp[3] !=""){
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
                        
                            if($tmp[2] !="" OR $tmp[3] !=""){
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
                            $sql="select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='$kode_lokasi'  ";
                            
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
                        echo"<a href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/detKeu/$filthn///$kode_akun' style='cursor:pointer;' >
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
                        echo"
                            <div class='row'>
                                <div class='col-md-12'>
                                    <select class='form-control input-sm selectize' id='dash_tahun2' style='margin-bottom:5px;'>
                                    <option value=''>Pilih Tahun</option>";
            
                                    if(isset($tmp[4])){
                                        $filthn = $tmp[4];
                                    }else{
                                        $filthn = $tahun;
                                    }
                                    $sql="select distinct a.periode from (select (substring(a.periode,1,4)) as periode 
                                    from gldt a 
                                    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                                    where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.kode_akun in ('11101','11201')
                                        ) a
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
                                </div>
                            </div>";

                        // $sql="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                        // from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                        // where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' and a.kode_akun not in ('11101') and b.jenis ='PENERIMAAN'
                        // group by a.kode_drk,b.nama,b.jenis,b.idx
                        // order by b.jenis,b.idx";
                        $sql="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                        from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                        where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' and a.kode_akun in ('11101','11201') and b.jenis ='PENERIMAAN'
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
                                <div class='col-xs-4 text-right' style='padding-left:0px;' ><a href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/detRekap/$filthn/$row->kode_drk' style='cursor:pointer;color:blue' >".number_format($row->total,0,",",".")."</a></div>
                            </div>";
                        }
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>TOTAL PENERIMAAN</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total1,0,",",".")."</div>
                        </div>";

                        // $sql2="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                        // from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                        // where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' and a.kode_akun not in ('11101') and b.jenis ='PENGELUARAN'
                        // group by a.kode_drk,b.nama,b.jenis,b.idx
                        // order by b.jenis,b.idx";
                        $sql2 = "select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'C' then nilai else -nilai end) as total
                        from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                        where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' and a.kode_akun in ('11101','11201') and b.jenis ='PENGELUARAN'
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
                                <div class='col-xs-4 text-right' style='padding-left:0px;cursor:pointer;color:blue' ><a href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/detRekap/$filthn/$row2->kode_drk' style='cursor:pointer;color:blue' >".number_format($row2->total,0,",",".")."</a></div>
                            </div>";
                        }
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>TOTAL PENGELUARAN</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px;'>".number_format($total2,0,",",".")."</div>
                        </div>";
                        $total = $total1-$total2;

                        $sql = "select sum(a.so_akhir) as so_akhir from glma_pp a where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' and a.kode_akun in ('11101','11201')
                        ";
                        // echo $sql;
                        $rsSo= execute($sql);
                        if($rsSo->RecordCount()>0){

                            $saldo = $rsSo->fields[0];
                        }else{
                            
                            $saldo = 0;
                        }
                        $saldo_ak= ($total) + $saldo;
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>NET MUTASI</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total,0,",",".")."</div>
                        </div>";
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>SALDO AWAL KAS BANK</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($saldo,0,",",".")."</div>
                        </div>";
                        echo"
                        <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>SALDO AKHIR KAS BANK</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($saldo_ak,0,",",".")."</div>
                        </div>";



                        
                        break;
                        case "rekap2" :
                            echo"
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <select class='form-control input-sm selectize' id='dash_tahun2' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Tahun</option>";
                
                                        if(isset($tmp[4])){
                                            $filthn = $tmp[4];
                                        }else{
                                            $filthn = $tahun;
                                        }
                                        $sql="select distinct a.periode from (select (substring(a.periode,1,4)) as periode 
                                        from gldt a 
                                        inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                                        where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.kode_akun not in ('11101')
                                            ) a
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
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <select class='form-control input-sm selectize' id='dash_blnrekap' style='margin-bottom:5px;'>
                                        <option value=''>Pilih Bulan</option>";
                
                                        if(isset($tmp[5])){
                                            $filbln = $tmp[5];
                                        }else{
                                            $filbln = $bulan;
                                        }
                                        $sql="select distinct (substring(a.periode,5,2)) as periode,datename(m,cast(substring(a.periode,1,4)+'-'+substring(a.periode,5,2)+'-'+'01' as datetime)) as nama
                                        from (select  a.periode 
                                        from gldt a 
                                        inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                                        where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.kode_akun not in ('11101')
                                        ) a
                                        order by (substring(a.periode,5,2)) desc ";
                                        
                                        $resLok = execute($sql);
                                    
                                        while ($row = $resLok->FetchNextObject(false)){
                                            if($filbln == $row->periode){
                                                $selected = "selected";
                                            }else{
                                                $selected="";
                                            }
                                            echo " <option value=".$row->periode." $selected>".$row->nama."</option>";
                                        }
                                
                                    echo"  
                                        </select>
                                    </div>
                                </div>";
    
                            // $sql="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                            // from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                            // where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' and a.kode_akun not in ('11101') and b.jenis ='PENERIMAAN'
                            // group by a.kode_drk,b.nama,b.jenis,b.idx
                            // order by b.jenis,b.idx";
                            $sql="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                            from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                            where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln' and a.kode_akun in ('11101','11201') and b.jenis ='PENERIMAAN'
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
                                    <div class='col-xs-4 text-right' style='padding-left:0px;' ><a href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/detRekap2/$filthn/$row->kode_drk/$filbln' style='cursor:pointer;color:blue' >".number_format($row->total,0,",",".")."</a></div>
                                </div>";
                            }
                            echo"
                            <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                                <div class='col-xs-1' style='padding-left:0px'></div>
                                <div class='col-xs-7' style='padding-left:0px'>TOTAL PENERIMAAN</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total1,0,",",".")."</div>
                            </div>";
    
                            // $sql2="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
                            // from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                            // where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' and a.kode_akun not in ('11101') and b.jenis ='PENGELUARAN'
                            // group by a.kode_drk,b.nama,b.jenis,b.idx
                            // order by b.jenis,b.idx";
                            $sql2 = "select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'C' then nilai else -nilai end) as total
                            from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                            where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln' and a.kode_akun in ('11101','11201') and b.jenis ='PENGELUARAN'
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
                                    <div class='col-xs-4 text-right' style='padding-left:0px;cursor:pointer;color:blue' ><a href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/detRekap2/$filthn/$row2->kode_drk/$filbln' style='cursor:pointer;color:blue' >".number_format($row2->total,0,",",".")."</a></div>
                                </div>";
                            }
                            echo"
                            <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                                <div class='col-xs-1' style='padding-left:0px'></div>
                                <div class='col-xs-7' style='padding-left:0px'>TOTAL PENGELUARAN</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px;'>".number_format($total2,0,",",".")."</div>
                            </div>";
                            $total = $total1-$total2;
    
                            $sql = "select sum(a.so_akhir) as so_akhir from glma_pp a where a.kode_pp = '$kode_pp' and a.kode_lokasi ='$kode_lokasi' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln'  and a.kode_akun in ('11101','11201')
                            ";
                            // echo $sql;
                            $rsSo= execute($sql);
                            if($rsSo->RecordCount()>0){
    
                                $saldo = $rsSo->fields[0];
                            }else{
                                
                                $saldo = 0;
                            }
                            $saldo_ak= ($total) + $saldo;
                            echo"
                            <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                                <div class='col-xs-1' style='padding-left:0px'></div>
                                <div class='col-xs-7' style='padding-left:0px'>NET MUTASI</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($total,0,",",".")."</div>
                            </div>";
                            // echo"
                            // <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            //     <div class='col-xs-1' style='padding-left:0px'></div>
                            //     <div class='col-xs-7' style='padding-left:0px'>SALDO AWAL KAS BANK</div>
                            //     <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($saldo,0,",",".")."</div>
                            // </div>";
                            // echo"
                            // <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            //     <div class='col-xs-1' style='padding-left:0px'></div>
                            //     <div class='col-xs-7' style='padding-left:0px'>SALDO AKHIR KAS BANK</div>
                            //     <div class='col-xs-4 text-right' style='padding-left:0px'>".number_format($saldo_ak,0,",",".")."</div>
                            // </div>";
    
    
    
                            
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
                                                
                                                <th width='20%'  style='border-bottom: 1px solid white;'>No Rumah</th>
                                                <th width='40%'  style='text-align:right;border-bottom: 1px solid white;'>Saldo</th>
                                                <th width='40%' colspan='2' style='text-align:right;border-bottom: 1px solid white;'>Total Bayar</th>
                                                </tr>
                                            </thead>
                                            <tbody>";
                                            if(isset($blok) && $blok != ""){
                                                $filter = " and b.blok ='$blok' ";
                                                $filter2 = " and a.blok ='$blok' ";
                                            }else{
                                                $filter = "";
                                                $filter2 = "";
                                            }

                                            $sql = "select a.kode_rumah,isnull(b.saldo,0) as saldo,isnull(c.nilai,0) as bayar 
                                            from rt_rumah a
                                            left join
                                            (
                                                select a.kode_rumah,a.kode_lokasi,case when sum(a.nilai) < 0 then 0 else sum(a.nilai)end as saldo
                                                from 
                                                (
                                                    select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                                                    from rt_bill_d a
                                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
                                                    where a.kode_lokasi ='$kode_lokasi' $filter and a.periode <='$periode' and a.kode_jenis='IWAJIB'
                                                    group by a.kode_rumah,a.kode_lokasi
                                                    union all
                                                    select a.kode_rumah,a.kode_lokasi,-sum(a.nilai_rt+a.nilai_rw) as nilai
                                                    from rt_angs_d a
                                                    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                                    where a.kode_lokasi ='$kode_lokasi' $filter and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
                                                    group by a.kode_rumah,a.kode_lokasi
                                                ) a
                                                group by a.kode_rumah,a.kode_lokasi
                                            ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                            left join (	select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                                                        from rt_angs_d a
                                                        inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                                                        where a.kode_lokasi ='$kode_lokasi' $filter
                                                        and a.kode_jenis='IWAJIB' and a.no_setor='-'
                                                        group by a.kode_rumah,a.kode_lokasi
                                            ) c on a.kode_rumah=c.kode_rumah and a.kode_lokasi=c.kode_lokasi
                                            where a.kode_lokasi='$kode_lokasi' $filter2
                                            order by a.nu ";

                                            // echo $sql;
            
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
                                                    <td width='2%'><a href='fMainMobile.php?hal=app/rtrw/dashRwDet2.php&param=$jenis/$kunci/detBayar/$tahun/$row->kode_rumah/$blok' style='cursor:pointer;'><i class='fa fa-angle-right' style='font-size:20px'></a></i></td>
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

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci/'+periode+'/'+rt;
                });

                $('#dash_rt').change(function(e) { 
                    e.preventDefault();
                    var rt = this.value;
                    var periode = $('#dash_periode').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci/'+periode+'/'+rt;
                });

                $('#dash_tahun2').change(function(e) { 
                    e.preventDefault();
                    var tahun = $('#dash_tahun2').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci///'+tahun;
                });
                $('#dash_blnrekap').change(function(e) { 
                    e.preventDefault();
                    var bulan = $('#dash_blnrekap').val();
                    var tahun = $('#dash_tahun2').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci///'+tahun+'/'+bulan;
                });

                $('#dash_blok').change(function(e) { 
                    e.preventDefault();
                    var blok = this.value;
      
                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci///'+blok;
                });

                $('#kode_akun').change(function(e) { 
                    e.preventDefault();
                    var tahun = $('#dash_tahun2').val();
                    var akun = $('#kode_akun').val();

                    window.location.href='fMainMobile.php?hal=app/rtrw/dashRwDet.php&param=$jenis/$kunci///'+tahun+'/'+akun;
                });

                // function getAkun(){
                //     $.ajax({
                //         type: 'POST',
                //         url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getAkun',
                //         dataType: 'json',
                //         data: {'kode_lokasi':'$kode_lokasi'},
                //         success:function(result){    
                //             var select = $('#kode_akun').selectize();
                //             select = select[0];
                //             var control = select.selectize;
                //             if(result.status){
                //                 if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                //                     for(i=0;i<result.daftar.length;i++){
                //                         if(result.daftar[i].kode_akun == '$kode_akun'){
                                            
                //                             control.addOption([{text:result.daftar[i].kode_akun + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akun, selected: true}]);  
                //                         } else{
                //                             control.addOption([{text:result.daftar[i].kode_akun + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akun, selected: false}]); 
                //                         }
                //                     }
                //                 }
                //                 control.selectedField('selected');
                //             }
                //         }
                //     });
                //  }
                //  getAkun();

                 

            });
			</script>";
?>
