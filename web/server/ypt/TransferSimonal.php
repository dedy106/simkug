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

    
    function generateKode($tabel, $kolom_acuan, $prefix, $str_format){
        $query = execute("select right(max($kolom_acuan), ".strlen($str_format).")+1 as id from $tabel where $kolom_acuan like '$prefix%'");
        $kode = $query->fields[0];
        $id = $prefix.str_pad($kode, strlen($str_format), $str_format, STR_PAD_LEFT);
        return $id;
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

    function getNoBukti() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $perusahan = dbResultArray("select d.no_bill,d.keterangan
            from prb_proyek a 
            inner join prb_prbill_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi 
            inner join prb_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi 
            inner join prb_rabapp_m x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi and isnull(d.no_transfer,'-') = '-' ");
            $response["daftar"] = $perusahan;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getData() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data['kode_lokasi'];
            $no_bill=$data['no_bukti'];
            $data = dbResultArray("select convert(varchar(10),d.tanggal,121) as date_no,d.tgl_input as tgl_invoice,e.nama,e.npwp,e.jabatan as posisi,e.alamat as alamat,a.nama_rek,a.bank as nama_bank,'12345' as atasan,'Direk' as jabatan,a.no_rek,d.keterangan as untuk_pembayaran,d.nilai as jumlah,d.nilai_ppn as ppn,d.diskon as discount,d.nilai-d.diskon+d.nilai_ppn as total,'satu juta rupiah' as terbilang,'15871747' as usercreate,'899762' as no_faktur,0 as groups ,0 as status_bayar,'' as tgl_bayar,a.tgl_mulai as tgl_pelaksanaan,a.tgl_selesai as end_pelaksanaan,'89772' as surat,2 as status,'CC091' as code_cc,'4482' as code_unit,'918321' as no_referensi,'N' as group_pajak,d.no_bill as no_invoice
            from prb_proyek a 
            inner join prb_prbill_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi 
            inner join prb_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi 
            inner join prb_rabapp_m x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi
            inner join prb_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi
            where d.no_bill='$no_bill' and a.kode_lokasi='$kode_lokasi' and isnull(d.no_transfer,'-') = '-'  ");
            $response["daftar"] = $data;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function sendData() {
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $data["kode_lokasi"];
            $periode = $data["periode"];
            $no_bill=$data['no_bukti'];

            $sql = "select convert(varchar(10),d.tanggal,121) as date_no,d.tgl_input as tgl_invoice,e.nama,e.npwp,e.jabatan as posisi,e.alamat as alamat,a.nama_rek,a.bank as nama_bank,'12345' as atasan,'Direk' as jabatan,a.no_rek,d.keterangan as untuk_pembayaran,d.nilai as jumlah,d.nilai_ppn as ppn,d.diskon as discount,d.nilai-d.diskon+d.nilai_ppn as total,'satu juta rupiah' as terbilang,'15871747' as usercreate,'899762' as no_faktur,0 as groups ,0 as status_bayar,'' as tgl_bayar,a.tgl_mulai as tgl_pelaksanaan,a.tgl_selesai as end_pelaksanaan,'89772' as surat,2 as status,'CC091' as code_cc,'4482' as code_unit,'918321' as no_referensi,'N' as group_pajak,d.no_bill as no_invoice
            from prb_proyek a 
            inner join prb_prbill_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi 
            inner join prb_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi 
            inner join prb_rabapp_m x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi
            inner join prb_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi
            where d.no_bill='$no_bill' and a.kode_lokasi='$kode_lokasi' and isnull(d.no_transfer,'-') = '-' ";
            $res = dbRowArray($sql);
            if(count($res) > 0){

                $fields = http_build_query($res);
    
                $url="http://simonal.ypt.or.id/api_tax.php";
                $curlHandle = curl_init();
                curl_setopt($curlHandle, CURLOPT_URL, $url);
                curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $fields);
                curl_setopt($curlHandle, CURLOPT_HEADER, FALSE);
                curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, TRUE);
                curl_setopt($curlHandle, CURLOPT_TIMEOUT,30);
                curl_setopt($curlHandle, CURLOPT_POST, TRUE);
                $response['data'] = json_decode(curl_exec($curlHandle),true);
                curl_close($curlHandle);
                $exec = array();
                if(isset($response['data']['no_inv']) && ($response['data']['no_inv']  != "" || $response['data']['no_inv'] != "-" || $response['data']['no_inv']  != null) ){
                    $tmp = $response['data']['alert'];
                    $id = generateKode("transfer_simonal", "no_transfer", $kode_lokasi."TF-", "0001");
                    $ins = "insert into transfer_simonal (kode_lokasi,no_transfer,keterangan,tgl_transfer,total_rows) values ('$kode_lokasi','$id','TRANSFER SIMONAL',getdate(),".count($res).") ";
                    array_push($exec,$ins);
                    $upd = "update prb_prbill_m set no_transfer='$id' where kode_lokasi='$kode_lokasi' and no_bill='$no_bill' and isnull(no_transfer,'-') ='-' ";
                    array_push($exec,$upd);
    
                    $exc = executeArray($exec);
                    if($exc){
                        $tmp.=". Insert log sukses. No Inv=".$response['data']['no_inv'];
                    }else{
                        
                        $tmp.=". Insert log gagal";
                    }
                }else{
                    $tmp = $response['data']['alert'];
                }
            }else{
                $tmp = "Data Bill Not Found";
            }


            $response["message"] = $tmp;
            $response["status"] = true; 
            $response["sql"]=$exec;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = true; 
        }     
        
        // header('Content-Type: application/json');
        echo json_encode($response);
    }


    function cek(){
        // $res =array(
        //     "TaxInvoice"=>
        //     array ( 
        //         "date_no" => "2019-11-12",
        //         "no_invoice" => "11-BIL1911.0001",
        //         "tgl_invoice" => "2019-11-12 00:00:00.000",
        //         "nama" => "FROM SAI test",
        //         "npwp" => "000000000000000",
        //         "posisi"=> "U.P. ADHELIA PRAMITHA N.",
        //         "alamat"=> "PESONA BALI RESIDENCE",
        //         "nama_rek"=> "Universitas Telkom",
        //         "nama_bank"=> "BNI",
        //         "atasan"=> "Apriani Musfiroh",
        //         "jabatan"=>"Kabag. Perbendaharaan",
        //         "no_rek"=>"8321066201900018",
        //         "untuk_pembayaran"=>"Pendaftaran Peserta Sertifikasi Big Data Analyst",
        //         "jumlah"=>"30000000",
        //         "ppn"=>"3000000",
        //         "discount"=>"0",
        //         "total"=>"33000000",
        //         "terbilang"=>"Tiga Puluh Tiga Juta     Rupiah",
        //         "usercreate"=>"08820025",
        //         "no_faktur"=>"",
        //         "groups"=>"0",
        //         "status_bayar"=>"0",
        //         "tgl_bayar"=>"0000-00-00",
        //         "tgl_pelaksanaan"=>"2019-12-12",
        //         "end_pelaksanaan"=>"2019-12-12",
        //         "surat"=>"",
        //         "status"=>"2",
        //         "code_cc"=>"C00B010",
        //         "code_unit"=>"TEL006",
        //         "no_referensi"=>"",
        //         "group_pajak"=>"N",
        //         "tahun_piutang"=>"0",
        //         "approved"=>"02770268",
        //         "date_approve"=>NULL,
        //         "key_number"=>NULL,
        //         "versi"=> "0",
        //         )
        //     );
        //     var_dump($res);
        // $nilai1=0;$nilai2=100;$nilai3=4;
        // $ch = curl_init();
        // curl_setopt($ch, CURLOPT_URL, "http://saiweb.simkug.com/api/belajar/Siswa.php?fx=tesCurl");
        // curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        //     'Content-Type: application/json; charset=utf-8'
        // ));
        // curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        // curl_setopt($ch, CURLOPT_HEADER, FALSE);
        // curl_setopt($ch, CURLOPT_POST, TRUE);
        // curl_setopt($ch, CURLOPT_POSTFIELDS, "data1=".$nilai1."&data2=".$nilai2."&data3=".$nilai3);
        // curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
       
        
        
        session_start();
        getKoneksi();
        $data=$_POST;          
        $kode_lokasi = $data["kode_lokasi"];
        $periode = $data["periode"];
        $no_bill=$data['no_bukti'];
        
        $sql = "select convert(varchar(10),d.tanggal,121) as date_no,d.tgl_input as tgl_invoice,e.nama,e.npwp,e.jabatan as posisi,e.alamat as alamat,a.nama_rek,a.bank as nama_bank,'12345' as atasan,'Direk' as jabatan,a.no_rek,d.keterangan as untuk_pembayaran,d.nilai as jumlah,d.nilai_ppn as ppn,d.diskon as discount,d.nilai-d.diskon+d.nilai_ppn as total,'satu juta rupiah' as terbilang,'15871747' as usercreate,'899762' as no_faktur,0 as groups ,0 as status_bayar,'' as tgl_bayar,a.tgl_mulai as tgl_pelaksanaan,a.tgl_selesai as end_pelaksanaan,'89772' as surat,2 as status,'CC091' as code_cc,'4482' as code_unit,'918321' as no_referensi,'N' as group_pajak,d.no_bill as no_invoice
        from prb_proyek a 
        inner join prb_prbill_m d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi 
        inner join prb_proyek_jenis c on a.kode_jenis=c.kode_jenis and a.kode_lokasi=c.kode_lokasi 
        inner join prb_rabapp_m x on a.kode_proyek=x.kode_proyek and a.kode_lokasi=x.kode_lokasi
        inner join prb_cust e on a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi
        where d.no_bill='$no_bill' and a.kode_lokasi='$kode_lokasi' and isnull(d.no_transfer,'-') = '-' ";
        $res = dbRowArray($sql);
        
        $fields = http_build_query($res);
        // $result = curl_exec($ch);
        $url="http://simonal.ypt.or.id/api_tax.php";
        $curlHandle = curl_init();
        curl_setopt($curlHandle, CURLOPT_URL, $url);
        curl_setopt($curlHandle, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($curlHandle, CURLOPT_HEADER, FALSE);
        curl_setopt($curlHandle, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($curlHandle, CURLOPT_TIMEOUT,30);
        curl_setopt($curlHandle, CURLOPT_POST, TRUE);
        $response['sql']=$sql;
        $response['data'] = json_decode(curl_exec($curlHandle),true);
        curl_close($curlHandle);
        echo json_encode($response);
        
    }


?>