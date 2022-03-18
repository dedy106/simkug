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
            hapus();
        break;
    }

    function getKoneksi(){
        $root_lib=realpath($_SERVER["DOCUMENT_ROOT"])."/";
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
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

    function generateKode($tabel, $kolom_acuan, $prefix, $str_format){
        $query = execute("select right(max($kolom_acuan), ".strlen($str_format).")+1 as id from $tabel where $kolom_acuan like '$prefix%'");
        $kode = $query->fields[0];
        $id = $prefix.str_pad($kode, strlen($str_format), $str_format, STR_PAD_LEFT);
        return $id;
    }
    
    function getNoBukti(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){    
            $kode_lokasi = $data["kode_lokasi"];
            $kode_lokasi = $data["periode"];
            $response["no_bukti"]= generateKode("inv_issue_m","id",$kode_lokasi."-ISS".substr($periode,4,2).".","001");
            $response["status"]=true; 
        }else{
            $response["no_bukti"]= NULL;
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }

        echo json_encode($response);

    }


    function simpanIssue(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $exec = array();
            $kode_lokasi=$data['kode_lokasi'];
            if($data['id_edit'] == "1"){
                $no_bukti=$data['no_bukti'];
                $del = "delete from inv_issue_m where id='$no_bukti' and kode_lokasi='$kode_lokasi' ";
                array_push($exec,$del);
                $del2 = "delete from inv_issue_d where id='$no_bukti' and kode_lokasi='$kode_lokasi' ";
                array_push($exec,$del2);
            }else{
                $no_bukti=generateKode("inv_issue_m","id",$kode_lokasi."-ISS".substr($periode,4,2).".","001");
            }

            $sql = "insert into inv_issue_m (id,kode_lokasi,periode,tgl_input,jenis) values ('$no_bukti','$kode_lokasi','".$data['periode']."','".$data['tanggal']."','".$data['jenis']."') ";
            array_push($exec,$sql);

            if(count($data['katalis_positif']) >0){
                for($i=0;$i<count($data['katalis_positif']);$i++){
                    $sql2 = "insert into inv_issue_d (id,kode_lokasi,periode,katalis_positif,katalis_negatif,nu) values ('$no_bukti','$kode_lokasi','".$data['periode']."','".$data['katalis_positif'][$i]."','".$data['katalis_negatif'][$i]."',".$i.") ";
                    array_push($exec,$sql2);
                }
            }

            $rs = executeArray($exec);
            if($rs){
                $msg = "berhasil";
            }else{
                $msg = "gagal";
            }
            $response["message"]=$msg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
    function getView(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select id,periode,tgl_input from inv_issue_m
            where kode_lokasi= '".$kode_lokasi."' ";
            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getEdit(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            $id = $_GET['id'];
            
            $data = $_GET;
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query = "select id,periode, convert(varchar(10),tgl_input,121) as tgl_input from inv_issue_m
            where kode_lokasi= '".$kode_lokasi."' and id='$id' ";
            $response["daftar"] = dbResultArray($query);

            $query2 = "select * from inv_issue_d
            where kode_lokasi= '".$kode_lokasi."' and id='$id' ";
            $response["daftar2"] = dbResultArray($query2);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function hapus(){
        session_start();
        getKoneksi();
        // parse_str(file_get_contents('php://input'), $_DELETE);
        $data = $_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $exec = array();
            $kode_lokasi=$data['kode_lokasi'];
            $no_bukti=$data['id'];

            $del = "delete from inv_issue_m where id='$no_bukti' and kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del);
            $del2 = "delete from inv_issue_d where id='$no_bukti' and kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del2);
           
            $rs = executeArray($exec);
            if($rs){
                $msg = "berhasil";
            }else{
                $msg = "gagal";
            }
            $response["message"]=$msg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>