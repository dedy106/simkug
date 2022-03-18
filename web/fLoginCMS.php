<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>SAI Front End Dev</title>
	
	<!-- core CSS -->
    <link href="corlate/css/bootstrap.min.css" rel="stylesheet">
    <!--<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.5/css/bootstrap.min.css">-->
    <link href="corlate/css/font-awesome.css" rel="stylesheet">
    <link href="corlate/css/animate.min.css" rel="stylesheet">
    <link href="corlate/css/prettyPhoto.css" rel="stylesheet">
    <link href="corlate/css/main.css" rel="stylesheet">
    <link href="corlate/css/responsive.css" rel="stylesheet">
    <!--[if lt IE 9]>
    <script src="js/html5shiv.js"></script>
    <script src="js/respond.min.js"></script>
    <![endif]-->   
    <link rel="apple-touch-icon" sizes="57x57" href="img/favicon/apple-icon-57x57.png">
    <link rel="apple-touch-icon" sizes="60x60" href="img/favicon/apple-icon-60x60.png">
    <link rel="apple-touch-icon" sizes="72x72" href="img/favicon/apple-icon-72x72.png">
    <link rel="apple-touch-icon" sizes="76x76" href="img/favicon/apple-icon-76x76.png">
    <link rel="apple-touch-icon" sizes="114x114" href="img/favicon/apple-icon-114x114.png">
    <link rel="apple-touch-icon" sizes="120x120" href="img/favicon/apple-icon-120x120.png">
    <link rel="apple-touch-icon" sizes="144x144" href="img/favicon/apple-icon-144x144.png">
    <link rel="apple-touch-icon" sizes="152x152" href="img/favicon/apple-icon-152x152.png">
    <link rel="apple-touch-icon" sizes="180x180" href="img/favicon/apple-icon-180x180.png">
    <link rel="icon" type="image/png" sizes="192x192"  href="img/favicon/android-icon-192x192.png">
    <link rel="icon" type="image/png" sizes="32x32" href="img/favicon/favicon-32x32.png">
    <link rel="icon" type="image/png" sizes="96x96" href="img/favicon/favicon-96x96.png">
    <link rel="icon" type="image/png" sizes="16x16" href="img/favicon/favicon-16x16.png">
    <link rel="manifest" href="img/favicon/manifest.json">
    <meta name="msapplication-TileColor" content="#ffffff">
    <meta name="msapplication-TileImage" content="img/favicon/ms-icon-144x144.png">
    <meta name="theme-color" content="#ffffff">

    <style>
        /* custom css */

        .navbar-inverse .navbar-nav > li > a{
            /* background-color: #bce7f5; */
            color: black;
        }
        

        .dropdown-menu{
            background:white;
            min-width:230px;
            color:black;
        }

        .dropdown-menu > li > a{
            color:black;
        }
        
        .gmap-area {
            padding: 5px 0;
        }

        body > section {
            padding: 30px 0;
        }

        .article-list-end-fade:before {
            content:'';
            width:100%;
            height:30%;    
            position:absolute;
            left:0;
            bottom:0;
            background:linear-gradient(transparent 10px, white);
        }

        /* .portfolio-filter > li a {
            background: none repeat scroll 0 0 #FFFFFF;
            font-size: 14px;
            font-weight: 400;
            margin-right: 20px;
            transition: all 0.9s ease 0s;
            -moz-transition: all 0.9s ease 0s;
            -webkit-transition: all 0.9s ease 0s;
            -o-transition: all 0.9s ease 0s;
            border: 1px solid #F2F2F2;
            outline: none;
            border-radius: 3px;
        }

        .portfolio-filter > li a:hover,
        .portfolio-filter > li a.active{
            color:#fff;
            background: #c52d2f;
            border: 1px solid #c52d2f;
            box-shadow: none;
            -webkit-box-shadow: none;
        } */

        /* .navbar-inverse .navbar-nav .dropdown-menu > li > a {
            padding: 8px 15px;
            color: #7e7767;
        } */

        /* .navbar-inverse .navbar-nav .dropdown-menu > li:hover > a,
        .navbar-inverse .navbar-nav .dropdown-menu > li:focus > a,
        .navbar-inverse .navbar-nav .dropdown-menu > li.active > a {
            background-color: #bce7f5;
            color: black;
        } */

        #bottom ul li {
            display: block;
            padding: 1px 0;
        }
    </style>

    <!--<script src="js/jquery-3.2.1.min.js');?>"></script>-->
    <script src="corlate/js/jquery.js"></script>

    <!--js bootstrap khusus corlate-->
    <script src="corlate/js/bootstrap.min.js"></script>

    <script src="corlate/js/jquery.prettyPhoto.js"></script>
    <script src="corlate/js/jquery.isotope.min.js"></script>
    <script src="corlate/js/main.js"></script>
    <script src="corlate/js/wow.min.js"></script>

    <!--<script src="Filterizr-master/dist/jquery.filterizr.min.js');?>"></script>-->
    <!--<script src="Filterizr-master/dist/controls.js');?>"></script>-->

    <!--<script src="js/gmaps.js');?>"></script>-->
    <script type="text/javascript"> 
        $(document).ready(function(){
            $('.prev-prod-fe').click(function(){
                var keterangan = $(this).closest('div').find('.ket-prod').html();
                var gbr_url = $(this).closest('div').find('.gbr-prod').attr('src');
                // alert(gbr_url);
                // alert(keterangan);
                var html = "<center><img src='"+gbr_url+"'><br>"+keterangan+"</center>";
                $('#ket-prod-modal').html(html);
                $('#modal-preview').modal('show');
            });
        });
        function initialize(){
            var lat = $('.latitude').text();
            var lon = $('.longitude').text();
            
            var myLatLng = {lat: +lat, lng: +lon};

            var map = new google.maps.Map(document.getElementById('map'), {
                zoom: 15,
                center: myLatLng
            });

            var marker = new google.maps.Marker({
                position: myLatLng,
                map: map
            });
        }
        
    </script>
    <script async defer
    src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCwdyiC2sZ3B1O2nMdhUy6Z0ljoK3gbA_U&callback=initialize">
    </script>
</head><!--/head-->
<body class="hold-transition login-page" style="background:#f0efef">
<div class="login-box" style="width:300px;margin: 10% auto !important;">
  <!--<div class="login-logo">-->
    <!--<a href="../../index2.html"><b>SAI</b>Front End</a>-->
  <!--</div>-->
  <!-- /.login-logo -->
  <div class="login-box-body" style="background:white;width:310px;margin:120px auto;padding:20px">
    <h3 style='font-size:25px'>Login</h3>
    <form action="cLogin.php?fx=login" method='POST'>
      <div class="form-group">
        <div class="input-group">
          <input type="text" class="form-control"  placeholder="Username" name="nik" required>
          <div class="input-group-addon"><i class="fa fa-user"></i></div>
        </div>
      </div>
      <div class="form-group">
        <div class="input-group">
          <input type="password" class="form-control"  placeholder="Password" name="pass" required>
          <div class="input-group-addon"><i class="fa fa-lock"></i></div>
        </div>
      </div>
      <div class="row">
        <!--<div class="col-xs-8">
          <div class="checkbox icheck">
            <label>
              <input type="checkbox"> Remember Me
            </label>
          </div>
        </div>-->
        <!-- /.col -->
            <div class="col-xs-6">
                <button type="submit" class="btn btn-primary btn-block btn-flat" style="margin-top:3px;">Sign In</button>
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