<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}

function view(){
           
    $sql="select a.kode_ref, a.nama 
     from trans_ref a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='B10-11' 
     where a.jenis='PENERIMAAN' and a.kode_lokasi='18' ";
    
    $rs=execute($sql);
    $html="";
    while($row=$rs->FetchNextObject($toupper = false)){
        $html.= $row->kode_ref;
    }
  
    echo $html;
    
}

function send($a,$b){

    // CEK
    $judul=$a;
    $isi=$b;
    $cek = dbRowArray("select nik, api_key, token, tgl_login from api_token_auth where os = 'BROWSER' order by tgl_login desc");


    $title = $judul;
    $content      = array(
        "en" => $isi
    );

    $fields = array(
        'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
        // all subscribed user
        // 'included_segments' => array(
        //     'All'
        // ),

        // per token id
        'include_player_ids' => array($cek['token']),


        'data' => array(
            "foo" => "bar"
        ),
        'contents' => $content,
        'headings' => array(
            'en' => $title
        )
        // 'web_buttons' => $hashes_array
    );
    
    $fields = json_encode($fields);
    // print("\nJSON sent:\n");
    // print($fields);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json; charset=utf-8',
        'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    
    $response = curl_exec($ch);
    curl_close($ch);

    // echo json_encode($response);
    // echo "NOTIF SENT";
}

function sendNotifUser(){

    // CEK
    $judul="test notif per user";
    $isi="ini dari web";
    $cek = dbRowArray("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik in ('G95309') order by tgl_login desc");

    $title = $judul;
    $content      = array(
        "en" => $isi
    );

    $fields = array(
        'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
        // all subscribed user
        // 'included_segments' => array(
        //     'All'
        // ),

        // per token id
        'include_player_ids' => array($cek['token']),


        'data' => array(
            "foo" => "bar"
        ),
        'contents' => $content,
        'headings' => array(
            'en' => $title
        )
        // 'web_buttons' => $hashes_array
    );
    
    $fields = json_encode($fields);
    // print("\nJSON sent:\n");
    // print($fields);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json; charset=utf-8',
        'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    
    $response = curl_exec($ch);
    curl_close($ch);

    // echo json_encode($response);
    // echo "NOTIF SENT";
}


function sendNotifUser2(){

    // CEK
    $judul="test notif per user";
    $isi="ini dari web";
    $cek = dbRowArray("select nik, api_key, token, tgl_login from token_notif where os = 'BROWSER' and nik='siaga' order by tgl_login desc");

    $title = $judul;
    $content      = array(
        "en" => $isi
    );

    $fields = array(
        'app_id' => "1ca967ab-9375-4edf-abfd-12a22fc073a5", 
        // all subscribed user
        // 'included_segments' => array(
        //     'All'
        // ),

        // per token id
        'include_player_ids' => array($cek['token']),


        'data' => array(
            "foo" => "bar"
        ),
        'contents' => $content,
        'headings' => array(
            'en' => $title
        )
        // 'web_buttons' => $hashes_array
    );
    
    $fields = json_encode($fields);
    // print("\nJSON sent:\n");
    // print($fields);
    
    $ch = curl_init();
    curl_setopt($ch, CURLOPT_URL, "https://onesignal.com/api/v1/notifications");
    curl_setopt($ch, CURLOPT_HTTPHEADER, array(
        'Content-Type: application/json; charset=utf-8',
        'Authorization: Basic OWMxMzM2ZTMtNmY0Yy00OTkwLTk1NWItZDcwMTk5ZmVlYTIz' //REST API KEY ONESIGNAL
    ));
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
    curl_setopt($ch, CURLOPT_HEADER, FALSE);
    curl_setopt($ch, CURLOPT_POST, TRUE);
    curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
    
    $response = curl_exec($ch);
    curl_close($ch);

    // echo json_encode($response);
    // echo "NOTIF SENT";
}


function joinNum2($num){
    // menggabungkan angka yang di-separate(10.000,75) menjadi 10000.00
    $num = str_replace(".", "", $num);
    $num = str_replace(",", ".", $num);
    return $num;
}

