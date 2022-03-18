<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptGlPostingSimulasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_post)
from posting_m a
$this->filter";
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
		$sql="select a.no_post,a.keterangan,a.tanggal,a.modul,a.periode,a.nik_buat,a.nik_app,date_format(a.tanggal,'%d/%m/%Y') as tgl,
b.nama as nama_buat,c.nama as nama_app,a.kode_lokasi
from posting_m a
left join karyawan b on a.nik_buat=b.nik
left join karyawan c on a.nik_app=c.nik
$this->filter order by a.no_post";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table border='0' cellspacing='1' cellpadding='2' class='kotak'>
			  <tr>
				<td align='center' class='header_laporan'>POSTING JURNAL </td>
			  </tr>
			  <tr>
				<td><table border='0' cellspacing='2' cellpadding='1'>
				 
				  <tr>
					<td width='100' class='header_laporan'>No Bukti </td>
					<td width='496' class='header_laporan'>:&nbsp;$row->no_post</td>
					</tr>
				 
				  <tr>
					<td class='header_laporan'>Periode</td>
					<td class='header_laporan'>:&nbsp;$row->periode</td>
					</tr>
					
				  <tr>
					<td class='header_laporan'>Tanggal</td>
					<td class='header_laporan'>:&nbsp;$row->tgl</td>
					</tr>
				     <tr>
					<td class='header_laporan'>Pembuat</td>
					<td class='header_laporan'>:&nbsp;$row->nik_buat - $row->nama_buat</td>
					</tr>
					<tr>
					<td class='header_laporan'>Approval</td>
					<td class='header_laporan'>:&nbsp;$row->nik_app - $row->nama_app</td>
					</tr>
				<tr>
					<td class='header_laporan'>Keterangan </td>
					<td class='header_laporan'>:&nbsp;$row->keterangan</td>
				  </tr>
				</table></td>
			  </tr>
			  <tr>
				<td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr>
				<td width='30' class='header_laporan' align='center'>No</td>
				<td width='50' class='header_laporan' align='center'>Lokasi</td>
				<td width='120' class='header_laporan' align='center'>No Bukti</td>
				<td width='100' class='header_laporan'  align='center'>Modul</td>
				
			  </tr>";
	  $sql1="select a.no_bukti,a.modul,a.kode_lokasi
from posting_d a
where a.no_post='$row->no_post' order by a.kode_lokasi,a.no_bukti;
 ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
	
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan' align='center'>$row1->kode_lokasi</td>
				<td class='isi_laporan'>$row1->no_bukti</td>
				<td class='isi_laporan'>$row1->modul</td>
			  </tr>";
				$i=$i+1;
		}
		
	  echo "
	</table></td>
  </tr>
 
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
		return "";
	}
	
}
?>
