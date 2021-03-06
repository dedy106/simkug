<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    function getEditData(){

        $id=$_POST['kode'];    
    
        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="select id, convert(varchar, tanggal, 105) as tanggal, judul, keterangan as isi, kode_klp,kode_kategori,tag,header_url as header from lab_konten where kode_lokasi='".$_POST['lokasi']."' and id='$id' ";
        
        $rs = execute($sql);					
        
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status'] = TRUE;
        $result['sql'] = $sql;
        echo json_encode($result);
    
    }

    function simpan(){

        $data=$_POST;

        $sql="select isnull(max(id),0)+1 as id from lab_konten where kode_lokasi='".$_POST['kode_lokasi']."' ";
        $rs1=execute($sql);

        $id=$rs1->fields[0];

        $sql= "insert into lab_konten (id,kode_lokasi,nik_user,tgl_input,flag_aktif,judul,tanggal,header_url,keterangan,kode_klp,kode_kategori,tag) values ('$id','".$_POST['kode_lokasi']."','".$data['nik_user']."',getdate(),'1','".$data['judul']."','".reverseDate($data['tanggal'])."','".$data['header_url']."','".$data['keterangan']."','".$data['kode_klp']."','".$data['kode_kategori']."','".$data['tag']."') ";
        
        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
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
        $result["id"] = $id;
        echo json_encode($result);
    }
    

    function ubah(){
        
        $sql="update lab_konten set judul='".$_POST['judul']."',tanggal='".reverseDate($_POST['tanggal'])."',header_url='".$_POST['header_url']."',keterangan='".$_POST['keterangan']."',kode_klp='".$_POST['kode_klp']."',kode_kategori='".$_POST['kode_kategori']."',tag='".$_POST['tag']."' where id = '".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);

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
    

    function hapus(){
        
        $sql="delete from lab_konten where id='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);

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

    function view(){
               
        $sql="select * from lab_konten where kode_lokasi='24' ";
        
        $rs=execute($sql);
        $html="";
        while($row=$rs->FetchNextObject($toupper = false)){
            $html.= $row->id;
        }

        echo $html;
       
    }

    function getEditGaleri(){

        $id=$_POST['kode'];
        $kode_lokasi=$_POST['lokasi'];    
    
        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="select id, nama, keterangan as isi,kode_ktg,file_gambar,file_type,jenis from lab_konten_galeri where kode_lokasi='$kode_lokasi' and id='$id' ";
        
        $rs = execute($sql);					
        
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status'] = TRUE;
        $result['sql'] = $sql;
        echo json_encode($result);
    
    }

    function simpanGaleri(){

        $data=$_POST;

        $sql="select isnull(max(id),0)+1 as id from lab_konten_galeri where kode_lokasi='".$data['kode_lokasi']."' ";
        $rs1=execute($sql);

        $id=$rs1->fields[0];
        $kode_lokasi=$data['kode_lokasi'];
        $nik=$data['nik'];

        // if(ISSET($_FILES["file_gambar"]["name"])){

            $path_s = $_SERVER['DOCUMENT_ROOT'];
            $target_dir = $path_s."web/upload/";
            $target_file = $target_dir . basename($_FILES["file_gambar"]["name"]);
            $uploadOk = 1;
            $message="";
            $error_upload="";
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["file_gambar"]["tmp_name"]);
                if($check !== false) {
                    $message= "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    $error_upload= "File is not an image.";
                    $uploadOk = 0;
                }
            }
            // Check if file already exists
            if (file_exists($target_file)) {
                $error_upload= "Sorry, file already exists.";
                $uploadOk = 0;
            }
            // Check file size
            if ($_FILES["file_gambar"]["size"] > 500000) {
                $error_upload= "Sorry, your file is too large.";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                $error_upload= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
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

            $filepath="/upload/".basename($_FILES["file_gambar"]["name"]);
            $filetype=$imageFileType;
        // }else{
        //     $filepath="-";
        //     $filetype="-";
        // }

        $sql= "insert into lab_konten_galeri (id,kode_lokasi,nik_user,tgl_input,flag_aktif,nama,jenis,file_gambar,file_type,keterangan,kode_ktg) values ('$id','$kode_lokasi','$nik',getdate(),'1','".$data['nama']."','".$data['jenis']."','".$filepath."','".$filetype."','".$data['keterangan']."','".$data['kode_kategori']."') ";
        
        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            unlink($target_file);
            $sts=false;
        }	

        $result["message"] =$tmp."-".$message;
        $result["error"] =$error_upload;
        $result["status"] = $sts;
        $result["sql"] = $sql;
        $result["id"] = $id;
        echo json_encode($result);
    }
    

    function ubahGaleri(){

        if(ISSET($_FILES["file_gambar"]["name"]) AND !empty($_FILES["file_gambar"]["name"])){
            $path_s = $_SERVER['DOCUMENT_ROOT'];
            $target_dir = $path_s."web/upload/";
            $target_file = $target_dir . basename($_FILES["file_gambar"]["name"]);
            $uploadOk = 1;
            $message="";
            $error_upload="";
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["file_gambar"]["tmp_name"]);
                if($check !== false) {
                    $message= "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    $error_upload= "File is not an image.";
                    $uploadOk = 0;
                }
            }
            // Check if file already exists
            if (file_exists($target_file)) {
                $error_upload= "Sorry, file already exists.";
                $uploadOk = 0;
            }
            // Check file size
            if ($_FILES["file_gambar"]["size"] > 500000) {
                $error_upload= "Sorry, your file is too large.";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                $error_upload= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
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

            $filepath="/upload/".basename($_FILES["file_gambar"]["name"]);
            $filetype=$imageFileType;

            $sql="update lab_konten_galeri set nama='".$_POST['nama']."',jenis ='".$_POST['jenis']."',file_gambar ='".$filepath."',file_type='".$filetype."',keterangan ='".$_POST['keterangan']."',kode_ktg='".$_POST['kode_kategori']."' where id = '".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";

        }else{
    
            $sql="update lab_konten_galeri set nama='".$_POST['nama']."',jenis ='".$_POST['jenis']."',keterangan ='".$_POST['keterangan']."',kode_ktg='".$_POST['kode_kategori']."' where id = '".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        }
        
        $rs=execute($sql);

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
    

    function hapusGaleri(){
        
        $pathini = $_SERVER['DOCUMENT_ROOT'];
        $sql2="select file_gambar from lab_konten_galeri where id='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        $rs2=execute($sql2);

        $tmp=explode("/",$rs2->fields[0]);
        $fullpath=$pathini.$tmp[1]."/".$tmp[2];

        $sql="delete from lab_konten_galeri where id='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."'";

        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            unlink($fullpath);
            if (!unlink($fullpath))
            {
                $error_del= "Error deleting $fullpath";
            }
            else
            {
                $error_del= "Deleting $fullpath";
            }
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }		
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["sql"] = $sql2;
        $result["path"] = $fullpath;
        $result["error_del"] = $error_del;
        echo json_encode($result);
    }

    function simpanMenu(){

        $data=$_POST;
        $kode_lokasi=$data['kode_lokasi'];
        $kode_menu=$data['kode_menu'];

        $cek = execute("SELECT kode_menu from lab_konten_menu where kode_lokasi = '$kode_lokasi' and kode_menu='".$kode_menu."'");
        $edit = ($cek->RecordCount() > 0 ? TRUE : FALSE);
     
        // nu + 1 where nu > posted
        $del = execute("DELETE FROM lab_konten_menu where kode_lokasi='$kode_lokasi' and kode_menu='".$kode_menu."'");

        $upd = execute("UPDATE lab_konten_menu set nu=(nu+1) where kode_lokasi='$kode_lokasi' and nu>".$data['nu']);

        $query = execute("insert into lab_konten_menu (kode_lokasi,kode_menu,nama,jenis,link,level_menu,nu,kode_induk) values ('".$kode_lokasi."','".$data['kode_menu']."','".$data['nama']."','".$data['jenis']."','".$data['link']."','".$data['level_menu']."','".$data['nu']."','".$data['kode_induk']."')");
                    
        if($del AND $upd AND $query){
            $result['status'] = 1;
            $result['edit'] = $edit;
            $result['alert'] = "Data Berhasil Disimpan";
        }else{
            $result['status'] = 2;
            $result['alert'] = "Data Gagal Disimpan";
        }
        echo json_encode($result);
    }

    function delMenu(){
        $lokasi=$_GET['lok'];
        $id=$_GET['param'];
        if($_GET['param'] != null){
            $cek = execute("select kode_menu,nu from lab_konten_menu where kode_lokasi = '".$lokasi."' and kode_menu = '".$id."'");
            $detail = $cek->FetchNextObject($toupper=false);

            $cek2 = execute("select kode_menu,nu from lab_konten_menu where kode_lokasi = '".$lokasi."' and nu > '".$detail->nu."'");

            if($cek->RecordCount() > 0){
                
                $del = execute("DELETE FROM lab_konten_menu where kode_lokasi = '".$lokasi."' and kode_menu = '".$id."'");
                
                if($cek2->RecordCount() > 0){
                    $upd = execute("UPDATE lab_konten_menu set nu=(nu-1) where kode_lokasi = '".$lokasi."' and nu > ".$detail->nu);
                }else{
                    $upd=true;
                }
                
                if($del AND $upd){
                    // $this->db->CommitTrans();
                    echo"<script>alert('Data berhasil dihapus'); window.location='fMain.php?hal=app/java/fSettingMenu.php';</script>";
                }else{
                    // $this->db->RollbackTrans();
                    echo"<script>alert('Data gagal dihapus'); window.location='fMain.php?hal=app/java/fSettingMenu.php';</script>";

                }
            }else{
                echo"<script>alert('Data tidak ada'); window.location='fMain.php?hal=app/java/fSettingMenu.php';</script>";
            }
        }
    }

    function getEditKontak(){

        $id=$_POST['kode'];    
    
        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="select id, judul, keterangan as isi, latitude,longitude from lab_konten_kontak where kode_lokasi='".$_POST['kode_lokasi']."' and id='$id' ";
        
        $rs = execute($sql);					
        
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status'] = TRUE;
        $result['sql'] = $sql;
        echo json_encode($result);
    
    }

    function simpanKontak(){

        $data=$_POST;

        // $sql2="select isnull(max(id),0)+1 as id from lab_konten_kontak where kode_lokasi='".$data['kode_lokasi']."' ";
        // $rs1=execute($sql2);
        // if($rs1->RecordCount() > 0){
        //     $id=$rs1->fields[0];
        // }else{
        //     $id=1;
        // }

        $sql= "insert into lab_konten_kontak (kode_lokasi,nik_user,tgl_input,flag_aktif,judul,tanggal,keterangan,latitude,longitude) values ('".$data['kode_lokasi']."','".$data['nik_user']."',getdate(),'1','".$data['judul']."',getdate(),'".$data['keterangan']."','".$data['latitude']."','".$data['longitude']."') ";
        
        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
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
        $result["id"] = $id;
        $result["sql2"] = $sql2;
        echo json_encode($result);
    }
    

    function ubahKontak(){
        
        $sql="update lab_konten_kontak set judul='".$_POST['judul']."',keterangan='".$_POST['keterangan']."',latitude='".$_POST['latitude']."',longitude='".$_POST['longitude']."' where id = '".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);

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
    

    function hapusKontak(){
        
        $sql="delete from lab_konten_kontak where id='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);

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
        $result["sql"]=$sql;
        echo json_encode($result);
    }

    function getEditKtg(){

        $id=$_POST['kode'];    
    
        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="select kode_ktg, nama from lab_konten_ktg where kode_lokasi='".$_POST['kode_lokasi']."' and kode_ktg='$id' ";
        
        $rs = execute($sql);					
        
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status'] = TRUE;
        $result['sql'] = $sql;
        echo json_encode($result);
    
    }

    function simpanKtg(){

        $data=$_POST;

        $str_format="000";
        $prefix="KTG";
        $sql2="select right(isnull(max(kode_ktg),'".$prefix."000'),".strlen($str_format).")+1 as id from lab_konten_ktg where kode_ktg like '$prefix%' and kode_lokasi='".$data['kode_lokasi']."'";
        $query = execute($sql2);

        $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

        $sql= "insert into lab_konten_ktg (kode_lokasi,kode_ktg,jenis,nama) values ('".$data['kode_lokasi']."','".$id."','Gambar','".$data['nama']."') ";
        
        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
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
        $result["id"] = $id;
        $result["query"] = $sql2;
        echo json_encode($result);
    }
    

    function ubahKtg(){
        
        $sql="update lab_konten_ktg set nama='".$_POST['nama']."' where kode_ktg = '".$_POST['kode_ktg']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);

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
    

    function hapusKtg(){
        
        $sql="delete from lab_konten_ktg where kode_ktg='".$_POST['kode_ktg']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);

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

    function editLogo(){
        $kode_lokasi=$_POST['kode_lokasi'];

        if(ISSET($_FILES["file_gambar"]["name"])){

            $path_s = $_SERVER['DOCUMENT_ROOT'];
            $target_dir = $path_s."image/";
            $target_file = $target_dir . basename($_FILES["file_gambar"]["name"]);
            $uploadOk = 1;
            $message="";
            $error_upload="";
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["file_gambar"]["tmp_name"]);
                if($check !== false) {
                    $message= "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    $error_upload= "File is not an image.";
                    $uploadOk = 0;
                }
            }
            // Check if file already exists
            if (file_exists($target_file)) {
                $error_upload= "Sorry, file already exists.";
                $uploadOk = 0;
            }
            // Check file size
            if ($_FILES["file_gambar"]["size"] > 500000) {
                $error_upload= "Sorry, your file is too large.";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                $error_upload= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
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

            $filepath = basename($_FILES["file_gambar"]["name"]);
            $sql= "update lokasi set logo='".$filepath."' where kode_lokasi='$kode_lokasi' ";
            $rs=execute($sql);

        }else{
            $rs=false;
        }
        
        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            unlink($target_file);
            $sts=false;
        }	

        $result["message"] =$tmp."-".$message;
        $result["error"] =$error_upload;
        $result["status"] = $sts;
        $result["sql"] = $sql;
        echo json_encode($result);
    }
?>
