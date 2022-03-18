<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_distro_rptPo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_po)
from ds_po_m a
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
		$sql="select a.no_po, a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_dokumen, a.keterangan,a.kode_vendor,a.kode_pengirim,a.kode_cust, 
	   a.item_brg, a.depo, a.tgl_ambil, a.up, a.fax, a.vol,
	   b.nama as nama_vendor,c.nama as nama_kirim,d.nama as nama_cust,isnull(e.jumlah,0) as jumlah,  a.vol-isnull(e.jumlah,0) as sisa
from ds_po_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join vendor c on a.kode_pengirim=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
inner join cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi
left join (select no_po,sum(stok) as jumlah
		   from ds_do_m
		   group by no_po
		   )e on a.no_po=e.no_po
$this->filter order by a.no_po";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("purchase orders",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No PO</td>
	 <td width='100'  align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60'  align='center' class='header_laporan'>Tanggal</td>
     <td width='150'  align='center' class='header_laporan'>Customer</td>
	 <td width='150'  align='center' class='header_laporan'>Vendor</td>
	 <td width='150'  align='center' class='header_laporan'>Forwader</td>
	 <td width='150'  align='center' class='header_laporan'>Keterangan</td>
     <td width='100'  align='center' class='header_laporan'>Depo</td>
     <td width='100'  align='center' class='header_laporan'>Barang</td>
     <td width='40'  align='center' class='header_laporan'>Volume</td>
	 <td width='40'  align='center' class='header_laporan'>Terkirim</td>
	 <td width='40'  align='center' class='header_laporan'>Sisa</td>
	  </tr>  ";
		$vol=0;$jumlah=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$vol=$vol+$row->vol;
			$jumlah=$jumlah+$row->jumlah;
			$sisa=$sisa+$row->sisa;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_po','$row->kode_lokasi');\">$row->no_po</a>";
				echo "</td>
	  <td class='isi_laporan'>$row->no_dokumen</td>
	 <td class='isi_laporan'>$row->tgl</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->nama_kirim</td>
	 <td class='isi_laporan'>$row->keterangan</td>
	 <td class='isi_laporan'>$row->item_brg</td>
	  <td class='isi_laporan'>$row->depo</td>
	 <td class='isi_laporan' align='right'>".number_format($row->vol,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->sisa,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='10'>Total</td>
	   <td class='isi_laporan' align='right'>".number_format($vol,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
  
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
