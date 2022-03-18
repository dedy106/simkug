<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
uses("server_util_mail");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptIjin extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_ijin) 
from gr_ijin a
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_loker b on c.kode_loker=b.kode_loker and c.kode_lokasi=b.kode_lokasi $this->filter ";
		
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
		$sql="select a.no_ijin,datepart(day,a.tanggal) as tgl_absen,datename(weekday,a.tanggal) as hari,datepart(month,a.tanggal) as bulan,a.progress,
		datepart(year,a.tanggal) as tahun,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nik_buat,c.nama,a.keterangan,b.nama as loker,a.nik_app,d.nama as nama_app,
		CONVERT(varchar, getdate(), 120) as tgl_input,d.email,date_format(i.tgl_mulai,'%d/%m/%Y') as tgl_mulai,date_format(g.tgl_selesai,'%d/%m/%Y') as tgl_selesai
from gr_ijin_m a
inner join gr_karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join gr_karyawan d on a.nik_app=d.nik and a.kode_lokasi=d.kode_lokasi
inner join gr_loker b on c.kode_loker=b.kode_loker and c.kode_lokasi=b.kode_lokasi 
left join (select no_ijin,min(tanggal) as tgl_mulai from
				gr_ijin_d 
				group by no_ijin
				) i on a.no_ijin=i.no_ijin
		left join (select no_ijin,max(tanggal) as tgl_selesai from
				gr_ijin_d 
				group by no_ijin
				) g on a.no_ijin=g.no_ijin
$this->filter order by a.no_ijin";


		$start = (($this->page-1) * $this->rows);
    $rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
    $link=$_SERVER['REQUEST_SCHEME']."://".$_SERVER['SERVER_NAME'];
		$path = $link."/";
		
		$i = 1;
		$jum=$rs->recordcount();
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		$mail=new server_util_mail();
		$logo=$path."image/gratika2.jpg";
		if ($sts_email=="1")
		{
			// $logo="http://www.gratika.co.id/hris/image/gratika.gif";
      
		$logo=$path."image/gratika2.jpg";
    }
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$sts_absen1="";$sts_absen2="";$sts_absen3="";$sts_absen4="";$sts_absen5="";
			$sts_cuti1="";$sts_cuti2="";
			$sts_absen4="X";			
			$sts_cuti2="X";
			$hari=$AddOnLib->ubahNamaHari($row->hari);
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			$no_ijin=$row->no_ijin;
			$tgl_input=$row->tgl_input;
			$email=$row->email;
			$nama_app="";
			$jabatan_app="";
			if ($row->progress=="1")
			{
				$nama_app=$row->nama_app;
				$jabatan_app=$row->jabatan_app;
			}
			echo "<table width='800'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table width='800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td width='120' height='90' align='center' valign='middle'><img src='$logo' width='120' height='60'></td>
    <td width='674'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='405' rowspan='2' align='center' valign='middle' class='istyle17'>SURAT KETERANGAN IJIN</td>
        <td width='87'>No Absen </td>
        <td width='166'>: $row->no_ijin</td>
      </tr>
      <tr>
        <td>Tanggal</td>
        <td>: $row->tanggal</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td width='28%'>Nama</td>
        <td width='72%'>: $row->nama </td>
      </tr>
      <tr>
        <td>NIK</td>
        <td>: $row->nik_buat </td>
      </tr>
      <tr>
        <td>Sub Direktorat / Cabang / Area </td>
        <td>: $row->loker </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td width='5%' align='center' style='border: thin solid #000000'>$sts_absen1</td>
        <td width='94%'>Datang Terlambat </td>
      </tr>
      <tr>
        <td align='center' style='border: thin solid #000000'>$sts_absen2</td>
        <td>Pulang Lebih Awal </td>
      </tr>
      <tr>
        <td align='center' style='border: thin solid #000000'>$sts_absen3</td>
        <td>Dinas Luar kantor (Perjalanan Dinas / Non Perjalanan Dinas)</td>
      </tr>
      <tr>
        <td align='center' style='border: thin solid #000000'>$sts_absen4</td>
        <td>Ijin Tidak Masuk Kerja</td>
      </tr>
      <tr>
        <td align='center' style='border: thin solid #000000'>$sts_absen5</td>
        <td>Perubahan Cuti / Perjalanan Dinas</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Keterangan : $row->keterangan</td>
  </tr>";
  if($row->tgl_mulai == $row->tgl_selesai){
    echo"
    <tr>
      <td>Tanggal Ijin : $row->tgl_mulai</td>
    </tr>";
  }else{

    echo"
    <tr>
      <td>Tanggal Ijin : $row->tgl_mulai s.d $row->tgl_selesai</td>
    </tr>";
  }
  echo"
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Catatan : (Di isi oleh atasan langsung min. Manager atau setingkat Manager) </td>
  </tr>
  <tr>
    <td><table width='100%'  border='0'>
      <tr>
        <td width='5%' style='border: thin solid #000000' align='center'>$sts_cuti1</td>
        <td width='94%'>Potong Cuti </td>
      </tr>
      <tr>
        <td style='border: thin solid #000000' align='center'>$sts_cuti2</td>
        <td>Tidak Potong Cuti </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Tanggal, $row->tgl_absen $bulan $row->tahun</td>
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
        <td>Bagian Human Capital </td>
      </tr>
      <tr align='center' valign='bottom'>
        <td height='60'> $row->nama  </td>
        <td> $nama_app  </td>
        <td>  </td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>Lembar 1 untuk kary. Ybs. </td>
  </tr>
  <tr>
    <td>Lembar 2 untuk HRD </td>
  </tr>
  <tr>
    <td>Form diterima HRD maks. 3 hari setelah kejadian</td>
  </tr>
</table></td>
  </tr>
</table>
</td>
  </tr>
  <tr>
    <td align='left' class='isi_laporan'>* Dicetak dari Sistem HRIS GRATIKA, tidak memerlukan tanda tangan</td>
  </tr>
</table><br>
";
		 
			$i=$i+1;
		}
		echo "</div>";

		return "";
	}
	
}
?>
  
