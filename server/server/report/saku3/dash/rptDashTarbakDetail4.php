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
class server_report_saku3_dash_rptDashTarbakDetail4 extends server_report_basic
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
                <div class='row' style='padding-right: 15px;'>
                    <div class='pull-right navigasi'>
                        <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                        <span id='refresh_btn'style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                        <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                    </div>
                </div>
            </div>
            <div class='panel-body'>";
        switch($kunci){
            case "piutang" :
            echo"<div class='row'>
                    <div class='col-md-6'>
                        <div class='card'>
                            <div class='card-body'>
                                <h4 class='card-title' style='padding-left:10px; padding-top:10px;'>Piutang Per Institusi</h4>
                                <div id='chart-piutang-institusi' style='min-width: 300px; height: 300px; margin: 0 auto'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6'>
                        <div class='card' >
                            <div class='card-body'>
                                <h4 class='card-title' style='padding-left:10px; padding-top:10px;'>Piutang Per Parameter</h4>
                                <div id='chart-parameter-piutang' style='min-width: 300px; height: 300px; margin: 0 auto'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-4'>
                        <div class='card' style='margin-left:-15px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'>
                            <div class='card-body'>
                                <h4 class='card-title' style='padding-left:10px; padding-top:10px;'>Aging Piutang s/d 09 2019</h4>
                                <div id='chart-aging-piutang' style='width: 300px; height: 300px; margin: 0 auto'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='card' style='margin-left:-15px; box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19);'>
                            <div class='card-body'>
                                <h4 class='card-title' style='padding-left:10px; padding-top:10px;'>Piutang Per Tahun Ajaran</h4>
                                <div id='chart-piutang-ajaran' style='width: 300px; height: 300px; margin: 0 auto'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>"; //end row//
            break;
            case "pengajuan" :
            echo"<h3 style='text-align:center'>Daftar Pengajuan Pembendaharaan</h3>";
            echo"<div class='row'>
                    <div class='col-md-9'>
                    </div>
                    <div class='col-md-3'>
                        <input type='text' class='form-control' id='cari-pengajuan' placeholder='Cari Pengajuan' style='border-radius:10px;'>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <table class='table table-striped' style='margin-top:10px;' id='table-detAju'>
                            <thead style='text-align:center;background-color:#FF0000;color:#ffffff;'>
                                <tr>
                                    <th>No</th>
                                    <th>Tanggal</th>
                                    <th>No.Bukti</th>
                                    <th>Jenis</th>
                                    <th>Deskripsi</th>
                                    <th>Nilai</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>"; //end row//
            break;
        }
        echo"</div>"; //end panel-body//
    echo"</div>"; //end panel//
        
        echo"<script src='https://code.highcharts.com/modules/variable-pie.js'></script>";
        echo"<script>
        $('.navigasi').on('click','#close_btn',function(){
            // alert('test');
            window.history.go(-1); return false;
        });
        $('.navigasi').on('click','#refresh_btn',function(){
            // alert('test');
            location.reload();
        });
        $('.navigasi').on('click','#back_btn',function(){
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
                            case 'piutangInstitusi' :
                                // Create the chart piutang
                                Highcharts.chart('chart-piutang-institusi', {
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
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'Institusi',
                                            colorByPoint: false,
                                            data: [
                                                {
                                                    name: 'FAK1',
                                                    y: 18,
                                                    drilldown: 'FAK1'
                                                },
                                                {
                                                    name: 'FAK2',
                                                    y: 10,
                                                    drilldown: 'FAK2'
                                                },
                                                {
                                                    name: 'FAK3',
                                                    y: 50,
                                                    drilldown: 'FAK3'
                                                },
                                                {
                                                    name: 'FAK4',
                                                    y: 20,
                                                    drilldown: 'FAK4'
                                                },
                                                {
                                                    name: 'FAK5',
                                                    y: 10,
                                                    drilldown: 'FAK5'
                                                },
                                                {
                                                    name: 'FAK6',
                                                    y: 20,
                                                    drilldown: 'FA6K'
                                                },
                                                {
                                                    name: 'FAK7',
                                                    y: 40,
                                                    drilldown: 'FAK7'
                                                },
                                                {
                                                    name: 'FAK8',
                                                    y: 10,
                                                    drilldown: 'FAK8'
                                                }
                                            ]
                                            }
                                        ]
                                    });
                            break;
                            case 'piutangParam' :
                                    //chart parameter piutang//
                                    Highcharts.chart('chart-parameter-piutang', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: 0,
                                            plotShadow: false
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        title: {
                                            text: '2019',
                                            align: 'center',
                                            verticalAlign: 'middle',
                                            y: 100
                                        },
                                        tooltip: {
                                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                dataLabels: {
                                                    enabled: true,
                                                    distance: -50,
                                                    style: {
                                                        fontWeight: 'bold',
                                                        color: 'white',
                                                        fontSize:'20px'
                                                    }
                                                },
                                                startAngle: -90,
                                                endAngle: 90,
                                                center: ['50%', '75%'],
                                                size: '150%'
                                            }
                                        },
                                        series: [{
                                            type: 'pie',
                                            name: 'Parameter Piutang',
                                            innerSize: '50%',
                                            data: [
                                                ['BPP', 50],
                                                ['SDP2', 20],
                                                ['UP3', 30],
                                                
                                            ]
                                        }]
                                    });
                            break;
                            case 'agingPiutang' :
                                // Create the chart aging piutang
                                Highcharts.chart('chart-aging-piutang', {
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
                                        }
                                    },
                                    series: [
                                        {
                                            name: 'Institusi',
                                            colorByPoint: false,
                                            data: [
                                                {
                                                    name: 'FAK1',
                                                    y: 18,
                                                    drilldown: 'FAK1'
                                                },
                                                {
                                                    name: 'FAK2',
                                                    y: 10,
                                                    drilldown: 'FAK2'
                                                },
                                                {
                                                    name: 'FAK3',
                                                    y: 50,
                                                    drilldown: 'FAK3'
                                                },
                                                {
                                                    name: 'FAK4',
                                                    y: 20,
                                                    drilldown: 'FAK4'
                                                },
                                                {
                                                    name: 'FAK5',
                                                    y: 10,
                                                    drilldown: 'FAK5'
                                                }
                                            ]
                                            }
                                        ]
                                    });
                            break;
                            case 'piutangAjaran':
                                    
                                    //chart piutang ajaran//
                                    Highcharts.chart('chart-piutang-ajaran', {
                                        chart: {
                                            type: 'variablepie'
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        title: {
                                            text: ''
                                        },   
                                        tooltip: {
                                            headerFormat: '',
                                            pointFormat: '<span>\u25CF</span> <b> {point.name}</b><br/>' +
                                                'Area (square km): <b>{point.y}</b><br/>' +
                                                'Population density (people per square km): <b>{point.z}</b><br/>'
                                        },
                                        series: [{
                                            minPointSize: 10,
                                            innerSize: '20%',
                                            zMin: 0,
                                            name: 'countries',
                                            data: [{
                                                name: '2019',
                                                y: 505370,
                                                z: 92.9
                                            }, {
                                                name: '2018',
                                                y: 551500,
                                                z: 118.7
                                            }, {
                                                name: '2017',
                                                y: 312685,
                                                z: 124.6
                                            }, {
                                                name: '2016',
                                                y: 78867,
                                                z: 137.5
                                            }, {
                                                name: '2015',
                                                y: 301340,
                                                z: 201.8
                                            }, {
                                                name: '2014',
                                                y: 41277,
                                                z: 214.5
                                            }, {
                                                name: '>= 2013',
                                                y: 357022,
                                                z: 235.6
                                            }]
                                        }]
                                    });
                            break;
                            case 'detAju':
                            var html='';
                            for(var i=0;i<10;i++){
                                html+=`<tr>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                    <td>&nbsp;</td>
                                </tr>`;
                                }
                            $('#table-detAju tbody').html(html);
                            break;
                        }
                    }
                }
            });
        }
        function initDash(){
            ";
            switch($kunci){
                case "piutang":
            echo"
            loadService('piutangInstitusi','GET','$root_ser/dashTarbak.php?fx=getPeriode2');
            loadService('piutangParam','GET','$root_ser/dashTarbak.php?fx=getPeriode2');
            loadService('agingPiutang','GET','$root_ser/dashTarbak.php?fx=getPeriode2');
            loadService('piutangAjaran','GET','$root_ser/dashTarbak.php?fx=getPeriode2');";
                break;
                case "pengajuan":
            echo"            
            loadService('detAju','GET','$root_ser/dashTarbak.php?fx=getPeriode2');";
                break;
            }
            echo"
        }

        initDash();
    </script>"; //script navigasi

    
		return "";
	}
	
}
?>
