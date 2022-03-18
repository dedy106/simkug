<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_distro_rptBa extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_ba)
from ds_ba_m a
inner join ds_po_m d on a.no_po=d.no_po and a.kode_lokasi=d.kode_lokasi
inner join cust b on d.kode_cust=b.kode_cust and d.kode_lokasi=b.kode_lokasi 
$this->filter";
		
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
		$sql="select a.no_ba, a.kode_lokasi, date_format(a.tanggal,'%d/%m/%Y') as tgl, date_format(a.tgl_terima,'%d/%m/%Y') as tgl_terima,a.no_dokumen, a.keterangan, a.no_do, 
		 a.jam, a.jumlah,b.nama as nama_cust
from ds_ba_m a
inner join ds_do_m d on a.no_do=d.no_do and a.kode_lokasi=d.kode_lokasi
inner join cust b on a.kode_cust=b.kode_cust and d.kode_lokasi=b.kode_lokasi 
$this->filter order by a.no_ba";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Berita acara",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No BA</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Customer</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='60'  align='center' class='header_laporan'>Tgl Terima</td>
     <td width='50'  align='center' class='header_laporan'>jam</td>
	 <td width='50'  align='center' class='header_laporan'>Jumlah</td>
	
	  </tr>  ";
		$jumlah=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah=$jumlah+$row->jumlah;
			
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_ba</td>
	  <td class='isi_laporan'>$row->no_bakumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->tgl_terima</td>
	  <td class='isi_laporan'>$row->jam</td>
	   <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	    
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
  
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
