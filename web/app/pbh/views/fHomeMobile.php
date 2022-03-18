<?php 
	$kode_lokasi=$_SESSION['lokasi'];
    //$periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
    $periode = $res->fields[0];

    $logomain = $path.'/web/img/logo.png';
    $mainname="Nama Perusahaan";

    $tahun = substr($periode,0,4);
    $bln = substr($periode,5,2);
    $tahunSebelum = intval($tahun) - 1;

    $tmp=explode("/",$_GET['param']);

    $kode_fs="FS1";

	 if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 0px solid #e6e2e2;'>
        <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b>
        <span class='pull-right' style='font-size: 10px;'>".date('d-m-Y')."</span></span>
        </a>
        </header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }
    
    echo $header;
?>
<style type="text/css">

.horizontal-scroll{
    height: 120px;
    margin-top: 5px;
    overflow-x: scroll;
    overflow-y: hidden;
    white-space: nowrap;
    padding-top: 5px;
    padding-left: 2px;
}
.horizontal-scroll::-webkit-scrollbar{
    display: none;
}
.kotak{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    height:100px; 
    width: 220px; 
    margin-right: 10px; 
    display: inline-block;
}
.kotak2{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    height:100px; 
    width: 350px; 
    margin-right: 10px; 
    display: inline-block;
}    
.kotak3{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    height:70px; 
    margin-right: 10px; 
    display: inline-block;
} 
</style>
<div class='panel' style='<?php echo $padding; ?>'>
    <div class='panel-body' style=''>
        <div class="row" style="margin-bottom:10px">
            <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="form-group" style="">
                    <input type="text" class="form-control" placeholder="Cari No Pengajuan" name="no_pengajuan" style="border-radius: 25px;">
                </div>
            </div>
            <div class="col-md-12 col-sm-12 col-xs-12" style="">
                <h4 style="position:absolute">Info Pembendaharaan</h4>
                <a style="margin-top: 15px; font-size: 10px;" class="pull-right" id='LihatSemua' href="#">Lihat Semua</a>
            </div>
        </div>
        <div class="horizontal-scroll">
            <div class="info-box kotak">
                <div class="info-box-icon" style="border-radius: 15px; background-color: #4183d7; height: 100%">
                    <h5 style="color: #ffffff; padding: 0; margin-top: 20px;">mm/yyyy</h5>
                    <h1 style="color: #ffffff; margin-top:-10px;">05</h1>
                </div>
                <div class="info-box-content">
                    <span class="info-box-text" style="padding-top: 10px;">BBN-0719-00005</span>
                    <span class="info-box-number" style="font-weight: normal;">Beban</span>
                    <p style="font-size: 32px; margin-top: -5px; font-weight: bold; color: #4183d7;">VA</p>
                </div>
            </div>
            <div class="info-box kotak">
                <div class="info-box-icon" style="border-radius: 15px; background-color: #4183d7; height: 100%">
                    <h5 style="color: #ffffff; padding: 0; margin-top: 20px;">mm/yyyy</h5>
                    <h1 style="color: #ffffff; margin-top:-10px;">05</h1>
                </div>
                <div class="info-box-content">
                    <span class="info-box-text" style="padding-top: 10px;">BBN-0719-00005</span>
                    <span class="info-box-number" style="font-weight: normal;">Beban</span>
                    <p style="font-size: 32px; margin-top: -5px; font-weight: bold; color: #4183d7;">VA</p>
                </div>
            </div>
            <div class="info-box kotak">
                <div class="info-box-icon" style="border-radius: 15px; background-color: #4183d7; height: 100%">
                    <h5 style="color: #ffffff; padding: 0; margin-top: 20px;">mm/yyyy</h5>
                    <h1 style="color: #ffffff; margin-top:-10px;">05</h1>
                </div>
                <div class="info-box-content">
                    <span class="info-box-text" style="padding-top: 10px;">BBN-0719-00005</span>
                    <span class="info-box-number" style="font-weight: normal;">Beban</span>
                    <p style="font-size: 32px; margin-top: -5px; font-weight: bold; color: #4183d7;">VA</p>
                </div>
            </div>
            <div class="info-box kotak">
                <div class="info-box-icon" style="border-radius: 15px; background-color: #4183d7; height: 100%">
                    <h5 style="color: #ffffff; padding: 0; margin-top: 20px;">mm/yyyy</h5>
                    <h1 style="color: #ffffff; margin-top:-10px;">05</h1>
                </div>
                <div class="info-box-content">
                    <span class="info-box-text" style="padding-top: 10px;">BBN-0719-00005</span>
                    <span class="info-box-number" style="font-weight: normal;">Beban</span>
                    <p style="font-size: 32px; margin-top: -5px; font-weight: bold; color: #4183d7;">VA</p>
                </div>
            </div>
            <div class="info-box kotak">
                <div class="info-box-icon" style="border-radius: 15px; background-color: #4183d7; height: 100%">
                    <h5 style="color: #ffffff; padding: 0; margin-top: 20px;">mm/yyyy</h5>
                    <h1 style="color: #ffffff; margin-top:-10px;">05</h1>
                </div>
                <div class="info-box-content">
                    <span class="info-box-text" style="padding-top: 10px;">BBN-0719-00005</span>
                    <span class="info-box-number" style="font-weight: normal;">Beban</span>
                    <p style="font-size: 32px; margin-top: -5px; font-weight: bold; color: #4183d7;">VA</p>
                </div>
            </div>
            <div class="info-box kotak">
                <div class="info-box-icon" style="border-radius: 15px; background-color: #4183d7; height: 100%">
                    <h5 style="color: #ffffff; padding: 0; margin-top: 20px;">mm/yyyy</h5>
                    <h1 style="color: #ffffff; margin-top:-10px;">05</h1>
                </div>
                <div class="info-box-content">
                    <span class="info-box-text" style="padding-top: 10px;">BBN-0719-00005</span>
                    <span class="info-box-number" style="font-weight: normal;">Beban</span>
                    <p style="font-size: 32px; margin-top: -5px; font-weight: bold; color: #4183d7;">VA</p>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12" style="">
                <h4>Perbaikan Pengajuan</h4>
            </div>
        </div>
        <div class="horizontal-scroll">
            <div class="info-box kotak2">
                <p style="padding-left: 16px; padding-top: 20px; font-size: 18px; color: #ff0000;">BBN-1019-00456</p>
                <p style="padding-left: 16px; margin-top: -10px; padding-top: 0; font-size: 18px;">SPB</p>
                <div style="padding-left: 16px; margin-top: -10px;">
                    <span style="color: #ff0000;">
                        <i class="fa fa-fw fa-circle" style="font-size: 18px; color: #ff0000; filter: drop-shadow(0 0 0.3rem rgba(255,0,0,1));"></i>
                        Deskripsi singkat reject pengajuan transaksi
                    </span>
                </div>
            </div>
            <div class="info-box kotak2">
                <p style="padding-left: 16px; padding-top: 20px; font-size: 18px; color: #ff0000;">BBN-1019-00456</p>
                <p style="padding-left: 16px; margin-top: -10px; padding-top: 0; font-size: 18px;">SPB</p>
                <div style="padding-left: 16px; margin-top: -10px;">
                    <span style="color: #ff0000;">
                        <i class="fa fa-fw fa-circle" style="font-size: 18px; color: #ff0000; filter: drop-shadow(0 0 0.3rem rgba(255,0,0,1));"></i>
                        Deskripsi singkat reject pengajuan transaksi
                    </span>
                </div>
            </div>
            <div class="info-box kotak2">
                <p style="padding-left: 16px; padding-top: 20px; font-size: 18px; color: #ff0000;">BBN-1019-00456</p>
                <p style="padding-left: 16px; margin-top: -10px; padding-top: 0; font-size: 18px;">SPB</p>
                <div style="padding-left: 16px; margin-top: -10px;">
                    <span style="color: #ff0000;">
                        <i class="fa fa-fw fa-circle" style="font-size: 18px; color: #ff0000; filter: drop-shadow(0 0 0.3rem rgba(255,0,0,1));"></i>
                        Deskripsi singkat reject pengajuan transaksi
                    </span>
                </div>
            </div>
            <div class="info-box kotak2">
                <p style="padding-left: 16px; padding-top: 20px; font-size: 18px; color: #ff0000;">BBN-1019-00456</p>
                <p style="padding-left: 16px; margin-top: -10px; padding-top: 0; font-size: 18px;">SPB</p>
                <div style="padding-left: 16px; margin-top: -10px;">
                    <span style="color: #ff0000;">
                        <i class="fa fa-fw fa-circle" style="font-size: 18px; color: #ff0000; filter: drop-shadow(0 0 0.3rem rgba(255,0,0,1));"></i>
                        Deskripsi singkat reject pengajuan transaksi
                    </span>
                </div>
            </div>
            <div class="info-box kotak2">
                <p style="padding-left: 16px; padding-top: 20px; font-size: 18px; color: #ff0000;">BBN-1019-00456</p>
                <p style="padding-left: 16px; margin-top: -10px; padding-top: 0; font-size: 18px;">SPB</p>
                <div style="padding-left: 16px; margin-top: -10px;">
                    <span style="color: #ff0000;">
                        <i class="fa fa-fw fa-circle" style="font-size: 18px; color: #ff0000; filter: drop-shadow(0 0 0.3rem rgba(255,0,0,1));"></i>
                        Deskripsi singkat reject pengajuan transaksi
                    </span>
                </div>
            </div>
            <div class="info-box kotak2">
                <p style="padding-left: 16px; padding-top: 20px; font-size: 18px; color: #ff0000;">BBN-1019-00456</p>
                <p style="padding-left: 16px; margin-top: -10px; padding-top: 0; font-size: 18px;">SPB</p>
                <div style="padding-left: 16px; margin-top: -10px;">
                    <span style="color: #ff0000;">
                        <i class="fa fa-fw fa-circle" style="font-size: 18px; color: #ff0000; filter: drop-shadow(0 0 0.3rem rgba(255,0,0,1));"></i>
                        Deskripsi singkat reject pengajuan transaksi
                    </span>
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-12 col-sm-12 col-xs-12" style="">
                <h4>Modul</h4>
            </div>
        </div>
        <div class="row" class='daftarModul'>
            <div class="col-xs-3">
                <a href="#" data-jenis='Bn' class='detModul'>
                    <div class="info-box kotak3" style="min-height: 70px !important;margin-bottom: 5px;">
                        <h2 style="text-align: center;color: #72bcd4;">Bn</h2>
                    </div>
                    <h5 class="text-center" style="color: black;">Beban</h5>
                </a>
            </div>
            <div class="col-xs-3">
                <a href="#" data-jenis='Pj' class='detModul'>
                    <div class="info-box kotak3" style="min-height: 70px !important;margin-bottom: 5px;">
                        <h2 style="text-align: center;color: #72bcd4;">Pj</h2>
                    </div>
                    <h5 class="text-center" style="color: black;">Panjar</h5>
                </a>
            </div>
            <div class="col-xs-3">
                <a href="#" data-jenis='Hn' class='detModul'>
                    <div class="info-box kotak3" style="min-height: 70px !important;margin-bottom: 5px;">
                        <h2 style="text-align: center;color: #72bcd4;">Hn</h2>
                    </div>
                    <h5 class="text-center" style="color: black;">Honor</h5>
                </a>
            </div>
            <div class="col-xs-3">
                <a href="#" data-jenis='If' class='detModul' type='button'>
                    <div class="info-box kotak3" style="min-height: 70px !important;margin-bottom: 5px;">
                        <h2 style="text-align: center;color: #72bcd4;">If</h2>
                    </div>
                    <h5 class="text-center" style="color: black;">Imprestfund</h5>
                </a>
            </div>
        </div>
    </div>
</div>
<script>
$('.detModul').click(function(){
    var jenis = $(this).data('jenis');
    window.location.href='<?=$root_app?>/mainmobile/fDetailModul/'+jenis;
});
$('#LihatSemua').click(function(){
    window.location.href='<?=$root_app?>/mainmobile/fDetailInfo/';
});
$('.kotak2').click(function(){
    window.location.href='<?=$root_app?>/mainmobile/fDetPengajuan/home';
});
</script>