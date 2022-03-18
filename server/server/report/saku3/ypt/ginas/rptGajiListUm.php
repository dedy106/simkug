<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_ginas_rptGajiListUm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select b.bm,b.kode_lokasi,b.nik,b.nama as kryn,b.jabatan,b.loker,b.tgl_masuk,b.bank,b.no_rek,b.nama_rek,c.gapok,c.tunmk,c.tunjab,c.lembur,
		c.lain,c.ginas,c.payroll,c.bpjs,
		(c.gapok+c.tunmk) as jmlhj,(c.tunjab+c.lembur) as jml,(c.lain+c.ginas+c.payroll+c.bpjs) as jmlh
		from hr_karyawan b
 inner join hr_gaji_loadumum c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
$this->filter order by b.nik";


		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR PEMBAYARAN GAJI TENAGA KERJA ALIH DAYA CLEANING SERVICE ",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <col width='76' />
  <col width='28' />
  <col width='158' />
  <col width='136' />
  <col width='131' />
  <col width='84' />
  <col width='73' />
  <col width='64' />
  <col width='76' />
  <col width='91' />
  <col width='95' />
  <col width='86' />
  <col width='98' />
  <col width='66' />
  <col width='223' />
  <col width='60' />
  <col width='64' />
  <col width='49' />
  <col width='67' />
  <col width='65' />
  <col width='94' />
  <tr height='20' bgcolor='#CCCCCC'>
    <td class='header_laporan' rowspan='4' height='142' width='76'>NO</td>
    <td class='header_laporan' rowspan='4' width='28'>NIK</td>
    <td class='header_laporan' rowspan='4' width='158'>NAMA</td>
    <td class='header_laporan' rowspan='4' width='136'>KOTA LOKER</td>
    <td class='header_laporan' rowspan='4' width='131'>FM/BM</td>
    <td class='header_laporan' rowspan='4' width='84'>JABATAN</td>
    <td class='header_laporan' colspan='6' width='304'><div align='center'>TAKE HOME PAY&nbsp;</div></td>
    <td class='header_laporan' rowspan='4' width='98'>NO REKENING</td>
    <td class='header_laporan' rowspan='4' width='66'>NAMA BANK</td>
    <td class='header_laporan' rowspan='4' width='223'>ATAS NAMA&nbsp;</td>
    <td class='header_laporan' colspan='5' rowspan='2' width='305'>POTONGAN&nbsp;</td>
    <td class='header_laporan' rowspan='4' width='94'>JUMLAH DIBAYARKAN</td>
  </tr>
  <tr height='15' bgcolor='#CCCCCC'>
    <td class='header_laporan' colspan='3' height='15' width='213'><div align='center'>UPAH&nbsp;</div></td>
    <td class='header_laporan' rowspan='2' width='91'>&nbsp;TUNJANGAN&nbsp;    JABATAN&nbsp;</td>
    <td class='header_laporan' width='95'>&nbsp;LEMBUR&nbsp;</td>
    <td class='header_laporan' rowspan='3' width='86'>&nbsp;JUMLAH PENERIMAAN&nbsp;</td>
  </tr>
  <tr height='60' bgcolor='#CCCCCC'>
    <td class='header_laporan' height='60' width='73'>&nbsp;GAJI    POKOK&nbsp;</td>
    <td class='header_laporan' width='64'>&nbsp;TUNJANGAN MASA KERJA&nbsp;</td>
    <td class='header_laporan' rowspan='2' width='76'>&nbsp;JUMLAH&nbsp;</td>
    <td class='header_laporan' width='95'>&nbsp;TOTAL LEMBUR&nbsp;</td>
    <td class='header_laporan' rowspan='2' width='60'>&nbsp;LAIN -    LAIN&nbsp;&nbsp;&nbsp;</td>
    <td class='header_laporan' rowspan='2'>TRENGGINAS JAYA</td>
    <td class='header_laporan' rowspan='2'>PAYROLL</td>
    <td class='header_laporan' rowspan='2'>BPJS&nbsp; 4 %</td>
    <td class='header_laporan' rowspan='2'>JUMLAH</td>
  </tr>
  <tr height='47' bgcolor='#CCCCCC'>
    <td class='header_laporan' height='47' width='73'>&nbsp;</td>
    <td class='header_laporan' width='64'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; - </td>
    <td class='header_laporan' width='91'>0.00%</td>
    <td class='header_laporan' width='95'>&nbsp;(Rp)&nbsp;</td>
  </tr>	 ";
		$ditrm=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$ditrm=$row->jml+$row->jmlh+$row->jmlhj;
			$ditrm1=+$ditrm;
			$gaji=+$row->gapok;
			$tunjmk1=+$row->tunmk;
			$tunjab1=+$row->tunjab;
			$lembur1=+$row->lembur;
			$tukom1=+$row->lain;
			$rapel1=+$row->ginas;
			$jml1=+$row->jml;
			$kosumba1=+$row->payroll;
			$bpjs1=+$row->bpjs;
			$jmlh1=+$row->jmlh;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->kryn</td>
	 <td class='isi_laporan'>$row->loker</td>
	 <td class='isi_laporan'>$row->bm</td>
	 <td class='isi_laporan'>$row->jabatan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->gapok,0,",",".")."</td>	 
	 <td class='isi_laporan' align='right'>".number_format($row->tunmk,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jmlhj,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tunjab,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->lembur,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jml,0,",",".")."</td>	 
	 <td class='isi_laporan'>$row->no_rek</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->nama_rek</td>
     <td class='isi_laporan' align='right'>".number_format($row->lain,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->ginas,0,",",".")."</td>	 
	 <td class='isi_laporan' align='right'>".number_format($row->payroll,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->bpjs,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->jmlh,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($ditrm,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
     <td class='header_laporan' align='right'>".number_format($gaji,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($tunjmk1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($tunjab1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($lembur1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($jml1,0,",",".")."</td>
	<td class='header_laporan' align='center' colspan='3'></td>
	 <td class='header_laporan' align='right'>".number_format($tukom1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($rapel1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($kosumba1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($bpjs1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($jmlh1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($ditrm1,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
