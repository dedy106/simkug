<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrRekapLok extends server_report_basic
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
		$sql="select a.kode_lokasi,d.nama,
	   sum(case when substring(c.periode,5,2)='01' then a.fee*a.kurs else 0 end) as n01,
	   sum(case when substring(c.periode,5,2)='02' then a.fee*a.kurs else 0 end) as n02,
	   sum(case when substring(c.periode,5,2)='03' then a.fee*a.kurs else 0 end) as n03,
	   sum(case when substring(c.periode,5,2)='04' then a.fee*a.kurs else 0 end) as n04,
	   sum(case when substring(c.periode,5,2)='05' then a.fee*a.kurs else 0 end) as n05,
	   sum(case when substring(c.periode,5,2)='06' then a.fee*a.kurs else 0 end) as n06,
	   sum(case when substring(c.periode,5,2)='07' then a.fee*a.kurs else 0 end) as n07,
	   sum(case when substring(c.periode,5,2)='08' then a.fee*a.kurs else 0 end) as n08,
	   sum(case when substring(c.periode,5,2)='09' then a.fee*a.kurs else 0 end) as n09,
	   sum(case when substring(c.periode,5,2)='10' then a.fee*a.kurs else 0 end) as n10,
	   sum(case when substring(c.periode,5,2)='11' then a.fee*a.kurs else 0 end) as n11,
	   sum(case when substring(c.periode,5,2)='12' then a.fee*a.kurs else 0 end) as n12,
	   sum(a.fee*a.kurs) as total
from sju_polis_termin a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_bill_m c on a.no_bill=c.no_bill and a.kode_lokasi=c.kode_lokasi
inner join lokasi d on a.kode_lokasi=d.kode_lokasi 
where SUBSTRING(c.periode,1,4)='$tahun'
group by a.kode_lokasi,d.nama
order by a.kode_lokasi ";
		
		$rs = $dbLib->execute($sql);		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap brokerage berdasarkan lokasi",$this->lokasi,"TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='40'  align='center' class='header_laporan'>Kode</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Cabang</td>
	 <td width='90'  align='center' class='header_laporan'>Januari</td>
     <td width='90'  align='center' class='header_laporan'>Februari</td>
     <td width='90'  align='center' class='header_laporan'>Maret</td>
     <td width='90'  align='center' class='header_laporan'>April</td>
	 <td width='90'  align='center' class='header_laporan'>Mei</td>
	 <td width='90'  align='center' class='header_laporan'>Juni</td>
     <td width='90'  align='center' class='header_laporan'>Juli</td>
     <td width='90'  align='center' class='header_laporan'>Agustus</td>
     <td width='90'  align='center' class='header_laporan'>September</td>
	 <td width='90'  align='center' class='header_laporan'>Oktober</td>
	  <td width='90'  align='center' class='header_laporan'>November</td>
	 <td width='90'  align='center' class='header_laporan'>Desember</td>
	  <td width='90'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
		$n01=0;$n02=0;$n03=0;$n04=0;$n05=0;$n06=0;$n07=0;$n08=0;$n09=0;$n10=0;$n11=0;$n12=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n01+=$row->n01;
			$n02+=$row->n02;
			$n03+=$row->n03;
			$n04+=$row->n04;
			$n05+=$row->n05;
			$n06+=$row->n06;
			$n07+=$row->n07;
			$n08+=$row->n08;
			$n09+=$row->n09;
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
      echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisList('$row->kode_lokasi');\">$row->kode_lokasi</a></td>";
	  echo "<td class='isi_laporan'>$row->nama</td>
 	<td class='isi_laporan' align='right'>".number_format($row->n01,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n02,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n03,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n04,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n05,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n06,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n07,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n08,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n09,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='isi_laporan' align='center' colspan='3'>Total</td>
    
 	<td class='isi_laporan' align='right'>".number_format($n01,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n02,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n03,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n04,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n05,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n06,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n07,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n08,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n09,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n11,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n12,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td></tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
