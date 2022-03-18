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

    function cekAuth($user,$pass){
        getKoneksi();
        $user = qstr($user);
        $pass = qstr($pass);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user and pass=$pass", 1);
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
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
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

    function clearTmpShm() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $exec = array();
            $sql = "delete from inv_shm_harga_tmp where kode_lokasi='$kode_lokasi' ";
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

    function clearTmpRd() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $exec = array();
            $sql = "delete from inv_rd_harga_tmp where kode_lokasi='$kode_lokasi' ";
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
    
    function cekKodeShm($kode){
        getKoneksi();     
        $sql = "select kode_saham from inv_saham where kode_saham ='$kode'";
        $rs = execute($sql);
        if($rs->RecordCount()>0){
            return true;
        }else{
            return false;
        }
    }

    function cekKodeRd($kode){
        getKoneksi();     
        $sql = "select a.kode_rd from (select kode_rd from inv_rd union all select '-' as kode_rd ) a
        where a.kode_rd ='$kode'";
        $rs = execute($sql);
        if($rs->RecordCount()>0){
            return true;
        }else{
            return false;
        }
    }

    function simpanShmTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        
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
                
                // jumlah default data yang berhasil di import
                $berhasil = 0;
                $e = 0;
                $response["jumlah"] = $jumlah_baris;

                $del = "delete from inv_shm_harga_tmp where kode_lokasi='$kode_lokasi' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_saham     = $data->val($i, 1);
                    $n1   = floatval($data->val($i, 2));
                    $n2   = floatval($data->val($i, 3));
                    $n3   = floatval($data->val($i, 4));
                    $n4   = floatval($data->val($i, 5));
                    $n5   = floatval($data->val($i, 6));
                    $n6   = floatval($data->val($i, 7));
                    $n7   = floatval($data->val($i, 8));
                    $n8   = floatval($data->val($i, 9));
                    $n9   = floatval($data->val($i, 10));
                    $n10   = floatval($data->val($i, 11));
                    $n11   = floatval($data->val($i, 12));
                    $n12   = floatval($data->val($i, 13));
                    $n13  = floatval($data->val($i, 14));
                    $n14   = floatval($data->val($i, 15));
                    $n15  = floatval($data->val($i, 16));
                    $n16   = floatval($data->val($i, 17));
                    $n17   = floatval($data->val($i, 18));
                    $n18   = floatval($data->val($i, 19));
                    $n19   = floatval($data->val($i, 20));
                    $n20  = floatval($data->val($i, 21));
                    $n21   = floatval($data->val($i, 22));
                    $n22   = floatval($data->val($i, 23));
                    $n23   = floatval($data->val($i, 24));
                    $n24   = floatval($data->val($i, 25));
                    $n25   = floatval($data->val($i, 26));
                    $n26   = floatval($data->val($i, 27));
                    $n27  = floatval($data->val($i, 28));
                    $n28   = floatval($data->val($i, 29));
                    $n29   = floatval($data->val($i, 30));
                    $n30   = floatval($data->val($i, 31));
                    $n31   = floatval($data->val($i, 32));
                    if($kode_saham == ""){
                        $err_ins[] = array("kode_saham" =>"Invalid kode","err_msg"=>"Error Kode Kosong");
                        
                    }else{
                        if(cekKodeShm($kode_saham)){
                            $sql[$i] = "INSERT into  inv_shm_harga_tmp  values('$kode_lokasi','$kode_saham',$n1,$n2,$n3,$n4,$n5,$n6,$n7,$n8,$n9,$n10,$n11,$n12,$n13,$n14,$n15,$n16,$n17,$n18,$n19,$n20,$n21,$n22,$n23,$n24,$n25,$n26,$n27,$n28,$n29,$n30,$n31)";
                            // $rs[$i]=execute($sql[$i]);
        
                            array_push($exec,$sql[$i]);
                        }else{
                            $err_ins[] = array("kode_saham" => $kode_saham,"err_msg"=>"kode tidak terdaftar");
                            
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
                $insert = executeArray($exec);
                $tmp=array();
                $kode = array();
                if ($insert)
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

    function simpanRdTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        
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
                
                // jumlah default data yang berhasil di import
                $berhasil = 0;
                $e = 0;
                $response["jumlah"] = $jumlah_baris;

                $del = "delete from inv_rd_harga_tmp where kode_lokasi='$kode_lokasi' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_rd     = $data->val($i, 1);
                    $n1   = floatval($data->val($i, 2));
                    $n2   = floatval($data->val($i, 3));
                    $n3   = floatval($data->val($i, 4));
                    $n4   = floatval($data->val($i, 5));
                    $n5   = floatval($data->val($i, 6));
                    $n6   = floatval($data->val($i, 7));
                    $n7   = floatval($data->val($i, 8));
                    $n8   = floatval($data->val($i, 9));
                    $n9   = floatval($data->val($i, 10));
                    $n10   = floatval($data->val($i, 11));
                    $n11   = floatval($data->val($i, 12));
                    $n12   = floatval($data->val($i, 13));
                    $n13  = floatval($data->val($i, 14));
                    $n14   = floatval($data->val($i, 15));
                    $n15  = floatval($data->val($i, 16));
                    $n16   = floatval($data->val($i, 17));
                    $n17   = floatval($data->val($i, 18));
                    $n18   = floatval($data->val($i, 19));
                    $n19   = floatval($data->val($i, 20));
                    $n20  = floatval($data->val($i, 21));
                    $n21   = floatval($data->val($i, 22));
                    $n22   = floatval($data->val($i, 23));
                    $n23   = floatval($data->val($i, 24));
                    $n24   = floatval($data->val($i, 25));
                    $n25   = floatval($data->val($i, 26));
                    $n26   = floatval($data->val($i, 27));
                    $n27  = floatval($data->val($i, 28));
                    $n28   = floatval($data->val($i, 29));
                    $n29   = floatval($data->val($i, 30));
                    $n30   = floatval($data->val($i, 31));
                    $n31   = floatval($data->val($i, 32));
                    if($kode_rd == ""){
                        $err_ins[] = array("kode_rd" =>"Invalid kode","err_msg"=>"Error Kode Kosong");
                        
                    }else{
                        if(cekKodeRd($kode_rd)){
                            $sql[$i] = "INSERT into  inv_rd_harga_tmp  values('$kode_lokasi','$kode_rd',$n1,$n2,$n3,$n4,$n5,$n6,$n7,$n8,$n9,$n10,$n11,$n12,$n13,$n14,$n15,$n16,$n17,$n18,$n19,$n20,$n21,$n22,$n23,$n24,$n25,$n26,$n27,$n28,$n29,$n30,$n31)";
                            // $rs[$i]=execute($sql[$i]);
        
                            array_push($exec,$sql[$i]);
                        }else{
                            $err_ins[] = array("kode_rd" => $kode_rd,"err_msg"=>"kode tidak terdaftar");
                            
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
                $insert = executeArray($exec);
                $tmp=array();
                $kode = array();
                if ($insert)
                {	
                    $tmp="sukses";
                    $sts=true;
                }else{
                    $tmp="gagal validasi";
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

    function getHargaShm(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kode_saham,tgl1,tgl2,tgl3,tgl4,tgl5,tgl6,tgl7,tgl8,tgl9,tgl10,tgl11,tgl12,tgl13,tgl14,tgl15,tgl16,tgl17,tgl18,tgl19,tgl20,tgl21,tgl22,tgl23,tgl24,tgl25,tgl26,tgl27,tgl28,tgl29,tgl30,tgl31 from inv_shm_harga_tmp
            where kode_lokasi= '".$kode_lokasi."' ";
            
            $column_array = array( 'kode_saham','tgl1','tgl2','tgl3','tgl4','tgl5','tgl6','tgl7','tgl8','tgl9','tgl10','tgl11','tgl12','tgl13','tgl14','tgl15','tgl16','tgl17','tgl18','tgl19','tgl20','tgl21','tgl22','tgl23','tgl24','tgl25','tgl26','tgl27','tgl28','tgl29','tgl30','tgl31');
            $order_column = 'ORDER BY kode_saham '.$data['order'][0]['dir'];
            $column_string = join(',', $column_array);
            
            // $res = execute($query);
            // $jml_baris = $res->recordcount();
            if(!empty($data['search']['value']))
            {
                $search = $data['search']['value'];
                $filter_string = " and (";
                
                for($i=0; $i<count($column_array); $i++){
                    
                    if($i == (count($column_array) - 1)){
                        $filter_string .= $column_array[$i]." like '".$search."%' )";
                    }else{
                        $filter_string .= $column_array[$i]." like '".$search."%' or ";
                    }
                }
                
                
                $query.=" $filter_string ";
            }
            
            if(isset($data["order"]))
            {
                $query .= ' ORDER BY '.$column_array[$data['order'][0]['column']].' '.$data['order'][0]['dir'];
            }
            else
            {
                $query .= ' ORDER BY kode_saham ';
            }
            if($data["length"] != -1)
            {
                $query .= ' OFFSET ' . $data['start'] . ' ROWS FETCH NEXT ' . $data['length'] . ' ROWS ONLY ';
            }
            // $statement = execute($query);
            $data = array();
            // $filtered_rows = $statement->recordcount();
            // while($row = $statement->FetchNextObject($toupper=false))
            // {
            //     $sub_array = array();
            //     $sub_array[] = $row->kode_saham;
            //     $sub_array[] = $row->tgl1;
            //     $sub_array[] = $row->tgl2;
            //     $sub_array[] = $row->tgl3;
            //     $sub_array[] = $row->tgl4;
            //     $sub_array[] = $row->tgl5;
            //     $sub_array[] = $row->tgl6;
            //     $sub_array[] = $row->tgl7;
            //     $sub_array[] = $row->tgl8;
            //     $sub_array[] = $row->tgl9;
            //     $sub_array[] = $row->tgl10;
            //     $sub_array[] = $row->tgl11;
            //     $sub_array[] = $row->tgl12;
            //     $sub_array[] = $row->tgl13;
            //     $sub_array[] = $row->tgl14;
            //     $sub_array[] = $row->tgl15;
            //     $sub_array[] = $row->tgl16;
            //     $sub_array[] = $row->tgl17;
            //     $sub_array[] = $row->tgl18;
            //     $sub_array[] = $row->tgl19;
            //     $sub_array[] = $row->tgl20;
            //     $sub_array[] = $row->tgl21;
            //     $sub_array[] = $row->tgl22;
            //     $sub_array[] = $row->tgl23;
            //     $sub_array[] = $row->tgl24;
            //     $sub_array[] = $row->tgl25;
            //     $sub_array[] = $row->tgl26;
            //     $sub_array[] = $row->tgl27;
            //     $sub_array[] = $row->tgl28;
            //     $sub_array[] = $row->tgl29;
            //     $sub_array[] = $row->tgl30;
            //     $sub_array[] = $row->tgl31;
            //     $data[] = $sub_array;
            // }
            $response = array(
                "draw"				=>	intval($data["draw"]),
                "recordsTotal"		=> 	$filtered_rows,
                "recordsFiltered"	=>	$jml_baris,
                "data"				=>	$data,
                "sql"               => $query
            );
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getHargaShm2(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kode_saham,tgl1,tgl2,tgl3,tgl4,tgl5,tgl6,tgl7,tgl8,tgl9,tgl10,tgl11,tgl12,tgl13,tgl14,tgl15,tgl16,tgl17,tgl18,tgl19,tgl20,tgl21,tgl22,tgl23,tgl24,tgl25,tgl26,tgl27,tgl28,tgl29,tgl30,tgl31 from inv_shm_harga_tmp
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

    function getHargaRd(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kode_rd,tgl1,tgl2,tgl3,tgl4,tgl5,tgl6,tgl7,tgl8,tgl9,tgl10,tgl11,tgl12,tgl13,tgl14,tgl15,tgl16,tgl17,tgl18,tgl19,tgl20,tgl21,tgl22,tgl23,tgl24,tgl25,tgl26,tgl27,tgl28,tgl29,tgl30,tgl31 from inv_rd_harga_tmp
            where kode_lokasi= '".$kode_lokasi."' ";
            
            $column_array = array( 'kode_rd','tgl1','tgl2','tgl3','tgl4','tgl5','tgl6','tgl7','tgl8','tgl9','tgl10','tgl11','tgl12','tgl13','tgl14','tgl15','tgl16','tgl17','tgl18','tgl19','tgl20','tgl21','tgl22','tgl23','tgl24','tgl25','tgl26','tgl27','tgl28','tgl29','tgl30','tgl31');
            $order_column = 'ORDER BY kode_rd '.$data['order'][0]['dir'];
            $column_string = join(',', $column_array);
            
            $res = execute($query);
            $jml_baris = $res->recordcount();
            if(!empty($data['search']['value']))
            {
                $search = $data['search']['value'];
                $filter_string = " and (";
                
                for($i=0; $i<count($column_array); $i++){
                    
                    if($i == (count($column_array) - 1)){
                        $filter_string .= $column_array[$i]." like '".$search."%' )";
                    }else{
                        $filter_string .= $column_array[$i]." like '".$search."%' or ";
                    }
                }
                
                
                $query.=" $filter_string ";
            }
            
            if(isset($data["order"]))
            {
                $query .= ' ORDER BY '.$column_array[$data['order'][0]['column']].' '.$data['order'][0]['dir'];
            }
            else
            {
                $query .= ' ORDER BY kode_rd ';
            }
            if($data["length"] != -1)
            {
                $query .= ' OFFSET ' . $data['start'] . ' ROWS FETCH NEXT ' . $data['length'] . ' ROWS ONLY ';
            }
            $statement = execute($query);
            $data = array();
            $filtered_rows = $statement->recordcount();
            while($row = $statement->FetchNextObject($toupper=false))
            {
                $sub_array = array();
                $sub_array[] = $row->kode_rd;
                $sub_array[] = $row->tgl1;
                $sub_array[] = $row->tgl2;
                $sub_array[] = $row->tgl3;
                $sub_array[] = $row->tgl4;
                $sub_array[] = $row->tgl5;
                $sub_array[] = $row->tgl6;
                $sub_array[] = $row->tgl7;
                $sub_array[] = $row->tgl8;
                $sub_array[] = $row->tgl9;
                $sub_array[] = $row->tgl10;
                $sub_array[] = $row->tgl11;
                $sub_array[] = $row->tgl12;
                $sub_array[] = $row->tgl13;
                $sub_array[] = $row->tgl14;
                $sub_array[] = $row->tgl15;
                $sub_array[] = $row->tgl16;
                $sub_array[] = $row->tgl17;
                $sub_array[] = $row->tgl18;
                $sub_array[] = $row->tgl19;
                $sub_array[] = $row->tgl20;
                $sub_array[] = $row->tgl21;
                $sub_array[] = $row->tgl22;
                $sub_array[] = $row->tgl23;
                $sub_array[] = $row->tgl24;
                $sub_array[] = $row->tgl25;
                $sub_array[] = $row->tgl26;
                $sub_array[] = $row->tgl27;
                $sub_array[] = $row->tgl28;
                $sub_array[] = $row->tgl29;
                $sub_array[] = $row->tgl30;
                $sub_array[] = $row->tgl31;
                $data[] = $sub_array;
            }
            $response = array(
                "draw"				=>	intval($data["draw"]),
                "recordsTotal"		=> 	$filtered_rows,
                "recordsFiltered"	=>	$jml_baris,
                "data"				=>	$data,
                "sql"               => $query
            );
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getHargaRd2(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kode_rd,tgl1,tgl2,tgl3,tgl4,tgl5,tgl6,tgl7,tgl8,tgl9,tgl10,tgl11,tgl12,tgl13,tgl14,tgl15,tgl16,tgl17,tgl18,tgl19,tgl20,tgl21,tgl22,tgl23,tgl24,tgl25,tgl26,tgl27,tgl28,tgl29,tgl30,tgl31 from inv_rd_harga_tmp
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

    function simpanShmHarga() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];

            $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'".substr($periode,0,4)."-".substr($periode,4,2)."-01')+1,0)) ,112),7,2) as tglakhir " ;
		    $data = dbRowArray($sql);
            $jmlHari = Intval($data["tglakhir"]) +1;
            
            $dataSHM = array();
            $sql3 = "select * from inv_shm_harga_tmp where kode_lokasi ='$kode_lokasi' ";
            // $dataSHM = dbResultArray($sql3);

            $rsSHM = execute($sql3);
            while($row = $rsSHM->FetchNextObject($toupper=false)){
                $dataSHM[] = (array)$row;
            }

            $sql2 = "select count(*) from inv_shm_harga_tmp where kode_lokasi='$kode_lokasi' " ;
            $rs = execute($sql2);

            $exec = array();
            
            $del = "delete from inv_shm_harga where periode='$periode' ";
            array_push($exec,$del);

            foreach ($dataSHM as $row){														    
                for($j=1;$j < $jmlHari;$j++){	
					$k = "-" . ($j < 10 ? "0":"" ) . $j;							
					$tgl = substr($periode,0,4)."-".substr($periode,4,2).$k;
                    $harga = floatval($row["tgl$j"]);

					$sqlx = "insert into inv_shm_harga (periode,tanggal,kode_saham,h_wajar) values  ('".$periode."','".$tgl."','".$row['kode_saham']."',".$harga.") ";	
                    array_push($exec,$sqlx);			
				}
            }

            $del2 = "delete from inv_shm_harga_tmp where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del2);
            $stor = "exec sp_gen_saham_kkp '".substr($periode,0,4)."-".substr($periode,4,2)."-01'";
            array_push($exec,$stor);
            $insert = executeArray($exec);
            // $insert = true;
            if($insert){
                $tmp="sukses";
                $sts=true;
                
            }else{
                $tmp="gagal";
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


    function simpanRdHarga() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];

            $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'".substr($periode,0,4)."-".substr($periode,4,2)."-01')+1,0)) ,112),7,2) as tglakhir " ;
		    $data = dbRowArray($sql);
            $jmlHari = Intval($data["tglakhir"]) +1;
            
            $dataSHM = array();
            $sql3 = "select * from inv_rd_harga_tmp where kode_lokasi ='$kode_lokasi' ";
            // $dataSHM = dbResultArray($sql3);

            $rsSHM = execute($sql3);
            while($row = $rsSHM->FetchNextObject($toupper=false)){
                $dataSHM[] = (array)$row;
            }

            $sql2 = "select count(*) from inv_rd_harga_tmp where kode_lokasi='$kode_lokasi' " ;
            $rs = execute($sql2);

            $exec = array();
            
            $del = "delete from inv_rd_harga where periode='$periode' ";
            array_push($exec,$del);

            foreach ($dataSHM as $row){														    
                for($j=1;$j < $jmlHari;$j++){	
					$k = "-" . ($j < 10 ? "0":"" ) . $j;							
					$tgl = substr($periode,0,4)."-".substr($periode,4,2).$k;
                    $harga = floatval($row["tgl$j"]);

					$sqlx = "insert into inv_rd_harga (periode,tanggal,kode_rd,h_wajar) values  ('".$periode."','".$tgl."','".$row['kode_rd']."',".$harga.") ";	
                    array_push($exec,$sqlx);			
				}
            }

            $del2 = "delete from inv_rd_harga_tmp where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del2);
            $stor = "exec sp_gen_rd_kkp '".substr($periode,0,4)."-".substr($periode,4,2)."-01'";
            array_push($exec,$stor);
            $insert = executeArray($exec);
            // $insert = true;
            if($insert){
                $tmp="sukses";
                $sts=true;
                
            }else{
                $tmp="gagal";
                $sts=false;
            }
            $response["message"] =  $tmp;
            $response["status"] = $sts; 
            // $response["sql"]=$exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }
  
    

?>