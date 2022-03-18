<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptHonorSaldoPp extends server_report_basic
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
		$tahun=$tmp[0];
		$kode_lokasi=$tmp[1];
		$periode1=$tahun."01";
		$periode2=$tahun."02";
		$periode3=$tahun."03";
		$periode4=$tahun."04";
		$periode5=$tahun."05";
		$periode6=$tahun."06";
		$periode7=$tahun."07";
		$periode8=$tahun."08";
		$periode9=$tahun."09";
		$periode10=$tahun."10";
		$periode11=$tahun."11";
		$periode12=$tahun."12";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$sql="select a.kode_lokasi,a.kode_pp,c.nama as nama_pp,
	   ISNULL(a.n1,0) as n1,ISNULL(a.n2,0) as n2,ISNULL(a.n3,0) as n3,ISNULL(a.n4,0) as n4,
	   ISNULL(a.n5,0) as n5,ISNULL(a.n6,0) as n6,ISNULL(a.n7,0) as n7,ISNULL(a.n8,0) as n8,
	   ISNULL(a.n9,0) as n9,ISNULL(a.n10,0) as n10,ISNULL(a.n11,0) as n1,ISNULL(a.n12,0) as n12,
	   ISNULL(a.total,0) as total
from (select a.kode_pp,a.kode_lokasi,
	   sum(case when SUBSTRING(a.periode,5,2)='01' then b.nilai else 0 end) as n1,
	   sum(case when SUBSTRING(a.periode,5,2)='02' then b.nilai else 0 end) as n2,
	   sum(case when SUBSTRING(a.periode,5,2)='03' then b.nilai else 0 end) as n3,
	   sum(case when SUBSTRING(a.periode,5,2)='04' then b.nilai else 0 end) as n4,
	   sum(case when SUBSTRING(a.periode,5,2)='05' then b.nilai else 0 end) as n5,
	   sum(case when SUBSTRING(a.periode,5,2)='06' then b.nilai else 0 end) as n6,
	   sum(case when SUBSTRING(a.periode,5,2)='07' then b.nilai else 0 end) as n7,
	   sum(case when SUBSTRING(a.periode,5,2)='08' then b.nilai else 0 end) as n8,
	   sum(case when SUBSTRING(a.periode,5,2)='09' then b.nilai else 0 end) as n9,
	   sum(case when SUBSTRING(a.periode,5,2)='10' then b.nilai else 0 end) as n10,
	   sum(case when SUBSTRING(a.periode,5,2)='11' then b.nilai else 0 end) as n11,
	   sum(case when SUBSTRING(a.periode,5,2)='12' then b.nilai else 0 end) as n12,
	   sum(b.nilai) as total
from it_aju_m a
inner join it_aju_rek b on a.kode_lokasi=b.kode_lokasi and a.no_aju=b.no_aju
inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and substring(c.periode,1,4)='$tahun' and b.keterangan<>'-' and a.no_kas<>'-' and a.form in ('HONOR')
group by a.kode_pp,a.kode_lokasi 
		)a
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.kode_pp";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo bulanan honor dosen",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1300'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	  <td width='50'  align='center' class='header_laporan'>Kode PP</td>
     <td width='150'  align='center' class='header_laporan'>Nama PP</td>
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
	 <td width='100'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
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
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
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
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
