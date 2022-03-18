<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptNikIfSub extends server_report_basic
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
		$sql="select a.nik,b.nama,a.kode_pp,c.nama as nama_pp,a.nilai,a.nik_if,d.nama as nama_if 
from it_if_sub a
inner join karyawan b on a.nik=b.nik and a.kode_Lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_if=d.nik and a.kode_Lokasi=d.kode_lokasi
$this->filter order by a.nik";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pemegang imprest fund",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='70'  align='center' class='header_laporan'>NIK</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
	 <td width='70'  align='center' class='header_laporan'>Kode PP</td>
     <td width='300'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='70'  align='center' class='header_laporan'>NIK IF</td>
	  <td width='200'  align='center' class='header_laporan'>Nama IF</td>
     <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  </tr>  ";
		$nilai=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->nik_if</td>
	 <td class='isi_laporan'>$row->nama_if</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='isi_laporan' align='right' colspan='7'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
