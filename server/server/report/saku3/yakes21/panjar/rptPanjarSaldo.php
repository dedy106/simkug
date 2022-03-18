<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sapyakes_rptPanjarSaldo extends server_report_basic
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
		$sql="select a.nik_pengaju,b.nama,a.kode_pp,d.nama as nama_pp,a.no_panjar,a.no_kas,
		convert(varchar(20),a.tanggal,103) as tgl_panjar,convert(varchar(20),a.due_date,103) as due_date,a.keterangan,a.nilai, 
	   c.no_ptg,c.no_kas,convert(varchar(20),c.tanggal,103) as tgl_ptg,isnull(c.nilai,0) as nilai_ptg,
      case when isnull(c.nilai_kas,0)=0 then isnull(a.nilai,0)-isnull(c.nilai,0)+isnull(c.nilai_kas,0) else 0 end as saldo, 
      case when isnull(c.nilai_kas,0)<>0 then isnull(c.nilai_kas,0) else 0 end as nilai_kas 
from panjar2_m a 
inner join karyawan b on a.nik_pengaju=b.nik and a.kode_lokasi=b.kode_lokasi 
inner join pp d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi 
left join ptg_m c on a.no_panjar=c.no_panjar and a.kode_lokasi=c.kode_lokasi
$this->filter order by a.no_panjar";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo panjar",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  align='center' class='header_laporan'>No</td>
    <td width='80' align='center' class='header_laporan'>NIK</td>
    <td width='150' align='center' class='header_laporan'>Nama</td>
    <td width='80' align='center' class='header_laporan'>Kode PP</td>
    <td width='150' align='center' class='header_laporan'>Nama PP</td>
	<td width='80' align='center' class='header_laporan'>No Panjar</td>
	<td width='80' align='center' class='header_laporan'>No Kas</td>
	<td width='60' align='center' class='header_laporan'>Tgl Panjar</td>
	<td width='60' align='center' class='header_laporan'>Tgl Jatuh Tempo</td>
	<td width='200' align='center' class='header_laporan'>Keterangan</td>
	<td width='90' align='center' class='header_laporan'>Nilai Panjar</td>
	<td width='80' align='center' class='header_laporan'>No PTG</td>
	<td width='80' align='center' class='header_laporan'>No Kas PTG</td>
	<td width='60' align='center' class='header_laporan'>Tgl PTG</td>
	<td width='90' align='center' class='header_laporan'>Nilai PTG</td>
	<td width='90' align='center' class='header_laporan'>Saldo Panjar</td>
	<td width='90' align='center' class='header_laporan'>Nilai Kasbank</td>
  </tr>
 ";
		$nilai=0;$nilai_ptg=0;$saldo=0;$nilai_kas=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_ptg+=$row->nilai_ptg;
			$saldo+=$row->saldo;
			$nilai_kas+=$row->nilai_kas;
		echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->nik_pengaju</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td class='isi_laporan'>$row->no_panjar</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->tgl_panjar</td>
    <td class='isi_laporan'>$row->due_date</td>
    <td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
	<td class='isi_laporan'>$row->no_ptg</td>
	<td class='isi_laporan'>$row->no_kas</td>
	<td class='isi_laporan'>$row->tgl_ptg</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ptg,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,",",".")."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' align='center' colspan='10'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
	 <td class='isi_laporan' align='center' colspan='3'>&nbsp;</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_ptg,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($saldo,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($nilai_kas,0,",",".")."</td>
  </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
