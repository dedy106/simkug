<?php
$serverDir = __FILE__;

if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
    {
    	$dirSeparator = "\\";        
    }
    else
    {
    	$dirSeparator = "/";     
    }
    
$pos = strrpos($serverDir, $dirSeparator);
$path = substr($serverDir, 0, $pos);

ini_set('display_errors', 'Off');
ini_set ('track_errors', 'On');	 
ini_set ('max_execution_time', '3000');	 
ini_set ('memory_limit', '2024M');
ini_set ('upload_max_filesize	', '100M');
ini_set ('log_errors',   'On');
ini_set ('error_log',    $path .$dirSeparator."server".$dirSeparator."tmp".$dirSeparator."php_error.log");	
reset ($_FILES);



include_once("server/library.php");

uses("server_httpRequest");

$uploadClassName = $httpRequest->getParameter("uploadClassName");
$funcName = $httpRequest->getParameter("funcName");
$param1 = $httpRequest->getParameter("param1");
$param2 = $httpRequest->getParameter("param2");
$param3 = $httpRequest->getParameter("param3");
$param4 = $httpRequest->getParameter("param4");
$resId = $httpRequest->getParameter("resId");
$col = $httpRequest->getParameter("col");
uses("server_Response");
uses("server_util_Map");
$ret = false;
try{
	$tmp = __FILE__;			
	
	if ($_FILES['uploadFile']['size'] > 10509999){ 
		$response = "{\"Code\":1,";
		$response .= "\"value\":\"File terlalu besar ( harus <= 10 MB).\"}";						
		throw new Exception("File terlalu besar " . $_FILES['uploadFile']['size']);
		$ret = false;
	}		
	if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
		$dirSeparator = "\\";
	else
		$dirSeparator = "/";	
	if ($param4 == "gridupload"){			
		$filename = strtolower($_FILES["uploadFile"]['name']);
		$tmpFile = $_FILES["uploadFile"]['tmp_name'];		
		for ($i = 1; $i < 3; $i++)
		{	
			$pos = strrpos($tmp, $dirSeparator);
			$tmp = substr($tmp, 0, $pos);
		}
		$ext = strpos($filename,".zip");		
		if (!$ext)
		{
			$ext = strpos($filename,".txt") || strpos($filename,".csv");			
			if 	(!$ext)	
			{
				$ext = strpos($filename,".xml");
				if (!$ext){
					$ext = strpos($filename,".xls");		
					if (!$ext)
						die ("unreadable file");								
					uses("server_util_excel");					
					$xls = new server_util_excel($filename);					
					$data = $xls->read2Txt($tmpFile);						
					$ret = true;							
					//$param3 = "xls";											
				}else {
					uses("server_xml_Doc",false);		
					$xml = new XML_Doc();					
					$xml->parseFile($tmpFile);				
					$data = xml_data($xml->rootNode);				
					$ret = true;
				}
			}else 
			{								
					$file = $tmpFile;							
					$data = file_get_contents($file);					
					$ret = true;					
			}
		}else 
		{ 
			$zip = 	zip_open($tmpFile);
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
						$data = substr($data,1);
						echo $data;
						echo "<br>";
					}		
				}			
				zip_close($zip);
				$ret = true;
			}
		}				
		if ($ret && $param3=="text"){			
			$valueList = explode("\r\n", $data);
			$header = explode("\t",$valueList[0]);									
			$headerText = "";			
			foreach ($header as $c =>$value){															
				$headerText .= ";" . $value;					
			}
			$headerText = substr($headerText,1);
			$result = "\r\n";			
			for ($i = 1; $i < count($valueList)-1;$i++){
				$line = explode("\t",$valueList[$i]);				
				$data = "";
				foreach ($line as $c =>$value){															
					$data .= ";" . $value;					
				}
				$data = substr($data,1);
				$result .= $data . "\n";
			}						
			$map = $headerText . $result ."\r\n". ($i-1);
			$response = "{Code:0,";
			$response .= "value:'". $map."'}";
		}else if ($ret && $param3=="xls"){			
			$response = "{Code:0,";
			$response .= "value:'". $data."'}";				
		}else if ($ret && $param3=="object"){																
			$map = "{\"rows\" : [";
						
			if (strpos($filename,".txt") != false || strpos($filename,".csv")){
				$data = str_replace("\r","",$data);	
				$valueList = explode("\n", $data);
				$header = explode("\t",$valueList[0]);						
				$index = 1;								
			}else if (strpos($filename,".xls") != false){
				$valueList = explode("\r\n", $data);				
				$header = explode(";",$valueList[0]);	
				$valueList = explode("\n",$valueList[1]);	
				$index = 0;
			}
			$desc1 = "";
			//$desc2 = "{";
			//if ($mapheader != null) $header = explode(";",$mapheader);
			$first = true;
			$fieldLength = array();
			for ($i = $index; $i < count($valueList)-1;$i++){
				if (strpos($filename,".txt") != false || strpos($filename,".csv"))
					$line = explode("\t",$valueList[$i]);				
				else if (strpos($filename,".xls") != false)
					$line = explode(";",$valueList[$i]);				
				$lineMap = "{";
				
				foreach ($header as $c =>$value){
					if ($c > 0) {
						$lineMap .= ",";
						if ($first){
							//$desc1 .= ",";
							//$desc2 .= ",";
						}
					}
					$lineMap .= "\"$value\":\"" . $line[$c] ."\"";
					if ($first){
						//$desc1 .= "\"$value\":{\"type\":\"S\",\"length\":250}";
						//$desc2 .= "\"$value\":\"S\"";
					}
					if ($fieldLength[$c] < strlen($line[$c]) * 7)  $fieldLength[$c] = strlen($line[$c]) * 7;
					if ($fieldLength[$c] > 250) $fieldLength[$c] = 250;
					if ($fieldLength[$c] < 80) $fieldLength[$c] = 80;
					
				}
				$lineMap .= "}";
				if ($i > $index) $map .= ",";
				$map .= $lineMap;
				$first = false;
			}
			$desc1 = "";
			foreach ($header as $c =>$value){
				if ($c > 0) $desc1 .= ",";
				$desc1 .= "\"$value\":{\"type\":\"S\",\"length\":$fieldLength[$c]}";			
			}
			//$desc1 .= "}";
			//$desc2 .= "}";
			$map .= "],";
			$fieldDesc = "";							
			$fieldDesc .= $desc1 ."";
			//$fieldDesc .= $desc2 ."]";			
			$map .= "\"rowCount\": " . ($i-1) .",";
			$map .= "\"fieldDesc\":{ $fieldDesc }";					
			$response = "{\"code\":0,";
			$response .= "\"value\": $map }}";						
		 }else{
			$mapheader = $param3;						
			$response = new server_Response();
			uses("server_util_Map");
			$map = new server_util_Map();		
			$valueList = explode("\r\n", $data);			
			if (strpos($filename,".txt") != false){
				$header = explode("\t",$valueList[0]);						
				$index = 1;
			}else if (strpos($filename,".xls") != false){
				$header = explode(";",$valueList[0]);	
				$valueList = explode("\n",$valueList[1]);	
				$index = 0;
			}
			$fieldDesc = new server_util_Map();							
			$desc1 = new server_util_Map();
			$desc2 = new server_util_Map();
			if ($mapheader != null) $header = explode(";",$mapheader);
			for ($i = $index; $i < count($valueList)-1;$i++){
				if (strpos($filename,".txt") != false)
					$line = explode("\t",$valueList[$i]);				
				else if (strpos($filename,".xls") != false)
					$line = explode(";",$valueList[$i]);	
				$lineMap = new server_util_Map();
				foreach ($header as $c =>$value){															
					$lineMap->set($value,$line[$c]);
					$desc1->set($value,250);
					$desc2->set($value,"S");
				}
				$map->set(($i - $index),$lineMap);
			}
			$fieldDesc->set(0,$desc1);
			$fieldDesc->set(1,$desc2);
			$map->setTag1(($i-$index));
			$map->setTag2($fieldDesc);		
			$response->setCode(0);
			$response->setValue($map);
		 }
	}else if ($param4 == "data"  ){
		$filename = strtolower($_FILES["uploadFile"]['name']);
		$tmpFile = $_FILES["uploadFile"]['tmp_name'];
		$ret = false;
		if ($_FILES['uploadFile']['size'] > 20509999){ 
			$response = "{Code:1,";
			$response .= "value:'File terlalu besar ( harus < 20 mb).'}";						
			throw new Exception("File terlalu besar " . $_FILES['uploadFile']['size']);
			$ret = false;
		}		
		if ($param3 == "image"){	
			if ($_FILES['uploadFile']['type'] == "image/gif") $ret = true;
			elseif ($_FILES['uploadFile']['type'] == "image/jpg") $ret = true; 
			elseif ($_FILES['uploadFile']['type'] == "image/jpeg") $ret = true; 
			elseif ($_FILES['uploadFile']['type'] == "image/bmp") $ret = true; 
			elseif ($_FILES['uploadFile']['type'] == "image/png") $ret = true; 
			else {
				$response = "{code: 1,";
				$response .= " value: 'Bukan file gambar " . $_FILES['uploadFile']['type'] . "'}";			
				throw new Exception("Bukan File gambar " . $_FILES['uploadFile']['type']);
			}		
		}else {
			$ret = true;
		}
		if ($ret){
			$pos = strrpos($tmp, $dirSeparator);
			$tmp = substr($tmp, 0, $pos);		
			$pos = strrpos($filename, ".");
			$ext = substr($filename,$pos + 1, strlen($filename) - $pos);			
			$map = "{";
			$map .= "\"filename\":\"".$filename ."\",";
			$map .= "\"tanggal\":\"". date ("d/m/Y H:i:s",filemtime($tmpFile)). "\",";
			$map .= "\"folder\":\"media\",";
			$map .= "\"tipe\":\"" . $_FILES['uploadFile']['type']."\",";
			$map .= "\"size\":\"" . $_FILES['uploadFile']['size']."\",";
			$map .= "\"ext\":\"". $ext."\",";
			$map .= "\"rootSvr\":\"". addslashes($tmp)."\",";
			$filename = $param1 . "_" . md5(uniqid(rand(), true)) . "." .$ext;	
			$map .= "\"tmpfile\":\"" . addslashes($tmp. $dirSeparator ."server". $dirSeparator . "tmp" . $dirSeparator . $filename)."\"";			
			$map .= "}";						
			$response = new server_Response();
    		$response->setCode(0);
    		$response->setValue($map);
			$data = file_get_contents($tmpFile);
			$save = "server". $dirSeparator . "tmp" . $dirSeparator . $filename;			
			file_put_contents($save, $data);			
		}
	}else if ($param1 == "uploadTo"  ){		
		try{
			$tmpFile = $_FILES["uploadFile"]['tmp_name'];	
			$filename = strtolower($_FILES["uploadFile"]['name']);		
			$filename = str_replace(" ","_",$filename);
			$pos = strrpos($filename,"\\");		
			$filename = substr($filename,$pos);
			$realFilename = $filename;			
			if (file_exists($param2 . $filename ) && ($param3 != "true")){			
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
			if (!copy($tmpFile, $param2 . $filename )){
				$errors= error_get_last();				
				throw new  Exception($errors['type'].":".$errors['message'] . "=>".$tmpFile ." -> ". $param2 . $filename);
			}
			if ($param4 != ""){//cek file copy sebenarnya... jika uploadTo ke tmp
			   if (file_exists($param4 . $realFilename)){			
					$pos = strrpos($realFilename,".");
					$ext = substr($realFilename, $pos, strlen($realFilename) - $pos);
					$base = substr($realFilename, 0,$pos);
					$c = 1;
					$filenamedest = $base . "($c)". $ext;
					while (file_exists($param4 . $filenamedest )){
						$filenamedest = $base . "($c)". $ext;
						$c++;
					}
				}else $filenamedest = $realFilename;    
				$filename = "{\"tmpfile\":\"$filename\",\"filedest\":\"$filenamedest\",\"size\":\"". filesize($param2 . $filename)."\",\"date\":\"". filemtime($param2 . $filename)."\"}";						
			}		
			$response = new server_Response();
			$response->setCode(0);
			$response->setValue($filename);				
			$ret = true;		
		}catch(Exception $e){
			$response = new server_Response();
			$response->setCode(1);			
			$response->setValue($e->getMessage());	
			$ret = false;			
		}
	}else {		
	    uses($uploadClassName);
	    $obj = new $uploadClassName();
	    $response = new server_Response();
		$response->setCode(0);		
		$ret = new server_util_Map();
		while (list ($clave, $val) = each ($_FILES)) 
		{	
			$ret->set($val['name'], $obj->$funcName($val['name'], $val['tmp_name'], $param1, $param2, $param3, $param4));
			
		}
		$response->setValue($ret);
		$ret = true;
	}
    if ($ret)
        $retVal = "true";
    else
        $retVal = "false";			
    if ($response instanceof server_Response){
    	$response = $response->toXML();
    	$isXML = "true";	
    }else {
    	$isXML = "false";
    }
}catch (Exception $e)
{
    error_log($e->getMessage());
    $ret = false;
}

