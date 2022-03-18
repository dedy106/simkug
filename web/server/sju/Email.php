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
        include_once($root_lib."web/lib/libcurl.php");
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

    function getPIC(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $_POST['periode'];
            
            $data = $_POST;
            $query = '';
            $output = array();

            $col_array = array('kode_pic','tgl_selesai');
            $db_col_name = array('a.kode_pic','a.tgl_selesai');
            $where = "where a.kode_lokasi='$kode_lokasi'";
            $this_in = "";
            for($i = 0; $i<count($col_array); $i++){
                if(ISSET($_POST[$col_array[$i]][0])){
                    if($_POST[$col_array[$i]][0] == "range" AND ISSET($_POST[$col_array[$i]][1]) AND ISSET($_POST[$col_array[$i]][2])){
                        if($col_array[$i] == 'tgl_selesai'){
                            $where .= " and (".$db_col_name[$i]." between '".reverseDate($_POST[$col_array[$i]][1])."' AND '".reverseDate($_POST[$col_array[$i]][2])."') ";
                        }else{
                            $where .= " and (".$db_col_name[$i]." between '".$_POST[$col_array[$i]][1]."' AND '".$_POST[$col_array[$i]][2]."') ";
                        }
                    }else if($_POST[$col_array[$i]][0] == "=" AND ISSET($_POST[$col_array[$i]][1])){
                        
                        if($col_array[$i] == 'tgl_selesai'){
                            $where .= " and ".$db_col_name[$i]." = '".reverseDate($_POST[$col_array[$i]][1])."' ";
                        }else{
                            $where .= " and ".$db_col_name[$i]." = '".$_POST[$col_array[$i]][1]."' ";
                        }
                    }else if($_POST[$col_array[$i]][0] == "in" AND ISSET($_POST[$col_array[$i]][1])){
                        
                        if($col_array[$i] == 'tgl_selesai'){

                            $tmp = explode(",",reverseDate($_POST[$col_array[$i]][1]));
                        }else{
                            $tmp = explode(",",$_POST[$col_array[$i]][1]);
                        }

                        for($x=0;$x<count($tmp);$x++){
                            if($x == 0){
                                $this_in .= "'".$tmp[$x]."'";
                            }else{
            
                                $this_in .= ","."'".$tmp[$x]."'";
                            }
                        }
                        $where .= " and ".$db_col_name[$i]." in ($this_in) ";
                    }
                }
            }
            //$where
            $response['tgl'] = $where;
            $query = "select b.email,a.kode_pic,b.nama
            from (select a.kode_pic,a.kode_lokasi
            from sju_polis_m a 					 
            inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
            inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
            inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
            $where
            group by a.kode_pic,a.kode_lokasi
                )a
            inner join sju_pic b on a.kode_pic=b.kode_pic and a.kode_lokasi=b.kode_lokasi
            order by a.kode_pic";

            $response["data"] = dbResultArray($query);
            $response["query"] = $query;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function send(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            
            $email = 0;
            try{

                $kode_lokasi = $_SESSION['lokasi'];
                $url = "https://api.simkug.com/api/sju/login";
                $url2 = "https://api.simkug.com/api/sju/send-email";
    
                $fields = array(
                    "nik" => $_SESSION['userLog'],
                    "password" => $_SESSION['pass']
                );

                $output = curl($url,$fields); 
                $token = $output->token;

                $col_array = array('tgl_selesai');
                $db_col_name = array('a.tgl_selesai');
                $where = "where a.kode_lokasi='$kode_lokasi'";
                $this_in = "";
                for($i = 0; $i<count($col_array); $i++){
                    if(ISSET($_POST[$col_array[$i]][0])){
                        if($_POST[$col_array[$i]][0] == "range" AND ISSET($_POST[$col_array[$i]][1]) AND ISSET($_POST[$col_array[$i]][2])){
                            $where .= " and (".$db_col_name[$i]." between '".$_POST[$col_array[$i]][1]."' AND '".$_POST[$col_array[$i]][2]."') ";
                        }else if($_POST[$col_array[$i]][0] == "=" AND ISSET($_POST[$col_array[$i]][1])){
                            $where .= " and ".$db_col_name[$i]." = '".$_POST[$col_array[$i]][1]."' ";
                        }else if($_POST[$col_array[$i]][0] == "in" AND ISSET($_POST[$col_array[$i]][1])){
                            $tmp = explode(",",$_POST[$col_array[$i]][1]);
                            for($x=0;$x<count($tmp);$x++){
                                if($x == 0){
                                    $this_in .= "'".$tmp[$x]."'";
                                }else{
                
                                    $this_in .= ","."'".$tmp[$x]."'";
                                }
                            }
                            $where .= " and ".$db_col_name[$i]." in ($this_in) ";
                        }
                    }
                }
                
                $postfields = array();
                $message = "";
                $konten="";
                $err = 0;
                if(count($_POST['kode_pic']) > 0){
                    
                    for($i=0; $i<count($_POST['kode_pic']); $i++) {
                        $konten="";
                        $konten.="<div align='center'>"; 
                        $konten.="<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
                        <tr bgcolor='#CCCCCC'>
                        <td width='30'  align='center' class='header_laporan'>No</td>
                        <td width='100'  align='center' class='header_laporan'>No Polis</td>
                        <td width='150'  align='center' class='header_laporan'>No Dokumen</td>
                        <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
                        <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
                        <td width='150'  align='center' class='header_laporan'>Tertanggung</td>
                        <td width='150'  align='center' class='header_laporan'>Penanggung</td>
                        <td width='50'  align='center' class='header_laporan'>Curr</td>
                        <td width='100'  align='center' class='header_laporan'>Sum Insured</td>
                        <td width='90'  align='center' class='header_laporan'>NIlai Premi</td>
                        <td width='150'  align='center' class='header_laporan'>Occup. of Risk</td>
                        <td width='150'  align='center' class='header_laporan'>Object of Risk</td>
                        <td width='150'  align='center' class='header_laporan'>Loc. of Risk</td>
                        </tr>  ";
						
						//$where and a.kode_pic='".$_POST['kode_pic'][$i]."'
						
                        $sql = "select 'INPROG' as status,a.no_polis,a.no_dok,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,b.kode_cust+' - '+b.nama as cust,c.kode_vendor+' - '+c.nama as vendor,a.kode_curr,a.total, 
                        a.n_premi,a.occup,a.objek,a.lokasi,a.cover,a.kode_curr 
                        from sju_polis_m a 					 
                        inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
                        inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
                        inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
                        left join sju_renew_d d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi 
						$where
                        order by a.no_polis ";
                        $qr = dbResultArray($sql);
                        $no=1;
                        $detail = "";
                        if(count($qr) > 0){
                            for($j=0; $j<count($qr); $j++) {
                                $detail.="<tr >
                                <td class='isi_laporan' align='center'>$no</td>
                                <td class='isi_laporan'>".$qr[$j]['no_polis']."</td>
                                <td class='isi_laporan'>".$qr[$j]['no_dok']."</td>
                                <td class='isi_laporan'>".$qr[$j]['tgl_mulai']."</td>
                                <td class='isi_laporan'>".$qr[$j]['tgl_selesai']."</td>
                                <td class='isi_laporan'>".$qr[$j]['cust']."</td>
                                <td class='isi_laporan'>".$qr[$j]['vendor']."</td>
                                <td class='isi_laporan'>".$qr[$j]['kode_curr']."</td>
                                <td class='isi_laporan' align='right'>".number_format($qr[$j]['total'],0,",",".")."</td>
                                <td class='isi_laporan' align='right'>".number_format($qr[$j]['n_premi'],0,",",".")."</td>
                                <td class='isi_laporan'>".$qr[$j]['occup']."</td>
                                <td class='isi_laporan'>".$qr[$j]['objek']."</td>
                                <td class='isi_laporan'>".$qr[$j]['lokasi']."</td>
                                </tr>";
                                $no++;
                            }
        
                            $konten.= $detail."</table><br>";
                            $konten.= "</div>";
                            
                            $postfields = array(
                                'from' => 'devsaku5@gmail.com',
                                'to' => $_POST['email'][$i],
                                'html' => $konten,
                                'text' => '-',
                                'subject' => 'Renewal Notice [SAI]'
                            );

                            if ($_POST['email'][$i] != "-")
                            {
                                $numSent = curl_simpan($url2,$token,$postfields);
                                $message[] = "Email ".$_POST['kode_pic'][$i]." - ".$_POST['nama'][$i]." berhasil terkirim"; 
                                $email++;
                            }
                            else
                            {
                                $message[] = "Data email ".$_POST['kode_pic'][$i]." - ".$_POST['nama'][$i]." belum di setting";
                                $err++;
                            }
                        }
                        
                    }

                    $sts = true;
                    $msg = "Email terkirim. Jumlah terkirim $email, jumlah tidak terkirim $err ";
                }else{
                    $sts = false;
                    $msg = "Data PC tidak valid ";
                }

            } catch (exception $e) { 
                error_log($e->getMessage());		
                $msg = " error " .  $e->getMessage();
                $sts = false;
            } 	
            $response['message'] = $msg;
            $response['status'] = $sts;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>