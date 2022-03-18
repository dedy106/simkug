<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptPpKuotaPakai extends server_report_basic
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
		$sql="select a.kode_akun,a.kode_pp,b.nama as nama_akun,c.nama as nama_pp,a.tahun,
	   ISNULL(d.n_max,0) as n_max,ISNULL(e.total,0) as total, ISNULL(d.n_max,0)-ISNULL(e.total,0) as sisa
from (select a.kode_pp,a.kode_akun,a.kode_lokasi,a.tahun
	  from agg_outlook a
	  where a.kode_lokasi='$kode_lokasi' and a.tahun='$tahun'
	  group by a.kode_pp,a.kode_akun,a.kode_lokasi,a.tahun
	 )a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
left join (select a.kode_pp,a.kode_akun,a.kode_lokasi,sum(a.n_max) as n_max
		   from agg_outlook a
		   where a.kode_lokasi='$kode_lokasi' and a.tahun='$tahun'
		   group by a.kode_pp,a.kode_akun,a.kode_lokasi
		   )d on a.kode_akun=d.kode_akun and a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_pp,a.kode_akun,a.kode_lokasi,sum(a.total) as total
		   from agg_d a
		   where a.kode_lokasi='$kode_lokasi' and substring(a.periode,1,4)='$tahun'
		   group by a.kode_pp,a.kode_akun,a.kode_lokasi	  
		   )e on a.kode_akun=e.kode_akun and a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
$this->filter
order by a.kode_akun,a.kode_pp ";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA pemakaian kuota",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	  <td width='60'  align='center' class='header_laporan'>Kode Akun</td>
     <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Tahun</td>
	  <td width='100'  align='center' class='header_laporan'>Kuota</td>
	  <td width='100'  align='center' class='header_laporan'>Realisasi</td>
	  <td width='100'  align='center' class='header_laporan'>Sisa</td>
	  </tr>  ";
		$n_max=0; $total=0; $sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n_max+=$row->n_max;
			$total+=$row->total;
			$sisa+=$row->sisa;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	  <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->tahun</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_max,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->sisa,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($n_max,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($total,0,',','.')."</td>
	  <td class='header_laporan' align='right'>".number_format($sisa,0,',','.')."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
