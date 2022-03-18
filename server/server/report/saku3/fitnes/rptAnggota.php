<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_fitnes_rptAnggota extends server_report_basic
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
		$sql="select a.kode_agg,a.nikkes,a.kode_lokasi,a.nama,a.alamat,a.no_tel,a.email,a.kode_klp,a.tgl_lahir,a.r_sakit,
       b.nama as nama_klp
from fi_anggota a
inner join fi_peserta_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_agg ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar anggota",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>NIK</td>
	<td width='80' align='center' class='header_laporan'>NIKES</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
	<td width='150' align='center' class='header_laporan'>Kelompok</td>
    <td width='150' align='center' class='header_laporan'>Alamat</td>
	<td width='100' align='center' class='header_laporan'>No Telp</td>
	<td width='100' align='center' class='header_laporan'>Email</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_agg</td>
    <td class='isi_laporan'>$row->nikkes</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->nama_klp</td>
	  <td class='isi_laporan'>$row->alamat</td>
	   <td class='isi_laporan'>$row->no_tel</td>
	    <td class='isi_laporan'>$row->email</td>
	   
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
