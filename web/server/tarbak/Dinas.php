<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}

function getDinas(){

    $nik = $_POST['nik_user'];
    $query = '';
    $output = array();
    
    $kode_lokasi = $_REQUEST['kode_lokasi'];
    $query .= "select no_sk,convert(varchar,tgl_sk,103) as tgl,nama from hr_sk where kode_lokasi='$kode_lokasi' and nik='$nik'   ";
    
    $column_array = array('no_sk','convert(varchar,tgl_sk,103) as tgl','nama');
    $order_column = 'ORDER BY no_sk '.$_POST['order'][0]['dir'];
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
        $query .= ' ORDER BY no_sk ';
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
        $sub_array[] = $row->no_sk;
        $sub_array[] = $row->tgl;
        $sub_array[] = $row->nama;
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

function simpanDinas(){

    $nik=$_POST['nik'];
    $kode_lokasi=$_POST['kode_lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    if($_POST['id_edit'] == "1"){
 
        $sqldel1="delete from hr_sk where no_sk='".$_POST['no_sk']."' and nik='".$nik."' and kode_lokasi='".$kode_lokasi."' ";

    }

    $sqlnu= "select max(nu) as nu from hr_sk where nik='$nik' and kode_lokasi='$kode_lokasi'  ";
    $rsnu=execute($sqlnu);

    if($rsnu->RecordCount() > 0){
        $nu = $rsnu->fields[0] + 1;
    }else{
        $nu = 0;
    }

    $sql1 = "insert into hr_sk(nik,kode_lokasi,nu,no_sk,nama,tgl_sk) values ('".$nik."','".$kode_lokasi."',".$nu.",'".$_POST['no_sk']."','".$_POST['nama']."','".$_POST['tgl_sk']."')";

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

    echo json_encode($result);

}

function hapusDinas(){
        
    $sql1="delete from hr_sk where no_sk='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' and nik='".$_POST['nik']."' ";

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
