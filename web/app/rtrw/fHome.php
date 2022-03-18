<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $domain=$_SERVER['SERVER_NAME'];
    if($domain == "tbp.simkug.com"){
        $logomain = $path.'/image/tbp.jpeg';
    }else{
        $logomain = $path.'/image/rtrw.jpeg';
    }
    $mainname = $_SESSION['namaPP'];

    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

    // echo "Browser:".$version[1];

    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
        $width="33%";
        $header= "<header class='main-header' id='header'>
        <a href='#' class='logo btn btn-block btn-default' style='width:100%;background-color: white;color: black;border: 0px solid black;vertical-align: middle;font-size:16px;text-align: left;border-bottom: 1px solid #e6e2e2;'>
        <span class='logo-lg'><img src='$logomain' style='max-width:30px;max-height:37px'>&nbsp;&nbsp; <b>$mainname</b></span>
        </a>
        </header>";
        $padding="padding-top:50px;border:0px solid grey;box-shadow: 0 0 0 white;";
        $style = "box-shadow: 0 0 0 white;";

    }else{
        $width="25%";
        $padding="";
        $style = "box-shadow: 0 0 0 white;";
    }


    $path = "http://".$_SERVER["SERVER_NAME"]."/image";				
    
    echo "$header";
?>
    <div class='panel' style='<?=$padding?>'>
            <div class='panel-heading' style='font-size:18px;padding:10px 0px 1px 20px'>
            </div>
            <div class='panel-body'>
                <div class='row'>
                    <div class='col-md-12'>
                        <div class='box' style='border-top:white'>
                            <div class='box-body no-padding'>
                            <ul class='users-list clearfix'>
                                
                            </ul>
                            </div>
                        </div>
                    </div>
                </div>              
            </div>
       </div>
        <script type='text/javascript'>
        </script>
        <!-- <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async=''></script> -->
        <script>
            // var OneSignal = window.OneSignal || [];
            // OneSignal.push(function() {
            //     OneSignal.init({
            //         appId: 'a077cc6f-7907-43d2-ad80-34f077e35232',
            //     });

                
            //     OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
            //         if (isEnabled){
            //             // console.log('Push notifications are enabled!');
                         
            //             OneSignal.getUserId().then(function(userId) {
            //                 // console.log('OneSignal User ID:', userId);   
            //                 // AJAX REGISTER
                            
            //                 $.ajax({
            //                     type: 'POST',
            //                     url: 'include_lib.php?hal=server/belajar/notifServer.php&fx=register',
            //                     dataType: 'json',
            //                     data: {nik:'', kode_lokasi:'', token:userId},
            //                     // contentType: false,
            //                     // cache: false,
            //                     // processData: false, 
            //                     success:function(result){
            //                         console.log(result.msg);
            //                     },
            //                     fail: function(xhr, textStatus, errorThrown){
            //                         alert('request failed:'+textStatus);
            //                     }
            //                 });
            //             });
            //         }
            //         else{
            //             console.log('Push notifications are not enabled');    
            //         }  
            //     });
            // });

            function getMenu(){
                $.ajax({
                    type: 'POST',
                    url: 'include_lib.php?hal=server/rtrw/dash_rtrw.php&fx=getMenu',
                    dataType: 'json',
                    success:function(result){
                        var html=``;
                        if(result.status){
                            for(var i=0;i<result.daftar.length;i++){

                                html+=`<li style='width:<?=$width?>'>
                                <a class='users-list-name' style='cursor:pointer;' href='fMainMobile.php?hal=app/rtrw/`+result.daftar[i].form+`.php'><img src='<?=$path?>/`+result.daftar[i].icon+`' style="height: 80px;width: 80px;" alt='User Image'><br>
                                `+result.daftar[i].nama+`</a>
                                </li>`;
                            }
                        }
                        // console.log(html);
                        $('.users-list').html(html);
                    },
                    fail: function(xhr, textStatus, errorThrown){
                        alert('request failed:'+textStatus);
                    }
                });
            }

            getMenu();
        </script>