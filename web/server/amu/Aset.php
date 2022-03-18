<?php

    // class CrudNw{
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }


    function getMaps(){
        $kode_lokasi = $_POST['kode_lokasi'];  
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select distinct a.id_lahan,a.nama_lahan,a.alamat,a.coor_x,a.coor_y,b.nama as provinsi,c.nama as kota, d.nama as kecamatan,e.nama as desa,a.nilai_perolehan, a.cara_perolehan,a.atas_nama 
        from amu_lahan a
        left join amu_provinsi b on a.id_provinsi=b.id
        left join amu_kota c on a.id_kota=c.id and b.id=c.id_provinsi
        left join amu_kecamatan d on a.id_kecamatan=d.id and c.id=d.id_kota
        left join amu_desa e on a.id_kota=e.id and d.id=e.id_kecamatan
        where coor_x <> '' or coor_y <> '' ";
        $rs = execute($sql);
        while($row = $rs->FetchNextObject($toupper))
        {
            $result['hasil'][] = (array)$row;
        
        }

        $sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
        $rs = execute($sql2);
        while($row = $rs->FetchNextObject($toupper))
        {
            $result['hasil']['pbb'] = (array)$row;
        
        }
        					
        $result['status'] = true;
        $result['sql'] = $sql;
        echo json_encode($result);
    }

    function getMapsCari(){
        $kode_lokasi = $_POST['kode_lokasi'];  
        $id = $_POST['id_lahan'];  
        $result = array("message" => "", "rows" => 0, "status" => "" ); 				
        $sql = "select distinct a.id_lahan,a.nama_lahan,a.alamat,a.coor_x,a.coor_y,b.nama as provinsi,c.nama as kota, d.nama as kecamatan,e.nama as desa,a.nilai_perolehan, a.cara_perolehan,a.atas_nama 
        from amu_lahan a
        left join amu_provinsi b on a.id_provinsi=b.id
        left join amu_kota c on a.id_kota=c.id and b.id=c.id_provinsi
        left join amu_kecamatan d on a.id_kecamatan=d.id and c.id=d.id_kota
        left join amu_desa e on a.id_kota=e.id and d.id=e.id_kecamatan
        where (a.coor_x <> '' or a.coor_y <> '') and a.id_lahan='$id' ";
        $rs = execute($sql);
        while($row = $rs->FetchNextObject($toupper))
        {
            $result['hasil'][] = (array)$row;
        
        }

        $sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
        $rs = execute($sql2);
        while($row = $rs->FetchNextObject($toupper))
        {
            $result['hasil']['pbb'] = (array)$row;
        
        }
        					
        $result['status'] = true;
        $result['sql'] = $sql;
        echo json_encode($result);
    }

   

?>
