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

    function getCekAkun(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $data['kode_lokasi'];
            $periode = $data['periode'];
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select a.kode_akun,b.nama
				from relakun a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='11' and a.kode_akun not in (select kode_akun from masakun where kode_lokasi='11')
				order by a.kode_akun ";

            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    

    function proses() {
        session_start();
        getKoneksi();
        $data = $_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){  
            $exec = array();
            $kode = array("P01");
            $sts = array();
            $kode_lokasi = $data['kode_lokasi'];
            $periode = $data['periode'];
			$tahun=substr($periode,0,4);
            // cek akun belum terelasi ke struktur laporan
            $cek1 = "exec sp_exs_agg_real_bulan '$kode_lokasi','$tahun','-'";
            $res1 = execute($cek1);
            $response['cek'] = $res1;
            
            $sts[$kode[0]] = 0;
            
            $del = "delete from dba_gar_d where periode='$periode' and kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del);
            for($i=0;$i<count($kode);$i++){
                if(isset($sts[$kode[$i]])){
                    $ins = "insert into dba_gar_d (kode_proses,kode_lokasi,periode,status) values ('".$kode[$i]."','$kode_lokasi','$periode','".$sts[$kode[$i]]."') ";
                    array_push($exec,$ins);
                }
            }

            $insert = executeArray($exec,$err);
            // $insert = true;
            // $err = null;
            if($err == null){
                $tmp="sukses";
                $status=true;
                $response['data'] = dbResultArray("select a.kode_proses,a.nama,b.status
                from dba_gar a
                inner join dba_gar_d b on a.kode_proses=b.kode_proses 
                where b.kode_lokasi='$kode_lokasi' and b.periode='$periode'");
                
            }else{
                $tmp="gagal".$err;
                $status=false;
                $response['data'] = array();
            }
            $response["message"] =  $tmp;
            $response["status"] = $status; 
            $response["sts"] =  $sts; 
            $response["kode"] =  $kode;
             
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>