<?php
	function getKoneksi(){
        $root_lib="/var/www/html/yakes/web/";
        include_once($root_lib."lib/koneksi3.php");
        include_once($root_lib."lib/helpers.php");
        include_once($root_lib."lib/libcurl.php");
    }
	function curl_post($token,$id,$url){
        try{
            $ch2 = curl_init(); 
            $postfields = array();
            $postfields["id"] = $id;

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
	function show(){
		$sql = "select kode_lokasi,nama from lokasi ";
		$result = execute($sql,$err);

		while($row=$result->FetchNextObject($toupper=false)){
			echo $row->nama;
		}

		if($result){
			echo "sukses";
		}else{
			echo "gagal";
		}
	}
	function getApi(){
		$url = "https://api.simkug.com/api/yakes-auth/login";
        $url2 = "https://api.simkug.com/api/yakes-trans/parse-saham";
        
        $fields = array(
            "nik" => "yakes",
            "password" => "saisai"
        );

        $output = curl($url,$fields); 
        $response['output'] = $output;
		$token = $output->token;
		echo "Token ".$token;
		
		$output2 = curl_post($token,$kode,$url2);
        $response['output2'][] = $output2;
		$saham = $output2->token;
	}
	
	ini_set('display_errors', 'Off');
	getKoneksi();
	show();
	getApi();
	

?>