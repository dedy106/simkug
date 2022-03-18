<?php

session_start();
uses("server_DBConnection_dbLib");
uses("server_util_arrayList");
global $ldaphost;


class saiservice
{
	function __construct()
	{
		$this->db = $this->getDb();
		// $rs = $this->db->execute("select value1 from spro where kode_spro = 'TELKOMLOK' ");
		// if ($row = $rs->FetchNextObject(false))
		// 	$this->lokasi = $row->value1;
		// else $this->lokasi = "10";
		
		$user = $_SESSION["user"];

		// $rs = $this->db->execute("select cfu from exs_karyawan where nik = '$user' ");
		// if ($row = $rs->FetchNextObject(false))
		// 	$this->cfu = $row->cfu;
		// else $this->cfu = "CFU0";

		// $this->cleanUp();
		
	}
	
	function hello($param)
	{
		$result = "Hello $param ";
		
		return $result;
	}
	function setId($userid, $session = null){
		//error_log("setId $userid $session");

		//if (!isset($userid))
		// {
		// 	$rs = $this->db->execute("select username from bpc_sessions where sessions = '$session' and last_update > sysdate - INTERVAL '24' hour ");
		// 	if ($row = $rs->FetchNextObject(false))
		// 		$userid = $row->username;
		// 	else return 0;

		// }
		// $this->userid = $userid;
		// /*
		// $rs = $this->db->execute("select cfu from exs_karyawan where nik = '$userid' ");
		// if ($row = $rs->FetchNextObject(false))
		// 	$this->cfu = $row->cfu;
		// else $this->cfu = "CFU0";
		// */

		// $this->db->execute("update bpc_sessions set last_update = sysdate where sessions = '$session' and last_update > sysdate - INTERVAL '24' hour  ");
		
		return 1;
		
	}
	private function getDb()
	{
	
		if ($this->db == null)
		{
			$this->db = new server_DBConnection_dbLib("mssql");
		}
		
		$this->dbLib = $this->db;
		return $this->db;
	}

	
	function createKlpAkses($klp, $data, $userid){
		$db = $this->getDb();
		$sql = new server_util_arrayList();
		$sql->add("delete from bpc_klp_akses_m where kode_klp_akses = '$klp' ");
		foreach ($data as $key => $value) {
			 $sql->add("insert into bpc_klp_akses_m(kode_klp_akses, kode_form, user_id, tgl_input)
			 		values('". $klp."','". $value."', '$userid', now() ) ");
		}
		$ret = $db->execArraySQL($sql);
		return $ret;
	}
	function getListFormForKlp($klp){

	}
	function getCompCodeConsol(){
		$db = $this->getDb();

		$rs = $db->execute("select cocd from bpc_lokasi where flag_konsol = '1' ");
		if ($row = $rs->FetchNextObject(false)){
			return $row->cocd;
		}
		return "-";
	}
	
	function get_client_ip() {
		$ipaddress = '';
		if (isset($_SERVER['HTTP_CLIENT_IP']))
			$ipaddress = $_SERVER['HTTP_CLIENT_IP'];
		else if(isset($_SERVER['HTTP_X_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_X_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_X_FORWARDED'];
		else if(isset($_SERVER['HTTP_FORWARDED_FOR']))
			$ipaddress = $_SERVER['HTTP_FORWARDED_FOR'];
		else if(isset($_SERVER['HTTP_FORWARDED']))
			$ipaddress = $_SERVER['HTTP_FORWARDED'];
		else if(isset($_SERVER['REMOTE_ADDR']))
			$ipaddress = $_SERVER['REMOTE_ADDR'];
		else
			$ipaddress = 'UNKNOWN';
		return $ipaddress;
	}
	function login($user, $pass){
		try{
			global $ldaphost;

			$this->cleanUp();
			$result = array("userdata" => "", "type" => 0, "msg" => "","periode" => "", "serverinfo" => array(),"portalinfo" =>array());
			$db = $this->getDb();
			//$ret = $this->db->connect();
			//if ($ret != "success") throw new Exception($ret);
		
			session_regenerate_id();  	
			
			$auth = $db->LDAP_auth($user, $pass, "merahputih.telkom.co.id");	
			//error_log("LDAP Auht $auth "  );	

			if ($auth == 1){//$auth == 1
				//$detailPortal = json_decode($this->getDetailUserInfoFromPortal($user));
				//if (count($detailPortal->items) > 0)
                {
					/*
                    foreach ($detailPortal->items as $value){
						if ($value->NIK == $user){
							$kd_unit = strtoupper($value->KD_UNIT);
							$nama = $value->NAMA;
						}
						if ($value->NIK_POH == $user){
							$kd_unit = strtoupper($value->KD_UNIT);
						}
						$jabatanid = $value->OBJ_POSISI;
						$jabatan = str_replace("'","''", $value->VS_POSISI);
						$divisi  = $value->VS_DIVISI;
						$kota 	 = $value->KOTA_GEDUNG;
					}
                    */
                    //$jabatan = $detailPortal->jabatan;
                    //$loker = $detailPortal->loker;
                    //$divisi = $detailPortal->divisi;
					//$result["portalinfo"] = $detailPortal;
				}
				/*$rs = $this->db->db->execute("select distinct b.nama as nama, b.telkomnik as nik, a.KODE_KLP_MENU , C.kode_ubis, b.TELKOMOFFICECITY,'10'as kode_lokasi, '$jabatan' as jabatan,'-' as kode_gubis
									from BPC_USERAKSES a 
									inner join sppd_karyawan b on b.short_posisi = a.jabatan
									inner join jabatan c on c.telkomdivision = b.telkomdivision
								where b.telkomnik = '$user'");
					*/
               //error_log(json_encode($detailPortal));
			   /*
               $rs = $this->db->execute("select distinct b.nama as nama, b.telkomnik as nik, a.KODE_KLP_MENU , c.kode_ubis as kode_ubis, '$loker' as telkomofficecity, '10' as kode_lokasi, '$jabatan' as jabatan,'-' as kode_gubis
									from BPC_USERAKSES a 
                                    inner join sppd_karyawan b on b.short_posisi = a.jabatan
                                    inner join jabatan c on c.telkomdivision = b.telkomdivision
								where a.jabatan  = '$jabatan'");	
				*/
				$sql = "select  a.kode_klp_menu, a.nik, a.nama, '-' as pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok 
									, c.kode_ubis, d.kode_induk, c.kode_kota, c.kode_ba, c.cfu, c.status , c.cocd 
							from exs_hakakses a 
								inner join bpc_lokasi b on b.kode_lokasi = a.kode_lokasi 
								inner join exs_karyawan c on c.nik = a.nik and c.kode_lokasi = a.kode_lokasi 
								left outer join (select kode_ubis, nama, kode_lokasi, kode_induk from exs_ubis union select kode_cc, nama, kode_lokasi, kode_induk from exs_cc) d on d.kode_ubis = c.kode_ubis and d.kode_lokasi = a.kode_lokasi
						where a.nik = '$user' ";
				
				$rs = $this->db->execute($sql);
				if ($row = $rs->FetchNextObject(false))
				{
					$dit = $this->getDirektorat($row->kode_ubis);
					$row->kode_gubis = $dit;
					$result["userdata"] = (array) $row;
					//error_log(json_encode($row));
				}else {
					{		
						$result["msg"] = "User Profile tidak ditemukan di BPC";		
						$result["type"] = 1;
						throw new Exception("User Profile tidak ditemukan di BPC");
					}
				}
					
				$loginOk = true;
				//$this->sendMail("","650882@telkom.co.id", "Akun $user login",  "login RKAP");
			}else {
				 $row = $this->loginAP($user, $pass);
				 error_log(json_encode($row));
				 if ($row){
				 	
				 	$result["userdata"] = (array) $row;
				 	$loginOk = true;
				 }else 	{			
				  $result["msg"] = "Password atau UserId anda salah";		
				  $result["type"] = 1;
				}
			}				
			
			if ($loginOk){

				$rs = $this->db->execute("select to_char(sysdate,'YYYYMM') as periode, to_char(sysdate,'YYYYMM') as periode_sys from dual");
				if ($row = $rs->FetchNextObject(false))
					$result["periode"] = $row->periode;				
				
				$rs = $this->db->execute("select value1 from bpc_rules where kode_rules = 'MODELREP'");
				if ($row = $rs->FetchNextObject(false))
					$result["modelreport"] = $row->value1;

				$rs = $this->db->execute("select value1 from bpc_rules where kode_rules = 'MODELUNC'");
				if ($row = $rs->FetchNextObject(false))
					$result["modelreportuncons"] = $row->value1;

				$result["session"] = session_id();
				$_SESSION["pass"] = $pass;
				$_SESSION["username"] = $user;
				
				$session = $result["session"];//md5(date("r"));
				$path = $_SERVER["REQUEST_URI"];
				global $dirSeparator;
				global $serverDir;			
				$rootPath = substr($serverDir,0,strpos($serverDir,"server") - 1);
				for ($i = 0; $i < 2; $i++){
					  $path = substr($path,0,strrpos($path,"/"));		
				} 
				$ip = $this->get_client_ip();
				global $dbConnection;
				$serverinfo = array("ip" => $ip, "host" => GetHostByName($ip),
									//"dbname" => $dbConnection->dbName . "-" . $dbConnection->dbDriver,
									//"dbhost" => $dbConnection->dbHost, "driver" => $dbConnection->dbDriver,
									"path" => $path, "http_host" => $_SERVER["HTTP_HOST"], "root" => $rootPath,
									"url" => $_SERVER["REQUEST_URI"] );
				$result["serverinfo"] = $serverinfo;
				$this->db->execute("insert into bpc_sessions(username, tgl, ip,  tgl_logout, sessions, last_update)
									values('$user',sysdate,'$ip', sysdate, '$session', sysdate)");
			}
			
			
		}catch(Exception $e){
			$result["msg"] = $e->getMessage();		
			$result["type"] = 1;
		}
		error_log(json_encode($result));
		return $result;
	}
	
	function logout($user){
		$this->getDb();
		$session = session_id();
		$this->db->execute("update bpc_sessions set tgl_logout = sysdate where sessions = '$session'");
		session_unset();
		session_destroy();
		return true;
	}
	function getNoBuktiOtomatis($table, $field, $format, $formatNumber, $addFilter = null, $reverse = null){
		$this->getDb();
		$db = $this->db;
		$nb = $format . $formatNumber;
		$formatTmp = "";
		for ($i = 0; $i < strlen($formatNumber); $i++)
			$formatTmp .= "_";
		if ($reverse)
			$rs =$db->execute("select max($field) as no_bukti from $table where $field like '".$formatTmp.$format."' $addFilter");
		else 
			$rs =$db->execute("select max($field) as no_bukti from $table where $field like '".$format.$formatTmp."' $addFilter");
	
		while ($row = $rs->FetchNextObject(false)){
			$nb = $row->no_bukti;
		}
		if ($reverse)
			$no = floatval(substr($nb,0,strlen($formatNumber)));
		else 
			$no = floatval(substr($nb,strlen($format)));
		$no ++;
		$noStr = (string) $no;
		$len = strlen($noStr);
	
		for ($i = $len; $i < strlen($formatNumber); $i++){
			$noStr = "0" . $noStr;	
		}
		if ($reverse)
			$nb = $noStr . $format;	
		else 
			$nb = $format . $noStr;	
		return $nb;
	}
	function saveUser($data, $user){
		try{
			$db = $this->getDb();	
			$sql = new server_util_arrayList();
			$sql->add("delete from exs_karyawan where nik= '$data->nik' ");//and ( kode_lokasi='$data->lokasi' or kode_lokasi in (select kode_lokasi from bpc_lokasi where cocd = '$data->lokasi' ) )  
			$sql->add("delete from exs_userubis where nik= '$data->nik' ");
			$sql->add("delete from exs_useraksescfu where nik= '$data->nik' ");
			$sql->add("delete from exs_hakakses where nik= '$data->nik' ");

			$sql->add("insert into exs_karyawan(nik,nama,jabatan, kode_gubis, kode_ubis, kode_ba, kode_lokasi, email, no_telp, cfu) values 
						('$data->nik','$data->nama','$data->jabatan','-','$data->ubis','-','$data->lokasi','$data->email','$data->telp','$data->cfu')");
			$pass = $data->pass;
			$pass = md5($pass);	

			$sql->add("insert into exs_hakakses (nik, nama, pass, status_admin, kode_lokasi, kode_klp_menu, klp_akses) values 
						('$data->nik','$data->nama','$pass','A','$data->lokasi','$data->menu','A')");
			
			foreach ($data->listUbis as $val){	
				$sql->add("insert into exs_userubis(nik, kode_ubis, kode_lokasi, nik_user, tgl_update)values 
						('$data->nik','$val','$data->lokasi','$user',sysdate)");
			}
			foreach ($data->listCFU as $val){
				$sql->add("insert into exs_useraksescfu(nik, kode_cfu, kode_lokasi, nik_user, tgl_update)values 
						('$data->nik','$val','$data->lokasi','$user',sysdate)");
			}

			return $db->execArraySQL($sql);
		}catch(Exception $e){
			error_log($e->getMessage());
		}
	}
	function findUser($search){
		//error_log($search);
		$db = $this->getDb();	
		$search = strtoupper($search);
		$rs = $db->execute("select a.nik,a.nama,a.jabatan, 
				  a.kode_lokasi, 	a.cfu, a.kode_ubis,  d.nama as nmubis, a.status, a.email, a.no_telp, c.kode_klp_menu  
					from exs_karyawan a 
					left outer join exs_ubis d on d.kode_ubis = a.kode_ubis and d.kode_lokasi = a.kode_lokasi 
					left outer join exs_hakakses c on c.nik = a.nik and c.kode_lokasi = a.kode_lokasi 
				 where ( upper(a.nama) like '%$search%' or 
				   upper(a.nik) like '%$search%' or 
				   upper(a.kode_ba) like '%$search%' or 
				   upper(a.kode_ubis) like '%$search%' or 
				   upper(d.nama) like '%$search%' or 
				   upper(a.cfu) like '%$search%' or 
				   upper(c.kode_klp_menu) like '%$search%' or 
				 	upper(a.jabatan) like '%$search%' ) order by a.nik");
		$result = array();
		while ($row = $rs->FetchNextObject(false)){
			$result[] = (array) $row;
		}
		return $result;

	}
	function updatePassword($nik, $pwd){
		$db = $this->getDb();	
		$sql = new server_util_arrayList();
		$sql->add("update exs_hakakses set pass = '". md5($pwd) ."' where nik= '$nik' ");
		return $db->execArraySQL($sql);
	}
	function deleteUser($nik, $lokasi = null){
		$db =  $this->getDb();	
		$sql = new server_util_arrayList();
		$sql->add("delete from exs_karyawan where nik= '$nik' ");//and ( kode_lokasi='$data->lokasi' or kode_lokasi in (select kode_lokasi from bpc_lokasi where cocd = '$data->lokasi' ) )  
		$sql->add("delete from exs_userubis where nik= '$nik' ");
		$sql->add("delete from exs_useraksescfu where nik= '$nik' ");
		$sql->add("delete from exs_hakakses where nik= '$nik' ");
		return $db->execArraySQL($sql);

	}
	//search pake array_search(textToSearch, array); 
	function getUserAkses($nik){
		$db = $this->getDb();
		$rs = $db->execute("select distinct kode_ubis from exs_userubis where nik = '$nik'");
		$result = array();
		while ($row = $rs->FetchNextObject(false)){
			$result[] = $row->kode_ubis;
		}	
		return $result;
	}
	function getUserCFUAkses($nik){
		$db = $this->getDb();
		$rs = $db->execute("select distinct kode_cfu from exs_useraksescfu where nik = '$nik'");
		$result = array();
		while ($row = $rs->FetchNextObject(false)){
			$result[] =  $row->kode_cfu;
		}	
		return $result;
	}

	function getUserMenuAkses($nik){
		$db = $this->getDb();
		$rs = $db->execute("select distinct kode_form from exs_menu a 
							inner join exs_hakakses b on b.kode_klp_menu = a.kode_klp
							where a.kode_klp  = '$nik'");
		$result = array();
		while ($row = $rs->FetchNextObject(false)){
			$result[] = $row->kode_form;
		}	
		return $result;	
	}

	function cekMenu($menu){
		$db = $this->getDb();
		$user = $this->userid;//$_SESSION["user"];;
		if (isset($user)){
			$listMenu = $this->getUserMenuAkses($user);
			if (in_array($menu, $listMenu)){
				return true;
			}else return false;
		}else return false;
	}

	
	function getUser($nik, $lokasi = null){
		$this->getDb();
		$rs = $this->db->execute("select a.kode_lokasi, a.nama,a.kode_jab,a.jabatan, a.kode_gubis, a.kode_ubis, a.kode_ba, a.kode_kota, a.status, email, no_telp, sts_email, sts_telp, a.cfu, b.pass,b.status_admin, b.kode_klp_menu  
							    from exs_karyawan a inner join exs_hakakses b on b.nik = a.nik 
							    where a.nik ='$nik' ");//and ( kode_lokasi  = '$lokasi' or kode_lokasi in ( '$lokasi' ) )
		$result = array();
		if  ($row = $rs->FetchNextObject(false)) {
			return (array) $row;
		}
		return $result;
	}
	
	function callServices($service, $method, $param){
		try{
			uses("services_".$service);
			eval("\$handler = new services_".$service."();");
			$handler->setUserId($this->userid);
			$handlerFunc = array($handler, $method);
			if (is_callable($handlerFunc))
			{
				try
				{
					$result = call_user_func_array($handlerFunc, $param);
					//error_log(json_encode($result) );
					return $result;
				}
				catch (Exception $e)
				{
					error_log($e->getMessage());
					return "Internal Service Error : " . $e;
				}
			}
			else
			{
				error_log("Procedure Note Found ");
				return  "Procedure not found : " . $method;
			}
		}catch(Exception $e){
			error_log($e->getMessage());
			return "Gagal Generate Data " . $e;
		}

	}
			

}
?>