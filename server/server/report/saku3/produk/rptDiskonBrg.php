<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_produk_rptDiskonBrg extends server_report_basic
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
		
		$sql="select a.kode_barang,b.nama,a.kode_lokasi,a.tgl_mulai,a.tgl_selesai,a.p_disk 
from brg_diskonjual_d a
inner join brg_barang b on a.kode_barang=b.kode_barang and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_barang ";

		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data diskon jual barang",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Kode Barang</td>
    <td width='300' align='center' class='header_laporan'>Nama Barang</td>
	 <td width='80' align='center' class='header_laporan'>Tanggal Mulai</td>
	 <td width='80' align='center' class='header_laporan'>Tanggal Selesai</td>
    <td width='80' align='center' class='header_laporan'>Diskon</td>
   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_barang</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->tgl_mulai</td>
			<td class='isi_laporan'>$row->tgl_selesai</td>
			<td class='isi_laporan' align='right'>".number_format($row->p_disk,0,',','.')."%</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
