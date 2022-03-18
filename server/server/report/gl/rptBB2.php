<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");      
class server_report_gl_rptBB2
{
	protected $caption;
	protected $filter;
	protected $filter2;
	
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
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
		echo "<div align='center'></div><table><tr><td>";
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
				    echo "<table border='1' cellspacing='0' cellpadding='1' class='kotak'>
                          <tr>
                            <td height='23' colspan='9' class='header_laporan'>".$htmlHeader."</td>
                          </tr>
                          <tr>
                            <td height='23' colspan='8' class='header_laporan'><div align='right'>Saldo Awal </div></td>
                            <td class='header_laporan'><div align='right'>".number_format($sawalBfr,0,',','.')."</div></td>
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
                          </tr>".$html."</table></br></br>";   
                    $html = "";
                }
            }
            if ($first){
                $htmlHeader ="<table width='622' border='0' cellspacing='2' cellpadding='1'>
                  <tr>
                    <td width='100' class='header_laporan'>Periode </td>
                    <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Kode Akun  </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_akun</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Nama Akun </td>
                    <td class='header_laporan'>:&nbsp;$row->nama</td>
                  </tr>
                  <tr>
                    <td class='header_laporan'>Kode Lokasi </td>
                    <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
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
                <td height='20' colspan='8' valign='top' class='sum_laporan'><div align='right'>Saldo Akhir </div></td>
                <td valign='top' class='sum_laporan'><div align='right'>".number_format($saldo,0,',','.')."</span></div></td>
              </tr>";
		echo  "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
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
                <td width='50' class='header_laporan'><div align='center'>Kode PP</div></td>
                <td width='50' class='header_laporan'><div align='center'>Kode RKM</div></td>
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
	function doPrintHeader($sender, $page){		
		//$sender->SetY(10);		
		$sender->SetFont('Times','B',$sender->titleSize[$i]);
		$sender->Cell(0,10,"Laporan Buku Besar",'LTR',1,'C');			
		$w = $sender->w - $sender->rMargin;
		$sender->Cell(10,8,"",'L',0,'C');$sender->Cell(30,8,"Periode",0,0,'l');$sender->Cell(5,8,":",0,0,'C');$sender->Cell($w-  55,8,$sender->row->periode,'R',1,'L');
		$sender->Cell(10,8,"",'L',0,'C');$sender->Cell(30,8,"Kode Akun",0,0,'l');$sender->Cell(5,8,":",0,0,'C');$sender->Cell($w - 55,8,$sender->row->kode_akun,'R',1,'L');
		$sender->Cell(10,8,"",'L',0,'C');$sender->Cell(30,8,"Nama Akun",0,0,'l');$sender->Cell(5,8,":",0,0,'C');$sender->Cell($w - 55,8,$sender->row->nama,'R',1,'l');
		$sender->Cell(10,8,"",'L',0,'C');$sender->Cell(30,8,"Kode Lokasi",0,0,'l');$sender->Cell(5,8,":",0,0,'C');$sender->Cell($w- 55,8,$sender->row->kode_lokasi,'R',1,'l');
		
		$sender->SetFont('','', 8);		
		$sender->Cell($w - 30,8,"Saldo Awal",1,0,'R');
		if ($sender->changeHeader || $page == 1)
			$sender->Cell(20,8,number_format($sender->row->so_awal,0,',','.'),1,1,'R');
		else 		
			$sender->Cell(20,8,number_format($sender->row->saldo - ($sender->row->debet - $sender->row->kredit) ,0,',','.'),1,1,'R');
		
		//$sender->Ln();
		$sender->SetFillColor(128,128,128);				
		$sender->SetLineWidth(.3);
		$sender->SetFont('','B', $sender->headerSize);
		//Header		
		$w= array(10,30,30,20,$w - 200,20,20,20,20,20);//dalam mm
		$sender->headerWidth = $w;
		$h= $sender->headerHeight;      
		foreach($sender->header as $i => $value){
			$sender->Cell($w[$i],$h,$value,1,0,'C',true);
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
		uses("server_util_PdfLib");			
		$title = array($this->lokasi,"Laporan Buku Besar");
		$titleHeight= array(5,8);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,14);//fontSize judul
		$header = array("No","No Bukti","No Dokumen","Tanggal","Keterangan","Kode PP","Kode RKM","Debet","Kredit","Balance");
		$headerWidth = array(10,20,20,12,100,15,15,20,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "L", "A4", 8, $header,10, 10, $headerWidth, 10);		
		$pdf->AliasNbPages();				
		$pdf->onPrintHeader->set($this, "doPrintHeader");		
		$sql="select no_urut,a.kode_akun,a.nama,a.kode_lokasi,periode,so_awal, 
                     no_bukti,no_dokumen,date_format(tanggal,'%d/%m/%Y') as tanggal,keterangan,kode_pp,kode_drk,debet,kredit,totdebet, totkredit, saldo 
                    from bb_tmp a ".$this->filter ."order by no_urut";        
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "buku-besar.pdf";				
		$rowHeight = 5;
		$fill = false;		
		$ix = 1;
		$tmp = "";
		while ($row = $rs->FetchNextObject($toupper=false)){
			$pdf->row = $row;			
			if ($tmp == ""){
				$pdf->AddPage();
				$w = $pdf->headerWidth;				
				$pdf->SetFillColor(200,200,200);
				$pdf->SetTextColor(0);
				$pdf->SetFont('','', 8);
				$tmp = $row->kode_akun;
			}else if ($row->kode_akun != $tmp){
				$ix = 0;				
				$saldoTmp = $saldo; 
				$sawalBfr = $sawal;
                $sawal = $row->so_awal;                
				$pdf->SetFillColor(200,200,200);
				$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$rowHeight,"Mutasi",1,0,'L',true);		
				$pdf->Cell($w[7],$rowHeight,number_format($debet,0,',','.'),1,0,'R',true);
				$pdf->Cell($w[8],$rowHeight,number_format($kredit,0,',','.'),1,0,'R',true);
				$pdf->Cell($w[9],$rowHeight,"",1,1,'R',true);
				$pdf->SetFillColor(200,200,0);
				$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6]+$w[7]+$w[8],$rowHeight,"Saldo Akhir",1,0,'L',true);				
				$pdf->Cell($w[9],$rowHeight,number_format($saldo,0,',','.'),1,0,'R',true);
				$pdf->changeHeader = true;
				$pdf->AddPage();		
				$tmp = $row->kode_akun;		
				$fill = false;
				$ix = 0;
			}
			$saldo = $row->saldo;	
			$debet = $row->totdebet;
			$kredit = $row->totkredit;	
			
			$pdf->SetFillColor(200,200,200);
			$pdf->Cell($w[0],$rowHeight,$ix,1,0,'L',true);
			//addRow
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[1],$rowHeight,$row->no_bukti,1,0,'L',$fill);														
			$pdf->Cell($w[2],$rowHeight,$row->no_dokumen,1,0,'L',$fill);														
			$pdf->Cell($w[3],$rowHeight,$row->tanggal,1,0,'L',$fill);														
			$pdf->Cell($w[4],$rowHeight,$row->keterangan,1,0,'L',$fill);														
			$pdf->Cell($w[5],$rowHeight,$row->kode_pp,1,0,'C',$fill);																	
			$pdf->Cell($w[6],$rowHeight,$row->kode_drk,1,0,'C',$fill);														
			$pdf->Cell($w[7],$rowHeight,number_format($row->debet,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[8],$rowHeight,number_format($row->kredit,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[9],$rowHeight,number_format($saldo,0,',','.'),1,0,'R',$fill);
			
			$ix++;
			$pdf->Ln();
			
			$fill=!$fill;					
		}	
		$pdf->SetFillColor(200,200,200);
		$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$rowHeight,"Mutasi",1,0,'L',true);		
		$pdf->Cell($w[7],$rowHeight,number_format($debet,0,',','.'),1,0,'R',true);
		$pdf->Cell($w[8],$rowHeight,number_format($kredit,0,',','.'),1,0,'R',true);
		$pdf->Cell($w[9],$rowHeight,"",1,1,'R',true);
		$pdf->SetFillColor(200,200,0);
		$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6]+$w[7]+$w[8],$rowHeight,"Saldo Akhir",1,0,'L',true);				
		$pdf->Cell($w[9],$rowHeight,number_format($saldo,0,',','.'),1,0,'R',true);
		$ret = $pdf->Output($namafile,'I',true);
		return $ret;		
	}
	function createXls()
	{
		global $manager;
		$html = $this->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select * from glma_tmp ".$this->filter." order by kode_akun ";		global $dbLib;
		$rs = $dbLib->execute($sql);
		print rs2csv($rs);
	}
	function createTxt()
	{
	}
//--------------------------
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	function setRows($data)
	{
		$this->rows = $data;
	}
	function setPage($page)
	{
		$this->page = $page;
	}	
	function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}
	
}
?>
