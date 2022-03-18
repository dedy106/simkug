<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

   
    body {
        font-family: 'Roboto', sans-serif !important;
    }
    h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
        font-family: 'Roboto', sans-serif !important;
        font-weight: normal !important;
    }
    .judul-box{
        font-weight:bold;
        font-size:18px !important;
    }
    .inner{
        padding:5px !important;
    }

    .box-nil{
        margin-bottom: 20px !important;
    }
    text {
        text-decoration: none !important;
    }
    .highcharts-button-box+text {
        fill: white !important;
    }
</style>
<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from periode");

    $periode = $res->fields[0];
    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;
    $bln=substr($periode,5,2);
    $bulan=getNamaBulan($bln);
    $bulan_rev=getNamaBulan($bln-1);
    
    $logomain = $path.'/web/img/yspt2.png';
    $mainname = $_SESSION['namaPP'];

    $tmp=explode("/",$_GET['param']);
    if($tmp[0] != ''){
        $periode=$tmp[0];
    }

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
        $padding="background:#ecf0f5";
        $style = "box-shadow: 0 0 0 white;";
    }

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
   
    //SQL Pendapatan
    $sqlbox1 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
    from exs_neraca a
    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T'
    order by rowindex ";
    $rsAcvp = execute($sqlbox1);
    $rowAcvp = $rsAcvp->FetchNextObject($toupper);
    $persenPend = ($rowAcvp->n6/$rowAcvp->n7)*100;


    $sqlbox2 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
    from exs_neraca a
    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='58T'
    order by rowindex ";
    $rsAcvb = execute($sqlbox2);
    $rowAcvb = $rsAcvb->FetchNextObject($toupper);
    $persenBeb = ($rowAcvb->n6/$rowAcvb->n7)*100;

    $sqlbox3 = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
    from exs_neraca a
    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='59T'
    order by rowindex ";
    $rsAcvs = execute($sqlbox3);
    $rowAcvs = $rsAcvs->FetchNextObject($toupper);
    $persenSHU = ($rowAcvs->n6/$rowAcvs->n7)*100;

    $sqlboxOR = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
    case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
    case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
    case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
    case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
    case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
    case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
    case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
    case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
    from exs_neraca a
    where a.modul='L' and a.kode_lokasi='$kode_lokasi' and a.kode_fs='$kode_fs' and a.periode='$periode' and a.kode_neraca = 'OL'
    order by rowindex ";
    $rsOR = execute($sqlboxOR);
    $rowOR = $rsOR->FetchNextObject($toupper);

    echo "$header";
