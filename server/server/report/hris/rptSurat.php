<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptSurat extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_surat) 
from gr_surat a
inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi=e.kode_lokasi $this->filter ";
		
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
		$sts_email=$tmp[0];
		$sql="
select a.no_surat,datepart(day,a.tanggal) as tgl_surat,datename(weekday,a.tanggal) as hari,datepart(month,a.tanggal) as bulan,
		datepart(year,a.tanggal) as tahun,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nik_buat,c.nama,a.keterangan,a.progress,
		b.nama as dept,a.nik_app,d.nama as nama_app,a.kepada,e.nama as jabatan,f.nama as jabatan_app,a.kepada,CONVERT(varchar, getdate(), 120) as tgl_input,d.email 
from gr_surat a
inner join gr_dept b on a.kode_dept=b.kode_dept and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on a.kode_jab=e.kode_jab and a.kode_lokasi=e.kode_lokasi
inner join gr_jab f on d.kode_jab=f.kode_jab and d.kode_lokasi=f.kode_lokasi $this->filter order by a.no_surat";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$mail=new server_util_mail();
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		$logo="image/gratika.gif";
		if ($sts_email=="1")
		{
			$logo="http://www.gratika.co.id/hris/image/gratika.gif";
		}
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$no_surat=$row->no_surat;
			$tgl_input=$row->tgl_input;
			$email=$row->email;
			$nama_app="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			$nama_sdm="&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
			if ($row->progress=="1")
			{
				$nama_app=$row->nama_app;
				$jabatan_app=$row->jabatan_app;
			}
			echo "<table width='800'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td width='120' height='90' align='center' valign='middle'><img src='$logo' width='66' height='79'></td>
    <td width='700'><table width='687' border='0' cellspacing='2' >
      <tr>
        <td width='470' align='center' class='istyle17'>FORMULIR PENGAJUAN  </td>
        <td width='69'>No Surat </td>
        <td width='145'>: $row->no_surat</td>
      </tr>
      <tr>
        <td align='center' class='istyle17'>SURAT KETERANGAN KEPADA HRD</td>
        <td>Tanggal</td>
        <td>: $row->tanggal</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='22%'>NAMA</td>
        <td width='78%'>: $row->nama </td>
      </tr>
      <tr>
        <td>NIK</td>
        <td>: $row->nik_buat</td>
      </tr>
      <tr>
        <td>JABATAN</td>
        <td>: $row->jabatan </td>
      </tr>
      <tr>
        <td>DEPARTEMEN</td>
        <td>: $row->dept </td>
      </tr>
      <tr>
        <td>Untuk Keperluan </td>
        <td>: $row->keterangan </td>
      </tr>
      <tr>
        <td>Ditujukan Kepada </td>
        <td>: $row->kepada </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Tanggal : $row->tgl_surat $bulan $row->tahun </td>
  </tr>
   <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>Karyawan</td>
        <td>Menyetujui, </td>
        <td>Mengetahui,</td>
      </tr>
      <tr align='center'>
        <td>&nbsp;</td>
        <td>Atasan Langsung</td>
        <td>Bagian HRD </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td height='60'>( $row->nama ) </td>
        <td>( $nama_app ) </td>
        <td>( $nama_sdm ) </td>
      </tr>
    </table></td>
  </tr>
</table></td>
  </tr>
</table></td>
  </tr>
  <tr>
    <td align='left' class='isi_laporan'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
		if ($sts_email=="1")
		{
			$html=ob_get_contents();
			$numSent = $mail->sendMail("hrd@gratika.co.id",$email,"Pengajuan Surat $no_surat Tanggal $tgl_input", $html,null);		
		}
		return "";
	}
	
}
?>
  
