<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_ppbs_rptPagu extends server_report_basic
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
		$jenis=$tmp[2];
		$nama_file="rkm.xls";
		if ($jenis=="Excell")
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
		$sql="select a.kode_akun,b.nama as nama_akun,a.kode_pp,c.nama as nama_pp,a.n_max,isnull(d.total,0) as total
		from agg_pagu_log a
		inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi and a.tahun=c.tahun
		left join (select a.kode_pp,a.kode_akun,a.kode_lokasi,sum(b.total) as total
				  from agg_usul_m a
				  inner join log_usul_d b on a.no_usul=b.no_usul and a.kode_lokasi=b.kode_lokasi
				  $filter
				  group by  a.kode_pp,a.kode_akun,a.kode_lokasi
				  )d on a.kode_lokasi=d.kode_lokasi and a.kode_akun=d.kode_akun and a.kode_pp=d.kode_pp
		$filter
		order by a.kode_akun,a.kode_pp
		";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("data pagu",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' class='800'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>Kode Akun</td>
	  <td width='200' align='center' class='header_laporan'>Nama Akun</td>
	 <td width='80'  align='center' class='header_laporan'>Kode PP</td>
     <td width='200'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='100'  align='center' class='header_laporan'>Pagu</td>
     <td width='100'  align='center' class='header_laporan'>Realisasi</td>
	  </tr>  ";
		$n_max=0;$total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n_max+=$row->n_max;
			$total+=$row->total;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_akun</td>
	 <td class='isi_laporan'>$row->nama_akun</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	 <td class='isi_laporan'>$row->nama_pp</td>
	 <td align='right' class='isi_laporan'>".number_format($row->n_max,0,",",".")."</td>
	 <td align='right' class='isi_laporan'>".number_format($row->total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='right' colspan='5'>Total</td>
	 <td align='right' class='header_laporan'>".number_format($n_max,0,",",".")."</td>
	 <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
