<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlRekapVendorDetail extends server_report_basic
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
		$sql="select a.kode_lokasi,a.no_dokumen,a.kode_cust,a.kode_vendor,a.kode_proyek,b.nama as nama_cust,c.nama as nama_vendor,a.nilai
from gldt_tmp a
left join sju_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
left join sju_vendor c on a.kode_vendor=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
$this->filter and a.kode_akun='211010000'  and a.dc='C'
order by a.no_dokumen ";
		
		$rs = $dbLib->execute($sql);		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Laporan Hutang Premi ",$this->lokasi,"TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='100'  align='center' class='header_laporan'>No polis</td>
	  <td width='60'  align='center' class='header_laporan'>COB</td>
	 <td width='200'  align='center' class='header_laporan'>Penanggung</td>
     <td width='200'  align='center' class='header_laporan'>Tertanggung</td>
     <td width='100'  align='center' class='header_laporan'>Nominal</td>
	  </tr>  ";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
     echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisList('$row->no_dokumen','$row->kode_lokasi');\">$row->no_dokumen</a></td>
	 <td class='isi_laporan'>$row->kode_proyek</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
	 <td class='isi_laporan'>$row->nama_vendor</td>
 	<td class='isi_laporan' align='right'>".number_format($row->nilai,2,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='isi_laporan' align='center' colspan='5'>Total</td>
    
 	<td class='isi_laporan' align='right'>".number_format($nilai,2,',','.')."</td></tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
