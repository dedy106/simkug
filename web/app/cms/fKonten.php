<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
?>
<div id='saiweb_container'>
    <div id='web_datatable'>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' >
            <div class='box-header'>
            <h3 class="box-title"><i class="fa fa-inbox"></i> Data Konten</h3> 
              <button class='btn btn-primary pull-right web_datatable_insert' title='Tambah'>
                <i class='fa fa-plus-circle'></i> Tambah
              </button>
              <div class='pull-right' style='margin-right:5px;'>
                
              </div>
            </div>
            <div class='box-body sai-container-overflow-x'>
              <table class='table table-bordered table-striped DataTable' id='table-konten'>
                <thead>
                  <tr>
                    <td>ID</td>
                    <td>Tanggal</td>
                    <td>Judul</td>
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
              <button type='submit' class='btn btn-success pull-right'><i class='fa fa-save'></i> Save</button>
               <a class='btn btn-default pull-right btn-form-exit web_form_back'><i class='fa fa-rotate-left'></i> Batal</a>
            </div>
          </div>
          <div class='box box-warning'>
            <div class='box-body pad'>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Judul</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='judul' class='form-control' maxlength='200'>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Tanggal Publish</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='tanggal' class='form-control datepicker-dmy'>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Header</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' id='inp-header' name='header_url'>
                      <option value='' disabled>Pilih Header</option>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Isi</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <textarea class="textarea-ini" placeholder="Place some text here"
                             style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;" name='keterangan'></textarea>
                        </div>
                    </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Kelompok</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' id='inp-klp' name='kode_klp'>
                      <option value='' disabled>Pilih Kelompok</option>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Kategori</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' id='inp-ktg' name='kode_kategori'>
                      <option value='' disabled>Pilih Kategori</option>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Tag</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='tag' class='form-control' maxlength='200'>
                     </div>
                </div>
              </div>
              <div class='row'>
                    <div class='col-sm-12'>
                        <div class='form-group'>
                            <label class='control-label'>Keterangan</label>
                            <div class='alert' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #31708f; border-color: #bce8f1; background-color: #d9edf7;'>
                            &nbsp; Tag dipisahkan dengan ',' dan maksimal karakter sebanyak 200
                            </div>
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
              <button type='submit' class='btn btn-success pull-right'><i class='fa fa-save'></i> Save</button>
              <a class='btn btn-default pull-right btn-form-exit web_form_back'><i class='fa fa-rotate-left'></i> Batal</a>
            </div>
          </div>
          <div class='box box-warning'>
            <div class='box-body pad'>
                <div class='row'>
                    <div class='form-group'>
                    <label class='control-label col-sm-3'>Id</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <input type='text' name='id' class='form-control' maxlength='200' readonly id='web_form_edit_id'>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='form-group'>
                    <label class='control-label col-sm-3'>Judul</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <input type='text' name='judul' class='form-control' maxlength='200' id='web_form_edit_judul'>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='form-group'>
                    <label class='control-label col-sm-3'>Tanggal Publish</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <input type='text' name='tanggal' class='form-control datepicker-dmy' id='web_form_edit_tgl'>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='form-group'>
                    <label class='control-label col-sm-3'>Header</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <select class='form-control selectize' name='header_url' id='web_form_edit_header'>
                        </select>    
                        </div>
                    </div>
                </div>
                <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Isi</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <textarea class="textarea-ini" placeholder="Place some text here"
                             style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;" name='keterangan' id='web_form_edit_isi'></textarea>
                            </div>
                        </div>
                </div>
                <div class='row'>
                    <div class='form-group'>
                    <label class='control-label col-sm-3'>Kelompok</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <select class='form-control selectize' name='kode_klp' id='web_form_edit_kode_klp'>
                        </select>    
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='form-group'>
                    <label class='control-label col-sm-3'>Kategori</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <select class='form-control selectize' name='kode_kategori' id='web_form_edit_kategori'>
                        </select>    
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='form-group'>
                    <label class='control-label col-sm-3'>Tag</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <input type='text' name='tag' class='form-control' maxlength='200' id='web_form_edit_tag'>
                        </div>
                    </div>
                </div>
                <div class='row'>
                        <div class='col-sm-12'>
                            <div class='form-group'>
                                <label class='control-label'>Keterangan</label>
                                <div class='alert' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #31708f; border-color: #bce8f1; background-color: #d9edf7;'>
                                &nbsp; Tag dipisahkan dengan ',' dan maksimal karakter sebanyak 200
                                </div>
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

  function getHeader(){
      $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Konten.php&fx=getHeader',
            dataType: 'json',
            data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
            success:function(result){    
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            $('#inp-header')[0].selectize.addOption([{text:result.daftar[i].id + ' - ' + result.daftar[i].nama, value:result.daftar[i].id}]);  
                            $('#web_form_edit_header')[0].selectize.addOption([{text:result.daftar[i].id + ' - ' + result.daftar[i].nama, value:result.daftar[i].id}]);  
                        }
                    }
                }
            }
      });
  }

  function getKelompok(){
      $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Konten.php&fx=getKelompok',
            dataType: 'json',
            data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
            success:function(result){    
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            $('#inp-klp')[0].selectize.addOption([{text:result.daftar[i].kode_klp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_klp}]);  
                            $('#web_form_edit_kode_klp')[0].selectize.addOption([{text:result.daftar[i].kode_klp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_klp}]);  
                        }
                    }
                }
            }
      });
  }

  function getKategori(){
      $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Konten.php&fx=getKategori',
            dataType: 'json',
            data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
            success:function(result){    
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            $('#inp-ktg')[0].selectize.addOption([{text:result.daftar[i].kode_kategori + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_kategori}]);  
                            $('#web_form_edit_kategori')[0].selectize.addOption([{text:result.daftar[i].kode_kategori + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_kategori}]);  
                        }
                    }
                }
            }
      });
  }


  $(document).ready(function(){

      var action_html = "<a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>";

      var kode_lokasi = '<?php echo $kode_lokasi ?>';
      var dataTable = $('#table-konten').DataTable({
          'processing': true,
          'serverSide': true,
          'ajax': {
              'url': 'include_lib.php?hal=server/cms/Konten.php&fx=getKonten',
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
      
      $('.textarea-ini').wysihtml5();

      $('#saiweb_container').on('click', '.web_datatable_insert', function(){
        getHeader();
        getKelompok();
        getKategori();
        $('#web_datatable').hide();
        $('.wysihtml5-sandbox').contents().find('.wysihtml5-editor').html('');
        $('#web_form_insert').show();
        // alert("hello");
      });

      $('#saiweb_container').on('click', '.web_form_back', function(){
        var id = $(this).closest('form').attr('id');
        $('#'+id).hide();
        $('#web_datatable').show();
      });

      $('#saiweb_container').on('click', '.web_datatable_edit', function(){
        getHeader();
        getKelompok();
        getKategori();
                        // getset value
        var kode = $(this).closest('tr').find('td:eq(0)').text();

        var lokasi = '<?php echo $kode_lokasi; ?>';
        var paths='<?php echo $path."/web"; ?>';

        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Konten.php&fx=getEditData',
            dataType: 'json',
            data: {'lokasi':lokasi, 'kode':kode}, 
            success:function(res){
                // alert('id ='+res.daftar[0].id);

                if(res.status){
                    
                    $('#web_form_edit_id').val(res.daftar[0].id);
                    $('#web_form_edit_judul').val(res.daftar[0].judul);
                    $('#web_form_edit_tgl').val(res.daftar[0].tanggal);
                    $('#web_form_edit_header')[0].selectize.setValue(res.daftar[0].header);
                    $('.wysihtml5-sandbox').contents().find('.wysihtml5-editor').html(res.daftar[0].isi);
                    $('#web_form_edit_kode_klp')[0].selectize.setValue(res.daftar[0].kode_klp);
                    $('#web_form_edit_kategori')[0].selectize.setValue(res.daftar[0].kode_kategori);
                    $('#web_form_edit_tag').val(res.daftar[0].tag);
                    
                    $('#web_datatable').hide();
                    $('#web_form_edit').show();
                }
            },
            fail: function(xhr, textStatus, errorThrown){
                alert('request failed:');
            }
        });
        
        
        
      });

      $('#saiweb_container').on('submit', '#web_form_insert', function(e){
      e.preventDefault();
        var formData = new FormData(this);
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
            }

        var nik='<?php echo $nik; ?>' ;
        var kode_lokasi='<?php echo $kode_lokasi; ?>' ;

        formData.append('nik_user', nik);
        formData.append('kode_lokasi', kode_lokasi);
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Konten.php&fx=simpan',
            dataType: 'json',
            data: formData,
            contentType: false,
            cache: false,
            processData: false, 
            success:function(result){
                alert('Input data '+result.message);
                if(result.status){
                    // location.reload();
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
        
        var nik='<?php echo $nik; ?>' ;
        var kode_lokasi='<?php echo $kode_lokasi; ?>' ;

        formData.append('nik_user', nik);
        formData.append('kode_lokasi', kode_lokasi);

        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Konten.php&fx=ubah',
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
                    $('#web_datatable').show();
                    $('#web_form_edit').hide();
                }
            }
        });
      });

      $('#saiweb_container').on('click', '.web_datatable_del', function(){
            if(confirm('Apakah anda ingin menghapus data ini?')){
                var kode = $(this).closest('tr').find('td:eq(0)').text(); 
                        
                var nik='<?php echo $nik; ?>';
                var kode_lokasi='<?php echo $kode_lokasi; ?>';   
                
                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/cms/Konten.php&fx=hapus',
                    dataType: 'json',
                    data: {'id':kode,'kode_lokasi':kode_lokasi},
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

        // Replace the <textarea id="editor1"> with a CKEditor
        // instance, using default configuration.
        // CKEDITOR.replace('editor1');
        //bootstrap WYSIHTML5 - text editor
  });    
		
</script>