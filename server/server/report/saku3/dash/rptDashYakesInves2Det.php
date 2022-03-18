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
class server_report_saku3_dash_rptDashYakesInves2Det extends server_report_basic
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
                background: #FF9500 !important;
            }
            .propensa,.sahambursa,.reksadana{
                cursor:pointer;
            }
            .trail{
                cursor:pointer;
            }

            .rowke0:hover{
                background:#7cb5ec;
                color:white;
            }
            
            .rowke1:hover{
                background:#434348;
                color:white;
            }
            
            .rowke2:hover{
                background:#90ed7d;
                color:white;
            }

            .rowke3:hover{
                background:#f7a35c;
                color:white;
            }

            .rowke4:hover{
                background:#8085e9;
                color:white;
            }

            .rowke5:hover{
                background:#f15c80;
                color:white;
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
                                <div id='kasDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;border-bottom-left-radius: 15px;border-top-left-radius: 15px;background: #E9E9E9;' class='col-md-7 col-xs-7'>
                                    <!--<table class='table no-border no-margin' style='margin: 10px auto !important;color: white;' id='table-deposito'>
                                        <tbody>
                                        </tbody>
                                    </table>-->
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
                                <div id='sbDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;border-bottom-left-radius: 15px;border-top-left-radius: 15px;background: #E9E9E9;' class='col-md-7 col-xs-7' >
                                  
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
                                <div id='ebtDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;border-bottom-left-radius: 15px;border-top-left-radius: 15px;background: #E9E9E9;' class='col-md-7 col-xs-7'>
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
                                <div id='proDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;border-bottom-left-radius: 15px;border-top-left-radius: 15px;background: #E9E9E9;' class='col-md-7 col-xs-7'>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <script>

            $('.navigasi').on('click','#close_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$tglakhir/$kode_plan/$kode_klp');
            });
            $('.navigasi').on('click','#back_btn',function(){
                // window.history.go(-1); return false;
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$tglakhir/$kode_plan/$kode_klp');
            });

            $('.navigasi').on('click','#refresh_btn',function(){
                location.reload();
            });

            
            $('#jplan').text('$nama_plan');

            $('.panel').on('click','.trail',function(){
                var kode = $(this).closest('div').find('p').text();
                switch(kode){
                    case '12' :
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|DOC');
                    break;
                    case '13' :
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|Depo');
                    break;
                    case '16' :
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPU');
                    break;
                    case '241':
                         
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPD');
                    break;
                    case '242':
                         
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPD');
                    break;
                    case '243':
                         
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPR');
                    break;
                    case '244':
                         
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMEBT');
                    break;
                    case '31':
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2Det2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|SH');
                    break;
                    case '321':
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDSH');
                    break;
                    case '322': 
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMSB');
                    break;
                    case '324':
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RETF');
                    break;
                    case 'GYS':
                    case 'RSPL':
                    case 'TLT':
                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2SP','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|'+kode);
                    break;

                }
                

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
                                    var color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
                                    for(var i=0;i< result.kas.length;i++){
                                        var nama = result.kas[i].nama.substring(3);
                                        var tmp = nama.split('.');
                                        // html += `<tr class='trail kas rowke`+i+`' style='color:`+color[i]+`'>
                                        //     <td width='40%' ><p hidden class='kd_nrc'>`+result.kas[i].kode_neraca+`</p>`+nama+`</td>
                                        //     <td width='60%'class='text-right'>`+sepNumPas(result.kas[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i></td>
                                        // </tr>`;
                                        html +=`<div class='row trail kas rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;'>
                                            <div class='col-md-4'>
                                            <p hidden class='kd_nrc'>`+result.kas[i].kode_neraca+`</p>`+nama+`
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.kas[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    $('#kasDet').html(html);

                                    var html = '';
                                    var ebt = [];
                                    for(var i=0;i< result.ebt.length;i++){
                                        var nama = result.ebt[i].nama.substring(3);
                                        var tmp = nama.split('.');
                                        html +=`<div class='row trail ebt rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;'>
                                            <div class='col-md-4'>
                                            <p hidden class='kd_nrc'>`+result.ebt[i].kode_neraca+`</p>`+nama+`
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.ebt[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    $('#ebtDet').html(html);

                                    var html = '';
                                    var sb = [];
                                    for(var i=0;i< result.sb.length;i++){
                                        var nama = result.sb[i].nama.substring(3);
                                        var tmp = nama.split('.');
                                        html +=`<div class='row trail sb rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;'>
                                            <div class='col-md-4'>
                                            <p hidden class='kd_nrc'>`+result.sb[i].kode_neraca+`</p>`+nama+`
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.sb[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    $('#sbDet').html(html);

                                    var html = '';
                                    var pro = [];
                                    for(var i=0;i< result.pro.length;i++){
                                        var nama = result.pro[i].nama;
                                        html +=`<div class='row trail pro rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;'>
                                            <div class='col-md-4'>
                                            <p hidden class='kd_nrc'>`+result.pro[i].kode_mitra+`</p>`+nama+`
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.pro[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    $('#proDet').html(html);

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
                                                showInLegend: false
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
                                                showInLegend: false
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
                                                showInLegend: false
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
                                                showInLegend: false
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
            // $('.trail').hover(function() { 
            //     // var warna = $(this).closest('div').find('h1').text(); 
            //     // $(this).css('background-color', 'grey'); 
            //     alert('in');
            // }, function() { 
            //     // $(this).css('background-color', 'white'); 
            //     alert('out');
            // }); 


            // $(document).ready(function(){
            //     $( '.kas_rowke0' ).hover(function() {
            //         $(this).css('background-color', 'yellow');
            //     },function(){
            //         $(this).css('background-color', 'white');
            //     });

            //   });
            </script>

        ";
        

		return "";
	}
	
}
?>
