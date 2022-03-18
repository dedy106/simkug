<?php
	try{
		global $dirSeparator;
		global $serverDir;
		$serverDir = __FILE__;
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
	    {
	        $dirSeparator = "\\";
	        $separator = ";";
	    }
	    else
	    {
	        $dirSeparator = "/";
	        $separator = ":";
	    }
	    echo $serverDir."<br>";
		$pos = strrpos($serverDir, $dirSeparator);
		$serverDir = substr($serverDir, 0, $pos);
		echo $serverDir."<br>";
		$pos = strrpos($serverDir, $dirSeparator);
		$rootDir = substr($serverDir, 0, $pos);
		$pos = strrpos($rootDir, $dirSeparator);
		echo $rootDir."<br>$dirSeparator<br>";
		$path = $rootDir;
		$rootDir = substr($rootDir,$pos);
		ini_set('display_errors', 'Off');
		ini_set ('track_errors', 'On');
		ini_set ('max_execution_time', '1000');
		//ini_set ('memory_limit', '2024M');
		ini_set ('post_max_size	', '20M');
		ini_set ('log_errors',   'On');

		ini_set ('error_log',    $path.$dirSeparator."server".$dirSeparator."tmp".$dirSeparator."php_error.log");
		set_include_path(get_include_path() . PATH_SEPARATOR . $dirSeparator."appl".$dirSeparator."php".$dirSeparator."lib".$dirSeparator."php");
		set_include_path(get_include_path() . PATH_SEPARATOR . $dirSeparator."appl".$dirSeparator."php".$dirSeparator."lib".$dirSeparator."php".$dirSeparator."PEAR");
		set_include_path(get_include_path() . PATH_SEPARATOR . $path .$dirSeparator."server");
		//set_include_path(get_include_path() . PATH_SEPARATOR . $path .$dirSeparator."server".$dirSeparator."OLE");
		set_include_path(get_include_path() . PATH_SEPARATOR . $path .$dirSeparator."server".$dirSeparator."PHPExcel".$dirSeparator."Shared");
		set_include_path(get_include_path() . PATH_SEPARATOR . $path .$dirSeparator."server".$dirSeparator."PHPExcel".$dirSeparator."Shared".$dirSeparator."OLE");
		set_include_path(get_include_path() . PATH_SEPARATOR . $path .$dirSeparator."server/server/modules/codeplex");

		error_reporting (E_ALL & ~E_NOTICE & ~E_WARNING);
		echo "start..<br>";
		include_once("library.php");
		echo "load dblib..<br>";
		uses("server_DBConnection_dbLib");
		echo "load arrayList..<br>";
		uses("server_util_arrayList");
		uses("server_util_Map");
		$done = false;
		$dbLib = new server_DBConnection_dbLib("orarra");
		$periode = date("Y");
		$jam = date("H");
		echo "starting...<br>";
		uses("server_util_rfcLib");
		
		
				
		function callRFC2($akun, $postfrom, $postto){
			try{
				$dbLib = new server_DBConnection_dbLib("mssql");
				/*
				$rs = $dbLib->execute("select a.kode_lokasi, b.ip, b.sys_id, b.ins_num, b.sap_router, a.sapuser, a.sappwd  
										from bpc_conn a 
										inner join bpc_sapconn b on b.kode = a.KODE_SERVER
								where a.kode_lokasi = '1000' ");
				*/
				$login = new server_util_Map();
				
				$rs = $dbLib->execute("select sap_user,sap_pwd from hakakses where nik='749006' ");
				
				$login = new server_util_Map();
				if ($row = $rs->FetchNextObject(false)){					
					echo "login sap <br>" ;
					$login->set("user", $row->sap_user);
					$login->set("passwd",$row->sap_pwd);

				}else {
					return false;
				}
				
				/* matiin MR 23-10-2020
				//if ($row = $rs->FetchNextObject(false)){
					echo "$row->sapuser <br>" ;
					
					$login->set("user", "yks-func1");
					$login->set("passwd","sap9913");
				//}else {
					//return false;
				//}
				*/


				global $serverDir;
				$sapImp = new server_util_Map(array(
										"COMPANYCODE" => "YKES" ,
										"GLACCT" => "00".$akun,
										"GSBER" => " ",
										"POSTDATE_FROM"	=> $postfrom,
										"POSTDATE_TO" => $postto,
										"XBLNR" => " "
										));
				echo "SAP Calll $akun <br>";
				$sapExpTable = new server_util_Map(array("LINEITEMS"));
				$data = callRFCToFile($login,"ZRFC_FINEST_GET_GL_LI", $sapImp, $sapExpTable, null, null);
				echo "Don SAP CALL <br>";
				return $data;
			}catch(Exception $e){
				echo $e->getMessage();
			}
		}
		function callRFC3($login, $rfcLib, $rfc, $akun, $postfrom, $postto){
			try{
				global $dbLib;
				global $serverDir;
				//$res = $dbLib->execute("select ba from xtmp_ba where ba like '35%' ");

				$sapImp = new server_util_Map(array(
										"COMPANYCODE" => "YKES" ,
										"GLACCT" => "00".$akun,
										"GSBER" => " ",
										"POSTDATE_FROM"	=> $postfrom,
										"POSTDATE_TO" => $postto,
										"XBLNR" => " "
										));
				//echo "SAP Calll $akun <br>";
				$sapExpTable = new server_util_Map(array("LINEITEMS"));
				$data = callRFCToFile($login, $rfcLib, $rfc, "ZRFC_FINEST_GET_GL_LI", $sapImp, $sapExpTable, null, null);
				//echo "Don SAP CALL <br>";
				return $data;
			}catch(Exception $e){
				echo $e->getMessage();
			}
		}
		function callRFC($login, $rfcLib, $rfc, $akun, $postfrom, $postto){
			try{
				global $dbLib;
				global $serverDir;
				//$res = $dbLib->execute("select ba from xtmp_ba where ba like '35%' ");

				$sapImp = new server_util_Map(array(
										"COMPANYCODE" => "YKES" ,
										"GL" => "00".$akun,
										"KEYDATE" => $postto,
										"NOTEDITEMS" => " "
										));
				//echo "SAP Calll $akun <br>";
				$budat = new server_util_arrayList();
				$budat->add(array("SIGN" => "I", "OPTION" =>"BT", "LOW" => $postfrom, "HIGH" => $postto));
			
				$sapImpTable = new server_util_Map(array("T_BUDAT" => $budat));
				$sapExpTable = new server_util_Map(array("LINEITEMS"));
				$data = callRFCToFile($login, $rfcLib, $rfc, "ZRFC_GL_FBL3N", $sapImp, $sapExpTable, $sapImpTable, null);
				//echo "Don SAP CALL <br>";
				
				return $data;
			}catch(Exception $e){
				echo $e->getMessage();
			}
		}
		function callRFCToFile($login,$rfcLib, $rfc,  $sapFunc, $sapImp,  $sapExpTable = null, $sapImpTable = null, $sapExp = null){
			try{
			
				
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
							echo "error: ".saprfc_exception($fce);
						else echo "error: ".str_replace("\n","<br>",saprfc_error($fce));
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
					$result = array();
					if (isset($sapExpTable)){
						//echo "result <br>";
						foreach ($sapExpTable->getArray() as $expValue){
							$rows = saprfc_table_rows ($fce,$expValue);
							$first = true;
							//echo json_encode($rows);  
							for ($i=1;$i<=$rows;$i++){
								$rowValue = saprfc_table_read ($fce,$expValue,$i);
								
								$amount = $rowValue["WRBTR"];
                                $lclAmount = $rowValue["DMBTR"];
                                if (strpos($amount,"-") > 0)
									$amount = -floatval($amount);
								else $amount = floatval($amount);	
								
                                if (strpos($lclAmount,"-") > 0)
									$lclAmount = -floatval($lclAmount);
								else $lclAmount = floatval($lclAmount);
								/*
				BUKRS
C(4)	HKONT
C(10)	AUGDT
D(8)	AUGBL
C(10)	ZUONR
C(18)	GJAHR
N(4)	BELNR
C(10)	BUZEI
N(3)	BUDAT
D(8)	BLDAT
D(8)	WAERS
C(5)	XBLNR
C(16)	BLART
C(2)	MONAT
N(2)	BSCHL
C(2)	SHKZG
C(1)	GSBER
C(4)	MWSKZ
C(2)	FKONT
N(3)	DMBTR
P(12)	WRBTR
P(12)	MWSTS
P(7)	WMWST
P(7)	SGTXT
C(50)	PROJN
C(16)	AUFNR
C(12)	WERKS
C(4)	KOSTL
C(10)	ZFBDT
D(8)	XOPVW
C(1)	VALUT
D(8)	BSTAT
C(1)	BDIFF
P(7)	BDIF2
P(7)	VBUND
C(6)	PSWSL
C(5)	WVERW
C(1)	DMBE2
P(7)	DMBE3
P(7)	MWST2
P(7)	MWST3
P(7)	BDIF3
P(7)	RDIF3
P(7)	BEWAR
C(3)	IMKEY
C(8)	DABRZ
D(8)	INTRENO
C(13)	GRANT_NBR
C(20)	FKBER
C(16)	FIPOS
C(14)	FISTL
C(16)	GEBER
C(10)	PPRCT
C(10)	BUZID
C(1)	AUGGJ
N(4)	UZAWE
C(2)	SEGMENT
C(10)	PSEGMENT
C(10)	PGEBER
C(10)	PGRANT_NBR
C(20)	MEASURE
C(24)	BUDGET_PD
C(10)

				*/
                                //if ($lclAmount > 0)
								{
                                    $sql = "insert into exs_glitem (kode_lokasi, glacc, doc_no, fisc_year, assignment,pstng_date, doc_date, curr, doc_type, bus_area, amount, local_amount, item_text, cost_ctr, profit_ctr, dc ) values (";
                                    $sql .= "'YKES', ";
									$sql .= "'".$rowValue["HKONT"]."', ";
                                    $sql .= "'".$rowValue["BELNR"]."', ";
                                    $sql .= "'".$rowValue["GJAHR"]."', ";
                                    $sql .= "'".$rowValue["XBLNR"]."', ";
                                    $sql .= "'".$rowValue["BUDAT"]."', ";
                                    $sql .= "'".$rowValue["BLDAT"]."', ";
                                    $sql .= "'".$rowValue["WAERS"]."', ";
                                    $sql .= "'".$rowValue["BLART"]."', ";
                                    $sql .= "'".$rowValue["GSBER"]."', ";
                                    $sql .= "'". $amount ."', ";
                                    $sql .= "'". $lclAmount ."', ";
                                    $sql .= "'".str_replace("'","''",$rowValue["SGTXT"])."', ";
                                    $sql .= "'-', ";
                                    $sql .= "'-', ";
									$sql .= "'".$rowValue["SHKZG"]."' ";
                                    $sql .=")";
                                    //echo $sql ."<br>";
                                    $result[] = $sql;
                                    $first = false;
                                }
							}
						}
					}
					saprfc_function_free($fce);
					saprfc_close($rfc);
					return $result ;
				}else echo "error:RFC connection failed <br>". str_replace("\n","<br>",saprfc_error()) ;
			}catch(Exception $e){
				echo "error:$sapFunc" . $e->getMessage(). "<br>". str_replace("\n","<br>",saprfc_error());
			}
		}


		//{
			try{
				global $dbLib;
				$dbLib = new server_DBConnection_dbLib("mssql");
				
				$rs = $dbLib->execute("select sap_user,sap_pwd from hakakses where nik='749006' ");
				
				$login = new server_util_Map();
				if ($row = $rs->FetchNextObject(false)){					
					echo "login sap <br>" ;
					$login->set("user", $row->sap_user);
					$login->set("passwd",$row->sap_pwd);

				}else {
					return false;
				}

				/* matiin MR 23-10-2020
				//if ($row = $rs->FetchNextObject(false)){
					echo "login sap <br>" ;
					$login->set("user", "yks-func1");
					$login->set("passwd","sap9914");
				//}else {
					//return false;
				//}
				*/
				


				$rfcLib = new server_util_rfcLib("rra/sapyks");
				$rfc = $rfcLib->login($login->get("user"),$login->get("passwd"));

				
				$sql = new server_util_arrayList();
				if (isset($_GET["periode"])){
					$periode=$_GET["periode"];
					$tahun=substr($periode,0,4);
					$bulan=substr($periode,4,2);
					$tanggal=$tahun."/".$bulan."/01";
					$tgl=date('t',strtotime($tanggal));
					$postfrom = $periode."01";
					$postto = $periode.$tgl;
					 
				}else {
					$postfrom = date('Ym') . "01";//'20150601';
					$postto = date("Ymt");//'20150631';
					$periode=date('Ym');  
				}				
				
				//echo $tahun."-".$bulan."-".$tanggal."-".$postfrom."-".$postto;
				
				$sql = "delete from exs_glitem where substring(pstng_date,1,6)='$periode'";
				//echo $sql;
				
				$rs = $dbLib->execute($sql);
				
				$rs = $dbLib->execute("select  * from masakun where kode_lokasi='99'  order by kode_akun");
				while ($row = $rs->FetchNextObject(false)){
					//echo $row->kode_akun ."-- starging<br>";
					
					$rfcLib = new server_util_rfcLib("rra/sapyks");
					$rfc = $rfcLib->login($login->get("user"),$login->get("passwd"));
	
						$data = callRFC($login, $rfcLib, $rfc, $row->kode_akun, $postfrom,$postto);
						//echo "total data " . count($data) ."<br>";
						$sql = new server_util_arrayList();
						foreach ($data as $val){
							//echo "SQL -> ".$val ."<br>";
							$sql->add($val);
						}
                        $ret = $dbLib->execArraySQL($sql);
						
				}
				
				echo "Done " ;	
			}catch(Execption $e){
				echo "Exception " . $e->getMessage();
			}

		//}
		
	}catch(Exception $e){
		//echo "<script> setTimeout(\"location = 'getTBCC.php'\",5000); </script>";
		echo $e->getMessage() . "...\n";
	}
?>
