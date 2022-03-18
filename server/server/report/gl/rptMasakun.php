<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptMasakun
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select count(a.kode_akun) from masakun a ".$this->filter;
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
		$sql = "select a.kode_akun,a.kode_lokasi,a.nama,a.modul,a.jenis,a.kode_curr,a.block from masakun a ".$this->filter." order by a.kode_akun ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		//error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan master akun",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<center><table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
				  <tr bgcolor='#CCCCCC'>    
				    <td width='60' class='header_laporan'><div align='center'>Kode</div></td>
					<td width='60' class='header_laporan'><div align='center'>Lokasi</div></td>
				    <td width='250' class='header_laporan'><div align='center'>Nama</div></td>
				    <td width='50' class='header_laporan'><div align='center'>Modul</div></td>
				    <td width='70' class='header_laporan'><div align='center'>Jenis</div></td>
				    <td width='50' class='header_laporan'><div align='center'>Curr</div></td>
				    <td width='50' class='header_laporan'><div align='center'>Block</div></td>				   
				  </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
						<td class='isi_laporan'>".$row->kode_akun."</td>
						<td class='isi_laporan'>".$row->kode_lokasi."</td>
						<td class='isi_laporan'>".$row->nama."</td>
						<td class='isi_laporan'><div align='center'>".$row->modul."</div></td>
						<td class='isi_laporan'>".$row->jenis."</td>
						<td class='isi_laporan'>".$row->kode_curr."</td>
						<td class='isi_laporan'><div align='center'>".$row->block."</div></td>
					</tr>";
			$i=$i+1;
		}
		$html.="</table></center>";
		$html = str_replace(chr(9),"",$html);
		return $html;
	}
	function preview()
	{
		return $this->getHtml();
	}
	function doPrintHeader($sender, $page){
		if ($page == 1){
			//$sender->SetY(10);
			foreach ($sender->title as $i => $value){
				$sender->SetFont('Times','B',$sender->titleSize[$i]);
				$sender->Cell(0,$sender->titleHeight[$i],$value,0,1,'C');			
			}
			$sender->Ln();
			$sender->SetFillColor(128,128,128);				
			$sender->SetLineWidth(.3);
			$sender->SetFont('','B', $sender->headerSize);
			//Header
			$w= $sender->headerWidth;        	
			$h= $sender->headerHeight;      
			foreach($sender->header as $i => $value){
				$sender->Cell($w[$i],$h,$value,1,0,'C',true);
			}			
		}else {
			$sender->SetFillColor(128,128,128);				
			$sender->SetLineWidth(.3);
			$sender->SetFont('','B', $sender->headerSize);
			//Header
			$w= $sender->headerWidth;        	
			$h= $sender->headerHeight;      
			foreach($sender->header as $i => $value){
				$sender->Cell($w[$i],$h,$value,1,0,'C',true);
			}			
		}
		$sender->Ln();    
	}
	function createPdf()
	{		
		//$html = $this->getHtml();		
		//$pdf = new server_pdf_Pdf();
		//$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		global $dbLib;
		uses("server_util_PdfLib");			
		$title = array($this->lokasi,"Laporan Master Akun");
		$titleHeight= array(5,8);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,14);//fontSize judul
		$header = array("No","Kode","Lokasi","Nama","Modul","Jenis","Curr","Block");
		$headerWidth = array(10,20,15,90,15,15,10,10);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "P", "A4", 8, $header,10, 10, $headerWidth, 10);		
		$pdf->AliasNbPages();
		$pdf->onPrintHeader->set($this, "doPrintHeader");
		$pdf->AddPage();				
		$sql = "select a.kode_akun,a.kode_lokasi,a.nama,a.modul,a.jenis,a.kode_curr,a.block from masakun a ".$this->filter." order by a.kode_akun ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "master-akun.pdf";		
		$w = $headerWidth;
		$rowHeight = 5;
		$fill = false;
		$pdf->SetFillColor(200,200,200);
		$pdf->SetTextColor(0);
		$pdf->SetFont('','', 8);
		$ix = 1;
		while ($row = $rs->FetchNextObject($toupper=false)){
			$pdf->row = $row;
			$pdf->SetFillColor(200,200,200);
			$pdf->Cell($w[0],$rowHeight,$ix,1,0,'L',true);
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[1],$rowHeight,$row->kode_akun,1,0,'L',$fill);														
			$pdf->Cell($w[2],$rowHeight,$row->kode_lokasi,1,0,'L',$fill);														
			$pdf->Cell($w[3],$rowHeight,$row->nama,1,0,'L',$fill);														
			$pdf->Cell($w[4],$rowHeight,$row->modul,1,0,'L',$fill);														
			$pdf->Cell($w[5],$rowHeight,$row->jenis,1,0,'C',$fill);																	
			$pdf->Cell($w[6],$rowHeight,$row->kode_curr,1,0,'C',$fill);														
			$pdf->Cell($w[7],$rowHeight,$row->block,1,0,'C',$fill);																	
			$ix++;
			$pdf->Ln();
			$fill=!$fill;					
		}	
		
		$ret = $pdf->Output($namafile,'I',false);
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
		$sql = "select a.kode_akun,a.nama,a.modul,a.jenis,a.kode_curr,a.block,a.akun_konsol,a.kode_flag
from masakun a ".$this->filter." order by a.kode_akun ";
		global $dbLib;
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
