<?php
    // session_start();
    // if(!$_SESSION['isLogedIn']){
    //     echo "<script>alert('Harap login terlebih dahulu !'); window.location='fLogin.php';</script>";
    // }
    // include_once( "../../../lib/koneksi.php");
    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
?>
<div id='saiweb_container'>
    <div id='web_datatable'>
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box' >
            <div class='box-header'>
            <h3 class="box-title"><i class="fa fa-inbox"></i> Data Siswa</h3> 
              <button class='btn btn-primary pull-right web_datatable_insert' title='Tambah'>
                <i class='fa fa-plus-circle'></i> Tambah
              </button>
              <div class='pull-right' style='margin-right:5px;'>
                
              </div>
            </div>
            <div class='box-body sai-container-overflow-x'>
              <table class='table table-bordered table-striped DataTable' id='table-siswa'>
                <thead>
                  <tr>
                    <td>NIS</td>
                    <td>Nama</td>
                    <td>Jurusan</td>
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
                  <label class='control-label col-sm-3'>NIM</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nim' class='form-control'>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Nama</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' name='nama' class='form-control'>
                     </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Jurusan</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' name='kode_jur'>
                      <?php
        
                      $rs2 = execute("select kode_jur, nama from dev_jur ");
                      while($row2 = $rs2->FetchNextObject($toupper = false)){
                          echo "<option value='".$row2->kode_jur."'>".$row2->kode_jur." - ".$row2->nama."</option>";
                      }
                      ?>
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
                  <label class='control-label col-sm-3'>NIM</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' id='web_form_edit_nim' name='nim' class='form-control' readonly>
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Nama</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <input type='text' id='web_form_edit_nama' name='nama' class='form-control'>
                    </div>
                </div>
              </div>
              <div class='row'>
                <div class='form-group'>
                  <label class='control-label col-sm-3'>Jurusan</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                      <select class='form-control selectize' id='web_form_edit_jur' name='kode_jur'>
                      <?php
        
                      $rs2 = execute("select kode_jur, nama from dev_jur ");

                      while($row2 = $rs2->FetchNextObject($toupper = false)){
                          echo "<option value='".$row2->kode_jur."'>".$row2->kode_jur." - ".$row2->nama."</option>";
                      }

                      ?>
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
  var table2 = $('#table-siswa').DataTable({
                // 'fixedHeader': true,
                'scrollY': '300px',
                // 'scrollX': '0px',
                'scrollCollapse': true,
                'order': [[ 0, 'asc' ]]
            });
  table2.columns.adjust().draw();

  function init(){
      $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/belajar/Siswa.php&fx=apiGet',
            dataType: 'json',
            data: {'kode_lokasi':<?php echo $kode_lokasi ?>},
            success:function(result){
                
                var html = '';
                for(i=0; i<result.length; i++){
                    html += "<tr>"+
                                "<td>"+result[i].nim+"</td>"+
                                "<td>"+result[i].nama+"</td>"+
                                "<td>"+result[i].kode_jur+"</td>"+
                                "<td><a href='#' title='Edit' class='sai-btn-circle web_datatable_edit'><i class='fa fa-pencil'></i></a> &nbsp; <a href='#' title='Hapus' class='tbl-delete sai-btn-circle web_datatable_del'><i class='fa fa-trash'></i></a> &nbsp;</td>"+
                            "</tr>";
                }
                
                $('#table-siswa tbody').html(html);
            },
      })
  }

  

  $(document).ready(function(){

    init();

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
     var nama = $(this).closest('tr').find('td:eq(1)').text();
     var jur = $(this).closest('tr').find('td:eq(2)').text();
    
     $('#web_form_edit_nim').val(kode);
     $('#web_form_edit_nama').val(nama);
     $('#web_form_edit_jur')[0].selectize.setValue("test");

     $('#web_datatable').hide();
     $('#web_form_edit').show();
  });

  $('#saiweb_container').on('submit', '#web_form_insert', function(e){
  e.preventDefault();
    var formData = new FormData(this);
    for(var pair of formData.entries()) {
         console.log(pair[0]+ ', '+ pair[1]); 
        }
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/belajar/Siswa.php&fx=simpan',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Input data '+result.message);
            if(result.status){
                // location.reload();
                init();
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
        url: 'include_lib.php?hal=server/belajar/Siswa.php&fx=ubah',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert('Update data '+result.message);
            if(result.status){
                // location.reload();
                init();
                $('#web_datatable').show();
                $('#web_form_edit').hide();
            }
        }
    });
   });

   $('#saiweb_container').on('click', '.web_datatable_del', function(){
        if(confirm('Apakah anda ingin menghapus data ini?')){
            var kode = $(this).closest('tr').find('td:eq(0)').text();
            var nama = $(this).closest('tr').find('td:eq(1)').text();
            // var id = $(this).closest('tr').find('td:eq(2)').text();
            
            $.ajax({
                type: 'POST',
                url: 'include_lib.php?hal=server/belajar/Siswa.php&fx=hapus',
                dataType: 'json',
                data: {'nim':kode, 'nama':nama},
                success:function(result){
                    alert('Penghapusan data '+result.message);
                    if(result.status){
                        // location.reload();
                        init();
                    }
                }
            });
        }else{
            return false;
        }
                    
   });

  });
		
</script>