<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_apotek_rptVendor extends server_report_basic
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
		$sql="select kode_vendor,nama,alamat,no_tel,email,npwp,alamat2,pic,no_fax
        from vendor a
        $this->filter order by a.kode_vendor";
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Lapora Vendor",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#CCCCCC'>
        <td width='30'  align='center' class='header_laporan'>No</td>
        <td width='100'  align='center' class='header_laporan'>Kode Vendor</td>
	    <td width='100'  align='center' class='header_laporan'>Nama Vendor</td>
	    <td width='60'  align='center' class='header_laporan'>Alamat</td>
	    <td width='40'  align='center' class='header_laporan'>No Telepon</td>
        <td width='200'  align='center' class='header_laporan'>No Faximile</td>
	    <td width='60'  align='center' class='header_laporan'>Email</td>
	    <td width='300'  align='center' class='header_laporan'>NPWP</td>
        <td width='80'  align='center' class='header_laporan'>Alamat NPWP</td>
	    <td width='80'  align='center' class='header_laporan'>PIC</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
	echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_vendor</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->alamat</td>
	 <td class='isi_laporan'>$row->no_tel</td>
	 <td class='isi_laporan'>$row->no_fax</td>
	 <td class='isi_laporan'>$row->email</td>
	 <td class='isi_laporan'>$row->npwp</td>
	 <td class='isi_laporan' align='right'>$row->alamat2</td>
	 <td class='isi_laporan' align='right'>$row->pic</td>
     </tr>";
	$i=$i+1;
	}
	echo "</table><br>";
	echo "</div>";
	return "";
		
	}
	
}
?>
