<?php

    $request_method=$_SERVER["REQUEST_METHOD"];

    switch($request_method) {
        case 'GET':
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        case 'POST':
            // Insert 
            if(isset($_GET["fx"]) AND function_exists($_GET['fx'])){
                $_GET['fx']();
            }
        break;
        default:
            // Invalid Request Method
            header("HTTP/1.0 405 Method Not Allowed");
        break;
    }

    function getKoneksi(){
        $root_lib=realpath($_SERVER["DOCUMENT_ROOT"])."/";
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
    }

    function tes(){
        getKoneksi();
        $response["data"] = dbResultArray("select distinct periode from periode");
        echo json_encode($response);
    }

    function view(){
        getKoneksi();
        $response["data"] = dbResultArray("select * from inv_roi_total where periode='201907' ");
        $periode = $_GET["periode"];
        $bln = substr($periode,4,2);
        $tw = array(
            "01"=>"tw1",
            "02"=>"tw1",
            "03"=>"tw1",
            "04"=>"tw2",
            "05"=>"tw2",
            "06"=>"tw2",
            "07"=>"tw3",
            "08"=>"tw3",
            "09"=>"tw3",
            "10"=>"tw4",
            "11"=>"tw4",
            "12"=>"tw4"
        );
        $response["tw"] = $tw[$bln];
        header('Content-Type: application/json');
        echo json_encode($response);
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


    function hitungROI(){
        
        session_start();
        getKoneksi();
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){  
            $periode = $_POST['periode'];
            $kode_lokasi = $_POST['kode_lokasi'];
            
            $bulan = substr($periode,4,2); 
            $tahun = substr($periode,0,4);
            $tw = array(
                "01"=>"tw1",
                "02"=>"tw1",
                "03"=>"tw1",
                "04"=>"tw2",
                "05"=>"tw2",
                "06"=>"tw2",
                "07"=>"tw3",
                "08"=>"tw3",
                "09"=>"tw3",
                "10"=>"tw4",
                "11"=>"tw4",
                "12"=>"tw4"
            );
            $twke = $tw[$bulan];
            $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'$tahun-$bulan-01')+1,0)) ,112),7,2) as tglakhir";
            $res = execute($sql);
            $tgl = $res->fields[0];

            $tgl_awal = "$tahun-$bulan-01";
            $tgl_akhir = "$tahun-$bulan-$tgl";

            //store proc
            $sql="exec sp_gen_roi_kkp '$tgl_akhir' ";
            $sp = execute($sql);

            $sql="update inv_roi_total set roi_hari=1 where roi_hari=0 ";
            $upd0 = execute($sql);

            //roi_bulan
            $sql = "select tanggal,roi_hari from inv_roi_total where kode_plan='1' and tanggal between '$tgl_awal' and '$tgl_akhir'
            order by tanggal";
            $row=dbResultArray($sql);
            $series = array();
            $exec = array();
            $a=0;
            for($a=0;$a<count($row);$a++){
                $sql2 = "select DateDiff ( Day, '$tgl_awal', '".$row[$a]['tanggal']."') as jum ";
                $rs2=execute($sql2);
                $jumlah_hari = $rs2->fields[0];
                $total = 1;
                if($jumlah_hari > 0){
                    for($i=1;$i<$jumlah_hari+1;$i++){
                        $total = $total * $row[$i]['roi_hari'];
                        
                        $nil = $total;
                    }
                }else{
                    $nil = $row[$a]['roi_hari'];
                }
                $roi = ($nil)-1;
                array_push($series,$roi);
                $upd = "update inv_roi_total set roi_bulan = $roi where tanggal='".$row[$a]['tanggal']."' ";
                array_push($exec,$upd);
            }
            //roi ytd
            $sql3 = "select tanggal,roi_hari from inv_roi_total where kode_plan='1' and tanggal between '$tahun-01-01' and '$tgl_akhir'
            order by tanggal";
            $row2=dbResultArray($sql3);
            $series2 = array();
            $a=0;
            for($a=0;$a<count($row2);$a++){
                $sql4 = "select DateDiff ( Day, '$tahun-01-01', '".$row2[$a]['tanggal']."') as jum ";
                $rs3=execute($sql4);
                $jumlah_hari = $rs3->fields[0];
                $total = 1;
                if($jumlah_hari > 0){
                    for($i=1;$i<$jumlah_hari+1;$i++){
                        $total = $total * $row2[$i]['roi_hari'];
                        
                        $nil = $total;
                    }
                }else{
                    $nil = $row2[$a]['roi_hari'];
                }
                $roi2 = ($nil)-1;
                array_push($series2,$roi2);
                $upd2 = "update inv_roi_total set roi_ytd = $roi2 where tanggal='".$row2[$a]['tanggal']."' ";
                array_push($exec,$upd2);
            }

             //roi tw
             switch($twke){
                case "tw1":
                $tglMulai = "$tahun-01-01";
                break;
                case "tw2":
                $tglMulai = "$tahun-04-01";
                break;
                case "tw3":
                $tglMulai = "$tahun-07-01";
                break;
                case "tw4":
                $tglMulai = "$tahun-10-01";
                break;
             }
             $sql5 = "select tanggal,roi_hari from inv_roi_total where kode_plan='1' and tanggal between '$tglMulai' and '$tgl_akhir'
             order by tanggal";
             $row3=dbResultArray($sql5);
             $series3 = array();
             $a=0;
             for($a=0;$a<count($row3);$a++){
                 $sql6 = "select DateDiff ( Day, '$tglMulai', '".$row3[$a]['tanggal']."') as jum ";
                 $rs4=execute($sql6);
                 $jumlah_hari = $rs4->fields[0];
                 $total = 1;
                 if($jumlah_hari > 0){
                     for($i=1;$i<$jumlah_hari+1;$i++){
                         $total = $total * $row3[$i]['roi_hari'];
                         
                         $nil = $total;
                     }
                 }else{
                     $nil = $row3[$a]['roi_hari'];
                 }
                 $roi3 = ($nil)-1;
                 array_push($series3,$roi3);
                 $upd3 = "update inv_roi_total set roi_tw = $roi3 where tanggal='".$row3[$a]['tanggal']."' ";
                 array_push($exec,$upd3);
             }

            // $response["rows"]=count($row);
            // $response["series"]=$series;  
            // $response["series2"]=$series2; 
            // $response["exec"]=$exec;  
            // $response["exec2"]=$exec2; 
            $hasil = executeArray($exec);
            $hasil = true;
            if($hasil){
                $msg = "Generate data berhasil";
                $sts = true;
            }else{
                $msg = "Generate data gagal";
                $sts = false;
            }  

            $query = "select kode_plan,periode,tanggal,kas_masuk,kas_keluar,beban,nab,roi_hari,roi_bulan,roi_tw,roi_ytd from inv_roi_total
            where periode= '".$periode."' and kode_plan='1' ";
            $response['data'] = dbResultArray($query);
            
            $response["status"] = $sts;
            $response["message"] = $msg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        echo json_encode($response);
    }

    function joinNumber($num){
        // menggabungkan angka yang di-separate(10.000,75) menjadi 10000.00
        $num = str_replace(".", "", $num);
        $num = str_replace(",", ".", $num);
        return $num;
    }

    function hitungROI2(){
        
        session_start();
        getKoneksi();
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){  
            $periode = $_POST['periode'];
            $kode_lokasi = $_POST['kode_lokasi'];
            $nik=$_SESSION['userLog'];
            $tanggal = $_POST['tanggal'];
            
            $bulan = substr($periode,4,2); 
            $tahun = substr($periode,0,4);
            
            $sql = "select substring(convert(varchar,  dateadd(s,-1,dateadd(mm, datediff(m,0,'$tahun-$bulan-01')+1,0)) ,112),7,2) as tglakhir";
            $res = execute($sql);
            $tgl = $res->fields[0];

            $tgl_awal = "$tahun-$bulan-01";
            $tgl_akhir = "$tahun-$bulan-$tgl";

            // store proc
            $exins = array();
            $sql="exec sp_gen_roi_kkp '$tgl_awal'; ";
            // $sp = execute($sql);
            array_push($exins,$sql);

            $sql2="exec sp_gen_roi_kelas_subkelas '$tgl_awal','$kode_lokasi','5050','1','$nik' ";
            // $sp2 = execute($sql2);
            array_push($exins,$sql2);

            $sql3="exec sp_gen_roikelas_simple '$tgl_akhir'"; 
            // $sp3 = execute($sql3);
            array_push($exins,$sql3);

            $sql4="exec sp_gen_roitot_simple '$tgl_akhir' "; 
            // $sp4 = execute($sql4);
            array_push($exins,$sql4);

            // // ROI KKP
            // $sql = "select *
            // from  inv_roi_total where kode_plan='1' and periode='$periode'
            // union all
            // select * 
            // from  inv_roi_total where kode_plan='1' and tanggal= dateadd(day,-1,'$tahun-$bulan-01')
            // order by tanggal";
            // $row=dbResultArray($sql);

            
            // $series = array();
            // $series_ytd = array();
            // $series_bln = array();
            // $exec = array();

            // $sql2 = "
            // select * 
            // from  inv_roi_total where kode_plan='1' and tanggal= dateadd(day,-1,'$tahun-01-01')
            // order by tanggal";
            // $row2=dbResultArray($sql2);
            // if(count($row2) > 0 && (floatval($row2[0]['roi_ytd']) != "" OR floatval($row2[0]['roi_ytd']) != 0)){
            //     $roiytd= floatval($row2[0]['roi_ytd']);
            //     array_push($series_ytd,$roiytd);
            // }else{
            //     $roiytd= 1;
            //     array_push($series_ytd,$roiytd);
            // }

            // $a=0;
            // for($a=0;$a<count($row);$a++){
            //     if($a == 0){
            //         $roi_hari = floatval($row[$a]["roi_hari"]);
            //         if(floatval($row[$a]["roi_bulan"]) =="" or floatval($row[$a]["roi_bulan"]) == 0){
            //             $roi_bulan = 1;
            //         }else{
            //             $roi_bulan = floatval($row[$a]["roi_bulan"]);
            //         }

            //         if($bulan == "01" or $bulan == "1"){

            //             $roi_ytd= $roiytd;
            //         }else{

            //             $roi_ytd = (($roi_bulan/$roiytd) - 1)*100;
            //         }
                    
                    
            //         array_push($series_bln,$roi_bulan);
            //     }else{
            //         $roi_hari = (floatval($row[$a]["nab"])+floatval($row[$a]["beban"]))/floatval($row[$a-1]["nab"]); 
            //         $roi_bulan = $roi_hari * $series_bln[$a-1];

            //         $roi_ytd = (($roi_bulan/$roiytd) - 1)*100;
                    
            //         array_push($series_bln,$roi_bulan);
            //     }
            //     array_push($series,$roi_hari);

            //     $upd = "update inv_roi_total set roi_hari = $roi_hari, roi_bulan = $roi_bulan, roi_ytd = $roi_ytd where tanggal='".$row[$a]['tanggal']."' ";
            //     array_push($exec,$upd);
            // }

            // ROI KELAS

            
            // $exec2 = array();
            // $sqlm = "select distinct a.modul from inv_roi_beban a where a.periode='$periode' ";
            // $rowm = dbResultArray($sqlm);
            // for($m=0;$m<count($rowm);$m++){

            //     $sql = "select periode,tanggal,modul,beli-(mi_fee+b_trans+kustodi+jasa_ahli+deviden+jual) as beban,nab,roi_hitung,roi_persen,roi_hitung2
            //     from  inv_roi_beban where periode='$periode' and modul='".$rowm[$m]["modul"]."'
            //     union all
            //     select periode,tanggal,modul,mi_fee+b_trans+kustodi+jasa_ahli as beban,nab,roi_hitung,roi_persen,roi_hitung2
            //     from  inv_roi_beban where tanggal= dateadd(day,-1,'$tahun-$bulan-01') and modul='".$rowm[$m]["modul"]."'
            //     order by tanggal";
            //     $row3=dbResultArray($sql);
    
            //     $series2 = array();
            //     $series2_ytd = array();
            //     $series2_bln = array();
    
            //     $sql2 = "
            //     select periode,tanggal,modul,beli-(mi_fee+b_trans+kustodi+jasa_ahli+deviden+jual) as beban,nab,roi_hitung,roi_hitung2,roi_persen
            //     from  inv_roi_beban where tanggal= dateadd(day,-1,'$tahun-01-01') and modul='".$rowm[$m]["modul"]."'
            //     order by tanggal";
            //     $row4=dbResultArray($sql2);
            //     if(count($row4) > 0 && (floatval($row4[0]['roi_persen']) != "" OR floatval($row4[0]['roi_persen']) != 0)){
            //         $roiytd2= floatval($row4[0]['roi_persen']);
            //         array_push($series2_ytd,$roiytd2);
            //     }else{
            //         $roiytd2= 1;
            //         array_push($series2_ytd,$roiytd2);
            //     }
    
            //     $a=0;
            //     for($a=0;$a<count($row3);$a++){
            //         if($a == 0){
            //             $roi_hari2 = floatval($row3[$a]["roi_hitung"]);
            //             if(floatval($row3[$a]["roi_hitung2"]) =="" || floatval($row3[$a]["roi_hitung2"]) == 0){
            //                 $roi_bulan2 = 1;
            //             }else{
            //                 $roi_bulan2 = floatval($row3[$a]["roi_hitung2"]);
            //             }
    
            //             if($bulan == "01" || $bulan == "1"){

            //                 $roi_ytd2= $roiytd2;
            //             }else{
    
            //                 $roi_ytd2 = (($roi_bulan2/$roiytd2) - 1)*100;
            //             }
                        
            //             array_push($series2_bln,$roi_bulan2);
            //         }else{
            //             $roi_hari2 = (floatval($row3[$a]["nab"])-floatval($row3[$a]["beban"]))/floatval($row3[$a-1]["nab"]); 
            //             $roi_bulan2 = $roi_hari2 * $series2_bln[$a-1];
    
            //             $roi_ytd2 = (($roi_bulan2/$roiytd2) - 1)*100;
                        
            //             array_push($series2_bln,$roi_bulan2);
            //         }
            //         array_push($series2,$roi_hari2);
    
            //         $upd2 = "update inv_roi_beban set roi_hitung = $roi_hari2, roi_hitung2 = $roi_bulan2, roi_persen = $roi_ytd2 where tanggal='".$row3[$a]['tanggal']."' and modul='".$rowm[$m]["modul"]."' ";
            //         array_push($exec2,$upd2);
            //     }
            // }

            
            // $hasil = executeArray($exec);
            // $hasil2 = executeArray($exec2);
            // $hasil = true;
            // $hasil2= true;
            
           
            $del = "delete from inv_bmark_bobot where periode='$periode' ";
            array_push($exins,$del);
            $ins = "insert into inv_bmark_bobot (periode,idx80,sri,tgl_input,nik_user) values ('$periode',".joinNumber($_POST['idx80']).",".joinNumber($_POST['sri']).",getdate(),'$nik')";
            array_push($exins,$ins);
            $response['sql'] = $exins;
            $rsins = executeArray($exins,$err);

            if ($err == null)
            {	
                // CommitTrans();
                $tmp="Sukses disimpan. No Bukti :".$id;
                $sts=true;
            }else{
                // RollbackTrans();
                $tmp="Gagal disimpan".$err;
                $sts=false;
            }		

            if($sts){
                $msg = "Generate data berhasil. ".$tmp;
                $sts = true;
            }else{
                $msg = "Generate data gagal. ".$tmp;
                $sts = false;
            }  

            $query = "select kode_plan,periode,tanggal,kas_masuk,kas_keluar,beban,nab,roi_hari,roi_bulan,roi_tw,roi_ytd from inv_roi_total
            where periode= '".$periode."' and kode_plan='1' order by tanggal ";
            $response['data'] = dbResultArray($query);

            $query2 = "select periode,tanggal,modul,beli-(mi_fee+b_trans+kustodi+jasa_ahli+deviden+jual) as beban,nab,roi_hitung,roi_hitung2,roi_persen from inv_roi_beban
            where periode= '".$periode."' order by tanggal";
            $response['data2'] = dbResultArray($query2);

            $query2 = "select periode,tanggal,modul,beli-(mi_fee+b_trans+kustodi+jasa_ahli+deviden+jual) as beban,nab,roi_hitung,roi_hitung2,roi_persen from inv_roi_subkelas
            where periode= '".$periode."' order by tanggal";
            $response['data3'] = dbResultArray($query2);
            
            $response["status"] = $sts;
            $response["roi_series"] = $series2_bln;
            $response["message"] = $msg;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
            $response["status"] = false; 
        }     
        echo json_encode($response);
    }
?>