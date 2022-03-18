<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrRekapCust extends server_report_basic
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
		$sql="select a.kode_cust,a.kode_lokasi,a.nama,isnull(b.n01,0) as n01,isnull(b.n02,0) as n02,isnull(b.n03,0) as n03,isnull(b.n04,0) as n04,
	   isnull(b.n05,0) as n05,isnull(b.n06,0) as n06,isnull(b.n07,0) as n07,isnull(b.n08,0) as n08,isnull(b.n09,0) as n09,
	   isnull(b.n10,0) as n10,isnull(b.n11,0) as n11,isnull(b.n12,0) as n12,isnull(b.total,0) as total
from sju_cust a
left join (select b.kode_cust,a.kode_lokasi,
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
		where a.kode_lokasi='$kode_lokasi' and  SUBSTRING(c.periode,1,4)='$tahun'
		group by b.kode_cust,a.kode_lokasi
		)b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and isnull(b.total,0)>0
order by a.kode_cust ";
		
		$rs = $dbLib->execute($sql);		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap brokerage berdasarkan tertanggung",$this->lokasi,"TAHUN $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='40'  align='center' class='header_laporan'>Kode</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Tertanggung</td>
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
			$periode01=$tahun."01";
			$periode02=$tahun."02";
			$periode03=$tahun."03";
			$periode04=$tahun."04";
			$periode05=$tahun."05";
			$periode06=$tahun."06";
			$periode07=$tahun."07";
			$periode08=$tahun."08";
			$periode09=$tahun."09";
			$periode10=$tahun."10";
			$periode11=$tahun."11";
			$periode12=$tahun."12";
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>";
     echo "<td class='isi_laporan'>$row->kode_cust</td>";
	 echo "<td class='isi_laporan'>$row->nama</td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode01');\">".number_format($row->n01,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode02');\">".number_format($row->n02,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode03');\">".number_format($row->n03,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode04');\">".number_format($row->n04,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode05');\">".number_format($row->n05,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode06');\">".number_format($row->n06,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode07');\">".number_format($row->n07,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode08');\">".number_format($row->n08,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode09');\">".number_format($row->n09,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode10');\">".number_format($row->n10,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode11');\">".number_format($row->n11,0,',','.')."</a></td>";
	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$periode12');\">".number_format($row->n12,0,',','.')."</a></td>";
 	 echo "<td class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPolisCust('$row->kode_cust','$row->kode_lokasi','$tahun');\">".number_format($row->total,0,',','.')."</a></td>";
	echo "
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
