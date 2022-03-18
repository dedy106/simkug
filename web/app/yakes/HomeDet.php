<?php 
    session_start();

	$kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    $path=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/";
    $poly1 = $path."image/Polygon1.png";
    $poly2 = $path."image/Polygon12.png";
    $group12 = $path."image/Group12.png";
    $group13 = $path."image/RpRed.png";
    $group14 = $path."image/spi.png";

    $param = $_GET['param'];

    $tmp=explode("|",$param);
    $tglakhir = $tmp[0];
    $kode_plan = $tmp[1];
    $kode_klp = $tmp[2];
    $box = $tmp[3];

	 if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];
    $judul = "Alokasi Aset";

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="$root_app/mainmobile/fHomeMobile/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param=$tglakhir|$kode_plan|$kode_klp";
        $mobile=true;
        include($root.'/web/back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$root_app/main/fHomeMobile/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param=$tglakhir|$kode_plan|$kode_klp' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }
    
    // echo $header;
?>

<style type="text/css">
.highcharts-container {
  margin: 0 auto;
}
.horizontal-scroll{
    height: 120px;
    margin-top: 5px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding-top: 5px;
    padding-left: 2px;
}
.horizontal-scroll::-webkit-scrollbar{
    display: none;
}
.highcharts-legend-item > span{
    overflow:unset !important;
    font-weight:normal !important;
    padding-top:5px !important;
    padding-bottom:5px !important;
}

h3{
    margin-bottom: 5px;
    font-size:18px !important
}
h2{
    margin-bottom: 5px;
    margin-top:10px;
    font-size:20px !important
}
h4{
    font-size:13px !important
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

/* .pad-more{
    padding-left:10px !important;
    padding-right:0px !important;
}
.mar-mor{
    margin-bottom:10px !important;
} */
.box-wh{
    box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
}
#dash_chart_alokasi_kas {
    max-width: 400px;
    height: 70px;
    
}
#dash_chart_alokasi_ebt {
    max-width: 400px;
    height: 70px;
    
}
#dash_chart_alokasi_saham {
    max-width: 400px;
    height: 70px;
    
}
#dash_chart_alokasi_propensa {
    max-width: 400px;
    height: 70px;
    
}
/* CONTROL SIDEBAR */

