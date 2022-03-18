<?php
    
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function register(){
        $dbconn = db_Connect();

        $db_token["nik"] = $_POST["nik"];
        $db_token["api_key"] = random_string('alnum', 20);
        $db_token["token"] = $_POST["token"];
        $db_token["kode_lokasi"] = $_POST["kode_lokasi"];

        $db_token["os"] = 'BROWSER';
        $db_token["ver"] = '';
        $db_token["model"] = '';
        $db_token["uuid"] = '';

        $db_token["tgl_login"] = date('Y-m-d H:i:s');
        

        $token_sql = $dbconn->AutoExecute('api_token_auth', $db_token, 'INSERT');
        if($token_sql){
            $response['msg'] = "ID registered";
        }else{
            $response['msg'] = "Failed to register";
        }

        echo json_encode($response);
    }
?>