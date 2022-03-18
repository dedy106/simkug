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
		ini_set ('max_execution_time', '0');	 
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
	
		error_reporting (E_ALL & ~E_NOTICE);
		echo "start..<br>";
		include_once("library.php");
		echo "load dblib..<br>";
		uses("server_DBConnection_dbLib");
		echo "load arrayList..<br>";
		uses("server_util_arrayList");
		uses("server_util_Map");
        uses("server_util_rfcLib");
        uses("server_util_rfc");
		$done = false;
		$dbLib = new server_DBConnection_dbLib("mssql");
		$periode = date("Y");				
		$jam = date("H");
		
        function getRFC($login, $tahun, $ubis, $compCode = null){
		    if (!isset($compCode))
                $compCode = "1000";
            $rfc = new server_util_rfcLib("rra/sapyks");
            $sapImp = new server_util_Map(array(
                                    "IM_GJAHR" => "2019" ,
                                    "IM_KOKRS" => "YKES",
                                    "IM_VERSN" => "000",
                                    "IM_RLDNR"	=> "N1"
                                    ));
            $dataAkun = new server_util_arrayList();
            //$dataAkun->add(array("SIGN"=>"I","OPTION"=>"BT","LOW"=>"","HIGH"=>""));

            $dataCC = new server_util_arrayList();
           
			//$dataCC->add(array("SIGN"=>"I","OPTION"=>"BT","LOW"=>"11000","HIGH"=>"95000"));
			//$dataCC->add(array("SIGN"=>"I","OPTION"=>"BT","LOW"=>"0000011000","HIGH"=>"0000099999"));
			//$dataCC->add(array("SIGN"=>"I","OPTION"=>"BT","LOW"=>"KS00A00","HIGH"=>"KS09A00"));
			//$dataCC->add(array("SIGN"=>"I","OPTION"=>"BT","LOW"=>"0000000","HIGH"=>"0000099"));
			
			$dataCC->add(array("SIGN"=>"I","OPTION"=>"BT","LOW"=>"KS00","HIGH"=>"KS07"));
			
            $sapExpTable = new server_util_Map(array("T_OUTPUT"));
            $sapImpTable = new server_util_Map(array("IT_PRCTR" => $dataCC,"IT_RACCT" => $dataAkun));
            return $rfc->callRFC($login,"ZFMFI_PLAN_ACT_MONTHLY_REPORT", $sapImp, $sapExpTable, $sapImpTable, null, true);
        }
		function getTBCC($login, $tahun, $ubis, $dbLib, $compCode){
			uses("server_util_rfc");
			$rfc = new server_util_rfc("rra/sapyks");
			$dataSAP = getRFC($login, $tahun , $ubis, $compCode);
			if (gettype($dataSAP) == "string"){
                //echo (print_r($dataSAP, true) );
				return $dataSAP;
			}

			$output = $dataSAP->get("T_OUTPUT");
			$cc = "";
			$sqlText = array();
			//echo "<table>";
            $sql = new server_util_arrayList();
			$sql->add("delete from exs_mactual where tahun='$tahun'  and jenis = 'S' and kode_lokasi = '$compCode' ");
			$sql->add("delete from exs_mbudget where tahun='$tahun'  and jenis = 'S' and kode_lokasi = '$compCode' ");

			foreach ($output->getArray() as $val){
				$line = $val->get(0);
				//echo print_r($line, true) . "<br>";
				if ($line->get("RACCT") != ""){
					$actual = "";
					$budget = "";
					$actualDes = 0;
					$budgetDes = 0;
					for ($i = 0; $i <= 12; $i++){
						if ($i < 10) $prd = "0$i";
						else $prd = $i;
						$value = floatval($line->get("PLAN$prd"));
						if (strpos($line->get("PLAN$prd"),"-") > 0 ) $value = floatval($line->get("PLAN$prd")) * -1;
						if ($i >= 12)
							$budgetDes += $value;
						else 
							$budget .= ",'$value'";
						$value = floatval($line->get("ACT$prd"));
						if (strpos($line->get("ACT$prd"),"-") > 0 ) $value = floatval($line->get("ACT$prd")) * -1;
						if ($i >= 12)
							$actualDes += $value;
						else 
							$actual .= ",'$value'";
					}
					$actual .= ",'$actualDes'";
					$budget .= ",'$budgetDes'";
					$akun = substr($line->get("RACCT"),2,8);
					$cc = $line->get("RPRCTR");
					$values1 = "'$tahun','".$cc."','$akun' $budget,'S',getdate(),'$compCode'";
					$values2 = "'$tahun','".$cc."','$akun' $actual,'S',getdate(),'$compCode'";
					$sql->add("insert into exs_mbudget(tahun, kode_cc, kode_akun,cf,jan, feb, mar, apr, mei, jun, jul, aug, sep, okt, nop, des, jenis, tgl_upd, kode_lokasi)values($values1)");	
					$sql->add("insert into exs_mactual(tahun, kode_cc, kode_akun,cf,jan, feb, mar, apr, mei, jun, jul, aug, sep, okt, nop, des, jenis, tgl_upd, kode_lokasi)values($values2)");	
				}
			}
			//echo "</table>";
			
			
            $res = $dbLib->execArraySQL($sql);
            echo $res;
		}
        echo "starting...<br>";
		//$rs = $dbLib->execute("select nama, modul from spro where kode_spro = 'DEFUID' ");
		//$row = $rs->FetchNextObject(false);
		//if (floatval($jam) == 1)
		//{
			$login = new server_util_Map();
			$login->set("user", "yks-func1");
			$login->set("passwd","sap9915");
			$ubis = new server_util_Map();
			getTBCC($login,$periode, $ubis, $dbLib,'YKES');
				
			
		//}
		

	}catch(Exception $e){
		echo $e->getMessage() . "...\n";
	}
?>