.control-sidebar-bg {
    position: fixed;
    z-index: 1000;
    bottom: 0;
}
.control-sidebar-bg,
.control-sidebar {
    top: 50px;
    right: 0;
    width: 230px;
    height:0px;
    -webkit-transition: top 0.3s ease-in-out;
    -o-transition: top 0.3s ease-in-out;
    transition: top 0.3s ease-in-out;
}
.control-sidebar {
    position: absolute;
    padding-top: 0px;
    z-index: 1010;
}
@media (max-width: 768px) {
    .control-sidebar {
        padding-top: 0px;
    }
}
.control-sidebar > .tab-content {
    padding: 10px 15px;
}
.control-sidebar.control-sidebar-open,
.control-sidebar.control-sidebar-open + .control-sidebar-bg {
    top: 50;
    height: 230px;
}
.control-sidebar-open .control-sidebar-bg,
.control-sidebar-open .control-sidebar {
    top: 50;
    height: 230px;
}
@media (min-width: 768px) {
    .control-sidebar-open .content-wrapper,
    .control-sidebar-open .right-side,
    .control-sidebar-open .main-footer {
        height: 230px;
        margin-right:10px;
    }
}
</style>
<div class='panel' style='<?php echo $padding; ?>'>
    <div class='panel-body' style=''>
        <?=$back1?>
        <div class="row" style='margin-bottom:10px'>
            <div class="col-md-12">
                <h3 style="margin-top: 0px;margin-bottom: 5px;">Realisasi Alokasi Aset <span id='jplan'></span> </h3>
                <span id="tglChart" style="font-weight: normal;font-size: 12px;color: #808080;"></span>
                <!-- <button type="button" id="btn-tgl" style="border: 1px solid #007AFF;border-radius: 20px;padding: 2px 10px;background: #007AFF;color: white;" class="pull-right btn-sm">Ubah Tanggal -->
                </button>
                <span id='kode_plan' hidden></span>
                <span id='kode_klp' hidden></span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span>
            </div>
        </div>
        <div class="row">

        <?php
            // echo $box; 
            // switch($box) { 
            //     case "KAS" : 
        ?>
            <div class='col-md-12 col-xs-12'>
                <div class='panel mar-mor' style='box-shadow: none;'>
                    <div class='panel-heading' style='padding:0px;margin-bottom: 10px;'>
                    Kas 
                        (<span class='' style='font-size: 14px;' id='persenKas'></span>)
                    </div>
                    <div class='panel-body' style='padding: 0px;'>
                        <div id='kas' style='padding-right: 0px;padding-left: 0px;' class='col-md-6 col-xs-12'>
                        </div>
                        <div id='detailKasChart' style='padding-right: 0px;' class='col-md-6 col-xs-12'>
                            <!-- <table class='table no-border no-margin' style='font-size:10px' id='table-deposito'>
                            <tbody>
                            </tbody>
                            </table> -->
                        </div>
                    </div>
                </div>
            </div>
            <?php //break; ?>
            <?php //case "SB" : ?>
            <div class='col-md-12 col-xs-12'>
                <div class='panel mar-mor ' style='box-shadow: none;'>
                    <div class='panel-heading' style='padding:0px;margin-bottom: 10px;'>
                    Saham Bursa
                        (<span class='' style='font-size: 14px;' id='persenSb'></span>)
                    </div>
                    <div class='panel-body' style='padding: 0px;'>
                        <div id='saham' style='padding-right:0px;padding-left:0px' class='col-md-6 col-xs-12'>
                        </div>
                        <div id='detailSBChart' style='padding-right: 0px;' class='col-md-6 col-xs-12'>
                            <!-- <table class='table no-border no-margin' style='font-size:10px' id='table-sb'>
                            <tbody>
                            </tbody>
                            </table> -->
                        </div>
                    </div>
                </div>
            </div>
            <?php //break; ?>
            <?php //case "EBT" : ?>
            <div class='col-md-12 col-xs-12'>
                <div class='panel mar-mor' style='box-shadow: none;'>
                    <div class='panel-heading' style='padding:0px;margin-bottom: 10px;'>
                                Efek Berpendapatan Tetap
                        (<span class='' style='font-size: 14px;' id='persenEbt'></span>)
                    </div>
                    <div class='panel-body' style='padding: 0px;'>
                        <div id='efek' style='padding-left:0px;padding-right:0px' class='col-md-6 col-xs-12'>
                        </div>
                        <div id='detailEbtChart' style='padding-right: 0px' class='col-md-6 col-xs-12'>
                            <!-- <table class='table no-border no-margin' style='font-size:10px' id='table-efek'>
                            <tbody>
                            </tbody>
                            </table> -->
                        </div>
                    </div>
                </div>
            </div>
            <?php //break; ?>
            <?php //case "PRO" : ?>
            <div class='col-md-12 col-xs-12'>
                <div class='panel mar-mor' style='box-shadow: none;'>
                    <div class='panel-heading' style='padding:0px;margin-bottom: 10px;'>
                                Saham Non Publik
                        (<span class='' style='font-size: 14px;' id='persenPro'></span>)
                    </div>
                    <div class='panel-body' style='padding: 0px;'>
                        <div id='saham_np' style='padding-right:0px;padding-left:0px;' class='col-md-6 col-xs-12'>
                        </div>
                        <div id='detailProChart' style='padding-right:0px;' class='col-md-6 col-xs-12'>
                            <!-- <table class='table no-border no-margin' style='font-size:10px' id='table-pro'>
                            <tbody>
                            </tbody>
                            </table> -->
                        </div>
                    </div>
                </div>
            </div>
            <?php //break; ?>
        <?php //} ?>
        </div>
    </div>
    <!-- Modal Tanggal -->
    <div class='modal fade' tabindex='-1' role='dialog' id='modalTanggal'>
        <div class='modal-dialog modal-md' role='document'>
            <div class='modal-content'>
                <div class='modal-body'>
                    <style>
                    .datepicker-inline {
                        width: 100%;
                    }
                    </style>
                    <div class='box box-solid' style='border:none;box-shadow:none'>
                        <div class='box-header' style='border:none;box-shadow:none'>
                            <i class='fa fa-calendar'></i>
                            <h3 class='box-title'>Calendar</h3>
                        </div>
                        <!-- /.box-header -->
                        <div class='box-body no-padding' style='border:none;box-shadow:none'>
                        <!--The calendar -->
                            <div id='calendar' style='width: 95%'></div>
                        </div>
                        <div class='row text-right' style='margin-top:30px'>
                            <div class='form-group'>
                                <div class='col-sm-12' style='margin-bottom:5px;padding-right:10px'>
                                    <button type='button' class='btn btn-primary pull-right' id='btnOk2'>OK</button>
                                    <button type='button' class='btn btn-default pull-right' data-dismiss='modal' aria-label='Close'>Cancel</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div><!-- /.modal-content -->
        </div><!-- /.modal-dialog -->
    </div><!-- /.modal -->
