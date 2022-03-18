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

class server_app_saku2_alert  extends server_BasicObject
{
	function __construct()
	{
		parent::__construct();	
	}
	protected function doSerialize()
	{
		parent::doSerialize();
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}	
	function login($host, $sysnr, $client, $usr, $pwd, $codepage){
		$login = array (
			"ASHOST"=>$host,
			"SYSNR"=>$sysnr,
			"CLIENT"=>$client,
			"USER"=>$usr,
			"PASSWD"=>$pwd,
			"CODEPAGE"=>$codepage);
		return saprfc_open ($login );		
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
		}else return "error:RFC connection failed";
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
		}else return "error:RFC connection failed";
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
		}else return "error:RFC connection failed";
	}
	function dataGar($login, $tahun, $data, $fikrs, $kokrs,$wrttp, $ver){
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$result = new server_util_Map();
			$result->set("saldo",$this->cekSaldos(null,$tahun, $data, $fikrs, $kokrs, $wrttp, $ver, $rfc));
			$result->set("saldothn",$this->cekSaldoThn(null,$tahun, $data, $fikrs, $kokrs, $wrttp, $ver, $rfc));
			return $result;
		}else return "error:RFC connection failed";
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
	function FR51($login,$tahun, $data, $batch, $rfc = null){
		if ($rfc == null) $rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){
			$return = new server_util_Map();
			$dataSuccess = new server_util_arrayList();
			foreach ($data->getArray() as $ix => $value){				
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
		}else return "error:RFC connection failed";
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
		}else return "error:RFC connection failed";
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
					$res->set("version",$ver);	
					$status->set("success",$dataSuccess);
					//if ($dataSuccess->getLength() > 0) $this->KP06($tahun, $dataSuccess, $batch, $ver, $rfc);
					return $status;
				}				
			}
			//saprfc_close($rfc);
			$result->set("ex_return",$EX_RETURN);
			return $result;
		}else return "error:RFC connection failed";
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
		}else return "error:RFC connection failed";
	}
	function FM9C($tahun, $data, $kokrs, $fikrs, $batch, $ver, $rfc){
		//$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){			
			$result = new server_util_Map();			
			foreach ($data->getArray() as $dataValue){
				$fce = saprfc_function_discover($rfc,"ZFMFI_FM9C");
				if (! $fce ) { return "error:Discovering interface of function module failed";  }
				//Set import parameters. You can use function saprfc_optional() to mark parameter as optional.
				//error_log("FM9C=>".$tahun.":".$dataValue->get("cc") .":".$dataValue->get("akun").":".$ver.":".$kokrs.":".$fikrs);
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
		}else return "error:RFC connection failed";
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
			$ret1 = $this->KP06($tahun, $data, $batch, "0", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("prosess","KP06->Payment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("prosess","KP06->Payment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("KP060",$ret1);
			$ret1 = $this->KP06($tahun, $data, $batch, "7", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("prosess","KP06->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("prosess","KP06->Commitment");			
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
				$result->set("prosess","FM9C->Payment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);				
				$result->set("prosess","FM9C->Payment");					
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FM9C0",$ret2);
			$ret2 = $this->FM9C($tahun, $tmp, $kokrs, $fikrs, $batch, "7", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;								
				$result->set("ex_return","FAILED");			
				$result->set("prosess","FM9C->Commitment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);		
				$result->set("prosess","FM9C->Commitment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("FM9C7",$ret2);
			$result->set("ex_return","SUCCESS");
			saprfc_close($rfc);	
			return $result;
		}else return "error:RFC connection failed";
	}	
	function transfer($login, $tahun,$data, $kokrs, $fikrs, $batch, $ver = null){		
		$rfc = $this->login($login->get("host"), $login->get("sysnr"), $login->get("client"), $login->get("user"), $login->get("passwd"), $login->get("codepage"));
		if ($rfc){			
			$result = new server_util_Map();
			$ret1 = $this->KP06($tahun, $data, $batch, "0", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("prosess","KP06->Payment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("prosess","KP06->Payment");			
				$result->set("ex_return","FAILED");				
				return $result;
			}else $result->set("KP060",$ret1);
			$ret1 = $this->KP06($tahun, $data, $batch, "7", $rfc );		
			if (gettype($ret1) != "string" && $ret1->get("ex_return") == "FAILED") {
				$result->set("KP06",$ret1);
				$result->set("prosess","KP06->Commitment");			
				$result->set("ex_return","FAILED");
				return $result;			
			}else if (gettype($ret1) == "string"){				
				$result->set("msg",$ret1);				
				$result->set("prosess","KP06->Commitment");			
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
				$result->set("prosess","FM9C->Payment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);				
				$result->set("prosess","FM9C->Payment");					
				$result->set("ex_return","FAILED");
				return $result;
			}else $result->set("FM9C0",$ret2);
			$ret2 = $this->FM9C($tahun, $tmp, $kokrs, $fikrs, $batch, "7", $rfc );
			if (gettype($ret2) != "string" && $ret2->get("ex_return") == "FAILED") {
				//rollback KP06;								
				$result->set("ex_return","FAILED");			
				$result->set("prosess","FM9C->Commitment");						
				$result->set("FM9C",$ret2);
				return $result;
			}else if (gettype($ret2) == "string"){
				$result->set("msg",$ret2);		
				$result->set("prosess","FM9C->Commitment");			
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
		}else return "error:RFC connection failed";
	}
}
?>
