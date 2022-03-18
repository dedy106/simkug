<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_klinik_rptBeliRekap extends server_report_basic
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
		
		$sql="select a.no_beli,a.kode_lokasi,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_dokumen,a.keterangan,a.nilai-a.nilai_ppn as nilai_jual,a.nilai_ppn,a.nilai_diskon,(a.nilai+a.nilai_ppn-a.nilai_diskon) as total,
	   a.kode_vendor,b.nama as nama_vendor ,a.kode_pp,c.nama as nama_pp
from kli_beli_m a
inner join kli_vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join kli_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
$this->filter
order by a.no_beli ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pembelian obat",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No Bukti</td>
    <td width='100' align='center' class='header_laporan'>No Dokumen</td>
	 <td width='60' align='center' class='header_laporan'>Tanggal</td>
	 <td width='60' align='center' class='header_laporan'>Gudang</td>
	 <td width='150' align='center' class='header_laporan'>Vendor</td>
	<td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>Nilai</td>
	<td width='80' align='center' class='header_laporan'>PPN</td>
	<td width='80' align='center' class='header_laporan'>Diskon</td>
	<td width='80' align='center' class='header_laporan'>Total</td>
   </tr>";
		$nilai_jual=0; $nilai_ppn=0; $nilai_diskon=0; $total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_jual+=$row->nilai_jual;
			$nilai_ppn+=$row->nilai_ppn;
			$nilai_diskon+=$row->nilai_diskon;
			$total+=$row->total;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
			<td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTiket('$row->no_beli','$row->kode_lokasi');\">$row->no_beli</a>";
			echo "</td>
			<td class='isi_laporan'>$row->no_dokumen</td>
			<td class='isi_laporan'>$row->tgl</td>
			<td class='isi_laporan'>$row->kode_pp</td>
			<td class='isi_laporan'>$row->kode_vendor - $row->nama_vendor</td>
			<td class='isi_laporan'>$row->keterangan</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_jual,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->nilai_diskon,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($row->total,0,',','.')."</td>
    </tr>";	 
			$i=$i+1;
		}
		echo "<tr>
			<td class='header_laporan' align='center' colspan='7'>Total</td>
  			<td class='isi_laporan' align='right'>".number_format($nilai_jual,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($nilai_diskon,0,',','.')."</td>
			<td class='isi_laporan' align='right'>".number_format($total,0,',','.')."</td>
    </tr>";	 
		echo "</div>";
		return "";
	}
	
}
?>
  