// APPROVAL RRA ANGGARAN
function getEditApproval(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select substring(a.periode,5,2) as bulan,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'PENERIMA' else 'PEMBERI' end as dc 
    from rra_pdrk_d a
    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
    where a.no_pdrk = '$id' and a.kode_lokasi='$kode_lokasi' order by a.dc ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
        
    }
    $result['rows'] =$rs->RecordCount();
    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function simpanApproval(){

    $periode=date('Y').date('m');
    $kode_lokasi=$_POST['kode_lokasi'];
    $nik=$_POST['nik'];

    $str_format="0000";
    $per=date('y').date('m');
    // $prefix=$_POST['kode_rt']."-WR".$per.".";
    $prefix=$kode_lokasi."-RRA".$per.".";
    $sql2="select right(isnull(max(no_app),'0000'),".strlen($str_format).")+1 as id from rra_app_m where no_app like '$prefix%' and kode_lokasi='".$_POST['kode_lokasi']."' ";
    
    $query = execute($sql2);

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    if ($_POST['status'] == "APPROVE") {
        $vProg = "1"; 						
    } else {
        $vProg = "X";
        $sql="delete from anggaran_d where no_agg='".$_POST['no_bukti']."'";
        $rs = execute($sql);
    }
    
    $sql1= "insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values ('".$id."','".$kode_lokasi."',getdate(),'".$_POST['keterangan']."','PUSAT','".$periode."','-','".$nik."','".$nik."','".$nik."',getdate(),'APPPST')";

    $sql2="insert into rra_app_d(no_app,modul,kode_lokasi,no_bukti,kode_lokbukti,sts_pdrk,catatan,status) values ('".$id."','PUSAT','".$kode_lokasi."','".$_POST['no_bukti']."','".$kode_lokasi."','RRR','-','".$_POST['status']."')";

    $sql3= "update rra_pdrk_m set progress='".$vProg."' where no_pdrk='".$_POST['no_bukti']."' and kode_lokasi='".$kode_lokasi."'";

     
    $tmp=array();
    $kode = array();
    
    $rs1 = execute($sql1);
    $rs2 = execute($sql2);
    $rs3 = execute($sql3);
    // $rs1=true;
    // $rs2=true;
    // $rs3=true;

    if ($rs1 AND $rs2 AND $rs3)
    {	
        // CommitTrans();
        $judul = "Pengajuan Anda telah di-".$_POST['status']." $id";
        $isi = "(Approval RRA Anggaran) Pengajuan Anda telah di-".$_POST['status']." oleh ".$nik;
                        
        $tmp="berhasil di ".$_POST['status'];
        $sts=true;
        send($judul,$isi);

        $sql4="insert into api_notif
        values ('$nik',getdate(),'$judul','$isi','$kode_lokasi','siagaweb',0,'".$_POST['kode_pp']."')
        ";
        $rs4=execute($sql4);

    }else{
        // RollbackTrans();
        $tmp="gagal di ".$_POST['status'];
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"]=$sql;
    $result["sql1"]=$sql1;
    $result["sql2"]=$sql2;
    $result["sql3"]=$sql3;
    $result["sql4"]=$sql4;

    echo json_encode($result);
}

//APPROVAL VP

function getEditApproval2(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select substring(a.periode,5,2) as bulan,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'PENERIMA' else 'PEMBERI' end as dc  
    from rra_pdrk_d a 
    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
    where a.no_pdrk = '$id' and a.kode_lokasi='$kode_lokasi' order by a.dc ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['rows'] =$rs->RecordCount();
    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function simpanApproval2(){

    $periode=date('Y').date('m');
    $kode_lokasi=$_POST['kode_lokasi'];
    $nik=$_POST['nik'];

    $str_format="0000";
    $per=date('y').date('m');
    // $prefix=$_POST['kode_rt']."-WR".$per.".";
    $prefix=$kode_lokasi."-RRA".$per.".";
    $sql2="select right(isnull(max(no_app),'0000'),".strlen($str_format).")+1 as id from rra_app_m where no_app like '$prefix%' and kode_lokasi='".$_POST['kode_lokasi']."' ";
    
    $query = execute($sql2);

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    if ($_POST['status'] == "APPROVE") {
        $vProg = "9"; 						
    } else {
        $vProg = "V";
        $sql="delete from anggaran_d where no_agg='".$_POST['no_bukti']."'";
        $rs = execute($sql);
    }
    
    $sql1= "insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values ('".$id."','".$kode_lokasi."',getdate(),'".$_POST['keterangan']."','PUSAT','".$periode."','-','".$nik."','".$nik."','".$nik."',getdate(),'APPVP')";

    $sql2="insert into rra_app_d(no_app,modul,kode_lokasi,no_bukti,kode_lokbukti,sts_pdrk,catatan,status) values ('".$id."','PUSAT','".$kode_lokasi."','".$_POST['no_bukti']."','".$kode_lokasi."','RRR','-','".$_POST['status']."')";

    $sql3= "update rra_pdrk_m set progress='".$vProg."' where no_pdrk='".$_POST['no_bukti']."' and kode_lokasi='".$kode_lokasi."'";

     
    $tmp=array();
    $kode = array();
    
    $rs1 = execute($sql1);
    $rs2 = execute($sql2);
    $rs3 = execute($sql3);
    // $rs1=true;
    // $rs2=true;
    // $rs3=true;

    if ($rs1 AND $rs2 AND $rs3)
    {	
        // CommitTrans();
        $judul = "Pengajuan anda telah di-".$_POST['status']." $id";
        $isi = "(Approval VP) Pengajuan Anda telah di-".$_POST['status']." oleh ".$nik;
                        
        $tmp="berhasil di ".$_POST['status'];
        $sts=true;
        send($judul,$isi);

        $sql4="insert into api_notif
        values ('$nik',getdate(),'$judul','$isi','$kode_lokasi','siagaweb',0,'".$_POST['kode_pp']."')
        ";
        $rs4=execute($sql4);

    }else{
        // RollbackTrans();
        $tmp="gagal di ".$_POST['status'];
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"]=$sql;
    $result["sql1"]=$sql1;
    $result["sql2"]=$sql2;
    $result["sql3"]=$sql3;
    $result["sql4"]=$sql4;

    echo json_encode($result);
}

// APPROVAL DIR UNIT
function getEditApproval3(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select substring(a.periode,5,2) as bulan,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'PENERIMA' else 'PEMBERI' end as dc  
    from rra_pdrk_d a 
    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
    where a.no_pdrk = '$id' and a.kode_lokasi='$kode_lokasi'  order by a.dc ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }

    $result['rows'] =$rs->RecordCount();
    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function simpanApproval3(){

    $periode=date('Y').date('m');
    $kode_lokasi=$_POST['kode_lokasi'];
    $nik=$_POST['nik'];

    $str_format="0000";
    $per=date('y').date('m');
    // $prefix=$_POST['kode_rt']."-WR".$per.".";
    $prefix=$kode_lokasi."-RRA".$per.".";
    $sql2="select right(isnull(max(no_app),'0000'),".strlen($str_format).")+1 as id from rra_app_m where no_app like '$prefix%' and kode_lokasi='".$_POST['kode_lokasi']."' ";
    
    $query = execute($sql2);

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    if ($_POST['status'] == "APPROVE") {
        $vProg = "0"; 						
    } else {
        $vProg = "D";
        $sql="delete from anggaran_d where no_agg='".$_POST['no_bukti']."'";
        $rs = execute($sql);
    }
    
    $sql1= "insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values ('".$id."','".$kode_lokasi."',getdate(),'".$_POST['keterangan']."','PUSAT','".$periode."','-','".$nik."','".$nik."','".$nik."',getdate(),'APPDIRUS')";

    $sql2="insert into rra_app_d(no_app,modul,kode_lokasi,no_bukti,kode_lokbukti,sts_pdrk,catatan,status) values ('".$id."','PUSAT','".$kode_lokasi."','".$_POST['no_bukti']."','".$kode_lokasi."','RRR','-','".$_POST['status']."')";

    $sql3= "update rra_pdrk_m set progress='".$vProg."' where no_pdrk='".$_POST['no_bukti']."' and kode_lokasi='".$kode_lokasi."'";
     
    $tmp=array();
    $kode = array();
    
    $rs1 = execute($sql1);
    $rs2 = execute($sql2);
    $rs3 = execute($sql3);
    // $rs1=true;
    // $rs2=true;
    // $rs3=true;

    if ($rs1 AND $rs2 AND $rs3)
    {	
        // CommitTrans();
        $judul = "Pengajuan anda telah di-".$_POST['status']." $id";
        $isi = "(Approval Dir Unit) Pengajuan anda telah di-".$_POST['status']." oleh ".$nik;
                        
        $tmp="berhasil di ".$_POST['status'];
        $sts=true;
        send($judul,$isi);

        $sql4="insert into api_notif
        values ('$nik',getdate(),'$judul','$isi','$kode_lokasi','siagaweb',0,'".$_POST['kode_pp']."')
        ";
        $rs4=execute($sql4);

    }else{
        // RollbackTrans();
        $tmp="gagal di ".$_POST['status'];
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"]=$sql;
    $result["sql1"]=$sql1;
    $result["sql2"]=$sql2;
    $result["sql3"]=$sql3;
    $result["sql4"]=$sql4;

    echo json_encode($result);
}

// APPROVAL DIREKSI
function getEditApprovalDir(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select substring(a.periode,5,2) as bulan,a.kode_akun,c.nama as nama_akun,a.nilai,case a.dc when 'D' then 'PENERIMA' else 'PEMBERI' end as dc  
    from rra_pdrk_d a 
    inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
    where a.no_pdrk = '$id' and a.kode_lokasi='$kode_lokasi'  order by a.dc ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }

    $result['rows'] =$rs->RecordCount();
    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function simpanApprovalDir(){

    $periode=date('Y').date('m');
    $kode_lokasi=$_POST['kode_lokasi'];
    $nik=$_POST['nik'];

    $str_format="0000";
    $per=date('y').date('m');
    // $prefix=$_POST['kode_rt']."-WR".$per.".";
    $prefix=$kode_lokasi."-RRD".$per.".";
    $sql2="select right(isnull(max(no_app),'0000'),".strlen($str_format).")+1 as id from rra_app_m where no_app like '$prefix%' and kode_lokasi='".$_POST['kode_lokasi']."' ";
    
    $query = execute($sql2);

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    if ($_POST['status'] == "APPROVE") {
        $vProg = "2"; 
        $sql1= "insert into anggaran_d (no_agg,kode_lokasi,no_urut,kode_pp,kode_akun,kode_drk,volume,periode,nilai_sat,nilai,dc,satuan,nik_user,tgl_input,modul)  
        select a.no_pdrk,a.kode_lokasi,a.no_urut,a.kode_pp,a.kode_akun,a.kode_drk,1,a.periode,a.nilai,a.nilai,a.dc,'-',b.nik_user,getdate(),'RRA' 
        from rra_pdrk_d a inner join rra_pdrk_m b on a.no_pdrk=b.no_pdrk 
        where a.no_pdrk = '".$_POST['no_bukti']."' and a.dc ='D'"; 
    }
    else {
        $vProg = "Z";
        $sql1="delete from anggaran_d where no_agg='".$_POST['no_bukti']."'";
    }
    $sql3 = "insert into rra_app_m(no_app, kode_lokasi,tanggal,keterangan,modul,periode,no_del,nik_buat,nik_app,nik_user,tgl_input,jenis_form) values ('".$id."','".$kode_lokasi."',getdate(),'".$_POST['keterangan']."','PUSAT','".$periode."','-','".$nik."','".$nik."','".$nik."',getdate(),'APPDIR')";

    $sql4 ="insert into rra_app_d(no_app,modul,kode_lokasi,no_bukti,kode_lokbukti,sts_pdrk,catatan,status) values ('".$id."','PUSAT','".$kode_lokasi."','".$_POST['no_bukti']."','".$kode_lokasi."','RRD','-','".$_POST['status']."')";

    $sql5= "update rra_pdrk_m set progress='".$vProg."' where no_pdrk='".$_POST['no_bukti']."' and kode_lokasi='".$kode_lokasi."'";	 
    $tmp=array();
    $kode = array();
    
    $rs1 = execute($sql1);
    $rs3 = execute($sql3);
    $rs4 = execute($sql4);
    $rs5 = execute($sql5);
    // $rs1=true;
    // $rs3=true;
    // $rs4=true;
    // $rs5=true;

    if ($rs1 AND $rs3 AND $rs4 AND $rs5)
    {	
        // CommitTrans();
        $judul = "Pengajuan anda telah di-".$_POST['status']." $id";
        $isi = "(Approval Direksi) Pengajuan Anda telah di-".$_POST['status']." oleh ".$nik;
                        
        $tmp="berhasil di ".$_POST['status'];
        $sts=true;
        send($judul,$isi);

        $sql6="insert into api_notif
        values ('$nik',getdate(),'$judul','$isi','$kode_lokasi','siagaweb',0,'".$_POST['kode_pp']."')
        ";
        $rs6=execute($sql6);

    }else{
        // RollbackTrans();
        $tmp="gagal di ".$_POST['status'];
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"]=$sql;
    $result["sql1"]=$sql1;
    $result["sql3"]=$sql3;
    $result["sql4"]=$sql4;
    $result["sql5"]=$sql5;
    $result["sql6"]=$sql6;

    echo json_encode($result);
}



?>
