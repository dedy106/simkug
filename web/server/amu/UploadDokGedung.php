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
        case 'DELETE' :
            hapusDok();
        break;
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
        include_once($root_lib."web/lib/libcurl.php");
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

    function getJenis() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];

            $sql = "select kode_jenis,nama,tipe
            from amu_dok_jenis 
            where kode_lokasi='$kode_lokasi' and kode_klp='K02' ";
            $res = dbResultArray($sql);
            $response["daftar"] = $res;
            $response["message"] = "Success";
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getData(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            $kode_lokasi = $_GET['kode_lokasi'];
            $kode_pp=$_GET['kode_pp'];
        
            $data = $_GET;
            $query = '';
            $output = array();
            
            $kode_lokasi = $data['kode_lokasi'];
            $query .= "select a.id_gedung,a.nama_gedung,a.alamat,isnull(b.jum_dok,'0') as jum_upload 
            from amu_gedung a 
            left join (select no_bukti,kode_lokasi,count(no_bukti) as jum_dok
                        from amu_gedung_dok
                        group by no_bukti,kode_lokasi 
						) b on a.id_gedung=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
            where a.kode_lokasi= '$kode_lokasi' ";
            
            $column_array = array('a.id_gedung','a.nama_gedung','a.alamat',"isnull(b.jum_dok,'0')");
            $order_column = 'ORDER BY a.id_gedung '.$data['order'][0]['dir'];
            $column_string = join(',', $column_array);
            
            $res = execute($query);
            $jml_baris = $res->recordcount();
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
                $query .= ' ORDER BY a.id_gedung ';
            }
            if($data["length"] != -1)
            {
                $query .= ' OFFSET ' . $data['start'] . ' ROWS FETCH NEXT ' . $data['length'] . ' ROWS ONLY ';
            }
            $statement = execute($query);
            $data = array();
            $filtered_rows = $statement->recordcount();
            while($row = $statement->FetchNextObject($toupper=false))
            {
                $sub_array = array();
                $sub_array[] = $row->id_gedung;
                $sub_array[] = $row->nama_gedung;
                $sub_array[] = $row->alamat;
                $sub_array[] = $row->jum_upload;
                $sub_array[] = "<a href='#' title='Upload Dokumen' class='badge badge-success' id='btn-upload'><i class='fa fa-upload'></i></a>";
                $data[] = $sub_array;
            }
            $response = array(
                "draw"				=>	intval($data["draw"]),
                "recordsTotal"		=> 	$filtered_rows,
                "recordsFiltered"	=>	$jml_baris,
                "data"				=>	$data,
                "sql"               =>  $query
            );
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function simpanDok(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            try{

                $kode_lokasi = $_GET['kode_lokasi'];
                $kode_pp=$_GET['kode_pp'];
                $url = "https://api.simkug.com/api/aset/login";
                $url2 = "https://api.simkug.com/api/aset/upload-dok-gedung";
    
                $fields = array(
                    "nik" => $_SESSION['userLog'],
                    "password" => $_SESSION['pass']
                );

                $output = curl($url,$fields); 
                $token = $output->token;
    
                $postfields = array();
                $arr_file = array();
                $arr_nama = array();
                for($i=0; $i<count($_POST['nama_dok']); $i++) {
                    if(isset($_FILES['file_dok']['tmp_name'][$i])){

                        if (function_exists('curl_file_create')) { // For PHP 5.5+
                            $file = curl_file_create($_FILES['file_dok']['tmp_name'][$i],$_FILES['file_dok']['type'][$i],$_FILES['file_dok']['name'][$i]);
                        } else {
                            $file = '@' . realpath($_FILES['file_dok']['tmp_name'][$i],$_FILES['file_dok']['type'][$i],$_FILES['file_dok']['name'][$i]);
                        }
                        $postfields["file_gambar[$i]"] = $file;
                        $postfields["nama_file[$i]"] = $_POST['nama_dok'][$i];
                        $postfields["kode_jenis[$i]"] = $_POST['kode_jenis'][$i];
                    }
                }
    
                // Add other post data as well.
                $postfields['no_bukti'] = $_POST['no_bukti'];
    
                $res = curl_upload($url2,$token,$postfields);
                $msg = $res['message'];
                $sts = $res['status'];
                $response['curl2'] = $res['info'];
                $response['curl2_res'] = $res['output']->success; 
                $response['fields'] = $postfields; 
                $response['output'] = $output;
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

    function getUploadData() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $no_bukti = $_GET['no_bukti'];
            
            $res = dbResultArray("select a.no_bukti,a.kode_lokasi,a.file_dok,a.no_urut,a.nama,a.kode_jenis+'-'+b.tipe as kode_jenis
            from amu_gedung_dok a
            left join amu_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$no_bukti' 
            order by a.no_urut ");
            $response["daftar"] = $res;
            $response["message"] = "Success";
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function hapusDok() {
        session_start();
        getKoneksi();
        parse_str(file_get_contents('php://input'), $_DELETE);
        $data = $_DELETE;
        
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $no_bukti = $data['no_bukti'];
            $no_urut = $data['no_urut'];

            $url = "https://api.simkug.com/api/aset/login";
            $url2 = "https://api.simkug.com/api/aset/delete-dok-gedung/$no_bukti/$no_urut";
            
            $fields = array(
                "nik" => $_SESSION['userLog'],
                "password" => $_SESSION['pass']
            );
            
            $output = curl($url,$fields); 
            $token = $output->token;

            $res = curl_del($url2,$token);
            $response["message"] = "Success";
            $response["result"] = $res;
            $response["token"] = $token;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
?>