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

    function clearTmpObli() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $exec = array();
            $sql = "delete from inv_obli_harga_tmp2";
            array_push($exec,$sql);  
            $rs =executeArray($exec);
            if($rs){
                $response["message"] = "sukses";
                $response["status"] = true;
            }else{
                
                $response["message"] = "gagal";
                $response["status"] = false;
            }
            
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
    function cekKodeObli($kode){
        getKoneksi();     
        $sql = "select kode_jenis from inv_oblijenis where kode_jenis ='$kode'";
        $rs = execute($sql);
        if($rs->RecordCount()>0){
            return true;
        }else{
            return false;
        }
    }

    //HARGA
    function simpanObliTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $data['kode_lokasi'];
            
            // if(!empty($_FILES["file_dok"]["name"])){

                $path_s = realpath($_SERVER["DOCUMENT_ROOT"])."/";
                $target_dir = $path_s."server/media/";
                $target_file = $target_dir . basename($_FILES["file_dok"]["name"]);
                $uploadOk = 1;
                $message="";
                $error_upload="";
                $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));

                // Check if file already exists
                // if (file_exists($target_file)) {
                //     $error_upload= "Sorry, file already exists.";
                //     $uploadOk = 0;
                // }
                // Check file size
                // if ($_FILES["file_dok"]["size"] > 2000000) {
                //     $error_upload= "Sorry, your file is too large.";
                //     $uploadOk = 0;
                // }
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
                $jumlah_baris2 = $data->rowcount($sheet_index=1);
                
                // jumlah default data yang berhasil di import
                $berhasil = 0;
                $e = 0;
                $response["jumlah"] = $jumlah_baris;
                $response["jumlah_sheet2"] = $jumlah_baris2;

                $del = "delete from inv_obli_harga_tmp2 ";
                
                array_push($exec,$del);
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $tanggal     = $data->val($i, 1,0);
                    $kode_jenis     = $data->val($i, 2,0);
                    $yield   = floatval($data->val($i, 3,0));
                    $h_wajar   = floatval($data->val($i, 4,0));
                    if($kode_jenis == ""){
                        $err_ins[] = array("kode_jenis" =>"Invalid kode","err_msg"=>"Error Kode Kosong");
                        
                    }else{
                        if(cekKodeObli($kode_jenis)){
                            $per = substr($tanggal,0,4)."".substr($tanggal,5,2);
                            $sql[$i] = "INSERT into  inv_obli_harga_tmp2 (periode,tanggal,kode_jenis,yield,h_wajar) values('$per','$tanggal','$kode_jenis',$yield,$h_wajar)";
                            // $rs[$i]=execute($sql[$i]);
                            array_push($exec,$sql[$i]);
                        }else{
                            $err_ins[] = array("kode_jenis" => $kode_jenis,"err_msg"=>"kode tidak terdaftar");
                            
                        }
                    }

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
                    $tmp="gagal";
                    $sts=false;
                }	
            }
            $response["message"] =$tmp;
            $response["status"] = $sts;
            $response["data"]= $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        echo json_encode($response);
        
    }

    //HARGA
    function getHargaObli2(){
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
            $query .= "select tanggal,kode_jenis,yield,h_wajar from inv_obli_harga_tmp2 ";
            
            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function simpanObliHarga() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            $exec = array();

            $sqlx = "select distinct tanggal from inv_obli_harga_tmp2 
            ";	
            $get = dbResultArray($query);
            $sql_sp = array();
            $i=0;
            foreach($get as $row){
                $sql_sp[$i] = "exec sp_get_hobli_tanggal '".$row['tanggal']."';";
                array_push($exec,$sql_sp[$i]);
                $i++;
            }
            $sqlx = "insert into inv_obli_harga (periode,tanggal,kode_jenis,yield,h_wajar) 
                    select periode,tanggal,kode_jenis,yield,h_wajar 
                    from inv_obli_harga_tmp2
                    ";	
            array_push($exec,$sqlx);
            
            $del2 = "delete from inv_obli_harga_tmp2 ";
            array_push($exec,$del2);
            $insert = executeArray($exec,$err);
            // $insert = true;
            if($err == null){
                $tmp="sukses";
                $sts=true;
                
            }else{
                $tmp="gagal. ".$err;
                $sts=false;
            }
            $response["message"] =  $tmp;
            $response["status"] = $sts; 
            $response["exec"] =  $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }
 
    

?>