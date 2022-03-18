<?php
$judul = "Detail Rekap Bulanan";
$tahun = $_GET['tahun'];
$bulan = $_GET['bulan'];
$drk = $_GET['drk'];
if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 



if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
    $back1="";
    $backto="fMainMobile.php?hal=app/rtrw/fRekapBulanan.php&tahun=$tahun&bulan=$bulan";
    $mobile=true;
    include('back.php');
    $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
}else{
    $back1="<div class='panel-heading'><a href='fMainMobile.php?hal=app/rtrw/fRekapBulanan.php&tahun=$tahun&bulan=$bulan' class='small-box-footer' > Back <i class='fa fa-arrow-circle-left'></i></a></div>";
    $padding="";
    $mobile=false;
}

?>
<div class='panel' style='<?=$padding?>'>
    <div class='panel-body'>
        <div class='box box-widget'>
            <div class='box-body'>
            <h4> Riwayat Transaksi </h4>
        </div>
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
        var tahun = '<?=$tahun?>';
        var bulan = '<?=$bulan?>';
        var drk ='<?=$drk?>';
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getDetailRekapBulanan',
            dataType: 'json',
            data:{ 'tahun': tahun,'drk':drk,'bulan':bulan},
            success:function(result){    
                var html=``;
                if(result.status){
                    var torecord =  result.daftar.length;
                    var page = '<?=$_GET['page']?>';
                    if(page == ""){
                        page = 0;
                        var nextpage = 0;
                    }else{
                        page = page;
                        var nextpage = (page * 20) + 1;
                    }
                    var jumpage = Math.ceil(torecord/20);
                    
                    for (var i=0;i<result.daftar.length;i++){
                        var line = result.daftar[i];
                        var jenis2 = line.jenis.toUpperCase();
                        
                        if (jenis2 == "BK"){
                            var color="color:#dd4b39";
                            var gmbr="<?=$path?>/image/red4.png";
                        }else{
                            var color="color:#01f400";
                            var gmbr="<?=$path?>/image/green4.png";
                        }
                        html+=`<div class='box-footer box-comments' style='background:white'>
                                    <div class='box-comment'>
                                        <img class='img-circle img-sm' src='`+gmbr+`' alt='User Image'>
                                        <div class='comment-text'>
                                            <span class='username'>
                                                `+line.keterangan+`
                                                <span class='text-muted pull-right' style='`+color+`;font-size:14px'><b>Rp. `+sepNum(line.nilai1)+`</b></span>
                                            </span><!-- /.username -->
                                                Tanggal `+line.tgl+`
                                        </div>
                                    </div>
                                </div> `;
    
                        }
                        html+=`
                    </div>                   
                    `;
                }
                $('.content-detrekap').html(html);
            }
        });
    }

    getDetailRekap();
</script>


                        