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
        $pass = qstr($pass);

        $schema = db_Connect();
        $auth = $schema->SelectLimit("SELECT * FROM hakakses where nik=$user ", 1);
        if($auth->RecordCount() > 0){
            return true;
        }else{
            return false;
        }
    }

    function getPYT() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $bln = substr($periode,5,2);
            $tahun = substr($periode,0,4);
            $per = $bln."/".$tahun;

            $result = dbRowArray("select 8376000000000 as total ");
            $response["data"] = $result;
            $response["label"] = "s.d ".$per;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTotalPiutang() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $bln = substr($periode,5,2);
            $tahun = substr($periode,0,4);
            $per = $bln."/".$tahun;
            $result = dbRowArray("select sum(a.sak_total) as total from (select a.kode_fakultas,a.nama,a.kode_lokasi,(isnull(b.n1,0)-isnull(d.n1,0)-isnull(f.n1,0))+(isnull(c.n1,0)-isnull(g.n1,0))-isnull(e.n1,0) as sak_total
            from aka_fakultas a 
            left join (select y.kode_lokasi,z.kode_fakultas,
                               sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 		
                        group by y.kode_lokasi,z.kode_fakultas		
                        )b on a.kode_fakultas=b.kode_fakultas and a.kode_lokasi=b.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 			
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )c on a.kode_fakultas=c.kode_fakultas and a.kode_lokasi=c.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_rekon_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')			
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )d on a.kode_fakultas=d.kode_fakultas and a.kode_lokasi=d.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total
                        from aka_rekon_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 		
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )e on a.kode_fakultas=e.kode_fakultas and a.kode_lokasi=e.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_batal_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 			
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )f on a.kode_fakultas=f.kode_fakultas and a.kode_lokasi=f.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total			
                        from aka_batal_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 				
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )g on a.kode_fakultas=g.kode_fakultas and a.kode_lokasi=g.kode_lokasi 
            where a.kode_lokasi='$kode_lokasi'
            ) a ");
            $response["total"] = $result["total"];
            $response["label"] = "s.d ".$per;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getTotalOR() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $bln = substr($periode,5,2);
            $tahun = substr($periode,0,4);
            
            $sql = "select a.kode_rasio,a.kode_lokasi,a.kode_neraca,case when b.jenis_akun='Pendapatan' or b.modul='P' then -b.n4 else b.n4 end as nilai2, c.rumus, c.nama as nama_rasio
            from db_rasio_d a
            inner join exs_neraca b on a.kode_lokasi=b.kode_lokasi and a.kode_neraca=b.kode_neraca
            inner join db_rasio_m c on a.kode_rasio=c.kode_rasio and a.kode_lokasi=c.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' and b.periode='$periode' and c.flag_box='1' order by a.kode_rasio";

            $boxras = execute($sql);
            
            while ($row = $boxras->FetchNextObject(false)){
                $nil[] =(array)$row;
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

            foreach($dfr as $d){
                    $p = '';
                    for($z=0; $z<count($d['par']); $z++){
                        $p .= $d['par'][$z]['kode_neraca']." = ".$d['par'][$z]['nilai2']."<br>";

                        ${"a" . $d['par'][$z]['kode_neraca']} = $d['par'][$z]['nilai2'];
                    }
                    $response["data"] = array("nama"=>$d['nama_rasio'],"nilai"=>round(eval('return '.$d['rumus'].';'),2));     
            }
            $response["label"] = $tahun;

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBilling() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];
            $query = dbRowArray("select distinct tahunaka from aka_tahunaka where periode='$periode'");
            $temp = explode("/",$query["tahunaka"]);
            $tahunaka = $temp[0];
            $result = dbRowArray("select sum(nilai) as total from aka_bill_d where tahunaka in ('".$tahunaka."/1','".$tahunaka."/2') and kode_lokasi='$kode_lokasi' and kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR')");
            if($temp[1] == "1"){
                $response["label"] = $tahunaka."/1 & (-) ";
            }else{
                
                $response["label"] = $tahunaka."/1 & ".$tahunaka."/2 ";
            }
            $response["data"] = $result;
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
            $pembagi = 1000000;
            
            $sql="select a.kode_lokasi,
            sum(case when a.umur<=6 then a.n1 else 0 end) as n1,
            sum(case when a.umur between 7 and 12 then a.n1 else 0 end) as n2,
            sum(case when a.umur between 13 and 24 then a.n1 else 0 end) as n3,
            sum(case when a.umur>24 then a.n1 else 0 end) as n4
            from (select a.no_bill,a.kode_lokasi,a.periode,
                    datediff(month,convert(datetime, a.periode+'01'),convert(datetime, '$periode'+'01')) as umur,
                    isnull(a.n1,0)-isnull(b.n1,0) as n1
                    from (select x.no_bill,x.kode_lokasi,x.periode,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as n1	
                            from aka_bill_d x 	
                            where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') 		
                            group by x.no_bill,x.kode_lokasi,x.periode	
                            )a
                    left join (select substring(x.no_inv,1,15) as no_bill,x.kode_lokasi,
                            sum(case when x.dc='D' then x.nilai else -x.nilai end) as n1	
                            from aka_rekon_d x 	
                            where(x.kode_lokasi = '$kode_lokasi')and(x.periode <= '$periode') 		
                            group by substring(x.no_inv,1,15),x.kode_lokasi
                    )b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
                    where a.kode_lokasi = '$kode_lokasi' 
                )a
               group by a.kode_lokasi
             ";

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

    function getPiuFakultas() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $query = dbRowArray("select distinct tahunaka from aka_tahunaka where periode='$periode'");
            $response["label"] = "s.d ".$query["tahunaka"];

            $result = dbResultArray("select a.kode_fakultas,a.nama,a.kode_lokasi,(isnull(b.n1,0)-isnull(d.n1,0)-isnull(f.n1,0))+(isnull(c.n1,0)-isnull(g.n1,0))-isnull(e.n1,0) as sak_total
            from aka_fakultas a 
            left join (select y.kode_lokasi,z.kode_fakultas,
                               sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 		
                        group by y.kode_lokasi,z.kode_fakultas		
                        )b on a.kode_fakultas=b.kode_fakultas and a.kode_lokasi=b.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 			
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )c on a.kode_fakultas=c.kode_fakultas and a.kode_lokasi=c.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_rekon_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')			
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )d on a.kode_fakultas=d.kode_fakultas and a.kode_lokasi=d.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total
                        from aka_rekon_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 		
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )e on a.kode_fakultas=e.kode_fakultas and a.kode_lokasi=e.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_batal_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 			
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )f on a.kode_fakultas=f.kode_fakultas and a.kode_lokasi=f.kode_lokasi 
            left join (select y.kode_lokasi,z.kode_fakultas,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total			
                        from aka_batal_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi
                        inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 				
                        group by y.kode_lokasi,z.kode_fakultas 			
                        )g on a.kode_fakultas=g.kode_fakultas and a.kode_lokasi=g.kode_lokasi 
            where a.kode_lokasi='$kode_lokasi' and (isnull(b.n1,0)-isnull(d.n1,0)-isnull(f.n1,0))+(isnull(c.n1,0)-isnull(g.n1,0))-isnull(e.n1,0) <> 0
            order by a.kode_fakultas ");

            $Piutang = array();
            $ctg = array();
            foreach ($result as $row){
                $Piutang[] =array('y'=>round(floatval($row["sak_total"])/1000000,2),'name'=>$row["nama"],'drilldown'=>$row["kode_fakultas"]);
                $ctg[] = $row["nama"];
            }

            $sql = "select a.kode_jur,a.kode_fakultas,a.nama,a.kode_lokasi,(isnull(b.n1,0)-isnull(d.n1,0)-isnull(f.n1,0))+(isnull(c.n1,0)-isnull(g.n1,0))-isnull(e.n1,0) as sak_total
            from aka_jurusan a 
            left join (select y.kode_lokasi,y.kode_jur,
                               sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 		
                        group by y.kode_lokasi,y.kode_jur		
                        )b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi 
            left join (select y.kode_lokasi,y.kode_jur,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 			
                        group by y.kode_lokasi,y.kode_jur 			
                        )c on a.kode_jur=c.kode_jur and a.kode_lokasi=c.kode_lokasi 
            left join (select y.kode_lokasi,y.kode_jur,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_rekon_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')			
                        group by y.kode_lokasi,y.kode_jur 			
                        )d on a.kode_jur=d.kode_jur and a.kode_lokasi=d.kode_lokasi 
            left join (select y.kode_lokasi,y.kode_jur,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total
                        from aka_rekon_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi 
                        
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 		
                        group by y.kode_lokasi,y.kode_jur 			
                        )e on a.kode_jur=e.kode_jur and a.kode_lokasi=e.kode_lokasi 
            left join (select y.kode_lokasi,y.kode_jur,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_batal_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi  
                        
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 			
                        group by y.kode_lokasi,y.kode_jur 			
                        )f on a.kode_jur=f.kode_jur and a.kode_lokasi=f.kode_lokasi 
            left join (select y.kode_lokasi,y.kode_jur,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total			
                        from aka_batal_d x 			
                        inner join aka_mahasiswa y on x.nim=y.nim and x.kode_lokasi=y.kode_lokasi
                        
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 				
                        group by y.kode_lokasi,y.kode_jur 			
                        )g on a.kode_jur=g.kode_jur and a.kode_lokasi=g.kode_lokasi 
            where a.kode_lokasi='$kode_lokasi' and (isnull(b.n1,0)-isnull(d.n1,0)-isnull(f.n1,0))+(isnull(c.n1,0)-isnull(g.n1,0))-isnull(e.n1,0) <> 0
            order by a.kode_fakultas
            ";
            $rsDrilP =execute($sql);
        
            $grouping = array();
            $series = array();
            while($row = $rsDrilP->FetchNextObject(false)){
               
                if (!isset($grouping[$row->kode_fakultas])){
                    $tmp["data"][]="";
                    $tmp = array("name" => $row->kode_fakultas, "id" => $row->kode_fakultas,  "data" => array() );
                }
                $tmp["data"][] = array($row->nama, round(floatval($row->sak_total)/1000000,2));
                $grouping[$row->kode_fakultas] = $tmp;
                array_push($series,$grouping[$row->kode_fakultas]);
                
            }  
            $response["series"] = $series;
            $response["data"] = $Piutang;
            $response["ctg"] = $ctg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPdptFakultas() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $query = dbRowArray("select distinct tahunaka from aka_tahunaka where periode='$periode'");
            $response["label"] = "s.d ".$query["tahunaka"];

            $result = dbResultArray("select a.kode_fakultas, a.nama,isnull(b.nilai,0) as nilai 
            from aka_fakultas a 
            left join(
            select z.kode_fakultas,a.kode_lokasi,sum(a.nilai) as nilai from aka_rekon_d a 
            inner join aka_mahasiswa y on a.nim=y.nim and a.kode_lokasi=y.kode_lokasi  
            inner join aka_jurusan z on y.kode_jur=z.kode_jur and y.kode_lokasi=z.kode_lokasi 
            where a.periode <='$periode' and a.kode_lokasi='$kode_lokasi' and a.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR')
            group by z.kode_fakultas,a.kode_lokasi
            ) b on a.kode_fakultas=b.kode_fakultas and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi' ");

            $pdpt = array();
            $ctg = array();
            foreach ($result as $row){
                $pdpt[] =array('y'=>round(floatval($row["nilai"]/1000000),2),'name'=>$row["nama"],'drilldown'=>$row["kode_fakultas"]);
                $ctg[] = $row["nama"];
            }

            $sql = "select a.kode_jur,a.kode_fakultas,a.nama,isnull(b.nilai,0) as nilai 
            from aka_jurusan a 
            left join(
            select y.kode_jur,a.kode_lokasi,sum(a.nilai) as nilai from aka_rekon_d a 
            inner join aka_mahasiswa y on a.nim=y.nim and a.kode_lokasi=y.kode_lokasi  
            where a.periode <='$periode' and a.kode_lokasi='$kode_lokasi' and a.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR')
            group by y.kode_jur,a.kode_lokasi
            ) b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi='$kode_lokasi'
            ";
            $rsDrilP =execute($sql);
        
            $grouping = array();
            $series = array();
            while($row = $rsDrilP->FetchNextObject(false)){
               
                if (!isset($grouping[$row->kode_fakultas])){
                    $tmp["data"][]="";
                    $tmp = array("name" => $row->kode_fakultas, "id" => $row->kode_fakultas,  "data" => array() );
                }
                $tmp["data"][] = array($row->nama, round(floatval($row->nilai/1000000),2));
                $grouping[$row->kode_fakultas] = $tmp;
                array_push($series,$grouping[$row->kode_fakultas]);
                
            }  
            $response["series"] = $series;      
            $response["data"] = $pdpt;
            $response["ctg"] = $ctg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
    function getPiuParam() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $query = dbRowArray("select distinct tahunaka from aka_tahunaka where periode='$periode'");
            $response["label"] = "s.d ".$query["tahunaka"];

            $result = dbResultArray("select a.kode_produk,(isnull(a.total,0)-isnull(d.total,0)-isnull(f.total,0))
            +(isnull(c.total,0)-isnull(g.total,0))-isnull(e.total,0) as sak_total
            from (select x.kode_lokasi,x.kode_produk, sum(x.nilai) as total		
                from aka_bill_d x 
                where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_produk in('BPPP','UP3','SDP2') 		
                group by x.kode_lokasi,x.kode_produk		
            )a
            left join (select x.kode_lokasi,x.kode_produk, sum(x.nilai) as total	
                        from aka_bill_d x 
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' and x.kode_produk in('BPPP','UP3','SDP2') 	
                        group by x.kode_lokasi,x.kode_produk			
                        )c on a.kode_produk=c.kode_produk  and a.kode_lokasi=c.kode_lokasi 
            left join (select x.kode_lokasi,x.kode_produk, sum(x.nilai) as total		
                        from aka_rekon_d x 			
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode') and x.kode_produk in('BPPP','UP3','SDP2') 		
                        group by x.kode_lokasi,x.kode_produk			
                        )d on a.kode_produk=d.kode_produk  and a.kode_lokasi=d.kode_lokasi 
            left join (select x.kode_lokasi,x.kode_produk, sum(x.nilai) as total
                        from aka_rekon_d x 		
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' and x.kode_produk in('BPPP','UP3','SDP2')
                        group by x.kode_lokasi,x.kode_produk			
                        )e on a.kode_produk=e.kode_produk  and a.kode_lokasi=e.kode_lokasi 
            left join (select x.kode_lokasi,x.kode_produk, sum(x.nilai) as total	
                        from aka_batal_d x 		
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') and x.kode_produk in('BPPP','UP3','SDP2')
                        group by x.kode_lokasi,x.kode_produk	
                        )f on a.kode_produk=f.kode_produk  and  a.kode_lokasi=f.kode_lokasi 
            left join (select x.kode_lokasi,x.kode_produk, sum(x.nilai) as total		
                        from aka_batal_d x 	
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' and x.kode_produk in('BPPP','UP3','SDP2')
                        group by x.kode_lokasi,x.kode_produk	
                        )g on a.kode_produk=g.kode_produk  and a.kode_lokasi=g.kode_lokasi 
            where a.kode_lokasi='$kode_lokasi' and a.kode_produk in('BPPP','UP3','SDP2')
            order by a.kode_produk
            ");

            $piu = array();
            $ctg = array();
            foreach ($result as $row){
                $piu[] =array('y'=>round(floatval($row["sak_total"]/1000000),2),'name'=>$row["kode_produk"],'key'=>$row["kode_produk"]);
                $ctg[] = $row["kode_produk"];
            }
      
            $response["data"] = $piu;
            $response["ctg"] = $ctg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    

    function getPiuTahunAka() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $kode_pp = $_SESSION['kodePP'];
            $periode = $data['periode'];

            $query = dbRowArray("select distinct tahunaka from aka_tahunaka where periode='$periode'");
            $response["label"] = "s.d ".$query["tahunaka"];

            $result = dbResultArray("select distinct a.tahunaka,a.kode_lokasi,(isnull(b.n1,0)-isnull(d.n1,0)-isnull(f.n1,0))+(isnull(c.n1,0)-isnull(g.n1,0))-isnull(e.n1,0) as sak_total
            from aka_tahunaka a 
			left join(select x.kode_lokasi,x.tahunaka,
                               sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 			  
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 		
                        group by x.kode_lokasi,x.tahunaka		
                        )b on a.tahunaka=b.tahunaka and a.kode_lokasi=b.kode_lokasi
            left join (select  x.kode_lokasi,x.tahunaka,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_bill_d x 		                        
						where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 			
                        group by x.kode_lokasi,x.tahunaka		
                        )c on a.tahunaka=c.tahunaka and a.kode_lokasi=c.kode_lokasi 
            left join (select x.kode_lokasi,y.tahunaka,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_rekon_d x 			
                        inner join aka_tahunaka y on x.periode=y.periode and x.kode_lokasi=y.kode_lokasi 
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode <'$periode')			
                        group by x.kode_lokasi,y.tahunaka 			
                        )d on a.tahunaka=d.tahunaka and a.kode_lokasi=d.kode_lokasi 
            left join (select x.kode_lokasi,y.tahunaka,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total
                        from aka_rekon_d x 			
                        inner join aka_tahunaka y on x.periode=y.periode and x.kode_lokasi=y.kode_lokasi 
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 		
                        group by x.kode_lokasi,y.tahunaka 			
                        )e on a.tahunaka=e.tahunaka and a.kode_lokasi=e.kode_lokasi 
            left join (select x.kode_lokasi,y.tahunaka,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total		
                        from aka_batal_d x 			
                        inner join aka_tahunaka y on x.periode=y.periode and x.kode_lokasi=y.kode_lokasi  
                        where(x.kode_lokasi = '$kode_lokasi')and(x.periode < '$periode') 			
                        group by x.kode_lokasi,y.tahunaka 			
                        )f on a.tahunaka=f.tahunaka and a.kode_lokasi=f.kode_lokasi 
            left join (select x.kode_lokasi,y.tahunaka,sum(case when x.kode_produk in ('BPPP','BPPNP','SDP2','PERPUS','UP3','SKS','DENDA','USTATUS','ASUR') then (case when x.dc='D' then x.nilai else -x.nilai end) else 0 end) as n1,
                               sum(x.nilai) as total			
                        from aka_batal_d x 			
                        inner join aka_tahunaka y on x.periode=y.periode and x.kode_lokasi=y.kode_lokasi
                        where(x.kode_lokasi = '$kode_lokasi') and x.periode='$periode' 				
                        group by x.kode_lokasi,y.tahunaka 			
                        )g on a.tahunaka=g.tahunaka and a.kode_lokasi=g.kode_lokasi 
            where a.kode_lokasi='$kode_lokasi' and (isnull(b.n1,0)-isnull(d.n1,0)-isnull(f.n1,0))+(isnull(c.n1,0)-isnull(g.n1,0))-isnull(e.n1,0) <> 0
            order by a.tahunaka
            ");

            $piu = array();
            $ctg = array();
            foreach ($result as $row){
                $piu[] =array('y'=>round(floatval($row["sak_total"]/1000000),2),'name'=>$row["tahunaka"],'key'=>$row["tahunaka"]);
                $ctg[] = $row["tahunaka"];
            }
      
            $response["data"] = $piu;
            $response["ctg"] = $ctg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }
    
?>