<?php
$judul = "Rekap Setoran";
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

session_start();

$kode_lokasi=$_SESSION['lokasi'];
$kode_pp=$_SESSION['kodePP'];
$nik=$_SESSION['userLog'];
$kode_menu=$_SESSION['kodeMenu'];

if(isset($_GET['periode']) && $_GET['periode'] != ""){
    $periode = $_GET['periode'];
}else{
    $periode = date('Ym');
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='row'>
            <div class='col-md-12'>
                <select class='form-control input-sm selectize' id='dash_periode' style='margin-bottom:5px;'>
                    <option value=''>Pilih Periode</option>
                    <?php
                    
                    $filter = "";
                    $sql="select 'all' as periode 
                        union all 
                        select distinct periode 
                        from rt_setor_m 
                        where kode_lokasi='$kode_lokasi' 
                        order by periode desc ";
                    $res = execute($sql);
                    
                    while ($row = $res->FetchNextObject(false)){
                        if($periode == $row->periode){
                            $selected = "selected";
                        }else{
                            $selected="";
                        }
                        echo " <option value=".$row->periode." $selected>".$row->periode."</option>";
                    }
                    ?>
                </select>
            </div>
        </div>
        <div class='content-rekap table-responsive' style="margin-top:20px">
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

    
    function getPeriode(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getPeriodeSetor',
            dataType: 'json',
            success:function(result){    
                var select = $('#dash_periode').selectize();
                select = select[0];
                var control = select.selectize;
                if(result.status){
                    if(typeof result.daftar !== 'undefined' && result.daftar.length>0){
                        for(i=0;i<result.daftar.length;i++){
                            control.addOption([{text:result.daftar[i].periode, value:result.daftar[i].periode}]);   
                        }
                    }
                    control.setValue('<?=$periode?>');
                }
            }
        });
    }

    // getPeriode();

    function getRekap(periode){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getRekapSetoran',
            dataType: 'json',
            data:{ 'periode': periode},
            success:function(result){    
                var html=``;
                $('.content-rekap').html(html);
                var tahun = periode.substr(0,4);
                if(result.status){
                    html+=`
                    <table class='table no-border' style='width:100%'>
                    <thead style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;font-size:12px'>
                        <tr>
                            <th style='width:24%'>No Setor</th>
                            <th style='width:10%'>Tanggal</th>
                            <th style='width:8%'>NIK User</th>
                            <th style='width:24%'>TOTAL</th>
                            <th style='width:24%'>No Terima</th>
                            <th style='width:10%'>Tgl Terima</th>
                        </tr>
                    </thead>
                    <tbody style='font-size:12px'>`;
                    var total1=0;
                        for (var i=0;i < result.daftar.length;i++){
                            var line = result.daftar[i];
                            total1+=+parseFloat(line.total);
                            html+=`
                            <tr>
                                <td >`+line.no_setor+`</td>
                                <td >`+line.tanggal+`</td>
                                <td >`+line.nik_user+`</td>
                                <td class='text-right'  ><a href='#' class='trace_detrekap' data-no_setor='`+line.no_setor+`' data-pp='`+line.kode_pp+`' style='cursor:pointer;color:blue' >`+sepNum(line.total)+`</a></td>
                                <td >`+line.no_terima+`</td>
                                <td >`+line.tgl_terima+`</td>
                            </tr>`;
                        }
                    html+=`
                    <tr style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px;font-size:12px'>
                        <td colspan='5'>TOTAL</td>
                        <td class='text-right' style='padding-left:0px'>`+sepNum(total1)+`</td>
                    </tr>
                    </tbody>
                    </table>`;
                }
                $('.content-rekap').html(html);
            }
        });
    }

    getRekap('<?=$periode?>');

    $('#dash_periode').change(function(e) { 
        e.preventDefault();
        var periode = $('#dash_periode').val();
        getRekap(periode);
    });

    $('.content-rekap').on('click','.trace_detrekap', function(e) { 
        e.preventDefault();
        var periode = $('#dash_periode').val();
        var no_setor = $(this).data('no_setor');
        window.location.href = 'fMainMobile.php?hal=app/rtrw/fRekapDetSetoran.php&no_setor='+no_setor+'&periode='+periode;
    });
</script>


                        