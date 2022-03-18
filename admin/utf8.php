<?php
ob_start();
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
function db_Connect() { 		
    global $dbhost;
    global $dbuser;
    global $dbpass;
    global $database;
    global $dbdriver;
	$adoc = ADONewConnection($dbdriver);
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
// Upload Absensi 
global $database;
echo "Mulai Alter database to UTF8". "<br>";
$sql="ALTER DATABASE `".$database ."` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;";
echo $sql;
$rs = execute($sql,$error);
echo "Selesai Alter database to UTF8". "<br>";
$sql="show tables";
$rs = execute($sql,$error);
echo "Mulai Alter table to UTF8 dan InnoDB". "<br>";
while ($row = $rs->FetchNextObject($toupper=false))
{
    echo "\$ret1 = \$row->Tables_in_$database!=\"gldt_h\";<br>";
    echo "\$ret2 = \$row->Tables_in_$database != '';";
    eval("\$ret1 = \$row->Tables_in_$database!=\"gldt_h\";");
    eval("\$ret2 = \$row->Tables_in_$database != '';");
    if ($ret1 && $ret2)
	{
	eval("\$field = \$row->Tables_in_". $database.";");   
	echo "alter table `$field`"."<br>";
	$sql2="ALTER TABLE `$field`  DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci ENGINE=innoDB;";
	$rs1 = execute($sql2,$error);
	$rs2 = execute("DESCRIBE `$field`",$error);
	$sqlColumn = "ALTER TABLE `$field`  ";
	$first = true;
	echo "alter column `$row->Tables_in_$database`";
	while ($line = $rs2->FetchNextObject(true))
	{
		if (strpos($line->TYPE,"varchar") > -1){
			if (!$first) $sqlColumn .= ",";
			$sqlColumn .= " MODIFY $line->FIELD $line->TYPE CHARACTER SET utf8 COLLATE utf8_general_ci"; 
			$first = false;
		}
	}
	execute($sqlColumn,$error);
	}
}
echo "Selesai Alter table to UTF8 dan InnoDB". "<br>";
ob_end_flush();
?>
