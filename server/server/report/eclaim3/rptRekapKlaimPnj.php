<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim3_rptRekapKlaimPnj extends server_report_basic
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
		//echo $AddOnLib->judul_laporan("REKAPITULASI PENANGGUNG JAWAB KLAIM ASSET PT. TELEKOMUNIKASI INDONESIA, Tbk.","","TAHUN $tahun");
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
    <td align='center'><table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
      <tr>
        <td width='20' rowspan='2' align='center' class='header_laporan'>No</td>
        <td width='200' rowspan='2' align='center' class='header_laporan'>Proses</td>
        <td colspan='2' align='center' class='header_laporan'>Telkom</td>
        <td colspan='2' align='center' class='header_laporan'>SJU</td>
        <td colspan='2' align='center' class='header_laporan'>Jasindo</td>
        <td colspan='2' align='center' class='header_laporan'>Adjuster</td>
        <td colspan='2' align='center' class='header_laporan'>Vendor</td>
        <td colspan='2' align='center' class='header_laporan'>Total</td>
      </tr>
      <tr>
        <td width='50' align='center' class='header_laporan'>Jumlah</td>
        <td width='100' align='center' class='header_laporan'>Nilai</td>
        <td width='50' align='center' class='header_laporan'>Jumlah</td>
        <td width='100' align='center' class='header_laporan'>Nilai</td>
        <td width='50' align='center' class='header_laporan'>Jumlah</td>
        <td width='100' align='center' class='header_laporan'>Nilai</td>
        <td width='50' align='center' class='header_laporan'>Jumlah</td>
        <td width='100' align='center' class='header_laporan'>Nilai</td>
        <td width='50' align='center' class='header_laporan'>Jumlah</td>
        <td width='100' align='center' class='header_laporan'>Nilai</td>
        <td width='50' align='center' class='header_laporan'>Jumlah</td>
        <td width='100' align='center' class='header_laporan'>Nilai</td>
      </tr>
    ";
		$sql="select a.kode_proses,a.nama,ifnull(b.jum,0) as jum,ifnull(b.nilai,0) as nilai,
	   case when a.pnj='TELKOM' then ifnull(b.jum,0) else 0 end as jum_telkom,
	   case when a.pnj='TELKOM' then ifnull(b.nilai,0) else 0 end as nilai_telkom,
	   case when a.pnj='SJU' then ifnull(b.jum,0) else 0 end as jum_sju,
	   case when a.pnj='SJU' then ifnull(b.nilai,0) else 0 end as nilai_sju,
	   case when a.pnj='JASINDO' then ifnull(b.jum,0) else 0 end as jum_jasindo,
	   case when a.pnj='JASINDO' then ifnull(b.nilai,0) else 0 end as nilai_jasindo,
	   case when a.pnj='VENDOR' then ifnull(b.jum,0) else 0 end as jum_vendor,
	   case when a.pnj='VENDOR' then ifnull(b.nilai,0) else 0 end as nilai_vendor,
	   case when a.pnj='ADJUSTER' then ifnull(b.jum,0) else 0 end as jum_adjuster,
	   case when a.pnj='ADJUSTER' then ifnull(b.nilai,0) else 0 end as nilai_adjuster
from tlk_proses a
left join (select a.progress as kode_proses,count(a.no_klaim) as jum,sum(a.nilai) as nilai
			from tlk_klaim a
			$this->filter and a.status='1'
			group by a.progress
		   )b on a.kode_proses=b.kode_proses
where a.flag_aktif='1'
order by no_urut";
	
		$rs = $dbLib->execute($sql);
		$i=1;
		$jum_telkom=0; $nilai_telkom=0; $jum_sju=0 ; $nilai_sju=0 ;
		$jum_jasindo=0; $nilai_jasindo=0; $jum_vendor=0 ; $nilai_vendor=0 ;
		$jum_adjuster=0; $nilai_adjuster=0; $jum_total=0; $nilai_total=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jum_total=$jum_total+$row->jum;
			$nilai_total=$nilai_total+$row->nilai;
			$jum_telkom=$jum_telkom+$row->jum_telkom;
			$nilai_telkom=$nilai_telkom+$row->nilai_telkom;
			$jum_sju=$jum_sju+$row->jum_sju;
			$nilai_sju=$nilai_sju+$row->nilai_sju;
			$jum_jasindo=$jum_jasindo+$row->jum_jasindo;
			$nilai_jasindo=$nilai_jasindo+$row->nilai_jasindo;
			$jum_vendor=$jum_vendor+$row->jum_vendor;
			$nilai_vendor=$nilai_vendor+$row->nilai_vendor;
			$jum_adjuster=$jum_adjuster+$row->jum_adjuster;
			$nilai_adjuster=$nilai_adjuster+$row->nilai_adjuster;
  echo "<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKlaim('$row->kode_proses','1');\">$row->nama</a>";
	echo "</td>
    <td align='center' class='isi_laporan'>".number_format($row->jum_telkom,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_telkom,0,',','.')."</td>
     <td align='center' class='isi_laporan'>".number_format($row->jum_sju,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_sju,0,',','.')."</td>
    <td align='center' class='isi_laporan'>".number_format($row->jum_jasindo,0,',','.')."</td>
   <td align='right' class='isi_laporan'>".number_format($row->nilai_jasindo,0,',','.')."</td>
     <td align='center' class='isi_laporan'>".number_format($row->jum_adjuster,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjuster,0,',','.')."</td>
    <td align='center' class='isi_laporan'>".number_format($row->jum_vendor,0,',','.')."</td>
     <td align='right' class='isi_laporan'>".number_format($row->nilai_vendor,0,',','.')."</td>
  
	 <td align='center' class='isi_laporan'>".number_format($row->jum,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		 echo "<tr>
    <td align='center' class='header_laporan' colspan='2'>TOTAL</td>
    <td align='center' class='header_laporan'>".number_format($jum_telkom,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($nilai_telkom,0,',','.')."</td>
     <td align='center' class='header_laporan'>".number_format($jum_sju,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($nilai_sju,0,',','.')."</td>
    <td align='center' class='header_laporan'>".number_format($jum_jasindo,0,',','.')."</td>
   <td align='right' class='header_laporan'>".number_format($nilai_jasindo,0,',','.')."</td>
    <td align='center' class='header_laporan'>".number_format($jum_vendor,0,',','.')."</td>
     <td align='right' class='header_laporan'>".number_format($nilai_vendor,0,',','.')."</td>
    <td align='center' class='header_laporan'>".number_format($jum_adjuster,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($nilai_adjuster,0,',','.')."</td>
	<td align='center' class='header_laporan'>".number_format($jum_total,0,',','.')."</td>
    <td align='right' class='header_laporan'>".number_format($nilai_total,0,',','.')."</td>
  </tr>";
echo "</table>";

		echo "</td>
  </tr>
  
</table></div>";
			
		return "";
	}
	
}
?>
  
