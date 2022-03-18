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

    function getTemplateSawal() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){       
            $root = realpath($_SERVER["DOCUMENT_ROOT"])."/";
            require_once($root."web/vendor/PHPExcel.php");
            require_once($root."web/vendor/PHPExcel/IOFactory.php");
            // object excel
            $excel = new PHPExcel();

            // Set document properties
            $excel->getProperties()->setCreator("PT SAI")
            ->setLastModifiedBy("USER")
            ->setTitle("Data Sawal")
            ->setSubject("Data Sawal")
            ->setDescription("Data Sawal")
            ->setKeywords("Data Sawal")
            ->setCategory("Report");
            
            $excel->setActiveSheetIndex(0);
            $sheet = $excel->getActiveSheet()->setTitle('Saldo Awal');

            $column = array("kode_akun","debet","kredit","periode");
            $col = 0;
            $row = 1;
            foreach ($column as $key => $val){
                $sheet->setCellValueByColumnAndRow($col, $row, $val);	
                $col++;
            }

            $namafile = MD5(date("r"));
            $file = "upload_sawal_$namafile.xls";
            header('Content-Type: application/vnd.ms-excel'); 
            header('Content-Disposition: attachment;filename="'.$file.'"'); 
            header('Cache-Control: max-age=0'); 
            $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel5'); 
            $objWriter->save('php://output');
        } else{
            return "";
        }     
    }

    function getTemplateJurnal() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){       
            $root = realpath($_SERVER["DOCUMENT_ROOT"])."/";
            require_once($root."web/vendor/PHPExcel.php");
            require_once($root."web/vendor/PHPExcel/IOFactory.php");
            // object excel
            $excel = new PHPExcel();

            // Set document properties
            $excel->getProperties()->setCreator("PT SAI")
            ->setLastModifiedBy("USER")
            ->setTitle("Data Jurnal")
            ->setSubject("Data Jurnal")
            ->setDescription("Data Jurnal")
            ->setKeywords("Data Jurnal")
            ->setCategory("Report");
            
            $excel->setActiveSheetIndex(0);
            $sheet = $excel->getActiveSheet()->setTitle('Jurnal');

            $column = array("tanggal","no_bukti","keterangan","akun_debet","akun_kredit","nilai","periode");
            $col = 0;
            $row = 1;
            foreach ($column as $key => $val){
                $sheet->setCellValueByColumnAndRow($col, $row, $val);	
                $col++;
            }

            $namafile = MD5(date("r"));
            $file = "upload_jurnal_$namafile.xls";
            header('Content-Type: application/vnd.ms-excel'); 
            header('Content-Disposition: attachment;filename="'.$file.'"'); 
            header('Cache-Control: max-age=0'); 
            $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel5'); 
            $objWriter->save('php://output');
        } else{
            return "";
        }     
    }

    function simpanJurnalTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
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

                $del = "delete from xjan where kode_lokasi='$kode_lokasi' and periode='$periode' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $tanggal     = $data->val($i, 1);
                    $no_bukti   = $data->val($i, 2);
                    $ket   = $data->val($i, 3);
                    $akd   = $data->val($i, 4);
                    $akc  = $data->val($i, 5);
                    $nil   = floatval($data->val($i, 6));
                    $periode   = $data->val($i, 7);
                    
                    $sql[$i] = "INSERT into  xjan values('$tanggal','$no_bukti','$ket','$akd','$akc',$nil,'$periode','$kode_lokasi')";
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


    function getJurnal(){
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
            $query .= "select tanggal,no_bukti,keterangan,akun_debet,akun_kredit,nilai,periode from xjan where kode_lokasi= '".$kode_lokasi."' and periode='$periode' ";
            
            $column_array = array( 'tanggal','no_bukti','keterangan','akun_debet','akun_kredit','nilai','periode');
            $order_column = 'ORDER BY tanggal '.$data['order'][0]['dir'];
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
                $sub_array[] = $row->tanggal;
                $sub_array[] = $row->no_bukti;
                $sub_array[] = $row->keterangan;
                $sub_array[] = $row->akun_debet;
                $sub_array[] = $row->akun_kredit;
                $sub_array[] = $row->nilai;
                $sub_array[] = $row->periode;
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

    
    function simpanJurnal() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            $cek = $data['cek'];
            
            $sql="select no_bukti,tanggal,keterangan,akun_debet,akun_kredit,nilai,periode from xjan where periode='$periode' and kode_lokasi='$kode_lokasi' ";
            $rs = execute($sql);

            
            $exec = array();
            if($cek){
                
                $del="delete from gldt where kode_lokasi='$kode_lokasi' and periode='$periode' ";
                array_push($exec,$del);
            
            }
            $i=$i+1;
            // $rs2 = execute($sql,$error);
            array_push($exec,$sql);

            $i=1;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $sql="insert into gldt(kode_lokasi, periode, no_bukti, tanggal, kode_akun, dc, keterangan, nilai, kode_pp, nu,modul,jenis) 
                    values ('$kode_lokasi','$row->periode','$row->no_bukti','$row->tanggal','$row->akun_debet','D','$row->keterangan',$row->nilai,'KUG',$i,'MI','MI');";
                $i=$i+1;
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
                $sql="insert into gldt(kode_lokasi, periode, no_bukti, tanggal, kode_akun, dc, keterangan, nilai, kode_pp, nu,modul,jenis) 
                    values ('$kode_lokasi','$row->periode','$row->no_bukti','$row->tanggal','$row->akun_kredit','C','$row->keterangan',$row->nilai,'KUG',$i,'MI','MI');";
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
                $i=$i+1;
            }
            $del2="delete from xjan where kode_lokasi='$kode_lokasi' and periode='$periode' ";
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

    //SAWAL
    function simpanSawalTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
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

                $del = "delete from xsawal2 where kode_lokasi='$kode_lokasi' and periode='$periode' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_akun     = $data->val($i, 1);
                    $debet   = floatval($data->val($i, 2));
                    $kredit   = floatval($data->val($i, 3));
                    $periode   = $data->val($i, 4);
                    
                    $sql[$i] = "INSERT into xsawal2 values('$kode_akun','$kode_lokasi',$debet,$kredit,'$periode')";
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
            //$response["data"]= $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        echo json_encode($response);
        
    }


    function getSawal(){
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
            $query .= "select kode_akun, debet, kredit, periode from xsawal2 where kode_lokasi= '".$kode_lokasi."' and periode='$periode' ";
            
            $column_array = array( 'kode_akun','debet','kredit','periode');
            $order_column = 'ORDER BY kode_akun '.$data['order'][0]['dir'];
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
                $query .= ' ORDER BY kode_akun ';
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
                $sub_array[] = $row->kode_akun;
                $sub_array[] = $row->debet;
                $sub_array[] = $row->kredit;
                $sub_array[] = $row->periode;
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

    
    function simpanSawal() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            
            $sql="select kode_lokasi,kode_akun,debet,kredit,periode from xsawal2 where periode='$periode' and kode_lokasi='$kode_lokasi' ";
            $rs = execute($sql);
            
            $exec = array();
            $del="delete from glma where kode_lokasi='$kode_lokasi' and periode='$periode' ";
            array_push($exec,$del);

            $i=1;
            $so_awal = 0;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                if($row->debet != 0){
                    $so_awal = floatval($row->debet);
                }else{
                    $so_awal = floatval($row->kredit) * -1;
                }
                $sql="insert into glma(kode_akun, kode_lokasi, periode, so_akhir,tgl_input) 
                    values ('$row->kode_akun','$row->kode_lokasi','$row->periode',$so_awal,getdate());";
                $i=$i+1;
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
            }
            $del2="delete from xsawal2 where kode_lokasi='$kode_lokasi' and periode='$periode' ";
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

 
	//Akun
    function simpanAkunTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $data['kode_lokasi'];
            //$periode = $data['periode'];
            
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

                $del = "delete from xmasakun where kode_lokasi='$kode_lokasi' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_akun=$data->val($i, 1);
					$lokasi=$data->val($i, 2);
					$nama=$data->val($i, 3);
					$modul=$data->val($i, 4);
					$jenis=$data->val($i, 5);
					$kode_curr=$data->val($i, 6);
					$block=$data->val($i, 7);
                    $status_gar=$data->val($i, 8);
                    $normal=$data->val($i, 9);
					
                    $sql[$i] = "INSERT into xmasakun values('$kode_akun','$lokasi','$nama','$modul','$jenis','$kode_curr','$block','$status_gar','$normal')";
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
            //$response["data"]= $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        echo json_encode($response);
        
    }
    
	function getAkun(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kode_akun, nama,kode_lokasi,modul,jenis,kode_curr,block,status_gar,normal from xmasakun where kode_lokasi= '".$kode_lokasi."' ";
            
            $column_array = array( 'kode_akun','kode_lokasi','nama','modul','jenis','kode_curr','block','status_gar','normal');
            $order_column = 'ORDER BY kode_akun '.$data['order'][0]['dir'];
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
                $query .= ' ORDER BY kode_akun ';
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
                $sub_array[] = $row->kode_akun;
                $sub_array[] = $row->kode_lokasi;
                $sub_array[] = $row->nama;
                $sub_array[] = $row->modul;
				$sub_array[] = $row->jenis;
				$sub_array[] = $row->kode_curr;
                $sub_array[] = $row->block;
				$sub_array[] = $row->status_gar;
				 $sub_array[] = $row->normal; 
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

	function simpanAkun() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
           
            $sql="select kode_akun, nama,kode_lokasi,modul,jenis,kode_curr,block,status_gar,normal from xmasakun where kode_lokasi='$kode_lokasi' ";
            $rs = execute($sql);
            
            $exec = array();
            $del="delete from masakun where kode_lokasi='$kode_lokasi'  ";
            array_push($exec,$del);

            $i=1;
          
            while ($row = $rs->FetchNextObject($toupper=false))
            {
               
                $sql="insert into masakun(kode_akun, nama,kode_lokasi,modul,jenis,kode_curr,block,status_gar,normal) 
                    values ('$row->kode_akun','$row->nama','$row->kode_lokasi','$row->modul','$row->jenis','$row->kode_curr','$row->block','$row->status_gar','$row->normal');";
                $i=$i+1;
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
            }
            $del2="delete from xmasakun where kode_lokasi='$kode_lokasi'  ";
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
            //$response["exec"] = $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }
	
	//Akun relasi
    function simpanAkunRelasiTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $data['kode_lokasi'];
            //$periode = $data['periode'];
            
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

                $del = "delete from xrelakun where kode_lokasi='$kode_lokasi' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_neraca=$data->val($i, 1);
					$kode_fs=$data->val($i, 2);
					$kode_akun=$data->val($i, 3);
					$lokasi=$data->val($i, 4);
					
                    $sql[$i] = "INSERT into xrelakun values('$kode_neraca','$kode_fs','$kode_akun','$lokasi')";
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
            //$response["data"]= $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        echo json_encode($response);
        
    }
	
	function getAkunRelasi(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select kode_neraca,kode_fs,kode_akun,kode_lokasi from xrelakun where kode_lokasi= '".$kode_lokasi."' ";
            
            $column_array = array( 'kode_neraca','kode_fs','kode_akun','kode_lokasi');
            $order_column = 'ORDER BY kode_akun '.$data['order'][0]['dir'];
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
                $query .= ' ORDER BY kode_akun ';
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
                $sub_array[] = $row->kode_neraca;
                $sub_array[] = $row->kode_fs;
                $sub_array[] = $row->kode_akun;
                $sub_array[] = $row->kode_lokasi;
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
	
	function simpanAkunRelasi() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
           
            $sql="select kode_neraca,kode_fs,kode_akun,kode_lokasi from xrelakun where kode_lokasi='$kode_lokasi' ";
            $rs = execute($sql);
            
            $exec = array();
            $del="delete from xrelakun where kode_lokasi='$kode_lokasi'  ";
            array_push($exec,$del);

            $i=1;
          
            while ($row = $rs->FetchNextObject($toupper=false))
            {
               
                $sql="insert into relakun(kode_neraca,kode_fs,kode_akun,kode_lokasi) 
                    values ('$row->kode_neraca','$row->kode_fs','$row->kode_akun','$row->kode_lokasi');";
                $i=$i+1;
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
            }
            $del2="delete from xrelakun where kode_lokasi='$kode_lokasi'  ";
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
	
	function simpanJurnal2Tmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
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

                $del = "delete from tmp_jurnal where kode_lokasi='$kode_lokasi' and periode='$periode' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
					$no_bukti   = $data->val($i, 1);
                    $tanggal     = $data->val($i, 2);
                    $no_dokumen   = $data->val($i, 3);
                    $keterangan   = $data->val($i, 4);
                    $kode_akun   = $data->val($i, 5);
					$dc   = $data->val($i, 6);
                    $nilai  = $data->val($i, 7);
                    //$nil   = floatval($data->val($i, 6));
                    
                    $sql[$i] = "INSERT into  tmp_jurnal(no_bukti,tanggal,no_dokumen,keterangan,kode_akun,dc,nilai,periode,kode_lokasi) values('$no_bukti','$tanggal','$no_dokumen','$keterangan','$kode_akun','$dc',$nilai,'$periode','$kode_lokasi')";
                    // $rs[$i]=execute($sql[$i]);
                    
                    array_push($exec,$sql[$i]);
                        

                }
                
                // hapus kembali file .xls yang di upload tadi
                unlink($target_dir.$_FILES['file_dok']['name']);
                $insert = true;
            }else{
                $insert = false;
            }

            $response['data'] = array();
            if(count($err_ins)>0){
                $tmp = "error data tidak valid";
                $response["error_ins"] = $err_ins;
                $sts = false;
            }else{
                $insert = executeArray($exec,$err);
                // $insert = true;
                $tmp=array();
                $kode = array();
                if ($err == null)
                {	
                    $tmp="sukses validasi, filepath:".$filepath." error_upload:".$error_upload;
                    $sts=true;
                    $query = "select no_bukti,tanggal,no_dokumen,keterangan,kode_akun,dc,nilai from tmp_jurnal
                    where periode= '".$periode."' and kode_lokasi='$kode_lokasi' ";
                    $response['data'] = dbResultArray($query);
                }else{
                    $tmp="gagal validasi".$err.$error_upload;
                    $sts=false;
                }	
            }
            
            $response["message"] =$tmp;
            $response["status"] = $sts;
            $response["exec"]= $exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        echo json_encode($response);
        
    }

	function getJurnal2(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $periode = $_GET['periode'];
            
            $data = $_GET;
            $query = '';
            $output = array();
            
            $query .= "select no_bukti,tanggal,no_dokumen,keterangan,kode_akun,dc,nilai,periode,kode_lokasi from tmp_jurnal where kode_lokasi= '".$kode_lokasi."' and periode='$periode' ";
            
            $column_array = array( 'no_bukti','tanggal','no_dokumen','keterangan','dc','nilai');
            $order_column = 'ORDER BY tanggal '.$data['order'][0]['dir'];
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
				$sub_array[] = $row->no_bukti;
                $sub_array[] = $row->tanggal;
                $sub_array[] = $row->no_dokumen;
                $sub_array[] = $row->keterangan;
                $sub_array[] = $row->kode_akun;
				$sub_array[] = $row->dc;
                $sub_array[] = $row->nilai;
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
	
	function simpanJurnal2() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            $cek = $data['cek'];
            
            $sql="select no_bukti,tanggal,no_dokumen,keterangan,dc,nilai,periode,kode_akun,kode_lokasi from tmp_jurnal where periode='$periode' and kode_lokasi='$kode_lokasi' ";
            $rs = execute($sql);

            
            $exec = array();
            if($cek){
                
                $del="delete from gldt where kode_lokasi='$kode_lokasi' and periode='$periode' ";
                array_push($exec,$del);
            
            }
            $i=$i+1;
            // $rs2 = execute($sql,$error);
            array_push($exec,$sql);

            $i=1;
            while ($row = $rs->FetchNextObject($toupper=false))
            {
                $sql="insert into gldt(kode_lokasi, periode, no_bukti, tanggal, kode_akun, dc, keterangan, nilai, kode_pp, nu,modul,jenis,no_dokumen) 
                    values ('$kode_lokasi','$row->periode','$row->no_bukti','$row->tanggal','$row->kode_akun','$row->dc','$row->keterangan',$row->nilai,'KUG',$i,'MI','MI','$row->no_dokumen');";
               
                // $rs2 = execute($sql,$error);
                array_push($exec,$sql);
             
                $i=$i+1;
            }
            $del2="delete from xjan where kode_lokasi='$kode_lokasi' and periode='$periode' ";
            array_push($exec,$del2);

            $insert = executeArray($exec,$err);
            // $insert = true;
            $response['data'] = array();
            if($err== null){
                $tmp="sukses(save)";
                $sts=true;
                $query = "select no_bukti,tanggal,no_dokumen,keterangan,kode_akun,dc,nilai from tmp_jurnal
                where periode= '".$periode."' and kode_lokasi='$kode_lokasi' ";
                $response['data'] = dbResultArray($query);
            }else{
                $tmp="gagal(save)".$err;
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
	
?>