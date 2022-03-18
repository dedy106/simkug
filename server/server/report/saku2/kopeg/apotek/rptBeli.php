<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_apotek_rptBeli extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_beli)
from apo_brg_beli_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi  $this->filter ";
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
		
		
		$sql="select a.no_beli,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.kode_vendor,b.nama as nama_vendor ,a.kode_gudang,c.nama as nama_gudang, a.nilai_diskon,a.nilai_ppn,a.nilai_mat
from apo_brg_beli_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join apo_brg_gudang c on a.kode_gudang=c.kode_gudang and a.kode_lokasi=c.kode_lokasi  $this->filter
order by a.no_beli";

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembelian",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_beli</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	    <tr>
        <td class='header_laporan'>vendor </td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor -&nbsp; $row->nama_vendor</td>
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
from apo_brg_beli_d a
inner join apo_brg_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_beli='$row->no_beli' 
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
    <td align='right' class='isi_laporan'>".number_format($row1->harga,2,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->diskon,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->bonus,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			$diskon2=$row->nilai_diskon;
			$tsdisc=$total-$diskon2;
			$ppn=$row->nilai_ppn;
			$lain=$row->nilai_mat;
			$total2=$tsdisc+$ppn+$lain;
echo "<tr>
		<td colspan='7' align='right'  class='header_laporan'>Subtotal</td>
		<td align='right' class='header_laporan'>".number_format($diskon,0,",",".")."</td>
		<td align='right' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
		<td align='right' class='header_laporan'>".number_format($bonus,0,",",".")."</td>
		<td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
	</tr>
	<tr>
		<td colspan='10' align='right'  class='header_laporan'>Diskon</td>
		<td align='right' class='header_laporan'>".number_format($diskon2,0,",",".")."</td>
	</tr>
	<tr>
		<td colspan='10' align='right'  class='header_laporan'>Total Setelah Diskon</td>
		<td align='right' class='header_laporan'>".number_format($tsdisc,0,",",".")."</td>
	</tr>
	<tr>
		<td colspan='10' align='right' class='header_laporan'>PPN</td>
		<td align='right' class='header_laporan'>".number_format($ppn,0,",",".")."</td>
	</tr>
	<tr>
		<td colspan='10' align='right'  class='header_laporan'>Lain Lain</td>
		<td align='right' class='header_laporan'>".number_format($lain,0,",",".")."</td>
	</tr>
	<tr>
		<td colspan='10' align='right'  class='header_laporan'>Total</td>
		<td align='right' class='header_laporan'>".number_format($total2,0,",",".")."</td>
	</tr><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
