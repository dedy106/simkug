<?php
$judul = "Detail Bayar";
$blok = $_GET['blok'];
$kode_rumah = $_GET['kode_rumah'];
if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 



if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
    $back1="";
    $backto="fMainMobile.php?hal=app/rtrw/fBayarIuranRw.php&blok=$blok";
    $mobile=true;
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
}else{
    $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/fBayarIuranRw.php&blok=$blok' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
    $padding="";
    $mobile=false;
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='box box-widget'>
            <form class='form-iuran' method='POST' >
                <div class='row'>
                    <div class='col-xs-12'>
                        <div class='box-header'>
                            <div class='col-md-3' style='padding-left: 0px;'>
                                <b>No Rumah : <span id='no_rumah'><?=$kode_rumah?></span> </b>
                            </div>
                            <button id='btnSubmit' class='btn btn-primary pull-right'><i class='fa fa-plus-circle'></i> Save</button>
                        </div>
                        <div class='box-body'>
                            <div class='row'>
                                <div class='form-group'>
                                    <label for='inputNilai' class='col-sm-2 control-label'>Nilai Bayar</label>
                                    <div class='col-sm-3'>
                                    <input type='text' name='bayar' class='form-control' id='inputNilai' readonly value='0'>
                                    </div>
                                </div>
                            </div>
                            <div class='form-group'>
                            <label>Akun Kas</label>
                            <select class='form-control' id='kode_akun' name='kode_akun'>
                            <option value=''>--- Pilih Akun ---</option>
                            </select>
                            </div>
                            <div class='row' hidden>
                                <div class='form-group'>
                                    <div class='col-sm-3'>
                                    <input type='hidden' name='nilRT' class='form-control' id='inputNilRT' readonly value='0'>
                                    </div>
                                </div>
                            </div>
                            <div class='row' hidden>
                                <div class='form-group'>
                                    <div class='col-sm-3'>
                                    <input type='hidden' name='nilRW' class='form-control' id='inputNilRW' readonly value='0'>
                                    </div>
                                </div>
                            </div>
                            <div class='row' hidden>
                                <div class='form-group'>
                                    <div class='col-sm-3'>
                                    <input type='hidden' name='stsByr' class='form-control' readonly value='tunai'>
                                    </div>
                                </div>
                            </div>
                            <input type='hidden' name='no_rumah' class='form-control' readonly value='<?=$kode_rumah?>' >
                        </div>
                        <table class='table no-margin' id="table-detail">
                            <thead>
                            <tr>
                                <th width='25%' style='border-bottom: 1px solid white;'>Tahun</th>
                                <th width='25%' style='border-bottom: 1px solid white;'>Bulan</th>
                                <th width='50%' style='text-align:right;border-bottom: 1px solid white;' >Nilai</th>
                                <th style='text-align:right;border-bottom: 1px solid white;'>&nbsp;</th>
                            </tr>
                            </thead>
                            <style>
                            .toggle.ios, .toggle-on.ios, .toggle-off.ios { border-radius: 20px; }
                            .toggle.ios .toggle-handle { border-radius: 20px; }
                            </style>
                            <tbody>
                            </tbody>
                        </table>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
<script>
    function sepNum(x){
        if(!isNaN(x)){
            var num = parseFloat(x).toFixed(0);
            var parts = num.toString().split('.');
            var len = num.toString().length;
            // parts[1] = parts[1]/(Math.pow(10, len));
            parts[0] = parts[0].replace(/(.)(?=(.{3})+$)/g,'$1.');
            return parts.join(',');
        }else{
            return 0;
        }
    }

    function toBulan(no_bulan){
        switch (no_bulan){
            case 1 : case '1' : case '01': bulan = 'Januari'; break;
            case 2 : case '2' : case '02': bulan = 'Februari'; break;
            case 3 : case '3' : case '03': bulan = 'Maret'; break;
            case 4 : case '4' : case '04': bulan = 'April'; break;
            case 5 : case '5' : case '05': bulan = 'Mei'; break;
            case 6 : case '6' : case '06': bulan = 'Juni'; break;
            case 7 : case '7' : case '07': bulan = 'Juli'; break;
            case 8 : case '8' : case '08': bulan = 'Agustus'; break;
            case 9 : case '9' : case '09': bulan = 'September'; break;
            case 10 : case '10' : case '10': bulan = 'Oktober'; break;
            case 11 : case '11' : case '11': bulan = 'November'; break;
            case 12 : case '12' : case '12': bulan = 'Desember'; break;
            default: bulan = null;
        }
        
        return bulan;
    }
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
                            control.addOption([{text:result.daftar[i].kode_akun +' - '+result.daftar[i].nama, value:result.daftar[i].kode_akun}]);   
                        }
                    }
                    control.setValue(result.kode_akun);
                }
            }
        });
    }

    getAkun();

    function toNilai(str_num){
        var parts = str_num.split('.');
        number = parts.join('');
        number = number.replace('Rp', '');
        // number = number.replace(',', '.');
        return +number;
    }

    function hitungSaldo(){

        totSal = 0;
        $('.sai-grid-row').each(function(){
            var nilai=$(this).closest('tr').find('.input-nilai').val();
            
            totSal+=+nilai;
            
        });

        $('#inputSaldo').val(sepNum(totSal));
    }

    function getDetailBayar(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getDetailBayarRw',
            dataType: 'json',
            data:{ 'kode_rumah': "<?=$kode_rumah?>"},
            success:function(result){   
                var html=``;
                $('#table-detail tbody').html('');
                if(result.status){
                    var colors = ['#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F'];
                    var x =0;
                    var total=0;
                    for (var i=0; i< result.daftar.length;i++){
                        var line = result.daftar[i];
                        if(x % 2 == 1){
                            clr=colors[1];
                        }else{
                            clr=colors[2];
                        }
                        
                        html+=` <tr class='sai-grid-row'>
                                    <td width='25%'>`+line.periode.substr(0,4)+`</td>
                                    <td width='25%'>`+toBulan(line.periode.substr(4,2))+` <input name='periode[]' value='`+line.periode+`' type='hidden'></input></td>
                                    <td width='48%' style='text-align:right;color:`+clr+`'>
                                    <input name='nilai_rt[]' class='input-nilrt' value='`+line.nilai_rt+`' type='hidden'></input>
                                    <input name='nilai_rw[]' class='input-nilrw' value='`+line.nilai_rw+`' type='hidden'></input>
                                     Rp. `+sepNum(line.bayar)+`
                                    <input name='nilai_tot[]' class='input-nilai' value='`+line.bayar+`' type='hidden'></input>
                                    </td>
                                    <td width='2%'><input type='checkbox' name='toggle2[]' class='inputToggle' data-on=' ' data-off=' ' data-toggle='toggle' data-size='mini' data-style='ios'>
                                    <input type='hidden' name='toggle[]' class='input-tog'><div id='console-event`+x+`'></div></td>
                        </tr>`;
                        x++;
                        total+=line.bill;
                    }
                }
                $('#table-detail tbody').html(html);
                $('input[type="checkbox"]').bootstrapToggle();

                $('.inputToggle').change(function() {  
                    // alert('tes');
                    $('#inputNilai').val(0);
            
                    total = 0;
                    totRT = 0;
                    totRW = 0;
                    $('.sai-grid-row').each(function(){
                        var cek=$(this).closest('tr').find('.inputToggle').prop('checked');
                        var tog=$(this).closest('tr').find('.inputToggle').val();
                        var nilai=$(this).closest('tr').find('.input-nilai').val();
                        var rt=$(this).closest('tr').find('.input-nilrt').val();
                        var rw=$(this).closest('tr').find('.input-nilrw').val();
            
                        if(cek == true){
                            total+=+nilai;
                            totRT+=+rt;
                            totRW+=+rw;
                            $(this).closest('tr').find('.input-tog').val('on');
                        }else{
                            $(this).closest('tr').find('.input-tog').val('off');
                        }
                        
                    });
                    $('#inputNilai').val(sepNum(total));
                    $('#inputNilRT').val(sepNum(totRT));
                    $('#inputNilRW').val(sepNum(totRW));
            
                }); 
            
                $('input').on('keyup keypress', function(e) {
                    var keyCode = e.keyCode || e.which;
                    if (keyCode === 13) { 
                        e.preventDefault();
                        return false;
                    }
                });  
                
                hitungSaldo();
            }
        });
    }

    getDetailBayar();
    

    $(document).ready(function(){

        $('#btnSubmit').click(function(e){
            e.preventDefault();
            // alert('test');
            myForm = $('.form-iuran').serialize();
            var total = toNilai($('#inputNilai').val());
            var akun = $('#kode_akun')[0].selectize.getValue();
            if(total != 0 && akun != ""){
                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=simpanIuranRw',
                    dataType: 'json',
                    data: myForm,
                    cache: false,
                    success:function(result){
                        alert('Input data '+result.message);
        
                        if(result.status){
                            // location.reload();
                            window.location.href='fMainMobile.php?hal=app/rtrw/fBuktiBayarRwDok.php&no_bukti='+result.no_bukti+'&blok=<?=$blok?>&kode_rumah=<?=$kode_rumah?>&file_back=fBayarDetailRw';
                        }
                    }
                });
            }else{
                alert('Nilai bayar dan akun tidak boleh kosong !');
                return false;
            }
    
        });
    });

</script>
          