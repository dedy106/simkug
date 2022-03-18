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

    function clearTmpHut() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_GET['kode_lokasi'];
            $exec = array();
            $sql = "delete from tm_hutang_tmp where kode_lokasi='$kode_lokasi' ";
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
    
    function cekKodePP($kode,$kode_lokasi){
        getKoneksi();     
        $sql = "select kode_pp from pp where flag_aktif='1' and kode_lokasi='$kode_lokasi' and kode_pp ='$kode'";
        $rs = execute($sql);
        if($rs->RecordCount()>0){
            return true;
        }else{
            return false;
        }
    }

    function cekTglInvoice($tgl,$periode){
        getKoneksi();     
        
        if(substr($tgl,0,4).substr($tgl,5,2) == $periode){
            return true;
        }else{
            return false;
        }
    }

    function cekKodeVendor($kode,$kode_lokasi){
        getKoneksi();     
        $sql = "select kode_vendor from vendor where kode_lokasi='$kode_lokasi' and kode_vendor ='$kode'";
        $rs = execute($sql);
        if($rs->RecordCount()>0){
            return true;
        }else{
            return false;
        }
    }

    function cekNoInvoice($kode,$kode_lokasi){
        getKoneksi();     
        $sql = "select no_hutang from tm_hutang_m where kode_lokasi='$kode_lokasi' and no_hutang ='$kode'";
        $rs = execute($sql);
        if($rs->RecordCount()>0){
            return true;
        }else{
            return false;
        }
    }

    function cekJenis($kode,$kode_lokasi){
        getKoneksi();     
        $sql = "select kode_pp, kode_jenis, akun_debet,akun_kredit from tm_hutang_jenis where kode_lokasi='$kode_lokasi' and kode_jenis ='$kode'";
        $rs = execute($sql);
        if($rs->RecordCount()>0){
            return true;
        }else{
            return false;
        }
    }

    function simpanHutTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $kode_lokasi = $data['kode_lokasi'];
            $periode = $data['periode'];
            
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

                $del = "delete from tm_hutang_tmp where kode_lokasi='$kode_lokasi' and periode ='$periode' ";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_pbf     = $data->val($i, 1);
                    $nama   = $data->val($i, 2);
                    $kode_pp   = $data->val($i, 3);
                    $tgl_upload   = $data->val($i, 4);
                    $keterangan   = $data->val($i, 5);
                    $no_invoice   = $data->val($i, 6);
                    $kredit   = floatval($data->val($i, 7));
                    $harga   = floatval($data->val($i, 8));
                    $diskon   = floatval($data->val($i, 9));
                    $hrg_diskon   = floatval($data->val($i, 10));
                    $ppn   = floatval($data->val($i, 11));
                    $harga_ppn   = floatval($data->val($i, 12));
                    $tgl_jth_tempo  = $data->val($i, 13);
                    $jenis_trans   = $data->val($i, 14);
					
                    // if($no_invoice == ""){
                    //     $err_ins[] = array("no_invoice" =>"Invalid no invoice","err_msg"=>"Error No Invoice Kosong");
                    // }
                    // else if(cekNoInvoice($no_invoice,$kode_lokasi)){
                    //     $err_ins[] = array("no_invoice" =>"Invalid no invoice","err_msg"=>"Error No Invoice $no_invoice sudah ada di database");
                    // }
                    // else 
                    if(!cekKodePP($kode_pp,$kode_lokasi)){
                        $err_ins[] = array("no_invoice" =>"Invalid kode pp","err_msg"=>"Error Kode PP $kode_pp tidak terdaftar");
                    }
                    else if(!cekTglInvoice($tgl_upload,$periode)){
                        $err_ins[] = array("no_invoice" =>"Invalid tgl upload","err_msg"=>"Error Tanggal $tgl_upload tidak sesuai periode yg dipilih ");
                    }
                    else if(!cekJenis($jenis_trans,$kode_lokasi)){
                        $err_ins[] = array("no_invoice" =>"Invalid jenis","err_msg"=>"Error Jenis Trans $jenis_trans tidak terdaftar");
                    }else if(!cekKodeVendor($kode_pbf,$kode_lokasi)){
                        $err_ins[] = array("no_invoice" =>"Invalid jenis","err_msg"=>"Error Vendor $kode_pbf tidak terdaftar");
                    }
                    else if($harga - $diskon != $hrg_diskon){
                        $hargadisk = $harga - $diskon;
                        $hargadisk2 = $hrg_diskon;
                        $err_ins[] = array("no_invoice" => $no_invoice,"err_msg"=>"Nilai tidak balance. harga - diskon (".$hargadisk.") tidak sama dengan hrg diskon (".$hargadisk2.") baris ke ".$i);
                    }
                    else if($hrg_diskon + $ppn != $harga_ppn){
                        $hargappn = $hrg_diskon + $ppn;
                        $hargappn2 = $harga_ppn;
                        $err_ins[] = array("no_invoice" => $no_invoice,"err_msg"=>"Nilai tidak balance. hrg diskon + ppn (".$hargappn.") tidak sama dengan hrg ppn (".$hargappn2.") baris ke ".$i);
                    }
                    else{
                        // if($no_invoice != $data->val($i-1, 5)){
                            $sql[$i] = "INSERT into  tm_hutang_tmp (kode_lokasi,periode,kode_pbf,nama,kode_pp,tgl_upload,no_invoice,no_fpajak,tgl_pajak,kredit,harga,diskon,hrg_diskon,ppn,harga_ppn,tgl_jth_tempo,jenis_trans,keterangan) values ('$kode_lokasi','$periode','$kode_pbf','$nama','$kode_pp','$tgl_upload','$no_invoice','-',NULL,$kredit,$harga,$diskon,$hrg_diskon,$ppn,$harga_ppn,'$tgl_jth_tempo','$jenis_trans','$keterangan')";
                        
                            array_push($exec,$sql[$i]);
                        // }else{
                        //     $err_ins[] = array("no_invoice" => $kode_saham,"err_msg"=>"Error no_invoice duplikat");
                            
                        // }
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

    function getHutTmp(){
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
            $query .= "select kode_pbf,nama,kode_pp,tgl_upload,keterangan,no_invoice,kredit,harga,diskon,hrg_diskon,ppn,harga_ppn,tgl_jth_tempo,jenis_trans from tm_hutang_tmp
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


    function simpanHut() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];

            $idDok = generateKode("tm_hutang_m", "no_load", $kode_lokasi."-HL".substr($periode,2,4).".", "0001");

            $row = dbResultArray("select kode_lokasi,periode,kode_pbf,nama,kode_pp,no_invoice,no_fpajak,tgl_pajak,kredit,harga,diskon,hrg_diskon,ppn,harga_ppn,tgl_jth_tempo,jenis_trans,keterangan,tgl_upload from tm_hutang_tmp where kode_lokasi='$kode_lokasi' and periode='$periode' ");

            $datajenis = dbResultArray("select kode_pp, kode_jenis, akun_debet,akun_kredit from tm_hutang_jenis where kode_lokasi='$kode_lokasi'");

            $spro = dbResultArray("select kode_spro,flag from spro where kode_spro in ('PPNM') and kode_lokasi = '".$kode_lokasi."'");			
			if (count($spro) > 0){
				for ($i=0;$i<count($spro);$i++){
					$line = $spro[$i];																	
					if ($line["kode_spro"] == "PPNM") {
                        $akunPPN = $line["flag"];	
                    }	
				}
            }		
            
            $exec = array();
            $array_bukti = array();
            $error_array = array();
            $nik = $data['nik_user'];
            
           
            $sql="select isnull(max(substring(no_hutang,11,4)),0)+1 as jum from tm_hutang_m where kode_lokasi='$kode_lokasi' and periode='$periode' and no_hutang like '%HU%' ";
            $rs2 = execute($sql);
            $row2 = $rs2->FetchNextObject($toupper=false);
            $no=$row2->jum;
            
            for ($i=0;$i < count($row);$i++){	
                if(floatval($row[$i]["harga"]) - floatval($row[$i]['diskon']) == floatval($row[$i]['hrg_diskon'])){

                    if(floatval($row[$i]["hrg_diskon"]) + floatval($row[$i]["ppn"]) == floatval($row[$i]['harga_ppn'])){

                        //if(!cekNoInvoice($row[$i]["no_invoice"],$kode_lokasi)){
                            
                            for ($j=0;$j < count($datajenis);$j++){
                                if ($row[$i]["jenis_trans"] == $datajenis[$j]['kode_jenis']) {
                                    $akunDebet = $datajenis[$j]['akun_debet'];
                                    $akunKredit = $datajenis[$j]['akun_kredit'];
                                }
                            }	
                           
                            
                            $no_bukti=$kode_lokasi."-HU".substr($periode,2,4).".".sprintf("%04s",$no);
                            
                            $sql = "insert into tm_hutang_m(no_hutang,kode_lokasi,no_dokumen,tanggal,keterangan,kode_jenis,kode_vendor,kode_curr,kurs,nik_app,kode_pp,nilai,periode,nik_user,tgl_input,akun_hutang,posted,nilai_ppn,modul,no_ref,no_fp,no_spb, bruto,diskon,due_date, nilai_pph,tgl_fp,lama,no_load) values ('$no_bukti','$kode_lokasi','".$row[$i]['no_invoice']."','".$row[$i]["tgl_upload"]."','".$row[$i]['keterangan']."','".$row[$i]["jenis_trans"]."','".$row[$i]["kode_pbf"]."','IDR',1,'".$nik."','".$row[$i]["kode_pp"]."',".$row[$i]["harga_ppn"].",'".$periode."','".$nik."',getdate(),'".$akunKredit."','F',".$row[$i]["ppn"].",'HUTUM','-','".'-'."','-',".$row[$i]["harga"].",".$row[$i]["diskon"].",'".$row[$i]["tgl_jth_tempo"]."',0,NULL,".$row[$i]["kredit"].",'".$idDok."')";
                            
                            array_push($exec,$sql);
                            
                            $sql2 = "insert into tm_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,no_load) values ('".$no_bukti."','".$row[$i]['no_invoice']."','".$row[$i]["tgl_upload"]."',0,'".$akunDebet."','".$row[$i]['keterangan']."' ,'D','IDR',1,".$row[$i]["hrg_diskon"].",".joinNUm($row[$i]["hrg_diskon"]).",'".$row[$i]["kode_pp"]."','-','".$kode_lokasi."','HUTUM','BEBAN','".$periode."','".$nik."',getdate(),'".$idDok."')";
                           
                            array_push($exec,$sql2);
                            
                            $sql3 = "insert into tm_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,no_load) values ('".$no_bukti."','".$row[$i]['no_invoice']."','".$row[$i]["tgl_upload"]."',2,'".$akunKredit."','".$row[$i]['keterangan']."','C','IDR',1,".$row[$i]["harga_ppn"].",".$row[$i]["harga_ppn"].",'".$row[$i]["kode_pp"]."','-','".$kode_lokasi."','HUTUM','HUT','".$periode."','".$nik."',getdate(),'".$idDok."')";
                           
                            array_push($exec,$sql3);
                            
                            $sql4 = "insert into tm_hutang_j(no_hutang,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,kode_curr,kurs,nilai_curr,nilai,kode_pp,kode_drk,kode_lokasi,modul,jenis,periode,nik_user,tgl_input,no_load) values ('".$no_bukti."','".$row[$i]['no_invoice']."','".$row[$i]["tgl_upload"]."',1,'".$akunPPN."','".$row[$i]['keterangan']."','D','IDR',1,".$row[$i]["ppn"].",".$row[$i]["ppn"].",'".$row[$i]["kode_pp"]."','-','".$kode_lokasi."','HUTUM','PPN','".$periode."','".$nik."',getdate(),'".$idDok."')";
                            array_push($exec,$sql4);
        
                            $no=$no+1;
                            array_push($array_bukti,$no_bukti);
        
                        //}else
                        //{
                        //    $err = " Error No invoice =".$no_bukti." sudah digunakan ";
                        //    array_push($error_array,$err);
                        //}
                    }else{
                        $ju = $i+2;
                        $hargappn = floatval($row[$i]["hrg_diskon"]) + floatval($row[$i]["ppn"]);
                        $hargappn2 = floatval($row[$i]["harga_ppn"]);
                        $error_array[] = array("kode" => $row[$i]["no_invoice"],"err_msg"=>"Nilai tidak balance. hrg diskon + ppn (".$hargappn.") tidak sama dengan hrg ppn (".$hargappn2.") baris ke ".$ju);
                    }
                }else{
                    $ju = $i+2;
                    $hargadisk = floatval($row[$i]["harga"]) - floatval($row[$i]["diskon"]);
                    $hargadisk2 = floatval($row[$i]["hrg_diskon"]);
                    $error_array[] = array("kode" => $row[$i]["no_invoice"],"err_msg"=>"Nilai tidak balance. harga - diskon (".$hargadisk.") tidak sama dengan hrg diskon (".$hargadisk2.") baris ke ".$ju);
                }
                    
            }

            if(count($error_array) == 0){
                $del = "delete from tm_hutang_tmp where kode_lokasi='$kode_lokasi' and periode='$periode' ";
                array_push($exec,$del);
                        
                $insert = executeArray($exec,$err);
                // $insert = true;
                if($err == null){
                    $tmp="sukses";
                    $sts=true;
                    
                }else{
                    $tmp="gagal".$err;
                    $sts=false;
                }
            }else{
                $tmp="gagal. Nilai tidak balance";
                $sts= false;
            }

            $response["message"] =  $tmp;
            $response["status"] = $sts; 
            $response["bukti"] = $array_bukti; 
            $response["error"] = $error_array; 
            //$response["exec"] = $exec; 
             
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>