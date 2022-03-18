<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_siaga_rptAggApp extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_app)
from rra_app_m a
inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$sql="select a.no_app,convert(varchar,a.tanggal,103) as tanggal,a.modul,a.nik_app,b.nama,a.keterangan,a.periode,a.kode_lokasi
from rra_app_m a
inner join karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_app";
		
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan approval pengajuan redis",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table width='900'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td align='center'><table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='13' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Verifikasi </td>
        <td class='header_laporan'>:&nbsp;$row->no_app</td>
        </tr>
	    <tr>
        <td class='header_laporan'>NIK Approve </td>
        <td class='header_laporan'>:&nbsp;$row->nik_app - $row->nama</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	  <tr>
        <td class='header_laporan'>Modul   </td>
        <td class='header_laporan'>:&nbsp;$row->modul</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='10' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>No Bukti </td>
    <td width='150' align='center' class='header_laporan'>Catatan </td>
	<td width='60' align='center' class='header_laporan'>Tanggal</td>
   <td width='150' align='center' class='header_laporan'>Keterangan</td>
	<td width='150' align='center' class='header_laporan'>Kode PP</td>
	<td width='150' align='center' class='header_laporan'>Nama PP</td>
	<td width='150' align='center' class='header_laporan'>Status </td>
	
  </tr>
";
		
	  $sql1="select a.modul,a.no_bukti,a.catatan,convert(varchar,b.tanggal,103) as tanggal,b.keterangan,
       b.nik_buat,b.kode_pp,c.nama as nama_pp,a.sts_pdrk
from rra_app_d a
inner join rra_pdrk_m b on a.no_bukti=b.no_pdrk and b.kode_lokasi=a.kode_lokbukti
inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi 
inner join karyawan d on b.nik_buat=d.nik and b.kode_lokasi=d.kode_lokasi 
where a.no_app='$row->no_app' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_bukti ";
		
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='left' class='isi_laporan'>$row1->no_bukti</td>
    <td align='left' class='isi_laporan'>$row1->catatan</td>
	<td align='left' class='isi_laporan'>$row1->tanggal</td>
	<td align='left' class='isi_laporan'>$row1->keterangan</td>
	<td align='left' class='isi_laporan'>$row1->kode_pp</td>
	<td align='left' class='isi_laporan'>$row1->nama_pp</td>
	<td align='left' class='isi_laporan'>$row1->sts_pdrk</td>
	
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table></td>
  </tr>
 
</table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
