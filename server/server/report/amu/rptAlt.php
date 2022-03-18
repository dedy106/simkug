<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_report_amu_rptAlt extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];		
			
		$AddOnLib=new server_util_AddOnLib();		
				
		$sql1 = "select distinct b.no_fa, b.no_sn,b.nama, b.nama2, f.nama as nmklp, b.alamat, b.jml_fisik, to_char(b.tgl_perolehan,'dd-mm-YYYY') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku
					,c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, aa.no_bukti, k.jenis_proc
					from amu_asset b 					
				inner join amu_distaset_m aa on aa.kode_lokfa = b.kode_lokfa and b.periode = aa.periode 
				inner join amu_distaset_d ab on ab.no_bukti = aa.no_bukti and b.no_gabung = ab.no_gabung and ab.periode = b.periode
				inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode
				left outer join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				left outer join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				left outer join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				left outer join amu_klp f on f.kode_klpfa = b.kode_klpfa
				". $this->filter;			
		$rs1=$dbLib->execute($sql1);		
		$nb = "";
		$html = "";
		while ($row1 = $rs1->FetchNextObject(true))
		{			
			if ($row1->NO_BUKTI != $nb){
				$this->initColumn($row1->JENIS_PROC);
				$nb = $row1->NO_BUKTI;
				$html .= "<table width='100%' border='0' cellspacing='2' cellpadding='1'>
				  <tr>
					<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td width='10%'><img src='image/telkomindonesia.png' width='170' height='100'/></td>
						<td width='90%' align='center' valign='bottom' class='lokasi_laporan2'>KERTAS KERJA KONVERSI DATA ASET MODUL SAP </td>
					  </tr>
					</table></td>
				  </tr>
				  <tr>
					<td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
					  <tr>
						<td width='9%' class='header_laporan'>Divisi / Ubis </td>
						<td width='91%' class='header_laporan'>: $row1->NMUBIS</td>
					  </tr>
					  <tr>
						<td class='header_laporan'>Area Bisnis </td>
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
					$html .= "<tr>
						<td><table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='100%'>
						 <tr align='center' bgcolor='#CCCCCC'>
							<td colspan='9' bgcolor='#FFFF00' class='header_laporan'>DATA SAP AM </td>
							<td colspan='".(count($this->dbField)) ."' bgcolor='#00FF00' class='header_laporan'>DATA HASIL KONVERSI </td>
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
							<td class='header_laporan'>Nilai Buku </td>". $this->tblHeader ."
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
							<td class='header_laporan'>9</td>";
						foreach ($this->dbField as $k => $value) $html .= "<td class='header_laporan'>".($k + 10)."</td>";					    
						  "</tr>";
							$nilai=0;$nilai_ap=0;$nilai_buku=0;
				$first = true;				
			}		
			$row = $row1;
			$tmp = (array) $row;			
			$nilai=number_format($row->NILAI,0,",",".");
			$nilai_ap=number_format($row->NILAI_AP,0,",",".");
			$nilai_buku=number_format($row->NILAI_BUKU,0,",",".");
			$html .= "<tr>
				<td class='isi_laporan'>$row->NO_FA</td>
				<td align='center' class='isi_laporan'>$row->NO_SN</td>
				<td class='isi_laporan'>$row->NMKLP</td>
				<td class='isi_laporan'>$row->NAMA</td>
				<td class='isi_laporan'>$row->NAMA2</td>
				<td class='isi_laporan'>$row->TGL_PEROLEHAN</td>
				<td align='right' class='isi_laporan'>$nilai</td>
				<td align='right' class='isi_laporan'>$nilai_ap</td>
				<td align='right' class='isi_laporan'>$nilai_buku</td>";
			foreach ($this->dbField as $k => $value) {				
				$html .= "<td class='isi_laporan'>".$tmp[$value]."</td>";	
			}				
			  $html .= "</tr>";
			$i=$i+1;
		}		
		$html .= "</table></td>
		  </tr>
		  <tr>
			<td>&nbsp;</td>
		  </tr>
		  
		  <tr>
			<td align='right'><table width='400' border='0' cellspacing='0' cellpadding='0'>
			  <tr>
				<td colspan='3' align='center' class='header_laporan'>$row1->TEMPAT , ".$AddOnLib->ubah_tanggal($row1->tgl)."</td>
				</tr>
			  <tr>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
				<td align='center'>&nbsp;</td>
			  </tr>
			  <tr>
				<td align='center' class='header_laporan'><p>Ketua Tim INV UBIS</p>
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
	function initColumn($jnsProc){
		switch (strtolower($jnsProc)){
			case "sentral":
				$this->tblHeader = "<td class='header_laporan'>Lokasi/Netre</td>
								<td class='header_laporan'>ARNET</td>
								<td class='header_laporan'>SENTRAL</td>
								<td class='header_laporan'>Lokasi</td>
								<td class='header_laporan'>Area Code</td>
								<td class='header_laporan'>FKN</td>
								<td class='header_laporan'>Fungsi</td>
								<td class='header_laporan'>Host</td>
								<td class='header_laporan'>Tipe Sentral</td>";
				$this->dbField = "NMLOK,NMARNET,NMSENTRAL,LOKASI,KODE_AREA,FKN,FUNGSI,HOST,TIPE";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lokasi
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";
				$this->dbSQLField = "";
				
			break;
			case "rce & mux":
			case "rms":
			case "SKKL / SKSO":
				$this->tblHeader = "<td class='header_laporan'>Lokasi/Netre</td>
								<td class='header_laporan'>Tipe</td>
								<td class='header_laporan'>Komponen</td>
								<td class='header_laporan'>Sistra/Proyek </td>
								<td class='header_laporan'>Link/Point/Lokasi</td>";
				$this->dbField = "NMLOK,NMTIPE,NMKOMP,NMPROYEK,NMLINK";
				$this->dbSQLField = "l.nama as nmlok, t.nama as nmtipe, p.nama as nmproyek, ll.nama as nmlink, kk.nama as nmkomp";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lok
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";				
			break;
			case "modem data & imux":
				//No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri
				$this->tblHeader = "<td class='header_laporan'>No Kontrak</td>
								<td class='header_laporan'>Vendor</td>
								<td class='header_laporan'>Crosscheck Kontrak</td>
								<td class='header_laporan'>Nomor Seri</td>";
				$this->dbField = "KODE_KONTRAK,KODE_VENDOR,KODE_KONTRAK2,STATUS_SN";
			break;
			case "satelit":
				$this->tblHeader = "<td class='header_laporan'>Satelit</td>";
				$this->dbField = "NMSATELIT";
			break;
			case "server":
				$this->tblHeader = "<td class='header_laporan'>UBIS</td>
								<td class='header_laporan'>Sub UBIS</td>
								<td class='header_laporan'>Aplikasi/Tools</td>
								<td class='header_laporan'>Jenis</td>
								<td class='header_laporan'>Lokasi</td>";
				$this->dbField = "NMUBIS,NMSBIS,NMAPLIKASI,JENIS,NMLOKASI";
			break;
			case "rbs":
				$this->tblHeader = "<td class='header_laporan'>Level 1</td>
								<td class='header_laporan'>Level 2</td>
								<td class='header_laporan'>Lokasi BTS/BSC</td>
								<td class='header_laporan'>Area Operasional</td>
								<td class='header_laporan'>Vendor</td>
								<td class='header_laporan'>Alat Monitoring</td>
								<td class='header_laporan'>Status BTS / BSC</td>";
				$this->dbField = "LEVEL1,LEVEL2,LOKASI,AREAOP,VENDOR,STATUS";
			break;
			case "stm & ims":
				$this->tblHeader = "<td class='header_laporan'>Group</td>
								<td class='header_laporan'>Kategori</td>
								<td class='header_laporan'>Kelompok Aset</td>
								<td class='header_laporan'>Merk</td>
								<td class='header_laporan'>Vendor</td>								
								<td class='header_laporan'>Lokasi STO</td>
								<td class='header_laporan'>Komponen</td>
								<td class='header_laporan'>Peruntukan</td>
								<td class='header_laporan'>Daerah</td>
								<td class='header_laporan'>Nama</td>
								<td class='header_laporan'>Jumlah</td>
								<td class='header_laporan'>Satuan</td>
								<td class='header_laporan'>Keterangan</td>";
				$this->dbField = "GROUP,KATEGORI,KLPFA,VENDOR,LOKASI,KOMPONEN,PERUNTUKAN,DAERAH,NAMA,JUMLAH,SATUAN,KETERANGAN";
			break;
			case "jaringan":
			case "lan & wan":
			case "lan&wan":
				$this->tblHeader = "<td class='header_laporan'>DIV. REGIONAL</td>
								<td class='header_laporan'>AREA</td>
								<td class='header_laporan'>STO</td>";
				$this->dbField = "SBIS,BA,STO";
			break;
			case "tanah & bangunan":				
				$this->tblHeader = "<td class='header_laporan'>No Sertifikat</td>
								<td class='header_laporan'>Lokasi</td>
								<td class='header_laporan'>Luas Tanah</td>
								<td class='header_laporan'>Luas Bangunan</td>
								<td class='header_laporan'>Status Dokumen</td>								
								<td class='header_laporan'>No SPPT (NOP)</td>
								<td class='header_laporan'>Lokasi PBB</td>
								<td class='header_laporan'>Luas Tanah</td>
								<td class='header_laporan'>Luas Bangunan</td>
								<td class='header_laporan'>NKA Terkait Bangunan</td>
								<td class='header_laporan'>Status Dokumen</td>
								<td class='header_laporan'>Jenis Dokumen</td>
								<td class='header_laporan'>No Lainnya</td>
								<td class='header_laporan'>Lokasi Dgn Dokumen</td>
								<td class='header_laporan'>ID Pelanggan</td>
								<td class='header_laporan'>Nama Pelanggan</td>
								<td class='header_laporan'>NKA Terkait Tanah</td>
								<td class='header_laporan'>Status Dokumen</td>";
				$this->dbField = "NOSURAT,LOKASI,TNAH1,BANGUN1,STATUS,NOP,LOKPBB,TANAH2,BANGUN2,NKA1,STATUS2,JENIS,NOLAIN,LOKDOK,ID,NMCUST,NKA2,STATUS3";
			break;			
		}		
		$this->dbField = explode(",",$this->dbField);
	}
	function createXls(){
		uses("server_xls_Writer", false);		
		$namafile = "ALTERNATIF.xls";
		$excel = new Spreadsheet_Excel_Writer();
		
		$excel->send($namafile);
		$excel->setCustomColor(14, 192,192,192); 
		
		
		$headerFormat =& $excel->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black'));	//, 
		$numFormat =& $excel->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black'));		
		$normalFormat =& $excel->addFormat(array('border' => 1, 'bordercolor' => 'black'));				
		$yellow =& $excel->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
		$green =& $excel->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
		$format_top_center =& $excel->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
		
		global $dbLib;		
		$nik_user=$tmp[0];
		
		$sql1 = "select distinct b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2,b.kode_klpfa,b.alamat, b.jml_fisik, b.tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku
					,c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, aa.no_bukti, k.jenis_proc, b.kode_lokfa
					from amu_asset b 					
				inner join amu_distaset_m aa on aa.kode_lokfa = b.kode_lokfa and b.periode = aa.periode 
				inner join amu_distaset_d ab on ab.no_bukti = aa.no_bukti and b.no_gabung = ab.no_gabung and ab.periode = b.periode
				inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode
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
				$sheet =& $excel->addWorksheet("Konversi");				
				$rowStart = 4;
				$this->initColumnXls($row1->JENIS_PROC, $sheet, $rowStart,$headerFormat, $normalFormat, $numFormat);
				$sheet->setMerge(4,0,4,18 + count($this->dbField));
				$sheet->setHeader("",0.18);
				$sheet->setFooter("",0.18);
				$sheet->setMargins("",0.18);
				$sheet->setPrintScale(85);
				$sheet->setPaper(9); //A4
				$sheet->setLandscape();
				
				$sheet->write($rowStart,0, "KERTAS KERJA KONVERSI ". $row1->JENIS_PROC,$format_top_center);
				for ($i=1;$i <= 17;$i++) $sheet->write($rowStart,$i, "",$format_top_center);
				$sheet->write($rowStart + 2,1, "Divisi/UBIS");$sheet->write($rowStart + 2,2, ":".$row1->NMUBIS);										
				$sheet->write($rowStart + 3,1, "Sub UBIS");$sheet->write($rowStart + 3,2, ":".$row1->NMSBIS);										
				
				$no = $row1->NO_BUKTI;				
				$sheet->setMerge($rowStart + 7,0,$rowStart + 7,18);				
				$sheet->setMerge($rowStart + 7,19,$rowStart + 7,18+count($this->dbField));				
				$sheet->write($rowStart + 7,0,"DATA SAP AM", $yellow);
				for ($i=1;$i <= 18;$i++) $sheet->write($rowStart + 7,$i, "",$yellow);				
				$sheet->write($rowStart + 7,19,"DATA KONVERSI", $green);
				for ($i=20;$i <= (18+count($this->dbField));$i++) $sheet->write($rowStart + 7,$i, "",$green);
								
				$sheet->setMerge(12,0,12,1);$sheet->write(12,0, "No Kartu", $headerFormat);$sheet->write(12,1, "", $headerFormat);
				$sheet->write(12,2, "SN", $headerFormat);
				$sheet->write(12,3, "Jenis", $headerFormat);
				$sheet->setMerge(12,4,12,7);$sheet->write(12,4, "Deskripsi Aset", $headerFormat);for ($i=5;$i <= 7;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(12,8,12,10);$sheet->write(12,8, "Deskripsi Alamat", $headerFormat);for ($i=9;$i <= 10;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->write(12,11, "BusA", $headerFormat);
				$sheet->write(12,12, "Cap Date", $headerFormat);
				$sheet->setMerge(12,13,12,14);$sheet->write(12,13, "Harga Perolehan", $headerFormat);$sheet->write(12,14, "", $headerFormat);
				$sheet->setMerge(12,15,12,16);$sheet->write(12,15, "Akumulasi Penyusutan", $headerFormat);$sheet->write(12,16, "", $headerFormat);
				$sheet->setMerge(12,17,12,18);$sheet->write(12,17, "Nilai Buku", $headerFormat);$sheet->write(12,18, "", $headerFormat);
				
				$sheet->setMerge(13,0,13,1);$sheet->write(13,0, "1", $headerFormat);$sheet->write(13,1, "", $headerFormat);
				$sheet->write(13,2, "2", $headerFormat);
				$sheet->write(13,3, "3", $headerFormat);
				$sheet->setMerge(13,4,13,7);$sheet->write(13,4, "4", $headerFormat);for ($i=5;$i <= 7;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->setMerge(13,8,13,10);$sheet->write(13,8, "5", $headerFormat);for ($i=9;$i <= 10;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->write(13,11, "6", $headerFormat);
				$sheet->write(13,12, "7", $headerFormat);
				$sheet->setMerge(13,13,13,14);$sheet->write(13,13, "8", $headerFormat);$sheet->write(13,14, "", $headerFormat);
				$sheet->setMerge(13,15,13,16);$sheet->write(13,15, "9", $headerFormat);$sheet->write(13,16, "", $headerFormat);
				$sheet->setMerge(13,17,13,18);$sheet->write(13,17, "10", $headerFormat);$sheet->write(13,18, "", $headerFormat);
				
				
				$rowcount = 14;
			}
			$row = $row1;
			$sheet->setMerge($rowcount,0,$rowcount,1);$sheet->writeString($rowcount,0,$row->NO_FA, $normalFormat);$sheet->write($rowcount,1, "", $normalFormat);
			$sheet->writeString($rowcount,2,$row->NO_SN, $normalFormat);
			$sheet->write($rowcount,3,$row->KODE_KLPFA, $normalFormat);
			$sheet->setMerge($rowcount,4,$rowcount,7);$sheet->write($rowcount,4,$row->NAMA, $normalFormat);for ($i=5;$i <= 7;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
			$sheet->setMerge($rowcount,8,$rowcount,10);$sheet->write($rowcount,8,$row->NAMA2, $normalFormat);for ($i=9;$i <= 10;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
			$sheet->write($rowcount,11,$row->KODE_LOKFA, $normalFormat);
			$sheet->write($rowcount,12,$row->TGL_PEROLEHAN, $normalFormat);
			$sheet->setMerge($rowcount,13,$rowcount,14);$sheet->write($rowcount,13,$row->NILAI, $numFormat);$sheet->write($rowcount,14, "", $normalFormat);
			$sheet->setMerge($rowcount,15,$rowcount,16);$sheet->write($rowcount,15,$row->NILAI_AP, $numFormat);$sheet->write($rowcount,16, "", $normalFormat);
			$sheet->setMerge($rowcount,17,$rowcount,18);$sheet->write($rowcount,17,$row->NILAI_BUKU, $numFormat);$sheet->write($rowcount,18, "", $normalFormat);			
			for ($f=0; $f < count($this->dbField);$f++){				
				$sheet->write($rowcount,19 + $f, " ", $normalFormat);
			}
			$i=$i+1;
			$rowcount++;
		}				
		$rowcount += 3;		
		$sheet->insertBitmap(0,1,"../image/telkom2.bmp",0,0,1,1);
		$sheet->write($rowcount,14,"............, .....................");
		$this->getTTD($jenis_proc, $sheet, $rowcount);
		
		$sheet->hideScreenGridlines();
		$excel->close();	
		
	}			
	function initColumnXls($jnsProc, &$sheet, $rowStart, $headerFormat, $normalFormat, $numFormat){				
				
		switch (strtolower($jnsProc)){
			case "sentral":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "Lokasi/Netre", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "ARNET", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "Sentral", $headerFormat);
				$sheet->setColumn($rowStart + 8,22,20);$sheet->write($rowStart + 8,22, "Lokasi", $headerFormat);
				$sheet->setColumn($rowStart + 8,23,20);$sheet->write($rowStart + 8,23, "Area Code", $headerFormat);
				$sheet->setColumn($rowStart + 8,24,20);$sheet->write($rowStart + 8,24, "FKN", $headerFormat);
				$sheet->setColumn($rowStart + 8,25,20);$sheet->write($rowStart + 8,25, "Fungsi", $headerFormat);
				$sheet->setColumn($rowStart + 8,26,20);$sheet->write($rowStart + 8,26, "Host", $headerFormat);
				$sheet->setColumn($rowStart + 8,27,20);$sheet->write($rowStart + 8,27, "Tipe Sentral", $headerFormat);				
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);
				$sheet->write($rowStart + 9,22, "14", $headerFormat);
				$sheet->write($rowStart + 9,23, "15", $headerFormat);
				$sheet->write($rowStart + 9,24, "16", $headerFormat);
				$sheet->write($rowStart + 9,25, "17", $headerFormat);
				$sheet->write($rowStart + 9,26, "18", $headerFormat);
				$sheet->write($rowStart + 9,27, "19", $headerFormat);				
				
				$this->dbField = "NMLOK,NMARNET,NMSENTRAL,LOKASI,KODE_AREA,FKN,FUNGSI,HOST,TIPE";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lokasi
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";
				$this->dbSQLField = "";			
			break;
			case "rce & mux":
			case "rms":
			case "skkl / skso":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "Lokasi/Netre", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "Tipe", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "Komponen", $headerFormat);
				$sheet->setColumn($rowStart + 8,22,20);$sheet->write($rowStart + 8,22, "Sistra/Proyek", $headerFormat);
				$sheet->setColumn($rowStart + 8,23,20);$sheet->write($rowStart + 8,23, "Link/Point/Lokasi", $headerFormat);				
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);
				$sheet->write($rowStart + 9,22, "14", $headerFormat);
				$sheet->write($rowStart + 9,23, "15", $headerFormat);								
				$this->dbField = "NMLOK,NMTIPE,NMKOMP,NMPROYEK,NMLINK";
				$this->dbSQLField = "l.nama as nmlok, t.nama as nmtipe, p.nama as nmproyek, ll.nama as nmlink, kk.nama as nmkomp";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lok
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";				
			break;
			case "modem data & imux":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "No Kontrak ", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "Vendor", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "CrossCheck Kontrak", $headerFormat);
				$sheet->setColumn($rowStart + 8,22,20);$sheet->write($rowStart + 8,22, "Nomor Seri", $headerFormat);				
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);
				$sheet->write($rowStart + 9,22, "14", $headerFormat);									
				//No Kontrak, Vendor, CrossCheck Kontrak, Nomor Seri				
				$this->dbField = "KODE_KONTRAK,KODE_VENDOR,KODE_KONTRAK2,STATUS_SN";
			break;
			case "satelit":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "Satelit ", $headerFormat);								
				$sheet->write($rowStart + 9,19, "11", $headerFormat);				
				$this->tblHeader = "<td class='header_laporan'>Satelit</td>";
				$this->dbField = "NMSATELIT";
			break;
			case "server":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "UBIS ", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "Sub UBIS", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "Aplikasi/Tools", $headerFormat);
				$sheet->setColumn($rowStart + 8,22,20);$sheet->write($rowStart + 8,22, "Jenis", $headerFormat);				
				$sheet->setColumn($rowStart + 8,23,20);$sheet->write($rowStart + 8,23, "Lokasi", $headerFormat);				
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);
				$sheet->write($rowStart + 9,22, "14", $headerFormat);				
				$sheet->write($rowStart + 9,23, "15", $headerFormat);								
				$this->dbField = "NMUBIS,NMSBIS,NMAPLIKASI,JENIS,NMLOKASI";
			break;
			case "rbs":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "Level 1 ", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "Level 2", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "Lokasi BTS/BSC", $headerFormat);
				$sheet->setColumn($rowStart + 8,22,20);$sheet->write($rowStart + 8,22, "Area Operasional", $headerFormat);				
				$sheet->setColumn($rowStart + 8,23,20);$sheet->write($rowStart + 8,23, "Vendor", $headerFormat);				
				$sheet->setColumn($rowStart + 8,24,20);$sheet->write($rowStart + 8,24, "Alat Monitoring", $headerFormat);				
				$sheet->setColumn($rowStart + 8,25,20);$sheet->write($rowStart + 8,25, "Status BTS / BSC", $headerFormat);				
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);
				$sheet->write($rowStart + 9,22, "14", $headerFormat);				
				$sheet->write($rowStart + 9,23, "15", $headerFormat);								
				$sheet->write($rowStart + 9,24, "16", $headerFormat);				
				$sheet->write($rowStart + 9,25, "17", $headerFormat);								
				$this->dbField = "LEVEL1,LEVEL2,LOKASI,AREAOP,VENDOR,STATUS";
			break;
			case "stm & ims":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "Group ", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "Kategori", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "Kelompok Aset", $headerFormat);
				$sheet->setColumn($rowStart + 8,22,20);$sheet->write($rowStart + 8,22, "Merk", $headerFormat);				
				$sheet->setColumn($rowStart + 8,23,20);$sheet->write($rowStart + 8,23, "Vendor", $headerFormat);				
				$sheet->setColumn($rowStart + 8,24,20);$sheet->write($rowStart + 8,24, "Lokasi STO", $headerFormat);								
				$sheet->setColumn($rowStart + 8,25,20);$sheet->write($rowStart + 8,25, "Komponen", $headerFormat);				
				$sheet->setColumn($rowStart + 8,26,20);$sheet->write($rowStart + 8,26, "Peruntukan", $headerFormat);				
				$sheet->setColumn($rowStart + 8,27,20);$sheet->write($rowStart + 8,27, "Daerah", $headerFormat);				
				$sheet->setColumn($rowStart + 8,28,20);$sheet->write($rowStart + 8,28, "Nama", $headerFormat);				
				$sheet->setColumn($rowStart + 8,29,20);$sheet->write($rowStart + 8,29, "Jumlah", $headerFormat);				
				$sheet->setColumn($rowStart + 8,30,20);$sheet->write($rowStart + 8,30, "Satuan", $headerFormat);				
				$sheet->setColumn($rowStart + 8,31,20);$sheet->write($rowStart + 8,31, "Keterangan", $headerFormat);				
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);
				$sheet->write($rowStart + 9,22, "14", $headerFormat);				
				$sheet->write($rowStart + 9,23, "15", $headerFormat);								
				$sheet->write($rowStart + 9,24, "16", $headerFormat);				
				$sheet->write($rowStart + 9,25, "17", $headerFormat);								
				$sheet->write($rowStart + 9,26, "18", $headerFormat);
				$sheet->write($rowStart + 9,27, "19", $headerFormat);
				$sheet->write($rowStart + 9,28, "20", $headerFormat);
				$sheet->write($rowStart + 9,29, "21", $headerFormat);				
				$sheet->write($rowStart + 9,30, "22", $headerFormat);								
				$sheet->write($rowStart + 9,31, "23", $headerFormat);								
								
				$this->dbField = "GROUP,KATEGORI,KLPFA,VENDOR,LOKASI,KOMPONEN,PERUNTUKAN,DAERAH,NAMA,JUMLAH,SATUAN,KETERANGAN";
			break;
			case "jaringan":
			case "lan & wan":
			case "lan&wan":
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "DIV. REGIONAL ", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "AREA", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "STO", $headerFormat);				
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);								
				$this->dbField = "SBIS,BA,STO";
			break;
			case "tanah & bangunan":				
				$sheet->setColumn($rowStart + 8,19,20);$sheet->write($rowStart + 8,19, "No Sertifikat", $headerFormat);
				$sheet->setColumn($rowStart + 8,20,20);$sheet->write($rowStart + 8,20, "Lokasi", $headerFormat);
				$sheet->setColumn($rowStart + 8,21,20);$sheet->write($rowStart + 8,21, "Luas Tanah", $headerFormat);
				$sheet->setColumn($rowStart + 8,22,20);$sheet->write($rowStart + 8,22, "Luas Bangunan", $headerFormat);				
				$sheet->setColumn($rowStart + 8,23,20);$sheet->write($rowStart + 8,23, "Status Dokumen", $headerFormat);				
				$sheet->setColumn($rowStart + 8,24,20);$sheet->write($rowStart + 8,24, "No SPPT(NOP)", $headerFormat);								
				$sheet->setColumn($rowStart + 8,25,20);$sheet->write($rowStart + 8,25, "Lokasi PBB", $headerFormat);				
				$sheet->setColumn($rowStart + 8,26,20);$sheet->write($rowStart + 8,26, "Luas Tanah", $headerFormat);				
				$sheet->setColumn($rowStart + 8,27,20);$sheet->write($rowStart + 8,27, "Luas Bangunan", $headerFormat);				
				$sheet->setColumn($rowStart + 8,28,20);$sheet->write($rowStart + 8,28, "NKA Terkait Bangunan", $headerFormat);				
				$sheet->setColumn($rowStart + 8,29,20);$sheet->write($rowStart + 8,29, "Status Dokumen", $headerFormat);				
				$sheet->setColumn($rowStart + 8,30,20);$sheet->write($rowStart + 8,30, "Jenis Dokumen", $headerFormat);				
				$sheet->setColumn($rowStart + 8,31,20);$sheet->write($rowStart + 8,31, "No Lainnya", $headerFormat);		
				$sheet->setColumn($rowStart + 8,32,20);$sheet->write($rowStart + 8,32, "Lokasi", $headerFormat);				
				$sheet->setColumn($rowStart + 8,33,20);$sheet->write($rowStart + 8,33, "ID Pelanggan", $headerFormat);				
				$sheet->setColumn($rowStart + 8,34,20);$sheet->write($rowStart + 8,34, "Nama Pelanggan", $headerFormat);				
				$sheet->setColumn($rowStart + 8,35,20);$sheet->write($rowStart + 8,35, "NKA Terkait Lainnya", $headerFormat);				
				$sheet->setColumn($rowStart + 8,36,20);$sheet->write($rowStart + 8,36, "Status Dokumen", $headerFormat);			
				
				$sheet->write($rowStart + 9,19, "11", $headerFormat);
				$sheet->write($rowStart + 9,20, "12", $headerFormat);
				$sheet->write($rowStart + 9,21, "13", $headerFormat);
				$sheet->write($rowStart + 9,22, "14", $headerFormat);				
				$sheet->write($rowStart + 9,23, "15", $headerFormat);								
				$sheet->write($rowStart + 9,24, "16", $headerFormat);				
				$sheet->write($rowStart + 9,25, "17", $headerFormat);								
				$sheet->write($rowStart + 9,26, "18", $headerFormat);
				$sheet->write($rowStart + 9,27, "19", $headerFormat);
				$sheet->write($rowStart + 9,28, "20", $headerFormat);
				$sheet->write($rowStart + 9,29, "21", $headerFormat);				
				$sheet->write($rowStart + 9,30, "22", $headerFormat);								
				$sheet->write($rowStart + 9,31, "23", $headerFormat);
				$sheet->write($rowStart + 9,32, "19", $headerFormat);
				$sheet->write($rowStart + 9,33, "20", $headerFormat);
				$sheet->write($rowStart + 9,34, "21", $headerFormat);				
				$sheet->write($rowStart + 9,35, "22", $headerFormat);								
				$sheet->write($rowStart + 9,36, "23", $headerFormat);				
				$this->dbField = "NOSURAT,LOKASI,TNAH1,BANGUN1,STATUS,NOP,LOKPBB,TANAH2,BANGUN2,NKA1,STATUS2,JENIS,NOLAIN,LOKDOK,ID,NMCUST,NKA2,STATUS3";
			break;			
		}
		$this->dbField = explode(",",$this->dbField);
	}
	function getTTD($jns_proc, &$sheet,$rowcount ){
		$sheet->setMerge($rowcount,3,$rowcount,4); $sheet->write(28,3,"KETUA TIM INV UBIS");
		$sheet->setMerge($rowcount,9,$rowcount,10); $sheet->write(28,9,"Manager / Asman");
		$sheet->setMerge($rowcount,13,$rowcount,14); $sheet->write(28,13,"Officer");
		$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write(34,3,"______________________");
		$sheet->setMerge($rowcount + 6,9,$rowcount + 6,10); $sheet->write(34,9,"_____________________");
		$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write(34,13,"____________________");
		$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write(35,3,"NIK:.........................");
		$sheet->setMerge($rowcount + 7,9,$rowcount + 7,10); $sheet->write(35,9,"NIK:..........................");
		$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write(35,13,"NIK:..........................");
		switch (strtolower($jns_proc)){
			case "sentral":
			break;
			case "rce & mux":
			case "rms":
			case "skkl / skso":
			break;
			case "modem data & imux":
			break;
			case "satelit":
			break;
			case "server":
			break;
			case "rbs":
			break;
			case "stm & ims":
			break;
			case "jaringan":
			break;
			case "tanah & bangunan":				
			break;
			
		}
	}
}
?>
