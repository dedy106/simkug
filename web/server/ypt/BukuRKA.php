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
        include_once($root_lib."web/lib/libcurl.php");
    }

    function cekAuth($user,$pass){
        getKoneksi();
        $user = qstr($user);
        $pass = qstr($pass);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user ", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function getBukuRKAList() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $url = "https://api.simkug.com/api/ypt-auth/login";
            $url2 = "https://api.simkug.com/api/ypt-dash/buku-rka-list";
            
            $fields = array(
                "nik" => "telu",
                "password" => "saisai"
            );
            
            $output = curl($url,$fields); 
            $token = $output->token;

            $list = curl_view($url2,$token);
            $response = $list;
        } else{
            $response['data'] = [];
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBukuRKAListDetail() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $url = "https://api.simkug.com/api/ypt-auth/login";
            $url2 = "https://api.simkug.com/api/ypt-dash/buku-rka-list?no_bukti=".$data['no_bukti'];
            
            $fields = array(
                "nik" => "telu",
                "password" => "saisai"
            );
            
            $output = curl($url,$fields); 
            $token = $output->token;

            $list = curl_view($url2,$token);
            $response = $list;
        } else{
            $response['data'] = [];
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }


?>