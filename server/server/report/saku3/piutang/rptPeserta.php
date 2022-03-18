<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_piutang_rptPeserta extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$jenis=$tmp[1];
		$no_load=$tmp[2];
		$nama_file="peserta_".$no_load.".xls";
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
		$sql="select a.no_load,a.nik,a.nama,a.band,a.loker 
		from yk_peserta_d a
		inner join yk_peserta_m b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi
		$this->filter order by a.nik";
		$rs = $dbLib->execute($sql);	
		
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data peserta",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80'  align='center' class='header_laporan'>No Load</td>
    <td width='60' align='center' class='header_laporan'>NIK</td>
    <td width='300' align='center' class='header_laporan'>Nama</td>
    <td width='40' align='center' class='header_laporan'>Band</td>
	<td width='50' align='center' class='header_laporan'>LOker</td>
  </tr>
";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_load</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->band</td>
    <td class='isi_laporan'>$row->loker</td>
  </tr>";
			$i=$i+1;
		}
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
