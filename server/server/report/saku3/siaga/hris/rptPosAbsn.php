<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptPosAbsn extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
		
		$sql="select a.no_absen,date_format(a.tanggal,'%d/%m/%Y')as tgl_tr,a.tgl_absen,a.nik_buat,b.nama,a.keterangan,d.no_ver,
		date_format(d.tanggal,'%d/%m/%Y')tgl_ver,f.no_app,date_format(f.tanggal,'%d/%m/%Y') tgl_app,a.kode_lokasi,b.kode_so 
		from gr_absen a 
		 inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
		left join gr_ver_d c on a.no_absen=c.no_bukti and a.kode_lokasi=c.kode_lokasi 
		left join gr_ver_m d on c.no_ver=d.no_ver and d.kode_lokasi=c.kode_lokasi 
		left join gr_app_d e on a.no_absen=e.no_bukti and a.kode_lokasi=e.kode_lokasi 
		left join gr_app_m f on e.no_app=f.no_app and e.kode_lokasi=f.kode_lokasi
$this->filter
order by a.no_absen ";
// echo $sql;

		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data posisi Absensi",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='100' align='center' class='header_laporan'>No Absensi</td>
		<td width='60' align='center' class='header_laporan'>Tgl Absensi</td>
		<td width='80' align='center' class='header_laporan'>NIK</td>
		<td width='200' align='center' class='header_laporan'>Nama</td>
		<td width='80' align='center' class='header_laporan'>Tgl Transaksi</td>
	    <td width='100' align='center' class='header_laporan'>No Verifikasi</td>
		<td width='80' align='center' class='header_laporan'>Tgl Verifikasi</td>
	    <td width='100' align='center' class='header_laporan'>No Approve</td>
		<td width='80' align='center' class='header_laporan'>Tgl Approve</td>
		<td width='200' align='center' class='header_laporan'>Keterangan</td>

   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_absen</td>
			<td class='isi_laporan'>$row->tgl_absen</td>
			<td class='isi_laporan'>$row->nik_buat</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->tgl_tr</td>
			<td class='isi_laporan'>$row->no_ver</td>
			<td class='isi_laporan'>$row->tgl_ver</td>
			<td class='isi_laporan'>$row->no_app</td>
			<td class='isi_laporan'>$row->tgl_app</td>
			<td class='isi_laporan'>$row->keterangan</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
