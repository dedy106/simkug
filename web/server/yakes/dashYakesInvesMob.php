<?php
    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
    }

    function getKoneksi(){
        $root_lib=realpath($_SERVER["DOCUMENT_ROOT"])."/";
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function cekAuth($user,$pass){
        getKoneksi();
        $user = qstr($user);
        $pass = qstr($pass);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function getPeriode2(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $perusahan = dbResultArray("select distinct periode from periode where kode_lokasi='$kode_lokasi' ");
            $response["daftar"] = $perusahan;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTglAkhir(){
        getKoneksi();
        $data=$_GET;
       
        $sql2 = "select max(a.tanggal) as tgl from 
            (
                select tanggal from inv_saham_kkp 
                union all 
                select tanggal from inv_rd_kkp  
                union all 
                select tanggal from inv_sp_kkp 
                union all 
                select tanggal from inv_depo_kkp 
                ) a
                ";
        $rsta = execute($sql2);
        $tglakhir = $rsta->fields[0];     
        return $tglakhir;
    }

    function getTotalAlokasi(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            $response["tglakhir"] = $tgl_akhir;
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $sql = array();
            $exec = "exec sp_get_real_alokasi '$tgl_akhir','$kode_klp','$kode_plan','$kode_lokasi','$nik_user' ";
            array_push($sql,$exec);
            $res = executeArray($sql);
            
            $tahun= substr($tgl_akhir,0,4);
            $total = dbRowArray("select sum(nilai) as nwajar from inv_batas_alokasi where kode_plan='$kode_plan' and tahun='$tahun' ");
            $response["total"] = $total["nwajar"];
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAset() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];

            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $response = array();

            $sql = array();
            $exec = "exec sp_get_real_alokasi '$tgl_akhir','$kode_klp','$kode_plan','$kode_lokasi','$nik_user' ";
            array_push($sql,$exec);
            $res = executeArray($sql);
            
            $tahun= substr($tgl_akhir,0,4);
            $saham = dbRowArray("select isnull(nilai,0) as jum,acuan from inv_batas_alokasi where kode_kelas='SB' and kode_plan='$kode_plan'  and tahun='$tahun'  ");
            $kas= dbRowArray("select isnull(nilai,0) as jum,acuan from inv_batas_alokasi where kode_kelas='KAS' and kode_plan='$kode_plan'  and tahun='$tahun' ");
            $ebt = dbRowArray("select isnull(nilai,0) as jum,acuan from inv_batas_alokasi where kode_kelas='EBT' and kode_plan='$kode_plan'  and tahun='$tahun'  ");
            $propensa = dbRowArray("select isnull(nilai,0) as jum,acuan  from inv_batas_alokasi where kode_kelas='PRO' and kode_plan='$kode_plan'  and tahun='$tahun'  ");

            $response["saham"]=$saham["jum"];
            $response["kas"]=$kas["jum"];
            $response["ebt"]=$ebt["jum"];
            $response["propensa"]=$propensa["jum"];
            $response["saham_acuan"]=$saham["acuan"];
            $response["kas_acuan"]=$kas["acuan"];
            $response["ebt_acuan"]=$ebt["acuan"];
            $response["propensa_acuan"]=$propensa["acuan"];

            $total = dbRowArray("select sum(nilai) as nwajar from inv_batas_alokasi where kode_plan='$kode_plan'  and tahun='$tahun' ");
            $response["total"] = $total["nwajar"];
         
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPersenAset() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];

            
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }

            $response = array();
            $sql = array();
            $exec = "exec sp_get_real_alokasi '$tgl_akhir','$kode_klp','$kode_plan','$kode_lokasi','$nik_user' ";
            array_push($sql,$exec);
            $res = executeArray($sql);
            
            
            $tahun= substr($tgl_akhir,0,4);
            $jum = dbRowArray("select sum(nilai) as jum from inv_batas_alokasi where kode_plan='$kode_plan' and tahun='$tahun' ");
            
            $nbukuawal = dbRowArray("select sum(sawal_tahun) as jum from inv_batas_alokasi where kode_plan='$kode_plan' and tahun='$tahun' ");
            $response["persen"]=round((($jum["jum"]-$nbukuawal["jum"])/$nbukuawal["jum"])*100,2);
         
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBatasAlokasi() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $nik_user = $_SESSION['userLog'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $response = array();

            $sql = array();

            $exec = "exec sp_get_real_alokasi '$tgl_akhir','$kode_klp','$kode_plan','$kode_lokasi','$nik_user' ";
            array_push($sql,$exec);
            $res = executeArray($sql);

            $tahun= substr($tgl_akhir,0,4);
            $response["saham"] = dbRowArray("select kode_kelas,bawah,acuan,atas,nilai,persen from inv_batas_alokasi where kode_kelas='SB' and kode_plan ='$kode_plan' and tahun='$tahun' ");
            $response["kas"] = dbRowArray("select kode_kelas,bawah,acuan,atas,nilai,persen from inv_batas_alokasi where kode_kelas='KAS'  and kode_plan ='$kode_plan' and tahun='$tahun' "); 
            $response["ebt"] = dbRowArray("select kode_kelas,bawah,acuan,atas,nilai,persen from inv_batas_alokasi where kode_kelas='EBT'  and kode_plan ='$kode_plan' and tahun='$tahun' ");   
            $response["pro"] = dbRowArray("select kode_kelas,bawah,acuan,atas,nilai,persen from inv_batas_alokasi where kode_kelas='PRO'  and kode_plan ='$kode_plan' and tahun='$tahun' ");  

            $ebt = dbRowArray("select roi_persen from inv_roi_beban where tanggal='$tgl_akhir' and modul='EBT' ");
            $sb = dbRowArray("select roi_persen from inv_roi_beban where tanggal='$tgl_akhir' and modul='SB' ");
            $kas = dbRowArray("select roi_persen from inv_roi_beban where tanggal='$tgl_akhir' and modul='KAS' ");
            $pro = dbRowArray("select roi_persen from inv_roi_beban where tanggal='$tgl_akhir' and modul='PRO' ");

            $response["saham"]["roi"] = $sb["roi_persen"];
            $response["kas"]["roi"] = $kas["roi_persen"];
            $response["ebt"]["roi"] = $ebt["roi_persen"];
            $response["pro"]["roi"] = $pro["roi_persen"];

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getNOleh() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $response = array();

            $nwajar = dbRowArray("select sum(jumlah * h_wajar) as jum from inv_saham_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan' ");
            $noleh = dbRowArray("select sum(jumlah * h_oleh) as jum from inv_saham_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan'");
            $response["nwajar"] = $nwajar["jum"];
            $response["noleh"] = $noleh["jum"];
            $response["persen"] = round((($nwajar["jum"] - $noleh["jum"]) / $nwajar["jum"])*100,2);
            $response["daftar"] = dbResultArray(" select a.kode_kelola,a.nama,a.gambar, b.jum as noleh, c.jum as nwajar, round(((c.jum-b.jum)/c.jum)*100,2) as persen
            from inv_kelola a
            inner join ( select kode_kelola,sum(jumlah * h_oleh) as jum from inv_saham_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan' group by kode_kelola ) b
            on a.kode_kelola=b.kode_kelola
            inner join ( select kode_kelola,sum(jumlah * h_wajar) as jum from inv_saham_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan' group by kode_kelola ) c
            on a.kode_kelola=c.kode_kelola");
            
            $response["status"]=true; 
        } else{
            
            $response["status"]=false; 
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getNBuku() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];
            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $response = array();

            $nwajar = dbRowArray("select sum(jumlah * h_wajar) as jum from inv_saham_kkp where tanggal = '$tgl_akhir'  and kode_plan='$kode_plan'");
            $nbuku = dbRowArray("select sum(jumlah * h_buku) as jum from inv_saham_kkp where tanggal = '$tgl_akhir'  and kode_plan='$kode_plan'");
            $response["nwajar"] = $nwajar["jum"];
            $response["nbuku"] = $nbuku["jum"];
            $response["persen"] = round((($nwajar["jum"] - $nbuku["jum"]) / $nwajar["jum"])*100,2);
            $response["daftar"] = array();
            $response["daftar"] = dbResultArray(" select a.kode_kelola,a.nama,a.gambar, b.jum as nbuku, c.jum as nwajar, round(((c.jum-b.jum)/c.jum)*100,2) as persen
            from inv_kelola a
            inner join ( select kode_kelola,sum(jumlah * h_buku) as jum from inv_saham_kkp where tanggal = '$tgl_akhir'  and kode_plan='$kode_plan' group by kode_kelola ) b
            on a.kode_kelola=b.kode_kelola
            inner join ( select kode_kelola,sum(jumlah * h_wajar) as jum from inv_saham_kkp where tanggal = '$tgl_akhir'  and kode_plan='$kode_plan' group by kode_kelola ) c
            on a.kode_kelola=c.kode_kelola");
            
            $response["status"]=true; 
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
    function getNABHari() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            // $tgl_akhir = $data["param"];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            $periode = $data["periode"];
            $response = array();

            $tmp = explode("|",$data["param"]);
            $response["param"] = count($tmp);

            if(count($tmp)>3){
                if($tmp[1] == 0){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between '".reverseDate($tmp[2])."' and '".reverseDate($tmp[3])."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 1){
                    $filter = " where kode_plan='".$tmp[0]."' and periode between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 2){
                    $filter = " where kode_plan='".$tmp[0]."' and substring(periode,1,4) between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }
                //YTD
                if($tmp[1] == 3){
                    $temp2 = explode("-",$tmp[2]);

                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$temp2[0]."-01-01') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."' ";
                }

                // YOY
                if($tmp[1] == 4){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$tmp[2]."') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."'";
                }
            }else{
                $filter = "where kode_plan='".$tmp[0]."' and substring(periode,1,4) = '".substr($periode,0,4)."' and kode_kelola='".$tmp[1]."' ";
            }

            $sql = "select kode_kelola,tanggal as tgl,
            sum(jumlah*h_wajar) as total
            from inv_saham_kkp $filter
            group by kode_kelola,tanggal
            order by kode_kelola,tanggal
            ";

            $pembagi = 1000000;
            $rs = execute($sql);
            $color = array('#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    // $date = new DateTime($row->tgl, new DateTimeZone("UTC"));
                    // $date->getTimestamp()
                    $result[$row->kode_kelola][] = array($row->tgl,round(floatval($row->total),2));
                    
                }
            }

            $sqlc = "select distinct kode_kelola
            from inv_saham_kkp
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                $colors[$row["kode_kelola"]] = $color[$i];
                $i++;
            }

            // $colors = array('BHN'=>'#727276','YKT'=>'#7cb5ec','SCH'=>'#ff6f69');
            $sql2 = "select distinct kode_kelola
            from inv_saham_kkp $filter
            ";
            $res = dbResultArray($sql2);
            $response["data"] = array();
            foreach($res as $row){
                
                $response["data"][] = array("type"=>"area","name" => $row["kode_kelola"],"color"=>$colors[$row["kode_kelola"]], "data" => $result[$row["kode_kelola"]],"showInLegend"=>true );
                $i++;
            
            }
            
            $response["status"]=true;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getSPIHari() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            // $tgl_akhir = $data["param"];
            $periode = $data["periode"];

            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            $response = array();

            $tmp = explode("|",$data["param"]);
            $response["param"] = count($tmp);

            if(count($tmp)>3){
                if($tmp[1] == 0){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between '".reverseDate($tmp[2])."' and '".reverseDate($tmp[3])."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 1){
                    $filter = " where kode_plan='".$tmp[0]."' and periode between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 2){
                    $filter = " where kode_plan='".$tmp[0]."' and substring(periode,1,4) between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }
                //YTD
                if($tmp[1] == 3){
                    $temp2 = explode("-",$tmp[2]);

                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$temp2[0]."-01-01') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."' ";
                }

                // YOY
                if($tmp[1] == 4){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$tmp[2]."') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."'";
                }
            }else{
                $filter = "where kode_plan='".$tmp[0]."' and substring(periode,1,4) = '".substr($periode,0,4)."' and kode_kelola='".$tmp[1]."' ";
            }

            $sql = "select kode_kelola,tanggal as tgl,
            sum(jumlah*h_wajar)-sum(jumlah*h_oleh) as total,sum(jumlah*h_wajar)-sum(jumlah*h_buku) as total2
            from inv_saham_kkp $filter
            group by kode_kelola,tanggal
            order by kode_kelola,tanggal asc
            ";

            $pembagi = 1000000;
            $rs = execute($sql);
            $color = array('#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    // $date = new DateTime($row->tgl, new DateTimeZone("UTC"));
                    // $date->getTimestamp()
                    $result[$row->kode_kelola][] = array($row->tgl,round(floatval($row->total),2));
                    $result[$row->kode_kelola."SPI_Buku"][] = array($row->tgl,round(floatval($row->total2),2));
                    
                }
            }
 
            $sqlc = "select distinct kode_kelola
            from inv_saham_kkp
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                
                $colors[$row["kode_kelola"]] = $color[$i];
                $colors[$row["kode_kelola"]."SPI_Buku"] = $color[$i+1];
                $i++;
            }
            
            $response["colors"]=$colors;

            $sql2 = "select distinct kode_kelola
            from inv_saham_kkp $filter
            ";
            $res = dbResultArray($sql2);
            $response["data"] = array();
            foreach($res as $row){
                
                $response["data"][] = array("type"=>"area","name" => $row["kode_kelola"]." SPI Perolehan","color"=>$colors[$row["kode_kelola"]], "data" => $result[$row["kode_kelola"]],"showInLegend"=>true,"visible"=> false );
                $response["data"][] = array("type"=>"area","name" => $row["kode_kelola"]." SPI Buku","color"=>$colors[$row["kode_kelola"]."SPI_Buku"], "data" => $result[$row["kode_kelola"]."SPI_Buku"],"showInLegend"=>true );
                $i++;
            
            }
            
            $response["status"]=true; 
        } else{
            $response["status"]=false; 
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
    
    function getPortofolio(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $nik_user = $_SESSION['userLog'];
            // $tmp = explode("|",$data["param"]);
            // $tgl = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kom = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kom = $param["kode_klp"];

            if($tgl == ""){
                $tgl = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kom == ""){
                $kom = "5050";
            }
            $kode_fs = "FS3";

            $sql="exec sp_inv_portofolio3 '$kode_fs','$periode','$kode_lokasi','$nik_user','$tgl','$komp','$kode_plan' ";
            $rs = execute($sql);	

            $tkas = dbRowArray("select sum(a.n3) as total from
            (select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4
            from neraca_tmp 
            where nik_user='$nik_user' and modul='KAS' and ((n0 <> 0) or (n1 <> 0) or (n2 <> 0) or (n3 <> 0) or (n4 <> 0))
            )a ");

            $sql2 = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4,(n3/".$tkas["total"].")*100 as persen
                from neraca_tmp 
                where nik_user='$nik_user' and modul='KAS' and ((n0 <> 0) or (n1 <> 0) or (n2 <> 0) or (n3 <> 0) or (n4 <> 0))
                order by rowindex ";
            $kas = dbResultArray($sql2);
            $response["kas_chart"] = array();
            $i=0;
            $color = array('#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            foreach($kas as $k){
                $tmK = substr($k["nama"],3);
                $response["kas_chart"][] = array("name" => $tmK,"y"=>round(floatval($k["n3"])),"key"=>"kas_rowke".$i,"color"=>$color[$i]);
                $i++;
            }

            $sql3 = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4
            from neraca_tmp 
            where nik_user='$nik_user' and modul='EBT' and ((n0 <> 0) or (n1 <> 0) or (n2 <> 0) or (n3 <> 0) or (n4 <> 0))
            order by rowindex ";
            $ebt = dbResultArray($sql3);
            $response["ebt_chart"] = array();
            $dataebt = array();
            $j=0;
            $totebt=0;
            $nilaie=0;$nilaie2=0;
            foreach($ebt as $e){
                $tmE = substr($e["nama"],3);
                if($tmE == " RD Campuran"){
                    if($kom == "5050"){
                        $nilaie = ($e["n3"]*50)/100;
                    }else{
                        $nilaie = ($e["n3"]*30)/100;
                    }
                }else{
                    $nilaie = $e["n3"];
                }
                $response["ebt_chart"][] = array("name" => $tmE,"y"=>round(floatval($nilaie)),"key"=>"ebt_rowke".$j,"color"=>$color[$j]);
                // $dataebt[] = array("kode_neraca"=>$e["kode_neraca"],"nama"=>$e["nama"],"n3"=>$nilai);
                $j++;
                $totebt=$totebt+$nilaie;
            }

            foreach($ebt as $e){
                $tmE = substr($e["nama"],3);
                if($tmE == " RD Campuran"){
                    if($kom == "5050"){
                        $nilaie2 = ($e["n3"]*50)/100;
                    }else{
                        $nilaie2 = ($e["n3"]*30)/100;
                    }
                }else{
                    $nilaie2 = $e["n3"];
                }
                $ePersen = ($nilaie2/$totebt)*100;
                $dataebt[] = array("kode_neraca"=>$e["kode_neraca"],"nama"=>$e["nama"],"n3"=>$nilaie2,"persen"=>$ePersen);
            }


            $sql4 = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4
                from neraca_tmp 
                where nik_user='$nik_user' and modul='SB' and ((n0 <> 0) or (n1 <> 0) or (n2 <> 0) or (n3 <> 0) or (n4 <> 0))
                order by rowindex ";
            $sb = dbResultArray($sql4);

            $response["sb_chart"] = array();
            $datasb = array();
            $z=0;
            $tsb=0;
            $nilais=0;$nilais2=0;
            foreach($sb as $s){
                $tmS = substr($s["nama"],3);
                if($tmS == "RD Campuran"){
                    if($kom == "5050"){
                        $nilais = ($s["n3"]*50)/100;
                    }else{
                        $nilais = ($s["n3"]*70)/100;
                    }
                }else{
                    $nilais = $s["n3"];
                }
                $response["sb_chart"][] = array("name" => $tmS,"y"=>round(floatval($nilais)),"key"=>"sb_rowke".$z,"color"=>$color[$z]);
                // $datasb[] = array("kode_neraca"=>$s["kode_neraca"],"nama"=>$s["nama"],"n3"=>$nilai,"persen"=>$sbPer);
                $z++;
                $tsb=$tsb+$nilais;
            }

            foreach($sb as $s){
                $tmS = substr($s["nama"],3);
                if($tmS == "RD Campuran"){
                    if($kom == "5050"){
                        $nilais2 = ($s["n3"]*50)/100;
                    }else{
                        $nilais2 = ($s["n3"]*70)/100;
                    }
                }else{
                    $nilais2 = $s["n3"];
                }

                $sbPersen = ($nilais2/$tsb)*100;

                $datasb[] = array("kode_neraca"=>$s["kode_neraca"],"nama"=>$s["nama"],"n3"=>$nilais2,"persen"=>$sbPersen);
            }

            $tpro = dbRowArray("select sum(a.n3) as total from
            (select a.kode_mitra,a.nama, isnull(b.jum,0) as n3 
            from inv_mitra a 
            left join (select kode_mitra,sum(jumlah * h_wajar) as jum 
                        from inv_sp_kkp where tanggal = '$tgl' and kode_plan='$kode_plan' group by kode_mitra ) b on a.kode_mitra = b.kode_mitra ) a ");

            $sql5 = "select a.kode_mitra,a.nama, isnull(b.jum,0) as n3, (isnull(b.jum,0)/".$tpro["total"].")*100 as persen
            from inv_mitra a 
            left join (select kode_mitra,sum(jumlah * h_wajar) as jum 
                        from inv_sp_kkp where tanggal = '$tgl' and kode_plan='$kode_plan' group by kode_mitra ) b on a.kode_mitra = b.kode_mitra ";
            $pro = dbResultArray($sql5);
            
            $response["pro_chart"] = array();
            $y=0;
            foreach($pro as $p){
                $tmP = $p["nama"];
                $response["pro_chart"][] = array("name" => $tmP,"y"=>round(floatval($p["n3"])),"key"=>"pro_rowke".$y,"color"=>$color[$y]);
                $y++;
            }


            $response["kas"] = $kas;
            $response["ebt"] = $dataebt;
            $response["sb"] = $datasb;
            $response["pro"] = $pro;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getSahamSektor(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            // $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kom = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kom == ""){
                $kom = "5050";
            }
            $kode_fs = "FS3";

            $total = dbRowArray("select sum(a.nilai) as total
            from (select a.kode_sahamklp,a.nama, isnull(b.nilai,0) as nilai
                    from inv_sahamklp a 
                    left join (
                            select b.kode_sahamklp,sum(a.jumlah*a.h_wajar) as nilai
                            from inv_saham_kkp a
                            left join inv_saham b on a.kode_saham=b.kode_saham
                            where a.kode_plan='$kode_plan' and a.tanggal='$tgl_akhir'
                            group by b.kode_sahamklp
                    ) b on a.kode_sahamklp=b.kode_sahamklp
                    where a.kode_sahamklp not in ('S1000')
            ) a
            ");

            
            $sektor = dbResultArray("select a.kode_sahamklp,a.nama, isnull(b.nilai,0) as nilai, isnull(c.jum_kelola,0) as jum_kelola,(isnull(b.nilai,0)/".$total["total"].")*100 as persen 
            from inv_sahamklp a 
            left join (
                    select b.kode_sahamklp,sum(a.jumlah*a.h_wajar) as nilai
                    from inv_saham_kkp a
                    left join inv_saham b on a.kode_saham=b.kode_saham
                    where a.kode_plan='$kode_plan' and a.tanggal='$tgl_akhir'
                    group by b.kode_sahamklp
            ) b on a.kode_sahamklp=b.kode_sahamklp
            left join (
                select a.kode_sahamklp, count(a.kode_kelola) as jum_kelola from (
                select distinct b.kode_sahamklp,a.kode_kelola 
                from inv_saham_kkp a
                left join inv_saham b on a.kode_saham=b.kode_saham
                where a.kode_plan='$kode_plan' and a.tanggal='$tgl_akhir'
                ) a
                group by a.kode_sahamklp
            ) c on a.kode_sahamklp=c.kode_sahamklp
            where a.kode_sahamklp not in ('S1000') ");

            $response["sektor"] = $sektor;
            $response["status"]=true;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDetailPerSaham(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kom = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kom = $param["kode_klp"];

            $sektor = $tmp[3];
            $kode_fs = "FS3";
            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kom == ""){
                $kom = "5050";
            }

            $rs = execute("select top 5 a.kode_saham, b.nama,sum(a.jumlah) as jum, sum(a.jumlah * a.h_wajar) as nilai, (sum(a.jumlah * a.h_wajar)/sum(a.jumlah)) as harga
            from inv_saham_kkp a 
            left join inv_saham b on a.kode_saham=b.kode_saham
            where a.kode_plan='$kode_plan' and a.tanggal='$tgl_akhir' and b.kode_sahamklp='$sektor'
            group by a.kode_saham,b.nama 
			having sum(a.jumlah) <> 0
            order by (sum(a.jumlah * a.h_wajar)/sum(a.jumlah)) desc
            ");
            $response["daftar"] = array();
            $response["daftar3"] = array();
            while($row = $rs->FetchNextObject($toupper = false)){
                $response["daftar"][] = (array)$row;
                $response["daftar3"][] = (array)$row;
                $rs1 = execute("select a.kode_kelola, a.kode_saham, a.jumlah,a.h_oleh,a.h_buku,a.h_wajar,((a.h_wajar-a.h_oleh)/a.h_wajar) * 100 as pers_oleh,((a.h_wajar-a.h_buku)/a.h_wajar) * 100 as pers_buku from inv_saham_kkp a
                left join inv_saham b on a.kode_saham=b.kode_saham
                where a.kode_plan='$kode_plan' and a.tanggal='$tgl_akhir' and b.kode_sahamklp='$sektor' and a.h_oleh <> 0 and a.kode_saham ='$row->kode_saham'");

                while($row = $rs1->FetchNextObject($toupper = false)){
                    $hasil[] = (array)$row;
                }
            }
            $response["daftar2"] = $hasil;

            $grouping = array();
            $series = array();
            $color = array('SCH'=>'#727276','BHN'=>'#7cb5ec','YKT'=>'#ff6f69');
            // '#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5'
            $i=0;
            foreach($hasil as $r){
                if (!isset($grouping[$r["kode_saham"]])){
                    $tmp = array("data" => array());
                    $i++;
                }
                $tmp["data"][] = array("type"=>"column","name"=> $r["kode_kelola"],"data"=>array(round(floatval($r["pers_oleh"]),2),round(floatval($r["pers_buku"]),2)),"color"=>$color[$r["kode_kelola"]]);
                $grouping[$r["kode_saham"]] = $tmp;
            }

            $response["series"] = array();
            foreach($response["daftar3"] as $r){
                $response["series"][] = $grouping[$r["kode_saham"]];
            }
            $response["status"]=true;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDaftarRD(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            $kode_rdklp = substr($tmp[3],0,4);
            $jenis = substr($tmp[3],4,2);
            $tahun = substr($periode,0,4);
            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            
            $rdkelola = $tmp[4];
            $orderfilter = $tmp[5];
            $ascdesc = $tmp[6];

            if($kode_rdklp == 'RDCM'){
                if($kode_klp == '5050'){
                    $filterdata = "*0.5";
                }else{
                    if($jenis == 'SB'){
                        $filterdata = "*0.7";
                    }else{
                        $filterdata = "*0.3";
                    }
                }
            }else{
                $filterdata = '';
            }

            if($rdkelola == "" OR $rdkelola == "all"){
                $fikelola = "";
            }else{
                $fikelola = " and a.kode_rdkelola = '$rdkelola' ";
            }

            switch($orderfilter){
                case 'nama' :
                    $orderby = "a.nama";
                break;
                case 'nama_kelola' :
                    $orderby = "c.nama";
                break;
                case 'nab_unit' :
                    $orderby = "round(isnull(b.nab_unit,0)$filterdata,4)";
                break;
                case 'spi_buku' :
                    $orderby = "round(isnull(b.spi_buku,0)$filterdata,4)";
                break;
                default :
                    $orderby = "";
                break;
            }
            if($orderby == ""){
                $order = "";
            }else{
                $order = " order by $orderby $ascdesc";
            }

            $sql = "select a.kode_rd,a.nama,round(isnull(b.nab_unit,0)$filterdata,4) as nab_unit,round(isnull(b.spi_buku,0)$filterdata,4) as spi_buku,c.nama as nama_kelola,c.gambar
            from inv_rd a
            left join (select a.kode_rd,(sum(a.h_wajar*a.jumlah)/sum(a.jumlah)) as nab_unit,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_buku
                        from inv_rd_kkp a 
                        where 
                        a.tanggal='$tgl_akhir' 
                        and a.kode_plan='$kode_plan'
                        group by a.kode_rd
                        having sum(a.h_wajar*a.jumlah) <> 0 and sum(a.jumlah) <> 0
                       ) b on a.kode_rd=b.kode_rd
            left join inv_rdkelola c on a.kode_rdkelola=c.kode_rdkelola
            where a.kode_rdklp='$kode_rdklp' and isnull(b.nab_unit,0) <> 0 $fikelola $order ";
            $res = execute($sql);
            $reksadana = array();
            while($row = $res->FetchNextObject($toupper)){
                $reksadana[] = (array)$row;
            }
            $response["daftar"] = $reksadana;
            $response["filter"] = $fikelola."-".$order;
            $response["status"]=true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDetailRD() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tahun = substr($periode,0,4);
            
            $tahunLalu = intval($tahun)-1;
            $tglSblum = $tahunLalu."-12-31";

            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $kode_rdklp = substr($tmp[3],0,4);
            $jenis = substr($tmp[3],4,2);
            $tahun = substr($periode,0,4);

            $rdkelola = $tmp[5];
            $orderfilter = $tmp[6];
            $ascdesc = $tmp[7];

            if($kode_rdklp == 'RDCM'){
                if($kode_klp == '5050'){
                    $filterdata = "*0.5";
                }else{
                    if($jenis == 'SB'){
                        $filterdata = "*0.7";
                    }else{
                        $filterdata = "*0.3";
                    }
                }
            }else{
                $filterdata = '';
            }

            if($rdkelola == "" OR $rdkelola == "all"){
                $fikelola = "";
                $fikelola2 = "";
            }else{
                $fikelola = " and a.kode_rdkelola = '$rdkelola' ";
                $fikelola2 = " and b.kode_rdkelola = '$rdkelola' ";
            }

            switch($orderfilter){
                case 'nama' :
                    $orderby = "a.nama";
                break;
                case 'nama_kelola' :
                    $orderby = "c.nama";
                break;
                case 'nab_unit' :
                    $orderby = "isnull(b.nab_unit,0)$filterdata";
                break;
                case 'spi_buku' :
                    $orderby = "isnull(b.spi_unit,0)$filterdata";
                break;
                default :
                    $orderby = "";
                break;
            }
            if($orderby == ""){
                $order = "";
            }else{
                $order = " order by $orderby $ascdesc";
            }
            
            $response = array();
            
            $response["order"] = $orderfilter."-".$orderby."-".$ascdesc;

            $res = dbResultArray("select top 1 a.kode_rd,a.nama,isnull(b.nab_unit,0)$filterdata as nab_unit,isnull(b.nab,0)$filterdata as nab, isnull(b.nbuku_unit,0)$filterdata as nbuku_unit,isnull(b.spi_buku,0)$filterdata as spi_buku,c.nama as nama_kelola,isnull(b.jum_unit,0)$filterdata as jum_unit,isnull(b.nbuku,0)$filterdata as nbuku,isnull(b.spi_unit,0)$filterdata as ytd
            from inv_rd a
            left join (select a.kode_rd,sum(a.jumlah) as jum_unit,(sum(a.h_wajar*a.jumlah)/sum(a.jumlah)) as nab_unit,(sum(a.h_buku*a.jumlah)/sum(a.jumlah)) as nbuku_unit,sum(a.h_buku*a.jumlah) as nbuku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah)) as spi_buku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_unit,sum(a.h_wajar*a.jumlah) as nab
                        from inv_rd_kkp a 
                        where 
                        a.tanggal='$tgl_akhir' 
                        and a.kode_plan='$kode_plan'
                        group by a.kode_rd
                        having sum(a.h_wajar*a.jumlah) <> 0 and sum(a.jumlah) <> 0
                       ) b on a.kode_rd=b.kode_rd
            left join inv_rdkelola c on a.kode_rdkelola=c.kode_rdkelola
            where a.kode_rdklp='$kode_rdklp' and isnull(b.jum_unit,0) <> 0 $fikelola $order");

            if($tmp[4] ==""){
                $filter_rd = " and a.kode_rd ='".$res[0]["kode_rd"]."' ";
            }else{
                $filter_rd = " and a.kode_rd ='".$tmp[4]."' ";
            }

            $sqlrd = "select a.kode_rd,a.nama, isnull(b.nbuku_unit,0)$filterdata as nbuku_unit,isnull(b.nab_unit,0)$filterdata as nab_unit,isnull(b.spi_buku,0)$filterdata as spi_buku,c.nama as nama_kelola,isnull(b.jum_unit,0)$filterdata as jum_unit,isnull(b.nbuku,0)$filterdata as nbuku,isnull(b.nab,0)$filterdata as nab, isnull(b.spi_unit,0)$filterdata as ytd
            from inv_rd a
            left join (select a.kode_rd,sum(a.jumlah) as jum_unit,(sum(a.h_buku*a.jumlah)/sum(a.jumlah)) as nbuku_unit,(sum(a.h_wajar*a.jumlah)/sum(a.jumlah)) as nab_unit,sum(a.h_buku*a.jumlah) as nbuku,sum(a.h_wajar*a.jumlah) as nab,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah)) as spi_buku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_unit
                        from inv_rd_kkp a 
                        where 
                        a.tanggal='$tgl_akhir' 
                        and a.kode_plan='$kode_plan'
                        group by a.kode_rd
                        having sum(a.h_wajar*a.jumlah) <> 0 and sum(a.jumlah) <> 0
                       ) b on a.kode_rd=b.kode_rd
            left join inv_rdkelola c on a.kode_rdkelola=c.kode_rdkelola
            where a.kode_rdklp='$kode_rdklp' $filter_rd  $fikelola ";
            $reksadana = dbResultArray($sqlrd);

            $response['filterx']=$sqlrd;

            $response["daftar"] = $reksadana;

            $sql = "select a.kode_kelola,a.tanggal as tgl,
            sum(a.jumlah*a.h_wajar)$filterdata as total
            from inv_rd_kkp a 
            left join inv_rd b on a.kode_rd=b.kode_rd
            where substring(a.periode,1,4)='$tahun' and a.kode_plan='$kode_plan' and b.kode_rdklp='$kode_rdklp' $filter_rd $fikelola2
            group by a.kode_kelola,a.tanggal
            order by a.kode_kelola,a.tanggal
            ";
            $pembagi = 1000000000;
            $rs = execute($sql);
            $color = array('#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result[$row->kode_kelola][] = array($row->tgl,round(floatval($row->total)/$pembagi,2));
                    
                }
            }

            $sqlc = "select distinct kode_kelola
            from inv_rd_kkp
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                $colors[$row["kode_kelola"]] = $color[$i];
                $i++;
            }

            $sql2 = "select distinct a.kode_kelola
            from inv_rd_kkp a 
            left join inv_rd b on a.kode_rd=b.kode_rd
            where substring(a.periode,1,4)='$tahun'
            and a.kode_plan='$kode_plan' and b.kode_rdklp='$kode_rdklp' $filter_rd $fikelola2
            ";
            $res = dbResultArray($sql2);
            $response["NAB"] = array();
            foreach($res as $row){
                
                $response["NAB"][] = array("type"=>"area","name" => $row["kode_kelola"],"color"=>$colors[$row["kode_kelola"]], "data" => $result[$row["kode_kelola"]],"showInLegend"=>true );
                $i++;
            
            }

            $sql = "select a.kode_kelola,a.tanggal as tgl,
            (sum(a.jumlah*a.h_wajar)$filterdata)-(sum(a.jumlah*a.h_oleh)$filterdata) as total,(sum(a.jumlah*a.h_wajar)$filterdata)-(sum(a.jumlah*a.h_buku)$filterdata) as total2
            from inv_rd_kkp a 
            left join inv_rd b on a.kode_rd=b.kode_rd
            where substring(a.periode,1,4)='$tahun'
            and a.kode_plan='$kode_plan' and b.kode_rdklp='$kode_rdklp' $filter_rd $fikelola2
            group by a.kode_kelola,a.tanggal
            order by a.kode_kelola,a.tanggal asc
            ";

            $pembagi = 1000000000;
            $rs = execute($sql);
            $color = array('#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result[$row->kode_kelola][] = array($row->tgl,round(floatval($row->total)/$pembagi,2));
                    $result[$row->kode_kelola."SPI_Buku"][] = array($row->tgl,round(floatval($row->total2)/$pembagi,2));
                    
                }
            }
 
            $sqlc = "select distinct kode_kelola
            from inv_rd_kkp
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                
                $colors[$row["kode_kelola"]] = $color[$i];
                $colors[$row["kode_kelola"]."SPI_Buku"] = $color[$i+1];
                $i++;
            }
            
            $response["colors"]=$colors;

            $sql2 = "select distinct a.kode_kelola
            from inv_rd_kkp a 
            left join inv_rd b on a.kode_rd=b.kode_rd
            where substring(a.periode,1,4)='$tahun'
            and a.kode_plan='$kode_plan' and b.kode_rdklp='$kode_rdklp' $filter_rd $fikelola2
            ";
            $res = dbResultArray($sql2);
            $response["SPI"] = array();
            foreach($res as $row){
                
                $response["SPI"][] = array("type"=>"area","name" => $row["kode_kelola"]." SPI Perolehan","color"=>$colors[$row["kode_kelola"]], "data" => $result[$row["kode_kelola"]],"showInLegend"=>true,"visible"=> false );
                $response["SPI"][] = array("type"=>"area","name" => $row["kode_kelola"]." SPI Buku","color"=>$colors[$row["kode_kelola"]."SPI_Buku"], "data" => $result[$row["kode_kelola"]."SPI_Buku"],"showInLegend"=>true );
                $i++;
            
            }

            $response["filter"] = $jenis;
            $response["filter3"] = $tmp[3];
            $response["filterkelola"] = $fikelola."<br>".$fikelola2;
            $response["status"]=true;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDOC() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            // if($kode_klp == ""){
            //     $kode_klp = "5050";
            // }
            $response = array();

            $nilai = dbRowArray("select sum(nilai_depo) as nilai from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan' and jenis='DOC' ");
            $response["nilai"] = $nilai["nilai"];
            $response["daftar"] = dbResultArray("select a.kode_kelola,a.nama,a.gambar, b.jum as nilai, (b.jum/".$nilai["nilai"].")*100 as persen
            from inv_kelola a
            inner join ( select kode_kelola,sum(nilai_depo) as jum from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan'  and jenis='DOC'
                        group by kode_kelola ) b on a.kode_kelola=b.kode_kelola order by a.kode_kelola");
            
            $response["status"]=true; 
        } else{
            
            $response["status"]=false; 
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDepo() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            // if($kode_klp == ""){
            //     $kode_klp = "5050";
            // }
            $response = array();

            $nilai = dbRowArray("select sum(nilai_depo) as nilai from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan' and jenis='Deposito' ");
            $response["nilai"] = $nilai["nilai"];
            $response["daftar"] = dbResultArray("select a.kode_kelola,a.nama,a.gambar, b.jum as nilai, (b.jum/".$nilai["nilai"].")*100 as persen
            from inv_kelola a
            inner join ( select kode_kelola,sum(nilai_depo) as jum from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan'  and jenis='Deposito'
                        group by kode_kelola ) b on a.kode_kelola=b.kode_kelola order by a.kode_kelola");
            
            $response["status"]=true; 
        } else{
            
            $response["status"]=false; 
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getNABDepoHari() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            // $tgl_akhir = $data["param"];
            $periode = $data["periode"];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            // if($kode_plan == ""){
            //     $kode_plan = '1';
            // }
            // if($kode_klp == ""){
            //     $kode_klp = "5050";
            // }
            $response = array();

            $tmp = explode("|",$data["param"]);
            $response["param"] = count($tmp);

            if(count($tmp)>3){
                if($tmp[1] == 0){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between '".reverseDate($tmp[2])."' and '".reverseDate($tmp[3])."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 1){
                    $filter = " where kode_plan='".$tmp[0]."' and periode between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 2){
                    $filter = " where kode_plan='".$tmp[0]."' and substring(periode,1,4) between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }
                //YTD
                if($tmp[1] == 3){
                    $temp2 = explode("-",$tmp[2]);

                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$temp2[0]."-01-01') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."' ";
                }

                // YOY
                if($tmp[1] == 4){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$tmp[2]."') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."'";
                }
            }else{
                $filter = "where kode_plan='".$tmp[0]."' and substring(periode,1,4) = '".substr($periode,0,4)."' and kode_kelola='".$tmp[1]."' ";
            }

            $sql = "select kode_kelola,tanggal as tgl,
            sum(nilai_depo) as total
            from inv_depo_kkp $filter and jenis='Deposito'
            group by kode_kelola,tanggal
            order by kode_kelola,tanggal
            ";

            $pembagi = 1000000;
            $rs = execute($sql);
            $color = array('#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    // $date = new DateTime($row->tgl, new DateTimeZone("UTC"));
                    // $date->getTimestamp()
                    $result[$row->kode_kelola][] = array($row->tgl,round(floatval($row->total),2));
                    
                }
            }

            $sqlc = "select distinct kode_kelola
            from inv_depo_kkp where jenis='Deposito' order by kode_kelola
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                $colors[$row["kode_kelola"]] = $color[$i];
                $i++;
            }

            // $colors = array('BHN'=>'#727276','YKT'=>'#7cb5ec','SCH'=>'#ff6f69');
            $sql2 = "select distinct kode_kelola
            from inv_depo_kkp $filter and jenis='Deposito' order by kode_kelola
            ";
            $res = dbResultArray($sql2);
            $response["data"] = array();
            foreach($res as $row){
                
                $response["data"][] = array("type"=>"areaspline","name" => $row["kode_kelola"],"color"=>$colors[$row["kode_kelola"]], "data" => $result[$row["kode_kelola"]],"showInLegend"=>true );
                $i++;
            
            }
            
            $response["status"]=true;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getNABDOCHari() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            // $tgl_akhir = $data["param"];
            $periode = $data["periode"];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            // if($kode_plan == ""){
            //     $kode_plan = '1';
            // }
            // if($kode_klp == ""){
            //     $kode_klp = "5050";
            // }
            $response = array();

            $tmp = explode("|",$data["param"]);
            $response["param"] = count($tmp);

            if(count($tmp)>3){
                if($tmp[1] == 0){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between '".reverseDate($tmp[2])."' and '".reverseDate($tmp[3])."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 1){
                    $filter = " where kode_plan='".$tmp[0]."' and periode between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }

                if($tmp[1] == 2){
                    $filter = " where kode_plan='".$tmp[0]."' and substring(periode,1,4) between '".$tmp[2]."' and '".$tmp[3]."' and kode_kelola='".$tmp[4]."' ";
                }
                //YTD
                if($tmp[1] == 3){
                    $temp2 = explode("-",$tmp[2]);

                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$temp2[0]."-01-01') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."' ";
                }

                // YOY
                if($tmp[1] == 4){
                    $filter = " where kode_plan='".$tmp[0]."' and tanggal between DATEADD(YEAR, -1, '".$tmp[2]."') and '".$tmp[2]."' and kode_kelola='".$tmp[3]."'";
                }
            }else{
                $filter = "where kode_plan='".$tmp[0]."' and substring(periode,1,4) = '".substr($periode,0,4)."' and kode_kelola='".$tmp[1]."' ";
            }

            $sql = "select kode_kelola,tanggal as tgl,
            sum(nilai_depo) as total
            from inv_depo_kkp $filter and jenis='DOC'
            group by kode_kelola,tanggal
            order by kode_kelola,tanggal
            ";

            $pembagi = 1000000;
            $rs = execute($sql);
            $color = array('#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    // $date = new DateTime($row->tgl, new DateTimeZone("UTC"));
                    // $date->getTimestamp()
                    $result[$row->kode_kelola][] = array($row->tgl,round(floatval($row->total),2));
                    
                }
            }

            $sqlc = "select distinct kode_kelola
            from inv_depo_kkp where jenis='DOC' order by kode_kelola
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                $colors[$row["kode_kelola"]] = $color[$i];
                $i++;
            }

            // $colors = array('BHN'=>'#727276','YKT'=>'#7cb5ec','SCH'=>'#ff6f69');
            $sql2 = "select distinct kode_kelola
            from inv_depo_kkp $filter and jenis='DOC' order by kode_kelola
            ";
            $res = dbResultArray($sql2);
            $response["data"] = array();
            foreach($res as $row){
                
                $response["data"][] = array("type"=>"areaspline","name" => $row["kode_kelola"],"color"=>$colors[$row["kode_kelola"]], "data" => $result[$row["kode_kelola"]],"showInLegend"=>true );
                $i++;
            
            }
            
            $response["status"]=true;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDaftarSP(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            $tahun = substr($periode,0,4);

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }

            $spkelola = $tmp[3];
            $orderfilter = $tmp[4];
            $ascdesc = $tmp[5];

            if($spkelola == "" OR $spkelola == "all"){
                $fikelola = "";
            }else{
                $fikelola = " and a.kode_mitra = '$spkelola' ";
            }

            switch($orderfilter){
                case 'nama_kelola' :
                    $orderby = "a.nama";
                break;
                case 'nab_unit' :
                    $orderby = "isnull(b.h_wajar,0)";
                break;
                case 'spi_buku' :
                    $orderby = "isnull(b.spi_buku,0)";
                break;
                default :
                    $orderby = "";
                break;
            }
            if($orderby == ""){
                $order = "";
            }else{
                $order = " order by $orderby $ascdesc";
            }

            $sql = "select a.kode_mitra,a.nama,isnull(b.h_wajar,0) as h_wajar,round(isnull(b.spi_buku,0),4) as spi_buku,a.gambar
            from inv_mitra a
            left join (select a.kode_mitra,sum(a.h_wajar) as h_wajar,sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah) as spi,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_buku
                        from inv_sp_kkp a 
                        where a.tanggal='$tgl_akhir' and a.kode_plan='$kode_plan'
                        group by a.kode_mitra
                        having sum(a.h_wajar*a.jumlah) <> 0 and sum(a.jumlah) <> 0
                       ) b on a.kode_mitra=b.kode_mitra
            where isnull(b.h_wajar,0) <> 0 $fikelola $order";
            $res = execute($sql);
            $sp = array();
            while($row = $res->FetchNextObject($toupper)){
                $sp[] = (array)$row;
            }

            $response["daftar"] = $sp;
            $response["filter"] = $sql;
            $response["filter3"] = $fikelola."-".$order;
            
            $response["status"]=true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDetailSP() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tahun = substr($periode,0,4);
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }

            $kode_mitra = $tmp[3];
            // $jenis = substr($tmp[3],4,2);
            $tahun = substr($periode,0,4);
            $tahunsblum = intval($tahun)-1;
            $tglSblum= $tahunsblum."-12-31";

            $orderfilter = $tmp[4];
            $ascdesc = $tmp[5];

            if($kode_mitra == "" OR $kode_mitra == "all"){
                $fikelola = "";
            }else{
                $fikelola = " and a.kode_mitra = '$kode_mitra' ";
            }

            switch($orderfilter){
                case 'nama_kelola' :
                    $orderby = "a.nama";
                break;
                case 'nab_unit' :
                    $orderby = "isnull(b.h_wajar,0)";
                break;
                case 'spi_buku' :
                    $orderby = "isnull(b.spi_buku,0)";
                break;
                default :
                    $orderby = "";
                break;
            }
            if($orderby == ""){
                $order = "";
            }else{
                $order = " order by $orderby $ascdesc";
            }

            $response = array();
            $sql = "select top 1 a.kode_mitra,a.nama,isnull(b.h_wajar,0) as h_wajar,round(isnull(b.spi_buku,0),4) as spi_buku
            from inv_mitra a
            left join (select a.kode_mitra,sum(a.h_wajar) as h_wajar,sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah) as spi,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_buku
                        from inv_sp_kkp a 
                        where a.tanggal='$tgl_akhir' and a.kode_plan='$kode_plan'
                        group by a.kode_mitra
                        having sum(a.h_wajar*a.jumlah) <> 0 and sum(a.jumlah) <> 0
                       ) b on a.kode_mitra=b.kode_mitra
            where isnull(b.h_wajar,0) <> 0  $fikelola $order";
            $mitra = dbResultArray($sql);
            if($kode_mitra == "" OR $kode_mitra == "all"){
                $kode_mitra = $mitra[0]["kode_mitra"];
            }else{
                $kode_mitra = $tmp[3];
            }
            
            $sqltotal = "select sum(a.h_wajar*a.jumlah) as total from inv_sp_kkp a where a.tanggal='$tgl_akhir' and a.kode_plan='$kode_plan'   ";
            $sptot = dbRowArray($sqltotal);

            $sqlsp = "select a.kode_mitra,a.nama, isnull(b.nbuku_unit,0) as nbuku_unit,isnull(b.nwajar,0)-isnull(b.nbuku,0) as spi_buku,isnull(b.jum_unit,0) as jum_unit,isnull(b.nwajar,0) as nwajar,".round($sptot["total"])." as total,(isnull(b.nwajar,0)/".round($sptot["total"]).")*100 as persen_sp,isnull(b.spi_unit,0) as ytd,isnull(b.nbuku,0) as nbuku,isnull(b.nab_unit,0) as nab_unit
            from inv_mitra a
            left join (select a.kode_mitra,sum(a.jumlah) as jum_unit,(sum(a.h_buku*a.jumlah)/sum(a.jumlah)) as nbuku_unit,sum(a.h_wajar*a.jumlah) as nwajar,sum(a.h_buku*a.jumlah) as nbuku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah)) as spi_buku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_unit,(sum(a.h_wajar*a.jumlah)/sum(a.jumlah)) as nab_unit
                        from inv_sp_kkp a 
                        where 
                        a.tanggal='$tgl_akhir' 
                        and a.kode_plan='$kode_plan'
                        group by a.kode_mitra
                        having sum(a.h_wajar*a.jumlah) <> 0 and sum(a.jumlah) <> 0
                       ) b on a.kode_mitra=b.kode_mitra
            where a.kode_mitra='$kode_mitra'  ";
            $sp = dbResultArray($sqlsp);

            $response["daftar"] = $sp;

            $sql = "select a.kode_spkelola,a.tanggal as tgl,
            sum(a.jumlah*a.h_wajar) as total
            from inv_sp_kkp a 
            where substring(a.periode,1,4)='$tahun' and a.kode_plan='$kode_plan' and a.kode_mitra='$kode_mitra'
            group by a.kode_spkelola,a.tanggal
            order by a.kode_spkelola,a.tanggal
            ";
            $pembagi = 1000000000;
            $rs = execute($sql);
            $color = array('#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result[$row->kode_spkelola][] = array($row->tgl,round(floatval($row->total)/$pembagi,2));
                    
                }
            }

            $sqlc = "select distinct kode_spkelola
            from inv_sp_kkp
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                $colors[$row["kode_spkelola"]] = $color[$i];
                $i++;
            }

            $sql2 = "select distinct a.kode_spkelola
            from inv_sp_kkp a 
            where substring(a.periode,1,4)='$tahun'
            and a.kode_plan='$kode_plan' and a.kode_mitra='$kode_mitra'";
            $res = dbResultArray($sql2);
            $response["NAB"] = array();
            foreach($res as $row){
                
                $response["NAB"][] = array("type"=>"area","name" => $row["kode_spkelola"],"color"=>$colors[$row["kode_spkelola"]], "data" => $result[$row["kode_spkelola"]],"showInLegend"=>true );
                $i++;
            
            }

            $sql = "select a.kode_spkelola,a.tanggal as tgl,
            (sum(a.jumlah*a.h_wajar))-(sum(a.jumlah*a.h_oleh)) as total,(sum(a.jumlah*a.h_wajar))-(sum(a.jumlah*a.h_buku)) as total2
            from inv_sp_kkp a 
            where substring(a.periode,1,4)='$tahun'
            and a.kode_plan='$kode_plan' and a.kode_mitra='$kode_mitra' 
            group by a.kode_spkelola,a.tanggal
            order by a.kode_spkelola,a.tanggal asc
            ";

            $pembagi = 1000000000;
            $rs = execute($sql);
            $color = array('#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result[$row->kode_spkelola][] = array($row->tgl,round(floatval($row->total)/$pembagi,2));
                    $result[$row->kode_spkelola."SPI_Buku"][] = array($row->tgl,round(floatval($row->total2)/$pembagi,2));
                    
                }
            }
 
            $sqlc = "select distinct kode_spkelola
            from inv_sp_kkp
            ";
            $resc = dbResultArray($sqlc);
            $i=0;
            $colors = array();
            foreach($resc as $row){
                
                $colors[$row["kode_spkelola"]] = $color[$i];
                $colors[$row["kode_spkelola"]."SPI_Buku"] = $color[$i+1];
                $i++;
            }
            
            $response["colors"]=$colors;

            $sql2 = "select distinct a.kode_spkelola
            from inv_sp_kkp a 
            where substring(a.periode,1,4)='$tahun'
            and a.kode_plan='$kode_plan' and a.kode_mitra='$kode_mitra' ";
            $res = dbResultArray($sql2);
            $response["SPI"] = array();
            foreach($res as $row){
                
                $response["SPI"][] = array("type"=>"area","name" => $row["kode_spkelola"]." SPI Perolehan","color"=>$colors[$row["kode_spkelola"]], "data" => $result[$row["kode_spkelola"]],"showInLegend"=>true,"visible"=> false );
                $response["SPI"][] = array("type"=>"area","name" => $row["kode_spkelola"]." SPI Buku","color"=>$colors[$row["kode_spkelola"]."SPI_Buku"], "data" => $result[$row["kode_spkelola"]."SPI_Buku"],"showInLegend"=>true );
                $i++;
            
            }

            $response["status"]=true;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDepoMI(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $kode_kelola = $tmp[3];
            $kode_bank = $tmp[4];
            if($kode_bank ==""){
                $filterbank = "";
            }else{
                $filterbank = " and bb.kode_bankklp = '$kode_bank' ";
            }

            $depo1 = dbResultArray("select top 1 a.kode_kelola,a.nama,a.gambar, b.jum as nilai
            from inv_kelola a
            inner join ( select kode_kelola,sum(nilai_depo) as jum from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan'  and jenis='Deposito'
            group by kode_kelola ) b on a.kode_kelola=b.kode_kelola");
            if($kode_kelola == ""){
                $kode_kelola = $depo1[0]["kode_kelola"];
            }else{
                $kode_kelola = $kode_kelola;
            }
            
            $sql = "select 
            bb.nama,b.nama as cabang,a.nilai,case when a.jenis='DEPOSITO' then 'BERJANGKA' else 'DOC' end as jenis,    
            convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,datediff(day,a.tgl_mulai,a.tgl_selesai) as jml_hari
            ,datediff(month,a.tgl_mulai,a.tgl_selesai) as jml_bln,a.p_bunga,
            a.no_depo,a.kode_kelola,bb.gambar	   
            from inv_depo2_m a
            inner join inv_bank b on a.bdepo=b.kode_bank
            inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
            left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '$tgl_akhir'
            where 
            a.kode_lokasi='$kode_lokasi' and a.kode_plan='$kode_plan' and a.kode_kelola = '$kode_kelola'
            and a.tgl_mulai <= '$tgl_akhir' and a.jenis='Deposito'
            and c.no_depo is null $filterbank
            
            ";
            $depo = array();

            $depo = dbResultArray($sql);

            $response["daftar"] = $depo;            
            $response["status"]=true; 
            
            $response["sql"]=$sql; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDepoAlokasi(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];

            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];
            
            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $kode_kelola = $tmp[3];

            $sql1= "select top 1 a.kode_kelola,a.nama,a.gambar, b.jum as nilai
            from inv_kelola a
            inner join ( select kode_kelola,sum(nilai_depo) as jum from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan'  and jenis='Deposito'
            group by kode_kelola ) b on a.kode_kelola=b.kode_kelola";
            $depo1 = dbResultArray($sql1);
            // $response["depo"]= $sql1;
            if($kode_kelola == ""){
                $kode_kelola = $depo1[0]["kode_kelola"];
            }else{
                $kode_kelola = $kode_kelola;
            }
            
            $sql = "select 
            bb.nama,a.kode_kelola,sum(a.nilai) as total	   
            from inv_depo2_m a
            inner join inv_bank b on a.bdepo=b.kode_bank
            inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
            left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '$tgl_akhir'
            where 
            a.kode_lokasi='$kode_lokasi' and a.kode_plan='$kode_plan' and a.kode_kelola='$kode_kelola'
            and a.tgl_mulai <= '$tgl_akhir' and a.jenis='Deposito'
            and c.no_depo is null
            group by bb.nama,a.kode_kelola
            ";
            $depo = execute($sql);

            while($row=$depo->FetchNextObject($toupper=false)){
                $response["data"][]= array($row->nama,floatval($row->total));
            }
            $response["status"]=true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getRoiKkp(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tahun =substr($periode,0,4);
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }

            $sql1= "select roi_total,cash_out,pdpt,beban_inves,spi from inv_roi_kkp where tanggal='$tgl_akhir' and kode_plan='$kode_plan'";
            $response["data"] = dbRowArray($sql1);

            $sql2 = "select *
            from  inv_roi_total where kode_plan='$kode_plan' and tanggal='$tgl_akhir'";
            $row = dbResultArray($sql2);

            $response["roi_total"] = $row[0]["roi_ytd"];
            $response["status"]=true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDOCMI(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }

            $kode_kelola = $tmp[3];
            $kode_bank=$tmp[4];
            if($kode_bank ==""){
                $filterbank = "";
            }else{
                $filterbank = " and bb.kode_bankklp = '$kode_bank' ";
            }

            $depo1 = dbResultArray("select top 1 a.kode_kelola,a.nama,a.gambar, b.jum as nilai
            from inv_kelola a
            inner join ( select kode_kelola,sum(nilai_depo) as jum from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan'  and jenis='DOC'
            group by kode_kelola ) b on a.kode_kelola=b.kode_kelola");
            if($kode_kelola == ""){
                $kode_kelola = $depo1[0]["kode_kelola"];
            }else{
                $kode_kelola = $kode_kelola;
            }
            
            $sql = "select 
            bb.nama,b.nama as cabang,a.nilai,case when a.jenis='DEPOSITO' then 'BERJANGKA' else 'DOC' end as jenis,    
            convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,datediff(day,a.tgl_mulai,a.tgl_selesai) as jml_hari
            ,datediff(month,a.tgl_mulai,a.tgl_selesai) as jml_bln,a.p_bunga,
            a.no_depo,a.kode_kelola,bb.gambar	   
            from inv_depo2_m a
            inner join inv_bank b on a.bdepo=b.kode_bank
            inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
            left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '$tgl_akhir'
            where 
            a.kode_lokasi='$kode_lokasi' and a.kode_plan='$kode_plan' and a.kode_kelola = '$kode_kelola'
            and a.tgl_mulai <= '$tgl_akhir'  and a.jenis='DOC'
            and c.no_depo is null $filterbank
            
            ";
            $depo = array();

            $depo = dbResultArray($sql);

            $response["daftar"] = $depo;            
            $response["status"]=true; 
            $response["sql"]=$sql; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDOCAlokasi(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }

            $kode_kelola = $tmp[3];

            $sql1= "select top 1 a.kode_kelola,a.nama,a.gambar, b.jum as nilai
            from inv_kelola a
            inner join ( select kode_kelola,sum(nilai_depo) as jum from inv_depo_kkp where tanggal = '$tgl_akhir' and kode_plan='$kode_plan'  and jenis='DOC'
            group by kode_kelola ) b on a.kode_kelola=b.kode_kelola";
            $depo1 = dbResultArray($sql1);
            // $response["depo"]= $sql1;
            if($kode_kelola == ""){
                $kode_kelola = $depo1[0]["kode_kelola"];
            }else{
                $kode_kelola = $kode_kelola;
            }
            
            $sql = "select 
            bb.nama,a.kode_kelola,sum(a.nilai) as total	   
            from inv_depo2_m a
            inner join inv_bank b on a.bdepo=b.kode_bank
            inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
            left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '$tgl_akhir'
            where 
            a.kode_lokasi='$kode_lokasi' and a.kode_plan='$kode_plan' and a.kode_kelola='$kode_kelola'
            and a.tgl_mulai <= '$tgl_akhir' and a.jenis='DOC'
            and c.no_depo is null
            group by bb.nama,a.kode_kelola
            ";
            $depo = execute($sql);

            while($row=$depo->FetchNextObject($toupper=false)){
                $response["data"][]= array($row->nama,floatval($row->total));
            }
            $response["status"]=true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getBankKlp(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }

            $kode_kelola = $tmp[3];
            $jenis_depo = $tmp[4];
            
            $sql = "select bb.kode_bankklp,bb.nama,a.kode_kelola,sum(a.nilai) as total	   
            from inv_depo2_m a
            inner join inv_bank b on a.bdepo=b.kode_bank
            inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
            left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '$tgl_akhir'
            where 
            a.kode_lokasi='$kode_lokasi' and a.kode_plan='$kode_plan' and a.kode_kelola='$kode_kelola'
            and a.tgl_mulai <= '$tgl_akhir' and a.jenis='$jenis_depo'
            and c.no_depo is null
            group by bb.kode_bankklp,bb.nama,a.kode_kelola ";
            $bank = dbResultArray($sql);

            $response["daftar"] = $bank;            
            $response["status"]=true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getParamDefault(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_plan2 = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            // $param = $data["param"];
            // $tmp= explode("|",$param);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            

            if($kode_plan == ""){
                $kode_plan= "1";
            }
            if($kode_klp == ""){
                $kode_klp= "5050";
            }
        
            $sql2 = "select max(a.tanggal) as tgl from 
            (
                select tanggal from inv_saham_kkp 
                union all 
                select tanggal from inv_rd_kkp  
                union all 
                select tanggal from inv_sp_kkp 
                union all 
                select tanggal from inv_depo_kkp 
                ) a
                ";
            $rsta = execute($sql2);
            $tglakhirx = $rsta->fields[0];     

            $sql3 = "select nama from inv_plan where kode_plan='$kode_plan'";
            $rsnm = execute($sql3);
            $nama_plan = $rsnm->fields[0];
           
            $response["status"]=true; 
            $response["kode_plan"] = $kode_plan;
            $response["kode_klp"] = $kode_klp;
            $response["kode_plan2"] = $kode_plan2;
            $response["tgl_akhir"] = $tgl_akhir;
            $response["tgl_default"] = $tglakhirx;
            $response["nama_plan"] = $nama_plan; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getListPlan(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $data = dbResultArray("select distinct kode_plan,nama from inv_plan ");
            $response["daftar"] = $data;
            $response["status"] = true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getListSektor(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $data = dbResultArray("select distinct kode_sahamklp,nama from inv_sahamklp where kode_sahamklp <> 'S1000'");
            $response["daftar"] = $data;
            $response["status"] = true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getListKomposisi(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $data = dbResultArray("select distinct kode_klp,'[Campuran-Saham]' as nama from inv_persen ");
            $response["daftar"] = $data;
            $response["status"] = true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getSahamPerKelola(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $total = dbRowArray("select sum(a.total) as total
            from ( 
                select kode_kelola, sum(jumlah*h_wajar) as total 
                from inv_saham_kkp 
                where tanggal='$tgl_akhir' and kode_plan='$kode_plan'
                group by kode_kelola
            ) a ");

            $data = dbResultArray("select a.kode_kelola, a.nama,a.gambar,isnull(b.total,0) as n1,(isnull(b.total,0)/".$total["total"].")*100 as persen 
            from inv_kelola a 
            left join ( 
                select kode_kelola, sum(jumlah*h_wajar) as total 
                from inv_saham_kkp 
                where tanggal='$tgl_akhir' and kode_plan='$kode_plan'
                group by kode_kelola
            ) b on a.kode_kelola=b.kode_kelola
            where isnull(b.total,0) <> 0");

            $response["daftar"] = $data;
            $response["chart"] = array();
            $color = array('#FF2D55','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
            $i=0;
            foreach($data as $p){
                $tmP = $p["nama"];
                $response["chart"][] = array("name" => $tmP,"y"=>round(floatval($p["n1"])),"color"=>$color[$i]);
                $i++;
            }
            $response["status"] = true; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
?>