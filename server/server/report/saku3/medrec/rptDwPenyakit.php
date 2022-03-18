<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_medrec_rptDwPenyakit extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
		$tahun=$tmp[1];
		$bentuk=$tmp[2];
		$kode_lokasi2=$tmp[3];
		$lokasi="AREA [$kode_lokasi - $kode_lokasi2]";
		if ($kode_lokasi=="01") { $lokasi="AREA I";}
		if ($kode_lokasi=="02") { $lokasi="AREA II";}
		if ($kode_lokasi=="03") { $lokasi="AREA III";}
		if ($kode_lokasi=="04") { $lokasi="AREA IV";}
		if ($kode_lokasi=="05") { $lokasi="AREA V";}
		if ($kode_lokasi=="06") { $lokasi="AREA VI";}
		if ($kode_lokasi=="07") { $lokasi="AREA VII";}
		if ($kode_lokasi=="99") { $lokasi="PUSAT";}
		if ($kode_lokasi=="01" and $kode_lokasi2=="07") { $lokasi="SELURUH AREA [I - VII]";}
		if ($kode_lokasi=="01" and $kode_lokasi2=="99") { $lokasi="KONSOLIDASI NASIONAL";}
		$sql="select sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
	   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
	   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4
from exs_yk_icdx a
$this->filter ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
left join (select b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4
			  
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		$this->filter
		group by b.kode_klp
			)b on a.kode_klp=b.kode_klp
order by a.nu";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pola penyakit",$lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			echo "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	echo "<tr>
    <td colspan='3' align='center'>TOTAL</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		echo "</table><br>";
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select   b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		inner join exs_yk_icdx5 d on c.kode_klp=d.kode_klp
		$this->filter 
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
left join (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join exs_yk_icdx5 c on b.kode_klp=c.kode_klp
		$this->filter
		group by b.kode_klp
		
			)b on a.kode_klp=b.kode_klp
inner join exs_yk_icdx5 c on a.kode_klp=c.kode_klp
order by c.nu";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		$top5="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$top5.="'".$row->kode_klp."',";	
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			echo "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	echo "<tr>
    <td colspan='3' align='center'>TOTAL PENYAKIT TOP 5</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		echo "</table><br>";
		
		
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select   b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		$this->filter and b.kode_klp in ('37','38')
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
left join (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		$this->filter
		group by b.kode_klp
		
			)b on a.kode_klp=b.kode_klp
where a.kode_klp in ('37','38')
order by a.kode_klp";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			echo "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	echo "<tr>
    <td colspan='3' align='center'>TOTAL KONSULTASI DAN MONITORING PARADIGMA SEHAT</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		echo "</table><br>";
		$top5=substr($top5,0,strlen($top5)-1);
		$sql_top5=" and b.kode_klp not in ('37','38') and b.kode_klp not in (select kode_klp from exs_yk_icdx5) ";
		
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		$this->filter $sql_top5 
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select 'PENYAKIT  LAINNYA' as nama,sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,
		sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
from (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		$this->filter $sql_top5
		group by b.kode_klp
		
			)a
";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			echo "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	echo "<tr>
    <td colspan='3' align='center'>TOTAL PENYAKIT LAIN (43 KELOMPOK)</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		echo "</table><br>";
		$sql_top5=" and b.kode_klp not in ($top5".",'37','38')";
		
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select   b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		$this->filter $sql_top5
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
inner join (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		$this->filter $sql_top5
		group by b.kode_klp
		
			)b on a.kode_klp=b.kode_klp
order by a.nu";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			echo "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	echo "<tr>
    <td colspan='3' align='center'>TOTAL RINCIAN PENYAKIT LAINNYA</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
	}
	
	function getHtml2()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$tahun=$tmp[1];
		$bentuk=$tmp[2];
		$sql="select sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
	   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
	   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
	   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
	   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4
from exs_yk_icdx a
where a.kode_lokasi='02' and substring(a.periode,1,4)='2015' and a.jenis='PEGAWAI' ";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
left join (select b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4
			  
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		where a.kode_lokasi='02' and substring(a.periode,1,4)='2015' and a.jenis='PEGAWAI'
		group by b.kode_klp
			)b on a.kode_klp=b.kode_klp
