<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_sppd_rptJenisPD extends server_report_basic
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
		$sql="select kode_jenis, nama, kode_lokasi from sp_jenis
		
		$this->filter
 			order by kode_jenis ";
			

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Jenis Parameter Biaya Transportasi",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='150' align='center' class='header_laporan'>Kode Jenis</td>
    <td width='150' align='center' class='header_laporan'>Nama</td></td>
  </tr>";
			while ($row = $rs->FetchNextObject($toupper=false)){
				
				echo "<tr>
							<td class='isi_laporan' align='center'>$i</td>
							<td class='isi_laporan'>$row->kode_jenis</td>
							<td class='isi_laporan'>$row->nama</td>
					</tr>";	 
				$i=$i+1;
			}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
