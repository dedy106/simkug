<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_produk_rptProyekCons extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$periode=$tmp[0];
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select a.kode_cons,a.nama,a.kode_lokasi,a.alamat,a.kode_cust,b.nama as nama_cust
from consumer a
inner join cust b on a.kode_cust=b.kode_cust
$this->filter
order by a.kode_cons ";

		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data consumer",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='80' align='center' class='header_laporan'>Kode Consumer</td>
		<td width='300' align='center' class='header_laporan'>Nama Consumer</td>
		<td width='80' align='center' class='header_laporan'>Kode Cust</td>
		<td width='300' align='center' class='header_laporan'>Nama Cust</td>
   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_cons</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_cust</td>
			<td class='isi_laporan'>$row->nama_cust</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
