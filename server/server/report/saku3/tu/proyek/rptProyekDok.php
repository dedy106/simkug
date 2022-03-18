<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_proyek_rptProyekDok extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$periode=$tmp[1];
		$jenis=$tmp[2];
		
		$tmp="";
		
		$sql="select a.kode_proyek,a.kode_lokasi,e.no_rab,a.kode_pp,a.kode_cust,a.nama,a.no_pks,a.nilai,a.kode_pp,
       b.nama as nama_pp,c.nama as nama_cust,isnull(d.jumlah,0) as jumlah
from prb_proyek a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join prb_cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
inner join prb_rabapp_m e on a.kode_proyek=e.kode_proyek and a.kode_lokasi=e.kode_lokasi
left join (select c.kode_proyek,c.kode_lokasi,count(a.no_rab) as jumlah
			from prb_rab_dok a 
			inner join prb_dok_jenis b on a.kode_jenis=b.kode_jenis and a.kode_lokasi=b.kode_lokasi 
			inner join prb_rabapp_m c on a.no_ref=c.no_rab and a.kode_lokasi=c.kode_lokasi
			where a.kode_lokasi='11'
			group by c.kode_proyek,c.kode_lokasi
		   )d on a.kode_proyek=d.kode_proyek and a.kode_lokasi=d.kode_lokasi
		$this->filter
		order by a.kode_proyek";

      

		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Dokumen Proyek",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1000'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
	<td width='80'  align='center' class='header_laporan'>No Proyek</td>
	<td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='150'  align='center' class='header_laporan'>Kode Kontrak</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Proyek</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Mitra</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai</td>
	 <td width='60'  align='center' class='header_laporan'>Jumlah Dok</td>
	  </tr>  ";
		$nilai=0;  $nilai_or=0; $shu=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
		echo "<tr >
		<td class='isi_laporan' align='center'>$i</td>
		 <td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDok('$row->no_rab','$row->kode_lokasi');\">$row->kode_proyek</a></td>
		 <td class='isi_laporan'>$row->kode_pp</td>
		  <td class='isi_laporan'>$row->no_pks</td>
		<td class='isi_laporan'>$row->nama</td>
		<td class='isi_laporan'>$row->nama_cust</td>
		<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
		<td class='isi_laporan' align='center'>".number_format($row->jumlah,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
	
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
