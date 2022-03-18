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
class server_report_saku3_dash_rptDashYakesInvesDet extends server_report_basic
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
        
        // $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'".substr($periode,0,4)."-".substr($periode,4,2)."-01')+1,0)) ,112),7,2) as tglakhir";
        // $rst = $dbLib->execute($sql);
        // $tglakhir = substr($periode,0,4)."-".substr($periode,4,2)."-".$rst->fields[0];

        
        // $sql2 = "select max(tanggal) as tanggal from inv_saham_kkp ";
        // $rsta = $dbLib->execute($sql2);
        // $tglakhir = $rsta->fields[0];

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
            .propensa,.sahambursa,.reksadana{
                cursor:pointer;
            }
            .trail{
                cursor:pointer;
            }
        </style>
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> 
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:fixed;'>Realisasi Jenis Investasi Per Alokasi Asset <span id='jplan'></span></h3>
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
                    <div class='col-md-6 col-xs-6'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-heading bg-blue' style='border-top-left-radius: 15px;border-top-right-radius: 15px;'>
                                Kas 
                                <span class='pull-right' style='font-size: 20px;' id='persenKas'></span>
                            </div>
                            <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;height: 300px;padding-right: 0px;'>
                                <div id='kas' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div id='kasDet' style='margin: 0 auto; padding-right: 0px;background: #928f8f;border-bottom-left-radius: 15px;border-top-left-radius: 15px;' class='col-md-7 col-xs-7'>
                                    <table class='table no-border no-margin' style='margin: 10px auto !important;color: white;' id='table-deposito'>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 col-xs-6'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-heading bg-yellow' style='border-top-left-radius: 15px;border-top-right-radius: 15px;'>
                                Saham Bursa
                                <span class='pull-right' style='font-size: 20px;' id='persenSb'></span>
                            </div>
                            <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;height: 300px;padding-right: 0px;'>
                                <div id='saham' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div id='shmDet' style='margin: 0 auto; padding-right: 0px;background: #928f8f;border-bottom-left-radius: 15px;border-top-left-radius: 15px;' class='col-md-7 col-xs-7'>
                                    <table class='table no-border no-margin' style='margin: 10px auto !important;color: white;' id='table-sb'>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 col-xs-6'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-heading bg-green' style='border-top-left-radius: 15px;border-top-right-radius: 15px;'>
                                Efek Berpendapatan Tetap
                            <span class='pull-right' style='font-size: 20px;' id='persenEbt'></span>
                            </div>
                            <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;height: 300px;padding-right: 0px;'>
                                <div id='efek' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div id='efekDet' style='margin: 0 auto; padding-right: 0px;background: #928f8f;border-bottom-left-radius: 15px;border-top-left-radius: 15px;' class='col-md-7 col-xs-7'>
                                    <table class='table no-border no-margin' style='margin: 10px auto !important;color: white;' id='table-efek'>
                                        <tbody>
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 col-xs-6'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-heading bg-maroon' style='border-top-left-radius: 15px;border-top-right-radius: 15px;'>
                                Saham Non Publik
                            <span class='pull-right' style='font-size: 20px;' id='persenPro'></span>
                            </div>
                            <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;height: 300px;padding-right: 0px;'>
                                <div id='saham_np' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div id='proDet' style='margin: 0 auto; padding-right: 0px;background: #928f8f;border-bottom-left-radius: 15px;border-top-left-radius: 15px;' class='col-md-7 col-xs-7'>
                                    <table class='table no-border no-margin' style='margin: 10px auto !important;color: white;' id='table-pro'>
                                        <tbody>
                                        </tbody>
                                    </table>
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

            $('.panel').on('click','.sb_rowke0',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInvesDet2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|SH');

            });

            $('.panel').on('click','.kas_rowke3',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPU');

            });

            $('.panel').on('click','.kas_rowke1',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|DOC');

            });

            $('.panel').on('click','.kas_rowke2',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|Depo');

            });

            $('.panel').on('click','.sb_rowke1',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDSH');

            });

            $('.panel').on('click','.sb_rowke2',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMSB');

            });

            $('.panel').on('click','.sb_rowke3',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RETF');

            });

            $('.panel').on('click','.ebt_rowke0',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPD');

            });

            $('.panel').on('click','.ebt_rowke1',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPR');

            });

            $('.panel').on('click','.ebt_rowke2',function(){
                
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMEBT');

            });

            $('.panel').on('click','.pro_rowke0',function(){
                var kode = $(this).closest('tr').find('p').text();
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInvesSP','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|'+kode);

            });

            $('.panel').on('click','.pro_rowke1',function(){
                var kode = $(this).closest('tr').find('p').text();
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInvesSP','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|'+kode);

            });

            $('.panel').on('click','.pro_rowke2',function(){
                var kode = $(this).closest('tr').find('p').text();
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInvesSP','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|'+kode);

            });

            
            function view_klp(kode){
                var tmp1 = kode.substr(0,2);
                var tmp2 = kode.substr(2,2);
                return '('+tmp1+':'+tmp2+')';
            }

            $('#kode_klp_view').text(view_klp('$kode_klp'));

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
                                    var html = '';
                                    var kas = [];
                                    for(var i=0;i< result.kas.length;i++){
                                        var nama = result.kas[i].nama.substring(3);
                                        var tmp = nama.split('.');
                                        html += `<tr class='trail kas_rowke`+i+`'>
                                            <td width='40%'>`+nama+`</td>
                                            <td width='60%'class='text-right'>`+sepNumPas(result.kas[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                        </tr>`;
                                    }
                                    $('#table-deposito tbody').html(html);

                                    var html = '';
                                    var ebt = [];
                                    for(var i=0;i< result.ebt.length;i++){
                                        var nama = result.ebt[i].nama.substring(3);
                                        var tmp = nama.split('.');
                                        html += `<tr class='trail ebt_rowke`+i+`'>
                                            <td width='40%'>`+nama+`</td>
                                            <td width='60%' class='text-right'>`+sepNumPas(result.ebt[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                        </tr>`;
                                    }
                                    $('#table-efek tbody').html(html);

                                    var html = '';
                                    var sb = [];
                                    for(var i=0;i< result.sb.length;i++){
                                        var nama = result.sb[i].nama.substring(3);
                                        var tmp = nama.split('.');
                                        html += `<tr class='trail sb_rowke`+i+`'>
                                            <td width='40%'>`+nama+`</td>
                                            <td width='60%' class='text-right'>`+sepNumPas(result.sb[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                        </tr>`;
                                    }
                                    $('#table-sb tbody').html(html);

                                    var html = '';
                                    var pro = [];
                                    for(var i=0;i< result.pro.length;i++){
                                        var nama = result.pro[i].nama;
                                        html += `<tr class='trail pro_rowke`+i+`'>
                                            <td width='40%'><p hidden class='id_mitra'>`+result.pro[i].kode_mitra+`</p>`+nama+`</td>
                                            <td width='60%' class='text-right'>`+sepNumPas(result.pro[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                        </tr>`;
                                    }
                                    $('#table-pro tbody').html(html);

                                    Highcharts.chart('kas', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
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
                                                showInLegend: true
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
                                    
                                    Highcharts.chart('saham', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
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
                                                showInLegend: true
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
                                    Highcharts.chart('efek', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
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
                                                showInLegend: true
                                            }
                                        },
                                        series: [{
                                            name: 'Brands',
                                            colorByPoint: true,
                                            data: result.ebt_chart
                                        }],
                                        credits:{
                                            enabled:false
                                        }
                                    });
                                    Highcharts.chart('saham_np', {
                                        chart: {
                                            plotBackgroundColor: null,
                                            plotBorderWidth: null,
                                            plotShadow: false,
                                            type: 'pie'
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
                                                showInLegend: true
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
                loadService('getPortofolio','GET','$root_ser/dashYakesInves.php?fx=getPortofolio','$tglakhir|$kode_plan|$kode_klp'); 
                loadService('getPersen','GET','$root_ser/dashYakesInves.php?fx=getBatasAlokasi','$tglakhir|$kode_plan|$kode_klp'); 

            }

            initDash();
            </script>

        ";
        

		return "";
	}
	
}
?>
