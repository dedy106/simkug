<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_aka_rptAkMhs extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.nim) 
			from aka_mahasiswa a 
			inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$sql="select a.nim, a.nama, a.kode_jur, b.nama as nama_jur,a.kode_akt, a.kode_jalur, a.flag_status,a.flag_bea 
			from aka_mahasiswa a 
			inner join aka_jurusan b on a.kode_jur=b.kode_jur and a.kode_lokasi=b.kode_lokasi $this->filter
			order by a.nim ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar mahasiswa",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>NIM</td>
    <td width='300' align='center' class='header_laporan'>Nama</td>
    <td width='50' align='center' class='header_laporan'>Kode Jur</td>
    <td width='150' align='center' class='header_laporan'>Jurusan</td>
    <td width='50' align='center' class='header_laporan'>Angkatan</td>
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->nim</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoMhs('$row->kode_jur','$row->kode_lokasi');\">$row->nama</a>";
			echo "</td>
			<td class='isi_laporan'>$row->kode_jur</td>
			<td class='isi_laporan'>$row->nama_jur</td>
			<td class='isi_laporan'>$row->kode_akt</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
