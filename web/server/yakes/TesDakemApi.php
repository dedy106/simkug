<?php
    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        case 'POST' :
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
    }

    function getKoneksi(){
        $root_lib=realpath($_SERVER["DOCUMENT_ROOT"])."/";
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function curl($url, $data){
        $ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, FALSE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $data);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $output = json_decode(curl_exec($ch));
        curl_close($ch);      
        return $output;
    }

    function curl_post($token,$postfields,$url){
        try{
            $ch2 = curl_init(); 

            $ch2 = curl_init(); 
            curl_setopt($ch2, CURLOPT_URL,$url);
            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch2, CURLOPT_HEADER, FALSE);
            curl_setopt($ch2, CURLOPT_POST, TRUE);
            curl_setopt($ch2, CURLOPT_POSTFIELDS, $postfields);
            curl_setopt($ch2, CURLOPT_FAILONERROR, true);
            curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
                'Authorization: Bearer '.$token //REST API KEY 
            ));
            curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
            $res = json_decode(curl_exec($ch2));
            if (curl_errno($ch2)) {
                $error_msg = curl_error($ch2);
            }else{
                $error_msg = "sukses";
            }
            curl_close($ch2);
            $sts = $res->status;
            $msg = $res->message;
            $msg .= $error_msg;

        } catch (exception $e) { 
            error_log($e->getMessage());		
            $msg = " error " .  $e->getMessage();
            $sts = false;
            $res = array();
        } 	
        $result['status'] = $sts;
        $result['message'] = $msg;
        $result['data'] = $res;
        return $result;
    }

    function getPesertaDakemByNIK()
	{
        $url = "https://api.simkug.com/api/yakes-auth/login";
        $url2 = "https://api.simkug.com/api/yakes-trans/peserta-dakem-nik";

        $fields = array(
            "nik" => "yakes",
            "password" => "saisai"
        );

        $output = curl($url,$fields); 
        $token = $output->token;

        $nik = $_POST['nik'];
		$ch = curl_init(); 
		$data_login = array(
			'key' => 'IeXdn4oCBXN76PlsGXdB5PtuyAK7bqXvS1K4Y4k3s',
			'nik' => $nik
		);
		
        $output2 = curl_post($token,$data_login,$url2);
        $response['output2'][] = $output2;
        echo json_encode($response);

	}  
    

?>