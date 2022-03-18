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
        $pass = qstr($pass);

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

    function clearTmp() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_GET['kode_lokasi'];
            $exec = array();
            $sql = "delete from gj_aju_tmp where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$sql);  
            $sql2 = "delete from gj_aju_cek where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$sql2);  
            $rs =executeArray($exec,$err);
            if($err == null){
                $response["message"] = "sukses";
                $response["status"] = true;
            }else{
                
                $response["message"] = "gagal";
                $response["status"] = false;
            }
            
        } else{
            $response["message"] = "Unauthorized Access, Login Required".$_SESSION['userLog'];
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function simpanDataTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $_POST['kode_lokasi'];
            // if(!empty($_FILES["file_dok"]["name"])){

                $path_s = realpath($_SERVER["DOCUMENT_ROOT"])."/";
                $target_dir = $path_s."server/media/";
                $target_file = $target_dir . basename($_FILES["file_dok"]["name"]);
                $uploadOk = 1;
                $message="";
                $error_upload="";
                $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

                // Allow certain file formats
                if($imageFileType != "xlsx" && $imageFileType != "xls") {
                    $error_upload= "Sorry, only Excel files are allowed.";
                    $uploadOk = 0;
                }

                // Check if $uploadOk is set to 0 by an error
                if ($uploadOk == 0) {
                    $error_upload= "Sorry, your file was not uploaded.";
                // if everything is ok, try to upload file
                } else {
                    if (move_uploaded_file($_FILES["file_dok"]["tmp_name"], $target_file)) {
                        $message = "The file ". basename( $_FILES["file_dok"]["name"]). " has been uploaded.";
                    } else {
                        $error_upload= "Sorry, there was an error uploading your file.";
                        // echo $target_file;
                        // echo $_FILES["file_dok"]["error"];
                        if (is_dir($target_dir) && is_writable($target_dir)) {
                            // do upload logic here
                        } else if (!is_dir($target_dir)){
                            $error_upload.= 'Upload directory does not exist.'.$target_dir;
                        } else if (!is_writable($target_dir)){
                            $error_upload.= 'Upload directory is not writable'.$target_dir;
                        }

                    }
                }

                $filepath=$target_file;
                $filetype=$imageFileType;
            // }else{
            //     $filepath="-";
            //     $filetype="-";
            // }

            $err_ins = array();
            if($uploadOk){
                chmod($_FILES['file_dok']['name'],0777);
                // mengambil isi file xls
                $data = new Spreadsheet_Excel_Reader($target_dir.$_FILES['file_dok']['name'],false);
                // menghitung jumlah baris data yang ada
                $jumlah_baris = $data->rowcount($sheet_index=0);
                
                // jumlah default data yang berhasil di import
                $berhasil = 0;
                $e = 0;
                $response["jumlah"] = $jumlah_baris;

                $del = "delete from gj_aju_tmp where kode_lokasi='$kode_lokasi' ";
                
                array_push($exec,$del);
                $to_gadas=0;$to_tupos=0;$to_tudas=0;$to_hal=0;$to_lmbr=0;
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing

                    $kode_pp     = $data->val($i, 1);
                    $gadas   = floatval($data->val($i, 2));
                    $tudas   = floatval($data->val($i, 3));
                    $tupos   = floatval($data->val($i, 4));
                    $tuhal   = floatval($data->val($i, 5));
                    $lmbr   = floatval($data->val($i, 6));

                    $sql[$i] = "INSERT into  gj_aju_tmp (kode_pp,kode_lokasi,gadas,tudas,tupos,tuhal,lmbr) values ('$kode_pp','$kode_lokasi',$gadas,$tudas,$tupos,$tuhal,$lmbr)";
                        
                    array_push($exec,$sql[$i]);
					
                }
                
                // hapus kembali file .xls yang di upload tadi
                unlink($target_dir.$_FILES['file_dok']['name']);
                $insert = true;
            }else{
                $insert = false;
            }

            if(count($err_ins)>0){
                $tmp = "error data tidak valid";
                $response["error_ins"] = $err_ins;
                $sts = false;
            }else{
                $insert = executeArray($exec,$err);
                $tmp=array();
                $kode = array();
                if ($err == null)
                {	
                    $tmp="sukses";
                    $sts=true;
                }else{
                    $tmp="gagal".$err;
                    $sts=false;
                }	
            }
            
            $response["message"] =$tmp;
            $response["status"] = $sts;
            $response["error"] = $error_array; 
			$response["data"]= $exec;
			 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        echo json_encode($response);
        
    }

    function getDataTmp(){
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
            $query .= "select kode_pp,kode_lokasi,gadas,tudas,tupos,tuhal,lmbr
            from gj_aju_tmp 
            where kode_lokasi= '$kode_lokasi' ";

            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function generateNoBukti(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            if($_GET['tanggal'] == ""){
                $tanggal = date('Y-m-d');
            }else{
                $tanggal = reverseDate($_GET['tanggal'],"-","-");
            }
            $periode = substr($tanggal,0,4).substr($tanggal,5,2);
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $no_bukti = generateKode("gj_aju_m", "no_bukti", $kode_lokasi."-TT".substr($periode,2,4).".", "0001");
            $response['tanggal'] = $tanggal;
            $response['periode'] = $periode;
            $response["no_bukti"] = $no_bukti;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTakKirim(){
        session_start();
        getKoneksi();
        $data=$_GET;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_SESSION['lokasi'];
            
            $query = '';
            $output = array();
            $data = dbResultArray("select no_kirim,keterangan from takkirim_m where no_terima='-' and kode_loktuj='$kode_lokasi' and progress='0'");
            $response['daftar'] = $data;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function validasi() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            $exec = array();
            $array_bukti = array();
            $error_array = array();
            $nik = $_SESSION['userLog'];
            $deskripsi = $data['deskripsi'];
            $kode_pp = $_SESSION['kodePP'];
            $postno_bukti = $data['no_bukti'];
            if($data['tanggal'] == ""){
                $tanggal = date('Y-m-d');
            }else{
                $tanggal = reverseDate($data['tanggal'],"-","-");
            }
            $periode = substr($tanggal,0,4).substr($tanggal,5,2);
            $tahun = substr($tanggal,0,4);
            $del = " delete from gj_aju_cek where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$sql);

            $get = dbResultArray("select '$postno_bukti' as no_bukti, '$kode_lokasi' as kode_lokasi,a.kode_param,a.kode_pp,a.kode_akun,a.kode_drk,'$periode' as periode,sum(nilai) as nilai
            from (
                select b.kode_param,b.kode_akun,b.kode_drk,a.kode_pp,a.gadas as nilai
                from gj_aju_tmp a inner join  gj_param b on 'GADAS'=b.kode_param
                where b.tahun='$tahun' and a.kode_lokasi='$kode_lokasi'
                union all
                select b.kode_param,b.kode_akun,b.kode_drk,a.kode_pp,a.tudas as nilai
                from gj_aju_tmp a inner join  gj_param b on 'TUDAS'=b.kode_param
                where b.tahun='$tahun' and a.kode_lokasi='$kode_lokasi'
                union all
                select b.kode_param,b.kode_akun,b.kode_drk,a.kode_pp,a.tupos as nilai
                from gj_aju_tmp a inner join  gj_param b on 'TUPOS'=b.kode_param
                where b.tahun='$tahun' and a.kode_lokasi='$kode_lokasi'
                union all
                select b.kode_param,b.kode_akun,b.kode_drk,a.kode_pp,a.tuhal as nilai
                from gj_aju_tmp a inner join  gj_param b on 'TUHAL'=b.kode_param
                where b.tahun='$tahun' and a.kode_lokasi='$kode_lokasi'
                union all
                select b.kode_param,b.kode_akun,b.kode_drk,a.kode_pp,a.lmbr as nilai
                from gj_aju_tmp a inner join  gj_param b on 'LMBR'=b.kode_param
                where b.tahun='$tahun' and a.kode_lokasi='$kode_lokasi'
            ) a
            group by a.kode_param,a.kode_akun,a.kode_pp,a.kode_drk ");

            for($i=0;$i<count($get);$i++){

                $cek = execute("select dbo.fn_cekagg2('".$get[$i]['kode_pp']."','$kode_lokasi','".$get[$i]['kode_akun']."','".$get[$i]['kode_drk']."','$periode') as saldo");
                $tmp = explode(";",$cek->fields[0]);
                $saldo = floatval($tmp[0])-floatval($tmp[1]);
                $saldo_akhir = $saldo-floatval($get[$i]['nilai']);
                if($saldo_akhir < 0){
                    $status = 1;
                }else{
                    $status = 0;
                }
                
                $ins = "insert into gj_aju_cek (no_bukti,kode_lokasi,kode_param,kode_pp,kode_akun,kode_drk,periode,nilai,saldo_awal,saldo_akhir,status) values ('".$get[$i]['no_bukti']."','".$get[$i]['kode_lokasi']."','".$get[$i]['kode_param']."','".$get[$i]['kode_pp']."','".$get[$i]['kode_akun']."','".$get[$i]['kode_drk']."','".$get[$i]['periode']."','".$get[$i]['nilai']."','".$saldo."','".$saldo_akhir."','$status') ";
                array_push($exec,$ins);
            }

            $insert = executeArray($exec,$err);
            if($err == null){
                $tmp="sukses";
                $sts=true;
                $response['data'] = dbResultArray("select kode_akun,kode_pp,kode_drk,nilai,saldo_awal as so_awal,saldo_akhir as so_akhir,status
                from gj_aju_cek where kode_lokasi='$kode_lokasi' and no_bukti='$postno_bukti' ");
            }else{
                $tmp="gagal".$err;
                $sts=false;
            }
            $response["message"] =  $tmp;
            $response["status"] = $sts;
             
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function simpanData() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            $exec = array();
            $array_bukti = array();
            $error_array = array();
            $nik = $_SESSION['userLog'];
            $deskripsi = $data['deskripsi'];
            $no_tak = $data['no_kirim'];
            $kode_pp = $_SESSION['kodePP'];
            $postno_bukti = $data['no_bukti'];
            if($data['tanggal'] == ""){
                $tanggal = date('Y-m-d');
            }else{
                $tanggal = reverseDate($data['tanggal'],"-","-");
            }
            $periode = substr($tanggal,0,4).substr($tanggal,5,2);

            $no_bukti = generateKode("gj_aju_m", "no_bukti", $kode_lokasi."-TT".substr($periode,2,4).".", "0001");

            $get = execute("select a.kode_akun,a.kode_lokasi 
            from takkirim_j a
            inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag='016'
            where a.no_kirim='$no_tak' ");

            if($get->RecordCount() > 0){
                $kode_akuntak= $get->fields[0];
                $kode_lokasikirim= $get->fields[1];
            }else{
                $kode_akuntak = '-';
                $kode_lokasikirim= '-';
            }

            $ins = "insert into gj_aju_m (no_bukti,kode_lokasi,tanggal,keterangan,nik_user,tgl_input)
            values ('$no_bukti','$kode_lokasi','$tanggal','$deskripsi','$nik',getdate())
            ";
            array_push($exec,$ins);

            $ins2 = "insert into gj_aju_d (no_bukti,kode_lokasi,kode_param,kode_akun,kode_drk,periode,nilai,kode_pp) 
            select '$no_bukti',kode_lokasi,kode_param,kode_akun,kode_drk,periode,nilai,kode_pp 
            from gj_aju_cek
            where kode_lokasi='$kode_lokasi' and no_bukti='$postno_bukti'
            ";
            array_push($exec,$ins2);

            $get2 = execute("select sum(nilai) as nilai from gj_aju_cek where kode_lokasi='$kode_lokasi' and no_bukti='$postno_bukti' ");
            $total = floatval($get2->fields[0]);
            
            //insert jurnal
            $ins3 = "insert into takterima_m (no_terima,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,kode_lokkirim,no_kirim ) values ('$no_bukti','$kode_lokasi','-',getdate(),'$deskripsi','$kode_pp','PAYROLL','TAKTERIMA','$periode','IDR',1,$total,'$nik','$nik',getdate(),'$nik','T','-','-','$kode_lokasikirim','$no_tak') ";
            array_push($exec,$ins3);
            

            $ins4 = "insert into takterima_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs)  
            select '$no_bukti','-',getdate(),ROW_NUMBER() OVER (
                ORDER BY kode_akun
               ) row_num,kode_akun,'$deskripsi','D',nilai,kode_pp,kode_drk,kode_lokasi,'PAYROLL','BDD','$periode','$nik',getdate(),'IDR',1
            from gj_aju_cek
            where kode_lokasi='$kode_lokasi' and no_bukti='$postno_bukti'
            ";
            array_push($exec,$ins4);


            $ins5 = "insert into takterima_j (no_terima,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,kode_curr,kurs)  
            values ('$no_bukti','-',getdate(),3000,'$kode_akuntak','$deskripsi','C',$total,'$kode_pp','-','$kode_lokasi','PAYROLL','TAK','$periode','$nik',getdate(),'IDR',1)
            ";
            array_push($exec,$ins5);

            $update = "update takkirim_m set no_terima='$no_bukti',progress='1' where no_kirim='$no_tak' and kode_lokasi='$kode_lokasikirim' ";
            array_push($exec,$update);

            $delete = "delete from gj_aju_tmp where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$delete);
            $delete2 = "delete from gj_aju_cek where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$delete2);
                    
            $insert = executeArray($exec,$err);
            if($err == null){
                $tmp="sukses";
                $sts=true;
                
            }else{
                $tmp="gagal".$err;
                $sts=false;
            }
            $response["message"] =  $tmp;
            $response["status"] = $sts;
             
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>