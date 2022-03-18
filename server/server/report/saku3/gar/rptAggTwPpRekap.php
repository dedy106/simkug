<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAggTwPpRekap extends server_report_basic
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
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$lokasi=$tmp[0];
		$tahun=$tmp[1];
		$jenis=$tmp[2];
			
		//$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun";
		$sql=" select a.kode_pp,c.nama as nama_pp,
         isnull(e.agg_tw1,0) as agg_tw1,isnull(e.agg_tw2,0) as agg_tw2,isnull(e.agg_tw3,0) as agg_tw3,isnull(e.agg_tw4,0) as agg_tw4,isnull(e.total,0) as agg_total,
		 isnull(f.real_tw1,0) as real_tw1,isnull(f.real_tw2,0) as real_tw2,isnull(f.real_tw3,0) as real_tw3,isnull(f.real_tw4,0) as real_tw4,isnull(f.total,0) as real_total
  from (select x.kode_lokasi,x.kode_pp
        from anggaran_d x
		inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
		$this->filter
        group by x.kode_lokasi,x.kode_pp) a
  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
  left join (select x.kode_lokasi,x.kode_pp
	  	              , sum(case when substring(x.periode,5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw1
                    , sum(case when substring(x.periode,5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw2
	                  , sum(case when substring(x.periode,5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw3
	                  , sum(case when substring(x.periode,5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw4
					  , sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
	           from anggaran_d x
	           inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi 
			   $this->filter
             group by x.kode_lokasi,x.kode_pp) e on a.kode_pp=e.kode_pp  and a.kode_lokasi=e.kode_lokasi
	 left join (select x.kode_lokasi,x.kode_pp
                    , sum(case when substring(x.periode,5,2) between '01' and '03' then nilai else 0 end ) as real_tw1
                    , sum(case when substring(x.periode,5,2) between '04' and '06' then nilai else 0 end ) as real_tw2
	                  , sum(case when substring(x.periode,5,2) between '07' and '09' then nilai else 0 end ) as real_tw3
	                  , sum(case when substring(x.periode,5,2) between '10' and '12' then nilai else 0 end ) as real_tw4
					  , sum(case when substring(x.periode,5,2) between '01' and '12' then nilai else 0 end ) as total
             from  (select kode_lokasi,periode,kode_akun,kode_pp,dc,isnull(case when dc='D' then nilai else -nilai end,0) as nilai
                   from gldt
                   where kode_lokasi='$lokasi' and substring(periode,1,4)='$tahun'
                   union all
	                 select kode_lokasi,periode,kode_akun,kode_pp,dc,isnull(case when dc='D' then nilai else -nilai end,0) as nilai
                   from gldt_h
                    where kode_lokasi='$lokasi' and substring(periode,1,4)='$tahun'
                   ) x
             inner join masakun y on x.kode_akun=y.kode_akun and y.jenis = '$jenis' and x.kode_lokasi=y.kode_lokasi
             group by x.kode_lokasi,x.kode_pp) f on  a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi
order by a.kode_pp ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
	
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"TAHUN ".$tahun);
		echo "<table width='1200' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>NO</td>
    <td rowspan='2' align='center' class='header_laporan' width='50'>KODE</td>
	<td rowspan='2' align='center' class='header_laporan' width='250'>NAMA UNIT</td>
    <td colspan='4' align='center' class='header_laporan'>TRIWULAN I </td>
	<td colspan='4' align='center' class='header_laporan'>TRIWULAN II </td>
	<td colspan='4' align='center' class='header_laporan'>TRIWULAN III </td>
	<td colspan='4' align='center' class='header_laporan'>TRIWULAN IV </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>ANGGARAN</td>
    <td width='90' align='center' class='header_laporan'>REALISASI</td>
    <td width='90' align='center' class='header_laporan'>SISA</td>
    <td width='60' align='center' class='header_laporan'>PENYERAPAN</td>
	<td width='90' align='center' class='header_laporan'>ANGGARAN</td>
    <td width='90' align='center' class='header_laporan'>REALISASI</td>
    <td width='90' align='center' class='header_laporan'>SISA</td>
    <td width='60' align='center' class='header_laporan'>PENYERAPAN</td>
	<td width='90' align='center' class='header_laporan'>ANGGARAN</td>
    <td width='90' align='center' class='header_laporan'>REALISASI</td>
    <td width='90' align='center' class='header_laporan'>SISA</td>
    <td width='60' align='center' class='header_laporan'>PENYERAPAN</td>
	<td width='90' align='center' class='header_laporan'>ANGGARAN</td>
    <td width='90' align='center' class='header_laporan'>REALISASI</td>
    <td width='90' align='center' class='header_laporan'>SISA</td>
    <td width='60' align='center' class='header_laporan'>PENYERAPAN</td>
  </tr>
 
";
	
		$agg_tw1=0;$agg_tw2=0;$agg_tw3=0;$agg_tw4=0;$agg_total=0;
		$real_tw1=0;$real_tw2=0;$real_tw3=0;$real_tw4=0;$agg_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$agg_tw1+=$row->agg_tw1;
			$real_tw1+=$row->real_tw1;
			$persen1=($row->real_tw1/$row->agg_tw1)*100;
			$agg_tw2+=$row->agg_tw2;
			$real_tw2+=$row->real_tw2;
			$persen2=($row->real_tw2/$row->agg_tw2)*100;
			$agg_tw3+=$row->agg_tw3;
			$real_tw3+=$row->real_tw3;
			$persen3=($row->real_tw3/$row->agg_tw3)*100;
			$agg_tw4+=$row->agg_tw4;
			$real_tw4+=$row->real_tw4;
			$persen4=($row->real_tw4/$row->agg_tw4)*100;
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->real_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw1-$row->real_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."%</td>
   <td class='isi_laporan' align='right'>".number_format($row->agg_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->real_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw2-$row->real_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."%</td>
   <td class='isi_laporan' align='right'>".number_format($row->agg_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->real_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw3-$row->real_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."%</td>
   <td class='isi_laporan' align='right'>".number_format($row->agg_tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->real_tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw4-$row->real_tw4,0,',','.')."</td>
  <td class='isi_laporan' align='center'>".number_format($persen4,0,',','.')."%</td>
</tr>";
			
			$i=$i+1;
		}
		$persen1=($real_tw1/$agg_tw1)*100;
		$persen2=($real_tw2/$agg_tw2)*100;
		$persen3=($real_tw3/$agg_tw3)*100;
		$persen4=($real_tw4/$agg_tw4)*100;
		echo "<tr>
    <td height='23' colspan='3' align='right'  class='header_laporan'>Total&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($real_tw1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw1-$real_tw1,0,',','.')."</td>
    <td class='header_laporan' align='center'>".number_format($persen1,0,',','.')."%</td>
	 <td class='header_laporan' align='right'>".number_format($agg_tw2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($real_tw2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw2-$real_tw2,0,',','.')."</td>
    <td class='header_laporan' align='center'>".number_format($persen2,0,',','.')."%</td>
	 <td class='header_laporan' align='right'>".number_format($agg_tw3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($real_tw3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw3-$real_tw3,0,',','.')."</td>
    <td class='header_laporan' align='center'>".number_format($persen3,0,',','.')."%</td>
	 <td class='header_laporan' align='right'>".number_format($agg_tw4,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($real_tw4,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($agg_tw4-$real_tw4,0,',','.')."</td>
    <td class='header_laporan' align='center'>".number_format($persen4,0,',','.')."%</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}