function checkBrowser(){
	$useragent = $_SERVER['HTTP_USER_AGENT'];
	if (preg_match('|MSIE ([0-9].[0-9]{1,2})|',$useragent,$matched)) {
		$browser_version=$matched[1];
		$browser = 'IE';
	} elseif (preg_match( '|Opera ([0-9].[0-9]{1,2})|',$useragent,$matched)) {
		$browser_version=$matched[1];
		$browser = 'Opera';
	} elseif(preg_match('|Firefox/([0-9\.]+)|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Firefox';
	} elseif(preg_match('|Safari/([0-9\.]+)|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Safari';
	} elseif(preg_match('|Chrome/([0-9\.]+)|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Chrome';
	} elseif(preg_match('|Chromium/([0-9\.]+)|',$useragent,$matched)) {
			$browser_version=$matched[1];
			$browser = 'Chrome';
	} else {
			// browser not recognized!
		$browser_version = 0;
		$browser= 'other';
	}
	return $browser;
}	
$col = !isset($col) ? 0 : $col;
?>

<script>
	try{				
		var response = <?php echo( "'" . $response ."'") ;?>;					
		window.parent.system.getResource(<?php echo($resId); ?>).doUploadFinished(<?php echo($retVal); ?>,response,<?php echo( $col); ?> );	
	}catch(e){
		alert("Upload Error::"+e);
	}
</script>
e
