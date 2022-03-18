<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptKelas extends server_report_basic
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
		$sql="select distinct a.kode_kelas, a.nama, a.kode_jur, b.nama as jur, a.kode_tingkat, c.nama as ting ,a.kode_pp
		from sis_kelas a
		inner join sis_jur b on a.kode_jur=b.kode_jur and b.kode_lokasi=a.kode_lokasi and a.kode_pp=b.kode_pp
		inner join sis_tingkat c on a.kode_tingkat=c.kode_tingkat and c.kode_lokasi=a.kode_lokasi
		
		$this->filter
 			order by a.kode_kelas ";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar kelas",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>Kode Kelas</td>
    <td width='250' align='center' class='header_laporan'>Nama Kelas</td>
     <td width='250' align='center' class='header_laporan'>Tingkat</td>
    <td width='250' align='center' class='header_laporan'>Jurusan</td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
<td class='isi_laporan' align='center'>$i</td>
<td class='isi_laporan'>$row->kode_kelas</td>
		<td class='isi_laporan'>$row->nama</td>
<td class='isi_laporan'>$row->ting</td>
		<td class='isi_laporan'>$row->jur</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
