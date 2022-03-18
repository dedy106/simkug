<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptTB12
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
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(kode_akun) as jum from glma12_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n01<>0 or n02<>0 or n03<>0 or n04<>0 or n05<>0 or n06<>0 or n07<>0 or n08<>0 or n09<>0 or n10<>0 or n11<>0 or n12<>0) ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user'";
		}
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select kode_akun,nama,n01,n02,n03,n04,n05,n06,n07,n08,n09,n10,n11,n12 from glma12_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n01<>0 or n02<>0 or n03<>0 or n04<>0 or n05<>0 or n06<>0 or n07<>0 or n08<>0 or n09<>0 or n10<>0 or n11<>0 or n12<>0) order by kode_akun";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan neraca percobaan 12 Periode",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<center><table width='1327' border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
    <tr bgcolor='#CCCCCC'>
      <td width='20'  class='header_laporan'><div align='center'>No</div></td>
      <td width='40'  class='header_laporan'><div align='center'>Akun</div></td>
      <td width='250' height='25'  class='header_laporan'><div align='center'>Nama</div></td>
      <td width='90' class='header_laporan'>
        <div align='center'>Januari</div>      </td>
      <td width='90' class='header_laporan'>
        <div align='center'>Februari</div>      </td>
      <td width='90' class='header_laporan'>
        <div align='center'>Maret</div>      </td>
      <td width='90' class='header_laporan'>
        <div align='center'>April</div>      </td>
      <td width='90' class='header_laporan'><div align='center'>Mei</div></td>
      <td width='90' class='header_laporan'><div align='center'>Juni</div></td>
      <td width='90' class='header_laporan'><div align='center'>Juli</div></td>
      <td width='90' class='header_laporan'><div align='center'>Agustus</div></td>
      <td width='90' class='header_laporan'><div align='center'>September</div></td>
      <td width='90' class='header_laporan'><div align='center'>Oktober</div></td>
      <td width='90' class='header_laporan'><div align='center'>November</div></td>
      <td width='90' class='header_laporan'><div align='center'>Desember</div></td>
<td width='110' class='header_laporan'><div align='center'>Total</div></td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n01+$row->n02+$row->n03+$row->n04+$row->n05+$row->n06+$row->n07+$row->n08+$row->n09+$row->n10+$row->n11+$row->n12;	

			$html.="<tr>
      <td class='isi_laporan'><div align='center'>$i</div></td>
      <td class='isi_laporan'>$row->kode_akun</td>
      <td height='20' class='isi_laporan'>$row->nama</td>
      <td class='isi_laporan'><div align='right'>".number_format($row->n01,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n02,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n03,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n04,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n05,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n06,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n07,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n08,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n09,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n10,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n11,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($row->n12,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right'>".number_format($total,0,',','.')."</div></td>
