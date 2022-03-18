<?php 
	$kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_fs=$_SESSION['kode_fs'];
    $res = execute("select max(periode) as periode from exs_neraca where kode_lokasi='$kode_lokasi' ");
    $periode = $res->fields[0];

    $tahun = substr($periode,0,4);
    $tahunSebelum = intval($tahun) - 1;

    $tmp=explode("/",$_GET['param']);

    $kode_fs="FS1";
    $perusahaan = execute("select * from lokasi where kode_lokasi='$kode_lokasi'");
    $nmperus = $perusahaan->fields[1];
	 if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header' style='border: none;'>
		<div class='box' style='border-top: none; border-bottom: none; box-shadow:none !important;'>
			<div class='box-header'>
				<div style='display: inline-block; background-color: #FFFFFF; width: 100%;'>
				<img src='/web/img/logo.png' alt='logo' style='vertical-align: middle; max-width: 3rem; max-height: 3rem; margin-left: 0;'>
				<div style='vertical-align: middle; display: inline-block; background-color: #FFFFFF;'>
					<span style='font-weight: bold; font-size: 1.2rem;'>".$nmperus."</span>
					</div>
                    <p style='text-align: right; color: #A1A1A1; font-size: 1rem; margin-top:-20px;'>".date('d/m/Y')."</p>
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
<div class='box' style='border:none; margin-top: 80px; box-shadow: none;'>
    <div class="box-body" style="border: none; box-shadow: none;">
        <div style="margin-top: -1.5rem;">
            <img src="img/user.png" class="profile-user-img img-responsive img-circle" alt="profile-picture">
             <p class='text-muted' style='margin:auto; padding-top: 1rem; text-align:center; text-transform: uppercase;'><?php echo $nik; ?></p>
        </div>
    <table class="table no-border" style="margin-bottom: 1rem; margin-top: 2rem;">
        <tr>
            <td style="text-align: left; padding-left: 2rem;">Nama</td>
            <td style="text-align: left; padding-left: 12rem;"><?php echo $nik; ?></td>
        </tr>
        <tr>
            <td style="text-align: left; padding-left: 2rem;">Jabatan</td>
            <td style="text-align: left; padding-left: 12rem;">Nama Jabatan</td>
        </tr>
        <tr>
            <td style="text-align: left; padding-left: 2rem;">PP</td>
            <td style="text-align: left; padding-left: 12rem;">Kode PP</td>
        </tr>   
    </table>
    <a href="<?php echo $_SESSION['exit_url']; ?>" class="btn btn-primary" style="margin-left: 2rem; border-radius: 0.8rem; padding: 0.3rem 2rem 0.4rem 2rem; border: none;">Log Out</a>
    </div>
</div>