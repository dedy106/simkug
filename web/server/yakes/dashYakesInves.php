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

	function getLokasi(){
    
        getKoneksi();
        $sql = "select kode,nama from lokasi ";
		// $rs = dbResultArray($sql);
        $response["daftar"] = $sql;
        header('Content-Type: application/json');
        echo json_encode($response);
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

    function getFilKolom(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);

            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            // $tgl_akhir = $tmp[2];
            // $kode_plan = $tmp[0];
            // $kode_klp = $tmp[1];
            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            $tahun = substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunLalu = intval($tahun)-1;

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            // $sql = "
            // select distinct periode from inv_kelas_dash
            // where periode LIKE '$tahun%' and periode not in ('".$tahun."03','".$tahun."06','".$tahun."09','".$tahun."12')
            // union all
            // select '$tahun'+'Q1' as periode
            // union all
            // select '$tahun'+'Q2' as periode
            // union all
            // select '$tahun'+'Q3' as periode
            // union all
            // select '$tahun'+'Q4' as periode
            // union all
            // select distinct periode from inv_kelas_dash
            // where periode LIKE '$tahunLalu%' and periode not in ('".$tahunLalu."03','".$tahunLalu."06','".$tahunLalu."09','".$tahunLalu."12')
            // union all
            // select '$tahunLalu'+'Q1' as periode
            // union all
            // select '$tahunLalu'+'Q2' as periode
            // union all
            // select '$tahunLalu'+'Q3' as periode
            // union all
            // select '$tahunLalu'+'Q4' as periode
            // ";
            $sql =" select *
			from (select distinct case substring(a.periode,5,2) when '03' then substring(a.periode,1,4)+'Q1' when '06' then substring(a.periode,1,4)+'Q2' when '09' then substring(a.periode,1,4)+'Q3' when '12' then substring(a.periode,1,4)+'Q4' else a.periode end as periode,a.periode as periodecode 
			from inv_kelas_dash a
			) a 
			order by periodecode desc ";
            $res = dbResultArray($sql);
            $response["daftar"] = $res;
            $response['per_awal'] = $tahunLalu."Q4";
            $response['sql']=$sql;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTglAkhir($perAkhir = null){
        getKoneksi();
        $data=$_GET;
        $filter = "";
        if ($perAkhir != ""){
            $filter = " where periode='$perAkhir' ";
        }
        $sql2 = "select max(a.tanggal) as tgl from 
            (
                select tanggal from inv_saham_kkp $filter
                union all 
                select tanggal from inv_rd_kkp  $filter
                union all 
                select tanggal from inv_sp_kkp $filter
                union all 
                select tanggal from inv_depo_kkp $filter
                union all
                select tanggal from inv_tab_kkp $filter
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
            // $tab = dbRowArray("select sum(nab) as nwajar from inv_tab_kkp where kode_plan='$kode_plan' and tanggal = '$tgl_akhir' ");
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

            $saham = dbRowArray("select isnull(nilai,0) as jum,acuan from inv_batas_alokasi where kode_kelas='SB' and kode_plan='$kode_plan' and tahun='$tahun' ");
            $kas= dbRowArray("select isnull(nilai,0) as jum,acuan from inv_batas_alokasi where kode_kelas='KAS' and kode_plan='$kode_plan' and tahun='$tahun' ");
            $ebt = dbRowArray("select isnull(nilai,0) as jum,acuan from inv_batas_alokasi where kode_kelas='EBT' and kode_plan='$kode_plan' and tahun='$tahun' ");
            $propensa = dbRowArray("select isnull(nilai,0) as jum,acuan  from inv_batas_alokasi where kode_kelas='PRO' and kode_plan='$kode_plan' and tahun='$tahun' ");

            $response["saham"]=$saham["jum"];
            $response["kas"]=$kas["jum"];
            $response["ebt"]=$ebt["jum"];
            $response["propensa"]=$propensa["jum"];
            $response["saham_acuan"]=$saham["acuan"];
            $response["kas_acuan"]=$kas["acuan"];
            $response["ebt_acuan"]=$ebt["acuan"];
            $response["propensa_acuan"]=$propensa["acuan"];

            $total = dbRowArray("select sum(nilai) as nwajar from inv_batas_alokasi where kode_plan='$kode_plan' and tahun='$tahun' ");
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
            $periode = $data["periode"];
            $response = array();

            $tmp = explode("|",$data["param"]);
            $response["param"] = count($tmp);

            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

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

                if($tmp[1] == 5){
                    $filter = " where kode_plan='".$tmp[0]."' and substring(periode,1,4) = '".substr($tmp[2],0,4)."' and kode_kelola='".$tmp[3]."' ";
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
            
            $response["sql"]=$sql; 

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
            $tgl_akhir = $data["param"];
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

    function getSPIHari2() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tgl_akhir = $data["param"];
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

            $sql = "select kode_kelola,tanggal as tgl,sum(jumlah*h_wajar) as total2
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
                    $result[$row->kode_kelola."n_wajar"][] = array($row->tgl,round(floatval($row->total2),2));
                    
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
                $colors[$row["kode_kelola"]."n_wajar"] = $color[$i+1];
                $i++;
            }
            
            $response["colors"]=$colors;

            $sql2 = "select distinct kode_kelola
            from inv_saham_kkp $filter
            ";
            $res = dbResultArray($sql2);
            $response["data"] = array();
            foreach($res as $row){
                
                $response["data"][] = array("type"=>"area","name" => $row["kode_kelola"]." Nilai Wajar","color"=>$colors[$row["kode_kelola"]."n_wajar"], "data" => $result[$row["kode_kelola"]."n_wajar"],"showInLegend"=>true );
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
            $tmp = explode("|",$data["param"]);

            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kom = $param["kode_klp"];
            // $tgl = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kom = $tmp[2];

            
            $color = array('#007AFF', '#FFCC00', '#4CD964', '#9F9F9F', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1');
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

            // $sql="exec sp_inv_portofolio3 '$kode_fs','$periode','$kode_lokasi','$nik_user','$tgl','$komp','$kode_plan' ";
            // $rs = execute($sql);	
            // $sql2 = "with t(kode_neraca,nama, n3) 
            // as 
            // ( 
            //     select kode_neraca,nama,sum(n3) as n3
            //     from neraca_tmp 
            //     where nik_user='$nik_user' and modul='KAS' and ((n0 <> 0) or (n1 <> 0) or (n2 <> 0) or (n3 <> 0) or (n4 <> 0))
            //     group by kode_neraca,nama
            // )
            // select kode_neraca,nama,n3, n3 * 100.0/(select sum(n3) from t) as persen
            // from t
            // order by kode_neraca;";
            $sql2="with t(kode_subkelas,nama, n3,nu) 
            as 
            ( 
                             select a.kode_subkelas,b.nama,sum(nab) as n3,b.nu
                             from inv_roi_subkelas a 
                             left join inv_subkelas b on a.kode_subkelas=b.kode_subkelas
                             where modul='KAS' and tanggal='$tgl'
                             group by a.kode_subkelas,b.nama,b.nu
            )
            select kode_subkelas,nama,n3,n3 * 100/(select sum(n3) from t) as persen
            from t
            order by nu";

            $kas = dbResultArray($sql2);
            $response["kas_chart"] = array();
            $i=0;
            foreach($kas as $k){
                // $tmK = substr($k["nama"],3);
                $tmK=$k["nama"];
                $response["kas_chart"][] = array("name" => $tmK,"y"=>round(floatval($k["n3"])),"key"=>"kas_rowke".$i,"color"=>$color[$i]);
                $i++;
            }
            // $sql3 = "with t(kode_neraca,nama, n3) 
            // as 
            // ( 
            //     select kode_neraca,nama,sum(n3) as n3
            //     from neraca_tmp 
            //     where nik_user='$nik_user' and modul='EBT' and ((n0 <> 0) or (n1 <> 0) or (n2 <> 0) or (n3 <> 0) or (n4 <> 0))
            //     group by kode_neraca,nama
            // )
            // select kode_neraca,nama,n3, n3 * 100.0/(select sum(n3) from t) as persen
            // from t
            // order by kode_neraca;";
            $sql3="with t(kode_subkelas,nama, n3,nu) 
            as 
            ( 
                             select a.kode_subkelas,b.nama,sum(nab) as n3,b.nu
                             from inv_roi_subkelas a 
                             left join inv_subkelas b on a.kode_subkelas=b.kode_subkelas
                             where modul='EBT' and tanggal='$tgl'
                             group by a.kode_subkelas,b.nama,b.nu
            )
            select kode_subkelas,nama,n3,n3 * 100/(select sum(n3) from t) as persen
            from t
            order by nu";

            $ebt = dbResultArray($sql3);
            $response["ebt_chart"] = array();
            $dataebt = array();
            $j=0;
            foreach($ebt as $e){
                // $tmE = substr($e["nama"],3);
                $tmE=$e["nama"];
                if($tmE == " RD Campuran"){
                    if($kom == "5050"){
                        $nilai = ($e["n3"]*50)/100;
                    }else{
                        $nilai = ($e["n3"]*30)/100;
                    }
                }else{
                    $nilai = $e["n3"];
                }
                $response["ebt_chart"][] = array("name" => $tmE,"y"=>round(floatval($nilai)),"key"=>"ebt_rowke".$j,"color"=>$color[$j]);
                $dataebt[] = array("kode_subkelas"=>$e["kode_subkelas"],"nama"=>$e["nama"],"n3"=>$nilai,"persen"=>$e["persen"]);
                $j++;
            }
            // $sql4 = "with t(kode_neraca,nama, n3) 
            // as 
            // ( 
            //     select kode_neraca,nama,sum(n3) as n3
            //     from neraca_tmp 
            //     where nik_user='$nik_user' and modul='SB' and ((n0 <> 0) or (n1 <> 0) or (n2 <> 0) or (n3 <> 0) or (n4 <> 0))
            //     group by kode_neraca,nama
            // )
            // select kode_neraca,nama,n3, n3 * 100.0/(select sum(n3) from t) as persen
            // from t
            // order by kode_neraca; ";
            $sql4="with t(kode_subkelas,nama, n3,nu) 
            as 
            ( 
                             select a.kode_subkelas,b.nama,sum(nab) as n3,b.nu
                             from inv_roi_subkelas a 
                             left join inv_subkelas b on a.kode_subkelas=b.kode_subkelas
                             where modul='SB' and tanggal='$tgl'
                             group by a.kode_subkelas,b.nama,b.nu
            )
            select kode_subkelas,nama,n3,n3 * 100/(select sum(n3) from t) as persen
            from t
            order by nu";
            $sb = dbResultArray($sql4);

            $response["sb_chart"] = array();
            $datasb = array();
            $z=0;
            foreach($sb as $s){
                // $tmS = substr($s["nama"],3);
                $tmS=$s["nama"];
                if($tmS == "RD Campuran"){
                    if($kom == "5050"){
                        $nilai = ($s["n3"]*50)/100;
                    }else{
                        $nilai = ($s["n3"]*70)/100;
                    }
                }else{
                    $nilai = $s["n3"];
                }
                $response["sb_chart"][] = array("name" => $tmS,"y"=>round(floatval($nilai)),"key"=>"sb_rowke".$z,"color"=>$color[$z]);
                $datasb[] = array("kode_subkelas"=>$s["kode_subkelas"],"nama"=>$s["nama"],"n3"=>$nilai,"persen"=>$s["persen"]);
                $z++;
            }
            $sql5 = "with t(kode_mitra,nama, n3) 
            as 
            ( 
                select a.kode_mitra,a.nama, isnull(b.jum,0) as n3 
                from inv_mitra a 
                left join (select kode_mitra,sum(jumlah * h_wajar) as jum 
                       from inv_sp_kkp 
                       where tanggal = '$tgl' and kode_plan='$kode_plan' 
                       group by kode_mitra ) b on a.kode_mitra = b.kode_mitra
            )
            select kode_mitra,nama,n3, n3 * 100.0/(select sum(n3) from t) as persen
            from t
            order by kode_mitra; ";
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
            $tmp = explode("|",$data["param"]);
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

            $rs = execute("select top 5 a.kode_saham, sum(a.jumlah) as jum, sum(a.jumlah * a.h_wajar) as nilai, (sum(a.jumlah * a.h_wajar)/sum(a.jumlah)) as harga
            from inv_saham_kkp a 
            left join inv_saham b on a.kode_saham=b.kode_saham
            where a.kode_plan='$kode_plan' and a.tanggal='$tgl_akhir' and b.kode_sahamklp='$sektor'
            group by a.kode_saham 
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

            // $reksadana = dbResultArray($sql);

            $response["daftar"] = $reksadana;
            // $response["filter"] = $sql;
            // $response["filter3"] = $orderfilter."-".$ascdesc."-".$orderby."-".$order;
            
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
            $tahun = substr($tgl_akhir,0,4);

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

            $res = dbResultArray("select top 1 a.kode_rd,a.nama,isnull(b.nab_unit,0)$filterdata as nab_unit, isnull(b.nbuku_unit,0)$filterdata as nbuku_unit,isnull(b.spi_buku,0)$filterdata as spi_buku,c.nama as nama_kelola,isnull(b.jum_unit,0)$filterdata as jum_unit,isnull(b.nbuku,0)$filterdata as nbuku,isnull(b.spi_unit,0)$filterdata as ytd
            from inv_rd a
            left join (select a.kode_rd,sum(a.jumlah) as jum_unit,(sum(a.h_wajar*a.jumlah)/sum(a.jumlah)) as nab_unit,(sum(a.h_buku*a.jumlah)/sum(a.jumlah)) as nbuku_unit,sum(a.h_buku*a.jumlah) as nbuku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah)) as spi_buku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_unit
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

            $sqlrd = "select a.kode_rd,a.nama, isnull(b.nbuku_unit,0)$filterdata as nbuku_unit,isnull(b.spi_buku,0)$filterdata as spi_buku,c.nama as nama_kelola,isnull(b.jum_unit,0)$filterdata as jum_unit,isnull(b.nbuku,0)$filterdata as nbuku, isnull(b.spi_unit,0)$filterdata as ytd
            from inv_rd a
            left join (select a.kode_rd,sum(a.jumlah) as jum_unit,(sum(a.h_buku*a.jumlah)/sum(a.jumlah)) as nbuku_unit,sum(a.h_buku*a.jumlah) as nbuku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah)) as spi_buku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_unit
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
                    if($kode_rdklp == "RDPD"){
                        
                        $result[$row->kode_kelola][] = array($row->tgl,floatval($row->total));
                    }else{

                        $result[$row->kode_kelola][] = array($row->tgl,round(floatval($row->total)/$pembagi,2));
                    }
                    
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

            $response["ROI"] = array();
            
            $response['ket'] = "( dalam Miliar Rupiah )";
            if($kode_rdklp == 'RDPD'){
                $response['ket'] = "";

                $sql = "select a.kode_kelola,a.tanggal as tgl,
                (sum(a.jumlah*a.h_wajar)$filterdata)-(sum(a.jumlah*a.h_oleh)$filterdata) as total,(sum(a.jumlah*a.h_wajar)$filterdata)-(sum(a.jumlah*a.h_buku)$filterdata) as total2,sum(a.roi_persen) as total3
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
                        // $result[$row->kode_kelola."SPI_Buku"][] = array($row->tgl,round(floatval($row->total2)/$pembagi,2));

                        $result[$row->kode_kelola."ROI"][] = array($row->tgl,floatval($row->total3));
                        
                    }
                }
    
                $sqlc = "select distinct kode_kelola
                from inv_rd_kkp
                ";
                $resc = dbResultArray($sqlc);
                $i=0;
                $colors = array();
                foreach($resc as $row){
                    
                    // $colors[$row["kode_kelola"]] = $color[$i];
                    // $colors[$row["kode_kelola"]."SPI_Buku"] = $color[$i+1];
                    $colors[$row["kode_kelola"]."ROI"] = $color[$i];
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
               
                foreach($res as $row){
                    
                    // $response["SPI"][] = array("type"=>"area","name" => $row["kode_kelola"]." SPI Perolehan","color"=>$colors[$row["kode_kelola"]], "data" => $result[$row["kode_kelola"]],"showInLegend"=>true,"visible"=> false );
                    // $response["SPI"][] = array("type"=>"area","name" => $row["kode_kelola"]." SPI Buku","color"=>$colors[$row["kode_kelola"]."SPI_Buku"], "data" => $result[$row["kode_kelola"]."SPI_Buku"],"showInLegend"=>true );
                    
                    $response["ROI"][] = array("type"=>"area","name" => $row["kode_kelola"]." ROI","color"=>$colors[$row["kode_kelola"]."ROI"], "data" => $result[$row["kode_kelola"]."ROI"],"showInLegend"=>true );
                    $i++;
                
                }
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
                        group by kode_kelola ) b on a.kode_kelola=b.kode_kelola");
            
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
                        group by kode_kelola ) b on a.kode_kelola=b.kode_kelola");
            
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
            $tgl_akhir = $data["param"];
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
            from inv_depo_kkp $filter
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
            from inv_depo_kkp
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
            from inv_depo_kkp $filter
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

            $kode_mitra = $tmp[3];
            // $jenis = substr($tmp[3],4,2);
            $tahun = substr($tgl_akhir,0,4);
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

            $sqlsp = "select a.kode_mitra,a.nama, isnull(b.nbuku_unit,0) as nbuku_unit,round(isnull(b.spi_buku,0),4) as spi_buku,isnull(b.jum_unit,0) as jum_unit,isnull(b.nwajar,0) as nwajar,".round($sptot["total"])." as total,(isnull(b.nwajar,0)/".round($sptot["total"]).")*100 as persen_sp,isnull(b.spi_unit,0) as ytd
            from inv_mitra a
            left join (select a.kode_mitra,sum(a.jumlah) as jum_unit,(sum(a.h_buku*a.jumlah)/sum(a.jumlah)) as nbuku_unit,sum(a.h_wajar*a.jumlah) as nwajar,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah)) as spi_buku,(sum(a.h_wajar*a.jumlah)-sum(a.h_buku*a.jumlah))/sum(a.h_wajar*a.jumlah)*100 as spi_unit
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

            $periode = substr($tgl_akhir,0,4).substr($tgl_akhir,5,2);

            $sql1= "select roi_total,cash_out,pdpt,beban_inves,spi from inv_roi_kkp where tanggal='$tgl_akhir' and kode_plan='$kode_plan'";
            $response["data"] = dbRowArray($sql1);

            $sqlco = "select sum(nilai) as cashout
            from inv_cashout_tgl 
            where tanggal between '$tahun-01-01' and '$tgl_akhir'
            and jenis in ('CAPEX','OPEX','CC') ";
            $tmp0 = dbRowArray($sqlco);
            $response["cashout"] = (isset($tmp0['cashout']) ? $tmp0['cashout'] : 0);

            $sqlbeban= "select round(sum(mi_fee+b_trans+kustodi+jasa_ahli),0) as beban_inves 
            from inv_roi_beban 
            where tanggal between substring('$periode',1,4)+'-01-01' and '$tgl_akhir' ";
            $tmp = dbRowArray($sqlbeban);
            $response["beban"] = (isset($tmp['beban_inves']) ? $tmp['beban_inves'] : 0);

            $sqlpdpt= "select sum(x.pdpt) as pdpt
            from
            (
            select a.kode_kelas, a.kode_akun, case when a.kode_akun = '41020310' then sum(case when b.dc = 'H' then b.local_amount else -b.local_amount end)/2 else sum(case when b.dc = 'H' then b.local_amount else -b.local_amount end) end as pdpt
                        
            from inv_kelas_akun a 
            left join exs_glitem b on a.kode_akun=substring(b.glacc,3,10)
            where a.modul='PDPT' and 
                substring(b.pstng_date,1,4)+'-'+substring(b.pstng_date,5,2)+'-'+substring(b.pstng_date,7,2)
                between substring('$periode',1,4)+'01-01' and '$tgl_akhir'
                group by a.kode_kelas,a.kode_akun
            ) x		";
            $tmp2 = dbRowArray($sqlpdpt);
            $response["pdpt"] = (isset($tmp2['pdpt']) ? $tmp2['pdpt'] : 0);

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
            
            $response["sql"]= $sql; 
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
            $param = $data["param"];
            $tmp= explode("|",$param);
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

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
            $tglakhir = $rsta->fields[0];     

            $sql3 = "select nama from inv_plan where kode_plan='$kode_plan'";
            $rsnm = execute($sql3);
            $nama_plan = $rsnm->fields[0];
           
            $response["status"]=true; 
            $response["kode_plan"] = $kode_plan;
            $response["kode_klp"] = $kode_klp;
            $response["tgl_akhir"] = $tglakhir;
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
            $color = array('#5856d6','#FFCC00','#007AFF','#4CD964','#727276','#7cb5ec','#ff6f69','#8085e9', '#f15c80','#2b908f','#f45b5b','#058DC7', '#6AF9C4','#f39c12', '#24CBE5');
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

    //DX04
    function getMI(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $sql = "select kode_kelola,nama from inv_kelola where flag_aktif='1' ";
            $response["daftar"] = dbResultArray($sql);            
            $response["status"]=true; 
            
            $response["sql"]=$sql; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDeposito(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data["periode"];
            $tmp = explode("|",$data["param"]);
            $tgl_akhir = $tmp[0];
            $kode_plan = $tmp[1];
            $kode_klp = $tmp[2];
            // $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            // $tgl_akhir = $param["tgl_akhir"];
            // $kode_plan = $param["kode_plan"];
            // $kode_klp = $param["kode_klp"];
            $jenis = $tmp[3];
            $kode_kelola=$tmp[4];
            $no_depo=$tmp[5];

            if($jenis == "semua" OR $jenis ==""){
                $filjenis = "";
            }else{
                $filjenis = " and a.jenis = '$jenis' ";
            }

            if($kode_kelola == "semua" OR $kode_kelola == ""){    
                $filkelola = "";

            }else{
                $filkelola = " and a.kode_kelola ='$kode_kelola' ";
            }

            if($no_depo == "semua" OR $no_depo == ""){    
                $fildepo = "";

            }else{
                $fildepo = " and a.no_depo ='$no_depo' ";
            }

            $sql = "select 
            bb.nama,b.nama as cabang,a.nilai,case when a.jenis='DEPOSITO' then 'BERJANGKA' else 'DOC' end as jenis,    
            convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,datediff(day,a.tgl_mulai,a.tgl_selesai) as jml_hari
            ,datediff(month,a.tgl_mulai,a.tgl_selesai) as jml_bln,a.p_bunga,
            a.no_depo,a.kode_kelola,bb.gambar,datediff(day,'$tgl_akhir',a.tgl_selesai) as jatuhtempo,d.nama as nama_kelola	   
            from inv_depo2_m a
            inner join inv_bank b on a.bdepo=b.kode_bank
            inner join inv_bankklp bb on b.kode_bankklp=bb.kode_bankklp
            inner join inv_kelola d on a.kode_kelola=d.kode_kelola
            left join inv_depotutup_m c on a.no_depo=c.no_depo and c.tanggal <= '$tgl_akhir'
            where 
            a.kode_lokasi='$kode_lokasi' and a.kode_plan='$kode_plan' 
            and c.no_depo is null and datediff(day,'$tgl_akhir',a.tgl_selesai) > 0 
            $filjenis $filkelola $fildepo
            order by datediff(day,'$tgl_akhir',a.tgl_selesai) 
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
    
    function getROIPortofolio() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            $periode = $data['periode'];
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];


            $filter = "where kode_plan='".$kode_plan."' and substring(periode,1,4) = '".substr($periode,0,4)."' ";

            $sql = "select tanggal as tgl,
            roi_ytd as total
            from inv_roi_total $filter
            order by tanggal
            ";
            $rs=execute($sql);

            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result['roi'][] = array($row->tgl,floatval($row->total));
                }
            }

            $response["data"][0] = array("type"=>"area","name" => 'ROI Total', "data" => $result['roi'],"showInLegend"=>true );

            $row = dbRowArray("select roi_ytd from inv_roi_total $filter and tanggal ='$tgl_akhir' ");

            $response["roiYtd"]= $row["roi_ytd"];
            $response["status"]=true;
            $response["sql"]=$sql;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getROIKelas() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            $periode = $data['periode'];
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];
            $kode_kelas = $tmp[3];
            if($kode_kelas ==""){
                $kode_kelas = "KAS";
            }else{
                $kode_kelas = $kode_kelas;
            }


            $filter = "where a.tanggal='$tgl_akhir'  and b.tahun='".substr($tgl_akhir,0,4)."' ";

            $sql = "select a.modul,a.roi_persen,b.nama
            from inv_roi_beban a
            left join inv_batas_alokasi b on a.modul=b.kode_kelas
            $filter
            order by b.nu
            ";
            $response['daftar']= dbResultArray($sql);
           
            $sql = "select a.modul,b.nu
            from inv_roi_beban a
            left join inv_batas_alokasi b on a.modul=b.kode_kelas
            $filter and a.modul='$kode_kelas'
            order by b.nu
            ";
            $rs = dbRowArray($sql);
            $response['nu_aktif']=$rs["nu"];
           
            $response["status"]=true;
            $response["sql"]=$sql;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getROIKelasChart() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            $periode = $data['periode'];
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];
            $modul = $tmp[3];

            if($modul == ""){
                $modul = "KAS";
            }else{
                $modul = $modul;
            }

            $warna =array('#007AFF','#FFCC00','#5856d6','#4CD964');
            switch(strtoupper($modul)){
                case 'KAS':
                   $warna2= $warna[1];
                break;
                case 'EBT':
                    
                   $warna2= $warna[0];
                break;
                case 'SB':
                   
                    $warna2= $warna[3];
                break;
                case 'PRO':
                   $warna2= $warna[2];
                break;
            }


            $filter = "where substring(periode,1,4) = '".substr($periode,0,4)."' and modul='$modul' ";

            $sql = "select tanggal as tgl,
            roi_persen as total
            from inv_roi_beban $filter
            order by tanggal
            ";
            $rs=execute($sql);

            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result['roi'][] = array($row->tgl,floatval($row->total));
                }
            }

            $response["data"][0] = array("type"=>"area","name" => 'ROI Kelas', "color"=>$warna2,"data" => $result['roi'],"showInLegend"=>true );
            $response["status"]=true;
            $response["sql"]=$sql;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getROIProduk() {
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

            $filter = "where a.tanggal='$tgl_akhir'  ";

            $sql = "select kode_kelas, nama from inv_batas_alokasi where tahun='".substr($tgl_akhir,0,4)."' order by nu
            ";
            $response['daftar']= dbResultArray($sql);

            $sql2 ="
            select a.kode_subkelas,a.nama as nama_sub,a.kode_kelas as modul,isnull(b.roi_persen,0) as roi_persen
			from inv_subkelas a
            left join inv_roi_subkelas b on a.kode_subkelas=b.kode_subkelas and b.tanggal='$tgl_akhir'
            order by a.nu
            ";
            $response['daftar2']= dbResultArray($sql2);

            $response["status"]=true;
            $response["sql"]=$sql2;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getROIProdukChart() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            $periode = $data['periode'];
            // $tgl_akhir = $tmp[0];
            // $kode_plan = $tmp[1];
            // $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='".$_SESSION['userLog']."'");

            $tgl_akhir = $param["tgl_akhir"];
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];
            $modul = $tmp[3];
            // $subKelas = $tmp[4];

            if($modul == ""){
                $modul = "KAS";
            }else{
                $modul = $modul;
            }
            // if($subKelas == ""){
            //     $subKelas = "DOC";
            // }else{
            //     $subKelas = $subKelas;
            // }

            $warna =array('#007AFF','#FFCC00','#5856d6','#4CD964');
            switch(strtoupper($modul)){
                case 'KAS':
                   $warna2= $warna[1];
                break;
                case 'EBT':
                    
                   $warna2= $warna[0];
                break;
                case 'SB':
                   
                    $warna2= $warna[3];
                break;
                case 'PRO':
                   $warna2= $warna[2];
                break;
            }


            $filter = "where substring(periode,1,4) = '".substr($periode,0,4)."' and modul='$modul'";

            $sql = "select tanggal as tgl,
            roi_persen as total,kode_subkelas
            from inv_roi_subkelas $filter
            order by tanggal,kode_subkelas
            ";
            $rs=execute($sql);

            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result[$row->kode_subkelas][] = array($row->tgl,floatval($row->total));
                }
            }

            $nama = dbResultArray("select nama,kode_subkelas from inv_subkelas where kode_kelas='$modul' order by nu ");

            for($i=0;$i<count($nama);$i++){

                $response["data"][$i] = array("type"=>"area","name" => 'ROI Jenis '.$nama[$i]["nama"], "color"=>$warna2,"data" => $result[$nama[$i]["kode_subkelas"]],"showInLegend"=>true );
            }
            $response["status"]=true;
            $response["sql"]=$sql;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getNamaKelola(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode = $data['kode'];
            $sql = "select nama from inv_kelola where kode_kelola ='$kode' ";
            // $response['sql']=$sql;
            $perusahan = dbResultArray($sql);
            $response["nama"] = $perusahan[0]["nama"];
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    // DASHBOARD YG BARU
    function getBMark() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $tmp = explode("|",$data["param"]);
            $periode = $data['periode'];
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

            $tahun= substr($tgl_akhir,0,4);
            $tahunLalu= intval($tahun)-1;
            $periode = $tahun.substr($tgl_akhir,5,2);
            $periodeLalu = $tahunLalu.substr($tgl_akhir,5,2);



            $warna =array('#FF2D55','#42B9FE','#5856d6','#4CD964');
            

            $filter = "where periode between '".$periodeLalu."' and '$periode' ";

            $sql = "select tanggal as tgl,
            bindo as total
            from inv_bmark $filter
            order by tanggal
            ";
            $rs=execute($sql);

            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result['bindo'][] = array($row->tgl,floatval($row->total));
                }
            }

            $response["data"][0] = array("type"=>"spline","name" => 'BINDO', "color"=>$warna[0],"data" => $result['bindo'],"showInLegend"=>true,"turboThreshold"=>5000 );

            // $filter = "where substring(periode,1,4) = '".substr($periode,0,4)."' ";

            $sql = "select tanggal as tgl,
            idx80 as total
            from inv_bmark $filter
            order by tanggal
            ";
            $rs=execute($sql);

            if($rs->RecordCount() > 0){
                while ($row = $rs->FetchNextObject(false)){
                    $result['jci'][] = array($row->tgl,floatval($row->total));
                }
            }

            $response["data"][1] = array("type"=>"spline","yAxis"=>1,"name" => 'Index 80', "color"=>$warna[1],"data" => $result['jci'],"showInLegend"=>true,"turboThreshold"=>5000 );



            $response["status"]=true;
            $response["sql"]=$sql;
        } else{
            $response["status"]=false;
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function simpanFilterKolom(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $nik_user = $_SESSION['userLog'];
            $exec = array();
            $del = "delete from inv_filter_kolom where kode_lokasi='$kode_lokasi' and nik='$nik_user' ";
            array_push($exec,$del);

            $ins = "insert into inv_filter_kolom (kode_lokasi,kode_kolom,kode_form,isi_kolom,nik,flag_grafik) values ('$kode_lokasi','k1','ALOKASI','".$data['kolom1']."','$nik_user','0') ";
            array_push($exec,$ins);

            $ins2 = "insert into inv_filter_kolom (kode_lokasi,kode_kolom,kode_form,isi_kolom,nik,flag_grafik) values ('$kode_lokasi','k2','ALOKASI','".$data['kolom2']."','$nik_user','0') ";
            array_push($exec,$ins2);

            $ins3 = "insert into inv_filter_kolom (kode_lokasi,kode_kolom,kode_form,isi_kolom,nik,flag_grafik) values ('$kode_lokasi','k3','ALOKASI','".$data['kolom3']."','$nik_user','0') ";
            array_push($exec,$ins3);

            $ins4 = "insert into inv_filter_kolom (kode_lokasi,kode_kolom,kode_form,isi_kolom,nik,flag_grafik) values ('$kode_lokasi','k4','ALOKASI','".$data['kolom4']."','$nik_user','0') ";
            array_push($exec,$ins4);

            
            $rs = executeArray($exec,$err);
            if($err == null){
                $msg= "update filter berhasil";
                $sts = true;
            }else{
                $sts = false;
                $msg= "update filter gagal.".$err;
            }
            $response["exec"] = $exec;
            $response["message"] = $msg;
            $response["status"]=$sts;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        // header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTableAlokasi() {
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

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            // $sql2 = "select max(a.periode) as periode from 
            // inv_kelas_dash where a.kode_plan='$kode_plan'
            // ";
            // $rsta = execute($sql2);
            // $perAkhir = $rsta->fields[0];  
            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            $response = array();

            $tahun= substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode = $tahun.substr($tgl_akhir,5,2);

            $cek = execute("select kode_kolom,isi_kolom,flag_grafik from inv_filter_kolom where kode_lokasi='$kode_lokasi' and nik='$nik_user' and kode_form='ALOKASI' ");
            if($cek->RecordCount() > 0){

                while($r = $cek->FetchNextObject($toupper=false)){
                    $kolom[] = (array) $r;
                }
                // $kol1 = $kolom[0]["isi_kolom"];
                $kol1 = $tahunLalu."12";
                $kol2 = $kolom[1]["isi_kolom"];
                $kol3 = $kolom[2]["isi_kolom"];
                $kol4 = $kolom[3]["isi_kolom"];
            }else{
                $kol1 = '';
                $kol2 = '';
                $kol3 = '';
                $kol4 = '';
            }

            if($kol1 != ""){
                switch(substr($kol1,4,2)){
                    case "Q1" :
                        $select = "round(a.nab_bulan,0) as c1";
                        $fil1 = "where a.periode = '".substr($kol1,0,4)."03' and b.tahun='".substr($kol1,0,4)."' ";
                    break;
                    case "Q2" :
                        $select = "round(a.nab_bulan,0) as c1";
                        $fil1 = "where a.periode = '".substr($kol1,0,4)."06' and b.tahun='".substr($kol1,0,4)."' ";
                    break;
                    case "Q3" :
                        $select = "round(a.nab_bulan,0) as c1";
                        $fil1 = "where a.periode = '".substr($kol1,0,4)."09' and b.tahun='".substr($kol1,0,4)."' ";
                    break;
                    case "Q4" :
                        $select = "round(a.nab_bulan,0) as c1";
                        $fil1 = "where a.periode = '".substr($kol1,0,4)."12' and b.tahun='".substr($kol1,0,4)."' ";
                    break;
                    default :
                        $select = "round(a.nab_bulan,0) as c1";
                        $fil1 = "where a.periode ='$kol1' and b.tahun='".substr($kol1,0,4)."' ";
                    break;
                }

                $response['label1'] = $kol1;
                $sql ="select distinct a.kode_kelas,b.nama, $select,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                $fil1 and a.kode_plan='$kode_plan'
                order by b.nu";
            }else{
                $sql ="select distinct a.kode_kelas,b.nama, round(a.sawal,0) as c1,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                where a.periode ='$periode' and b.tahun='$tahun' and a.kode_plan='$kode_plan'
                order by b.nu";
                
                $response['label1'] = $tahunLalu."12";            

            }

            $response["data1"] = dbResultArray($sql);

            if($kol2 != ""){
                switch(substr($kol2,4,2)){
                    case "Q1" :
                        $select = "round(a.nab_bulan,0) as c2";
                        $fil2 = "where a.periode = '".substr($kol2,0,4)."03' and b.tahun='".substr($kol2,0,4)."' ";
                    break;
                    case "Q2" :
                        $select = "round(a.nab_bulan,0) as c2";
                        $fil2 = "where a.periode = '".substr($kol2,0,4)."06' and b.tahun='".substr($kol2,0,4)."' ";
                    break;
                    case "Q3" :
                        $select = "round(a.nab_bulan,0) as c2";
                        $fil2 = "where a.periode = '".substr($kol2,0,4)."09' and b.tahun='".substr($kol2,0,4)."' ";
                    break;
                    case "Q4" :
                        $select = "round(a.nab_bulan,0) as c2";
                        $fil2 = "where a.periode = '".substr($kol2,0,4)."12' and b.tahun='".substr($kol2,0,4)."' ";
                    break;
                    default :
                        $select = "round(a.nab_bulan,0) as c2";
                        $fil2 = "where a.periode ='$kol2' and b.tahun='".substr($kol2,0,4)."' ";
                    break;
                }
                
                
                $response['label2'] = $kol2;
                $sql2 ="select distinct a.kode_kelas,b.nama, $select,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                $fil2 and a.kode_plan='$kode_plan'
                order by b.nu";
            }else{
                
                $response['label2'] = $tahun."Q1";
                $sql2 ="select distinct a.kode_kelas,b.nama, round(a.nab_bulan,0) as c2,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                where a.periode ='".$tahun."03' and b.tahun='$tahun' and a.kode_plan='$kode_plan'
                order by b.nu";
            }
            $response["data2"] = dbResultArray($sql2);

            if($kol3 != ""){
                switch(substr($kol3,4,2)){
                    case "Q1" :
                        $select = "round(a.nab_bulan,0) as c3";
                        $fil3 = "where a.periode = '".substr($kol3,0,4)."03' and b.tahun='".substr($kol3,0,4)."' ";
                    break;
                    case "Q2" :
                        $select = "round(a.nab_bulan,0) as c3";
                        $fil3 = "where a.periode = '".substr($kol3,0,4)."06' and b.tahun='".substr($kol3,0,4)."' ";
                    break;
                    case "Q3" :
                        $select = "round(a.nab_bulan,0) as c3";
                        $fil3 = "where a.periode = '".substr($kol3,0,4)."09' and b.tahun='".substr($kol3,0,4)."' ";
                    break;
                    case "Q4" :
                        $select = "round(a.nab_bulan,0) as c3";
                        $fil3 = "where a.periode = '".substr($kol3,0,4)."12' and b.tahun='".substr($kol3,0,4)."' ";
                    break;
                    default :
                        $select = "round(a.nab_bulan,0) as c3";
                        $fil3 = "where a.periode ='$kol3' and b.tahun='".substr($kol3,0,4)."' ";
                    break;
                }
                
                $response['label3'] = $kol3;
                $sql3 ="select distinct a.kode_kelas,b.nama, $select,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                $fil3 and a.kode_plan='$kode_plan'
                order by b.nu";
            }else{
                
                $response['label3'] = $tahun."Q2";
                $sql3 ="select distinct a.kode_kelas,b.nama, round(a.nab_bulan,0) as c3,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                where a.periode ='".$tahun."06' and b.tahun='$tahun' and a.kode_plan='$kode_plan'
                order by b.nu";
            }

            $response["data3"] = dbResultArray($sql3);
            
            if($kol4 != ""){
                switch(substr($kol4,4,2)){
                    case "Q1" :
                        $select = "round(a.nab_bulan,0) as c4";
                        $fil4 = "where a.periode = '".substr($kol4,0,4)."03' and b.tahun='".substr($kol4,0,4)."' ";
                    break;
                    case "Q2" :
                        $select = "round(a.nab_bulan),0) as c4";
                        $fil4 = "where a.periode = '".substr($kol4,0,4)."06' and b.tahun='".substr($kol4,0,4)."' ";
                    break;
                    case "Q3" :
                        $select = "round(a.nab_bulan,0) as c4";
                        $fil4 = "where a.periode = '".substr($kol4,0,4)."09' and b.tahun='".substr($kol4,0,4)."' ";
                    break;
                    case "Q4" :
                        $select = "round(a.nab_bulan,0) as c4";
                        $fil4 = "where a.periode = '".substr($kol4,0,4)."12' and b.tahun='".substr($kol4,0,4)."' ";
                    break;
                    default :
                        $select = "round(a.nab_bulan,0) as c4";
                        $fil4 = "where a.periode ='$kol4' and b.tahun='".substr($kol4,0,4)."' ";
                    break;
                }
                
                
                $response['label4'] = $kol4;
                $sql4 ="select distinct a.kode_kelas,b.nama, $select,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                $fil4 and a.kode_plan='$kode_plan'
                order by b.nu";
            }else{
                
                $response['label4'] = $tahun."Q3";
                $sql4 ="select distinct a.kode_kelas,b.nama, round(a.nab_bulan,0) as c4,b.nu
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                where a.periode ='".$tahun."09' and b.tahun='$tahun' and a.kode_plan='$kode_plan'
                order by b.nu";
            }

            $response["data4"] = dbResultArray($sql4);

            $response['label5'] = $periode;
            
            $sqlt="select round(sum(a.sawal),0) as c1,round(sum(a.nab_bulan),0) as nab_now
            from(
            select distinct a.sawal,c.nab as nab_bulan
            from inv_kelas_dash a 
            left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
			left join inv_roi_beban c on a.kode_kelas=c.modul and c.tanggal='$tgl_akhir'
            where a.periode='$periode'  and b.tahun='$tahun' and a.kode_plan='$kode_plan'
            ) a ";
            
            $response["total"] =dbResultArray($sqlt);

            $sql5="select a.kode_kelas,b.nama,round(a.sawal,0) as c1,round(c.nab,0) as nab_now,a.bawah,a.acuan,a.atas,b.nu 
            from inv_kelas_dash a 
            left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
			left join inv_roi_beban c on a.kode_kelas=c.modul and c.tanggal='$tgl_akhir'
            where a.periode = '$periode' and b.tahun='$tahun' and a.kode_plan='$kode_plan'
            order by b.nu";

            $response["data5"] = dbResultArray($sql5);
            $response['series1'] = array();
            $response['series2'] = array();
            // $response['series'] = array();
            
            $c1=0;$c2=0;$c3=0;$c4=0;$sawal=0;
            $i=0;
            foreach($response['data5'] as $row){

                array_push($response['series1'],round(floatval($row["c1"])/1000000000000,2));
                array_push($response['series2'],round(floatval($row["nab_now"])/1000000000000,2));
                $sawal += $row["c1"];
                $c1 += (isset($response["data1"][$i]["c1"]) ? $response["data1"][$i]["c1"] : 0);
                $c2 += (isset($response["data2"][$i]["c2"]) ? $response["data2"][$i]["c2"] : 0);
                $c3 += (isset($response["data3"][$i]["c3"]) ? $response["data3"][$i]["c3"] : 0);
                $c4 += (isset($response["data4"][$i]["c4"]) ? $response["data4"][$i]["c4"] : 0);
                $i++;
            }

            if(count($response['data5']) == 0){

                $monthseb = intval(substr($periode,4,2))-1;
                $monthseb = (strlen($monthseb) == 1 ? "0".$monthseb : $monthseb);
                $tglAkrSeb = date("d", strtotime('-1 second', strtotime('+1 month',strtotime($monthseb . '/01/' . $tahun. ' 00:00:00'))));
                $tgl_akhir_seb = $tahun."-".$monthseb."-".$tglAkrSeb;

                $sql5="select a.kode_kelas,b.nama,round(a.sawal,0) as c1,round(c.nab,0) as nab_now,a.bawah,a.acuan,a.atas,b.nu 
                from inv_kelas_dash a 
                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas and a.kode_plan=b.kode_plan  
                left join inv_roi_beban c on a.kode_kelas=c.modul and c.tanggal='$tgl_akhir_seb'
                where a.periode = '$periode' and b.tahun='$tahun' and a.kode_plan='$kode_plan'
                order by b.nu";

                $response["data6"] = dbResultArray($sql5);
                $c1=0;$c2=0;$c3=0;$c4=0;$sawal=0;
                $i=0;
                $response['series1'] = array();
                foreach($response['data6'] as $row){

                    array_push($response['series1'],round(floatval($row["c1"])/1000000000000,2));
                    $sawal += $row["c1"];
                    $c1 += (isset($response["data1"][$i]["c1"]) ? $response["data1"][$i]["c1"] : 0);
                    $c2 += (isset($response["data2"][$i]["c2"]) ? $response["data2"][$i]["c2"] : 0);
                    $c3 += (isset($response["data3"][$i]["c3"]) ? $response["data3"][$i]["c3"] : 0);
                    $c4 += (isset($response["data4"][$i]["c4"]) ? $response["data4"][$i]["c4"] : 0);
                    $i++;
                }

            }

            $response["total"][0]["sawal"] = $sawal;
            $response["total"][0]["c1"] = $c1;
            $response["total"][0]["c2"] = $c2;
            $response["total"][0]["c3"] = $c3;
            $response["total"][0]["c4"] = $c4;

            array_push($response['series1'],round(floatval($response["total"][0]["sawal"])/1000000000000,2));
            array_push($response['series2'],round(floatval($response["total"][0]["nab_now"])/1000000000000,2));
            $response['sql']=$sql;
            $response['sql2']=$sql2;
            $response['sql3']=$sql3;
            $response['sql4']=$sql4;
            $response['sql5']=$sql5;
            $response['name2']=$periode;
            $response['name1']=$tahunLalu."12";
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

   
    function getRealHasil() {
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
            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);

            $sql3 = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'".substr($periode,0,4)."-".substr($periode,4,2)."-01')+1,0)) ,112),7,2) as tglakhir";
            $tmp = dbRowArray($sql3);
            $akhirBulan = intval($tmp["tglakhir"]);
            
            $sql4 = "select max(periode) as periode from inv_shmspi_m where kode_lokasi='$kode_lokasi' ";
            $tmp2 = dbRowArray($sql4);
            $periode_max = $tmp2["periode"];

            $response['akhir_bulan'] = $akhirBulan;
            $response['periode_max'] = $periode_max;
            $response['periode'] = $periode;
            $response['tgl_akhir'] = intval(substr($tgl_akhir,8,2));
            if(substr($tgl_akhir,0,10) >= "2021-01-01"){
                if((intval(substr($tgl_akhir,8,2)) == $akhirBulan) && (intval($periode) <= intval($periode_max))){
    
                    $sql = "select distinct a.kode_kelas,b.nama,a.rka_pdpt,a.rka_spi, a.rka_pdpt+a.rka_spi as rka_gross,a.rka_beban,(a.rka_pdpt+a.rka_spi)-rka_beban as rka_net,a.pdpt,a.spi,beban,a.pdpt+a.spi-a.beban as net,case when a.rka_pdpt <> 0 then ((a.pdpt-a.rka_pdpt)/abs(a.rka_pdpt)*100)+100 else 0 end as real_pdpt,(((a.beban-a.rka_beban)/abs(a.rka_beban))*100)+100 as real_beban,
                    ((((a.pdpt+a.spi-a.beban)-((rka_pdpt+rka_spi)-rka_beban))/abs((rka_pdpt+rka_spi)-rka_beban))*100)+100 as real_net ,b.nu
                                from inv_kelas_dash a
                                left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas
                                where a.periode='$periode' and b.tahun='$tahun'
                                order by b.nu ";
                }else{
                    $sql = "select distinct a.kode_kelas,b.nama,a.rka_pdpt,a.rka_spi, a.rka_pdpt+a.rka_spi as rka_gross,a.rka_beban,(a.rka_pdpt+a.rka_spi)-rka_beban as rka_net,isnull(p.pdpt,0) as pdpt,isnull(x.spi,0) as spi,isnull(bb.beban_inves,0) as beban,isnull(p.pdpt,0)+isnull(x.spi,0)-isnull(bb.beban_inves,0) as net,case when a.rka_pdpt <> 0 then ((isnull(p.pdpt,0)-a.rka_pdpt)/abs(a.rka_pdpt)*100)+100 else 0 end as real_pdpt,(((isnull(bb.beban_inves,0)-a.rka_beban)/abs(a.rka_beban))*100)+100 as real_beban,
                    ((((isnull(p.pdpt,0)+isnull(x.spi,0)-isnull(bb.beban_inves,0))-((rka_pdpt+rka_spi)-rka_beban))/abs((rka_pdpt+rka_spi)-rka_beban))*100)+100 as real_net ,b.nu
                    from inv_kelas_dash a
                    left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas
                    left join (select a.kode_kelas, round(isnull(sum(b.spi),0),0) as spi
                                from inv_batas_alokasi a
                                left join (
                                
                                    select 'SB' as kode_kelas,isnull(sum(nilai_spi),0) as spi
                                    from inv_saham_kkp 
                                    where tanggal='$tgl_akhir' and kode_plan='$kode_plan'
                                    
                                    union all
                                    
                                    select 'SB' as kode_kelas,isnull(sum(a.nilai_spi)/2,0) as spi
                                    from inv_rd_kkp a 
                                    inner join inv_rd b on a.kode_rd=b.kode_rd
                                    inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp
                                    where a.tanggal='$tgl_akhir' and a.kode_plan='$kode_plan' and c.kode_rdklp='RDCM'
                                    
                                    union all
                                    
                                    select 'EBT' as kode_kelas,isnull(sum(a.nilai_spi)/2,0) as spi
                                    from inv_rd_kkp a 
                                    inner join inv_rd b on a.kode_rd=b.kode_rd
                                    inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp
                                    where a.tanggal='$tgl_akhir' and a.kode_plan='$kode_plan' and c.kode_rdklp='RDCM'
                                    
                                    union all
                                    
                                    select 'KAS' as kode_kelas,isnull(sum(a.nilai_spi),0) as spi
                                    from inv_rd_kkp a 
                                    inner join inv_rd b on a.kode_rd=b.kode_rd
                                    inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp
                                    where a.tanggal='$tgl_akhir' and a.kode_plan='$kode_plan' and c.kode_rdklp='RDPU'
                                    
                                    union all
                                
                                    select 'EBT' as kode_kelas,isnull(sum(a.nilai_spi),0) as spi
                                    from inv_rd_kkp a 
                                    inner join inv_rd b on a.kode_rd=b.kode_rd
                                    inner join inv_rdklp c on b.kode_rdklp=c.kode_rdklp
                                    where a.tanggal='$tgl_akhir' and a.kode_plan='$kode_plan' and c.kode_rdklp not in ('RDCM','RDPU')
                                
                                
                                ) b on a.kode_kelas =b.kode_kelas 
                                
                                
                                where a.tahun ='$tahun'
                                group by a.kode_kelas
                                ) x on a.kode_kelas=x.kode_kelas
                    left join (
                        select modul,round(sum(mi_fee+b_trans+kustodi+jasa_ahli),0) as beban_inves 
                        from inv_roi_beban 
                        where tanggal between substring('$periode',1,4)+'-01-01' and '$tgl_akhir'
                        group by modul
                    ) bb on a.kode_kelas=bb.modul 
                    left join (
                        select x.kode_kelas,sum(x.pdpt) as pdpt
                        from
                        (
                        select a.kode_kelas, a.kode_akun, case when a.kode_akun = '41020310' then sum(case when b.dc = 'H' then b.local_amount else -b.local_amount end)/2 else sum(case when b.dc = 'H' then b.local_amount else -b.local_amount end) end as pdpt
                                    
                        from inv_kelas_akun a 
                        left join exs_glitem b on a.kode_akun=substring(b.glacc,3,10)
                        where a.modul='PDPT' and 
                            substring(b.pstng_date,1,4)+'-'+substring(b.pstng_date,5,2)+'-'+substring(b.pstng_date,7,2)
                            between substring('$periode',1,4)+'01-01' and '$tgl_akhir'
                            group by a.kode_kelas,a.kode_akun
                        ) x		
                        group by x.kode_kelas
                    ) p on a.kode_kelas=p.kode_kelas
                    where a.periode='$periode' and b.tahun='$tahun'
                    order by b.nu";
                } 
                $response['tipe'] = "baru";
            }else{
                $sql = "select distinct a.kode_kelas,b.nama,a.rka_pdpt,a.rka_spi, a.rka_pdpt+a.rka_spi as rka_gross,a.rka_beban,(a.rka_pdpt+a.rka_spi)-rka_beban as rka_net,a.pdpt,a.spi,beban,a.pdpt+a.spi-a.beban as net,case when a.rka_pdpt <> 0 then ((a.pdpt-a.rka_pdpt)/abs(a.rka_pdpt)*100)+100 else 0 end as real_pdpt,(((a.beban-a.rka_beban)/abs(a.rka_beban))*100)+100 as real_beban,
                ((((a.pdpt+a.spi-a.beban)-((rka_pdpt+rka_spi)-rka_beban))/abs((rka_pdpt+rka_spi)-rka_beban))*100)+100 as real_net ,b.nu
                            from inv_kelas_dash a
                            left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas
                            where a.periode='$periode' and b.tahun='$tahun'
                            order by b.nu ";
                
                $response['tipe'] = "lama";
            }

            $response["sql"] = $sql;
            $response["daftar"] = dbResultArray($sql);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getROIReal() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);

            $sql = "select distinct a.kode_kelas,b.nama,a.roi_rka,a.roi_kelas as real_rka,case when a.roi_rka = 0 then 0 else (((a.roi_kelas-a.roi_rka)/abs(a.roi_rka))+1)*100 end as rka_capai,a.roi_bmark,a.roi_kelas as real_bmark,case when a.roi_bmark = 0 then 0 else (((a.roi_kelas-a.roi_bmark)/abs(a.roi_bmark))+1)*100 end as bmark_capai,a.acuan,b.nu
            from inv_kelas_dash a
            left join inv_batas_alokasi b on a.kode_kelas=b.kode_kelas
            where a.periode='$periode' and a.kode_plan='$kode_plan' and b.tahun='$tahun'
            order by b.nu ";

            $response["daftar"] = dbResultArray($sql);

            $sql2 = "select roi_totrka,roi_tot,roi_totbmark
            from  inv_kelas_dash where kode_plan='$kode_plan' and periode='$periode' ";
            $row = dbResultArray($sql2);

            $response["total"] = $row;

            $sql = "select nilai
            from inv_rka a
            where a.kode_kelas='ROITOTAL' and a.modul='ROI' and periode='$periode' and kode_plan='$kode_plan'";
            $response["total_roi"] = dbResultArray($sql);
           
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    // function getPlanAset() {
    //     session_start();
    //     getKoneksi();
    //     $data=$_GET;
    //     if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

    //         $kode_lokasi = $_SESSION['lokasi'];
    //         $nik_user = $_SESSION['userLog'];
    //         $tmp = explode("|",$data["param"]);
    //         $response['lokasi'] = $kode_lokasi;
    //         $response['nik_user'] = $nik_user;
    //         $tgl_akhir = $tmp[0];
    //         $kode_plan = $tmp[1];
    //         $kode_klp = $tmp[2];
    //         $param = dbRowArray("select*from inv_filterdash where nik='919006'");

    //         $tgl_akhir = substr($param["tgl_akhir"],0,10);
    //         $kode_plan = $param["kode_plan"];
    //         $kode_klp = $param["kode_klp"];

    //         if($tgl_akhir == ""){
    //             $tgl_akhir = substr(getTglAkhir(),0,10);
    //         }
    //         if($kode_plan == ""){
    //             $kode_plan = '1';
    //         }
    //         if($kode_klp == ""){
    //             $kode_klp = "5050";
    //         }
    //         $response = array();

    //         $tahun= substr($tgl_akhir,0,4);
    //         $periode = $tahun.substr($tgl_akhir,5,2);
    //         $tahunAwal = intval($tahun)-10;
    //         $tahunAkhir = intval($tahun);

    //         $sql = "with dates_CTE (date) as (
    //             select convert(date,'$tahunAwal-12-31') as date
    //             Union ALL
    //             select DATEADD(month, 1, date)
    //             from dates_CTE
    //             where DATEADD(month, 1, date) < convert(date,'$tahunAkhir-12-31')
    //         )
    //         select distinct substring(convert(varchar,a.date,112),1,6) as periode,isnull(b.persen,0) as persen,isnull(c.nab,0) as nab,isnull(d.jci,0) as jci
    //         from dates_CTE a
    //         left join inv_aktuaria b on substring(convert(varchar,a.date,112),1,6)=b.tahun and b.kode_plan=1 
    //         left join (
    //         select tanggal,nab/1000000000000 as nab,periode,kode_plan from 
    //         inv_roi_total 
    //         where tanggal like '%-12-31'
    //         union all
    //         select tanggal,nab/1000000000000 as nab,periode,kode_plan from 
    //         inv_roi_total 
    //         where tanggal like '$tgl_akhir'
    //         ) c on substring(convert(varchar,a.date,112),1,6)=c.periode and c.kode_plan=1
    //         left join (
    //         select tanggal,ihsg as jci,periode from 
    //         inv_bmark 
    //         where tanggal like '%-12-31'
    //         union all
    //         select tanggal,ihsg as jci,periode from 
    //         inv_bmark 
    //         where tanggal like '$tgl_akhir'
    //         ) d on substring(convert(varchar,a.date,112),1,6)=d.periode 
    //         where (isnull(b.persen,0) <> 0 OR isnull(c.nab,0) <> 0 OR isnull(d.jci,0) <> 0) 
    //         option (maxrecursion 150);
    //         ";

    //         $category = execute($sql);
    //         $response['sql'] = $sql;
    //         $d=array();
    //         $persen = array();
    //         $jci = array();
    //         $nab = array();
    //         $i=0;
    //         while($row = $category->FetchNextObject($toupper=false)){
    //             array_push($d,$row->periode);
    //             array_push($persen,floatval($row->persen));
    //             array_push($jci,floatval($row->jci));
    //             array_push($nab,floatval($row->nab));
    //             $i++;
    //         }

    //         $response["category"] = $d;

    //         $response["series"][0]= array(
    //             "name"=>"Plan Aset", "type"=>"column","color"=>"#66ff33","yAxis"=>1, "data"=>$nab,
    //             "dataLabels" => array("color"=>'black',"verticalAlign"=>"top")
    //         );

    //         $response["series"][1] = array(
    //             "name"=>"JCI", "type"=>"line","color"=>"red","data"=>$jci,
    //             "dataLabels" => array("color"=>'red')
    //         );

    //         $response["series"][2]= array(
    //             "name"=>"Kewajiban Aktuaria", "yAxis"=>1,"type"=>"line","color"=>"#4274FE","data"=>$persen,
    //             "dataLabels" => array("color"=>'#4274FE')
    //         );  

    //         $sql = "select * from inv_aktuaria where kode_plan='$kode_plan' and tahun between '".$tahunAwal."12' and '$periode' order by tahun";
    //         $response['sql2'] = $sql;

    //         $res2 = execute($sql);
            
    //         $data_table = array();
    //         // // $df = array();
    //         // // $rkd = array();

    //         while($row=$res2->FetchNextObject($toupper=false)){
    //             // array_push($df,$row->df);
    //             // array_push($rkd,$row->rkd); 
    //             $data_table[] = (array)$row;  
    //         }

           
    //         // $response['df'] =$df;
    //         // $response['rkd'] =$rkd;  
    //         $response['data_table'] = $data_table;    
           
           
    //     } else{
    //         $response["message"] = "Unauthorized Access, Login Required";
    //     }     
    //     $response["status"]=true; 
    //     header('Content-Type: application/json');
    //     echo json_encode($response);
    // }


    function getPlanAset() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunAwal = intval($tahun)-10;
            $tahunAkhir = intval($tahun)-1;

            $sql = "
            with  CTE as
                    (
                    select  datepart(year, '$tahunAwal-12-31') as yr
                    union all
                    select  yr +1
                    from    CTE
                    where   yr < datepart(year, '$tahunAkhir-12-31')
                    )
            select  convert(varchar(4),yr) as yr
            from    CTE
            union all
            select convert(varchar(3),DATENAME(month, '$tgl_akhir'))+'-'+substring(convert(varchar(4),year('$tgl_akhir')),3,2) as yr
            --union all
            --select 'Q1-'+substring(convert(varchar(4),year('$tgl_akhir')),3,2) as yr
            --union all
            --select 'Q2-'+substring(convert(varchar(4),year('$tgl_akhir')),3,2) as yr
            --union all
            --select 'Q3-'+substring(convert(varchar(4),year('$tgl_akhir')),3,2) as yr
            --union all
            
            ";

            $category = execute($sql);
            $d=array();
            $tgl = array();
            $i=0;
            while($row = $category->FetchNextObject($toupper=false)){
                array_push($d,$row->yr);
                if($i==10){
                    // array_push($tgl,$tahun.'-03-31');
                    array_push($tgl,$tgl_akhir);
                }
                // else if($i==10){
                //     array_push($tgl,$tahun.'-06-30');
                // }else if($i==11){
                //     array_push($tgl,$tahun.'-09-30');
                // }else if($i==12){
                //     array_push($tgl,$tgl_akhir);
                // }
                else{
                    array_push($tgl,$row->yr.'-12-31');
                }
                $i++;
            }

            $response["category"] = $d;

            $sql2 = "
            select 'plan' as kode,
                   sum(case when tanggal = '".$tgl[0]."' then nab/1000000000000 else 0 end) as n1,
                   sum(case when tanggal = '".$tgl[1]."' then nab/1000000000000 else 0 end) as n2,
                   sum(case when tanggal = '".$tgl[2]."' then nab/1000000000000 else 0 end) as n3,
                   sum(case when tanggal = '".$tgl[3]."' then nab/1000000000000 else 0 end) as n4,
                   sum(case when tanggal = '".$tgl[4]."' then nab/1000000000000 else 0 end) as n5,
                   sum(case when tanggal = '".$tgl[5]."' then nab/1000000000000 else 0 end) as n6,
                   sum(case when tanggal = '".$tgl[6]."' then nab/1000000000000 else 0 end) as n7,
                   sum(case when tanggal = '".$tgl[7]."' then nab/1000000000000 else 0 end) as n8,
                   sum(case when tanggal = '".$tgl[8]."' then nab/1000000000000 else 0 end) as n9,
                   sum(case when tanggal = '".$tgl[9]."' then nab/1000000000000 else 0 end) as n10,
                   sum(case when tanggal = '".$tgl[10]."' then nab/1000000000000 else 0 end) as n13
            from inv_roi_total
            where kode_plan='$kode_plan'
            union all
            select 'jci' as kode,
                sum(case when tanggal = '".$tgl[0]."' then ihsg else 0 end) as n1,
                sum(case when tanggal = '".$tgl[1]."' then ihsg else 0 end) as n2,
                sum(case when tanggal = '".$tgl[2]."' then ihsg else 0 end) as n3,
                sum(case when tanggal = '".$tgl[3]."' then ihsg else 0 end) as n4,
                sum(case when tanggal = '".$tgl[4]."' then ihsg else 0 end) as n5,
                sum(case when tanggal = '".$tgl[5]."' then ihsg else 0 end) as n6,
                sum(case when tanggal = '".$tgl[6]."' then ihsg else 0 end) as n7,
                sum(case when tanggal = '".$tgl[7]."' then ihsg else 0 end) as n8,
                sum(case when tanggal = '".$tgl[8]."' then ihsg else 0 end) as n9,
                sum(case when tanggal = '".$tgl[9]."' then ihsg else 0 end) as n10,
                sum(case when tanggal = '".$tgl[10]."' then ihsg else 0 end) as n13
            from inv_bmark
            union all
            select 'kewajiban' as kode,
                sum(case when tahun = '".$d[0]."12' then persen else 0 end) as n1,
                sum(case when tahun = '".$d[1]."12' then persen else 0 end) as n2,
                sum(case when tahun = '".$d[2]."12' then persen else 0 end) as n3,
                sum(case when tahun = '".$d[3]."12' then persen else 0 end) as n4,
                sum(case when tahun = '".$d[4]."12' then persen else 0 end) as n5,
                sum(case when tahun = '".$d[5]."12' then persen else 0 end) as n6,
                sum(case when tahun = '".$d[6]."12' then persen else 0 end) as n7,
                sum(case when tahun = '".$d[7]."12' then persen else 0 end) as n8,
                sum(case when tahun = '".$d[8]."12' then persen else 0 end) as n9,
                sum(case when tahun = '".$d[9]."12' then persen else 0 end) as n10,
                sum(case when tahun = '".$periode."' then persen else 0 end) as n13
            from inv_aktuaria
            where kode_plan='$kode_plan'
            ";

            $res = execute($sql2);
            $dt[0] = array();
            $dt[1] = array();
            $dt[2] = array();
            $i=0;
            while($row = $res->FetchNextObject($toupper=false)){
                
                array_push($dt[$i],floatval($row->n1));
                array_push($dt[$i],floatval($row->n2));
                array_push($dt[$i],floatval($row->n3));
                array_push($dt[$i],floatval($row->n4));
                array_push($dt[$i],floatval($row->n5));
                array_push($dt[$i],floatval($row->n6));
                array_push($dt[$i],floatval($row->n7));
                array_push($dt[$i],floatval($row->n8));
                array_push($dt[$i],floatval($row->n9));
                array_push($dt[$i],floatval($row->n10));
                array_push($dt[$i],floatval($row->n13));
                // if($row->kode != "kewajiban"){

                //     // array_push($dt[$i],floatval($row->n10));
                //     // array_push($dt[$i],floatval($row->n11));
                //     // array_push($dt[$i],floatval($row->n12));
                // }
                $i++;
            }
            
            $response["series"][0]= array(
                "name"=>"Plan Aset", "type"=>"column","color"=>"#66ff33","yAxis"=>1, "data"=>$dt[0],
                "dataLabels" => array("color"=>'black',"verticalAlign"=>"top")
            );

            $response["series"][1] = array(
                "name"=>"JCI", "type"=>"line","color"=>"red","data"=>$dt[1],
                "dataLabels" => array("color"=>'red')
            );

            $response["series"][2]= array(
                "name"=>"Kewajiban Aktuaria", "yAxis"=>1,"type"=>"line","color"=>"#4274FE","data"=>$dt[2],
                "dataLabels" => array("color"=>'#4274FE')
            );  

            // $sql = "select * from inv_aktuaria where kode_plan='$kode_plan' and tahun between '".$tahunAwal."12' and '".$periode."' order by tahun";
            $sql = "select * from inv_aktuaria where tahun not like '$tahun%' and substring(tahun,5,2)='12'
            union 
            select * from inv_aktuaria where tahun = '$periode' 
            order by tahun ";
            $res2 = execute($sql);
            
            $df = array();
            $rkd = array();
            while($row=$res2->FetchNextObject($toupper=false)){
                array_push($df,$row->df);
                array_push($rkd,$row->rkd);   
            }
            $response['df'] =$df;
            $response['rkd'] =$rkd;        
           
           
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getKinerja() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunAwal = intval($tahun)-9;
            $tahunAkhir = intval($tahun)-1;

            $sql = "select kode_kelas,roi_bmark from inv_kelas_dash where periode ='$periode' and kode_kelas='SB' and kode_plan='$kode_plan'";
            $response['sql']=$sql;
            $jci = execute($sql);


            $sql = " select * from (
            select a.kode_kelola as kode,b.nama,a.nab/1000000000 as nab,a.roi_persen 
            from inv_sahammi_kkp a 
            left join inv_kelola b on a.kode_kelola=b.kode_kelola
            where a.periode ='$periode' and a.tanggal ='$tgl_akhir' and a.kode_plan='$kode_plan'
            union all
            select a.kode_rd as kode,a.nama,round(b.jumlah*h_wajar,0)/1000000000 as nab,b.roi_persen 
            from inv_rd a
            inner join inv_rd_kkp b on a.kode_rd=b.kode_rd and b.kode_plan='$kode_plan' and b.tanggal='$tgl_akhir'
            where a.kode_rdklp in ('RDSH') and round(b.jumlah*h_wajar,0)>0 
            ) a order by a.roi_persen desc
            ";

            $res = execute($sql);
            $dt[0] = array();
            $dt[1] = array();
            $dt[2] = array();
            $category = array();
            $i=0;
            while($row = $res->FetchNextObject($toupper=false)){
                
                array_push($dt[0],floatval($row->nab));
                array_push($dt[1],floatval($row->roi_persen));
                array_push($dt[2],floatval($jci->fields[1]));
                array_push($category,$row->nama);
                
                $i++;
            }

            // $sql = "select a.kode_rd as kode,a.nama,round(b.jumlah*h_wajar,0)/1000000000 as nab,b.roi_persen 
            // from inv_rd a
            // inner join inv_rd_kkp b on a.kode_rd=b.kode_rd and b.kode_plan='$kode_plan' and b.tanggal='$tgl_akhir'
            // where a.kode_rdklp='RDSH' and round(b.jumlah*h_wajar,0)>0 order by b.roi_persen desc ";
            
            // $res2 = execute($sql);
            // while($row = $res2->FetchNextObject($toupper=false)){
                
            //     array_push($dt[0],floatval($row->nab));
            //     array_push($dt[1],floatval($row->roi_persen));
            //     array_push($dt[2],floatval($jci->fields[1]));
            //     array_push($category,$row->nama);
            //     $i++;
            // }

            $response["series"][0]= array(
                "name"=> 'Nilai Wajar', "type"=>'column',"colorByPoint"=>true,"data"=>$dt[0],"dataLabels"=> array(
                    "color"=> 'black',
                    "verticalAlign"=>'top',
                )           
            );

            $response["series"][1] = array(
                "name"=> 'Kinerja', "type"=>'line',"color"=>'blue',"yAxis"=>1,"data"=>$dt[1],"dataLabels"=> array(
                    "color"=> 'blue',
                )   
            );

            $response["series"][2]= array(
                "name"=> 'Idx80', "type"=>'spline',"color"=>'red',"yAxis"=>1,"data"=>$dt[2],"dashStyle"=>'dash',"dataLabels"=> array(
                    "color"=> 'red',
                )   
            );  

            $response['category']= $category;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKinerjaETF() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunAwal = intval($tahun)-9;
            $tahunAkhir = intval($tahun)-1;

            $sql = "select kode_kelas,roi_bmark from inv_kelas_dash where periode ='$periode' and kode_kelas='SB' and kode_plan='$kode_plan'";
            $response['sql']=$sql;
            $jci = execute($sql);


            $sql = " select * from (
            select a.kode_rd as kode,a.nama,round(b.jumlah*h_wajar,0)/1000000000 as nab,b.roi_persen 
            from inv_rd a
            inner join inv_rd_kkp b on a.kode_rd=b.kode_rd and b.kode_plan='$kode_plan' and b.tanggal='$tgl_akhir'
            where a.kode_rdklp in ('RETF') and round(b.jumlah*h_wajar,0)>0 
            ) a order by a.roi_persen desc
            ";

            $res = execute($sql);
            $dt[0] = array();
            $dt[1] = array();
            $dt[2] = array();
            $category = array();
            $i=0;
            while($row = $res->FetchNextObject($toupper=false)){
                
                array_push($dt[0],floatval($row->nab));
                array_push($dt[1],floatval($row->roi_persen));
                array_push($dt[2],floatval($jci->fields[1]));
                array_push($category,$row->nama);
                
                $i++;
            }

            // $sql = "select a.kode_rd as kode,a.nama,round(b.jumlah*h_wajar,0)/1000000000 as nab,b.roi_persen 
            // from inv_rd a
            // inner join inv_rd_kkp b on a.kode_rd=b.kode_rd and b.kode_plan='$kode_plan' and b.tanggal='$tgl_akhir'
            // where a.kode_rdklp='RDSH' and round(b.jumlah*h_wajar,0)>0 order by b.roi_persen desc ";
            
            // $res2 = execute($sql);
            // while($row = $res2->FetchNextObject($toupper=false)){
                
            //     array_push($dt[0],floatval($row->nab));
            //     array_push($dt[1],floatval($row->roi_persen));
            //     array_push($dt[2],floatval($jci->fields[1]));
            //     array_push($category,$row->nama);
            //     $i++;
            // }

            $response["series"][0]= array(
                "name"=> 'Nilai Wajar', "type"=>'column',"colorByPoint"=>true,"data"=>$dt[0],"dataLabels"=> array(
                    "color"=> 'black',
                    "verticalAlign"=>'top',
                )           
            );

            $response["series"][1] = array(
                "name"=> 'Kinerja', "type"=>'line',"color"=>'blue',"yAxis"=>1,"data"=>$dt[1],"dataLabels"=> array(
                    "color"=> 'blue',
                )   
            );

            $response["series"][2]= array(
                "name"=> 'Idx80', "type"=>'spline',"color"=>'red',"yAxis"=>1,"data"=>$dt[2],"dashStyle"=>'dash',"dataLabels"=> array(
                    "color"=> 'red',
                )   
            );  

            $response['category']= $category;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKinerjaBindo() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunAwal = intval($tahun)-9;
            $tahunAkhir = intval($tahun)-1;
            

            $sql = "select kode_kelas,roi_bmark from inv_kelas_dash where periode ='$periode' and kode_kelas='EBT' and kode_plan='$kode_plan'";
            $response['sql']=$sql;
            $bindo = execute($sql);


            $sql = "select a.kode_rd,a.nama,round(b.jumlah*h_wajar,0)/1000000000 as nab,b.roi_persen from inv_rd a
            inner join inv_rd_kkp b on a.kode_rd=b.kode_rd and b.kode_plan='$kode_plan' and b.tanggal='$tgl_akhir'
            where a.kode_rdklp='RDPD' and round(b.jumlah*h_wajar,0)>0
            order by b.roi_persen desc
            ";

            $res = execute($sql);
            $dt[0] = array();
            $dt[1] = array();
            $dt[2] = array();
            $category = array();
            $i=0;
            while($row = $res->FetchNextObject($toupper=false)){
                
                array_push($dt[0],floatval($row->nab));
                array_push($dt[1],floatval($row->roi_persen));
                array_push($dt[2],floatval($bindo->fields[1]));
                array_push($category,$row->nama);
                $i++;
            }

            $response["series"][0]= array(
                "name"=> 'Nilai Wajar', "type"=>'column',"colorByPoint"=>true,"data"=>$dt[0],"dataLabels"=> array(
                    "color"=> 'black',
                    "verticalAlign"=>'top',
                )           
            );

            $response["series"][1] = array(
                "name"=> 'Kinerja', "type"=>'line',"color"=>'blue',"yAxis"=>1,"data"=>$dt[1],"dataLabels"=> array(
                    "color"=> 'blue',
                )   
            );

            $response["series"][2]= array(
                "name"=> 'Bindo', "type"=>'spline',"color"=>'red',"yAxis"=>1,"data"=>$dt[2],"dashStyle"=>'dash',"dataLabels"=> array(
                    "color"=> 'red',
                )   
            );  

            $response['category']= $category;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKinerjaBMark() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunAwal = intval($tahun)-9;
            $tahunAkhir = intval($tahun)-1;

            $sql = "select kode_kelas,roi_bmark from inv_kelas_dash where periode ='$periode' and kode_kelas='SB' and kode_plan='$kode_plan'";
            $response['sql']=$sql;
            $jci = execute($sql);

            $sql = "select kode_kelas,roi_bmark from inv_kelas_dash where periode ='$periode' and kode_kelas='EBT' and kode_plan='$kode_plan'";
            $response['sql']=$sql;
            $bindo = execute($sql);

            if($kode_klp == "5050"){

                $bagi1 = 50/100; 
                $bagi2 = 50/100; 
            }else if($kode_klp == "3070"){
                $bagi1 = 30/100; 
                $bagi2 = 70/100; 
            }

            $bc = (floatval($jci->fields[1])*$bagi1) + (floatval($bindo->fields[1])*$bagi2); 


            $sql = "select a.kode_rd,a.nama,round(b.jumlah*h_wajar,0)/1000000000 as nab,b.roi_persen from inv_rd a
            inner join inv_rd_kkp b on a.kode_rd=b.kode_rd and b.kode_plan='$kode_plan' and b.tanggal='$tgl_akhir'
            where a.kode_rdklp='RDCM' and round(b.jumlah*h_wajar,0)>0
            order by b.roi_persen desc
            ";

            $res = execute($sql);
            $dt[0] = array();
            $dt[1] = array();
            $dt[2] = array();
            $category = array();
            $i=0;
            while($row = $res->FetchNextObject($toupper=false)){
                
                array_push($dt[0],floatval($row->nab));
                array_push($dt[1],floatval($row->roi_persen));
                array_push($dt[2],floatval($bc));
                array_push($category,$row->nama);
                
                $i++;
            }
            // for($i=0;$i<3;$i++){
            //     array_push($dt[2],0);
            // }

            $response["series"][0]= array(
                "name"=> 'Nilai Wajar', "type"=>'column',"colorByPoint"=>true,"data"=>$dt[0],"dataLabels"=> array(
                    "color"=> 'black',
                    "verticalAlign"=>'top',
                )           
            );

            $response["series"][1] = array(
                "name"=> 'Kinerja', "type"=>'line',"color"=>'blue',"yAxis"=>1,"data"=>$dt[1],"dataLabels"=> array(
                    "color"=> 'blue',
                )   
            );

            $response["series"][2]= array(
                "name"=> 'Benchmark RD Campuran', "type"=>'spline',"color"=>'red',"yAxis"=>1,"data"=>$dt[2],"dashStyle"=>'dash',"dataLabels"=> array(
                    "color"=> 'red',
                )   
            );  

            $response['category']= $category;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getCashOut() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunAwal = intval($tahun)-9;
            $tahunAkhir = intval($tahun)-1;

            $par = "b1";
            $pas = intval(substr($periode,4,2))+1;
            for($i=2;$i<$pas;$i++){
                    $par.="+b$i";
            }


            $sql = "select sum(case when jenis='BINVES' then $par else 0 end ) as binves,
            sum(case when jenis='BKES' then $par else 0 end ) as bkes,
            sum(case when jenis='CAPEX' then $par else 0 end ) as capex, 
            sum(case when jenis='CC' then $par else 0 end ) as cc, 
            sum(case when jenis='OPEX' then $par else 0 end ) as opex, 
            sum(case when jenis='PDPT' then $par else 0 end ) as pdpt,
            sum(case when jenis='SPI' then $par else 0 end ) as spi    
            from inv_beban_inves
            where tahun='$tahun'
            ";

            $res = dbResultArray($sql);
            
            $response['daftar']=$res;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getGlobalIndex(){
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
            $tahun = substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode2 = $tahun.substr($tgl_akhir,5,2);
            $periode1 = $tahunLalu."12";
            $bulan = substr($periode2,4,2);

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $sql = "
                select distinct kode_bmark, nama, nu,sum(case when periode = '$periode1' then nilai else 0 end ) as nilai1,sum(case when periode = '$periode2' then nilai else 0 end ) as nilai2 
                from inv_index_d
                where kode_lokasi='$kode_lokasi' and jenis_index='GLOBAL' and periode like '$tahun%'
                group by kode_bmark,nama,nu
                order by nu ";
            $res = dbResultArray($sql);
            $response["daftar"] = $res;
            
            $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'$tahun-$bulan-01')+1,0)) ,112),7,2) as tglakhir ";
            $cek = execute($sql);
            if($cek->RecordCount()>0){
                $tgl = $tahun."-".$bulan."-".$cek->fields[0];
                $sql = "select idx80 as ihsg,dwjg,sgc,hsi,nikkei,lq45 from inv_bmark where tanggal ='$tahunLalu-12-31' ";
                $response['nil1'] = dbResultArray($sql);
                $sql = "select idx80 as ihsg,dwjg,sgc,hsi,nikkei,lq45 from inv_bmark where tanggal ='$tgl' ";
                $response['nil2'] = dbResultArray($sql);
            }

            $response['sql']=$sql;



        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBondIndex(){
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
            $tahun = substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode2 = $tahun.substr($tgl_akhir,5,2);
            $periode1 = $tahunLalu."12";
            
            $bulan = substr($periode2,4,2);

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $sql = "select distinct kode_bmark, negara,nama, nu,sum(case when periode = '$periode1' then nilai else 0 end ) as nilai1,sum(case when periode = '$periode2' then nilai else 0 end ) as nilai2 
            from inv_index_d
            where kode_lokasi='$kode_lokasi' and jenis_index='BOND' 
            group by kode_bmark,negara,nama,nu
            order by nu ";
            $res = dbResultArray($sql);
            $response["daftar"] = $res;

            $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'$tahun-$bulan-01')+1,0)) ,112),7,2) as tglakhir ";
            $cek = execute($sql);
            if($cek->RecordCount()>0){
                $tgl = $tahun."-".$bulan."-".$cek->fields[0];
                $sql = "select yy10ind,yy10us,yy10jp from inv_bmark where tanggal ='$tahunLalu-12-31' ";
                $response['nil1'] = dbResultArray($sql);
                $sql = "select yy10ind,yy10us,yy10jp from inv_bmark where tanggal ='$tgl' ";
                $response['nil2'] = dbResultArray($sql);
            }


        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getKatalis(){
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
            $tahun = substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode = $tahun.substr($tgl_akhir,5,2);

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $sql = "
            select a.katalis_positif,a.katalis_negatif 
            from inv_issue_d a
            inner join inv_issue_m b on a.id=b.id and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.jenis='Global'
             ";
            $res = dbResultArray($sql);
            $response["global"] = $res;
            
            $sql2 = "
            select a.katalis_positif,a.katalis_negatif 
            from inv_issue_d a
            inner join inv_issue_m b on a.id=b.id and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.jenis='Domestik'
             ";
            $res2 = dbResultArray($sql2);
            $response["domestik"] = $res2;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function updateTgl(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $nik= $_SESSION['userLog'];
            $exec = array();
            $sql = "select * from inv_filterdash where nik='$nik' ";
            $res = execute($sql);
            if($res->RecordCount()>0){
                $upd = "update inv_filterdash set tgl_akhir='".$data['tgl']."' where nik='$nik' ";
                array_push($exec,$upd);
            }else{
                $ins = "insert into inv_filterdash (tgl_akhir,kode_klp,kode_plan,nik,kode_lokasi)
                values ('".$data['tgl']."','5050','1','$nik','$kode_lokasi')  ";
                array_push($exec,$ins);
            }
            $rs = executeArray($exec,$err);
            if($err == null){
                $msg= "update tanggal berhasil";
                $sts = true;
            }else{
                $sts = false;
                $msg= "update tanggal gagal.".$err;
            }
            $response["exec"] = $exec;
            $response["message"] = $msg;
            $response["status"]=$sts;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        // header('Content-Type: application/json');
        echo json_encode($response);
    }

    function updateParam(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $nik= $_SESSION['userLog'];
            $exec = array();
            $sql = "select * from inv_filterdash where nik='$nik' ";
            $tgl_akhir = getTglAkhir();
            $res = execute($sql);
            if($res->RecordCount()>0){
                $upd = "update inv_filterdash set kode_klp='".$data['kode_klp']."',kode_plan='".$data['kode_plan']."' where nik='$nik' ";
                array_push($exec,$upd);
            }else{
                $ins = "insert into inv_filterdash (tgl_akhir,kode_klp,kode_plan,nik,kode_lokasi)
                values ('".$tgl_akhir."','".$data['kode_klp']."','".$data['kode_plan']."','$nik','$kode_lokasi')  ";
                array_push($exec,$ins);
            }
            $rs = executeArray($exec,$err);
            if($err == null){
                $msg= "update filter berhasil";
                $sts = true;
            }else{
                $sts = false;
                $msg= "update filter gagal.".$err;
            }
            $response["exec"] = $exec;
            $response["message"] = $msg;
            $response["status"]=$sts;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"]=false; 
        }     
        // header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTenor(){
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
            $tahun = substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode = $tahun.substr($tgl_akhir,5,2);

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            // $sql = "select z.kode_tenor,z.fair_sum,z.fair_sum / (sum(z.fair_sum) over (partition by null) ) * 100 as persen
            // from 
            // (
            
            // select f.kode_tenor,f.bawah,sum(isnull(h.h_wajar,100) * x.fair_sum) / 100 as fair_sum
            // from 
            // (
            // select a.kode_jenis,sum(a.nilai-isnull(b.jual,0))  as fair_sum
            // from 
            //     (	
            //         select a.kode_rdkelola,a.kode_jenis,sum(a.nilai)  as nilai 
            //         from inv_obli_d a inner join inv_oblibeli_m b on a.no_beli=b.no_beli
            //         where b.tanggal<='$tgl_akhir'
            //         group by a.kode_rdkelola,a.kode_jenis 
            //     ) a 
                    
            //     left join 
            //     (
            //         select b.kode_rdkelola,a.kode_jenis,sum(a.n_oleh) as jual  
            //         from inv_oblijual_d a  inner join inv_oblijual_m b on a.no_oblijual=b.no_oblijual 
            //         where b.tanggal<='$tgl_akhir'
            //         group by b.kode_rdkelola,a.kode_jenis 
            //     ) b on a.kode_rdkelola=b.kode_rdkelola and a.kode_jenis=b.kode_jenis 
            
            // where a.kode_rdkelola like '%' 
            // group by a.kode_jenis
            // ) x 
            
            // inner join inv_oblijenis c on x.kode_jenis=c.kode_jenis
            // inner join inv_obli_tenor f on round(cast (datediff(day,'$tgl_akhir',c.tgl_selesai) as float) / 360,2) between f.bawah and f.atas
            
            // left join (select kode_jenis,h_wajar 
            //             from inv_obli_harga where tanggal='$tgl_akhir'
            //             ) h on c.kode_jenis=h.kode_jenis
            
            // group by f.kode_tenor,f.bawah
            
            // ) z  
            // order by z.bawah ";
            $sql = "select z.kode_tenor,z.fair_sum,z.fair_sum / (sum(z.fair_sum) over (partition by null) ) * 100 as persen
            from 
            (
            
            select f.kode_tenor,f.bawah,sum(isnull(h.h_wajar,100) * x.fair_sum) / 100 as fair_sum
            from 
            (
            select a.kode_jenis,sum(a.nilai-isnull(b.jual,0))  as fair_sum
            from 
                (	
                    select a.kode_rdkelola,a.kode_jenis,sum(a.nilai)  as nilai 
                    from inv_obli_d a inner join inv_oblibeli_m b on a.no_beli=b.no_beli
                    where b.tanggal<='$tgl_akhir'
                    group by a.kode_rdkelola,a.kode_jenis 
                ) a 
                    
                left join 
                (
                    select b.kode_rdkelola,a.kode_jenis,sum(a.n_oleh) as jual  
                    from inv_oblijual_d a  inner join inv_oblijual_m b on a.no_oblijual=b.no_oblijual 
                    where b.tanggal<='$tgl_akhir'
                    group by b.kode_rdkelola,a.kode_jenis 
                ) b on a.kode_rdkelola=b.kode_rdkelola and a.kode_jenis=b.kode_jenis 
            
            where a.kode_rdkelola like '%' 
            group by a.kode_jenis
            ) x 
            
            inner join inv_oblijenis c on x.kode_jenis=c.kode_jenis
            inner join inv_obli_tenor f on round(cast (datediff(day,'$tgl_akhir',c.tgl_selesai) as float) / 360,2) > f.bawah and round(cast (datediff(day,'$tgl_akhir',c.tgl_selesai) as float) / 360,2) <= f.atas
            
            left join (select kode_jenis,h_wajar 
                        from inv_obli_harga where tanggal='$tgl_akhir'
                        ) h on c.kode_jenis=h.kode_jenis
            
            group by f.kode_tenor,f.bawah
            
            ) z  
            order by z.bawah ";
            $res = execute($sql);
            $ctg = array();
            $dt = array();
            while($row = $res->FetchNextObject($toupper)){
                $ctg[] = $row->kode_tenor;
                $dt[] = array("y"=>floatval($row->persen),"nil"=>floatval($row->fair_sum),"key"=>$row->kode_tenor);
            }
            
            $response['ctg'] = $ctg;
            $response['series'][0] = array("name"=>"Tenor","data"=>$dt,"color"=>"#ffcc00");

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKomposisi(){
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
            $tahun = substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode = $tahun.substr($tgl_akhir,5,2);

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $sql = "select i.jenis,sum(isnull(h.h_wajar,100) * x.fair_sum) / 100 as fair_sum
            from 
            (
            select a.kode_jenis,sum(a.nilai-isnull(b.jual,0))  as fair_sum
            from 
                (	
                    select a.kode_rdkelola,a.kode_jenis,sum(a.nilai)  as nilai 
                    from inv_obli_d a inner join inv_oblibeli_m b on a.no_beli=b.no_beli
                    where b.tanggal<='$tgl_akhir'
                    group by a.kode_rdkelola,a.kode_jenis 
                ) a 
                    
                left join 
                (
                    select b.kode_rdkelola,a.kode_jenis,sum(a.n_oleh) as jual  
                    from inv_oblijual_d a  inner join inv_oblijual_m b on a.no_oblijual=b.no_oblijual 
                    where b.tanggal<='$tgl_akhir'
                    group by b.kode_rdkelola,a.kode_jenis 
                ) b on a.kode_rdkelola=b.kode_rdkelola and a.kode_jenis=b.kode_jenis 
            
            where a.kode_rdkelola like '%' 
            group by a.kode_jenis
            ) x 
            
            inner join inv_oblijenis c on x.kode_jenis=c.kode_jenis
            inner join inv_obligor i on i.kode_obligor=c.kode_obligor
            left join (select kode_jenis,h_wajar 
                        from inv_obli_harga where tanggal='$tgl_akhir'
                        ) h on c.kode_jenis=h.kode_jenis
            
            group by i.jenis ";
            $res = execute($sql);
            
            $color = array('#007AFF', '#FFCC00', '#4CD964', '#9F9F9F', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1');
            $dt = array();
            
            $i=0;$total=0;
            while($row = $res->FetchNextObject($toupper)){
                $dt[] = array("name"=>$row->jenis,"y"=>floatval($row->fair_sum),"color"=>$color[$i]);
                $i++;
                $total+=floatval($row->fair_sum);
            }
            $response['total']=$total;
            $response['series'][0] = array("name"=>"Komposisi","data"=>$dt);

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getRating(){
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
            $tahun = substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode = $tahun.substr($tgl_akhir,5,2);

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            $sql = "select j.nu,e.kategori,sum(isnull(h.h_wajar,100) * x.fair_sum) as fair_price, sum(isnull(h.h_wajar,100) * x.fair_sum) / 100 as fair_sum
            from 
            (
            select a.kode_jenis,sum(a.nilai-isnull(b.jual,0))  as fair_sum
            from 
                (	
                    select a.kode_rdkelola,a.kode_jenis,sum(a.nilai)  as nilai 
                    from inv_obli_d a inner join inv_oblibeli_m b on a.no_beli=b.no_beli
                    where b.tanggal<='$tgl_akhir'
                    group by a.kode_rdkelola,a.kode_jenis 
                ) a 
                    
                left join 
                (
                    select b.kode_rdkelola,a.kode_jenis,sum(a.n_oleh) as jual  
                    from inv_oblijual_d a  inner join inv_oblijual_m b on a.no_oblijual=b.no_oblijual 
                    where b.tanggal<='$tgl_akhir'
                    group by b.kode_rdkelola,a.kode_jenis 
                ) b on a.kode_rdkelola=b.kode_rdkelola and a.kode_jenis=b.kode_jenis 
            
            where a.kode_rdkelola like '%' 
            group by a.kode_jenis
            ) x 
            
            inner join inv_oblijenis c on x.kode_jenis=c.kode_jenis
            inner join inv_obli_rating e on c.kode_rating=e.kode_rating
            inner join inv_obli_ratingkat j on e.kategori=j.kategori
            
            left join (select kode_jenis,h_wajar 
                        from inv_obli_harga where tanggal='$tgl_akhir'
                        ) h on c.kode_jenis=h.kode_jenis
            group by e.kategori,j.nu
			having (sum(isnull(h.h_wajar,100) * x.fair_sum) / 100) <> 0
            order by j.nu";
            $res = execute($sql);
            $color = array('#007AFF', '#FFCC00', '#4CD964', '#9F9F9F', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1');
            $dt = array();
            
            $i=0;$tot=0;
            while($row = $res->FetchNextObject($toupper)){
                $dt[] = array("name"=>$row->kategori,"y"=>floatval($row->fair_sum),"fair_price"=>floatval($row->fair_price),"color"=>$color[$i]);
                $i++;
                $tot+= floatval($row->fair_sum);
            }
            $response['total']=$tot;
            $response['series'][0] = array("name"=>"Komposisi","data"=>$dt);

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getKomposisiTenor() {
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

            $tahun= substr($tgl_akhir,0,4);
            $periode = $tahun.substr($tgl_akhir,5,2);
            $tahunAwal = intval($tahun)-9;
            $tahunAkhir = intval($tahun)-1;
            $exec = array();

            $sql = "exec sp_gen_obli_aset '$tgl_akhir','$nik_user' ";
            array_push($exec,$sql);

            $rs = executeArray($exec,$err);

            $sql = " select a.tahun,sum(a.nilai)/1000000000 as pokok,sum(a.kupon)/1000000000 as kupon , b.cc
            from inv_obliaset_tmp a 
            inner join inv_obliaset_cc b on a.tahun=b.tahun
            where a.nik_user ='$nik_user'
            group by a.tahun,b.cc
            order by a.tahun
            ";
            $response['sql']=$sql;

            $res = execute($sql);
            $ctg = array();
            $dt[0] = array();
            $dt[1] = array();
            // $dt[2] = array();
            $i=0;
            while($row = $res->FetchNextObject($toupper=false)){
                array_push($ctg,$row->tahun);
                array_push($dt[0],floatval($row->pokok));
                array_push($dt[1],floatval($row->kupon));
                // array_push($dt[2],floatval($row->cc));
                $i++;
            }

            $response["ctg"] = $ctg;

            $color = array('#007AFF', '#FFCC00', '#4CD964', '#9F9F9F', '#8085e9', '#f15c80', '#e4d354', '#2b908f', '#f45b5b', '#91e8e1');
            $response["series"][0] = array(
                "name"=>"Kupon", "type"=>"column","color"=>$color[0],"data"=>$dt[1]
            );

            $response["series"][1]= array(
                "name"=>"Pokok", "type"=>"column","color"=>$color[1], "data"=>$dt[0]
            );


            // $response["series"][2]= array(
            //     "name"=>"Claim", "type"=>"line","color"=>$color[2],"data"=>$dt[2]
            // );  
           
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTableObli() {
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

            if($kode_plan == ""){
                $kode_plan = '1';
            }
            if($kode_klp == ""){
                $kode_klp = "5050";
            }
            // $sql2 = "select max(a.periode) as periode from 
            // inv_kelas_dash where a.kode_plan='$kode_plan'
            // ";
            // $rsta = execute($sql2);
            // $perAkhir = $rsta->fields[0];  
            if($tgl_akhir == ""){
                $tgl_akhir = getTglAkhir();
            }
            $response = array();

            $tahun= substr($tgl_akhir,0,4);
            $tahunLalu = intval($tahun)-1;
            $periode = $tahun.substr($tgl_akhir,5,2);

           
            $sqlt="select b.nama as reksadana,
            round(sum(z.fair_sum),0) as money_market,
            sum(z.wi_durmi)  as avg_duration,
            sum(z.wi_yieldmi) as avg_yield,
            sum(z.wi_kuponmi) as avg_coupon
            from 
            (
            
                select x.kode_rdkelola, 
                x.fair_sum, 	
                x.fair_sum / sum(x.fair_sum) over (partition by x.kode_rdkelola) as wi_fsmi,
                x.mo_duration * (x.fair_sum / sum(x.fair_sum ) over (partition by x.kode_rdkelola)) as wi_durmi,
                x.yield * (x.fair_sum / sum(x.fair_sum ) over (partition by x.kode_rdkelola)) as wi_yieldmi,
                x.kupon * (x.fair_sum / sum(x.fair_sum ) over (partition by x.kode_rdkelola)) as wi_kuponmi
            
                from (
                
                    select a.no_beli,a.kode_rdkelola,a.kode_jenis,a.nilai-isnull(b.jual,0) as nominal, c.tgl_selesai,
                    a.p_price as face_value, c.persen as kupon,e.jenis,f.kategori as rating,
                    cast (datediff(day,'$tgl_akhir',c.tgl_selesai) as float) / (case when e.jenis = 'PEMERINTAH' then 365 else 360 end) as tenor, 
                    case when e.jenis = 'PEMERINTAH' then 2 else 4 end as frek, 
                    case when e.jenis = 'PEMERINTAH' then 1 else 2 end as basis,
                    isnull(h.h_wajar,100) as price, 
                    isnull(h.yield,0) as yield,
                    
                    
                    dbo.mduration (c.persen/100, (cast (datediff(day,'$tgl_akhir',c.tgl_selesai) as float) / (case when e.jenis = 'PEMERINTAH' then 365 else 360 end)), 
                    case when e.jenis = 'PEMERINTAH' then 2 else 4 end, a.p_price/100 , isnull(h.h_wajar,100)/100,isnull(h.yield,0)/100  ) as mo_duration,
                    
                    ((a.nilai-isnull(b.jual,0)) * (isnull(h.h_wajar,100))/100) as fair_sum
                    
                    from 
                            (	
                                select b.no_beli,b.tgl_settl,a.kode_rdkelola,a.kode_jenis,a.nilai,a.p_price 
                                from inv_obli_d a inner join inv_oblibeli_m b on a.no_beli=b.no_beli
                                where b.tanggal<='$tgl_akhir'	
                            ) a 
                                
                            left join 
                            (
                                select a.no_beli,b.kode_rdkelola,a.kode_jenis,sum(a.n_oleh) as jual  
                                from inv_oblijual_d a  inner join inv_oblijual_m b on a.no_oblijual=b.no_oblijual 
                                where b.tanggal<='$tgl_akhir'
                                group by a.no_beli,b.kode_rdkelola,a.kode_jenis 
                            ) b on a.no_beli=b.no_beli and a.kode_rdkelola=b.kode_rdkelola and a.kode_jenis=b.kode_jenis 
                            
                            inner join inv_oblijenis c on a.kode_jenis=c.kode_jenis
                            inner join inv_obligor e on c.kode_obligor=e.kode_obligor
                            inner join inv_obli_rating f on c.kode_rating=f.kode_rating 
                            left join (select kode_jenis,h_wajar,yield 
                                        from inv_obli_harga where tanggal='$tgl_akhir'
                                        ) h on c.kode_jenis=h.kode_jenis
                                            
                    where a.nilai-isnull(b.jual,0) > 0
                    
                ) x	
                
                
            ) z
            inner join inv_rdkelola b on z.kode_rdkelola = b.kode_rdkelola
            group by b.nama";
            
            $response["daftar"] =dbResultArray($sqlt);

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }



?>