<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_klinik_rptBeliRekapKlp extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select 1 ";
		error_log($sql);
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
		$kode_lokasi=$tmp[1];
		$nik_user=$tmp[2];
	
		$sql="select c.kode_klp,d.nama,sum(b.harga*b.jumlah) as total,sum(b.jumlah) as jumlah,sum(b.bonus) as bonus,sum(b.diskon) as diskon
from kli_beli_m a
inner join kli_beli_d b on a.no_beli=b.no_beli and a.kode_lokasi=b.kode_lokasi
inner join kli_obat c on b.kode_obat=c.kode_obat and b.kode_lokasi=c.kode_lokasi
inner join kli_obat_klp d on c.kode_klp=d.kode_klp and c.kode_lokasi=d.kode_lokasi
$this->filter
group by c.kode_klp,d.nama ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap pembelian per kelompok obat",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>Kode</td>
    <td width='300' align='center' class='header_laporan'>Nama</td>
	<td width='50' align='center' class='header_laporan'>Jumlah</td>
	<td width='50' align='center' class='header_laporan'>Bonus</td>
	<td width='80' align='center' class='header_laporan'>Nilai</td>
	<td width='80' align='center' class='header_laporan'>Diskon</td>
   </tr>";
		$total=0; $jumlah=0; $bonus=0; $diskon=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah+=$row->jumlah;
			$bonus+=$row->bonus;
			$diskon+=$row->diskon;
			$total+=$row->total;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
   <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTiket('$row->kode_klp','$row->kode_lokasi');\">$row->kode_klp</a>";
			echo "</td>
			<td class='isi_laporan'>$row->nama</td>
			<td class='isi_laporan' align='right'>".number_format($row->jumlah,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->bonus,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->diskon,0,',','.')."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center' colspan='3'>Total</td>
  			<td class='isi_laporan' align='right'>".number_format($jumlah,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($bonus,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($diskon,0,',','.')."</td>
    </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  
