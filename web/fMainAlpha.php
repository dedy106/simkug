<?php
    session_start();
	include('setting.php');
    if(!$_SESSION['isLogedIn']){
        echo "<script>alert('Harap login terlebih dahulu !'); window.location='/web';</script>";
    }
    include_once('autoload.php');

?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <title><?php echo $app_nama?></title>
    <!-- Tell the browser to be responsive to screen width -->
    <meta content="width=device-width, initial-scale=1, maximum-scale=1, user-scalable=no" name="viewport">
    <!-- Bootstrap 3.3.7 -->
    <link rel="stylesheet" href="bootstrap4/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="css/font-awesome.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="css/ionicons.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="css/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
        folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="css/skin-red.min.css">
    <!-- Date Picker -->
    <link rel="stylesheet" href="css/bootstrap-datepicker.min.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="css/daterangepicker.css">
    

    <!-- <link rel="stylesheet" href="css/dataTables.bootstrap.min.css"> -->
    <link rel="stylesheet" href="bootstrap4/datatables/dataTables.bootstrap4.min.css">

    <link rel="stylesheet" href="css/bootstrap-toggle.min.css">
    
  
    <!-- SELECTIZE -->
    <link href="css/selectize.bootstrap3.css" rel="stylesheet">
    
     <!--Jquery Treegrid -->
    <link href="css/jquery.treegrid.css" rel="stylesheet">
    
    <!--SAI GLOBAL ADMIN CSS-->
    <link href="css/sai.css" rel="stylesheet">

    <!-- Text editor -->
    <link rel="stylesheet" href="css/bootstrap3-wysihtml5.min.css">



    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Font -->
    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

    <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
    <link rel="manifest" href="img/favicon/manifest.json">
    <link rel="mask-icon" href="img/favicon/safari-pinned-tab.svg" color="#5bbad5">

     <!-- jQuery 3 -->
     <script src="js/jquery.min.js"></script>
   <!-- Bootstrap 3.3.7 -->
    
<script src="bootstrap4/bootstrap.bundle.min.js"></script>
    <!-- Highcharts -->
    <script src="js/highcharts2.js"></script>
    <!-- <script src="js/highcharts-3d.js"></script> -->
    <!-- <script src="https://code.highcharts.com/modules/bullet.js"></script> -->
    <script src="js/highcharts-more.js"></script>
    <!-- daterangepicker -->
    <script src="js/moment.min.js"></script>
    <script src="js/daterangepicker.js"></script>
    <!-- datepicker -->
    <script src="js/bootstrap-datepicker.min.js"></script>
   <!-- AdminLTE App -->
    <script src="js/adminlte.min.js"></script>
    <!-- DataTables -->
    <!-- <script src="js/jquery.dataTables.min.js"></script>
    <script src="js/dataTables.bootstrap.min.js"></script> -->
    
<script src="bootstrap4/datatables/jquery.dataTables.min.js"></script>
<script src="bootstrap4/datatables/dataTables.bootstrap4.min.js"></script>
    <!-- Currency InputMask -->
    <script src="js/inputmask.js"></script>
    <script src="js/bootstrap-toggle.min.js"></script>
    <!-- Text editor -->
    <script src="js/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- Selectize -->
    <!-- <script src="js/selectize.min.js"></script> -->
    <script src="js/standalone/selectize.min.js"></script>
    <!-- PULL REFRESH-->
    <script src="js/index.umd.min.js"></script>

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
    
    <meta name="theme-color" content="#ffffff">
</head>

