<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptKbJurnal extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.no_kas) 
from kas_j a  
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$sql="select a.no_kas as no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.kode_cf,a.modul,a.keterangan, 
case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
from kas_j a  
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $this->filter 
order by a.periode,a.no_kas,a.dc desc ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN JURNAL KASBANK",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='20'  class='header_laporan'><div align='center'>No</div></td>
    <td width='70' class='header_laporan'><div align='center'>No Kas</div></td>
	<td width='70' class='header_laporan'><div align='center'>No Dokumen</div></td>
    <td width='50' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='50' height='25' class='header_laporan'><div align='center'>Akun</div></td>
    <td width='150' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='30' class='header_laporan'><div align='center'>PP</div></td>
	<td width='40' class='header_laporan'><div align='center'>DRK</div></td>
  <td width='40' class='header_laporan'><div align='center'>CF</div></td>
  <td width='30' class='header_laporan'><div align='center'>Modul</div></td>
    <td width='150' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
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
    <td height='25' colspan='11' align='right'  class='header_laporan'>Sub Total</td>
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
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->nama))."</td>
    <td valign='middle' class='isi_laporan' align='center'>$row->kode_pp</td>
	<td valign='middle' class='isi_laporan'>$row->kode_drk</td>
	  <td valign='middle' class='isi_laporan' align='center'>$row->kode_cf</td>
	  <td valign='middle' class='isi_laporan' align='center'>$row->modul</td>
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->keterangan))."</td>
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
    <td height='25' colspan='11' align='right'  class='header_laporan'>Sub Total</td>
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
				$sender->Cell(0,$sender->titleHeight[$i],$value,0,1,'C');			
			}						
		}		
		$sender->SetFillColor(128,128,128);				
		$sender->SetLineWidth(.3);
		$sender->SetFont('Arial','B', $sender->headerSize);
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
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		uses("server_util_PdfLib");			
		$AddOnLib=new server_util_AddOnLib();						
		$sql="select a.no_kas as no_bukti,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,b.nama,a.kode_pp,a.kode_drk,a.kode_cf,a.modul,a.keterangan, 
		case when a.dc='D' then a.nilai else 0 end as debet,case when a.dc='C' then a.nilai else 0 end as kredit 
		from kas_j a  
		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $filter $modul
		order by a.periode,a.no_kas,a.dc desc ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "Jurnal-Transaksi-kb.pdf";		
		$title = array($this->lokasi,"Laporan Jurnal Transaksi Kas Bank",$AddOnLib->ubah_periode($periode));
		$titleHeight= array(5,8,6);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,14,8);//fontSize judul
		//No, No Bukti, Tanggal Kode, Nama AKun, Kode Dept, KOde RKM, Keterangan, Debet, Kredit
		$header = array("No","No Kas","No Dokumen","Tanggal","Kode","Nama Akun","PP","DRK","CF","Modul","Keterangan","Debet","Kredit");
		$headerWidth = array(10,20,30,15,15,50,15,15,10,10,50,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "L", "A4", 6, $header,8, 8, $headerWidth, 10);		
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
		$pdf->SetFont('Arial','', 5);
		$nb = "";		
		while ($row = $rs->FetchNextObject($toupper=false)){			
			if ($nb != $row->no_bukti){
				if ($nb != ""){
					$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6]+$w[7]+$w[8]+$w[9]+$w[10],$rowHeight,"Sub Total",1,0,'R',false);		
					$pdf->Cell($w[11],$rowHeight,number_format($debet,0,',','.'),1,0,'R',false);
					$pdf->Cell($w[12],$rowHeight,number_format($kredit,0,',','.'),1,1,'R',false);				
				}
				$ix = 1;
				$debet = 0;
				$kredit = 0;
				$nb = $row->no_bukti;
			}
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$y1 = $pdf->GetY();											
			$numrowDok = $pdf->WordWrap($row->no_dokumen,$w[2] - 2);
			$numrowNm = $pdf->WordWrap($row->nama,$w[5] - 2);
			$numrowKet = $pdf->WordWrap($row->keterangan, $w[10] - 2);			
			$numrow = max(max($numrowNm,$numrowKet),$numrowDok);
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;
			
			$pdf->row = $row;																
			$pdf->SetFillColor(200,200,200);
			$pdf->Cell($w[0],$rowHeight,$ix,1,0,'C',false);
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
			//addRow
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[1],$rowHeight,$row->no_bukti,1,0,'L',$fill);			
			$pdf->MultiCell($w[2],$numrow == $numrowDok ? $defHeight : $rowHeight,$row->no_dokumen,1);
			$y2 = $pdf->GetY();
			$y = $y2 - $y1;			
			$pdf->SetXY(10 + $w[0] + $w[1] + $w[2],  $pdf->GetY() - $y);											
			$pdf->Cell($w[3],$rowHeight,$row->tanggal,1,0,'L',$fill);														
			$pdf->Cell($w[4],$rowHeight,$row->kode_akun,1,0,'L',$fill);														
			$pdf->MultiCell($w[5],$numrow == $numrowNm ? $defHeight : $rowHeight,$row->nama,1);														
			$y2 = $pdf->GetY();
			$y = $y2 - $y1;			
			$pdf->SetXY(10 + $w[0] + $w[1] + $w[2] + $w[3] + $w[4]+ $w[5],  $pdf->GetY() - $y);											
			$pdf->Cell($w[6],$rowHeight,$row->kode_pp,1,0,'C',$fill);																	
			$pdf->Cell($w[7],$rowHeight,$row->kode_drk,1,0,'C',$fill);														
			$pdf->Cell($w[8],$rowHeight,$row->kode_cf,1,0,'C',$fill);																	
			$pdf->Cell($w[9],$rowHeight,$row->modul,1,0,'C',$fill);														
			$pdf->MultiCell($w[10],$numrow == $numrowKet ? $defHeight : $rowHeight,$row->keterangan,1);
			$y2 = $pdf->GetY();
			$y = $y2 - $y1;			
			$pdf->SetXY(10 + $w[0] + $w[1] + $w[2] + $w[3] + $w[4] + $w[5] + $w[6] + $w[7]+ $w[8] + $w[9] + $w[10],  $pdf->GetY() - $y);
			$pdf->Cell($w[11],$rowHeight,number_format($row->debet,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[12],$rowHeight,number_format($row->kredit,0,',','.'),1,0,'R',$fill);									
			$pdf->Ln();					
			$ix++;
			$fill= false;					
		}
		$pdf->SetFillColor(200,200,0);
		$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6]+$w[7]+$w[8]+$w[9]+$w[10],$rowHeight,"Sub Total",1,0,'R',false);		
		$pdf->Cell($w[11],$rowHeight,number_format($debet,0,',','.'),1,0,'R',false);
		$pdf->Cell($w[12],$rowHeight,number_format($kredit,0,',','.'),1,1,'R',false);				
		
		$ret = $pdf->Output($namafile,'I',true);
		
		return $ret;		
	}
}
?>
