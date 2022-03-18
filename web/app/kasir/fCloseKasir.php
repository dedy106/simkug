<?php
   $kode_lokasi=$_SESSION['lokasi'];
   $nik=$_SESSION['userLog'];
?>
<div id='saiweb_container'>
  <div id='web_datatable'>
    <div class='row'>
      <div class='col-xs-12'>
        <div class="nav-tabs-custom">
          <ul class="nav nav-tabs pull-right">
            <li class="active"><a href="#sai-tab-new" data-toggle="tab" aria-expanded="false"><i class="fa fa-inbox"></i> New</a></li>
            <li class=""><a href="#sai-tab-finish" data-toggle="tab" aria-expanded="false"><i class="fa fa-check-circle"></i> Finish</a></li>
            <li class="pull-left header"><i class="fa fa-inbox"></i> Data Close Kasir</li>        
          </ul>
          <div class="tab-content">
            <div class="tab-pane active" id="sai-tab-new" style="position: relative;">
              <div class="row">
                <div class="col-xs-12">
                  <div class='box' style='border-top:none' >
                    <div class='box-header'>
                            <!-- <h3 class="box-title"><i class="fa fa-inbox"></i> Data Close Kasir</h3>  -->
                              <!-- <button class='btn btn-primary pull-right web_datatable_insert' title='Tambah'>
                                <i class='fa fa-plus-circle'></i> Tambah
                              </button> -->
                    </div>
                    <div class='box-body sai-container-overflow-x'>
                      <table class='table table-bordered table-striped DataTable' id='table-konten'>
                        <thead>
                          <tr>
                            <td>No Open</td>
                            <td>Nik Kasir</td>
                            <td>Tgl Jam</td>
                            <td>Saldo</td>
                            <td>Action</td>
                          </tr>
                        </thead>
                        <tbody>
                        <?php
                            $sql="SELECT * FROM kasir_open where kode_lokasi='".$kode_lokasi."' and nik='".$nik."' and no_close='-' ";

                            $rs1=execute($sql);
                            while($row1 = $rs1->FetchNextObject($toupper=false)){
                              echo"
                              <tr>
                              <td>$row1->no_open</td>
                              <td>$row1->nik</td>
                              <td>$row1->tgl_input</td>
                              <td style='text-align:right'>".number_format($row1->saldo_awal,0,",",".")."</td>
                              <td>
                              <a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp;
                              <!--<a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>--> &nbsp;</td>
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
            <div class="tab-pane" id="sai-tab-finish" style="position: relative;">
              <div class="row">
                <div class="col-xs-12">
                  <div class='box' style='border-top:none' >
                    <div class='box-header'>
                    </div>
                    <div class='box-body sai-container-overflow-x'>
                      <table class='table table-bordered table-striped DataTable' id='table-finish'>
                        <thead>
                          <tr>
                            <td>No Close</td>
                            <td>Nik Kasir</td>
                            <td>Tgl Jam</td>
                            <td>Saldo Awal</td>
                            <td>Total Penjualan</td>
                          </tr>
                        </thead>
                        <tbody>
                        <?php
                            $sql="SELECT * FROM kasir_close where kode_lokasi='".$kode_lokasi."' and nik='".$nik."' ";

                            $rs1=execute($sql);
                            while($row1 = $rs1->FetchNextObject($toupper=false)){
                              echo"
                              <tr>
                              <td>$row1->no_close</td>
                              <td>$row1->nik</td>
                              <td>$row1->tgl_input</td>
                              <td style='text-align:right'>".number_format($row1->saldo_awal,0,",",".")."</td>
                              <td style='text-align:right'>".number_format($row1->total_pnj,0,",",".")."</td>
                              <!--<td>
                              <a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp;
                              <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a>&nbsp;</td>-->
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
          </div>
        </div>
      </div>
    </div>
  </div>
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
                   <label class='control-label col-sm-3'>No Open</label>
                       <div class='col-sm-9' style='margin-bottom:5px;'>
                       <input type='text' name='no_open' class='form-control' maxlength='200' readonly id='web_form_edit_no_open'>
                       </div>
                   </div>
               </div>
               <div class='row'>
                   <div class='form-group'>
                   <label class='control-label col-sm-3'>Kasir</label>
                       <div class='col-sm-9' style='margin-bottom:5px;'>
                       <input type='text' name='nik' class='form-control' maxlength='200' readonly id='web_form_edit_nik'>
                       </div>
                   </div>
               </div>
                <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Saldo Awal</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='saldo_awal' class='form-control currency' id='web_form_edit_saldo_awal' readonly>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='form-group'>
                        <label class='control-label col-sm-3'>Total Penjualan</label>
                        <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' name='total_pnj' class='form-control currency' id='web_form_edit_totpnj'>
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

    var table = $('#table-finish').DataTable({
                // 'fixedHeader': true,
                'scrollY': '300px',
                // 'scrollX': '0px',
                'scrollCollapse': true,
                'order': [[ 0, 'asc' ]]
            });
    table.columns.adjust().draw();

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
       url: 'include_lib.php?hal=server/kasir/POS.php&fx=getEditCloseKasir',
       dataType: 'json',
       data: {'kode':kode,'nik':nik,'kode_lokasi':kode_lokasi},
       success:function(res){
           // alert('id ='+res.daftar[0].id);

           if(res.status){
               $('#web_form_edit_no_open').val(res.daftar[0].no_open);
               $('#web_form_edit_nik').val(res.daftar[0].nik);
               $('#web_form_edit_saldo_awal').val(toRp(res.daftar[0].saldo_awal));               
               $('#web_datatable').hide();
               $('#web_form_edit').show();
           }
       },
       fail: function(xhr, textStatus, errorThrown){
           alert('request failed:');
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
       url: 'include_lib.php?hal=server/kasir/POS.php&fx=simpanCloseKasir',
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
               url: 'include_lib.php?hal=server/kasir/POS.php&fx=hapusOpenKasir',
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

       
</script>