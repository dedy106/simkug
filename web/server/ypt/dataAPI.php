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
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function cekAuth($user,$pass){
        getKoneksi();
        $user = qstr($user);
        $pass = qstr($pass);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user and pass=$pass", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function getDataAPI(){
        getKoneksi();
        $ch = curl_init("http://api.telkomuniversity.ac.id/finance/report/51/1718");

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, "simkug:Simkug4pi");
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        $rs = json_decode(curl_exec($ch));
        curl_close($ch);

        $tmp = explode("/",$_POST["url"]);
        $kode_fakultas= $tmp[5];
        $kode_lokasi= $_POST["kode_lokasi"];
        $exec = array();
        // echo $rs->financedetail[0]->nim;
        // echo "<br>";
        $response["jumlahdata"] = count($rs->financedetail);
        $response["urlpost"] = $_POST["url"];
        $del ="delete from xfinance";
        array_push($exec);

        for($i=0;$i<count($rs->financedetail);$i++){
            $row = $rs->financedetail[$i];
            $nama = str_replace("'","",$row->nama);
            $sql[$i] = "INSERT into  xfinance  values('$row->nim','$nama','$row->studyprogramid','$row->facultyid','$row->facultyname','$row->programstudi','$row->tahunajaran','$row->semester','$row->studentschoolyear',$row->up3,$row->sdp2,$row->paket,$row->bpp,$row->sks,$row->perpus,$row->denda,$row->uangstatus,$row->asuransi,$row->asrama,$row->potongan,$row->totaltagihan,$row->beasiswa,$row->tagihan,$row->pembayaran,$row->selisih,getdate(),'$row->statuspembayaran','$row->statusregistrasi','$row->statusmahasiswa','$kode_lokasi','$kode_fakultas')";
        
            array_push($exec,$sql[$i]);
        }

        $res = executeArray($exec);
        if($res){
			$response['status'] = true;
            $response['message'] = 'Data berhasil disimpan';
            // $result['exec']=$exec;
		}else{
			$response['status'] = false;
            $response['message'] = "Data gagal disimpan ke database";
            // $result['exec']=$exec;
			// $result['sql']=$sql;
        }
        
        echo json_encode($response);
        
    }

    function getTest(){
        $response['status'] = true;
        $response['message'] = 'Data berhasil disimpan';
        echo json_encode($response);
    }

    function getDatatable(){
        // session_start();
        getKoneksi();
        $data=$_GET;

        // if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){            

            $kode_lokasi = $data['kode_lokasi'];
            $periode = $data['periode'];
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select nim,nama,studyprogramid,facultyid,facultyname,programstudi,tahunajaran,semester,studentschoolyear,up3,sdp2,paket,bpp,sks,perpus,denda,uangstatus,asuransi,asrama,potongan,totaltagihan,beasiswa,tagihan,pembayaran,selisih,deadlinepembayaran,statuspembayaran,statusregistrasi,statusmahasiswa from xfinance where kode_lokasi='$kode_lokasi' ";
            
            $column_array = array( 'nim','nama','studyprogramid','facultyid','facultyname','programstudi','tahunajaran','semester','studentschoolyear','up3','sdp2','paket','bpp','sks','perpus','denda','uangstatus','asuransi','asrama','potongan','totaltagihan','beasiswa','tagihan','pembayaran','selisih','deadlinepembayaran','statuspembayaran','statusregistrasi','statusmahasiswa' );
            $order_column = 'ORDER BY nim '.$data['order'][0]['dir'];
            $column_string = join(',', $column_array);
            
            $res = execute($query);
            $jml_baris = $res->RecordCount();
            if(!empty($data['search']['value']))
            {
                $search = $data['search']['value'];
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
            
            if(isset($data["order"]))
            {
                $query .= ' ORDER BY '.$column_array[$data['order'][0]['column']].' '.$data['order'][0]['dir'];
            }
            else
            {
                $query .= ' ORDER BY nim ';
            }
            if($data["length"] != -1)
            {
                $query .= ' OFFSET ' . $data['start'] . ' ROWS FETCH NEXT ' . $data['length'] . ' ROWS ONLY ';
            }

            $statement = execute($query);
            $data = array();
            $filtered_rows = $statement->RecordCount();
            while($row = $statement->FetchNextObject($toupper=false))
            {
                $sub_array = array();
                $sub_array[] = $row->nim;
                $sub_array[] = $row->nama;
                $sub_array[] = $row->studyprogramid;
                $sub_array[] = $row->facultyid;
                $sub_array[] = $row->facultyname;
                $sub_array[] = $row->programstudi;
                $sub_array[] = $row->tahunajaran;
                $sub_array[] = $row->semester;
                $sub_array[] = $row->studentschoolyear;
                $sub_array[] = $row->up3;
                $sub_array[] = $row->sdp2;
                $sub_array[] = $row->paket;
                $sub_array[] = $row->bpp;
                $sub_array[] = $row->sks;
                $sub_array[] = $row->perpus;
                $sub_array[] = $row->denda;
                $sub_array[] = $row->uangstatus;
                $sub_array[] = $row->asuransi;
                $sub_array[] = $row->asrama;
                $sub_array[] = $row->potongan;
                $sub_array[] = $row->totaltagihan;
                $sub_array[] = $row->beasiswa;
                $sub_array[] = $row->tagihan;
                $sub_array[] = $row->pembayaran;
                $sub_array[] = $row->selisih;
                $sub_array[] = $row->deadlinepembayaran;
                $sub_array[] = $row->statuspembayaran;
                $sub_array[] = $row->statusregistrasi;
                $sub_array[] = $row->statusmahasiswa;
                $data[] = $sub_array;
            }
            $response = array(
                "draw"				=>	intval($data["draw"]),
                "recordsTotal"		=> 	$filtered_rows,
                "recordsFiltered"	=>	$jml_baris,
                "data"				=>	$data,
                "sql"               => $query
            );
        // } else{
        //     $response["message"] = "Unauthorized Access, Login Required";
        // } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
?>