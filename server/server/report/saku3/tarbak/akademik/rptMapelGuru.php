<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptMapelGuru extends server_report_basic
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
		$sql="select a.nik, b.nama, a.kode_matpel, c.nama as mapel, a.kode_status, d.nama as stat 
		from sis_guru_matpel a
		inner join karyawan b on a.nik=b.nik and b.kode_lokasi=a.kode_lokasi
		inner join sis_matpel c on a.kode_matpel=c.kode_matpel and c.kode_lokasi=a.kode_lokasi and a.kode_pp=c.kode_pp 
		inner join sis_guru_status d on a.kode_status=d.kode_status and d.kode_lokasi=a.kode_lokasi and a.kode_pp=d.kode_pp 
		$this->filter
 		order by nik ";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar guru",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>NIK</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
     <td width='200' align='center' class='header_laporan'>Mata Pelajaran</td>
    <td width='150' align='center' class='header_laporan'>Status</td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
<td class='isi_laporan' align='center'>$i</td>
<td class='isi_laporan'>$row->nik</td>
		<td class='isi_laporan'>$row->nama</td>
<td class='isi_laporan'>$row->mapel</td>
		<td class='isi_laporan'>$row->stat</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
