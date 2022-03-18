<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $logomain = $path.'/image/ypt.jpeg';
    $mainname="Yayasan Pendidikan Telkom";

   
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
 
	echo "$header
    <div class='panel' style='$padding'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>";

            //KEUANGAN 
            echo"
                <div id='sai_home_grafik'>
                    <div class='row'>
                        <div class='col-md-6'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Keuangan</h3>
                                </div>
                                <div class='box-body box-click' id='box-keu'>
                                    <div id='dash_chart_keu'></div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-6'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'>Piutang</h3>
                                    <div class='col-md-4 pull-right'><label>Periode</label>
                                    
                                    <select class='form-control input-sm selectize' id='dash_perbox' style='margin-bottom:5px;'>";
                                    
                                    echo " <option value=''>Pilih Periode</option>";
                                    
                                    if($tmp[0] =="" OR $tmp[0] =="All"){     
                                        $kode_per="";
                                        echo " <option value='All' selected >All</option>";
                                    }else{
                                        $kode_per=$tmp[0];
                                        echo " <option value=".$kode_per." selected >".$kode_per."</option>";
                                    }
                                    
                                    $sql="select distinct periode as periode from sis_bill_d where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' order by periode desc ";
                                    // echo $sql;
                                    $resLok = execute($sql);
                                    echo " <option value='All'>All</option>";
                                    while ($row = $resLok->FetchNextObject(false)){
                                        echo " <option value=".$row->periode.">".$row->periode."</option>";
                                    }
                                    
                                    
                                    echo"  
                                    </select>
                                    </div>
                                </div>
                                <div class='box-body box-click' id='box-piu'>
                                    <div id='dash_chart_piu'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>";

                $sqlb1 = "select count(*) as jum,sum(a.nilai) as nilai
                from rra_pdrk_d a
                inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
                where b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.dc='D'
                --and b.periode='$periode' and b.modul='MULTI' 
                        ";
                $sqlb2 = "select count(*) as jum,sum(a.nilai) as nilai
                from rra_pdrk_d a
                inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk and a.kode_lokasi=b.kode_lokasi
                where b.progress in ('1')  and b.kode_lokasi='$kode_lokasi' and b.kode_pp='$kode_pp' and a.dc='D' --and b.periode='$periode' and b.modul='MULTI' ";

                $resb1=execute($sqlb1);
                $resb2=execute($sqlb2);
                $aju=$resb1->fields[0];
                $app=$resb2->fields[0];
                $blapp=$resb1->fields[0]-$resb2->fields[0];
                $persen1=100;
                $persen2=round($app/$aju)*100;
                $persen3=round($blapp/$aju)*100;

                echo"
                <div id='sai_home_box'>
                    <div class='row'>
                        <div class='col-md-6 box-click' style='' id='box-rra'>
                        <!-- small box -->
                            <div class='small-box bg-red' style='border-radius: 10px;background-color: white !important;color: #dd4b39 !important;border: 1px solid #dd4b39;min-height:140px;'>
                                <div class='col-xs-12' style='margin-top:10px'><span class='badge bg-red '>RRA</span></div>
                                <div class='inner col-xs-12' style='text-align:left;padding:10px;color:black'>

                                <h5 style='margin:0px;position:absolute;'>Pengajuan RRA</h5>
                                <span style='position: relative;' class='badge bg-aqua pull-right'>$aju</span>
                                <div class='progress-group' style='margin-left: 100px;position: relative;margin-top: 5px;margin-right:10%'>
                                    <div class='progress sm'>
                                        <div class='progress-bar progress-bar-aqua' style='width: $persen1%'></div>
                                    </div>
                                </div>
                                <h5 style='margin:0px;position:absolute;'>Approval RRA</h5>
                                <span style='position: relative;' class='badge bg-green pull-right'>$app</span>
                                <div class='progress-group' style='margin-left: 100px;position: relative;margin-top: 5px;margin-right:10%'>
                                    <div class='progress sm'>
                                        <div class='progress-bar progress-bar-green' style='width: $persen2%'></div>
                                    </div>
                                </div>
                                <h5 style='margin:0px;position:absolute;'>Belum Approve</h5>
                                <span style='position: relative;' class='badge bg-yellow pull-right'>$blapp</span>
                                <div class='progress-group' style='margin-left: 100px;margin-right:10%;position: relative;margin-top: 5px;'>
                                    <div class='progress sm'>
                                        <div class='progress-bar progress-bar-yellow' style='width: $persen3%'></div>
                                    </div>
                                </div>
                                </div>
                                
                            </div>

                        </div>
                        <div class='col-md-6'>
                            <div class='box' style='box-shadow:none;border: 1px solid #dd4b39;
                            border-radius: 10px;'>
                                <div class='box-header'>
                                    <i class='fa fa-line-chart'> </i>
                                    <h3 class='box-title'>RRA</h3>
                                </div>
                                <div class='box-body pad'>";
                                    
                                    $res = execute("select a.no_pdrk,a.keterangan,a.progress, case a.progress when '0' then 'Pengajua' when '1' then 'Approve' when 'X' then 'Reject' end as status from rra_pdrk_m a
                                    where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.progress in ('0','1','X')
                                    order by a.no_pdrk desc
                                    ");
                                    while($row=$res->FetchNextObject($toupper)){
                                        if($row->progress == '0'){
                                            $color="color:blue";
                                        }else if($row->progress == '1'){
                                            $color="color:green";
                                        }else{
                                            $color="color:red";
                                        }
                                        echo"
                                        <div class='box-footer box-comments' style='background:white'>
                                            <div class='box-comment'>
                                                <div class='comment-text' style='margin-left: 0px;padding-left: 0px;'>
                                                    <div class='col-xs-9' style='padding-left: 0px;padding-right:0px'>
                                                        $row->no_pdrk | $row->keterangan
                                                    </div>
                                                    <div class='col-xs-3' style='padding-right: 0px;text-align:center'>
                                                        <span style='$color'>$row->status</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>";
                                    }
                                    echo"
                                </div>
                            </div>
                        </div>
                    </div>";

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
                    </style>
                    <div class='row'>
                        <div class='col-sm-4'>
                            <div class='box' style='box-shadow:none;border:0'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart'></i>
                                    <h3 class='box-title'></h3>
                                </div>
                                <div class='box-body box-click' >
                                    <div id='dash_chart_agg'></div>
                                    <div id='dash_chart_agg2'></div>
                                    <div id='dash_chart_agg3'></div>
                                </div>
                            </div>
                        </div>
                        
                    </div>
                   
                </div>
                <script src='../../../web/js/bullet.js'></script> 
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
                            color: '#000',
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
                        categories: ['<span class=\"hc-cat-title\">Pendapatan</span><br/>']
                    },
                    yAxis: {
                        gridLineWidth: 0,
                        plotBands: [{
                            from: 0,
                            to: 100,
                            color: '#bbb'
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
                            color: '#000',
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
                        categories: ['<span class=\"hc-cat-title\">Beban</span><br/>']
                    },
                    yAxis: {
                        gridLineWidth: 0,
                        plotBands: [{
                            from: 0,
                            to: 100,
                            color: '#bbb'
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
                            color: '#000',
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
                        categories: ['<span class=\"hc-cat-title\">SHU</span><br/>']
                    },
                    yAxis: {
                        gridLineWidth: 0,
                        plotBands: [{
                            from: 0,
                            to: 100,
                            color: '#bbb'
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
                </script>";

                //SQL KEUANGAN
                $sqlPen = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02')
                group by a.kode_lokasi";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
                $pembagi=1000000;

                $resPen = execute($sqlPen);
                while ($row = $resPen->FetchNextObject(false)){
                    
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
                
                $Keu[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );
                
                $sqlBeb = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')
                group by a.kode_lokasi";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                $resBeb = execute($sqlBeb);
                while ($row = $resBeb->FetchNextObject(false)){
                    
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
                
                $Keu[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

                $no=1;
                for($n=0;$n<=11;$n++){
                    
                    ${"nr" . $no}= $Keu[0][$n]-$Keu[1][$n];
                    $no++;

                }

                $Keu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
                round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
                round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
                round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
                );

                //SQL PIUTANG
                
                if($tmp[0] == "" OR $tmp[0] =="All"){
                    $filper="";
                    $filper2="";
                }else{
                    $filper=" and a.periode='$kode_per' ";
                    $filper2=" and a.periode_bill='$kode_per' ";
                }
                $piucolor=array('#fa9c0a','#0e9aa7','#dd4b39','#ff6f69');
                $res = execute("select 'BILL' as kode,'Tagihan' as nama, a.kode_lokasi, a.kode_pp,sum(a.nilai)/$pembagi as total 
                    from sis_bill_d a 
                    where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' $filper 
                    group by a.kode_lokasi,a.kode_pp
                
                ");
                $row = $res->FetchNextObject(false);
                $pius[0] =array('y'=>round(floatval($row->total)),'name'=>$row->nama,'key'=>$row->kode,'color'=>$piucolor[0]);
                $piuc[0] = $row->nama;
                $totbil=$row->total;

                $res = execute("select 'BAYAR' as kode,'Pembayaran' as nama,a.kode_lokasi,a.kode_pp,sum(a.nilai)/$pembagi as total
                from sis_rekon_d a 
                where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' $filper2 
                group by a.kode_lokasi,a.kode_pp
                
                ");
                $row = $res->FetchNextObject(false);
                $pius[1] =array('y'=>round(floatval($row->total)),'name'=>$row->nama,'key'=>$row->kode,'color'=>$piucolor[1]);
                $piuc[1] = $row->nama;
                $totbyr=$row->total;

                $totpiu=$totbil-$totbyr;
                $pius[2] =array('y'=>round(floatval($totpiu)),'name'=>'Tunggakan','key'=>'TGG','color'=>$piucolor[2]);
                $piuc[2] = 'Tunggakan';


            echo"               
            </div>
       </div>";    

		echo "
        <script type='text/javascript'>

        
        var options = {
            chart: {
                renderTo: 'dash_chart_piu',
                type: 'bar'
            },
            title:{
                text:''
            },
            exporting: { 
                enabled: false
            },
            series: [{
                name: 'Jumlah',
                data: ".json_encode($pius).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }],
            xAxis: {
                title: {
                    text: null
                },
                categories: ".json_encode($piuc).",
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
            credits: {
                enabled: false
            },
        };

        options.plotOptions = {
            series: {
                dataLabels: {
                    enabled: true
                },
                cursor: 'pointer',
                point: {
                    events: {
                        click: function() {
                            var id = this.name;    
                            var kd= this.options.key;
                            //alert(kd);                        
                           
                        }
                    }
                }
            }
        };
        
        new Highcharts.Chart(options);
        
        Highcharts.chart('dash_chart_keu', {
            title: {
                text: ''
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
                type: 'line',
                name: 'Income',
                data: ".json_encode($Keu[0]).",
                color:'#0e9aa7',
                tooltip: {
                    valueSuffix: ' jt'
                }
            }, {
                type: 'line',
                name: 'Expense',
                color:'#ff6f69',
                data: ".json_encode($Keu[1]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            },{
                type: 'line',
                name: 'Net Income',
                color:'#fa9c0a',
                data: ".json_encode($Keu[2]).",
                tooltip: {
                    valueSuffix: ' jt'
                }
            }]
        });

        $('.box-click').css('cursor','pointer');

        $('#box-keu').click(function(){
            window.location.href='$fmain?hal=app/ypt/dashYptPp2Det.php&param=keu|';
        });

        
        $('#box-piu').click(function(){
            //alert('test');
        });

        
        $('#box-rra').click(function(){
            //alert('test');
        });

        $('#dash_perbox').change(function(e) { 
            e.preventDefault();
            var per = this.value;
            window.location.href='$fmain?hal=app/ypt/dashYptPp2.php&param='+per+'/';
        });


        </script>";

   
?>
