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
    $param =$tmp[4];

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
    height: 230px;
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
    height:200px; 
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
.nonaktif{
    opacity:0.5;
} 
.aktif > .panel > .panel-body {
    
    border:1px solid #007AFF !important;
}
.nonaktif > .panel > .panel-body{
    
    border:1px solid #f1ebeb !important;
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
                <h3 style="margin-top: 0px;margin-bottom: 5px;">Deposito <span id='subjudul'><?=$param?></span> <span id='jplan'></span></h3>
                <span id="tglChart" style="font-weight: normal;font-size: 12px;color: #808080;"></span>
                <span id='kode_plan' hidden></span>
                <span id='kode_klp' hidden></span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span>
            </div>
            <div class="nav-tabs-custom2">
                <ul class='nav nav-tabs'>
                    <!-- <li class='active'><a data-toggle='tab' href='#home'><span>Berjangka</span></a></li>
                    <li class='text-right'><a data-toggle='tab' href='#menu1'><span>DOC</span></a></li> -->
                </ul>
                <div class='tab-content' style=''>
                    <?php if($param =='Berjangka') : ?> 
                    <div id='home' class='tab-pane fade in active'>
                        <div id="detBerjangka" class="row" style="padding: 15px;">
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
                                <div class="col-md-12" style="padding-left: 5px;padding-right: 5px;" >
                                <h3>Performa NAB</h3>
                                </div>
                                <div class="col-md-12" style="padding-left: 0px;padding-right: 0px;" id="performa">
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-xs-12' style='margin-bottom:25px;'>
                                <div class='panel'>
                                    <div class='panel-heading' style='padding:5px;'>
                                        <h3 style='margin-top:0px;margin-bottom:0px;'>Daftar Deposito per Bank MI</h3>
                                        <p hidden id='kode_kelola'></p>
                                        <p hidden id='jenisDepo'>Deposito</p>
                                    </div>
                                    <div class='panel-body' style='padding:5px;'>
                                        <div class='col-xs-12' style='padding: 0px;'>
                                            <!-- <style>
                                            .selectize-input{
                                                border:none;
                                                border-bottom:1px solid #8080806b;
                                            }
                                            </style>
                                            <select class='form-control input-sm' id='dash-bank' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                            <option value=''>Pilih Nama Bank</option>
                                            </select> -->
                                            <input type='text' class='form-control' id='inp-bank' placeholder='Pilih Nama Bank' style='border:0;border-bottom:1px solid  #8080806b'>
                                        </div>
                                        <div id='daftarDepo2' class="horizontal-scroll"></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php else : ?> 
                    <div id='menu1' class='tab-pane fade in active'>
                        <div id="detDOC" class="row" style="padding: 15px;">
                        </div>
                        <div id="detScrollNAB2" class="row" style="padding: 15px;">
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
                                <h3>Performa NAB</h3>
                                </div>
                                <div class="col-md-12" style="padding-left: 0px;padding-right: 0px;" id="performa2">
                                </div>
                            </div>
                        </div>
                        <div class='col-xs-12' style='margin-bottom:25px;padding:0'>
                            <div class='panel'>
                                <div class='panel-heading' style='padding:5px;'>
                                    <h3 style='margin-top:0px;margin-bottom:0px;'>Daftar Deposito per Bank MI</h3>
                                    <p hidden id='kode_kelola2'></p>
                                    <p hidden id='jenisDepo2'>DOC</p>
                                </div>
                                <div class='panel-body' style='padding:5px;'>
                                    <div class='col-xs-12' style='padding: 0px;'>
                                    <!-- <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>
                                    <select class='form-control input-sm' id='dash-bank2' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                    <option value=''>Pilih Nama Bank</option>
                                    </select> -->
                                    <input type='text' class='form-control' id='inp-bank2' placeholder='Pilih Nama Bank' style='border:0;border-bottom:1px solid  #8080806b'>
                                    </div>
                                    <div id='daftarDepo' class="horizontal-scroll"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <?php endif; ?> 
                </div>
            </div>
        </div>
        <!-- Modal Bank -->
        <div class="container-fluid">
            <div class="row">        
                <div class="col-xs-6 col-md-6 big-box" >
                    <div class='modal fade' tabindex='-1' role='dialog' id='modal-bank'>
                        <div class='modal-dialog modal-md' role='document'>
                            <div class='modal-content'>
                                <div class='modal-header'>
                                    <a type='button' data-dismiss='modal' id='close-list' style='color:black;cursor:pointer'><h5 class='modal-title'> <i class='fa fa-angle-left fa-lg'></i> &nbsp;Pilih Bank</h5></a>
                                </div>
                                <div class='modal-body'>
                                <ul class='list-group list-bank'>
                                </ul> 
                                </div>
                            </div><!-- /.modal-content -->
                        </div><!-- /.modal-dialog -->
                    </div><!-- /.modal -->
                </div>
            </div>
        </div>
        <!-- Modal Bank 2 -->
        <div class="container-fluid">
            <div class="row">        
                <div class="col-xs-6 col-md-6 big-box" >
                    <div class='modal fade' tabindex='-1' role='dialog' id='modal-bank2'>
                        <div class='modal-dialog modal-md' role='document'>
                            <div class='modal-content'>
                                <div class='modal-header'>
                                    <a type='button' data-dismiss='modal' id='close-list' style='color:black;cursor:pointer'><h5 class='modal-title'> <i class='fa fa-angle-left fa-lg'></i> &nbsp;Pilih Bank</h5></a>
                                </div>
                                <div class='modal-body'>
                                <ul class='list-group list-bank2'>
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

function getListBank(param){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getBankKlp',
        dataType: 'json',
        async: false,
        data: {'periode':'<?=$periode?>','param':param},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    // var select = $('#dash-bank').selectize();
                    // var control = select[0].selectize;
                    // control.clearOptions();
                    // for(var i=0;i<result.daftar.length;i++){
                    //     $('#dash-bank')[0].selectize.addOption([{text:result.daftar[i].kode_bankklp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_bankklp}]);
                    // }
                    var html =``;
                    for(var i=0;i<result.daftar.length;i++){
                        html+=`<li class='list-group-item' style='border:0;border-top:0;border-bottom: 1px solid #80808047;'>
                        <div hidden class='isi'>`+result.daftar[i].kode_bankklp+`</div>
                        <span class='nama'>`+result.daftar[i].nama+`</span>
                        <span class='pull-right'><i class='fa fa-angle-right fa-lg'></i></span>
                        </li>`
                    }
                    $('#inp-bank').val(result.daftar[0].kode_bankklp+'-'+result.daftar[0].nama);
                    $('.list-bank').html(html);
                }
            }
        }
    });
}
function getListBank2(param){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getBankKlp',
        dataType: 'json',
        async: false,
        data: {'periode':'<?=$periode?>','param':param},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    // var select = $('#dash-bank2').selectize();
                    // var control = select[0].selectize;
                    // control.clearOptions();
                    // for(var i=0;i<result.daftar.length;i++){
                    //     $('#dash-bank2')[0].selectize.addOption([{text:result.daftar[i].kode_bankklp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_bankklp}]); 
                    // }
                    var html =``;
                    for(var i=0;i<result.daftar.length;i++){
                        html+=`<li class='list-group-item' style='border:0;border-top:0;border-bottom: 1px solid #80808047;'>
                        <div hidden class='isi'>`+result.daftar[i].kode_bankklp+`</div>
                        <span class='nama'>`+result.daftar[i].nama+`</span>
                        <span class='pull-right'><i class='fa fa-angle-right fa-lg'></i></span>
                        </li>`
                    }
                    $('#inp-bank2').val(result.daftar[0].kode_bankklp+'-'+result.daftar[0].nama);
                    $('.list-bank2').html(html);
                }
            }
        }
    });
}
var $box = '<?=$box?>';
getParamDefault();
getListBank('<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|BHN|Deposito');
getListBank2('<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|BHN|DOC');
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
                    case 'Depo' :
                    var html ='';
                    // $('#nilaiBerjangka').text(toMiliar(result.nilai));
                    var color = ['#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5'];
            
                    for(var i=0;i<result.daftar.length;i++){
                        html +=`<div class="col-xs-4 klik-chart2 row2ke`+i+` nonaktif" style="height: 110px;padding: 0;text-align: center;">
                            <div class="panel" style="padding: 5px;box-shadow: none;">
                                <div class="panel-body" style="padding: 0;height: 110px;border-radius: 10px;box-shadow: 3px 10px 10px #f3efef;">
                                    <div style="margin-top: 10px;padding: 0;min-height: 40px;" class="col-xs-12 ">
                                        <p hidden="">`+result.daftar[i].kode_kelola+`</p>
                                        <img src="<?=$path?>/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`" style="width: 50px;height:auto">
                                    </div>
                                    <div style="height:60px;padding: 0;" class="col-xs-12">
                                        <span style="font-size: 10px;">`+sepNumPas(result.daftar[i].nilai)+`</span>
                                        <br><span class='colPersen' style="font-size: 20px;color:grey">`+sepNum(result.daftar[i].persen)+`%</span>
                                    </div>
                                    <span class='isiwarna' hidden>`+color[i]+`</span>
                                </div>
                            </div>
                        </div>`;
                    }
                    $('#detBerjangka').html(html);
                    $('.row2ke0').removeClass('nonaktif');
                    $('.row2ke0').addClass('aktif');
                    $('.row2ke0').find('.colPersen').css({'color':color[0],'font-size':'20px'});
                    break;
                    case 'DOC' :
                    var html ='';
                    // $('#nilaiDOC').text(toMiliar(result.nilai));
                    var color = ['#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5'];
                    for(var i=0;i<result.daftar.length;i++){
                        html +=`<div class="col-xs-4 klik-chart rowke`+i+` nonaktif" style="height: 110px;padding: 0;text-align: center;">
                            <div class="panel" style="padding: 5px;box-shadow: none;">
                                <div class="panel-body" style="padding: 0;height: 110px;border-radius: 10px;box-shadow: 3px 10px 10px #f3efef;">
                                    <div style="margin-top: 10px;padding: 0;min-height: 40px;" class="col-xs-12 ">
                                        <p hidden="">`+result.daftar[i].kode_kelola+`</p>
                                        <img src="<?=$path?>/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`" style="width: 50px;height:auto">
                                    </div>
                                    <div style="height:60px;padding: 0;" class="col-xs-12">
                                        <span style="font-size: 10px;">`+sepNumPas(result.daftar[i].nilai)+`</span>
                                        <br><span class='colPersen' style="font-size: 20px;color:grey">`+sepNum(result.daftar[i].persen)+`%</span>
                                    </div>
                                    <span class='isiwarna' hidden>`+color[i]+`</span>
                                </div>
                            </div>
                        </div>`;
                    }
                    $('#detDOC').html(html);
                    $('.rowke0').removeClass('nonaktif');
                    $('.rowke0').addClass('aktif');
                    $('.rowke0').find('.colPersen').css({'color':color[0],'font-size':'20px'});
                    break;
                    case 'NABDepo' :

                    Highcharts.chart('performa', {
                        chart: {
                            type: 'pie'
                        },
                        title: null,
                        plotOptions: {
                            pie: {
                                innerSize: '52%',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        credits:{
                            enabled:false
                        },
                        series: [{
                            data: result.data
                        }]
                    });

                    break;
                    case 'NABDOC' :

                    Highcharts.chart('performa2', {
                        chart: {
                            type: 'pie'
                        },
                        title: null,
                        plotOptions: {
                            pie: {
                                innerSize: '52%',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true
                            }
                        },
                        credits:{
                            enabled:false
                        },
                        series: [{
                            data: result.data
                        }]
                    });

                    break;
                    case 'daftarDepo':
                    var html = '';
                    for (var i=0;i<result.daftar.length;i++){
                        html +=`<div class='info-box kotak' style='margin-top: 10px;padding: 0px;'>
                            <div class='panel' style='border: 1px solid #e8e8e8;border-radius: 0px;box-shadow: 1px 2px 1px rgba(0,0,0,.05);border-left: 10px solid #007aff;'>
                                <div class='panel-body'>
                                    <div class='row'>
                                    <div style='padding-right: 0px;padding-left: 0px;' class='col-xs-5 text-center'>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Durasi (Hari)</p>
                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].jml_hari+`</p>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Suku Bunga</p>
                                    <p style='margin-bottom: 2px;'>`+sepNum(result.daftar[i].p_bunga)+`%</p>
                                    </div>
                                    <div class='col-xs-2'></div>
                                    
                                    <div style='padding-left: 0px;padding-right: 0px;' class='col-xs-5 text-center'>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Tgl Mulai</p>
                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].tgl_mulai+`</p>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Tgl Jatuh Tempo</p>
                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].tgl_selesai+`</p>
                                    </div>
                                    <div class='col-xs-12 text-center' style='margin-bottom: 20px;'>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Nilai Deposito</p>
                                    <p style='margin-bottom: 2px;font-size: 20px;'>Rp. `+sepNumPas(result.daftar[i].nilai)+`</p>
                                    </div>
                                    <div style='padding-right: 0px;height:40px' class='col-xs-4'>
                                    
                                    <img src='<?=$path?>/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 40px;height: auto;'>
                                    </div>
                                    <div style='padding-left: 0px;' class='col-xs-8 text-right'>
                                    <p style='font-size: 9px;'>`+result.daftar[i].cabang+`</p>                   </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                    $('#daftarDepo').html(html);
                    
                    break;
                    case 'daftarDepo2':
                    var html = '';
                    for (var i=0;i<result.daftar.length;i++){
                        html +=`<div class='info-box kotak' style='margin-top: 10px;padding: 0px;'>
                            <div class='panel' style='border: 1px solid #e8e8e8;border-radius: 0px;box-shadow: 1px 2px 1px rgba(0,0,0,.05);border-left: 10px solid #007aff;'>
                                <div class='panel-body'>
                                    <div class='row'>
                                    <div style='padding-right: 0px;padding-left: 0px;' class='col-xs-5 text-center'>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Durasi (Hari)</p>
                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].jml_hari+`</p>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Suku Bunga</p>
                                    <p style='margin-bottom: 2px;'>`+sepNum(result.daftar[i].p_bunga)+`%</p>
                                    </div>
                                    <div class='col-xs-2'></div>
                                    
                                    <div style='padding-left: 0px;padding-right: 0px;' class='col-xs-5 text-center'>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Tgl Mulai</p>
                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].tgl_mulai+`</p>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Tgl Jatuh Tempo</p>
                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].tgl_selesai+`</p>
                                    </div>
                                    <div class='col-xs-12 text-center' style='margin-bottom: 20px;'>
                                    <p style='font-size: 9px;margin-bottom: 0px;'>Nilai Deposito</p>
                                    <p style='margin-bottom: 2px;font-size: 20px;'>Rp. `+sepNumPas(result.daftar[i].nilai)+`</p>
                                    </div>
                                    <div style='padding-right: 0px;height:40px' class='col-xs-4'>
                                    
                                    <img src='<?=$path?>/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 40px;height: auto;'>
                                    </div>
                                    <div style='padding-left: 0px;' class='col-xs-8 text-right'>
                                    <p style='font-size: 9px;'>`+result.daftar[i].cabang+`</p>                   </div>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                    }
                    $('#daftarDepo2').html(html);
                    
                    break;
                    
                }
            }
        }
    });
}
function initDash(){

    var jenisDep = '<?php echo $param; ?>';
    if(jenisDep == 'DOC'){

        loadService('DOC','GET','<?=$root_ser?>/dashYakesInves.php?fx=getDOC','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');
        loadService('NABDOC','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDOCAlokasi','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');
        loadService('daftarDepo','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDOCMI','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|');
    
    }else{

        loadService('Depo','GET','<?=$root_ser?>/dashYakesInves.php?fx=getDepo','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');
        loadService('NABDepo','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDepoAlokasi','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');
        loadService('daftarDepo2','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDepoMI','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>');  
       
    }
    
}
    
initDash();
                
$('.klik-chart2').on('click',function(){
    var kode = $(this).closest('div').find('p').text();
    $('#kode_kelola').text(kode);
    // alert(kode);
    var param = '<?=$kode_plan?>|'+kode;
    
    $('.klik-chart2').removeClass('aktif');
    $('.klik-chart').addClass('nonaktif');
    $(this).removeClass('nonaktif');
    $(this).addClass('aktif');
    var warna = $(this).find('.isiwarna').text();
    $('.klik-chart2').find('.colPersen').css({'color':'grey','font-size':'20px'});
    $(this).find('.colPersen').css({'color':warna,'font-size':'20px'});
    $('#inp-bank').val('');
    // loadService('NABDepo','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getNABDepoHari',param);
    loadService('NABDepo','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDepoAlokasi','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode);
    getListBank('<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode+'|Deposito');
    loadService('daftarDepo2','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDepoMI','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode); 
    
});

$('.klik-chart').on('click',function(){
    var kode = $(this).closest('div').find('p').text();
    $('#kode_kelola2').text(kode);
    // alert(kode);
    var param = '<?=$kode_plan?>|'+kode;
    
    $('.klik-chart').removeClass('aktif');
    $('.klik-chart').addClass('nonaktif');
    $('#inp-bank2').val('');
    $(this).removeClass('nonaktif');
    $(this).addClass('aktif');
    var warna = $(this).find('.isiwarna').text();
    
    $('.klik-chart').find('.colPersen').css({'color':'grey','font-size':'20px'});
    $(this).find('.colPersen').css({'color':warna,'font-size':'20px'});
    // loadService('NABDOC','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getNABDOCHari',param); 
    loadService('NABDOC','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDOCAlokasi','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode);
    
    loadService('daftarDepo','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDOCMI','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode);
    
    getListBank2('<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode+'|DOC');
});

$('.panel').on('change', '#kode_sektor', function(){
    var kode= $('#kode_sektor')[0].selectize.getValue();
    loadService('daftarSaham','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDetailperSaham','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode); 
});

// $('.panel').on('change','#dash-bank2',function(){
//     var bank = $('#dash-bank2')[0].selectize.getValue();
//     var kode_kelola =  $('#kode_kelola2').text();
//     var kode = $('#jenisDepo2').text();
//     loadService('daftarDepo','GET','<?=$root_ser?>/dashYakesInves.php?fx=getDOCMI','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode_kelola+'|'+bank);
    
// });

$('#inp-bank').focus(function(){
    
    $('#modal-bank').addClass('bottom');
    $('#modal-bank').modal('show');
});
$('.list-bank').on('click', '.list-group-item',function(){

    $('.list-group-item div.isi').removeClass('selected');
    $('.list-group-item span.nama').removeClass('selected2');
    $(this).find('div.isi').addClass('selected');
    $(this).find('span.nama').addClass('selected2');
    var isi=$('.selected').text();
    var nama=$('.selected2').text();
    $('#inp-bank').val(isi+" - "+nama);
    $('#modal-bank').modal('hide');
    var kode_kelola =  $('#kode_kelola').text();
    loadService('daftarDepo2','GET','<?=$root_ser?>/dashYakesInves.php?fx=getDepoMI','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode_kelola+'|'+isi);

});

$('#inp-bank2').focus(function(){
    
    $('#modal-bank2').addClass('bottom');
    $('#modal-bank2').modal('show');
});
$('.list-bank2').on('click', '.list-group-item',function(){

    $('.list-group-item div.isi').removeClass('selected');
    $('.list-group-item span.nama').removeClass('selected2');
    $(this).find('div.isi').addClass('selected');
    $(this).find('span.nama').addClass('selected2');
    var isi=$('.selected').text();
    var nama=$('.selected2').text();
    $('#inp-bank2').val(isi+" - "+nama);
    $('#modal-bank2').modal('hide');
    var kode_kelola =  $('#kode_kelola2').text();
    loadService('daftarDepo','GET','<?=$root_ser?>/dashYakesInves.php?fx=getDOCMI','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|'+kode_kelola+'|'+isi);

});


    
</script>