<?php

if(function_exists($_GET['fx'])) {
    $_GET['fx']();
}

function view(){

    // include_once("../../../web/include_lib.php");
    // include_once("koneksi.php");
           
    $sql="select a.kode_ref, a.nama 
     from trans_ref a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='B10-11' 
     where a.jenis='PENERIMAAN' and a.kode_lokasi='18' ";
    
    $rs=execute($sql);
    $html="";
    while($row=$rs->FetchNextObject($toupper = false)){
        $html.= $row->kode_ref;
    }
  
    echo $html;
    // echo "hello";
    
}

function getsel(){

   
    $kode_lokasi=$_POST['kode_lokasi'];


    $result = array("message" => "", "rows" => 0, "status" => "" );

    if($_POST['jenis'] == 'Keluar'){
        $jenis="PENGELUARAN";
    }else{
        $jenis="PENERIMAAN";
    }
    $sql="select a.kode_ref, a.nama 
    from trans_ref a inner join karyawan_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and b.nik='".$_POST['nik']."' 
    where a.jenis='$jenis' and a.kode_lokasi='$kode_lokasi'";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);


}

function getAkun(){

   
    $kode_lokasi=$_POST['kode_lokasi'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.kode_akun,a.nama from masakun a inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='$kode_lokasi' ";
    
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);


}


function getAkun2(){

   
    $kode_lokasi=$_POST['kode_lokasi'];
    $kode_pp=$_POST['kode_pp'];
    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.kode_akun,a.nama 
    from masakun a 
    inner join relakun_pp c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.kode_pp='$kode_pp'
    inner join flag_relasi b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.kode_flag in ('001','009') where a.kode_lokasi='$kode_lokasi' ";
    
    $rs = execute($sql);					
    $result['daftar'] = array();
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);


}

function joinNum2($num){
    // menggabungkan angka yang di-separate(10.000,75) menjadi 10000.00
    $num = str_replace(".", "", $num);
    $num = str_replace(",", ".", $num);
    return $num;
}

function simpan(){
    
    if($_POST['kode_jenis'] == 'Keluar'){
        $jenis="BK";
    }else{
        $jenis="BM";
    }
    
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$_POST['kode_lokasi']."-".$jenis.$per.".";
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");
    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.nama,a.akun_debet,a.akun_kredit,a.kode_pp, b.kode_gar as gar_debet,c.kode_gar as gar_kredit 
    from trans_ref a 
    inner join masakun b on a.akun_debet=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
    inner join masakun c on a.akun_kredit=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
    where a.kode_ref='".$_POST['kode_ref']."' and a.kode_lokasi='".$_POST['kode_lokasi']."'";

    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    $akunDebet=$row->akun_debet;
    $akunKredit=$row->akun_kredit;

    if($_POST['kode_jenis'] == 'Keluar'){
        $akunKredit = $_POST['kode_akun'];
    }else{
        $akunDebet = $_POST['kode_akun'];
    }

    // BeginTrans();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','KB','KBDUAL','T','-','-','".$_POST['kode_pp']."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum2($_POST['nilai']).",0,0,'".$_POST['nik']."','-','-','-','-','-','".$_POST['kode_ref']."','TUNAI','".$jenis."')";

    $sql2 = "insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunDebet."','D',".joinNum2($_POST['nilai']).",".joinNum2($_POST['nilai']).",'".$_POST['keterangan']."','KB','".$jenis."','IDR',1,'".$_POST['kode_pp']."','".$_POST['kode_ref']."','-','-','-','-','-','-','-')";	

    $sql3="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunKredit."','C',".joinNum2($_POST['nilai']).",".joinNum2($_POST['nilai']).",'".$_POST['keterangan']."','KB','".$jenis."','IDR',1,'".$_POST['kode_pp']."','".$_POST['kode_ref']."','-','-','-','-','-','-','-')";		

    $sql4 = "insert into gldt (no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' from trans_j 
    where kode_lokasi='".$_POST['kode_lokasi']."' and no_bukti='".$id." '";

    $rs1=execute($sql1);
    $rs2=execute($sql2);
    $rs3=execute($sql3);
    $rs4=execute($sql4);

    $tmp=array();
    $kode = array();

    if ($rs1 AND $rs2 AND $rs3 AND $rs4)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan. No Bukti :".$id;
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql1"]=$sql1;

    echo json_encode($result);
}

