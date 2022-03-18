<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_apotek_rptBeliTunaiDaftar extends server_report_basic
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
		$sql="select a.no_beli,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_dokumen,a.keterangan,a.kode_vendor,b.nama as nama_vendor ,
		a.kode_gudang,c.nama as nama_gudang,a.nilai as total,a.nilai_ppn,a.nilai-a.nilai_ppn as nilai,a.no_kas
from apo_brg_beli_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join apo_brg_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_beli";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembelian tunai",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No Bukti</td>
	  <td width='100'  align='center' class='header_laporan'>No Kas</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
	 <td width='40'  align='center' class='header_laporan'>Kode Vendor</td>
     <td width='200'  align='center' class='header_laporan'>Nama Vendor</td>
	 <td width='60'  align='center' class='header_laporan'>Gudang</td>
	 <td width='300'  align='center' class='header_laporan'>Keterangan</td>
     <td width='80'  align='center' class='header_laporan'>Nilai</td>
     <td width='70'  align='center' class='header_laporan'>PPN</td>
     <td width='90'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$total=$total+$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_beli</td>
	 <td class='isi_laporan'>$row->no_kas</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->kode_vendor</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->nama_gudang</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='8'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
