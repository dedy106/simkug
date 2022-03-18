<?php 
    session_start();
   
	$kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    // $logomain = $path.'/web/img/logo.png';
    // $mainname="Nama Perusahaan";

    // echo $_SESSION['isLogedIn'];
   
    $param = $_GET['param'];
    if($param != ""){
        $tmp=explode("|",$param);
        $tglakhir = $tmp[0];
        $kode_plan = $tmp[1];
        $kode_klp = $tmp[2];
    }
    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    //$path = "http://".$_SERVER["SERVER_NAME"]."/";	
	$path=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/";
	
    $poly1 = $path."image/Polygon1.png";
    $poly2 = $path."image/Polygon12.png";
    $group12 = $path."image/Group12.png";
    $group13 = $path."image/RpRed.png";
    $group14 = $path."image/spi.png";
    $group15 = $path."image/coins2.svg";

    $tmp=explode("/",$_GET['param']);

	 if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 0px solid #e6e2e2;'>
        <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b>
        <span class='pull-right' style='font-size: 10px;'>".date('d-m-Y')."</span></span>
        </a>
        </header>";
        $padding="border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }
    
    // echo $header;
?>
<style type="text/css">

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
.kotak{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    height:100px; 
    width: 220px; 
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
    font-size:12px !important
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
        <div class="row" style='margin-bottom:10px'>
            <div class="col-md-12">
                <h3 style="margin-top: 0px;margin-bottom: 5px;">Alokasi Aset <span id='jplan'></span> 
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span></h3>
                <p id="tglChart" style="font-weight: normal;font-size: 12px;color: #808080;">s.d. dd/mm/yyyy</p>
                <!-- <button type="button" id="btn-filter" style="border: 1px solid #007AFF;border-radius: 20px;padding: 2px 10px;background: #007AFF;color: white;" class="pull-right btn-sm">Filter
                </button>
                <button type="button" id="btn-tgl" style="border: 1px solid #007AFF;border-radius: 20px;padding: 2px 10px;background: #007AFF;color: white;" class="pull-right btn-sm">Tanggal
                </button> -->
                <!-- <button type="button" id="btn-refresh" style="border: 1px solid #007AFF;border-radius: 20px;padding: 2px 10px;background: #007AFF;color: white;" class="pull-right btn-sm">Refresh
                </button> -->
                <span id='kode_plan' hidden></span>
                <span id='kode_klp' hidden></span>
            </div>
        </div>
        <div class='row'>
            <div class='col-md-6 col-xs-6 pad-more'>
                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                    <div class='panel-body' style='padding:7px;'>
                        <center>
                            <p style='color: #808080;margin-top: 10px;margin-bottom: 0px;'>Total Return</p>
                            <p style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:8px'>&nbsp;Year To Date</p>
                        </center>
                        <br>
                        <div class='col-md-12 col-xs-12'>
                            <p style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:10px'>&nbsp;Pendapatan</p>
                        </div>
                        <div class='col-md-4 col-xs-4'>
                            <img src='<?php echo $group12; ?>' style='width: 30px;'>
                        </div>
                        <div class='col-md-8 col-xs-8'>
                            <h4 class='font-weight-bold' id='totPend' style='margin-top: 5px;margin-bottom: 10px;'>NULL</h4>
                        </div>
                        <div class='col-md-12 col-xs-12' style='margin-top:31px'>
                            <p style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:10px'>&nbsp;SPI</p>
                        </div>
                        <div class='col-md-4 col-xs-4'>
                            <img src='<?php echo $group14; ?>' style='width: 30px;'>
                        </div>
                        <div class='col-md-8 col-xs-8'>
                            <h4 class='font-weight-bold' id='totSPI' style='margin-top: 5px;margin-bottom: 10px;'>NULL</h4>
                        </div>
                        <div class='col-md-12 col-xs-12' style='margin-top:31px'>
                            <p style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:10px'>&nbsp;Beban Investasi</p>
                        </div>
                        <div class='col-md-4 col-xs-4'>
                            <img src='<?php echo $group13; ?>' style='width: 30px;'>
                        </div>
                        <div class='col-md-8 col-xs-8'>
                            <h4 class='font-weight-bold' id='totBeb' style='margin-top: 5px;margin-bottom: 10px;'>NULL</h4>
                        </div>
                        <div class='col-md-12 col-xs-12' style='margin-top:31px'>
                            <p style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:10px'>&nbsp;Hasil Net Investasi</p>
                        </div>
                        <div class='col-md-4 col-xs-4'>
                            <img src='<?php echo $group15; ?>' style='width: 30px;'>
                        </div>
                        <div class='col-md-8 col-xs-8'>
                            <h4 class='font-weight-bold' id='totNet' style='margin-top: 5px;margin-bottom: 10px;'>NULL</h4>
                        </div>
                    </div>
                </div>
            </div>
            <div class='col-md-6 col-xs-6 pad-more'>
                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                    <div class='panel-body' style='padding:7px'>
                    <center><p style='color: #808080;margin-top: 10px;margin-bottom: 0px;'>&nbsp;ROI Total</p></center>
                    <center><h2 class='font-weight-bold' id='totROI' style='margin-top: 5px;margin-bottom: 10px;'></h2>
                    </center>
                    </div>
                </div>
            </div>
            <div class='col-md-6 col-xs-6 pad-more'>
                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                    <div class='panel-body' style='padding:7px'>
                        <center><p style='color: #808080;margin-top: 10px;margin-bottom: 0px;'>Plan Aset</p>
                        <p style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:8px' id='thnSebelum'></p>
                        </center>
                        <div class='col-md-4 col-xs-4' id='iconPoly'>
                        </div>
                        <div class='col-md-8 col-xs-8' style='padding-left:0px'>
                            <h2 class='font-weight-bold' id='persenAset' style=''></h2>
                        </div>
                    </div>
                </div>
            </div>
            <div class='col-md-6 col-xs-6 pad-more'>
                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                    <div class='panel-body' style='padding:7px'>
                    <center><p style='color: #808080;margin-top: 10px;margin-bottom: 0px;'>Total Plan Aset</p>
                    <h2 class='font-weight-bold' id='totAlokasi' style='margin-top: 5px;margin-bottom: 10px;'></h2>
                    </center>
                    </div>
                </div>
            </div>
            <div class='col-md-6 col-xs-6 pad-more'>
                <div class='panel mar-mor box-wh' style='border-radius:15px;padding-bottom: 4px;'>
                    <div class='panel-body' style='padding:7px'>
                    <center><p style='color: #808080;margin-top: 10px;margin-bottom: 0px;'>&nbsp;Cash Out</p>
                    <p style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:8px'>&nbsp;CAPEX,OPEX,Claim Cost</p></center>
                    <center><h2 class='font-weight-bold' id='capex' style='margin-top: 5px;margin-bottom: 10px;'>NULL</h2></center>
                    </div>
                </div>
            </div>
            <a href='#' id=''>
                <div class='col-md-12 col-xs-12 pad-more'>
                    <div class='panel mar-mor' style='box-shadow: none;'>
                        <div class='panel-body' style='padding:0'>
                            <div id='aset' style='margin:0'>
                            </div>
                        </div>
                    </div>
                </div>
            </a>
            <div class='col-md-12 col-xs-12 pad-more' id='BatasAlokasi'>
                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                    <div class='panel-body' style='padding:7px'>
                        <h3 class='font-weight-light' style='color: #000000; margin-top: 0.9rem; padding-left: 15px;margin-bottom:20px'>Realisasi dan Batasan Alokasi</h3>
                        <table class='table table-striped table-bordered' id='table-alokasi' style='font-size: 10px;'>
                            <thead>
                                <tr>
                                    <th>Kelompok Aset</th>
                                    <th>Min</th>
                                    <th>Acuan</th>
                                    <th>Max</th>
                                    <th>Alokasi</th>
                                    <th>ROI</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>   
        </div>
        <!-- Modal Filter -->
        <div class='modal fade' tabindex='-1' role='dialog' id='modalFilter'>
            <div class='modal-dialog modal-md' role='document'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title'>Filter</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                        </button>
                    </div>
                    <div class='modal-body'>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Jenis Plan Aset</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <select class='form-control selectize' id='kode_plan_inp'>
                                        <option val='' disabled>Pilih Plan Aset</option>
                                        <?php
                                        // $rsplan = execute("select kode_plan,nama from inv_plan ");
                                        // while($row=$rsplan->FetchNextObject($toupper=false)){
                                            
                                        //     echo"<option value='$row->kode_plan' >$row->kode_plan - $row->nama</option>";
                                        // }
                                        ?>
                                        </select>   
                                    </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Komposisi</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select class='form-control selectize' id='kode_klp_inp'>
                                        <option val='' disabled>Pilih Komposisi</option>
                                        <?php
                                        // $rsklp = execute("select kode_klp from inv_persen ");
                                        // while($row=$rsklp->FetchNextObject($toupper=false)){
                                        //     echo"<option value='$row->kode_klp' >$row->kode_klp - [Campuran-Saham]</option>";
                                        // }
                                        ?>
                                        </select>      
                                    </div>
                            </div>
                        </div>
                        <div class='row text-right' style='margin-top:30px'>
                            <div class='form-group'>
                                <div class='col-sm-12' style='margin-bottom:5px;padding-right:10px'>
                                <button type='button' class='btn btn-primary' id='btnOk'>Tampilkan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
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
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
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
function getParamDefault(param = null){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getParamDefault',
        dataType: 'json',
        async: false,
        data: {'param':param},
        success:function(result){    
            if(result.status){
                
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
function getListPlan(){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getListPlan',
        dataType: 'json',
        async: false,
        data: {},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#kode_plan_inp')[0].selectize.addOption([{text:result.daftar[i].kode_plan + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_plan}]);  
                    }
                }
            }
        }
    });
}