function simpanIuran(){
   
    $jenis="BM";
                
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$_POST['kode_lokasi']."-".$jenis.$per.".";
    
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt 
    from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi 
    where b.kode_rumah='".$_POST['no_rumah']."' and a.kode_lokasi='".$_POST['kode_lokasi']."'";

    $rs=execute($sql);
    $row = $rs->FetchNextObject(false);
    $akunKas=$row->akun_kas;
    $akunPdpt=$row->akun_pdpt;
    $akunKasRW=$row->akun_kastitip;
    $akunTitip=$row->akun_titip;

    $_POST['keterangan']="Penerimaan Iuran Wajib atas rumah ".$_POST['no_rumah']." periode ".$periode;

    // // BeginTrans();

    $sql1 ="insert into trans_m (no_bukti,kode_lokasi,tgl_input,nik_user,periode,modul,form,posted,prog_seb,progress,kode_pp,tanggal,no_dokumen,keterangan,kode_curr,kurs,nilai1,nilai2,nilai3,nik1,nik2,nik3,no_ref1,no_ref2,no_ref3,param1,param2,param3) values 
                    ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','RTRW','KBIUR','T','0','0','".$_POST['kode_pp']."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum2($_POST['bayar']).",0,0,'-','-','-','".$_POST['stsByr']."','-','-','".$_POST['no_rumah']."','IWAJIB','-')";

    $nilai_iur=joinNum2($_POST['nilRW'])+joinNum2($_POST['nilRT']);
                                    
    $sql2="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                    ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunKasRW."','D',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','KBRW','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";				

    // $sql3="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
    //                     ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunKas."','D',".joinNum2($_POST['nilRT']).",".joinNum2($_POST['nilRT']).",'".$_POST['keterangan']."','RTRW','KBRT','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";			

    $sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                        ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),1,'".$akunTitip."','C',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";
    // $sql5="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
    //                     ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),2,'".$akunTitip."','C',".joinNum2($_POST['nilRW']).",".joinNum2($_POST['nilRW']).",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";

    $rs1=execute($sql1);
    $rs2=execute($sql2);
    // $rs3=execute($sql3);
    $rs4=execute($sql4);
    // $rs5=execute($sql5);

    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['periode']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a]= "insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values 
                        ('".$id."','".$_POST['no_rumah']."','IWAJIB','".$_POST['periode'][$a]."','".$periode."',".$_POST['nilai_rt'][$a].",".$_POST['nilai_rw'][$a].",'".$_POST['kode_lokasi']."','".$_POST['kode_pp']."','D','KBIUR','KAS','-')";
            $rs6=execute($sql6[$a]);		
            
            if($rs6){
                $detail=TRUE;
            }
        }
    }
    
    
    $sql7 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
    select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
    from trans_j 
    where kode_lokasi='".$_POST['kode_lokasi']."' and no_bukti='".$id."' ";

    $rs7=execute($sql7);	
    
    $tmp=array();
    $kode = array();

    if ($rs1 AND $rs2 AND $rs4 AND $detail AND $rs7)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan";
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["prefix"]=$prefix;
    $result["id"]=$id;
    $result["sql"]=$sql;
    $result["sql1"]=$sql1;
    $result["sql2"]=$sql2;
    $result["sql4"]=$sql4;
    $result["sql6"]=$sql6;

    echo json_encode($result);
}


