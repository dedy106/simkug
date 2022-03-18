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

    function getTotalPiu() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $result = dbRowArray("select kode_neraca,nama,n4 from exs_neraca_pp where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' and periode='$periode' and kode_neraca='113' and kode_fs='FS1' ");
            $response["data"] = $result;
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
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
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

    function getAgingPiutang() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
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

    function getProfitLossPP() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
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
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03')  and a.kode_pp='$kode_pp'
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

    function getBudgetActualTahun() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $pend = dbRowArray("select a.kode_lokasi,
            sum(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) n1,
			sum(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) gar
            from exs_neraca_pp a
            inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB02') and a.kode_pp='$kode_pp'
            group by a.kode_lokasi");

            $response["pend"] = $pend;

            $beban = dbRowArray("select a.kode_lokasi,
            sum(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) n1,
			sum(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) gar
            from exs_neraca_pp a
            inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='".substr($periode,0,4)."' and b.kode_grafik in ('DB03') and a.kode_pp='$kode_pp'
            group by a.kode_lokasi");

            $response["beban"] = $beban;
            $response["persenPend"] = round(($pend["n1"]/$pend["gar"])*100,2);
            $response["persenBeban"] = round(($beban["n1"]/$beban["gar"])*100,2);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBudgetActualBulan() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $pend = dbRowArray("select a.kode_lokasi,
            sum(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) n1,
			sum(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) gar
            from exs_neraca_pp a
            inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_grafik in ('DB02') and a.kode_pp='$kode_pp'
            group by a.kode_lokasi");

            $response["pend"] = $pend;

            $beban = dbRowArray("select a.kode_lokasi,
            sum(case when a.jenis_akun='Pendapatan' then -a.n4 else a.n4 end) n1,
			sum(case when a.jenis_akun='Pendapatan' then -a.n2 else a.n2 end) gar
            from exs_neraca_pp a
            inner join db_grafik_d b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and b.kode_grafik in ('DB03') and a.kode_pp='$kode_pp'
            group by a.kode_lokasi");

            $response["beban"] = $beban;
            $response["persenPend"] = round(($pend["n1"]/$pend["gar"])*100,2);
            $response["persenBeban"] = round(($beban["n1"]/$beban["gar"])*100,2);
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getProgressBeban() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $aju = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["aju"] = $aju["jum"];
            
            $serahDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["serahDok"] = $serahDok["jum"];

            $verDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verDok"] = $verDok["jum"];

            $verAk = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verAk"] = $verAk["jum"];

            $sPB = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["sPB"] = $sPB["jum"];

            $Pbyr = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["Pbyr"] = $Pbyr["jum"];


        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getProgressPanjar() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $aju = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["aju"] = $aju["jum"];
            
            $serahDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["serahDok"] = $serahDok["jum"];

            $verDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verDok"] = $verDok["jum"];

            $verAk = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verAk"] = $verAk["jum"];

            $sPB = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["sPB"] = $sPB["jum"];

            $Pbyr = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["Pbyr"] = $Pbyr["jum"];


        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getProgressHonor() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $aju = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["aju"] = $aju["jum"];
            
            $serahDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["serahDok"] = $serahDok["jum"];

            $verDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verDok"] = $verDok["jum"];

            $verAk = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verAk"] = $verAk["jum"];

            $sPB = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["sPB"] = $sPB["jum"];

            $Pbyr = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["Pbyr"] = $Pbyr["jum"];

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getProgressIF() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $aju = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["aju"] = $aju["jum"];
            
            $serahDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["serahDok"] = $serahDok["jum"];

            $verDok = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verDok"] = $verDok["jum"];

            $verAk = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["verAk"] = $verAk["jum"];

            $sPB = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["sPB"] = $sPB["jum"];

            $Pbyr = dbRowArray("select count(*) as jum from it_aju_m ");
            $response["Pbyr"] = $Pbyr["jum"];

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
    function getInfoPBH() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $info = dbResultArray("select 'BBN-0719-00005' as no_bukti,'Beban' as jenis, 'VA' as va,'22/08/2019' as tgl, '1' as status,'-' as catatan
            union 
            select 'BBN-0719-00006' as no_bukti,'Beban' as jenis, 'VA' as va,'22/08/2019' as tgl, '0' as status, 'deskripsi reject' as catatan
            ");
            $response["info"] = $info;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getDaftarPiutang() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'],$_SESSION['userPwd'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $info = dbResultArray("select 'nim' as nim,'nama' as nama,'tahun' as ta
            ");
            $response["info"] = $info;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getQR(){
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/app/belajar/qrcode";
        $root=$_SERVER["DOCUMENT_ROOT"]."/web/app/belajar/qrcode";
		include $root."/phpqrcode/qrlib.php"; //<-- LOKASI FILE UTAMA PLUGINNYA
 
        $tempdir = $_SERVER["DOCUMENT_ROOT"]."/web/app/belajar/qrcode/temp/"; 
         // #parameter inputan
         $no_aju=$_GET['no_aju'];
         $isi_teks = $_GET['no_aju'];
         $namafile = $_GET['no_aju'].".png";
         $quality = 'H'; //ada 4 pilihan, L (Low), M(Medium), Q(Good), H(High)
         $ukuran = 5; //batasan 1 paling kecil, 10 paling besar
         $padding = 0;
         
         QRCode::png($isi_teks,$tempdir.$namafile,$quality,$ukuran,$padding);

         echo "<img alt='".$_GET['no_aju']."' src='$root_app/temp/$no_aju.png'>";
    }
   ?>