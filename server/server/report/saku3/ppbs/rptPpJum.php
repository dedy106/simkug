<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptPpJum extends server_report_basic
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
		$sql="select a.kode_akun,a.kode_pp,a.n_max,ISNULL(b.jml,0) as jml,c.nama as nama_akun,d.nama as nama_pp,a.tahun
from agg_outlook a
left join (select kode_pp,kode_akun,COUNT(no_usul) as jml 
from agg_usul_j 
where kode_lokasi='$kode_lokasi' and SUBSTRING(periode,1,4)='$tahun'
group by kode_akun,kode_pp
		)b on a.kode_akun=b.kode_akun and a.kode_pp=b.kode_pp
inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join agg_pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi and a.tahun=d.tahun
$this->filter 
order by a.kode_akun,a.kode_pp ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DATA kuota usulan pp",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	  <td width='60'  align='center' class='header_laporan'>Kode Akun</td>
     <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	  <td width='150'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='60'  align='center' class='header_laporan'>Tahun</td>
	  <td width='100'  align='center' class='header_laporan'>Nilai</td>
	  <td width='100'  align='center' class='header_laporan'>Jumlah Usulan</td>
	  </tr>  ";
		$jml=0; $n_max=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jml+=$row->jml;
			$n_max+=$row->n_max;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	  <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	  <td class='isi_laporan'>$row->tahun</td>
	  <td class='isi_laporan' align='right'>".number_format($row->n_max,0,',','.')."</td>
	   <td class='isi_laporan' align='right'>".number_format($row->jml,0,',','.')."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='6'>Total</td>
	  <td class='header_laporan' align='right'>".number_format($n_max,0,',','.')."</td>
	   <td class='header_laporan' align='right'>".number_format($jml,0,',','.')."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
