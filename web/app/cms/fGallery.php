<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	
?>
<div id='saiweb_container'>
    <div id='web_datatable'>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' >
            <div class='box-header'>
            <h3 class="box-title"><i class="fa fa-inbox"></i> Data Galeri</h3> 
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
                    <td>Nama</td>
                    <td>Jenis</td>
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
                        <label class='control-label col-sm-3'>File</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input name='file_gambar' type='file' accept='image/png, image/jpg, image/jpeg'>
                        </div>
                    </div>
               </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Nama</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nama' maxlength='200' class='form-control '>
                     </div>
                </div>
              </div>
              <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Keterangan</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <textarea class="textarea-ini" placeholder="Place some text here"
                             style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"  name='keterangan' ></textarea>
                        </div>
                    </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Untuk</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='jenis'>
                        <option value='Galeri'>Galeri</option>
                        <option value='Konten'>Konten</option>
                        <option value='Slider'>Slider</option>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Kategori</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_kategori' id='inp-ktg'>
                      <option value='' disabled>Pilih Kategori</option>
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
                        <label class='control-label col-sm-3'>Preview</label>
                        <div class='col-sm-9' style='margin-bottom:5px;' id='preview'>
                            <!-- <video controls  style='min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'><source src='".base_url($file_path)."' type='".$jenis."'></video>
                            <img src='".base_url($file_path)."' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'> -->
                            
                        </div>
                    </div>
                </div>
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
                        <label class='control-label col-sm-3'>File</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input name='file_gambar' type='file' accept='image/png, image/jpg, image/jpeg,video/mp4, video/avi' id='web_form_edit_file'>
                        </div>
                    </div>
               </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Nama</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nama' maxlength='200' class='form-control' id='web_form_edit_nama'>
                     </div>
                </div>
              </div>
              <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Keterangan</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <textarea class="textarea-ini" placeholder="Place some text here"
                             style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;" name='keterangan' id='web_form_edit_ket'></textarea>
                        </div>
                    </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Untuk</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='jenis' id='web_form_edit_jenis'>
                        <option value='Galeri'>Galeri</option>
                        <option value='Konten'>Konten</option>
                        <option value='Slider'>Slider</option>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Kategori</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_kategori' id='web_form_edit_ktg'>
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
 
  function getKategori(){
      $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Galeri.php&fx=getKtg',
            dataType: 'json',
            data: {'kode_lokasi':'<?php echo $kode_lokasi ?>'},
            success:function(result){    
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            $('#inp-ktg')[0].selectize.addOption([{text:result.daftar[i].kode_ktg + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_ktg}]);  
                            $('#web_form_edit_ktg')[0].selectize.addOption([{text:result.daftar[i].kode_ktg + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_ktg}]);  
                        }
                    }
                }
            }
      });
  }

  $(document).ready(function(){

      // init();

      var action_html = "<a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>";

      var kode_lokasi = '<?php echo $kode_lokasi ?>';
      var dataTable = $('#table-konten').DataTable({
          'processing': true,
          'serverSide': true,
          'ajax': {
              'url': 'include_lib.php?hal=server/cms/Galeri.php&fx=getGaleri',
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
        
        getKategori();
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
                        // getset value
        
        getKategori();
        var kode = $(this).closest('tr').find('td:eq(0)').text();
        var lokasi = '<?php echo $kode_lokasi; ?>';
        var paths='<?php echo $path."/web"; ?>';
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Galeri.php&fx=getEditGaleri',
            dataType: 'json',
            data: {'lokasi':lokasi, 'kode':kode},
            success:function(res){
                // alert('id ='+res.daftar[0].id);

                if(res.status){
                  
                    var path_file=paths+res.daftar[0].file_gambar;

                    if(res.daftar[0].file_type == "video"){
                        $('#preview').html("<video controls  style='min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'><source src='"+path_file+"' type='"+res.daftar[0].file_type+"'></video><br><br><center><b>Url:</b> <i>"+path_file+"</i></center>");
                    }else{
                        $('#preview').html("<img src='"+path_file+"' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'><br><br><center><b>Url:</b> <i>"+path_file+"</i></center>");
                    }             

                    $('#web_form_edit_id').val(res.daftar[0].id);
                    // $('#web_form_edit_file').val(res.daftar[0].file_gambar);
                    $('#web_form_edit_nama').val(res.daftar[0].nama);
                    $('.wysihtml5-sandbox').contents().find('.wysihtml5-editor').html(res.daftar[0].isi);
                    $('#web_form_edit_jenis')[0].selectize.setValue(res.daftar[0].jenis);
                    $('#web_form_edit_ktg')[0].selectize.setValue(res.daftar[0].kode_kategori);
                    
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

        formData.append('nik', nik);
        formData.append('kode_lokasi', kode_lokasi);
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Galeri.php&fx=simpanGaleri',
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

        formData.append('nik', nik);
        formData.append('kode_lokasi', kode_lokasi);
        
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/cms/Galeri.php&fx=ubahGaleri',
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
                var kode_lokasi='<?php echo $kode_lokasi; ?>' ;

                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/cms/Galeri.php&fx=hapusGaleri',
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
        $('.textarea-ini').wysihtml5();

  });
		
</script>

