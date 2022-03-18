<?php
// class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function getPembayaran(){

        $query = '';
        $output = array();
    
        $kode_lokasi = $_REQUEST['kode_lokasi'];
        $query .= "select no_bayar, tanggal, nim, keterangan, periode from dev_bayar_m where kode_lokasi = '$kode_lokasi' ";

        $column_array = array('no_bayar','tanggal','nim', 'keterangan', 'periode');
        $order_column = 'order by no_bayar '.$_POST['order'][0]['dir'];
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
            $query .= ' order by no_bayar ';
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
            $sub_array[] = $row->no_bayar;
            $sub_array[] = date('d/m/y', strtotime($row->tanggal));
            $sub_array[] = $row->nim;
            $sub_array[] = $row->keterangan;
            $sub_array[] = $row->periode;
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

    function getSiswa()
    {
        $query = "select nim, nama from dev_siswa";
        $cek   = execute($query);
        while($row = $cek->FetchNextObject(false)){
        $result['siswa'][] = (array)$row;    
        }
        $result['status'] = true;
        echo json_encode($result);
        
    }

    function getTagihanNIM() {
        if(isset($_POST['nim'])) {
            $nim = $_POST['nim'];

            $result = array("status"=>"", "rows" => 0, "pesan"=>"");

            $query = "select a.no_tagihan, keterangan, b.nilai, ISNULL(c.nilai,0) bayar from dev_tagihan_m a 
            join dev_tagihan_d b on a.no_tagihan=b.no_tagihan left join dev_bayar_d c on 
            a.no_tagihan=c.no_tagihan where a.kode_lokasi = '99' and a.nim = '$nim'";
             $cek  = execute($query); 

            while ($row = $cek->FetchNextObject(false)){
            $result['data'][] = (array)$row;
            }

            $result['status'] = TRUE;
            $result['sql'] = $query;
            echo json_encode($result);
        }
    }

    function SimpanPembayaran() {
        $nim        = $_POST['nim'];
        $tanggal    = $_POST['tanggal'];
        $keterangan = $_POST['keterangan'];
        $periode    = date('Ym');
    	if($_POST['no_bayar'] == ""){
		$str_format="0000";
		//$periode=date('Y').date('m');
		$per=date('y').date('m');
		$prefix=$_POST['kode_lokasi']."-PBR.".$per.".";
		$query = execute("select right(isnull(max(no_bayar),'".$prefix."0000'),4)+1 as id from dev_bayar_m where no_bayar like '$prefix%' ");
        $cek = str_pad($query->fields[0], 4, "0000", STR_PAD_LEFT);
		$id  = $prefix.$cek;
    	}
    	$sql="insert into dev_bayar_m (no_bayar,kode_lokasi,nim,tanggal,keterangan,periode) values ('".$id."','99', '".$nim."','".$tanggal."', '".$keterangan."', '".$periode."') ";
    	$insert1 = [$sql];
        $test = executeArray($insert1);
    		$i=1;
	    	for($a=0; $a<count($_POST['no_tagihan']);$a++){
	    	$sql2[$a]= "insert into dev_bayar_d (no_bayar,kode_lokasi,no_tagihan,nilai) values ".
	                            "('".$id."','99','".$_POST['no_tagihan'][$a]."','".$_POST['bayar'][$a]."')";
	        $insert2 = [$sql2[$a]];
            $cek2    = executeArray($insert2);
	        $i++;
    	}
    	

    	$tmp=array();
    	$kode = array();
    	$sts=false;
    	if ($cek and $cek2)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["id"] = $id;
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
    	$rs=execute($query);
    	$query2="delete from dev_tagihan_d where no_tagihan='".$_POST['no_tagihan']."'";
        $rsa=execute($query2);
        $tmp=array();
        if ($rs and $rsa)
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
?>