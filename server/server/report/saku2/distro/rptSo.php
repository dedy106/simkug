<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_distro_rptSo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_so)
from ds_so_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
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
		$sql="select a.no_so, date_format(a.tanggal,'%d/%m/%Y') as tgl, a.kode_cust, a.gudang, a.pic_gudang, a.no_tel, a.catatan, a.item_brg, a.tgl_kirim, a.vol, a.nilai,b.nama as nama_cust
from ds_so_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi

$this->filter order by a.no_so";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("sales orders",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No SO</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='150'  align='center' class='header_laporan'>Gudang</td>
     <td width='150'  align='center' class='header_laporan'>Barang</td>
     <td width='40'  align='center' class='header_laporan'>Volume</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_so</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->catatan</td>
	 <td class='isi_laporan'>$row->gudang</td>
	 <td class='isi_laporan'>$row->item_brg</td>
	 <td class='isi_laporan' align='right'>".number_format($row->vol,0,",",".")."</td>
      <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='7'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($vol,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
   
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
