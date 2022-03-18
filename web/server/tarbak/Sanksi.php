<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}

function getSanksi(){
    
    $nik = $_POST['nik_user'];
    $query = '';
    $output = array();
    
    $kode_lokasi = $_REQUEST['kode_lokasi'];
    $query .= "select nama,convert(varchar,tanggal,103) as tgl,jenis from hr_sanksi
    where kode_lokasi='$kode_lokasi' and nik='$nik' ";
    
    $column_array = array('nama','convert(varchar,tanggal,103)','jenis');
    $order_column = 'ORDER BY nama '.$_POST['order'][0]['dir'];
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
        $query .= ' ORDER BY '.$column_array[$_POST['order'][0]['column']].' '.$_POST['order'][0]['dir'];
    }
    else
    {
        $query .= ' ORDER BY nama ';
    }
    if($_POST["length"] != -1)
    {
        $query .= ' OFFSET ' . $_POST['start'] . ' ROWS FETCH NEXT ' . $_POST['length'] . ' ROWS ONLY ';
    }
    $statement = execute($query);
    $data = array();
    $no=1;
    $filtered_rows = $statement->RecordCount();
    while($row = $statement->FetchNextObject($toupper=false))
    {
        $sub_array = array();
        
        $sub_array[] = $no;
        $sub_array[] = $row->nama;
        $sub_array[] = $row->tgl;
        $sub_array[] = $row->jenis;
        $data[] = $sub_array;
        $no++;
    }
    $output = array(
        "draw"				=>	intval($_POST["draw"]),
        "recordsTotal"		=> 	$filtered_rows,
        "recordsFiltered"	=>	$jml_baris,
        "data"				=>	$data,
    );
    echo json_encode($output);

}

function simpanSanksi(){

    $nik=$_POST['nik'];
    $kode_lokasi=$_POST['kode_lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    if($_POST['id_edit'] == "1"){
 
        $sqldel1="delete from hr_sanksi where nama='".$_POST['nama']."' and nik='".$nik."' and kode_lokasi='".$kode_lokasi."' ";

    }

    $sqlnu= "select max(nu) as nu from hr_sanksi where nik='$nik' and kode_lokasi='$kode_lokasi'  ";
    $rsnu=execute($sqlnu);

    if($rsnu->RecordCount() > 0){
        $nu = $rsnu->fields[0] + 1;
    }else{
        $nu = 0;
    }

    $sql1 = "insert into hr_sanksi(nik,kode_lokasi,nu,nama,tanggal,jenis) values ('".$nik."','".$kode_lokasi."',".$nu.",'".$_POST['nama']."','".$_POST['tanggal']."','".$_POST['jenis']."')";

    if($_POST['id_edit'] == "1"){
        $sql=[$sqldel1,$sql1];
    }else{
        $sql=[$sql1];
    }
    $rs=executeArray($sql);

    $tmp=array();
    $kode = array();

    if ($rs)
    {	
        $tmp="Sukses disimpan";
        $sts=true;
    }else{

        $tmp="Gagal disimpan";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"]=$sql;
    $result["error"]=$error_upload;

    echo json_encode($result);

}

function getEditSanksi(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['kode_lokasi'];    
    $nik=$_POST['nik'];

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select *,convert(varchar,tanggal,105) as tgl from hr_sanksi 
    where kode_lokasi='$kode_lokasi' and nik='$nik' and nama = '$id' ";
    
    $rs = execute($sql);

    $result['daftar'] = array();

    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }

    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function hapusSanksi(){
        
    $sql1="delete from hr_sanksi where nama='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' and nik='".$_POST['nik']."' ";

    $sql=[$sql1];
    $rs=executeArray($sql);

    $tmp=array();
    $kode = array();
    if ($rs)
    {	
        $tmp="sukses";
        $sts=true;
    }else{
        $tmp="gagal";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"] = $sql;
    echo json_encode($result);
}


?>
