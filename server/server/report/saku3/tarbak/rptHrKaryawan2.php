<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tarbak_rptHrKaryawan2 extends server_report_basic
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
		$sql="select a.nik,a.kode_lokasi,a.nama,a.no_telp,a.no_hp,a.email,a.alamat,b.nama as nama_pp,c.nama as nama_gol,g.nama as nama_unit,
		h.nama as nama_cust,
		d.nama as nama_jab,e.nama as nama_sdm,f.nama as nama_loker,a.kode_pajak,a.kode_gol ,a.no_sk,a.durasi,a.no_bpjs,a.no_bpjs2,a.no_bpjs3,
		convert(varchar,a.tgl_masuk,103) as tgl_masuk,convert(varchar,a.tgl_sk,103) as tgl_sk,convert(varchar,a.tgl_akhir,103) as tgl_akhir
		             from hr_karyawan a 
					 inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi  
					 inner join hr_gol c on a.kode_gol=c.kode_gol and a.kode_lokasi=c.kode_lokasi 
					 inner join hr_jab d on a.kode_jab=d.kode_jab and a.kode_lokasi=d.kode_lokasi 
					 inner join hr_sdm e on a.kode_sdm=e.kode_sdm and a.kode_lokasi=e.kode_lokasi 
					 inner join hr_loker f on a.kode_loker=f.kode_loker and a.kode_lokasi=f.kode_lokasi 
					 inner join hr_unit g on a.kode_unit=g.kode_unit and a.kode_lokasi=g.kode_lokasi 
					 inner join hr_cust h on a.kode_cust=h.kode_cust and a.kode_lokasi=h.kode_lokasi 
					 $this->filter
			order by a.tgl_masuk ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("daftar karyawan",$this->lokasi,"");
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='60' align='center' class='header_laporan'>NIK</td>
    <td width='200' align='center' class='header_laporan'>Nama</td>
	<td width='150' align='center' class='header_laporan'>Customer</td>
	<td width='150' align='center' class='header_laporan'>No Kontrak</td>
	<td width='60' align='center' class='header_laporan'>Tgl Mulai</td>
	<td width='60' align='center' class='header_laporan'>Tgl Selesai</td>
	<td width='60' align='center' class='header_laporan'>Durasi</td>
	<td width='100' align='center' class='header_laporan'>No. BPJS Kesehatan</td>
	<td width='100' align='center' class='header_laporan'>No. BPJS Ketenaga- kerjaan</td>
	<td width='100' align='center' class='header_laporan'>No. BPJS Pensiun</td>
	<td width='150' align='center' class='header_laporan'>Jabatan</td>
	<td width='150' align='center' class='header_laporan'>Unit Organisasi</td>
	<td width='150' align='center' class='header_laporan'>Lokasi Kerja</td>
	
   </tr>";
			while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>&nbsp;$row->nik</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKaryawan('$row->nik','$row->kode_lokasi');\">$row->nama</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama_cust</td>
			<td class='isi_laporan'>$row->no_sk</td>
			<td class='isi_laporan'>$row->tgl_sk</td>
			<td class='isi_laporan'>$row->tgl_akhir</td>
			<td class='isi_laporan'>$row->durasi</td>
			<td class='isi_laporan'>$row->no_bpjs</td>
			<td class='isi_laporan'>$row->no_bpjs2</td>
			<td class='isi_laporan'>$row->no_bpjs3</td>
			<td class='isi_laporan'>$row->nama_jab</td>
			<td class='isi_laporan'>$row->nama_unit</td>
			<td class='isi_laporan'>$row->nama_loker</td>
			
    </tr>";	 
			$i=$i+1;
		}
	
		echo "</table></div>";
		return "";
	}
	
}
?>
  
