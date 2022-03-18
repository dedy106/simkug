<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_spj_rptPdRekapPpTu extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];
		
		$sql="select a.kode_pp,ISNULL(a.jum,0) as jum,c.nama as nama_pp,
	   ISNULL(e.total1,0) as total1,ISNULL(e.total2,0) as total2,ISNULL(e.total3,0) as total3,ISNULL(e.total,0) as total
from (
select a.kode_pp,a.kode_lokasi,COUNT(a.no_spj) as jum
from tu_pdaju_m a
$this->filter
group by a.kode_pp,a.kode_lokasi
	)a
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,
				  sum(case when c.jenis='1' then b.total else 0 end) as total1,
				  sum(case when c.jenis='2' then b.total else 0 end) as total2,
				  sum(case when c.jenis='3' then b.total else 0 end) as total3,
				  sum(b.total) as total
		   from tu_pdaju_m a
		   inner join tu_pdaju_d b on a.no_spj=b.no_spj and a.kode_lokasi=b.kode_lokasi
		   inner join tu_pd_param c on b.kode_param=c.kode_param and b.kode_lokasi=c.kode_lokasi
		   $this->filter
		   group by  a.kode_pp,a.kode_lokasi
		   )e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
where a.kode_lokasi='$lokasi'
order by a.kode_pp ";
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap perjalanan dinas per unit",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='200'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='80'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='80'  align='center' class='header_laporan'>Transportasi</td>
	 <td width='80'  align='center' class='header_laporan'>Lain-Lain</td>
	 <td width='100'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$total=0; $total1=0; $total2=0; $total3=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$total1+=$row->total1;
			$total2+=$row->total2;
			$total3+=$row->total3;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->kode_pp</td>
	 <td class='isi_laporan' >$row->nama_pp</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($total1,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($total3,0,",",".")."</td>
		 <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
