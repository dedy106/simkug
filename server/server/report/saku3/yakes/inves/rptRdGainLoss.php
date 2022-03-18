<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRdGainLoss extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
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
		$tahun=$tmp[0];
		$nama_cab=$tmp[1];
		
		
		$sql="select a.kode_rd,b.nama as nama_saham,b.kode_rdkelola,c.nama as nama_kelola,
	   isnull(d.n01,0) as n01,isnull(d.n02,0) as n02,isnull(d.n03,0) as n03,isnull(d.n04,0) as n04,
	   isnull(d.n05,0) as n05,isnull(d.n06,0) as n06,isnull(d.n07,0) as n07,isnull(d.n08,0) as n08,
	   isnull(d.n09,0) as n09,isnull(d.n10,0) as n10,isnull(d.n11,0) as n11,isnull(d.n12,0) as n12,isnull(d.total,0) as total1,

	   isnull(e.d01,0) as d01,isnull(e.d02,0) as d02,isnull(e.d03,0) as d03,isnull(e.d04,0) as d04,
	   isnull(e.d05,0) as d05,isnull(e.d06,0) as d06,isnull(e.d07,0) as d07,isnull(e.d08,0) as d08,
	   isnull(e.d09,0) as d09,isnull(e.d10,0) as d10,isnull(e.d11,0) as d11,isnull(e.d12,0) as d12,isnull(e.total,0) as total2

