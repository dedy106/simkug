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

    function cekKoneksi(){
        $response = "test";
        echo json_encode($response);
    }

    function getPerusahaan() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
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

    function getTotalBalance() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $result = dbRowArray("select sum(so_akhir) as nilai
            from db_grafik_d a
            inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
            inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
            inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
            inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB10') and c.kode_pp='$kode_pp' and c.so_akhir<>0 ");
            
            $response["data"] = $result;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDaftarKas() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $result = dbResultArray("select c.kode_akun,d.nama,so_akhir,e.format
            from db_grafik_d a
            inner join relakun b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs 
            inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
            inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
            inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB10') and c.kode_pp='$kode_pp' and c.so_akhir<>0
            order by c.kode_akun ");

            $response["data"] = $result;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getProfitLoss() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

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
            from exs_neraca_pp a
            inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02') and a.kode_pp='$kode_pp'
            group by a.kode_lokasi";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            $pembagi=$data['param'];

            $resPen = execute($sqlPen);
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

            $Keu[0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );

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
            from exs_neraca_pp a
            inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03') and a.kode_pp='$kode_pp'
            group by a.kode_lokasi";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

            $resBeb = execute($sqlBeb);
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

            $Keu[1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );

            $no=1;
            for($n=0;$n<=11;$n++){
                
                ${"nr" . $no}= $Keu[0][$n]-$Keu[1][$n];
                $no++;
                
            }

            $Keu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
            round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
            round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
            round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
            );
            
            $response["data"] = $Keu;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPBS() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $result = dbResultArray("select a.kode_grafik,a.nama,
            case format when 'Satuan' then isnull(b.nilai,0) when 'Ribuan' then isnull(b.nilai/1000,0) when 'Jutaan' then isnull(b.nilai/1000000,0) end as nilai,
            case format when 'Satuan' then isnull(b.gar,0) when 'Ribuan' then isnull(b.gar/1000,0) when 'Jutaan' then isnull(b.gar/1000000,0) end as gar  
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                            sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                                from db_grafik_d a
                                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                group by a.kode_grafik,a.kode_lokasi
                            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB02','DB03','DB04') and a.kode_lokasi='$kode_lokasi'");
            

            $response["data"] = $result;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getSaldoPiu() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $result = dbRowArray("select a.kode_lokasi,a.kode_pp,a.nama,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total
            from pp a 
            left join (select x.kode_pp,x.kode_lokasi,  
                        sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                        from sis_bill_d x 			
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
                        group by x.kode_pp,x.kode_lokasi 			
                        )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            left join (select x.kode_pp,x.kode_lokasi,  
                        sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                        from sis_bill_d x 			
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                        group by x.kode_pp,x.kode_lokasi 				
                        )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
            left join (select x.kode_pp,x.kode_lokasi,  
                        sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                        from sis_rekon_d x 	
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'		
                        group by x.kode_pp,x.kode_lokasi 			
                        )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
            left join (select x.kode_pp,x.kode_lokasi,  
                        sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                        from sis_rekon_d x 		
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                        group by x.kode_pp,x.kode_lokasi 			
                        )e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
            where(a.kode_lokasi = '$kode_lokasi') and a.kode_pp='$kode_pp' ");

            $response["data"] = $result;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
    function getSaldoPDD() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $result = dbRowArray("select a.kode_pp,a.kode_lokasi,a.nama,
            isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
            from pp a 
            inner join (select a.kode_pp,a.kode_lokasi
                        from sis_cd_d a
                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                        group by a.kode_pp,a.kode_lokasi
            )g on a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
            left join (select a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
                        from sis_cd_d a	
                        inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp	
                        where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.kode_pp='$kode_pp'
                        group by a.kode_lokasi,a.kode_pp
            )c on a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
            left join (select a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                        from sis_cd_d a			
                        inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp	
                        where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' and a.kode_pp='$kode_pp'
                        group by a.kode_lokasi,a.kode_pp
            )d on a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
            left join (select a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                        from sis_cd_d a			
                        inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                        where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' and a.kode_pp='$kode_pp'
                        group by a.kode_lokasi,a.kode_pp
            )e on a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'");

            $response["data"] = $result;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAggReal() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            
            $sqlagg= "select a.kode_grafik,a.nama,
            isnull(b.nilai/1000000,0) as nilai,
            isnull(b.gar/1000000,0) as gar, round((isnull(b.nilai/1000000,0)/ isnull(b.gar/1000000,0))*100,2) as n1
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                            sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                                from db_grafik_d a
                                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                group by a.kode_grafik,a.kode_lokasi
                            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB02') and a.kode_lokasi='$kode_lokasi'";

            $response["agg"] = dbRowArray($sqlagg);

            $sqlagg= "select a.kode_grafik,a.nama,
            isnull(b.nilai/1000000,0) as nilai,
            isnull(b.gar/1000000,0) as gar, round((isnull(b.nilai/1000000,0)/ isnull(b.gar/1000000,0)) * 100,2) as n1  
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                            sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
                                from db_grafik_d a
                                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                group by a.kode_grafik,a.kode_lokasi
                            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB03') and a.kode_lokasi='$kode_lokasi'";

            $response["agg2"]= dbRowArray($sqlagg);


            $sqlagg= "select a.kode_grafik,a.nama,
            isnull(b.nilai/1000000,0) as nilai,
            isnull(b.gar/1000000,0) as gar, round((isnull(b.nilai/1000000,0)/ isnull(b.gar/1000000,0)) * 100,2) as n1  
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
                            sum(b.n2) as gar
                                from db_grafik_d a
                                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
                                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
                                group by a.kode_grafik,a.kode_lokasi
                            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB04') and a.kode_lokasi='$kode_lokasi'";

            $response["agg3"]= dbRowArray($sqlagg);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getOR() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            //Operating Ratio
            $sql = " select a.kode_rasio,a.kode_lokasi,a.kode_neraca,
            case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio,
            case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n2 else b.n2 end as gar
                from db_rasio_d a
                inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
                inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
                where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and c.flag_box='1' and b.kode_pp='$kode_pp' and b.kode_fs='FS1' and c.kode_rasio='DB05'
                order by a.kode_rasio";

            $boxras = execute($sql);
            
            while ($row = $boxras->FetchNextObject(false)){
                $nil[] =(array)$row;
                $gar[] =(array)$row;
            }
            
            $dfr = array();

            for($i=0; $i<count($nil); $i++){
                if(!ISSET($dfr[$nil[$i]['kode_rasio']])){
                    $dfr[$nil[$i]['kode_rasio']] = array('nama_rasio' => $nil[$i]['nama_rasio'], 'rumus' => $nil[$i]['rumus'], 'par'=>array());
                }

                $dfr[$nil[$i]['kode_rasio']]['par'][] = array(
                    'kode_neraca'=>$nil[$i]['kode_neraca'],
                    'nilai2'=>$nil[$i]['nilai2']
                );
            }
            
            $html ="<center>";
            foreach($dfr as $d){
                $p = '';
                for($z=0; $z<count($d['par']); $z++){
                    $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";
                    
                    ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];
                    
                    
                }
                $kode=$d['nama_rasio'];

                $html .= "
                <p>".$d['nama_rasio']."</p>
                <h3 id='home_kas_box' style='font-size:25px'>".number_format(round(eval('return '.$d['rumus'].';'),2),2,",",".")."%</h3>
                <p style='font-size: 11px;margin-bottom: 0px;color:#bab0b0'>Actual</p>";
                
            }
            $html.="</center>";
            $response["data"] = $html;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getCR() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            
            $sqlcol = "select isnull(b.tot_bill,0) as tot_bill, isnull(d.tot_byr,0) as tot_byr, (isnull(d.tot_byr,0)/isnull(b.tot_bill,0))*100 as nil_cr
            from pp a
            left join (	select kode_lokasi, kode_pp,sum(nilai) as tot_bill
                            from sis_bill_d
                            where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode <= '$periode' 
                            group by kode_lokasi,kode_pp
                    ) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
            left join  
                    (
                        select kode_lokasi, kode_pp,sum(nilai) as tot_byr
                        from sis_rekon_d
                        where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode <= '$periode' 
                        group by kode_lokasi,kode_pp
                    ) d on a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi'";

            $response["data"] = dbRowArray($sqlcol);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getPer() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            
            $sqlcol = "select distinct periode from sis_bill_d where kode_lokasi='$kode_lokasi' order by periode desc";

            $response["data"] = dbResultArray($sqlcol);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPbyrPiu() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            if($data['param'] == ""){
                $kode_per = $periode;
            } else{
                $kode_per = $data['param'];
            }
            
            $sqlcol = "select a.tot_bill, b.tot_byr, (b.tot_byr/a.tot_bill)*100 as cr
            from (
            select kode_lokasi, kode_pp,sum(nilai) as tot_bill
            from sis_bill_d
            where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode='".$kode_per."' 
            group by kode_lokasi,kode_pp
            ) a
            inner join 
            (select kode_lokasi, kode_pp,sum(nilai) as tot_byr
            from sis_rekon_d
            where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode='".$kode_per."' 
            group by kode_lokasi,kode_pp) b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
            ";

            $response["data"] = dbRowArray($sqlcol);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getJmlSiswaMenunggak() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $sqljs = "select count(a.nis) as jum	from(
                select a.nis,a.nama,a.kode_lokasi,a.kode_pp,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,a.kode_kelas,isnull(e.total,0) as bayar
                    from sis_siswa a 
                    inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
                    left join (select y.nis,y.kode_lokasi,  
                                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                from sis_bill_d x 			
                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
                                group by y.nis,y.kode_lokasi 			
                                )b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
                    left join (select y.nis,y.kode_lokasi,  
                                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                                from sis_bill_d x 			
                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                                group by y.nis,y.kode_lokasi 			
                                )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi
                    left join (select y.nis,y.kode_lokasi,  
                                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                                from sis_rekon_d x 	
                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')	and x.kode_pp='$kode_pp'		
                                group by y.nis,y.kode_lokasi 			
                                )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi
                    left join (select y.nis,y.kode_lokasi, 
                                sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                                from sis_rekon_d x 			
                                inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                                where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode') and x.kode_pp='$kode_pp'			
                                group by y.nis,y.kode_lokasi 			
                                )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
                    where(a.kode_lokasi = '$kode_lokasi') and a.kode_pp='$kode_pp'
            ) a 
            where a.sak_total > 0";
        
            $sqljsb = "select count(a.nis) as jum	
            from sis_siswa a
            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' ";

            
            $sqlsiswa = "select count(a.nis) as jum	
            from sis_siswa a
            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.flag_aktif='1' ";
        
            $rsjum =dbRowArray($sqljs); // jumlah menunggak
            $rstot =dbRowArray($sqljsb); // jumlah siswa total
            $nilsis =round($rsjum['jum']/$rstot['jum'],2)*100; //persentase siswa menunggak
            $response["rsjum"] =$rsjum; // jumlah menunggak
            $response["rstot"] =$rstot; // jumlah siswa total
            $response["persen"] =$nilsis; //persentase siswa menunggak
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getJmlSiswaAktif() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            
            $sqlsiswa = "select count(a.nis) as jum	
            from sis_siswa a
            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and a.flag_aktif='1' ";
        
            $rsjum = dbRowArray($sqlsiswa);
            $response["total"] =$rsjum["jum"]; 
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAgingPiutang() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $pembagi = $data['param'];
            
            $sql="select a.kode_pp,a.nama,a.kode_lokasi,
            b.n1,b.n2,b.n3,b.n4
            from pp a
            left join (select a.kode_lokasi,a.kode_pp,
            sum(case when a.umur<=6 then a.n1 else 0 end) as n1,
            sum(case when a.umur between 7 and 12 then a.n1 else 0 end) as n2,
            sum(case when a.umur between 13 and 24 then a.n1 else 0 end) as n3,
            sum(case when a.umur>24 then a.n1 else 0 end) as n4
            from (select a.no_bill,a.kode_lokasi,a.periode,a.kode_pp,
                    datediff(month,convert(datetime, a.periode+'01'),convert(datetime, '$periode'+'01')) as umur,
                    isnull(a.n1,0)-isnull(b.n1,0) as n1
                    from (select x.no_bill,x.kode_lokasi,x.periode,x.kode_pp,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as n1	
                            from sis_bill_d x 	
                            where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') and x.kode_pp='$kode_pp'			
                            group by x.no_bill,x.kode_lokasi,x.periode,x.kode_pp	
                            )a
                    left join (select x.no_bill,x.kode_lokasi,x.kode_pp,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as n1	
                            from sis_rekon_d x 	
                            where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') and x.kode_pp='$kode_pp'			
                            group by x.no_bill,x.kode_lokasi,x.kode_pp
                    )b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi = '$kode_lokasi' 
                )a
                group by a.kode_lokasi,a.kode_pp
            )b on a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
            where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
            order by a.kode_pp ";

            $resUmur = execute($sql);
            $row = $resUmur->FetchNextObject(false);
            
            $n1=$row->n1/$pembagi;
            $n2=$row->n2/$pembagi;
            $n3=$row->n3/$pembagi;
            $n4=$row->n4/$pembagi;

            $Umur[0] = array(round(floatval($n1),2), round(floatval($n2),2), round(floatval($n3),2), 
                            round(floatval($n4),2));

            $response["data"] = $Umur[0];

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPiutang() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $pembagi = $data["param"];
            $pembagi = 1;

            $fields = ['BILL', 'BYR'];

            for($s=0; $s<count($fields); $s++){
                $field = $fields[$s];

                $sql="
                select a.kode,
                    sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) n1,
                    sum(case when substring(a.periode,5,2)='02' then a.nilai  else 0 end) n2,   
                    sum(case when substring(a.periode,5,2)='03' then a.nilai  else 0 end) n3,
                    sum(case when substring(a.periode,5,2)='04' then a.nilai  else 0 end) n4,
                    sum(case when substring(a.periode,5,2)='05' then a.nilai  else 0 end) n5,
                    sum(case when substring(a.periode,5,2)='06' then a.nilai  else 0 end) n6,
                    sum(case when substring(a.periode,5,2)='07' then a.nilai  else 0 end) n7,
                    sum(case when substring(a.periode,5,2)='08' then a.nilai  else 0 end) n8,
                    sum(case when substring(a.periode,5,2)='09' then a.nilai  else 0 end) n9,
                    sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) n10,
                    sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) n11,
                    sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) n12	   
                from (
                    select 'BILL' as kode, sum(nilai) as nilai, kode_lokasi, periode, kode_pp
                    from sis_bill_d
                    where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi'
                    group by kode_lokasi,periode,kode_pp
                    union

                    select 'BYR' as kode, sum(a.nilai) as nilai, a.kode_lokasi, a.periode, a.kode_pp
                    from sis_rekon_d a
                    where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
                    group by a.kode_lokasi,a.periode,a.kode_pp
                ) a
                where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and a.kode='$field'
                group by a.kode
                ";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
    
                $resPiu = execute($sql);
                while ($row = $resPiu->FetchNextObject(false)){
            
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
            
                $Piu[$s] = array(floatval($n1), floatval($n2), floatval($n3), 
                                floatval($n4), floatval($n5), floatval($n6),
                                floatval($n7), floatval($n8), floatval($n9), 
                                floatval($n10), floatval($n11), floatval($n12)
                );

                
            }   
            
            
            $no=1;
            for($n=0;$n<=11;$n++){
                
                ${"nr" . $no}= ($Piu[1][$n]/$Piu[0][$n])*100;
                $no++;

            }

            $Piu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
            round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
            round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
            round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
            );

            $response["data"]=$Piu;
  
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPiutangCCR() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $pembagi = $data["param"];
            $pembagi = 1;

            $fields = ['BILL', 'BYR'];

            for($s=0; $s<count($fields); $s++){
                $field = $fields[$s];

                $sql="
                select a.kode,
                    sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) n1,
                    sum(case when substring(a.periode,5,2)='02' then a.nilai  else 0 end) n2,   
                    sum(case when substring(a.periode,5,2)='03' then a.nilai  else 0 end) n3,
                    sum(case when substring(a.periode,5,2)='04' then a.nilai  else 0 end) n4,
                    sum(case when substring(a.periode,5,2)='05' then a.nilai  else 0 end) n5,
                    sum(case when substring(a.periode,5,2)='06' then a.nilai  else 0 end) n6,
                    sum(case when substring(a.periode,5,2)='07' then a.nilai  else 0 end) n7,
                    sum(case when substring(a.periode,5,2)='08' then a.nilai  else 0 end) n8,
                    sum(case when substring(a.periode,5,2)='09' then a.nilai  else 0 end) n9,
                    sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) n10,
                    sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) n11,
                    sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) n12	    
                from (
                    select 'BILL' as kode, sum(nilai) as nilai, kode_lokasi, periode, kode_pp
                    from sis_bill_d
                    where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi'
                    group by kode_lokasi,periode,kode_pp
                    union

                    select 'BYR' as kode, sum(a.nilai) as nilai, a.kode_lokasi, a.periode_bill as periode, a.kode_pp
                    from sis_rekon_d a
                    where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' 
                    group by a.kode_lokasi,a.periode_bill,a.kode_pp
                ) a
                where a.kode_pp='$kode_pp' and a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and a.kode='$field'
                group by a.kode
                ";

                $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
    
                $resPiu = execute($sql);
                while ($row = $resPiu->FetchNextObject(false)){
            
                    $n1=($row->n1 != 0 ? $row->n1/$pembagi : 0);
                    $n2=($row->n2 != 0 ? ($row->n1+$row->n2)/$pembagi : 0);
                    $n3=($row->n3 != 0 ? ($row->n1+$row->n2+$row->n3)/$pembagi : 0);
                    $n4=($row->n4 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4)/$pembagi : 0);
                    $n5=($row->n5 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5)/$pembagi : 0);
                    $n6=($row->n6 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6)/$pembagi : 0);
                    $n7=($row->n7 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7)/$pembagi : 0);
                    $n8=($row->n7 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8)/$pembagi : 0);
                    $n9=($row->n7 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9)/$pembagi : 0);
                    $n10=($row->n7 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9+$row->n10)/$pembagi : 0);
                    $n11=($row->n7 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9+$row->n10+$row->n11)/$pembagi : 0);
                    $n12=($row->n7 != 0 ? ($row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9+$row->n10+$row->n11+$row->n12)/$pembagi : 0);   
                }
            
                $Piu[$s] = array(floatval($n1), floatval($n2), floatval($n3), 
                                floatval($n4), floatval($n5), floatval($n6),
                                floatval($n7), floatval($n8), floatval($n9), 
                                floatval($n10), floatval($n11), floatval($n12)
                );

                
            }   

            $no=1;
            for($n=0;$n<=11;$n++){
                
                ${"nr" . $no}= ($Piu[1][$n]/$Piu[0][$n])*100;
                $no++;

            }

            $Piu[2]= array(round(floatval($nr1),2), round(floatval($nr2),2), round(floatval($nr3),2), 
            round(floatval($nr4),2), round(floatval($nr5),2), round(floatval($nr6),2),
            round(floatval($nr7),2), round(floatval($nr8),2), round(floatval($nr9),2), 
            round(floatval($nr10),2), round(floatval($nr11),2), round(floatval($nr12),2)
            );
            
            $response["data"]=$Piu;
  
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAkun() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
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
            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and a.kode_grafik in ('DB10')  and c.so_akhir<>0 
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

    function getBukuBesar() {
        session_start();
        getKoneksi();
        $data=$_GET;
        
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data['periode'];
            $kode_pp= $_SESSION['kodePP'];
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
            inner join exs_glma_pp c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
            inner join masakun d on c.kode_akun=d.kode_akun and c.kode_lokasi=d.kode_lokasi
            inner join db_grafik_m e on a.kode_grafik=e.kode_grafik and a.kode_lokasi=e.kode_lokasi
            where c.kode_lokasi='$kode_lokasi' and b.kode_fs='FS1' and c.periode='$periode' and c.kode_pp='$kode_pp' and a.kode_grafik in ('DB10') and c.so_akhir<>0 $filterakun 
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
            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' $filtertgl and a.kode_pp='$kode_pp'
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

    function getJur() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];  
            $periode = $_GET['periode'];
            $kode_pp = $_SESSION['kodePP'];
            $response = array("message" => "", "rows" => 0, "status" => "" ); 				
            $res = execute("
            select 'All' as kode_jur, 'All' as nama 
            union all
            select distinct a.kode_jur,a.nama
            from sis_jur a
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' 
            order by kode_jur");
            
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


    function getKelas() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];  
            $periode = $_GET['periode'];
            $kode_pp = $_SESSION['kodePP'];
            $response = array("message" => "", "rows" => 0, "status" => "" ); 				
            $res = execute("
            select 'All' as kode_kelas, 'All' as nama 
            union all
            select distinct a.kode_kelas,a.nama
            from sis_kelas a
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' 
            order by kode_kelas");
            
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

    

    function getAngkatan() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];  
            $periode = $_GET['periode'];
            $kode_pp = $_SESSION['kodePP'];
            $response = array("message" => "", "rows" => 0, "status" => "" ); 				
            $res = execute("
            select 'All' as kode_akt, 'All' as nama 
            union all
            select distinct a.kode_akt,a.nama
            from sis_angkat a
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' 
            order by kode_akt");
            
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

    function getSiswa() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];  
            $periode = $_GET['periode'];
            $kode_pp = $_SESSION['kodePP'];
            $response = array("message" => "", "rows" => 0, "status" => "" ); 				
            $res = execute("
            select 'All' as nis, 'All' as nama 
            union all
            select distinct a.nis,a.nama
            from sis_siswa a
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' 
            order by nis");
            
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


    function getDftSaldoPiu() {
        session_start();
        getKoneksi();
        $data=$_GET;
        
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data['periode'];
            $kode_pp= $_SESSION['kodePP'];
            $response= array();
            
            $tmp = explode("|",$data["param"]);
            $data["kode_jur"] = $tmp[0];
            $data["kode_kls"]=$tmp[1];
            $data["kode_akt"]=$tmp[2];
            $data["nis"] = $tmp[3];
            $data["flag"]=$tmp[4];

            $filter = "";
            if($data['kode_jur'] == "all" OR $data['kode_jur'] == ""){
                $kode_jur = "";
                $filter .= " and f.kode_jur LIKE '%' ";
            }else{
                $kode_jur = $data['kode_jur'];
                $filter .= " and f.kode_jur = '".$data['kode_jur']."' ";
            }

            if($data['kode_kls'] == "all" OR $data['kode_kls'] == ""){
                $kode_kelas = "";
                $filter .= " and a.kode_kelas LIKE '%' ";
            }else{
                $kode_kelas = $data['kode_kls'];
                $filter .= " and a.kode_kelas = '".$data['kode_kls']."' ";
            }

            if($data['kode_akt'] == "all" OR $data['kode_akt'] == ""){
                $kode_akt = "";
                $filter .= " and a.kode_akt LIKE '%' ";
            }else{
                $kode_akt = $data['kode_akt'];
                $filter .= " and a.kode_akt = '".$data['kode_akt']."' ";
            }

            if($data['nis'] == "all" OR $data['nis'] == ""){
                $nis = "";
                $filter .= " and a.nis LIKE '%' ";
            }else{
                $nis = $data['nis'];
                $filter .= " and a.nis = '".$data['nis']."' ";
            }

            if($data['flag'] == "all" OR $data['flag'] == ""){
                $flag = "";
                $filter .= " and a.flag_aktif LIKE '%' ";
            }else{
                $flag = $data['flag'];
                $temp2 = explode(".",$flag);
                $filter .= " and a.flag_aktif = '".$temp2[0]."' ";
            }

            $sql="select a.nis,a.nama,a.kode_lokasi,a.kode_pp,a.kode_akt
                ,isnull(b.n1,0)-isnull(d.n1,0)+isnull(c.n1,0)-isnull(e.n1,0) as sak_n1
                ,isnull(b.n2,0)-isnull(d.n2,0)+isnull(c.n2,0)-isnull(e.n2,0) as sak_n2
                ,isnull(b.n3,0)-isnull(d.n3,0)+isnull(c.n3,0)-isnull(e.n3,0) as sak_n3
                ,isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) as sak_total,
                a.kode_kelas,f.kode_jur,f.nama as nama_jur
            from sis_siswa a 
            inner join sis_kelas f on a.kode_kelas=f.kode_kelas and a.kode_lokasi=f.kode_lokasi and a.kode_pp=f.kode_pp
            inner join sis_jur g on f.kode_jur=g.kode_jur and f.kode_lokasi=g.kode_lokasi and f.kode_pp=g.kode_pp
            left join (select y.nis,y.kode_lokasi,  
                                sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                            sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                            sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                        from sis_bill_d x 			
                        inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_pp='$kode_pp'			
                        group by y.nis,y.kode_lokasi 			
                        )b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi
            left join (select y.nis,y.kode_lokasi,  
                            sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                            sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                            sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total		
                        from sis_bill_d x 			
                        inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode = '$periode') and x.kode_pp='$kode_pp'			
                        group by y.nis,y.kode_lokasi 			
                        )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi
            left join (select y.nis,y.kode_lokasi,  
                            sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                            sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                            sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total				
                        from sis_rekon_d x 	
                        inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')	and x.kode_pp='$kode_pp'		
                        group by y.nis,y.kode_lokasi 			
                        )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi
            left join (select y.nis,y.kode_lokasi, 
                        sum(case when x.kode_param in ('DSP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1, 
                            sum(case when x.kode_param in ('SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n2, 
                            sum(case when x.kode_param not in ('DSP','SPP') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end)  as n3,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as total			
                        from sis_rekon_d x 			
                        inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode ='$periode') and x.kode_pp='$kode_pp'			
                        group by y.nis,y.kode_lokasi 			
                        )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' $filter and isnull(b.total,0)-isnull(d.total,0)+isnull(c.total,0)-isnull(e.total,0) > 0
            order by a.kode_kelas,a.nis
            ";

            $rs=execute($sql);
        
            $response["daftar"] = array();
            while($row = $rs->FetchNextObject($toupper = false)){
                $response["daftar"][] = (array)$row;
            }
            
            $response['sql']=$sql;
            $response['status'] = true;
        } else{
            $response["message"] = "Unauthorized Access, Login Required"; 
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getDftSaldoPDD() {
        session_start();
        getKoneksi();
        $data=$_GET;
        
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data['periode'];
            $kode_pp= $_SESSION['kodePP'];
            $response= array();
            
            $tmp = explode("|",$data["param"]);
            $data["kode_jur"] = $tmp[0];
            $data["kode_kls"]=$tmp[1];
            $data["kode_akt"]=$tmp[2];
            $data["nis"] = $tmp[3];
            $data["flag"]=$tmp[4];

            $filter = "";
            if($data['kode_jur'] == "all" OR $data['kode_jur'] == ""){
                $kode_jur = "";
                $filter .= " and f.kode_jur LIKE '%' ";
            }else{
                $kode_jur = $data['kode_jur'];
                $filter .= " and f.kode_jur = '".$data['kode_jur']."' ";
            }

            if($data['kode_kls'] == "all" OR $data['kode_kls'] == ""){
                $kode_kelas = "";
                $filter .= " and a.kode_kelas LIKE '%' ";
            }else{
                $kode_kelas = $data['kode_kls'];
                $filter .= " and a.kode_kelas = '".$data['kode_kls']."' ";
            }

            if($data['kode_akt'] == "all" OR $data['kode_akt'] == ""){
                $kode_akt = "";
                $filter .= " and a.kode_akt LIKE '%' ";
            }else{
                $kode_akt = $data['kode_akt'];
                $filter .= " and a.kode_akt = '".$data['kode_akt']."' ";
            }

            if($data['nis'] == "all" OR $data['nis'] == ""){
                $nis = "";
                $filter .= " and a.nis LIKE '%' ";
            }else{
                $nis = $data['nis'];
                $filter .= " and a.nis = '".$data['nis']."' ";
            }

            if($data['flag'] == "all" OR $data['flag'] == ""){
                $flag = "";
                $filter .= " and a.flag_aktif LIKE '%' ";
            }else{
                $flag = $data['flag'];
                $temp2 = explode(".",$flag);
                $filter .= " and a.flag_aktif = '".$temp2[0]."' ";
            }


            $sql="select a.nis,a.kode_lokasi,a.nama,a.kode_kelas,a.kode_akt,a.kode_pp,b.kode_jur,f.nama as nama_jur,
                isnull(c.nilai,0) as so_awal,isnull(d.nilai,0) as debet,isnull(e.nilai,0) as kredit,
                isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
            from sis_siswa a 
            inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
            inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp
            inner join (select a.nis,a.kode_pp,a.kode_lokasi
                        from sis_cd_d a
                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                        group by a.nis,a.kode_pp,a.kode_lokasi
                        )g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
            left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.kode_pp='$kode_pp'
                    group by a.nis,a.kode_lokasi,a.kode_pp
                    )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
            left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' and a.kode_pp='$kode_pp'
                    group by a.nis,a.kode_lokasi,a.kode_pp
                    )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
            left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' and a.kode_pp='$kode_pp'
                    group by a.nis,a.kode_lokasi,a.kode_pp
                    )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' $filter
            order by a.kode_kelas,a.nis
            ";

            $rs=execute($sql);
        
            $response["daftar"] = array();
            while($row = $rs->FetchNextObject($toupper = false)){
                $response["daftar"][] = (array)$row;
            }
            
            $response['sql']=$sql;
            $response['status'] = true;
        } else{
            $response["message"] = "Unauthorized Access, Login Required"; 
        }
        header('Content-Type: application/json');
        echo json_encode($response);
    }        
    
    function getBudgetAct() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $periode = $data['periode'];
            $kode_pp=$_SESSION['kodePP'];
            $sqlagg= "select a.kode_grafik,a.nama,
            isnull(b.nilai,0) as nilai,
            isnull(b.gar,0) as gar, (isnull(b.nilai,0)/ isnull(b.gar,0)) *100 as n1
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
            sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
            from db_grafik_d a
            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
            group by a.kode_grafik,a.kode_lokasi
            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB02') and a.kode_lokasi='$kode_lokasi'";
            
            $res = dbRowArray($sqlagg);
            $response["data"] = $res;

            $sqlagg2= "select a.kode_grafik,a.nama,
            isnull(b.nilai,0) as nilai,
            isnull(b.gar,0) as gar, (isnull(b.nilai,0)/ isnull(b.gar,0)) *100 as n1
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
            sum(case when b.jenis_akun='Pendapatan' then -b.n2 else b.n2 end) as gar
            from db_grafik_d a
            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
            group by a.kode_grafik,a.kode_lokasi
            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB03') and a.kode_lokasi='$kode_lokasi'";
            
            $res2 = dbRowArray($sqlagg2);
            $response["data2"] = $res2;
            
            $sqlagg3= "select a.kode_grafik,a.nama,
            isnull(b.nilai,0) as nilai,
            isnull(b.gar,0) as gar, (isnull(b.nilai,0)/ isnull(b.gar,0)) *100 as n1
            from db_grafik_m a
            left join (select a.kode_grafik,a.kode_lokasi,sum(case when b.jenis_akun='Pendapatan' then -b.n4 else b.n4 end) as nilai,
            sum(b.n2) as gar
            from db_grafik_d a
            inner join exs_neraca_pp b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs
            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and b.kode_pp='$kode_pp' and b.kode_fs='FS1'
            group by a.kode_grafik,a.kode_lokasi
            )b on a.kode_grafik=b.kode_grafik and a.kode_lokasi=b.kode_lokasi
            where a.kode_grafik in ('DB04') and a.kode_lokasi='$kode_lokasi'";
            
            $res3 = dbRowArray($sqlagg3);
            $response["data3"] = $res3;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getAggChart() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $pembagi=$data['param'];
            $sqlPB = "select a.kode_lokasi,
            sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) end) else 0 end) n1,
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
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB02'
            group by a.kode_lokasi";
            
            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
            $resPB =execute($sqlPB);
            while ($row = $resPB->FetchNextObject(false)){
                
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
            
            $response["Pdpt"][0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );
        
            $sqlPA = "select a.kode_lokasi,
            sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) end) else 0 end) n1,
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
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB02'
            group by a.kode_lokasi";
            
            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
            $resPA =execute($sqlPA);
            while ($row = $resPA->FetchNextObject(false)){
                
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
            
            $response["Pdpt"][1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );

            $sqlBB = "select a.kode_lokasi,
            sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) else (case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) end) else 0 end) n1,
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
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB03'
            group by a.kode_lokasi";
            
            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
            $resBB =execute($sqlBB);
            while ($row = $resBB->FetchNextObject(false)){
                
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
    
            $response["Beb"][0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );

            $sqlBA = "select a.kode_lokasi,
            sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) end) else 0 end) n1,
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
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB03'
            group by a.kode_lokasi";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

            $resBA =execute($sqlBA);
            while ($row = $resBA->FetchNextObject(false)){
                
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

            $response["Beb"][1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );
            //SHU

            $sqlSHUB = "select a.kode_lokasi,
            sum(case when substring(a.periode,5,2)='01' then a.n2 else 0 end) n1,
            sum(case when substring(a.periode,5,2)='02' then a.n2 else 0 end) n2,   
            sum(case when substring(a.periode,5,2)='03' then a.n2 else 0 end) n3,
            sum(case when substring(a.periode,5,2)='04' then a.n2 else 0 end) n4,
            sum(case when substring(a.periode,5,2)='05' then a.n2 else 0 end) n5,
            sum(case when substring(a.periode,5,2)='06' then a.n2 else 0 end) n6,
            sum(case when substring(a.periode,5,2)='07' then a.n2 else 0 end) n7,
            sum(case when substring(a.periode,5,2)='08' then a.n2 else 0 end) n8,
            sum(case when substring(a.periode,5,2)='09' then a.n2 else 0 end) n9,
            sum(case when substring(a.periode,5,2)='10' then a.n2 else 0 end) n10,
            sum(case when substring(a.periode,5,2)='11' then a.n2 else 0 end) n11,
            sum(case when substring(a.periode,5,2) in ('12','13','14','15') then a.n2 else 0 end) n12   
            from exs_neraca a
            inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi 
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB04'
            group by a.kode_lokasi";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

            $resSHUB =execute($sqlSHUB);
            while ($row = $resSHUB->FetchNextObject(false)){
                
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

            $response["SHU"][0] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );

            $sqlSHU = "select a.kode_lokasi,
            sum(case when substring(a.periode,5,2)='01' then (case when a.jenis_akun='Pendapatan' then -(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) else (case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) end) else 0 end) n1,
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
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik ='DB04'
            group by a.kode_lokasi";

            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;

            $resSHU =execute($sqlSHU);
            while ($row = $resSHU->FetchNextObject(false)){
                
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

            $response["SHU"][1] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getJurnal() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $key = $data['param'];

            $sql="select distinct a.no_bukti,a.tanggal,convert(varchar,tanggal,103) as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
            from gldt_h a
            inner join lokasi b on a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$key' and a.kode_pp='$kode_pp'
            union
            select distinct a.no_bukti,a.tanggal,convert(varchar,tanggal,103) as tgl,a.kode_lokasi,a.periode,b.nama,b.kota
            from gldt a
            inner join lokasi b on a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='$key' and a.kode_pp='$kode_pp'
            order by a.no_bukti ";

            $result = dbRowArray($sql);
            $response["data"] = $result;

            $sql2="select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,b.nama as nama_akun,a.kode_drk,
            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
            from gldt a
            inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='".$result['no_bukti']."' and a.kode_pp='$kode_pp' 
            union all
            select a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.kode_akun,a.keterangan,a.kode_pp,b.nama as nama_akun,a.kode_drk,
            case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
            from gldt_h a
            inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.no_bukti='".$result['no_bukti']."' and a.kode_pp='$kode_pp' 
            order by a.dc desc ";

            $result2 = dbResultArray($sql2);
            $response["data2"] = $result2;


        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKartuPiu() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $key = $data['param'];

            $sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,f.nama as nama_jur,a.id_bank,a.kode_akt,
            isnull(c.nilai,0)+isnull(d.nilai,0)-isnull(e.nilai,0) as so_akhir
            from sis_siswa a
            inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp 
            inner join sis_jur f on b.kode_jur=f.kode_jur and b.kode_lokasi=f.kode_lokasi and b.kode_pp=f.kode_pp
            left join (select a.nis,a.kode_pp,a.kode_lokasi
                        from sis_cd_d a
                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                        group by a.nis,a.kode_pp,a.kode_lokasi
                        )g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
            left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(case when a.dc='D' then nilai else -nilai end) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.periode<'$periode' and a.kode_pp='$kode_pp'
                    group by a.nis,a.kode_lokasi,a.kode_pp
                    )c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp
            left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.dc='D' and a.periode='$periode' and a.kode_pp='$kode_pp'
                    group by a.nis,a.kode_lokasi,a.kode_pp
                    )d on a.nis=d.nis and a.kode_lokasi=d.kode_lokasi and a.kode_pp=d.kode_pp
            left join (select a.nis,a.kode_lokasi,a.kode_pp,sum(a.nilai) as nilai
                    from sis_cd_d a			
                    inner join sis_siswa b on a.nis=b.nis and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
                    where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.dc='C' and a.kode_pp='$kode_pp'
                    group by a.nis,a.kode_lokasi,a.kode_pp
                    )e on a.nis=e.nis and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis='$key'
            order by a.nis ";

            $result = dbRowArray($sql);
            $response["data"] = $result;

            $sql1="select a.no_bill as no_bukti,a.kode_lokasi,b.tanggal,convert(varchar(10),b.tanggal,103) as tgl,
            b.keterangan,'BILL' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
            from (select x.kode_lokasi,x.no_bill,x.kode_param,sum(x.nilai) as tagihan,0 as bayar from sis_bill_d x 
            inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp
            where x.kode_lokasi = '$kode_lokasi' and x.nis='".$result['nis']."' and x.kode_pp='$kode_pp' and x.nilai<>0 
            group by x.kode_lokasi,x.no_bill,x.nis,x.kode_param )a 
            inner join sis_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
            union all select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
            convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'PDD' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param
            from (select x.kode_lokasi,x.no_rekon,x.kode_param,
            case when x.modul in ('BTLREKON') then x.nilai else 0 end as tagihan,case when x.modul <>'BTLREKON' then x.nilai else 0 end as bayar
            from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
            where x.kode_lokasi = '$kode_lokasi' and x.nis='".$result['nis']."' and x.kode_pp='$kode_pp' and x.nilai<>0
            )a 
            inner join sis_rekon_m b on a.no_rekon=b.no_rekon and a.kode_lokasi=b.kode_lokasi 
            union all 
            select a.no_rekon as no_bukti,a.kode_lokasi,b.tanggal,
            convert(varchar(10),b.tanggal,103) as tgl,b.keterangan,'KB' as modul, isnull(a.tagihan,0) as tagihan,isnull(a.bayar,0) as bayar,a.kode_param 
            from (select x.kode_lokasi,x.no_rekon,x.kode_param,
            case when x.modul in ('BTLREKON') then x.nilai else 0 end as tagihan,case when x.modul <>'BTLREKON' then x.nilai else 0 end as bayar
            from sis_rekon_d x inner join sis_siswa y on x.nis=y.nis and x.kode_lokasi=y.kode_lokasi and x.kode_pp=y.kode_pp 
            where x.kode_lokasi = '$kode_lokasi' and x.nis='".$result['nis']."' and x.kode_pp='$kode_pp' and x.nilai<>0 
            )a
            inner join kas_m b on a.no_rekon=b.no_kas and a.kode_lokasi=b.kode_lokasi 
            order by tanggal,modul ";

            $result2 = dbResultArray($sql1);
            $response["data2"] = $result2;


        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getKartuPDD() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $key = $data['param'];

            $sql="select a.nis,a.kode_lokasi,a.kode_pp,a.nama,a.kode_kelas,b.nama as nama_kelas,a.kode_lokasi,b.kode_jur,c.nama as nama_jur,a.kode_akt,a.id_bank
            from sis_siswa a
            inner join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
            inner join sis_jur c on b.kode_jur=c.kode_jur and b.kode_lokasi=c.kode_lokasi and b.kode_pp=c.kode_pp
            inner join (select a.nis,a.kode_pp,a.kode_lokasi
                        from sis_cd_d a
                        where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp'
                        group by a.nis,a.kode_pp,a.kode_lokasi
                        )g on a.nis=g.nis and a.kode_lokasi=g.kode_lokasi and a.kode_pp=g.kode_pp
            where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' and a.nis ='$key'
            order by a.kode_kelas,a.nis ";

            $result = dbRowArray($sql);
            $response["data"] = $result;

            $sql1="select a.no_bukti,a.tgl,a.keterangan,a.modul,a.debet,a.kredit,a.dc
            from (select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                       a.nilai as debet,0 as kredit,a.dc
                from sis_cd_d a
                inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                where a.nis='".$result['nis']."' and a.kode_lokasi='".$result['kode_lokasi']."' and a.kode_pp='".$result['kode_pp']."' and a.dc='D'
                union all
                select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                       case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                from sis_cd_d a
                inner join sis_rekon_m b on a.no_bukti=b.no_rekon and a.kode_lokasi=b.kode_lokasi
                where a.nis='".$result['nis']."' and a.kode_lokasi='".$result['kode_lokasi']."' and a.kode_pp='".$result['kode_pp']."' 
                union all
                select a.no_bukti,a.nilai,convert(varchar(20),b.tanggal,103) as tgl,b.keterangan,b.modul,b.tanggal,
                       0 as debet,case when a.dc='C' then a.nilai else 0 end as kredit,a.dc
                from sis_cd_d a
                inner join kas_m b on a.no_bukti=b.no_kas and a.kode_lokasi=b.kode_lokasi
                where a.nis='".$result['nis']."' and a.kode_lokasi='".$result['kode_lokasi']."' and a.kode_pp='".$result['kode_pp']."'  and a.dc='C'
                            
                )a
            order by a.tanggal 
            ";
            $result2 = dbResultArray($sql1);
            $response["data2"] = $result2;


        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
  

    
?>