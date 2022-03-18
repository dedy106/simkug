<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku3_dash_rptDashTarbakDetCash extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("|",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        $kunci = $tmp[5];

        $path = "http://".$_SERVER["SERVER_NAME"]."/";	
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";

        
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        $root_ser = $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/tarbak";
        
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        echo "<style>
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

        
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
            
            .card{
                box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
                border-radius:10px;
            }
        </style>
        <div class='panel'>
            <div class='panel-heading' style='padding-bottom:0;'>
                <ul class='nav nav-tabs'>
                    <li class='active'><a data-toggle='tab' href='#home'>TK</a></li>
                    <li><a data-toggle='tab' href='#menu1'>SD</a></li>
                    <li><a data-toggle='tab' href='#menu1'>SMP</a></li>
                    <li><a data-toggle='tab' href='#menu1'>SMA</a></li>
                    <li><a data-toggle='tab' href='#menu1'>ASM</a></li>
                    <li class='pull-right' style='padding-right: 15px;'>
                    <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                    <span id='refresh_btn' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                    <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                    </li>
                </ul>
            </div>
            <div class='panel-body'>
                <div class='tab-content' style='padding-left:10px'>
                    <div id='home' class='tab-pane fade in active'>
                        <div class='row'>
                            <div class='col-md-4'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h6 class='card-title' style='padding-left:10px; padding-top:10px;'>Payment Composition</h6>
                                                <div id='chart-piutang' style='min-width: 300px; height: 300px; margin: 0 auto'></div>
                                            </div>                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-4'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h6 class='card-title' style='padding-left:10px; padding-top:10px;'>Cash Collection</h6>
                                                <div id='income-rra-ytd' style='min-width: 300px; height: 300px; margin: 0 auto'></div>
                                            </div>                                    
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-4'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:10px; padding-top:10px;'>Income Budget Overview</h4>
                                                <h6 class='card-title' style='padding-left:10px; padding-top:10px;'>Budget Current Month</h6>
                                                <div id='income-budget-month' style='min-width: 200px; height: 200px; margin: 10 auto'>
                                                </div>
                                            </div>                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
                </div>
            </div>"; //end panel-body//
    echo"</div>"; //end panel//
        
        echo"<script src='https://code.highcharts.com/modules/solid-gauge.js'></script>";
        echo"<script>
        $('.panel').on('click','#close_btn',function(){
            // alert('test');
            window.history.go(-1); return false;
        });
        $('.panel').on('click','#refresh_btn',function(){
            // alert('test');
            location.reload();
        });
        $('.panel').on('click','#back_btn',function(){
            // alert('test');
            window.history.go(-1); return false;
        });

        function sepNum(x){
            var num = parseFloat(x).toFixed(2);
            var parts = num.toString().split('.');
            var len = num.toString().length;
            // parts[1] = parts[1]/(Math.pow(10, len));
            parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
            return parts.join(',');
        }
        function sepNumPas(x){
            var num = parseInt(x);
            var parts = num.toString().split('.');
            var len = num.toString().length;
            // parts[1] = parts[1]/(Math.pow(10, len));
            parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
            return parts.join(',');
        }

        function toJuta(x) {
            var nil = x / 1000000;
            return sepNumPas(nil) + ' JT';
        }

        function toMilyar(x) {
            var nil = x / 1000000000;
            return sepNumPas(nil) + ' M';
        }

        function loadService(index,method,url,param=null){
            $.ajax({
                type: method,
                url: url,
                dataType: 'json', 
                async: false,
                data: {'periode':'$periode','param':param},
                success:function(result){    
                    if(result.status){
                        switch(index){
                            case 'income' :
                            Highcharts.chart('chart-piutang', {
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie'
                                },
                                credits: {
                                enabled: false
                                },
                                title: {
                                    text: ''
                                },
                                tooltip: {
                                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            enabled: false
                                        },
                                        showInLegend: false
                                    }
                                },
                                series: [{
                                    name: 'Brands',
                                    colorByPoint: true,
                                    data: [{
                                        name: 'Chrome',
                                        y: 25,
                                        sliced: false,
                                        selected: true
                                    }, {
                                        name: 'Internet Explorer',
                                        y: 25
                                    }, {
                                        name: 'Firefox',
                                        y: 25
                                    }, {
                                        name: 'Edge',
                                        y: 25
                                    }]
                                }]
                                });

                                //Budget Current Month
                                var gaugeOptions = {

                                    chart: {
                                        type: 'solidgauge'
                                    },
                                
                                    title: null,
                                
                                    pane: {
                                        center: ['50%', '85%'],
                                        size: '140%',
                                        startAngle: -90,
                                        endAngle: 90,
                                        background: {
                                            backgroundColor:
                                                Highcharts.defaultOptions.legend.backgroundColor || '#EEE',
                                            innerRadius: '60%',
                                            outerRadius: '100%',
                                            shape: 'arc'
                                        }
                                    },
                                
                                    tooltip: {
                                        enabled: false
                                    },
                                
                                    // the value axis
                                    yAxis: {
                                        stops: [
                                            [0.1, '#4CD964'], // green
                                            [0.5, '#4CD964'], // yellow
                                            [0.9, '#4CD964'] // red
                                        ],
                                        lineWidth: 0,
                                        minorTickInterval: null,
                                        tickAmount: 2,
                                        title: {
                                            y: -70
                                        },
                                        labels: {
                                            y: 16
                                        }
                                    },
                                
                                    plotOptions: {
                                        solidgauge: {
                                            dataLabels: {
                                                y: 5,
                                                borderWidth: 0,
                                                useHTML: true
                                            }
                                        }
                                    }
                                };
                                
                                var chartSpeed = Highcharts.chart('income-budget-month', Highcharts.merge(gaugeOptions, {
                                    yAxis: {
                                        min: 0,
                                        max: 100,
                                        title: {
                                            text: ''
                                        }
                                    },
                                
                                    credits: {
                                        enabled: false
                                    },
                                
                                    series: [{
                                        name: 'Speed',
                                        data: [80],
                                        dataLabels: {
                                            format:
                                                '<div style=\"text-align:center\">' +
                                                '<span style=\"font-size:25px\">{y}%</span><br/>' +
                                                '</div>'
                                        },
                                        tooltip: {
                                            valueSuffix: ' %'
                                        }
                                    }]
                                
                                }));
                                
                                
                                    Highcharts.chart('income-rra-ytd', {
                                        chart: {
                                            type: 'column'
                                        },
                                        credits: {
                                                enabled: false
                                        },
                                        title: {
                                            text: ''
                                        },
                                        xAxis: {
                                            type: 'category'
                                        },
                                        yAxis: {
                                            title: {
                                                enabled: false
                                            }
                    
                                        },
                                        legend: {
                                            enabled: false
                                        },
                                        plotOptions: {
                                            series: {
                                                borderWidth: 0,
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            },
                                            column: {
                                                stacking: 'normal',
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            }
                                        },
                                        series: [
                                            {
                                                name: 'Institusi',
                                                color: '#FFCC00',
                                                data: [
                                                    {
                                                        name: 'JAN',
                                                        y: 18,
                                                    },
                                                    {
                                                        name: 'FEB',
                                                        y: 10,
                                                    },
                                                    {
                                                        name: 'MAR',
                                                        y: 50,
                                                    },
                                                    {
                                                        name: 'APR',
                                                        y: 20,
                                                    },
                                                    {
                                                        name: 'MEI',
                                                        y: 10,
                                                    },
                                                    {
                                                        name: 'JUN',
                                                        y: 20,
                                                    },
                                                    {
                                                        name: 'JUL',
                                                        y: 40,
                                                    },
                                                    {
                                                        name: 'AGS',
                                                        y: 10,
                                                    },
                                                    {
                                                        name: 'SEP',
                                                        y: 20,
                                                    },
                                                    {
                                                        name: 'OKT',
                                                        y: 10,
                                                    },
                                                    {
                                                        name: 'NOV',
                                                        y: 20,
                                                    },
                                                    {
                                                        name: 'DES',
                                                        y: 40,
                                                    }
                                                ]
                                            },
                                            {
                                                name: 'Institusi',
                                                color: '#007AFF',
                                                data: [
                                                    {
                                                        name: 'JAN',
                                                        y: 10,
                                                    },
                                                    {
                                                        name: 'FEB',
                                                        y: 8,
                                                    },
                                                    {
                                                        name: 'MAR',
                                                        y: 25,
                                                    },
                                                    {
                                                        name: 'APR',
                                                        y: 10,
                                                    },
                                                    {
                                                        name: 'MEI',
                                                        y: 6,
                                                    },
                                                    {
                                                        name: 'JUN',
                                                        y: 12,
                                                    },
                                                    {
                                                        name: 'JUL',
                                                        y: 20,
                                                    },
                                                    {
                                                        name: 'AGS',
                                                        y: 4,
                                                    },
                                                    {
                                                        name: 'SEP',
                                                        y: 12,
                                                    },
                                                    {
                                                        name: 'OKT',
                                                        y: 7,
                                                    },
                                                    {
                                                        name: 'NOV',
                                                        y: 11,
                                                    },
                                                    {
                                                        name: 'DES',
                                                        y: 21,
                                                    }
                                                ]
                                            }
                                            
                                            ]
                                        });
                            break;
                            
                            
                        }
                    }
                }
            });
        }
        function initDash(){
            loadService('income','GET','$root_ser/dashTarbak.php?fx=getPeriode2');
            loadService('expense','GET','$root_ser/dashTarbak.php?fx=getPeriode2');
        }

        initDash();
    </script>"; //script navigasi

    
		return "";
	}
	
}
?>
