<?php

session_start();
include('setting.php');
  if(!$_SESSION['isLogedIn']){
      echo "<script>alert('Harap login terlebih dahulu !'); window.location='/web';</script>";
  }
  include_once('autoload.php');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta http-equiv="x-ua-compatible" content="ie=edge">

  <title><?php echo $app_nama?></title>

  <!-- Font Awesome Icons -->
  <link rel="stylesheet" href="css/font-awesome.css">
  <!-- IonIcons -->
  <link rel="stylesheet" href="http://code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css">
  <!-- DataTables -->
  <link rel="stylesheet" href="AdminLTE-3/plugins/datatables/dataTables.bootstrap4.min.css">
  <!-- daterange picker -->
  <link rel="stylesheet" href="AdminLTE-3/plugins/daterangepicker/daterangepicker-bs3.css">
  <!-- Date Picker -->
  <link rel="stylesheet" href="css/bootstrap-datepicker.min.css">
  <!-- Bootstrap time Picker -->
  <link rel="stylesheet" href="AdminLTE-3/plugins/timepicker/bootstrap-timepicker.min.css">
  <!-- bootstrap wysihtml5 - text editor -->
  <link rel="stylesheet" href="AdminLTE-3/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.min.css">
  <!-- Theme style -->
  <link rel="stylesheet" href="AdminLTE-3/dist/css/adminlte.min.css">
  <link rel="stylesheet" href="css/bootstrap-toggle.min.css">  
  <!-- SELECTIZE -->
  <link href="css/selectize.bootstrap3.css" rel="stylesheet">  
  <!--Jquery Treegrid -->
  <link href="css/jquery.treegrid.css" rel="stylesheet">  
  <!--SAI GLOBAL ADMIN CSS-->
  <link href="css/sai.css" rel="stylesheet">

  <!-- Google Font: Source Sans Pro -->
  <link href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,400i,700" rel="stylesheet">
  <style>
     div.media,
     a.item-notif{
         color:black !important;
     }
  </style>
 </head>
