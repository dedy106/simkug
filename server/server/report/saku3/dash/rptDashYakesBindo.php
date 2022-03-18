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
class server_report_saku3_dash_rptDashYakesBindo extends server_report_basic
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

        $tahun = substr($tglakhir,0,4);
        $blnNow = substr($tglakhir,5,2);
        $tahunSebelum = intval($tahun) - 1;

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
                    width:450px;
                }

        </style>
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px;position: fixed;width: 100%;z-index: 1;background:white;margin-top: -5px;border-radius: unset;border: 1px solid
            white;'> 
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:absolute;'>Pergerakan Index 80 vs BINDO Index (YTD)<span id='jplan'></span></h3>
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
                    <div class='col-md-12 table-responsive'>
                        <div id='chartIndex' style='margin: 0 auto; padding: 0 auto;height:400px'>

                        </div>
                    </div>
                </div>
                <div class='row' style='padding-right:15px'>
                    <div class='col-md-6'>
                        <table class='table table-striped table-condensed' id='global_index'>
                            <thead style='background:#F62424;color:white;vertical-align:middle;text-align:center'>
                                <tr>
                                    <th>No</th>
                                    <th>Global Index</th>
                                    <th style='vertical-align:middle;text-align:center'>Des <span class='thnLalu'></span></th>
                                    <th style='vertical-align:middle;text-align:center'><span class='blnNow'></span> <span class='thnNow'></span></th>
                                    <th style='vertical-align:middle;text-align:center'>Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                                
                            </tbody>
                        </table>
                    </div>
                    <div class='col-md-6'>
                        <table class='table table-striped table-condensed' id='bond_index'>
                            <thead style='background:#F62424;color:white;vertical-align:middle;text-align:center'>
                                <tr>
                                    <th>No</th>
                                    <th>Bond Index</th>
                                    <th>Negara</th>
                                    <th style='vertical-align:middle;text-align:center'>Des <span class='thnLalu'></span></th>
                                    <th style='vertical-align:middle;text-align:center'><span class='blnNow'></span> <span class='thnNow'></span></th>
                                    <th style='vertical-align:middle;text-align:center'>Growth</th>
                                </tr>
                            </thead>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div id='mySidepanel' class='sidepanel close'>
            <a href='#' data-id='global' class='sidepanel-link' >Global and Markets Issues</a>
            <a href='#' data-id='bindo' class='sidepanel-link' style='color:#4274FE'>Pergerakan Index 80 vs BINDO Index</a>
            <a href='#' data-id='alokasi' class='sidepanel-link'>Alokasi Aset</a>
            <a href='#' data-id='realisasi' class='sidepanel-link'>Realisasi Jenis Investasi</a>
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

            
            $('#tglChart').text('s/d '+reverseDate('".$tglakhir."'));
            $('.thnNow').text(".$tahun.");
            $('.thnLalu').text(".$tahunSebelum.");
            
            $('.blnNow').text(getNamaBulan(".$blnNow.").substr(0,3));


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
                console.log(filtertgl);
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
                            
                            loadService('chartIndex','GET','$root_ser/dashYakesInves.php?fx=getBMark',filtertgl+'|'+plan+'|'+kode_klp);
                            loadService('global_index','GET','$root_ser/dashYakesInves.php?fx=getGlobalIndex',filtertgl+'|'+plan+'|'+kode_klp);
                            loadService('bond_index','GET','$root_ser/dashYakesInves.php?fx=getBondIndex',filtertgl+'|'+plan+'|'+kode_klp);
            
                            $('#modalFilter').modal('hide');
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

                            
                            $('.thnNow').text(tahun);
                            $('.thnLalu').text(thnSblm);
                            
                            $('.blnNow').text(getNamaBulan(blnNow).substr(0,3));

    
                            
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
                                        loadService('chartIndex','GET','$root_ser/dashYakesInves.php?fx=getBMark',tglreverse+'|'+plan+'|'+kode_klp);
                                        loadService('global_index','GET','$root_ser/dashYakesInves.php?fx=getGlobalIndex',tglreverse+'|'+plan+'|'+kode_klp);
                                        loadService('bond_index','GET','$root_ser/dashYakesInves.php?fx=getBondIndex',tglreverse+'|'+plan+'|'+kode_klp);
                                        
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
                                case 'chartIndex':
                                    for(var i=0; i<result.data.length;i++){
                                        var data = result.data[i].data;
                                        data.reverse();
                                        
                                        data.forEach(function(point) {
                                            point[0] = new Date(point[0]).getTime();
                                        });
                                        
                                        result.data[i].data = data;
                                    }

                                    console.dir(result.data[0].data);
                                   
                                    Highcharts.chart('chartIndex', {
                                        chart: {
                                            zoomType: 'x',
                                            // height: (6 / 16 * 100) + '%' // 16:8 ratio
                                        },
                                        scrollbar: { enabled: true },
                                        title: {
                                            text: ''
                                        },
                                        // subtitle: {
                                        //     text: document.ontouchstart === undefined ?
                                        //     'Click and drag in the plot area to zoom in' : 'Pinch the chart to zoom in'
                                        // },
                                        xAxis: {
                                            type: 'datetime'
                                        },
                                        yAxis: [{ // Primary yAxis
                                            labels: {
                                                format: '{value}',
                                                style: {
                                                    color: '#FF2D55'
                                                }
                                            },
                                            title: {
                                                text: 'BINDO',
                                                style: {
                                                    color: '#FF2D55'
                                                }
                                            },
                                            min: 240,
                                            max: 310,
                                            opposite: true
                                    
                                        }, { // Secondary yAxis
                                            gridLineWidth: 0,
                                            title: {
                                                text: 'Index 80',
                                                style: {
                                                    color: '#42B9FE'
                                                }
                                            },
                                            labels: {
                                                format: '{value}',
                                                style: {
                                                    color: '#42B9FE'
                                                }
                                            },
                                            min: 100,
                                            max: 200,
                                    
                                        }],
                                        legend: {
                                            enabled: true
                                        },
                                        tooltip: {
                                            shared: true
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        // plotOptions: {
                                        //     spline: {
                                        //         // marker: {
                                        //         //     radius: 2
                                        //         // },
                                        //         lineWidth: 1,
                                        //         states: {
                                        //             hover: {
                                        //                 lineWidth: 1
                                        //             }
                                        //         },
                                        //         threshold: null
                                        //     }
                                        // },
                                        series: result.data
                                    });
                                break;
                                case 'global_index':
                                    var html='';
                                    var no=1;
                                    if(result.daftar.length > 0){
                                        for(var i=0;i<result.daftar.length;i++){
                                            var line = result.daftar[i];
                                            html+=`<tr>
                                                <td>`+no+`</td>
                                                <td>`+line.nama+`</td>`;
                                                
                                                var nil1 = 0;
                                                var nil2 = 0;
                                                var growth = 0;
                                                switch(line.kode_bmark){
                                                    case 'IDX80' :
                                                        
                                                        nil1=result.nil1[0].ihsg;
                                                        nil2=result.nil2[0].ihsg;
                                                    break;
                                                    case 'LQ45' :
                                                        
                                                        nil1=result.nil1[0].lq45;
                                                        nil2=result.nil2[0].lq45;
                                                    break;
                                                    case 'DWJ' :
                                                        
                                                        nil1=result.nil1[0].dwjg;
                                                        nil2=result.nil2[0].dwjg;
                                                    break;
                                                    case 'NIKKEI' :
                                                        
                                                        nil1=result.nil1[0].nikkei;
                                                        nil2=result.nil2[0].nikkei;
                                                    break;
                                                    case 'SGC' :
                                                        
                                                        nil1=result.nil1[0].sgc;
                                                        nil2=result.nil2[0].sgc;
                                                    break;
                                                    case 'HSI' :
                                                        
                                                        nil1=result.nil1[0].hsi;
                                                        nil2=result.nil2[0].hsi;
                                                    break;
                                                }
                                                growth = ((parseFloat(nil2)-parseFloat(nil1))/parseFloat(nil1))*100;
                                                html+=`
                                                <td style='text-align:right'>`+sepNum(nil1)+`</td>
                                                <td style='text-align:right'>`+sepNum(nil2)+`</td>
                                                <td style='text-align:right'>`+sepNum(growth)+`%</td>
                                            </tr>`;
                                            no++;
                                        }
                                    }
                                    $('#global_index tbody').html(html);
                                break;
                                case 'bond_index':
                                    var html='';
                                    var no=1;
                                    if(result.daftar.length > 0){
                                        for(var i=0;i<result.daftar.length;i++){
                                            var line = result.daftar[i];
                                            html+=`<tr>
                                                <td>`+no+`</td>
                                                <td>`+line.nama+`</td>
                                                <td>`+line.negara+`</td>`;
                                                var nil1 = 0;
                                                var nil2 = 0;
                                                var growth = 0;
                                                switch(line.kode_bmark){
                                                    case 'yy10ind' :
                                                        
                                                        nil1=result.nil1[0].yy10ind;
                                                        nil2=result.nil2[0].yy10ind;
                                                    break;
                                                    case 'yy10us' :
                                                        
                                                        nil1=result.nil1[0].yy10us;
                                                        nil2=result.nil2[0].yy10us;
                                                    break;
                                                    case 'yy10jp' :
                                                        
                                                        nil1=result.nil1[0].yy10jp;
                                                        nil2=result.nil2[0].yy10jp;
                                                    break;
                                                }
                                                growth = ((parseFloat(nil2)-parseFloat(nil1))/parseFloat(nil1))*100;
                                                
                                            html+=`
                                                <td style='text-align:right'>`+sepNum(nil1)+`</td>
                                                <td style='text-align:right'>`+sepNum(nil2)+`</td>
                                                <td style='text-align:right'>`+sepNum(growth)+`%</td>
                                            </tr>`;
                                            no++;
                                        }
                                    }
                                    $('#bond_index tbody').html(html);
                                break;
                            }
                        }
                    }
                });
            }
            function initDash(){
                // loadService('asetchart','GET','$root_ser/dashYakesInves.php?fx=getAset','$tglakhir|$kode_plan|$kode_klp');  
                loadService('chartIndex','GET','$root_ser/dashYakesInves.php?fx=getBMark','$tglakhir|$kode_plan|$kode_klp|$kelas');
                loadService('global_index','GET','$root_ser/dashYakesInves.php?fx=getGlobalIndex','$tglakhir|$kode_plan|$kode_klp');
                loadService('bond_index','GET','$root_ser/dashYakesInves.php?fx=getBondIndex','$tglakhir|$kode_plan|$kode_klp');
            }

            initDash();
            </script>

        ";
        

		return "";
	}
	
}
?>