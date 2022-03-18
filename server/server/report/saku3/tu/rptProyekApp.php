<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_rptProyekApp extends server_report_basic
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
		$sql="select a.no_app,a.kode_lokasi,b.kode_proyek,b.nama,b.no_pks,b.kode_cust,d.nama as nama_cust,b.nilai,
	   b.kode_jenis,e.nama as nama_jenis,b.p_or,b.nilai_or,b.nilai_ppn,b.jumlah,a.tanggal,a.tgl_input,
	   convert(varchar(20),b.tgl_mulai,103) as tgl_mulai,convert(varchar(20),b.tgl_selesai,103) as tgl_selesai,
	   b.kode_drkb,b.kode_drkp,f.nama as nama_drkp,g.nama as nama_drkb,a.nik_user,h.nama as nama_app,b.nama,
	   datediff(month,b.tgl_mulai,b.tgl_selesai)+1 as bulan
from tu_proyek_app a
inner join tu_proyek b on a.no_bukti=b.kode_proyek and a.kode_lokasi=b.kode_lokasi
inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi
inner join cust d on b.kode_cust=d.kode_cust and b.kode_lokasi=d.kode_lokasi
inner join tu_proyek_jenis e on b.kode_jenis=e.kode_jenis and b.kode_lokasi=e.kode_lokasi
left join drk f on b.kode_drkp=f.kode_drk and b.kode_lokasi=f.kode_lokasi and substring(a.periode,1,4)=f.tahun
left join drk g on b.kode_drkb=g.kode_drk and b.kode_lokasi=g.kode_lokasi and substring(a.periode,1,4)=g.tahun
inner join karyawan h on a.nik_user=h.nik and a.kode_lokasi=h.kode_lokasi
$this->filter
order by a.no_app
";
		
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
    <td height='30' align='center' valign='middle' class='judul_bukti'>LAPORAN APPROVAL DATA PROYEK</td>
  </tr>
  
  <tr>
    <td colspan='2' style='padding:10px;'><table width='800' border='0' cellpadding='0' cellspacing='0' >
  <tr>
    <td>
		<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td width='200'>NO APPROVE</td>
    <td width='600'>: $row->no_app </td>
  </tr>
  <tr>
    <td width='200'>ID PROYEK</td>
    <td width='600'>: $row->kode_proyek </td>
  </tr>
  <tr>
    <td>NAMA PROYEK</td>
    <td>: $row->nama  </td>
  </tr>
  <tr>
    <td>NO KONTRAK</td>
    <td>: $row->no_pks  </td>
  </tr>
  <tr>
    <td>JENIS</td>
    <td>: $row->nama_jenis </td>
  </tr>
  <tr>
    <td>Tanggal Mulai</td>
    <td>: $row->tgl_mulai </td>
  </tr>
  <tr>
    <td>Tanggal Selesai</td>
    <td>: $row->tgl_selesai </td>
  </tr>
   <tr>
    <td>JANGKA WAKTU</td>
    <td>: $row->bulan Bulan</td>
  </tr>
  <tr>
    <td>NILAI PROYEK</td>
    <td>: ".number_format($row->nilai,0,",",".")." </td>
  </tr>
  <tr>
    <td>NILAI PPN</td>
    <td>: ".number_format($row->nilai_ppn,0,",",".")." </td>
  </tr>
  <tr>
    <td>PERSEN OR</td>
    <td>: ".number_format($row->p_or,0,",",".")." </td>
  </tr>
  <tr>
    <td>NILAI OR</td>
    <td>: ".number_format($row->nilai_or,0,",",".")."</td>
  </tr>
  <tr>
    <td>JML JADWAL</td>
    <td>: $row->jumlah </td>
  </tr>
  <tr>
    <td>DRK PENDAPATAN</td>
    <td>: $row->kode_drkp - $row->nama_drkp </td>
  </tr>
  <tr>
    <td>DRK BEBAN</td>
    <td>: $row->kode_drkb - $row->nama_drkb </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
 
  <tr>
    <td colspan='2'>Bandung, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
  </tr>
 
  <tr>
    <td>Dibuat Oleh : </td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400'>Approval Proyek</td>
        <td width='400'>&nbsp; </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nama_app</td>
        <td></td>
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
