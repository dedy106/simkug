<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_akademik_rptTarifParam extends server_report_basic
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
		$sql="select a.kode_akt,a.kode_tingkat,a.kode_jur,a.kode_param,a.tarif,a.bulan1,a.bulan2,y.nama as jur
		from sis_param_tarif a
		inner join sis_jur y on a.kode_jur=y.kode_jur and a.kode_lokasi=y.kode_lokasi and a.kode_pp=y.kode_pp

		 $this->filter ";

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
	<td width='100' align='center' class='header_laporan'>Tingkat</td>
	<td width='300' align='center' class='header_laporan'>Jurusan</td>
    <td width='100' align='center' class='header_laporan'>Parameter</td>
	<td width='90' align='center' class='header_laporan'>Tarif</td>
	<td width='90' align='center' class='header_laporan'>Bulan 1</td>
    <td width='90' align='center' class='header_laporan'>Bulan 2</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
			<td class='isi_laporan'>$i</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->kode_tingkat</td>
			<td class='isi_laporan'>$row->jur</td>
			<td class='isi_laporan'>$row->kode_param</td>
			<td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bulan1,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bulan2,0,',','.')."</td>
			</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
