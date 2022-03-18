
<!-- TABEL Sanksi -->
<div class='box-body sai-container-overflow-x'>
<table class='table table-bordered table-striped DataTable' id='table-Sanksi'>
  <thead>
    <tr>
      <td>No</td>
      <td>Keterangan</td>
      <td>Tanggal</td>
      <td>Jenis</td>
      <td>Action</td>
    </tr>
  </thead>
  <tbody>
   
  </tbody>
</table>
</div>
<!-- FORM MODAL TAMBAH/UBAH Sanksi -->
<div class='modal' id='modal-dSanksi' tabindex='-1' role='dialog'>
    <div class='modal-dialog' role='document'>
        <div class='modal-content'>
            <form id='form-dSanksi' enctype='multipart/form-data'>
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
                            <label class='control-label col-sm-3'>Keterangan</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='nama' class='form-control ' id='modal-dSanksi-nama' required>
                            </div>
                        </div>
                    </div> 
                    <div class='row' >
                        <div class='form-group' style='margin-bottom:5px;'>
                        <label class='control-label col-sm-3'>Tanggal</label>
                        <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                            <div class='input-group-addon'>
                            <i class='fa fa-calendar'></i>
                            </div>
                            <input name='tanggal' class='form-control datepicker' id='modal-dSanksi-tgl' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Jenis</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='jenis' class='form-control ' id='modal-dSanksi-jenis' required>
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

    var action_html = "<a href='#' title='Edit' class='sai-btn-circle aSanksi_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle aSanksi_del'><i class='fa fa-trash'></i></a>";

    var kode_lokasi = '<?php echo $kode_lokasi ?>';
    var nik = '<?php echo $nik ?>';
    var dataTable = $('#table-Sanksi').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            'url': 'include_lib.php?hal=server/tarbak/Sanksi.php&fx=getSanksi',
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
    $('#aSanksi').click(function(){
        $('#modal-id').val('0');
        $('#modal-dSanksi-nama').val('');
        $('#modal-dSanksi-tgl').val('');
        $('#modal-dSanksi-jenis').val('');
        $('#header_modal').html("<i class='fa fa-plus'></i> Tambah Sanksi");
        $('#modal-dSanksi').modal('show');
    });

//SIMPAN DATA
    $('#form-dSanksi').submit(function(e){
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
            url: 'include_lib.php?hal=server/tarbak/Sanksi.php&fx=simpanSanksi',
            dataType: 'json',
            data: formData,
            contentType: false,
            cache: false,
            processData: false, 
            success:function(result){
                alert('Update data '+result.message);
                if(result.status){
                    dataTable.ajax.reload();
                    $('#modal-dSanksi').modal('hide');

                }
            }
        });
        
    });

//SHOW EDIT FORM
    $('#table-Sanksi').on('click','.aSanksi_edit',function(){
        
        var kode = $(this).closest('tr').find('td:eq(1)').text();
        var lokasi = '<?php echo $kode_lokasi; ?>';
        var nik = '<?php echo $nik; ?>';
        var paths='<?php echo $path."/server/media/"; ?>';

        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/tarbak/Sanksi.php&fx=getEditSanksi',
            dataType: 'json',
            data: {'kode_lokasi':lokasi, 'kode':kode,'nik':nik},
            success:function(res){

                if(res.status){        
                    var line = res.daftar[0];
                    $('#modal-id').val('1');
                    $('#modal-dSanksi-nama').val(line.nama);
                    $('#modal-dSanksi-tgl').val(line.tgl);
                    $('#modal-dSanksi-jenis').val(line.jenis);
                    $('#header_modal').html("<i class='fa fa-pencil'></i> Edit Sanksi");
                    $('#modal-dSanksi').modal('show');
                    
                }
            },
            fail: function(xhr, textStatus, errorThrown){
                alert('request failed:');
            }
        });
    });

//HAPUS DATA
    $('#table-Sanksi').on('click','.aSanksi_del',function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(1)').text();        
            var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
            var nik='<?php echo $nik; ?>' ;

            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/tarbak/Sanksi.php&fx=hapusSanksi',
                dataType: 'json',
                data: {'id':kode,'kode_lokasi':kode_lokasi,'nik':nik},
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


