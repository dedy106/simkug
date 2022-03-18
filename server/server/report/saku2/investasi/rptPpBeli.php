<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptPpBeli extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_beli)
from inv_ppbeli_m a
inner join inv_properti b on a.kode_properti=b.kode_properti
$this->filter ";
		
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
		$sql="select a.no_beli,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.kode_properti,b.nama as nama_properti,
       a.jumlah,a.h_oleh,a.h_buku
from inv_ppbeli_m a
inner join inv_properti b on a.kode_properti=b.kode_properti
$this->filter order by a.no_beli";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembelian properti",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='80'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Properti</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	  <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='50'  align='center' class='header_laporan'>Jumlah</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Perolehan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Buku</td>
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_beli</td>
	 <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->nama_properti</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_oleh,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_buku,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='6'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($h_oleh,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($h_buku,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
