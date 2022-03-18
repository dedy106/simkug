<?php

    global $dirSeparator;
    global $serverDir;
    if (!defined('NEW_LINE'))
        define("NEW_LINE", "<br>\r\n");

    define("WIN", "win");
    define("LINUX", "linux");
    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
    {
        $platform = WIN;
        $dirSeparator = "\\";
        $separator = ";";
    }
    else
    {
        $platform = LINUX;
        $dirSeparator = "/";
        $separator = ":";
    }
    error_reporting (E_ALL & ~E_NOTICE );

    $serverDir = __FILE__;

    global $rootDir;

    $pos = strrpos($serverDir, $dirSeparator);
    $serverDir = substr($serverDir, 0, $pos);
    $pos = strrpos($serverDir, $dirSeparator);
    $rootDir = substr($serverDir, 0, $pos);
    $pos = strrpos($rootDir, $dirSeparator);
    $path = $rootDir;
    $rootDir = substr($rootDir,$pos);

    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function dataTableServerSide(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");


        $requestData= $_REQUEST;

        $column_array = array('a.id_aset','a.tgl_oleh','a.nama','a.keterangan','a.status','a.n1','a.spek','a.no_seri','a.pnj');
        $order_column = "ORDER BY a.id_aset ".$requestData['order'][0]['dir'];
        $column_string = join(',', $column_array);

        if($requestData['order'][0]['column'] != 0){
            $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
        }

        // $additional_filter_string = ($additional_filter !== null ? "where $additional_filter" : null);
        
        $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1,a.spek,a.no_seri,a.pnj
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_proyek = '".$requestData['kode_proyek']."'  ";

        // $data["sql"]=$sql;

        $sql2 = "select count(*) as jumlah
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_proyek='".$requestData['kode_proyek']."' ";
        $rs=$dbLib->execute($sql2);

        $jml_baris = $rs->fields[0];
        // $jml_baris_filtered = $jml_baris;

        if(empty($requestData['search']['value'])){
            // $data_filter = $dbLib->execute("$sql OFFSET ".$requestData['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ");
            $sql.="$order_column ";
            // echo "$sql1 UNION $sql2 $order_column OFFSET ".$_POST['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ";
            $jml_baris_filtered = $jml_baris;
        }else{
            $search = $requestData['search']['value'];
            $filter_string = " and (";

            for($i=0; $i<count($column_array); $i++){
                // $search_string = $dbLib->qstr("%$search%");
                if($i == (count($column_array) - 1)){
                    $filter_string .= $column_array[$i]." like '".$search."%' )";
                }else{
                    $filter_string .= $column_array[$i]." like '".$search."%' or ";
                }
            }

            $sql2.=" $filter_string";

            $sql.=" $filter_string $order_column  ";

            $rs2= $dbLib->execute($sql2);
            $jml_baris_filtered = $rs2->fields[0];
        }

        if($jml_baris > 0){
            // $arr1 = $dbLib->execute($sql);
            $arr1=$dbLib->LimitQuery($sql,25,$requestData['start']);	
        }else{
            $arr1 = array();
        }

     
        while ($row = $arr1->FetchNextObject($toupper=false))
		{
            $nestedData=array(); 

            $nestedData[] = $row->id_aset;
			$nestedData[] = $row->nama;
            $nestedData[] = $row->tgl_oleh;
            $nestedData[] = $row->n1;
			$nestedData[] = $row->spek;
            $nestedData[] = $row->no_seri;
			$nestedData[] = $row->pnj;
            $nestedData[] = $row->status;
            
            
            
            
            $data[] = $nestedData;
        }

        $result = array(
            "draw" => $requestData['draw'],
            "recordsTotal" => $jml_baris,
            "recordsFiltered" => $jml_baris_filtered,
            "data" => $data,
        );

        // echo "<br> SQL1 : <br>";
        // echo $sql;
        // // echo "<br> ini request : <br>";
        // // echo json_encode($_REQUEST);
        // echo "<br> SQL2 : <br>";
        // echo $sql2;
        // echo "<br> jml_baris =".$jml_baris;
        // echo "<br> jml_baris_filter =".$jml_baris_filtered;

        echo json_encode($result);
    }

    function dataTableServerSide2(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");


        $requestData= $_REQUEST;

        $column_array = array('a.id_aset','a.tgl_oleh','a.nama','a.keterangan','a.status','a.n1','a.spek','a.no_seri','a.pnj');
        $order_column = "ORDER BY a.id_aset ".$requestData['order'][0]['dir'];
        $column_string = join(',', $column_array);

        if($requestData['order'][0]['column'] != 0){
            $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
        }

        // $additional_filter_string = ($additional_filter !== null ? "where $additional_filter" : null);
        
        $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1,a.spek,a.no_seri,a.pnj
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_pp = '".$requestData['kode_pp']."'  ";

        // $data["sql"]=$sql;

        $sql2 = "select count(*) as jumlah
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_pp='".$requestData['kode_pp']."' ";
        $rs=$dbLib->execute($sql2);

        $jml_baris = $rs->fields[0];
        // $jml_baris_filtered = $jml_baris;

        if(empty($requestData['search']['value'])){
            // $data_filter = $dbLib->execute("$sql OFFSET ".$requestData['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ");
            $sql.="$order_column ";
            // echo "$sql1 UNION $sql2 $order_column OFFSET ".$_POST['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ";
            $jml_baris_filtered = $jml_baris;
        }else{
            $search = $requestData['search']['value'];
            $filter_string = " and (";

            for($i=0; $i<count($column_array); $i++){
                // $search_string = $dbLib->qstr("%$search%");
                if($i == (count($column_array) - 1)){
                    $filter_string .= $column_array[$i]." like '".$search."%' )";
                }else{
                    $filter_string .= $column_array[$i]." like '".$search."%' or ";
                }
            }

            $sql2.=" $filter_string";

            $sql.=" $filter_string $order_column  ";

            $rs2= $dbLib->execute($sql2);
            $jml_baris_filtered = $rs2->fields[0];
        }

        if($jml_baris > 0){
            // $arr1 = $dbLib->execute($sql);
            $arr1=$dbLib->LimitQuery($sql,25,$requestData['start']);	
        }else{
            $arr1 = array();
        }

     
        while ($row = $arr1->FetchNextObject($toupper=false))
		{
            $nestedData=array(); 

            $nestedData[] = $row->id_aset;
            $nestedData[] = $row->tgl_oleh;
            $nestedData[] = $row->nama;
            $nestedData[] = $row->keterangan;
            $nestedData[] = $row->status;
            $nestedData[] = $row->n1;
            $nestedData[] = $row->spek;
            $nestedData[] = $row->no_seri;
            $nestedData[] = $row->pnj;
            
            $data[] = $nestedData;
        }

        $result = array(
            "draw" => $requestData['draw'],
            "recordsTotal" => $jml_baris,
            "recordsFiltered" => $jml_baris_filtered,
            "data" => $data,
        );

        // echo "<br> SQL1 : <br>";
        // echo $sql;
        // // echo "<br> ini request : <br>";
        // // echo json_encode($_REQUEST);
        // echo "<br> SQL2 : <br>";
        // echo $sql2;
        // echo "<br> jml_baris =".$jml_baris;
        // echo "<br> jml_baris_filter =".$jml_baris_filtered;

        echo json_encode($result);
    }

    function dataTableServerSide3(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");


        $requestData= $_REQUEST;

        $column_array = array('a.id_aset','a.tgl_oleh','a.nama','a.keterangan','a.status','a.n1','a.spek','a.no_seri','a.pnj');
        $order_column = "ORDER BY a.id_aset ".$requestData['order'][0]['dir'];
        $column_string = join(',', $column_array);

        if($requestData['order'][0]['column'] != 0){
            $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
        }

        // $additional_filter_string = ($additional_filter !== null ? "where $additional_filter" : null);
        
        $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1,a.spek,a.no_seri,a.pnj
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_kateg = '".$requestData['kode_kateg']."'  ";

        // $data["sql"]=$sql;

        $sql2 = "select count(*) as jumlah
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_kateg='".$requestData['kode_kateg']."' ";
        $rs=$dbLib->execute($sql2);

        $jml_baris = $rs->fields[0];
        // $jml_baris_filtered = $jml_baris;

        if(empty($requestData['search']['value'])){
            // $data_filter = $dbLib->execute("$sql OFFSET ".$requestData['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ");
            $sql.="$order_column ";
            // echo "$sql1 UNION $sql2 $order_column OFFSET ".$_POST['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ";
            $jml_baris_filtered = $jml_baris;
        }else{
            $search = $requestData['search']['value'];
            $filter_string = " and (";

            for($i=0; $i<count($column_array); $i++){
                // $search_string = $dbLib->qstr("%$search%");
                if($i == (count($column_array) - 1)){
                    $filter_string .= $column_array[$i]." like '".$search."%' )";
                }else{
                    $filter_string .= $column_array[$i]." like '".$search."%' or ";
                }
            }

            $sql2.=" $filter_string";

            $sql.=" $filter_string $order_column  ";

            $rs2= $dbLib->execute($sql2);
            $jml_baris_filtered = $rs2->fields[0];
        }

        if($jml_baris > 0){
            // $arr1 = $dbLib->execute($sql);
            $arr1=$dbLib->LimitQuery($sql,25,$requestData['start']);	
        }else{
            $arr1 = array();
        }

     
        while ($row = $arr1->FetchNextObject($toupper=false))
		{
            $nestedData=array(); 

            $nestedData[] = $row->id_aset;
            $nestedData[] = $row->tgl_oleh;
            $nestedData[] = $row->nama;
            $nestedData[] = $row->keterangan;
            $nestedData[] = $row->status;
            $nestedData[] = $row->n1;
            $nestedData[] = $row->spek;
            $nestedData[] = $row->no_seri;
            $nestedData[] = $row->pnj;
            
            $data[] = $nestedData;
        }

        $result = array(
            "draw" => $requestData['draw'],
            "recordsTotal" => $jml_baris,
            "recordsFiltered" => $jml_baris_filtered,
            "data" => $data,
        );

        // echo "<br> SQL1 : <br>";
        // echo $sql;
        // // echo "<br> ini request : <br>";
        // // echo json_encode($_REQUEST);
        // echo "<br> SQL2 : <br>";
        // echo $sql2;
        // echo "<br> jml_baris =".$jml_baris;
        // echo "<br> jml_baris_filter =".$jml_baris_filtered;

        echo json_encode($result);
    }

    function dataTableServerSide4(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");


        $requestData= $_REQUEST;

        $column_array = array('a.id_aset','a.tgl_oleh','a.nama','a.keterangan','a.status','a.n1','a.spek','a.no_seri','a.pnj');
        $order_column = "ORDER BY a.id_aset ".$requestData['order'][0]['dir'];
        $column_string = join(',', $column_array);

        if($requestData['order'][0]['column'] != 0){
            $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
        }

        // $additional_filter_string = ($additional_filter !== null ? "where $additional_filter" : null);
        
        $sql = "select a.id_aset,a.tgl_oleh,a.nama,a.keterangan,a.status,a.n1,a.spek,a.no_seri,a.pnj
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_klp = '".$requestData['kode_klp']."'  ";

        // $data["sql"]=$sql;

        $sql2 = "select count(*) as jumlah
        from am_aset a 
                left join am_proyek b on a.kode_proyek=b.kode_proyek 
                left join am_pp c on a.kode_pp=c.kode_pp 
                left join am_subpp d on a.kode_subpp=d.kode_subpp and a.kode_pp=d.kode_pp
                left join am_lokasi_klp e on a.kode_klp=e.kode_klp 
                left join am_lokasi f on a.kode_lokam=f.kode_lokam and a.kode_klp=f.kode_klp
                left join am_sublok g on a.kode_sublok=g.kode_sublok and a.kode_lokam=g.kode_lokam and a.kode_klp=g.kode_klp and a.kode_pp=g.kode_pp and a.kode_subpp=g.kode_subpp
                left join am_kateg h on a.kode_kateg=h.kode_kateg 
                left join am_subkateg i on a.kode_subkateg=i.kode_subkateg and a.kode_kateg=i.kode_kateg
                left join am_klpbarang j on a.kode_klpbarang=j.kode_klpbarang and a.kode_kateg=j.kode_kateg and a.kode_subkateg=j.kode_subkateg
                left join vendor k on a.kode_vendor=k.kode_vendor 
        where a.kode_klp='".$requestData['kode_klp']."' ";
        $rs=$dbLib->execute($sql2);

        $jml_baris = $rs->fields[0];
        // $jml_baris_filtered = $jml_baris;

        if(empty($requestData['search']['value'])){
            // $data_filter = $dbLib->execute("$sql OFFSET ".$requestData['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ");
            $sql.="$order_column ";
            // echo "$sql1 UNION $sql2 $order_column OFFSET ".$_POST['start']." ROWS FETCH NEXT $jml_baris ROWS ONLY ";
            $jml_baris_filtered = $jml_baris;
        }else{
            $search = $requestData['search']['value'];
            $filter_string = " and (";

            for($i=0; $i<count($column_array); $i++){
                // $search_string = $dbLib->qstr("%$search%");
                if($i == (count($column_array) - 1)){
                    $filter_string .= $column_array[$i]." like '".$search."%' )";
                }else{
                    $filter_string .= $column_array[$i]." like '".$search."%' or ";
                }
            }

            $sql2.=" $filter_string";

            $sql.=" $filter_string $order_column  ";

            $rs2= $dbLib->execute($sql2);
            $jml_baris_filtered = $rs2->fields[0];
        }

        if($jml_baris > 0){
            // $arr1 = $dbLib->execute($sql);
            $arr1=$dbLib->LimitQuery($sql,25,$requestData['start']);	
        }else{
            $arr1 = array();
        }

     
        while ($row = $arr1->FetchNextObject($toupper=false))
		{
            $nestedData=array(); 

            $nestedData[] = $row->id_aset;
            $nestedData[] = $row->tgl_oleh;
            $nestedData[] = $row->nama;
            $nestedData[] = $row->keterangan;
            $nestedData[] = $row->status;
            $nestedData[] = $row->n1;
            $nestedData[] = $row->spek;
            $nestedData[] = $row->no_seri;
            $nestedData[] = $row->pnj;
            
            
            $data[] = $nestedData;
        }

        $result = array(
            "draw" => $requestData['draw'],
            "recordsTotal" => $jml_baris,
            "recordsFiltered" => $jml_baris_filtered,
            "data" => $data,
        );

        // echo "<br> SQL1 : <br>";
        // echo $sql;
        // // echo "<br> ini request : <br>";
        // // echo json_encode($_REQUEST);
        // echo "<br> SQL2 : <br>";
        // echo $sql2;
        // echo "<br> jml_baris =".$jml_baris;
        // echo "<br> jml_baris_filter =".$jml_baris_filtered;

        echo json_encode($result);
    }

    function register(){
        // $dbconn = db_Connect();
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");


        $db_token["nik"] = $_POST["nik"];
        // $db_token["api_key"] = random_string('alnum', 20);
        $api = rand('alnum', 20);
        $api = md5($api);

        $db_token["api_key"]=$api;
        $db_token["token"] = $_POST["token"];
        $db_token["kode_lokasi"] = $_POST["kode_lokasi"];

        $db_token["os"] = 'BROWSER';
        $db_token["ver"] = '';
        $db_token["model"] = '';
        $db_token["uuid"] = '';

        $db_token["tgl_login"] = date('Y-m-d H:i:s');
        
        $sql="insert into api_token_auth (nik,api_key,token,kode_lokasi,os,tgl_login) 
        values ('".$db_token["nik"]."','".$db_token["api_key"]."','".$db_token["token"]."','".$db_token["kode_lokasi"]."','".$db_token["os"]."','".$db_token["tgl_login"]."') ";

        $token_sql= $dbLib->execute($sql);
        // $token_sql = $dbLib->AutoExecute('api_token_auth', $db_token, 'INSERT');
        if($token_sql){
            $response['msg'] = "ID registered";
        }else{
            $response['msg'] = "Failed to register";
        }

        echo json_encode($response);
    }

    function view(){
        
        $test = rand('alnum', 20);
        $test = md5($test);
        echo $test;
    }

    function send(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        if($_POST['jenis'] == "Approval VP"){
            $cek = $dbLib->execute("select nik, api_key, token, tgl_login from api_token_auth where os = 'BROWSER' and nik='".$_POST['nik_app2']."' order by tgl_login desc");
            $nik=$_POST['nik_app2'];
        }else if($_POST['jenis'] == "Approval Dir Unit"){
            $cek = $dbLib->execute("select nik, api_key, token, tgl_login from api_token_auth where os = 'BROWSER' and nik='".$_POST['nik_app3']."' order by tgl_login desc");
            $nik=$_POST['nik_app3'];
        }else if($_POST['jenis'] == "Approval RRA Anggaran"){
            $cek = $dbLib->execute("select nik, api_key, token, tgl_login from api_token_auth where os = 'BROWSER' nik='".$_POST['nik_app4']."'  order by tgl_login desc");
            $nik=$_POST['nik_app4'];
        }else if($_POST['jenis'] == "Approval Direksi"){
            $cek = $dbLib->execute("select nik, api_key, token, tgl_login from api_token_auth where os = 'BROWSER' nik='".$_POST['nik_buat']."' order by tgl_login desc");
            $nik=$_POST['nik_buat'];
        }
        
        $id=$_POST['no_app'];
        $judul = "Pengajuan anda telah di-".$_POST['status']." $id";
        $isi = "(".$_POST['jenis'].") Pengajuan Anda telah di-".$_POST['status']." oleh ".$nik;

        $sql6="insert into api_notif
        values ('".$nik."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'".$_POST['kode_pp']."')
        ";
        $rs6=$dbLib->execute($sql6);

        $title = $judul;
        $content      = array(
            "en" => $isi
        );
    
        $fields = array(
            'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", //appid siaga
    
            // all subscribed user
            // 'included_segments' => array(
            //     'All'
            // ),
    
            // per token id
            'include_player_ids' => array($cek->fields[2]),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);

        // echo json_encode($response);
    }

    function sendNotifUserApp(){

        // CEK
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $tmp=explode("Approval",$_POST['jenis']);
        // if($tmp[1] == "VP"){
            $nik=$_POST['nik_app2'];
            $nika=$_POST['nik_app1'];
        // }else if($tmp[1] == "Dir Unit"){
        //     $nik=$_POST['nik_app3'];
        //     $nika=$_POST['nik_app2'];
        // }else if($tmp[1] == "RRA Anggaran"){
        //     $nik=$_POST['nik_app4'];
        //     $nika=$_POST['nik_app3'];
        // }else if($tmp[1] == "Direksi"){
        //     $nik=$_POST['nik_buat'];
        //     $nika=$_POST['nik_app4'];
        // }

        $cek = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$nik."','".$_POST['nik_buat']."') order by tgl_login desc");
        $cek2 = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$_POST['nik_buat']."') order by tgl_login desc");

        $judul = "Pengajuan ".$_POST['no_app']." telah di".$_POST['status']." oleh ".$nika;
        $isi = "(".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        if($_POST['status'] != "APPROVE"){
            $isi = "(Non ".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        }

        $sql6="insert into api_notif values ('".$nik."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs6=$dbLib->execute($sql6);

        $sql7="insert into api_notif values ('".$_POST['nik_buat']."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs7=$dbLib->execute($sql7);

    
        $title = $judul;
        $content      = array(
            "en" => $isi
        );
    
        $fields = array(
            'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
            // all subscribed user
            // 'included_segments' => array(
            //     'All'
            // ),
    
            // per token id
            'include_player_ids' => array($cek->fields[2],$cek2->fields[2]),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);
    
        // echo json_encode($response);
        // echo "NOTIF SENT";
    }

    function sendNotifUserAppDir(){

        // CEK
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $tmp=explode("Approval",$_POST['jenis']);
        // if($tmp[1] == "VP"){
            // $nik=$_POST['nik_app2'];
            // $nika=$_POST['nik_app1'];
        // }else if($tmp[1] == "Dir Unit"){
            $nik=$_POST['nik_app3'];
            $nika=$_POST['nik_app2'];
        // }else if($tmp[1] == "RRA Anggaran"){
        //     $nik=$_POST['nik_app4'];
        //     $nika=$_POST['nik_app3'];
        // }else if($tmp[1] == "Direksi"){
        //     $nik=$_POST['nik_buat'];
        //     $nika=$_POST['nik_app4'];
        // }

        $cek = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$nik."') order by tgl_login desc");
        $cek2 = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$_POST['nik_buat']."') order by tgl_login desc");

        $judul = "Pengajuan ".$_POST['no_app']." telah di".$_POST['status']." oleh ".$nika;
        $isi = "(".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        if($_POST['status'] != "APPROVE"){
            $isi = "(Non ".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        }

        $sql6="insert into api_notif values ('".$nik."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs6=$dbLib->execute($sql6);
        $sql7="insert into api_notif values ('".$_POST['nik_buat']."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs7=$dbLib->execute($sql7);

    
        $title = $judul;
        $content      = array(
            "en" => $isi
        );
    
        $fields = array(
            'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
            // all subscribed user
            // 'included_segments' => array(
            //     'All'
            // ),
    
            // per token id
            'include_player_ids' => array($cek->fields[2],$cek2->fields[2]),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);
    
        // echo json_encode($response);
        // echo "NOTIF SENT";
    }

    function sendNotifUserAppRRA(){

        // CEK
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $tmp=explode("Approval",$_POST['jenis']);
        // if($tmp[1] == "VP"){
            // $nik=$_POST['nik_app2'];
            // $nika=$_POST['nik_app1'];
        // }else if($tmp[1] == "Dir Unit"){
        //     $nik=$_POST['nik_app3'];
        //     $nika=$_POST['nik_app2'];
        // }else if($tmp[1] == "RRA Anggaran"){
            $nik=$_POST['nik_app4'];
            $nika=$_POST['nik_app3'];
        // }else if($tmp[1] == "Direksi"){
        //     $nik=$_POST['nik_buat'];
        //     $nika=$_POST['nik_app4'];
        // }

        $cek = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$nik."') order by tgl_login desc");
        $cek2 = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$_POST['nik_buat']."') order by tgl_login desc");

        $judul = "Pengajuan ".$_POST['no_app']." telah di".$_POST['status']." oleh ".$nika;
        $isi = "(".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        if($_POST['status'] != "APPROVE"){
            $isi = "(Non ".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        }

        $sql6="insert into api_notif values ('".$nik."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs6=$dbLib->execute($sql6);
        $sql7="insert into api_notif values ('".$_POST['nik_buat']."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs7=$dbLib->execute($sql7);

    
        $title = $judul;
        $content      = array(
            "en" => $isi
        );
    
        $fields = array(
            'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
            // all subscribed user
            // 'included_segments' => array(
            //     'All'
            // ),
    
            // per token id
            'include_player_ids' => array($cek->fields[2],$cek2->fields[2]),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);
    
        // echo json_encode($response);
        // echo "NOTIF SENT";
    }

    function sendNotifUserAppDireksi(){

        // CEK
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $tmp=explode("Approval",$_POST['jenis']);
        // if($tmp[1] == "VP"){
            // $nik=$_POST['nik_app2'];
            // $nika=$_POST['nik_app1'];
        // }else if($tmp[1] == "Dir Unit"){
        //     $nik=$_POST['nik_app3'];
        //     $nika=$_POST['nik_app2'];
        // }else if($tmp[1] == "RRA Anggaran"){
        //     $nik=$_POST['nik_app4'];
        //     $nika=$_POST['nik_app3'];
        // }else if($tmp[1] == "Direksi"){
            $nik=$_POST['nik_buat'];
            
        // }

        $cek = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$nik."') order by tgl_login desc");

        $judul = "Pengajuan ".$_POST['no_app']." telah di".$_POST['status']." oleh ".$nika;
        $isi = "(".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        if($_POST['status'] != "APPROVE"){
            $isi = "(Non ".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];
        }

        $sql6="insert into api_notif values ('".$nik."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs6=$dbLib->execute($sql6);
        

        if($_POST['status'] != "APPROVE"){
            $nika=$_POST['nik_app3'];
            $cek2 = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$nika."') order by tgl_login desc");
            $sql7="insert into api_notif values ('".$nika."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
            $rs7=$dbLib->execute($sql7);
        }
    
        $title = $judul;
        $content      = array(
            "en" => $isi
        );
        if($_POST['status'] == "APPROVE"){
            $sendto = array($cek->fields[2]);
        }else{
            $sendto = array($cek->fields[2],$cek2->fields[2]);
        }
        
    
        $fields = array(
            'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
            // all subscribed user
            // 'included_segments' => array(
            //     'All'
            // ),
    
            // per token id
            'include_player_ids' => $sendto,
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);
    
        // echo json_encode($response);
        // echo "NOTIF SENT";
    }


    function random_string($type = 'alnum', $len = 8)
	{
		switch ($type)
		{
			case 'basic':
				return mt_rand();
			case 'alnum':
			case 'numeric':
			case 'nozero':
			case 'alpha':
				switch ($type)
				{
					case 'alpha':
						$pool = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
						break;
					case 'alnum':
						$pool = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
						break;
					case 'numeric':
						$pool = '0123456789';
						break;
					case 'nozero':
						$pool = '123456789';
						break;
				}
				return substr(str_shuffle(str_repeat($pool, ceil($len / strlen($pool)))), 0, $len);
			case 'unique': // todo: remove in 3.1+
			case 'md5':
				return md5(uniqid(mt_rand()));
			case 'encrypt': // todo: remove in 3.1+
			case 'sha1':
				return sha1(uniqid(mt_rand(), TRUE));
		}
    }

    
    
    function saveid(){
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $api_key = random_string('alnum', 20);
        
        $sql="select count(*) as jum from token_notif where nik='".$_POST['nik']."' and token='".$_POST['token']."' ";
        $response['sql']=$sql;

        $rs=$dbLib->execute($sql);
        if ($rs->fields[0] == 0 ){
            // $token_sql = $dbconn->AutoExecute('token_notif', $db_token, 'INSERT');
            $sql="insert into token_notif values ('".$_POST['nik']."','".$api_key."','".$_POST['token']."','".$_POST['kode_lokasi']."',getdate(),'Browser','','','')";
            $response['sql2']=$sql;
            $token_sql=$dbLib->execute($sql);
        }else{
            $token_sql = false;
        }

        
        if($token_sql){
            $response['msg'] = "ID registered";
        }else{
            $response['msg'] = "Failed to register";
        }

        echo json_encode($response);
    }

    function test(){
        echo"
        <script src='https://cdn.onesignal.com/sdks/OneSignalSDK.js' async=''></script>
        <script>
        var OneSignal = window.OneSignal || [];
        OneSignal.push(
            function() {
                OneSignal.init({
                appId: '1ca967ab-9375-4edf-abfd-12a22fc073a5',
                });
            }
        );
        </script>
        ";
    }

    function sendNotifUser(){

        // CEK
        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $judul = "Pengajuan baru ".$_POST['no_app'];
        $isi = "(".$_POST['jenis'].") Pengajuan dibuat oleh ".$_POST['nik_buat'];

        $sql6="insert into api_notif values ('".$_POST['nik_app']."',getdate(),'$judul','$isi','".$_POST['kode_lokasi']."','siagaweb',0,'') ";
        $rs6=$dbLib->execute($sql6);

        $cek = $dbLib->execute("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('".$_POST['nik_app']."') order by tgl_login desc");
    
        $title = $judul;
        $content      = array(
            "en" => $isi
        );
    
        $fields = array(
            'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
            // all subscribed user
            // 'included_segments' => array(
            //     'All'
            // ),
    
            // per token id
            'include_player_ids' => array($cek->fields[2]),
    
    
            'data' => array(
                "foo" => "bar"
            ),
            'contents' => $content,
            'headings' => array(
                'en' => $title
            )
            // 'web_buttons' => $hashes_array
        );
        
        $fields = json_encode($fields);
        // print("\nJSON sent:\n");
        // print($fields);
        
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
        curl_setopt($ch, CURLOPT_HTTPHEADER, array(
            'Content-Type: application/json; charset=utf-8',
            'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
        ));
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, TRUE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        
        $response = curl_exec($ch);
        curl_close($ch);
    
        // echo json_encode($response);
        // echo "NOTIF SENT";
    }
    
?>
