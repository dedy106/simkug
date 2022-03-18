<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptVerifikasi extends server_report_basic
{
	var $tblHeader;
	var $dbField;
	var $dbSQL;
	var $dbSQLField;
		
	function getTotalPage()
	{
		global $dbLib;
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$divisi = $jns_proc[2];
		$model = $jns_proc[3];
		$jns_proc = $jns_proc[0];
				
		$regdiva =  (substr($divisi,0,3) == "TDV" ||  substr($divisi,0,3) == "TCS");
		$diva = ($divisi == "DIVA" || $divisi == "T902");
		$divisi = ($divisi == "DIVA" ? "T902" :$divisi );
		
		if ($model == "BA"){
			$sql = "select count(*) from (select distinct bb.nama as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, b.kode_lokfa				
					from amu_asset b 
					inner join amu_lokasi bb on bb.kode_lokfa = ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." and b.kode_lokasi = bb.kode_lokasi
					inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi and c.kode_induk = '00'
					left outer join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode'
					".  $this->filter ." ". ($regdiva ? "and b.ref1 = '$divisi'" :"")."
					union 
					select distinct 'Kantor Divisi' as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, '-' as tempat, b.kode_lokfa
					from amu_asset b 				
					inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
					left outer join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode'
					".  $this->filter ." and b.kode_lokfa = '$divisi'  ) a ";
		}else{
			$sql = "select count(*) from (select distinct bb.nama as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, b.kode_lokfa, 
				k.no_ver
					from amu_asset b 
					inner join amu_lokasi bb on bb.kode_lokfa = ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." and b.kode_lokasi = bb.kode_lokasi
					inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi and c.kode_induk = '00'
					inner join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode'
					".  $this->filter ." ". ($regdiva ? "and b.ref1 = '$divisi'" :"")."
					union 
					select distinct 'Kantor Divisi' as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, '-' as tempat, b.kode_lokfa, 
				k.no_konv
					from amu_asset b 				
					inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
					inner join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode'
					".  $this->filter ." and b.kode_lokfa = '$divisi'  ) a ";		
		}		
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
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);				
		$periode = $jns_proc[1];
		$divisi = $jns_proc[2];
		$model = $jns_proc[3];
		$jns_proc = $jns_proc[0];
		
		$this->initColumn($jns_proc);				
		$regdiva =  (substr($divisi,0,3) == "TDV" ||  substr($divisi,0,3) == "TCS");
		$diva = ($divisi == "DIVA" || $divisi == "T902");
		$divisi = ($divisi == "DIVA" ? "T902" :$divisi );
		if ($model == "BA"){
			$sql1 = "select distinct bb.nama as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." as kode_lokfa
					from amu_asset b 
					inner join amu_lokasi bb on bb.kode_lokfa = ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." and b.kode_lokasi = bb.kode_lokasi
					inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi and c.kode_induk = '00'
					left outer join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
					".  $this->filter ." ". ($regdiva ? "and b.ref1 = '$divisi'" :"")."
					union 
					select distinct ".($diva ? "bb.nama":"'Kantor Divisi'") ." as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, '-' as tempat, ".($diva ? "b.ref1":"b.kode_lokfa")." as kode_lokfa
					from amu_asset b 				
					inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
					".($diva ? "inner join amu_lokasi bb on bb.kode_lokfa = b.ref1 and bb.kode_induk = c.kode_lokfa ":"")."
					left outer join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
					".  $this->filter ." and b.kode_lokfa = '$divisi' ";			
		}else{
			$sql1 = "select distinct bb.nama as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, b.kode_lokfa, 
				k.no_ver
					from amu_asset b 
					inner join amu_lokasi bb on bb.kode_lokfa = ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." and b.kode_lokasi = bb.kode_lokasi
					inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi and c.kode_induk = '00'
					inner join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 				
					".  $this->filter ." ". ($regdiva ? "and b.ref1 = '$divisi'" :"")."
					union 
					select distinct 'Kantor Divisi' as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, '-' as tempat, b.kode_lokfa, 
				k.no_ver
					from amu_asset b 				
					inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
					inner join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
					".  $this->filter ." and b.kode_lokfa = '$divisi' ";			
		}		
		$sql1=  str_replace("\t","",$sql1);					
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);
		$path = $_SERVER["REQUEST_URI"];
		for ($i = 0; $i < 2; $i++){
			$path = substr($path,0,strrpos($path,"/"));		
		}
		while ($row1 = $rs1->FetchNextObject(true))
		{
			echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td width='10%'><img src='$path/image/telkomindonesia.png' width='170' height='100'/></td>
					<td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>
					<table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td colspan=2 align='center' class='lokasi_laporan2'>KERTAS KERJA VERIFIKASI - $jns_proc </td>						
					  </tr>					
					  <tr>
						<td width='9%' class='header_laporan'>Divisi / Ubis </td>
						<td width='91%' class='header_laporan'>: $row1->NMUBIS</td>
					  </tr>
					  <tr>
						<td class='header_laporan'>Regional </td>
						<td class='header_laporan'>: $row1->NMAREA</td>
					  </tr>      
					</table></td>
				  </tr>
				</table></td>
			  </tr>			  
			  <tr>
				<td>&nbsp;</td>
				
			  </tr>";
		if ($model == "BA"){			
			$sql = "select distinct b.no_fa, b.no_sn,  b.kode_klpfa,b.kode_lokfa, b.nama, b.nama2 as alamat, date_format(b.tgl_perolehan,'%d-%m-%Y') as cap_date, 
					b.nilai, b.nilai_ap, b.nilai_buku,k.jns_proc, i.no_evd, ". $this->dbSQLField ." 									
						from amu_asset b					
						inner join amu_klp d on b.kode_klpfa=d.kode_klpfa 
						left outer join amu_alt_konv_d k on k.no_gabung = b.no_gabung 
						left outer join amu_alt_ver_d i on i.no_gabung = b.no_gabung and i.periode = '$periode' ". $this->dbSQL . " 					
						". $this->filter  . " and ".($regdiva ? "b.ref1 = '$row1->KODE_LOKFA' ":"b.kode_lokfa = '$row1->KODE_LOKFA'" ). "
						order by b.no_fa ";		
		}else
			$sql = "select distinct b.no_fa, b.no_sn,  b.kode_klpfa,b.kode_lokfa, b.nama, b.nama2 as alamat, date_format(b.tgl_perolehan,'%d-%m-%Y') as cap_date, 
					b.nilai, b.nilai_ap, b.nilai_buku,k.jns_proc, i.no_evd, ". $this->dbSQLField ." 					
					from amu_asset b					
					inner join amu_klp d on b.kode_klpfa=d.kode_klpfa 
					inner join amu_alt_konv_d k on k.no_gabung = b.no_gabung 
					inner join amu_alt_ver_d i on i.no_gabung = b.no_gabung and i.periode = '$periode' ". $this->dbSQL . " 					
					". $this->filter  . " and i.no_ver = '$row1->NO_VER'
					order by b.no_fa ";		
		//$rs = $dbLib->execute($sql);		
		$sql=  str_replace("\t","",$sql);
		//$sql=  str_replace("\n","",$sql);
		
		$rs=$dbLib->execute($sql);
		$i = 1;
		
		//$html=$AddOnLib->judul_laporan("laporan neraca",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<tr>
				<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'>
				 <tr align='center' bgcolor='#CCCCCC'>
					<td colspan='".($this->startField - 1) ."' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>DATA SAP AM </td>
					<td colspan='".(count($this->dbField)) ."' bgcolor='#FF6600' style='color:#ffffff' class='header_laporan'>DATA HASIL KONVERSI </td>
					<td rowspan='2' bgcolor='#333333' class='header_laporan' style='color:#ffffff'>Referensi Evidence</td>
					</tr>
				  <tr align='center' bgcolor='#CCCCCC'>
					". $this->tblHeader ."					
				  </tr>
				  <tr align='center' bgcolor='#CCCCCC'>";
				  echo "<td class='header_laporan'>1</td>";
				  foreach ($this->tblColHeader as $k => $value) echo "<td class='header_laporan'>".($k + 2)."</td>";
				  echo "<td class='header_laporan'>".(count($this->tblColHeader)+2)."</td>";				  
				  echo "</tr>";
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$first = true;	
		$no = 1;
		while ($row = $rs->FetchNextObject(true))
		{
				$this->processRow($jns_proc, $row, $no);	
				echo "<td class='isi_laporan'>$row->NO_EVD</td> 
					</tr>";
				$no++;
			
		}
		$sql = "select a.nik, b.nama, a.status from amu_alt_ttd a left outer join amu_karyawan b on b.nik = a.nik ".
				" where a.no_bukti = '$row1->NO_VER'";
		$ttd = $dbLib->execute($sql);
		$ttd1 = array();
		$ttd2 = array();
		while ($lineTtd = $ttd->FetchNextObject(true)){
			if ($lineTtd->STATUS == "0") $ttd1[] = array($lineTtd->NIK, $lineTtd->NAMA);
			else $ttd2[] = array($lineTtd->NIK, $lineTtd->NAMA);
		}
			echo "</table></td>
			  </tr>
			  <tr>
				<td>&nbsp;</td>
			  </tr>
			  
			  <tr>
				<td align='right'>";
				$this->getTTD($jns_proc, $ttd1, $ttd2,$AddOnLib->ubah_tanggal($row1->TGL),$AddOnLib->ubah_tanggal($row1->TGL), $row1->NMAREA);
				echo "</td>
			  </tr>
			</table>";
			  }
 		//$html = str_replace(chr(9),"",$html);
		return "";
	}
	function getTTD($jns_proc, $ttd1, $ttd2, $tgl, $tgl2, $area){
		switch (strtolower($jns_proc)){
		case "sentral":							
		case "rce & mux":		
		case "rms":
		case "server":
		case "skkl / skso":
			echo "<table width='100%' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Disiapkan pada tanggal: ".$tgl."</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Direview oleh:</td>
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center'>&nbsp;</td>				
				<td colspan='2' align='center' class='header_laporan'><p>Off/ Asman $area </p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[0][1]."</p></td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'><p>Mgr. $area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[0][1]."</p></td>				
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd1[0][0]."</td>				
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd2[0][0]."</td>				
				</tr>
			</table>";
		break;
		case "modem data & imux":
		break;
		case "satelit":
		echo "<table width='100%' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Disiapkan pada tanggal: ".$tgl."</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Direview oleh:</td>
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center'>&nbsp;</td>				
				<td colspan='2' align='center' class='header_laporan'><p>Asman Analisa Orbital & Data Operasi </p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[0][1]."</p></td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'><p>Manager Pengendalian Satelit</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[0][1]."</p></td>				
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd1[0][0]."</td>				
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd2[0][0]."</td>				
				</tr>
			</table>";
		break;		
		case "rbs":
		echo "<table width='100%' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td colspan='7' align='center' class='header_laporan'>Disiapkan pada tanggal: ".$tgl."</td>				
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center' class='header_laporan'><p>OFF OM & QoS BSS<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[0][1]."</p></td>
				<td align='center' class='header_laporan'><p>OFF OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL I)<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[1][1]."</p></td>
				<td align='center' class='header_laporan'><p>OFF OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL II)<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[2][1]."</p></td>
				<td align='center' class='header_laporan'><p>OFF OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL III)<br>$area</p>
					  <p>&nbsp;</p>
					  <p>".$ttd1[3][1]."</p></td>
				 </td>
				<td align='center' class='header_laporan'><p>OFF OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL IV)<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[4][1]."</p></td>
				<td align='center' class='header_laporan'><p>OFF 1 IP TRANSPORT AREA I (WEST)<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[5][1]."</p></td>				
				 <td align='center' class='header_laporan'><p>Officer 1 Energy & Supp.Facility<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[6][1]."</p></td>								  
				</tr>
			  <tr>
				<td align='center' class='header_laporan'>NIK : ".$ttd1[0][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd1[1][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd1[2][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd1[3][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd1[4][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd1[5][0]."</td>				
				<td align='center' class='header_laporan'>NIK : ".$ttd1[6][0]."</td>				
				</tr>
				<tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>								
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
				<tr>
				<td colspan='7' align='center' class='header_laporan'>Direview Oleh:</td>				
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center' class='header_laporan'><p>MGR OM & QoS BSS<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[0][1]."</p></td>
				<td align='center' class='header_laporan'><p>MGR OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL I)<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[1][1]."</p></td>
				<td align='center' class='header_laporan'><p>MGR OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL II)<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[2][1]."</p></td>
				<td align='center' class='header_laporan'><p>MGR OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL III)<br>$area</p>
					  <p>&nbsp;</p>
					  <p>".$ttd2[3][1]."</p></td>
				 </td>
				<td align='center' class='header_laporan'><p>MGR OPERATION & MAINTENANCE NETWORK<br>(N/W SERVICES TELKOMFLEXI REGIONAL IV)<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[4][1]."</p></td>
				<td align='center' class='header_laporan'><p>MGR OM IP NETWORK & FLEXI DCN <br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[5][1]."</p></td>				
				 <td align='center' class='header_laporan'><p>Manager OM CME & Transmission<br>$area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[6][1]."</p></td>								  
				</tr>
			  <tr>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[0][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[1][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[2][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[3][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[4][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[5][0]."</td>				
				<td align='center' class='header_laporan'>NIK : ".$ttd2[6][0]."</td>				
				</tr>
			</table>";
		break;
		case "stm & ims":
		echo "<table width='100%' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Disiapkan pada tanggal: ".$tgl."</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Direview oleh:</td>
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center'>&nbsp;</td>				
				<td colspan='2' align='center' class='header_laporan'><p>Off/ Asman <br>$area </p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[0][1]."</p></td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'><p>Mgr.<br> $area</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[0][1]."</p></td>				
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd1[0][0]."</td>				
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd2[0][0]."</td>				
				</tr>
			</table>";
		break;
		case "jaringan":
		echo "<table width='100%' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td colspan='3' align='center' class='header_laporan'>Disiapkan pada tanggal: ".$tgl."</td>
				<td align='center'>&nbsp;</td>
				<td colspan='3' align='center' class='header_laporan'>Direview oleh:</td>
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center' class='header_laporan'><p>Officer MDM</p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[0][1]."</p></td>				
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center' class='header_laporan'><p>&nbsp;</p>
					  <p>&nbsp;</p>
				 </td>
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center' class='header_laporan'><p>Asman MDM</p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[0][1]."</p></td>
				<td align='center' class='header_laporan'><p>Mgr. $area </p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[1][1]."</p></td>
				</tr>
			  <tr>				
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd1[0][0]."</td>
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[0][0]."</td>
				<td align='center' class='header_laporan'>NIK : ".$ttd2[1][0]."</td>
				</tr>
			</table>";
		break;		
		case "lan & wan":
		echo "<table width='100%' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Disiapkan pada tanggal: ".$tgl."</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'>Direview oleh:</td>
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center'>&nbsp;</td>				
				<td colspan='2' align='center' class='header_laporan'><p>Off/ Asman $area </p>
					  <p>&nbsp;</p>
				  <p>".$ttd1[0][1]."</p></td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td colspan='2' align='center' class='header_laporan'><p>Mgr.$area </p>
					  <p>&nbsp;</p>
				  <p>".$ttd2[0][1]."</p></td>				
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd1[0][0]."</td>				
				<td align='center' class='header_laporan'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center' colspan='2' class='header_laporan'>NIK : ".$ttd2[0][0]."</td>				
				</tr>
			</table>";
		break;
		}
	}
	function processRow($jnsProc,$row, $no){
		$tmp = (array) $row;			
		$nilai=number_format($row->NILAI,0,",",".");
		$nilai_ap=number_format($row->NILAI_AP,0,",",".");
		$nilai_buku=number_format($row->NILAI_BUKU,0,",",".");
		switch (strtolower($jnsProc)){
			case "sentral":			
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>
					<td class='isi_laporan'>$row->KODE_KLPFA</td>				
					<td class='isi_laporan'>$row->ALAMAT</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "rce & mux":
			case "rms":
			case "skkl / skso":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "modem data & imux":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "satelit":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "server":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "rbs":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "stm & ims":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>
					<td class='isi_laporan'>$row->KODE_KLPFA</td>
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "jaringan":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>					
					<td class='isi_laporan'>$row->KODE_LOKFA</td>
					<td class='isi_laporan'>$row->REF2</td>
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
			case "lan & wan":
				echo "<tr>
					<td class='isi_laporan'>$no</td>
					<td class='isi_laporan'>$row->NO_FA</td>
					<td align='center' class='isi_laporan'>$row->NO_SN</td>					
					<td class='isi_laporan'>$row->NAMA</td>					
					<td class='isi_laporan'>$row->ALAMAT</td>					
					<td class='isi_laporan'>$row->KODE_LOKFA</td>					
					<td width='120' class='isi_laporan'>$row->CAP_DATE</td>
					<td align='right' class='isi_laporan'>$nilai</td>
					<td align='right' class='isi_laporan'>$nilai_ap</td>
					<td align='right' class='isi_laporan'>$nilai_buku</td>";
				foreach ($this->dbField as $k => $value) {						
					echo "<td class='isi_laporan'>". $tmp[trim(strtoupper($value))]."</td>";	
				}
			break;
		}
	}
	
	function initColumn($jnsProc){
		switch (strtolower($jnsProc)){
			case "sentral":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu Aset</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Kelas Aset</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi/Netre</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>ARNET</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Kode Sentral</td>								
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Nama Sentral</td>								
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Area Code</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>FKN</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Fungsi</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Host</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Tipe Sentral</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama, kode_klpfa,alamat,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_netre, kode_arnet,  lokasi_sentral, kode_sentral,nama_sentral, kode_area, fkn, fungsi, host, tipe_sentral";									
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Kelas aset, Deskripsi Alamat,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, ARNET, Lokasi,Kode Central,Nama Central, Area Code, FKN, Fungsi, Host, Tipe Sentral";
				$this->dbSQL = "";
				$this->dbSQLField = "k.kode_netre, k.kode_arnet, k.lokasi_sentral, k.kode_sentral, k.nama_sentral, k.kode_area, k.fkn, k.fungsi, k.host, k.tipe_sentral";				
				$this->startField = 12;
				$this->colWidth = array(7,14,5,50,10,50,5,10,20,20,20,15,15,15,10,15,10,10,10,10,10);
			break;
			case "rce & mux":
			case "rms":
			case "skkl / skso":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu Aset </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi/Netre</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Tipe</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Komponen</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Sistra/Proyek </td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Link/Point/Lokasi</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama, alamat,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_netre, kode_tipe, kode_komp, kode_proyek, kode_link";
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Lokasi /Netre, Tipe, Komponen, Sistra/Proyek, Link";
				$this->dbSQLField = "k.kode_netre, k.kode_tipe, k.kode_komp, k.kode_proyek, k.kode_link";
				$this->dbSQL = "";				
				$this->startField = 11;
			break;
			case "modem data & imux":
				//No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>No Kontrak</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Vendor</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Crosscheck Kontrak</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Nomor Seri</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama,alamat,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "no_kontrak, kode_vendor, no_kontrak2, status_sn";
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri";
				$this->dbSQLField = "k.no_kontrak, k.kode_vendor, k.no_kontrak2, k.status_sn";				
				$this->startField = 11;
			break;
			case "satelit":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Satelit</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama, alamat,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_satelit";
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Nama Satelit";
				$this->dbSQLField = "k.kode_satelit";				
				$this->startField = 11;
			break;
			case "server":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Sub UBIS</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>IP Server</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Nama Aplikasi/Tools</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Tipe Switch</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>IP Switch</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama,alamat,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_netre,lokasi_server, ip_server, kode_aplikasi, tipe_switch, ip_switch";
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Sub UBIS, Lokasi Aset/Perangkat, IP Perangkat,Nama Aplikasi/Tools, Tipe Switch, IP Switch";
				$this->dbSQLField = "k.kode_netre,k.lokasi_server, k.ip_server, k.kode_aplikasi, k.tipe_switch, k.ip_switch";
				$this->startField = 11;
			break;
			case "rbs":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Level 1</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Level 2</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi BTS/BSC</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Area Operasional</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Vendor</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Alat Monitoring</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Status BTS / BSC</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Status Rekonsiliasi</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama, alamat,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_lokrbs_m, kode_lokrbs_d, kode_lok, kode_regional,  kode_vendor, kode_alat, sts_rbs, sts_rekon";
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Level 1,	Level 2,Lokasi BSC/BTS, Area Operasional,Vendor,Alat Monitoring,Status BTS / BSC, Status Rekonsiliasi";
				$this->dbSQLField = "k.kode_lokrbs_m, k.kode_lokrbs_d, k.kode_lok, k.kode_regional,  k.kode_vendor, k.kode_alat, k.sts_rbs, k.sts_rekon";
				$this->startField = 11;
			break;
			case "stm & ims":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Kelas Aset</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Group Utama</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Kategori</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Kelompok Aset</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Merk</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Vendor</td>								
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi/Daerah/STO</td>								
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Nama</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Jumlah</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Satuan</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Keterangan</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama, alamat,kode_klpfa,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_group, kode_klpstm, kode_klpfa, kode_merk, kode_vendor, kode_lokstm, kode_sto, jumlah, kode_satuan, keterangan";
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,Kelas Aset,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Group Utama,Kategori,Kelompok Asset,Merk,Vendor,Lokasi/ Daerah/ STO,Nama Aset,Jumlah,Satuan,Keterangan";					
				$this->dbQLField = "k.kode_group, k.kode_klpstm, k.kode_klpfa, k.kode_merk, k.kode_vendor, k.kode_lokstm, k.kode_sto, k.jumlah, k.kode_satuan, k.keterangan";
				$this->startField = 12;
			break;
			case "jaringan":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Location</td>
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>DIV. REGIONAL</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>AREA</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>STO</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama, alamat,kode_klpfa,ref2,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_netre, kode_arnet, kode_sto";				
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,BA,location,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Regional, Area, STO/MDF";
				$this->dbSQLField = "k.kode_netre, k.kode_arnet, k.kode_sto";
				$this->startField = 12;
			break;
			case "lan & wan":
				$this->tblHeader = "<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Urut</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>No Kartu </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>SN</td>										
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Aset</td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Deskripsi Alamat</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>BA</td>					
					<td bgcolor='#008080' style='color:#ffffff' width='120pt' class='header_laporan'>Cap Date </td>					
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Harga Perolehan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Akumulasi Penyusutan </td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan'>Nilai Buku </td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Sub UBIS/Regional</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Nama Perangkat</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>IP Perangkat</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Tipe Switch</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>IP Switch</td>";
				$this->dbFieldSrc = "no_fa, no_sn,nama, alamat,kode_lokfa,cap_date,nilai,nilai_ap,nilai_buku";
				$this->dbField = "kode_netre,lokasi_server,kode_aplikasi, ip_server, tipe_switch, ip_switch";
				$this->dbSQLField = "k.kode_netre,k.lokasi_server,k.kode_aplikasi, k.ip_server, k.tipe_switch, k.ip_switch";
				$this->tblColHeader = "No Kartu Aset, Sub No,Deskripsi Aset,Deskripsi Alamat,BA,Cap Date,Harga Perolehan,Akm. Penyusutan,Nilai Buku,Sub UBIS/Regional, Lokasi, Nama Perangkat,IP Perangkat, Tipe Switch, IP Switch";
				$this->startField = 11;
			break;
			case "tanah & bangunan":				
				$this->tblHeader = "<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>No Sertifikat</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Luas Tanah</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Luas Bangunan</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Status Dokumen</td>								
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>No SPPT (NOP)</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi PBB</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Luas Tanah</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Luas Bangunan</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>NKA Terkait Bangunan</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Status Dokumen</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Jenis Dokumen</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>No Lainnya</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Lokasi Dgn Dokumen</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>ID Pelanggan</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Nama Pelanggan</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>NKA Terkait Tanah</td>
								<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan'>Status Dokumen</td>";
				$this->dbField = "NOSURAT,NMLOKASI,TNH1,BANGUNAN1,STS1,NOP,LOKASI2,TNH2,BANGUNAN2,NKA1,STS2,JENIS1,NOLAIN,LOKASI3,KODE_CUST,NMCUST,NKA2,STATUS2";
			break;			
		}		
		$this->dbField = explode(",",$this->dbField);
		$this->tblColHeader = explode(",",$this->tblColHeader);
		$this->dbFieldSrc = explode(",",$this->dbFieldSrc);
		
	}
	function createXls(){
		global $manager;
		$manager->setSendResponse(false);
		uses("server_xls_Writer", false);
		$namafile = "Verifikasi.xls";
		$excel = new Spreadsheet_Excel_Writer();
		
		$excel->send($namafile);
		$excel->setCustomColor(14, 0,128,128); 
				
		$hdrSAP =& $excel->addFormat(array('size' => 9,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 14,'pattern' => 1, 'color' => 'white'	));		
		$hdrKonv =& $excel->addFormat(array('size' => 9,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'orange','pattern' => 1, 'color' => 'white'	));		
		$hdrVer =& $excel->addFormat(array('size' => 9,'bold' => true, 'border' => 1,'halign' => 'center','valign' => 'vcenter', 'bordercolor' => 'white','fgcolor' => 'black','pattern' => 1, 'color' => 'white','textwrap' => 1	));
		$numFormat =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black'));				
		$numFormat->setNumFormat("#,##0");
		$normalFormat =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black' ));		
		$header =& $excel->addFormat(array('size' => 12,'bold' => true, 'halign' => 'center'));
		$header2 =& $excel->addFormat(array('size' => 10,'bold' => true));
		$header3 =& $excel->addFormat(array('size' => 10,'bold' => true, 'color' => 'red'));
		$numFormat2 =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		$numFormat2->setNumFormat("#,##0");
		$normalFormat2 =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$divisi = $jns_proc[2];
		$model = $jns_proc[3];
		$jns_proc = $jns_proc[0];
		
		$this->initColumn($jns_proc);				
		$regdiva =  (substr($divisi,0,3) == "TDV" ||  substr($divisi,0,3) == "TCS");
		$diva = ($divisi == "DIVA" || $divisi == "T902");
		$divisi = ($divisi == "DIVA" ? "T902" :$divisi );
		if ($model == "BA"){
			$sql1 = "select distinct bb.nama as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." as kode_lokfa
					from amu_asset b 
					inner join amu_lokasi bb on bb.kode_lokfa = ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." and b.kode_lokasi = bb.kode_lokasi
					inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi and c.kode_induk = '00'
					left outer join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
					".  $this->filter ." ". ($regdiva ? "and b.ref1 = '$divisi'" :"")."
					union 
					select distinct ".($diva ? "bb.nama":"'Kantor Divisi'") ." as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, '-' as tempat, ".($diva ? "b.ref1":"b.kode_lokfa")." as kode_lokfa
					from amu_asset b 				
					inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
					".($diva ? "inner join amu_lokasi bb on bb.kode_lokfa = b.ref1 and bb.kode_induk = c.kode_lokfa ":"")."
					left outer join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
					".  $this->filter ." and b.kode_lokfa = '$divisi' ";			
		}else{
			$sql1 = "select distinct bb.nama as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, bb.tempat, b.kode_lokfa, 
				k.no_ver
					from amu_asset b 
					inner join amu_lokasi bb on bb.kode_lokfa = ". ($regdiva ? "b.ref1" :"b.kode_lokfa")." and b.kode_lokasi = bb.kode_lokasi
					inner join amu_lokasi c on c.kode_lokfa = bb.kode_induk and c.kode_lokasi = bb.kode_lokasi and c.kode_induk = '00'
					inner join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 				
					".  $this->filter ." ". ($regdiva ? "and b.ref1 = '$divisi'" :"")."
					union 
					select distinct 'Kantor Divisi' as nmarea, c.nama as nmubis, 			
				date_format(now(),'%d-%m-%Y') as tgl, '-' as tempat, b.kode_lokfa, 
				k.no_ver
					from amu_asset b 				
					inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
					inner join amu_alt_ver_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
					".  $this->filter ." and b.kode_lokfa = '$divisi' ";			
		}
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);		
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);
		
		while ($row1 = $rs1->FetchNextObject(true))
		{									
			$sheet =& $excel->addWorksheet('KK Verifikasi');			
			$sheet->setMerge(1,2,1,count($this->tblColHeader) + 1);
			$sheet->write(1,2,"KERTAS KERJA VERIFIKASI - ". $jns_proc, $header);
			
			$sheet->write(3,3,"Divisi / Ubis ",$header2);$sheet->write(3,4,$row1->NMUBIS,$header3);
			$sheet->write(4,3,"Regional ",$header2);$sheet->write(4,4,$row1->NMAREA,$header3);
			
			$sheet->setMerge(6,0,6,$this->startField - 2);
			$sheet->write(6,0,"DATA MODUL SAP AM", $hdrSAP);
			$sheet->setMerge(6,$this->startField - 1,6,count($this->tblColHeader));
			$sheet->write(6,$this->startField - 1,"HASIL KONVERSI", $hdrKonv);
			$sheet->setMerge(6,count($this->tblColHeader)+1,7,count($this->tblColHeader)+1);
			$sheet->write(6,count($this->tblColHeader)+1,"Referensi Evidence", $hdrVer);
			$sheet->write(7,count($this->tblColHeader)+1," ", $hdrVer);
			$sheet->setColumn(count($this->tblColHeader)+1, count($this->tblColHeader)+1, 20);
			
			$rowStart = 7;
			$sheet->write($rowStart, 0, "No Urut", $hdrSAP);
			$sheet->setColumn(0, 0, 5);
			$sheet->write($rowStart + 1, 0,1, $normalFormat2);
			foreach($this->tblColHeader as $key => $value){
				if ($key + 1 < $this->startField - 1)
					$sheet->write($rowStart, $key + 1, $value, $hdrSAP);
				else $sheet->write($rowStart, $key + 1, $value, $hdrKonv);
				$sheet->write($rowStart + 1, $key + 1, $key + 2, $normalFormat2);
				$sheet->setColumn($key + 1, $key + 1, $this->colWidth[$key + 1]);
			}		
			$sheet->write($rowStart + 1, count($this->tblColHeader) + 1, count($this->tblColHeader)+2, $normalFormat2);
			if ($model == "BA"){			
				$sql = "select distinct b.no_fa, b.no_sn,  b.kode_klpfa,b.kode_lokfa, b.nama, b.nama2 as alamat, date_format(b.tgl_perolehan,'%d-%m-%Y') as cap_date, 
					b.nilai, b.nilai_ap, b.nilai_buku,b.ref2, b.ref1, k.jns_proc, i.no_evd,". $this->dbSQLField ." 						
							from amu_asset b					
							inner join amu_klp d on b.kode_klpfa=d.kode_klpfa 
							left outer join amu_alt_konv_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
							left outer join amu_alt_ver_d i on i.no_gabung = b.no_gabung and i.periode = '$periode' ". $this->dbSQL . " 					
							". $this->filter  . " and ".($regdiva ? "b.ref1 = '$row1->KODE_LOKFA' ":"b.kode_lokfa = '$row1->KODE_LOKFA'" ). "
							order by b.no_fa ";		
			}else
				$sql = "select distinct b.no_fa, b.no_sn,  b.kode_klpfa,b.kode_lokfa, b.nama, b.nama2 as alamat, date_format(b.tgl_perolehan,'%d-%m-%Y') as cap_date, 
					b.nilai, b.nilai_ap, b.nilai_buku,b.ref2, b.ref1, k.jns_proc, i.no_evd,". $this->dbSQLField ." 					
					from amu_asset b					
					inner join amu_klp d on b.kode_klpfa=d.kode_klpfa 
					inner join amu_alt_konv_d k on k.no_gabung = b.no_gabung and k.jns_proc = '$jns_proc' and k.periode = '$periode' 
					inner join amu_alt_ver_d i on i.no_gabung = b.no_gabung and i.periode = '$periode' ". $this->dbSQL . " 					
					where i.no_ver = '$row1->NO_VER'					
					order by b.no_fa ";					
			$sql=  str_replace("\t","",$sql);
			
			$rs=$dbLib->execute($sql);
			$totnka = 0;$nilai=0;$nilai_ap=0;$nilai_buku=0;
			$tnilai=0;$tnilai_ap=0;$tnilai_buku=0;
												
			$no = 1;
			$rowStart = 9;
			$nka = "";
			while (!$rs->EOF && $row = $rs->FetchNextObject(true))
			{						
				$tmp = (array) $row;
				$sheet->write($rowStart,0,$no,$normalFormat );
				
				if ($nka != ($row->NO_FA . $row->NO_SN)){
					foreach ($this->dbFieldSrc as $k => $value) {
						if (strpos($value,"nilai") > -1)
							$sheet->write($rowStart,$k + 1, $tmp[trim(strtoupper($value))], $numFormat);	
						else $sheet->writeString($rowStart,$k + 1, $tmp[trim(strtoupper($value))], $normalFormat);	
					}		
					$nka = ($row->NO_FA . $row->NO_SN);
					$tnilai += $row->NILAI;
					$tnilai_ap += $row->NILAI_AP;
					$tnilai_buku += $row->NILAI_BUKU;
					if ($tmp[count($tmp) - 1] != "-") {
						$totnka++;
						$nilai += $row->NILAI;
						$nilai_ap += $row->NILAI_AP;
						$nilai_buku += $row->NILAI_BUKU;				
					}
				}else {
					foreach ($this->dbFieldSrc as $k => $value) {
						if (strpos($value,"nilai") > -1)
							$sheet->write($rowStart,$k + 1, " ", $numFormat);	
						else $sheet->writeString($rowStart,$k + 1, " ", $normalFormat);	
					}
				}
				
				
				foreach ($this->dbField as $k => $value) {			
					$sheet->writeString($rowStart,$k + $this->startField - 1, $tmp[trim(strtoupper($value))],$normalFormat);
				}
				$sheet->writeString($rowStart,count($this->dbField) + $this->startField - 1, $tmp["NO_EVD"],$normalFormat);
								
				$no++;			
				$rowStart++;
			}
			$sheet->write($rowStart,0, " ", $numFormat2);	
			$sheet->write($rowStart,1, " ", $numFormat2);	
			foreach ($this->dbFieldSrc as $k => $value) {
				if ($value == "nilai")
					$sheet->write($rowStart,$k + 1, $tnilai, $numFormat2);	
				else if ($value == "nilai_ap")
					$sheet->write($rowStart,$k + 1, $tnilai_ap, $numFormat2);	
				else if ($value == "nilai_buku")
					$sheet->write($rowStart,$k + 1, $tnilai_buku, $numFormat2);	
				else $sheet->writeString($rowStart,$k + 1, "", $normalFormat2);	
			}	
			foreach ($this->dbField as $k => $value) {			
				$sheet->writeString($rowStart,$k + $this->startField - 1," ",$normalFormat2);
			}
			$sheet->writeString($rowStart,count($this->dbField) + $this->startField - 1, " ",$normalFormat2);
			//total yg bisa di konversi
			$no = 1;			
			$sheet->insertBitmap(0,0,"../image/telkom2.bmp",0,0,1,1);
		}
		$excel->close();
	}	
}
?>
