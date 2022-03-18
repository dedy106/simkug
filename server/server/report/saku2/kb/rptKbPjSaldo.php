<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kb_rptKbPjSaldo extends server_report_basic
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
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
left join ptg_m c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi $this->filter ";
		
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
		$sql="select a.nik_pengaju,b.nama,a.kode_pp,d.nama as nama_pp,a.no_pj,a.no_kas,date_format(a.tanggal,'%d/%m/%Y') as tgl_panjar,date_format(a.due_date,'%d/%m/%Y') as due_date,a.keterangan,a.nilai, 
	   c.no_ptg,c.no_kas as kas_ptg,date_format(c.tanggal,'%d/%m/%Y') as tgl_ptg,isnull(c.nilai,0) as nilai_ptg,
      case when isnull(c.nilai_kas,0)=0 then isnull(a.nilai,0)-isnull(c.nilai,0)-isnull(c.nilai_kas,0) else 0 end as saldo, 
      case when isnull(c.nilai_kas,0)<>0 then isnull(c.nilai_kas,0) else 0 end as nilai_kas 
from panjar_m a 
inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
left join (select no_pj,kode_lokasi,no_ptg,tanggal,no_kas,nilai,nilai_kas
		   from ptg_m 
		   where kode_lokasi='$kode_lokasi' and periode<='$periode'
		   )c on a.no_pj=c.no_pj and a.kode_lokasi=c.kode_lokasi  
$this->filter
order by a.no_pj ";
		
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
    <td colspan='4' align='center' class='header_laporan'>Pencairan</td>
    <td colspan='6' align='center' class='header_laporan'>Pertanggungjawaban</td>
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
	<td width='80' align='center' class='header_laporan'>Saldo</td>
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
	<td class='isi_laporan'>$row->nik_pengaju</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->keterangan</td>
    <td class='isi_laporan'>$row->no_pj</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
    <td class='isi_laporan'>$row->no_ptg</td>
    <td class='isi_laporan'>$row->kas_ptg</td>
    <td class='isi_laporan'>$row->tgl_ptg</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='9'>Total</td>
	<td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
    <td class='header_laporan' colspan='3'>&nbsp;</td>
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
