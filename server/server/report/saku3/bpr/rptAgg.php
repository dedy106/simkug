<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptAgg extends server_report_basic
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
		$sql="select a.no_agg, a.kode_lokasi, a.nama, a.tempat, a.tgl_lahir, a.alamat, a.no_tel, a.bank, a.cabang, a.no_rek,
a.nama_rek, a.flag_aktif, a.id_lain
FROM  kop_agg a
$this->filter order by a.no_agg";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data anggota",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Anggota</td>
	 <td width='80'  align='center' class='header_laporan'>ID Lain</td>
	  <td width='200'  align='center' class='header_laporan'>Nama</td>
	 
     <td width='100'  align='center' class='header_laporan'>Bank</td>
     <td width='100'  align='center' class='header_laporan'>Cabang</td>
     <td width='100'  align='center' class='header_laporan'>No Rekening</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Rekening</td>
	  </tr>  ";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_agg</td>
	 
	 <td class='isi_laporan'>$row->id_lain</td>
	 <td class='isi_laporan'>$row->nama</td>
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
