<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_gaji_rptGajiSdm extends server_report_basic
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
		$sql="select a.nik,a.nama,a.sts_pajak,b.nama as nama_loker,c.nama as nama_jab,a.kode_level,a.cabang,a.no_rek,a.nama_rek,date_format(a.tgl_masuk,'%d/%m/%Y') as tgl 
from hr_karyawan a
inner join hr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join hr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi $this->filter order by a.kode_loker,a.nik";
		
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
    <td  class='header_laporan' width='200'>NAMA</td>
	 <td  class='header_laporan' width='50'>STATUS PAJAK</td>
    <td class='header_laporan' width='40'>LEVEL</td>
	 <td class='header_laporan' width='60'>TGL MASUK</td>
	<td class='header_laporan' width='150'>POSISI</td>
	<td class='header_laporan' width='150'>LOKASI KERJA</td>
    <td class='header_laporan' width='150'>CABANG</td>
	<td class='header_laporan' width='100'>NO REKENING</td>
	<td class='header_laporan' width='150'>NAMA REKENING</td>
  </tr>
";
	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan' align='center'>$row->sts_pajak</td>
	<td class='isi_laporan' align='center'>$row->kode_level</td>
	<td class='isi_laporan'>$row->tgl</td>
	<td class='isi_laporan'>$row->nama_jab</td>
	<td class='isi_laporan'>$row->nama_loker</td>
	<td class='isi_laporan'>$row->cabang</td>
	<td class='isi_laporan'>$row->no_rek</td>
	<td class='isi_laporan'>$row->nama_rek</td>
  </tr>";

			$i=$i+1;
		}
		
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
