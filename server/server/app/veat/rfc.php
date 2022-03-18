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

class server_app_veat_rfc  extends server_BasicObject
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
		$this->config = new server_util_Config("rra/sap");	
		$this->sysnr = $this->config->get("sysnr"); 	
		$this->host = $this->config->get("host"); 	
		$this->client = $this->config->get("client"); 		
		try{		
			$login = array (
				"ASHOST"=>$host,
				"SYSNR"=>$sysnr,
				"CLIENT"=>$client,
				"USER"=>$usr,
				"PASSWD"=>$pwd,
				"CODEPAGE"=>$codepage);
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
	function dataAset($login, $login){				
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
	function dataGL($login, $tahun, $bln1, $bln2, $cc, $akun, $fikrs, $kokrs, $wrttp, $ver){				
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
	
}
?>
