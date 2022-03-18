<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggTpkuRekap extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1  ";
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
		$tahun=$tmp[0];
	
		$sql="select a.no_kontrak,a.dokter  
,isnull(g.n1,0) as n1,isnull(g.n2,0) as n2,isnull(g.n3,0) as n3,isnull(g.n4,0) as n4,
	   isnull(g.n5,0) as n5,isnull(g.n6,0) as n6,isnull(g.n7,0) as n7,isnull(g.n8,0) as n8,isnull(g.n9,0) as n9,
isnull(n10,0) as n10,isnull(n11,0) as n11,isnull(n12,0) as n12,isnull(total,0) as total 
from (select distinct a.kode_lokasi,a.tahun,a.no_kontrak,a.dokter 	
	  from agg_tpku_d a $this->filter ) a  
left join ( 
	 select a.kode_lokasi,a.no_kontrak,a.dokter, 
	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.nilai else 0 end) as total, 	
	   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
	   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2, 
	   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3, 
	   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4, 
	   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5, 
	   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6, 
	   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7, 
	   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8, 
	   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9, 
	   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10, 
	   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11, 
	   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12 
	 from agg_tpku_d a $this->filter
	 group by a.kode_lokasi,a.no_kontrak,a.dokter 
		 )g on a.kode_lokasi=g.kode_lokasi and a.no_kontrak=g.no_kontrak and a.dokter=g.dokter 
order by a.no_kontrak,a.dokter ";
		
		$rs = $dbLib->execute($sql);
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("REKAP THP TPKU",$this->lokasi,"TAHUN $tahun");
		
		echo "<div align='center'>"; 
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='100' class='header_laporan'><div align='center'>No Kontrak </div></td>
<td width='200' class='header_laporan'><div align='center'>Dokter</div></td>
   <td width='80' class='header_laporan'><div align='center'>Januari</div></td>
    <td width='80' class='header_laporan'><div align='center'>Februari</div></td>
    <td width='80' class='header_laporan'><div align='center'>Maret</div></td>
    <td width='80' class='header_laporan'><div align='center'>April</div></td>
<td width='80' class='header_laporan'><div align='center'>Mei</div></td>
    <td width='80' class='header_laporan'><div align='center'>Juni</div></td>
    <td width='80' class='header_laporan'><div align='center'>Juli</div></td>
    <td width='80' class='header_laporan'><div align='center'>Agustus</div></td>
<td width='80' class='header_laporan'><div align='center'>September</div></td>
    <td width='80' class='header_laporan'><div align='center'>Oktober</div></td>
    <td width='80' class='header_laporan'><div align='center'>November</div></td>
    <td width='80' class='header_laporan'><div align='center'>Desember</div></td>
    <td width='90' class='header_laporan'><div align='center'>Total</div></td>
  </tr>";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;$n11=0;$n12=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$n6=$n6+$row->n6;
			$n7=$n7+$row->n7;
			$n8=$n8+$row->n8;
			$n9=$n9+$row->n9;
			$n10=$n10+$row->n10;
			$n11=$n11+$row->n11;
			$n12=$n12+$row->n12;
			$total=$total+$row->total;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->no_kontrak</td>
  <td class='isi_laporan'>$row->dokter</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
				
		echo "<tr>
    <td height='23' colspan='3' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n7,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n8,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n9,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n12,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		
		echo "</table></div>";
		return "";
	}
	
}
?>
  
