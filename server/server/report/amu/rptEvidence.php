<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptEvidence extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(no_evd) from amu_evd a ".  $this->filter;
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
		$sql = "select a.no_evd, a.jns_proc, a.kode_lokfa, '-' as nmsbis, b.nama as nmubis, date_format(a.tgl_buat,'%d-%m-%Y') as tgl_buat, date_format(a.tgl_review,'%d-%m-%Y') as tgl_review,
				a.nik_buat, a.nik_review, d.nama as nmbuat, e.nama as nmreview, f.nama as nmjab1, g.nama as nmjab2
				from amu_evd a inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa and b.kode_induk = '00' 
					left outer join amu_karyawan d on d.nik = a.nik_buat 
					left outer join amu_karyawan e on e.nik = a.nik_review 
					left outer join amu_jab f on f.kode_jab = d.kode_jab 
					left outer join amu_jab g on g.kode_jab = e.kode_jab 
					".
				$this->filter ." 
				union 
				select a.no_evd, a.jns_proc, a.kode_lokfa, b.nama, c.nama as nmubis, date_format(a.tgl_buat,'%d-%m-%Y') as tgl_buat, date_format(a.tgl_review,'%d-%m-%Y') as tgl_review,
				a.nik_buat, a.nik_review, d.nama as nmbuat, e.nama as nmreview, f.nama as nmjab1, g.nama as nmjab2
				from amu_evd a 
					inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa 
					inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00' 
					left outer join amu_karyawan d on d.nik = a.nik_buat 
					left outer join amu_karyawan e on e.nik = a.nik_review 
					left outer join amu_jab f on f.kode_jab = d.kode_jab 
					left outer join amu_jab g on g.kode_jab = e.kode_jab ".
				$this->filter ;
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$path = $_SERVER["REQUEST_URI"];
		for ($i = 0; $i < 2; $i++){
			$path = substr($path,0,strrpos($path,"/"));		
		}
		while ($line = $rs->FetchNextObject(true)){
			echo "<table>
					  <tr>
							<td> <table width='100%' border='0' cellspacing='2' cellpadding='1'>
								<tr>
								<td rowspan='3' width='10%'><img src='$path/image/telkomindonesia.png' width='170' height='100'/></td>
								<td width='90%' align='center' valign='middle' class='lokasi_laporan2'>EVIDENCE HASIL VERIFIKASI - ". $line->JNS_PROC ."</td>
								</tr>
								<tr>								
								<td width='90%' align='left' valign='middle' style='font-weight:bold'>UBIS - ". $line->NMUBIS ."</td>
								</tr>
								<tr>								
								<td width='90%' align='left' valign='middle' style='font-weight:bold'>Sub UBIS - ". $line->NMSBIS ."</td>
								</tr>
								</table>
							</td>
					  </tr>
					  <tr>
					  <td></td>
					  </tr>
					  <tr><td>
						<table width='800' class='kotak' border=1>
						<tr bgcolor='#008080'><td colspan='2' align='center' style='color:#ffffff;font-weight:bold'>DATA ". strtoupper($line->JNS_PROC) ."</td>
						</tr>";
					    $sql2 = "select param,value,no_urut from amu_evd_d where no_evd = '$line->NO_EVD' order by no_urut";
						$rs2 = $dbLib->execute($sql2);
						while ($row = $rs2->FetchNextObject(true)){
							echo "<tr><td width='300'>".$row->PARAM."</td><td>".$row->VALUE."</td></tr>";
						}						
					  echo "</table></td></tr>
					  <tr> 
						<td><b>2. Evidence</b></td>
					  </tr>";
						$sql2 = "select no_gambar from amu_evd_dok where no_evd = '$line->NO_EVD'";
						$rs2 = $dbLib->execute($sql2);
						while ($row = $rs2->FetchNextObject(true)){
							$ext = basename("../server/media/$row->NO_GAMBAR");
							$ext = substr($ext,strpos($ext,".") + 1);
							if (exif_imagetype("../server/media/$row->NO_GAMBAR"))
								echo "<tr><td><img src='$path/server/media/$row->NO_GAMBAR'/></td></tr>";
							else echo "<tr><td><img src='$path/icon/explorer/$ext.ico'/>&nbsp;<a href='$path/server/media/$row->NO_GAMBAR'>$row->NO_GAMBAR</a></td></tr>";
						}
					echo  "				
					<tr><td><b>3. KESIMPULAN</b></td>
					</tr>
					<tr><td>".$line->KESIMPULAN." </td>
					</tr>
					<tr>
						<td><table width='100%' border=1 class='kotak'>
							<tr bgcolor='#008080' style='color:#ffffff'><td colspan='3' align='center'>Disiapkan Oleh</td>
							</tr>
							<tr bgcolor='#008080' style='color:#ffffff'>
								<td align='center'>Keterangan</td>
								<td align='center'>Pelaksana</td>
								<td align='center'>Reviewer</td>
							</tr>
							<tr >
								<td>Nama</td>
								<td>$line->NMBUAT</td>
								<td>$line->NMREVIEW</td>
							</tr>
							<tr >
								<td>NIK</td>
								<td>$line->NIK_BUAT</td>
								<td>$line->NIK_REVIEW</td>
							</tr>
							<tr >
								<td>Jabatan</td>
								<td>$line->NMJAB1</td>
								<td>$line->NMJAB2</td>
							</tr>
							<tr >
								<td>Tanggal</td>
								<td>$line->TGL_BUAT</td>
								<td>$line->TGL_REVIEW</td>
							</tr>
							</table>
						</td>
					</tr>	  
				  </table>";		    
		}
			
 		//$html = str_replace(chr(9),"",$html);
		return "";
	}
	
}
?>
