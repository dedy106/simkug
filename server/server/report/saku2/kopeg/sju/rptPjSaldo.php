<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPjSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_pj)
from panjar_m a
inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi
left join ptg_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi
$this->filter ";
		
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
	
		$sql="select a.no_pj,b.nama,a.nik_pengaju,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.no_kas,a.nilai,
		c.no_ptg,date_format(c.tanggal,'%d/%m/%Y') as tgl_ptg,c.nilai as nilai_ptg,c.nilai_kas as nilai_kas_ptg,c.no_kas as no_kas_ptg
from panjar_m a
inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi
left join ptg_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_pj";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("kontrol panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>NIK</td>
	<td width='150' rowspan='2' align='center' class='header_laporan'>Nama</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
    <td colspan='4' align='center' class='header_laporan'>Pencairan</td>
    <td colspan='5' align='center' class='header_laporan'>Pertanggungjawaban</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' align='center' class='header_laporan'>No Panjar </td>
    <td width='110' align='center' class='header_laporan'>No KasBank </td>
    <td width='50' align='center' class='header_laporan'>Tanggal</td>
    <td width='80' align='center' class='header_laporan'>Nilai</td>
    <td width='100' align='center' class='header_laporan'>No Pertanggungan </td>
    <td width='110' align='center' class='header_laporan'>No KasBank </td>
    <td width='50' align='center' class='header_laporan'>Tanggal</td>
    <td width='80' align='center' class='header_laporan'>Nilai Pertanggungan </td>
    <td width='80' align='center' class='header_laporan'>Nilai Kasbank </td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->nik_pengaju</td>
    <td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->no_pj</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td class='isi_laporan'>$row->no_ptg</td>
    <td class='isi_laporan'>$row->no_kas_ptg</td>
    <td class='isi_laporan'>$row->tgl_ptg</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas_ptg,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
