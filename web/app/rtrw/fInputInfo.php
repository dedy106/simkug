<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $fmain = $_SESSION['fMain'];

    if($fmain ==""){
      $fmain = "fMainMobile.php";
    }

    $periode=date('Y').date('m');

    $tmp=explode("/",$_GET['param']);
    $jenis=$tmp[0];
    $kunci=$tmp[1];
    $blok=$tmp[2];
    $kode_rumah=$tmp[3];
    $tahun=substr($periode,0,4);

    $judul="Input Info";

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $back1="";
        $backto="fMainMobile.php?hal=app/rtrw/dashRtRw.php";
        $mobile=true;
        include('back.php');
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
    }else{
        $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/dashRtRw.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
        $padding="";
        $mobile=false;
    }
?>
<div class='panel' style='<?= $padding; ?>'>
    <div class='panel-body'>
        <?=$back1?>
<div id='saiweb_container'>
    <div id='web_datatable'>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' style='border-top:none'>
            <div class='box-header' style='border-top:none'>
            <h3 class="box-title"><i class="fa fa-inbox"></i> Data Info Warga</h3> 
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
                    <td>No Bukti</td>
                    <td>Tanggal</td>
                    <td>Jenis</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  <?php
                    $sql="SELECT no_bukti,tanggal,jenis FROM rt_buku_p where kode_lokasi='".$kode_lokasi."'";
                    $rs1=execute($sql);
                    while($row1 = $rs1->FetchNextObject($toupper=false)){
                    echo"
                    <tr>
                      <td>$row1->no_bukti</td>
                      <td>$row1->tanggal</td>
                      <td>$row1->jenis</td>
                      <td>
                      <a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp;
                      <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a> &nbsp;</td>
                    </tr>
                    ";
                      }
                  ?>
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
          <div class='box' style='border-top:none'>
            <div class='box-body'>
              <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
               <a class='btn btn-default pull-right btn-form-exit web_form_back'><i class='fa fa-rotate-left'></i> Back</a>
            </div>
          </div>
          <div class='box box-warning'>
            <div class='box-body pad'>
              <div class='row' >
                <div class='form-group' style='margin-bottom:5px;'>
                  <label class='control-label col-sm-3'>Tanggal</label>
                    <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                      <div class='input-group-addon'>
                        <i class='fa fa-calendar'></i>
                      </div>
                        <input name='tanggal' class='form-control datepicker' value='<?php echo date('Y-m-d');?>'>
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Jenis</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='jenis' id='web_input_jenis'>
                        <option value='Umum'>Umum</option>
                        <option value='RW'>RW</option>
                        <option value='RT'>RT</option>
                        <option value='No Rumah'>No Rumah</option>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' hidden id='form_input_rw'>
                  <label class='control-label col-sm-3'>RW</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_kategori' id='web_input_rw'>
                      <?php
        
                      $rs2 = execute("SELECT * from lokasi where kode_lokasi = '".$kode_lokasi."'");
                      while($row2 = $rs2->FetchNextObject($toupper = false)){
                          echo "<option value='".$row2->kode_lokasi."'>".$row2->kode_lokasi."</option>";
                      }
                      ?>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' hidden id='form_input_rt'>
                  <label class='control-label col-sm-3'>RT</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_kategori' id='web_input_rt'>
                      <?php
        
                      $rs2 = execute("SELECT * from pp where kode_lokasi = '".$kode_lokasi."' ");
                      while($row2 = $rs2->FetchNextObject($toupper = false)){
                          echo "<option value='".$row2->kode_pp."'>".$row2->kode_pp." - ".$row2->nama."</option>";
                      }
                      ?>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' hidden id='form_input_no_rumah'>
                  <label class='control-label col-sm-3'>No Rumah</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_kategori' id='web_input_no_rumah'>
                      <?php
                        
                        $rs2 = execute("SELECT * from rt_rumah where kode_lokasi = '".$kode_lokasi."' ");
                        while($row2 = $rs2->FetchNextObject($toupper = false)){
                            echo "<option value='".$row2->kode_rumah."'>".$row2->kode_rumah." - ".$row2->keterangan."</option>";
                        }
                      ?>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Foto</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input name='foto' type='file' accept='image/png, image/jpg, image/jpeg'>
                        </div>
                    </div>
               </div>
               <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>File Dokumen</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input name='file_dok' type='file'>
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
            </div>
          </div>
        </div>
      </div>
    </form>
    <!-- FORM EDIT -->
    <form id='web_form_edit' hidden>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' style='border-top:none'>
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
                    <label class='control-label col-sm-3'>No Bukti</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                        <input type='text' name='id' class='form-control' maxlength='200' readonly id='web_form_edit_id'>
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
                        <input name='tanggal' class='form-control datepicker' id='web_form_edit_tgl'>
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Jenis</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='jenis' id='web_form_edit_jenis'>
                        <option value='Umum'>Umum</option>
                        <option value='RW'>RW</option>
                        <option value='RT'>RT</option>
                        <option value='No Rumah'>No Rumah</option>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row' >
                <div class='form-group' id='form_edit_rw'>
                  <label class='control-label col-sm-3'>RW</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_rw' id='web_form_edit_rw'>
                      <?php
        
                      $rs2 = execute("SELECT * from lokasi where kode_lokasi = '".$kode_lokasi."'");
                      while($row2 = $rs2->FetchNextObject($toupper = false)){
                          echo "<option value='".$row2->kode_lokasi."'>".$row2->kode_lokasi."</option>";
                      }
                      ?>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' id='form_edit_rt'>
                  <label class='control-label col-sm-3'>RT</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_rt' id='web_form_edit_rt'>
                      <?php
        
                      $rs2 = execute("SELECT * from pp where kode_lokasi = '".$kode_lokasi."' ");
                      while($row2 = $rs2->FetchNextObject($toupper = false)){
                          echo "<option value='".$row2->kode_pp."'>".$row2->kode_pp." - ".$row2->nama."</option>";
                      }
                      ?>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group' id='form_edit_no_rumah'>
                  <label class='control-label col-sm-3'>No Rumah</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='no_rumah' id='web_form_edit_no_rumah'>
                      <?php
        
                          $rs2 = execute("SELECT * from rt_rumah where kode_lokasi = '".$kode_lokasi."' ");
                          while($row2 = $rs2->FetchNextObject($toupper = false)){
                              echo "<option value='".$row2->kode_rumah."'>".$row2->kode_rumah." - ".$row2->keterangan."</option>";
                          }
                      ?>
                      </select>    
                    </div>
                </div>
              </div>
              <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Foto</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input name='foto' type='file' accept='image/png, image/jpg, image/jpeg'>
                        </div>
                    </div>
               </div>
               <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>File Dokumen</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input name='file_dok' type='file'>
                        </div>
                    </div>
               </div>
              <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Keterangan</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <textarea class="textarea-ini" placeholder="Place some text here"
                             style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"  name='keterangan' id='web_form_edit_ket' ></textarea>
                        </div>
                    </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </form>
