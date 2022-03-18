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

echo "Transfer Data". "<br>";
$kode_lokasi="04";
$kode_fs="FS1";

$time_start = microtime_float();
$sql4="select kode_klpakun from fa_klpakun where kode_lokasi='04'";
$rs4 = execute($sql4,$error);
$j=1;
while ($row4 = $rs4->FetchNextObject($toupper=false))
{
	$sql="select a.no_bukti,a.no_dokumen,a.kode_lokasi, a.kode_pp, a.kode_akun, b.umur, b.persen, b.akun_bp,b.akun_deprs,a.keterangan, round(a.nilai,0) as nilai,
   a.kode_drk,a.tanggal as tanggal, a.periode,
   case when a.periode>='200911' then a.no_dokumen else a.no_bukti end as no_baps,
   case when datediff(mm,a.tanggal,'2011-04-01')<=b.umur then '201103' else '201012' end as periode_susut,
   round((a.nilai/b.umur),0) as nilai_susut,
   case when datediff(mm,a.tanggal,'2011-04-01')<=b.umur then datediff(mm,a.tanggal,'2011-04-01') else b.umur end as umur_susut,
   round((a.nilai/b.umur),0)*(case when datediff(mm,a.tanggal,'2011-04-01')<=b.umur then datediff(mm,a.tanggal,'2011-04-01') else b.umur end) as nilai_ap
from gldt_h a
inner join fa_klpakun b on a.kode_akun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
where a.kode_akun='$row4->kode_klpakun' and a.kode_lokasi='04' and a.dc='D' 
order by periode,tanggal ";
	$rs = execute($sql,$error);
	while ($row = $rs->FetchNextObject($toupper=false))
	{
		$sql2="";
		$no_fa="04-AS".substr($row->periode,2,2).substr($row->periode,4,2).".".str_pad($j, 4, "0", STR_PAD_LEFT);
		$sql2="insert into fa_asset(no_fa, barcode, kode_lokasi, kode_pp, kode_klpfa, kode_klpakun, kode_lokfa, nik_pnj, kode_brg, umur, persen, nama, kode_curr, kurs, nilai, nilai_residu, kode_drk, catatan, progress, tgl_perolehan, periode, tgl_susut, periode_susut, nik_user, tgl_input, merk, tipe, no_seri, kode_status, kode_akun, jenis, no_baps, tgl_baps,kode_pp_susut) ".
		$sql2.="values('$no_fa','-','$row->kode_lokasi','$row->kode_pp','$row->kode_akun','$row->kode_akun','$row->kode_lokasi','-','$row->kode_akun',$row->umur,$row->persen,'$row->keterangan','IDR',1,$row->nilai,1,'-','-','1','$row->tanggal','$row->periode','$row->tanggal','$row->periode_susut','kopeg','$row->poltek','-','-','-','S01','$row->kode_akun','ASSET','$row->no_baps','$row->tanggal','$row->kode_pp'); ";
		//echo $sql2."<br>";
		$rs2 = execute($sql2,$error);
		$j=$j+1;
			
			/*
			$no=substr($row->periode,5,2);
			$no_fasusut="02-SST".substr($periode,2,2).substr($periode,4,2);
			$sql3="";
			$sql3="insert into fasusut_d(no_fasusut, no_fa, periode, nilai, kode_lokasi, akun_bp, akun_ap, kode_akun, kode_pp, kode_drk, dc, no_del) ".
			$sql3.="values('$no_fasusut','$no_fa','201002',$row->nilai_ap,'$row->kode_lokasi','$row->akun_bp','$row->akun_deprs','$row->kode_akun','$row->kode_pp','$row->kode_drk','D','-'); ";
			//$sql3.="<br>";
			echo $sql3;
			$rs3 = execute($sql3,$error);
			
		for ($k =0 ; $k < $row->umur_susut; $k++) 
		{
			$no_fasusut="04-SST".substr($row->periode,2,2).substr($row->periode,4,2).".".str_pad(1, 4, "0", STR_PAD_LEFT);
			$sql3="";
			$sql3="insert into fasusut_d(no_fasusut, no_fa, periode, nilai, kode_lokasi, akun_bp, akun_ap, kode_akun, kode_pp, kode_drk, dc, no_del) ".
			$sql3.="values('$no_fasusut','$no_fa',period_add('$row->periode',$k),$row->nilai_susut,'$row->kode_lokasi','$row->akun_bp','$row->akun_deprs','$row->kode_akun','$row->kode_pp','$row->kode_drk','D','-'); ";
			//$sql3.="<br>";
			//echo $sql3;
			$rs3 = execute($sql3,$error);
			//echo $sql3,"<br>";
		}	*/
	}
}
$time_end = microtime_float();
$time1 = $time_end - $time_start;
echo "Transfer asset : $j ".number_format($time1,4,".",",")." detik <br>";

ob_end_flush();
?>