<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptPiutangBast extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[2];
		$kode_lokasi=$tmp[1];
		$sql = "select count(a.no_valid) from yk_valid_m a $this->filter ";
		
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
		$filter2=$tmp[0];
		$periode=$tmp[1];
		$jenis2=$tmp[4];
		$no_bill=$tmp[5];
		$lap=$tmp[6];
		$nama_file="piutang_bast_".$no_bill.".xls";
		$sql = "select a.no_valid,a.keterangan,d.kota,a.tanggal,d.nama as lokasi,
				   b.nama as nama_buat,c.nama as nama_app,b.jabatan as jab_buat,c.jabatan as jab_app,
				   f.nama as nama_area,f.jabatan as jab_area
			from yk_valid_m a 
			inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
			inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
			inner join lokasi d on a.kode_lokasi=d.kode_lokasi
			inner join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='TTD1'
			inner join karyawan f on e.flag=f.nik and e.kode_lokasi=f.kode_lokasi $this->filter ";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		if ($lap=="Excell")
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
        <td align='center' class='header_laporan'>DAFTAR TAGIHAN BIAYA PENGOBATAN </td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'> BULAN ".strtoupper($AddOnLib->ubah_periode($periode))." </td>
      </tr>
      <tr>
        <td align='center' class='header_laporan'>NO PIUTANG : $row->no_valid</td>
      </tr>
    </table></td>
  </tr>
 
   <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' class='header_laporan'>No</td>
    <td width='40' rowspan='2' class='header_laporan'>Kode</td>
    <td width='200' rowspan='2' class='header_laporan'>Nama Mitra </td>
    <td colspan='4' class='header_laporan'>Pegawai</td>
    <td colspan='4' class='header_laporan'>Pensiun</td>
    <td colspan='4' class='header_laporan'>Group</td>
    <td colspan='4' class='header_laporan'>Mitra</td>
	<td width='90' rowspan='2' class='header_laporan'>Total</td>
    </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='80' class='header_laporan'>BP</td>
    <td width='80' class='header_laporan'>Kunjungan</td>
    <td width='80' class='header_laporan'>CS</td>
    <td width='80' class='header_laporan'>Total</td>
    <td width='80' class='header_laporan'>BP</td>
    <td width='80' class='header_laporan'>Kunjungan</td>
    <td width='80' class='header_laporan'>CS</td>
    <td width='80' class='header_laporan'>Total</td>
    <td width='80' class='header_laporan'>BP</td>
    <td width='80' class='header_laporan'>Kunjungan</td>
    <td width='80' class='header_laporan'>CS</td>
    <td width='80' class='header_laporan'>Total</td>
    <td width='80' class='header_laporan'>BP</td>
    <td width='80' class='header_laporan'>Kunjungan</td>
    <td width='80' class='header_laporan'>CS</td>
    <td width='80' class='header_laporan'>Total</td>
  </tr>
  <tr align='center' bgcolor='#CCCCCC'>
    <td class='isi_laporan'>1</td>
    <td class='isi_laporan'>2</td>
    <td class='isi_laporan'>3</td>
    <td class='isi_laporan'>4</td>
    <td class='isi_laporan'>5</td>
    <td class='isi_laporan'>6</td>
    <td class='isi_laporan'>7=4+5-6</td>
    <td class='isi_laporan'>8</td>
    <td class='isi_laporan'>9</td>
    <td class='isi_laporan'>10</td>
    <td class='isi_laporan'>11=8+9-10</td>
    <td class='isi_laporan'>12</td>
    <td class='isi_laporan'>13</td>
    <td class='isi_laporan'>14</td>
    <td class='isi_laporan'>15=12+13-14</td>
    <td class='isi_laporan'>16</td>
    <td class='isi_laporan'>17</td>
    <td class='isi_laporan'>18</td>
    <td class='isi_laporan'>19=16+17-18</td>
	<td class='isi_laporan'>20=7+11+15+19</td>
  </tr>";
		$sql1 = "select a.kode_cust,a.nama,isnull(c.bp_pegawai,0) as bp_pegawai,isnull(c.bp_pensiun,0) as bp_pensiun, 
       isnull(c.bp_group,0) as bp_group,isnull(c.bp_mitra,0) as bp_mitra,
       isnull(d.kunj_pegawai,0) as kunj_pegawai,isnull(d.kunj_pensiun,0) as kunj_pensiun,isnull(d.kunj_group,0) as kunj_group,isnull(d.kunj_mitra,0) as kunj_mitra,
	   isnull(d.cs_pegawai,0) as cs_pegawai,isnull(d.cs_pensiun,0) as cs_pensiun,isnull(d.cs_group,0) as cs_group,isnull(d.cs_mitra,0) as cs_mitra,
	   isnull(c.bp_pegawai,0)+isnull(d.kunj_pegawai,0)-isnull(d.cs_pegawai,0) as total_pegawai,
	   isnull(c.bp_pensiun,0)+isnull(d.kunj_pensiun,0)-isnull(d.cs_pensiun,0) as total_pensiun,
	   isnull(c.bp_group,0)+isnull(d.kunj_group,0)-isnull(d.cs_group,0) as total_group,
	   isnull(c.bp_mitra,0)+isnull(d.kunj_mitra,0)-isnull(d.cs_mitra,0) as total_mitra,
	   isnull(c.bp_pegawai,0)+isnull(d.kunj_pegawai,0)-isnull(d.cs_pegawai,0)+
	   isnull(c.bp_pensiun,0)+isnull(d.kunj_pensiun,0)-isnull(d.cs_pensiun,0)+
	   isnull(c.bp_group,0)+isnull(d.kunj_group,0)-isnull(d.cs_group,0)+
	   isnull(c.bp_mitra,0)+isnull(d.kunj_mitra,0)-isnull(d.cs_mitra,0) as total
