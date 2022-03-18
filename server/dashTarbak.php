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

    function view(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $kode_lokasi="01";
        $periode="201813";
        // if($requestData['kunci'] == "Pbyr"){
            $tahun=substr($periode,0,4);
        // }else{
        //     $tahun= intval(substr($periode,0,4)-1);
        // }
        $tw="tw1";
        $filter="";
        if ($tw == 'tw1'){
            $filter=" a.periode in ('".$tahun."01','".$tahun."02','".$tahun."03') ";
        }else if ($tw == 'tw2'){
            $filter=" a.periode in ('".$tahun."04','".$tahun."05','".$tahun."06') ";
        }else if ($tw == 'tw3'){           
            $filter=" a.periode in ('".$tahun."07','".$tahun."08','".$tahun."09') ";
        }else if ($tw == 'tw4'){  
            $filter=" a.periode in ('".$tahun."10','".$tahun."11','".$tahun."12') ";
        }

        // $column_array = array('a.no_kas','b.nis','c.nama','c.kode_jur','e.kode_kelas','a.keterangan','a.periode','b.total');
        // $order_column = "ORDER BY a.no_kas ".$requestData['order'][0]['dir'];
        // $column_string = join(',', $column_array);

        // if($requestData['order'][0]['column'] != 0){
        //     $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
        // }
        
        $sql="select a.no_kas as no_rekon,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,c.kode_akt,isnull(b.total,0) as total,a.kode_pp,isnull(b.pdd,0) as pdd
        from kas_m a
        inner join (select c.nis,a.no_rekon,c.kode_lokasi,
                    sum(a.nilai) as total,0 as pdd
                    from sis_rekon_d a 
                    inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
                    where a.kode_lokasi='$kode_lokasi' and $filter
                    group by c.nis,a.no_rekon,c.kode_lokasi
                    union all
                    select c.nis,a.no_bukti as no_rekon,c.kode_lokasi,
                    sum(a.nilai) as total,sum(a.nilai) as pdd
                    from sis_cd_d a 
                    inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and $filter  and a.dc='D'
                    group by c.nis,a.no_bukti,c.kode_lokasi
        )b on a.no_kas=b.no_rekon and a.kode_lokasi=b.kode_lokasi
        inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi 
        inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
        where a.kode_lokasi='$kode_lokasi' and $filter
        ";
        
        $rs=$dbLib->execute($sql);

        $jml_baris = $rs->RecordCount();

        if($jml_baris > 0){
            $arr1=$dbLib->LimitQuery($sql,25,1);	
        }else{
            $arr1 = array();
        }

     
        $no=1;
        while ($row = $arr1->FetchNextObject($toupper=false))
        {
            $nestedData=array(); 
            
            $nestedData[] = $no;
            $nestedData[] = $row->no_rekon;
            $nestedData[] = $row->nis;
            $nestedData[] = $row->nama;
            $nestedData[] = $row->kode_jur;
            $nestedData[] = $row->kode_kelas;
            $nestedData[] = $row->keterangan;
            $nestedData[] = $row->periode;
            $nestedData[] = $row->total;
            
            $data[] = $nestedData;
            $no++;
        }

        $result = array(
            "draw" => $requestData['draw'],
            "recordsTotal" => $jml_baris,
            "recordsFiltered" => $jml_baris_filtered,
            "data" => $data,
            "sql" => $sql
        );

        echo json_encode($result);     
    }

    function dataTableServerSide3(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $requestData= $_REQUEST;

        $kode_lokasi=$requestData['kode_lokasi'];
        $periode=$requestData['periode'];
        $tahun=substr($periode,0,4);
        $tw=$requestData['tw'];
        $filter="";
        if ($tw == 'tw1'){
            $filter=" a.periode in ('".$tahun."01','".$tahun."02','".$tahun."03') ";
        }else if ($tw == 'tw2'){
            $filter=" a.periode in ('".$tahun."04','".$tahun."05','".$tahun."06') ";
        }else if ($tw == 'tw3'){           
            $filter=" a.periode in ('".$tahun."07','".$tahun."08','".$tahun."09') ";
        }else if ($tw == 'tw4'){  
            $filter=" a.periode in ('".$tahun."10','".$tahun."11','".$tahun."12') ";
        }

        $column_array = array('a.no_bill','b.nis','c.nama','c.kode_kelas','e.kode_jur','a.keterangan','a.periode','b.total');
        $order_column = "ORDER BY a.no_bill ".$requestData['order'][0]['dir'];
        $column_string = join(',', $column_array);

        if($requestData['order'][0]['column'] != 0){
            $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
        }
        
        $sql="select a.no_bill,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,c.kode_akt,
        isnull(b.total,0) as total
        from sis_bill_m a
        inner join (select a.nis,a.no_bill,a.kode_lokasi,
                        sum(a.nilai) as total
                    from sis_bill_d a 
                    where a.kode_lokasi='$kode_lokasi' and $filter
                    group by a.nis,a.no_bill,a.kode_lokasi 
                    )b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
        inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
        inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
        where a.kode_lokasi='$kode_lokasi' and $filter
        ";

        $rs=$dbLib->execute($sql);

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

            $rs2= $dbLib->execute($sql);
            $jml_baris_filtered = $rs2->RecordCount();
        }

        if($jml_baris > 0){
            $arr1=$dbLib->LimitQuery($sql,25,$requestData['start']);	
        }else{
            $arr1 = array();
        }

     
        $no=1;
        while ($row = $arr1->FetchNextObject($toupper=false))
        {
            $nestedData=array(); 
            
            $nestedData[] = $no;
            $nestedData[] = $row->no_bill;
            $nestedData[] = $row->nis;
            $nestedData[] = $row->nama;
            $nestedData[] = $row->kode_jur;
            $nestedData[] = $row->kode_kelas;
            $nestedData[] = $row->keterangan;
            $nestedData[] = $row->periode;
            $nestedData[] = $row->total;
            
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


    function dataTableServerSide2(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");

        $requestData= $_REQUEST;

        $kode_lokasi=$requestData['kode_lokasi'];
        $periode=$requestData['periode'];
        if($requestData['kunci'] == "Pbyr"){
            $tahun=substr($periode,0,4);
        }else{
            $tahun= intval(substr($periode,0,4)-1);
        }
        $tw=$requestData['tw'];
        $filter="";
        if ($tw == 'tw1'){
            $filter=" a.periode in ('".$tahun."01','".$tahun."02','".$tahun."03') ";
        }else if ($tw == 'tw2'){
            $filter=" a.periode in ('".$tahun."04','".$tahun."05','".$tahun."06') ";
        }else if ($tw == 'tw3'){           
            $filter=" a.periode in ('".$tahun."07','".$tahun."08','".$tahun."09') ";
        }else if ($tw == 'tw4'){  
            $filter=" a.periode in ('".$tahun."10','".$tahun."11','".$tahun."12') ";
        }

        $column_array = array('a.no_kas','b.nis','c.nama','c.kode_jur','e.kode_kelas','a.keterangan','a.periode','b.total');
        $order_column = "ORDER BY a.no_kas ".$requestData['order'][0]['dir'];
        $column_string = join(',', $column_array);

        if($requestData['order'][0]['column'] != 0){
            $order_column = "ORDER BY ".$column_array[$requestData['order'][0]['column']]." ".$requestData['order'][0]['dir'];
        }
        
        $sql="select a.no_kas,a.keterangan,b.nis,c.nama,e.kode_jur,c.kode_kelas,a.periode,c.kode_akt,isnull(b.total,0) as total,a.kode_pp,isnull(b.pdd,0) as pdd
        from kas_m a
        inner join (select c.nis,a.no_rekon,c.kode_lokasi,
                    sum(a.nilai) as total,0 as pdd
                    from sis_rekon_d a 
                    inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp 
                    where a.kode_lokasi='$kode_lokasi' and $filter
                    group by c.nis,a.no_rekon,c.kode_lokasi
                    union all
                    select c.nis,a.no_bukti as no_rekon,c.kode_lokasi,
                    sum(a.nilai) as total,sum(a.nilai) as pdd
                    from sis_cd_d a 
                    inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and $filter  and a.dc='D'
                    group by c.nis,a.no_bukti,c.kode_lokasi
        )b on a.no_kas=b.no_rekon and a.kode_lokasi=b.kode_lokasi
        inner join sis_siswa c on b.nis=c.nis and b.kode_lokasi=c.kode_lokasi 
        inner join sis_kelas e on c.kode_kelas=e.kode_kelas and c.kode_lokasi=e.kode_lokasi and c.kode_pp=e.kode_pp
        where a.kode_lokasi='$kode_lokasi' and $filter
        ";
        
        $rs=$dbLib->execute($sql);

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

            $rs2= $dbLib->execute($sql);
            $jml_baris_filtered = $rs2->RecordCount();
        }

        if($jml_baris > 0){
            $arr1=$dbLib->LimitQuery($sql,25,$requestData['start']);	
        }else{
            $arr1 = array();
        }

     
        $no=1;
        while ($row = $arr1->FetchNextObject($toupper=false))
        {
            $nestedData=array(); 
            
            $nestedData[] = $no;
            $nestedData[] = $row->no_kas;
            $nestedData[] = $row->nis;
            $nestedData[] = $row->nama;
            $nestedData[] = $row->kode_jur;
            $nestedData[] = $row->kode_kelas;
            $nestedData[] = $row->keterangan;
            $nestedData[] = $row->periode;
            $nestedData[] = $row->total;
            
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

?>
