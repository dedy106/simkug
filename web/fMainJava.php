<?php
 include_once("lib/koneksi.php");
 include_once("lib/helpers.php");
 
 $path = "http://".$_SERVER["SERVER_NAME"]."/";	
 $path2 = "http://javaturbine.co.id";
 $kode_lokasi="24";
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="">
    <meta name="author" content="">
    <title>Java Turbine</title>
	
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

        /* .navbar-inverse .navbar-nav > li > a:hover{
            background-color: #bce7f5;
            color: black;
        } */
        

        .dropdown-menu{
            background:white;
            min-width:230px;
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
</head><!--/head-->
<?php
$img = $path."web/img/pattern2.jpg";
?>

<body class="homepage"  style="background-image:url('<?php echo $img; ?>');  background-repeat:repeat; height:100%;">

    <header id="header">

        <nav class="navbar navbar-inverse" style='background:#f1fafd;'>
            <div class="container-fluid">
                <div class="navbar-header">
                    <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar" style='background-color:#333'>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>
                        <span class="icon-bar"></span>                        
                    </button>
                    <?php
                        $logo = $path."web/img/java.png";
                    ?>
                    <a class="navbar-brand"><img src="<?php echo $logo; ?>" style="padding-left:15px; padding-bottom:10px; height:60px; width:auto" alt="logo"></a>
                </div>

                <div class="collapse navbar-collapse" id="myNavbar" style="border-bottom:1px solid lightgrey;">
                    <ul class="nav navbar-nav navbar-right" style='margin-right:10px;'>
                        <?php
						$sql="select a.nama, a.link, a.nu, a.jenis,a.kode_menu,isnull(b.form,'-') as form 
					from lab_konten_menu a
					left join m_form b on a.link=b.kode_form
					where a.level_menu = '0' and a.kode_lokasi='$kode_lokasi' and a.kode_klp LIKE 'JAVA%' 
					order by a.nu ";
						$rs = execute($sql,$error);
						$i=0;
						while ($row = $rs->FetchNextObject($toupper=false))
						{
							if ($row->jenis=="Induk")
							{
								
								echo "<li class='dropdown'><a class='dropdown-toggle' data-toggle='dropdown' href='#'>$row->nama<span class='caret'></span></a>
								<ul class='dropdown-menu'>";
								$sql="select a.nama, a.link, a.nu, a.jenis from lab_konten_menu a  where a.kode_induk='$row->kode_menu' and a.kode_lokasi='$kode_lokasi' order by a.nu ";
								$rs2 = execute($sql,$error);
								
								while ($row2 = $rs2->FetchNextObject($toupper=false))
								{
									
									$link_form = "fMainJava.php?hal=app/java/fPage.php&param=".$row2->link;
									echo "<li><a href='$link_form'>$row2->nama</a></li>";
								}
								echo "</ul></li>";
							}
							else
							{
								$link = str_replace("_","/", $row->form);
								$link_form = "fMainJava.php?hal=".$link.".php'";
								echo "<li><a href='$link_form'>$row->nama</a></li>";
							}
							if ($i==0)
							{
								$link_home=$link.".php";
							}
							$i=$i+1;
						}  
						?>      
                    </ul>
                </div>
            </div>
        </nav>

    </header><!--/header-->

    <?php
	
		if ($_GET['hal']=="")
		{
			include_once($link_home); 
		}
		else
		{
			include_once($_GET['hal']); 
		}
    ?>

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
</body>
</html>