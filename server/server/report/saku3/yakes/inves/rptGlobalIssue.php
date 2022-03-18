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
class server_report_saku3_yakes_inves_rptGlobalIssue extends server_report_basic
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
        
        session_start();
        $_SESSION['isLogedIn'] = true;				
        $_SESSION['userLog'] = "919006";
        $_SESSION['lokasi'] = $kode_lokasi;
        
        $link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
        $root_ser=$link."/web/server/yakes";
        $root=$link;
        $path = $link."/";
        
  
		
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
        .sai-btn-circle{
            background-color:rgb(231, 231, 231);
            border: 1px solid rgb(180, 180, 180);
            color: rgb(70, 68, 68);
            padding: 2px !important;
            height: 23px;
            width: 23px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px !important;
            margin-right: 3px;
            border-radius: 50%;
        }
        </style>
          <div id='nw_container'>
            <form id='nw_form_insert' hidden>
                <div class='row' style='margin-bottom:10px'>
                    <div class='col-md-12' style='margin-bottom: 10px;box-shadow: 0px 0px 1px white;border-bottom: 1px solid #ece7e7;'>
                        <button class='btn btn-success pull-right' id='saveBtn' style='margin-bottom: 10px;margin-right:10px' type='submit'><i class='fa fa-plus-circle'></i> Save</button>

                        <button class='btn btn-secondary pull-right' id='backBtn' style='margin-bottom: 10px;margin-right:10px' type='button'><i class='fa fa-angle-left'></i> Back</button>
                    </div>
                    <div class='col-md-12' style='margin-top:20px'>
                        <input type='hidden' name='id_edit' id='id_edit' class='form-control' readonly>
                        <div class='row'>
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-3'>Tanggal</label>
                                <div class='input-group date col-sm-3' style='padding-right:15px; padding-left:15px;'>
                                    <div class='input-group-addon'>
                                    <i class='fa fa-calendar'></i>
                                    </div>
                                    <input name='tanggal' class='form-control datepicker' id='tanggal' required value=".date('Y-m-d').">
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-3'>Periode</label>
                                <div style='margin-bottom:5px;' class='col-sm-3'>
                                    <input name='periode' class='form-control' readonly id='periode'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-3'>No Bukti</label>
                                <div style='margin-bottom:5px;' class='col-sm-3'>
                                    <input type='text' readonly class='form-control' name='no_bukti' id='no_bukti'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group' style='margin-bottom:5px;'>
                                <label class='control-label col-sm-3'>Jenis</label>
                                <div style='margin-bottom:5px;' class='col-sm-3'>
                                    <select name='jenis' id='jenis' class='form-control'>
                                        <option value='Global'>Global</option>
                                        <option value='Domestik'>Domestik</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='col-md-12 sai-container-overflow'>
                                <table class='table table-striped table-bordered' id='sai-grid-det'>
                                    <thead>
                                        <tr>
                                            <th width='5%'>No</th>
                                            <th width='40%'>Katalis Positif</th>
                                            <th width='40%'>Katalis Negatif</th>
                                            <th width='5%'>
                                                <a href='#' class='sai-btn-circle pull-right' id='sai-grid-add'><i class='fa fa-plus'></i>
                                            </th> 
                                        </tr>  
                                    </thead>
                                    <tbody>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </form>
            <!-- Datatable -->
            <div id='nw_datatable'>
                <div class='row' style='margin-bottom:10px;padding-right:10px'>
                    <div class='col-xs-12'>
                        <h3 style='margin-top:0;position:absolute'>Daftar Issue</h3>
                        <a href='#' class='btn btn-primary pull-right web_datatable_insert' title='Tambah'>
                            <i class='fa fa-plus-circle'></i> Tambah
                        </a>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-xs-12'>
                        <div class='sai-container-overflow-x' style='75%'>
                            <table class='table table-bordered table-striped Datatable' id='table-issue' style='font-size: 12px;' >
                                <thead style='background: #ff9500;color: white;'>
                                    <tr>
                                        <th>No Bukti</th>
                                        <th>Periode</th>
                                        <th>Tgl Input</th>
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
          <script type='text/javascript'>
            function generateNo(kode_lokasi,periode){
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/GlobalIssue.php?fx=getNoBukti',
                    dataType: 'json',
                    data: {'kode_lokasi':kode_lokasi,'periode':periode},
                    success:function(result){    
                        if(result.status){
                            if(typeof result.no_bukti !== 'undefined'){
                                $('#no_bukti').val(result.no_bukti);
                            }
                        }
                    }
                });
            }

            generateNo('$kode_lokasi','$periode');
         
            $('#jenis').selectize();
            $('#nw_container').on('click', '.web_datatable_insert', function(){
                $('#id_edit').val('0');
                $('#nw_datatable').hide();
                $('#nw_form_insert').show();
            });

            $('#nw_form_insert').on('click', '#btnBack', function(){
                $('#nw_datatable').show();
                $('#nw_form_insert').hide();
            });

            $('#nw_container').on('click', '#sai-grid-add', function(){
                var no=$('#sai-grid-det .row-det:last').index();
                no=no+2;
                var html = `<tr class='row-det'>
                    <td class='row-no'>`+no+`</td>
                    <td><textarea class='form-control' name='katalis_positif[]'></textarea></td>
                    <td><textarea class='form-control' name='katalis_negatif[]'></textarea></td>
                    <td><a class='btn btn-danger' ><i class='fa fa-close'></i></a></td>
                </tr>`;
                $('#sai-grid-det tbody').append(html);
            });

            $('#periode').val('".date('Ym')."');
            $('#nw_container').on('change', '#tanggal', function(){
                var tgl = $('#tanggal').val();
                var periode = tgl.substr(0,4)+''+tgl.substr(5,2);
                $('#periode').val(periode);
                if($('#id_edit').val() == '0'){

                    generateNo('$kode_lokasi',periode);
                }

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

            var action_html = `<a href='#' title='Edit' class='badge badge-info btn-edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='badge badge-danger btn-delete'><i class='fa fa-trash'></i></a>`;

            var dataTable = $('#table-issue').DataTable({
                'ajax': {
                    'url': '$root_ser/GlobalIssue.php?fx=getView',
                    'data': {'kode_lokasi':'$kode_lokasi','periode':'$periode'},
                    'type': 'GET',
                    'dataSrc' : function(json) {
                        return json.data;   
                    }
                },
                'columnDefs': [
                    {'targets': 3, data: null, 'defaultContent': action_html }
                ],
                columns: [
                    { data: 'id' },
                    { data: 'periode' },
                    { data: 'tgl_input' }
                ]    
            });

            var iconloading = $('#loading-overlay');

            $('#nw_container').on('submit', '#nw_form_insert', function(e){
                e.preventDefault();
                iconloading.show();
                var formData = new FormData(this);
                
                for(var pair of formData.entries()) {
                console.log(pair[0]+ ', '+ pair[1]); 
                }
                var kode_lokasi = '$kode_lokasi';
                formData.append('kode_lokasi',kode_lokasi);
                
                $.ajax({
                    type: 'POST',
                    url: '$root_ser/GlobalIssue.php?fx=simpanIssue',
                    dataType: 'json',
                    data: formData,
                    contentType: false,
                    cache: false,
                    processData: false, 
                    success:function(result){
                        alert('Input data '+result.message);
                        if(result.status){
                            dataTable.ajax.reload();
                            iconloading.hide();
                            $('#nw_datatable').show();
                            $('#nw_form_insert').hide();
                        }
                    },
                    fail: function(xhr, textStatus, errorThrown){
                        alert('request failed:'+textStatus);
                    }
                });
            });

            $('#nw_container').on('click', '.btn-edit', function(e){
                e.preventDefault();
                
                $('#id_edit').val('1');
                var kode =  $(this).closest('tr').find('td:eq(0)').text();
                $.ajax({
                    type: 'GET',
                    url: '$root_ser/GlobalIssue.php?fx=getEdit',
                    dataType: 'json',
                    data: {kode_lokasi:'$kode_lokasi',id:kode},
                    success:function(result){
                        if(result.status){
                            var line = result.daftar[0];
                            $('#tanggal').val(line.tgl_input);
                            $('#periode').val(line.periode);
                            $('#no_bukti').val(line.id);

                            var html=``;
                            var no=1;
                            if(result.daftar2.length > 0){
                                for(var i=0;i<result.daftar2.length;i++){
                                    var line2 = result.daftar2[i];
                                    html+=`<tr class='row-det'>
                                        <td class='row-no'>`+no+`</td>
                                        <td><textarea class='form-control' name='katalis_positif[]'>`+line2.katalis_positif+`</textarea></td>
                                        <td><textarea class='form-control' name='katalis_negatif[]'>`+line2.katalis_negatif+`</textarea></td>
                                        <td><a class='btn btn-danger' ><i class='fa fa-close'></i></a></td>
                                    </tr>`;
                                    no++;
                                }
                            }
                            $('#sai-grid-det tbody').html(html);
                            $('#nw_datatable').hide();
                            $('#nw_form_insert').show();
                        }
                    },
                    fail: function(xhr, textStatus, errorThrown){
                        alert('request failed:'+textStatus);
                    }
                });
            });

            $('#nw_container').on('click', '.btn-delete', function(){
                if(confirm('Apakah anda ingin menghapus data ini?')){
                    var kode = $(this).closest('tr').find('td:eq(0)').text();
                    $.ajax({
                        type: 'GET',
                        url: '$root_ser/GlobalIssue.php?fx=hapus',
                        dataType: 'json',
                        data: {'id':kode,'kode_lokasi':'$kode_lokasi'},
                        success:function(result){
                            alert('Penghapusan data '+result.message);
                            if(result.status){
                                dataTable.ajax.reload();
                            }
                        }
                    });
                }else{
                    return false;
                }   
            });
          
          </script>      
        ";
		return "";
	}
	
}
?>
