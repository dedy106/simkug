<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $api_key=$_SESSION['api_key'];
    $nik=$_SESSION['userLog'];

?>
<div id='saiweb_container'>
    <div id='web_datatable'>
        <div class="row">
            <div class="col-md-12">
                <div class="nav-tabs-custom">
                    <ul class="nav nav-tabs pull-right">
                        <li class="active"><a href="#sai-tab-new" data-toggle='tab'><i class="fa fa-inbox"></i> New</a></li>
                        <li class=""><a href="#sai-tab-finish" data-toggle='tab'><i class="fa fa-check-circle"></i> Finish</a></li>
                        <li class="pull-left header"><i class="fa fa-inbox"></i> Data Prospecting</li>        
                    </ul>
                    <div class="tab-content">
                        <div class="tab-pane active" id="sai-tab-new" style="position: relative;">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="box" style="border-top:none;">
                                        <div class="box-header">
                                            <a href="#" class="btn btn-primary pull-right web_datatable_insert" title="Tambah">
                                                <i class="fa fa-plus-circle"></i> Tambah
                                            </a>
                                        </div>
                                        <div class="box-body sai-container-overflow-x">
                                            <table class='table table-bordered' id='table-prospecting' style='width:100%'>
                                                <thead>
                                                    <th>No Bukti</th>
                                                    <th>Tanggal</th>
                                                    <th>Keterangan</th>
                                                    <th>Customer</th>
                                                    <th>Produk</th>
                                                    <th>Karyawan</th>
                                                    <th>Nilai</th>
                                                    <th>Action</th>
                                                </thead>
                                                <tbody>
                                                <tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>                
                        </div>
                        <div class="tab-pane" id="sai-tab-finish" style="position: relative;">
                            <div class="row">
                                <div class="col-xs-12">
                                    <div class="box" style="border-top:none;">
                                        <div class="box-header">
                                            <a href="#" class="btn btn-primary pull-right web_datatable_insert" title="Tambah">
                                                <i class="fa fa-plus-circle"></i> Tambah
                                            </a>
                                        </div>
                                        <div class="box-body sai-container-overflow-x">
                                            <table class='table table-bordered' id='table-prospecting-finish' style='width:100%'>
                                                <thead>
                                                    <th>No Bukti</th>
                                                    <th>Tanggal</th>
                                                    <th>Keterangan</th>
                                                    <th>Customer</th>
                                                    <th>Produk</th>
                                                    <th>Karyawan</th>
                                                    <th>Nilai</th>
                                                </thead>
                                                <tbody>
                                                <tbody>
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>                
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- FORM INSERT -->
    <form id='web_form_insert' hidden enctype="multipart/form-data">
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box'>
            <div class='box-header'>
              <h3 class="box-title" ><i class="fa fa-inbox"></i> Input Prospecting</h3> 
              <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
               <a class='btn btn-default pull-right btn-form-exit web_form_back'><i class='fa fa-rotate-left'></i> Back</a>
            </div>
          </div>
          <div class='box box-warning'>
            <div class='box-body pad'> 
              <div class='row'>
                <div class='form-group' >
                  <label class='control-label col-sm-3'>Keterangan</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='keterangan' placeholder='Masukkan Keterangan' class='form-control input-form' required>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' style='margin-bottom:5px;'>
                    <label class='control-label col-sm-3'>Tanggal</label>
                    <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                    <div class='input-group-addon'>
                    <i class='fa fa-calendar'></i>
                    </div>
                    <input name='tanggal' class='form-control datepicker input-form' id='tanggal' required>
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' style='margin-bottom:5px;'>
                  <label class='control-label col-sm-3'>Customer</label>
                    <div class='col-sm-9' >
                      <select id='kode_cust' name='kode_cust' class='form-control input-form selectize' required>
                      <option value='' disabled>Pilih Customer</option>
                      </select>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' style='margin-bottom:5px;'>
                  <label class='control-label col-sm-3'>Produk</label>
                    <div class='col-sm-9' >
                      <select id='kode_produk' name='kode_produk' class='form-control input-form selectize' required>
                      <option value='' disabled>Pilih Produk</option>
                      </select>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' style='margin-bottom:5px;'>
                  <label class='control-label col-sm-3'>Karyawan</label>
                    <div class='col-sm-9' >
                      <select id='nik' name='nik' class='form-control input-form selectize' required>
                      <option value='' disabled>Pilih Karyawan</option>
                      </select>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Nilai</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nilai' placeholder='Masukkan Nilai' class='form-control currency input-form' required>
                     </div>
                </div>
              </div>
              
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Status</label>
                    <div class='col-sm-9' >
                      <select id='status' name='status' class='form-control input-form selectize' required>
                      <option value='' disabled>Pilih Status</option>
                      <option value='0' >0 - Keep</option>
                      <option value='1' >1 - Back</option>
                      <option value='2' >2 - Next</option>
                      </select>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='col-md-12 sai-container-overflow'>
                    <table class='table table-striped table-bordered' id='sai-grid-table'>
                        <tr>
                            <th>Jenis</th>
                            <th>File</th>
                            <td>
                                <a href='#' class='sai-btn-circle pull-right' id='sai-grid-add'><i class='fa fa-plus'></i>
                            </td>   
                        </tr>
                    </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- Modal FORM -->
    <div class="modal in" id="sai-grid-table-modal" tabindex="-1" role="dialog" >
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <form id="sai-grid-table-form">
                    <div class="modal-header">
                        <h5 class="modal-title">Input Dokumen</h5>
                        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        </button>
                    </div>
                    <div class="modal-body">
                        <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-3">Jenis</label>
                                <div class="col-sm-9" style="margin-bottom:5px;">
                                    <select name="kode_dok[]" class="form-control selectize" id="web-modal-jenis" required>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <!-- <div class="row">
                            <div class="form-group">
                                <label class="control-label col-sm-3">File</label>
                                <div class="col-sm-9" style="margin-bottom:5px;">
                                    <input name="file[]" type="file" accept="" value="" class="" id="web-modal-file" required="">
                                </div>
                            </div>
                        </div> -->
                    </div>
                    <div class="modal-footer">
                        <button type="submit" class="btn btn-primary">Simpan</button>
                        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</div>