function getListKomposisi(){

    $.ajax({
        type: 'GET',
        url: '<?php echo $root_ser; ?>/dashYakesInvesMob.php?fx=getListKomposisi',
        dataType: 'json',
        async: false,
        data: {},
        success:function(result){    
            if(result.status){
                // console.log(result.status);
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#kode_klp_inp')[0].selectize.addOption([{text:result.daftar[i].kode_klp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_klp}]);  
                        // console.log(result.daftar[i].nama);
                    }
                }
            }
        }
    });
}

function loadService(index,method,url,param=null){
    $.ajax({
        type: method,
        url: url,
        dataType: 'json',
        async: false,
        data: {'periode':'<?php echo $periode?>','param':param},
        success:function(result){    
            if(result.status){
                switch(index){
                    case 'asetchart':               
                    Highcharts.chart('aset', {
                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false,
                            type: 'pie'
                        },
                        title: {
                            text: ''
                        },
                        // subtitle: {
                        //     text: 'Keterangan',
                        //     floating: true,
                        //     align: 'right',
                        //     verticalAlign: 'top',
                        //     style: {
                        //         color: 'black',
                        //         fontSize: '14px',
                        //         fontWeight: 'bold'
                        //     },
                        //     y: 30,
                        //     x: -130
                        // },
                        tooltip: {
                            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br><b>{point.y}</b>'
                        },
                        legend: {
                            enabled: true,
                            // layout: 'vertical',
                            // align: 'right',
                            // width: '300px',
                            // y:50,
                            // verticalAlign: 'top',
                            useHTML: true,
                            labelFormatter: function() {
                                if(this.percentage > this.key){
                                    return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right;color:red; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                }else{
                                    return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                }
                                
                            }
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: false,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: false
                                },
                                showInLegend: true,
                                size:'110%',
                                point:{
                                    events : {
                                        legendItemClick: function(e){
                                            var elemenTujuan = $('#BatasAlokasi');
                                            $('html,body').animate({
                                                scrollTop: 700
                                            },1200,'swing');
                                            e.preventDefault();
                                        },
                                        click: function() {
                                            var id = this.kunci;                            
                                            var tgl = $('#tglChart').text();
                                            var tgl2 = tgl.split(' ');
                                            var filtertgl = reverseDate(tgl2[1]);
                                                // alert (filtertgl);
                                            var plan = $('#kode_plan').text();
                                            var kode_klp = $('#kode_klp').text();
                                            window.location.href="<?=$root_app."/mainmobile/HomeDet/?kode_lokasi=$kode_lokasi&periode=$periode&nik=$nik&param="; ?>"+filtertgl+"|"+plan+"|"+kode_klp+"|"+id;
                                        }
                                    }
                                }
                            }
                        },
                        series: [{
                            name: 'Brands',
                            colorByPoint: true,
                            data: [{
                                    name: 'Kas',
                                    y: parseFloat(result.kas),
                                    color:'#007AFF',
                                    key: result.kas_acuan,
                                    kunci: 'KAS',
                                }, {
                                    name: 'Pend Tetap',
                                    y: parseFloat(result.ebt),
                                    color:'#4CD964',
                                    key: result.ebt_acuan,
                                    kunci: 'EBT',
                                }, {
                                    name: 'Saham Bursa',
                                    y: parseFloat(result.saham),
                                    color:'#FFCC00',
                                    key: result.saham_acuan,
                                    kunci: 'SB',
                                }, {
                                    name: 'Saham Non Publik',
                                    y: parseFloat(result.propensa),
                                    color:'#FF2D55',
                                    key: result.pro_acuan,
                                    kunci: 'PRO',
                            }]
                        }],
                        credits:{
                            enabled:false
                        }
                    });
                    break;
                    case 'chartAlokasi':
                        var html ='';
                        html += `<tr>
                            <td>Kas</td>
                            <td>`+result.kas.bawah+`</td>
                            <td>`+result.kas.acuan+`</td>
                            <td>`+result.kas.atas+`</td>`;
                        if(result.kas.persen > result.kas.acuan){
                            html+=`
                            <td style='font-weight:bold;color:red'>`+sepNum(result.kas.persen)+`</td>`;
                        }else{
                            html+=`
                            <td>`+sepNum(result.kas.persen)+`</td>`;
                        }
                        html+=`<td>`+sepNum(result.kas.roi)+`</td></tr>`;//KAS
                        html += `<tr>
                            <td>Pend Tetap</td>
                            <td>`+result.ebt.bawah+`</td>
                            <td>`+result.ebt.acuan+`</td>
                            <td>`+result.ebt.atas+`</td>`;
                        if(result.ebt.persen > result.ebt.acuan){
                            html+=`
                            <td style='font-weight:bold;color:red'>`+sepNum(result.ebt.persen)+`</td>`;
                        }else{
                            html+=`
                            <td>`+sepNum(result.ebt.persen)+`</td>`;
                        }
                        html+=`<td>`+sepNum(result.ebt.roi)+`</td></tr>`;//PEND TETAP
                        html += `<tr>
                            <td>Saham Bursa</td>
                            <td>`+result.saham.bawah+`</td>
                            <td>`+result.saham.acuan+`</td>
                            <td>`+result.saham.atas+`</td>`;
                        if(result.saham.persen > result.saham.acuan){
                            html+=`
                            <td style='font-weight:bold;color:red'>`+sepNum(result.saham.persen)+`</td>`;
                        }else{
                            html+=`
                            <td>`+sepNum(result.saham.persen)+`</td>`;
                        }
                        html+=`<td>`+sepNum(result.saham.roi)+`</td></tr>`;//Saham
                        html += `<tr>
                            <td>Saham Non Publik</td>
                            <td>`+result.pro.bawah+`</td>
                            <td>`+result.pro.acuan+`</td>
                            <td>`+result.pro.atas+`</td>`;
                        if(result.pro.persen > result.pro.acuan){
                            html+=`
                            <td style='font-weight:bold;color:red'>`+sepNum(result.pro.persen)+`</td>`;
                        }else{
                            html+=`
                            <td>`+sepNum(result.pro.persen)+`</td>`;
                        }
                        html+=`<td>`+sepNum(result.pro.roi)+`</td></tr>`;//PROPENSA
                        $('#table-alokasi tbody').html(html);
                    break;
                    case 'persenAset':
                        $('#persenAset').text(result.persen+'%');
                        if(result.persen < 0) {
                            $('#iconPoly').html('<img style=\'width: 20px;padding-top: 15px;\' src=\'<?php echo $poly2 ?>\'>');
                        }else{
                            $('#iconPoly').html('<img style=\'width: 20px;padding-top: 15px;\' src=\'<?php echo $poly1 ?>\'>');
                        }
                    break;
                    case 'roiKKP' :
                        $('#totROI').text(sepNum(result.roi_total)+'%');
                        $('#totSPI').text(toMilyar(result.data.spi));
                        $('#capex').text(toMilyar(result.data.cash_out));
                        $('#totPend').text(toMilyar(result.data.pdpt));
                        $('#totBeb').text(toMilyar(result.data.beban_inves));
                        var net = (parseFloat(result.data.pdpt)+parseFloat(result.data.spi))+parseFloat(result.data.beban_inves);
                        $('#totNet').text(toMilyar(net));
                    break;
                    case 'totAlokasi':
                        $('#totAlokasi').text(toMilyar(result.total));
                    break;
                        
                }
            }
        }
    });
}
function initDash(){
    var param = '<?= $param ?>';
    if(param == ""){
        loadService('asetchart','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getAset',''); 
        loadService('persenAset','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getPersenAset','');
        loadService('chartAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getBatasAlokasi',''); 
        loadService('totAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getTotalAlokasi',''); 
        loadService('roiKKP','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getRoiKkp','');
    }else{
        loadService('asetchart','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getAset','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_plan?>'); 
        loadService('persenAset','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getPersenAset','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_plan?>');
        loadService('chartAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getBatasAlokasi','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_plan?>'); 
        loadService('totAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getTotalAlokasi','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_plan?>'); 
        loadService('roiKKP','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getRoiKkp','<?=$tglakhir?>|<?=$kode_plan?>|<?=$kode_plan?>');
    }
     
}
$(document).ready(function(){
    
    var par = '<?= $param ?>';
    if(par == ""){
        getParamDefault();
    }else{
        getParamDefault(par);
    }
    // getListKomposisi();
    // getListPlan();

       
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

    $('.panel').on('click', '#btn-refresh', function(){
        location.reload();
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
        // $('#my_hidden_input').val(
            
            // alert($('#calendar').datepicker('getFormattedDate'));
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
                $('#kode_klp_view').text(view_klp(kode_klp));
                loadService('asetchart','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getAset',tglreverse+'|'+plan+'|'+kode_klp); 
                loadService('persenAset','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getPersenAset',tglreverse+'|'+plan+'|'+kode_klp);
                loadService('chartAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getBatasAlokasi',tglreverse+'|'+plan+'|'+kode_klp); 
                loadService('totAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getTotalAlokasi',tglreverse+'|'+plan+'|'+kode_klp); 
                loadService('roiKKP','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getRoiKkp',tglreverse+'|'+plan+'|'+kode_klp); 
                
                $('aside').removeClass('control-sidebar-open');
                $('.tab-content').hide();
            }
            
            // );
            
        $('#modalTanggal').modal('hide');
    });
    $('.datepicker-inline').width('100%');
    $('.table-condensed').width('100%');

    $('.modal-body').on('click','#btnOk',function(){
        
        var tgl = $('#tglChart').text();
        var tgl2 = tgl.split(' ');
        var filtertgl = reverseDate(tgl2[1]);
        // alert (filtertgl);
        var plan = $('#kode_plan_inp')[0].selectize.getValue();
        var kode_klp = $('#kode_klp_inp')[0].selectize.getValue();
        var nama_plan = $('#kode_plan_inp')[0].selectize.getItem($('#kode_plan_inp')[0].selectize.getValue()).text();
        var nama_plan = nama_plan.split(' - ');
        // $('#jplan').text(nama_plan[1]);
        
        $('#kode_plan').text(plan);
        $('#kode_klp').text(kode_klp);
        $('#kode_klp_view').text(view_klp(kode_klp));
        loadService('asetchart','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getAset',filtertgl+'|'+plan+'|'+kode_klp); 
        loadService('persenAset','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getPersenAset',filtertgl+'|'+plan+'|'+kode_klp);
        loadService('chartAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getBatasAlokasi',filtertgl+'|'+plan+'|'+kode_klp); 
        loadService('totAlokasi','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getTotalAlokasi',filtertgl+'|'+plan+'|'+kode_klp); 
        loadService('roiKKP','GET','<?=$root_ser?>/dashYakesInvesMob.php?fx=getRoiKkp',filtertgl+'|'+plan+'|'+kode_klp); 
        $('#modalFilter').modal('hide');
    });
});


 
    
</script>