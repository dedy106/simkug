<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_anggaran_rptAggPkBulan extends server_report_basic
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
			
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
		$nama_form=$tmp[1];
		$sql=" select a.kode_pk,f.nama as nama_pk,zz.kode_lokasi,zz.nama as nama_lokasi,
	   isnull(sum(g.n1),0) as n1,isnull(sum(g.n2),0) as n2,isnull(sum(g.n3),0) as n3,isnull(sum(g.n4),0) as n4,
	   isnull(sum(g.n5),0) as n5,isnull(sum(g.n6),0) as n6,isnull(sum(g.n7),0) as n7,isnull(sum(g.n8),0) as n8,
      isnull(sum(g.n9),0) as n9,isnull(sum(g.n10),0) as n10,isnull(sum(g.n11),0) as n11,isnull(sum(g.n12),0) as n12,isnull(sum(g.total),0) as total 
from (select a.kode_lokasi,b.kode_pk
	  from agg_d a  
	  inner join agg_drk b on a.kode_drk=b.kode_drk 
	  inner join agg_pk c on b.kode_pk=c.kode_pk $this->filter
     group by a.kode_lokasi,b.kode_pk ) a  
     inner join agg_pk f on a.kode_pk=f.kode_pk 
     inner join lokasi zz on a.kode_lokasi=zz.kode_lokasi 
     left join ( 
	   select a.kode_lokasi,b.kode_pk, 
			  sum(case when a.bulan between '01' and '12' then a.jumlah else 0 end) as jumlah, 
			  sum(case when a.bulan between '01' and '12' then a.volume else 0 end) as volume,
			  sum(case when a.bulan between '01' and '12' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as total ,
			  sum(case when a.bulan='01' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n1 ,
			  sum(case when a.bulan='02' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n2 ,
			  sum(case when a.bulan='03' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n3 ,
			  sum(case when a.bulan='04' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n4 ,
			  sum(case when a.bulan='05' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n5 ,
			  sum(case when a.bulan='06' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n6 ,
			  sum(case when a.bulan='07' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n7 ,
			  sum(case when a.bulan='08' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n8 ,
			  sum(case when a.bulan='09' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n9 ,
			  sum(case when a.bulan='10' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n10 ,
			  sum(case when a.bulan='11' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n11 ,
			  sum(case when a.bulan='12' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as n12 
		   from agg_d a  
	  inner join agg_drk b on a.kode_drk=b.kode_drk 
	  inner join agg_pk c on b.kode_pk=c.kode_pk $this->filter
       group by a.kode_lokasi,b.kode_pk
		 )g on a.kode_lokasi=g.kode_lokasi and a.kode_pk=g.kode_pk  
group by a.kode_pk,f.nama,zz.kode_lokasi,zz.nama
order by a.kode_pk

		 ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"TAHUN ".$tahun);
		echo "<table width='1800' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='70' class='header_laporan'><div align='center'>Kode PK </div></td>
<td width='250' class='header_laporan'><div align='center'>Nama PK</div></td>
<td width='50' class='header_laporan'><div align='center'>Kode Lok</div></td>
<td width='100' class='header_laporan'><div align='center'>Nama Lok</div></td>

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
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_pk</td>
  <td class='isi_laporan'>$row->nama_pk</td>
  <td class='isi_laporan'>$row->kode_lokasi</td>
  <td class='isi_laporan'>$row->nama_lokasi</td>

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

