<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptKlaimAsuransi extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$tmp=explode("/",$this->filter2);
		$nama_ver=$tmp[0];
		$kode_akun=$tmp[2];
		$kode_rka=$tmp[3];
		$kode_bidang=$tmp[4];
		$ver=$tmp[1];
		$sql="select b.nama,d.nama as pasien,date_format(a.tgl_kuitansi,'%d/%m/%Y') as tgl_kuitansi,a.nilai,f.nama as nama_buat
from gr_klaim_m a
inner join gr_karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join gr_klaim_d c on a.no_klaim=c.no_klaim and a.kode_lokasi=c.kode_lokasi
inner join gr_keluarga d on c.nik=d.nik and c.no_urut=d.no_urut and c.kode_lokasi=d.kode_lokasi
cross join gr_otorisasi e 
inner join gr_karyawan f on e.nik=f.nik and e.kode_lokasi=f.kode_lokasi and e.sts_oto='KES'
 $this->filter order by a.no_klaim ";
		
		$rs=$dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan klaim kesehatan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		echo "<table  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td>Nama Perusahaan : PT GRATIKA</td>
  </tr>
  <tr>
    <td><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
        <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Karyawan </td>
        <td width='60' rowspan='2' align='center' class='header_laporan'>No. Peserta</td>
		<td width='200' rowspan='2' align='center' class='header_laporan'>Nama Peserta</td>
        <td colspan='5' align='center' class='header_laporan'>PLAN *) </td>
        <td rowspan='2' align='center' class='header_laporan'>Tanggal Kuitansi</td>
        <td rowspan='2' align='center' class='header_laporan'>Jumlah </td>
        <td rowspan='2' align='center' class='header_laporan'>Keterangan</td>
        </tr>
      <tr>
        <td align='center' class='header_laporan'>IP</td>
        <td align='center' class='header_laporan'>OP</td>
        <td align='center' class='header_laporan'>RG</td>
        <td align='center' class='header_laporan'>ME</td>
        <td align='center' class='header_laporan'>KM</td>
        </tr>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;  
			$nama_buat=$row->nama_buat;
      echo "<tr>
        <td align='center' class='isi_laporan'>$i</td>
        <td class='isi_laporan'>$row->nama</td>
		<td class='isi_laporan'>&nbsp;</td>
        <td class='isi_laporan'>$row->pasien</td>
		<td width='20' class='isi_laporan'>&nbsp;</td>
        <td width='20' class='isi_laporan'>&nbsp;</td>
        <td width='20' class='isi_laporan'>&nbsp;</td>
        <td width='20' class='isi_laporan'>&nbsp;</td>
        <td width='20' class='isi_laporan'>&nbsp;</td>
        <td align='center' width='60' class='isi_laporan'>$row->tgl_kuitansi</td>
        <td width='80' class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
        <td width='200' class='isi_laporan'>&nbsp;</td>
        </tr>";
      
			
			$i=$i+1;
		}
		echo "<tr>
        <td colspan='10' class='header_laporan' align='right'>Total&nbsp;</td>
        <td  class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='303' class='header_laporan'>Tanggal diserahkan </td>
        <td width='487' class='header_laporan'>Tanggal diterima : </td>
      </tr>
      <tr>
        <td class='header_laporan'>Dibuat Oleh : </td>
        <td class='header_laporan'>Diterima oleh : </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nama jelas : </td>
        <td class='header_laporan'>Nama jelas : </td>
      </tr>
      <tr>
        <td class='header_laporan'>$nama_buat</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>*) diisi dengan tanda silang (x) o/ HRD Perusahaan </td>
  </tr>
  <tr>
    <td>Pengisian wajib diketik</td>
  </tr>
</table>";
		echo "</div>";
			
		return "";
	}
	
}
?>
  
