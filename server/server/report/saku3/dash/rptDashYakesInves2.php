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
class server_report_saku3_dash_rptDashYakesInves2 extends server_report_basic
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
        $tglakhir = $tmp[5];
        $kode_plan = $tmp[6];
        $kode_klp= $tmp[7];

        $tahun = substr($periode,0,4);
        $tahunSebelum = intval($tahun) - 1;

        // $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'".substr($periode,0,4)."-".substr($periode,4,2)."-01')+1,0)) ,112),7,2) as tglakhir";
        // $rst = $dbLib->execute($sql);
        // $tglakhir = substr($periode,0,4)."-".substr($periode,4,2)."-".$rst->fields[0];
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

        $kode_fs="FS1";
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = "919006";
        $_SESSION['userPwd'] = "pusat25";
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
		
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

              .traceROI{
                  color:blue;
                  cursor:pointer;
              }
        </style>
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> 
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:fixed;'>Perbandingan Alokasi Aset <span id='jplan'></span></h3>
                <button type='button' class='pull-right' id='btn-refresh' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 5px 20px;background: white;'>Refresh
                </button>
                <div class='btn-group pull-right ' style=''>
                <button type='button' id='open-sidebar' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 5px 20px;background: white;'>
                <i class='fa fa-pencil'></i>
                Tanggal
                </button>
                
                </div>
                <button type='button' class='pull-right' id='btn-filter' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 5px 20px;background: white;'><i class='fa fa-filter'></i> Filter
                </button>
                <br><span style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: black;position: relative;' id='tglChart'></span>
                <span hidden id='kode_plan'></span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: black;'></span><span id='kode_klp' hidden></span>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    
                    <div class='col-md-2 col-xs-2 pad-more' style='padding-right:10px !important'>
                            <div class='col-md-12 col-xs-12 pad-more'>
                                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                                    <div class='panel-body' style='padding:5px'>
                                        <center><p style='color: black;margin-top: 10px;margin-bottom: 0px;font-size:12px'>Total Plan Aset</p>
                                        <h2 class='font-weight-bold' id='totAlokasi' style='margin-top: 5px;margin-bottom: 10px;font-size:18px !important'></h2>
                                        </center>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-12 col-xs-12 pad-more'>
                                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                                    <div class='panel-body' style='padding:5px'>
                                        <center><p style='color: black;margin-top: 10px;margin-bottom: 0px;font-size:12px'>Plan Aset</p>
                                        <p style='color: black;margin-top: 0px;margin-bottom: 5px;font-size:8px' id='thnSebelum'></p></center>
                                        <div class='col-md-4 col-xs-4' id='iconPoly'>
                                        </div>
                                        <div class='col-md-8 col-xs-8' style='padding-left:0px'>
                                            <h2 class='font-weight-bold' id='persenAset' style='font-size:18px !important;margin-top:5px'></h2>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-12 col-xs-12 pad-more' id='traceROI' style='cursor:pointer'>
                                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                                    <div class='panel-body' style='padding:5px'>
                                        <center><p style='color: black;margin-top: 10px;margin-bottom: 0px;font-size:12px !important'>&nbsp;Estimasi ROI Total</p></center>
                                        <center><h2 class='font-weight-bold' id='totROI' style='margin-top: 5px;margin-bottom: 10px;font-size:18px !important'></h2></center>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-12 col-xs-12 pad-more'>
                                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                                    <div class='panel-body' style='padding:5px'>
                                        <center><p style='color: black;margin-top: 10px;margin-bottom: 0px;font-size:12px !important'>&nbsp;Cash Out</p>
                                        <p style='color: black;margin-top: 0px;margin-bottom: 5px;font-size:8px'>&nbsp;CAPEX,OPEX,Claim Cost</p></center>
                                        <center><h2 class='font-weight-bold' id='capex' style='margin-top: 5px;margin-bottom: 10px;font-size:18px !important'>NULL</h2></center>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-12 col-xs-12 pad-more' id='traceROI' style='cursor:pointer'>
                                <div class='panel mar-mor box-wh' style='border-radius:15px'>
                                    <div class='panel-body' style='padding:5px'>
                                        <center><p style='color: black;margin-top: 10px;margin-bottom: 0px;font-size:12px !important'>&nbsp;Beban Investasi</p></center>
                                        <center><h2 class='font-weight-bold' id='totBeb' style='margin-top: 5px;margin-bottom: 10px;font-size:18px !important'></h2></center>
                                    </div>
                                </div>
                            </div>
                            
                    </div>
                    <div class='col-md-5 col-xs-5 pad-more'>
                        <a href='#' id=''>
                        <div class='col-md-12 col-xs-12 pad-more'>
                            <div class='panel mar-mor' style='box-shadow: none;'>
                                <div class='panel-header' style='color:black'><h3 style='font-size:16px !important;margin-top:0px'>Return Aset</h3><h6>Year To Date</h6></div>
                                <div class='panel-body'>
                                    <div id='return' style='margin:0'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>  
                    <div class='col-md-5 col-xs-5 pad-more'>
                        <a href='#' id=''>
                        <div class='col-md-12 col-xs-12 pad-more'>
                            <div class='panel mar-mor' style='box-shadow: none;'>
                                <div class='panel-header' style='color:black;padding-bottom:0'><h3 style='font-size:16px !important;margin-top:0px'>Alokasi Aset</h3><h6>Year To Date</h6></div>
                                <div class='panel-body' style='padding-top:0'>
                                    <div id='aset' style='margin:0'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>           
                </div>
                <div class='row'>
                    <div class='col-md-6 col-xs-12 pad-more' id='BatasAlokasi' style='padding-left: 20px !important;'>
                        <div class='panel mar-mor box-wh' style='border-radius:15px'>
                            <div class='panel-body' style='padding:7px'>
                                <h3 class='font-weight-light' style='color: #000000; margin-top: 0.9rem; padding-left: 15px;margin-bottom:20px'>Realisasi dan Batasan Alokasi</h3>
                                <table class='table table-striped table-bordered' id='table-alokasi'>
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
            </div>
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
                        <div class='row'>
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
                loadService('asetchart','GET','$root_ser/dashYakesInves.php?fx=getAset',filtertgl+'|'+plan+'|'+kode_klp); 
                loadService('persenAset','GET','$root_ser/dashYakesInves.php?fx=getPersenAset',filtertgl+'|'+plan+'|'+kode_klp);
                loadService('chartAlokasi','GET','$root_ser/dashYakesInves.php?fx=getBatasAlokasi',filtertgl+'|'+plan+'|'+kode_klp); 
                loadService('totAlokasi','GET','$root_ser/dashYakesInves.php?fx=getTotalAlokasi',filtertgl+'|'+plan+'|'+kode_klp); 
                loadService('roiKKP','GET','$root_ser/dashYakesInves.php?fx=getRoiKkp',filtertgl+'|'+plan+'|'+kode_klp); 
                $('#modalFilter').modal('hide');
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
                            var thnSblm = parseInt(tgl.substr(6,4))-1;
                            $('#thnSebelum').text(' vs plan aset '+thnSblm);
    
                            
                            var plan = $('#kode_plan').text();
                            var kode_klp = $('#kode_klp').text();
                            loadService('asetchart','GET','$root_ser/dashYakesInves.php?fx=getAset',tglreverse+'|'+plan+'|'+kode_klp); 
                            loadService('persenAset','GET','$root_ser/dashYakesInves.php?fx=getPersenAset',tglreverse+'|'+plan+'|'+kode_klp);
                            loadService('chartAlokasi','GET','$root_ser/dashYakesInves.php?fx=getBatasAlokasi',tglreverse+'|'+plan+'|'+kode_klp); 
                            loadService('totAlokasi','GET','$root_ser/dashYakesInves.php?fx=getTotalAlokasi',tglreverse+'|'+plan+'|'+kode_klp); 
                            loadService('roiKKP','GET','$root_ser/dashYakesInves.php?fx=getRoiKkp',tglreverse+'|'+plan+'|'+kode_klp); 
                                                    
                            $('aside').removeClass('control-sidebar-open');
                            $('.tab-content').hide();
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
                // var num = parseFloat(x).toFixed(2);
                // var parts = num.toString().split('.');
                // var len = num.toString().length;
                // // parts[1] = parts[1]/(Math.pow(10, len));
                // parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
                // return parts.join(',');
                if (typeof x === 'undefined' || !x) { 
                    return 0;
                }else{
                    // if(x < 0){
                        var x = parseFloat(x).toFixed(2);
                    // }
                    
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
            
            $('#tglChart').text('s/d '+reverseDate('".$tglakhir."'));


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
                                case 'asetchart':
                                // console.log(result.kas);                
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
                                        // pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b><br><b>{point.y}</b>'
                                        formatter: function () {
                                            return this.point.name+':<b>'+sepNum(this.percentage)+'%</b><br>'+
                                                '<b>'+toMilyar(this.y)+'</b>';
                                        }
                                        
                                    },
                                    // legend: {
                                    //     enabled: true,
                                    //     layout: 'vertical',
                                    //     align: 'right',
                                    //     width: '300px',
                                    //     y:50,
                                    //     verticalAlign: 'top',
                                    //     useHTML: true,
                                    //     labelFormatter: function() {
                                    //         if(this.percentage > this.key){
                                    //             return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right;color:red; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                    //         }else{
                                    //             return '<table><tr><td><span style=\"text-align: left; width:150px;float:left;\">' + this.name + ' </span></td><td><span style=\"text-align: right; width:100px;\"> ' + sepNum(this.percentage) + '%</span></td></tr></table>';
                                    //         }
                                            
                                    //     }
                                    // },
                                    plotOptions: {
                                        pie: {
                                            allowPointSelect: false,
                                            cursor: 'pointer',
                                            // dataLabels: {
                                            //     enabled: true
                                            // },
                                            dataLabels: {
                                                enabled: true,
                                                format: '<strong>{point.name}</strong><br>{point.percentage:.2f}%',
                                                distance: '-40%'
                                            },
                                            showInLegend: false,
                                            size:'95%',
                                            point:{
                                                events : {
                                                    legendItemClick: function(e){
                                                        var elemenTujuan = $('#BatasAlokasi');
                                                        // console.log(elemenTujuan.offset().top - 50);
                                                        // pindahkan scroll
                                                        // $('html,body').animate({
                                                        //     scrollTop: elemenTujuan.offset().top - 50
                                                        // }, 1000, 'easeInOutExpo');
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
                                                        window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|'+filtertgl+'|'+plan+'|'+kode_klp);
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
                                html+=`<td class='traceROI'><p hidden>KAS</p>`+sepNum(result.kas.roi)+`</td></tr>`;//KAS
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
                                html+=`<td class='traceROI'><p hidden>EBT</p>`+sepNum(result.ebt.roi)+`</td></tr>`;//PEND TETAP
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
                                html+=`<td class='traceROI'><p hidden>SB</p>`+sepNum(result.saham.roi)+`</td></tr>`;//Saham
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
                                html+=`<td class='traceROI'><p hidden>PRO</p>`+sepNum(result.pro.roi)+`</td></tr>`;//PROPENSA

                                $('#table-alokasi tbody').html(html);

                                // Highcharts.chart('dash_chart_alokasi_propensa', {
                                //     chart: {
                                //         inverted: true,
                                //         // marginLeft: 105,
                                //         type: 'bullet'
                                //     },
                                //     title: {
                                //         text: null
                                //     },
                                //     legend: {
                                //         enabled: false
                                //     },
                                //     plotOptions: {
                                //         series: {
                                //             pointPadding: 0.25,
                                //             borderWidth: 0,
                                //             color: '#0f5693',
                                //             targetOptions: {
                                //                 width: '0%'
                                //             }
                                //         }
                                //     },
                                //     credits: {
                                //         enabled: false
                                //     },
                                //     exporting: {
                                //         enabled: false
                                //     },
                                //     xAxis: {
                                //         categories: ['','']
                                //     },
                                //     yAxis: {
                                //         gridLineWidth: 0,
                                //         plotBands: [{
                                //             from: 0,
                                //             to: parseFloat(result.pro.bawah),
                                //             color: '#337ab7'
                                //         },{
                                //             from: parseFloat(result.pro.bawah),
                                //             to: parseFloat(result.pro.acuan),
                                //             color: '#7cb5ec'
                                //         },{
                                //             from : parseFloat(result.pro.acuan),
                                //             to: parseFloat(result.pro.atas),
                                //             color: '#ace1ff'
                                //         }],
                                //         labels: {
                                //             format: '{value} %'
                                //         },
                                //         title: null
                                //     },
                                //     series: [{
                                //         data: [{
                                //             y: parseFloat(result.pro.persen),
                                //             target: parseFloat(result.pro.atas)
                                //         }]
                                //     }],
                                //     tooltip: {
                                //         pointFormat: '<b>{point.y:.2f}</b> (with target at {point.target:.2f})%'
                                //     }
                                // });
                                break;
                                case 'persenAset':
                                $('#persenAset').text(result.persen+'%');
                                if(result.persen < 0) {
                                    $('#iconPoly').html('<img style=\'width: 20px;padding-top: 5px;\' src=\'$poly2\'>');
                                }else{
                                    $('#iconPoly').html('<img style=\'width: 20px;padding-top: 5px;\' src=\'$poly1\'>');
                                }
                                break;
                                case 'roiKKP' :
                                $('#totROI').text(sepNum(result.roi_total)+'%');
                                // $('#totSPI').text(toMilyar(result.data.spi));
                                $('#capex').text(toMilyar(result.data.cash_out));
                                // $('#totPend').text(toMilyar(result.data.pdpt));
                                $('#totBeb').text(toMilyar(result.data.beban_inves));
                                var net=(parseFloat(result.data.pdpt)+parseFloat(result.data.spi))-parseFloat(result.data.beban_inves);
                                // $('#totNet').text(toMilyar(net));

                                Highcharts.chart('return', {
                                    chart: {
                                        // plotBackgroundColor: null,
                                        // plotBorderWidth: null,
                                        // plotShadow: false,
                                        type: 'column'
                                    },
                                    title: {
                                        text: ''
                                    },
                                    tooltip: {
                                        formatter: function () {
                                            return this.point.name+':<b>'+toMilyar(this.y)+'</b>';
                                        }
                                        
                                    },
                                    xAxis: {
                                        categories: [
                                            'Pendapatan',
                                            'SPI',
                                            'Net',
                                        ],
                                    },
                                    yAxis: {
                                        title: {
                                            text: ''
                                        },
                                        labels: {
                                            formatter: function () {
                                                return singkatNilai(this.value);
                                            }
                                        }
                                    },
                                    series: [{
                                        name: 'Return Aset',
                                        colorByPoint: true,
                                        data: [{
                                            name: 'Pendapatan',
                                            y: parseFloat(result.data.pdpt),
                                            color:'#007AFF',
                                            key: 'pdpt'
                                        }, {
                                            name: 'SPI',
                                            y: parseFloat(result.data.spi),
                                            color:'#FF9500',
                                            key: 'spi'
                                        }, {
                                            name: 'Net',
                                            y: parseFloat(net),
                                            color:'#4CD964',
                                            key: 'net'
                                        }]
                                    }],
                                    credits:{
                                        enabled:false
                                    }
                                });

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
                loadService('asetchart','GET','$root_ser/dashYakesInves.php?fx=getAset','$tglakhir|$kode_plan|$kode_klp'); 
                loadService('persenAset','GET','$root_ser/dashYakesInves.php?fx=getPersenAset','$tglakhir|$kode_plan|$kode_klp');
                loadService('chartAlokasi','GET','$root_ser/dashYakesInves.php?fx=getBatasAlokasi','$tglakhir|$kode_plan|$kode_klp'); 
                loadService('totAlokasi','GET','$root_ser/dashYakesInves.php?fx=getTotalAlokasi','$tglakhir|$kode_plan|$kode_klp'); 
                loadService('roiKKP','GET','$root_ser/dashYakesInves.php?fx=getRoiKkp','$tglakhir|$kode_plan|$kode_klp'); 
            }

            initDash();
            </script>

        ";
        

		return "";
	}
	
}
?>