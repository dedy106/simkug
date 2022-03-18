<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_dikti_rptTarifParam extends server_report_basic
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
		$sql="select a.kode_akt,a.kode_jur,a.kode_param,a.tarif,y.nama as jur,a.kode_ta
		from dikti_param_tarif a
		inner join dikti_jur y on a.kode_jur=y.kode_jur and a.kode_lokasi=y.kode_lokasi 
         $this->filter ";
         
        //  echo $sql;

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar parameter tarif",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='100' align='center' class='header_laporan'>Angkatan</td>
	<td width='100' align='center' class='header_laporan'>Tahun Ajaran</td>
	<td width='300' align='center' class='header_laporan'>Jurusan</td>
    <td width='100' align='center' class='header_laporan'>Parameter</td>
	<td width='90' align='center' class='header_laporan'>Tarif</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->kode_ta</td>
			<td class='isi_laporan'>$row->jur</td>
			<td class='isi_laporan'>$row->kode_param</td>
			<td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
			</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
