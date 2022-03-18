<?php
    
    $judul = "Upload Bukti Bayar";
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
        <div class='box box-widget' id="saku-form">
            <form id='form-upload' method='POST' >
                <div class='row'>
                    <div class='col-xs-12'>
                        <div class='box-header'>
                            <div class='col-md-3' style='padding-left: 0px;'>
                                <!--  -->
                            </div>
                            <button id='btnSubmit' type="submit" class='btn btn-primary pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                        </div>
                        <div class='box-body'>
                            <div class='form-group'>
                                <label>Bank Tujuan</label>
                                <select class='form-control' id='kode_akun' name='kode_akun'>
                                <option value=''>--- Pilih Bank ---</option>
                                </select>
                            </div>
                            <div class='form-group'>
                                <label for='InputKet'>Keterangan</label>
                                <input type='text' class='form-control' id='InputKet' name='keterangan' required>
                            </div>
                            <div class='form-group'>
                                <label for='InputFile'>File</label>
                                <input type='file'  id='InputFile' class='form-control' name='file' required accept="image/*" onchange="readURL(this)">
                            </div>
                            <div class="preview">
                                <img id="img-preview" src="" alt="Preview">
                            </div>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
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

function setHarga2(id){
    <?php echo $jsArray; ?>  
    if (id != ""){
        return dtBrg[id].harga;  
    }else{
        return "";
    }
   
}; 

function readURL(input) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        
        reader.onload = function (e) {
            $('#img-preview')
            .attr('src', e.target.result)
            .width(200)
            .height(150);
        };
        
        reader.readAsDataURL(input.files[0]);
    }
}

function getAkunBank(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getAkunBank',
        dataType: 'json',
        success:function(result){    
            var select = $('#kode_akun').selectize();
            select = select[0];
            var control = select.selectize;
            if(result.status){
                if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                    for(i=0;i<result.daftar.length;i++){
                       control.addOption([{text:result.daftar[i].kode_akun + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akun}]);   
                    }
                }
            }
        }
    });
}

getAkunBank();

$('#form-upload').submit(function(e){
    e.preventDefault();

    $("#btnSubmit").text("Please Wait...").attr('disabled', 'disabled');
    var formData = new FormData(this);

    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=simpanBuktiBayar',
        dataType: 'json',
        data: formData,
        contentType: false,
        cache: false,
        processData: false, 
        success:function(result){
            alert(result.message);
            if(result.status){
                location.reload();
            }
        },
        fail: function(xhr, textStatus, errorThrown){
            alert('request failed:'+textStatus);
        }
    });
    
    $("#btnSubmit").html("Submit").removeAttr('disabled');
});        
</script>