<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rkm_rptTarget extends server_report_basic
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
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$tahun=$tmp[1];
		$jenis=$tmp[2];
		
			
		//$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun";
		$sql=" select a.kode_akun,a.kode_pp,a.kode_ip,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_ip,
         isnull(e.agg_tw1,0) as agg_tw1,isnull(e.agg_tw2,0) as agg_tw2,isnull(e.agg_tw3,0) as agg_tw3,isnull(e.agg_tw4,0) as agg_tw4,isnull(e.total,0) as total,
		 d.kode_pu,f.nama as nama_pu,f.kode_ss,g.nama as nama_ss
  from (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
        from rkm_target_d x
        inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
		inner join rkm_akun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
		$this->filter
        group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip) a
  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
  inner join rkm_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
  inner join rkm_ip d on a.kode_ip=d.kode_ip and a.kode_lokasi=d.kode_lokasi
  left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
	  	              , sum(case when substring(x.periode,5,2) between '01' and '03' then nilai else 0 end ) as agg_tw1
                    , sum(case when substring(x.periode,5,2) between '04' and '06' then nilai else 0 end ) as agg_tw2
	                  , sum(case when substring(x.periode,5,2) between '07' and '09' then nilai else 0 end ) as agg_tw3
	                  , sum(case when substring(x.periode,5,2) between '10' and '12' then nilai else 0 end ) as agg_tw4
					  , sum(case when substring(x.periode,5,2) between '01' and '12' then nilai else 0 end ) as total
	           from rkm_target_d x
	           inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi $this->filter
             group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
			 ) e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_ip=e.kode_ip and a.kode_lokasi=e.kode_lokasi
   inner join rkm_pu f on d.kode_pu=f.kode_pu and d.kode_lokasi=f.kode_lokasi and c.kode_bidang=f.kode_bidang and d.tahun=f.tahun
   inner join rkm_ss g on f.kode_ss=g.kode_ss and f.kode_lokasi=g.kode_lokasi and f.tahun=g.tahun
order by a.kode_akun,a.kode_pp,a.kode_ip ";
	
		
		$rs = $dbLib->execute($sql);
		$i = 1;
	
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan('laporan target rkm',$this->lokasi,"PERIODE ".$tahun);
		echo "<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
	<td width='25' height='25'  class='header_laporan' align='center'>No</div></td>
	<td width='60' class='header_laporan' align='center'>Kode Akun </div></td>
	<td width='150' class='header_laporan' align='center'>Nama Akun</div></td>
	<td width='50' class='header_laporan' align='center'>Kode PP</div></td>
	<td width='150' class='header_laporan' align='center'>Nama PP</div></td>
	<td width='50' class='header_laporan' align='center'>Kode Tujuan Strategis</div></td>
	<td width='150' class='header_laporan' align='center'>Nama Tujuan Strategis</div></td>
	<td width='50'  class='header_laporan' align='center'>Kode Sasaran Strategis</div></td>
    <td width='150' class='header_laporan' align='center'>Nama Sasaran Strategis</div></td>
    <td width='70'  class='header_laporan' align='center'>Kode IP</div></td>
    <td width='190' class='header_laporan' align='center'>Nama IP </div></td>
    <td width='90' class='header_laporan' align='center'>Triwulan I  </div></td>
    <td width='90' class='header_laporan' align='center'>Triwulan II  </div></td>
    <td width='90' class='header_laporan' align='center'>Triwulan III</div></td>
    <td width='90' class='header_laporan' align='center'>Triwulan IV </div></td>
    <td width='100' class='header_laporan' align='center'>Total</div></td>
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
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_ss</td>
  <td class='isi_laporan'>$row->nama_ss</td>
  <td  class='isi_laporan'>$row->kode_pu</td>
  <td class='isi_laporan'>$row->nama_pu</td>
  
  <td  class='isi_laporan'>$row->kode_ip</td>
  <td class='isi_laporan'>$row->nama_ip</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->agg_tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td height='23' colspan='11' align='right'  class='isi_laporan'>Total&nbsp;</td>
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