<body class="skin-red fixed sidebar-mini sidebar-mini-expand-feature">
    <div class="wrapper">

        <header class="main-header" id='header'>
            <!-- Logo -->
            <a href="#" class="logo" style='height: 55px;'>
            <!-- mini logo for sidebar mini 50x50 pixels -->
            <span class="logo-mini"><b></b> SAI</span>
            <!-- logo for regular state and mobile devices -->
            <span class="logo-lg"><b></b> SAI</span>
            </a>
            <!-- Header Navbar: style can be found in header.less -->
            <nav class="navbar navbar-static-top" id='navbar_header'>
            <!-- Sidebar toggle button-->
            <a href="#" class="sidebar-toggle py-0" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a>
            <?php
            
                $jumNot="select count(*) as jumlah from api_notif where kode_lokasi='".$_SESSION['lokasi']."' and nik='".$_SESSION['userLog']."' ";

                $rs2=execute($jumNot);
        
                $sqlNot="select top 5 * from api_notif where kode_lokasi='".$_SESSION['lokasi']."' and nik='".$_SESSION['userLog']."' order by tgl_notif desc ";
        
                $rs3=execute($sqlNot);
            ?>

            <div class="navbar-custom-menu">
                <ul class="nav justify-content-end">
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
                    <a class="nav-link" data-widget="control-sidebar" data-slide="true" href="#"><i class="fa fa-filter fa-lg"></i></a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?php echo $_SESSION['exit_url']?>">
                    <i class="fa fa-sign-out fa-lg"></i></a>
                </li>     
                </ul>
            </div>
            </nav>
        </header>
        <!-- Left side column. contains the logo and sidebar -->
        <aside class="main-sidebar">
            <!-- sidebar: style can be found in sidebar.less -->
            <section class="sidebar">
                <ul class="sidebar-menu" data-widget="tree">
                    <?php
                    $kode_menu = $_SESSION['kodeMenu'];

                    $sql="select a.*,b.form  from menu a 
                    left join m_form b on a.kode_form=b.kode_form 
                    where a.kode_klp = '$kode_menu' order by kode_klp, rowindex";
                    $rs=execute($sql);
                    //$daftar_menu = $rs->GetRowAssoc(); 

                    while ($row = $rs->FetchNextObject($toupper=false))
                    {
                        $daftar_menu[] = (array)$row;
                    }

                    $pre_prt = 0;
                    $parent_array = array();
                    for($i=0; $i<count($daftar_menu); $i++){
                        $forms = str_replace("_","/", $daftar_menu[$i]["form"]);
                        $this_lv = $daftar_menu[$i]['level_menu']; // t1 lv=0
                        $this_link = "fMainAlpha.php?hal=".$forms.".php";

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
                            <li>
                                <a href='$this_link'>
                                    <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                                </a>
                            </li>";
                        }
                        else if($this_lv == 0 AND $next_lv > 0){
                            echo " 
                            <li class='treeview'>
                                <a href='$this_link'>
                                    <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                                    <span class='pull-right-container'>
                                        <i class='fa fa-angle-left pull-right'></i>
                                    </span>
                                </a>
                                <ul class='treeview-menu' id='sai_adminlte_menu_".$daftar_menu[$i]["kode_menu"]."'>";
                        }else if(($this_lv > $prev_lv OR $this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv < $next_lv){
                            echo " 
                            <li class='treeview'>
                                <a href='$this_link'>
                                    <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                                    <span class='pull-right-container'>
                                        <i class='fa fa-angle-left pull-right'></i>
                                    </span>
                                </a>
                                <ul class='treeview-menu' id='sai_adminlte_menu_".$daftar_menu[$i]["kode_menu"]."'>";
                        }else if(($this_lv > $prev_lv OR $this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv == $next_lv){
                            echo " 
                            <li>
                                <a href='$this_link'>
                                    <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                                </a>
                            </li>";
                           
                        }else if($this_lv > $prev_lv AND $this_lv > $next_lv){
                            echo " 
                            <li>
                                <a href='$this_link'>
                                    <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                                </a>
                            </li>";
                            for($i=0; $i<($this_lv - $next_lv); $i++){
                                echo "</ul></li>";
                            }
                        }else if(($this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv > $next_lv){
                            echo " 
                            <li>
                                <a href='$this_link'>
                                    <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                                </a>
                            </li>";
                    echo "</ul>
                        </li>";
                            // for($i=0; $i<($this_lv - $next_lv); $i++){
                            //     echo "</ul></li>";
                            // }
                        }
                    }
                ?>
                </ul>
            </section>
            <!-- /.sidebar -->
        </aside>

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper">
            <!-- <div class="row" style="padding-right:20px;">
                <section class="content-header">
                    <ol class="breadcrumb" style="float:left; position: relative; top: 0px; left: 10px; right:0px;">
                        <li><a href="#"><i class="fa fa-dashboard"></i> Dashboard</a></li>
                        <li class="active" id='content_sub_page'></li>
                    </ol>
                </section>
            </div> -->

            <!-- Main content -->
            

            <div id="loading-overlay" style="background: #e9e9e9; display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index:5;">
                <center>
                    <img src="" style='position:fixed; top: 50%; transform: translateY(-50%);'>
                </center>
            </div>
            <section class="content" id='ajax-content-section'>
                    <?php
                    // echo $_SESSION['foto'];
                    // echo $img;
                    include_once($_GET['hal']); 
                    
                    ?>
            </section>
            <!-- /.content -->
        </div>
        <!-- FORM UBAH PASS -->
        <div class="modal fade" id="modalPass" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog" role="document">
                <div class="modal-content">
                    <div class="modal-header">
                        <h4 class="modal-title">Ubah Password</h4>
                    </div>
                    
                    <form id="form-ubpass" method='POST'>
                        <div class="modal-body">
                            <div class='row'>
                                <div class='form-group'>
                                    <label class='control-label col-sm-3'>Password Lama</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <input type='password' name='password_lama' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <label class='control-label col-sm-3'>Password Baru</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <input type='password' name='password_baru' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <label class='control-label col-sm-3'>Ulangi Password</label>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <input type='password' name='password_repeat' class='form-control' maxlength='10' placeholder='Masukkan Password Lama' required>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <input type='hidden' name='nik' class='form-control' value='<?php echo $nik; ?>'>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <input type='hidden' name='kode_lokasi' class='form-control' value='<?php echo $kode_lokasi; ?>'>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <input type='hidden' name='kode_pp' class='form-control' maxlength='10' value='<?php echo $kode_pp; ?>'>
                                    </div>
                                </div>
                                <div class='form-group'>
                                    <div class='col-sm-9' style='margin-bottom:5px;'>
                                        <input type='hidden' name='tbl' class='form-control' maxlength='10' value='<?php echo $_SESSION['hakakses']; ?>'>
                                    </div>
                                </div>
                            </div>
                            <div class='row'>
                                <div class='col-sm-12' style='margin-bottom:5px;'>
                                    <div id='validation-box2'></div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-footer">
                            <a class="btn btn-default" data-dismiss="modal"> Tutup</a>
                            <button type="submit" class="btn btn-success">Simpan</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        <!-- /.content-wrapper -->
        <!--<footer class="main-footer">
            <strong>PT. Samudra Aplikasi Indonesia &copy; 2017 <a href="http://mysai.co.id/">MySAI</a>.</strong> <br>
            <div class="pull-right hidden-xs">
                <b>Version</b> 2.4.0
            </div>
            <strong>AdminLTE</strong> Template - Copyright &copy; 2014-2016 <a href="https://adminlte.io">Almsaeed Studio</a>. All rights
            reserved.
        </footer>-->

        <!-- Control Sidebar -->
        <!-- <aside class="control-sidebar control-sidebar-dark">
            <div class="tab-content">
                <div class="tab-pane active" id="control-sidebar-home-tab">
                    <select class='form-control input-sm' id='dash_dept' style="margin-bottom:5px;">
                        <option value=''>Pilih Lokasi</option>
                    </select>
                    <select class='form-control input-sm' id='dash_periode' style="margin-bottom:5px;">
                        <option value=''>Pilih Periode</option>
                    </select>
                    <a class="btn btn-sm btn-default pull-right" id='dash_refresh' style="cursor:pointer; max-height:30px;" data-toggle="control-sidebar"><i class="fa fa-refresh fa-1"></i> Refresh</a>
                </div>
            </div>
        </aside> -->
        <!-- /.control-sidebar -->
        <!-- Add the sidebar's background. This div must be placed
            immediately after the control sidebar -->
        <div class="control-sidebar-bg"></div>
    </div>
    <!-- ./wrapper -->

   

    
</body>
</html>
<script>
    $('#btn-refresh').click(function(){
	    location.reload();
    });

    $('#ubpass').click(function(){
	    $('#modalPass').modal('show');
    });

    function clearInput(){
        $("input:not([type='radio'],[type='checkbox'],[type='submit'])").val('');
        $('textarea').val('');
        $("select:not('.selectize')").val('');
        $('#validation-box2').text('');
    }
    
    $('#form-ubpass').submit(function(event){
        event.preventDefault();
        var formData = new FormData(this);
        
        $.ajax({
            url: 'include_lib.php?hal=server/cms/CMS.php&fx=ubahPassword',
            data: formData,
            type: "post",
            dataType: "json",
            contentType: false, 
            cache: false, 
            processData:false, 
            success: function (data) {
                alert(data.alert);

                if(data.status == 1){
                    $('#modalPass').modal('hide');
                    $('#validation-box2').html("");
                    clearInput();
                    // location.reload();
                }else if (data.status == 3){
                    var error_list = "<div class='alert alert-danger' style='padding:0px; padding-top:5px; padding-bottom:5px; margin:0px; color: #a94442; background-color: #f2dede; border-color: #ebccd1;'><ul>";
                    for(i = 0; i<data.error_input.length; i++){
                        error_list += '<li>'+data.error_input[i]+'</li>';
                    }
                    error_list += "</ul></div>";
                    status = false;
                    $('#modalPass').find('#validation-box2').html(error_list);
                }
            }
        });
    });

    PullToRefresh.init({
        // mainElement: '#ajax-content-section',
        // distIgnore: 50,
        onRefresh: function() { 
            location.reload();
        }
      });
    
</script>