function simpanIuranRw(){
   
    $jenis="BM";
                
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$_POST['kode_lokasi']."-".$jenis.$per.".";
    
    $query = execute("select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from trans_m where no_bukti like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $sql="select a.kode_pp,a.akun_kas,a.akun_kastitip, a.akun_titip,a.akun_pdpt 
    from pp a inner join rt_rumah b on a.kode_pp=b.rt and a.kode_lokasi=b.kode_lokasi 
    where b.kode_rumah='".$_POST['no_rumah']."' and a.kode_lokasi='".$_POST['kode_lokasi']."'";

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
                    ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','RTRW','KBIUR','T','0','0','".$_POST['kode_pp']."',getdate(),'-','".$_POST['keterangan']."','IDR',1,".joinNum2($_POST['bayar']).",0,0,'-','-','-','".$_POST['stsByr']."','-','-','".$_POST['no_rumah']."','IWAJIB','-')";
    array_push($exec,$sql1);

    $nilai_iur=joinNum2($_POST['nilRW'])+joinNum2($_POST['nilRT']);
                                    
    $sql2="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                    ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),0,'".$akunKas."','D',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','KBRW','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";
    array_push($exec,$sql2);				

    $sql4="insert into trans_j (no_bukti,kode_lokasi,tgl_input,nik_user,periode,no_dokumen,tanggal,nu,kode_akun,dc,nilai,nilai_curr,keterangan,modul,jenis,kode_curr,kurs,kode_pp,kode_drk,kode_cust,kode_vendor,no_fa,no_selesai,no_ref1,no_ref2,no_ref3) values 
                        ('".$id."','".$_POST['kode_lokasi']."',getdate(),'".$_POST['nik']."','".$periode."','-',getdate(),1,'".$akunTitip."','C',".$nilai_iur.",".$nilai_iur.",'".$_POST['keterangan']."','RTRW','TITIP','IDR',1,'".$_POST['kode_pp']."','-','-','-','-','-','-','-','-')";
    array_push($exec,$sql4);	

    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['periode']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a]= "insert into rt_angs_d (no_angs,kode_rumah,kode_jenis,periode_bill,periode_angs,nilai_rt,nilai_rw,kode_lokasi,kode_pp,dc,modul,jenis,no_setor) values 
                        ('".$id."','".$_POST['no_rumah']."','IWAJIB','".$_POST['periode'][$a]."','".$periode."',".$_POST['nilai_rt'][$a].",".$_POST['nilai_rw'][$a].",'".$_POST['kode_lokasi']."','".$_POST['kode_pp']."','D','KBIUR','KAS','-')";
            array_push($exec,$sql6[$a]);	
        }
    }
    
    
    $sql7 = "insert into gldt(no_bukti,no_urut,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,kurs,nilai_curr,tgl_input,nik_user,kode_cust,kode_proyek,kode_task,kode_vendor,kode_lokarea,nik) 
    select no_bukti,nu,kode_lokasi,modul,jenis,no_dokumen,tanggal,kode_akun,dc,nilai,keterangan,kode_pp,periode,kode_drk,kode_curr,1,nilai,tgl_input,nik_user,'-','-','-','-','-','-' 
    from trans_j 
    where kode_lokasi='".$_POST['kode_lokasi']."' and no_bukti='".$id."' ";
	
    array_push($exec,$sql7);	

    $tmp=array();
    $kode = array();
    $res = executeArray($exec,$err);
    if ($err == null)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan";
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["prefix"]=$prefix;
    $result["id"]=$id;
    $result["sql"]=$exec;

    echo json_encode($result);
}

function simpanSetoran(){
                
    $str_format="0000";
    $periode=date('Y').date('m');
    $per=date('y').date('m');
    $prefix=$_POST['kode_lokasi']."-STR".$per.".";
    
    $query = execute("select right(isnull(max(no_setor),'0000'),".strlen($str_format).")+1 as id from rt_setor_m where no_setor like '$prefix%' ");

    $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);

    $exec = array();
    $keterangan = "Setoran bulan ".toBulan(date('m'));
    $_POST['jml_iuran'] = count($_POST['kode_rumah']);
    $_POST['sumbangan'] = 100000;
    $_POST['gaji']=1200000;
    $_POST['kasRT']= joinNum2($_POST['nilRT']) - $_POST['sumbangan'];
    $_POST['kasRW']= joinNum2($_POST['bayar']) - joinNum2($_POST['nilRT']) - $_POST['gaji'];
    $_POST['setor']= $_POST['kasRW']+$_POST['sumbangan'];


    $sql1 = "insert into rt_setor_m (no_setor,kode_lokasi,tanggal,keterangan,kode_pp,modul,periode,nilai,tgl_input,nik_user,no_kas, jml_iuran,sumbangan,gaji_bersih,kas_rt,kas_rw ) values  
            ('".$id."','".$_POST['kode_lokasi']."','".reverseDate($_POST['tanggal'],"-","-")."','".$keterangan."','".$_POST['kode_pp']."','IWAJIB','".$periode."',".joinNum2($_POST['nilRW']).",getdate(),'".$_POST['nik']."','-', ".$_POST['jml_iuran'].",".$_POST['sumbangan'].",".$_POST['gaji'].",".joinNum2($_POST['kasRT']).",".joinNum2($_POST['kasRW'])." )";

    array_push($exec,$sql1);																							
    $detail=FALSE;
                                    
    for($a=0; $a<count($_POST['kode_rumah']);$a++){
        if ($_POST['toggle'][$a] == "on"){
            $sql6[$a] = "update rt_angs_d set no_setor='".$id."' where no_setor='-' and kode_rumah='".$_POST['kode_rumah'][$a]."' and kode_lokasi='".$_POST['kode_lokasi']."' and kode_jenis='IWAJIB'";
            // $rs6=execute($sql6[$a]);
            array_push($exec,$sql6[$a]);		
            
        }
    } 
    $tmp=array();
    $kode = array();
    $res = executeArray($exec);
    // $res = true;
    if ($res)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan";
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan";
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

