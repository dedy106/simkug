<?php

    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
    }
    function send(){

        // getKoneksi();

        date_default_timezone_set('UTC');
        $newTime = date("M d Y H:i:s e+0000",strtotime(date("Y-m-d H:i:s")."+5 minutes"));
        $sendAfter = (string)$newTime;
        $title = "ini dari service yakes";
        $content      = array(
            "en" => "halo sudah 5 menit berlalu"
        );
    
        $fields = array(
            'app_id' => "b0bfb1bb-6ab8-450e-8ccd-f0bfc4098ca4", //appid yakes
    
            // all subscribed user
            'included_segments' => array(
                'All'
            ),
    
            // // per token id
            // 'include_player_ids' => array($cek['token']),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            ),
            'send_after' => $sendAfter
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic NDdmZWY4OGUtOGE5NS00MjNkLWE3ZTMtYTNjMTY2MTI3NzBj' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);

        echo json_encode($response);
        // echo "NOTIF SENT";
    }

?>