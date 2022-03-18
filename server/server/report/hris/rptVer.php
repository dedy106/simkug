<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptVer extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_ver)
from gr_ver_m a
inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter ";
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
		$sql="select a.no_ver,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.nik_app,b.nama,a.keterangan,a.periode,a.kode_lokasi
from gr_ver_m a
inner join gr_karyawan b on a.nik_app=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_ver";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan verifikasi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jenis=strtoupper($row->jenis);  
			echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='7' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Verifikasi </td>
        <td class='header_laporan'>:&nbsp;$row->no_ver</td>
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
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='60' align='center' class='header_laporan'>Modul</td>
    <td width='100' align='center' class='header_laporan'>No Bukti </td>
    <td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='200' align='center' class='header_laporan'>Catatan </td>
   
  </tr>
";
		
	  $sql1="select a.modul,a.no_bukti,b.keterangan,a.catatan
from gr_ver_d a
inner join (select no_absen as no_bukti,keterangan from gr_absen
	   union
	   select no_cuti as no_bukti,alasan as keterangan from gr_cuti
	   union
	   select no_lembur as no_bukti,keterangan from gr_lembur
	   union
	   select no_spj as no_bukti,keterangan from gr_spj_m
	   union
	   select no_surat as no_bukti,keterangan from gr_surat
	   union
	   select no_klaim as no_bukti,keterangan from gr_klaim_m
	   union
	   select no_kes as no_bukti,keterangan from gr_kes_m
           )b on a.no_bukti=b.no_bukti
where a.no_ver='$row->no_ver' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_ver ";
		//error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
	<td align='left' class='isi_laporan'>$row1->modul</td>
    <td align='left' class='isi_laporan'>$row1->no_bukti</td>
    <td align='left' class='isi_laporan'>$row1->keterangan</td>
    <td align='left' class='isi_laporan'>$row1->catatan</td>
     
  </tr>";
		$j=$j+1;
		}
		
	  echo " </table><br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