<script>
function getCust(){
    $.ajax({
        type: 'GET',
        url: '<?=$root_ser?>/Prospecting.php?fx=getCust',
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#kode_cust')[0].selectize.addOption([{text:result.daftar[i].kode_cust + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_cust}]);
                    }
                }
            }
        }
    });
}
function getProduk(){
    $.ajax({
        type: 'GET',
        url: '<?=$root_ser?>/Prospecting.php?fx=getProduk',
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#kode_produk')[0].selectize.addOption([{text:result.daftar[i].kode_produk + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_produk}]);
                    }
                }
            }
        }
    });
}

function getKaryawan(){
    $.ajax({
        type: 'GET',
        url: '<?=$root_ser?>/Prospecting.php?fx=getKaryawan',
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#nik')[0].selectize.addOption([{text:result.daftar[i].nik + ' - ' + result.daftar[i].nama, value:result.daftar[i].nik}]);
                    }
                }
            }
        }
    });
}

function getJenisDok(){
    $.ajax({
        type: 'GET',
        url: '<?=$root_ser?>/Prospecting.php?fx=getJenisDok',
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#web-modal-jenis')[0].selectize.addOption([{text:result.daftar[i].kode_dok + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_dok}]);
                    }
                }
            }
        }
    });
}
$(document).ready(function(){


  var action_html = "<a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>";

  var kode_lokasi = '<?php echo $kode_lokasi ?>';
  var dataTable = $('#table-prospecting').DataTable({
      'processing': true,
      'serverSide': true,
      'ajax': {
          'url': '<?=$root_ser?>/Prospecting.php?fx=getDatatable',
          'data': {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','jenis':'new'},
          'type': 'POST',
          'dataSrc' : function(json) {
              return json.data;   
          }
      },
      'columnDefs': [
          {'targets': 7, data: null, 'defaultContent': action_html }
      ]
  });

  var dataTable2 = $('#table-prospecting-finish').DataTable({
      'processing': true,
      'serverSide': true,
      'ajax': {
          'url': '<?=$root_ser?>/Prospecting.php?fx=getDatatable',
          'data': {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','jenis':'finish'},
          'type': 'POST',
          'dataSrc' : function(json) {
              return json.data;   
          }
      },
      'columnDefs': [
          {data: null}
      ]
  });

  
  getCust();
  getProduk();
  getKaryawan();
  getJenisDok();

  $('#saiweb_container').on('click', '.web_datatable_insert', function(){
    $('#web_datatable').hide();
    $('.input-form').val('');
    $('#web_form_insert').show();
  });

  $('#saiweb_container').on('click', '#sai-grid-add', function(){
    $('#sai-grid-table-modal').modal('show');
    // alert('test');
  });

  $('#saiweb_container').on('submit', '#sai-grid-table-form', function(e){
    e.preventDefault();
    // var file = $('#web-modal-file').val();
    var kode_dok = $('#web-modal-jenis')[0].selectize.getValue();
    
    //var nama=getNamaAkun();
    var row = 
    "<tr class='sai-grid-input-row'>"+
        "<td width='40%'>"+
        kode_dok+
        "<input type='hidden' name='kode_dok[]' value='"+kode_dok+"' required readonly class='form-control'>"+
        "</td>"+
        "<td width='50%'>"+
        "<input type='file' name='file[]' required readonly >"+
        "</td>"+
        "<td width='10%'><a href='#' class='sai-btn-circle pull-right sai-grid-del'><i class='fa fa-times'></i></td>"+
    "</tr>";
    $('#sai-grid-table tbody').append(row);
    $('#sai-grid-table-modal').modal('hide');

  });
  
  $('#saiweb_container').on('click', '.sai-grid-del', function(){
        $(this).closest('tr').remove();
        $("html, body").animate({ scrollTop: $(document).height() }, 1000);
  });

  $('#saiweb_container').on('click', '.web_form_back', function(){
     var id = $(this).closest('form').attr('id');
     $('#'+id).hide();
     $('#web_datatable').show();
  });

  $('#saiweb_container').on('click', '.web_datatable_edit', function(){
                    // getset value
     var kode = $(this).closest('tr').find('td:eq(0)').text();
     $.ajax({
        type: 'GET',
        url: '<?=$root_ser?>/Prospecting.php?fx=getEditProduk',
        dataType: 'json',
        data: {'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>','kode_produk':kode},
        success:function(res){
            if(res.status){
                $('#web_form_edit_kode_produk').val(res.daftar[0].kode_produk);
                $('#web_form_edit_nama').val(res.daftar[0].nama);

                $('#web_datatable').hide();
                $('#web_form_edit').show();
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:'+textStatus);
        }
    });
    
     
  });

  $('#saiweb_container').on('submit', '#web_form_insert', function(e){
  e.preventDefault();
    var formData = new FormData(this);
    for(var pair of formData.entries()) {
         console.log(pair[0]+ ', '+ pair[1]); 
        }
    var kode_lok = '<?= $kode_lokasi; ?>';
    var username = '<?= $nik; ?>';
    var api_key = '<?= $api_key; ?>';

    formData.append('kode_lokasi',kode_lok);
    formData.append('username',username);
    formData.append('api_key',api_key);
    $.ajax({
        type: 'POST',
        url: '<?=$root_ser?>/Prospecting.php',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Input data '+result.message);
            if(result.status){
                if($('#status').val == "2"){
                    dataTable2.ajax.reload();
                }else{
                    dataTable.ajax.reload();
                }

                $('#web_datatable').show();
                $('.input-form').val('');
                $('#web_form_insert').hide();
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:'+textStatus);
        }
    });
  });
  
  $('#saiweb_container').on('submit', '#web_form_edit', function(e){
    e.preventDefault();
    
    formData = $(this).serialize();

    var kode_lok = '<?= $kode_lokasi; ?>';
    var username = '<?= $nik; ?>';
    var api_key = '<?= $api_key; ?>';

    $.ajax({
        type: 'PUT',
        url: '<?=$root_ser?>/Prospecting.php',
        dataType: 'json',
        data: formData+'&kode_lokasi='+kode_lok+'&username='+username+'&api_key='+api_key,
        success:function(result){
            alert('Update data '+result.message);
            if(result.status){
                dataTable.ajax.reload();
                $('#web_datatable').show();
                $('#web_form_edit').hide();
            }
        }
    });
   });

   $('#saiweb_container').on('click', '.web_datatable_del', function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(0)').text();
            var nama = $(this).closest('tr').find('td:eq(1)').text();
            
            $.ajax({
                type: 'DELETE',
                url: '<?=$root_ser?>/Prospecting.php',
                dataType: 'json',
                data: {'kode_produk':kode, 'kode_lokasi':<?=$kode_lokasi?>,'username':'<?=$nik?>','api_key':'<?=$_SESSION['api_key']?>'},
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

    $('.currency').inputmask("numeric", {
        radixPoint: ",",
        groupSeparator: ".",
        digits: 2,
        autoGroup: true,
        rightAlign: true,
        oncleared: function () { self.Value(''); }
    });

});


		
</script>