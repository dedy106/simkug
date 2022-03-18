<?php
    
    $judul = "Input Kas";
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
<div class='panel' style='<?= $padding; ?>'>
    <div class='panel-body'>
        <?=$back1?>
        <div class='row'>
            <div class='col-md-6'>
                <form class='kas_insert' method='POST'>
                    <div class='box-body'>
                        <div class='form-group'>
                            <label>Akun Kas</label>
                            <select class='form-control' id='kode_akun' name='kode_akun' required>
                                <option value=''>--- Pilih Akun ---</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <label>Jenis Kas</label>
                            <select class='form-control' id='kas-jenis' name='kode_jenis' required>
                                <option value=''>--- Pilih Jenis ---</option>
                                <option value='Masuk'>Masuk</option>
                                <option value='Keluar'>Keluar</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <label>Referensi</label>
                            <select class='form-control' id='kas-ref' name='kode_ref' required>
                                <option value='' disabled>--- Pilih Ref ---</option>
                            </select>
                        </div>
                        <div class='form-group'>
                            <label for='InputKet'>Keterangan</label>
                            <input type='text' class='form-control' id='InputKet' name='keterangan' required>
                        </div>
                        <div class='form-group'>
                            <label for='InputNil'>Nilai</label>
                            <input type='text'  id='InputNil' class='form-control currency' name='nilai' required>
                        </div>
                    </div>
                    <!-- /.box-body -->

                    <div class='box-footer'>
                    <button id='btnSubmit' class='btn btn-primary'>Submit</button>
                    </div>

                </form>
            </div>
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

function getAkun(){
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getAkun',
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

getAkun();

var select_kas_ref = $('#kas-ref').selectize();

var select_kas_jenis = $('#kas-jenis').selectize({
    onChange: function(value) { 
        if(select_kas_jenis[0].selectize.getValue()!='undefined'){
            select_kas_ref[0].selectize.clearOptions();
        } 
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getJenis',
            dataType: 'json',
            data: {'jenis':value},
            success:function(result){    
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            select_kas_ref[0].selectize.addOption([{text:result.daftar[i].kode_ref + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_ref}]);  
                        }
                    }
                }
            }
        });
        
    }
});  

// Simpan Penjualan
$('#btnSubmit').click(function(e){
    e.preventDefault();
    $(this).text("Please Wait...").attr('disabled', 'disabled');
    // alert('test');
    myForm = $('.kas_insert').serialize();
    
    $.ajax({
        type: 'POST',
        url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=simpanKas',
        dataType: 'json',
        data: myForm,
        cache: false,
        success:function(result){
            alert('Input data '+result.message);
            
            if(result.status){
                location.reload();
            }
            
        }
    });
    $(this).html("Submit").removeAttr('disabled');
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