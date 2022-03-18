<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate2($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    function getAbout(){

        $result = array("message" => "", "rows" => 0, "status" => "" );
        $path = "http://".$_SERVER["SERVER_NAME"]."/";

        $content_id = "11";
        $kode_lokasi=$_POST['kode_lokasi'];

        $sql="select a.id, a.judul, b.file_gambar as header_url, a.tgl_input, a.nik_user, a.keterangan  
        from lab_konten a 
        left join lab_konten_galeri b on a.header_url=b.id and a.kode_lokasi=b.kode_lokasi
        where a.id='$content_id' and a.kode_lokasi='$kode_lokasi' ";

        $rs=execute($sql);

        $result['status'] = true;
        $result['detail'] = $rs->FetchNextObject($touper=false);
        $result['path_file'] = $path."web".$detail->header_url;

        echo json_encode($result);
    
    }

?>
