<?php
$kode_lokasi=$_SESSION['lokasi'];
?>
<div id='saiweb_container'>
   <div id='web_datatable'>
     <div class='row'>
       <div class='col-xs-12'>
         <div class='box' >
           <div class='box-header'>
           <h3 class="box-title"><i class="fa fa-inbox"></i> Data Tagihan</h3> 
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
                   <td>No Tagihan</td>
                   <td>NIM</td>
                   <td>Tanggal</td>
                   <td>Keterangan</td>
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
                      <input type='hidden' id='web_form_edit_nt' name='no_tagihan' class='form-control' readonly>
                    </div>
                </div>
              </div>
             <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>NIM</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nim' id='web_form_edit_nim' class='form-control'>
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
                      <input name='tanggal' class='form-control datepicker' id='web_form_edit_tanggal'>
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
              <div class='row'>
                <div class='form-group'>
                <a href='#' class='btn btn-primary sai-btn pull-left' id='sai-grid-add-tagihan' data-edit='0' style='margin-left: 15px;'><i class='fa fa-plus'> Tambah Tagihan </i></a>
                </div>                                                
              </div>
              <hr style='margin-bottom:10px;'>
               <div class='row'>
                <div class='col-md-12 sai-container-overflow'>
                    <table class='table table-striped table-bordered' id='sai-grid-table-tagihan'>
                        <tr>
                            <th>No</th>
                            <th>Kode Jenis Tagihan</th>
                            <th>Jenis Tagihan</th>
                            <th>Nilai</th>
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
    <div class='modal' id='sai-grid-modal-tagihan' tabindex='-1' role='dialog'>
        <div class='modal-dialog' role='document'>
            <div class='modal-content'>
                <form id='sai-grid-table-form-tagihan'>
                    <div class='modal-header'>
                        <h5 class='modal-title'>Input Data Tagihan</h5>
                        <button type='button' class='close' data-dismiss='modal' aria-label='Close'>
                        </button>
                    </div>
                    <div class='modal-body'>
                        <div class='row' >
                            <div class='form-group'>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='hidden' name='id_edit' class='form-control' id='modal-tagihan-id' maxlength='10'>
                                </div>
                            </div>
                        </div>
                        <div class='row'>
                            <div class='form-group'>
                              <label class='control-label col-sm-3'>Kode Jenis Tagihan</label>
                              <div class='col-sm-9' style='margin-bottom:5px;'>
                                  <select class='form-control selectize' name='kode_jenis' id='web-input-tagihan'>
                                  </select>    
                              </div>
                            </div>
                        </div>
                        <div class='row' >
                            <div class='form-group'>
                                <label class='control-label col-sm-3'>Nilai</label>
                                <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input type='text' name='nilai' class='form-control currency' maxlength='100' id='web-input-nilai'>
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

function getJenis(){
    $.ajax({
        type: 'POST',
        url: '<?=$root_ser?>/Tagihan.php?fx=getJenis',
        dataType: 'json',
        data: {'kode_lokasi':'<?=$kode_lokasi?>'},
        success:function(result){    
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                        $('#web-input-tagihan')[0].selectize.addOption([{text:result.daftar[i].kode_jenis + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_jenis}]);  
                    }
                }
            }
        }
    });
}

// function getSiswa(){
//     $.ajax({
//         type: 'POST',
//         url: '<?=$root_ser?>/Tagihan.php?fx=getSiswa',
//         dataType: 'json',
//         data: {'kode_lokasi':'99'},
//         success:function(result){    
//             if(result.status){
//                 if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
//                     for(i=0;i<result.daftar.length;i++){
//                         $('#web-input-nis')[0].selectize.addOption([{text:result.daftar[i].kode_jenis + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_jenis}]);  
//                     }
//                 }
//             }
//         }
//     });
// }

