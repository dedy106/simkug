
<!-- TABEL PENDIDIKAN -->
<div class='box-body sai-container-overflow-x'>
<table class='table table-bordered table-striped DataTable' id='table-pendidikan'>
  <thead>
    <tr>
      <td>No</td>
      <td>Nama</td>
      <td>Tahun</td>
      <td>Jurusan</td>
      <td>Strata</td>
      <td>Dokumen</td>
      <td>Action</td>
    </tr>
  </thead>
  <tbody>
   
  </tbody>
</table>
</div>
<!-- FORM MODAL TAMBAH/UBAH Pendidikan -->
<div class='modal' id='modal-dPendidikan' tabindex='-1' role='dialog'>
    <div class='modal-dialog' role='document'>
        <div class='modal-content'>
            <form id='form-dPendidikan' enctype='multipart/form-data'>
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
                            <input type='text' name='nama' class='form-control ' id='modal-dPendidikan-nama' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group' style='margin-bottom:5px;'>
                            <label class='control-label col-sm-3'>Tahun</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='tahun' maxlength='4' class='form-control ' id='modal-dPendidikan-tahun' required>
                            </div>
                        </div>
                    </div>
                    <div class='row' >
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Jurusan</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <select  class="form-control selectize" id="modal-dPendidikan-jur" name="kode_jur" required>
                                <option value='' disabled>--- Pilih Jurusan ---</option>
                                <?php
                                // $rs2 = execute("SELECT kode_jur,nama   from hr_jur where flag_aktif= '1' and kode_lokasi = '".$kode_lokasi."'");
                                // while($row2 = $rs2->FetchNextObject($toupper = false)){

                                //     echo "<option value='".$row2->kode_jur."' >".$row2->kode_jur."-".$row2->nama."</option>";
                                // }
                                ?>
                            </select>
                            </div>
                        </div>
                    </div>  
                    <div class='row' >
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Strata</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <select  class="form-control selectize" id="modal-dPendidikan-strata" name="kode_strata" required>
                                <option value='' disabled>--- Pilih Strata ---</option>
                                <?php
                                // $rs2 = execute("SELECT kode_strata,nama   from hr_strata where flag_aktif= '1' and kode_lokasi = '".$kode_lokasi."'");
                                // while($row2 = $rs2->FetchNextObject($toupper = false)){

                                //     echo "<option value='".$row2->kode_strata."' >".$row2->kode_strata."-".$row2->nama."</option>";
                                // }
                                ?>
                            </select>
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

function getStrata(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/tarbak/Pendidikan.php&fx=getStrata',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#modal-dPendidikan-strata')[0].selectize.addOption([{text:result.daftar[i].kode_strata + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_strata}]); 
                    }
                }
            }
        }
    });
}

function getJur(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/tarbak/Pendidikan.php&fx=getJur',
        dataType: 'json',
        data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#modal-dPendidikan-jur')[0].selectize.addOption([{text:result.daftar[i].kode_jur + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_jur}]); 
                    }
                }
            }
        }
    });
}

$(document).ready(function(){

    var action_html = "<a href='#' title='Edit' class='sai-btn-circle aPendidikan_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle aPendidikan_del'><i class='fa fa-trash'></i></a>";

    var kode_lokasi = '<?php echo $kode_lokasi ?>';
    var nik = '<?php echo $nik ?>';
    var dataTable = $('#table-pendidikan').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            'url': 'include_lib.php?hal=server/tarbak/Pendidikan.php&fx=getPendidikan',
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
    $('#aPendidikan').click(function(){
        $('#modal-id').val('0');
        $('#modal-dPendidikan-nama').val('');
        $('#modal-dPendidikan-tahun').val('');
        $('#modal-dPendidikan-jur')[0].selectize.setValue('');
        $('#modal-dPendidikan-strata')[0].selectize.setValue('');
        $('#header_modal').html("<i class='fa fa-plus'></i> Tambah Pendidikan");
        getStrata();
        getJur();
        $('#modal-dPendidikan').modal('show');
    });

//SIMPAN DATA
    $('#form-dPendidikan').submit(function(e){
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
            url: 'include_lib.php?hal=server/tarbak/Pendidikan.php&fx=simpanPendidikan',
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
                    $('#modal-dPendidikan').modal('hide');
                }
            }
        });
        
    });

//SHOW EDIT FORM
    $('#table-pendidikan').on('click','.aPendidikan_edit',function(){
        
        getStrata();
        getJur();
        var kode = $(this).closest('tr').find('td:eq(1)').text();
        var lokasi = '<?php echo $kode_lokasi; ?>';
        var nik = '<?php echo $nik; ?>';
        var paths='<?php echo $path."/server/media/"; ?>';

        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/tarbak/Pendidikan.php&fx=getEditPendidikan',
            dataType: 'json',
            data: {'kode_lokasi':lokasi, 'kode':kode,'nik':nik},
            success:function(res){

                if(res.status){        
                    var line = res.daftar[0];
                    $('#modal-id').val('1');
                    $('#modal-dPendidikan-nama').val(line.nama);
                    $('#modal-dPendidikan-tahun').val(line.tahun);
                    $('#modal-dPendidikan-jur')[0].selectize.setValue(line.kode_jurusan);
                    $('#modal-dPendidikan-strata')[0].selectize.setValue(line.kode_strata);
                    $('#header_modal').html("<i class='fa fa-pencil'></i> Edit Pendidikan");
                    $('#modal-dPendidikan').modal('show');
                    
                }
            },
            fail: function(xhr, textStatus, errorThrown){
                alert('request failed:');
            }
        });
    });

//HAPUS DATA
    $('#table-pendidikan').on('click','.aPendidikan_del',function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(1)').text();        
            var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
            var nik='<?php echo $nik; ?>' ;

            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/tarbak/Pendidikan.php&fx=hapusPendidikan',
                dataType: 'json',
                data: {'id':kode,'kode_lokasi':kode_lokasi,'nik':nik},
                success:function(result){
                    alert('Penghapusan data '+result.message);
                    if(result.status){
                        dataTable.ajax.reload();
                        $('#modal-dPendidikan').modal('hide');
                    }
                }
            });
        }else{
            return false;
        }
                    
   });

});
</script>


