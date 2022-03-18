<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_frigia_rptGajiBulan extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select a.nik,a.nama,a.sts_pajak,
	   isnull(b.n01,0) as n01,isnull(b.n02,0) as n02,isnull(b.n03,0) as n03,isnull(b.n04,0) as n04,isnull(b.n05,0) as n05,
	   isnull(b.n06,0) as n06,isnull(b.n07,0) as n07,isnull(b.n08,0) as n08,isnull(b.n09,0) as n09,isnull(b.n10,0) as n10,
	   isnull(b.n11,0) as n11,isnull(b.n12,0) as n12
from karyawan a
left join (select a.nik,
			   sum(case substring(a.periode,4,2) when '01' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n01,
			   sum(case substring(a.periode,4,2) when '02' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n02,
			   sum(case substring(a.periode,4,2) when '03' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n03,
			   sum(case substring(a.periode,4,2) when '04' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n04,
			   sum(case substring(a.periode,4,2) when '05' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n05,
			   sum(case substring(a.periode,4,2) when '06' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n06,
			   sum(case substring(a.periode,4,2) when '07' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n07,
			   sum(case substring(a.periode,4,2) when '08' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n08,
			   sum(case substring(a.periode,4,2) when '09' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n09,
			   sum(case substring(a.periode,4,2) when '10' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n10,
			   sum(case substring(a.periode,4,2) when '11' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n11,
			   sum(case substring(a.periode,4,2) when '12' then (case b.dc when 'D' then a.nilai else -a.nilai end) else 0 end) as n12
		from fri_gaji_d a
		inner join fri_gaji_param b on a.kode_param=b.kode_param
		where a.kode_lokasi='$kode_lokasi' and a.periode='$periode'
		group by a.nik,a.periode
		)b on a.nik=b.nik";
		
		$rs = $dbLib->execute($sql);		
		$AddOnLib=new server_util_AddOnLib();
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR PPH21 KOMISARIS, DIREKSI & KARYAWAN",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td  class='header_laporan' width='20'>NO</td>
    <td  class='header_laporan' width='60'>NIP</td>
    <td  class='header_laporan' width='200'>NAMA</td>
	 <td  class='header_laporan' width='80'>STATUS PAJAK</td>
    <td class='header_laporan' width='80'>JANUARI</td>
    <td class='header_laporan' width='80'>FEBRUARI</td>
    <td  class='header_laporan' width='80'>MARET</td>
    <td class='header_laporan' width='80'>APRIL</td>
    <td  class='header_laporan' width='80'>MEI</td>
	<td  class='header_laporan' width='80'>JUNI</td>
	<td  class='header_laporan' width='80'>JULI</td>
	<td  class='header_laporan' width='80'>AGUSTUS</td>
	<td  class='header_laporan' width='80'>SEPTEMBER</td>
	<td  class='header_laporan' width='80'>OKTOBER</td>
	<td  class='header_laporan' width='80'>NOVEMBER</td>
	<td  class='header_laporan' width='80'>DESEMBER</td>
  </tr>
";
		
		$n01=0;$n02=0;$n03=0;$n04=0;$n05=0;$n06=0;
		$n07=0;$n08=0;$n09=0;$n10=0;$n11=0;$n12=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n01=$n01+$row->n01;
			$n02=$n02+$row->n02;
			$n03=$n03+$row->n03;
			$n04=$n04+$row->n04;
			$n05=$n05+$row->n05;
			$n06=$n06+$row->n06;
			$n07=$n07+$row->n07;
			$n08=$n08+$row->n08;
			$n09=$n09+$row->n09;
			$n10=$n10+$row->n10;
			$n11=$n11+$row->n11;
			$n12=$n12+$row->n12;
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->nik</td>
    <td class='isi_laporan'>$row->nama</td>
	<td class='isi_laporan'>$row->sts_pajak</td>
	<td class='isi_laporan' align='right'>".number_format($row->n01,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n02,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n03,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->n04,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n05,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n06,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n07,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n08,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->n09,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
  </tr>";

			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='4' align='right'>Total</td>
  	<td class='isi_laporan' align='right'>".number_format($n01,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n02,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n03,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($n04,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n05,0,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($n06,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n07,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n08,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($n09,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n10,0,',','.')."</td>
     <td class='isi_laporan' align='right'>".number_format($n11,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($n12,0,',','.')."</td>
    
  </tr>";
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
