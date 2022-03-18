<?php 
	$kode_lokasi=$_SESSION['lokasi'];
    //$periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
    $periode = $res->fields[0];
    
    $logomain = $path.'/web/img/logo.png';
    $mainname="Nama Perusahaan";

    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    $tmp=explode("/",$_GET['param']);
    
    $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";

    $kode_fs="FS1";

	if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 0px solid #e6e2e2;'>
        <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b>
        <span class='pull-right' style='font-size: 10px;'>".date('d-m-Y')."</span></span>
        </a>
        </header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }
    
    echo $header;
?>
<style type="text/css" media="screen">

    .kotak{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    min-height:80px !important; 
    width: 100%; 
    padding:5px; 

    }
    #dash_chart_agg {
        max-width: 400px;
        height: 70px;
        
    }
    #dash_chart_agg2 {
        max-width: 400px;
        height: 70px;
        
    }
    #dash_chart_agg3 {
        max-width: 400px;
        height: 70px;
        
    }
</style>
<div class='panel' style='<?php echo $padding; ?>'>
    <div class='panel-body' style=''>
        <div class="row" style="">
            <div class="col-md-6 col-xs-6 col-sm-6">
                <div class="info-box kotak text-center">
                    <h5 style="margin-bottom: 0px;margin-top: 5px;">Pendapatan</h5>
                    <h2 style="margin-top: 0px;margin-bottom: 0px;">59,76%</h2>
                    <p style="font-size: 9px;color: #bfbfbf;margin-bottom: 5px;">Bulan Berjalan</p>
                </div>
            </div>
            <div class="col-md-6 col-xs-6 col-sm-6">
                <div class="info-box kotak text-center">
                    <h5 style="margin-bottom: 0px;margin-top: 5px;">Beban</h5>
                    <h2 style="margin-top: 0px;margin-bottom: 0px;">59,76%</h2>
                    <p style="font-size: 9px;color: #bfbfbf;margin-bottom: 5px;">Bulan Berjalan</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12">
                <div class='box' style='box-shadow:none;border: 1px solid white;border-radius: 10px;'>
                    <div class='box-header'>
                        <h3 class='box-title'>Budget - Actual</h3>
                        <p style="font-size: 9px;color: #bfbfbf;margin-bottom: 0px;">Year to Date</p>
                    </div>
                    <div class='box-body pad' style='padding-left:0px;padding-right:0px;padding-top:0px' >
                        <div class='col-xs-3' style='padding-right:0px;font-size:12px'>
                            Pendapatan
                        </div>
                        <div class='col-xs-9' style='padding-right:0px;padding-left: 0px;'>
                            <div id='dash_chart_agg'></div>
                        </div>
                        <div class='col-xs-3' style='padding-right:0px;font-size:12px'>
                            Beban
                        </div>
                        <div class='col-xs-9' style='padding-right:0px;padding-left: 0px;'>
                            <div id='dash_chart_agg2'></div>
                        </div>
                        <div class='col-xs-3' style='padding-right:0px;font-size:12px'>
                            SHU
                        </div>
                        <div class='col-xs-9' style='padding-right:0px;padding-left: 0px;'>
                            <div id='dash_chart_agg3'></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="row">
            <div class='col-md-6'>
                <div class='box' style='box-shadow:none;border:0'>
                    <div class='box-header'>
                        <h3 class='box-title'>Profit and Loss</h3>
                    </div>
                    <div class='box-body'>
                        <div id='dash_chart_keu'></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
function loadService(index,method,url,param=null){
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'periode':'<?php echo $periode ?>','param':param},
        success:function(result){    
            if(result.status){
                switch(index){
                    case 'getBudgetActual' :
                        Highcharts.chart('dash_chart_agg', {
                            chart: {
                                inverted: true,
                                // marginLeft: 105,
                                type: 'bullet',
                                
                            },
                            title: {
                                text: ''
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
                                categories: ['','']
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
                                    y: 80,
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
                                type: 'bullet',
                                
                            },
                            title: {
                                text: ''
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
                                categories: ['','']
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
                                    y: 85,
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
                                type: 'bullet',
                                
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
                                categories: ['','']
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
                                    y: 70,
                                    target: 100
                                }]
                            }],
                            tooltip: {
                                pointFormat: '<b>{point.y}</b> (with target at {point.target})%'
                            }
                        });
                    break;
                    case 'profitLoss':
                    Highcharts.chart('dash_chart_keu', {
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
                            type: 'line',
                            name: 'Income',
                            data: [100,80,50,70,60,20,80,100,0,0,0,0],
                            color:'#0e9aa7',
                            tooltip: {
                                valueSuffix: ' jt'
                            }
                        }, {
                            type: 'line',
                            name: 'Expense',
                            color:'#ff6f69',
                            data: [80,50,40,60,50,10,70,90,0,0,0,0],
                            tooltip: {
                                valueSuffix: ' jt'
                            }
                        },{
                            type: 'line',
                            name: 'Net Income',
                            color:'#fa9c0a',
                            data: [20,30,10,10,10,10,10,10,0,0,0,0],
                            tooltip: {
                                valueSuffix: ' jt'
                            }
                        }]
                    });
                    break;
                }
            }
        }
    });
}

function initDash(){
    loadService('getBudgetActual','GET','<?php echo $root_ser.'/dashTelUPbh.php?fx=getTotalPiu'; ?>');
    loadService('profitLoss','GET','<?php echo $root_ser.'/dashTelUPbh.php?fx=getTotalPiu'; ?>');   
}
initDash();


</script>