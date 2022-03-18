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

    function getNeracaBalance(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $data['kode_lokasi'];
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select sum(n4) as nilai from neraca_tmp where kode_lokasi='$kode_lokasi' and nik_user='".$_SESSION['nikUser']."' and kode_neraca in ('1T','39T')
            ";
            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getSaldoBalance(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $data['kode_lokasi'];
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select sum(so_awal) as so_awal,sum(debet) as debet,sum(kredit) as kredit,sum(so_akhir)as so_akhir from glma_tmp where kode_lokasi='$kode_lokasi' and nik_user='".$_SESSION['nikUser']."'   
            ";
            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBuktiTidakBalance(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $data['kode_lokasi'];
			$periode = $data['periode'];
            $query = '';
            $output = array();
       
            $query .= "select no_bukti
            from gldt
            where periode='$periode' and kode_lokasi='$kode_lokasi'
            group by no_bukti
            having sum(case when dc='D' then nilai else -nilai end)<>0   
            ";
            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAkunNotInTrans(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $data['kode_lokasi'];
			$periode = $data['periode'];
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select no_bukti
            from gldt
            where kode_lokasi='$kode_lokasi' and periode='$periode' and kode_akun not in (select kode_akun from masakun where kode_lokasi='$kode_lokasi')       
            ";
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
            $kode = array("P01","P02","P03","P04","P05");
            $sts = array();
            $kode_lokasi = $data['kode_lokasi'];
            $periode = $data['periode'];
            //cek akun belum terelasi ke struktur laporan
            $cek1 = "select count(a.kode_akun) as jumlah
				from relakun a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and a.kode_akun not in (select kode_akun from masakun where kode_lokasi='$kode_lokasi')";
            $res1 = dbResultArray($cek1);
            $response['cek'] = $res1;
            if($res1[0]['jumlah'] == 0){
                $sts["$kode[0]"] = 0;
            }else{

                $sts["$kode[0]"] = 1;
            }
            //neraca balance
            $sql = array();
            $ex = "exec sp_neraca_dw 'FS1','A','K','1','$periode','$kode_lokasi','".$_SESSION['nikUser']."' ";
            array_push($sql,$ex);
            $rs = executeArray($sql,$err);
            $response['err'] = $err;

            $cek2 = "select round(sum(n4),0) as nilai from neraca_tmp where kode_lokasi='$kode_lokasi' and nik_user='".$_SESSION['nikUser']."' and kode_neraca in ('1T','39T')
            ";
            $res2 = dbResultArray($cek2);
            $response['cek'] = $res2;
            if(count($res2) > 0 ){
                if($res2[0]['nilai'] == 0){
                    $sts["$kode[1]"] = 0;
                }else{

                    $sts["$kode[1]"] = 1;
                }
            }else{
                $sts["$kode[1]"] = 0;
            }

            //cek saldo balance
            $sql = array();
            $ex = "exec sp_glma_dw_tmp '$kode_lokasi','$periode','".$_SESSION['nikUser']."'";
            array_push($sql,$ex);
            $rs2 = executeArray($sql,$err);
            $response['err2'] = $err;

            $cek3 = "select sum(so_awal) as so_awal,sum(debet) as debet,sum(kredit) as kredit,sum(so_akhir)as so_akhir from glma_tmp where kode_lokasi='$kode_lokasi' and nik_user='".$_SESSION['nikUser']."' 
            ";
            $res3 = dbResultArray($cek3);
            if(count($res3) > 0 ){
                if(floatval($res3[0]['debet']) == floatval($res3[0]['kredit'])){
                    $sts["$kode[2]"] = 0;
                }else{
                    $sts["$kode[2]"] = 1;
                }
            }else{
                $sts["$kode[2]"] = 1;
            }
            
            // //cek bukti tidak balance
            $cek4 = "select no_bukti
            from gldt
            where periode='$periode' and kode_lokasi='$kode_lokasi'
            group by no_bukti
            having sum(case when dc='D' then nilai else -nilai end)<>0            
            ";
            $res4 = dbResultArray($cek4);

            if(count($res4) > 0 ){
                $sts["$kode[3]"] = 1;
            }else{
                $sts["$kode[3]"] = 0;
            }

            //cek akun yg tidak ada di transaksi
            $cek5 = "select no_bukti
            from gldt
            where kode_lokasi='$kode_lokasi' and periode='$periode' and kode_akun not in (select kode_akun from masakun where kode_lokasi='$kode_lokasi')       
            ";
            $res5 = dbResultArray($cek5);

            if(count($res5) > 0 ){
                $sts["$kode[4]"] = 1;
            }else{
                $sts["$kode[4]"] = 0;
            }

            $del = "delete from dba_closing_d where periode='$periode' and kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del);
            for($i=0;$i<count($kode);$i++){
                if(isset($sts["$kode[$i]"])){
                    $ins = "insert into dba_closing_d (kode_proses,kode_lokasi,periode,status) values ('".$kode[$i]."','$kode_lokasi','$periode','".$sts["$kode[$i]"]."') ";
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
                from dba_closing a
                inner join dba_closing_d b on a.kode_proses=b.kode_proses 
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