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
class server_report_saku3_dash_rptDashYakesInves2Det2 extends server_report_basic
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
            .klik_sektor{
                cursor:pointer;
            }
            .aktif{
                background:#dbd9d9;
            }
           
        </style>
        <div class='panel' style=''>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'> 
                <ul class='nav nav-tabs'>
                    <li class='active'><a data-toggle='tab' href='#home'>Saham Bursa</a></li>
                    <li><a data-toggle='tab' href='#menu1'>Sektor</a></li>
                    <li class='pull-right' style='padding-right: 15px;'>
                    <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                    <span id='refresh_btn' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                    <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                    </li>
                </ul>
            </div>
            <div class='panel-body'  style='padding-top: 0px;'>
                <div class='tab-content' style='padding-left:10px'>
                    <div id='home' class='tab-pane fade in active'>
                        <div class='row'  style='padding-top: 10px;'>
                            <div class='col-md-5 pad-more'>
                                <div class='col-md-12' >
                                    <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                                        <div class='panel-heading bg-yellow' style='border-top-left-radius: 15px;border-top-right-radius: 15px;height:70px;padding: 5px;'>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-xs-5'>
                                                <span style='font-size: 20px;' class='judul'></span><br>
                                                <span style='font-size: 10px;'>".substr($tglakhir,8,2)." ".$AddOnLib->ubah_periode(substr($tglakhir,0,4).substr($tglakhir,5,2))."</span>
                                                <br><span style='font-size: 10px;'>Harga Buku vs Harga Wajar</span>
                                            </div>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-xs-3'>
                                                <span style='font-size: 8px;' >Nilai Buku</span><br style='font-size: 8px;'>
                                                <span style='font-size: 10px;' id='nbuku' ></span><br style='font-size: 14px;'>
                                                <span style='font-size: 8px;' >Nilai Wajar</span><br style='font-size: 8px;'>
                                                <span style='font-size: 10px;' class='nwajar'></span>  
                                            </div>
                                            <div style='padding-left: 5px;padding-right: 5px;vertical-align: middle;text-align:right' class='col-xs-4'> 
                                                <div class='pull-right' id='bigPoly2' style='padding-top: 20px;'>
                                                </div>
                                                <span class='pull-right' style='font-size: 28px;padding-top:10px' id='perNBuku'></span>
                                            </div>
                                        </div>
                                        <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;;'>
                                            <div id='detSaham2' class='row' style='padding: 10px;'>
                                            </div>                                    
                                        </div>
                                    </div>
                                </div>
                                <div class='col-md-12' >
                                    <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                                        <div class='panel-heading bg-blue' style='border-top-left-radius: 15px;border-top-right-radius: 15px;height:70px;padding: 5px;'>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-xs-5'>
                                                <span style='font-size: 20px;' class='judul'>
                                                </span><br>
                                                <span style='font-size: 10px;'>".substr($tglakhir,8,2)." ".$AddOnLib->ubah_periode(substr($tglakhir,0,4).substr($tglakhir,5,2))."</span>
                                                <br><span style='font-size: 10px;'>Harga Perolehan vs Harga Wajar</span>
                                            </div>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-xs-3'>
                                                <span style='font-size: 8px;' >Nilai Perolehan</span><br style='font-size: 8px;'>
                                                <span style='font-size: 10px;' id='noleh'></span><br style='font-size: 14px;'>
                                                <span style='font-size: 8px;'  >Nilai Wajar</span><br style='font-size: 8px;'>
                                                <span style='font-size: 10px;' class='nwajar' ></span>  
                                            </div>
                                            <div style='padding-left: 5px;padding-right: 5px;vertical-align: middle;text-align:right' class='col-xs-4'> 
                                                <div class='pull-right' id='bigPoly' style='padding-top: 20px;'>
                                                </div>
                                                <span class='pull-right' style='font-size: 28px;padding-top:10px' id='perNoleh'></span>
                                            </div>
                                        </div>
                                        <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;'>
                                            <div class='row' style='padding: 10px;' id='detSaham'>
                                            </div>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-7 pad-more'>
                                <div class='col-md-12 pad-more' style='height:270px;margin-bottom:25px'>
                                    <div class='panel mar-mor box-wh'>
                                        <div class='panel-heading' style='padding-bottom:0px'>
                                            <h3 style='margin-top:0px;margin-bottom:0px;position: absolute;'>Nilai Aktiva Bersih</h3>
                                            <div class='btn-group pull-right ' style='padding-top:8px'>
                                                <a type='button' class='openFilter' data-jenis='hari' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 8px 20px;background: white;color:black;cursor:pointer' >
                                                <i class='fa fa-pencil'></i>
                                                Filter
                                                </a>       
                                            </div>
                                            <div class='col-md-3 pull-right ' style=''>
                                            <style>
                                                .selectize-input{
                                                    border-radius:15px;
                                                    border:1px solid #8080806b;
                                                }
                                                </style>
                                                <select class='form-control selectize' id='jenis_chart'>
                                                <option value='' disabled>Pilih Jenis</option>
                                                <option value='YTD'>YTD</option>
                                                <option value='YOY'>YOY</option>
                                                </select>      
                                            </div><br>
                                            <span id='labelNBAhari'>Harian - ".substr($tglakhir,0,4)."</span>
                                            <span id='kode_kelola' hidden></span>
                                        </div>
                                        <div class='panel-body'>
                                            <div id='performa' style='margin: 0 auto; padding: 0 auto;height:210px'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <!--<div class='col-md-12 pad-more' style='height:270px'>
                                    <div class='panel mar-mor box-wh'>
                                        <div class='panel-heading' style='padding-bottom:0px'>
                                            <h3 style='margin-top:0px;margin-bottom:0px'>SPI</h3>
                                            <div class='btn-group pull-right ' style='padding-top:8px'>
                                                <a type='button' class='openFilter' data-jenis='bulan' style='border: 1px solid #d5d5d5;border-radius: 20px;padding: 8px 20px;background: white;color:black;cursor:pointer' >
                                                <i class='fa fa-pencil'></i>
                                                Filter
                                                </a>       
                                            </div>
                                            <div class='col-md-3 pull-right ' style=''>
                                            <style>
                                                .selectize-input{
                                                    border-radius:15px;
                                                    border:1px solid #8080806b;
                                                }
                                                </style>
                                                <select class='form-control selectize' id='jenis_chart'>
                                                <option value='' disabled>Pilih Jenis</option>
                                                <option value='YTD'>YTD</option>
                                                <option value='YOY'>YOY</option>
                                                </select>      
                                            </div><br>
                                            <span id='labelNBAbulan'>Harian - </span>
                                            <span id='kode_kelola2' hidden></span>
                                        </div>
                                        <div class='panel-body'>
                                            <div id='performa2' style='margin: 0 auto; padding: 0 auto;height:210px'>
                                            </div>
                                        </div>
                                    </div>
                                </div>-->
                            </div>
                        </div>
                    </div>

                    <div id='menu1' class='tab-pane fade in'>
                        <div class='row'>
                            <div style='padding: 0px;' class='col-md-3'>
                                <div style='margin: 0px;padding: 0px;' class='panel'>
                                    <div class='panel-body' style='padding: 0px;' id='sektor'>
                                        
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-9 pad-more'  style='padding-top: 10px;' id='daftarDetail'>
                                
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class='modal fade' tabindex='-1' role='dialog' id='modalFilter'>
            <div class='modal-dialog' role='document'>
                <div class='modal-content'>
                    <div class='modal-body'>
                        <input type='hidden' id='jenis'>
                        <div class='row' style='margin-top:10px'>
                            <div class='col-md-12'>
                                <label class='radioCust' style='margin-bottom: 0px;'> Hari
                                    <input type='radio' checked='' name='radio'>
                                    <span class='checkmark hari'></span>
                                </label>
                                <input type='hidden' id='rowActive'>
                            </div>
                        </div>
                        <div class='row rowHari' style='margin-left: 12px;'>
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-6'>Tanggal</label>
                                <label class='control-label col-sm-6'>Tanggal</label>
                                <div class='col-sm-6'>
                                    <div class='input-group date col-sm-9' style=''>
                                        <div class='input-group-addon'>
                                        <i class='fa fa-calendar'></i>
                                        </div>
                                        <input style='width: 218px;' name='tanggal' class='form-control datepicker-dmy' id='tgl_awal' required='' value='".date('d-m-Y')."'>
                                    </div>
                                </div>
                                <div class='col-sm-6'>
                                    <div class='input-group date col-sm-9' style=''>
                                        <div class='input-group-addon'>
                                        <i class='fa fa-calendar'></i>
                                        </div>
                                        <input style='width: 218px;' name='tanggal2' class='form-control datepicker-dmy' id='tgl_akhir' required='' value='".date('d-m-Y')."'>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-md-12'>
                                <label class='radioCust' style='margin-bottom: 0px;'> Bulan
                                    <input type='radio' checked='' name='radio'>
                                    <span class='checkmark bulan'></span>
                                </label>
                            </div>
                        </div>
                        <div class='row rowPeriode' style='margin-left:10px'>
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-6'>Periode Awal</label>
                                <label class='control-label col-sm-6'>Periode Akhir</label>
                                <div class='col-sm-6' >
                                    <select id='periode_awal' name='fromperiode' class='form-control input-form selectize' required disabled>
                                    <option value='' disabled>Pilih Periode</option>";
                                    $sqlper = "select distinct periode from inv_saham_kkp order by periode desc";
                                    $res = $dbLib->execute($sqlper);
                                    while($row = $res->FetchNextObject($toupper=false)){
                                        if($periode == $row->periode){
                                            $selected = "selected";
                                        }else{
                                            $selected = "false";
                                        }
                                        echo"<option value='$row->periode' $selected>$row->periode</option>";
                                    }
                                    echo"
                                    </select>
                                </div>
                                <div class='col-sm-6' >
                                    <select id='periode_akhir' name='toperiode' class='form-control input-form selectize' required disabled>
                                    <option value='' disabled>Pilih Periode</option>";
                                    $sqlper2 = "select distinct periode from inv_saham_kkp order by periode desc";
                                    $res2 = $dbLib->execute($sqlper2);
                                    while($row2 = $res2->FetchNextObject($toupper=false)){
                                        if($periode == $row2->periode){
                                            $selected = "selected";
                                        }else{
                                            $selected = "false";
                                        }
                                        echo"<option value='$row2->periode' $selected>$row2->periode</option>";
                                    }
                                    echo"
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row' style='margin-top:10px' >
                            <div class='col-md-12'>
                                <label class='radioCust' style='margin-bottom: 0px;'> Tahun
                                    <input type='radio' checked='' name='radio'>
                                    <span class='checkmark tahun'></span>
                                </label>
                            </div>
                        </div>
                        <div class='row rowTahun' style='margin-left:10px' >
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-6'>Tahun Awal</label>
                                <label class='control-label col-sm-6'>Tahun Akhir</label>
                                <div class='col-sm-6' >
                                    <select id='tahun_awal' name='fromperiode' class='form-control input-form selectize' required disabled>
                                    <option value='' disabled>Pilih Tahun</option>";
                                    $sqlper3 = "select distinct substring(periode,1,4) as periode from inv_saham_kkp order by periode desc";
                                    $res3 = $dbLib->execute($sqlper3);
                                    while($row3 = $res3->FetchNextObject($toupper=false)){
                                        if(substr($periode,0,4) == $row3->periode){
                                            $selected = "selected";
                                        }else{
                                            $selected = "false";
                                        }
                                        echo"<option value='$row3->periode' $selected>$row3->periode</option>";
                                    }
                                    echo"
                                    </select>
                                </div>
                                <div class='col-sm-6' >
                                    <select id='tahun_akhir' name='toperiode' class='form-control input-form selectize' required disabled>
                                    <option value='' disabled>Pilih Tahun</option>";
                                    $sqlper4 = "select distinct substring(periode,1,4) as periode from inv_saham_kkp order by periode desc";
                                    $res4 = $dbLib->execute($sqlper4);
                                    while($row4 = $res4->FetchNextObject($toupper=false)){
                                        if(substr($periode,0,4) == $row4->periode){
                                            $selected = "selected";
                                        }else{
                                            $selected = "false";
                                        }
                                        echo"<option value='$row4->periode' $selected>$row4->periode</option>";
                                    }
                                    echo"
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='modal-footer'>
                        <button type='button' class='btn btn-primary' id='btnOk'>OK</button>
                    </div>
                </div><!-- /.modal-content -->
            </div><!-- /.modal-dialog -->
        </div><!-- /.modal -->
        <script>

            $('.nav-tabs').on('click','#close_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$tglakhir/$kode_plan/$kode_klp');
            });
            $('.nav-tabs').on('click','#back_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesInves2Det','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp');
            });

            $('.nav-tabs').on('click','#refresh_btn',function(){
                location.reload();
            });

            $('.datepicker').datepicker({
                autoclose: true,
                format: 'yyyy-mm-dd'
                });
            
            $('.datepicker-dmy').datepicker({
                autoclose: true,
                format: 'dd-mm-yyyy'
            });
            
            $('.datepicker, .daterangepicker').on('keydown keyup keypress', function(e){
                e.preventDefault();
                return false;
            });
            

            $('.panel').on('click', '.openFilter', function(){
            
                $('#jenis').val($(this).data('jenis'));

                $('#modalFilter').modal('show');
            });



            $('.panel').on('click', '.klik_sektor', function(){

                var kode = $(this).closest('div').find('p').text();
                $('.klik_sektor').removeClass('aktif');
                $(this).addClass('aktif');
                loadService('daftarSaham','GET','$root_ser/dashYakesInves.php?fx=getDetailperSaham','$tglakhir|$kode_plan|$kode_klp|'+kode);                 
            });


            // $('.panel').on('click','.klik-chart',function(){
            //     var kode = $(this).closest('div').find('p').text();
            //     $('#kode_kelola').text(kode);
            //     var param = '$kode_plan|'+kode;

            //     $('.klik-chart').css({'margin': '5px auto','padding': '5px','height': '60px','border': '1px solid #dadada','border-radius': '10px','text-align': 'center','box-shadow':'none'});

            //     $(this).css({'margin': '5px auto','padding': '5px','height': '60px','border': '1px solid #007aff2b','border-radius': '10px','text-align': 'center','box-shadow': '2px 3px 3px #007aff40'});

                
                
            // });

            $('.panel').on('click','.klik-chart2',function(){
                var kode = $(this).closest('div').find('p').text();
                $('#kode_kelola2').text(kode);
                var param = '$kode_plan|'+kode;

                $('.klik-chart2').css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': 'white','color':'black'});

                $(this).css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': '#FF9500','color':'white'});

                // loadService('performa2','GET','$root_ser/dashYakesInves.php?fx=getSPIHari',param);
                loadService('performa','GET','$root_ser/dashYakesInves.php?fx=getNABHari',param);
            });

            $('.panel').on('change', '#jenis_chart', function(){
                
                var jenis = $('#jenis_chart')[0].selectize.getValue();
                var kode_kelola =  $('#kode_kelola').text();
                if ( jenis == 'YTD' )
                {  
                    var row = 3; 
                }else{ 
                    var row = 4; 
                }
                var param =  '$kode_plan|'+row+'|$tglakhir|'+kode_kelola;
                var label = 'Harian '+jenis;
                $('#labelNBAhari').html(label);
                loadService('performa','GET','$root_ser/dashYakesInves.php?fx=getNABHari',param);
            });

            $('.panel').on('change', '#jenis_chart2', function(){
                
                var jenis = $('#jenis_chart2')[0].selectize.getValue();
                var kode_kelola =  $('#kode_kelola2').text();
                if ( jenis == 'YTD' )
                {  
                    var row = 3; 
                }else{ 
                    var row = 4; 
                }
                var param =  '$kode_plan|'+row+'|$tglakhir|'+kode_kelola;
                var label = 'Harian '+jenis;
                $('#labelNBAbulan').html(label);
                // loadService('performa2','GET','$root_ser/dashYakesInves.php?fx=getSPIHari',param);
            });

            

            $('.radioCust').on('click','.hari',function(){
                // $('.rowPeriode').hide();
                // $('.rowTahun').hide();
                // $('.rowHari').show();
                var select = $('#periode_awal').selectize();
                var selectPer = select[0].selectize;
                selectPer.disable();

                var select2 = $('#periode_akhir').selectize();
                var selectPer2 = select2[0].selectize;
                selectPer2.disable();

                var select3 = $('#tahun_awal').selectize();
                var selectThn = select3[0].selectize;
                selectThn.disable();

                var select4 = $('#tahun_akhir').selectize();
                var selectThn2 = select4[0].selectize;
                selectThn2.disable();

                $('#tgl_awal').prop('disabled',false);
                $('#tgl_akhir').prop('disabled',false);
                $('#rowActive').val(0);
                
            });

            $('.radioCust').on('click','.bulan',function(){
                // $('.rowPeriode').show();
                // $('.rowTahun').hide();
                // $('.rowHari').hide();

                var select = $('#periode_awal').selectize();
                var selectPer = select[0].selectize;
                selectPer.enable();

                var select2 = $('#periode_akhir').selectize();
                var selectPer2 = select2[0].selectize;
                selectPer2.enable();

                var select3 = $('#tahun_awal').selectize();
                var selectThn = select3[0].selectize;
                selectThn.disable();

                var select4 = $('#tahun_akhir').selectize();
                var selectThn2 = select4[0].selectize;
                selectThn2.disable();
                
                $('#tgl_awal').prop('disabled',true);
                $('#tgl_akhir').prop('disabled',true);
                $('#rowActive').val(1);

            });

            $('.radioCust').on('click','.tahun',function(){
                // $('.rowPeriode').hide();
                // $('.rowTahun').show();
                // $('.rowHari').hide();
                var select = $('#periode_awal').selectize();
                var selectPer = select[0].selectize;
                selectPer.disable();

                var select2 = $('#periode_akhir').selectize();
                var selectPer2 = select2[0].selectize;
                selectPer2.disable();

                $('#tgl_awal').prop('disabled',true);
                $('#tgl_akhir').prop('disabled',true);

                var select3 = $('#tahun_awal').selectize();
                var selectThn = select3[0].selectize;
                selectThn.enable();

                var select4 = $('#tahun_akhir').selectize();
                var selectThn2 = select4[0].selectize;
                selectThn2.enable();
                $('#rowActive').val(2);
                
            });

            $('.modal-footer').on('click', '#btnOk', function(){
            
                var row = $('#rowActive').val();
                
                var kode_kelola = $('#kode_kelola').text();
                if(row == 0){
                    var tgl1 = $('#tgl_awal').val();
                    var tgl2 = $('#tgl_akhir').val();
                    var param = '$kode_plan|'+row+'|'+tgl1+'|'+tgl2+'|'+kode_kelola;
                    var label = 'Harian - '+tgl1+' s/d '+tgl2;
                    var label2 = 'Harian - '+tgl1+' s/d '+tgl2;
                }else if(row == 1){
                    var per1 = $('#periode_awal').val();
                    var per2 = $('#periode_akhir').val();
                    var param =  '$kode_plan|'+row+'|'+per1+'|'+per2+'|'+kode_kelola;
                    var label = 'Harian - '+per1+' s/d '+per2;
                    var label2 = 'Harian - '+per1+' s/d '+per2;
                }else if(row ==2){
                    var tahun1 = $('#tahun_awal').val();
                    var tahun2 = $('#tahun_akhir').val();
                    var param =  '$kode_plan|'+row+'|'+tahun1+'|'+tahun2+'|'+kode_kelola;
                    
                    var label = 'Harian - '+tahun1+' s/d '+tahun2;
                    var label2 = 'Harian - '+tahun1+' s/d '+tahun2;
                }

                var jenis = $('#jenis').val();
                if(jenis=='hari'){
                    $('#labelNBAhari').html(label);
                    loadService('performa','GET','$root_ser/dashYakesInves.php?fx=getNABHari',param); 
                }else{
                    
                    // $('#labelNBAbulan').html(label2);
                    // loadService('performa2','GET','$root_ser/dashYakesInves.php?fx=getSPIHari',param); 
                }   
                
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
                                case 'performa' :

                                    for(var i=0; i<result.data.length;i++){
                                        var data = result.data[i].data;
                                        data.reverse();
                                        
                                        data.forEach(function(point) {
                                            point[0] = new Date(point[0]).getTime();
                                        });

                                        result.data[i].data = data;
                                    }

                                      Highcharts.chart('performa', {
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
                            
                                        series: result.data
                                    });

                                break;
                                case 'performa2' :

                                    for(var i=0; i<result.data.length;i++){
                                        var data = result.data[i].data;
                                        data.reverse();
                                        
                                        data.forEach(function(point) {
                                            point[0] = new Date(point[0]).getTime();
                                        });

                                        result.data[i].data = data;
                                    }

                                     Highcharts.chart('performa2', {
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
                            
                                        series: result.data
                                    });

                                    
                                break;
                                case 'sahamBursa' :
                                var html ='';
                                $('#noleh').text(sepNumPas(result.noleh));
                                $('.nwajar').text(sepNumPas(result.nwajar));
                                $('#perNoleh').text(sepNum(result.persen)+'%');
                                if(result.persen < 0) {
                                    $('#bigPoly').html('<img style=\'width: 20px;padding-bottom: 6px;\' src=\'$poly2\'>');
                                }else{
                                    $('#bigPoly').html('<img style=\'width: 20px;padding-bottom: 6px;\' src=\'$poly1\'>');
                                }
                                for(var i=0;i<result.daftar.length;i++){
                                    html +=`<div class='col-md-6 klik-chart ' style='padding:0px;margin-bottom:5px'><div style='padding: 5px;height:60px;border: 1px solid #dadada;border-radius: 10px;text-align:center;background: white;' class='col-md-4 col-xs-4'>
                                        <p hidden>`+result.daftar[i].kode_kelola+`</p>
                                        <img src='$link/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 50px;height:auto'>
                                        </div>
                                        <div style='padding: 0 auto;height:60px;' class='col-md-8 col-xs-8'>
                                            <span style='font-size: 16px;' >`+sepNum(result.daftar[i].persen)+`%</span>`;
                                            if(result.daftar[i].persen < 0) {
                                                html +=`<img style='width: 8px;' src='$poly2'>`;
                                            }else{
                                                html +=`<img style='width: 8px;' src='$poly1'>`;
                                            }
                                        html+=`<br>
                                            <img style='width: 8px;' src='$openbook'> <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].noleh)+`</span>
                                            <br>
                                            <img style='width: 8px;' src='$fairstand'>
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nwajar)+`</span>                 
                                        </div></div>`;
                                    
                                }
                                $('#detSaham').html(html);

                                break;
                                case 'sahamBursa2' :
                                var html ='';
                                $('#nbuku').text(sepNumPas(result.nbuku));
                                $('.nwajar').text(sepNumPas(result.nwajar));
                                $('#perNBuku').text(sepNum(result.persen)+'%');
                                if(result.persen < 0) {
                                    $('#bigPoly2').html('<img style=\'width: 20px;padding-bottom: 6px;\' src=\'$poly2\'>');
                                }else{
                                    $('#bigPoly2').html('<img style=\'width: 20px;padding-bottom: 6px;\' src=\'$poly1\'>');
                                }
                                for(var i=0;i<result.daftar.length;i++){
                                    html +=`<div class='col-md-6 klik-chart2 rowke`+i+`' style='padding:0px;margin-bottom:5px'><div style='padding: 5px;height:60px;border: 1px solid #dadada;border-radius: 10px;text-align:center;background: white;' class='col-md-4 col-xs-4 '>
                                        <p hidden>`+result.daftar[i].kode_kelola+`</p>
                                        <img src='$link/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 50px;height: auto;'>
                                        </div>
                                        <div style='padding: 0 auto;height:60px;' class='col-md-8 col-xs-8'>
                                            <span style='font-size: 16px;' >`+sepNum(result.daftar[i].persen)+`%</span>`;
                                            if(result.daftar[i].persen < 0) {
                                                html +=`<img style='width: 8px;' src='$poly2'>`;
                                            }else{
                                                html +=`<img style='width: 8px;' src='$poly1'>`;
                                            }
                                        html +=`<br>
                                            <img style='width: 8px;' src='$openbook'> <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nbuku)+`</span>
                                            <br>
                                            <img style='width: 8px;' src='$fairstand'>
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nwajar)+`</span>                  
                                        </div>
                                    </div>`;
                                    
                                }
                                $('#detSaham2').html(html);
                                
                                $('.rowke0').css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': '#FF9500','color':'white'});
                                break;
                                case 'daftar_sektor' :
                                var html ='';
                                
                                for(var i=0;i<result.sektor.length;i++){
                                    html +=`<div class='row klik_sektor sektorke`+i+`' style='margin-right: -5px;margin-left: -5px;'>          <div class='col-xs-8'>
                                                <p hidden>`+result.sektor[i].kode_sahamklp+`</p>
                                                <h3 style='font-size: 20px !important;margin-top: 10px;'>`+result.sektor[i].nama+`</h3>
                                                
                                                <span style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:10px'>`+result.sektor[i].jum_kelola+` pengelola</span>
                                            </div>
                                            <div class='col-xs-4 text-right' style='padding-left: 0px;'>
                                                <h3 style='color: #19acf5;font-size: 25px !important;margin-bottom: 0px;margin-top: 10px;'>`+sepNum(result.sektor[i].persen)+`%</h3>
                                                
                                                <span style='color: #808080;margin-top: 0px;margin-bottom: 5px;font-size:10px'>`+sepNumPas(result.sektor[i].nilai)+`</span>
                                            </div>
                                        </div>`;
                                    
                                }
                                $('#sektor').html(html);
                                $('.sektorke0').addClass('aktif');
                                break;
                                case 'daftarSaham' :
                                var html = '';
                                var chart='';
                                for (var x=0; x< result.daftar.length;x++){
                                    var line = result.daftar[x];
                                    html +=
                                    `<div class='col-xs-12 pad-more' style='height:250px;margin-bottom:20px'>
                                        <div class='panel mar-mor box-wh' style='margin-right: 10px;'>
                                            <div class='panel-body' style='padding:0px'>
                                                <div class='col-xs-6 pad-more'>
                                                    <h3 style='margin-top:10px;font-size:23px !important;position:absolute'>`+line.kode_saham+`</h3>
                                                    <div class='pull-right bg-blue' style='position:responsive;padding:10px;border-bottom-left-radius:15px;border-bottom-right-radius:15px'>
                                                        <center>
                                                        <span>Harga Saham Saat Ini</span>
                                                        <h3 style='margin-top:0px'>`+sepNumPas(line.harga)+`</h3>
                                                        </center>
                                                    </div>
                                                    <br>
                                                    <br>
                                                    <span>".substr($tglakhir,8,2)." ".$AddOnLib->ubah_periode(substr($tglakhir,0,4).substr($tglakhir,5,2))."</span>
                                                    <br>
                                                    <div style='height:170px;margin-top:15px' id='chartSaham_`+line.kode_saham+`'>
                                                    </div>
                                                </div>
                                                <div class='col-xs-6 pad-more' id='detail'>`;
                                                var det ='';
                                
                                                for(var i=0;i<result.daftar2.length;i++){
                                                    var line2 = result.daftar2[i];
                                                    if(line2.pers_oleh < 0){
                                                        var color='color:red';
                                                    }else{
                                                        var color='color:green';
                                                    }

                                                    if(line2.pers_buku < 0){
                                                        var color2='color:red';
                                                    }else{
                                                        var color2='color:green';
                                                    }
                                                    if(line2.kode_saham == line.kode_saham){
                                                        det +=`<div class='col-xs-12 pad-more'>
                                                        <h3 style='margin-top:0px'>`+line2.kode_kelola+`</h3>
                                                        </div>
                                                        <div class='col-xs-4 pad-more'>
                                                            <h3 style='margin-top:0px;font-weight:bold !important;font-size: 16px !important;'>`+sepNumPas(line2.jumlah)+` Lbr</h3>
                                                            <span style='font-size: 8px;'>Jumlah Saham</span><br style='font-size: 8px;'>
                                                        </div>
                                                        <div class='col-xs-4 pad-more'>
                                                            <h3 style='margin-top:0px;font-weight:bold !important;font-size: 16px !important;position: absolute;'>`+sepNumPas(line2.h_oleh)+`</h3>
                                                            <h4 style='font-size: 14px;position: relative;margin-top: 0px;`+color+`;margin-bottom: 0px;margin-right: 5px;' class='pull-right'>`+sepNum(line2.pers_oleh)+`%</h4>
                                                            <br style='font-size: 17px;'>
                                                            <span style='font-size: 8px;'>Harga Perolehan per Saham</span><br style='font-size: 8px;'>
                                                        </div>
                                                        <div class='col-xs-4 pad-more'>
                                                            <h3 style='margin-top:0px;font-weight:bold !important;font-size: 16px !important;position: absolute;'>`+sepNumPas(line2.h_buku)+`</h3>
                                                            <h4 style='font-size: 14px;position: relative;margin-top: 0px;`+color2+`;margin-bottom: 0px;margin-right: 10px;' class='pull-right'>`+sepNum(line2.pers_buku)+`%</h4>
                                                            <br style='font-size: 17px;'>
                                                            <span style='font-size: 8px;'>Harga Buku per Saham</span><br style='font-size: 8px;'>
                                                        </div>`;
                                                    }
                                                }
                                            html+=det+`    
                                                </div>
                                            </div>
                                        </div>
                                    </div>`;
                                }
                                
                                $('#daftarDetail').html(html);

                                for (var z=0; z< result.daftar3.length;z++){
                                    var line = result.daftar3[z];
                                    Highcharts.chart('chartSaham_'+line.kode_saham, {
                                        chart: {
                                            marginRight: 50
                                        },
                                    
                                        legend: {
                                            align: 'right',
                                            verticalAlign: 'top',
                                            layout: 'vertical',
                                            x: 0,
                                            y: 40
                                        },
                                        title: {
                                            text: ''
                                        },
                                        credits: {
                                            enabled: false
                                        },
                                        xAxis: {
                                            categories: ['Perolehan','Nilai Buku']
                                        },
                                        yAxis: [{ // Primary yAxis
                                            labels: {
                                                format: '{value}',
                                                style: {
                                                    color: Highcharts.getOptions().colors[1]
                                                }
                                            },
                                            title: {
                                                text: null,
                                                style: {
                                                    color: Highcharts.getOptions().colors[1]
                                                }
                                            }
                                        }],
                                        labels: {
                                            items: [{
                                                html: '',
                                                style: {
                                                    left: '50px',
                                                    top: '18px',
                                                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'black'
                                                }
                                            }]
                                        },
                                        tooltip: {
                                            shared: true
                                        },
                                        series: result.series[z].data
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

                switch(jenis_data){
                    case 'SH' :
                        $('.judul').text('Saham Bursa');
                        loadService('performa','GET','$root_ser/dashYakesInves.php?fx=getNABHari','$kode_plan|BHN'); 
                        // loadService('performa2','GET','$root_ser/dashYakesInves.php?fx=getSPIHari','$kode_plan|BHN'); 
                        loadService('sahamBursa','GET','$root_ser/dashYakesInves.php?fx=getNOleh','$tglakhir|$kode_plan');
                        loadService('sahamBursa2','GET','$root_ser/dashYakesInves.php?fx=getNBuku','$tglakhir|$kode_plan');
                        loadService('daftar_sektor','GET','$root_ser/dashYakesInves.php?fx=getSahamSektor','$tglakhir|$kode_plan|$kode_klp');
                        loadService('daftarSaham','GET','$root_ser/dashYakesInves.php?fx=getDetailperSaham','$tglakhir|$kode_plan|$kode_klp|S0001'); 
                    break;                
                    
                }
                
            }

            initDash();           

            </script>

        ";
        

		return "";
	}
	
}
?>
