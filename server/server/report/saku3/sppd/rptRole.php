<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sppd_rptRole extends server_report_basic
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
		$sql="select b.nama as nama_karyawan,a.nik, a.nik_app, a.nik_app2 
		from sp_role a
		inner join karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi 

		$this->filter
 			order by a.nik ";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Role Approval",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>Nik</td>
    <td width='250' align='center' class='header_laporan'>Nama</td>
     <td width='250' align='center' class='header_laporan'>Approval 1</td>
    <td width='250' align='center' class='header_laporan'>Approval 2</td>
	
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
<td class='isi_laporan' align='center'>$i</td>
<td class='isi_laporan'>$row->nik</td>
		<td class='isi_laporan'>$row->nama_karyawan</td>
<td class='isi_laporan'>$row->nik_app</td>
		<td class='isi_laporan'>$row->nik_app2</td>
		
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
