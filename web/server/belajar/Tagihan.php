<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
    }
   
    function getTagihan(){

        getKoneksi();

        $query = '';
        $output = array();
    
        $kode_lokasi = $_POST['kode_lokasi'];
        $query .= "select  no_tagihan,nim,convert(varchar,tanggal,103) as tanggal,keterangan,periode from dev_tagihan_m where kode_lokasi = '$kode_lokasi'";

        $column_array = array('no_tagihan','nim','convert(varchar,tanggal,103)','keterangan','periode');
        $order_column = 'order by no_tagihan '.$_POST['order'][0]['dir'];
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
            $query .= ' order by no_tagihan ';
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
            $sub_array[] = $row->no_tagihan;
            $sub_array[] = $row->nim;
            $sub_array[] = $row->tanggal;
            $sub_array[] = $row->keterangan;
            $data[] = $sub_array;
        }
        $output = array(
            "draw"				=>	intval($_POST["draw"]),
            "recordsTotal"		=> 	$filtered_rows,
            "recordsFiltered"	=>	$jml_baris,
            "data"				=>	$data,
            "sql" =>$query
        );
        echo json_encode($output);
    }
       
    function getEditTagihan(){

        getKoneksi();

        $id          = $_POST['kode'];
        $kode_lokasi = $_POST['kode_lokasi'];  
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select no_tagihan,nim,convert(varchar(10),tanggal,121) as tanggal,keterangan,periode from dev_tagihan_m where kode_lokasi  ='$kode_lokasi' and no_tagihan='$id' ";
        $rs = execute($sql);
        $result['daftar'] = array();
        while($row = $rs->FetchNextObject($toupper=false))
        {
            $result['daftar'][] = (array)$row;
        
        }

        $sql = "select a.no_tagihan,a.kode_lokasi,a.kode_jenis,a.nilai,b.nama from dev_tagihan_d a inner join dev_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi where a.kode_lokasi ='$kode_lokasi' and a.no_tagihan ='$id' ";
        $rs2 = execute($sql);
        
        $result['daftar2']= array();
        while($row = $rs2->FetchNextObject($toupper=false))
        {
        
        
            $result['daftar2'][] = (array)$row;
        
        }
        					
        $result['status'] = true;
        $result['sql'] = $sql;
        echo json_encode($result);
    }

    function getJenis(){

        getKoneksi();

        $kode_lokasi = $_POST['kode_lokasi'];  
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select kode_jenis, nama from dev_jenis where kode_lokasi ='$kode_lokasi' ";
        $rs = execute($sql);
        
        $result['daftar']=array();

        while($row = $rs->FetchNextObject($toupper=false))
        {
            $result['daftar'][] = (array)$row;
        }
        					
        $result['status'] = true;
        $result['sql'] = $sql;
        echo json_encode($result);
    }
	
	function simpanTagihan(){
        
        getKoneksi();
        
        $sql=array();
        if($_POST['no_tagihan'] == ""){
            $str_format="0000";
            $periode=date('Y').date('m');
            $per=date('y').date('m');
            $prefix=$_POST['kode_lokasi']."-TG".$per.".";
            $query = execute("select right(isnull(max(no_tagihan),'".$prefix."0000'),".strlen($str_format).")+1 as id from dev_tagihan_m where no_tagihan like '$prefix%' ");
            $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);
        }else{
            $id = $_POST['no_tagihan'];
            $sqldel= "delete from dev_tagihan_m where kode_lokasi='99' and no_tagihan='".$id."' ";
            $sqldel2= "delete from dev_tagihan_d where kode_lokasi='99' and no_tagihan='".$id."' ";
            
            array_push($sql,$sqldel,$sqldel2);
            
        }
        
        $sql1="insert into dev_tagihan_m (no_tagihan,nim,tanggal,kode_lokasi,keterangan) values ('".$id."','".$_POST['nim']."', '".$_POST['tanggal']."','99', '".$_POST['keterangan']."') ";
        
        
        array_push($sql,$sql1);
        
        $i=1;
        for($a=0; $a<count($_POST['kode_jenis']);$a++){
            
            $sql2[$a] = "insert into dev_tagihan_d (no_tagihan,kode_jenis,kode_lokasi,nilai) values ".
            "('".$id."','".$_POST['kode_jenis'][$a]."','99','".$_POST['nilai'][$a]."')";
            array_push($sql,$sql2[$a]);
            
            $i++;
            
        }

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
        $sts=true;	
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["nim"]=$_POST['nim'];
        $result["tanggal"]=$_POST['tanggal'];
        $result["keterangan"]=$_POST['keterangan'];
        $result["sql"]=$sql;
        echo json_encode($result);
    }
    
    function hapus_tagihan(){
        
        getKoneksi();

        $sql = array();
        $sqla="delete from dev_tagihan_m where no_tagihan='".$_POST['no_tagihan']."'";

		$sqlb="delete from dev_tagihan_d where no_tagihan='".$_POST['no_tagihan']."'";
        
        array_push($sql,$sqla,$sqlb);
        $rsa=executeArray($sql);
        // $rsa=execute($sqla);

        // $rsb=execute($sqlb);
        $tmp=array();
        if ($rsa)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal. ".$rsa;
            $sts=false;
        }		
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["sql"]=$sql;
        echo json_encode($result);
    }
	

?>
