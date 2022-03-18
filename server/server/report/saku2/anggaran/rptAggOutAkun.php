<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_anggaran_rptAggOutAkun extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		
		return $totPage;
	}
	
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];

		$sql = "select a.kode_akun,b.nama as nama_akun,a.kode_lokasi,sum(a.rka) as rka,sum(a.realisasi) as realisasi,sum(a.outlook) as outlook, 
		case when sum(a.rka) = 0 then 0 else sum(a.outlook)/sum(a.rka)*100 end as persen 
from agg_outlook a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi $this->filter
group by a.kode_akun,b.nama,a.kode_lokasi
order by a.kode_akun ";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("outlook per akun",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		echo "<center><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25' class='header_laporan'  align='center'>No</td>
<td width='80' class='header_laporan'  align='center'>Kode Akun</td>
<td width='300' class='header_laporan'  align='center'>Nama Akun</td>
<td width='100' class='header_laporan'  align='center'>RKA</td>
<td width='100' class='header_laporan'  align='center'>Realisasi</td>
<td width='100' class='header_laporan'  align='center'>Outlook</td>
<td width='50' class='header_laporan'  align='center'>Persen</td>
  </tr>";
		$i=1;
		$rka=0;$realisasi=0;$outlook=0;$persen=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$rka=$rka+$row->rka;
			$realisasi=$realisasi+$row->realisasi;
			$outlook=$outlook+$row->outlook;
			$persen=$persen+$row->persen;
			echo "<tr>
  <td height='23' class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan' align='right'>".number_format($row->rka,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->realisasi,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->outlook,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->persen,2,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
  <td height='23' class='header_laporan' align='center' colspan='3'>Total</td>
  <td class='header_laporan' align='right'>".number_format($rka,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($realisasi,0,',','.')."</td>
  <td class='header_laporan' align='right'>".number_format($outlook,0,',','.')."</td>
  
</tr>";
		
		echo "</table></center>";
		return "";
	}
	
	
}