</div>
<script>
var $tgl_default = "";
function reverseDate(date_str, separator,newSepar){
    if(typeof separator === 'undefined'){separator = '-'}
    if(typeof newSepar === 'undefined'){newSepar = '-'}
    date_str = date_str.split(' ');
    var str = date_str[0].split(separator);
    
    return str[2]+newSepar+str[1]+newSepar+str[0];
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


function sepNum(x){
    if (typeof x === 'undefined' || !x) { 
        return 0;
    }else{
        var x = parseFloat(x).toFixed(2);
            
        var parts = x.toString().split('.');
        parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
        return parts.join(',');
    }
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

function toMilyar(x) {
    var nil = x / 1000000000;
    return sepNum(nil) + ' M';
}
function view_klp(kode){
    var tmp1 = kode.substr(0,2);
    var tmp2 = kode.substr(2,2);
    return '('+tmp1+':'+tmp2+')';
}
function getParamDefault(param = null){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getParamDefault',
        dataType: 'json',
        async: false,
        data: {'param':param},
        success:function(result){    
            if(result.status){
                
                $('#tglChart').text('s/d '+reverseDate('<?=$tglakhir?>'));
                $('#kode_plan').text(result.kode_plan);
                $('#kode_klp').text(result.kode_klp);
                $('#jplan').text(result.nama_plan);
                $('#kode_klp_view').text(view_klp(result.kode_klp));
                $tgl_default = result.tgl_default;
            }
        }
    });
}

