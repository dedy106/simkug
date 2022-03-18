<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}

function getMenu(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_menu=$_SESSION['kodeMenu'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.*,b.form  from menu a left join m_form b on a.kode_form=b.kode_form where kode_klp = '$kode_menu' and a.jenis_menu='tengah' order by kode_klp, rowindex ";
    
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);


}

function getTahun(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];

    $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $getpp->fields[0];

    // $sql="select distinct a.tahun from (select (substring(a.periode,1,4)) as tahun 
    // from gldt a 
    // inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
    // where a.kode_lokasi ='$kode_lokasi' and a.kode_akun in ('11101','11201','11202')
    //     ) a
    // order by a.tahun desc ";

    $sql="select distinct a.tahun from (select (substring(a.periode,1,4)) as tahun 
    from gldt a 
    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi ='$kode_lokasi' 
    and a.kode_akun in ( select a.kode_akun 
                        from relakun_pp a 
                        inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
                        where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi' )
        ) a
    order by a.tahun desc ";

    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}


function getBulan(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];

    $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $getpp->fields[0];

    // $sql=" select distinct (substring(a.periode,5,2)) as bulan,datename(m,cast(substring(a.periode,1,4)+'-'+substring(a.periode,5,2)+'-'+'01' as datetime)) as nama
    // from (select  a.periode 
    //     from gldt a 
    //     inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
    //     where a.kode_lokasi ='$kode_lokasi' 
    //     and a.kode_akun in ('11101','11201','11202') 
    // ) a
    // order by (substring(a.periode,5,2)) desc  ";
    $sql=" select distinct (substring(a.periode,5,2)) as bulan,datename(m,cast(substring(a.periode,1,4)+'-'+substring(a.periode,5,2)+'-'+'01' as datetime)) as nama
    from (select  a.periode 
        from gldt a 
        inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi ='$kode_lokasi' 
        and a.kode_akun in (select a.kode_akun 
        from relakun_pp a 
        inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
        where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') 
    ) a
    order by (substring(a.periode,5,2)) desc  ";

    
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}


