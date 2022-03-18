<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku2_gl_rptNeraca extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$nama_form=$tmp[4];
		$lokasi=$tmp[5];
		$ttd=$tmp[6];
	    $sql = "select '$lokasi' as kode_lokasi,kode_neraca1,kode_neraca2,nama1,tipe1,nilai1,level_spasi1,nama2,tipe2,nilai2,level_spasi2 from neraca_skontro where nik_user='$nik_user' order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"Untuk Periode Yang Berakhir Pada Tanggal $totime");
		
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
			  <tr bgcolor='#CCCCCC'>
				<td width='340'  class='header_laporan' align='center'>Deskripsi</td>
				<td width='100' class='header_laporan' align='center'>Jumlah</td>
			<td width='340' height='25'  class='header_laporan' align='center'>Deskripsi</td>
			<td width='100' class='header_laporan' align='center'>Jumlah</td>
			  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai1="";
			$nilai2="";
			if ($row->tipe1!="Header" && $row->nama1!="." && $row->nama1!="")
			{
				$nilai1=number_format($row->nilai1,0,",",".");
			}
			if ($row->tipe2!="Header" && $row->nama2!="." && $row->nama2!="")
			{ 
				$nilai2=number_format($row->nilai2,0,",",".");
			}
			echo "<tr><td valign='middle' class='isi_laporan' >";
			echo fnSpasi($row->level_spasi1);
			if ($row->tipe1=="Posting" && $row->nilai1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$row->kode_lokasi');\">$row->nama1</a>";
			}
			else
			{
				echo "$row->nama1";
			}
			echo "</td>
				<td valign='middle' class='isi_laporan' align='right'>$nilai1</td>";
			echo "<td height='20' valign='middle' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi2);
			if ($row->tipe2=="Posting" && $row->nilai2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$row->kode_lokasi');\">$row->nama2</a>";
			}
			else
			{
				echo "$row->nama2";
			}
			echo "</td><td valign='middle' class='isi_laporan' align='right'>$nilai2</td>
  </tr>";
			$i=$i+1;
		}
		
		echo "</table></td>
  </tr>
  <tr>
    <td align='right'>";
		if ($ttd=="Ya")
		{
			$sql="select a.kota,b.nik as nik1,upper(b.nama) as nama1,upper(b.jabatan) as jabatan1,getdate() as tanggal,
       c.nik as nik2,upper(c.nama) as nama2,upper(c.jabatan) as jabatan2 
from lokasi a
left join (select b.nik,b.nama,b.jabatan,a.kode_lokasi
           from spro a  
           inner join karyawan b on a.flag=b.nik
           where a.kode_spro='TTD1' and a.kode_lokasi='$lokasi'
           )b on a.kode_lokasi=b.kode_lokasi
left join (select b.nik,b.nama,b.jabatan,a.kode_lokasi
           from spro a  
           inner join karyawan b on a.flag=b.nik
           where a.kode_spro='TTD2' and a.kode_lokasi='$lokasi'
           )c on a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$lokasi'";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			echo "<table border='0' cellspacing='2' cellpadding='1'>
     
		<tr>
        <td width='200' class='header_laporan' align='center'>&nbsp;</td>
        <td width='200' class='header_laporan' align='center'>".$row->kota. ", &nbsp;&nbsp;&nbsp;".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
      </tr>
		<tr>
        <td width='200' class='header_laporan' align='center'>Mengetahui / Menyetujui</td>
        <td width='200' class='header_laporan' align='center'>&nbsp;</td>
      </tr>
      <tr>
        <td width='200' class='header_laporan' align='center'>$row->jabatan1 </td>
        <td width='200' class='header_laporan' align='center'>$row->jabatan2</td>
      </tr>
      <tr>
        <td height='40'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan' align='center'>$row->nama1</td>
        <td class='header_laporan' align='center'>$row->nama2</td>
      </tr>
      <tr>
        <td class='header_laporan' align='center'>$row->nik1</td>
        <td class='header_laporan' align='center'>$row->nik2</td>
      </tr>
    </table>";
		}
		echo "</td>
  </tr>
