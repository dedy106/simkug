<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptLembur extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_lembur)
from gr_lembur a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on c.kode_jab=e.kode_jab and c.kode_lokasi=e.kode_lokasi $this->filter ";
		
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
		$sql="select a.no_lembur,datepart(day,a.tanggal) as tgl_cuti,datename(weekday,a.tanggal) as hari,datepart(month,a.tanggal) as bulan,a.progress,
       datepart(year,a.tanggal) as tahun,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(a.tgl_input,'%d/%m/%Y') as tgl_input,
       a.nik_buat,c.nama,a.tugas,a.keterangan,b.nama as loker,a.nik_app,d.nama as nama_app,a.keterangan,CONVERT(varchar, getdate(), 120) as tgl_input,d.email,
	   e.nama as jabatan,a.jam_kerja,a.jam
from gr_lembur a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on c.kode_jab=e.kode_jab and c.kode_lokasi=e.kode_lokasi $this->filter order by a.no_lembur";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		$mail=new server_util_mail();
    $link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
    $path = $link."/";	
    
		$logo=$path."image/gratika2.jpg";
		if ($sts_email=="1")
		{
			$logo="http://www.gratika.co.id/hris/image/gratika.gif";
		}
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$no_lembur=$row->no_lembur;
			$tgl_input=$row->tgl_input;
			$email=$row->email;
			$nama_app="";
			if ($row->progress=="1")
			{
				$nama_app=$row->nama_app;
			}
			echo "<table width='800'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td width='120' height='90' align='center' valign='middle'><img src='$logo' width='120' height='60'></td>
    <td width='674'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='405' rowspan='2' align='center' valign='middle' class='istyle17'>SURAT TUGAS LEMBUR SUKARELA</td>
        <td width='87'>No Lembur </td>
        <td width='166'>: $row->no_lembur</td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tgl_input</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800'  border='0' cellpadding='0' cellspacing='0'>
  <tr>
    <td><table width='100%'  border='0'>
	   <tr>
        <td colspan='2'>Yang bertanda tangan dibawah ini : </td>
        </tr>
      <tr>
        <td width='28%'>Nama</td>
        <td width='72%'>: $row->nama </td>
      </tr>
      <tr>
        <td>NIK</td>
        <td>: $row->nik_buat </td>
      </tr>
      <tr>
        <td>Sub Direktorat / Branch Office </td>
        <td>: $row->loker </td>
      </tr>
	  <tr>
    <td>&nbsp;</td>
  </tr>
      <tr>
        <td colspan='2'>Menyetujui bekerja lembur sukarela pada : </td>
        </tr>
      <tr>
        <td>Hari </td>
        <td>: $hari</td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tanggal </td>
      </tr>
      <tr>
        <td>Jam</td>
        <td>: $row->jam </td>
      </tr>
      <tr>
        <td>Tugas</td>
        <td>: $row->tugas </td>
      </tr>
      <tr>
        <td colspan='2'>Pelaksanaan tugas di laporkan kepada : $row->keterangan </td>
        </tr>
      <tr>
        <td colspan='2'>Perhitungan Jam Lembur : ".number_format($row->jam_kerja,0,',','.')." </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Dengan mendapat upah lembur sesuai peraturan perburuhan yang berlaku. </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='100%'  border='0' cellpadding='0' cellspacing='0'>
      <tr align='center'>
        <td>Mengetahui</td>
        <td>Disetujui Atasan Ybs. </td>
        <td>Pegawai Ybs. </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td height='60'> </td>
        <td> $nama_app </td>
        <td> $row->nama </td>
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
			$numSent = $mail->sendMail("hrd@gratika.co.id",$email,"Pengajuan Lembur $no_lembur Tanggal $tgl_input", $html,null);	
		}
		return "";
	}
	
}
?>
  
