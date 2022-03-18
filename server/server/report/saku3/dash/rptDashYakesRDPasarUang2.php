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
class server_report_saku3_dash_rptDashYakesRDPasarUang2 extends server_report_basic
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
        $tglakhir=$tmp[5];
        $kode_plan=$tmp[6];
        $kode_klp=$tmp[7];
        $jenis = $tmp[8];

        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = "919006";
        $_SESSION['userPwd'] = "pusat25";
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;

        switch($jenis){
            case 'RDPU':
            $judul = 'Reksadana Pasar Uang';
            break;
            case 'RDSH':
            $judul = 'Reksadana Saham';
            break;
            case 'RDPD':
            $judul = 'Reksadana Pendapatan Tetap';
            break;
            case 'RDPR':
            $judul = 'Reksadana Terproteksi';
            break;
            case 'RDCMSB':
            $judul = 'Reksadana Campuran [Saham]';
            break;
            case 'RDCMEBT':
            $judul = 'Reksadana Campuran [Reksadana]';
            break;
            case 'RETF':
            $judul = 'Reksadana Exchange Traded Fund (ETF)';
            break;

        }

		$link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/yakes";
        $root=$link;
		$path = $link."/";	
		
      
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";

        $poly1 = $path."image/Polygon1.png";
        $poly2 = $path."image/Polygon12.png";
        $openbook = $path."image/open-book.png";
        $fairstand= $path."image/fair-stand.png";

       

        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        $AddOnLib=new server_util_AddOnLib();

        $sql3 = "select nama from inv_plan where kode_plan='$kode_plan'";
        $rsnm = $dbLib->execute($sql3);
        $nama_plan = $rsnm->fields[0];

        echo"
        <style>
            @font-face {
                font-family: 'Font SF';
                src: url('$root/server/bs/fonts/SF-Pro-Text-Regular.otf');
            }

            body,p,span {
                font-family: 'Font SF' !important;
            }
            h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                font-family: 'Font SF' !important;
                font-weight: normal !important;
            }
            h3{
                margin-bottom: 5px;
                font-size:18px !important
            }
            h2{
                margin-bottom: 5px;
                margin-top:10px;
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
                padding-left:10px !important;
                padding-right:0px !important;
            }
            .mar-mor{
                margin-bottom:10px !important;
            }
            .box-wh{
                box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
            }
            .nav-tabs > li.active > a, .nav-tabs > li.active > a:focus, .nav-tabs > li.active > a:hover {
                border: none !important;
            }

            .radioCust {
                display: block;
                position: relative;
                padding-left: 35px;
                margin-bottom: 12px;
                cursor: pointer;
                font-size: 22px;
                -webkit-user-select: none;
                -moz-user-select: none;
                -ms-user-select: none;
                user-select: none;
              }
              
              /* Hide the browser's default radio button */
              .radioCust input {
                position: absolute;
                opacity: 0;
                cursor: pointer;
              }
              
              /* Create a custom radio button */
              .checkmark {
                position: absolute;
                top: 0;
                left: 0;
                height: 25px;
                width: 25px;
                background-color: #eee;
                border-radius: 50%;
              }
              
              /* On mouse-over, add a grey background color */
              .radioCust:hover input ~ .checkmark {
                background-color: #ccc;
              }
              
              /* When the radio button is checked, add a blue background */
              .radioCust input:checked ~ .checkmark {
                background-color: #2196F3;
              }
              
              /* Create the indicator (the dot/circle - hidden when not checked) */
              .checkmark:after {
                content: \"\";
                position: absolute;
                display: none;
              }
              
              /* Show the indicator (dot/circle) when checked */
              .radioCust input:checked ~ .checkmark:after {
                display: block;
              }
              
              /* Style the indicator (dot/circle) */
              .radioCust .checkmark:after {
                   top: 9px;
                  left: 9px;
                  width: 8px;
                  height: 8px;
                  border-radius: 50%;
                  background: #2196F3;
              }

              .bg-blue{
                background: #007AFF !important;
            }
            .bg-green{
                background: #4CD964 !important;
            }
            .bg-maroon{
                background: #5856d6 !important;
            }
            .bg-yellow{
                background: #FF9500 !important;
            }
            .klik-chart{
                cursor:pointer;
            }
            .klik-chart2{
                cursor:pointer;
            }
            .klik{
                cursor:pointer;
            }
            .aktif{
                background: #f4f0f0;
            }
           
        </style>
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> 
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:fixed;'>$judul  <span id='jplan'></span></h3>
                <div class='pull-right navigasi' style='margin-right: 10px; margin-top: ; padding-bottom: 1rem;'>
                    <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                    <span id='refresh_btn' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                    <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                </div>
                <br><span style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: #808080;position: relative;'>s.d ".substr($tglakhir,8,2)." ".$AddOnLib->ubah_periode(substr($tglakhir,0,4).substr($tglakhir,5,2))." </span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span>
            </div>
            <div class='panel-body'  style='padding-top: 0px;'>
                <div class='row' style='margin-left: 12px;'>
                    <div style='padding: 0px;' class='col-md-3'>
                        <div style='margin: 0px;padding: 0px;' class='panel'>
                            <div style='padding-left: 5px;padding-right: 5px;' class='panel-heading text-right'>
                                <button type='button' id='btn-filter' style='border: 1px solid #d5d5d5;border-radius: 20px;background: white;padding: 2px 15px;' class=''> Filter
                                </button>
                            </div>
                            <div class='panel-body' style='padding: 0px;' id='reksadana'>

                            </div>
                        </div>
                    </div>
                    <div class='col-md-9 pad-more'  style='padding-top: 10px;' id='daftarDetail'>
                    
                    </div>
                </div>
            </div>
        </div>
        <div class='modal fade' tabindex='-1' role='dialog' id='modalFilter'>
            <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                    <div class='modal-body'>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>MI</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <select class='form-control selectize' id='kode_rdkelola_inp'>
                                        <option value='' disabled>Pilih MI</option>";
                                        $rsplan = $dbLib->execute("select 'all' as kode_rdkelola, 'All' as nama union all select kode_rdkelola,nama from inv_rdkelola where flag_aktif='1' ");
                                        while($row=$rsplan->FetchNextObject($toupper=false)){
                                            
                                            echo"<option value='$row->kode_rdkelola' >$row->kode_rdkelola - $row->nama</option>";
                                        }
                                        echo"
                                        </select>   
                                    </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Urutkan Berdasarkan</label>
                                    <div class='col-sm-6' style='margin-bottom:5px;'>
                                    <select class='form-control selectize' id='sort_by_inp'>
                                        <option value='' disabled>Pilih</option>
                                        <option value='nama' >Nama RD</option>
                                        <option value='nama_kelola' >Nama Kelola</option>
                                        <option value='nab_unit' >NAB unit</option>
                                        <option value='spi_buku' >SPI</option>
                                    </select>      
                                    </div>
                                    <div class='col-sm-3' style='margin-bottom:5px;'>
                                    <select class='form-control selectize' id='sort_asc_desc'>
                                        <option value='' disabled>Pilih</option>
                                        <option value='asc' >dari Terkecil</option>
                                        <option value='desc' >dari Terbesar</option>
                                    </select>      
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class='modal-footer'>
                        <div class='row text-right' style='margin-top:30px'>
                            <div class='form-group'>
                                <div class='col-sm-12' style='margin-bottom:5px;padding-right:10px'>
                                <button type='button' class='btn btn-primary' id='btnOk'>Tampilkan</button>
                                <button type='button' class='btn btn-default' data-dismiss='modal' aria-label='Close'>
                                Close</button>
                                </div>
                                
                            </div>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <script>

            $('.panel').on('click','#close_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$tglakhir/$kode_plan/$kode_klp');
            });
            $('.panel').on('click','#back_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp');
            });

            $('.panel').on('click','#refresh_btn',function(){
                location.reload();
            });

            $('.panel').on('click','#btn-filter',function(){
                $('#modalFilter').modal('show');
            });

            $('.panel').on('click', '.klik', function(){

                var kode = $(this).closest('div').find('h1').text();
                $('.klik').removeClass('aktif');
                $(this).addClass('aktif');
                loadService('daftarDetail','GET','$root_ser/dashYakesInves.php?fx=getDetailRD','$tglakhir|$kode_plan|$kode_klp|$jenis|'+kode); 

            });

            $('#jplan').text('$nama_plan');

            function view_klp(kode){
                var tmp1 = kode.substr(0,2);
                var tmp2 = kode.substr(2,2);
                return '('+tmp1+':'+tmp2+')';
            }

            $('#kode_klp_view').text(view_klp('$kode_klp'));


            $('.modal-footer').on('click', '#btnOk', function(){
                var kode_rdkelola = $('#kode_rdkelola_inp')[0].selectize.getValue();
                var sort_by = $('#sort_asc_desc')[0].selectize.getValue();
                var nama_sort = $('#sort_by_inp')[0].selectize.getValue();
                loadService('daftar_reksadana','GET','$root_ser/dashYakesInves.php?fx=getDaftarRD','$tglakhir|$kode_plan|$kode_klp|$jenis|'+kode_rdkelola+'|'+nama_sort+'|'+sort_by);
                loadService('daftarDetail','GET','$root_ser/dashYakesInves.php?fx=getDetailRD','$tglakhir|$kode_plan|$kode_klp|$jenis||'+kode_rdkelola+'|'+nama_sort+'|'+sort_by);
                
                $('#modalFilter').modal('hide');
            });

            function sepNum(x){
                var num = parseFloat(x).toFixed(2);
                var parts = num.toString().split('.');
                var len = num.toString().length;
                // parts[1] = parts[1]/(Math.pow(10, len));
                parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
                return parts.join(',');
            }

            function sepNum2(x){
                if (typeof x === 'undefined' || !x) { 
                    return 0;
                }else{
                    if(x < 0){
                        var x = parseFloat(x).toFixed(2);
                    }
                    
                    var parts = x.toString().split(".");
                    parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
                    return parts.join(",");
                }
            }

            function sepNumPas(x){
                // var num = parseInt(x);
                // var parts = num.toString().split('.');
                // var len = num.toString().length;
                // // parts[1] = parts[1]/(Math.pow(10, len));
                // parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
                // return parts.join(',');
                if (typeof x === 'undefined' || !x) { 
                    return 0;
                }else{
                    // if(x < 0){
                        var x = parseInt(x);
                    // }
                    
                    var parts = x.toString().split('.');
                    parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
                    return parts.join(',');
                }
            }

            
            function singkatNilai(num){
                if(num < 0){
                    num = num * -1;
                }

                if(num >= 1000 && num < 1000000){
                    var str = 'Rb';
                    var pembagi = 1000;
                }else if(num >= 1000000 && num < 1000000000){
                    var str = 'Jt';
                    var pembagi = 1000000;
                }else if(num >= 1000000000 && num < 1000000000000){
                    var str = 'M';
                    var pembagi = 1000000000;
                }else if(num >= 1000000000000){
                    var str = 'T';
                    var pembagi = 1000000000000;
                }

                if(num < 0){
                    return (parseFloat(num/pembagi).toFixed(0) * -1) + ' ' +str;
                }else if (num > 0 && num >= 1000){
                    return parseFloat(num/pembagi).toFixed(0) + ' ' +str;
                }else if(num > 0 && num < 1000){
                    return num;
                }else{
                    return num;
                }
            }

            function toJuta(x) {
                var nil = x / 1000000;
                return sepNum(nil) + ' JT';
            }

            function toMiliar(x) {
                var nil = x / 1000000000;
                return sepNum(nil) + ' M';
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
                                        var warna = '#bfb7b7';
                                        var tanda = '+';
                                    }
                                    
                                    html +=`<div class='row klik reksadanake`+i+`' style='margin-right: -5px;margin-left: -5px;border-bottom: 1px solid #dfdfdf;padding:5px'>    
                                    <div class='col-md-12 col-xs-12' style='padding: 0px;'>
                                        <h1 hidden>`+result.daftar[i].kode_rd+`</h1>
                                        <h5>`+result.daftar[i].nama+`</h5>
                                    </div>      
                                    <div style=' padding: 5px;border: 1px solid #dadada;border-radius: 10px;text-align:center;background:white' class='col-md-3 col-xs-3 text-align:center'>
                                        <img src='$path/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 50px;height: auto;'>
                                    </div>
                                    <div style='padding-left: 10px;padding-right: 10px;' class='col-md-5 col-xs-5'>
                                        <p style='color: #808080;font-size: 12px;'>`+result.daftar[i].nama_kelola+`</p>
                                        <h6 style='margin: 0px;'>NAB/Unit {IDR}</h6>
                                        <p style='margin-top: 5px;font-size: 18px;'>`+sepNumPas(result.daftar[i].nab_unit)+` <sup style='font-size: 8px;top: -8px !important;'>`+koma+`</sup></p>
                                    </div>
                                    <div style=' text-align:center;padding: 3px;' class='col-md-4 col-xs-4 text-align:center'>`;
                                    htmlx=`
                                        <h6 style='margin-top: 0px;'>SPI (%)</h6>
                                        <span class='`+kelas+`' style='padding: 5px;border-radius: 5px;'> `+tanda+` `+sepNum(result.daftar[i].spi_buku)+`%</span>
                                        <h6 style='font-size: 8px;color:#808080;'>update $tglakhir </h6>`;
                                    html+=`
                                    </div>

                                </div>`;
                                    
                                }
                                $('#reksadana').html(html);
                                
                                $('.reksadanake0').addClass('aktif');
                                break;
                                case 'daftarDetail' :
                                var html = '';
                                var chart='';
                                // for (var x=0; x< result.daftar.length;x++){
                                    var line = result.daftar[0];
                                    var nil = parseFloat(line.nbuku_unit).toFixed(4);
                                    var tmp = nil.split('.');
                                    if(tmp[1] == undefined){
                                        var koma = '';
                                    }else{
                                        var koma = ','+tmp[1];
                                    }
                                    html +=
                                    `<div class='row' style='margin-left: 5px;border-bottom: 1px solid #e3e1e1;'>
                                        <div class='col-md-12 col-xs-12' style='padding-left: 0px;'>
                                            <h3 style='margin-top: 0px;'>`+line.nama+`<span style='font-size: 12px;color: #808080;padding-left: 10px;'>`+line.nama_kelola+`</span>
                                            <span class='pull-right' style='padding-right: 10px;'>`+toMiliar(line.nbuku)+`</span>
                                            <span class='pull-right' style='font-size: 12px;color: #808080;padding-top: 5px;padding-right: 10px;'>Nilai Buku </span></h3>
                                        </div>
                                    </div>
                                    <div class='row' style='margin-left: 5px;border-bottom: 1px solid #e3e1e1;'>
                                        <div style='' class='col-md-3 col-xs-3 text-center'>
                                            <h6 style=''>Nilai Buku/Unit {IDR}</h6>
                                            <p style='margin-top: 5px;font-size: 18px;'>`+sepNumPas(line.nbuku_unit)+`<sup style='font-size: 8px;top: -8px !important;'>`+koma+`</sup></p>
                                        </div>
                                        <div style='' class='col-md-3 col-xs-3 text-center'>
                                            <h6 style=''>Jumlah Unit Penyertaan</h6>
                                            <p style='margin-top: 5px;font-size: 18px;'>`+sepNumPas(line.jum_unit)+`</p>
                                        </div>
                                        <div style='' class='col-md-3 col-xs-3 text-center'>
                                            <h6 style=''>SPI {IDR}</h6>
                                            <p style='margin-top: 5px;font-size: 18px;'>`+sepNumPas(line.spi_buku)+`</p>
                                        </div>`;
                                        htmlxx=`
                                        <div style='' class='col-md-3 col-xs-3 text-center'>
                                            <h6 style=''>Return/YTD</h6>`;
                                            if(line.ytd < 0){
                                                htmlxx+=`
                                                <p style='margin-top: 5px;font-size: 18px;'><img style='width: 20px;padding-bottom: 6px;' src='$poly2'>`+sepNum(line.ytd)+`%</p>`;
                                            }else{
                                                htmlxx+=`
                                                <p style='margin-top: 5px;font-size: 18px;'><img style='width: 20px;padding-bottom: 6px;' src='$poly1'>`+sepNum(line.ytd)+`%</p>`;
                                            }
                                        htmlxx+=`
                                        </div>`;
                                        html+=`
                                    </div>
                                    <div class='row' style='margin-left: 5px;border-bottom: 1px solid #e3e1e1;'>
                                        <div class='col-md-12 col-xs-12' style='padding-left: 0px;'>
                                            <div id='chartNAB'></div>
                                        </div>
                                    </div>
                                    <div class='row' style='margin-left: 5px;'>
                                        <div class='col-md-12 col-xs-12' style='padding-left: 0px;'>
                                            <div id='chartROI'></div>
                                        </div>
                                    </div>`;
                                // }
                                
                                $('#daftarDetail').html(html); 
                                
                                for(var i=0; i<result.NAB.length;i++){
                                    var data = result.NAB[i].data;
                                    data.reverse();
                                    
                                    data.forEach(function(point) {
                                        point[0] = new Date(point[0]).getTime();
                                    });

                                    result.NAB[i].data = data;
                                }

                                  Highcharts.chart('chartNAB', {
                                    chart: {
                                        zoomType: 'x',
                                        // height: (6 / 16 * 100) + '%' // 16:8 ratio
                                    },
                                    title: {
                                        text: ''
                                    },
                                    subtitle: {
                                        text: document.ontouchstart === undefined ?
                                            'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                                    },
                                    xAxis: {
                                        type: 'datetime'
                                    },
                                    yAxis: {
                                        title: {
                                            text: 'Nilai Wajar '+result.ket
                                        },
                                        labels: {
                                            formatter: function () {
                                                return singkatNilai(this.value);
                                            }
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
                        
                                    series: result.NAB
                                });

                                if(result.ROI.length > 0){

                                    for(var i=0; i<result.ROI.length;i++){
                                        var data = result.ROI[i].data;
                                        data.reverse();
                                        
                                        data.forEach(function(point) {
                                            point[0] = new Date(point[0]).getTime();
                                        });
    
                                        result.ROI[i].data = data;
                                    }
    
                                     Highcharts.chart('chartROI', {
                                        chart: {
                                            zoomType: 'x',
                                            // height: (6 / 16 * 100) + '%' // 16:8 ratio
                                        },
                                        title: {
                                            text: ''
                                        },
                                        subtitle: {
                                            text: document.ontouchstart === undefined ?
                                                'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                                        },
                                        xAxis: {
                                            type: 'datetime'
                                        },
                                        yAxis: {
                                            title: {
                                                text: 'ROI'
                                            },
                                            labels: {
                                                formatter: function () {
                                                    return singkatNilai(this.value);
                                                }
                                            }
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        legend: {
                                            enabled: true
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
                            
                                        series: result.ROI
                                    });
                                }


                                                
                                break;
                            }
                        }else{
                            if(confirm('Session timeout. Reload page?')){
                                location.reload();
                            }
                        }
                    }
                });
            }

            var jenis_data = '$jenis';

            function initDash(){
               
                loadService('daftar_reksadana','GET','$root_ser/dashYakesInves.php?fx=getDaftarRD','$tglakhir|$kode_plan|$kode_klp|$jenis');
                loadService('daftarDetail','GET','$root_ser/dashYakesInves.php?fx=getDetailRD','$tglakhir|$kode_plan|$kode_klp|$jenis');
                
            }

            initDash();           

            </script>

        ";
        

		return "";
	}
	
}
?>
