<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sinergi_rptBarang extends server_report_basic
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
		$sql="select a.kode_barang, a.nama, a.sat_jual, a.sat_beli, a.harga_jual, a.harga_beli
from si_barang a
$this->filter order by a.kode_barang";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data barang",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='120'  align='center' class='header_laporan'>Kode</td>
	  <td width='300'  align='center' class='header_laporan'>Nama </td>
	 <td width='80'  align='center' class='header_laporan'>Sat Jual</td>
     <td width='80'  align='center' class='header_laporan'>Sat Beli</td>
     <td width='90'  align='center' class='header_laporan'>Harga Jual</td>
     <td width='90'  align='center' class='header_laporan'>Harga Beli</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_barang</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->sat_jual</td>
	 <td class='isi_laporan'>$row->sat_beli</td>
	 <td class='isi_laporan' align='right'>".number_format($row->harga_jual,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->harga_beli,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
