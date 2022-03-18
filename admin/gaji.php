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
//insert data param nilai
$sql="delete from agg_gaji_d" ;
$rs = execute($sql,$error);

$sql="select * from xsdm where nilai<>0 " ;
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$nilai=$row->nilai;
	if ($row->jml==0)
	{
		$periode='2011'.$row->jns_periode;
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
		echo $sql2;
		$rs2 = execute($sql2,$error);
	}
	if ($row->jml==4)
	{
		$no=1;
		for ($x=0; $x <$row->jml ; $x++)
		{
			$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
			$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
			$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
			//echo $sql2;
			$rs2 = execute($sql2,$error);
			$no=$no+3;
		}
	}
	if ($row->jml==6)
	{
		$no=1;
		for ($x=0; $x <$row->jml ; $x++)
		{
			$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
			$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
			$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
			//echo $sql2;
			$rs2 = execute($sql2,$error);
			$no=$no+6;
		}
	}
	if ($row->jml==12)
	{
		$no=1;
		for ($x=0; $x <$row->jml ; $x++)
		{
			$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
			$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
			$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
			//echo $sql2;
			$rs2 = execute($sql2,$error);
			$no=$no+1;
		}
	}
}
//insert data param retensi
$sql="select a.*,b.kode_pp,case 
when (b.status_org = '9') then c.kode_rka2  
when (b.status_org = '7') then c.kode_rka3  
end as kode_rka,  
case 
when (b.status_org = '9') then c.kode_akun2 
when (b.status_org = '7') then c.kode_akun3 
end as kode_akun,
case 
when (b.status_org = '9' and c.kode_pp2<>'X')     then c.kode_pp2 
when (b.status_org = '9' and c.kode_pp2='X')      then a.kode_lokasi+'3000' 
when (b.status_org = '7' and c.kode_pp3<>'X')     then c.kode_pp3 
when (b.status_org = '7' and c.kode_pp3='X')      then a.kode_lokasi+'1000'
end as kode_pp  
from agg_gaji_custom a
inner join agg_karyawan b on a.nik=b.nik 
inner join agg_param c on a.kode_param=c.kode_param
where a.kode_param='TRET'" ;
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$no=1;
	for ($x=0; $x <12 ; $x++)
	{
		$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$row->nilai,'E','$row->kode_pp','T,'2011','$row->kode_akun','$row->kode_rka',$row->nilai);";
		//echo $sql2;
		$rs2 = execute($sql2,$error);
		$no=$no+1;
	}
}

//echo "Proses Berhasil";
ob_end_flush();
?>