<!--
BODY TAG OPTIONS:
=================
Apply one or more of the following classes to to the body tag
to get the desired effect
|---------------------------------------------------------|
|LAYOUT OPTIONS | sidebar-collapse                        |
|               | sidebar-mini                            |
|---------------------------------------------------------|
-->
<body class="hold-transition sidebar-mini">
<div class="wrapper">
  <!-- Navbar -->
  <nav class="main-header navbar fixed-top navbar-expand border-bottom navbar-dark bg-danger">
    <!-- Left navbar links -->
    <ul class="navbar-nav">
      <li class="nav-item">
        <a class="nav-link" data-widget="pushmenu" href="#"><i class="fa fa-bars"></i></a>
      </li>
      <!-- <li class="nav-item d-none d-sm-inline-block">
        <a href="index3.html" class="nav-link">Home</a>
      </li>
      <li class="nav-item d-none d-sm-inline-block">
        <a href="#" class="nav-link">Contact</a>
      </li> -->
    </ul>

    <!-- SEARCH FORM -->
    <!-- <form class="form-inline ml-3">
      <div class="input-group input-group-sm">
        <input class="form-control form-control-navbar" type="search" placeholder="Search" aria-label="Search">
        <div class="input-group-append">
          <button class="btn btn-navbar" type="submit">
            <i class="fa fa-search"></i>
          </button>
        </div>
      </div>
    </form> -->

    <!-- Right navbar links -->
    <ul class="navbar-nav ml-auto">
      <!-- Messages Dropdown Menu -->
      <!-- <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-comments-o"></i>
          <span class="badge badge-danger navbar-badge">3</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <a href="#" class="dropdown-item"> -->
            <!-- Message Start -->
            <!-- <div class="media">
              <img src="AdminLTE-3/dist/img/user1-128x128.jpg" alt="User Avatar" class="img-size-50 mr-3 img-circle">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Brad Diesel
                  <span class="float-right text-sm text-danger"><i class="fa fa-star"></i></span>
                </h3>
                <p class="text-sm">Call me whenever you can...</p>
                <p class="text-sm text-muted"><i class="fa fa-clock-o mr-1"></i> 4 Hours Ago</p>
              </div>
            </div> -->
            <!-- Message End -->
          <!-- </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item"> -->
            <!-- Message Start -->
            <!-- <div class="media">
              <img src="AdminLTE-3/dist/img/user8-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  John Pierce
                  <span class="float-right text-sm text-muted"><i class="fa fa-star"></i></span>
                </h3>
                <p class="text-sm">I got your message bro</p>
                <p class="text-sm text-muted"><i class="fa fa-clock-o mr-1"></i> 4 Hours Ago</p>
              </div>
            </div> -->
            <!-- Message End -->
          <!-- </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item"> -->
            <!-- Message Start -->
            <!-- <div class="media">
              <img src="AdminLTE-3/dist/img/user3-128x128.jpg" alt="User Avatar" class="img-size-50 img-circle mr-3">
              <div class="media-body">
                <h3 class="dropdown-item-title">
                  Nora Silvester
                  <span class="float-right text-sm text-warning"><i class="fa fa-star"></i></span>
                </h3>
                <p class="text-sm">The subject goes here</p>
                <p class="text-sm text-muted"><i class="fa fa-clock-o mr-1"></i> 4 Hours Ago</p>
              </div>
            </div> -->
            <!-- Message End -->
          <!-- </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item dropdown-footer">See All Messages</a>
        </div>
      </li> -->
      <li class="nav-item">
        <a class="nav-link" href="#">
        <i class="fa fa-undo fa-lg"></i></a>
      </li>   
      <!-- Notifications Dropdown Menu -->
      <li class="nav-item dropdown">
        <a class="nav-link" data-toggle="dropdown" href="#">
          <i class="fa fa-bell-o"></i>
          <span class="badge badge-warning navbar-badge">15</span>
        </a>
        <div class="dropdown-menu dropdown-menu-lg dropdown-menu-right">
          <span class="dropdown-item dropdown-header">15 Notifications</span>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item item-notif">
            <i class="fa fa-envelope mr-2"></i> 4 new messages
            <span class="float-right text-muted text-sm">3 mins</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item item-notif">
            <i class="fa fa-users mr-2"></i> 8 friend requests
            <span class="float-right text-muted text-sm">12 hours</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item item-notif">
            <i class="fa fa-file mr-2"></i> 3 new reports
            <span class="float-right text-muted text-sm">2 days</span>
          </a>
          <div class="dropdown-divider"></div>
          <a href="#" class="dropdown-item item-notif dropdown-footer">See All Notifications</a>
        </div>
      </li>
      
      <li class="nav-item">
        <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i
            class="fa fa-filter fa-lg"></i></a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="<?php echo $_SESSION['exit_url']; ?>">
        <i class="fa fa-sign-out fa-lg"></i></a>
      </li>     
    </ul>
  </nav>
  <!-- /.navbar -->

  <!-- Main Sidebar Container -->
  <aside class="main-sidebar elevation-4 sidebar-dark-danger">
    <!-- Brand Logo -->
    <a href="index3.html" class="brand-link bg-danger">
      <img src="AdminLTE-3/dist/img/AdminLTELogo.png" alt="AdminLTE Logo" class="brand-image img-circle elevation-3"
           style="opacity: .8">
      <span class="brand-text font-weight-light text-center">SAI</span>
    </a>

    <!-- Sidebar -->
    <div class="sidebar">
      <!-- Sidebar user panel (optional) -->
      <div class="user-panel mt-3 pb-3 mb-3 d-flex">
        <div class="image">
          <img src="AdminLTE-3/dist/img/user2-160x160.jpg" class="img-circle elevation-2" alt="User Image">
        </div>
        <div class="info">
          <a href="#" class="d-block"><?= $_SESSION["namaUser"]?></a>
        </div>
      </div>

      <!-- Sidebar Menu -->
      <nav class="mt-2">
        <ul class="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <?php

          $kode_menu = $_SESSION['kodeMenu'];

          $sql="select a.*,b.form  from menu a 
          left join m_form b on a.kode_form=b.kode_form 
          where a.kode_klp = '$kode_menu' order by kode_klp, rowindex";
          $rs=execute($sql);

          $rs=execute($sql);
          while($row = $rs->FetchNextObject($toupper=false)){
              $daftar_menu[] = (array)$row;

          }
          
          $pre_prt = 0;
          $parent_array = array();
          for($i=0; $i<count($daftar_menu); $i++){
              $forms = str_replace("_","/", $daftar_menu[$i]["form"]);
              $this_lv = $daftar_menu[$i]['level_menu']; // t1 lv=0
              $this_link = "fMain3Alpha.php?hal=".$forms.".php";

              if(!ISSET($daftar_menu[$i-1]['level_menu'])){
                  $prev_lv = 0; // t1 pv=0
              }else{
                  $prev_lv = $daftar_menu[$i-1]['level_menu'];
              }

              if(!ISSET($daftar_menu[$i+1]['level_menu'])){
                  $next_lv = $daftar_menu[$i]['level_menu'];
              }else{
                  $next_lv = $daftar_menu[$i+1]['level_menu']; //t1 nv=1
              }

              if($daftar_menu[$i]['level_menu']=="0"){
                  if($daftar_menu[$i]['icon'] != "" && $daftar_menu[$i]['icon'] != null){
                      $icon=$daftar_menu[$i]['icon'];
                  }else{
                      $icon="fa fa-caret-right";
                  }
                  
              }else{
                  if($daftar_menu[$i]['icon'] != "" && $daftar_menu[$i]['icon'] != null){
                      $icon=$daftar_menu[$i]['icon'];
                  }else{
                      $icon="fa fa-edit";
                  }
              }

              if($this_lv == 0 AND $next_lv == 0){
                  echo " 
                  <li class='nav-item'>
                    <a href='$this_link' class='nav-link'>
                        <i class='nav-icon $icon'></i>
                        <p>
                        ".$daftar_menu[$i]["nama"]."
                        </p>
                    </a>
                  </li>";
              }
              else if($this_lv == 0 AND $next_lv > 0){
                  echo " 
                  <li class='nav-item has-treeview'>
                    <a href='$this_link' class='nav-link'>
                        <i class='nav-icon fa fa-edit'></i>
                        <p>
                            ".$daftar_menu[$i]["nama"]."
                            <i class='fa fa-angle-left right'></i>
                        </p>
                    </a>
                    <ul class='nav nav-treeview'>";
              }else if(($this_lv > $prev_lv OR $this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv < $next_lv){
                    echo " 
                    <li class='nav-item has-treeview'>
                    <a href='$this_link' class='nav-link'>
                        <i class='nav-icon fa fa-edit'></i>
                        <p>
                            ".$daftar_menu[$i]["nama"]."
                            <i class='fa fa-angle-left right'></i>
                        </p>
                    </a>
                    <ul class='nav nav-treeview'>";
              }else if(($this_lv > $prev_lv OR $this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv == $next_lv){
                echo " 
                <li class='nav-item'>
                  <a href='$this_link' class='nav-link'>
                      <i class='nav-icon $icon'></i>
                      <p>
                      ".$daftar_menu[$i]["nama"]."
                      </p>
                  </a>
                </li>";
                 
              }else if($this_lv > $prev_lv AND $this_lv > $next_lv){
                echo " 
                <li class='nav-item'>
                  <a href='$this_link' class='nav-link'>
                      <i class='nav-icon $icon'></i>
                      <p>
                      ".$daftar_menu[$i]["nama"]."
                      </p>
                  </a>
                </li>";
                  for($i=0; $i<($this_lv - $next_lv); $i++){
                      echo "</ul></li>";
                  }
              }else if(($this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv > $next_lv){
                echo " 
                <li class='nav-item'>
                  <a href='$this_link' class='nav-link'>
                      <i class='nav-icon $icon'></i>
                      <p>
                      ".$daftar_menu[$i]["nama"]."
                      </p>
                  </a>
                </li>";
          echo "</ul>
              </li>";
              }
          }
      ?>
      </nav>
      <!-- /.sidebar-menu -->
    </div>
    <!-- /.sidebar -->
  </aside>

  <!-- Content Wrapper. Contains page content -->
  <div class="content-wrapper">
    <!-- Content Header (Page header) -->
    <!-- <div class="content-header " style="padding-top:70px">
      <div class="container-fluid">
        <div class="row mb-2">
          <div class="col-sm-6">
            <h1 class="m-0 text-dark">Dashboard v3</h1>
          </div> -->
          <!-- /.col -->
          <!-- <div class="col-sm-6">
            <ol class="breadcrumb float-sm-right">
              <li class="breadcrumb-item"><a href="#">Home</a></li>
              <li class="breadcrumb-item active">Dashboard v3</li>
            </ol> 
          </div>-->
          <!-- /.col -->
        <!-- </div> -->
        <!-- /.row -->
      <!-- </div> -->
      <!-- /.container-fluid -->
    <!-- </div> -->
    <!-- /.content-header -->

    <!-- Main content -->
    <div class="content" style='padding-top:70px'>
      <div class="container-fluid">
          <?php

          include_once($_GET['hal']); 
          
          ?>
      </div>
      <!-- /.container-fluid -->
    </div>
    <!-- /.content -->
  </div>
  <!-- /.content-wrapper -->

  <!-- Control Sidebar -->
  <aside class="control-sidebar control-sidebar-dark">
    <!-- Control sidebar content goes here -->
  </aside>
  <!-- /.control-sidebar -->

  <!-- Main Footer -->
  <!-- <footer class="main-footer"> -->
    <!-- To the right -->
    <!-- <div class="float-right d-none d-sm-block-down">
      Anything you want
    </div> -->
    <!-- Default to the left -->
    <!-- <strong>Copyright &copy; 2018 <a href="https://adminlte.io">AdminLTE.io</a>.</strong> All rights reserved.
  </footer> -->
</div>
<!-- ./wrapper -->

<!-- REQUIRED SCRIPTS -->

<!-- jQuery -->
<script src="js/jquery.min.js"></script>
<!-- Bootstrap -->
<script src="AdminLTE-3/plugins/bootstrap/js/bootstrap.bundle.min.js"></script>

<!-- DataTables -->
<script src="AdminLTE-3/plugins/datatables/jquery.dataTables.min.js"></script>
<script src="AdminLTE-3/plugins/datatables/dataTables.bootstrap4.min.js"></script>
<!-- Highcharts -->
<script src="js/highcharts2.js"></script>
<!-- <script src="js/highcharts-3d.js"></script> -->
<!-- <script src="https://code.highcharts.com/modules/bullet.js"></script> -->
<script src="js/highcharts-more.js"></script>
<!-- InputMask -->
<script src="AdminLTE-3/plugins/input-mask/jquery.inputmask.js"></script>
<script src="AdminLTE-3/plugins/input-mask/jquery.inputmask.date.extensions.js"></script>
<script src="AdminLTE-3/plugins/input-mask/jquery.inputmask.extensions.js"></script>
<script src="js/bootstrap-toggle.min.js"></script>
<!-- date-range-picker -->
<script src="AdminLTE-3/plugins/daterangepicker/daterangepicker.js"></script>
<!-- datepicker -->
<script src="js/bootstrap-datepicker.min.js"></script>
<!-- Selectize -->
<!-- <script src="js/selectize.min.js"></script> -->
<script src="js/standalone/selectize.min.js"></script>
<!-- bootstrap time picker -->
<script src="AdminLTE-3/plugins/timepicker/bootstrap-timepicker.min.js"></script>
<!-- Bootstrap WYSIHTML5 -->
<script src="AdminLTE-3/plugins/bootstrap-wysihtml5/bootstrap3-wysihtml5.all.min.js"></script>

<!-- AdminLTE -->
<script src="AdminLTE-3/dist/js/adminlte.js"></script>

<!-- JS Tree -->
<script src="js/jquery.treegrid.js"></script>
<script type="text/javascript">
$(document).ready(function() {
    $('.tree').treegrid({
        expanderExpandedClass: 'glyphicon glyphicon-minus',
        expanderCollapsedClass: 'glyphicon glyphicon-plus'
    });
    $('.selectize').selectize();
});
</script>

</body>
</html>
