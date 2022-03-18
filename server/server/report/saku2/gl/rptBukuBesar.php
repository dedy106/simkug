<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptBukuBesar extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(*) as jml from bb_tmp a ". $this->filter;			
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
		$sql="select no_urut,a.kode_akun,a.nama,a.kode_lokasi,periode,so_awal, 
                     no_bukti,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal,keterangan,kode_pp,kode_drk,debet,kredit,totdebet, totkredit, saldo 
                    from bb_tmp a ".$this->filter ."order by no_urut";        
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);			
	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//$retHtml = "<table><tr><td>";
		echo "<div align='center'><table width='900'><tr><td>";
		//$retHtml .= $AddOnLib->judul_laporan("laporan buku besar", $this->lokasi, $this->showFilter);
		echo $AddOnLib->judul_laporan("laporan buku besar", $this->lokasi, $this->showFilter);
		$html = "";
		$htmlHeader = "";
		$saldo = 0;
		while ($row = $rs->FetchNextObject($toupper=false)){
			if ($tmp!=$row->kode_akun){
				$tmp=$row->kode_akun;
				$first = true;
				$saldoTmp = $saldo; 
				$sawalBfr = $sawal;
                $sawal = $row->so_awal;                
				if ($htmlHeader != ""){
				    $html .="<tr>
                            <td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>
                            <td valign='top' class='sum_laporan'><div align='right'>".number_format($debet,0,',','.')."</div></td>
                            <td valign='top' class='sum_laporan'><div align='right'>".number_format($kredit,0,',','.')."</div></td>
                            <td valign='top' class='sum_laporan'></td>
                          </tr>
                          <tr>
                            <td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>
                            <td valign='top' class='sum_laporan'><div align='right'>".number_format($saldoTmp,0,',','.')."</span></div></td>
                          </tr>";            		
				    echo "<table width='900' border='1' cellspacing='0' cellpadding='1' class='kotak'>
                          <tr>
                            <td height='23' colspan='9' class='header_laporan'>".$htmlHeader."</td>
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
                          </tr>
						  <tr>
                            <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td>
                            <td class='header_laporan'><div align='right'>".number_format($sawalBfr,0,',','.')."</div></td>
                          </tr>".$html."</table></br></br>";   
                    $html = "";
                }
            }
            if ($first){
                $htmlHeader ="<table width='100%' border='0' cellspacing='2' cellpadding='1'>
                  
                  <tr>
                    <td class='header_laporan'>Kode Akun  </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  
                </table>";
            }
            $first = false;			
			$saldo=$row->saldo;	
			$debet=$row->totdebet;
			$kredit=$row->totkredit;	
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
			$i=$i+1;
		}
		$html .="<tr>
                <td height='20' colspan='6' valign='top' class='sum_laporan'><div align='right'>Mutasi</div></td>
                <td valign='top' class='sum_laporan'><div align='right'>".number_format($debet,0,',','.')."</div></td>
                <td valign='top' class='sum_laporan'><div align='right'>".number_format($kredit,0,',','.')."</div></td>
                <td valign='top' class='sum_laporan'></td>
              </tr>
              <tr>
                <td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir</div></td>
                <td valign='top' class='sum_laporan'><div align='right'>".number_format($saldo,0,',','.')."</span></div></td>
              </tr>";
		echo  "<table width='900' border='1' cellspacing='0' cellpadding='0' class='kotak'>
			<tr><td height='23' colspan='9' class='header_laporan'>".$htmlHeader."</td></tr>
        	<tr>
                <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td> 
               <td class='header_laporan'><div align='right'>".number_format($sawal,0,',','.')."</div></td>
            </tr>
            <tr bgcolor='#CCCCCC'>
                <td width='74' height='23' class='header_laporan'><div align='center'>No Bukti</div></td>
            	 <td width='74' height='23' class='header_laporan'><div align='center'>No Dokumen</div></td>
                <td width='69' class='header_laporan'><div align='center'>Tanggal</div></td>
                <td width='233' class='header_laporan'><div align='center'>Keterangan</div></td>
                <td width='50' class='header_laporan'><div align='center'>PP</div></td>
                <td width='50' class='header_laporan'><div align='center'>DRK</div></td>
                <td width='90' class='header_laporan'><div align='center'>Debet</div></td>
                <td width='90' class='header_laporan'><div align='center'>Kredit</div></td>
                <td width='90' class='header_laporan'><div align='center'>Balance</div></td>
              </tr>".$html."</table></br></br>";
        //$retHtml .= "</td></tr></table>";
		echo "</td></tr></table></div>";		
		//$retHtml = str_replace(chr(9),"",$retHtml);
		return "";
	}
	function runScript($sql,$uid,$paging,$sqlCount){	    
    }
	function preview()
	{
		return $this->getHtml();
	}
	function doPrintHeader($sender, $page, $printJudul = null){		
		$sender->SetX(5);		
		$sender->SetFont('Arial','B',8);
		if ($page == 1  ) {
			if (!isset($printJudul))
				$sender->Cell(0,10,"BUKU BESAR",0,1,'C');			
		}
		$sender->SetFont('Arial','B',8);
		$sender->SetX(20);	
		$width= $sender->w - $sender->rMargin;
		//$sender->Cell(10,8,"",'L',0,'C');$sender->Cell(30,8,"Periode",0,0,'l');$sender->Cell(5,8,":",0,0,'C');$sender->Cell($w-  55,8,$sender->row->periode,'R',1,'L');
		$sender->Cell(10,8,"",'LT',0,'C');$sender->Cell(30,8,"Kode Akun","T",0,'l');$sender->Cell(5,8,":","T",0,'C');$sender->Cell($width - 63,8,$sender->row->kode_akun,'RT',1,'L');
		$sender->SetX(20);	
		$sender->Cell(10,8,"",'LB',0,'C');$sender->Cell(30,8,"Nama Akun","B",0,'l');$sender->Cell(5,8,":","B",0,'C');$sender->Cell($width - 63,8,$sender->row->nama,'RB',1,'l');
		//$sender->Cell(10,8,"",'L',0,'C');$sender->Cell(30,8,"Kode Lokasi",0,0,'l');$sender->Cell(5,8,":",0,0,'C');$sender->Cell($w- 55,8,$sender->row->kode_lokasi,'R',1,'l');
		$sender->SetX(20);
		//$sender->Ln();
		$sender->SetFillColor(128,128,128);				
		$sender->SetLineWidth(.3);
		$sender->SetFont('Arial','B', $sender->headerSize);
		//Header		
		$w= array(20,13,$width - 137,13,13,20,20,20);//dalam mm
		$sender->headerWidth = $w;
		$h= $sender->headerHeight;      
		foreach($sender->header as $i => $value){
			$sender->Cell($w[$i],$h,$value,1,0,'C',false);
		}					
		$sender->Ln();  
		$sender->SetX(20);		
		$sender->SetFont('Arial','', 5);		
		$sender->Cell($width - 38,8,"Saldo Awal",1,0,'R');		
		if ($sender->beda || $page == 1){
			$sender->Cell(20,8,number_format($sender->saldo,0,',','.'),1,1,'R');						
		}else {
			$sender->Cell(20,8,number_format($sender->saldo,0,',','.'),1,1,'R');			
			//row->saldo - ($sender->row->debet - $sender->row->kredit) 
		}
		
		
		
	}
	function createPdf()
	{		
		//$html = $this->getHtml();		
		//$pdf = new server_pdf_Pdf();
		//$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		global $dbLib;
		uses("server_util_PdfLib");			
		$title = array($this->lokasi,"Laporan Buku Besar");
		$titleHeight= array(5,8);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,14);//fontSize judul
		$header = array("No Bukti","Tanggal","Keterangan","PP","DRK","Debet","Kredit","Balance");
		$headerWidth = array(20,13,100,15,15,20,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "P", "A4", 7, $header,7, 7, $headerWidth, 10);		
		$pdf->AliasNbPages();				
		$pdf->onPrintHeader->set($this, "doPrintHeader");		
		$sql="select no_urut,a.kode_akun,a.nama,a.kode_lokasi,periode,so_awal, 
                     no_bukti,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal,keterangan,kode_pp,kode_drk,debet,kredit,totdebet, totkredit, saldo 
                    from bb_tmp a ".$this->filter ."order by no_urut";        
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "buku-besar.pdf";				
		$defHeight = 5;
		$rowHeight = 5;
		$fill = false;		
		$ix = 1;
		$tmp = "";
		while ($row = $rs->FetchNextObject($toupper=false)){												
			if ($tmp == ""){
				$ix = 1;								
				$pdf->row = $row;
				$pdf->saldo = $row->so_awal;
				$pdf->AddPage();			
				$pdf->changeHeader = false;					
				$w = $pdf->headerWidth;	
				$pdf->SetFillColor(200,200,200);
				$pdf->SetTextColor(0);
				$pdf->SetX(20);
				$pdf->SetFont('Arial','',5);				
				$tmp = $row->kode_akun;				
				$pdf->beda = true;
			}else if ($row->kode_akun != $tmp){
				$ix = 1;				
				//$saldo = $pdf->saldo; 
				$sawalBfr = $sawal;
                $sawal = $row->so_awal;                     
                $pdf->saldo = $pdf->row->saldo;
				$pdf->SetX(20);
				$pdf->SetFont('Arial','',5);
				$pdf->SetFillColor(200,200,200);
				$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4],$rowHeight,"Mutasi",1,0,'R',false);		
				$pdf->Cell($w[5],$rowHeight,number_format($debet,0,',','.'),1,0,'R',false);
				$pdf->Cell($w[6],$rowHeight,number_format($kredit,0,',','.'),1,0,'R',false);
				$pdf->Cell($w[7],$rowHeight,"",1,1,'R',false);
				$pdf->SetX(20);
				$pdf->SetFillColor(200,200,0);
				$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$rowHeight,"Saldo Akhir",1,0,'R',false);				
				$pdf->Cell($w[7],$rowHeight,number_format($saldo,0,',','.'),1,1,'R',false);								
				
				$pdf->beda = true;
				$pdf->row = $row;	
				$pdf->saldo = $row->so_awal;
				//$pdf->AddPage();						
				$this->doPrintHeader($pdf, $pdf->page, true);
				//$pdf->SetX(20);
				$pdf->SetFont('Arial','',5);
				
				$tmp = $row->kode_akun;		
				$fill = false;
				$ix = 0;
			}else $pdf->row = $row;				
			$pdf->beda = false;
			$pdf->saldo = $row->saldo - ($row->debet - $row->kredit) ;
			$saldo = $row->saldo;	
			$debet = $row->totdebet;
			$kredit = $row->totkredit;	
						
			$numrow2 = $pdf->WordWrap($row->keterangan, $w[2] - 2);
			$numrow = max($numrow1,$numrow2);
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;			
			
			$pdf->SetX(20);
			$pdf->SetFont('Arial','',5);
			$pdf->SetFillColor(200,200,200);
			$y1 = $pdf->GetY();									
			//error_log($pdf->GetY() . " - ". $y1);			
			//addRow						
			$pdf->SetFillColor(224,235,255);			
			$pdf->Cell($w[0],$rowHeight,$row->no_bukti,1,0,'L',$fill);														
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();			
			$pdf->Cell($w[1],$rowHeight,$row->tanggal,1,0,'L',$fill);														
			$pdf->MultiCell($w[2],$numrow == $numrow2 ? $defHeight : $rowHeight,$row->keterangan,1);														
			$y2 = $pdf->GetY();
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0] + $w[1] + $w[2],  $pdf->GetY() - $y);
			
			$pdf->Cell($w[3],$rowHeight,$row->kode_pp,1,0,'C',$fill);																	
			$pdf->Cell($w[4],$rowHeight,$row->kode_drk,1,0,'C',$fill);														
			$pdf->Cell($w[5],$rowHeight,number_format($row->debet,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[6],$rowHeight,number_format($row->kredit,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[7],$rowHeight,number_format($saldo,0,',','.'),1,0,'R',$fill);
			$pdf->Ln();
			$ix++;			
			
			$fill= false;				
			
		}	
		$pdf->SetX(20);
		$pdf->SetFillColor(200,200,200);
		$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4],$rowHeight,"Mutasi",1,0,'R',false);		
		$pdf->Cell($w[5],$rowHeight,number_format($debet,0,',','.'),1,0,'R',false);
		$pdf->Cell($w[6],$rowHeight,number_format($kredit,0,',','.'),1,0,'R',false);
		$pdf->Cell($w[7],$rowHeight,"",1,1,'R',false);
		$pdf->SetX(20);
		$pdf->SetFillColor(200,200,0);		
		$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$rowHeight,"Saldo Akhir",1,0,'R',false);				
		$pdf->Cell($w[7],$rowHeight,number_format($saldo,0,',','.'),1,1,'R',false);
		$ret = $pdf->Output($namafile,'I',false);
		return $ret;		
	}
	
	
}
?>
