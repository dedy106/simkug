<?php 
    session_start();

	$kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];

    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    //$path = "http://".$_SERVER["SERVER_NAME"]."/";
	$path=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/";	
    
	$poly1 = $path."image/Polygon1.png";
    $poly2 = $path."image/Polygon12.png";
    $group12 = $path."image/Group12.png";
    $group13 = $path."image/RpRed.png";
    $group14 = $path."image/spi.png";
    $openbook = $path."image/open-book.png";
    $fairstand= $path."image/fair-stand.png";


    $param = $_GET['param'];

    $tmp=explode("|",$param);
    $tglakhir = $tmp[0];
    $kode_plan = $tmp[1];
    $kode_klp = $tmp[2];
    $box = $tmp[3];
    $kode_mitra=$tmp[4];

	 if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];
    $judul = "Alokasi Aset";

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="$root_app/mainmobile/HomeDet/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param=$tglakhir|$kode_plan|$kode_klp|$box";
        $mobile=true;
        include($root.'/web/back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='$root_app/main/HomeDet/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param=$tglakhir|$kode_plan|$kode_klp|$box' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }
    
    // echo $header;
?>

<style type="text/css">
.highcharts-container{
  margin: 0 auto !important;
  height:210px !important;
}
.highcharts-root{
  margin: 0 auto !important;
  max-height:340px !important;
}
.horizontal-scroll{
    height: 110px;
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

.kotak{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    height:90px; 
    width: 300px; 
    margin-right: 10px; 
    display: inline-block;
}

.kotak2{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    height:80px; 
    width: 190px; 
    margin-right: 10px; 
    display: inline-block;
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

/* NAV TABS */
.nav-tabs-custom2 {
  margin-bottom: 20px;
  background: #fff;
}
.nav-tabs-custom2 > .nav-tabs {
  margin: 0;
  border-bottom: none;
  text-align: left;
  padding: 0 15px;
  margin-top: 10px;
}
.nav-tabs-custom2 > .nav-tabs > li {
  border-bottom: 3px solid transparent;
  width: 50%;
}
.nav-tabs-custom2 > .nav-tabs > li.disabled > a {
  color: #777;
}
.nav-tabs-custom2 > .nav-tabs > li > a {
  color: #444;
  border-radius: 0;
  padding:0px;
}
.nav-tabs-custom2 > .nav-tabs > li > a.text-muted {
  color: #999;
}
.nav-tabs-custom2 > .nav-tabs > li > a,
.nav-tabs-custom2 > .nav-tabs > li > a:hover {
  background: transparent;
  margin: 0;
}
.nav-tabs-custom2 > .nav-tabs > li > a:hover {
  color: #999;
}
.nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:hover,
.nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:focus,
.nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:active {
  border-color: transparent;
}
.nav-tabs-custom2 > .nav-tabs > li.active > a > span {
  border-bottom: 3px solid #007AFF;
  color: #007AFF;
  font-weight:bold;
}
.nav-tabs-custom2 > .nav-tabs > li.active > a,
.nav-tabs-custom2 > .nav-tabs > li.active:hover > a {
  background-color: #fff;
  color: #444;
}
.nav-tabs-custom2 > .nav-tabs > li.active > a {
  border-bottom-color: transparent;
  border-top: none;
  border-left-color: white;
  border-right-color: white;
}
.nav-tabs-custom2 > .nav-tabs > li:first-of-type {
  margin-left: 0;
}
.nav-tabs-custom2 > .nav-tabs > li:first-of-type.active > a {
  border-left-color: transparent;
}
.nav-tabs-custom2 > .nav-tabs.pull-right {
  float: none !important;
}
.nav-tabs-custom2 > .nav-tabs.pull-right > li {
  float: right;
}
.nav-tabs-custom2 > .nav-tabs.pull-right > li:first-of-type {
  margin-right: 0;
}
.nav-tabs-custom2 > .nav-tabs.pull-right > li:first-of-type > a {
  border-left-width: 1px;
}
.nav-tabs-custom2 > .nav-tabs.pull-right > li:first-of-type.active > a {
  border-left-color: #f4f4f4;
  border-right-color: transparent;
}
.nav-tabs-custom2 > .nav-tabs > li.header {
  line-height: 35px;
  padding: 0 10px;
  font-size: 20px;
  color: #444;
}
.nav-tabs-custom2 > .nav-tabs > li.header > .fa,
.nav-tabs-custom2 > .nav-tabs > li.header > .glyphicon,
.nav-tabs-custom2 > .nav-tabs > li.header > .ion {
  margin-right: 5px;
}
.nav-tabs-custom2 > .tab-content {
  background: #fff;
  padding: 10px;
  border-bottom-right-radius: 3px;
  border-bottom-left-radius: 3px;
}
.nav-tabs-custom2 .dropdown.open > a:active,
.nav-tabs-custom2 .dropdown.open > a:focus {
  background: transparent;
  color: #999;
}
.nav-tabs-custom2.tab-primary > .nav-tabs > li.active {
  border-bottom-color: #3c8dbc;
}
.nav-tabs-custom2.tab-info > .nav-tabs > li.active {
  border-bottom-color: #00c0ef;
}
.nav-tabs-custom2.tab-danger > .nav-tabs > li.active {
  border-bottom-color: #dd4b39;
}
.nav-tabs-custom2.tab-warning > .nav-tabs > li.active {
  border-bottom-color: #f39c12;
}
.nav-tabs-custom2.tab-success > .nav-tabs > li.active {
  border-bottom-color: #00a65a;
}
.nav-tabs-custom2.tab-default > .nav-tabs > li.active {
  border-bottom-color: #d2d6de;
}
.bg-blue{
    background: #007AFF !important;
}
.bg-green{
    background: #4CD964 !important;
}
.bg-maroon{
    background: #FF2D55 !important;
}
.bg-yellow{
    background: #FFCC00 !important;
}
.aktif{
    opacity: unset !important;
}    
</style>
<div class='panel' style='<?php echo $padding; ?>'>
    <div class='panel-body' style=''>
        <?=$back1?>
        <div class="row" style='margin-bottom:10px'>
            <div class="col-md-12">
                <h3 style="margin-top: 0px;margin-bottom: 5px;">Saham Penyertaan <span id='jplan'></span></h3>
                <span id="tglChart" style="font-weight: normal;font-size: 12px;color: #808080;"></span>
                <span id='kode_plan' hidden></span>
                <span id='kode_klp' hidden></span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span>
            </div>            
            <div id="detSP" class="row" style="padding: 15px;">
            </div>
            <div id="propensa">
            </div>
            <div id="detScrollNAB" class="row" style="padding: 15px;">
                <div style="padding: 0;border:none" class="">
                    <style type="text/css">
                    .highcharts-container{
                        height: auto !important;
                    }
                    .highcharts-root{
                        max-height:auto !important;
                    }
                    </style>
                    <div class="col-md-12" style="" >
                        <h3>Nilai Aktiva Bersih</h3>
                    </div>
                    <div class="col-md-12" style="padding-left: 0px;padding-right: 0px;" id="performa">
                    </div>
                </div>
            </div>                  
            <div id="detScrollSPI" class="row" style="padding: 15px;">
                <div style="padding: 0;border:none" class="">
                    <style type="text/css">
                    .highcharts-container{
                        height: auto !important;
                    }
                    .highcharts-root{
                        max-height:auto !important;
                    }
                    </style>
                    <div class="col-md-12" style="" >
                        <h3>SPI</h3>
                    </div>
                    <div class="col-md-12" style="padding-left: 0px;padding-right: 0px;" id="performa2">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<script>
var $tgl_default = "";
var $tgl_akhir = "";
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
function getParamDefault(){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getParamDefault',
        dataType: 'json',
        async: false,
        data: {},
        success:function(result){    
            if(result.status){
                
                // $('#tglChart').text('s/d '+reverseDate('<?=$tglakhir?>'));
                // $('#kode_plan').text('<?=$kode_plan?>');
                // $('#kode_klp').text('<?=$kode_klp?>');
                
                $('#tglChart').text('s/d '+reverseDate(result.tgl_akhir));
                $('#kode_plan').text(result.kode_plan);
                $('#kode_klp').text(result.kode_klp);
                $('#jplan').text(result.nama_plan);
                $('#kode_klp_view').text(view_klp(result.kode_klp));
                
                $tgl_default = result.tgl_default;
                $tgl_akhir = result.tgl_akhir.substr(0,10);
            }
        }
    });
}
var $box = '<?=$box?>';
getParamDefault();

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
                    case 'daftar_sp' :
                    var html ='';
                    // $('#nilaiBerjangka').text(toMiliar(result.nilai));
                    var color = ['#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5'];
            
                    for(var i=0;i<result.daftar.length;i++){
                        if(result.daftar[i].spi_buku<0){
                            var poly = '<?=$poly2?>';
                        }else{
                            var poly = '<?=$poly1?>';
                        }
                        html +=`<div class="col-xs-4 klik-chart2 row2ke`+i+`" style="height: 110px;padding: 0;text-align: center;opacity:0.5">
                            <div class="panel" style="padding: 5px;box-shadow: none;">
                                <div class="panel-body" style="padding: 0;border: 1px solid #f1ebeb;height: 110px;border-radius: 10px;box-shadow: 3px 10px 10px #f3efef;">
                                    <div style="margin-top: 10px;padding: 0;height: 45px;" class="col-xs-12 ">
                                        <h1 style='margin-top: 5px;font-size: 14px;' hidden>`+result.daftar[i].kode_mitra+`</h1>
                                        <img src="<?=$path?>/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`" style="width: 50px;height:auto">
                                    </div>
                                    <div style="height:60px;padding: 0;" class="col-xs-12">
                                        <span style="font-size: 10px;">SPI</span>
                                        <h4 style="font-size: 16px;margin: 0;color:`+color[i]+`"><img style='width: 16px;padding-bottom: 6px;' src='`+poly+`'>`+sepNum(result.daftar[i].spi_buku)+`%</h4>
                                        <h6 style="font-size: 6px;color:808080;margin: 0;">updated `+$tgl_akhir+`</h6>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                    $('#detSP').html(html);
                    $('.row2ke0').addClass('aktif');
                    break;
                    case 'daftarDetail' :
                    var html=``;
                    var line = result.daftar[0];
                    var nil = parseFloat(line.nbuku_unit).toFixed(4);
                    var tmp = nil.split('.');
                    if(tmp[1] == undefined){
                        var koma = '';
                    }else{
                        var koma = ','+tmp[1];
                    }

                    var nil2 = parseFloat(line.nab_unit).toFixed(4);
                    var tmp2 = nil2.split('.');
                    if(tmp[1] == undefined){
                        var koma2 = '';
                    }else{
                        var koma2 = ','+tmp2[1];
                    }
                    html +=`
                        <div class="row klik reksadanake" style="padding-right:15px;padding-left: 15px;">  
                            <div style="padding: 0px;" class="col-md-12 col-xs-12">
                                <div class="panel" style="margin-bottom: 0;">
                                    <div class="panel-body bg-blue" style="padding: 0;margin: 10px;border: 1px solid #eee;box-shadow: 5px 10px 10px #f6eded;border-radius: 10px;">
                                        <div style='' class='col-md-12 col-xs-12 text-center'>
                                            <p style='margin-top: 5px;font-size: 14px;'>`+line.nama+`</p>
                                        </div>
                                        <div class='col-md-12 col-xs-12' style='padding:0'>
                                            <div style='' class='col-md-6 col-xs-6 text-center'>
                                                <h6 style='font-size: 10px;color: #ffffffe3;'>Jumlah Unit Penyertaan</h6>
                                                <p style='margin-top: 5px;font-size: 14px;'>`+sepNumPas(line.jum_unit)+`</p>
                                            </div>
                                            <div style='' class='col-md-6 col-xs-6 text-center'>
                                                <h6 style='font-size: 10px;color: #ffffffe3;'>NAB</h6>
                                                <p style='margin-top: 5px;font-size: 14px;'>`+sepNumPas(line.nwajar)+`</p>
                                            </div>
                                        </div>
                                        <div class='col-md-12 col-xs-12' style='padding:0'>
                                            <div style='' class='col-md-6 col-xs-6 text-center'>
                                                <h6 style='font-size: 10px;color: #ffffffe3;'>Nilai Buku/Unit {IDR}</h6>
                                                <p style='margin-top: 5px;font-size: 14px;'>`+sepNumPas(line.nbuku_unit)+`<sup style='font-size: 8px;top: -8px !important;'>`+koma+`</sup></p>
                                            </div>
                                            <div style='' class='col-md-6 col-xs-6 text-center'>
                                                <h6 style='font-size: 10px;color: #ffffffe3;'>NAB Buku</h6>
                                                <p style='margin-top: 5px;font-size: 14px;'>`+sepNumPas(line.nbuku)+`</p>
                                            </div>
                                        </div>
                                        <div class='col-md-12 col-xs-12' style='padding:0'>
                                            <div style='' class='col-md-6 col-xs-6 text-center'>
                                                <h6 style='font-size: 10px;color: #ffffffe3;'>NAB per Unit {IDR}</h6>
                                                <p style='margin-top: 5px;font-size: 14px;'>`+sepNumPas(line.nab_unit)+`<sup style='font-size: 8px;top: -8px !important;'>`+koma+`</sup></p>
                                            </div>
                                            <div style='' class='col-md-6 col-xs-6 text-center'>
                                                <h6 style='font-size: 10px;color: #ffffffe3;'>SPI {IDR}</h6>
                                                <p style='margin-top: 5px;font-size: 14px;'>`+sepNumPas(line.spi_buku)+`</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>     
                        </div>`;
                    $('#propensa').html(html); 


                    for(var i=0; i<result.NAB.length;i++){
                        var data = result.NAB[i].data;
                        data.reverse();
                        
                        data.forEach(function(point) {
                            point[0] = new Date(point[0]).getTime();
                        });

                        result.NAB[i].data = data;
                    }

                    Highcharts.chart('performa', {
                        chart: {
                            zoomType: 'x',
                            // height: (6 / 16 * 100) + '%' // 16:8 ratio
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        legend: {
                            enabled: true
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            area: {
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },

                        series: result.NAB
                    });

                    for(var i=0; i<result.SPI.length;i++){
                        var data = result.SPI[i].data;
                        data.reverse();
                        
                        data.forEach(function(point) {
                            point[0] = new Date(point[0]).getTime();
                        });

                        result.SPI[i].data = data;
                    }

                    Highcharts.chart('performa2', {
                        chart: {
                            zoomType: 'x',
                            // height: (6 / 16 * 100) + '%' // 16:8 ratio
                        },
                        title: {
                            text: ''
                        },
                        xAxis: {
                            type: 'datetime'
                        },
                        yAxis: {
                            title: {
                                text: ''
                            }
                        },
                        legend: {
                            enabled: true
                        },
                        credits: {
                            enabled: false
                        },
                        plotOptions: {
                            area: {
                                marker: {
                                    radius: 2
                                },
                                lineWidth: 1,
                                states: {
                                    hover: {
                                        lineWidth: 1
                                    }
                                },
                                threshold: null
                            }
                        },

                        series: result.SPI
                    });

                    break;
                    
                }
            }
        }
    });
}
function initDash(){

    loadService('daftar_sp','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDaftarSP','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');
    loadService('daftarDetail','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDetailSP','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|<?=$kode_mitra?>');
}
    
initDash();
              

$('#detSP').hide();
// $('.klik-chart2').on('click',function(){
//     var kode = $(this).closest('div').find('h1').text();
//     // alert(kode);
//     $('.klik-chart2').removeClass('aktif');
//     $(this).addClass('aktif');
//     loadService('daftarDetail','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDetailSP','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode); 
// });
    
</script>