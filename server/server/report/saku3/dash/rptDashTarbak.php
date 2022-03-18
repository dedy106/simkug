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
class server_report_saku3_dash_rptDashTarbak extends server_report_basic
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

        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        $root_ser = $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/tarbak";
		
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
            h1{
                margin:5px auto;
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
                padding-left:0px !important;
                padding-right:10px !important;
            }
            .mar-mor{
                margin-bottom:10px !important;
            }
            .box-wh{
                box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
                border-radius: 15px;
            }
            .card{
                box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
                border-radius:10px;
            }
        </style>
		<div class='panel'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard
                <div class='navbar-custom-menu pull-right padding:0px'>
                    <ul class='nav navbar-nav'>
                        <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:0px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                        </li>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>
                <div class='row' style='margin-bottom:15px'>
                    <div class='col-md-4'>
                        <div class='card'>
                            <div class='card-body'>
                                <div class='row'>
                                    <div class='col-md-8'>
                                        <h4 class='card-title' style='padding-left:10px;'>Piutang Institusi (%)</h4>
                                    </div>
                                    <div class='col-md-4'>
                                        <h4 class='card-title' style='text-align:right; padding-right:10px;'>120,34M</h4>
                                    </div>
                                    <div class='col-md-12'>
                                        <a  id='piutang' style='cursor: pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail4','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|piutang');\">
                                            <div id='chart-piutang' style='min-width: 250px; height: 300px; max-width: 400px; margin: 0 auto'>
                                            </div>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-8'>
                        <div class='card'>
                            <div class='card-body'>
                                <div class='row'>
                                    <div class='col-md-8'>
                                        <h4 class='card-title' style='padding-left:10px;'>Budget Control</h4>
                                    </div>
                                    <div class='col-md-4'>
                                    <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>
                                        <select class='form-control selectize'>
                                            <option value=''>Periode</option>
                                        </select>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col-md-12'>
                                    <a id='budget' style='cursor: pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetBudget','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|budget');\">
                                        <div id='chart-budget' style='height: 300px; margin: 0 auto'>
                                        </div>
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='card' >
                            <div class='card-body'>
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <h4 class='card-title' style='padding-left:10px;'>Cash Collection (%)</h4>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col-md-12'>
                                    <a id='budget' style='cursor: pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetCash','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|cash');\">
                                        <div id='chart-cash-collection' style='height: 300px; margin: 0 auto'>
                                        </div>
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='card'>
                            <div class='card-body'>
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <h4 class='card-title' style='padding-left:10px;'>Revenue YoY</h4>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <div id='chart-revenue' style='height: 300px; margin: 0 auto'>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3'>
                        <div class='card'>
                            <div class='card-body'>
                                <div class='row'>
                                    <div class='col-md-12'>
                                        <h4 class='card-title' style='padding-left:10px;'>Posisi Pengajuan</h4>
                                    </div>
                                </div>
                                <div class='row'>
                                    <div class='col-md-12'>
                                    <a id='pengajuan' style='cursor: pointer;' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTarbakDetail4','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|pengajuan');\">
                                    <table class='table table-borderless' id='table-posisi'>
                                        <tbody>
                                        </tbody>
                                    </table>
                                    </a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>";
                    echo"
                </div>";
            echo"
            </div>
        </div>";

		echo "
        <script type='text/javascript'>

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
                                case 'piutangInstitusi' :
                                // Build the chart piutang
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
                                    name: 'Piutang',
                                    colorByPoint: true,
                                    // data: [{
                                    //     name: 'Chrome',
                                    //     y: 25,
                                    //     sliced: false,
                                    //     selected: true
                                    // }, {
                                    //     name: 'Internet Explorer',
                                    //     y: 25
                                    // }, {
                                    //     name: 'Firefox',
                                    //     y: 25
                                    // }, {
                                    //     name: 'Edge',
                                    //     y: 25
                                    // }]
                                    data:result.data
                                }]
                                });
                                break;
                                case 'budgetControl' :
                                // Build the chart Budget Control
                                Highcharts.chart('chart-budget', {
                                    chart: {
                                        type: 'column'
                                    },
                                    title: {
                                        text: ''
                                    },
                                    xAxis: {
                                        categories: [
                                            'TK',
                                            'SD',
                                            'SMP',
                                            'SMA',
                                            'ASM'
                                        ]
                                    },
                                    yAxis: [{
                                        min: 0,
                                        title: {
                                            text: ''
                                        }
                                    }, {
                                        title: {
                                            text: ''
                                        },
                                        opposite: true
                                    }],
                                    legend: {
                                        shadow: false
                                    },
                                    tooltip: {
                                        shared: false
                                    },
                                    credits: {
                                    enabled: false
                                    },
                                    plotOptions: {
                                        column: {
                                            grouping: false,
                                            shadow: false,
                                            borderWidth: 0
                                        },
                                        showInLegend: false
                                    },
                                    // series: [{
                                    //     name: 'Employees',
                                    //     color: 'rgba(0,0,255 ,1)',
                                    //     data: [150, 150, 150, 150, 150],
                                    //     pointPadding: 0.3,
                                    //     pointPlacement: -0.2
                                    // }, {
                                    //     name: 'Employees Optimized',
                                    //     color: 'rgba(0,255,0 ,1)',
                                    //     data: [130, 130, 130, 130, 130],
                                    //     pointPadding: 0.4,
                                    //     pointPlacement: -0.2
                                    // }, {
                                    //     name: 'Profit',
                                    //     color: 'rgba(248,161,63,1)',
                                    //     data: [158,158,158,158,158],
                                    //     pointPadding: 0.3,
                                    //     pointPlacement: 0.2,
                                    //     yAxis: 1
                                    // }, {
                                    //     name: 'Profit Optimized',
                                    //     color: 'rgba(255,69,0 ,1)',
                                    //     data: [160,160,160,160,160],
                                    //     pointPadding: 0.4,
                                    //     pointPlacement: 0.2,
                                    //     yAxis: 1
                                    // }]
                                    series:result.series
                                });
                                break;
                                case 'cashColl':

                                // Build the chart Cash Collection
                                Highcharts.chart('chart-cash-collection', {
                                    title: {
                                        text: ''
                                    },
                                    credits: {
                                    enabled: false
                                    },
                                    subtitle: {
                                        text: ''
                                    },
                                        xAxis: {
                                        categories: ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Des']
                                    },
                                    yAxis: {
                                        title: {
                                            text: ''
                                        }
                                    },
                                    legend: {
                                        layout: 'vertical',
                                        align: 'right',
                                        verticalAlign: 'middle'
                                    },
                                
                                    plotOptions: {
                                        series: {
                                            label: {
                                                connectorAllowed: false
                                            }
                                        }
                                    },
                                
                                    series: [{
                                        name: 'A',
                                        data: result.Cash.A
                                    }, {
                                        name: 'B',
                                        data: result.Cash.B
                                    }, {
                                        name: 'C',
                                        data: result.Cash.C
                                    }],
                                    // series : result.series
                                
                                    responsive: {
                                        rules: [{
                                            condition: {
                                                maxWidth: 500
                                            },
                                            chartOptions: {
                                                legend: {
                                                    layout: 'horizontal',
                                                    align: 'center',
                                                    verticalAlign: 'bottom'
                                                }
                                            }
                                        }]
                                    }
                                });
                                break;
                                case 'revenue' :

                                Highcharts.chart('chart-revenue', {
                                    chart: {
                                        type: 'line'
                                    },
                                    credits: {
                                    enabled: false
                                    },
                                    title: {
                                        text: ''
                                    },
                                    subtitle: {
                                        text: ''
                                    },
                                    xAxis: {
                                        categories: result.category
                                    },
                                    yAxis: {
                                        title: {
                                                enabled: false
                                        },
                                        labels: {
                                            formatter: function () {
                                                return this.value / 1000 + 'k';
                                            }
                                        }
                                    },
                                    plotOptions: {
                                        line: {
                                            dataLabels: {
                                                enabled: false
                                            },
                                            enableMouseTracking: false
                                        }
                                    },
                                    series: [{
                                        name: 'Revenue',
                                        data: result.series
                                    }]
                                });
                                break;
                                case 'posisi' :
                                var html='';
                                // var data = ['Pengajuan','Beban','Verifikasi Beban','DPC','Bayar'];
                                for(var i=0;i<result.data.length;i++){
                                    html+=`<tr>
                                        <td style='border:none;'>`+result.data[i].nama+`</td>
                                        <td style='border:none; padding-left:50px;'>
                                        <div style='background-color:#3498DB; width:70px; color:white; text-align:center; border-radius:40px;'>`+result.data[i].nilai+`</div>
                                        </td>
                                    </tr>`;
                                }
                                $('#table-posisi tbody').html(html);
                                break;
                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('piutangInstitusi','GET','$root_ser/dashTarbak.php?fx=getPiutangInstitusi');
                loadService('budgetControl','GET','$root_ser/dashTarbak.php?fx=getBudgetControl');
                loadService('cashColl','GET','$root_ser/dashTarbak.php?fx=getCashColl');
                loadService('revenue','GET','$root_ser/dashTarbak.php?fx=getRevenue');
                loadService('posisi','GET','$root_ser/dashTarbak.php?fx=getPosisi');
            }

            initDash();
        </script>
        ";

		return "";
	}
	
}
?>
