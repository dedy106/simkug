<?php
try{
		/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
//----------------------------------------------------	
	
	
	$result = "";
	include("library.php");
    if (!defined('NEW_LINE'))
	   define("NEW_LINE", "<br>\r\n");
	
    define("WIN", "win");
    define("LINUX", "linux");

    // OS Base separator
    global $platform;
    global $dirSeparator;
    global $separator;
    global $serverDir;
    
    $serverDir = __FILE__;

    if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
    {
        $platform = WIN;
    	$dirSeparator = "\\";
        $separator = ";";
    }
    else
    {
        $platform = LINUX;
    	$dirSeparator = "/";
        $separator = ":";
    }

	global $rootDir;

	$pos = strrpos($serverDir, $dirSeparator);
	$serverDir = substr($serverDir, 0, $pos);
	$pos = strrpos($serverDir, $dirSeparator);
	$rootDir = substr($serverDir, 0, $pos);
	$pos = strrpos($rootDir, $dirSeparator);
	$path = $rootDir;
	$rootDir = substr($rootDir,$pos);
	
//----------------------------------
//-------------- error_log8

	ini_set('display_errors', 'Off');
	ini_set ('track_errors', 'On');	 
	ini_set ('max_execution_time', '3000');	 
	ini_set ('memory_limit', '1024M');
	ini_set ('log_errors',   'On');
	ini_set ('error_log',    $path .'/server/tmp/php_error.log');	
	//ini_set ('zlib.output_compression', 0);
	
	set_include_path(get_include_path() . PATH_SEPARATOR . $path ."/server");	
	
	//error_reporting (E_ALL & ~E_NOTICE & ~E_STRICT );	
	error_reporting (E_ALL & ~E_NOTICE & ~E_DEPRECATED & ~E_USER_DEPRECATED & ~E_STRICT & ~E_WARNING);
	
	error_reporting (E_ALL & ~E_NOTICE);
	uses("server_DBConnection_dbLib");
	uses("server_util_mail");
	
	$mail = new server_util_mail();
	$db = new server_DBConnection_dbLib("mssql");
	$sql="select hari from sju_hari ";
	$rs2 = $db->execute($sql);
	while ($row2 = $rs2->FetchNextObject($toupper=false))
	{
		$sql="select b.email,a.kode_pic,b.nama
	from (select a.kode_pic,a.kode_lokasi
	from sju_polis_m a 					 
	inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
	inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
	inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
	where a.kode_lokasi='11' and (a.tgl_selesai between getdate() and getdate()+$row2->hari)
	group by a.kode_pic,a.kode_lokasi
		)a
	inner join sju_pic b on a.kode_pic=b.kode_pic and a.kode_lokasi=b.kode_lokasi
	where b.email<>'-' 
	order by a.kode_pic";
		$rs1 = $db->execute($sql);
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
				
			$sql="select 'INPROG' as status,a.no_polis,a.no_dok,convert(varchar,a.tgl_mulai,103) as tgl_mulai,convert(varchar,a.tgl_selesai,103) as tgl_selesai,b.kode_cust+' - '+b.nama as cust,c.kode_vendor+' - '+c.nama as vendor,a.kode_curr,a.total, 
		a.n_premi,a.occup,a.objek,a.lokasi,a.cover,a.kode_curr,convert(varchar,getdate(),103) as tgl1,convert(varchar,getdate()+$row2->hari,103) as tgl2
		from sju_polis_m a 					 
		inner join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
		inner join sju_polis_vendor e on a.no_polis=e.no_polis and a.kode_lokasi=e.kode_lokasi and e.status='LEADER' 
		inner join sju_vendor c on c.kode_vendor = e.kode_vendor and e.kode_lokasi=c.kode_lokasi 
		left join sju_renew_d d on a.no_polis=d.no_polis and a.kode_lokasi=d.kode_lokasi 
		where a.kode_lokasi='11' and (a.tgl_selesai between getdate() and getdate()+$row2->hari) and a.kode_pic='$row1->kode_pic'
		order by a.tgl_selesai ";
				
			$rs = $db->execute($sql);
			$i = 1;
			$konten="<html>
	<head>
		
	<meta http-equiv='content-type' content='text/html;charset=UTF-8' />
	<style type='text/css'>
	.kotak {
		border-collapse : collapse;
		bordercolor : #111111;
	}
	</style>
	</head>
	<body>";
			$konten.= "<div align='center'>"; 
			$konten.="<table width='1200' border='0' cellspacing='2' cellpadding='1'>
	  <tr>
		<td>Semangat  Pagi </td>
	  </tr>
	  <tr>
		<td>Hi $row1->nama</td>
	  </tr>
	  <tr>
		<td>Di tempat</td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td><b>Laporan Jatuh Tempo Periode Polis $row2->hari Hari Kedepan Tanggal $row1->tgl2</b></td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td>Berdasarkan informasi aplikasi bisnis SJU ada Polis yang akan berakhir dalam $row2->hari Hari kedepan tanggal $row1->tgl2 adalah sebagai berikut :</td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td>";
		$konten.="<table border='1' cellspacing='0' cellpadding='0'  width='1200' class='kotak'>
		   <tr bgcolor='#CCCCCC'>
			 <td width='30'  align='center' class='header_laporan'>No</td>
			 <td width='100'  align='center' class='header_laporan'>No Polis</td>
			  <td width='150'  align='center' class='header_laporan'>No Dokumen</td>
			  <td width='60'  align='center' class='header_laporan'>Tgl Mulai</td>
			  <td width='60'  align='center' class='header_laporan'>Tgl Selesai</td>
			  <td width='150'  align='center' class='header_laporan'>Tertanggung</td>
			 <td width='150'  align='center' class='header_laporan'>Penanggung</td>
			 <td width='50'  align='center' class='header_laporan'>Curr</td>
			  <td width='100'  align='center' class='header_laporan'>Sum Insured</td>
			 <td width='90'  align='center' class='header_laporan'>NIlai Premi</td>
			 <td width='150'  align='center' class='header_laporan'>Occup. of Risk</td>
			 <td width='150'  align='center' class='header_laporan'>Object of Risk</td>
			 <td width='150'  align='center' class='header_laporan'>Loc. of Risk</td>
			 
			 
			 
			 </tr>  ";
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				$tgl1=$row->tgl1;
				$tgl2=$row->tgl2;	
				$konten= $konten."<tr >
			 <td class='isi_laporan' align='center'>$i</td>
			 <td class='isi_laporan'>$row->no_polis</td>
			 <td class='isi_laporan'>$row->no_dok</td>
			 <td class='isi_laporan'>$row->tgl_mulai</td>
			 <td class='isi_laporan'>$row->tgl_selesai</td>
			 <td class='isi_laporan'>$row->cust</td>
			 <td class='isi_laporan'>$row->vendor</td>
			 <td class='isi_laporan'>$row->kode_curr</td>
			 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
			 <td class='isi_laporan' align='right'>".number_format($row->n_premi,0,",",".")."</td>
			 <td class='isi_laporan'>$row->occup</td>
			 <td class='isi_laporan'>$row->objek</td>
			 <td class='isi_laporan'>$row->lokasi</td>
			 </tr>";
				 
				$i=$i+1;
			}
		$konten.="</table>";
	  $konten.="</td>
	  </tr>
	  <tr>
		<td>Selanjutnya agar informasi tersebut diatas dapat segera disampaikan ke Tertanggung untuk dimintakan persetujuan perpanjangan polisnya.</td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td>Demikian disampaikan, terimakasih atas kerjasamanya.</td>
	  </tr>
	  <tr>
		<td>&nbsp;</td>
	  </tr>
	  <tr>
		<td>Salam</td>
	  </tr>
	  <tr>
		<td>PT Sarana Janesia Utama</td>
	  </tr>
	</table>
	</div>
	</body>
	</html>";
			
			
				
			if ($row1->email!="-")
			{
				$numSent = $mail->sendMail("no-reply@sju.co.id", $row1->email,"Laporan Jatuh Tempo Periode Polis $row2->hari Hari Kedepan Tanggal $tgl2", $konten,null);
				echo $numSent."<br>";
			}
			else
			{
				echo "Data email $row1->kode_pic - $row1->nama belum di setting <br>";
			}
		}
	}
			
	
}catch(Exception $e){
		echo $e->getMessage() . "...\n";
}
?>
