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

        $query = '';
        $output = array();

        $kode_lokasi = $_POST['kode_lokasi'];
        $kode = $_POST['kode_pp'];
        $query .= "select distinct a.no_fa, a.tgl_perolehan, a.nama,a.catatan,a.nilai from fa_asset a inner join pp b on a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '$kode_lokasi' and a.kode_pp='$kode' ";

        $column_array = array('a.no_fa', 'a.tgl_perolehan', 'a.nama','a.catatan','a.nilai');
        $order_column = 'order by a.no_fa '.$_POST['order'][0]['dir'];
        $column_string = join(',', $column_array);

        $res =$dbLib->execute($query);
        $jml_baris = $res->recordcount();
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
            $query .= ' order by a.no_fa ';
        }
        if($_POST["length"] != -1)
        {
            $query .= ' offset ' . $_POST['start'] . ' rows fetch next ' . $_POST['length'] . ' rows only ';
        }
        $statement =$dbLib->execute($query);
        $data = array();
        $filtered_rows = $statement->recordcount();

        while($row = $statement->FetchNextObject($toupper=false))
        {
            $sub_array = array();
            $sub_array[] = $row->no_fa;
            $sub_array[] = $row->tgl_perolehan;
            $sub_array[] = $row->nama;
            $sub_array[] = $row->catatan;
            $sub_array[] = number_format($row->nilai,0,",",".");
            $data[] = $sub_array;
        }

        $output = array(
            "draw"				=>	intval($_POST["draw"]),
            "recordsTotal"		=> 	$filtered_rows,
            "recordsFiltered"	=>	$jml_baris,
            "data"				=>	$data
        );
        echo json_encode($output);
    }

    function dataTableServerSide2(){

        include_once("library.php");
        uses("server_DBConnection_dbLib");
        $done = false;	
        $dbLib = new server_DBConnection_dbLib("mssql");


        $query = '';
        $output = array();
        $kode_lokasi = $_POST['kode_lokasi'];
        $kode = $_POST['kode_klpakun'];
        $query .= "select distinct a.no_fa, a.tgl_perolehan, a.nama,a.catatan,a.nilai from fa_asset a inner join pp b on a.kode_lokasi=b.kode_lokasi where a.kode_lokasi = '$kode_lokasi' and a.kode_klpakun='$kode' ";

        $column_array = array('a.no_fa', 'a.tgl_perolehan', 'a.nama','a.catatan','a.nilai');
        $order_column = 'order by a.no_fa '.$_POST['order'][0]['dir'];
        $column_string = join(',', $column_array);

        $res =$dbLib->execute($query);
        $jml_baris = $res->recordcount();
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
            $query .= ' order by a.no_fa ';
        }
        if($_POST["length"] != -1)
        {
            $query .= ' offset ' . $_POST['start'] . ' rows fetch next ' . $_POST['length'] . ' rows only ';
        }
        $statement =$dbLib->execute($query);
        $data = array();
        $filtered_rows = $statement->recordcount();
        while($row = $statement->FetchNextObject($toupper=false))
        {
            $sub_array = array();
            $sub_array[] = $row->no_fa;
            $sub_array[] = $row->tgl_perolehan;
            $sub_array[] = $row->nama;
            $sub_array[] = $row->catatan;
            $sub_array[] = number_format($row->nilai,0,",",".");
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
    
?>
