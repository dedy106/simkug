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
		$dbLib = new server_DBConnection_dbLib("orarra");
		$periode = date("Y");				
		$jam = date("H");
		
        function getRFC($login, $tahun, $ubis, $compCode = null){
		    if (!isset($compCode))
                $compCode = "1000";
            $rfc = new server_util_rfcLib("rra/sap");
            $sapImp = new server_util_Map(array(
                                    "IM_GJAHR" => $tahun ,
                                    "IM_KOKRS" => $compCode,
                                    "IM_VERSN" => "000",
                                    "IM_RLDNR"	=> "N1"
                                    ));
            $dataAkun = new server_util_arrayList();
            //$dataAkun->add(array("SIGN"=>"I","OPTION"=>"BT","LOW"=>"","HIGH"=>""));

            $dataCC = new server_util_arrayList();
            
            $sapExpTable = new server_util_Map(array("T_OUTPUT"));
            $sapImpTable = new server_util_Map(array("IT_PRCTR" => $dataCC,"IT_RACCT" => $dataAkun));
            return $rfc->callRFC($login,"ZFMFI_PLAN_ACT_MONTHLY_REPORT", $sapImp, $sapExpTable, $sapImpTable, null, true);
        }
		function getTBCC($login, $tahun, $ubis, $dbLib, $compCode){
			uses("server_util_rfc");
			$rfc = new server_util_rfc("rra/sap");
			$dataSAP = getRFC($login, $tahun , $ubis);
			if (gettype($dataSAP) == "string"){
                echo (print_r($dataSAP, true) );
				return $dataSAP;
			}

			$output = $dataSAP->get("T_OUTPUT");
			$cc = "";
			$sqlText = array();
			echo "<table>";
            $sql = new server_util_arrayList();
			$sql->add("delete from cash_mactual where tahun='$tahun'  and jenis = 'S'");

			foreach ($output->getArray() as $val){
				$line = $val->get(0);
				if ($line->get("RACCT") != ""){
					$actual = "";
					for ($i = 0; $i <= 12; $i++){
						if ($i < 10) $prd = "0$i";
						else $prd = $i;
						$value = floatval($line->get("ACT$prd"));
						if (strpos($line->get("ACT$prd"),"-") > 0 ) $value = floatval($line->get("ACT$prd")) * -1;
						$actual .= ",'$value'";
					}
					$akun = substr($line->get("RACCT"),2,8);
					$values2 = "'$tahun','".$line->get("RPRCTR")."','$akun' $actual,'S',sysdate, '$compCode'";
					$sql->add("insert into cash_mactual(tahun, kode_cc, kode_akun, cf,jan, feb, mar, apr, mei, jun, jul, aug, sep, okt, nop, des, jenis, tgl_upd, kode_lokasi)values($values2)");	
				}
			}
			echo "</table>";
			
			
            $res = $dbLib->execArraySQL($sql);
            echo $res;
		}
        echo "starting...<br>";
		$rs = $dbLib->execute("select nama, modul from spro where kode_spro = 'DEFUID' ");
		$row = $rs->FetchNextObject(false);
		//if (floatval($jam) == 1)
		{
			$login = new server_util_Map();
			$login->set("user", $row->nama);
			$login->set("passwd",$row->modul);
			$ubis = new server_util_Map();
			getTBCC($login,$periode, $ubis, $dbLib,'1000');
				
			
		}
		

	}catch(Exception $e){
		echo $e->getMessage() . "...\n";
	}
?>
