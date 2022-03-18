<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tu_pajak_rptFormula extends server_report_basic
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
		$sql="select jenis,bawah,atas,persen,kurang_seb,nilai_seb,kode_lokasi, persen2,kurang_seb2,nilai_seb2 from pjk_pph21 $this->filter ";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar formula PPh21",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='60' align='center' class='header_laporan'>Jenis</td>
    <td width='90' align='center' class='header_laporan'>Batas Bawah</td>
	<td width='90' align='center' class='header_laporan'>Batas Atas</td>
	<td width='60' align='center' class='header_laporan'>Persentase</td>
    <td width='90' align='center' class='header_laporan'>Pengurang</td>
	<td width='90' align='center' class='header_laporan'>Nilai PPh Sebelum</td>
	<td width='60' align='center' class='header_laporan'>Persen Non NPWP</td>
    <td width='90' align='center' class='header_laporan'>Pengurang Non NPWP</td>
    <td width='90' align='center' class='header_laporan'>PPh Non NPWP Sebelum</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
			<td class='isi_laporan'>$row->jenis</td>
			<td class='isi_laporan' align='right'>".number_format($row->bawah,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->atas,0,',','.')."</td>
			<td class='isi_laporan' align='right'>$row->persen</td>
			<td class='isi_laporan' align='right'>".number_format($row->kurang_seb,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_seb,0,',','.')."</td>
			<td class='isi_laporan' align='right'>$row->persen2</td>
			<td class='isi_laporan' align='right'>".number_format($row->kurang_seb2,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_seb2,0,',','.')."</td>

			</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