function getBlok(){
  
    $kode_lokasi=$_POST['kode_lokasi'];
    $rt=$_POST['rt'];

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.blok
    from rt_blok a where a.kode_pp='$rt' and a.kode_lokasi='$kode_lokasi'";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);

}

function getRumah(){

   
    $kode_lokasi=$_POST['kode_lokasi'];
    $blok=$_POST['blok'];

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select a.kode_rumah
    from rt_rumah a where a.blok='$blok' and a.kode_lokasi='$kode_lokasi'";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status']=TRUE;
    $result['sql']=$sql;
    echo json_encode($result);


}

function getEditWarga(){

    $id=$_POST['kode'];
    $kode_lokasi=$_POST['lokasi'];    

    $result = array("message" => "", "rows" => 0, "status" => "" );

    $sql="select distinct no_bukti,tgl_masuk,sts_masuk,kode_blok as blok,no_rumah,kode_pp as rt from rt_warga_d where kode_lokasi='$kode_lokasi' and no_bukti='$id' ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }

    $sql2="select * from rt_warga_d where kode_lokasi='$kode_lokasi' and no_bukti='$id' ";
    $rs2 = execute($sql2);					
    
    while ($row2 = $rs2->FetchNextObject(false)){
        $result['daftar2'][] = (array)$row2;
    }

    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);

}

function simpanWarga(){

    if($_POST['no_bukti'] == ""){
        $str_format="0000";
        $periode=date('Y').date('m');
        $per=date('y').date('m');
        // $prefix=$_POST['kode_rt']."-WR".$per.".";
        $prefix="WR".$per;
        $sql2="select right(isnull(max(no_bukti),'0000'),".strlen($str_format).")+1 as id from rt_warga_d where no_bukti like '$prefix%' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $query = execute($sql2);

        $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);
    }else{
        $id = $_POST['no_bukti'];
        $sqldel= "delete from rt_warga_d where kode_lokasi='".$_POST['kode_lokasi']."' and no_bukti='".$id."' ";
        $rsdel=execute($sqldel);
    }

    $i=1;
    for($a=0; $a<count($_POST['nik']);$a++){
     
    $sql[$a]= "insert into rt_warga_d (kode_blok,no_rumah,no_urut,nama,alias,nik,kode_jk,tempat_lahir,tgl_lahir,kode_agama,kode_goldar,kode_didik,kode_kerja,kode_sts_nikah,kode_kb,kode_sts_hub,kode_sts_wni,no_hp,no_telp_emergency,ket_emergency,tgl_masuk,no_bukti,sts_masuk,kode_lokasi,kode_pp) values ".
                            "('".$_POST['kode_blok']."','".$_POST['no_rumah']."','".$i."','".$_POST['nama'][$a]."','".$_POST['alias'][$a]."','".$_POST['nik'][$a]."','".$_POST['kode_jk'][$a]."','".$_POST['tempat_lahir'][$a]."','".$_POST['tgl_lahir'][$a]."','".$_POST['kode_agama'][$a]."','".$_POST['kode_goldar'][$a]."','".$_POST['kode_didik'][$a]."','".$_POST['kode_kerja'][$a]."','".$_POST['kode_sts_nikah'][$a]."','".$_POST['kb'][$a]."','".$_POST['kode_sts_hub'][$a]."','".$_POST['kode_sts_wni'][$a]."','".$_POST['no_hp'][$a]."','".$_POST['no_emergency'][$a]."','".$_POST['ket_emergency'][$a]."','".$_POST['tgl_masuk']."','".$id."','".$_POST['sts_masuk']."','".$_POST['kode_lokasi']."','".$_POST['kode_pp']."')";
        $rs=execute($sql[$a]);		
        if($rs){
            $detail=TRUE;
        }
        $i++;
    
    }

     
    $tmp=array();
    $kode = array();

    if ($detail)
    {	
        // CommitTrans();
        $tmp="Sukses disimpan";
        $sts=true;
    }else{
        // RollbackTrans();
        $tmp="Gagal disimpan";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"]=$sql;
    $result["sql2"]=$sql2;

    echo json_encode($result);
}

