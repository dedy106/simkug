<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_anggaran_rptAggPkTw extends server_report_basic
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
	   isnull(sum(g.tw1),0) as tw1,isnull(sum(g.tw2),0) as tw2,isnull(sum(g.tw3),0) as tw3,isnull(sum(g.tw4),0) as tw4,
	   isnull(sum(g.total),0) as total 
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
			  sum(case when a.bulan  between '01' and '03' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as tw1 ,
			  sum(case when a.bulan  between '04' and '06' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as tw2 ,
			  sum(case when a.bulan  between '07' and '09' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as tw3 ,
			  sum(case when a.bulan  between '10' and '12' then (case when a.kode_akun in ('4122080005','4122090002','4122090003','4122090004') then -a.nilai else a.nilai end ) else 0 end) as tw4 
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
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='70' class='header_laporan'><div align='center'>Kode PK </div></td>
<td width='250' class='header_laporan'><div align='center'>Nama PK</div></td>
<td width='50' class='header_laporan'><div align='center'>Kode Lok</div></td>
<td width='100' class='header_laporan'><div align='center'>Nama Lok</div></td>

    <td width='90' class='header_laporan'><div align='center'>Triwulan I  </div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan II  </div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan III</div></td>
    <td width='90' class='header_laporan'><div align='center'>Triwulan IV </div></td>
    <td width='100' class='header_laporan'><div align='center'>Total</div></td>
  </tr>";
		$tw1=0;$tw2=0;$tw3=0;$tw4=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tw1=$tw1+$row->tw1;
			$tw2=$tw2+$row->tw2;
			$tw3=$tw3+$row->tw3;
			$tw4=$tw4+$row->tw4;
			$total=$total+$row->total;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_pk</td>
  <td class='isi_laporan'>$row->nama_pk</td>
  <td class='isi_laporan'>$row->kode_lokasi</td>
  <td class='isi_laporan'>$row->nama_lokasi</td>
 
     <td class='isi_laporan' align='right'>".number_format($row->tw1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->tw2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->tw3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->tw4,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
				
		echo "<tr>
    <td height='23' colspan='5' align='right' class='isi_laporan'>Total&nbsp;</td>
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

