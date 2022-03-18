<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gar_rptAggTwPp extends server_report_basic
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
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$kode_lokasi1=$tmp[3];
		$kode_lokasi2=$tmp[4];
			
		//$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun";
		$sql=" select a.kode_akun,a.kode_pp,b.nama as nama_akun,c.nama as nama_pp,
         isnull(e.agg_tw1,0) as agg_tw1,isnull(e.agg_tw2,0) as agg_tw2,isnull(e.agg_tw3,0) as agg_tw3,isnull(e.agg_tw4,0) as agg_tw4,isnull(e.total,0) as total
  from (select x.kode_lokasi,x.kode_akun,x.kode_pp
        from anggaran_d x
        inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
        group by x.kode_lokasi,x.kode_akun,x.kode_pp) a
  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
  inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
  left join (select x.kode_lokasi,x.kode_akun,x.kode_pp
	  	              , sum(case when substring(x.periode,5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw1
                    , sum(case when substring(x.periode,5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw2
	                  , sum(case when substring(x.periode,5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw3
	                  , sum(case when substring(x.periode,5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw4
					  , sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
	           from anggaran_d x
	           inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
             group by x.kode_lokasi,x.kode_akun,x.kode_pp) e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp  and a.kode_lokasi=e.kode_lokasi
order by a.kode_akun,a.kode_pp ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
	
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"TAHUN ".$tahun);
		echo "<table width='1200' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan' align='center'>No</td>
<td width='70' class='header_laporan' align='center'>Kode Akun </td>
<td width='200' class='header_laporan' align='center'>Nama Akun</td>
<td width='50' class='header_laporan' align='center'>Kode PP</td>
<td width='135' class='header_laporan' align='center'>Nama PP</td>
    <td width='90' class='header_laporan' align='center'>Triwulan I  </td>
    <td width='90' class='header_laporan' align='center'>Triwulan II  </td>
    <td width='90' class='header_laporan' align='center'>Triwulan III</td>
    <td width='90' class='header_laporan' align='center'>Triwulan IV </td>
    <td width='100' class='header_laporan' align='center'>Total</td>
  </tr>";
	
		$tw1=0;$tw2=0;$tw3=0;$tw4=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tw1=$tw1+$row->agg_tw1;
			$tw2=$tw2+$row->agg_tw2;
			$tw3=$tw3+$row->agg_tw3;
			$tw4=$tw4+$row->agg_tw4;
			$total=$total+$row->total;
			echo "<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='5' align='right'  class='header_laporan'>Total&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($tw2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($tw3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($tw4,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}

