<?php
    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        case 'POST' :
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function cekAuth($user){
        getKoneksi();
        $user = qstr($user);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user ", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function getDataBox() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            
            $sql1="select count(*) as jum from amu_lahan where kode_lokasi='$kode_lokasi' ";
            $resTanah = execute($sql1);
            $sql2="select count(*) as jum from amu_gedung where kode_lokasi='$kode_lokasi'";
            $resGedung = execute($sql2);
            $sql3="select count(*) as jum from amu_lahan where kode_lokasi='$kode_lokasi'";
            $resRecent = execute($sql3);

            $response['tanah']= $resTanah->fields[0];
            $response['bangunan']= $resGedung->fields[0];
            $response['recent']= $resRecent->fields[0];

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getListTanah() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            
            $sql1="select a.id_lahan,a.nama_lahan as nama,isnull(convert(varchar,b.jatuh_tempo,105),'-') as jatuh_tempo,'-' as no_pbb 
            from amu_lahan a
            left join amu_sertifikat_lahan b on a.id_lahan=b.id_lahan and a.kode_lokasi=b.kode_lokasi
            where b.jatuh_tempo <= getdate() and a.kode_lokasi='$kode_lokasi'
            order by b.jatuh_tempo asc";

            $response['daftar']=dbResultArray($sql1);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getLahan() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            
            $sql1="select a.id_lahan,a.nama_lahan as nama
            from amu_lahan a
            where a.kode_lokasi='$kode_lokasi' and (a.coor_x <> '' or a.coor_y <> '')
            order by a.id_lahan ";

            $response['daftar']=dbResultArray($sql1);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getGedung() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            
            $sql1="select a.id_gedung,a.nama_gedung as nama
            from amu_gedung a
            where a.kode_lokasi='$kode_lokasi' and (a.coor_x <> '' or a.coor_y <> '')
            order by a.id_gedung ";

            $response['daftar']=dbResultArray($sql1);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getMaps(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){  
         
            $kode_lokasi = $_SESSION['lokasi'];  
            $result = array("message" => "", "rows" => 0, "status" => "" ); 				
            $sql = "select distinct a.id_lahan,a.nama_lahan,a.alamat,a.coor_x,a.coor_y,b.nama as provinsi,c.nama as kota, d.nama as kecamatan,e.nama as desa,a.nilai_perolehan, a.cara_perolehan,a.atas_nama 
            from amu_lahan a
            left join amu_provinsi b on a.id_provinsi=b.id
            left join amu_kota c on a.id_kota=c.id and b.id=c.id_provinsi
            left join amu_kecamatan d on a.id_kecamatan=d.id and c.id=d.id_kota
            left join amu_desa e on a.id_kota=e.id and d.id=e.id_kecamatan
            where (a.coor_x <> '' or a.coor_y <> '')  and a.kode_lokasi='$kode_lokasi' ";
            $response['hasil']= dbResultArray($sql);

            $row = $response['hasil'];
            for($i=0;$i<count($row);$i++){
                
                $sql2[$i] = "select a.no_bukti as id_lahan,a.file_dok,a.no_urut,a.nama
                from amu_lahan_dok a
                where a.kode_lokasi='$kode_lokasi'  and a.no_bukti= '".$row[$i]['id_lahan']."' 
                ";

                $response['image'][$row[$i]['id_lahan']]= dbResultArray($sql2[$i]);
            }


            /*$sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
            $rs = $dbLib->execute($sql2);
            while($row = $rs->FetchNextObject($toupper))
            {
                $result['hasil']['pbb'] = (array)$row;
            
            }*/
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getMapsGedung(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){  
         
            $kode_lokasi = $_SESSION['lokasi'];  
            $result = array("message" => "", "rows" => 0, "status" => "" ); 				
            $sql = "
			select distinct a.id_gedung,a.nama_gedung as nama_lahan,a.alamat,a.coor_x,a.coor_y,'-' as provinsi,'-' as kota, '-' as kecamatan,'-' as desa,a.nilai_perolehan, '-' as cara_perolehan,a.atas_nama 
            from amu_gedung a
            where (a.coor_x <> '' or a.coor_y <> '')  and a.kode_lokasi='$kode_lokasi'";
            $response['hasil']= dbResultArray($sql);

            $row = $response['hasil'];
            for($i=0;$i<count($row);$i++){
                
                $sql2[$i] = "
                select a.no_bukti as id_gedung,a.file_dok,a.no_urut,a.nama
                from amu_gedung_dok a
                where a.kode_lokasi='$kode_lokasi'  and a.no_bukti= '".$row[$i]['id_gedung']."' 
                ";

                $response['image'][$row[$i]['id_gedung']]= dbResultArray($sql2[$i]);
            }


            /*$sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
            $rs = $dbLib->execute($sql2);
            while($row = $rs->FetchNextObject($toupper))
            {
                $result['hasil']['pbb'] = (array)$row;
            
            }*/
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getMapsCari(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){  

            $kode_lokasi = $_SESSION['lokasi'];  
            $id = $data['id_lahan']; 
            $response = array("message" => "", "rows" => 0, "status" => "" ); 
            $sql = "select distinct a.id_lahan,a.nama_lahan,a.alamat,a.coor_x,a.coor_y,b.nama as provinsi,c.nama as kota, d.nama as kecamatan,e.nama as desa,a.nilai_perolehan, a.cara_perolehan,a.atas_nama 
            from amu_lahan a
            left join amu_provinsi b on a.id_provinsi=b.id
            left join amu_kota c on a.id_kota=c.id and b.id=c.id_provinsi
            left join amu_kecamatan d on a.id_kecamatan=d.id and c.id=d.id_kota
            left join amu_desa e on a.id_kota=e.id and d.id=e.id_kecamatan
            where (a.coor_x <> '' or a.coor_y <> '')  and a.id_lahan='$id'  and a.kode_lokasi='$kode_lokasi'
            ";
            $response['hasil']= dbResultArray($sql);

            $sql2 = "select a.no_bukti as id_lahan,a.file_dok,a.no_urut,a.nama
            from amu_lahan_dok a
            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$id'
            ";
            $response['image']= dbResultArray($sql2);


            // $sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
            // $rs = $dbLib->execute($sql2);
            // while($row = $rs->FetchNextObject($toupper))
            // {
            //     $result['hasil']['pbb'] = (array)$row;
            
            // }
        					
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getMapsCariGedung(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){  

            $kode_lokasi = $_SESSION['lokasi'];  
            $id = $data['id_gedung']; 
            $response = array("message" => "", "rows" => 0, "status" => "" ); 
            $sql = "
			select distinct a.id_gedung,a.nama_gedung,a.alamat,a.coor_x,a.coor_y,'-' as provinsi,'-' as kota, '-' as kecamatan,'-' as desa,a.nilai_perolehan, '-' as cara_perolehan,a.atas_nama 
            from amu_gedung a
            where (a.coor_x <> '' or a.coor_y <> '')  and a.id_gedung='$id' and a.kode_lokasi='$kode_lokasi'  ";
            $response['hasil']= dbResultArray($sql);

            $sql2 = "
            select a.no_bukti as id_gedung,a.file_dok,a.no_urut,a.nama
            from amu_gedung_dok a
            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$id' ";
            $response['image']= dbResultArray($sql2);


            // $sql2 = "select nop, tahun, harga_njop_saat_ini, luas_lahan_bumi,njop_bumi,kelas_bumi,total_njop_bumi from amu_pbb ";
            // $rs = $dbLib->execute($sql2);
            // while($row = $rs->FetchNextObject($toupper))
            // {
            //     $result['hasil']['pbb'] = (array)$row;
            
            // }
        					
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
    function getDataBoxTanah() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            
            $sql1="select count(*) as jum from amu_lahan where kode_lokasi='$kode_lokasi' ";
            $resTanah =execute($sql1);

            $sql2="select count(distinct id_provinsi) as jum from amu_lahan where kode_lokasi='$kode_lokasi'";
            $resProv =execute($sql2);

            $sql3="select count(*) as jum from amu_sertifikat_lahan where kode_lokasi='$kode_lokasi' ";
            $resSerTa =execute($sql3);

            $sql4="select count(a.id_lahan) as jum
            from amu_lahan a
            left join amu_sertifikat_lahan b on a.id_lahan=b.id_lahan and a.kode_lokasi=b.kode_lokasi
            left join amu_pbb c on a.id_lahan=c.id_lahan and a.kode_lokasi=c.kode_lokasi
            where b.jatuh_tempo <= getdate() and a.kode_lokasi='$kode_lokasi'";
            $resJT =execute($sql4);

            $response['tanah']= $resTanah->fields[0];
            $response['provinsi']= $resProv->fields[0];
            $response['serti']= $resSerTa->fields[0];
            $response['jt']= $resJT->fields[0];

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getChartLokasi() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $sql = "select a.kode_lokasi,a.nama, isnull(b.jum,0) as jum 
            from lokasi a 
            left join (
                select kode_lokasi,count(*) as jum 
                from amu_lahan 
                group by kode_lokasi) b on a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi in ('99') and isnull(b.jum,0) <> 0
            ";
            $rsLokasi = execute($sql);
                
            while($row = $rsLokasi->FetchNextObject(false)){
                    
                $response['lok'][] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->kode_lokasi);   
                    
            } 

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getChartCara() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $sql = "select b.cara_perolehan as nama,count(*) as jum 
            from amu_lahan a
			inner join amu_sertifikat_lahan b on a.id_lahan=b.id_lahan and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi'
            group by b.cara_perolehan
            ";
            $rsCara =execute($sql);
            
            while($row = $rsCara->FetchNextObject(false)){
                
                $response['cara'][] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->nama);   
                
            } 

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getChartSerti() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            
            $sql = "select b.nama_lahan as nama,count(a.no_sertifikat) as jum 
            from amu_sertifikat_lahan a
            inner join amu_lahan b on a.id_lahan=b.id_lahan and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi'
            group by b.nama_lahan
            ";
            $rsSerti =execute($sql);

            while($row = $rsSerti->FetchNextObject(false)){
                
                $response['serti'][] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->nama);   
                
            } 


        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function  getChartGedung(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
        
            $sql = "select a.kode_lokasi,a.nama, isnull(b.jum,0) as jum 
            from lokasi a 
            left join (
            select kode_lokasi,count(*) as jum 
            from amu_gedung 
            group by kode_lokasi) b on a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi in ('$kode_lokasi') and isnull(b.jum,0) <> 0
            ";
            $rsLokasi = execute($sql);
        
            while($row = $rsLokasi->FetchNextObject(false)){
                
                $response['lok'][] = array('y'=>floatval($row->jum),'name'=>$row->nama,'key'=>$row->kode_lokasi);   
                
            } 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDataBoxGedung(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];

            $sql1="select count(*) as jum from amu_gedung  where kode_lokasi in ('$kode_lokasi') ";
            $resGedung = execute($sql1);
            $response['gedung'] = $resGedung->fields[0];

            $sql2="select count(distinct b.id_provinsi) as jum from amu_gedung a inner join amu_lahan b on a.kode_lokasi=b.kode_lokasi and a.id_lahan=b.id_lahan where a.kode_lokasi in ('$kode_lokasi') ";
            $resProv = execute($sql2);
            $response['lokasi'] = $resProv->fields[0];

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    
?>