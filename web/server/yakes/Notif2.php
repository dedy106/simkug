<?php

    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        case 'POST':
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


    function register(){
        getKoneksi();
        $dbconn = db_Connect();

        $db_token["nik"] = $_POST["nik"];
        $db_token["token"] = $_POST["token"];
        $db_token["kode_lokasi"] = $_POST["kode_lokasi"];

        $db_token["waktu_pb"] = '3';
        $db_token["ulang"] = '-';

        $db_token["tgl_register"] = date('Y-m-d H:i:s');

        $res = dbResultArray("select nik,kode_lokasi from inv_notif_token where nik='".$_POST['nik']."' and kode_lokasi='".$_POST['kode_lokasi']."' and token='".$_POST['token']."' ");
        $exec=array();
        if(count($res)>0){
            // $del = "delete from inv_notif_token where nik='".$_POST['nik']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
            // array_push($exec,$del);
            // $res2 = executeArray($exec);
            $response['message'] = 'Already registered';
        }else{
            $token_sql = $dbconn->AutoExecute('inv_notif_token', $db_token, 'INSERT');
            if($token_sql){
                $response['message'] = "ID registered";
            }else{
                $response['message'] = "Failed to register";
            }
        }

        echo json_encode($response);
    }


    function getNotif(){
        getKoneksi();

        $tmp = explode("|",$_GET['param']);

        $kode_lokasi=$tmp[0];
        $nik=$tmp[1];
        $token=$tmp[2];
        $kode_plan=$tmp[3];
        $tgl = $tmp[4];
        $sql2 = "select token,waktu_pb,ulang from inv_notif_token where kode_lokasi='".$kode_lokasi."' and nik='".$nik."' and token='$token' ";
        $res = dbRowArray($sql2);
        $waktu = intval($res['waktu_pb']);
        if($res['ulang'] == '-' OR $res['ulang'] == 'Tidak'){
            $ulang = '-';
        }else{
            $ulang = intval($res['ulang'])*60;
        }
        $response["waktu"]=$waktu;
        $response["ulang"]=$res['ulang'];

        $sql = "select 
        bb.nama,b.nama as cabang,a.nilai,case when a.jenis='DEPOSITO' then 'BERJANGKA' else 'DOC' end as jenis,    
        convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,datediff(day,a.tgl_mulai,a.tgl_selesai) as jml_hari
        ,datediff(month,a.tgl_mulai,a.tgl_selesai) as jml_bln,a.p_bunga,
        a.no_depo,a.kode_kelola,bb.gambar,datediff(day,getdate(),a.tgl_selesai) as jatuhtempo,d.nama as nama_kelola	   
        from inv_depo2_m a
        inner join inv_bank b on a.bdepo=b.kode_bank
        inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
        inner join inv_kelola d on a.kode_kelola=d.kode_kelola
        left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= getdate()
        where 
        a.kode_lokasi='$kode_lokasi' and a.kode_plan='1' 
        and c.no_depo is null and datediff(day,getdate(),a.tgl_selesai) = $waktu";

        $daftar = dbResultArray($sql);
        $exec = array();
        for($i=0;$i<count($daftar);$i++){
            $sqlcek = "select * from inv_notif_m where kode_lokasi='$kode_lokasi' and nik='$nik' and no_ref='".$daftar[$i]['no_depo']."' and token='$token' ";
            $cek =dbResultArray($sqlcek);
            if(count($cek) > 0){
                $jumins = false;
            }else{
                
                $title = "Deposito Jatuh Tempo";
                $content      = array(
                    "en" => "Deposito dengan nomor transaksi ".$daftar[$i]['no_depo']." akan jatuh tempo pada ".$daftar[$i]["tgl_selesai"]
                );
            
                $fields = array(
                    'app_id' => "86207625-efbc-4f50-8f19-ad3b7db93db7", //appid inves yakes
            
                    // // per token id
                    'include_player_ids' => array($res['token']),
                    'data' => array(
                        "foo" => "bar"
                    ),
                    'contents' => $content,
                    'headings' => array(
                        'en' => $title
                    )
                );
                
                $fields = json_encode($fields);
                $response['fields']=$fields;
                // print("\nJSON sent:\n");
                // print($fields);
                $ch = curl_init();
                curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
                curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                    'Content-Type: application/json; charset=utf-8',
                    'Authorization: Basic NDkzZWJhNGUtM2Y0My00ZWVjLWJkNDQtMjE5Yzk5NmE4Yzkw' //REST API KEY ONESIGNAL
                ));
                curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                curl_setopt($ch, CURLOPT_HEADER, FALSE);
                curl_setopt($ch, CURLOPT_POST, FALSE);
                curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
                curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
                
                $response["notif"] = curl_exec($ch);
                curl_close($ch);

                $jumins = true;
                $ins = "insert into inv_notif_m (kode_lokasi,judul,isi,nik,no_ref,flag_aktif,flag_baca,tgl_input,token) values ('".$kode_lokasi."','$title','".$content["en"]."','$nik','".$daftar[$i]['no_depo']."','1','0',getdate(),'".$res['token']."') ";
                array_push($exec,$ins);

                if($ulang != '-'){
                date_default_timezone_set('UTC');
                $newTime = date("M d Y H:i:s e+0000",strtotime(date("Y-m-d H:i:s")."+$ulang minutes"));
                $sendAfter = (string)$newTime;
                    $fields = array(
                        'app_id' => "86207625-efbc-4f50-8f19-ad3b7db93db7", //appid yakes
                        'include_player_ids' => array($res['token']),
                
                
                        'data' => array(
                            "foo" => "bar"
                        ),
                        'contents' => $content,
                        'headings' => array(
                            'en' => $title
                        ),
                        'send_after' => $sendAfter
                        // 'web_buttons' => $hashes_array
                    );
                    
                    $fields = json_encode($fields);
                    // print("\nJSON sent:\n");
                    // print($fields);
                    
                    $ch = curl_init();
                    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
                    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
                        'Content-Type: application/json; charset=utf-8',
                        'Authorization: Basic NDkzZWJhNGUtM2Y0My00ZWVjLWJkNDQtMjE5Yzk5NmE4Yzkw' //REST API KEY ONESIGNAL
                    ));
                    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
                    curl_setopt($ch, CURLOPT_HEADER, FALSE);
                    curl_setopt($ch, CURLOPT_POST, TRUE);
                    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
                    curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
                    
                    $response["notif2"] = curl_exec($ch);
                    curl_close($ch);
                }
            }

        }

        if($jumins){

            $insert = executeArray($exec); 
            if($insert){
                $response["message"] = "insert notif sukses";
            }else{
                $response["message"] = "insert notif gagal";
            }
        }

        $response["daftar"]=dbResultArray("select * from inv_notif_m where kode_lokasi='$kode_lokasi' and nik='$nik' and flag_aktif='1' and token='".$res['token']."' ");
        $response["unred"]=dbResultArray("select * from inv_notif_m where kode_lokasi='$kode_lokasi' and nik='$nik' and flag_aktif='1' and flag_baca = '0' $filter $filter2 and token='".$res['token']."' ");

        $response["status"]=true;
        // $response["sql"]=$sql2;
        $response["exec"]=$exec;
        $response["sqlcek"]=count($cek);
        $response["res"]=$res["token"];
        echo json_encode($response);

    }

    function getNotif2(){
        getKoneksi();

        $tmp = explode("|",$_GET['param']);

        $kode_lokasi=$tmp[0];
        $nik=$tmp[1];
        $fil=$tmp[2];
        $token=$tmp[3];
        if($fil == "semua"){
            $filter = "";
        }else if($fil == "belum"){
            $filter = " and flag_baca = '0' ";
        }else if($fil == "sudah"){
            $filter = " and flag_baca = '1' ";
        }
       
        $response["daftar"]=dbResultArray("select * from inv_notif_m where kode_lokasi='$kode_lokasi' and nik='$nik' and flag_aktif='1' $filter and token='$token' ");
        $response["unred"]=dbResultArray("select * from inv_notif_m where kode_lokasi='$kode_lokasi' and nik='$nik' and flag_aktif='1' and flag_baca = '0' $filter and token='$token' ");
        $response["status"]=true;
        echo json_encode($response);

    }

    function getDetailNotif(){
        getKoneksi();

        $tmp = explode("|",$_GET['param']);

        $kode_lokasi=$tmp[0];
        $nik=$tmp[1];
        $fil=$tmp[2];
        $kode=$tmp[3];
        $token=$tmp[4];
        if($fil == "semua"){
            $filter = "";
        }else if($fil == "belum"){
            $filter = " and flag_baca = '0' ";
        }else if($fil == "sudah"){
            $filter = " and flag_baca = '1' ";
        }
        $exec = array();
        if($kode == ""){
            $filter2 = "";
        }else{
            $filter2 = " and id =$kode ";
            $upd = "update inv_notif_m set flag_baca='1' where kode_lokasi='$kode_lokasi' and nik='$nik' and flag_aktif='1' and id='$kode' and token='$token'";
            array_push($exec,$upd);
            $res = executeArray($exec);
        }
       
        $response["daftar"]=dbResultArray("select * from inv_notif_m where kode_lokasi='$kode_lokasi' and nik='$nik' and flag_aktif='1' $filter $filter2 and token='$token' ");
        $response["unred"]=dbResultArray("select * from inv_notif_m where kode_lokasi='$kode_lokasi' and nik='$nik' and flag_aktif='1' and flag_baca = '0' $filter and token='$token'");
        $response["status"]=true;
        echo json_encode($response);

    }

    function delPesan(){
        getKoneksi();

        $kode_lokasi=$_POST['kode_lokasi'];
        $nik=$_POST['nik'];
       
        $exec = array();
        for($i=0;$i<count($_POST['id']);$i++){
            if($_POST['sts'][$i] == 'on'){
                $del = "update inv_notif_m set flag_aktif='0' where kode_lokasi='$kode_lokasi' and nik='$nik' and id='".$_POST['id'][$i]."' and token='".$_POST['token']."' ";
                array_push($exec,$del);
            }
        }
        $res = executeArray($exec);
        if($res){
            $sts = true;
            $msg = "berhasil dihapus";
        }else{
            $sts = false;
            $msg = "gagal dihapus";
        }
        $response["status"]=$sts;
        $response["exec"]=$exec;
        $response["message"]=$msg;
        echo json_encode($response);

    }

    function updateSetting(){
        getKoneksi();

        $kode_lokasi=$_POST['kode_lokasi'];
        $nik=$_POST['nik'];
       
        $exec = array();
        $update = "update inv_notif_token set waktu_pb='".$_POST['waktu_pb']."' , ulang='".$_POST['ulang']."' where kode_lokasi='$kode_lokasi' and nik='$nik' and token='".$_POST['token']."'  ";
        array_push($exec,$update);

        $res = executeArray($exec);
        if($res){
            $sts = true;
            $msg = "berhasil disimpan";
        }else{
            $sts = false;
            $msg = "gagal disimpan";
        }
        $response["status"]=$sts;
        $response["exec"]=$exec;
        $response["message"]=$msg;
        echo json_encode($response);

    }

    function test(){
        $title = "Deposito Jatuh Tempo";
        $content      = array(
            "en" => "test without curl"
        );
        $fields = array(
            'app_id' => "86207625-efbc-4f50-8f19-ad3b7db93db7", //appid yakes
            'include_player_ids' => array('17ff5063-dbe5-43e1-a4b5-bcf089630126'),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        
        $uri = "https://onesignal.com/api/v1/notifications";

        $opts = array(
        'http' => array(
            'method'=>'POST', 
            'header'=>array(
                'Content-Type: application/json; charset=utf-8',
                'Authorization: Basic NDkzZWJhNGUtM2Y0My00ZWVjLWJkNDQtMjE5Yzk5NmE4Yzkw' //REST API KEY ONESIGNAL
            ), 
            'content'=>http_build_query($fields)
        )
        );

        $context = stream_context_create($opts);

        $result = file_get_contents($uri, false, $context);

        print $result;

    }

?>  