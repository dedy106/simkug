<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlClosingSpm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
		
			
		$sql = "select a.kode_lokasi,a.nama,b.no_bukti,b.keterangan,b.periode,date_format(b.tanggal,'%d/%m/%Y') as tgl,date_format(b.tgl_input,'%d/%m/%Y') as tgl_input
from lokasi a
left join (select a.no_bukti,a.kode_lokasi,a.keterangan,a.periode,a.tanggal,a.tgl_input
		   from gl_closing a
		   $this->filter
		  )b on a.kode_lokasi=b.kode_lokasi
where a.kode_lokkonsol<>'-' 
order by a.kode_lokasi";
		
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("LAPORAN CLOSING",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
		<td width='40'  class='header_laporan' align='center'>Kode </td>
      <td width='200' height='25'  class='header_laporan' align='center'>Nama Lokasi</td>
	   <td width='60' class='header_laporan' align='center'>Periode</td>
      <td width='80' class='header_laporan' align='center'>No Bukti</td>
      <td width='60' class='header_laporan' align='center'>Tgl Closing</td>
	  <td width='60' class='header_laporan' align='center'>Tgl Input</td>
      <td width='200' class='header_laporan' align='center'>Keterangan</td>
    </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
				<td class='isi_laporan' align='center'>$row->kode_lokasi</td>
				<td class='isi_laporan'>$row->nama</td>
				<td class='isi_laporan'>$row->periode</td>
				<td class='isi_laporan'>$row->no_bukti</td>
				<td class='isi_laporan'>$row->tgl</td>
				<td class='isi_laporan'>$row->tgl_input</td>
				<td class='isi_laporan'>$row->keterangan</td>
				</tr>";
			
			$i=$i+1;
		}
		 echo " </table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
