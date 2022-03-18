<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptDrk extends server_report_basic
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
		$jenis=$tmp[1];
		$tahun=$tmp[2];
		$nama_file="drk.xls";
		if ($jenis=="Excell")
		{
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
		}
	
		$sql="select a.kode_drk,a.nama as nama_drk,a.kode_rkm,b.kode_program,b.nama as nama_rkm,c.nama as nama_program ,a.tahun
		from agg_drk a
		inner join agg_rkm b on a.kode_rkm=b.kode_rkm and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
		inner join agg_program c on b.kode_program=c.kode_program and b.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
		$this->filter
		order by b.kode_program,b.kode_rkm,a.kode_drk";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA DRK",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>Kode Program</td>
	  <td width='250'  align='center' class='header_laporan'>Nama Program</td>
	 <td width='80'  align='center' class='header_laporan'>Kode RKM</td>
     <td width='250'  align='center' class='header_laporan'>Nama RKM</td>
	 <td width='100'  align='center' class='header_laporan'>Kode DRK</td>
     <td width='250'  align='center' class='header_laporan'>Nama DRK </td>
	  </tr>  ";
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_program</td>
	 <td class='isi_laporan'>$row->nama_program</td>
	 <td class='isi_laporan'>$row->kode_rkm</td>
	 <td class='isi_laporan'>$row->nama_rkm</td>
	 <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->nama_drk</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='10'>Total</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
