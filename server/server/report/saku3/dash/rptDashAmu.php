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
class server_report_saku3_dash_rptDashAmu extends server_report_basic
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

        $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs2=$dbLib->execute($jumNot);

        $sqlNot="select * from api_notif where kode_lokasi='$kode_lokasi' and nik='$nik' and kode_pp='$kode_pp'";

        $rs3=$dbLib->execute($sqlNot);
        
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        $root_ser =$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/amu";

        
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
        $link=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME'];
		$path = $link."/";	
		
        echo "
        <style>
            @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');

        
            body {
                font-family: 'Roboto', sans-serif !important;
            }
            h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
                font-family: 'Roboto', sans-serif !important;
                font-weight: normal !important;
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
        </style>
		<div class='panel' style='background:#f6f6f6'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>Dashboard<div class='navbar-custom-menu pull-right padding:0px'>
                    <ul class='nav navbar-nav'><li class='dropdown notifications-menu'>
                        <a href='#' class='dropdown-toggle' style='padding:0px 15px 10px 5px' data-toggle='dropdown'>
                        <i class='fa fa-bell-o'></i>
                        <span class='label label-warning' style='font-size:8px;position: absolute;top: 0px;right: 6px;text-align: center;padding: 2px 3px;line-height: .9;'>".$rs2->fields[0]."</span>
                        </a>
                    <ul class='dropdown-menu'>";
                echo"
                    <li class='header'>You have ".$rs2->fields[0]." notifications</li>";
               
                    while ($row = $rs3->FetchNextObject($toupper=false)) {
                    echo"
                        <li>
                            <ul class='menu'>
                            <li>
                                <a href='#'>
                                <i class='fa fa-users text-aqua'></i> $row->pesan
                                </a>
                            </li>
                            </ul>
                        </li>
                        ";
                    }
                
                echo"
                        <li class='footer'><a href='#'>View all</a></li>
                        </ul>    
                    </li>
                    ";
        
                echo"
                    <li><a class='pull-right btn btn-info btn-sm' href='#' id='btn-refresh' style='margin-right:5px;padding:5px'><i class='fa fa-undo'> <span style='font-family:sans-serif'><b>Refresh</b></span></i></a>
                    </li>
                    <li>
                        <a href='#' data-toggle='control-sidebar' id='open-sidebar' class='btn btn-info btn-sm' style='margin-right:0px;padding:2px 5px 0px 5px'><i class='fa fa-filter'></i><span style='font-family:sans-serif'> <b> Filter</b></span></a>
                    </li>
                    </ul>
                </div>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-8' style='padding-left: 0px;padding-right: 0px;'>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashAmuDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|tanah');\">
                        <div class='col-md-4'>
                            <div class='panel'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <center><h4 class='font-weight-light' style='color: #000000;'>Total Tanah</h4></center>
                                        <center><h2 class='font-weight-bold' id='total_tanah'></h2></center>
                                        <center><p style='color: #808080;'>&nbsp;</p></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                        <a href='#' class='small-box-footer' style='color:black;cursor:pointer' onclick=\"window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashAmuDet','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|gedung');\">
                        <div class='col-md-4'>
                            <div class='panel'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <center><h4 class='font-weight-light' style='color: #000000;'>Total Bangunan</h4></center>
                                        <center><h2 class='font-weight-bold' id='total_bangunan'></h2></center>
                                        <center><p style='color: #808080;'>&nbsp;</p></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        </a>
                        <div class='col-md-4'>
                            <div class='panel'>
                                <div class='card'>
                                    <div class='card-body'>
                                        <center><h4 class='font-weight-light' style='color: #000000;'>Recently Add</h4></center>
                                        <center><h2 class='font-weight-bold' id='total_recent'></h2></center>
                                        <center><p style='color: #808080;'>&nbsp;Asset</p></center>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12'>
                            <div class='box' style='box-shadow:none;border:0' id='map_dashboard'>
                                <div class='box-header'>
                                    <div class='nav-tabs-custom'>
                                        <ul class='nav nav-tabs pull-right'>
                                            <li><a href='#tab_gedung' data-toggle='tab'>Gedung</a></li>
                                            <li class='active'><a href='#tab_lahan' data-toggle='tab'>Lahan</a></li>
                                            <li class='pull-left header'>Maps</li>
                                        </ul>
                                    </div>
                                </div>
                                <div class='box-body box-click'>
                                    <div class='tab-content'>
                                        <div class='tab-pane active' id='tab_lahan'>
                                            <div id='map' style='width: 100%; height: 490px;'></div>
                                        </div>
                                        <div class='tab-pane' id='tab_gedung'>
                                            <div id='map2' style='width: 100%; height: 490px;'></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4' style='padding-left: 0px;padding-right: 0px;'>
                        <div class='col-md-12'>
                            <div class='panel'>
                                <div class='card'>
                                    <div class='card-body' style='padding: 10px;'>
                                        <h4 class='font-weight-light' style='color: #000000;margin: 0px;margin-bottom:10px'>Masa Berlaku Habis</h4>
                                        <ul class='nav nav-custom' style='font-size:18px' id='listTanah'>
                                            
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12'>
                            <div class='panel'>
                                <div class='card'>
                                    <div class='card-body' style='padding: 10px;'>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>
                                        <h4 class='font-weight-light' style='color: #000000;margin: 0px;margin-bottom:10px'>Cari Data Tanah</h4>
                                        <div class='row'>
                                            <div class='col-md-10'>
                                                <select class='form-control input-sm' id='id_lahan' style='margin-bottom:5px;'>
                                                <option value='' >Pilih Lahan</option>
                                                </select>
                                            </div>
                                            <div class='col-md-2'>
                                                <span id='cari_maps' style='cursor:pointer'><i class='fa fa-search fa-lg'></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class='col-md-12'>
                            <div class='panel'>
                                <div class='card'>
                                    <div class='card-body' style='padding: 10px;'>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>
                                        <h4 class='font-weight-light' style='color: #000000;margin: 0px;margin-bottom:10px'>Cari Data Gedung</h4>
                                        <div class='row'>
                                            <div class='col-md-10'>
                                                <select class='form-control input-sm' id='id_gedung' style='margin-bottom:5px;'>
                                                <option value='' >Pilih Gedung</option>
                                                </select>
                                            </div>
                                            <div class='col-md-2'>
                                                <span id='cari_maps2' style='cursor:pointer'><i class='fa fa-search fa-lg'></i></span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class='modal fade' id='informasi_lahan'>
                    <div class='modal-dialog modal-md'>
                        <div class='modal-content'>
                        <div class='modal-header' id = 'header_modal_informasi_lahan'>
                            <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                        </div>
                        <div class='modal-body' id = 'header_modal_informasi_lahan'>
                            <!-- Nav tabs -->
                            <ul class='nav nav-tabs nav-justified'>
                                <li class='nav-item'>
                                    <a class='nav-link active' data-toggle='tab' href='#informasi_dasar' role='tab'>Informasi Dasar</a>
                                </li>
                                <li class='nav-item'>
                                    <a class='nav-link' data-toggle='tab' href='#pbb' role='tab'>PBB</a>
                                </li>
                            </ul>
                            <!-- Tab panels -->
                            <div class='tab-content card'>
                                <!--Panel 1-->
                                <div class='tab-pane fade in active' id='informasi_dasar' role='tabpanel'>
                                    <br>
                                    <div class='bs-example'>
                                        <div id='CarouselInformasi' class='carousel slide' data-ride='carousel'>
                                            <!-- Carousel indicators -->
                                            <ol class='carousel-indicators' id = 'carousel_indicators_informasi'>
                                                <li data-target='#CarouselInformasi' data-slide-to='0' class='active'></li>
                                                <li data-target='#CarouselInformasi' data-slide-to='1'></li>
                                                <li data-target='#CarouselInformasi' data-slide-to='2'></li>
                                            </ol>   
                                            <!-- Wrapper for carousel items -->
                                            <div class='carousel-inner' id = 'carousel_inner_informasi'>
                                               
                                            </div>
                                            <!-- Carousel controls -->
                                            <div id = 'carousel_controls_informasi'>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <br>

                                    <table class='table table-bordered table-striped'>
                                        <thead id = 'thead_modal_informasi_lahan'>
                                            
                                        </thead>
                                        <tbody id = 'tbody_modal_informasi_lahan'>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <!--/.Panel 1-->
                                <!--Panel 3-->
                                <div class='tab-pane fade' id='pbb' role='tabpanel'>
                                    <br>
                                    
                                </div>
                                <!--/.Panel 3-->
                            
                            </div>
                        <div class='modal-footer'>
                            
                        </div>
                        </div>
                    </div>
                </div>
                <div class='modal fade' id='informasi_gedung'>
                    <div class='modal-dialog modal-md'>
                        <div class='modal-content'>
                        <div class='modal-header' id = 'header_modal_informasi_gedung'>
                            <button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                        </div>
                        <div class='modal-body' id = 'header_modal_informasi_gedung'>
                            <!-- Nav tabs -->
                            <ul class='nav nav-tabs nav-justified'>
                                <li class='nav-item'>
                                    <a class='nav-link active' data-toggle='tab' href='#informasi_dasar' role='tab'>Informasi Dasar</a>
                                </li>
                                <li class='nav-item'>
                                    <a class='nav-link' data-toggle='tab' href='#pbb' role='tab'>PBB</a>
                                </li>
                            </ul>
                            <!-- Tab panels -->
                            <div class='tab-content card'>
                                <!--Panel 1-->
                                <div class='tab-pane fade in active' id='informasi_dasar' role='tabpanel'>
                                    <br>
                                    <div class='bs-example'>
                                        <div id='CarouselInformasi' class='carousel slide' data-ride='carousel'>
                                            <!-- Carousel indicators -->
                                            <ol class='carousel-indicators' id = 'carousel_indicators_informasi'>
                                                <li data-target='#CarouselInformasi' data-slide-to='0' class='active'></li>
                                                <li data-target='#CarouselInformasi' data-slide-to='1'></li>
                                                <li data-target='#CarouselInformasi' data-slide-to='2'></li>
                                            </ol>   
                                            <!-- Wrapper for carousel items -->
                                            <div class='carousel-inner' id = 'carousel_inner_informasi'>
                                            
                                            </div>
                                            <!-- Carousel controls -->
                                            <div id = 'carousel_controls_informasi'>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <br>

                                    <table class='table table-bordered table-striped'>
                                        <thead id = 'thead_modal_informasi_gedung'>
                                            
                                        </thead>
                                        <tbody id = 'tbody_modal_informasi_gedung'>
                                            
                                        </tbody>
                                    </table>
                                </div>
                                <!--/.Panel 1-->
                                <!--Panel 3-->
                                <div class='tab-pane fade' id='pbb' role='tabpanel'>
                                    <br>
                                    
                                </div>
                                <!--/.Panel 3-->
                            
                            </div>
                        <div class='modal-footer'>
                            
                        </div>
                        </div>
                    </div>
                </div>
                <script>

                function modal_info_lahan(data,data_img){
                    var html = '';
                    console.log(data_img);
                    if(data_img.length > 0){
                        for(var i=0; i< data_img.length; i ++ ){
                            var img = data_img[i].file_dok;
                            if(i == 0){
                                html +=`<div class='item active' style = 'margin: 0 auto;'>
                                <img class='img-responsive center-block' src='https://api.simkug.com/api/aset/storage/`+img+`'>
                                </div>`;
                            }else{
                                html +=`<div class='item' style = 'margin: 0 auto;'>
                                <img class='img-responsive center-block' src='https://api.simkug.com/api/aset/storage/`+img+`'>
                                </div>`;
                            }
                        }
                    }
                    $('#carousel_inner_informasi').html(html);
                    $('#header_modal_informasi_lahan').html(`<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                    <h4 class='modal-title'>`+ data.nama_lahan +`<small> #`+ data.id_lahan +` `+ data.alamat +` </small></h4>`
                    );
                    
                    $('#thead_modal_informasi_lahan').html(
                        '<tr style=\'background-color: red;color:#ffffff;\'>'+
                        '<th>ID AREAL</th>'+
                        '<th>'+ data.id_lahan+'</th>'+
                        '</tr>'
                    );
                    
                    $('#tbody_modal_informasi_lahan').html(
                        '<tr>'+
                        '<td>Koordinat</td>'+
                        '<td>'+ data.coor_y +', '+ data.coor_x +'</td>'+
                        '</tr>'+	
                        '<tr>'+
                        '<td>Alamat</td>'+
                        '<td>'+ data.alamat +'</td>'+
                        '</tr>'+
                        
                        '<tr>'+
                        '<td>Kelurahan</td>'+
                        '<td>'+ data.desa +'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Kecamatan</td>'+
                        '<td>'+ data.kecamatan +'</td>'+
                        '</tr>'+
                        
                        '<tr>'+
                        '<td>Kota</td>'+
                        '<td>'+ data.kota +'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Provinsi</td>'+
                        '<td>'+ data.provinsi+'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Status Kepemilikan</td>'+
                        '<td>'+ data.atas_nama +'</td>'+
                        '</tr>'
                    );
            
                    $('#pbb').html('');
                    if (data.pbb != null){
                        for(i=0; i<data.pbb.length; i++){
                            $('#pbb').append(
                                `<table class='table table-bordered table-striped'>
                                <thead>
                                    <tr style='background-color: red;color:#ffffff;'>
                                        <th>CFA NDP : </th>
                                        <th>`+ data.pbb[i].nop +`</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tahun</td>
                                        <td>`+ data.pbb[i].tahun +`</td>
                                    </tr>
                                    <tr>
                                        <td>Luas Bumi (m2) </td>
                                        <td>`+ sepNum(data.pbb[i].luas_lahan_bumi) +`</td>
                                    </tr>
                                    <tr>
                                        <td>NJOP Bumi (Rp/m2)</td>
                                        <td>`+ sepNum(data.pbb[i].njop_bumi) +`</td>
                                    </tr>
                                    <tr>
                                        <td>Kelas Bumi</td>
                                        <td>`+ data.pbb[i].kelas_bumi +`</td>
                                    </tr>
                                    <tr>
                                        <td>Total NJOP Bumi (Rp) </td>
                                        <td>`+ sepNum(data.pbb[i].total_njop_bumi) +`</td>
                                    </tr>
                                    <tr>
                                        <td>Total NJOP (Rp) </td>
                                        <td>  </td>
                                    </tr>
                                </tbody>
                                </table>`
                            );
                        }
                    }    
                    $('#informasi_lahan').modal('show');
                }

                function modal_info_gedung(data,data_img){
                    var html = '';
                    console.log(data_img);
                    if(data_img.length > 0){
                        for(var i=0; i< data_img.length; i ++ ){
                            var img = data_img[i].file_dok;
                            if(i == 0){
                                html +=`<div class='item active' style = 'margin: 0 auto;'>
                                <img class='img-responsive center-block' src='https://api.simkug.com/api/aset/storage/`+img+`'>
                                </div>`;
                            }else{
                                html +=`<div class='item' style = 'margin: 0 auto;'>
                                <img class='img-responsive center-block' src='https://api.simkug.com/api/aset/storage/`+img+`'>
                                </div>`;
                            }
                        }
                    }
                    $('#carousel_inner_informasi_gedung').html(html);
                    $('#header_modal_informasi_gedung').html(`<button type='button' class='close' data-dismiss='modal' aria-label='Close'><span aria-hidden='true'>&times;</span></button>
                    <h4 class='modal-title'>`+ data.nama_gedung +`<small> #`+ data.id_gedung +` `+ data.alamat +` </small></h4>`
                    );
                    
                    $('#thead_modal_informasi_gedung').html(
                        '<tr style=\'background-color: red;color:#ffffff;\'>'+
                        '<th>ID AREAL</th>'+
                        '<th>'+ data.id_gedung+'</th>'+
                        '</tr>'
                    );
                    
                    $('#tbody_modal_informasi_gedung').html(
                        '<tr>'+
                        '<td>Koordinat</td>'+
                        '<td>'+ data.coor_y +', '+ data.coor_x +'</td>'+
                        '</tr>'+	
                        '<tr>'+
                        '<td>Alamat</td>'+
                        '<td>'+ data.alamat +'</td>'+
                        '</tr>'+
                        
                        '<tr>'+
                        '<td>Kelurahan</td>'+
                        '<td>'+ data.desa +'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Kecamatan</td>'+
                        '<td>'+ data.kecamatan +'</td>'+
                        '</tr>'+
                        
                        '<tr>'+
                        '<td>Kota</td>'+
                        '<td>'+ data.kota +'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Provinsi</td>'+
                        '<td>'+ data.provinsi+'</td>'+
                        '</tr>'+
                        '<tr>'+
                        '<td>Status Kepemilikan</td>'+
                        '<td>'+ data.atas_nama +'</td>'+
                        '</tr>'
                    );
            
                    $('#pbb').html('');
                    if (data.pbb != null){
                        for(i=0; i<data.pbb.length; i++){
                            $('#pbb').append(
                                `<table class='table table-bordered table-striped'>
                                <thead>
                                    <tr style='background-color: red;color:#ffffff;'>
                                        <th>CFA NDP : </th>
                                        <th>`+ data.pbb[i].nop +`</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>Tahun</td>
                                        <td>`+ data.pbb[i].tahun +`</td>
                                    </tr>
                                    <tr>
                                        <td>Luas Bumi (m2) </td>
                                        <td>`+ sepNum(data.pbb[i].luas_gedung_bumi) +`</td>
                                    </tr>
                                    <tr>
                                        <td>NJOP Bumi (Rp/m2)</td>
                                        <td>`+ sepNum(data.pbb[i].njop_bumi) +`</td>
                                    </tr>
                                    <tr>
                                        <td>Kelas Bumi</td>
                                        <td>`+ data.pbb[i].kelas_bumi +`</td>
                                    </tr>
                                    <tr>
                                        <td>Total NJOP Bumi (Rp) </td>
                                        <td>`+ sepNum(data.pbb[i].total_njop_bumi) +`</td>
                                    </tr>
                                    <tr>
                                        <td>Total NJOP (Rp) </td>
                                        <td>  </td>
                                    </tr>
                                </tbody>
                                </table>`
                            );
                        }
                    }    
                    $('#informasi_gedung').modal('show');
                }

                function getLahan(param){
                    $.ajax({
                        url: '$root_ser/dashAmu.php?fx=getLahan',
                        data: {'kode_lokasi':''},
                        type: 'get',
                        dataType: 'json',
                        success: function (result) {
                            if(result.status){
                                if(typeof result.daftar !== 'undefined'){
                                    var select = $('#id_lahan').selectize();
                                    select = select[0];
                                    var control = select.selectize;
                                    for(i=0;i<result.daftar.length;i++){
                                        control.addOption([{text:result.daftar[i].id_lahan + ' - ' + result.daftar[i].nama, value:result.daftar[i].id_lahan}]);
                                    }
                                    
                                }
                            }
                        }                            
                    });
                }

                function getGedung(param){
                    $.ajax({
                        url: '$root_ser/dashAmu.php?fx=getGedung',
                        data: {'kode_lokasi':''},
                        type: 'get',
                        dataType: 'json',
                        success: function (result) {
                            if(result.status){
                                if(typeof result.daftar !== 'undefined'){
                                    var select = $('#id_gedung').selectize();
                                    select = select[0];
                                    var control = select.selectize;
                                    for(i=0;i<result.daftar.length;i++){
                                        control.addOption([{text:result.daftar[i].id_gedung + ' - ' + result.daftar[i].nama, value:result.daftar[i].id_gedung}]);
                                    }
                                    
                                }
                            }
                        }                            
                    });
                }

                function cari_lahan(param){
                    $.ajax({
                        url: '$root_ser/dashAmu.php?fx=getMapsCari',
                        data: {'kode_lokasi':'','id_lahan':param},
                        type: 'get',
                        dataType: 'json',
                        success: function (data) {
                            var mapOptions = {
                            center: new google.maps.LatLng(-2.2459632,116.2409634),
                                zoom: 15,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }; 
                            var infoWindow = new google.maps.InfoWindow();
                            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                           
                            var data2 = data.hasil[0];
                            var data_img = data.image;
                            var latnya = data2.coor_x;
                            var longnya = data2.coor_y;
                            
                            var myLatlng = new google.maps.LatLng(latnya, longnya);
                            var marker = new google.maps.Marker({
                                position: myLatlng,
                                map: map,
                                title: data2.alamat
                            });
            
                            map.setCenter(marker.getPosition());
            
                            (function (marker, data2, data_img) {
                                google.maps.event.addListener(marker, 'click', function (e) {
                                    // infoWindow.setContent('<div id=\'lokasi\'><b>Lokasi</b> :' + data2.alamat + '<br></div>');
                                    modal_info_lahan(data2,data_img);
                                    infoWindow.open(map, marker);
                                });
                            })(marker, data2, data_img);
                            
                            
                        }
                    });
                }

                function cari_gedung(param){
                    $.ajax({
                        url: '$root_ser/dashAmu.php?fx=getMapsCariGedung',
                        data: {'kode_lokasi':'','id_gedung':param},
                        type: 'get',
                        dataType: 'json',
                        success: function (data) {
                            var mapOptions2 = {
                            center: new google.maps.LatLng(-2.2459632,116.2409634),
                                zoom: 15,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }; 
                            var infoWindow2 = new google.maps.InfoWindow();
                            var map2 = new google.maps.Map(document.getElementById('map2'), mapOptions2);
                           
                            var data2 = data.hasil[0];
                            var data_img = data.image;
                            var latnya = data2.coor_x;
                            var longnya = data2.coor_y;
                            
                            var myLatlng2 = new google.maps.LatLng(latnya, longnya);
                            var marker2 = new google.maps.Marker({
                                position: myLatlng2,
                                map: map2,
                                title: data2.alamat
                            });
            
                            map2.setCenter(marker2.getPosition());
            
                            (function (marker2, data2, data_img) {
                                google.maps.event.addListener(marker2, 'click', function (e) {
                                    // infoWindow.setContent('<div id=\'lokasi\'><b>Lokasi</b> :' + data2.alamat + '<br></div>');
                                    modal_info_gedung(data2,data_img);
                                    infoWindow2.open(map2, marker2);
                                });
                            })(marker2, data2, data_img);
                            
                            
                        }
                    });
                }
            
                function init_map_sebaran_Aset() {
                    window.map = new google.maps.Map(document.getElementById('map'), {
                        zoom: 5,
                        center: new google.maps.LatLng(-1.154499, 116.430086),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    var infowindow = new google.maps.InfoWindow();
                }

                function init_map_sebaran_AsetGedung() {
                    window.map2 = new google.maps.Map(document.getElementById('map2'), {
                        zoom: 5,
                        center: new google.maps.LatLng(-1.154499, 116.430086),
                        mapTypeId: google.maps.MapTypeId.ROADMAP
                    });
                    var infowindow2 = new google.maps.InfoWindow();
                }
            
                function tampil(){
                    $.ajax({
                        url: '$root_ser/dashAmu.php?fx=getMaps',
                        data: {'kode_lokasi':''},
                        type: 'get',
                        dataType: 'json',
                        success: function (data) {
                            
                            var mapOptions = {
                            center: new google.maps.LatLng(-2.2459632,116.2409634),
                                zoom: 5,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }; 
                            var infoWindow = new google.maps.InfoWindow();
                            var map = new google.maps.Map(document.getElementById('map'), mapOptions);
                            for (i = 0; i < data.hasil.length; i++) {
                                var data2 = data.hasil[i];
                                var data_img = data.image[data2.id_lahan];
                                var latnya = data2.coor_x;
                                var longnya = data2.coor_y;
                                
                                var myLatlng = new google.maps.LatLng(latnya, longnya);
                                var marker = new google.maps.Marker({
                                    position: myLatlng,
                                    map: map,
                                    title: data2.alamat
                                });
                                (function (marker, data2, data_img) {
                                    google.maps.event.addListener(marker, 'click', function (e) {
                                        // infoWindow.setContent('<b>Lokasi</b> :' + data2.alamat + '<br>');
                                        modal_info_lahan(data2,data_img);
                                        infoWindow.open(map, marker);
                                    });
                                })(marker, data2, data_img);
                            }
                        }
                    });
                }

                function tampilGedung(){
                    $.ajax({
                        url: '$root_ser/dashAmu.php?fx=getMapsGedung',
                        data: {'kode_lokasi':''},
                        type: 'get',
                        dataType: 'json',
                        success: function (data) {
                            
                            var mapOptions2 = {
                            center: new google.maps.LatLng(-2.2459632,116.2409634),
                                zoom: 5,
                                mapTypeId: google.maps.MapTypeId.ROADMAP
                            }; 
                            var infoWindow2 = new google.maps.InfoWindow();
                            var map2 = new google.maps.Map(document.getElementById('map2'), mapOptions2);
                            for (i = 0; i < data.hasil.length; i++) {
                                var data2 = data.hasil[i];
                                var data_img = data.image[data2.id_lahan];
                                var latnya = data2.coor_x;
                                var longnya = data2.coor_y;
                                
                                var myLatlng2 = new google.maps.LatLng(latnya, longnya);
                                var marker2 = new google.maps.Marker({
                                    position: myLatlng2,
                                    map: map2,
                                    title: data2.alamat
                                });
                                (function (marker2, data2, data_img) {
                                    google.maps.event.addListener(marker2, 'click', function (e) {
                                        // infoWindow.setContent('<b>Lokasi</b> :' + data2.alamat + '<br>');
                                        modal_info_gedung(data2,data_img);
                                        infoWindow2.open(map2, marker2);
                                    });
                                })(marker2, data2, data_img);
                            }
                        }
                    });
                }
            
                $('.panel').on('click', '#btn-refresh', function(){
                    location.reload();
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
                    return sepNumPas(nil) + ' JT';
                }
    
                function toMilyar(x) {
                    var nil = x / 1000000000;
                    return sepNumPas(nil) + ' M';
                }
    
                function loadService(index,method,url,param=null){
                    $.ajax({
                        type: method,
                        url: url,
                        dataType: 'json',
                        async: false,
                        data: {'periode':'$periode','param':param},
                        success:function(result){    
                            if(result.status){
                                switch(index){
                                    case 'dataBox':
                                        $('#total_tanah').text(result.tanah);
                                        $('#total_bangunan').text(result.bangunan);
                                        $('#total_recent').text(result.recent);
                                    break;
                                    case 'listTanah':
                                        var html='';
                                        for(var i=0;i<result.daftar.length;i++){
                                            var line = result.daftar[i];

                                            html+=`<li>`+line.nama+`<br><span style='color:grey;font-size:12px'> `+line.jatuh_tempo+`| No PBB: `+line.no_pbb+`</span></li>`;
                                        }
                                        $('#listTanah').html(html);
                                      
                                    break;
                                }
                            }
                        }
                    });
                }
                function initDash(){
                    loadService('dataBox','GET','$root_ser/dashAmu.php?fx=getDataBox');
                    loadService('listTanah','GET','$root_ser/dashAmu.php?fx=getListTanah');
                    getLahan();
                    getGedung();
                    tampil();
                    tampilGedung();
                    
                }
    
                initDash();

                $('#cari_maps').click(function(){
                    var id = $('#id_lahan').val();
                    if(id == ''){
                        tampil();
                    }else{
                        cari_lahan(id);
                    }
                    // $('#lahan').tab('show')
                    console.log('tab_lahan');
                    $('.nav-tabs a[href=\"#tab_lahan\"]').tab('show');
                    
                });

                $('#cari_maps2').click(function(){
                    var id = $('#id_gedung').val();
                    if(id == ''){
                        tampilGedung();
                    }else{
                        cari_gedung(id);
                    }
                    // $('#gedung').tab('show')
                    
                    console.log('tab_gedung');
                    $('.nav-tabs a[href=\"#tab_gedung\"]').tab('show');
                    
                });
            
                </script>
                <script async defer src='https://maps.googleapis.com/maps/api/js?key=AIzaSyCwdyiC2sZ3B1O2nMdhUy6Z0ljoK3gbA_U&callback=init_map_sebaran_Aset&libraries=places'>
                </script>";
    
		return "";
	}
	
}
?>
