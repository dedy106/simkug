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
class server_report_saku3_dash_rptDashTelPiu extends server_report_basic
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
        $_SESSION['userLog'] = "12900029-5";
        $_SESSION['userPwd'] = "abdirahman";
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP']=$kode_pp;
        $root_ser = $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";
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

            .nav-tabs-custom2 {
                margin-bottom: 20px;
                background: #fff;
                margin-top:10px;
            }
            .nav-tabs-custom2 > .nav-tabs {
                margin: 0;
                border-bottom: 0 !important;
                text-align:center;
            }
            .nav-tabs-custom2 > .nav-tabs > li {
                
                float:none !important;
                display:inline-block !important;
                zoom:1;
                border-radius: 15px;
                border: 1px solid #8080802e;
                margin-left: 6px;
                margin-right: 6px;
                width:100px;
            }
            .nav-tabs-custom2 > .nav-tabs > li.disabled > a {
                color: #777;
            }
              
              .nav-tabs-custom2 > .nav-tabs > li > a {
                padding:6px !important; 
                color: black; 
                padding: 3px 20px !important; 
                width: 100px;
            }
            
            .nav-tabs-custom2 > .nav-tabs > li > a.text-muted {
                color: #999;
            }
            
            .nav-tabs-custom2 > .nav-tabs > li > a:hover {
                border:1px solid #247ed5; !important;
                border-radius:20px !important;
                background : #247ed5; !important;
                color:white !important;
                width: 100px;
            }
            
            .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:hover,
            .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:focus,
            .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:active {
                border-color: transparent;
            }
            
            .nav-tabs-custom2 > .nav-tabs > li.active {
                border-top-color: #247ed5;
            }
            
            .nav-tabs-custom2 > .nav-tabs > li.active > a,
            .nav-tabs-custom2 > .nav-tabs > li.active:hover > a {
                background-color: #fff;
                color: white;
                border:1px solid #247ed5; !important;
                border-radius:20px !important;
                background : #247ed5; !important;
                width: 100px;
            }
            
            /* NAV STACKED */
            .nav-stacked2{
                margin-top:10px;
                margin-right:10px;
            }
            .nav-stacked2 > li > a {
                border-radius: 0;
                border-top: 0;
                border-left: 3px solid transparent;
                color: #444;
            }
            .nav-stacked2 > li.active > a,
            .nav-stacked2 > li.active > a:hover {
                background: transparent;
                color: #444;
                border-top: 0;
                border-left-color: #3c8dbc;
            }
            .nav-stacked2 > li.header {
                border-bottom: 1px solid #ddd;
                color: #777;
                margin-bottom: 10px;
                padding: 5px 10px;
                text-transform: uppercase;
            }
            .badge-pad{
                padding: 5px 30px;
            }
            .bg-newgreen{
                background-color: #05c83a !important;
            }
            .info-box-text {
                text-transform: unset;
            }
            p{
                margin:5px auto;
            }
            .pd-5{
                padding:5px;
            }
        </style>
        <div class='panel' >
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
                <div class='row' style='padding-left: 10px;'>
                    <div class='col-md-3 '>
                        <div class='panel  box-wh''>
                            <div class='panel-body pd-5'>
                                <center><p class='font-weight-light' style='color: #d7d7d7;margin-bottom:0px'>Operation Ratio</p></center>
                                <center><h1 class='font-weight-bold' id='operation_ratio'></h1></center>
                                <center><p style='color: #808080;' id='ORLabel'></p></center>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3 '>
                        <div class='panel  box-wh''>
                            <div class='panel-body pd-5'>
                                <center><p class='font-weight-light' style='color: #d7d7d7;margin-bottom:0px'>Billing</hp></center>
                                <center><h1 class='font-weight-bold' id='billing'></h1></center>
                                <center><p style='color: #808080;' id='billLabel'></p></center>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3 '>
                        <div class='panel  box-wh''>
                            <div class='panel-body pd-5'>
                                <center><p class='font-weight-light' style='color: #d7d7d7;margin-bottom:0px'>Piutang</p></center>
                                <center><h1 class='font-weight-bold' id='totalPiu'></h1></center>
                                <center><p style='color: #808080;' id='piuLabel'></p></center>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-3 '>
                        <div class='panel  box-wh''>
                            <div class='panel-body pd-5'>
                                <center><p class='font-weight-light' style='color: #d7d7d7;margin-bottom:0px'>PYT</p></center>
                                <center><h1 class='font-weight-bold' id='pyt'></h1></center>
                                <center><p style='color: #808080;' id='pytLabel'></p></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-6 '>
                        <div class='box  box-wh' style='border:0'>
                            <a href='#' class='small-box-footer' style='color:black;cursor:pointer'>
                            <div class='box-header'>
                                <h3 class='box-title'>Pendapatan per Fakultas</h3>
                                <p style='color: #808080;' id='pdptFakLabel'></p>
                            </div>
                            </a>
                            <div class='box-body box-click'>
                                <div id='dash_chart_pdptFak'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 '>
                        <div class='box  box-wh' style='border:0'>
                            <a href='#' class='small-box-footer' style='color:black;cursor:pointer'>
                            <div class='box-header'>
                                <h3 class='box-title'>Saldo Piutang</h3>
                            </div>
                            </a>
                            <div class='box-body box-click'>
                                <div id='dash_chart_saldoPiu'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-6 '>
                        <div class='box  box-wh' style='border:0'>
                            <a href='#' class='small-box-footer' style='color:black;cursor:pointer'>
                            <div class='box-header'>
                                <h3 class='box-title'>Piutang per Parameter</h3>
                                <p style='color: #808080;' id='piuParamLabel'></p>
                            </div>
                            </a>
                            <div class='box-body box-click'>
                                <div id='dash_chart_piuParam'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 '>
                        <div class='box  box-wh' style='border:0'>
                            <a href='#' class='small-box-footer' style='color:black;cursor:pointer'>
                            <div class='box-header'>
                                <h3 class='box-title'>Piutang per Fakultas</h3>
                                <p style='color: #808080;' id='piuFakLabel'></p>
                            </div>
                            </a>
                            <div class='box-body box-click'>
                                <div id='dash_chart_fakultas'></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-md-6 '>
                        <div class='box  box-wh' style='border:0'>
                            <a href='#' class='small-box-footer' style='color:black;cursor:pointer'>
                            <div class='box-header'>
                                <h3 class='box-title'>Aging Piutang</h3>
                            </div>
                            </a>
                            <div class='box-body box-click'>
                                <div id='dash_chart_aging'></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script src='https://code.highcharts.com/modules/data.js'></script>
        <script src='https://code.highcharts.com/modules/drilldown.js'></script>
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
                    data: {'periode':'$periode','param':param},
                    success:function(result){    
                        if(result.status){
                            switch(index){
                                case 'totalPiu' :
                                    $('#totalPiu').text(toJuta(result.total));
                                    $('#piuLabel').text(result.label);
                                break;
                                case 'operationRasio' :
                                    $('#operation_ratio').text(sepNum(result.data.nilai)+'%');
                                    $('#ORLabel').text(result.label);
                                break;
                                case 'billing' :
                                    $('#billing').text(toMilyar(result.data.total));
                                    $('#billLabel').text(result.label);
                                break;
                                case 'pyt' :
                                    $('#pyt').text(toMilyar(result.data.total));
                                    $('#pytLabel').text(result.label);
                                break;
                                case 'agingPiu' :
                                //UMUR PIUTANG
                                Highcharts.chart('dash_chart_aging', {
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
                                case 'piuPerFakultas':
                                $('#piuFakLabel').text(result.label);
                                Highcharts.chart('dash_chart_fakultas', {
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
                                                format: '{point.name}: {point.y:.2f}'
                                            }
                                        }
                                    },
                                    credits: {
                                            enabled: false
                                        },
                            
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
                                    },
                            
                                    series: [
                                        {
                                            name: 'Piutang',
                                            colorByPoint: true,
                                            data: result.data
                                            
                                        }
                                    ],
                                    drilldown: {
                                        series:  result.series,
                                        drillUpButton :{
                                            relativeTo: 'spacingBox',
                                            position: {
                                                y: 0,
                                                x: 0
                                            },
                                            theme: {
                                                fill: '#00c0ef',
                                                'stroke-width': 1,
                                                stroke: '#00c0ef',
                                                r: 3,
                                                states: {
                                                    hover: {
                                                        fill: '#00acd6'
                                                    },
                                                    select: {
                                                        stroke: '#00acd6',
                                                        fill: '#00acd6'
                                                    }
                                                }
                                            }
                                        }
                            
                                    }
                                });
                                break;
                                case 'pdptFakultas':
                                $('#pdptFakLabel').text(result.label);
                                // Create the chart
                                Highcharts.chart('dash_chart_pdptFak', {
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
                                                format: '{point.name}: {point.percentage:.2f}%'
                                            }
                                        }
                                    },
                                    credits: {
                                            enabled: false
                                        },
                            
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.y:.2f}</b> of total<br/>'
                                    },
                            
                                    series: [
                                        {
                                            name: 'Pendapatan',
                                            colorByPoint: true,
                                            data: result.data
                                            
                                        }
                                    ],
                                    drilldown: {
                                        series:  result.series,
                                        drillUpButton :{
                                            relativeTo: 'spacingBox',
                                            position: {
                                                y: 0,
                                                x: 0
                                            },
                                            theme: {
                                                fill: '#00c0ef',
                                                'stroke-width': 1,
                                                stroke: '#00c0ef',
                                                r: 3,
                                                states: {
                                                    hover: {
                                                        fill: '#00acd6'
                                                    },
                                                    select: {
                                                        stroke: '#00acd6',
                                                        fill: '#00acd6'
                                                    }
                                                }
                                            }
                                        }
                            
                                    }
                                });
                                break;
                                case 'piuParam':
                                $('#piuParamLabel').text(result.label);
                                Highcharts.chart('dash_chart_piuParam', {
                                    chart: {
                                        plotBackgroundColor: null,
                                        plotBorderWidth: 0,
                                        plotShadow: false
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    title: {
                                        text: '',
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
                                                    color: 'white'
                                                }
                                            },
                                            startAngle: -90,
                                            endAngle: 90,
                                            center: ['50%', '70%'],
                                            size: '100%'
                                        }
                                    },
                                    series: [{
                                        type: 'pie',
                                        name: 'Piutang',
                                        innerSize: '50%',
                                        data: result.data
                                    }]
                                });
                                break;
                                case 'saldoPiu' :
                                //UMUR PIUTANG
                                Highcharts.chart('dash_chart_saldoPiu', {
                                    title: {
                                        text: ''
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    xAxis: {
                                        categories: result.ctg
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
                                        type: 'line',
                                        name: 'Piutang',
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
                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('operationRasio','GET','$root_ser/dashTelPiu.php?fx=getTotalOR');
                loadService('totalPiu','GET','$root_ser/dashTelPiu.php?fx=getTotalPiutang');
                loadService('billing','GET','$root_ser/dashTelPiu.php?fx=getBilling'); 
                loadService('pyt','GET','$root_ser/dashTelPiu.php?fx=getPYT');   
                loadService('pdptFakultas','GET','$root_ser/dashTelPiu.php?fx=getPdptFakultas');            loadService('piuParam','GET','$root_ser/dashTelPiu.php?fx=getPiuParam');
                loadService('piuPerFakultas','GET','$root_ser/dashTelPiu.php?fx=getPiuFakultas');
                loadService('agingPiu','GET','$root_ser/dashTelPiu.php?fx=getAgingPiutang');
                loadService('saldoPiu','GET','$root_ser/dashTelPiu.php?fx=getPiuTahunAka');
                
                  
            }

            initDash();
            </script>

        ";
        

		return "";
	}
	
}
?>
