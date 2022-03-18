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
class server_report_saku3_dash_rptDashYakesDeposito3 extends server_report_basic
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

        $sql1= "select top 1 a.kode_kelola,a.nama,a.gambar, b.jum as nilai
        from inv_kelola a
        inner join ( select kode_kelola,sum(nilai_depo) as jum from inv_depo_kkp where tanggal = '$tglakhir' and kode_plan='$kode_plan'  and jenis='Deposito'
        group by kode_kelola ) b on a.kode_kelola=b.kode_kelola";

        $depo1 = $dbLib->execute($sql1);
        $kode_kelola = $depo1->fields[0];

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

        $root_ser = $link."/web/server/yakes";

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
            h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                font-family: 'Roboto', sans-serif !important;
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
                background: #FFCC00 !important;
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
                <h3 class='font-weight-light' style='color: #000000; margin-top: 0px; font-size:22px !important;padding-left: 0.5rem;position:fixed;'>Deposito <span id='jplan'></span></h3>
                <div class='pull-right navigasi' style='margin-right: 10px; margin-top: ; padding-bottom: 1rem;'>
                    <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                    <span id='refresh_btn' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                    <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                </div>
                <br><span style='margin-top: -0.7rem; padding-left: 0.5rem; font-size: 1.2rem; color: #808080;position: relative;'>s.d ".substr($tglakhir,8,2)." ".$AddOnLib->ubah_periode(substr($tglakhir,0,4).substr($tglakhir,5,2))." </span>
                <span id='kode_klp_view' style='font-size: 1.2rem;color: #808080;'></span>
            </div>
            <div class='panel-body'  style='padding-top: 0px;'>
                    <div id='home' class='tab-pane fade in active'>
                        <div class='row'  style='padding-top: 10px;'>
                            <div class='col-md-5 pad-more'>
                                <div class='col-md-12' style='margin-bottom:10px'>
                                    <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                                        <div style='border-top-left-radius: 15px;border-top-right-radius: 15px;height:70px;padding: 5px;' class='panel-heading bg-blue'>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-md-5 col-xs-5 text-center'>
                                                <h6 style='margin-bottom: 5px;color: #ffffff87;'>Total Deposito (IDR)</h6>
                                                <h2 id='nilaiDOC' style='margin-top: 0px;'></h2>  
                                            </div>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-md-2 col-xs-2 text-center'>
                                            </div>
                                            <div style='' class='col-md-5 col-xs-5 text-right'> 
                                                <h6 style='margin-bottom: 0px;color: #ffffff87;'>Deposito</h6>
                                                <h2 style='color:#ffffff87;margin-top: 0px;' >DOC</h2>  
                                            </div>
                                        </div>
                                        <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;'>
                                            <div class='row' style='padding: 10px;' id='detDOC'>
                                            </div>                                        
                                        </div>
                                    </div>
                                </div>
                                <div class='col-md-12' style='margin-bottom:10px'>
                                    <div class='panel mar-mor box-wh' style='box-shadow: none;'>
                                        <div style='border-top-left-radius: 15px;border-top-right-radius: 15px;height:70px;padding: 5px;' class='panel-heading bg-green'>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-md-5 col-xs-5 text-center'>
                                                <h6 style='margin-bottom: 5px;color: #ffffff87;'>Total Deposito (IDR)</h6>
                                                <h2 id='nilaiBerjangka' style='margin-top: 0px;'>1.97M</h2>  
                                            </div>
                                            <div style='padding-left: 5px;padding-right: 5px;' class='col-md-2 col-xs-2 text-center'>
                                            </div>
                                            <div style='' class='col-md-5 col-xs-5 text-right'> 
                                                <h6 style='margin-bottom: 0px;color: #ffffff87;'>Deposito</h6>
                                                <h2 style='color:#ffffff87;margin-top: 0px;'> Berjangka</h2>  
                                            </div>
                                        </div>
                                        <div class='panel-body' style='border: 1px solid #eae5e5;border-bottom-right-radius: 15px;border-bottom-left-radius: 15px;'>
                                            <div class='row' style='padding: 10px;' id='detBerjangka'>
                                            </div>                                        
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-3 col-xs-12 pad-more'>
                                <div class='col-md-12 pad-more' style='margin-bottom:25px'>
                                    <div class='panel mar-mor box-wh'>
                                        <div class='panel-heading text-center' style='padding-bottom:10px'>
                                            <h5 style='margin-top:0px;margin-bottom:0px;position: absolute;'>Alokasi <span class='lblAlok'>DOC</span> per Bank <span class='lblMI'>BHN</span></h5>
                                        </div>
                                        <div class='panel-body'>
                                            <div id='Alokasi' style='margin: 0 auto; padding: 0 auto;'>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class='col-md-4 col-xs-12 pad-more'>
                                <div class='col-md-12 pad-more' style='height:270px;margin-bottom:25px'>
                                    <div class='panel mar-mor box-wh'>
                                        <div class='panel-heading text-center' style='padding-bottom:10px'>
                                            <h5 style='margin-top:0px;margin-bottom:0px;position: absolute;'>Daftar <span class='lblAlok'>DOC</span> per Bank <span class='lblMI'>BHN</span></h5>
                                            <p hidden id='kode_kelola'></p>
                                            <p hidden id='kode_kelola2'></p>
                                            <p hidden id='jenisDepo'>DOC</p>
                                        </div>
                                        <div class='panel-body'>
                                            <div class='col-xs-12' style='padding: 0px;'>
                                            <style>
                                            .selectize-input{
                                                border:none;
                                                border-bottom:1px solid #8080806b;
                                            }
                                            </style>
                                            <select class='form-control input-sm selectize' id='dash-bank' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                            <option value=''>Pilih Nama Bank</option>";                                          
                                            echo" </select>";
                                            echo"
                                            </div>
                                            <div id='daftarDepo'></div>
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

            $('.panel').on('click','#close_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesAlokAset','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs/$tglakhir/$kode_plan/$kode_klp');
            });
            $('.panel').on('click','#back_btn',function(){
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYakesRealisasi','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$tglakhir|$kode_plan|$kode_klp');
            });

            $('.panel').on('click','#refresh_btn',function(){
                location.reload();
            });

            $('.panel').on('change','#dash-bank',function(){
                var bank = $('#dash-bank')[0].selectize.getValue();
                var kode_kelola =  $('#kode_kelola').text();
                var kode = $('#jenisDepo').text();
                if(kode == 'DOC'){
                    loadService('daftarDepo','GET','$root_ser/dashYakesInves.php?fx=getDOCMI','$tglakhir|$kode_plan|$kode_klp|'+kode_kelola+'|'+bank);
                }else{
                    loadService('daftarDepo','GET','$root_ser/dashYakesInves.php?fx=getDepoMI','$tglakhir|$kode_plan|$kode_klp|'+kode_kelola+'|'+bank);
                }
                    
            });

            
            $('#jplan').text('$nama_plan');
            
            $('#kode_kelola').text('$kode_kelola');

            function view_klp(kode){
                var tmp1 = kode.substr(0,2);
                var tmp2 = kode.substr(2,2);
                return '('+tmp1+':'+tmp2+')';
            }

            $('#kode_klp_view').text(view_klp('$kode_klp'));

            $('.panel').on('click','.klik-chart2',function(){
                var kode = $(this).closest('div').find('p').text();
                $('#kode_kelola').text(kode);
                $('#jenisDepo').text('Deposito');
                $('.lblAlok').text('Berjangka');
                getNamaKelola(kode);
                var param = '$kode_plan|'+kode;

                $('.klik-chart2').css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': 'white','color':'black'});
                $('.klik-chart').css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': 'white','color':'black'});

                $(this).css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': '#4cd964','color':'white'});

                
                loadService('getBank','GET','$root_ser/dashYakesInves.php?fx=getBankKlp','$tglakhir|$kode_plan|$kode_klp|'+kode+'|Deposito');
                loadService('Alokasi','GET','$root_ser/dashYakesInves.php?fx=getDepoAlokasi','$tglakhir|$kode_plan|$kode_klp|'+kode);
                loadService('daftarDepo','GET','$root_ser/dashYakesInves.php?fx=getDepoMI','$tglakhir|$kode_plan|$kode_klp|'+kode);              

            });

            $('.panel').on('click','.klik-chart',function(){
                var kode = $(this).closest('div').find('p').text();
                $('#kode_kelola').text(kode);
                var param = '$kode_plan|'+kode;
                
                $('#jenisDepo').text('DOC');

                $('.lblAlok').text('DOC');
                getNamaKelola(kode);

                $('.klik-chart').css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': 'white','color':'black'});
                $('.klik-chart2').css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': 'white','color':'black'});

                $(this).css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': '#007aff','color':'white'});

                loadService('getBank','GET','$root_ser/dashYakesInves.php?fx=getBankKlp','$tglakhir|$kode_plan|$kode_klp|'+kode+'|DOC');
                loadService('Alokasi','GET','$root_ser/dashYakesInves.php?fx=getDOCAlokasi','$tglakhir|$kode_plan|$kode_klp|'+kode);
                loadService('daftarDepo','GET','$root_ser/dashYakesInves.php?fx=getDOCMI','$tglakhir|$kode_plan|$kode_klp|'+kode);              

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
                return sepNum(nil) + ' JT';
            }

            function toMiliar(x) {
                var nil = x / 1000000000;
                return sepNum(nil) + ' M';
            }

            function getNamaKelola(kode){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/dashYakesInves.php?fx=getNamaKelola',
                    dataType: 'json',
                    data: {'kode':kode},
                    success:function(result){    
                        if(result.status){
                            var nama = result.nama.split(' ');
                            $('.lblMI').text(nama[0]);
                        }
                    }
                });
            }

            getNamaKelola('BHN');
            function loadService(index,method,url,param=null){
                $.ajax({
                    type: method,
                    url: url,
                    dataType: 'json',
                    data: {'periode':'$periode','param':param},
                    success:function(result){    
                        if(result.status){
                            switch(index){
                                case 'Alokasi' :
                                Highcharts.chart('Alokasi', {
                                    chart: {
                                        type: 'pie'
                                    },
                                    title: null,
                                    plotOptions: {
                                        pie: {
                                            innerSize: '52%',
                                            dataLabels: {
                                                enabled: false
                                            },
                                            showInLegend: true
                                        }
                                    },
                                    credits:{
                                        enabled:false
                                    },
                                    series: [{
                                        data: result.data
                                    }]
                                });
                                    

                                break;
                               
                                case 'DOC' :
                                var html ='';
                                $('#nilaiDOC').text(toMiliar(result.nilai));
                                for(var i=0;i<result.daftar.length;i++){
                                    html +=`<div class='col-md-6 klik-chart rowke`+i+`' style='padding:0px;margin-bottom:5px'><div style='padding: 5px;height:60px;border: 1px solid #dadada;border-radius: 10px;text-align:center;background: white;' class='col-md-4 col-xs-4'>
                                        <p hidden>`+result.daftar[i].kode_kelola+`</p>
                                        <img src='$path/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 50px;height:auto'>
                                        </div>
                                        <div style='padding: 0 auto;height:60px;' class='col-md-8 col-xs-8'>
                                            <span style='font-size: 16px;' >`+sepNum(result.daftar[i].persen)+`%</span>`;
                                        html+=`<br>
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nilai)+`</span>
                                            <br>                
                                        </div></div>`;
                                    
                                }
                                $('#detDOC').html(html);
                                $('.rowke0').css({'border-radius': '10px','box-shadow': 'none','padding': '0px','background': '#007aff','color':'white'});
                                break;
                                case 'Depo' :
                                var html ='';
                                $('#nilaiBerjangka').text(toMiliar(result.nilai));
                                for(var i=0;i<result.daftar.length;i++){
                                    html +=`<div class='col-md-6 klik-chart2 rowke`+i+`' style='padding:0px;margin-bottom:5px'><div style='padding: 5px;height:60px;border: 1px solid #dadada;border-radius: 10px;text-align:center;background: white;' class='col-md-4 col-xs-4 '>
                                        <p hidden>`+result.daftar[i].kode_kelola+`</p>
                                        <img src='$path/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 50px;height:auto'>
                                        </div>
                                        <div style='padding: 0 auto;height:60px;' class='col-md-8 col-xs-8'>
                                            <span style='font-size: 16px;' >`+sepNum(result.daftar[i].persen)+`%</span>`;
                                        html+=`<br>
                                            <span style='font-size: 10px;' >`+sepNumPas(result.daftar[i].nilai)+`</span>
                                            <br>                
                                        </div></div>`;
                                    
                                }
                                $('#detBerjangka').html(html);
                                break;
                                case 'daftarDepo':
                                var html = '';
                                for (var i=0;i<result.daftar.length;i++){
                                    html +=`<div class='col-xs-12' style='margin-top: 10px;padding: 0px;'>
                                    <div class='panel' style='border: 1px solid #e8e8e8;border-radius: 0px;box-shadow: 1px 2px 1px rgba(0,0,0,.05);border-left: 10px solid #007aff;'>
                                        <div class='panel-body'>
                                            <div class='row'>
                                                <div style='padding-right: 0px;padding-left: 0px;' class='col-xs-5 text-center'>
                                                    <p style='font-size: 9px;margin-bottom: 0px;'>Durasi (Hari)</p>
                                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].jml_hari+`</p>
                                                    <p style='font-size: 9px;margin-bottom: 0px;'>Suku Bunga</p>
                                                    <p style='margin-bottom: 2px;'>`+sepNum(result.daftar[i].p_bunga)+`%</p>
                                                </div>
                                                <div class='col-md-2'></div>
                                                
                                                <div style='padding-left: 0px;padding-right: 0px;' class='col-xs-5 text-center'>
                                                    <p style='font-size: 9px;margin-bottom: 0px;'>Tgl Mulai</p>
                                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].tgl_mulai+`</p>
                                                    <p style='font-size: 9px;margin-bottom: 0px;'>Tgl Jatuh Tempo</p>
                                                    <p style='margin-bottom: 2px;'>`+result.daftar[i].tgl_selesai+`</p>
                                                </div>
                                                <div class='col-xs-12 text-center' style='margin-bottom: 20px;'>
                                                    <p style='font-size: 9px;margin-bottom: 0px;'>Nilai Deposito</p>
                                                    <p style='margin-bottom: 2px;font-size: 20px;'>Rp. `+sepNumPas(result.daftar[i].nilai)+`</p>
                                                </div>
                                                <div style='padding-right: 0px;' class='col-xs-6'>
                                                    
                                                    <img src='$path/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`' style='width: 40px;height: auto;'>
                                                </div>
                                                <div style='padding-left: 0px;' class='col-xs-6 text-right'>
                                                <p style='font-size: 9px;'>`+result.daftar[i].cabang+`</p>                   </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>`;
                                }
                                $('#daftarDepo').html(html);
                               
                                break;
                                case 'getBank' :
                                if(result.status){
                                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                        var select = $('#dash-bank').selectize();
                                        var control = select[0].selectize;
                                        control.clearOptions();
                                        for(i=0;i<result.daftar.length;i++){
                                            $('#dash-bank')[0].selectize.addOption([{text:result.daftar[i].kode_bankklp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_bankklp}]);   
                                        }
                                    }
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

            function initDash(){

                loadService('DOC','GET','$root_ser/dashYakesInves.php?fx=getDOC','$tglakhir|$kode_plan');
                loadService('Depo','GET','$root_ser/dashYakesInves.php?fx=getDepo','$tglakhir|$kode_plan');
                loadService('Alokasi','GET','$root_ser/dashYakesInves.php?fx=getDOCAlokasi','$tglakhir|$kode_plan|$kode_klp');
                loadService('daftarDepo','GET','$root_ser/dashYakesInves.php?fx=getDOCMI','$tglakhir|$kode_plan|$kode_klp');
                loadService('getBank','GET','$root_ser/dashYakesInves.php?fx=getBankKlp','$tglakhir|$kode_plan|$kode_klp|$kode_kelola|DOC');

            }

            initDash();           

            </script>

        ";
        

		return "";
	}
	
}
?>
