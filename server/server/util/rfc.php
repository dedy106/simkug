<?php
/***********************************************************************************************
*	Copyright (c) 2008 SAI
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("server_BasicObject");
uses("server_util_Map");
uses("server_util_arrayList");
uses("server_util_rfcLib");
class server_util_rfc  extends server_BasicObject
{
	protected $options;
	protected $rfc;
	function __construct($options = null)
	{
		parent::__construct();		
		$this->options = $options;		
	}
	protected function doSerialize()
	{
		parent::doSerialize();
		$this->serialize("options", "string",$this->options);
	}
	function init()
	{
		parent::init();		
	}
	function deinit()
	{
		parent::deinit();
	}
	/****************************
	 * ceksaldo2(login, value)
	 * fungsi : untuk mengambil saldo Anggaran
	 * import : IM_ACCGROUP = Group Akun SAP. default E = Expense
	 * 			IM_FICTR = Cost Center
	 * 			IM_FIKRS = Financial Area = 1000 untuk Telkom
	 * 			IM_KOKRS = Controlling Area = 1000 untuk Telkom
	 * 			IM_FIPEX = Akun Expense
	 * 			IM_FT_WRTTP = Value Type untuk anggaran (default 64)
	 * 			IM_GJAHR = Tahun
	 * 			IM_PERFROM = Periode dari bulan n
	 * 			IM_PERTO = Periode sampai bulan m
	 * 			IM_VERSN = jenis saldo yang akan diambil. = 0 (Payment) / 7 (commitment)
	 * Export : none
	 * Table : RESTABLE = result table
	 * login = map(user = value, passwd = value);
	 * 
	*/
	function cekSaldo2($login, $value){
		$this->rfc = new server_util_rfcLib($this->options);
		$sapImp = new server_util_Map(array("IM_ACCGROUP" => "E" ,
								"IM_FICTR" => $value->get("cc"),
								"IM_FIKRS" => "1000",
								"IM_FIPEX" => $value->get("akun"),
								"IM_FT_WRTTP" => "64" ,
								"IM_GJAHR" => $value->get("tahun"),
								"IM_KOKRS" => "1000",
								"IM_PERFROM" => "0". $value->get("bln1"),
								"IM_PERTO" => "0".$value->get("bln2"),
								"IM_VERSN" => "00".$value->get("ver")));
		$sapExpTable = new server_util_Map(array("RESTABLE"));		
		return $this->rfc->callRFC($login,"ZFMFI_CEKSALDO", $sapImp, $sapExpTable, null, null, true);		
	}
	/*******************************************
	 * fungsi : untuk mengambil saldo Anggaran untuk beberapa akun, cc, dan bulan sekaligus
	*/
	function cekSaldos2($login, $tahun, $data, $rfc = null){
		$this->rfc = new server_util_rfcLib($this->options);
		$result = new server_util_Map();			
		$data = $data->getArray();
		$res = new server_util_Map();
		$res->set("rfc",$rfc);
		foreach($data as $dkey => $value){			
			if ($value->get("agg") == "CAPEX"){
				$fund = $this->getFundDetail($login, $value->get("drk"), $res->get("rfc"));
				$wbs = str_replace("-","",$value->get("drk"));
				$sapImp = new server_util_Map(array(
								"IM_FICTR" => $value->get("cc"),
								"IM_FIKRS" => "1000",
								"IM_FIPEX" => $value->get("akun"),
								"IM_GEBER" => $fund->get("fund") ,
								"IM_GJAHR" => $tahun, 
								"IM_POSID" => $wbs,
								"IM_PERIO_FROM" => "0" . $value->get("bln1"),
								"IM_PERIO_TO" => "0" . $value->get("bln2") ));
				$sapExpTable = new server_util_arrayList(array("RESTABLE"));
				$res = $this->rfc->callRFC($login, "ZFMFI_CEKSALDO_CAPEX", $sapImp, $sapExpTable, null, null, false, true, $res->get("rfc"));			
			}else{
				$sapImp = new server_util_Map(array("IM_ACCGROUP" => "E" ,
									"IM_FICTR" => $value->get("cc"),
									"IM_FIKRS" => "1000",
									"IM_FIPEX" => $value->get("akun"),
									"IM_FT_WRTTP" => "64" ,
									"IM_GJAHR" => $tahun,
									"IM_KOKRS" => "1000",
									"IM_PERFROM" => "0". $value->get("bln1"),
									"IM_PERTO" => "0".$value->get("bln2"),
									"IM_VERSN" => "00".$value->get("jenis")));		
				$sapExpTable = new server_util_arrayList(array("RESTABLE"));
				$res = $this->rfc->callRFC($login, "ZFMFI_CEKSALDO", $sapImp, $sapExpTable, null, null, false, true, $res->get("rfc"));
			}
			if (gettype($res) == "string"){				
				return $res;
			}
			$restable = new server_util_Map();
			$restable->set("value",$value);
			$restable->set("restable",$res->get("RESTABLE"));
			$result->set($value->get("bln2").":".$value->get("cc").":".$value->get("akun"), $restable);		
		}	
		return $result;
	}
	function cekSaldoThn2($login, $tahun, $data, $rfc = null){
		$result = new server_util_Map();			
		$data = $data->getArray();
		$this->rfc = new server_util_rfcLib($this->options);
		$res = new server_util_Map();
		$res->set("rfc",$rfc);		
		$dataTmp = new server_util_Map();
		foreach($data as $dkey => $value){
			$line = new server_util_Map();
			$line->set("cc",$value->get("cc"));
			$line->set("akun",$value->get("akun"));
			$line->set("agg",$value->get("agg"));			
			if ($value->get("agg") == "CAPEX"){									
				$line->set("drk",$value->get("drk"));			
				$line->set("jenis",$value->get("jenis"));
				$dataTmp->set($value->get("cc").":".$value->get("akun").":".$value->get("drk"),$line);
			}else {
				$line->set("jenis",$value->get("jenis"));
				$dataTmp->set($value->get("cc").":".$value->get("akun").":".$value->get("drk").":".$value->get("jenis"),$line);
			}
			
		}
		foreach($dataTmp->getArray() as $dkey => $value){
			$sapExpTable = new server_util_arrayList(array("T_SALDO_1THN"));
			if ($value->get("agg") == "CAPEX"){
				$fund = $this->getFundDetail($login, $value->get("drk"), $res->get("rfc"));				
				$wbs = str_replace("-","",$value->get("drk"));
				$sapImp = new server_util_Map(array(
								"IM_FICTR" => $value->get("cc"),
								"IM_FIKRS" => "1000",
								"IM_FIPEX" => $value->get("akun"),
								"IM_GEBER" => $fund->get("fund") ,
								"IM_POSID" => $wbs,
								"IM_GJAHR" => $tahun) ) ;				
				$res = $this->rfc->callRFC($login, "ZFMFI_CEKSALDO_CAPEX_1THN", $sapImp, $sapExpTable, null, null, false, true, $res->get("rfc"));
			}else{
				$sapImp = new server_util_Map(array("IM_ACCGROUP" => "E" ,
								"IM_FICTR" => $value->get("cc"),
								"IM_FIKRS" => "1000",
								"IM_FIPEX" => $value->get("akun"),
								"IM_FT_WRTTP" => "64" ,
								"IM_GJAHR" => $tahun,
								"IM_KOKRS" => "1000",								
								"IM_VERSN" => "00".$value->get("jenis")));						
				$res = $this->rfc->callRFC($login, "ZFMFI_CEKSALDO_1THN", $sapImp, $sapExpTable, null, null, false, true, $res->get("rfc"));
			}
			if (gettype($res) == "string"){
				return $res;
			}
			$restable = new server_util_Map();
			$restable->set("value",$value);
			$restable->set("restable",$res->get("T_SALDO_1THN"));
			$result->set($dkey, $restable);		
		}	
		return $result;
	}
	function dataGar2($login, $tahun, $data){
		$this->rfc = new server_util_rfcLib($this->options);
		$rfc = $this->rfc->login($login->get("user"), $login->get("passwd"));
		if ($rfc){
			$result = new server_util_Map();
			$result->set("saldo",$this->cekSaldos2($login,$tahun, $data, $rfc));
			$result->set("saldothn",$this->cekSaldoThn2($login,$tahun, $data, $rfc));
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}	
	function release($login, $tahun , $data){
		error_log("Finish : " . date("H:i:s"));
		$this->rfc = new server_util_rfcLib($this->options);
		$temp_fr51 = new server_util_Map();
		$bln = "";
		foreach ($data->getArray() as $ix => $value){				
			if ($bln != $value->get("bln").":".$value->get("versi") ){
				$bln = $value->get("bln").":".$value->get("versi");
				$blnMap = new server_util_arrayList();
				$temp_fr51->set($bln,$blnMap);
			}
			$blnMap->add($value);
		}			
		//-------------
		$result = new server_util_Map();
		$res = new server_util_Map();
		$success = new server_util_Map();
		foreach ($temp_fr51->getArray() as $ix => $tempValue){
			$tmp = explode(":",$ix);						
			$versi = $tmp[1];
			if ($tmp[1] == "K") $versi = "A";							
			
			$sapImp = new server_util_Map(array(
								"IM_BATCH_INPUT" => " " ,								
								"IM_GJAHR" => $tahun,								
								"IM_PCA" => $versi,
								"IM_PERIO" => "0".$tmp[0] ) );		
			$sapExpTable = new server_util_arrayList(array("TLOG"));
			$dataFR51 = new server_util_arrayList();
			foreach ($tempValue->getArray() as $value){
				$dataFR51->add(array ("FICTR"=>$value->get("cc"),"FIPOS"=>$value->get("akun"),"AMOUNT"=>$value->get("nilai")) );
			}
			$sapImpTable = new server_util_Map(array("T_FR51" => $dataFR51));
			$exp = new server_util_arrayList(array("EX_RETURN"));
			$res = $this->rfc->callRFC($login, "ZFMFI_FR51", $sapImp, $sapExpTable, $sapImpTable, $exp, false, true, $res->get("rfc"));
			if (gettype($res) == "string"){
				return $res;
			}
			if ($res->get("EX_RETURN") == "FAILED"){
				//rollback $values
				$return = new server_util_Map();
				$return->set($ix, $result);
				$return->set("ex_return","FAILED");				
				$return->set("data",$value);					
				$return->set("success",$success);
				$return->set("msg",str_replace("\n","<br>",saprfc_error()));
				$this->release($login, $tahun, $success);
				return $return;
			}else if ($res->get("EX_RETURN") == "SUCCESS"){
				foreach ($tempValue->getArray() as $value){
					$value->set("nilai",floatval($value->get("nilai")) * -1);												
				}
				$success->set($ix, $tempValue);
			}
			$result->set($value->get("bln2").":".$value->get("cc").":".$value->get("akun"), $res);		
		}
		error_log("Finish : " . date("H:i:s"));
		$result->set("ex_return","SUCCESS");
		return $result;
	}
	/******************** Convert WBS => Fund
	*/
	function getFundDetail($login, $wbs, $rfc){
		$this->rfc = new server_util_rfcLib($this->options);
		$wbs = str_replace("-","",$wbs);
		$sapImp = new server_util_Map(array("IM_POSID" => $wbs) );
		$sapExp= new server_util_arrayList(array("EX_FIPEX","EX_FISTL","EX_GEBER"));		
		$ret = $this->rfc->callRFC($login,"ZFMFI_FMDERIVER", $sapImp, new server_util_arrayList(), new server_util_Map(), $sapExp, false, true, $rfc);
		if (gettype($ret) == "string"){			
			return $ret;
		}else {
			$fund = $ret->get("EX_GEBER");
			$fundCtr = $ret->get("EX_FISTL");			
			$akun = $ret->get("EX_FIPEX");		
		}
		return new server_util_Map(array("fund" => $fund, "fundCtr" => $fundCtr, "akun" => $akun, "rfc" => $ret->get("rfc")));
	}
	/******************* Release CAPEX
	 *
	*/
	function releaseCapex($login, $tahun, $data, $rfc = null){
		//error_log("proses FR51");
		$this->rfc = new server_util_rfcLib($this->options);
		$temp_fr51 = new server_util_Map();
		$bln = "";
		$wbs = "";
		foreach ($data->getArray() as $ix => $value){				
			if ($bln != ($value->get("bln") .":".$value->get("drk").":".$value->get("versi")) ){
				$bln = $value->get("bln").":".$value->get("drk").":".$value->get("versi");
				$blnMap = new server_util_arrayList();
				$temp_fr51->set($bln,$blnMap);
			}
			$blnMap->add($value);
		}			
		//-------------
		$res = new server_util_Map();
		$result = new server_util_Map();
		$success = new server_util_Map();
		$res->set("rfc",$rfc);
		foreach ($temp_fr51->getArray() as $ix => $tempValue){
			$tmp = explode(":",$ix);			
			$fund = $this->getFundDetail($login, $tmp[1], $res->get("rfc") );
			if (gettype($fund) == "string"){
				return $fund;
			}
			$versi = $tmp[2];
			if ($tmp[2] == "K") $versi = "A";							
			//error_log($ix .":".$versi.":".$fund->get("fund").":".$tmp[0]);
			$sapImp = new server_util_Map(array(
								"IM_BATCH_INPUT" => " ",
								"IM_FIKRS" => "1000",
								"IM_KOKRS" => "1000",
								"IM_GJAHR" => $tahun,								
								"IM_PERIO" => $tmp[0],
								"IM_PCA" => $versi,
								"IM_FINCODE" => $fund->get("fund")) );		
			$sapExpTable = new server_util_arrayList(array("TLOG","T_FR51"));
			$dataFR51 = new server_util_arrayList();			
			foreach ($tempValue->getArray() as $value){
				$value->set("fund",$fund->get("fund"));			
				$dataFR51->add(array ("FICTR"=>$value->get("cc"),"FIPOS"=>$value->get("akun"),"AMOUNT"=>$value->get("nilai")) );
			}
			$sapImpTable = new server_util_Map(array("T_FR51" => $dataFR51));
			$exp = new server_util_arrayList(array("EX_RETURN"));
			$res = $this->rfc->callRFC($login, "ZFMFI_FR51_CAPEX", $sapImp, $sapExpTable, $sapImpTable, $exp, false, true, $res->get("rfc"));
			if (gettype($res) == "string"){
				return $res;
			}
			if ($res->get("EX_RETURN") == "FAILED"){
				//rollback $values
				$return = new server_util_Map();
				$return->set($ix, $result);
				$return->set("ex_return","FAILED");				
				$return->set("data",$value);					
				$return->set("success",$success);
				$return->set("log",$res->get("TLOG"));				
				$return->set("versi",$versi);
				$return->set("msg",str_replace("\n","<br>",saprfc_error()));
				if ($success->getLength() > 0 ) $this->releaseCapex($login, $tahun, $success);				
				return $return;
			}else if ($res->get("EX_RETURN") == "SUCCESS"){
				error_log("sukses");
				foreach ($tempValue->getArray() as $value){
					$value->set("nilai",floatval($value->get("nilai")) * -1);												
				}
				$success->set($ix, $tempValue);
			}
			$result->set($value->get("bln2").":".$value->get("cc").":".$value->get("akun")+":"+$versi, $res);		
		}
		$result->set("ex_return","SUCCESS");
		return $result;
	}
	/********** CJR2*******/
	function updatePlanCapex($tahun, $data, $rfc){
		if ($rfc){
			$result = new server_util_Map();			
			$dataSuccess = new server_util_arrayList();
			//error_log("Proses CJR2");
			foreach ($data->getArray() as $value){				
				$versi = "0";
				$operator = (floatval( $value->get("nilai") ) < 0 ? "-" :"+");
				$wbs = str_replace("-","",$value->get("drk"));
				$versiSuccess = $value->get("versi");
				if ($value->get("versi") == "C") $versi = "7";						
				if ($value->get("versi") == "K"){
					$sapImp = new server_util_Map(array(
											"IM_AMOUNT" =>abs(floatval($value->get("nilai"))),
											"IM_BATCH_INPUT" => " ",
											"IM_KOKRS" => "1000",
											"IM_GJAHR" => $tahun,
											"IM_KSTAR" => $value->get("akun"),
											"IM_OPERATOR" => $operator,										
											"IM_PERIO" => $value->get("bln"),
											"IM_POSID" => $wbs,
											"IM_VERSN" => "000"));
					$sapExpTable = new server_util_Map(array("TLOG"));
					$sapExp = new server_util_arrayList(array("EX_RETURN"));
					$res = $this->rfc->callRFC($login,"ZFMFI_CJR2", $sapImp, $sapExpTable, null, $sapExp, false, true, $rfc);
					$result->set($value->get("bln").":".$value->get("cc").":".$value->get("akun"), $res);
					//error_log($res->get("EX_RETURN").":". str_replace("-","",$value->get("drk")));
					//error_log(abs(floatval($value->get("nilai"))) .":".$value->get("akun").":".$value->get("drk").":".$value->get("cc").":0:$operator");					
					if ($res->get("EX_RETURN") == "FAILED"){
						$status = new server_util_Map();
						$status->set("ex_return","FAILED");
						$status->set("data",$value);
						$status->set("log",$res->get("TLOG"));
						$status->set("version",$versi);	
						$status->set("success",$dataSuccess);
						$status->set("msg",str_replace("\n","<br>",saprfc_error()));
						return $status;
					}else {
						$value->set("versi","P");
						$nilai = -1 * floatval($value->get("nilai"));
						$value->set("nilai",$nilai);
						$dataSuccess->add($value);
					}
					$versi = "7";
					$versiSuccess = "C";
				}
				$sapImp = new server_util_Map(array(
										"IM_AMOUNT" =>abs(floatval($value->get("nilai"))),
										"IM_BATCH_INPUT" => " ",
										"IM_KOKRS" => "1000",
										"IM_GJAHR" => $tahun,
										"IM_KSTAR" => $value->get("akun"),
										"IM_OPERATOR" => $operator,
										"IM_PERIO" => $value->get("bln"),
										"IM_POSID" => $wbs,
										"IM_VERSN" => "00".$versi));
				$sapExpTable = new server_util_Map(array("TLOG"));
				$sapExp = new server_util_arrayList(array("EX_RETURN"));
				$res = $this->rfc->callRFC($login,"ZFMFI_CJR2", $sapImp, $sapExpTable, null, $sapExp, false, true, $rfc);				
				$result->set($value->get("bln").":".$value->get("cc").":".$value->get("akun"), $res);
				//error_log($res->get("EX_RETURN").":".str_replace("-","",$value->get("drk").":00".$versi));
				//error_log(abs(floatval($value->get("nilai"))) .":".$value->get("akun").":".$value->get("drk").":".$value->get("cc").":".$versi.":$operator");
				if ($res->get("EX_RETURN") == "FAILED"){
					$status = new server_util_Map();
					$status->set("ex_return","FAILED");
					$status->set("data",$value);
					$status->set("log",$res->get("TLOG"));
					$status->set("version",$versi);	
					$status->set("success",$dataSuccess);
					$status->set("msg",str_replace("\n","<br>",saprfc_error()));
					return $status;
				}else {
					$value->set("versi",$versiSuccess);
					$nilai = -1 * floatval($value->get("nilai"));
					$value->set("nilai",$nilai);
					$dataSuccess->add($value);
				}
			}
			$result->set("ex_return","SUCCESS");
			return $result;
		}
	}
	/********** FM9C ********/
	function copyPlanToFMCapex($tahun, $data, $rfc){
		if ($rfc){
			$result = new server_util_Map();			
			$dataSuccess = new server_util_arrayList();
			//error_log("Proses FM9C");
			foreach ($data->getArray() as $value){				
				$versi = "0";
				$fund = $this->getFundDetail(null, $value->get("drk"), $rfc);				
				$value->set("fund",$fund->get("fund"));
				//error_log($value->get("versi"));
				if ($value->get("versi") == "C" || $value->get("versi") == "COMMITMENT") $versi = "7";						
				if ($value->get("versi") == "K" || $value->get("versi") == "KEDUANYA"){					
					$sapImp = new server_util_Map(array(
											"IM_BATCH_INPUT" => " ",
											"IM_FIKRS" => "1000",											
											"IM_KOKRS" => "1000",
											"IM_GJAHR" => $tahun,
											"IM_KOSTL" => $value->get("cc"),
											"IM_KSTAR" => $value->get("akun"),																						
											"IM_TEST_RUN" => " ",
											"IM_FINCODE" => $fund->get("fund"),
											"IM_VERSN_SOURCE" => "000",
											"IM_VERSN_TARGET" => "000")	 );
					$sapExpTable = new server_util_Map(array("T_LOG","T_UPD_CC_LOG","T_UPD_ERR_LOG","T_UPD_LOG","T_UPD_NO_ASSGMN_LOG","T_UPD_OR_LOG","T_UPD_WRONG_BUKRS"));
					$sapExp = new server_util_arrayList(array("EX_RETURN"));
					$res = $this->rfc->callRFC($login,"ZFMFI_FM9C_CAPEX", $sapImp, $sapExpTable, null, $sapExp, false, true, $rfc);
					$result->set($value->get("bln").":".$value->get("cc").":".$value->get("akun"), $res);
					$value->set("SAPVERSN","0");
					//error_log($res->get("EX_RETURN"));
					if ($res->get("EX_RETURN") == "FAILED"){
						$status = new server_util_Map();
						$status->set("ex_return","FAILED");
						$status->set("data",$value);
						$status->set("log",$res->get("T_LOG"));
						$status->set("upderror",$res->get("T_UPD_ERR_LOG"));
						$status->set("version",$versi);
						$status->set("res",$res);	
						$status->set("success",$dataSuccess);
						$status->set("msg",str_replace("\n","<br>",saprfc_error()));
						return $status;
					}
					$versi = "7";
				}
				$value->set("SAPVERSN",$versi);				
				$sapImp = new server_util_Map(array(
											"IM_BATCH_INPUT" => " ",
											"IM_FIKRS" => "1000",											
											"IM_KOKRS" => "1000",
											"IM_GJAHR" => $tahun,
											"IM_KOSTL" => $value->get("cc"),
											"IM_KSTAR" => $value->get("akun"),																					
											"IM_TEST_RUN" => " ",
											"IM_FINCODE" => $fund->get("fund"),
											"IM_VERSN_SOURCE" => "00".$versi,
											"IM_VERSN_TARGET" => "000")	 );
				$sapExpTable = new server_util_Map(array("T_LOG","T_UPD_CC_LOG","T_UPD_ERR_LOG","T_UPD_LOG","T_UPD_NO_ASSGMN_LOG","T_UPD_OR_LOG","T_UPD_WRONG_BUKRS"));
				$sapExp = new server_util_arrayList(array("EX_RETURN"));
				$res = $this->rfc->callRFC($login,"ZFMFI_FM9C_CAPEX", $sapImp, $sapExpTable, null, $sapExp, false, true, $rfc);				
				$result->set($value->get("bln").":".$value->get("cc").":".$value->get("akun"), $res);
				if ($res->get("EX_RETURN") == "FAILED"){
					$status = new server_util_Map();
					$status->set("ex_return","FAILED");
					$status->set("data",$value);
					$status->set("log",$res->get("T_LOG"));
					$status->set("upderror",$res->get("T_UPD_ERR_LOG"));
					$status->set("versi",$versi);
					$status->set("res",$res);	
					$status->set("success",$dataSuccess);
					$status->set("msg",str_replace("\n","<br>",saprfc_error()));
					return $status;
				}
			}
			$result->set("ex_return","SUCCESS");
			return $result;
		}
	}
	
	function prosesCapex($login, $tahun, $data){
		$this->rfc = new server_util_rfcLib($this->options);
		$rfc = $this->rfc->login($login->get("user"), $login->get("passwd"));
		if ($rfc){			
			$result = new server_util_Map();
			$ret1 = $this->updatePlanCapex($tahun, $data, $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("CJR2",$ret1);
				$result->set("proses","CJR2");
				$result->set("log",$ret1->get("log"));
				$result->set("ex_return","FAILED");
				//rollback
				$rollback = $this->updatePlanCapex($tahun, $ret1->get("success"), $rfc);
				$result->set("rollback",$rollback);
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);
				$result->set("proses","CJR2");
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("CJR2",$ret1);			
			
			//FM9C hanya transfer per Akun
			$tmp = new server_util_Map();
			//foreach ($data->getArray() as $value){
		//		$tmp->set($value->get("cc").":".$value->get("akun"),$value);
		//	}
			$ret2 = $this->copyPlanToFMCapex($tahun, $data, $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;		
				$result->set("ex_return","FAILED");
				$result->set("proses","FM9C");
				$result->set("FM9C",$ret2);
				$result->set("log",$ret2->get("log"));
				//rollback CJR2
				$rollback = $this->updatePlanCapex($tahun, $ret1->get("success"), $rfc);
				$result->set("rollback",$rollback);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);														
				$result->set("ex_return","FAILED");
				$rollback = $this->updatePlanCapex($tahun, $ret1->get("success"), $rfc);
				$result->set("rollback",$rollback);
				return $result;
			}else $result->set("FM9C",$ret2);
			
			$tmp = new server_util_Map();
			foreach ($data->getArray() as $key => $value){
				if ($value->get("tipe") == "D") $tmp->set($key,$value);
			}			
			$ret3 = $this->releaseCapex(null,$tahun, $tmp, $rfc);					
			if (gettype($ret3) != "string" && $ret3->get("ex_return") == "FAILED") {			
				//rollback FM9C;
				$result->set("ex_return","FAILED");
				$result->set("proses","FR51");
				$result->set("log",$ret3->get("log"));
				$result->set("FR51",$ret3);
				//rollback
				$rollback = $this->releaseCapex($tahun, $ret3->get("success"), $rfc);
				$result->set("rollbackFR51",$rollback);
				$rollback = $this->updatePlanCapex($tahun, $ret1->get("success"), $rfc);
				$result->set("rollbackCJR2",$rollback);
				$rollback = $this->copyPlanToFMCapex($tahun, $ret1->get("success"), $rfc);
				$result->set("rollbackFM9C",$rollback);
				return $result;
			}else if (gettype($ret3) == "string"){
				$result->set("msg",$ret3);				
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FR51",$ret3);
			$result->set("ex_return","SUCCESS");
			saprfc_close($rfc);	
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function hold(){
	
	}
//----------------------------------------- OLD ------------------------	
	function login($host, $sysnr, $client, $usr, $pwd, $codepage){		
		$this->config = new server_util_Config($this->options);	
		$this->sysnr = $this->config->get("sysnr"); 	
		$this->host = $this->config->get("host"); 	
		$this->client = $this->config->get("client"); 		
		$this->codepage = $this->config->get("codepage"); 			
		
		try{		
			$login = array (
				"ASHOST"=>$this->host,
				"SYSNR"=>$this->sysnr,
				"CLIENT"=>$this->client,
				"USER"=>$usr,
				"PASSWD"=>$pwd,
				"CODEPAGE"=>$this->codepage);
			return saprfc_open ($login );		
		}catch(Exception $e){
			error_log($e->getMessage());
			return 0;
		}
	}	
	/**
	 * TSL01 = Plan CO
	 * TSL02 = Actual CO
	 * TSL03 - 04 = Actual Actual FM
	 * TSL05 - 06 = Release FM
	 * TSL07 - 08 = Actual FM
	 * TSL09 = Plan FM Payment
	 * TSL10 = Plan FM Commitment 
	 * 	 
	 */
	function cekSaldo($login, $tahun, $bln1, $bln2, $cc, $akun, $fikrs, $kokrs, $wrttp, $ver){				
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$fce = saprfc_function_discover($rfc,"ZFMFI_CEKSALDO");
			if (! $fce ) { return "error:Discovering interface of function module failed";  }
			//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
			saprfc_import ($fce,"IM_ACCGROUP","E");
			saprfc_import ($fce,"IM_FICTR", $cc);
			saprfc_import ($fce,"IM_FIKRS", $fikrs);
			saprfc_import ($fce,"IM_FIPEX",$akun);
			saprfc_import ($fce,"IM_FT_WRTTP", $wrttp);
			saprfc_import ($fce,"IM_GJAHR", $tahun);
			saprfc_import ($fce,"IM_KOKRS", $kokrs);
			saprfc_import ($fce,"IM_PERFROM","0".$bln1);
			saprfc_import ($fce,"IM_PERTO","0".$bln2);
			saprfc_import ($fce,"IM_VERSN","00".$ver);
			//Fill internal tables
			//error_log("$cc:$fikrs:$akun:$tahun:$kokrs:$bln1:$bln2:$ver");
			saprfc_table_init ($fce,"RESTABLE");								
			//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
			$rfc_rc = saprfc_call_and_receive ($fce);
			if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
			//Retrieve export parameters			
			$restable = new server_util_Map();
			$rows = saprfc_table_rows ($fce,"RESTABLE");
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"RESTABLE",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){						
						$row->set($k,floatval($val));
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$restable = $tmp;							
			}			
			saprfc_function_free($fce);
			saprfc_close($rfc);
			$result = new server_util_Map();			
			$result->set("restable", $restable);							
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error()) ;
	}
		
	function cekSaldos($login, $tahun, $data, $fikrs, $kokrs, $wrttp, $ver, $rfc = null){
		if ($rfc == null) $rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$result = new server_util_Map();			
			$data = $data->getArray();
			foreach($data as $dkey => $value){
				$fce = saprfc_function_discover($rfc,"ZFMFI_CEKSALDO");
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.			
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
				//Fill internal tables
				//error_log("$cc:$fikrs:$akun:$tahun:$kokrs:$bln1:$bln2:$ver");
				saprfc_table_init ($fce,"RESTABLE");								
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters			
				$restable = new server_util_Map();
				$rows = saprfc_table_rows ($fce,"RESTABLE");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"RESTABLE",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $resvalue){
						$row = new server_util_Map();
						foreach ($resvalue as $k => $val){						
							$row->set($k,floatval($val));
						}
						$tmp->set($dkey,$row);
					} 
					$restable = $tmp;
					$ret = array();							
				}			
				saprfc_function_free($fce);				
				$result->set($value->get("bln2").":".$value->get("cc").":".$value->get("akun"), $restable);							
			}
			if ($login != null) saprfc_close($rfc);				
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function cekSaldoThn($login, $tahun, $data, $fikrs, $kokrs,$wrttp, $ver, $rfc = null){
		if ($rfc == null) $rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){	
			$result = new server_util_Map();			
			foreach ($data->getArray() as $value){
				$fce = saprfc_function_discover($rfc,"ZFMFI_CEKSALDO_1THN");
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.				
				saprfc_import ($fce,"IM_ACCGROUP","E");
				saprfc_import ($fce,"IM_FICTR", $value->get("cc"));
				saprfc_import ($fce,"IM_FIKRS", $fikrs); 
				saprfc_import ($fce,"IM_FIPEX",$value->get("akun"));
				saprfc_import ($fce,"IM_FT_WRTTP", $wrttp);
				saprfc_import ($fce,"IM_GJAHR", $tahun);
				saprfc_import ($fce,"IM_KOKRS", $kokrs);			
				saprfc_import ($fce,"IM_VERSN","00".$ver);
				//Fill internal tables
				saprfc_table_init ($fce,"T_SALDO_1THN");								
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters			
				$restable = new server_util_arrayList();			
				$rows = saprfc_table_rows ($fce,"T_SALDO_1THN");				
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_SALDO_1THN",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $datvalue){
						$row = new server_util_Map();		
						$t = "";
						foreach ($datvalue as $k => $val){						
							if ($k == "PERIO"){
								$val = (floatval($val) < 10 ? "0":"") . $val;
							}
							if (strpos($k,"TSL") && strpos($val,"-")){
								$val = floatval($val) * -1;
							}else if (strpos($k,"TSL")){
								$val = floatval($val);
							}	
							$t .=",$k=>$val";						
							$row->set($k,$val);							
						}
						$tmp->set($key,$row);												
					} 					
					$restable->add($tmp);
					$ret = array();
				}			
				$result->set($value->get("cc").":".$value->get("akun"),$restable);								
				saprfc_function_free($fce);			
			}	
			if ($login != null) saprfc_close($rfc);				
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function dataGar($login, $tahun, $data, $fikrs, $kokrs,$wrttp, $ver){
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$result = new server_util_Map();
			$result->set("saldo",$this->cekSaldos(null,$tahun, $data, $fikrs, $kokrs, $wrttp, $ver, $rfc));
			$result->set("saldothn",$this->cekSaldoThn(null,$tahun, $data, $fikrs, $kokrs, $wrttp, $ver, $rfc));
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	/*jika berhasil
	 * 	EX_RETURN = SUCCESS || FAILED
	 * 	Knapa di TLOG = No Dokumen
	 **/
	function FR51x($rfc, $tahun, $value){
		if ($rfc){			
			$dataSuccess = new server_util_arrayList();			
			$fce = saprfc_function_discover($rfc,"ZFMFI_FR51");						
			if (! $fce ) { return "error:Discovering interface of function module failed";  }
			//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
			//error_log("FR51=>".$tahun.":".$value->get("cc") .":".$value->get("akun").":".$ver.":".$kokrs.":".$fikrs.":".$value->get("nilai"));
			saprfc_import ($fce,"IM_BATCH_INPUT",$batch);
			saprfc_import ($fce,"IM_GJAHR",$tahun);
			saprfc_import ($fce,"IM_PERIO",$value->get("bln"));
			//Fill internal tables
			saprfc_table_init ($fce,"TLOG");
			saprfc_table_init ($fce,"T_FR51");
			//$data = $data->getArray();
			//foreach ($data as $value){
				//error_log($value->get("cc") .":".$value->get("akun").":".$value->get("nilai").":".$value->get("bln"));
				saprfc_table_append ($fce,"T_FR51", array ("FICTR"=>$value->get("cc"),"FIPOS"=>$value->get("akun"),"AMOUNT"=>$value->get("nilai")));
			//	}
			//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
			$rfc_rc = saprfc_call_and_receive ($fce);
			if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
			//Retrieve export parameters
			$EX_RETURN = saprfc_export ($fce,"EX_RETURN");			
			$log = new server_util_arrayList();
			$fr51 = new server_util_arrayList();
			$rows = saprfc_table_rows ($fce,"TLOG");
			error_log("FR51->EX_RETURN:$EX_RETURN");
			for ($i=1;$i<=$rows;$i++){
				$TLOG[] = saprfc_table_read ($fce,"TLOG",$i);
				$tmp = new server_util_Map();
				foreach ($TLOG as $key => $logval){
					$row = new server_util_Map();
					foreach ($logval as $k => $val){	
						if ($EX_RETURN == "FAILED") {
							if (strpos(strtolower($val),"posted") > 1) $EX_RETURN = "SUCCESS";							
						}
						error_log("T_LOG->".$k .":".$val);						
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$TLOG = array();
				$log->add($tmp);
			}
			$rows = saprfc_table_rows ($fce,"T_FR51");
			for ($i=1;$i<=$rows;$i++){	
				$T_FR51[] = saprfc_table_read ($fce,"T_FR51",$i);
				$tmp = new server_util_Map();
				foreach ($T_FR51 as $key => $frval){
					$row = new server_util_Map();
					foreach ($frval as $k => $val){						
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$T_FR51 = array();
				$fr51->add($tmp);
			}
			$result = new server_util_Map();
			$result->set("log", $log);
			$result->set("fr51", $fr51);	
			$result->set("ex_return", $EX_RETURN);			
			//saprfc_function_debug_info($fce);
			saprfc_function_free($fce);			
			if ($EX_RETURN == "FAILED"){				
				$result->set("ex_return","FAILED");				
				$result->set("data",$value);				
			} 						
			return $result;
		}else return false;
	}
	/*-------------- Struktur ----------------
	 * -> Group per Periode => karena update FR51 per Tahun per Period
	 * temp =>
	 * 	 '->  prd1 
	 * 			'-> value = {cc, akun, nilai, prd}
	 * 			'-> value = {cc, akun, nilai, prd}
	 *	 '->  prd2
	 * 			'-> value = {cc, akun, nilai, prd}
	 * 			'-> value = {cc, akun, nilai, prd}
	 * */
	function FR51($login,$tahun, $data, $batch, $rfc = null, $rollback = null){		
		if ($rfc == null) $rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$return = new server_util_Map();
			$dataSuccess = new server_util_arrayList();
			//------------- Group per Periode
			$temp_fr51 = new server_util_Map();
			$bln = "";
			foreach ($data->getArray() as $ix => $value){				
				if ($bln != $value->get("bln").":".$value->get("versi")){
					$bln = $value->get("bln").":".$value->get("versi");
					$blnMap = new server_util_arrayList();
					$temp_fr51->set($bln,$blnMap);
				}
				$blnMap->add($value);
			}			
			//-------------
			foreach ($temp_fr51->getArray() as $ix => $tempValue){				
				$fce = saprfc_function_discover($rfc,"ZFMFI_FR51");						
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
				//error_log("FR51=>".$tahun.":".$value->get("cc") .":".$value->get("akun").":".$ver.":".$kokrs.":".$fikrs.":".$value->get("nilai"));
				$tmp = explode(":",$ix);							
				$versi = $tmp[1];
				if ($tmp[1] == "K") $versi = "A";							
				
				saprfc_import ($fce,"IM_BATCH_INPUT",$batch);
				saprfc_import ($fce,"IM_GJAHR",$tahun);
				saprfc_import ($fce,"IM_PCA",$versi);
				saprfc_import ($fce,"IM_PERIO",$tmp[0]);//index adalah periode
				//Fill internal tables
				saprfc_table_init ($fce,"TLOG");
				saprfc_table_init ($fce,"T_FR51");
				//$data = $data->getArray();
				foreach ($tempValue->getArray() as $value){
					//error_log($value->get("cc") .":".$value->get("akun").":".$value->get("nilai").":".$value->get("bln"));
					saprfc_table_append ($fce,"T_FR51", array ("FICTR"=>$value->get("cc"),"FIPOS"=>$value->get("akun"),"AMOUNT"=>$value->get("nilai")));
				}
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters
				$EX_RETURN = saprfc_export ($fce,"EX_RETURN");			
				$log = new server_util_arrayList();
				$fr51 = new server_util_arrayList();
				$rows = saprfc_table_rows ($fce,"TLOG");
				//error_log("FR51->EX_RETURN:$EX_RETURN");
				for ($i=1;$i<=$rows;$i++){
					$TLOG[] = saprfc_table_read ($fce,"TLOG",$i);
					$tmp = new server_util_Map();
					foreach ($TLOG as $key => $logval){
						$row = new server_util_Map();
						foreach ($logval as $k => $val){	
							if ($EX_RETURN == "FAILED") {
								if (strpos(strtolower($val),"posted") > 1) $EX_RETURN = "SUCCESS";							
								error_log("T_LOG->".$k .":".$val);						
							}							
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$TLOG = array();
					$log->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_FR51");
				for ($i=1;$i<=$rows;$i++){	
					$T_FR51[] = saprfc_table_read ($fce,"T_FR51",$i);
					$tmp = new server_util_Map();
					foreach ($T_FR51 as $key => $frval){
						$row = new server_util_Map();
						foreach ($frval as $k => $val){						
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$T_FR51 = array();
					$fr51->add($tmp);
				}
				$result = new server_util_Map();
				$result->set("log", $log);
				$result->set("fr51", $fr51);	
				$result->set("ex_return", $EX_RETURN);
				
				//saprfc_function_debug_info($fce);
				saprfc_function_free($fce);
				
				if ($EX_RETURN == "SUCCESS"){
					foreach ($tempValue->getArray() as $value){
						$value->set("nilai",floatval($value->get("nilai")) * -1);							
						$dataSuccess->add($value);
					}					
				}else if ($EX_RETURN == "FAILED"){
					//Rollback FR51						
					$return = new server_util_Map();
					$return->set($ix, $result);
					$return->set("ex_return","FAILED");
					$return->set("log",$log);
					$return->set("data",$value);					
					$return->set("success",$dataSuccess);
					$return->set("msg",str_replace("\n","<br>",saprfc_error()));
					//rollback
					$this->FR51($login,$tahun, $dataSuccess,$batch, $rfc, true);
					//-----------
					//if ($dataSuccess->getLength() > 0) $this->FR51(null,$tahun, $dataSuccess, $batch, $rfc);
					return $return;
				} 
				$return->set($ix, $result);
			}
			saprfc_close($rfc);			
			$return->set("ex_return","SUCCESS");
			error_log("Finish : " . date("H:i:s"));
			return $return;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function FR51CPX($login,$tahun, $data, $batch, $rfc = null){
		if ($rfc == null) $rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$return = new server_util_Map();
			$dataSuccess = new server_util_arrayList();
			foreach ($data->getArray() as $ix => $value){				
				$fce = saprfc_function_discover($rfc,"ZFMFI_FR51_CAPEX");						
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
				//error_log("FR51=>".$tahun.":".$value->get("cc") .":".$value->get("akun").":".$ver.":".$kokrs.":".$fikrs.":".$value->get("nilai"));
				$fincode = $this->convertWBS($value->get("wbs"));
				
				saprfc_import ($fce,"IM_BATCH_INPUT",$batch);
				saprfc_import ($fce,"IM_FIKRS",$value->get("fikrs"));
				saprfc_import ($fce,"IM_FINCODE",$fincode);//110010102I
				saprfc_import ($fce,"IM_GJAHR",$tahun);
				saprfc_import ($fce,"IM_KOKRS",$value->get("kokrs"));
				saprfc_import ($fce,"IM_PERIO",$value->get("bln"));
				saprfc_import ($fce,"IM_VERSN",$value->get("version"));
				//Fill internal tables
				saprfc_table_init ($fce,"TLOG");
				saprfc_table_init ($fce,"T_FR51");
				//$data = $data->getArray();
				//foreach ($data as $value){
					//error_log($value->get("cc") .":".$value->get("akun").":".$value->get("nilai").":".$value->get("bln"));
					saprfc_table_append ($fce,"T_FR51", array ("FICTR"=>$value->get("cc"),"FIPOS"=>$value->get("akun"),"AMOUNT"=>$value->get("nilai")));
				//	}
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters
				$EX_RETURN = saprfc_export ($fce,"EX_RETURN");			
				$log = new server_util_arrayList();
				$fr51 = new server_util_arrayList();
				$rows = saprfc_table_rows ($fce,"TLOG");
				//error_log("FR51->EX_RETURN:$EX_RETURN");
				for ($i=1;$i<=$rows;$i++){
					$TLOG[] = saprfc_table_read ($fce,"TLOG",$i);
					$tmp = new server_util_Map();
					foreach ($TLOG as $key => $logval){
						$row = new server_util_Map();
						foreach ($logval as $k => $val){	
							if ($EX_RETURN == "FAILED") {
								if (strpos(strtolower($val),"posted") > 1) $EX_RETURN = "SUCCESS";							
							}
							error_log("T_LOG->".$k .":".$val);						
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$TLOG = array();
					$log->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_FR51");
				for ($i=1;$i<=$rows;$i++){	
					$T_FR51[] = saprfc_table_read ($fce,"T_FR51",$i);
					$tmp = new server_util_Map();
					foreach ($T_FR51 as $key => $frval){
						$row = new server_util_Map();
						foreach ($frval as $k => $val){						
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$T_FR51 = array();
					$fr51->add($tmp);
				}
				$result = new server_util_Map();
				$result->set("log", $log);
				$result->set("fr51", $fr51);	
				$result->set("ex_return", $EX_RETURN);
				
				//saprfc_function_debug_info($fce);
				saprfc_function_free($fce);
				
				if ($EX_RETURN == "SUCCESS"){
						//$value->set("nilai",$value->get("nilai") * -1);			
					    $dataSuccess->add($value);
				}else if ($EX_RETURN == "FAILED"){
					$return->set($ix, $result);
					$return->set("ex_return","FAILED");
					$return->set("log",$log);
					$return->set("data",$value);
					$return->set("success",$dataSuccess);
					//if ($dataSuccess->getLength() > 0) $this->FR51(null,$tahun, $dataSuccess, $batch, $rfc);
					return $return;
				} 
				$return->set($ix, $result);
			}
			saprfc_close($rfc);			
			$return->set("ex_return","SUCCESS");
			return $return;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	/*berhasil
	 * EX_RETURN = SUCCESS || FAILED
	 **/
	function KP06x($rfc, $tahun, $value, $ver){	
		if ($rfc){			
			$fce = saprfc_function_discover($rfc,"ZFMFI_KP06");
			if (! $fce ) { return "error:Discovering interface of function module failed";  }
			//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
			//error_log("KP06=>".$tahun.":".$value->get("cc") .":".$value->get("akun").":".$ver.":".$kokrs.":".$fikrs.":".$value->get("nilai"));
			saprfc_import ($fce,"IM_AMOUNT",abs($value->get("nilai")));
			saprfc_import ($fce,"IM_BATCH_INPUT",$batch);
			saprfc_import ($fce,"IM_FICTR",$value->get("cc"));
			saprfc_import ($fce,"IM_FIPOS",$value->get("akun"));
			saprfc_import ($fce,"IM_GJAHR",$tahun);
			saprfc_import ($fce,"IM_OPERATOR",(floatval( $value->get("nilai") ) < 0 ? "-" :"+"));
			saprfc_import ($fce,"IM_PERIO",$value->get("bln"));
			saprfc_import ($fce,"IM_VERSN","00".$ver);
			//Fill internal tables
			saprfc_table_init ($fce,"TLOG");								
			//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
			$rfc_rc = saprfc_call_and_receive ($fce);
			if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
			//Retrieve export parameters			
			$EX_RETURN = saprfc_export ($fce,"EX_RETURN");				
			$restable = new server_util_arrayList();			
			$rows = saprfc_table_rows ($fce,"TLOG");
			$ret = array();
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"TLOG",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $logval){
					$row = new server_util_Map();
					foreach ($logval as $k => $val){						
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$restable->add($tmp);
			}				
			$ret = new server_util_Map();
			$ret->set("log",$restable);
			$ret->set("ex_return",$EX_RETURN);		
			saprfc_function_free($fce);
			//nilainya dibalik				
			if ($EX_RETURN == "FAILED"){									
				$ret->set("ex_return","FAILED");
				$ret->set("data",$value);				
				$ret->set("version",$ver);													
			}							
			return $ret;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function KP06($tahun, $data,  $batch, $ver, $rfc){	
		if ($rfc){
			$result = new server_util_Map();			
			$dataSuccess = new server_util_arrayList();
			foreach ($data->getArray() as $value){
				$fce = saprfc_function_discover($rfc,"ZFMFI_KP06");
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
				//error_log("KP06=>".$tahun.":".$value->get("cc") .":".$value->get("akun").":".$ver.":".$kokrs.":".$fikrs.":".$value->get("nilai"));
				saprfc_import ($fce,"IM_AMOUNT",abs($value->get("nilai")));
				saprfc_import ($fce,"IM_BATCH_INPUT",$batch);
				saprfc_import ($fce,"IM_FICTR",$value->get("cc"));
				saprfc_import ($fce,"IM_FIPOS",$value->get("akun"));
				saprfc_import ($fce,"IM_GJAHR",$tahun);
				saprfc_import ($fce,"IM_OPERATOR",(floatval( $value->get("nilai") ) < 0 ? "-" :"+"));
				saprfc_import ($fce,"IM_PERIO",$value->get("bln"));
				saprfc_import ($fce,"IM_VERSN","00".$ver);
				//Fill internal tables
				saprfc_table_init ($fce,"TLOG");								
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters			
				$EX_RETURN = saprfc_export ($fce,"EX_RETURN");				
				$restable = new server_util_arrayList();			
				$rows = saprfc_table_rows ($fce,"TLOG");
				$ret = array();
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"TLOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $logval){
						$row = new server_util_Map();
						foreach ($logval as $k => $val){						
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$restable->add($tmp);
				}				
				$ret = new server_util_Map();
				$ret->set("log",$restable);
				$ret->set("ex_return",$EX_RETURN);
				$result->set($value->get("bln").":".$value->get("cc").":".$value->get("akun"), $ret);
				saprfc_function_free($fce);
				//nilainya dibalik				
				if ($EX_RETURN == "SUCCESS") {
					//$value->set("nilai",floatval($value->get("nilai")) * -1);
					$dataSuccess->add($value);
				}else if ($EX_RETURN == "FAILED"){					
					$status = new server_util_Map();
					$status->set("ex_return","FAILED");
					$status->set("data",$value);
					$status->set("log",$restable);
					$status->set("version",$ver);	
					$status->set("success",$dataSuccess);
					//if ($dataSuccess->getLength() > 0) $this->KP06($tahun, $dataSuccess, $batch, $ver, $rfc);
					return $status;
				}				
			}
			//saprfc_close($rfc);
			$result->set("ex_return",$EX_RETURN);
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function CJR2($tahun, $data,  $batch, $ver, $rfc){	
		if ($rfc){
			$result = new server_util_Map();			
			$dataSuccess = new server_util_arrayList();
			foreach ($data->getArray() as $value){
				$fce = saprfc_function_discover($rfc,"ZFMFI_CJR2");
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
				//error_log("KP06=>".$tahun.":".$value->get("cc") .":".$value->get("akun").":".$ver.":".$kokrs.":".$fikrs.":".$value->get("nilai"));
				saprfc_import ($fce,"IM_AMOUNT",abs($value->get("nilai")));
				saprfc_import ($fce,"IM_BATCH_INPUT",$batch);
				saprfc_import ($fce,"IM_GJAHR",$tahun);
				saprfc_import ($fce,"IM_KOKRS",$value->get("kokrs"));
				saprfc_import ($fce,"IM_KSTAR",$value0->get("akun"));
				saprfc_import ($fce,"IM_OPERATOR",(floatval( $value->get("nilai") ) < 0 ? "-" :"+"));
				saprfc_import ($fce,"IM_PERIO",$value->get("bln"));
				saprfc_import ($fce,"IM_POSID",$value->get("wbs"));//T-11-0001-01-02-i 
				saprfc_import ($fce,"IM_VERSN","00".$ver);
				//Fill internal tables
				saprfc_table_init ($fce,"TLOG");								
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters			
				$EX_RETURN = saprfc_export ($fce,"EX_RETURN");				
				$restable = new server_util_arrayList();			
				$rows = saprfc_table_rows ($fce,"TLOG");
				$ret = array();
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"TLOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $logval){
						$row = new server_util_Map();
						foreach ($logval as $k => $val){						
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$restable->add($tmp);
				}				
				$ret = new server_util_Map();
				$ret->set("log",$restable);
				$ret->set("ex_return",$EX_RETURN);
				$result->set($value->get("bln").":".$value->get("cc").":".$value->get("akun"), $ret);
				saprfc_function_free($fce);
				//nilainya dibalik				
				if ($EX_RETURN == "SUCCESS") {
					//$value->set("nilai",floatval($value->get("nilai")) * -1);
					$dataSuccess->add($value);
				}else if ($EX_RETURN == "FAILED"){					
					$status = new server_util_Map();
					$status->set("ex_return","FAILED");
					$status->set("data",$value);
					$status->set("log",$restable);
					$status->set("version",$ver);	
					$status->set("success",$dataSuccess);
					//if ($dataSuccess->getLength() > 0) $this->KP06($tahun, $dataSuccess, $batch, $ver, $rfc);
					return $status;
				}				
			}
			//saprfc_close($rfc);
			$result->set("ex_return",$EX_RETURN);
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	/*berhasil 
	 * EX_RETURN = SUCCESS || FAILED
	 * T_LOG untuk cek barhasil atau tidak
	 * */
	function FM9Cx( $rfc, $tahun, $kokrs, $fikrs, $ver, $dataValue){
		if ($rfc){						
			$fce = saprfc_function_discover($rfc,"ZFMFI_FM9C");
			if (! $fce ) { return "error:Discovering interface of function module failed";  }		
			saprfc_import ($fce,"IM_BATCH_INPUT"," ");
			saprfc_import ($fce,"IM_FIKRS", $fikrs);
			saprfc_import ($fce,"IM_GJAHR", $tahun);
			saprfc_import ($fce,"IM_KOKRS", $kokrs);
			saprfc_import ($fce,"IM_KOSTL", $dataValue->get("cc"));
			saprfc_import ($fce,"IM_KSTAR", $dataValue->get("akun"));
			saprfc_import ($fce,"IM_TEST_RUN"," ");
			saprfc_import ($fce,"IM_VERSN_SOURCE","00".$ver);
			saprfc_import ($fce,"IM_VERSN_TARGET","000");
			//Fill internal tables
			saprfc_table_init ($fce,"T_LOG");
			saprfc_table_init ($fce,"T_UPD_CC_LOG");
			saprfc_table_init ($fce,"T_UPD_ERR_LOG");
			saprfc_table_init ($fce,"T_UPD_LOG");
			saprfc_table_init ($fce,"T_UPD_NO_ASSGMN_LOG");
			saprfc_table_init ($fce,"T_UPD_OR_LOG");
			saprfc_table_init ($fce,"T_UPD_WRONG_BUKRS");
			//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
			$rfc_rc = saprfc_call_and_receive ($fce);
			if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
			//Retrieve export parameters			
			$EX_RETURN = saprfc_export ($fce,"EX_RETURN");
			//error_log("EX_RET FM9C:".$EX_RETURN);
			$log = new server_util_arrayList();			
			$cclog = new server_util_arrayList();			
			$errlog = new server_util_arrayList();			
			$updlog = new server_util_arrayList();			
			$assglog = new server_util_arrayList();			
			$orlog = new server_util_arrayList();			
			$bukrs = new server_util_arrayList();			
			$rows = saprfc_table_rows ($fce,"T_LOG");				
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_LOG",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){	
						if ($EX_RETURN == "FAILED") {
							if (strpos(strtolower($val),"posted") > 1) $EX_RETURN = "SUCCESS";
							$pos = strpos(strtolower($val),"no data found for processing" );
							if (gettype($pos) != "boolean") $EX_RETURN = "SUCCESS";
							error_log("T_LOG->".$k .":".$val);					
						}
						error_log("T_LOG->".$k .":".$val);					
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$log->add($tmp);
			}
			$rows = saprfc_table_rows ($fce,"T_UPD_CC_LOG");
			//error_log("T_UPD_CC_LOG length:".$rows);
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_UPD_CC_LOG",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){						
						if ($EX_RETURN == "FAILED") error_log("UPD_CC->". $k .":".$val);					
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$cclog->add($tmp);
			}
			$rows = saprfc_table_rows ($fce,"T_UPD_ERR_LOG");
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_UPD_ERR_LOG",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){						
						if ($EX_RETURN == "FAILED") error_log("UPD_ERR->". $k .":".$val);					
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$errlog->add($tmp);
			}
			$rows = saprfc_table_rows ($fce,"T_UPD_LOG");
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_UPD_LOG",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){						
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$updlog->add($tmp);
			}
			$rows = saprfc_table_rows ($fce,"T_UPD_NO_ASSGMN_LOG");
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_UPD_NO_ASSGMN_LOG",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){						
						if ($EX_RETURN == "FAILED") error_log("UPD_NO_ASSG->". $k .":".$val);					
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$assglog->add($tmp);
			}
			$rows = saprfc_table_rows ($fce,"T_UPD_OR_LOG");
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_UPD_OR_LOG",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){						
						if ($EX_RETURN == "FAILED") error_log("UPD_OR_LOG->". $k .":".$val);					
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$orlog->add($tmp);
			}
			$rows = saprfc_table_rows ($fce,"T_UPD_WRONG_BUKRS");
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_UPD_WRONG_BUKRS",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){				
						if ($EX_RETURN == "FAILED") error_log("WRONG BUKRS->". $k .":".$val);							
						$row->set($k,$val);
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$bukrs->add($tmp);
			}				
			$tmpret = new server_util_Map();				
			$tmpret->set("log", $log);//hasil untuk ngecek berhasil ga
			$tmpret->set("cclog", $cclog);	
			$tmpret->set("errlog", $errlog);	
			$tmpret->set("updlog", $updlog);	
			$tmpret->set("asslog", $assglog);	
			$tmpret->set("orlog", $orlog);	
			$tmpret->set("bukrs", $bukrs);				
			$tmpret->set("ex_return", $EX_RETURN);					
			if ($EX_RETURN == "FAILED"){							
				$tmpret->set("data",$dataValue);				
				$tmpret->set("version",$ver);	
				$tmpret->set("ex_return","FAILED");									
			}			
			saprfc_function_free($fce);						
			return $tmpret;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function FM9C($tahun, $data, $kokrs, $fikrs, $batch, $ver, $rfc){
		//$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){			
			$result = new server_util_Map();			
			foreach ($data->getArray() as $dataValue){
				$fce = saprfc_function_discover($rfc,"ZFMFI_FM9C");
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
				error_log("FM9C=>".$tahun.":".$dataValue->get("cc") .":".$dataValue->get("akun").":".$ver.":".$kokrs.":".$fikrs);
				saprfc_import ($fce,"IM_BATCH_INPUT"," ");
				saprfc_import ($fce,"IM_FIKRS", $fikrs);
				saprfc_import ($fce,"IM_GJAHR", $tahun);
				saprfc_import ($fce,"IM_KOKRS", $kokrs);
				saprfc_import ($fce,"IM_KOSTL", $dataValue->get("cc"));
				saprfc_import ($fce,"IM_KSTAR", $dataValue->get("akun"));
				saprfc_import ($fce,"IM_TEST_RUN"," ");
				saprfc_import ($fce,"IM_VERSN_SOURCE","00".$ver);
				saprfc_import ($fce,"IM_VERSN_TARGET","000");
				//Fill internal tables
				saprfc_table_init ($fce,"T_LOG");
				saprfc_table_init ($fce,"T_UPD_CC_LOG");
				saprfc_table_init ($fce,"T_UPD_ERR_LOG");
				saprfc_table_init ($fce,"T_UPD_LOG");
				saprfc_table_init ($fce,"T_UPD_NO_ASSGMN_LOG");
				saprfc_table_init ($fce,"T_UPD_OR_LOG");
				saprfc_table_init ($fce,"T_UPD_WRONG_BUKRS");
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters			
				$EX_RETURN = saprfc_export ($fce,"EX_RETURN");
				//error_log("EX_RET FM9C:".$EX_RETURN);
				$log = new server_util_arrayList();			
				$cclog = new server_util_arrayList();			
				$errlog = new server_util_arrayList();			
				$updlog = new server_util_arrayList();			
				$assglog = new server_util_arrayList();			
				$orlog = new server_util_arrayList();			
				$bukrs = new server_util_arrayList();			
				$rows = saprfc_table_rows ($fce,"T_LOG");				
				$ret = array();
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){	
							if ($EX_RETURN == "FAILED") {
								if (strpos(strtolower($val),"posted") > 1) $EX_RETURN = "SUCCESS";
								$pos = strpos(strtolower($val),"no data found for processing" );
								if (gettype($pos) != "boolean") $EX_RETURN = "SUCCESS";
								error_log("T_LOG->".$k .":".$val);					
							}
							error_log("T_LOG->".$k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$log->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_CC_LOG");
				//error_log("T_UPD_CC_LOG length:".$rows);
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_CC_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_CC->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$cclog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_ERR_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_ERR_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_ERR->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$errlog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$updlog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_NO_ASSGMN_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_NO_ASSGMN_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_NO_ASSG->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$assglog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_OR_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_OR_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_OR_LOG->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$orlog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_WRONG_BUKRS");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_WRONG_BUKRS",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){				
							if ($EX_RETURN == "FAILED") error_log("WRONG BUKRS->". $k .":".$val);							
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$bukrs->add($tmp);
				}				
				$tmpret = new server_util_Map();				
				$tmpret->set("log", $log);//hasil untuk ngecek berhasil ga
				$tmpret->set("cclog", $cclog);	
				$tmpret->set("errlog", $errlog);	
				$tmpret->set("updlog", $updlog);	
				$tmpret->set("asslog", $assglog);	
				$tmpret->set("orlog", $orlog);	
				$tmpret->set("bukrs", $bukrs);				
				$tmpret->set("ex_return", $EX_RETURN);		
				error_log("EX_RETURN2:$EX_RETURN");
				if ($EX_RETURN == "FAILED"){
					$res = new server_util_Map();									
					$res->set("log",$log);
					$res->set("cclog", $cclog);	
					$res->set("errlog", $errlog);	
					$res->set("updlog", $updlog);	
					$res->set("asslog", $assglog);	
					$res->set("orlog", $orlog);
					$res->set("data",$dataValue);
					$res->set("success",$result);					
					$res->set("version",$ver);	
					$res->set("ex_return","FAILED");					
					return $res;
				}else $result->set($dataValue->get("cc").":".$dataValue->get("akun"), $tmpret);				
				saprfc_function_free($fce);
			}
			$result->set("ex_return",$EX_RETURN);
			error_log("lsat EX_RETURN2:$EX_RETURN");
			//saprfc_close($rfc);			
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function FM9CCPX($tahun, $data, $kokrs, $fikrs, $batch, $ver, $rfc){
		//$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){			
			$result = new server_util_Map();			
			foreach ($data->getArray() as $dataValue){
				$fce = saprfc_function_discover($rfc,"ZFMFI_FM9C_CAPEX");
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
				//error_log("FM9C=>".$tahun.":".$dataValue->get("cc") .":".$dataValue->get("akun").":".$ver.":".$kokrs.":".$fikrs);				
				$fund = $this->getFundDetail($login, $dataValue->get("wbs"), $rfc);
				saprfc_import ($fce,"IM_BATCH_INPUT"," ");
				saprfc_import ($fce,"IM_FIKRS", $fikrs);
				saprfc_import ($fce,"IM_GJAHR", $tahun);
				saprfc_import ($fce,"IM_KOKRS", $kokrs);
				saprfc_import ($fce,"IM_KOSTL", $dataValue->get("cc"));
				saprfc_import ($fce,"IM_KSTAR", $dataValue->get("akun"));
				saprfc_import ($fce,"IM_FINCODE", $fund->get("fund"));//1100010102
				saprfc_import ($fce,"IM_TEST_RUN"," ");
				saprfc_import ($fce,"IM_VERSN_SOURCE","00".$ver);
				saprfc_import ($fce,"IM_VERSN_TARGET","000");
				//Fill internal tables
				//
				saprfc_table_init ($fce,"T_LOG");
				saprfc_table_init ($fce,"T_UPD_CC_LOG");
				saprfc_table_init ($fce,"T_UPD_ERR_LOG");
				saprfc_table_init ($fce,"T_UPD_LOG");
				saprfc_table_init ($fce,"T_UPD_NO_ASSGMN_LOG");
				saprfc_table_init ($fce,"T_UPD_OR_LOG");
				saprfc_table_init ($fce,"T_UPD_WRONG_BUKRS");
				//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
				//Retrieve export parameters			
				$EX_RETURN = saprfc_export ($fce,"EX_RETURN");
				//error_log("EX_RET FM9C:".$EX_RETURN);
				$log = new server_util_arrayList();			
				$cclog = new server_util_arrayList();			
				$errlog = new server_util_arrayList();			
				$updlog = new server_util_arrayList();			
				$assglog = new server_util_arrayList();			
				$orlog = new server_util_arrayList();			
				$bukrs = new server_util_arrayList();			
				$rows = saprfc_table_rows ($fce,"T_LOG");				
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){	
							if ($EX_RETURN == "FAILED") {
								if (strpos(strtolower($val),"posted") > 1) $EX_RETURN = "SUCCESS";
								$pos = strpos(strtolower($val),"no data found for processing" );
								if (gettype($pos) != "boolean") $EX_RETURN = "SUCCESS";
								error_log("T_LOG->".$k .":".$val);					
							}
							error_log("T_LOG->".$k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$log->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_CC_LOG");
				//error_log("T_UPD_CC_LOG length:".$rows);
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_CC_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_CC->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$cclog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_ERR_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_ERR_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_ERR->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$errlog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$updlog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_NO_ASSGMN_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_NO_ASSGMN_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_NO_ASSG->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$assglog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_OR_LOG");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_OR_LOG",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){						
							if ($EX_RETURN == "FAILED") error_log("UPD_OR_LOG->". $k .":".$val);					
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$orlog->add($tmp);
				}
				$rows = saprfc_table_rows ($fce,"T_UPD_WRONG_BUKRS");
				for ($i=1;$i<=$rows;$i++){
					$ret[] = saprfc_table_read ($fce,"T_UPD_WRONG_BUKRS",$i);
					$tmp = new server_util_Map();
					foreach ($ret as $key => $value){
						$row = new server_util_Map();
						foreach ($value as $k => $val){				
							if ($EX_RETURN == "FAILED") error_log("WRONG BUKRS->". $k .":".$val);							
							$row->set($k,$val);
						}
						$tmp->set($key,$row);
					} 
					$ret = array();
					$bukrs->add($tmp);
				}				
				$tmpret = new server_util_Map();				
				$tmpret->set("log", $log);//hasil untuk ngecek berhasil ga
				$tmpret->set("cclog", $cclog);	
				$tmpret->set("errlog", $errlog);	
				$tmpret->set("updlog", $updlog);	
				$tmpret->set("asslog", $assglog);	
				$tmpret->set("orlog", $orlog);	
				$tmpret->set("bukrs", $bukrs);				
				$tmpret->set("ex_return", $EX_RETURN);		
				//error_log("EX_RETURN2:$EX_RETURN");
				if ($EX_RETURN == "FAILED"){
					$res = new server_util_Map();									
					$res->set("log",$log);
					$res->set("cclog", $cclog);	
					$res->set("errlog", $errlog);	
					$res->set("updlog", $updlog);	
					$res->set("asslog", $assglog);	
					$res->set("orlog", $orlog);
					$res->set("data",$dataValue);
					$res->set("success",$result);					
					$res->set("version",$ver);	
					$res->set("ex_return","FAILED");					
					return $res;
				}else $result->set($dataValue->get("cc").":".$dataValue->get("akun"), $tmpret);
				
				saprfc_function_free($fce);
			}
			$result->set("ex_return",$EX_RETURN);
			//error_log("lsat EX_RETURN2:$EX_RETURN");
			//saprfc_close($rfc);			
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	/********************TRANSFER****************
	 * return:
	 * 		KP06 : 
	 * 				-> cc:akun1:log, log1
	 * 				-> cc:akun2:log, log2
	 * 				-> cc:akun3:log, log3
	 * 		FM9C :
	 * 				-> cc:akun2:log, log2
	 */
	function keepPlan($login, $tahun,$data, $kokrs, $fikrs, $batch, $ver = null){		
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){			
			$result = new server_util_Map();
			$ret1 = $this->KP06($tahun, $data, " ", "0", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("proses","KP06->Payment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("proses","KP06->Payment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("KP060",$ret1);
			
			$ret1 = $this->KP06($tahun, $data, " ", "7", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("proses","KP06->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("proses","KP06->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("KP067",$ret1);
			
			//FM9C hanya transfer per Akun
			$tmp = new server_util_Map();
			foreach ($data->getArray() as $value){
				$tmp->set($value->get("cc").":".$value->get("akun"),$value);
			}			
			$ret2 = $this->FM9C($tahun, $tmp, $kokrs, $fikrs, $batch, "0", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;		
				$result->set("ex_return","FAILED");			
				$result->set("proses","FM9C->Payment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);				
				$result->set("proses","FM9C->Payment");					
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FM9C0",$ret2);
			$ret2 = $this->FM9C($tahun, $tmp, $kokrs, $fikrs, $batch, "7", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;								
				$result->set("ex_return","FAILED");			
				$result->set("proses","FM9C->Commitment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);		
				$result->set("proses","FM9C->Commitment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("FM9C7",$ret2);
			$result->set("ex_return","SUCCESS");
			saprfc_close($rfc);	
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}	
	function transfer($login, $tahun,$data, $kokrs, $fikrs, $batch, $ver = null){		
		error_log("Start : " . date("H:i:s"));
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){			
			$result = new server_util_Map();
			$ret1 = $this->KP06($tahun, $data, $batch, "0", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("proses","KP06->Payment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("proses","KP06->Payment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("KP060",$ret1);
			$ret1 = $this->KP06($tahun, $data, $batch, "7", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("proses","KP06->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("proses","KP06->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("KP067",$ret1);
			
			//FM9C hanya transfer per Akun
			$tmp = new server_util_Map();
			foreach ($data->getArray() as $value){
				$tmp->set($value->get("cc").":".$value->get("akun"),$value);
			}			
			$ret2 = $this->FM9C($tahun, $tmp, $kokrs, $fikrs, $batch, "0", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;		
				$result->set("ex_return","FAILED");			
				$result->set("proses","FM9C->Payment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);				
				$result->set("proses","FM9C->Payment");					
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FM9C0",$ret2);
			$ret2 = $this->FM9C($tahun, $tmp, $kokrs, $fikrs, $batch, "7", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;								
				$result->set("ex_return","FAILED");			
				$result->set("proses","FM9C->Commitment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);		
				$result->set("proses","FM9C->Commitment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("FM9C7",$ret2);
			
			$tmp = new server_util_Map();
			foreach ($data->getArray() as $key => $value){
				if ($value->get("tipe") == "D") $tmp->set($key,$value);
			}			
			$ret3 = $this->FR51(null,$tahun, $tmp,$batch,  $rfc );					
			if (gettype($ret3) != "string" && $ret3->get("ex_return") == "FAILED") {			
				//rollback FM9C;
				$result->set("ex_return","FAILED");
				$result->set("FR51",$ret3);
				return $result;
			}else if (gettype($ret3) == "string"){
				$result->set("msg",$ret3);				
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FR51",$ret3);
			$result->set("ex_return","SUCCESS");
			saprfc_close($rfc);	
			return $result;
			error_log("Finish : " . date("H:i:s"));
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function transferCPX($login, $tahun,$data, $kokrs, $fikrs, $batch, $ver = null){		
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){			
			$result = new server_util_Map();
			$ret1 = $this->CJR2($tahun, $data, $batch, "0", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("CJR2",$ret1);
				$result->set("proses","CJR2->Payment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("proses","CJR2->Payment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("CJR20",$ret1);
			$ret1 = $this->CJR2($tahun, $data, $batch, "7", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("CJR2",$ret1);
				$result->set("proses","CJR2->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("proses","CJR2->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("CJR27",$ret1);
			
			//FM9C hanya transfer per Akun
			$tmp = new server_util_Map();
			foreach ($data->getArray() as $value){
				$tmp->set($value->get("cc").":".$value->get("akun"),$value);
			}
			$ret2 = $this->FM9CCPX($tahun, $tmp, $kokrs, $fikrs, $batch, "0", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;		
				$result->set("ex_return","FAILED");			
				$result->set("proses","FM9C->Payment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);				
				$result->set("proses","FM9C->Payment");					
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FM9C0",$ret2);
			$ret2 = $this->FM9CCPX($tahun, $tmp, $kokrs, $fikrs, $batch, "7", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;								
				$result->set("ex_return","FAILED");			
				$result->set("proses","FM9C->Commitment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);		
				$result->set("proses","FM9C->Commitment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("FM9C7",$ret2);
			
			$tmp = new server_util_Map();
			foreach ($data->getArray() as $key => $value){
				if ($value->get("tipe") == "D") $tmp->set($key,$value);
			}			
			$ret3 = $this->FR51CPX(null,$tahun, $tmp,$batch,  $rfc );					
			if (gettype($ret3) != "string" && $ret3->get("ex_return") == "FAILED") {			
				//rollback FM9C;
				$result->set("ex_return","FAILED");
				$result->set("FR51",$ret3);
				return $result;
			}else if (gettype($ret3) == "string"){
				$result->set("msg",$ret3);				
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FR51",$ret3);
			$result->set("ex_return","SUCCESS");
			saprfc_close($rfc);	
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error());
	}
	function getRollUp($login, $tahun, $data){	
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$fce = saprfc_function_discover($rfc,"ZFMFI_FUND");
			if (! $fce ) { return "error:Discovering interface of function module failed";  }
			//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
			saprfc_import ($fce,"IM_FINCODE",$this->convertWBS($data->get("wbs")));
			saprfc_import ($fce,"IM_GJAHR",$tahun);
			saprfc_import ($fce,"IM_KOKRS",$data->get("kokrs"));
			saprfc_import ($fce,"IM_VERSN",$data->get("ver"));
			//Fill internal tables
			//error_log("$cc:$fikrs:$akun:$tahun:$kokrs:$bln1:$bln2:$ver");
			saprfc_table_init ($fce,"T_RESULT");								
			//Do RFC call of function ZFMFI_FR51, for handling exceptions use saprfc_exception()
			$rfc_rc = saprfc_call_and_receive ($fce);
			if ($rfc_rc != SAPRFC_OK) { if ($rfc == SAPRFC_EXCEPTION ) return "error: ".saprfc_exception($fce); else return saprfc_error($fce); }
			//Retrieve export parameters			
			$restable = new server_util_Map();
			$rows = saprfc_table_rows ($fce,"T_RESULT");
			for ($i=1;$i<=$rows;$i++){
				$ret[] = saprfc_table_read ($fce,"T_RESULT",$i);
				$tmp = new server_util_Map();
				foreach ($ret as $key => $value){
					$row = new server_util_Map();
					foreach ($value as $k => $val){						
						$row->set($k,floatval($val));
					}
					$tmp->set($key,$row);
				} 
				$ret = array();
				$restable = $tmp;							
			}			
			saprfc_function_free($fce);
			saprfc_close($rfc);
			$result = new server_util_Map();			
			$result->set("T_RESULT", $restable);							
			return $result;
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error()) ;
	}
	function convertWBS($wbs){
		if (substr($wbs,0,1) == "T" ){
			$temp = explode("-",$wbs);
			if (floatval($temp[1]) >= 11){
				$wbs = str_replace("-","",$wbs);
				$fund = substr($wbs,1,10);
			}else {
				$wbs = str_replace("-","",$wbs);
				//T1100010102i     
				$fund = substr($wbs,2,10);
			}
		} else if (strlen($wbs) == 10)$fund = $wbs;
		else $fund = $wbs;
		return strtoupper($fund);
	}
	/*$sysinfo_fce = @saprfc_function_discover ($rfc,"RFC_SYSTEM_INFO"); 
if ($sysinfo_fce) 
{
     // do RFC call to connected R/3 system
     $retval = @saprfc_call_and_receive ($sysinfo_fce); 
     if ($retval == SAPRFC_OK) 
     {
          // retrieve export (output) parametr RFCSI_EXPORT
          $sysinfo = saprfc_export ($sysinfo_fce,"RFCSI_EXPORT");
          $RFC_SYSTEM_INFO = sprintf ("system id: %s (%s), client=%03d, user=%s, application server=%s (%s,%s,%s), database=%s (%s)",
                                       $sysinfo["RFCSYSID"],$sysinfo["RFCSAPRL"],$l["CLIENT"],$l["USER"],$sysinfo["RFCHOST"], $sysinfo["RFCOPSYS"],
                                       $sysinfo["RFCIPADDR"],$sysinfo["RFCKERNRL"], $sysinfo["RFCDBHOST"], $sysinfo["RFCDBSYS"] );
     }
     // free allocated resources
     @saprfc_function_free ($sysinfo_fce);
}
	 * */
	function getSAPInfo($login){
		error_log("asdf");
		$this->rfc = new server_util_rfcLib($this->options);
		$rfc = $this->rfc->login($login->get("user"), $login->get("passwd"));
		if ($rfc){
			$sapImp = new server_util_Map();
			$sapExp = new server_util_arrayList(array("RFCSI_EXPORT"));		
			$tmp = $this->rfc->callRFC($login,"RFC_SYSTEM_INFO", $sapImp, null, null, $sapExp, true);			
			error_log($tmp);
			return $tmp->get("RFCSI_EXPORT");		
		}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error()) ;
	}
}
?>
