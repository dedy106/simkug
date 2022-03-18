<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate2($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    //FORM KONTEN
    function getKonten(){

        $query = '';
        $output = array();
    
        $kode_lokasi = $_REQUEST['kode_lokasi'];
        $query .= "select id, convert(varchar, tanggal, 105) as tanggal, judul from lab_konten 
        where kode_lokasi= '".$kode_lokasi."'  ";

        $column_array = array('id','convert(varchar, tanggal, 105)','judul');
        $order_column = 'ORDER BY id '.$_POST['order'][0]['dir'];
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
            $query .= ' ORDER BY id ';
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
            $sub_array[] = $row->id;
            $sub_array[] = $row->tanggal;
            $sub_array[] = $row->judul;
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
       

    function getHeader(){

   
        $kode_lokasi=$_POST['kode_lokasi'];
        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql1 = "select id, nama from lab_konten_galeri where kode_lokasi='".$kode_lokasi."' and (jenis = 'Konten' or kode_klp = 'KLP02')";
        $rs = execute($sql1);					
        
        $result['daftar'] = array();
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status']=TRUE;
        $result['sql']=$sql;
        echo json_encode($result);
    
    
    }

    function getKelompok(){
        $kode_lokasi=$_POST['kode_lokasi'];
        $result = array("message" => "", "rows" => 0, "status" => "" );

        $sql1="SELECT kode_klp, nama FROM lab_konten_klp where kode_lokasi='$kode_lokasi' ";

        $rs = execute($sql1);				
        
        $result['daftar'] = array();
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status']=TRUE;
        $result['sql']=$sql;
        echo json_encode($result);
    
    }

    function getKategori(){
        $kode_lokasi=$_POST['kode_lokasi'];
        $result = array("message" => "", "rows" => 0, "status" => "" );

        $sql1="SELECT kode_kategori, nama FROM lab_konten_kategori where kode_lokasi='$kode_lokasi' ";

        $rs = execute($sql1);					
        
        $result['daftar'] = array();
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status']=TRUE;
        $result['sql']=$sql;
        echo json_encode($result);    
    }

    function getEditData(){

        $id=$_POST['kode'];    
    
        $result = array("message" => "", "rows" => 0, "status" => "" );
    
        $sql="select id, convert(varchar, tanggal, 105) as tanggal, judul, keterangan as isi, kode_klp,kode_kategori,tag,header_url as header from lab_konten where kode_lokasi='".$_POST['lokasi']."' and id='$id' ";
        
        $rs = execute($sql);					
        
        while ($row = $rs->FetchNextObject(false)){
            $result['daftar'][] = (array)$row;
        }
        $result['status'] = TRUE;
        $result['sql'] = $sql;
        echo json_encode($result);
    
    }

    function simpan(){

        $data=$_POST;

        $sql="select isnull(max(id),0)+1 as id from lab_konten where kode_lokasi='".$_POST['kode_lokasi']."' ";
        $rs1=execute($sql);

        $id=$rs1->fields[0];

        $sql1= "insert into lab_konten (id,kode_lokasi,nik_user,tgl_input,flag_aktif,judul,tanggal,header_url,keterangan,kode_klp,kode_kategori,tag) values ('$id','".$_POST['kode_lokasi']."','".$data['nik_user']."',getdate(),'1','".$data['judul']."','".reverseDate2($data['tanggal'])."','".$data['header_url']."','".$data['keterangan']."','".$data['kode_klp']."','".$data['kode_kategori']."','".$data['tag']."') ";
        
        $sql=[$sql1];
        $rs=executeArray($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
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
        $result["id"] = $id;
        echo json_encode($result);
    }
    

    function ubah(){
        
        $sql1="update lab_konten set judul='".$_POST['judul']."',tanggal='".reverseDate2($_POST['tanggal'])."',header_url='".$_POST['header_url']."',keterangan='".$_POST['keterangan']."',kode_klp='".$_POST['kode_klp']."',kode_kategori='".$_POST['kode_kategori']."',tag='".$_POST['tag']."' where id = '".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
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
        echo json_encode($result);
    }
    

    function hapus(){
        
        $sql1="delete from lab_konten where id='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
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
        echo json_encode($result);
    }

    function view(){
               
        $sql="select * from lab_konten where kode_lokasi='24' ";
        
        $rs=execute($sql);
        $html="";
        while($row=$rs->FetchNextObject($toupper = false)){
            $html.= $row->id;
        }

        echo $html;
       
    }

?>
