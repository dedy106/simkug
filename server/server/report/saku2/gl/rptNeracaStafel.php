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
class server_report_saku2_gl_rptNeracaStafel extends server_report_basic
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
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$level_lap=$tmp[2];
		$bentuk=$tmp[3];
		$nama_form=$tmp[4];
		$lokasi=$tmp[5];
		$ttd=$tmp[6];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,jenis_akun,level_spasi,n4,level_spasi from neraca_tmp where modul='A' and nik_user='$nik_user' and level_lap<=$level_lap order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				  <tr bgcolor='#CCCCCC'>
					<td width='500' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
					<td width='100' class='header_laporan'><div align='center'>Jumlah</div></td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n4,0,",",".");
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
					<td class='isi_laporan'><div align='right'>$nilai</div></td>
				  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,a.nama,a.so_akhir
					from glma_tmp a
					inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and nik_user='$nik_user' and so_akhir<>0
					order by a.kode_akun ";
				
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
						<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
						<td class='detail_laporan'><div align='right'>$so_akhir</div></td>
					  </tr>";
				}
			}
			$i=$i+1;
		}
		echo "<tr><td height='25' colspan='2' class='isi_laporan'>&nbsp;</td></tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,jenis_akun,n4,level_spasi from neraca_tmp where modul='P' and nik_user='$nik_user' order by rowindex ";

		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n4*-1,0,",",".");
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
					<td class='isi_laporan'><div align='right'>$nilai</div></td>
				  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
					select a.kode_akun,a.nama,a.so_akhir
					from glma_tmp a
					inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and nik_user='$nik_user' and so_akhir<>0
					order by a.kode_akun ";
			
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
						<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
						<td class='detail_laporan'><div align='right'>$so_akhir</div></td>
					  </tr>";
				}
			}
			if ($bentuk=="Detail" && $row->tipe=="Posting" && $row->jenis_akun=="Labarugi")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select ifnull(sum(a.so_awal),0) as so_awal, ifnull(sum(a.debet),0) as debet, ifnull(sum(a.Kredit),0) as Kredit, 
ifnull(sum(a.so_akhir),0) as so_akhir  
                 from glma_tmp a
                 inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                 inner join neraca c on b.kode_neraca=c.kode_neraca and b.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi
		         where c.modul='L' and a.periode='$periode' and b.kode_lokasi='$kode_lokasi' and nik_user='$nik_user' and so_akhir<>0 ";
				$rs1 = $dbLib->execute($sql1);
				$so_awal=0;$mutasi=0;$so_akhir=0;
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama="000 - Nilai Laporan Labarugi";
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
    <td class='detail_laporan'><div align='right'>$so_akhir</div></td>
  </tr>";
				}
			}
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
		$level_lap=$tmp[2];
		$bentuk=$tmp[3];
		$nama_form=$tmp[4];
		$lokasi=$tmp[5];	
		uses("server_util_PdfLib");			
		$AddOnLib=new server_util_AddOnLib();						
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,jenis_akun,level_spasi,n4,level_spasi from neraca_tmp where modul='A' and nik_user='$nik_user' and level_lap<=$level_lap order by rowindex ";
		
		$rs=$dbLib->execute($sql);	
		$namafile = "neraca-stafel.pdf";		
		$title = array($this->lokasi,strtoupper($nama_form),strtoupper($AddOnLib->ubah_periode($periode)));
		$titleHeight= array(5,5,5);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8,8,8);//fontSize judul
		//No, No Bukti, Tanggal Kode, Nama AKun, Kode Dept, KOde RKM, Keterangan, Debet, Kredit
		$header = array("Deskripsi","Jumlah");
		$headerWidth = array(150,30);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "P", "A4", 6, $header,8, 8, $headerWidth, 10);		
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
			$nilai="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n4,0,",",".");
			}			
			$nama = str_replace("&nbsp;",chr(160), $AddOnLib->spasi($row->nama,$row->level_spasi));			
			
			$y1 = $pdf->GetY();											
			$numrow = $pdf->WordWrap($nama,$w[0] - 2);									
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;			
			$pdf->row = $row;																					
			//addRow
			$pdf->SetX(20);				
			$x = $pdf->GetX();			
			$pdf->Cell($w[0],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
			$pdf->SetXY($pdf->GetX() - $w[0],$y1);
			$pdf->MultiCell($w[0],$defHeight,$nama,0);							
			$y2 = $pdf->GetY();			
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0],  $pdf->GetY() - $y);											
			$pdf->Cell($w[1],$rowHeight,$nilai,1,0,'R',$fill);																							
			$ix++;
			$pdf->Ln();					
			$fill= false;					
		}		
		$pdf->SetX(20);
		$y1 = $pdf->GetY();											
		$pdf->Cell(0,$defHeight,'',1,1,'R',$fill);
		if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
		$pdf->SetXY($pdf->GetX() - $w[0],$y1);																							
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,jenis_akun,n4,level_spasi from neraca_tmp where modul='P' and nik_user='$nik_user' order by rowindex ";
		$rs=$dbLib->execute($sql);	
		while ($row = $rs->FetchNextObject($toupper=false)){			
			//$lokasi = $row->kode_lokasi;						
			$nilai="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n4,0,",",".");
			}			
			$nama = str_replace("&nbsp;",chr(160), $AddOnLib->spasi($row->nama,$row->level_spasi));			
			
			$y1 = $pdf->GetY();											
			$numrow = $pdf->WordWrap($nama,$w[0] - 2);									
			if ($numrow <= 0) $numrow = 1;
			$rowHeight = $numrow * $defHeight;			
			$pdf->row = $row;																					
			//addRow
			$pdf->SetX(20);				
			$x = $pdf->GetX();			
			$pdf->Cell($w[0],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
			if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
			$pdf->SetXY($pdf->GetX() - $w[0],$y1);
			$pdf->MultiCell($w[0],$defHeight,$nama,0);							
			$y2 = $pdf->GetY();			
			$y = $y2 - $y1;			
			$pdf->SetXY(20 + $w[0],  $pdf->GetY() - $y);											
			$pdf->Cell($w[1],$rowHeight,$nilai,1,0,'R',$fill);																							
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
				if ($row->nama1 != "") $nama1 = $row->nama1;
				if ($row->nama2 != "") $nama2 = $row->nama2;
				if ($row->jabatan != "") $jabatan = $row->jabatan;
				if ($row->kota != "") $kota = $row->kota;
			}
		}
		if ($pdf->GetY() + 35 > $pdf->h - $pdf->bMargin){
			$pdf->Cell(0,($pdf->h - $pdf->bMargin) - $pdf->GetY(), '',0,1);
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
		
		$ret = $pdf->Output($namafile,'I',true);		
		return $ret;		
	}
}
?>
