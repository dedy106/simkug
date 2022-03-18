<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptBebanFormDok extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_aju)
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter";
		
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
		$sql="select a.no_aju,a.kode_lokasi,convert(varchar(20),a.tanggal,105) as tgl,a.keterangan,a.kode_pp,b.nama as nama_pp,a.nilai,a.nik_user,a.tanggal,a.kode_akun,c.nama as nama_akun,
		a.kode_drk,e.nama as nama_drk,a.no_app,convert(varchar(20),a.tanggal,108) as tgl2,
		f.user_input,f.nik_terima,g.nama as nama_terima
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
left join drk e on a.kode_drk=e.kode_drk and a.kode_lokasi=e.kode_lokasi and e.tahun='$tahun'
inner join it_ajuapp_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
left join karyawan g on f.nik_terima=g.nik and a.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_aju";

		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr align='center'>
    <td colspan='2' ><b>TANDA TERIMA DOKUMEN</b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td width='200'>No Bukti</td>
    <td width='600'>: $row->no_app </td>
  </tr>
  <tr>
    <td width='200'>No Agenda</td>
    <td width='600'>: $row->no_aju </td>
  </tr>
  <tr>
    <td>Tanggal</td>
    <td>: $row->tgl  $row->tgl2  </td>
  </tr>
  <tr>
    <td>PP</td>
    <td>: $row->kode_pp - $row->nama_pp </td>
  </tr>
  <tr>
    <td>MTA</td>
    <td>: $row->kode_akun - $row->nama_akun </td>
  </tr>
  <tr>
    <td>DRK</td>
    <td>: $row->kode_drk - $row->nama_drk </td>
  </tr>
  <tr>
    <td>Keterangan</td>
    <td>: $row->keterangan </td>
  </tr>
  <tr>
    <td>Nilai</td>
    <td>: ".number_format($row->nilai,0,",",".")."</td>
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
        <td width='400'>Yang Menerima </td>
        <td width='400'>Yang Menyerahkan </td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nama_terima</td>
        <td>$row->user_input</td>
      </tr>
    </table></td>
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
