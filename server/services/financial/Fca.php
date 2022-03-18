<?php

// uses("server_DBConnection_dbLib");
// uses("server_util_arrayList");
// uses("server_util_Map");
// uses("server_util_rfc");
// uses("server_util_rfcLib");
// uses("server_BasicObject");
// uses("server_util_AddOnLib");
// uses("server_util_rfcLib");
// date_default_timezone_set("Asia/Jakarta");
// uses("server_DBConnection_dbLib");
// uses("server_util_NodeNRC");
// uses("server_util_arrayList");
// uses("server_util_rfcLib");
// global $dbSetting;
// $dbSetting = "orarra";
uses("services_Services");


class services_financial_Fca extends services_Services{
	public $monthName = array("Jan","Feb","Mar","Apr","Mei","Jun","Jul","Agt","Sep","Okt","Nop","Des");
	
	function __construct()
	{
		parent::__construct();
		// $this->db = null;
		$this->db = $this->getDb();
	}
	
	function penyebut($nilai) {
		$nilai = abs($nilai);
		$huruf = array("", "satu", "dua", "tiga", "empat", "lima", "enam", "tujuh", "delapan", "sembilan", "sepuluh", "sebelas");
		$temp = "";
		if ($nilai < 12) {
			$temp = " ". $huruf[$nilai];
		} else if ($nilai <20) {
			$temp = $this->penyebut($nilai - 10). " belas";
		} else if ($nilai < 100) {
			$temp = $this->penyebut($nilai/10)." puluh". $this->penyebut($nilai % 10);
		} else if ($nilai < 200) {
			$temp = " seratus" . $this->penyebut($nilai - 100);
		} else if ($nilai < 1000) {
			$temp = $this->penyebut($nilai/100) . " ratus" . $this->penyebut($nilai % 100);
		} else if ($nilai < 2000) {
			$temp = " seribu" . $this->penyebut($nilai - 1000);
		} else if ($nilai < 1000000) {
			$temp = $this->penyebut($nilai/1000) . " ribu" . $this->penyebut($nilai % 1000);
		} else if ($nilai < 1000000000) {
			$temp = $this->penyebut($nilai/1000000) . " juta" . $this->penyebut($nilai % 1000000);
		} else if ($nilai < 1000000000000) {
			$temp = $this->penyebut($nilai/1000000000) . " milyar" . $this->penyebut(fmod($nilai,1000000000));
		} else if ($nilai < 1000000000000000) {
			$temp = $this->penyebut($nilai/1000000000000) . " trilyun" . $this->penyebut(fmod($nilai,1000000000000));
		}     
		return $temp;
	}
 
	function terbilang($nilai) {
		if($nilai<0) {
			$hasil = "minus ". trim($this->penyebut($nilai));
		} else {
			$hasil = trim($this->penyebut($nilai));
		}     		
		return $hasil;
	}
 
	
	// function __construct()
	// {
	// 	$this->db = null;
	// 	// $this->db = $this->getDb("oracle");
	// }
	
	
	
	// private function getDb()
	// {
	
	// 	if ($this->db == null)
	// 	{
	// 		$db = $this->getDb("oracle");
	// 	}
		
