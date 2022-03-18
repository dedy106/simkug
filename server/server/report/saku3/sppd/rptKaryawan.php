<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sppd_rptKaryawan extends server_report_basic
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
		$sql="select a.nik as nik, a.nama as nama, a.jabatan as jabatan, a.no_hp as no_hp, b.nama as pp 
        from karyawan a inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
		
		$this->filter
 			order by a.nik ";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Karyawan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>NIK</td>
    <td width='150' align='center' class='header_laporan'>Nama Karyawan</td>
    <td width='250' align='center' class='header_laporan'>Jabatan</td>
    <td width='250' align='center' class='header_laporan'>PP/Unit</td>
     <td width='250' align='center' class='header_laporan'>No. HP</td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false)){
				
				echo "<tr>
							<td class='isi_laporan' align='center'>$i</td>
							<td class='isi_laporan'>$row->nik</td>
							<td class='isi_laporan'>$row->nama</td>
							<td class='isi_laporan'>$row->jabatan</td>
							<td class='isi_laporan'>$row->pp</td>
							<td class='isi_laporan'>$row->no_hp</td>
					</tr>";	 
				$i=$i+1;
			}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
