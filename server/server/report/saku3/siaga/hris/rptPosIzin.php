<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptPosIzin extends server_report_basic
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
		
		$sql="select a.no_ijin,date_format(a.tanggal,'%d/%m/%Y') as tgl_ijin,a.nik_buat,b.nama,a.keterangan,d.no_ver,
		date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,f.no_app,date_format(f.tanggal,'%d/%m/%Y') as tgl_app,a.kode_lokasi,date_format(i.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(g.tgl_selesai,'%d/%m/%Y') as tgl_selesai
		from gr_ijin_m a 
		 inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
		left join gr_ver_d c on a.no_ijin=c.no_bukti and a.kode_lokasi=c.kode_lokasi 
		left join gr_ver_m d on c.no_ver=d.no_ver and d.kode_lokasi=c.kode_lokasi 
		left join gr_app_d e on a.no_ijin=e.no_bukti and a.kode_lokasi=e.kode_lokasi 
		left join gr_app_m f on e.no_app=f.no_app and e.kode_lokasi=f.kode_lokasi
		left join (select no_ijin,min(tanggal) as tgl_mulai from
				gr_ijin_d 
				group by no_ijin
				) i on a.no_ijin=i.no_ijin
		left join (select no_ijin,max(tanggal) as tgl_selesai from
				gr_ijin_d 
				group by no_ijin
				) g on a.no_ijin=g.no_ijin
$this->filter
order by a.no_ijin ";


		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data posisi ijin",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
		<td width='30' align='center' class='header_laporan'>No</td>
		<td width='100' align='center' class='header_laporan'>No Ijin</td>
		<td width='60' align='center' class='header_laporan'>Tgl Input</td>
		<td width='60' align='center' class='header_laporan'>Tgl Mulai</td>
		<td width='60' align='center' class='header_laporan'>Tgl Selesai</td>
		<td width='80' align='center' class='header_laporan'>NIK</td>
		<td width='50' align='center' class='header_laporan'>Nama</td>
	    <td width='100' align='center' class='header_laporan'>Keterangan</td>
		<td width='80' align='center' class='header_laporan'>No Verifikasi</td>
		<td width='80' align='center' class='header_laporan'>Tgl Verifikasi</td>
	    <td width='100' align='center' class='header_laporan'>No Approve</td>
		<td width='80' align='center' class='header_laporan'>Tgl Approve</td>

   </tr>";
		$hna=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hna+=$row->hna;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>$row->no_ijin</td>
			<td class='isi_laporan'>$row->tgl_ijin</td>
			<td class='isi_laporan'>$row->tgl_mulai</td>
			<td class='isi_laporan'>$row->tgl_selesai</td>
			<td class='isi_laporan'>$row->nik_buat</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan'>$row->no_ver</td>
			<td class='isi_laporan'>$row->tgl_ver</td>
			<td class='isi_laporan'>$row->no_app</td>
			<td class='isi_laporan'>$row->tgl_app</td>

    </tr>";	 
			$i=$i+1;
		}
	
		echo "</div>";
		return "";
	}
	
}
?>
  
