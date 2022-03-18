<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptStrukturKasRelasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.kode_lokasi,a.kode_fs,a.kode_neraca,b.kode_akun,c.nama as nama_akun,a.nama
from neracakas a
inner join relakunkas b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs
inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
$this->filter
order by a.kode_neraca,b.kode_akun ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data relasi akun arus kas",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='40'  align='center' class='header_laporan'>Kode FS</td>
     <td width='60'  align='center' class='header_laporan'>Kode Struktur</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Struktur</td>
	 <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
	  </tr>  ";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_fs</td>
	 <td class='isi_laporan'>$row->kode_neraca</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>".$AddOnLib->fnAkun($row->kode_akun)."</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
