<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_siaga_hris_gaji_rptGjRekapBulan extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		
		$sql=" select a.nik,b.nama,b.kode_lokasi,
         isnull(e.agg_01,0) as n1,isnull(e.agg_02,0) as n2,isnull(e.agg_03,0) as n3,isnull(e.agg_04,0) as n4,
         isnull(e.agg_05,0) as n5,isnull(e.agg_06,0) as n6,isnull(e.agg_07,0) as n7,isnull(e.agg_08,0) as n8,
         isnull(e.agg_09,0) as n9,isnull(e.agg_10,0) as n10,isnull(e.agg_11,0) as n11,isnull(e.agg_12,0) as n12,isnull(e.total,0) as total
  from (select x.kode_lokasi,x.nik
        from gr_gaji_d x
        inner join gr_karyawan y on x.nik=y.nik and x.kode_lokasi=y.kode_lokasi 
		$this->filter 
        group by x.kode_lokasi,x.nik) a
  inner join gr_karyawan b on a.nik=b.nik and a.kode_lokasi=b.kode_lokasi
  left join (select x.kode_lokasi,x.nik
	  	            , sum(case when substring(x.periode,5,2) between '01' and '01' then x.nilai else 0 end ) as agg_01
                    , sum(case when substring(x.periode,5,2) between '02' and '02' then x.nilai else 0 end ) as agg_02
                    , sum(case when substring(x.periode,5,2) between '03' and '03' then x.nilai else 0 end ) as agg_03
                    , sum(case when substring(x.periode,5,2) between '04' and '04' then x.nilai else 0 end ) as agg_04
                    , sum(case when substring(x.periode,5,2) between '05' and '05' then x.nilai else 0 end ) as agg_05
                    , sum(case when substring(x.periode,5,2) between '06' and '06' then x.nilai else 0 end ) as agg_06
                    , sum(case when substring(x.periode,5,2) between '07' and '07' then x.nilai else 0 end ) as agg_07
                    , sum(case when substring(x.periode,5,2) between '08' and '08' then x.nilai else 0 end ) as agg_08
                    , sum(case when substring(x.periode,5,2) between '09' and '09' then x.nilai else 0 end ) as agg_09
                    , sum(case when substring(x.periode,5,2) between '10' and '10' then x.nilai else 0 end ) as agg_10
                    , sum(case when substring(x.periode,5,2) between '11' and '11' then x.nilai else 0 end ) as agg_11
                    , sum(case when substring(x.periode,5,2) between '12' and '12' then x.nilai else 0 end ) as agg_12
					, sum(case when substring(x.periode,5,2) between '01' and '12' then x.nilai else 0 end ) as total
             from gr_gaji_d x
	         inner join gr_karyawan y on x.nik=y.nik and x.kode_lokasi=y.kode_lokasi 
			 inner join gr_gaji_param z on x.kode_param=z.kode_param and x.kode_lokasi=z.kode_lokasi 
			 $this->filter 
             group by x.kode_lokasi,x.nik
			 ) e on a.nik=e.nik and a.kode_lokasi=e.kode_lokasi
	order by a.nik ";


		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("lampiran gaji",$this->lokasi);
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
  <td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
  <td width='60' class='header_laporan'><div align='center'>NIK</div></td>
  <td width='200' class='header_laporan'><div align='center'>Nama</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Januari</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Februari</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Maret</div></td>
	  <td width='90' class='header_laporan'><div align='center'>April</div></td>
  <td width='90' class='header_laporan'><div align='center'>Mei</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Juni</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Juli</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Agustus</div></td>
  <td width='90' class='header_laporan'><div align='center'>September</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Oktober</div></td>
	  <td width='90' class='header_laporan'><div align='center'>November</div></td>
	  <td width='90' class='header_laporan'><div align='center'>Desember</div></td>
	  <td width='100' class='header_laporan'><div align='center'>Total</div></td>
  
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
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nik</td>
	 <td class='isi_laporan'>$row->nama</td>
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
	
		echo "</div>";
		return "";
	}
	
}
?>
  
