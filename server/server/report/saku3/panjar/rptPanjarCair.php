<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_panjar_rptPanjarCair extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];	
		$sql="select a.no_pj, a.no_kas, a.no_dokumen, convert(varchar(20),a.tanggal,103) as tanggal, 
	  convert(varchar(20),a.due_date,103) as due_date, a.keterangan, a.catatan,  
	   a.akun_pj,b.nama as nama_akun, a.nik_pengaju,c.nama as nama_pengaju ,a.nik_setuju,d.nama as nama_setuju, 
	   a.kode_pp,e.nama as nama_pp,a.kode_drk,a.nilai, a.nilai_pot 
from panjar_m a 
inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_pengaju=c.nik 
inner join karyawan d on a.nik_setuju=d.nik 
inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
$this->filter order by a.no_pj";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pencairan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Panjar</td>
    <td width='80' align='center' class='header_laporan'>No Kas</td>
    <td width='100' align='center' class='header_laporan'>No Dokumen</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
	<td width='60' align='center' class='header_laporan'>Due Date</td>
	<td width='200' align='center' class='header_laporan'>Keterangan</td>
	<td width='80' align='center' class='header_laporan'>Akun Panjar</td>
	<td width='150' align='center' class='header_laporan'>Nama Akun</td>
	<td width='80' align='center' class='header_laporan'>Nik Pengaju</td>
	<td width='150' align='center' class='header_laporan'>Nama Pengaju</td>
	<td width='80' align='center' class='header_laporan'>Kode PP</td>
	<td width='150' align='center' class='header_laporan'>Nama PP</td>
	<td width='90' align='center' class='header_laporan'>Nilai</td>
	
  </tr>
 ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_pj</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->no_dokumen</td>
    <td class='isi_laporan'>$row->tanggal</td>
    <td class='isi_laporan'>$row->due_date</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->akun_pj</td>
    <td class='isi_laporan'>$row->nama_akun</td>
	<td class='isi_laporan'>$row->nik_pengaju</td>
	<td class='isi_laporan'>$row->nama_pengaju</td>
	<td class='isi_laporan'>$row->kode_pp</td>
	<td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='13'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
