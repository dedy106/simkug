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

    function loadData(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $_POST['periode'];
            
            $data = $_POST;
            $query = '';
            $output = array();

            $query = "select top 100 glacc,doc_no,fisc_year,assignment,pstng_date,doc_date,curr,doc_type,bus_area,amount,item_text,cost_ctr,profit_ctr,local_amount,kode_lokasi,tgl_update,tp,dc from exs_glitem 
            where substring(pstng_date,1,6) = '".$periode."' ";

            $res = dbResultArray($query);
            $response['data'] = $res;
            $response['message'] = "sukses";

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function simpan(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            try{

                $kode_lokasi = $_SESSION['lokasi'];
                $url = "https://api.simkug.com/api/yakes-auth/login";
                $url2 = "https://api.simkug.com/api/yakes-trans/sync-glitem";
    
                $fields = array(
                    "nik" => "yakes",
                    "password" => "saisai"
                );

                $output = curl($url,$fields); 
                $token = $output->token;

                $postdata = array();
                $postdata['periode'] = $_POST['periode'];
                $postdata['data'] = $_POST['data'];
                
                $simpan = curl_simpan($url2,$token,$postdata);
                $response['simpan'] = $simpan;
                if($simpan->success->status){
                    $msg = 'sukses';
                    $sts = true;
                }else{
                    $msg = 'gagal.'.$simpan->success->message;
                    $sts = false;
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

    function simpan2(){
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $root = realpath($_SERVER["DOCUMENT_ROOT"])."/";
            require_once($root."web/vendor/PHPExcel.php");
            require_once($root."web/vendor/PHPExcel/IOFactory.php");
            // object excel
            $excel = new PHPExcel();

            // Set document properties
            $excel->getProperties()->setCreator("PT SAI")
            ->setLastModifiedBy("USER")
            ->setTitle("Data GLitem")
            ->setSubject("Data GLitem")
            ->setDescription("Data GLitem")
            ->setKeywords("Data GLitem")
            ->setCategory("Report");
            
            $excel->setActiveSheetIndex(0);
            $sheet = $excel->getActiveSheet()->setTitle('GLITEM');

            $data = dbResultArray("select top 6000 glacc,doc_no,fisc_year,assignment,pstng_date,doc_date,curr,doc_type,bus_area,amount,item_text,cost_ctr,profit_ctr,local_amount,kode_lokasi,tgl_update,tp,dc from exs_glitem 
            where substring(pstng_date,1,6) = '".$_POST['periode']."' ");

            $column = array("glacc","doc_no","fisc_year","assignment","pstng_date","doc_date","curr","doc_type","bus_area","amount","item_text","cost_ctr","profit_ctr","local_amount","kode_lokasi","tgl_update","tp","dc");
            $col = 0;
            $row = 1;
            foreach ($column as $key => $val){
                $sheet->setCellValueByColumnAndRow($col, $row, $val);	
                $col++;
            }
            $row++;
            foreach ($data as $key => $val){
                $ctrcol = -1;
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["glacc"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["doc_no"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["fisc_year"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["assignment"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["pstng_date"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["doc_date"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["curr"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["doc_type"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["bus_area"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["amount"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["item_text"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["cost_ctr"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["profit_ctr"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["local_amout"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["kode_lokasi"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["tgl_update"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["tp"]);
                $sheet->setCellValueByColumnAndRow(++$ctrcol, $row, $val["dc"]);
                $row++;
            }

            $namafile = MD5(date("r"));
            $tmp = "web/tmp/GLITEM_$namafile.xlsx";
            $objWriter = PHPExcel_IOFactory::createWriter($excel, 'Excel2007');
            $objWriter->save($root . $tmp);

            try{

                $kode_lokasi = "00";
                $url = "https://api.simkug.com/api/yakes-auth/login";
                $url2 = "https://api.simkug.com/api/yakes-trans/upload-glitem";

                $fields = array(
                    "nik" => "yakes",
                    "password" => "saisai"
                );

                $output = curl($url,$fields); 
                $token = $output->token;

                $postfields = array();
                $postfields['periode'] = $_POST['periode'];

                if (function_exists('curl_file_create')) { // For PHP 5.5+
                    $file = curl_file_create($root.$tmp);
                } else {
                    $file = '@' . realpath($root.$tmp);
                }

                $postfields["file_dok"] = $file;
                $res = curl_upload($url2,$token,$postfields);
                $sts = $res['output']->status;
                if($sts){
                    $msg = $res['output']->message.". Total Data = ".$res['output']->data;
                }else{
                    $msg = $res['output']->message;
                }
                $response['curl2'] = $res['info'];
                $response['curl2_res'] = $res['output']; 
                $response['output'] = $output;
            } catch (exception $e) { 
                error_log($e->getMessage());		
                $msg = " error " .  $e->getMessage();
                $sts = false;
            } 	
            $response["message"] = $msg;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        echo json_encode($response);
    }


    function simpan3(){
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

           
            $data = execute("select glacc,doc_no,fisc_year,assignment,pstng_date,doc_date,curr,doc_type,bus_area,amount,item_text,cost_ctr,profit_ctr,local_amount,kode_lokasi,tgl_update,tp,dc from exs_glitem 
            where substring(pstng_date,1,6) = '".$_POST['periode']."' ");
            $sql = " delete from exs_glitem where substring(pstng_date,1,6) = '".$_POST['periode']."' ; ";
            $i=0;
            $begin = "SET NOCOUNT on;
            BEGIN tran;
            ";
            $commit = "commit tran;";


            while($row = $data->FetchNextObject($toupper = false)){
               $sql .= "INSERT INTO exs_glitem ([glacc], [doc_no], [fisc_year], [assignment], [pstng_date], [doc_date], [curr], [doc_type], [bus_area], [amount], [item_text], [cost_ctr], [profit_ctr], [local_amount], [kode_lokasi], [tgl_update], [tp], [dc]) VALUES ('$row->glacc', '$row->doc_no', '$row->fisc_year', '$row->assignment', '$row->pstng_date', '$row->doc_date', '$row->curr', '$row->doc_type', '$row->bus_area', ".floatval($row->amount).", '$row->item_text', '$row->cost_ctr', '$row->profit_ctr', ".floatval($row->local_amount).", '$row->kode_lokasi', NULL, NULL, '$row->dc');";
            }

            $sql = $begin.$sql.$commit;

            try{

                $kode_lokasi = "00";
                $url = "https://api.simkug.com/api/yakes-auth/login";
                $url2 = "https://api.simkug.com/api/yakes-trans/execute-glitem";

                $fields = array(
                    "nik" => "yakes",
                    "password" => "saisai"
                );

                $output = curl($url,$fields); 
                $token = $output->token;

                $postfields = array();
                $postfields["sql"] = $sql;

                $ch2 = curl_init(); 
                curl_setopt($ch2, CURLOPT_URL,$url2);
                curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
                curl_setopt($ch2, CURLOPT_HEADER, FALSE);
                curl_setopt($ch2, CURLOPT_POST, TRUE);
                curl_setopt($ch2, CURLOPT_POSTFIELDS, $postfields);
                curl_setopt($ch2, CURLOPT_HEADER, false); 
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
                $response['error'] = $error_msg;
                // $res = curl_simpan3($url2,$token,$postfields);
                $sts = $res->status;
                $msg = $res->message;
                $msg .= $error_msg;
                $response['curl2'] = $res; 
                $response['output'] = $output;
            } catch (exception $e) { 
                error_log($e->getMessage());		
                $msg = " error " .  $e->getMessage();
                $sts = false;
            } 	
            $response["message"] = $msg;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        echo json_encode($response);
    }

    function curl_sql($token,$sql,$url){
        try{

            $kode_lokasi = "00";
            $postfields = array();
            $postfields["sql"] = $sql;

            $ch2 = curl_init(); 
            curl_setopt($ch2, CURLOPT_URL,$url);
            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch2, CURLOPT_HEADER, FALSE);
            curl_setopt($ch2, CURLOPT_POST, TRUE);
            curl_setopt($ch2, CURLOPT_POSTFIELDS, $postfields);
            curl_setopt($ch2, CURLOPT_HEADER, false); 
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
        } 	
        $result['status'] = $sts;
        $result['message'] = $msg;
        return $result;
    }

    function simpan4(){
        session_start();
        getKoneksi();
        $data=$_POST;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi= $_SESSION['lokasi'];
            $nik= $_SESSION['userLog'];
            $exec = array();

            $kode_lokasi = "00";
            $url = "https://api.simkug.com/api/yakes-auth/login";
            $url2 = "https://api.simkug.com/api/yakes-trans/execute-glitem";

            $fields = array(
                "nik" => "yakes",
                "password" => "saisai"
            );

            $output = curl($url,$fields); 
            $token = $output->token;

            $data = execute("select glacc,doc_no,fisc_year,assignment,pstng_date,doc_date,curr,doc_type,bus_area,amount,item_text,cost_ctr,profit_ctr,local_amount,kode_lokasi,tgl_update,tp,dc,nu from exs_glitem 
            where substring(pstng_date,1,6) = '".$_POST['periode']."' ");
            $sql = " delete from exs_glitem where substring(pstng_date,1,6) = '".$_POST['periode']."' ; ";
            $i=0;
            $begin = "SET NOCOUNT on;
            BEGIN tran;
            ";
            $commit = "commit tran;";

            $i=1;
            // $sql2 = "delete from sql_tmp where kode_lokasi='$kode_lokasi' and periode ='".$_POST['periode']."' ";
            $sts_loop = true;
            $msg_loop = "";
            $c = 1;
            $total = 0;
            $x=0;
            while($row = $data->FetchNextObject($toupper = false)){
                $sql .= "INSERT INTO exs_glitem ([glacc], [doc_no], [fisc_year], [assignment], [pstng_date], [doc_date], [curr], [doc_type], [bus_area], [amount], [item_text], [cost_ctr], [profit_ctr], [local_amount], [kode_lokasi], [tgl_update], [tp], [dc], [nu]) VALUES ('$row->glacc', '$row->doc_no', '$row->fisc_year', '$row->assignment', '$row->pstng_date', '$row->doc_date', '$row->curr', '$row->doc_type', '$row->bus_area', ".floatval($row->amount).", '$row->item_text', '$row->cost_ctr', '$row->profit_ctr', ".floatval($row->local_amount).", '$row->kode_lokasi', NULL, NULL, '$row->dc',$row->nu);";
                $x++;
                if($i % 1000 == 0){
                    $sql = $begin.$sql.$commit;
                    // $len = strlen($sql);
                    // $sql2 .= "INSERT INTO sql_tmp (sql,periode,kode_lokasi,nik_user) values ('$sql','".$_POST['periode']."','$kode_lokasi','".$nik.$len."'); ";
                    $curl = curl_sql($token,$sql,$url2);
                    $response['curl'][] = $curl;
                    if(!$curl['status']){
                        $sts_loop = false;
                        $msg_loop .= "gagal di looping 1000 ke ".$c;
                    }else{
                        $total +=1000;
                    }
                    $sql = "";
                    $x = 0;
                    $c++;
                }
                if($i == $data->RecordCount() && ($i % 1000 != 0) ){
                    $sql = $begin.$sql.$commit;
                    
                    $curl = curl_sql($token,$sql,$url2);
                    $response['curl'][] = $curl;
                    if(!$curl['status']){
                        $sts_loop = false;
                        $msg_loop .= "gagal sync di looping 1000 ke ".$c;
                    }else{
                        
                        $total +=$x;
                    }
                    // $len = strlen($sql);
                    // $sql2 .= "INSERT INTO sql_tmp (sql,periode,kode_lokasi,nik_user) values ('$sql','".$_POST['periode']."','$kode_lokasi','".$nik.$len."'); ";
                    $sql = "";
                    $x = 0;
                    $c++;
                }
               $i++;
            }

            // $sql2 = $begin.$sql2.$commit;
            // array_push($exec,$sql2);
            // $res = executeArray($exec,$err);
            // if($err == null){
                $sts = true;
                $msg = "sukses. Total seluruh data: ".$data->RecordCount().". error: ".$msg_loop.". Total berhasil: ".$total;
            // }else{
                
            //     $sts = false;
            //     $msg = "failed".$err;
            // }
            
            $response["message"] = $msg;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        echo json_encode($response);
    }

?>