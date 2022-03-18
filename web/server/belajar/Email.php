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
        case 'DELETE' :
            hapusDok();
        break;
    }

    function getKoneksi(){
        $root_lib=$_SERVER["DOCUMENT_ROOT"];
        include_once($root_lib."web/lib/koneksi.php");
        include_once($root_lib."web/lib/helpers.php");
        include_once($root_lib."web/lib/libcurl.php");
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

    function send(){
        session_start();
        getKoneksi();
        $data=$_POST;

        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){            

            try{

                $kode_lokasi = $_GET['kode_lokasi'];
                $kode_pp=$_GET['kode_pp'];
                $url = "https://devapi.simkug.com/api/gl/login";
                $url2 = "https://devapi.simkug.com/api/gl/send-email";
    
                $fields = array(
                    "nik" => $_SESSION['userLog'],
                    "password" => $_SESSION['pass']
                );

                $output = curl($url,$fields); 
                $token = $output->token;
    
                $postfields = array();
                $postfields['from'] = $_POST['from'];
                $postfields['to'] = $_POST['to'];
                $postfields['subject'] = $_POST['subject'];
                $postfields['html'] = $_POST['html'];
                $postfields['text'] = $_POST['text'];
    
                $res = curl_simpan($url2,$token,$postfields);
                if(isset($res->data)){
                    $msg = $res->data->message;
                    $sts = true;
                }else{
                    $msg = "Email gagal dikirim.";
                    $sts = false;
                }
                $response['curl2_res'] = $res; 
                $response['output'] = $output;
            } catch (exception $e) { 
                error_log($e->getMessage());		
                $msg = " error " .  $e->getMessage();
                $sts = false;
            } 	
            $response['message'] = $msg;
            $response['status'] = $sts;
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        } 
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }


    function getPlanAset() {
        session_start();
        getKoneksi();
        $data=$_GET;
        if($_SESSION['isLogedIn'] AND cekAuth($_SESSION['userLog'])){     

            $kode_lokasi = $_SESSION['lokasi'];
            $nik_user = $_SESSION['userLog'];
            $tmp = explode("|",$data["param"]);
            $response['lokasi'] = $kode_lokasi;
            $response['nik_user'] = $nik_user;
            $tgl_akhir = $tmp[0];
            $kode_plan = $tmp[1];
            $kode_klp = $tmp[2];
            $param = dbRowArray("select*from inv_filterdash where nik='919006'");

            $tgl_akhir = substr($param["tgl_akhir"],0,10);
            $kode_plan = $param["kode_plan"];
            $kode_klp = $param["kode_klp"];

            // if($tgl_akhir == ""){
            //     $tgl_akhir = substr(getTglAkhir(),0,10);
            // }
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
            $tahunAkhir = intval($tahun);

            $sql = "with dates_CTE (date) as (
                select convert(date,'$tahunAwal-12-31') as date
                Union ALL
                select DATEADD(month, 1, date)
                from dates_CTE
                where DATEADD(month, 1, date) < convert(date,'$tahunAkhir-12-31')
            )
            select distinct substring(convert(varchar,a.date,112),1,6) as periode,isnull(b.persen,0) as persen,isnull(c.nab,0) as nab,isnull(d.jci,0) as jci
            from dates_CTE a
            left join inv_aktuaria b on substring(convert(varchar,a.date,112),1,6)=b.tahun and b.kode_plan=1 
            left join (
            select tanggal,nab/1000000000000 as nab,periode,kode_plan from 
            inv_roi_total 
            where tanggal like '%-12-31'
            union all
            select tanggal,nab/1000000000000 as nab,periode,kode_plan from 
            inv_roi_total 
            where tanggal like '$tgl_akhir'
            ) c on substring(convert(varchar,a.date,112),1,6)=c.periode and c.kode_plan=1
            left join (
            select tanggal,ihsg as jci,periode from 
            inv_bmark 
            where tanggal like '%-12-31'
            union all
            select tanggal,ihsg as jci,periode from 
            inv_bmark 
            where tanggal like '$tgl_akhir'
            ) d on substring(convert(varchar,a.date,112),1,6)=d.periode 
            where (isnull(b.persen,0) <> 0 OR isnull(c.nab,0) <> 0 OR isnull(d.jci,0) <> 0) 
            option (maxrecursion 150);
            ";

            $category = execute($sql);
            $response['sql'] = $sql;
            $d=array();
            $persen = array();
            $jci = array();
            $nab = array();
            $i=0;
            while($row = $category->FetchNextObject($toupper=false)){
                array_push($d,$row->periode);
                array_push($persen,floatval($row->persen));
                array_push($jci,floatval($row->jci));
                array_push($nab,floatval($row->nab));
                $i++;
            }

            $response["category"] = $d;

            $response["series"][0]= array(
                "name"=>"Plan Aset", "type"=>"column","color"=>"#66ff33","yAxis"=>1, "data"=>$nab,
                "dataLabels" => array("color"=>'black',"verticalAlign"=>"top")
            );

            $response["series"][1] = array(
                "name"=>"JCI", "type"=>"line","color"=>"red","data"=>$jci,
                "dataLabels" => array("color"=>'red')
            );

            $response["series"][2]= array(
                "name"=>"Kewajiban Aktuaria", "yAxis"=>1,"type"=>"line","color"=>"#4274FE","data"=>$persen,
                "dataLabels" => array("color"=>'#4274FE')
            );  

            $sql = "select * from inv_aktuaria where kode_plan='$kode_plan' and tahun between '".$tahunAwal."12' and '$periode' order by tahun";
            $response['sql2'] = $sql;

            $res2 = execute($sql);
            
            $data_table = array();
            // // $df = array();
            // // $rkd = array();

            while($row=$res2->FetchNextObject($toupper=false)){
                // array_push($df,$row->df);
                // array_push($rkd,$row->rkd); 
                $data_table[] = (array)$row;  
            }

           
            // $response['df'] =$df;
            // $response['rkd'] =$rkd;  
            $response['data_table'] = $data_table;    
           
           
        } else{
            $response["message"] = "Unauthorized Access, Login Required";
        }     
        $response["status"]=true; 
        header('Content-Type: application/json');
        echo json_encode($response);
    }

    
?>