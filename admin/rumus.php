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

$sql1="delete from agg_gaji_d where kode_param='THR'";
$rs = execute($sql1,$error);
$sql="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi)
select 'GAJI2011',substring(a.kode_pp,1,2) as kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode,isnull(b.thr,0) as thr, 
    a.jenis_agg,a.kode_pp,'T',a.tahun, a.kode_akun, a.kode_rka,0	
from xsdm a
left join (select nik,sum(case when kode_param in ('GDAS','TPOS','TDAS','TRET') then nilai else 0 end)*1.5 as thr
           from xsdm
	   group by nik) b on a.nik=b.nik
where a.kode_param='THR'";
$rs = execute($sql,$error);

$sql1="delete from agg_gaji_d where kode_param='PSG'";
$rs1 = execute($sql1,$error);
$sql="select 'GAJI2011' as bukti,substring(a.kode_pp,1,2) as kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode as periode,isnull(b.psg,0) as psg, 
    a.jenis_agg,a.kode_pp,'T' as posted ,a.tahun, a.kode_akun, a.kode_rka,a.retensi 
from xsdm a 
left join (select a.nik,sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('5','7','9') then a.nilai else 0 end)*2/12 as psg 
           from xsdm a  
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik 
where a.kode_param='PSG' ";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$nilai=$row->psg;
	$no=1;
	for ($x=0; $x <12 ; $x++)
	{
		$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
		//echo $sql2;
		$rs2 = execute($sql2,$error);
		$no=$no+1;
	}
}

$sql1="delete from agg_gaji_d where kode_param='CUTI'";
$rs = execute($sql1,$error);
$sql="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi)
select 'GAJI2011',substring(a.kode_pp,1,2) as kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode,isnull(b.cuti,0) as cuti, 
    a.jenis_agg,a.kode_pp,'T',a.tahun, a.kode_akun, a.kode_rka,0	
from xsdm a
left join (select nik,sum(case when kode_param in ('GDAS','TPOS','TDAS','TRET') then nilai else 0 end)*1.5 as cuti
           from xsdm
	   group by nik) b on a.nik=b.nik
where a.kode_param='CUTI'";
$rs = execute($sql,$error);

$sql1="delete from agg_gaji_d where kode_param='BAS'";
$rs = execute($sql1,$error);
$sql="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi)
select 'GAJI2011',substring(a.kode_pp,1,2) as kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode,isnull(b.bas,0) as bas, 
    a.jenis_agg,a.kode_pp,'T',a.tahun, a.kode_akun, a.kode_rka,0	
from xsdm a
left join (select nik,sum(case when kode_param in ('GDAS','TPOS','TDAS','TRET') then nilai else 0 end)*1.25 as bas
           from xsdm
	   group by nik) b on a.nik=b.nik
where a.kode_param='BAS'";
$rs = execute($sql,$error);

$sql1="delete from agg_gaji_d where kode_param='JMS'";
$rs1 = execute($sql1,$error);
$sql="select 'GAJI2011' as bukti,substring(a.kode_pp,1,2) as kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode as periode,
    case when c.status_org in ('7','9') then isnull(b.jms9,0) else isnull(b.jms8,0) end as jms, 
    a.jenis_agg,a.kode_pp,'T' as posted ,a.tahun, a.kode_akun, a.kode_rka,a.retensi 
from xsdm a 
left join (select a.nik,sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*0.1024 as jms9,
					sum(case when a.kode_param in ('GDAS') and b.status_org in ('5','6','8') then a.nilai*0.0654*100/180 else 0 end) as jms8
           from xsdm a  
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik	   
where a.kode_param='JMS' ";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$nilai=$row->jms;
	$no=1;
	for ($x=0; $x <12 ; $x++)
	{
		$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
		//echo $sql2;
		$rs2 = execute($sql2,$error);
		$no=$no+1;
	}
}

$sql1="delete from agg_gaji_d where kode_param='IDP'";
$rs1 = execute($sql1,$error);
$sql="select 'GAJI2011' as bukti,a.kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode as periode,
    case when c.status_org in ('5','6','8') then isnull(b.idp,0) else 0 end as idp, 
    a.jenis_agg,a.kode_pp,'T' as posted ,a.tahun, a.kode_akun, a.kode_rka,a.retensi 
