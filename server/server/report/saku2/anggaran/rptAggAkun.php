<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggAkun extends server_report_basic
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
		$nik_user=$tmp[0];

		$sql = "select a.kode_akun,f.nama as nama_akun,zz.kode_lokasi,zz.nama as nama_lokasi, 
	   isnull(sum(g.agg_01),0) as agg_01,isnull(sum(g.agg_02),0) as agg_02,isnull(sum(g.agg_03),0) as agg_03,isnull(sum(g.agg_04),0) as agg_04,
	   isnull(sum(g.agg_05),0) as agg_05,isnull(sum(g.agg_06),0) as agg_06,isnull(sum(g.agg_07),0) as agg_07,isnull(sum(g.agg_08),0) as agg_08,
      isnull(sum(g.agg_09),0) as agg_09,isnull(sum(g.agg_10),0) as agg_10,isnull(sum(g.agg_11),0) as agg_11,isnull(sum(g.agg_12),0) as agg_12,isnull(sum(g.agg_total),0) as agg_total 
from (select a.kode_lokasi,a.tahun,a.kode_akun 	
	  from agg_d a 
	  inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $this->filter
	  group by a.kode_lokasi,a.tahun,a.kode_akun ) a  
inner join masakun f on a.kode_akun=f.kode_akun 
inner join lokasi  zz on a.kode_lokasi=zz.kode_lokasi 
left join ( 
	 select a.kode_lokasi,a.kode_akun, 
      sum(case when a.bulan between '01' and '12' then a.jumlah else 0 end) as jumlah, 
	   sum(case when a.bulan between '01' and '12' then a.volume else 0 end) as volume, 
	   sum(case when a.bulan between '01' and '12' then a.nilai else 0 end) as agg_total, 	
	   sum(case when a.bulan='01' then a.nilai else 0 end) as agg_01,
	   sum(case when a.bulan='02' then a.nilai else 0 end) as agg_02, 
	   sum(case when a.bulan='03' then a.nilai else 0 end) as agg_03, 
	   sum(case when a.bulan='04' then a.nilai else 0 end) as agg_04, 
	   sum(case when a.bulan='05' then a.nilai else 0 end) as agg_05, 
	   sum(case when a.bulan='06' then a.nilai else 0 end) as agg_06, 
	   sum(case when a.bulan='07' then a.nilai else 0 end) as agg_07, 
	   sum(case when a.bulan='08' then a.nilai else 0 end) as agg_08, 
	   sum(case when a.bulan='09' then a.nilai else 0 end) as agg_09, 
	   sum(case when a.bulan='10' then a.nilai else 0 end) as agg_10, 
	   sum(case when a.bulan='11' then a.nilai else 0 end) as agg_11, 
	   sum(case when a.bulan='12' then a.nilai else 0 end) as agg_12 
	 from agg_d a 
	 inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $this->filter
	 group by a.kode_lokasi,a.kode_akun 
		 )g on a.kode_lokasi=g.kode_lokasi and a.kode_akun=g.kode_akun 
group by a.kode_akun,f.nama,zz.kode_lokasi,zz.nama 
order by a.kode_akun ";
		
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table width='1920' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25' class='header_laporan'><div align='center'>No</div></td>
<td width='70' class='header_laporan'><div align='center'>Kode Akun </div></td>
<td width='200' class='header_laporan'><div align='center'>Nama Akun</div></td>
<td width='50' class='header_laporan'><div align='center'>Kode Dept</div></td>
<td width='135' class='header_laporan'><div align='center'>Nama Dept</div></td>
    <td width='70'  class='header_laporan'><div align='center'>Kode RKM</div></td>
    <td width='190' class='header_laporan'><div align='center'>Nama RKM </div></td>
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
		$i=$start+1;
		$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9+$row->n10+$row->n11+$row->n12;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
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
  <td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		
		
		echo "</table>";
		return "";
	}
	
	
}

