<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <title>Telkom Students Login</title>
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
  <!-- iCheck -->
  <link rel="stylesheet" href="iCheck/square/blue.css">
  <!--selectize-->
  <link href="css/selectize.bootstrap3.css" rel="stylesheet">

  <!-- HTML5 Shim and Respond.js IE8 support of HTML5 elements and media queries -->
  <!-- WARNING: Respond.js doesn't work if you view the page via file:// -->
  <!--[if lt IE 9]>
  <script src="https://oss.maxcdn.com/html5shiv/3.7.3/html5shiv.min.js"></script>
  <script src="https://oss.maxcdn.com/respond/1.4.2/respond.min.js"></script>
  <![endif]-->

  <!-- Google Font -->
  <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Source+Sans+Pro:300,400,600,700,300italic,400italic,600italic">

    <!-- jQuery 3 -->
    <script src="js/jquery.min.js"></script>
    <!-- Bootstrap 3.3.7 -->
    <script src="js/bootstrap.min.js"></script>
    <!-- iCheck -->
    <script src="iCheck/icheck.min.js"></script>
    <!-- Selectize -->
    <script src="js/selectize.min.js"></script>
    
</head>
<body class="hold-transition login-page">
    <div class="login-box" style="width:300px;margin: 10% auto !important;">
        <!--<div class="login-logo">
            <b>Telkom Schools </b><small>Student</small>
        </div>-->
        <!-- /.login-logo -->
        <div class="login-box-body" style="width:300px">
            <img src="/web/img/ts.png" style="height:70%; width:90%; max-height:300px; max-width:300px; margin: 0 auto; display:block;"> <br>
            <p class="login-box-msg" style="text-align: left;font-size: 18px;padding-left: 2px;margin-top: 20px;">LOGIN</p>

            <form action="cLoginSis.php?fx=login" method="post">
            <div class="form-group has-feedback">
                <input type="username" class="form-control" placeholder="username" id='login-user' name="nik" required>
                <span class="glyphicon glyphicon-user form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <input type="password" class="form-control" placeholder="Password" name="pass" required>
                <span class="glyphicon glyphicon-lock form-control-feedback"></span>
            </div>
            <div class="form-group has-feedback">
                <select name='kode_pp' class='form-control ' id='login-pp' required>
                </select>
            </div>
            <div class="row">
                <!-- /.col -->
                <div class="col-xs-6">
                    <button type="submit" class="btn btn-danger btn-block btn-flat" style="margin-top:3px;font-size:16px"><i class="glyphicon glyphicon-circle-arrow-right"></i>&nbsp; Login</button>
                </div>
                <div class="col-xs-6">
                <?php 
                    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

                    // echo "Browser:".$version[1];
                
                    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone") {
                        echo"";
                    }else{
                
                ?>
                    <a href='http://siswa.simkug.com/apk/dbsiswa.apk'><img src='http://ypt.simkug.com/image/Icon Google play.png' class='pull-right' style='max-height:39px; width:auto;'></a>
                <?php } ?>
                </div>
                <!-- /.col -->
            </div>
            </form>

            <!--<div class="social-auth-links text-center">
            <p>- OR -</p>
            <a href="#" class="btn btn-block btn-social btn-facebook btn-flat"><i class="fa fa-facebook"></i> Sign in using
                Facebook</a>
            <a href="#" class="btn btn-block btn-social btn-google btn-flat"><i class="fa fa-google-plus"></i> Sign in using
                Google+</a>
            </div>-->
            <!-- /.social-auth-links -->

            <!--<a href="#">I forgot my password</a><br>
            <a href="register.html" class="text-center">Register a new membership</a>-->

        </div>
        <!-- /.login-box-body -->
    </div>
    <!-- /.login-box -->

    
</body>
</html>
<script>
        $(function () {
            $('#login-pp').selectize({
                selectOnTab: true,
            });

            // var selectize= $('#login-pp').selectize();

            $('#login-user').on('change', function(){
                var nis = $(this).val();
                var selectize = $('#login-pp')[0].selectize;

                $.ajax({
                    url: "cLoginSiswa.php?fx=getDaftarPP",
                    type: 'POST',
                    dataType: 'json',
                    data: {'nis': nis},
                    success: function(data){
                        selectize.clearOptions();
                        // alert("ok");

                        if(data.pp.length > 0){
                            for(i=0; i<data.pp.length; i++){
                                var new_text = data.pp[i].kode_pp+' - '+data.pp[i].nama;
                                selectize.addOption({value:data.pp[i].kode_pp, text:new_text});
                                selectize.addItem(new_text);
                            }

                            selectize.setValue(data.pp[0].kode_pp);
                        }else{
                            alert('Data NIS belum terdaftar di sekolah');
                        }
                    }
                });
            });

            $('input').iCheck({
            checkboxClass: 'icheckbox_square-blue',
            radioClass: 'iradio_square-blue',
            increaseArea: '20%' // optional
            });
        });
    </script>