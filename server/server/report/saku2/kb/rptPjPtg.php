<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptPjPtg extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_ptg)
from ptg_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
left join ptg_m c on a.no_ptg=c.no_ptg and a.kode_lokasi=c.kode_lokasi
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
	
		$sql="select a.no_ptg,a.no_pj,a.no_kas,a.nik_buat,b.nama,a.kode_pp,c.nama as nama_pp,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,
		a.nilai,a.nilai_kas,d.nilai as nilai_pj
from ptg_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join yk_pjaju_m d on d.no_pjaju=a.no_pj and a.kode_lokasi=d.kode_lokasi
$this->filter order by a.no_ptg";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pertanggungan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  align='center' class='header_laporan'>No</td>
	<td width='100' align='center' class='header_laporan'>No Pertangungan</td>
	<td width='100' align='center' class='header_laporan'>No Panjar</td>
	<td width='100' align='center' class='header_laporan'>No KasBank</td>
	<td width='60'  align='center' class='header_laporan'>NIK</td>
    <td width='150' align='center' class='header_laporan'>Nama</td>
	<td width='60'  align='center' class='header_laporan'>Kode PP</td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
	<td width='50' align='center' class='header_laporan'>Tanggal</td>
    <td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>Nilai Panjar</td>
	<td width='80' align='center' class='header_laporan'>Nilai Pertanggungan</td>
	<td width='80' align='center' class='header_laporan'>Nilai KasBank</td>
    </tr>";
		$nilai=0; $nilai_pj=0; $nilai_kas=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_pj=$nilai_pj+$row->nilai_pj;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_ptg</td>
	 <td class='isi_laporan'>$row->no_pj</td>
	 <td class='isi_laporan'>$row->no_kas</td>
	  <td class='isi_laporan'>$row->nik_buat</td>
    <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	  <td class='isi_laporan'>$row->nama_pp</td>
	   <td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_pj,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
    </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='right' colspan='10'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai_pj,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
