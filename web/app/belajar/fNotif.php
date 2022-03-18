<?php

    $kode_lokasi=$_SESSION['lokasi'];
    $periode=$_SESSION['periode'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    
    echo "Test Notifikasi";
                		
	echo "
        <script type='text/javascript'>
        </script>
        <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async=''></script>
        <script>
            var OneSignal = window.OneSignal || [];
            OneSignal.push(function() {
                OneSignal.init({
                    appId: '1ca967ab-9375-4edf-abfd-12a22fc073a5',
                });

                OneSignal.getUserId().then(function(userId) {
                    // console.log('OneSignal User ID:', userId);   
                    // AJAX REGISTER
                    alert('Your OneSignal ID:'+userId);
                    $.ajax({
                        type: 'POST',
                        url: 'include_lib.php?hal=server/belajar/notifServer.php&fx=saveid',
                        dataType: 'json',
                        data: {nik:'".$nik."', kode_lokasi:'".$kode_lokasi."', token:userId},
                        // contentType: false,
                        // cache: false,
                        // processData: false, 
                        success:function(result){
                            console.log(result.msg);
                        },
                        fail: function(xhr, textStatus, errorThrown){
                            alert('request failed:'+textStatus);
                        }
                    });
                });

                // OneSignal.isPushNotificationsEnabled().then(function(isEnabled) {
                //     if (isEnabled){
                //         // console.log('Push notifications are enabled!');
                         
                //         OneSignal.getUserId().then(function(userId) {
                //             // console.log('OneSignal User ID:', userId);   
                //             // AJAX REGISTER
                //             // alert('Your OneSignal ID:'+userId);
                //             $.ajax({
                //                 type: 'POST',
                //                 url: 'include_lib.php?hal=server/belajar/notifServer.php&fx=saveid',
                //                 dataType: 'json',
                //                 data: {nik:'".$nik."', kode_lokasi:'".$kode_lokasi."', token:userId},
                //                 // contentType: false,
                //                 // cache: false,
                //                 // processData: false, 
                //                 success:function(result){
                //                     console.log(result.msg);
                //                 },
                //                 fail: function(xhr, textStatus, errorThrown){
                //                     alert('request failed:'+textStatus);
                //                 }
                //             });
                //         });
                //     }
                //     else{
                //         console.log('Push notifications are not enabled');    
                //     }  
                // });
            });
        </script>";

   
?>
