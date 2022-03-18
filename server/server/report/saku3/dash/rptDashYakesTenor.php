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
class server_report_saku3_dash_rptDashYakesTenor extends server_report_basic
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
        if($tmp[1] == ""){
            $tmp=explode("|",$this->filter2);
        }
		$kode_lokasi=$tmp[0];
        $periode=$tmp[1];
        $kode_pp=$tmp[2];
        $nik=$tmp[3];
        $kode_fs=$tmp[4];
        $tglakhir = $tmp[5];
        $kode_plan = $tmp[6];
        $kode_klp= $tmp[7];

        $kode_fs="FS1";
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = "919006";
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        
        $param = $dbLib->execute("select tgl_akhir,kode_plan,kode_klp from inv_filterdash where nik='".$_SESSION['userLog']."'");
        
        $tglakhir = $param->fields[0];
        $kode_plan = $param->fields[1];
        $kode_klp = $param->fields[2];
        echo "<script>console.log('tgl_akhir:$tglakhir')</script>";

        if($kode_plan == ""){
            $kode_plan = "1";
        }

        if($kode_klp == ""){
            $kode_klp = "5050";
        } 
        
        $filter = ""; 

        $sql2 = "select max(a.tanggal) as tgl from 
                (
                select tanggal from inv_saham_kkp $filter
                union all 
                select tanggal from inv_rd_kkp  $filter
                union all 
                select tanggal from inv_sp_kkp $filter
                union all 
                select tanggal from inv_depo_kkp $filter
                union all
                select tanggal from inv_tab_kkp $filter
                ) a
                ";
        $rsta = $dbLib->execute($sql2);
        $tglakhirx = $rsta->fields[0];
        if($tglakhir == ""){
            $tglakhir = $tglakhirx;            
        }


        $tahun = substr($tglakhir,0,4);
        $tahunSebelum = intval($tahun) - 1;

        $bulanNow = substr($tglakhir,5,2);
        $sql3 = "select nama from inv_plan where kode_plan='$kode_plan'";
        $rsnm = $dbLib->execute($sql3);
        $nama_plan = $rsnm->fields[0];
		
		$link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/yakes";
        $root=$link;
		$path = $link."/";	
		
        $resource = $_GET["resource"];
        $fullId = $_GET["fullId"];

        
        $poly1 = $path."image/Polygon1.png";
        $poly2 = $path."image/Polygon12.png";
        $group12 = $path."image/Group12.png";
        $group13 = $path."image/RpRed.png";
        $group14 = $path."image/spi.png";
        $group15 = $path."image/coins2.svg";
        
        $icon_refresh = $path."image/icon_refresh.png";
        
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
                font-size:24px !important;
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
                box-shadow: 0 3px 3px 3px #00000029;
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

              .traceROI{
                  color:blue;
                  cursor:pointer;
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
                    width:400px;
                }

        </style>
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px;position: fixed;width: 100%;z-index: 1;background:white;margin-top: -5px;border-radius: unset;border: 1px solid
            white;'> 
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:absolute;'>Tenor Bond </h3>
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
                    <div class='col-md-12 col-xs-12 pad-more'>
                        <div class='panel mar-mor' style='box-shadow: none;'>
                            <div class='panel-body' style='padding-top:0'>
                                <div id='tenor' style='margin:0;height:300px'>
                                </div>
                            </div>
                        </div>
                    </div>
                    <h3 style='padding-left:12px;padding-bottom:10px'>Komposisi</h3>
                    <div class='col-md-12 col-xs-12 pad-more' >
                        <div class='panel mar-mor' style='box-shadow: none;'>
                            <div class='panel-body' style='padding-top:0'>
                                <div id='komposisi' style='margin:0;height:300px'>
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
            <a href='#' data-id='alokasi' class='sidepanel-link' >Alokasi Aset</a>
            <a href='#' data-id='realisasi' class='sidepanel-link'>Realisasi Jenis Investasi</a>
            <a href='#' data-id='roi' class='sidepanel-link'>ROI</a>
            <a href='#' data-id='plan_aset' class='sidepanel-link'>Plan Aset vs Kewajiban Aktuaria</a>
            <a href='#' data-id='kinerja' class='sidepanel-link'>Kinerja Reksadana, Fund Manager</a>
            <a href='#' data-id='cash_out' class='sidepanel-link'>Pendapatan dan Cash Out</a>
            <a href='#' data-id='fixincome' class='sidepanel-link' >Portofolio Fix Income</a>
            <a href='#' data-id='tenor' class='sidepanel-link' style='color:#4274FE'>Tenor</a>
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
        <!-- Filter colom -->
        <div class='modal fade' tabindex='-1' role='dialog' id='modalColom'>
            <div class='modal-dialog modal-md' role='document'>
                <div class='modal-content'>
                    <div class='modal-header'>
                        <h5 class='modal-title'>Filter</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                        </button>
                    </div>
                    <div class='modal-body' style='height: 365px;'>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Kolom 1</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <select class='form-control selectize filter-colom' id='kolom1'>
                                        <option val='' disabled>Pilih</option>
                                        </select>   
                                    </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Kolom 2</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select class='form-control selectize filter-colom' id='kolom2'>
                                        <option val='' disabled>Pilih</option>
                                        </select>      
                                    </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Kolom 3</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <select class='form-control selectize filter-colom' id='kolom3'>
                                        <option val='' disabled>Pilih</option>
                                        </select>   
                                    </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                                    <label class='control-label col-sm-3'>Kolom 4</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                    <select class='form-control selectize filter-colom' id='kolom4'>
                                        <option val='' disabled>Pilih Komposisi</option>
                                        </select>      
                                    </div>
                            </div>
                        </div>
                        <div class='row text-right' style='margin-top:30px'>
                            <div class='form-group'>
                                <div class='col-sm-12' style='margin-bottom:5px;padding-right:10px'>
                                <button type='button' class='btn btn-primary' id='btnOkCol'>Tampilkan</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <script>

            $('.panel').on('click', '#btn-refresh', function(){
                location.reload();
            });

            $('.panel').on('click', '#btn-filter', function(){
                var plan = $('#kode_plan').text();
                var klp = $('#kode_klp').text();
                $('#kode_plan_inp')[0].selectize.setValue(plan);
                $('#kode_klp_inp')[0].selectize.setValue(klp);
                $('#modalFilter').modal('show');
            });

            $('.panel').on('click', '#btn-colom', function(){
                var plan = $('#kode_plan').text();
                var klp = $('#kode_klp').text();
                var tgl = $('#tglChart').text();
                var tgl2 = tgl.split(' ');
                var filtertgl = reverseDate(tgl2[1]);
                getFilKolom(plan+'|'+klp+'|'+filtertgl);

                $('#modalColom').modal('show');
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
            
            function getFilKolom(par){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/dashYakesInves.php?fx=getFilKolom',
                    dataType: 'json',
                    async:false,
                    data: {periode:'$periode',param:par},
                    success:function(result){   
                        var select = $('#kolom1').selectize(); 
                        select = select[0];
                        var control = select.selectize;
                        control.clearOptions();

                        var select2 = $('#kolom2').selectize();
                        select2 = select2[0];
                        var control2 = select2.selectize;
                        control2.clearOptions();

                        var select3 = $('#kolom3').selectize();
                        select3 = select3[0];
                        var control3 = select3.selectize;
                        control3.clearOptions();

                        var select4 = $('#kolom4').selectize();
                        select4 = select4[0];
                        var control4 = select4.selectize;
                        control4.clearOptions();
                        console.log('ini');
                        if(result.status){
                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                
                                for(i=0;i<result.daftar.length;i++){
                                    control.addOption([{text:getBulan(result.daftar[i].periode) , value:result.daftar[i].periode}]);
                                    control2.addOption([{text:getBulan(result.daftar[i].periode), value:result.daftar[i].periode}]);
                                    control3.addOption([{text:getBulan(result.daftar[i].periode), value:result.daftar[i].periode}]);
                                    control4.addOption([{text:getBulan(result.daftar[i].periode), value:result.daftar[i].periode}]);
                                }
                            }
                        }
                    }
                });
            }


            $('.sidepanel').on('click', '.sidepanel-link', function(){
                var id=$(this).data('id');
                var tgl = $('#tglChart').text();
                var tgl2 = tgl.split(' ');
                var filtertgl = reverseDate(tgl2[1]);
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
            

            // $('.panel').on('click','#asetClick',function(){
                
            // });

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

                            loadService('komposisi','GET','$root_ser/dashYakesInves.php?fx=getPersenAset',filtertgl+'|'+plan+'|'+kode_klp);
                            loadService('tenor','GET','$root_ser/dashYakesInves.php?fx=getTenor',filtertgl+'|'+plan+'|'+kode_klp);
            
                            $('#modalFilter').modal('hide');
                        }
                    }
                });
            });

            $('.modal-body').on('click','#btnOkCol',function(){
                
                var tgl = $('#tglChart').text();
                var tgl2 = tgl.split(' ');
                var filtertgl = reverseDate(tgl2[1]);
                var plan = $('#kode_plan').text();
                var kode_klp = $('#kode_klp').text();

                var kol1 = $('#kolom1')[0].selectize.getValue();
                var kol2 = $('#kolom2')[0].selectize.getValue();
                var kol3 = $('#kolom3')[0].selectize.getValue();
                var kol4 = $('#kolom4')[0].selectize.getValue();

                var kode_lokasi = '$kode_lokasi';
                var nik = '$nik';

                $.ajax({
                    type: 'GET',
                    url:'$root_ser/dashYakesInves.php?fx=simpanFilterKolom',
                    dataType: 'json',
                    data: {'kolom1':kol1,'kolom2':kol2,'kolom3':kol3,'kolom4':kol4,'kode_lokasi':kode_lokasi,'nik':nik},
                    success:function(result){  
                        alert(result.message);  
                        if(result.status){
                            loadService('tableAlok','GET','$root_ser/dashYakesInves.php?fx=getTableAlokasi',filtertgl+'|'+plan+'|'+kode_klp); 
            
                            $('#modalColom').modal('hide');
                        }
                    }
                });
 
            });

            $('.panel-body').on('click','#traceROI',function(){
                
                var tgl = $('#tglChart').text();
                var tgl2 = tgl.split(' ');
                var filtertgl = reverseDate(tgl2[1]);
                var plan = $('#kode_plan').text();
                var kode_klp = $('#kode_klp').text();

                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2ROI','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|'+filtertgl+'|'+plan+'|'+kode_klp);

               
            });
    
            $('.panel-body').on('click','.traceROI',function(){
                
                var tgl = $('#tglChart').text();
                var tgl2 = tgl.split(' ');
                var filtertgl = reverseDate(tgl2[1]);
                var plan = $('#kode_plan').text();
                var kode_klp = $('#kode_klp').text();
                var kelas = $(this).closest('tr').find('p').text();

                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2ROI','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|'+filtertgl+'|'+plan+'|'+kode_klp+'|'+kelas);

               
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
                            var tahun = parseInt(tgl.substr(6,4));
                            var thnSblm = tahun-1;
                            var blnNow = tgl.substr(3,2);
                            $('#thnSebelum').text(' vs plan aset '+thnSblm);

                            
                            $('.tdThnNow').text(tahun);
                            $('.tdThnLalu').text(thnSblm);
                            
                            $('.tdBlnNow').text(getNamaBulan(blnNow).substr(0,3));

                            
                            $('.blnIni').text(getNamaBulan(blnNow));

    
                            
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

                                        loadService('komposisi','GET','$root_ser/dashYakesInves.php?fx=getKomposisiTenor',tglreverse+'|'+plan+'|'+kode_klp);
                                        loadService('tenor','GET','$root_ser/dashYakesInves.php?fx=getTenor',tglreverse+'|'+plan+'|'+kode_klp);
                                                                
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

            function getBulan(periode){
                var x = periode.substr(0,4);
                var y = periode.substr(4,2);
                switch (y){
                    case 1 : case '1' : case '01': bulan = 'Jan'; break;
                    case 2 : case '2' : case '02': bulan = 'Feb'; break;
                    case 3 : case '3' : case '03': bulan = 'Mar'; break;
                    case 4 : case '4' : case '04': bulan = 'Apr'; break;
                    case 5 : case '5' : case '05': bulan = 'Mei'; break;
                    case 6 : case '6' : case '06': bulan = 'Jun'; break;
                    case 7 : case '7' : case '07': bulan = 'Jul'; break;
                    case 8 : case '8' : case '08': bulan = 'Ags'; break;
                    case 9 : case '9' : case '09': bulan = 'Sep'; break;
                    case 10 : case '10' : case '10': bulan = 'Okt'; break;
                    case 11 : case '11' : case '11': bulan = 'Nov'; break;
                    case 12 : case '12' : case '12': bulan = 'Des'; break;
                    case 'Q1': bulan = 'Q1'; break;
                    case 'Q2': bulan = 'Q2'; break;
                    case 'Q3': bulan = 'Q3'; break;
                    default: bulan = null;
                }
        
                return bulan+' '+x;
            }
            
            
            function sepNum(x){
                if(!isNaN(x)){
                    if (typeof x === undefined || !x || x == 0) { 
                        return 0;
                    }else if(!isFinite(x)){
                        return 0;
                    }else{
                        var x = parseFloat(x).toFixed(6);
                        // console.log(x);
                        var tmp = x.toString().split('.');
                        // console.dir(tmp);
                        var y = tmp[1].substr(0,2);
                        var z = tmp[0]+'.'+y;
                        var parts = z.split('.');
                        parts[0] = parts[0].replace(/([0-9])(?=([0-9]{3})+$)/g,'$1.');
                        return parts.join(',');
                    }
                }else{
                    return 0;
                }
            }

            function sepNumPas(x){
                if(!isNaN(x)){
                    var num = parseFloat(x).toFixed(0);
                    var parts = num.toString().split('.');
                    var len = num.toString().length;
                    // parts[1] = parts[1]/(Math.pow(10, len));
                    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
                    return parts.join(',');
                }else{
                    return 0;
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

            function toJutaPas(x) {
                var nil = x / 1000000;
                return sepNumPas(nil) + '';
            }

            function toMilyar(x) {
                var nil = x / 1000000000;
                return sepNum(nil) + ' M';
            }

            function reverseDate(date_str, separator,newSepar){
                if(typeof separator === 'undefined'){separator = '-'}
                if(typeof newSepar === 'undefined'){newSepar = '-'}
                date_str = date_str.split(' ');
                var str = date_str[0].split(separator);
            
                return str[2]+newSepar+str[1]+newSepar+str[0];
            }

            $('#thnSebelum').text(' vs plan aset $tahunSebelum');
            
            $('#tglChart').text('s/d '+reverseDate('".$tglakhir."'));

            $('.tdThnNow').text(".$tahun.");
            $('.tdThnLalu').text(".$tahunSebelum.");
            
            $('.tdBlnNow').text(getNamaBulan(".$bulanNow.").substr(0,3));
            
            $('.blnIni').text(getNamaBulan(".$bulanNow."));


            $('#jplan').text('$nama_plan');

            function loadService(index,method,url,param=null){
                $.ajax({
                    type: method,
                    url: url,
                    dataType: 'json',
                    data: {'periode':'$periode','param':param},
                    success:function(result){    
                        if(result.status){
                            switch(index){
                                case 'komposisi':
                                    Highcharts.chart('komposisi', {
                                        title: {
                                            text: null
                                        },
                                        credits:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            categories: result.ctg,
                                            title: {
                                                text: 'Year'
                                            },
                                            crosshair: true
                                        },
                                        yAxis: {
                                            
                                            title: {
                                                text: null
                                            },
                                            
                                        },
                                        tooltip: {
                                            headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                                '<td style=\"padding:0\"><b>{point.y:.2f}</b></td></tr>',
                                            footerFormat: '</table>',
                                            shared: true,
                                            useHTML: true
                                        },
                                        legend:{
                                            enabled:true
                                        },
                                        plotOptions: {
                                            column: {
                                                stacking: 'normal',
                                                dataLabels: {
                                                    enabled: false
                                                }
                                            }
                                        },
                                        // series: [{
                                        //     data: [49.9, 71.5, 106.4, 129.2, 144.0, 176.0, 135.6, 148.5, 216.4, 194.1, 95.6, 54.4],
                                        //     color:'#ffcc00'
                                    
                                        // }, {
                                        //     data: [83.6, 78.8, 98.5, 93.4, 106.0, 84.5, 105.0, 104.3, 91.2, 83.5, 106.6, 92.3],
                                        //     color:'#4274fe'
                                    
                                        // }]
                                        series: result.series
                                    });
                                break;
                                case 'tenor':
                                    // Build the chart
                                    
                                    console.log(result.ctg);
                                    console.log(result.series);
                                    Highcharts.chart('tenor', {
                                        chart: {
                                            type: 'column'
                                        },
                                        title: {
                                            text: null
                                        },
                                        credits:{
                                            enabled:false
                                        },
                                        xAxis: {
                                            categories: result.ctg,
                                            title: {
                                                text: ''
                                            },
                                            crosshair: true
                                        },
                                        yAxis: {
                                            
                                            title: {
                                                text: ''
                                            },
                                            labels: {
                                                formatter: function () {
                                                    return this.value+' %';
                                                }
                                            }
                                        },
                                        legend:{
                                            enabled:false
                                        },
                                        tooltip: {
                                            // headerFormat: '<span style=\"font-size:10px\">{point.key}</span><table>',
                                            // pointFormat: '<tr><td style=\"color:{series.color};padding:0\">{series.name}: </td>' +
                                            //     '<td style=\"padding:0\"><b>{point.y:.2f} %</b></td></tr>',
                                            // footerFormat: '</table>',
                                            // shared: true,
                                            // useHTML: true
                                            formatter: function () {
                                                return this.point.key+'<br>'+this.series.name+':<b>'+sepNum(this.y)+'%</b><br>'+
                                                    '<b>'+toMilyar(this.point.nil)+'</b>';
                                            }
                                        },
                                        plotOptions: {
                                            column: {
                                                pointPadding: 0.2,
                                                borderWidth: 0
                                            }
                                        },
                                        series : result.series
                                    });
                                break;
                                                                    


                            }
                        }
                    }
                });
            }
            function initDash(){
                
                loadService('komposisi','GET','$root_ser/dashYakesInves.php?fx=getKomposisiTenor','$tglakhir|$kode_plan|$kode_klp');
                loadService('tenor','GET','$root_ser/dashYakesInves.php?fx=getTenor','$tglakhir|$kode_plan|$kode_klp');
            }

            initDash();
            </script>

        ";
        

		return "";
	}
	
}
?>