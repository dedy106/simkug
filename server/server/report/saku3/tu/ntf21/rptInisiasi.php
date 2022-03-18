<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_ntf21_rptInisiasi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$nama_cab=$tmp[1];
		$tahun=substr($periode,0,4);
		$sql="select a.tgl_app,a.kode_pp,a.kode_proyek,a.nama,a.kode_jenis,a.nilai_or,a.nilai_ppn,a.nilai,a.p_or,a.nik_app,a.nik_buat,
		b.nama  as app,c.nama as buat,convert(varchar,a.tgl_mulai,103) as tgl1,convert(varchar,a.tgl_selesai,103) as tgl
from prb_proyek a
inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_buat=c.nik and a.kode_lokasi=c.kode_lokasi

$this->filter
order by a.kode_proyek";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		$logo="image/tu.jpg";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td align='center'><img src='$logo' width='200' height='72'></td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'>Jl. Telekomunikasi Terusan Buah Batu, Bandung 40257 Indonesia, Telp: 62-22-756 4108; Fax: 62-22 7565 930</td>
  </tr>
  <tr>
    <td><hr /></td>
  </tr>
  <tr>
    <td height='30' align='center' valign='middle' class='judul_bukti'>LAPORAN DATA INISIALISASI</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td>
		<table width='800' border='0' cellspacing='2' cellpadding='1'>

  <tr>
    <td width='200'>Bagian / Unit</td>
    <td width='600'>: $row->kode_pp </td>
  </tr>
  <tr>
    <td>ID Kegiatan</td>
    <td>: $row->kode_proyek  </td>
  </tr>
  <tr>
    <td>Deskripsi</td>
    <td>: $row->nama </td>
  </tr>
  <tr>
    <td>Jenis </td>
    <td>: $row->kode_jenis </td>
  </tr>
  <tr>
    <td>Tanggal Mulai</td>
    <td>:  $row->tgl1</td>
  </tr>
  <tr>
    <td>Tanggal Selesai</td>
    <td>:  $row->tgl</td>
  </tr>


  <tr>
    <td>Nilai Budget</td>
    <td>: ".number_format($row->nilai_or,0,",",".")."</td>
  </tr>
  <!--tr>
    <td>DRK BEBAN</td>
    <td>: $row->kode_drkb </td>
  </tr-->
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
 
  <tr>
    <td align='center'>Bandung, ".substr($row->tgl_app,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tgl_app),0,6))." </td>
  </tr>
      <tr>
        <td width='150' align='center'>Diperiksa Oleh : </td>
        <td width='150' align='center'>Dibuat Oleh : </td>
      </tr>
      <tr>
        <td height='60' align='center'>&nbsp;</td>
        <td align='center'>&nbsp;</td>
      </tr>	  
      <tr>
        <td align='center'>$row->app</td>
        <td align='center'>$row->buat</td>
      </tr>
      <tr>
        <td align='center'>$row->nik_app</td>
        <td align='center'>$row->nik_buat</td>
      </tr>
    </table></td>
  </tr>
</table>
</td>
  </tr>
</table>
<br>
			<DIV style='page-break-after:always'></DIV>";
			$i=$i+1;
		}
		
		echo "</table><br>";
    echo "</div>";
		return "";
		
	}
	
}
?>
