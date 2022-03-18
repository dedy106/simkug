<?php 
	$kode_lokasi=$_SESSION['lokasi'];
    //$periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
    $periode = $res->fields[0];

    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    $tmp=explode("/",$_GET['param']);

    $kode_fs="FS1";

	// $sql = "select a.kode_menu_lab as kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok, 
	// 		c.kode_pp,d.nama as nama_pp,
	// 		b.kode_lokkonsol,d.kode_bidang, c.foto,isnull(e.form,'-') as path_view,b.logo
    //     	from hakakses a 
    //     	inner join lokasi b on b.kode_lokasi = a.kode_lokasi 
    //     	left join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
    //     	left join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi 
    //     	left join m_form e on a.menu_mobile=e.kode_form 
    //     	where a.nik= 'okta'";
    // $rs  = execute($sql);
    // $row = $rs->FetchNextObject($toupper=false); 

	 if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
            <div class='box' style='border-top: none; box-shadow:none !important;'>
                <div class='box-header'>
                    <div style='display: inline-block; background-color: #FFFFFF; width: 100%;'>
                    <img src='/web/img/logo.png' alt='logo' style='vertical-align: middle; max-width: 3rem; max-height: 3rem; margin-left: 0;'>
                        <div style='vertical-align: middle; display: inline-block; background-color: #FFFFFF;'>
                        <span id='nama-perusahaan' style='font-weight: bold; font-size: 1.2rem;'>Nama Perusahaan</span>
                    </div>
                        <p style='text-align: right; color: #A1A1A1; font-size: 1rem; margin-top:-20px;'>".date('d/m/Y')."</p>
                    </div>
                </div>
            </div>
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
    padding-left: 16px;
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
    width: 88px; 
    margin-right: 10px; 
    display: inline-block;
} 
</style>
<div class="row" style="margin-top: 60px;">
    <div class="col-md-12 col-sm-12 col-xs-12">
        <div class="form-group" style="padding-left: 1rem;">
            <input type="text" class="form-control" placeholder="Cari No Pengajuan" name="no_pengajuan" style="width: 390px; border-radius: 25px;">
        </div>
    </div>

    <div class="col-md-12 col-sm-12 col-xs-12" style="padding-left: 30px; display: flex;">
        <h4>Info Pembendaharaan</h4>
        <a style="margin-left: 140px; margin-top: 15px; font-size: 10px;" href="">Lihat Semua</a>
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
    </div>

    <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" style="padding-left: 30px;">
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
    </div>

    <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" style="padding-left: 30px;">
        <h4>Beban</h4>
    </div>
    </div>

    <div style="margin-left: 16px;">
        <a href="">
        <div class="info-box kotak3" style="float: left;">
            <h2 style="text-align: center; padding-top:10px; color: #72bcd4;">Bn</h2>
        </div>
        </a>
        <a href="">
        <div class="info-box kotak3" style="float: left;">
            <h2 style="text-align: center; padding-top:10px; color: #72bcd4;">Pj</h2>
        </div>
        </a>
        <a href="">
        <div class="info-box kotak3" style="float: left;">
            <h2 style="text-align: center; padding-top:10px; color: #72bcd4;">Hn</h2>
        </div>
        </a>
        <a href="">
        <div class="info-box kotak3" style="float: left;">
            <h2 style="text-align: center; padding-top:10px; color: #72bcd4;">If</h2>
        </div>
        </a>
    </div>

    <div>
        <h5 style="padding-left: 40px; margin-top:-10px;">Beban</h5>
        <h5 style="padding-left: 140px; margin-top:-30px;">Panjar</h5>
        <h5 style="padding-left: 238px; margin-top:-30px;">Honor</h5>
        <h5 style="padding-left: 317px; margin-top:-30px;">Imprestfund</h5>
    </div>