<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptHutangNik extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$sql = "select count(a.no_app) from yk_app_m a " . $this->filter;
		
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
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$bank=$tmp[3];
		$vendor=$tmp[4];
		$no_bill=$tmp[5];
		$jenis=$tmp[6];
		$nama_file="tagihan_hutang_".$no_bill.".xls";
		//error_log($bank);
		$sql = "select a.no_app,a.keterangan,d.kota,a.tanggal,d.nama as lokasi,
				   b.nama as nama_buat,c.nama as nama_app,b.jabatan as jab_buat,c.jabatan as jab_app,
				   f.nama as nama_area,f.jabatan as jab_area
			from yk_app_m a 
			inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
			inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
			inner join lokasi d on a.kode_lokasi=d.kode_lokasi
			inner join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='TTD1'
			inner join karyawan f on e.flag=f.nik and e.kode_lokasi=f.kode_lokasi
			" . $this->filter;		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
	
		$AddOnLib=new server_util_AddOnLib();	
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("TAGIHAN MITRA",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellpadding='1' cellspacing='2'>
  <tr>
    <td align='center'><table width='100%' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td align='center' class='header_laporan'>$row->lokasi</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>DAFTAR PERMINTAAN TRANSFER KEPADA MITRA KERJA</td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>PERIODE PEMBAYARAN : $row->keterangan </td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>NO : $row->no_app</td>
      </tr>
    </table></td>
  </tr>
 
   <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='50' rowspan='2' align='center' class='header_laporan'>Kode Biaya </td>
	<td width='200' rowspan='2' align='center' class='header_laporan'>Jenis Biaya</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>Tgl Masuk</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>Tgl Keluar </td>
	<td width='50' rowspan='2' align='center' class='header_laporan'>ICDX</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Pasien</td>
     <td colspan='4' align='center' class='header_laporan'>Tagihan</td>
	<td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra</td>
	<td width='50' rowspan='2' align='center' class='header_laporan'>NIK</td>
	<td width='200' rowspan='2' align='center' class='header_laporan'>Nama Karyawan</td>
  </tr>
  <tr bgcolor='#CCCCCC'> 
    <td width='80' align='center' class='header_laporan'>Pegawai</td>
    <td width='80' align='center' class='header_laporan'>Pensiun</td>
    <td width='80' align='center' class='header_laporan'>PPh</td>
    <td width='80' align='center' class='header_laporan'>Total</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td class='isi_laporan'>1</td>
    <td class='isi_laporan'>2</td>
    <td class='isi_laporan'>3</td>
    <td class='isi_laporan'>4</td>
    <td class='isi_laporan'>5</td>
    <td class='isi_laporan'>6</td>
    <td class='isi_laporan'>7</td>
    <td class='isi_laporan'>8</td>
    <td class='isi_laporan'>9</td>
	<td class='isi_laporan'>10</td>
	<td class='isi_laporan'>11=8+9-10</td>
	<td class='isi_laporan'>12</td>
    <td class='isi_laporan'>13</td>
    <td class='isi_laporan'>14</td>	
  </tr>";
		/*$sql1 = "select a.kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,e.nik,f.nama as karyawan,
					   isnull(c.nilai_bp,0) as debet_bp,isnull(c.nilai_cc,0) as debet_cc,isnull(c.pph,0) as pph, isnull(c.nilai_total,0) as debet_total
				from (select a.kode_vendor,a.kode_lokasi,a.nik
							from yk_bill_d a 
						where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_app='$row->no_app'
						group by a.kode_vendor,a.kode_lokasi,a.nik		
					 )e 
				inner join vendor a on e.kode_vendor=a.kode_vendor and e.kode_lokasi=a.kode_lokasi
				inner join yk_peserta_d f on e.nik=f.nik
				inner join (select a.kode_vendor,a.kode_lokasi,a.nik,
								   sum(case when c.jenis <> 'PENSIUN' then a.nilai else 0 end) as nilai_bp,
						   sum(case when c.jenis = 'PENSIUN' then a.nilai else 0 end) as nilai_cc,
							sum(a.pph) as pph,
						   sum(a.nilai - a.pph) as nilai_total
						   from yk_bill_d a 
					   inner join cust c on a.loker=c.kode_cust
					   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_app='$row->no_app' 
					   group by a.kode_vendor,a.kode_lokasi,a.nik
						   )c on e.kode_vendor=c.kode_vendor and e.kode_lokasi=c.kode_lokasi and e.nik=c.nik
				where a.kode_lokasi='$kode_lokasi' $bank $vendor
				order by a.kode_vendor ";
		*/
		$sql1 = "select a.nik, a.nama as karyawan, a.kode_produk, d.nama as nmprod, date_format(tgl_masuk,'%d-%m-%Y') as tgl1, date_format(tgl_keluar,'%d-%m-%Y') as tgl2,icdx, nikkes+'/'+pasien as pasien, a.kode_vendor+'/'+ b.nama as nama,a.kode_lokasi,a.kode_vendor,
					(case when c.jenis <> 'PENSIUN' then a.nilai else 0 end) as debet_bp,
					(case  when c.jenis = 'PENSIUN' then a.nilai else 0 end) as debet_cc, (a.pph) as pph, (a.nilai -a.pph) as debet_total 
				   from  yk_bill_d a 
				   inner join cust c on a.loker=c.kode_cust 
				   inner join yk_produk d on a.kode_produk = d.kode_produk 
				   inner join vendor b on b.kode_vendor = a.kode_vendor and a.kode_lokasi = b.kode_lokasi
				   inner join yk_bill_m f on a.no_bill=f.no_bill and a.kode_lokasi=f.kode_lokasi
				   -- inner join yk_peserta_d e on e.nik = a.nik and f.no_load=e.no_load
				   where a.kode_lokasi='$kode_lokasi' and a.no_app='$row->no_app' $bank $vendor order by a.kode_vendor";
		$rs1 = $dbLib->execute($sql1);
		$debet_bp=0;$debet_cc=0;$debet_total=0; $i=1;$pph=0;
		$debet_bp1=0;$debet_cc1=0;$debet_total1=0; $pph1 = 0; 
		$first = true;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$beda = $tmp!=$row1->kode_vendor; 
			if ($tmp!=$row1->kode_vendor)
			{
				$tmp=$row1->kode_vendor;
				$first = true;
				
				if ($i>1)
				{
					echo "<tr bgcolor='#CCCCCC'>
						<td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
						<td width='80' align='right' class='isi_laporan'>".number_format($debet_bp1,0,',','.')."</td>
						<td width='80' align='right' class='isi_laporan'>".number_format($debet_cc1,0,',','.')."</td>
						<td width='80' align='right' class='isi_laporan'>".number_format($pph1,0,',','.')."</td>
						<td width='80' align='right' class='isi_laporan'>".number_format($debet_total1,0,',','.')."</td>
						<td width='150' colspan='3' align='center' class='isi_laporan'>&nbsp;</td>
					  </tr>";
					$debet_bp1=0;$debet_cc1=0;$debet_total1=0; $i=1;$pph1=0;
				}
				
			}
			$debet_bp1=$debet_bp1+$row1->debet_bp;
			$debet_cc1=$debet_cc1+$row1->debet_cc;
			$debet_total1=$debet_total1+$row1->debet_total;
			$pph1 += $row1->pph;
			$pph += $row1->pph;
			$debet_bp=$debet_bp+$row1->debet_bp;
			$debet_cc=$debet_cc+$row1->debet_cc;
			$debet_total=$debet_total+$row1->debet_total;
  echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->kode_produk</td>
    <td class='isi_laporan'>$row1->nmprod</td>
    <td class='isi_laporan'>$row1->tgl1</td>
    <td class='isi_laporan'>$row1->tgl2</td>
    <td class='isi_laporan'>$row1->icdx</td>
    <td class='isi_laporan'>$row1->pasien</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->debet_bp,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->debet_cc,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->pph,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($row1->debet_total,0,',','.')."</td>
	<td class='isi_laporan'>$row1->nama</td>
	<td class='isi_laporan'>$row1->nik</td>
	<td class='isi_laporan'>$row1->karyawan</td>
    </tr>";
			$i=$i+1;
		}
	echo "<tr bgcolor='#CCCCCC'>
    <td height='25' colspan='7' align='right'  class='header_laporan'>Sub Total</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_bp1,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_cc1,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($pph1,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_total1,0,',','.')."</td>
	<td width='150' colspan='3' align='center' class='isi_laporan'>&nbsp;</td>
  </tr>";
	echo "<tr bgcolor='#CCCCCC'>
    <td height='25' colspan='7' align='right' class='isi_laporan'>Total</td>
   <td width='80' align='right' class='isi_laporan'>".number_format($debet_bp,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_cc,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($pph,0,',','.')."</td>
    <td width='80' align='right' class='isi_laporan'>".number_format($debet_total,0,',','.')."</td>
	<td width='150' colspan='3' align='center' class='isi_laporan'>&nbsp;</td>
     </tr>
    </table></td>
  </tr>
  <tr>
    <td align='right'><table border='0' cellpadding='1' cellspacing='2'>
      <tr align='right'>
        <td colspan='3'>&nbsp;</td>
      </tr>
      <tr align='right'>
        <td colspan='3'>$row->kota ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr align='center'>
        <td width='200'>Mengetahui</td>
        <td width='200'>Menyetujui</td>
        <td width='200'>Yang Membuat </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td>$row->nama_app</td>
        <td>$row->nama_area</td>
        <td>$row->nama_buat</td>
      </tr>
      <tr align='center'>
        <td>$row->jab_app</td>
        <td>$row->jab_area</td>
        <td>$row->jab_area</td>
      </tr>
    </table></td>
  </tr>
