<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_panjar_rptPanjarPtg extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1 ";
		
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
		$lokasi=$tmp[0];
		$periode=$tmp[1];	
		$sql="SELECT a.no_ptg, a.no_pj, a.no_kas, a.no_dokumen, convert(varchar(20),a.tanggal,103) as tgl, a.keterangan, a.catatan, 
	   a.akun_pj,b.nama as nama_pj, a.akun_kas,f.nama as nama_kas, a.nik_buat, c.nama as nama_buat, 
	   a.nik_setuju,d.nama as nama_setuju, a.kode_pp,e.nama as nama_pp,a.kode_drk, 
	    g.nilai as nilai_pj,a.nilai, a.nilai_kas 
FROM ptg_m a 
inner join masakun b on a.akun_pj=b.kode_akun and a.kode_lokasi=b.kode_lokasi 
inner join karyawan c on a.nik_buat=c.nik 
inner join karyawan d on a.nik_setuju=d.nik 
inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi 
left join masakun f on a.akun_kas=f.kode_akun and a.kode_lokasi=f.kode_lokasi 
inner join panjar_m g on a.no_pj=g.no_pj and a.kode_lokasi=g.kode_lokasi
$this->filter order by a.no_ptg";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("pertanggungan panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>No PTG</td>
	<td width='80' align='center' class='header_laporan'>No Panjar</td>
    <td width='80' align='center' class='header_laporan'>No Kas</td>
    <td width='100' align='center' class='header_laporan'>No Dokumen</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
	<td width='80' align='center' class='header_laporan'>Nik Pengaju</td>
	<td width='150' align='center' class='header_laporan'>Nama Pengaju</td>
	<td width='80' align='center' class='header_laporan'>Kode PP</td>
	<td width='150' align='center' class='header_laporan'>Nama PP</td>
	<td width='200' align='center' class='header_laporan'>Keterangan</td>
	<td width='90' align='center' class='header_laporan'>Nilai Panjar</td>
	<td width='90' align='center' class='header_laporan'>Nilai PTG</td>
	<td width='90' align='center' class='header_laporan'>Nilai Kas</td>
  </tr>
 ";
		$nilai=0; $nilai_pj=0; $nilai_kas=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_pj+=$row->nilai_pj;
			$nilai_kas+=$row->nilai_kas;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_ptg</td>
    <td class='isi_laporan'>$row->no_pj</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->no_dokumen</td>
    <td class='isi_laporan'>$row->tgl</td>
	<td class='isi_laporan'>$row->nik_buat</td>
	<td class='isi_laporan'>$row->nama_buat</td>
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->keterangan</td
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_pj,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='11'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_pj,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
