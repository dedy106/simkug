<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_sc_rptBast extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_bast)
from sc_bast_m a
inner join sc_vendor b on a.kode_vendor=b.kode_vendor   ";
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$tahun=$tmp[2];
		$bidang=$tmp[3];
		
		$sql="select a.no_bast,a.tanggal, a.keterangan,a.kode_vendor,b.nama as nama_vendor, a.no_po
from sc_bast_m a
inner join sc_vendor b on a.kode_vendor=b.kode_vendor ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("bast",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_bast</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Vendor </td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor -&nbsp; $row->nama_vendor</td>
      </tr>
	  <tr>
        <td class='header_laporan'>No Order  </td>
        <td class='header_laporan'>:&nbsp;$row->no_po</td>
      </tr>
      <tr>
        <td class='header_laporan'>Keterangan  </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	  
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>Kode Barang</td>
    <td width='150' align='center' class='header_laporan'>Nama Barang</td>
    <td width='150' align='center' class='header_laporan'>Spesifikasi</td>
	<td width='100' align='center' class='header_laporan'>Satuan</td>
	<td width='60' align='center' class='header_laporan'>Due Date</td>
	<td width='50' align='center' class='header_laporan'>Jam</td>
	<td width='80' align='center' class='header_laporan'>Harga</td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
	
  </tr>";
			$sql1="select a.kode_brg, b.nama as nama_barang,b.tipe,b.satuan,a.harga, a.jumlah, date_format(a.due_date,'%d/%m/%Y') as due_date, a.jam
from sc_pesan_d a
inner join sc_barang b on a.kode_brg=b.kode_brg
where a.no_po='$row->no_po' ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $harga=0; $total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$harga=$tarif+$row1->harga;
				$total=$total+($row1->jumlah*$row1->harga);
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->kode_barang</td>
    <td class='isi_laporan'>$row1->nama_barang</td>
	<td class='isi_laporan'>$row1->tipe</td>
	<td class='isi_laporan'>$row1->satuan</td>
    <td  class='isi_laporan'>$row1->due_date</td>
    <td  class='isi_laporan'>$row1->jam</td>
	<td align='center' class='isi_laporan'>".number_format($row1->harga,0,",",".")."</td>
    <td align='center' class='isi_laporan'>".number_format($row1->jumlah,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->jumlah*$row1->harga,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='6' align='center'  class='header_laporan'>Total</td>
	<td align='center' class='header_laporan'>".number_format($harga,0,",",".")."</td>
    <td align='center' class='header_laporan'>".number_format($jumlah,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr></table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
1