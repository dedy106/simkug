<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $logomain = $path.'/web/img/yspt2.png';
    $mainname = $_SESSION['namaPP'];

   
    $tmp=explode("/",$_GET['param']);
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
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }

    $path = "http://".$_SERVER["SERVER_NAME"]."/";				
    $keu = $path . "image/keu.jpg";
    $pbh = $path . "image/Keuangan.png";
    $rra = $path . "image/agg2.png";
    $agg = $path . "image/pbh3.png";

    //SQL Today's Cash and Bank Balance

    $sql1a = "select sum(so_akhir) as nilai
    from db_grafik_d a
    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
    inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB10') and c.kode_pp='$kode_pp' and c.so_akhir<>0
    ";
    $rs1a=execute($sql1a);
    $nil1a=$rs1a->fields[0];

    //SQL Operating Ratio

    $sql = " select a.kode_rasio,a.kode_lokasi,a.kode_neraca,
    case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio,
    case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n2 else b.n2 end as gar
          from db_rasio_d a
          inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
          inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
          where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and c.flag_box='1' and b.kode_pp='$kode_pp' and b.kode_fs='$kode_fs' and c.kode_rasio='DB05'
          order by a.kode_rasio";

    $boxras = execute($sql);
    
    while ($row = $boxras->FetchNextObject(false)){
        $nil[] =(array)$row;
        $gar[] =(array)$row;
    }
    
    $dfr = array();

    for($i=0; $i<count($nil); $i++){
        if(!ISSET($dfr[$nil[$i]['kode_rasio']])){
            $dfr[$nil[$i]['kode_rasio']] = array('nama_rasio' => $nil[$i]['nama_rasio'], 'rumus' => $nil[$i]['rumus'], 'par'=>array());
        }

        $dfr[$nil[$i]['kode_rasio']]['par'][] = array(
            'kode_neraca'=>$nil[$i]['kode_neraca'],
            'nilai2'=>$nil[$i]['nilai2']
        );
    }

    // COLLECTION RATIO
    $sqlcol="select a.tot_bill, b.tot_byr, (b.tot_byr/a.tot_bill)*100 as cr
    from (
    select kode_lokasi, kode_pp,sum(nilai) as tot_bill
    from sis_bill_d
    where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode='".$periode."' 
    group by kode_lokasi,kode_pp
    ) a
    inner join 
    (select kode_lokasi, kode_pp,sum(nilai) as tot_byr
    from sis_rekon_d
    where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode='".$periode."' 
    group by kode_lokasi,kode_pp) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
    ";
    $rscol =execute($sqlcol); 

    $nilcol = $rscol->fields[2]; //collection rasio

	echo "$header
    <div class='panel' style='$padding'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>";
            echo "<div class='row'>
                <div class='col-md-6 col-xs-12'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteDet.php&param=cbb|';\">
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <p style='text-align:left;font-size: 14px;'> Today's Cash and Bank Balance </p>
                            <h3 id='home_kas_box' style='font-size:25px;text-align:right'>".number_format($nil1a,0,",",".")."</h3>
                            <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'></p>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 col-xs-6'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteDet.php&param=opr|';\">
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>";
                            foreach($dfr as $d){
                                $p = '';
                                for($z=0; $z<count($d['par']); $z++){
                                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";
                
                                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];

                                
                                }
                                $kode=$d['nama_rasio'];
                                echo"
                                <p>".$d['nama_rasio']."</p>
                                <h3 id='home_kas_box' style='font-size:25px'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."%</h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>Current Year</p>";
                                
                            }
                            echo"
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-3 col-xs-6'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteDet.php&param=clr|';\">
                    <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;'>
                        <div class='inner'>
                            <center>
                                <p>Collection Ratio</p>
                                <h3 id='home_kas_box' style='font-size:25px'>".number_format($nilcol,1,",",".")."%</h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                            </center>
                        </div>
                    </div>
                    </a>
                </div>
                <div class='col-md-6 col-xs-12'>
                <style>
                    #dash_chart_agg {
                        max-width: 800px;
                        height: 85px;
                        
                    }
                    #dash_chart_agg2 {
                        max-width: 800px;
                        height: 85px;
                    }
                    #dash_chart_agg3 {
                        max-width: 800px;
                        height: 85px;
                    }
                    .hc-cat-title {
                      font-size: 13px;
                      font-weight: bold;
                    }
                </style>";
                
                $sqlagg= "select a.kode_grafik,a.nama,
                isnull(b.nilai/1000000,0) as nilai,
                isnull(b.gar/1000000,0) as gar, (isnull(b.nilai/1000000,0)/ isnull(b.gar/1000000,0)) *100 as n1
                from db_grafik_m a
                left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                                sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                                    from db_grafik_d a
                                    inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                    where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                    group by a.kode_grafik,a.kode_lokasi
                                )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
                where a.kode_grafik in ('DB02') and a.kode_lokasi='$kode_lokasi'";

                $agg = execute($sqlagg);

                $sqlagg= "select a.kode_grafik,a.nama,
                isnull(b.nilai/1000000,0) as nilai,
                isnull(b.gar/1000000,0) as gar, (isnull(b.nilai/1000000,0)/ isnull(b.gar/1000000,0)) * 100 as n1  
                from db_grafik_m a
                left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                                sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                                    from db_grafik_d a
                                    inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                    where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                    group by a.kode_grafik,a.kode_lokasi
                                )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
                where a.kode_grafik in ('DB03') and a.kode_lokasi='$kode_lokasi'";

                $agg2 = execute($sqlagg);


                $sqlagg= "select a.kode_grafik,a.nama,
                isnull(b.nilai/1000000,0) as nilai,
                isnull(b.gar/1000000,0) as gar, (isnull(b.nilai/1000000,0)/ isnull(b.gar/1000000,0)) * 100 as n1  
                from db_grafik_m a
                left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                                sum(b.n2) as gar
                                    from db_grafik_d a
                                    inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                    where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                    group by a.kode_grafik,a.kode_lokasi
                                )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
                where a.kode_grafik in ('DB04') and a.kode_lokasi='$kode_lokasi'";

                $agg3 = execute($sqlagg);
                echo"
                <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.location.href='$fmain?hal=app/ypt/dashYspteDet.php&param=agg|';\">
                    <div class='box' style='box-shadow:none;border: 1px solid white;
                        border-radius: 10px;'>
                        <div class='box-header'>
                            <i class='fa fa-line-chart'> </i>
                            <h3 class='box-title'>Budget and Actual</h3>
                        </div>
                        <div class='box-body pad' style='padding-left:0px;padding-right:0px' >
                            <div class='col-xs-12' style='padding-right:0px;font-size:12px'>
                                Pendapatan
                            </div>
                            <div class='col-xs-12' style='padding-right:0px;padding-left: 0px;'>
                                <div id='dash_chart_agg'></div>
                            </div>
                            <div class='col-xs-12' style='padding-right:0px;font-size:12px'>
                                Beban
                            </div>
                            <div class='col-xs-12' style='padding-right:0px;padding-left: 0px;'>
                                <div id='dash_chart_agg2'></div>
                            </div>
                            <div class='col-xs-12' style='padding-right:0px;font-size:12px'>
                                SHU
                            </div>
                            <div class='col-xs-12' style='padding-right:0px;padding-left: 0px;'>
                                <div id='dash_chart_agg3'></div>
                            </div>";
                            echo"
                            </div>
                        </div>
                    </div>
                <a>
                    <script>
                        Highcharts.chart('dash_chart_agg', {
                            chart: {
                                inverted: true,
                                // marginLeft: 105,
                                type: 'bullet'
                            },
                            title: {
                                text: null
                            },
                            legend: {
                                enabled: false
                            },
                            plotOptions: {
                                series: {
                                    pointPadding: 0.25,
                                    borderWidth: 0,
                                    color: '#eaeef2',
                                    targetOptions: {
                                        width: '0%'
                                    }
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                categories: null
                            },
                            yAxis: {
                                gridLineWidth: 0,
                                plotBands: [{
                                    from: 0,
                                    to: 100,
                                    color: '#337ab7'
                                }],
                                labels: {
                                    format: '{value} %'
                                },
                                title: null
                            },
                            series: [{
                                data: [{
                                    y: ".round($agg->fields[4],2).",
                                    target: 100
                                }]
                            }],
                            tooltip: {
                                pointFormat: '<b>{point.y}</b> (with target at {point.target})%'
                            }
                        });
                        
                        Highcharts.chart('dash_chart_agg2', {
                            chart: {
                                inverted: true,
                                //marginLeft: 135,
                                type: 'bullet'
                            },
                            title: {
                                text: null
                            },
                            legend: {
                                enabled: false
                            },
                            plotOptions: {
                                series: {
                                    pointPadding: 0.25,
                                    borderWidth: 0,
                                    color: '#eaeef2',
                                    targetOptions: {
                                        width: '0%'
                                    }
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                categories: null
                            },
                            yAxis: {
                                gridLineWidth: 0,
                                plotBands: [{
                                    from: 0,
                                    to: 100,
                                    color: '#fa9c0a'
                                }],
                                labels: {
                                    format: '{value}%'
                                },
                                title: null
                            },
                            series: [{
                                data: [{
                                    y: ".round($agg2->fields[4],2).",
                                    target: 100
                                }]
                            }],
                            tooltip: {
                                pointFormat: '<b>{point.y}</b> (with target at {point.target})%'
                            }
                        });
                        
                        Highcharts.chart('dash_chart_agg3', {
                            chart: {
                                inverted: true,
                                //marginLeft: 135,
                                type: 'bullet'
                            },
                            title: {
                                text: null
                            },
                            legend: {
                                enabled: false
                            },
                            plotOptions: {
                                series: {
                                    pointPadding: 0.25,
                                    borderWidth: 0,
                                    color: '#eaeef2',
                                    targetOptions: {
                                        width: '0%'
                                    }
                                }
                            },
                            credits: {
                                enabled: false
                            },
                            exporting: {
                                enabled: false
                            },
                            xAxis: {
                                categories: null
                            },
                            yAxis: {
                                gridLineWidth: 0,
                                plotBands: [{
                                    from: 0,
                                    to: 100,
                                    color: '#00a65a '
                                }],
                                labels: {
                                    format: '{value}%'
                                },
                                title: null
                            },
                            series: [{
                                data: [{
                                    y: ".round($agg3->fields[4],2).",
                                    target: 100
                                }]
                            }],
                            tooltip: {
                                pointFormat: '<b>{point.y}</b> (with target at {point.target})%'
                            }
                        });
                    </script>

                </div>
                <div class='col-md-6 col-xs-12'>
                    <div class='box' style='box-shadow:none;border:0'>
                        <div class='box-header'>
                            <i class='fa fa-bar-chart'></i>
                            <h3 class='box-title'>Cash in - Cash out</h3>
                        </div>
                        <div class='box-body box-click' id='box-cash'>
                            <div id='dash_chart_cash'></div>
                        </div>
                    </div>
                </div>
            </div>";

            //SQL CASH IN OUT
            $pembagi=1000000;
            $sqlIn = "select	a.kode_lokasi,a.kode_pp,sum(case when substring(a.periode,5,2)='01' then a.debet else 0 end) n1,
            sum(case when substring(a.periode,5,2)='02' then a.debet else 0 end) n2,   
            sum(case when substring(a.periode,5,2)='03' then a.debet else 0 end) n3,
            sum(case when substring(a.periode,5,2)='04' then a.debet else 0 end) n4,
            sum(case when substring(a.periode,5,2)='05' then a.debet else 0 end) n5,
            sum(case when substring(a.periode,5,2)='06' then a.debet else 0 end) n6,
            sum(case when substring(a.periode,5,2)='07' then a.debet else 0 end) n7,
            sum(case when substring(a.periode,5,2)='08' then a.debet else 0 end) n8,
            sum(case when substring(a.periode,5,2)='09' then a.debet else 0 end) n9,
            sum(case when substring(a.periode,5,2)='10' then a.debet else 0 end) n10,
            sum(case when substring(a.periode,5,2)='11' then a.debet else 0 end) n11,  
            sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.debet else 0 end) n12
            from (
                select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_pp,c.kode_lokasi
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB10' and c.kode_pp='$kode_pp' and c.so_akhir<>0
            ) a
            where substring(a.periode,1,4) = '".substr($periode,0,4)."' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'
            group by a.kode_lokasi,a.kode_pp";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

            $resIn = execute($sqlIn);
            while ($row = $resIn->FetchNextObject(false)){
                
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
                
                
            }
            
            $Cash[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );
            
            $sqlOut = "select	a.kode_lokasi,a.kode_pp,sum(case when substring(a.periode,5,2)='01' then a.kredit else 0 end) n1,
            sum(case when substring(a.periode,5,2)='02' then a.kredit else 0 end) n2,   
            sum(case when substring(a.periode,5,2)='03' then a.kredit else 0 end) n3,
            sum(case when substring(a.periode,5,2)='04' then a.kredit else 0 end) n4,
            sum(case when substring(a.periode,5,2)='05' then a.kredit else 0 end) n5,
            sum(case when substring(a.periode,5,2)='06' then a.kredit else 0 end) n6,
            sum(case when substring(a.periode,5,2)='07' then a.kredit else 0 end) n7,
            sum(case when substring(a.periode,5,2)='08' then a.kredit else 0 end) n8,
            sum(case when substring(a.periode,5,2)='09' then a.kredit else 0 end) n9,
            sum(case when substring(a.periode,5,2)='10' then a.kredit else 0 end) n10,
            sum(case when substring(a.periode,5,2)='11' then a.kredit else 0 end) n11,  
            sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.kredit else 0 end) n12
            from (
                select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_pp,c.kode_lokasi
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB10' and c.kode_pp='$kode_pp' and c.so_akhir<>0
            ) a
            where substring(a.periode,1,4) = '".substr($periode,0,4)."' 
            group by a.kode_lokasi,a.kode_pp";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

            $resOut = execute($sqlOut);
            while ($row = $resOut->FetchNextObject(false)){
                
                $n1=$row->n1/$pembagi;
                $n2=$row->n2/$pembagi;
                $n3=$row->n3/$pembagi;
                $n4=$row->n4/$pembagi;
                $n5=$row->n5/$pembagi;
                $n6=$row->n6/$pembagi;
                $n7=$row->n7/$pembagi;
                $n8=$row->n8/$pembagi;
                $n9=$row->n9/$pembagi;
                $n10=$row->n10/$pembagi;
                $n11=$row->n11/$pembagi;
                $n12=$row->n12/$pembagi;
            }
            
            $Cash[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );


            echo"               
            </div>
       </div>";    

		echo "
        <script type='text/javascript'>
        // CASH IN OUT
        Highcharts.chart('dash_chart_cash', {
            title: {
                text: ''
            },
            credits: {
                enabled: false
            },
            xAxis: {
                categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
            },
            yAxis: [{ // Primary yAxis
                labels: {
                    format: '{value} jt',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                },
                title: {
                    text: 'Nilai',
                    style: {
                        color: Highcharts.getOptions().colors[1]
                    }
                }
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
                name: 'Cash In',
                data: ".json_encode($Cash[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: '  jt'
                }
            }, {
                type: 'column',
                name: 'Cash Out',
                color:'#ff6f69',
                data: ".json_encode($Cash[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });
    
        </script>";

   
?>
