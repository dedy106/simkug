<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptAkun extends server_report_basic
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
		$sql="select  x.kode_akun,x.n_max,isnull(y.total,0) as total,
		b.nama as akun,x.n_max-isnull(y.total,0) as sisa 
from ( select kode_lokasi,kode_akun,sum(n_max) as n_max
		 from agg_outlook 
		 where tahun='$tahun' and kode_lokasi='$kode_lokasi'
		group by kode_lokasi,kode_akun ) x 
left join ( select a.kode_lokasi,a.kode_akun,sum(a.total) as total
		from agg_usul_j a 
		inner join agg_usul_m b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='$kode_lokasi' and b.tahun='$tahun' and substring(a.periode,1,4)='$tahun'
		 group by a.kode_lokasi,a.kode_akun
		 ) y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
inner join masakun b on x.kode_akun=b.kode_akun and x.kode_lokasi=b.kode_lokasi 
where x.kode_lokasi='$kode_lokasi'
order by x.kode_akun "; 
		 
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAP HASIL INPUT PAGU ANGGARAN PER AKUN SELURUH PP",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>Kode Akun</td>
	  <td width='250'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='50'  align='center' class='header_laporan'>Tahun</td>
     <td width='90'  align='center' class='header_laporan'>Pagu</td>
     <td width='90'  align='center' class='header_laporan'>Hasil Input</td>
     <td width='90'  align='center' class='header_laporan'>Sisa</td>
	  </tr>  ";
		$n_max=0;$total=0;$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n_max+=$row->n_max;
			$total+=$row->total;
			$sisa+=$row->sisa;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan'>$tahun</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n_max,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->sisa,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='4' >Total</td>
	 <td class='header_laporan' align='right'>".number_format($n_max,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($total,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($sisa,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
