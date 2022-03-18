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
  width: 33%;
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
    opacity:unset !important;
}
.nonaktif{
    opacity:0.5;
}

.big-box h2 {
    text-align: center;
    width: 100%;
    font-size: 1.8em;
    letter-spacing: 2px;
    font-weight: 700;
    text-transform: uppercase;
    cursor:pointer;
}
.modal-dialog {
    width: 100%;
    height: 100%;
    padding: 0;
    margin:0;
}
.modal-content {
    height: 100%;
    border-radius: 0;
    color:#333;
    overflow:auto;
}
.modal.fade:not(.in).bottom .modal-dialog {
	-webkit-transform: translate3d(0, 25%, 0);
	transform: translate3d(0, 25%, 0);
}
            
</style>
<div class='panel' style='<?php echo $padding; ?>'>
    <div class='panel-body' style=''>
        <?=$back1?>
        <div class="row" style='margin-bottom:10px'>
            <div class="col-md-12">
                <h3 style="margin-top: 0px;margin-bottom: 5px;">Saham Bursa <span id='jplan'></span></h3>
                <span id="tglChart" style="font-weight: normal;font-size: 12px;color: #808080;"></span>
                <span id='kode_plan' hidden></span>
                <span id='kode_klp' hidden></span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span>
            </div>
            <div class="nav-tabs-custom2">
                <ul class='nav nav-tabs'>
                    <li class='active'><a data-toggle='tab' href='#home'><span>Komposisi</span></a></li>
                    <li class='text-center'><a data-toggle='tab' href='#menu1'><span>Pengelola</span></a></li>
                    <li class='text-right'><a data-toggle='tab' href='#menu2'><span>Sektor</span></a></li>
                </ul>
                <div class='tab-content' style=''>
                    <div id='home' class='tab-pane fade in active'>
                        <div class='row'>
                            <div class='col-md-6 col-xs-12' id='komposisi_chart' style='height:210px'>
                            </div>
                        </div>
                        <div class='row'>
                            <div id="detail_chart" style="padding: 10px 20px;">
                                                     
                            </div>
                        </div>
                    </div>
                    <div id='menu1' class='tab-pane fade in'>
                        <div class="panel" style='box-shadow:none;margin-bottom:0'>
                            <div class="panel-heading" style='box-shadow:none;padding:5px;'>
                                <h3 style="margin-top: 0px;margin-bottom: 5px;position:absolute">Harga Perolehan</h3>
                                <button hidden type="button" id="btn-tgl" class="pull-right" style="border: 1px solid #007AFF;border-radius: 20px;padding: 2px 10px;background: #007AFF;color: white;" class="pull-right btn-sm">Tanggal
                                </button>
                                <br>
                                <p style="font-weight: normal;font-size: 12px;color: #808080;margin-bottom:0">vs Harga Wajar</p>      
                                
                            </div>
                        </div>
                        <div class="horizontal-scroll" style="padding: 5px;">
                            <div style="padding: 10px;border-radius: 10px;min-height: 90px;box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75);" class="bg-blue sahamBuku aktif col-xs-12">
                                <div class="col-xs-6" style="padding-left: 0px;padding-right: 0px;">
                                    <p style="font-weight: normal;font-size: 8px;color: #ffffff8c;margin-bottom: 0px;">Harga Buku</p>
                                    <h4 id="nbuku" style="margin-top: 0px;font-size: 14px !important;margin-bottom: 0;"></h4>
                                    <p style="font-weight: normal;font-size: 8px;color: #ffffff8c;margin-bottom: 0px;">Harga Wajar</p>
                                    <h4 class="nwajar" style="margin-top: 0px;font-size: 14px !important;margin-bottom: 0;"></h4> 
                                </div>
                                <div class="col-xs-6" style="padding-left: 0px;padding-right: 0px;text-align: center;">
                                    <h1 style="margin-top: 10px;font-size: 28px;color: #ffffff8c;" id="perNBuku"><span ></h1>
                                </div>
                            </div>
                        </div>
                        <div id="detScroll" class="horizontal-scroll" style="padding: 5px;">
                        </div>
                        <div id="detScroll2" class="horizontal-scroll" style="padding: 5px;">
                        </div>
                        <div id="detScrollNAB" class="" style="padding: 0;">
                            <div style="padding: 0;border:none" class="">
                            <style type="text/css">
                                .highcharts-container{
                                height: auto !important;
                                }
                                .highcharts-root{
                                max-height:auto !important;
                                }
                            </style>
                                <div class="col-md-12" style="padding-left: 5px;padding-right: 5px;" >
                                <h3>Nilai Aktiva Bersih</h3>
                                </div>
                                <div class="col-md-12" style="padding-left: 0px;padding-right: 0px;" id="performa">
                                </div>
                            </div>
                        </div>
                    </div>
                    <div id='menu2' class='tab-pane fade in'>
                        <div class="row">
                            <div class='col-md-12'  style='padding-top: 10px;padding-right: 15px;padding-left: 15px;'>
                                <!-- <style>
                                .selectize-input{
                                    border:none;
                                    border-bottom:1px solid #8080806b;
                                }
                                </style>
                                <select class='form-control' id='kode_sektor'>
                                <option value="" disabled>Pilih Sektor</option>
                                </select> -->
                                <input type='text' class='form-control' id='inp-sektor' placeholder='Pilih Sektor' style='border:0;border-bottom:1px solid  #8080806b'>
                            </div>                        
                        </div>
                        <div class='col-md-12'  style='padding-top: 10px;padding:5px' id='daftarDetail'>
                                
                        </div>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- modal sektor -->
        <div class="container-fluid">
            <div class="row">        
                <div class="col-xs-6 col-md-6 big-box" >
                    <div class='modal fade' tabindex='-1' role='dialog' id='modal-sektor'>
                        <div class='modal-dialog modal-md' role='document'>
                            <div class='modal-content'>
                                <div class='modal-header'>
                                    <a type='button' data-dismiss='modal' id='close-list' style='color:black;cursor:pointer'><h5 class='modal-title'> <i class='fa fa-angle-left fa-lg'></i> &nbsp;Pilih Sektor</h5></a>
                                </div>
                                <div class='modal-body'>
                                <ul class='list-group list-sektor'>
                                </ul> 
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                    </div><!-- /.modal -->
                </div>
            </div>
        </div>
    </div>
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
            }
        }
    });
}
function getListSektor(){

$.ajax({
    type: 'GET',
    url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getListSektor',
    dataType: 'json',
    async: false,
    data: {'periode':'<?=$periode?>'},
    success:function(result){    
        if(result.status){
            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                // var select = $('#kode_sektor').selectize();
                // var control = select[0].selectize;
                // control.clearOptions();
                // for(i=0;i<result.daftar.length;i++){
                //     $('#kode_sektor')[0].selectize.addOption([{text:result.daftar[i].kode_sahamklp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_sahamklp}]); 
                //     $('#kode_sektor')[0].selectize.setValue('S0001'); 
                // }
                var html =``;
                for(var i=0;i<result.daftar.length;i++){
                    html+=`<li class='list-group-item' style='border:0;border-top:0;border-bottom: 1px solid #80808047;'>
                    <div hidden class='isi'>`+result.daftar[i].kode_sahamklp+`</div>
                    <span class='nama'>`+result.daftar[i].nama+`</span>
                    <span class='pull-right'><i class='fa fa-angle-right fa-lg'></i></span>
                    </li>`
                }
                $('.list-sektor').html(html);
            }
        }
    }
});
}

