<?php
uses("server_util_Pdf");
uses("server_BasicObject");
uses("server_util_Map");
uses("server_DBConnection_dbLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");

class server_upload_assetsap_uploadData extends server_BasicObject
{
    var $filename;
    var $tmpfile;
    
    function __construct() 
    {
        parent::__construct();
    }
    protected 
    function doSerialize() 
    {
        parent::doSerialize();
        $this->serialize("filename", "string", $this->filename);
        $this->serialize("tmpfile", "string", $this->tmpfile);
    }
    
    function init() 
    {
        parent::init();
    }
    
    function deinit() 
    {
        parent::deinit();
    }
    
    function setFile($namafile, $tmp, $allData = false) 
    {
        global $dbLib;
        $this->filename = $namafile;
        $this->tmpfile = $tmp;
        $dbSchema = $dbLib->db;
        $filename = $namafile;
        $tmpFile = $tmp;

        /*for ($i = 1; $i < 3; $i++)
        {
        $pos = strrpos($tmp, $dirSeparator);
        $tmp = substr($tmp, 0, $pos);
        }*/
        $ext = strpos($filename, ".zip");
        
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");
                    
                    return $this->prosesXls($tmpFile, 1, $allData);
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
                
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        file_put_contents("media/amu/$fname",$buf);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        
        if ($ret && $filetype == "text") 
        {			            
            $data = str_replace("\r", "", $data);
            
            $valueList = explode("\n", $data);            
            $header = explode("\t", $valueList[0]);
            $title = "";
            
            foreach ($header as $key => $value) 
            {
                $title.= ($key > 0 ? "," : "") . $value;
            }
            $result = "{\"rows\":[";
            $dataUpload = array();
            $record = 0;			
            for ($i = 1;$i < count($valueList)-1;$i++) 
            {								
				if (trim($valueList[$i]) != ""){					
					$line = explode("\t", $valueList[$i]);										
					$row = "";
					foreach ($line as $c => $value) 
					{
						
						if ($c > 0) $row.= ",";
						$row.= "\"" . strtolower($header[$c]) . "\" : \"" . (trim($value) == "" ? "-" : addslashes( $value) ) . "\"";
					}
					
					if ($i <= 20 || isset($allData) ) 
					{
						if ($i > 1) $result.= ",";	
						$result.= "{" . $row . "}";
					} else break;
					$record++;
				}
            }            
            $result.= "],\"uploadid\" : \"$uploadid\", \"recCount\":" . (count($valueList) - 1) . ", \"start\":0}";                        
            error_log($result);
            return $result;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            $response = "{Code:0,";
            $response.= "value:'" . $data . "'}";
        }
    }
    
    function prosesXls($filename, $page = 1, $allData = null) 
    {
        uses("server_xls_excelReader", false);
        $xls = new Spreadsheet_Excel_Reader($filename);
        $result = "{\"rows\" : [";
        $values = "";
        $title = "";
        $header = array();
        $uploadid = MD5(date("r"));
        $rowPerPage = isset($allData) ?  $xls->rowcount(): 20;        
		$start = ($page - 1) * $rowPerPage;
		$finish = ($start + $rowPerPage + 1> $xls->rowcount() ? $xls->rowcount() : $start + $rowPerPage + 1);
		$first = true;		
		//if ($page != 1) $start++;

        for ($row = $start + 1;$row <= $finish;$row++){            
            if ($first) 
            {               
                for ($col = 1;$col <= $xls->colcount();$col++) 
                {
                    $header[] = $xls->val(1, $col);
                    $title.= ($col > 1 ? "," : "") . $xls->val(1, $col);
                }      
                if( $row == 1 ) continue;                         
            }
            if (!$first && $row != 1) $result .= ",";
            $first = false;
            $line = "";            
            for ($col = 1;$col <= $xls->colcount();$col++) 
            {
                
                if ($col > 1) $line.= ",";
                $line.= "\"" . strtolower($header[$col - 1]) . "\" : \"" . (trim($xls->val($row, $col)) == "" ? "-" : addslashes($xls->val($row, $col))) . "\"";
            }            
            $result.= "{" . $line . "}";            
            $first = false;            
        }
        $result.= "],\"uploadid\" : \"$uploadid\", \"recCount\":" . ($xls->rowcount()) . ", \"start\": (". $start .") }";        
        return $result;
    }
    
    function getDataField($page, $field) 
    {
    }
    
    function getData($page) 
    {
        global $dbLib;
        global $manager;
        $dbSchema = $dbLib->db;
        $filename = $this->filename;
        $tmpFile = $this->tmpfile;
                
        $ext = strpos($filename, ".zip");
        
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");
                    return $this->prosesXls($tmpFile, $page);
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        $xml = new XML_Doc();
                        $xml->parse($buf);
                        $data = xml_data($xml->rootNode);
                        $data = substr($data, 1);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        
        if ($ret && $filetype == "text") 
        {
            $data = str_replace("\r", "", $data);
            $valueList = explode("\n", $data);
            $header = explode("\t", $valueList[0]);
            $title = "";
            
            foreach ($header as $key => $value) 
            {
                $title.= ($key > 0 ? "," : "") . $value;
            }
            $result = "{\"rows\":[";
            $dataUpload = array();
            $record = 0;
            $rowPerPage = 20;
            $start = ($page - 1) * $rowPerPage;
            $finish = ($start + $rowPerPage + 1 > count($valueList) - 1 ? count($valueList) - 1 : $start + $rowPerPage + 1);
            
            for ($i = $start + 1;$i < $finish;$i++) 
            {
                $line = explode("\t", $valueList[$i]);
                
                if ($i > $start + 1) $result.= ",";
                $row = "";
                
                foreach ($line as $c => $value) 
                {
                    
                    if ($c > 0) $row.= ",";
                    $row.= "\"" . strtolower($header[$c]) . "\" : \"" . (trim($value) == "" ? "-" : addslashes($value)) . "\"";
                }
                $result.= "{" . $row . "}";
                $record++;
            }
            $result.= "],\"uploadid\" : \"$uploadid\", \"recCount\":" . (count($valueList) - 1) . ",\"title\":\"$title\", \"start\":\"$start\"}";
            
            return $result;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            $response = "{Code:0,";
            $response.= "value:'" . $data . "'}";
        }
    }
    
    function upload($nobukti, $periode, $tgl, $ket, $nmfile, $lokasi, $user) 
    {
        global $dbLib;
        $dbSchema = $dbLib->db;
        $filename = $this->filename;
        $tmpFile = $this->tmpfile;
        
        for ($i = 1;$i < 3;$i++) 
        {
            $pos = strrpos($tmp, $dirSeparator);
            $tmp = substr($tmp, 0, $pos);
        }
        $ext = strpos($filename, ".zip");
        
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");
                    $this->prosesXls($tmpFile);
                    $ret = true;
                    $filetype = "xls";
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        $xml = new XML_Doc();
                        $xml->parse($buf);
                        $data = xml_data($xml->rootNode);
                        $data = substr($data, 1);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        
        if ($ret && $filetype == "text") 
        {
            $data = str_replace("\r", "", $data);
            $valueList = explode("\n", $data);
            $header = explode("\t", $valueList[0]);
            $dataUpload = array();
            $record = 0;
            uses("server_util_arrayList");
            $sql = new server_util_arrayList();
            $sql->add("insert into amu_load_m (no_load, tanggal, keterangan, namafile, kode_lokasi, tgl_input, nik_user, periode)" . " values('" . $nobukti . "','" . $tgl . "', '" . $ket . "', '" . $nmfile . "','" . $lokasi . "', now(),'" . $user . "','" . $periode . "' )");
            
            for ($i = 1;$i < count($valueList) - 1;$i++) 
            {
                $line = explode("\t", $valueList[$i]);
                $lineA = array();
                
                foreach ($line as $c => $value) 
                {
                    $lineA[strtolower($header[$c]) ] = $value;
                }
                $data = "'$lokasi', '" . $lineA["asset"] . $lineA["sno."] . "'";
                
                foreach ($lineA as $c => $value) 
                {
                    
                    if ($c != "cocd" && trim($c) != "asset class" && trim($c) != "crcy") 
                    {
                        
                        if ($c == "nilai" || $c == "nilai_ap" || $c == "nilai_buku" || trim($c) == "acquis.val." || trim($c) == "accum.dep." || trim($c) == "book val.") 
                        {
                            $data.= "," . floatval($value);
                        }
                        else 
                        if ($c == "tgl_perolehan" || trim($c) == "cap.date") $data.= ",to_date('" . $value . "','mm/dd/yyyy')";
                        else $data.= ",'" . ($value == "" ? "-" : $value) . "'";
                    }
                }
                $sql->add("insert into amu_asset(no_upload,kode_lokasi,no_gabung,no_fa, no_sn,  nama, nama2,kode_klpakun, kode_klpfa, kode_lokfa, ref1, ref2,  tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik )values('$nobukti'," . $data . ",1)");

                //$sql->add("insert into amu_load_d(no_load,kode_lokasi,no_gabung,no_fa, no_sn,  nama, nama2,kode_klpakun, kode_klpfa, kode_lokfa, ref1, ref2,  tgl_perolehan, nilai, nilai_ap, nilai_buku,jml_fisik )values('$nobukti',". $data .",1)");
                $record++;
            }

            //$result .= "],\"uploadid\" : \"$uploadid\", \"recCount\":".(count($valueList)-1) .",\"title\":\"$title\"}";
            $ret = $dbLib->execArraySQL($sql);
            
            return $ret;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            $response = "{Code:0,";
            $response.= "value:'" . $data . "'}";
        }
    }

    //nobukti, periode, tgl, jns, lokasi, lokfa,userlog, filename
    
