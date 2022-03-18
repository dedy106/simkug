<?php
    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        case 'POST':
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
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }


    function getPosisi(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
          
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPersenTerima(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $rs = dbRowArray("select 92.36 as persen");
            $response['persen'] = $rs['persen'];
            $response['blnTerima'] = $periode;
          
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPiuStatus(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            
            $color = array('#4CD964','#FF2D55','#8E8E93');
            $sql = "select 'Terbayar' as nama, 270 as nilai 
                    union all
                    select 'Overdue' as nama, 45 as nilai
                    union all
                    select 'Terlambat' as nama, 45 as nilai
                    ";
            $rs = execute($sql);
            $data = array();
            $i=0;
            while($row = $rs->FetchNextObject($toupper=false)){
                if($row->nama == "Terbayar"){
                    $data[] = array("name"=>$row->nama,"y"=>floatval($row->nilai),"color"=>$color[$i],"selected"=>true,"sliced"=>true);
                
                }else{

                    $data[] = array("name"=>$row->nama,"y"=>floatval($row->nilai),"color"=>$color[$i]);
                }
                $i++;
            }
            $response["series"][] = array("name"=>"Piutang","data"=>$data); 
          
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getRinciPiu(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $nik = $_SESSION['userLog'];
            $periode = $data['periode'];
              
            $sql = "select 'DP' as nama,a.kode_lokasi,a.kode_pp,
                    sum(a.n16) as nilai,count(nis) as jumlah
                    from sis_siswa_saldo a
                    where a.nik_user='$nik' and a.n16 <> 0
                    group by a.kode_lokasi,a.kode_pp
                    union all
                    select 'DPP' as nama,a.kode_lokasi,a.kode_pp,
                            sum(a.n17) as nilai,count(nis) as jumlah
                    from sis_siswa_saldo a
                    where a.nik_user='$nik' and a.n17 <> 0
                    group by a.kode_lokasi,a.kode_pp
                    union all
                    select 'DPS' as nama,a.kode_lokasi,a.kode_pp,
                            sum(a.n18) as nilai,count(nis) as jumlah
                    from sis_siswa_saldo a
                    where a.nik_user='$nik' and a.n18 <> 0
                    group by a.kode_lokasi,a.kode_pp
                    union all
                    select 'SPP' as nama,a.kode_lokasi,a.kode_pp,
                            sum(a.n19) as nilai,count(nis) as jumlah
                    from sis_siswa_saldo a
                    where a.nik_user='$nik' and a.n19 <> 0
                    group by a.kode_lokasi,a.kode_pp
                    union all
                    select 'Denda' as nama,a.kode_lokasi,a.kode_pp,
                            sum(a.n20) as nilai,count(nis) as jumlah
                    from sis_siswa_saldo a
                    where a.nik_user='$nik' and a.n20 <> 0
                    group by a.kode_lokasi,a.kode_pp
                    ";
            $response["daftar"] = dbResultArray($sql);
          
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPiuAjarAktif(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $nik = $_SESSION['userLog'];
            $periode = $data['periode'];
              
            $sql = "select a.kode_akt,isnull(c.jum,0) as siswa
            from sis_angkat a 
            left join ( select a.kode_lokasi,a.kode_pp,b.kode_akt,count(a.nis) as jum
                        from sis_siswa_saldo a
                        inner join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp = c.kode_pp
                        inner join sis_angkat b on c.kode_akt=b.kode_akt and c.kode_pp=b.kode_pp and c.kode_lokasi=b.kode_lokasi 
                        where a.nik_user='$nik' and (a.n16 <> 0 or a.n17 <> 0 or a.n18 <> 0 or a.n19 <> 0 or a.n20 <> 0) 
                        group by a.kode_lokasi,a.kode_pp,b.kode_akt
                         ) c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.kode_akt = c.kode_akt
            where a.flag_aktif='1' and a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'
                    ";
            $res = execute($sql);
            $category = array();
            $data = array();
            $i=0;
            while($row = $res->FetchNextObject($toupper=false)){
                
                array_push($data,floatval($row->siswa));
                array_push($category,$row->kode_akt);
                
                $i++;
            }
            $response["category"] = $category;
            $response["data"]=$data;
          
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>