var $box = '<?=$box?>';
getParamDefault();
getListSektor();
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
                    case "komposisi_chart" :
                    Highcharts.chart('komposisi_chart', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: 0,
                            plotShadow: false,
                            height: '100%',
                            margin: [0,0,0,15],
                            spacingTop: 0,
                            spacingBottom: 0,
                            spacingLeft: 0,
                            spacingRight: 0,
                        },
                        title: {
                            text: null
                            /* text: 'Browser<br>shares<br>2017',
                            align: 'center',
                            verticalAlign: 'middle',
                            y: 60 */
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
                                center: ['50%', '50%'],
                                size:'105%'
                            }
                        },
                        credits:{
                            enabled:false
                        },
                        series: [{
                            type: 'pie',
                            name: 'Saham Bursa',
                            innerSize: '30%',
                            data: result.chart
                        }]
                    });

                    var path = "<?=$path?>/classes/app/saku3/transaksi/yakes/image/";
                    var html = '';
                    var color = ['#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5'];
                    for(var i=0;i< result.daftar.length;i++){
                        html += `<div class="col-md-12 box-wh" style="border-left: 15px solid `+color[i]+`;border-radius: 10px;margin-bottom:10px"> 
                            <div class="row" style="padding: 5px;text-align: center;vertical-align: middle;">
                                <div class="col-xs-3" style="padding-right: 0px;padding-left: 0px;min-height: 50px;">
                                <img style="width:65px;" src="`+path+result.daftar[i].gambar+`">
                                </div>
                                <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-6">
                                <h3 style="margin: 20px auto;font-size: 12px !important;">`+sepNumPas(result.daftar[i].n1)+`</h3>
                                </div>
                                <div style="padding-right: 0px;padding-left: 0px;min-height: 50px;" class="col-xs-3">
                                <h1 style="margin: 15px auto;color: `+color[i]+`57;font-size: 18px;">`+sepNum(result.daftar[i].persen)+`%</h1>
                                </div>
                            </div>
                        </div>`;
                    }
                    $('#detail_chart').html(html);

                    break;
                    case 'sahamBursa2':
                    $('#nbuku').text(sepNumPas(result.nbuku));
                    $('.nwajar').text(sepNumPas(result.nwajar));
                    if(result.persen < 0) {
                        $('#perNBuku').html(sepNum(result.persen)+'% <img style=\'width: 20px;padding-bottom: 6px;\' src=\'<?=$poly2?>\'>');
                    }else{
                        $('#perNBuku').html(sepNum(result.persen)+'%<img style=\'width: 20px;padding-bottom: 6px;\' src=\'<?=$poly1?>\'>');
                    }
                    var html=``;
                    var path='<?= $path; ?>';
                    for (var i=0;i<result.daftar.length;i++){
                        html+=`
                            <div style="padding: 10px;border-radius: 10px;" class="info-box kotak2 rowke`+i+`">
                                <div class="col-md-6 klik-chart2 " style="padding: 0px;margin-bottom: 5px;border-radius: 10px;">
                                    <div style="padding: 5px;height:60px;text-align:center;background: white;" class="col-md-4 col-xs-4 ">
                                        <p hidden="">`+result.daftar[i].kode_kelola+`</p>
                                        <img src="`+path+`/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`" style="width: 50px;height: auto;">
                                    </div>
                                    <div style="padding: 0 auto;height:60px;" class="col-md-8 col-xs-8">
                                        <span style="font-size: 16px;">`+result.daftar[i].persen+`%`;
                                            if(result.daftar[i].persen < 0) {
                                                html +=`<img style='width: 8px;' src='<?=$poly2?>'>`;
                                            }else{
                                                html +=`<img style='width: 8px;' src='<?=$poly1?>'>`;
                                            }
                                        html +=`<br>
                                            <img style='width: 8px;' src='<?=$openbook?>'> 
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nbuku)+`</span>
                                            <br>
                                            <img style='width: 8px;' src='<?=$fairstand?>'>
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nwajar)+`</span>  
                                    </div>
                                </div>
                            </div>`;

                    }
                    $('#detScroll2').html(html);
                    break;
                    case 'sahamBursa':
                    $('#noleh').text(sepNumPas(result.noleh));
                    $('.nwajar').text(sepNumPas(result.nwajar));
                    if(result.persen < 0) {
                        $('#perNOleh').html(sepNum(result.persen)+'% <img style=\'width: 20px;padding-bottom: 6px;\' src=\'<?=$poly2?>\'>');
                    }else{
                        $('#perNOleh').html(sepNum(result.persen)+'%<img style=\'width: 20px;padding-bottom: 6px;\' src=\'<?=$poly1?>\'>');
                    }
                    
                    var html=``;
                    var path='<?= $path; ?>';
                    for (var i=0;i<result.daftar.length;i++){
                        html+=`
                            <div style="padding: 10px;border-radius: 10px;" class="info-box kotak2 rowke`+i+`">
                                <div class="col-md-6 klik-chart2 " style="padding: 0px;margin-bottom: 5px;border-radius: 10px;">
                                    <div style="padding: 5px;height:60px;text-align:center;background: white;" class="col-md-4 col-xs-4 ">
                                        <p hidden="">`+result.daftar[i].kode_kelola+`</p>
                                        <img src="`+path+`/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`" style="width: 50px;height: auto;">
                                    </div>
                                    <div style="padding: 0 auto;height:60px;" class="col-md-8 col-xs-8">
                                        <span style="font-size: 16px;">`+result.daftar[i].persen+`%`;
                                            if(result.daftar[i].persen < 0) {
                                                html +=`<img style='width: 8px;' src='<?=$poly2?>'>`;
                                            }else{
                                                html +=`<img style='width: 8px;' src='<?=$poly1?>'>`;
                                            }
                                        html +=`<br>
                                            <img style='width: 8px;' src='<?=$openbook?>'> 
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].noleh)+`</span>
                                            <br>
                                            <img style='width: 8px;' src='<?=$fairstand?>'>
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nwajar)+`</span>  
                                    </div>
                                </div>
                            </div>`;

                    }
                    $('#detScroll').html(html);
                    $('.rowke0').css({'padding': '10px','border-radius': '10px','box-shadow': '0px 7px 19px -10px rgba(0,0,0,0.75)','height': '80px','width': '190px','margin-right': '10px','display': 'inline-block','background': '#007AFF','color': 'white'});
                    break;
                    case 'performaNAB' :

                    for(var i=0; i<result.data.length;i++){
                        var data = result.data[i].data;
                        data.reverse();
                        
                        data.forEach(function(point) {
                            point[0] = new Date(point[0]).getTime();
                        });

                        result.data[i].data = data;
                    }

                    Highcharts.chart('performa', {
                        chart: {
                            zoomType: 'x',
                            // height: (6 / 16 * 100) + '%' // 16:8 ratio
                        },
                        title: {
                            text: ''
                        },
                        // subtitle: {
                        //     text: document.ontouchstart === undefined ?
                        //         'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                        // },
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
                                // fillColor: {
                                //     linearGradient: {
                                //         x1: 0,
                                //         y1: 0,
                                //         x2: 0,
                                //         y2: 1
                                //     },
                                //     stops: [
                                //         [0, Highcharts.getOptions().colors[0]],
                                //         [1, Highcharts.Color(Highcharts.getOptions().colors[0]).setOpacity(0).get('rgba')]
                                //     ]
                                // },
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

                        series: result.data
                    });

                    break;
                    case 'daftarSaham' :
                    var html = '';
                    var chart='';
                    for (var x=0; x< result.daftar.length;x++){
                        var line = result.daftar[x];
                        html +=
                        `<div class='col-xs-12' style='margin-bottom:20px;padding:0;border-bottom:1px solid #b5b2b2'>
                            <div class='panel' style='padding:0'>
                                <div class='panel-body' style='padding:0px'>
                                    <div class='col-xs-12' style='padding:0px'>
                                        <h3 style='margin-top:10px;font-size:23px !important;position:absolute'>`+line.kode_saham+`<span style='font-size:8px'>`+line.nama+`</span></h3>
                                        <div class='pull-right' style='position:responsive;padding:10px;'>
                                            <center>
                                            <span style='font-size:10px'>Nilai Wajar</span>
                                            <h3 style='margin-top:0px;color:#007AFF'>`+sepNumPas(line.harga)+`</h3>
                                            </center>
                                        </div>
                                        <br>
                                        <br>
                                        <span><?=substr($tglakhir,8,2)."-".ubah_periode(substr($tglakhir,0,4).substr($tglakhir,5,2))?></span>
                                        <br>
                                        <div style='height:170px;margin-top:15px' id='chartSaham_`+line.kode_saham+`'>
                                        </div>
                                    </div>
                                    <div class='col-xs-12' style='padding:0px' >
                                        <h3>Komparasi Pengelola</h3>
                                    </div>
                                    <div class='col-xs-12' style='padding:0px' id='detail'>`;
                        var det ='';
                        
                        for(var i=0;i<result.daftar2.length;i++){
                            var line2 = result.daftar2[i];
                            if(line2.pers_oleh < 0){
                                var color='color:red';
                            }else{
                                var color='color:green';
                            }
                            
                            if(line2.pers_buku < 0){
                                var color2='color:red';
                            }else{
                                var color2='color:green';
                            }
                            if(line2.kode_saham == line.kode_saham){
                                det +=`<div class='col-xs-12' style='padding:0px'>
                                            <h3 style='margin-top:0px;color:#007AFF'>`+line2.kode_kelola+`</h3>
                                        </div>
                                        <div class='col-xs-4 ' style='padding-left:0px;padding-right:5px'>
                                            <h3 style='margin-top:0px;font-weight:bold !important;font-size:12px !important;'>`+sepNumPas(line2.jumlah)+` Lbr</h3>
                                            <span style='font-size: 8px;'>Jumlah Saham</span>
                                            <br style='font-size: 8px;'>
                                        </div>
                                        <div class='col-xs-4 ' style='padding-left:0px;padding-right:5px'>
                                            <h3 style='margin-top:0px;font-weight:bold !important;font-size:12px !important;position: absolute;'>`+sepNumPas(line2.h_oleh)+`</h3>
                                            <h4 style='font-size: 10px !important;position: relative;margin-top: 0px;`+color+`;margin-bottom: 0px;margin-right: 5px;' class='pull-right'>`+sepNum(line2.pers_oleh)+`%</h4>
                                            <br style='font-size: 17px;'>
                                            <span style='font-size: 8px;'>Harga Perolehan per Saham</span><br style='font-size: 8px;' style='padding:0px'>
                                        </div>
                                        <div class='col-xs-4 ' style='padding-left:0px;padding-right:5px'>
                                            <h3 style='margin-top:0px;font-weight:bold !important;font-size:12px !important;position: absolute;'>`+sepNumPas(line2.h_buku)+`</h3>
                                            <h4 style='font-size: 10px !important;position: relative;margin-top: 0px;`+color2+`;margin-bottom: 0px;margin-right: 10px;' class='pull-right'>`+sepNum(line2.pers_buku)+`%</h4>
                                            <br style='font-size: 17px;'>
                                            <span style='font-size: 8px;'>Harga Buku per Saham</span><br style='font-size: 8px;'>
                                        </div>`;
                            }
                        }
                        html+=det+`    
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                    
                    $('#daftarDetail').html(html);
                    
                    for (var z=0; z< result.daftar3.length;z++){
                        var line = result.daftar3[z];
                        Highcharts.chart('chartSaham_'+line.kode_saham, {
                            chart: {
                                // marginRight: 50
                            },
                            
                            // legend: {
                            //     align: 'right',
                            //     verticalAlign: 'top',
                            //     layout: 'vertical',
                            //     x: 0,
                            //     y: 40
                            // },
                            title: {
                                text: ''
                            },
                            credits: {
                                enabled: false
                            },
                            xAxis: {
                                categories: ['Perolehan','Nilai Buku']
                            },
                            yAxis: [{ // Primary yAxis
                                labels: {
                                    format: '{value}',
                                    style: {
                                        color: Highcharts.getOptions().colors[1]
                                    }
                                },
                                title: {
                                    text: null,
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
                            series: result.series[z].data
                        });
                    }
                    
                    break;
                }
            }
        }
    });
}
function initDash(){

    loadService('komposisi_chart','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getSahamPerKelola','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>'); 
    loadService('sahamBursa','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getNOleh','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');
    loadService('sahamBursa2','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getNBuku','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');
    loadService('performaNAB','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getNABHari','<?=$kode_plan?>|BHN'); 
    // loadService('performa2','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getSPIHari','<?=$kode_plan?>|BHN'); 
   
    loadService('daftarSaham','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDetailperSaham','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|S0001'); 

}
    
