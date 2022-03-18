<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptTenan extends server_report_basic
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
		$sql="select a.kode_tenan, a.nama,a.norek,a.namarek,a.bank,a.persentase,a.kode_kantin,b.nama as nama_kantin
from ktu_tenan a
inner join ktu_kantin b on a.kode_kantin=b.kode_kantin and a.kode_lokasi=b.kode_lokasi
$this->filter order by a.kode_kantin,a.kode_tenan";
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data tenan",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode</td>
	  <td width='150'  align='center' class='header_laporan'>Nama</td>
     <td width='150'  align='center' class='header_laporan'>Nama Rekening</td>
     <td width='90'  align='center' class='header_laporan'>No Rekening</td>
	 <td width='100'  align='center' class='header_laporan'>Bank</td>
	 <td width='100'  align='center' class='header_laporan'>Persentase</td>
	 <td width='200'  align='center' class='header_laporan'>Kantin</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_tenan</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->namarek</td>
	 <td class='isi_laporan'>$row->norek</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->persentase</td>
	 <td class='isi_laporan'>$row->nama_kantin</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
