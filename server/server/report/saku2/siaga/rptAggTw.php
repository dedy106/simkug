<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptAggTw extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$nama_form=$tmp[2];
		$sql=" select count(a.kode_akun)
  from (select x.kode_lokasi,x.kode_akun
        from anggaran_d x
        inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
        group by x.kode_lokasi,x.kode_akun) a
  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi ";
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
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(kode_akun) as jum,sum(n1) as n1,sum(n2) as n2,sum(n3) as n3,sum(n4) as n4,sum(n1+n2+n3+n4) as n5 from glma_drk_tmp where nik_user='$nik_user' ".$this->filter."  ";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			$n1=$rs->fields[1];
			$n2=$rs->fields[2];
			$n3=$rs->fields[3];
			$n4=$rs->fields[4];
			$n5=$rs->fields[5];
		}
		$result=$totPage."/".$n1."/".$n2."/".$n3."/".$n4."/".$n5;
		error_log($result);
		return $result;
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
		$sql=" select a.kode_akun,b.nama as nama_akun,
         isnull(e.agg_tw1,0) as agg_tw1,isnull(e.agg_tw2,0) as agg_tw2,isnull(e.agg_tw3,0) as agg_tw3,isnull(e.agg_tw4,0) as agg_tw4,isnull(e.total,0) as total
  from (select x.kode_lokasi,x.kode_akun
        from anggaran_d x
        inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
        group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_drk) a
  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
  left join (select x.kode_lokasi,x.kode_akun
	  	              , sum(case when substring(x.periode,5,2) between '01' and '03' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw1
                    , sum(case when substring(x.periode,5,2) between '04' and '06' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw2
	                  , sum(case when substring(x.periode,5,2) between '07' and '09' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw3
	                  , sum(case when substring(x.periode,5,2) between '10' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as agg_tw4
					  , sum(case when substring(x.periode,5,2) between '01' and '12' then case when dc='D' then nilai else -nilai end else 0 end ) as total
	           from anggaran_d x
	           inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
             group by x.kode_lokasi,x.kode_akun) e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
order by a.kode_akun ";
		
		$start = (($this->page-1) * $this->rows);
		if ($start<0) {$start=1;}
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
	
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"TAHUN ".$tahun);
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='80' class='header_laporan'><div align='center'>Kode Akun </div></td>
<td width='250' class='header_laporan'><div align='center'>Nama Akun</div></td>

    <td width='90' class='header_laporan'><div align='center'>Triwulan I  </div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan II  </div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan III</div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan IV </div></td>
    <td width='100' class='header_laporan'><div align='center'>Total</div></td>
  </tr>";
		$i=$start+1;
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
 
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='3' align='right'  class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($tw1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}

