<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_kopeg_rptSimpSaldoAgg extends server_report_basic
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
	   ISNULL(c.nilai,0) as nilai_sp,ISNULL(d.nilai,0) as nilai_ss,ISNULL(e.nilai,0) as nilai_sw,ISNULL(f.nilai,0) as bunga,
	   ISNULL(c.nilai,0)+ISNULL(d.nilai,0)+ISNULL(e.nilai,0) as jumlah
from kop_agg a
inner join (select a.no_agg,a.kode_lokasi
			from kop_simp_m a
			group by a.no_agg,a.kode_lokasi
			)b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
		   from kop_simpangs_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
		   where b.jenis='SP' and a.periode<='$periode' and a.kode_lokasi='$kode_lokasi'
		   group by a.no_agg,a.kode_lokasi
		   )c on a.no_agg=c.no_agg and a.kode_lokasi=c.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
		   from kop_simpangs_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
		   where b.jenis='SS' and a.periode<='$periode' and a.jenis='SIMP' and a.kode_lokasi='$kode_lokasi'
		   group by a.no_agg,a.kode_lokasi
		   )d on a.no_agg=d.no_agg and a.kode_lokasi=d.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
		   from kop_simpangs_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
		   where b.jenis='SW' and a.periode<='$periode' and a.kode_lokasi='$kode_lokasi'
		   group by a.no_agg,a.kode_lokasi
		   )e on a.no_agg=e.no_agg and a.kode_lokasi=e.kode_lokasi
left join (select a.no_agg,a.kode_lokasi,
				  sum(case when a.dc='D' then a.nilai else -a.nilai end) as nilai
		   from kop_simpangs_d a
		   inner join kop_simp_m b on a.no_simp=b.no_simp and a.kode_lokasi=b.kode_lokasi
		   where b.jenis='SS' and a.periode<='$periode' and a.jenis='BSIMP' and a.kode_lokasi='$kode_lokasi'
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
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
    <td width='80' rowspan='2' align='center' class='header_laporan'>No Anggota</td>
    <td width='250' rowspan='2' align='center' class='header_laporan'>Nama</td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>S.Pokok</td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>S.Wajib</td>
	<td colspan='3' align='center' class='header_laporan'> Simpanan</td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>Total</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='90' align='center' class='header_laporan'>Pokok</td>
    <td width='90' align='center' class='header_laporan'>Bunga</td>
    <td width='90' align='center' class='header_laporan'>Jumlah</td>
  </tr>

    ";
		$jumlah=0; $nilai_sp=0; $nilai_ss=0; $nilai_sw=0; $bunga=0;
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jumlah+=$row->jumlah;
			$nilai_sp+=$row->nilai_sp;
			$nilai_ss+=$row->nilai_ss;
			$nilai_sw+=$row->nilai_sw;
			$bunga+=$row->bunga;
			echo "</td>
	 <td class='isi_laporan'align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_agg</td>
	 <td class='isi_laporan'>$row->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row->nilai_sp,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_sw,0,",",".")."</td>
     <td class='isi_laporan' align='right'>".number_format($row->nilai_ss,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bunga,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->bunga+$row->nilai_ss,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->jumlah,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan'  colspan='3' align='right'>Total</td>
    <td class='header_laporan' align='right'>".number_format($nilai_sp,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($nilai_sw,0,",",".")."</td>
     <td class='header_laporan' align='right'>".number_format($nilai_ss,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($bunga,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($bunga+$nilai_ss,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
