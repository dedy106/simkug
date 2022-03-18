<?php
$cmd = $_REQUEST["cmd"];
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
	}else 			
	  $connected = $adoc->PConnect($dbhost, $dbuser, $dbpass, $database); 				  		
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
function nobuktiOtomatis(){
	$rs = execute("select max(kode_lokasi) as kode_lokasi from off_lokasi",$error);
	if ($rs){
		if ($line = $rs->FetchNextObject(false)){
			$no = intval($line->kode_lokasi);
			$no++;
			$no = strval($no);
			$ret= $no;
			for ($i = 1;$i <= (5 - strlen($no));$i++){
				$ret = "0" . $ret;
			}
			return $ret;
		}else return "00001";
	}
}
switch ($cmd){
	case "register":
		$office = $_REQUEST["office"];
		$pwd = "a";
		$uname = $_REQUEST["uname"];
		$email = $_REQUEST["email"];		
		$addr = $_REQUEST["addr"];		
		$rs = execute("select nama from off_user where email = '$email' ", $error);
		if(!$error){
			if ($rs->EOF){							
				$kode = nobuktiOtomatis();
				execute("insert into off_user (email, nama, pwd, kode_lokasi)values('$email','$uname','$pwd','$kode')",$error);	
				if ($error) echo "error: insert into sysuser";				
				execute("insert into off_lokasi (kode_lokasi, nama,alamat, no_telp,kode_pos, logo)values('$kode','$office','$addr','-','-','-')",$error);				
				if ($error) echo "error lokasi::";
				else  echo "Thank you...$email";
			}else echo "error :: $email is exists, try another id";
		}else echo "error :: sql ";
	break;
	case "login":
		$office = $_REQUEST["office"];
		$pwd = $_REQUEST["pwd"];		
		$email = $_REQUEST["email"];				
		$rs = execute("select nama from off_user where email = '$email' and kode_lokasi = '$office' and pwd = '$pwd' ", $error);
		if(!$error){
			if ($rs){							
				echo "login:$email ";
			}else echo "error :: $email is exists, try another id";
		}else echo "error :: sql ";
	break;

	case "getOffice":
		$rs = execute("select kode_lokasi, nama from off_lokasi ", $error);
		if(!$error){
			if ($rs){
				$res = "{[";
				$i = 0;
				while ($line = $rs->FetchNextObject($toupper=false)){
					if ($i > 0) $res .= ",";
					$res .= "{kode:\"$line->kode_lokasi\",nama: \"$line->nama\"}";
					$i++;
				}
				$res .= "]}";
				echo $res;
			}
		}		
	break;
}
?>