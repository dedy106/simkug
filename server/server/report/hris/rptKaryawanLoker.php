<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_hris_rptKaryawanLoker extends server_report_basic
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
		$tmp=explode("/",$this->filter);
		$kode_loker=$tmp[0];
		$nama_loker=strtoupper($tmp[1]);
		$periode=$tmp[2];
		
		$tgl_masuk="";
		if ($periode!="")
		{
			$tgl_masuk=" and substring(convert(varchar,a.tgl_masuk,103),7,4)+substring(convert(varchar,a.tgl_masuk,103),4,2) <= '$periode' ";
		}
		$sql="select a.nik,a.nama,a.kode_grade,b.nama as loker,c.nama as jab,d.nama as dept,e.nama as dir,f.nama as status_sdm 
from gr_karyawan a 
inner join gr_loker b on a.kode_loker=b.kode_loker and a.kode_lokasi=b.kode_lokasi 
inner join gr_jab c on a.kode_jab=c.kode_jab and a.kode_lokasi=c.kode_lokasi 
inner join gr_dept d on a.kode_dept=d.kode_dept and a.kode_lokasi=d.kode_lokasi 
inner join gr_dir e on a.kode_dir=e.kode_dir and a.kode_lokasi=e.kode_lokasi  
inner join gr_status_sdm f on a.sts_sdm=f.sts_sdm and a.kode_lokasi=f.kode_lokasi 
inner join gr_klpjab g on c.kode_klpjab=g.kode_klpjab and c.kode_lokasi=g.kode_lokasi 
inner join gr_komp h on c.kode_komp=h.kode_komp and c.kode_lokasi=h.kode_lokasi 
inner join gr_relaloker k on a.kode_loker=k.kode_loker and a.kode_lokasi=k.kode_lokasi $kode_loker and a.flag_aktif='0' $tgl_masuk
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
  
