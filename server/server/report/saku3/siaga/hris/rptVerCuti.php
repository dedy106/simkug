<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptVerCuti extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_ver)
from gr_ver_m a
inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$nama_ver=$tmp[0];
		$kode_akun=$tmp[2];
		$kode_rka=$tmp[3];
		$kode_bidang=$tmp[4];
		$ver=$tmp[1];
		$sql="select a.no_ver,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.modul,a.nik_app,b.nama,a.keterangan,a.periode,a.kode_lokasi
from gr_ver_m a
inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_ver";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("verifikasi cuti",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='1000'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='13' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Verifikasi </td>
        <td class='header_laporan'>:&nbsp;$row->no_ver</td>
        </tr>
	    <tr>
        <td class='header_laporan'>NIK Approve </td>
        <td class='header_laporan'>:&nbsp;$row->nik_app - $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Modul   </td>
        <td class='header_laporan'>:&nbsp;$row->modul</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>No Bukti </td>
    <td width='150' align='center' class='header_laporan'>Catatan </td>
	<td width='60' class='header_laporan'>Tanggal</td>
    <td width='60' class='header_laporan'>Tgl Mulai</td>
	<td width='60' class='header_laporan'>Tgl Selesai</td>
	<td width='40' class='header_laporan'>Lama</td>
	<td width='40' class='header_laporan'>Sisa</td>
	<td width='150' class='header_laporan'>Lokasi Kerja</td>
	<td width='150' class='header_laporan'>Karyawan</td>
	<td width='150' class='header_laporan'>Status Cuti</td>
	<td width='150' class='header_laporan'>Alasan</td>
	<td width='150' class='header_laporan'>Alamat</td>
  </tr>
";
		
	  $sql1="select a.modul,a.no_bukti,a.catatan,convert(varchar,b.tanggal,103) as tanggal,b.kode_loker+' - '+c.nama as loker,
	  b.nik_buat+' - '+d.nama as karyawan,b.sts_cuti+' - '+e.nama as cuti,b.alasan,b.alamat,convert(varchar,b.tgl_mulai,103) as tgl_mulai,
	  convert(varchar,b.tgl_selesai,103) as tgl_selesai,b.lama,b.sisa
from gr_ver_d a
inner join gr_cuti b on a.no_bukti=b.no_cuti and a.kode_lokasi=b.kode_lokasi
inner join gr_loker c on b.kode_loker=c.kode_loker and b.kode_lokasi=c.kode_lokasi 
inner join gr_karyawan d on b.nik_buat=d.nik and b.kode_lokasi=d.kode_lokasi 
inner join gr_status_cuti e on b.sts_cuti=e.sts_cuti and b.kode_lokasi=e.kode_lokasi 
where a.no_ver='$row->no_ver' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_bukti ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='left' class='isi_laporan'>$row1->no_bukti</td>
    <td align='left' class='isi_laporan'>$row1->catatan</td>
	<td align='left' class='isi_laporan'>$row1->tanggal</td>
	<td align='left' class='isi_laporan'>$row1->tgl_mulai</td>
	<td align='left' class='isi_laporan'>$row1->tgl_selesai</td>
	<td align='right' class='isi_laporan'>".number_format($row1->lama)."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->sisa)."</td>
	<td align='left' class='isi_laporan'>$row1->loker</td>
	<td align='left' class='isi_laporan'>$row1->karyawan</td>
	<td align='left' class='isi_laporan'>$row1->cuti</td>
	<td align='left' class='isi_laporan'>$row1->alasan</td>
     <td align='left' class='isi_laporan'>$row1->alamat</td>
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table></td>
  </tr>
  <tr>
    <td align='left' class='isi_laporan'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
