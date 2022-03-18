<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	

    $sql="SELECT logo FROM lokasi where kode_lokasi='".$kode_lokasi."'";
    $rs=execute($sql);
    $detail=$rs->FetchNextObject($toupper=false);
    $url = $path."image/".$detail->logo;

?>
<div id='saiweb_container'>
    <form id='web_form_insert'>
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
                    <div class='col-sm-12'>
                        <div class='form-group'>
                            <center>
                                <img src='<?php echo $url; ?>' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'>
                                <br><br>
                                <center><b>Url:</b> <i><?php echo $url; ?></i></center>
                            </center>
                        </div>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-sm-12'>
                        <div class='form-group'>
                            <label class='control-label'>Keterangan</label>
                            <div class='alert' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #31708f; border-color: #bce8f1; background-color: #d9edf7;'>
                            &nbsp;&nbsp; Logo dengan format .PNG .JPG .JPEG
                            </div>
                        </div>
                    </div>
                </div>
                <div class='row'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>File</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                                <input name='file_gambar' type='file' accept='image/png, image/jpg, image/jpeg'>
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
//   $('#saiweb_container').on('submit', '#web_form_insert', function(e){
//   e.preventDefault();
//     var formData = new FormData(this);
//     for(var pair of formData.entries()) {
//          console.log(pair[0]+ ', '+ pair[1]); 
//         }

//     var nik='<?php //echo $nik; ?>' ;
//     var kode_lokasi='<?php //echo $kode_lokasi; ?>' ;

//     formData.append('nik', nik);
//     formData.append('kode_lokasi', kode_lokasi);
//     $.ajax({
//         type: 'POST',
//         url: 'include_lib.php?hal=server/java/Java.php&fx=editLogo',
//         dataType: 'json',
//         data: formData,
//         contentType: false,
//         cache: false,
//         processData: false, 
//         success:function(result){
//             alert('Input data '+result.message);
//             if(result.status){
//                 location.reload();
//             }
//         },
//         fail: function(xhr, textStatus, errorThrown){
//             alert('request failed:'+textStatus);
//         }
//     });
//   });
		
</script>

