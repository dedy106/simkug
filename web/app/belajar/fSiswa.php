<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
?>
<div id='saiweb_container'>
    <div id='web_datatable'>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' >
            <div class='box-header'>
            <h3 class="box-title"><i class="fa fa-inbox"></i> Data Siswa</h3> 
              <button class='btn btn-primary pull-right web_datatable_insert' title='Tambah'>
                <i class='fa fa-plus-circle'></i> Tambah
              </button>
              <div class='pull-right' style='margin-right:5px;'>
                
              </div>
            </div>
            <div class='box-body sai-container-overflow-x'>
              <table class='table table-bordered table-striped DataTable' id='table-siswa'>
                <thead>
                  <tr>
                    <td>NIS</td>
                    <td>Nama</td>
                    <td>Jurusan</td>
                    <td>Action</td>
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
    <!-- FORM INSERT -->
    <form id='web_form_insert' hidden>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box'>
            <div class='box-body'>
              <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
               <a class='btn btn-default pull-right btn-form-exit web_form_back'><i class='fa fa-rotate-left'></i> Back</a>
            </div>
          </div>
          <div class='box box-warning'>
            <div class='box-body pad'>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>NIM</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nim' class='form-control'>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Nama</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nama' class='form-control'>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Jurusan</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_jur' id="jur">
                      </select>    
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- FORM EDIT -->
    <form id='web_form_edit' hidden>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box'>
            <div class='box-body'>
              <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
              <a class='btn btn-default pull-right btn-form-exit web_form_back'><i class='fa fa-rotate-left'></i> Back</a>
            </div>
          </div>
          <div class='box box-warning'>
            <div class='box-body pad'>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>NIM</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' id='web_form_edit_nim' name='nim' class='form-control' readonly>
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Nama</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' id='web_form_edit_nama' name='nama' class='form-control'>
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Jurusan</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' id='web_form_edit_jur' name='kode_jur'>
                      </select>    
                    </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
</div>

<script>
function getJurusan(){
    $.ajax({
        type: 'POST',
        url: '<?=$root_ser?>/Siswa.php?fx=getJur',
        dataType: 'json',
        data: {'kode_lokasi':'<?=$kode_lokasi;?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#jur')[0].selectize.addOption([{text:result.daftar[i].kode_jur + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_jur}]);  
                        $('#web_form_edit_jur')[0].selectize.addOption([{text:result.daftar[i].kode_jur + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_jur}]);  
                    }
                }
            }
        }
    });
}
$(document).ready(function(){

var action_html = "<a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>";

var kode_lokasi = '<?php echo $kode_lokasi ?>';
var dataTable = $('#table-siswa').DataTable({
    'processing': true,
    'serverSide': true,
    'ajax': {
        'url': '<?=$root_ser?>/Siswa.php?fx=getSiswa',
        'data': {'kode_lokasi':kode_lokasi},
        'type': 'POST',
        'dataSrc' : function(json) {
            return json.data;   
        }
    },
    'columnDefs': [
        {'targets': 3, data: null, 'defaultContent': action_html }
    ]
});


  $('#saiweb_container').on('click', '.web_datatable_insert', function(){
    $('#web_datatable').hide();
    getJurusan();
    $('#web_form_insert').show();
    // alert("hello");
  });

  $('#saiweb_container').on('click', '.web_form_back', function(){
     var id = $(this).closest('form').attr('id');
     $('#'+id).hide();
     $('#web_datatable').show();
  });

  $('#saiweb_container').on('click', '.web_datatable_edit', function(){
                    // getset value
     var kode = $(this).closest('tr').find('td:eq(0)').text();
    //  var nama = $(this).closest('tr').find('td:eq(1)').text();
    //  var jur = $(this).closest('tr').find('td:eq(2)').text();
     getJurusan();
     $.ajax({
        type: 'POST',
        url: '<?=$root_ser?>/Siswa.php?fx=getEditSiswa',
        dataType: 'json',
        data: {'kode_lokasi':'<?= $kode_lokasi ?>','nim':kode},
        success:function(res){
            if(res.status){
                $('#web_form_edit_nim').val(res.daftar[0].nim);
                $('#web_form_edit_nama').val(res.daftar[0].nama);
                $('#web_form_edit_jur')[0].selectize.setValue(res.daftar[0].kode_jur);

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
    $.ajax({
        type: 'POST',
        url: '<?=$root_ser?>/Siswa.php?fx=simpan',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Input data '+result.message);
            if(result.status){
                dataTable.ajax.reload();
                $('#web_datatable').show();
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
    var formData = new FormData(this);
    
    for(var pair of formData.entries()) {
        console.log(pair[0]+ ', '+ pair[1]); 
    }
    

    $.ajax({
        type: 'POST',
        url: '<?=$root_ser?>/Siswa.php?fx=ubah',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
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
            // var id = $(this).closest('tr').find('td:eq(2)').text();
            
            $.ajax({
                type: 'POST',
                url: '<?=$root_ser?>/Siswa.php?fx=hapus',
                dataType: 'json',
                data: {'nim':kode, 'nama':nama},
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

});
		
</script>