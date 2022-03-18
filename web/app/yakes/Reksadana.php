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
    $jenis = $tmp[4];

    switch($jenis){
        case 'RDPU':
        $subjudul = 'Reksadana Pasar Uang';
        break;
        case 'RDSH':
        $subjudul = 'Reksadana Saham';
        break;
        case 'RDPD':
        $subjudul = 'Reksadana Pendapatan Tetap';
        break;
        case 'RDPR':
        $subjudul = 'Reksadana Terproteksi';
        break;
        case 'RDCMSB':
        $subjudul = 'Reksadana Campuran [Saham]';
        break;
        case 'RDCMEBT':
        $subjudul = 'Reksadana Campuran [Reksadana]';
        break;
        case 'RETF':
        $subjudul = 'Reksadana Exchange Traded Fund (ETF)';
        break;

    }

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
                <h3 style="margin-top: 0px;margin-bottom: 5px;"><?=$subjudul?>  <span id='jplan'></span></h3>
                <span id="tglChart" style="font-weight: normal;font-size: 12px;color: #808080;"></span>
                <button type="button" id="btn-filter" style="border: 1px solid #007AFF;border-radius: 20px;padding: 2px 10px;background: #007AFF;color: white;" class="pull-right btn-sm">Filter
                </button>
                <span id='kode_plan' hidden></span>
                <span id='kode_klp' hidden></span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span>
                
            </div>
            <div id="reksadana">
            </div>
        </div>
        <!-- Modal Filter -->
        <div class="container-fluid">
            <div class="row">        
                <div class="col-xs-6 col-md-6 big-box" >
                    <div class='modal fade' tabindex='-1' role='dialog' id='modalFilter'>
                        <div class='modal-dialog modal-md' role='document'>
                            <div class='modal-content'>
                                <div class='modal-header'>
                                    <h5 class='modal-title'>Filter</h5>
                                </div>
                                <div class='modal-body'>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>Urutkan SPI</label>
                                            <div class='col-sm-12' style='margin-bottom:5px;'>
                                            <input type="radio" name="order_by" id="desc" value="desc" checked>
                                            Terbesar
                                            <input type="radio" name="order_by" id="asc" value="asc">
                                            Terkecil
                                            </div>
                                        </div>
                                    </div>
                                    <div class='row'>
                                        <div class='form-group'>
                                            <label class='control-label col-sm-3'>Manager Investasi</label>
                                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                            <select class='form-control selectize' id='kode_rdkelola'>
                                            <option val='' disabled>Pilih Manager Investasi</option>
                                            <?php 
                                            $rsplan = execute("select 'all' as kode_rdkelola, 'All' as nama union all select kode_rdkelola,nama from inv_rdkelola where flag_aktif='1' ");
                                            while($row=$rsplan->FetchNextObject($toupper=false)){
                                            
                                            echo"<option value='$row->kode_rdkelola' >$row->kode_rdkelola - $row->nama</option>";
                                            }
                                            ?>
                                            </select>   
                                            </div>
                                        </div>
                                    </div>
                                    <div class='row text-right' style='margin-top:30px'>
                                        <div class='form-group'>
                                            <div class='col-sm-12' style='margin-bottom:5px;padding-right:10px'>
                                            <button type='button' class='btn btn-primary' id='btnOk'>Tampilkan</button>
                                            <button type='button' class='btn btn-default pull-right' data-dismiss='modal' aria-label='Close'>Cancel</button>
                                            </div>
                                        </div>
                                    </div>
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

function getParamDefault(){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getParamDefault',
        dataType: 'json',
        async: false,
        data: {},
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

function view_klp(kode){
  var tmp1 = kode.substr(0,2);
  var tmp2 = kode.substr(2,2);
  return '('+tmp1+':'+tmp2+')';
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
                    case 'daftar_reksadana' :
                    var html ='';
                    
                    for(var i=0;i<result.daftar.length;i++){
                        var nil = parseFloat(result.daftar[i].nab_unit).toFixed(4);
                        var tmp = nil.split('.');
                        if(tmp[1] == undefined){
                            var koma = '';
                        }else{
                            var koma = ','+tmp[1];
                        }
                        if(result.daftar[i].spi_buku < 0 ){
                            var kelas = 'bg-red'; 
                            var warna = 'red';
                            var tanda = '';
                        }else{
                            var kelas = 'bg-green';
                            var warna = '#4CD964';
                            var tanda = '+';
                        }
                        
                        html +=`
                        <div class="row klik reksadanake`+i+`" style="padding-right:15px;padding-left: 15px;">  
                            <div style="padding: 0px;" class="col-md-12 col-xs-12">
                                <div class="panel" style="margin-bottom: 0;">
                                    <div class="panel-body" style="padding: 5px;margin: 10px;border: 1px solid #eee;box-shadow: 5px 10px 10px #f6eded;border-radius: 10px;">
                                        <h1 hidden="">`+result.daftar[i].kode_rd+`</h1>
                                        <div style=" text-align:center;background:white;padding: 5px;" class="col-md-3 col-xs-3 text-align:center">
                                            <img src="<?=$path?>/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`" style="width: 50px;height: auto;">
                                        </div>
                                        <div style="padding-left: 10px;padding-right: 10px;" class="col-md-5 col-xs-5">
                                            <h4 style="margin-top: 0;">`+result.daftar[i].nama+`</h4><p style="color: #808080;font-size: 10px;">`+result.daftar[i].nama_kelola+`</p>
                                        </div>
                                        <div style=" text-align:center;padding: 3px;" class="col-md-4 col-xs-4 text-align:center">
                                            <h6 style="margin-top: 0px;font-size: 10px;">SPI (%)</h6>
                                            <span style="padding: 5px;border-radius: 5px;color:`+warna+`" class="">`+tanda+` `+sepNum(result.daftar[i].spi_buku)+`</span>
                                            <h6 style="font-size: 8px;color:#808080;">update <?=$tglakhir?> </h6>
                                        </div>
                                    </div>
                                </div>
                            </div>     
                        </div>`;
                        
                    }
                    $('#reksadana').html(html);
                    
                    break;   
                }
            }
        }
    });
}
function initDash(){

    loadService('daftar_reksadana','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDaftarRD','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|<?=$jenis?>');                
    
}
    
initDash();
$('.panel').on('click', '#btn-filter', function(){
  $('#modalFilter').addClass('bottom');
  $('#modalFilter').modal('show');
});

$('.modal-body').on('click','#btnOk',function(){
    var kode_rdkelola = $('#kode_rdkelola')[0].selectize.getValue();
    var sort_by = $('input[name=order_by]:checked').val()
    var nama_sort = 'spi_buku';
    loadService('daftar_reksadana','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getDaftarRD','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_klp?>|<?=$jenis?>|'+kode_rdkelola+'|'+nama_sort+'|'+sort_by);


    $('#modalFilter').modal('hide');
});

$('.panel').on('click','.klik',function(){
    var kode_rd = $(this).closest('div').find('h1').text();
    window.location.href="<?=$root_app."/mainmobile/ReksadanaDet/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param=$tglakhir|$kode_plan|$kode_klp|$box|$jenis|"?>"+kode_rd;
});


    
</script>