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
class server_report_saku3_dash_rptDashYakesNotif2 extends server_report_basic
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
        $_SESSION['userLog'] = $nik;
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
              
              .tabs-left, .tabs-right {
                border-bottom: none;
                padding-top: 2px;
              }
              .tabs-left {
                border-right: 1px solid #ddd;
              }
              .tabs-right {
                border-left: 1px solid #ddd;
              }
              .tabs-left>li, .tabs-right>li {
                float: none;
                margin-bottom: 15px;
              }
              .tabs-left>li {
                margin-right: -1px;
                text-align:center;
              }
              .tabs-left>li>a,.tabs-left>li>a:hover,.tabs-left>li>a:focus {
                color:#d1d1d6;
                background:white;
              }

              .tabs-top>li {
                text-align:center;
                border:none;
              }

              .tabs-top>li>a,.tabs-top>li>a:hover,.tabs-top>li>a:focus {
                color:#d1d1d6;
                background:white;
              }

              .tabs-right>li {
                margin-left: -1px;
              }
              .tabs-left>li.active>a,
              .tabs-left>li.active>a:hover,
              .tabs-left>li.active>a:focus {
                border-bottom-color: #ddd;
                border-right-color: transparent;
                color:#007AFF;
              }

              .tabs-top>li.active>a,
              .tabs-top>li.active>a:hover,
              .tabs-top>li.active>a:focus {
                border:none;
                color:#007AFF;
              }
              
              .tabs-right>li.active>a,
              .tabs-right>li.active>a:hover,
              .tabs-right>li.active>a:focus {
                border-bottom: 1px solid #ddd;
                border-left-color: transparent;
              }
              .tabs-left>li>a {
                border-radius: 5px;
                margin-right: 0;
                display:block;
                padding:5px
              }
              .tabs-top>li>a {
                border:none;
              }
              .tabs-right>li>a {
                border-radius: 5px;
                margin-right: 0;
              }
              .fa-n{
                  font-size:2em;
              }

              .jenisAktif,.kelolaAktif,.pesanAktif{
                  color:#007AFF;
                  cursor:pointer;
              }
              .jenisNon,.kelolaNon,.pesanNon{
                  color:black;
                  cursor:pointer;
              }
              .boxAktif {
                  box-shadow: 1px 1px 2px 3px #007affdb;
                  cursor:pointer;
              }
              .boxNonAktif {
                  box-shadow: none;
                  cursor:pointer;
              }
              .box2Aktif {
                box-shadow: 1px 1px 0px 1px #007affdb;
                cursor:pointer;
              }
              .box2NonAktif {
                box-shadow: none;
                cursor:pointer;
              }
              .sudah{
                  padding-left:0;
              }
              .sudah > div{
                  border-bottom-left-radius:15px;
                  border-top-left-radius:15px;
              }
              .belum{
                  padding-left: 12px;
              }
              .belum > div{
                border-bottom-left-radius:none;
                border-top-left-radius:none;
              }
              .detPesan{
                  border:1px solid #d1d1d6;
                  border-bottom-right-radius:30px;
                  border-bottom-left-radius:30px;
                  border-top-right-radius:30px;
                  min-height:100px;
                  padding:10px;
              }
              .read{
                  display:none;
              }
              .unread{
                  display:block;
              }
        </style>
        <div class='panel' style='box-shadow:none'>
            <div class='panel-heading text-right' style='font-size:18px;padding-bottom:0'> 
            <ul class='nav nav-tabs pull-right tabs-top' style='border-bottom: none;'>
                <li role='presentation'><a href='#menu1' data-toggle='tab'><span style='border-radius:10px;margin-left: 30px;font-size: 10px;position: absolute;top: 1px;left: -2px;' class='label label-danger' id='badgeNotif'>&nbsp;</span><i class='fa fa-bell fa-lg'></i></a></li>
                <li role='presentation'><a href='#menu2' data-toggle='tab'><i class='fa fa-gear fa-lg'></i></a></li>
                <li role='presentation'>
                <!--<button type='button' id='btn-refresh' style='border: 1px solid #d5d5d5;border-radius: 20px;background: white;'> <i class='fa fa-refresh fa-lg'></i>
                </button>-->
                <a href='#' id='btn-refresh'><i class='fa fa-refresh fa-lg'></i></a>
                </li>
            </ul>  
                
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div style='background: #d1d1d6;height: 400px;border-top-right-radius: 30px;border-bottom-right-radius: 30px;' class='col-xs-1'>
                        <ul class='nav nav-tabs tabs-left sideways' style='margin: 50px auto;border: none;width:50px'>
                            <li role='presentation' class='active' id='filBtn'><a data-toggle='tab' href='#home'><i class='fa fa-filter fa-n'></i></a></li>
                            <!--<li role='presentation'><a href='#menu1' data-toggle='tab'><span style='border-radius:10px;margin-left: 30px;font-size: 10px;position: absolute;top: -5px;' class='label label-danger' id='badgeNotif'>&nbsp;</span><i class='fa fa-bell fa-n'></i></a></li>
                            <li role='presentation'><a href='#menu2' data-toggle='tab'><i class='fa fa-gear fa-n'></i></a></li>-->
                        </ul>  
                    </div> 
                    <div class='col-xs-11'>
                        <div class='tab-content' style='padding-left:10px'>
                            <div id='home' class='tab-pane fade in active'>
                                <div class='row'>
                                    <div class='col-xs-2' id='filterData'>
                                        
                                    </div>
                                    <div class='col-xs-5' style='background:#d1d1d6;border-radius:30px;padding:10px 30px'>
                                        <h3 style='margin-bottom:20px'>Daftar Deposito</h3>
                                        <span id='inp-jenis' hidden></span>
                                        <span id='inp-kelola' hidden></span>
                                        <div class='col-xs-12' id='daftarDepo'>
                                            
                                        </div>
                                    </div>
                                    <div class='col-xs-5'>
                                        <h3>Detail Informasi</h3>
                                        <table class='table no-border' style='font-size:12px' id='detailDepo'>
                                            <style>
                                            .frame {
                                                                            
                                                width:100px;
                                                height:90px;
                                                white-space: nowrap;
                                                border:1px solid #d1d1d6;
                                                border-radius:10px;
                                                text-align: center; 
                                                margin:0 auto;
                                            }
                                            
                                            .helper {
                                                display: inline-block;
                                                height: 100%;
                                                vertical-align: middle;
                                            }
                                            
                                            img {
                                                vertical-align: middle;
                                                max-height: 90px;
                                                max-width: 80px;
                                            }
                                            </style>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </div>
                            <div id='menu1' class='tab-pane fade in'>
                                <div class='row'>
                                    <div class='col-xs-2' id='filterData2'>
                                        <h3>Filter</h3>
                                        <br>
                                        <h6 style='font-weight:bold !important'>Pesan:</h6>
                                        <h6 class='pesan pesanAktif' style='cursor:pointer;'>Semua<p hidden>semua</p></h6>
                                        <h6 class='pesan' style='cursor:pointer;'>Sudah dibaca <p hidden>sudah</p></h6>
                                        <h6 class='pesan' style='cursor:pointer;'>Belum dibaca <p hidden>belum</p></h6>
                                    </div>
                                    <div class='col-xs-5' style='background:#d1d1d6;border-radius:30px;padding:10px 30px'>
                                    <form id='formHapusPesan'>
                                        <h3 style='margin-bottom:20px'>Pesan</h3>
                                        <div class='checkbox'>
                                            <label style='padding-left:0'>
                                            <span style='margin-right:30px'>Tandai</span>
                                            <input type='checkbox' name='tandai' id='tandai' onclick='tandaiHapus()'>
                                            </label>
                                            <button type='submit' class='pull-right' id='hapusPesan' style='border: none;
                                            background: none;
                                            color: #007aff;' hidden >Hapus</button>
                                        </div>
                                        <span id='inp-pesan' hidden>semua</span>
                                        <div class='col-xs-12' id='daftarPesan'>
                                            
                                        </div>
                                    </form>
                                    </div>
                                    <div class='col-xs-5' id='detailPesan'>
                                       
                                    </div>
                                </div>
                            </div>
                            <div id='menu2' class='tab-pane fade in'>
                                <div class='row'>
                                    <div class='col-xs-2' id='filterData2'>
                                        <h3>Pengaturan</h3>
                                        <br>
                                        <h6 style='font-weight:bold !important;color:#007AFF'>Alert Pesan</h6>
                                    </div>
                                    <div class='col-xs-5' style='background:#d1d1d6;border-radius:30px;padding:10px 30px'>
                                    <form id='formSetting'>
                                        <h3 style='margin-bottom:20px'>Alert Notifikasi</h3>
                                        <div class='col-xs-12' >
                                            <div class='row' style='margin-bottom:15px'>
                                                <div class='form-group' style='margin-bottom:5px;'>
                                                <label class='control-label col-sm-12'>Waktu Pemberitahuan</label>
                                                    <div class='col-sm-12' >
                                                    <select id='waktu' name='waktu_pb' class='form-control input-form selectize' required>
                                                    <option value='' disabled>Pilih</option>
                                                    <option value='1'>H-1</option>
                                                    <option value='2'>H-2</option>
                                                    <option value='3'>H-3</option>
                                                    </select>
                                                    <span style='color:#007AFF;font-size:10px'>Pesan akan dikirimkan saat akan mendekati waktu jatuh tempo</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class='row' style='margin-bottom:15px'>
                                                <div class='form-group' style='margin-bottom:5px;'>
                                                <label class='control-label col-sm-12'>Pengulangan</label>
                                                    <div class='col-sm-12' >
                                                    <select id='ulang' name='ulang' class='form-control input-form selectize' required>
                                                    <option value='' disabled>Pilih</option>
                                                    <option value='Tidak'>Tidak</option>
                                                    <option value='24'>24 jam</option>
                                                    </select>
                                                    <span style='color:#007AFF;font-size:10px'>Pemberitahuan jatuh tempo akan dikirim ulang sebagai pemberitahuan</span>
                                                    </div>
                                                </div>
                                            </div>
                                            <button type='submit' class='btn pull-right' style='background:white;color:#007AFF' id='btnOk'>Simpan</button>
                                
                                        </div>
                                    </form>
                                    </div>
                                    <div class='col-xs-5'>
                                       
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>    
                </div>
            </div>
        </div>
        <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async=''></script>
        <script>
        var idUser = '';
        var OneSignal = window.OneSignal || [];
        OneSignal.push(function() {
            OneSignal.init({
                appId: '86207625-efbc-4f50-8f19-ad3b7db93db7',
            });
            OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
                if (isEnabled){
                    OneSignal.getUserId().then(function(userId) {
                        console.log(userId);
                        idUser = userId;
                        $.ajax({
                            type: 'POST',
                            url: '$root_ser/Notif2.php?fx=register',
                            dataType: 'json',
                            async:false,
                            data: {nik:'".$nik."', kode_lokasi:'".$kode_lokasi."', token:userId},
                            success:function(result){
                                console.log(result.message);
                                
                                initDash();
                            },
                            fail: function(xhr, textStatus, errorThrown){
                                alert('request failed:'+textStatus);
                            }
                        });
                    });
                }
                else{
                    console.log('Push notifications are not enabled');    
                }  
            });
        });

        $('.panel').on('click', '#btn-refresh', function(){
            location.reload();
        });

        $('#formHapusPesan').submit(function(e){
            e.preventDefault();
            var formData = new FormData(this);
            for(var pair of formData.entries()) {
                 console.log(pair[0]+ ', '+ pair[1]); 
            }
            formData.append('kode_lokasi','$kode_lokasi');
            formData.append('nik','$nik');
            formData.append('token',idUser);
            $.ajax({
                type: 'POST',
                url: '$root_ser/Notif2.php?fx=delPesan',
                dataType: 'json',
                async:false,
                data: formData,
                contentType: false,
                cache: false,
                processData: false, 
                success:function(result){
                    alert('Pesan '+result.message);
                    location.reload();
                },
                fail: function(xhr, textStatus, errorThrown){
                    alert('request failed:'+textStatus);
                }
            });
        });

        $('#formSetting').submit(function(e){
            e.preventDefault();
            var formData = new FormData(this);
            for(var pair of formData.entries()) {
                 console.log(pair[0]+ ', '+ pair[1]); 
            }
            formData.append('kode_lokasi','$kode_lokasi');
            formData.append('nik','$nik');
            formData.append('token',idUser);
            $.ajax({
                type: 'POST',
                url: '$root_ser/Notif2.php?fx=updateSetting',
                dataType: 'json',
                async:false,
                data: formData,
                contentType: false,
                cache: false,
                processData: false, 
                success:function(result){
                    alert('Pengaturan '+result.message);
                    location.reload();
                },
                fail: function(xhr, textStatus, errorThrown){
                    alert('request failed:'+textStatus);
                }
            });
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

        $('.panel').on('click', '.kelola', function(){
            $('.kelola').removeClass('kelolaAktif');
            $('.kelola').addClass('kelolaNon');
            $(this).removeClass('kelolaNon');
            $(this).addClass('kelolaAktif');
            var kode = $(this).find('p').text();
            $('#inp-kelola').text(kode);
            var kelola =   $('#inp-kelola').text();
            var jenis =   $('#inp-jenis').text();
            loadService('Deposito','GET','$root_ser/dashYakesInves.php?fx=getDeposito','".date('Y-m-d')."|1|5050|'+jenis+'|'+kelola); 
        });

        $('.panel').on('click', '.jenisDepo', function(){
            $('.jenisDepo').removeClass('jenisAktif');
            $('.jenisDepo').addClass('jenisNon');
            $(this).removeClass('jenisNon');
            $(this).addClass('jenisAktif');
            var kode = $(this).find('p').text();
            $('#inp-jenis').text(kode);
            var kelola =   $('#inp-kelola').text();
            var jenis =   $('#inp-jenis').text();
            loadService('Deposito','GET','$root_ser/dashYakesInves.php?fx=getDeposito','".date('Y-m-d')."|1|5050|'+jenis+'|'+kelola); 
        });

        $('.panel').on('click', '.pesan', function(){
            $('.pesan').removeClass('pesanAktif');
            $('.pesan').addClass('pesanNon');
            $(this).removeClass('pesanNon');
            $(this).addClass('pesanAktif');
            var kode = $(this).find('p').text();
            $('#inp-pesan').text(kode);
            loadService('GetNotif','GET','$root_ser/Notif2.php?fx=getNotif2','$kode_lokasi|$nik|'+kode+'|'+idUser); 
        });

        $('.panel').on('click', '.klik', function(){
            var classname = $(this).attr('class');
            var tmp = classname.split(' ');
            if(tmp[2]== 'boxAktif'){
                $('.klik').removeClass('boxAktif');
                $('.klik').addClass('boxNonAktif');
                $(this).removeClass('boxAktif');
                $(this).addClass('boxNonAktif');
                $('#detailDepo tbody').html('');
            }else{
                $('.klik').removeClass('boxAktif');
                $('.klik').addClass('boxNonAktif');
                $(this).removeClass('boxNonAktif');
                $(this).addClass('boxAktif');
                var kode = $(this).find('p').text();
                $('#inp-bank').text(kode);
                var kelola =   $('#inp-kelola').text();
                var jenis =   $('#inp-jenis').text();
                loadService('DetailDepo','GET','$root_ser/dashYakesInves.php?fx=getDeposito','".date('Y-m-d')."|$kode_plan|$kode_klp|'+jenis+'|'+kelola+'|'+kode);    
            }
            
        });

        $('.panel').on('click', '.klik2', function(){
            var classname = $(this).attr('class');
            var tmp = classname.split(' ');
            if(tmp[3]== 'box2Aktif' || tmp[2] == 'box2Aktif' ){
                $('.klik2').removeClass('box2Aktif');
                $('.klik2').addClass('box2NonAktif');
                $(this).removeClass('box2Aktif');
                $(this).addClass('box2NonAktif');
                $('#detailPesan').html('');
            }else{
                $('.klik2').removeClass('box2Aktif');
                $('.klik2').addClass('box2NonAktif');
                $(this).removeClass('box2NonAktif');
                $(this).addClass('box2Aktif');
                $(this).removeClass('belum');
                $(this).addClass('sudah');
                var kode = $(this).find('span').text();
                var sts = $('#inp-pesan').text();
                loadService('detailNotif','GET','$root_ser/Notif2.php?fx=getDetailNotif','$kode_lokasi|$nik|'+sts+'|'+kode+'|'+idUser);     
            }
            
        });

        $('.panel').on('click', '.tabs-top', function(){
            $('#filBtn').removeClass('active'); 
        });

        $('.panel').on('click', '.tabs-left', function(){
            $('.tabs-top>li').removeClass('active'); 
        });

        $('.detTanda').click(function() {  
           alert('test');
            $('.klik2').each(function(){
                var cek=$(this).closest('div').find('.detTanda').prop('checked');

                if(cek == true){
                    $(this).closest('div').find('.sts').val('on');
                }else{
                    $(this).closest('div').find('.sts').val('off');
                }
                
            });            
            
            
        }); 
        

        function tandaiHapus(){
            var tanda = document.getElementById('tandai');
            if(tanda.checked == true){
                $('#daftarPesan').find('.col-xs-12').addClass('col-xs-10');
                $('#daftarPesan').find('.col-xs-12').removeClass('col-xs-12');
                $('#daftarPesan').find('.col-xs-0').addClass('col-xs-2');
                $('#daftarPesan').find('.col-xs-0').removeClass('col-xs-0');
                $('#daftarPesan').find('.col-xs-2').show();
                $('#hapusPesan').show();
            }else{
                $('#daftarPesan').find('.col-xs-10').addClass('col-xs-12');
                $('#daftarPesan').find('.col-xs-10').removeClass('col-xs-10');
                $('#daftarPesan').find('.col-xs-2').addClass('col-xs-0');
                $('#daftarPesan').find('.col-xs-2').removeClass('col-xs-2');
                $('#daftarPesan').find('.col-xs-0').hide();
                $('#hapusPesan').hide();
            }
        }

        function tandaiDet(kode){
            var tanda = document.getElementById(kode);
            var id = kode.split('psn');
            if(tanda.checked == true){
                $('#sts'+id[1]).val('on');
            }else{
                $('#sts'+id[1]).val('off');
            }
        }

        function view_klp(kode){
            var tmp1 = kode.substr(0,2);
            var tmp2 = kode.substr(2,2);
            return '('+tmp1+':'+tmp2+')';
        }

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
            
            function loadService(index,method,url,param=null){
                $.ajax({
                    type: method,
                    url: url,
                    dataType: 'json',
                    async:false,
                    data: {'periode':'$periode','param':param},
                    success:function(result){    
                        if(result.status){
                            switch(index){
                                case 'MI':
                                    var html = `<h3>Filter</h3>
                                    <br>
                                    <h6 style='font-weight:bold !important'>Jenis Deposito:</h6>
                                    <h6 class='jenisDepo jenisAktif' style='cursor:pointer;'>Semua<p hidden>semua</p></h6>
                                    <h6 class='jenisDepo' style='cursor:pointer;'>DOC <p hidden>DOC</p></h6>
                                    <h6 class='jenisDepo' style='cursor:pointer;'>Berjangka<p hidden>DEPOSITO</p></h6>
                                    <br>
                                    <h6 style='font-weight:bold !important'>Manager Investasi:</h6>
                                    <h6 class='kelola kelolaAktif'>Semua<p hidden>semua</p></h6>`;
                                    
                                    for(var i=0;i<result.daftar.length;i++){
                                        var tmp = result.daftar[i].nama.split(' ');
                                        var nama = tmp[0];
                                        html+=`<h6 class='kelola' style='cursor:pointer;'>`+nama+`<p hidden>`+result.daftar[i].kode_kelola+`</p></h6>`;
                                    }
                                    $('#filterData').html(html);
                                break;
                                case 'Deposito':
                                    var html = '';
                                    for(var i=0;i<result.daftar.length;i++){
                                        
                                        html+=`<div class='row klik boxNonAktif rowke`+i+`' style='padding: 5px;vertical-align: middle;background:white;border-radius: 15px;margin-bottom: 10px;'>
                                        <p hidden>`+result.daftar[i].no_depo+`</p>
                                        <div class='col-xs-3 text-center' style='padding-right: 0px;padding-left: 0px;height: 70px;'>
                                        <img style='width:65px;' src='$path/classes/app/saku3/transaksi/yakes/image/`+result.daftar[i].gambar+`'>
                                        </div>
                                        <div style='padding-right: 0px;padding-left: 0px;height: 70px' class='col-xs-6'>
                                        <h3 style='margin: 5px;font-size: 12px !important;'>`+result.daftar[i].cabang+`</h3>
                                        <h3 style='margin: 5px;font-size: 12px !important;color:#b7b7b7'>`+sepNumPas(result.daftar[i].nilai)+`</h3>
                                        <h3 style='margin: 5px;font-size: 12px !important;color:#b7b7b7'>`+result.daftar[i].jml_hari+` hari | `+sepNum(result.daftar[i].p_bunga)+`%</h3>
                                        </div>
                                        <div style='padding-right: 0px;padding-left: 0px;height: 70px' class='col-xs-3 text-center'>
                                        <h1 style='margin: 15px auto;color: red;font-size: 18px;'>`+result.daftar[i].jatuhtempo+` <br>Hari</h1>
                                        </div>
                                        </div>`;
                                    }
                                    $('#daftarDepo').html(html);
                                    $('.rowke0').removeClass('boxNonAktif');
                                    $('.rowke0').addClass('boxAktif');
                                    var kode = $('.rowke0').find('p').text();
                                    $('#inp-bank').text(kode);
                                    var kelola =   $('#inp-kelola').text();
                                    var jenis =   $('#inp-jenis').text();
                                    loadService('DetailDepo','GET','$root_ser/dashYakesInves.php?fx=getDeposito','".date('Y-m-d')."|$kode_plan|$kode_klp|'+jenis+'|'+kelola+'|'+kode);   
                                break;
                                case 'DetailDepo' :
                                    var html = '';
                                    
                                    for(var i=0;i<result.daftar.length;i++){
                                        var line = result.daftar[i];
                                        html+= `<tr>
                                        <td colspan='2' style='height:100px;'><div class='frame'><span class='helper'></span><img class='logoimg' src='$path/classes/app/saku3/transaksi/yakes/image/`+line.gambar+`'></div></td>
                                        </tr>
                                        <tr>
                                        <td>Nilai Deposito:</td>
                                        <td class='text-right'>`+sepNumPas(line.nilai)+`</td>
                                        </tr>
                                        <tr>
                                        <td>Jenis Deposito:</td>
                                        <td class='text-right'>`+line.jenis+`</td>
                                        </tr>
                                        <tr>
                                        <td>Durasi:</td>
                                        <td class='text-right'>`+line.jml_hari+` Hari</td>
                                        </tr>
                                        <tr>
                                        <td>Suku Bunga:</td>
                                        <td class='text-right'>`+sepNum(line.p_bunga)+`%</td>
                                        </tr>
                                        <tr>
                                        <td>Tanggal Mulai:</td>
                                        <td class='text-right'>`+line.tgl_mulai+`</td>
                                        </tr>
                                        <tr>
                                        <td>Tanggal Jatuh Tempo:</td>
                                        <td class='text-right'>`+line.tgl_selesai+`</td>
                                        </tr>
                                        <tr>
                                        <td>Pengelola:</td>
                                        <td class='text-right'>`+line.nama_kelola+`</td>
                                        </tr>`;
                                    }
                                    
                                    $('#detailDepo tbody').html(html);
                                break;
                                case 'GetNotif':
                                    var html = '';
                                    for(var i =0;i<result.daftar.length;i++){
                                        var row = result.daftar[i];
                                        if(row.flag_baca == '1'){
                                            html+=`<div class='row klik2 sudah box2NonAktif ' style='border-radius: 15px;margin-bottom: 10px;background: #007aff;'>
                                                <span hidden=''>`+row.id+`</span>
                                                <div class='col-xs-12' style='height: 80px;background: white;padding: 10px;border-bottom-right-radius: 15px;border-top-right-radius: 15px;'>
                                                    <h4 style='margin-top: 0;'>`+row.judul+`</h4>
                                                    <p style='font-size: 12px;color: grey;'>`+row.isi+`</p>
                                                </div>
                                                <div class='col-xs-0 text-center' hidden>
                                                <input style='margin: 30px auto;' type='checkbox' name='detTanda[]' class='detTanda' onclick='tandaiDet(this.id)' id='psn`+row.id+`'>
                                                <input style='margin: 30px auto;' type='hidden' name='id[]' class='id' value='`+row.id+`'>
                                                <input style='margin: 30px auto;' type='hidden' name='sts[]' class='sts' id='sts`+row.id+`'>
                                                </div>
                                            </div>`;
                                        }else{
                                            html+=`<div class='row klik2 belum box2NonAktif' style='border-radius: 15px;margin-bottom: 10px;background: #007aff;'>
                                                <span hidden=''>`+row.id+`</span>
                                                <div class='col-xs-12' style='height: 80px;background: white;padding: 10px;border-bottom-right-radius: 15px;border-top-right-radius: 15px;'>
                                                    <h4 style='margin-top: 0;'>`+row.judul+`</h4>
                                                    <p style='font-size: 12px;color: grey;'>`+row.isi+`</p>
                                                </div>
                                                <div class='col-xs-0 text-center' hidden>
                                                <input style='margin: 30px auto;' type='checkbox' name='detTanda[]' class='detTanda' onclick='tandaiDet(this.id)' id='psn`+row.id+`'>
                                                <input style='margin: 30px auto;' type='hidden' name='id[]' class='id' value='`+row.id+`'>
                                                <input style='margin: 30px auto;' type='hidden' name='sts[]' class='sts'  id='sts`+row.id+`'>
                                                </div>
                                            </div>`;
                                        }
                                    }
                                    $('#daftarPesan').html(html);
                                    if(result.unred.length > 0){
                                        $('#badgeNotif').addClass('unread');
                                        $('#badgeNotif').removeClass('read');
                                    }else{
                                        $('#badgeNotif').addClass('read');
                                        $('#badgeNotif').removeClass('unread');
                                    }
                                    $('#waktu')[0].selectize.setValue(result.waktu);
                                    $('#ulang')[0].selectize.setValue(result.ulang);
                                break;
                                case 'detailNotif':
                                    var html = `<h3 style='color:#007AFF;margin-bottom:20px'>`+result.daftar[0].judul+`</h3>
                                    <div class='detPesan'>
                                        <p style='font-size: 12px;'>`+result.daftar[0].isi+`</p>
                                    </div>`;
                                    $('#detailPesan').html(html);
                                    if(result.unred.length > 0){
                                        $('#badgeNotif').addClass('unread');
                                        $('#badgeNotif').removeClass('read');
                                    }else{
                                        $('#badgeNotif').addClass('read');
                                        $('#badgeNotif').removeClass('unread');
                                    }
                                break;
                            }
                        }
                    }
                });
            }
            
            function initDash(){
                    
                    loadService('MI','GET','$root_ser/dashYakesInves.php?fx=getMI');
                    loadService('Deposito','GET','$root_ser/dashYakesInves.php?fx=getDeposito','".date('Y-m-d')."|1|5050|semua|semua'); 
                    loadService('GetNotif','GET','$root_ser/Notif2.php?fx=getNotif','$kode_lokasi|$nik|'+idUser);
            }
                

            </script>
            
            

        ";
        

		return "";
	}
	
}
?>
