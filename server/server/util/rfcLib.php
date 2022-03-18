
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

class server_util_rfcLib  extends server_BasicObject
{
	protected $options;
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
	function login($usr, $pwd){		
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
	/* login = arrayMap => user => uid, passwd => pwd
	 * sapFunc = string = sap function 
	 * sapImp = arrayMap = import parameter, sap import field => value
	 * sapExpTable = arrayList = list of export table, TLOG, T51
	 * sapImpTable = arrayMap = import table.
	 * 					table1 = array of table content (arrayMap)
	 * 							1 => arrayMap => field1 => value1, field2 => value2
	 * 							2 => arrayMap => field1 => value1, field2 => value2
	 * 					table2 = array of table content (arrayMap)
	 * 							1 => arrayMap => field1 => value1, field2 => value2
	 * 							2 => arrayMap => field1 => value1, field2 => value2
	 * sapExp = string = export return value. (EX_RETURN)
	 * 	
	 * */
	function callRFC($login, $sapFunc, $sapImp,  $sapExpTable = null, $sapImpTable = null, $sapExp = null, $closeRfc = null, $keepRFC = null, $rfc = null){
		try{
			if (!isset($rfc)) $rfc = $this->login($login->get("user"),$login->get("passwd"));
			if ($rfc){
				$fce = saprfc_function_discover($rfc,$sapFunc);
				if (! $fce ) { return "error:Discovering interface of function module failed($sapFunc))";  }
				foreach ($sapImp->getArray() as $impField => $impValue){				
					saprfc_import ($fce,$impField,$impValue);				
				}
				if (isset($sapExpTable)){
					foreach ($sapExpTable->getArray() as $expValue){
						saprfc_table_init ($fce,$expValue);
					}
				}
				if (isset($sapImpTable)){
					foreach($sapImpTable->getArray() as $table => $tabValue){
						saprfc_table_init ($fce,$table);					
						foreach ($tabValue->getArray() as $value){						
							saprfc_table_append($fce, $table, $value);						
						}					
					}
				}			
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { 
					if ($rfc == SAPRFC_EXCEPTION ) 
						return "error: ".saprfc_exception($fce); 
					else return "error: ".str_replace("\n","<br>",saprfc_error($fce));
				}
				$result = new server_util_Map();
				if (isset($sapExp)){				
					if (gettype($sapExp) == "string"){			
						$value = saprfc_export ($fce,$sapExp);						
						if (gettype($value) == "array"){
							$tmp = new server_util_Map($value);
							$result->set($sapExp, $tmp);
						}else $result->set($sapExp, $value);
					}else foreach ($sapExp->getArray() as $value){					
						$valtmp = saprfc_export ($fce,$value);						
						if (gettype($valtmp) == "array"){							
							$tmp = new server_util_Map($valtmp);
							$result->set($value, $tmp);
						}else $result->set($value, $valtmp);						
					}
				}
				if (isset($sapExpTable)){
					foreach ($sapExpTable->getArray() as $expValue){
						$tmpExport = new server_util_arrayList();
						$rows = saprfc_table_rows ($fce,$expValue);
						$table = array();
						for ($i=1;$i<=$rows;$i++){
							$table[] = saprfc_table_read ($fce,$expValue,$i);
							$tmp = new server_util_Map();							
							foreach ($table as $key => $logval){
								$row = new server_util_Map();
								foreach ($logval as $k => $val){									
									if (isset($sapExp)){				
										if ($result->get("EX_RETURN") == "FAILED"){
											if (strpos(strtolower($val),"posted") > 1) $result->set("EX_RETURN","SUCCESS");							
											//The records are already being processed
											if (strpos(strtolower($val),"already being processed") > 1) $result->set("EX_RETURN","SUCCESS");							
										}
									}												
									$row->set($k,$val);
								}
								$tmp->set($key,$row);
							} 
							$table = array();
							$tmpExport->add($tmp);
						}
						$result->set($expValue, $tmpExport);								
					}
				}
				saprfc_function_free($fce);
				if ($keepRFC) $result->set("rfc",$rfc);
				if ($closeRfc) saprfc_close($rfc);			
				return $result;		
			}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error()) ;
		}catch(Exception $e){
			return "error:$sapFunc" . $e->getMessage(). "<br>". str_replace("\n","<br>",saprfc_error());
		}
	}
	function callRFCToJSON($login, $sapFunc, $sapImp,  $sapExpTable = null, $sapImpTable = null, $sapExp = null, $closeRfc = null, $keepRFC = null, $rfc = null){
		try{
			if (!isset($rfc)) $rfc = $this->login($login->get("user"),$login->get("passwd"));
			if ($rfc){
				$fce = saprfc_function_discover($rfc,$sapFunc);
				if (! $fce ) { return "error:Discovering interface of function module failed($sapFunc))";  }
				foreach ($sapImp->getArray() as $impField => $impValue){
					saprfc_import ($fce,$impField,$impValue);
				}
				if (isset($sapExpTable)){
                    //error_log($sapFunc .":".$sapExpTable);
					foreach ($sapExpTable->getArray() as $expValue){
						saprfc_table_init ($fce,$expValue);
					}
				}
				if (isset($sapImpTable)){
                    //error_log($sapFunc .":".$sapImpTable);
					foreach($sapImpTable->getArray() as $table => $tabValue){
                        //error_log($sapFunc .":".$table .":".$tabValue);
						saprfc_table_init ($fce,$table);
                        if ($tabValue){
                            foreach ($tabValue->getArray() as $value){
                                saprfc_table_append($fce, $table, $value);
                            }
                        }
					}
				}
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) {
					if ($rfc == SAPRFC_EXCEPTION )
						return "error: ".saprfc_exception($fce);
					else return "error: ".str_replace("\n","<br>",saprfc_error($fce));
				}
				$result = new server_util_Map();
				if (isset($sapExp)){
					if (gettype($sapExp) == "string"){
						$value = saprfc_export ($fce,$sapExp);
						if (gettype($value) == "array"){
							$tmp = new server_util_Map($value);
							$result->set($sapExp, $tmp);
						}else $result->set($sapExp, $value);
					}else foreach ($sapExp->getArray() as $value){
						$valtmp = saprfc_export ($fce,$value);
						if (gettype($valtmp) == "array"){
							$tmp = new server_util_Map($valtmp);
							$result->set($value, $tmp);
						}else $result->set($value, $valtmp);
					}
				}
				if (isset($sapExpTable)){
					foreach ($sapExpTable->getArray() as $expValue){
						$tmpExport = new server_util_arrayList();
						$rows = saprfc_table_rows ($fce,$expValue);
						$table = array();
						for ($i=1;$i<=$rows;$i++){
							$table[] = saprfc_table_read ($fce,$expValue,$i);
						}
						$result->set($expValue, $table);
					}
				}
				saprfc_function_free($fce);
				if ($keepRFC) $result->set("rfc",$rfc);
				if ($closeRfc) saprfc_close($rfc);
				return $result;
			}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error()) ;
		}catch(Exception $e){
			return "error:$sapFunc" . $e->getMessage(). "<br>". str_replace("\n","<br>",saprfc_error());
		}
	}
	//sementara hanya untuk VEAT
	/*try
		{						
			$ret = $this->connect();
			if ($ret != "success") throw new Exception($ret);
			$this->db->BeginTrans();			
			$dbdriver = $this->connection->driver;
			foreach($sql->getArray() as $key=> $value)
			{							
				if (!$this->isDropSQL($sql)) return "Error SQL:$sql";
				//$value = strtolower($value);
				if ($dbdriver == "ado_mssql" || $dbdriver == "odbc_mssql") {
					$value = $this->sqlConvertSqlSvr($value);
				}else if ($dbdriver == "oci8"){
					$value = $this->sqlConvertOra($value);
				}				
				$ok = $this->db->Execute($value);							
				if (!$ok) 
				{	
//					$this->db->FailTrans();					
					//$this->db->Close();					
					throw new Exception($this->db->ErrorMsg() . "\r\n" .$value);
				}
			}
			$this->db->CommitTrans();
			//$this->db->Close();
			return "process completed";
		}catch(Exception $e)
		{
			$this->db->RollbackTrans();			
//			error_log("error " . $e->getMessage());
//			write($e->getMessage() . NEW_LINE);
			error_log($e->getMessage());
			return " error " .  $e->getMessage();
		}
	 * */
	function callRFCBuffer($login, $sapFunc, $sapImp,  $sapTable = null, $sapExp = null, $closeRfc = null, $bufferKey, $dbTable = null, $dbField = null, $dbSetting = null, $rfcField = null){
		
		try{						
			if (!isset($rfc)) $rfc = $this->login($login->get("user"),$login->get("passwd"));
			uses("server_DBConnection_dbLib");
			uses("server_util_arrayList");			
			if ($rfc){
				$fce = saprfc_function_discover($rfc,$sapFunc);
				if (! $fce ) { return "error:Discovering interface of function module failed($sapFunc))";  }
				foreach ($sapImp->getArray() as $impField => $impValue){				
					saprfc_import ($fce,$impField,$impValue);				
				}				
				if (isset($sapTable)){
					foreach($sapTable->getArray() as $table => $tabValue){
						saprfc_table_init ($fce,$tabValue);					
						//foreach ($tabValue->getArray() as $value){						
						//	saprfc_table_append($fce, $table, $value);						
						//}					
					}
				}			
				$rfc_rc = saprfc_call_and_receive ($fce);
				if ($rfc_rc != SAPRFC_OK) { 
					if ($rfc == SAPRFC_EXCEPTION ) 
						return "error: ".saprfc_exception($fce); 
					else return "error: ".str_replace("\n","<br>",saprfc_error($fce));
				}
				$result = new server_util_Map();
				if (isset($sapExp)){				
					if (gettype($sapExp) == "string"){			
						$value = saprfc_export ($fce,$sapExp);						
						if (gettype($value) == "array"){
							$tmp = new server_util_Map($value);
							$result->set($sapExp, $tmp);
						}else $result->set($sapExp, $value);
					}else foreach ($sapExp->getArray() as $value){					
						$valtmp = saprfc_export ($fce,$value);						
						if (gettype($valtmp) == "array"){							
							$tmp = new server_util_Map($valtmp);
							$result->set($value, $tmp);
						}else $result->set($value, $valtmp);						
					}
				}
				if (isset($sapTable)){
					$dbLib = new server_DBConnection_dbLib($dbSetting);
					$ret = $dbLib->connect();
					if ($ret != "success") throw new Exception($ret);
					$db = $dbLib->db;
					$db->BeginTrans();
					$bufferSize = 1000;
					$count = 0;							
					$dataTemp = new server_util_Map();
					foreach ($sapTable->getArray() as $expValue){
						$tmpExport = new server_util_arrayList();
						$rows = saprfc_table_rows ($fce,$expValue);
						$table = array();						
						for ($i=1;$i<=$rows;$i++){
							$table[] = saprfc_table_read ($fce,$expValue,$i);
							$tmp = new server_util_Map();							
							$count++;
							foreach ($table as $key => $logval){
								$row = new server_util_Map();								
								foreach ($logval as $k => $val){
									if (isset($sapExp)){				
										if ($result->get("EX_RETURN") == "FAILED"){
											if (strpos(strtolower($val),"posted") > 1) $result->set("EX_RETURN","SUCCESS");							
											//The records are already being processed
											if (strpos(strtolower($val),"already being processed") > 1) $result->set("EX_RETURN","SUCCESS");							
										}
									}
									$row->set($k,$val);
								}
								$values = array();								
								$rfcFields = explode(",",$rfcField);	
								$values[0] = $logval["ANLN1"] . floatval($logval["ANLN2"]);
								foreach ($rfcFields as $k => $field){
									$key = $k + 1;
									$val = $logval[$field];
									if ($field == "AKTIV"){
										$val = substr($val,0,4)."/".substr($val,4,2)."/".substr($val,6,2);
										$val = "to_date('$val','yyyy/mm/dd')";										
										$values[$key] = $val;
									}else if ($field == "ACM_DEP"){
										$val = str_replace(".","",trim($val));										
										if ($val != "0"){
											if (strpos($val,"-") > 1 )
												$val = floatval($val) * -1;
											else $val = floatval($val);
										}
										$values[$key] = $val;
									}else if ($field == "ACC_VAL" || $field == "BOOK_VAL"){
										$val = str_replace(".","",trim($val));
										$values[$key] = $val;
									}else if ($field == "MENGE"){
										$val = explode(".",$val);
										$values[$key] = floatval($val[0]);
									}else { 
										$val = str_replace("'","''", $val);									
										$values[$key] = "'".$val."'";
									}									
								}
								//if ($dataTemp->get($logval[$bufferKey]) == null)
								if (count( $values ) > 1 )
								{
									$values = implode(",", $values);									
									$query = "insert into $dbTable(no_gabung,$dbField) values ($values)";
									$ok = $db->Execute($query);							
									if (!$ok) 
									{	
										throw new Exception($db->ErrorMsg() . "\r\n" .$query);
									}
									//$dataTemp->set($logval[$bufferKey], $logval[$bufferKey]);
								}
							} 
							$table = array();
							if ($count < $bufferSize) 
								$tmpExport->add($tmp);
						}						
						$result->set($expValue, $tmpExport);								
					}
				}
				saprfc_function_free($fce);
				if ($keepRFC) $result->set("rfc",$rfc);
				if ($closeRfc) saprfc_close($rfc);			
				$db->CommitTrans();
				$result->setTag1($rows);
				return $result;		
			}else return "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error()) ;
		}catch(Exception $e){
			if (isset($db))
				$db->RollbackTrans();						
			return "error:$sapFunc" . $e->getMessage(). "<br>". str_replace("\n","<br>",saprfc_error());
		}
	}
}
?>
