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
<<style type="text/css" media="screen">
    .kotak{
    border-radius: 15px; 
    box-shadow: 0px 7px 19px -10px rgba(0,0,0,0.75); 
    height:100px; 
    width: 100%;  
 }
</style>
<div class="row" style="margin-top: 60px; margin-left: 5px;">
    <div class="col-md-6 col-xs-6 col-sm-6">
        <div class="info-box kotak">
            <h4 style="text-align: center;">Pendapatan</h4>
        </div>
    </div>
    <div class="col-sm-6 col-xs-6 col-md-6">
        <div class="info-box kotak" style="margin-left: -20px;">
            <h4 style="text-align: center;">Beban</h4>
        </div>
    </div>
</div>