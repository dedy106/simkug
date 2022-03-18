<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kpa_rptPjSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_panjar)
from itt_panjar_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join itt_panjarptg_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi
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
	
		$sql="select a.no_panjar,a.kode_lokasi,b.nama,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.no_kas,a.nilai,a.nik_buat,
		c.no_ptg,c.no_kk,c.no_km,date_format(c.tanggal,'%d/%m/%Y') as tgl_ptg,isnull(c.nilai,0) as nilai_ptg,isnull(c.nilai_kas,0) as nilai_kas_ptg,
		a.kode_pp,d.nama as nama_pp,a.nilai-(isnull(c.nilai,0)+isnull(c.nilai_kas,0)) as saldo
from itt_panjar_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join itt_panjarptg_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_panjar";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
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
	<td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP</td>
	<td width='150' rowspan='2' align='center' class='header_laporan'>Nama PP</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
    <td colspan='4' align='center' class='header_laporan'>Pencairan</td>
    <td colspan='7' align='center' class='header_laporan'>Pertanggungjawaban</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>No Panjar </td>
    <td width='80' align='center' class='header_laporan'>No KasBank </td>
    <td width='50' align='center' class='header_laporan'>Tanggal</td>
    <td width='80' align='center' class='header_laporan'>Nilai</td>
    <td width='80' align='center' class='header_laporan'>No Pertanggungan </td>
    <td width='80' align='center' class='header_laporan'>No KasBank Masuk </td>
	<td width='80' align='center' class='header_laporan'>No KasBank Keluar </td>
    <td width='50' align='center' class='header_laporan'>Tanggal</td>
    <td width='80' align='center' class='header_laporan'>Nilai Pertanggungan </td>
    <td width='80' align='center' class='header_laporan'>Nilai Kasbank </td>
	<td width='80' align='center' class='header_laporan'>Saldo </td>
  </tr>";
		$nilai=0; $nilai_ptg=0; $nilai_kas_ptg=0; $saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ptg=$nilai_ptg+$row->nilai_ptg;
			$nilai_kas_ptg=$nilai_kas_ptg+$row->nilai_kas_ptg;
			$saldo=$saldo+$row->saldo;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->nik_buat</td>
	<td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_pp</td>
	<td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPanjar('$row->no_panjar','$row->kode_lokasi');\">$row->no_panjar</a>";
		echo "</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
    <td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPtg('$row->no_ptg','$row->kode_lokasi');\">$row->no_ptg</a>";
		echo "</td>
    <td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_km','$row->kode_lokasi');\">$row->no_km</a>";
		echo "</td>
	<td class='isi_laporan'>";
		echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kk','$row->kode_lokasi');\">$row->no_kk</a>";
		echo "</td>
    <td class='isi_laporan'>$row->tgl_ptg</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas_ptg,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='right' colspan='9'>Total</td>
  
    <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    <td class='header_laporan' colspan='4'>&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($nilai_kas_ptg,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
