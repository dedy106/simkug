<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rkm_rptRkmSs extends server_report_basic
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
		$sql="select a.kode_ss,a.nama,a.tahun,a.kode_lokasi,a.kode_ts,b.nama as nama_ts,c.kode_rek,d.nama as nama_rek
from rkm_ss a
inner join rkm_ts b on a.kode_ts=b.kode_ts and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
inner join rkm_ts_rek c on b.kode_ts=c.kode_ts and b.kode_lokasi=c.kode_lokasi and b.tahun=c.tahun and a.kode_rek=c.kode_rek
inner join rkm_rektorat d on a.kode_rek=d.kode_rek and a.kode_lokasi=d.kode_lokasi
		$this->filter 
		order by a.kode_ss";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Rencana Kerja Manajerial",$this->lokasi,"TAHUN ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode Rektorat</td>
	<td width='100' align='center' class='header_laporan'>Rektorat</td>
    <td width='80' align='center' class='header_laporan'>Kode Tujuan Strategis</td>
	<td width='200' align='center' class='header_laporan'>Tujuan Strategis</td>
    <td width='80' align='center' class='header_laporan'>Kode Sasaran Strategis</td>
	<td width='300' align='center' class='header_laporan'>Sasaran Strategis</td>
	
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>$row->kode_rek</td>
    <td class='isi_laporan'>$row->nama_rek</td>
			<td class='isi_laporan'>$row->kode_ts</td>
			<td class='isi_laporan'>$row->nama_ts</td>
			<td class='isi_laporan'>$row->kode_ss</td>
			<td class='isi_laporan'>$row->nama</td>
			
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>		

  

