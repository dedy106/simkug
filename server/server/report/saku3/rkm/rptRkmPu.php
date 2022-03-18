<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rkm_rptRkmPu extends server_report_basic
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
		$sql="select a.kode_pu,a.nama as nama_pu,a.tahun,a.kode_ss,a.kode_bidang,b.nama as nama_bidang,c.nama as nama_ss,
	   c.kode_ts,d.nama as nama_ts
from rkm_pu a
inner join rkm_bidang b on a.kode_bidang=b.kode_bidang and a.kode_lokasi=b.kode_lokasi
inner join rkm_ss c on a.kode_ss=c.kode_ss and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun 
inner join rkm_ts d on c.kode_ts=d.kode_ts and c.kode_lokasi=d.kode_lokasi and a.tahun=c.tahun 	
$this->filter
order by a.kode_bidang,c.kode_ts,a.kode_ss,a.kode_pu		";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Action Plan (DRK) Pengembangan",$this->lokasi,"TAHUN ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode Bidang</td>
	<td width='150' align='center' class='header_laporan'>Nama Bidang</td>
    <td width='80' align='center' class='header_laporan'>Kode Program</td>
	<td width='200' align='center' class='header_laporan'>Nama Program Utama</td>
	<td width='80' align='center' class='header_laporan'>Kode RKM</td>
	<td width='250' align='center' class='header_laporan'>Nama Rencana Kerja Manajemen (RKM)</td>
	<td width='100' align='center' class='header_laporan'>Kode DRK</td>
	<td width='300' align='center' class='header_laporan'>Nama Action Plan (DRK)</td>
	
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_bidang</td>
	 <td class='isi_laporan'>$row->nama_bidang</td>
	 <td class='isi_laporan'>$row->kode_ts</td>
			<td class='isi_laporan'>$row->nama_ts</td>
			<td class='isi_laporan'>$row->kode_ss</td>
			<td class='isi_laporan'>$row->nama_ss</td>
			<td class='isi_laporan'>$row->kode_pu</td>
			<td class='isi_laporan'>$row->nama_pu</td>
			
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>		

  