order by a.kode_klp";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$content = "<div align='center' style='width:100%;overflow:auto'> "; 
		$content .= $AddOnLib->judul_laporan("laporan pola penyakit",$this->lokasi,"Tahun $tahun");
		$content .= "<table border='1' cellspacing='0' cellpadding='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
  <tr class='info'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr class='info'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			$content .= "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	$content .= "<tr>
    <td colspan='3' align='center'>TOTAL</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		$content .= "</table><br>";
		$sql2=" and b.kode_klp in ('37','38')";
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select   b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		$ $sql2
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
left join (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		where a.kode_lokasi='02' and substring(a.periode,1,4)='2015' and a.jenis='PEGAWAI'
		group by b.kode_klp
		
			)b on a.kode_klp=b.kode_klp
where a.kode_klp in ('37','38')
order by a.kode_klp";
		
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		$content .= "<table border='1' cellspacing='0' cellpadding='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
  <tr class='info'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr class='info'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		$top5="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$top5.="'".$row->kode_klp."',";	
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			$content .= "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	$content .= "<tr>
    <td colspan='3' align='center'>TOTAL PENYAKIT TOP 5</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		$content .= "</table><br>";
		
		
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select   b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		where a.kode_lokasi='02' and substring(a.periode,1,4)='2015' and a.jenis='PEGAWAI' and b.kode_klp in ('37','38')
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
left join (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		where a.kode_lokasi='02' and substring(a.periode,1,4)='2015' and a.jenis='PEGAWAI'
		group by b.kode_klp
		
			)b on a.kode_klp=b.kode_klp
where a.kode_klp in ('37','38')
order by a.kode_klp";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		$content .= "<table border='1' cellspacing='0' cellpadding='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
  <tr class='info'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr class='info'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			$content .= "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	$content .= "<tr>
    <td colspan='3' align='center'>TOTAL KONSULTASI DAN MONITORING PARADIGMA SEHAT</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		$content .= "</table><br>";
		$top5=substr($top5,0,strlen($top5)-1);
		$sql_top5=" and b.kode_klp not in ($top5".",'37','38')";
		
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		where a.kode_lokasi='02' and substring(a.periode,1,4)='2015' and a.jenis='PEGAWAI' $sql_top5
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select 'PENYAKIT  LAINNYA' as nama,sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,
		sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
from (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		where a.kode_lokasi='02' and substring(a.periode,1,4)='2015' and a.jenis='PEGAWAI' $sql_top5
		group by b.kode_klp
		
			)a
";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		$content .= "<table border='1' cellspacing='0' cellpadding='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
  <tr class='info'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr class='info'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			$content .= "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	$content .= "<tr>
    <td colspan='3' align='center'>TOTAL PENYAKIT LAIN (43 KELOMPOK)</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		$content .= "</table><br>";
		$sql_top5=" and b.kode_klp not in ($top5".",'37','38')";
		
		$sql="select sum(a.j1) as j1,sum(a.n1) as n1,sum(a.j2) as j2,sum(a.n2) as n2,sum(a.j3) as j3,sum(a.n3) as n3,sum(a.j4) as j4,sum(a.n4) as n4
		from (select   b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		inner join yk_icdx_klp c on b.kode_klp=c.kode_klp
		$this->filter $sql_top5
		group by b.kode_klp
		
		) a
 ";
		
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$tw_j1=$row->j1;
		$tw_n1=$row->n1;
		$tw_j2=$row->j2;
		$tw_n2=$row->n2;
		$tw_j3=$row->j3;
		$tw_n3=$row->n3;
		$tw_j4=$row->j4;
		$tw_n4=$row->n4;
		$sql = "select a.kode_klp,nama,
	   ISNULL(b.j1,0) as j1,ISNULL(b.j2,0) as j2,ISNULL(b.j3,0) as j3,ISNULL(b.j4,0) as j4,
	   ISNULL(b.n1,0) as n1,ISNULL(b.n2,0) as n2,ISNULL(b.n3,0) as n3,ISNULL(b.n4,0) as n4