initDash();
                
$('#detScroll2').hide();
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

$('.sahamOleh').on('click',function(){
    $('.kotak').removeClass('aktif');
    $('.kotak').addClass('nonaktif');
    $(this).addClass('aktif');
    $('#detScroll').show();
    $('#detScroll2').hide();
});
$('.sahamBuku').on('click', function(){
    // alert('sahamBuku');
    $('.kotak').removeClass('aktif');
    $('.kotak').addClass('nonaktif');
    $(this).addClass('aktif');
    $('#detScroll2').show();
    $('#detScroll').hide();
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

        // var tgl = $('#calendar').datepicker('getFormattedDate');
       
        // var tglreverse = reverseDate(tgl,'/');
        // var tgl2 = $('#tglChart').text();
        // var tgl2 = tgl2.split(' ');
        // var filtertgl = reverseDate(tgl2[1]);
        
        // if(tglreverse > $tgl_default){
        //     alert('Data transaksi diinput terakhir '+$tgl_default);
        //     return false;
        // }else{
        //     var tglgrafik = reverseDate(tglreverse);
        //     $('#tglChart').text('s/d '+tglgrafik);
            
        //     var plan = $('#kode_plan').text();
        //     var kode_klp = $('#kode_klp').text();
            
        //     $('aside').removeClass('control-sidebar-open');
        //     $('.tab-content').hide();
        // }        
        
    $('#modalTanggal').modal('hide');
});

