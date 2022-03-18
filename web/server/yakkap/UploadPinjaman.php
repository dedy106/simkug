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

    function clearTmp() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_GET['kode_lokasi'];
            $exec = array();
            $sql = "delete from kop_pinj_m_tmp where kode_lokasi='$kode_lokasi' ";
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
            $response["message"] = "Unauthorized Access, Login Required".$_SESSION['userLog'];
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

    function round_decimals($original_number, $decimals) {
        $result1 = $original_number * pow(10, $decimals);
        $result2 = round($result1);
        $result3 = $result2 / pow(10, $decimals);
        return $result3;
    }

    function payment($PV, $IR, $NP) {//endOfPeriode
        $PMT = ($PV * $IR) / (1 - pow(1 + $IR, -$NP));
        return round_decimals($PMT, 2);
    }

    function calculate($pv,$rate, $nper){//startOfPeriode
        $numerator = $pv * pow((1 + $rate),$nper);
        $denomFracNum = pow((1 + $rate), $nper + 1) - 1;
        $denominator = $denomFracNum/$rate - 1;
        
        $realAnswer = $numerator/$denominator;
        return $realAnswer;
    }

    function annuity($rate, $sisa, $lama, $plafon) {
        $ret= [];
        $angs = round(payment($plafon, $rate,$lama));
        $totAm = 0;
        $totMargin = 0;
        $pokok = 0;
        $sawal = $plafon;
        $margin = 0;
        for ($x = 0;$x < $sisa; $x++){
            $pokok = round(calculate($sawal,$rate,$lama - $x));	
            $sawal -= $pokok;
            $totAm += $pokok;
            $margin = $angs - $pokok;
            $totMargin += $margin;
        }  
        
        $ret = array(
            "pokok" => $pokok,
            "margin" => $margin,
            "totPayment"=>$totAm,
            "totMargin"=>$totMargin,
            "payment"=>$angs
        );
        
        return $ret;
    }

    function getNextPeriode($periode) 
    {
        $bln = intval(substr($periode,4,2));
        $thn = intval(substr($periode,0,4));
        if ($bln == 12 ) {
            $bln = 1;
            $thn++;
        }else {
            $bln++;
        }
        if ($bln < 10) {
            $bln = "0".$bln;
        }
        return $thn."".$bln;
    }

    function simpanDataTmp(){
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

                $del = "delete from kop_pinj_m_tmp where kode_lokasi='$kode_lokasi' ";
                
                array_push($exec,$del);
                $del2 = "delete from kop_pinj_sch_tmp where kode_lokasi='$kode_lokasi' ";
                
                array_push($exec,$del2);

                for ($i=2; $i<=$jumlah_baris; $i++){
                
                    // menangkap data dan memasukkan ke variabel sesuai dengan kolumnya masing-masing

                    $no_pinj     = $data->val($i, 1);
                    $keterangan   = $data->val($i, 2);
                    $tanggal   = $data->val($i, 3);
                    $no_agg   = $data->val($i, 4);
                    $status_bayar   = $data->val($i, 5);
                    $jenis_angs   = $data->val($i, 6);
                    $nilai   = floatval($data->val($i, 7));
                    $p_bunga   = floatval($data->val($i, 8));
                    $lama_bayar   = floatval($data->val($i, 9));
                    $jum_bayar   = floatval($data->val($i, 10));
                    $nilai_bunga   = floatval($data->val($i, 11));
                    $nilai_pokok   = floatval($data->val($i, 12));
                    $nilai_tagihan   = floatval($data->val($i, 13));
                    $jenis   = $data->val($i, 14);
                    $periode = substr($tanggal,0,4).substr($tanggal,5,2);

                    $strSQL = "select akun_piutang,akun_pjasa from kop_pinj_param where kode_param = '".$jenis."' and kode_lokasi='".$kode_lokasi."'";						
                    $rdata = execute($strSQL);
                    if ($rdata->RecordCount() > 0){
                        $line = $rdata;									
                        $akunPiutang = $line->fields[0];
                        $akunPjasa = $line->fields[1];
                    }else{
                        $akunPiutang = '-';
                        $akunPjasa = '-';
                    }
                    
                    $sql[$i] = "INSERT into  kop_pinj_m_tmp (no_pinj,keterangan,tanggal,no_agg,status_bayar,jenis_angs,nilai,p_bunga,lama_bayar,jum_bayar,nilai_bunga,nilai_pokok,nilai_tagihan,kode_param,kode_lokasi,akun_piutang,akun_pjasa,periode
                    ) values ('$no_pinj','$keterangan','$tanggal','$no_agg','$status_bayar','$jenis_angs',$nilai,$p_bunga,$lama_bayar,$jum_bayar,$nilai_bunga,$nilai_pokok,$nilai_tagihan,'$jenis','$kode_lokasi','$akunPiutang','$akunPjasa','$periode')";
                        
                    array_push($exec,$sql[$i]);

                    //INSERT schedule tmp
                    $lm = $lama_bayar;
                    $so = $nilai;
                    $bunga = $p_bunga;				
                    $pokok = round($so / $lm);
                    $margin = round((($so * $bunga) / 100 )/ 12);
                    $tot = $so + ($margin * $lm);
                    $angs = round($tot / $lm);
                    $pay = $so;

                    $e_piutang= $so+$margin;
                    $e_tagihan= $angs;
                    
                    $perAwal = substr($tanggal,0,4).substr($tanggal,5,2);
                    $tgl = substr($tanggal,8,2);
                    if (intval($tgl) > 28) {
                        $tgl = "28";
                    }
                    // $dataAngsuran = [];
                    $det = array();
                    for ($x = 0;$x < $lm;$x++){
                        $j = $x +1;
                        // $tglNext = $tgl + '-' + substr($perAwal,4,2) + '-' +  substr($perAwal,0,4);
                        $tglNext = substr($perAwal,0,4).'-'.substr($perAwal,4,2).'-'.$tgl;
                        $per = substr($tglNext,0,4).''.substr($tglNext,5,2);
                        if ($j <= $jum_bayar) {
                            $noBill = $no_pinj."-".$j;					  					
                        }
                        else {
                            $noBill = "-";
                        }
                        if ($jenis_angs == "FLAT"){	
                            $saldo = $so-$pokok;
                            $det[$x] = " insert into kop_pinj_sch_tmp (no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill) values ('".$no_pinj."','".$kode_lokasi."',".$j.",".$pokok.",".$margin.",".$saldo.",'".$tglNext."','".$per."','".$noBill."')";

                            $so = $so - $pokok;
                            if ($so < $pokok) $pokok = $so;
                            else if ( $x == $lm - 2) $pokok = $so; 

                        }else{					
                            $value = annuity($bunga /12 / 100, $lm - $x, $lm, $so);	
                            $saldo = $value['totPayment']-$pokok;
                            $det[$x] = "insert into kop_pinj_sch_tmp (no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill) values ('".$no_pinj."','".$kode_lokasi."',".$j.",".$pokok.",".$margin.",".$saldo.",'".$tglNext."','".$per."','".$noBill."') ";
                            $e_tagihan = $value['payment'];
                            $pokok = $value['pokok'];
                            $margin = $value['margin'];
                        }
                        if ($x == 0) {
                            $e_bungaBln=$margin;
                            $e_pokokBln=$pokok;
                        }
                        $perAwal = getNextPeriode($perAwal);
                        // this.sg.appendData(this.dataAngsuran[i]);
                        array_push($exec,$det[$x]);
                    }

                    $upd = "update kop_pinj_m_tmp set nilai_tagihan=$e_tagihan,nilai_bunga=$e_bungaBln,nilai_pokok=$e_pokokBln where kode_lokasi='$kode_lokasi' and no_pinj='$no_pinj' ";
                    array_push($exec,$upd);
					
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

    function getDataTmp(){
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
            $query .= "select no_pinj,keterangan,tanggal,no_agg,status_bayar,jenis_angs,nilai,p_bunga,lama_bayar,jum_bayar,nilai_bunga,nilai_pokok,nilai_tagihan,kode_param
            from kop_pinj_m_tmp 
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


    function simpanData() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            $exec = array();
            $array_bukti = array();
            $error_array = array();
            $nik = $_SESSION['userLog'];
            $kode_pp = $_SESSION['kodePP'];
            $cek = $data['cek'];
            if($cek){

                $del = "delete from kop_pinj_m 
                where kode_lokasi='$kode_lokasi' and no_pinj in (select distinct no_pinj from kop_pinj_m_tmp 
                where kode_lokasi='$kode_lokasi' ) ";
                array_push($exec,$del);

                $del2 = "delete from kop_pinj_sch 
                where kode_lokasi='$kode_lokasi' and no_pinj in (select distinct no_pinj from kop_pinj_m_tmp 
                where kode_lokasi='$kode_lokasi' ) ";
                array_push($exec,$del2);

                $del3 = "delete from kop_pinjangs_d
                where kode_lokasi='$kode_lokasi' and no_pinj in (select distinct no_pinj from kop_pinj_m_tmp 
                where kode_lokasi='$kode_lokasi' ) ";
                array_push($exec,$del3);

                $del4 = "delete from kop_pinjangs_m
                where kode_lokasi='$kode_lokasi' and no_dokumen in (select distinct no_pinj from kop_pinj_m_tmp 
                where kode_lokasi='$kode_lokasi' ) ";
                array_push($exec,$del4);

                $del5 = "delete from kop_pinjbill_m
                where kode_lokasi='$kode_lokasi' and no_dokumen in (select distinct no_pinj from kop_pinj_m_tmp 
                where kode_lokasi='$kode_lokasi' ) ";
                array_push($exec,$del5);
            }

            $ins = "insert into kop_pinj_m (no_pinj,keterangan,tanggal,no_agg,status_bayar,jenis_angs,nilai,p_bunga,lama_bayar,jum_bayar,nilai_bunga,nilai_pokok,nilai_tagihan,kode_param,kode_lokasi,nik_user,tgl_input,no_ref1,periode)
            select no_pinj,keterangan,tanggal,no_agg,status_bayar,jenis_angs,nilai,p_bunga,lama_bayar,jum_bayar,nilai_bunga,nilai_pokok,nilai_tagihan,kode_param,kode_lokasi,'$nik',getdate(),'-' as no_ref1,periode
            from kop_pinj_m_tmp 
            where kode_lokasi='$kode_lokasi'
            ";
            array_push($exec,$ins);

            $ins2 = "insert into kop_pinjbill_m (no_bill,no_dokumen,keterangan,tanggal,nilai,periode,kode_pp,kode_lokasi,nik_app,nik_user,tgl_input,posted,kode_curr,kurs,modul) 
            select a.no_bill,a.no_pinj,'-' as keterangan,a.tgl_angs,b.nilai_tagihan,a.periode,'$kode_pp' as kode_pp,a.kode_lokasi,'$nik' as nik_app,'$nik' as nik_user,getdate(),'F','IDR',1,'GENBILL'
            from kop_pinj_sch_tmp a
            inner join kop_pinj_m_tmp b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bill <> '-'
            ";
            array_push($exec,$ins2);

            $ins3 = "insert into kop_pinjangs_m(no_angs,no_dokumen,keterangan,tanggal,nilai,nilai_lain,nilai_sls,modul,periode,kode_lokasi,posted,kode_pp,nik_app,nik_user,tgl_input,no_kas)
            select a.no_bill,a.no_pinj,'-' as keterangan,a.tgl_angs,b.nilai_tagihan,0,0,'PJANGS',a.periode,a.kode_lokasi,'X' as posted,'$kode_pp' as kode_pp,'$nik' as nik,'$nik' as nik,getdate(),a.no_bill
            from kop_pinj_sch_tmp a
            inner join kop_pinj_m_tmp b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bill <> '-'
            ";
            array_push($exec,$ins3);

            $ins4 = "insert into kop_pinjangs_d (no_angs,no_pinj,no_bill,akun_piutang,akun_pjasa,npokok,nbunga,kode_lokasi,dc,periode,cicilan_ke,modul,no_agg) 
            select a.no_bill,a.no_pinj,a.no_bill,b.akun_piutang,b.akun_pjasa,a.npokok,a.nbunga,a.kode_lokasi,'D',a.periode,a.cicilan_ke,'PJTUNAI',b.no_agg
            from kop_pinj_sch_tmp a
            inner join kop_pinj_m_tmp b on a.no_pinj=b.no_pinj and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bill <> '-'
            ";
            
            array_push($exec,$ins4);
            
            $ins5 = "insert into kop_pinj_sch(no_pinj,kode_lokasi,cicilan_ke,npokok,nbunga,saldo,tgl_angs,periode,no_bill)
            select a.no_pinj,a.kode_lokasi,a.cicilan_ke,a.npokok,a.nbunga,a.saldo,a.tgl_angs,a.periode,a.no_bill 
            from kop_pinj_sch_tmp a
            where a.kode_lokasi='$kode_lokasi'
            ";		
            array_push($exec,$ins5);

            $delete = "delete from kop_pinj_m_tmp 
            where kode_lokasi='$kode_lokasi'
            ";
            array_push($exec,$delete);

            $delete2 = "delete from kop_pinj_sch_tmp 
            where kode_lokasi='$kode_lokasi'
            ";
            array_push($exec,$delete2);
                    
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
            $response["bukti"] = $array_bukti; 
            // $response["error"] = $error_array; 
            //$response["exec"] = $exec; 
             
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=true; 
        }     
        
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>