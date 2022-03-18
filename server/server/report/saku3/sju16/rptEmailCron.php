<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

/*

		global $dbLib;
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"serverApp.php"))."media/";		
		$tmp=explode("/",$this->filter2);
		$kode_pic=$tmp[0];
		$mail = new server_util_mail();
		$AddOnLib=new server_util_AddOnLib();
		$tgl = date('Y/m/d');
*/
		$sql="select b.email,a.kode_pic,b.nama
from (select a.kode_pic,a.kode_lokasi
from sju_polis_m a 					 
inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
where a.kode_lokasi='11' 
group by a.kode_pic,a.kode_lokasi
	)a
inner join sju_pic b on a.kode_pic=b.kode_pic and a.kode_lokasi=b.kode_lokasi
order by a.kode_pic";
		echo $sql;
		
	
?>
  
