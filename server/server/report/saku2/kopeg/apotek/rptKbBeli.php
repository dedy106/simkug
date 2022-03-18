<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_apotek_rptKbBeli extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_kas) as jum
from kas_m a
left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi $filter2 $modul";
		
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
		$sql="select a.no_kas,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi,
       a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app,c.nama as nama_setuju,c.jabatan as jabatan_setuju,d.kota
from kas_m a
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi $this->filter ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellspacing='2' cellpadding='1'>
			  <tr>
				<td align='center' class='header_laporan'>JURNAL KASBANK</td>
			  </tr>
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				 
				  <tr>
					<td width='100' class='header_laporan'>No Bukti </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_kas</td>
					</tr>
				  <tr>
					<td width='100' class='header_laporan'>No Dokumen </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_dokumen</td>
					</tr>
				  <tr>
					<td class='header_laporan'>Periode</td>
					<td class='header_laporan'>:&nbsp;$row->periode</td>
					</tr>
				  <tr>
					<td class='header_laporan'>Tanggal</td>
					<td class='header_laporan'>:&nbsp;$row->tanggal1</td>
					</tr>
				 
				<tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:&nbsp;$row->keterangan</td>
				  </tr>
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='header_laporan'><div align='center'>No</div></td>
				<td width='60' class='header_laporan'><div align='center'>Akun</div></td>
				<td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
				<td width='200' class='header_laporan'><div align='center'>Keterangan </div></td>
				<td width='40' class='header_laporan'><div align='center'>PP </div></td>
				<td width='60' class='header_laporan'><div align='center'>DRK </div></td>
				<td width='40' class='header_laporan'><div align='center'>CF </div></td>
				<td width='90' class='header_laporan'><div align='center'>Debet</div></td>
				<td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
			  </tr>";
	  $sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,a.kode_cf,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
			from kas_j a
			inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
			where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
			order by a.no_urut ";
		//error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$debet=number_format($row1->debet,0,',','.');
			$kredit=number_format($row1->kredit,0,',','.');
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan'>$row1->kode_akun</td>
				<td class='isi_laporan'>$row1->nama</td>
				<td class='isi_laporan'>$row1->keterangan</td>
				<td class='isi_laporan' align='center'>$row1->kode_pp</td>
				<td class='isi_laporan'>$row1->kode_drk</td>
				<td class='isi_laporan' align='center'>$row1->kode_cf</td>
				<td class='isi_laporan' align='right'>$debet</td>
				<td class='isi_laporan' align='right'>$kredit</td>
			  </tr>";
				$i=$i+1;
		}
		$tot_debet1=number_format($tot_debet,0,',','.');
		$tot_kredit1=number_format($tot_debet,0,',','.');
	  echo "<tr>
   
    <td colspan='7' class='header_laporan' align='right'>Total</td>
    <td class='isi_laporan' align='right'>$tot_debet1</td>
    <td class='isi_laporan' align='right'>$tot_kredit1</td>
  </tr>
	</table></td>
  </tr>
  <tr>
    <td align='left'><table border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td colspan='2' class='header_laporan'>$row->kota, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr>
        <td width='120' class='header_laporan'>Diperiksa Oleh : </td>
        <td width='120' class='header_laporan'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nama_setuju</td>
        <td class='header_laporan'>$row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>$row->nik_app</td>
        <td class='header_laporan'>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	function doPrintHeader($sender, $page){		
		//$sender->SetY(10);		
		$sender->SetFont('Arial','B',$sender->titleSize[0]);
		$sender->Cell(0,10,"MEMO JURNAL",'LTR',1,'C');			
		$w = $sender->w - $sender->rMargin;
		$sender->SetFont('Arial','B', $sender->headerSize);
		$sender->Cell(10,5,"",'L',0,'C');$sender->Cell(30,5,"No Bukti",0,0,'l');$sender->Cell(5,5,":",0,0,'C');$sender->Cell($w-  55,5,$sender->row->no_kas,'R',1,'L');
		$sender->Cell(10,5,"",'L',0,'C');$sender->Cell(30,5,"No Dokumen",0,0,'l');$sender->Cell(5,5,":",0,0,'C');$sender->Cell($w - 55,5,$sender->row->no_dokumen,'R',1,'L');
		$sender->Cell(10,5,"",'L',0,'C');$sender->Cell(30,5,"Periode",0,0,'l');$sender->Cell(5,5,":",0,0,'C');$sender->Cell($w - 55,5,$sender->row->periode,'R',1,'l');
		$sender->Cell(10,5,"",'L',0,'C');$sender->Cell(30,5,"Tanggal",0,0,'l');$sender->Cell(5,5,":",0,0,'C');$sender->Cell($w- 55,5,$sender->row->tanggal1,'R',1,'l');
		$sender->Cell(10,5,"",'L',0,'C');$sender->Cell(30,5,"Keterangan",0,0,'l');$sender->Cell(5,5,":",0,0,'C');$sender->Cell($w- 55,5,$sender->row->keterangan,'R',1,'l');
				
		//$sender->Ln();
		$sender->SetFillColor(128,128,128);				
		$sender->SetLineWidth(.3);
		$sender->SetFont('Arial','B', $sender->headerSize);
		//Header		
		$w= array(10,20,80,$w - 210,20,20,25,25);//dalam mm
		$sender->headerWidth = $w;
		$h= $sender->headerHeight;      
		foreach($sender->header as $i => $value){
			$sender->Cell($w[$i],$h,$value,1,0,'C',false);
		}			
		$sender->changeHeader = false;
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
		$title = array($this->lokasi,"Laporan Bukti Jurnal");
		$titleHeight= array(8);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(14);//fontSize judul
		$header = array("No","Kode Akun","Nama","Keterangan","Kode PP","DRK","Debet","Kredit");
		$headerWidth = array(10,20,80,12,20,20,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "L", "A4", 8, $header,8, 8, $headerWidth, 10);		
		$pdf->AliasNbPages();			
		$pdf->onPrintHeader->set($this, "doPrintHeader");		
		
		$sql="select a.no_kas,a.no_dokumen,a.kode_lokasi,a.periode,a.tanggal,date_format(a.tanggal,'%d/%m/%Y') as tanggal1,a.keterangan,a.kode_lokasi,
				   a.nik_buat,b.nama as nama_buat,b.jabatan as jabatan_buat,a.nik_app,c.nama as nama_setuju,c.jabatan as jabatan_setuju,d.kota
			from kas_m a
			inner join lokasi d on a.kode_lokasi=d.kode_lokasi
			left join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
			left join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi $filter2 $modul ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "Bukti-Jurnal-kb.pdf";				
		$rowHeight = 5;
		$defHeight = 5;
		$fill = false;		
		$ix = 1;
		$tmp = "";
		$w= array(10,20,80,$pdf->w - $pdf->rMargin - 210,20,20,25,25);//dalam mm
		while ($row = $rs->FetchNextObject($toupper=false)){
			$pdf->row = $row;			
			$sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
				from kas_j a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
				order by a.no_urut ";
			$rs1 = $dbLib->execute($sql1);
			$ix=1;
			$tot_debet=0;
			$tot_kredit=0;
			$pdf->AddPage();
			$pdf->SetFont('Arial','',6);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{							
				$tot_debet=$tot_debet+$row1->debet;
				$tot_kredit=$tot_kredit+$row1->kredit;
				$y1 = $pdf->GetY();											
				$numrowNm = $pdf->WordWrap($row1->nama,$w[2] - 2);
				$numrowKet = $pdf->WordWrap($row1->keterangan, $w[3] - 2);				
				$numrow = max($numrowNm,$numrowKet);
				if ($numrow <= 0) $numrow = 1;
				$rowHeight = $numrow * $defHeight;
				
				$pdf->SetFillColor(200,200,200);
				$pdf->Cell($w[0],$rowHeight,$ix,1,0,'L',false);
				if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
				//addRow
				$pdf->SetFillColor(224,235,255);
				$pdf->Cell($w[1],$rowHeight,$row1->kode_akun,1,0,'L',$fill);														
				$pdf->MultiCell($w[2],$numrow == $numrowNm ? $defHeight : $rowHeight,$row1->nama,1);														
				$y2 = $pdf->GetY();
				$y = $y2 - $y1;			
				$pdf->SetXY(10 + $w[0] + $w[1] + $w[2],  $pdf->GetY() - $y);											
				$pdf->MultiCell($w[3],$numrow == $numrowKet ? $defHeight : $rowHeight,$row1->keterangan,1);
				$y2 = $pdf->GetY();
				$y = $y2 - $y1;			
				$pdf->SetXY(10 + $w[0] + $w[1] + $w[2] + $w[3],  $pdf->GetY() - $y);																									
				$pdf->Cell($w[4],$rowHeight,$row1->kode_pp,1,0,'C',$fill);																	
				$pdf->Cell($w[5],$rowHeight,$row1->kode_drk,1,0,'C',$fill);														
				$pdf->Cell($w[6],$rowHeight,number_format($row1->debet,0,',','.'),1,0,'R',$fill);
				$pdf->Cell($w[7],$rowHeight,number_format($row1->kredit,0,',','.'),1,0,'R',$fill);				
				
				$ix++;
				$pdf->Ln();
				$fill=false;					
			}
			$pdf->SetFillColor(200,200,200);
			$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5],$rowHeight,"Total",1,0,'R',false);		
			$pdf->Cell($w[6],$rowHeight,number_format($tot_debet,0,',','.'),1,0,'R',false);
			$pdf->Cell($w[7],$rowHeight,number_format($tot_kredit,0,',','.'),1,1,'R',false);			
			
			$pdf->Cell(0,$rowHeight,$row->kota.", ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6)),0,1,"R");
			$pdf->Cell($pdf->w / 2,$rowHeight, "Diperiksa Oleh : ",0,0,'C');$pdf->Cell($pdf->w / 2,$rowHeight, "Dibuat Oleh : ",0,1,'C');
			$pdf->Ln(20);
			$pdf->Cell($pdf->w / 2,$rowHeight, $row->nama_setuju,0,0,'C');$pdf->Cell($pdf->w / 2,$rowHeight, $row->nama_buat,0,1,'C');
			$pdf->Cell($pdf->w / 2,$rowHeight, $row->jabatan_setuju,0,0,'C');$pdf->Cell($pdf->w / 2,$rowHeight, $row->jabatan_buat,0,1,'C');			
		}					
		$ret = $pdf->Output($namafile,'I',true);
		return $ret;		
	}
}
?>
