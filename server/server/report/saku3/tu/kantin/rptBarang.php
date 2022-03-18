<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptBarang extends server_report_basic
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
		$sql="select a.kode_barang,a.nama,a.satuan, a.hjual,a.kode_klp,b.nama as nama_klp
from ktu_barang a
inner join ktu_barang_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.kode_barang";
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data tenan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Barang</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
     <td width='150'  align='center' class='header_laporan'>Kelompok</td>
     <td width='60'  align='center' class='header_laporan'>Satuan</td>
	 <td width='90'  align='center' class='header_laporan'>Harga Jual</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_barang</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_klp</td>
	 <td class='isi_laporan'>$row->satuan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->hjual,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