function getRekap(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $filthn = $_POST['tahun'];
    $result = array("message" => "", "rows" => 0, "status" => "" );   
    
    $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $getpp->fields[0];

    // sql penerimaan
    $sql="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
    from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' 
    and a.kode_akun in (select a.kode_akun 
        from relakun_pp a 
        inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
        where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') 
    and b.jenis ='PENERIMAAN'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['penerimaan'] = dbResultArray($sql);

    // sql pengeluaran 
    $sql2 = "select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'C' then nilai else -nilai end) as total
    from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' 
    and a.kode_akun in (select a.kode_akun 
        from relakun_pp a 
        inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
        where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') 
    and b.jenis ='PENGELUARAN'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['pengeluaran'] = dbResultArray($sql2);

    // sql saldo
    $sql3 = "select sum(a.so_akhir) as so_akhir from glma_pp a where a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' 
    and a.kode_akun in (select a.kode_akun 
        from relakun_pp a 
        inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
        where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi')
    ";
    
    $result['saldo'] = dbResultArray($sql3);

    $result['status']=TRUE;
    echo json_encode($result);
}


function getDetailRekap(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $tahun = $_POST['tahun'];
    $kode_drk = $_POST['drk'];
    $result = array("message" => "", "rows" => 0, "status" => "" ); 
    
    $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $getpp->fields[0];

    // sql detail
    $sql="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
    from gldt where kode_akun in (select a.kode_akun 
    from relakun_pp a 
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') and kode_lokasi='$kode_lokasi' and kode_drk ='$kode_drk' and periode like '$tahun%'
    order by tgl_input desc";
    $result['daftar'] = dbResultArray($sql);
    $result['sql'] = $sql;

    $result['status']=TRUE;
    echo json_encode($result);
}


function getRekapRT(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $filthn = $_POST['tahun'];
    $result = array("message" => "", "rows" => 0, "status" => "" );   
    
    // $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $kode_pp;

    // sql penerimaan
    $sql="select b.jenis,b.idx,a.kode_drk,b.nama,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total
    from gldt a 
    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_Lokasi
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='02'
    inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag in ('001','009')
    where a.kode_Lokasi='bp' and a.periode like '$filthn%' and b.jenis='PENERIMAAN'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['penerimaan'] = dbResultArray($sql);

    // sql pengeluaran 
    $sql2 = "select b.jenis,b.idx,a.kode_drk,b.nama,sum(case a.dc when 'D' then a.nilai else -a.nilai end)*-1 as total
    from gldt a 
    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_Lokasi
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='02'
    inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag in ('001','009')
    where a.kode_Lokasi='bp' and a.periode like '$filthn%' and b.jenis='PENGELUARAN'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['pengeluaran'] = dbResultArray($sql2);

    // sql saldo
    $sql3 = "select sum(a.so_akhir) as so_akhir from glma_pp a where a.kode_lokasi ='$kode_lokasi' and a.periode like '$filthn%' 
    and a.kode_akun in (select a.kode_akun 
        from relakun_pp a 
        inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
        where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi')
    ";
    
    $result['saldo'] = dbResultArray($sql3);

    $result['status']=TRUE;
    echo json_encode($result);
}


function getDetailRekapRT(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $tahun = $_POST['tahun'];
    $kode_drk = $_POST['drk'];
    $result = array("message" => "", "rows" => 0, "status" => "" ); 
    
    // $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $kode_pp;

    // sql detail
    $sql="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
    from gldt where kode_akun in (select a.kode_akun 
    from relakun_pp a 
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') and kode_lokasi='$kode_lokasi' and kode_drk ='$kode_drk' and periode like '$tahun%'
    order by tgl_input desc";
    $result['daftar'] = dbResultArray($sql);
    $result['sql'] = $sql;

    $result['status']=TRUE;
    echo json_encode($result);
}


function getRekapBulanan(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $filthn = $_POST['tahun'];
    $filbln = $_POST['bulan'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $getpp->fields[0];                         
    // sql penerimaan
    $sql="select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'D' then nilai else -nilai end) as total
    from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi ='$kode_lokasi' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln' and a.kode_akun in (select a.kode_akun 
    from relakun_pp a 
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') and b.jenis ='PENERIMAAN'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['penerimaan'] = dbResultArray($sql);

    // sql pengeluaran 
    $sql2 = "select a.kode_drk,b.nama,b.jenis,b.idx,sum(case a.dc when 'C' then nilai else -nilai end) as total
    from gldt a inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi ='$kode_lokasi' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln' and a.kode_akun in (select a.kode_akun 
    from relakun_pp a 
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') and b.jenis ='PENGELUARAN'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['pengeluaran'] = dbResultArray($sql2);

    // sql saldo
    $sql3 = "select sum(a.so_akhir) as so_akhir from glma_pp a where a.kode_lokasi ='$kode_lokasi' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln' and a.kode_akun in (select a.kode_akun 
    from relakun_pp a 
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi')
    ";
    
    $result['saldo'] = dbResultArray($sql3);

    $result['status']=TRUE;
    echo json_encode($result);
}


function getRekapBulananRT(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $filthn = $_POST['tahun'];
    $filbln = $_POST['bulan'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    // $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $kode_pp;                         
    // sql penerimaan
    $sql="select b.jenis,b.idx,a.kode_drk,b.nama,sum(case a.dc when 'D' then a.nilai else -a.nilai end) as total
    from gldt a 
    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_Lokasi
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$pp_rw'
    inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag in ('001','009')
    where a.kode_lokasi='$kode_lokasi' and b.jenis ='PENERIMAAN' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['penerimaan'] = dbResultArray($sql);

    // sql pengeluaran 
    $sql2 = "select b.jenis,b.idx,a.kode_drk,b.nama,sum(case a.dc when 'D' then a.nilai else -a.nilai end)*-1 as total
    from gldt a 
    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_Lokasi
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$pp_rw'
    inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag in ('001','009')
    where a.kode_lokasi='$kode_lokasi' and b.jenis ='PENGELUARAN' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln'
    group by a.kode_drk,b.nama,b.jenis,b.idx
    order by b.jenis,b.idx";
    $result['pengeluaran'] = dbResultArray($sql2);

    // sql saldo
    $sql3 = "select sum(a.so_akhir) as so_akhir from glma_pp a where a.kode_lokasi ='$kode_lokasi' and substring(a.periode,1,4) = '$filthn' and substring(a.periode,5,2) = '$filbln' and a.kode_akun in (select a.kode_akun 
    from relakun_pp a 
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi')
    ";
    
    $result['saldo'] = dbResultArray($sql3);

    $result['status']=TRUE;
    echo json_encode($result);
}


function getDetailRekapBulanan(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $tahun = $_POST['tahun'];
    $bulan = $_POST['bulan'];
    $kode_drk = $_POST['drk'];
    $result = array("message" => "", "rows" => 0, "status" => "" ); 
    
    $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $getpp->fields[0];   

    // sql detail
    $sql="select convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
    from gldt where kode_akun in (select a.kode_akun 
    from relakun_pp a 
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    where a.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi') and kode_lokasi='$kode_lokasi' and kode_drk ='$kode_drk' and substring(periode,1,4) = '$tahun' and substring(periode,5,2) = '$bulan'
    order by tgl_input desc";
    $result['daftar'] = dbResultArray($sql);
    $result['sql'] = $sql;

    $result['status']=TRUE;
    echo json_encode($result);
}


function getDetailRekapBulananRT(){

    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $tahun = $_POST['tahun'];
    $bulan = $_POST['bulan'];
    $kode_drk = $_POST['drk'];
    $result = array("message" => "", "rows" => 0, "status" => "" ); 
    
    // $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    $pp_rw = $kode_pp;   

    // sql detail
    $sql="select convert(varchar,a.tanggal,103) as tgl,a.keterangan,a.dc,a.nilai as nilai1,a.jenis,a.tgl_input
    from gldt a 
    inner join trans_ref b on a.kode_drk=b.kode_ref and a.kode_lokasi=b.kode_Lokasi
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$pp_rw'
    inner join flag_relasi d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.kode_flag in ('001','009')
    where a.kode_lokasi='$kode_lokasi' and a.kode_drk ='$kode_drk' and substring(a.periode,1,4) = '$tahun' and substring(a.periode,5,2) = '$bulan'
    order by tgl_input desc";
    $result['daftar'] = dbResultArray($sql);
    $result['sql'] = $sql;

    $result['status']=TRUE;
    echo json_encode($result);
}

function getAkun(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];

    if($kode_menu == "MOBILEURT"){

        if($kode_pp == ""){
            $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
            $res = execute($sql);
            $kode_pp = $res->fields[0];
        }
    }else{
        $kode_pp = $kode_pp;
    }

    $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
    $result['kode_akun'] = $sqlakun->fields[0];

    // $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    // $pp_rw = $getpp->fields[0];

    $sql="select a.kode_akun,a.nama 
    from masakun a 
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$kode_pp'
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='$kode_lokasi' and a.block = '0'   ";
    // $sql = "select a.kode_akun,a.nama 
    // from masakun a
    // inner join relakun_pp n on a.kode_akun=n.kode_akun and a.kode_lokasi=n.kode_lokasi
    // inner join flag_relasi b on n.kode_akun=b.kode_akun and n.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    // where n.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi' ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getAkunBank(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];

    $sql="select*from masakun where nama like 'Bank%' and kode_lokasi='$kode_lokasi' and block = 0 ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    echo json_encode($result);
}


function getPeriodeDok(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];

    $sql="select distinct substring(convert(varchar,tgl_input,112),1,6) as periode from rt_bill_d where kode_lokasi='$kode_lokasi' ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    echo json_encode($result);
}

function getAkunKas(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_POST['kode_pp'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];

    $sqlakun= execute("select akun_kas from pp where kode_pp='$kode_pp' ");
    $result['kode_akun'] = $sqlakun->fields[0];

    // $getpp= execute("select kode_pp from pp where kode_bidang='1' ");
    // $pp_rw = $getpp->fields[0];

    $sql="select a.kode_akun,a.nama 
    from masakun a 
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$kode_pp'
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='$kode_lokasi' and a.block = '0'   ";
    // $sql = "select a.kode_akun,a.nama 
    // from masakun a
    // inner join relakun_pp n on a.kode_akun=n.kode_akun and a.kode_lokasi=n.kode_lokasi
    // inner join flag_relasi b on n.kode_akun=b.kode_akun and n.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001' ,'009')
    // where n.kode_pp='$pp_rw' and a.kode_lokasi='$kode_lokasi' ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}


function getRiwayatTrans(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $tahun = $_POST['tahun'];
    $kode_akun = $_POST['kode_akun'];

    if($kode_pp == ""){
        $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
        $res = execute($sql);
        $kode_pp = $res->fields[0];
    }

    $sql="select sum(nilai) as saldo from
    (
        select so_akhir as nilai from glma_pp where kode_akun ='$kode_akun' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode like '$tahun%'
        union 
        select sum(case dc when 'D' then nilai else -nilai end) as nilai 
        from gldt where kode_akun ='$kode_akun' and kode_lokasi='$kode_lokasi' and periode like '$tahun%'
    ) a
    ";
    $rs = execute($sql);
    $result['saldo'] = $rs->fields[0];
    $result['tahun'] = $tahun;

    //Riwayat

    $sql="select top 10 no_bukti,convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
    from gldt where kode_akun ='$kode_akun' and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi' and periode like '$tahun%'
    order by tgl_input desc ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}


function getRiwayatTransDet(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $tahun = $_POST['tahun'];
    $kode_akun = $_POST['kode_akun'];

    if($kode_pp == ""){
        $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
        $res = execute($sql);
        $kode_pp = $res->fields[0];
    }

    $sql="select sum(nilai) as saldo from
    (
        select so_akhir as nilai from glma_pp where kode_akun ='$kode_akun' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' and periode like '$tahun%'
        union 
        select sum(case dc when 'D' then nilai else -nilai end) as nilai 
        from gldt where kode_akun ='$kode_akun' and kode_lokasi='$kode_lokasi' and periode like '$tahun%'
    ) a
    ";
    // $rs = execute($sql);
    $result['saldo'] = $rs->fields[0];
    $result['tahun'] = $tahun;

    //Riwayat

    $sql2="select no_bukti,convert(varchar,tanggal,103) as tgl,keterangan,dc,nilai as nilai1,jenis,tgl_input
    from gldt where kode_akun ='$kode_akun' and kode_pp ='$kode_pp' and kode_lokasi='$kode_lokasi' and periode like '$tahun%'
    order by tgl_input desc,no_bukti ";
    $rs2 = execute($sql2);	
    $torecord = $rs2->RecordCount();				
    $result['jumpage'] = ceil($torecord/20);
    $result['page'] = intval($_POST['page']);
    $nextpage = intval($_POST['nextpage']);
    $offset = (intval($_POST['page'])*20);

    $sql = $sql2." 
    OFFSET ".$nextpage." ROWS FETCH NEXT 20 ROWS ONLY";
    $result['daftar'] = array();
    $rs3 = execute($sql);
    while ($row = $rs3->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}


function getRiwayatIuran(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $kode_rumah=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $tahun = $_POST['tahun'];
    $kode_akun = $_POST['kode_akun'];
    $periode = date('Ym');

    if($kode_pp == ""){
        $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
        $res = execute($sql);
        $kode_pp = $res->fields[0];
    }

    $sql="select sum(nilai) as saldo from 
    (
        select sum(a.nilai_rt+a.nilai_rw) as nilai
        from rt_bill_d a 
        where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.periode <='$periode' and a.kode_jenis='IWAJIB' and a.flag_aktif='1'
        union 
        select -sum(a.nilai_rt+a.nilai_rw) as nilai
        from rt_angs_d a
        where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
        ) a ";
    $rs = execute($sql);
    $result['saldo'] = $rs->fields[0];
    $result['no_rumah'] = $kode_rumah;
    //Riwayat

    $sql2="select a.no_bukti, a.keterangan, convert(varchar,a.tanggal,105) as tgl,a.nilai1 as nilai1 from trans_m a 
    where a.periode <= '$periode' and a.kode_lokasi='$kode_lokasi' and a.param1='$kode_rumah' and a.param2='IWAJIB'
    order by a.no_bukti desc";
    $rs2 = execute($sql2);	
    $result['daftar'] = array();
    while ($row = $rs2->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getDetailIuran(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $tahun = $_POST['tahun'];
    $periode = date('Ym');
    if(isset($_POST['kode_rumah'])){
        $kode_rumah = $_POST['kode_rumah'];
    }else{
        $kode_rumah = $nik;
        if($kode_pp == ""){
            $sql = "select rt from rt_rumah where kode_rumah='$kode_rumah' ";
            $res = execute($sql);
            $kode_pp = $res->fields[0];
        }
    }

    // if($kode_menu == "MOBILEURT"){
    //     $kode_rumah = $nik;
    //     if($kode_pp == ""){
    //         $sql = "select rt from rt_rumah where kode_rumah='$kode_rumah' ";
    //         $res = execute($sql);
    //         $kode_pp = $res->fields[0];
    //     }
    // }else{
        // $kode_rumah = $_POST['kode_rumah'];
    // }

    $sql="select  case when substring(a.periode,5,2) = '01' then 'JAN'
    when substring(a.periode,5,2) = '02' then 'FEB'
    when substring(a.periode,5,2) = '03' then 'MAR'
    when substring(a.periode,5,2) = '04' then 'APR'
    when substring(a.periode,5,2) = '05' then 'MEI'
    when substring(a.periode,5,2) = '06' then 'JUN'
    when substring(a.periode,5,2) = '07' then 'JUL'
    when substring(a.periode,5,2) = '08' then 'AGS'
    when substring(a.periode,5,2) = '09' then 'SEP'
    when substring(a.periode,5,2) = '10' then 'OKT'
    when substring(a.periode,5,2) = '11' then 'NOV'
    when substring(a.periode,5,2) = '12' then 'DES'
    end as periode,(a.nilai_rt+a.nilai_rw) as bill,isnull(b.bayar,0) as bayar,isnull(b.tanggal,'-') as tanggal
    from rt_bill_d a 
    left join (
        select a.periode_bill,a.kode_lokasi,a.kode_rumah,convert(varchar,b.tanggal,103) as tanggal,sum(a.nilai_rt+a.nilai_rw) as bayar
        from rt_angs_d a 
        inner join trans_m b on a.no_angs=b.no_bukti and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.periode_bill like '$tahun%' and a.kode_jenis='IWAJIB' 
        group by a.periode_bill,a.kode_lokasi,a.kode_rumah,b.tanggal
    ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
    where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.periode like '$tahun%' and a.kode_jenis='IWAJIB' and a.flag_aktif='1'
    order by a.periode";
    $rs = execute($sql);	
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['no_rumah']=$kode_rumah;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getTahunBill(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    if($kode_menu == "MOBILERW"){
        $filter = "";
    }else{
        
        $filter = " and kode_pp='$kode_pp' ";
        if($kode_pp == ""){
            $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
            $res = execute($sql);
            $kode_pp = $res->fields[0];
        }
    }

    $sql= "select distinct (substring(periode,1,4)) as tahun from rt_bill_d where kode_lokasi='$kode_lokasi' and kode_jenis='IWAJIB' and flag_aktif='1' $filter order by substring(periode,1,4) desc ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function ubahPassword(){

    session_start();
    $post = $_POST;
    $result["auth_status"] = 1;
    $error_input = array();
   
    $nik = $_SESSION['userLog'];
    $pass = $post['password_lama'];
    
    $kode_lokasi = $_SESSION['lokasi'];
    $kode_pp = $_SESSION['kodePP'];
    
    $sql="select nik, pass from hakakses where nik='$nik' and kode_lokasi='$kode_lokasi' and pass='$pass'";
    $cek = execute($sql);

    if($cek->RecordCount() > 0){
        $up_data = $post["password_baru"];
        $konfir_data = $post["password_repeat"];
        if ($up_data == $konfir_data){

            $sql2= "update hakakses set pass='$up_data' where nik='$nik' and kode_lokasi = '$kode_lokasi' and pass='$pass' ";
            $rs = execute($sql2);

            if($rs){
                $result['status'] = 1;
                $result['alert'] = 'Data berhasil disimpan';
                $result['edit'] = TRUE;
                $result['sql']=$sql;
            }else{
                $result['status'] = 2;
                $result['alert'] = "Data gagal disimpan ke database";
                $result['sql']=$sql;
            }
        }else{
            $result['status'] = 3;
            $result['alert'] = "error input";
            $result['error_input'][0] = "Password baru dan konfirmasi password tidak sama ! ";
            $result['sql']=$sql;
        }			
    }else{
        $result['status'] = 3;
        $result['alert'] = "error input";
        $result['error_input'][0] = "Password lama salah ! Harap input password yang benar. ";
        $result['sql']=$sql;
    }
    echo json_encode($result);
}


function getBlok(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    if($kode_menu == "MOBILERW"){
        $filter = "";
        $result['blok'] = "";
    }else{
        $filter = " and kode_pp='$kode_pp' ";
        $sql="select kode_rumah from hakakses where kode_lokasi='$kode_lokasi' and nik='$nik' ";
        $rs2=execute($sql);
        $kode_rumah=$rs2->fields[0];

        $sqlBlok="select blok from rt_rumah where kode_lokasi='$kode_lokasi' and kode_rumah='$kode_rumah' ";
        $rs4=execute($sqlBlok);
        $blok=$rs4->fields[0];
        $result['blok'] = $blok;
    }
    
    $sql = "select blok from rt_blok where kode_lokasi='$kode_lokasi' $filter order by blok ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getKartuIuran(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $blok = $_POST['blok'];
    $periode = date('Ym');
    
    $sql="select a.kode_rumah,case when sum(nilai) < 0 then 0 else sum(nilai)end as saldo from 
    (
        select a.kode_rumah,sum(a.nilai_rt+a.nilai_rw) as nilai
        from rt_bill_d a
        inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
        where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode <='$periode' and a.kode_jenis='IWAJIB' and a.flag_aktif='1'
        group by a.kode_rumah
        union 
        select a.kode_rumah,-sum(a.nilai_rt+a.nilai_rw) as nilai
        from rt_angs_d a
        inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
        where a.kode_lokasi ='$kode_lokasi' and b.blok ='$blok' and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
        group by a.kode_rumah
        ) a
        group by a.kode_rumah 
    ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}


function getJenis(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];

    $result = array("message" => "", "rows" => 0, "status" => "" );

    if($_POST['jenis'] == 'Keluar'){
        $jenis="PENGELUARAN";
    }else{
        $jenis="PENERIMAAN";
    }
    $sql="select a.kode_ref, a.nama 
    from trans_ref a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='$nik'
    where a.jenis='$jenis' and a.kode_lokasi='$kode_lokasi'";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);


}

function simpanKas(){
    session_start();
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
    if($_POST['kode_jenis'] == 'Keluar'){
        $jenis="BK";
    }else{
        $jenis="BM";
    }
    
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-".$jenis.$per.".";
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");
    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.nama,a.akun_debet,a.akun_kredit,a.kode_pp, b.kode_gar as gar_debet,c.kode_gar as gar_kredit 
    from trans_ref a 
    inner join masakun b on a.akun_debet=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
    inner join masakun c on a.akun_kredit=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
    where a.kode_ref='".$_POST['kode_ref']."' and a.kode_lokasi='".$kode_lokasi."'";

    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    $akunDebet=$row->akun_debet;
    $akunKredit=$row->akun_kredit;

    if($_POST['kode_jenis'] == 'Keluar'){
        $akunKredit = $_POST['kode_akun'];
    }else{
        $akunDebet = $_POST['kode_akun'];
    }

    $exec = array();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','KB','KBDUAL','T','-','-','".$kode_pp."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum($_POST['nilai']).",0,0,'".$nik."','-','-','-','-','-','".$_POST['kode_ref']."','TUNAI','".$jenis."')";

    $sql2 = "insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunDebet."','D',".joinNum($_POST['nilai']).",".joinNum($_POST['nilai']).",'".$_POST['keterangan']."','KB','".$jenis."','IDR',1,'".$kode_pp."','".$_POST['kode_ref']."','-','-','-','-','-','-','-')";	

    $sql3="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunKredit."','C',".joinNum($_POST['nilai']).",".joinNum($_POST['nilai']).",'".$_POST['keterangan']."','KB','".$jenis."','IDR',1,'".$kode_pp."','".$_POST['kode_ref']."','-','-','-','-','-','-','-')";		
    $sql4 = "insert into gldt (no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' from trans_j 
    where kode_lokasi='".$kode_lokasi."' and no_bukti='".$id." '";

    array_push($exec,$sql1);
    array_push($exec,$sql2);
    array_push($exec,$sql3);
    array_push($exec,$sql4);
    $rs = executeArray($exec,$err);

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
    $result["message"] =$tmp;
    $result["status"] = $sts;
    echo json_encode($result);
}

function simpanPinBuk(){
    session_start();
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
    
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-BM".$per.".";
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");
    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $akunDebet=$_POST['kode_akun_sumber'];
    $akunKredit=$_POST['kode_akun_tujuan'];

    $exec = array();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','KB','KBDUAL','T','-','-','".$kode_pp."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum($_POST['nilai']).",0,0,'".$nik."','-','-','-','-','-','-','TUNAI','BM')";

    $sql2 = "insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunDebet."','C',".joinNum($_POST['nilai']).",".joinNum($_POST['nilai']).",'".$_POST['keterangan']."','KB','BK','IDR',1,'".$kode_pp."','-','-','-','-','-','-','-','-')";	

    $sql3="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunKredit."','D',".joinNum($_POST['nilai']).",".joinNum($_POST['nilai']).",'".$_POST['keterangan']."','KB','BM','IDR',1,'".$kode_pp."','-','-','-','-','-','-','-','-')";		
    
    $sql4 = "insert into gldt (no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' from trans_j 
    where kode_lokasi='".$kode_lokasi."' and no_bukti='".$id." '";

    array_push($exec,$sql1);
    array_push($exec,$sql2);
    array_push($exec,$sql3);
    array_push($exec,$sql4);
    $rs = executeArray($exec,$err);

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
    $result["message"] =$tmp;
    $result["status"] = $sts;
    echo json_encode($result);
}

function getBayarIuran(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $periode = date('Ym');
    $blok = $_POST['blok'];
    if($blok != ""){
        $filter = " and b.blok='$blok' ";
    }else{
        $filter = "";
    }

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.kode_rumah,a.saldo,isnull(b.nilai,0) as bayar 
    from (
        select a.kode_rumah,a.kode_lokasi,case when sum(a.nilai) < 0 then 0 else sum(a.nilai)end as saldo
        from 
        (
            select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
            from rt_bill_d a
            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
            where a.kode_lokasi ='$kode_lokasi' $filter and a.periode <='$periode' and a.kode_jenis='IWAJIB' and a.flag_aktif='1'
            group by a.kode_rumah,a.kode_lokasi
            union all
            select a.kode_rumah,a.kode_lokasi,-sum(a.nilai_rt+a.nilai_rw) as nilai
            from rt_angs_d a
            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi ='$kode_lokasi' $filter and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
            group by a.kode_rumah,a.kode_lokasi
        ) a
        group by a.kode_rumah,a.kode_lokasi
    ) a
    left join (	select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                from rt_angs_d a
                inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi ='$kode_lokasi' $filter
                and a.kode_jenis='IWAJIB' and a.no_setor='-'
                group by a.kode_rumah,a.kode_lokasi
    ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
    ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function simpanIuran(){
    session_start();
    $jenis="BM";
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
                
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-".$jenis.$per.".";
    
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt 
    from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi 
    where b.kode_rumah='".$_POST['no_rumah']."' and a.kode_lokasi='".$kode_lokasi."'";

    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    // $akunKas=$row->akun_kas;
    // $akunPdpt=$row->akun_pdpt;
    // $akunKasRW=$row->akun_kastitip;
    $akunTitip=$row->akun_titip;

    $akunKas = $_POST['kode_akun'];

    $_POST['keterangan']="Penerimaan Iuran Wajib atas rumah ".$_POST['no_rumah']." periode ".$periode;
    $exec = array();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','RTRW','KBIUR','T','0','0','".$kode_pp."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum($_POST['bayar']).",0,0,'-','-','-','".$_POST['stsByr']."','-','-','".$_POST['no_rumah']."','IWAJIB','-')";
    array_push($exec,$sql1);

    $nilai_iur=joinNum($_POST['nilRW'])+joinNum($_POST['nilRT']);
                                    
    $sql2="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunKas."','D',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','KBRW','IDR',1,'".$kode_pp."','-','-','-','-','-','-','-','-')";
    array_push($exec,$sql2);				

    $sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                        ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),1,'".$akunTitip."','C',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$kode_pp."','-','-','-','-','-','-','-','-')";
    array_push($exec,$sql4);	

    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['periode']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a]= "insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values 
                        ('".$id."','".$_POST['no_rumah']."','IWAJIB','".$_POST['periode'][$a]."','".$periode."',".$_POST['nilai_rt'][$a].",".$_POST['nilai_rw'][$a].",'".$kode_lokasi."','".$kode_pp."','D','KBIUR','KAS','-')";
            array_push($exec,$sql6[$a]);	
        }
    }
    
    
    $sql7 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
    select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
    from trans_j 
    where kode_lokasi='".$kode_lokasi."' and no_bukti='".$id."' ";
	
    array_push($exec,$sql7);	

    $tmp=array();
    $kode = array();
    $res = executeArray($exec,$err);
    // $err = null;
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan. No Bukti: ".$id;
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["prefix"]=$prefix;
    $result["id"]=$id;
    $result["no_bukti"]=$id;
    $result["sql"]=$exec;
    $result['jenis'] = $jenis;
    echo json_encode($result);
}

function getBayarIuranRw(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $periode = date('Ym');
    $blok = $_POST['blok'];
    if($blok != ""){
        $filter = " and b.blok='$blok' ";
    }else{
        $filter = "";
    }

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.kode_rumah,a.saldo,isnull(b.nilai,0) as bayar 
    from (
        select a.kode_rumah,a.kode_lokasi,case when sum(a.nilai) < 0 then 0 else sum(a.nilai)end as saldo
        from 
        (
            select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
            from rt_bill_d a
            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
            where a.kode_lokasi ='$kode_lokasi' $filter and a.periode <='$periode' and a.kode_jenis='IWAJIB' and a.flag_aktif='1'
            group by a.kode_rumah,a.kode_lokasi
            union all
            select a.kode_rumah,a.kode_lokasi,-sum(a.nilai_rt+a.nilai_rw) as nilai
            from rt_angs_d a
            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi ='$kode_lokasi' $filter and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
            group by a.kode_rumah,a.kode_lokasi
        ) a
        group by a.kode_rumah,a.kode_lokasi
    ) a
    left join (	select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                from rt_angs_d a
                inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi ='$kode_lokasi' $filter
                and a.kode_jenis='IWAJIB' and a.no_setor='-'
                group by a.kode_rumah,a.kode_lokasi
    ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
    ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function simpanIuranRw(){
    session_start();
    $jenis="BM";
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
                
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-".$jenis.$per.".";
    
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    //id setor
    $prefix2=$kode_lokasi."-STR".$per.".";
    $query2 = execute("select right(isnull(max(no_setor),'0000'),".strlen($str_format).")+1 as id from rt_setor_m where no_setor like '$prefix2%' ");

    $id_setor = $prefix2.str_pad($query2->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt,b.rt 
    from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi 
    where b.kode_rumah='".$_POST['no_rumah']."' and a.kode_lokasi='".$kode_lokasi."'";

    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    // $akunKas=$row->akun_kas;
    // $akunPdpt=$row->akun_pdpt;
    // $akunKasRW=$row->akun_kastitip;
    $akunTitip=$row->akun_titip;
    $rt = $row->rt;
    $kode_drk = "ST".substr($rt,1);

    $akunKas = $_POST['kode_akun'];

    $_POST['keterangan']="Penerimaan Iuran Wajib atas rumah ".$_POST['no_rumah']." periode ".$periode;
    $exec = array();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','RTRW','KBIUR','T','0','0','".$rt."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum($_POST['bayar']).",0,0,'-','-','-','".$_POST['stsByr']."','-','-','".$_POST['no_rumah']."','IWAJIB','-')";
    array_push($exec,$sql1);

    $nilai_iur=joinNum($_POST['nilRW'])+joinNum($_POST['nilRT']);
                                    
    $sql2="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunKas."','D',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','KBRW','IDR',1,'".$kode_pp."','".$kode_drk."','-','-','-','-','-','-','-')";
    array_push($exec,$sql2);				

    $sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                        ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),1,'".$akunTitip."','C',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$rt."','".$kode_drk."','-','-','-','-','-','-','-')";
    array_push($exec,$sql4);	

    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['periode']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a]= "insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values 
                        ('".$id."','".$_POST['no_rumah']."','IWAJIB','".$_POST['periode'][$a]."','".$periode."',".$_POST['nilai_rt'][$a].",".$_POST['nilai_rw'][$a].",'".$kode_lokasi."','".$rt."','D','KBIUR','KAS','$id_setor')";
            array_push($exec,$sql6[$a]);	
        }
    }
    
    
    $sql7 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
    select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
    from trans_j 
    where kode_lokasi='".$kode_lokasi."' and no_bukti='".$id."' ";
	
    array_push($exec,$sql7);
    
    //SIMPAN SETORAN

    $keterangan = "Setoran bulan ".toBulan(date('m'));
    $_POST['jml_iuran'] = 1;
    $_POST['sumbangan'] = 100000;
    $_POST['gaji']=1200000;
    $_POST['kasRT']= joinNum($_POST['nilRT']) - $_POST['sumbangan'];
    $_POST['kasRW']= joinNum($_POST['bayar']) - joinNum($_POST['nilRT']) - $_POST['gaji'];
    $_POST['setor']= $_POST['kasRW']+$_POST['sumbangan'];

    $sql8 = "insert into rt_setor_m (no_setor,kode_lokasi,tanggal,keterangan,kode_pp,modul,periode,nilai,tgl_input,nik_user,no_kas, jml_iuran,sumbangan,gaji_bersih,kas_rt,kas_rw,no_terima ) values  
            ('".$id_setor."','".$kode_lokasi."',getdate(),'".$keterangan."','".$rt."','IWAJIB','".$periode."',".joinNum($_POST['nilRW']).",getdate(),'".$nik."','-', ".$_POST['jml_iuran'].",".$_POST['sumbangan'].",".$_POST['gaji'].",".joinNum($_POST['kasRT']).",".joinNum($_POST['kasRW']).",'".$id_setor."')";

    array_push($exec,$sql8);	
    
    $sql9 = "insert into rt_terima_m (no_terima,tanggal,kode_lokasi,no_setor,nik_terima,periode) values ('".$id_setor."',getdate(),'$kode_lokasi','".$id_setor."','".$nik."','$periode') ";
    array_push($exec,$sql9);

    // $sql9 = "update rt_angs_d set no_setor='".$id_setor."' where no_setor='-' and kode_rumah='".$_POST['kode_rumah']."' and kode_lokasi='".$kode_lokasi."' and kode_jenis='IWAJIB'";
    // // $rs6=execute($sql6[$a]);
    // array_push($exec,$sql6[$a]);
    

    $tmp=array();
    $kode = array();
    $res = executeArray($exec,$err);
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan. No Bukti: ".$id." No Setor: ".$id_setor;
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["prefix"]=$prefix;
    $result["id"]=$id;
    $result["no_bukti"]=$id;
    $result["sql"]=$exec;
    $result['jenis'] = $jenis;
    echo json_encode($result);
}

function simpanIuranRwDok(){
    session_start();
    $jenis="BM";
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
    $no_dok = $_POST['no_bukti_dok'];
                
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-".$jenis.$per.".";
    
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    //id setor
    $prefix2=$kode_lokasi."-STR".$per.".";
    $query2 = execute("select right(isnull(max(no_setor),'0000'),".strlen($str_format).")+1 as id from rt_setor_m where no_setor like '$prefix2%' ");

    $id_setor = $prefix2.str_pad($query2->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt,b.rt 
    from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi 
    where b.kode_rumah='".$_POST['no_rumah']."' and a.kode_lokasi='".$kode_lokasi."'";

    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    // $akunKas=$row->akun_kas;
    // $akunPdpt=$row->akun_pdpt;
    // $akunKasRW=$row->akun_kastitip;
    $akunTitip=$row->akun_titip;
    $rt = $row->rt;
    $kode_drk = "ST".substr($rt,1);

    $akunKas = $_POST['kode_akun'];

    $_POST['keterangan']="Penerimaan Iuran Wajib atas rumah ".$_POST['no_rumah']." periode ".$periode;
    $exec = array();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','RTRW','KBIUR','T','0','0','".$rt."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum($_POST['bayar']).",0,0,'-','-','-','".$_POST['stsByr']."','-','-','".$_POST['no_rumah']."','IWAJIB','-')";
    array_push($exec,$sql1);

    $nilai_iur=joinNum($_POST['nilRW'])+joinNum($_POST['nilRT']);
                                    
    $sql2="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunKas."','D',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','KBRW','IDR',1,'".$kode_pp."','".$kode_drk."','-','-','-','-','-','-','-')";
    array_push($exec,$sql2);				

    $sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                        ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),1,'".$akunTitip."','C',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$rt."','".$kode_drk."','-','-','-','-','-','-','-')";
    array_push($exec,$sql4);	

    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['periode']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a]= "insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values 
                        ('".$id."','".$_POST['no_rumah']."','IWAJIB','".$_POST['periode'][$a]."','".$periode."',".$_POST['nilai_rt'][$a].",".$_POST['nilai_rw'][$a].",'".$kode_lokasi."','".$rt."','D','KBIUR','KAS','$id_setor')";
            array_push($exec,$sql6[$a]);	
        }
    }
    
    
    $sql7 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
    select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
    from trans_j 
    where kode_lokasi='".$kode_lokasi."' and no_bukti='".$id."' ";
	
    array_push($exec,$sql7);
    
    //SIMPAN SETORAN

    $keterangan = "Setoran bulan ".toBulan(date('m'));
    $_POST['jml_iuran'] = 1;
    $_POST['sumbangan'] = 100000;
    $_POST['gaji']=1200000;
    $_POST['kasRT']= joinNum($_POST['nilRT']) - $_POST['sumbangan'];
    $_POST['kasRW']= joinNum($_POST['bayar']) - joinNum($_POST['nilRT']) - $_POST['gaji'];
    $_POST['setor']= $_POST['kasRW']+$_POST['sumbangan'];

    $sql8 = "insert into rt_setor_m (no_setor,kode_lokasi,tanggal,keterangan,kode_pp,modul,periode,nilai,tgl_input,nik_user,no_kas, jml_iuran,sumbangan,gaji_bersih,kas_rt,kas_rw,no_terima ) values  
            ('".$id_setor."','".$kode_lokasi."',getdate(),'".$keterangan."','".$rt."','IWAJIB','".$periode."',".joinNum($_POST['nilRW']).",getdate(),'".$nik."','-', ".$_POST['jml_iuran'].",".$_POST['sumbangan'].",".$_POST['gaji'].",".joinNum($_POST['kasRT']).",".joinNum($_POST['kasRW']).",'".$id_setor."')";

    array_push($exec,$sql8);	
    
    $sql9 = "insert into rt_terima_m (no_terima,tanggal,kode_lokasi,no_setor,nik_terima,periode) values ('".$id_setor."',getdate(),'$kode_lokasi','".$id_setor."','".$nik."','$periode') ";
    array_push($exec,$sql9);

    // $sql9 = "update rt_angs_d set no_setor='".$id_setor."' where no_setor='-' and kode_rumah='".$_POST['kode_rumah']."' and kode_lokasi='".$kode_lokasi."' and kode_jenis='IWAJIB'";
    // // $rs6=execute($sql6[$a]);
    // array_push($exec,$sql6[$a]);

    $sql10 = "update rt_trans_dok set no_app='$id_setor' where no_bukti='$no_dok' and kode_lokasi='$kode_lokasi' and kode_rumah='".$_POST['no_rumah']."' ";
    array_push($exec,$sql10);

    $tmp=array();
    $kode = array();
    $res = executeArray($exec,$err);
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan. No Bukti: ".$id." No Setor: ".$id_setor;
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["no_bukti"] = $id;
    $result["jenis"] = $jenis;
    echo json_encode($result);
}


function getBayarIuranSat(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $periode = date('Ym');
    $blok = $_POST['blok'];
    if($blok != ""){
        $filter = " and b.blok='$blok' ";
    }else{
        $filter = "";
    }

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.kode_rumah,a.saldo,isnull(b.nilai,0) as bayar 
    from (
        select a.kode_rumah,a.kode_lokasi,case when sum(a.nilai) < 0 then 0 else sum(a.nilai)end as saldo
        from 
        (
            select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
            from rt_bill_d a
            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi 
            where a.kode_lokasi ='$kode_lokasi' $filter and a.periode <='$periode' and a.kode_jenis='IWAJIB' and a.flag_aktif='1'
            group by a.kode_rumah,a.kode_lokasi
            union all
            select a.kode_rumah,a.kode_lokasi,-sum(a.nilai_rt+a.nilai_rw) as nilai
            from rt_angs_d a
            inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
            where a.kode_lokasi ='$kode_lokasi' $filter and a.periode_bill <='$periode' and a.kode_jenis='IWAJIB'
            group by a.kode_rumah,a.kode_lokasi
        ) a
        group by a.kode_rumah,a.kode_lokasi
    ) a
    left join (	select a.kode_rumah,a.kode_lokasi,sum(a.nilai_rt+a.nilai_rw) as nilai
                from rt_angs_d a
                inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
                where a.kode_lokasi ='$kode_lokasi' $filter
                and a.kode_jenis='IWAJIB' and a.no_setor='-'
                group by a.kode_rumah,a.kode_lokasi
    ) b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
    ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function simpanIuranSat(){
    session_start();
    $jenis="BM";
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
                
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-".$jenis.$per.".";
    
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt 
    from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi 
    where b.kode_rumah='".$_POST['no_rumah']."' and a.kode_lokasi='".$kode_lokasi."'";

    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    // $akunKas=$row->akun_kas;
    // $akunPdpt=$row->akun_pdpt;
    // $akunKasRW=$row->akun_kastitip;
    $akunTitip=$row->akun_titip;

    $akunKas = $_POST['kode_akun'];

    $_POST['keterangan']="Penerimaan Iuran Wajib atas rumah ".$_POST['no_rumah']." periode ".$periode;
    $exec = array();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','RTRW','KBIUR','T','0','0','".$kode_pp."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum($_POST['bayar']).",0,0,'-','-','-','".$_POST['stsByr']."','-','-','".$_POST['no_rumah']."','IWAJIB','-')";
    array_push($exec,$sql1);

    $nilai_iur=joinNum($_POST['nilRW'])+joinNum($_POST['nilRT']);
                                    
    $sql2="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$akunKas."','D',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','KBRW','IDR',1,'".$kode_pp."','-','-','-','-','-','-','-','-')";
    array_push($exec,$sql2);				

    $sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                        ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),1,'".$akunTitip."','C',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$kode_pp."','-','-','-','-','-','-','-','-')";
    array_push($exec,$sql4);	

    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['periode']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a]= "insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values 
                        ('".$id."','".$_POST['no_rumah']."','IWAJIB','".$_POST['periode'][$a]."','".$periode."',".$_POST['nilai_rt'][$a].",".$_POST['nilai_rw'][$a].",'".$kode_lokasi."','".$kode_pp."','D','KBIUR','KAS','-')";
            array_push($exec,$sql6[$a]);	
        }
    }
    
    
    // $sql7 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
    // select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
    // from trans_j 
    // where kode_lokasi='".$kode_lokasi."' and no_bukti='".$id."' ";
	
    // array_push($exec,$sql7);	

    $tmp=array();
    $kode = array();
    $res = executeArray($exec,$err);
    // $err = null;
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan. No Bukti: ".$id;
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["prefix"]=$prefix;
    $result["id"]=$id;
    $result["sql"]=$exec;
    $result["no_bukti"]=$id;
    $result['jenis'] = $jenis;
    echo json_encode($result);
}

