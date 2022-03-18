<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku2_kopeg_gar_rptDrk extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
		
		$sql = "select a.kode_drk,a.nama,a.tahun from drk a $this->filter order by a.kode_drk";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		//echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("data drk",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='30' class='header_laporan'>No</td>
    <td width='80' class='header_laporan'>Kode DRK</td>
    <td width='400' class='header_laporan'>Nama DRK</td>
  </tr>";
  
		while ($row = $rs->FetchNextObject($toupper=false))
		{
  echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_drk</td>
    <td class='isi_laporan'>$row->nama</td>
   
  </tr>";
			$i+=1;
		}
  echo "
</table>";
		
		
		echo "</div>";
		return "";
	}
	
}
?>
