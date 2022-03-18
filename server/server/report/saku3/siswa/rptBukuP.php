<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siswa_rptBukuP extends server_report_basic
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
		$sql="select a.no_bukti,a.jenis,a.nis,a.kode_akt,a.tanggal,a.keterangan,a.kode_pp,a.kode_matpel,a.subjek,isnull(b.nama,'-') as nama_kelas,isnull(c.nama,'-') as nama_siswa 
		from sis_bp a
		left join sis_kelas b on a.kode_kelas=b.kode_kelas and a.kode_lokasi=b.kode_lokasi and a.kode_pp=b.kode_pp
		left join sis_siswa c on a.nis=c.nis and a.kode_lokasi=c.kode_lokasi and a.kode_pp=c.kode_pp		
		$this->filter
		 order by a.no_bukti ";

		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar kelas",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
		<tr bgcolor='#CCCCCC'>
			<td width='30' align='center' class='header_laporan'>No</td>
			<td width='100' align='center' class='header_laporan'>No Bukti</td>
			<td width='100' align='center' class='header_laporan'>Jenis</td>
			<td width='100' align='center' class='header_laporan'>NIS</td>
			<td width='60' align='center' class='header_laporan'>Angkatan</td>
			<td width='250' align='center' class='header_laporan'>Keterangan</td>
			<td width='100' align='center' class='header_laporan'>Kode PP</td>
			<td width='100' align='center' class='header_laporan'>Kode Matpel</td>
			<td width='100' align='center' class='header_laporan'>Subjek</td>
		</tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_bukti</td>
			<td class='isi_laporan'>$row->jenis</td>
			<td class='isi_laporan'>$row->nis</td>
			<td class='isi_laporan'>$row->kode_akt</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->kode_matpel</td>
			<td class='isi_laporan'>$row->subjek</td>
    		</tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
