<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_logistik_rptPanitia extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1";
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
		
		
		$sql="select a.no_pesan,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.keterangan,a.kode_pp,b.nama as nama_pp,
		a.kode_drk,d.nama as nama_drk,a.kode_akun,c.nama as nama_akun,e.nama as nama_lokasi,a.lok_proses,a.maksud,a.aspek
from log_pesan_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi
inner join lokasi e on a.lok_proses=e.kode_lokasi
$this->filter
order by a.no_pesan";
		
		$rs = $dbLib->execute($sql);		
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("penetapan panitia",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$maksud=urldecode($row->maksud);
			$aspek=urldecode($row->aspek);
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_pesan</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
		
		<tr>
        <td class='header_laporan'>PP </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Akun Anggaran </td>
        <td class='header_laporan'>:&nbsp;$row->kode_akun -&nbsp; $row->nama_akun</td>
      </tr>
	  <tr>
        <td class='header_laporan'>DRK </td>
        <td class='header_laporan'>:&nbsp;$row->kode_drk -&nbsp; $row->nama_drk</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Dokumen   </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Lokasi Proses</td>
        <td class='header_laporan'>:&nbsp;$row->lok_proses -&nbsp; $row->nama_lokasi</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	  <tr>
        <td class='header_laporan' valign='top'>Maksud Tujuan   </td>
        <td class='header_laporan' valign='top'>: $maksud</td>
      </tr>
	  <tr>
        <td class='header_laporan' valign='top'>Aspek Strategis   </td>
        <td class='header_laporan' valign='top'>: $aspek</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>NIK</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='250' align='center' class='header_laporan'>Jabatan</td>
  
	
  </tr>";
			$sql1="select a.nik,b.nama, a.jabatan
from log_panitia a
inner join karyawan b on a.nik=b.nik
where a.no_pesan='$row->no_pesan' 
order by a.nik";

			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$jumlah=0; $nilai=0; 
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$jumlah=$jumlah+$row1->jumlah;
				$nilai=$nilai+$row1->nilai;
				
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->nik</td>
    <td class='isi_laporan'>$row1->nama</td>
	<td class='isi_laporan'>$row1->jabatan</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
