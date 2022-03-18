<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptKkm extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		
		
		$sql="select a.kode_kkm, a.kode_ta,a.kode_tingkat,c.nama as tingkat,b.nama as ta
from sis_kkm a
inner join sis_ta b on a.kode_ta=b.kode_ta and a.kode_lokasi=b.kode_lokasi
inner join sis_tingkat c on a.kode_tingkat=c.kode_tingkat and a.kode_lokasi=c.kode_lokasi

$this->filter
order by a.kode_ta";

		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan daftar kkm ",$this->lokasi," ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>Kode KKM </td>
        <td class='header_laporan'>:&nbsp;$row->kode_kkm</td>
        </tr>
  
  <tr>
        <td class='header_laporan' width='114'>Tahun Ajaran </td>
        <td class='header_laporan'>:&nbsp;$row->ta</td>
        </tr>
		  <tr>
        <td class='header_laporan'>Tingkat   </td>
        <td class='header_laporan'>:&nbsp;$row->tingkat</td>
      </tr>    
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='25' align='center' class='header_laporan'>Kode Mata Pelajaran</td>
	<td width='200' align='center' class='header_laporan'>Mata Pelajaran</td>
    <td width='100' align='center' class='header_laporan'>KKM</td>
	
  </tr>";
			$sql1="select a.kkm,a.kode_matpel,d.nama as matpel
			from sis_kkm a
			inner join sis_matpel d on a.kode_matpel=d.kode_matpel and a.kode_lokasi=d.kode_lokasi
			where a.kode_kkm='$row->kode_kkm' ";
		
			$rs1 = $dbLib->execute($sql1);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr>
    <td  class='isi_laporan'>$row1->kode_matpel</td>
    <td class='isi_laporan'>$row1->matpel</td>
	<td class='isi_laporan'>$row1->kkm</td>
	 </tr>";		
				$j=$j+1;
			}
			echo "<br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