</table>";
		
		echo "</div>";
		
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
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$nama_form=$tmp[4];
		$lokasi = $tmp[5];
		uses("server_util_PdfLib");			
		$AddOnLib=new server_util_AddOnLib();						
		$sql = "select nama1,tipe1,nilai1,level_spasi1,nama2,tipe2,nilai2,level_spasi2 from neraca_skontro where nik_user='$nik_user' order by rowindex ";		
		$rs=$dbLib->execute($sql);	
		$namafile = "neraca.pdf";		
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		
		$title = array($this->lokasi,strtoupper($nama_form),"Untuk Periode Yang Berakhir Pada Tanggal $totime");//strtoupper($AddOnLib->ubah_periode($periode)
		$titleHeight= array(5,5,5);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,8,8);//fontSize judul
		//No, No Bukti, Tanggal Kode, Nama AKun, Kode Dept, KOde RKM, Keterangan, Debet, Kredit
		$header = array("Deskripsi","Jumlah","Deskripsi","Jumlah");
		$headerWidth = array(110,25,110,25);//dalam mm
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
		$pdf->SetFont('Arial','', 6);
		$nb = "";		
		while ($row = $rs->FetchNextObject($toupper=false)){			
			//$lokasi = $row->kode_lokasi;						
			$nilai1="";
			$nilai2="";
			if ($row->tipe1!="Header" && $row->nama1!="." && $row->nama1!="")
			{
				$nilai1=number_format($row->nilai1,0,",",".");
			}
			if ($row->tipe2!="Header" && $row->nama2!="." && $row->nama2!="")
			{ 
				$nilai2=number_format($row->nilai2,0,",",".");
			}
			$nama1 = str_replace("&nbsp;",chr(160), $AddOnLib->spasi($row->nama1,$row->level_spasi1));
			$nama2 = str_replace("&nbsp;",chr(160), $AddOnLib->spasi($row->nama2,$row->level_spasi2));
			
			$y1 = $pdf->GetY();											
			$numrowNm = $pdf->WordWrap($nama1,$w[0] - 2);
			$numrowKet = $pdf->WordWrap(trim($nama2), $w[2] - 2);			
			
			$numrow = max($numrowNm,$numrowKet);
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;
			
			$pdf->row = $row;																					
			//addRow
			$pdf->SetX(20);				
			$x = $pdf->GetX();			
			$pdf->Cell($w[0],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
			$pdf->SetXY($pdf->GetX() - $w[0],$y1);
			$pdf->MultiCell($w[0],$defHeight,$nama1,0);							
			$y2 = $pdf->GetY();			
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0],  $pdf->GetY() - $y);											
			$pdf->Cell($w[1],$rowHeight,$nilai1,1,0,'R',$fill);																				
			$x = $pdf->GetX();
			$y = $pdf->GetY();
			$pdf->Cell($w[2],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
			$pdf->SetXY($pdf->GetX() - $w[2],$y);
			$pdf->MultiCell($w[2],$defHeight,trim($nama2),'LTR');			
			$y2 = $pdf->GetY();
			//if ($y3 > $y2) $y2 = $y3;
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0] + $w[1] + $w[2],  $pdf->GetY() - $y);
			$pdf->Cell($w[3],$rowHeight,$nilai2,1,0,'R',$fill);																				
			$ix++;
			$pdf->Ln();					
			$fill= false;					
		}
		
		
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
				if ($row->nama1 != "") $nm1 = $row->nama1;
				if ($row->nama2 != "") $nm2 = $row->nama2;
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
		$pdf->Cell($pdf->w / 3, 5,strtoupper($nm1),0,0,'C',false);			
		$pdf->Cell($pdf->w / 3, 5,strtoupper($nm2),0,1,'C',false);						
		$pdf->Cell($pdf->w / 3, 5,'',0,0,'C',false);			
		$pdf->Cell($pdf->w / 3, 5,strtoupper($nik1),0,0,'C',false);			
		$pdf->Cell($pdf->w / 3, 5,strtoupper($nik2),0,1,'C',false);			
		
		$ret = $pdf->Output($namafile,'I',true);		
		return $ret;		
	}
}
?>