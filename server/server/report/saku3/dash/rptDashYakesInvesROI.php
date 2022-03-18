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
class server_report_saku3_dash_rptDashYakesInvesROI extends server_report_basic
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
        $tglakhir = $tmp[5];
        $kode_plan= $tmp[6];
        $kode_klp= $tmp[7];
        $kelas = $tmp[8];

        if($kelas == ""){
            $act1 = "active";
            $act2 = "";
            $act3 ="";
        }else{
            $act1 = "";
            $act2 = "active";
            $act3 ="";
        }

        
		$link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/yakes";
        $root=$link;
		$path = $link."/";	
		
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";

       

        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = "919006";
        $_SESSION['userPwd'] = "pusat25";
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;

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
                background: #FFCC00 !important;
            }

            .bg-grey{
                background:
                gray !important;
                opacity: 0.5;
                color:white;
            }

            .text-blue{
                color: #007AFF !important;
            }
            .text-green{
                color: #4CD964 !important;
            }
            .text-maroon{
                color: #5856d6 !important;
            }
            .text-yellow{
                color: #FFCC00 !important;
            }

            .text-grey{
                color:
                gray !important;
                opacity: 0.5;
            }

            .propensa,.sahambursa,.reksadana{
                cursor:pointer;
            }
            .trail{
                cursor:pointer;
            }
            .nav-tabs > li {
                width: 100% !important;
                margin-bottom: 10px;
                padding-bottom:0;
                padding-top:0;
            }
            
            .nav-tabs > li > a {
                // color: #007aff;
                color:black;
            }
            .nav-tabs > li > a:hover {
                color: #007aff;
            }
          
            .nav-tabs > li:not(.active) > a:hover,
            .nav-tabs > li:not(.active) > a:focus,
            .nav-tabs > li:not(.active) > a:active {
                border-color: transparent;
            }

            .nav-tabs > li.active > a,
            .nav-tabs > li.active:hover > a {
                background-color: #fff;
                color: #007aff;
            }

            .aktif{
                opacity:unset;
            }
            .nonaktif{
                opacity:0.5;
            }
            .klik{
                cursor:pointer;
            }
            .klik2{
                cursor:pointer;
            }
            .aktif2{
                color:#007AFF;
            }
            .nonaktif2{
                color:black;
            }
          
        </style>
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> 
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:fixed;'>ROI<span id='jplan'></span></h3>
                <div class='pull-right navigasi' style='margin-right: 10px; margin-top: ; padding-bottom: 1rem;'>
                    <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                    <span id='refresh_btn' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                    <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                </div>
                <br><span style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: #808080;position: relative;'>s.d ".substr($tglakhir,8,2)." ".$AddOnLib->ubah_periode(substr($tglakhir,0,4).substr($tglakhir,5,2))." </span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span><span id='kode_klp' hidden></span>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-2' style='background:#e8e8e9;border-radius:15px;min-height:388px'>
                        <div class='roundLabel bg-blue' style='border-radius:50%;padding:20px;margin: 20px auto;width: 100px;text-align: center;height: 100px;'><h2 style='margin-top: 15px;'>ROI</h2></div>                       
                        <ul class='nav nav-tabs' style='text-align:center'>
                            <li role='presentation' class='$act1'><a data-toggle='tab' href='#total' >Portofolio</a></li>
                            <li role='presentation' class='$act2'><a data-toggle='tab' href='#kelas' >Kelas Aset</a></li>
                            <li role='presentation' class='$act3'><a data-toggle='tab' href='#produk' >Produk</a></li>
                        </ul>
                    </div>
                    <div class='col-md-10'>
                        <div class='tab-content' style='padding-left:10px'>
                            <div id='total' class='tab-pane fade in $act1'>
                                <div class='panel'>
                                    <div class='panel-heading'>
                                        <h2 style='padding-left: 20px;font-size: 28px;'><span style='color: #007aff;' id='roiYtd'></span> <span style='font-size:16px'>YTD</span></h2>
                                    </div>
                                    <div class='panel-body'>
                                        <div id='ROITotal' style='margin: 0 auto; padding: 0 auto;height:380px'>
                                        </div>
                                        <div><h6>Note: Perhitungan menggunakan Truly time weight</h6></div>
                                    </div>
                                </div>
                            </div>
                            <div id='kelas' class='tab-pane fade in $act2'>
                                <div class='panel'>
                                    <div class='panel-heading'>
                                        <div class='row' id='roiKelas'>
                                            
                                        </div>
                                    </div>
                                    <div class='panel-body'>
                                        <div id='ROIKelas' style='margin: 0 auto; padding: 0 auto;height:380px'>
                                        </div>
                                        <div><h6>Note: Perhitungan menggunakan Truly time weight</h6></div>
                                    </div>
                                </div>
                            </div>
                            <div id='produk' class='tab-pane fade in $act3'>
                                <div class='col-md-9'>
                                    <div class='panel'>
                                        <div class='panel-body' id='divProduk'>
                                            <div id='ROIProduk0' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk1' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk2' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk3' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk4' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk5' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk6' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk7' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk8' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>
                                            <div id='ROIProduk9' style='margin: 0 auto; padding: 0 auto;height:380px' class='chartProd'>
                                            </div>                               
                                        </div>
                                    </div>
                                </div>
                                <div class='col-md-3'>
                                    <div class='panel'>
                                        <div class='panel-heading bg-blue' style='border-top-right-radius:15px;border-top-left-radius:15px;'>
                                        Filter Produk</div>
                                        <div class='panel-body' id='roiProduk'>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>
            </div>
        </div>
        <script>

            $('.navigasi').on('click','#close_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$tglakhir/$kode_plan/$kode_klp');
            });
            $('.navigasi').on('click','#back_btn',function(){
                // window.history.go(-1); return false;
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$tglakhir/$kode_plan/$kode_klp');
            });

            $('.navigasi').on('click','#refresh_btn',function(){
                location.reload();
            });

            
            $('#jplan').text('$nama_plan');

            
            function view_klp(kode){
                var tmp1 = kode.substr(0,2);
                var tmp2 = kode.substr(2,2);
                return '('+tmp1+':'+tmp2+')';
            }

            $('#kode_klp_view').text(view_klp('$kode_klp'));

            function sepNum(x){
                var num = parseFloat(x).toFixed(4);
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
                return sepNum(nil) + ' JT';
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
                                case 'getPortofolio' :
                                    
                                    for(var i=0; i<result.data.length;i++){
                                        var data = result.data[i].data;
                                        data.reverse();
                                        
                                        data.forEach(function(point) {
                                            point[0] = new Date(point[0]).getTime();
                                        });
                                        
                                        result.data[i].data = data;
                                    }
                                    
                                    Highcharts.chart('ROITotal', {
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
                                                text: ''
                                            },
                                            max: 20,
                                            min:-20
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
                                        
                                        series: result.data
                                    });
                                    $('#roiYtd').html(sepNum(result.roiYtd)+'%');
                                break;
                                case 'getKelas':

                                    var html ='';
                                    var warna = ['yellow','blue','green','maroon'];

                                    for(var i=0;i<result.daftar.length;i++){
                                        var line = result.daftar[i];
                                        html+=`<div class='col-md-3 klik nonaktif rowke`+i+`'>
                                            <div class='panel ' style='border:1px solid #e8e8e9;border-radius:15px;box-shadow: 1px 1px 5px 1px #d1d1d4;'>
                                                <div class='panel-heading bg-grey' style='border-top-right-radius:15px;border-top-left-radius:15px;text-align:center'>
                                                    `+line.nama+`
                                                </div>
                                                <div class='panel-body' style='border-bottom-right-radius:15px;border-bottom-left-radius:15px;text-align:center'>
                                                    <h6 style='color:#d1d1d4'>YTD</h6>
                                                    <h5 class='colPersen text-grey'>`+sepNum(line.roi_persen)+`%</h5>
                                                    <p hidden>`+line.modul+`</p>
                                                </div>
                                            </div>
                                        </div>`;
                                    }
                                    $('#roiKelas').html(html);
                                    $('.rowke'+result.nu_aktif).removeClass('nonaktif');
                                    $('.rowke'+result.nu_aktif).addClass('aktif');
                                    $('.rowke'+result.nu_aktif).find('.colPersen').removeClass('text-grey');
                                    $('.rowke'+result.nu_aktif).find('.colPersen').addClass('text-'+warna[result.nu_aktif]);
                                    $('.rowke'+result.nu_aktif).find('.panel-heading').removeClass('bg-grey');
                                    $('.rowke'+result.nu_aktif).find('.panel-heading').addClass('bg-'+warna[result.nu_aktif]);
                                break;
                                case 'getChartKelas':
                                    for(var i=0; i<result.data.length;i++){
                                        var data = result.data[i].data;
                                        data.reverse();
                                        
                                        data.forEach(function(point) {
                                            point[0] = new Date(point[0]).getTime();
                                        });
                                        
                                        result.data[i].data = data;
                                    }
                                    
                                    Highcharts.chart('ROIKelas', {
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
                                                text: ''
                                            },
                                            max: 20,
                                            min:-20
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
                                        
                                        series: result.data
                                    });
                                break;
                                case 'getProduk':
                                    var html=`<table>`;
                                    for(var i=0;i<result.daftar.length;i++){
                                        var line= result.daftar[i];
                                        html+=`<tr class='klik2 row2ke`+i+` nonaktif2'>
                                            <td colspan='2' style='font-weight:bold'>`+line.nama+`
                                            <p class='modul-produk' hidden>`+line.kode_kelas+`</p></td>
                                        </tr>`;
                                        var det='';
                                        for(var j=0;j<result.daftar2.length;j++){
                                            var line2= result.daftar2[j];
                                            if(line2.modul == line.kode_kelas){
                                                det+=`<tr >
                                                <td>`+line2.nama_sub+`
                                                </td>
                                                <td>`+sepNum(line2.roi_persen)+`% <h1 class='sub-produk' hidden>`+line2.kode_subkelas+`</h1></td>
                                                </tr>`;
                                            }
                                        }
                                        html+=det;
                                    }
                                    html+=`</table>`;
                                    $('#roiProduk').html(html);
                                    $('.row2ke0').removeClass('nonaktif2');
                                    $('.row2ke0').addClass('aktif2');
                                break;
                                case 'getChartProduk':
                                    var html='';
                                    console.log(result.data.length);
                                    for(var i=0; i<result.data.length;i++){
                                        var data = result.data[i].data;
                                        data.reverse();
                                        
                                        data.forEach(function(point) {
                                            point[0] = new Date(point[0]).getTime();
                                        });
                                        
                                        result.data[i].data = data;
                                    }

                                    $('.chartProd').html('');
                                    for(var i=0; i<result.data.length;i++){
                                        Highcharts.chart('ROIProduk'+i, {
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
                                                    text: ''
                                                },
                                                max: 20,
                                                min:-20
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
                                            
                                            series: [result.data[i]]
                                        });
                                    }
                                break;
                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('getPortofolio','GET','$root_ser/dashYakesInves.php?fx=getROIPortofolio','$tglakhir|$kode_plan|$kode_klp');
   
                loadService('getKelas','GET','$root_ser/dashYakesInves.php?fx=getRoiKelas','$tglakhir|$kode_plan|$kode_klp|$kelas');
                loadService('getChartKelas','GET','$root_ser/dashYakesInves.php?fx=getROIKelasChart','$tglakhir|$kode_plan|$kode_klp|$kelas');
                loadService('getProduk','GET','$root_ser/dashYakesInves.php?fx=getRoiProduk','$tglakhir|$kode_plan|$kode_klp'); 
                loadService('getChartProduk','GET','$root_ser/dashYakesInves.php?fx=getROIProdukChart','$tglakhir|$kode_plan|$kode_klp|KAS');
            }

            initDash();

            
            $('#roiKelas').on('click','.klik',function(){
                var modul = $(this).closest('div').find('p').text();
                
                var nama = ['KAS','PEND TETAP','SAHAM','PROPENSA'];
                var warna = ['yellow','blue','green','maroon'];
                
                
                switch(modul.toUpperCase()){
                    case 'KAS':
                        var nama2 = nama[0];
                        var warna2= warna[0]
                    break;
                    case 'EBT':
                        var nama2 = nama[1];
                        var warna2= warna[1];
                    break;
                    case 'SB':
                        var nama2 = nama[2];
                        var warna2= warna[2];
                    break;
                    case 'PRO':
                        var nama2 = nama[3];
                        var warna2= warna[3];
                    break;
                }
                
                $('.klik').removeClass('aktif');
                $('.klik').addClass('nonaktif');

                $(this).removeClass('nonaktif');
                $(this).addClass('aktif');
                
                $('.klik').find('.colPersen').removeClass('text-green');
                $('.klik').find('.colPersen').removeClass('text-blue');
                $('.klik').find('.colPersen').removeClass('text-maroon');
                $('.klik').find('.colPersen').removeClass('text-yellow');
                $('.klik').find('.colPersen').addClass('text-grey');
                $(this).find('.colPersen').removeClass('text-grey');
                $(this).find('.colPersen').addClass('text-'+warna2);

                $('.klik').find('.panel-heading').removeClass('bg-green');
                $('.klik').find('.panel-heading').removeClass('bg-blue');
                $('.klik').find('.panel-heading').removeClass('bg-maroon');
                $('.klik').find('.panel-heading').removeClass('bg-yellow');
                $('.klik').find('.panel-heading').addClass('bg-grey');
                $(this).find('.panel-heading').removeClass('bg-grey');
                $(this).find('.panel-heading').addClass('bg-'+warna2);

                loadService('getChartKelas','GET','$root_ser/dashYakesInves.php?fx=getROIKelasChart','$tglakhir|$kode_plan|$kode_klp|'+modul);

            });

            $('#roiProduk').on('click','.klik2',function(){
                var modul = $(this).closest('tr').find('p').text();
                
                var warna = ['yellow','blue','green','maroon'];
                
                
                switch(modul.toUpperCase()){
                    case 'KAS':
                        var warna2= warna[0]
                    break;
                    case 'EBT':
                        var warna2= warna[1];
                    break;
                    case 'SB':
                        var warna2= warna[2];
                    break;
                    case 'PRO':
                        var warna2= warna[3];
                    break;
                }
                
                $('.klik2').removeClass('aktif2');
                $('.klik2').addClass('nonaktif2');

                $(this).removeClass('nonaktif2');
                $(this).addClass('aktif2');

                loadService('getChartProduk','GET','$root_ser/dashYakesInves.php?fx=getROIProdukChart','$tglakhir|$kode_plan|$kode_klp|'+modul);

            });
            </script>

        ";
        

		return "";
	}
	
}
?>
