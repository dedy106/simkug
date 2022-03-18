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
class server_report_saku3_dash_rptDashYakesRealisasi extends server_report_basic
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
        $kode_plan = $tmp[6];
        $kode_klp= $tmp[7];

        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = "919006";
        $_SESSION['userPwd'] = "pusat25";
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;

        $param = $dbLib->execute("select tgl_akhir,kode_plan,kode_klp from inv_filterdash where nik='".$_SESSION['userLog']."'");
        
        $tglakhir = $param->fields[0];
        $kode_plan = $param->fields[1];
        $kode_klp = $param->fields[2];

        $tahun = substr($tglakhir,0,4);
        $tahunSebelum = intval($tahun) - 1;

        if($kode_plan == ""){
            $kode_plan = "1";
        }

        if($kode_klp == ""){
            $kode_klp = "5050";
        }

        $sql2 = "select max(a.tanggal) as tgl from 
                (
                    select tanggal from inv_saham_kkp 
                    union all 
                    select tanggal from inv_rd_kkp  
                    union all 
                    select tanggal from inv_sp_kkp 
                    union all 
                    select tanggal from inv_depo_kkp 
                ) a
                ";
        $rsta = $dbLib->execute($sql2);
        $tglakhirx = $rsta->fields[0];
        if($tglakhir == ""){
            $tglakhir = $tglakhirx;            
        }

        $sql3 = "select nama from inv_plan where kode_plan='$kode_plan'";
        $rsnm = $dbLib->execute($sql3);
        $nama_plan = $rsnm->fields[0];

        
		$link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/yakes";
        $root=$link;
		$path = $link."/";	
		
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";

       
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        
        $AddOnLib=new server_util_AddOnLib();   
       
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
                background:#007AFF !important;
                color:white;
            }
            
            .rowke1:hover{
                background:#FFCC00 !important;
                color:white;
            }
            
            .rowke2:hover{
                background:#4CD964 !important;
                color:white;
            }

            .rowke3:hover{
                background:#9F9F9F !important;
                color:white;
            }

            .rowke4:hover{
                background:#8085e9 !important;
                color:white;
            }

            .rowke5:hover{
                background:#f15c80 !important;
                color:white;
            }

            /*sidepanel menu*/

                            
            .sidepanel  {
                width: 0;
                position: fixed;
                z-index: 1;
                height: 500px;
                top: 0px !important;
                right: 0;
                background-color:
                #656565;
                overflow-x: hidden;
                transition: 0.5s;
                padding-top: 10px;
                margin-top: 52px;
                padding-right: 25px;
                text-align: right;
            }
            
            .sidepanel a {
                padding: 5px 5px 5px 32px;
                text-decoration: none;
                font-size: 20px;
                color: white;
                display: block;
                transition: 0.3s;
                cursor:pointer;
            }
            
            .sidepanel a:hover {
                color: #4274FE;
            }  
            .close{
                width:0px;
                right: -30px;
            }
            .open{
                width:450px;
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
                right: 130px !important;
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
                // height: 230px;
                height: 310px;
              }
              .control-sidebar-open .control-sidebar-bg,
              .control-sidebar-open .control-sidebar {
                top: 50;
                // height: 230px;
                height: 310px;
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
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px;position: fixed;width: 100%;z-index: 1;background:white;margin-top: -5px;border-radius: unset;border: 1px solid
            white;'> 
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:absolute;'>Realisasi Jenis Investasi Per  <span id='jplan'></span></h3>
                <button type='button' class='pull-right' id='btn-menu' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 5px 20px;background: #4274FE;color:white'><i class='fa fa-bars' style='padding: 4px 0;'></i>
                </button>
                <button type='button' class='pull-right' id='btn-refresh' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 5px 20px;background: white;'><i class='fa fa-refresh' style='padding-top: 4px;padding-bottom: 4px;'></i>
                </button>
                <div class='btn-group pull-right ' style=''>
                <button type='button' id='open-sidebar' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 5px 20px;background: white;'>
                <i class='fa fa-calendar' style='padding:4px 0px'></i>
                </button>
                </div>
                <button type='button' class='pull-right' id='btn-filter' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 5px 20px;background: white;'><i class='fa fa-filter' style='padding:4px 0px'></i> 
                </button>
                <br><span style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: black;position: relative;' id='tglChart'></span>
                <span hidden id='kode_plan'></span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: black;'></span><span id='kode_klp' hidden></span>
            </div>
            <div class='panel-body' style='padding-top:70px'>
                <div class='row'>
                    <div class='col-md-6 col-xs-6' style='height:525px;border-right:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE'>
                        <div id='aset' style='margin:5px'></div>
                    </div>
                    <div class='col-md-6 col-xs-6' style='height:255px;border-right:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-body' style='height:245px;padding-right: 0px;padding-top:0'>
                               
                                <div id='efek' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div style='margin: 0 auto; padding-right: 10px;padding-top:10px;' class='col-md-7 col-xs-7'>
                                    <span style='font-size: 15px'> Efek Berpendapatan Tetap</span>:
                                    <span class='pull-right' style='font-size: 15px' id='persenEbt'></span>
                                    <div id='ebtDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;font-size:12px'>
                                        
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 col-xs-6' style='height:270px;border-right:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-body' style='height:245px;padding-right: 0px;padding-top:0'>
                                <div id='saham' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div style='margin: 0 auto; padding-right: 10px;padding-top:10px;' class='col-md-7 col-xs-7' >
                                    <span style='font-size: 15px'> Saham Bursa</span>:
                                    <span class='pull-right' style='font-size: 15px' id='persenSb'></span>
                                    <div id='sbDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;font-size:12px'>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 col-xs-6' style='height:300px;border-right:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-body' style='height:245px;padding-right: 0px;padding-top:0'>
                                <div id='kas' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div style='margin: 0 auto; padding-right: 10px;padding-top:10px;' class='col-md-7 col-xs-7'>
                                    <span style='font-size: 15px'> Kas</span>:
                                    <span class='pull-right' style='font-size: 15px' id='persenKas'></span>
                                    <div  id='kasDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;font-size:12px'></div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-6 col-xs-6' style='height:300px;border-right:1px solid #BEBEBE;border-bottom:1px solid #BEBEBE'>
                        <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                            <div class='panel-body' style='height:245px;padding-right: 0px;padding-top:0'>
                                <div id='saham_np' style='margin: 0 auto; padding: 0 auto;height:250px;' class='col-md-5 col-xs-5'>
                                </div>
                                <div style='margin: 0 auto; padding-right: 10px;padding-top:10px;' class='col-md-7 col-xs-7'>
                                    <span style='font-size: 15px'> Saham Non Publik </span>:
                                    <span class='pull-right' style='font-size: 15px' id='persenPro'></span>
                                    <div id='proDet' style='margin: 0 auto; padding-right: 10px;padding-top:10px;font-size:12px'>
                                    
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div id='mySidepanel' class='sidepanel close'>
            <a href='#' data-id='global' class='sidepanel-link' >Global and Markets Issues</a>
            <a href='#' data-id='bindo' class='sidepanel-link'>Pergerakan Index 80 vs BINDO Index</a>
            <a href='#' data-id='alokasi' class='sidepanel-link'>Alokasi Aset</a>
            <a href='#' data-id='realisasi' class='sidepanel-link' style='color:#4274FE'>Realisasi Jenis Investasi</a>
            <a href='#' data-id='roi' class='sidepanel-link'>ROI</a>
            <a href='#' data-id='plan_aset' class='sidepanel-link'>Plan Aset vs Kewajiban Aktuaria</a>
            <a href='#' data-id='kinerja' class='sidepanel-link'>Kinerja Reksadana, Fund Manager</a>
            <a href='#' data-id='cash_out' class='sidepanel-link'>Pendapatan dan Cash Out</a>
            <a href='#' data-id='fixincome' class='sidepanel-link'>Portofolio Fix Income</a>
            <a href='#' data-id='tenor' class='sidepanel-link'>Tenor</a>
        </div>
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
                                        <option val='' disabled>Pilih Plan Aset</option>";
                                        $rsplan = $dbLib->execute("select kode_plan,nama from inv_plan ");
                                        while($row=$rsplan->FetchNextObject($toupper=false)){
                                            
                                            echo"<option value='$row->kode_plan' >$row->kode_plan - $row->nama</option>";
                                        }
                                        echo"
                                        </select>   
                                    </div>
                            </div>
                        </div>
                        <div class='row' style='display:none'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Komposisi</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select class='form-control selectize' id='kode_klp_inp'>
                                        <option val='' disabled>Pilih Komposisi</option>";
                                        $rsklp = $dbLib->execute("select kode_klp from inv_persen ");
                                        while($row=$rsklp->FetchNextObject($toupper=false)){
                                            echo"<option value='$row->kode_klp' >$row->kode_klp - [Campuran-Saham]</option>";
                                        }
                                        echo"
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
        <aside class='control-sidebar control-sidebar-light' style=''>
            <div class='tab-content' hidden>
                <div class='tab-pane active' id='control-sidebar-home-tab'>
                    <!-- Calendar -->
                    <style>
                    .datepicker-inline {
                        width: 100%;
                    }
                    </style>
                    <div class='box box-solid '>
                    <div class='box-header'>
                    <i class='fa fa-calendar'></i>
                    <h3 class='box-title'>Calendar</h3>
                    </div>
                    <!-- /.box-header -->
                    <div class='box-body no-padding'>
                    <!--The calendar -->
                    <div id='calendar' style='width: 100%'></div>
                    </div>
                </div>
            </div>
        </aside>
        <script>

            $('.panel').on('click', '#btn-refresh', function(){
                location.reload();
            });

            
            function reverseDate(date_str, separator,newSepar){
                if(typeof separator === 'undefined'){separator = '-'}
                if(typeof newSepar === 'undefined'){newSepar = '-'}
                date_str = date_str.split(' ');
                var str = date_str[0].split(separator);
            
                return str[2]+newSepar+str[1]+newSepar+str[0];
            }

            $('.panel').on('click', '#btn-filter', function(){
                var plan = $('#kode_plan').text();
                var klp = $('#kode_klp').text();
                $('#kode_plan_inp')[0].selectize.setValue(plan);
                $('#kode_klp_inp')[0].selectize.setValue(klp);
                $('#modalFilter').modal('show');
            });

            $('.panel').on('click', '#open-sidebar', function(){
            
                if($('aside').hasClass('control-sidebar-open')){
                     $('aside').removeClass('control-sidebar-open');
                     $('.tab-content').hide();
                }else{
                     $('aside').addClass('control-sidebar-open');
                     $('.tab-content').show();
                }
            });

            $('.sidepanel').on('click', '.sidepanel-link', function(){
                var id=$(this).data('id');
                var filtertgl = '$tglakhir';
                var plan = $('#kode_plan').text();
                var kode_klp = $('#kode_klp').text();
                switch(id){
                    case 'global':        
                       var laporan = 'server_report_saku3_dash_rptDashYakesGlobalMarket';
                    break;
                    case 'bindo':
                       var laporan = 'server_report_saku3_dash_rptDashYakesBindo';
                    break;
                    case 'alokasi':                        
                       var laporan = 'server_report_saku3_dash_rptDashYakesAlokAset';
                    break;
                    case 'realisasi':
                       var laporan = 'server_report_saku3_dash_rptDashYakesRealisasi';
                    break;
                    case 'roi':
                        var laporan = 'server_report_saku3_dash_rptDashYakesROI';
                    break;
                    case 'plan_aset':
                        var laporan = 'server_report_saku3_dash_rptDashYakesPlanAsset';
                    break;
                    case 'kinerja':
                        var laporan = 'server_report_saku3_dash_rptDashYakesKinerja';
                    break;
                    case 'cash_out':
                        var laporan = 'server_report_saku3_dash_rptDashYakesCashOut';
                    break;
                    case 'fixincome':
                        var laporan = 'server_report_saku3_dash_rptDashYakesPortofolio';
                    break;
                    case 'tenor':
                        var laporan = 'server_report_saku3_dash_rptDashYakesTenor';
                    break;
                }

                window.parent.system.getResource(".$resource.").doOpen(laporan,'','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|'+filtertgl+'|'+plan+'|'+kode_klp);
            });
            
            function openNav() {
                var element = $('#mySidepanel');
                
                var x = $('#mySidepanel').attr('class');
                var y = x.split(' ');
                if(y[1] == 'close'){
                    element.removeClass('close');
                    element.addClass('open');
                }else{
                    element.removeClass('open');
                    element.addClass('close');
                }
            }

            $('.panel').on('click','.trail',function(){
                // var kode = $(this).closest('div').find('p').text();
                // switch(kode){
                //     case 'DOC' : case '12' :
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|DOC');
                //     break;
                //     case 'DEPO' : case '13' :
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|Depo');
                //     break;
                //     case 'RDPU' : case '16' :
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPU');
                //     break;
                //     case 'RDPD' : case '241':
                         
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPD');
                //     break;
                //     case 'RDPR' : case '243':
                         
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPR');
                //     break;
                //     case 'RDCM' : case '244':
                         
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMEBT');
                //     break;
                //     case 'SHM' : case '31':
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves3Det2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|SH');
                //     break;
                //     case 'RDSH' : case '321':
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDSH');
                //     break;
                //     case 'SHCM' : case '322': 
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMSB');
                //     break;
                //     case 'RETF' : case '324':
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang3','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RETF');
                //     break;
                //     case 'GYS':
                //     case 'RSPL':
                //     case 'TLT':
                //         window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves3SP','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|'+kode);
                //     break;

                // }
                

            });
  

            $('.panel').on('click', '#btn-menu', function(){
                openNav();
            });

            $('#kode_plan').text('$kode_plan');
            $('#kode_klp').text('$kode_klp');
           
            function view_klp(kode){
                var tmp1 = kode.substr(0,2);
                var tmp2 = kode.substr(2,2);
                return '('+tmp1+':'+tmp2+')';
            }

            $('#kode_klp_view').text(view_klp('$kode_klp'));
            
            
            $('#jplan').text('$nama_plan');

            // $('.panel').on('click','.trail',function(){
            //     var kode = $(this).closest('div').find('p').text();
            //     switch(kode){
            //         case '12' :
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|DOC');
            //         break;
            //         case '13' :
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesDeposito2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|Depo');
            //         break;
            //         case '16' :
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPU');
            //         break;
            //         case '241':
                         
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPD');
            //         break;
            //         case '242':
                         
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPD');
            //         break;
            //         case '243':
                         
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDPR');
            //         break;
            //         case '244':
                         
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMEBT');
            //         break;
            //         case '31':
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2Det2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|SH');
            //         break;
            //         case '321':
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDSH');
            //         break;
            //         case '322': 
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RDCMSB');
            //         break;
            //         case '324':
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRDPasarUang2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|RETF');
            //         break;
            //         case 'GYS':
            //         case 'RSPL':
            //         case 'TLT':
            //             window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2SP','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp|'+kode);
            //         break;

            //     }
                

            // });

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
                $('#calendar').on('changeDate', function() {
                    // $('#my_hidden_input').val(
                        
                        // alert($('#calendar').datepicker('getFormattedDate'));
                        var tgl = $('#calendar').datepicker('getFormattedDate');
                        var tglreverse = reverseDate(tgl,'/');
                        if(tglreverse > '$tglakhirx'){
                            alert('Data transaksi diinput terakhir $tglakhirx');
                            return false;
                        }else{
                            var tglgrafik = reverseDate(tglreverse);
                            $('#tglChart').text('s/d '+tglgrafik);
                            var thnSblm = parseInt(tgl.substr(6,4))-1;
                            $('#thnSebelum').text(' vs plan aset '+thnSblm);
    
                            var plan = $('#kode_plan').text();
                            var kode_klp = $('#kode_klp').text();
                            $.ajax({
                                type: 'GET',
                                url:'$root_ser/dashYakesInves.php?fx=updateTgl',
                                dataType: 'json',
                                data: {'tgl':tglreverse},
                                success:function(result){  
                                    alert(result.message);  
                                    if(result.status){
                                        loadService('getPortofolio','GET','$root_ser/dashYakesInves.php?fx=getPortofolio',tglreverse+'|'+plan+'|'+kode_klp); 
                                        loadService('getPersen','GET','$root_ser/dashYakesInves.php?fx=getBatasAlokasi',tglreverse+'|'+plan+'|'+kode_klp); 
                                        loadService('asetchart','GET','$root_ser/dashYakesInves.php?fx=getAset',tglreverse+'|'+plan+'|'+kode_klp); 
                                        
                                                                
                                        $('aside').removeClass('control-sidebar-open');
                                        $('.tab-content').hide();
                                    }
                                }
                            });
                        }
                       
                    // );
                });
            $('.datepicker-inline').width('100%');
            $('.table-condensed').width('100%');

            $('#tglChart').text('s/d '+reverseDate('".$tglakhir."'));
            
            $('.modal-body').on('click','#btnOk',function(){
                
                var tgl = $('#tglChart').text();
                var tgl2 = tgl.split(' ');
                var filtertgl = reverseDate(tgl2[1]);
                // alert (filtertgl);
                var plan = $('#kode_plan_inp')[0].selectize.getValue();
                var kode_klp = $('#kode_klp_inp')[0].selectize.getValue();
                var nama_plan = $('#kode_plan_inp')[0].selectize.getItem($('#kode_plan_inp')[0].selectize.getValue()).text();
                var nama_plan = nama_plan.split(' - ');
                $('#jplan').text(nama_plan[1]);

                $('#kode_plan').text(plan);
                $('#kode_klp').text(kode_klp);
                $('#kode_klp_view').text(view_klp(kode_klp));

                $.ajax({
                    type: 'GET',
                    url:'$root_ser/dashYakesInves.php?fx=updateParam',
                    dataType: 'json',
                    data: {'kode_klp':kode_klp,'kode_plan':plan},
                    success:function(result){  
                        alert(result.message);  
                        if(result.status){
                            
                            loadService('getPortofolio','GET','$root_ser/dashYakesInves.php?fx=getPortofolio',filtertgl+'|'+plan+'|'+kode_klp); 
                            loadService('getPersen','GET','$root_ser/dashYakesInves.php?fx=getBatasAlokasi',filtertgl+'|'+plan+'|'+kode_klp); 
                            loadService('asetchart','GET','$root_ser/dashYakesInves.php?fx=getAset',filtertgl+'|'+plan+'|'+kode_klp); 
            
                            $('#modalFilter').modal('hide');
                        }
                    }
                });
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

            function toMilyar(x) {
                var nil = x / 1000000000;
                return sepNum(nil) + ' M';
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

            function toJuta2(x) {
                var nil = x / 1000000;
                return sepNumPas(nil);
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
                                    // var color = ['#7cb5ec', '#434348', '#90ed7d', '#f7a35c', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
                                    
                                    var color = ['#007AFF', '#FFCC00', '#4CD964', '#9F9F9F', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1'];
                                    var totKas=0;
                                    for(var i=0;i< result.kas.length;i++){
                                        var nama = result.kas[i].nama;
                                        var tmp = nama.split('.');
                                        totKas+=+parseFloat(result.kas[i].n3);
                                        var per = (result.kas[i].persen != 'undefined' ? sepNum(result.kas[i].persen) : 0);
                                        html +=`<div class='row trail kas rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;background:#F0F0F0'>
                                            <div class='col-md-4' style='padding-right:0'>
                                            <p hidden class='kd_nrc'>`+result.kas[i].kode_subkelas+`</p>`+nama+` `+per+`%
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.kas[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    html +=`<div class='row trail kas rowkex' style='margin-bottom:10px;margin-right: -10px;font-weight:bold;background:#F0F0F0'>
                                            <div class='col-md-4' style='padding-right:0'>
                                            <p hidden class='kd_nrc'>jumlahKas</p>Jumlah
                                            </div>
                                            <div class='col-md-8 text-right' style='padding-right:32px'><h1 hidden>black</h1>
                                            `+sepNumPas(totKas)+`
                                            </div>
                                        </div>`;
                                    $('#kasDet').html(html);

                                    var html = '';
                                    var ebt = [];
                                    var totEbt =0;
                                    for(var i=0;i< result.ebt.length;i++){
                                        var nama = result.ebt[i].nama;
                                        var tmp = nama.split('.');
                                        totEbt+=+result.ebt[i].n3;
                                        var per = (result.ebt[i].persen !='undefined' ? sepNum(result.ebt[i].persen) : 0);

                                        html +=`<div class='row trail ebt rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;background:#F0F0F0'>
                                            <div class='col-md-4' style='padding-right:0'>
                                            <p hidden class='kd_nrc'>`+result.ebt[i].kode_subkelas+`</p>`+nama+`  `+per+`%
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.ebt[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    html +=`<div class='row trail kas rowkex' style='margin-bottom:10px;margin-right: -10px;font-weight:bold;background:#F0F0F0'>
                                            <div class='col-md-4' style='padding-right:0'>
                                            <p hidden class='kd_nrc'>jumlahKas</p>Jumlah
                                            </div>
                                            <div class='col-md-8 text-right' style='padding-right:32px'><h1 hidden>black</h1>
                                            `+sepNumPas(totEbt)+`
                                            </div>
                                        </div>`;
                                    $('#ebtDet').html(html);

                                    var html = '';
                                    var sb = [];
                                    var totSb=0;
                                    for(var i=0;i< result.sb.length;i++){
                                        var nama = result.sb[i].nama;
                                        var tmp = nama.split('.');
                                        totSb+=+result.sb[i].n3;
                                        var per = (result.sb[i].persen !='undefined' ? sepNum(result.sb[i].persen) : 0);
                                        html +=`<div class='row trail sb rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;background:#F0F0F0'>
                                            <div class='col-md-4' style='padding-right:0'>
                                            <p hidden class='kd_nrc'>`+result.sb[i].kode_subkelas+`</p>`+nama+`  `+per+`%
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.sb[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    html +=`<div class='row trail kas rowkex' style='margin-bottom:10px;margin-right: -10px;font-weight:bold;background:#F0F0F0'>
                                        <div class='col-md-4' style='padding-right:0'>
                                        <p hidden class='kd_nrc'>jumlahKas</p>Jumlah
                                        </div>
                                        <div class='col-md-8 text-right' style='padding-right:32px'><h1 hidden>black</h1>
                                        `+sepNumPas(totSb)+`
                                        </div>
                                    </div>`;
                                    $('#sbDet').html(html);

                                    var html = '';
                                    var pro = [];
                                    var totPro=0;
                                    for(var i=0;i< result.pro.length;i++){
                                        var nama = result.pro[i].nama;
                                        totPro+=+result.pro[i].n3;
                                        var per = (result.pro[i].persen != 'undefined' ? sepNum(result.pro[i].persen) : 0);
                                        html +=`<div class='row trail pro rowke`+i+`' style='border-left:4px solid `+color[i]+`;margin-bottom:10px;margin-right: -10px;background:#F0F0F0'>
                                            <div class='col-md-4' style='padding-right:0'>
                                            <p hidden class='kd_nrc'>`+result.pro[i].kode_mitra+`</p>`+nama+`  `+per+`%
                                            </div>
                                            <div class='col-md-8 text-right'><h1 hidden>`+color[i]+`</h1>
                                            `+sepNumPas(result.pro[i].n3)+` <i class='fa fa-arrow-up' style='-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);-ms-transform: rotate(45deg);-o-transform: rotate(45deg);transform: rotate(45deg);'></i>
                                            </div>
                                        </div>`;
                                    }
                                    html +=`<div class='row trail kas rowkex' style='margin-bottom:10px;margin-right: -10px;font-weight:bold;background:#F0F0F0'>
                                        <div class='col-md-4' style='padding-right:0'>
                                        <p hidden class='kd_nrc'>jumlahKas</p>Jumlah
                                        </div>
                                        <div class='col-md-8 text-right' style='padding-right:32px'><h1 hidden>black</h1>
                                        `+sepNumPas(totPro)+`
                                        </div>
                                    </div>`;
                                    $('#proDet').html(html);

                                    var Kasc = Highcharts.chart('kas', {
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
                                            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: false,
                                                    format: '<strong>{point.name}</strong>{point.percentage:.2f}%',
                                                    style:{
                                                        width:'120px'
                                                    }
                                                },
                                                // size:'60%',
                                                showInLegend: false
                                            }
                                        },
                                        series: [{
                                            name: 'Nilai',
                                            data: result.kas_chart
                                        }],
                                        credits:{
                                            enabled:false
                                        }
                                    });

                                    $('.kas').each(function (i, value) {
                                        $(this).hover(function (e) {
                                            var x = $(this).index();
                                            var point = Kasc.series[0].data[x]; //Or any other point
                                            if(point != 'undefined'){
                                                point.select();
                                                Kasc.tooltip.refresh(point);
                                            }
                                        });
                                    });
                                    
                                    var Saham = Highcharts.chart('saham', {
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
                                            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: false,
                                                    format: '<strong>{point.name}</strong>{point.percentage:.2f}%',
                                                    style:{
                                                        width:'120px'
                                                    }
                                                },
                                                // size:'60%',
                                                showInLegend: false
                                            }
                                        },
                                        series: [{
                                            name: 'Nilai',
                                            data: result.sb_chart
                                        }],
                                        credits:{
                                            enabled:false
                                        }
                                    });

                                    $('.sb').each(function (i, value) {
                                        $(this).hover(function (e) {
                                            var x = $(this).index();
                                            var point = Saham.series[0].data[x]; //Or any other point
                                            if(point != 'undefined'){
                                                point.select();
                                                Saham.tooltip.refresh(point);
                                            }
                                        });
                                    });

                                    var Efek = Highcharts.chart('efek', {
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
                                            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: false,
                                                    format: '<strong>{point.name}</strong>{point.percentage:.2f}%',
                                                    style:{
                                                        width:'120px'
                                                    }
                                                },
                                                // size:'60%',
                                                showInLegend: false
                                            }
                                        },
                                        series: [{
                                            name: 'Brands',
                                            data: result.ebt_chart
                                        }],
                                        credits:{
                                            enabled:false
                                        }
                                    });

                                    $('.ebt').each(function (i, value) {
                                        $(this).hover(function (e) {
                                            var x = $(this).index();
                                            var point = Efek.series[0].data[x]; //Or any other point
                                            if(point != 'undefined'){
                                                point.select();
                                                Efek.tooltip.refresh(point);
                                            }
                                        });
                                    });
                                    
                                    var Pro = Highcharts.chart('saham_np', {
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
                                            pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: true,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: false,
                                                    format: '<strong>{point.name}</strong>{point.percentage:.2f}%',
                                                    style:{
                                                        width:'120px'
                                                    }
                                                },
                                                // size:'60%',
                                                showInLegend: false
                                            }
                                        },
                                        series: [{
                                            name: 'Brands',
                                            data: result.pro_chart
                                        }],
                                        credits:{
                                            enabled:false
                                        }
                                    });

                                    $('.pro').each(function (i, value) {
                                        $(this).hover(function (e) {
                                            var x = $(this).index();
                                            var point = Pro.series[0].data[x]; //Or any other point
                                            if(point != 'undefined'){
                                                point.select();
                                                Pro.tooltip.refresh(point);
                                            }
                                        });
                                    });
                                break;
                                case 'getPersen':
                                    $('#persenKas').text(sepNum(result.kas.persen)+'%');
                                    $('#persenEbt').text(sepNum(result.ebt.persen)+'%');
                                    $('#persenSb').text(sepNum(result.saham.persen)+'%');
                                    $('#persenPro').text(sepNum(result.pro.persen)+'%');
                                break;
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
                                        subtitle:{
                                            text: '<span style=\"font-size:10px;\"><i>*dalam jutaan rupiah</i></span>',
                                            useHTML:true,
                                            verticalAlign: 'bottom'
                                        },
                                        tooltip: {
                                            formatter: function () {
                                                return this.point.name+':<b>'+sepNum(this.percentage)+'%</b><br>'+
                                                    '<b>'+toMilyar(this.y)+'</b>';
                                            }
                                            
                                        },
                                        plotOptions: {
                                            pie: {
                                                allowPointSelect: false,
                                                cursor: 'pointer',
                                                dataLabels: {
                                                    enabled: true,
                                                    // format: '<strong>{point.name}</strong><br>{point.percentage:.2f}%<br><strong>{point.y}</strong>',
                                                    // distance: '-40%'
                                                    formatter: function () {
                                                        return this.point.name+':<b>'+sepNum(this.percentage)+'%</b><br>'+
                                                        '<b>'+toJuta2(this.y)+'</b>';
                                                    }
                                                },
                                                showInLegend: false,
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
                                                            var id = this.name;                            
                                                            var tgl = $('#tglChart').text();
                                                            var tgl2 = tgl.split(' ');
                                                            var filtertgl = reverseDate(tgl2[1]);
                                                            // alert (filtertgl);
                                                            var plan = $('#kode_plan').text();
                                                            var kode_klp = $('#kode_klp').text();
                                                            // window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|'+filtertgl+'|'+plan+'|'+kode_klp);
                                                        }
                                                    }
                                                }
                                            }
                                        },
                                        series: [{
                                            name: '',
                                            colorByPoint: true,
                                            data: [{
                                                name: 'Kas',
                                                y: parseFloat(result.kas),
                                                color:'#007AFF',
                                                key: result.kas_acuan
                                            }, {
                                                name: 'Pend Tetap',
                                                y: parseFloat(result.ebt),
                                                color:'#4CD964',
                                                key: result.ebt_acuan
                                            }, {
                                                name: 'Saham Bursa',
                                                y: parseFloat(result.saham),
                                                color:'#FF9500',
                                                key: result.saham_acuan
                                            }, {
                                                name: 'Saham Non Publik',
                                                y: parseFloat(result.propensa),
                                                color:'#5856d6',
                                                key: result.pro_acuan
                                            }]
                                        }],
                                        credits:{
                                            enabled:false
                                        }
                                    });
                                break;
                            }
                        }
                    }
                });
            }
            function initDash(){
                loadService('getPortofolio','GET','$root_ser/dashYakesInves.php?fx=getPortofolio','$tglakhir|$kode_plan|$kode_klp'); 
                loadService('getPersen','GET','$root_ser/dashYakesInves.php?fx=getBatasAlokasi','$tglakhir|$kode_plan|$kode_klp'); 
                loadService('asetchart','GET','$root_ser/dashYakesInves.php?fx=getAset','$tglakhir|$kode_plan|$kode_klp'); 

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
