<?php
// class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
    }

    function getPembayaran(){

        getKoneksi();
        $query = '';
        $output = array();
    
        $kode_lokasi = $_REQUEST['kode_lokasi'];
        $query .= "select no_bayar, convert(varchar,tanggal,103) as tanggal, nim, keterangan, periode from dev_bayar_m where kode_lokasi = '$kode_lokasi' ";

        $column_array = array('no_bayar','convert(varchar,tanggal,103)','nim', 'keterangan', 'periode');
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
            $sub_array[] = $row->tanggal;
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

    function getSiswa(){

        getKoneksi();

        $kode_lokasi = $_POST['kode_lokasi'];  
        $nim=$_POST['nim'];
        if($nim == ""){
            $filter_nim = "";
        }else{
            $filter_nim = " and nim ='".$nim."'";
        }
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select nim, nama from dev_siswa where kode_lokasi ='$kode_lokasi' $filter_nim ";
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

    function getTagihanNIM() {
        
        getKoneksi();
        if(isset($_POST['nim'])) {
            $nim = $_POST['nim'];

            $result = array("status"=>"", "rows" => 0, "pesan"=>"");

            $query = "select a.nim,a.no_tagihan,a.keterangan,isnull(b.tagihan,0) as nilai,isnull(c.bayar,0) as bayar,
            isnull(b.tagihan,0)-isnull(c.bayar,0) as sisa_tagihan 
            from dev_tagihan_m a 
            left join (select no_tagihan,kode_lokasi,sum(nilai) as tagihan 
                        from  dev_tagihan_d 
                        group by no_tagihan,kode_lokasi 
                       ) b on a.no_tagihan=b.no_tagihan and a.kode_lokasi=b.kode_lokasi 
            left join (select no_tagihan,kode_lokasi,sum(nilai) as bayar 
                        from  dev_bayar_d 
                        group by no_tagihan,kode_lokasi 
                       ) c on a.no_tagihan=c.no_tagihan and a.kode_lokasi=c.kode_lokasi
            where a.nim = '$nim' and a.kode_lokasi='99' ";
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
        
        getKoneksi();
        $nim        = $_POST['nim'];
        $tanggal    = $_POST['tanggal'];
        $keterangan = $_POST['keterangan'];
        $tmp   = explode("-",$_POST['tanggal']);
        $tahun = $tmp[0];
        $th = substr($tahun,2,2);
        $per = $th.$tmp[1];
        $periode = $tahun.$tmp[1];

        $sql=array();

    	if($_POST['no_bayar'] == ""){
            $str_format="0000";
            //$periode=date('Y').date('m');
            // $per=$periode;
            $prefix=$_POST['kode_lokasi']."-PBR".$per.".";
            $query = execute("select right(isnull(max(no_bayar),'".$prefix."0000'),4)+1 as id from dev_bayar_m where no_bayar like '$prefix%' ");
            $cek = str_pad($query->fields[0], 4, "0000", STR_PAD_LEFT);
            $id  = $prefix.$cek;
    	}else{
            $id = $_POST['no_bayar'];
            $sqldel= "delete from dev_bayar_m where kode_lokasi='99' and no_bayar='".$id."' ";
            $sqldel2= "delete from dev_bayar_d where kode_lokasi='99' and no_bayar='".$id."' ";
            
            array_push($sql,$sqldel,$sqldel2);
        }
        
        $sql1 = "insert into dev_bayar_m (no_bayar,kode_lokasi,nim,tanggal,keterangan,periode) values ('".$id."','99', '".$nim."','".$tanggal."', '".$keterangan."','".$periode."') ";
        
        array_push($sql,$sql1);

    	$i=1;
	    for($a=0; $a<count($_POST['no_tagihan']);$a++){
            $sql2[$a]= "insert into dev_bayar_d (no_bayar,kode_lokasi,no_tagihan,nilai) values 
            ('".$id."','99','".$_POST['no_tagihan'][$a]."','".$_POST['bayar'][$a]."') ";
            $i++;
            array_push($sql,$sql2[$a]);
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
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["id"] = $id;
        $result["sqlx"] = $sql;
        $result["rs"] = $rs;
        echo json_encode($result);	
    }

    function getEditPembayaran(){

        getKoneksi();
				
        $id          = $_POST['kode'];
        $kode_lokasi = $_POST['kode_lokasi']; 
        $nim = $_POST['nim']; 
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select no_bayar,nim,convert(varchar(10),tanggal,121) as tanggal,keterangan,periode from dev_bayar_m where kode_lokasi  ='$kode_lokasi' and no_bayar='$id' ";
        $rs = execute($sql);
        $result['daftar'] = array();
        while($row = $rs->FetchNextObject($toupper=false))
        {
            $result['daftar'][] = (array)$row;
        
        }

        $sql = "select a.nim,a.no_tagihan,a.keterangan,b.tagihan as nilai,isnull(c.bayar,0) as bayar,isnull(d.bayar,0) as bayar2,
        b.tagihan-isnull(d.bayar,0) as sisa_tagihan 
        from dev_tagihan_m a 
        left join (select no_tagihan,kode_lokasi,sum(nilai) as tagihan 
                    from  dev_tagihan_d 
                    group by no_tagihan,kode_lokasi 
                   ) b on a.no_tagihan=b.no_tagihan and a.kode_lokasi=b.kode_lokasi 
        left join (select no_tagihan,kode_lokasi,sum(nilai) as bayar 
                    from  dev_bayar_d 
                    where no_bayar = '$id'
                    group by no_tagihan,kode_lokasi 
                   ) c on a.no_tagihan=c.no_tagihan and a.kode_lokasi=c.kode_lokasi
        left join (select no_tagihan,kode_lokasi,sum(nilai) as bayar 
                   from  dev_bayar_d 
                   where no_bayar <> '$id'
                   group by no_tagihan,kode_lokasi 
                  ) d on a.no_tagihan=d.no_tagihan and a.kode_lokasi=d.kode_lokasi
        where a.nim = '$nim' and a.kode_lokasi='$kode_lokasi' ";
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

    function hapusPembayaran(){
        
        getKoneksi();

        $sql=array();
        $sqla="delete from dev_bayar_m where no_bayar='".$_POST['no_bayar']."'";

		$sqlb="delete from dev_bayar_d where no_bayar='".$_POST['no_bayar']."'";
        
        array_push($sql,$sqla,$sqlb);
        $rsa=executeArray($sql);
        $tmp=array();
        $kode = array();
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