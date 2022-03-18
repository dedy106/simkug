<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_logistik_rptPoStatus extends server_report_basic
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
		$kode_lokasi=$tmp[1];
		$sql="select a.no_ba,f.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,
		a.keterangan,a.nilai,e.kode_akun,a.akun_hutang,d.no_aju,d.no_ver,d.no_fiat,d.no_kas
from log_ba_m a
inner join spb_d b on a.no_ba=b.no_bukti and a.kode_lokasi=b.kode_lokasi
inner join spb_m c on b.no_spb=c.no_spb and b.kode_lokasi=b.kode_lokasi
left join it_aju_m d on c.no_kas=d.no_aju and c.kode_lokasi=d.kode_lokasi
inner join gl_fa_asset e on a.no_ba=e.no_fa and a.kode_lokasi=e.kode_lokasi
inner join log_po_m f on a.no_po=f.no_po and a.kode_lokasi=f.kode_lokasi
$this->filter
order by a.no_ba ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi berita acara",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
 
  <tr bgcolor='#CCCCCC'>
   <td width='30' align='center' class='header_laporan'>No </td>
    <td width='80' align='center' class='header_laporan'>No BA </td>
	<td width='150' align='center' class='header_laporan'>No Dokumen</td>
	<td width='60'  align='center' class='header_laporan'>Tanggal</td>
	<td width='250' align='center' class='header_laporan'>Keterangan</td>
	<td width='80' align='center' class='header_laporan'>Nilai</td>
   <td width='80' align='center' class='header_laporan'>Akun Asset</td>
	<td width='80' align='center' class='header_laporan'>Akun Hutang </td>
	<td width='80' align='center' class='header_laporan'>No Agenda </td>
	<td width='80' align='center' class='header_laporan'>No Verifikasi</td>
	<td width='80' align='center' class='header_laporan'>No Fiatur</td>
	<td width='80' align='center' class='header_laporan'>No KasBank</td>
    </tr>
	";
		$rs = $dbLib->execute($sql);
		$j=1; $nilai=0; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			$nilai+=$row->nilai;
		echo "<tr>
		<td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->no_ba</td>
	<td class='isi_laporan'>$row->no_dokumen</td>
	<td class='isi_laporan'>$row->tgl</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td align='right' class='isi_laporan'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan'>$row->kode_akun</td>
	<td class='isi_laporan'>$row->akun_hutang</td>
	<td class='isi_laporan'>$row->no_aju</td>
	<td class='isi_laporan'>$row->no_ver</td>
	<td class='isi_laporan'>$row->no_fiat</td>
	<td class='isi_laporan'>$row->no_kas</td>
	  </tr>";
			$i=$i+1;
		}
		echo "<tr>
	<td class='isi_laporan' colspan='5'>&nbsp;</td>
	<td align='right' class='isi_laporan'>".number_format($nilai,0,",",".")."</td>
	<td class='isi_laporan' colspan='6'>&nbsp;</td>
	  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
