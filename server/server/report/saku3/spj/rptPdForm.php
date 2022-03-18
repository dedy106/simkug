<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptPdForm extends server_report_basic
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
	$sql="select a.no_aju,a.kode_lokasi,a.no_dokumen,a.nik,a.kode_pp,b.nama as nama_pp,c.nama,a.tempat,a.keterangan,
convert(varchar,a.tgl_awal,103) as tgl_awal,b.kode_bidang,d.nama as nama_bidang,
convert(varchar,a.tgl_akhir,103) as tgl_akhir,c.grade
from pdss_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik=c.nik and a.kode_lokasi=c.kode_lokasi
inner join bidang d on b.kode_bidang=d.kode_bidang 
$this->filter 
order by a.no_aju";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='600' border='0' cellspacing='2' cellpadding='2'>
  <tr align='center'>
    <td colspan='2' ><b>PENGAJUAN PERJALANAN DINAS</b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td width='141'>No Bukti</td>
    <td width='449'>: $row->no_aju </td>
  </tr>
   <tr>
    <td width='141'>No Dokumen</td>
    <td width='449'>: $row->no_dokumen </td>
  </tr>
   <tr>
    <td>NIK</td>
    <td>: $row->nik</td>
  </tr>
   <tr>
    <td>Nama</td>
    <td>: $row->nama</td>
  </tr>
  <tr>
    <td>Band</td>
    <td>: $row->grade</td>
  </tr>
  <tr>
    <td>Tanggal</td>
    <td>: $row->tgl_awal Sd $row->tgl_akhir</td>
  </tr>
  <tr>
    <td>PP</td>
    <td>: $row->kode_pp - $row->nama_pp </td>
  </tr>
  <tr>
    <td>Bidang</td>
    <td>: $row->nama_bidang </td>
  </tr>
  <tr>
    <td>Tempat</td>
    <td>: $row->tempat</td>
  </tr>
   <tr>
    <td>Keterangan</td>
    <td>: $row->keterangan </td>
  </tr>
 
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
 
  
</table><br>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
