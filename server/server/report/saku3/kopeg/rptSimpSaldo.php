<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kopeg_rptSimpSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
		$sql="select 1";
		
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
		$sql="select a.no_agg,a.nama,a.kode_lokasi,
	   ISNULL(c.nilai_sp,0)-ISNULL(d.nilai_sp,0) as tgk_sp,
	   ISNULL(c.nilai_sw,0)-ISNULL(d.nilai_sw,0) as tgk_sw,
	   ISNULL(c.nilai_ss,0)-ISNULL(d.nilai_ss,0) as tgk_ss,
	   ISNULL(e.nilai_sp,0) as byr_sp,
	   ISNULL(e.nilai_sw,0) as byr_sw,
	   ISNULL(e.nilai_ss,0) as byr_ss,
	   ISNULL(f.nilai_bunga,0) as nilai_bunga,
	   ISNULL(c.nilai_sp,0)+ISNULL(c.nilai_sw,0)+ISNULL(c.nilai_ss,0) - (ISNULL(d.nilai_sp,0)+ISNULL(d.nilai_sw,0)+ISNULL(d.nilai_ss,0)) as tgk_total,
	   ISNULL(e.nilai_sp,0)+ISNULL(e.nilai_sw,0)+ISNULL(e.nilai_ss,0)+ISNULL(f.nilai_bunga,0) as byr_total
from kop_agg a
inner join (select a.no_agg,a.kode_lokasi
			from kop_simp_m a
			where kode_lokasi='$kode_lokasi'
			group by a.no_agg,a.kode_lokasi
			)b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when b.jenis='SP' then a.nilai else 0 end) as nilai_sp,
				  sum(case when b.jenis='SW' then a.nilai else 0 end) as nilai_sw,
				  sum(case when b.jenis='SS' then a.nilai else 0 end) as nilai_ss
		   from kop_simp_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
		   where  a.periode<'$periode' and a.kode_lokasi='$kode_lokasi'
		   group by a.no_agg,a.kode_lokasi
		   )c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when b.jenis='SP' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as nilai_sp,
				  sum(case when b.jenis='SW' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as nilai_sw,
				  sum(case when b.jenis='SS' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as nilai_ss
		   from kop_simpangs_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi and a.jenis<>'BSIMP'
		   where a.periode<'$periode' and a.kode_lokasi='$kode_lokasi'
		   group by a.no_agg,a.kode_lokasi
		   )d on a.no_agg=d.no_agg and a.kode_lokasi=d.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when b.jenis='SP' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as nilai_sp,
				  sum(case when b.jenis='SW' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as nilai_sw,
				  sum(case when b.jenis='SS' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as nilai_ss
		   from kop_simpangs_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
		   where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.jenis<>'BSIMP'
		   group by a.no_agg,a.kode_lokasi
		   )e on a.no_agg=e.no_agg and a.kode_lokasi=e.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when b.jenis='SS' then (case when a.dc='D' then a.nilai else -a.nilai end) else 0 end) as nilai_bunga
		   from kop_simpangs_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
		   where a.periode<='$periode' and a.kode_lokasi='$kode_lokasi' and a.jenis='BSIMP'
		   group by a.no_agg,a.kode_lokasi
		   )f on a.no_agg=f.no_agg and a.kode_lokasi=f.kode_lokasi
$this->filter 
order by a.no_agg ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo simpanan",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table width='1200' border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>No Anggota</td>
    <td width='150' rowspan='2' align='center'class='header_laporan'>Nama Anggota </td>
    <td colspan='2' align='center' class='header_laporan'>Simpanan Pokok </td>
    <td colspan='2' align='center' class='header_laporan'>Simpanan Wajib </td>
    <td colspan='2' align='center' class='header_laporan'>Simpanan Sukarela </td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>Bunga</td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>Total Tunggakan </td>
    <td rowspan='2' align='center' class='header_laporan' width='80'>Total Setoran </td>
  </tr>
  <tr>
    <td align='center' class='header_laporan' width='80'>Tunggakan</td>
    <td align='center' class='header_laporan' width='80'>Setoran</td>
    <td align='center' class='header_laporan' width='80'>Tunggakan</td>
    <td align='center' class='header_laporan' width='80'>Setoran</td>
    <td align='center' class='header_laporan' width='80'>Tunggakan</td>
    <td align='center' class='header_laporan' width='80'>Setoran</td>
  </tr>
    ";
		$tgk_sp=0; $byr_sp=0; $tgk_sw=0; $byr_sw=0; $tgk_ss=0;  $byr_ss=0; $nilai_bunga=0; $tgk_total=0; $byr_total=0; 
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tgk_sp+=$row->tgk_sp;
			$byr_sp+=$row->byr_sp;
			$tgk_sw+=$row->tgk_sw;
			$byr_sw+=$row->byr_sw;
			$tgk_ss+=$row->tgk_ss;
			$byr_ss+=$row->byr_ss;
			$nilai_bunga+=$row->nilai_bunga;
			$tgk_total+=$row->tgk_total;
			$byr_total+=$row->byr_total;
			echo "</td>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_agg</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tgk_sp,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->byr_sp,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->tgk_sw,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->byr_sw,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tgk_ss,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->byr_ss,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_bunga,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->tgk_total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->byr_total,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan'  colspan='3' align='right'>Total</td>
    <td class='header_laporan' align='right'>".number_format($tgk_sp,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($byr_sp,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($tgk_sw,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($byr_sw,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($tgk_ss,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($byr_ss,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($nilai_bunga,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($tgk_total,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($byr_total,0,",",".")."</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
