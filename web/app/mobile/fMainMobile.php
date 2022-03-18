<?php
    session_start();
	$root=$_SERVER["DOCUMENT_ROOT"];
    $root_app="http://".$_SERVER['SERVER_NAME']."/web/app/mobile";
    $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/mobile";
	$folder_css=$root2."/web/css";
	$folder_js=$root2."/web/js";
	$folder_img=$root2."/web/img";
	
	
	
    if(!$_SESSION['isLogedIn']){
        echo "<script>alert('Harap login terlebih dahulu !'); window.location='$root_app/fLoginMobile.php';</script>";
    }
    include_once($root.'/web/lib/helpers.php');
    include_once($root.'/web/lib/koneksi.php');
    include_once($root.'/web/setting.php');
	


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
    <link rel="stylesheet" href="<?=$folder_css?>/bootstrap.min.css">
    <!-- Font Awesome -->
    <link rel="stylesheet" href="<?=$folder_css?>/font-awesome.css">
    <!-- Ionicons -->
    <link rel="stylesheet" href="<?=$folder_css?>/ionicons.css">
    <!-- Theme style -->
    <link rel="stylesheet" href="<?=$folder_css?>/AdminLTE.min.css">
    <!-- AdminLTE Skins. Choose a skin from the css/skins
        folder instead of downloading all of them to reduce the load. -->
    <link rel="stylesheet" href="<?=$folder_css?>/skin-red.min.css">
    <!-- Date Picker -->
    <link rel="stylesheet" href="<?=$folder_css?>/bootstrap-datepicker.min.css">
    <!-- Daterange picker -->
    <link rel="stylesheet" href="<?=$folder_css?>/daterangepicker.css">
    

    <link rel="stylesheet" href="<?=$folder_css?>/dataTables.bootstrap.min.css">

    <link rel="stylesheet" href="<?=$folder_css?>/bootstrap-toggle.min.css">
    
  
    <!-- SELECTIZE -->
    <link href="<?=$folder_css?>/selectize.bootstrap3.css" rel="stylesheet">
    
     <!--Jquery Treegrid -->
    <link href="<?=$folder_css?>/jquery.treegrid.css" rel="stylesheet">
    
    <!--SAI GLOBAL ADMIN CSS-->
    <link href="<?=$folder_css?>/sai.css" rel="stylesheet">

    <!-- Text editor -->
    <link rel="stylesheet" href="<?=$folder_css?>/bootstrap3-wysihtml5.min.css">



    <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
    <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
    <!--[if lt IE 9]>
    <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
    <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
    <![endif]-->

    <!-- Google Font -->
    <link href="https://fonts.googleapis.com/css?family=Roboto:400,500,900&display=swap&subset=latin-ext" rel="stylesheet">

    <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-touch-icon.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
    <link rel="manifest" href="img/favicon/manifest.json">
    <link rel="mask-icon" href="img/favicon/safari-pinned-tab.svg" color="#5bbad5">

     <!-- jQuery 3 -->
     <script src="<?=$folder_js?>/jquery.min.js"></script>
   <!-- Bootstrap 3.3.7 -->
    <script src="<?=$folder_js?>/bootstrap.min.js"></script>
    <!-- Highcharts -->
    <script src="<?=$folder_js?>/highcharts.js"></script>
    <script src="<?=$folder_js?>/highcharts-more.js"></script>
    <!-- daterangepicker -->
    <script src="<?=$folder_js?>/moment.min.js"></script>
    <script src="<?=$folder_js?>/daterangepicker.js"></script>
    <!-- datepicker -->
    <script src="<?=$folder_js?>/bootstrap-datepicker.min.js"></script>
   <!-- AdminLTE App -->
    <script src="<?=$folder_js?>/adminlte.min.js"></script>
    <!-- DataTables -->
    <script src="<?=$folder_js?>/jquery.dataTables.min.js"></script>
    <script src="<?=$folder_js?>/dataTables.bootstrap.min.js"></script>
    <!-- Currency InputMask -->
    <script src="<?=$folder_js?>/inputmask.js"></script>
    <script src="<?=$folder_js?>/bootstrap-toggle.min.js"></script>
    <!-- Text editor -->
    <script src="<?=$folder_js?>/bootstrap3-wysihtml5.all.min.js"></script>
    <!-- Selectize -->
    <!-- <script src="js/selectize.min.js"></script> -->
    <script src="<?=$folder_js?>/standalone/selectize.min.js"></script>
    <!-- PULL REFRESH-->
    <script src="<?=$folder_js?>/index.umd.min.js"></script>

    <!-- JS Tree -->
    <script src="<?=$folder_js?>/jquery.treegrid.js"></script>
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
    <style type="text/css">
         @import url("https://fonts.googleapis.com/css?family=Roboto&display=swap");

   
        body {
            font-family: 'Roboto', sans-serif !important;
        }
        h1, h2, h3, h4, h5, h6, .h1, .h2, .h3, .h4, .h5, .h6 {
            font-family: 'Roboto', sans-serif !important;
            font-weight: normal !important;
        }
    </style>
