<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_belajar_rptTagihan extends server_report_basic
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
		/* 
$sql="select a.nim, a.no_tagihan,a.kode_tagihan,a.tanggal,a.jumlah,a.keterangan,b.nama
from tagihan a
inner join siswa b on a.nim=b.nim 
*/
		$sql="select a.no_tagihan,a.kode_tagihan,a.tanggal,a.nim,a.jumlah,a.keterangan,b.jenis_tagihan,c.nama 
			  from tagihan a
			  inner join tipe_tagihan b on a.kode_tagihan = b.kode_tagihan
			  inner join siswa c on a.nim = c.nim
			  $this->filter
			  order by a.no_tagihan ";
		
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Daftar Tagihan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>No Tagihan</td>
    <td width='60' align='center' class='header_laporan'>Kode Tagihan</td>
    <td width='60' align='center' class='header_laporan'>Jenis Tagihan</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='60' align='center' class='header_laporan'>NIM</td>
    <td width='60' align='center' class='header_laporan'>Nama</td>
    <td width='60' align='center' class='header_laporan'>Jumlah Tagihan</td>
    <td width='250' align='center' class='header_laporan'>Keterangan</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_tagihan</td>
			<td class='isi_laporan'>$row->kode_tagihan</td>
			<td class='isi_laporan'>$row->jenis_tagihan</td>
			<td class='isi_laporan'>$row->tanggal</td>
			<td class='isi_laporan'>$row->nim</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->jumlah</td>
			<td class='isi_laporan'>$row->keterangan</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
