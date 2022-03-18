<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_fitnes_rptHadir extends server_report_basic
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$nik_user=$tmp[2];
	
		
		$sql="select a.no_kunj,a.kode_lokasi,a.kode_agg,b.nama as nama_agg,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		dbo.fnHari(a.tanggal) as hari,a.jam,a.no_final,(year(a.tanggal)-year(b.tgl_lahir)) as umur,e.nama as nama_jenis,
		b.loker,b.no_tel,a.no_loker,a.handuk,e.nama as nama_jenis
from fi_kunj_m a
inner join fi_anggota b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
inner join fi_peserta_klp d on b.kode_klp=d.kode_klp and b.kode_lokasi=d.kode_lokasi
inner join fi_peserta_jenis e on d.jenis=e.jenis
$this->filter 
order by a.no_kunj";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar hadir peserta",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Tanggal</td>
	<td width='60' align='center' class='header_laporan'>Waktu</td>
	<td width='250' align='center' class='header_laporan'>Nama</td>
	<td width='60' align='center' class='header_laporan'>ID Peserta</td>
	<td width='80' align='center' class='header_laporan'>Jenis</td>
	<td width='80' align='center' class='header_laporan'>No Kunjungan</td>
	<td width='120' align='center' class='header_laporan'>Unit Kerja</td>
    <td width='100' align='center' class='header_laporan'>No Telp</td>
	<td width='60' align='center' class='header_laporan'>No Loker</td>
	<td width='60' align='center' class='header_laporan'>Handuk</td>
    <td width='80' align='center' class='header_laporan'>TTD</td>
   </tr>";
			
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->tgl</td>
    <td class='isi_laporan'  align='center'>$row->jam</td>
	<td class='isi_laporan'>$row->nama_agg</td>
	<td class='isi_laporan'>$row->kode_agg</td>
	<td class='isi_laporan'>$row->nama_jenis</td>
	<td class='isi_laporan'>$row->no_kunj</td>
	<td class='isi_laporan'>$row->loker</td>
	<td class='isi_laporan'>$row->no_tel</td>
	<td class='isi_laporan' align='center' >$row->no_loker</td>
	<td class='isi_laporan'  align='center'>$row->handuk</td>
	<td class='isi_laporan'>&nbsp;</td>";
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	
}
?>
  
