<?php
$judul = "Detail Rekap";
$periode = $_GET['periode'];
$pp = $_GET['pp'];
$no_setor = $_GET['no_setor'];
if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 



if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
    $back1="";
    $backto="fMainMobile.php?hal=app/rtrw/fRekapSetoranRw.php&periode=$periode&pp=$pp";
    $mobile=true;
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
}else{
    $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/fRekapSetoranRw.php&periode=$periode&pp=$pp' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
    $padding="";
    $mobile=false;
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='content-detrekap'>
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

    function getDetailRekap(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getDetailRekapSetoranRw',
            dataType: 'json',
            data:{ 'periode': '<?=$periode?>','no_setor':'<?=$no_setor?>','pp':'<?=$pp?>'},
            success:function(result){    
                var html=``;
                $('.content-detrekap').html(html);
                if(result.status){
                    html+=`
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px'>
                    <div class='col-xs-4' style='padding-left:0px'>No Rumah</div>
                    <div class='col-xs-4' style='padding-left:0px'>Periode Bill</div>
                    <div class='col-xs-4' style='padding-left:0px'>TOTAL</div>
                    </div>`;
                    var total1=0;
                        for (var i=0;i < result.daftar.length;i++){
                            var line = result.daftar[i];
                            total1+=+parseFloat(line.total);
                            html+=`
                            <div class='row' style='margin-left:0px;margin-right:0px;font-size:12px'>
                            <div class='col-xs-4' style='padding-left:0px;'>`+line.kode_rumah+`</div>
                            <div class='col-xs-4' style='padding-left:0px;'>`+line.periode_bill+`</div>
                            <div class='col-xs-4 text-right' style='padding-left:0px;' >`+sepNum(line.total)+`</div>
                            </div>`;
                        }
                    html+=`
                    <div class='row' style='background:#dfdddd;font-weight:bold;margin-left:0px;margin-right:0px;margin-bottom:10px;font-size:12px'>
                    <div class='col-xs-8' style='padding-left:0px'>TOTAL</div>
                    <div class='col-xs-4 text-right' style='padding-left:0px'>`+sepNum(total1)+`</div>
                    </div>`;
                    
                }
                $('.content-detrekap').html(html);
            }
        });
    }

    getDetailRekap();
</script>


                        