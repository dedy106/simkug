<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sla_rptMitra extends server_report_basic
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
		$sql="select a.kode_mitra	,a.nama	,a.alamat	,a.no_tel	,a.email	,a.bank	,a.cabang	,a.no_rek	,a.nama_rek
from sla_mitra a
$this->filter order by a.kode_mitra";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data mitra",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Mitra</td>
	 <td width='150'  align='center' class='header_laporan'>Alamat</td>
     <td width='100'  align='center' class='header_laporan'>No Telp</td>
     <td width='100'  align='center' class='header_laporan'>Email</td>
     <td width='100'  align='center' class='header_laporan'>Bank</td>
	 <td width='100'  align='center' class='header_laporan'>Cabang</td>
	  <td width='100'  align='center' class='header_laporan'>No Rekening</td>
	   <td width='100'  align='center' class='header_laporan'>Nama Rekening</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_mitra</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->no_tel</td>
	 <td class='isi_laporan'>$row->email</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan'>$row->cabang</td>
	 <td class='isi_laporan'>$row->no_rek</td>
	 <td class='isi_laporan'>$row->nama_rek</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
