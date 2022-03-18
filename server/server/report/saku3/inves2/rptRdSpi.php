<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptRdSpi extends server_report_basic
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
		$sql="select a.no_spi,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,b.kode_rd,d.nama as nama_saham,b.kode_rdkelola,c.nama as nama_kelola,
	   b.jumlah,b.h_oleh,b.h_buku,b.h_wajar
from inv_rdspi_m a
inner join inv_rdspi_d b on a.no_spi=b.no_spi
inner join inv_rdkelola c on b.kode_rdkelola=c.kode_rdkelola
inner join inv_rd d on b.kode_rd=d.kode_rd and b.kode_rdkelola=d.kode_rdkelola
$this->filter order by a.no_spi";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("spi reksadana",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='50'  align='center' class='header_laporan'>Kode</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Reksadana</td>
	 <td width='150'  align='center' class='header_laporan'>Nama Kelola</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='50'  align='center' class='header_laporan'>Jml Unit</td>
     <td width='90'  align='center' class='header_laporan'>Harga Oleh</td>
     <td width='90'  align='center' class='header_laporan'>Harga Buku</td>
	 <td width='90'  align='center' class='header_laporan'>Harga Wajar</td>
	
	  </tr>  ";
		$jumlah=0;$jumlah=0;$jumlah=0;$jumlah=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_spi</td>
	 <td class='isi_laporan'>$row->kode_rd</td>
	 <td class='isi_laporan'>$row->nama_saham</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_oleh,2,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_buku,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->h_wajar,0,",",".")."</td>
	
	    </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
