<?php

    function getKoneksi(){
        //$root_lib=realpath($_SERVER["DOCUMENT_ROOT"])."/";
		$root_lib="/var/www/html/yakes/web/";
        include_once($root_lib."lib/koneksi3.php");
        include_once($root_lib."lib/helpers.php");
        include_once($root_lib."lib/libcurl.php");
    }

    function curl_post($token,$id,$url){
        try{
            $ch2 = curl_init(); 
            $postfields = array();
            $postfields["id"] = $id;

            $ch2 = curl_init(); 
            curl_setopt($ch2, CURLOPT_URL,$url);
            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch2, CURLOPT_HEADER, FALSE);
            curl_setopt($ch2, CURLOPT_POST, TRUE);
            curl_setopt($ch2, CURLOPT_POSTFIELDS, $postfields);
            curl_setopt($ch2, CURLOPT_FAILONERROR, true);
            curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
                'Authorization: Bearer '.$token //REST API KEY 
            ));
            curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
            $res = json_decode(curl_exec($ch2));
            if (curl_errno($ch2)) {
                $error_msg = curl_error($ch2);
            }else{
                $error_msg = "sukses";
            }
            curl_close($ch2);
            $sts = $res->status;
            $msg = $res->message;
            $msg .= $error_msg;

        } catch (exception $e) { 
            error_log($e->getMessage());		
            $msg = " error " .  $e->getMessage();
            $sts = false;
            $res = array();
        } 	
        $result['status'] = $sts;
        $result['message'] = $msg;
        $result['data'] = $res;
        return $result;
    }

    function simpanTmp(){
        // getKoneksi();
        $url = "https://api.simkug.com/api/yakes-auth/login";
        $url2 = "https://api.simkug.com/api/yakes-trans/parse-saham";
        
        $fields = array(
            "nik" => "yakes",
            "password" => "saisai"
        );

        $output = curl($url,$fields); 
        $response['output'] = $output;
        $token = $output->token;
        $tanggal = date('Y-m-d', strtotime( $d . " -1 days"));
        $periode = substr($tanggal,0,4).substr($tanggal,5,2);
        $sql = "delete from inv_shm_harga_tmp2 where nik_user='919006' ; ";
        $begin = "SET NOCOUNT on;
        BEGIN tran;
        ";
        $commit = "commit tran;";
        $exec = array();

        $query = "select * from (select a.kode_saham as kode,case when a.kode_saham <> 'ihsg' then a.kode_saham+':IJ' else 'JCI:IND' end as kode_bb,case when a.kode_saham <> 'ihsg' then 'SHM' else 'JCI' end as jenis from inv_saham a
        union all
        select a.kode_rd  as kode,a.kode_bb,'RD' as jenis from inv_rd a where kode_bb <> '-'
        ) a
        order by a.jenis desc,a.kode ";
        $data = execute($query,$err);
        $kode = "";
        $listSaham = array();
        $listSaham2 = array();
        $listJenis = array();
        $i=1;
        $x=0;
        $c=0;
        $total = 0;
        $sts_loop = true;
        $msg_loop = "";
        while($row = $data->FetchNextObject($toupper = false)){
            array_push($listSaham2,$row->kode);
            array_push($listJenis,$row->jenis);
            if($x == 0){
                $kode .= "$row->kode_bb";
            }else{
                $kode .= ",$row->kode_bb";
            }
            $x++;
            if($i % 20 == 0){
                $kode = strtoupper($kode);
                $output2 = curl_post($token,$kode,$url2);
                $response['output2'][] = $output2;
                if(!$output2['status']){
                    $sts_loop = false;
                    $msg_loop .= "gagal di looping 20 ke ".$c;
                }else{
                    
                    $res = (array)$output2['data']->daftar->result;
                    $listSaham = explode(",", $kode);
                    $rd =0;
                    foreach($listSaham as $key => $kd)
                    {
                        $result = json_decode(json_encode($res[$kd]));
                        if($listJenis[$rd] == "SHM"){
                            $close = (isset($result->close) ? floatval($result->close) : 0);
                        }else{
                            $close = (isset($result->last) ? floatval($result->last) : 0);
                        }
                        $kd_saham = $listSaham2[$rd];
                        $sql.= "insert into inv_shm_harga_tmp2(kode,periode,tanggal,h_wajar,tgl_input,nik_user,jenis) values ('".$kd_saham."','$periode','$tanggal',$close,getdate(),'919006','".$listJenis[$rd]."'); ";
                        $rd++;
                    }
                    array_push($exec,$begin.$sql.$commit);
                    $insert = executeArray($exec,$err);
                    if($err == null){
                        $sts_loop = true;
                    }else{
                        $sts_loop = false;
                        $msg_loop .= "Load data gagal disimpan di looping 20 ke ".$c;
                    }
                    // $response['exec'][] = $exec;
                    $total +=20;
                }
                $exec = array();
                $listSaham = array();
                $listSaham2 = array();
                $listJenis = array();
                $kode = "";
                $x = 0;
                $c++;
            }
            if($i == $data->RecordCount() && ($i % 20 != 0) ){
                $kode = strtoupper($kode);
                $output2 = curl_post($token,$kode,$url2);
                $response['output2'][] = $output2;
                if(!$output2['status']){
                    $sts_loop = false;
                    $msg_loop .= "gagal di looping 20 ke ".$c;
                }else{
                    
                    $res = (array)$output2['data']->daftar->result;
                    $listSaham = explode(",", $kode);
                    $rd = 0;
                    foreach($listSaham as $key => $kd)
                    {
                        $result = json_decode(json_encode($res[$kd]));
                        if($listJenis[$rd] == "SHM"){
                            $close = (isset($result->close) ? floatval($result->close) : 0);
                        }else{
                            $close = (isset($result->last) ? floatval($result->last) : 0);
                        }
                        $kd_saham = $listSaham2[$rd];
                        $sql.= "insert into inv_shm_harga_tmp2(kode,periode,tanggal,h_wajar,tgl_input,nik_user,jenis) values ('".$kd_saham."','$periode','$tanggal',$close,getdate(),'919006','".$listJenis[$rd]."'); ";
                        $rd++;
                    }
                    array_push($exec,$begin.$sql.$commit);
                    $insert = executeArray($exec,$err);
                    if($err == null){
                        $sts_loop = true;
                    }else{
                        $sts_loop = false;
                        $msg_loop .= "Load data gagal disimpan di looping 20 ke ".$c;
                    }
                    // $response['exec'][] = $exec;
                    $total +=$x;
                }
                $exec = array();
                $listSaham = array();
                $listSaham2 = array();
                $listJenis = array();
                $kode = "";
                $x = 0;
                $c++;
            }
            $i++;
        }
        
        $response["message"] = "sukses. Total seluruh data: ".$data->RecordCount().". error: ".$msg_loop.". Total berhasil: ".$total;
        $response["status"] = true;
        echo json_encode($response);
        
    }

    function simpan() {
        // getKoneksi();
        $tgl_seb = date('Y-m-d', strtotime( $d . " -1 days"));
        $periode = substr($tgl_seb,0,4).substr($tgl_seb,5,2);
        $begin = "SET NOCOUNT on;
        BEGIN tran;
        ";
        $commit = "commit tran;";
        
        $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'".substr($periode,0,4)."-".substr($periode,4,2)."-01')+1,0)) ,112),7,2) as tglakhir " ;
        $data = dbRowArray($sql);
        $jmlHari = Intval($data["tglakhir"]) +1;
        $nik_user = "919006";
        
        // SAHAM & JCI
        $dataSHM = array();
        $sql3 = "select * from inv_shm_harga_tmp2 where nik_user ='$nik_user' and jenis in ('SHM','JCI') ";
        $dataSHM = dbResultArray($sql3);
        $exec = array();
        
        $dd = intval(date('d')) - 1;
        $response['dd'] = $dd;
        if($dd > 0){
            
            $tgl_seb = date('Y-m-d', strtotime( $d . " -1 days"));
            $del = "delete from inv_shm_harga where tanggal >='".$tgl_seb."' ";
            array_push($exec,$del);
            foreach ($dataSHM as $row){														    
                for($j=$dd; $j < $jmlHari; $j++){	
                    $k = "-" . ($j < 10 ? "0":"" ) . $j;							
                    $tgl = substr($periode,0,4)."-".substr($periode,4,2).$k;
                    $harga = floatval($row["h_wajar"]);
                    
                    $sqlx = "insert into inv_shm_harga (periode,tanggal,kode_saham,h_wajar) values  ('".$periode."','".$tgl."','".$row['kode']."',".$harga."); ";	
                    array_push($exec,$begin.$sqlx.$commit);			
                }
            }
        }else{
            $tgl_seb = date('Y-m-d', strtotime( $d . " -1 days"));
            $del = "delete from inv_shm_harga where tanggal ='".$tgl_seb."' ";
            array_push($exec,$del);
            foreach ($dataSHM as $row){														    
                $sqlx = "insert into inv_shm_harga (periode,tanggal,kode_saham,h_wajar) values  ('".$row["periode"]."','".$row["tanggal"]."','".$row['kode']."',".$row["h_wajar"]."); ";	
                array_push($exec,$begin.$sqlx.$commit);			
            }
        }
        
        // REKSADANA 
        
        $dataRD = array();
        $sql3 = "select * from inv_shm_harga_tmp2 where nik_user ='$nik_user' and jenis ='RD' ";
        $dataRD = dbResultArray($sql3);
        $dd = intval(date('d')) - 1;
        $response['dd'] = $dd;
        if($dd > 0){
            
            $tgl_seb = date('Y-m-d', strtotime( $d . " -1 days"));
            $del = "delete from inv_rd_harga where tanggal >='".$tgl_seb."' ";
            array_push($exec,$del);
            foreach ($dataRD as $row){														    
                for($j=$dd; $j < $jmlHari; $j++){	
                    $k = "-" . ($j < 10 ? "0":"" ) . $j;							
                    $tgl = substr($periode,0,4)."-".substr($periode,4,2).$k;
                    $harga = floatval($row["h_wajar"]);
                    
                    $sqlx = "insert into inv_rd_harga (periode,tanggal,kode_rd,h_wajar) values  ('".$periode."','".$tgl."','".$row['kode']."',".$harga."); ";	
                    array_push($exec,$begin.$sqlx.$commit);			
                }
            }
        }else{
            $tgl_seb = date('Y-m-d', strtotime( $d . " -1 days"));
            $del = "delete from inv_rd_harga where tanggal ='".$tgl_seb."' ";
            array_push($exec,$del);
            foreach ($dataSHM as $row){														    
                $sqlx = "insert into inv_rd_harga (periode,tanggal,kode_rd,h_wajar) values  ('".$row["periode"]."','".$row["tanggal"]."','".$row['kode']."',".$row["h_wajar"]."); ";	
                array_push($exec,$begin.$sqlx.$commit);			
            }
        }
        
        //$del2 = "delete from inv_shm_harga_tmp2 ";
        //array_push($exec,$del2);
        
        
        
        // $stor = "exec sp_gen_saham_kkp '".substr($periode,0,4)."-".substr($periode,4,2)."-01'";
        // array_push($exec,$stor);
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

        echo json_encode($response);
    }
	ini_set('display_errors', 'Off');
    getKoneksi();
    simpanTmp();
    simpan();


?>