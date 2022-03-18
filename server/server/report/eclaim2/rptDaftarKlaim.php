<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mysql");

class server_report_eclaim2_rptDaftarKlaim extends server_report_basic
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
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"serverApp.php"))."server/report/eclaim2/rptRwyKlaim.php";	
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
		$modul=$tmp[1];
		$no_bukti=$tmp[2];
		$tmp="";
		if ($modul=="1")
		{
			$tmp=" and a.progress='$no_bukti' ";
		}
		if ($modul=="2")
		{
			$tmp=" and a.kode_obyek='$no_bukti' ";
		}
		if ($modul=="3")
		{
			$tmp=" and a.kode_sebab='$no_bukti' ";
		}
		if ($modul=="4")
		{
			$tmp=" and a.periode='$no_bukti' ";
		}
		if ($modul=="5")
		{
			$tmp=" and e.kode_klplok='$no_bukti' ";
		}
		if ($modul=="6")
		{
			$tmp=" and a.kode_lok='$no_bukti' ";
		}
		$sql = "select a.no_polis,date_format(a.tanggal,'%d/%m/%Y') as tanggal,date_format(i.tanggal,'%d/%m/%Y') as tgl_ver 
,c.nama as nama_obyek,d.nama as nama_sebab,e.nama as nama_lok,a.alamat,a.no_klaim,a.nilai, 
ifnull(h.nilai,0) as nilai_adjust,ifnull(h.nilai_ddct,0) as nilai_ddct,ifnull(h.nilai,0)-ifnull(h.nilai_ddct,0) as nilai_settle
from tlk_klaim a 
inner join tlk_ttg b on a.kode_ttg=b.kode_ttg 
inner join tlk_obyek c on a.kode_obyek=c.kode_obyek and a.kode_ttg=c.kode_ttg 
inner join tlk_sebab d on a.kode_sebab=d.kode_sebab and a.kode_ttg=d.kode_ttg 
inner join tlk_lokasi e on a.kode_lok=e.kode_lok and a.kode_ttg=e.kode_ttg 
left join tlk_polis j on a.no_polis=j.no_polis  
left join tlk_survey g on a.no_klaim=g.no_klaim 
left join tlk_adjust h on a.no_klaim=h.no_klaim and h.status='1' 
left join tlk_ver i on a.no_klaim=i.no_klaim
where substring(a.periode,1,4)='$tahun' $tmp ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("REKAPITULASI KLAIM ASSET PT. TELEKOMUNIKASI INDONESIA, Tbk.",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan'>No</td>
    <td width='120' class='header_laporan'>No Klaim </td>
    <td width='150' class='header_laporan'>No Polis </td>
    <td width='60' class='header_laporan'>Tgl Kejadian </td>
    <td width='60' class='header_laporan'>Tgl Verifikasi </td>
    <td width='150' class='header_laporan'>Obyek Kerugian </td>
    <td width='150' class='header_laporan'>Penyebab Kejadian </td>
    <td width='150' class='header_laporan'>Lokasi</td>
    <td width='200' class='header_laporan'>Alamat</td>
    <td width='90' class='header_laporan'>Nilai Estimasi </td>
    <td width='90' class='header_laporan'>Nilai Adjustment </td>
    <td width='90' class='header_laporan'>Nilai Deductible</td>
    <td width='90' class='header_laporan'>Nilai Setlled</td>
  </tr>";
		$i=1;$jum=0; $nilai_est=0; $nilai_adjust=0; $nilai_ddct=0; $nilai_settle=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$jum=$jum+$row->jum;
			$nilai_est=$nilai_est+$row->nilai_est;
			$nilai_adjust=$nilai_adjust+$row->nilai_adjust;
			$nilai_ddct=$nilai_ddct+$row->nilai_ddct;
			$nilai_settle=$nilai_settle+$row->nilai_settle;
			$resource = $_GET["resource"];
			$fullId = $_GET["fullId"];
			echo "<tr>
    <td class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row->no_klaim</td>
	<td class='isi_laporan'>$row->no_polis</td>
	<td class='isi_laporan'>$row->tanggal</td>
	<td class='isi_laporan'>$row->tgl_ver</td>
	<td class='isi_laporan'>$row->nama_obyek</td>
	<td class='isi_laporan'>$row->nama_sebab</td>
	<td class='isi_laporan'>$row->nama_lok</td>
	<td class='isi_laporan'>$row->alamat</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai_settle,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='9' align='center'>Total</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_est,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_adjust,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_ddct,0,',','.')."</td>
    <td align='right' class='isi_laporan'>".number_format($nilai_settle,0,',','.')."</td>
  </tr>
</table><br>";
		echo "</div>";
			
		return "";
	}
	
}
?>
  
