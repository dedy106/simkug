<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim3_rptRekapKlaim2 extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
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
		$tahun=$tmp[0];
		$no_polis=$tmp[1];
		$jenis=$tmp[2];
		if ($jenis=="Polis")
		{
			$sql="select no_polis,date_format(periode_awal,'%d/%m/%Y') as periode_awal,date_format(periode_akhir,'%d/%m/%Y') as periode_akhir
			from tlk_polis where no_polis='$no_polis'";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			$judul="( $row->no_polis , $row->periode_awal - $row->periode_akhir )";
		}
		if ($jenis=="Gabung")
		{
			$sql="select no_polis,date_format(periode_awal,'%d/%m/%Y') as periode_awal,date_format(periode_akhir,'%d/%m/%Y') as periode_akhir
			from tlk_polis where no_polis='$no_polis'";
			$rs = $dbLib->execute($sql);
			$row = $rs->FetchNextObject($toupper=false);
			$judul="( $row->no_polis , $row->periode_awal - $row->periode_akhir ) <br> TAHUN $tahun";
		}
		if ($jenis=="Tahun")
		{
			$judul="TAHUN $tahun";
		}
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		//echo $AddOnLib->judul_laporan("REKAPITULASI KLAIM ASSET PT. TELEKOMUNIKASI INDONESIA, Tbk.","","TAHUN $tahun");
		echo "<table width='100%'  border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td class='isi_laporan'>eClaim - PT. SARANA JANESIA UTAMA</td>
  </tr>
  <tr>
    <td align='center' class='judul_form'>REKAPITULASI KLAIM ASSET PT. TELEKOMUNIKASI INDONESIA, TBK.</td>
  </tr>
  <tr>
    <td align='center' class='judul_form'>$judul</td>
  </tr>
  <tr>
    <td align='center' class='isi_laporan'> Dicetak ".gmdate("d-m-Y H:i:s", time()+60*60*7) ." </td>
  </tr>
  <tr>
    <td>&nbsp;</td>
  </tr>
  <tr>
    <td align='center'><table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td class='header_laporan'>A. SETTLED :</td>
  </tr>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
	 <td width='20' class='header_laporan'>NO</td>
    <td width='290' class='header_laporan'>URAIAN</td>
    <td width='50' class='header_laporan'>BERKAS</td>
    <td width='100' class='header_laporan'>NILAI KLAIM AWAL</td>
    <td width='100' class='header_laporan'>SETTLED</td>
    <td width='100' class='header_laporan'>DEDUCTIBLE</td>
    <td width='100' class='header_laporan'>NET CLAIM</td>
  </tr>";
		$jml=0; $nilai_est=0; $nilai_adjust=0; $nilai_ddct=0; $nilai_settle=0;
		$sql = "select  count(a.no_klaim) as jml,sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_nego,0)) as nilai_adjust, 
	     sum(ifnull(b.nilai_deduc,0)) as nilai_ddct,sum(ifnull(b.nilai_nego,0))-sum(ifnull(b.nilai_deduc,0)) as nilai_settle
from tlk_klaim a 
left join tlk_nego b on a.no_klaim=b.no_klaim $this->filter and a.progress in ('Z','C') and a.status='0' ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$jml=$jml+$row->jml;
		$nilai_est=$nilai_est+$row->nilai_est;
		$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
		$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
		$nilai_settle=$nilai_settle+$row->nilai_settle;
		echo "<tr>
		<td class='isi_laporan' align='center'>1</td>
   <td class='isi_laporan'>KLAIM SWAKELOLA</td>
    <td align='center' class='isi_laporan'>".number_format($row->jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
  </tr>";
		$sql = "select  count(a.no_klaim) as jml,sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_nego,0)) as nilai_adjust, 
	     sum(ifnull(b.nilai_deduc,0)) as nilai_ddct,sum(ifnull(b.nilai_nego,0))-sum(ifnull(b.nilai_deduc,0)) as nilai_settle
from tlk_klaim a 
left join tlk_nego b on a.no_klaim=b.no_klaim $this->filter and (a.progress in ('Z','C')) and a.status='1' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$jml=$jml+$row->jml;
		$nilai_est=$nilai_est+$row->nilai_est;
		$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
		$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
		$nilai_settle=$nilai_settle+$row->nilai_settle;
		echo "<tr>
		<td class='isi_laporan' align='center'>2</td>
   <td class='isi_laporan'>KLAIM NON SWAKELOLA</td>
    <td align='center' class='isi_laporan'>".number_format($row->jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
  </tr>";
		echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>TOTAL</td>
    <td align='center' class='isi_laporan'>".number_format($jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_settle,0,',','.')."</td>
  </tr></table>";
		echo "</td>
  </tr>
