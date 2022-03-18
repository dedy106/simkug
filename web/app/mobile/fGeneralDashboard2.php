<?php
$kode_lokasi=$_SESSION['lokasi'];
$periode=$_SESSION['periode'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_fs=$_SESSION['kode_fs'];
$res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
$periode = $res->fields[0];

$tahun = substr($periode,0,4);
$tahunSebelum = intval($tahun) - 1;

$tmp=explode("/",$_GET['param']);

$kode_fs="FS1";

  
?>
<style>
    @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

   
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
</style>

<div class="row" style='padding-left: 10px;'>
    <div class="col-md-6" style='padding-left: 0px;padding-right: 0px;'>
        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick="window.location.href='fMain.php?hal=app/testAPI/fGeneralDashboard2Det.php&param=kas|';">
        <div class="col-md-6 pad-more">
            <div class="panel mar-mor">

                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;margin-bottom:0px" >Kas Bank</h3></center>
                        <center><h2 class="font-weight-bold" id="kas_bank"></h2></center>
                        <center><p style="color: #808080;">Closing Balance</p></center>
                    </div>
                </div>
            </div>
        </div>
        </a>
        <div class="col-md-6 pad-more">
            <div class="panel mar-mor">
                <div class="card">
                    <div class="card-body">
                        <center><h3 class="font-weight-light" style="color: #000000;margin-bottom:0px">Operating Ratio</h3></center>
                        <center><h2 class="font-weight-bold" id="operation_ratio"></h2></center>
                        <center><p style="color: #808080;">&nbsp;</p></center>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 pad-more">
            <div class='box mar-mor' style='box-shadow:none;border:0'>
                <a href='#' class='small-box-footer' style='color:black;cursor:pointer'>
                    <div class='box-header'>
                    <h3 class='box-title'>Arus</h3>
                </div>
                </a>
                <div class='box-body box-click'>
                    <div id='dash_chart_arus'></div>
                </div>
            </div>
        </div>
        <div class="col-md-6 pad-more">
            <div class="panel mar-mor">
                <div class="card" style="margin-bottom: 3.5rem;">
                    <div class="card-body">
                        <h3 class="font-weight-bold text-left" style="font-weight: bold; padding-left: 1rem;">Pendapatan Terbesar</h3>
                        <div id="pendTBesar"></div>
                    </div>
                </div>
                <a style="padding-left: 1rem; text-decoration: none; color: #808080;" href="fMain.php?hal=app/testAPI/fNeracaLajurPendapatan.php" class="small-box-footer">Detail Pendapatan Perusahaan <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>
        <div class="col-md-6 pad-more">
            <div class="panel mar-mor">
                <div class="card" style="margin-bottom: 3.5rem;">
                    <div class="card-body">
                        <h3 class="font-weight-bold text-left" style="font-weight: bold; padding-left: 1rem;">Beban Terbesar</h3>
                        <div id="bebTBesar"></div>
                    </div>
                </div>
                <a style="padding-left: 1rem; text-decoration: none; color: #808080;" href="fMain.php?hal=app/testAPI/fNeracaLajurBeban.php" class="small-box-footer">Detail Beban Perusahaan <i class="fa fa-arrow-circle-right"></i></a>
            </div>
        </div>

    </div>
    <style>
    .test + .tooltip > .tooltip-inner {
        width:250px;
    }
    </style>
    <div class="col-md-6" style='padding-left: 0px;padding-right: 0px;'>
        <div class="col-md-12 pad-more">
            <div class='box mar-mor' style='box-shadow:none;border:0'>
                <div class='box-body'>
                    <div class="col-md-3" style='padding-right:0px'>
                        <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;'>Pendapatan</h3>
                        <div id="labelPend"></div>
                        
                    </div>
                    <div class='col-md-9'>
                        <div id='dash_chart_pend'></div>
                    </div>
               </div>
                <div class='box-body'>
                    <div class="col-md-3" style='padding-right:0px'>
                        <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;'>Beban</h3>
                        <div id="labelBeb"></div>
                    </div>
                    <div class='col-md-9'>
                        <div id='dash_chart_beban'></div>
                    </div>
                </div>
                <div class='box-body'>
                    <div class="col-md-3" style='padding-right:0px'>
                        <h3 class='box-title' style='margin-bottom:0px;margin-top: 10px;'>Laba</h3>
                        <div id="labelLaba"></div>
                    </div>
                    <div class='col-md-9'>
                        <div id='dash_chart_laba'></div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-12 pad-more">
            <div class="panel mar-mor">
                <div class="card" style="margin-bottom: 3.5rem;">
                    <div class="card-body">
                        <h4 class="font-weight-bold text-left" style="font-weight: bold; padding-left: 1rem;">Recently Added</h4>
                        <hr/>
                        <h5 class="font-weight-bold text-left" style="font-weight: bold; padding-left: 1rem; margin-top: -10px;">Transaction</h5>
                        <table class="table no-border" style="margin-left:10px" id="tableRecent">
                        </table>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
function sepNum(x){
    var num = parseFloat(x).toFixed(2);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}
function sepNumPas(x){
    var num = parseInt(x);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}

function toJuta(x) {
    var nil = x / 1000000;
    return sepNum(nil) + " JT";
}

function loadService(index,method,url,param=null){
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','periode':'<?=$periode?>'},
        success:function(result){    
            if(result.status){
                switch(index){
                    case "kas" :
                        $('#kas_bank').text(toJuta(result.kas));
                    break;
                    case "or" :
                        $('#operation_ratio').text(sepNum(result.or)+'%');
                    break;
                    case "pendTBesar" :
                        var html="";
                        var persen = 0;
                        for(var i=0;i<result.daftar.length;i++){
                            var line = result.daftar[i];
                            if(line.gar != 0){
                                persen = (line.so_akhir/line.gar)*100;
                            }else{
                                persen = 100;
                            }
                        html+= `<div class='col-md-12'>
                            <h5 style='margin:0px;position:absolute;'><a href='#' class='test' data-toggle='tooltip' title='`+line.nama_akun+`'>`+line.kode_akun+`</a></h5><br>
                            <h5 style='margin:0px;position:absolute;'>`+sepNumPas(line.so_akhir)+`</h5>
                            </div>
                            <div class='col-md-12'>
                                <div class='progress-group' style='margin-left: 100px;position: relative;margin-top: 5px;margin-right:10%'>
                                    <div class='progress sm'>
                                        <div class='progress-bar progress-bar-aqua' style='background:#4285F4;width: `+persen+`%'></div>
                                    </div>
                                </div>
                            </div>`;
                        }
                        // console.log(html);
                        $('#pendTBesar').html(html);

                    break;
                    case "bebTBesar" :
                        var html="";
                        var persen = 0;
                        for(var i=0;i<result.daftar.length;i++){
                            var line = result.daftar[i];
                            if(line.gar != 0){
                                persen = (line.so_akhir/line.gar)*100;
                            }else{
                                persen = 100;
                            }
                        html+= `<div class='col-md-12'>
                            <h5 style='margin:0px;position:absolute;'><a href='#' class='test' data-toggle='tooltip' title='`+line.nama_akun+`'>`+line.kode_akun+`</a></h5><br>
                            <h5 style='margin:0px;position:absolute;'>`+sepNumPas(line.so_akhir)+`</h5>
                            </div>
                            <div class='col-md-12'>
                                <div class='progress-group' style='margin-left: 100px;position: relative;margin-top: 5px;margin-right:10%'>
                                    <div class='progress sm'>
                                        <div class='progress-bar progress-bar-aqua' style='background:#4285F4;width: `+persen+`%'></div>
                                    </div>
                                </div>
                            </div>`;
                        }
                        // console.log(html);
                        $('#bebTBesar').html(html);

                    break;
                    case "tableRecent" :
                        var html="";
                        for(var i=0;i<result.daftar.length;i++){
                            var line = result.daftar[i];
                            html+=`<tr>
                                <td>
                                    <p style="font-weight: bold; margin-bottom: -2px;">
                                    <i class="fa fa-id-card-o" aria-hidden="true" style="font-size: 2rem;"></i>
                                    <span style="">Modul `+line.modul+`</span>
                                    </p>
                                    <small style="color:  #808080;">`+line.tgl_trans+`</small>
                                </td>
                                <td style="text-align: right;">
                                    <small style="color:  #808080; padding-right: 2rem; padding-bottom: -5px; ">`+line.tgl_input+`</small><br/>
                                    <small style="color:  #808080; padding-right: 2rem; ">`+line.nik_user+`</small>
                                </td>
                            </tr>`;
                        }
                        $('#tableRecent').append(html);
                    break;
                    case "chartArus" :
                    Highcharts.chart('dash_chart_arus', {
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
                        credits: {
                            enabled: false
                        },
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
                            name: 'Cash In',
                            data: result.Cash[0],
                            color:'#0e9aa7',
                            tooltip: {
                                valueSuffix: '  jt'
                            }
                        }, {
                            type: 'column',
                            name: 'Cash Out',
                            color:'#ff6f69',
                            data: result.Cash[1],
                            tooltip: {
                                valueSuffix: ' jt'
                            }
                        }]
                    });
                    break;
                    case "chartPend" :
                    //PENDAPATAN
                    var html=`<h2 style='font-size:25px' >`+toJuta(result.actpend)+`</h2>
                        <h5 style='color:#acacac'>`+toJuta(result.budpend)+`<span style='font-size:10px;'>&nbsp;&nbsp;<i>Budget</i></span></h5>
                        <h5 style='color:#acacac'>`+sepNum(result.rasioPend)+`%</h5>`;

                    $('#labelPend').html(html);
                    Highcharts.chart('dash_chart_pend', {
                        chart: {
                            type: 'area',
                            height: (9 / 16 * 100) + '%' // 16:9 ratio
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
                        series: [{
                            name: 'Budget',
                            data: result.Pend[1],
                            color: '#dd4b39'
                        }, {
                            name: 'Actual',
                            data: result.Pend[0],
                            color: '#4285F4'
                        }]
                    });
                    break;
                    case "chartBeb" :
                    //BEBAN
                    var html=`<h2 style='font-size:25px' >`+toJuta(result.actbeb)+`</h2>
                        <h5 style='color:#acacac'>`+toJuta(result.budbeb)+`<span style='font-size:10px;'>&nbsp;&nbsp;<i>Budget</i></span></h5>
                        <h5 style='color:#acacac'>`+sepNum(result.rasioBeb)+`%</h5>`;
                        
                    $('#labelBeb').html(html);

                    Highcharts.chart('dash_chart_beban', {
                        chart: {
                            type: 'area',
                            height: (9 / 16 * 100) + '%' // 16:9 ratio
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
                        series: [{
                            name: 'Budget',
                            data: result.Beb[1],
                            color: '#dd4b39'
                        }, {
                            name: 'Actual',
                            data: result.Beb[0],
                            color: '#4285F4'
                        }]
                    });

                    break;
                    case "chartLaba":
                    var html=`<h2 style='font-size:25px' >`+toJuta(result.actLaba)+`</h2>`;
                        
                    $('#labelLaba').html(html);
                    Highcharts.chart('dash_chart_laba', {
                        chart: {
                            type: 'line',
                            height: (9 / 16 * 100) + '%' // 16:9 ratio
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
                        series: [{
                            name: 'Laba',
                            data: result.Laba[1],
                            color: '#4285F4'
                        }]
                    });
                    break;
                }
            }
        }
    });
}
function initDash(){
    loadService('kas','GET','<?=$root_ser?>/generalDash.php?fx=getKas');
    loadService('or','GET','<?=$root_ser?>/generalDash.php?fx=getOR');
    loadService('pendTBesar','GET','<?=$root_ser?>/generalDash.php?fx=getPendTBesar');
    loadService('bebTBesar','GET','<?=$root_ser?>/generalDash.php?fx=getBebTBesar');
    loadService('tableRecent','GET','<?=$root_ser?>/generalDash.php?fx=getRecent');
    loadService('chartArus','GET','<?=$root_ser?>/generalDash.php?fx=getArus');
    loadService('chartPend','GET','<?=$root_ser?>/generalDash.php?fx=getPend');
    loadService('chartBeb','GET','<?=$root_ser?>/generalDash.php?fx=getBeb');
    loadService('chartLaba','GET','<?=$root_ser?>/generalDash.php?fx=getLaba');
}

initDash();

$('[data-toggle="tooltip"]').tooltip(); 



</script>
