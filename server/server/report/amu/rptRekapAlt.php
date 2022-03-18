<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptRekapAlt extends server_report_basic
{	
	var $tblHeader;
	var $dbField;
	var $dbSQL;
	var $dbSQLField;
	
	function getTotalPage()
	{		
		return 1;
	}
	function getHtml(){
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];
		$jns_proc = $jns_proc[0];
		
		if ($model == "DIVISI") return $this->getHtmlDivisi();
		if ($model == "REGIONAL") return $this->getHtmlRegional();
		if ($model == "VENDOR") return $this->getHtmlVendor();
		if ($model == "AREA") return $this->getHtmlArea();
	}
	function createXls(){
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];
		$jns_proc = $jns_proc[0];
		
		if ($model == "DIVISI") $this->createXlsDivisi();
		if ($model == "REGIONAL") $this->createXlsRegional();
		if ($model == "AREA") $this->createXlsArea();
	}	
	function getHtmlRegional(){
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];		
		$jns_proc = $jns_proc[0];
		
				
		$sql0 = "select kode_lokfa, nama as ubis
				from amu_lokasi c  ".  $this->filter ;			
		$rs = $dbLib->execute($sql0);
		$row1 = $rs->FetchNextObject(true);
				
		$sql0 = "select c.nama as ubis, c.kode_lokfa as divisi, b.kode_lokfa, b.nama
					from amu_lokasi c 				
					inner join amu_lokasi b on b.kode_induk = c.kode_lokfa 
					 ".  $this->filter ." and c.kode_induk = '00'";					
		$diva = $row1->KODE_LOKFA == "T902" || $row1->KODE_LOKFA == "DIVA" || $row1->KODE_LOKFA == "T903" || $row1->KODE_LOKFA == "T904";
		$sql1 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa =  ".($diva ? "a.ref1":"a.kode_lokfa") ." 
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,d.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi d on d.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
								
					$sql2 = "select kode_klpfa,kode_lokfa,count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa, c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1": "a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,dd.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
								
						$sql3 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1": "a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,dd.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
						$sql4 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1": "a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,dd.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
	
		$sql1 = "select a.kode_klpfa,x.kode_lokfa, x.nama, a.nka, a.nilai, a.nilai_ap, a.nilai_buku, 
					ifnull(b.nka,0) as nka2, ifnull(b.nilai,0) as nilai2, ifnull(b.nilai_buku,0) as nilai_buku2, ifnull(b.nilai_ap,0) as nilai_ap2, 
					ifnull(c.nka,0) as nka3, ifnull(c.nilai,0) as nilai3, ifnull(c.nilai_ap,0) as nilai_ap3, ifnull(c.nilai_buku,0) as nilai_buku3,
					ifnull(d.nka,0) as nka4, ifnull(d.nilai,0) as nilai4, ifnull(d.nilai_ap,0) as nilai_ap4, ifnull(d.nilai_buku,0) as nilai_buku4 
					from 
					(".$sql0.") x 
					inner join (".$sql1.") a on a.kode_lokfa = x.kode_lokfa 
					left outer join (".$sql2.") b on b.kode_lokfa = a.kode_lokfa and b.kode_klpfa = a.kode_klpfa
					left outer join (".$sql3.") c on c.kode_lokfa = a.kode_lokfa and c.kode_klpfa = a.kode_klpfa 
					left outer join (".$sql4.") d on d.kode_lokfa = a.kode_lokfa and d.kode_klpfa = a.kode_klpfa order by a.kode_klpfa,a.kode_lokfa";
				
				
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);
		
		$rs	= $dbLib->execute($sql1);		
		
		$path = $_SERVER["REQUEST_URI"];
		for ($i = 0; $i < 2; $i++){
			$path = substr($path,0,strrpos($path,"/"));		
		}
		echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td width='10%'><img src='$path/image/telkomindonesia.png' width='170' height='100'/></td>
					<td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>
					<table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td colspan=2 align='center' class='lokasi_laporan2'>REKAPITULASI HASIL VERIFIKASI - $jns_proc </td>						
					  </tr>					
					  <tr>
						<td width='50' class='header_laporan'>  </td>
						<td class='header_laporan'> </td>
					  </tr>					  
					</table></td>
				  </tr>
				</table></td>
			  </tr>			  
			  <tr>
				<td>&nbsp;</td>				
			  </tr>";			 
		$no = 1;
		$first = true;
		$firstRow = true;		
		$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$class = "";
		while ($row9 = $rs->FetchNextObject(true))
		{															
			$isEmpty = false;			
			if ($class != $row9->KODE_KLPFA){
				if ($class != ""){
					echo "<tr bgcolor='#cccccc'>
						 <td>&nbsp;</td>
						 <td>Total</td>
						 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
						 </tr>";
					echo "</table>";
				}
				$no = 1;
				$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
				$class = $row9->KODE_KLPFA;
				echo "<tr><td>".$row9->KODE_KLPFA."</td></tr>";				 
				echo "<tr>
				  <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'>
				  <tr align='center' bgcolor='#CCCCCC'>
					<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>NO </td>					
					<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>AREA</td>
					<td colspan='4' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>Total Kartu Aset Modul SAP AM</td>
					<td colspan='4' bgcolor='#ff6600' class='header_laporan' style='color:#ffffff'>Kertas Kerja Konversi</td>
					<td colspan='4' bgcolor='#333333' class='header_laporan' style='color:#ffffff'>Kertas Kerja Verifikasi</td>
					<td colspan='4' bgcolor='#ff9900' class='header_laporan' style='color:#ffffff'>Kertas Kerja BA Verifikasi</td>
				   </tr>
				  <tr align='center' bgcolor='#CCCCCC'>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>									
				  </tr>";			
			}
			$row  = array($row9->NKA, $row9->NILAI, $row9->NILAI_AP, $row9->NILAI_BUKU);																	
			$row2 = array($row9->NKA2, $row9->NILAI2, $row9->NILAI_AP2, $row9->NILAI_BUKU2);					
			$row3 = array($row9->NKA3, $row9->NILAI3, $row9->NILAI_AP3, $row9->NILAI_BUKU3);
			$row4 = array($row9->NKA4, $row9->NILAI4, $row9->NILAI_AP4, $row9->NILAI_BUKU4);
										
			$total[0] += $row[0];
			$total[1] += $row[1];
			$total[2] += $row[2];
			$total[3] += $row[3];
			$total[4] += $row2[0];
			$total[5] += $row2[1];
			$total[6] += $row2[2];
			$total[7] += $row2[3];
			$total[8] += $row3[0];
			$total[9] += $row3[1];
			$total[10] += $row3[2];
			$total[11] += $row3[3];	
			$total[12] += $row4[0];
			$total[13] += $row4[1];
			$total[14] += $row4[2];
			$total[15] += $row4[3];	
					
			$total2[0] += $row[0];
			$total2[1] += $row[1];
			$total2[2] += $row[2];
			$total2[3] += $row[3];
			$total2[4] += $row2[0];
			$total2[5] += $row2[1];
			$total2[6] += $row2[2];
			$total2[7] += $row2[3];
			$total2[8] += $row3[0];
			$total2[9] += $row3[1];
			$total2[10] += $row3[2];
			$total2[11] += $row3[3];			
			$total2[12] += $row4[0];
			$total2[13] += $row4[1];
			$total2[14] += $row4[2];
			$total2[15] += $row4[3];			
			echo "<tr>
				 <td class='detail_laporan'>$no</td>
				 <td class='detail_laporan'>".$row9->NAMA."</td>
				 <td align=right class='detail_laporan'>". number_format($row[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row[3],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[3],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[3],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[3],0,",",".") ."</td>
				 </tr>";
			$no++;				
		} 				
		echo "<tr bgcolor='#cccccc'>
			 <td>&nbsp;</td>
			 <td>Total</td>
			 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
				 </tr>";
		echo "</table>
				</td>
				</tr></table>";
		return "";
	}
	function getHtmlVendor(){
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];		
		$jns_proc = $jns_proc[0];
		
				
		$sql0 = "select kode_lokfa, nama as ubis
				from amu_lokasi c  ".  $this->filter ;			
		$rs = $dbLib->execute($sql0);
		$row1 = $rs->FetchNextObject(true);
				
		$sql0 = "select distinct kode_vendor from amu_alt_konv_d ";							
		$sql1 = "select kode_vendor, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select kode_Vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung
								union 
								select kode_Vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa =  a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung
								union 
								select kode_Vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi d on d.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 		
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung														
								) a group by kode_Vendor";
								
					$sql2 = "select kode_Vendor,count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select kode_Vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
								
						$sql3 = "select kode_vendor, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung
								union
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 		
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung						
								union
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung
								) a group by kode_klpfa,kode_lokfa";				
						$sql4 = "select kode_vendor, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung
								union
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 		
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung						
								union
								select kode_vendor, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								inner join amu_alt_konv_d zz on zz.no_gabung = a.no_gabung
								) a group by kode_klpfa,kode_lokfa";				
	
		$sql1 = "select '-' as kode_klpfa, '-' as kode_lokfa, kode_vendor as nama, a.nka, a.nilai, a.nilai_ap, a.nilai_buku, 
					ifnull(b.nka,0) as nka2, ifnull(b.nilai,0) as nilai2, ifnull(b.nilai_buku,0) as nilai_buku2, ifnull(b.nilai_ap,0) as nilai_ap2, 
					ifnull(c.nka,0) as nka3, ifnull(c.nilai,0) as nilai3, ifnull(c.nilai_ap,0) as nilai_ap3, ifnull(c.nilai_buku,0) as nilai_buku3,
					ifnull(d.nka,0) as nka4, ifnull(d.nilai,0) as nilai4, ifnull(d.nilai_ap,0) as nilai_ap4, ifnull(d.nilai_buku,0) as nilai_buku4 
					from 
					(".$sql0.") x 
					inner join (".$sql1.") a on a.kode_vendor = x.kode_vendor
					left outer join (".$sql2.") b on b.kode_vendor = a.kode_vendor
					left outer join (".$sql3.") c on c.kode_vendor = a.kode_vendor
					left outer join (".$sql4.") d on d.kode_vendor = a.kode_vendor order by kode_vendor";
				
				
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);
		
		$rs	= $dbLib->execute($sql1);		
		
		$path = $_SERVER["REQUEST_URI"];
		for ($i = 0; $i < 2; $i++){
			$path = substr($path,0,strrpos($path,"/"));		
		}
		echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td width='10%'><img src='$path/image/telkomindonesia.png' width='170' height='100'/></td>
					<td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>
					<table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td colspan=2 align='center' class='lokasi_laporan2'>REKAPITULASI HASIL VERIFIKASI - $jns_proc </td>						
					  </tr>					
					  <tr>
						<td width='50' class='header_laporan'>  </td>
						<td class='header_laporan'> </td>
					  </tr>					  
					</table></td>
				  </tr>
				</table></td>
			  </tr>			  
			  <tr>
				<td>&nbsp;</td>				
			  </tr>";			 
		$no = 1;
		$first = true;
		$firstRow = true;		
		$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$class = "";
		while ($row9 = $rs->FetchNextObject(true))
		{															
			$isEmpty = false;			
			if ($class != $row9->KODE_KLPFA){
				if ($class != ""){
					echo "<tr bgcolor='#cccccc'>
						 <td>&nbsp;</td>
						 <td>Total</td>
						 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
						 </tr>";
					echo "</table>";
				}
				$no = 1;
				$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
				$class = $row9->KODE_KLPFA;
				echo "<tr><td>".$row9->KODE_KLPFA."</td></tr>";				 
				echo "<tr>
				  <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'>
				  <tr align='center' bgcolor='#CCCCCC'>
					<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>NO </td>					
					<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>AREA</td>
					<td colspan='4' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>Total Kartu Aset Modul SAP AM</td>
					<td colspan='4' bgcolor='#ff6600' class='header_laporan' style='color:#ffffff'>Kertas Kerja Konversi</td>
					<td colspan='4' bgcolor='#333333' class='header_laporan' style='color:#ffffff'>Kertas Kerja Verifikasi</td>
					<td colspan='4' bgcolor='#ff9900' class='header_laporan' style='color:#ffffff'>Kertas Kerja BA Verifikasi</td>
				   </tr>
				  <tr align='center' bgcolor='#CCCCCC'>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
					<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>									
				  </tr>";			
			}
			$row  = array($row9->NKA, $row9->NILAI, $row9->NILAI_AP, $row9->NILAI_BUKU);																	
			$row2 = array($row9->NKA2, $row9->NILAI2, $row9->NILAI_AP2, $row9->NILAI_BUKU2);					
			$row3 = array($row9->NKA3, $row9->NILAI3, $row9->NILAI_AP3, $row9->NILAI_BUKU3);
			$row4 = array($row9->NKA4, $row9->NILAI4, $row9->NILAI_AP4, $row9->NILAI_BUKU4);
										
			$total[0] += $row[0];
			$total[1] += $row[1];
			$total[2] += $row[2];
			$total[3] += $row[3];
			$total[4] += $row2[0];
			$total[5] += $row2[1];
			$total[6] += $row2[2];
			$total[7] += $row2[3];
			$total[8] += $row3[0];
			$total[9] += $row3[1];
			$total[10] += $row3[2];
			$total[11] += $row3[3];	
			$total[12] += $row4[0];
			$total[13] += $row4[1];
			$total[14] += $row4[2];
			$total[15] += $row4[3];	
					
			$total2[0] += $row[0];
			$total2[1] += $row[1];
			$total2[2] += $row[2];
			$total2[3] += $row[3];
			$total2[4] += $row2[0];
			$total2[5] += $row2[1];
			$total2[6] += $row2[2];
			$total2[7] += $row2[3];
			$total2[8] += $row3[0];
			$total2[9] += $row3[1];
			$total2[10] += $row3[2];
			$total2[11] += $row3[3];			
			$total2[12] += $row4[0];
			$total2[13] += $row4[1];
			$total2[14] += $row4[2];
			$total2[15] += $row4[3];			
			echo "<tr>
				 <td class='detail_laporan'>$no</td>
				 <td class='detail_laporan'>".$row9->NAMA."</td>
				 <td align=right class='detail_laporan'>". number_format($row[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row[3],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row2[3],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row3[3],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($row4[3],0,",",".") ."</td>
				 </tr>";
			$no++;				
		} 				
		echo "<tr bgcolor='#cccccc'>
			 <td>&nbsp;</td>
			 <td>Total</td>
			 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
				 </tr>";
		echo "</table>
				</td>
				</tr></table>";
		return "";
	}
	
	function getHtmlDivisi(){
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];
		$jns_proc = $jns_proc[0];
		
				
		$sql0 = "select nama as ubis
				from amu_lokasi c  ".  $this->filter ;			
		$rs = $dbLib->execute($sql0);
		$row1 = $rs->FetchNextObject(true);
				
		$sql0 = "select nama as ubis, kode_lokfa, nama
					from amu_lokasi c 				
					 ".  $this->filter ." and kode_induk = '00'";					
				
		$sql1 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi d on d.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
								
					$sql2 = "select kode_klpfa,kode_lokfa,count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
						
						$sql4 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
										
						$sql3 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
	
		$sql1 = "select a.kode_klpfa,a.kode_lokfa,x.nama, a.nka, a.nilai, a.nilai_ap, a.nilai_buku, 
					ifnull(b.nka,0) as nka2, ifnull(b.nilai,0) as nilai2, ifnull(b.nilai_buku,0) as nilai_buku2, ifnull(b.nilai_ap,0) as nilai_ap2, 
					ifnull(c.nka,0) as nka3, ifnull(c.nilai,0) as nilai3, ifnull(c.nilai_ap,0) as nilai_ap3, ifnull(c.nilai_buku,0) as nilai_buku3,
					ifnull(d.nka,0) as nka4, ifnull(d.nilai,0) as nilai4, ifnull(d.nilai_ap,0) as nilai_ap4, ifnull(d.nilai_buku,0) as nilai_buku4  
					from 
					(".$sql0.") x 
					inner join (".$sql1.") a on a.kode_Lokfa = x.kode_lokfa 
					left outer join (".$sql2.") b on b.kode_lokfa = a.kode_lokfa and b.kode_klpfa = a.kode_klpfa
					left outer join (".$sql4.") c on c.kode_lokfa = a.kode_lokfa and c.kode_klpfa = a.kode_klpfa
					left outer join (".$sql3.") d on d.kode_lokfa = a.kode_lokfa and d.kode_klpfa = a.kode_klpfa order by a.kode_klpfa,a.kode_lokfa";
				
				
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);
		
		$rs	= $dbLib->execute($sql1);		
		
		$path = $_SERVER["REQUEST_URI"];
		for ($i = 0; $i < 2; $i++){
			$path = substr($path,0,strrpos($path,"/"));		
		}
		echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td width='10%'><img src='$path/image/telkomindonesia.png' width='170' height='100'/></td>
					<td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>
					<table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td colspan=2 align='center' class='lokasi_laporan2'>REKAPITULASI HASIL VERIFIKASI - $jns_proc </td>						
					  </tr>
					  <tr>
						<td width='50' class='header_laporan'>  </td>
						<td class='header_laporan'> </td>
					  </tr>					  
					</table></td>
				  </tr>
				</table></td>
			  </tr>			  
			  <tr>
				<td>&nbsp;</td>				
			  </tr>";			 
		$no = 1;
		$first = true;
		$firstRow = true;		
		$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$class = "";
		while ($row9 = $rs->FetchNextObject(true))
		{															
					$isEmpty = false;
					if ($class != $row9->KODE_KLPFA){
						if ($class != ""){
							echo "<tr bgcolor='#cccccc'>
								 <td>&nbsp;</td>
								 <td>Total</td>
								 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
								 </tr>";
							echo "</table>";
						}
						$no = 1;
						$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
						$class = $row9->KODE_KLPFA;
						echo "<tr><td>".$row9->KODE_KLPFA."</td></tr>";				 
						echo "<tr>
						  <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'>
						  <tr align='center' bgcolor='#CCCCCC'>
							<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>NO </td>					
							<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>AREA</td>
							<td colspan='4' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>Total Kartu Aset Modul SAP AM</td>
							<td colspan='4' bgcolor='#ff6600' class='header_laporan' style='color:#ffffff'>Kertas Kerja Konversi</td>
							<td colspan='4' bgcolor='#333333' class='header_laporan' style='color:#ffffff'>Kertas Kerja Verifikasi</td>
							<td colspan='4' bgcolor='#ff9900' class='header_laporan' style='color:#ffffff'>Kertas Kerja BA Verifikasi</td>
						   </tr>
						  <tr align='center' bgcolor='#CCCCCC'>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>					
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>					
						  </tr>";			
					}
					$row  = array($row9->NKA, $row9->NILAI, $row9->NILAI_AP, $row9->NILAI_BUKU);																	
					$row2 = array($row9->NKA2, $row9->NILAI2, $row9->NILAI_AP2, $row9->NILAI_BUKU2);					
					$row3 = array($row9->NKA3, $row9->NILAI3, $row9->NILAI_AP3, $row9->NILAI_BUKU3);
					$row4 = array($row9->NKA4, $row9->NILAI4, $row9->NILAI_AP4, $row9->NILAI_BUKU4);
												
					$total[0] += $row[0];
					$total[1] += $row[1];
					$total[2] += $row[2];
					$total[3] += $row[3];
					$total[4] += $row2[0];
					$total[5] += $row2[1];
					$total[6] += $row2[2];
					$total[7] += $row2[3];
					$total[8] += $row3[0];
					$total[9] += $row3[1];
					$total[10] += $row3[2];
					$total[11] += $row3[3];			
					$total[12] += $row4[0];
					$total[13] += $row4[1];
					$total[14] += $row4[2];
					$total[15] += $row4[3];			
					
					
					$total2[0] += $row[0];
					$total2[1] += $row[1];
					$total2[2] += $row[2];
					$total2[3] += $row[3];
					$total2[4] += $row2[0];
					$total2[5] += $row2[1];
					$total2[6] += $row2[2];
					$total2[7] += $row2[3];
					$total2[8] += $row3[0];
					$total2[9] += $row3[1];
					$total2[10] += $row3[2];
					$total2[11] += $row3[3];			
					$total2[12] += $row4[0];
					$total2[13] += $row4[1];
					$total2[14] += $row4[2];
					$total2[15] += $row4[3];			
					echo "<tr>
						 <td class='detail_laporan'>$no</td>
						 <td class='detail_laporan'>".$row9->NAMA."</td>
						 <td align=right class='detail_laporan'>". number_format($row[0],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row[1],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row[2],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row[3],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row2[0],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row2[1],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row2[2],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row2[3],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row3[0],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row3[1],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row3[2],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row3[3],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row4[0],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row4[1],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row4[2],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($row4[3],0,",",".") ."</td>
						 </tr>";
				$no++;				
		} 				
		echo "<tr bgcolor='#cccccc'>
			 <td>&nbsp;</td>
			 <td>Total</td>
			 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
			 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
				 </tr>";
		echo "</table>
				</td>
				</tr></table>";
		return "";
	}
	function createXlsDivisi(){
		global $manager;
		$manager->setSendResponse(false);
		uses("server_xls_Writer", false);
		$namafile = "Rekap KK.xls";
		$excel = new Spreadsheet_Excel_Writer();
		
		$excel->send($namafile);
		$excel->setCustomColor(14, 0,128,128); 
		
		$sheet =& $excel->addWorksheet('report');
		$hdrSAP =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'valign' => 'middle', 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 14,'pattern' => 1, 'color' => 'white'	));		
		$hdrKonv =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'orange','pattern' => 1, 'color' => 'white'	));		
		$hdrVer =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'white','fgcolor' => 'black','pattern' => 1, 'color' => 'white'	));				
		$hdrBA =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'white','fgcolor' => 'orange','pattern' => 1, 'color' => 'white'	));				
		
		$numFormat =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black'));				
		$numFormat->setNumFormat("#,##0");
		$normalFormat =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black' ));		
		$header =& $excel->addFormat(array('size' => 13,'bold' => true, 'halign' => 'center'));
		$header2 =& $excel->addFormat(array('size' => 13,'bold' => true));
		$numFormat2 =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		$numFormat2->setNumFormat("#,##0");
		$normalFormat2 =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];
		$jns_proc = $jns_proc[0];
				
		$sql0 = "select nama as ubis
				from amu_lokasi c  ".  $this->filter ;			
		$rs = $dbLib->execute($sql0);
		$row1 = $rs->FetchNextObject(true);
				
		$sql0 = "select nama as ubis, kode_lokfa, nama
					from amu_lokasi c 				
					 ".  $this->filter ." and kode_induk = '00'";					
				
		$sql1 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi d on d.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
								
					$sql2 = "select kode_klpfa,kode_lokfa,count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
						
						$sql4 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
										
						$sql3 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
	
		$sql1 = "select a.kode_klpfa,a.kode_lokfa,x.nama, a.nka, a.nilai, a.nilai_ap, a.nilai_buku, 
					ifnull(b.nka,0) as nka2, ifnull(b.nilai,0) as nilai2, ifnull(b.nilai_buku,0) as nilai_buku2, ifnull(b.nilai_ap,0) as nilai_ap2, 
					ifnull(c.nka,0) as nka3, ifnull(c.nilai,0) as nilai3, ifnull(c.nilai_ap,0) as nilai_ap3, ifnull(c.nilai_buku,0) as nilai_buku3,
					ifnull(d.nka,0) as nka4, ifnull(d.nilai,0) as nilai4, ifnull(d.nilai_ap,0) as nilai_ap4, ifnull(d.nilai_buku,0) as nilai_buku4  
					from 
					(".$sql0.") x 
					inner join (".$sql1.") a on a.kode_Lokfa = x.kode_lokfa 
					left outer join (".$sql2.") b on b.kode_lokfa = a.kode_lokfa and b.kode_klpfa = a.kode_klpfa
					left outer join (".$sql4.") c on c.kode_lokfa = a.kode_lokfa and c.kode_klpfa = a.kode_klpfa
					left outer join (".$sql3.") d on d.kode_lokfa = a.kode_lokfa and d.kode_klpfa = a.kode_klpfa order by a.kode_klpfa,a.kode_lokfa";
				
				
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);
		
		$rs	= $dbLib->execute($sql1);		
		
		$sheet->setMerge(2,2,2,12);
		$sheet->write(2,2,"REKAPITULASI HASIL VERIFIKASI - ". $jns_proc, $header);
		
		$startRow = 6;
							
		$no = 1;
		$first = true;
		$firstRow = true;		
		$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$total2 = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$class = "";
		$startingRow = $startRow;
		while ($row9 = $rs->FetchNextObject(true))
		{													
				if ($class != $row9->KODE_KLPFA){
					if ($class != ""){
						$sheet->write($startRow,0," ",$normalFormat2);
						$sheet->write($startRow,1,"Total",$normalFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,2);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 2);						
						$sheet->writeFormula($startRow, 2, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,3);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 3);						
						$sheet->writeFormula($startRow, 3, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,4);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 4);						
						$sheet->writeFormula($startRow, 4, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,5);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 5);						
						$sheet->writeFormula($startRow, 5, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,6);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 6);						
						$sheet->writeFormula($startRow, 6, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,7);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 7);						
						$sheet->writeFormula($startRow, 7, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,8);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 8);						
						$sheet->writeFormula($startRow, 8, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,9);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 9);						
						$sheet->writeFormula($startRow, 9, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,10);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 10);						
						$sheet->writeFormula($startRow, 10, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,11);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 11);						
						$sheet->writeFormula($startRow, 11, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,12);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 12);						
						$sheet->writeFormula($startRow, 12, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,13);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 13);						
						$sheet->writeFormula($startRow, 13, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,14);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 14);						
						$sheet->writeFormula($startRow, 14, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,15);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 15);						
						$sheet->writeFormula($startRow, 15, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,16);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 16);						
						$sheet->writeFormula($startRow, 16, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,17);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 17);						
						$sheet->writeFormula($startRow, 17, "=sum($start:$end)",$numFormat2);
						$startRow++;
					}
					$no = 1;
					$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
					$class = $row9->KODE_KLPFA;
					$startRow++;
					$sheet->setMerge($startRow,0,$startRow,1);	
					$sheet->write($startRow,0,"$row9->KODE_KLPFA", $header2);
					$startRow+=2;
					$sheet->setMerge($startRow,0,$startRow+1,0); $sheet->setColumn(0,0,5); $sheet->write($startRow,0,"No", $hdrSAP);
					$sheet->setMerge($startRow,1,$startRow+1,1); $sheet->setColumn(1,1,30);$sheet->write($startRow,1,$model, $hdrSAP);
					$sheet->setMerge($startRow,2,$startRow,5); $sheet->write($startRow,2,"Total Kartu Aset Modul SAP AM", $hdrSAP);
					$sheet->setColumn(2,2,20);$sheet->write($startRow+1,2,"Jumlah NKA", $hdrSAP);
					$sheet->setColumn(3,3,20);$sheet->write($startRow+1,3,"Nilai Perolehan", $hdrSAP);
					$sheet->setColumn(4,4,20);$sheet->write($startRow+1,4,"Akumulasi Penyusutan", $hdrSAP);
					$sheet->setColumn(5,5,20);$sheet->write($startRow+1,5,"Nilai Buku", $hdrSAP);
					
					$sheet->setMerge($startRow,6,$startRow,9); $sheet->write($startRow,6,"Kertas Kerja Konversi", $hdrKonv);
					$sheet->setColumn(6,6,20);$sheet->write($startRow+1,6,"Jumlah NKA", $hdrKonv);
					$sheet->setColumn(7,7,20);$sheet->write($startRow+1,7,"Nilai Perolehan", $hdrKonv);
					$sheet->setColumn(8,8,20);$sheet->write($startRow+1,8,"Akumulasi Penyusutan", $hdrKonv);
					$sheet->setColumn(9,9,20);$sheet->write($startRow+1,9,"Nilai Buku", $hdrKonv);
					
					$sheet->setMerge($startRow,10,$startRow,13); $sheet->write($startRow,10,"Kertas Kerja Verifikasi", $hdrVer);
					$sheet->setColumn(10,10,20);$sheet->write($startRow+1,10,"Jumlah NKA", $hdrVer);
					$sheet->setColumn(11,11,20);$sheet->write($startRow+1,11,"Nilai Perolehan", $hdrVer);
					$sheet->setColumn(12,12,20);$sheet->write($startRow+1,12,"Akumulasi Penyusutan", $hdrVer);
					$sheet->setColumn(13,13,20);$sheet->write($startRow+1,13,"Nilai Buku", $hdrVer);				
					
					$sheet->setMerge($startRow,14,$startRow,17); $sheet->write($startRow,14,"Kertas Kerja BA Verifikasi", $hdrBA);
					$sheet->setColumn(14,14,20);$sheet->write($startRow+1,14,"Jumlah NKA", $hdrBA);
					$sheet->setColumn(15,15,20);$sheet->write($startRow+1,15,"Nilai Perolehan", $hdrBA);
					$sheet->setColumn(16,16,20);$sheet->write($startRow+1,16,"Akumulasi Penyusutan", $hdrBA);
					$sheet->setColumn(17,17,20);$sheet->write($startRow+1,17,"Nilai Buku", $hdrBA);				
					$startRow += 2;
					$startingRow = $startRow;
				}   
				$row  = array($row9->NKA, $row9->NILAI, $row9->NILAI_AP, $row9->NILAI_BUKU);																	
				$row2 = array($row9->NKA2, $row9->NILAI2, $row9->NILAI_AP2, $row9->NILAI_BUKU2);					
				$row3 = array($row9->NKA3, $row9->NILAI3, $row9->NILAI_AP3, $row9->NILAI_BUKU3);
				$row4 = array($row9->NKA4, $row9->NILAI4, $row9->NILAI_AP4, $row9->NILAI_BUKU4);
															
				$sheet->write($startRow,0,$no,$normalFormat);
				$sheet->write($startRow,1,$row9->KODE_LOKFA,$normalFormat);
				$sheet->write($startRow,2,$row[0],$numFormat);
				$sheet->write($startRow,3,$row[1],$numFormat);
				$sheet->write($startRow,4,$row[2],$numFormat);
				$sheet->write($startRow,5,$row[3],$numFormat);
				$sheet->write($startRow,6,$row2[0],$numFormat);
				$sheet->write($startRow,7,$row2[1],$numFormat);
				$sheet->write($startRow,8,$row2[2],$numFormat);
				$sheet->write($startRow,9,$row2[3],$numFormat);
				$sheet->write($startRow,10,$row3[0],$numFormat);
				$sheet->write($startRow,11,$row3[1],$numFormat);
				$sheet->write($startRow,12,$row3[2],$numFormat);
				$sheet->write($startRow,13,$row3[3],$numFormat);
				$sheet->write($startRow,14,$row4[0],$numFormat);
				$sheet->write($startRow,15,$row4[1],$numFormat);
				$sheet->write($startRow,16,$row4[2],$numFormat);
				$sheet->write($startRow,17,$row4[3],$numFormat);
				$no++;
				$startRow++;
		} 						
		$sheet->write($startRow,0," ",$normalFormat2);
		$sheet->write($startRow,1,"Total",$normalFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,2);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 2);						
		$sheet->writeFormula($startRow, 2, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,3);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 3);						
		$sheet->writeFormula($startRow, 3, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,4);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 4);						
		$sheet->writeFormula($startRow, 4, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,5);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 5);						
		$sheet->writeFormula($startRow, 5, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,6);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 6);						
		$sheet->writeFormula($startRow, 6, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,7);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 7);						
		$sheet->writeFormula($startRow, 7, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,8);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 8);						
		$sheet->writeFormula($startRow, 8, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,9);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 9);						
		$sheet->writeFormula($startRow, 9, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,10);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 10);						
		$sheet->writeFormula($startRow, 10, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,11);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 11);						
		$sheet->writeFormula($startRow, 11, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,12);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 12);						
		$sheet->writeFormula($startRow, 12, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,13);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 13);						
		$sheet->writeFormula($startRow, 13, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,14);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 14);						
		$sheet->writeFormula($startRow, 14, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,15);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 15);						
		$sheet->writeFormula($startRow, 15, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,16);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 16);						
		$sheet->writeFormula($startRow, 16, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,17);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 17);						
		$sheet->writeFormula($startRow, 17, "=sum($start:$end)",$numFormat2);
		$sheet->insertBitmap(0,0,"../image/telkom2.bmp",0,0,1,1);
		$excel->close();
	}		
	function createXlsRegional(){
		global $manager;
		$manager->setSendResponse(false);
		uses("server_xls_Writer", false);
		$namafile = "Rekap KK.xls";
		$excel = new Spreadsheet_Excel_Writer();
		
		$excel->send($namafile);
		$excel->setCustomColor(14, 0,128,128); 
		
		$sheet =& $excel->addWorksheet('report');
		$hdrSAP =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 14,'pattern' => 1, 'color' => 'white'	));		
		$hdrKonv =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'orange','pattern' => 1, 'color' => 'white'	));		
		$hdrVer =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'white','fgcolor' => 'black','pattern' => 1, 'color' => 'white'	));				
		$hdrBA =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'white','fgcolor' => 'orange','pattern' => 1, 'color' => 'white'	));				
		
		$numFormat =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black'));				
		$numFormat->setNumFormat("#,##0");
		$normalFormat =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black' ));		
		$header =& $excel->addFormat(array('size' => 13,'bold' => true, 'halign' => 'center'));
		$header2 =& $excel->addFormat(array('size' => 13,'bold' => true));
		$numFormat2 =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		$numFormat2->setNumFormat("#,##0");
		$normalFormat2 =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];
		$jns_proc = $jns_proc[0];
				
		$sql0 = "select kode_lokfa, nama as ubis
				from amu_lokasi c  ".  $this->filter ;			
		$rs = $dbLib->execute($sql0);
		$row1 = $rs->FetchNextObject(true);
				
		$sql0 = "select c.nama as ubis, c.kode_lokfa as divisi, b.kode_lokfa, b.nama
					from amu_lokasi c 				
					inner join amu_lokasi b on b.kode_induk = c.kode_lokfa 
					 ".  $this->filter ." and c.kode_induk = '00'";					
		$diva = $row1->KODE_LOKFA == "T902" || $row1->KODE_LOKFA == "DIVA" || $row1->KODE_LOKFA == "T903" || $row1->KODE_LOKFA == "T904";
		$sql1 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa =  ".($diva ? "a.ref1":"a.kode_lokfa") ." 
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,d.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi d on d.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = d.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
								
					$sql2 = "select kode_klpfa,kode_lokfa,count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa, c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 								
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1": "a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union 
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as  kode_klpfa,dd.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 																
								) a group by kode_klpfa,kode_lokfa";
								
						$sql3 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1": "a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,dd.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
					$sql4 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,c.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi c on c.kode_lokfa = a.kode_lokfa and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,b.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1": "a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								union
								select ".($jns_proc == "Sentral" ? "'-'" : "z.nama")." as kode_klpfa,dd.kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = a.kode_lokfa
								inner join amu_lokasi dd on dd.kode_lokfa = b.kode_induk
								inner join amu_lokasi c on c.kode_lokfa = dd.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'								
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 								
								
								) a group by kode_klpfa,kode_lokfa";				
	
		$sql1 = "select a.kode_klpfa,x.kode_lokfa, x.nama, a.nka, a.nilai, a.nilai_ap, a.nilai_buku, 
					ifnull(b.nka,0) as nka2, ifnull(b.nilai,0) as nilai2, ifnull(b.nilai_buku,0) as nilai_buku2, ifnull(b.nilai_ap,0) as nilai_ap2, 
					ifnull(c.nka,0) as nka3, ifnull(c.nilai,0) as nilai3, ifnull(c.nilai_ap,0) as nilai_ap3, ifnull(c.nilai_buku,0) as nilai_buku3,
					ifnull(d.nka,0) as nka4, ifnull(d.nilai,0) as nilai4, ifnull(d.nilai_ap,0) as nilai_ap4, ifnull(d.nilai_buku,0) as nilai_buku4 
					from 
					(".$sql0.") x 
					inner join (".$sql1.") a on a.kode_lokfa = x.kode_lokfa 
					left outer join (".$sql2.") b on b.kode_lokfa = a.kode_lokfa and b.kode_klpfa = a.kode_klpfa
					left outer join (".$sql3.") c on c.kode_lokfa = a.kode_lokfa and c.kode_klpfa = a.kode_klpfa 
					left outer join (".$sql4.") d on d.kode_lokfa = a.kode_lokfa and d.kode_klpfa = a.kode_klpfa order by a.kode_klpfa,a.kode_lokfa";
				
				
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);		
		
		$rs	= $dbLib->execute($sql1);		
		
		$sheet->setMerge(2,2,2,12);
		$sheet->write(2,2,"REKAPITULASI HASIL VERIFIKASI - ". $jns_proc, $header);
		
		$startRow = 6;
							
		$no = 1;
		$first = true;
		$firstRow = true;		
		$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$total2 = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$class = "";
		while ($row9 = $rs->FetchNextObject(true))
		{												
				
				if ($class != $row9->KODE_KLPFA){
					if ($class != ""){
											
						$sheet->write($startRow,0," ",$normalFormat2);
						$sheet->write($startRow,1,"Total",$normalFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,2);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 2);						
						$sheet->writeFormula($startRow, 2, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,3);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 3);						
						$sheet->writeFormula($startRow, 3, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,4);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 4);						
						$sheet->writeFormula($startRow, 4, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,5);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 5);						
						$sheet->writeFormula($startRow, 5, "=sum($start:$end)",$numFormat2);						
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,6);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 6);						
						$sheet->writeFormula($startRow, 6, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,7);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 7);						
						$sheet->writeFormula($startRow, 7, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,8);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 8);						
						$sheet->writeFormula($startRow, 8, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,9);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 9);						
						$sheet->writeFormula($startRow, 9, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,10);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 10);						
						$sheet->writeFormula($startRow, 10, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,11);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 11);						
						$sheet->writeFormula($startRow, 11, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,12);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 12);						
						$sheet->writeFormula($startRow, 12, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,13);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 13);						
						$sheet->writeFormula($startRow, 13, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,14);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 14);						
						$sheet->writeFormula($startRow, 14, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,15);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 15);
						$sheet->writeFormula($startRow, 15, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,16);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 16);
						$sheet->writeFormula($startRow, 16, "=sum($start:$end)",$numFormat2);
						$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,17);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 17);						
						$sheet->writeFormula($startRow, 17, "=sum($start:$end)",$numFormat2);
						$startRow++;
					}
					$no = 1;
					$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
					$class = $row9->KODE_KLPFA;
					$startRow++;
					$sheet->setMerge($startRow,0,$startRow,1);	
					$sheet->write($startRow,0,"$row9->KODE_KLPFA", $header2);
					$startRow+=2;
					$sheet->setMerge($startRow,0,$startRow+1,0); $sheet->setColumn(0,0,5); $sheet->write($startRow,0,"No", $hdrSAP);
					$sheet->setMerge($startRow,1,$startRow+1,1); $sheet->setColumn(1,1,30);$sheet->write($startRow,1,$model, $hdrSAP);
					$sheet->setMerge($startRow,2,$startRow,5); $sheet->write($startRow,2,"Total Kartu Aset Modul SAP AM", $hdrSAP);
					$sheet->setColumn(2,2,20);$sheet->write($startRow+1,2,"Jumlah NKA", $hdrSAP);
					$sheet->setColumn(3,3,20);$sheet->write($startRow+1,3,"Nilai Perolehan", $hdrSAP);
					$sheet->setColumn(4,4,20);$sheet->write($startRow+1,4,"Akumulasi Penyusutan", $hdrSAP);
					$sheet->setColumn(5,5,20);$sheet->write($startRow+1,5,"Nilai Buku", $hdrSAP);
					
					$sheet->setMerge($startRow,6,$startRow,9); $sheet->write($startRow,6,"Kertas Kerja Konversi", $hdrKonv);
					$sheet->setColumn(6,6,20);$sheet->write($startRow+1,6,"Jumlah NKA", $hdrKonv);
					$sheet->setColumn(7,7,20);$sheet->write($startRow+1,7,"Nilai Perolehan", $hdrKonv);
					$sheet->setColumn(8,8,20);$sheet->write($startRow+1,8,"Akumulasi Penyusutan", $hdrKonv);
					$sheet->setColumn(9,9,20);$sheet->write($startRow+1,9,"Nilai Buku", $hdrKonv);
					
					$sheet->setMerge($startRow,10,$startRow,13); $sheet->write($startRow,10,"Kertas Kerja Verifikasi", $hdrVer);
					$sheet->setColumn(10,10,20);$sheet->write($startRow+1,10,"Jumlah NKA", $hdrVer);
					$sheet->setColumn(11,11,20);$sheet->write($startRow+1,11,"Nilai Perolehan", $hdrVer);
					$sheet->setColumn(12,12,20);$sheet->write($startRow+1,12,"Akumulasi Penyusutan", $hdrVer);
					$sheet->setColumn(13,13,20);$sheet->write($startRow+1,13,"Nilai Buku", $hdrVer);				
					
					$sheet->setMerge($startRow,14,$startRow,17); $sheet->write($startRow,14,"Kertas Kerja BA Verifikasi", $hdrBA);
					$sheet->setColumn(14,14,20);$sheet->write($startRow+1,14,"Jumlah NKA", $hdrBA);
					$sheet->setColumn(15,15,20);$sheet->write($startRow+1,15,"Nilai Perolehan", $hdrBA);
					$sheet->setColumn(16,16,20);$sheet->write($startRow+1,16,"Akumulasi Penyusutan", $hdrBA);
					$sheet->setColumn(17,17,20);$sheet->write($startRow+1,17,"Nilai Buku", $hdrBA);				
					$startRow += 2;
					$startingRow = $startRow;
				}   
				$row  = array($row9->NKA, $row9->NILAI, $row9->NILAI_AP, $row9->NILAI_BUKU);																	
				$row2 = array($row9->NKA2, $row9->NILAI2, $row9->NILAI_AP2, $row9->NILAI_BUKU2);					
				$row3 = array($row9->NKA3, $row9->NILAI3, $row9->NILAI_AP3, $row9->NILAI_BUKU3);
				$row4 = array($row9->NKA4, $row9->NILAI4, $row9->NILAI_AP4, $row9->NILAI_BUKU4);
															
				$sheet->write($startRow,0,$no,$normalFormat);
				$sheet->write($startRow,1,$row9->NAMA,$normalFormat);
				$sheet->write($startRow,2,$row[0],$numFormat);
				$sheet->write($startRow,3,$row[1],$numFormat);
				$sheet->write($startRow,4,$row[2],$numFormat);
				$sheet->write($startRow,5,$row[3],$numFormat);
				$sheet->write($startRow,6,$row2[0],$numFormat);
				$sheet->write($startRow,7,$row2[1],$numFormat);
				$sheet->write($startRow,8,$row2[2],$numFormat);
				$sheet->write($startRow,9,$row2[3],$numFormat);
				$sheet->write($startRow,10,$row3[0],$numFormat);
				$sheet->write($startRow,11,$row3[1],$numFormat);
				$sheet->write($startRow,12,$row3[2],$numFormat);
				$sheet->write($startRow,13,$row3[3],$numFormat);
				$sheet->write($startRow,14,$row4[0],$numFormat);
				$sheet->write($startRow,15,$row4[1],$numFormat);
				$sheet->write($startRow,16,$row4[2],$numFormat);
				$sheet->write($startRow,17,$row4[3],$numFormat);
				$no++;
				$startRow++;
		} 						
		$sheet->write($startRow,0," ",$normalFormat2);
		$sheet->write($startRow,1,"Total",$normalFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,2);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 2);						
		$sheet->writeFormula($startRow, 2, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,3);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 3);						
		$sheet->writeFormula($startRow, 3, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,4);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 4);						
		$sheet->writeFormula($startRow, 4, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,5);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 5);						
		$sheet->writeFormula($startRow, 5, "=sum($start:$end)",$numFormat2);						
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,6);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 6);						
		$sheet->writeFormula($startRow, 6, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,7);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 7);						
		$sheet->writeFormula($startRow, 7, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,8);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 8);						
		$sheet->writeFormula($startRow, 8, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,9);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 9);						
		$sheet->writeFormula($startRow, 9, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,10);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 10);						
		$sheet->writeFormula($startRow, 10, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,11);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 11);						
		$sheet->writeFormula($startRow, 11, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,12);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 12);						
		$sheet->writeFormula($startRow, 12, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,13);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 13);						
		$sheet->writeFormula($startRow, 13, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,14);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 14);						
		$sheet->writeFormula($startRow, 14, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,15);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 15);						
		$sheet->writeFormula($startRow, 15, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,16);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 16);						
		$sheet->writeFormula($startRow, 16, "=sum($start:$end)",$numFormat2);
		$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,17);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 17);						
		$sheet->writeFormula($startRow, 17, "=sum($start:$end)",$numFormat2);
		$sheet->insertBitmap(0,0,"../image/telkom2.bmp",0,0,1,1);
		$excel->close();
	}		
	function getHtmlArea(){
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];
		$jns_proc = $jns_proc[0];
		
				
		$sql0 = "select nama as ubis
				from amu_lokasi c  ".  $this->filter ;			
		$rs = $dbLib->execute($sql0);
		$row1 = $rs->FetchNextObject(true);
						
		$sql1 = "select b.kode_lokfa, b.nama, c.nama as ubis, c.kode_lokfa as divisi
				from amu_lokasi c 
				left outer join amu_lokasi b on b.kode_induk = c.kode_lokfa  ".  $this->filter ." and c.kode_induk = '00' order by ubis ";			
		
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);		
		$path = $_SERVER["REQUEST_URI"];
		for ($i = 0; $i < 2; $i++){
			$path = substr($path,0,strrpos($path,"/"));		
		}
		echo "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td width='10%'><img src='$path/image/telkomindonesia.png' width='170' height='100'/></td>
					<td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>
					<table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td colspan=2 align='center' class='lokasi_laporan2'>REKAPITULASI HASIL VERIFIKASI - $jns_proc </td>						
					  </tr>					
					  <tr>
						<td width='50' class='header_laporan'>UBIS </td>
						<td class='header_laporan'>: ".$row1->UBIS."</td>
					  </tr>					  
					</table></td>
				  </tr>
				</table></td>
			  </tr>			  
			  <tr>
				<td>&nbsp;</td>				
			  </tr>";
		$no = 1;
		$first = true;
		$firstRow = true;		
		$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		while ($row1 = $rs1->FetchNextObject(true))
		{									
				$diva = 	substr($row1->KODE_LOKFA,0,2) == "TD" || substr($row1->KODE_LOKFA,0,2) == "TC" || substr($row1->KODE_LOKFA,0,3) == "T90";
				$sql1 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								left outer join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								where b.kode_lokfa = '".$row1->KODE_LOKFA  ."' 
								union 
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
								inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_induk = '00'					
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								left outer join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								where c.kode_lokfa = '".$row1->KODE_LOKFA  ."' 
								) a group by kode_klpfa,kode_lokfa";
								
					$sql2 = "select kode_klpfa,kode_lokfa,count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
								select z.nama as  kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								union 
								select z.nama as  kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
								inner join amu_lokasi dd on dd.kode_lokfa = c.kode_induk and dd.kode_induk = '00'					
								inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								
								) a group by kode_klpfa,kode_lokfa";
								
						$sql3 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								union
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
								inner join amu_lokasi dd on dd.kode_lokfa = c.kode_induk and dd.kode_induk = '00'					
								inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								
								) a group by kode_klpfa,kode_lokfa";				
				$sql4 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								union
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
								inner join amu_lokasi dd on dd.kode_lokfa = c.kode_induk and dd.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								
								) a group by kode_klpfa,kode_lokfa";				
				$sql1 = "select a.kode_klpfa,a.kode_lokfa, a.nka, a.nilai, a.nilai_ap, a.nilai_buku, 
						ifnull(b.nka,0) as nka2, ifnull(b.nilai,0) as nilai2, ifnull(b.nilai_buku,0) as nilai_buku2, ifnull(b.nilai_ap,0) as nilai_ap2, 
						ifnull(c.nka,0) as nka3, ifnull(c.nilai,0) as nilai3, ifnull(c.nilai_ap,0) as nilai_ap3, ifnull(c.nilai_buku,0) as nilai_buku3, 
						ifnull(d.nka,0) as nka4, ifnull(d.nilai,0) as nilai4, ifnull(d.nilai_ap,0) as nilai_ap4, ifnull(d.nilai_buku,0) as nilai_buku4 
						from 
						(".$sql1.") a 
						left outer join (".$sql2.") b on b.kode_lokfa = a.kode_lokfa and b.kode_klpfa = a.kode_klpfa
						left outer join (".$sql3.") c on c.kode_lokfa = a.kode_lokfa and c.kode_klpfa = a.kode_klpfa
						left outer join (".$sql4.") d on d.kode_lokfa = a.kode_lokfa and d.kode_klpfa = a.kode_klpfa order by a.kode_klpfa,a.kode_lokfa";
				$rs = $dbLib->execute($sql1);
				$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
				$no = 1;
				$class = "";
				$isEmpty = true;
				if (!$rs->EOF) echo "<tr><td>".$row1->NAMA."</td></tr>";				 
				while ($row9 = $rs->FetchNextObject(true)){
					$isEmpty = false;
					if ($class != $row9->KODE_KLPFA){
						if ($class != ""){
							echo "<tr bgcolor='#cccccc'>
								 <td>&nbsp;</td>
								 <td>Total</td>
								 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
								 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
								 </tr>";
							echo "</table>";
						}
						$no = 1;
						$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
						$class = $row9->KODE_KLPFA;
						echo "<tr><td>".$row9->KODE_KLPFA."</td></tr>";				 
						echo "<tr>
						  <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'>
						  <tr align='center' bgcolor='#CCCCCC'>
							<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>NO </td>					
							<td rowspan='2' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>AREA</td>
							<td colspan='4' bgcolor='#008080' class='header_laporan' style='color:#ffffff'>Total Kartu Aset Modul SAP AM</td>
							<td colspan='4' bgcolor='#ff6600' class='header_laporan' style='color:#ffffff'>Kertas Kerja Konversi</td>
							<td colspan='4' bgcolor='#333333' class='header_laporan' style='color:#ffffff'>Kertas Kerja Verifikasi</td>
							<td colspan='4' bgcolor='#ff9900' class='header_laporan' style='color:#ffffff'>Kertas Kerja BA Verifikasi</td>
						   </tr>
						  <tr align='center' bgcolor='#CCCCCC'>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#008080' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#ff6600' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#333333' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>					
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Jumlah NKA</td>
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Perolehan</td>
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Akumulasi Penyusutan</td>
							<td bgcolor='#ff9900' style='color:#ffffff' class='header_laporan' >Nilai Buku</td>					
						  </tr>";			
					}
						$row  = array($row9->NKA, $row9->NILAI, $row9->NILAI_AP, $row9->NILAI_BUKU);																	
						$row2 = array($row9->NKA2, $row9->NILAI2, $row9->NILAI_AP2, $row9->NILAI_BUKU2);					
						$row3 = array($row9->NKA3, $row9->NILAI3, $row9->NILAI_AP3, $row9->NILAI_BUKU3);
						$row4 = array($row9->NKA4, $row9->NILAI4, $row9->NILAI_AP4, $row9->NILAI_BUKU4);
													
						$total[0] += $row[0];
						$total[1] += $row[1];
						$total[2] += $row[2];
						$total[3] += $row[3];
						$total[4] += $row2[0];
						$total[5] += $row2[1];
						$total[6] += $row2[2];
						$total[7] += $row2[3];
						$total[8] += $row3[0];
						$total[9] += $row3[1];
						$total[10] += $row3[2];
						$total[11] += $row3[3];			
						$total[12] += $row4[0];
						$total[13] += $row4[1];
						$total[14] += $row4[2];
						$total[15] += $row4[3];			
						
						$total2[0] += $row[0];
						$total2[1] += $row[1];
						$total2[2] += $row[2];
						$total2[3] += $row[3];
						$total2[4] += $row2[0];
						$total2[5] += $row2[1];
						$total2[6] += $row2[2];
						$total2[7] += $row2[3];
						$total2[8] += $row3[0];
						$total2[9] += $row3[1];
						$total2[10] += $row3[2];
						$total2[11] += $row3[3];			
						$total2[12] += $row4[0];
						$total2[13] += $row4[1];
						$total2[14] += $row4[2];
						$total2[15] += $row4[3];			
						echo "<tr>
							 <td>$no</td>
							 <td>".$row9->KODE_LOKFA."</td>
							 <td align=right class='detail_laporan'>". number_format($row[0],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row[1],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row[2],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row[3],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row2[0],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row2[1],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row2[2],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row2[3],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row3[0],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row3[1],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row3[2],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row3[3],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row4[0],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row4[1],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row4[2],0,",",".") ."</td>
							 <td align=right class='detail_laporan'>". number_format($row4[3],0,",",".") ."</td>
							 </tr>";
						$no++;									
				}
				if (!$isEmpty){				
					echo "<tr bgcolor='#cccccc'>
						 <td>&nbsp;</td>
						 <td>Total</td>
						 <td align=right class='detail_laporan'>". number_format($total[0],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[1],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[2],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[3],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[4],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[5],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[6],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[7],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[8],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[9],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[10],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[11],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[12],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[13],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[14],0,",",".") ."</td>
						 <td align=right class='detail_laporan'>". number_format($total[15],0,",",".") ."</td>
						 </tr>";
					echo "</table>";			
				}
		} 				
		echo "<tr><td>&nbsp;</td></tr><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'><tr bgcolor='#cccccc'>
				 <td>&nbsp;</td>
				 <td>Total</td>
				 <td align=right class='detail_laporan'>". number_format($total2[0],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[1],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[2],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[3],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[4],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[5],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[6],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[7],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[8],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[9],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[10],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[11],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[12],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[13],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[14],0,",",".") ."</td>
				 <td align=right class='detail_laporan'>". number_format($total2[15],0,",",".") ."</td>
				 </tr></table>";		
		echo "</table>
				</td>
				</tr></table>";
		return "";
	}	
	function createXlsArea(){
		global $manager;
		$manager->setSendResponse(false);
		uses("server_xls_Writer", false);
		$namafile = "Rekap KK.xls";
		$excel = new Spreadsheet_Excel_Writer();
		
		$excel->send($namafile);
		$excel->setCustomColor(14, 0,128,128); 
		
		$sheet =& $excel->addWorksheet('report');
		$hdrSAP =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 14,'pattern' => 1, 'color' => 'white'	));		
		$hdrKonv =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'orange','pattern' => 1, 'color' => 'white'	));		
		$hdrVer =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'white','fgcolor' => 'black','pattern' => 1, 'color' => 'white'	));				
		$hdrBA =& $excel->addFormat(array('size' => 10,'bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'white','fgcolor' => 'orange','pattern' => 1, 'color' => 'white'	));				
		
		$numFormat =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black'));				
		$numFormat->setNumFormat("#,##0");
		$normalFormat =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black' ));		
		$header =& $excel->addFormat(array('size' => 13,'bold' => true, 'halign' => 'center'));
		$header2 =& $excel->addFormat(array('size' => 13,'bold' => true));
		$numFormat2 =& $excel->addFormat(array('numformat' => '0.00', 'border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		$numFormat2->setNumFormat("#,##0");
		$normalFormat2 =& $excel->addFormat(array('border' => true, 'bordercolor' => 'black','fgcolor' => 'grey','pattern' => 1, 'color' => 'black'	));				
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();
		$jns_proc = explode(",",$this->filter2);
		$periode = $jns_proc[1];
		$model = $jns_proc[2];
		$filterBA = $jns_proc[3];
		$jns_proc = $jns_proc[0];
				
		$sql0 = "select nama as ubis
				from amu_lokasi c  ".  $this->filter ;			
		$rs = $dbLib->execute($sql0);
		$row1 = $rs->FetchNextObject(true);
		
		$sql1 = "select b.kode_lokfa, b.nama, c.nama as ubis, c.kode_lokfa as divisi
				from amu_lokasi c 
				left outer join amu_lokasi b on b.kode_induk = c.kode_lokfa  ".  $this->filter ." and c.kode_induk = '00' order by ubis ";			
		$sql1=  str_replace("\t","",$sql1);			
		$start = (($this->page-1) * $this->rows);
		$rs1=$dbLib->LimitQuery($sql1,$this->rows,$start);		
		
		$sheet->setMerge(2,2,2,12);
		$sheet->write(2,2,"REKAPITULASI HASIL VERIFIKASI - ". $jns_proc, $header);
		
		$startRow = 6;
							
		$no = 1;
		$first = true;
		$firstRow = true;		
		$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		$total2 = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
		while ($row1 = $rs1->FetchNextObject(true))
		{							
				
			$diva = 	substr($row1->KODE_LOKFA,0,2) == "TD" || substr($row1->KODE_LOKFA,0,2) == "TC" || substr($row1->KODE_LOKFA,0,3) == "T90";
			$sql1 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
							select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
							inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
							inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
							inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
							inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
							inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
							left outer join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
							where b.kode_lokfa = '".$row1->KODE_LOKFA  ."' 
							union 
							select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
							inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
							inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
							inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_induk = '00'					
							inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
							inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
							inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
							left outer join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
							where c.kode_lokfa = '".$row1->KODE_LOKFA  ."' 
							) a group by kode_klpfa,kode_lokfa";
							
				$sql2 = "select kode_klpfa,kode_lokfa,count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (								
							select z.nama as  kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
							inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
							inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
							inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
							inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
							inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
							inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
							inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
							where a.ref1 = '".$row1->KODE_LOKFA ."' 
							union 
							select z.nama as  kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
							inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
							inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
							inner join amu_lokasi dd on dd.kode_lokfa = c.kode_induk and dd.kode_induk = '00'					
							inner join amu_alt_konv_d d on d.no_gabung = a.no_gabung 
							inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
							inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
							inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
							inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
							where a.ref1 = '".$row1->KODE_LOKFA ."' 
							
							) a group by kode_klpfa,kode_lokfa";
							
					$sql3 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
							select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
							inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
							inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
							inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
							inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
							inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
							inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
							inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
							where a.ref1 = '".$row1->KODE_LOKFA ."' 
							union
							select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
							inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
							inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
							inner join amu_lokasi dd on dd.kode_lokfa = c.kode_induk and dd.kode_induk = '00'					
							inner join amu_alt_ver_d d on d.no_gabung = a.no_gabung 
							inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
							inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
							inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
							inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
							where a.ref1 = '".$row1->KODE_LOKFA ."' 
							
							) a group by kode_klpfa,kode_lokfa";				
				$sql4 = "select kode_klpfa,kode_lokfa, count(no_gabung) as nka, sum(nilai) as nilai, sum(nilai_ap) as nilai_ap, sum(nilai_buku) as nilai_buku from (
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk and c.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								union
								select z.nama as kode_klpfa,ifnull(x.dcs_area,'Kantor Regional') as kode_lokfa, a.no_gabung, a.nilai, a.nilai_ap, a.nilai_buku from amu_asset a 
								inner join amu_lokasi b on b.kode_lokfa = ". ($diva ? "a.ref1":"a.kode_lokfa"). "
								inner join amu_lokasi c on c.kode_lokfa = b.kode_induk
								inner join amu_lokasi dd on dd.kode_lokfa = c.kode_induk and dd.kode_induk = '00'					
								inner join amu_alt_baver_d d on d.no_gabung = a.no_gabung 
								inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode and k.jenis_proc = '$jns_proc'
								inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) l on l.kode_klpfa = a.kode_klpfa and l.jenis_proc = 'ALTERNATIF'
								inner join xlocation x on x.location = a.ref2 and  x.plnt = a.ref1
								inner join amu_klp z on z.kode_klpfa = a.kode_klpfa 
								where a.ref1 = '".$row1->KODE_LOKFA ."' 
								
								) a group by kode_klpfa,kode_lokfa";				
				$sql1 = "select a.kode_klpfa,a.kode_lokfa, a.nka, a.nilai, a.nilai_ap, a.nilai_buku, 
						ifnull(b.nka,0) as nka2, ifnull(b.nilai,0) as nilai2, ifnull(b.nilai_buku,0) as nilai_buku2, ifnull(b.nilai_ap,0) as nilai_ap2, 
						ifnull(c.nka,0) as nka3, ifnull(c.nilai,0) as nilai3, ifnull(c.nilai_ap,0) as nilai_ap3, ifnull(c.nilai_buku,0) as nilai_buku3, 
						ifnull(d.nka,0) as nka4, ifnull(d.nilai,0) as nilai4, ifnull(d.nilai_ap,0) as nilai_ap4, ifnull(d.nilai_buku,0) as nilai_buku4 
						from 
						(".$sql1.") a 
						left outer join (".$sql2.") b on b.kode_lokfa = a.kode_lokfa and b.kode_klpfa = a.kode_klpfa
						left outer join (".$sql3.") c on c.kode_lokfa = a.kode_lokfa and c.kode_klpfa = a.kode_klpfa
						left outer join (".$sql4.") d on d.kode_lokfa = a.kode_lokfa and d.kode_klpfa = a.kode_klpfa order by a.kode_klpfa,a.kode_lokfa";
						
			$rs = $dbLib->execute($sql1);
			$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
			$no = 1;
			$class = "";
			if ($rs->EOF){
				
			}else{
				$startRow++;
				$sheet->setMerge($startRow,0,$startRow,1);	
				$sheet->write($startRow,0,$row1->NAMA, $header2);	
				$startRow++;
				$startingRow = $startRow;
				while ($row9 = $rs->FetchNextObject(true)){
					if ($class != $row9->KODE_KLPFA){
						if ($class != ""){
							$sheet->write($startRow,0," ",$normalFormat2);
							$sheet->write($startRow,1,"Total",$normalFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,2);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 2);						
							$sheet->writeFormula($startRow, 2, "=sum($start:$end)",$numFormat2);						
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,3);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 3);						
							$sheet->writeFormula($startRow, 3, "=sum($start:$end)",$numFormat2);						
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,4);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 4);						
							$sheet->writeFormula($startRow, 4, "=sum($start:$end)",$numFormat2);						
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,5);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 5);						
							$sheet->writeFormula($startRow, 5, "=sum($start:$end)",$numFormat2);						
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,6);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 6);						
							$sheet->writeFormula($startRow, 6, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,7);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 7);						
							$sheet->writeFormula($startRow, 7, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,8);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 8);						
							$sheet->writeFormula($startRow, 8, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,9);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 9);						
							$sheet->writeFormula($startRow, 9, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,10);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 10);						
							$sheet->writeFormula($startRow, 10, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,11);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 11);						
							$sheet->writeFormula($startRow, 11, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,12);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 12);						
							$sheet->writeFormula($startRow, 12, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,13);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 13);						
							$sheet->writeFormula($startRow, 13, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,14);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 14);						
							$sheet->writeFormula($startRow, 14, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,15);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 15);
							$sheet->writeFormula($startRow, 15, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,16);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 16);
							$sheet->writeFormula($startRow, 16, "=sum($start:$end)",$numFormat2);
							$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,17);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 17);						
							$sheet->writeFormula($startRow, 17, "=sum($start:$end)",$numFormat2);
							$startRow++;
						}
						$no = 1;
						$total = array(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);				
						$class = $row9->KODE_KLPFA;
						$startRow++;
						$sheet->setMerge($startRow,0,$startRow,1);	
						$sheet->write($startRow,0,"$row9->KODE_KLPFA", $header2);
						$startRow+=2;
						$sheet->setMerge($startRow,0,$startRow+1,0); $sheet->setColumn(0,0,5); $sheet->write($startRow,0,"No", $hdrSAP);
						$sheet->setMerge($startRow,1,$startRow+1,1); $sheet->setColumn(1,1,30);$sheet->write($startRow,1,"AREA", $hdrSAP);
						$sheet->setMerge($startRow,2,$startRow,5); $sheet->write($startRow,2,"Total Kartu Aset Modul SAP AM", $hdrSAP);
						$sheet->setColumn(2,2,20);$sheet->write($startRow+1,2,"Jumlah NKA", $hdrSAP);
						$sheet->setColumn(3,3,20);$sheet->write($startRow+1,3,"Nilai Perolehan", $hdrSAP);
						$sheet->setColumn(4,4,20);$sheet->write($startRow+1,4,"Akumulasi Penyusutan", $hdrSAP);
						$sheet->setColumn(5,5,20);$sheet->write($startRow+1,5,"Nilai Buku", $hdrSAP);
						
						$sheet->setMerge($startRow,6,$startRow,9); $sheet->write($startRow,6,"Kertas Kerja Konversi", $hdrKonv);
						$sheet->setColumn(6,6,20);$sheet->write($startRow+1,6,"Jumlah NKA", $hdrKonv);
						$sheet->setColumn(7,7,20);$sheet->write($startRow+1,7,"Nilai Perolehan", $hdrKonv);
						$sheet->setColumn(8,8,20);$sheet->write($startRow+1,8,"Akumulasi Penyusutan", $hdrKonv);
						$sheet->setColumn(9,9,20);$sheet->write($startRow+1,9,"Nilai Buku", $hdrKonv);
						
						$sheet->setMerge($startRow,10,$startRow,13); $sheet->write($startRow,10,"Kertas Kerja Verifikasi", $hdrVer);
						$sheet->setColumn(10,10,20);$sheet->write($startRow+1,10,"Jumlah NKA", $hdrVer);
						$sheet->setColumn(11,11,20);$sheet->write($startRow+1,11,"Nilai Perolehan", $hdrVer);
						$sheet->setColumn(12,12,20);$sheet->write($startRow+1,12,"Akumulasi Penyusutan", $hdrVer);
						$sheet->setColumn(13,13,20);$sheet->write($startRow+1,13,"Nilai Buku", $hdrVer);			
						
						$sheet->setMerge($startRow,14,$startRow,17); $sheet->write($startRow,14,"Kertas Kerja Verifikasi", $hdrBA);
						$sheet->setColumn(14,14,20);$sheet->write($startRow+1,14,"Jumlah NKA", $hdrBA);
						$sheet->setColumn(15,15,20);$sheet->write($startRow+1,15,"Nilai Perolehan", $hdrBA);
						$sheet->setColumn(16,16,20);$sheet->write($startRow+1,16,"Akumulasi Penyusutan", $hdrBA);
						$sheet->setColumn(17,17,20);$sheet->write($startRow+1,17,"Nilai Buku", $hdrBA);					
						$startRow += 2;
						$startingRow = $startRow;
					}   
						$row  = array($row9->NKA, $row9->NILAI, $row9->NILAI_AP, $row9->NILAI_BUKU);																	
						$row2 = array($row9->NKA2, $row9->NILAI2, $row9->NILAI_AP2, $row9->NILAI_BUKU2);					
						$row3 = array($row9->NKA3, $row9->NILAI3, $row9->NILAI_AP3, $row9->NILAI_BUKU3);
						$row4 = array($row9->NKA4, $row9->NILAI4, $row9->NILAI_AP4, $row9->NILAI_BUKU4);
																			
						$total2[0] += $row[0];
						$total2[1] += $row[1];
						$total2[2] += $row[2];
						$total2[3] += $row[3];
						$total2[4] += $row2[0];
						$total2[5] += $row2[1];
						$total2[6] += $row2[2];
						$total2[7] += $row2[3];
						$total2[8] += $row3[0];
						$total2[9] += $row3[1];
						$total2[10] += $row3[2];
						$total2[11] += $row3[3];			
						$sheet->write($startRow,0,$no,$normalFormat);
						$sheet->write($startRow,1,$row9->KODE_LOKFA,$normalFormat);
						$sheet->write($startRow,2,$row[0],$numFormat);
						$sheet->write($startRow,3,$row[1],$numFormat);
						$sheet->write($startRow,4,$row[2],$numFormat);
						$sheet->write($startRow,5,$row[3],$numFormat);
						$sheet->write($startRow,6,$row2[0],$numFormat);
						$sheet->write($startRow,7,$row2[1],$numFormat);
						$sheet->write($startRow,8,$row2[2],$numFormat);
						$sheet->write($startRow,9,$row2[3],$numFormat);
						$sheet->write($startRow,10,$row3[0],$numFormat);
						$sheet->write($startRow,11,$row3[1],$numFormat);
						$sheet->write($startRow,12,$row3[2],$numFormat);
						$sheet->write($startRow,13,$row3[3],$numFormat);
						$sheet->write($startRow,14,$row4[0],$numFormat);
						$sheet->write($startRow,15,$row4[1],$numFormat);
						$sheet->write($startRow,16,$row4[2],$numFormat);
						$sheet->write($startRow,17,$row4[3],$numFormat);
						$no++;
						$startRow++;
				}
				$sheet->write($startRow,0," ",$normalFormat2);
				$sheet->write($startRow,1,"Total",$normalFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,2);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 2);						
				$sheet->writeFormula($startRow, 2, "=sum($start:$end)",$numFormat2);						
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,3);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 3);						
				$sheet->writeFormula($startRow, 3, "=sum($start:$end)",$numFormat2);						
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,4);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 4);						
				$sheet->writeFormula($startRow, 4, "=sum($start:$end)",$numFormat2);						
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,5);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 5);						
				$sheet->writeFormula($startRow, 5, "=sum($start:$end)",$numFormat2);						
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,6);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 6);						
				$sheet->writeFormula($startRow, 6, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,7);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 7);						
				$sheet->writeFormula($startRow, 7, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,8);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 8);						
				$sheet->writeFormula($startRow, 8, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,9);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 9);						
				$sheet->writeFormula($startRow, 9, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,10);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 10);						
				$sheet->writeFormula($startRow, 10, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,11);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 11);						
				$sheet->writeFormula($startRow, 11, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,12);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 12);						
				$sheet->writeFormula($startRow, 12, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,13);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 13);						
				$sheet->writeFormula($startRow, 13, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,14);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 14);						
				$sheet->writeFormula($startRow, 14, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,15);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 15);
				$sheet->writeFormula($startRow, 15, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,16);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 16);
				$sheet->writeFormula($startRow, 16, "=sum($start:$end)",$numFormat2);
				$start = Spreadsheet_Excel_Writer::rowcolToCell($startingRow,17);$end = Spreadsheet_Excel_Writer::rowcolToCell(($startRow - 1), 17);						
				$sheet->writeFormula($startRow, 17, "=sum($start:$end)",$numFormat2);
				$startRow++;
			}	
		} 		
				
		$startRow+=2;
		$sheet->write($startRow,0," ",$normalFormat2);
		$sheet->write($startRow,1,"Total Divisi",$normalFormat2);
		$sheet->write($startRow,2,$total2[0],$numFormat2);
		$sheet->write($startRow,3,$total2[1],$numFormat2);
		$sheet->write($startRow,4,$total2[2],$numFormat2);
		$sheet->write($startRow,5,$total2[3],$numFormat2);
		$sheet->write($startRow,6,$total2[4],$numFormat2);
		$sheet->write($startRow,7,$total2[5],$numFormat2);
		$sheet->write($startRow,8,$total2[6],$numFormat2);
		$sheet->write($startRow,9,$total2[7],$numFormat2);
		$sheet->write($startRow,10,$total2[8],$numFormat2);
		$sheet->write($startRow,11,$total2[9],$numFormat2);
		$sheet->write($startRow,12,$total2[10],$numFormat2);
		$sheet->write($startRow,13,$total2[11],$numFormat2);
		$sheet->write($startRow,14,$total2[12],$numFormat2);
		$sheet->write($startRow,15,$total2[13],$numFormat2);
		$sheet->write($startRow,16,$total2[14],$numFormat2);
		$sheet->write($startRow,17,$total2[15],$numFormat2);
		$sheet->insertBitmap(0,0,"../image/telkom2.bmp",0,0,1,1);
		$excel->close();
	}		
}
?>
