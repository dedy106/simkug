<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptDrkNilai extends server_report_basic
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
		$sql="select a.kode_drk,c.nama as nama_drk,a.kode_pp,b.nama as nama_pp,a.tahun,a.kode_lokasi,c.nama as nama_drk,
	   c.kode_rkm,d.kode_program,b.nama as nama_rkm,c.nama as nama_rkm ,e.nama as nama_program,isnull(a.total,0) as total
from (select a.kode_drk,a.kode_pp,a.kode_lokasi,substring(a.periode,1,4) as tahun,sum(a.total) as total
from agg_d a
where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='$tahun' and a.total<>0
group by a.kode_drk,a.kode_pp,a.kode_lokasi,substring(a.periode,1,4)
	) a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
left join agg_drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun 
left join agg_rkm d on c.kode_rkm=d.kode_rkm and c.kode_lokasi=d.kode_lokasi and c.tahun=d.tahun
left join agg_program e on d.kode_program=e.kode_program and d.kode_lokasi=e.kode_lokasi and d.tahun=e.tahun
$this->filter
order by a.kode_pp,d.kode_program,c.kode_rkm,a.kode_drk ";
	
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA DRK / ACTION PLAN",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='200'  align='center' class='header_laporan'>Nama PP</td>
     <td width='100'  align='center' class='header_laporan'>Kode Program</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Program</td>
	 <td width='120'  align='center' class='header_laporan'>Kode RKM</td>
     <td width='200'  align='center' class='header_laporan'>Nama RKM</td>
	 <td width='100'  align='center' class='header_laporan'>Kode DRK</td>
     <td width='250'  align='center' class='header_laporan'>Nama DRK / Action Plan</td>
     <td width='60'  align='center' class='header_laporan'>Tahun</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	  </tr>  ";
		$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
     <td class='isi_laporan'>$row->kode_program</td>
	 <td class='isi_laporan'>$row->nama_program</td>
	 <td class='isi_laporan'>$row->kode_rkm</td>
	 <td class='isi_laporan'>$row->nama_rkm</td>
	 <td class='isi_laporan'>$row->kode_drk</td>
	 <td class='isi_laporan'>$row->nama_drk</td>
	 <td class='isi_laporan'>$row->tahun</td>
	 <td class='header_laporan' align='right'>".number_format($row->total,2,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='10'>Total</td>
	 <td class='header_laporan' align='right'>".number_format($total,2,',','.')."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
