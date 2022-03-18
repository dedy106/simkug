<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptAggBulan extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select 1 ";
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
		$trail=$tmp[1];
		
		$sql=" select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,
			 isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,
			 isnull(e.agg_05,0) as n5,isnull(e.agg_06,0) as n6,isnull(e.agg_07,0) as n7,isnull(e.agg_08,0) as n8,
			 isnull(e.agg_09,0) as n9,isnull(e.agg_10,0) as n10,isnull(e.agg_11,0) as n11,isnull(e.agg_12,0) as n12,isnull(e.total,0) as total
	  from (select x.kode_lokasi,x.kode_akun,x.kode_pp
			from anggaran_d x
			inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi 
			$this->filter
			group by x.kode_lokasi,x.kode_akun,x.kode_pp) a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
	  left join (select x.kode_lokasi,x.kode_akun,x.kode_pp
						  , sum(case when substring(x.periode,5,2) between '01' and '01' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_01
						, sum(case when substring(x.periode,5,2) between '02' and '02' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_02
						, sum(case when substring(x.periode,5,2) between '03' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_03
						, sum(case when substring(x.periode,5,2) between '04' and '04' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_04
						, sum(case when substring(x.periode,5,2) between '05' and '05' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_05
						, sum(case when substring(x.periode,5,2) between '06' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_06
						, sum(case when substring(x.periode,5,2) between '07' and '07' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_07
						, sum(case when substring(x.periode,5,2) between '08' and '08' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_08
						, sum(case when substring(x.periode,5,2) between '09' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_09
						, sum(case when substring(x.periode,5,2) between '10' and '10' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_10
						, sum(case when substring(x.periode,5,2) between '11' and '11' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_11
						, sum(case when substring(x.periode,5,2) between '12' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_12
						, sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
				 from anggaran_d x
				 inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi 
				 $this->filter
				 group by x.kode_lokasi,x.kode_akun,x.kode_pp
				 ) e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
				 order by a.kode_akun ";
		
		if ($trail=="1")
		{
			$sql=" select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,
			 isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,
			 isnull(e.agg_05,0) as n5,isnull(e.agg_06,0) as n6,isnull(e.agg_07,0) as n7,isnull(e.agg_08,0) as n8,
			 isnull(e.agg_09,0) as n9,isnull(e.agg_10,0) as n10,isnull(e.agg_11,0) as n11,isnull(e.agg_12,0) as n12,isnull(e.total,0) as total
	  from (select x.kode_lokasi,x.kode_akun,x.kode_pp
			from anggaran_d x
			inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			inner join relakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi $this->filter
			group by x.kode_lokasi,x.kode_akun,x.kode_pp
			) a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
	  left join (select x.kode_lokasi,x.kode_akun,x.kode_pp
						  , sum(case when substring(x.periode,5,2) between '01' and '01' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_01
						, sum(case when substring(x.periode,5,2) between '02' and '02' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_02
						, sum(case when substring(x.periode,5,2) between '03' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_03
						, sum(case when substring(x.periode,5,2) between '04' and '04' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_04
						, sum(case when substring(x.periode,5,2) between '05' and '05' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_05
						, sum(case when substring(x.periode,5,2) between '06' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_06
						, sum(case when substring(x.periode,5,2) between '07' and '07' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_07
						, sum(case when substring(x.periode,5,2) between '08' and '08' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_08
						, sum(case when substring(x.periode,5,2) between '09' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_09
						, sum(case when substring(x.periode,5,2) between '10' and '10' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_10
						, sum(case when substring(x.periode,5,2) between '11' and '11' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_11
						, sum(case when substring(x.periode,5,2) between '12' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_12
						, sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
				 from anggaran_d x
				   inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
				   inner join relakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi 
				   $this->filter
				 group by x.kode_lokasi,x.kode_akun,x.kode_pp
				 ) e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
				 order by a.kode_akun ";
		}
		if ($trail=="2")
		{
			$sql=" select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,
			 isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,
			 isnull(e.agg_05,0) as n5,isnull(e.agg_06,0) as n6,isnull(e.agg_07,0) as n7,isnull(e.agg_08,0) as n8,
			 isnull(e.agg_09,0) as n9,isnull(e.agg_10,0) as n10,isnull(e.agg_11,0) as n11,isnull(e.agg_12,0) as n12,isnull(e.total,0) as total
	  from (select x.kode_lokasi,x.kode_akun,x.kode_pp
			from anggaran_d x
			inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			inner join relakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
			inner join konsol_relasi a on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi
			$this->filter
			group by x.kode_lokasi,x.kode_akun,x.kode_pp
			) a
	  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	  left join (select x.kode_lokasi,x.kode_akun,x.kode_pp
						  , sum(case when substring(x.periode,5,2) between '01' and '01' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_01
						, sum(case when substring(x.periode,5,2) between '02' and '02' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_02
						, sum(case when substring(x.periode,5,2) between '03' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_03
						, sum(case when substring(x.periode,5,2) between '04' and '04' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_04
						, sum(case when substring(x.periode,5,2) between '05' and '05' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_05
						, sum(case when substring(x.periode,5,2) between '06' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_06
						, sum(case when substring(x.periode,5,2) between '07' and '07' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_07
						, sum(case when substring(x.periode,5,2) between '08' and '08' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_08
						, sum(case when substring(x.periode,5,2) between '09' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_09
						, sum(case when substring(x.periode,5,2) between '10' and '10' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_10
						, sum(case when substring(x.periode,5,2) between '11' and '11' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_11
						, sum(case when substring(x.periode,5,2) between '12' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_12
						, sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
				 from anggaran_d x
				   inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
				   inner join relakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
				   inner join konsol_relasi a on a.kode_akun=x.kode_akun and a.kode_lokasi=x.kode_lokasi
				   $this->filter
				 group by x.kode_lokasi,x.kode_akun,x.kode_pp
				 ) e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and a.kode_pp=e.kode_pp
				 order by a.kode_akun ";
		}
		
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("anggaran beban",$this->lokasi,"TAHUN ".$tahun);
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan' align='center'>No</td>
<td width='80' class='header_laporan' align='center'>Kode Akun </td>
<td width='200' class='header_laporan' align='center'>Nama Akun</td>
	<td width='80' class='header_laporan' align='center'>Kode PP </td>
<td width='200' class='header_laporan' align='center'>Nama PP</td>
    <td width='90' class='header_laporan' align='center'>Januari</td>
    <td width='90' class='header_laporan' align='center'>Februari</td>
    <td width='90' class='header_laporan' align='center'>Maret</td>
    <td width='90' class='header_laporan' align='center'>April</td>
<td width='90' class='header_laporan' align='center'>Mei</td>
    <td width='90' class='header_laporan' align='center'>Juni</td>
    <td width='90' class='header_laporan' align='center'>Juli</td>
    <td width='90' class='header_laporan' align='center'>Agustus</td>
<td width='90' class='header_laporan' align='center'>September</td>
    <td width='90' class='header_laporan' align='center'>Oktober</td>
    <td width='90' class='header_laporan' align='center'>November</td>
    <td width='90' class='header_laporan' align='center'>Desember</td>
    <td width='100' class='header_laporan' align='center'>Total</td>
  </tr>";
		$i=$start+1;
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
  <td class='isi_laporan'>".$AddOnLib->fnAkun($row->kode_akun)."</td>
  <td class='isi_laporan'>$row->nama_akun</td>
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
				
		echo "<tr>
    <td height='23' colspan='5' align='right' class='isi_laporan'>Total&nbsp;</td>
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