</tr>";
			
			$i=$i+1;
		}
		
		$html.="</table></center>";
		
		return $html;
	}
	function preview()
	{
		return $this->getHtml();
	}
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(a.kode_lokasi),sum(a.n01) as n1,sum(a.n02) as n2,sum(a.n03) as n3,sum(a.n04) as n4,
				sum(a.n05) as n5,sum(a.n06) as n6,sum(a.n07) as n7,sum(a.n07) as n7,sum(a.n08) as n8,sum(a.n09) as n9
				,sum(a.n10) as n10,sum(a.n11) as n11,sum(a.n12) as n12
			from (select kode_lokasi, kode_akun,nama,n01,n02,n03,n04,n05,n06,n07,n08,n09,n10,n11,n12 from glma12_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user'  and (n01<>0 or n02<>0 or n03<>0 or n04<>0 or n05<>0 or n06<>0 or n07<>0 or n08<>0 or n09<>0 or n10<>0 or n11<>0 or n12<>0))a group by a.kode_lokasi";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user') a group by a.kode_lokasi";
		}
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			$n1=$rs->fields[1];
			$n2=$rs->fields[2];
			$n3=$rs->fields[3];
			$n4=$rs->fields[4];
			$n5=$rs->fields[5];
			$n6=$rs->fields[6];
			$n7=$rs->fields[7];
			$n8=$rs->fields[8];
			$n9=$rs->fields[9];
			$n10=$rs->fields[10];
			$n11=$rs->fields[11];
			$n12=$rs->fields[12];
		}
		$result=array($totPage,$n1,$n2,$n3,$n4,$n5,$n6,$n7,$n8,$n9,$n10,$n11,$n12);		
		return $result;
	}
	function doPrintHeader($sender, $page){
		$w = $sender->w - $sender->rMargin;
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
			$h= $sender->headerHeight;      
			$sender->SetX(5);
			//$header = array("No","Kode","Nama","Lokasi","Saldo Awal","Debet","Kredit","Saldo Akhir");
			$sender->Cell(10,5,"No",1,0,'C',true);			
			$sender->Cell(15,5,"Kode",1,0,'C',true);			
			$sender->Cell($w - 290,5,"Nama",1,0,'C',true);			
			$sender->Cell(20,5,"Januari",1,0,'C',true);			
			$sender->Cell(20,5,"Februari",1,0,'C',true);			
			$sender->Cell(20,5,"Maret",1,0,'C',true);						
			$sender->Cell(20,5,"April",1,0,'C',true);						
			$sender->Cell(20,5,"Mei",1,0,'C',true);			
			$sender->Cell(20,5,"Juni",1,0,'C',true);									
			$sender->Cell(20,5,"Juli",1,0,'C',true);			
			$sender->Cell(20,5,"Agustus",1,0,'C',true);			
			$sender->Cell(20,5,"September",1,0,'C',true);			
			$sender->Cell(20,5,"Oktober",1,0,'C',true);			
			$sender->Cell(20,5,"November",1,0,'C',true);			
			$sender->Cell(20,5,"Desember",1,0,'C',true);			
			$sender->Cell(20,5,"Total",1,1,'C',true);			
		}else {
			$sender->SetFillColor(128,128,128);				
			$sender->SetLineWidth(.3);
			$sender->SetFont('','B', $sender->headerSize);
			//Header
			$sender->SetX(5);
			$sender->Cell(10,5,"No",1,0,'C',true);			
			$sender->Cell(15,5,"Kode",1,0,'C',true);			
			$sender->Cell($w - 290,5,"Nama",1,0,'C',true);			
			$sender->Cell(20,5,"Januari",1,0,'C',true);			
			$sender->Cell(20,5,"Februari",1,0,'C',true);			
			$sender->Cell(20,5,"Maret",1,0,'C',true);						
			$sender->Cell(20,5,"April",1,0,'C',true);						
			$sender->Cell(20,5,"Mei",1,0,'C',true);			
			$sender->Cell(20,5,"Juni",1,0,'C',true);									
			$sender->Cell(20,5,"Juli",1,0,'C',true);			
			$sender->Cell(20,5,"Agustus",1,0,'C',true);			
			$sender->Cell(20,5,"September",1,0,'C',true);			
			$sender->Cell(20,5,"Oktober",1,0,'C',true);			
			$sender->Cell(20,5,"November",1,0,'C',true);			
			$sender->Cell(20,5,"Desember",1,0,'C',true);				
			$sender->Cell(20,5,"Total",1,1,'C',true);				
		}
		//$sender->Ln();    
	}
	function createPdf()
	{		
		global $dbLib;
		$AddOnLib=new server_util_AddOnLib();
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select kode_akun,nama,n01,n02,n03,n04,n05,n06,n07,n08,n09,n10,n11,n12 from glma12_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (n01<>0 or n02<>0 or n03<>0 or n04<>0 or n05<>0 or n06<>0 or n07<>0 or n08<>0 or n09<>0 or n10<>0 or n11<>0 or n12<>0) order by kode_akun";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}
		//error_log($sql);		
		uses("server_util_PdfLib");			
		$title = array($this->lokasi,"Laporan Neraca Lajur",$AddOnLib->ubah_periode($periode));
		$titleHeight= array(5,8,5);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,14,8);//fontSize judul
		$header = array("No","Kode","Nama","Lokasi","Saldo Awal Debet","Debet","Kredit","Saldo Akhir");
		
		$headerWidth = array(10,20,90,15,20,20,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "L", "A3", 6, $header,8, 8, $headerWidth, 10);		
		$pdf->AliasNbPages();
		$pdf->onPrintHeader->set($this, "doPrintHeader");
		$pdf->AddPage();
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$namafile = "nrc-12.pdf";		
		$w = $pdf->headerWidth;
		$fill = false;
		$pdf->SetFillColor(224,235,255);
		$pdf->SetTextColor(0);
		$pdf->SetFont('','', 6);
		$ix = $start+1;						
		$so_awal=0;
		$so_awal_debet=0;
		$so_awal_kredit=0;
		$debet=0;
		$kredit=0;
		$so_akhir_debet=0;
		$so_akhir_kredit=0;
		$rowHeight = 6;
		$w = array(10,15,$pdf->w - $pdf->rMargin - 290, 20, 20, 20, 20, 20, 20,20, 20, 20, 20, 20, 20,20);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n01+$row->n02+$row->n03+$row->n04+$row->n05+$row->n06+$row->n07+$row->n08+$row->n09+$row->n10+$row->n11+$row->n12;				
			$pdf->row = $row;
			$pdf->SetFillColor(200,200,200);
			$pdf->SetX(5);
			$pdf->Cell($w[0],$rowHeight,$ix,1,0,'L',true);
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[1],$rowHeight,$row->kode_akun,1,0,'L',$fill);
			$pdf->Cell($w[2],$rowHeight,$row->nama,1,0,'L',$fill);
			$pdf->Cell($w[3],$rowHeight,number_format($row->n01,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[4],$rowHeight,number_format($row->n02,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[5],$rowHeight,number_format($row->n03,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[6],$rowHeight,number_format($row->n04,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[7],$rowHeight,number_format($row->n05,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[8],$rowHeight,number_format($row->n06,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[9],$rowHeight,number_format($row->n07,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[10],$rowHeight,number_format($row->n08,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[11],$rowHeight,number_format($row->n09,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[12],$rowHeight,number_format($row->n10,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[13],$rowHeight,number_format($row->n11,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[14],$rowHeight,number_format($row->n12,0,',','.'),1,0,'R',$fill);
			$pdf->Cell($w[15],$rowHeight,number_format($total,0,',','.'),1,0,'R',$fill);
			$ix++;
								
			$pdf->Ln();
			$fill=!$fill;
		}				
		$tmp=$this->getSumPage();
		//$tmp=explode("/",$result);
		$max=$tmp[0];
		$n1=$tmp[1];
		$n2=$tmp[2];
		$n3=$tmp[3];
		$n4=$tmp[4];
		$n5=$tmp[5];
		$n6=$tmp[6];
		$n7=$tmp[7];
		$n8=$tmp[8];
		$n9=$tmp[9];
		$n10=$tmp[10];
		$n11=$tmp[11];
		$n12=$tmp[12];
		if ($this->page==$max)
		{	
			$pdf->SetX(5);					
			$pdf->SetFillColor(200,200,0);
			$total = $n1+$n2+$n3+$n4+$n5+$n6+$n7+$n7+$n8+$n9+$n10+$n11+$n12;
			$pdf->Cell($w[0]+$w[1]+$w[2],$rowHeight,"Total",1,0,'L',true);																	
			$pdf->Cell($w[3],$rowHeight,number_format($n1,0,',','.'),1,0,'R',true);														
			$pdf->Cell($w[4],$rowHeight,number_format($n2,0,',','.'),1,0,'R',true);																	
			$pdf->Cell($w[5],$rowHeight,number_format($n3,0,',','.'),1,0,'R',true);														
			$pdf->Cell($w[6],$rowHeight,number_format($n4,0,',','.'),1,0,'R',true);																	
			$pdf->Cell($w[7],$rowHeight,number_format($n5,0,',','.'),1,0,'R',true);														
			$pdf->Cell($w[8],$rowHeight,number_format($n6,0,',','.'),1,0,'R',true);						
			$pdf->Cell($w[9],$rowHeight,number_format($n7,0,',','.'),1,0,'R',true);														
			$pdf->Cell($w[10],$rowHeight,number_format($n8,0,',','.'),1,0,'R',true);																	
			$pdf->Cell($w[11],$rowHeight,number_format($n9,0,',','.'),1,0,'R',true);														
			$pdf->Cell($w[12],$rowHeight,number_format($n10,0,',','.'),1,0,'R',true);																	
			$pdf->Cell($w[13],$rowHeight,number_format($n11,0,',','.'),1,0,'R',true);
			$pdf->Cell($w[14],$rowHeight,number_format($n12,0,',','.'),1,0,'R',true);
			$pdf->Cell($w[15],$rowHeight,number_format($total,0,',','.'),1,1,'R',true);
		}
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
