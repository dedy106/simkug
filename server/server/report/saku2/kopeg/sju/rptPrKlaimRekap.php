<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrKlaimRekap extends server_report_basic
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
		$sql="select b.kode_cust,f.nama as nama_cust,sum(h.nilai_awal) as nilai_awal,sum(h.nilai_deduc) as nilai_deduc,
	   sum(h.nilai_nego) as nilai_nego,sum(h.nilai_final) as nilai_final
from sju_klaim a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
inner join sju_cust f on b.kode_cust=f.kode_cust and b.kode_lokasi=f.kode_lokasi
left join sju_ver_d g on a.no_klaim=g.no_bukti and a.kode_lokasi=g.kode_lokasi and a.progress=g.status
left join sju_ver_m h on g.no_ver=h.no_ver and g.kode_lokasi=h.kode_lokasi and g.status=h.status 
$this->filter
group by b.kode_cust,f.nama
order by b.kode_cust
";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap klaim per customer",$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='50'  align='center' class='header_laporan'>Kode</td>
     <td width='250'  align='center' class='header_laporan'>Tertanggung</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Estimasi</td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Negosiasi </td>
	 <td width='90'  align='center' class='header_laporan'>Nilai Settled Claim</td>
	 
	  </tr>  ";
		$nilai_awal=0;$nilai_nego=0;$tagihan=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_awal+=$row->nilai_awal;
			$nilai_nego+=$row->nilai_nego;
			$nilai_final+=$row->nilai_final;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->kode_cust</td>
	 <td class='isi_laporan'>$row->nama_cust</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_awal,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_nego,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_final,0,',','.')."</td>
	 </tr>";
			$i=$i+1;
		}
			echo "<tr >
     <td class='isi_laporan' align='center' colspan='3'>Total</td>
    
     <td class='isi_laporan' align='right'>".number_format($nilai_awal,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_nego,0,',','.')."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_final,0,',','.')."</td>
	 </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
