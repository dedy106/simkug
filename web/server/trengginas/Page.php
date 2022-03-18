<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate2($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    function getPage(){

        $result = array("message" => "", "rows" => 0, "status" => "" );
        $path = "http://".$_SERVER["SERVER_NAME"]."/";

        
        $content_id=$_POST['content_id'];
        $kode_lokasi=$_POST['kode_lokasi'];

        $sql="select a.id, a.judul, a.tgl_input, a.nik_user, a.keterangan  
        from lab_konten a 
        where a.id='$content_id' and a.kode_lokasi='$kode_lokasi' ";
        
        $rs=execute($sql);

        $path_file=$path."web".$detail->header_url;
        $result['status'] = true;
        $result['detail'] = $rs->FetchNextObject($touper=false);
        $result['path_file'] = "<img src='".$path_file."' class='img-responsive'>" ;

        echo json_encode($result);
    
    }

?>
