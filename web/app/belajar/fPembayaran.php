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
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='hidden' id='web_form_edit_nt' name='no_bayar' class='form-control' readonly>
                    </div>
                </div>
              </div>
             <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>NIM</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class="form-control selectize" name="nim" id="web_form_edit_nim">
                        
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

<!-- Form Modal -->
<div class='modal' id='sai-grid-modal-byr' tabindex='-1' role='dialog'>
        <div class='modal-dialog' role='document'>
            <div class='modal-content'>
                <form id='sai-form-edit-bayar'>
                    <div class='modal-header'>
                        <h5 class='modal-title'>Edit Nilai Bayar</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                        </button>
                    </div>
                    <div class='modal-body'>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>No Tagihan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' class='form-control' id='modal-no-tagihan' maxlength='10' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Keterangan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' class='form-control' id='modal-keterangan' maxlength='10' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Nilai Tagihan</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' class='form-control currency' maxlength='100' id='modal-nil-tgh' readonly>
                                </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Nilai Bayar</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' class='form-control currency' maxlength='100' id='modal-nil-pbyr'>
                                </div>
                            </div>
                        </div>
                      </div>
                     <div class='modal-footer'>
                        <button type='submit' class='btn btn-primary'>Simpan</button> 
                        <button type='button' class='btn btn-default' data-dismiss='modal'>Close</button>
                    </div>
                </form>
            </div>
          </div>
      </div>

<script>

function toNilai(str_num){
    var parts = str_num.split('.');
    number = parts.join('');
    number = number.replace('Rp', '');
    // number = number.replace(',', '.');
    return +number;
}

function sepNum(x){
    var num = parseFloat(x).toFixed(0);
    var parts = num.toString().split(".");
    var len = num.toString().length;
    // parts[1] = parts[1]/(Math.pow(10, len));
    parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,"$1.");
    return parts.join(",");
}

function toRp(num){
    if(num < 0){
        return "("+sepNum(num * -1)+")";
    }else{
        return sepNum(num);
    }
}

