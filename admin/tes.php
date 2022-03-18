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

$time_start = microtime_float();

$sql = "select a.kode_akun,a.nama,a.kode_lokasi,'200901' as periode,ifnull(b.so_awal,0)+ifnull(c.so_awal_mutasi,0) as so_awal,
       d.no_bukti,d.no_dokumen,date_format(d.tanggal,'%d/%m/%Y') as tanggal,d.keterangan,d.kode_pp,d.kode_drk,d.debet,d.kredit
from masakun a
left join (select kode_akun,so_akhir as so_awal
           from glma
           where (kode_akun between '1111' and '11511') and kode_lokasi='02' and substring(periode,1,4)=substring('200901',1,4) and periode='200901'
           ) b on a.kode_akun=b.kode_akun
left join (select kode_akun,sum(case when dc='D' then nilai else -nilai end) so_awal_mutasi
           from gldt_h
           where kode_lokasi='02' and (kode_akun between '1111' and '11511') and substring(periode,1,4)=substring('200901',1,4) and periode<'200901' 
           group by kode_akun
           ) c on a.kode_akun=c.kode_akun
left join (select kode_akun,no_bukti,no_dokumen,tanggal,keterangan,kode_pp,kode_drk,
                  case when dc='D' then nilai else 0 end as debet,case when dc='C' then nilai else 0 end as kredit
           from gldt_h
           where kode_lokasi='02' and (periode between '200901' and '200910') and (kode_akun between '1111' and '11511')
           ) d on a.kode_akun=d.kode_akun
where a.kode_lokasi='02' and (a.kode_akun between '1111' and '11511')
order by a.kode_akun,d.tanggal";	
$rs = execute($sql,$error);
$tmp="";
while ($row = $rs->FetchNextObject($toupper=false))
{
    if ($tmp!=$row->kode_akun)
	{
		$tmp=$row->kode_akun;
	$html.="<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
  <tr>
    <td height='23' colspan='9' class='header_laporan'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='100' class='header_laporan'>Periode </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Akun  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama Akun </td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kode Lokasi </td>
        <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td>
    <td class='header_laporan'><div align='right'>".number_format($row->so_awal,0,',','.')."</div></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>
	<td width='74' height='23' class='header_laporan'><div align='center'>No Dokumen</div></td>
    <td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
    <td width='50' class='header_laporan'><div align='center'>Kode RKM</div></td>
    <td width='90' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
    <td width='90' class='header_laporan'><div align='center'>Balance</div></td>
  </tr>";}
			
				$saldo=$saldo + $row->debet - $row->kredit;	
				$debet=$debet+$row->debet;
				$kredit=$kredit+$row->kredit;	
				$html.="<tr>
    <td valign='top' class='isi_laporan'>".$row->no_bukti."</td>
	<td valign='top' class='isi_laporan'>".$row->no_dokumen."</td>
    <td height='20' valign='top' class='isi_laporan'>".$row->tanggal."</td>
    <td valign='top' class='isi_laporan'>".ucwords(strtolower($row->keterangan))."</td>
    <td valign='top' class='isi_laporan'>".$row->kode_pp."</td>
    <td valign='top' class='isi_laporan'>".$row->kode_drk."</td>
    <td valign='top' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($row->kredit,0,',','.')."</div></td>
    <td valign='top' class='isi_laporan'><div align='right'>".number_format($saldo,0,',','.')."</div></td>
  </tr>";
}

$time_end = microtime_float();
$time1 = $time_end - $time_start;
echo "Proses Selesai ".number_format($time1,4,".",",")." detik <br>";
echo $html;
ob_end_flush();

?>