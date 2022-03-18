<?php    

// if (isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['PHP_AUTH_USER']=='api' &&  $_SERVER['PHP_AUTH_PW']=='saisai') {
//     echo "auth success";

    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }else{
                if(empty($_GET["nim"]) AND empty($_GET["kode_lokasi"])) {
                    getSiswa();
                } else {
                    $id=$_GET["nim"];
                    $kd_lok=$_GET["kode_lokasi"];
                    getSiswa($id,$kd_lok);
                }
            }
        break;
        // case 'POST':
        //     // Insert Product
        //     if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
        //         $_GET['fx']();
        //     }else{
        //         insert_siswa();
        //     }
        // break;
        // case 'PUT':
        // // Update Product
        //     // $id=intval($_GET["id"]);
        //     update_siswa();
        // break;
        // case 'DELETE':
        // // Delete Product
        //     delete_siswa();
        // break;
        // default:
        //     // Invalid Request Method
        //     header("HTTP/1.0 405 Method Not Allowed");
        // break;
    }

    // if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
    //     $_GET['fx']();
    // }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function getSiswa(){
        $response["sql"] = "select*from siswa";
        echo json_encode($response);
    }

    

    // function authKey($key, $modul, $user=null){
    //     getKoneksi();
    //     $key = qstr($key);
    //     $modul = qstr($modul);
    //     $date = date('Y-m-d H:i:s');
    //     $user_str = "";
    //     if($user != null){
    //         $user = qstr($user);
    //         $user_str .= "AND nik = $user";
    //     }

    //     $schema = db_Connect();
    //     $auth = $schema->SelectLimit("SELECT * FROM api_key_auth where api_key=$key and expired > '$date' and modul=$modul $user_str", 1);
    //     if($auth->RecordCount() > 0){
            
    //         $date = new DateTime($date);
    //         $date->add(new DateInterval('PT1H'));
    //         $WorkingArray = json_decode(json_encode($date),true);
    //         $expired = explode(".",$WorkingArray["date"]);

    //         $db_key["expired"] = $expired[0];
    //         $key_sql = $schema->AutoExecute('api_key_auth', $db_key, 'UPDATE', "api_key=$key and modul=$modul");
    //         return true;
    //     }else{
    //         return false;
    //     }
    // }

    // function get_siswa($id=null,$kd_lok=null) {
    //     getKoneksi();

    //     if(arrayKeyCheck(array('api_key', 'username', 'kode_lokasi'), $_POST)){
    //         if(authKey($_POST["api_key"], 'testAPI', $_POST['username'])){ 

    //             $query="SELECT * FROM dev_siswa";
    //             if($id != null AND $kd_lok != null) {
    //                 $query.=" WHERE nim='".$id."' and kode_lokasi='".$kd_lok."' ";
    //             }else if($id != null AND $kd_lok == null){
    //                 $query.=" WHERE nim='".$id."'";
    //             }else if($id == null AND $kd_lok != null){
    //                 $query.=" WHERE kode_lokasi='".$kd_lok."' ";
    //             }
    //             $response=array();
    //             $result = execute($query);
    //             if($result->RecordCount() > 0){
    //                 while($row=$result->FetchNextObject($toupper=false)) {
    //                     $response[] = (array)$row;
    //                 }
    //             }else{
    //                 $response['error'] = "data tidak ditemukan";
    //             }
    //         }else{
    //             $response['error'] = "Unauthorized Access 2";
                
    //         }
    //     }else{
    //         $response['error'] = "Unauthorized Access 1";
            
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

    // function getDatatableSiswa(){
    //     getKoneksi();

    //     if(arrayKeyCheck(array('api_key', 'username', 'kode_lokasi'), $_POST)){
    //         if(authKey($_POST["api_key"], 'testAPI', $_POST['username'])){
                
    //             $query = '';
    //             $output = array();
            
    //             $kode_lokasi = $_REQUEST['kode_lokasi'];
    //             $query .= "select nim, nama, kode_jur from dev_siswa where kode_lokasi = '$kode_lokasi'";

    //             $column_array = array('nim','nama','kode_jur');
    //             $order_column = 'order by nim '.$_POST['order'][0]['dir'];
    //             $column_string = join(',', $column_array);

    //             $res = execute($query);
    //             $jml_baris = $res->RecordCount();
    //             if(!empty($_POST['search']['value']))
    //             {
    //                 $search = $_POST['search']['value'];
    //                 $filter_string = " and (";
            
    //                 for($i=0; $i<count($column_array); $i++){
            
    //                     if($i == (count($column_array) - 1)){
    //                         $filter_string .= $column_array[$i]." like '".$search."%' )";
    //                     }else{
    //                         $filter_string .= $column_array[$i]." like '".$search."%' or ";
    //                     }
    //                 }
            
            
    //                 $query.=" $filter_string ";
    //             }
            
    //             if(isset($_POST["order"]))
    //             {
    //                 $query .= ' order by '.$column_array[$_POST['order'][0]['column']].' '.$_POST['order'][0]['dir'];
    //             }
    //             else
    //             {
    //                 $query .= ' order by nim ';
    //             }
    //             if($_POST["length"] != -1)
    //             {
    //                 $query .= ' offset ' . $_POST['start'] . ' rows fetch next ' . $_POST['length'] . ' rows only ';
    //             }
    //             $statement = execute($query);
    //             $data = array();
    //             $filtered_rows = $statement->RecordCount();
    //             while($row = $statement->FetchNextObject($toupper=false))
    //             {
    //                 $sub_array = array();
    //                 $sub_array[] = $row->nim;
    //                 $sub_array[] = $row->nama;
    //                 $sub_array[] = $row->kode_jur;
    //                 $data[] = $sub_array;
    //             }
    //             $response = array(
    //                 "draw"				=>	intval($_POST["draw"]),
    //                 "recordsTotal"		=> 	$filtered_rows,
    //                 "recordsFiltered"	=>	$jml_baris,
    //                 "data"				=>	$data,
    //             );
    //         }else{
    //             $response['error'] = "Unauthorized Access 2";
                
    //         }
    //     }else{
    //         $response['error'] = "Unauthorized Access 1";
            
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

    // function getJur(){
    //     getKoneksi();

    //     if(arrayKeyCheck(array('api_key', 'username', 'kode_lokasi'), $_GET)){
    //         if(authKey($_GET["api_key"], 'testAPI', $_GET['username'])){
    //             $kode_lokasi = $_GET['kode_lokasi'];  
    //             $response = array("message" => "", "rows" => 0, "status" => "" ); 				
    //             $sql = "select kode_jur, nama from dev_jur where kode_lokasi ='$kode_lokasi' ";
    //             $rs = execute($sql);
    //             while($row = $rs->FetchNextObject($toupper))
    //             {
    //                 $response['daftar'][] = (array)$row;
    //             }
                                    
    //             $response['status'] = true;
    //             $response['sql'] = $sql;
    //         }else{
    //             $response['error'] = "Unauthorized Access 2";
                
    //         }
    //     }else{
    //         $response['error'] = "Unauthorized Access 1";
            
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

    // function insert_siswa() {
    //     getKoneksi();
    //     if(arrayKeyCheck(array('api_key', 'username', 'kode_lokasi'), $_POST)){
    //         if(authKey($_POST["api_key"], 'testAPI', $_POST['username'])){
    //             $data = $_POST;
    //             $nim=qstr($data["nim"]);
    //             $kode_lokasi=qstr($data["kode_lokasi"]);
    //             $nama=qstr($data["nama"]);
    //             $kode_jur=qstr($data["kode_jur"]);
            
    //             if($nim != "" AND $kode_lokasi != ""){
    //                 $query=" insert into dev_siswa (nim,kode_lokasi,nama,kode_jur)
    //                 values ($nim,$kode_lokasi,$nama,$kode_jur) ";
        
    //                 $sql = array();
    //                 array_push($sql,$query);
        
    //                 $rs=executeArray($sql);
    //                 if($rs) {
    //                     $response=array(
    //                     'status' => 1,
    //                     'message' =>'Siswa Added Successfully.',
    //                     'query' => $query
    //                     );
    //                 }
    //                 else {
    //                     $response=array(
    //                     'status' => 0,
    //                     'message' =>'Siswa Addition Failed.'.$rs,
    //                     'query' => $query
    //                     );
                    
    //                 }
    //             }else{
    //                 $response['error'] = "NIM and Kode Lokasi Required";
    //             }
    //         }else{
    //             $response['error'] = "Unauthorized Access 2";
    //         }
    //     }else{
    //         $response['error'] = "Unauthorized Access 1";
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

    // function getSes(){
    //     session_start();
    //     echo "<script>sessionStorage.setItem('lastname', 'Smith');</script>";
    // }
    // function getAkses(){
    //     // Set handle
    //     $url = $_POST['url'];
    //     $ch = curl_init($url);

    //     // Set options
    //     curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    //     curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    //     curl_setopt($ch, CURLOPT_USERPWD, "api:saisai");
    //     curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

    //     // Execute curl handle add results to data return array.
    //     $result = curl_exec($ch);
    //     // $returnGroup = ['curlResult' => $result,];
    //     curl_close($ch);
    //     // return $returnGroup;
    //     print_r($result);
    // }

    // function get_siswa2($id=null,$kd_lok=null) {
    //     getKoneksi();
    //     if (isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['PHP_AUTH_USER']=='api' &&  $_SERVER['PHP_AUTH_PW']=='saisai') {

    //         $query="SELECT * FROM dev_siswa";
    //         if($id != null AND $kd_lok != null) {
    //             $query.=" WHERE nim='".$id."' and kode_lokasi='".$kd_lok."' ";
    //         }else if($id != null AND $kd_lok == null){
    //             $query.=" WHERE nim='".$id."'";
    //         }else if($id == null AND $kd_lok != null){
    //             $query.=" WHERE kode_lokasi='".$kd_lok."' ";
    //         }
    //         $response=array();
    //         $response['daftar']=array();
    //         $result = execute($query);
    //         if($result->RecordCount() > 0){
    //             while($row=$result->FetchNextObject($toupper=false)) {
    //                 $response['daftar'][] = (array)$row;
    //             }
    //         }else{
    //             $response['error'] = "data tidak ditemukan";
    //         }
            
    //         $response['status'] = "Akses true";
    //     }else{
    //         $response['status'] = "Unauthorized Access 1";
    //     }
        
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

    // function getEditSiswa(){
    //     getKoneksi();
    //     // if(arrayKeyCheck(array('api_key', 'username', 'kode_lokasi','nim'), $_GET)){
    //     //     if(authKey($_GET["api_key"], 'testAPI', $_GET['username'])){
    //     if (isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['PHP_AUTH_USER']=='api' &&  $_SERVER['PHP_AUTH_PW']=='saisai') {

    //             $sql="select nim,nama,kode_jur
    //             from dev_siswa
    //             where kode_lokasi= '".$_GET['kode_lokasi']."' and nim='".$_GET['nim']."' ";
                
    //             $rs=execute($sql);
                
    //             $response["daftar"] = array();
    //             while($row = $rs->FetchNextObject($toupper = false)){
    //                 $response["daftar"][] = (array)$row;
    //             }
    //             $response['status']=true;
    //         // }else{
    //         //     $response['error'] = "Unauthorized Access 2";
    //         // }
    //     }else{
    //         $response['error'] = "Unauthorized Access 1";
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

    // function update_siswa() {
    //     getKoneksi();
    //     parse_str(file_get_contents('php://input'), $_PUT);
    //     $data = $_PUT;
    //     if(arrayKeyCheck(array('api_key', 'username', 'kode_lokasi'), $data)){
    //         if(authKey($data["api_key"], 'testAPI', $data['username'])){

    //             $nim=qstr($data["nim"]);
    //             $kode_lokasi=qstr($data["kode_lokasi"]);
    //             $nama=qstr($data["nama"]);
    //             $kode_jur=qstr($data["kode_jur"]);
    //             $query="UPDATE dev_siswa SET nama = $nama,
    //                     kode_jur = $kode_jur
    //                     WHERE nim = $nim and kode_lokasi = $kode_lokasi ";
    //             $sql = array();
    //             array_push($sql,$query);

    //             $rs=executeArray($sql);
    //             if($rs) {
    //                 $response=array(
    //                 'status' => 1,
    //                 'message' =>'siswa Updated Successfully.',
    //                 'query'=>$query,
    //                 'request'=>$_PUT
    //                 );
    //             }
    //             else {
    //                 $response=array(
    //                 'status' => 0,
    //                 'message' =>'siswa Updation Failed.'.$rs,
    //                 'query'=>$query,
    //                 'request'=>$_PUT
    //                 );
    //             }
    //         }else{
    //             $response['error'] = "Unauthorized Access 2";
    //         }
    //     }else{
    //         $response['error'] = "Unauthorized Access 1";
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

    // function delete_siswa() {
    //     getKoneksi();
    //     parse_str(file_get_contents('php://input'), $_DELETE);
    //     $data = $_DELETE;
    //     if(arrayKeyCheck(array('api_key', 'username', 'kode_lokasi'), $data)){
    //         if(authKey($data["api_key"], 'testAPI', $data['username'])){
    //             $id = qstr($_DELETE["nim"]);
    //             $kd_lok = qstr($_DELETE["kode_lokasi"]);

    //             $query="DELETE FROM dev_siswa where nim=$id and kode_lokasi = $kd_lok" ;

    //             $sql = array();
    //             array_push($sql,$query);

    //             $rs=executeArray($sql);
    //             if($rs) {
    //                 $response=array(
    //                 'status' => 1,
    //                 'message' =>'Siswa Deleted Successfully.',
    //                 'sql'=>$sql
    //                 );
    //             }
    //             else {
    //                 $response=array(
    //                 'status' => 0,
    //                 'message' =>'Siswa Deletion Failed.'.$rs,
    //                 'sql'=>$sql
    //                 );
    //             }
                
    //         }else{
    //             $response['error'] = "Unauthorized Access 2";
    //         }
    //     }else{
    //         $response['error'] = "Unauthorized Access 1";
    //     }
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }

// }else{
//     echo "Unauthorized Access";
// }
?>