<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_ppbs_rptAggAkunDrkYpt extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1 ";
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
		$tahun=$tmp[0];
		$jenis=$tmp[1];
		
		$nama_file="anggaran.xls";
		if ($jenis=="Excel")
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
		
		$sql = "select a.kode_lokasi,a.kode_akun,a.kode_lokasi,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.kode_drk,d.nama as nama_drk,a.tahun,
		   isnull(g.n1,0) as n1,isnull(g.n2,0) as n2,isnull(g.n3,0) as n3,isnull(g.n4,0) as n4,
		   isnull(g.n5,0) as n5,isnull(g.n6,0) as n6,isnull(g.n7,0) as n7,isnull(g.n8,0) as n8,
		  isnull(g.n9,0) as n9,isnull(g.n10,0) as n10,isnull(g.n11,0) as n11,isnull(g.n12,0) as n12,isnull(g.total,0) as total 
	from (select a.kode_lokasi,substring(a.periode,1,4) as tahun,a.kode_akun,a.kode_pp,a.kode_drk 	
		  from agg_d a $this->filter
		  group by a.kode_lokasi,substring(a.periode,1,4),a.kode_akun,a.kode_pp,a.kode_drk 	
		  ) a  
	inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and c.tahun='$tahun'
	inner join agg_drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun
	left join (select a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk ,	 
		  sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) as jumlah, 
		   sum(case when substring(a.periode,5,2) between '01' and '12' then a.vol else 0 end) as volume, 
		   sum(case when substring(a.periode,5,2) between '01' and '12' then a.total else 0 end) as total, 	
		   sum(case when substring(a.periode,5,2)='01' then a.total else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.total else 0 end) as n2, 
		   sum(case when substring(a.periode,5,2)='03' then a.total else 0 end) as n3, 
		   sum(case when substring(a.periode,5,2)='04' then a.total else 0 end) as n4, 
		   sum(case when substring(a.periode,5,2)='05' then a.total else 0 end) as n5, 
		   sum(case when substring(a.periode,5,2)='06' then a.total else 0 end) as n6, 
		   sum(case when substring(a.periode,5,2)='07' then a.total else 0 end) as n7, 
		   sum(case when substring(a.periode,5,2)='08' then a.total else 0 end) as n8, 
		   sum(case when substring(a.periode,5,2)='09' then a.total else 0 end) as n9, 
		   sum(case when substring(a.periode,5,2)='10' then a.total else 0 end) as n10, 
		   sum(case when substring(a.periode,5,2)='11' then a.total else 0 end) as n11, 
		   sum(case when substring(a.periode,5,2)='12' then a.total else 0 end) as n12 
		 from agg_d a $this->filter
		 group by a.kode_lokasi,a.kode_akun,a.kode_pp,a.kode_drk 	 
			 )g on a.kode_lokasi=g.kode_lokasi and a.kode_akun=g.kode_akun and a.kode_pp=g.kode_pp and a.kode_drk=g.kode_drk
	where isnull(g.total,0)<>0
	order by a.kode_akun,a.kode_pp,a.kode_drk ";
	
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan rekap anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25' class='header_laporan' align='center'>No</td>
<td width='70' class='header_laporan' align='center'>Lokasi </td>
<td width='70' class='header_laporan' align='center'>Kode Akun </td>
<td width='150' class='header_laporan' align='center'>Nama Akun</td>
<td width='70' class='header_laporan' align='center'>Kode PP </td>
<td width='150' class='header_laporan' align='center'>Nama PP</td>
<td width='70' class='header_laporan' align='center'>Kode DRK </td>
<td width='150' class='header_laporan' align='center'>Nama DRK</td>
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
		$total=0; $n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; $n12=0;
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
  <td class='isi_laporan'>$row->kode_lokasi</td>
  <td class='isi_laporan'>$row->kode_akun</td>
   <td class='isi_laporan'>";
  echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenUsulan('$row->kode_akun','$row->kode_pp','$row->kode_drk','$row->kode_lokasi','$row->tahun');\">$row->nama_akun</a>";
  echo "</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
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
  <td height='23' class='isi_laporan' align='center' colspan='8'>Total</td>
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
		
		echo "</table>";
		return "";
	}
	
	
}

