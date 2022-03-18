<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sppd_rptJab extends server_report_basic
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
		$sql="select a.kode_jab, a.kode_lokasi,a.nama from sp_jab a
		$this->filter
		order by a.kode_jab";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Jabatan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>Kode</td>
    <td width='300' align='center' class='header_laporan'>Nama </td>
  </tr>";
			$i=1;
			while ($row = $rs->FetchNextObject($toupper=false)){
				
				echo "<tr>
							<td class='isi_laporan' align='center'>$i</td>
							<td class='isi_laporan'>$row->kode_jab</td>
							<td class='isi_laporan'>$row->nama</td>
					</tr>";	 
				$i=$i+1;
			}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
