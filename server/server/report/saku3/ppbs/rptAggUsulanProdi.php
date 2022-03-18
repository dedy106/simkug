<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptAggUsulanProdi extends server_report_basic
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
		$sql="select  a.kode_pp,a.tahun,a.kode_lokasi,b.nama as nama_pp,isnull(a.genap,0) as genap,isnull(a.ganjil,0) as ganjil
from (select a.kode_pp,a.tahun,a.kode_lokasi,
	   sum(case when (substring(kode_param,1,1)='B' and substring(kode_param,4,1)='1') then a.jumlah else 0 end) as ganjil,
	   sum(case when (substring(kode_param,1,1)='B' and substring(kode_param,4,1)='2') then a.jumlah else 0 end) as genap
from agg_rev_d a
$this->filter
group by a.kode_pp,a.tahun,a.kode_lokasi
	)a
inner join agg_pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi and a.tahun=b.tahun
order by a.kode_pp";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan student bodi",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	  <td width='60'  align='center' class='header_laporan'>Kode PP</td>
     <td width='300'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Tahun</td>
	 <td width='100'  align='center' class='header_laporan'>Genap</td>
	  <td width='100'  align='center' class='header_laporan'>Ganjil</td>
	  </tr>  ";
		$genap=0; $ganjil=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$genap+=$row->genap;
			$ganjil+=$row->ganjil;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->tahun</td>
	  <td class='isi_laporan' align='right'>".number_format($row->genap,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->ganjil,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='4'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($genap,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($ganjil,0,',','.')."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