    function uploadKKIL($nobukti, $periode, $tgl, $jenis, $lokasi, $lokfa, $user, $nikbuat, $fileUpld, $area, $deleteData = null) 
    {
		try{
			global $dbLib;
			$dbSchema = $dbLib->db;
			$filename = $this->filename;
			$tmpFile = $this->tmpfile;       
			$fileUpld = explode(";", $fileUpld);
			$ext = strpos($filename, ".zip");
			
			if (!$ext) 
			{
				$ext = strpos($filename, ".txt") || strpos($filename, ".csv");
				
				if (!$ext) 
				{
					$ext = strpos($filename, ".xml");
					
					if (!$ext) 
					{
						$ext = strpos($filename, ".xls");
						
						if (!$ext) die("unreadable file");                    
												
						$ret = true;
						$filetype = "xls";
					}
					else
					{
						uses("server_xml_Doc", false);
						$xml = new XML_Doc();
						$xml->parseFile($tmpFile);
						$data = xml_data($xml->rootNode);
						$ret = true;
						$filetype = "xml";
					}
				}
				else
				{
					$file = $tmpFile;
					$data = file_get_contents($file);
					$ret = true;
					$filetype = "text";
				}
			}
			else
			{
				$filetype = "zip";
				$zip = zip_open($tmpFile);
				
				if ($zip) 
				{
					
					while ($zip_entry = zip_read($zip)) 
					{
						$fname = zip_entry_name($zip_entry);
						
						if (zip_entry_open($zip, $zip_entry, "r")) 
						{
							$buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
							zip_entry_close($zip_entry);
							$xml = new XML_Doc();
							$xml->parse($buf);
							$data = xml_data($xml->rootNode);
							$data = substr($data, 1);
						}
					}
					zip_close($zip);
					$ret = true;
				}
			}
			$uploadid = MD5(date("r"));
			$format = "INV." . $lokfa . "." . substr($periode, 0, 4) . ".";
			$numeric = substr($nobukti, 0, strlen($format));
			$nu = floatval(substr($nobukti, strlen($format)));
			$nfa = "";
			$diva = substr($lokfa, 0,3) == "TDV" || substr($lokfa, 0,3) == "TCS";
			/*
			$dtCheck = $dbLib->execute("select distinct d.no_gabung, d.nama from amu_klp a 
						inner join amu_lokasi c on c.kode_lokfa = '$lokfa'
						inner join amu_asset d on d.kode_klpfa = a.kode_klpfa and d.periode = '$periode' and (d.kode_lokfa = '$lokfa' or d.ref1 = '" . ( $diva ? $lokfa :"" ). "' ) 
						inner join amu_bagiklp_d b on b.kode_klpfa = a.kode_klpfa and b.periode = '$periode' and b.jenis_proc = 'FISIK' 
						left outer join xgroupfa e on e.asset_class = d.kode_klpfa 
					 where a.kode_lokasi = '$lokasi'  and ".($jenis == "TB" ? "" :" not ") . " a.kode_klpfa  like '101%' ");
			*/
			uses("server_util_Map");
			$assetlokasi = new server_util_Map();
			/*if ($dtCheck){			
				while ($row = $dtCheck->FetchNextObject(true) ){
					$assetlokasi->set($row->NO_GABUNG, $row);
				}			
			}
			*/
			if ($ret && $filetype == "text") 
			{
				$data = str_replace("\r", "", $data);
				$valueList = explode("\n", $data);
				$header = explode("\t", trim($valueList[0]));
				$dataUpload = array();
				$record = 0;            
				uses("server_util_arrayList");
				$sql = new server_util_arrayList();           
				$listnka = "' '";
				//if ($deleteData) {
				//	$sql->add("delete amu_kkl_d where periode = '$periode' and no_inv = '$nobukti' ");
				//	$sql->add("delete amu_kkl_m where periode = '$periode' and no_inv = '$nobukti' ");
				//}
				$first = true;
				$nb  = $nobukti;
				$tglawal = $tgl;
				$adaTgl = false;				
				$nkatmp = "";
				$sntmp = "";
				for ($i = 1;$i < count($valueList) - 1;$i++) 
				{
					if (trim($valueList[$i]) == "") continue;
					//$valueList[$i] = trim($valueList[$i]);
					$line = explode("\t", $valueList[$i]);
					$lineA = array();
					
					foreach ($line as $c => $value) 
					{
						$lineA[] = $value;
					}
					$posTgl = strpos(strtolower($header[count($header)-1]), "tanggal" );
					if (gettype($posTgl) == "integer") {
						$adaTgl = true;
						$tgl = "to_date('".$lineA[count($lineA) - 1]."','dd/mm/yyyy')";
					}
					$nka = $lineA[0];
					$sn = $lineA[1];					
					if (trim($nka) == "" ){
						 //continue;					
						 $nka = $nkatmp;
						 $sn = $sntmp;
					}
					$nkatmp = $nka;
					$sntmp = $sn;
					if ($jenis == "TB" && (floatval($lineA[6]) < 1 || floatval($lineA[6]) > 5))  
						return " error: Status Keberadaan tidak dikenal ". $lineA[6]." untuk Kartu $nka SN $sn. Proses dihentikan ";
					else if ($jenis == "NTB" && (floatval($lineA[6]) < 1 || floatval($lineA[6]) > 8))  
						return " error: Status Keberadaan tidak dikenal ". $lineA[6]." untuk Kartu $nka SN $sn. Proses dihentikan ";
					
					if ( strlen( trim($lineA[5]) ) != 18 && substr($nka,0,6) != "101101" ){ 
						if (( floatval($lineA[6]) != 2 && floatval($lineA[6]) != 4 && floatval($lineA[6]) != 5 &&substr($nka,0,3) == "101"))
							return " error: No Label tidak 18 digit ". $nka ." ".$lineA[5]." (".strlen( trim($lineA[5]) ) ."). Proses dihentikan.";
						else if ( floatval($lineA[6]) < 4 && substr($nka,0,3) != "101")
							return " error: No Label tidak 18 digit ". $nka ." ".$lineA[5]." (".strlen( trim($lineA[5]) ) ."). Proses dihentikan.";											
					}				
					if (substr($nka,0,6) != "101101"){
						$statuskartu = trim($lineA[5]);
						if (( floatval($lineA[6]) != 2 && floatval($lineA[6]) != 4 && floatval($lineA[6]) != 5 &&substr($nka,0,3) == "101" && substr($statuskartu,0,4) != "TLKM"))
							return " error: No Label untuk kartu  ". $nka ." tidak ada TLKM (". trim($lineA[5]) ."). Proses dihentikan.";
						else if ( floatval($lineA[6]) < 4 && substr($nka,0,3) != "101" && substr($statuskartu,0,4) != "TLKM" )
							return " error: No Label untuk kartu  ". $nka ." tidak ada TLKM (". trim($lineA[5]) ."). Proses dihentikan.";
					}
					//if ($assetlokasi->get($nka.$sn) == null) return " error: Asset ".$nka.$sn ." tidak ada dilokasi $lokfa ";
					if ($nfa != $nka . $sn) 
					{
						if ($nfa != "") $sql->add("update amu_kkl_d set status_nka = '$status' where periode = '$periode' and no_gabung = '$nfa' ");
						if (!$first){
							$nu++;
							$numeric = strval($nu);													
							for ($l = strlen($numeric);$l < 6;$l++) $numeric = "0" . $numeric;
							$nobukti = $format . $numeric;
						}
						$sql->add("insert into amu_kkl_m (no_inv,  kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis, progress, nik_buat, lampiran, kode_lokfa2)" . " values('$nobukti','$lokasi', '$lokfa', '$tgl', '$user',now(),'$jenis','0','$nikbuat','" . $fileUpld[0] . "', '$area')");
						$nfa = $nka . $sn;						
						$sql->add("insert into amu_kkl_load(no_kkl,no_gabung,no_label)values('$nb','$nfa','-')");
						$status = 99;
					}
					$data = "'$lokasi','" . $nka . $sn . "','$nka','$sn'";
					$listnka .= ", '". $nka . $sn."'";
					
					if ($lineA[6] != "-" &&  $status > floatval($lineA[6])) $status = floatval($lineA[6]);					
					foreach ($lineA as $c => $value){                    					
						$posno = strpos(strtolower( $header[$c] ),"kkil");
						$postgl = strpos(strtolower( $header[$c] ),"tanggal");
						if ( $c > 1 && ( gettype($posno) == "boolean" && gettype($postgl) == "boolean" && gettype(strpos(strtolower( $header[$c] ),"kkil")) ==  "boolean" )){ 						
							$data.= ",'$value'";
						}
					}	
					$first = false;				
					if ($jenis == "TB")
						$sql->add("insert into amu_kkl_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, no_sertifikat, luas,ket_lokasi, keterangan,periode)values('$nobukti'," . $data . ",'$periode')");
					else $sql->add("insert into amu_kkl_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, ket_lokasi, keterangan,periode)values('$nobukti'," . $data . ",'$periode')");
					
				}
				$sql->add("update amu_kkl_d set status_nka = '$status' where periode = '$periode' and no_gabung = '$nfa' ");				
				if ($deleteData){					
					$arrayNKA = explode(",",$listnka);				
					$lkartu = "";
					$nkartu = 0;
					if (count($arrayNKA) < 1000){
						$dtCheck = $dbLib->execute("select distinct b.no_gabung from amu_kkl_m a inner join  amu_kkl_d b on b.no_inv = a.no_inv 
							where b.no_gabung in (". $listnka.") and  not a.progress in ('0','6') ");
						if (gettype($dtCheck) != "string"){
							$nka = "";
							while ($row = $dtCheck->FetchNextObject(true) ){
								$nka .= ", " . $row->NO_GABUNG;
							}
							
							if ($nka != "") {
								$nka = substr($nka,1);
								return " error: NKA ini ($nka) sudah di Approve";
							}
						}else return $dtCheck;
					}else{
						foreach ($arrayNKA as $x => $v){
							$nkartu++;					
							if ($nkartu < 999){
								 if ($lkartu != "") $lkartu .= ",";
								 $lkartu .= $v;
							}else {
								$dtCheck = $dbLib->execute("select distinct b.no_gabung from amu_kkl_m a inner join  amu_kkl_d b on b.no_inv = a.no_inv 
									where b.no_gabung in (". $lkartu.") and  not a.progress in ('0','6') ");
								if (gettype($dtCheck) != "string"){
									$nka = "";
									while ($row = $dtCheck->FetchNextObject(true) ){
										$nka .= ", " . $row->NO_GABUNG;
									}
									
									if ($nka != "") {
										$nka = substr($nka,1);
										return " error: NKA ini ($nka) sudah di Approve";
									}
								}else return $dtCheck;
								$lkartu = "";
								$nkartu = 0;
							}					
						}
						if ($lkartu != ""){
							$dtCheck = $dbLib->execute("select distinct b.no_gabung from amu_kkl_m a inner join  amu_kkl_d b on b.no_inv = a.no_inv 
								where b.no_gabung in (". $lkartu.") and  not a.progress in ('0','6') ");
							if (gettype($dtCheck) != "string"){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di Approve";
								}
							}else return $dtCheck;
						}
					}						
					$sqltmp = new server_util_arrayList();
					//$sqltmp->add("delete from amu_kkl_m where progress = '0' and no_inv in (select distinct no_inv from amu_kkl_d where no_gabung in (". $listnka.")) ");
					//$sqltmp->add("delete from amu_kkl_d where no_gabung in (". $listnka.") ");
					
					
					$arrayNKA = explode(",",$listnka);				
					if (count($arrayNKA) < 1000){
						$sqltmp->add("delete from amu_kkl_d where no_gabung in (". $listnka.") ");
					}else{
						$lkartu = "";
						$nkartu = 0;
						foreach ($arrayNKA as $x => $v){
							$nkartu++;					
							if ($nkartu < 999){
								 if ($lkartu != "") $lkartu .= ",";
								 $lkartu .= $v;
							}else {
								$sqltmp->add("delete from amu_kkl_d where no_gabung in (". $lkartu.") ");
								$lkartu = "";
								$nkartu = 0;
							}					
						}
						if ($lkartu != "") $sqltmp->add("delete from amu_kkl_d where no_gabung in (". $lkartu.") ");
					}
					foreach ($sql->getArray() as $key => $value) $sqltmp->add($value);
					$sql = $sqltmp;
					
				}else {
					$arrayNKA = explode(",",$listnka);				
					$lkartu = "";
					$nkartu = 0;
					if (count($arrayNKA) < 1000){
						$dtCheck = $dbLib->execute("select distinct no_gabung from amu_kkl_d where no_gabung in (". $listnka.")");					
						if (gettype($dtCheck) != "string"){
							$nka = "";
							while ($row = $dtCheck->FetchNextObject(true) ){
								$nka .= ", " . $row->NO_GABUNG;
							}
							
							if ($nka != "") {
								$nka = substr($nka,1);
								return " error: NKA ini ($nka) sudah ada KKIL-nya";
							}
						}else return $dtCheck;
					}else{
						foreach ($arrayNKA as $x => $v){
							$nkartu++;					
							if ($nkartu < 999){
								 if ($lkartu != "") $lkartu .= ",";
								 $lkartu .= $v;
							}else {
								$dtCheck = $dbLib->execute("select distinct no_gabung from amu_kkl_d where no_gabung in (". $lkartu.")");					
								if (gettype($dtCheck) != "string"){
									$nka = "";
									while ($row = $dtCheck->FetchNextObject(true) ){
										$nka .= ", " . $row->NO_GABUNG;
									}
									
									if ($nka != "") {
										$nka = substr($nka,1);
										return " error: NKA ini ($nka) sudah ada KKIL-nya";
									}
								}else return $dtCheck;
								$lkartu = "";
								$nkartu = 0;
							}					
						}
						if ($lkartu != ""){
							$dtCheck = $dbLib->execute("select distinct no_gabung from amu_kkl_d where no_gabung in (". $lkartu.")");					
								if (gettype($dtCheck) != "string"){
									$nka = "";
									while ($row = $dtCheck->FetchNextObject(true) ){
										$nka .= ", " . $row->NO_GABUNG;
									}
									
									if ($nka != "") {
										$nka = substr($nka,1);
										return " error: NKA ini ($nka) sudah ada KKIL-nya";
									}
								}else return $dtCheck;
						}					
					}
				}	
				//$result .= "],\"uploadid\" : \"$uploadid\", \"recCount\":".(count($valueList)-1) .",\"title\":\"$title\"}";
				$ret = $dbLib->execArraySQL($sql);
				
				if (!strpos($ret, "error")) 
				{                
					global $manager;
					$ext = strpos($filename, ".zip");					
					copy($manager->getWorkingDir() . "/tmp/" . $fileUpld[1], $manager->getWorkingDir() . "/media/amu/" . $fileUpld[0]);					
				}            
				return $ret;
			}
			else 
			if ($ret && $filetype == "xls") 
			{
				uses("server_xls_excelReader", false);
				$listnka = "' '";
				$xls = new Spreadsheet_Excel_Reader($tmpFile);
				$values = "";
				$title = "";
				$header = array();
				$uploadid = MD5(date("r"));        
				$rowPerPage = 20;					
				$nfa = "";
				uses("server_util_arrayList");
				$sql = new server_util_arrayList();			
				$first = true;
							
				for ($row = 1;$row <= $xls->rowcount();$row++){            									
					if ($row == 1) {
						 $posTgl = strpos(strtolower($xls->val(1, $xls->rowcount())), "tanggal" );
						 continue;                         				
					}								
							  
					$nka = $xls->val($row, 1);
					$sn = $xls->val($row, 2);                
					
					
					if (gettype($posTgl) == "integer") {
						$adaTgl = true;
						$cells = $xls->val($row, $xls->rowcount());
						if (gettype(strpos($cells,"\n")) == "integer"){
							$cells = explode("\n",$cells);
							$cells = $cells[0];
						}else if (gettype(strpos($cells,",")) == "integer"){
							$cells = explode(",",$cells);
							$cells = $cells[0];
						}
						$tgl = "to_date('".$cells."','dd/mm/yyyy')";
					}
					
					if (trim($nka) == "") continue;					
					//if ($assetlokasi->get($nka.$sn) == null) return " error: Asset ".$nka.$sn ." tidak ada dilokasi $lokfa ";									
					
					$cells = $xls->val($row, 6);
					$multi = false;
					if (gettype(strpos($cells,"\n")) == "integer"){
						$cells = explode("\n",$cells);
						$alamat = explode("\n",$xls->val($row, 4));
						$stsmulti = explode("\n",$xls->val($row, 7));
						if ($jenis == "TB") {
							$xlsCol = 10;
							$sertifikat = explode("\n",$xls->val($row, 8));
							$luas = explode("\n",$xls->val($row, 8));
						}else if ($jenis == "NTB"){
							$xlsCol = 8;
							$sertifikat = array();
							$luas = array();							
						}
						$updDesk = explode("\n",$xls->val($row, $xlsCol));
						$ket = explode("\n",$xls->val($row, $xlsCol+1));
						$multi = true;						
					}else if (gettype(strpos($cells,",")) == "integer"){
						$cells = explode(",",$cells);
						$alamat = explode(",",$xls->val($row, 4));
						$stsmulti = explode(",",$xls->val($row, 7));
						if ($jenis == "TB") {
							$xlsCol = 10;
							$sertifikat = explode(",",$xls->val($row, 8));
							$luas = explode(",",$xls->val($row, 8));
						}else if ($jenis == "NTB"){
							$xlsCol = 8;
							$sertifikat = array();
							$luas = array();							
						}
						$updDesk = explode(",",$xls->val($row, $xlsCol));
						$ket = explode(",",$xls->val($row, $xlsCol+1));
						$multi = true;
					}
					if ($nfa != $nka . $sn){							
						if ($multi){							
							foreach ($cells as $y => $v){
								if ( strlen( trim($v) ) != 18 && substr($nka,0,6) != "101101" ){ 
									if (!$this->labelIsValid($nka,$v, $xls->val($row, 7) ))
										return " error: No Label tidak 18 digit ". $nka ." ".$v." (".strlen( trim($v) ) ."). Proses dihentikan.";											

								}
								if (substr($nka,0,6) != "101101"){
									if (!$this->checkTLKM($nka,$v, $xls->val($row, 7) ))
										return " error: No Label untuk kartu  ". $nka ." tidak ada TLKM (". trim($v) ."). Proses dihentikan.";						
								}
								
								if (!$this->statusIsValid($jenis,$xls->val($row, 7) )){
									return " error: Status Keberadaan tidak dikenal ". $xls->val($row, 7)." untuk Kartu $nka SN $sn. Proses dihentikan ";
								}	
							}
						}else{
							if ( strlen( trim($xls->val($row, 6)) ) != 18 && substr($nka,0,6) != "101101" ){ 
								if (!$this->labelIsValid($nka,$xls->val($row, 6), $xls->val($row, 7) ))
									return " error: No Label tidak 18 digit ". $nka ." ".$xls->val($row, 6)." (".strlen( trim($xls->val($row, 6)) ) ."). Proses dihentikan.";											

							}
							if (substr($nka,0,6) != "101101"){
								if (!$this->checkTLKM($nka,$xls->val($row, 6), $xls->val($row, 7) ))
									return " error: No Label untuk kartu  ". $nka ." tidak ada TLKM (". trim($xls->val($row, 6)) ."). Proses dihentikan.";						
							}
							
							if (!$this->statusIsValid($jenis,$xls->val($row, 7) )){
								return " error: Status Keberadaan tidak dikenal ". $xls->val($row, 7)." untuk Kartu $nka SN $sn. Proses dihentikan ";
							}									
						}
					
						if ($nfa != "") $sql->add("update amu_kkl_d set status_nka = '$status' where periode = '$periode' and no_gabung = '$nfa' ");
						$sql->add("insert into amu_kkl_m (no_inv,  kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis, progress, nik_buat, lampiran, kode_lokfa2)" . " values('$nobukti','$lokasi', '$lokfa', '$tgl', '$user',now(),'$jenis','0','$nikbuat','" . $fileUpld[0] . "', '$area')");
						$nfa = $nka . $sn;
						if (!$first){
							$nu++;
							$numeric = strval($nu);
							for ($i = strlen($numeric);$i < 6;$i++) $numeric = "0" . $numeric;
							$nobukti = $format . $numeric;
						}
						$status = 99;
					}
					$data = "'$lokasi','" . $nka . $sn . "'";
					$listnka .= ", '". $nka . $sn."'";                     
					if ($multi){
						$lastRow = array();//cells = no label
						foreach ($cells as $y => $v){
							if (isset($alamat[$y]) ){
								$lastRow[0] = $alamat[$y];
							}						
							if (isset($stsmulti[$y]) ){
								$lastRow[3] = $stsmulti[$y];
							}											
							$lastRow[1] = '1';
							$lastRow[2] = $v;							
							if ($jenis == "TB"){
								if (isset($sertifikat[$y]) )
									$lastRow[6] = $sertifikat[$y];									
								if (isset($luas[$y]) )
									$lastRow[7] = $luas[$y];
							}
							
							if (isset($updDesk[$y]) ){
								$lastRow[4] = $updDesk[$y];
							}		
							
							if (isset($ket[$y]) ){
								$lastRow[5] = $ket[$y];
							}		
							if ($lastRow[3] != "-" &&  $status > floatval($lastRow[3])) $status = floatval($lastRow[3]);
							$data = "'$lokasi','" . $nka . $sn . "'";
							for ($col = 0; $col <= 5; $col++) {
								if ($jenis == "TB" && $col == 4){
									$data .= ",'".$lastRow[6]. "'";
									$data .= ",'".$lastRow[7]. "'";
								}
								$data .= ",'".$lastRow[$col]. "'";
							}			
							$first = false;					
							if ($jenis == "TB")
								$sql->add("insert into amu_kkl_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, no_sertifikat, luas,ket_lokasi, keterangan,periode)
									values('$nobukti'," . $data . ",'$periode')");
							else $sql->add("insert into amu_kkl_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, ket_lokasi, keterangan,periode)values('$nobukti'," . $data . ",'$periode')");                                                			  						
						}
					}else{
						if ($xls->val($row, 7) != "-" &&  $status > floatval($xls->val($row, 7))) $status = floatval($xls->val($row, 7));
						for ($col = 1;$col <= $xls->colcount();$col++) {
							if ($col > 3 && $col) $data .= ",'".$xls->val($row, $col). "'";
						}			
						$first = false;					
						if ($jenis == "TB")
							$sql->add("insert into amu_kkl_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, no_sertifikat, luas,ket_lokasi, keterangan,periode)
								values('$nobukti'," . $data . ",'$periode')");
						else $sql->add("insert into amu_kkl_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, ket_lokasi, keterangan,periode)values('$nobukti'," . $data . ",'$periode')");                                                			  						
					}
				}
				$sql->add("update amu_kkl_d set status_nka = '$status' where periode = '$periode' and no_gabung = '$nfa' ");
				
				if ($deleteData){
					
					$arrayNKA = explode(",",$listnka);				
					$lkartu = "";
					$nkartu = 0;
					foreach ($arrayNKA as $x => $v){
						$nkartu++;					
						if ($nkartu < 999){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$dtCheck = $dbLib->execute("select distinct b.no_gabung from amu_kkl_m a inner join  amu_kkl_d b on b.no_inv = a.no_inv 
								where b.no_gabung in (". $lkartu.") and  not a.progress in ('0','6') ");
							if (gettype($dtCheck) != "string"){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di Approve";
								}
							}else return $dtCheck;
							$lkartu = "";
							$nkartu = 0;
						}					
					}
					if ($lkartu != ""){
						$dtCheck = $dbLib->execute("select distinct b.no_gabung from amu_kkl_m a inner join  amu_kkl_d b on b.no_inv = a.no_inv 
								where b.no_gabung in (". $lkartu.") and  not a.progress in ('0','6') ");
							if (gettype($dtCheck) != "string"){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di Approve";
								}
							}else return $dtCheck;
					}
											
					$sqltmp = new server_util_arrayList();
					//$sqltmp->add("delete from amu_kkl_m where progress = '0' and no_inv in (select distinct no_inv from amu_kkl_d where no_gabung in (". $listnka.")) ");
					//$sqltmp->add("delete from amu_kkl_d where no_gabung in (". $listnka.") ");
					$arrayNKA = explode(",",$listnka);				
					$lkartu = "";
					$nkartu = 0;
					foreach ($arrayNKA as $x => $v){
						$nkartu++;					
						if ($nkartu < 999){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$sqltmp->add("delete from amu_kkl_d where no_gabung in (". $lkartu.") ");
							$lkartu = "";
							$nkartu = 0;
						}					
					}
					if ($lkartu != "") $sqltmp->add("delete from amu_kkl_d where no_gabung in (". $lkartu.") ");
					foreach ($sql->getArray() as $key => $value) $sqltmp->add($value);
					$sql = $sqltmp;
					
				}else {
					$arrayNKA = explode(",",$listnka);				
					$lkartu = "";
					$nkartu = 0;
					foreach ($arrayNKA as $x => $v){
						$nkartu++;					
						if ($nkartu < 999){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$dtCheck = $dbLib->execute("select distinct no_gabung from amu_kkl_d where no_gabung in (". $lkartu.")");					
							if (gettype($dtCheck) != "string"){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah ada KKIL-nya";
								}
							}else return $dtCheck;
							$lkartu = "";
							$nkartu = 0;
						}					
					}					
					if ($lkartu != ""){
						$dtCheck = $dbLib->execute("select distinct no_gabung from amu_kkl_d where no_gabung in (". $lkartu.")");					
							if (gettype($dtCheck) != "string"){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah ada KKIL-nya";
								}
							}else return $dtCheck;
					}
				}
				$ret = $dbLib->execArraySQL($sql);
				
				if (!strpos($ret, "error")) 
				{             				               
					global $manager;
					$ext = strpos($fileUpld[0], ".zip");				
					copy($manager->getWorkingDir() . "/tmp/" . $fileUpld[1], $manager->getWorkingDir() . "/media/amu/" . $fileUpld[0]);					
				}
				return $ret;
			}
		}catch(Exception $e){
			error_log("error: " . $e->getMessage());
			return " error: " . $e->getMessage();
		}
    }
    function statusIsValid($jenis, $status){
		if ($jenis == "TB" && (floatval($status) < 1 || floatval($status) > 5))  
			return false;
		else if ($jenis == "NTB" && (floatval($status) < 1 || floatval($status) > 8))  
			return false;
		return true;
	}
    function labelIsValid($nka, $no_label, $status){
		if (( floatval($status) != 2 && floatval($status) != 4 && floatval($status) != 5 &&substr($nka,0,3) == "101"))
			return false;
		else if ( floatval($status) < 4 && substr($nka,0,3) != "101")
			return false;
		return true;
	}
	function checkTLKM($nka, $no_label, $status){
		if (( floatval($status) != 2 && floatval($status) != 4 && floatval($status) != 5 &&substr($nka,0,3) == "101" && substr($no_label,0,4) != "TLKM"))
			return false;
		else if ( floatval($status) < 4 && substr($nka,0,3) != "101" && substr($no_label,0,4) != "TLKM" )
			return false;
		return true;
	}
    function uploadKKP($nobukti, $periode, $tgl, $jenis, $lokasi, $lokfa, $user, $nikbuat, $fileUpld) 
    {
        global $dbLib;
        $dbSchema = $dbLib->db;
        $filename = $this->filename;
        $tmpFile = $this->tmpfile;       
        $fileUpld = explode(";", $fileUpld);
        $ext = strpos($filename, ".zip");
		
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");                    
                    
                    $ret = true;
                    $filetype = "xls";
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        $xml = new XML_Doc();
                        $xml->parse($buf);
                        $data = xml_data($xml->rootNode);
                        $data = substr($data, 1);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        $format = "INV." . $lokfa . "." . substr($periode, 0, 4) . ".";
		$numeric = substr($nobukti, 0, strlen($format));
		$nu = floatval(substr($nobukti, strlen($format)));
        if ($ret && $filetype == "text") 
        {
            $data = str_replace("\r", "", $data);
            $valueList = explode("\n", $data);
            $header = explode("\t", $valueList[0]);
            $dataUpload = array();
            $record = 0;            
            uses("server_util_arrayList");
            $sql = new server_util_arrayList();           
            $listnka = "' '";
            $first = true;
            $sql->add("insert into amu_rekon_m (no_inv,  kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis, progress, nik_buat, lampiran)" . " values('$nobukti','$lokasi', '$lokfa', '$tgl', '$user',now(),'$jenis','0','$nikbuat','" . $fileUpld[0] . "')");
            for ($i = 1;$i < count($valueList) - 1;$i++) 
            {
                $line = explode("\t", $valueList[$i]);
                $lineA = array();
                
                foreach ($line as $c => $value) 
                {
                    $lineA[] = $value;
                }
                $nka = $lineA[0];
                $sn = $lineA[1];
                
                if ($nfa != $nka . $sn) 
                {                    
                    $nfa = $nka . $sn;
                   /* if (!$firs){
						$nu++;
						$numeric = strval($nu);
						
						for ($i = strlen($numeric);$i < 6;$i++) $numeric = "0" . $numeric;
						$nobukti = $format . $numeric;
					}*/
                    $status = 99;
                }
                $data = "'$lokasi','" . $nka . $sn . "'";
                $listnka .= ", '". $nka . $sn."'";
                if ($lineA[28] != "-" &&  $status > floatval($lineA[28]) && $status != 3) $status = floatval($lineA[28]);
                foreach ($lineA as $c => $value) 
                {
                    
                    if ($c > 1) 
                    {
                        $data.= ",'$value'";
                    }
                }
                $first = false;
                if ($jenis == "TB")
					$sql->add("insert into amu_rekon_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, no_sertifikat, luas,ket_lokasi, keterangan,periode)values('$nobukti'," . $data . ",'$periode')");
				else $sql->add("insert into amu_rekon_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama,ket_lokasi, keterangan,periode)values('$nobukti'," . $data . ",'$periode')");
            }
			$dtCheck = $dbLib->execute("select distinct no_gabung from amu_rekon_d where no_gabung in (". $listnka.")");
			
            //$result .= "],\"uploadid\" : \"$uploadid\", \"recCount\":".(count($valueList)-1) .",\"title\":\"$title\"}";
            $ret = $dbLib->execArraySQL($sql);
            
            if (!strpos($ret, "error")) 
            {                
                global $manager;
                $ext = strpos($filename, ".zip");
                //if (!$ext)
				copy($manager->getWorkingDir() . "/tmp/" . $fileUpld[1], $manager->getWorkingDir() . "/media/amu/" . $fileUpld[0]);
                /*else {
					$zip = zip_open($tmpFile);            
					if ($zip) 
					{					
						while ($zip_entry = zip_read($zip)) 
						{
							$fname = zip_entry_name($zip_entry);						
							if (zip_entry_open($zip, $zip_entry, "r")) 
							{
								$buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
								zip_entry_close($zip_entry);
								file_put_contents($manager->getWorkingDir() . "/media/amu/" . $fname,$buf);
							}
						}
						zip_close($zip);						
					}
				}*/
            }            
            return $ret;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            uses("server_xls_excelReader", false);
            $listnka = "' '";
			$xls = new Spreadsheet_Excel_Reader($tmpFile);
			$values = "";
			$title = "";
			$header = array();
			$uploadid = MD5(date("r"));        
			$rowPerPage = 20;					
			$nfa = "";
			uses("server_util_arrayList");
            $sql = new server_util_arrayList();			
			$first = true;			
			for ($row = 1;$row <= $xls->rowcount();$row++){            				
				if ($row == 1)  continue;                         								
						  
				$nka = $xls->val($row, 1);
                $sn = $xls->val($row, 2);                
                if ($nfa != $nka . $sn) 
                {					
                    $sql->add("insert into amu_rekon_m (no_inv,  kode_lokasi, kode_lokfa, tanggal, nik_user, tgl_input, jenis, progress, nik_buat, lampiran)" . " values('$nobukti','$lokasi', '$lokfa', '$tgl', '$user',now(),'$jenis','0','$nikbuat','" . $fileUpld[0] . "')");
                    $nfa = $nka . $sn;
                    if (!$first){
						$nu++;
						$numeric = strval($nu);
						
						for ($i = strlen($numeric);$i < 6;$i++) $numeric = "0" . $numeric;
						$nobukti = $format . $numeric;
					}
                    $status = 99;
                }
                $data = "'$lokasi','" . $nka . $sn . "'";
                $listnka .= ", '". $nka . $sn."'";                     
                
                if ($xls->val($row, 29) != "-" &&  $status > floatval($xls->val($row, 29))) $status = floatval($xls->val($row, 29));
                
				for ($col = 1;$col <= $xls->colcount();$col++) {
					if ($col != 2 && $col) $data .= ",'".$xls->val($row, $col). "'";
				}								
				$first = false;
				if ($jenis == "TB")
					$sql->add("insert into amu_rekon_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, no_sertifikat, luas,ket_lokasi, keterangan,periode)
						values('$nobukti'," . $data . ",'$periode')");
				else $sql->add("insert into amu_rekon_d(no_inv, kode_lokasi, no_gabung,no_fa,no_sn, alamat, jml_fisik, no_label, kode_status, nama, ket_lokasi, keterangan,periode)values('$nobukti'," . $data . ",'$periode')");                                                			  	
			}
			/*$dtCheck = $dbLib->execute("select distinct no_gabung from amu_kkl_d where no_gabung in (". $listnka.")");
			if (!$dtCheck->EOF){
				$nka = "";				
				while (!$dtCheck->EOF){
					$nka .= ($nka == ""? "": ", ") . $dtCheck->fields[0];
					$dtCheck->MoveNext();
				}
				$ret = "error: " . $nka ." sudah pernah di input KKILnya" ;
			} else */
				$ret = $dbLib->execArraySQL($sql);
            
            if (!strpos($ret, "error")) 
            {             				               
                global $manager;
                $ext = strpos($fileUpld[0], ".zip");
                //if (!$ext)
				copy($manager->getWorkingDir() . "/tmp/" . $fileUpld[1], $manager->getWorkingDir() . "/media/amu/" . $fileUpld[0]);
                /*else {										
					$zip = zip_open($manager->getWorkingDir() . "/tmp/" . $fileUpld[1]);
					if(!$zip) {return("Unable to proccess file '{".$fileUpld[1]."}'");}
					
					while ($zip_entry = zip_read($zip)) 
					{
						   $zdir=dirname(zip_entry_name($zip_entry));
						   $zname=zip_entry_name($zip_entry);

						   if(!zip_entry_open($zip,$zip_entry,"r")) {$e.="Unable to proccess file '{$zname}'";continue;}
						   if(!is_dir($zdir)) mkdirr($manager->getWorkingDir() . "/media/amu/" . $zdir,0777);

						   #print "{$zdir} | {$zname} \n";

						   $zip_fs=zip_entry_filesize($zip_entry);
						   if(empty($zip_fs)) continue;

						   $zz=zip_entry_read($zip_entry,$zip_fs);

						   $z=fopen($manager->getWorkingDir() . "/media/amu/" .$zname,"w");
						   fwrite($z,$zz);
						   fclose($z);
						   zip_entry_close($zip_entry);
					}
					zip_close($zip);
				} */           
            }
			return $ret;
        }
    }
    function uploadKonversi($nobukti, $periode, $tgl, $jenisproc, $lokasi, $user, $klp, $lampiran, $lokfa, $ttd1, $ttd2, $deleteData = null) 
    {
        global $dbLib;
        $dbSchema = $dbLib->db;
        $filename = $this->filename;
        $tmpFile = $this->tmpfile;
        $lampiran = explode(";", $lampiran);
        
        for ($i = 1;$i < 3;$i++) 
        {
            $pos = strrpos($tmp, $dirSeparator);
            $tmp = substr($tmp, 0, $pos);
        }
        $ext = strpos($filename, ".zip");
        
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");
                    return $this->prosesXls($tmpFile);                    
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        $xml = new XML_Doc();
                        $xml->parse($buf);
                        $data = xml_data($xml->rootNode);
                        $data = substr($data, 1);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        
        if ($ret && $filetype == "text") 
        {
            $data = str_replace("\r", "", $data);
            $valueList = explode("\n", $data);
            $header = explode("\t", $valueList[0]);
            $dataUpload = array();
            $record = 0;
            uses("server_util_Map");
            $prosedurFA = new server_util_Map();
            
            $dataKlp = $dbLib->execute("select distinct a.kode_klpfa, b.nama, a.jenis_proc from amu_klp_alt a
					inner join amu_klp b on b.kode_klpfa = a.kode_klpfa 
					inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'");
			
			while ($rec = $dataKlp->FetchNextObject(true)){
				$prosedurFA->set($rec->KODE_KLPFA, $rec);
			}
			
            uses("server_util_arrayList");
            $sql = new server_util_arrayList();
            //NO_KONV	KODE_LOKASI	KODE_KLP	TANGGAL	KETERANGAN	NIK_BUAT	PERIODE	JNS_PROC
            $sql->add("insert into amu_alt_konv_m (no_konv,  kode_lokasi, kode_klp, tanggal, keterangan, nik_buat, periode, jns_proc, lampiran, kode_lokfa)" .
					" values('$nobukti','$lokasi', '$klp', '$tgl','-', '$user','$periode','$jenisproc','". $lampiran[0] ."','$lokfa' )");
						
			if ($jenisproc == "Jaringan")
				$sql->add("insert into amu_alt_ver_m (no_ver,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, kode_lokfa)" . " values('$nobukti','$lokasi', '$klp', '$tgl', '$user','$periode','$jenisproc','$lokfa' )");
            $nka = "' '";
            $nkatemp = "";
            for ($i = 1;$i < count($valueList) - 1;$i++) 
            {
				if (trim($valueList[$i]) == "") continue;
				//$valueList[$i] = trim($valueList[$i]);
                $line = explode("\t", $valueList[$i]);
                $lineA = array();
                
                foreach ($line as $c => $value)
                {
                    $lineA[strtolower($header[$c]) ] = $value;
                }
                $kartu = isset($lineA["no kartu aset"]) ? $lineA["no kartu aset"] : $line[0];
                $sn = isset($lineA["sub no"]) ? $lineA["sub no"]: $line[1];
                
                if ((trim($kartu) == "" || trim($kartu) == "-") && $nka ){
					$data = "'$lokasi', '" . $nkatemp. "'";
                }else {
					$data = "'$lokasi', '" . $kartu. $sn. "'";
					$nkatemp = $kartu. $sn;
					$nka .= ",'".$kartu. $sn ."'";
				}
                //if (trim($kartu) == "") continue;
                //check Klas aset untuk prosedurnya
                $dtProc = $prosedurFA->get(substr($kartu,0,6));
                if (!($dtProc && trim($dtProc->JENIS_PROC) == $jenisproc)){
					return " error: $kartu$sn tidak ada di dalam prosedur ini. (Prosedurnya ".$dtProc->JENIS_PROC ." ". $dtProc->NAMA .")";
				}
				//----------                
                foreach ($lineA as $c => $value) {                    
                    if ($c != "no kartu aset" && trim($c) != "sub no" &&trim($c) != "sub nbr" && trim($c) != "bus area" && trim($c) != "busa" && trim($c) != "ba" && $c != "deskripsi aset" && trim($c) != "kelas aset" && $c != "deskripsi alamat" && $c != "deskripsi lokasi" && trim($c) != "cap date" && trim($c) != "nilai perolehan" && trim($c) != "nilai buku" && trim($c) != "akumulasi penyusutan" && trim($c) != "location" && trim($c) != "status app") 
                    {
						if ($jenisproc == "Jaringan" && strpos($c,"evidence") > 0 ) ;
						else $data.= ",'" . ($value == "" ? "-" : str_replace("'", "`", $value)) . "'";
                    }
                    $lastix = $c;
                }
                $app = $lineA[$lastix] == "-" && $lastix != "status app" ? "NOTAPP":"APP";
                if ($lastix == "status app") $app = $lineA[$lastix];
                $sql->add("insert into amu_alt_konv_d(no_konv,kode_lokasi, no_gabung, " . $this->getField($jenisproc) . ",status_app, periode,jns_proc )values('$nobukti'," . $data . ",'$app','$periode','$jenisproc')");
                if ($jenisproc == "Jaringan") {
					$data = "'$lokasi', '" . ($lineA["no kartu aset"]) . ($lineA["sub no"]). "','" . ($lineA[$lastix]). "','-'";
					$sql->add("insert into amu_alt_ver_d(no_ver,kode_lokasi, no_gabung, no_evd, no_konv, periode,jns_proc  )values('$nobukti'," . $data . ",'$periode','$jenisproc')");
				}
                $record++;
            }
            $nu = 0;
            foreach ($ttd1->getArray() as $key => $value ){
				$sql->add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('".$nobukti."',0,'". $value ."',".$nu.")");
				$nu++;
			}
			$nu = 0;
            foreach ($ttd2->getArray() as $key => $value ){
				$sql->add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('".$nobukti."',1,'". $value ."',".$nu.")");
				$nu++;
			}
			
			if ($deleteData){				
				$sqltmp = new server_util_arrayList();					
				//$sqltmp->add("delete from amu_alt_konv_m where no_konv in (select distinct no_konv from amu_alt_konv_d where no_gabung in (". $nka.")) ");
				//$sqltmp->add("delete from amu_alt_ttd where no_bukti in (select distinct no_konv from amu_alt_konv_d where no_gabung in (". $nka.")) ");
				//$sqltmp->add("delete from amu_alt_konv_d where no_gabung in (". $nka.") ");
				
				
				$arrayNKA = explode(",",$nka);				
				if (count($arrayNKA) < 1000){					
					$sqltmp->add("delete from amu_alt_konv_d where no_gabung in (". $nka.") ");															
					if ($jenisproc == "Jaringan" && $nka != ""){						
						$sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $nka.") ");														
					}
				}else{
					$lkartu = "";
					$nkartu = 0;
					foreach ($arrayNKA as $x => $v){
						$nkartu++;					
						if ($nkartu < 999){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$sqltmp->add("delete from amu_alt_konv_d where no_gabung in (". $lkartu.") ");
							$lkartu = "";
							$nkartu = 0;
						}					
					}
					if ($lkartu != "") $sqltmp->add("delete from amu_alt_konv_d where no_gabung in (". $lkartu.") ");
					if ($jenisproc == "Jaringan" && $nka != ""){
						//$sqltmp->add("delete from amu_alt_ver_m where no_ver in (select distinct no_ver from amu_alt_ver_d where no_gabung in (". $nka.")) ");					
						//$sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $nka.") ");					
						$lkartu = "";
						$nkartu = 0;
						foreach ($arrayNKA as $x => $v){
							$nkartu++;					
							if ($nkartu < 999){
								 if ($lkartu != "") $lkartu .= ",";
								 $lkartu .= $v;
							}else {
								$sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $lkartu.") ");
								$lkartu = "";
								$nkartu = 0;
							}					
						}
						if ($lkartu != "") $sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $lkartu.") ");
					}
				}
				foreach ($sql->getArray() as $key => $value) $sqltmp->add($value);
					$sql = $sqltmp;
			}else {
				$arrayNKA = explode(",",$nka);				
				if (count($arrayNKA) < 1000){					
					$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_konv_d where no_gabung in (". $nka.")");			
					if ($dtCheck){
						$nka = "";
						while ($row = $dtCheck->FetchNextObject(true) ){
							$nka .= ", " . $row->NO_GABUNG;
						}
						
						if ($nka != "") {
							$nka = substr($nka,1);
							return " error: NKA ini ($nka) sudah di konversi";
						}
					}
					if ($jenisproc == "Jaringan" && $nka != ""){
						$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_ver_d where no_gabung in (". $nka.")");			
						if ($dtCheck){
							$nka = "";
							while ($row = $dtCheck->FetchNextObject(true) ){
								$nka .= ", " . $row->NO_GABUNG;
							}
							
							if ($nka != "") {
								$nka = substr($nka,1);
								return " error: NKA ini ($nka) sudah di verifikasi";
							}
						}
					}
					
				}else{
					$arrayNKA = explode(",",$nka);				
					$lkartu = "";
					$nkartu = 0;							
					foreach ($arrayNKA as $x => $v){
						$nkartu++;
						if ($nkartu < 900){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_konv_d where no_gabung in (". $lkartu.")");			
							if ($dtCheck){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di konversi";
								}
							}
							$lkartu = "";
							$nkartu = 0;
						}					
					}
					if ($lkartu != ""){
						$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_konv_d where no_gabung in (". $lkartu.")");			
							if ($dtCheck){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di konversi";
								}
							}
					}
					if ($jenisproc == "Jaringan" && $nka != ""){
						$lkartu = "";
						$nkartu = 0;							
						foreach ($arrayNKA as $x => $v){
							$nkartu++;
							if ($nkartu < 900){
								 if ($lkartu != "") $lkartu .= ",";
								 $lkartu .= $v;
							}else {
								$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_ver_d where no_gabung in (". $lkartu.")");			
								if ($dtCheck){
									$nka = "";
									while ($row = $dtCheck->FetchNextObject(true) ){
										$nka .= ", " . $row->NO_GABUNG;
									}
									
									if ($nka != "") {
										$nka = substr($nka,1);
										return " error: NKA ini ($nka) sudah di verifikasi";
									}
								}
								$lkartu = "";
								$nkartu = 0;
							}					
						}
						if ($lkartu != ""){
							$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_ver_d where no_gabung in (". $lkartu.")");			
								if ($dtCheck){
									$nka = "";
									while ($row = $dtCheck->FetchNextObject(true) ){
										$nka .= ", " . $row->NO_GABUNG;
									}
									
									if ($nka != "") {
										$nka = substr($nka,1);
										return " error: NKA ini ($nka) sudah di verifikasi";
									}
								}
						}
					}
				}
			}			
            //$result .= "],\"uploadid\" : \"$uploadid\", \"recCount\":".(count($valueList)-1) .",\"title\":\"$title\"}";
            $ret = $dbLib->execArraySQL($sql);
            
            return $ret;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            uses("server_xls_excelReader", false);
            
			$xls = new Spreadsheet_Excel_Reader($tmpFile);
			$values = "";
			$title = "";
			$header = array();
			$uploadid = MD5(date("r"));        
			$rowPerPage = 20;					
			$nfa = "";
			uses("server_util_arrayList");
            $sql = new server_util_arrayList();			
			$first = true;			
			$sql->add("insert into amu_alt_konv_m (no_konv,  kode_lokasi, kode_klp, tanggal, keterangan, nik_buat, periode, jns_proc, lampiran, kode_lokfa)" .
					" values('$nobukti','$lokasi', '$klp', '$tgl','-', '$user','$periode','$jenisproc', '". $lampiran . "','$lokfa' )");
			$listnka = "' '";
			for ($row = 1;$row <= $xls->rowcount();$row++){            				
				if ($row == 1)  continue;                         				
				$first = false;				
						  
				$nka = $xls->val($row, 1);
                $sn = $xls->val($row, 2);
                $data = "'$lokasi','" . $nka . $sn . "'";
                $pass = false;                     
                $listnka .= ",'". $nka . $sn."' ";
				for ($col = 1;$col <= $xls->colcount();$col++) {
					if (strtolower( $xls->val(0, $col) ) == "nilai buku") $pass = true;
					if ($pass) $data .= ",'".$xls->val($row, $col). "'";
				}								
				
                $sql->add("insert into amu_alt_konv_d(no_konv,kode_lokasi, no_gabung, " . $this->getField($jenisproc) . ",status_app, periode,jns_proc )values('$nobukti'," . $data . ",'$app','$periode','$jenisproc')");
                                			  			
			}		
			if ($deleteData){
				$sqltmp = new server_util_arrayList();				
				//$sqltmp->add("delete from amu_alt_konv_m where no_konv in (select distinct no_konv from amu_alt_konv_d where no_gabung in (". $listnka.")) ");
				//$sqltmp->add("delete from amu_alt_ttd where no_bukti in (select distinct no_konv from amu_alt_konv_d where no_gabung in (". $nka.")) ");
				$arrayNKA = explode(",",$listnka);				
				$lkartu = "";
				$nkartu = 0;
				foreach ($arrayNKA as $x => $v){
					$nkartu++;					
					if ($nkartu < 999){
						 if ($lkartu != "") $lkartu .= ",";
						 $lkartu .= $v;
					}else {
						$sqltmp->add("delete from amu_alt_konv_d where no_gabung in (". $lkartu.") ");
						$lkartu = "";
						$nkartu = 0;
					}					
				}				
				foreach ($sql->getArray() as $key => $value) $sqltmp->add($value);
				$sql = $sqltmp;
			}else {	
				$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_konv_d where no_gabung in (". $listnka.")");
				if ($dtCheck){
					$nka = "";
					while ($row = $dtCheck->FetchNextObject(true) ){
						$nka .= ", " . $row->NO_GABUNG;
					}
					
					if ($nka != "") {
						$nka = substr($nka,1);
						return " error: NKA ini ($nka) sudah dikonversi";
					}
				}
			}
			$ret = $dbLib->execArraySQL($sql);                       
			if (!strpos($ret, "error")) 
            {             				               
                global $manager;
                $ext = strpos($lampiran[0], ".zip");                
				copy($manager->getWorkingDir() . "/tmp/" . $lampiran[1], $manager->getWorkingDir() . "/media/amu/" . $lampiran[0]);                
            }
			return $ret;
        }
    }
    
    function uploadVerifikasi($nobukti, $periode, $tgl, $jenisproc, $lokasi, $user, $klp, $lokfa, $ttd1, $ttd2, $deleteData = null) 
    {
        global $dbLib;
        $dbSchema = $dbLib->db;
        $filename = $this->filename;
        $tmpFile = $this->tmpfile;
        
        for ($i = 1;$i < 3;$i++) 
        {
            $pos = strrpos($tmp, $dirSeparator);
            $tmp = substr($tmp, 0, $pos);
        }
        $ext = strpos($filename, ".zip");
        
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");
                    $this->prosesXls($tmpFile);
                    $ret = true;
                    $filetype = "xls";
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        $xml = new XML_Doc();
                        $xml->parse($buf);
                        $data = xml_data($xml->rootNode);
                        $data = substr($data, 1);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        
        if ($ret && $filetype == "text") 
        {
            $data = str_replace("\r", "", $data);
            $valueList = explode("\n", $data);
            $header = explode("\t", $valueList[0]);
            $dataUpload = array();
            $record = 0;
            uses("server_util_arrayList");
            
            uses("server_util_Map");
            $prosedurFA = new server_util_Map();
            
            $dataKlp = $dbLib->execute("select distinct a.kode_klpfa, b.nama, a.jenis_proc from amu_klp_alt a
					inner join amu_klp b on b.kode_klpfa = a.kode_klpfa 
					inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'");
			
			while ($rec = $dataKlp->FetchNextObject(true)){
				$prosedurFA->set($rec->KODE_KLPFA, $rec);
			}
			$sql = new server_util_arrayList();
            $sql->add("insert into amu_alt_ver_m (no_ver,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, kode_lokfa)" . " values('$nobukti','$lokasi', '$klp', '$tgl', '$user','$periode','$jenisproc','$lokfa' )");
            $nka = "' '";
            for ($i = 1;$i < count($valueList) - 1;$i++) 
            {
				if (trim($valueList[$i]) == "") continue;
				$valueList[$i] = trim($valueList[$i]);
                $line = explode("\t", $valueList[$i]);
                $lineA = array();
                
                foreach ($line as $c => $value) 
                {				
                    $lineA[strtolower($header[$c]) ] = $value;
                    if (strpos(strtolower($header[$c]),"evidence") > 0) $lastix = strtolower($header[$c]);
                }                
                $kartu = isset($lineA["no kartu aset"]) ? $lineA["no kartu aset"] : $line[0];
                $sn = isset($lineA["sub no"]) ? $lineA["sub no"] : $line[1];
                if (trim($kartu) == "") continue;
                $data = "'$lokasi', '" . $kartu. $sn. "','" . ($lineA[$lastix]). "','-'";                                
                $nka .= ",'". $kartu . $sn."'";
                
                //check Klas aset untuk prosedurnya
                $dtProc = $prosedurFA->get(substr($kartu,0,6));
                if (!($dtProc && trim($dtProc->JENIS_PROC) == $jenisproc)){
					return " error: $kartu$sn tidak ada di dalam prosedur ini. (Prosedurnya ".$dtProc->JENIS_PROC ." ". $dtProc->NAMA .")";
				}
				//----------
				
                $sql->add("insert into amu_alt_ver_d(no_ver,kode_lokasi, no_gabung, no_evd, no_konv, periode,jns_proc  )values('$nobukti'," . $data . ",'$periode','$jenisproc')");
                $record++;
            }
            $nu = 0;
            foreach ($ttd1->getArray() as $key => $value ){
				$sql->add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('".$nobukti."',0,'". $value ."',".$nu.")");
				$nu++;
			}
			$nu = 0;
            foreach ($ttd2->getArray() as $key => $value ){
				$sql->add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('".$nobukti."',1,'". $value ."',".$nu.")");
				$nu++;
			}						
			if ($deleteData == true){
				$sqltmp = new server_util_arrayList();
				//$sqltmp->add("delete from amu_alt_ver_m where no_ver in (select distinct no_ver from amu_alt_ver_d where no_gabung in (". $nka.")) ");
				//$sqltmp->add("delete from amu_alt_ttd where no_bukti in (select distinct no_ver from amu_alt_ver_d where no_gabung in (". $nka.")) ");
				//$sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $nka.") ");								
				$arrayNKA = explode(",",$nka);		
				if (count($arrayNKA) < 1000){					
					$sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $nka.") ");
				}else{
					$lkartu = "";
					$nkartu = 0;							
					foreach ($arrayNKA as $x => $v){
						$nkartu++;
						if ($nkartu < 900){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {						
							$sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $lkartu.") ");
							$lkartu = "";
							$nkartu = 0;
						}					
					}
					if ($lkartu !="")$sqltmp->add("delete from amu_alt_ver_d where no_gabung in (". $lkartu.") ");
				}
				foreach ($sql->getArray() as $key => $value) $sqltmp->add($value);
					$sql = $sqltmp;
			}else {				
				$arrayNKA = explode(",",$nka);		
				if (count($arrayNKA) < 1000){					
					$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_ver_d where no_gabung in (". $nka.")");			
					if ($dtCheck){
						$nka = "";
						while ($row = $dtCheck->FetchNextObject(true) ){
							$nka .= ", " . $row->NO_GABUNG;
						}
						
						if ($nka != "") {
							$nka = substr($nka,1);
							return " error: NKA ini ($nka) sudah di verifikasi";
						}
					}
				}else{
					$lkartu = "";
					$nkartu = 0;							
					foreach ($arrayNKA as $x => $v){
						$nkartu++;
						if ($nkartu < 900){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_ver_d where no_gabung in (". $lkartu.")");			
							if ($dtCheck){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di verifikasi";
								}
							}
							$lkartu = "";
							$nkartu = 0;
						}					
					}
					if ($lkartu != ""){
						$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_ver_d where no_gabung in (". $lkartu.")");			
							if ($dtCheck){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di verifikasi";
								}
							}
					}
				}	
			}
            //$result .= "],\"uploadid\" : \"$uploadid\", \"recCount\":".(count($valueList)-1) .",\"title\":\"$title\"}";
            $ret = $dbLib->execArraySQL($sql);                         
            return $ret;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            $response = "{Code:0,";
            $response.= "value:'" . $data . "'}";
        }
    }
    function uploadBA($nobukti, $periode, $tgl, $jenisproc, $lokasi, $user, $klp, $lokfa, $ttd1, $ttd2, $deleteData = null) 
    {
        global $dbLib;
        $dbSchema = $dbLib->db;
        $filename = $this->filename;
        $tmpFile = $this->tmpfile;
        
        for ($i = 1;$i < 3;$i++) 
        {
            $pos = strrpos($tmp, $dirSeparator);
            $tmp = substr($tmp, 0, $pos);
        }
        $ext = strpos($filename, ".zip");
        
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");
                    $this->prosesXls($tmpFile);
                    $ret = true;
                    $filetype = "xls";
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        $xml = new XML_Doc();
                        $xml->parse($buf);
                        $data = xml_data($xml->rootNode);
                        $data = substr($data, 1);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        
        if ($ret && $filetype == "text") 
        {
            $data = str_replace("\r", "", $data);
            $valueList = explode("\n", $data);
            $header = explode("\t", $valueList[0]);            
            $dataUpload = array();
            $record = 0;
            uses("server_util_Map");
            $prosedurFA = new server_util_Map();
            
            $dataKlp = $dbLib->execute("select distinct a.kode_klpfa, b.nama, a.jenis_proc from amu_klp_alt a
					inner join amu_klp b on b.kode_klpfa = a.kode_klpfa 
					inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'");
			
			while ($rec = $dataKlp->FetchNextObject(true)){
				$prosedurFA->set($rec->KODE_KLPFA, $rec);
			}
            uses("server_util_arrayList");
            $sql = new server_util_arrayList();													
            $sql->add("insert into amu_alt_baver_m (no_ba,  kode_lokasi, kode_klp, tanggal, nik_buat, periode, jns_proc, kode_lokfa)" . " values('$nobukti','$lokasi', '$klp', '$tgl', '$user','$periode','$jenisproc','$lokfa' )");
            $nka = "' '";
            for ($i = 1;$i < count($valueList) - 1;$i++) 
            {
                if (trim($valueList[$i]) == "") continue;
				$valueList[$i] = trim($valueList[$i]);
                $line = explode("\t", $valueList[$i]);
                $lineA = array();
                
                foreach ($line as $c => $value) 
                {				
                    $lineA[strtolower($header[$c]) ] = $value;
                    $lastix = strtolower($header[$c]);                    
                    $dataAkhir = $value;
                }                
                $pos = strpos($lastix,"evidence");
                error_log($lastix);
                if (gettype($pos) != "boolean" && $lastix != "kesimpulan"){
					$dataAkhir = $lineA[$lastix] != "-" ? "Ada/Eksis" : "Tidak Dapat Diverifikasi";
				}
				if ($lastix != "kesimpulan" && gettype($pos) == "boolean"){
					return " error: field Ref. evidence atau kesimpulan tidak ditemukan.";
				}                
                $kartu = isset($lineA["no kartu aset"]) ? $lineA["no kartu aset"] : $line[0];
                $sn = isset($lineA["sub no"]) ? $lineA["sub no"] : $line[1];
                
                if (trim($kartu) == "") continue;
                $data = "'$lokasi', '" . $kartu. $sn. "','" . ($dataAkhir). "'";
                $nka .= ",'". $kartu . $sn."'";
                
                //check Klas aset untuk prosedurnya
                $dtProc = $prosedurFA->get(substr($kartu,0,6));
                if (!($dtProc && trim($dtProc->JENIS_PROC) == $jenisproc)){
					return " error: $kartu$sn tidak ada di dalam prosedur ini. (Prosedurnya ".$dtProc->JENIS_PROC ." ". $dtProc->NAMA .")";
				}
				//----------
				
                $sql->add("insert into amu_alt_baver_d (no_ba,kode_lokasi, no_gabung, kesimpulan, periode, jns_proc  )values('$nobukti'," . $data . ",'$periode','$jenisproc')");
                $record++;
            }
            if ($deleteData){
				$sqltmp = new server_util_arrayList();
				//$sqltmp->add("delete from amu_alt_baver_m where no_ba in (select distinct no_ba from amu_alt_baver_d where no_gabung in (". $nka.")) ");
				//$sqltmp->add("delete from amu_alt_ttd where no_bukti in (select distinct no_ba from amu_alt_baver_d where no_gabung in (". $nka.")) ");
				//$sqltmp->add("delete from amu_alt_baver_d where no_gabung in (". $nka.") ");
				$arrayNKA = explode(",",$nka);								
				if (count($arrayNKA) < 1000){				
					$sqltmp->add("delete from amu_alt_baver_d where no_gabung in (". $nka.") ");
				}else{
					$lkartu = "";
					$nkartu = 0;
					foreach ($arrayNKA as $x => $v){
						$nkartu++;					
						if ($nkartu < 999){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$sqltmp->add("delete from amu_alt_baver_d where no_gabung in (". $lkartu.") ");
							$lkartu = "";
							$nkartu = 0;
						}					
					}
				}
				foreach ($sql->getArray() as $key => $value) $sqltmp->add($value);
				$sql = $sqltmp;
			}else {
				$arrayNKA = explode(",",$nka);								
				if (count($arrayNKA) < 1000){				
					$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_baver_d where no_gabung in (". $nka.")");			
					if ($dtCheck){
						$nka = "";
						while ($row = $dtCheck->FetchNextObject(true) ){
							$nka .= ", " . $row->NO_GABUNG;
						}
						
						if ($nka != "") {
							$nka = substr($nka,1);
							return " error: NKA ini ($nka) sudah di BA Vserifikasi";
						}
					}
				}else{
					$lkartu = "";
					$nkartu = 0;							
					foreach ($arrayNKA as $x => $v){
						$nkartu++;
						if ($nkartu < 900){
							 if ($lkartu != "") $lkartu .= ",";
							 $lkartu .= $v;
						}else {
							$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_baver_d where no_gabung in (". $lkartu.")");			
							if ($dtCheck){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di BA Vserifikasi";
								}
							}
							$lkartu = "";
							$nkartu = 0;
						}					
					}
					if ($lkartu != ""){
						$dtCheck = $dbLib->execute("select distinct no_gabung from amu_alt_baver_d where no_gabung in (". $lkartu.")");			
							if ($dtCheck){
								$nka = "";
								while ($row = $dtCheck->FetchNextObject(true) ){
									$nka .= ", " . $row->NO_GABUNG;
								}
								
								if ($nka != "") {
									$nka = substr($nka,1);
									return " error: NKA ini ($nka) sudah di BA Vserifikasi";
								}
							}
					}
				}
			}
			$nu = 0;
            foreach ($ttd1->getArray() as $key => $value ){
				$sql->add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('".$nobukti."',0,'". $value ."',".$nu.")");
				$nu++;
			}
			$nu = 0;
            foreach ($ttd2->getArray() as $key => $value ){
				$sql->add("insert into amu_alt_ttd(no_bukti, status, nik,no_urut)values('".$nobukti."',1,'". $value ."',".$nu.")");
				$nu++;
			}
            //$result .= "],\"uploadid\" : \"$uploadid\", \"recCount\":".(count($valueList)-1) .",\"title\":\"$title\"}";
            $ret = $dbLib->execArraySQL($sql); 
            
            return $ret;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            $response = "{Code:0,";
            $response.= "value:'" . $data . "'}";
        }
    }
    function checkBusA($busA, $jnsproc) 
    {
        global $dbLib;
        $dbSchema = $dbLib->db;
        $filename = $this->filename;
        $tmpFile = $this->tmpfile;
        $ext = strpos($filename, ".zip");
        
        if (!$ext) 
        {
            $ext = strpos($filename, ".txt") || strpos($filename, ".csv");
            
            if (!$ext) 
            {
                $ext = strpos($filename, ".xml");
                
                if (!$ext) 
                {
                    $ext = strpos($filename, ".xls");
                    
                    if (!$ext) die("unreadable file");
                    $this->prosesXls($tmpFile);
                    $ret = true;
                    $filetype = "xls";
                }
                else
                {
                    uses("server_xml_Doc", false);
                    $xml = new XML_Doc();
                    $xml->parseFile($tmpFile);
                    $data = xml_data($xml->rootNode);
                    $ret = true;
                    $filetype = "xml";
                }
            }
            else
            {
                $file = $tmpFile;
                $data = file_get_contents($file);
                $ret = true;
                $filetype = "text";
            }
        }
        else
        {
            $filetype = "zip";
            $zip = zip_open($tmpFile);
            
            if ($zip) 
            {
                
                while ($zip_entry = zip_read($zip)) 
                {
                    $fname = zip_entry_name($zip_entry);
                    
                    if (zip_entry_open($zip, $zip_entry, "r")) 
                    {
                        $buf = zip_entry_read($zip_entry, zip_entry_filesize($zip_entry));
                        zip_entry_close($zip_entry);
                        $xml = new XML_Doc();
                        $xml->parse($buf);
                        $data = xml_data($xml->rootNode);
                        $data = substr($data, 1);
                    }
                }
                zip_close($zip);
                $ret = true;
            }
        }
        $uploadid = MD5(date("r"));
        
        if ($ret && $filetype == "text") 
        {
            $data = str_replace("\r", "", $data);
            $valueList = explode("\n", $data);
            $header = explode("\t", $valueList[0]);
            $dataUpload = array();
            $record = 0;
            uses("server_util_arrayList");
            $ret = new server_util_arrayList();
            
            for ($i = 1;$i < count($valueList) - 1;$i++) 
            {
                $line = explode("\t", $valueList[$i]);
                $lineA = array();
                
                foreach ($line as $c => $value) 
                {
                    $lineA[strtolower($header[$c]) ] = $value;
                }
                
                if ($lineA["bus area"] != $busA) 
                {
                    $ret->add("{\"row\":$record, \"ba\":\"" . $lineA["bus area"] . "\",\"nka\":\"" . $lineA["no kartu aset"] . "\"}");
                }
                $record++;
            }
            
            return $ret;
        }
        else 
        if ($ret && $filetype == "xls") 
        {
            $response = "{Code:0,";
            $response.= "value:'" . $data . "'}";
        }
    }
    
    function getField($jns) 
    {
        
        switch (strtolower($jns)) 
        {
        case "sentral":            
            return "kode_netre, kode_arnet, lokasi_sentral, kode_sentral, nama_sentral, kode_area, fkn, fungsi, host, tipe_sentral";
        break;
        case "rce & mux":
        case "rms":
        case "skkl / skso":            
            return "kode_netre, kode_tipe, kode_komp, kode_proyek, kode_link";
        break;
        case "modem data & imux":            
            return "no_kontrak, kode_vendor, no_kontrak2, status_sn";
        break;
        case "satelit":            
            return "kode_satelit";
        break;
        case "server":            
            return "kode_netre,lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch";
        break;
        case "rbs":            
            return "level1, level2, lokasi_rbs, kode_sto, kode_vendor, kode_alat, sts_rbs, sts_rekon ";
        break;
        case "stm & ims":            
            return "kode_group, kode_klpstm, kode_klpfa, kode_merk, kode_vendor, kode_lokstm, kode_sto, jumlah, kode_satuan, keterangan  ";
        break;
        case "lan & wan":            
            return "kode_netre,lokasi_server, kode_aplikasi, ip_server, tipe_switch, ip_switch";
        break;
        case "jaringan":            
            return "kode_netre, kode_arnet, kode_sto ";
        break;
        }
    }
	
	function downloadRekon($jenis, $lokfa, $periode){
		global $dbLib;
		$dbLib->sqlToXls2();
	}
	/*
    function uploadAttachment(){
    error_log($this->tmpfile . " ".$this->filename);
    $tmpFile = $this->tmpfile;
    $filename = $this->filename;
    $realFilename = $filename;
    global $manager;
    $param2 = $manager->getWorkingDir() . "/media/amu/";
    if (file_exists($param2 . $filename )){
    $pos = strrpos($filename,".");
    $ext = substr($filename, $pos, strlen($filename) - $pos);
    $base = substr($filename, 0,$pos);
    $c = 1;
    $filename = $base . "($c)". $ext;
    while (file_exists($param2 . $filename )){
    $filename = $base . "($c)". $ext;
    $c++;
    }
    }
    $ret = copy($tmpFile, $param2 . $filename );
    if ($param2 != ""){//cek file copy sebenarnya... jika uploadTo ke tmp
     if (file_exists($param2 . $realFilename)){			
    			$pos = strrpos($realFilename,".");
    			$ext = substr($realFilename, $pos, strlen($realFilename) - $pos);
    			$base = substr($realFilename, 0,$pos);
    			$c = 1;
    			$filenamedest = $base . "($c)". $ext;
    			while (file_exists($param2 . $filenamedest )){
    				$filenamedest = $base . "($c)". $ext;
    				$c++;
    			}
            }else $filenamedest = $realFilename;    
            $filename = "{\"tmpfile\":\"$filename\",\"filedest\":\"$filenamedest\",\"size\":\"". filesize($param2 . $filename)."\",\"date\":\"". filemtime($param2 . $filename)."\"}";						
        }
        error_log($filename);
    }
    */
    
}
?>
