<?php
$judul = "Iuran";
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
        <div class='box box-widget'>
            <div class='box-body'>
                <div class='pull-right' style='color: black;padding: 10px 10px 10px 10px;'>No Rumah : <span style='font-weight: bold;' id='no_rumah'> &nbsp;&nbsp;</span></div><br/><br/>
                    <div class='alert alert-danger alert-dismissible' style='text-align:center;border-radius:10px'>
                        <p>Saldo Tagihan</p>
                        <h4 id='saldo_tagihan'></h4>
                        <p>Untuk informasi lebih lanjut hubungi bendahara </p><a href='fMainMobile.php?hal=app/rtrw/fIuranDetail.php' style='cursor:pointer;'><span class='pull-right'><i class='fa fa-chevron-circle-right ' style='font-size:30px'></i></span></a>
                        <br>               
                    </div>
                    <h4> Riwayat Pembayaran </h4>
                </div>
            </div>
            <div class='riwayat_iuran'>    
            </div>
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

    function getRiwayat(){
        $.ajax({
            type: 'POST',
            url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getRiwayatIuran',
            dataType: 'json',
            success:function(result){    
                var html=``;
                $('.riwayat_iuran').html(html);
                if(result.status){
                    $('#saldo_tagihan').html(sepNum(result.saldo));
                    $('#no_rumah').html(result.no_rumah);
                    for(var i=0; i<result.daftar.length;i++){
                        var line = result.daftar[i];
                        // var jenis2 = line.jenis.toUpperCase();
                        
                        color="color:#01f400"; 
                        var gmbr="<?=$path?>/image/green4.png";
                        
                        html+=`
                            <div class='box-footer box-comments' style='background:white'>
                                <div class='box-comment'>
                                    <img class='img-circle img-sm' src='`+gmbr+`' alt='User Image'>
                                    <div class='comment-text'>
                                        <span class='username'>
                                            `+line.keterangan+`
                                            <span class='text-muted pull-right' style='`+color+`;font-size:14px'><b>Rp. `+sepNum(line.nilai1)+`</b></span>
                                        </span>
                                            Tanggal `+line.tgl+`
                                    </div>
                                </div>
                            </div>`;

                    }
                    
                    html+=`<a href='#' id='view_more' style='cursor:pointer;' >
                        <div class='box-footer box-comments' style='background:white'>
                            <div class='box-comment'>
                                
                                <div class='comment-text'>
                                    <span class='username' style='text-align:center'>
                                        View More 
                                        <span class='text-muted pull-right' style='font-size:14px'><b></b><i class='fa fa-angle-right'></i></span>
                                    </span><!-- /.username -->
                                </div>
                            </div>
                        </div>
                        </a>
                    </div>`;
                }
                $('.riwayat_iuran').html(html);
            }
        });
    }

    getRiwayat();
</script>


                        