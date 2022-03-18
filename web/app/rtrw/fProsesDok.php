<?php
$judul = "Proses Bukti Bayar";
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
$kode_lokasi = $_SESSION['lokasi'];
$kode_pp = $_GET['kode_pp'];
$kode_akun = $_GET['kode_akun'];
$periode = $_GET['periode'];
?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='box box-widget'>
            <form class='form-proses' method='POST' >
                <div class='row'>
                    <div class='col-xs-12'>
                        <div class='box-body'>
                            <!-- <div class='form-group'>
                                <label>Periode</label>
                                <select class='form-control selectize' id='periode' name="periode" style='margin-bottom:5px;'>
                                <option value=''>--- Pilih Periode ---</option>
                                <?php
                                
                                // $sql = "select distinct periode from rt_bill_d where kode_lokasi='$kode_lokasi' order by periode desc";
                                // $res = execute($sql);
                                
                                // while ($row = $res->FetchNextObject(false)){
                                //     if($periode == $row->periode){
                                //         $selected = "selected";
                                //     }else{
                                //         $selected="";
                                //     }
                                //     echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
                                // }
                                ?>
                                </select>
                            </div> -->
                            <div class='form-group'>
                                <label>RT</label>
                                <select class='form-control' id='kode_pp' name='kode_pp' required>
                                    <option value=''>--- Pilih RT ---</option>
                                </select>
                            </div>
                            <div class='form-group'>
                                <label>Bank</label>
                                <select class='form-control' id='kode_akun' name='kode_akun' required>
                                    <option value=''>--- Pilih Akun ---</option>
                                </select>
                            </div>
                        </div>
                        <div class='table-responsive'>
                            <table class='table no-margin' id='table-detail'>
                                <thead>
                                    <tr>
                                        <th width='15%' style='border-bottom: 1px solid white;'>Proses</th>
                                        <th width='15%' style='border-bottom: 1px solid white;'>No Rumah</th>
                                        <th width='15%' style='border-bottom: 1px solid white;'>Tanggal</th>
                                        <th width='45%' style='border-bottom: 1px solid white;'>Keterangan</th>
                                        <th width='10%' style='text-align:right;border-bottom: 1px solid white;'>Lihat</th>
                                        <th width='10%' style='text-align:right;border-bottom: 1px solid white;'>Tidak Proses</th>
                                    </tr>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
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

    function getRT(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getRT',
            dataType: 'json',
            success:function(result){    
                var select = $('#kode_pp').selectize();
                select = select[0];
                var control = select.selectize;
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                        control.addOption([{text:result.daftar[i].kode_pp + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_pp}]);   
                        }
                    }

                    if($kode_pp != ""){
                        control.setValue($kode_pp);
                    }
                }
            }
        });
    }

    function getAkunBank(kode_pp =null){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getAkunBank',
            dataType: 'json',
            data:{kode_pp:kode_pp},
            success:function(result){    
                var select = $('#kode_akun').selectize();
                select = select[0];
                var control = select.selectize;
                control.clearOptions();
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                        control.addOption([{text:result.daftar[i].kode_akun + ' - ' + result.daftar[i].nama, value:result.daftar[i].kode_akun}]);   
                        }
                    }

                    if($kode_akun != ""){
                        control.setValue($kode_akun);
                    }
                }
            }
        });
    }

    function getPerDok(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getPeriodeDok',
            dataType: 'json',
            data:{kode_pp:kode_pp},
            success:function(result){    
                var select = $('#periode').selectize();
                select = select[0];
                var control = select.selectize;
                control.clearOptions();
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            control.addOption([{text:result.daftar[i].periode, value:result.daftar[i].periode}]);     
                        }
                    }
                }
            }
        });
    }

    // getPerDok();
    getRT();
    getAkunBank();

    $('#kode_pp,#kode_akun').change(function(){
        var kode_pp = $('#kode_pp').val();
        var kode_akun = $('#kode_akun').val();
        if( kode_pp != "" && kode_akun != ""){
            getDaftarBukti(kode_pp,kode_akun);
        }
    });    

    function getDaftarBukti(kode_pp,kode_akun){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getDaftarBukti',
            dataType: 'json',
            data:{kode_pp:kode_pp,kode_akun:kode_akun},
            success:function(result){   
                var html=``;
                $('#table-detail tbody').html(html);
                if(result.status){
                    var colors = ['#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F','#39CCCC','#001F3F'];
                    
                    var x=0;
                    var total=0;
                    if(result.daftar != undefined){

                        for (var i=0; i< result.daftar.length;i++){
                            var line = result.daftar[i];
                            if(x % 2 == 1){
                                var clr=colors[1];
                            }else{
                                var clr=colors[2];
                            }
                            var link = "https://api.simkug.com/api/rtrw/storage/"+line.nama_file;
                            html+=`<tr class='sai-grid-row'>
                                <td><a class='btn btn-sm btn-primary' href='fMainMobile.php?hal=app/rtrw/fBayarDetailRwBukti.php&kode_rumah=`+line.kode_rumah+`&blok=`+line.blok+`&no_bukti=`+line.no_bukti+`&kode_akun=`+line.kode_akun+`&kode_pp=`+kode_pp+`' style='cursor:pointer;'>Proses</a></td>
                                <td>`+line.kode_rumah+`</td>
                                <td>`+line.tgl_input+`</td>
                                <td>`+line.keterangan+`</td>
                                <td><a class='btn btn-sm btn-primary' href='`+link+`' style='cursor:pointer;' target='_blank'>Lihat</a></td> 
                                <td><a class='btn btn-sm btn-danger btn-unproses' href='#' data-no_bukti='`+line.no_bukti+`' data-kode_rumah=`+line.kode_rumah+` style='cursor:pointer;'>Tidak Proses</a></td> 
                            </tr>`;
                            x++;
                        }

                    }
                }
                $('#table-detail tbody').html(html);
                $('.sai-grid-row').on('click','.btn-unproses',function(){
                    console.log('cek');
                    var no_bukti = $(this).data('no_bukti');
                    var kode_rumah = $(this).data('kode_rumah');
                    $.ajax({
                        type: 'POST',
                        url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=unProsesBukti',
                        dataType: 'json',
                        data:{no_bukti:no_bukti,kode_rumah:kode_rumah},
                        success:function(result){ 
                            alert(result.message); 
                            if(result.status){
                                location.reload();
                            }
                        }
                    });
                });
            }
        });
    }

    // $('.btn-unproses').click(function(e){
    //     console.log('clikc');
    //     var no_bukti = $(this).data('no_bukti');
    //     var kode_rumah = $(this).data('kode_rumah');
    //     $.ajax({
    //         type: 'POST',
    //         url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=unProsesBukti',
    //         dataType: 'json',
    //         data:{no_bukti:no_bukti,kode_rumah:kode_rumah},
    //         success:function(result){ 
    //             alert(result.message); 
    //             if(result.status){
    //                 location.reload();
    //             }
    //         }
    //     });
    // });    

  
    
</script>
          