from yk_icdx_klp a
inner join (select  b.kode_klp,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as j1,
			   sum(case when substring(a.periode,5,2) between '01' and '03' then a.nilai else 0 end) as n1,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.jumlah else 0 end) as j2,
			   sum(case when substring(a.periode,5,2) between '04' and '06' then a.nilai else 0 end) as n2,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.jumlah else 0 end) as j3,
			   sum(case when substring(a.periode,5,2) between '07' and '09' then a.nilai else 0 end) as n3,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.jumlah else 0 end) as j4,
			   sum(case when substring(a.periode,5,2) between '10' and '13' then a.nilai else 0 end) as n4,
			   sum(case when substring(a.periode,5,2) between '01' and '13' then a.nilai else 0 end) as n5
		from exs_yk_icdx a
		inner join yk_icdx_relasi b on a.icdx=b.kode_icdx
		$this->filter $sql_top5
		group by b.kode_klp
		
			)b on a.kode_klp=b.kode_klp
order by a.kode_klp";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		
	
		$content .= "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='30' rowspan='2' align='center' class='header_laporan'>N0</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>URAIAN</td>
    <td width='60' rowspan='2' align='center' class='header_laporan'>KODE ICD-X</td>
    <td colspan='5' align='center' class='header_laporan'>TW-I/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-II/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-III/$tahun</td>
    <td colspan='5' align='center' class='header_laporan'>TW-IV/$tahun</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='50' align='center' class='header_laporan'>KASUS</td>
    <td width='90' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='90' align='center' class='header_laporan'>RATA - RATA</td>
    <td width='40' align='center' class='header_laporan'>%</td>
    <td width='40' align='center' class='header_laporan'>%</td>
  </tr>
  
  
  ";
		$deviasi=0; $n2=0; $n4=0;
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n2+=$row->n2;
			$n4+=$row->n4;
			$deviasi+=$row->deviasi;
			$persen=0;
			$r1=0;$r2=0;$r3=0;$r4=0;
			if ($row->j1!=0) {$r1=$row->n1/$row->j1;}
			if ($row->j2!=0) {$r2=$row->n2/$row->j2;}
			if ($row->j3!=0) {$r3=$row->n3/$row->j3;}
			if ($row->j4!=0) {$r4=$row->n4/$row->j4;}
			
			$pj1=0;$pj2=0;$pj3=0;$pj4=0;
			if ($tw_j1!=0) {$pj1=($row->j1/$tw_j1)*100;}
			if ($tw_j2!=0) {$pj2=($row->j2/$tw_j2)*100;}
			if ($tw_j3!=0) {$pj3=($row->j3/$tw_j3)*100;}
			if ($tw_j4!=0) {$pj4=($row->j4/$tw_j4)*100;}
		
			$pn1=0;$pn2=0;$pn3=0;$pn4=0;
			if ($tw_n1!=0) {$pn1=($row->n1/$tw_n1)*100;}
			if ($tw_n2!=0) {$pn2=($row->n2/$tw_n2)*100;}
			if ($tw_n3!=0) {$pn3=($row->n3/$tw_n3)*100;}
			if ($tw_n4!=0) {$pn4=($row->n4/$tw_n4)*100;}
			
			$content .= "<tr>
    <td class='isi_laporan'>$i</td>
	<td class='isi_laporan'>$row->nama</td>
    <td class='isi_laporan'>$row->kode_klp</td>
    
    <td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj1,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn1,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj3,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn3,2,',','.')."</td>
	
    <td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pj4,2,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($pn4,2,',','.')."</td>
  </tr>";
			
			$i=$i+1;
		}
	$r1=0;$r2=0;$r3=0;$r4=0;
	if ($tw_j1!=0) {$r1=$tw_n1/$tw_j1;}
	if ($tw_j2!=0) {$r1=$tw_n2/$tw_j2;}
	if ($tw_j3!=0) {$r1=$tw_n3/$tw_j3;}
	if ($tw_j4!=0) {$r1=$tw_n4/$tw_j4;}
	$content .= "<tr>
    <td colspan='3' align='center'>TOTAL RINCIAN PENYAKIT LAINNYA</td>
   <td class='isi_laporan' align='right'>".number_format($tw_j1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r1,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r3,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
	
    <td class='isi_laporan' align='right'>".number_format($tw_j4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($tw_n4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($r4,0,',','.')."</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
    <td class='isi_laporan' align='right'>&nbsp;</td>
  </tr>
";
		$content .= "</table><br>";
		$content .= "</div>";
		return $content;
	}
}
?>
