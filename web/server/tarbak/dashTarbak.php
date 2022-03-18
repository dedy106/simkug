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

    function getPeriode2(){
        session_start();
        // getKoneksi();
        // $data=$_GET;
        // if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            // $perusahan = dbResultArray("select distinct periode from periode where kode_lokasi='$kode_lokasi' ");
            $perusahan ="select distinct periode from periode where kode_lokasi='$kode_lokasi'";
            $response["daftar"] = $perusahan;
        // } else{
        //     $response["message"] = "Unauthorized Access, Login Required";
        // }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPiutangInstitusi(){
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $res = dbResultArray("select 'A' as kode, 'NamaA' as nama, 600000 as nilai
                                 union all
                                 select 'B' as kode, 'NamaB' as nama, 900000 as nilai 
                                 union all
                                 select 'C' as kode, 'NamaC' as nama, 1000000 as nilai
                                 union all
                                 select 'D' as kode, 'NamaD' as nama, 500000 as nilai  ");
            $response["data"] = array();
            $y=0;
            foreach($res as $row){
                $response["data"][] = array("name" => $row['nama'],"y"=>round(floatval($row["nilai"])),"key"=>$row['kode']);
                $y++;
            }

        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getBudgetControl(){
        session_start();
        getKoneksi();
        $data=$_GET;
        // if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            //Employes
            $res = dbResultArray("select 'TK' as kode, 100 as nilai
            union all
            select 'SD' as kode, 100 as nilai
            union all
            select 'SMP' as kode, 100 as nilai
            union all
            select 'SMA' as kode, 100 as nilai
            union all
            select 'SDM' as kode, 100 as nilai");
            foreach($res as $row){
                $data[0][] = floatval($row["nilai"]);
            }

             //Employees Optimized
             $res2 = dbResultArray("select 'TK' as kode, 90 as nilai
             union all
             select 'SD' as kode, 90 as nilai
             union all
             select 'SMP' as kode, 90 as nilai
             union all
             select 'SMA' as kode, 90 as nilai
             union all
             select 'SDM' as kode, 90 as nilai");
            foreach($res2 as $row){
                $data[1][] = floatval($row["nilai"]);
            }

            //Profit
            $res3 = dbResultArray("select 'TK' as kode, 170 as nilai
             union all
             select 'SD' as kode, 170 as nilai
             union all
             select 'SMP' as kode, 170 as nilai
             union all
             select 'SMA' as kode, 170 as nilai
             union all
             select 'SDM' as kode, 170 as nilai");
            foreach($res3 as $row){
                $data[2][] = floatval($row["nilai"]);
            }

            // Profit Optimized
            $res4 = dbResultArray("select 'TK' as kode, 80 as nilai
            union all
            select 'SD' as kode, 80 as nilai
            union all
            select 'SMP' as kode, 80 as nilai
            union all
            select 'SMA' as kode, 80 as nilai
            union all
            select 'SDM' as kode, 80 as nilai");
            foreach($res4 as $row){
                $data[3][] = floatval($row["nilai"]);
            }

            $kelompok2 = array('Employess','Employess Optimized','Profit','Profit Optimized');   
            $color = array('rgba(0,0,255 ,1)','rgba(0,255,0 ,1)','rgba(248,161,63,1)','rgba(255,69,0 ,1)');
            $warna= array('#727276','#7cb5ec','#ff6f69','#8085e9');
            for($i=0;$i<count($kelompok2);$i++){
                if($i == 0 || $i == 2){
                    $padd = 0.3;
                }else{
                    $padd = 0.4;
                }
                if($i > 1){
                    $point = 0.2;
                    $response["series"][] = array( 'name'=>$kelompok2[$i],'color'=>$color[$i],'data'=> $data[$i],'pointPadding'=>$padd,'pointPlacement'=> $point,'yAxis'=>1);
                }else{
                    $point = -0.2;
                    $response["series"][] = array( 'name'=>$kelompok2[$i],'color'=>$color[$i],'data'=> $data[$i],'pointPadding'=>$padd,'pointPlacement'=> $point);
                }
            }

          
        // } else{
        //     $response["message"] = "Unauthorized Access, Login Required";
        // }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getCashColl(){
        session_start();
        getKoneksi();
        $data=$_GET;
        // if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $sqlA= "select 786767 as n1, 897767 as n2,664353 as n3, 657251 as n4,756798 as n5, 129873 as n6,656452 as n7, 816539 as n8,918762 as n9, 1087642 as n10,787712 as n11, 776548 as n12";
            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            $resIn = execute($sqlA);
            $pembagi=1;
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
                    
            $response["Cash"]["A"] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
            round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
            round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );
        
            $sqlB= "select 457256 as n1, 787653 as n2,565558 as n3, 643322 as n4,765498 as n5, 234987 as n6,456252 as n7, 816523 as n8,978765 as n9, 566283 as n10,873653 as n11, 946512 as n12";
           
            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
            $resOut = execute($sqlB);
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
            
            $response["Cash"]["B"] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );

            
            $sqlC= "select 657828 as n1, 398765 as n2,769064 as n3, 143329 as n4,679000 as n5, 672521 as n6,763544 as n7, 656523 as n8,654321 as n9, 676321 as n10,768762 as n11, 987637 as n12";
           
            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            
            $resOut = execute($sqlC);
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
            
            $response["Cash"]["C"] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
                round(floatval($n4)), round(floatval($n5)), round(floatval($n6)),
                round(floatval($n7)), round(floatval($n8)), round(floatval($n9)), 
                round(floatval($n10)), round(floatval($n11)), round(floatval($n12))
            );
          
        // } else{
        //     $response["message"] = "Unauthorized Access, Login Required";
        // }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getRevenue(){
        session_start();
        getKoneksi();
        $data=$_GET;
        // if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $sql= "select 786767 as n1, 897767 as n2,664353 as n3, 657251 as n4,756798 as n5, 129873 as n6,656452 as n7, 816539 as n8,918762 as n9, 1087642 as n10,787712 as n11, 776548 as n12";
            $n1=$n2=$n3=$n4=$n5=$n6=$n7=$n8=$n9=$n10=$n11=$n12=0;
            $res = execute($sql);
            $pembagi=1;
            if($res->RecordCount() > 0){
                while ($row = $res->FetchNextObject(false)){
                    
                    $n1=$row->n1/$pembagi;
                    $n2=$row->n2/$pembagi;
                    $n3=$row->n3/$pembagi;
                    $n4=$row->n4/$pembagi;
                    $n5=$row->n5/$pembagi;
                    $n6=$row->n6/$pembagi;
                    
                    
                }
            }
                    
            $response["series"] = array(round(floatval($n1)), round(floatval($n2)), round(floatval($n3)), 
            round(floatval($n4)), round(floatval($n5)), round(floatval($n6))
            );

            $response["category"] = array("14","15","16","17","18","19");
        
          
        // } else{
        //     $response["message"] = "Unauthorized Access, Login Required";
        // }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    function getPosisi(){
        session_start();
        getKoneksi();
        $data=$_GET;
        // if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){             
            $kode_lokasi = $_SESSION['lokasi'];
            $sql= " select 'Pengajuan' as nama , 100 as nilai 
                    union all
                    select 'Beban' as nama , 100 as nilai 
                    union all
                    select 'Verifikasi Beban' as nama , 100 as nilai 
                    union all
                    select 'DPC' as nama , 100 as nilai 
                    union all
                    select 'Bayar' as nama , 100 as nilai ";
            $response["data"] = dbResultArray($sql);
          
        // } else{
        //     $response["message"] = "Unauthorized Access, Login Required";
        // }    
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

?>