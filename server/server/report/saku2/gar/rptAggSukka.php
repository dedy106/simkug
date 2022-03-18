<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_gar_rptAggSukka extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_sukka)
from rra_sukka a
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
		$sql="select a.no_sukka,convert(varchar,a.tanggal,103) as tanggal,a.keterangan,a.kode_lokasi,a.uraian
from rra_sukka a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi $this->filter order by a.no_sukka";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		//echo $AddOnLib->judul_laporan("laporan sukka",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<div align='center'>"; 
		$jenis="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo urldecode($row->uraian)."<br>";
			
			$i=$i+1;
		}
		echo "</div>";
			
		return "";
	}
	
}
?>
  