var $box = '<?=$box?>';
getParamDefault('<?=$param?>');
function loadService(index,method,url,param=null){
    $.ajax({
        type: method,
        url: url,
        async: false,
        dataType: 'json',
        data: {'periode':'<?php echo $periode?>','param':param},
        success:function(result){    
            if(result.status){
                switch(index){
                    case 'getPortofolio' :
                            
                            var color = ['#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5'];
                            var htmlkas = ``;
                            for(var i=0;i< result.kas.length;i++){
                                var nama = result.kas[i].nama.substring(3);
                                htmlkas += `<div class="col-md-12 box-wh kas`+result.kas[i].kode_neraca+`" style="border-left: 15px solid `+color[i]+`;border-radius: 10px;margin-bottom:10px"> 
                                    <div class="row" style="padding: 5px;text-align: center;vertical-align: middle;">
                                        <div class="col-xs-3" style="padding-right: 0px;padding-left: 0px;min-height: 50px;">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+nama+`</h3>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-6">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+sepNumPas(result.kas[i].n3)+`</h3>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-3">
                                        <h1 style="margin: 15px auto;color: `+color[i]+`57;font-size: 18px;">`+sepNum(result.kas[i].persen)+`%</h1>
                                        </div>
                                    </div>
                                </div>`;
                            }
                            $('#detailKasChart').html(htmlkas);
                            Highcharts.chart('kas', {
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie',
                                    height : '95%'
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
                                        showInLegend: true,
                                        size:'100%',
                                        point:{
                                            events : {
                                                legendItemClick: function(e){
                                                    // var id = this.key;   
                                                    // var tgl = $('#tglChart').text();
                                                    // var tgl2 = tgl.split(' ');
                                                    // var filtertgl = reverseDate(tgl2[1]);
                                                    // // alert (filtertgl);
                                                    // var plan = $('#kode_plan').text();
                                                    // var kode_klp = $('#kode_klp').text();
                                                    // if(id == "kas_rowke0"  || id =="kas_rowke1"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Deposito/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box;
                                                    
                                                    // }else if(id == "kas_rowke2"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDPU";
                                                    // }
                                                    e.preventDefault();
                                                },
                                                click: function() {
                                                       
                                                }
                                            }
                                        }
                                    }
                                },
                                legend: {
                                    enabled: false,
                                    // layout: 'vertical',
                                    // align: 'right',
                                    width: '110%',
                                    // // y:50,
                                    // verticalAlign: 'top',
                                    useHTML: true,
                                    labelFormatter: function() {
                                        // if(this.percentage > this.key){
                                            /*return `<p class='trail `+this.key+`' style='font-size:10px;padding-left:20px'>`+this.name+` ( `+sepNum(this.percentage)+`% ) <b style='font-size: 10px;'>`+sepNumPas(this.y)+`</b> <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></p>`;*/

                                            // return `<table style='margin:0;font-size:10px;width:300px;border:none !important'>
                                            // <tbody>
                                            // <tr class='trail `+this.key+`' style=''><td style='padding:2px;width:50%'>`+this.name+`</td><td style='padding:2px;width:10%'> ( `+sepNum(this.percentage)+`% ) </td><td style='padding:2px;width:40%;text-align:right'><b style='font-size: 10px;'>`+sepNumPas(this.y)+`</b><i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                            // </tr>
                                            // </tbody></table>`;

                                        // }else{
                                        //     return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                        // }
                                        
                                    }
                                },
                                series: [{
                                    name: 'Nilai',
                                    colorByPoint: true,
                                    data: result.kas_chart
                                }],
                                credits:{
                                    enabled:false
                                }
                            });
                            
                            var htmlsb = ``;
                            for(var i=0;i< result.sb.length;i++){
                                var nama = result.sb[i].nama.substring(3);
                                htmlsb += `<div class="col-md-12 box-wh sb`+result.sb[i].kode_neraca+`" style="border-left: 15px solid `+color[i]+`;border-radius: 10px;margin-bottom:10px"> 
                                    <div class="row" style="padding: 5px;text-align: center;vertical-align: middle;">
                                        <div class="col-xs-3" style="padding-right: 0px;padding-left: 0px;min-height: 50px;">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+nama+`</h3>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-6">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+sepNumPas(result.sb[i].n3)+`</h3>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-3">
                                        <h1 style="margin: 15px auto;color: `+color[i]+`57;font-size: 18px;">`+sepNum(result.sb[i].persen)+`%</h1>
                                        </div>
                                    </div>
                                </div>`;
                            }
                            $('#detailSBChart').html(htmlsb);

                            Highcharts.chart('saham', {
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie',
                                    height: '95%'
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
                                        showInLegend: true,
                                        point:{
                                            events : {
                                                legendItemClick: function(e){
                                                    var id = this.key;   
                                                    // var tgl = $('#tglChart').text();
                                                    // var tgl2 = tgl.split(' ');
                                                    // var filtertgl = reverseDate(tgl2[1]);
                                                    // // alert (filtertgl);
                                                    // var plan = $('#kode_plan').text();
                                                    // var kode_klp = $('#kode_klp').text();
                                                    // if(id == "sb_rowke0"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Saham/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box;
                                                    
                                                    // }else if(id == "sb_rowke1"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDSH";
                                                    // }else if(id == "sb_rowke2"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDCMSB";
                                                    // }else if(id == "sb_rowke3"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RETF";
                                                    // }
                                                    e.preventDefault();
                                                },
                                                click: function() {
                                                       
                                                }
                                            }
                                        }
                                    }
                                },
                                legend: {
                                    enabled: false,
                                    // layout: 'vertical',
                                    // align: 'right',
                                    width: '110%',
                                    // // y:50,
                                    // verticalAlign: 'top',
                                    useHTML: true,
                                    labelFormatter: function() {
                                        // if(this.percentage > this.key){
                                            // return `<table style='margin:0;font-size:10px;width:300px;border:none !important'>
                                            // <tbody>
                                            // <tr class='trail `+this.key+`' style=''><td style='padding:2px;width:50%'>`+this.name+`</td><td style='padding:2px;width:10%'> ( `+sepNum(this.percentage)+`% ) </td><td style='padding:2px;width:40%;text-align:right'><b style='font-size: 10px;'>`+sepNumPas(this.y)+`</b><i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                            // </tr>
                                            // </tbody></table>`;
                                        // }else{
                                        //     return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                        // }
                                        
                                    }
                                },
                                series: [{
                                    name: 'Nilai',
                                    colorByPoint: true,
                                    data: result.sb_chart
                                }],
                                credits:{
                                    enabled:false
                                }
                            });
                            var htmlebt = ``;
                            for(var i=0;i< result.ebt.length;i++){
                                var nama = result.ebt[i].nama.substring(3);
                                htmlebt += `<div class="col-md-12 box-wh ebt`+result.ebt[i].kode_neraca+`" style="border-left: 15px solid `+color[i]+`;border-radius: 10px;margin-bottom:10px"> 
                                    <div class="row" style="padding: 5px;text-align: center;vertical-align: middle;">
                                        <div class="col-xs-3" style="padding-right: 0px;padding-left: 0px;min-height: 50px;">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+nama+`</h3>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-6">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+sepNumPas(result.ebt[i].n3)+`</h3>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-3">
                                        <h1 style="margin: 15px auto;color: `+color[i]+`57;font-size: 18px;">`+sepNum(result.ebt[i].persen)+`%</h1>
                                        </div>
                                    </div>
                                </div>`;
                            }
                            $('#detailEbtChart').html(htmlebt);
                            
                            Highcharts.chart('efek', {
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie',
                                    height: '95%'
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
                                        showInLegend: true,
                                        point:{
                                            events : {
                                                legendItemClick: function(e){
                                                    var id = this.key;   
                                                    // var tgl = $('#tglChart').text();
                                                    // var tgl2 = tgl.split(' ');
                                                    // var filtertgl = reverseDate(tgl2[1]);
                                                    // // alert (filtertgl);
                                                    // var plan = $('#kode_plan').text();
                                                    // var kode_klp = $('#kode_klp').text();
                                                    // if(id == "ebt_rowke0"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDPD";
                                                    // }else if(id == "ebt_rowke1"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDPR";
                                                    // }else if(id == "ebt_rowke2"){
                                                    //     window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDCMEBT";
                                                    // }
                                                    e.preventDefault();
                                                },
                                                click: function() {
                                                       
                                                }
                                            }
                                        }
                                    }
                                },
                                series: [{
                                    name: 'Brands',
                                    colorByPoint: true,
                                    data: result.ebt_chart
                                }],
                                legend: {
                                    enabled: false,
                                    // layout: 'vertical',
                                    // align: 'right',
                                    width: '110%',
                                    // // y:50,
                                    // verticalAlign: 'top',
                                    useHTML: true,
                                    labelFormatter: function() {
                                        // if(this.percentage > this.key){

                                            // return `<table style='margin:0;font-size:10px;width:300px;border:none !important'>
                                            // <tbody>
                                            // <tr class='trail `+this.key+`' style=''><td style='padding:2px;width:50%'>`+this.name+`</td><td style='padding:2px;width:10%'> ( `+sepNum(this.percentage)+`% ) </td><td style='padding:2px;width:40%;text-align:right'><b style='font-size: 10px;'>`+sepNumPas(this.y)+`</b><i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                            // </tr>
                                            // </tbody></table>`;
                                            

                                        // }else{
                                        //     return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                        // }
                                        
                                    }
                                },
                                credits:{
                                    enabled:false
                                }
                            });
                            
                            var htmlpro = ``;
                            for(var i=0;i< result.pro.length;i++){
                                var nama = result.pro[i].nama;
                                htmlpro += `<div class="col-md-12 box-wh pro`+result.pro[i].kode_mitra+`" style="border-left: 15px solid `+color[i]+`;border-radius: 10px;margin-bottom:10px"> 
                                    <div class="row" style="padding: 5px;text-align: center;vertical-align: middle;">
                                        <div class="col-xs-3" style="padding-right: 0px;padding-left: 0px;min-height: 50px;">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+nama+`</h3>
                                        <h4 style="margin: 20px auto;font-size: 12px !important;" hidden>`+result.pro[i].kode_mitra+`</h4>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-6">
                                        <h3 style="margin: 20px auto;font-size: 12px !important;">`+sepNumPas(result.pro[i].n3)+`</h3>
                                        </div>
                                        <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-3">
                                        <h1 style="margin: 15px auto;color: `+color[i]+`57;font-size: 18px;">`+sepNum(result.pro[i].persen)+`%</h1>
                                        </div>
                                    </div>
                                </div>`;
                            }
                            $('#detailProChart').html(htmlpro);

                            Highcharts.chart('saham_np', {
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false,
                                    type: 'pie',
                                    height: '95%'
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
                                        showInLegend: true,
                                        point:{
                                            events : {
                                                legendItemClick: function(e){
                                                    var id = this.key;   
                                                    // var tgl = $('#tglChart').text();
                                                    // var tgl2 = tgl.split(' ');
                                                    // var filtertgl = reverseDate(tgl2[1]);
                                                    // // alert (filtertgl);
                                                    // var plan = $('#kode_plan').text();
                                                    // var kode_klp = $('#kode_klp').text();
                                                   
                                                    // window.location.href="<?=$root_app."/mainmobile/Propensa/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box;
                                                    
                                                    
                                                    e.preventDefault();
                                                },
                                                click: function() {
                                                       
                                                }
                                            }
                                        }
                                    }
                                },
                                legend: {
                                    enabled: false,
                                    // layout: 'vertical',
                                    // align: 'right',
                                    width: '110%',
                                    // // y:50,
                                    // verticalAlign: 'top',
                                    useHTML: true,
                                    labelFormatter: function() {
                                        // if(this.percentage > this.key){
                                            // return `<table style='margin:0;font-size:10px;width:300px;border:none !important'>
                                            // <tbody>
                                            // <tr class='trail `+this.key+`' style=''><td style='padding:2px;width:50%'>`+this.name.substr(0,22)+`</td><td style='padding:2px;width:10%'> ( `+sepNum(this.percentage)+`% ) </td><td style='padding:2px;width:40%;text-align:right'><b style='font-size: 10px;'>`+sepNumPas(this.y)+`</b><i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                            // </tr>
                                            // </tbody></table>`;
                                        // }else{
                                        //     return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                        // }
                                        
                                    }
                                },
                                series: [{
                                    name: 'Brands',
                                    colorByPoint: true,
                                    data: result.pro_chart
                                }],
                                credits:{
                                    enabled:false
                                }
                            });
                    break;
                    case 'getPersen':
                    $('#persenKas').text(result.kas.persen+'%');
                    $('#persenEbt').text(result.ebt.persen+'%');
                    $('#persenSb').text(result.saham.persen+'%');
                    $('#persenPro').text(result.pro.persen+'%');
                    break;
                }
            }
        }
    });
}
function initDash(){
    loadService('getPortofolio','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getPortofolio','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>'); 
    loadService('getPersen','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getBatasAlokasi','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>'); 

}
    
