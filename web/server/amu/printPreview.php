<?php
    session_start();
    
    $root=$_SERVER["DOCUMENT_ROOT"];
    $root_app="http://".$_SERVER['SERVER_NAME']."/web/app/amu";
    $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/amu";
	$folder_css=$root2."/web/css";
	$folder_js=$root2."/web/js";
    $folder_img=$root2."/web/img";
    $root_img="http://".$_SERVER['SERVER_NAME'];
	
    include_once($root.'/web/lib/helpers.php');
    include_once($root.'/web/lib/koneksi.php');
    include_once($root.'/web/setting.php');
?>
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>SAI Front End Dev</title>
	<!-- Tell the browser to be responsive to screen width -->
	<meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
	<!-- Bootstrap 3.3.7 -->
	<link rel="stylesheet" href="<?=$folder_css?>/bootstrap.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="<?=$folder_css?>/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="<?=$folder_css?>/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="<?=$folder_css?>/AdminLTE.min.css">
    <!--SAI GLOBAL ADMIN CSS-->
    <link href="<?=$folder_css?>/sai.css" rel="stylesheet">

      <!-- jQuery 3 -->
    <script src="<?=$folder_js?>/jquery.min.js"></script>
    <script src="<?=$folder_js?>/additional_script.js"></script>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body onload="window.print()">
	<div class="wrapper" style="width:auto; overflow: visible;">
		<!-- Main content -->
		<section class="invoice">    
		<?php
			 $data = $_GET;
			 $kode_lokasi = $data['kode_lokasi'];
			 $kode_pp = $data['kode_pp'];
			 $kode_klp = $data['kode_klp'];
			 $no_bukti = $data['no_bukti'];
			 if($kode_klp == "" OR $kode_klp == "all"){
				 $filter = "";
			 } else{
				 $filter = " and kode_klp='$kode_klp' ";
			 }
			 if($no_bukti == "" OR $no_bukti == "all"){
				 $filter2 = "";
			 } else{
				 $filter2 = " and no_bukti='$no_bukti' ";
			 }
			 $sql="select no_bukti,nama_inv as nama from amu_asset_bergerak where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' $filter $filter2 ";
			 
			 $data = dbResultArray($sql);
			 $html = "<div class='row'>";
			 for($i=0;$i<count($data);$i++){
				 $isi_teks = $data[$i]['no_bukti'].".png";
				 $html .= "<div class='col-sm-3'><h6>".$data[$i]['no_bukti']."</h6><img src='$root_ser/temp/$isi_teks'/></div>";
				 
			 }
			 echo $html;
		?>
			
		</section>
		<!-- /.content -->
	</div>
	<!-- ./wrapper -->
    
</body>
</html>
