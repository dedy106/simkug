<?php
$judul = "Rekbul RT";
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

$kode_lokasi=$_SESSION['lokasi'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_menu=$_SESSION['kodeMenu'];

if(isset($_GET['tahun']) && $_GET['tahun'] != ""){
    $tahun = $_GET['tahun'];
}else{
    $tahun = date('Y');
}

if(isset($_GET['bulan']) && $_GET['bulan'] != ""){
    $bulan = $_GET['bulan'];
}else{
    $bulan = date('m');
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='row'>
            <div class='col-md-12'>
                <select class='form-control input-sm selectize' id='dash_tahun' style='margin-bottom:5px;'>
                    <option value=''>Pilih Tahun</option>
                    <?php

                    // $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
                    $pp_rw = $kode_pp;
                    
                    $filter = "";
                    $sql="select distinct a.tahun from (select (substring(a.periode,1,4)) as tahun 
                        from gldt a 
                        inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
                        inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='02'
                        inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag in ('001','009')
                        where a.kode_lokasi='$kode_lokasi' 
                    ) a
                    order by a.tahun desc  ";
                    $res = execute($sql);
                    
                    while ($row = $res->FetchNextObject(false)){
                        if($tahun == $row->tahun){
                            $selected = "selected";
                        }else{
                            $selected="";
                        }
                        echo " <option value=".$row->tahun." $selected>".$row->tahun."</option>";
                    }
                    ?>
                </select>
            </div>
            <div class='col-md-12'>
                <select class='form-control input-sm selectize' id='dash_bulan' style='margin-bottom:5px;'>
                    <option value=''>Pilih Bulan</option>
                    <?php
                    
                    $filter = "";
                    $sql=" select distinct (substring(a.periode,5,2)) as bulan,datename(m,cast(substring(a.periode,1,4)+'-'+substring(a.periode,5,2)+'-'+'01' as datetime)) as nama
                    from (select  a.periode 
                        from gldt a 
                        inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_Lokasi
                        inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$pp_rw'
                        inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag in ('001','009')
                        where a.kode_Lokasi='$kode_lokasi' 
                    ) a
                    order by (substring(a.periode,5,2)) desc  ";
                    $res = execute($sql);
                    
                    while ($row = $res->FetchNextObject(false)){
                        if($bulan == $row->bulan){
                            $selected = "selected";
                        }else{
                            $selected="";
                        }
                        echo " <option value=".$row->bulan." $selected>".$row->nama."</option>";
                    }
                    ?>
                </select>
            </div>
        </div>
        <div class='content-rekap'>
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

    
    function getTahun(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getTahun',
            dataType: 'json',
            success:function(result){    
                var select = $('#dash_tahun').selectize();
                select = select[0];
                var control = select.selectize;
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            control.addOption([{text:result.daftar[i].tahun, value:result.daftar[i].tahun}]);   
                        }
                    }
                    control.setValue('<?=$tahun?>');
                }
            }
        });
    }
    function getBulan(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getBulan',
            dataType: 'json',
            success:function(result){    
                var select = $('#dash_bulan').selectize();
                select = select[0];
                var control = select.selectize;
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            control.addOption([{text:result.daftar[i].nama, value:result.daftar[i].bulan}]);   
                        }
                    }
                    control.setValue('<?=$bulan?>');
                }
            }
        });
    }

    // getTahun();
    // getBulan();

    function getRekapBulanan(tahun,bulan){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getRekapBulananRT',
            dataType: 'json',
            data:{ 'tahun': tahun,'bulan':bulan},
            success:function(result){    
                $('.content-rekap').html('');
                var html=``;
                if(result.status){
                    html+=`
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                        <div class='col-xs-1' style='padding-left:0px'>I</div>
                        <div class='col-xs-7' style='padding-left:0px'>PENERIMAAN</div>
                        <div class='col-xs-4' style='padding-left:0px'>TOTAL</div>
                    </div>`;
                    var total1=0;
                        for (var i=0;i < result.penerimaan.length;i++){
                            var line = result.penerimaan[i];
                            total1+=+parseFloat(line.total);
                            html+=`
                            <div class='row' style='margin-left:0px;margin-right:0px'>
                                <div class='col-xs-1' style='padding-left:0px'></div>
                                <div class='col-xs-1' style='padding-left:0px;padding-right:5px'>`+line.kode_drk+`</div>
                                <div class='col-xs-6' style='padding-left:10px;'>`+line.nama+`</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px;'><a href='#' id='trace_detrekap' data-drk = '`+line.kode_drk+`' style='cursor:pointer;color:blue' >`+sepNum(line.total)+`</a></div>
                            </div>`;
                        }
                    html+=`
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>TOTAL PENERIMAAN</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>`+sepNum(total1)+`</div>
                    </div>`;
                    var total2 = 0;  
                        for (var i=0;i < result.pengeluaran.length;i++){
                            var line = result.pengeluaran[i];
                            total2+=+parseFloat(line.total);
                            html+=`
                            <div class='row' style='margin-left:0px;margin-right:0px'>
                                <div class='col-xs-1' style='padding-left:0px'></div>
                                <div class='col-xs-1' style='padding-left:0px;padding-right:5px'>`+line.kode_drk+`</div>
                                <div class='col-xs-6' style='padding-left:10px'>`+line.nama+`</div>
                                <div class='col-xs-4 text-right' style='padding-left:0px;cursor:pointer;color:blue' ><a href='#' id='trace_detrekap' data-drk = '`+line.kode_drk+`' style='cursor:pointer;color:blue' >`+sepNum(line.total)+`</a></div>
                            </div>`;
                        }
                    html+=`
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>TOTAL PENGELUARAN</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px;'>`+sepNum(total2)+`</div>
                    </div>`;
                    var total = total1-total2;
                    html+=`
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                            <div class='col-xs-1' style='padding-left:0px'></div>
                            <div class='col-xs-7' style='padding-left:0px'>NET MUTASI</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px'>`+sepNum(total)+`</div>
                    </div>`;
                }
                $('.content-rekap').html(html);
            }
        });
    }

    getRekapBulanan('<?=$tahun?>','<?=$bulan?>');

    $('#dash_tahun, #dash_bulan').change(function(e) { 
        e.preventDefault();
        var tahun = $('#dash_tahun').val();
        var bulan = $('#dash_bulan').val();
        getRekapBulanan(tahun,bulan);
    });


    $('.content-rekap').on('click','#trace_detrekap', function(e) { 
        e.preventDefault();
        var tahun = $('#dash_tahun').val();
        var drk = $(this).data('drk');
        var bulan = $('#dash_bulan').val();
        window.location.href = 'fMainMobile.php?hal=app/rtrw/fRekapDetBulananRT.php&drk='+drk+'&tahun='+tahun+'&bulan='+bulan;
    });
</script>


                        