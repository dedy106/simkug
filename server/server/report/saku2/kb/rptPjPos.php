<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptPjPos extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select count(a.no_pjaju)
from yk_pjaju_m a 
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi  
inner join pp f on b.kode_pp=f.kode_pp and b.kode_lokasi=f.kode_lokasi 
left join yk_ver_d c on a.no_pjaju=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.modul='PJAJU' 
left join yk_ver_m d on c.no_ver=d.no_ver and c.kode_lokasi=d.kode_lokasi  
left join kas_m e on a.no_kas=e.no_kas and a.kode_lokasi=e.kode_lokasi 
left join ptg_m g on a.no_pjaju=g.no_pj and a.kode_lokasi=g.kode_lokasi 
left join yk_ver_d h on g.no_pj=h.no_bukti and g.kode_lokasi=h.kode_lokasi and h.modul='PJPTGAJU' 
left join yk_ver_m i on h.no_ver=i.no_ver and h.kode_lokasi=i.kode_lokasi 
left join kas_m j on g.no_kas=j.no_kas and g.kode_lokasi=j.kode_lokasi ";
		
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
	
		$sql="select a.no_pjaju,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,a.keterangan,a.nik_buat,b.nama,b.kode_pp,f.nama as nama_pp, 
	   d.no_ver,date_format(d.tanggal,'%d/%m/%Y') as tgl_ver,e.no_kas,date_format(e.tanggal,'%d/%m/%Y')  as tgl_kas,a.nilai, 
	    g.no_ptg,date_format(g.tanggal,'%d/%m/%Y') as tgl_ptg, 
	   i.no_ver as ver_ptg,date_format(i.tanggal,'%d/%m/%Y') as tgl_ver_ptg,j.no_kas as kas_ptg,date_format(j.tanggal,'%d/%m/%Y')  as tgl_kas_ptg,g.nilai as nilai_ptg,g.nilai_kas 
from yk_pjaju_m a 
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi  
inner join pp f on b.kode_pp=f.kode_pp and b.kode_lokasi=f.kode_lokasi 
left join yk_ver_d c on a.no_pjaju=c.no_bukti and a.kode_lokasi=c.kode_lokasi and c.modul='PJAJU' 
left join yk_ver_m d on c.no_ver=d.no_ver and c.kode_lokasi=d.kode_lokasi  
left join kas_m e on a.no_kas=e.no_kas and a.kode_lokasi=e.kode_lokasi 
left join ptg_m g on a.no_pjaju=g.no_pj and a.kode_lokasi=g.kode_lokasi 
left join yk_ver_d h on g.no_pj=h.no_bukti and g.kode_lokasi=h.kode_lokasi and h.modul='PJPTGAJU' 
left join yk_ver_m i on h.no_ver=i.no_ver and h.kode_lokasi=i.kode_lokasi 
left join kas_m j on g.no_kas=j.no_kas and g.kode_lokasi=j.kode_lokasi ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("posisi panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2'  align='center' class='header_laporan'>No</td>
    <td colspan='8' align='center' class='header_laporan'>Pengajuan Panjar</td>
    <td colspan='4' align='center' class='header_laporan'>Pencairan Panjar </td>
    <td colspan='8' align='center' class='header_laporan'>Pertanggungan Panjar </td>
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
	<td width='100' align='center' class='header_laporan'>No Ver </td>
	<td width='60' align='center' class='header_laporan'>Tgl Ver </td>
	<td width='100' align='center' class='header_laporan'>No KasBank </td>
	<td width='60' align='center' class='header_laporan'>Tgl KasBank </td>
	<td width='100' align='center' class='header_laporan'>No Ptg</td>
	<td width='60' align='center' class='header_laporan'>Tgl Ptg</td>
	<td width='100' align='center' class='header_laporan'>No Ver </td>
	<td width='60' align='center' class='header_laporan'>Tgl Ver </td>
	<td width='100' align='center' class='header_laporan'>No KasBank </td>
	<td width='60' align='center' class='header_laporan'>Tgl KasBank </td>
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
	 <td class='isi_laporan'>$row->no_pjaju</td>
	  <td class='isi_laporan'>$row->nik_buat</td>
    <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan'>$row->kode_pp</td>
	  <td class='isi_laporan'>$row->nama_pp</td>
	   <td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan'>$row->no_ver</td>
	<td class='isi_laporan'>$row->tgl_ver</td>
	<td class='isi_laporan'>$row->no_kas</td>
	<td class='isi_laporan'>$row->tgl_kas</td>
	<td class='isi_laporan'>$row->no_ptg</td>
	<td class='isi_laporan'>$row->tgl_ptg</td>
	<td class='isi_laporan'>$row->ver_ptg</td>
	<td class='isi_laporan'>$row->tgl_ver_ptg</td>
	<td class='isi_laporan'>$row->kas_ptg</td>
	<td class='isi_laporan'>$row->tgl_kas_ptg</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
    </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='8'>Total</td>
	<td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	<td class='isi_laporan' align='center' colspan='10'>Total</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
