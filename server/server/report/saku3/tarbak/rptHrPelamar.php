<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_rptHrPelamar extends server_report_basic
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
		$sql="select a.nip,a.nama,a.no_telp,a.no_hp,a.email,a.alamat,b.nama as nama_media,c.nama as nama_job 
		             from hr_pelamar a 
					 inner join hr_media b on a.kode_media=b.kode_media and a.kode_lokasi=b.kode_lokasi  
					 inner join hr_job c on a.kode_job=c.kode_job and a.kode_lokasi=c.kode_lokasi 
					 $this->filter
			order by a.nip ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar pelamar",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>NIK</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
    <td width='200' align='center' class='header_laporan'>Lowongan</td>
    <td width='150' align='center' class='header_laporan'>Media</td>
	<td width='150' align='center' class='header_laporan'>Email</td>
    <td width='100' align='center' class='header_laporan'>No Telp</td>
	<td width='100' align='center' class='header_laporan'>No Hp</td>
	<td width='150' align='center' class='header_laporan'>Alamat</td>
	<td width='100' align='center' class='header_laporan'>Kota</td>
	<td width='100' align='center' class='header_laporan'>Kode Pos</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->nip</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoMhs('$row->nip','$row->kode_lokasi');\">$row->nama</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama_job</td>
			<td class='isi_laporan'>$row->nama_media</td>
			<td class='isi_laporan'>$row->email</td>
			<td class='isi_laporan'>$row->no_telp</td>
			<td class='isi_laporan'>$row->no_hp</td>
			<td class='isi_laporan'>$row->alamat</td>
			<td class='isi_laporan'>$row->kota</td>
			<td class='isi_laporan'>$row->kode_pos</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
