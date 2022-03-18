<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_kopeg_tiket_rptTiket extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_tiket) 
			from sai_tiket_m a $this->filter ";
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
		$sql="select a.no_tiket,a.kode_lokasi, a.nik_user,b.nama, a.form, a.progress,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl
			from sai_tiket_m a 
			inner join karyawan b on a.nik_user=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter
			order by a.no_tiket ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar tiket",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Tiket</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='80' align='center' class='header_laporan'>User Id</td>
    <td width='150' align='center' class='header_laporan'>Nama User</td>
    <td width='150' align='center' class='header_laporan'>Form</td>
	<td width='300' align='center' class='header_laporan'>Keterangan</td>
	<td width='60' align='center' class='header_laporan'>Progress</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTiket('$row->no_tiket','$row->kode_lokasi');\">$row->no_tiket</a>";
			echo "</td>
			<td class='isi_laporan'>$row->tgl</td>
			<td class='isi_laporan'>$row->nik_user</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->form</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->progress</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
