<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}


function getJurnal(){

   
    $kode_lokasi=$_POST['lokasi'];


    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.no_ju as no_bukti, a.keterangan, a.nilai, a.no_dokumen, a.kode_pp, a.periode, convert(varchar,a.tanggal,103) as tgl,a.posted
    from ju_m a 
    where a.kode_lokasi='$kode_lokasi' and a.posted='F' ";
    
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);


}

function getJurnal2(){
    
    $requestData= $_REQUEST;

    $kode_lokasi=$requestData['kode_lokasi'];

    $column_array = array('a.no_ju','a.periode','convert(varchar,a.tanggal,103)','a.no_dokumen','a.keterangan','a.posted');
    $order_column = "ORDER BY a.no_ju ".$requestData['order'][0]['dir'];
    $column_string = join(',', $column_array);

    if($requestData['order'][0]['column'] != 0){
        $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
    }
    
    $sql="select a.no_ju, a.keterangan, a.nilai, a.no_dokumen, a.kode_pp, a.periode, convert(varchar,a.tanggal,103) as tgl,a.posted
    from ju_m a 
    where a.kode_lokasi='$kode_lokasi' and a.posted='F' 
    ";

    $rs=execute($sql);

    $jml_baris = $rs->RecordCount();

    if(empty($requestData['search']['value'])){
        
        $sql.="$order_column ";
        $jml_baris_filtered = $jml_baris;

    }else{
        $search = $requestData['search']['value'];
        $filter_string = " and (";

        for($i=0; $i<count($column_array); $i++){

            if($i == (count($column_array) - 1)){
                $filter_string .= $column_array[$i]." like '".$search."%' )";
            }else{
                $filter_string .= $column_array[$i]." like '".$search."%' or ";
            }
        }


        $sql.=" $filter_string $order_column  ";

        $rs2= execute($sql);
        $jml_baris_filtered = $rs2->RecordCount();
    }

    $dbconn = db_Connect();

    if($jml_baris > 0){
        $arr1=$dbconn->SelectLimit($sql,25,$requestData['start']);
        // $arr1=execute($sql);	
    }else{
        $arr1 = array();
        
    }

    $data = array();
    $no=1;
    while ($row = $arr1->FetchNextObject($toupper=false))
    {
        $nestedData=array(); 
        
        $nestedData[] = $row->no_ju;
        $nestedData[] = $row->periode;
        $nestedData[] = $row->tgl;
        $nestedData[] = $row->no_dokumen;
        $nestedData[] = $row->keterangan;
        $nestedData[] = $row->posted;
        
        $data[] = $nestedData;
        $no++;
    }

    $result = array(
        "draw" => $requestData['draw'],
        "recordsTotal" => $jml_baris,
        "recordsFiltered" => $jml_baris_filtered,
        "data" => $data,
    );

    echo json_encode($result);
}

function getJurnal3(){
    $query = '';
    $output = array();

    $kode_lokasi = $_REQUEST['kode_lokasi'];
    $query .= "select a.no_ju, a.keterangan, a.nilai, a.no_dokumen, a.kode_pp, a.periode, convert(varchar,a.tanggal,103) as tgl,a.posted
    from ju_m a 
    where a.kode_lokasi='$kode_lokasi' and a.posted='F'  ";
    $res = execute($query);
    
    $column_array = array('a.no_ju','a.periode','convert(varchar,a.tanggal,103)','a.no_dokumen','a.keterangan','a.posted');
    $order_column = 'ORDER BY a.no_ju '.$_POST['order'][0]['dir'];
    $column_string = join(',', $column_array);
    
    $jml_baris = $res->RecordCount();
    if(!empty($requestData['search']['value']))
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
        $query .= ' ORDER BY a.no_ju ';
    }
    if($_POST["length"] != -1)
    {
        $query .= ' OFFSET ' . $_POST['start'] . ' ROWS FETCH NEXT ' . $_POST['length'] . ' ROWS ONLY ';
    }
    $statement = execute($query);
    $data = array();
    $filtered_rows = $statement->RecordCount();
    while($row = $statement->FetchNextObject($toupper=false))
    {
        $sub_array = array();
        $sub_array[] = $row->no_ju;
        $sub_array[] = $row->periode;
        $sub_array[] = $row->tgl;
        $sub_array[] = $row->no_dokumen;
        $sub_array[] = $row->keterangan;
        $sub_array[] = $row->posted;
        // $no++;
        // $sub_array[] = '<button type="button" name="update" id="'.$row["id"].'" class="btn btn-warning btn-xs update">Update</button>';
        // $sub_array[] = '<button type="button" name="delete" id="'.$row["id"].'" class="btn btn-danger btn-xs delete">Delete</button>';
        $data[] = $sub_array;
    }
    $output = array(
        "draw"				=>	intval($_POST["draw"]),
        "recordsTotal"		=> 	$filtered_rows,
        "recordsFiltered"	=>	$jml_baris,
        "data"				=>	$data,
    );
    echo json_encode($output);
    // echo $query;
}

