<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptPpKuotaPakaiRekap extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$sql="select b.tahun,a.kode_pp,a.nama as nama_pp, ISNULL(b.p1,0) as p1,ISNULL(b.p2,0) as p2, ISNULL(b.p3,0) as p3,
		ISNULL(c.n1,0) as n1,ISNULL(c.n2,0) as n2, ISNULL(c.n3,0) as n3
		from agg_pp a 
		
		left join(
		select a.kode_pp,a.tahun,sum(a.n_max) as nmax,
		sum(case when b.jenis='Neraca' then a.n_max else 0 end) as p1,
						   sum(case when b.jenis='Pendapatan' then a.n_max else 0 end) as p2,
						   sum(case when b.jenis='Beban' then a.n_max else 0 end) as p3
		from agg_outlook a 
		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		where a.tahun = '$tahun' and a.kode_lokasi='$kode_lokasi'
		group by a.kode_pp,a.tahun
		) b on a.kode_pp=b.kode_pp and a.tahun=b.tahun
		
		left join (
		select a.kode_pp,sum(case when c.jenis='Neraca' then b.total else 0 end) as n1,
						   sum(case when c.jenis='Pendapatan' then b.total else 0 end) as n2,
						   sum(case when c.jenis='Beban' then b.total else 0 end) as n3
		from agg_outlook a 
		inner join agg_d b on a.kode_pp=b.kode_pp and a.kode_akun=b.kode_akun and a.tahun=substring(b.periode,1,4) and a.kode_lokasi=b.kode_lokasi
		inner join masakun c on b.kode_akun=c.kode_akun and c.kode_lokasi=b.kode_lokasi
		where a.tahun = '$tahun' and a.kode_lokasi ='$kode_lokasi'
		group by a.kode_pp
		) c on a.kode_pp=c.kode_pp 
		
		$this->filter
order by a.kode_pp ";

		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA rekap pemakaian kuota",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
	 <td width='50' rowspan='2'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='300' rowspan='2'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='50' rowspan='2'  align='center' class='header_laporan'>Tahun</td>
	  <td colspan='3'  align='center' class='header_laporan'>Beban</td>
	  <td colspan='3'  align='center' class='header_laporan'>Pendapatan</td>
	  <td colspan='3'  align='center' class='header_laporan'>Investasi</td>
	  </tr>
   <tr bgcolor='#CCCCCC'>
     <td width='80'  align='center' class='header_laporan'>Kuota</td>
     <td width='80'  align='center' class='header_laporan'>Realisasi</td>
     <td width='80'  align='center' class='header_laporan'>Sisa</td>
     <td width='80'  align='center' class='header_laporan'>Kuota</td>
     <td width='80'  align='center' class='header_laporan'>Realisasi</td>
     <td width='80'  align='center' class='header_laporan'>Sisa</td>
     <td width='80'  align='center' class='header_laporan'>Kuota</td>
     <td width='80'  align='center' class='header_laporan'>Realisasi</td>
     <td width='80'  align='center' class='header_laporan'>Sisa</td>
   </tr>  ";
		$p1=0; $p2=0; $p3=0; $n1=0; $n2=0; $n3=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$p1+=$row->p1;
			$p2+=$row->p2;
			$p3+=$row->p3;
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->tahun</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p3,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p3-$row->n3,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p2,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p2-$row->n2,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p1,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->p1-$row->n1,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='4'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($p3,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($n3,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($p3-$n3,0,',','.')."</td>
	   <td class='header_laporan' align='right'>".number_format($p2,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($n2,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($p2-$n2,0,',','.')."</td>
	   <td class='header_laporan' align='right'>".number_format($p1,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($n1,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($p1-$n1,0,',','.')."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
