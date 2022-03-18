<?php 
	$kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
    $periode = $res->fields[0];

    $tahun = substr($periode,0,4);
    $bln = substr($periode,5,2);
    $tahunSebelum = intval($tahun) - 1;

    $tmp=explode("/",$_GET['param']);

    $kode_fs="FS1";
?>
<style type="text/css">
</style>
        <div id='saiweb_container'>
          <!-- FORM INSERT -->
          <form id='web_form_insert' >
            <div class='row'>
              <div class='col-xs-12'>
                <div class='box'>
                  <div class='box-header'>
                    <h3 class="box-title" ><i class="fa fa-inbox"></i> Input Data Barcode</h3> 
                    <button type='submit' class='btn btn-success pull-right btnSubmit'><i class='fa fa-plus-circle'></i> Submit</button>
                    <!-- <a class='btn btn-default pull-right btn-form-exit web_form_back'><i class='fa fa-rotate-left'></i> Back</a> -->
                  </div>
                </div>
                <div class='box box-warning'>
                  <div class='box-body pad'> 
                    <div class='row'>
                      <div class='form-group'>
                        <label class='control-label col-sm-3'>PART NO</label>
                          <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' id="partno" name='partno' placeholder='Masukkan PART NO' class='form-control'>
                          </div>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='form-group'>
                        <label class='control-label col-sm-3'>QTY</label>
                          <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' id="qty" name='qty' placeholder='Masukkan qty' class='form-control'>
                          </div>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='form-group'>
                        <label class='control-label col-sm-3'>DESCRIPTION</label>
                          <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' id="desc" name='desc' placeholder='Masukkan deskripsi' class='form-control'>
                          </div>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='form-group'>
                        <label class='control-label col-sm-3'>TURN AROUND</label>
                          <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' id="turn" name='turn' placeholder='Masukkan turn around' class='form-control'>
                          </div>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='form-group'>
                        <label class='control-label col-sm-3'>PO</label>
                          <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' id="po" name='po' placeholder='Masukkan PO' class='form-control'>
                          </div>
                      </div>
                    </div>
                    <div class='row'>
                      <div class='form-group'>
                        <label class='control-label col-sm-3'>SERIAL</label>
                          <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='text' id="serial" name='serial' placeholder='Masukkan serial' class='form-control'>
                          </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </form>
          <div class='row' id='resultBarcode' hidden>
            <div class='col-xs-12'>
                <div class='box'>
                <?php
                $request = $_SERVER['REQUEST_URI'];
                $request2 = explode('/',$request);
                if($request2[6] == 1){
                    echo"";
                } else{
                    echo "
                    <div class='box-header'>
                        <a onclick='printForm()' id='printButton' target='_blank' class='btn btn-primary pull-right'>
                        <i class='fa fa-print'></i> Print
                        </a>";
                    echo"
                    
                    <a href='#' id='back-btn' class='btn btn-default pull-right'> BACK </a>
                    </div>";
                }
                ?>

                    <div class='box-body' id='result' align='center' >
                    </div>
                </div>
            </div>
        </div>
      </div>
      <script>

          var stsPrint = "<?php echo $request2[6]?>";
          var root = "<?php echo $root_app; ?>";
          if(stsPrint == '1') { 
              var printValue = true;
              $('#result').html(detailPrint);
          }else{
              var printValue = false;
          }

          function printForm(){
              window.open(root+'/printPreview/fBarcode/1/','_blank'); 
          }

          function executePrint(){
              window.print();
          }

          if(printValue){
             executePrint();
          }
          
          var detailPrint = '';
          $(document).ready(function(){
          
          if(stsPrint == '1'){
            $('#resultBarcode').show();
            $('#web_form_insert').hide();
          }

          $(document).off().on('submit', '#web_form_insert', function(e){
            e.preventDefault();
              var formData = $(this).serialize();
              $.ajax({
                  type: 'GET',
                  url: '<?=$root_ser?>/generate.php?fx=generate',
                  dataType: 'json',
                  data: formData,
                  success:function(result){
                      alert('Input data '+result.message);
                      if(result.status){
                          // dataTable.ajax.reload();
                          $('#resultBarcode').show();
                          // $('#nama').val('');
                          $('#web_form_insert').hide();
                          $('#result').html(result.html);
                          detailPrint = result.html;
                          
                      }
                  },
                  fail: function(xhr, textStatus, errorThrown){
                      alert('request failed:'+textStatus);
                  }
              });
          });

          $('#saiweb_container').on('click', '#back-btn', function(){
              $('#web_form_insert').show();
              $('#resultBarcode').hide();
          });

      });
          
      </script>