</table><br>";
		
		
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td class='header_laporan'>B. OUTSTANDING :</td>
  </tr>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
	 <td width='20' class='header_laporan'>NO</td>
    <td width='290' class='header_laporan'>URAIAN</td>
    <td width='50' class='header_laporan'>BERKAS</td>
    <td width='100' class='header_laporan'>NILAI KLAIM AWAL</td>
    <td width='100' class='header_laporan'>ESTIMASI ADJUSTMENT</td>
    <td width='100' class='header_laporan'>DEDUCTIBLE</td>
    <td width='100' class='header_laporan'>NET CLAIM</td>
  </tr>";
		$jml=0; $nilai_est=0; $nilai_adjust=0; $nilai_ddct=0; $nilai_settle=0; $i=1;
		$sql = "select a.kode_proses,a.nama,b.jml,b.nilai_adjust,b.nilai_ddct,b.nilai_est,b.nilai_settle 
from tlk_proses a
left join (select  a.progress,count(a.no_klaim) as jml,sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_nego,0)) as nilai_adjust, 
	     sum(ifnull(b.nilai_deduc,0)) as nilai_ddct,sum(ifnull(b.nilai_nego,0))-sum(ifnull(b.nilai_deduc,0)) as nilai_settle
from tlk_klaim a 
left join tlk_nego b on a.no_klaim=b.no_klaim $this->filter and a.progress not in ('X','Z','B','C','X')  
group by a.progress
					)b on a.kode_proses=b.progress
order by a.kode_proses	
 ";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jml=$jml+$row->jml;
			$nilai_est=$nilai_est+$row->nilai_est;
			$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
			$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
			$nilai_settle=$nilai_settle+$row->nilai_settle;
			echo "<tr>
			<td class='isi_laporan' align='center'>$i</td>
	   <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKlaim('$row->kode_proses','1');\">$row->nama</a>";
	echo "</td>
		<td align='center' class='isi_laporan'>".number_format($row->jml,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
		<td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
	  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='2' align='center'>TOTAL</td>
    <td align='center' class='isi_laporan'>".number_format($jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_settle,0,',','.')."</td>
  </tr></table>";
		echo "</td>
  </tr>
</table><br>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td class='header_laporan'>C. NO KLAIM :</td>
  </tr>
  <tr>
    <td>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
	 <td width='20' class='header_laporan'>NO</td>
    <td width='290' class='header_laporan'>URAIAN</td>
    <td width='50' class='header_laporan'>BERKAS</td>
    <td width='100' class='header_laporan'>NILAI KLAIM AWAL</td>
    <td width='100' class='header_laporan'>ESTIMASI ADJUSTMENT</td>
    <td width='100' class='header_laporan'>DEDUCTIBLE</td>
    <td width='100' class='header_laporan'>NET CLAIM</td>
  </tr>";
		$jml=0; $nilai_est=0; $nilai_adjust=0; $nilai_ddct=0; $nilai_settle=0;
		$sql = "select  count(a.no_klaim) as jml,sum(a.nilai) as nilai_est,sum(ifnull(b.nilai_nego,0)) as nilai_adjust, 
	     sum(ifnull(b.nilai_deduc,0)) as nilai_ddct,sum(ifnull(b.nilai_nego,0))-sum(ifnull(b.nilai_deduc,0)) as nilai_settle
from tlk_klaim a 
left join tlk_nego b on a.no_klaim=b.no_klaim $this->filter and a.progress='X'   ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$jml=$jml+$row->jml;
		$nilai_est=$nilai_est+$row->nilai_est;
		$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
		$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
		$nilai_settle=$nilai_settle+$row->nilai_settle;
		echo "<tr>
		<td class='isi_laporan' align='center'>1</td>
   <td class='isi_laporan'>KLAIM TIDAK TERCOVER POLIS</td>
    <td align='center' class='isi_laporan'>".number_format($row->jml,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
  </tr>
		</table>";
		echo "</td>
  </tr>
</table>";

		echo "</td>
  </tr>
  
</table></div>";
			
		return "";
	}
	
}
?>
  
