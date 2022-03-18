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
$sql="delete from xsdm";
$rs = execute($sql,$error);
$sql="insert into xsdm
select c.nik,a.kode_param,a.jns_periode,isnull(
case 
when substring(jns_periode,1,1)='A' then 4 
when substring(jns_periode,1,1)='B' then 2
when substring(jns_periode,1,1)='C' then 12
end,0) as jml,
case when c.status_org in ('5','6','8') then a.flag
     when c.status_org in ('7','9') then a.flag2 end as jenis_agg,
case 
when (c.status_org = '8' and a.kode_pp<>'X')      then a.kode_pp 
when (c.status_org = '8' and a.kode_pp='X')       then c.kode_lokasi+'3000' 
when (c.status_org = '9' and a.kode_pp2<>'X')     then a.kode_pp2 
when (c.status_org = '9' and a.kode_pp2='X')      then c.kode_lokasi+'3000' 
when (c.status_org = '7' and a.kode_pp3<>'X')     then a.kode_pp3 
when (c.status_org = '7' and a.kode_pp3='X')      then c.kode_lokasi+'1000'
when (c.status_org = '6' and a.kode_pp4<>'X')     then a.kode_pp4 
when (c.status_org = '6' and a.kode_pp4='X')      then c.kode_lokasi+'3000' 
when (c.status_org = '5' and a.kode_pp5='993100') then a.kode_pp5 
when (c.status_org = '5' and a.kode_pp5='X')      then c.kode_lokasi+'3000' 
when (c.status_org = '5' and a.kode_pp5='Y')      then c.kode_lokasi+'1000' 
end as kode_pp, 
e.idx,
case 
when (c.status_org = '8') then a.kode_rka   
when (c.status_org = '9') then a.kode_rka2  
when (c.status_org = '7') then a.kode_rka3  
when (c.status_org = '6') then a.kode_rka4  
when (c.status_org = '5') then a.kode_rka5  
end as kode_rka,  
case 
when (c.status_org = '8') then a.kode_akun  
when (c.status_org = '9') then a.kode_akun2 
when (c.status_org = '7') then a.kode_akun3 
when (c.status_org = '6') then a.kode_akun4 
when (c.status_org = '5') then a.kode_akun5 
end as kode_akun, 
-- di case sesuaikan rumusan
isnull(d.nilai,0) as retensi,isnull(
case when a.kode_param='GDAS' then b.nilai
     when a.kode_param='TPOS' then b.nilai
     when a.kode_param='TDAS' then (case when c.status_org in ('7','9') then round(b.nilai * e.idx/100,0) else b.nilai end)
     when a.kode_param='TCUTI' then b.nilai
     when a.kode_param='BP' then b.nilai
     when a.kode_param='PA' then b.nilai
     when a.kode_param='JKSP' then b.nilai
     when a.kode_param='SAKP' then b.nilai
     when a.kode_param='TKSJ' then b.nilai
     when a.kode_param='TFAS' then b.nilai
     when a.kode_param='PKER' then b.nilai
     when a.kode_param='PKSR' then b.nilai
     when a.kode_param='LKBM' then b.nilai
     when a.kode_param='TLKBM' then b.nilai
     when a.kode_param='PLTH' then b.nilai
     when a.kode_param='SMNR' then b.nilai
     when a.kode_param='IBOH' then b.nilai
     when a.kode_param='RKR'  then b.nilai
     when a.kode_param='JPKTP'  then b.nilai
     when a.kode_param='JPKTK'  then b.nilai
     when a.kode_param='JPKTK1' then b.nilai
     when a.kode_param='SF'     then b.nilai
     when a.kode_param='SFP'    then b.nilai
     when a.kode_param='FKES'   then b.nilai
     when a.kode_param='THT'    then b.nilai
     when a.kode_param='UL'    then b.nilai
     when a.kode_param='UML'   then b.nilai
end,0) as nilai,
'BGAJI',

case 
when (c.status_org = '8' and a.kode_pp<>'X')      then substring(a.kode_pp,1,2) 
when (c.status_org = '8' and a.kode_pp='X')       then c.kode_lokasi
when (c.status_org = '9' and a.kode_pp2<>'X')     then substring(a.kode_pp2,1,2)
when (c.status_org = '9' and a.kode_pp2='X')      then c.kode_lokasi
when (c.status_org = '7' and a.kode_pp3<>'X')     then substring(a.kode_pp3,1,2)
when (c.status_org = '7' and a.kode_pp3='X')      then c.kode_lokasi
when (c.status_org = '6' and a.kode_pp4<>'X')     then substring(a.kode_pp4,1,2)
when (c.status_org = '6' and a.kode_pp4='X')      then c.kode_lokasi 
when (c.status_org = '5' and a.kode_pp5='993100') then substring(a.kode_pp5,1,2)
when (c.status_org = '5' and a.kode_pp5='X')      then c.kode_lokasi
when (c.status_org = '5' and a.kode_pp5='Y')      then c.kode_lokasi
end as kode_lokasi, 

'2011' as tahun
from agg_param a 
     inner join agg_norma_fix b on a.kode_param=b.kode_param and a.tahun=b.tahun
     inner join agg_karyawan c on c.kode_band=b.kode_band and b.tahun=c.tahun
     inner join agg_kota e on c.kode_kota=e.kode_kota 
     left join agg_gaji_custom d on c.nik=d.nik and c.tahun=d.tahun and d.kode_param='tret'
where a.jenis = 'PDPT' 
order by c.nik,a.no_urut" ;
$rs = execute($sql,$error);

echo "Proses Berhasil";
ob_end_flush();
?>