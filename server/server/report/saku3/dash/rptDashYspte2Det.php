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
class server_report_saku3_dash_rptDashYspte2Det extends server_report_basic
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
        $nik=$tmp[2];
        $kode_pp=$tmp[3];
        $kode_fs=$tmp[4];
        $kunci=$tmp[5];
 
        $path = "http://".$_SERVER["SERVER_NAME"]."/";	
        $icon_back = $path."image/icon_back.png";
        $icon_close = $path."image/icon_close.png";
        $icon_refresh = $path."image/icon_refresh.png";

        $root_ser = $root_ser=$_SERVER['REQUEST_SCHEME']."s://".$_SERVER['SERVER_NAME']."/web/server/ypt";

		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
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
        <div class='panel'>
				<div class='panel-body'>
                    <div class='panel-heading'>
                        <div class='pull-right navigasi' style='margin-right: -1rem; margin-top: ; padding-bottom: 1rem;'>
                            <span id='back_btn' style='cursor:pointer'><img src='$icon_back' width='25px'></span>
                            <span id='refresh_btn' style='cursor:pointer'><img src='$icon_refresh' width='25px'></span>
                            <span id='close_btn'style='cursor:pointer'><img src='$icon_close' width='25px'></span>
                        </div>
                    </div>";
        switch($kunci){
            case "bk"  :
            echo"
                    <div class='col-md-12'>";
                        echo"
                        <div class='box-header with-border'>
                            <i class='fa fa-book'></i>
                            <h3 class='box-title'>Buku Besar</h3>
                        </div>
                        <div class='box-body'>
                            <div class='row invoice-info' style='background:#f6f6f6;margin-left:0px;margin-right:0px'>
                                <div class='col-sm-2 invoice-col'>
                                    <address>
                                        <strong>
                                            Periode
                                        </strong>
                                        <br>
                                        <span id='per'></span>
                                    </address>
                                </div>
                                <div class='col-sm-3 invoice-col'>
                                    <address style='margin-bottom:0px'>
                                        <strong>
                                        Tgl Awal
                                        </strong>
                                        <br>
                                        <div class='input-group date col-sm-9' style=''>
                                            <div class='input-group-addon'>
                                            <i class='fa fa-calendar'></i>
                                            </div>
                                            <input name='tgl_awal' class='form-control'' id='tgl-awal'>
                                        </div>
                                    </address>
                                </div>
                                <div class='col-sm-3 invoice-col'>
                                    <address style='margin-bottom:0px'>
                                        <strong>
                                            Tgl Akhir
                                        </strong>
                                        <br>
                                        <div class='input-group date col-sm-9' style=''>
                                            <div class='input-group-addon'>
                                                <i class='fa fa-calendar'></i>
                                            </div>
                                            <input name='tgl_akhir' class='form-control' id='tgl-akhir' value=''>
                                        </div>
                                    </address>
                                </div>
                                <div class='col-sm-2 invoice-col'>
                                    <address>
                                        <strong>
                                            Kode Akun
                                        </strong>
                                        <br>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>
                                        <select class='form-control input-sm selectize' id='kd_akun' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b'>
                                        <option value=''>Pilih Akun</option> 
                                        </select>
                                    </address>
                                </div>
                                <div class='col-sm-2 invoice-col'>
                                    <strong>
                                        &nbsp;
                                    </strong>
                                    <address>
                                        <a class='btn btn-primary' style='cursor:pointer' id='bTampil'>Tampil</a>
                                    </address>
                                </div> 
                            </div>
                            <br>
                            <div id='isiBukuBesar'> 
                            </div>";    
                    echo"</div>
                    </div>";
            break;
            case "piu" :
                    echo"
                    <div class='col-md-12'>
                        <div class='box-header with-border'>
                            <i class='fa fa-book'></i>
                            <h3 class='box-title'>Saldo Piutang per Siswa</h3>
                        </div>
                        <div class='box-body'>
                            <div class='row invoice-info' style='background:#f6f6f6;margin-left:0px;margin-right:0px'>
                            <div class='col-sm-1 invoice-col'>
                                <address>
                                    <strong>
                                    Periode
                                    </strong>
                                    <br>
                                    <span id='per'></span>
                                </address>
                            </div>
                            <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Jurusan
                                    </strong>
                                    <br>
                                    <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>
                                    <select class='form-control input-sm ' id='kd_jur' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                    <option value=''>Pilih Jur</option>
                                    </select>
                                </address>
                            </div>
                            <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Kelas
                                    </strong>
                                    <br>
                                    <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>
                                    <select class='form-control input-sm ' id='kd_kls' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                    <option value=''>Pilih Kelas</option>
                                    </select>
                                    </address>
                            </div>
                            <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Angkatan
                                    </strong>
                                    <br>
                                    <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>
                                    <select class='form-control input-sm ' id='kd_akt' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                    <option value=''>Pilih Angkatan</option></select>
                                    </address>
                            </div>
                            <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Siswa
                                    </strong>
                                    <br>
                                    <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>
                                    <select class='form-control input-sm ' id='nis' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                    <option value=''>Pilih Siswa</option></select>
                                    </address>
                            </div>
                            <div class='col-sm-2 invoice-col'>
                                <address>
                                    <strong>
                                    Status
                                    </strong>
                                    <br>
                                    <style>
                                    .selectize-input{
                                        border:none;
                                        border-bottom:1px solid #8080806b;
                                    }
                                    </style>
                                    <select class='form-control input-sm' id='flag' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                    <option value=''>Pilih Status</option></select>
                                    </address>
                            </div>
                            <div class='col-sm-1 invoice-col'>
                                <strong>
                                &nbsp;
                                </strong>
                                <address>
                                <a class='btn btn-primary' style='cursor:pointer' id='bTampil'>Tampil</a>
                                </address>
                            </div>
                        </div>
                        <br> 
                        <div class='row'>
                            <div class='col-xs-12 table-responsive'>
                                <table class='table table-striped' id='table-SaldoPiu'>
                                    <thead>
                                    <tr style='background:#247ed5;color:white'>
                                        <td width='20' rowspan='2' style='vertical-align:middle;text-align:center' >No</td>
                                        <td width='50' rowspan='2' style='vertical-align:middle;text-align:center'>NIS </td>
                                        <td width='200' rowspan='2' style='vertical-align:middle;text-align:center' >Nama</td>
                                        <td width='60' rowspan='2' style='vertical-align:middle;text-align:center'>Kode PP</td>
                                        <td width='60' rowspan='2' style='vertical-align:middle;text-align:center'>Kelas</td>
                                        <td width='60' rowspan='2' style='vertical-align:middle;text-align:center'>Angkatan</td>
                                        <td width='60' rowspan='2' style='vertical-align:middle;text-align:center'>Jurusan</td>
                                        <td colspan='4' style='vertical-align:middle;text-align:center'>Saldo Akhir </td>
                                    </tr>
                                    <tr style='background:#247ed5;color:white'>
                                        <td width='80' align='center' >DPP</td>
                                        <td width='80' align='center' >SPP</td>
                                        <td width='80' align='center' >Lainnya</td>
                                        <td width='90' align='center' >Total</td>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                        <script>

                        var select_siswa = $('#nis').selectize();
                        var select_akt = $('#kd_akt').selectize();
                        var select_kelas = $('#kd_kls').selectize({
                            onChange: function(value) { 
                                if(select_kelas[0].selectize.getValue()!='undefined'){
                                    select_siswa[0].selectize.clearOptions();
                                } 
                                var kode_jur = $('#kd_jur')[0].selectize.getValue();
                                $.ajax({
                                    type: 'POST',
                                    url: 'dashSiswa.php?fx=getSiswa',
                                    dataType: 'json',
                                    data: {'kode_lokasi':'$kode_lokasi', 'kode_pp':'$kode_pp','kode_kelas':value,'kode_jur':kode_jur},
                                    success:function(result){    
                                        if(result.status){
                                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                                for(i=0;i<result.daftar.length;i++){
                                                    select_siswa[0].selectize.addOption([{text:result.daftar[i].nis, value:result.daftar[i].nis}]);  
                                                }
                                            }
                                        }
                                    }
                                });
                                
                            }
                        });  
                        var select_jur = $('#kd_jur').selectize({
                            onChange: function(value) { 
                                if(select_jur[0].selectize.getValue()!='undefined'){
                                    select_kelas[0].selectize.clearOptions();
                                    select_siswa[0].selectize.clearOptions();
                                } 
                                
                                $.ajax({
                                    type: 'POST',
                                    url: 'dashSiswa.php?fx=getKelasSiswa',
                                    dataType: 'json',
                                    data: {'kode_lokasi':'$kode_lokasi', 'kode_pp':'$kode_pp','kode_jur':value},
                                    success:function(result){    
                                        if(result.status){
                                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                                for(i=0;i<result.daftar.length;i++){
                                                    select_kelas[0].selectize.addOption([{text:result.daftar[i].kode_kelas, value:result.daftar[i].kode_kelas}]);  
                                                }
                                            }
                                            if(typeof result.daftar2 !== 'undefined' && result.daftar2.length>0){
                                                for(i=0;i<result.daftar2.length;i++){
                                                    select_siswa[0].selectize.addOption([{text:result.daftar2[i].nis, value:result.daftar2[i].nis}]);  
                                                }
                                            }
                                        }
                                    }
                                });
                                
                            }
                        });  

                        $('#bTampil').click(function(){
                            var jur = $('#kd_jur')[0].selectize.getValue();
                            var kls = $('#kd_kls')[0].selectize.getValue();
                            var akt = $('#kd_akt')[0].selectize.getValue();
                            var nis = $('#nis')[0].selectize.getValue();
                            var flag = $('#flag')[0].selectize.getValue();

                            loadService('saldoPiu','GET','$root_ser/dashSekolah.php?fx=getDftSaldoPiu',jur+'|'+kls+'|'+akt+'|'+nis+'|'+flag);
                        });
                        </script>";
            break;
            case "pdd" :
            echo"
                    <div class='col-md-12'>
                        <div class='box-header with-border'>
                            <i class='fa fa-book'></i>
                            <h3 class='box-title'>Saldo PDD per Siswa</h3>
                        </div>
                        <div class='box-body'>
                            <div class='row invoice-info' style='background:#f6f6f6;margin-left:0px;margin-right:0px'>
                                <div class='col-sm-1 invoice-col'>
                                    <address>
                                        <strong>
                                        Periode
                                        </strong>
                                        <br>
                                        <span id='per'></span>
                                    </address>
                                </div>
                                <div class='col-sm-2 invoice-col'>
                                    <address>
                                        <strong>
                                        Jurusan
                                        </strong>
                                        <br>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>";

                                        echo"
                                        <select class='form-control input-sm ' id='kd_jur' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                        <option value=''>Pilih Jur</option> 
                                        </select>
                                        </address>
                                </div>
                                <div class='col-sm-2 invoice-col'>
                                    <address>
                                        <strong>
                                        Kelas
                                        </strong>
                                        <br>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>
                                        <select class='form-control input-sm ' id='kd_kls' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                        <option value=''>Pilih Kelas</option>
                                        </select>
                                    </address>
                                </div>
                                <div class='col-sm-2 invoice-col'>
                                    <address>
                                        <strong>
                                        Angkatan
                                        </strong>
                                        <br>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>
                                        <select class='form-control input-sm ' id='kd_akt' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                        <option value=''>Pilih Angkatan</option>
                                        </select>
                                    </address>
                                </div>
                                <div class='col-sm-2 invoice-col'>
                                    <address>
                                        <strong>
                                        Siswa
                                        </strong>
                                        <br>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>
                                        <select class='form-control input-sm ' id='nis' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                        <option value=''>Pilih Siswa</option>
                                        </select>
                                    </address>
                                </div>
                                <div class='col-sm-2 invoice-col'>
                                    <address>
                                        <strong>
                                        Status
                                        </strong>
                                        <br>
                                        <style>
                                        .selectize-input{
                                            border:none;
                                            border-bottom:1px solid #8080806b;
                                        }
                                        </style>
                                        <select class='form-control input-sm selectize' id='flag' style='margin-bottom:5px;border:none;border-bottom:1px solid #8080806b' required>
                                        <option value=''>Pilih Status</option>
                                        </select>
                                    </address>
                                </div>
                                <div class='col-sm-1 invoice-col'>
                                    <strong>
                                    &nbsp;
                                    </strong>
                                    <address>
                                    <a class='btn btn-primary' style='cursor:pointer' id='bTampil'>Tampil</a>
                                    </address>
                                </div>
                            </div>
                            <br> ";
                            echo"
                            <div class='row'>
                                <div class='col-xs-12 table-responsive'>
                                    <table class='table table-bordered' id='table-SaldoPDD'>
                                    <thead>
                                        <tr align='center' style='background:#247ed5;color:white'>
                                            <td width='20'  class='header_laporan'>No</td>
                                            <td width='50'  class='header_laporan'>NIS </td>
                                            <td width='200'  class='header_laporan'>Nama</td>
                                            <td width='60'  class='header_laporan'>Kode PP</td>
                                            <td width='60'  class='header_laporan'>Kelas</td>
                                            <td width='60'  class='header_laporan'>Angkatan</td>
                                            <td width='60'  class='header_laporan'>Jurusan</td>
                                            <td width='90' class='header_laporan'>Saldo Awal </td>
                                            <td width='90' class='header_laporan'>Debet</td>
                                            <td  width='90' class='header_laporan'>Kredit</td>
                                            <td  width='90' class='header_laporan'>Saldo Akhir </td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                    </tbody>
                                    </table>
                                </div>
                            </div>";
                            echo"
                        <script>

                        var select_siswa = $('#nis').selectize();
                        var select_akt = $('#kd_akt').selectize();
                        var select_kelas = $('#kd_kls').selectize({
                            onChange: function(value) { 
                                if(select_kelas[0].selectize.getValue()!='undefined'){
                                    select_siswa[0].selectize.clearOptions();
                                } 
                                var kode_jur = $('#kd_jur')[0].selectize.getValue();
                                $.ajax({
                                    type: 'POST',
                                    url: 'dashSiswa.php?fx=getSiswa',
                                    dataType: 'json',
                                    data: {'kode_lokasi':'$kode_lokasi', 'kode_pp':'$kode_pp','kode_kelas':value,'kode_jur':kode_jur},
                                    success:function(result){    
                                        if(result.status){
                                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                                for(i=0;i<result.daftar.length;i++){
                                                    select_siswa[0].selectize.addOption([{text:result.daftar[i].nis, value:result.daftar[i].nis}]);  
                                                }
                                            }
                                        }
                                    }
                                });
                                
                            }
                        });  
                        var select_jur = $('#kd_jur').selectize({
                            onChange: function(value) { 
                                if(select_jur[0].selectize.getValue()!='undefined'){
                                    select_kelas[0].selectize.clearOptions();
                                    select_siswa[0].selectize.clearOptions();
                                } 
                                
                                $.ajax({
                                    type: 'POST',
                                    url: 'dashSiswa.php?fx=getKelasSiswa',
                                    dataType: 'json',
                                    data: {'kode_lokasi':'$kode_lokasi', 'kode_pp':'$kode_pp','kode_jur':value},
                                    success:function(result){    
                                        if(result.status){
                                            if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                                                for(i=0;i<result.daftar.length;i++){
                                                    select_kelas[0].selectize.addOption([{text:result.daftar[i].kode_kelas, value:result.daftar[i].kode_kelas}]);  
                                                }
                                            }
                                            if(typeof result.daftar2 !== 'undefined' && result.daftar2.length>0){
                                                for(i=0;i<result.daftar2.length;i++){
                                                    select_siswa[0].selectize.addOption([{text:result.daftar2[i].nis, value:result.daftar2[i].nis}]);  
                                                }
                                            }
                                        }
                                    }
                                });
                                
                            }
                        });  

                        $('#bTampil').click(function(){
                            var jur = $('#kd_jur')[0].selectize.getValue();
                            var kls = $('#kd_kls')[0].selectize.getValue();
                            var akt = $('#kd_akt')[0].selectize.getValue();
                            var nis = $('#nis')[0].selectize.getValue();
                            var flag = $('#flag')[0].selectize.getValue();

                        });
                        </script>";
            break;
            case "agg" :
            
            echo "<div class='row' >";
                echo"<div class='col-md-4'><h4>Pendapatan</h4></div>";
                echo"<div class='col-md-4'><h4>Beban</h4></div>";
                echo"<div class='col-md-4'><h4>SHU</h4></div>";
                echo"
                    <div class ='col-md-4'> 
                        <div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 150px;'>
                            <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                                <span>
                                    <p style='text-align:left'>Budget</p>
                                    <h3 style='text-align:right;font-size:25px;' id='budgetPend' style=''></h3>
                                </span>
                                <span>
                                    <p style='text-align:left'>Actual</p>
                                    <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='actPend' style=''></h3>
                                </span>
                            </div>
                            <div class='inner col-xs-4'>
                                <center style='margin: 30% auto;'>
                                    <h3 id='persenPend' style='font-size:30px'></h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                                </center>
                            </div>
                        </div>
                    </div>";
                echo"<div class='col-md-4'> ";
                    echo"<div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 150px;'>
                            <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                                <span>
                                    <p style='text-align:left'>Budget</p>
                                    <h3 style='text-align:right;font-size:25px;' id='budgetBeb' style=''></h3>
                                </span>
                            <span>
                                    <p style='text-align:left'>Actual</p>
                                    <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='actBeb' style=''></h3>
                                </span>
                            </div>
                            <div class='inner col-xs-4'>
                                <center style='margin: 30% auto;'>
                                    <h3 id='persenBeb' style='font-size:30px'></h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                                </center>
                            </div>
                        </div>
                    </div>";
                echo"<div class='col-md-4'>";
                    echo "<div class='small-box bg-red' style='border:1px solid #e8e8e8;color:black !important;background-color:white !important;border-radius:10px;min-height: 150px;'>
                            <div class='inner col-xs-8' style='border-right:1px solid #e8e8e8'>
                                <span>
                                    <p style='text-align:left'>Budget</p>
                                    <h3 style='text-align:right;font-size:25px;' id='budgetSHU' style=''></h3>
                                </span>
                                <span>
                                    <p style='text-align:left'>Actual</p>
                                    <h3 style='text-align:right;font-size:25px;margin-bottom:0px' id='actSHU' style=''></h3>
                                </span>
                            </div>
                            <div class='inner col-xs-4'>
                                <center style='margin: 30% auto;'>
                                    <h3 id='persenSHU' style='font-size:30px'>%</h3>
                                    <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>This Month</p>
                                </center>
                            </div>
                        </div>
                    </div>";
                    echo "
                    <div class='col-md-4'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-body box-click' id='box-cash' style='padding:0px'>
                                <div id='dash_chart_pend'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-body box-click' id='box-cash' style='padding:0px'>
                                <div id='dash_chart_beb'></div>
                            </div>
                        </div>
                    </div>
                    <div class='col-md-4'>
                        <div class='box' style='box-shadow:none;border:0'>
                            <div class='box-body box-click' id='box-cash' style='padding:0px'>
                                <div id='dash_chart_shu'></div>
                            </div>
                        </div>
                    </div>";
                    echo"
                </div>";

                
            break;

        }         

        echo"   </div>
            </div>";
        
       
        echo"<script>
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

        function getAkun(){
            $.ajax({
                type: 'GET',
                url: '$root_ser/dashSekolah.php?fx=getAkun',
                dataType: 'json',
                data: {'periode':'$periode'},
                success:function(result){    
                    if(result.status){
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            for(i=0;i<result.daftar.length;i++){
                                $('#kd_akun')[0].selectize.addOption([{text:result.daftar[i].kode_akun + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akun}]);  
                            }
                        }
                    }
                }
            });
        }

        function getJur(){
            $.ajax({
                type: 'GET',
                url: '$root_ser/dashSekolah.php?fx=getJur',
                dataType: 'json',
                data: {'periode':'$periode'},
                success:function(result){    
                    if(result.status){
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            for(i=0;i<result.daftar.length;i++){
                                $('#kd_jur')[0].selectize.addOption([{text:result.daftar[i].kode_jur + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_jur}]);  
                            }
                        }
                    }
                }
            });
        }

        function getKelas(){
            $.ajax({
                type: 'GET',
                url: '$root_ser/dashSekolah.php?fx=getKelas',
                dataType: 'json',
                data: {'periode':'$periode'},
                success:function(result){    
                    if(result.status){
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            for(i=0;i<result.daftar.length;i++){
                                $('#kd_kls')[0].selectize.addOption([{text:result.daftar[i].kode_kelas + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_kelas}]);  
                            }
                        }
                    }
                }
            });
        }

        function getAngkatan(){
            $.ajax({
                type: 'GET',
                url: '$root_ser/dashSekolah.php?fx=getAngkatan',
                dataType: 'json',
                data: {'periode':'$periode'},
                success:function(result){    
                    if(result.status){
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            for(i=0;i<result.daftar.length;i++){
                                $('#kd_akt')[0].selectize.addOption([{text:result.daftar[i].kode_akt + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akt}]);  
                            }
                        }
                    }
                }
            });
        }

        function getSiswa(){
            $.ajax({
                type: 'GET',
                url: '$root_ser/dashSekolah.php?fx=getSiswa',
                dataType: 'json',
                data: {'periode':'$periode'},
                success:function(result){    
                    if(result.status){
                        if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                            for(i=0;i<result.daftar.length;i++){
                                $('#nis')[0].selectize.addOption([{text:result.daftar[i].nis + ' - ' + result.daftar[i].nama, value:result.daftar[i].nis}]);  
                            }
                        }
                    }
                }
            });
        }

        function getSts(){
            var flag = $('#flag').selectize();
            var sts = ['1. AKTIF','2. LULUS','3. MENUNGGAK','4. DROP OUT','5. PINDAH','6. UNDUR DIRI'];
            for(var i=0;i<sts.length;i++){
                flag[0].selectize.addOption([{text:sts[i], value:sts[i]}]);
            }
                        
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
                            case 'getBukuBesar' :
                                var html='';
                                for(var i=0;i<result.daftar.length;i++){
                                    var line=result.daftar[i];
                                    html += `<div class='row'>
                                        <div class='col-xs-12 table-responsive'>
                                            <table class='table table-striped' id='table-BBDet'>
                                                <thead>
                                                    <tr style='background:#247ed5;color:white'>
                                                    <th width='100' height='23' >No Bukti</th>
                                                    <th width='80' height='23' >No Dokumen</th>
                                                    <th width='60' >Tanggal</th>
                                                    <th width='250' >Keterangan</th>
                                                    <th width='60' >Kode PP</th>
                                                    <th width='90' >Debet</th>
                                                    <th width='90' >Kredit</th>
                                                    <th width='90' >Balance</th>
                                                    </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td colspan='6'>Kode Akun : `+line.kode_akun+` | `+line.nama+`</td>
                                                    <td height='23' class='header_laporan' align='right'><b>Saldo Awal<b> </td>
                                                    <td class='header_laporan' align='right'>`+sepNumPas(line.so_awal)+`</td>
                                                </tr>`;
                                                var detHtml ='';
                                                var saldo=line.so_awal;
                                                var debet=0;
                                                var kredit=0;
                                                for(var j=0;j<result.daftar2.length;j++){
                                                    var line2 = result.daftar2[j];
                                                    if(line2.kode_akun == line.kode_akun){

                                                        saldo = parseInt(saldo) + parseInt(line2.debet) - parseInt(line2.kredit);	
                                                        debet=debet + parseInt(line2.debet);
                                                        kredit=kredit + parseInt(line2.kredit);	
                                                        detHtml +=`<tr><td valign='top' ><a class='detJurnal' style='cursor:pointer' data-no_bukti='`+line2.no_bukti+`'>`+line2.no_bukti+`</a></td>
                                                        <td valign='top' >`+line2.no_dokumen+`</td>
                                                        <td height='23' valign='top' >`+line2.tgl+`</td>
                                                        <td valign='top' >`+line2.keterangan+`</td>
                                                        <td valign='top'  >`+line2.kode_pp+`</td>
                                                        <td valign='top'  align='right'>`+sepNumPas(line2.debet)+`</td>
                                                        <td valign='top'  align='right'>`+sepNumPas(line2.kredit)+`</td>
                                                        <td valign='top'  align='right'>`+sepNumPas(saldo)+`</td>
                                                        </tr>`;
                                                    }
                                                }
                                                detHtml +=`
                                                <tr>
                                                    <td height='23' colspan='5' valign='top'  align='right'><b>Total<b>&nbsp;</td>
                                                    <td valign='top'  align='right'><b>`+sepNumPas(debet)+`</b></td>
                                                    <td valign='top'  align='right'><b>`+sepNumPas(kredit)+`</b></td>
                                                    <td valign='top'  align='right'><b>`+sepNumPas(saldo)+`</b></td>
                                                </tr>`;
                                                
                                            html+=detHtml+`
                                                </tbody>
                                            </table>
                                        </div>
                                    </div>`;
                                }
                                $('#isiBukuBesar').html(html);
                            break;
                            case 'saldoPiu':
                                var html='';
                                var sak_n1=0; 
                                var sak_n2=0;
                                var sak_n3=0;
                                var sak_total=0; 
                                var no=1;
                                $('#table-SaldoPiu tbody').html('');
                                for(var i=0;i<result.daftar.length;i++){
                                    
                                    var line = result.daftar[i];
                                    sak_n1+=parseInt(line.sak_n1); 
                                    sak_n2+=parseInt(line.sak_n2); 
                                    sak_n3+=parseInt(line.sak_n3); 
                                    sak_total+=parseInt(line.sak_total);
                                    html +=`<tr>
                                        <td class='isi_laporan' align='center'>`+no+`</td>
                                        <td class='isi_laporan'>
                                        <a style='color:blue;cursor:pointer' class ='detSaldoPiu' data-nis ='`+line.nis+`'>`+line.nis+`</a>
                                        </td>
                                        <td class='isi_laporan'>`+line.nama+`</td>
                                        <td class='isi_laporan'>`+line.kode_pp+`</td>
                                        <td class='isi_laporan'>`+line.kode_kelas+`</td>
                                        <td class='isi_laporan'>`+line.kode_akt+`</td>
                                        <td class='isi_laporan'>`+line.kode_jur+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.sak_n1)+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.sak_n2)+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.sak_n3)+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.sak_total)+`</td>
                                    </tr>`; 
                                    no++;
                                }
                                html +=`<tr>
                                    <td class='isi_laporan' align='center' colspan='7'>Total</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(sak_n1)+`</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(sak_n2)+`</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(sak_n3)+`</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(sak_total)+`</td>
                                </tr>`;	 
                                $('#table-SaldoPiu tbody').append(html);
                            break;
                            case 'saldoPDD':
                                var html='';
                                var so_awal=0; 
                                var debet=0;
                                var kredit=0;
                                var so_akhir=0; 
                                var no=1;
                                $('#table-SaldoPDD tbody').html('');
                                for(var i=0;i<result.daftar.length;i++){
                                    
                                    var line = result.daftar[i];
                                    so_awal+=parseInt(line.so_awal); 
                                    debet+=parseInt(line.debet); 
                                    kredit+=parseInt(line.kredit); 
                                    so_akhir+=parseInt(line.so_akhir);
                                    html +=`<tr>
                                        <td class='isi_laporan' align='center'>`+no+`</td>
                                        <td class='isi_laporan'>
                                        <a style='color:blue;cursor:pointer' class ='detSaldoPDD' data-nis ='`+line.nis+`'>`+line.nis+`</a>
                                        </td>
                                        <td class='isi_laporan'>`+line.nama+`</td>
                                        <td class='isi_laporan'>`+line.kode_pp+`</td>
                                        <td class='isi_laporan'>`+line.kode_kelas+`</td>
                                        <td class='isi_laporan'>`+line.kode_akt+`</td>
                                        <td class='isi_laporan'>`+line.kode_jur+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.so_awal)+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.debet)+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.kredit)+`</td>
                                        <td class='isi_laporan' align='right'>`+sepNumPas(line.so_akhir)+`</td>
                                    </tr>`; 
                                    no++;
                                }
                                html +=`<tr>
                                    <td class='isi_laporan' align='center' colspan='7'>Total</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(so_awal)+`</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(debet)+`</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(kredit)+`</td>
                                    <td class='isi_laporan' align='right'>`+sepNumPas(so_akhir)+`</td>
                                </tr>`;	 
                                $('#table-SaldoPDD tbody').append(html);
                            break;
                            case 'budgetAct':
                                $('#budgetPend').text(sepNumPas(result.data.gar));
                                $('#actPend').text(sepNumPas(result.data.nilai));
                                $('#persenPend').text(sepNum(result.data.n1)+'%');

                                $('#budgetBeb').text(sepNumPas(result.data2.gar));
                                $('#actBeb').text(sepNumPas(result.data2.nilai));
                                $('#persenBeb').text(sepNum(result.data2.n1)+'%');

                                $('#budgetSHU').text(sepNumPas(result.data3.gar));
                                $('#actSHU').text(sepNumPas(result.data3.nilai));
                                $('#persenSHU').text(sepNum(result.data3.n1)+'%');
                            break;
                            case 'agg':
                            Highcharts.setOptions({
                                lang: {
                                    decimalPoint: ',',
                                    thousandsSep: '.'
                                }
                            });
                                Highcharts.chart('dash_chart_pend', {
                                title: {
                                    text: ''
                                },
                                credits: {
                                    enabled: false
                                },
                                xAxis: {
                                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                                },
                                yAxis: [{ // Primary yAxis
                                    labels: {
                                        format: '{value} jt',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    },
                                    title: {
                                        text: 'Nilai',
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
                                series: [{
                                    type: 'column',
                                    name: 'Budget',
                                    data: result.Pdpt[0],
                                    color:'#0e9aa7',
                                    tooltip: {
                                        valueSuffix: '  jt'
                                    }
                                }, {
                                    type: 'column',
                                    name: 'Actual',
                                    color:'#ff6f69',
                                    data: result.Pdpt[1],
                                    tooltip: {
                                        valueSuffix: ' jt'
                                    }
                                }]
                            });
            
            
                            Highcharts.chart('dash_chart_beb', {
                                title: {
                                    text: ''
                                },
                                credits: {
                                    enabled: false
                                },
                                xAxis: {
                                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                                },
                                yAxis: [{ // Primary yAxis
                                    labels: {
                                        format: '{value} jt',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    },
                                    title: {
                                        text: 'Nilai',
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
                                series: [{
                                    type: 'column',
                                    name: 'Budget',
                                    data: result.Beb[0],
                                    color:'#0e9aa7',
                                    tooltip: {
                                        valueSuffix: '  jt'
                                    }
                                }, {
                                    type: 'column',
                                    name: 'Actual',
                                    color:'#ff6f69',
                                    data: result.Beb[1],
                                    tooltip: {
                                        valueSuffix: ' jt'
                                    }
                                }]
                            });
            
                            Highcharts.chart('dash_chart_shu', {
                                title: {
                                    text: ''
                                },
                                credits: {
                                    enabled: false
                                },
                                xAxis: {
                                    categories: ['Jan','Feb','Mar','Apr','Mei','Jun','Jul','Agu','Sep','Okt','Nov','Des']
                                },
                                yAxis: [{ // Primary yAxis
                                    labels: {
                                        format: '{value} jt',
                                        style: {
                                            color: Highcharts.getOptions().colors[1]
                                        }
                                    },
                                    title: {
                                        text: 'Nilai',
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
                                series: [{
                                    type: 'column',
                                    name: 'Budget',
                                    data: result.SHU[0],
                                    color:'#0e9aa7',
                                    tooltip: {
                                        valueSuffix: '  jt'
                                    }
                                }, {
                                    type: 'column',
                                    name: 'Actual',
                                    color:'#ff6f69',
                                    data: result.SHU[1],
                                    tooltip: {
                                        valueSuffix: ' jt'
                                    }
                                }]
                            });              
                            break;
                        }
                    }
                }
            });
        }
        
        $('#per').text('$periode');

        $('.navigasi').on('click','#close_btn',function(){
            window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2','','$kode_lokasi/$periode/$kode_pp/$nik/$kode_fs');
        });
        $('.navigasi').on('click','#back_btn',function(){
            window.history.go(-1); return false;
        });

        $('.navigasi').on('click','#refresh_btn',function(){
            location.reload();
        });

        ";
        switch($kunci){
            case "bk" :
            echo"
            getAkun();

            var from = $('#tgl-awal').datepicker({ autoclose: true,format:'yyyy-mm-dd',startDate: new Date('$tahun-$bulan-01'),endDate: new Date('$tgl_akhir') }).on('changeDate', function(e){
                $('#tgl-akhir').datepicker({ autoclose: true,format:'yyyy-mm-dd'}).datepicker('setStartDate', e.date).datepicker('setEndDate',new Date('$tgl_akhir')).focus();
            });
    
            $('.datepicker, .daterangepicker,.tgl-awal').on('keydown keyup keypress', function(e){
                e.preventDefault();
                return false;
            });
    
            $('#bTampil').click(function(){
                var akun = $('#kd_akun')[0].selectize.getValue();
                var tgl1 = $('#tgl-awal').val();
                var tgl2 = $('#tgl-akhir').val();
                
                loadService('getBukuBesar','GET','$root_ser/dashSekolah.php?fx=getBukuBesar',akun+'|'+tgl1+'|'+tgl2);
    
            });

            function initDash(){
                loadService('getBukuBesar','GET','$root_ser/dashSekolah.php?fx=getBukuBesar');
            }
            initDash();

            $('#isiBukuBesar').on('click','.detJurnal',function(){
                
                var no = $(this).data('no_bukti');

                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$kunci|'+no);
            });

            ";
            break;
            case "piu":
            echo"
            getJur();
            getKelas();
            getAngkatan();
            getSiswa();
            getSts();

            function initDash(){
                loadService('saldoPiu','GET','$root_ser/dashSekolah.php?fx=getDftSaldoPiu');
            }
            initDash();
            $('#table-SaldoPiu').on('click','.detSaldoPiu',function(){
                var nis = $(this).data('nis');
                // alert(nis);
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$kunci|'+nis);
            });

            ";
            break;
            case "pdd":
            echo"
            getJur();
            getKelas();
            getAngkatan();
            getSiswa();
            getSts();

            function initDash(){
                loadService('saldoPDD','GET','$root_ser/dashSekolah.php?fx=getDftSaldoPDD');
            }
            initDash();
            $('#table-SaldoPDD').on('click','.detSaldoPDD',function(){
                var nis = $(this).data('nis');
                // alert(nis);
                window.parent.system.getResource(".$resource.").doOpen('server_report_saku3_dash_rptDashYspte2Det2','','$kode_lokasi|$periode|$kode_pp|$nik|$kode_fs|$kunci|'+nis);
            });

            ";
            break;
            case "agg":
            echo"
            function initDash(){
                loadService('budgetAct','GET','$root_ser/dashSekolah.php?fx=getBudgetAct');
                loadService('agg','GET','$root_ser/dashSekolah.php?fx=getAggChart',1000000);
            }
            initDash();
            ";
            break;
        }
        echo"

        </script>";
		return "";
	}
	
}
?>
