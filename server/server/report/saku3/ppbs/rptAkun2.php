<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptAkun2 extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.kode_akun, b.nama as akun, d.tahun, a.n_max, c.total, a.n_max-c.total as sisa
from agg_outlook a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
inner join agg_usul_j c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi 
inner join agg_usul_m d on c.no_usul=d.no_usul and d.kode_lokasi=c.kode_lokasi 
$this->filter order by a.kode_akun";
echo $sql;
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data Vendor",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	  <td width='200'  align='center' class='header_laporan'>Nama Akun</td>
	 <td width='200'  align='center' class='header_laporan'>Tahun</td>
     <td width='90'  align='center' class='header_laporan'>Pagu</td>
     <td width='90'  align='center' class='header_laporan'>Hasil Input</td>
     <td width='90'  align='center' class='header_laporan'>Sisa</td>
	  </tr>  ";
		$nilai=0;$nilai_ppn=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$tagihan=$tagihan+$row->tagihan;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->akun</td>
	 <td class='isi_laporan'>$row->tahun</td>
	 <td class='isi_laporan'>$row->n_max</td>
	 <td class='isi_laporan'>$row->total</td>
	 <td class='isi_laporan'>$row->sisa</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
