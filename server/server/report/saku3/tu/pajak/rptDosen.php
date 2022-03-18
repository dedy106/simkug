<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tu_pajak_rptDosen extends server_report_basic
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
		$sql="select kode_dosen,kode_lokasi,nama,no_ktp,npwp,bank,cabang,no_rek,nama_rek from it_dosen $this->filter ";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar dosen",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
  <td width='60' align='center' class='header_laporan'>Kode Dosen</td>
  <td width='150' align='center' class='header_laporan'>Nama</td>
  <td width='100' align='center' class='header_laporan'>No KTP</td>
  <td width='90' align='center' class='header_laporan'>NPWP</td>
  <td width='100' align='center' class='header_laporan'>Bank</td>
  <td width='100' align='center' class='header_laporan'>No Rekening</td>
  <td width='150' align='center' class='header_laporan'>Nama Rekening</td>
</tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
			<td class='isi_laporan'>$row->kode_dosen</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->no_ktp</td>
			<td class='isi_laporan'>$row->npwp</td>
			<td class='isi_laporan'>$row->bank</td>
			<td class='isi_laporan'>$row->no_rek</td>
			<td class='isi_laporan'>$row->nama_rek</td>

			</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
