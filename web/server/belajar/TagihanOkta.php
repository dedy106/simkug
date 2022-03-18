<?php
// class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function getTagihan(){

        $query = '';
        $output = array();
    
        $kode_lokasi = $_REQUEST['kode_lokasi'];
        $query .= "select no_tagihan, nim, tanggal, keterangan from dev_tagihan_m where kode_lokasi = '$kode_lokasi' ";

        $column_array = array('no_tagihan','nim','tanggal', 'keterangan');
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
            "draw"              =>  intval($_POST["draw"]),
            "recordsTotal"      =>  $filtered_rows,
            "recordsFiltered"   =>  $jml_baris,
            "data"              =>  $data,
        );
        echo json_encode($output);
    }

    function SimpanTagihan() {

    	if($_POST['no_tagihan'] == ""){
		$str_format="0000";
		$periode=date('Y').date('m');
		$per=date('y').date('m');
		$prefix=$_POST['kode_lokasi']."-TG.".$per.".";
		$query = execute("select right(isnull(max(no_tagihan),'".$prefix."0000'),".strlen($str_format).")+1 as id from dev_tagihan_m where no_tagihan like '$prefix%' ");
		$id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);
    	}else{
        $id = $_POST['no_tagihan'];
        $sqldel= "delete from dev_tagihan_m where kode_lokasi='99' and no_tagihan='".$id."' ";
        //$rsdel=execute($sqldel);
		$sqldel2= "delete from dev_tagihan_d where kode_lokasi='99' and no_tagihan='".$id."' ";
        //$rsdel2=execute($sqldel2);
        $query_array = [$sqldel, $sqldel2];
        executeArray($query_array);
    }
        $sql="insert into dev_tagihan_m (no_tagihan,nim,tanggal,kode_lokasi,keterangan) values ('".$id."','".$_POST['nim']."', '".$_POST['tanggal']."','99', '".$_POST['keterangan']."') ";
        $insert = [$sql];
    	$rs=executeArray($insert);
    		$i=1;
	    	for($a=0; $a<count($_POST['kode_jenis']);$a++){
	    	$sql2[$a]= "insert into dev_tagihan_d (no_tagihan,kode_jenis,kode_lokasi,nilai) values ".
                                "('".$id."','".$_POST['kode_jenis'][$a]."','99','".$_POST['nilai'][$a]."')";
            $insert2 = [$sql[$a]];
	        $rs2=executeArray($insert2);		
	        $i++;
    	}
    	

    	$tmp=array();
    	$kode = array();
    	$sts=false;
    	if ($rs and $rs2)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["nim"]=$_POST['nim'];
        $result["nama"]=$_POST['nama'];
        $result["kode_jur"]=$_POST['kode_jur'];
        echo json_encode($result);	
    }

    function getEditTagihan() {

    	$id=$_POST['kode'];   

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select distinct no_tagihan,nim,tanggal,keterangan from dev_tagihan_m where kode_lokasi='99' and no_tagihan='$id' ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }

    $sql2="select a.kode_jenis,b.nama,a.nilai from dev_tagihan_d a 
	inner join dev_jenis b on a.kode_jenis = b.kode_jenis and a.kode_lokasi = b.kode_lokasi
	where a.kode_lokasi='99' and a.no_tagihan='$id' ";
    $rs2 = execute($sql2);					
    
    while ($row2 = $rs2->FetchNextObject(false)){
        $result['daftar2'][] = (array)$row2;
    }

    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);
    }

    function HapusTagihan() {

    	$query="delete from dev_tagihan_m where no_tagihan='".$_POST['no_tagihan']."'";
    	$query2="delete from dev_tagihan_d where no_tagihan='".$_POST['no_tagihan']."'";
        $q = [$query, $query2];
        $rs = executeArray($q);
        $tmp=array();
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

    function getPiutangTagihan()
    {
        $query = '';
        $output = array();
    
        $kode_lokasi = $_REQUEST['kode_lokasi'];
        $query .= "select a.no_tagihan, a.tanggal, a.nama, a.keterangan, a.periode from (select c.no_tagihan,d.nama,c.tanggal,c.periode,c.keterangan,isnull(a.nilai,0) as nilai_t, isnull(b.nilai,0) as nilai_b ,isnull(a.nilai,0)-isnull(b.nilai,0) as saldo
                from dev_tagihan_m c inner JOIN
                (select no_tagihan,sum(nilai) as nilai from dev_tagihan_d group by no_tagihan) a on c.no_tagihan=a.no_tagihan 
                left join 
                (select no_bayar,no_tagihan,sum(nilai) as nilai from dev_bayar_d group by no_tagihan,no_bayar) b on a.no_tagihan=b.no_tagihan and c.no_tagihan=b.no_tagihan 
                inner join dev_siswa d on c.nim=d.nim
                where isnull(a.nilai,0)-isnull(b.nilai,0)>0 and c.kode_lokasi='$kode_lokasi') a";

        $column_array = array('no_tagihan','tanggal','nama', 'keterangan', 'periode');
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
            "draw"              =>  intval($_POST["draw"]),
            "recordsTotal"      =>  $filtered_rows,
            "recordsFiltered"   =>  $jml_baris,
            "data"              =>  $data,
        );
        echo json_encode($output);
    }
?>
