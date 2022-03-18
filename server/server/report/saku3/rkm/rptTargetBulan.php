<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_rkm_rptTargetBulan extends server_report_basic
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
		$lap=$tmp[3];
		$nama_file="target.xls";
		
		if ($lap=="Excel")
		{
			
			header("Pragma: public");
			header("Expires: 0");
			header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			header("Content-Type: application/force-download");
			header("Content-Type: application/octet-stream");
			header("Content-Type: application/download");;
			header("Content-Disposition: attachment;filename=$nama_file"); 
			header("Content-Transfer-Encoding: binary ");
			
		}
		//$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_akun";
		$sql=" select a.kode_akun,a.kode_pp,a.kode_ip,b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_ip,
         isnull(e.n1,0) as n1,isnull(e.n2,0) as n2,isnull(e.n3,0) as n3,isnull(e.n4,0) as n4,
		 isnull(e.n5,0) as n5,isnull(e.n6,0) as n6,isnull(e.n7,0) as n7,isnull(e.n8,0) as n8,
		 isnull(e.n9,0) as n9,isnull(e.n10,0) as n10,isnull(e.n11,0) as n11,isnull(e.n12,0) as n12,
		 isnull(e.total,0) as total,
		 d.kode_pu,f.nama as nama_pu,f.kode_ss,g.nama as nama_ss,g.kode_ts,h.nama as nama_ts,i.kode_rek,j.nama as nama_rek
  from (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
        from rkm_target_d x
        inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
		inner join rkm_akun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
		inner join rkm_pu a on x.kode_ip=a.kode_pu and x.kode_lokasi=a.kode_lokasi
		$this->filter
        group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip) a
  inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
  inner join rkm_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
  inner join rkm_ip d on a.kode_ip=d.kode_ip and a.kode_lokasi=d.kode_lokasi
  left join (select x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
	  	            , sum(case when substring(x.periode,5,2)='01' then nilai else 0 end ) as n1
                    , sum(case when substring(x.periode,5,2)='02' then nilai else 0 end ) as n2
					, sum(case when substring(x.periode,5,2)='03' then nilai else 0 end ) as n3
					, sum(case when substring(x.periode,5,2)='04' then nilai else 0 end ) as n4
					, sum(case when substring(x.periode,5,2)='05' then nilai else 0 end ) as n5
					, sum(case when substring(x.periode,5,2)='06' then nilai else 0 end ) as n6
					, sum(case when substring(x.periode,5,2)='07' then nilai else 0 end ) as n7
					, sum(case when substring(x.periode,5,2)='08' then nilai else 0 end ) as n8
					, sum(case when substring(x.periode,5,2)='09' then nilai else 0 end ) as n9
					, sum(case when substring(x.periode,5,2)='10' then nilai else 0 end ) as n10
					, sum(case when substring(x.periode,5,2)='11' then nilai else 0 end ) as n11
					, sum(case when substring(x.periode,5,2)='12' then nilai else 0 end ) as n12
					, sum(case when substring(x.periode,5,2) between '01' and '12' then nilai else 0 end ) as total
	           from rkm_target_d x
	           inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
			   inner join rkm_pu a on x.kode_ip=a.kode_pu and x.kode_lokasi=a.kode_lokasi
			   $this->filter
             group by x.kode_lokasi,x.kode_akun,x.kode_pp,x.kode_ip
			 ) e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_ip=e.kode_ip and a.kode_lokasi=e.kode_lokasi
   inner join rkm_pu f on d.kode_pu=f.kode_pu and d.kode_lokasi=f.kode_lokasi and c.kode_bidang=f.kode_bidang and d.tahun=f.tahun
   inner join rkm_ss g on f.kode_ss=g.kode_ss and f.kode_lokasi=g.kode_lokasi and f.tahun=g.tahun
   inner join rkm_ts h on g.kode_ts=h.kode_ts and g.kode_lokasi=h.kode_lokasi and g.tahun=h.tahun
   inner join rkm_bidang i on f.kode_bidang=i.kode_bidang and f.kode_lokasi=i.kode_lokasi
   inner join rkm_rektorat j on i.kode_rek=j.kode_rek and i.kode_lokasi=j.kode_lokasi
order by a.kode_akun,a.kode_pp,a.kode_ip ";
		
		
		$rs = $dbLib->execute($sql);
		$i = 1;
	
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan('laporan target rkm',$this->lokasi,"PERIODE ".$tahun);
		echo "<table width='2000' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
	<td width='25' height='25'  class='header_laporan' align='center'>No</div></td>
	<td width='60' class='header_laporan' align='center'>Kode Akun </div></td>
	<td width='150' class='header_laporan' align='center'>Nama Akun</div></td>
	<td width='50' class='header_laporan' align='center'>Kode PP</div></td>
	<td width='150' class='header_laporan' align='center'>Nama PP</div></td>
	<td width='50' class='header_laporan' align='center'>Kode Rek</div></td>
	<td width='150' class='header_laporan' align='center'>Nama Rektorat</div></td>
	<td width='80' align='center' class='header_laporan'>Kode Program</td>
	<td width='200' align='center' class='header_laporan'>Nama Program Utama</td>
	<td width='80' align='center' class='header_laporan'>Kode RKM</td>
	<td width='250' align='center' class='header_laporan'>Nama Rencana Kerja Manajemen (RKM)</td>
	<td width='100' align='center' class='header_laporan'>Kode DRK</td>
	<td width='300' align='center' class='header_laporan'>Nama Action Plan (DRK)</td>
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
    <td width='100' class='header_laporan' align='center'>Total</div></td>
  </tr>";
		$i=1;
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
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
   <td class='isi_laporan'>$row->kode_rek</td>
  <td class='isi_laporan'>$row->nama_rek</td>
  <td class='isi_laporan'>$row->kode_ts</td>
  <td class='isi_laporan'>$row->nama_ts</td>
  <td class='isi_laporan'>$row->kode_ss</td>
  <td class='isi_laporan'>$row->nama_ss</td>
  <td  class='isi_laporan'>$row->kode_ip</td>
  <td class='isi_laporan'>$row->nama_ip</td>
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
    <td height='23' colspan='13' align='right'  class='isi_laporan'>Total&nbsp;</td>
     <td class='header_laporan' align='right'>".number_format($n1,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n2,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n3,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n4,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n5,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n6,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n7,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n8,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n9,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n10,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($n12,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}

