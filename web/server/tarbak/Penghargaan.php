<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}

function getPenghargaan(){
    
    $nik = $_POST['nik_user'];
    $query = '';
    $output = array();
    
    $kode_lokasi = $_REQUEST['kode_lokasi'];
    $query .= "select nama,convert(varchar,tanggal,103) as tgl,sertifikat from hr_penghargaan 
    where kode_lokasi='$kode_lokasi' and nik='$nik' ";
    
    $column_array = array('nama','convert(varchar,tanggal,103)','sertifikat');
    $order_column = 'ORDER BY nama '.$_POST['order'][0]['dir'];
    $column_string = join(',', $column_array);
    
    $res = execute($query);
    $jml_baris = $res->RecordCount();
    if(!empty($_POST['search']['value']))
    {
        $search = $_POST['search']['value'];
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
    
    if(isset($_POST["order"]))
    {
        $query .= ' ORDER BY '.$column_array[$_POST['order'][0]['column']].' '.$_POST['order'][0]['dir'];
    }
    else
    {
        $query .= ' ORDER BY nama ';
    }
    if($_POST["length"] != -1)
    {
        $query .= ' OFFSET ' . $_POST['start'] . ' ROWS FETCH NEXT ' . $_POST['length'] . ' ROWS ONLY ';
    }
    $statement = execute($query);
    $data = array();
    $no=1;
    $filtered_rows = $statement->RecordCount();
    while($row = $statement->FetchNextObject($toupper=false))
    {
        $sub_array = array();
        
        $sub_array[] = $no;
        $sub_array[] = $row->nama;
        $sub_array[] = $row->tgl;
        $sub_array[] = $row->sertifikat;
        $data[] = $sub_array;
        $no++;
    }
    $output = array(
        "draw"				=>	intval($_POST["draw"]),
        "recordsTotal"		=> 	$filtered_rows,
        "recordsFiltered"	=>	$jml_baris,
        "data"				=>	$data,
    );
    echo json_encode($output);

}

function simpanPenghargaan(){

    $nik=$_POST['nik'];
    $kode_lokasi=$_POST['kode_lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    if($_POST['id_edit'] == "1"){
 
        $sqldel1="delete from hr_penghargaan where nama='".$_POST['nama']."' and nik='".$nik."' and kode_lokasi='".$kode_lokasi."' ";

    }

    if(ISSET($_FILES["file_gambar"]["name"]) AND !empty($_FILES["file_gambar"]["name"])){
        $path_s = $_SERVER['DOCUMENT_ROOT'];
        $target_dir = $path_s."server/media/";
        $target_file = $target_dir . basename($_FILES["file_gambar"]["name"]);
        $uploadOk = 1;
        $message="";
        $error_upload="";
        $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
       
        // Check if file already exists
        if (file_exists($target_file)) {
            $error_upload= "Sorry, file already exists.";
            $uploadOk = 0;
        }
        // Check file size
        if ($_FILES["file_gambar"]["size"] > 2000000) {
            $error_upload= "Sorry, your file is too large.";
            $uploadOk = 0;
        }
        // Allow certain file formats
        if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
        && $imageFileType != "pdf" && $imageFileType != "doc" && $imageFileType != "docx"  ) {
            $error_upload= "Sorry, only JPG, JPEG, PNG, PDF, DOC, DOCX files are allowed.";
            $uploadOk = 0;
        }
        // Check if $uploadOk is set to 0 by an error
        if ($uploadOk == 0) {
            $error_upload= "Sorry, your file was not uploaded.";
        // if everything is ok, try to upload file
        } else {
            if (move_uploaded_file($_FILES["file_gambar"]["tmp_name"], $target_file)) {
                $message = "The file ". basename( $_FILES["file_gambar"]["name"]). " has been uploaded.";
            } else {
                $error_upload= "Sorry, there was an error uploading your file.";
                // echo $target_file;
                // echo $_FILES["file_gambar"]["error"];
                if (is_dir($target_dir) && is_writable($target_dir)) {
                    // do upload logic here
                } else if (!is_dir($target_dir)){
                    $error_upload.= 'Upload directory does not exist.'.$target_dir;
                } else if (!is_writable($target_dir)){
                    $error_upload.= 'Upload directory is not writable'.$target_dir;
                }

            }
        }

        $filepath=basename($_FILES["file_gambar"]["name"]);
        $filetype=$imageFileType;

    }else{
        $filepath ="-";
        $filetype ="";
        
    }

    $sqlnu= "select max(nu) as nu from hr_penghargaan where nik='$nik' and kode_lokasi='$kode_lokasi'  ";
    $rsnu=execute($sqlnu);

    if($rsnu->RecordCount() > 0){
        $nu = $rsnu->fields[0] + 1;
    }else{
        $nu = 0;
    }

    $sql1 = "insert into hr_penghargaan(nik,kode_lokasi,nu,nama,tanggal,sertifikat) values ('".$nik."','".$kode_lokasi."',".$nu.",'".$_POST['nama']."','".$_POST['tanggal']."','".$filepath."')";

    if($_POST['id_edit'] == "1"){
        $sql=[$sqldel1,$sql1];
        $result["sqldel"]=$sqldel;
    }else{
        $sql=[$sql1];
    }

    $rs=executeArray($sql);

    $tmp=array();
    $kode = array();

    if ($rs)
    {	
        $tmp="Sukses disimpan";
        $sts=true;
    }else{

        $tmp="Gagal disimpan";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"]=$sql;
    $result["error"]=$error_upload;

    echo json_encode($result);

}

function getEditPenghargaan(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['kode_lokasi'];    
    $nik=$_POST['nik'];

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select *,convert(varchar,tanggal,105) as tgl from hr_penghargaan 
    where kode_lokasi='$kode_lokasi' and nik='$nik' and nama = '$id' ";
    
    $rs = execute($sql);

    $result['daftar'] = array();

    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }

    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function hapusPenghargaan(){
        
    $sql1="delete from hr_penghargaan where nama='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' and nik='".$_POST['nik']."' ";

    $sql=[$sql1];
    $rs=executeArray($sql);

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
    $result["sql"] = $sql;
    echo json_encode($result);
}


?>
