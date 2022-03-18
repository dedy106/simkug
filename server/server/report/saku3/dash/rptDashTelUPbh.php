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
class server_report_saku3_dash_rptDashTelUPbh extends server_report_basic
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
        $_SESSION['userLog'] = "14781507-1";
        $_SESSION['userPwd'] = "14781507-1";
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
                    <div class='col-md-7' style='padding-left: 0px;padding-right: 0px;'>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|piu');\">
                        <div class='col-md-6 pad-more'>
                            <div class='panel mar-mor box-wh' >
                                <div class='card'>
                                    <div class='card-body'>
                                        <center><h3 class='font-weight-light' style='color: #000000;margin-bottom:0px' >Piutang</h3></center>
                                        <center><h2 class='font-weight-bold' id='totPiu'></h2></center>
                                        <center><p style='color: #808080;'>&nbsp;</p></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                        <div class='col-md-6 pad-more'>
                            <div class='panel mar-mor box-wh''>
                                <div class='card'>
                                    <div class='card-body'>
                                        <center><h3 class='font-weight-light' style='color: #000000;margin-bottom:0px'>Mahasiswa Menunggak</h3></center>
                                        <center><h2 class='font-weight-bold' id='siswaTung'></h2></center>
                                        <center><p style='color: #808080;' id='fromto'></p></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12 pad-more'>
                            <div class='box mar-mor box-wh' style='border:0'>
                                <a href='#' class='small-box-footer' style='color:black;cursor:pointer'>
                                    <div class='box-header'>
                                    <h3 class='box-title'>Aging Piutang Siswa</h3>
                                </div>
                                </a>
                                <div class='box-body box-click'>
                                    <div id='dash_chart_aging'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <style>
                    .test + .tooltip > .tooltip-inner {
                        width:250px;
                    }
                    </style>
                    <div class='col-md-5' style='padding-left: 0px;padding-right: 0px;'>
                        <div class='col-md-12 pad-more'>
                            <div class='box mar-mor box-wh' style='border:0'>
                                <div class='box-body'>
                                    <div class='col-md-12' style='padding-right:0px'>
                                        <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;position: absolute;'>Pendapatan</h3>
                                        <span id='labelPend' class='pull-right' style='font-size:25px;font-weight:bold;position: relative;'></span>
                                        <br>
                                        <h5 style='font-size:10px;color:#808080;'>Budget Vs Actual</h5>
                                        
                                    </div>
                                    <div class='col-md-12'>
                                        <div class='progress-group' style='position: relative;margin-top: 5px;'>
                                            <div class='progress sm' style='background-color: #beb3b3;height:20px;margin-bottom:5px'>
                                                <div class='progress-bar progress-bar-blue' id='pendPersen'  ></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-md-12'>
                                        <span style='font-size:10px;color:#808080' id='piuPersen2'>Tahun Berjalan</span>
                                    </div>
                                </div>
                                <div class='box-body'>
                                    <div class='col-md-12' style='padding-right:0px'>
                                        <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;position: absolute;'>Beban</h3>
                                        <span id='labelBeban' class='pull-right' style='font-size:25px;font-weight:bold;position: relative;'></span>
                                        <br>
                                        <h5 style='font-size:10px;color:#808080;'>Budget Vs Actual</h5>
                                        
                                    </div>
                                    <div class='col-md-12'>
                                        <div class='progress-group' style='position: relative;margin-top: 5px;'>
                                            <div class='progress sm' style='background-color: #beb3b3;height:20px;margin-bottom:5px'>
                                                <div class='progress-bar progress-bar-blue' id='bebanPersen'></div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class='col-md-12'>
                                        <span style='font-size:10px;color:#808080' id='piuPersen2'>Tahun Berjalan</span>
                                    </div>
                                </div>
                                <div class='box-body'>
                                    <div class='col-md-12' style='padding-right:0px'>
                                        <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;'>Profif and Loss</h3>
                                        <div id='labelLaba'></div>
                                    </div>
                                    <div class='col-md-12'>
                                        <div id='dash_chart_profit'></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>    
                <div class='row' style='padding-left: 10px;'>
                    <div class='col-md-7' style='padding-left: 0px;padding-right: 0px;'>
                        <div class='col-md-12 pad-more'>
                            <div class='panel mar-mor box-wh'>
                                <div class='card' style='margin-bottom: 3.5rem;'>
                                    <div class='card-body'>
                                        <div class='nav-tabs-custom2'>
                                            <ul class='nav nav-tabs'>
                                                <li class='active'><a data-toggle='tab' href='#home'>Beban</a></li>
                                                <li><a data-toggle='tab' href='#menu1'>Panjar</a></li>
                                                <li><a data-toggle='tab' href='#menu2'>Honor</a></li>
                                                <li><a data-toggle='tab' href='#menu2'>IF</a></li>
                                            </ul>
                                            <div class='tab-content' style='padding-left:10px'>
                                                <div id='home' class='tab-pane fade in active'>
                                                    <ul class = 'nav nav-stacked2' >
                                                        <li><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|aju');\">Pengajuan<span class='pull-right badge badge-pad  bg-newgreen' id='ajuBeban'></span></a></li>
                                                        <li><a href='#'>Penyerahan Dokumen<span class='pull-right badge badge-pad bg-newgreen' id='serahDokBeban'></span></a></li>
                                                        <li><a href='#'>Verifikasi Dokumen<span class='pull-right badge badge-pad  bg-newgreen' id='verDokBeban'></span></a></li>
                                                        <li><a href='#'>Verifikasi Akun<span class='pull-right badge badge-pad  bg-newgreen' id='verAkBeban'></span></a></li>
                                                        <li><a href='#'>SPB<span class='pull-right badge badge-pad  bg-newgreen' id='sPBBeban'></span></a></li>
                                                        <li><a href='#'>Pembayaran<span class='pull-right badge badge-pad bg-newgreen' id='PbyrBeban'></span></a></li>
                                                    </ul>
                                                </div>
                                                <div id='menu1' class='tab-pane fade'>
                                                    <ul class = 'nav nav-stacked2' >
                                                        <li><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|aju');\">Pengajuan<span class='pull-right badge badge-pad  bg-newgreen' id='ajuPanjar'></span></a></li>
                                                        <li><a href='#'>Penyerahan Dokumen<span class='pull-right badge badge-pad bg-newgreen' id='serahDokPanjar'></span></a></li>
                                                        <li><a href='#'>Verifikasi Dokumen<span class='pull-right badge badge-pad  bg-newgreen' id='verDokPanjar'></span></a></li>
                                                        <li><a href='#'>Verifikasi Akun<span class='pull-right badge badge-pad  bg-newgreen' id='verAkPanjar'></span></a></li>
                                                        <li><a href='#'>SPB<span class='pull-right badge badge-pad  bg-newgreen' id='sPBPanjar'></span></a></li>
                                                        <li><a href='#'>Pembayaran<span class='pull-right badge badge-pad bg-newgreen' id='PbyrPanjar'></span></a></li>
                                                    </ul>
                                                </div>
                                                <div id='menu2' class='tab-pane fade'>
                                                    <ul class = 'nav nav-stacked2' >
                                                        <li><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|aju');\">Pengajuan<span class='pull-right badge badge-pad  bg-newgreen' id='ajuHonor'></span></a></li>
                                                        <li><a href='#'>Penyerahan Dokumen<span class='pull-right badge badge-pad bg-newgreen' id='serahDokHonor'></span></a></li>
                                                        <li><a href='#'>Verifikasi Dokumen<span class='pull-right badge badge-pad  bg-newgreen' id='verDokHonor'></span></a></li>
                                                        <li><a href='#'>Verifikasi Akun<span class='pull-right badge badge-pad  bg-newgreen' id='verAkHonor'></span></a></li>
                                                        <li><a href='#'>SPB<span class='pull-right badge badge-pad  bg-newgreen' id='sPBHonor'></span></a></li>
                                                        <li><a href='#'>Pembayaran<span class='pull-right badge badge-pad bg-newgreen' id='PbyrHonor'></span></a></li>
                                                    </ul>
                                                </div>
                                                <div id='menu3' class='tab-pane fade'>
                                                    <ul class = 'nav nav-stacked2' >
                                                        <li><a href='#' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|aju');\">Pengajuan<span class='pull-right badge badge-pad  bg-newgreen' id='ajuIF'></span></a></li>
                                                        <li><a href='#'>Penyerahan Dokumen<span class='pull-right badge badge-pad bg-newgreen' id='serahDokIF'></span></a></li>
                                                        <li><a href='#'>Verifikasi Dokumen<span class='pull-right badge badge-pad  bg-newgreen' id='verDokIF'></span></a></li>
                                                        <li><a href='#'>Verifikasi Akun<span class='pull-right badge badge-pad  bg-newgreen' id='verAkIF'></span></a></li>
                                                        <li><a href='#'>SPB<span class='pull-right badge badge-pad  bg-newgreen' id='sPBIF'></span></a></li>
                                                        <li><a href='#'>Pembayaran<span class='pull-right badge badge-pad bg-newgreen' id='PbyrIF'></span></a></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-5' style='padding-left: 0px;padding-right: 0px;'>
                        <div class='col-md-12 pad-more'>
                            <div class='panel mar-mor box-wh'>
                                <div class='card' style='margin-bottom: 3.5rem;'>
                                    <div class='panel-body'>
                                        <h4 class='font-weight-bold text-left' style='font-weight: bold; padding-left: 1rem;'>Info Pembendaharaan</h4>
                                        <hr/>
                                        <div id='info'>
                                        </div>                              
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </row>
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
                                case 'totPiu':
                                    $('#totPiu').text(toJuta(result.data.n4));
                                break;
                                case 'mhsTunggak':
                                    $('#siswaTung').text(sepNum(result.persen)+'%');
                                    $('#fromto').text(sepNumPas(result.rsjum.jum)+' dari '+sepNumPas(result.rstot.jum)+' siswa');
                                break;
                                case 'agingPiutang' :
                                    Highcharts.chart('dash_chart_aging', {
                                        chart: {
                                            height: (10 / 16 * 100) + '%' // 16:11 ratio
                                        },
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
                                case 'profitLoss':
                                // //PROFIT && LOSS
                                Highcharts.chart('dash_chart_profit', {
                                    chart: {
                                        height: (11 / 16 * 100) + '%' // 16:11 ratio
                                    },
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
                                case 'budgetActBulan' :
                                    $('#labelPend').html(result.persenPend+'% <br><h5 style=\'font-size:10px;color:#808080;margin: 0px;\'>Bulan Berjalan</h5>');
                                    
                                    $('#labelBeban').html(result.persenBeban+'% <br><h5 style=\'font-size:10px;color:#808080;margin: 0px;\'>Bulan Berjalan</h5>');
                                    break;
                                case 'budgetActTahun' :
                                    $('#pendPersen').css('width',result.persenPend+'%');
                                    
                                    $('#bebanPersen').css('width',result.persenBeban+'%');
                                    break;
                                case 'progressBeban' :
                                    $('#ajuBeban').text(result.aju);
                                    $('#serahDokBeban').text(result.serahDok);
                                    $('#verDokBeban').text(result.verDok);
                                    $('#verAkBeban').text(result.verAk);
                                    $('#sPBBeban').text(result.sPB);
                                    $('#PbyrBeban').text(result.Pbyr);
                                break;
                                case 'progressPanjar' :
                                    $('#ajuPanjar').text(result.aju);
                                    $('#serahDokPanjar').text(result.serahDok);
                                    $('#verDokPanjar').text(result.verDok);
                                    $('#verAkPanjar').text(result.verAk);
                                    $('#sPBPanjar').text(result.sPB);
                                    $('#PbyrPanjar').text(result.Pbyr);
                                break;
                                case 'progressHonor' :
                                    $('#ajuHonor').text(result.aju);
                                    $('#serahDokHonor').text(result.serahDok);
                                    $('#verDokHonor').text(result.verDok);
                                    $('#verAkHonor').text(result.verAk);
                                    $('#sPBHonor').text(result.sPB);
                                    $('#PbyrHonor').text(result.Pbyr);
                                break;
                                case 'progressIF' :
                                    $('#ajuIF').text(result.aju);
                                    $('#serahDokIF').text(result.serahDok);
                                    $('#verDokIF').text(result.verDok);
                                    $('#verAkIF').text(result.verAk);
                                    $('#sPBIF').text(result.sPB);
                                    $('#PbyrIF').text(result.Pbyr);
                                break;
                                case 'info':
                                var html = '';
                                for (var i=0;i<result.info.length;i++){
                                    if(result.info[i].status == '1'){
                                        html +=`
                                        <a style='cursor:pointer;color:black' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|detTrans');\">
                                            <div class='info-box' style='min-height: 70px;box-shadow: none;'>
                                                <span class='info-box-icon bg-aqua' style='border-radius: 10px;height: 70px;box-shadow: none;'><span style=''><h6 style='margin-bottom: 0px;'>`+result.info[i].tgl.substr(3,7)+`</h6><h3 style='font-size: 32px !important;margin-top: 0px;'>`+result.info[i].tgl.substr(0,2)+`</h3></span></span>
                                                <div class='info-box-content' style='padding-left: 30px;border: 1px solid #ececec;border-left: none;border-top-right-radius: 10px;border-bottom-right-radius: 10px;'>
                                                    <span class='info-box-text'>`+result.info[i].no_bukti+`</span>
                                                    <span class='info-box-text'>`+result.info[i].jenis+`</span>
                                                    <span class='info-box-text'>`+result.info[i].va+`</span>
                                                </div>
                                            </div> 
                                        </a>`;
                                    }else{
                                        html +=`
                                        <a style='cursor:pointer;color:black' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashTelUPbhDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|detTrans');\">
                                            <div class='info-box' style='min-height: 70px;box-shadow: none;'>
                                                <span class='info-box-icon bg-red' style='border-radius: 10px;height: 70px;box-shadow: none;'><span style=''><h6 style='margin-bottom: 0px;'>`+result.info[i].tgl.substr(3,7)+`</h6><h3 style='font-size: 32px !important;margin-top: 0px;'>`+result.info[i].tgl.substr(0,2)+`</h3></span></span>
                                                <div class='info-box-content' style='padding-left: 30px;border: 1px solid #ececec;border-left: none;border-top-right-radius: 10px;border-bottom-right-radius: 10px;'>
                                                    <span class='info-box-text'>`+result.info[i].no_bukti+`</span>
                                                    <span class='info-box-text'>`+result.info[i].jenis+` `+result.info[i].va+`</span>
                                                    <span class='info-box-text' style='color:red'><i class='fa fa-exclamation-circle '></i>`+result.info[i].catatan+`</span>
                                                </div>
                                            </div> 
                                        </a>`;
                                    }
                                    $('#info').html(html);
                                    
                                }
                                break;
                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('totPiu','GET','$root_ser/dashTelUPbh.php?fx=getTotalPiu');            
                loadService('agingPiutang','GET','$root_ser/dashTelUPbh.php?fx=getAgingPiutang');
                loadService('mhsTunggak','GET','$root_ser/dashTelUPbh.php?fx=getJmlSiswaMenunggak');
                loadService('profitLoss','GET','$root_ser/dashTelUPbh.php?fx=getProfitLossPP',1000000);
                loadService('budgetActBulan','GET','$root_ser/dashTelUPbh.php?fx=getBudgetActualBulan');
                loadService('budgetActTahun','GET','$root_ser/dashTelUPbh.php?fx=getBudgetActualTahun');
                loadService('progressBeban','GET','$root_ser/dashTelUPbh.php?fx=getProgressBeban');
                loadService('progressPanjar','GET','$root_ser/dashTelUPbh.php?fx=getProgressPanjar');
                loadService('progressHonor','GET','$root_ser/dashTelUPbh.php?fx=getProgressHonor');
                loadService('progressIF','GET','$root_ser/dashTelUPbh.php?fx=getProgressIF');
                loadService('info','GET','$root_ser/dashTelUPbh.php?fx=getInfoPBH');
            }

            initDash();
            </script>

        ";
        

		return "";
	}
	
}
?>
