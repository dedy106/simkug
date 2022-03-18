<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_frigia_rptGajiSdm extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.nik,a.nama,a.sts_pajak,a.npwp from karyawan a ";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR KOMISARIS, DIREKSI & KARYAWAN",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td  class='header_laporan' width='20'>NO</td>
    <td  class='header_laporan' width='60'>NIP</td>
    <td  class='header_laporan' width='200'>NAMA</td>
	 <td  class='header_laporan' width='80'>STATUS PAJAK</td>
    <td class='header_laporan' width='150'>NPWP</td>
   
  </tr>
";
	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->sts_pajak</td>
	<td class='isi_laporan'>$row->npwp</td>
  </tr>";

			$i=$i+1;
		}
		
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
