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
function microtime_float()
{
    list($usec, $sec) = explode(" ", microtime());
    return ((float)$usec + (float)$sec);
}

echo "Penyusutan Data". "<br>";
$kode_lokasi="01";
$kode_fs="FS1";
$tahun="2011";
$time_start = microtime_float();
$sql="select a.no_fa, a.periode, round(a.nilai/a.umur,0) as nilai_susut, a.kode_lokasi, 
	  CONVERT(varchar, a.tgl_perolehan, 120) as tgl,
      b.akun_bp, b.akun_deprs, a.kode_akun, a.kode_pp, a.kode_drk, 'D' as dc,
      case when datediff(month,tgl_perolehan,'2012-01-30') > a.umur then a.umur else datediff(month,tgl_perolehan,'2012-01-30') end as umur_susut,
	  substring(a.periode,1,4) as tahun,substring(a.periode,5,2) as bln   
from fa_asset a
inner join fa_klpakun b on a.kode_akun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='01' and a.nilai>0 and a.kode_klpakun<>'1211' 
 ";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$tahun=$row->tahun;
	$bulan=$row->bln;
	$j=0;
	for ($i =1 ; $i <= $row->umur_susut; $i++) 
	{
		$no_fasusut="04-SST".substr($row->periode,2,2).substr($row->periode,4,2).".".str_pad(1, 4, "0", STR_PAD_LEFT);
		$tmp=$bulan+$j;
		$periode=$tahun.str_pad(strval($tmp),2, "0", STR_PAD_LEFT);
		if ($tmp>=12)
		{
			$bulan=1;
			$tahun=$tahun+1;
			$j=0;
		}
		else
		{
			$j=$j+1;
		}
		
		$sql3="insert into fasusut_d(no_fasusut, no_fa, periode, nilai, kode_lokasi, akun_bp, akun_ap, kode_akun, kode_pp, kode_drk, dc, no_del) 
			   values('$no_fasusut','$row->no_fa','$periode',$row->nilai_susut,'$row->kode_lokasi','$row->akun_bp','$row->akun_deprs','$row->kode_akun','$row->kode_pp','$row->kode_drk','D','-'); ";
		$rs3 = execute($sql3,$error);
		echo $error;
	}	
}
$time_end = microtime_float();
$time1 = $time_end - $time_start;
echo "Transfer asset $tahun : $j ".number_format($time1,4,".",",")." detik <br>";

ob_end_flush();
?>