<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tarbak_simlog_rptVendor extends server_report_basic
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
		$sql="select a.kode_vendor, a.nama, a.alamat, a.no_tel,a.email from vendor a 
$this->filter order by a.kode_vendor";

// echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data vendor",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
            <td width='30'  align='center' class='header_laporan'>No</td>
            <td width='80'  align='center' class='header_laporan'>Kode</td>
            <td width='200'  align='center' class='header_laporan'>Nama Vendor</td>
            <td width='200'  align='center' class='header_laporan'>Alamat</td>
            <td width='80'  align='center' class='header_laporan'>No Telp</td>
            <td width='150'  align='center' class='header_laporan'>Email</td>
	    </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_klp</td>
	 <td class='isi_laporan'>$row->nama</td>
     <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->no_tel</td>
	 <td class='isi_laporan'>$row->email</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
