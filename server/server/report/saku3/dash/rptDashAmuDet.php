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
class server_report_saku3_dash_rptDashAmuDet extends server_report_basic
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

        $path = $_SERVER['REQUEST_SCHEME']."://".$_SERVER["SERVER_NAME"]."/";	
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";
        
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        $root_ser = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/web/server/amu";

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
        <div class='panel-body'>
		<div class='row' style='margin-bottom:10px;padding-right: 15px;'>
            <div class='pull-right navigasi' style='padding-bottom: 1rem;'>
                <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                <span id='refresh_btn'style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
            </div>
        </div>";
        switch($kunci) {
            case "tanah" :
        echo"
        <div class='row'>
                <div class='col-md-3'>
                    <div class='panel'>
                        <div class='card'>
                            <div class='card-body'>
                                <center><h4 class='font-weight-light' style='color: #000000;'>Total Tanah</h4></center>
                                <center><h2 class='font-weight-bold' id='total_tanah'></h2></center>
                                <center><p style='color: #808080;'>&nbsp;</p></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-md-3'>
                    <div class='panel'>
                        <div class='card'>
                            <div class='card-body'>
                                <center><h4 class='font-weight-light' style='color: #000000;'>Titik Lokasi</h4></center>
                                <center><h2 class='font-weight-bold' id='titik_lokasi'></h2></center>
                                <center><p style='color: #808080;'>&nbsp;Provinsi</p></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-md-3'>
                    <div class='panel'>
                        <div class='card'>
                            <div class='card-body'>
                                <center><h4 class='font-weight-light' style='color: #000000;'>Sertifikat Tanah</h4></center>
                                <center><h2 class='font-weight-bold' id='serti'></h2></center>
                                <center><p style='color: #808080;'>&nbsp;Asset</p></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-md-3'>
                    <div class='panel'>
                        <div class='card'>
                            <div class='card-body'>
                                <center><h4 class='font-weight-light' style='color: #000000;'>Jatuh Tempo</h4></center>
                                <center><h2 class='font-weight-bold' id='jatuh_tempo'></h2></center>
                                <center><p style='color: #808080;'>&nbsp;Asset</p></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-md-4'>
                    <div class='box' style='box-shadow:none;border:0' >
                        <a href='#' class='small-box-footer' >
                            <div class='box-header'>
                            <h4 class='box-title'>Lokasi</h4>
                        </div>
                        </a>
                        <div class='box-body box-click'>
                            <div id='dash_chart_lokasi'></div>
                        </div>
                    </div>
                </div>
                <div class='col-md-4'>
                    <div class='box' style='box-shadow:none;border:0' >
                        <a href='#' class='small-box-footer' >
                            <div class='box-header'>
                            <h4 class='box-title'>Cara Perolehan</h4>
                        </div>
                        </a>
                        <div class='box-body box-click'>
                            <div id='dash_chart_cara' ></div>
                        </div>
                    </div>
                </div>
                <div class='col-md-4'>
                    <div class='box' style='box-shadow:none;border:0' >
                        <a href='#' class='small-box-footer' >
                            <div class='box-header'>
                            <h4 class='box-title'>Sertifikat Tanah</h4>
                        </div>
                        </a>
                        <div class='box-body box-click'>
                            <div id='dash_chart_serti' ></div>
                        </div>
                    </div>
                </div>
        </div>";
            break;
            case "gedung" :
           
        echo"
        <div class='row'>
                <div class='col-md-4'>
                    <div class='panel'>
                        <div class='card'>
                            <div class='card-body'>
                                <center><h4 class='font-weight-light' style='color: #000000;'>Total Bangunan</h4></center>
                                <center><h2 class='font-weight-bold' id='total_bangun'></h2></center>
                                <center><p style='color: #808080;'>&nbsp;</p></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-md-4'>
                    <div class='panel'>
                        <div class='card'>
                            <div class='card-body'>
                                <center><h4 class='font-weight-light' style='color: #000000;'>Titik Lokasi</h4></center>
                                <center><h2 class='font-weight-bold' id='total_lokasi'></h2></center>
                                <center><p style='color: #808080;'>&nbsp;Provinsi</p></center>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='col-md-4'>
                    <div class='box' style='box-shadow:none;border:0' >
                        <a href='#' class='small-box-footer' >
                            <div class='box-header'>
                            <h4 class='box-title'>Lokasi</h4>
                        </div>
                        </a>
                        <div class='box-body box-click'>
                            <div id='dash_chart_lokasi'></div>
                        </div>
                    </div>
                </div>
        </div>";
            break;
        }
        echo"</div>
        </div>
        <script>
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
                            case 'dataBox':
                                $('#total_tanah').text(result.tanah);
                                $('#titik_lokasi').text(result.provinsi);
                                $('#serti').text(result.serti);
                                $('#jatuh_tempo').text(result.jt);
                              
                            break;
                            case 'dataBoxGedung':
                                $('#total_bangun').text(result.gedung);
                                $('#total_lokasi').text(result.lokasi);
                              
                            break;
                            case 'chartLokasi':
                                Highcharts.chart('dash_chart_lokasi', {
                                    chart: {
                                        type: 'pie',
                                    },
                                    title: {
                                        text: ''
                                    },
                                    plotOptions: {
                                        series: {
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.name}: {point.percentage:.2f}%'
                                            }
                                        },
                                        pie: {
                                            size:200
                                        }
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
                                    },
                                    
                                    series: [
                                        {
                                            name: 'Lokasi',
                                            colorByPoint: true,
                                            data: result.lok
                                            
                                        }
                                    ]
                                });
                            break;
                            case 'chartCara' :
                                // Create the chart
                                Highcharts.chart('dash_chart_cara', {
                                    chart: {
                                        type: 'pie'
                                    },
                                    title: {
                                        text: ''
                                    },
                                    plotOptions: {
                                        series: {
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.name}: {point.percentage:.2f}%'
                                            }
                                        },
                                        pie: {
                                            size:200
                                        }
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
                                    },
                                    
                                    series: [
                                        {
                                            name: 'Cara Perolehan',
                                            colorByPoint: true,
                                            data: result.cara
                                            
                                        }
                                    ]
                                });
                            break;
                            case 'chartSerti':
                        
                                // Create the chart
                                Highcharts.chart('dash_chart_serti', {
                                    chart: {
                                        type: 'pie'
                                    },
                                    title: {
                                        text: ''
                                    },
                                    plotOptions: {
                                        series: {
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.name}: {point.percentage:.2f}%'
                                            }
                                        },
                                        pie: {
                                            size:200
                                        }
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
                                    },
                                    
                                    series: [
                                        {
                                            name: 'Sertifikat',
                                            colorByPoint: true,
                                            data: result.serti
                                            
                                        }
                                    ]
                                });
                            break;
                            case 'dataBoxGedung':
                                // Create the chart
                                Highcharts.chart('dash_chart_lokasi', {
                                    chart: {
                                        type: 'pie'
                                    },
                                    title: {
                                        text: ''
                                    },
                                    plotOptions: {
                                        series: {
                                            dataLabels: {
                                                enabled: true,
                                                format: '{point.name}: {point.percentage:.2f}%'
                                            }
                                        },
                                        pie: {
                                            size:200
                                        }
                                    },
                                    credits: {
                                        enabled: false
                                    },
                                    
                                    tooltip: {
                                        headerFormat: '<span style=\"font-size:11px\">{series.name}</span><br>',
                                        pointFormat: '<span style=\"color:{point.color}\">{point.name}</span>: <b>{point.percentage:.2f}%</b> of total<br/>'
                                    },
                                    
                                    series: [
                                        {
                                            name: \"Lokasi\",
                                            colorByPoint: true,
                                            data: result.lok
                                            
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
            ";
        
            // switch($kunci) {
            //     case "tanah" :
            echo"
            loadService('dataBox','GET','$root_ser/dashAmu.php?fx=getDataBoxTanah');
            loadService('chartLokasi','GET','$root_ser/dashAmu.php?fx=getChartLokasi');
            loadService('chartCara','GET','$root_ser/dashAmu.php?fx=getChartCara');
            loadService('chartSerti','GET','$root_ser/dashAmu.php?fx=getChartSerti');
            ";
                // break;
                // case "gedung":
                    echo"
            loadService('dataBoxGedung','GET','$root_ser/dashAmu.php?fx=getDataBoxGedung');
            loadService('chartGedung','GET','$root_ser/dashAmu.php?fx=getChartGedung');
            ";
                // break;
            echo"
        }

        initDash();


        </script>";

    
		return "";
	}
	
}
?>