from xsdm a 
left join (select a.nik,sum(case when a.kode_param in ('GDAS') and b.status_org in ('5','6','8') then a.nilai else 0 end)*0.057 as idp
           from xsdm a  
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik	   
where a.kode_param='IDP' ";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$nilai=$row->idp;
	$no=1;
	for ($x=0; $x <12 ; $x++)
	{
		$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
		//echo $sql2;
		$rs2 = execute($sql2,$error);
		$no=$no+1;
	}
}

$sql1="delete from agg_gaji_d where kode_param='DPLK'";
$rs = execute($sql1,$error);
$sql="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi)
select 'GAJI2011',a.kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode,
  case when c.status_org in ('5','6','8') then isnull(b.dplk,0) else 0 end as dplk, 
    a.jenis_agg,a.kode_pp,'T',a.tahun, a.kode_akun, a.kode_rka,0	
from xsdm a
left join (select a.nik,sum(case when a.kode_param in ('GDAS') and b.status_org in ('5','6','8') then a.nilai else 0 end)*0.7814 as dplk
           from xsdm a
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik
where a.kode_param='DPLK'";
$rs = execute($sql,$error);

$sql1="delete from agg_gaji_d where kode_param='INS'";
$rs1 = execute($sql1,$error);
$sql="select 'GAJI2011' as bukti,a.kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode as periode,
    case when c.status_org in ('5','6','8') then isnull(b.ins8,0) else isnull(b.ins9,0) end as ins, 
    a.jenis_agg,a.kode_pp,'T' as posted ,a.tahun, a.kode_akun, a.kode_rka,a.retensi 
from xsdm a 
left join (select a.nik,sum(case when a.kode_param in ('GDAS','TPOS','TDAS') and b.status_org in ('5','6','8') then a.nilai else 0 end)*5.25/12 as ins8,
		sum(case when a.kode_param in ('GDAS','TPOS','TDAS') and b.status_org in ('7','9') then a.nilai else 0 end) as ins9
           from xsdm a  
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik	   
where a.kode_param='INS'";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$nilai=$row->ins;
	$no=1;
	for ($x=0; $x <12 ; $x++)
	{
		$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
		//echo $sql2;
		$rs2 = execute($sql2,$error);
		$no=$no+1;
	}
}

$sql1="delete from agg_gaji_d where kode_param='JSPD'";
$rs = execute($sql1,$error);
$sql="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi)
select 'GAJI2011',a.kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode,
  case when c.status_org in ('5','6','8') then isnull(b.jspd,0) else 0 end as jspd, 
    a.jenis_agg,a.kode_pp,'T',a.tahun, a.kode_akun, a.kode_rka,0	
from xsdm a
left join (select a.nik,sum(case when a.kode_param in ('GDAS','TPOS','TDAS') and b.status_org in ('5','6','8') then a.nilai else 0 end)*2 as jspd
           from xsdm a
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik
where a.kode_param='JSPD'";
$rs = execute($sql,$error);

$sql1="delete from agg_gaji_d where kode_param='BNS'";
$rs = execute($sql1,$error);
$sql="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi)
select 'GAJI2011',a.kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode,
  case when c.status_org in ('5','6','8') then isnull(b.bns,0) else 0 end as bns, 
    a.jenis_agg,a.kode_pp,'T',a.tahun, a.kode_akun, a.kode_rka,0	
from xsdm a
left join (select a.nik,sum(case when a.kode_param in ('GDAS','TPOS','TDAS') and b.status_org in ('5','6','8') then a.nilai else 0 end)*2 as bns
           from xsdm a
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik
where a.kode_param='BNS'";
$rs = execute($sql,$error);

$sql1="delete from agg_gaji_d where kode_param='MF'";
$rs1 = execute($sql1,$error);
$sql="select 'GAJI2011' as bukti,a.kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode as periode,
    case when c.status_org in ('7','9') then isnull(b.mf,0) else 0 end as mf, 
    a.jenis_agg,a.kode_pp,'T' as posted ,a.tahun, a.kode_akun, a.kode_rka,a.retensi 
from xsdm a 
left join (select a.nik,(sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end) +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*3/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*2/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*1.25/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*0.1024 +
	sum(case when a.kode_param in ('PKER') and b.status_org in ('7','9') then a.nilai else 0 end)/12)*0.1 as mf
           from xsdm a  
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik	   
where a.kode_param='MF'";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$nilai=$row->mf;
	$no=1;
	for ($x=0; $x <12 ; $x++)
	{
		$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
		//echo $sql2;
		$rs2 = execute($sql2,$error);
		$no=$no+1;
	}
}

$sql1="delete from agg_gaji_d where kode_param='PPN'";
$rs1 = execute($sql1,$error);
$sql="
select 'GAJI2011' as bukti,a.kode_lokasi,a.nik,a.kode_param,'2011'+a.jns_periode as periode,
    case when c.status_org in ('7','9') then isnull(b.ppn,0) else 0 end as ppn, 
    a.jenis_agg,a.kode_pp,'T' as posted ,a.tahun, a.kode_akun, a.kode_rka,a.retensi 
from xsdm a 
left join (select a.nik,(((sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end) +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*3/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*2/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*1.25/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*0.1024 +
	sum(case when a.kode_param in ('PKER') and b.status_org in ('7','9') then a.nilai else 0 end)/12)*0.1) +
	(sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end) +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*3/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*2/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*1.25/12 +
	sum(case when a.kode_param in ('GDAS','TPOS','TDAS','TRET') and b.status_org in ('7','9') then a.nilai else 0 end)*0.1024 +
	sum(case when a.kode_param in ('PKER') and b.status_org in ('7','9') then a.nilai else 0 end)/12))*0.1 as ppn
           from xsdm a  
	   inner join agg_karyawan b on a.nik=b.nik 
	   group by a.nik) b on a.nik=b.nik
