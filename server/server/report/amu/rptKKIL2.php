<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptKKIL2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(b.no_gabung) 
					from amu_asset b
					inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung ". $this->filter;
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
		$nik_user=$tmp[0];
		
		$sql1 = "select distinct b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.alamat, b.jml_fisik, b.tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku
					,c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, aa.no_bukti, b.kode_klpfa
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				left outer join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				left outer join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				left outer join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				left outer join amu_klp f on f.kode_klpfa = b.kode_klpfa
				". $this->filter;	
		$rs1 = $dbLib->execute($sql1);				
		$no = "";
		$i = 1;
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$AddOnLib=new server_util_AddOnLib();		
		$html = "";
		$jenis = $this->filter2;
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{
			if ($no != $row1->NO_BUKTI){
				$html .= "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td width='10%'><img src='image/telkomindonesia.png' width='170' height='100'/></td>
						<td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>KERTAS KERJA INVENTARISASI LAPANGAN (KKIL) </td>
					  </tr>
					</table></td>
				  </tr>
				  <tr>
					<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td class='header_laporan'>No Distribusi </td>
						<td class='header_laporan'>: $row1->NO_BUKTI</td>
					  </tr>
					  <tr>
						<td width='9%' class='header_laporan'>Divisi / Ubis </td>
						<td width='91%' class='header_laporan'>: $row1->NMUBIS</td>
					  </tr>
					  <tr>
						<td class='header_laporan'>Regional </td>
						<td class='header_laporan'>: $row1->NMSBIS</td>
					  </tr>
					  <tr>
						<td class='header_laporan'>Area Bisnis</td>
						<td class='header_laporan'>: $row1->NMAREA</td>
					  </tr>
					  <tr>
						<td class='header_laporan'>Group Asset </td>
						<td class='header_laporan'>: $row1->NMKLP</td>
					  </tr>
					  
					</table></td>
				  </tr>
				  <tr>
					<td>&nbsp;</td>
				  </tr>";	    
				 $no = $row1->NO_BUKTI;
				 $html .= "<tr>
					<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
					 <tr align='center' bgcolor='#CCCCCC'>
						<td colspan='9' bgcolor='#FFFF00' class='header_laporan'>DATA SAP AM </td>
						<td colspan='9' bgcolor='#00FF00' class='header_laporan'>DATA INVENTARISASI LAPANGAN </td>
						</tr>
					  <tr align='center' bgcolor='#CCCCCC'>
						<td class='header_laporan'>No Kartu </td>
						<td class='header_laporan'>SN</td>
						<td class='header_laporan'>Jenis</td>
						<td class='header_laporan'>Deskripsi Asset</td>
						<td class='header_laporan'>Deskripsi Alamat</td>
						<td class='header_laporan'>Cap Date </td>
						<td class='header_laporan'>Harga Perolehan </td>
						<td class='header_laporan'>Akumulasi Penyusutan </td>
						<td class='header_laporan'>Nilai Buku </td>
						<td class='header_laporan'>Alamat</td>
						<td class='header_laporan'>Jml Fisik Lapangan</td>
						<td class='header_laporan'>No Label </td>
						<td class='header_laporan'>Keberadaan /Status </td>";
					if ($jenis == "TB"){
						$html .="<td class='header_laporan'>No Sertifikat / IMB/PBB/DLL</td>
						<td class='header_laporan'>Luas m2 </td>";				
					}
					$html .=" 
						<td class='header_laporan'>Update Deskripsi </td>
						<td class='header_laporan'>Update Lokasi </td>
						<td class='header_laporan'>Keterangan</td>
					  </tr>
					  <tr align='center'>
						<td class='header_laporan'>1</td>
						<td class='header_laporan'>2</td>
						<td class='header_laporan'>3</td>
						<td class='header_laporan'>4</td>
						<td class='header_laporan'>5</td>
						<td class='header_laporan'>6</td>
						<td class='header_laporan'>7</td>
						<td class='header_laporan'>8</td>
						<td class='header_laporan'>9</td>
						<td class='header_laporan'>10</td>
						<td class='header_laporan'>11</td>
						<td class='header_laporan'>12</td>
						<td class='header_laporan'>13</td>";
					if ($jenis == "TB"){
						$html .="	
							<td class='header_laporan'>14</td>
							<td class='header_laporan'>15</td>
							<td class='header_laporan'>16</td>
							<td class='header_laporan'>17</td>
							<td class='header_laporan'>18</td>";
					}else $html .= "
						<td class='header_laporan'>14</td>
						<td class='header_laporan'>15</td>
						<td class='header_laporan'>16</td>						
					  </tr>";
			}
		
		$row = $row1;
		//$html=$AddOnLib->judul_laporan("laporan neraca",$this->lokasi,$AddOnLib->ubah_periode($periode));						
			$nilai=number_format($row->NILAI,0,",",".");
			$nilai_ap=number_format($row->NILAI_AP,0,",",".");
			$nilai_buku=number_format($row->NILAI_BUKU,0,",",".");
			$html .= "<tr>
			<td class='isi_laporan'>$row->NO_FA</td>
			<td align='center' class='isi_laporan'>$row->NO_SN</td>
			<td class='isi_laporan'>$row->KODE_KLPFA</td>
			<td class='isi_laporan'>$row->NAMA</td>
			<td class='isi_laporan'>$row->ALAMAT</td>
			<td class='isi_laporan'>$row->CAP_DATE</td>
			<td align='right' class='isi_laporan'>$nilai</td>
			<td align='right' class='isi_laporan'>$nilai_ap</td>
			<td align='right' class='isi_laporan'>$nilai_buku</td>
			<td class='isi_laporan'>&nbsp</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>&nbsp;</td>";
			if ($jenis == "TB"){
				$html .= "<td class='isi_laporan'>&nbsp;</td>
				<td class='isi_laporan'>&nbsp;</td>";
			}
			$html .= "</tr>";
			$i=$i+1;		
				
		}		
		$html .= "</table></td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
		  </tr>";
		
		$rs2 = $dbLib->execute("select kode_status, nama from amu_status where jenis = '$jenis'");				
		$html .= "<tr><td colspan='18'><u><b>Catatan</b></u></td></tr>";
		$html .= "<tr><td colspan='18'>Kolom 13 diisi dgn status:</td></tr>";		
		$html .= "<tr><td colspan='18'><table>";
		while ($line = $rs2->FetchNextObject(true)){
			$html .= "<tr><td class='isi_laporan'>$line->KODE_STATUS</td>
						<td class='isi_laporan'>:</td> 
						<td class='isi_laporan'>$line->NAMA</td></tr>";
		}	
		$html .= "</table></td></tr>";
		$html .=" <tr>
			<td align='right'><table width='400' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td colspan='3' align='center' class='header_laporan'>$row1->TEMPAT , ".$AddOnLib->ubah_tanggal($row1->TGL)."</td>
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center' class='header_laporan'><p>Reviewer</p>
					  <p>&nbsp;</p>
				  <p>$row1->NAMA1</p></td>
				<td align='center' class='header_laporan'><p>Manager / Asman </p>
					  <p>&nbsp;</p>
				  <p>$row1->NAMA2</p></td>
				<td align='center' class='header_laporan'><p>Officer</p>
					  <p>&nbsp;</p>
				  <p>$row1->NAMA3</p></td>
				</tr>
			  <tr>
				<td align='center' class='header_laporan'>NIK : $row1->NIK1</td>
				<td align='center' class='header_laporan'>NIK : $row1->NIK2</td>
				<td align='center' class='header_laporan'>NIK : $row1->NIK3</td>
				</tr>
			</table></td>
		  </tr>
		</table>";
 		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function createXls(){
		uses("server_xls_Writer", false);		
		global $manager;
		$namafile = $manager->getTempDir()."/KKIL.xls";		
		$namafile2 = $manager->getTempDir()."/KKIL.html";		
		$excel = new Spreadsheet_Excel_Writer();
		
		$excel->send("kkil.xls");
		$excel->setCustomColor(14, 192,192,192); 
		
		
		$headerFormat =& $excel->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
		$numFormat =& $excel->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top','textwrap' => 1));		
		$normalFormat =& $excel->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top','textwrap' => 1));				
		$yellow =& $excel->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
		$green =& $excel->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
		$format_top_center =& $excel->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
		
		global $dbLib;		
		$nik_user=$tmp[0];
		
		$sql1 = "select distinct b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.alamat, b.jml_fisik, date_format(b.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku
					,c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, aa.no_bukti, b.kode_klpfa, g.nama as nmapc, b.kode_lokfa, b.kode_klpakun
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				". $this->filter ." 
				union 
				select distinct b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.alamat, b.jml_fisik, date_format(b.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku
					,'-' as nmarea, c.nama as nmsbis, d.nama as nmubis, aa.no_bukti, b.kode_klpfa, g.nama as nmapc, b.kode_lokfa, b.kode_klpakun
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				". $this->filter ." 
				union 
				select distinct b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.alamat, b.jml_fisik, date_format(b.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku
					,'-' as nmarea, '-' as nmsbis, c.nama as nmubis, aa.no_bukti, b.kode_klpfa, g.nama as nmapc, b.kode_lokfa, b.kode_klpakun
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				". $this->filter ." ";	
		$rs1 = $dbLib->execute($sql1);				
		$no = "";
		$i = 1;
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$AddOnLib=new server_util_AddOnLib();		
		$html = "";
		$jenis = $this->filter2;
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{
			if ($no != $row1->NO_BUKTI){
				$sheet =& $excel->addWorksheet("Lampiran - 1");				
				$sheet->setMerge(4,0,4,19);
				$sheet->setMerge(1,15,1,16);$sheet->write(1,15,"Lampiran 1");
				$sheet->setHeader("",0.19);
				$sheet->setFooter("",0.19);
				$sheet->setMargins("",0.19);
				$sheet->setPrintScale(80);
				$sheet->setPaper(9); //A4
				$sheet->setLandscape();
				$colStart = 4;
				$sheet->write($colStart,0, "KERTAS KERJA INVENTARISASI LAPANGAN (KKIL)",$format_top_center);
				for ($i=1;$i <= 19;$i++) $sheet->write($colStart,$i, "",$format_top_center);
				$sheet->setMerge($colStart + 2,1,$colStart + 2,2);$sheet->write($colStart + 2,1, "Divisi/UBIS");$sheet->write($colStart + 2,3, ":".$row1->NMUBIS);
				$sheet->setMerge($colStart + 3,1,$colStart + 3,2);$sheet->write($colStart + 3,1, "Regional");$sheet->write($colStart + 3,3, ":".$row1->NMSBIS);
				$sheet->setMerge($colStart + 4,1,$colStart + 4,2);$sheet->write($colStart + 4,1, "Area");$sheet->write($colStart + 4,3, ":");
				$sheet->setMerge($colStart + 5,1,$colStart + 5,2);$sheet->write($colStart + 5,1, "Group Aset");$sheet->write($colStart + 5,3, ":".$row1->NMKLP." ".$row1->NMAPC);
				$sheet->write($colStart + 2,15, "Nomor");
				$sheet->setMerge($colStart + 2,16,$colStart + 2,19);$sheet->write($colStart + 2,16, ":".$row1->NO_BUKTI);
				
				$no = $row1->NO_BUKTI;				
				$sheet->setMerge($colStart + 7,0,$colStart + 7,19);
				$sheet->setMerge($colStart + 11,0,$colStart + 11,19);
				$sheet->write($colStart + 7,0,"DATA SAP AM", $yellow);for ($i=1;$i <= 19;$i++) $sheet->write($colStart + 7,$i, "",$yellow);				
								
				$sheet->setMerge(12,0,12,1);$sheet->write(12,0, "No Kartu", $headerFormat);$sheet->write(12,1, "", $headerFormat);
				$sheet->write(12,2, "SN", $headerFormat);
				$sheet->write(12,3, "BusA", $headerFormat);
				$sheet->write(12,4, "APC", $headerFormat);
				$sheet->write(12,5, "Class", $headerFormat);
				$sheet->setMerge(12,6,12,8);$sheet->write(12,6, "Deskripsi Aset", $headerFormat);for ($i=7;$i <= 8;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(12,9,12,11);$sheet->write(12,9, "Deskripsi Alamat", $headerFormat);for ($i=10;$i <= 11;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->write(12,12, "Cap Date", $headerFormat);
				$sheet->setMerge(12,13,12,14);$sheet->write(12,13, "Harga Perolehan", $headerFormat);$sheet->write(12,14, "", $headerFormat);
				$sheet->setMerge(12,15,12,16);$sheet->write(12,15, "Akumulasi Penyusutan", $headerFormat);$sheet->write(12,16, "", $headerFormat);
				$sheet->setMerge(12,17,12,18);$sheet->write(12,17, "Nilai Buku", $headerFormat);$sheet->write(12,18, "", $headerFormat);
				$sheet->write(12,19, "Quantity SAP", $headerFormat);
				
				$sheet->setMerge(13,0,13,1);$sheet->write(13,0, "1", $headerFormat);$sheet->write(13,1, "", $headerFormat);
				$sheet->write(13,2, "2", $headerFormat);
				$sheet->write(13,3, "3", $headerFormat);
				$sheet->write(13,4, "4", $headerFormat);
				$sheet->write(13,5, "5", $headerFormat);
				$sheet->setMerge(13,6,13,8);$sheet->write(13,6, "6", $headerFormat);for ($i=7;$i <= 8;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->setMerge(13,9,13,11);$sheet->write(13,9, "7", $headerFormat);for ($i=10;$i <= 11;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->write(13,12, "8", $headerFormat);
				$sheet->setMerge(13,13,13,14);$sheet->write(13,13, "9", $headerFormat);$sheet->write(13,14, "", $headerFormat);
				$sheet->setMerge(13,15,13,16);$sheet->write(13,15, "10", $headerFormat);$sheet->write(13,16, "", $headerFormat);
				$sheet->setMerge(13,17,13,18);$sheet->write(13,17, "11", $headerFormat);$sheet->write(13,18, "", $headerFormat);
				$sheet->write(13,19, "12", $headerFormat);
				
				$sheet->setMerge(17,0,17,3);$sheet->write(17,0, "Alamat", $headerFormat);for ($i=1;$i <= 3;$i++) $sheet->write(17,$i, "", $headerFormat);
				$sheet->write(17,4, "Jml Fisik", $headerFormat);
				$sheet->setMerge(17,5,17,6);$sheet->write(17,5, "No Label", $headerFormat);$sheet->write(17,6,"", $headerFormat);				
				$sheet->setMerge(17,7,17,8);$sheet->write(17,7, "Keberadaan/ Status", $headerFormat);$sheet->write(17,8,"", $headerFormat);				
				
				$sheet->setMerge(18,0,18,3);$sheet->write(18,0, "10", $headerFormat);for ($i=1;$i <= 3;$i++) $sheet->write(18,$i, "", $headerFormat);
				$sheet->write(18,4, "11", $headerFormat);
				$sheet->setMerge(18,5,18,6);$sheet->write(18,5, "12", $headerFormat);$sheet->write(18,6,"", $normalFormat);				
				$sheet->setMerge(18,7,18,8);$sheet->write(18,7, "13", $headerFormat);$sheet->write(18,8,"", $normalFormat);				
				
				$sheet->setMerge(19,0,19,3);$sheet->write(19,0,"", $normalFormat);for ($i=1;$i <= 3;$i++) $sheet->write(19,$i, "", $headerFormat);
				$sheet->write(19,4,"", $normalFormat);
				$sheet->setMerge(19,5,19,6);$sheet->write(19,5,"", $normalFormat);$sheet->write(19,6,"", $normalFormat);				
				$sheet->setMerge(19,7,19,8);$sheet->write(19,7,"", $normalFormat);$sheet->write(19,8,"", $normalFormat);
				$col = 9;
				if (substr($row1->KODE_KLPFA,0,3) == "101"){ 
					$sheet->setMerge(17,$col,17,$col + 1);$sheet->write(17,$col, "No Sertifikat/IMB/PBB/DLL", $headerFormat);$sheet->write(17,$col+1,"", $normalFormat);
					$sheet->setMerge(18,$col,18,$col + 1);$sheet->write(18,$col, "1".($col - 3), $headerFormat);$sheet->write(18,$col +1,"", $normalFormat);
					$sheet->setMerge(19,$col,19,$col + 1);$sheet->write(19,$col, "", $normalFormat);$sheet->write(19,$col + 1,"", $normalFormat);
					$col+= 2;
					$sheet->write(17,$col, "Luas (m2)", $headerFormat);
					$sheet->write(18,$col, "1".($col - 4), $headerFormat);
					$sheet->write(19,$col, "", $normalFormat);
					//$col++;
					$addCol = 4;
				}else {
					$col--;
					$addCol = 6;
				}
				$col++;
				$sheet->setMerge(17,$col,17,$col + 3);$sheet->write(17,$col, "Update Deskripsi & Lokasi", $headerFormat);for ($i=$col + 1;$i <= $col + 3;$i++) $sheet->write(17,$i, "", $headerFormat);	
				$sheet->setMerge(18,$col,18,$col + 3);$sheet->write(18,$col, "1".($col - 4), $headerFormat);for ($i=$col + 1;$i <= $col + 3;$i++) $sheet->write(18,$i, "", $headerFormat);	
				$sheet->setMerge(19,$col,19,$col + 3);$sheet->write(19,$col, "", $normalFormat);for ($i=$col + 1;$i <= $col + 3;$i++) $sheet->write(19,$i, "", $headerFormat);	
				$col += 4;
				$sheet->setMerge(17,$col,17,$col + $addCol);$sheet->write(17,$col, "Ket.", $headerFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(17,$i, "", $headerFormat);	
				$sheet->setMerge(18,$col,18,$col + $addCol);$sheet->write(18,$col, "1".($col - 7), $headerFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(18,$i, "", $headerFormat);	
				$sheet->setMerge(19,$col,19,$col + $addCol);$sheet->write(19,$col, "", $normalFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(19,$i, "", $headerFormat);	
				
				$sheet->setRow(19,100);				
				$sheet->setMerge(16,0,16,19);
				$sheet->write($colStart + 12,0,"DATA INVENTARISASI LAPANGAN", $green);for ($i=1;$i <= 19;$i++) $sheet->write($colStart + 12,$i, "",$green);
			}
			$row = $row1;
			$sheet->setRow(14,100);				
			$sheet->setMerge(14,0,14,1);$sheet->writeString(14,0,$row->NO_FA, $normalFormat);$sheet->write(14,1, "", $normalFormat);
			$sheet->writeString(14,2,$row->NO_SN, $normalFormat);
			$sheet->write(14,3,$row->KODE_LOKFA, $normalFormat);
			$sheet->write(14,4,$row->KODE_KLPAKUN, $normalFormat);
			$sheet->write(14,5,$row->KODE_KLPFA, $normalFormat);
			$sheet->setMerge(14,6,14,8);$sheet->write(14,6,$row->NAMA, $normalFormat);for ($i=7;$i <= 8;$i++) $sheet->write(14,$i, "", $normalFormat);
			$sheet->setMerge(14,9,14,11);$sheet->write(14,9,$row->NAMA2, $normalFormat);for ($i=10;$i <= 11;$i++) $sheet->write(14,$i, "", $normalFormat);
			$sheet->write(14,12,$row->TGL_PEROLEHAN, $normalFormat);
			$sheet->setMerge(14,13,14,14);$sheet->write(14,13,$row->NILAI, $numFormat);$sheet->write(14,14, "", $normalFormat);
			$sheet->setMerge(14,15,14,16);$sheet->write(14,15,$row->NILAI_AP, $numFormat);$sheet->write(14,16, "", $normalFormat);
			$sheet->setMerge(14,17,14,18);$sheet->write(14,17,$row->NILAI_BUKU, $numFormat);$sheet->write(14,18, "", $normalFormat);
			$sheet->write(14,19,$row->JML_FISIK, $numFormat);
			$i=$i+1;
		}						
		$sheet->write(22,1,"Catatan:");
		$sheet->write(23,1,"Kolom 13 diisi dengan status:");		
		$rowcount = 24;
		$ix = 0;
		$temp = "";
		$jenis = (substr($row1->KODE_KLPFA,0,3) == "101" ? "TB":"NTB");
		$rs2 = $dbLib->execute("select kode_status, nama from amu_status where jenis = '$jenis' or jenis = 'TB' order by kode_status");				
		while ($line = $rs2->FetchNextObject(true)){
			$temp .= ($temp != "" ? ",":"") . $line->KODE_STATUS ."(".$line->NAMA .")";
			if ($ix == 3){
				$sheet->write($rowcount,1,$temp);			
				$rowcount++;	
				$temp = "";
			}
			$ix++;
		}	
		$sheet->write($rowcount,1,$temp);
		$sheet->insertBitmap(0,1,"../image/telkom2.bmp",0,0,1,1);
		$sheet->write(26,14,"............, .....................");
		$sheet->setMerge(28,3,28,4); $sheet->write(28,3,"KETUA TIM INV UBIS");
		$sheet->setMerge(28,9,28,10); $sheet->write(28,9,"Manager / Asman");
		$sheet->setMerge(28,13,28,14); $sheet->write(28,13,"Officer");
		$sheet->setMerge(34,3,34,4); $sheet->write(34,3,"______________________");
		$sheet->setMerge(34,9,34,10); $sheet->write(34,9,"_____________________");
		$sheet->setMerge(34,13,34,14); $sheet->write(34,13,"____________________");
		$sheet->setMerge(35,3,35,4); $sheet->write(35,3,"NIK:.........................");
		$sheet->setMerge(35,9,35,10); $sheet->write(35,9,"NIK:..........................");
		$sheet->setMerge(35,13,35,14); $sheet->write(35,13,"NIK:..........................");
		$sheet->hideScreenGridlines();
		$excel->close();		
		/*uses("server_xls_ExcelExport", false);		
		$objPHPExcel = PHPExcel_IOFactory::load($namafile);
		$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
		$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
		$objPHPExcel->getActiveSheet()->getPageSetup()->setFitToWidth(1);
		$objPHPExcel->getActiveSheet()->getPageSetup()->setFitToHeight(1);		 

		$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'HTML');
		$objWriter->writeAllSheets();
		/*	header('Content-Type: application/pdf');
			header('Content-Disposition: attachment;filename=kkil.pdf"');
			header('Cache-Control: max-age=0');
		$objWriter->setUseInlineCSS(true);
		$objWriter->save($namafile2);	
		
		$html = file_get_contents($namafile2);
		uses("server_util_Pdf");
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
		
		/*	uses("server_xls_ExcelExport", false);		
			$excel = new ExcelExport('pdf', $namafile);			
			$excel->download();
			*/



	}			
	function createPdf(){
		
	}
}
?>
