<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_patra_rptVendor extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(b.kode_vendor)
from vendor a
$this->filter";
		
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
		$sql="select a.kode_vendor, a.nama, a.alamat, a.no_telp, a.no_fax, a.npwp, a.pic
from vendor a
$this->filter order by a.kode_vendor";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data vendor",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='50'  align='center' class='header_laporan'>Kode</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Vendor</td>
	 <td width='200'  align='center' class='header_laporan'>Alamat</td>
     <td width='90'  align='center' class='header_laporan'>No Telp</td>
     <td width='90'  align='center' class='header_laporan'>No Fax</td>
     <td width='90'  align='center' class='header_laporan'>Npwp</td>

	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_vendor</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->no_telp</td>
	 <td class='isi_laporan'>$row->no_fax</td>
	 <td class='isi_laporan'>$row->npwp</td>

     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
