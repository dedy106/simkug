<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptCuti extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		
		$sql = "select count(a.no_cuti)
from gr_cuti a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on c.kode_jab=e.kode_jab and c.kode_lokasi=e.kode_lokasi
left join (select nik,kode_lokasi,sum(tambah) as tambah,sum(jumlah) as jumlah
from gr_cuti_karyawan
where periode<='$periode' and substring(periode,1,4)='$tahun'
group by nik,kode_lokasi) f on a.nik_buat=f.nik and a.kode_lokasi=f.kode_lokasi  $this->filter ";;
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
		$tahun=substr($periode,0,4);
		$sts_email=$tmp[1];
		$sql="select a.no_cuti,datepart(day,a.tanggal) as tgl_cuti,datename(weekday,a.tanggal) as hari,datepart(month,a.tanggal) as bulan,datepart(day,a.tanggal) as tgl,
       datepart(year,a.tanggal) as tahun,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.progress,
	   date_format(a.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(a.tgl_selesai,'%d/%m/%Y') as tgl_selesai,
       a.nik_buat,c.nama,a.alasan,b.nama as loker,a.nik_app,d.nama as nama_app,a.sts_cuti,
	   e.nama as jabatan,a.alamat,date_format(c.tgl_masuk,'%d/%m/%Y') as tgl_masuk,f.tambah,f.jumlah,a.sisa,a.lama ,a.lama_lalu,a.sisa_lalu,CONVERT(varchar, getdate(), 120) as tgl_input,d.email
from gr_cuti a
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_jab e on c.kode_jab=e.kode_jab and c.kode_lokasi=e.kode_lokasi
left join (select nik,kode_lokasi,sts_cuti,sum(tambah) as tambah,sum(jumlah) as jumlah
from gr_cuti_karyawan
where periode<='$periode' and substring(periode,1,4)='$tahun'
group by nik,kode_lokasi,sts_cuti) f on a.nik_buat=f.nik and a.kode_lokasi=f.kode_lokasi and a.sts_cuti=f.sts_cuti $this->filter order by a.no_cuti";
		
		
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
			$no_cuti=$row->no_cuti;
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
    <td width='120' height='90' align='center' valign='middle'><img src='$logo width='66' height='79'></td>
    <td width='674'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='405' rowspan='2' align='center' valign='middle' class='istyle17'>SURAT PERMOHONAN CUTI</td>
        <td width='87'>No Cuti </td>
        <td width='166'>: $row->no_cuti</td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tanggal</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800'  border='0' cellpadding='0' cellspacing='0'>
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td width='35%'>Nama</td>
        <td width='65%'>: $row->nama </td>
      </tr>
      <tr>
        <td>NIK</td>
        <td>: $row->nik_buat </td>
      </tr>
      <tr>
        <td>Jabatan</td>
        <td>: $row->jabatan </td>
      </tr>
      <tr>
        <td>Departemen / Cabang / Area </td>
        <td>: $row->loker </td>
      </tr>
      <tr>
        <td>Mulai Bekerja </td>
        <td>: $row->tgl_masuk</td>
      </tr>
      <tr>
        <td colspan='2'>Dengan Hak Cuti Sebagai Berikut : </td>
        </tr>
      <tr>
        <td>&nbsp;&nbsp;&#8226;&nbsp;Sisa Cuti Tahun Sebelumnya </td>
        <td>: ".number_format($row->sisa_lalu,0,',','.')." Hari Kerja </td>
      </tr>
      <tr>
        <td>&nbsp;&nbsp;&#8226;&nbsp;Hak Cuti Tahun $tahun</td>
        <td>: ".number_format($row->sisa,0,',','.')." Hari Kerja </td>
      </tr>
      <tr>
        <td colspan='2'>Rencana Cuti Yang Akan Diambil Tahun </td>
        </tr>
      <tr>
        <td>Mulai Tanggal $row->tgl_mulai s/d $row->tgl_selesai</td>
        <td>: ".number_format($row->lama+$row->lama_lalu,0,',','.')." Hari Kerja </td>
      </tr>
      <tr>
        <td>Sisa Cuti  </td>
        <td>: ".number_format(($row->sisa+$row->sisa_lalu) - $row->lama-$row->lama_lalu,0,',','.')." Hari Kerja </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Alamat Selama Cuti </td>
        <td>: $row->alamat</td>
      </tr>
      <tr>
        <td>Alasan Cuti </td>
        <td>: $row->alasan</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Tanggal, $row->tgl $bulan $row->tahun</td>
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
        <td>( ) </td>
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
			$numSent = $mail->sendMail("hrd@gratika.co.id",$email,"Pengajuan Cuti $no_cuti Tanggal $tgl_input", $html,null);	
		}
		return "";
	}
	
}
?>
  
