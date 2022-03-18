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
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function cekAuth($user,$pass){
        getKoneksi();
        $user = qstr($user);
        $pass = qstr($pass);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user and pass=$pass", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }
    /*function authKey2($key, $modul, $user=null){
        getKoneksi();
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
        $key = qstr($key);
        $modul = qstr($modul);
        $date = date('Y-m-d H:i:s');
        $user_str = "";
        if($user != null){
            $user = qstr($user);
            $user_str .= "AND nik = $user";
        }

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM api_key_auth where api_key=$key and expired > '$date' and modul=$modul $user_str", 1);
        if($auth->RecordCount() > 0){
            
            $date = new DateTime($date);
            $date->add(new DateInterval('PT1H'));
            $WorkingArray = json_decode(json_encode($date),true);
            $expired = explode(".",$WorkingArray["date"]);

            $db_key["expired"] = $expired[0];
            $key_sql = $schema->AutoExecute('api_key_auth', $db_key, 'UPDATE', "api_key=$key and modul=$modul");
            return true;
        }else{
            return false;
        }
    }

    function authKey($key, $modul, $user=null){
        getKoneksi();
        $key = qstr($key);
        $modul = qstr($modul);
        $date = date('Y-m-d H:i:s');
        $user_str = "";
        if($user != null){
            $user = qstr($user);
            $user_str .= "AND nik = $user";
        }

        $schema = db_Connect();
        // $auth = $schema->SelectLimit("SELECT * FROM api_key_auth where api_key=$key and expired > '$date' and modul=$modul $user_str", 1);
        $auth = $schema->SelectLimit("SELECT * FROM api_key_auth where api_key=$key and modul=$modul $user_str ", 1);
        if($auth->RecordCount() > 0){
            
            // $date = new DateTime($date);
            // $date->add(new DateInterval('PT1H'));
            // $WorkingArray = json_decode(json_encode($date),true);
            // $expired = explode(".",$WorkingArray["date"]);

            // $db_key["expired"] = $expired[0];
            // $key_sql = $schema->AutoExecute('api_key_auth', $db_key, 'UPDATE', "api_key=$key and modul=$modul");
            return true;
        }else{
            return false;
        }
    }*/

    function getPerusahaan() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $perusahan = dbRowArray("select * from lokasi where kode_lokasi='$kode_lokasi' ");
            $response["data"] = $perusahan;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKasBank() {
         session_start();
         getKoneksi();
         $data=$_GET;

         if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){
            
            $kas = "select d.kode_akun, d.nama, c.so_akhir
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='".$_SESSION['lokasi']."' and b.kode_fs='FS1' and c.periode='".$data['periode']."' and a.kode_grafik in ('DB01')";
            $exe = execute($kas);
            while($row = $exe->FetchNextObject($toupper = false)){
                if($row->kode_akun == "1101" || $row->kode_akun == "1102"){
                    $response['kasbank'][] = (array)$row;
                }
            }
            $response['status'] = true;
         }else {
            $response["message"] = "Unauthorized Access, Login Required";
         }

        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKas() {
        session_start();
        getKoneksi();
        $data=$_GET;
        
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        $kode_lokasi = $_SESSION['lokasi'];
        $periode = $data['periode'];
        $response= array();

        // KAS BALANCE
        $query="select sum(so_akhir) as nilai
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB01') and c.so_akhir<>0";
        $result = execute($query);
        $row = $result->FetchNextObject($toupper=false);
        $response['kas'] = $row->nilai;
        $response['status'] = true;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getOR() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        $kode_lokasi = $_SESSION['lokasi'];
        $periode = $data['periode'];
        $response= array();

        //OPERATION RATIO
        $query_pendapatan   = "select case when jenis_akun = 'Pendapatan' then -n4 else n4 end as pendapatan 
                                     from exs_neraca where kode_lokasi = '$kode_lokasi' and modul = 'L' and nama = 'Jumlah Pendapatan' 
                                     and periode = '$periode'";
        $execute_pendapatan = execute($query_pendapatan);
        $query_beban        = "select case when jenis_akun = 'Beban' then n4 else n4 end as beban 
                                       from exs_neraca where kode_lokasi = '$kode_lokasi' and modul = 'L' 
                                       and nama in ('Jumlah Biaya','Jumlah Beban') and periode = '$periode'";
        $execute_beban      = execute($query_beban);
        $operationratio     = ($execute_beban->fields[0] / $execute_pendapatan->fields[0])*100;
        $response['or']     = $operationratio;
        $response['status'] = true;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }      
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPendTBesar() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $tahun = substr($periode,0,4);
                $response= array();

                $sql="select top 5 a.kode_akun,c.nama as nama_akun,
                case when c.jenis='Pendapatan' then a.so_akhir*-1 else a.so_akhir end as so_akhir,
                isnull(b.nilai,0) as gar
                from exs_glma a
                left join (select kode_akun,kode_lokasi,sum(nilai) as nilai
                            from anggaran_d 
                            where kode_lokasi='$kode_lokasi' and substring(periode,1,4)='$tahun'
                            group by kode_akun,kode_lokasi
                            )b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and c.jenis='Pendapatan' 
                order by -a.so_akhir desc ";
                $pdpt = execute($sql);

                $response["daftar"] = array();
                while($row = $pdpt->FetchNextObject($toupper = false)){
                    $response["daftar"][] = (array)$row;
                }
                $response["status"]=true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required";
            }     
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBebTBesar() {
        session_start();
        getKoneksi();
        $data=$_GET;
         if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $tahun = substr($periode,0,4);
                $response= array();

                $sql="select top 5 a.kode_akun,c.nama as nama_akun,
                case when c.jenis='Pendapatan' then a.so_akhir*-1 else a.so_akhir end as so_akhir,
                isnull(b.nilai,0) as gar
                from exs_glma a
                left join (select kode_akun,kode_lokasi,sum(nilai) as nilai
                            from anggaran_d 
                            where kode_lokasi='$kode_lokasi' and substring(periode,1,4)='$tahun'
                            group by kode_akun,kode_lokasi
                            )b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and c.jenis='Beban'
                order by a.so_akhir desc  ";
                $pdpt = execute($sql);

                $response["daftar"] = array();
                while($row = $pdpt->FetchNextObject($toupper = false)){
                    $response["daftar"][] = (array)$row;
                }
                $response["status"]=true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required";
            }   
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getRecent() {
        session_start();
        getKoneksi();
        $data=$_GET;
         if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $tahun = substr($periode,0,4);
                $response= array();

                $sql="select top 5 modul, convert(date,tgl_input) 'tgl_input', convert(date,tanggal) 'tgl_trans', nik_user 
                from trans_j where kode_lokasi = '".$_SESSION['lokasi']."' and periode like '$tahun%' order by tgl_input desc";
                $recent = execute($sql);
                $response["daftar"] = array();
                while($row = $recent->FetchNextObject($toupper = false)){
                    $response["daftar"][] = (array)$row;
                }
                $response["status"]=true;
               
            }else {
                $response["message"] = "Unauthorized Access, Login Required"; 
            }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getArus(){
        session_start();
        getKoneksi();
        $data=$_GET;
        
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $tahun = substr($periode,0,4);
                $response= array();
                $pembagi=1000000;
                $sqlIn= "select	a.kode_lokasi,sum(case when substring(a.periode,5,2)='01' then a.debet else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.debet else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.debet else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.debet else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.debet else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.debet else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.debet else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.debet else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.debet else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.debet else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.debet else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.debet else 0 end) n12
                from (
                    select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_lokasi
                    from db_grafik_d a
                    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                    inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB05' and c.so_akhir<>0
                ) a
                where substring(a.periode,1,4) = '".substr($periode,0,4)."' and a.kode_lokasi='$kode_lokasi'
                group by a.kode_lokasi";
        
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
                    
                $resIn = execute($sqlIn);
                if($resIn->RecordCount() > 0){
                    while ($row = $resIn->FetchNextObject(false)){
                        
                        $n1=$row->n1/$pembagi;
                        $n2=$row->n2/$pembagi;
                        $n3=$row->n3/$pembagi;
                        $n4=$row->n4/$pembagi;
                        $n5=$row->n5/$pembagi;
                        $n6=$row->n6/$pembagi;
                        $n7=$row->n7/$pembagi;
                        $n8=$row->n8/$pembagi;
                        $n9=$row->n9/$pembagi;
                        $n10=$row->n10/$pembagi;
                        $n11=$row->n11/$pembagi;
                        $n12=$row->n12/$pembagi;
                        
                        
                    }
                }
                    
                $response["Cash"][0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );
        
                $sqlOut = "select a.kode_lokasi,sum(case when substring(a.periode,5,2)='01' then a.kredit else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then a.kredit else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then a.kredit else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then a.kredit else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then a.kredit else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then a.kredit else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then a.kredit else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then a.kredit else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then a.kredit else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then a.kredit else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then a.kredit else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.kredit else 0 end) n12
                from (
                    select c.kode_akun,d.nama,c.so_awal,c.debet,c.kredit,c.so_akhir,c.periode,e.format,c.kode_lokasi
                    from db_grafik_d a
                    inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                    inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                    inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                    inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                    where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and a.kode_grafik ='DB05' and c.so_akhir<>0
                    ) a
                where substring(a.periode,1,4) = '".substr($periode,0,4)."' 
                group by a.kode_lokasi";
                    
                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
                    
                $resOut = execute($sqlOut);
                if($resOut->RecordCount() > 0){
                    while ($row = $resOut->FetchNextObject(false)){
                        
                        $n1=$row->n1/$pembagi;
                        $n2=$row->n2/$pembagi;
                        $n3=$row->n3/$pembagi;
                        $n4=$row->n4/$pembagi;
                        $n5=$row->n5/$pembagi;
                        $n6=$row->n6/$pembagi;
                        $n7=$row->n7/$pembagi;
                        $n8=$row->n8/$pembagi;
                        $n9=$row->n9/$pembagi;
                        $n10=$row->n10/$pembagi;
                        $n11=$row->n11/$pembagi;
                        $n12=$row->n12/$pembagi;
                    }
                }
                    
                $response["Cash"][1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );
                $response["status"]=true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required"; 
            }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPend(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $tahun = substr($periode,0,4);
                $response= array();
                $pembagi=1000000;
                //PENDAPATAN

                $sqlPen = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02')
                group by a.kode_lokasi";

                // echo $sqlPen;

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
                $pembagi=1000000;

                $resPen = execute($sqlPen);
                if($resPen->RecordCount() > 0){
                    while ($row = $resPen->FetchNextObject(false)){
                        
                        $n1=$row->n1/$pembagi;
                        $n2=$row->n2/$pembagi;
                        $n3=$row->n3/$pembagi;
                        $n4=$row->n4/$pembagi;
                        $n5=$row->n5/$pembagi;
                        $n6=$row->n6/$pembagi;
                        $n7=$row->n7/$pembagi;
                        $n8=$row->n8/$pembagi;
                        $n9=$row->n9/$pembagi;
                        $n10=$row->n10/$pembagi;
                        $n11=$row->n11/$pembagi;
                        $n12=$row->n12/$pembagi;
                    }
                }
                $response["Pend"][0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

                $sqlPend2 = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02')
                group by a.kode_lokasi";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                $resPend2 = execute($sqlPend2);
                if($resPend2->RecordCount() > 0){
                    while ($row = $resPend2->FetchNextObject(false)){
                        $n1=$row->n1/$pembagi;
                        $n2=$row->n2/$pembagi;
                        $n3=$row->n3/$pembagi;
                        $n4=$row->n4/$pembagi;
                        $n5=$row->n5/$pembagi;
                        $n6=$row->n6/$pembagi;
                        $n7=$row->n7/$pembagi;
                        $n8=$row->n8/$pembagi;
                        $n9=$row->n9/$pembagi;
                        $n10=$row->n10/$pembagi;
                        $n11=$row->n11/$pembagi;
                        $n12=$row->n12/$pembagi;
                    }
                }

                $response["Pend"][1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

                $sqlbox1 = "select 
                sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
                sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and a.periode='".$periode."' and b.kode_grafik in ('DB02')
                ";
                $rsAcvp = execute($sqlbox1);
                $rowAcvp = $rsAcvp->FetchNextObject($toupper);
                $response["budpend"] = $rowAcvp->n2;
                $response["actpend"] = $rowAcvp->n4;
                if($response["budpend"] == 0){
                    $response["rasioPend"] = 100;
                }else{
                    $response["rasioPend"] = ($actpend/$budpend)*100;
                }

                $response["status"]=true;
                $response["sql"]=$sql;
            } else{
                $response["message"] = "Unauthorized Access, Login Required"; 
            }

        header('Content-Type: application/json');
        echo json_encode($response);


    }

    function getBeb(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $tahun = substr($periode,0,4);
                $response= array();
                $pembagi=1000000;
                //BEBAN

                $sqlBeb = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')
                group by a.kode_lokasi";

                // echo $sqlPen;

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
                $pembagi=1000000;

                $resBeb = execute($sqlBeb);
                if($resBeb->RecordCount() > 0){
                    while ($row = $resBeb->FetchNextObject(false)){
                        
                        $n1=$row->n1/$pembagi;
                        $n2=$row->n2/$pembagi;
                        $n3=$row->n3/$pembagi;
                        $n4=$row->n4/$pembagi;
                        $n5=$row->n5/$pembagi;
                        $n6=$row->n6/$pembagi;
                        $n7=$row->n7/$pembagi;
                        $n8=$row->n8/$pembagi;
                        $n9=$row->n9/$pembagi;
                        $n10=$row->n10/$pembagi;
                        $n11=$row->n11/$pembagi;
                        $n12=$row->n12/$pembagi;
                    }
                }
                $response["Beb"][0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

                $sqlBeb2 = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')
                group by a.kode_lokasi";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                $resBeb2 = execute($sqlBeb2);
                if($resBeb2->RecordCount() > 0){
                    while ($row = $resBeb2->FetchNextObject(false)){
                        $n1=$row->n1/$pembagi;
                        $n2=$row->n2/$pembagi;
                        $n3=$row->n3/$pembagi;
                        $n4=$row->n4/$pembagi;
                        $n5=$row->n5/$pembagi;
                        $n6=$row->n6/$pembagi;
                        $n7=$row->n7/$pembagi;
                        $n8=$row->n8/$pembagi;
                        $n9=$row->n9/$pembagi;
                        $n10=$row->n10/$pembagi;
                        $n11=$row->n11/$pembagi;
                        $n12=$row->n12/$pembagi;
                    }
                }

                $response["Beb"][1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );

                //BEBAN

                $sqlbox2 = "select
                sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
                sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and a.periode='".$periode."' and b.kode_grafik in ('DB03')
                ";
                $rsAcvb = execute($sqlbox2);
                $rowAcvb = $rsAcvb->FetchNextObject($toupper);
                $response["budbeb"] = $rowAcvb->n2;
                $response["actbeb"] = $rowAcvb->n4;
                if($response["budbeb"] == 0){
                    $response["rasioBeb"] = 100;
                }else{
                    $response["rasioBeb"] = ($actbeb/$budbeb)*100;
                }

                $response["status"]=true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required"; 
            }
       
        header('Content-Type: application/json');
        echo json_encode($response);


    }

    function getLaba(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $tahun = substr($periode,0,4);
                $response= array();
                $pembagi=1000000;
                                
                //LABA
                $sqlLaba = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB04')
                group by a.kode_lokasi";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

                $resLab = execute($sqlLaba);
                if($resLab->RecordCount() > 0){
                    while ($row = $resLab->FetchNextObject(false)){
                        $n1=$row->n1/$pembagi;
                        $n2=$row->n2/$pembagi;
                        $n3=$row->n3/$pembagi;
                        $n4=$row->n4/$pembagi;
                        $n5=$row->n5/$pembagi;
                        $n6=$row->n6/$pembagi;
                        $n7=$row->n7/$pembagi;
                        $n8=$row->n8/$pembagi;
                        $n9=$row->n9/$pembagi;
                        $n10=$row->n10/$pembagi;
                        $n11=$row->n11/$pembagi;
                        $n12=$row->n12/$pembagi;
                    }
                }

                $response["Laba"][1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                    round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                    round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                    round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
                );
                
                $sqlbox3 = "select 
                sum(case a.jenis_akun when 'Pendapatan' then -a.n2 else a.n2 end) as n2, 
                sum(case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end) as n4
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and a.periode like '".$tahun."%' and b.kode_grafik in ('DB04')
                ";
                $rsAcvl = execute($sqlbox3);
                $rowAcvl = $rsAcvl->FetchNextObject($toupper);
                $response["actLaba"] = $rowAcvl->n4;

                
                $response["status"]=true;
            } else{
                 $response["message"] = "Unauthorized Access, Login Required"; 
            }
            
        header('Content-Type: application/json');
        echo json_encode($response);


    }

    function getBukuBesar() {
        session_start();
        getKoneksi();
        $data=$_GET;
        
         if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $kode_lokasi = $_SESSION['lokasi'];
                $periode = $data['periode'];
                $response= array();
                
                $tmp = explode("|",$data["param"]);
                $data["kode_akun"] = $tmp[0];
                $data["tgl1"]=$tmp[1];
                $data["tgl2"]=$tmp[2];
                if($data["kode_akun"] == "All" OR $data["kode_akun"] == ""){
                    $kode_akun="";
                    $filterakun="";
                }else{
                    $kode_akun=$data["kode_akun"];
                    $filterakun=" and c.kode_akun='$kode_akun' ";
                }

                $sql="select c.kode_lokasi,c.kode_akun,d.nama,c.so_awal,c.periode,case when c.so_awal>=0 then c.so_awal else 0 end as so_debet,case when c.so_awal<0 then c.so_awal else 0 end as so_kredit
                from db_grafik_d a
                inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
                inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
                where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB05','DB06','DB07') and c.so_akhir<>0 $filterakun 
                order by c.kode_akun";
                
                $rs=execute($sql);
        
                $response["daftar"] = array();
                while($row = $rs->FetchNextObject($toupper = false)){
                    $response["daftar"][] = (array)$row;
                }

                $tahun = substr($periode,0,4);
                $bulan = substr($periode,5,2);
                
                $sql2 = "SELECT DATEADD(s,-1,DATEADD(mm, DATEDIFF(m,0,'$tahun-$bulan-01')+1,0))";
                
                $rs=execute($sql2);
                $temp = explode(" ",$rs->fields['0']);
                $tgl_akhir=$temp[0];

                if($data["tgl1"] == "" AND $data["tgl2"] == ""){
                    $filtertgl="";
                }else if ($data["tgl1"] != ""  AND $data["tgl2"] == ""){
                    $filtertgl=" and a.tanggal between '".$data["tgl1"]."' AND '".$tgl_akhir."' ";
                }else if ($data["tgl1"] == "" AND $data["tgl2"] != ""){
                    $filtertgl=" and a.tanggal between '$tahun-$bulan-01' AND '".$data["tgl2"]."' ";
                }else{
                    $filtertgl=" and a.tanggal between '".$data["tgl1"]."' AND '".$data["tgl2"]."' ";
                }

                $sql="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,
                case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.kode_drk,a.no_dokumen
                from gldt a
                where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' $filtertgl 
                order by a.tanggal,a.no_bukti,a.dc";
                $rs1 = execute($sql);
                $response["daftar2"] = array();
                while($row = $rs1->FetchNextObject($toupper = false)){
                    $response["daftar2"][] = (array)$row;
                }

                $response['status'] = true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required"; 
            }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getArusKas(){
        session_start();
        getKoneksi();
        $data=$_GET;
        
         if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                if(empty($data['per'])){
                //total debet (penerimaan) dan kredit (pengeluaran)
                $sql = "select a.kode_lokasi,sum(a.debet) as debet,sum(a.kredit) as kredit
                from exs_glma a
                inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='".$_SESSION['lokasi']."' and a.periode='".$data['periode']."' and b.kode_flag in ('001','009')
                group by a.kode_lokasi";
                $rs = execute($sql);
                $response["penerimaan"] = $rs->fields[1];
                $response["pengeluaran"] = $rs->fields[2];

                //operasional penambah
                $sql2 ="
                select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['periode']."' and a.dc='D'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='050'
                group by b.kode_akun,b.kode_lokasi,d.nama";
                $rs2 = execute($sql2);
                $total_opr_penambah = 0;
                $response["opr_penambah"] = array();
                while($row = $rs2->FetchNextObject($toupper = false)){
                    $response["opr_penambah"][] = (array)$row;
                    $total_opr_penambah = $row->nilai + $total_opr_penambah;
                }
                $response['opr_penambah_tot'] = $total_opr_penambah;

                // operasional pengurang
                $sql3="select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['periode']."'  and a.dc='C'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='050'
                group by b.kode_akun,b.kode_lokasi,d.nama";
                $rs3 = execute($sql3);
                $total_opr_pengurang = 0;
                $response["opr_pengurang"] = array();
                while($row = $rs3->FetchNextObject($toupper = false)){
                    $response["opr_pengurang"][] = (array)$row;
                    $total_opr_pengurang = $row->nilai + $total_opr_pengurang;
                }
                $response['opr_pengurang_tot'] = $total_opr_pengurang;

                //  investasi penambah
                $sql4= "select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['periode']."'  and a.dc='D'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='051'
                group by b.kode_akun,b.kode_lokasi,d.nama ";
                $rs4 = execute($sql4);
                $total_inv_penambah = 0;
                $response["inv_penambah"] = array();
                while($row = $rs4->FetchNextObject($toupper = false)){
                    $response["inv_penambah"][] = (array)$row;
                    $total_inv_penambah = $row->nilai + $total_opr_penambah;
                }
                $response['inv_penambah_tot'] = $total_inv_penambah;

                //  investasi pengurang
                $sql5="select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['periode']."' and a.dc='C'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='051'
                group by b.kode_akun,b.kode_lokasi,d.nama ";
                $rs5 = execute($sql5);
                $total_inv_pengurang = 0;
                $response["inv_pengurang"] = array();
                while($row = $rs5->FetchNextObject($toupper = false)){
                    $response["inv_pengurang"][] = (array)$row;
                    $total_inv_pengurang = $row->nilai + $total_inv_pengurang;
                }
                $response['inv_pengurang_tot'] = $total_inv_pengurang;

                // pendanaan penambah
                $sql6 ="select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['periode']."' and a.dc='D'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='052'
                group by b.kode_akun,b.kode_lokasi,d.nama ";
                $rs6 = execute($sql6);
                $total_pdn_penambah = 0;
                $response["pdn_penambah"] = array();
                while($row = $rs6->FetchNextObject($toupper = false)){
                    $response["pdn_penambah"][] = (array)$row;
                    $total_pdn_penambah = $row->nilai + $total_pdn_penambah;
                }
                $response['pdn_penambah_tot'] = $total_pdn_penambah;

                // pendanaan pengurang
                $sql7= "select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['periode']."'  and a.dc='C'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='052'
                group by b.kode_akun,b.kode_lokasi,d.nama";
                $rs7 = execute($sql7);
                $total_pdn_pengurang = 0;
                $response["pdn_pengurang"] = array();
                while($row = $rs7->FetchNextObject($toupper = false)){
                    $response["pdn_pengurang"][] = (array)$row;
                    $total_pdn_pengurang = $row->nilai + $total_pdn_pengurang;
                }
                $response['pdn_pengurang_tot'] = $total_pdn_pengurang;
             }else{
                 //total debet (penerimaan) dan kredit (pengeluaran)
                $sql = "select a.kode_lokasi,sum(a.debet) as debet,sum(a.kredit) as kredit
                from exs_glma a
                inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='".$_SESSION['lokasi']."' and a.periode='".$data['per']."' and b.kode_flag in ('001','009')
                group by a.kode_lokasi";
                $rs = execute($sql);
                $response["penerimaan"] = $rs->fields[1];
                $response["pengeluaran"] = $rs->fields[2];

                //operasional penambah
                $sql2 ="
                select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['per']."' and a.dc='D'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='050'
                group by b.kode_akun,b.kode_lokasi,d.nama";
                $rs2 = execute($sql2);
                $total_opr_penambah = 0;
                $response["opr_penambah"] = array();
                while($row = $rs2->FetchNextObject($toupper = false)){
                    $response["opr_penambah"][] = (array)$row;
                    $total_opr_penambah = $row->nilai + $total_opr_penambah;
                }
                $response['opr_penambah_tot'] = $total_opr_penambah;

                // operasional pengurang
                $sql3="select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['per']."'  and a.dc='C'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='050'
                group by b.kode_akun,b.kode_lokasi,d.nama";
                $rs3 = execute($sql3);
                $total_opr_pengurang = 0;
                $response["opr_pengurang"] = array();
                while($row = $rs3->FetchNextObject($toupper = false)){
                    $response["opr_pengurang"][] = (array)$row;
                    $total_opr_pengurang = $row->nilai + $total_opr_pengurang;
                }
                $response['opr_pengurang_tot'] = $total_opr_pengurang;

                //  investasi penambah
                $sql4= "select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['per']."'  and a.dc='D'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='051'
                group by b.kode_akun,b.kode_lokasi,d.nama ";
                $rs4 = execute($sql4);
                $total_inv_penambah = 0;
                $response["inv_penambah"] = array();
                while($row = $rs4->FetchNextObject($toupper = false)){
                    $response["inv_penambah"][] = (array)$row;
                    $total_inv_penambah = $row->nilai + $total_opr_penambah;
                }
                $response['inv_penambah_tot'] = $total_inv_penambah;

                //  investasi pengurang
                $sql5="select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['per']."' and a.dc='C'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='051'
                group by b.kode_akun,b.kode_lokasi,d.nama ";
                $rs5 = execute($sql5);
                $total_inv_pengurang = 0;
                $response["inv_pengurang"] = array();
                while($row = $rs5->FetchNextObject($toupper = false)){
                    $response["inv_pengurang"][] = (array)$row;
                    $total_inv_pengurang = $row->nilai + $total_inv_pengurang;
                }
                $response['inv_pengurang_tot'] = $total_inv_pengurang;

                // pendanaan penambah
                $sql6 ="select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['per']."' and a.dc='D'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='052'
                group by b.kode_akun,b.kode_lokasi,d.nama ";
                $rs6 = execute($sql6);
                $total_pdn_penambah = 0;
                $response["pdn_penambah"] = array();
                while($row = $rs6->FetchNextObject($toupper = false)){
                    $response["pdn_penambah"][] = (array)$row;
                    $total_pdn_penambah = $row->nilai + $total_pdn_penambah;
                }
                $response['pdn_penambah_tot'] = $total_pdn_penambah;

                // pendanaan pengurang
                $sql7= "select b.kode_akun,b.kode_lokasi,d.nama,sum(b.nilai) as nilai
                from (select a.no_bukti,a.kode_lokasi
                    from trans_j a
                    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                    where a.kode_lokasi='".$_SESSION['lokasi']."' and  b.kode_flag in ('001','009') and a.periode='".$data['per']."'  and a.dc='C'
                    group by a.no_bukti,a.kode_lokasi
                    ) a
                inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi 
                inner join flag_relasi c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
                inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
                where c.kode_flag='052'
                group by b.kode_akun,b.kode_lokasi,d.nama";
                $rs7 = execute($sql7);
                $total_pdn_pengurang = 0;
                $response["pdn_pengurang"] = array();
                while($row = $rs7->FetchNextObject($toupper = false)){
                    $response["pdn_pengurang"][] = (array)$row;
                    $total_pdn_pengurang = $row->nilai + $total_pdn_pengurang;
                }
                $response['pdn_pengurang_tot'] = $total_pdn_pengurang;
             }
                $response["status"] = true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required";
            }
        header('Content-Type: application/json');
        echo json_encode($response);
        
    }

    function getTahun() {
        session_start();
        getKoneksi();
        $data=$_GET;
          if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $periode = "select distinct periode, SUBSTRING(periode, 1, 4) as tahun, SUBSTRING(periode, 5, 6) as bulan 
                            from exs_glma a inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
                            where a.kode_lokasi = '".$_SESSION['lokasi']."' order by periode desc ";
                $result  = execute($periode);
                while($row = $result->FetchNextObject($toupper = false)){
                    $response['periode_value'][] = (array)$row;
                    $response['bulan'][] = $row->bulan-1; 
                }
                
                $response['status']  = true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required";
            }
            
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getData() {
        session_start();
        getKoneksi();
        $data=$_GET;
            if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                if($data['jenis'] == "Pendapatan"){
                $data = "select b.kode_akun, b.nama,
                               sum(case b.jenis when 'Pendapatan' then -a.so_akhir else a.so_akhir end) as so_akhir,
                               sum(case b.jenis when 'Pendapatan' then isnull(c.nilai,0) else isnull(-c.nilai,0) end) as nilai
                               from exs_glma a 
                               inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                               left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                               where b.jenis = '".$data['jenis']."' and a.periode like '".$data['periode']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                               group by b.kode_akun, b.nama";
                $exe = execute($data);
                while($row = $exe->FetchNextObject($toupper = false)){
                    $response['data'][] = (array)$row;
                }
                }elseif($data['jenis'] == "Beban"){
                 $data = "select b.kode_akun, b.nama,
                               sum(case b.jenis when 'Beban' then a.so_akhir else -a.so_akhir end) as so_akhir,
                               sum(case b.jenis when 'Beban' then isnull(-c.nilai,0) else isnull(c.nilai,0) end) as nilai
                               from exs_glma a 
                               inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                               left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                               where b.jenis = '".$data['jenis']."' and a.periode like '".$data['periode']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                               group by b.kode_akun, b.nama";
                $exe = execute($data);
                while($row = $exe->FetchNextObject($toupper = false)){
                    $response['data'][] = (array)$row;
                }
                }
                $response['status'] = true;
            } else{
                $response["message"] = "Unauthorized Access, Login Required";
            }
            
         header('Content-Type: application/json');
         echo json_encode($response);
    }

    function getAkun() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];  
            $periode = $_GET['periode'];
            $response = array("message" => "", "rows" => 0, "status" => "" ); 				
            $res = execute("
            select 'All' as kode_akun, 'All' as nama 
            union all
            select distinct c.kode_akun,d.nama
            from db_grafik_d a
            inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
            inner join exs_glma c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
            inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
            inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB05','DB06','DB07')  and c.so_akhir<>0 
            ");
            
            while($row = $res->FetchNextObject($toupper))
            {
                $response['daftar'][] = (array)$row;
            }
            
            $response['status'] = true;
        }else{
            $response["message"] = "Unauthorized Access, Login Required";
        }
        
        header('Content-Type: application/json');
        echo json_encode($response);

    }

    function getRealisasiTahunanPen() {
        session_start();
        getKoneksi();
        $data=$_GET;
       if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        $tahunan = "select sum(a.so_akhir*-1) 'so_akhir', sum(isnull(c.nilai,0)) 'nilai', (sum(a.so_akhir*-1)/sum(isnull(c.nilai,0))) 'rasio' 
                   from exs_glma a 
                   inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                   left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                   where b.jenis = '".$data['jenis']."' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
        $exe     = execute($tahunan);
        $getTahunan = $exe->FetchNextObject($toupper = false);
        $response['realisasi_tahunan'] = $getTahunan->so_akhir;
        $response['anggaran_tahunan']  = $getTahunan->nilai;
        $response['persen_tahunan']  = number_format($getTahunan->rasio*100);
        $persen  = number_format($getTahunan->rasio*100);
        if($persen > 100){
            $response['bar_tahunan'] = 100;
        } else{
            $response['bar_tahunan'] = $persen;
        }

        $response['status'] = true;
        }else{
            $response["message"] = "Unauthorized Access, Login Required";
        }
    
     header('Content-Type: application/json');
     echo json_encode($response);

    }

    function getNeracaSaldo() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data['periode'];
            $response= array();
            
            $tmp = explode("|",$data["param"]);
            $data["jenis"] = $tmp[0];
            if($data["jenis"] == ""){
                $filter="";
            }else{
                $filter=" and b.jenis='".$data['jenis']."' ";
            }

            $sql="select a.kode_akun,b.nama,a.kode_lokasi,a.debet,a.kredit,a.so_awal,so_akhir, 
            case when a.so_awal>0 then so_awal else 0 end as so_awal_debet,
            case when a.so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
            case when a.so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
            case when a.so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
             from exs_glma a
             left join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
             where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' $filter
             order by a.kode_akun";
            
            $rs=execute($sql);
    
            $response["daftar"] = array();
            while($row = $rs->FetchNextObject($toupper = false)){
                $response["daftar"][] = (array)$row;
            }

            $response['status'] = true;
            $response['sql']=$sql;
        }else{
            $response["message"] = "Unauthorized Access, Login Required";
        }
    
     header('Content-Type: application/json');
     echo json_encode($response);

    }


    function getRealisasiTahunanBen() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
        $tahunan = "select sum(a.so_akhir) 'so_akhir', sum(isnull(c.nilai,0)) 'nilai', (sum(a.so_akhir)/sum(isnull(c.nilai,0))) 'rasio' 
                   from exs_glma a 
                   inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                   left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                   where b.jenis = '".$data['jenis']."' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
        $exe     = execute($tahunan);
        $getTahunan = $exe->FetchNextObject($toupper = false);
        $response['realisasi_tahunan'] = $getTahunan->so_akhir;
        $response['anggaran_tahunan']  = $getTahunan->nilai;
        $response['persen_tahunan']  = number_format($getTahunan->rasio*100);
        $persen  = number_format($getTahunan->rasio*100);
        if($persen > 100){
            $response['bar_tahunan'] = 100;
        } else{
            $response['bar_tahunan'] = $persen;
        }

        $response['status'] = true;  
    } else{
        $response["message"] = "Unauthorized Access, Login Required";
    }
     header('Content-Type: application/json');
     echo json_encode($response);

    }

    function getRealisasiBulananBen() {
        session_start();
        getKoneksi();
        $data=$_GET;
        $per = date('Y').date('M');
       if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $bulanan = "select isnull(sum(a.so_akhir),0) 'so_akhir', isnull(sum(isnull(c.nilai,0)),0) 'nilai', 
                      isnull((sum(a.so_akhir)/sum(isnull(c.nilai,0))),0) 'rasio' 
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = '".$data['jenis']."' and a.periode like '".date('Y').date('M')."' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
                $exe = execute($bulanan);
                $getBulanan = $exe->FetchNextObject($toupper = false);
                $response['realisasi_bulanan'] = $getBulanan->so_akhir;
                $response['anggaran_bulanan']  = $getBulanan->nilai;
                $response['persen_bulanan']    = number_format($getBulanan->rasio*100);
                $persen = number_format($getBulanan->rasio*100);
                if($persen > 100){
                    $response['bar_bulanan'] = 100;
                } else{
                    $response['bar_bulanan'] = $persen;
                }
                $response['status'] = true;
            
        } else{
            $response["message"] = "Unauthorized Access, Login Required";   
        }

         header('Content-Type: application/json');
         echo json_encode($response);

    }

    function getRealisasiBulananPen() {
        session_start();
        getKoneksi();
        $data=$_GET;
        $per = date('Y').date('M');
         if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $bulanan = "select isnull(sum(a.so_akhir*-1),0) 'so_akhir', isnull(sum(isnull(c.nilai,0)),0) 'nilai', 
                      isnull((sum(a.so_akhir*-1)/sum(isnull(c.nilai,0))),0) 'rasio' 
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = '".$data['jenis']."' and a.periode like '".date('Y').date('M')."' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
                $exe = execute($bulanan);
                $getBulanan = $exe->FetchNextObject($toupper = false);
                $response['realisasi_bulanan'] = $getBulanan->so_akhir;
                $response['anggaran_bulanan']  = $getBulanan->nilai;
                $response['persen_bulanan']    = number_format($getBulanan->rasio*100);
                $persen = number_format($getBulanan->rasio*100);
                if($persen > 100){
                    $response['bar_bulanan'] = 100;
                } else{
                    $response['bar_bulanan'] = $persen;
                }
                $response['status'] = true;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";     
        }

         header('Content-Type: application/json');
         echo json_encode($response);

    }

    function getDataPer() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                if(!empty($data['per'])){
                    if($data['jenis'] == "Pendapatan"){
                    $getDataper = "select b.kode_akun, b.nama,
                      sum(case b.jenis when 'Pendapatan' then -a.so_akhir else a.so_akhir end) as so_akhir,
                      sum(case b.jenis when 'Pendapatan' then isnull(c.nilai,0) else isnull(-c.nilai,0) end) as nilai
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = '".$data['jenis']."' and a.periode = '".$data['per']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                      group by b.kode_akun, b.nama";
                    $exe1 = execute($getDataper);
                    while($row1 = $exe1->FetchNextObject($toupper = false)){
                        $response['data_per'][] = (array)$row1;
                    }
                    }elseif($data['jenis'] == "Beban"){
                     $getDataper = "select b.kode_akun, b.nama,
                      sum(case b.jenis when 'Beban' then a.so_akhir else -a.so_akhir end) as so_akhir,
                      sum(case b.jenis when 'Beban' then isnull(-c.nilai,0) else isnull(c.nilai,0) end) as nilai
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = '".$data['jenis']."' and a.periode = '".$data['per']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                      group by b.kode_akun, b.nama";
                    $exe1 = execute($getDataper);
                    while($row1 = $exe1->FetchNextObject($toupper = false)){
                        $response['data_per'][] = (array)$row1;
                    }
                       
                    }

                    if($data['jenis'] == "Pendapatan"){
                    $getNilaiper = "select isnull(sum(a.so_akhir*-1),0) 'so_akhir', isnull(sum(isnull(c.nilai,0)),0) 'nilai', 
                      isnull((sum(a.so_akhir*-1)/sum(isnull(c.nilai,0))),0) 'rasio' 
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = 'Pendapatan' and a.periode = '".$data['per']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
                    $exe2 = execute($getNilaiper);
                    $row2 = $exe2->FetchNextObject($toupper = false);
                    }elseif($data['jenis'] == "Beban"){
                     $getNilaiper = "select isnull(sum(a.so_akhir),0) 'so_akhir', isnull(sum(isnull(c.nilai,0)),0) 'nilai', 
                      isnull((sum(a.so_akhir)/sum(isnull(c.nilai,0))),0) 'rasio' 
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = '".$data['jenis']."' and a.periode = '".$data['per']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
                    $exe2 = execute($getNilaiper);
                    $row2 = $exe2->FetchNextObject($toupper = false);   
                    }
                    $response['real_bln_per'] = $row2->so_akhir;
                    $response['angg_bln_per'] = $row2->nilai;
                    $response['persen_bln_per'] = number_format($row2->rasio*100);
                    $persen = number_format($row2->rasio*100);
                } else{
                    if($data['jenis'] == "Pendapatan"){
                    $getDataper = "select b.kode_akun, b.nama,
                               sum(case b.jenis when 'Pendapatan' then -a.so_akhir else a.so_akhir end) as so_akhir,
                               sum(case b.jenis when 'Pendapatan' then isnull(c.nilai,0) else isnull(-c.nilai,0) end) as nilai
                               from exs_glma a 
                               inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                               left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                               where b.jenis = '".$data['jenis']."' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                               group by b.kode_akun, b.nama";
                $exe3 = execute($getDataper);
                while($row3 = $exe3->FetchNextObject($toupper = false)){
                    $response['data_per'][] = (array)$row3;
                }

                    $getNilaiper = "select isnull(sum(a.so_akhir*-1),0) 'so_akhir', isnull(sum(isnull(c.nilai,0)),0) 'nilai', 
                      isnull((sum(a.so_akhir*-1)/sum(isnull(c.nilai,0))),0) 'rasio' 
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = '".$data['jenis']."' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
                    $exe4 = execute($getNilaiper);
                    $row4 = $exe4->FetchNextObject($toupper = false);
                    $response['real_bln_per'] = 0;
                    $response['angg_bln_per'] = 0;
                    $response['persen_bln_per'] = number_format(0);
                    $persen = number_format(0);
                    }elseif($data['jenis'] == "Beban"){

                        $getDataper = "select b.kode_akun, b.nama,
                               sum(case b.jenis when 'Beban' then -a.so_akhir else a.so_akhir end) as so_akhir,
                               sum(case b.jenis when 'Beban' then isnull(-c.nilai,0) else isnull(c.nilai,0) end) as nilai
                               from exs_glma a 
                               inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                               left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                               where b.jenis = '".$data['jenis']."' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                               group by b.kode_akun, b.nama";
                        $exe3 = execute($getDataper);
                        while($row3 = $exe3->FetchNextObject($toupper = false)){
                            $response['data_per'][] = (array)$row3;
                        }

                    $getNilaiper = "select isnull(sum(a.so_akhir),0) 'so_akhir', isnull(sum(isnull(c.nilai,0)),0) 'nilai', 
                      isnull((sum(a.so_akhir)/sum(isnull(c.nilai,0))),0) 'rasio' 
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      left join anggaran_d c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi  
                      where b.jenis = '".$data['jenis']."' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'";
                    $exe4 = execute($getNilaiper);
                    $row4 = $exe4->FetchNextObject($toupper = false);
                    $response['real_bln_per'] = 0;
                    $response['angg_bln_per'] = 0;
                    $response['persen_bln_per'] = number_format(0);
                    $persen = number_format(0); 
                    }
                }
                if($persen > 100){
                    $response['bar_bln_per'] = 100;
                } else{
                    $response['bar_bln_per'] = $persen;
                }

                $response['status'] = true;
        } else{
              $response["message"] = "Unauthorized Access, Login Required";       
        }

        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getChartLaba() {
         session_start();
         getKoneksi();
         $data=$_GET;
         if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                $pembagi=1000000;
                $pendapatan = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='".$_SESSION['lokasi']."' and substring(a.periode,1,4)='".substr($data['periode'],0,4)."' and b.kode_grafik in ('DB02')
                group by a.kode_lokasi";
                $np1=$np2=$np3=$np4=$np5=$np6=$np7=$np8=$np9=$np10=$np11=$np12=0;
                $exe1 = execute($pendapatan);
                if($exe1->RecordCount() > 0){
                    while ($row1 = $exe1->FetchNextObject(false)){
                        
                        $np1=$row1->n1/$pembagi;
                        $np2=$row1->n2/$pembagi;
                        $np3=$row1->n3/$pembagi;
                        $np4=$row1->n4/$pembagi;
                        $np5=$row1->n5/$pembagi;
                        $np6=$row1->n6/$pembagi;
                        $np7=$row1->n7/$pembagi;
                        $np8=$row1->n8/$pembagi;
                        $np9=$row1->n9/$pembagi;
                        $np10=$row1->n10/$pembagi;
                        $np11=$row1->n11/$pembagi;
                        $np12=$row1->n12/$pembagi;
                    }
                }
                 $response['pendapatan'][0] = array(round(floatval($np1)), round(floatval($np2)), round(floatval($np3)), 
                    round(floatval($np4)), round(floatval($np5)), round(floatval($np6)),
                    round(floatval($np7)), round(floatval($np8)), round(floatval($np9)), 
                    round(floatval($np10)), round(floatval($np11)), round(floatval($np12))
                );

                $beban = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='".$_SESSION['lokasi']."' and substring(a.periode,1,4)='".substr($data['periode'],0,4)."' and b.kode_grafik in ('DB03')
                group by a.kode_lokasi";
                $nb1=$nb2=$nb3=$nb4=$nb5=$nb6=$nb7=$nb8=$nb9=$nb10=$nb11=$nb12=0;
                $exe2 = execute($beban);
                   if($exe1->RecordCount() > 0){
                    while ($row2 = $exe2->FetchNextObject(false)){
                        
                        $nb1=$row2->n1/$pembagi;
                        $nb2=$row2->n2/$pembagi;
                        $nb3=$row2->n3/$pembagi;
                        $nb4=$row2->n4/$pembagi;
                        $nb5=$row2->n5/$pembagi;
                        $nb6=$row2->n6/$pembagi;
                        $nb7=$row2->n7/$pembagi;
                        $nb8=$row2->n8/$pembagi;
                        $nb9=$row2->n9/$pembagi;
                        $nb10=$row2->n10/$pembagi;
                        $nb11=$row2->n11/$pembagi;
                        $nb12=$row2->n12/$pembagi;
                    }
                }
                 $response['beban'][0] = array(round(floatval($nb1)), round(floatval($nb2)), round(floatval($nb3)), 
                    round(floatval($nb4)), round(floatval($nb5)), round(floatval($nb6)),
                    round(floatval($nb7)), round(floatval($nb8)), round(floatval($nb9)), 
                    round(floatval($nb10)), round(floatval($nb11)), round(floatval($nb12))
                );

                 $laba = "select a.kode_lokasi,
                sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n1,
                sum(case when substring(a.periode,5,2)='02' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n2,   
                sum(case when substring(a.periode,5,2)='03' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n3,
                sum(case when substring(a.periode,5,2)='04' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n4,
                sum(case when substring(a.periode,5,2)='05' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n5,
                sum(case when substring(a.periode,5,2)='06' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n6,
                sum(case when substring(a.periode,5,2)='07' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n7,
                sum(case when substring(a.periode,5,2)='08' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n8,
                sum(case when substring(a.periode,5,2)='09' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n9,
                sum(case when substring(a.periode,5,2)='10' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n10,
                sum(case when substring(a.periode,5,2)='11' then (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else 0 end) n11,  
                sum(case when substring(a.periode,5,2) in ('12','13','14','15') then (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else 0 end) n12
                from exs_neraca a
                inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi='".$_SESSION['lokasi']."' and substring(a.periode,1,4)='".substr($data['periode'],0,4)."' and b.kode_grafik in ('DB04')
                group by a.kode_lokasi";
                $nl1=$nl2=$nl3=$nl4=$nl5=$nl6=$nl7=$nl8=$nl9=$nl10=$nl11=$nl12=0;
                $exe3 = execute($laba);
                if($exe3->RecordCount() > 0){
                    while ($row3 = $exe3->FetchNextObject(false)){
                        
                        $nl1=$row3->n1/$pembagi;
                        $nl2=$row3->n2/$pembagi;
                        $nl3=$row3->n3/$pembagi;
                        $nl4=$row3->n4/$pembagi;
                        $nl5=$row3->n5/$pembagi;
                        $nl6=$row3->n6/$pembagi;
                        $nl7=$row3->n7/$pembagi;
                        $nl8=$row3->n8/$pembagi;
                        $nl9=$row3->n9/$pembagi;
                        $nl10=$row3->n10/$pembagi;
                        $nl11=$row3->n11/$pembagi;
                        $nl12=$row3->n12/$pembagi;
                    }
                }
                 $response['laba'][0] = array(round(floatval($nl1)), round(floatval($nl2)), round(floatval($nl3)), 
                    round(floatval($nl4)), round(floatval($nl5)), round(floatval($nl6)),
                    round(floatval($nl7)), round(floatval($nl8)), round(floatval($nl9)), 
                    round(floatval($nl10)), round(floatval($nl11)), round(floatval($nl12))
                );
                 $response['min'][0] = min(array(round(floatval($nl1)), round(floatval($nl2)), round(floatval($nl3)), 
                    round(floatval($nl4)), round(floatval($nl5)), round(floatval($nl6)),
                    round(floatval($nl7)), round(floatval($nl8)), round(floatval($nl9)), 
                    round(floatval($nl10)), round(floatval($nl11)), round(floatval($nl12))
                ));

                 $response['status'] = true;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";      
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDataLaba() {
         session_start();
         getKoneksi();
         $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
                if(!empty($data['per'])){
                $pendapatan = "select b.kode_akun, b.nama,
                      sum(case b.jenis when 'Pendapatan' then -a.so_akhir else a.so_akhir end) as so_akhir
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      where b.jenis = 'Pendapatan' and a.periode = '".$data['per']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                      group by b.kode_akun, b.nama";
                $exe1 = execute($pendapatan);
                $total_pendapatan = 0;
                while($row1 = $exe1->FetchNextObject($toupper = false)){
                    if($row1->so_akhir !=0){
                        $response['data_pendapatan'][] = (array)$row1;
                        $total_pendapatan = $total_pendapatan + $row1->so_akhir;
                    }
                }
                $response['total_pendapatan'] = $total_pendapatan; 

                $beban = "select b.kode_akun, b.nama,
                      sum(case b.jenis when 'Beban' then a.so_akhir else -a.so_akhir end) as so_akhir
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      where b.jenis = 'Beban' and a.periode = '".$data['per']."' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                      group by b.kode_akun, b.nama";
                $exe2 = execute($beban);
                $total_beban = 0;
                while($row2 = $exe2->FetchNextObject($toupper = false)){
                    if($row2->so_akhir !=0){
                        $response['data_beban'][] = (array)$row2;
                        $total_beban = $total_beban + $row2->so_akhir;
                    }
                }
                $response['total_beban'] = $total_beban;
                } else{

                $pendapatan = "select b.kode_akun, b.nama,
                      sum(case b.jenis when 'Pendapatan' then -a.so_akhir else a.so_akhir end) as so_akhir
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      where b.jenis = 'Pendapatan' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                      group by b.kode_akun, b.nama";
                $exe1 = execute($pendapatan);
                $total_pendapatan = 0;
                while($row1 = $exe1->FetchNextObject($toupper = false)){
                    if($row1->so_akhir !=0){
                        $response['data_pendapatan'][] = (array)$row1;
                        $total_pendapatan = $total_pendapatan + $row1->so_akhir;
                    }
                }
                $response['total_pendapatan'] = $total_pendapatan;

                $beban = "select b.kode_akun, b.nama,
                      sum(case b.jenis when 'Beban' then a.so_akhir else -a.so_akhir end) as so_akhir
                      from exs_glma a 
                      inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                      where b.jenis = 'Beban' and a.periode like '".substr($data['periode'],0,4)."%' and a.kode_lokasi = '".$_SESSION['lokasi']."'
                      group by b.kode_akun, b.nama";
                $exe2 = execute($beban);
                $total_beban = 0;
                while($row2 = $exe2->FetchNextObject($toupper = false)){
                    if($row2->so_akhir !=0){
                        $response['data_beban'][] = (array)$row2;
                        $total_beban = $total_beban + $row2->so_akhir;
                    }
                }
                $response['total_beban'] = $total_beban;

                }
                
                $response['selisih'] = $total_pendapatan - $total_beban;
                $response['status'] = true;
         }else {
            $response["message"] = "Unauthorized Access, Login Required";   
         }

        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>