function toNilai(str_num){
    var parts = str_num.split('.');
    number = parts.join('');
    number = number.replace('Rp', '');
    // number = number.replace(',', '.');
    return +number;
}
 
 function getSiswa(nim=null){
    $.ajax({
        type: 'POST',
        url: '<?=$root_ser?>/Pembayaran.php?fx=getSiswa',
        dataType: 'json',
        data: {'kode_lokasi':'<?=$kode_lokasi?>','nim':nim},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                  $('#web_form_edit_nim')[0].selectize.clearOptions();
                    for(i=0;i<result.daftar.length;i++){
                        $('#web_form_edit_nim')[0].selectize.addOption([{text:result.daftar[i].nim + ' - ' + result.daftar[i].nama, value:result.daftar[i].nim}]);  
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
            'url': '<?=$root_ser?>/Pembayaran.php?fx=getPembayaran',
            'data': {'kode_lokasi':kode_lokasi},
            'type': 'POST',
            'dataSrc' : function(json) {
                return json.data;   
            }
        },
        'columnDefs': [
            {'targets': 5 ,'defaultContent': action_html }
        ]
    });

  $('#saiweb_container').on('click', '.web_datatable_insert', function(){
    $('#web_datatable').hide();
    getSiswa();
    $('table#sai-grid-table-tagihan tr.sai-grid-input-row').remove();
    $('#web_form_edit_nt').val('');
    $('#web_form_edit_nim')[0].selectize.setValue('');
    $('#web_form_edit_tanggal').val('');
    $('#web_form_edit_ket').val('');
    $('#web_form_insert').show();
    
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
            url: '<?=$root_ser?>/Pembayaran.php?fx=SimpanPembayaran',
            dataType: 'json',
            data: formData,
            contentType: false,
            cache: false,
            processData: false,
            success: function(response) {
                alert('Input data '+response.message);
                    if(response.status){
                        dataTable.ajax.reload();
                        $('#web_datatable').show();
                        $('#web_form_insert').hide();
                    }
            },
            fail : function(xhr, textStatus, errorThrown) {
                alert('request failed:'+textStatus);
            }
        });
  });

  $('#web_form_edit_nim').on('change', function(){
     var nim = $('#web_form_edit_nim').val();
     var no_byr = $('#web_form_edit_nt').val();
     if(no_byr == ""){
        $.ajax({
            type: 'POST',
            url: '<?=$root_ser?>/Pembayaran.php?fx=getTagihanNIM',
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
                            "<input type='hidden' name='no_tagihan[]' value='"+baris.no_tagihan+"' readonly class='form-control no-tgh'>"+
                            "</td>"+
                            "<td>"+baris.keterangan+
                            "<input type='hidden' value='"+baris.keterangan+"' readonly class='form-control ket'>"+
                            "</td>"+
                            "<td>"+toRp(baris.sisa_tagihan)+
                            "<input type='hidden' name='nilai[]' value='"+baris.sisa_tagihan+"' readonly class='form-control nil-tgh'>"+
                            "</td>"+
                            "<td>"+toRp(baris.sisa_tagihan)+"<input type='hidden' name='bayar[]' class='form-control nil-pbyr' maxlength='100' value='"+baris.sisa_tagihan+"' >"+"</td>"+
                            "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-edit-pbyr' data-edit='1' ><i class='fa fa-pencil'></i></a></td>"+
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
     }
  });

  $('#sai-form-edit-bayar').submit(function(e){
        e.preventDefault();
        
        var no_tagihan = $('#modal-no-tagihan').val();
        var ket = $('#modal-keterangan').val();
        var tgh = $('#modal-nil-tgh').val();
        var byr = $('#modal-nil-pbyr').val();
        nil_tgh=toNilai(tgh);
        nil_byr=toNilai(byr);

        var row = 
        "<td>"+no_tagihan+
        "<input type='hidden' name='no_tagihan[]' value='"+no_tagihan+"' readonly class='form-control no-tgh'>"+
        "</td>"+
        "<td>"+ket+
        "<input type='hidden' value='"+ket+"' readonly class='form-control ket'>"+
        "</td>"+
        "<td>"+toRp(nil_tgh)+
        "<input type='hidden' name='nilai[]' value='"+nil_tgh+"' readonly class='form-control nil-tgh'>"+
        "</td>"+
        "<td>"+toRp(nil_byr)+"<input type='hidden' name='bayar[]' class='form-control nil-pbyr' maxlength='100' value='"+nil_byr+"' >"+"</td>"+
        "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-edit-pbyr' data-edit='1' ><i class='fa fa-pencil'></i></a></td>";

        if(nil_byr > nil_tgh){
            alert('Nilai bayar tidak boleh lebih dari nilai tagihan');
        }else{
            $('.set-selected').closest('tr').text('');
            $('.set-selected').closest('tr').append(row);
            
            $('#sai-grid-modal-byr').modal('hide');
        }
       
        
    });

    $('#saiweb_container').on('click', '#sai-grid-edit-pbyr', function(){
        $('.sai-grid-input-row').removeClass('set-selected');
        $(this).closest('tr').addClass('set-selected');
        
        var no_tagihan= $(this).closest('tr').find('.no-tgh').val();
        var ket = $(this).closest('tr').find('.ket').val();
        var nil_tagihan= $(this).closest('tr').find('.nil-tgh').val();
        var nil_bayar= $(this).closest('tr').find('.nil-pbyr').val();
        
        $('#modal-no-tagihan').val(no_tagihan);
        $('#modal-keterangan').val(ket);
        $('#modal-nil-tgh').val(nil_tagihan);
        $('#modal-nil-pbyr').val(nil_bayar);
        $('#sai-grid-modal-byr').modal('show');
       
    });

    $('#saiweb_container').on('click', '.web_datatable_del', function(){
          if(confirm('Apakah anda ingin menghapus data ini?')){
              var bayar = $(this).closest('tr').find('td:eq(0)').text();
              $.ajax({
                  type: 'POST',
                  url: '<?=$root_ser?>/Pembayaran.php?fx=hapusPembayaran',
                  dataType: 'json',
                  data: {'no_bayar':bayar},
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

    $('#saiweb_container').on('click', '.web_datatable_edit', function(){
                      // getset value
        var bayar = $(this).closest('tr').find('td:eq(0)').text();
        var nim = $(this).closest('tr').find('td:eq(2)').text();
        getSiswa(nim);

	      $.ajax({
            type: 'POST',
            url: '<?=$root_ser?>/Pembayaran.php?fx=getEditPembayaran',
            dataType: 'json',
            data: {'kode':bayar,'kode_lokasi':'99','nim':nim},
            success:function(res){
                if(res.status){        
                    $('#web_form_edit_nt').val(res.daftar[0].no_bayar);
                    $('#web_form_edit_nim')[0].selectize.setValue(res.daftar[0].nim);
                    $('#web_form_edit_tanggal').val(res.daftar[0].tanggal);
                    $('#web_form_edit_ket').val(res.daftar[0].keterangan);;

                    $('#web_datatable').hide();
                    $('#web_form_insert').show();
                  
                    $('table#sai-grid-table-tagihan tr.sai-grid-input-row').remove();

                    var row = "";
                    var no=1;
                    for(var i=0;i<res.daftar2.length;i++){
                        var baris=res.daftar2[i];
                        row += "<tr class='sai-grid-input-row'>"+
                            "<td>"+baris.no_tagihan+
                            "<input type='hidden' name='no_tagihan[]' value='"+baris.no_tagihan+"' readonly class='form-control no-tgh'>"+
                            "</td>"+
                            "<td>"+baris.keterangan+
                            "<input type='hidden' value='"+baris.keterangan+"' readonly class='form-control ket'>"+
                            "</td>"+
                            "<td>"+toRp(baris.sisa_tagihan)+
                            "<input type='hidden' name='nilai[]' value='"+baris.sisa_tagihan+"' readonly class='form-control nil-tgh'>"+
                            "</td>"+
                            "<td>"+toRp(baris.bayar)+"<input type='hidden' name='bayar[]' class='form-control nil-pbyr' maxlength='100' value='"+baris.bayar+"' >"+"</td>"+
                            "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-edit-pbyr' data-edit='1' ><i class='fa fa-pencil'></i></a></td>"+
                            "</tr>";
                        no++;
                    }
                    $('#sai-grid-table-tagihan').append(row);
                        
                }
            },
            fail: function(xhr, textStatus, errorThrown){
                alert('request failed:');
            }
        });
    });

    $(':input[type="number"], .currency').on('keydown', function (e){
        var value = String.fromCharCode(e.which) || e.key;

        if (    !/[0-9\.]/.test(value) //angka dan titik
                && e.which != 190 // .
                && e.which != 116 // F5
                && e.which != 8   // backspace
                && e.which != 9   // tab
                && e.which != 13   // enter
                && e.which != 46  // delete
                && (e.which < 37 || e.which > 40) // arah 
                && (e.keyCode < 96 || e.keyCode > 105) // dan angka dari numpad
            ){
                e.preventDefault();
                return false;
        }
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

 });
</script>