from cust a 
inner join (select a.loker_bast as kode_cust
	    from yk_bill_d a 
		inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi $filter2
		group by a.loker_bast
	    )b on a.kode_cust=b.kode_cust 
left join (select a.loker_bast as kode_cust,
		  sum(case b.jenis when 'PEGAWAI' then a.nilai else 0 end) as bp_pegawai, 
		  sum(case b.jenis when 'PENSIUN' then a.nilai else 0 end) as bp_pensiun,   
		  sum(case b.jenis when 'GROUP' then a.nilai else 0 end) as bp_group,
		  sum(case b.jenis when 'MITRA' then a.nilai else 0 end) as bp_mitra
	   from yk_bill_d a 
	   inner join cust b on a.loker_bast=b.kode_cust and a.kode_lokasi=b.kode_lokasi $filter2 -- and a.flag_aktif='1'
	   group by a.loker_bast
	   )c on a.kode_cust=c.kode_cust 
left join (select a.loker_bast as kode_cust,
		  sum(case b.jenis when 'PEGAWAI' then a.umum else 0 end) as umum_pegawai, 
		  sum(case b.jenis when 'PEGAWAI' then a.gigi else 0 end) as gigi_pegawai, 
		  sum(case b.jenis when 'PEGAWAI' then a.kbia else 0 end) as kbia_pegawai,
 		  sum(case b.jenis when 'PEGAWAI' then a.matkes else 0 end) as matkes_pegawai,
		  sum(case b.jenis when 'PEGAWAI' then a.umum+a.gigi+a.kbia+a.matkes else 0 end) as kunj_pegawai,
		  sum(case b.jenis when 'PENSIUN' then a.umum else 0 end) as umum_pensiun, 
		  sum(case b.jenis when 'PENSIUN' then a.gigi else 0 end) as gigi_pensiun, 
		  sum(case b.jenis when 'PENSIUN' then a.kbia else 0 end) as kbia_pensiun,
 		  sum(case b.jenis when 'PENSIUN' then a.matkes else 0 end) as matkes_pensiun,
		  sum(case b.jenis when 'PENSIUN' then a.umum+a.gigi+a.kbia+a.matkes else 0 end) as kunj_pensiun,
		  sum(case b.jenis when 'GROUP' then a.umum else 0 end) as umum_group, 
		  sum(case b.jenis when 'GROUP' then a.gigi else 0 end) as gigi_group, 
		  sum(case b.jenis when 'GROUP' then a.kbia else 0 end) as kbia_group,
 		  sum(case b.jenis when 'GROUP' then a.matkes else 0 end) as matkes_group,
		  sum(case b.jenis when 'GROUP' then a.umum+a.gigi+a.kbia+a.matkes else 0 end) as kunj_group,
 		  sum(case b.jenis when 'MITRA' then a.umum else 0 end) as umum_mitra, 
		  sum(case b.jenis when 'MITRA' then a.gigi else 0 end) as gigi_mitra, 
		  sum(case b.jenis when 'MITRA' then a.kbia else 0 end) as kbia_mitra,
 		  sum(case b.jenis when 'MITRA' then a.matkes else 0 end) as matkes_mitra,
		  sum(case b.jenis when 'MITRA' then a.umum+a.gigi+a.kbia+a.matkes else 0 end) as kunj_mitra,
		  sum(case b.jenis when 'PEGAWAI' then a.cs else 0 end) as cs_pegawai, 
		  sum(case b.jenis when 'PENSIUN' then a.cs else 0 end) as cs_pensiun,   
		  sum(case b.jenis when 'GROUP' then a.cs else 0 end) as cs_group,
		  sum(case b.jenis when 'MITRA' then a.cs else 0 end) as cs_mitra
	   from yk_billkunj_d a 
	   inner join cust b on a.loker_bast=b.kode_cust $filter2 and a.kode_lokasi=b.kode_lokasi -- and a.flag_aktif='1'
	   group by a.loker_bast
	   )d on a.kode_cust=d.kode_cust $jenis2
