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
class server_report_saku3_dash_rptDashTarbakPiu extends server_report_basic
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

        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        $link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/tarbak";
        $root=$link;
		$path = $link."/";	
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";
        
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
            .card{
                box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
                border-radius:10px;
            }
            /* NAV TABS */
            .nav-tabs-custom2 {
                margin-bottom: 10px;
                margin-top: -30px;
                background: #fff;
                box-shadow: none;
                border-radius: 3px;
            }
            .nav-tabs-custom2 > .nav-tabs {
                margin: 0;
                width: 100%;
                border: 1px solid #00000029;
                border-radius: 30px;
                padding: 5px;
                padding-left: 5px;
                height: 40px;
                padding-left: 30px;
            }
            .nav-tabs-custom2 > .nav-tabs > li {
                // border-top: 3px solid transparent;
                margin-bottom: -2px;
                margin-right: 5px;
            }
            .nav-tabs-custom2 > .nav-tabs > li.disabled > a {
                color: #777;
            }
            .nav-tabs-custom2 > .nav-tabs > li > a {
                color: #444;
                // border-radius: 0;
                font-size: 16px;
                padding: 2px 25px;
                // border-radius: 20px;
            }
            .nav-tabs-custom2 > .nav-tabs > li > a.text-muted {
                color: #999;
            }
            .nav-tabs-custom2 > .nav-tabs > li > a,
            .nav-tabs-custom2 > .nav-tabs > li > a:hover {
                // background: transparent;
                // margin: 0;
            }
            .nav-tabs-custom2 > .nav-tabs > li > a:hover {
                color: #999;
            }
            .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:hover,
            .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:focus,
            .nav-tabs-custom2 > .nav-tabs > li:not(.active) > a:active {
                border-color: transparent;
                padding: 2px 25px;
                border-radius: 20px;
            }
            .nav-tabs-custom2 > .nav-tabs > li.active {
            border-top-color: #3c8dbc;
            }
            .nav-tabs-custom2 > .nav-tabs > li.active > a,
            .nav-tabs-custom2 > .nav-tabs > li.active:hover > a {
            // background-color: #fff;
            // color: #444;
                padding: 2px 25px;
                border: 1px solid #1C68FF;
                border-radius: 20px;
                background:#1C68FF;
                color:white;
            }
            .nav-tabs-custom2 > .nav-tabs > li.active > a {
                // border-top-color: transparent;
                // border-left-color: #f4f4f4;
                // border-right-color: #f4f4f4;
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
            border-top-color: #3c8dbc;
            }
            .nav-tabs-custom2.tab-info > .nav-tabs > li.active {
            border-top-color: #00c0ef;
            }
            .nav-tabs-custom2.tab-danger > .nav-tabs > li.active {
            border-top-color: #dd4b39;
            }
            .nav-tabs-custom2.tab-warning > .nav-tabs > li.active {
            border-top-color: #f39c12;
            }
            .nav-tabs-custom2.tab-success > .nav-tabs > li.active {
            border-top-color: #00a65a;
            }
            .nav-tabs-custom2.tab-default > .nav-tabs > li.active {
            border-top-color: #d2d6de;
            }
            td{
                padding:3px !important;
            }
        </style>
		<div class='panel' style='box-shadow:none'>
            <div class='panel-heading' style='font-size:18px;padding:10px 15px 1px 15px;height:60px'>&nbsp;
                <!--<div class='pull-right navigasi' style='margin-right: 0; margin-top: ; padding-bottom: 1rem;'>
                    <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                    <span id='btn-refresh' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                    <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                </div>-->
                <div class='nav-tabs-custom2' style=''>
                    <ul class='nav nav-tabs'>
                        <li class='active'><a href='#piu' data-toggle='tab'>Piutang</a></li>
                        <li class=''><a href='#agg' data-toggle='tab'>Anggaran</a></li>
                        <li class=''><a href='#pbh' data-toggle='tab'>Pembendaharaan</a></li>
                        <li class='pull-right'><a href='#' id='btn-refresh' style='margin-right:0px;padding:5px;border-radius: 15px;color: white;' class='btn btn-info btn-sm'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a></li>
                    </ul>
                </div>
            </div>
            <div class='panel-body' style='padding-top:0'>
                <div class='tab-content'>
                    <div class='tab-pane active' id='piu'>
                        <div class='row' style='background:#F7F7F7;height:200px;margin:0px;margin-bottom:15px;border-radius: 10px;'>
                            <div style='bottom: -40px;padding-left: 30px;' class='col-md-3'>
                                <h6 style=''>Penerimaan <span id='blnTerima'></span></h6>
                                <h1 style='font-size: 58px;' id='perTerima'></h1>
                            </div>
                            <div class='col-md-5'>
                                <div id='piuStatus' style='height:170px;padding-top: 10px;'>
                                </div>
                            </div>
                            <div class='col-md-4' style='bottom: -20px;'>
                                <h4 style='font-weight:bold'>Rincian Piutang</h4>
                                <table width='100%' border=0 id='rinciPiu'>
                                    <tbody>

                                    </tboy>
                                </table>
                            </div>
                        </div>
                        <div class='row' style='margin-bottom:15px'>
                            <div class='col-md-3'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>Piutang per Tahun ajaran aktif</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='piuAjarAktif' style='padding:20px; height: 300px; max-width: 400px; margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>Piutang tidak tertagih Tahun Ajaran 2019/2020</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='piuTakTagih' style='padding:20px; height: 300px; margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-3'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row' style='height: 360px;'>
                                            <div class='col-md-12' >
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>Komposisi Piutang</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='komposisiPiu' style='padding:20px; height: 250px; width: 280px; margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row' style='margin-bottom:15px'>
                            <div class='col-md-4'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>Perbandingan saldo piutang</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='saldoPiuBanding' style='padding:20px; height: 300px; max-width: 400px; margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-4'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>Umur Piutang</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='umurPiu' style='padding:20px; height: 300px; margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-4'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>Saldo piutang</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='saldoPiu' style='padding:20px; height: 300px; max-width: 400px; margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='tab-pane' id='agg'>
                        <div class='row' style='background:#F7F7F7;height:200px;margin:0px;margin-bottom:15px;border-radius: 10px;'>
                            <div style='padding-left: 30px;' class='col-md-3'>
                                <h3 style='font-weight:300'>Penyerapan Anggaran <span id='blnSerap'></span></h3>
                                <table style='margin-top: 30px;' width='100%' border=0 id='rinciSerap'>
                                    <tbody>

                                    </tboy>
                                </table>
                            </div>
                            <div class='col-md-7'>
                                <div id='chartSerap' style='height:170px;padding-top: 10px;'>
                                </div>
                            </div>
                            <div class='col-md-2' style=''>
                                <div id='persenSerap' style='height:160px;border-radius:50%;background:white;border:1px solid #1C68FF;text-align: center;margin-top: 8px;'><h1 style='font-size:50px;margin-top: 50px;' id='perSerap'></h1></div>
                            </div>
                        </div>
                        <div class='row' style='margin-bottom:15px'>
                            <div class='col-md-6'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>Pennyerapan Anggaran Tahun Fiskal</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='serapFiskal' style='padding:20px; height: 300px;margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-6'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <div class='row'>
                                            <div class='col-md-12'>
                                                <h4 class='card-title' style='padding-left:20px;margin:20px auto'>RRA Anggaran</h4>
                                            </div>
                                            <div class='col-md-12'>
                                                <div id='rraAgg' style='padding:20px; height: 300px; margin: 0 auto'>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='tab-pane' id='pbh'>
                        <div class='row' style='background:white;height:320px;margin:0px;margin-bottom:15px;border-radius: 10px;border: 1px solid #D9D9D9;'>
                            <div style='margin-top: 10px;margin-bottom: 10px;border-right: 1px solid #D9D9D9;' class='col-md-8'>
                                <form id='cariPosisi'>
                                    <div class='form-group'>
                                        <div class='col-sm-11'>
                                            <input type='email' class='form-control' id='inputEmail3' style='border-top: 0;border-right: 0;border-left: 0;' placeholder='Cari'>
                                        </div>
                                        <a href='#' id='btnCari' style='border-top:none;border-right:none;border-left:none;' class='col-sm-1'><i style='color:#007AFF;line-height: 35px;' class='fa fa-search fa-lg'></i></a>
                                    </div>
                                </form>
                                <div class='row'>
                                    <div id='chartPosisi' style='padding:0px 20px; height: 250px; margin: 0 auto'></div>
                                </div>
                            </div>
                            <div style='margin-top: 10px;' class='col-md-4'>
                                <table id='rinciPbh' width='100%'>
                                    <thead style='color:#9D9D9D'>
                                        <tr>
                                            <td></td>
                                            <td>Reject</td>
                                            <td>Posisi</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <div class='row'>
                            <div style='margin-top: 10px;' class='col-md-12'>
                                <h4>Daftar Posisi Pengajuan</h4>
                                <table id='tablePosisi' class='table table-striped' width='100%'>
                                    <thead style='background:#1C68FF;color:white'>
                                        <tr>
                                            <td>No</td>
                                            <td>Kode</td>
                                            <td>Nama</td>
                                            <td>Keterangan</td>
                                            <td>Relasi</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>";
            echo"
            </div>
        </div>";

        echo "
        <script src='https://code.highcharts.com/modules/timeline.js'></script>
        <script src='https://code.highcharts.com/modules/accessibility.js'></script>
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

            function getNamaBulan(no_bulan){
                switch (no_bulan){
                    case 1 : case '1' : case '01': bulan = 'Januari'; break;
                    case 2 : case '2' : case '02': bulan = 'Februari'; break;
                    case 3 : case '3' : case '03': bulan = 'Maret'; break;
                    case 4 : case '4' : case '04': bulan = 'April'; break;
                    case 5 : case '5' : case '05': bulan = 'Mei'; break;
                    case 6 : case '6' : case '06': bulan = 'Juni'; break;
                    case 7 : case '7' : case '07': bulan = 'Juli'; break;
                    case 8 : case '8' : case '08': bulan = 'Agustus'; break;
                    case 9 : case '9' : case '09': bulan = 'September'; break;
                    case 10 : case '10' : case '10': bulan = 'Oktober'; break;
                    case 11 : case '11' : case '11': bulan = 'November'; break;
                    case 12 : case '12' : case '12': bulan = 'Desember'; break;
                    default: bulan = null;
                }
                return bulan;
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
                                case 'perTerima':
                                    $('#blnTerima').text(getNamaBulan(result.blnTerima.substr(4,2))+' '+result.blnTerima.substr(0,4));
                                    $('#perTerima').text(sepNum(result.persen)+' %');
                                break;
                                case 'piuStatus':
                                    Highcharts.chart('piuStatus', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie',
                                            backgroundColor: '#F7F7F7'
                                        },
                                        title: {
                                            text: null
                                        },
                                        tooltip: {
                                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        accessibility: {
                                            point: {
                                                valueSuffix: '%'
                                            }
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    format: '<b>{point.name}</b>'
                                                },
                                                size:'110%'
                                            }
                                        },
                                        credits:{
                                            enabled:false
                                        },
                                        series: result.series
                                    });
                                break;
                                case 'rinciPiu':
                                    var html='';
                                    var data = result.daftar;
                                    for(var i=0;i<data.length;i++){
                                        line = data[i];
                                        html+=`<tr>
                                            <td>`+line.nama+`</td>
                                            <td>`+sepNumPas(line.nilai)+`</td>
                                            <td>`+line.jumlah+` siswa</td>
                                        </tr>`;
                                    }
                                    $('#rinciPiu tbody').html(html);
                                break;
                                case 'piuAjarAktif':
                                    Highcharts.chart('piuAjarAktif', {
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: null
                                        },
                                        xAxis: {
                                            categories: result.category,
                                            crosshair: true
                                        },
                                        credits:{
                                            enabled:false
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: null
                                            },
                                            labels: {
                                                style: {
                                                    color: 'white'
                                                }
                                            }
                                        },
                                        legend:{
                                            enabled:false
                                        },
                                        tooltip: {
                                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                '<td style=\"padding:0\"><b>{point.y} siswa</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        plotOptions: {
                                            column: {
                                                     pointPadding: 0,
                                                borderWidth: 0,
                                                dataLabels: {
                                                    enabled: true,
                                                     format: '{y} siswa'
                                                }
                                            },
                                            series: {
                                                groupPadding: 0
                                            }
                                        },
                                        colors:['#1C68FF','#FF9500','#4CD964'],
                                        series: [{
                                                colorByPoint:true,
                                            name: 'Piutang aktif',
                                            data: result.data
                                    
                                        }]
                                    });
                                break;
                                case 'piuTakTagih':
                                    Highcharts.chart('piuTakTagih', {
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: null
                                        },
                                        xAxis: {
                                            categories: [
                                                'Jan',
                                                'Feb',
                                                'Mar',
                                                'Apr',
                                                'May',
                                                'Jun',
                                                'Jul',
                                                'Aug',
                                                'Sep',
                                                'Oct',
                                                'Nov',
                                                'Dec'
                                            ],
                                            crosshair: true
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: null
                                            },
                                            labels: {
                                                style: {
                                                    color: 'white'
                                                }
                                            }
                                        },
                                        tooltip: {
                                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                '<td style=\"padding:0\"><b>{point.y}</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        plotOptions: {
                                            column: {
                                                pointPadding: 0.2,
                                                borderWidth: 0
                                            }
                                        },
                                        credits:{
                                            enabled:false
                                        },
                                        legend:{
                                            enabled:false
                                        },
                                        series: [{
                                                color:'#FF2D55',
                                            name: 'Piutang',
                                            data: [49.9, 71.5, 20.4, 50.2, 60.0, 70.0, 10.6, 40.5, 60.4, 50.1, 95.6, 54.4]
                                    
                                        }]
                                    });
                                break;
                                case 'komposisiPiu':
                                    Highcharts.chart('komposisiPiu', {
                                        title: {
                                          text: 's.d. 2019',
                                              align: 'center',
                                              verticalAlign: 'middle',
                                              y: 55,
                                              style: {
                                               
                                                fontSize: '11px'
                                            }
                                        },
                                        tooltip: {
                                          pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        plotOptions: {
                                          pie: {
                                            center: ['50%', '100%'],
                                            dataLabels: {
                                                      enabled: true,
                                                      distance: -50,
                                                      border:0,
                                                      style: {
                                                          fontWeight: 'bold',
                                                          color: 'white'
                                                      },
                                                      format:\"{point.percentage:0.2f} %\"
                                                  },
                                            startAngle: -90,
                                            endAngle: 90,
                                            showInLegend: true
                                          }
                                        },
                                        legend: {
                                            itemStyle: {
                                                fontSize: '10px'
                                            },
                                            itemMarginTop: 0,
                                            itemMarginBottom: 0,
                                            align: 'center',
                                            verticalAlign: 'bottom',
                                            y: 0,
                                            padding: 0
                                        },
                                        credits: {
                                          enabled: false
                                        },
                                        colors:['#FF9500','#1C68FF','#4CD964','#8E8E93'],
                                        series: [{
                                          type: 'pie',
                                          colorByPoint:true,
                                          name: 'Piutang',
                                          innerSize: '33%',
                                          size: '200%',
                                          data: [
                                                  ['SPP', 23],
                                                  ['DP', 19],
                                                  ['DPP', 21],
                                                  ['DPS', 37]
                                              ]
                                        }]
                                      });
                                      
                                break;
                                case 'saldoPiuBanding':
                                    // Build the chart
                                    Highcharts.chart('saldoPiuBanding', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
                                        },
                                        title: {
                                            text:null
                                        },
                                        tooltip: {
                                            pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                                        },
                                        accessibility: {
                                            point: {
                                                valueSuffix: '%'
                                            }
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    distance: -50,
                                                    format:'{point.percentage:0.2f} %'
                                                },
                                                showInLegend: true
                                            }
                                        },
                                        credits:{
                                            enabled:false
                                        },
                                        colors:['#FF9500','#8E8E93'],
                                        series: [{
                                            name: 'Saldo Piutang',
                                            colorByPoint: true,
                                            data: [{
                                                name: 'Aktif',
                                                y: 75,
                                            }, {
                                                name: 'Non Aktif',
                                                y: 25
                                            }]
                                        }]
                                    });
                                break;
                                case 'umurPiu':
                                    Highcharts.chart('umurPiu', {
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: null
                                        },
                                        xAxis: {
                                            categories: [
                                                '< 1 bulan',
                                                '< 1 tahun',
                                                '< 2 tahun',
                                                '< 3 tahun',
                                                '> 3 tahun',
                                            ],
                                            crosshair: true
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: null
                                            },
                                            labels: {
                                                style: {
                                                    color: 'white'
                                                }
                                             }
                                        },
                                        tooltip: {
                                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                '<td style=\"padding:0\"><b>{point.y:.1f} mm</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        plotOptions: {
                                            column: {
                                                pointPadding: 0.2,
                                                borderWidth: 0
                                            }
                                        },
                                        credits:{
                                            enabled:false,
                                        },
                                        legend:{
                                            enabled:false,
                                        },
                                        series: [{
                                                color:'#5AC8FA',
                                            name: 'Tokyo',
                                            data: [10,7,8,9,6]
                                    
                                        }]
                                    });
                                break;
                                case 'saldoPiu':
                                    Highcharts.chart('saldoPiu', {
                                        xAxis: {
                                            categories: ['07/18', '08/18', '09/18', '10/18', '11/18', '12/18', '01/19', '02/19', '03/19', '04/19', '05/19', '06/19']
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: null
                                            },
                                            labels: {
                                                style: {
                                                    color: 'white'
                                                }
                                             }
                                        },
                                        legend:{
                                            enabled:false,
                                        },
                                        credits:{
                                            enabled:false,
                                        },
                                        title: {
                                            text:null
                                        },
                                        series: [{
                                            data: [29.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                                        }]
                                    });
                                break;
                                case 'chartSerap':
                                    Highcharts.chart('chartSerap', {
                                        chart: {
                                            type: 'column',
                                            backgroundColor: '#F7F7F7'
                                        },
                                        title: {
                                            text: null
                                        },
                                        xAxis: {
                                            categories: [
                                                'Gaji & Tunjangan',
                                                'Operasional',
                                                'Pemeliharaan',
                                                'Comsumable',
                                                'Investasi'
                                            ],
                                            crosshair: true
                                        },
                                        yAxis: {
                                            min: 0,
                                            title: {
                                                text: null
                                            },
                                            labels:{
                                                            style:{
                                                    color:'white'
                                                }        
                                            }
                                        },
                                        tooltip: {
                                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                '<td style=\"padding:0\"><b>{point.y}</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        plotOptions: {
                                            column: {
                                                pointPadding: 0.2,
                                                borderWidth: 0
                                            }
                                        },
                                        legend:{
                                                enabled:false
                                        },
                                        credits:{
                                                enabled:false
                                        },
                                        series: [{
                                            name: 'Tokyo',
                                            color:'#1C68FF',
                                            data: [10,8,12,10,8]
                                    
                                        }]
                                    });
                                break;
                                case 'rinciSerap':
                                    $('#blnSerap').text(getNamaBulan('01')+' 2020');
                                    $('#perSerap').text('92%');
                                    var html='';
                                    let data2 = [
                                        {
                                            'nama' : 'Anggaran',
                                            'nilai' : 1934938927
                                        },
                                        {
                                            'nama' : 'Aktual',
                                            'nilai' : '84948293' 
                                        },
                                        {
                                            'nama' : 'Sisa',
                                            'nilai' : 1847023039
                                        }
                                      ];
                                      
                                    console.log(data2);
                                    for(var i=0;i<data2.length;i++){
                                        line = data2[i];
                                        html+=`<tr>
                                            <td>`+line.nama+`</td>
                                            <td>`+sepNumPas(line.nilai)+`</td>
                                        </tr>`;
                                    }
                                    $('#rinciSerap tbody').html(html);
                                break;
                                case 'serapFiskal':
                                    Highcharts.chart('serapFiskal', {
                                        title: {
                                            text: null
                                        },
                                        xAxis: {
                                            categories: [
                                                'Jan',
                                                'Feb',
                                                'Mar',
                                                'Apr',
                                                'May',
                                                'Jun',
                                                'Jul',
                                                'Aug',
                                                'Sep',
                                                'Oct',
                                                'Nov',
                                                'Dec'
                                            ],
                                            crosshair: true
                                        },
                                         yAxis: {
                                            min: 0,
                                            title: {
                                                text: null
                                            },
                                            labels:{
                                                style:{
                                                    color:'white'
                                                }        
                                            }
                                        },
                                        tooltip: {
                                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                '<td style=\"padding:0\"><b>{point.y}</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        plotOptions: {
                                            column: {
                                                pointPadding: 0.2,
                                                borderWidth: 0
                                            },
                                            line : {
                                                marker: {
                                                    enabled: false
                                                }
                                            }
                                        }, 
                                        legend:{
                                                enabled:false
                                        },
                                        credits:{
                                                enabled:false
                                        },
                                        colors:['#5AC8FA','#FF2D55'],
                                        series: [{
                                            name: 'Penyerapan',
                                            type:'column',
                                            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                                    
                                        },{
                                            name: 'Batas',
                                            type:'line',
                                            data: [200,200,200,200,200,200,200,200,200,200,200,200]
                                    
                                        }]
                                    });
                                break;
                                case 'rraAgg':
                                    Highcharts.chart('rraAgg', {
                                        title: {
                                            text: null
                                        },
                                        xAxis: {
                                            categories: [
                                                'Jan',
                                                'Feb',
                                                'Mar',
                                                'Apr',
                                                'May',
                                                'Jun',
                                                'Jul',
                                                'Aug',
                                                'Sep',
                                                'Oct',
                                                'Nov',
                                                'Dec'
                                            ],
                                            crosshair: true
                                        },
                                         yAxis: {
                                            min: 0,
                                            title: {
                                                text: null
                                            },
                                            labels:{
                                                            style:{
                                                    color:'white'
                                                }        
                                            }
                                        },
                                        tooltip: {
                                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                '<td style=\"padding:0\"><b>{point.y}</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        plotOptions: {
                                            column: {
                                                pointPadding: 0.2,
                                                borderWidth: 0,
                                                stacking: 'normal',
                                            },
                                            line : {
                                                marker: {
                                                    enabled: false
                                                }
                                            }
                                        }, 
                                        legend:{
                                                enabled:false
                                        },
                                        credits:{
                                                enabled:false
                                        },
                                        colors:['#AFFFBD','#4CD964','#8085E9','#FF2D55'],
                                        series: [{
                                            name: 'A',
                                            type:'column',
                                            data: [0, 0, 40, 0, 0, 0, 0, 0, 60.4, 0, 0, 54.4]
                                    
                                        },{
                                            name: 'B',
                                            type:'column',
                                            data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4]
                                    
                                        },{
                                            name: 'C',
                                            type:'column',
                                            data: [49.9, 71.5, 0,39.2, 44.0, 76.0, 35.6, 48.5, 216.4, 94.1, 95.6, 0]
                                    
                                        },{
                                            name: 'Batas',
                                            type:'line',
                                            data: [400,400,400,400,400,400,400,400,400,400,400,400]
                                    
                                        }]
                                    });
                                break;
                                case 'chartPosisi':
                                    Highcharts.chart('chartPosisi', {
                                        chart: {
                                            type: 'timeline',
                                            height: 180
                                        },
                                        accessibility: {
                                            screenReaderSection: {
                                                beforeChartFormat: '<h5>{chartTitle}</h5>' +
                                                    '<div>{typeDescription}</div>' +
                                                    '<div>{chartSubtitle}</div>' +
                                                    '<div>{chartLongdesc}</div>' +
                                                    '<div>{viewTableButton}</div>'
                                            },
                                            point: {
                                                valueDescriptionFormat: '{index}. {point.label}. {point.description}.'
                                            }
                                        },
                                        xAxis: {
                                            visible: false
                                        },
                                        yAxis: {
                                            visible: false
                                        },
                                        credits:{
                                            enabled:false
                                        },
                                        legend:{
                                            enabled:false
                                        },
                                       title: {
                                            text: null
                                        },
                                           colors: [
                                            '#4CD964',
                                            '#4CD964',
                                            '#FF2D55',
                                            '#4CD964',
                                            '#4CD964',
                                            '#4CD964'
                                        ],
                                        series: [{
                                            data: [{
                                                name: 'Pengajuan',
                                                label: '08 Februari 2020 | 01-PB2002.0004',
                                                description: '08 Februari 2020 | 01-PB2002.0004 '
                                            }, {
                                                name: 'Pengajuan2',
                                                label: '08 Februari 2020 | 01-PB2002.0004',
                                                description: '08 Februari 2020 | 01-PB2002.0004 ',
                                                dataLabels:{
                                                    enabled:false
                                                }
                                            }, {
                                                name: 'Reject',
                                                label: '08 Februari 2020 | 01-PB2002.0004',
                                                description: '08 Februari 2020 | 01-PB2002.0004 '
                                            }, {
                                                name: 'Pengajuan3',
                                                label: '08 Februari 2020 | 01-PB2002.0004',
                                                description: '08 Februari 2020 | 01-PB2002.0004 ',
                                                 dataLabels:{
                                                    enabled:false
                                                }
                                            }, {
                                                name: 'Pengajuan4',
                                                label: '08 Februari 2020 | 01-PB2002.0004',
                                                description: '08 Februari 2020 | 01-PB2002.0004 ',
                                                 dataLabels:{
                                                    enabled:false
                                                }
                                            }, {
                                                name: 'Pengajuan5',
                                                label: '08 Februari 2020 | 01-PB2002.0004',
                                                description: '08 Februari 2020 | 01-PB2002.0004 ',
                                                 dataLabels:{
                                                    enabled:false
                                                }
                                            }]
                                        }]
                                    });
                                break;
                                case 'rinciPbh':
                                    var html='';
                                    var rs = [
                                        {
                                            'nama' : 'Pengajuan',
                                            'reject' : 5,
                                            'posisi' : 10
                                        },
                                        {
                                            'nama' : 'Verifikasi',
                                            'reject' : 1,
                                            'posisi' : 10 
                                        },
                                        {
                                            'nama' : 'SPB',
                                            'reject' : 2,
                                            'posisi' : 10
                                        },
                                        {
                                            'nama' : 'Pembayaran',
                                            'reject' : 2,
                                            'posisi' : 10
                                        }
                                      ];
                                      
                                    for(var i=0;i<rs.length;i++){
                                        line = rs[i];
                                        html+=`<tr>
                                            <td>`+line.nama+`</td>
                                            <td style='color:#FF2D55'>`+sepNumPas(line.reject)+`</td>
                                            <td style='color:#4CD964'>`+sepNumPas(line.posisi)+`</td>
                                        </tr>`;
                                    }
                                    $('#rinciPbh tbody').html(html);
                                break;
                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('perTerima','GET','$root_ser/dashTarbakPiu.php?fx=getPersenTerima');
                loadService('piuStatus','GET','$root_ser/dashTarbakPiu.php?fx=getPiuStatus');
                loadService('rinciPiu','GET','$root_ser/dashTarbakPiu.php?fx=getRinciPiu');
                loadService('piuAjarAktif','GET','$root_ser/dashTarbakPiu.php?fx=getPiuAjarAktif');
                loadService('piuTakTagih','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('komposisiPiu','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('saldoPiuBanding','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('umurPiu','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('saldoPiu','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('chartSerap','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('rinciSerap','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('serapFiskal','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('rraAgg','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('chartPosisi','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
                loadService('rinciPbh','GET','$root_ser/dashTarbakPiu.php?fx=getPosisi');
            }

            initDash();
        </script>
        ";

		return "";
	}
	
}
?>
