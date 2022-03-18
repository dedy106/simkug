<?php
    if(function_exists($_GET['fx'])) {
        $_GET['fx']();
    }
    
    function login(){
        
        $root=realpath($_SERVER["DOCUMENT_ROOT"])."/";
        include_once($root."web/lib/koneksi.php");
        include_once($root."web/lib/helpers.php");

        $root_app=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/web/app";
        $root_ser=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME']."/web/server";
		
		
		
        $post=$_GET;
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
        
        

       
        if($rs->RecordCount() > 0){
            try{
                session_start();
				$row = $rs->FetchNextObject(false);
                $new_key = random_string('alnum', 20);
                $date = date('Y-m-d H:i:s');
                $date = new DateTime($date);
                $date->add(new DateInterval('PT1H'));
                $WorkingArray = json_decode(json_encode($date),true);
                $expired = explode(".",$WorkingArray["date"]);
                
                $db_key["nik"] = $nik;
                $db_key["api_key"] = $new_key;
                // $db_key["expired"] = $date;
                $db_key["expired"] = $expired[0];
                $db_key["modul"] = "yakesmob";
                $exec_sql = array();

                $sqlcek = "select api_key from api_key_auth where nik ='".$db_key["nik"]."' and modul='".$db_key["modul"]."' ";
                $rscek = execute($sqlcek);
                if($rscek->RecordCount() == 0){
                    $query = "insert into api_key_auth (nik,api_key,expired,modul) values ('".$db_key["nik"]."','".$db_key["api_key"]."','".$db_key["expired"]."','".$db_key["modul"]."') ";
                    array_push($exec_sql,$query);
                }else{
                    $new_key = $rscek->fields[0];
                }

                $sqllog = "insert into api_key_log (nik,api_key,kode_lokasi,tgl_login,modul,flag_aktif) values ('".$db_key["nik"]."','".$db_key["api_key"]."','$row->kode_lokasi',getdate(),'".$db_key["modul"]."','1') ";
                array_push($exec_sql,$sqllog);

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
                array_push($exec_sql,$sql2);

                $rs2 = executeArray($exec_sql);
                if($rs2){

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
                    $_SESSION['exit_url']=$root_ser."/yakes/cLoginMobile.php?fx=logout";
                    $_SESSION['api_key']=$new_key;

                    if (preg_match('/(chrome|firefox|avantgo|blackberry|android|blazer|elaine|hiptop|iphone|ipod|kindle|midp|mmp|mobile|o2|opera mini|palm|palm os|pda|plucker|pocket|psp|smartphone|symbian|treo|up.browser|up.link|vodafone|wap|windows ce; iemobile|windows ce; ppc;|windows ce; smartphone;|xiino)/i', $_SERVER['HTTP_USER_AGENT'], $version)) 

                    // echo "Browser:".$version[1];

                    if ($version[1] == "iPhone" || $version[1] == "Android" || $version[1] == "Blackberry" || $version[1] == "Blazer" ||$version[1] == "Elaine" || $version[1] == "Hiptop" || $version[1] == "iPod" || $version[1] == "Kindle" ||$version[1] == "Midp" || $version[1] == "Mobile" || $version[1] == "O2" || $version[1] == "Opera Mini" ||$version[1] == "Mobile" || $version[1] == "Smartphone"){
                        $fmain="fMainMobile.php";
                    }else{
                        $fmain="fMain.php";
                    }
                    
                    $_SESSION['form_login']="fLoginMobile.php";
                    $_SESSION['fMain']=$fmain;
                    $_SESSION['hakakses']="hakakses";

                    $sql3="select kode_fs from fs where kode_lokasi='$row->kode_lokasi' ";
                    $rs3=execute($sql3,$error);
                    $row3 = $rs3->FetchNextObject(false);
                    $_SESSION['kode_fs']=$row3->kode_fs;
                
                    if($row->path_view != null || $row->path_view != "-" ){
                        $dash=str_replace("_","/", $row->path_view);
                        $dash= explode("/",$dash);
                        $dash=$dash[2];
                    }else{
                        $dash="";
                    }
                   
                    
                    header("Location: $root_app/yakes/mainmobile/".$dash, true, 301);
                    
                    exit();
                }else{
                    echo "<script>alert('Error Login : ".$rs2."'); window.location='$root_app/yakes/mobile';</script>";   
                    
                    $db_key["api_key"] = random_string('alnum', 20);
                }
            } catch (exception $e) { 
                error_log($e->getMessage());		
                return " error " .  $e->getMessage();
            } 
        }else{
            echo "<script>alert('Username, password salah !'); window.location='$root_app/yakes/mobile';</script>";
        }

             

    }

    function logout(){

       
        $root_app="http://".$_SERVER['SERVER_NAME']."/web/app";
        $header="Location: $root_app/yakes/mobile";
        
        session_start();
        $_SESSION = [];
        unset($_SESSION);
        session_unset();
        session_destroy();

        header($header, true, 301);
        exit();   
    }


?>
