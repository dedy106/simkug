<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_panjar_rptPjPos extends server_report_basic
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
from panjar2_m a 
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi   ";
		
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
	
		$sql="select a.no_panjar,a.no_dokumen,a.nilai,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.keterangan,a.nik_buat,b.nama,b.kode_pp,c.nama as nama_pp, 
	   a.no_app,a.no_spb,a.no_ver,date_format(f.tanggal,'%d/%m/%Y') as tgl_app,date_format(g.tanggal,'%d/%m/%Y') as tgl_spb,i.no_app as no_fiat,
	   date_format(i.tanggal,'%d/%m/%Y') as tgl_fiat,j.no_kas,date_format(j.tanggal,'%d/%m/%Y') as tgl_kas,
	   k.no_ptg,date_format(g.tanggal,'%d/%m/%Y') as tgl_ptg, k.no_app as no_ptg_app,date_format(l.tanggal,'%d/%m/%Y') as tgl_ptg_app,
	   k.no_ver as no_ptg_ver,date_format(m.tanggal,'%d/%m/%Y') as tgl_ptg_ver,
	   k.no_final,o.no_kas as no_ptg_kas,date_format(o.tanggal,'%d/%m/%Y') as tgl_final,k.nilai as nilai_ptg,k.nilai_kas
from panjar2_m a 
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi  
inner join pp c on b.kode_pp=c.kode_pp and b.kode_lokasi=c.kode_lokasi 
left join app_m f on a.no_app=f.no_app and a.kode_lokasi=f.kode_lokasi
left join spb_m g on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
left join app_d h on g.no_spb=h.no_bukti and g.kode_lokasi=h.kode_lokasi
left join app_m i on h.no_app=i.no_app and h.kode_lokasi=i.kode_lokasi
left join kas_m j on g.no_kas=j.no_kas and g.kode_lokasi=j.kode_lokasi
left join panjarptg2_m k on a.no_panjar=k.no_panjar and a.kode_lokasi=k.kode_lokasi
left join app_m l on k.no_app=l.no_app and k.kode_lokasi=l.kode_lokasi
left join app_m m on k.no_app=m.no_app and k.kode_lokasi=m.kode_lokasi
left join ptg_m o on k.no_final=o.no_ptg and k.kode_lokasi=o.kode_lokasi  ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
    <td colspan='8' align='center' class='header_laporan'>Pengajuan Panjar</td>
    <td colspan='6' align='center' class='header_laporan'>Pencairan Panjar </td>
    <td colspan='11' align='center' class='header_laporan'>Pertanggungan Panjar </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='100' align='center' class='header_laporan'>No Panjar </td>
	<td width='60'  align='center' class='header_laporan'>NIK</td>
    <td width='150' align='center' class='header_laporan'>Nama</td>
	<td width='60'  align='center' class='header_laporan'>Kode PP</td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
	<td width='50' align='center' class='header_laporan'>Tanggal</td>
    <td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='80' align='center' class='header_laporan'>Nilai </td>
	<td width='100' align='center' class='header_laporan'>No App </td>
	<td width='60' align='center' class='header_laporan'>Tgl App </td>
	<td width='100' align='center' class='header_laporan'>No SPB </td>
	<td width='60' align='center' class='header_laporan'>Tgl SPB </td>
	<td width='100' align='center' class='header_laporan'>No KasBank </td>
	<td width='60' align='center' class='header_laporan'>Tgl KasBank </td>
	<td width='100' align='center' class='header_laporan'>No Ptg</td>
	<td width='60' align='center' class='header_laporan'>Tgl Ptg</td>
	<td width='100' align='center' class='header_laporan'>No App </td>
	<td width='60' align='center' class='header_laporan'>Tgl App </td>
	<td width='100' align='center' class='header_laporan'>No Ver  </td>
	<td width='60' align='center' class='header_laporan'>Tgl Ver </td>
	<td width='100' align='center' class='header_laporan'>No Final  </td>
	<td width='100' align='center' class='header_laporan'>No KasBank </td>
	<td width='60' align='center' class='header_laporan'>Tgl Final </td>
	<td width='80' align='center' class='header_laporan'>Nilai Ptg</td>
	<td width='80' align='center' class='header_laporan'>Nilai KasBank</td>
    </tr>
	";
		$nilai=0;$nilai_ptg=0;$nilai_kas=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ptg=$nilai_ptg+$row->nilai_ptg;
			$nilai_kas=$nilai_kas+$row->nilai_kas;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_panjar</td>
	  <td class='isi_laporan'>$row->nik_buat</td>
    <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	  <td class='isi_laporan'>$row->nama_pp</td>
	   <td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan'>$row->no_app</td>
	<td class='isi_laporan'>$row->tgl_app</td>
	<td class='isi_laporan'>$row->no_spb</td>
	<td class='isi_laporan'>$row->tgl_spb</td>
	<td class='isi_laporan'>$row->no_kas</td>
	<td class='isi_laporan'>$row->tgl_kas</td>
	<td class='isi_laporan'>$row->no_ptg</td>
	<td class='isi_laporan'>$row->tgl_ptg</td>
	<td class='isi_laporan'>$row->no_ptg_app</td>
	<td class='isi_laporan'>$row->tgl_ptg_app</td>
	<td class='isi_laporan'>$row->no_ptg_ver</td>
	<td class='isi_laporan'>$row->tgl_ptg_ver</td>
	<td class='isi_laporan'>$row->no_final</td>
	<td class='isi_laporan'>$row->no_ptg_kas</td>
	<td class='isi_laporan'>$row->tgl_final</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
    </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='8'>Total</td>
	<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	<td class='isi_laporan' align='center' colspan='15'>Total</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
