<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_pbh_rptVer extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_ver)
		from pbh_ver_m a
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
        $sql="select a.no_ver,a.no_bukti,convert(varchar,a.tanggal,103) as tgl,a.periode,a.catatan,a.no_bukti,a.tanggal,
	   b.kode_akun,b.kode_pp,b.kode_drk,c.nama as nama_akun,f.keterangan,f.nilai,g.nama,d.nama as nama_pp,h.kota,
	   case when a.status ='1' then 'APPROVE'
			when a.status ='D' then 'APPROVE'
	   else 'RETURN' end as status ,
	   case when a.form='VERDOK' then 'VERIFIKASI DOKUMEN'
	   else 'VERIFIKASI AKUN' end as nama_ver
from pbh_ver_m a
left join pbh_pb_j b on a.no_bukti=b.no_pb and a.kode_lokasi=b.kode_lokasi and b.dc='D'
left join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi 
left join pp d on b.kode_pp=d.kode_pp and b.kode_lokasi=d.kode_lokasi
left join drk e on b.kode_drk=e.kode_drk and b.kode_lokasi=e.kode_lokasi and substring(b.periode,1,4)=e.tahun
left join pbh_pb_m f on b.no_pb=f.no_pb and b.kode_lokasi=f.kode_lokasi
left join karyawan g on a.nik_user=g.nik and a.kode_lokasi=g.kode_lokasi
inner join lokasi h on a.kode_lokasi=h.kode_lokasi
		$this->filter order by a.no_ver";
		// echo $sql;
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			// $nilai=$nilai+$row->nilai;

		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr align='center'>
    <td colspan='2' ><b>".strtoupper($row->nama_ver)."</b></td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td width='200'>No Bukti</td>
    <td width='600'>: $row->no_ver </td>
  </tr>
  <tr>
    <td>Tanggal</td>
    <td>: $row->tgl </td>
  </tr>
  <tr>
    <td>Catatan</td>
    <td>: $row->catatan </td>
  </tr>
  <tr>
    <td>Status</td>
    <td>: <b>".strtoupper($row->status)." </b></td>
  </tr>
  <tr>
    <td colspan='2'>&nbsp;</td>
  </tr>
  <tr>
    <td width='200'>No Agenda</td>
    <td width='600'>: $row->no_bukti </td>
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
    <td colspan='2'>Surabaya, ".substr($row->tanggal,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$row->tanggal),0,6))." </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td colspan='2'><table width='800' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='400'>Verifikator </td>
        <td width='400'>&nbsp;</td>
      </tr>
      <tr>
        <td height='60'>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>$row->nama</td>
        <td>&nbsp;</td>
      </tr>
    </table></td>
  </tr>
</table>";
			
		}

		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
