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
            $sql = "delete from agg_abt_tmp where kode_lokasi='$kode_lokasi' ";
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
    
    function cekKodePP($kode_lokasi){
        getKoneksi();     
        $sql = "select kode_pp as kode, 'Kode PP tidak valid' as error_msg from agg_abt_tmp where kode_lokasi='$kode_lokasi' and kode_pp not in (select kode_pp from pp where kode_lokasi='$kode_lokasi')";
        $rs = dbResultArray($sql);
        if(count($rs)>0){
            $res['status'] = false;
            $res['data'] = $rs;
        }else{
            $res['status'] = true;
            $res['data'] = [];
        }
        
        return $res;
    }

    function cekKodeDrk($tahun,$kode_lokasi){
        getKoneksi();     
        $sql = "select kode_drk as kode, 'Kode DRK tidak valid' as error_msg from agg_abt_tmp where kode_lokasi='$kode_lokasi' and kode_drk not in (select kode_drk from drk where kode_lokasi='$kode_lokasi' and tahun='$tahun' )";
        $rs = dbResultArray($sql);
        if(count($rs)>0){
            $res['status'] = false;
            $res['data'] = $rs;
        }else{
            $res['status'] = true;
            $res['data'] = [];
        }
        return $res;
    }

    function cekKodeAkun($kode_lokasi){
        getKoneksi();     
        $sql = "select kode_akun as kode, 'Kode Akun tidak valid' as error_msg from agg_abt_tmp where kode_lokasi='$kode_lokasi' and kode_akun not in (select kode_akun from masakun where kode_lokasi='$kode_lokasi')";
        $rs = dbResultArray($sql);
        if(count($rs)>0){
            $res['status'] = false;
            $res['data'] = $rs;
        }else{
            $res['status'] = true;
            $res['data'] = [];
        }

        return $res;
    }

    function cekValidData($kode_lokasi,$tahun){
        getKoneksi();     
        $sql = "
        select kode_akun as kode, 'Kode Akun tidak valid' as error_msg from agg_abt_tmp where kode_lokasi='$kode_lokasi' and kode_akun not in (select kode_akun from masakun where kode_lokasi='$kode_lokasi')
        union all
        select kode_pp as kode, 'Kode PP tidak valid' as error_msg from agg_abt_tmp where kode_lokasi='$kode_lokasi' and kode_pp not in (select kode_pp from pp where kode_lokasi='$kode_lokasi')
        union all
        select kode_drk as kode, 'Kode Drk tidak valid' as error_msg from agg_abt_tmp where kode_lokasi='$kode_lokasi' and kode_drk not in (select kode_drk from drk where kode_lokasi='$kode_lokasi' and tahun='$tahun')
        ";
        $rs = dbResultArray($sql);
        if(count($rs)>0){
            $res['status'] = false;
            $res['data'] = $rs;
        }else{
            $res['status'] = true;
            $res['data'] = [];
        }

        return $res;
    }

    function simpanHutTmp(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
        
            include_once("excel_reader2.php");
            $exec = array();
            $dtJan = array();
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

                $del = "delete from agg_abt_tmp where kode_lokasi='$kode_lokasi' and tahun ='$periode'";
                
                array_push($exec,$del);
                
                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing
                    $kode_akun = $data->val($i, 1);
                    $kode_pp   = $data->val($i, 2);
                    $kode_drk   = $data->val($i, 3);
                    $n1   = floatval($data->val($i, 4));
                    $n2   = floatval($data->val($i, 5));
                    $n3   = floatval($data->val($i, 6));
                    $n4   = floatval($data->val($i, 7));
                    $n5   = floatval($data->val($i, 8));
                    $n6   = floatval($data->val($i, 9));
                    $n7   = floatval($data->val($i, 10));
                    $n8   = floatval($data->val($i, 11));
                    $n9   = floatval($data->val($i, 12));
                    $n10   = floatval($data->val($i, 13));
                    $n11  = floatval($data->val($i, 14));
                    $n12   = floatval($data->val($i, 15));
					
					$sql[$i] = "INSERT into  agg_abt_tmp (kode_lokasi,kode_akun,kode_pp,kode_drk,tahun,n1,n2,n3,n4,n5, n6,n7,n8,n9,n10,n11,n12) 
							values('$kode_lokasi','$kode_akun','$kode_pp','$kode_drk','$periode',$n1,$n2,$n3,$n4,$n5,$n6,$n7,$n8,$n9,$n10,$n11,$n12)";

                    
                    array_push($exec,$sql[$i]);
                    array_push($dtJan,$data->val($i,4));
                }
                
                // hapus kembali file .xls yang di upload tadi
                unlink($target_dir.$_FILES['file_dok']['name']);
                $insert = true;
            }else{
                $insert = false;
            }

            $response["error_ins"] = array();
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
                    // $cekAkun = cekKodeAkun($kode_lokasi);
                    // $cekPP = cekKodePP($kode_lokasi);
                    // $cekDrk = cekKodeDrk($periode,$kode_lokasi);
                    $validData = cekValidData($kode_lokasi,$periode);
                    // if(!$cekAkun['status']){
                    //     $tmp = "gagal invalid kode akun";
                    //     $response["error_ins"] = $cekAkun['data'];
                    //     // array_push($response["error_ins"],$cekAkun['data']);
                    //     $sts=false;
                    // } else if(!$cekPP['status']){
                    //     $tmp = "gagal invalid kode pp";
                    //     $response["error_ins"] = $cekPP['data'];
                    //     // array_push($response["error_ins"],$cekPP['data']);
                    //     $sts=false;
                    // }else if(!$cekDrk['status']){
                    //     $tmp = "gagal invalid kode drk";
                    //     $response["error_ins"] = $cekDrk['data'];
                    //     // array_push($response["error_ins"],$cekDrk['data']);
                    //     $sts=false;
                    // }else{
                    //     $tmp="sukses";
                    //     $response["error_ins"] = [];
                    //     $sts=true;
                    // }

                    if(!$validData['status']){
                        $tmp = "gagal invalid data";
                        $response["error_ins"] = $validData['data'];
                        $sts=false;
                    }else{
                        $tmp="sukses";
                        $response["error_ins"] = [];
                        $sts=true;
                    }
                    // $response['cekAkun'] = $cekAkun['status'];
                    // $response['cekPP'] = $cekPP['status'];
                    // $response['cekDrk'] = $cekDrk['status'];
                }else{
                    $tmp="gagal".$err;
                    $response["error_ins"] = [];
                    $sts=false;
                }	
            }
            
            $response["message"] =$tmp;
            $response["status"] = $sts;
            $response["error"] = $error_array; 
			$response["data"]= $exec;
			$response["dtJan"]= $dtJan;
			 
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
            $query .= "select kode_lokasi,kode_akun,kode_pp,kode_drk,tahun,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12 from agg_abt_tmp 
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
            $nik = $data["nik_user"];
            $exec = array();
            $error_array = array();
            $tahun = $data['tahun'];
            $keterangan = $data['keterangan'];
            $th = substr($tahun,0,2);
            $response['th'] = $th;
            $no_bukti = generateKode("agg_abt_m", "no_bukti", "ABT".$th.".", "001");

            $sql = "insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."01' as periode, 
									abs(n1) as nilai, abs(n1) as nilai_sat, case when n1>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n1<>0 and kode_lokasi='$kode_lokasi' ;
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."01' as periode, 
									abs(n1) as nilai, abs(n1) as nilai_sat, case when n1>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n1<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."02' as periode, 
									abs(n2) as nilai, abs(n2) as nilai_sat, case when n2>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n2<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."02' as periode, 
									abs(n2) as nilai, abs(n2) as nilai_sat, case when n2>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n2<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."03' as periode, 
									abs(n3) as nilai, abs(n3) as nilai_sat, case when n3>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n3<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."03' as periode, 
									abs(n3) as nilai, abs(n3) as nilai_sat, case when n3>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n3<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."04' as periode, 
									abs(n4) as nilai, abs(n4) as nilai_sat, case when n4>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n4<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."04' as periode, 
									abs(n4) as nilai, abs(n4) as nilai_sat, case when n4>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n4<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."05' as periode, 
									abs(n5) as nilai, abs(n5) as nilai_sat, case when n5>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n5<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."05' as periode, 
									abs(n5) as nilai, abs(n5) as nilai_sat, case when n5>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n5<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."06' as periode, 
									abs(n6) as nilai, abs(n6) as nilai_sat, case when n6>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n6<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."06' as periode, 
									abs(n6) as nilai, abs(n6) as nilai_sat, case when n6>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n6<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."07' as periode, 
									abs(n7) as nilai, abs(n7) as nilai_sat, case when n7>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n7<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."07' as periode, 
									abs(n7) as nilai, abs(n7) as nilai_sat, case when n7>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n7<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."08' as periode, 
									abs(n8) as nilai, abs(n8) as nilai_sat, case when n8>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n8<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."08' as periode, 
									abs(n8) as nilai, abs(n8) as nilai_sat, case when n8>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n8<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."09' as periode, 
									abs(n9) as nilai, abs(n9) as nilai_sat, case when n9>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n9<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."09' as periode, 
									abs(n9) as nilai, abs(n9) as nilai_sat, case when n9>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n9<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."10' as periode, 
									abs(n10) as nilai, abs(n10) as nilai_sat, case when n10>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n10<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."10' as periode, 
									abs(n10) as nilai, abs(n10) as nilai_sat, case when n10>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n10<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."11' as periode, 
									abs(n11) as nilai, abs(n11) as nilai_sat, case when n11>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n11<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."11' as periode, 
									abs(n11) as nilai, abs(n11) as nilai_sat, case when n11>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n11<>0 and kode_lokasi='$kode_lokasi';
							insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, kode_lokasi, 1 as no_urut, kode_pp, kode_akun, kode_drk, 1 as volume, '".$tahun."12' as periode, 
									abs(n12) as nilai, abs(n12) as nilai_sat, case when n12>0 then 'D' else 'C' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'ABT' as modul, 0 as buffer
							FROM agg_abt_tmp
                            where n12<>0 and kode_lokasi='$kode_lokasi';
                            insert into anggaran_d(no_agg, kode_lokasi, no_urut, kode_pp, kode_akun, kode_drk, volume, periode, nilai, nilai_sat, dc, satuan, tgl_input, nik_user, modul, buffer)
							select '$no_bukti' as no_agg, '03' as kode_lokasi, 2 as no_urut, 'PP".$kode_lokasi."' as kode_pp, kode_akun, 'DRK".$kode_lokasi."' as kode_drk, 1 as volume, '".$tahun."12' as periode, 
									abs(n12) as nilai, abs(n12) as nilai_sat, case when n12>0 then 'C' else 'D' end as dc, '-' as satuan, getdate() as tgl_input, '-' as nik_user, 'TAK' as modul, 0 as buffer
							FROM agg_abt_tmp
							where n12<>0 and kode_lokasi='$kode_lokasi';
                            ";

            array_push($exec,$sql);
            
            $ins2 = "insert into agg_abt_m (no_bukti,kode_lokasi,keterangan,tahun,tgl_input,nik_user) 
            values ('$no_bukti','$kode_lokasi','$keterangan','$tahun','".date('Y-m-d H:i:s')."', '$nik')
            ";
            array_push($exec,$ins2);

            
            $ins3 = "insert into agg_abt_d (no_bukti,kode_lokasi,kode_akun,kode_pp,kode_drk,tahun,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12) 
            select '$no_bukti' as no_bukti,kode_lokasi,kode_akun,kode_pp,kode_drk,tahun,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12 from agg_abt_tmp
            ";
            array_push($exec,$ins3);

            $del = "delete from agg_abt_tmp where kode_lokasi='$kode_lokasi' and tahun='$tahun' ";
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
            $response["message"] =  $tmp;
            $response["status"] = $sts; 
            //$response["bukti"] = $no_bukti; 
            // $response["error"] = $error_array; 
            $response["exec"] = $exec; 
             
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        $response['data'] = $data;
        echo json_encode($response);
    }
?>