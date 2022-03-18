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

function toJuta($x) {
    $nil = $x / 1000000;
    return number_format($nil,2,",",".") . " JT";
}
class server_report_saku3_dash_rptDashYakesInvesPpbs extends server_report_basic
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
        
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik'";

        $rs3=$dbLib->execute($sqlNot);

        $tahun = substr($periode,0,4);
        $tahunSebelum = intval($tahun) - 1;

        $kode_fs="FS1";
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = "919006";
        $_SESSION['userPwd'] = "pusat25";
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        $root_ser = $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/yakes";
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        echo"
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
            
            
            body {
                font-family: 'Roboto', sans-serif !important;
            }
            h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                font-family: 'Roboto', sans-serif !important;
                font-weight: normal !important;
            }
            h3{
                margin-bottom: 5px;
                font-size:18px !important
            }
            h2{
                margin-bottom: 5px;
                margin-top:5px;
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
            
            .pad-more{
                padding-left:10px !important;
                padding-right:0px !important;
            }
            .mar-mor{
                margin-bottom:10px !important;
            }
            .box-wh{
                box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
            }
        </style>
        <div class='panel' style='background:#f6f6f6'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard";
            echo" 
                <div class='navbar-custom-menu pull-right padding:0px'>
                <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                    <i class='fa fa-bell-o'></i>
                    <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rs2->fields[0]."</span>
                    </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rs2->fields[0]." notifications</li>";
                    while ($row = $rs3->FetchNextObject($toupper=false)) {
                echo"
                    <li>
                        <ul class='menu'>
                        <li>
                            <a href='#'>
                            <i class='fa fa-users text-aqua'></i> $row->pesan
                            </a>
                        </li>
                        </ul>
                    </li>
                    ";
                    }
                echo"
                    <li class='footer'><a href='#'>View all</a></li>
                    </ul>
                </li>
                <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:0px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                </li>
                <li>
                    <a href='#' data-toggle='control-sidebar' id='open-sidebar' style='padding:0px 15px 10px 10px'><i class='fa fa-gears'></i></a>
                </li>
                </ul>
                </div>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-4 pad-more'>
                        <div class='col-md-12 pad-more'>
                            <div class='panel mar-mor box-wh'>
                                <div class='panel-body'>
                                    <h3 class='font-weight-light' style='color: #000000; margin-top: 0.9rem; padding-left: 0.5rem;'>Capex</h3>
                                    <p style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: #D3D3D3;'>Estimasi Penyerapan 2019</p>
                                    <div id='capex' style='margin: 0 auto; padding: 0 auto; height: 150px;'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12 pad-more'>
                            <div class='panel mar-mor box-wh'>
                                <div class='panel-body'>
                                    <h3 class='font-weight-light' style='color: #000000; margin-top: 0.9rem; padding-left: 0.5rem;'>Beban</h3>
                                    <p style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: #D3D3D3;'>Estimasi Penyerapan 2019</p>
                                    <p style='padding-top: 1rem; padding-left: 3rem; font-size: 1.2rem; color: #D3D3D3;'>Total Beban</p>
                                    <p style='margin-top: -1.5rem; padding-left: 2rem; font-size: 3rem;'>80,21%</p>
                                    <p style='margin-top: -7.8rem; text-align: right; padding-top: 1rem; padding-right: 2rem;  font-size: 3rem;'>90,85%</p>
                                    <p style='text-align: right; margin-top: -1.5rem; padding-right: 1.5rem; font-size: 1.2rem; color: #D3D3D3;'>Beban Setelah Pajak</p>
                    
                                    <p style='padding-left: 1rem; font-size: 1.5rem;'>SDM</p>
                                    <div class='progress' style='margin-left: 1rem; width: 230px; margin-top: -1rem; height: 30px;'>
                                    <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #52B8DB; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                    </div>
                    
                                    <p style='margin-top: -10px; padding-left: 1rem; font-size: 1.5rem;'>Administrasi dan Umum</p>
                                    <div class='progress' style='margin-left: 1rem; width: 230px; margin-top: -1rem; height: 30px;'>
                                    <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #52B8DB; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                    </div>
                    
                                    <p style='margin-top: -10px; padding-left: 1rem; font-size: 1.5rem;'>Pelayanan Kesehatan</p>
                                    <div class='progress' style='margin-left: 1rem; width: 230px; margin-top: -1rem; height: 30px;'>
                                    <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #52B8DB; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                    </div>
                    
                                    <p style='margin-top: -10px; padding-left: 1rem; font-size: 1.5rem;'>Kepengurusan YAKES</p>
                                    <div class='progress' style='margin-left: 1rem; width: 230px; margin-top: -1rem; height: 30px;'>
                                    <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #52B8DB; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                    </div>
                    
                                    <p style='margin-top: -10px; padding-left: 1rem; font-size: 1.5rem;'>Pemeliharaan dan Perbaikan</p>
                                    <div class='progress' style='margin-left: 1rem; width: 230px; margin-top: -1rem; height: 30px;'>
                                    <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #52B8DB; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                    </div>
                    
                                    <p style='margin-top: -10px; padding-left: 1rem; font-size: 1.5rem;'>Penyusutan dan Amortisasi</p>
                                    <div class='progress' style='margin-left: 1rem; width: 230px; margin-top: -1rem; height: 30px;'>
                                    <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #52B8DB; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                    </div>
                    
                                    <p style='margin-top: -10px; padding-left: 1rem; font-size: 1.5rem;'>Pajak Badan</p>
                                    <div class='progress' style='margin-left: 1rem; width: 230px; margin-top: -1rem; height: 30px;'>
                                    <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #52B8DB; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-8 pad-more'>
                        <div class='col-md-12 pad-more'>
                            <div class='panel mar-mor box-wh'>
                                <div class='panel-body'>
                                    <h3 class='font-weight-light' style='color: #000000; margin-top: 0.9rem; padding-left: 0.5rem;'>Pendapatan</h3>
                                    <p style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: #D3D3D3;'>Estimasi Penyerapan 2019</p>
                                    <h2 class='font-weight-light' style='text-align: right; color: #000000; margin-top: -52px; padding-right: 0.5rem;'>80,21%</h2>
                                    <div class='row' style='padding-top: 2rem;'>
                                        <div class='col-sm-4 col-md-4 col-xs-4'>
                                            <p style='text-align: center; font-size: 2rem; font-weight: bold;'>Jasa Giro</p>
                                            <div id='giro' style='margin: 0 auto;'></div>
                                        </div>
                                        <div class='col-sm-4 col-md-4 col-xs-4'>
                                            <p style='text-align: center; font-size: 2rem; font-weight: bold;'>Kunjungan</p>
                                            <div id='kunjungan' style='margin: 0 auto;'></div>
                                        </div>
                                        <div class='col-sm-4 col-md-4 col-xs-4'>
                                            <p style='text-align: center; font-size: 2rem; font-weight: bold;'>Lain-lain</p>
                                            <div id='lain' style='margin: 0 auto;'></div>
                                        </div>
                                        <p style='text-align: center; font-size: 2rem; font-weight: bold; margin-top: 5rem;'>Investasi</p>
                                        <hr style='width: 95%'>
                                        <div class='col-sm-6 col-md-6 col-xs-6'>
                                            <div id='investasi'></div>
                                        </div>
                                        <div class='col-sm-6 col-md-6 col-xs-6'>
                                            <p style='text-align: left; font-size: 2rem; padding-left: 1rem;'>Pendapatan Bersih</p>
                                            <div id='pendapatan' style='margin: 0 auto;'></div>
                                            <p style='padding-left: 1rem; font-size: 2rem; margin-top: -5px;'>Beban</p>
                                            <div class='progress' style='margin-left: 1rem; width: 300px; margin-top: -1rem; height: 30px;'>
                                            <div class='progress-bar' role='progressbar' style='width: 80%; text-align: left; padding-left: 0.5rem; background-color: #FF69B4; padding-top: 1rem;' aria-valuenow='80' aria-valuemin='0' aria-valuemax='100'>80%</div>
                                            </div>
                                            <p style='padding-left: 1rem; font-size: 3.5rem;'>90,85%<span><i class='fa fa-sort-asc' aria-hidden='true' style='color: #69ff82;'></i></span></p>
                                            <p style='padding-left: 1rem; color: #D3D3D3; margin-top: -2rem;'>Nilai Investasi</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>

            $('.panel').on('click', '#btn-refresh', function(){
                location.reload();
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
                return sepNum(nil) + ' JT';
            }

            function loadService(index,method,url,param=null){
                $.ajax({
                    type: method,
                    url: url,
                    dataType: 'json',
                    data: {'periode':'$periode','param':param},
                    success:function(result){    
                        if(result.status){
                            switch(index){
                                case 'capex' :
                                Highcharts.chart('capex', {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: 0,
                                        plotShadow: false
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    title: {
                                        text: '80,21%',
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        y: 10
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            dataLabels: {
                                                enabled: false,
                                                distance: -50,
                                                style: {
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }
                                            },
                                            startAngle: -90,
                                            endAngle: 90,
                                            center: ['50%', '80%'],
                                            size: '180%'
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Browser share',
                                        innerSize: '50%',
                                        data: [
                                            ['Chrome', 58.9],
                                            {
                                                name: 'Other',
                                                y: 7.61,
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            }
                                        ]
                                    }]
                                });
                                
                                break;
                                case 'pendapatan':
                                                                
                                Highcharts.chart('giro', {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: 0,
                                        plotShadow: false,
                                        height: (9 / 16 * 100) + '%' // 16:9 ratio
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    title: {
                                        text: '80,21%',
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        y: 12
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            dataLabels: {
                                                enabled: false,
                                                distance: -50,
                                                style: {
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }
                                            },
                                            startAngle: -90,
                                            endAngle: 90,
                                            center: ['50%', '70%'],
                                            size: '180%'
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Browser share',
                                        innerSize: '50%',
                                        data: [
                                            ['Chrome', 58.9],
                                            {
                                                name: 'Other',
                                                y: 7.61,
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            }
                                        ]
                                    }]
                                });

                                Highcharts.chart('kunjungan', {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: 0,
                                        plotShadow: false,
                                        height: (9 / 16 * 100) + '%' // 16:9 ratio
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    title: {
                                        text: '80,21%',
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        y: 12
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            dataLabels: {
                                                enabled: false,
                                                distance: -50,
                                                style: {
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }
                                            },
                                            startAngle: -90,
                                            endAngle: 90,
                                            center: ['50%', '70%'],
                                            size: '180%'
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Browser share',
                                        innerSize: '50%',
                                        data: [
                                            ['Chrome', 58.9],
                                            {
                                                name: 'Other',
                                                y: 7.61,
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            }
                                        ]
                                    }]
                                });

                                Highcharts.chart('lain', {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: 0,
                                        plotShadow: false,
                                        height: (9 / 16 * 100) + '%' // 16:9 ratio
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    title: {
                                        text: '80,21%',
                                        align: 'center',
                                        verticalAlign: 'middle',
                                        y: 12
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            dataLabels: {
                                                enabled: false,
                                                distance: -50,
                                                style: {
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }
                                            },
                                            startAngle: -90,
                                            endAngle: 90,
                                            center: ['50%', '70%'],
                                            size: '180%'
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Browser share',
                                        innerSize: '50%',
                                        data: [
                                            ['Chrome', 58.9],
                                            {
                                                name: 'Other',
                                                y: 7.61,
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            }
                                        ]
                                    }]
                                });
                                break;
                                case 'investasi':
                                                                
                                Highcharts.chart('investasi', {
                                    chart: {
                                        type: 'bar'
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    title: {
                                        text: ''
                                    },
                                    xAxis: {
                                        categories: [
                                            'Doc',
                                            'Bunga Deposito',
                                            'MTN',
                                            'Bunga Obligasi',
                                            'Saham',
                                            'Reksadana',
                                            'Tanah Bangunan'
                                        ],
                                        crosshair: true
                                    },
                                    yAxis: {
                                        min: 0,
                                        title: {
                                            text: ''
                                        }
                                    },
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                        pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                            '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                        footerFormat: '</table>',
                                        shared: true,
                                        useHTML: true
                                    },
                                    plotOptions: {
                                        column: {
                                            pointPadding: 0.2,
                                            borderWidth: 0
                                        }
                                    },
                                    series: [{
                                        name: 'Penyerapan',
                                        data: [99, 95, 98, 96, 97, 99, 98],
                                        color : '#ff9500'

                                    }]
                                });

                                Highcharts.chart('pendapatan', {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: 0,
                                        plotShadow: false,
                                        height: 150,
                                        width: 345
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    title: {
                                        style: {
                                            fontSize: '15px'
                                        },
                                        text: '80,21%',
                                        align: 'left',
                                        verticalAlign: 'middle',
                                        y: 40,
                                        x: 50
                                    },
                                    tooltip: {
                                        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                    },
                                    plotOptions: {
                                        pie: {
                                            dataLabels: {
                                                enabled: false,
                                                distance: -50,
                                                style: {
                                                    fontWeight: 'bold',
                                                    color: 'white'
                                                }
                                            },
                                            startAngle: -90,
                                            endAngle: 90,
                                            center: ['20%', '100%'],
                                            size: '180%'
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Browser share',
                                        innerSize: '50%',
                                        data: [
                                            ['Chrome', 58.9],
                                            {
                                                name: 'Other',
                                                y: 7.61,
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            }
                                        ]
                                    }]
                                });
                                break;
                                case ''

                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('capex','GET','$root_ser/dashYakesInves.php?fx=getPeriode2'); 
                loadService('pendapatan','GET','$root_ser/dashYakesInves.php?fx=getPeriode2');   
                loadService('investasi','GET','$root_ser/dashYakesInves.php?fx=getPeriode2');   
            }

            initDash();
            </script>

        ";
        

		return "";
	}
	
}
?>
