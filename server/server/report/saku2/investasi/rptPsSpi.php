<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_investasi_rptPsSpi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_spi)
from inv_psspi_m a
inner join inv_psspi_d b on a.no_spi=b.no_spi
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
		$sql="select a.no_spi,date_format(a.tanggal,'%d/%m/%Y') as tanggal,c.nama as nama_mitra,a.keterangan,
	   b.n_oleh,b.n_buku,b.n_wajar,b.persen,b.dc
from inv_psspi_m a
inner join inv_psspi_d b on a.no_spi=b.no_spi
inner join inv_mitra c on b.kode_mitra=c.kode_mitra
$this->filter order by a.no_spi";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("spi penyertaan saham",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='100'  align='center' class='header_laporan'>Mitra</td>
	   <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='40'  align='center' class='header_laporan'>Persen</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Perolehan</td>
     <td width='90'  align='center' class='header_laporan'>Nilai Buku</td>
	<td width='90'  align='center' class='header_laporan'>Nilai Wajar</td>
	
	  </tr>  ";
		$jumlah=0;$jumlah=0;$jumlah=0;$jumlah=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_spi</td>
	 <td class='isi_laporan'>$row->nama_mitra</td>
	  <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->persen,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_oleh,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_buku,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_wajar,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
