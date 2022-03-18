<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_apotek_rptJual extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_jual)
from apo_brg_jual_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi  $this->filter ";
		error_log($sql);
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
		
		
		$sql="select a.no_jual,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.kode_cust,b.nama as nama_cust ,a.kode_gudang,c.nama as nama_gudang,
		isnull(d.ppn,0) as ppn,isnull(e.dok,0) as dok
from apo_brg_jual_m a
inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
inner join apo_brg_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi
left join (select no_jual,kode_lokasi,sum(nilai) as ppn
		   from apo_brg_jual_j
		   where jenis='PPN'
		   group by no_jual,kode_lokasi
		   )d on a.no_jual=d.no_jual and a.kode_lokasi=d.kode_lokasi
left join (select no_jual,kode_lokasi,sum(nilai) as dok
		   from apo_brg_jual_j
		   where jenis='PDPTDOK'
		   group by no_jual,kode_lokasi
		   )e on a.no_jual=e.no_jual and a.kode_lokasi=e.kode_lokasi  $this->filter
order by a.no_jual";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penjualan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_jual</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	    <tr>
        <td class='header_laporan'>cust </td>
        <td class='header_laporan'>:&nbsp;$row->kode_cust -&nbsp; $row->nama_cust</td>
      </tr>
     
	   <tr>
        <td class='header_laporan'>Gudang  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_gudang -&nbsp; $row->nama_gudang</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='50' align='center' class='header_laporan'>Kode Barang</td>
    <td width='150' align='center' class='header_laporan'>Nama Barang</td>
    <td width='100' align='center' class='header_laporan'>Merk</td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
	 <td width='80' align='center' class='header_laporan'>Satuan</td>
    <td width='90' align='center' class='header_laporan'>Harga</td>
    <td width='90' align='center' class='header_laporan'>Diskon</td>
	<td width='50' align='center' class='header_laporan'>Jumlah</td>
	<td width='50' align='center' class='header_laporan'>Bonus</td>
	<td width='90' align='center' class='header_laporan'>Sub Total</td>
  </tr>";
			$sql1="select a.kode_brg,b.nama as nama_brg,b.merk,b.tipe,a.satuan,a.jumlah,a.bonus,a.harga,a.diskon,(a.harga-a.diskon)*a.jumlah as total
from apo_brg_jual_d a
inner join apo_brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_jual='$row->no_jual' 
order by a.kode_brg ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$harga=0; $diskon=0; $jumlah=0; $bonus=0; $total=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$harga=$harga+$row1->harga;
				$diskon=$diskon+$row1->diskon;
				$jumlah=$jumlah+$row1->jumlah;
				$bonus=$bonus+$row1->bonus;
				$total=$total+$row1->total;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_brg</td>
    <td class='isi_laporan'>$row1->nama_brg</td>
	<td class='isi_laporan'>$row1->merk</td>
	<td class='isi_laporan'>$row1->tipe</td>
	<td class='isi_laporan'>$row1->satuan</td>
    <td align='right' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->diskon,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->bonus,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='6' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($harga,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($diskon,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($bonus,0,",",".")."</td>
   <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr>";
			echo "<tr>
    <td colspan='10' align='right'  class='header_laporan'>PPN</td>
   <td align='right' class='header_laporan'>".number_format($row->ppn,0,",",".")."</td>
  </tr>";
			echo "<tr>
    <td colspan='10' align='right'  class='header_laporan'>Jasa Dokter</td>
	  <td align='right' class='header_laporan'>".number_format($row->dok,0,",",".")."</td>
  </tr>";
			echo "<tr>
    <td colspan='10' align='right'  class='header_laporan'>Total</td>
	  <td align='right' class='header_laporan'>".number_format($total+$row->dok+$row->ppn,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
