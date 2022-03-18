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

    function simpanKelAssetTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $data['kode_lokasi'];
            $periode = $data['periode'];
            
            // if(!empty($_FILES["file_dok"]["name"])){

                $path_s = $_SERVER['DOCUMENT_ROOT'];
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

                $del = "delete from amu_xjan_kel_asset where kode_lokasi='$kode_lokasi'";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kd_klp     = $data->val($i, 1);
                    $nama_klp   = $data->val($i, 2);
                    
                    $sql[$i] = "INSERT into  amu_xjan_kel_asset values('$kd_klp','$nama_klp','$kode_lokasi')";
                    // $rs[$i]=execute($sql[$i]);
                    
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
                $insert = executeArray($exec);
                // $insert = true;
                $tmp=array();
                $kode = array();
                if ($insert)
                {	
                    $tmp="sukses validasi, filepath:".$filepath." error_upload:".$error_upload;
                    $sts=true;
                }else{
                    $tmp="gagal validasi".$error_upload;
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


    function getKelAsset(){
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
            $query .= "select kd_klp,nama_klp from amu_xjan_kel_asset where kode_lokasi= '".$kode_lokasi."'";
            
            $column_array = array( 'kd_klp','nama_klp');
            $order_column = 'ORDER BY kd_klp '.$data['order'][0]['dir'];
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
                $query .= ' ORDER BY tanggal ';
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
                $sub_array[] = $row->kd_klp;
                $sub_array[] = $row->nama_klp;
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

    
    function simpanKelAsset() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $data["kode_lokasi"];
            //$periode = $data["periode"];
            $cek = $data['cek'];
            
            $sql="select kd_klp,nama_klp from amu_xjan_kel_asset where kode_lokasi= '".$kode_lokasi."' ";
            $rs = execute($sql);

            
            $exec = array();
            if($cek){
                
                $del="delete from amu_klp_brg where kode_lokasi='$kode_lokasi' ";
                array_push($exec,$del);
            
            }

            $i=1;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $sql="insert into amu_klp_brg(kode_klp, nama_klp, kode_lokasi) 
                    values ('$row->kd_klp','$row->nama_klp','$kode_lokasi');";
                $i=$i+1;
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
            }
            $del2="delete from amu_xjan_kel_asset where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del2);

            $insert = executeArray($exec);
            // $insert = true;
            if($insert){
                $tmp="sukses(save)";
                $sts=true;
                
            }else{
                $tmp="gagal(save)";
                $sts=false;
            }
            $response["message"] =  $tmp;
            $response["status"] = $sts; 
            $response["exec"] = $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAssetGer(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $kode_pp=$_GET['kode_pp'];
        
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kd_asset,no_seri,merk,tipe,warna,satuan,id_gedung,no_ruang,kode_klp from amu_xjan_asset_ger where kode_lokasi= '".$kode_lokasi."'";
            
            $column_array = array( 'kd_asset','no_seri','merk','tipe','warna','satuan','id_gedung','no_ruang','kode_klp');
            $order_column = 'ORDER BY kode_klp '.$data['order'][0]['dir'];
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
                $query .= ' ORDER BY tanggal ';
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
                $sub_array[] = $row->kd_asset;
                $sub_array[] = $row->no_seri;
                $sub_array[] = $row->merk;
                $sub_array[] = $row->tipe;
                $sub_array[] = $row->warna;
                $sub_array[] = $row->satuan;
                $sub_array[] = $row->id_gedung;
                $sub_array[] = $row->no_ruang;
                $sub_array[] = $row->kode_klp;
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

    function simpanAssetGerTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $data['kode_lokasi'];
            
            // if(!empty($_FILES["file_dok"]["name"])){

                $path_s = $_SERVER['DOCUMENT_ROOT'];
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

                $del = "delete from amu_xjan_asset_ger where kode_lokasi='$kode_lokasi'";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $no_bukti   = $data->val($i, 1);
                    $no_seri    = $data->val($i, 2);
                    $merk       = $data->val($i, 3);
                    $tipe       = $data->val($i, 4);
                    $warna      = $data->val($i, 5);
                    $satuan     = $data->val($i, 6);
                    $id_gedung  = $data->val($i, 7);
                    $no_ruang   = $data->val($i, 8);
                    $kode_klp   = $data->val($i, 9);
                    
                    $sql[$i] = "INSERT into  amu_xjan_asset_ger values('$kd_asset','$no_seri','$merk','$tipe','$warna','$satuan','$id_gedung','$no_ruang','$kode_klp','$kode_lokasi')";
                    // $rs[$i]=execute($sql[$i]);
                    
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
                $insert = executeArray($exec);
                // $insert = true;
                $tmp=array();
                $kode = array();
                if ($insert)
                {	
                    $tmp="sukses validasi, filepath:".$filepath." error_upload:".$error_upload;
                    $sts=true;
                }else{
                    $tmp="gagal validasi".$error_upload;
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

    
    function simpanAssetGer() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $data["kode_lokasi"];
            //$periode = $data["periode"];
            $cek = $data['cek'];
            
            $sql="select kd_asset,no_seri,merk,tipe,warna,satuan,id_gedung,no_ruang,kode_klp from amu_xjan_asset_ger where kode_lokasi= '".$kode_lokasi."' ";
            $rs = execute($sql);

            
            $exec = array();
            if($cek){
                
                $del="delete from amu_asset_bergerak where kode_lokasi='$kode_lokasi' ";
                array_push($exec,$del);
            
            }

            $i=1;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $sql="insert into amu_asset_bergerak(kd_asset, no_seri, merk, tipe, warna, satuan, id_gedung, no_ruang, kode_klp,kode_lokasi) 
                    values ('$row->kd_asset','$row->no_seri','$row->merk','$row->tipe','$row->warna','$row->satuan','$row->id_gedung','$row->no_ruang','$row->kode_klp','$kode_lokasi');";
                $i=$i+1;
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
            }
            $del2="delete from amu_xjan_asset_ger where kode_lokasi='$kode_lokasi' ";
            array_push($exec,$del2);

            $insert = executeArray($exec);
            // $insert = true;
            if($insert){
                $tmp="sukses(save)";
                $sts=true;
                
            }else{
                $tmp="gagal(save)";
                $sts=false;
            }
            $response["message"] =  $tmp;
            $response["status"] = $sts; 
            $response["exec"] = $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBrg(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $kode_pp=$_GET['kode_pp'];
        
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kode_klp,nama_brg,spesifikasi,satuan,jumlah,harga,tanggal,sumber,kode_ruangan from amu_xjan_brg where kode_lokasi= '".$kode_lokasi."' and kode_pp='$kode_pp' ";
            
            $column_array = array( 'kode_klp','nama_brg','spesifikasi','satuan','jumlah','harga','tanggal','sumber','kode_ruangan');
            $order_column = 'ORDER BY kode_klp '.$data['order'][0]['dir'];
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
                $query .= ' ORDER BY tanggal ';
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
                $sub_array[] = $row->kode_klp;
                $sub_array[] = $row->nama_brg;
                $sub_array[] = $row->spesifikasi;
                $sub_array[] = $row->satuan;
                $sub_array[] = $row->jumlah;
                $sub_array[] = $row->harga;
                $sub_array[] = $row->tanggal;
                $sub_array[] = $row->sumber;
				$sub_array[] = $row->kode_ruangan;
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

    function simpanBrgTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $data['kode_lokasi'];
            $kode_pp = $data["kode_pp"];
            // if(!empty($_FILES["file_dok"]["name"])){

                $path_s = $_SERVER['DOCUMENT_ROOT'];
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

                $del = "delete from amu_xjan_brg where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    //   menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_klp   = $data->val($i, 1);
                    $nama       = $data->val($i, 2);
                    $spes       = $data->val($i, 3);
                    $satuan     = $data->val($i, 4);
                    $jumlah     = $data->val($i, 5);
                    $harga      = $data->val($i, 6);
                    $tanggal    = $data->val($i, 7);
                    $sumber     = $data->val($i, 8);
                    $kode_ruangan     = $data->val($i, 9);
                    $sql[$i] = "INSERT into amu_xjan_brg values('$kode_klp','$nama','$spes','$satuan','$harga','$tanggal','$sumber','$kode_lokasi','$kode_pp','$jumlah','$kode_ruangan')";
                    // $rs[$i]=execute($sql[$i]);
                    
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
                $insert = executeArray($exec);
                // $insert = true;
                $tmp=array();
                $kode = array();
                if ($insert)
                {	
                    $tmp="sukses validasi, filepath:".$filepath." error_upload:".$error_upload;
                    $sts=true;
                }else{
                    $tmp="gagal validasi".$error_upload;
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

    
    function simpanBrgXX() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $kode_pp = $data["kode_pp"];
            $cek = $data['cek'];
            
            $sql="select kode_klp,nama_brg,spesifikasi,satuan,jumlah,harga,tanggal,sumber,kode_lokasi,kode_pp from amu_xjan_brg where kode_lokasi= '".$kode_lokasi."'";
            $rs = execute($sql);

            
            $exec = array();
            $exec2 = array();
            if($cek){
                
                $del="delete from amu_asset_bergerak where kode_lokasi='$kode_lokasi'";
                array_push($exec,$del);
            
            }

            $tahun = date('y');
            $bulan = date('m');
            $periode = "$tahun$bulan";
            $FormatNoBukti = "$kode_lokasi-IF$periode";
            $FormatKodeBrg = "$kode_lokasi-BG$periode";
            $i=1;
            $k=0;
			
            while ($row = $rs->FetchNextObject($toupper=false))
            {    
				
                $CekNoBarang = "select max(kd_asset) as kd_asset from amu_asset_bergerak where kode_lokasi='".$kode_lokasi."'";
                $cekNBrg = execute($CekNoBarang);
                while($row3 = $cekNBrg->FetchNextObject($toupper=false))
                {
                    $noBarang = $row3->kd_asset;
                    if($noBarang != ""){
                        $nomorBarang = substr($noBarang,-4);
                        $nomorBarangF = (int)$nomorBarang;
                    }else{
                        $nomorBarang = "0000";
                        $nomorBarangF = (int)$nomorBarang;
                    }
                }
				
                $NoAngkaBrg = $nomorBarangF + $k + 1;
                    if(strlen($NoAngkaBrg) == 1) {
                        $noBarangFix = "000".$NoAngkaBrg."";
                    } elseif (strlen($NoAngkaBrg) == 2) {
                        $noBarangFix = "00".$NoAngkaBrg."";
                    } elseif (strlen($NoAngkaBrg) == 3) {
                        $noBarangFix = "0".$NoAngkaBrg."";
                    } elseif (strlen($NoAngkaBrg) == 4) {
                        $noBarangFix = $NoAngkaBrg;
                    }
                    $FormatNoBarangFix = "$FormatKodeBrg.$noBarangFix";
                    $jumlah = $row->jumlah;
                    for($j=0;$j<$jumlah;$j++){
                    $CekNoBukti = "select max(no_bukti) as no_bukti from amu_asset_bergerak where kode_lokasi='".$kode_lokasi."'";
                    $cekNB = execute($CekNoBukti);
                    while($row2 = $cekNB->FetchNextObject($toupper=false))
                    {
                        $noBukti = $row2->no_bukti;               
                        if($noBukti != "" || $noBukti != null){
                            $nomorBukti  = substr($row2->no_bukti,-4);
                            $nomorBuktiF = (int)$nomorBukti;
                        }else{
                            $nomorBukti  = "0000";
                            $nomorBuktiF = (int)$nomorBukti;
                        }
                        $NoAngka = ($nomorBuktiF + $j) + $i;
                        $AngkaString = (string) $NoAngka;
                        if(strlen($NoAngka) == 1) {
                            $noBuktiFix = '000'.$AngkaString;
                        } elseif (strlen($NoAngka) == 2) {
                            $noBuktiFix = '00'.$AngkaString;
                        } elseif (strlen($NoAngka) == 3) {
                            $noBuktiFix = '0'.$AngkaString;
                        } elseif (strlen($NoAngka) == 4) {
                            $noBuktiFix = $AngkaString;
                        }
                        $FormatNoBuktiFix = $FormatNoBukti.'.'.$noBuktiFix;   
                    }
                    $sql_insert[$j] = "INSERT into amu_asset_bergerak values('$FormatNoBuktiFix','-','-','-','-','-','$row->satuan','$row->spesifikasi','-','-','$row->kode_klp','$row->tanggal','$kode_lokasi','$kode_pp','$row->harga','$FormatNoBarangFix','$row->sumber','$row->nama_brg')";
                    array_push($exec2,$sql_insert[$j]);
                    //$insert2 = executeArray($exec2);
					$no=$no+1;
                }
                // $sql="insert into amu_asset_bergerak(kd_asset, no_seri, merk, tipe, warna, satuan, id_gedung, no_ruang, kode_klp,kode_lokasi) 
                //     values ('$row->kd_asset','$row->no_seri','$row->merk','$row->tipe','$row->warna','$row->satuan','$row->id_gedung','$row->no_ruang','$row->kode_klp','$kode_lokasi');";
                $i=$i+1;
                $k=$k+1;
                // $rs2 = execute($sql,$error);
                
            }
            $del2="delete from amu_xjan_brg where kode_lokasi='$kode_lokasi'";
            array_push($exec,$del2);

            $insert = executeArray($exec);
            // $insert = true;
            if($insert || $insert2){
                $tmp="sukses(save)";
                $sts=true;
                
            }else{
                $tmp="gagal(save)";
                $sts=false;
            }
             $response["message"] =  $tmp;
            $response["status"] = $sts; 
            $response["exec"] = $exec;
            $response["exec2"] = $exec2;
			
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }
	
	function simpanBrg() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $kode_pp = $data["kode_pp"];
            $cek = $data['cek'];
            
            $sql="select kode_klp,nama_brg,spesifikasi,satuan,jumlah,harga,tanggal,sumber,kode_lokasi,kode_pp,kode_ruangan,year(tanggal) as tahun,month(tanggal) as bulan from amu_xjan_brg where kode_lokasi= '".$kode_lokasi."' and kode_pp='$kode_pp' ";
            $rs = execute($sql);
			
			$exec2 = array();
			$sql2 = array();
			
			
			$no=1;
            
            if($cek){
                
                $sql3="delete from amu_asset_bergerak where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
                array_push($exec2,$sql3);
            
            }
			
			while ($row = $rs->FetchNextObject($toupper=false))
            {    
				$periode=substr($row->tahun,2,2).sprintf("%02s",$row->bulan);
				$jumlah=$row->jumlah;
				for ($x = 1; $x <= $jumlah; $x++) {
					$no=$no+1;
					$FormatNoBuktiFix="$kode_lokasi-IF$periode.".sprintf("%04s",$no);
					$FormatNoBarangFix="$kode_lokasi-BG$periode.".sprintf("%04s",$no);
					$sql2[$no] = "INSERT into amu_asset_bergerak (no_bukti,barcode,no_seri,merk,tipe,warna,satuan,spesifikasi,id_gedung,kode_klp,tanggal_perolehan,kode_lokasi,kode_pp,nilai_perolehan,kd_asset,sumber_dana,nama_inv,no_ruang) values('$FormatNoBuktiFix','-','-','-','-','-','$row->satuan','$row->spesifikasi','-','$row->kode_klp','$row->tanggal','$kode_lokasi','$kode_pp',$row->harga,'$FormatNoBarangFix','$row->sumber','$row->nama_brg','$row->kode_ruangan')";
					array_push($exec2,$sql2[$no]);
					
					
				}
				
                
            }

            $sql4="delete from amu_xjan_brg where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp'";
			array_push($exec2,$sql4);
			
			
			$rs2 = executeArray($exec2);
			
            if($rs2){
                $tmp="sukses(save)";
                $sts=true;
                
            }else{
                $tmp="gagal(save)";
                $sts=false;
            }
			$response["message"] =$tmp;
            $response["status"] = $sts;
            $response["data"]= $exec2;
			
           
            // $response["no_barang"] = $CekNoBarang;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }
	
	

?>