order by a.kode_cust ";
		
		$rs1 = $dbLib->execute($sql1);
		$bp_pegawai=0;$kunj_pegawai=0;$cs_pegawai=0;$total_pegawai=0;
		$bp_pensiun=0;$kunj_pensiun=0;$cs_pensiun=0;$total_pensiun=0;
		$bp_group=0;$kunj_group=0;$cs_group=0;$total_group=0;
		$bp_mitra=0;$kunj_mitra=0;$cs_mitra=0;$total_mitra=0;
		$i=1;$total=0;
		$pph = 0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{	
			$bp_pegawai=$bp_pegawai+$row1->bp_pegawai;
			$kunj_pegawai=$kunj_pegawai+$row1->kunj_pegawai;
			$cs_pegawai=$cs_pegawai+$row1->cs_pegawai;
			$total_pegawai=$total_pegawai+$row1->total_pegawai;
			$bp_pensiun=$bp_pensiun+$row1->bp_pensiun;
			$kunj_pensiun=$kunj_pensiun+$row1->kunj_pensiun;
			$cs_pensiun=$cs_pensiun+$row1->cs_pensiun;
			$total_pensiun=$total_pensiun+$row1->total_pensiun;
			$bp_group=$bp_group+$row1->bp_group;
			$kunj_group=$kunj_group+$row1->kunj_group;
			$cs_group=$cs_group+$row1->cs_group;
			$total_group=$total_group+$row1->total_group;
			$bp_mitra=$bp_mitra+$row1->bp_mitra;
			$kunj_mitra=$kunj_mitra+$row1->kunj_mitra;
			$cs_mitra=$cs_mitra+$row1->cs_mitra;
			$total_mitra=$total_mitra+$row1->total_mitra;
			$total=$total+$row1->total;
  echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->kode_cust</td>
    <td class='isi_laporan'>$row1->nama</td>
    <td align='right' class='isi_laporan'>".number_format($row1->bp_pegawai,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->kunj_pegawai,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->cs_pegawai,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total_pegawai,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->bp_pensiun,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->kunj_pensiun,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->cs_pensiun,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total_pensiun,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->bp_group,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->kunj_group,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->cs_group,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total_group,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->bp_mitra,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->kunj_mitra,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->cs_mitra,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total_mitra,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->total,0,',','.')."</td>
	  </tr>";
			$i=$i+1;
		}
	echo "<tr>
    <td colspan='3' align='right' class='isi_laporan'>Total</td>
   <td align='right' class='isi_laporan'>".number_format($bp_pegawai,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($kunj_pegawai,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($cs_pegawai,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($total_pegawai,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($bp_pensiun,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($kunj_pensiun,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($cs_pensiun,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($total_pensiun,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($bp_group,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($kunj_group,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($cs_group,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($total_group,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($bp_mitra,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($kunj_mitra,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($cs_mitra,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($total_mitra,0,',','.')."</td>
	<td align='right' class='isi_laporan'>".number_format($total,0,',','.')."</td>
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
			$sender->SetX(20);		
			$sender->SetFont('Arial','B',8);
			$sender->Cell(0,5,"DAFTAR PERMINTAAN TRANSFER KEPADA MITRA KERJA",0,1,'C');			
			$sender->Cell(0,5,"PERIODE PEMBAYARAN ".$sender->row->keterangan,0,1,'C');
			$sender->Cell(0,5,"NO ".$sender->row->no_valid,0,1,'C');
		}
		$w = $sender->w - $sender->rMargin;
		$sender->SetX(20);		
						
		
		//$header = array("No","Kode","Nama","Lokasi","Saldo Awal","Debet","Kredit","Saldo Akhir");		
		$sender->Cell(10,10,"No",'LTR',0,'C',false);			
		$sender->Cell(50,10,"Nama Penerima",'LTR',0,'C',false);				
		$sender->Cell(25,10,"No Rekening",'LTR',0,'C',false);				
		$sender->Cell(40,10,"Nama Bank",'LTR',0,'C',false);				
		$y = $sender->GetY();		
		$sender->Cell(80,5,"Tagihan",'LTR',1,'C',false);		
		$sender->SetX(145);		
		$sender->Cell(20,5,"Pegawai",1,0,'C',false);			
		$sender->Cell(20,5,"Pensiun",1,0,'C',false);	
		$sender->Cell(20,5,"PPh",1,0,'C',false);	
		$sender->Cell(20,5,"Total",1,0,'C',false);	
		
		$sender->SetXY(225,$y);		
		$sender->Cell(60,10,"Nama Mitra",1,1,'C',false);				
		//
		$sender->SetX(20);
		$sender->Cell(10,5,"1",'LTR',0,'C',false);			
		$sender->Cell(50,5,"2",'LTR',0,'C',false);				
		$sender->Cell(25,5,"3",'LTR',0,'C',false);				
		$sender->Cell(40,5,"4",'LTR',0,'C',false);						
		$sender->Cell(20,5,"5",'LTR',0,'C',false);		
		$sender->Cell(20,5,"6",1,0,'C',false);			
		$sender->Cell(20,5,"7",1,0,'C',false);			
		$sender->Cell(20,5,"8=5+6-7",1,0,'C',false);	
		$sender->Cell(60,5,"9",1,1,'C',false);			
		
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
		$headerWidth = array(10,50,25,40,20,20,20,20,60);//dalam mm
		//judul laporan, tinggi row header per baris, ukuran font per baris header, Portrar.landscape, ukuran kertas, ukuran font, header kolom, header font size, tiggi row header , lebar kolom per header
		$pdf = new server_util_PdfLib($title, $titleHeight, $titleSize, "L", "A4", 8, $header,8, 8, $headerWidth, 10);		
		$pdf->AliasNbPages();			
		$pdf->onPrintHeader->set($this, "doPrintHeader");		
		
		$sql = "select a.no_valid,a.keterangan,d.kota,a.tanggal,d.nama as lokasi,
				   b.nama as nama_buat,c.nama as nama_app,b.jabatan as jab_buat,c.jabatan as jab_app,
				   f.nama as nama_area,f.jabatan as jab_area
			from yk_valid_m a 
			inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
			inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
			inner join lokasi d on a.kode_lokasi=d.kode_lokasi
			inner join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='TTD1'
			inner join karyawan f on e.flag=f.nik and e.kode_lokasi=f.kode_lokasi
			where a.kode_lokasi='$kode_lokasi'    ";
			
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$namafile = "HutangTagihan.pdf";				
		$defHeight = 5;
		$rowHeight = 5;
		$fill = false;		
		$ix = 1;
		$tmp = "";
		$w= $headerWidth;//dalam mm
		while ($row = $rs->FetchNextObject($toupper=false)){			
			$pdf->changeHeader = $tmp != $row->no_valid;
			$pdf->row = $row;
			if ($tmp == ""){
				 $pdf->AddPage();
			}else if ($pdf->changeHeader){
				$tmp = $row->no_valid;
				$pdf->AddPage();
			}					
			$pdf->changeHeader = false;	
			$sql1 = "select a.kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,
				   isnull(c.nilai_bp,0) as debet_bp,isnull(c.nilai_cc,0) as debet_cc,isnull(c.pph,0) as pph, isnull(c.nilai_total,0) as debet_total
			from vendor a
			inner join (select a.kode_vendor,a.kode_lokasi
						from yk_hutang_d a
					where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_valid='$row->no_valid'
					group by a.kode_vendor,a.kode_lokasi		
						)e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
			left join (select a.kode_vendor,a.kode_lokasi,sum(case when c.jenis <> 'PENSIUN' then a.nilai else 0 end) as nilai_bp,
					sum(case  when c.jenis = 'PENSIUN' then a.nilai else 0 end) as nilai_cc, sum(a.pph) as pph,sum(a.nilai -a.pph) as nilai_total 
				   from  yk_bill_d a 
				   inner join cust c on a.loker=c.kode_cust
				   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_valid='$row->no_valid'
				   group by a.kode_vendor,a.kode_lokasi
					   )c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
			where a.kode_lokasi='$kode_lokasi' $fbank $vendor		   
			order by a.kode_vendor ";
			$rs1 = $dbLib->execute($sql1);
			$debet_bp=0;$debet_cc=0;$debet_total=0; $i=1;
			$pdf->SetFont('Arial','',7);
			$pph = 0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{							
				$debet_bp += $row1->debet_bp;
				$debet_cc += $row1->debet_cc;				
				$pph += $row1->pph;				
				$debet_total += $row1->debet_total;
				
				$y1 = $pdf->GetY();			
				$bank = $row1->bank ." ".$row1->cabang;
				$numrowNm = $pdf->WordWrap($row1->nama_rek,$w[1] - 2);
				$numrowNm2 = $pdf->WordWrap($bank, $w[3] - 2);
				$numrowNm3 = $pdf->WordWrap($row1->nama, $w[8] - 2);
				
				$numrow = max($numrowNm,$numrowNm2,$numrowNm3);
				if ($numrow <= 0) $numrow = 1;
				$rowHeight = $numrow * $defHeight;				
				
				//addRow
				$pdf->SetX(20);		
				$pdf->SetFillColor(224,235,255);															
				$pdf->Cell($w[0],$rowHeight,$i,1,0,'C',$fill);
				if ($y1 != $pdf->GetY()) $y1 = $pdf->GetY();
				if ($numrowNm  == 1){					
					$pdf->Cell($w[1],$rowHeight,$row1->nama_rek,1,0,'L',$fill);//buat kotak dulu				
				}else{
					$pdf->Cell($w[1],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu				
					$pdf->SetXY($pdf->GetX() - $w[1],$y1);								
					$pdf->MultiCell($w[1],$defHeight,$row1->nama_rek,0);														
					$y2 = $pdf->GetY();
					$y = $y2 - $y1;			
					$pdf->SetXY(20 + $w[0] + $w[1],  $pdf->GetY() - $y);											
				}
				$pdf->Cell($w[2],$rowHeight,$row1->no_rek,1,0,'L',$fill);//buat kotak dulu
				if ($numrowNm2 == 1){
					$pdf->Cell($w[3],$rowHeight,$bank,1,0,'L',$fill);//buat kotak dulu
				}else{							
					$pdf->Cell($w[3],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
					$pdf->SetXY($pdf->GetX() - $w[3],$pdf->GetY());
					$pdf->MultiCell($w[3],$defHeight,$bank,0);
					$y2 = $pdf->GetY();
					$y = $y2 - $y1;			
					$pdf->SetXY(20 + $w[0] + $w[1] + $w[2] + $w[3],  $pdf->GetY() - $y);											
				}
				$pdf->Cell($w[4],$rowHeight,number_format($row1->debet_bp,0,',','.'),1,0,'R',$fill);																	
				$pdf->Cell($w[5],$rowHeight,number_format($row1->debet_cc,0,',','.'),1,0,'R',$fill);														
				$pdf->Cell($w[6],$rowHeight,number_format($row1->pph,0,',','.'),1,0,'R',$fill);														
				$pdf->Cell($w[7],$rowHeight,number_format($row1->debet_total,0,',','.'),1,0,'R',$fill);
				if ($numrowNm3 == 1){
					$pdf->Cell($w[8],$rowHeight,$row1->nama,1,1,'L',$fill);//buat kotak dulu
				}else{
					$pdf->Cell($w[8],$rowHeight,'',1,0,'L',$fill);//buat kotak dulu
					$pdf->SetXY($pdf->GetX() - $w[8],$pdf->GetY());
					$pdf->MultiCell($w[8],$defHeight,$row1->nama,0);				
					$y2 = $pdf->GetY();
					$y = $y2 - $y1;			
					$pdf->SetXY(20 + $w[0] + $w[1] + $w[2] + $w[3] +  $w[4] + $w[5] + $w[6] + $w[7] + $w[8] ,  $pdf->GetY() - $y);											
					$pdf->Ln($rowHeight);
				}
				$i++;				
				$fill=false;					
			}
			$pdf->SetX(20);
			$pdf->SetFillColor(200,200,200);
			$pdf->Cell($w[0]+$w[1]+$w[2]+$w[3],$defHeight,"Total",1,0,'R',false);		
			$pdf->Cell($w[4],$defHeight,number_format($debet_bp,0,',','.'),1,0,'R',false);
			$pdf->Cell($w[5],$defHeight,number_format($debet_cc,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[6],$defHeight,number_format($pph,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[7],$defHeight,number_format($debet_total,0,',','.'),1,0,'R',false);			
			$pdf->Cell($w[8],$defHeight,'',1,1,'R',false);			
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
