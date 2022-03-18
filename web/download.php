<?php
    session_start();
    if(!$_SESSION['isLogedIn']){
        echo "<script>alert('Harap login terlebih dahulu !'); window.location='fLogin.php';</script>";
    }
    include("lib/koneksi.php");
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
	<link rel="stylesheet" href="css/bootstrap.min.css">
	<!-- Font Awesome -->
	<link rel="stylesheet" href="css/font-awesome.min.css">
	<!-- Ionicons -->
	<link rel="stylesheet" href="css/ionicons.min.css">
	<!-- Theme style -->
	<link rel="stylesheet" href="css/AdminLTE.min.css">
    <!--SAI GLOBAL ADMIN CSS-->
    <link href="css/sai.css" rel="stylesheet">

      <!-- jQuery 3 -->
    <script src="js/jquery.min.js"></script>
    <script src="js/additional_script.js"></script>

	<link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">
</head>
<body>
	<div class="wrapper" style="width:auto; overflow: visible;">
		<!-- Main content -->
		<section class="invoice">
            <?php include_once($_GET['hal']);  ?>
		</section>
		<!-- /.content -->
	</div>
	<!-- ./wrapper -->
    
</body>
</html>
