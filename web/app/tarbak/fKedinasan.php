
<!-- TABEL KEDINASAN -->
<div class='box-body sai-container-overflow-x'>
<table class='table table-bordered table-striped DataTable' id='table-kedinasan'>
  <thead>
    <tr>
      <td>No</td>
      <td>No SK</td>
      <td>Tanggal SK</td>
      <td>Keterangan</td>
      <td>Action</td>
    </tr>
  </thead>
  <tbody>
   
  </tbody>
</table>
</div>
<!-- FORM MODAL TAMBAH/UBAH KEDINASAN -->
<div class='modal' id='modal-dKedinasan' tabindex='-1' role='dialog'>
    <div class='modal-dialog' role='document'>
        <div class='modal-content'>
            <form id='form-dKedinasan'>
                <div class='modal-header'>
                    <h5 class='modal-title pull-left' id='header_modal'></h5>
                    <button type='button' class='btn btn-default pull-right' data-dismiss='modal'><i class='fa fa-times'></i> Close</button>
                    <button type='submit' class='btn btn-primary pull-right'><i class='fa fa-save'></i> Simpan</button> 
                </div>
                <div class='modal-body'>
                    <div class='row' >
                        <div class='form-group'>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='hidden' name='id_edit' class='form-control' id='modal-id' maxlength='10'>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>No SK</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='no_sk' class='form-control ' id='modal-dKedinasan-no_sk' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group' style='margin-bottom:5px;'>
                        <label class='control-label col-sm-3'>Tanggal SK</label>
                        <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                            <div class='input-group-addon'>
                            <i class='fa fa-calendar'></i>
                            </div>
                            <input name='tgl_sk' class='form-control datepicker' id='modal-dKedinasan-tgl_sk' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Keterangan</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='nama' class='form-control ' maxlength='100' id='modal-dKedinasan-nama' required>
                            </div>
                        </div>
                    </div>                
                </div>
            </form>
        </div>
    </div>
</div>
<script>
$(document).ready(function(){

    var action_html = "<a href='#' title='Edit' class='sai-btn-circle aKedinasan_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle aKedinasan_del'><i class='fa fa-trash'></i></a>";

    var kode_lokasi = '<?php echo $kode_lokasi ?>';
    var nik = '<?php echo $nik ?>';
    var dataTable = $('#table-kedinasan').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            'url': 'include_lib.php?hal=server/tarbak/Dinas.php&fx=getDinas',
            'data': {'kode_lokasi':kode_lokasi,'nik_user':nik},
            'type': 'POST',
            'dataSrc' : function(json) {
                return json.data;   
            }
        },
        'columnDefs': [
            {'targets': 4, data: null, 'defaultContent': action_html }
        ]
    });

//DATEPICKER
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    });

    $('.datepicker-dmy').datepicker({
        autoclose: true,
        format: 'dd-mm-yyyy'
    });

    $('.datepicker-yyyy').datepicker({
        autoclose: true,
        viewMode: 'years', 
        minViewMode: 'years',
        format: 'yyyy'
    });

    $('.datepicker, .daterangepicker').on('keydown keyup keypress', function(e){
        e.preventDefault();
        return false;
    });

    $('.daterangepicker').daterangepicker();

// SHOW  FORM TAMBAH MODAL
    $('#aKedinasan').click(function(){
        $('#modal-id').val('0');
        $('#modal-dKedinasan-no_sk').val('');
        $('#modal-dKedinasan-tgl_sk').val('');
        $('#modal-dKedinasan-nama').val('');
        $('#header_modal').html("<i class='fa fa-plus'></i> Tambah Kedinasan");
        $('#modal-dKedinasan').modal('show');
    });

//SIMPAN DATA
    $('#form-dKedinasan').submit(function(e){
        e.preventDefault();
        var formData = new FormData(this);
        
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
        }

        var nik='<?php echo $nik; ?>' ;
        var kode_lokasi='<?php echo $kode_lokasi; ?>' ;

        formData.append('nik', nik);
        formData.append('kode_lokasi', kode_lokasi);
        
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/tarbak/Dinas.php&fx=simpanDinas',
            dataType: 'json',
            data: formData,
            contentType: false,
            cache: false,
            processData: false, 
            success:function(result){
                alert('Update data '+result.message);
                if(result.status){
                    // location.reload();
                    dataTable.ajax.reload();
                    $('#modal-dKedinasan').modal('hide');
                }
            }
        });
        
    });

    function reverseDate(date_str, separator){
        if(typeof separator === 'undefined'){separator = '-'}
        date_str = date_str.split(' ');
        var str = date_str[0].split(separator);

        return str[2]+"-"+str[1]+"-"+str[0];
    }

//SHOW EDIT FORM

    $('#table-kedinasan').on('click','.aKedinasan_edit',function(){
        
        var no_sk = $(this).closest('tr').find('td:eq(1)').text();
        var tgl_sk = $(this).closest('tr').find('td:eq(2)').text();
        var nama = $(this).closest('tr').find('td:eq(3)').text();

        var tanggal = reverseDate(tgl_sk,'/');

        $('#modal-id').val('1');
        $('#modal-dKedinasan-no_sk').val(no_sk);
        $('#modal-dKedinasan-tgl_sk').val(tanggal);
        $('#modal-dKedinasan-nama').val(nama);
        $('#header_modal').html("<i class='fa fa-pencil'></i> Edit Kedinasan");
        $('#modal-dKedinasan').modal('show');
    });


//HAPUS DATA
    $('#table-kedinasan').on('click','.aKedinasan_del', function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(1)').text();        
            var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
            var nik='<?php echo $nik; ?>' ;

            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/tarbak/Dinas.php&fx=hapusDinas',
                dataType: 'json',
                data: {'id':kode,'kode_lokasi':kode_lokasi,'nik':nik},
                success:function(result){
                    alert('Penghapusan data '+result.message);
                    if(result.status){
                        // location.reload();
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


