<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bangtel_rptPanjarForm extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select a.no_panjar,a.nik_buat,a.nik_setuju,f.flag as nik_bdh,h.flag as nik_manbdh,a.kode_pp,a.nilai,a.akun_panjar,a.keterangan,substring(a.periode,1,4) as tahun,
       b.nama as nama_pp,c.nama as nama_buat,e.nama as nama_setuju,f.nama as nama_bdh,g.nama as nama_akun,h.nama as nama_manbdh,
	   substring(a.periode,1,4) as tahun,datepart(day,a.tanggal) as tgl,datepart(month,a.tanggal) as bulan,
	   f.keterangan as jab_bdh,h.keterangan as jab_manbdh,i.kota
from panjar2_m a
inner join lokasi i on a.kode_lokasi=i.kode_lokasi
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi
left join spro f on a.kode_lokasi=f.kode_lokasi and f.kode_spro='BDH1'
left join spro h on a.kode_lokasi=h.kode_lokasi and h.kode_spro='BDH2'
left join masakun g on a.akun_panjar=g.kode_akun and a.kode_lokasi=g.kode_lokasi $this->filter order by a.no_panjar";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$debet=0;$kredit=0;$tmp="";
		$first = true;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bulan=$AddOnLib->ubah_bulan($row->bulan);
			echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='right'>Model PK-1 </td>
  </tr>
  <tr>
    <td align='right'>Formulir Pengajuan / Pengambilan Panjar Kerja </td>
  </tr>
  <tr>
    <td align='center'>PT. BANGTELINDO</td>
  </tr>
  <tr>
    <td colspan='2' align='center'><table width='100%' border='0' cellpadding='0' cellspacing='0'>
      <tr>
        <td align='center' class='judul_form'><u>DAFTAR PERMOHONAN PANJAR INSIDENTIL</u></td>
      </tr>
      <tr>
        <td align='center' class='judul_form'>$row->no_panjar</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='600' height='30' valign='top'>Yang bertanda tangan dibawah ini : </td>
        <td width='200' >&nbsp;</td>
      </tr>
      <tr>
        <td colspan='2'>Nama : $row->nama_buat / NIK . $row->nik_buat </td>
      </tr>
      <tr>
        <td colspan='2'>$row->keterangan</td>
      </tr>
      <tr>
        <td colspan='2'>Sejumlah : Rp. ".number_format($row->nilai,0,',','.')." (".$AddOnLib->terbilang($row->nilai).") </td>
      </tr>
	   <tr>
        <td colspan='2'>&nbsp;</td>
      </tr>
      
      <tr>
        <td>&nbsp;</td>
        <td height='30' valign='bottom'>Bandung, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr>
        <td>Mengetahui / Menyetujui </td>
        <td>Yang Mengajukan </td>
      </tr>
      <tr>
        <td>$row->jab_setuju</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td><u>$row->nama_setuju</u></td>
        <td><u>$row->nama_buat</u></td>
      </tr>
      <tr>
        <td>NIK.$row->nik_setuju</td>
        <td>NIK.$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='right'>Model PK-1 </td>
  </tr>
  <tr>
    <td align='right'>Formulir Pengajuan / Pengambilan Panjar Kerja </td>
  </tr>
  
  <tr>
    <td align='center' class='judul_form'>FIAT BAYAR </td>
  </tr>
  <tr>
        <td colspan='2'>Harap dibayarkan kepada : $row->nama_buat / NIK $row->nik_buat</td>
      </tr>
      <tr>
        <td colspan='2'>sejumlah Rp ".number_format($row->nilai,0,",",".")." (".$AddOnLib->terbilang($row->nilai).")</td>
      </tr>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='600'>&nbsp;</td>
        <td width='200' height='30' valign='bottom'>$row->kota, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Fiatur</td>
      </tr>
      <tr>
        <td>$row->jab_bdh</td>
        <td>$row->jab_manbdh</td>
      </tr>
      <tr>
        <td height='50'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
       <tr>
        <td><u>$row->nama_bdh</u></td>
        <td><u>$row->nama_manbdh</u></td>
      </tr>
      <tr>
        <td>NIK.$row->nik_bdh </td>
        <td>NIK.$row->nik_manbdh</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr align='center'>
        <td colspan='2' class='judul_form'>TANDA PENERIMAAN UANG </td>
      </tr>
      <tr>
        <td width='184'>Telah diterima uang sebesar </td>
        <td width='606'>Rp. ".number_format($row->nilai,0,",",".")." </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>".$AddOnLib->terbilang($row->nilai)."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellpadding='1' cellspacing='2'>
      <tr>
        <td width='600'>&nbsp;</td>
        <td width='200'>$row->kota, $row->tgl $bulan $row->tahun </td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td>Pemegang Panjar Kerja </td>
      </tr>
      <tr>
        <td height='50' valign='bottom'><u>Perhatian </u></td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>Panjar akan di pertanggungkan paling lama 25 (dua puluh lima) hari </td>
        <td><u>$row->nama_buat<u></td>
      </tr>
      <tr>
        <td>kalender sejak uang panjar diterima </td>
        <td>NIK.$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table><br>";
		}
		echo "</div>";
		return "";
		
	}
	
}
?>
