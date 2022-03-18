<?php
    include_once( "lib/koneksi.php");	

    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }
    
    function login(){
        $post=$_POST;
        $nik=qstr($post['nik']);
        $pass=qstr($post['pass']);
        $kode_pp=qstr($post['kode_pp']);

        $cek = dbRowArray("select kode_menu from sis_hakakses where nik = $nik and kode_pp=$kode_pp");

        if($cek['kode_menu'] == "SISWAWEB"){
            $sql="select a.nik, a.kode_menu, a.kode_lokasi, a.kode_pp, b.nis, b.nama, a.foto, a.status_login, b.kode_kelas, isnull(e.form,'-') as path_view,x.nama as nama_pp
            from sis_hakakses a 
            left join sis_siswa b on a.nik=b.nis and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            left join m_form e on a.path_view=e.kode_form  
            left join pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi
            where a.nik=$nik and a.pass=$pass and a.kode_lokasi='12' and a.kode_pp=$kode_pp";
        }else{
            $sql="select a.nik, a.kode_menu, a.kode_lokasi, a.kode_pp, b.no_reg as nis, b.nama, a.foto, a.status_login, 'REG' as kode_kelas, isnull(e.form,'-') as path_view,x.nama as nama_pp
            from sis_hakakses a 
            left join sis_siswareg b on a.nik=b.no_reg and a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
            left join pp x on a.kode_pp=x.kode_pp and a.kode_lokasi=x.kode_lokasi
            left join m_form e on a.path_view=e.kode_form     
            where a.nik=$nik and a.pass=$pass and a.kode_lokasi='12' and a.kode_pp=$kode_pp";
        }

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
			$_SESSION['kodeMenu'] = $row->kode_menu;				
			$_SESSION['userStatus'] = $row->status_login;
			$_SESSION['namaUser'] = $row->nama;
            $_SESSION['kodePP'] = $row->kode_pp;
            $_SESSION['namaPP'] = $row->nama_pp;
			$_SESSION['foto'] = $row->foto;
			$_SESSION['dash'] = $row->path_view;
			$_SESSION['loginTime'] = date('d-m-Y');
			$_SESSION['nikUser'] = $row->nik."_".date('d-m-Y');				
			$_SESSION['periode'] = $row1->periode;						
            $_SESSION['userPwd'] = $post['pass'];
            $_SESSION['kode_kelas'] = $row->kode_kelas;
            $_SESSION['sql'] = $sql;
            $_SESSION['exit_url']="cLoginSis.php?fx=logout";

            if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

            // echo "Browser:".$version[1];

            if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
                $fmain="fMainSis.php";
            }else{
                $fmain="fMain.php";
            }
            
            $_SESSION['form_login']="fLoginSis.php";
            $_SESSION['fMain']=$fmain;
            $_SESSION['hakakses']="sis_hakakses";
           
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
			$sql2="insert into lab_log( nik, kode_lokasi, kode_pp,tanggal, ip, agen, kota,loc,region,negara) values($nik,'$lokasi','$pp',getdate(),'$ip','$agen','$kota','$loc','$region','$negara')";
            $rs2 = execute($sql2);
                
           
            header("Location: ".$fmain."?hal=".$dash, true, 301);
            exit();
        }else{
            echo "<script>alert('Username, password salah !'); window.location='http://".$_SERVER["SERVER_NAME"]."/web/fLoginSis.php';</script>";
        }     

    }

    function logout(){
        
        session_start();
        $_SESSION = [];
        unset($_SESSION);
        session_unset();
        session_destroy();
        
        header("Location: fLoginSis.php", true, 301);
        exit();   
    }

    function getDaftarPP(){	
		$nik = $_POST['nis'];
		$sql = "SELECT a.kode_pp,a.nama from sis_sekolah a left join sis_hakakses b on a.kode_pp = b.kode_pp where a.kode_lokasi = '12' and b.nik='$nik' order by a.kode_pp";
        $rs = execute($sql);
        
        // while ($row = $rs->FetchNextObject(false)){
        //     $result['pp'][] = (array)$row;
        // }

        if($rs->RecordCount() > 0){
            while ($row = $rs->FetchNextObject(false)){
                $result['pp'][] = (array)$row;
            }
        }else{
            $result['pp'] = array();
        }
        
        // echo $sql;
        echo json_encode($result);
	}

?>
