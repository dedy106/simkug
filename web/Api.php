<?php
    include("autoload.php");
    
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }else{
        include_once("errors_page/404.php");
    }

    function getSiswa(){
        if (isset($_SERVER['PHP_AUTH_USER']) && $_SERVER['PHP_AUTH_USER']=='ypt' &&  $_SERVER['PHP_AUTH_PW']=='ypt2018') {

            $kode_lokasi= $_POST['kode_lokasi'];
            $kode_pp= $_POST['kode_pp'];
            $nis= $_POST['nis'];
			
			$tmp="";
			if ($nis!=null)
			{
				$tmp.=" and nis='$nis'";
			}
			
            $sql="select nis,nama,kode_kelas from sis_siswa where kode_lokasi='$kode_lokasi' and kode_pp='$kode_pp' $tmp order by nis";
			
            $rs=execute($sql);
            
            $response["rs"] = array();
            while($row = $rs->FetchNextObject($toupper = false)){
                $response["rs"][] = (array)$row;
            }
            
            echo json_encode($response);
        }else{
            echo "Unauthorized Access";
        }
        
        
    }

    function getIgracias(){
        $ch = curl_init('http://api.telkomuniversity.ac.id/finance/report/51/1718');

        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        curl_setopt($ch, CURLOPT_USERPWD, "simkug:Simkug4pi");
        curl_setopt($ch, CURLOPT_HTTPAUTH, CURLAUTH_BASIC);

        $rs = json_decode(curl_exec($ch));
        curl_close($ch);
        // echo $rs->financedetail[1]->nim;
        // echo "<br>";
        // echo count($rs->financedetail);
        
        echo "<pre>";
        print_r($rs);
        echo "</pre>";
        
        // $this->db = ADONewConnection('odbc_mssql');
        // $dsn = "dsn=dbsimkug;uid=sa;pwd=Sai2016sai";
        // $this->db->Connect($dsn);

        // $this->db->BeginTrans();
        // $qdel = $this->db->Execute('DELETE FROM api_finance_detail');
        // $error = false;
        // // $i = 5310;
        // for($i=0; $i<count($rs->financedetail); $i++){
        //     $record['nim'] = $rs->financedetail[$i]->nim;
        //     $record['nama'] = $rs->financedetail[$i]->nama;
        //     $record['studyprogramid'] = $rs->financedetail[$i]->studyprogramid;
        //     $record['facultyid'] = $rs->financedetail[$i]->facultyid;
        //     $record['facultyname'] = $rs->financedetail[$i]->facultyname;
        //     $record['programstudi'] = $rs->financedetail[$i]->programstudi;
        //     $record['tahunajaran'] = $rs->financedetail[$i]->tahunajaran;
        //     $record['semester'] = $rs->financedetail[$i]->semester;
        //     $record['studentschoolyear'] = $rs->financedetail[$i]->studentschoolyear;
        //     $record['up3'] = $rs->financedetail[$i]->up3;
        //     $record['sdp2'] = $rs->financedetail[$i]->sdp2;
        //     $record['paket'] = $rs->financedetail[$i]->paket;
        //     $record['bpp'] = $rs->financedetail[$i]->bpp;
        //     $record['sks'] = $rs->financedetail[$i]->sks;
        //     $record['perpus'] = $rs->financedetail[$i]->perpus;
        //     $record['denda'] = $rs->financedetail[$i]->denda;
        //     $record['uangstatus'] = $rs->financedetail[$i]->uangstatus;
        //     $record['asuransi'] = $rs->financedetail[$i]->asuransi;
        //     $record['asrama'] = $rs->financedetail[$i]->asrama;
        //     $record['potongan'] = $rs->financedetail[$i]->potongan;
        //     $record['totaltagihan'] = $rs->financedetail[$i]->totaltagihan;
        //     $record['beasiswa'] = $rs->financedetail[$i]->beasiswa;
        //     $record['tagihan'] = $rs->financedetail[$i]->tagihan;
        //     $record['pembayaran'] = $rs->financedetail[$i]->pembayaran;
        //     $record['selisih'] = $rs->financedetail[$i]->selisih;
        //     $record['deadlinepembayaran'] = $rs->financedetail[$i]->deadlinepembayaran;
        //     $record['statuspembayaran'] = $rs->financedetail[$i]->statuspembayaran;
        //     $record['statusregistrasi'] = $rs->financedetail[$i]->statusregistrasi;
        //     $record['statusmahasiswa'] = $rs->financedetail[$i]->statusmahasiswa;
        //     // print_r($record);
        //     $q1 = $this->db->autoExecute("api_finance_detail", $record,'INSERT');

        //     if(!$q1){
        //         $last_insert = $i+1;
        //         $error = true;
        //     }
        // }
    }

    function test(){
        echo qstr("TEST");
    }

    function view_t(){
       echo json_encode($_SERVER["PHP_AUTH_USER"]);
    }
?>

