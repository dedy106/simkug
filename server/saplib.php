<?php

date_default_timezone_set("Asia/Jakarta");

uses("server_DBConnection_dbLib");

uses("server_util_arrayList");

uses("server_util_rfcLib");



class saplib

{

	public $monthName = array("Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nop","Des");

	function __construct()

	{

		$this->db = null;

	}

	

	function hello($param)

	{

		$result = "Hello $param ";

		

		return $result;

	}

	function showMe($param)
	{
		$result = "Welcome $param ";
		return $result;
	}

	function showProfile($param)
	{
		$ch = curl_init(); 
		$data_login = array(
			'nik' => 'esaku',
			'password' => 'saisai'
		);
		curl_setopt($ch, CURLOPT_URL,"https://devapi.simkug.com/api/esaku-auth/login");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_login);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output = json_decode(curl_exec($ch));
		curl_close($ch); 
		$token = $output->token;

		$ch2 = curl_init(); 
		curl_setopt($ch2, CURLOPT_URL,"https://devapi.simkug.com/api/esaku-auth/profile-user?nik=".$param);
		curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
			'Content-Type: application/json; charset=utf-8',
			'Authorization: Bearer '.$token //REST API KEY 
		));
		curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output2 = json_decode(curl_exec($ch2));
		curl_close($ch2);      
		return $output2->user;
	}

	function getPesertaSIKA($param)
	{
		$ch = curl_init(); 
		$data_login = array(
			'key' => 'IeXdn4oCBXN76PlsGXdB5PtuyAK7bqXvS1K4Y4k3s',
			'nikes' => $param
		);
		curl_setopt($ch, CURLOPT_URL,"https://sika.yakestelkom.or.id/api2/getPesertaDakem");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_login);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output = json_decode(curl_exec($ch));
		curl_close($ch); 
		return $output;
	}

	function getPesertaDakemSIKA($param)
	{
		$ch = curl_init(); 
		$data_login = array(
			'key' => 'IeXdn4oCBXN76PlsGXdB5PtuyAK7bqXvS1K4Y4k3s',
			'nikes' => $param
		);
		curl_setopt($ch, CURLOPT_URL,"https://sika.yakestelkom.or.id/api2/getPesertaDakem");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_login);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output = json_decode(curl_exec($ch));
		if (curl_errno($ch)) {
			$error_msg = curl_error($ch);
			$res['status'] = false;
		}else{
			$error_msg = "sukses";
			$res['status'] = true;
		}
		curl_close($ch); 
		$res['message'] = $error_msg;
		$res['output'] = $output;
		return $res;
	}

	function getPesertaDakem($param)
	{
		// GET TOKEN API SAI
		$url = "https://api.simkug.com/api/yakes-auth/login";
        $url2 = "https://api.simkug.com/api/yakes-trans/peserta-dakem-nikes";

        $fields = array(
            "nik" => "yakes",
            "password" => "saisai"
        );

		$ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, FALSE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $output = json_decode(curl_exec($ch));
        curl_close($ch);   
		$token = $output->token;
		// END GET TOKEN
	
		try{ 
			$postdata = array(
				'nikes' => $param
			);

            $ch2 = curl_init(); 
            curl_setopt($ch2, CURLOPT_URL,$url2);
            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch2, CURLOPT_HEADER, FALSE);
            curl_setopt($ch2, CURLOPT_POST, TRUE);
            curl_setopt($ch2, CURLOPT_POSTFIELDS, $postdata);
            curl_setopt($ch2, CURLOPT_FAILONERROR, true);
            curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
                'Authorization: Bearer '.$token //REST API KEY 
            ));
            curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
            $res = json_decode(curl_exec($ch2));
            if (curl_errno($ch2)) {
                $error_msg = curl_error($ch2);
            }else{
                $error_msg = "sukses";
            }
            curl_close($ch2);
            $sts = $res->status;
            $msg = $res->message;
            $msg .= $error_msg;

        } catch (exception $e) { 
            error_log($e->getMessage());		
            $msg = " error " .  $e->getMessage();
            $sts = false;
            $res = array();
        } 	
		return $res;
	}

	function getPesertaDakemByNIK($param)
	{
		// GET TOKEN API SAI
		$url = "https://api.simkug.com/api/yakes-auth/login";
        $url2 = "https://api.simkug.com/api/yakes-trans/peserta-dakem-nik";

        $fields = array(
            "nik" => "yakes",
            "password" => "saisai"
        );

		$ch = curl_init(); 
        curl_setopt($ch, CURLOPT_URL,$url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
        curl_setopt($ch, CURLOPT_HEADER, FALSE);
        curl_setopt($ch, CURLOPT_POST, FALSE);
        curl_setopt($ch, CURLOPT_POSTFIELDS, $fields);
        curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
        curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
        $output = json_decode(curl_exec($ch));
        curl_close($ch);   
		$token = $output->token;
		// END GET TOKEN

		try{
			$postdata = array(
				'nik' => $param
			);
            $ch2 = curl_init(); 
            curl_setopt($ch2, CURLOPT_URL,$url2);
            curl_setopt($ch2, CURLOPT_RETURNTRANSFER, TRUE);
            curl_setopt($ch2, CURLOPT_HEADER, FALSE);
            curl_setopt($ch2, CURLOPT_POST, TRUE);
            curl_setopt($ch2, CURLOPT_POSTFIELDS, $postdata);
            curl_setopt($ch2, CURLOPT_FAILONERROR, true);
            curl_setopt($ch2, CURLOPT_HTTPHEADER, array(
                'Authorization: Bearer '.$token //REST API KEY 
            ));
            curl_setopt($ch2, CURLOPT_SSL_VERIFYPEER, FALSE);
            curl_setopt($ch2, CURLOPT_SSL_VERIFYHOST, FALSE);
            $res = json_decode(curl_exec($ch2));
            if (curl_errno($ch2)) {
                $error_msg = curl_error($ch2);
            }else{
                $error_msg = "sukses";
            }
            curl_close($ch2);
            $sts = $res->status;
            $msg = $res->message;
            $msg .= $error_msg;

        } catch (exception $e) { 
            error_log($e->getMessage());		
            $msg = " error " .  $e->getMessage();
            $sts = false;
            $res = array();
        } 	
		return $res;
	}

	function getPesertaSIKAByNIK($param)
	{
		$ch = curl_init(); 
		$data_login = array(
			'key' => 'IeXdn4oCBXN76PlsGXdB5PtuyAK7bqXvS1K4Y4k3s',
			'nik' => $param
		);
		curl_setopt($ch, CURLOPT_URL,"https://sika.yakestelkom.or.id/api2/getPesertaDakem");
		curl_setopt($ch, CURLOPT_RETURNTRANSFER, TRUE);
		curl_setopt($ch, CURLOPT_HEADER, FALSE);
		curl_setopt($ch, CURLOPT_POST, FALSE);
		curl_setopt($ch, CURLOPT_POSTFIELDS, $data_login);
		curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, FALSE);
		curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, FALSE);
		$output = json_decode(curl_exec($ch));
		curl_close($ch); 
		return $output;
	}

	private function getDb()

	{

	

		if ($this->db == null)

		{

			$this->db = new server_DBConnection_dbLib("mssql");

		}

		

		return $this->db;

	}

	function login($user, $pass){

		try{

			global $ldaphost;

			

			$result = array("userdata" => "", "type" => 0, "msg" => "","periode" => "", "serverinfo" => array(),"portalinfo" =>array());

			$this->getDb();

			$ret = $this->db->connect();

			if ($ret != "success") throw new Exception($ret);

		

			

			

			$auth = $this->db->LDAP_auth($user, $pass, $ldaphost);	

			session_regenerate_id();  									

			if ($auth == 1){//$auth == 1

				$detailPortal = json_decode($this->getDetailUserInfoFromPortal($user));

				if (count($detailPortal->items) > 0){

					foreach ($detailPortal->items as $value){

						if ($value->NIK == $user){

							$kd_unit = strtoupper($value->KD_UNIT);

							$nama = $value->NAMA;

						}

						if ($value->NIK_POH == $user){

							$kd_unit = strtoupper($value->KD_UNIT);

						}

						$jabatanid = $value->OBJ_POSISI;

						$jabatan = $value->VS_POSISI;

					}

					$result["portalinfo"] = $detailPortal;

				}

				$rs = $this->db->db->execute("select  a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi

									, 'DES' as nmlok 

									, c.band_posisi, c.posisi, c.hp, c.email, c.bidang

							from des_hakakses a 

								inner join des_phonebook c on c.nik = a.nik 

							where a.nik= '$user' ");

						

				if ($row = $rs->FetchNextObject(false))

				{

					$dit = $this->getDirektorat($row->kode_ubis);

					$row->kode_gubis = $dit;

					$result["userdata"] = (array) $row;

					$menu = $this->getMenu($row->kode_klp_menu);

					//error_log(json_encode($menu));

					$result["userdata"]["menu"] = $menu;

					//error_log(json_encode($row));

				}else {

					$result["msg"] = "User Profile tidak ditemukan di BPC";		

				 	$result["type"] = 1;

				 	throw new Exception("User Profile tidak ditemukan di BPC");

				}

					

				$loginOk = true;

				//$this->sendMail("","650882@telkom.co.id", "Akun $user login",  "login RKAP");

			}else {

				 $rs = $this->db->db->execute("select  a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi

									, 'DES' as nmlok 

									, c.band_posisi, c.posisi, c.hp, c.email, c.bidang

							from des_hakakses a 

								inner join des_phonebook c on c.nik = a.nik 

							where a.nik= '$user' ");

				 if ($row = $rs->FetchNextObject(false)){

				 	if ($row->pass == $pass){

						$result["userdata"] = (array) $row;

						$menu = $this->getMenu($row->kode_klp_menu);

						//error_log(json_encode($menu));

						$result["userdata"]["menu"] = $menu;

						$loginOk = true;

					}else {

						$result["msg"] = "Password anda tidak sesuai dengan Portal";		

					   $result["type"] = 1;

					}

				 }else 	{			

				  $result["msg"] = "Password anda tidak sesuai dengan Portal";		

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

				$ip = $_SERVER["REMOTE_ADDR"];

				global $dbConnection;

				$serverinfo = array("ip" => $ip, "host" => GetHostByName($ip), "dbname" => $dbConnection->dbName . "-" . $dbConnection->dbDriver,

									"dbhost" => $dbConnection->dbHost, "driver" => $dbConnection->dbDriver,

									"path" => $path, "http_host" => $_SERVER["HTTP_HOST"], "root" => $rootPath,

									"url" => $_SERVER["REQUEST_URI"] );

				$result["serverinfo"] = $serverinfo;

				$this->db->execute("insert into bpc_sessions(username, tgl, tgl_logout, sessions)

									values('$user',sysdate, sysdate, '$session')");

			}

			

			

		}catch(Exception $e){

			$result["msg"] = $e->getMessage();		

			$result["type"] = 1;

		}

		//error_log(json_encode($result));

		return $result;

	}

    function loadMenu($kodeMenu){

		$this->getDb();

		$result = array();

		$rs = $this->db->execute("select * from des_menu where kode_klp = '$kodeMenu' order by kode_klp, rowindex");

		while ($row = $rs->FetchNextObject(false)){

			$result[] = (array) $row;

		}

		return $result;

	}

	

	function logout($user){

	}

	function cleanUp()

    {

    	global $serverDir;

        uses("server_util_File");

        $tmpDir = new server_util_File($serverDir . "/tmp");

        

        $oldest = strtotime("-24 hour");

        

        if ($tmpDir->isDir())

        {

            $fileList = $tmpDir->listDir();

            

            foreach ($fileList->getArray() as $key => $value)

            {

                if ($value->isFile() && (substr($value->getBaseFileName(), 0, 4) == "ses_"))

                {

                    if ($value->getModifTime() < $oldest)

                        $value->delete();

                }                             

            }

        }

    }

    /*

    	download client data with xlsx Excel Format

    */

    

	function childsToArray(&$item){

		$item->dataArray["childs"] = array();

		foreach ($item->childs as $val){

			$this->childsToArray($val);

			$item->dataArray["childs"][] = $val->dataArray;

		}

	}

	function getMenu($kode){

		$this->getDb();

		$rs = $this->db->execute("select a.kode_menu,a.kode_form ,a.nama , a.level_menu as level_spasi, a.rowindex, a.icon, b.nama_form, b.form

				 from des_menu a 

				left outer join des_m_form b on b.kode_form = a.kode_form

 				where a.kode_klp = '$kode' order by a.rowindex");	

 		$result = array();

 		$rootNode = new server_util_NodeNRC("00");

 		$node = "";

		while ($row = $rs->FetchNextObject(false)){

			if ($node == ""){

				$node = new server_util_NodeNRC($rootNode);

			}else if ($node->level == floatval($row->level_spasi) - 1 ){

				$node = new server_util_NodeNRC($node);

			}else if ($node->level == floatval($row->level_spasi) ){

				$node = new server_util_NodeNRC($node->owner);

			}else if ($node->level > floatval($row->level_spasi) ){

				while ($node->owner != $rootNode && $node->level > floatval($row->level_spasi) ) {

					$node = $node->owner;

				}

				$node = new server_util_NodeNRC($node->owner);

			}

			$node->setData($row);

		}

		foreach ($rootNode->childs as $key => $val){

			$this->childsToArray($val);

			$result[] = $val->dataArray;

			

		}

		return $result;	

	}

    function getForm($kodeForm){

        $this->getDb();

        $rs = $this->db->execute("select form from des_m_form where kode_form = '$kodeForm'");

        if ($row = $rs->FetchNextObject(false))

            return $row->form;

        else return "";

    }

	//------- user

	function addUser($user){

		$this->getDb();

		$sql = new server_util_arrayList();

		$sql->add(array("tipe"=> "sql",

						"sql" => "insert into des_hakakses(nik, nama, pass, kode_lokasi, klp_akses, kode_klp_menu)values

									(:0,:1,:2,:3,:4,:5)",

						"param" => array($user->nik, $user->nama, $user->pass, '10',$user->profile,$user->menu )

						)

				);

		$ret = $this->db->execArraySQL($sql);

		if ($ret === "process completed")

			return array("tipe" => 1, "msg" => "Data sukses tersimpan");

		else {

			error_log($ret);

			return array("tipe" => 0, "msg" => "Data gagal tersimpan");

			

		}

	}

	function updateUser($user){

		$this->getDb();

		$sql = new server_util_arrayList();

		$sql->add(array("tipe"=> "sql",

						"sql" => "update des_hakakses set nama = :1, pass = :2, klp_akses = :3, kode_klp_menu = :4

									where nik = :0 ",

						"param" => array($user->nik, $user->nama, $user->pass, $user->profile,$user->menu )

					)

				);

		$ret = $this->db->execArraySQL($sql);

		if ($ret === "Process Completed")

			return array("tipe" => 1, "msg" => "Data sukses tersimpan");

		else {

			return array("tipe" => 0, "msg" => "Data gagal Sukses tersimpan");

		}

	}

	function delUser($user){

		$this->getDb();

		$sql = new server_util_arrayList();

		$sql->add(array("tipe"=> "sql",

						"sql" => "delete from des_hakakses where nik = :0 ",

						"param" => array($user->nik)

						)

				);

		$ret = $this->db->execArraySQL($sql);

		if ($ret === "Process Completed")

			return array("tipe" => 1, "msg" => "Data sukses tersimpan");

		else {

			return array("tipe" => 0, "msg" => "Data gagal Sukses tersimpan");

		}

	}

	//------- contact

	function addContact($contact){

	}

	function updateContact($contact){

	}

	function delContact($contact){

	}

	//------- vendor

	function addVendor($vendor){

	}

	function updateVendor($vendor){

        

	}

	function delVendor($vendor){

	}

	//-------- Corp Cust

	function addCorpCust($cc){

	}

	function updateCorpCust($cc){

	}

	function delCorpCust($cc){

	}

	function formatNumber($number){

        return sprintf("%010d", $number);

    }

    function getDocPayment($tahun, $nodok){

		$db = $this->getDb();

		$rs = $db->execute("select flag, keterangan from spro where kode_spro = 'SAPUSER'");

        

    if ($row = $rs->FetchNextObject(false)){

            $user = $row->flag;

            $pass = $row->keterangan;

    }

    $this->rfc = new server_util_rfcLib("rra/sapyks");

		

				$login = new server_util_Map();

				$login->set("user", $user);

				$login->set("passwd", $pass);

        $sapExp = null;

				//$pp = substr($pp,1,5);

				$sapImp = new server_util_Map(array("IM_BUKRS" =>"YKES",

																						"IM_GJAHR" => $tahun,

																						"IM_STATS" => 4

																						));

        $sapExpTable = new server_util_Map(array("T_RETURN","T_ZSPB"));

        $dok = new server_util_arrayList();

        

        if ($nodok != ""){

        	  foreach ($nodok as $val){

        			$dok->add(array("SIGN"=>"I","OPTION"=>"CP","LOW"=> $val,"HIGH"=> ""));

        		}

        }

        echo (json_encode($dok->getArray()));

				$sapImpTable = new server_util_Map(array("T_BELNR" => $dok));

				//error_log("Excute ");

				$ret = $this->rfc->callRFCToJSON($login,"ZRFC_SPB_STATUS", $sapImp, $sapExpTable, $sapImpTable, $sapExp, true);

				//error_log(json_encode($ret));

        

        $data = $ret->get("T_ZSPB");

        

        error_log(json_encode($data));

        $result = array();

        foreach ($data as $key => $val){

        		$result[$val["BELNR"]] = $val["PYORD"];

        }

        return $result;

	}

	function getSaldo($akun, $pp, $periode){
		$db = $this->getDb();
		$rs = $db->execute("select flag, keterangan from spro where kode_spro = 'SAPUSER'");
    	if ($row = $rs->FetchNextObject(false)){
            $user = $row->flag;
            $pass = $row->keterangan;
    	}

    	$this->rfc = new server_util_rfcLib("rra/sapyks");
		/*
			saprfc_import ($fce,"IM_ACCGROUP","E");

				saprfc_import ($fce,"IM_FICTR", $value->get("cc"));

				saprfc_import ($fce,"IM_FIKRS", $fikrs);

				saprfc_import ($fce,"IM_FIPEX",$value->get("akun"));

				saprfc_import ($fce,"IM_FT_WRTTP", $wrttp);

				saprfc_import ($fce,"IM_GJAHR", $tahun);

				saprfc_import ($fce,"IM_KOKRS", $kokrs);

				saprfc_import ($fce,"IM_PERFROM","0".$value->get("bln1"));

				saprfc_import ($fce,"IM_PERTO","0".$value->get("bln2"));

				saprfc_import ($fce,"IM_VERSN","00".$ver);

		*/
		$login = new server_util_Map();
				$login->set("user", $user);
				$login->set("passwd", $pass);
		$akun = $this->getMapAkun($akun);
        error_log("getSaldo ". $user .":$akun => ".$akun . ":".$periode .":".substr($periode,0,4).":".substr($periode,4,2));
				$sapExp = null;
				$pp = substr($pp,1,5);
				$sapImp = new server_util_Map(array("IM_ACCGROUP" => "E",
													"IM_FICTR" => $pp,
													"IM_FIKRS" =>"YKES",
													"IM_FIPEX" => $akun,
													"IM_FT_WRTTP" => 64,
													"IM_GJAHR" => substr($periode,0,4),
													"IM_KOKRS" => "YKES",
													"IM_PERFROM" => '01',
													"IM_PERTO" => '12',
													"IM_VERSN" => "000"));

        	$sapExpTable = new server_util_Map(array("RESTABLE"));
				$sapImpTable = null;
				error_log("Excute ");
				$ret = $this->rfc->callRFCToJSON($login,"ZFMFI_CEKSALDO", $sapImp, $sapExpTable, $sapImpTable, $sapExp, true);
				//error_log("Return " . print_r($ret, true));
				$data = $ret->get("RESTABLE");
				error_log("Restable ". print_r ($data, true));
				$saldo = 0;
				$row = $data[0];
				$aktual = 0;
        //error_log(json_encode($row));
        //if ($row)
        {

        	$aktual = $row["TSL03"];

        	if (strpos($aktual,"-") > 1)

        		$aktual = floatval($aktual) * -1;

        	else $aktual = floatval($aktual); 

        	

        	$budgetRel = $row["TSL05"];

        	if (strpos($budgetRel,"-") > 1)

        		$budgetRel = floatval($budgetRel) * -1;

        	else $budgetRel = floatval($budgetRel);

        	

        	$budgetPlan = $row["TSL09"];

        	if (strpos($budgetPlan,"-") > 1)

        		$budgetPlan = floatval($budgetPlan) * -1;

        	else $budgetPlan = floatval($budgetPlan);

        	

        	$saldo = $budgetRel - $aktual;

        }

        error_log("Return Saldo " . $saldo);

        return $saldo;

	}

	
	function getRFC($pp, $periode){
		$db = $this->getDb();
		$rs = $db->execute("select flag, keterangan from spro where kode_spro = 'SAPUSER'");
    	if ($row = $rs->FetchNextObject(false)){
            $user = $row->flag;
            $pass = $row->keterangan;
    	}
		$this->rfc = new server_util_rfcLib("rra/sapyks");
		
		$login = new server_util_Map();
				$login->set("user", $user);
				$login->set("passwd", $pass);
				
		
		$sapImp = new server_util_Map(array(
                                    "IM_GJAHR" => $tahun ,
                                    "IM_KOKRS" => $compCode,
                                    "IM_VERSN" => "000",
                                    "IM_RLDNR"	=> "N1"
                                    ));
		
	}
	
	
	
	
	
	  function releaseSAP($data, $tahun, $user, $pass){
        $db = $this->getDb();
        //$rs = $db->execute("select flag, keterangan from spro where kode_spro = 'SAPUSER'");
       	//if ($row = $rs->FetchNextObject(false))
       	//{
         //   $user = $row->value1;
         //   $pass = $row->value2;
        //}
        //$userLogin = $header->userlog;
        $login = new server_util_Map();
				$login->set("user", $user);
				$login->set("passwd", $pass);    

        $this->rfc = new server_util_rfcLib("rra/sapyks");
				$sapImp = new server_util_Map(array(
								"DOC_HEADER" => array ("FM_AREA" => "YKES","OVERALL" => "X",
																"VERSION" => "000",
																 "AUTORELEASE"=> ""
																 ,"RESPONSIBLE" => ""
																 ,"RPUBLAW" =>""
																 ,"RLEGIS" =>""
																 ,"RCOHORT" => "",
																 "DOCTYPE" => ""
																 ,"AWTYP" => "FR51","AWREF" => ""
																 ,"AWORG" => ""
																 ,"AWSYS" => "","VALUE_DATE" =>"","DOC_DATE" =>"","POSTING_DATE"=>""
																 ,"POSTING_PERIOD" =>"","DOC_TEXT" =>""
																 ,"TEXT_NAME" =>""
																 ,"TRANS_CURR" =>""
																 ,"VALKEY" =>""
																 ,"SRC_BELNR" =>""),
                				"MD_COMPLETE_CHECK" => "",
								"PARKED" => "",
                				"TESTRUN" => ""));
        error_log("start budget sap");
		$no_urut = 0;

        $itemBudget = new server_util_arrayList();

        foreach ($data as $val){
        	$pp = substr($val->kode_pp,1,5);
			$akun = $this->getMapAkun($val->kode_akun);
        	$nilai = floatval($val->nilai) / 100;
        	$bln = substr($val->periode,4,2);
        	error_log("ItemRelease $pp : Orig $val->kode_akun :  $akun :  $nilai  : $bln ");
          	$itemBudget->add(array("VALUE_TYPE" => 46
			  						,"BDGT_TYPE" => "KBFR"
									,"BDGT_SUBTYPE" => ""
									,"FISC_YEAR" => $tahun
									,"COMMT_YEAR" => ""
									,"PERIOD" => $bln
									,"DISTR_KEY"=> ""
									,"FUND" => ""
									,"FUNDS_CTR" => $pp
									,"CMMT_ITEM" => $akun
									,"FAREA" => ""
									,"LNITEM_GROUP" => ""
									,"VALUE" => $nilai) );

          $itemBudget->add(array("VALUE_TYPE" => 72
		  							,"BDGT_TYPE" => "KBFR"
									,"BDGT_SUBTYPE" => ""
									,"FISC_YEAR" => $tahun
									,"COMMT_YEAR" => ""
									,"PERIOD" => $bln
									,"DISTR_KEY"=> ""
									,"FUND" => ""
									,"FUNDS_CTR" => $pp
									,"CMMT_ITEM" => $akun
									,"FAREA" => ""
									,"LNITEM_GROUP" => ""
									,"VALUE" => $nilai) );
        }

        

        if (count($itemBudget->getArray()) > 0){ 
	        error_log("Item Budget => ". print_r($itemBudget->getArray(), true));
					$sapExp = new server_util_Map(array("HIERARCHY_DOC_NUMBER","ENTRY_DOC_NUMBER"));
	        		$sapExpTable = new server_util_Map(array("RETURN"));
					$sapImpTable = new server_util_Map(array("DOC_ITEMS" => $itemBudget));
					$ret = $this->rfc->callRFC($login,"ZKBPI_BUDGET_ENTER", $sapImp, $sapExpTable, $sapImpTable, $sapExp, true);
	        error_log("releaseBuget " . print_r($ret->getArray(), true));
	        error_log("releaseBuget " . print_r($ret->get("RETURN")->getArray(), true));
	        $doc = $ret->get("HIERARCHY_DOC_NUMBER");
	        error_log("Doc " . json_encode($doc));
	        return $doc;

	      }else return "";

        

    }

	function getMapAkun($akun){
		$db = $this->getDb();
		$rs = $db->execute("select kode_gar from sap_deriver where kode_akun ='$akun' ");
        if ($row = $rs->FetchNextObject(false)){
			return $row->kode_gar;
		}
		return $akun;
	}
	  function transportSAP($data, $tahun, $user, $pass){
        $db = $this->getDb();
        $rs = $db->execute("select value1, value2 from spro where kode_spro = 'SAPUSER'");
        if ($row = $rs->FetchNextObject(false)){

         //   $user = $row->value1;

         //   $pass = $row->value2;

        }

        //$userLogin = $header->userlog;

        $login = new server_util_Map();

				$login->set("user", $user);

				$login->set("passwd", $pass);

        

        $this->rfc = new server_util_rfcLib("rra/sapyks");

        /*

        FM_AREA

C(4) 	VERSION

C(3) 	OVERALL

C(1) 	AUTORELEASE

C(1) 	RESPONSIBLE

C(20) 	RPUBLAW

C(20) 	RLEGIS

C(1) 	RCOHORT

C(4) 	DOCTYPE

C(4) 	AWTYP

C(5) 	AWREF

C(10) 	AWORG

C(10) 	AWSYS,VALUE_DATE,DOC_DATE,POSTING_DATE,POSTING_PERIOD,DOC_TEXT,TEXT_NAME,TRANS_CURR,VALKEY,SRC_BELNR

        

        */

		$sapImp = new server_util_Map(array(

								"DOC_HEADER" => array ("FM_AREA" => "YKES","OVERALL" => "X",

																"VERSION" => "000",

																 "AUTORELEASE"=> ""

																 ,"RESPONSIBLE" => ""

																 ,"RPUBLAW" =>""

																 ,"RLEGIS" =>""

																 ,"RCOHORT" => "",

																 "DOCTYPE" => ""

																 ,"AWTYP" => "FR50","AWREF" => ""

																 ,"AWORG" => ""

																 ,"AWSYS" => "","VALUE_DATE" =>"","DOC_DATE" =>"","POSTING_DATE"=>""

																 ,"POSTING_PERIOD" =>"","DOC_TEXT" =>""

																 ,"TEXT_NAME" =>""

																 ,"TRANS_CURR" =>""

																 ,"VALKEY" =>""

																 ,"SRC_BELNR" =>""),

                "MD_COMPLETE_CHECK" => "",

								"PARKED" => "",

                "TESTRUN" => ""));

		

        error_log("start posting sap");

				$no_urut = 0;

        $itemBudget = new server_util_arrayList();

        $total = 0;

        foreach ($data as $val){

        	$pp = $val->kode_pp;//substr($val->kode_pp,1,5);

        	$akun = $val->kode_akun;

        	$nilai = floatval($val->nilai) / 100;

        	$bln = substr($val->periode,4,2);

        	error_log($pp . ":" . $akun . ":". $nilai);

        	$total++;

          $itemBudget->add(array("VALUE_TYPE" => 43

          													,"BDGT_TYPE" => "KBUD"

          													,"BDGT_SUBTYPE" => ""

          													,"FISC_YEAR" => $tahun

          													,"COMMT_YEAR" => ""

          													,"PERIOD" => $bln

          													,"DISTR_KEY"=> ""

          													,"FUND" => ""

          													,"FUNDS_CTR" => $pp

          													,"CMMT_ITEM" => $akun

          													,"FAREA" => ""

          													,"LNITEM_GROUP" => ""

          													,"VALUE" => $nilai) );

          $itemBudget->add(array("VALUE_TYPE" => 70

          													,"BDGT_TYPE" => "KBUD"

          													,"BDGT_SUBTYPE" => ""

          													,"FISC_YEAR" => $tahun

          													,"COMMT_YEAR" => ""

          													,"PERIOD" => $bln

          													,"DISTR_KEY"=> ""

          													,"FUND" => ""

          													,"FUNDS_CTR" => $pp

          													,"CMMT_ITEM" => $akun

          													,"FAREA" => ""

          													,"LNITEM_GROUP" => ""

          													,"VALUE" => $nilai) );

        	

        }

        $doc ="";

        if ($total > 0){

	        //error_log(json_encode($itemBudget->getArray()));

					$sapExp = new server_util_Map(array("HIERARCHY_DOC_NUMBER","ENTRY_DOC_NUMBER"));

	        $sapExpTable = new server_util_Map(array("RETURN"));

					$sapImpTable = new server_util_Map(array("DOC_ITEMS" => $itemBudget));

					$ret = $this->rfc->callRFC($login,"ZKBPI_BUDGET_ENTER", $sapImp, $sapExpTable, $sapImpTable, $sapExp, true);

	        error_log(print_r($ret->getArray(), true));

	        error_log(print_r($ret->get("RETURN")->getArray(), true));

	        $doc = $ret->get("HIERARCHY_DOC_NUMBER");

	        error_log("Doc " . json_encode($doc));

	      }

        return $doc;

    }

    function cekReimburse($tahun){

    	$db = $this->getDb();

    	$rs = $db->execute("select no_doksap from glsap where modul = 'IFREIM'  AND dc = 'C' and kode_vendor <>'-'

    					  and no_doksap <>'- 'and no_payment ='-' and periode like '$tahun%'");

    	$result = array();

    	while ($row = $rs->FetchNextObject(false)){

    	  echo(substr($row->no_doksap,0,10) ."<br>");		

    		$result[] = substr($row->no_doksap,0,10);//19000 00026ykes2016

    	}

    

    	return $this->rekonReimburse($tahun, $result);

    }

    function rekonReimburse($tahun, $nobukti){

    	// update field

    	$listPayment = $this->getDocPayment($tahun, $nobukti);

    	echo(json_encode($listPayment) ."<br>");

    	$db = $this->getDb();

    	$sql = new server_util_arrayList();

    	foreach ($listPayment as $key => $value){

    		

    		if ($key != "")

    			$sql->add("update glsap set no_payment='$value' where no_doksap like '$key%' and periode like '$tahun%'  ");

    	}

    	

    	$ret = $db->execArraySQL($sql);

    	echo $ret;

    	if ($ret != "process completed"){

    		 error_log($ret);

    		 return $ret;

    	}

    	

    	return $listPayment;

    		

    }

    function keepBudget($nobukti){

    		error_log($nobukti);

    		$db = $this->getDb();

    		$rs = $db->execute("select a.nilai,a.kode_akun, a.kode_pp, c.sap_user, c.sap_pwd , convert(varchar, a.tanggal,112) as periode from glsap a 

	            						inner join hakakses c on c.nik = a.nik_user 

	            						where a.no_bukti = '$nobukti' and dc ='D' ");

	            $itemJurnal = array();

	            //Production 2 digits

	            $nilai = 0;

	            $dataRelease = array();

							$dataTmp = array();

	            while ($row = $rs->FetchNextObject(false)){

	            	    $tahun = substr($row->periode,0,4);

	        					$user = $row->sap_user;

	            			$pwd = $row->sap_pwd;

	            			$row->nilai = -$row->nilai;

	            			$dataTmp[] = $row;

	            }

    		

			error_log(json_encode($dataTmp) .":".$user.":".md5($pwd) );

    		return $this->releaseSAP($dataTmp, $tahun, $user, $pwd);

    }

    function postSAP($nobukti, $modul){

    	try{

    		 error_log($nobukti.":".$modul); 

	    		$db = $this->getDb();

	    		if ($modul == "IFREIM"){

		    		$rs = $db->execute("select flag from spro where kode_spro = 'VENDORIF' and kode_lokasi ='99'");

		        if ($row = $rs->FetchNextObject(false))

		        	 $vendor = $row->flag;

	        }else if ($modul == "DAKEM"){

		    		$rs = $db->execute("select flag from spro where kode_spro = 'VENDORDKM' and kode_lokasi ='99'");

		        if ($row = $rs->FetchNextObject(false))

		        	 $vendor = $row->flag;

	        }

	        $rs = $db->execute("select kode_vendor

	            						from glsap a 

	            						where a.no_bukti = '$nobukti' and  modul = '$modul' and kode_vendor <> '-' and not kode_vendor is null ");

	        if ($row = $rs->FetchNextObject(false))

		        	 $vendor = $row->kode_vendor;

	        $first = true;

	       	$header = json_decode(json_encode($header));

	        {

	        		if ($modul == "IFREIM" || $modul =='DAKEM'){

	        			$rs = $db->execute("select a.keterangan, convert(varchar,a.tanggal,112) as tgl, 

	            							convert(varchar,a.tanggal,112) as tgl_post, c.sap_user, c.sap_pwd

	            							, a.kode_akun, a.kode_pp, a.nilai, a.dc, kode_vendor, kode_cust, a.kode_task, a.paymetod

	            						from glsap a 

	            						inner join hakakses c on c.nik = a.nik_user 

	            						where a.no_bukti = '$nobukti' ");

	        	}else if ($modul == "PH"){

	        		$rs = $db->execute("select distinct a.no_bukti

	            						from glsap a 

	            						inner join sap_app_m b on b.no_bukti = a.no_dokumen and b.no_flag = '-'

	            						inner join hakakses c on c.nik = b.nik_user 

	            						where a.no_dokumen = '$nobukti' and a.no_doksap ='-' ");

	            						

	             

	             while ($row = $rs->FetchNextObject(false)){

	             			$ret = 	$this->postPH2SAP($row->no_bukti, "PH");

	             			if (is_array($ret)){

	             				return $ret;

	             			}	

	             			

	             }

	             return "Selesai proses posting $nobukti";

	        	}else

	            $rs = $db->execute("select a.keterangan, convert(varchar,a.tanggal,112) as tgl, 

	            							convert(varchar,a.tanggal,112) as tgl_post, c.sap_user, c.sap_pwd

	            							, a.kode_akun, a.kode_pp, a.nilai, a.dc, kode_vendor, kode_cust, a.kode_task, a.paymetod

											, a.periode

	            						from glsap a 

	            						inner join sap_app_m b on b.no_bukti = a.no_bukti and b.no_flag = '-'

	            						inner join hakakses c on c.nik = b.nik_user 

	            						where a.no_bukti = '$nobukti'  ");

	            $itemJurnal = array();

	            //Production 2 digit

	            $nilai = 0;

	            $dataRelease = array();

	            

	            while ($row = $rs->FetchNextObject(false)){

	            	error_log(json_encode($row));

	            	if ($first){

	            		 $header = array("ket" => $nobukti ." => ". $row->keterangan,

	        									"tgl" => $row->tgl,

	        									"tglpost" => $row->tgl_post,

												"doc_type" => "SA",

												"no_bukti" => $nobukti,
												"periode" => $row->periode

													        								

	        					);

	        					$tahun = substr($row->tgl,0,4);

	        					$user = $row->sap_user;

	            			$pwd = $row->sap_pwd;

	        					$first = false;

	            	}

	            	$pp = substr($row->kode_pp,1,5);

	            	$ba = "KS0" . substr($row->kode_pp,1,1);

	            	$vendor = $row->kode_vendor; 

	            	$cust = $row->kode_cust;

	            	$payment = $row->paymetod;

	            	$payment_blok = "";

	            	if ($payment == "E")

	            		$payment_blok = "A";

	            	if ($payment == "-"){

	            		$payment = "";

	            		$payment_blok = "";

	            	}

	            		

	            	if ( substr($row->kode_pp,0,2) == "99")

	            		$ba = "KS00";

	            		/*

	            		if ( ($modul == "IFREIM" || $modul == 'DAKEM')&& $row->dc == "D")

	            		  $item = array("tipe" => "GL",

	            								"akun" =>"00".$row->kode_akun,

	            								"ket" => $row->keterangan, 

	            								"nilai" => floatval($row->nilai), 

	            								"dc" => $row->dc, 

	            								"ba" => $ba, 

	            								"cc" => $pp, 

	            								"drk" => "");

	            	else */

	            	if ($vendor != "-" && $vendor != "")

	            			 $item = array("tipe" => "VENDOR",

	            								"akun" => $vendor,

	            								"ket" => $row->keterangan, 

	            								"nilai" => ($row->nilai), 

	            								"dc" => $row->dc, 

	            								"ba" => $ba, 

	            								"sp_gl" => $row->kode_task,

	            								"cc" => $cc, 

	            								"payment" => $payment,

	            								"payment_blok" => $payment_blok,

	            								"drk" => "");

	            	else if ($cust != "-" && $cust != "")

	            			 $item = array("tipe" => "CUST",

	            								"akun" => $cust,

	            								"ket" => $row->keterangan, 

	            								"nilai" => ($row->nilai), 

	            								"dc" => $row->dc, 

	            								"sp_gl" => $row->kode_task,

	            								"ba" => $ba, 

	            								"cc" => $cc, 

	            								"payment" => $payment,

	            								"payment_blok" => $payment_blok,

	            								"drk" => "");

	            	else {

	            		$item = array("tipe" => "GL",

	            								"akun" =>"00".$row->kode_akun,

	            								"ket" => $row->keterangan, 

	            								"nilai" => ($row->nilai), 

	            								"dc" => $row->dc, 

	            								"sp_gl" => $row->kode_task,

	            								"ba" => $ba, 

	            								"cc" => $pp, 

	            								"drk" => "");

	            		//$dataRelease[] = $row;

	            	}

	            		

	            	if ($row->dc == "D" && substr($row->kode_akun,0,1) == "5" && ( substr($row->kode_akun,0,4) != '5107' && $row->kode_akun != '61010204') ) {

	            		$dataRelease[] = $row;

	            	}

	            	//if ($row->dc == "D" && substr($row->kode_akun,0,1) == "5"){

	            	//	$dataRelease[] = $row;

	            	//}

	            	$itemJurnal[] = $item;

	            	

	            	$nilai += floatval($row->nilai);

	            }

	            if ($modul == "IFREIM"){

	            	$header["doc_type"] = "KR";

		            /*

		            $itemJurnal[] = array("tipe" => "VENDOR",

		            											"akun" => $vendor, 

		            											"ket" => "Vendor IF", 

		            											"nilai" => $nilai, 

		            											"dc" => "C", 

		            											"ba" => "", 

		            											"cc" => "", 

		            											"drk" =>"");

		            											*/

		          }

		          $header = json_decode(json_encode($header));

	            //error_log(json_encode($itemJurnal));	

	            $itemJurnal = json_decode(json_encode($itemJurnal));

				error_log($nobukti .":".$user .":".md5($pwd) );

	            if (count($dataRelease) > 0){

	           	 		$post = $this->releaseSAP($dataRelease, $tahun, $user, $pwd);

	            		error_log(json_encode($post));

	            }

	            error_log("header => " . json_encode($header));

	            $nodoc = $this->postJU2SAP($header, $itemJurnal);

	            error_log(json_encode($nodoc));

	            if (!is_array($nodoc)){

	            	$db->execute("update glsap set no_doksap = '$nodoc' where no_bukti = '$nobukti'");

	            }else return json_encode($nodoc);

	            return $nodoc;

	        };//else return "Vendor tidak di temukan di SPRO";

	       }catch (Exception $e){

	        	error_log($e->getMessage());

	      }

    }

    function postPH2SAP($nobukti, $modul){

    	try{

    		  error_log($nobukti.":".$modul); 

	    		$db = $this->getDb();

	        $first = true;

	       	$header = json_decode(json_encode($header));

	        {

	        		$rs = $db->execute("select a.keterangan, convert(varchar,a.tanggal,112) as tgl, 

	            							convert(varchar, a.tanggal,112) as tgl_post, c.sap_user, c.sap_pwd

	            							, a.kode_akun, a.kode_pp, a.nilai, a.dc, kode_vendor, kode_cust, kode_task, paymetod

											, a.periode

	            						from glsap a 

	            						inner join sap_app_m b on b.no_bukti = a.no_dokumen and b.no_flag = '-'

	            						inner join hakakses c on c.nik = b.nik_user 

	            						where a.no_bukti = '$nobukti' and a.no_doksap = '-' ");

	        	  $itemJurnal = array();

	            //Production 2 digit

	            $nilai = 0;

	            $dataRelease = array();

	            

	            while ($row = $rs->FetchNextObject(false)){

	            	error_log(json_encode($row));

	            	if ($first){

	            		 $header = array("ket" => $nobukti ." => ". $row->keterangan,

	        									"tgl" => $row->tgl,

	        									"tglpost" => $row->tgl_post,

														"doc_type" => "SA",

														"no_bukti" => $nobukti,
														"periode" => $row->periode

													        								

	        					);

	        					$tahun = substr($row->tgl,0,4);

	        					$user = $row->sap_user;

	            			$pwd = $row->sap_pwd;

	        					$first = false;

	            	}

	            	$pp = substr($row->kode_pp,1,5);

	            	$ba = "KS0" . substr($row->kode_pp,1,1);

	            	$vendor = $row->kode_vendor; 

	            	$cust = $row->kode_cust;

	            	$payment = $row->paymetod;

	            	$payment_blok = "";

	            	if ($payment == "E")

	            		$payment_blok = "A";

	            	if ($payment == "-"){

	            		$payment = "";

	            		$payment_blok = "";

	            	}

	            	if ( substr($row->kode_pp,0,2) == "99")

	            		$ba = "KS00";

	            		/*

	            		if ( ($modul == "IFREIM" || $modul == 'DAKEM')&& $row->dc == "D")

	            		  $item = array("tipe" => "GL",

	            								"akun" =>"00".$row->kode_akun,

	            								"ket" => $row->keterangan, 

	            								"nilai" => floatval($row->nilai), 

	            								"dc" => $row->dc, 

	            								"ba" => $ba, 

	            								"cc" => $pp, 

	            								"drk" => "");

	            	else */

	            	if ($vendor != "-" && $vendor != "")

	            			 $item = array("tipe" => "VENDOR",

	            								"akun" => $vendor,

	            								"ket" => $row->keterangan, 

	            								"nilai" => ($row->nilai), 

	            								"dc" => $row->dc, 

	            								"sp_gl" => $row->kode_task,

	            								"ba" => $ba, 

	            								"cc" => $cc, 

	            								"payment" => $payment,

	            								"payment_blok" => $payment_blok,

	            								"drk" => "");

	            	else if ($cust != "-" && $cust != "")

	            			 $item = array("tipe" => "CUST",

	            								"akun" => $cust,

	            								"ket" => $row->keterangan, 

	            								"nilai" => ($row->nilai), 

	            								"dc" => $row->dc, 

	            								"sp_gl" => $row->kode_task,

	            								"ba" => $ba, 

	            								"payment" => $payment,

	            								"payment_blok" => $payment_blok,

	            								"cc" => $cc, 

	            								"drk" => "");

	            	else {

	            		$item = array("tipe" => "GL",

	            								"akun" =>"00".$row->kode_akun,

	            								"ket" => $row->keterangan, 

	            								"nilai" => ($row->nilai), 

	            								"dc" => $row->dc, 

	            								"sp_gl" => $row->kode_task,

	            								"ba" => $ba, 

	            								"cc" => $pp, 

	            								"drk" => "");

	            		//$dataRelease[] = $row;

	            	}

	            		

	            	if ($row->dc == "D" && substr($row->kode_akun,0,1) == '5' && ( substr($row->kode_akun,0,2) != '5101' && substr($row->kode_akun,0,2) != '5107' && $row->kode_akun != '61010204') ) {

	            		$dataRelease[] = $row;

	            	}

	            	$itemJurnal[] = $item;

	            	

	            	$nilai += floatval($row->nilai);

	            }

	            if ($modul == "IFREIM"){

	            	$header["doc_type"] = "KR";

		            /*

		            $itemJurnal[] = array("tipe" => "VENDOR",

		            											"akun" => $vendor, 

		            											"ket" => "Vendor IF", 

		            											"nilai" => $nilai, 

		            											"dc" => "C", 

		            											"ba" => "", 

		            											"cc" => "", 

		            											"drk" =>"");

		            											*/

		          }

		          $header = json_decode(json_encode($header));

	            //error_log(json_encode($itemJurnal));	

	            $itemJurnal = json_decode(json_encode($itemJurnal));

	            error_log($nobukti .":".$user .":".md5($pwd));

	            $post = $this->releaseSAP($dataRelease, $tahun, $user, $pwd);

	            error_log(json_encode($post));

	            error_log("header => " . json_encode($header));

	            $nodoc = $this->postJU2SAP($header, $itemJurnal);

	            error_log(json_encode($nodoc));

	            if (!is_array($nodoc)){

	            	$db->execute("update glsap set no_doksap = '$nodoc' where no_bukti = '$nobukti'");

	            }else return ($nodoc);

	            return $nodoc;

	        };//else return "Vendor tidak di temukan di SPRO";

	       }catch (Exception $e){

	        	error_log($e->getMessage());

	      }

    }

    function postJU2SAP($header, $itemJurnal){

    	try{

    	/*

*/

        $db = $this->getDb();

        

        $rs = $db->execute("select flag, keterangan from spro where kode_spro = 'SAPUSER'");

        

        if ($row = $rs->FetchNextObject(false)){

            $user = $row->flag;

            $pass = $row->keterangan;

        }

		 error_log($user .":". md5($pass) . ":");

        //s$userLogin = $header->userlog;

        

        $login = new server_util_Map();

				$login->set("user", $user);

				$login->set("passwd", $pass);

        error_log("siap posting");

        $this->rfc = new server_util_rfcLib("rra/sapyks");

        

				$sapImp = new server_util_Map(array(

															"IM_ACCHD" => array ("ACC_PRINCIPLE"=>"","RLDNR"=>"","LDGRP"=>"","NOSPLIT"=>"","GLPROCESS"=>"","GLPROCVAR"=>"","EXCLUDE_FLAG"=>"","PSOTY"=>"","PSOAK"=>"","PSOKS"=>"","PSOSG"=>"","PSOFN"=>"","INTFORM"=>"","INTDATE"=>"","PSOBT"=>"","PSOZL"=>"","PSODT"=>"","PSOTM"=>"","DBBLG"=>"","PROPMANO"=>""),

                          		"IM_CONTRACTHEADER" => array ("DOC_NO"=>"","DOC_TYPE_CA"=>"","RES_KEY"=>"","FIKEY"=>"","PAYMENT_FORM_REF"=>""),

															"IM_CUSTOMERCPD" => array ("NAME"=>"","NAME_2"=>"","NAME_3"=>"","NAME_4"=>"","POSTL_CODE"=>"","CITY"=>"","COUNTRY"=>"","COUNTRY_ISO"=>"","STREET"=>"","PO_BOX"=>"","POBX_PCD"=>"","POBK_CURAC"=>"","BANK_ACCT"=>"","BANK_NO"=>"","BANK_CTRY"=>"","BANK_CTRY_ISO"=>"","TAX_NO_1"=>"","TAX_NO_2"=>"","TAX"=>"","EQUAL_TAX"=>"","REGION"=>"","CTRL_KEY"=>"","INSTR_KEY"=>"","DME_IND"=>"","LANGU_ISO"=>"","IBAN"=>"","SWIFT_CODE"=>"","TAX_NO_3"=>"","TAX_NO_4"=>""),

                          		"IM_DOCUMENTHEADER" => array ("OBJ_TYPE"=>"",

                          															"OBJ_KEY"=>"",

                          															"OBJ_SYS"=>"",

                          															"BUS_ACT"=>"RFBU",

                          															"USERNAME"=>$user,

                          															"HEADER_TXT"=>$header->ket,

                          															"COMP_CODE"=>"YKES",

                          															"DOC_DATE"=>$header->tgl,

                          															"PSTNG_DATE"=>$header->tglpost,

                          															"TRANS_DATE"=>$header->tglpost,

                          															"FISC_YEAR"=>substr($header->periode,0,4),

                          															"FIS_PERIOD"=>substr($header->periode,4,2),

                          															"DOC_TYPE"=>$header->doc_type,

                          															"REF_DOC_NO"=>$header->no_bukti,

                          															"AC_DOC_NO"=>"","OBJ_KEY_R"=>"","REASON_REV"=>"",

                          															"COMPO_ACC"=>"","REF_DOC_NO_LONG"=>"",

                          															"ACC_PRINCIPLE"=>"","NEG_POSTNG"=>"",

                          															"OBJ_KEY_INV"=>"","BILL_CATEGORY"=>"","VATDATE"=>""),

                          "IM_PARK" => "",

                          "IM_TCODE" => "",

                          "TCODE" => "",   

					));

				$dataGL = new server_util_arrayList();

		    $dataAR = new server_util_arrayList();

		    $dataAmount = new server_util_arrayList();

				$dataAP = new server_util_arrayList();

				$no_urut = 0;

        foreach ($itemJurnal as $val){

            $akun = $val->akun;

            $ket = $val->ket;

            $nilai = $val->nilai;

            

            $ba = $val->ba;

            $cc = $val->cc;

            $activity = $val->drk;

            $dc = $val->dc;

            $no_urut++;

            $spec_gl = $val->sp_gl;

            if ($spec_gl == "-")

            	$spec_gl = "";

            	

            if ($dc == "C")

                $nilai = "-" . $nilai;

            if (strtoupper($val->tipe) == "GL"){

            		$pc = $cc;

            	  if (substr($akun,0,3) == "005"){

            	  	 $pc = $cc;

            	  }

            	  

            	  $dataGL->add(array ("ITEMNO_ACC"=>$this->formatNumber($no_urut),

                										"GL_ACCOUNT"=>$akun,

                										"ITEM_TEXT"=>$ket,

                										"STAT_CON"=>"",

                										"LOG_PROC"=>"",

                										"AC_DOC_NO"=>"",

                										"REF_KEY_1"=>"",

                										"REF_KEY_2"=>"",

                										"REF_KEY_3"=>"",

                										"ACCT_KEY"=>"",

                										"ACCT_TYPE"=>"",

                										"DOC_TYPE"=>"",

                										"COMP_CODE"=>"YKES",

                										"BUS_AREA"=>$ba,

                										"FUNC_AREA"=>"",

                										"PLANT"=>"",

                										"FIS_PERIOD"=>"",

                										"FISC_YEAR"=>"",

                										"PSTNG_DATE"=>$header->tglpost,

                										"VALUE_DATE"=>"",

                										"FM_AREA"=>"",

                										"CUSTOMER"=>"",

                										"CSHDIS_IND"=>"",

                										"VENDOR_NO"=>"",

                										"ALLOC_NMBR"=>"",

                										"TAX_CODE"=>"",

                										"TAXJURCODE"=>"",

                										"EXT_OBJECT_ID"=>"",

                										"BUS_SCENARIO"=>"",

                										"COSTOBJECT"=>"",

                										"COSTCENTER"=>"00000" . $cc,

                										"ACTTYPE"=>"",

                										"PROFIT_CTR"=>"",

                										"PART_PRCTR"=>"",

                										"NETWORK"=>"",

                										"WBS_ELEMENT"=>"",

                										"ORDERID"=>"",

                										"ORDER_ITNO"=>"",

                										"ROUTING_NO"=>"",

                										"ACTIVITY"=>"",

                										"COND_TYPE"=>"",

                										"COND_COUNT"=>"",

                										"COND_ST_NO"=>"",

                										"FUND"=>"",

                										"FUNDS_CTR"=>"",

                										"CMMT_ITEM"=>"",

                										"CO_BUSPROC"=>"",

                										"ASSET_NO"=>"",

                										"SUB_NUMBER"=>"",

                										"BILL_TYPE"=>"",

                										"SALES_ORD"=>"",

                										"S_ORD_ITEM"=>"",

                										"DISTR_CHAN"=>"",

                										"DIVISION"=>"",

                										"SALESORG"=>"",

                										"SALES_GRP"=>"",

                										"SALES_OFF"=>"",

                										"SOLD_TO"=>"",

                										"DE_CRE_IND"=>"",

                										"P_EL_PRCTR"=>"",

                										"XMFRW"=>"",

                										"QUANTITY"=>"",

                										"BASE_UOM"=>"",

                										"BASE_UOM_ISO"=>"",

                										"INV_QTY"=>"",

                										"INV_QTY_SU"=>"",

                										"SALES_UNIT"=>"",

                										"SALES_UNIT_ISO"=>"",

                										"PO_PR_QNT"=>"",

                										"PO_PR_UOM"=>"",

                										"PO_PR_UOM_ISO"=>"",

                										"ENTRY_QNT"=>"",

                										"ENTRY_UOM"=>"",

                										"ENTRY_UOM_ISO"=>"",

                										"VOLUME"=>"",

                										"VOLUMEUNIT"=>"",

                										"VOLUMEUNIT_ISO"=>"","GROSS_WT"=>"","NET_WEIGHT"=>"","UNIT_OF_WT"=>"","UNIT_OF_WT_ISO"=>"","ITEM_CAT"=>"","MATERIAL"=>"","MATL_TYPE"=>"","MVT_IND"=>"",

                										"REVAL_IND"=>"","ORIG_GROUP"=>"","ORIG_MAT"=>"","SERIAL_NO"=>"","PART_ACCT"=>"",

                										"TR_PART_BA"=>"","TRADE_ID"=>"","VAL_AREA"=>"","VAL_TYPE"=>"",

                										"ASVAL_DATE"=>"","PO_NUMBER"=>"","PO_ITEM"=>"","ITM_NUMBER"=>"",

                										"COND_CATEGORY"=>"","FUNC_AREA_LONG"=>"","CMMT_ITEM_LONG"=>"",

                										"GRANT_NBR"=>"","CS_TRANS_T"=>"","MEASURE"=>"","SEGMENT"=>"",

                										"PARTNER_SEGMENT"=>"","RES_DOC"=>"","RES_ITEM"=>"",

                										"BILLING_PERIOD_START_DATE"=>"","BILLING_PERIOD_END_DATE"=>"",

                										"PPA_EX_IND"=>"","FASTPAY"=>"","PARTNER_GRANT_NBR"=>"","BUDGET_PERIOD"=>"",

                										"PARTNER_BUDGET_PERIOD"=>"","PARTNER_FUND"=>"","ITEMNO_TAX"=>""));

                $dataAmount->add(array ("ITEMNO_ACC"=>$this->formatNumber($no_urut),

                												"CURR_TYPE"=>"",

                												"CURRENCY"=>"IDR",

                												"CURRENCY_ISO"=>"",

                												"AMT_DOCCUR"=>$nilai,

                												"EXCH_RATE"=>"",

                												"EXCH_RATE_V"=>"",

                												"AMT_BASE"=>"","DISC_BASE"=>"","DISC_AMT"=>"","TAX_AMT"=>""));

            }else if (strtoupper($val->tipe) == "VENDOR"){

                $vendor = sprintf("%010d", $val->akun);

                $dataAP->add(array ("ITEMNO_ACC"=>$this->formatNumber($no_urut),

                										"VENDOR_NO"=>$vendor,

                										"GL_ACCOUNT"=>"",

                										"REF_KEY_1"=>"","REF_KEY_2"=>"","REF_KEY_3"=>"",

                										"COMP_CODE"=>"",

                										"BUS_AREA"=> $ba,"PMNTTRMS"=>"T001",

                										"BLINE_DATE"=>"","DSCT_DAYS1"=>"",

                										"DSCT_DAYS2"=>"","NETTERMS"=>"",

                										"DSCT_PCT1"=>"","DSCT_PCT2"=>"",

                										"PYMT_METH"=>$val->payment,

                										"PMTMTHSUPL"=>"",

                										"PMNT_BLOCK"=>$val->payment_blok,

                										"SCBANK_IND"=>"",

                										"SUPCOUNTRY"=>"",

                										"SUPCOUNTRY_ISO"=>"",

                										"BLLSRV_IND"=>"",

                										"ALLOC_NMBR"=>"",

                										"ITEM_TEXT"=>$ket,

                										"PO_SUB_NO"=>"",

                										"PO_CHECKDG"=>"",

                										"PO_REF_NO"=>"",

                										"W_TAX_CODE"=>"",

                										"BUSINESSPLACE"=>"",

                										"SECTIONCODE"=>"",

                										"INSTR1"=>"",

                										"INSTR2"=>"",

                										"INSTR3"=>"",

                										"INSTR4"=>"",

                										"BRANCH"=>"",

                										"PYMT_CUR"=>"",

                										"PYMT_AMT"=>"","PYMT_CUR_ISO"=>"",

                										"SP_GL_IND"=> $spec_gl,"TAX_CODE"=>"","TAX_DATE"=>"",

                										"TAXJURCODE"=>"","ALT_PAYEE"=>"",

                										"ALT_PAYEE_BANK"=>"",

                										"PARTNER_BK"=>"R001","BANK_ID"=>"",

                										"PARTNER_GUID"=>"","PROFIT_CTR"=>"","FUND"=>"",

                										"GRANT_NBR"=>"","MEASURE"=>"",

                										"HOUSEBANKACCTID"=>"","BUDGET_PERIOD"=>"","PPA_EX_IND"=>""));

                										

                $dataAmount->add(array ("ITEMNO_ACC"=>$this->formatNumber($no_urut),

                												"CURR_TYPE"=>"",

                												"CURRENCY"=>"IDR",

                												"CURRENCY_ISO"=>"",

                												"AMT_DOCCUR"=> $nilai,

                												"EXCH_RATE"=>"","EXCH_RATE_V"=>"",

                												"AMT_BASE"=>"","DISC_BASE"=>"","DISC_AMT"=>"","TAX_AMT"=>""));

            }else if (strtoupper($val->tipe) == "CUST"){

                $cust = sprintf("%010d", $val->akun);

                $dataAR->add(array ("ITEMNO_ACC"=>$this->formatNumber($no_urut),

                										"CUSTOMER"=>$cust,

                										"GL_ACCOUNT"=>"",

                										"REF_KEY_1"=>"","REF_KEY_2"=>"","REF_KEY_3"=>"",

                										"COMP_CODE"=>"",

                										"BUS_AREA"=>$ba, "PMNTTRMS"=>"T001",

                										"BLINE_DATE"=>"", "DSCT_DAYS1"=>"",

                										"DSCT_DAYS2"=>"", "NETTERMS"=>"",

                										"DSCT_PCT1"=>"", "DSCT_PCT2"=>"",

                										"PYMT_METH"=>$val->payment, 

                										"PAYMT_REF"=>"",

                										"PMTMTHSUPL"=>"","DUNN_KEY"=> "","DUNN_BLOCK" => "",

                										"PMNT_BLOCK"=>$val->payment_blok,"VAT_REG_NO" =>"","ALLOC_NMBR"=> "",

                										"ITEM_TEXT" => $ket,

																		"PARTNER_BK" => "",

																		"SCBANK_IND" => "",

																		"BUSINESSPLACE" => "",

																		"SECTIONCODE" => "",

																		"BRANCH" => "",

																		"PYMT_CUR" => "",

																		"PYMT_CUR_ISO" => "",

																		"PYMT_AMT" => "",

																		"C_CTR_AREA" => "",

																		"BANK_ID" => "",

																		"SUPCOUNTRY" => "",

																		"SUPCOUNTRY_ISO" => "",

																		"TAX_CODE" => "",

																		"TAXJURCODE" => "",

																		"TAX_DATE" => "",

																		"SP_GL_IND" => $spec_gl,

																		"PARTNER_GUID" => "",

																		"ALT_PAYEE" => "",

																		"ALT_PAYEE_BANK" => "",

																		"DUNN_AREA" => "",

																		"CASE_GUID" => "",

																		"PROFIT_CTR" => "",

																		"FUND" => "",

																		"GRANT_NBR" => "",

																		"MEASURE" => "",

																		"HOUSEBANKACCTID" => "",

																		"RES_DOC" => "",

																		"RES_ITEM" => "",

																		"FUND_LONG" => "",

																		"DISPUTE_IF_TYPE" => "",

																		"BUDGET_PERIOD" => ""));

																		

                $dataAmount->add(array ("ITEMNO_ACC"=>$this->formatNumber($no_urut),

                												"CURR_TYPE"=>"",

                												"CURRENCY"=>"IDR",

                												"CURRENCY_ISO"=>"",

                												"AMT_DOCCUR"=> $nilai,

                												"EXCH_RATE"=>"","EXCH_RATE_V"=>"",

                												"AMT_BASE"=>"","DISC_BASE"=>"","DISC_AMT"=>"","TAX_AMT"=>""));

            }

        }

				

        $sapExpTable = new server_util_Map(array("T_LOGFAILED","T_RETURN","EX_OBJ_TYPE","EX_OBJ_KEY","EX_OBJ_SYS"));

				$sapImpTable = new server_util_Map(array("T_ACCOUNTGL" => $dataGL,

																									"T_ACCOUNTPAYABLE" => $dataAP,

																									"T_ACCOUNTRECEIVABLE" => $dataAR,

																									"T_ACCOUNTTAX" => null,

																									"T_ACCOUNTWT" => null,

																									"T_CONTRACTITEM" => null,

																									"T_CRITERIA" => null,

																									"T_CURRENCYAMOUNT" => $dataAmount,

																									"T_EXTENSION1" => null,

																									"T_EXTENSION2" => null,

																									"T_PAYMENTCARD" => null,

																									"T_REALESTATE" => null,

																									"T_VALUEFIELD" => null));

				//error_log("Post o sap....");

				error_log("AP ". print_r($dataAP->getArray(), true));

				error_log("AR ". print_r($dataAR->getArray(), true));	

				error_log("GL ". print_r($dataGL->getArray(), true));	

				

				error_log("AMOUNT ". print_r($dataAmount->getArray(), true));			

				$ret = $this->rfc->callRFCToJSON($login,"ZFMFI_BAPI_ACC_DOCUMENT_POST", $sapImp, $sapExpTable, $sapImpTable, null, true);

				error_log("Data Ret " . print_r($ret->getArray(), true));

				if (count($ret->get("T_LOGFAILED")) > 0){

						return $ret->get("T_LOGFAILED");

				}else {

					//error_log(json_encode($ret->get("T_RETURN")));

	        $doc = $ret->get("T_RETURN");

	        $doc = $doc[0]["MESSAGE_V2"];

	        //error_log("DOC YAKES " . $doc);

	        //$pos = strpos("YKES", $doc);

	        //$doc = substr($doc, 0, $pos );

	        return $doc;

	        }

        }catch(Exception $e){

        	error_log($e->getMessage());

        }

    }

	  function download($data, $title){

		$this->cleanUp();

		uses("server_modules_codeplex_PHPExcel",false);

		$objPHPExcel = new PHPExcel();

 

 

		// Set document properties

		$objPHPExcel->getProperties()->setCreator("PT TELKOM ")

						 ->setLastModifiedBy("MA")

						 ->setTitle($title)

						 ->setSubject("RKAP")

						 ->setDescription("Data CPE")

						  ->setKeywords("Data CPE")

							 ->setCategory("CPE");

 

 

		// Add Data in your file

 

		$objPHPExcel->setActiveSheetIndex(0);

		$sharedStyle1 = new PHPExcel_Style();

		$sharedStyle1->applyFromArray(

			array('fill' 	=> array(

										'type'		=> PHPExcel_Style_Fill::FILL_SOLID,

										'color'		=> array('argb' => 'FFCCFFCC')

									),

				  'borders' => array(

										'bottom'	=> array('style' => PHPExcel_Style_Border::BORDER_THIN),

										'right'		=> array('style' => PHPExcel_Style_Border::BORDER_THIN)

									)

				 ));

		$row = 1;

		$first = true;

		$sheet = $objPHPExcel->getActiveSheet();

		foreach ($data as $val){

			$line = (array) $val;

			if ($first){

				//write col title

				$col = 0;

				foreach ($line as $key => $value){	

					$sheet->setCellValueByColumnAndRow($col, $row, $key);

					$col++;

				}

				$end = PHPExcel_Cell::stringFromColumnIndex($col-1);

				$sheet->setSharedStyle($sharedStyle1,"A1:".$end."1");

				$row++;

			}

			$col = 0;

			foreach ($line as $key => $value){	

				$sheet->setCellValueByColumnAndRow($col, $row, $value);

				$col++;

			}

			$row++;

			$first = false;

		}

	

		// Rename worksheet

		$objPHPExcel->getActiveSheet()->setTitle($title);

 

 

		// Set active sheet index to the first sheet, so Excel opens this as the first sheet

		$objPHPExcel->setActiveSheetIndex(0);

 

 

		// Save Excel 2007 file

		$namafile = MD5(date("r"));

 		global $serverDir;

 		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel2007');

		$objWriter->save($serverDir . "/tmp/$namafile.xlsx");

		$callEndTime = microtime(true);

		$callTime = $callEndTime - $callStartTime;

 

		return "/tmp/$namafile.xlsx";

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

    function deleteFileTemp($listFile, $listFileTmp){

        foreach ($listFile as $file){

            error_log("delete file server/media/$file");

            unlink("server/media/$file");

        }

        foreach ($listFileTmp as $file){

            error_log("delete file server/tmp/$file");

            unlink("server/tmp/$file");

        }

        

    }

}

?>