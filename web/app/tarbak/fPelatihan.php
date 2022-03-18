
<!-- TABEL PELATIHAN -->
<div class='box-body sai-container-overflow-x'>
<table class='table table-bordered table-striped DataTable' id='table-pelatihan'>
  <thead>
    <tr>
      <td>No</td>
      <td>Nama</td>
      <td>Penyelenggara</td>
      <td>Tgl Mulai</td>
      <td>Tgl Selesai</td>
      <td>Dokumen</td>
      <td>Action</td>
    </tr>
  </thead>
  <tbody>
   
  </tbody>
</table>
</div>
<!-- FORM MODAL TAMBAH/UBAH pelatihan -->
<div class='modal' id='modal-dPelatihan' tabindex='-1' role='dialog'>
    <div class='modal-dialog' role='document'>
        <div class='modal-content'>
            <form id='form-dPelatihan' enctype='multipart/form-data'>
                <div class='modal-header'>
                    <h5 class='modal-title pull-left' id='header_modal'></h5> 
                    <button type='button' class='btn btn-default pull-right' data-dismiss='modal'>Close</button>
                    <button type='submit' class='btn btn-primary pull-right'>Simpan</button>
                </div>
                <div class='modal-body'>
                    <div class='row' >
                        <div class='form-group'>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='hidden' name='id_edit' class='form-control' id='modal-id' maxlength='10' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Nama</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='nama' class='form-control ' id='modal-dPelatihan-nama' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Penyelenggara</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='penyelenggara' class='form-control ' id='modal-dPelatihan-penyelenggara' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group' style='margin-bottom:5px;'>
                        <label class='control-label col-sm-3'>Tgl Mulai</label>
                        <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                            <div class='input-group-addon'>
                            <i class='fa fa-calendar'></i>
                            </div>
                            <input name='tgl_mulai' class='form-control datepicker' id='modal-dPelatihan-tgl_mulai' required>
                            </div>
                        </div>
                    </div> 
                    <div class='row' >
                        <div class='form-group' style='margin-bottom:5px;'>
                        <label class='control-label col-sm-3'>Tgl Selesai</label>
                        <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                            <div class='input-group-addon'>
                            <i class='fa fa-calendar'></i>
                            </div>
                            <input name='tgl_selesai' class='form-control datepicker' id='modal-dPelatihan-tgl_selesai' required>
                            </div>
                        </div>
                    </div>
                    <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Dokumen</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input name='file_gambar' type='file'>
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

    var action_html = "<a href='#' title='Edit' class='sai-btn-circle aPelatihan_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle aPelatihan_del'><i class='fa fa-trash'></i></a>";

    var kode_lokasi = '<?php echo $kode_lokasi ?>';
    var nik = '<?php echo $nik ?>';
    var dataTable = $('#table-pelatihan').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            'url': 'include_lib.php?hal=server/tarbak/Pelatihan.php&fx=getPelatihan',
            'data': {'kode_lokasi':kode_lokasi,'nik_user':nik},
            'type': 'POST',
            'dataSrc' : function(json) {
                return json.data;   
            }
        },
        'columnDefs': [
            {'targets': 6, data: null, 'defaultContent': action_html }
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
    $('#aPelatihan').click(function(){
        $('#modal-id').val('0');
        $('#modal-dPelatihan-nama').val('');
        $('#modal-dPelatihan-penyelenggara').val('');
        $('#modal-dPelatihan-tgl_mulai').val('');
        $('#modal-dPelatihan-tgl_selesai').val('');
        $('#header_modal').html("<i class='fa fa-plus'></i> Tambah Pelatihan");
        $('#modal-dPelatihan').modal('show');
    });

//SIMPAN DATA
    $('#form-dPelatihan').submit(function(e){
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
            url: 'include_lib.php?hal=server/tarbak/Pelatihan.php&fx=simpanPelatihan',
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
                    $('#modal-dPelatihan').modal('hide');


                }
            }
        });
        
    });

//SHOW EDIT FORM
    $('#table-pelatihan').on('click','.aPelatihan_edit',function(){
        
        var kode = $(this).closest('tr').find('td:eq(1)').text();
        var lokasi = '<?php echo $kode_lokasi; ?>';
        var nik = '<?php echo $nik; ?>';
        var paths='<?php echo $path."/server/media/"; ?>';

        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/tarbak/Pelatihan.php&fx=getEditPelatihan',
            dataType: 'json',
            data: {'kode_lokasi':lokasi, 'kode':kode,'nik':nik},
            success:function(res){

                if(res.status){        
                    var line = res.daftar[0];
                    $('#modal-id').val('1');
                    $('#modal-dPelatihan-nama').val(line.nama);
                    $('#modal-dPelatihan-penyelenggara').val(line.panitia);
                    $('#modal-dPelatihan-tgl_mulai').val(line.tglm);
                    $('#modal-dPelatihan-tgl_selesai').val(line.tgls);
                    $('#header_modal').html("<i class='fa fa-pencil'></i> Edit Pelatihan");
                    $('#modal-dPelatihan').modal('show');
                    
                }
            },
            fail: function(xhr, textStatus, errorThrown){
                alert('request failed:');
            }
        });
    });

//HAPUS DATA
    $('#table-pelatihan').on('click','.aPelatihan_del',function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(1)').text();        
            var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
            var nik='<?php echo $nik; ?>' ;

            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/tarbak/Pelatihan.php&fx=hapusPelatihan',
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


