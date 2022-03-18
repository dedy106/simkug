<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_gl_rptBuktiJurnal
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
		$tabel ="(select * from(select no_bukti,tanggal, keterangan,kode_pp, kode_lokasi,periode  from gldt_h ".$this->filter." 
				union
				select no_bukti,tanggal, keterangan,kode_pp, kode_lokasi,periode from gldt ".$this->filter." 
				union
				select no_ju,tanggal, keterangan,kode_pp, kode_lokasi,periode from ju_j a  inner join ju_m b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi where b.posted='F' ) a ".$this->filter.")";
		$sql="select count(distinct a.no_bukti)
			from $tabel a
			inner join lokasi b on a.kode_lokasi=b.kode_lokasi";
		//error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		$tabel ="(select * from(select * from gldt_h ".$this->filter." 
				union 
				select * from gldt ".$this->filter." 
				union
				select a.no_ju, a.no_urut, a.kode_lokasi, a.no_dokumen, a.tanggal, a.kode_akun, a.dc, a.nilai, a.keterangan, 
						a.kode_pp, a.kode_drk, a.kode_cust, a.kode_proyek, a.kode_task, a.kode_vendor, a.kode_lokarea, a.nik, a.modul, a.jenis, a.periode,a.kode_curr, a.kurs, a.nilai, a.tgl_input, 
						a.nik_user from ju_j a  inner join ju_m b on a.no_ju=b.no_ju and a.kode_lokasi=b.kode_lokasi where b.posted='F') a ".$this->filter .")";
		$sql0="select distinct a.no_bukti 
				from $tabel a
				inner join lokasi b on a.kode_lokasi=b.kode_lokasi";
		//error_log($sql0);
		global $dbLib;
		
			$sql="select distinct a.no_bukti,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_lokasi
					from $tabel a
					inner join lokasi b on a.kode_lokasi=b.kode_lokasi ";
			//error_log($sql);
			$start = (($this->page-1) * $this->rows);
			$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
			
			$i = $start+1;
			$jum=$rs->recordcount();
			$AddOnLib=new server_util_AddOnLib();
			$html="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
					  <tr>
					    <td colspan='8' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
					      <tr>
					        <td width='100' class='header_laporan'>No Bukti </td>
					        <td width='496' class='header_laporan'>:&nbsp;$row->no_bukti</td>
					        </tr>
					      
					      <tr>
					        <td class='header_laporan'>Periode</td>
					        <td class='header_laporan'>:&nbsp;$row->periode</td>
					        </tr>
					      <tr>
					        <td class='header_laporan'>Tanggal</td>
					        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
					        </tr>
					      <tr>
					        <td class='header_laporan'>Kode Lokasi </td>
					        <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
					      </tr>

					    </table></td>
					  </tr>
					  <tr>
					    <td width='20' class='header_laporan'><div align='center'>No</div></td>
					    <td width='60' class='header_laporan'><div align='center'>Akun</div></td>
					    <td width='200' class='header_laporan'><div align='center'>Nama Akun </div></td>
					    <td width='250' class='header_laporan'><div align='center'>Keterangan </div></td>
					    <td width='60' class='header_laporan'><div align='center'>Kode Dept </div></td>
					    <td width='60' class='header_laporan'><div align='center'>Kode RKM </div></td>
					    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
					    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
					  </tr>";
			$sql1="select a.kode_akun,b.nama,a.keterangan,a.kode_pp,a.kode_drk,case dc when 'D' then nilai else 0 end as debet,case dc when 'C' then nilai else 0 end as kredit  
				from $tabel a
				inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.no_bukti='$row->no_bukti'
				order by a.dc desc "; 
			//error_log($sql1);
			$rs1 = $dbLib->execute($sql1);
			$i=1;
			$tot_debet=0;
			$tot_kredit=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$debet=number_format($row1->debet,0,",",".");
				$kredit=number_format($row1->kredit,0,",",".");
				$tot_debet=$tot_debet+$row1->debet;
				$tot_kredit=$tot_kredit+$row1->kredit;
				$html.="<tr>
						<td class='isi_laporan' align='center'>$i</td>
						<td class='isi_laporan'>$row1->kode_akun</td>
						<td class='isi_laporan'>$row1->nama</td>
						<td class='isi_laporan'>$row1->keterangan</td>
						<td class='isi_laporan'>$row1->kode_pp</td>
						<td class='isi_laporan'>$row1->kode_drk</td>
						<td class='isi_laporan' align='right'>$debet</td>
						<td class='isi_laporan' align='right'>$kredit</td>
					  </tr>";
				$i=$i+1;
			}
			$tot_debet1=number_format($tot_debet,0,",",".");
			$tot_kredit1=number_format($tot_debet,0,",",".");
			$html.="<tr>
						<td colspan='5'>&nbsp;</td>
						<td class='header_laporan' align='center'>Total</td>
						<td class='isi_laporan' align='right'>$tot_debet1</td>
						<td class='isi_laporan' align='right'>$tot_kredit1</td>
					  </tr>
					  <tr>
						<td colspan='8' align='right'><table width='714' border='0' cellspacing='0' cellpadding='0'>
						  <tr>
							<td width='334'>&nbsp;</td>
							<td width='185'>&nbsp;</td>
							<td width='195'>&nbsp;</td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td class='header_laporan'>Bandung, $row->tanggal</td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td class='header_laporan'>Diperiksa Oleh : </td>
							<td class='header_laporan'>Dibuat Oleh : </td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td height='40'>&nbsp;</td>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td class='header_laporan'>-</td>
							<td class='header_laporan'>-</td>
						  </tr>
						</table></td>
					  </tr>
					</table><br>";
			$i=$i+1;
		}
		
		$html = str_replace(chr(9),"",$html);
			return $html;
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
