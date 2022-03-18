<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_medrec_rptRjtpKlpBiaya extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select 1";
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
		$periode=$tmp[0];
		$tahun=substr($periode,0,4);
		$sql="select a.kode_klp,a.awal,a.akhir,isnull(b.n1,0) as n1,isnull(b.n2,0) as n2,isnull(b.n3,0) as n3,isnull(b.n4,0) as n4,isnull(b.n5,0) as n5,
	   isnull(b.n6,0) as n6,isnull(b.n7,0) as n7,isnull(b.n8,0) as n8,isnull(b.n9,0) as n9,isnull(b.n10,0) as n10,isnull(b.n11,0) as n11,
	   isnull(b.n12,0) as n12, isnull(b.n13,0) as n13,isnull(b.total,0) as total
from dbexs.dbo.exs_klp_biaya a
left join (select b.kode_klp,
				sum(case when substring(a.periode,5,2)='01' then 1 else 0 end) as n1,
				sum(case when substring(a.periode,5,2)='02' then 1 else 0 end) as n2,
				sum(case when substring(a.periode,5,2)='03' then 1 else 0 end) as n3,
				sum(case when substring(a.periode,5,2)='04' then 1 else 0 end) as n4,
				sum(case when substring(a.periode,5,2)='05' then 1 else 0 end) as n5,
				sum(case when substring(a.periode,5,2)='06' then 1 else 0 end) as n6,
				sum(case when substring(a.periode,5,2)='07' then 1 else 0 end) as n7,
				sum(case when substring(a.periode,5,2)='08' then 1 else 0 end) as n8,
				sum(case when substring(a.periode,5,2)='09' then 1 else 0 end) as n9,
				sum(case when substring(a.periode,5,2)='10' then 1 else 0 end) as n10,
				sum(case when substring(a.periode,5,2)='11' then 1 else 0 end) as n11,
				sum(case when substring(a.periode,5,2)='12' then 1 else 0 end) as n12,
				sum(case when substring(a.periode,5,2)='13' then 1 else 0 end) as n13,
				sum(case when substring(a.periode,5,2) between '01' and '13' then 1 else 0 end) as total
			FROM dbexs.dbo.exs_harian a
			left join dbexs.dbo.exs_klp_biaya b on a.n21 between b.awal and b.akhir
			$this->filter
			group by b.kode_klp
		  )b on a.kode_klp=b.kode_klp
order by a.kode_klp
";
		
		$rs = $dbLib->execute($sql);
		$i=1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("realisasi biaya pengobatan RJTP",$this->lokasi,"TAHUN ".$tahun);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#B9FFCF'>
<td width='200' height='25'  class='header_laporan' align='center'>URAIAN</td>
<td width='40' class='header_laporan' align='center'> KODE</td>
    <td width='60' class='header_laporan' align='center'>Januari</td>
    <td width='60' class='header_laporan' align='center'>Februari</td>
    <td width='60' class='header_laporan' align='center'>Maret</td>
    <td width='60' class='header_laporan' align='center'>April</td>
<td width='60' class='header_laporan' align='center'>Mei</td>
    <td width='60' class='header_laporan' align='center'>Juni</td>
    <td width='60' class='header_laporan' align='center'>Juli</td>
    <td width='60' class='header_laporan' align='center'>Agustus</td>
<td width='60' class='header_laporan' align='center'>September</td>
    <td width='60' class='header_laporan' align='center'>Oktober</td>
    <td width='60' class='header_laporan' align='center'>November</td>
    <td width='60' class='header_laporan' align='center'>Desember 1</td>
	 <td width='60' class='header_laporan' align='center'>Desember 2</td>
  <td width='60' class='header_laporan' align='center'>Total</td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;$n11=0;$n12=0;$n13=0;$total=0;
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
			$n13=$n13+$row->n13;
			$total=$total+$row->total;
			echo "<tr>
  <td class='isi_laporan' align='center'>".number_format($row->awal,0,',','.')." sd ".number_format($row->akhir,0,',','.')."</td>
  <td class='isi_laporan' align='center'>$row->kode_klp</td>
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
   <td class='isi_laporan' align='right'>".number_format($row->n13,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
				
		echo "<tr>
    <td height='23' colspan='2' align='right' class='isi_laporan'>Total&nbsp;</td>
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
	 <td class='isi_laporan' align='right'>".number_format($n13,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		
		echo "</table></div>";
		return "";
		
	}
	
	
}

