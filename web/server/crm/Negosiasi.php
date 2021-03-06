<?php    

    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        case 'POST':
            // Insert Product
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }else{
                insertNegosiasi();
            }
        break;
        case 'DELETE':
        // Delete Product
            deleteNegosiasi();
        break;
        default:
            // Invalid Request Method
            header("HTTP/1.0 405 Method Not Allowed");
        break;
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function generateKode($tabel, $kolom_acuan, $prefix, $str_format){
        $query = execute("select right(max($kolom_acuan), ".strlen($str_format).")+1 as id from $tabel where $kolom_acuan like '$prefix%'");
        $kode = $query->fields[0];
        $id = $prefix.str_pad($kode, strlen($str_format), $str_format, STR_PAD_LEFT);
        return $id;
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

    function getDatatable(){
        session_start();
        getKoneksi();
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){
            $data = $_POST;
            $query = '';
            $output = array();
            $jenis = $data['jenis'];
            $kode_lokasi = $_SESSION['lokasi'];
            if($jenis == null OR $jenis == 'new'){
                $query .= "select a.no_bukti, convert(varchar(10),a.tanggal,105) as tanggal, a.keterangan, b.nama as nama_cust, c.nama as nama_produk,k.nama as nama_karyawan, a.nilai,a.inves,a.margin 
                from sai_proses01 a
                inner join sai_cust b
                on b.kode_cust=a.kode_cust
                inner join sai_produk c 
                on c.kode_produk=a.kode_produk 
                inner join sai_karyawan k on a.nik=k.nik
                where progress='SA01' and status='2' and a.kode_lokasi = '".$kode_lokasi."'";
                $jenis = 'new';
                $column_array = array('a.no_bukti','convert(varchar(10),a.tanggal,105)','a.keterangan','a.nilai', 'b.nama','c.nama','k.nama','a.inves','a.margin');
                $order_column = 'order by a.no_bukti '.$data['order'][0]['dir'];
                $default_order = 'order by a.no_bukti ';
            }else if($jenis == 'keep'){
                $query .= " select b.no_bukti, convert(varchar(10),b.tanggal,105) as tanggal,b.no_ref, b.keterangan, c.nama as nama_cust, d.nama as nama_produk, k.nama as nama_karyawan,b.nilai,b.inves,b.margin 
                from sai_proses01 a
                inner join sai_proses02 b on a.no_bukti=b.no_ref and a.kode_lokasi=b.kode_lokasi
                inner join sai_cust c on a.kode_cust=c.kode_cust
                inner join sai_produk d on a.kode_produk=d.kode_produk 
                inner join sai_karyawan k on b.nik=k.nik
                where a.progress='SA02' and b.status='0' and b.flag_keep !='0' and a.kode_lokasi = '".$kode_lokasi."'";
                $jenis = 'keep';
                $column_array = array('b.no_bukti','b.no_ref','convert(varchar(10),b.tanggal,105)','b.keterangan','b.nilai', 'c.nama','d.nama','k.nama','b.inves','b.margin');
                $order_column = 'order by b.no_bukti '.$data['order'][0]['dir'];
                $default_order = 'order by b.no_bukti ';
            }else if($jenis == 'finish'){
                $query .= " select b.no_bukti, convert(varchar(10),b.tanggal,105) as tanggal,b.no_ref, b.keterangan, c.nama as nama_cust, d.nama as nama_produk,k.nama as nama_karyawan, b.nilai,b.inves,b.margin 
                from sai_proses01 a
                inner join sai_proses02 b on a.no_bukti=b.no_ref and a.kode_lokasi=b.kode_lokasi
                inner join sai_cust c on a.kode_cust=c.kode_cust
                inner join sai_produk d on a.kode_produk=d.kode_produk 
                inner join sai_karyawan k on b.nik=k.nik
                where a.progress='SA02' and b.status='2' and a.kode_lokasi = '".$kode_lokasi."'";
                $jenis = 'finish';
                $column_array = array('b.no_bukti','b.no_ref','convert(varchar(10),b.tanggal,105)','b.keterangan','b.nilai', 'c.nama','d.nama','k.nama','b.inves','b.nilai');
                $order_column = 'order by b.no_bukti '.$data['order'][0]['dir'];
                $default_order = 'order by b.no_bukti ';
            }
            
            $column_string = join(',', $column_array);
            
            $res = execute($query);
            $jml_baris = $res->RecordCount();
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
                $query .= ' order by '.$column_array[$data['order'][0]['column']].' '.$data['order'][0]['dir'];
            }
            else
            {
                $query .= $default_order;
            }
            if($data["length"] != -1)
            {
                $query .= ' offset ' . $data['start'] . ' rows fetch next ' . $data['length'] . ' rows only ';
            }
            $statement = execute($query);
            $data = array();
            $filtered_rows = $statement->RecordCount();
            while($row = $statement->FetchNextObject($toupper=false))
            {
                $sub_array = array();
                $sub_array[] = $row->no_bukti;
                if($jenis != 'new'){
                    $sub_array[] = $row->no_ref;
                }
                $sub_array[] = $row->tanggal;
                $sub_array[] = $row->keterangan;
                $sub_array[] = $row->nama_cust;
                $sub_array[] = $row->nama_produk;
                $sub_array[] = $row->nama_karyawan;
                $sub_array[] = $row->inves;
                $sub_array[] = $row->margin;
                $sub_array[] = $row->nilai;
                $data[] = $sub_array;
            }
            $response = array(
                "draw"				=>	intval($data["draw"]),
                "recordsTotal"		=> 	$filtered_rows,
                "recordsFiltered"	=>	$jml_baris,
                "data"				=>	$data,
            );
        }else{
            $response["message"] = "Unauthorized Access, Login Required";
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getJenisDok(){
        session_start();
        getKoneksi();
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){
            $kode_lokasi = $_SESSION['lokasi'];  
            $response = array("message" => "", "rows" => 0, "status" => "" ); 				
            $sql = "select kode_dok,nama from sai_dok where kode_proses='SA02' and kode_lokasi='11' ";
            $rs = execute($sql);
            while($row = $rs->FetchNextObject($toupper))
            {
                $response['daftar'][] = (array)$row;
            }
            
            $response['status'] = true;
        }else{
            $response['error'] = "Unauthorized Access 1";
            
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function insertNegosiasi() {
        session_start();
        getKoneksi();
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){
            $data = $_POST;
            $kode_lokasi = qstr($_SESSION["lokasi"]);
            $exec_array=array();
            if($data["no_bukti"] == ""){
                $no_bukti = qstr(generateKode("sai_proses02", "no_bukti", "S02-", "0001"));
                $edit = false;
                if($data['status']=='0'){
                    $flag_keep='1';
                }else{
                    $flag_keep='';
                }
            }else{
                $no_bukti = qstr($data["no_bukti"]);
                $edit = true;
                if($data['status']=='0'){
                    $flag_keep="1";
                    $upd1 = "0";
                    $no_bukti = qstr(generateKode("sai_proses02", "no_bukti", "S02-", "0001"));
                    $update1 = "update sai_proses02 set flag_keep ='$upd1' where no_bukti='".$data['no_bukti']."' and kode_lokasi=$kode_lokasi ";
                    
                    array_push($exec_array,$update1);
                }else{
                    $flag_keep='';
                }
            }
            
            $error_upload = "";
            if(arrayKeyCheck(array('kode_dok'), $data) AND arrayKeyCheck(array('file'), $_FILES) AND !empty($_FILES['file']['tmp_name'])){
                $data['kode_dok'] = array_values(array_filter($data['kode_dok'], function($value) { return $value !== ''; }));
                $_FILES['file']['name'] = array_values(array_filter($_FILES['file']['name'], function($value) { return $value !== ''; }));
                $_FILES['file']['type'] = array_values(array_filter($_FILES['file']['type'], function($value) { return $value !== ''; }));
                $_FILES['file']['tmp_name'] = array_values(array_filter($_FILES['file']['tmp_name'], function($value) { return $value !== ''; }));
                $_FILES['file']['error'] = array_values(array_filter($_FILES['file']['error'], function($value) { return $value === 0; }));
                $_FILES['file']['size'] = array_values(array_filter($_FILES['file']['size'], function($value) { return $value > 0; }));
                $arr_nama = array();
                for($i=0; $i<count($data['kode_dok']); $i++){
                    $_FILES['userfile']['name']     = $_FILES['file']['name'][$i];
                    $_FILES['userfile']['type']     = $_FILES['file']['type'][$i];
                    $_FILES['userfile']['tmp_name'] = $_FILES['file']['tmp_name'][$i];
                    $_FILES['userfile']['error']    = $_FILES['file']['error'][$i];
                    $_FILES['userfile']['size']     = $_FILES['file']['size'][$i];
                    
                    if(empty($_FILES['file']['name'])){
                        
                        $status_upload=FALSE;
                        
                    }else{
                        $status_upload = TRUE;
                        $path_img = $_SERVER['DOCUMENT_ROOT'];
                        $target_dir = $path_img."web/upload/";
                        $uploadOk = 1;
                        $message="";
                        $error_upload="";
                        $target_file = $target_dir . basename($_FILES["userfile"]["name"]);
                        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
                        // generate nama gambar baru
                        $namaFileBaru = uniqid();
                        $namaFileBaru .= '.';
                        $namaFileBaru .= $imageFileType;
                        
                        $target_file = $target_dir . $namaFileBaru;
                        $arr_nama[$i] =  $namaFileBaru;
                        
                        // Check if file already exists
                        if (file_exists($target_file)) {
                            $error_upload .= "Sorry, file already exists.";
                            $uploadOk = 0;
                        }
                        // Check file size
                        if ($_FILES["userfile"]["size"] > 2000000) {
                            $error_upload .= "Sorry, your file is too large.";
                            $uploadOk = 0;
                        }
                        // // Allow certain file formats
                        // if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
                        // && $imageFileType != "gif" ) {
                            //     $error_upload= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                            //     $uploadOk = 0;
                            // }
                            // Check if $uploadOk is set to 0 by an error
                            if ($uploadOk == 0) {
                                $error_upload .= "Sorry, your file was not uploaded.";
                                // if everything is ok, try to upload file
                            } else {
                                if (move_uploaded_file($_FILES["userfile"]["tmp_name"], $target_file)) {
                                    $message = "The file $namaFileBaru has been uploaded.";
                                } else {
                                    $error_upload .= "Sorry, there was an error uploading your file.";
                                    if (is_dir($target_dir) && is_writable($target_dir)) {
                                        // do upload logic here
                                    } else if (!is_dir($target_dir)){
                                        $error_upload.= 'Upload directory does not exist.'.$target_dir;
                                    } else if (!is_writable($target_dir)){
                                        $error_upload.= 'Upload directory is not writable'.$target_dir;
                                    }
                                    
                                }
                            }
                        }
                    }
                }
                
                $status = $data["status"];
                $update1 = TRUE;
                $update2 = TRUE;
                $exs = TRUE;

                if($status == '1'){
                    $update1 = "update sai_proses01 set progress='SA01',status='0' where no_bukti='".$data['no_ref']."' and kode_lokasi =$kode_lokasi ";
                    array_push($exec_array,$update1);
                }
                
                if($edit){
                    $del1 = "DELETE FROM sai_proses02 where no_bukti=$no_bukti and kode_lokasi=$kode_lokasi "; 
                    array_push($exec_array,$del1);
                }
                
                $master = "insert into sai_proses02 (no_bukti,kode_lokasi,status,tanggal,keterangan,nik,nilai,flag_keep,no_ref,tgl_input,nik_input,inves,margin) values ($no_bukti,$kode_lokasi,'$status','".reverseDate($data["tanggal"])."','".$data["keterangan"]."','".$data["nik"]."',".joinNum($data["nilai"]).",'$flag_keep','".$data["no_ref"]."',getdate(),'".$_SESSION['userLog']."',".joinNum($data["inves"]).",".joinNum($data["margin"]).") ";
                array_push($exec_array,$master);
                
                if(arrayKeyCheck(array('kode_dok'), $data) AND arrayKeyCheck(array('file'), $_FILES) AND !empty($_FILES['file']['tmp_name'])){
                    $del2 = "DELETE FROM sai_proses_dok where no_bukti=$no_bukti and kode_proses = 'SA02' and kode_lokasi=$kode_lokasi ";
                    array_push($exec_array,$del2);
                    
                    for($i=0; $i<count($data['kode_dok']);$i++){
                        $insdet[$i] = "insert into sai_proses_dok (kode_lokasi,no_bukti,kode_proses,kode_dok,path_file) values ($kode_lokasi,$no_bukti,'SA02','".$data['kode_dok'][$i]."','".$arr_nama[$i]."')"; 
                        
                        array_push($exec_array,$insdet[$i]);
                    }
                    
                }else{
                    if($edit){
                        $updatedok = "update sai_proses_dok set no_bukti=$no_bukti where kode_lokasi=$kode_lokasi and no_bukti ='".$data['no_bukti']."' ";
                        array_push($exec_array,$updatedok);
                    }
                }

                if($status != '1'){
                    $update2 = "update sai_proses01 set progress='SA02' where no_bukti='".$data['no_ref']."' and kode_lokasi =$kode_lokasi ";
                    array_push($exec_array,$update2);
                }
                
                
                $rs=executeArray($exec_array);
                if($rs) {
                    $response=array(
                        'status' => 1,
                        'message' =>'Negosiasi sukses',
                        'query' => $exec_array,
                        'error_upload' => $error_upload,
                        'message_upl' =>$message,
                        'file' =>$_FILES['file'],
                        'jenis' =>$data['status']
                    );
                }
                else {
                    $response=array(
                        'status' => 0,
                        'message' =>'Negosiasi gagal'.$rs,
                        'query' => $exec_array,
                        'error_upload' => $error_upload,
                        'message_upl' =>$message,
                        'file' =>$_FILES,
                        'jenis' =>$data['status']
                    );
                    
                }
        }else{
            $response["message"] = "Unauthorized Access, Login Required";
        }
        // header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getEditNegosiasi(){
        session_start();
        getKoneksi();
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){
            $response = array("message" => "", "rows" => 0, "status" => "" ); 		
            $sql="select no_bukti,kode_lokasi,status,no_ref,convert(varchar(10),tanggal,105) as tanggal,keterangan,nik,nilai,flag_keep,inves,margin
            from sai_proses02
            where kode_lokasi= '".$_SESSION['lokasi']."' and no_bukti='".$_GET['no_bukti']."' and no_ref='".$_GET['no_ref']."' ";
            
            $rs=execute($sql);
            
            $response["daftar"] = array();
            while($row = $rs->FetchNextObject($toupper = false)){
                $response["daftar"][] = (array)$row;
            }
            
            $sql2="select kode_lokasi,no_bukti,kode_proses,kode_dok,path_file
            from sai_proses_dok
            where kode_lokasi= '".$_SESSION['lokasi']."' and no_bukti='".$_GET['no_bukti']."' ";
            
            $rs2=execute($sql2);
            
            $response["daftar2"] = array();
            while($row = $rs2->FetchNextObject($toupper = false)){
                $response["daftar2"][] = (array)$row;
            }
            $response['sql'] = $sql;
            $response['sql2'] = $sql2;
            
            $response['status']=true;
        }else{
            $response["message"] = "Unauthorized Access, Login Required";
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

   
?>