$('.panel').on('click', '#btn-tgl', function(){
    $('#modalTanggal').modal('show');
});

$('.datepicker-inline').width('100%');
$('.table-condensed').width('100%');

$('.kotak2').on('click',function(){
    var kode = $(this).closest('div').find('p').text();
    // $('#kode_kelola2').text(kode);
    // alert(kode);
    var param = '<?=$kode_plan?>|'+kode;
    
    $('.kotak2').css({'padding': '10px','border-radius': '10px','box-shadow': '0px 7px 19px -10px rgba(0,0,0,0.75)','height': '80px','width': '190px','margin-right': '10px','display': 'inline-block','background': 'white','color': 'black'});
    
    
    $(this).css({'padding': '10px','border-radius': '10px','box-shadow': '0px 7px 19px -10px rgba(0,0,0,0.75)','height': '80px','width': '190px','margin-right': '10px','display': 'inline-block','background': '#007AFF','color': 'white'});
    
    // loadService('performa2','GET','$root_ser/dashYakesInvesMob.php?fx=getSPIHari',param);
    loadService('performaNAB','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getNABHari',param);
});

// $('.panel').on('change', '#kode_sektor', function(){
//     var kode= $('#kode_sektor')[0].selectize.getValue();
//     loadService('daftarSaham','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDetailperSaham','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode); 
// });

$('#inp-sektor').focus(function(){
    
    $('#modal-sektor').addClass('bottom');
    $('#modal-sektor').modal('show');
});
$('.list-sektor').on('click', '.list-group-item',function(){

    $('.list-group-item div.isi').removeClass('selected');
    $('.list-group-item span.nama').removeClass('selected2');
    $(this).find('div.isi').addClass('selected');
    $(this).find('span.nama').addClass('selected2');
    var isi=$('.selected').text();
    var nama=$('.selected2').text();
    $('#inp-sektor').val(isi+" - "+nama);
    $('#modal-sektor').modal('hide');
    var kode_kelola =  $('#kode_kelola').text();
    loadService('daftarSaham','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDetailperSaham','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+isi); 

});
    
</script>