function hapusWarga(){
        
    $sql="delete from rt_warga_d where no_bukti='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."'";

    $rs=execute($sql);

    $tmp=array();
    $kode = array();
    if ($rs)
    {	
        $tmp="sukses";
        $sts=true;
    }else{
        $tmp="gagal";
        $sts=false;
    }		
    $result["message"] =$tmp;
    $result["status"] = $sts;
    $result["sql"] = $sql;
    echo json_encode($result);
}


function getEditInfo(){
    
    $id=$_POST['kode'];
    $kode_lokasi=$_POST['lokasi'];    
    
    $result = array("message" => "", "rows" => 0, "status" => "" );
    
    $sql="select * from rt_buku_p where kode_lokasi='$kode_lokasi' and no_bukti='$id' ";
    
    $rs = execute($sql);					
    
    while ($row = $rs->FetchNextObject(false)){
        $result['daftar'][] = (array)$row;
    }
    $result['status'] = TRUE;
    $result['sql'] = $sql;
    echo json_encode($result);
    
}

    function simpanInfo(){

        $data=$_POST;

        $kode_lokasi=$data['kode_lokasi'];
        $kode_pp=$data['kode_pp'];
        $nik=$data['nik'];

        $str_format="0000";
        $prefix=$kode_lokasi."-BPRT.";
        $sql2="select right(isnull(max(no_bukti),'000'),".strlen($str_format).")+1 as id from rt_buku_p where no_bukti like '$prefix%' and kode_lokasi='".$data['kode_lokasi']."'";
        $query = execute($sql2);

        $id = $prefix.str_pad($query->fields[0], strlen($str_format), $str_format, STR_PAD_LEFT);


        if(!EMPTY($_FILES["foto"]["name"])){

            $path_s = $_SERVER['DOCUMENT_ROOT'];
            $target_dir = $path_s."web/upload/";
            $target_file = $target_dir . basename($_FILES["foto"]["name"]);
            $uploadOk = 1;
            $message="";
            $error_upload="";
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["foto"]["tmp_name"]);
                if($check !== false) {
                    $message= "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    $error_upload= "File is not an image.";
                    $uploadOk = 0;
                }
            }
            // Check if file already exists
            if (file_exists($target_file)) {
                $error_upload= "Sorry, file already exists.";
                $uploadOk = 0;
            }
            // Check file size
            if ($_FILES["foto"]["size"] > 2000000) {
                $error_upload= "Sorry, your file is too large.";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                $error_upload= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }
            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                $error_upload .= "Sorry, your file was not uploaded.";
            // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file)) {
                    $message = "The file ". basename( $_FILES["foto"]["name"]). " has been uploaded.";
                } else {
                    $error_upload= "Sorry, there was an error uploading your file.";
                    // echo $target_file;
                    // echo $_FILES["foto"]["error"];
                    if (is_dir($target_dir) && is_writable($target_dir)) {
                        // do upload logic here
                    } else if (!is_dir($target_dir)){
                        $error_upload.= 'Upload directory does not exist.'.$target_dir;
                    } else if (!is_writable($target_dir)){
                        $error_upload.= 'Upload directory is not writable'.$target_dir;
                    }

                }
            }

            $filepath="/upload/".basename($_FILES["foto"]["name"]);
            $filetype=$imageFileType;
        }else{
            $filepath="-";
            $filetype="-";
        }

        if(!EMPTY($_FILES["file_dok"]["name"])){

            $path_s = $_SERVER['DOCUMENT_ROOT'];
            $target_dir = $path_s."web/upload/";
            $target_file = $target_dir . basename($_FILES["file_dok"]["name"]);
            $uploadOk = 1;
            $message="";
            $error_upload="";
            $FileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            // if(isset($_POST["submit"])) {
            //     $check = getimagesize($_FILES["file_dok"]["tmp_name"]);
            //     if($check !== false) {
            //         $message= "File is an dok - " . $check["mime"] . ".";
            //         $uploadOk = 1;
            //     } else {
            //         $error_upload= "File is not an dok";
            //         $uploadOk = 0;
            //     }
            // }
            // Check if file already exists
            if (file_exists($target_file)) {
                $error_upload= "Sorry, file already exists.";
                $uploadOk = 0;
            }
            // Check file size
            if ($_FILES["file_dok"]["size"] > 2000000) {
                $error_upload= "Sorry, your file is too large.";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($FileType != "pdf" && $FileType != "txt" && $FileType != "doc"
            && $FileType != "docx" && $FileType != "xls" && $FileType != "xlsx" ) {
                $error_upload= "Sorry, only PDF, TXT, DOC/DOCX & XLS/XLSX files are allowed.";
                $uploadOk = 0;
            }
            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                $error_upload .= "Sorry, your file was not uploaded.";
            // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["file_dok"]["tmp_name"], $target_file)) {
                    $message = "The file ". basename( $_FILES["file_dok"]["name"]). " has been uploaded.";
                } else {
                    $error_upload= "Sorry, there was an error uploading your file.";
                    // echo $target_file;
                    // echo $_FILES["foto"]["error"];
                    if (is_dir($target_dir) && is_writable($target_dir)) {
                        // do upload logic here
                    } else if (!is_dir($target_dir)){
                        $error_upload.= 'Upload directory does not exist.'.$target_dir;
                    } else if (!is_writable($target_dir)){
                        $error_upload.= 'Upload directory is not writable'.$target_dir;
                    }

                }
            }

            $filedok="/upload/".basename($_FILES["file_dok"]["name"]);
           
        }else{
            $filedok="-";
        }

        $sql= "insert into rt_buku_p (no_bukti,kode_lokasi,jenis,rw,rt,no_rumah,keterangan,tanggal,file_gambar,file_dok,nik_user,tgl_input,kode_pp) values ('$id','$kode_lokasi','".$data['jenis']."','".$data['rw']."','".$data['rt']."','".$data['no_rumah']."','".$data['keterangan']."','".$data['tanggal']."','$filepath','$filedok','$nik',getdate(),'$kode_pp')";
        
        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        $sts=false;
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            unlink($target_file);
            $sts=false;
        }	

        $result["message"] =$tmp."-".$message;
        $result["error"] =$error_upload;
        $result["status"] = $sts;
        $result["sql"] = $sql;
        $result["id"] = $id;
        echo json_encode($result);
    }
    

    function ubahInfo(){

        if(!empty($_FILES["foto"]["name"])){
            $path_s = $_SERVER['DOCUMENT_ROOT'];
            $target_dir = $path_s."web/upload/";
            $target_file = $target_dir . basename($_FILES["foto"]["name"]);
            $uploadOk = 1;
            $message="";
            $error_upload="";
            $imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            // Check if image file is a actual image or fake image
            if(isset($_POST["submit"])) {
                $check = getimagesize($_FILES["foto"]["tmp_name"]);
                if($check !== false) {
                    $message= "File is an image - " . $check["mime"] . ".";
                    $uploadOk = 1;
                } else {
                    $error_upload= "File is not an image.";
                    $uploadOk = 0;
                }
            }
            // Check if file already exists
            if (file_exists($target_file)) {
                $error_upload= "Sorry, file already exists.";
                $uploadOk = 0;
            }
            // Check file size
            if ($_FILES["foto"]["size"] > 2000000) {
                $error_upload= "Sorry, your file is too large.";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($imageFileType != "jpg" && $imageFileType != "png" && $imageFileType != "jpeg"
            && $imageFileType != "gif" ) {
                $error_upload= "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";
                $uploadOk = 0;
            }
            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                $error_upload= "Sorry, your file was not uploaded.";
            // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["foto"]["tmp_name"], $target_file)) {
                    $message = "The file ". basename( $_FILES["foto"]["name"]). " has been uploaded.";
                } else {
                    $error_upload= "Sorry, there was an error uploading your file.";
                    // echo $target_file;
                    // echo $_FILES["foto"]["error"];
                    if (is_dir($target_dir) && is_writable($target_dir)) {
                        // do upload logic here
                    } else if (!is_dir($target_dir)){
                        $error_upload.= 'Upload directory does not exist.'.$target_dir;
                    } else if (!is_writable($target_dir)){
                        $error_upload.= 'Upload directory is not writable'.$target_dir;
                    }

                }
            }

            $filepath="/upload/".basename($_FILES["foto"]["name"]);

        }else{
    
            $filepath="";
        }

        if(!empty($_FILES["file_dok"]["name"])){
            $path_s = $_SERVER['DOCUMENT_ROOT'];
            $target_dir = $path_s."web/upload/";
            $target_file = $target_dir . basename($_FILES["file_dok"]["name"]);
            $uploadOk = 1;
            $message="";
            $error_upload="";
            $FileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
            
            // Check if file already exists
            if (file_exists($target_file)) {
                $error_upload= "Sorry, file already exists.";
                $uploadOk = 0;
            }
            // Check file size
            if ($_FILES["file_dok"]["size"] > 2000000) {
                $error_upload= "Sorry, your file is too large.";
                $uploadOk = 0;
            }
            // Allow certain file formats
            if($FileType != "pdf" && $FileType != "txt" && $FileType != "doc"
            && $FileType != "docx" && $FileType != "xls" && $FileType != "xlsx" ) {
                $error_upload= "Sorry, only PDF, TXT, DOC/DOCX & XLS/XLSX files are allowed.";
                $uploadOk = 0;
            }
            // Check if $uploadOk is set to 0 by an error
            if ($uploadOk == 0) {
                $error_upload= "Sorry, your file was not uploaded.";
            // if everything is ok, try to upload file
            } else {
                if (move_uploaded_file($_FILES["file_dok"]["tmp_name"], $target_file)) {
                    $message = "The file ". basename( $_FILES["file_dok"]["name"]). " has been uploaded.";
                } else {
                    $error_upload= "Sorry, there was an error uploading your file.";
                    // echo $target_file;
                    // echo $_FILES["foto"]["error"];
                    if (is_dir($target_dir) && is_writable($target_dir)) {
                        // do upload logic here
                    } else if (!is_dir($target_dir)){
                        $error_upload.= 'Upload directory does not exist.'.$target_dir;
                    } else if (!is_writable($target_dir)){
                        $error_upload.= 'Upload directory is not writable'.$target_dir;
                    }

                }
            }

            $filedok="/upload/".basename($_FILES["file_dok"]["name"]);

        }else{
    
            $filedok="";
        }

        if ($_POST['jenis'] == "RW"){
            $kolom_edit = ",rw='".$_POST['rw']."' ";
        }else if($_POST['jenis'] == "RT"){
            $kolom_edit = ",rt='".$_POST['rt']."' ";
        }else if($_POST['jenis'] == "No Rumah"){
            $kolom_edit = ",no_rumah='".$_POST['no_rumah']."' ";
        }else{
            $kolom_edit = "";
        }

        if($filepath == ""){
            $kolom_edit.="";
        }else{
            $kolom_edit.=",file_gambar='".$filepath."' ";
        }

        if($filedok == ""){
            $kolom_edit.="";
        }else{
            $kolom_edit.=",file_dok='".$filedok."' ";
        }

        $sql="update rt_buku_p set keterangan='".$_POST['keterangan']."',jenis ='".$_POST['jenis']."',tanggal='".$_POST['tanggal']."' $kolom_edit where no_bukti = '".$_POST['no_bukti']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        
        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }		
        $result["message"] =$tmp;
        $result["status"] = $sts;
        echo json_encode($result);
    }
    

    function hapusInfo(){
        
        $pathini = $_SERVER['DOCUMENT_ROOT'];
        $sql2="select file_gambar,file_dok from rt_buku_p where no_bukti='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."' ";
        $rs2=execute($sql2);

        $fullpath=$pathini.$rs2->fields[0];
        $fullpath2=$pathini.$rs2->fields[1];

        $sql="delete from rt_buku_p where no_bukti='".$_POST['id']."' and kode_lokasi='".$_POST['kode_lokasi']."'";

        $rs=execute($sql);

        $tmp=array();
        $kode = array();
        if ($rs)
        {	
            $tmp="sukses";
            unlink($fullpath);
            if (!unlink($fullpath))
            {
                $error_del.= "Error deleting $fullpath";
            }
            else
            {
                $error_del.= "Deleting $fullpath";
            }
            unlink($fullpath2);
            if (!unlink($fullpath2))
            {
                $error_del.= "Error deleting $fullpath2";
            }
            else
            {
                $error_del.= "Deleting $fullpath2";
            }
            $sts=true;
        }else{
            $tmp="gagal";
            $sts=false;
        }		
        $result["message"] =$tmp;
        $result["status"] = $sts;
        $result["sql"] = $sql2;
        $result["path"] = $fullpath;
        $result["error_del"] = $error_del;
        echo json_encode($result);
    }


?>