</div>
</div>
</div>

<script>
  var table2 = $('#table-konten').DataTable({
                // 'fixedHeader': true,
                'scrollY': '300px',
                // 'scrollX': '0px',
                'scrollCollapse': true,
                'order': [[ 0, 'asc' ]]
            });
  table2.columns.adjust().draw();

  $('#saiweb_container').on('click', '.web_datatable_insert', function(){
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
                    // getset value
     var kode = $(this).closest('tr').find('td:eq(0)').text();
     var lokasi = '<?php echo $kode_lokasi; ?>';
     var paths='<?php echo $path."/web"; ?>';

     $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=getEditInfo',
        dataType: 'json',
        data: {'lokasi':lokasi, 'kode':kode},
        success:function(res){
            // alert('id ='+res.daftar[0].id);

            if(res.status){
               
                var path_file=paths+res.daftar[0].file_gambar;
                
                $('#preview').html("<img src='"+path_file+"' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'><br><br><center><b>Url:</b> <i>"+path_file+"</i></center>");
                            

                $('#web_form_edit_id').val(res.daftar[0].no_bukti);
                // $('#web_form_edit_file').val(res.daftar[0].file_gambar);
                $('#web_form_edit_tgl').val(res.daftar[0].tanggal);
                $('.wysihtml5-sandbox').contents().find('.wysihtml5-editor').html(res.daftar[0].keterangan);
                $('#web_form_edit_jenis')[0].selectize.setValue(res.daftar[0].jenis);
                $('#web_form_edit_rw')[0].selectize.setValue(res.daftar[0].rw);
                $('#web_form_edit_rt')[0].selectize.setValue(res.daftar[0].rt);
        
                $('#web_form_edit_no_rumah')[0].selectize.setValue(res.daftar[0].no_rumah);

                if(res.daftar[0].jenis == "RW"){
                    $('#form_edit_rw').show();
                    $('#form_edit_rt').hide();
                    $('#form_edit_no_rumah').hide();
                }else if(res.daftar[0].jenis == "RT"){
                    $('#form_edit_rw').hide();
                    $('#form_edit_rt').show();
                    $('#form_edit_no_rumah').hide();
                }else if(res.daftar[0].jenis == "No Rumah"){
                    $('#form_edit_rw').hide();
                    $('#form_edit_rt').hide();
                    $('#form_edit_no_rumah').show();
                }else{
                    $('#form_edit_rw').hide();
                    $('#form_edit_rt').hide();
                    $('#form_edit_no_rumah').hide();
                }
                
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
    var kode_pp='<?php echo $kode_pp; ?>' ;

    formData.append('nik', nik);
    formData.append('kode_lokasi', kode_lokasi);
    formData.append('kode_pp', kode_pp);
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=simpanInfo',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Input data '+result.message);
            if(result.status){
                location.reload();
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
        url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=ubahInfo',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Update data '+result.message);
            if(result.status){
                location.reload();
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
                url: 'include_lib.php?hal=server/rtrw/RtRw.php&fx=hapusInfo',
                dataType: 'json',
                data: {'id':kode,'kode_lokasi':kode_lokasi},
                success:function(result){
                    alert('Penghapusan data '+result.message);
                    if(result.status){
                        location.reload();
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

    $('#web_input_jenis').change(function(e){
       e.preventDefault();
       var jenis= $('#web_input_jenis').val();

       if(jenis == "RW"){
          $('#form_input_rw').show();
          $('#form_input_rt').hide();
          $('#form_input_no_rumah').hide();
       }
       else if(jenis == "RT"){
          $('#form_input_rw').hide();
          $('#form_input_rt').show();
          $('#form_input_no_rumah').hide();
       }else if(jenis == "No Rumah"){
          $('#form_input_rw').hide();
          $('#form_input_rt').hide();
          $('#form_input_no_rumah').show();
       }
    });
		
</script>

