<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kb_rptTitipSaldoLama extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis=$tmp[2];
		$tmp="";
		if ($jenis=="Lunas")
		{
			$tmp=" and  a.nilai-isnull(f.nilai,0)=0 ";
		}
		if ($jenis=="Outstanding")
		{
			$tmp=" and  a.nilai-isnull(f.nilai,0)<>0 ";
		}
		$sql = "select a.no_kas,convert(varchar,c.tanggal,103) as tgl,a.keterangan,a.nilai,a.akun_titip,
		a.no_agenda as aju1,h.kode_pp as pp1,h.nama_pp as pp,
	  b.nama_rek,b.bank,b.no_rek,g.nama as nama_titip,
	  isnull(d.no_aju,'-') as no_aju ,isnull(e.no_kas,'-') as no_kasptg,
	  case when isnull(f.nilai,0)<>0 then a.nilai else 0 end as nilai_kas,
	  case when isnull(f.nilai,0)<>0 then 0 else a.nilai end as saldo
from kas_titip a 
inner join it_vendor b on a.kode_vendor=b.kode_vendor and  a.kode_lokasi=b.kode_lokasi
inner join kas_m c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
inner join masakun g on a.akun_titip=g.kode_akun and a.kode_lokasi=g.kode_lokasi
left join kas_titip_d d on a.no_kas=d.no_kas and a.kode_lokasi=d.kode_lokasi
left join it_aju_m e on d.no_aju=e.no_aju and d.kode_lokasi=e.kode_lokasi
left join (
			select aa.*,isnull(bb.nama,'-') as nama_pp from 
			it_aju_m aa left join pp bb on aa.kode_pp=bb.kode_pp and aa.kode_lokasi=bb.kode_lokasi
			
			) h on a.no_agenda=h.no_aju and h.kode_lokasi=a.kode_lokasi
left join kas_m f on e.no_kas=f.no_kas and e.kode_lokasi=f.kode_lokasi

$this->filter $tmp
order by a.no_kas ";
		
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("SALDO TITIPAN",$this->lokasi," SD PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='30'  class='header_laporan' align='center'>No</td>
    <td width='110' class='header_laporan' align='center'>No Bukti</td>
    <td width='60'  class='header_laporan' align='center'>No Agenda</td>
    <td width='40'  class='header_laporan' align='center'>Kode PP</td>
    <td width='150'  class='header_laporan' align='center'>Nama PP</td>
    <td width='60'  class='header_laporan' align='center'>Tanggal</td>
	<td width='60'  class='header_laporan' align='center'>Akun Titipan</td>
	<td width='100'  class='header_laporan' align='center'>Nama Akun</td>
	<td width='150' class='header_laporan' align='center'>Nama Rek</td>
	<td width='100' class='header_laporan' align='center'>Bank</td>
	<td width='100' class='header_laporan' align='center'>No Rekening</td>
    <td width='150'  class='header_laporan' align='center'>Keterangan</td>
	<td width='80' class='header_laporan' align='center'>No Agenda</td>
	<td width='110' class='header_laporan' align='center'>No KasBank</td>
    <td width='90' class='header_laporan' align='center'>Nilai Titipan</td>
	<td width='90' class='header_laporan' align='center'>Nilai Pertanggungan</td>
	<td width='90' class='header_laporan' align='center'>Saldo</td>
  </tr>
 ";
		$nilai=0;$nilai_kas=0;$saldo=0;$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai+=$row->nilai;
			$nilai_kas+=$row->nilai_kas;
			$saldo+=$row->saldo;
			echo "<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->aju1</td>
    <td class='isi_laporan'>$row->pp1</td>
    <td class='isi_laporan'>$row->pp</td>
    <td class='isi_laporan' align='center'>$row->tgl</td>
	<td class='isi_laporan'>$row->akun_titip</td>
	<td class='isi_laporan'>$row->nama_titip</td>
	<td class='isi_laporan'>$row->nama_rek</td>
	<td class='isi_laporan'>$row->bank</td>
	<td class='isi_laporan'>$row->no_rek</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan'>$row->no_aju</td>
	<td class='isi_laporan'>$row->no_kasptg</td>
<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_kas,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->saldo,0,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan' align='center' colspan='14'>Total</td>
<td class='header_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($nilai_kas,0,',','.')."</td>
    <td class='header_laporan' align='right'>".number_format($saldo,0,',','.')."</td>
  </tr>";
		echo "</table></div>";
		return "";
	}
	
}
?>