?>

    <div class='panel' style='<?= $padding ?>'>
        <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
        </div>
        <div class='panel-body'>
            <div class='row'>
            <!-- Pendapatan -->
                <div class='col-md-3 '>
                    <a href='#' class='small-box-footer'  >
                    <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;">
                        <div class="inner">
                            <p class='judul-box' style="text-align:left;"> Pendapatan </p>
                            <h3 id="home_kas_box" style="font-size:25px;text-align:center;margin-bottom:0px"><?= number_format($persenPend,2,",",".") ?> %</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center">Achivement</p>
                            <hr style="margin: 5px 0px 25px 0px;">
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Actual Ytd <?= $bulan_rev." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left">
                            <?= toMilyar($rowAcvp->n9); ?> </h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Budget Ytd <?= $bulan." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left"><?= toMilyar($rowAcvp->n7); ?> </h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Actual Ytd <?= $bulan." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left"><?= toMilyar($rowAcvp->n6); ?> </h3>
                        </div>
                    </div>
                    </a>
                </div>
            <!-- Beban -->
                <div class='col-md-3 '>
                    <a href='#' class='small-box-footer'  >
                    <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;">
                        <div class="inner">
                            <p class='judul-box' style="text-align:left;"> Beban </p>
                            <h3 id="home_kas_box" style="font-size:25px;text-align:center;margin-bottom:0px"><?= number_format($persenBeb,2,",",".") ?> %</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center">Achivement</p>
                            <hr style="margin: 5px 0px 25px 0px;">
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Actual Ytd <?= $bulan_rev." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left">
                            <?= toMilyar($rowAcvb->n9); ?> </h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Budget Ytd <?= $bulan." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left"><?= toMilyar($rowAcvb->n7); ?> </h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Actual Ytd <?= $bulan." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left"><?= toMilyar($rowAcvb->n6); ?> </h3>
                        </div>
                    </div>
                    </a>
                </div>
            <!-- SHU -->
                <div class='col-md-3 '>
                    <a href='#' class='small-box-footer'  >
                    <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;">
                        <div class="inner">
                            <p class='judul-box' style="text-align:left;"> SHU </p>
                            <h3 id="home_kas_box" style="font-size:25px;text-align:center;margin-bottom:0px"><?= number_format($persenSHU,2,",",".") ?> %</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center">Achivement</p>
                            <hr style="margin: 5px 0px 25px 0px;">
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Actual Ytd <?= $bulan_rev." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left">
                            <?= toMilyar($rowAcvs->n9); ?> </h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Budget Ytd <?= $bulan." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left"><?= toMilyar($rowAcvs->n7); ?> </h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Actual Ytd <?= $bulan." ".$tahun ?></p>
                            <h3 id="home_kas_box" class='box-nil' style="font-size:25px;text-align:left"><?= toMilyar($rowAcvs->n6); ?> </h3>
                        </div>
                    </div>
                    </a>
                </div>
            <!-- OR -->
                <div class='col-md-3 '>
                    <a href='#' class='small-box-footer'  >
                    <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;">
                        <div class="inner">
                            <p class='judul-box' style="text-align:left;"> OR </p>
                            <h3 id="home_kas_box" style="font-size:25px;text-align:center;margin-bottom:0px"><?= number_format($rowOR->n9,2,",",".") ?> %</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center">Actual Ytd <?= $bulan_rev." ".$tahun ?></p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 '>
                    <a href='#' class='small-box-footer'  >
                    <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;">
                        <div class="inner">
                            <p class='judul-box' style="text-align:left;"> OR </p>
                            <h3 id="home_kas_box" style="font-size:25px;text-align:center;margin-bottom:0px"><?= number_format($rowOR->n7,2,",",".") ?> %</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center">Budget Ytd <?= $bulan." ".$tahun ?></p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 '>
                    <a href='#' class='small-box-footer'  >
                    <div class="small-box bg-red" style="border:1px solid #e8e8e8;color:black !important;background-color:white !important;">
                        <div class="inner">
                            <p class='judul-box' style="text-align:left;"> OR </p>
                            <h3 id="home_kas_box" style="font-size:25px;text-align:center;margin-bottom:0px"><?= number_format($rowOR->n6,2,",",".") ?> %</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;text-align:center">Actual Ytd <?= $bulan." ".$tahun ?></p>
                        </div>
                    </div>
                    </a>
                </div>
                <!-- GRAFIK  -->
                <div class="col-md-6">
                    <div class='box' style='box-shadow:none;border:0'>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick = "window.location.href='<?= $fmain ?>?hal=app/ypt/dashYptGroupPendMoM.php&param=<?=$periode?>';">
                        <div class='box-header'>
                            <i class='fa fa-pie-chart'></i>
                            <h3 class='box-title'>Pendapatan</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Achivement (%)</p>
                        </div>
                        </a>
                        <div class='box-body box-click' id='box-pend'>
                            <div id='dash_chart_pend'></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-6">
                    <div class='box' style='box-shadow:none;border:0'>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick = "window.location.href='<?= $fmain ?>?hal=app/ypt/dashYptGroupBebanMoM.php&param=<?=$periode?>';">
                        <div class='box-header'>
                            <i class='fa fa-pie-chart'></i>
                            <h3 class='box-title'>Beban</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Achivement (%)</p>
                        </div>
                        </a>
                        <div class='box-body box-click' id='box-beb'>
                            <div id='dash_chart_beb'></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>SHU</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Achivement (%)</p>
                     
                        </div>
                        <div class='box-body box-click' id='box-pend'>
                            <div id='dash_chart_shu'></div>
                        </div>
                    </div>
                </div>
                <div class="col-md-12">
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>OR</h3>
                            <p style="font-size: 11px;margin-bottom: 0px;color:#bab0b0;">Achivement (%)</p>
                        </div>
                        <div class='box-body box-click' id='box-pend'>
                            <div id='dash_chart_or'></div>
                        </div>
                    </div>
                </div>
                <!-- </ GRAFIK -->
                <?php
                   //GRAFIK
   
    //PENDAPATAN
    $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
    from (select c.kode_bidang,c.nama, 
            sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
    from exs_neraca_pp a
    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
    inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
    where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='57T' and a.n7 <> 0
    group by c.kode_bidang,c.nama ) a
	where (a.n6/a.n7)*100 <> 0
    union all
    select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
    from lokasi a
    left join ( select a.kode_lokasi, 
            sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
            sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
    from exs_neraca a
    where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='57T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
    group by a.kode_lokasi
    ) b on a.kode_lokasi=b.kode_lokasi
	where (b.n6/b.n7)*100 <> 0 ";

    $rsPend = execute($sql);

    while($row = $rsPend->FetchNextObject(false)){
       
        $pend[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
        
    }  

    // $sql ="select a.kode_lokasi,a.kode_neraca,a.nama, a.n7,a.n6 ,(a.n6/a.n7)*100 as rasio
    // from ( select a.kode_lokasi,a.kode_neraca, a.nama,
    //         sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
    //         sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
    //         sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
    // from exs_neraca a
    // inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs
    // where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and b.kode_grafik in ('DB05','DB09') and a.kode_lokasi in ('03','08','11','13','14','15')
    // group by a.kode_lokasi,a.kode_neraca,a.nama
    // ) a 
    // where a.n7 > 0 
    // union all
    // select a.kode_bidang as kode_lokasi, a.kode_neraca,a.nama,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
	// 		from (select a.kode_neraca,c.kode_bidang,a.nama, 
	// 				sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
	// 				sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
	// 				sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
	// 		from exs_neraca_pp a
	// 		inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
	// 		inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
	// 		inner join db_grafik_d d on a.kode_neraca=d.kode_neraca and a.kode_lokasi=d.kode_lokasi and a.kode_fs=d.kode_fs
	// 		where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and d.kode_grafik in ('DB05','DB09') and b.kode_bidang in ('1','2','3','4','5') 
	// 		group by a.kode_neraca,c.kode_bidang,a.nama ) a
    // where a.n7 > 0 
    // order by a.kode_lokasi ";
    $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
    from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                   case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                   case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                   case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                   case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                   case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                   case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                   case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                   case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
           from exs_neraca_pp a
           inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
           where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='57T' and b.kode_bidang in ('1','2','3','4','5')
   ) a
   where a.n7 <> 0
   order by a.kode_lokasi
    ";
    $rsDrilP = execute($sql);

    $grouping = array();
    while($row = $rsDrilP->FetchNextObject(false)){
       
        if (!isset($grouping[$row->kode_lokasi])){
            $tmp["data"][]="";
            $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
        }
        $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
        $grouping[$row->kode_lokasi] = $tmp;

        // $pendDril[] = array('y'=>floatval($row->n6),'name'=>$row->nama,'key'=>$row->kode_neraca); 
        
    }  
    $result["series"] = $grouping;

    $result["grouping"] = array($result["series"]["1"],$result["series"]["2"],$result["series"]["3"],$result["series"]["4"],$result["series"]["5"]);


    //BEBAN

    $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
    from (select c.kode_bidang,c.nama, 
            sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
    from exs_neraca_pp a
    inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
    inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
    where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='58T' and a.n7 <> 0
    group by c.kode_bidang,c.nama ) a
	where (a.n6/a.n7)*100 <> 0
    union all
    select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
    from lokasi a
    left join ( select a.kode_lokasi, 
            sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
            sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
            sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
    from exs_neraca a
    where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='58T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
    group by a.kode_lokasi
    ) b on a.kode_lokasi=b.kode_lokasi
	where (b.n6/b.n7)*100 <> 0";

    $rsBeb = execute($sql);

    while($row = $rsBeb->FetchNextObject(false)){
       
        $Beb[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
        
    }  

    // $sql ="select a.kode_lokasi,a.kode_neraca,a.nama, a.n7,a.n6 ,(a.n6/a.n7)*100 as rasio
    // from ( select a.kode_lokasi,a.kode_neraca, a.nama,
    //         sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
    //         sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
    //         sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
    // from exs_neraca a
    // inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs
    // where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and b.kode_grafik in ('DB06','DB07') and a.kode_lokasi in ('03','08','11','13','14','15')
    // group by a.kode_lokasi,a.kode_neraca,a.nama
    // ) a 
    // where a.n7 > 0 
    // union all
    // select a.kode_bidang as kode_lokasi, a.kode_neraca,a.nama,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
	// 		from (select a.kode_neraca,c.kode_bidang,a.nama, 
	// 				sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
	// 				sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
	// 				sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
	// 		from exs_neraca_pp a
	// 		inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
	// 		inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
	// 		inner join db_grafik_d d on a.kode_neraca=d.kode_neraca and a.kode_lokasi=d.kode_lokasi and a.kode_fs=d.kode_fs
	// 		where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and d.kode_grafik in ('DB06','DB07') and b.kode_bidang in ('1','2','3','4','5') 
	// 		group by a.kode_neraca,c.kode_bidang,a.nama ) a
    // where a.n7 > 0 
    // order by a.kode_lokasi ";
    
    $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
    from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                   case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                   case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                   case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                   case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                   case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                   case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                   case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                   case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
           from exs_neraca_pp a
           inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
           where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='58T' and b.kode_bidang in ('1','2','3','4','5')
   ) a
   where a.n7 <> 0
   order by a.kode_lokasi
    ";
    $rsDrilB = execute($sql);


    $grouping2 = array();
    while($row = $rsDrilB->FetchNextObject(false)){
       
        if (!isset($grouping2[$row->kode_lokasi])){
            $tmp["data"][]="";
            $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
        }
        $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
        $grouping2[$row->kode_lokasi] = $tmp;

        // $pendDril[] = array('y'=>floatval($row->n6),'name'=>$row->nama,'key'=>$row->kode_neraca); 
        
    }  
    $result["series2"] = $grouping2;

    $result["grouping2"] = array($result["series2"]["1"],$result["series2"]["2"],$result["series2"]["3"],$result["series2"]["4"],$result["series2"]["5"]);

    //SHU

     $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
     from (select c.kode_bidang,c.nama, 
             sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
             sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
             sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
     from exs_neraca_pp a
     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
     inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
     where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='59T' and a.n7 <> 0
     group by c.kode_bidang,c.nama ) a
     where (a.n6/a.n7)*100 <> 0
     union all
     select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
     from lokasi a
     left join ( select a.kode_lokasi, 
             sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
             sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
             sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
     from exs_neraca a
     where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='59T' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
     group by a.kode_lokasi
     ) b on a.kode_lokasi=b.kode_lokasi
     where (b.n6/b.n7)*100 <> 0";
 
     $rsSHU = execute($sql);
 
     while($row = $rsSHU->FetchNextObject(false)){
        
         $SHU[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
         
     }  

     
    $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
    from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                   case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                   case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                   case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                   case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                   case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                   case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                   case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                   case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
           from exs_neraca_pp a
           inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
           where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='59T' and b.kode_bidang in ('1','2','3','4','5')
   ) a
   where a.n7 <> 0
   order by a.kode_lokasi
    ";
    
    $rsDrilS = execute($sql);

    $grouping3 = array();
    while($row = $rsDrilS->FetchNextObject(false)){
       
        if (!isset($grouping3[$row->kode_lokasi])){
            $tmp["data"][]="";
            $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
        }
        $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
        $grouping3[$row->kode_lokasi] = $tmp;

        // $pendDril[] = array('y'=>floatval($row->n6),'name'=>$row->nama,'key'=>$row->kode_neraca); 
        
    }  
    $result["series3"] = $grouping3;

    $result["grouping3"] = array($result["series3"]["1"],$result["series3"]["2"],$result["series3"]["3"],$result["series3"]["4"],$result["series3"]["5"]);

     //OR
     $sql="select a.kode_bidang as kode_lokasi, a.nama,a.n7,a.n6, (a.n6/a.n7)*100 as rasio
     from (select c.kode_bidang,c.nama, 
             sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7,
             sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
             sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
     from exs_neraca_pp a
     inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
     inner join bidang c on b.kode_bidang=c.kode_bidang and b.kode_lokasi=c.kode_lokasi
     where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode' and b.kode_bidang in ('1','2','3','4','5') and a.kode_neraca='OL' and a.n7 <> 0
     group by c.kode_bidang,c.nama ) a
     where (a.n6/a.n7)*100 <> 0
     union all
     select a.kode_lokasi,a.skode as nama, b.n7,b.n6,(b.n6/b.n7)*100 as rasio 
     from lokasi a
     left join ( select a.kode_lokasi, 
             sum(case a.jenis_akun when 'Pendapatan' then -a.n7 else a.n7 end) as n7, 
             sum(case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end) as n6,
             sum(case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end) as n5
     from exs_neraca a
     where a.modul='L' and a.kode_fs='FS1' and a.periode='$periode' and a.level_lap<=1 and a.kode_neraca='OL' and a.kode_lokasi in ('03','08','11','13','14','15') and a.n7 <> 0
     group by a.kode_lokasi
     ) b on a.kode_lokasi=b.kode_lokasi
     where (b.n6/b.n7)*100 <> 0";
 
     $rsOR = execute($sql);
 
     while($row = $rsOR->FetchNextObject(false)){
        
         $OR[] = array('y'=>round(floatval($row->rasio),2),'name'=>$row->nama,'drilldown'=>$row->kode_lokasi);   
         
     } 
     
     
    $sql = "select a.kode_pp,a.kode_lokasi,a.nama_pp,a.n7,a.n6,(a.n6/a.n7)*100 as rasio
    from (select a.kode_pp,b.kode_bidang as kode_lokasi,b.nama as nama_pp,
                   case a.jenis_akun when 'Pendapatan' then -a.n1 else a.n1 end as n1, 
                   case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end as n2, 
                   case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
                   case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
                   case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5,
                   case a.jenis_akun when  'Pendapatan' then -a.n6 else a.n6 end as n6,
                   case a.jenis_akun when  'Pendapatan' then -a.n7 else a.n7 end as n7,
                   case a.jenis_akun when  'Pendapatan' then -a.n9 else a.n9 end as n9
           from exs_neraca_pp a
           inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
           where a.modul='L' and a.kode_lokasi='12' and a.kode_fs='FS1' and a.periode='$periode'  and a.kode_neraca='OL' and b.kode_bidang in ('1','2','3','4','5')
   ) a
   where a.n7 <> 0
   order by a.kode_lokasi
    ";
    
    $rsDrilO = execute($sql);

    $grouping4 = array();
    while($row = $rsDrilO->FetchNextObject(false)){
       
        if (!isset($grouping4[$row->kode_lokasi])){
            $tmp["data"][]="";
            $tmp = array("name" => $row->kode_lokasi, "id" => $row->kode_lokasi,  "data" => array() );
        }
        $tmp["data"][] = array($row->nama_pp, round(floatval($row->rasio),2));
        $grouping4[$row->kode_lokasi] = $tmp;

        // $pendDril[] = array('y'=>floatval($row->n6),'name'=>$row->nama,'key'=>$row->kode_neraca); 
        
    }  
    $result["series4"] = $grouping4;

    $result["grouping4"] = array($result["series4"]["1"],$result["series4"]["2"],$result["series4"]["3"],$result["series4"]["4"],$result["series4"]["5"]);


                ?>
            </div>
            <aside class='control-sidebar control-sidebar-dark' style='padding-bottom:500px;'>
                <div class='tab-content'>
                    <div class='tab-pane active' id='control-sidebar-home-tab'>
                        <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                            <option value=''>Pilih Periode</option>
                            <?php
                            $resPer = execute("select distinct periode from exs_neraca where kode_lokasi='$kode_lokasi' order by periode desc");

                            while ($row = $resPer->FetchNextObject(false)){
                                if($row->periode==$periode){
                                    $selected="selected";
                                }else{
                                    $selected="";
                                }
                                echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
                            }
                            ?>
                        </select>
                        <a class='btn btn-sm btn-default pull-right' id='dash_refresh2' style='position: cursor:pointer; max-height:30px;' data-toggle='control-sidebar'><i class='fa fa-refresh fa-1'></i> Refresh</a>
                    </div>
                </div>
            </aside>
        </div>
    <div>
   
    <script src="https://code.highcharts.com/modules/data.js"></script>
    <script src="https://code.highcharts.com/modules/drilldown.js"></script>
    <script type='text/javascript'>

    $('#control-sidebar-home-tab').on('click','#dash_refresh2', function(){
        var per = $('#dash_periode').val();
        
        window.location.href='<?=$fmain?>?hal=app/ypt/dashYptGroupMoM.php&param='+per;
        
        
    });
       
    // Create the chart
    Highcharts.chart('dash_chart_pend', {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Click the slices to view detail.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}%'
                }
            }
        },
        credits: {
                enabled: false
            },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Pendapatan",
                colorByPoint: true,
                data: <?php echo json_encode($pend); ?>
                
            }
        ],
        drilldown: {
            series: <?php echo json_encode($result["grouping"])?>,
            drillUpButton :{
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: '#dd4b39',
                    'stroke-width': 1,
                    stroke: '#dd4b39',
                    r: 3,
                    states: {
                        hover: {
                            fill: '#dd4b39e8'
                        },
                        select: {
                            stroke: '#dd4b39',
                            fill: '#dd4b39e8'
                        }
                    }
                }
            }

        }
    });


    Highcharts.chart('dash_chart_beb', {
        chart: {
            type: 'pie'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Click the slices to view detail.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}%'
                }
            }
        },
        credits: {
                enabled: false
            },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "Beban",
                colorByPoint: true,
                data: <?php echo json_encode($Beb); ?>
                
            }
        ],
        drilldown: {
            series: <?php echo json_encode($result["grouping2"])?>,
            drillUpButton :{
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: '#dd4b39',
                    'stroke-width': 1,
                    stroke: '#dd4b39',
                    r: 3,
                    states: {
                        hover: {
                            fill: '#dd4b39e8'
                        },
                        select: {
                            stroke: '#dd4b39',
                            fill: '#dd4b39e8'
                        }
                    }
                }
            }

        }
    });


    Highcharts.chart('dash_chart_shu', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Click the slices to view detail.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}%'
                }
            }
        },
        credits: {
                enabled: false
            },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "SHU",
                colorByPoint: true,
                data: <?php echo json_encode($SHU); ?>
                
            }
        ],
        drilldown: {
            series: <?php echo json_encode($result["grouping3"])?>,
            drillUpButton :{
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: '#dd4b39',
                    'stroke-width': 1,
                    stroke: '#dd4b39',
                    r: 3,
                    states: {
                        hover: {
                            fill: '#dd4b39e8'
                        },
                        select: {
                            stroke: '#dd4b39',
                            fill: '#dd4b39e8'
                        }
                    }
                }
            }

        }
    });

    Highcharts.chart('dash_chart_or', {
        chart: {
            type: 'column'
        },
        title: {
            text: ''
        },
        subtitle: {
            text: 'Click the slices to view detail.'
        },
        plotOptions: {
            series: {
                dataLabels: {
                    enabled: true,
                    format: '{point.name}: {point.y:.2f}%'
                }
            }
        },
        credits: {
                enabled: false
            },

        tooltip: {
            headerFormat: '<span style="font-size:11px">{series.name}</span><br>',
            pointFormat: '<span style="color:{point.color}">{point.name}</span>: <b>{point.y:.2f}%</b> of total<br/>'
        },

        series: [
            {
                name: "OR",
                colorByPoint: true,
                data: <?php echo json_encode($OR); ?>
                
            }
        ],
        drilldown: {
            series: <?php echo json_encode($result["grouping4"])?>,
            drillUpButton :{
                relativeTo: 'spacingBox',
                position: {
                    y: 0,
                    x: 0
                },
                theme: {
                    fill: '#dd4b39',
                    'stroke-width': 1,
                    stroke: '#dd4b39',
                    r: 3,
                    states: {
                        hover: {
                            fill: '#dd4b39e8'
                        },
                        select: {
                            stroke: '#dd4b39',
                            fill: '#dd4b39e8'
                        }
                    }
                }
            }

        }
    });
    </script>
