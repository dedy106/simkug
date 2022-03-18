<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptAggParamNilai extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$sql="select a.kode_angkat,a.kode_param,d.nama as nama_param,a.tahun,c.kode_akun,c.nama as nama_akun,b.kode_drk,b.nama  as nama_drk,a.tarif 
from agg_param_tarif a 
inner join agg_drk b on a.kode_drk=b.kode_drk and a.tahun=b.tahun and a.kode_lokasi=b.kode_lokasi 
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 					 
inner join agg_param_klp d on a.kode_param=d.kode_param and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun 						 
$this->filter
order by a.kode_angkat,a.kode_param ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA PARAMETER PENDAPATAN",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	  <td width='80'  align='center' class='header_laporan'>Kode Angkatan</td>
	  <td width='60'  align='center' class='header_laporan'>Tahun</td>
     <td width='60'  align='center' class='header_laporan'>Kode Param</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Param</td>
	  <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
	  <td width='120'  align='center' class='header_laporan'>Kode DRK</td>
	   <td width='200'  align='center' class='header_laporan'>Nama DRK</td>
	  <td width='90'  align='center' class='header_laporan'>Tarif</td>
	  </tr>  ";
		$n_max=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n_max+=$row->n_max;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_angkat</td>
	 <td class='isi_laporan'>$row->tahun</td>
	  <td class='isi_laporan'>$row->kode_param</td>
	 <td class='isi_laporan'>$row->nama_param</td>
	  <td class='isi_laporan'>$row->kode_akun</td>
	  <td class='isi_laporan'>$row->nama_akun</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	  <td class='isi_laporan'>$row->kode_drk</td>
	  <td class='isi_laporan' align='right'>".number_format($row->tarif,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