initDash();

$('.panel').on('click', '#btn-filter', function(){
    var plan = $('#kode_plan').text();
    var klp = $('#kode_klp').text();
    $('#kode_plan_inp')[0].selectize.setValue(plan);
    $('#kode_klp_inp')[0].selectize.setValue(klp);
    $('#modalFilter').modal('show');
});

$('.panel').on('click', '#btn-tgl', function(){
    $('#modalTanggal').modal('show');
});

$('.daterange').daterangepicker({
    ranges   : {
        'Today'       : [moment(), moment()],
        'Yesterday'   : [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
        'Last 7 Days' : [moment().subtract(6, 'days'), moment()],
        'Last 30 Days': [moment().subtract(29, 'days'), moment()],
        'This Month'  : [moment().startOf('month'), moment().endOf('month')],
        'Last Month'  : [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')]
    },
    startDate: moment().subtract(29, 'days'),
    endDate  : moment()
}, function (start, end) {
    window.alert('You chose: ' + start.format('MMMM D, YYYY') + ' - ' + end.format('MMMM D, YYYY'));
});

// The Calender

$('#calendar').datepicker({
    format: 'dd/mm/yyyy'
});

$('#calendar').datepicker('setDate', new Date());
$('#btnOk2').on('click', function() {

        var tgl = $('#calendar').datepicker('getFormattedDate');
       
        var tglreverse = reverseDate(tgl,'/');
        var tgl2 = $('#tglChart').text();
        var tgl2 = tgl2.split(' ');
        var filtertgl = reverseDate(tgl2[1]);
        
        if(tglreverse > $tgl_default){
            alert('Data transaksi diinput terakhir '+$tgl_default);
            return false;
        }else{
            var tglgrafik = reverseDate(tglreverse);
            $('#tglChart').text('s/d '+tglgrafik);
            var thnSblm = parseInt(tgl.substr(6,4))-1;
            $('#thnSebelum').text(' vs plan aset '+thnSblm);
            
            
            var plan = $('#kode_plan').text();
            var kode_klp = $('#kode_klp').text();
            loadService('asetchart','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getAset',tglreverse+'|'+plan+'|'+kode_klp); 
            
            loadService('getPortofolio','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getPortofolio',tglreverse+'|'+plan+'|'+kode_klp); 
            loadService('getPersen','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getBatasAlokasi',tglreverse+'|'+plan+'|'+kode_klp); 
            
            $('aside').removeClass('control-sidebar-open');
            $('.tab-content').hide();
        }        
        
    $('#modalTanggal').modal('hide');
});
$('.datepicker-inline').width('100%');
$('.table-condensed').width('100%');

$('.panel').on('click', '.kas12', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Deposito/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|DOC";
});

$('.panel').on('click', '.kas13', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Deposito/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|Berjangka";
});

