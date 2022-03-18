<?php
$judul = "Bukti Bayar";
$blok = $_GET['blok'];
$kode_rumah = $_GET['kode_rumah'];
$no_bukti = $_GET['no_bukti'];
$file_back = $_GET['file_back'];
if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 



if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
    $back1="";
    $backto="fMainMobile.php?hal=app/rtrw/$file_back.php&blok=$blok&kode_rumah=$kode_rumah";
    $mobile=true;
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
}else{
    $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/$file_back.php&blok=$blok&kode_rumah=$kode_rumah' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
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
                        <table class='table no-border' id="table-header">
                            <tr>
                                <td width='25%'>No Bukti</td><td width='5%'>:</td><td width='70%' id="label_no_bukti"></td>
                            </tr>
                            <tr>
                                <td>Tgl Input</td><td>:</td><td id="label_tgl_input"></td>
                            </tr>
                            <tr>
                                <td>No Rumah</td><td>:</td><td id="label_no_rumah"></td>
                            </tr>
                            <tr>
                                <td>Akun Kas</td><td>:</td><td id="label_akun_kas"></td>
                            </tr>
                            <tr>
                                <td>Total</td><td>:</td><td id="label_total"></td>
                            </tr>
                        </table>
                        <table class='table no-margin table-bordered table-striped' id="table-detail">
                            <thead>
                            <tr>
                                <th width='25%' style='border-bottom: 1px solid white;'>Tahun</th>
                                <th width='25%' style='border-bottom: 1px solid white;'>Bulan</th>
                                <th width='50%' style='text-align:right;border-bottom: 1px solid white;' >Nilai</th>
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

    function getBuktiBayar(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getBuktiBayar',
            dataType: 'json',
            data:{ 'no_bukti': "<?=$no_bukti?>"},
            success:function(result){   
                $('#label_no_bukti').text(result.daftar[0].no_bukti);
                $('#label_tgl_input').text(result.daftar[0].tgl_input);
                $('#label_no_rumah').text(result.daftar[0].no_rumah);
                $('#label_akun_kas').text(result.daftar[0].kode_akun+'-'+result.daftar[0].akun_kas);
                $('#label_total').text(sepNum(result.daftar[0].total));
                
                var html=``;
                $('#table-detail tbody').html('');
                if(result.status){
                    var colors = ['#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F'];
                    var x =0;
                    var total=0;
                    for (var i=0; i< result.daftar2.length;i++){
                        var line = result.daftar2[i];
                        if(x % 2 == 1){
                            clr=colors[1];
                        }else{
                            clr=colors[2];
                        }
                        
                        html+=` <tr class='sai-grid-row'>
                                    <td width='25%'>`+line.periode.substr(0,4)+`</td>
                                    <td width='25%'>`+toBulan(line.periode.substr(4,2))+`</td>
                                    <td width='50%' style='text-align:right;'>
                                     Rp. `+sepNum(line.nilai)+`
                                    </td>
                                </tr>`;
                        x++;
                        total+=line.nilai;
                    }
                }
                $('#table-detail tbody').html(html);
                
            }
        });
    }

    getBuktiBayar();


</script>
          