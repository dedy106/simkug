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
            hapusData();
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
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user", 1);
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

    function getPeriode2() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $perusahan = dbResultArray("select distinct periode from periode where kode_lokasi='$kode_lokasi' ");
            $response["daftar"] = $perusahan;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }       

    function getData(){
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
            $query .= "select no_bukti,kode_lokasi,keterangan,tahun,tgl_input,nik_user from agg_abt_m
            where kode_lokasi= '$kode_lokasi' ";

            $response["data"] = dbResultArray($query);
            for($i=0;$i<count($response["data"]);$i++){
                $response["data"][$i]["action"] = "<a href='#' title='View' class='badge badge-info' id='btn-view'>View</a> &nbsp; <a href='#' title='Hapus' class='badge badge-danger' id='btn-delete'>Hapus</a>";
            }
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDetail(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $tahun = $_GET['tahun'];
            $no_bukti = $_GET['no_bukti'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select no_bukti,kode_lokasi,kode_akun,kode_pp,kode_drk,tahun,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12 from agg_abt_d
            where kode_lokasi= '$kode_lokasi' and tahun='$tahun' and no_bukti='$no_bukti' ";

            $response["daftar"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function hapusData(){
        session_start();
        getKoneksi();
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            
            parse_str(file_get_contents('php://input'), $_DELETE);
            $data = $_DELETE;
            $kode_lokasi = $data['kode_lokasi'];
            $tahun = $data['tahun'];
            $no_bukti = $data['no_bukti'];
            $exec = array();
            $query="DELETE FROM agg_abt_m where no_bukti='$no_bukti' and kode_lokasi = '$kode_lokasi' and tahun='$tahun' " ;
            array_push($exec,$query);

            $query1="DELETE FROM agg_abt_d where no_bukti='$no_bukti' and kode_lokasi = '$kode_lokasi' and tahun='$tahun' " ;
            array_push($exec,$query1);

            $query2="DELETE FROM anggaran_d where no_agg='$no_bukti' and kode_lokasi = '$kode_lokasi' and periode like '$tahun%' " ;
            array_push($exec,$query2);
            
            $query3="DELETE FROM anggaran_d where no_agg='$no_bukti' and kode_lokasi = '03' and periode like '$tahun%' " ;
            array_push($exec,$query3);
            
            $rs=executeArray($exec,$err);
            if($err == null) {
                $response=array(
                    'status' => true,
                    'message' =>'berhasil'
                );
            }
            else {
                $response=array(
                    'status' => false,
                    'message' =>'gagal. Error:'.$err
                );
            }
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>