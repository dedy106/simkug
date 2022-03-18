<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_rkm_rptRkmIndi extends server_report_basic
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
		$sql="select a.kode_ip,a.nama,a.tahun,a.kode_lokasi,a.kode_pu,a.kode_pp,b.nama as nama_program,c.nama as nama_pp,
		d.kode_ss,d.nama as nama_ss,d.kode_ts,e.nama as nama_ts
from rkm_ip a
inner join rkm_pu b on a.kode_pu=b.kode_pu and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun 
inner join rkm_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join rkm_ss d on b.kode_ss=d.kode_ss and b.kode_lokasi=d.kode_lokasi and b.tahun=d.tahun 
inner join rkm_ts e on d.kode_ts=e.kode_ts and d.kode_lokasi=e.kode_lokasi and d.tahun=e.tahun 
$this->filter
order by a.kode_pp,d.kode_ts,d.kode_ss,a.kode_ip ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan indikator",$this->lokasi,"TAHUN ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Kode PP</td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
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
    <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
			<td class='isi_laporan'>$row->kode_ts</td>
			<td class='isi_laporan'>$row->nama_ts</td>
			<td class='isi_laporan'>$row->kode_ss</td>
			<td class='isi_laporan'>$row->nama_ss</td>
			<td class='isi_laporan'>$row->kode_ip</td>
			<td class='isi_laporan'>$row->nama</td>
			
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>		

  

