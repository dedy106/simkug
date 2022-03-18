<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptAggTwProd extends server_report_basic
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
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select a.kode_lokasi,a.kode_tipe,b.nama as nama_tipe,a.kode_pic,c.nama as nama_pic,a.kode_cust,d.nama as nama_cust,
         isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,isnull(e.total,0) as total
  from (select x.kode_lokasi,x.kode_tipe,kode_pic,kode_cust
        from sju_gar_d x
        group by x.kode_lokasi,x.kode_tipe,kode_pic,kode_cust) a
  inner join sju_tipe b on a.kode_tipe=b.kode_tipe and a.kode_lokasi=b.kode_lokasi
  inner join sju_pic c on a.kode_pic=c.kode_pic and a.kode_lokasi=c.kode_lokasi
  inner join sju_cust d on a.kode_cust=d.kode_cust and a.kode_lokasi=d.kode_lokasi
  left join (select x.kode_lokasi,x.kode_tipe,kode_pic,kode_cust
	  	              , sum(case when substring(x.periode,5,2) between '01' and '03' then x.nilai else 0 end ) as agg_01
                    , sum(case when substring(x.periode,5,2) between '04' and '06' then x.nilai else 0 end ) as agg_02
                    , sum(case when substring(x.periode,5,2) between '07' and '09' then x.nilai else 0 end ) as agg_03
                    , sum(case when substring(x.periode,5,2) between '10' and '12' then x.nilai else 0 end ) as agg_04
					, sum(case when substring(x.periode,5,2) between '01' and '12' then x.nilai else 0 end ) as total
             from sju_gar_d X
             group by x.kode_lokasi,x.kode_tipe,kode_pic,kode_cust
			 ) e on a.kode_tipe=e.kode_tipe and a.kode_pic=e.kode_pic and a.kode_cust=e.kode_cust and a.kode_lokasi=e.kode_lokasi
			 order by a.kode_tipe ";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("anggaran produksi",$this->lokasi,"TAHUN ".$tahun);
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan' align='center'>No</td>
<td width='80' class='header_laporan' align='center'>Kode COB </td>
<td width='150' class='header_laporan' align='center'>Nama COB</td>
<td width='80' class='header_laporan' align='center'>Kode PIC </td>
<td width='150' class='header_laporan' align='center'>Nama PIC</td>
<td width='80' class='header_laporan' align='center'>Kode TTG </td>
<td width='150' class='header_laporan' align='center'>Nama TTG</td>
    <td width='90' class='header_laporan' align='center'>Triwulan I</td>
    <td width='90' class='header_laporan' align='center'>Triwulan II</td>
    <td width='90' class='header_laporan' align='center'>Triwulan III</td>
    <td width='90' class='header_laporan' align='center'>Triwulan IV</td>
    <td width='100' class='header_laporan' align='center'>Total</td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$n4=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			
			$total=$total+$row->total;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_tipe</td>
  <td class='isi_laporan'>$row->nama_tipe</td>
  <td class='isi_laporan'>$row->kode_pic</td>
  <td class='isi_laporan'>$row->nama_pic</td>
  <td class='isi_laporan'>$row->kode_cust</td>
  <td class='isi_laporan'>$row->nama_cust</td>
  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
   <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
				
		echo "<tr>
    <td height='23' colspan='7' align='right' class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n4,0,',','.')."</td>
      <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		
		echo "</table></div>";
		return "";
		
	}
	
	
}

