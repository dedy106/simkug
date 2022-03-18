<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_belajar_rptGajiKaryawan extends server_report_basic
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
		$sql="select a.no_gj,a.kode_jns,a.tgl,a.nip,a.jmlh,a.ket,b.nama_jns
from gajid a
inner join jenisgajid b on a.kode_jns = b.kode_jns
 $this->filter
			order by a.no_gj ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar gaji",$tjihis->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>NO Gaji</td>
    <td width='60' align='center' class='header_laporan'>Kode Jenis Gaji</td>
    <td width='250' align='center' class='header_laporan'>Nama Jenis Gaji</td>	
    <td width='100' align='center' class='header_laporan'>Tanggal</td>
    <td width='60' align='center' class='header_laporan'>NIP</td>
	<td width='100' align='center' class='header_laporan'>Jumlah</td>
    <td width='250' align='center' class='header_laporan'>Keterangan</td>

   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_gj</td>
			<td class='isi_laporan'>$row->kode_jns</td>
			<td class='isi_laporan'>$row->nama_jns</td>			
			<td class='isi_laporan'>$row->tgl</td>
			<td class='isi_laporan'>$row->nip</td>
			<td class='isi_laporan'>$row->jmlh</td>
			<td class='isi_laporan'>$row->ket</td>
			
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
