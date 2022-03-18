<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tpcc_proyek_rptCust extends server_report_basic
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
		
		$sql="select a.kode_cust,a.nama,a.kode_lokasi,a.alamat,a.email,a.npwp,a.pic,a.no_hp as hp,a.akun_piutang,b.nama as nama_akun,a.kode_klpcust,c.nama as nama_klpcust,a.kota 
from cust a
inner join masakun b on a.akun_piutang=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join cust_klp c on a.kode_klpcust=c.kode_klpcust  and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.kode_cust ";

		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data customer",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='50' align='center' class='header_laporan'>Kode Cust</td>
		<td width='150' align='center' class='header_laporan'>Nama Cust</td>
	    <td width='60' align='center' class='header_laporan'>Akun Piutang</td>
	    <td width='80' align='center' class='header_laporan'>Nama Piutang</td>
		<td width='150' align='center' class='header_laporan'>Alamat</td>
	    <td width='50' align='center' class='header_laporan'>No Telp</td>
		<td width='80' align='center' class='header_laporan'>NPWP</td>
		<td width='80' align='center' class='header_laporan'>Contact Person</td>
		<td width='100' align='center' class='header_laporan'>Email</td>
	    <td width='50' align='center' class='header_laporan'>Group </td>
	    <td width='80' align='center' class='header_laporan'>Nama Group </td>

   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->kode_cust</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->akun_piutang</td>
			<td class='isi_laporan'>$row->nama_akun</td>
			<td class='isi_laporan'>$row->alamat</td>
			<td class='isi_laporan'>$row->hp</td>
			<td class='isi_laporan'>$row->npwp</td>
			<td class='isi_laporan'>$row->pic</td>
			<td class='isi_laporan'>$row->email</td>
			<td class='isi_laporan'>$row->kode_klpcust</td>
			<td class='isi_laporan'>$row->nama_klpcust</td>
			
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
