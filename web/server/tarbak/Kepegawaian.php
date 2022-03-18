<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}

function getKepegawaian(){

    $kode_lokasi=$_POST['kode_lokasi'];
    $nik=$_POST['nik_user'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select kode_pp, kode_sdm,kode_gol,kode_jab,kode_loker,kode_unit,tahun_masuk, no_sk,convert(varchar,tgl_sk,23) as tgl_sk,gelar_depan,gelar_belakang,convert(varchar,tgl_masuk,23) as tgl_masuk,ijht,bpjs,jp,mk_gol,mk_ytb,convert(varchar,tgl_kontrak,23) as tgl_kontrak,no_kontrak 
    from hr_karyawan
    where kode_lokasi ='$kode_lokasi' and nik='$nik' ";

    $rs=execute($sql);			
    
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql1;
    echo json_encode($result);

}

function ubahKepegawaian(){
        $nik=$_POST['nik_user'];
        $kode_lokasi=$_POST['kode_lokasi'];
        
        $dbconn = db_Connect();

        $result = array("message" => "", "rows" => 0, "status" => "" );
        $error_upload = "not found";

        $upd= array(
            'gelar_depan'=>$_POST['gelar_depan'],
            'gelar_belakang'=>$_POST['gelar_belakang'],
            'kode_sdm'=>$_POST['kode_sdm'],
            'kode_gol'=>$_POST['kode_gol'],
            'kode_jab'=>$_POST['kode_jab'],
            'kode_unit'=>$_POST['kode_unit'],
            'kode_pp'=>$_POST['kode_pp'],
            'kode_loker'=>$_POST['kode_loker'],
            'ijht'=>$_POST['status_ijht'],
            'bpjs'=>$_POST['status_bpjs'],
            'jp'=>$_POST['status_jp'],
            'mk_gol'=>$_POST['mk_gol'],
            'tgl_masuk'=>$_POST['tgl_masuk'],
            'no_sk'=>$_POST['no_sk'],
            'mk_ytb'=>$_POST['mk_ytb'],
            'tgl_sk'=>$_POST['tgl_sk'],
            'no_kontrak'=>$_POST['no_kontrak'],
           
        );
        
        $update = $dbconn->AutoExecute("hr_karyawan", $upd, 'UPDATE', " nik='".$nik."' and kode_lokasi='".$kode_lokasi."' ");

        if($update){
            $sts=TRUE;
            $msg="berhasil";
        }else{
            $sts=FALSE;
            $msg="gagal";
        }

        $result['status'] = $sts;
        $result['message'] = $msg;
        $result['error'] = $error_upload;
        $result['Update'] = $upd;
        echo json_encode($result);

}

function getSDM(){

    $kode_lokasi=$_POST['kode_lokasi'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql = "SELECT kode_sdm,nama from hr_sdm where kode_lokasi = '".$kode_lokasi."' ";

    $rs=execute($sql);			
    
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql1;
    echo json_encode($result);

}

function getGol(){

    $kode_lokasi=$_POST['kode_lokasi'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql = "SELECT kode_gol,nama from hr_gol where kode_lokasi = '".$kode_lokasi."' ";

    $rs=execute($sql);			
    
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql1;
    echo json_encode($result);

}

function getJab(){

    $kode_lokasi=$_POST['kode_lokasi'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql = "SELECT kode_jab,nama from hr_jab where kode_lokasi = '".$kode_lokasi."' ";

    $rs=execute($sql);			
    
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql1;
    echo json_encode($result);

}

function getUnit(){

    $kode_lokasi=$_POST['kode_lokasi'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql = "SELECT kode_unit,nama from hr_unit where kode_lokasi = '".$kode_lokasi."' ";

    $rs=execute($sql);			
    
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql1;
    echo json_encode($result);

}

function getPP(){

    $kode_lokasi=$_POST['kode_lokasi'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql = "SELECT kode_pp,nama from pp where kode_lokasi = '".$kode_lokasi."' ";

    $rs=execute($sql);			
    
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql1;
    echo json_encode($result);

}

function getLoker(){

    $kode_lokasi=$_POST['kode_lokasi'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql = "SELECT kode_loker,nama from hr_loker where kode_lokasi = '".$kode_lokasi."' ";

    $rs=execute($sql);			
    
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql1;
    echo json_encode($result);

}




?>
