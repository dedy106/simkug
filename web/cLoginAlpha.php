<?php
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }
    
    function login(){
        
        include_once( "lib/koneksi.php");
        $post=$_POST;
        $nik=$post['nik'];
        $pass=$post['pass'];

        $sql="select a.kode_menu_lab as kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok, c.kode_pp,d.nama as nama_pp,
			b.kode_lokkonsol,d.kode_bidang, c.foto,isnull(e.form,'-') as path_view,b.logo
        from hakakses a 
        inner join lokasi b on b.kode_lokasi = a.kode_lokasi 
        left join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi 
        left join pp d on c.kode_pp=d.kode_pp and c.kode_lokasi=d.kode_lokasi 
        left join m_form e on a.menu_mobile=e.kode_form 
        where a.nik= '$nik' and a.pass='$pass' ";
        $rs=execute($sql,$error);
        
        $row = $rs->FetchNextObject(false);

       
        if($rs->RecordCount() > 0){
            session_start();

            $sql1="select max(periode) as periode from periode where kode_lokasi='$row->kode_lokasi' ";
            $rs1=execute($sql1,$error);
            $row1 = $rs1->FetchNextObject(false);
            
            $_SESSION['isLogedIn'] = true;				
			$_SESSION['userLog'] = $row->nik;
			$_SESSION['lokasi'] = $row->kode_lokasi;
			$_SESSION['kodeMenu'] = $row->kode_klp_menu;
			$_SESSION['namalokasi'] = $row->nmlokasi;				
			$_SESSION['userStatus'] = $row->status_admin;
			$_SESSION['namaUser'] = $row->nama;
			$_SESSION['kodePP'] = $row->kode_pp;
			$_SESSION['namaPP'] = $row->nama_pp;
			$_SESSION['kodeLokasiKonsol']=$row->kodelokkonsol;
			$_SESSION['kodeBidang'] = $row->kode_bidang;
			$_SESSION['foto'] = $row->foto;
			$_SESSION['dash'] = $row->path_view;
			$_SESSION['logo'] = $row->logo;	
			$_SESSION['loginTime'] = date('d-m-Y');
			$_SESSION['nikUser']= $row->nik."_".date('d-m-Y');				
			$_SESSION['periode'] = $row1->periode;						
            $_SESSION['userPwd']=$post['pass'];
            $_SESSION['exit_url']="cLoginAlpha.php?fx=logout";
            $_SESSION['form_login']="fLoginAlpha.php";
            $_SESSION['hakakses']="hakakses";

            $sql3="select kode_fs from fs where kode_lokasi='$row->kode_lokasi' ";
            $rs3=execute($sql3,$error);
            $row3 = $rs3->FetchNextObject(false);
            $_SESSION['kode_fs']=$row3->kode_fs;
           
            if($row->path_view != null || $row->path_view != "-" ){
                $dash=str_replace("_","/", $row->path_view);
                $dash=$dash.".php";
            }else{
                $dash="";
            }

            $ip = $_SERVER['REMOTE_ADDR'];
			$agen = getenv('HTTP_USER_AGENT');
			$details = json_decode(file_get_contents("http://ipinfo.io/{$ip}"));
			$kota = $details->city;
			$loc = $details->loc;
			$region = $details->region;
			$negara = $details->country;
				
			$pp='-';
			$lokasi=$row->kode_lokasi;
			$sql2="insert into lab_log( nik, kode_lokasi, kode_pp,tanggal, ip, agen, kota,loc,region,negara) values('$nik','$lokasi','$pp',getdate(),'$ip','$agen','$kota','$loc','$region','$negara')";
            $rs2 = execute($sql2);
                
            header("Location: fMainAlpha.php?hal=".$dash, true, 301);
            
            exit();
        }else{
            echo "<script>alert('Username, password salah !'); window.location='Location: http://".$_SERVER["SERVER_NAME"]."/web/fLoginAlpha.php';</script>";
        }

             

    }

    function logout(){

       
        $header="Location: http://".$_SERVER["SERVER_NAME"]."/web/fLoginAlpha.php";
       
        session_start();
        $_SESSION = [];
        unset($_SESSION);
        session_unset();
        session_destroy();
        
        header($header, true, 301);
        exit();   
    }

?>
