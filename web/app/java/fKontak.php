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
           <h3 class="box-title"><i class="fa fa-inbox"></i> Data Kontak</h3> 
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
                   <td>Judul</td>
                   <td>Status</td>
                   <td>Action</td>
                 </tr>
               </thead>
               <tbody>
                 <?php
                   $sql="SELECT id, judul, CASE WHEN flag_aktif='1' THEN 'Aktif' ELSE 'Tidak Aktif' end as status FROM lab_konten_kontak as status where kode_lokasi='".$kode_lokasi."'";

                   $rs1=execute($sql);
                   while($row1 = $rs1->FetchNextObject($toupper=false)){
                   echo"
                   <tr>
                     <td>$row1->id</td>
                     <td>$row1->judul</td>
                     <td>$row1->status</td>
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
                 <label class='control-label col-sm-3'>Judul</label>
                   <div class='col-sm-9' style='margin-bottom:5px;'>
                     <input type='text' name='judul' maxlength='200' class='form-control '>
                    </div>
               </div>
             </div>
             <div class='row'>
                   <div class='form-group'>
                       <label class='control-label col-sm-3'>Isi</label>
                       <div class='col-sm-9' style='margin-bottom:5px;'>
                            <textarea class="textarea-ini" placeholder="Place some text here" name='keterangan'
                             style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;"></textarea>
                       </div>
                   </div>
             </div>
             <div class='row'>
               <div class='form-group'>
                 <label class='control-label col-sm-3'>Latitude</label>
                   <div class='col-sm-9' style='margin-bottom:5px;'>
                     <input type='text' name='latitude' maxlength='200' class='form-control '>
                  </div>
               </div>
             </div>
             <div class='row'>
               <div class='form-group'>
                 <label class='control-label col-sm-3'>Longitude</label>
                   <div class='col-sm-9' style='margin-bottom:5px;'>
                     <input type='text' name='longitude' maxlength='200' class='form-control '>
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
                     <input type='text' name='judul' maxlength='200' class='form-control' id='web_form_edit_judul'>
                    </div>
               </div>
             </div>
             <div class='row'>
                   <div class='form-group'>
                       <label class='control-label col-sm-3'>Isi</label>
                       <div class='col-sm-9' style='margin-bottom:5px;'>
                            <textarea class="textarea-ini" placeholder="Place some text here" name='keterangan'
                             style="width: 100%; height: 200px; font-size: 14px; line-height: 18px; border: 1px solid #dddddd; padding: 10px;" id='web_form_edit_ket'></textarea>
                       </div>
                   </div>
             </div>
             <div class='row'>
               <div class='form-group'>
                 <label class='control-label col-sm-3'>Latitude</label>
                   <div class='col-sm-9' style='margin-bottom:5px;'>
                     <input type='text' name='latitude' maxlength='200' class='form-control' id='web_form_edit_latitude'>
                  </div>
               </div>
             </div>
             <div class='row'>
               <div class='form-group'>
                 <label class='control-label col-sm-3'>Longitude</label>
                   <div class='col-sm-9' style='margin-bottom:5px;'>
                     <input type='text' name='longitude' maxlength='200' class='form-control' id='web_form_edit_longitude'>
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
    var nik='<?php echo $nik; ?>' ;
    var kode_lokasi='<?php echo $kode_lokasi; ?>' ;

    $.ajax({
       type: 'POST',
       url: 'include_lib.php?hal=server/java/Java.php&fx=getEditKontak',
       dataType: 'json',
       data: {'kode':kode,'nik':nik,'kode_lokasi':kode_lokasi},
       success:function(res){
           // alert('id ='+res.daftar[0].id);

           if(res.status){
               
               $('#web_form_edit_id').val(res.daftar[0].id);
               $('#web_form_edit_judul').val(res.daftar[0].judul);
               $('.wysihtml5-sandbox').contents().find('.wysihtml5-editor').html(res.daftar[0].isi);
               $('#web_form_edit_latitude').val(res.daftar[0].latitude);
               $('#web_form_edit_longitude').val(res.daftar[0].longitude);
               
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
       url: 'include_lib.php?hal=server/java/Java.php&fx=simpanKontak',
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

   formData.append('nik_user', nik);
   formData.append('kode_lokasi', kode_lokasi);
   
   $.ajax({
       type: 'POST',
       url: 'include_lib.php?hal=server/java/Java.php&fx=ubahKontak',
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
           var kode_lokasi = '<?php echo $kode_lokasi; ?>';        
           
           $.ajax({
               type: 'POST',
               url: 'include_lib.php?hal=server/java/Java.php&fx=hapusKontak',
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
       
</script>