$(document).ready(function(){

    var action_html = "<a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>";

    var kode_lokasi = '<?=$kode_lokasi ?>';
    var dataTable = $('#table-konten').DataTable({
        'processing': true,
        'serverSide': true,
        'ajax': {
            'url': '<?=$root_ser?>/Tagihan.php?fx=getTagihan',
            'data': {'kode_lokasi':kode_lokasi},
            'type': 'POST',
            'dataSrc' : function(json) {
                return json.data;   
            }
        },
        'columnDefs': [
            {'targets': 4, data: null, 'defaultContent': action_html }
        ]
    });

	
    $('#saiweb_container').on('click', '.web_datatable_insert', function(){
        $('#web_datatable').hide();
        $('#web_form_edit_nt').val('');
        $('#web_form_edit_nim').val('');
        $('#web_form_edit_tanggal').val('');
        $('#web_form_edit_ket').val('');
        
        $('table#sai-grid-table-tagihan tr.sai-grid-input-row').remove();
        getJenis();
        $('#web_form_insert').show();
    });

    $('#saiweb_container').on('click', '.web_form_back', function(){
        var id = $(this).closest('form').attr('id');
        $('#'+id).hide();
        $('#web_datatable').show();
    });

    $('#saiweb_container').on('click', '.web_datatable_edit', function(){
                      // getset value
        var tagihan = $(this).closest('tr').find('td:eq(0)').text();
        var nim = $(this).closest('tr').find('td:eq(1)').text();
        var tanggal = $(this).closest('tr').find('td:eq(2)').text();
        var keterangan = $(this).closest('tr').find('td:eq(3)').text();
        
        var kode_lokasi = '<?= $kode_lokasi ?>';
        getJenis();

	      $.ajax({
            type: 'POST',
            url: '<?=$root_ser?>/Tagihan.php?fx=getEditTagihan',
            dataType: 'json',
            data: {'kode':tagihan,'kode_lokasi':kode_lokasi},
            success:function(res){
                if(res.status){        
                    $('#web_form_edit_nt').val(res.daftar[0].no_tagihan);
                    $('#web_form_edit_nim').val(res.daftar[0].nim);
                    $('#web_form_edit_tanggal').val(res.daftar[0].tanggal);
                    $('#web_form_edit_ket').val(res.daftar[0].keterangan);;

                    $('#web_datatable').hide();
                    $('#web_form_insert').show();
                  
                    $('table#sai-grid-table-tagihan tr.sai-grid-input-row').remove();

                    var row = "";
                    var no=1;
                    for(var i=0;i<res.daftar2.length;i++){
                        var line=res.daftar2[i];
                        row += "<tr class='sai-grid-input-row'>"+
                            "<td>"+
                                no+
                                "<input type='hidden' name='no_urut[]' value='"+no+"' readonly class='form-control set-no_urut'>"+
                            "</td>"+
                            "<td>"+
                                line.kode_jenis+
                                "<input type='hidden' name='kode_jenis[]' value='"+line.kode_jenis+"' required readonly class='form-control kode_jenis'>"+
                            "</td>"+
                            "<td>"+
                                line.nama+
                                "<input type='hidden' name='nama[]' value='"+line.nama+"' readonly class='form-control nama'>"+
                            "</td>"+
                            "<td>"+
                                toRp(line.nilai)+
                                "<input type='hidden' name='nilai[]' value='"+line.nilai+"' required readonly class='form-control nilai'>"+
                            "</td>"+
                            "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-tagihan' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-tagihan'><i class='fa fa-times'></i></a></td>"+
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

    $('#saiweb_container').on('submit', '#web_form_insert', function(e){
    e.preventDefault();
        var formData = new FormData(this);
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
            }
        
        var kode_lokasi='<?= $kode_lokasi ?>' ;

        formData.append('kode_lokasi', kode_lokasi);
      
        $.ajax({
            type: 'POST',
            url: '<?=$root_ser?>/Tagihan.php?fx=simpanTagihan',
            dataType: 'json',
            data: formData,
            contentType: false,
            cache: false,
            processData: false, 
            success:function(result){
                alert('Input data '+result.message);
                if(result.status){
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
        
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/belajar/Siswa.php?fx=simpan_tagihan',
            dataType: 'json',
            data: formData,
            contentType: false,
            cache: false,
            processData: false, 
            success:function(result){
                alert('Update data '+result.message);
                if(result.status){
                    dataTable.ajax.reload();
                    $('#web_datatable').show();
                    $('#web_form_edit').hide();
                }
            }
        });
    });

    $('#saiweb_container').on('click', '.web_datatable_del', function(){
          if(confirm('Apakah anda ingin menghapus data ini?')){
              var tagihan = $(this).closest('tr').find('td:eq(0)').text();
              $.ajax({
                  type: 'POST',
                  url: '<?=$root_ser?>/Tagihan.php?fx=hapus_tagihan',
                  dataType: 'json',
                  data: {'no_tagihan':tagihan},
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
   
    $('.datepicker').datepicker({
                    autoclose: true,
                    format: 'yyyy-mm-dd'
    });
   
    $('#saiweb_container').on('click', '#sai-grid-add-tagihan', function(){
        if($(this).data('edit')=='1'){
            $('.sai-grid-input-row').removeClass('set-selected');
            $(this).closest('tr').addClass('set-selected');
            
            var kode_tagihan= $(this).closest('tr').find('.kode_jenis').val();
            var nilai= $(this).closest('tr').find('.nilai').val();

            $('#modal-tagihan-id').val('1');
            $('#web-input-tagihan')[0].selectize.setValue(kode_tagihan);
            $('#web-input-nilai').val(nilai);
            $('#sai-grid-modal-tagihan').modal('show');
        }else{
            $('#modal-tagihan-id').val('0');
            $('#web-input-tagihan')[0].selectize.setValue('');
            $('#web-input-nilai').val(0);
            $('#sai-grid-modal-tagihan').modal('show');
        }
    });
    
    $('#saiweb_container').on('click', '.sai-grid-del-tagihan', function(){
        $(this).closest('.sai-grid-input-row').remove();
        $('html, body').animate({ scrollTop: $(document).height() }, 1000);
        hitungTotal();
    });
    
    $('#sai-grid-table-form-tagihan').submit(function(e){
        e.preventDefault();
        
        var kode_tagihan = $('#web-input-tagihan')[0].selectize.getValue();
        var id = $('#modal-tagihan-id').val();
        var nilai = $('#web-input-nilai').val();
        nilai=toNilai(nilai);
      

        if(id == '1'){
            var no=$(".set-selected").closest('tr').index();
			      if(no == 0) no= 1;
        }else{
            var no=$('#sai-grid-table-tagihan .sai-grid-input-row:last').index();
            if(no < 0) no= 0;
            no++;
        }

        var item = $('#web-input-tagihan')[0];
        var data = $(item.selectize.getItem(kode_tagihan)[0]).text();
        var nama = data.split('-')[1];

        var row = 
        "<tr class='sai-grid-input-row'>"+
            "<td>"+
            no+
            "<input type='hidden' name='no_urut[]' value='"+no+"' readonly class='form-control set-no_urut'>"+
            "</td>"+
            "<td>"+
            kode_tagihan+
            "<input type='hidden' name='kode_jenis[]' value='"+kode_tagihan+"' required readonly class='form-control kode_jenis'>"+
            "</td>"+
            "<td>"+
            nama+
            "<input type='hidden' name='nama[]' value='"+nama+"' readonly class='form-control nama'>"+
            "</td>"+
            "<td>"+
            toRp(nilai)+
            "<input type='hidden' name='nilai[]' value='"+nilai+"' required readonly class='form-control nilai'>"+
            "</td>"+
            "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-tagihan' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-tagihan'><i class='fa fa-times'></i></a></td>"+
        "</tr>";
        
        var row2="<td>"+
          no+
          "<input type='hidden' name='no_urut[]' value='"+no+"'  readonly class='form-control set-no_urut'>"+
          "</td>"+
          "<td>"+
          kode_tagihan+
          "<input type='hidden' name='kode_jenis[]' value='"+kode_tagihan+"' required readonly class='form-control kode_jenis'>"+
          "</td>"+
          "<td>"+
          nama+
          "<input type='hidden' name='nama[]' value='"+nama+"' readonly class='form-control nama'>"+
          "</td>"+                        
          "<td>"+
          toRp(nilai)+
          "<input type='hidden' name='nilai[]' value='"+nilai+"' required readonly class='form-control nilai'>"+
          "</td>"+
          "<td><a href='#' class='sai-btn-circle pull-right' id='sai-grid-add-tagihan' data-edit='1' ><i class='fa fa-pencil'></i></a><a href='#' class='sai-btn-circle pull-right sai-grid-del-tagihan'><i class='fa fa-times'></i></td>";
        
       
        if(id =='1'){
            $('.set-selected').closest('tr').text('');
            $('.set-selected').closest('tr').append(row2);
        }else{
            $('#sai-grid-table-tagihan').append(row);
        }
        
        $('#sai-grid-modal-tagihan').modal('hide');
        
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
});
   
</script>