</table>";
		}
		echo "</div>";
		return "";
	}
	function doPrintHeader($sender, $page){		
		if ($sender->changeHeader || $page == 1){
			$sender->SetX(5);
			$sender->SetFont('Arial','B',8);
			$sender->Cell(0,5,"DAFTAR PERMINTAAN TRANSFER KEPADA MITRA KERJA",0,1,'C');			
			$sender->Cell(0,5,"PERIODE PEMBAYARAN ".$sender->row->keterangan,0,1,'C');
			$sender->Cell(0,5,"NO ".$sender->row->no_app,0,1,'C');
		}
		$w = $sender->w - $sender->rMargin;
		$sender->SetX(5);
								
		//$header = array("No","Kode","Nama","Lokasi","Saldo Awal","Debet","Kredit","Saldo Akhir");		
		$sender->Cell(10,10,"No",'LTR',0,'C',false);			
		$sender->Cell(15,10,"Kode Biaya",'LTR',0,'C',false);				
		$sender->Cell(30,10,"Jenis Biaya",'LTR',0,'C',false);				
		$sender->Cell(15,10,"Tgl Keluar",'LTR',0,'C',false);				
		$sender->Cell(15,10,"Tgl Masuk",'LTR',0,'C',false);				
		$sender->Cell(10,10,"ICDX",'LTR',0,'C',false);				
		$sender->Cell(30,10,"Pasien",'LTR',0,'C',false);				
		$y = $sender->GetY();		
		$sender->Cell(80,5,"Tagihan",'LTR',1,'C',false);		
		$sender->SetX(130);		
		$sender->Cell(20,5,"Pegawai",1,0,'C',false);			
		$sender->Cell(20,5,"Pensiun",1,0,'C',false);	
		$sender->Cell(20,5,"PPh",1,0,'C',false);	
		$sender->Cell(20,5,"Total",1,0,'C',false);	
		
		$sender->SetXY(210,$y);		
		$sender->Cell(30,10,"Nama Mitra",1,0,'C',false);				
		$sender->Cell(20,10,"NIK",1,0,'C',false);				
		$sender->Cell(30,10,"Nama Karyawan",1,1,'C',false);				
		//
		$sender->SetX(5);
		$sender->Cell(10,5,"1",'LTR',0,'C',false);			
		$sender->Cell(15,5,"2",'LTR',0,'C',false);				
		$sender->Cell(30,5,"3",'LTR',0,'C',false);				
		$sender->Cell(15,5,"4",'LTR',0,'C',false);						
		$sender->Cell(15,5,"5",'LTR',0,'C',false);		
		$sender->Cell(10,5,"6",1,0,'C',false);			
		$sender->Cell(30,5,"7",1,0,'C',false);			
		$sender->Cell(20,5,"8",1,0,'C',false);	
		$sender->Cell(20,5,"9",1,0,'C',false);			
		$sender->Cell(20,5,"10",1,0,'C',false);			
		$sender->Cell(20,5,"11=8+9-10",1,0,'C',false);			
		$sender->Cell(30,5,"12",1,0,'C',false);			
		$sender->Cell(20,5,"13",1,0,'C',false);			
		$sender->Cell(30,5,"14",1,1,'C',false);			
		//$sender->Ln();    
	}
	function createPdf()
	{		
		//$html = $this->getHtml();				
		//$pdf = new server_pdf_Pdf();
		//$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$fbank=$tmp[3];		
		$vendor = $tmp[4];
		
		uses("server_util_PdfLib");			
		$AddOnLib=new server_util_AddOnLib();
		$title = array($this->lokasi,"");
		$titleHeight= array(5);//tinggi row per baris judul laporan dalam mm
		$titleSize = array(8);//fontSize judul
		$header = array("No","Nama Penerima","No Rekening","Nama Bank");
		$headerWidth = array(10,15,30,15,15,10,30,20,20,20,20,30,20,30);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "L", "A4", 8, $header,8, 8, $headerWidth, 10);		
		$pdf->AliasNbPages();			
		$pdf->onPrintHeader->set($this, "doPrintHeader");		
		
		$sql = "select a.no_app,a.keterangan,d.kota,a.tanggal,d.nama as lokasi,
				   b.nama as nama_buat,c.nama as nama_app,b.jabatan as jab_buat,c.jabatan as jab_app,
				   f.nama as nama_area,f.jabatan as jab_area
			from yk_app_m a 
			inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
			inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
			inner join lokasi d on a.kode_lokasi=d.kode_lokasi
			inner join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='TTD1'
			inner join karyawan f on e.flag=f.nik and e.kode_lokasi=f.kode_lokasi
			" . $this->filter;
			
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "HutangTagihanNIK.pdf";				
		$defHeight = 5;
		$rowHeight = 5;
		$fill = false;		
		$ix = 1;
		$tmp = "";
		$w= $headerWidth;//dalam mm
		while ($row = $rs->FetchNextObject($toupper=false)){			
			$pdf->changeHeader = $tmp != $row->no_app;
			$pdf->row = $row;
			if ($tmp == ""){
				 $pdf->AddPage();
			}else if ($pdf->changeHeader){
				$tmp = $row->no_app;
				$pdf->AddPage();
			}					
			$pdf->changeHeader = false;	
			/*$sql1 = "select a.kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,e.nik,f.nama as karyawan,
					   isnull(c.nilai_bp,0) as debet_bp,isnull(c.nilai_cc,0) as debet_cc,isnull(c.pph,0) as pph, isnull(c.nilai_total,0) as debet_total
				from (select a.kode_vendor,a.kode_lokasi,a.nik
							from yk_bill_d a 
						where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_app='$row->no_app'
						group by a.kode_vendor,a.kode_lokasi,a.nik		
					 )e 
				inner join vendor a on e.kode_vendor=a.kode_vendor and e.kode_lokasi=a.kode_lokasi
				inner join yk_peserta_d f on e.nik=f.nik
				inner join (select a.kode_vendor,a.kode_lokasi,a.nik,
								   sum(case when c.jenis <> 'PENSIUN' then a.nilai else 0 end) as nilai_bp,
						   sum(case when c.jenis = 'PENSIUN' then a.nilai else 0 end) as nilai_cc,
							sum(a.pph) as pph,
						   sum(a.nilai - a.pph) as nilai_total
						   from yk_bill_d a 
					   inner join cust c on a.loker=c.kode_cust
					   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_app='$row->no_app' 
					   group by a.kode_vendor,a.kode_lokasi,a.nik
						   )c on e.kode_vendor=c.kode_vendor and e.kode_lokasi=c.kode_lokasi and e.nik=c.nik
				where a.kode_lokasi='$kode_lokasi' $fbank $vendor
				order by a.kode_vendor ";
			*/
			$sql1 = "select  a.nik, e.nama as karyawan, a.kode_produk, d.nama as nmprod, date_format(tgl_masuk,'%d-%m-%Y') as tgl1, date_format(tgl_keluar,'%d-%m-%Y') as tgl2,icdx, nikkes+' / '+pasien as pasien, a.kode_vendor+' / '+ b.nama as nama,a.kode_lokasi, a.kode_vendor, 
					(case when c.jenis <> 'PENSIUN' then a.nilai else 0 end) as debet_bp,
					(case  when c.jenis = 'PENSIUN' then a.nilai else 0 end) as debet_cc, (a.pph) as pph, (a.nilai -a.pph) as debet_total 
				   from  yk_bill_d a 
				   inner join cust c on a.loker=c.kode_cust 
				   inner join yk_produk d on a.kode_produk = d.kode_produk 
				   inner join vendor b on b.kode_vendor = a.kode_vendor and a.kode_lokasi = b.kode_lokasi
				   inner join yk_bill_m f on a.no_bill=f.no_bill and a.kode_lokasi=f.kode_lokasi
					inner join yk_peserta_d e on e.nik = a.nik and f.no_load=e.no_load
				   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_app='$row->no_app' $fbank $vendor order by a.kode_vendor";
			$rs1 = $dbLib->execute($sql1);
			$debet_bp=0;$debet_cc=0;$debet_total=0; $i=1; $pph = 0;
			$debet_bp2=0;$debet_cc2=0;$debet_total2=0; $i=1; $pph2 = 0;
			$pdf->SetFont('Arial','',6);
			$vdr = "";
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{															
				if ($vdr != $row1->kode_vendor){
					if ($vdr != ""){
						$pdf->SetX(5);						
						$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$defHeight,"Subtotal",1,0,'R',false);		
						$pdf->Cell($w[7],$defHeight,number_format($debet_bp2,0,',','.'),1,0,'R',false);
						$pdf->Cell($w[8],$defHeight,number_format($debet_cc2,0,',','.'),1,0,'R',false);			
						$pdf->Cell($w[9],$defHeight,number_format($pph2,0,',','.'),1,0,'R',false);			
						$pdf->Cell($w[10],$defHeight,number_format($debet_total2,0,',','.'),1,0,'R',false);			
						$pdf->Cell($w[11]+$w[12]+$w[13],$defHeight,'',1,1,'R',false);						
					}
					$vdr = $row1->kode_vendor;
					$debet_bp2=0;$debet_cc2=0;$debet_total2=0; $i=1; $pph2 = 0;
				}
				$debet_bp += $row1->debet_bp;
				$debet_cc += $row1->debet_cc;				
				$pph += $row1->pph;		
				$debet_total += $row1->debet_total;
				$debet_bp2 += $row1->debet_bp;
				$debet_cc2 += $row1->debet_cc;				
				$pph2 += $row1->pph;		
				$debet_total2 += $row1->debet_total;
				$y1 = $pdf->GetY();							
				$numrowNm = $pdf->WordWrap($row1->nmprod,$w[2] - 2);
				$numrowNm2 = $pdf->WordWrap($row1->pasien, $w[6] - 2);
				$numrowNm3 = $pdf->WordWrap($row1->nama, $w[11] - 2);
				$numrowNm4 = $pdf->WordWrap($row1->karyawan, $w[13] - 2);
				
				$numrow = max($numrowNm,$numrowNm2,$numrowNm3, $numrowNm4);
				if ($numrow <= 0) $numrow = 1;
				$rowHeight = $numrow * $defHeight;				
				
				//addRow
				$pdf->SetX(5);																
				$pdf->Cell($w[0],$rowHeight,$i,1,0,'C',$fill);
				$pdf->Cell($w[1],$rowHeight,$row1->kode_produk,1,0,'L',$fill);//buat kotak dulu
				if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
				if ($numrowNm == 1){					
					$pdf->Cell($w[2],$rowHeight,$row1->nmprod,1,0,'L',$fill);//buat kotak dulu									
				}else{
					$pdf->Cell($w[2],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu				
					$pdf->SetXY($pdf->GetX() - $w[2],$y1);								
					$pdf->MultiCell($w[2],$defHeight,$row1->nmprod,0);														
					$y2 = $pdf->GetY();
					$y = $y2 - $y1;					
					$y = $pdf->GetY() - $y;
					$pdf->SetXY(5 + $w[0] + $w[1] +  $w[2],  $y);											
				}				
				$pdf->Cell($w[3],$rowHeight,$row1->tgl1,1,0,'L',$fill);//buat kotak dulu
				$pdf->Cell($w[4],$rowHeight,$row1->tgl2,1,0,'L',$fill);//buat kotak dulu
				$pdf->Cell($w[5],$rowHeight,$row1->icdx,1,0,'L',$fill);//buat kotak dulu
				if ($numrowNm2 == 1){
					$pdf->Cell($w[6],$rowHeight,$row1->pasien,1,0,'L',$fill);//buat kotak dulu
				}else{							
					$pdf->Cell($w[6],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
					$pdf->SetXY($pdf->GetX() - $w[6],$pdf->GetY());
					$pdf->MultiCell($w[6],$defHeight,$row1->pasien,0);
					$y2 = $pdf->GetY();
					$y = $y2 - $y1;			
					$pdf->SetXY(5 + $w[0] + $w[1] + $w[2] + $w[3] + $w[4] + $w[5] + $w[6],  $pdf->GetY() - $y);											
				}
				$pdf->Cell($w[7],$rowHeight,number_format($row1->debet_bp,0,',','.'),1,0,'R',$fill);																	
				$pdf->Cell($w[8],$rowHeight,number_format($row1->debet_cc,0,',','.'),1,0,'R',$fill);														
				$pdf->Cell($w[9],$rowHeight,number_format($row1->pph,0,',','.'),1,0,'R',$fill);	
				$pdf->Cell($w[10],$rowHeight,number_format($row1->debet_total,0,',','.'),1,0,'R',$fill);
				if ($numrowNm3 == 1){
					$pdf->Cell($w[11],$rowHeight,$row1->nama,1,0,'L',$fill);//buat kotak dulu
				}else{
					$pdf->Cell($w[11],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
					$pdf->SetXY($pdf->GetX() - $w[11],$pdf->GetY());
					$pdf->MultiCell($w[11],$defHeight,$row1->nama,0);				
					$y2 = $pdf->GetY();
					$y = $y2 - $y1;			
					$pdf->SetXY(5 + $w[0] + $w[1] + $w[2] + $w[3] +  $w[4] + $w[5] + $w[6] + $w[7]+ $w[8]+ $w[9] + $w[10]+$w[11]  ,  $pdf->GetY() - $y);																
				}
				$pdf->Cell($w[12],$rowHeight,$row1->nik,1,0,'L',$fill);
				if ($numrowNm4 == 1){
					$pdf->Cell($w[13],$rowHeight,$row1->karyawan,1,1,'L',$fill);//buat kotak dulu
				}else{
					$pdf->Cell($w[13],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
					$pdf->SetXY($pdf->GetX() - $w[13],$pdf->GetY());
					$pdf->MultiCell($w[13],$defHeight,$row1->karyawan,0);				
					$y2 = $pdf->GetY();
					$y = $y2 - $y1;			
					$pdf->SetXY(5 + $w[0] + $w[1] + $w[2] + $w[3] +  $w[4] + $w[5] + $w[6] + $w[7]+ $w[8] + $w[9]+ $w[10]+ $w[11]+ $w[12]+$w[13] ,  $pdf->GetY() - $y);																
					$pdf->Ln($rowHeight);
				}
				$i++;				
				$fill=false;					
			}
			$pdf->SetX(5);						
			$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$defHeight,"Subtotal",1,0,'R',false);		
			$pdf->Cell($w[7],$defHeight,number_format($debet_bp2,0,',','.'),1,0,'R',false);
			$pdf->Cell($w[8],$defHeight,number_format($debet_cc2,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[9],$defHeight,number_format($pph2,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[10],$defHeight,number_format($debet_total2,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[11]+$w[12]+$w[13],$defHeight,'',1,1,'R',false);									
			$pdf->SetX(5);			
			$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3]+$w[4]+$w[5]+$w[6],$defHeight,"Total",1,0,'R',false);		
			$pdf->Cell($w[7],$defHeight,number_format($debet_bp,0,',','.'),1,0,'R',false);
			$pdf->Cell($w[8],$defHeight,number_format($debet_cc,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[9],$defHeight,number_format($pph,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[10],$defHeight,number_format($debet_total,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[11]+$w[12]+$w[13],$defHeight,'',1,1,'R',false);						
			$y = $pdf->GetY();
			if ($y + 35 > $pdf->h - $pdf->bMargin) {
				$pdf->Cell(0,35,'',0,1,'C');
			}
			$pdf->Cell(0,$defHeight,$row->kota. ", ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6)),0,1,"R");
			$pdf->Cell($pdf->w / 2,$defHeight, "Diperiksa Oleh : ",0,0,'C');$pdf->Cell($pdf->w / 2,$defHeight, "Dibuat Oleh : ",0,1,'C');
			$pdf->Ln(15);
			$pdf->Cell($pdf->w / 2,$defHeight, $row->nama_setuju,0,0,'C');$pdf->Cell($pdf->w / 2,$defHeight, $row->nama_buat,0,1,'C');
			$pdf->Cell($pdf->w / 2,$defHeight, $row->jabatan_setuju,0,0,'C');$pdf->Cell($pdf->w / 2,$defHeight, $row->jabatan_buat,0,1,'C');			
		}					
		$ret = $pdf->Output($namafile,'I',true);
		return $ret;		
	}
	
}
?>