function joinNum2($num){
    // menggabungkan angka yang di-separate(10.000,75) menjadi 10000.00
    $num = str_replace(".", "", $num);
    $num = str_replace(",", ".", $num);
    return $num;
}

function simpanJurnal(){

    if($_POST['no_bukti'] == ""){
        $str_format="0000";
        $periode=date('Y').date('m');
        $per=substr($_POST['periode'],2,4);
        // $prefix=$_POST['kode_rt']."-WR".$per.".";
        $prefix=$_POST['kode_lokasi']."-JU".$per.".";
        $sql2="select right(isnull(max(no_ju),'0000'),".strlen($str_format).")+1 as id from ju_m where no_ju like '$prefix%' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $query = execute($sql2);

        $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);
    }else{
        $id = $_POST['no_bukti'];
        $sqldel= "delete from ju_m where kode_lokasi='".$_POST['kode_lokasi']."' and no_ju='".$id."' ";
        $rsdel=execute($sqldel);
        $sqldel2= "delete from ju_j where kode_lokasi='".$_POST['kode_lokasi']."' and no_ju='".$id."' ";
        $rsdel2=execute($sqldel2);
    }
 

    $sql1 ="insert into ju_m (no_ju,kode_lokasi,no_dokumen,tanggal,keterangan,kode_pp,modul,jenis,periode,kode_curr,kurs,nilai,nik_buat,nik_setuju,tgl_input,nik_user,posted,no_del,no_link,ref1) values ('".$id."','".$_POST['kode_lokasi']."','".$_POST['no_dokumen']."','".reverseDate($_POST['tanggal'])."','".$_POST['keterangan']."','".$_POST['kode_pp']."','JU','UMUM','".$_POST['periode']."','IDR',1,".joinNum2($_POST['total_d']).",'".$_POST['nik']."','-',getdate(),'".$_POST['nik']."','F','-','-','-')";

    
    $rs1=execute($sql1);

    $i=1;
    for($a=0; $a<count($_POST['kode_akun']);$a++){
     
    $sql[$a]= "insert into ju_j (no_ju,no_dokumen,tanggal,no_urut,kode_akun,keterangan,dc,nilai,kode_pp,kode_drk,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik,kode_lokasi,modul,jenis,periode,kode_curr,kurs,nik_user,tgl_input,no_ref,ket_ref) values ".
                            "('".$id."','".$_POST['no_dokumen']."','".reverseDate($_POST['tanggal'])."','".$a."','".$_POST['kode_akun'][$a]."','".$_POST['ket'][$a]."','".$_POST['dc'][$a]."',".$_POST['nilai'][$a].",'".$_POST['pp'][$a]."','-','-','-','-','-','-','".$_POST['nik']."','".$_POST['kode_lokasi']."','JU','UMUM','".$_POST['periode']."','IDR',1,'".$_POST['nik']."',getdate(),'-','-')";
        $rs=execute($sql[$a]);		
        if($rs){
            $detail=TRUE;
        }
        $i++;
    
    }	


    $tmp=array();
    $kode = array();

    if ($rs1 AND $detail)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan";
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql1"]=$sql1;

    echo json_encode($result);
}

function getEditJurnal(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.no_ju as no_bukti, a.keterangan, a.nilai, a.no_dokumen, a.kode_pp, a.periode, convert(varchar,a.tanggal,103) as tgl,a.posted from ju_m a where a.kode_lokasi='$kode_lokasi' and a.no_ju='$id' ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }

    $sql2="select a.kode_akun,b.nama as nama_akun,a.dc,a.keterangan as ket, a.kode_pp, c.nama as nama_pp,a.nilai 
    from ju_j a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
    left join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi where a.kode_lokasi='$kode_lokasi' and a.no_ju='$id' ";
    $rs2 = execute($sql2);					
    
    while ($row2 = $rs2->FetchNextObject(false)){
        $result['daftar2'][] = (array)$row2;
    }

    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function hapusJurnal(){
        
    $sql="delete from ju_m where no_ju='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."'";

    $rs=execute($sql);

    $sql1="delete from ju_j where no_ju='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."'";

    $rs1=execute($sql1);

    $tmp=array();
    $kode = array();
    if ($rs AND $rs1)
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
