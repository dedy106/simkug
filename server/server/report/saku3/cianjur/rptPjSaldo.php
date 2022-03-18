<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_cianjur_rptPjSaldo extends server_report_basic
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
from panjar2_m a  $this->filter ";
		
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
		$sql="select a.no_panjar,a.kode_lokasi,convert(varchar,a.tanggal,103) as tgl_panjar,a.nik_buat,b.nama as nama_buat,a.kode_pp,c.nama as nama_pp,a.nilai,a.keterangan,
		e.no_spb,convert(varchar,e.tanggal,103)  as tgl_spb,f.no_bukti,convert(varchar,f.tanggal,103)  as tgl_kas,g.no_ptg,convert(varchar,g.tanggal,103)  as tgl_ptg,
		i.no_ver,convert(varchar,i.tanggal,103)  as tgl_ver,isnull(g.nilai,0) as nilai_ptg,isnull(g.nilai_kas,0) as nilai_kas,a.nilai - isnull(g.nilai,0) - isnull(g.nilai_kas,0) as saldo,
		g.no_final,convert(varchar,j.tanggal,103) as tgl_final,k.no_bukti as no_kasptg
		from panjar2_m a
		inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi 
		inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
		left join spb_d d on a.no_panjar=d.no_bukti and a.kode_lokasi=d.kode_lokasi
		left join spb_m e on d.no_spb=e.no_spb and d.kode_lokasi=e.kode_lokasi
		left join trans_m f on e.no_kas=f.no_bukti and e.kode_lokasi=f.kode_lokasi 
		left join panjarptg2_m g on a.no_panjar=g.no_panjar and a.kode_lokasi=g.kode_lokasi 
		left join ver_d h on g.no_ptg=h.no_bukti and g.kode_lokasi=h.kode_lokasi
		left join ver_m i on h.no_ver=i.no_ver and h.kode_lokasi=i.kode_lokasi
		left join ptg_m j on g.no_final=j.no_ptg and g.kode_lokasi=j.kode_lokasi 
		left join trans_m k on j.no_kas=k.no_bukti and j.kode_lokasi=k.kode_lokasi
		$this->filter
		order by a.no_panjar ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
	<td width='60' rowspan='2' align='center' class='header_laporan'>NIK</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama</td>
	<td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP</td>
    <td width='150' rowspan='2' align='center' class='header_laporan'>Nama PP</td>
   
    <td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
    <td colspan='6' align='center' class='header_laporan'>Pencairan</td>
    <td colspan='7' align='center' class='header_laporan'>Pertanggung Jawaban</td>
	 <td colspan='4' align='center' class='header_laporan'>Nilai Panjar</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='150' align='center' class='header_laporan'>No Panjar </td>
    <td width='60' align='center' class='header_laporan'>Tgl Panjar </td>
    <td width='100' align='center' class='header_laporan'>No SPB </td>
    <td width='60' align='center' class='header_laporan'>Tgl SPB </td>
    <td width='150' align='center' class='header_laporan'>No KasBank </td>
    <td width='60' align='center' class='header_laporan'>Tgl KasBank </td>
    <td width='150' align='center' class='header_laporan'>No PTG </td>
    <td width='60' align='center' class='header_laporan'>Tgl PTG </td>
    <td width='150' align='center' class='header_laporan'>No Ver </td>
    <td width='60' align='center' class='header_laporan'>Tgl Ver </td>
    <td width='150' align='center' class='header_laporan'>No Final </td>
    <td width='150' align='center' class='header_laporan'>No KasBank </td>
    <td width='60' align='center' class='header_laporan'>Tgl Final </td>
	<td width='90' align='center' class='header_laporan'>Nilai Pencairan </td>
    <td width='90' align='center' class='header_laporan'>Nilai Pertanggungan </td>
    <td width='90' align='center' class='header_laporan'>Nilai Kasbank </td>
	<td width='90' align='center' class='header_laporan'>Saldo </td>
  </tr>";
		$nilai=0; $nilai_ptg=0; $nilai_kas=0; $saldo=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ptg=$nilai_ptg+$row->nilai_ptg;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
			$saldo=$saldo+$row->saldo;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row->nik_buat</td>
    <td class='isi_laporan'>$row->nama_buat</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->no_panjar</td>
	<td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan'>$row->no_spb</td>
    <td class='isi_laporan'>$row->tgl_spb</td>
	 <td class='isi_laporan'>$row->no_bukti</td>
    <td class='isi_laporan'>$row->tgl_kas</td>
    <td class='isi_laporan'>$row->no_ptg</td>
    <td class='isi_laporan'>$row->tgl_ptg</td>
    <td class='isi_laporan'>$row->no_ver</td>
	 <td class='isi_laporan'>$row->tgl_ver</td>
	  <td class='isi_laporan'>$row->no_final</td>
	  <td class='isi_laporan'>$row->no_kasptg</td>
	   <td class='isi_laporan'>$row->tgl_final</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='19'>Total</td>
	<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
    <td class='header_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
