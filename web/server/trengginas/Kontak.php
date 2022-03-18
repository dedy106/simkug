<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }

    function reverseDate2($ymd_or_dmy_date, $org_sep='-', $new_sep='-'){
        $arr = explode($org_sep, $ymd_or_dmy_date);
        return $arr[2].$new_sep.$arr[1].$new_sep.$arr[0];
    }

    function getKontak(){

        $result = array("message" => "", "rows" => 0, "status" => "" );
        $path = "http://".$_SERVER["SERVER_NAME"]."/";

        $kode_lokasi=$_POST['kode_lokasi'];
        $rs = execute("SELECT judul, keterangan, latitude, longitude FROM lab_konten_kontak a where flag_aktif='1' and a.kode_lokasi='$kode_lokasi' ");

        $kontak = $rs->FetchNextObject($touper=false);
        $map = "<div class='latitude' hidden>$kontak->latitude</div>
                    <div class='longitude' hidden>$kontak->longitude</div>
                    <div id='map' style='height:100%; width:100%; min-width:200px; min-height:300px;'>
                </div>";

        $result['status'] = true;
        $result['detail'] = $kontak;
        $result['map']=$map;

        echo json_encode($result);
    
    }

?>
