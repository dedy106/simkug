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
        case 'DELETE' :
            hapusDok();
        break;
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
        include_once($root_lib."web/lib/libcurl.php");
    }

    function cekAuth($user){
        getKoneksi();
        $user = qstr($user);
        
        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user ", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    
    function getToken($uname, $pwd){
		try{

            if( ini_get('allow_url_fopen') ) {
                die('allow_url_fopen is enabled. file_get_contents should work well');
            } else {
                die('allow_url_fopen is disabled. file_get_contents would not work');
            }
            $optsDataLogin = array(
                'https' => array( 
                    'method' => 'POST', 
                    'header' => 'Content-type: application/x-www-form-urlencoded', 
                    'content' => 'username=' . $uname.'&password='. $pwd 
                )
            ); 
    
            $contextDataLogin = stream_context_create($optsDataLogin); 
            
            if($_SERVER['SERVER_NAME'] == "devsiaga.simkug.com"){
                $url = "https://devapi.simkug.com/api/siaga-auth/login";
                
            }else{
                $url = "https://api.simkug.com/api/siaga-auth/login";
            }
            $usersso = file_get_contents($url, false, $contextDataLogin); 
            $datasso = json_decode($usersso);
            error_log("return : ". print_r($datasso, 1));

            $success = array(
                'message' => 'Sukses',
                'context' => $contextDataLogin,
                'data' => $datasso,
                'status' => true
            );
            $success['openssl: '] =  extension_loaded  ('openssl') ? 'yes':'no';
            $success['http wrapper: '] =  in_array('http', $contextDataLogin) ? 'yes':'no';
            $success['https wrapper: '] =  in_array('https', $contextDataLogin) ? 'yes':'no';
            $success['wrappers: '] = var_export($contextDataLogin);
        } catch (Exception $e) {
            $success = array(
                'message' => $e->getMessage(),
                'data' => $datasso,
                'status' => false
            );
        }
        return $success;

	}

    function send(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            try{
                // $token = getToken($_SESSION['userLog'], $_SESSION['pass']);
           
                // $kode_lokasi = $_GET['kode_lokasi'];
                // $kode_pp=$_GET['kode_pp'];
                if($_SERVER['SERVER_NAME'] == "devsiaga.simkug.com"){
                    $url = "https://devapi.simkug.com/api/siaga-auth/login";
                    $url2 = "https://devapi.simkug.com/api/siaga-trans/send-email-saku3";
                }else{
                    $url = "https://api.simkug.com/api/siaga-auth/login";
                    $url2 = "https://api.simkug.com/api/siaga-trans/send-email-saku3";
                }
                
                $fields = array(
                    "nik" => "admin",
                    "password" => "saisai"
                );

                $output = curl($url,$fields); 
                // $token = $output->token;
                $msg = $output;
                $sts = true;
    
                // $postfields = array();
                
                // $postfields['no_bukti'] = $_POST['no_bukti'];
    
                // $res = curl_upload($url2,$token,$postfields);
                // $msg = $res['message'];
                // $sts = $res['status'];
                // $response['curl2'] = $res['info'];
                // $response['curl2_res'] = $res['output']->success; 
                // $response['fields'] = $postfields; 
                // $response['output'] = $output;
            } catch (exception $e) { 
                error_log($e->getMessage());		
                $msg = " error " .  $e->getMessage();
                $sts = false;
            } 	
            $response['message'] = $msg;
            $response['status'] = $sts;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>