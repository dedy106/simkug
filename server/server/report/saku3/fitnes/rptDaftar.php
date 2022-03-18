<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_fitnes_rptDaftar extends server_report_basic
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
		$sql="select a.no_reg,a.kode_lokasi,a.no_kas,a.kode_agg,a.kode_mcu,b.nama,a.tarif,a.nilai,a.jumlah,b.nama,b.nikkes,d.nama as nama_klp,a.kode_mcu,
		date_format(c.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_awal,'%d/%m/%Y') as tgl_awal,date_format(a.tgl_akhir,'%d/%m/%Y') as tgl_akhir,
		e.nama as nama_jenis,a.nik_user
from fi_reg a 
inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
inner join fi_peserta_klp d on b.kode_klp=d.kode_klp and b.kode_lokasi=d.kode_lokasi
inner join fi_peserta_jenis e on d.jenis=e.jenis
$this->filter
order by a.no_reg ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pendaftaran paket",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Bukti</td>
	<td width='60' align='center' class='header_laporan'>Tgl Aktifasi</td>
	<td width='60' align='center' class='header_laporan'>Tgl Berakhir</td>
    <td width='80' align='center' class='header_laporan'>No Flag</td>
	<td width='80' align='center' class='header_laporan'>Id Peserta</td>
	<td width='80' align='center' class='header_laporan'>Nikes</td>
	<td width='200' align='center' class='header_laporan'>Nama</td>
	<td width='100' align='center' class='header_laporan'>Jenis</td>
	<td width='120' align='center' class='header_laporan'>Status</td>
	<td width='40' align='center' class='header_laporan'>MCU</td>
	<td width='60' align='center' class='header_laporan'>Nik User</td>
	<td width='80' align='center' class='header_laporan'>Tarif / Bulan</td>
	<td width='60' align='center' class='header_laporan'>Jml Bulan</td>
	<td width='90' align='center' class='header_laporan'>Total</td>
   </tr>";
			$nilai=0; $jumlah=0;
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$jumlah+=$row->jumlah;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_reg</td>
    <td class='isi_laporan'>$row->tgl_awal</td>
	<td class='isi_laporan'>$row->tgl_akhir</td>
	<td class='isi_laporan'>$row->no_kas</td>
	<td class='isi_laporan'>$row->kode_agg</td>
	<td class='isi_laporan'>$row->nikkes</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->nama_jenis</td>
	<td class='isi_laporan'>$row->nama_klp</td>
	<td class='isi_laporan' align='center'>$row->kode_mcu</td>
	<td class='isi_laporan'>$row->nik_user</td>
	<td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->jumlah,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='14'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
    </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
