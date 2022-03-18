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
class server_report_saku3_amu_rptUploadDokPbb extends server_report_basic
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
        $kode_pp = $tmp[2];
        $nik = $tmp[3];
        $pass = $tmp[4];
                
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = $nik;	
        $_SESSION['pass'] = $pass;
        $_SESSION['lokasi'] = $kode_lokasi;
        $_SESSION['kodePP'] = $kode_pp;
        
        $root_ser = $_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/web/server/amu";
		
		$resource = $_GET["resource"];
        $fullId = $_GET["fullId"];
      
    echo "
      <div id='loading-overlay' style='background: rgba(233, 233, 233, 0.34) none repeat scroll 0% 0%; display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index:5;'>
          <center>
              <img src='$link/image/stackspinner.gif' style='position:fixed; top: 50%; transform: translateY(-50%);'>
          </center>
      </div>";
      echo"
        <style>
        @import url('https://fonts.googleapis.com/css?family=Roboto&display=swap');
        body {
          font-family: 'Roboto', sans-serif !important;
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
          margin-top:5px;
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
          padding-left:0px !important;
          padding-right:10px !important;
        }
        .mar-mor{
          margin-bottom:10px !important;
        }
        .box-wh{
          box-shadow: 0 3px 3px 3px rgba(0,0,0,.05);
        }
        #ajax-content-section{
          background: white !important;
        }
        th{
          vertical-align: middle !important; 
        }
        .badge{
            display: inline-block;
            padding: .25em .4em;
            font-size: 95%;
            text-align: center;
            border-radius: .25rem;
            transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
        }
        .badge-success{
            background: #00a65a;
            color: white;
        }
        </style>
          <div id='sai_container'>
            <div class='row' id='saku-datatable'>
                <div class='col-12'>
                    <div class='box' style='padding:0px 20px;border:none'>
                        <div class='box-body'>
                            <div class='table-responsive '>
                                <table id='table-data' class='table table-bordered table-striped'>
                                    <thead>
                                        <tr>
                                            <th>ID PBB</th>
                                            <th>NOP</th>
                                            <th>Obyek</th>
                                            <th>Jumlah Upload</th>
                                            <th>Action</th>
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
            <div class='row' id='saku-form' style='display:none'>
                <div class='col-sm-12' style='height: 90px;'>
                    <div class='box' style='padding:0px 20px;border:none;box-shadow:none'>
                        <form class='form' id='form-tambah' >
                            <div class='box-body pb-0' style='border:none;box-shadow:none'>
                                &nbsp;
                                <button type='submit' class='btn btn-success ml-2'  style='float:right;' id='btn-save'><i class='fa fa-save'></i> Simpan</button>
                                <button type='button' class='btn btn-secondary ml-2' id='btn-kembali' style='float:right;'><i class='fa fa-undo'></i> Kembali</button>
                                </h4>
                                <hr>
                            </div>
                            <div class='box-body' style='height:400px;border:none;box-shadow:none' >
                                <div class='form-group row' id='row-id_upload' hidden>
                                    <div class='col-md-3'>
                                        <input class='form-control' type='hidden' id='id' name='id' readonly>
                                    </div>
                                </div>
                                <div class='form-group row'>
                                    <label for='no_bukti' class='col-md-3 col-form-label'>No Bukti</label>
                                    <div class='col-md-3'>
                                        <input class='form-control' type='text' readonly id='no_bukti' name='no_bukti'>
                                    </div>
                                </div>
                                <ul class='nav nav-tabs' role='tablist'>
                                    <li class='nav-item active'><a class='nav-link active' data-toggle='tab' href='#detDok' role='tab' aria-selected='true'><span class='hidden-xs-down'>Detail Gambar</span></a> </li>
                                </ul>
                                <div class='tab-content tabcontent-border'>
                                    <div class='tab-pane active' id='detDok' role='tabpanel'>
                                        <div class='' style=''>
                                            <style>
                                                th,td{
                                                    padding:8px !important;
                                                    vertical-align:middle !important;
                                                }
                                            </style>
                                            <table class='table table-striped table-bordered table-condensed' id='input-dok'>
                                            <thead>
                                                <tr>
                                                    <th width='5%'>No</th>
                                                    <th width='35%'>Nama Gambar</th>
                                                    <th width='20%'>Jenis Dok</th>
                                                    <th width='30%'>Upload File</th>
                                                    <th width='10%'><button type='button' href='#' id='add-row' class='btn btn-default'><i class='fa fa-plus-circle'></i> Tambah</button></th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
          </div>
          <script type='text/javascript'>

            var dataTable = $('#table-data').DataTable({
                'processing': true,
                'serverSide': true,
                'ajax': {
                    'url': '$root_ser/UploadDokPbb.php?fx=getData',
                    'data': {'kode_lokasi':'$kode_lokasi','kode_pp':'$kode_pp'},
                    'type': 'GET',
                    'dataSrc' : function(json) {
                        return json.data;   
                    }
                },
            });

            var iconloading = $('#loading-overlay');

            
            function getJenis(param,kode_jenis=null){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/UploadDokPbb.php?fx=getJenis',
                    dataType: 'json',
                    data: {kode_lokasi: '$kode_lokasi'},
                    async:false,
                    success:function(result){ 
                        console.log(param);
                        var select = $('.'+param).selectize();
                        select = select[0];
                        var control = select.selectize;
                        control.clearOptions();
                        if(result.status){
                            if(typeof result.daftar !== 'undefined' && result.daftar.length > 0){
                                for(var i=0;i < result.daftar.length;i++){
                                    control.addOption([{text:result.daftar[i].nama, value:result.daftar[i].kode_jenis+'-'+result.daftar[i].tipe}]);
                                }
                                if(kode_jenis != undefined && kode_jenis != null){
                                    control.setValue(kode_jenis);
                                }
                            }
                        }
                    }
                });
            }

            $('#sai_container').on('click','#btn-upload',function(e){
                var no_bukti = $(this).closest('tr').find('td').eq(0).html();
                
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/UploadDokPbb.php?fx=getUploadData',
                    dataType: 'json',
                    async:false,
                    data: {'no_bukti':no_bukti},
                    success:function(result){
                        if(result.status){
                            $('#no_bukti').val(no_bukti);
                            var input='';
                            $('#input-dok tbody').html(input);  
                            var no = 1;
                            if(result.daftar.length > 0){
                                for(var i=0;i < result.daftar.length;i++){
                                    var line = result.daftar[i];
                                    input += `<tr class='row-dok'>`;
                                    input += `<td class='no-dok'>`+no+`</td>`;
                                    input += `<td ><input type='text' name='nama_dok[]' class='form-control inp-dok' value='`+line.nama+`' required><input type='hidden' name='no_urut[]' class='form-control inp-no_urut' value='`+line.no_urut+`' required></td>`;
                                    input += `<td><select name='kode_jenis[]' class='form-control inp-kode_jenis kdjeniske`+no+`' value='' required></select></td>`;
                                    input += `<td ><input type='text' name='nama_file[]' class='form-control inp-nama' value='`+line.file_dok+`' required readonly></td>`;
                                    input += `<td ><a title='Hapus' class='btn btn-danger btn-sm hapus-dok2' style=''><i class='fa fa-times fa-1'></i></a>&nbsp;<a title='Download' class='btn btn-success btn-sm download-dok' style='' href='https://api.simkug.com/api/aset/storage/`+line.file_dok+`' target='_blank'><i class='fa fa-download fa-1'></i></a></td>`;
                                    input += `</tr>`;
                                    no++;
                                }

                                $('#input-dok tbody').html(input);   
                                var no=1;
                                for(var i=0;i<result.daftar.length;i++){
                                    var line =result.daftar[i];
                                    getJenis('kdjeniske'+no,line.kode_jenis);
                                    no++;
                                }
                            }
                            $('#saku-form').show();
                            $('#saku-datatable').hide();
                        }
                    }
                });
            });

            $('#sai_container').on('click','#btn-kembali',function(e){
                $('#saku-datatable').show();
                $('#saku-form').hide();
            });

            $('#saku-form').on('click', '#add-row', function(){
                var no=$('#input-dok .row-dok:last').index();
                no=no+2;
                var input='';
                input = `<tr class='row-dok'>`;
                input += `<td class='no-dok'>`+no+`</td>`;
                input += `<td ><input type='text' name='nama_dok[]' class='form-control inp-dok' value='' required></td>`;
                input += `<td><select name='kode_jenis[]' class='form-control inp-kode_jenis kdjeniske`+no+`' value='' required></select></td>`;
                input += `<td >`+
                `<input type='file' name='file_dok[]' required  class='inp-file_dok'>`+`</td>`;
                input += `<td><a title='Hapus' class='btn btn-danger btn-sm hapus-dok' style=''><i class='fa fa-times fa-1'></i></a></td>`;
                input += `</tr>`;
                $('#input-dok tbody').append(input);
                getJenis('kdjeniske'+no);
            });

            $('#input-dok').on('click', '.hapus-dok', function(){
                $(this).closest('tr').remove();
                no=1;
                $('.row-dok').each(function(){
                    var nom = $(this).closest('tr').find('.no-dok');
                    nom.html(no);
                    no++;
                });
                $('html, body').animate({ scrollTop: $(document).height() }, 1000);
            });

            $('#input-dok').on('change', '.inp-kode_jenis', function(){
                var tmp = $(this).val().split('-');
                if(tmp[1] == 'Image'){
                    $(this).closest('tr').find('.inp-file_dok').attr('accept','image/*');
                }else{
                    $(this).closest('tr').find('.inp-file_dok').attr('accept','');
                }
            });

            $('#input-dok').on('click', '.hapus-dok2', function(){
                if(confirm('Sistem akan menghapus file dari server. Apakah anda ingin menghapus data ini? ')){
                    var no_bukti = $('#no_bukti').val();
                    var no_urut = $(this).closest('tr').find('.inp-no_urut').val();
                    
                    $.ajax({
                        type: 'DELETE',
                        url: '$root_ser/UploadDokPbb.php',
                        dataType: 'json',
                        data: {'no_bukti':no_bukti,'no_urut':no_urut},
                        success:function(result){
                            alert('Penghapusan data '+result.message);
                            if(result.status){
                                dataTable.ajax.reload();
                            }else{
                                return false;
                            }
                        }
                    });

                    $(this).closest('tr').remove();
                    no=1;
                    $('.row-dok').each(function(){
                        var nom = $(this).closest('tr').find('.no-dok');
                        nom.html(no);
                        no++;
                    });
                    $('html, body').animate({ scrollTop: $(document).height() }, 1000);
                }else{
                    return false;
                }
            });

            $('#saku-form').on('submit', '#form-tambah', function(e){
                e.preventDefault();
                iconloading.show();
                var formData = new FormData(this);
                
                var kode_lokasi = '$kode_lokasi';
                var kode_pp = '$kode_pp';
                formData.append('kode_lokasi',kode_lokasi);
                formData.append('kode_pp',kode_pp);

                for(var pair of formData.entries()) {
                    console.log(pair[0]+ ', '+ pair[1]); 
                }
                
                $.ajax({
                    type: 'POST',
                    url: '$root_ser/UploadDokPbb.php?fx=simpanDok',
                    dataType: 'json',
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData: false, 
                    success:function(result){
                        alert('Input data '+result.message);
                        if(result.status){
                        
                            dataTable.ajax.reload();
                            $('#saku-form').hide();
                            $('#saku-datatable').show();
                        }
                        iconloading.hide();
                    },
                    fail: function(xhr, textStatus, errorThrown){
                        alert('request failed:'+textStatus);
                    }
                });
            });
        
          </script>      
        ";
		return "";
	}
	
}
?>
