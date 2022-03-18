<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptPosReimbur extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		
		$sql="select a.no_kes,date_format(a.tanggal,'%d/%m/%Y') as tgl_lembur,date_format(a.tgl_input,'%d/%m/%Y') as tgl_input,a.nik_buat,b.nama,a.keterangan,d.no_ver,
		date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,f.no_ver as no_app,date_format(f.tanggal,'%d/%m/%Y') as tgl_app,a.kode_lokasi,
		h.no_pb,date_format(h.tanggal,'%d/%m/%Y') as tgl_pb
		from gr_kes_m a 
		inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
		left join gr_ver_d c on a.no_kes=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.modul='REIMBURSE'
		left join gr_ver_m d on c.no_ver=d.no_ver and d.kode_lokasi=c.kode_lokasi 
		left join gr_ver_d e on a.no_kes=e.no_bukti and a.kode_lokasi=c.kode_lokasi and e.modul='FINALREIMB'
		left join gr_ver_m f on e.no_ver=f.no_ver and e.kode_lokasi=f.kode_lokasi  
		left join gr_pb_m h on a.no_pb=h.no_pb and a.kode_lokasi=h.kode_lokasi
$this->filter
order by a.no_kes ";


		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan posisi pengajuan benefit",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1200'>
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='100' align='center' class='header_laporan'>No Reimburse</td>
		<td width='60' align='center' class='header_laporan'>Tgl Reimburse</td>
		<td width='80' align='center' class='header_laporan'>NIK</td>
		<td width='50' align='center' class='header_laporan'>Nama</td>
		<td width='80' align='center' class='header_laporan'>Keterangan</td>
		<td width='80' align='center' class='header_laporan'>Tgl Transaksi</td>
		<td width='80' align='center' class='header_laporan'>No Verifikasi</td>
		<td width='80' align='center' class='header_laporan'>Tgl Verifikasi</td>
	    <td width='100' align='center' class='header_laporan'>No Approve</td>
		<td width='80' align='center' class='header_laporan'>Tgl Approve</td>
		<td width='100' align='center' class='header_laporan'>No PB</td>
		<td width='80' align='center' class='header_laporan'>Tgl PB</td>

   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_kes</td>
			<td class='isi_laporan'>$row->tgl_lembur</td>
			<td class='isi_laporan'>$row->nik_buat</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->tgl_input</td>
			<td class='isi_laporan'>$row->no_ver</td>
			<td class='isi_laporan'>$row->tgl_ver</td>
			<td class='isi_laporan'>$row->no_app</td>
			<td class='isi_laporan'>$row->tgl_app</td>
			<td class='isi_laporan'>$row->no_pb</td>
			<td class='isi_laporan'>$row->tgl_pb</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
