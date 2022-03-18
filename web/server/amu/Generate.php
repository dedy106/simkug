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
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
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

    function generateQR() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){   
            $root_ser="http://".$_SERVER['SERVER_NAME']."/web/server/amu";
            include_once($_SERVER["DOCUMENT_ROOT"]."web/lib/phpqrcode/qrlib.php"); //<-- LOKASI FILE UTAMA PLUGINNYA
 
            $tempdir = $_SERVER["DOCUMENT_ROOT"]."web/server/amu/temp/"; //<-- Nama Folder file QR Code kita nantinya akan disimpan
            if (!file_exists($tempdir))#kalau folder belum ada, maka buat.
                mkdir($tempdir);
            
            $quality = $_POST['quality']; //ada 4 pilihan, L (Low), M(Medium), Q(Good), H(High)
            $ukuran = $_POST['ukuran']; //batasan 1 paling kecil, 10 paling besar
            $padding = $_POST['padding'];

            $kode_lokasi = $data['kode_lokasi'];
            $kode_pp = $data['kode_pp'];
            $kode_klp = $data['kode_klp'];
            $no_bukti = $data['no_bukti'];
            if($kode_klp == "" OR $kode_klp == "all"){
                $filter = "";
            } else{
                $filter = " and kode_klp='$kode_klp' ";
            }
            if($no_bukti == "" OR $no_bukti == "all"){
                $filter2 = "";
            } else{
                $filter2 = " and no_bukti='$no_bukti' ";
            }


            $sql="select no_bukti,nama_inv as nama from amu_asset_bergerak where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' $filter $filter2 ";
            $data = dbResultArray($sql);
            $html = "<div class='row'>";
            for($i=0;$i<count($data);$i++){
                $isi_teks = $data[$i]['no_bukti'];
                // $namafile = uniqid();
                // $namafile .= ".png";
                $namafile = $isi_teks.".png";
                QRCode::png($isi_teks,$tempdir.$namafile,$quality,$ukuran,$padding);
                $html .= "<div class='col-sm-3'><h6>$isi_teks</h6><img src='$root_ser/temp/$namafile'/></div>";
                
            }
            $response["img"]=$html."</div>";
            $response["kode_klp"]=$kode_klp;
            $response["no_bukti"]=$no_bukti;
            $response["sql"]=$sql;
            $response["message"] = "berhasil";
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAset() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data['kode_lokasi'];
            $kode_pp = $data['kode_pp'];
            $kode_klp = $data['kode_klp'];
            if($kode_klp = "" OR $kode_klp = "all"){
                $filter = "";
            } else{
                $filter = " and kode_klp='$kode_klp' ";
            }
            $sql="select 'all' as no_bukti, 'All' as nama union all select no_bukti,nama_inv as nama from amu_asset_bergerak where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' $filter";
            $response['daftar'] = dbResultArray($sql);
            $response["sql"]=$sql;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKlp() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data['kode_lokasi'];
            $kode_pp = $data['kode_pp'];
            $kode_klp = $data['kode_klp'];
            $response['daftar'] = dbResultArray(" select 'all' as kode_klp, 'All' as nama union all  select kode_klp,nama_klp as nama from amu_klp_brg where kode_lokasi='$kode_lokasi' ");
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
?>