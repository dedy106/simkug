<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptPp extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$sql="select a.kode_pp,a.tahun,a.nama as nama_pp,a.kode_bidang,a.skode,b.nama as nama_bidang,b.kode_rektor,c.nama as nama_rektor
from agg_pp a
inner join agg_bidang b on a.kode_bidang=b.kode_bidang and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
inner join agg_rektor c on b.kode_rektor=c.kode_rektor and b.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
$this->filter 
order by b.kode_rektor,b.kode_bidang,a.kode_pp ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA PP",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	  <td width='40'  align='center' class='header_laporan'>Kode Rektor</td>
     <td width='150'  align='center' class='header_laporan'>Nama Rektor</td>
	 <td width='40'  align='center' class='header_laporan'>Kode Bidang</td>
	  <td width='150'  align='center' class='header_laporan'>Nama Bidang</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='250'  align='center' class='header_laporan'>Nama PP</td>
	  <td width='60'  align='center' class='header_laporan'>Singkatan</td>
	  <td width='60'  align='center' class='header_laporan'>Tahun</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_rektor</td>
	 <td class='isi_laporan'>$row->nama_rektor</td>
	  <td class='isi_laporan'>$row->kode_bidang</td>
	 <td class='isi_laporan'>$row->nama_bidang</td>
	  <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
     <td class='isi_laporan'>$row->skode</td>
	 <td class='isi_laporan'>$row->tahun</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
