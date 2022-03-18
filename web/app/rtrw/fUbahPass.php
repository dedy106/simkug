<?php
    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];

    // echo $kode_pp;

    $periode=date('Y').date('m');
        
    $path = "http://".$_SERVER["SERVER_NAME"]."/";	

?>
<div id='saiweb_container'>
    <!-- FORM INSERT -->
    <form id='web_form_insert' >
      <div class='row'>
        <div class='col-xs-12'>
          <div class='box'>
            <div class='box-body'>
              <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
            </div>
          </div>
          <div class='box box-warning'>
            <div class='box-body pad'>
                <div class='form-group'>
                    <label class='control-label col-sm-3'>Password Lama</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                    <input type='password' name='password_lama' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                    </div>
                </div>
                <div class='form-group'>
                    <label class='control-label col-sm-3'>Password Baru</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                    <input type='password' name='password_baru' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                    </div>
                </div>
                <div class='form-group'>
                    <label class='control-label col-sm-3'>Ulangi Password</label>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                    <input type='password' name='password_repeat' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                    </div>
                </div>
                <div class='form-group'>
                    <div class='col-sm-9' style='margin-bottom:5px;'>
                    <input type='hidden' name='tbl' class='form-control' maxlength='10' value='<?php echo $_SESSION['hakakses']; ?>'>
                    </div>
                </div>
                <div class='row'>
                    <div class='col-sm-12' style='margin-bottom:5px;'>
                        <div id='validation-box2'></div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </div>
    </form>
    <br>
    <form enctype='multipart/form-data' id='form-ub-foto'>
        <div class='row'>
            <div class='col-md-12'>
                <center>
                    <div id='foto-user'>
                        <?php

                        $sql="select foto from karyawan where nik='$nik' and kode_lokasi='$kode_lokasi'";
                        $rs=execute($sql);
                        $row=$rs->FetchNextObject($toupper=false);

                        if($row->foto == null){
                            $img = $path. 'image/user2.png';
                        }else{
                            $img = $path. 'server/media/'.$row->foto;
                        }
                        ?>
                        <img src='<?php echo $img; ?>' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'>
                        <br><br>
                    </div>
                    <input name='file' type='file' accept='image/jpg, image/jpeg, image/png' required> <br>
                    <button type='submit' class='btn btn-success'><i class='fa fa-pencil'></i> Simpan Foto</button>
                    <br>
                    <div class='col-md-12'>
                        <div id='validation-box'></div>
                    </div>
                </center>
            </div>
        </div>
    </form>
</div>
<script>

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
        url: 'include_lib.php?hal=server/cms/CMS.php&fx=ubahPassword',
        data: formData,
        type: "post",
        dataType: "json",
        contentType: false, 
        cache: false, 
        processData:false, 
        success: function (data) {
            alert(data.alert);
            
            if(data.status == 1){
                
                $('#validation-box2').html("");
                clearInput();
                location.reload();
            }else if (data.status == 3){
                var error_list = "<div class='alert alert-danger' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;'><ul>";
                for(i = 0; i<data.error_input.length; i++){
                    error_list += '<li>'+data.error_input[i]+'</li>';
                }
                error_list += "</ul></div>";
                status = false;
                $('#validation-box2').html(error_list);
            }
        }
    });
});

$('#ajax-content-section').on('submit', '#form-ub-foto', function(event){
    event.preventDefault();
    var formData = new FormData(this);
    var path='<?php echo $path."server/media/"; ?>';
    var nik='<?php echo $nik; ?>' ;
    var kode_lokasi='<?php echo $kode_lokasi; ?>' ;
    var kode_pp='<?php echo $kode_pp; ?>' ;

    formData.append('nik', nik);
    formData.append('kode_lokasi', kode_lokasi);
    formData.append('kode_pp', kode_pp);
    
    $.ajax({
        url: "include_lib.php?hal=server/cms/CMS.php&fx=ubahFoto",
        data: formData,
        type: "post",
        dataType: "json",
        contentType: false,       // The content type used when sending data to the server.
        cache: false,             // To unable request pages to be cached
        processData:false, 
        success: function (data) {
            // console.log(data);
            alert(data.alert);
            
            if(data.status == 1){
                var pathfoto=path+data.new_img
                $('.foto-ui-ajax').attr('src', pathfoto);
                // window.localStorage.setItem("foto", data.new_img);
                $('#foto-user').html("<img src='"+pathfoto+"' style='width:25%; height:25%; min-width:200px; min-height:200px; display:block; margin-left: auto; margin-right: auto;'> <br><br>");
            }else if (data.status == 3){
                // https://stackoverflow.com/a/26166303
                var error_array = Object.keys(data.error_input).map(function (key) { return data.error_input[key]; });
                
                // append input element error
                var error_list = "<div class='alert alert-danger' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;'><ul>";
                for(i = 0; i<error_array.length; i++){
                    error_list += '<li>'+error_array[i]+'</li>';
                }
                error_list += "</ul></div>";
                status = false;
                $('#validation-box').html(error_list);
            }
        }
    });
});

		
</script>

