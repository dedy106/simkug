<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptSpjRole extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$nama_cab=$tmp[1];
		$sql="select a.nik,a.nik_app,a.nik_app2,b.nama as nama_nik,c.nama as nama_app,d.nama as nama_app2
from pdss_role_nik a
inner join karyawan b on a.nik=b.nik
inner join karyawan c on a.nik_app=c.nik
inner join karyawan d on a.nik_app2=d.nik
$this->filter order by a.nik";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data role approve",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>NIK</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Mitra</td>
	 <td width='60'  align='center' class='header_laporan'>NIK App 1</td>
     <td width='200'  align='center' class='header_laporan'>Nama App 1</td>
     <td width='60'  align='center' class='header_laporan'>NIK App 2</td>
     <td width='200'  align='center' class='header_laporan'>Nama App 2</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama_nik</td>
	 <td class='isi_laporan'>$row->nik_app</td>
	 <td class='isi_laporan'>$row->nama_app</td>
	 <td class='isi_laporan'>$row->nik_app2</td>
	 <td class='isi_laporan'>$row->nama_app2</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
