<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_klinik_rptObat extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select a.kode_obat,a.nama,a.kode_lokasi,b.kode_klp,b.nama as nama_klp,a.sat_besar,a.sat_kecil,a.hna 
from kli_obat a
inner join kli_obat_klp b on a.kode_klp=b.kode_klp and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_obat ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("stok obat",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Kode Obat</td>
    <td width='300' align='center' class='header_laporan'>Nama Obat</td>
	 <td width='80' align='center' class='header_laporan'>Kelompok</td>
	 <td width='50' align='center' class='header_laporan'>Satuan</td>
    <td width='80' align='center' class='header_laporan'>HNA</td>
   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTiket('$row->kode_obat','$row->kode_lokasi');\">$row->kode_obat</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->kode_klp</td>
			<td class='isi_laporan'>$row->sat_besar</td>
			<td class='isi_laporan' align='right'>".number_format($row->hna,0,',','.')."</td>
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
