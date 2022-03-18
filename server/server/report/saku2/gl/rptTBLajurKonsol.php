<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptTBLajurKonsol extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(kode_akun) as jum from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' ";
		}
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}		
		return $totPage;
	}
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(a.kode_lokasi),sum(a.so_awal_debet) as so_awal_debet,sum(a.so_awal_kredit) as so_awal_kredit,sum(a.debet) as debet,sum(a.kredit) as kredit,
       sum(a.so_akhir_debet) as so_akhir_debet,sum(a.so_akhir_kredit) as so_akhir_kredit
from (
select kode_lokasi,debet,kredit,case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then -so_awal else 0 end as so_awal_kredit,
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
from glma_tmp ";
		
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0))a group by a.kode_lokasi";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user')a group by a.kode_lokasi";
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
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5."/".$n6;		
		return $result;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select distinct kode_akun,nama,kode_lokasi,debet,kredit,so_awal,so_akhir, 
       case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}		
	
		$start = (($this->page-1) * $this->rows);
		if ($start<0) 
		{
			$start=1;
		}
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("NERACA LAJUR",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  class='header_laporan' align='center'>No</td>
    <td width='50' rowspan='2' class='header_laporan' align='center'>Kode</td>
    <td width='200' rowspan='2' class='header_laporan' align='center'>Nama Akun</td>
    <td width='30' rowspan='2' class='header_laporan' align='center'>Lok</td>
    <td height='25' colspan='2' class='header_laporan' align='center'>Saldo Awal </td>
    <td colspan='2' class='header_laporan' align='center'>Mutasi</td>
    <td colspan='2' class='header_laporan' align='center'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='90' height='25' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
    <td width='90' class='header_laporan' align='center'>Debet</td>
    <td width='90' class='header_laporan' align='center'>Kredit</td>
  </tr>";
		$so_awal_debet=0;
		$so_awal_kredit=0;
		$debet=0;
		$kredit=0;
		$so_akhir_debet=0;
		$so_akhir_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal_debet=$so_awal_debet+$row->so_awal_debet;
			$so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
			$so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_akun</td>
    <td height='20' class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTbLokasi('$row->kode_akun','$row->kode_lokasi');\">$row->nama</a>";
	echo "</td>
    <td class='isi_laporan' align='center'>$row->kode_lokasi</td>
<td class='isi_laporan' align='right'>".number_format($row->so_awal_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_awal_kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->kredit,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_debet,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->so_akhir_kredit,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		$result=$this->getSumPage();
		$tmp=explode("/",$result);
		$max=$tmp[0];
		$n1=$tmp[1];
		$n2=$tmp[2];
		$n3=$tmp[3];
		$n4=$tmp[4];
		$n5=$tmp[5];
		$n6=$tmp[6];
		if ($this->page==$max)
		{
		echo "<tr>
    <td height='20' colspan='4' class='sum_laporan' align='right'>Total</td>
    <td class='sum_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format(abs($n2),0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='sum_laporan' align='right'>".number_format(abs($n6),0,',','.')."</td>
</tr>";
		}
		echo "</table></div>";
		return "";
	}
	function doPrintHeader($sender, $page){
		$w = $sender->w - $sender->rMargin;
		if ($page == 1){
			//$sender->SetY(10);
			foreach ($sender->title as $i => $value){
				$sender->SetFont('Arial','B',$sender->titleSize[$i]);
				$sender->Cell(0,$sender->titleHeight[$i],$value,0,1,'C');			
			}
			$sender->Ln();			
			//Header						    
			
		}
		$h= $sender->headerHeight; 
		$sender->SetFillColor(128,128,128);				
		$sender->SetLineWidth(.3);
		$sender->SetFont('Arial','B', $sender->headerSize);

		$sender->SetX(20);
		//$header = array("No","Kode","Nama","Lokasi","Saldo Awal","Debet","Kredit","Saldo Akhir");		
		$sender->Cell(20,10,"Kode Akun",'LTR',0,'C',false);			
		$sender->Cell($w - 155,10,"Nama Akun",'LTR',0,'C',false);				
		$y = $sender->GetY();
		$sender->Cell(40,5,"Saldo Awal",'LTR',1,'C',false);			
		$sender->SetXY(($w - 155)+40,$sender->GetY());
		$sender->Cell(20,5,"Debet",1,0,'C',false);			
		$sender->Cell(20,5,"Kredit",1,0,'C',false);	
		$sender->SetXY(($w - 155)+80,$y);		
		$sender->Cell(40,5,"Mutasi",1,0,'C',false);		
		$sender->SetXY(($w - 155)+80,$y + 5);				
		$sender->Cell(20,5,"Debet",1,0,'C',false);			
		$sender->Cell(20,5,"Kredit",1,0,'C',false);			
		$sender->SetXY(($w - 155)+120,$y);		
		$sender->Cell(40,5,"Saldo Akhir",'LTR',1,'C',false);
		$sender->SetXY(($w - 155)+120,$y + 5);																						
		$sender->Cell(20,5,"Debet",1,0,'C',false);			
		$sender->Cell(20,5,"Kredit",1,1,'C',false);			
		//$sender->Ln();    
	}
	function doPrintFooter($sender, $page){		
		$sender->SetY(-10);
		//Arial italic 8
		$sender->SetFont('Arial','I',8);
		//Page number
		$sender->Cell(0,10,'Halaman :'.$sender->PageNo().'/{nb}',0,0,'C');						
	}
	function createPdf()
	{		
		global $dbLib;
		$AddOnLib=new server_util_AddOnLib();
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select kode_akun,nama,'*' as lokasi,debet,kredit,so_awal,so_akhir, kode_lokasi,
			   case when so_awal>0 then so_awal else 0 end as so_awal_debet,
			   case when so_awal<0 then -so_awal else 0 end as so_awal_kredit, 
			   case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
			   case when so_akhir<0 then -so_akhir else 0 end as so_akhir_kredit
		from glma_tmp ";
		if ($mutasi=="Tidak")
		{
		  $sql.=$this->filter." and nik_user='$nik_user' and (so_awal<>0 or debet<>0 or kredit<>0 or so_akhir<>0) order by kode_akun ";
		}
		else
		{
		  $sql.=$this->filter." and nik_user='$nik_user' order by kode_akun ";
		}		
		//error_log($sql);		
		uses("server_util_PdfLib");			
		
		$title = array($this->lokasi,"NERACA LAJUR","PERIODE " . strtoupper($AddOnLib->ubah_periode($periode)));
		$titleHeight= array(5,5,5);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,8,8);//fontSize judul
		$header = array("No","Kode","Nama","Saldo Awal Debet","Debet","Kredit","Saldo Akhir");
		
		$headerWidth = array(20,90,20,20,20,20);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "P", "A4", 6, $header,8, 8, $headerWidth, 10);		
		$pdf->AliasNbPages();
		$pdf->onPrintHeader->set($this, "doPrintHeader");
		$pdf->onPrintFooter->set($this, "doPrintFooter");
		$pdf->AddPage();
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$namafile = "nrc-lajur.pdf";		
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
		$rowHeight = 5;
		$defHeight = 5;
		$w = array(20,$pdf->w - $pdf->rMargin - 155,  20, 20, 20, 20, 20,20);
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$lokasi = $row->kode_lokasi;
			$so_awal_debet=$so_awal_debet+$row->so_awal_debet;
			$so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
			$so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;			
			$y1 = $pdf->GetY();											
			$numrow = $pdf->WordWrap($row->nama,$w[1] - 2);			
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;
			
			$pdf->row = $row;
			$pdf->SetFillColor(200,200,200);
			$pdf->SetX(20);									
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[0],$rowHeight,$row->kode_akun,1,0,'L',$fill);														
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
			$pdf->MultiCell($w[1],$defHeight,$row->nama,1);														
			$y2 = $pdf->GetY();
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0] + $w[1],  $pdf->GetY() - $y);											
			
			//$pdf->Cell($w[3],$rowHeight,$row->kode_lokasi,1,0,'L',$fill);														
			$pdf->Cell($w[2],$rowHeight,number_format($row->so_awal_debet,0,',','.'),1,0,'R',$fill);														
			$pdf->Cell($w[3],$rowHeight,number_format($row->so_awal_kredit,0,',','.'),1,0,'R',$fill);														
			$pdf->Cell($w[4],$rowHeight,number_format($row->debet,0,',','.'),1,0,'R',$fill);																	
			$pdf->Cell($w[5],$rowHeight,number_format($row->kredit,0,',','.'),1,0,'R',$fill);														
			$pdf->Cell($w[6],$rowHeight,number_format($row->so_akhir_debet,0,',','.'),1,0,'R',$fill);																	
			$pdf->Cell($w[7],$rowHeight,number_format($row->so_akhir_kredit,0,',','.'),1,0,'R',$fill);																	
			$ix++;
								
			$pdf->Ln();
			$fill= false;
		}				
		$result=$this->getSumPage();
		$tmp=explode("/",$result);
		$max=$tmp[0];
		$n1=$tmp[1];
		$n2=$tmp[2];
		$n3=$tmp[3];
		$n4=$tmp[4];
		$n5=$tmp[5];
		$n6=$tmp[6];
		if ($this->page==$max)
		{												
			$pdf->SetX(20);
			$pdf->SetFillColor(224,235,255);
			$pdf->Cell($w[0]+$w[1],$rowHeight,"Jumlah Total",1,0,'R',false);																	
			$pdf->Cell($w[2],$rowHeight,number_format($n1,0,',','.'),1,0,'R',false);														
			$pdf->Cell($w[3],$rowHeight,number_format($n2,0,',','.'),1,0,'R',false);																	
			$pdf->Cell($w[4],$rowHeight,number_format($n3,0,',','.'),1,0,'R',false);														
			$pdf->Cell($w[5],$rowHeight,number_format($n4,0,',','.'),1,0,'R',false);																	
			$pdf->Cell($w[6],$rowHeight,number_format($n5,0,',','.'),1,0,'R',false);														
			$pdf->Cell($w[7],$rowHeight,number_format($n6,0,',','.'),1,1,'R',false);						
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
		$ret = $pdf->Output($namafile,'I',false);
		return $ret;		
	}
}
?>
