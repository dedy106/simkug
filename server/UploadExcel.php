<?php

    global $dirSeparator;
    global $serverDir;
    if (!defined('NEW_LINE'))
        define("NEW_LINE", "<br>\r\n");

    define("WIN", "win");
    define("LINUX", "linux");
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
    {
        $platform = WIN;
        $dirSeparator = "\\";
        $separator = ";";
    }
    else
    {
        $platform = LINUX;
        $dirSeparator = "/";
        $separator = ":";
    }
    error_reporting (E_ALL & ~E_NOTICE );

    $serverDir = __FILE__;

    global $rootDir;

    $pos = strrpos($serverDir, $dirSeparator);
    $serverDir = substr($serverDir, 0, $pos);
    $pos = strrpos($serverDir, $dirSeparator);
    $rootDir = substr($serverDir, 0, $pos);
    $pos = strrpos($rootDir, $dirSeparator);
    $path = $rootDir;
    $rootDir = substr($rootDir,$pos);

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function cekKode($kode,$kode_lokasi){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $sql = "select kode_saham from inv_saham where kode_saham ='$kode'";
        $rs = $dbLib->execute($sql);
        if($rs->recordcount()>0){
            return true;
        }else{
            return false;
        }
    }

    function simpan(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        uses("server_util_arrayList");
        $exec = new server_util_arrayList();
       
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        include_once("excel_reader2.php");
        $exec = array();
        
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

            $del = "delete from inv_shm_harga_tmp where kode_lokasi='99' ";
            
            $exec->add($del);
            
            for ($i=2; $i<=$jumlah_baris; $i++){
            
                // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                $kode_saham     = $data->val($i, 1);
                $n1   = $data->val($i, 2);
                $n2   = $data->val($i, 3);
                $n3   = $data->val($i, 4);
                $n4   = $data->val($i, 5);
                $n5   = $data->val($i, 6);
                $n6   = $data->val($i, 7);
                $n7   = $data->val($i, 8);
                $n8   = $data->val($i, 9);
                $n9   = $data->val($i, 10);
                $n10   = $data->val($i, 11);
                $n11   = $data->val($i, 12);
                $n12   = $data->val($i, 13);
                $n13  = $data->val($i, 14);
                $n14   = $data->val($i, 15);
                $n15  = $data->val($i, 16);
                $n16   = $data->val($i, 17);
                $n17   = $data->val($i, 18);
                $n18   = $data->val($i, 19);
                $n19   = $data->val($i, 20);
                $n20  = $data->val($i, 21);
                $n21   = $data->val($i, 22);
                $n22   = $data->val($i, 23);
                $n23   = $data->val($i, 24);
                $n24   = $data->val($i, 25);
                $n25   = $data->val($i, 26);
                $n26   = $data->val($i, 27);
                $n27  = $data->val($i, 28);
                $n28   = $data->val($i, 29);
                $n29   = $data->val($i, 30);
                $n30   = $data->val($i, 31);
                $n31   = $data->val($i, 32);
                if($kode_saham == ""){
                    $err_ins[] = array("kode_saham" =>"Invalid kode","err_msg"=>"Error Kode Kosong");
                    
                }else{
                    if(cekKode($kode_saham)){
                        $sql[$i] = "INSERT into  inv_shm_harga_tmp  values('99','$kode_saham',$n1,$n2,$n3,$n4,$n5,$n6,$n7,$n8,$n9,$n10,$n11,$n12,$n13,$n14,$n15,$n16,$n17,$n18,$n19,$n20,$n21,$n22,$n23,$n24,$n25,$n26,$n27,$n28,$n29,$n30,$n31)";
                        // $rs[$i]=$dbLib->execute($sql[$i]);
    
                        $exec->add($sql[$i]);
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
        // $insert=true;

        if(count($err_ins)>0){
            $tmp = "error data tidak valid";
            $result["error_ins"] = $err_ins;
            $sts = false;
        }else{
            $insert = $dbLib->execArraySQL($exec);
            // $insert = "process completed";
            $tmp=array();
            $kode = array();
            if ($insert == "process completed")
            {	
                $tmp="sukses, filepath:".$filepath." error_upload:".$error_upload;
                $sts=true;
            }else{
                $tmp="gagal".$error_upload;
                $sts=false;
            }	
        }
       	
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["data"]= $sql;
        echo json_encode($result);
    }

    function getPeriode(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");
        $kode_lokasi = $_GET['kode_lokasi'];
        $sql="select distinct periode from periode where kode_lokasi='$kode_lokasi' order by periode desc ";
        
        $rs=$dbLib->execute($sql);
        $result["daftar"] = array();
        while ($row=$rs->FetchNextObject($toupper=false)){
            $result["daftar"][]=(array)$row;
        }

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }		
        $result["message"] =$tmp;
        $result["status"] = $sts;
        echo json_encode($result);
    }

    function getHargaShm(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");
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
        
        $res = $dbLib->execute($query);
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
            $query .= ' ORDER BY kode_saham ';
        }
        if($data["length"] != -1)
        {
            $query .= ' OFFSET ' . $data['start'] . ' ROWS FETCH NEXT ' . $data['length'] . ' ROWS ONLY ';
        }
        $statement = $dbLib->execute($query);
        $data = array();
        $filtered_rows = $statement->recordcount();
        while($row = $statement->FetchNextObject($toupper=false))
        {
            $sub_array = array();
            $sub_array[] = $row->kode_saham;
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
        echo json_encode($response);
    }
    

?>
