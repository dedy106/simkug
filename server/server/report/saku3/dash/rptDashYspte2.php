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
class server_report_saku3_dash_rptDashYspte2 extends server_report_basic
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

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);

        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        $root_ser = $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
        echo "
        <style>
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
        </style>
		<div class='panel' style='background:#f6f6f6'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard<div class='navbar-custom-menu pull-right padding:0px'>
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
                    ";
        
                echo"
                    <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:5px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </li>
                    <li>
                        <a href='#' data-toggle='control-sidebar' id='open-sidebar' class='btn btn-info btn-sm' style='margin-right:0px;padding:2px 5px 0px 5px'><i class='fa fa-filter'></i><span style='font-family:sans-serif'> <b> Filter</b></span></a>
                    </li>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>";
        echo   "<div class='row'>
                    <div class='col-md-8'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Profit and Loss</h3>
                            </div>
                            <div class='box-body box-click' id='box-keu'>
                                <div id='dash_chart_keu' style='min-height:500px'></div>
                            </div>
                        </div>
                    </div>
                    
                    <div class='col-md-4'>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|bk');\">
                        <div class='box' style='box-shadow:none;border:0;border-radius:10px'>
                            <div class='box-header'>
                                <i class='fa fa-balance-scale'> </i>
                                <h3 class='box-title'>Today's Cash & Bank Balance</h3>
                                <h4 id='kas_balance' class='pull-right' style=''></h4>
                            </div>
                            <div class='box-body pad'>
                                <table class='table no-border' id='daftarKas'>
                                </table>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div class='col-md-4' id='PBS'>
                    </div>
                    <div class='col-md-2'>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|piu');\">
                        <div class='small-box bg-red' style='border:1px solid white;color:black !important;background-color:white !important;border-radius:10px;'>
                            <div class='inner'>
                                <center>
                                    <p> Saldo Piutang </p>
                                    <h3 id='saldoPiu' style='font-size:25px'></h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'></p>
                                </center>
                            </div>
                        </div>
                        </a>
                    </div>
                    <div class='col-md-2'>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|pdd');\" >
                        <div class='small-box bg-red' style='border:1px solid white;color:black !important;background-color:white !important;border-radius:10px;'>
                            <div class='inner'>
                                <center>
                                    <p> Saldo PDD </p>
                                    <h3 id='saldoPDD' style='font-size:25px'></h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'></p>
                                </center>
                            </div>
                        </div>
                        </a>
                    </div>
                </div>

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
                
                echo"
                <div class='row'>
                    <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|agg');\">
                    <div class='col-md-6'>
                        <div class='box' style='box-shadow:none;border: 1px solid white;
                        border-radius: 10px;'>
                            <div class='box-header'>
                                <i class='fa fa-line-chart'> </i>
                                <h3 class='box-title'>Anggaran dan Realisasi</h3>
                            </div>
                            <div class='box-body pad'>
                                <div class='col-md-2' style='padding-right:0px'>
                                    Pendapatan
                                </div>
                                <div class='col-md-10' style='padding-right:0px'>
                                    <div id='dash_chart_agg'></div>
                                </div>
                                <div class='col-md-2' style='padding-right:0px'>
                                    Beban
                                </div>
                                <div class='col-md-10' style='padding-right:0px'>
                                    <div id='dash_chart_agg2'></div>
                                </div>
                                <div class='col-md-2' style='padding-right:0px'>
                                    SHU
                                </div>
                                <div class='col-md-10' style='padding-right:0px'>
                                    <div id='dash_chart_agg3'></div>
                                </div>";
                                echo"
                            </div>
                        </div>
                    </div>
                    </a>
                    <div class='col-md-2'>
                        <div class='small-box bg-red' style='border:1px solid white;color:black !important;background-color:white !important;border-radius:10px;'>
                            <div class='inner' id='OR'>
                            </div>
                        </div>
                        <br>
                        <div class='small-box bg-red' style='border:1px solid white;color:black !important;background-color:white !important;border-radius:10px;'>
                            <div class='inner'>
                                <center>
                                    <p>Collection Ratio</p>
                                    <h3 id='CR' style='font-size:25px'></h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>Year to Date</p>
                                </center>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                            <div class='box' style='box-shadow:none;border:1px solid white;border-radius:10px;'>
                                <div class='box-header'>
                                    <i class='fa fa-bar-chart' style='vertical-align: top;'></i>
                                    <h3 class='box-title' style='font-size:16px'>Pembayaran Piutang</h3>
                                    <div class='col-xs-6 pull-right'>
                                    <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>";
                                    
                                    echo"
                                    <select class='form-control input-sm selectize' id='dash-per' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                    <option value=''>Pilih Periode</option>
                                     </select>
                                    </div>
                                </div>
                                <div class='box-body box-click'>
                                    <div class='col-md-12'>
                                        <div class='progress-group' style='position: relative;margin-top: 5px;'>
                                            <div class='progress sm' style='background-color: #beb3b3;'>
                                                <div class='progress-bar progress-bar-blue' id='piuPersen' ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-md-12'>
                                        <span style='font-size:20px' id='piuPersen2'></span>
                                        <span style='position: relative;' class=' pull-right' id='toByrBill'></span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|piu');\">
                        <div class='col-md-2'>
                            <div class='small-box bg-red' style='border:1px solid white;color:black !important;background-color:white !important;border-radius:10px'>
                                <div class='inner'>
                                <center>
                                <p>Siswa Menunggak</p>
                                <h3 id='siswaTung' style='font-size:25px'></h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0' id='fromto'></p>
                                </center>
                                </div>
                            </div>
                        </div>
                        </a>
                        <div class='col-md-2'>
                            <div class='small-box bg-red' style='border:1px solid white;color:black !important;background-color:white !important;border-radius:10px'>
                                <div class='inner'>
                                <center>
                                <p>Siswa Aktif</p>
                                <h3 id='siswaAktif' style='font-size:25px'></h3>
                                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>&nbsp;Total Siswa</p>
                                </center>
                                </div>
                            </div>
                        </div>   
                </div>
                <div class='row'>
                    <div class='col-md-6'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Aging Piutang</h3>
                            </div>
                            <div class='box-body box-click' id='box-umur'>
                                <div id='dash_chart_umur'></div>
                            </div>
                        </div>
                    </div>
                    <!-- <div class='col-md-6'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Piutang Siswa</h3>
                            </div>
                            <div class='box-body box-click' id='box-piu'>
                                <div id='dash_chart_piu'></div>
                            </div>
                        </div>
                    </div>-->    
                </div>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-header'>
                                <i class='fa fa-bar-chart'></i>
                                <h3 class='box-title'>Grafik CCR</h3>
                            </div>
                            <div class='box-body box-click' id='box-piu-ccr'>
                                <div id='dash_chart_piu_ccr'></div>
                            </div>
                        </div>
                    </div>
                </div> ";

            echo"
            </div>
        </div>";

        echo 
        "<script>
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

        function ubah_periode(periode)
        {
            var per = periode;
            var bulan=per.substr(4,2);
            var tahun=per.substr(0,4);
            var tmp='';
            switch (bulan) 
            {
                case '01':
                    tmp='Januari';
                break;
                case '02':
                    tmp='Februari';
                break;
                case '03':
                    tmp='Maret';
                break;
                case '04':
                    tmp='April';
                break;
                case '05':
                    tmp='Mei';
                break;
                case '06':
                    tmp='Juni';
                break;
                case '07':
                    tmp='Juli';
                break;
                    case '08':
                tmp='Agustus';
                break;  
                    case '09':
                tmp='September';
                break;  
                    case '10':
                tmp='Oktober';
                break;  
                    case '11':
                tmp='November';
                break;  
                    case '12':
                tmp='Desember';
                break;  
                    case '13':
                tmp='Desember 2';
                break;    
                    case '14':
                tmp='Desember 3';	      
                break;    
                    case '15':
                tmp='Desember 4';	      
                break;    
                    case '16':
                tmp='Desember 5';	      
                break;    
            }
            return tmp+' '+tahun;
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
                            case 'kas' :
                                $('#kas_balance').text(sepNumPas(result.data.nilai));
                            break;
                            case 'daftarKas' :
                                var html='';
                                for(var i=0;i<result.data.length;i++){
                                    html += `
                                    <tr>
                                        <td>`+result.data[i].nama+`</td>
                                        <td style='text-align:right'>`+sepNumPas(result.data[i].so_akhir)+`</td>
                                    </tr>`;
                                }
                                $('#daftarKas').append(html);

                            break;
                            case 'profitLoss' :
                                // //PROFIT && LOSS
                                Highcharts.chart('dash_chart_keu', {
                                    title: {
                                        text: ''
                                    },
                                    xAxis: {
                                        categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                                    },
                                    credits: {
                                        enabled: false
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
                                        data: result.data[0],
                                        color:'#0e9aa7',
                                        tooltip: {
                                            valueSuffix: ' jt'
                                        }
                                    }, {
                                        type: 'line',
                                        name: 'Expense',
                                        color:'#ff6f69',
                                        data: result.data[1],
                                        tooltip: {
                                            valueSuffix: ' jt'
                                        }
                                    },{
                                        type: 'line',
                                        name: 'Net Income',
                                        color:'#fa9c0a',
                                        data: result.data[2],
                                        tooltip: {
                                            valueSuffix: ' jt'
                                        }
                                    }]
                                });
                    
                            break;
                            case 'PBS' :
                                var html='';
                                for(var i=0;i<result.data.length;i++){
                                    html += `
                                        <div class='col-md-4' style='padding: 5px'>
                                       
                                        <div class='small-box bg-red' style='border:1px solid white;color:black !important;background-color:white !important;border-radius:10px;'>
                                            <div class='inner'>
                                                <center>
                                                    <p style='font-size: 13px;'>`+result.data[i].nama+`</p>
                                                    <h5 id='home_kas_box' ><b>`+sepNumPas(result.data[i].nilai)+`</b></h5>
                                                    <p style='font-size: 9px;margin-bottom: 0px;color:#bab0b0'>Closing Balance</p>
                                                </center>
                                            </div>
                                        </div>
                                        </div>`;
                                    
                                }
                                $('#PBS').html(html);

                            break;
                            case 'saldoPiu' :
                                $('#saldoPiu').text(sepNumPas(result.data.sak_total));
                            break;
                            case 'saldoPDD' :
                                $('#saldoPDD').text(sepNumPas(result.data.so_akhir));
                            break;
                            case 'aggreal' :
                            
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
                                            y: parseFloat(result.agg.n1),
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
                                            y: parseFloat(result.agg2.n1),
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
                                            y: parseFloat(result.agg3.n1),
                                            target: 100
                                        }]
                                    }],
                                    tooltip: {
                                        pointFormat: '<b>{point.y}</b> (with target at {point.target})%'
                                    }
                                });
                            break;
                            case 'OR':
                                $('#OR').html(result.data);
                            break;
                            case 'CR':
                                $('#CR').html(sepNum(result.data.nil_cr)+'%');
                            break;
                            case 'getPeriode':
                                var per ='';
                                for(var i=0;i<result.data.length;i++){
                                    
                                    $('#dash-per')[0].selectize.addOption([{text:ubah_periode(result.data[i].periode), value:result.data[i].periode}]);
                                    per +=result.data[i].periode;
                                }  
                            break;
                            case 'pbyrPiu':
                                $('#piuPersen').css('width',result.data.cr+'%');
                                $('#piuPersen2').text(sepNum(result.data.cr)+'%');
                                $('#toByrBill').text(sepNumPas(result.data.tot_byr)+'/'+sepNumPas(result.data.tot_bill));
                            break;
                            case 'siswaTung':
                                $('#siswaTung').text(sepNum(result.persen)+'%');
                                $('#fromto').text(sepNumPas(result.rsjum.jum)+' dari '+sepNumPas(result.rstot.jum)+' siswa');
                            break;
                            case 'siswaAktif':
                                $('#siswaAktif').text(sepNumPas(result.total));
                            break;
                            case 'agingChart':
                            //UMUR PIUTANG
                            Highcharts.chart('dash_chart_umur', {
                                title: {
                                    text: ''
                                },
                                credits: {
                                    enabled: false
                                },
                                xAxis: {
                                    categories: ['< 6 bulan','< 12 bulan','< 24 bulan',' > 24 bulan']
                                },
                                yAxis: [{ // Primary yAxis
                                    labels: {
                                        format: '{value}',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    },
                        
                                    title: {
                                        text: 'Nilai (dalam jutaan)',
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
                                
                                series: [{
                                    type: 'column',
                                    name: 'Piutang Siswa',
                                    data: result.data,
                                    color:'#fa9c0a',
                                    tooltip: {
                                        formatter: function() {
                                            return Highcharts.numberFormat(this.value, 2, ',', '.')
                                        },
                                        shared: true
                                    },
                                    
                                }]
                            });
                            break;
                            // case 'piutangChart':
                            
                    
                            // Highcharts.chart('dash_chart_piu', {
                            //     title: {
                            //         text: ''
                            //     },
                            //     credits: {
                            //         enabled: false
                            //     },
                            //     xAxis: {
                            //         categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                            //     },
                            //     yAxis: [{ // Primary yAxis
                            //         labels: {
                            //             format: '{value}',
                            //             style: {
                            //                 color: Highcharts.getOptions().colors[1]
                            //             }
                            //         },
                            //         title: {
                            //             text: 'Nilai',
                            //             style: {
                            //                 color: Highcharts.getOptions().colors[1]
                            //             }
                            //         }
                            //     }, { // Secondary yAxis
                            //         title: {
                            //             text: 'Rasio',
                            //             style: {
                            //                 color: Highcharts.getOptions().colors[0]
                            //             }
                            //         },
                            //         labels: {
                            //             format: '{value} %',
                            //             style: {
                            //                 color: Highcharts.getOptions().colors[0]
                            //             }
                            //         },
                            //         opposite: true
                            //     }],
                            //     labels: {
                            //         items: [{
                            //             html: '',
                            //             style: {
                            //                 left: '50px',
                            //                 top: '18px',
                            //                 color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                            //             }
                            //         }]
                            //     },
                            //     tooltip: {
                            //         shared: true
                            //     },
                            //     series: [{
                            //         type: 'column',
                            //         name: 'Tagihan',
                            //         data: result.data[0],
                            //         color:'#0e9aa7',
                            //         tooltip: {
                            //             valuePrefix: ' '
                            //         }
                            //     }, {
                            //         type: 'column',
                            //         name: 'Pembayaran',
                            //         color:'#ff6f69',
                            //         data: result.data[1],
                            //         tooltip: {
                            //             valuePrefix: ' '
                            //         }
                            //     },{
                            //         type: 'spline',
                            //         name: 'Collection Rasio',
                            //         data: result.data[2],
                            //         yAxis:1,
                            //         marker: {
                            //             lineWidth: 2,
                            //             lineColor: Highcharts.getOptions().colors[3],
                            //             fillColor: 'white'
                            //         },
                            //         tooltip: {
                            //             valueSuffix: ' %'
                            //         }
                                
                            //     }]
                            // }); 
                            // break;
                            case 'piutangChartCCR':
                            
                    
                                Highcharts.chart('dash_chart_piu_ccr', {
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
                                            format: '{value}',
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
                                        name: 'Tagihan',
                                        data: result.data[0],
                                        color:'#0e9aa7',
                                        tooltip: {
                                            valuePrefix: ' '
                                        }
                                    }, {
                                        type: 'column',
                                        name: 'Pembayaran',
                                        color:'#ff6f69',
                                        data: result.data[1],
                                        tooltip: {
                                            valuePrefix: ' '
                                        }
                                    },{
                                        type: 'spline',
                                        name: 'Collection Rasio',
                                        data: result.data[2],
                                        yAxis:1,
                                        marker: {
                                            lineWidth: 2,
                                            lineColor: Highcharts.getOptions().colors[3],
                                            fillColor: 'white'
                                        },
                                        tooltip: {
                                            valueSuffix: ' %'
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
            loadService('kas','GET','$root_ser/dashSekolah.php?fx=getTotalBalance');
            loadService('daftarKas','GET','$root_ser/dashSekolah.php?fx=getDaftarKas');
            loadService('profitLoss','GET','$root_ser/dashSekolah.php?fx=getProfitLoss',1000000);
            loadService('PBS','GET','$root_ser/dashSekolah.php?fx=getPBS');
            loadService('saldoPiu','GET','$root_ser/dashSekolah.php?fx=getSaldoPiu');
            loadService('saldoPDD','GET','$root_ser/dashSekolah.php?fx=getSaldoPDD');
            loadService('aggreal','GET','$root_ser/dashSekolah.php?fx=getAggReal');
            loadService('OR','GET','$root_ser/dashSekolah.php?fx=getOR');
            loadService('CR','GET','$root_ser/dashSekolah.php?fx=getCR');
            loadService('getPeriode','GET','$root_ser/dashSekolah.php?fx=getPer');
            loadService('pbyrPiu','GET','$root_ser/dashSekolah.php?fx=getPbyrPiu',$periode);
            loadService('siswaTung','GET','$root_ser/dashSekolah.php?fx=getJmlSiswaMenunggak');
            loadService('siswaAktif','GET','$root_ser/dashSekolah.php?fx=getJmlSiswaAktif');
            loadService('agingChart','GET','$root_ser/dashSekolah.php?fx=getAgingPiutang',1000000);
            // loadService('piutangChart','GET','$root_ser/dashSekolah.php?fx=getPiutang',1000000);
            loadService('piutangChartCCR','GET','$root_ser/dashSekolah.php?fx=getPiutangCCR',1000000);
            
        }

        initDash();

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('.panel').on('click', '#open-sidebar', function(){
            
            if($('aside').hasClass('control-sidebar-open')){
                 $('aside').removeClass('control-sidebar-open');
            }else{
                 $('aside').addClass('control-sidebar-open');
            }
        });


        $('#control-sidebar-home-tab').on('click','#dash_refresh', function(){
            var kode_pp = $('#dash_lok').val();
            var periode = $('#dash_periode').val();
            // alert(lokasi);
            if (kode_pp == '' && periode ==''){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
            }else{
                if(kode_pp == '' && periode != '' ){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/'+periode+'/$kode_pp/$nik/$kode_fs');  
                }else if(kode_pp != '' && periode == ''){
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/$periode/'+kode_pp+'/$nik/$kode_fs');
                }else{
                    window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte','','$kode_lokasi/'+periode+'/'+kode_pp+'/$nik/$kode_fs');
                }
            } 
           
        });

        $('#dash-per').change(function(){
            var per =$('#dash-per').val();
            loadService('pbyrPiu','GET','$root_ser/dashSekolah.php?fx=getPbyrPiu',per);
        });
        </script>";
    
		return "";
	}
	
}
?>
