<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptCoa extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("COA",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
				  <tr bgcolor='#CCCCCC'>    
				    <td width='60' class='header_laporan' align='center'>Kode</td>
					<td width='200' class='header_laporan' align='center'>Nama</td>
				    <td width='40' class='header_laporan' align='center'>FS</td>
					 <td width='40' class='header_laporan' align='center'>Modul</td>
				    <td width='60' class='header_laporan' align='center'>Tipe</td>
					<td width='60' class='header_laporan' align='center'>Level</td>
					<td width='60' class='header_laporan' align='center'>Kode Induk</td>
				    <td width='80' class='header_laporan' align='center'>Kode Akun</td>
				    <td width='250' class='header_laporan' align='center'>Nama Akun</td>		   
				  </tr>";
				  
		$sql = "select a.kode_neraca,a.nama,a.modul,a.tipe,b.kode_akun,c.nama as nama_akun,a.level_spasi,a.kode_induk,a.kode_fs
from neraca a
left join relakun b on a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs and a.kode_lokasi=b.kode_lokasi
left join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
$this->filter and a.modul='A'
order by a.rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    echo "<tr>
				<td class='isi_laporan'>$row->kode_neraca</td>
				<td class='isi_laporan'>$row->nama</td>
				<td class='isi_laporan'>$row->kode_fs</td>
				<td class='isi_laporan'>$row->modul</td>
				<td class='isi_laporan'>$row->tipe</td>
				<td class='isi_laporan'>$row->level_spasi</td>
				<td class='isi_laporan'>$row->kode_induk</td>
				<td class='isi_laporan'>$row->kode_akun</td>
				<td class='isi_laporan'>$row->nama_akun</td>
				</tr>";
			
		}
		$sql = "select a.kode_neraca,a.nama,a.modul,a.tipe,b.kode_akun,c.nama as nama_akun,a.level_spasi,a.kode_induk,a.kode_fs
from neraca a
left join relakun b on a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs and a.kode_lokasi=b.kode_lokasi
left join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
$this->filter and a.modul='P'
order by a.rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    echo "<tr>
				<td class='isi_laporan'>$row->kode_neraca</td>
				<td class='isi_laporan'>$row->nama</td>
				<td class='isi_laporan'>$row->kode_fs</td>
				<td class='isi_laporan'>$row->modul</td>
				<td class='isi_laporan'>$row->tipe</td>
				<td class='isi_laporan'>$row->level_spasi</td>
				<td class='isi_laporan'>$row->kode_induk</td>
				<td class='isi_laporan'>$row->kode_akun</td>
				<td class='isi_laporan'>$row->nama_akun</td>
				</tr>";
			
		}
		$sql = "select a.kode_neraca,a.nama,a.modul,a.tipe,b.kode_akun,c.nama as nama_akun,a.level_spasi,a.kode_induk,a.kode_fs
from neraca a
left join relakun b on a.kode_neraca=b.kode_neraca and a.kode_fs=b.kode_fs and a.kode_lokasi=b.kode_lokasi
left join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
$this->filter and a.modul='L'
order by a.rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    echo "<tr>
				<td class='isi_laporan'>$row->kode_neraca</td>
				<td class='isi_laporan'>$row->nama</td>
				<td class='isi_laporan'>$row->kode_fs</td>
				<td class='isi_laporan'>$row->modul</td>
				<td class='isi_laporan'>$row->tipe</td>
				<td class='isi_laporan'>$row->level_spasi</td>
				<td class='isi_laporan'>$row->kode_induk</td>
				<td class='isi_laporan'>$row->kode_akun</td>
				<td class='isi_laporan'>$row->nama_akun</td>
				</tr>";
			
		}
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
}
?>
