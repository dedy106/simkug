<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_yks_rptPiutangTerimaNik extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter2=$tmp[0];
		$periode=$tmp[1];
		$filter3=$tmp[2];
		$sql="select count(a.no_valid)
from yk_valid_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
inner join lokasi d on a.kode_lokasi=d.kode_lokasi
inner join spro e on a.kode_lokasi=e.kode_lokasi and e.kode_spro='TTD1'
inner join karyawan f on e.flag=f.nik and e.kode_lokasi=f.kode_lokasi $this->filter";	
		echo $sql;
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
		$filter3=$tmp[2];
		//error_log($bank);
		$sql="select a.no_valid,a.keterangan,d.kota,a.tanggal,d.nama as lokasi,a.kode_lokasi,
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
		
		echo "<div align='center'>"; 
		$tmp = "";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table width='100%' border='0' cellpadding='1' cellspacing='2'>
							  <tr>
								<td align='center' class='header_laporan'>$row->lokasi</td>
							  </tr>
							  <tr>
								<td align='center' class='header_laporan'>DAFTAR PERMINTAAN TAK TERIMA PIUTANG KEPADA MITRA KERJA</td>
							  </tr>
							  <tr>
								<td align='center' class='header_laporan'>BULAN ".strtoupper($AddOnLib->ubah_periode($periode))." </td>
							  </tr>
							  <tr>
								<td align='center' class='header_laporan'>NO VALIDASI : $row->no_valid</td>
							  </tr>
							  <tr>
							    <td align='center' class='header_laporan'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
                                  <tr bgcolor='#CCCCCC'>
                                    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
                                    <td width='50' rowspan='2' align='center' class='header_laporan'>Kode Biaya </td>
                                    <td width='200' rowspan='2' align='center' class='header_laporan'>Jenis Biaya</td>
                                    <td width='60' rowspan='2' align='center' class='header_laporan'>Tgl Masuk</td>
                                    <td width='60' rowspan='2' align='center' class='header_laporan'>Tgl Keluar </td>
                                    <td width='50' rowspan='2' align='center' class='header_laporan'>ICDX</td>
									<td width='50' rowspan='2' align='center' class='header_laporan'>Nikkes</td>
                                    <td width='200' rowspan='2' align='center' class='header_laporan'>Pasien</td>
                                    <td colspan='5' align='center' class='header_laporan'>Tagihan</td>
                                    <td width='80' rowspan='2' align='center' class='header_laporan'>No TAK Kirim</td>
                                    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Mitra</td>
                                    <td width='50' rowspan='2' align='center' class='header_laporan'>NIK</td>
                                    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Karyawan</td>
                                  </tr>
                                  <tr bgcolor='#CCCCCC'>
                                    <td width='80' align='center' class='header_laporan'>Pegawai</td>
									<td width='80' align='center' class='header_laporan'>Pensiun</td>
                                    <td width='80' align='center' class='header_laporan'>Kunjungan</td>
                                    <td width='80' align='center' class='header_laporan'>CS</td>
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
                                    <td class='isi_laporan'>11</td>
                                    <td class='isi_laporan'>12=9+10-11</td>
                                    <td class='isi_laporan'>13</td>
                                    <td class='isi_laporan'>14</td>
                                    <td class='isi_laporan'>15</td>
									<td class='isi_laporan'>16</td>
									<td class='isi_laporan'>17</td>
                                  </tr>";
			$sql1 = "select a.no_valid,a.kode_lokasi,a.nik,a.nama,a.nikkes,a.pasien,a.jenis,a.icdx,date_format(a.tgl_masuk,'%d-%m-%Y') as tgl_masuk,date_format(a.tgl_keluar,'%d-%m-%Y') as tgl_keluar,a.kode_produk,a.nama_produk,
                   a.kode_cust,a.nama_cust,a.pegawai,a.pensiun,a.nilai_kunj,a.nilai_cs,a.pegawai+a.pensiun+a.nilai_kunj-a.nilai_cs as total,a.no_hutang
			from (select a.no_bill as no_valid,a.kode_lokasi,a.nik,a.nama,a.nikkes,a.pasien,b.jenis,a.icdx,a.tgl_masuk,a.tgl_keluar,a.kode_produk,c.nama as nama_produk,
                   b.kode_cust,b.nama as nama_cust,a.no_hutang,
				   case when b.jenis<>'PENSIUN' then a.nilai else 0 end as pegawai,
				   case when b.jenis='PENSIUN' then a.nilai else 0 end as pensiun,0 as nilai_kunj,0 as nilai_cs
from yk_bill_d a
inner join cust b on a.loker=b.kode_cust 
inner join yk_produk c on a.kode_produk=c.kode_produk
where a.no_bill='$row->no_valid' and a.kode_lokasi='$row->kode_lokasi' 
union all
select a.no_bill as no_valid,a.kode_lokasi,a.nik,a.nama,a.nikkes,a.pasien,b.jenis,'-' as icdx,a.tgl_masuk,a.tgl_masuk as tgl_keluar,a.kode_produk,c.nama as nama_produk,
                   b.kode_cust,b.nama as nama_cust,a.no_kas as no_hutang,0 as pegawai,0 as pensiun,a.umum+a.gigi+a.kbia+a.matkes as nilai_kunj,a.cs as nilai_cs
from yk_billkunj_d a
inner join cust b on a.loker=b.kode_cust 
inner join yk_kunj c on a.kode_produk=c.kode_produk
where a.no_bill='$row->no_valid' and a.kode_lokasi='$row->kode_lokasi' 
                 ) a $filter3
	   order by a.kode_lokasi,a.nik
	  ";
			
			$rs1 = $dbLib->execute($sql1);
			$first = true;
			$i=1;$tmp="";$nama_cust="";
			$pensiun=0;$pegawai=0;$nilai_kunj=0;$nilai_cs=0;$total=0;
			$tot_pegawai=0;$tot_pensiun=0;$tot_kunj=0;$tot_cs=0;$tot_total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{				
				$beda = $tmp!=$row1->no_hutang; 
				
				if ($tmp!=$row1->no_hutang)
				{
					$tmp=$row1->no_hutang;
					$first = true;
					if ($i>1)
					{
						echo "<tr align='center' bgcolor='#CCCCCC'>
						    <td align='right' colspan='8' class='isi_laporan'>Sub Total $nama_cust</td>
							<td align='right' class='isi_laporan'>".number_format($pegawai,0,',','.')."</td>
						    <td align='right' class='isi_laporan'>".number_format($pensiun,0,',','.')."</td>
							<td align='right' class='isi_laporan'>".number_format($nilai_kunj,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($nilai_cs,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($total,0,',','.')."</td>
						    <td colspan='4' class='isi_laporan'>&nbsp;</td>
						    </tr>";
						$i=1;
						$pensiun=0;$pegawai=0;$nilai_kunj=0;$nilai_cs=0;$total=0;
						
					}
					
				}
				if ($nama_cust!=$row1->no_hutang)
				{
					$nama_cust=$row1->no_hutang;
				};
				$pegawai=$pegawai+$row1->pegawai;
				$pensiun=$pensiun+$row1->pensiun;
				$nilai_kunj=$nilai_kunj+$row1->nilai_kunj;
				$nilai_cs=$nilai_cs+$row1->nilai_cs;
				$total=$total+$row1->total;
				
				$tot_pensiun=$tot_pensiun+$row1->pensiun;
				$tot_pegawai=$tot_pegawai+$row1->pegawai;
				$tot_kunj=$tot_kunj+$row1->nilai_kunj;
				$tot_cs=$tot_cs+$row1->nilai_cs;
				$tot_total=$tot_total+$row1->total;
				echo "<tr>
					<td class='isi_laporan' align='center'>$i</td>
					<td class='isi_laporan'>$row1->kode_produk</td>
					<td class='isi_laporan'>$row1->nama_produk</td>
					<td class='isi_laporan'>$row1->tgl_masuk</td>
					<td class='isi_laporan'>$row1->tgl_keluar</td>
					<td class='isi_laporan'>$row1->icdx</td>
					<td class='isi_laporan'>$row1->nikkes</td>
					<td class='isi_laporan'>$row1->pasien</td>
					<td align='right' class='isi_laporan'>".number_format($row1->pegawai,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($row1->pensiun,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($row1->nilai_kunj,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($row1->nilai_cs,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($row1->total,0,',','.')."</td>
					<td align='center' class='isi_laporan'>$row1->no_hutang</td>
					<td class='isi_laporan'>$row1->nama_cust</td>
					<td class='isi_laporan'>$row1->nik</td>
					<td class='isi_laporan'>$row1->nama</td>
					</tr>";
				$first = true;
				$i=$i+1;
			}
			$pegawai=$pegawai+$row1->pegawai;
			$pensiun=$pensiun+$row1->pensiun;
			$nilai_kunj=$nilai_kunj+$row1->nilai_kunj;
			$nilai_cs=$nilai_cs+$row1->nilai_cs;
			$total=$total+$row1->total;
			echo "<tr align='center' bgcolor='#CCCCCC'>
						    <td align='right' colspan='8' class='isi_laporan'>Sub Total $nama_cust</td>
						    <td align='right' class='isi_laporan'>".number_format($pegawai,0,',','.')."</td>
							<td align='right' class='isi_laporan'>".number_format($pensiun,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($nilai_kunj,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($nilai_cs,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($total,0,',','.')."</td>
						    <td colspan='4' class='isi_laporan'>&nbsp;</td>
						    </tr>";
			$tot_pensiun=$tot_pensiun+$row1->pensiun;
			$tot_pegawai=$tot_pegawai+$row1->pegawai;
			$tot_kunj=$tot_kunj+$row1->nilai_kunj;
			$tot_cs=$tot_cs+$row1->nilai_cs;
			$tot_total=$tot_total+$row1->total;
			echo " <tr align='center' bgcolor='#CCCCCC'>
						    <td align='right' colspan='8' class='isi_laporan'>Total</td>
						    <td align='right' class='isi_laporan'>".number_format($tot_pegawai,0,',','.')."</td>
							 <td align='right' class='isi_laporan'>".number_format($tot_pensiun,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($tot_kunj,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($tot_cs,0,',','.')."</td>
					<td align='right' class='isi_laporan'>".number_format($tot_total,0,',','.')."</td>
						    <td colspan='4' class='isi_laporan'>&nbsp;</td>
						    </tr>";
			echo "</table></td>
						      </tr>
							  <tr>
							    <td align='right' ><table border='0' cellpadding='1' cellspacing='2'>
      <tr align='right'>
        <td colspan='3'>&nbsp;</td>
      </tr>
      <tr align='right'>
        <td colspan='3' class='header_laporan'>$row->kota ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))."</td>
        </tr>
      <tr align='center'>
        <td width='200' class='header_laporan'>Mengetahui</td>
        <td width='200' class='header_laporan'>Menyetujui</td>
        <td width='200' class='header_laporan'>Yang Membuat </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>$row->nama_app</td>
        <td class='header_laporan'>$row->nama_area</td>
        <td class='header_laporan'>$row->nama_buat</td>
      </tr>
      <tr align='center'>
        <td class='header_laporan'>$row->jab_app</td>
        <td class='header_laporan'>$row->jab_area</td>
        <td class='header_laporan'>$row->jab_area</td>
      </tr>
    </table></td>
						      </tr>
							</table>";
		}
		
		
		return "";
	}
	function doPrintHeader($sender, $page){		
		if ($sender->changeHeader || $page == 1){
			$sender->SetX(5);
			$sender->SetFont('Arial','B',8);
			$sender->Cell(0,5,"DAFTAR PERMINTAAN TRANSFER KEPADA MITRA KERJA",0,1,'C');			
			$sender->Cell(0,5,"PERIODE PEMBAYARAN ".$sender->row->keterangan,0,1,'C');
			$sender->Cell(0,5,"NO ".$sender->row->no_valid,0,1,'C');
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
		
		$sql = "select a.no_valid,a.keterangan,d.kota,a.tanggal,d.nama as lokasi,
				   b.nama as nama_buat,c.nama as nama_app,b.jabatan as jab_buat,c.jabatan as jab_app,
				   f.nama as nama_area,f.jabatan as jab_area
			from yk_valid_m a 
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
			$pdf->changeHeader = $tmp != $row->no_valid;
			$pdf->row = $row;
			if ($tmp == ""){
				 $pdf->AddPage();
			}else if ($pdf->changeHeader){
				$tmp = $row->no_valid;
				$pdf->AddPage();
			}					
			$pdf->changeHeader = false;	
			/*$sql1 = "select a.kode_vendor,a.nama,a.bank,a.cabang,a.no_rek,a.nama_rek,e.nik,f.nama as karyawan,
					   isnull(c.nilai_bp,0) as debet_bp,isnull(c.nilai_cc,0) as debet_cc,isnull(c.pph,0) as pph, isnull(c.nilai_total,0) as debet_total
				from (select a.kode_vendor,a.kode_lokasi,a.nik
							from yk_bill_d a 
						where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_valid='$row->no_valid'
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
					   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_valid='$row->no_valid' 
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
				   inner join yk_peserta_d e on e.nik = a.nik
				   where a.kode_lokasi='$kode_lokasi' and a.periode='$periode' and a.no_valid='$row->no_valid' $fbank $vendor order by a.kode_vendor";
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