function getDetailBayar(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $periode = date('Ym');
    $kode_rumah = $_POST['kode_rumah'];
    $tahun = date('Y');

    $result = array("message" => "", "rows" => 0, "status" => "" );

    // $sql="
    // select a.periode,a.nilai_rt,a.nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,isnull(b.bayar,0) as bayar
    // from rt_bill_d a 
    // left join (
    // select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt+nilai_rw) as bayar
    // from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_rumah ='$kode_rumah' and kode_jenis='IWAJIB' group by periode_bill,kode_lokasi,kode_rumah
    // ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
    // where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0
    // order by a.periode
    // ";
    // $sql = "select a.periode,a.nilai_rt-isnull(b.nilai_rt,0) as nilai_rt,a.nilai_rw-isnull(b.nilai_rw,0) as nilai_rw,(a.nilai_rt+a.nilai_rw) as bill, a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0)) as bayar 
    // from rt_bill_d a left join rt_angs_d b on a.kode_rumah=b.kode_rumah and a.periode=b.periode_bill and a.kode_lokasi=b.kode_lokasi
    // where a.kode_rumah ='$kode_rumah' and (a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0))  <> 0)  order by a.periode";
    $sql = "select a.periode,a.nilai_rt-isnull(b.nilai_rt,0) as nilai_rt,a.nilai_rw-isnull(b.nilai_rw,0) as nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0)) as bayar
    from rt_bill_d a 
    left join (
		select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw,sum(nilai_rt+nilai_rw) as bayar
		from rt_angs_d 
		where kode_lokasi ='$kode_lokasi' and kode_rumah ='$kode_rumah' and kode_jenis='IWAJIB' 
		group by periode_bill,kode_lokasi,kode_rumah
    ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
    where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0 and a.flag_aktif='1'
    order by a.periode";
        
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}


function getDetailBayarRw(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $periode = date('Ym');
    $kode_rumah = $_POST['kode_rumah'];
    $tahun = date('Y');

    $result = array("message" => "", "rows" => 0, "status" => "" );

    // $sql="
    // select a.periode,a.nilai_rt,a.nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,isnull(b.bayar,0) as bayar
    // from rt_bill_d a 
    // left join (
    // select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt+nilai_rw) as bayar
    // from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_rumah ='$kode_rumah' and kode_jenis='IWAJIB' group by periode_bill,kode_lokasi,kode_rumah
    // ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
    // where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0
    // order by a.periode
    // ";
    // $sql = "select a.periode,a.nilai_rt-isnull(b.nilai_rt,0) as nilai_rt,a.nilai_rw-isnull(b.nilai_rw,0) as nilai_rw,(a.nilai_rt+a.nilai_rw) as bill, a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0)) as bayar 
    // from rt_bill_d a left join rt_angs_d b on a.kode_rumah=b.kode_rumah and a.periode=b.periode_bill and a.kode_lokasi=b.kode_lokasi
    // where a.kode_rumah ='$kode_rumah' and (a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0))  <> 0) order by a.periode";
    
    $sql = "select a.periode,a.nilai_rt-isnull(b.nilai_rt,0) as nilai_rt,a.nilai_rw-isnull(b.nilai_rw,0) as nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0)) as bayar 
    from rt_bill_d a 
    left join (
		select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw,sum(nilai_rt+nilai_rw) as bayar
		from rt_angs_d 
		where kode_lokasi ='$kode_lokasi' and kode_rumah ='$kode_rumah' and kode_jenis='IWAJIB' 
		group by periode_bill,kode_lokasi,kode_rumah
    ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
    where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0 and a.flag_aktif='1'
    order by a.periode";
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}


function getDetailBayarSat(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $periode = date('Ym');
    $kode_rumah = $_POST['kode_rumah'];
    $tahun = date('Y');

    $result = array("message" => "", "rows" => 0, "status" => "" );

    // $sql="
    // select a.periode,a.nilai_rt,a.nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,isnull(b.bayar,0) as bayar
    // from rt_bill_d a 
    // left join (
    // select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt+nilai_rw) as bayar
    // from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_rumah ='$kode_rumah' and kode_jenis='IWAJIB' group by periode_bill,kode_lokasi,kode_rumah
    // ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
    // where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0
    // order by a.periode
    // ";
    // $sql = "select a.periode,a.nilai_rt-isnull(b.nilai_rt,0) as nilai_rt,a.nilai_rw-isnull(b.nilai_rw,0) as nilai_rw,(a.nilai_rt+a.nilai_rw) as bill, a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0)) as bayar 
    // from rt_bill_d a left join rt_angs_d b on a.kode_rumah=b.kode_rumah and a.periode=b.periode_bill and a.kode_lokasi=b.kode_lokasi
    // where a.kode_rumah ='$kode_rumah' and (a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0))  <> 0)  order by a.periode";
    $sql = "select a.periode,a.nilai_rt-isnull(b.nilai_rt,0) as nilai_rt,a.nilai_rw-isnull(b.nilai_rw,0) as nilai_rw,(a.nilai_rt+a.nilai_rw) as bill,a.nilai_rt+a.nilai_rw - (isnull(b.nilai_rt+b.nilai_rw,0)) as bayar
    from rt_bill_d a 
    left join (
		select periode_bill,kode_lokasi,kode_rumah,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw,sum(nilai_rt+nilai_rw) as bayar
		from rt_angs_d 
		where kode_lokasi ='$kode_lokasi' and kode_rumah ='$kode_rumah' and kode_jenis='IWAJIB' 
		group by periode_bill,kode_lokasi,kode_rumah
    ) b on a.periode=periode_bill and a.kode_lokasi=b.kode_lokasi and a.kode_rumah=b.kode_rumah 
    where a.kode_lokasi ='$kode_lokasi' and a.kode_rumah ='$kode_rumah' and a.kode_jenis='IWAJIB' and (a.nilai_rt+a.nilai_rw) - isnull(b.bayar,0) > 0 and a.flag_aktif='1'
    order by a.periode";
        
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function getSetoran(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_pp=$_SESSION['kodePP'];
    $periode = date('Ym');

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql=" select kode_lokasi,kode_rumah,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw,sum(nilai_rt+nilai_rw) as bayar
    from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_pp='$kode_pp' and no_setor='-' and kode_jenis='IWAJIB' group by kode_lokasi,kode_rumah
    "; 
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function getRT(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_pp=$_GET['kode_pp'];
    $no_setor=$_GET['no_setor'];
    $periode = date('Ym');

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql=" select kode_pp,nama
    from pp where kode_lokasi ='$kode_lokasi' and kode_pp <> '00'
    "; 
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function getNoSetor(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_pp=$_POST['kode_pp'];
    $no_setor=$_POST['no_setor'];
    $periode = date('Ym');

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql=" select no_setor,keterangan 
    from rt_setor_m where kode_lokasi ='$kode_lokasi' and kode_pp = '$kode_pp' and no_terima = '-'
    "; 
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function getTerimaSetoran(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_pp=$_POST['kode_pp'];
    $no_setor=$_POST['no_setor'];
    $periode = date('Ym');

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql=" select kode_lokasi,kode_rumah,sum(nilai_rt) as nilai_rt,sum(nilai_rw) as nilai_rw,sum(nilai_rt+nilai_rw) as bayar
    from rt_angs_d where kode_lokasi ='$kode_lokasi' and kode_pp='$kode_pp' and no_setor='".$no_setor."' and kode_jenis='IWAJIB' group by kode_lokasi,kode_rumah
    "; 
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function simpanSetoran(){
    session_start();          
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_pp=$_SESSION['kodePP'];
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-STR".$per.".";
    
    $query = execute("select right(isnull(max(no_setor),'0000'),".strlen($str_format).")+1 as id from rt_setor_m where no_setor like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $exec = array();
    $keterangan = "Setoran bulan ".toBulan(date('m'));
    $_POST['jml_iuran'] = count($_POST['kode_rumah']);
    $_POST['sumbangan'] = 100000;
    $_POST['gaji']=1200000;
    $_POST['kasRT']= joinNum($_POST['nilRT']) - $_POST['sumbangan'];
    $_POST['kasRW']= joinNum($_POST['bayar']) - joinNum($_POST['nilRT']) - $_POST['gaji'];
    $_POST['setor']= $_POST['kasRW']+$_POST['sumbangan'];


    $sql1 = "insert into rt_setor_m (no_setor,kode_lokasi,tanggal,keterangan,kode_pp,modul,periode,nilai,tgl_input,nik_user,no_kas, jml_iuran,sumbangan,gaji_bersih,kas_rt,kas_rw,no_terima ) values  
            ('".$id."','".$kode_lokasi."','".reverseDate($_POST['tanggal'],"-","-")."','".$keterangan."','".$kode_pp."','IWAJIB','".$periode."',".joinNum($_POST['nilRW']).",getdate(),'".$nik."','-', ".$_POST['jml_iuran'].",".$_POST['sumbangan'].",".$_POST['gaji'].",".joinNum($_POST['kasRT']).",".joinNum($_POST['kasRW']).",'-' )";

    array_push($exec,$sql1);																							
    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['kode_rumah']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a] = "update rt_angs_d set no_setor='".$id."' where no_setor='-' and kode_rumah='".$_POST['kode_rumah'][$a]."' and kode_lokasi='".$kode_lokasi."' and kode_jenis='IWAJIB'";
            // $rs6=execute($sql6[$a]);
            array_push($exec,$sql6[$a]);		
            
        }
    } 
    $tmp=array();
    $kode = array();
    $res = executeArray($exec,$err);
    // $res = true;
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan. No Bukti: ".$id;
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["prefix"]=$prefix;
    $result["id"]=$id;
    $result["sql"]=$sql1;
    $result["sql6"]=$sql6;

    echo json_encode($result);
}

function simpanTerimaSetoran(){
    session_start();          
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_pp=$_POST['kode_pp'];
    $pp_login = $_SESSION['kodePP'];
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$kode_lokasi."-TRM".$per.".";

    $rt = $_POST['kode_pp'];
    $kode_drk = "ST".substr($rt,1);

    $sql="select akun_kredit from trans_ref
    where kode_ref ='$kode_drk'  and kode_lokasi='".$kode_lokasi."'";
    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    $akunKredit=$row->akun_kredit;
    
    $query = execute("select right(isnull(max(no_terima),'0000'),".strlen($str_format).")+1 as id from rt_terima_m where no_terima like '$prefix%' ");
    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);
    $exec = array();

    $sql1 = "update rt_setor_m set no_terima='".$id."' where no_setor ='".$_POST['no_setor']."' and kode_pp='".$_POST['kode_pp']."' and kode_lokasi='".$kode_lokasi."' ";
    array_push($exec,$sql1);
    
    $sql2 = "insert into rt_terima_m (no_terima,tanggal,kode_lokasi,no_setor,nik_terima,periode) values ('".$id."',getdate(),'$kode_lokasi','".$_POST['no_setor']."','".$nik."','$periode') ";
    array_push($exec,$sql2);
    
    $keterangan = "Terima Setoran RT ".$_POST['kode_pp'];
    $sql3 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','TERIMA','TERIMA','T','0','0','".$pp_login."',getdate(),'-','".$keterangan."','IDR',1,".joinNum($_POST['bayar']).",0,0,'-','-','-','-','-','-','".$_POST['no_setor']."','-','-')";
    array_push($exec,$sql3);
                                    
    $sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                    ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),0,'".$_POST['akun_kas']."','D',".joinNum($_POST['bayar']).",".joinNum($_POST['bayar']).",'".$keterangan."','TERIMA','BM','IDR',1,'".$pp_login."','".$kode_drk."','-','-','-','-','-','-','-')";
    array_push($exec,$sql4);				

    $sql5="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                        ('".$id."','".$kode_lokasi."',getdate(),'".$nik."','".$periode."','-',getdate(),1,'".$akunKredit."','C',".joinNum($_POST['bayar']).",".joinNum($_POST['bayar']).",'".$keterangan."','TERIMA','BM','IDR',1,'".$pp_login."','".$kode_drk."','-','-','-','-','-','-','-')";
    array_push($exec,$sql5);	

    $detail=FALSE;    
    
    $sql6 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
    select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
    from trans_j 
    where kode_lokasi='".$kode_lokasi."' and no_bukti='".$id."' ";
	
    array_push($exec,$sql6);
    

    $tmp=array();
    $kode = array();
    $res = executeArray($exec,$err);
    // $res = true;
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan. No Bukti: ".$id;
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["prefix"]=$prefix;
    $result["id"]=$id;
    $result["sql"]=$sql1;
    $result["sql2"]=$sql2;

    echo json_encode($result);
}

function getPeriodeSetor(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $periode = date('Ym');
    $sql="select 'all' as periode union all select '$periode' as periode union all select distinct periode from rt_setor_m where kode_lokasi='$kode_lokasi' order by periode desc ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getRekapSetoran(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $per = $_POST['periode'];

    if($per == "" or $per == "all"){
        $filter = "";
    }else{
        $filter = " and b.periode='$per' ";
    }

    // $sql="select a.no_setor,convert(varchar,a.tanggal,103) as tanggal,a.nik_user,a.no_terima,isnull(convert(varchar,b.tanggal,103),'-') as tgl_terima,isnull(sum(a.nilai),0)+isnull(sum(a.kas_rt),0)+isnull(sum(a.sumbangan),0) as total 
    // from rt_setor_m a
    // left join rt_terima_m b on a.no_terima=b.no_terima and a.kode_lokasi=b.kode_lokasi
    // where a.kode_lokasi='$kode_lokasi' and a.kode_pp='$kode_pp' $filter and a.modul='IWAJIB'
    // group by a.no_setor,a.tanggal,a.nik_user,a.no_terima,convert(varchar,b.tanggal,103) 
    // order by a.no_setor desc ";
    $sql = "select a.no_setor,convert(varchar,a.tanggal,103) as tanggal,a.nik_user,a.no_terima,isnull(convert(varchar,b.tanggal,103),'-') as tgl_terima,a.kode_pp,isnull(sum(a.nilai),0)+isnull(sum(a.kas_rt),0)+isnull(sum(a.sumbangan),0) as total 
    from rt_terima_m b 
    left join rt_setor_m a on a.no_terima=b.no_terima and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' and a.kode_pp = '$kode_pp' $filter and a.modul='IWAJIB' 
    group by a.no_setor,a.tanggal,a.nik_user,a.no_terima,convert(varchar,b.tanggal,103),a.kode_pp 
    order by a.no_setor desc ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}


function getDetailRekapSetoran(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $no_setor = $_POST['no_setor'];

    if($no_setor == "" or $no_setor == "all"){
        $filter = "";
    }else{
        $filter = " and no_setor='".$no_setor."' ";
    }

    $sql="
    select kode_rumah,periode_bill,sum(nilai_rt)+sum(nilai_rw) as total
    from rt_angs_d
    where kode_lokasi ='$kode_lokasi' and kode_pp='$kode_pp' and kode_jenis='IWAJIB' $filter
    group by kode_rumah,periode_bill order by kode_rumah,periode_bill ";
    $rs = execute($sql);
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getRekapSetoranRw(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $per = $_POST['periode'];
    $pp = $_POST['pp'];

    if($per == "" or $per == "all"){
        $filter = "";
    }else{
        $filter = " and b.periode='$per' ";
    }

    if($pp == "" or $pp == "all"){
        $filter .= "";
    }else{
        $filter .= " and a.kode_pp='$pp' ";
    }


    // $sql="select a.no_setor,convert(varchar,a.tanggal,103) as tanggal,a.nik_user,a.no_terima,isnull(convert(varchar,b.tanggal,103),'-') as tgl_terima,a.kode_pp,isnull(sum(a.nilai),0)+isnull(sum(a.kas_rt),0)+isnull(sum(a.sumbangan),0) as total 
    // from rt_setor_m a
    // left join rt_terima_m b on a.no_terima=b.no_terima and a.kode_lokasi=b.kode_lokasi
    // where a.kode_lokasi='$kode_lokasi' $filter and a.modul='IWAJIB' and a.no_terima <> '-'
    // group by a.no_setor,a.tanggal,a.nik_user,a.no_terima,convert(varchar,b.tanggal,103),a.kode_pp 
    // order by a.no_setor desc";
    $sql = "select a.no_setor,convert(varchar,a.tanggal,103) as tanggal,a.nik_user,a.no_terima,isnull(convert(varchar,b.tanggal,103),'-') as tgl_terima,a.kode_pp,isnull(sum(a.nilai),0)+isnull(sum(a.kas_rt),0)+isnull(sum(a.sumbangan),0) as total 
    from rt_terima_m b 
    left join rt_setor_m a on a.no_terima=b.no_terima and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' $filter and a.modul='IWAJIB' 
    group by a.no_setor,a.tanggal,a.nik_user,a.no_terima,convert(varchar,b.tanggal,103),a.kode_pp 
    order by a.no_setor desc ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getRekapUpahPungut(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $per = $_POST['periode'];

    if($per == "" or $per == "all"){
        $filter = "";
    }else{
        $filter = " and b.periode='$per' ";
    }

    $sql = "select a.kode_pp, sum(c.nilai_rt+nilai_rw) as bayar, count(*) as jumlah,  count(*) * 3000 as upah_pungut  
    from rt_terima_m b 
        inner join rt_setor_m a on a.no_terima=b.no_terima and a.kode_lokasi=b.kode_lokasi
        inner join rt_angs_d c on a.no_setor=c.no_setor and a.kode_lokasi=c.kode_lokasi 
        where a.kode_lokasi='$kode_lokasi' $filter and a.modul='IWAJIB' 
        group by a.kode_pp 
    order by a.kode_pp ";
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getDetailRekapSetoranRw(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_menu=$_SESSION['kodeMenu'];
    $no_setor = $_POST['no_setor'];
    $pp = $_POST['pp'];
    $periode = $_POST['periode'];

    $filter = "";
    // if($periode == "" or $periode == "all"){
    //     $filter .= "";
    // }else{
    //     $filter .= " and periode_bill='".$periode."' ";
    // }

    if($no_setor == "" or $no_setor == "all"){
        $filter .= "";
    }else{
        $filter .= " and no_setor='".$no_setor."' ";
    }

    if($pp == "" or $pp == "all"){
        $filter .= "";
    }else{
        $filter .= " and kode_pp='$pp' ";
    }

    $sql="
    select kode_rumah,periode_bill,sum(nilai_rt)+sum(nilai_rw) as total
    from rt_angs_d
    where kode_lokasi ='$kode_lokasi' and kode_jenis='IWAJIB' $filter
    group by kode_rumah,periode_bill order by kode_rumah,periode_bill ";
    $rs = execute($sql);
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getWargaList(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_rumah=$_GET['kode_rumah'];

    if($kode_pp == ""){
        $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
        $res = execute($sql);
        $kode_pp = $res->fields[0];
    }
    //Riwayat

    $sql="select kode_blok,no_rumah,no_bukti,no_urut,nama,alias,kode_jk,isnull(convert(varchar,tgl_lahir,103),'-') as tgl_lahir,kode_agama,no_hp,kode_pp,isnull(foto,'-') as foto
    from rt_warga_d
    where no_rumah='$kode_rumah' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' 
    order by no_urut";
    $result['daftar'] = dbResultArray($sql);
    $result['status'] = TRUE;
    echo json_encode($result);

}

function getEditWarga(){
    session_start();

    $kode_lokasi=$_SESSION['lokasi'];
    $kode_pp=$_SESSION['kodePP'];
    $nik=$_SESSION['userLog'];
    $kode_rumah=$nik;
    $no_bukti=$_GET['no_bukti'];
    $no_urut=$_GET['no_urut'];
    $nama=$_GET['nama'];

    if($kode_pp == ""){
        $sql = "select rt from rt_rumah where kode_rumah='$nik' ";
        $res = execute($sql);
        $kode_pp = $res->fields[0];
    }
    //Riwayat

    $sql="select kode_blok,no_rumah,no_bukti,no_urut,nama,alias,kode_jk,isnull(convert(varchar,tgl_lahir,105),'-') as tgl_lahir,kode_agama,no_hp,kode_pp,isnull(foto,'-') as foto
    from rt_warga_d
    where no_rumah='$kode_rumah' and no_urut='$no_urut' and nama='$nama'  and no_bukti='$no_bukti' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' ";
    $result['daftar'] = dbResultArray($sql);
    $result['status'] = TRUE;
    echo json_encode($result);

}

function tambahWarga(){
    session_start();
    
    $root_lib=$_SERVER["DOCUMENT_ROOT"];
    include_once($root_lib."web/lib/libcurl.php");
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
    $exec = array();

    $kode_rumah = $nik;

    $sql = "select rt,blok from rt_rumah where kode_rumah='$kode_rumah' ";
    $res = execute($sql);
    $kode_pp = $res->fields[0];
    $blok = $res->fields[1];

    $sql = "select no_bukti from rt_warga_d where no_rumah='$kode_rumah' ";
    $res = execute($sql);
    if($res->RecordCount() > 0){
        $no_bukti = $res->fields[0];
    }else{
        $str_format="0000";
        $periode=date('Y').date('m');
        $per=date('y').date('m');
        $prefix="WR".$per;
        $sql="select right(isnull(max(no_bukti),'00000'),".strlen($str_format).")+1 as id from rt_warga_d where no_bukti like '$prefix%' and kode_lokasi='".$kode_lokasi."' ";
        $get = execute($sql);
        $no_bukti = $prefix.str_pad($get->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);
    }

    $res = execute("select max(no_urut) as nu from rt_warga_d where no_rumah ='$kode_rumah' and kode_lokasi='$kode_lokasi' and kode_blok ='$blok' ");
    $no_urut = intval($res->fields[0])+1;

    $pass = substr($_POST['input_no_hp'],6);
    
    $ins = "insert into rt_warga_d (kode_blok,no_rumah,no_urut,nama,alias,nik,kode_jk,tgl_lahir,kode_agama,no_hp,no_bukti,kode_lokasi,kode_pp,pass) values ('$blok','$kode_rumah','$no_urut','".$_POST['input_nama']."','".$_POST['input_alias']."','-','".$_POST['input_kode_jk']."','".reverseDate($_POST['input_tgl_lahir'])."','".$_POST['input_kode_agama']."','".$_POST['input_no_hp']."','$no_bukti','$kode_lokasi','$kode_pp','$pass')";

    array_push($exec,$ins);
    $rs = executeArray($exec,$err);
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan";
        $sts=true;
        $send = array(
            'no_bukti' => $no_bukti,
            'no_urut' => $no_urut,
            'kode_pp' => $kode_pp,
            'kode_lokasi' => $kode_lokasi,
            'no_rumah' => $kode_rumah,
            'password' => $pass
        );
        $res = curl("https://api.simkug.com/api/rtrw/hash_pass_perwarga",$send);
        
        $result["rescurl"] = $res;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan ".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;

    echo json_encode($result);
    
}

function ubahWarga(){
    session_start();
    
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
    $exec = array();

    $kode_rumah = $nik;

    $sql = "select rt,blok from rt_rumah where kode_rumah='$kode_rumah' ";
    $res = execute($sql);
    $kode_pp = $res->fields[0];
    $blok = $res->fields[1];

    $no_bukti = $_POST['input_no_bukti'];
    $no_urut = $_POST['input_no_urut'];
    $nama = $_POST['input_nama'];
    // $del = "delete from rt_warga_d where no_rumah='$kode_rumah' and no_urut='$no_urut' and nama='$nama' and no_bukti='$no_bukti' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' ";
    // array_push($exec,$del);

    // $ins = "insert into rt_warga_d (kode_blok,no_rumah,no_urut,nama,alias,nik,kode_jk,tgl_lahir,kode_agama,no_hp,no_bukti,kode_lokasi,kode_pp) values ('$blok','$kode_rumah','$no_urut','".$_POST['input_nama']."','".$_POST['input_alias']."','-','".$_POST['input_kode_jk']."','".reverseDate($_POST['input_tgl_lahir'])."','".$_POST['input_kode_agama']."','".$_POST['input_no_hp']."','$no_bukti','$kode_lokasi','$kode_pp')";
    // array_push($exec,$ins);

    $upd = "update rt_warga_d set nama='".$_POST['input_nama']."',alias='".$_POST['input_alias']."', kode_jk='".$_POST['input_kode_jk']."',kode_agama='".$_POST['input_kode_agama']."',tgl_lahir='".$_POST['tgl_lahir']."',no_hp = '".$_POST['input_no_hp']."' where no_rumah='$kode_rumah' and no_urut='$no_urut' and nama='$nama' and no_bukti='$no_bukti' and kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi' ";
    array_push($exec,$upd);


    $rs = executeArray($exec,$err);
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses diubah";
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal diubah ".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;

    echo json_encode($result);
    
}

function simpanBuktiBayar(){
    session_start();
    $kode_lokasi = $_SESSION['lokasi'];
    $nik = $_SESSION['userLog'];
    $kode_pp = $_SESSION['kodePP'];
    try{

        $kode_lokasi = $_GET['kode_lokasi'];
        $kode_pp=$_GET['kode_pp'];
        $url = "https://api.simkug.com/api/rtrw/login";
        $url2 = "https://api.simkug.com/api/rtrw/upload-bukti-bayar";

        $fields = array(
            "nik" => $nik,
            "password" => $_SESSION['userPwd']
        );

        $output = curl($url,$fields); 
        $token = $output->token;

        $postfields = array();
        $arr_file = array();
        if(isset($_FILES['file']['tmp_name'])){
            
            if (function_exists('curl_file_create')) { // For PHP 5.5+
                $file = curl_file_create($_FILES['file']['tmp_name'],$_FILES['file']['type'],$_FILES['file']['name']);
            } else {
                $file = '@' . realpath($_FILES['file']['tmp_name'],$_FILES['file']['type'],$_FILES['file']['name']);
            }
            $postfields["file_gambar"] = $file;
        }
        $postfields["no_rumah"] = $nik;
        $postfields["keterangan"] = $_POST['keterangan'];
        $postfields["kode_akun"] = $_POST['kode_akun'];

        $res = curl_upload($url2,$token,$postfields);
        $msg = $res['message'];
        $sts = $res['status'];
        $response['curl2'] = $res['info'];
        $response['curl2_res'] = $res; 
        $response['fields'] = $postfields; 
        $response['output'] = $output;
    } catch (exception $e) { 
        error_log($e->getMessage());		
        $msg = " error " .  $e->getMessage();
        $sts = false;
    } 	
    $response['message'] = $msg;
    $response['status'] = $sts;
    echo json_encode($response);
}


function getDaftarBukti(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_pp=$_POST['kode_pp'];
    $kode_akun=$_POST['kode_akun'];

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.no_bukti,a.kode_rumah,a.tgl_input,a.keterangan,a.nama_file,b.blok,'$kode_akun' as kode_akun 
    from rt_trans_dok a
    inner join rt_rumah b on a.kode_rumah=b.kode_rumah and a.kode_lokasi=b.kode_lokasi
    where a.kode_lokasi='$kode_lokasi' and a.no_app = '-' and b.rt='$kode_pp' and a.kode_akun='$kode_akun'
    order by a.kode_rumah, a.tgl_input 
    "; 
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);
}

function getBuktiBayar(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];

    $result = array("message" => "", "rows" => 0, "status" => "" );

    
    $sql2="
    select a.no_bukti,a.tgl_input,a.param1 as no_rumah,a.nilai1 as total,b.kode_akun,c.nama as akun_kas 
    from trans_m a 
    inner join trans_j b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi and b.dc='D' and b.nu=0
    inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
    where a.no_bukti='".$_POST['no_bukti']."' ";
    $rs2 = execute($sql2);					
    while ($row2 = $rs2->FetchNextObject(false)){
        $result['daftar'][] = (array)$row2;
    }
    
    $sql="select a.periode_bill as periode,a.nilai_rw+a.nilai_rt as nilai from rt_angs_d a where a.no_angs='".$_POST['no_bukti']."' and a.kode_lokasi='$kode_lokasi'
    "; 
    $rs = execute($sql);					
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar2'][] = (array)$row;
    }
    $result['status']=TRUE;
    echo json_encode($result);
}


function unProsesBukti(){

    session_start();
    $kode_lokasi=$_SESSION['lokasi'];
    $nik=$_SESSION['userLog'];
    $kode_rumah = $_POST['kode_rumah'];
    $no_bukti = $_POST['no_bukti'];

    $exec = array();

    $result = array("message" => "", "rows" => 0, "status" => "" );
    $upd = "update rt_trans_dok set no_app='UNPROSES' where kode_rumah='$kode_rumah' and no_bukti='$no_bukti' and kode_lokasi='$kode_lokasi' ";
    array_push($exec,$upd);
    $result['upd'] = $upd;

    $rs = executeArray($exec,$err);
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses tidak diproses";
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal tidak diproses".$err;
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    echo json_encode($result);
}
?>
