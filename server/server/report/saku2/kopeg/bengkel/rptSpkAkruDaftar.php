<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_bengkel_rptSpkAkruDaftar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
		$sql="select 1";
		
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
		$periode=$tmp[0];
		$akun=$tmp[1];
		$sql="select a.no_jual as no_bukti,a.no_dokumen,c.nama,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.kode_akun,a.kode_cust,d.nama as nama_cust,
						a.posted,b.keterangan,case when b.dc='D' then b.nilai else 0 end as debet,case when b.dc='C' then b.nilai else 0 end as kredit 
		         from fri_jual_m a 
				 inner join fri_jual_j b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi 
			     inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi 
				 inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi
				 $this->filter $akun
				 order by a.no_jual ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN TRANSAKSI PIUTANG",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC' >
    <td width='20'  class='header_laporan' align='center'>No</td>
    <td width='70' class='header_laporan' align='center'>No Bukti</td>
	<td width='70' class='header_laporan' align='center'>No Dokumen</td>
    <td width='50' class='header_laporan' align='center'>Tanggal</td>
    <td width='50' height='25' class='header_laporan' align='center'>Akun</td>
    <td width='150' class='header_laporan' align='center'>Nama Akun </td>
    <td width='60' class='header_laporan' align='center'>Kode Cust</td>
	<td width='150' class='header_laporan' align='center'>Nama Customer</td>
  <td width='30' class='header_laporan' align='center'>Posted</td>
    <td width='150' class='header_laporan' align='center'>Keterangan</td>
    <td width='80' class='header_laporan' align='center'>Debet</td>
    <td width='80' class='header_laporan' align='center'>Kredit</td>
  </tr>";
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$beda = $tmp!=$row->no_bukti; 
			if ($tmp!=$row->no_bukti)
			{
				$tmp=$row->no_bukti;
				$first = true;
				
				if ($i>1)
				{
					$debet=0;$kredit=0;$i=1;
					echo "<tr>
    <td height='25' colspan='10' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
				}
				
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$ndebet=number_format($debet,0,',','.');
			$nkredit=number_format($kredit,0,',','.');
			
			echo "<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
	<td valign='middle' class='isi_laporan'>$row->no_dokumen</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tanggal</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".$row->nama."</td>
	<td valign='middle' class='isi_laporan'>$row->kode_cust</td>
	<td valign='middle' class='isi_laporan'>$row->nama_cust</td>
	  <td valign='middle' class='isi_laporan' align='center'>$row->posted</td>
    <td valign='middle' class='isi_laporan'>".$row->keterangan."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->kredit,0,',','.')."</div></td>
  </tr>";
			$first = true;
			$i=$i+1;
		}
		$debet=$debet+$row->debet;
		$kredit=$kredit+$row->kredit;
		$ndebet=number_format($debet,0,',','.');
		$nkredit=number_format($kredit,0,',','.');
		echo "<tr>
    <td height='25' colspan='10' align='right'  class='header_laporan'>Sub Total</td>
    <td class='header_laporan' class='header_laporan' align='right'>$ndebet</td>
    <td class='header_laporan' class='header_laporan' align='right'>$nkredit</td>
  </tr>";
		echo "</table></div>";
		return "";
		
	}
	function doPrintHeader($sender, $page){								
		if ($page == 1){			
			foreach ($sender->title as $i => $value){
				$sender->SetFont('Arial','B',$sender->titleSize[$i]);
				$sender->SetX(20);
				$sender->Cell(0,$sender->titleHeight[$i],$value,0,1,'C');			
			}						
		}		
		$sender->SetFillColor(128,128,128);				
		$sender->SetLineWidth(.3);
		$sender->SetFont('Arial','B', $sender->headerSize);
		$sender->SetX(20);
		//Header
		$w= $sender->headerWidth;        	
		$h= $sender->headerHeight;      
		foreach($sender->header as $i => $value){
			$sender->Cell($w[$i],$h,$value,1,0,'C',false);
		}		
		$sender->Ln();
	}
	function createPdf()
	{						
		//$html = $this->getHtml();		
		//$pdf = new server_pdf_Pdf();
		//$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
		$periode=$tmp[2];
		uses("server_util_PdfLib");			
		$AddOnLib=new server_util_AddOnLib();						
		$sql="select a.no_jual as no_bukti,a.no_dokumen,c.nama,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.kode_akun,b.kode_pp,b.kode_vendor,b.kode_cust,b.nik,a.posted,b.keterangan,case when b.dc='D' then b.nilai else 0 end as debet,case when b.dc='C' then b.nilai else 0 end as kredit, a.kode_lokasi ". 
		         "from fri_jual_m a ".
				 "inner join ju_j b on a.no_jual=b.no_jual and a.kode_lokasi=b.kode_lokasi ".
			     "inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi ".$filter.
				 "order by $urut ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "Jurnal-Transaksi.pdf";		
		$title = array($this->lokasi,"LAPORAN JURNAL TRANSAKSI",strtoupper($AddOnLib->ubah_periode($periode)));
		$titleHeight= array(5,5,5);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,8,8);//fontSize judul
		//No, No Bukti, Tanggal Kode, Nama AKun, Kode Dept, KOde RKM, Keterangan, Debet, Kredit
		$header = array("No Bukti","Tanggal","Kode","Nama Akun","PP","DRK","Keterangan","Debet","Kredit");
		$headerWidth = array(20,15,15,35,13,13,35,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "P", "A4", 6, $header,8, 8, $headerWidth, 10);		
		$pdf->AliasNbPages();		
		$pdf->onPrintHeader->set($this, "doPrintHeader");
		$pdf->AddPage();			
		$rowHeight = 5;
		$defHeight = 5;
		$fill = false;		
		$ix = 1;
		$tmp = "";
		$debet =  0;
		$kredit =  0;
		$w = $pdf->headerWidth;
		$pdf->SetFont('Arial','', 6);
		$nb = "";		
		while ($row = $rs->FetchNextObject($toupper=false)){			
			$lokasi = $row->kode_lokasi;
			if ($nb != $row->no_bukti){
				if ($nb != ""){
					$pdf->SetX(20);
					$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$rowHeight,"Sub Total",1,0,'R',false);		
					$pdf->Cell($w[7],$rowHeight,number_format($debet,0,',','.'),1,0,'R',false);
					$pdf->Cell($w[8],$rowHeight,number_format($kredit,0,',','.'),1,1,'R',false);				
				}
				$ix = 1;
				$debet = 0;
				$kredit = 0;
				$nb = $row->no_bukti;
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$y1 = $pdf->GetY();											
			$numrowNm = $pdf->WordWrap($row->nama,$w[3] - 2);
			$numrowKet = $pdf->WordWrap(trim($row->keterangan), $w[6] - 2);			
			$numrow = max($numrowNm,$numrowKet);
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;
			
			$pdf->row = $row;																					
			//addRow
			$pdf->SetX(20);
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[0],$rowHeight,$row->no_bukti,1,0,'L',$fill);
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
			$pdf->Cell($w[1],$rowHeight,$row->tanggal,1,0,'L',$fill);
			$pdf->Cell($w[2],$rowHeight,$row->kode_akun,1,0,'L',$fill);
			$x = $pdf->GetX();
			$y = $pdf->GetY();
			$pdf->Cell($w[3],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
			$pdf->SetXY($pdf->GetX() - $w[3],$y);
			if ($numrow == $numrowNm) {				
				$pdf->MultiCell($w[3],$defHeight,$row->nama,'LTR');	
			}else if ($numrowNm > 1){
				 $pdf->MultiCell($w[3],$defHeight,$row->nama,'LTR');
			}else $pdf->Cell($w[3],$rowHeight,$row->nama,1,0,'L',$fill);														
			
			$y2 = $pdf->GetY();			
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0] + $w[1] + $w[2] + $w[3],  $pdf->GetY() - $y);											
			$pdf->Cell($w[4],$rowHeight,$row->kode_pp,1,0,'C',$fill);																	
			$pdf->Cell($w[5],$rowHeight,$row->kode_drk,1,0,'C',$fill);														
			$x = $pdf->GetX();
			$y = $pdf->GetY();
			$pdf->Cell($w[6],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
			$pdf->SetXY($pdf->GetX() - $w[6],$y);
			if ($numrow == $numrowKet){
				$pdf->MultiCell($w[6],$defHeight,trim($row->keterangan),'LTR');				
			}else if ($numrowKet > 1){
				 $pdf->MultiCell($w[6],$defHeight,trim($row->keterangan),'LTR');				
			}else $pdf->Cell($w[6],$rowHeight,trim($row->keterangan),1,0,'L',$fill);														
			$y2 = $pdf->GetY();
			//if ($y3 > $y2) $y2 = $y3;
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0] + $w[1] + $w[2] + $w[3] + $w[4] + $w[5] + $w[6],  $pdf->GetY() - $y);											
			$pdf->Cell($w[7],$rowHeight,number_format($row->debet,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[8],$rowHeight,number_format($row->kredit,0,',','.'),1,0,'R',$fill);						
			$ix++;
			$pdf->Ln();					
			$fill= false;					
		}
		$pdf->SetX(20);
		$pdf->SetFillColor(200,200,0);
		$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$rowHeight,"Sub Total",1,0,'R',false);		
		$pdf->Cell($w[7],$rowHeight,number_format($debet,0,',','.'),1,0,'R',false);
		$pdf->Cell($w[8],$rowHeight,number_format($kredit,0,',','.'),1,1,'R',false);				
		
		$max = $this->getTotalPage();
		if ($this->page==$max)
		{												
			$pdf->SetX(20);								
			$sql = "select 
					case when a.kode_spro = 'TTD1' then a.flag else '' end as nik1,
					case when a.kode_spro = 'TTD2' then a.flag else '' end as nik2,
					case when a.kode_spro = 'TTD1' then b.nama else '' end as nama1,
					case when a.kode_spro = 'TTD2' then b.nama else '' end as nama2,
					case when a.kode_spro = 'TTD1' then b.jabatan else '' end as jabatan,
					c.kota
					from spro a 
						inner join karyawan b on b.nik = a.flag and b.kode_lokasi = a.kode_lokasi
						inner join lokasi c on c.kode_lokasi = a.kode_lokasi
					where a.kode_lokasi = '".$lokasi."' and a.kode_spro in ('TTD1','TTD2')";		
			$rs=$dbLib->execute($sql);	
			if ($rs){
				while ($row = $rs->FetchNextObject(false)){
					if ($row->nik1 != "") $nik1 = $row->nik1;
					if ($row->nik2 != "") $nik2 = $row->nik2;
					if ($row->nama1 != "") $nama1 = $row->nama1;
					if ($row->nama2 != "") $nama2 = $row->nama2;
					if ($row->jabatan != "") $jabatan = $row->jabatan;
					if ($row->kota != "") $kota = $row->kota;
				}
			}
			$pdf->Ln();
			$pdf->Cell(0, 5,$kota.",   ". $AddOnLib->ubah_periode($periode),0,1,'R',false);
			$pdf->Cell($pdf->w / 3, 5,'',0,0,'R',false);
			$pdf->Cell($pdf->w / 3, 5,'Mengetahui/Menyetujui',0,1,'C',false);
			$pdf->Cell($pdf->w / 3, 5,'',0,0,'C',false);			
			$pdf->Cell($pdf->w / 3, 5,strtoupper($jabatan),0,0,'C',false);						
			$pdf->Cell($pdf->w / 3, 5,'PELAKSANA AKUNTANSI',0,1,'C',false);			
			$pdf->Ln();
			$pdf->Ln();			
			$pdf->Cell($pdf->w / 3, 5,'',0,0,'C',false);			
			$pdf->Cell($pdf->w / 3, 5,strtoupper($nama1),0,0,'C',false);			
			$pdf->Cell($pdf->w / 3, 5,strtoupper($nama2),0,1,'C',false);						
			$pdf->Cell($pdf->w / 3, 5,'',0,0,'C',false);			
			$pdf->Cell($pdf->w / 3, 5,strtoupper($nik1),0,0,'C',false);			
			$pdf->Cell($pdf->w / 3, 5,strtoupper($nik2),0,1,'C',false);			
		}
		
		$ret = $pdf->Output($namafile,'I',true);		
		return $ret;		
	}
}
?>
