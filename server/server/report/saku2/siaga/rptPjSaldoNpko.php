<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_siaga_rptPjSaldoNpko extends server_report_basic
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
from gr_panjar_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join gr_panjarptg_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi
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
		$sql="select a.no_panjar,a.kode_lokasi,a.nik_buat,b.nama,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.no_kas,a.nilai,
		c.no_ptg,c.no_kas as kas_ptg,date_format(c.tanggal,'%d/%m/%Y') as tgl_ptg,c.nilai as nilai_ptg,c.nilai_kas as nilai_kas_ptg,
		date_format(d.tanggal,'%d/%m/%Y') as tgl_cair,a.no_spb,date_format(e.tanggal,'%d/%m/%Y') as tgl_spb,
		f.no_npp,date_format(f.tanggal,'%d/%m/%Y') as tgl_npp,g.no_npko,date_format(h.tanggal,'%d/%m/%Y') as tgl_npko
from gr_panjar_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join gr_panjarptg_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi
left join kas_m d on a.no_kas=d.no_kas and a.kode_lokasi=d.kode_lokasi
left join gr_spb_m e on a.no_spb=e.no_spb and a.kode_lokasi=e.kode_lokasi
left join gr_npp_m f on a.no_panjar=f.no_npp and a.kode_lokasi=f.kode_lokasi
left join gr_npko_d g on a.no_panjar=g.no_panjar and a.kode_lokasi=g.kode_lokasi
left join gr_npko_m h on g.no_npko=h.no_npko and g.kode_lokasi=h.kode_lokasi
$this->filter order by a.no_panjar";
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan kontrol panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>NIK</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama</td>
    <td width='100' rowspan='2' align='center' class='header_laporan'>No Panjar </td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
    <td colspan='9' align='center' class='header_laporan'>Pencairan</td>
    <td colspan='6' align='center' class='header_laporan'>Pertanggungjawaban</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
	 <td width='110' align='center' class='header_laporan'>No NPKO </td>
    <td width='50' align='center' class='header_laporan'>Tgl NPKO</td>
	 <td width='110' align='center' class='header_laporan'>No NPP </td>
    <td width='50' align='center' class='header_laporan'>Tgl NPP</td>
    <td width='110' align='center' class='header_laporan'>No SPB </td>
    <td width='50' align='center' class='header_laporan'>Tgl SPB</td>
	 <td width='110' align='center' class='header_laporan'>No KasBank </td>
    <td width='50' align='center' class='header_laporan'>Tgl KasBank</td>
    <td width='80' align='center' class='header_laporan'>Nilai</td>
    <td width='100' align='center' class='header_laporan'>No Pertanggungan </td>
	<td width='50' align='center' class='header_laporan'>Tgl Ptg</td>
    <td width='110' align='center' class='header_laporan'>No KasBank </td>
    <td width='50' align='center' class='header_laporan'>Tgl KasBank</td>
    <td width='80' align='center' class='header_laporan'>Nilai Pertanggungan </td>
    <td width='80' align='center' class='header_laporan'>Nilai Kasbank </td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->nik_buat</td>
    <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenBukti('$row->no_panjar','$row->kode_lokasi');\">$row->no_panjar</a>";
		echo "</td>
		<td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan'>$row->keterangan</td>
	  <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenNpko('$row->no_npko','$row->kode_lokasi');\">$row->no_npko</a>";
		echo "</td>
    <td class='isi_laporan'>$row->tgl_npko</td>
	  <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenNpp('$row->no_npp','$row->kode_lokasi');\">$row->no_npp</a>";
		echo "</td>
    <td class='isi_laporan'>$row->tgl_npp</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSpb('$row->no_spb','$row->kode_lokasi');\">$row->no_spb</a>";
		echo "</td>
    <td class='isi_laporan'>$row->tgl_cair</td>
	 <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKas('$row->no_kas','$row->kode_lokasi');\">$row->no_kas</a>";
		echo "</td>
    <td class='isi_laporan'>$row->tgl_spb</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenPtg('$row->no_ptg','$row->kode_lokasi');\">$row->no_ptg</a>";
		echo "</td>
	<td class='isi_laporan'>$row->tgl_ptg</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKasPtg('$row->kas_ptg','$row->kode_lokasi');\">$row->kas_ptg</a>";
		echo "</td>
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
