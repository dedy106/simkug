<?php
$judul = "Ubah Password";
if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 


if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
    $back1="";
    $backto="fMainMobile.php?hal=app/rtrw/fHome.php";
    $mobile=true;
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
}else{
    $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/fHome.php' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
    $padding="";
    $mobile=false;
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div id='saiweb_container'>
            <!-- FORM INSERT -->
            <form id='web_form_insert' >
            <div class='row'>
                <div class='col-xs-12'>
                <div class='box' style='border:none'>
                    <div class='box-body'>
                    <button type='submit' class='btn btn-success pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                    </div>
                </div>
                <div class='box' style='border:none'>
                    <div class='box-body pad'>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Password Lama</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='password' name='password_lama' class='form-control' maxlength='20' placeholder='Masukkan Password Lama' required>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Password Baru</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='password' name='password_baru' class='form-control' maxlength='20' placeholder='Masukkan Password Lama' required>
                            </div>
                        </div>
                        <div class='form-group'>
                            <label class='control-label col-sm-3'>Ulangi Password</label>
                            <div class='col-sm-9' style='margin-bottom:5px;'>
                            <input type='password' name='password_repeat' class='form-control' maxlength='20' placeholder='Masukkan Password Lama' required>
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
        </div>
    </div>
</div>
<script>

    $('#saiweb_container').on('submit', '#web_form_insert', function(e){
    e.preventDefault();
        var formData = new FormData(this);
        for(var pair of formData.entries()) {
            console.log(pair[0]+ ', '+ pair[1]); 
            }

        $.ajax({
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=ubahPassword',
            data: formData,
            type: "POST",
            dataType: "json",
            contentType: false, 
            cache: false, 
            processData:false, 
            success: function (data) {
                alert(data.alert);
                
                if(data.status == 1){
                    $('#validation-box2').html("");
                    $('#web_form_insert')[0].reset();
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
		
</script>

