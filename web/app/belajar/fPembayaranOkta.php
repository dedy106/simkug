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
           <h3 class="box-title"><i class="fa fa-inbox"></i> Data Pembayaran</h3> 
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
                   <td>No Pembayaran</td>
                   <td>Tanggal</td>
                   <td>NIM</td>
                   <td>Keterangan</td>
                   <td>Periode</td>
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
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='hidden' id='web_form_edit_nt' name='no_bayar' class='form-control' readonly>
                    </div>
                </div>
              </div>
             <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>NIM</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class="form-control" name="nim" id="web_form_edit_nim">
                        
                      </select>
                     </div>
                </div>
              </div>
             <div class='row' >
                 <div class='form-group' style='margin-bottom:5px;'>
                   <label class='control-label col-sm-3'>Tanggal </label>
                     <div class='input-group date col-sm-9' style='padding-right:15px; padding-left:15px;'>
                      <div class='input-group-addon'>
                       <i class='fa fa-calendar'></i>
                      </div>
                      <input autocomplete="off" name='tanggal' class='form-control datepicker' id='web_form_edit_tanggal'>
                     </div>
                 </div>
              </div>
              <div class="row">
                <div class="form-group">
                  <label class='control-label col-sm-3'>Keterangan</label>
                  <div class="col-sm-9" style="margin-bottom: 5px;">
                    <input type='text' class='form-control' name='keterangan' id='web_form_edit_ket'>
                  </div>
                </div>
              </div>
              <hr style='margin-bottom:10px;'>
               <div class='row'>
              <div class='col-md-12 sai-container-overflow'>
              <table class='table table-striped table-bordered' id='sai-grid-table-tagihan'>
              <tr>
              <th>No Tagihan</th>
              <th>Keterangan</th>
              <th>Nilai Tagihan</th>
              <th>Nilai Bayar</th>
              </tr>
              </table>
              </div>
              </div>         
           </div>
         </div>
       </div>
     </div>
   </form>
</div>
<script>
 
 $(document).ready(function(){

    //var action_html = "<a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>";

    var kode_lokasi = '<?php echo $kode_lokasi ?>';
    var dataTable = $('#table-konten').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            'url': 'include_lib.php?hal=server/belajar/PembayaranOkta.php&fx=getPembayaran',
            'data': {'kode_lokasi':kode_lokasi},
            'type': 'POST',
            'dataSrc' : function(json) {
                return json.data;   
            }
        },
        'columnDefs': [
            {'targets': 4 /*data: null 'defaultContent': action_html*/ }
        ]
    });

  $('#saiweb_container').on('click', '.web_datatable_insert', function(){
    $('#web_datatable').hide();
    $('#web_form_insert').show();
    // alert("hello");
    $.ajax({
      url: 'include_lib.php?hal=server/belajar/PembayaranOkta.php&fx=getSiswa',
      dataType: 'json',
      success: function(response){
        if(response.status == true){
          var row = "";
          var i;
          for(i=0;i<response.siswa.length;i++){
            var baris = response.siswa[i];
            row += "<option value='"+baris.nim+"'>"+baris.nama+"</option>";
          }
          $('#web_form_edit_nim').html(row);
        }
        $('#web_form_edit_nim').selectize({
        create: true,
        sortField: 'text'
        });
      }
    });
    
});

  $('#saiweb_container').on('click', '.web_form_back', function(){
      var id = $(this).closest('form').attr('id');
      $('#'+id).hide();
      $('#web_datatable').show();
  });

  $('#saiweb_container').on('submit', '#web_form_insert', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    for(var pair of formData.entries()){
      console.log(pair[0]+ ', '+ pair[1]); 
    }

    var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
    formData.append('kode_lokasi', kode_lokasi);
    $.ajax({
      method: 'POST',
      url: 'include_lib.php?hal=server/belajar/PembayaranOkta.php&fx=SimpanPembayaran',
      dataType: 'json',
      data: formData,
      contentType: false,
      cache: false,
      processData: false,
      success: function(response) {
        alert('Input data '+response.message);
            if(response.status){
                location.reload();
            }
      },
      fail : function(xhr, textStatus, errorThrown) {
        alert('request failed:'+textStatus);
      }
    });

  });

  $('#web_form_edit_nim').on('change', function(){
     var nim = $('#web_form_edit_nim').val();
     //alert(nim);
     $.ajax({
      type: 'POST',
      url: 'include_lib.php?hal=server/belajar/PembayaranOkta.php&fx=getTagihanNIM',
      dataType: 'json',
      data: {'nim':nim},
      success: function(response){
        if(response.status == true){
           $('table#sai-grid-table-tagihan tr.sai-grid-input-row').remove();
          var row = "";
          for(var i=0;i<response.data.length;i++){
              var baris = response.data[i];

              row += "<tr class='sai-grid-input-row'>"+
                      "<td>"+baris.no_tagihan+
                      "<input type='hidden' name='no_tagihan[]' value='"+baris.no_tagihan+"' readonly class='form-control set-no_urut'>"+
                      "</td>"+
                      "<td>"+baris.keterangan+
                      "<input type='hidden' value='"+baris.keterangan+"' readonly class='form-control'>"+
                      "</td>"+
                      "<td>"+baris.nilai+
                      "<input type='hidden' name='nilai[]' value='"+baris.nilai+"' readonly class='form-control'>"+
                      "</td>"+
                      "<td>"+"<input type='text' name='bayar[]' value='"+baris.bayar+"' class='form-control currency' maxlength='100'>"+"</td>"+
                      "</tr>";
          }
          $('#sai-grid-table-tagihan').append(row);
          //console.log(response);
        }
      },
      fail: function(xhr, textStatus, errorThrown){
        alert('request failed:');
      }
     });
  });
  });

 $('.currency').inputmask("numeric", {
        radixPoint: ",",
        groupSeparator: ".",
        digits: 2,
        autoGroup: true,
        rightAlign: true,
        oncleared: function () { self.Value(''); }
    });
    $('.datepicker').datepicker({
        autoclose: true,
        format: 'yyyy-mm-dd'
    });
</script>