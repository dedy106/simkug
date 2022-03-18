<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptDocAkru extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.no_akru,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,
	   b.no_depo,b.nilai_depo,b.nilai,b.jml_hari,b.pajak_akru,b.nilai-b.pajak_akru as nilai_akru,
	   date_format(b.tgl_awal,'%d/%m/%Y') as tgl_awal ,date_format(b.tgl_akhir,'%d/%m/%Y') as tgl_akhir
from inv_depoakru_m a
inner join inv_depoakru_d b on a.no_akru=b.no_akru and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.no_akru";
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();	
		$i=$start+1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("akru deposito",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
	 <td width='80'  align='center' class='header_laporan'>No Deposito</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Deposito</td>
    <td width='60'  align='center' class='header_laporan'>Mulai Tgl Akru</td>
	 <td width='60'  align='center' class='header_laporan'>S.d. Tgl Akru</td>
	 <td width='40'  align='center' class='header_laporan'>Jml Hari Akru</td>
	 <td width='90'  align='center' class='header_laporan'>Bunga/ Kupon (Gross)</td>
	  <td width='90'  align='center' class='header_laporan'>Pajak Bunga/ Kupon</td>
	   <td width='90'  align='center' class='header_laporan'>Bunga/ Kupon (Net)</td>
	
	  </tr>  ";
		$nilai=0;$nilai_depo=0;$jml_hari=0;$pajak_akru=0;$nilai_akru=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_depo=$nilai_depo+$row->nilai_depo;
			$jml_hari=$jml_hari+$row->jml_hari;
			$pajak_akru=$pajak_akru+$row->pajak_akru;
			$nilai_akru=$nilai_akru+$row->nilai_akru;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_akru</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->no_depo</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_depo,0,",",".")."</td>
	 <td class='isi_laporan'>$row->tgl_awal</td>
	 <td class='isi_laporan'>$row->tgl_akhir</td>
	  <td class='isi_laporan' align='right'>".number_format($row->jml_hari,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->pajak_akru,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_akru,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='5'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_depo,0,",",".")."</td>
	  <td class='isi_laporan' align='center' colspan='2'>&nbsp;</td>
     <td class='isi_laporan' align='right'>".number_format($jml_hari,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($pajak_akru,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_akru,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