</head>

<body style="font-family: 'Roboto', sans-serif;" class="skin-red fixed sidebar-mini sidebar-mini-expand-feature sidebar-collapse">
    <div class="wrapper" style='background-color:#ffff;'>

        <!-- <header class="main-header" id='header'>
            <a href="#" class="logo" style="width:100%"> -->
            <!-- <span class="logo-mini"><b></b> SAI</span> -->
            <!-- <span style='color:white;text-align:center'><b></b> <?php //echo $app_nama; ?></span> -->
            <!-- </a> -->
            <!-- <a href="#" class="sidebar-toggle" data-toggle="push-menu" role="button">
                <span class="sr-only">Toggle navigation</span>
            </a> -->

        <!-- </header> -->
        <!-- Left side column. contains the logo and sidebar -->
        <!-- <aside class="main-sidebar">
            
            <section class="sidebar">
                <ul class="sidebar-menu" data-widget="tree">
                    <?php

                    $kode_menu = $_SESSION['kodeMenu'];

                    $sqlX="select a.*,b.form  from menu a left join m_form b on a.kode_form=b.kode_form where kode_klp = '".$_SESSION['kodeMenu']."' and a.jenis_menu='bawah' order by kode_klp, rowindex";

                    $rsX=execute($sqlX);

                    while ($rowX = $rsX->FetchNextObject($toupper=false))
                    {
                        $daftar_menu[] = (array)$rowX;
                    }

                    $pre_prt = 0;
                    $parent_array = array();
                    
                    // $kode_menu = $_SESSION['kodeMenu'];

                    // $sql="select a.*,b.form  from menu a 
                    // left join m_form b on a.kode_form=b.kode_form 
                    // where kode_klp = '$kode_menu' order by kode_klp, rowindex";
                    // $rs=execute($sql);
                    // //$daftar_menu = $rs->GetRowAssoc(); 

                    // while ($row = $rs->FetchNextObject($toupper=false))
                    // {
                    //     $daftar_menu[] = (array)$row;
                    // }

                    // $pre_prt = 0;
                    // $parent_array = array();
                    // for($i=0; $i<count($daftar_menu); $i++){
                    //     $forms = str_replace("_","/", $daftar_menu[$i]["form"]);
                    //     $this_lv = $daftar_menu[$i]['level_menu']; // t1 lv=0
                    //     $this_link = "fMain.php?hal=".$forms.".php";

                    //     if(!ISSET($daftar_menu[$i-1]['level_menu'])){
                    //         $prev_lv = 0; // t1 pv=0
                    //     }else{
                    //         $prev_lv = $daftar_menu[$i-1]['level_menu'];
                    //     }

                    //     if(!ISSET($daftar_menu[$i+1]['level_menu'])){
                    //         $next_lv = $daftar_menu[$i]['level_menu'];
                    //     }else{
                    //         $next_lv = $daftar_menu[$i+1]['level_menu']; //t1 nv=1
                    //     }

                    //     if($daftar_menu[$i]['level_menu']=="0"){
                    //         if($daftar_menu[$i]['icon'] != "" && $daftar_menu[$i]['icon'] != null){
                    //             $icon=$daftar_menu[$i]['icon'];
                    //         }else{
                    //             $icon="fa fa-caret-right";
                    //         }
                            
                    //     }else{
                    //         if($daftar_menu[$i]['icon'] != "" && $daftar_menu[$i]['icon'] != null){
                    //             $icon=$daftar_menu[$i]['icon'];
                    //         }else{
                    //             $icon="fa fa-edit";
                    //         }
                    //     }

                    //     if($this_lv == 0 AND $next_lv == 0){
                    //         echo " 
                    //         <li>
                    //             <a href='$this_link'>
                    //                 <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                    //             </a>
                    //         </li>";
                    //     }
                    //     else if($this_lv == 0 AND $next_lv > 0){
                    //         echo " 
                    //         <li class='treeview'>
                    //             <a href='$this_link'>
                    //                 <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                    //                 <span class='pull-right-container'>
                    //                     <i class='fa fa-angle-left pull-right'></i>
                    //                 </span>
                    //             </a>
                    //             <ul class='treeview-menu' id='sai_adminlte_menu_".$daftar_menu[$i]["kode_menu"]."'>";
                    //     }else if(($this_lv > $prev_lv OR $this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv < $next_lv){
                    //         echo " 
                    //         <li class='treeview'>
                    //             <a href='$this_link'>
                    //                 <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                    //                 <span class='pull-right-container'>
                    //                     <i class='fa fa-angle-left pull-right'></i>
                    //                 </span>
                    //             </a>
                    //             <ul class='treeview-menu' id='sai_adminlte_menu_".$daftar_menu[$i]["kode_menu"]."'>";
                    //     }else if(($this_lv > $prev_lv OR $this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv == $next_lv){
                    //         echo " 
                    //         <li>
                    //             <a href='$this_link'>
                    //                 <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                    //             </a>
                    //         </li>";
                           
                    //     }else if($this_lv > $prev_lv AND $this_lv > $next_lv){
                    //         echo " 
                    //         <li>
                    //             <a href='$this_link'>
                    //                 <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                    //             </a>
                    //         </li>";
                    //         for($i=0; $i<($this_lv - $next_lv); $i++){
                    //             echo "</ul></li>";
                    //         }
                    //     }else if(($this_lv == $prev_lv OR $this_lv < $prev_lv) AND $this_lv > $next_lv){
                    //         echo " 
                    //         <li>
                    //             <a href='$this_link'>
                    //                 <i class='$icon'></i> <span>".$daftar_menu[$i]["nama"]."</span>
                    //             </a>
                    //         </li>";
                    // echo "</ul>
                    //     </li>";
                    //         // for($i=0; $i<($this_lv - $next_lv); $i++){
                    //         //     echo "</ul></li>";
                    //         // }
                    //     }
                    // }
                ?>
                </ul>
            </section>
        </aside> -->

        <!-- Content Wrapper. Contains page content -->
        <div class="content-wrapper" style='padding-top: 0px;margin-left: 0px !important;background-color:#ffff'>

            <div id="loading-overlay" style="background: #e9e9e9; display: none; position: absolute; top: 0; right: 0; bottom: 0; left: 0; z-index:5;">
                <center>
                    <img src="" style='position:fixed; top: 50%; transform: translateY(-50%);'>
                </center>
            </div>
            <section class="content" id='ajax-content-section' style='padding:0px;padding-bottom:50px;'>
                    <?php
                    // echo $_SESSION['foto'];
                    // echo $img;
                    include_once("../../../web/".$_GET['hal']); 
                    
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

        <div class="control-sidebar-bg"></div>
        <style>
        /* Place the navbar at the bottom of the page, and make it stick */
            .navbar_bottom {
            background-color: #fff;
            overflow: hidden;
            position: fixed;
            bottom: 0;
            width: 100%;
            }

            /* Style the links inside the navigation bar */
            .navbar_bottom a {
            float: left;
            display: block;
            color: grey;
            text-align: center;
            padding: 14px 16px;
            text-decoration: none;
            font-size: 17px;
            border-top: 0.5px solid #DDDDDD;
            }

            /* Change the color of links on hover */
            .navbar_bottom a:hover {
            background-color: #fff;
            color: #d73925;
            }

            /* Add a color to the active/current link */
            .navbar_bottom a.active {
            background-color: #fff;
            color: #dd4b39;
            }
        </style>
        <div class='navbar_bottom' style=''>
        <?php
            
            $icon=array('fa fa-home fa-lg','fa fa-line-chart fa-lg','fa fa-file fa-lg','fa fa-user fa-lg');

            if (count($daftar_menu) > 0){
                for($i=0; $i<count($daftar_menu); $i++){
                    $forms = str_replace("_","/", $daftar_menu[$i]["form"]);
                    $this_lv = $daftar_menu[$i]['level_menu'];
                    $this_link = "fMainMobile.php?hal=".$forms.".php";

                    $link_aktif = "fMainMobile.php?hal=".$_GET['hal'];

                    if($this_link == $link_aktif){
                        $class="class='active' ";
                    }else{
                        $class="";
                    }
        ?>
                   
                    <a href="<?php echo $this_link; ?>" <?php echo $class; ?> style='padding:5px 0px 0px 0px;width: 25%;'>
                    <span><i class='<?php echo $icon[$i]; ?>' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'><?php echo $daftar_menu[$i]["nama"]; ?></span></a>
                    
        <?php   } 
            } else { ?>

            <a href="#home" class='active' style='padding:5px 0px 0px 0px;width: 25%;'>
            <span><i class='fa fa-home fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Home</span></a>
            <a href='#notif' style='padding:5px 0px 0px 0px;width: 25%;'>
            <span><i class='fa fa-bell fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Notifikasi</span></a>
            <a href='#dokumen' style='padding:5px 0px 0px 0px;width: 25%;'>
            <span><i class='fa fa-file fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Dokumen</span></a>
            <a href='#dokumen' style='padding:5px 0px 0px 0px;width: 25%;'>
            <span><i class='fa fa-user fa-lg' style='text-align: center;'></i></span><br><span style='text-align: center;font-size: 14px;'>Akun</span></a>
        <?php } ?>
        </div>
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

    // PullToRefresh.init({
    //     mainElement: '#main-header',
    //     distIgnore: 150,
    //     onRefresh: function() { 
    //         location.reload();
    //     }
    //   });
    
</script>

