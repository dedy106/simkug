<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_kbitt_rptPanjarPosisi extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
			$sql="select count(a.no_aju)
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
$this->filter";
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
		
		$sql="select a.no_aju,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.keterangan,a.kode_pp,b.nama as nama_pp,k.nilai,
	   a.no_kas,date_format(c.tanggal,'%d/%m/%Y') as tgl_kas,
	   a.no_ver,date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,
	   a.no_fiat,date_format(e.tanggal,'%d/%m/%Y') as tgl_fiat,
	   case when f.status='1' then 'Ok' else f.status end as sts_ver,f.catatan as cat_ver,
	   case when g.status='2' then 'Ok' else g.status end as sts_fiat,g.catatan as cat_fiat,
	   a.nik_panjar,h.nama as nama_panjar,c.kode_bank,
	   i.no_aju as no_ptg,i.no_kas as no_kasptg,i.no_ver as no_verptg,i.no_fiat as no_fiatptg,i.nilai as nilai_ptg,j.nilai as nilai_kas,i.progress,j.jenis,
	   k.nilai-isnull(i.nilai,0) as selisih,case when k.nilai-(isnull(i.nilai,0)+isnull(j.nilai,0)) <0 then 0 else k.nilai-(isnull(i.nilai,0)+isnull(j.nilai,0)) end as saldo
from it_aju_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
left join ver_m d on a.no_ver=d.no_ver and a.kode_lokasi=d.kode_lokasi
left join ver_d f on d.no_ver=f.no_ver and d.kode_lokasi=f.kode_lokasi
left join fiat_m e on a.no_fiat=e.no_fiat and a.kode_lokasi=e.kode_lokasi
left join fiat_d g on e.no_fiat=g.no_fiat and e.kode_lokasi=g.kode_lokasi
inner join karyawan h on a.nik_panjar=h.nik and a.kode_lokasi=h.kode_lokasi
left join it_aju_m i on a.no_aju=i.no_ptg and a.kode_lokasi=i.kode_lokasi
left join kas_m j on i.no_kas=j.no_kas and i.kode_lokasi=j.kode_lokasi
inner join it_aju_d k on a.no_aju=k.no_aju and a.kode_lokasi=k.kode_lokasi
$this->filter order by a.no_aju";
	
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
	<td width='60' rowspan='2' align='center' class='header_laporan'>NIK</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama</td>
	<td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama PP</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
    <td colspan='5' align='center' class='header_laporan'>Pencairan</td>
    <td colspan='9' align='center' class='header_laporan'>Pertanggungjawaban</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' align='center' class='header_laporan'>No Panjar </td>
	<td width='100' align='center' class='header_laporan'>No Verifikasi </td>
	<td width='100' align='center' class='header_laporan'>No Fiat </td>
    <td width='110' align='center' class='header_laporan'>No KasBank </td>
     <td width='80' align='center' class='header_laporan'>Nilai</td>
    <td width='100' align='center' class='header_laporan'>No Pertanggungan </td>
	<td width='100' align='center' class='header_laporan'>No Verifikasi </td>
	<td width='100' align='center' class='header_laporan'>No Fiat </td>
    <td width='110' align='center' class='header_laporan'>No KasBank </td>
    <td width='80' align='center' class='header_laporan'>Nilai Pertanggungan </td>
    <td width='80' align='center' class='header_laporan'>Nilai Kasbank </td>
	<td width='80' align='center' class='header_laporan'>Selisih Panjar</td>
	<td width='80' align='center' class='header_laporan'>Saldo Panjar</td>
	<td width='80' align='center' class='header_laporan'>Keterangan</td>
  </tr>";
		$nilai=0; $nilai_ptg=0; $nilai_kas=0; $saldo=0; $selisih=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ptg=$nilai_ptg+$row->nilai_ptg;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
			$selisih+=$row->selisih;
			$ket="";
			if ($row->progress=="4")
			{
				$ket="Panjar Pas";
			}
			if ($row->progress=="3" && ($row->jenis=="KK" || $row->jenis=="BK"))
			{
				$ket="Panjar Kurang";
			}
			if ($row->progress=="3" && ($row->jenis=="KM" || $row->jenis=="BM"))
			{
				$ket="Panjar Lebih";
			}
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->nik_panjar</td>
    <td class='isi_laporan'>$row->nama_panjar</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->no_aju</td>
	 <td class='isi_laporan'>$row->no_ver</td>
	  <td class='isi_laporan'>$row->no_fiat</td>
    <td class='isi_laporan'>$row->no_kas</td>
   <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td class='isi_laporan'>$row->no_ptg</td>
	<td class='isi_laporan'>$row->no_verptg</td>
	  <td class='isi_laporan'>$row->no_fiatptg</td>
    <td class='isi_laporan'>$row->no_kasptg</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>";
	if ($row->no_kas=="-")
	{
		echo "<td class='isi_laporan' align='right'>0</td>
	<td class='isi_laporan' align='right'>0</td>";
	}
	else
	{
		echo "<td class='isi_laporan' align='right'>".number_format($row->selisih,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>";
	}
	echo "<td class='isi_laporan'>$ket</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='10'>Total</td>
	<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    <td class='header_laporan' colspan='4'>&nbsp;</td>
    <td class='header_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($selisih,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
