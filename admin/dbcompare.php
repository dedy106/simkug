<?php
ob_start();
function db_Connect() { 
	include_once( "../server/server/ADODB/adodb5/adodb.inc.php");
	include_once( "../server/server/ADODB/adodb5/adodb-xmlschema.inc.php" ); # or adodb-xmlschema03.inc.php
	include_once("../server/server/conf/dbSetting.php");		
	global $dbhost;
	global $dbuser;
	global $dbpass;
	global $database;
	global $dbdriver;
	define("CONN_DB",$database);
	define("CONN_DBDRIVER",$dbdriver);
	define("CONN_HOST",$dbhost);
	
	$adoc = ADONewConnection($dbdriver);
	if ($driver == "ado_mssql")
	{
	  $connected = $adoc->Connect($host, $user, $pass);
	  $adoc->hasTop = "TOP";			  
	}else $connected = $adoc->PConnect($dbhost, $dbuser, $dbpass, $database); 				  		
	if (!$connected){
		error_log($adoc->ErrorMsg());
	}
	return $adoc;
}
function execute($sql, &$error) { 	
	$schema = db_Connect();
	$resultSet = $schema->execute($sql);
	$error = false;
	if (!$resultSet){
		error_log($schema->ErrorMsg());
		error_log($sql);
		echo "error::" . $schema->ErrorMsg();
		$error = true;
		return null;
	}else return $resultSet;
}	
$cmd = $_REQUEST["cmd"];
if ($cmd == "structure"){
	$schema = db_Connect();
	$tabel = $schema->MetaTables("TABLES",false);
	echo "{\"tables\" : [";
	for ($i = 0; $i <= count($tabel); $i++) {
		if ($tabel[$i] == "") continue;
		$rs = $schema->execute("DESCRIBE $tabel[$i]");
		if ($i > 0) echo ",";
		if ($rs){
			echo "{\"$tabel[$i]\" : [";
			$first = true;
			while ($line = $rs->FetchNextObject(true)){			
				if (!$first) echo ",";					
				echo"{\"Field\": \"$line->FIELD\", \"Type\" : \"$line->TYPE\",\"Null\":\"$line->NULL\",\"Key\":\"$line->KEY\",\"Default\":\"$line->DEFAULT\"}";
				$first = false;
			}
			echo "]}";
		}
	}
	echo "]}";		
	echo "";
}else if ($cmd == "alter"){	
	try{
		$schema = db_Connect();
		$sql = urldecode($_REQUEST["sql"]);				
		//$sql = str_replace("\\'", "'", $sql);
		$sql = explode("\n",$sql);			
		foreach($sql as $key => $value){						
			if ($value != "" && strpos($value,"delete") !==-1){
				$ok = $schema->execute($value);
				if (!$ok) {
					error_log($value);
					throw new Exception($schema->ErrorMsg());
				}
			}
		}
		echo "alter table sukses";
	}catch(Exception $e){
		echo "error:" . $e->getMessage() ."\r\n" .$value;
	}
}else if ($cmd == "select"){
	$schema = db_Connect();
	$sql = urldecode($_REQUEST["sql"]);				
	$sql = explode("\n",$sql);			
	$res = "{";
	$i = 0;
	foreach($sql as $key => $value){						
		if (strpos($value,"delete") !==-1){
			$ok = $schema->execute($value);
			if (!$ok) {
				error_log($value);
				throw new Exception($schema->ErrorMsg());
			}else{				
				if ($key >0 ) $res .= ",";
				$first = true;
				$result = "{ \"rs\" : {";
				$result .= "\"rows\": [";
				$values = "";
				$fields = " \"fields\" : {";		
				$resultSet = $ok;
				if (gettype($resultSet) != "string"){
					try{
						while (!$resultSet->EOF)
						{			
							if (!$first) { $values .= ",";}		
							$values .= "{";			
							for ($i = 0; $i < $resultSet->FieldCount(); $i++)
							{		
								if ($i > 0) {$values .= ","; if ($first) $fields .= ",";}						
								if ($resultSet->FetchField($i)->type == "text" || $resultSet->FetchField($i)->type == "blob"){
									$value = addslashes($resultSet->fields[$i]);
									$value = str_replace("\n","",$value);
									$values .=  " \"". $resultSet->FetchField($i)->name ."\":\"" . $value ."\"";																				
								}else		
									$values .=  " \"". $resultSet->FetchField($i)->name ."\":\"" . $resultSet->fields[$i]."\"";																				
								if ($first){					
									if ($resultSet->FetchField($i)->type == "N" || $resultSet->FetchField($i)->type == "real")
										$length = 100;
									else{
										$length = $resultSet->FetchField($i)->max_length * 6;
										if ($length > 250) $length = 250;					
									}
									$fields .= " \"". $resultSet->FetchField($i)->name ."\" : {";
									$fields .= " \"type\" : \"" . $resultSet->FetchField($i)->type ."\"";	
									$fields .= ",";
									$fields .= " \"length\" : " . $length;	
									$fields .= "}";
								}
							}								
							$values .= "}"; 							
							$first = false;
							$resultSet->MoveNext();
						}			
					}catch(Exception $e){
						error_log($e->getMessage());
					}
				}else {
					$values .= "{\"msg\" : \"". $resultSet."\"}";			
				}
				$fields .= "}";	
				$result .= $values;
				$result .= "] ";
				$result .= "," . $fields;
				$result .= "} }";										
				
				$res .= "\"table$key\" :" . $result;
			}
		}
	}
	$res .= "}";
	echo $res;
}else if ($cmd == "insert"){
	try{
		$schema = db_Connect();
		$sql = urldecode($_REQUEST["sql"]);				
		//$sql = str_replace("\\'", "'", $sql);
		$sql = explode("\n",$sql);			
		foreach($sql as $key => $value){						
			if (strpos($value,"delete") !==-1){
				$ok = $schema->execute($value);
				if (!$ok) {
					error_log($value);
					throw new Exception($schema->ErrorMsg());
				}
			}
		}
		echo "alter table sukses";
	}catch(Exception $e){
		echo "error:" . $e->getMessage() ."\r\n" .$value;
	}
}
echo $res;
	
ob_end_flush();
?>
