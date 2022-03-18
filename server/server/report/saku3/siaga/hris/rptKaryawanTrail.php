<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_rptKaryawanTrail extends server_report_basic
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
		$sts_sdm=$tmp[0];
		$kode_lokasi=$tmp[1];
		$periode=$tmp[2];
		$jenis=$tmp[3];
		$tmp_sql="";
	
		if ($jenis=="sawal")
		{
			$tmp_sql="select a.nik 
from gr_karyawan_d a
inner join gr_karyawan b on a.nik=b.nik
where dbo.fnPeriode(a.tanggal)<'$periode' and a.sts_sk='SK1' and b.sts_sdm='$sts_sdm' 
and a.nik not in (select nik from gr_karyawan_d
where dbo.fnPeriode(tanggal)<'$periode' and sts_sk='SK12')";
		}
		if ($jenis=="masuk")
		{
			$tmp_sql="select a.nik 
from gr_karyawan_d a
inner join gr_karyawan b on a.nik=b.nik
where dbo.fnPeriode(a.tanggal)='$periode' and a.sts_sk='SK1' and b.sts_sdm='$sts_sdm' ";
		}
		if ($jenis=="keluar")
		{
			$tmp_sql="select a.nik 
from gr_karyawan_d a
inner join gr_karyawan b on a.nik=b.nik
where dbo.fnPeriode(a.tanggal)='$periode' and a.sts_sk='SK12' and b.sts_sdm='$sts_sdm'";
		}
		if ($jenis=="sakhir")
		{
			$tmp_sql="select a.nik 
from gr_karyawan_d a
inner join gr_karyawan b on a.nik=b.nik
where dbo.fnPeriode(a.tanggal)<='$periode' and a.sts_sk='SK1' and b.sts_sdm='$sts_sdm' 
and a.nik not in (select nik from gr_karyawan_d
where dbo.fnPeriode(tanggal)<='$periode' and sts_sk='SK12')";
		}
		$sql="select a.nik,a.nama,a.kode_grade,b.nama as loker,c.nama as jab,d.nama as dept,e.nama as dir,f.nama as status_sdm 
from ($tmp_sql)g
inner join gr_karyawan a on g.nik=a.nik 
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi 
inner join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi 
inner join gr_dept d on a.kode_dept=d.kode_dept and a.kode_lokasi=d.kode_lokasi 
inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi  
inner join gr_status_sdm f on a.sts_sdm=f.sts_sdm and a.kode_lokasi=f.kode_lokasi 
order by a.nik";
		
		$rs=$dbLib->execute($sql);
		$i = 1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("Karyawan ".$nama_loker,"","");
		echo "<div align='center'>"; 
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan'>No</td>
    <td width='60' height='25' class='header_laporan'>NIK</td>
    <td width='200' class='header_laporan'>Nama</td>
    <td width='100' class='header_laporan'>Status</td>
    <td width='40' class='header_laporan'>Grade</td>
    <td width='200' class='header_laporan'>Direktorat</td>
    <td width='200' class='header_laporan'>Departemen</td>
    <td width='200' class='header_laporan'>Loker</td>
    <td width='200' class='header_laporan'>Jabatan</td>
  </tr>";
		$nilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;  
			$nama_buat=$row->nama_buat;
      echo "<tr>
	<td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDoc2('$row->nik');\">$row->nama</a></td>
    <td class='isi_laporan'>$row->status_sdm</td>
    <td class='isi_laporan'>$row->kode_grade</td>
    <td class='isi_laporan'>$row->dir</td>
    <td class='isi_laporan'>$row->dept</td>
    <td class='isi_laporan'>$row->loker</td>
    <td class='isi_laporan'>$row->jab</td>
  </tr>";
      
			
			$i=$i+1;
		}
		
		echo "</table></div>";
			
		return "";
	}
	
}
?>
  
