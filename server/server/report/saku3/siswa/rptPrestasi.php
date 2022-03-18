<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptPrestasi extends server_report_basic
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
		
		
		$sql="select a.no_bukti,a.nis,b.nama
from sis_prestasi a
inner join sis_siswa b on a.nis = b.nis 
$this->filter
order by a.nis";


		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan data prestasi siswa ",$this->lokasi," ".$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>NIS </td>
        <td class='header_laporan'>:&nbsp;$row->nis</td>
        </tr>
        <tr>
        <td class='header_laporan' width='114'>Nama </td>
        <td class='header_laporan'>:&nbsp;$row->nama</td>
        </tr>
   
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='300' align='center' class='header_laporan'>Nama Prestasi</td>
	<td width='150' align='center' class='header_laporan'>Tanggal</td>
    <td width='150' align='center' class='header_laporan'>Tempat</td>
    <td width='150' align='center' class='header_laporan'>Jenis</td>
	
  </tr>";
			$sql1="select a.keterangan,a.tanggal,a.tempat,a.jenis
			from sis_prestasi a
			where a.no_bukti='$row->no_bukti' and a.nis='$row->nis'  ";
		
			$rs1 = $dbLib->execute($sql1);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				echo "<tr>
    <td  class='isi_laporan'>$row1->keterangan</td>
    <td class='isi_laporan'>$row1->tanggal</td>
	<td class='isi_laporan'>$row1->tempat</td>
	<td class='isi_laporan'>$row1->jenis</td>
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
  