inner join agg_karyawan c on a.nik=c.nik	   
where a.kode_param='PPN'";
$rs = execute($sql,$error);
while ($row = $rs->FetchNextObject($toupper=false))
{
	$nilai=$row->ppn;
	$no=1;
	for ($x=0; $x <12 ; $x++)
	{
		$periode='2011'.str_pad($no, 2, "0", STR_PAD_LEFT);
		$sql2="insert into agg_gaji_d(no_gaji, kode_lokasi, nik, kode_param, periode, nilai, jenis_agg, kode_pp, posted, tahun, kode_akun, kode_rka, retensi) ";
		$sql2.="values('GAJI2011','$row->kode_lokasi','$row->nik','$row->kode_param','$periode',$nilai,'$row->jenis_agg','$row->kode_pp','T','$row->tahun','$row->kode_akun','$row->kode_rka',$row->retensi);";
		//echo $sql2;
		$rs2 = execute($sql2,$error);
		$no=$no+1;
	}
}

$sql="update a set kode_pp='994000' from agg_gaji_d a inner join agg_karyawan b on a.nik=b.nik and a.tahun=b.tahun where b.kode_pp like '994%' ";
$rs = execute($sql,$error);

$sql="delete from agg_d where modul='BGAJI'";
$rs = execute($sql,$error);
$sql="insert into agg_d (kode_lokasi,kode_pk,kode_drk,kode_rka,kode_akun,kode_pp,periode,bulan,jumlah,volume,nilai,tahun,no_bukti,modul,keterangan,progress,jenis_agg) 
select substring(a.kode_pp,1,2) as kode_lokasi,substring(a.kode_rka,1,7) as kode_pk,substring(a.kode_rka,1,9) as kode_drk,a.kode_rka,a.kode_akun,a.kode_pp,a.periode,
       substring(a.periode,5,2) as bulan,1 as jumlah,1 as volume,a.nilai,a.tahun,a.no_gaji as no_bukti,'BGAJI' as modul,b.nama as keterangan,'0' as progress,jenis_agg
from agg_gaji_d a
inner join agg_rka b on a.kode_rka=b.kode_rka";
$rs = execute($sql,$error);

//echo "Proses Berhasil";
ob_end_flush();
?>