	// 	return $this->db;
	// }
	function login($user, $pwd){
		try{
			global $ldaphost;
			$result = array("userdata" => "", "type" => 0, "msg" => "","periode" => "", "serverinfo" => array(),"portalinfo" =>array());
			
			
			$auth = $this->db->LDAP_auth($user, $pwd, $ldaphost);	
			session_regenerate_id();  	
			if ($auth == 1){//$auth == 1
				$rs = $this->db->db->execute("select  a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok 
									, c.kode_ubis, d.kode_induk, c.kode_kota, c.kode_ba, c.kode_cc, c.status  
							from fca_hakakses a 
								inner join exs_lokasi b on b.kode_lokasi = a.kode_lokasi 
								inner join fca_karyawan c on c.nik = a.nik and c.kode_lokasi = a.kode_lokasi 
								inner join (select kode_ubis, nama, kode_lokasi, kode_induk from exs_ubis union select kode_cc, nama, kode_lokasi, kode_induk from exs_cc) d on d.kode_ubis = c.kode_ubis and d.kode_lokasi = a.kode_lokasi 
							where a.nik= '$user' ");
						
				if ($row = $rs->FetchNextObject(false))
				{
					$result["userdata"] = (array) $row;
					$menu = $this->getMenu($row->kode_klp_menu);
					$result["userdata"]["menu"] = $menu;
				}else {
					$result["msg"] = "User Profile tidak ditemukan di BPC";		
				 	$result["type"] = 1;
				 	throw new Exception("User Profile tidak ditemukan di BPC");
				}
					
				$loginOk = true;
				//$this->sendMail("","650882@telkom.co.id", "Akun $user login",  "login RKAP");
			}else {
				 $rs = $this->db->execute("select  a.kode_klp_menu, a.nik, a.nama, a.pass, a.status_admin, a.klp_akses, a.kode_lokasi,b.nama as nmlok 
									, c.kode_ubis, d.kode_induk, c.kode_kota, c.kode_ba, c.kode_cc, c.status  
							from fca_hakakses a 
								inner join exs_lokasi b on b.kode_lokasi = a.kode_lokasi 
								inner join fca_karyawan c on c.nik = a.nik and c.kode_lokasi = a.kode_lokasi 
								inner join (select kode_ubis, nama, kode_lokasi, kode_induk from exs_ubis union select kode_cc, nama, kode_lokasi, kode_induk from exs_cc) d on d.kode_ubis = c.kode_ubis and d.kode_lokasi = a.kode_lokasi 
							where a.nik= '$user' ");
					
				 if ($row = $rs->FetchNextObject(false)){
					if ($row->pass == $pwd){
						$result["userdata"] = (array) $row;
						$menu = $this->getMenu($row->kode_klp_menu);
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
				//$_SESSION["pass"] = $pass;
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
				$this->db->execute("insert into bpc_sessions(username, tgl, tgl_logout,last_update, sessions)
									values('$user',sysdate, sysdate,sysdate, '$session')");
			}
			
			
		}catch(Exception $e){
			$result["msg"] = $e->getMessage();		
			$result["type"] = 1;
		}
		// error_log(json_encode($result));
		return $result;
	}
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
				 from exs_menu a 
				left outer join exs_m_form b on b.kode_form = a.kode_form
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
	function loadMenu($kodeMenu){
		$this->getDb();
		// $this->sdb("oracle"); 
		$result = array();		
		$rs = $this->db->execute("select a.*, b.form 
		from exs_menu a left outer join exs_m_form b on b.kode_Form = a.kode_form 
		where kode_klp='$kodeMenu' order by rowindex");
		while ($row = $rs->FetchNextObject(false)){
			$result[] = (array)$row;
		}
		return $result;
	}
    function getNoBuktiOtomatis($table, $field, $format, $formatNumber, $addFilter = null, $reverse = null){
				$db = $this->getDb();
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
    // function getListVendor($vendor, $offset){
	// 	$this->getDb();
	// 	$sql = "select kode_vendor, nama_vendor from des_mitra where kode_vendor like '$vendor%' or nama_vendor like '%$vendor%' order by nama_vendor ";
	// 	$rs = $this->db->execute($sql, $offset, -1);
	// 	$result = array();
	// 	while ($row = $rs->FetchNextObject(false)){
	// 		$result[] = (array) $row;
	// 	}
	// 	return $result;
	// }
	// function getListCC($cc, $offset){
	// 	//$this->getDb();
    //     $db = new server_DBConnection_dbLib("orafinest");
	// 	$cc = strtolower($cc);
	// 	$sql = "select vendorsap as kode_vendor, vendorname as nama, npwp from cvendor where vendorsap like '$cc%' or lower(vendorname) like '%$cc%' order by vendorname ";
	// 	//error_log($sql);
	// 	$rs = $this->db->execute($sql, $offset, -1);
	// 	$result = array();
	// 	while ($row = $rs->FetchNextObject(false)){
	// 		$result[] = (array) $row;
	// 	}
	// 	return $result;
	// }
    // function getListBA($ubis, $offset){
	// 	$this->getDb();
	// 	$cc = strtolower($ubis);
	// 	$sql = "select kode_ubis, nama from exs_ubis where kode_ubis like '$ubis%' or lower(nama) like '%$ubis%' order by nama ";
	// 	//error_log($sql);
	// 	$rs = $this->db->execute($sql, $offset, -1);
	// 	$result = array();
	// 	while ($row = $rs->FetchNextObject(false)){
    //         $row->nama = $row->kode_ubis ." - ". $row->nama;
	// 		$result[] = (array) $row;
	// 	}
	// 	return $result;
	// }
    function addDokumen($mitra, $ba){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $nik = $_SESSION["username"];
        $rs = $db->execute("select kode_vendor from des_mitra where kode_vendor = '$mitra'");
        if ($row = $rs->FetchNextObject(false)){
            /*
            $db2 = new server_DBConnection_dbLib("orafinest");
            $rs2 = $db2->execute("select vendorname from cvendor where vendorsap = '$mitra'"); 
            if ($row = $rs2->FetchNextObject(false))
                $sql->add("insert into des_mitra (kode_vendor, nama) values('".$row->vendorsap."','".$row->vendorname."')");
            */
        }
        $sql->add("insert into fca_regdok(kode_vendor, kode_ubis, nik_user, tgl_input, status)values('$mitra', '$ba','$nik',now(), '0')" );
        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    
    function listDokumenByArea($area){
        $db = $this->getDb();
		$cc = strtolower($cc);
		$sql = "select a.reg_id, a.kode_vendor,'-' as vendor, c.nama_vendor, a.kode_ubis, a.tgl_input as tgl from fca_regdok a 
                        inner join fca_group b on b.kode_ba = a.kode_ubis 
                        inner join des_mitra c on c.kode_vendor = a.kode_vendor
                where a.status = '0' and b.klp like '$area%'";
		//error_log($sql);
		$rs = $db->execute($sql, $offset, -1);
		$result = array();
		while ($row = $rs->FetchNextObject(false)){
            $row->vendor = $row->kode_vendor ." - " . $row->nama_vendor;
			$result[] = (array) $row;
		}
		return $result;
    }
    function addTagihan($tagihan, $cekList){
        $db = $this->getDb();
        $sql = new server_util_arrayList();
        $nik = $_SESSION["username"];
        $periode = date("Ym");
        $nb = $this->getNoBuktiOtomatis("fca_tagihan","no_tagihan", $periode, "00000");
        $sql->add("insert into fca_tagihan(no_tagihan, REG_ID, KODE_VENDOR, NAMA_PROYEK, NO_KONTRAK, TGL_KONTRAK, NILAI_KONTRAK,
                NO_POSP,TGL_POSP,NILAI_POSP,NO_AMD,TGL_AMD,NILAI_AMD,
                NILAI_TAGIHAN,NILAI_BAYAR,NILAI_CURR, nilai_bayar_curr,
                CURR,curr_bayar, CURR_KONTRAK,CURR_PO,CURR_AMD,KETERANGAN,NO_SPB,
                NO_SAP,NIK_USER,TGL_INPUT,JENIS,STATUS)
                values
                ('$nb','".$tagihan->reg_id."','".$tagihan->kode_vendor."','".$tagihan->proyek."','".$tagihan->no_kontrak."','".$tagihan->tgl_kontrak."','".$tagihan->nilai_kontrak."',
                '".$tagihan->no_po."','".$tagihan->tgl_po."','".$tagihan->nilai_po."', '".$tagihan->no_amd."','".$tagihan->tgl_amd."','".$tagihan->nilai_amd."',
                '".$tagihan->nilai_tagihan."', '".$tagihan->nilai_bayar."', '".$tagihan->nilai_curr."', '".$tagihan->nilai_bayar_curr."',
                '".$tagihan->curr."', '".$tagihan->curr_bayar."','".$tagihan->curr_kontrak."','".$tagihan->curr_po."','".$tagihan->curr_amd."',
                '".$tagihan->keterangan."','-','".$tagihan->no_sap."','$nik', now(), '".$tagihan->jenis."','0'
                )");
        foreach($cekList as $item){
            $sql->add("insert into fca_check_dok(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5)values
                    ('$nb','".$item->jenis."','".$item->nu."','".$item->subno."','".$item->value1."','".$item->value2."','".$item->value3."','".$item->value4."','".$item->value5."')");
        }
        $sql->add("update fca_regdok set status = '1' where reg_id = '".$tagihan->reg_id."'");
        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function getListTagihan($nik){
        $db = $this->getDb();
		$sql = "select a.reg_id, a.no_tagihan, a.kode_vendor,'-' as vendor, c.nama_vendor, d.kode_ubis
                    , a.tgl_input as tgl ,
                    a.nama_proyek, a.no_kontrak, a.nilai_tagihan, a.nilai_bayar, a.keterangan
                    from fca_tagihan a 
                        inner join fca_regdok d on d.reg_id = a.reg_id
                        inner join fca_group b on b.kode_ba = d.kode_ubis 
                        inner join des_mitra c on c.kode_vendor = a.kode_vendor
                        inner join FCA_KARYAWAN e on  b.klp like concat(e.kode_cc,'%')
                where a.status = '0' and e.nik = '$nik'";
		//error_log($sql);
		$rs = $db->execute($sql, $offset, -1);
		$result = array();
		while ($row = $rs->FetchNextObject(false)){
            $row->vendor = $row->kode_vendor ." - " . $row->nama_vendor;
			$result[] = (array) $row;
		}
		return $result;
    }
    function approveTagihan($no_tagihan){
        $db = $this->getDb();
        $sql = new server_util_arrayList();    
        $sql->add("update fca_tagihan set status = '1' where no_tagihan ='$no_tagihan' ");
        $ret = $db->execArraySQL($sql);
        return $ret;
    }
    function getListNoSAP($vendor, $ba){
        $this->rfc = new server_util_rfcLib("rra/sap");
		$login = new server_util_Map();
		//query 
		$login->set("user", "ESSTELKOM");
		$login->set("passwd", "SIMTEL21");
        $sapImp = new server_util_Map(array(
								"COMPANYCODE" => "1000",
								"KEYDATE" => $tgl1,
								"NOTEDITEMS" => ""
								));
        
        $sapImpTable = new server_util_Map(array("T_LIFNR" => $vendor));
		$sapExpTable = new server_util_Map(array("LINEITEMS","T_CAPEX","T_LIFNR","T_OPEX","T_REKAP"));
		$dataSAP = $rfc->callRFC($login,"ZRFC_VENDOR_FBL1N_MASS", $sapImp, $sapExpTable, $sapImpTable, null, true);
		$output = $dataSAP->get("LINEITEMS");
        $result = array();
		foreach ($output->getArray() as $val){
			$line = $val->get(0);
			if ($line->get("BUS_AREA") == $ba && $line->get("PSTNG_DATE") == date("Ymd")){
				$result[] = $line->getArray();
			}
			
		}
        return $result;
    }
	function getSPBAlert($tgl){
		$this->rfc = new server_util_rfcLib("rra/sapdev");
		$login = new server_util_Map();
		//query 
		$login->set("user", "860107");
		$login->set("passwd", "pu860107");
		$sapImp = new server_util_Map(array(
								"I_DATUM" => $tgl 
								));
		$sapExpTable = new server_util_Map(array("T_OUTPUT","T_BNAME"));
		$sapImpTable = null;
		$dataSAP = $this->rfc->callRFC($login,"ZRFC_SPB_ALERT", $sapImp, $sapExpTable, $sapImpTable, null, true);
		
		$output = $dataSAP->get("T_OUTPUT");
		$rs = array();
		foreach ($output->getArray() as $val){
			$line = $val->get(0);
			$rs[] = array("po" =>$line->get("PYORD"), "vendor" => $line->get("ZNME1"),"nikapp" => $line->get("NIKAPP") ); 
		}
		return $rs;
	}




































/***********************************************************FUNGSI BARU ********************************************/
//dashboard



function getNol(){
	$rs = $this->db->execute("	
		SELECT A.baris + B.baris as baris
		FROM (
				select count (no_tagihan) as baris, no_tagihan
				from fca_regdok a
				inner join fca_group b on b.kode_ba = a.kode_ubis 
				inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
				left outer join fca_tagihan1 d on d.reg_id = a.reg_id 	
				inner join fca_pemdok e on d.reg_id=e.reg_id and e.nik='$this->userid'
				where d.status='000' or d.status='00'
			
			) A,(
				select count(no_tagihan) as baris, no_tagihan, status, nik_user from fca_tagihan1 where status=1000 and nik_user='$this->userid'
			) B

	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}


function getSatu(){
	$rs = $this->db->execute("
	
	select 
	count(reg_id) as baris
	from fca_tagihan1 
	where nik_user = '$this->userid' and status='0' 

	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}

function getDua(){
	$rs = $this->db->execute("
	
		select count(reg_id) as baris 
		from fca_tagihan1 
        where nik_update2 = '$this->userid'
		

	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}

function getTiga(){
	$rs = $this->db->execute("
		
		select 
		count(a.no_tagihan) as baris
		from fca_tagihan1 a 
		inner join sap_vendor b on a.kode_vendor = b.kode_vendor
		inner join fca_cek_amount d on a.nilai_tagihan between n1 and n2 and a.jns_trans=d.jenis
		inner join fca_rules e on e.kode = d.kode and e.nik='$this->userid' and ((a.status = 2 and e.posisi = '1') or (a.status = 02 and e.posisi = '1') or (a.status = 4 and e.posisi = '2') or (a.status = 40 and e.posisi = '2'))
		where kode_ba in(select kode_ba from fca_ba_akses where nik='$this->userid') 


	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}

function getEmpat(){
	// SELECT A.baris + B.baris as baris
	// 	FROM (
	// 			select count(a.no_tagihan) as baris	, no_tagihan
	// 			from fca_tagihan1 a 
	// 			inner join sap_vendor b on a.kode_vendor = b.kode_vendor
	// 			inner join fca_cek_amount d on a.nilai_tagihan between n1 and n2 and a.jns_trans=d.jenis
	// 			inner join fca_rules e on e.kode = d.kode and e.nik='630827' and (a.status = 2000 and e.posisi = '1')
	// 			where kode_ba in(select kode_ba from fca_ba_akses where nik='630827') 
	// 	) A,(
	// 			select count(no_tagihan) as baris, no_tagihan, status, nik_user from fca_tagihan1 where status=1000 and nik_user='630827'
	// 	) B

	$rs = $this->db->execute("
		select count(a.no_tagihan) as baris	
		from fca_tagihan1 a 
		inner join sap_vendor b on a.kode_vendor = b.kode_vendor
		inner join fca_cek_amount d on a.nilai_tagihan between n1 and n2 and a.jns_trans=d.jenis
		inner join fca_rules e on e.kode = d.kode and e.nik='$this->userid' and (a.status = 2000 and e.posisi = '1')
		where kode_ba in(select kode_ba from fca_ba_akses where nik='$this->userid') 
	", array($lokasi, $kode_draft));



	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}




//disdok
function getListVendor($kode_vendor, $nama_vendor, $filter, $page){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	if ($kode_vendor != "" && $nama_vendor != ""){
		$rs = $db->LimitQuery("select kode_vendor, 0 as level_spasi, nama from sap_vendor where (kode_vendor like '%$kode_vendor%' or lower(nama) like '%$nama_vendor%')  order by nama", 50, 0);
	}else if ($kode_vendor != ""){
		$rs = $db->LimitQuery("select kode_vendor, 0 as level_spasi, nama from sap_vendor where (kode_vendor like '%$kode_vendor%' ) order by kode_vendor", 50, 0);
	}else if ($nama_vendor != "")
		$rs = $db->LimitQuery("select kode_vendor, 0 as level_spasi, nama from sap_vendor where (lower(nama) like '%$nama_vendor%')  order by kode_vendor", 50, 0);
	else
		$rs = $db->LimitQuery("select kode_vendor, 0 as level_spasi, nama from sap_vendor ", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}

function getListBA($ubis, $nama, $filter, $page){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	if ($ubis != "" && $nama != ""){
		// $rs = $db->LimitQuery("
		// 	select a.kode_ubis, a.level_spasi, a.nama
		// 	from exs_ubis a
		// 	inner join fca_ba b on a.kode_ubis=b.kode_ba
		// 	inner join fca_ba_akses c on c.kode_ba=b.kode_ba
		// 	where (c.nik='$this->userid' and a.kode_ubis like '%$ubis%' or lower(a.nama) like '%$nama%') order by a.nama
		// ", 50, 0);
		$rs = $db->LimitQuery("
		select nama, b.kode_ba from exs_ubis a join fca_ba b on a.kode_ubis=b.kode_ba
		where (b.kode_ubis like '%$ubis%' or lower(a.nama) like '%$nama%') order by b.kode_ba
		", 50, 0);
	}else if ($ubis != ""){
		$rs = $db->LimitQuery("
		select nama, b.kode_ba from exs_ubis a join fca_ba b on a.kode_ubis=b.kode_ba
		where (b.kode_ubis like '%$ubis%') order by a.nama
		", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("
		select nama, b.kode_ba from exs_ubis a join fca_ba b on a.kode_ubis=b.kode_ba
		where (lower(a.nama) like '%$nama%') order by b.kode_ba
		", 50, 0);
	else
		$rs = $db->LimitQuery("
		select nama, b.kode_ba from exs_ubis a join fca_ba b on a.kode_ubis=b.kode_ba
		order by b.kode_ba
		", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}

//distribusi dokumen
function saveDisDok($data){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	
	$sql->add("insert into fca_regdok(reg_id, kode_vendor, kode_ubis, kode_cc, nik_user, tgl_input, status)
		values(70,'".$data->kode_vendor."','". $data->kode_ubis."','','".$this->userid."',sysdate,0 ) ");
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}

function editDisDok($data){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$sql->add("delete from fca_regdok where reg_id = '$data->reg_id'");
	
	$sql->add("insert into fca_regdok(reg_id, kode_vendor, kode_ubis, kode_cc, nik_user, tgl_input, status)
		values(70,'".$data->kode_vendor."','". $data->kode_ubis."','','".$this->userid."',sysdate,0 ) ");
	
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}

function getListDisDok(){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("
		select a.kode_vendor, a.kode_ubis, a.nik_user, to_char(tgl_input, 'DD/MM/YYYY') as tgl_input, a.status, a.reg_id, b.nama 
		from fca_regdok a join sap_vendor b on a.kode_vendor=b.kode_vendor
		order by reg_id");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	
	return $result;
}



function sendWaktu01($regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$area = $db->execute("
		select max(reg_id) as maxreg from fca_sla1
	");
	if ($row = $area->FetchNextObject(false)){
		$area2 = $row->maxreg;
	}
	if($regid == $area2){
		$sql->add("
			update fca_sla1 set tgl1 = sysdate where reg_id='$regid'
		");
	}else{
		$sql->add("
			insert into fca_sla1(id,tgl1,tgl2,tgl3,tgl4,reg_id) 
			values(1,sysdate,'','','','".$regid."')
		");
	}
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function sendWaktu001($regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	//buat ke entrydok
	$waktu = $db->execute("		
		select reg_id from fca_entrydokadm where reg_id='$regid' and tgl_akhir is null
	");
	if ($row = $waktu->FetchNextObject(false)){
		// $waktu2 = $row->maxreg;
	}else{
		$id = 1 ;
		$sql->add("
		insert into fca_entrydokadm(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	'".$id."', '-', sysdate, '".$this->userid."', '".$status."', '', '".$regid."') 
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}






function sendWaktu2($regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$sql->add("
		update fca_sla1 set tgl4 = sysdate where reg_id='".$regid."'
	");
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function sendWaktu002($regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	//buat ke entrydok
	$waktu = $db->execute("		
		select reg_id from fca_entrydokadm where reg_id='$regid' and tgl_akhir is null
	");
	if ($row = $waktu->FetchNextObject(false)){
		// $waktu2 = $row->maxreg;
	}else{
		$id = 1 ;
		$sql->add("
		insert into fca_entrydokadm(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	'".$id."', '-', sysdate, '".$this->userid."', '".$status."', '', '".$regid."') 
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}
	


function sendWaktuOff1($regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$area = $db->execute("
		select max(reg_id) as maxreg from fca_sla2
	");
	if ($row = $area->FetchNextObject(false)){
		$area2 = $row->maxreg;
	}
	if($regid == $area2){
		$sql->add("
			update fca_sla2 set tgl1 = sysdate where reg_id='$regid'
		");
	}else{
		$sql->add("
			insert into fca_sla2(id,tgl1,tgl2,tgl3,tgl4,reg_id) 
			values(1,sysdate,'','','','".$regid."')
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}

function sendWaktuOff001($regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	//buat ke entrydok
	$waktu = $db->execute("		
		select reg_id from fca_entrydok where reg_id='$regid' and tgl_akhir is null
	");
	if ($row = $waktu->FetchNextObject(false)){
		// $waktu2 = $row->maxreg;
	}else{
		$id = 1 ;
		$sql->add("
		insert into fca_entrydok(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	'".$id."', '-', sysdate, '".$this->userid."', '".$status."', '', '".$regid."') 
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}



function sendWaktuOff2($regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$sql->add("
		update fca_sla1 set tgl4 = sysdate where reg_id='".$regid."'
	");
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function sendWaktuOff002($regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	//buat ke entrydok
	$waktu = $db->execute("		
		select reg_id from fca_entrydok where reg_id='$regid' and tgl_akhir is null
	");
	if ($row = $waktu->FetchNextObject(false)){
		// $waktu2 = $row->maxreg;
	}else{
		$id = 1 ;
		$sql->add("
		insert into fca_entrydok(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	'".$id."', '-', sysdate, '".$this->userid."', '".$status."', '', '".$regid."') 
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}

function sendWaktuApp($regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$area = $db->execute("
		select max(reg_id) as maxreg from fca_sla3
	");
	if ($row = $area->FetchNextObject(false)){
		$area2 = $row->maxreg;
	}
	if($regid == $area2){
		$sql->add("
			update fca_sla3 set tgl1 = sysdate where reg_id='$regid'
		");
	}else{
		$sql->add("
			insert into fca_sla3(id,tgl1,tgl2,reg_id) 
			values(1,sysdate,'','".$regid."')
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}



function sendWaktuApp001($regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	//buat ke entrydok
	$waktu = $db->execute("		
		select reg_id from fca_appdok where reg_id='$regid' and tgl_akhir is null
	");
	if ($row = $waktu->FetchNextObject(false)){
		// $waktu2 = $row->maxreg;
	}else{
		$id = 1 ;
		$sql->add("
		insert into fca_appdok(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	'".$id."', '-', sysdate, '".$this->userid."', '".$status."', '', '".$regid."') 
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function sendWaktuRejOff($regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	
	$sql->add("
		insert into fca_appdok(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	1, '-', sysdate, '".$this->userid."', '".$status."', '', '".$regid."') 
	");	

	
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function sendWaktuSAP001($regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$sql->add("
		insert into fca_entrydok(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	1, '-', sysdate, '".$this->userid."', 'SAP', '', '".$regid."') 
	");	
	$ret = $db->execArraySQL($sql);
	return $ret;
}

function sendWaktuSPB001($regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$sql->add("
		insert into fca_entrydok(id, no_tagihan, tanggal, nik_user, status, tgl_akhir, reg_id)
		values(	1, '-', sysdate, '".$this->userid."', 'SPB', '', '".$regid."') 
	");	
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function getFcaVendor(){
	$db = $this->getDb();
	$result = array();
	//error_log("select kode_cfu, nama, decode(costing_level,0,99,costing_level) costing_level from bpc_cfu where COSTING_LEVEL <> 0  start with kode_cfu = '$cfu' connect by kode_induk = prior kode_lokasi order by costing_level ");
	$rs = $db->execute("
	select a.kode_vendor, a.nama, a.alamat, a.no_telp,
	b.kode_bank, b.nama as nama_bank, b.no_rek, b.an_rek
	from sap_vendor a 
	join sap_bank_vendor b on a.kode_vendor=b.kode_vendor
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	
	return $result;
}

function deleteDisDok($regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$sql->add("delete from fca_regdok where reg_id = '$regid'");
	return $this->db->execArraySQL($sql);
}

function findDisDok($search){
	$db = $this->getDb();
	$result = array("rs" => array("rows" => array()));
	$search = strtoupper($search);
	$rs = $db->execute("select count(*) as total
					from fca_regdok a
					where (upper(a.kode_vendor) like '%$search%' or a.kode_ubis like '$search%') 
					");
	$row = $rs->FetchNextObject(false);
	$total = $row->total;
	$rs = $db->LimitQuery("select a.kode_vendor, a.kode_ubis, a.kode_cc, a.nik_user, a.tgl_input, a.status
					from fca_regdok a
					where (upper(a.kode_vendor) like '%$search%' or a.kode_ubis like '$search%') 
					order by kode_vendor", 50, 0);
	while ($row = $rs->FetchNextObject(false)){
		$result["rs"]["rows"][] = (array)$row;
	}
	$result["page"] = $page;
	$result["maxpage"] = ceil($total / $rowPerPage);
	$result["total"] = $total;
	return $result;
}


function findSynVen($search){
	$db = $this->getDb();
	$result = array("rs" => array("rows" => array()));
	$search = strtoupper($search);
	$rs = $db->execute("select count(*) as total
					from sap_vendor a
					where (upper(a.kode_vendor) like '%$search%' or lower(a.nama) like '$search%') 
					");
	$row = $rs->FetchNextObject(false);
	$total = $row->total;
	$rs = $db->LimitQuery("
	select a.kode_vendor, a.nama, a.alamat, a.no_telp,
	b.kode_bank, b.nama as nama_bank, b.no_rek, b.an_rek
	from sap_vendor a 
	join sap_bank_vendor b on a.kode_vendor=b.kode_vendor
				where (lower(a.kode_vendor) like '%$search%' or lower(a.nama) like '$search%') 
					order by kode_vendor", 50, 0);
	while ($row = $rs->FetchNextObject(false)){
		$result["rs"]["rows"][] = (array)$row;
	}
	$result["page"] = $page;
	$result["maxpage"] = ceil($total / $rowPerPage);
	$result["total"] = $total;
	return $result;
}


//ENTRY DOKUMEN
function getNoKontrak($no){
	$rs = $this->db->execute("
		select no_kontrak, kode_vendor, nama_proyek, no_tagihan from fca_tagihan1 where no_kontrak='$no'
	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	while ($row = $rs->FetchNextObject(false)){
			$result["draft"][] = (array) $row;
	}
	$result["jumlah"] = count($result["draft"]);
	return $result;
}

function getKodeBA($cc, $nama, $filter, $page){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	if ($cc != "" && $nama != ""){
		$rs = $db->LimitQuery("select fcbp, 0 as level_spasi, kode_ba from fca_ba where (fcbp like '$cc%' or lower(kode_ba) like '%$nama%') order by kode_ba", 50, 0);
	}else if ($cc != ""){
		$rs = $db->LimitQuery("select fcbp, 0 as level_spasi, kode_ba from fca_ba where (fcbp like '$cc%' ) order by fcbp", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("select fcbp, 0 as level_spasi, kode_ba from fca_ba where (kode_ba like '%$nama%') order by fcbp", 50, 0);
	else
		$rs = $db->LimitQuery("select fcbp, 0 as level_spasi, kode_ba from fca_ba ", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}


function getKaryawan($nik, $nama, $filter, $page){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	if ($nik != "" && $nama != ""){
		$rs = $db->LimitQuery("		
			select nik_off, 0 as level_spasi, nama
			from fca_pemdok_group a
			join fca_karyawan b on b.nik=a.nik_off
			where a.nik_mgr='$this->userid' and (a.nik_off like '$nik%' or lower(nama) like '%$nama%') order by nik
		", 50, 0);
	}else if ($nik != ""){
		$rs = $db->LimitQuery("
			select nik_off, 0 as level_spasi, nama
			from fca_pemdok_group a
			join fca_karyawan b on b.nik=a.nik_off
			where a.nik_mgr='$this->userid' and nik like '$nik%' order by nik
		", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("
			select nik_off, 0 as level_spasi, nama
			from fca_pemdok_group a
			join fca_karyawan b on b.nik=a.nik_off
			where a.nik_mgr='$this->userid' and lower(nama) like '%$nama%' order by nama
		", 50, 0);
	else
		$rs = $db->LimitQuery("
			select nik_off, 0 as level_spasi, nama
			from fca_pemdok_group a
			join fca_karyawan b on b.nik=a.nik_off
			where a.nik_mgr='$this->userid'
		", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}




function getAkun($cc, $nama, $filter, $page){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	if ($cc != "" && $nama != ""){
		$rs = $db->LimitQuery("select kode_akun, 0 as level_spasi, nama from exs_masakun where (length(kode_akun) = 8 and kode_akun like '$cc%' or lower(nama) like '%$nama%') order by kode_akun", 50, 0);
	}else if ($cc != ""){
		$rs = $db->LimitQuery("select kode_akun, 0 as level_spasi, nama from exs_masakun where (length(kode_akun) = 8 and kode_akun like '$cc%' ) order by kode_akun", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("select kode_akun, 0 as level_spasi, nama from exs_masakun where (length(kode_akun) = 8 and nama like '%$nama%') order by kode_akun", 50, 0);
	else
		$rs = $db->LimitQuery("select kode_akun, 0 as level_spasi, nama from exs_masakun where length(kode_akun) = 8 order by kode_akun", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}


function getListCC($cc, $nama, $filter, $page){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	$filter = "and $filter";
	if ($cc != "" && $nama != ""){
		$rs = $db->LimitQuery("select kode_cc, level_spasi, nama from exs_cc where (kode_cc like '$cc%' or lower(nama) like '%$nama%') order by nama", 50, 0);
	}else if ($cc != ""){
		$rs = $db->LimitQuery("select kode_cc, level_spasi, nama from exs_cc where (kode_cc like '$cc%' ) order by kode_cc", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("select kode_cc, level_spasi, nama from exs_cc where (nama like '%$nama%') order by kode_cc", 50, 0);
	else
		$rs = $db->LimitQuery("select kode_cc, level_spasi, nama from exs_cc where kode_lokasi ='1000' $filter ", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	
	// error_log(print_r($rs, true));
	$result["totalPage"] = 0;
	return $result;
}

function getListAct($rkm, $nama, $filter, $page){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	$periode .= " to_char(sysdate, 'YYYY')";
	if ($rkm != "" && $nama != ""){
		$rs = $db->LimitQuery("select kode_rkm, 0 as level_spasi, nama from bpc_rkm where (tahun='2018' and kode_rkm like '$rkm%' or lower(nama) like '%$nama%') order by nama", 120, 0);
	}else if ($rkm != ""){
		$rs = $db->LimitQuery("select kode_rkm, 0 as level_spasi, nama from bpc_rkm where (tahun='2018' and kode_rkm like '$rkm%' ) order by kode_cc", 120, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("select kode_rkm, 0 as level_spasi, nama from bpc_rkm where (tahun='2018' and nama like '%$nama%') order by kode_cc", 120, 0);
	else
		$rs = $db->LimitQuery("select kode_rkm, 0 as level_spasi, nama from bpc_rkm where tahun='2018' and kode_lokasi ='1000' ", 120, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}


function getNama($nik,$nama){
	$db = $this->getDb();
	if ($nik != "" && $nama != ""){
		$rs = $db->LimitQuery("select nik, 0 as level_spasi, nama from fca_karyawan where (nik like '$nik%' or lower(nama) like '%$nama%') order by nama", 50, 0);
	}else if ($nik != ""){
		$rs = $db->LimitQuery("select nik, 0 as level_spasi, nama from fca_karyawan where (nik like '$nik%' ) order by nik", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("select nik, 0 as level_spasi, nama from fca_karyawan where (nama like '%$nama%') order by nik", 50, 0);
	else
		$rs = $db->LimitQuery("select nik, 0 as level_spasi, nama from fca_karyawan", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}

function getNama2($nik){
	$rs = $this->db->execute("
		select nik, 0 as level_spasi, nama, jabatan from fca_karyawan where nik='$nik'
	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}

function getNama3($nik){
	$rs = $this->db->execute("
		select nik, 0 as level_spasi, nama, jabatan from fca_karyawan where nik='$nik'
	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}

function getListEntDok(){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("
	select a.reg_id, a.kode_vendor, a.kode_ubis, d.nik_reject, d.no_tagihan, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, c.nama, d.status as stsd
	from fca_regdok a
	inner join fca_group b on b.kode_ba = a.kode_ubis 
	inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
	left outer join fca_tagihan1 d on d.reg_id = a.reg_id 	
	inner join fca_pemdok e on d.reg_id=e.reg_id and e.nik='$this->userid'
	where d.status='000' or (d.status='1000' and d.nik_user='$this->userid') 
	or (d.status='00' and d.nik_user='$this->userid')
	order by a.reg_id
    
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}

function getListPemDok(){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("
	select a.reg_id, a.kode_vendor, a.kode_ubis, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, c.nama, d.status as stsd
	from fca_regdok a
	inner join fca_group b on b.kode_ba = a.kode_ubis 
	inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
	left outer join fca_tagihan1 d on d.reg_id = a.reg_id 	
	where d.status='00' or d.status='0' order by a.reg_id    
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}


function getRepPemDok(){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("	
	select a.reg_id, a.tanggal, a.nik, b.no_tagihan
	from fca_pemdok a 
	join fca_tagihan1 b 
	on a.reg_id=b.reg_id    
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}

// function getNote($regid){
// 	$db = $this->getDb();
// 	$result = array();
	
// 	$rs = $db->execute("
// 	select note, nik_user, no_tagihan from fca_tagihan1 where reg_id='$regid'	
	
// 	");
// 	while ($row = $rs->FetchNextObject(false)){
// 		$result[] = (array)$row;
// 	}
// 	return $result;
// }

// function getNoteApp($regid){
// 	$db = $this->getDb();
// 	$result = array();
	
// 	$rs = $db->execute("
// 	select note, nik_reject, no_tagihan from fca_tagihan1 where reg_id='$regid'	
	
// 	");
// 	while ($row = $rs->FetchNextObject(false)){
// 		$result[] = (array)$row;
// 	}
// 	return $result;
// }

// function getNoteApp1($notagihan){
// 	$db = $this->getDb();
// 	$result = array();
	
// 	$rs = $db->execute("
// 	select note, nik_reject2, no_tagihan from fca_tagihan1 where no_tagihan='$notagihan'	
	
// 	");
// 	while ($row = $rs->FetchNextObject(false)){
// 		$result[] = (array)$row;
// 	}
// 	return $result;
// }

function getListEntAdmin(){
	$db = $this->getDb();
	$result = array();
	$area = $db->execute("
		select klp from fca_karyawan a join fca_group b on a.kode_ba=b.kode_ba where a.nik='$this->userid'
	");
	if ($row = $area->FetchNextObject(false)){
		$area2 = $row->klp;
	}
	// error_log($area2);
	$rs = $db->execute("
	select a.reg_id, a.kode_vendor, d.nik_user, d.no_tagihan, a.kode_ubis, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, c.nama, d.status as stsd
	from fca_regdok a
	inner join fca_group b on b.kode_ba = a.kode_ubis 
	inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
	left outer join fca_tagihan1 d on d.reg_id = a.reg_id 
	where a.status='0' or d.status='1111' order by a.reg_id
    
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}

function getDetInv($no){
	$rs = $this->db->execute("
	select no_kontrak, termin, no_urut, value2 from fca_tagihan1 a join fca_check_dok1 b on a.no_tagihan=b.no_tagihan where no_kontrak='$no' and b.no_urut=1
	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	while ($row = $rs->FetchNextObject(false)){
			$result["draft"][] = (array) $row;
	}
	$result["jumlah"] = count($result["draft"]);
	return $result;

}


function savePemDok($data,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	

	if($status == "New"){
		$nilaistatus = "000";
	}else if($status == "Reject"){
		$nilaistatus = "0000";
	}	

	$sql->add("
		insert into fca_pemdok(
			id, 
			reg_id, 
			tanggal,
			nik				
		)
		values(
			1,
			'".$data->reg_id."',
			sysdate,
			'".$data->nik."'				
		) 
	");
	$sql->add("
		update fca_regdok set status='3' where reg_id='".$data->reg_id."'
	");
	$sql->add("
		update fca_tagihan1 set status='$nilaistatus' where reg_id='".$data->reg_id."'
	");
	$ret = $db->execArraySQL($sql);
	return $ret;
}






function saveEntDok($data,$header,$regid,$nmrtagihan,$status,$statusbaru,$cttn){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$value1='-';
	$value2='-';
	$value3='-';
	$value4='-';
	$value5='-';	
	$no_urut='-';
	$nt="";
	$nt .= "TO_CHAR(SYSDATE, 'YYMMDDHH24MISS'),";

	$baris = 0;
	$baris = $db->execute("
		select count(no_tagihan) as n from fca_tagihan1
	");
	if ($row = $baris->FetchNextObject(false)){
		$baris2 = $row->n;
	}	

	if($status == "Reject"){
		$sts_baru = "02";
	}else{
		$sts_baru = "2";
	}


	if($nmrtagihan == "1"){
			$nomortagihan = "1000000000" + $baris2;	
			$sql->add("
			insert into fca_tagihan1(
				no_tagihan, 
				reg_id, 
				kode_vendor, 
				nama_proyek, 
				kode_akun, kode_cc, kode_rkm, termin, jenis_uang,
				no_kontrak, tgl_kontrak, nilai_kontrak, curr_kontrak,
				no_posp,tgl_posp,nilai_posp,curr_po,
				no_amd,tgl_amd,nilai_amd,curr_amd,
				nilai_tagihan, nilai_curr, curr,
				nilai_bayar, nilai_bayar_curr, curr_bayar,
				keterangan,
				no_spb,
				no_sap,
				nik_user,
				tgl_input,
				jenis,
				status,
				periode,
				nik_update,
				nik_update2,
				nik_reject,
				nik_reject2,
				kode_ba,
				jns_trans
			)
			values(
				'$nomortagihan',
				'".$data->reg_id."',
				'".$data->kode_vendor."',
				'". $data->nama_proyek."',

				'". $data->kode_akun."',
				'". $data->kode_cc."',
				'". $data->kode_rkm."',
				'". $data->termin."',
				'". $data->jenis_uang."',


				'". $data->no_kontrak."',
				'". $data->tgl_kontrak."',
				'". $data->nilai_kontrak."',
				'". $data->curr_kontrak."',
				'". $data->no_posp."',
				'". $data->tgl_posp."',
				'". $data->nilai_posp."',
				'". $data->curr_po."',
				'". $data->no_amd."',
				'". $data->tgl_amd."',
				'". $data->nilai_amd."',
				'". $data->curr_amd."',
				'". $data->nilai_tagihan."',
				'". $data->nilai_curr."',
				'". $data->curr."',
				'". $data->nilai_bayar."',
				'". $data->nilai_bayar_curr."',
				'". $data->curr_bayar."',
				'". $data->keterangan."',
				'-',
				'-',
				'".$this->userid."',
				sysdate,
				'".$data->jenis."',
				'".$sts_baru."',
				to_char(sysdate, 'YYYYMM'),
				'-',
				'-',
				'-',
				'-',
				'".$data->kode_ba."',
				'".$data->jns_trans."'
			
			) 
		");
		
		foreach($header->items as $add){			
			if(is_array($add)){
				foreach($add as $value){
					$jenis = $value->jenis;
					$no_urut = $value->no_urut;
					$v1 = $value->value1;
					$v2 = $value->value2;
					$v3 = $value->value3;
					$v4 = $value->value4;
					$v5 = $value->value5;	
					$v6 = $value->value6;	

					$sql->add(array("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
					($nomortagihan, '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
				}
			}else{
				$sql->add("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
				($nomortagihan, '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
			}
		}
			
		$sql->add("update fca_regdok set status = '1' where reg_id = '".$data->reg_id."'");
	
	}else{
		$nomortagihan = $nmrtagihan;
		$sql->add("delete from fca_check_dok1 where no_tagihan = '$nmrtagihan'");
	
		$sql->add("
			update fca_tagihan1 set 
				no_tagihan = '$nmrtagihan',
				reg_id = '".$data->reg_id."',
				kode_vendor = '".$data->kode_vendor."', 
				nama_proyek = '". $data->nama_proyek."',
				kode_akun = '". $data->kode_akun."', kode_cc = '". $data->kode_cc."', kode_rkm = '". $data->kode_rkm."', termin = '". $data->termin."', jenis_uang = '". $data->jenis_uang."',
				no_kontrak = '". $data->no_kontrak."', tgl_kontrak = '". $data->tgl_kontrak."', nilai_kontrak = '". $data->nilai_kontrak."', curr_kontrak = '". $data->curr_kontrak."',
				no_posp = '". $data->no_posp."', tgl_posp = '". $data->tgl_posp."', nilai_posp = '". $data->nilai_posp."',curr_po = '". $data->curr_po."',
				no_amd = '". $data->no_amd."', tgl_amd = '". $data->tgl_amd."',nilai_amd = '". $data->nilai_amd."',curr_amd = '". $data->curr_amd."',
				nilai_tagihan = '". $data->nilai_tagihan."', nilai_curr = '". $data->nilai_curr."', curr = '". $data->curr."',
				nilai_bayar = '". $data->nilai_bayar."', nilai_bayar_curr = '". $data->nilai_bayar_curr."', curr_bayar ='". $data->curr_bayar."',
				keterangan='". $data->keterangan."',
			
				nik_user = '".$this->userid."',
				tgl_input = sysdate,
				jenis = '".$data->jenis."',
				status = '".$sts_baru."',
				periode = to_char(sysdate, 'YYYYMM'),
			
				kode_ba = '".$data->kode_ba."',
				jns_trans = '".$data->jns_trans."'
			where no_tagihan = '".$nomortagihan."'");


			foreach($header->items as $add){			
				if(is_array($add)){
					foreach($add as $value){
						$jenis = $value->jenis;
						$no_urut = $value->no_urut;
						$v1 = $value->value1;
						$v2 = $value->value2;
						$v3 = $value->value3;
						$v4 = $value->value4;
						$v5 = $value->value5;	
						$v6 = $value->value6;	
	
						$sql->add(array("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
						($nomortagihan, '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
					}
				}else{
					$sql->add("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
					($nomortagihan, '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
				}
			}

			$sql->add("update fca_regdok set status = '1' where reg_id = '".$data->reg_id."'");


	}


	
	$sql->add("
		update fca_entrydok set no_tagihan='".$nomortagihan."', tgl_akhir = sysdate, status='".$sts_baru."'
		where reg_id='".$data->reg_id."' and status='".$statusbaru."'
	");	

	if($cttn != '-'){
		/*update catatan*/
		$idhitung = $db->execute("		
			select count(no_tagihan) as jumlah from fca_catatan
		");
		if ($rowbaru = $idhitung->FetchNextObject(false)){
			$jumlah = $rowbaru->jumlah;
		}
		$idno = 1 + $jumlah;
		$sql->add("
			insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
			values('".$idno."','".$nomortagihan."','".$this->userid."',sysdate,'".$cttn."')
		");
	}

	$ret = $db->execArraySQL($sql);
	return $ret;
}



function saveEntAdmin($data,$header,$regid,$nmrtagihan,$status,$statusbaru,$cttn){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$value1='-';
	$value2='-';
	$value3='-';
	$value4='-';
	$value5='-';	
	$no_urut='-';
	$nt="";
	$nt .= "TO_CHAR(SYSDATE, 'YYMMDDHH24MISS'),";

	

	$baris = 0;
	$baris = $db->execute("
		select count(no_tagihan) as n from fca_tagihan1
	");
	if ($row = $baris->FetchNextObject(false)){
		$baris2 = $row->n;
	}	

	if($nmrtagihan == "1"){
				$nomortagihan = "1000000000" + $baris2;	
				$sts_baru = "0";
				$sql->add("
				insert into fca_tagihan1(
					no_tagihan, 
					reg_id, 
					kode_vendor, 
					nama_proyek, 
					kode_akun, kode_cc, kode_rkm, termin, jenis_uang,
					no_kontrak, tgl_kontrak, nilai_kontrak, curr_kontrak,
					no_posp,tgl_posp,nilai_posp,curr_po,
					no_amd,tgl_amd,nilai_amd,curr_amd,
					nilai_tagihan, nilai_curr, curr,
					nilai_bayar, nilai_bayar_curr, curr_bayar,
					keterangan,
					no_spb,
					no_sap,
					nik_user,
					jenis,
					status,
					periode,
					nik_update,
					nik_update2,
					nik_reject,
					nik_reject2,
					kode_ba,
					jns_trans,
					tgl_input_admin
				)
				values(
					'$nomortagihan',
					'".$data->reg_id."',
					'".$data->kode_vendor."',
					'". $data->nama_proyek."',

					'". $data->kode_akun."',
					'". $data->kode_cc."',
					'". $data->kode_rkm."',
					'". $data->termin."',
					'". $data->jenis_uang."',


					'". $data->no_kontrak."',
					'". $data->tgl_kontrak."',
					'". $data->nilai_kontrak."',
					'". $data->curr_kontrak."',
					'". $data->no_posp."',
					'". $data->tgl_posp."',
					'". $data->nilai_posp."',
					'". $data->curr_po."',
					'". $data->no_amd."',
					'". $data->tgl_amd."',
					'". $data->nilai_amd."',
					'". $data->curr_amd."',
					'". $data->nilai_tagihan."',
					'". $data->nilai_curr."',
					'". $data->curr."',
					'". $data->nilai_bayar."',
					'". $data->nilai_bayar_curr."',
					'". $data->curr_bayar."',
					'". $data->keterangan."',
					'-',
					'-',
					'".$this->userid."',
					'".$data->jenis."',
					'".$sts_baru."',
					to_char(sysdate, 'YYYYMM'),
					'-',
					'-',
					'-',
					'-',
					'".$data->kode_ba."',
					'".$data->jns_trans."',
					sysdate

				
				) 
			");

			foreach($header->items as $add){			
				if(is_array($add)){
					foreach($add as $value){
						$jenis = $value->jenis;
						$no_urut = $value->no_urut;
						$v1 = $value->value1;
						$v2 = $value->value2;
						$v3 = $value->value3;
						$v4 = $value->value4;
						$v5 = $value->value5;	
						$v6 = $value->value6;	

						$sql->add(array("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
						($nomortagihan, '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
					}
				}else{
					$sql->add("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
					($nomortagihan, '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
				}
			}
	
	}else{
		$nomortagihan = $nmrtagihan;
		// $sql->add("delete from fca_tagihan1 where no_tagihan = '".$nomortagihan."'");
		$sql->add("delete from fca_check_dok1 where no_tagihan = '".$nomortagihan."'");
		$sts_baru = "00";
		$sql->add("
			update fca_tagihan1 set 				
				kode_vendor = '".$data->kode_vendor."', 
				nama_proyek = '". $data->nama_proyek."',
				kode_akun = '". $data->kode_akun."', kode_cc = '". $data->kode_cc."', kode_rkm = '". $data->kode_rkm."', termin = '". $data->termin."', jenis_uang = '". $data->jenis_uang."',
				no_kontrak = '". $data->no_kontrak."', tgl_kontrak = '". $data->tgl_kontrak."', nilai_kontrak = '". $data->nilai_kontrak."', curr_kontrak = '". $data->curr_kontrak."',
				no_posp = '". $data->no_posp."', tgl_posp = '". $data->tgl_posp."', nilai_posp = '". $data->nilai_posp."',curr_po = '". $data->curr_po."',
				no_amd = '". $data->no_amd."', tgl_amd = '". $data->tgl_amd."',nilai_amd = '". $data->nilai_amd."',curr_amd = '". $data->curr_amd."',
				nilai_tagihan = '". $data->nilai_tagihan."', nilai_curr = '". $data->nilai_curr."', curr = '". $data->curr."',
				nilai_bayar = '". $data->nilai_bayar."', nilai_bayar_curr = '". $data->nilai_bayar_curr."', curr_bayar ='". $data->curr_bayar."',
				keterangan='". $data->keterangan."',
			
				tgl_input = sysdate,
				jenis = '".$data->jenis."',
				status = '".$sts_baru."',
				periode = to_char(sysdate, 'YYYYMM'),
			
				kode_ba = '".$data->kode_ba."',
				jns_trans = '".$data->jns_trans."'
			where no_tagihan = '".$nomortagihan."'");


			foreach($header->items as $add){			
				if(is_array($add)){
					foreach($add as $value){
						$jenis = $value->jenis;
						$no_urut = $value->no_urut;
						$v1 = $value->value1;
						$v2 = $value->value2;
						$v3 = $value->value3;
						$v4 = $value->value4;
						$v5 = $value->value5;	
						$v6 = $value->value6;	
	
						$sql->add(array("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
						($nomortagihan, '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
					}
				}else{
					$sql->add("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
					($nomortagihan, '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
				}
			}
	
		}
		
	$sql->add("update fca_regdok set status = '1' where reg_id = '".$data->reg_id."'");	
	$sql->add("update fca_sla1 set tgl2 = sysdate where reg_id = '".$data->reg_id."'");
	$sql->add("
		update fca_entrydokadm set no_tagihan='".$nomortagihan."', tgl_akhir = sysdate, status='".$sts_baru."'
		where reg_id='".$data->reg_id."' and status='".$statusbaru."'		 
	");	

	if($cttn != '-'){
		/*update catatan*/
		$idhitung = $db->execute("		
			select count(no_tagihan) as jumlah from fca_catatan
		");
		if ($rowbaru = $idhitung->FetchNextObject(false)){
			$jumlah = $rowbaru->jumlah;
		}
		$idno = 1 + $jumlah;
		$sql->add("
			insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
			values('".$idno."','".$nomortagihan."','".$this->userid."',sysdate,'".$cttn."')
		");
	}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}



//APPROVE DOKUMEN
function getOrg($nik){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("select nama, jabatan from fca_karyawan where nik='$nik'");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}	
	return $result;
}


function getListAppDok(){
	$db = $this->getDb();
	$result = array();
	$user = $this->userid;
		
	$rs = $db->execute("
	select 
		a.reg_id, a.no_tagihan, a.kode_vendor,'-' as vendor, a.no_sap, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, a.nama_proyek, a.nilai_tagihan, a.curr_kontrak, a.nik_user, a.nik_update, a.nik_update2, 
		b.nama, a.jns_trans, a.no_sap, a.status as sts, a.nik_reject2, a.nik_reject
		from fca_tagihan1 a 
		inner join sap_vendor b on a.kode_vendor = b.kode_vendor
		inner join fca_cek_amount d on a.nilai_tagihan between n1 and n2 and a.jns_trans=d.jenis
		inner join fca_rules e on e.kode = d.kode and e.nik='$this->userid' 
		and (
			(a.status = 2 and e.posisi = '1') or (a.status = 02 and e.posisi = '1') or (a.status = 2000 and e.posisi = '1') 
			or (a.status = 4 and e.posisi = '2') or (a.status = 40 and e.posisi = '2')
		)
		where kode_ba in(select kode_ba from fca_ba_akses where nik='$this->userid') 
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	// error_log(print_r($rs, true));
	return $result;
}



function getListDocSAP(){
	$db = $this->getDb();
	$result = array();
	$user = $this->userid;
		
	$rs = $db->execute("
	select a.reg_id, a.kode_vendor, d.nik_user, d.no_tagihan, a.kode_ubis, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, c.nama, d.status as stsd
	from fca_regdok a
	inner join fca_group b on b.kode_ba = a.kode_ubis 
	inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
	left outer join fca_tagihan1 d on d.reg_id = a.reg_id 
	where d.no_sap='-' order by a.reg_id
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	// error_log(print_r($rs, true));
	return $result;
}

function getListDocSPB(){
	$db = $this->getDb();
	$result = array();
	$user = $this->userid;
		
	$rs = $db->execute("
	select a.reg_id, a.kode_vendor, d.nik_user, d.no_tagihan, a.kode_ubis, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, c.nama, d.status as stsd
	from fca_regdok a
	inner join fca_group b on b.kode_ba = a.kode_ubis 
	inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
	left outer join fca_tagihan1 d on d.reg_id = a.reg_id 
	where d.status='5' or d.status='50 'order by a.reg_id
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	// error_log(print_r($rs, true));
	return $result;
}

function getListHistory(){
	$db = $this->getDb();
	$result = array();
	$user = $this->userid;
	$rs = $db->execute("
		select 
		a.reg_id, a.no_tagihan, a.kode_vendor,'-' as vendor, a.no_sap, to_char(a.tgl_input, 'DD/MM/YYYY HH24:MI:SS') as tgl, a.nama_proyek, a.nilai_tagihan, a.curr_kontrak, a.nik_user,
		b.nama, a.jns_trans, a.no_sap, a.status, c.jabatan
		from fca_tagihan1 a
		inner join sap_vendor b on a.kode_vendor = b.kode_vendor
		inner join fca_karyawan c on c.nik = '$this->userid'
		where nik_user = '$this->userid' or nik_update = '$this->userid' or nik_update2 = '$this->userid' or nik_reject='$this->userid' or nik_reject2='$this->userid'
		
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	// error_log($user);
	return $result;
}


function searchHistory($notagihan,$kodevendor,$nama,$tanggal,$cc){
	$db = $this->getDb();
	$result = array();
	$user = $this->userid;
		$rs = $db->execute("
		select 
			a.reg_id, a.no_tagihan, a.kode_vendor, b.nama,'-' as vendor, a.no_sap, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, a.nama_proyek, a.nilai_tagihan, a.curr_kontrak, a.nik_user,
			b.nama, a.jns_trans, a.no_sap, a.status as sts, c.jabatan, a.kode_cc
		from fca_tagihan1 a
			inner join sap_vendor b on a.kode_vendor = b.kode_vendor
			inner join fca_karyawan c on c.nik = '$this->userid'
		where a.no_tagihan like '%$notagihan%' and a.kode_vendor like '%$kodevendor%' 
		and b.nama like '%$nama%' and a.tgl_input like '%$tanggal%' and a.kode_cc like '%$cc%'
		and (nik_user = '$this->userid' or nik_update = '$this->userid' or nik_update2 = '$this->userid' or nik_reject='$this->userid' or nik_reject2='$this->userid')
		
		
		");
	
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}

	return $result;
}



function getDetHist($no){
	$rs = $this->db->execute("
	select no_tagihan, to_char(tanggal,'DD/MM/YYYY HH24:MI:SS') as tgl_input, to_char(tgl_akhir,'DD/MM/YYYY HH24:MI:SS') as tgl_selesai, hour_diff(tanggal,tgl_akhir) as lama_waktu,nik_user, status as sts from fca_entrydokadm where no_tagihan='$no' 
	union
	select no_tagihan, to_char(tanggal,'DD/MM/YYYY HH24:MI:SS') as tgl_input, to_char(tgl_akhir,'DD/MM/YYYY HH24:MI:SS') as tgl_selesai, hour_diff(tanggal,tgl_akhir) as lama_waktu,nik_user, status as sts from fca_entrydok where no_tagihan='$no' 
	union
	select no_tagihan,  to_char(tanggal,'DD/MM/YYYY HH24:MI:SS') as tgl_input, to_char(tgl_akhir,'DD/MM/YYYY HH24:MI:SS') as tgl_selesai, hour_diff(tanggal,tgl_akhir) as lama_waktu, nik_user, status as sts from fca_appdok where no_tagihan='$no' 
	order by tgl_input
	", array($lokasi, $kode_draft));
	
	$result["draft"] = array();
	while ($row = $rs->FetchNextObject(false)){
			$result["draft"][] = (array) $row;
	}
	$result["jumlah"] = count($result["draft"]);
	return $result;

}


function findAppDok($search){
	$db = $this->getDb();
	$result = array("rs" => array("rows" => array()));
	$search = strtoupper($search);
	$rs = $db->execute("
		select count(*) as total 
			from fca_tagihan1 a 
				inner join fca_regdok d on d.reg_id = a.reg_id
				inner join fca_group b on b.kode_ba = d.kode_ubis 
				inner join sap_vendor c on c.kode_vendor = a.kode_vendor
				inner join FCA_KARYAWAN e on  b.klp like concat(e.kode_cc,'%')  
		where a.status = '0' and e.nik = '$this->userid' and (upper(a.no_tagihan) like '%$search%' or d.kode_ubis like '$search%') 
	");
	$row = $rs->FetchNextObject(false);
	$total = $row->total;
	$rs = $db->LimitQuery("
		select a.reg_id, a.no_tagihan, a.kode_vendor,'-' as vendor, c.nama, d.kode_ubis
				, a.tgl_input as tgl ,
				a.nama_proyek, a.no_kontrak, a.nilai_tagihan, a.nilai_bayar, a.keterangan
				from fca_tagihan1 a 
			inner join fca_regdok d on d.reg_id = a.reg_id
			inner join fca_group b on b.kode_ba = d.kode_ubis 
			inner join sap_vendor c on c.kode_vendor = a.kode_vendor
			inner join FCA_KARYAWAN e on  b.klp like concat(e.kode_cc,'%')  
			where a.status = '0' and e.nik = '$this->userid' and (upper(a.no_tagihan) like '%$search%' or d.kode_ubis like '$search%')
			order by no_tagihan", 50, 0);
	while ($row = $rs->FetchNextObject(false)){
		$result["rs"]["rows"][] = (array)$row;
	}
	$result["page"] = $page;
	$result["maxpage"] = ceil($total / $rowPerPage);
	$result["total"] = $total;
	return $result;
}
function saveAppDok($notagihan,$regid,$statusbaru){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$baris = $db->execute("
		select status from fca_tagihan1 where no_tagihan ='".$notagihan."'
	");
	if ($row = $baris->FetchNextObject(false)){
		$status = $row->status;
	}	

	if($statusbaru === '2'){
		$nilaistatus = 4;
		$nikupdate1 = $this->userid;
		$nikupdate2 = '-';
		$sts = 'Approval 1';		
	}
	else if($statusbaru === '02'){
		$nilaistatus = 40;
		$nikupdate1 = $this->userid;
		$nikupdate2 = '-';
		$sts = 'Approval 1 Revisi'; 
		
	}	
	else if($statusbaru === '2000'){
		$nilaistatus = 40;
		$nikupdate1 = $this->userid;
		$nikupdate2 = '-';
		$sts = 'Approval 1 Revisi'; 
		
	}	
	else if($statusbaru === '4'){
		$nilaistatus = 5;
		$nikupdate1 = '-';
		$nikupdate2 = $this->userid;
		$sts = 'Final Approval';

	}
	else if($statusbaru === '40'){
		$nilaistatus = 50;
		$nikupdate1 = '-';
		$nikupdate2 = $this->userid;
		$sts = 'Final Approval Revisi';
	}

	$sql->add("
		update fca_tagihan1 
			set status = '$nilaistatus', 
			nik_update = '$nikupdate1', 
			nik_update2 = '$nikupdate2' 
		where no_tagihan ='".$notagihan."' "
	);
	$sql->add("
		update fca_appdok set no_tagihan='".$notagihan."', tgl_akhir = sysdate, status='".$sts."'
		where reg_id='".$regid."' and status='".$statusbaru."'
	");	
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}
function rejectAppDok($regid,$notagihan,$note,$statusbaru){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	

	$baris = $db->execute("
		select status from fca_tagihan1 where no_tagihan ='$notagihan'
	");
	if ($row = $baris->FetchNextObject(false)){
		$status = $row->status;
	}	

	if($status=='4' || $status =='40'){
		$nilaistatus = '2000';
		$streject = 'Reject By App 2';
		$sql->add("update fca_tagihan1 set status='$nilaistatus', nik_reject2='$this->userid' where no_tagihan ='$notagihan' ");
	}else if($status=='2' || $status=='02' || $status=='2000'){
		$nilaistatus = '1000';
		$streject = 'Reject By App 1';
		$sql->add("update fca_tagihan1 set status='$nilaistatus', nik_reject='$this->userid' where no_tagihan ='$notagihan' ");
		
	}

	$sql->add("
		update fca_appdok set no_tagihan='".$notagihan."', tgl_akhir = sysdate, status='".$streject."'
		where reg_id='".$regid."' and status='".$statusbaru."'	 
	");	


	/*update catatan*/
	$idhitung = $db->execute("		
		select count(no_tagihan) as jumlah from fca_catatan
	");
	if ($rowbaru = $idhitung->FetchNextObject(false)){
		$jumlah = $rowbaru->jumlah;
	}
	$id = 1 + $jumlah;
	$sql->add("
		insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
		values('".$id."','".$notagihan."',$this->userid,sysdate,'".$note."')
	");

	
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function rejectOffCek($regid,$note){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	// error_log($regid);
	$baris = $db->execute("
		select no_tagihan from fca_tagihan1 where reg_id ='$regid'
	");
	if ($row = $baris->FetchNextObject(false)){
		$notagihan = $row->no_tagihan;
	}	
	$nilaistatus = '1111';
	$streject = 'Reject By Off Check';
	$sql->add("update fca_tagihan1 set status='$nilaistatus' where reg_id ='$regid' ");
	$sql->add("update fca_regdok set status='0' where reg_id='$regid' ");	
	$sql->add("
		update fca_appdok set no_tagihan='".$notagihan."', tgl_akhir = sysdate, status='Reject By Off Check'
		where reg_id='".$regid."' and status='1111'	 
	");	


	/*update catatan*/
	$idhitung = $db->execute("		
		select count(no_tagihan) as jumlah from fca_catatan
	");
	if ($rowbaru = $idhitung->FetchNextObject(false)){
		$jumlah = $rowbaru->jumlah;
	}
	$id = 1 + $jumlah;
	$sql->add("
		insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
		values('".$id."','".$notagihan."',$this->userid,sysdate,'".$note."')
	");

	$ret = $db->execArraySQL($sql);
	return $ret;
}


//PARK DOKUMEN
function getListDraftDok(){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("
	select a.reg_id, a.kode_vendor, a.kode_ubis, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, c.nama, d.status as sts
	from fca_regdok a
	inner join fca_group b on b.kode_ba = a.kode_ubis 
	inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
	left outer join fca_tagihan_draft d on d.reg_id = a.reg_id 
	where d.status='3' or d.status='03'
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}



function getListDraftAdmin(){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("
	select a.reg_id, a.kode_vendor, a.kode_ubis, to_char(a.tgl_input, 'DD/MM/YYYY') as tgl, c.nama, d.status as sts
	from fca_regdok a
	inner join fca_group b on b.kode_ba = a.kode_ubis 
	inner join sap_vendor c on c.kode_vendor = a.kode_vendor          
	left outer join fca_tagihan_draft d on d.reg_id = a.reg_id 
	where a.status='3'
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}

function saveDraftDok($data,$header,$regid,$nmrtagihan,$status,$statusbaru,$cttn){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$value1='-';
	$value2='-';
	$value3='-';
	$value4='-';
	$value5='-';	
	$no_urut='-';
	$nt="";
	$nt .= "TO_CHAR(SYSDATE, 'YYMMDDHH24MISS'),";


	if($status == "Reject"){
		$sts_baru = "03";
	}else{
		$sts_baru = "3";
	}


	$baris = 0;
	$baris = $db->execute("
		select count(no_draft) as n from fca_tagihan_draft
	");
	if ($row = $baris->FetchNextObject(false)){
		$baris2 = $row->n;
	}	

	if($nmrtagihan == "1"){
		$nomortagihan = "1000000000" + $baris2;	
	
	}else{
		$nomortagihan = $nmrtagihan;
		$sql->add("delete from fca_tagihan_draft where no_tagihan = '".$nomortagihan."'");
		$sql->add("delete from fca_check_dok_draft where no_tagihan = '".$nomortagihan."'");
	}

	$no = 1000000000 + $baris2;
	// $nomortagihan = "1000000000" + $baris2;
	
	$sql->add("
		insert into fca_tagihan_draft(
			no_draft, 
			no_tagihan,
			reg_id, 
			kode_vendor, 
			nama_proyek, 
			kode_akun, kode_cc, kode_rkm, termin, jenis_uang,
			no_kontrak, tgl_kontrak, nilai_kontrak, curr_kontrak,
			no_posp,tgl_posp,nilai_posp,curr_po,
			no_amd,tgl_amd,nilai_amd,curr_amd,
			nilai_tagihan, nilai_curr, curr,
			nilai_bayar, nilai_bayar_curr, curr_bayar,
			keterangan,
			no_spb,
			no_sap,
			nik_user,
			tgl_input,
			jenis,
			status,
			periode,
			nik_update,
			nik_update2,
			nik_reject,
			nik_reject2,
			kode_ba,
			jns_trans
		)
		values(
			'$nomortagihan',
			'$nomortagihan',
			'".$data->reg_id."',
			'".$data->kode_vendor."',
			'". $data->nama_proyek."',

			'". $data->kode_akun."',
			'". $data->kode_cc."',
			'". $data->kode_rkm."',
			'". $data->termin."',
			'". $data->jenis_uang."',


			'". $data->no_kontrak."',
			TO_DATE('". $data->tgl_kontrak."', 'DD-MM-YYYY'),
			'". $data->nilai_kontrak."',
			'". $data->curr_kontrak."',
			'". $data->no_posp."',
			TO_DATE('". $data->tgl_posp."', 'DD-MM-YYYY'),
			'". $data->nilai_posp."',
			'". $data->curr_po."',
			'". $data->no_amd."',
			TO_DATE('". $data->tgl_amd."', 'DD-MM-YYYY'),
			'". $data->nilai_amd."',
			'". $data->curr_amd."',
			'". $data->nilai_tagihan."',
			'". $data->nilai_curr."',
			'". $data->curr."',
			'". $data->nilai_bayar."',
			'". $data->nilai_bayar_curr."',
			'". $data->curr_bayar."',
			'". $data->keterangan."',
			'-',
			'-',
			'".$this->userid."',
			sysdate,
			'".$data->jenis."',
			'".$sts_baru."',
			to_char(sysdate, 'YYYYMM'),
			'-',
			'-',
			'-',
			'-',
			'".$data->kode_ba."',
			'".$data->jns_trans."'
			
		) 
	");

	foreach($header->items as $add){			
		if(is_array($add)){
			foreach($add as $value){
				$jenis = $value->jenis;
				$no_urut = $value->no_urut;
				$v1 = $value->value1;
				$v2 = $value->value2;
				$v3 = $value->value3;
				$v4 = $value->value4;
				$v5 = $value->value5;
				$v6 = $value->value6;	

				$sql->add(array("insert into fca_check_dok_draft(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
				('$nomortagihan', '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
			}
		}else{
			$sql->add("insert into fca_check_dok_draft(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
			('$nomortagihan', '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
		}
	}

	$sql->add("update fca_regdok set status = '2' where reg_id = '".$data->reg_id."'");
	$sql->add("
		update fca_entrydok set no_tagihan='".$nomortagihan."', tgl_akhir = sysdate, status='".$sts_baru."'
		where reg_id='".$data->reg_id."' and status='".$statusbaru."'
	");	
	$sql->add("update fca_sla2 set tgl3= sysdate where reg_id = '".$data->reg_id."'");
	$sql->add("update fca_tagihan1 set status = '777' where reg_id = '".$data->reg_id."'");

	if($cttn != '-'){
		/*update catatan*/
		$idhitung = $db->execute("		
			select count(no_tagihan) as jumlah from fca_catatan
		");
		if ($rowbaru = $idhitung->FetchNextObject(false)){
			$jumlah = $rowbaru->jumlah;
		}
		$idno = 1 + $jumlah;
		$sql->add("
			insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
			values('".$idno."','".$nomortagihan."','".$this->userid."',sysdate,'".$cttn."')
		");
	}


	$ret = $db->execArraySQL($sql);
	return $ret;
}


function saveDraftAdmin($data,$header,$regid,$nmrtagihan,$status,$statusbaru,$cttn){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$value1='-';
	$value2='-';
	$value3='-';
	$value4='-';
	$value5='-';	
	$no_urut='-';
	// $nt="";
	// $nt .= "TO_CHAR(SYSDATE, 'YYMMDDHH24MISS'),";

	if($status == "New"){
		$sts_baru = "1";
		
	}else if($status == "Reject"){
		$sts_baru = "01";
		
	}

	$baris = 0;
	$baris = $db->execute("
		select count(no_draft) as n from fca_tagihan_draft
	");	
	if ($row = $baris->FetchNextObject(false)){
		$baris2 = $row->n;
	}	
	if($nmrtagihan == "1"){
		$nomortagihan = "1000000000" + $baris2;	
	}else{
		$nomortagihan = $nmrtagihan;
		$sql->add("delete from fca_tagihan_draft where no_draft = '".$nomortagihan."'");
		$sql->add("delete from fca_check_dok_draft where no_tagihan = '".$nomortagihan."'");
	}

	$no = 1000000000 + $baris2;
	$sql->add("
		insert into fca_tagihan_draft(
			no_draft, 
			no_tagihan,
			reg_id, 
			kode_vendor, 
			nama_proyek, 
			kode_akun, kode_cc, kode_rkm, termin, jenis_uang,
			no_kontrak, tgl_kontrak, nilai_kontrak, curr_kontrak,
			no_posp,tgl_posp,nilai_posp,curr_po,
			no_amd,tgl_amd,nilai_amd,curr_amd,
			nilai_tagihan, nilai_curr, curr,
			nilai_bayar, nilai_bayar_curr, curr_bayar,
			keterangan,
			no_spb,
			no_sap,
			nik_user,
			jenis,
			status,
			periode,
			nik_update,
			nik_update2,
			nik_reject,
			nik_reject2,
			kode_ba,
			jns_trans,
			tgl_input_admin
		)
		values(
			$nomortagihan,
			'$no',
			'".$data->reg_id."',
			'".$data->kode_vendor."',
			'". $data->nama_proyek."',

			'". $data->kode_akun."',
			'". $data->kode_cc."',
			'". $data->kode_rkm."',
			'". $data->termin."',
			'". $data->jenis_uang."',


			'". $data->no_kontrak."',
			TO_DATE('". $data->tgl_kontrak."', 'DD-MM-YYYY'),
			'". $data->nilai_kontrak."',
			'". $data->curr_kontrak."',
			'". $data->no_posp."',
			TO_DATE('". $data->tgl_posp."', 'DD-MM-YYYY'),
			'". $data->nilai_posp."',
			'". $data->curr_po."',
			'". $data->no_amd."',
			TO_DATE('". $data->tgl_amd."', 'DD-MM-YYYY'),
			'". $data->nilai_amd."',
			'". $data->curr_amd."',
			'". $data->nilai_tagihan."',
			'". $data->nilai_curr."',
			'". $data->curr."',
			'". $data->nilai_bayar."',
			'". $data->nilai_bayar_curr."',
			'". $data->curr_bayar."',
			'". $data->keterangan."',
			'-',
			'-',
			'".$this->userid."',
			'".$data->jenis."',
			'".$sts_baru."',
			to_char(sysdate, 'YYYYMM'),
			'-',
			'-',
			'-',
			'-',
			'".$data->kode_ba."',
			'".$data->jns_trans."',
			sysdate
			
		) 
	");

	foreach($header->items as $add){			
		if(is_array($add)){
			foreach($add as $value){
				$jenis = $value->jenis;
				$no_urut = $value->no_urut;
				$v1 = $value->value1;
				$v2 = $value->value2;
				$v3 = $value->value3;
				$v4 = $value->value4;
				$v5 = $value->value5;
				$v6 = $value->value6;	

				$sql->add(array("insert into fca_check_dok_draft(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
				($nomortagihan, '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
			}
		}else{
			$sql->add("insert into fca_check_dok_draft(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
			($nomortagihan, '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
		}
	}

	$sql->add("update fca_regdok set status = '3' where reg_id = '".$data->reg_id."'");	
	$sql->add("update fca_sla1 set tgl3= sysdate where reg_id = '".$data->reg_id."'");
	$sql->add("
		update fca_entrydokadm set no_tagihan='".$nomortagihan."', tgl_akhir = sysdate, status='".$sts_baru."'
		where reg_id='".$data->reg_id."' and status='".$statusbaru."'		 
	");	
	
	if($cttn != '-'){
		/*update catatan*/
		$idhitung = $db->execute("		
			select count(no_tagihan) as jumlah from fca_catatan
		");
		if ($rowbaru = $idhitung->FetchNextObject(false)){
			$jumlah = $rowbaru->jumlah;
		}
		$idno = 1 + $jumlah;
		$sql->add("
			insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
			values('".$idno."','".$nomortagihan."','".$this->userid."',sysdate,'".$cttn."')
		");
	}

	$ret = $db->execArraySQL($sql);
	return $ret;
}


function saveDraftDok2($data,$header,$nt,$status,$statusbaru,$cttn){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$value1='-';
	$value2='-';
	$value3='-';
	$value4='-';
	$value5='-';	
	$no_urut='-';
	
	

	if($status == "New"){
		$sts_baru = "2";
		// $nomortagihan = "1000000000" + $baris2;	
	}else{
		$sts_baru = "02";
		// $nomortagihan = $nt;
	}
	
	$sql->add("delete from fca_check_dok1 where no_tagihan = '$nt'");
	

		$sql->add("
			update fca_tagihan1 set 
				no_tagihan = '$nt',
				reg_id = '".$data->reg_id."',
				kode_vendor = '".$data->kode_vendor."', 
				nama_proyek = '". $data->nama_proyek."',
				kode_akun = '". $data->kode_akun."', kode_cc = '". $data->kode_cc."', kode_rkm = '". $data->kode_rkm."', termin = '". $data->termin."', jenis_uang = '". $data->jenis_uang."',
				no_kontrak = '". $data->no_kontrak."', tgl_kontrak = '". $data->tgl_kontrak."', nilai_kontrak = '". $data->nilai_kontrak."', curr_kontrak = '". $data->curr_kontrak."',
				no_posp = '". $data->no_posp."', tgl_posp = '". $data->tgl_posp."', nilai_posp = '". $data->nilai_posp."',curr_po = '". $data->curr_po."',
				no_amd = '". $data->no_amd."', tgl_amd = '". $data->tgl_amd."',nilai_amd = '". $data->nilai_amd."',curr_amd = '". $data->curr_amd."',
				nilai_tagihan = '". $data->nilai_tagihan."', nilai_curr = '". $data->nilai_curr."', curr = '". $data->curr."',
				nilai_bayar = '". $data->nilai_bayar."', nilai_bayar_curr = '". $data->nilai_bayar_curr."', curr_bayar ='". $data->curr_bayar."',
				keterangan='". $data->keterangan."',
			
				nik_user = '".$this->userid."',
				tgl_input = sysdate,
				jenis = '".$data->jenis."',
				status = '".$sts_baru."',
				periode = to_char(sysdate, 'YYYYMM'),
			
				kode_ba = '".$data->kode_ba."',
				jns_trans = '".$data->jns_trans."'
			where no_tagihan = '".$nt."'");

			foreach($header->items as $add){			
				if(is_array($add)){
					foreach($add as $value){
						$jenis = $value->jenis;
						$no_urut = $value->no_urut;
						$v1 = $value->value1;
						$v2 = $value->value2;
						$v3 = $value->value3;
						$v4 = $value->value4;
						$v5 = $value->value5;	
						$v6 = $value->value6;	
	
						$sql->add(array("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
						('".$nt."', '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
					}
				}else{
					$sql->add("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
					('".$nt."', '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
				}
			}


			$sql->add("update fca_regdok set status = '1' where reg_id = '".$data->reg_id."'");
			$sql->add("update fca_tagihan_draft set status = '7777' where reg_id = '".$data->reg_id."'");
			$sql->add("
				update fca_entrydok set no_tagihan='".$nt."', tgl_akhir = sysdate, status='".$sts_baru."'
				where reg_id='".$data->reg_id."' and status='".$statusbaru."'
			");	

			if($cttn != '-'){
				/*update catatan*/
				$idhitung = $db->execute("		
					select count(no_tagihan) as jumlah from fca_catatan
				");
				if ($rowbaru = $idhitung->FetchNextObject(false)){
					$jumlah = $rowbaru->jumlah;
				}
				$idno = 1 + $jumlah;
				$sql->add("
					insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
					values('".$idno."','".$nt."','".$this->userid."',sysdate,'".$cttn."')
				");
			}
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function saveDraftAdmin2($data,$header,$nt, $status, $statusbaru, $cttn){
	$db = $this->getDb();
	$sql = new server_util_arrayList();	
	$value1='-';
	$value2='-';
	$value3='-';
	$value4='-';
	$value5='-';	
	$no_urut='-';
	
	if($status == "New"){
			$sts_baru = "0";
			$baris = 0;
			$baris = $db->execute("
				select count(no_tagihan) as n from fca_tagihan1
			");
			if ($row = $baris->FetchNextObject(false)){
				$baris2 = $row->n;
			}			
			$nomortagihan = "1000000000" + $baris2;	

			$sql->add("
				insert into fca_tagihan1(
					no_tagihan, 
					reg_id, 
					kode_vendor, 
					nama_proyek, 
					kode_akun, kode_cc, kode_rkm, termin, jenis_uang,
					no_kontrak, tgl_kontrak, nilai_kontrak, curr_kontrak,
					no_posp,tgl_posp,nilai_posp,curr_po,
					no_amd,tgl_amd,nilai_amd,curr_amd,
					nilai_tagihan, nilai_curr, curr,
					nilai_bayar, nilai_bayar_curr, curr_bayar,
					keterangan,
					no_spb,
					no_sap,
					nik_user,
					tgl_input,
					jenis,
					status,
					periode,
					nik_update,
					nik_update2,
					nik_reject,
					nik_reject2,
					kode_ba,
					jns_trans,
					tgl_input_admin
				)
				values(
					'".$nomortagihan."',
					'".$data->reg_id."',
					'".$data->kode_vendor."',
					'". $data->nama_proyek."',
					'". $data->kode_akun."',
					'". $data->kode_cc."',
					'". $data->kode_rkm."',
					'". $data->termin."',
					'". $data->jenis_uang."',
					'". $data->no_kontrak."',
					'". $data->tgl_kontrak."',
					'". $data->nilai_kontrak."',
					'". $data->curr_kontrak."',
					'". $data->no_posp."',
					'". $data->tgl_posp."',
					'". $data->nilai_posp."',
					'". $data->curr_po."',
					'". $data->no_amd."',
					'". $data->tgl_amd."',
					'". $data->nilai_amd."',
					'". $data->curr_amd."',
					'". $data->nilai_tagihan."',
					'". $data->nilai_curr."',
					'". $data->curr."',
					'". $data->nilai_bayar."',
					'". $data->nilai_bayar_curr."',
					'". $data->curr_bayar."',
					'". $data->keterangan."',
					'-',
					'-',
					'".$this->userid."',
					sysdate,
					'".$data->jenis."',
					'".$sts_baru."',
					to_char(sysdate, 'YYYYMM'),
					'-',
					'-',
					'-',
					'-',
					'".$data->kode_ba."',
					'".$data->jns_trans."',
					sysdate
				) 
			");

	}else if($status == "Reject"){
			$sts_baru = "00";
			$sql->add("delete from fca_check_dok1 where no_tagihan = '$nt'");
			$nomortagihan = $nt;	
			$sql->add("
				update fca_tagihan1 set 
					no_tagihan = '$nt',
					reg_id = '".$data->reg_id."',
					kode_vendor = '".$data->kode_vendor."', 
					nama_proyek = '". $data->nama_proyek."',
					kode_akun = '". $data->kode_akun."', kode_cc = '". $data->kode_cc."', kode_rkm = '". $data->kode_rkm."', termin = '". $data->termin."', jenis_uang = '". $data->jenis_uang."',
					no_kontrak = '". $data->no_kontrak."', tgl_kontrak = '". $data->tgl_kontrak."', nilai_kontrak = '". $data->nilai_kontrak."', curr_kontrak = '". $data->curr_kontrak."',
					no_posp = '". $data->no_posp."', tgl_posp = '". $data->tgl_posp."', nilai_posp = '". $data->nilai_posp."',curr_po = '". $data->curr_po."',
					no_amd = '". $data->no_amd."', tgl_amd = '". $data->tgl_amd."',nilai_amd = '". $data->nilai_amd."',curr_amd = '". $data->curr_amd."',
					nilai_tagihan = '". $data->nilai_tagihan."', nilai_curr = '". $data->nilai_curr."', curr = '". $data->curr."',
					nilai_bayar = '". $data->nilai_bayar."', nilai_bayar_curr = '". $data->nilai_bayar_curr."', curr_bayar ='". $data->curr_bayar."',
					keterangan='". $data->keterangan."',
				
					nik_user = '".$this->userid."',
					tgl_input = sysdate,
					jenis = '".$data->jenis."',
					status = '".$sts_baru."',
					periode = to_char(sysdate, 'YYYYMM'),
				
					kode_ba = '".$data->kode_ba."',
					jns_trans = '".$data->jns_trans."'
				where no_tagihan = '".$nt."'"
			);	
			
	}	


	foreach($header->items as $add){			
		if(is_array($add)){
			foreach($add as $value){
				$jenis = $value->jenis;
				$no_urut = $value->no_urut;
				$v1 = $value->value1;
				$v2 = $value->value2;
				$v3 = $value->value3;
				$v4 = $value->value4;
				$v5 = $value->value5;	
				$v6 = $value->value6;	

				$sql->add(array("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
				('".$nomortagihan."', '".$jenis."','".$no_urut."','1','".$v1."','".$v2."','".$v3."','".$v4."','".$v5."','".$v6."')"));
			}
		}else{
			$sql->add("insert into fca_check_dok1(no_tagihan, jenis, no_urut, subno, value1, value2, value3, value4, value5, value6)values
			('".$nomortagihan."', '".$add->jenis."','".$add->no_urut."','1','".$add->value1."','".$add->value2."','".$add->value3."','".$add->value4."','".$add->value5."','".$add->value6."')");
		}
	}


	$sql->add("update fca_tagihan_draft set no_tagihan = '$nomortagihan' where no_draft = '$nt'");	
	$sql->add("update fca_regdok set status = '1' where reg_id = '".$data->reg_id."'");
	$sql->add("
		update fca_entrydokadm set no_tagihan='".$nomortagihan."', tgl_akhir = sysdate, status='".$statusbaru."'
		where reg_id='".$data->reg_id."' and status='".$sts_baru."'
	");	
	$sql->add("update fca_sla1 set tgl2 = sysdate where reg_id = '".$data->reg_id."'");	
	$sql->add("update fca_tagihan_draft set status = '7777' where reg_id = '".$data->reg_id."'");

	if($cttn != '-'){
		/*update catatan*/
		$idhitung = $db->execute("		
			select count(no_tagihan) as jumlah from fca_catatan
		");
		if ($rowbaru = $idhitung->FetchNextObject(false)){
			$jumlah = $rowbaru->jumlah;
		}
		$idno = 1 + $jumlah;
		$sql->add("
			insert into fca_catatan(id,no_tagihan,nik_user,tanggal,note) 
			values('".$idno."','".$nomortagihan."','".$this->userid."',sysdate,'".$cttn."')
		");
	}
			
	
	$ret = $db->execArraySQL($sql);
	return $ret;
}



function getDraft($regid){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
	select a.no_tagihan, a.reg_id, a.kode_vendor as kode_vendor_tagihan, a.nama_proyek, a.no_kontrak, to_char(a.tgl_kontrak, 'DD/MM/YY') as tgl_kontrak, a.nilai_kontrak, a.no_posp,to_char(a.tgl_posp, 'DD/MM/YY') as tgl_posp,a.nilai_posp,a.no_amd,to_char(a.tgl_amd, 'DD/MM/YY') as tgl_amd,a.nilai_amd,a.nilai_tagihan,a.nilai_bayar,a.nilai_curr,a.curr,a.curr_kontrak,a.curr_po,a.curr_amd,a.keterangan,a.no_spb,a.no_sap,a.nik_user as nik_user_tagihan,a.jenis,a.nilai_bayar_curr,a.curr_bayar,a.periode
			,to_char(a.tgl_input, 'DD/MM/YYYY') as tgl_input_tagihan,to_char(b.tgl_input, 'DD/MM/YYYY') as tgl_input_regdok,b.kode_vendor as kode_vendor_regdok,b.nik_user as nik_user_regdok,b.status,
			a.kode_akun, a.kode_cc, a.kode_rkm, a.termin, a.jenis_uang, a.kode_ba, a.jns_trans
			from fca_tagihan_draft a
            join fca_regdok b on a.reg_id=b.reg_id 
            where b.reg_id = '$regid' or a.status='3' or a.status ='03' order by a.reg_id
	");
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
		$no_tagihan = $row->no_tagihan;
	}

	$rs2 = $db->execute("
	select * from fca_check_dok_draft where no_tagihan='$no_tagihan'
	");
	while ($row2 = $rs2->FetchNextObject(false)){
		$result["detail"][] = (array)$row2;		
	}
	return $result;
}

function getDraftAdmin($regid){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
	select a.no_draft, a.reg_id, a.kode_vendor as kode_vendor_tagihan, a.nama_proyek, a.no_kontrak, to_char(a.tgl_kontrak, 'DD/MM/YY') as tgl_kontrak, a.nilai_kontrak, a.no_posp,to_char(a.tgl_posp, 'DD/MM/YY') as tgl_posp,a.nilai_posp,a.no_amd,to_char(a.tgl_amd, 'DD/MM/YY') as tgl_amd,a.nilai_amd,a.nilai_tagihan,a.nilai_bayar,a.nilai_curr,a.curr,a.curr_kontrak,a.curr_po,a.curr_amd,a.keterangan,a.no_spb,a.no_sap,a.nik_user as nik_user_tagihan,a.jenis,a.nilai_bayar_curr,a.curr_bayar,a.periode
			,to_char(a.tgl_input, 'DD/MM/YYYY') as tgl_input_tagihan,to_char(b.tgl_input, 'DD/MM/YYYY') as tgl_input_regdok,b.kode_vendor as kode_vendor_regdok,b.nik_user as nik_user_regdok,b.status,
			a.kode_akun, a.kode_cc, a.kode_rkm, a.termin, a.jenis_uang, a.kode_ba, a.jns_trans, a.kode_ba
			from fca_tagihan_draft a
            join fca_regdok b on a.reg_id=b.reg_id 
            where b.reg_id = '$regid' and a.status='1' or a.status='01' order by a.reg_id
	");
	// error_log(print_r($rs, true));
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
		$no_draft = $row->no_draft;
	}

	$rs2 = $db->execute("
	select * from fca_check_dok_draft where no_tagihan='$no_draft'
	");
	// error_log(print_r($rs, true));
	while ($row2 = $rs2->FetchNextObject(false)){
		$result["detail"][] = (array)$row2;		
	}
	return $result;
}

function getRejectDoc($regid){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
	select a.no_tagihan, a.reg_id, a.kode_vendor as kode_vendor_tagihan, a.nama_proyek, a.no_kontrak, to_char(a.tgl_kontrak, 'DD/MM/YY') as tgl_kontrak, a.nilai_kontrak, a.no_posp,to_char(a.tgl_posp, 'DD/MM/YY') as tgl_posp,a.nilai_posp,a.no_amd,to_char(a.tgl_amd, 'DD/MM/YY') as tgl_amd,a.nilai_amd,a.nilai_tagihan,a.nilai_bayar,a.nilai_curr,a.curr,a.curr_kontrak,a.curr_po,a.curr_amd,a.keterangan,a.no_spb,a.no_sap,a.nik_user as nik_user_tagihan,a.jenis,a.nilai_bayar_curr,a.curr_bayar,a.periode
		,to_char(a.tgl_input, 'DD/MM/YYYY') as tgl_input_tagihan,to_char(b.tgl_input, 'DD/MM/YYYY') as tgl_input_regdok,b.kode_vendor as kode_vendor_regdok,b.nik_user as nik_user_regdok,b.status,
		a.kode_akun, a.kode_cc, a.kode_rkm, a.termin, a.jenis_uang, a.kode_ba, a.jns_trans
		from fca_tagihan1 a
		join fca_regdok b on a.reg_id=b.reg_id 
		where b.reg_id = '$regid'
	");
	// error_log(print_r($rs, true));
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
		$no_tagihan = $row->no_tagihan;
	}

	$rs2 = $db->execute("
		select * from fca_check_dok1 where no_tagihan='$no_tagihan'
	");
	// error_log(print_r($rs, true));
	while ($row2 = $rs2->FetchNextObject(false)){
		$result["detail"][] = (array)$row2;		
	}
	
	return $result;
}

function getDokAdmin($regid){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
	select a.no_tagihan, a.reg_id, a.kode_vendor as kode_vendor_tagihan, a.nama_proyek, a.no_kontrak, to_char(a.tgl_kontrak, 'DD/MM/YY') as tgl_kontrak, a.nilai_kontrak, a.no_posp,to_char(a.tgl_posp, 'DD/MM/YY') as tgl_posp,a.nilai_posp,a.no_amd,to_char(a.tgl_amd, 'DD/MM/YY') as tgl_amd,a.nilai_amd,a.nilai_tagihan,a.nilai_bayar,a.nilai_curr,a.curr,a.curr_kontrak,a.curr_po,a.curr_amd,a.keterangan,a.no_spb,a.no_sap,a.nik_user as nik_user_tagihan,a.jenis,a.nilai_bayar_curr,a.curr_bayar,a.periode
		,to_char(a.tgl_input, 'DD/MM/YYYY') as tgl_input_tagihan,to_char(b.tgl_input, 'DD/MM/YYYY') as tgl_input_regdok,b.kode_vendor as kode_vendor_regdok,b.nik_user as nik_user_regdok,b.status,
		a.kode_akun, a.kode_cc, a.kode_rkm, a.termin, a.jenis_uang, a.kode_ba, a.jns_trans
		from fca_tagihan1 a
		join fca_regdok b on a.reg_id=b.reg_id 
		where b.reg_id = '$regid'
	");
	// error_log(print_r($rs, true));
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
		$no_tagihan = $row->no_tagihan;
	}

	$rs2 = $db->execute("
		select * from fca_check_dok1 where no_tagihan='$no_tagihan'
	");
	// error_log(print_r($rs, true));
	while ($row2 = $rs2->FetchNextObject(false)){
		$result["detail"][] = (array)$row2;		
	}
	
	return $result;
}



function getBaDis($regid){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
	select kode_ubis from fca_regdok where reg_id='$regid'
	");

	// error_log(print_r($rs, true));
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
	}
	
	return $result;
}


function getBank($kodevendor){
	$db = $this->getDb();
	$result = array();	
	$rs = $db->execute("
	select a.kode_vendor, a.nama, a.alamat, a.no_telp,
		nvl(b.kode_bank,'') as kode_bank, nvl(b.nama, '') as nama_bank, nvl(b.no_rek,'') as no_rek, nvl(b.an_rek,'') as an_rek
	from sap_vendor a 
	left outer join sap_bank_vendor b on a.kode_vendor=b.kode_vendor where a.kode_vendor='$kodevendor'
	");
	// error_log(print_r($rs, true));
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
	}	
	return $result;
}


function getNT($regid){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
	select no_tagihan from fca_regdok where reg_id='$regid'
	");

	// error_log(print_r($rs, true));
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
	}
	
	return $result;
}


function getDetailApp($regid){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
	select a.no_tagihan, a.reg_id, a.kode_vendor as kode_vendor_tagihan, a.nama_proyek, a.no_kontrak, to_char(a.tgl_kontrak, 'DD/MM/YY') as tgl_kontrak, a.nilai_kontrak, a.no_posp,to_char(a.tgl_posp, 'DD/MM/YY') as tgl_posp,a.nilai_posp,a.no_amd,to_char(a.tgl_amd, 'DD/MM/YY') as tgl_amd,a.nilai_amd,a.nilai_tagihan,a.nilai_bayar,a.nilai_curr,a.curr,a.curr_kontrak,a.curr_po,a.curr_amd,a.keterangan,a.no_spb,a.no_sap,a.nik_user as nik_user_tagihan,a.jenis,a.nilai_bayar_curr,a.curr_bayar,a.periode
		,to_char(a.tgl_input, 'DD/MM/YYYY') as tgl_input_tagihan,to_char(b.tgl_input, 'DD/MM/YYYY') as tgl_input_regdok,b.kode_vendor as kode_vendor_regdok,b.nik_user as nik_user_regdok,b.status,
		a.kode_akun, a.kode_cc, a.kode_rkm, a.termin, a.jenis_uang, a.kode_ba, a.jns_trans
		from fca_tagihan1 a
		join fca_regdok b on a.reg_id=b.reg_id 
		where b.reg_id = '$regid'
	");
	while ($row = $rs->FetchNextObject(false)){
		$result["induk"] = (array)$row;
		$no_tagihan = $row->no_tagihan;
	}

	$rs2 = $db->execute("
		select * from fca_check_dok1 where no_tagihan='$no_tagihan'
	");
	while ($row2 = $rs2->FetchNextObject(false)){
		$result["detail"][] = (array)$row2;		
	}
	
	return $result;
}

//EDIT SAP dan EDIT SPB
function getNoTagihanSAP($no,$nama){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	if ($kode != "" && $nama != ""){
		$rs = $db->LimitQuery("
			select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb from fca_tagihan1 where (no_sap='-' or status = '02' or status ='2' and no_tagihan like '$no%' or lower(nama_proyek) like '%$nama%') order by nama_proyek
			
		", 50, 0);
	}else if ($kode != ""){
		$rs = $db->LimitQuery("select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb from fca_tagihan1 where (no_sap='-' or status = '02' or status ='2'  and no_tagihan like '$no%' ) order by no_tagihan", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb from fca_tagihan1 where (no_sap='-' or status = '02' or status ='2'  and nama_proyek like '%$nama%') order by no_tagihan", 50, 0);
	else
		$rs = $db->LimitQuery("select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb from fca_tagihan1 where no_sap='-' or status = '02' or status ='2'  ", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}

function getNoTagihanSPB($no,$nama){
	$db = $this->getDb();
	$user = $this->userid;//$_SESSION["user"];;
	if ($kode != "" && $nama != ""){
		$rs = $db->LimitQuery("
			select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb 
			from fca_tagihan1 where (status = '5' or status = '50' and no_tagihan like '$no%' or lower(nama_proyek) like '%$nama%') order by nama_proyek
			
		", 50, 0);
	}else if ($kode != ""){
		$rs = $db->LimitQuery("select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb from fca_tagihan1 where (status = '5' or status = '50' and no_tagihan like '$no%' ) order by no_tagihan", 50, 0);
	}else if ($nama != "")
		$rs = $db->LimitQuery("select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb from fca_tagihan1 where (status = '5' or status = '50' and nama_proyek like '%$nama%') order by no_tagihan", 50, 0);
	else
		$rs = $db->LimitQuery("select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, no_spb from fca_tagihan1 where status = '5' or status = '50' ", 50, 0);
	
	$result = array("rs" => array("rows" => array()));
	$first = true;
	$level = 0;
	while ($row = $rs->FetchNextObject(false)){
		if ($first){
			$level = $row->level_spasi;
		}
		$row->level_spasi = $row->level_spasi - $level; 
		$result["rs"]["rows"][] = (array)$row;
		$first = false;
	}
	$result["totalPage"] = 0;
	return $result;
}

function getNoTagihanSAP2($notagihan){
	$rs = $this->db->execute("
		select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, reg_id, no_spb 
		from fca_tagihan1 
		where no_tagihan='$notagihan' 
	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}

function getNoTagihanSPB2($notagihan){
	$rs = $this->db->execute("
		select no_tagihan, 0 as level_spasi, nama_proyek, no_sap, reg_id, no_spb 
		from fca_tagihan1 
		where no_tagihan='$notagihan'
	", array($lokasi, $kode_draft));
	$result["draft"] = array();
	if ($row = $rs->FetchNextObject(false)){
			$result["draft"] = (array) $row;
	}
	return $result;
}


function editSAP($data,$regid,$status){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$sql->add("
		update fca_tagihan1 set no_sap = '".$data->no_sap."' , tgl_input_sap = sysdate
		where no_tagihan = '".$data->no_tagihan."'
	");
	$sql->add("update fca_sla2 set tgl2 = sysdate where reg_id = '".$regid."'");	
	$sql->add("
		update fca_entrydok set no_tagihan='".$data->no_tagihan."', tgl_akhir = sysdate
		where reg_id='".$regid."' and status='SAP'		 
	");	
	$ret = $db->execArraySQL($sql);
	return $ret;
}


function editSPB($data,$regid){
	$db = $this->getDb();
	$sql = new server_util_arrayList();
	$sql->add("
		update fca_tagihan1 set no_spb = '".$data->no_spb."' 
		where no_tagihan = '".$data->no_tagihan."'
	");
	$sql->add("update fca_sla3 set tgl2 = sysdate where reg_id = '".$regid."'");	
	$sql->add("
		update fca_entrydok set no_tagihan='".$data->no_tagihan."', tgl_akhir = sysdate
		where reg_id='".$regid."' and status='SPB'		 
	");	
	$ret = $db->execArraySQL($sql);
	return $ret;
}


//REPORT TUK
function getRepTuk01(){
	$db = $this->getDb();
	$result = array();
	$rs = $db->execute("
		select a.reg_id,a.no_tagihan,a.nama_proyek,a.kode_vendor,b.nama from fca_tagihan1 a join 
		sap_vendor b on a.kode_vendor=b.kode_vendor 

	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}

function getRepTuk($regid){
	$db = $this->getDb();
	$result = array();
	// $rs = $db->execute("
	// 	select * from fca_tagihan1 a join des_mitra b on a.kode_vendor=b.kode_vendor where a.status='1' and a.reg_id='$regid'
	// ");
	$rs = $db->execute("
	select * from fca_tagihan1 a 
	join sap_vendor b on a.kode_vendor=b.kode_vendor
	join fca_check_dok1 c on a.no_tagihan=c.no_tagihan
	where a.status='1' and a.reg_id='$regid'
	");
	while ($row = $rs->FetchNextObject(false)){
		
		$no_tagihan = $row->no_tagihan;
		$nama = $row->nama;
		$nik = $row->nik;
		$jabatan = $row->jabatan;

		$nama2 = $row->nama2;
		$nik2 = $row->nik2;
		$jabatan2 = $row->jabatan2;

		$nilai_tagihan = $row->nilai_tagihan;
		$terbilang = $this->terbilang($row->nilai_tagihan);
		$n1 = $row->nilai_tagihan*100/110;
		$n2 = $n1 * 10 / 100;

		$pph23 = $n1 * 2 / 100;
		$jml_dibayar = $n1 - $pph23;

		if($row->no_urut == "8"){
			$norek = $row->value1;
			$bank = $row->value2;			
		}


	}

	
	
	// error_log($jenis);
	

	echo" 
		<table width='100%' border='0'>
			<tr>
				<td colspan='6' width='50%' align='center'><b>SURAT PERMINTAAN PEMBAYARAN<b></td>
			</tr>
			<tr>
				<td colspan='3' width='50%' align='left'><u>Catatan Di Direktorat Asal<u></td>
				<td colspan='3' width='50%' align='left'><u><u></td>
			</tr>
			<tr>
				<td align='left' width='15%'>1. Nomor</td>
				<td width='2%'>:</td>
				<td align='left'>$no_tagihan</td>
				<td align='left' width='15%'></td>
				<td width='2%'></td>
				<td></td>
			</tr>
			<tr>
				<td align='left'>2. Tanggal</td>
				<td>:</td>
				<td></td>
				<td align='left'></td>
				<td></td>
				<td></td>
			</tr>
			<tr>
				<td align='left'>3. Kode Perkiraan</td>
				<td></td>
				<td></td>
				<td align='left'></td>
				<td>:</td>
				<td></td>
			</tr>
			<tr>
				<td align='left'>4. Cost Center</td>
				<td></td>
				<td></td>
				<td align='left'></td>
				<td>:</td>
				<td></td>
			</tr>
			<tr>
				<td align='left'>5. Kode Aktivitas</td>
				<td>:</td>
				<td></td>
				<td></td>
				<td>:</td>
				<td></td>
			</tr>
			<tr>
				<td align='left'>6. Vendor</td>
				<td>:</td>
				<td></td>
				<td></td>
				<td>:</td>
				<td></td>
			</tr>	
			<tr height='30px'></tr>		
		</table>

		<table width='100%' border='0'>
			<tr>
				<td align='left' colspan='3'>Kepada SM Finance Area 05 Diminta Untuk Membayarkan Uang Sebesar :</td>
			</tr>
			<tr>
				<td width='15%'align='left'>Rp $nilai_tagihan</td>
				<td colspan='2' align='left'>($terbilang rupiah)</td>
			</tr>
			<tr height='30px'></tr>
			<tr>
				<td width='15%'align='left'>Kepada</td>
				<td>:</td>
				<td align='left'> PT GRAHA SARANA DUTA </td>
			</tr>
			<tr>
				<td width='15%'align='left'>Alamat</td>
				<td>:</td>
				<td align='left'> JL KEBON SIRIH JAKARTA </td>
			</tr>
			<tr>
				<td width='15%'align='left'>No. Rek.</td>
				<td>:</td>
				<td align='left'> 123-0098-158-51-4 </td>
			</tr>
			<tr>
				<td width='15%'align='left'>Pada Bank</td>
				<td>:</td>
				<td align='left'> Mandiri </td>
			</tr>
			<tr>
				<td width='15%'align='left'>Alamat Bank</td>
				<td>:</td>
				<td align='left'> Bank Mandiri Cabang Wisma Alia</td>
			</tr>
			<tr>
				<td width='15%'align='left'>Untuk Pembayaran</td>
				<td>:</td>
				<td align='left'> Tagihan Pekerjaan Revitalisasi Gedung Telkom Regional 3 Jabar Semester II tahun 2017</td>
			</tr>
			<tr height='15px'></tr>
		</table>
		<table width='100%'>
			<tr>
				<td width='25%' align='center'></td>
				<td></td>
				<td width='25%' align='center'> Bandung, 19 Januari 2018</td>
			</tr>
			<tr>
				<td width='25%' align='center'>$jabatan</td>
				<td></td>
				<td width='25%' align='center'> $jabatan2 </td>
			</tr>
			<tr height='80px'></tr>
			<tr>
				<td width='25%' align='center'><u>$nama<u></td>
				<td></td>
				<td width='25%' align='center'><u>$nama2<u></td>
			</tr>
			<tr>
				<td width='25%' align='center'>NIK. $nik</td>
				<td></td>
				<td width='25%' align='center'>NIK. $nik2</td>
			</tr>
		</table>

		<table width='100%' style='margin-top:20px' border='1'>
			<tr style='background-color:lightsteelblue'>
				<td colspan='4' align='left'><b>DIVERIFIKASI OLEH FINANCE<b></td>
			</tr>
			<tr>
				<td align='left'><b>Catatan Pembayaran :<b></td>
				<td colspan='3' align='right'>test</td>
			</tr>
			<tr>
				<td align='left'><b>Jumlah Tagihan :<b></td>
				<td colspan='4' align='right'>Rp ".number_format($n1)."</td>
			</tr>
			<tr>
				<td width='20%' align='left'>PPN (10%) X</td>
				<td width='20%' align='right'>Rp ".number_format($n1)."</td>
				<td width='20%' align='right'>Rp ".number_format($n2)."</td>
				<td width='20%'></td>
			</tr>
			<tr>
				<td width='20%' align='left'>PPN (10%) X</td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
				<td width='20%'></td>
			</tr>
			<tr>
				<td width='20%' align='left'>PPN (10%) X</td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
				<td width='20%'></td>
			</tr>
			<tr>
				<td width='20%' align='left'>PPN (10%) X</td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
				<td width='20%'></td>
			</tr>
			<tr>
				<td width='20%' align='left'>KJPE PPN (10%) X</td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
			</tr>
			<tr>
				<td width='20%' colspan='3' align='right'>Total</td>
				<td width='20%' align='right'>(Rp 1.075.000.000)</td>
			</tr>
			<tr>
				<td align='left' coslpan='1'><b>Potongan :<b></td>
				<td colspan='3' align='right'></td>
			</tr>        
			<tr>
				<td width='20%' align='left'>PPH 21 (  %) X</td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
			</tr>
			<tr>
				<td width='20%' align='left'>PPH 22 (1,5%) X</td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
			</tr>
			<tr>
				<td width='20%' align='left'>PPH 23 (2%) X</td>
				<td width='20%' align='right'>Rp ".number_format($n1)."</td>
				<td width='20%' align='right'>Rp ".number_format($pph23)."</td>
				<td width='20%' align='right'></td>
			</tr>
			<tr>
				<td width='20%' align='left'>PPH... (%) X</td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
				<td width='20%' align='right'></td>
			</tr>
			<tr>
				<td width='20%' colspan='3' align='right'>Jml Potongan</td>
				<td width='20%' align='right'>Rp ".number_format($pph23)."</td>
			</tr>
			<tr>
				<td width='20%' align='right' colspan='3'>Jumlah Yang Dibayar</td>
				<td width='20%' align='right'>Rp ".number_format($jml_dibayar)."</td>
			</tr>
		</table>
		 
	";


	$rs2 = $db->execute("
		select a.jenis,a.no_tagihan,b.reg_id 
		from fca_check_dok1 a 
		join fca_tagihan1 b on a.no_tagihan=b.no_tagihan
		where b.reg_id='$regid'
	");
	while ($row2 = $rs2->FetchNextObject(false)){	
		$jenis = $row2->jenis;	
		if($jenis == "ST"){
			$cek1 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "INV"){
			$cek2 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "POSP"){
			$cek3 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "BAP"){
			$cek4 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "BAST"){
			$cek5 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "PUM"){
			$cek6 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "KPPN"){
			$cek7 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "RKN"){
			$cek8 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "FP"){
			$cek9 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "JUM"){
			$cek10 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "JAPEL"){
			$cek11 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "JAPEM"){
			$cek12 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "PA"){
			$cek13 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "TTABD"){
			$cek14 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "SIUJK"){
			$cek15 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "NPWP"){
			$cek16 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "FDGT"){
			$cek17 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "COO"){
			$cek18 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "SL"){
			$cek19 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
		if($jenis == "DH"){
			$cek20 = "<img width='15px' height='15px' src='../icon/dialog-apply1.png'/>";
		}
	}
	echo"
		<table width='100%' border='1' style='margin-top:20px'>
		<tr style='background-color:lightsteelblue'>
			<td align='left' colspan='3'><b>CEKLIST VERIFIKASI PAJAK<b></td>
			<td align='left' colspan='4'><b>CEKLIST VERIFIKASI PEMBAYARAN<b></td>
		</tr>
		<tr>
			<td align='left' width='30%'>1.Faktur Pajak Standar</td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>1.Kontrak/Perjanjian</td>
			<td align='center'>$cek1</td>
			<td align='left' width='30%'>11. Polis Asuransi</td>
			<td align='center'>$cek11</td>
		</tr>
		<tr>
			<td align='left' width='30%'>2.Pernyataan Vendor Non PKP</td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>2.Surat Penagihan</td>
			<td align='center'>$cek2</td>
			<td align='left' width='30%'>12. Purchase Order</td>
			<td align='center'>$cek12</td>
		</tr>
		<tr>
			<td align='left' width='30%'>3.Keabsahan Faktur Pajak</td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>3. Kwitansi</td>
			<td align='center'>$cek3</td>
			<td align='left' width='30%'>13. Penerimaan Brg</td>
			<td align='center'>$cek13</td>
		</tr>
		<tr>
			<td align='left' width='30%'>4.Surat Setoran Pajak Faktur Pajak</td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>4. Faktur/Invoice/NotaKwitansi</td>
			<td align='center'>$cek4</td>
			<td align='left' width='30%'>14. Anggaran</td>
			<td align='center'>$cek14</td>
		</tr>
		<tr>
			<td align='left' width='30%'>5.Tax Treaty (P3B dgn Negara..............)</td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>5. Srt Pengantar Brg</td>
			<td align='center'>$cek5</td>
			<td align='left' width='30%'>15. iF 02/IF 03</td>
			<td align='center'>$cek15</td>
		</tr>
		<tr>
			<td align='left' width='30%'>6. </td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>6. Jaminan</td>
			<td align='center'>$cek6</td>
			<td align='left' width='30%'>16.</td>
			<td align='center'></td>
		</tr>
		<tr>
			<td align='left' width='30%'>7. </td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>7. BA Pemeriksaan Brg</td>
			<td align='center'>$cek7</td>
			<td align='left' width='30%'>17.</td>
			<td></td>
		</tr>
		<tr>
			<td align='left' width='30%'>8. </td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>8. BA Prestasi Phisik</td>
			<td align='center'>$cek8</td>
			<td align='left' width='30%'>18. </td>
			<td></td>
		</tr>	
		<tr>
			<td align='left' width='30%'>9. </td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>9. BA Serah Terima</td>
			<td align='center'>$cek9</td>
			<td align='left' width='30%'>19. </td>
			<td></td>
		</tr>	
		<tr>
			<td align='left' width='30%'>10. </td>
			<td align='center'>YA</td>
			<td align='center'>TIDAK</td>
			<td align='left' width='30%'>10. Justifikasi</td>
			<td align='center'>$cek10</td>
			<td align='left' width='30%'>20. </td>
			<td></td>
		</tr>	
		
	</table>
	<table width='100%' style='margin-top:20px' border='0'>
		<tr>
			<td colspan='4' width='60%'> </td>
			<td colspan='4' align='center' width='40%'>VERIFIKASI KAS BANK</td>
		</tr>
		<tr>
			<td colspan='4' width='60%'> </td>
			<td colspan='2' top='0' align='center' width='20%'>OFF.KAS BANK</td>
			<td colspan='2' top='0' align='center' width='20%'>MGR KAS BANK</td>
		</tr> 
		<tr>
			<td colspan='4' height='80px' width='60%'> </td>
			<td colspan='2' height='80px' top='0' align='center' width='20%'></td>
			<td colspan='2' height='80px' top='0' align='center' width='20%'></td>
		</tr>
		<tr>
			<td border='1' colspan='4' width='60%'> </td>
			<td border='1' colspan='2' align='center' width='20%'><u>Nama Orang<u></td>
			<td border='1' colspan='2' align='center' width='20%'><u>Nama Orang<u></td>
		</tr> 
		<tr>
			<td colspan='4' width='60%'> </td>
			<td border='1' colspan='2' align='center' width='20%'>NIK.670210</td>
			<td border='1' colspan='2' align='center' width='20%'>NIK. 890987</td>
		</tr> 
	</table>
	";

	return "";
}


function getRepSLA(){
	$db = $this->getDb();
	$result = array();
	
	$rs = $db->execute("
		select a.no_tagihan, 
			nvl(a.waktu,'-') as waktu1, 
			nvl(b.waktu,'-') as waktu2, 
			nvl(c.waktu,'-') as waktu3, 
			nvl(a.waktu4,'-') as waktu4, 
			nvl(b.waktu5,'-') as waktu5				
				from (select b.no_tagihan,hour_diff(tgl1,tgl2) as waktu, hour_diff(tgl3,tgl4) as waktu4
					from fca_sla1 a
					join fca_tagihan1 b on a.reg_id=b.reg_id) a 
	
		left outer join (select b.no_tagihan,hour_diff(tgl1,tgl2) as waktu, hour_diff(tgl3,tgl4) as waktu5
							from fca_sla2 a 
							join fca_tagihan1 b on a.reg_id=b.reg_id) b 
					on a.no_tagihan=b.no_tagihan

		left outer join (select b.no_tagihan,hour_diff(tgl1,tgl2) as waktu
							from fca_sla3 a 
							join fca_tagihan1 b on a.reg_id=b.reg_id) c 
					on b.no_tagihan=c.no_tagihan 
	");
	while ($row = $rs->FetchNextObject(false)){
		$result[] = (array)$row;
	}
	return $result;
}


	// $rs = $db->execute("
	// with rws as (
	// 	select a.no_tagihan as nt,
	// 		 a.tgl_input as t2, 
	// 		 b.tgl_input as t1
	// 	from fca_tagihan1 a 
	// 	join fca_regdok b on a.reg_id=b.reg_id
	// ), tstamps as (
	//   select to_timestamp(to_char(t1, 'yyyy-mm-dd hh24:mi:ss'), 'yyyy-mm-dd hh24:mi:ss') t1,
	// 		 to_timestamp(to_char(t2, 'yyyy-mm-dd hh24:mi:ss'), 'yyyy-mm-dd hh24:mi:ss') t2,
	// 		 nt
	//   from rws
	// )
	// select 
	// 	nt,
	// 	trunc(months_between(t2, t1)/12) || ' Tahun ' as thn,
	// 	trunc(mod(months_between(t2, t1), 12)) || ' Bulan ' as bln,
	// 	extract(day from (t2-t1)) hari, 
	// 	extract(hour from (t2-t1)) jam, 
	// 	extract(minute from (t2-t1)) menit,  
	// 	extract(second from (t2-t1)) detik,
	// 	t2-t1 wkt_interval
	// from tstamps
	  
	// ");




}
?>
