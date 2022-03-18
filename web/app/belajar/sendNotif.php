<?php
    
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }
    
    // ======================== ONESIGNAL ===============================
    function send(){

        // CEK
        $cek = dbRowArray("select nik, api_key, token, tgl_login from api_token_auth where os = 'BROWSER' order by tgl_login desc");


        $title = "JUDUL";
        $content      = array(
            "en" => "ISI"
        );
    
        $fields = array(
            'app_id' => "a077cc6f-7907-43d2-ad80-34f077e35232", //appid rtrw
    
            // all subscribed user
            // 'included_segments' => array(
            //     'All'
            // ),
    
            // per token id
            'include_player_ids' => array($cek['token']),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);

        // echo json_encode($response);
        echo "NOTIF SENT";
    }
?>