from inv_rd_d a
inner join inv_rd b on a.kode_rd=b.kode_rd 
inner join inv_rdkelola c on b.kode_rdkelola=c.kode_rdkelola 
left join (select b.kode_rdkelola,b.kode_rd,
		    sum(case when substring(a.periode,5,2)='01' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n01,
			sum(case when substring(a.periode,5,2)='02' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n02,
			sum(case when substring(a.periode,5,2)='03' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n03,
			sum(case when substring(a.periode,5,2)='04' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n04,
			sum(case when substring(a.periode,5,2)='05' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n05,
			sum(case when substring(a.periode,5,2)='06' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n06,
			sum(case when substring(a.periode,5,2)='07' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n07,
			sum(case when substring(a.periode,5,2)='08' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n08,
			sum(case when substring(a.periode,5,2)='09' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n09,
			sum(case when substring(a.periode,5,2)='10' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n10,
			sum(case when substring(a.periode,5,2)='11' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n11,
			sum(case when substring(a.periode,5,2)='12' then b.gainlos-b.komisi-b.vat-b.levi else 0 end) as n12,
			sum(b.gainlos-b.komisi-b.vat-b.levi) as total
		from inv_rdjual_m a
		inner join inv_rdjual_d b on a.no_rdjual=b.no_rdjual
		where substring(a.periode,1,4)='$tahun'
		group by b.kode_rdkelola,b.kode_rd
		)d on a.kode_rd=d.kode_rd and b.kode_rdkelola=d.kode_rdkelola 
		
		left join (select a.kode_plan,a.kode_rdkelola,b.kode_rd,
		sum(case when substring(a.periode,5,2)='01' then b.nilai_dev else 0 end) as d01,
		 sum(case when substring(a.periode,5,2)='02' then b.nilai_dev else 0 end) as d02,
		 sum(case when substring(a.periode,5,2)='03' then b.nilai_dev else 0 end) as d03,
		 sum(case when substring(a.periode,5,2)='04' then b.nilai_dev else 0 end) as d04,
		 sum(case when substring(a.periode,5,2)='05' then b.nilai_dev else 0 end) as d05,
		 sum(case when substring(a.periode,5,2)='06' then b.nilai_dev else 0 end) as d06,
		 sum(case when substring(a.periode,5,2)='07' then b.nilai_dev else 0 end) as d07,
		 sum(case when substring(a.periode,5,2)='08' then b.nilai_dev else 0 end) as d08,
		 sum(case when substring(a.periode,5,2)='09' then b.nilai_dev else 0 end) as d09,
		 sum(case when substring(a.periode,5,2)='10' then b.nilai_dev else 0 end) as d10,
		 sum(case when substring(a.periode,5,2)='11' then b.nilai_dev else 0 end) as d11,
		 sum(case when substring(a.periode,5,2)='12' then b.nilai_dev else 0 end) as d12,
		 sum(b.nilai_dev) as total
	 from  inv_rddev_m a
	 inner join  inv_rddev_d b on a.no_rddev=b.no_rddev
	 where substring(a.periode,1,4)='$tahun'
	 group by a.kode_rdkelola,b.kode_rd,a.kode_plan
	 ) e on a.kode_rd=e.kode_rd and b.kode_rdkelola=e.kode_rdkelola and a.kode_plan=e.kode_plan

	$this->filter  and  (isnull(d.total,0)<>0 or isnull(e.total,0)<>0) and a.kode_plan='1' order by b.kode_rdkelola,a.kode_rd
";
	//echo $sql;
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan reksadana gainloss dan deviden",$this->lokasi,"TAHUN $tahun");
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='1400'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Kode </td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Nama Perusahaan</td>
	 <td width='60' rowspan='2' align='center' class='header_laporan'>Kode Kelola </td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama Nama Kelola</td>
	<td colspan='2'  align='center' class='header_laporan'>Januari</td>
	<td colspan='2' align='center' class='header_laporan'>Februari</td>
    <td colspan='2' align='center' class='header_laporan'>Maret</td>
    <td colspan='2' align='center' class='header_laporan'>April</td>
	<td colspan='2' align='center' class='header_laporan'>Mei</td>
	<td colspan='2' align='center' class='header_laporan'>Juni</td>
	<td colspan='2' align='center' class='header_laporan'>Juli</td>
	<td colspan='2' align='center' class='header_laporan'>Agustus</td>
	<td colspan='2' align='center' class='header_laporan'>September</td>
	<td colspan='2' align='center' class='header_laporan'>Oktober</td>
	<td colspan='2' align='center' class='header_laporan'>November</td>
	<td colspan='2' align='center' class='header_laporan'>Desember</td>
	<td colspan='2' align='center' class='header_laporan'>Total</td>
	</tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90'  align='center' class='header_laporan'>Gainloss</td>
    <td width='90'  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
    <td  align='center' class='header_laporan'>Gainloss</td>
    <td  align='center' class='header_laporan'>Deviden</td>
  </tr>
  
 ";
		$n01=0;$n02=0;$n03=0;$n04=0;$n05=0;$n06=0;$n07=0;$n08=0;$n09=0;$n10=0;$n11=0;$n12=0;$total1=0;
		$d01=0;$d02=0;$d03=0;$d04=0;$d05=0;$d06=0;$d07=0;$d08=0;$d09=0;$d10=0;$d11=0;$d12=0;$total2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n01=$n01+$row->n01;
			$n02=$n02+$row->n02;
			$n03=$n03+$row->n03;
			$n04=$n04+$row->n04;
			$n05=$n05+$row->n05;
			$n06=$n06+$row->n06;
			$n07=$n07+$row->n07;
			$n08=$n08+$row->n08;
			$n09=$n09+$row->n09;
			$n10=$n10+$row->n10;
			$n11=$n11+$row->n11;
			$n12=$n12+$row->n12;
			$total1=$total1+$row->total1;
			$d01=$d01+$row->d01;
			$d02=$d02+$row->d02;
			$d03=$d03+$row->d03;
			$d04=$d04+$row->d04;
			$d05=$d05+$row->d05;
			$d06=$d06+$row->d06;
			$d07=$d07+$row->d07;
			$d08=$d08+$row->d08;
			$d09=$d09+$row->d09;
			$d10=$d10+$row->d10;
			$d11=$d11+$row->d11;
			$d12=$d12+$row->d12;
			$total2=$total2+$row->total2;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_rd</td>
	 <td class='isi_laporan'>$row->nama_saham</td>
	 <td class='isi_laporan'>$row->kode_rdkelola</td>
	 <td class='isi_laporan'>$row->nama_kelola</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->d12,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->total1,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->total2,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
		<td class='header_laporan' align='center' colspan='5'>Total</td>
     <td class='isi_laporan' align='right'>".number_format($n01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d01,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d02,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d03,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d04,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d05,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d06,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d07,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d08,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d09,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($n12,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($d12,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total1,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
	    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