$('.panel').on('click', '.kas16', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDPU";
});

$('.panel').on('click', '.sb31', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Saham/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box;
});

$('.panel').on('click', '.sb321', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDSH";
});
$('.panel').on('click', '.sb322', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDCMSB";
});
$('.panel').on('click', '.sb324', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RETF";
}); 

$('.panel').on('click', '.ebt241', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDPD";
}); 

$('.panel').on('click', '.ebt243', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDPR";
}); 

$('.panel').on('click', '.ebt244', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    window.location.href="<?=$root_app."/mainmobile/Reksadana/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|RDCMEBT";
}); 

$('.panel').on('click', '.proGYS', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    var mitra = $(this).find('h4').text();
    window.location.href="<?=$root_app."/mainmobile/Propensa/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|"+mitra;
}); 

$('.panel').on('click', '.proRSPL', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    var mitra = $(this).find('h4').text();
    window.location.href="<?=$root_app."/mainmobile/Propensa/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|"+mitra;
}); 
$('.panel').on('click', '.proTLT', function(){
    var tgl = $('#tglChart').text();
    var tgl2 = tgl.split(' ');
    var filtertgl = reverseDate(tgl2[1]);
    var plan = $('#kode_plan').text();
    var kode_klp = $('#kode_klp').text();
    var mitra = $(this).find('h4').text();
    window.location.href="<?=$root_app."/mainmobile/Propensa/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+$box+"|"+mitra;
}); 
    
    
    
</script>