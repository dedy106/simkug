<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_fitnes_rptAktivasiKupon extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$tmp=explode("/",$this->filter);
		$periode=$tmp[0];
		$sql="select a.no_reg,a.kode_lokasi,a.kode_agg,b.nama,b.nikkes,a.kode_mcu,a.tarif,a.jumlah,a.nilai,a.no_kas,
		date_format(a.tgl_awal,'%d/%m/%Y') as tgl,d.nama as nama_klp,c.no_kupon,
		date_format(c.tgl_awal,'%d/%m/%Y') as tgl_awal2,date_format(c.tgl_akhir,'%d/%m/%Y') as tgl_akhir2
from fi_reg a 
inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
inner join fi_kupon_d c on a.no_reg=c.no_flag and a.kode_lokasi=c.kode_lokasi
inner join fi_peserta_klp d on b.kode_klp=d.kode_klp and b.kode_lokasi=d.kode_lokasi
$this->filter
order by a.no_reg ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("aktivasi VOUCHER",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Bukti</td>
	<td width='60' align='center' class='header_laporan'>Tgl Aktifasi</td>
	<td width='60' align='center' class='header_laporan'>ID Peserta</td>
    <td width='100' align='center' class='header_laporan'>Nikes</td>
	<td width='200' align='center' class='header_laporan'>Nama</td>
	<td width='100' align='center' class='header_laporan'>Status</td>
	<td width='60' align='center' class='header_laporan'>MCU</td>
    
	<td width='80' align='center' class='header_laporan'>No Voucher</td>
	<td width='60' align='center' class='header_laporan'>Tgl Awal Voucher</td>
	<td width='60' align='center' class='header_laporan'>Tgl Akhir Voucher</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
   </tr>";
			$nilai=0;
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_reg</td>
	<td class='isi_laporan'>$row->tgl</td>
    <td class='isi_laporan'>$row->kode_agg</td>
	<td class='isi_laporan'>$row->nikkes</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->nama_klp</td>
	<td class='isi_laporan'>$row->kode_mcu</td>
	
	<td class='isi_laporan'>$row->no_kupon</td>
	<td class='isi_laporan'>$row->tgl_awal2</td>
	<td class='isi_laporan'>$row->tgl_akhir2</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
	   
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='11'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
	   
    </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
