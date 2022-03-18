<?
include_once("../admin/config.php");
include_once("../admin/includes/libadmin.php");
$command = "svn update $pathsys";
runCommand($command, $path = null);
echo "Update aplikasi selesai <br>";
?>
