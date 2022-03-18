<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
    }
   

    function getSiswa(){

        getKoneksi();
        $query = '';
        $output = array();
    
        $kode_lokasi = $_REQUEST['kode_lokasi'];
        $query .= "select nim, nama, kode_jur from dev_siswa where kode_lokasi = '$kode_lokasi'";

        $column_array = array('nim','nama','kode_jur');
        $order_column = 'order by nim '.$_POST['order'][0]['dir'];
        $column_string = join(',', $column_array);

        $res = execute($query);
        $jml_baris = $res->RecordCount();
        if(!empty($_POST['search']['value']))
        {
            $search = $_POST['search']['value'];
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
    
        if(isset($_POST["order"]))
        {
            $query .= ' order by '.$column_array[$_POST['order'][0]['column']].' '.$_POST['order'][0]['dir'];
        }
        else
        {
            $query .= ' order by nim ';
        }
        if($_POST["length"] != -1)
        {
            $query .= ' offset ' . $_POST['start'] . ' rows fetch next ' . $_POST['length'] . ' rows only ';
        }
        $statement = execute($query);
        $data = array();
        $filtered_rows = $statement->RecordCount();
        while($row = $statement->FetchNextObject($toupper=false))
        {
            $sub_array = array();
            $sub_array[] = $row->nim;
            $sub_array[] = $row->nama;
            $sub_array[] = $row->kode_jur;
            $data[] = $sub_array;
        }
        $output = array(
            "draw"				=>	intval($_POST["draw"]),
            "recordsTotal"		=> 	$filtered_rows,
            "recordsFiltered"	=>	$jml_baris,
            "data"				=>	$data,
        );
        echo json_encode($output);
    }

    function getJur(){

        getKoneksi();
        $kode_lokasi = $_POST['kode_lokasi'];  
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select kode_jur, nama from dev_jur where kode_lokasi ='$kode_lokasi' ";
        $rs = execute($sql);
        while($row = $rs->FetchNextObject($toupper))
        {
        
            $result['daftar'][] = (array)$row;
        
        }
        					
        $result['status'] = true;
        $result['sql'] = $sql;
        echo json_encode($result);
    }

    function simpan(){
        
        getKoneksi();
        $sql1="insert into dev_siswa (nim, nama, kode_lokasi,kode_jur) values ('".$_POST['nim']."', '".$_POST['nama']."','99', '".$_POST['kode_jur']."') ";
        
        $sql=array();
        array_push($sql,$sql1);
        $rs=executeArray($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal. ".$rs;
            $sts=false;
        }
        // $sts=false;	
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["nim"]=$_POST['nim'];
        $result["nama"]=$_POST['nama'];
        $result["kode_jur"]=$_POST['kode_jur'];
        echo json_encode($result);
    }
    

    function ubah(){
        
        getKoneksi();
        $sql1="update dev_siswa set nama='".$_POST['nama']."', kode_jur='".$_POST['kode_jur']."' where nim = '".$_POST['nim']."'";
        $sql=array();
        array_push($sql,$sql1);
        $rs=executeArray($sql);

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal. ".$rs;
            $sts=false;
        }
        $result["message"] =$tmp;
        $result["status"] = $sts;
        echo json_encode($result);
    }
    

    function hapus(){
        
        getKoneksi();
        $sql1 = "delete from dev_siswa where nim='".$_POST['nim']."'";
        $sql=array();
        array_push($sql,$sql1);
        $rs = executeArray($sql);

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal. ".$rs;
            $sts=false;
        }	
        $result["message"] =$tmp;
        $result["status"] = $sts;
        echo json_encode($result);
    }

    function view(){

        getKoneksi();
               
        $sql="select * from dev_siswa where kode_lokasi='99' ";
        $rs=execute($sql);
        $html="";
        while($row=$rs->FetchNextObject($toupper = false)){
            $html.= $row->nim;
        }  
        echo $html;
    }

    function getEditSiswa(){
        
        
        getKoneksi();
        $sql="select nim,nama,kode_jur
        from dev_siswa
        where kode_lokasi= '".$_POST['kode_lokasi']."' and nim='".$_POST['nim']."' ";
        
        $rs=execute($sql);
        
        $result["daftar"] = array();
        while($row = $rs->FetchNextObject($toupper = false)){
            $result["daftar"][] = (array)$row;
        }
        $result['status']=true;
        echo json_encode($result);
    }

    
    function apiGet(){
        
        getKoneksi();

        $sql="select nim,nama,kode_jur
        from dev_siswa
        where kode_lokasi= '".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);
        
        $result = array();
        while($row = $rs->FetchNextObject($toupper = false)){
            $result[] = (array)$row;
        }
        
        echo json_encode($result);
    }

?>
