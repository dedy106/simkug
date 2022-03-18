<?php
/////////////////////
//Fandi Nov 19, 2009
//////////////////////////

ob_start();
include_once("../server/server/conf/dbSetting.php");
include_once("config.php");
include_once("includes/libadmin.php");

$backupFile = $location . "-" . $database . "-" . date("Y-m-d.H-i-s") . '.gz';
$command = "mysqldump --opt -h $dbhost -u $dbuser $database | gzip > backup/$backupFile";
system($command);runCommand($command, $path = null);

echo "Ip anda :". $_SERVER["REMOTE_ADDR"]. "<br>";
echo "Telah selesai mem-backup database ". $database  ." di ".  $dbhost . "<br>";
echo "Silahkan mengunduh file di : " . $http ."/admin/backup/".  $backupFile . "<br>" ;
//echo  $HTTP_SERVER_VARS['SERVER_ADDR'] . "<br>";
//echo  $_server['server_ADDR']  . "<br>";
ob_end_flush();
?>
