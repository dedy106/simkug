<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_gaji_rptGajiSdmPol extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$sql="select a.nik,a.nama,a.sts_pajak,a.cabang,a.no_rek,a.nama_rek,a.sts_pajak,a.cabang,a.no_rek,a.nama_rek,a.email,a.bank,a.npwp,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl_masuk,a.skode, a.kode_grade,
	   b.nama as nama_loker,c.nama as nama_fungsi,d.nama as nama_struk,e.nama as nama_profesi,f.nama as nama_prodi,
	   g.nama as nama_sts_sdm,h.nama as nama_dir,i.nama as nama_grade
from hr_karyawan a
inner join hr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join hr_fungsi c on a.kode_fungsi=c.kode_fungsi and a.kode_lokasi=c.kode_lokasi
inner join hr_struk d on a.kode_struk=d.kode_struk and a.kode_lokasi=d.kode_lokasi
inner join hr_profesi e on a.kode_profesi=e.kode_profesi and a.kode_lokasi=e.kode_lokasi
inner join hr_prodi f on a.kode_prodi=f.kode_prodi and a.kode_lokasi=f.kode_lokasi
inner join hr_status_sdm g on a.sts_sdm=g.sts_sdm and a.kode_lokasi=g.kode_lokasi
inner join hr_dir h on a.kode_dir=h.kode_dir and a.kode_lokasi=h.kode_lokasi
inner join hr_struk i on a.kode_struk=i.kode_struk and a.kode_lokasi=i.kode_lokasi $this->filter order by a.kode_loker,a.nik";
	
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR KARYAWAN",$this->lokasi,"");
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td  class='header_laporan' width='20'>NO</td>
    <td  class='header_laporan' width='60'>NIK</td>
	<td  class='header_laporan' width='40'>KODE</td>
    <td  class='header_laporan' width='150'>NAMA</td>
	<td  class='header_laporan' width='50'>STATUS PAJAK</td>
    <td class='header_laporan' width='150'>UNIT</td>
	 <td class='header_laporan' width='150'>DIREKTORAT</td>
	<td class='header_laporan' width='150'>GRADE</td>
	<td class='header_laporan' width='150'>STATUS PEGAWAI</td>
    <td class='header_laporan' width='150'>PROFESI</td>
	<td class='header_laporan' width='100'>PRODI</td>
	<td class='header_laporan' width='150'>JAB FUNGSIONAL</td>
	<td class='header_laporan' width='150'>TGL MASUK</td>
	<td class='header_laporan' width='150'>NOMOR REKENING</td>
	<td class='header_laporan' width='150'>BANK</td>
	<td class='header_laporan' width='150'>CABANG</td>
	<td class='header_laporan' width='150'>NAMA REKENING</td>
	<td class='header_laporan' width='150'>EMAIL</td>
	<td class='header_laporan' width='150'>NPWP</td>
	</tr>
";
	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->skode</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='center'>$row->sts_pajak</td>
	<td class='isi_laporan' align='center'>$row->nama_loker</td>
	<td class='isi_laporan'>$row->nama_dir</td>
	<td class='isi_laporan'>$row->nama_grade</td>
	<td class='isi_laporan'>$row->nama_sts_sdm</td>
	<td class='isi_laporan'>$row->nama_profesi</td>
	<td class='isi_laporan'>$row->nama_prodi</td>
	<td class='isi_laporan'>$row->nama_fungsi</td>
	<td class='isi_laporan'>$row->tgl_masuk</td>
	<td class='isi_laporan'>$row->no_rek</td>
	<td class='isi_laporan'>$row->bank</td>
	<td class='isi_laporan'>$row->cabang</td>
	<td class='isi_laporan'>$row->nama_rek</td>
	<td class='isi_laporan'>$row->email</td>
	<td class='isi_laporan'>$row->npwp</td>
  </tr>";

			$i=$i+1;
		}
		
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
