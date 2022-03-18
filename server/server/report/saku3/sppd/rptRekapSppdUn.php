<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sppd_rptRekapSppdUn extends server_report_basic
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
		
		
		$sql="select a.kode_pp,a.nama,isnull(b.nilai_uhar,0) as nilai_uhar,isnull(b.nilai_trans,0) as nilai_trans,isnull(b.nilai_uhar,0)+isnull(b.nilai_trans,0) as total
from pp a
inner join (select a.kode_pp,a.kode_lokasi,sum(a.nilai_uhar) as nilai_uhar, sum(a.nilai_trans) as nilai_trans
from sp_spj_m a
$this->filter
group by a.kode_pp,a.kode_lokasi
		  )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$lokasi'
order by a.kode_pp ";

		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap sppd per PP",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='60'  align='center' class='header_laporan'>Kode PP</td>
	 <td width='200'  align='center' class='header_laporan'>Nama PP</td>
	 <td width='80'  align='center' class='header_laporan'>Uang Harian</td>
	 <td width='80'  align='center' class='header_laporan'>Transportasi</td>
	 <td width='100'  align='center' class='header_laporan'>Total</td>
     </tr>  ";
		$total=0; $nilai_uhar=0; $nilai_trans=0; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total+=$row->total;
			$nilai_uhar+=$row->nilai_uhar;
			$nilai_trans+=$row->nilai_trans;
			
		
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	  <td class='isi_laporan' align='center'>$row->kode_pp</td>
	 <td class='isi_laporan' >$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_uhar,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_trans,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->total,0,",",".")."</td>
	 </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='isi_laporan' align='center' colspan='3'>Total</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_uhar,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($nilai_trans,0,",",".")."</td>
	    <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
