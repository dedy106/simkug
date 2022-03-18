<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ypt_ginas_rptGajiList extends server_report_basic
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
		$sql="select b.kode_lokasi,b.nik,b.nama as kryn,b.jabatan,b.loker,b.tgl_masuk,c.gadas,c.tunjab,c.lembur,c.tukom,c.rapel,
		(c.gadas+c.tunjab+c.lembur+c.tukom+c.rapel) as jml, 
		c.kosumba,c.hadir,c.kocitel,c.bpjs,c.kkpt,c.giat, (c.kosumba+c.hadir+c.kocitel+c.bpjs+c.kkpt+c.giat) as jmlh
from hr_karyawan b
 inner join hr_gaji_loadtelu c on b.nik=c.nik and b.kode_lokasi=c.kode_lokasi
$this->filter order by b.nik";


		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR PEMBAYARAN GAJI TENAGA CLEANING CERVICE",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>NIK</td>
	 <td width='150' rowspan='2' align='center' class='header_laporan'>NAMA</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>JABATAN</td>
     <td width='100' rowspan='2' align='center' class='header_laporan'>LOKER</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>TANGGAL MASUK</td>
     <td colspan='2'  align='center' class='header_laporan'>PENDAPATAN</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>LEMBUR</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>TUNJANGAN KOMUNIKASI</td>
     <td width='90' rowspan='2' align='center' class='header_laporan'>RAFEL GAJI</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>JUMLAH</td>
      <td colspan='7'  align='center' class='header_laporan'>POTONGAN</td>
	 <td width='90' rowspan='2' align='center' class='header_laporan'>JUMLAH DITERIMA</td>
  </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='90'  align='center' class='header_laporan'>GAJI</td>
	 <td width='80'  align='center' class='header_laporan'>TUNJAB</td>	
     <td width='90'  align='center' class='header_laporan'>S. KOSUMBA</td>
	 <td width='90'  align='center' class='header_laporan'>KEHADIRAN</td>
     <td width='90'  align='center' class='header_laporan'>KOCITEL</td>
	 <td width='90'  align='center' class='header_laporan'>BPJS</td>
     <td width='90'  align='center' class='header_laporan'>KKPT</td>
	 <td width='90'  align='center' class='header_laporan'>GIAT</td>
	 <td width='90'  align='center' class='header_laporan'>JUMLAH</td>
     </tr>  ";
		$ditrm=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$ditrm=$row->jml+$row->jmlh;
			$ditrm1=+$ditrm;
			$gaji=+$row->gadas;
			$tunjab1=+$row->tunjab;
			$lembur1=+$row->lembur;
			$tukom1=+$row->tukom;
			$rapel1=+$row->rapel;
			$jml1=+$row->jml;
			$kosumba1=+$row->kosumba;
			$hadir1=+$row->hadir;
			$kocitel1=+$row->kocitel;
			$bpjs1=+$row->bpjs;
			$kkpt1=+$row->kkpt;
			$giat1=+$row->giat;
			$jmlh1=+$row->jmlh;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->kryn</td>
	 <td class='isi_laporan'>$row->jabatan</td>
	 <td class='isi_laporan'>$row->loker</td>
	 <td class='isi_laporan'>$row->tgl_masuk</td>
	 <td class='isi_laporan' align='right'>".number_format($row->gadas,0,",",".")."</td>	 
	 <td class='isi_laporan' align='right'>".number_format($row->tunjab,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->lembur,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tukom,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->rapel,0,",",".")."</td>	 
	 <td class='isi_laporan' align='right'>".number_format($row->jml,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->kosumba,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->hadir,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->kocitel,0,",",".")."</td>	 
	 <td class='isi_laporan' align='right'>".number_format($row->bpjs,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->kkpt,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->giat,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->jmlh,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($ditrm,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='6'>Total</td>
     <td class='header_laporan' align='right'>".number_format($gaji,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($tunjab1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($lembur1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tukom1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($rapel1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($jml1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($kosumba1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($hadir1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($kocitel,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($bpjs1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($kkpt1,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($giat,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($jmlh1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($ditrm1,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
