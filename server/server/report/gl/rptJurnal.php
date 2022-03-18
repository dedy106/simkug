<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptJurnal
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
		$sql = "select count(no_bukti) as jum from gldt_h ".$this->filter;
		$tabel ="(select * from gldt_h ".$this->filter." 
union all 
select * from gldt ".$this->filter." )";
		$sql="select count(a.no_bukti) from $tabel a ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$dbname=$tmp[0];
		if ($dbname=="mysqlt")
		{
			$tabel ="(select * from gldt_h ".$this->filter." 
union all 
select * from gldt ".$this->filter." )";//date_format(a.tanggal,GET_FORMAT(DATE,'EUR'));) as 
		$sql="select a.no_bukti,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
		      from $tabel a 
			  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
		      order by a.no_bukti,.a.tanggal,a.dc desc ";
		}
		else
		{
			$tabel ="(select * from gldt_h ".$this->filter." 
union all 
select * from gldt ".$this->filter." )";
		$sql="select a.no_bukti,b.nama,convert(varchar,a.tanggal,103) as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
		      from $tabel a 
			  inner join masakun b on a.kode_akun=b.kode_akun 
		      order by a.tanggal,a.dc desc ";
		}		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan jurnal transaksi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='2' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan'><div align='center'>No</div></td>
    <td width='80' class='header_laporan'><div align='center'>No Bukti</div></td>
    <td width='60' class='header_laporan'><div align='center'>Tanggal</div></td>
    <td width='60' height='25' class='header_laporan'><div align='center'>Kode </div></td>
    <td width='170' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode Dept</div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode RKM</div></td>
    <td width='200' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
    <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
  </tr>";
		$debet=0;
		$kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$html.="<tr>
    <td valign='middle' class='isi_laporan'><div align='center'>$i</div></td>
    <td valign='middle' class='isi_laporan'>$row->no_bukti</td>
    <td height='20' valign='middle' class='isi_laporan'>$row->tanggal</td>
    <td valign='middle' class='isi_laporan'>$row->kode_akun</td>
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->nama))."</td>
    <td valign='middle' class='isi_laporan'>$row->kode_pp</td>
    <td valign='middle' class='isi_laporan'>$row->kode_drk</td>
    <td valign='middle' class='isi_laporan'>".ucwords(strtolower($row->keterangan))."</td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->debet,0,',','.')."</div></td>
    <td valign='middle' class='isi_laporan'><div align='right' >".number_format($row->kredit,0,',','.')."</div></td>
  </tr>";
			
			$i=$i+1;
		}
		
		$html.="<tr>
    <td height='20' colspan='8' valign='middle' class='isi_laporan'><div align='right'><strong>Total</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($debet,0,',','.')."</strong></div></td>
    <td valign='middle' class='isi_laporan'><div align='right' class='style3'><strong>".number_format($kredit,0,',','.')."</strong></div></td>
  </tr>
</table>";
		
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
		$AddOnLib=new server_util_AddOnLib();
		$title = array($this->lokasi,"Laporan Jurnal Transaksi",$AddOnLib->ubah_periode($periode));
		$titleHeight= array(5,8);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,14);//fontSize judul
		//No, No Bukti, Tanggal Kode, Nama AKun, Kode Dept, KOde RKM, Keterangan, Debet, Kredit
		$header = array("No","No Bukti","Tanggal","Kode","Nama Akun","Kode Dept","Kode RKM","Keterangan","Debet","Kredit");
		$headerWidth = array(10,25,15,15,100,20,20,100,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "L", "A4", 8, $header,10, 10, $headerWidth, 10);		
		$pdf->AliasNbPages();				
		$pdf->onPrintHeader->set($this, "doPrintHeader");		
		if ($dbname == "mysqlt"){
			$tabel ="(select * from gldt_h ".$this->filter." 
				union all 
				select * from gldt ".$this->filter." )";//date_format(a.tanggal,GET_FORMAT(DATE,'EUR'));) as 
			$sql="select a.no_bukti,b.nama,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				  from $tabel a 
				  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
				  order by a.no_bukti,.a.tanggal,a.dc desc ";
		} else {
			$tabel ="(select * from gldt_h ".$this->filter." 
				union all 
				select * from gldt ".$this->filter." )";
			$sql="select a.no_bukti,b.nama,convert(varchar,a.tanggal,103) as tanggal,a.kode_akun,a.kode_pp,a.kode_drk,a.keterangan,case when a.dc='D' then nilai else 0 end as debet,case when a.dc='C' then nilai else 0 end as kredit 
				  from $tabel a 
				  inner join masakun b on a.kode_akun=b.kode_akun 
				  order by a.tanggal,a.dc desc ";
		}
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "Jurnal-Transaksi.pdf";				
		$rowHeight = 5;
		$fill = false;		
		$ix = 1;
		$tmp = "";
		$debet =  0;
		$kredit =  0;
		while ($row = $rs->FetchNextObject($toupper=false)){
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$pdf->row = $row;													
			$pdf->SetFillColor(200,200,200);
			$pdf->Cell($w[0],$rowHeight,$ix,1,0,'L',true);
			//addRow
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[1],$rowHeight,$row->no_bukti,1,0,'L',$fill);
			$pdf->Cell($w[2],$rowHeight,$row->tanggal,1,0,'L',$fill);														
			$pdf->Cell($w[3],$rowHeight,$row->kode_akun,1,0,'L',$fill);														
			$pdf->Cell($w[4],$rowHeight,$row->nama,1,0,'L',$fill);														
			$pdf->Cell($w[5],$rowHeight,$row->kode_pp,1,0,'C',$fill);																	
			$pdf->Cell($w[6],$rowHeight,$row->kode_drk,1,0,'C',$fill);														
			$pdf->Cell($w[7],$rowHeight,$row->keterangan,1,0,'C',$fill);														
			$pdf->Cell($w[8],$rowHeight,number_format($row->debet,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[9],$rowHeight,number_format($row->kredit,0,',','.'),1,1,'R',$fill);						
			$ix++;					
			$fill=!$fill;					
		}	
		$pdf->SetFillColor(200,200,0);
		$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6]+$w[7],$rowHeight,"Total",1,0,'L',true);		
		$pdf->Cell($w[8],$rowHeight,number_format($debet,0,',','.'),1,0,'R',true);
		$pdf->Cell($w[9],$rowHeight,number_format($kredit,0,',','.'),1,1,'R',true);				
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
