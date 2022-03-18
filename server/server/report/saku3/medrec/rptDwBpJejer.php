<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_medrec_rptDwBpJejer extends server_report_basic
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
		$jenis=$tmp[2];
		$tahun1=$tahun-1;
		$tahun2=$tahun-2;
		
		$AddOnLib=new server_util_AddOnLib();
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$bulan = array("JANUARI SD DESEMBER","JANUARI", "FEBRUARI", "MARET","APRIL","MEI","JUNI","JULI","AGUSTUS","SEPTEMBER","OKTOBER","NOVEMBER","DESEMBER","S/D JANUARI", "S/D FEBRUARI", "S/D MARET","S/D APRIL","S/D MEI","S/D JUNI","S/D JULI","S/D AGUSTUS","S/D SEPTEMBER","S/D OKTOBER","S/D NOVEMBER","S/D DESEMBER");
		$sql="select MAX(periode) as periode from exs_yk_bp where SUBSTRING(periode,1,4)='$tahun'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$bul=substr($row->periode,4,2);
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan biaya pengobatan",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0'  width='400' class='kotak'>";
		echo "<tr bgcolor='#CCCCCC'>";
		echo "<td colspan='6' align='center' class='header_laporan'>".$bulan[0]." $tahun</td>";
		for ($k =1 ; $k <= 24; $k++) 
		{
			echo "<td colspan='4' align='center' class='header_laporan'>".$bulan[$k]." $tahun</td>";
		}
		echo "</tr>";
		echo "<tr bgcolor='#CCCCCC'>";
		echo "<td width='40' align='center' class='header_laporan'>TAHUN</td>
    <td width='60' align='center' class='header_laporan'>KODE</td>";
		$jum=0;
		for ($k =0 ; $k <= 24; $k++) 
		{
			echo "<td width='80' align='center' class='header_laporan'>JUMLAH TRANSAKSI</td>
    <td width='100' align='center' class='header_laporan'>BESAR UANG</td>
    <td width='60' align='center' class='header_laporan'>% JUMLAH</td>
    <td width='60' align='center' class='header_laporan'>% BESAR UANG</td>";
		}
		echo "</tr>";
		
			
		$sql="select a.kode_lokasi,SUBSTRING(a.periode,1,4) as tahun,
	   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
	   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
	   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
	   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
	   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
	   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
	   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
	   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4,
	   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
	   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
	   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
	   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
	   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
	   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
	   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
	   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
	   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
	   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
	   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
	   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
	   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
	   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
	   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
	   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
	   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
	   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
	   sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) as jd2,
	   sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) as nd2,
	   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as jd3,
	   sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) as nd3,
	   sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end)  as jd4,
	   sum(case when substring(a.periode,5,2) between '01' and '04' then a.nilai else 0 end) as nd4,
	   sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) as jd5,
	   sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) as nd5,
	   sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) as jd6,
	   sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) as nd6,
	   sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) as jd7,
	   sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) as nd7,
	   sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) as jd8,
	   sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) as nd8,
	   sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) as jd9,
	   sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) as nd9,
	   sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) as jd10,
	   sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) as nd10,
	   sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) as jd11,
	   sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) as nd11,
	   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) as jd12,
	   sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) as nd12
from exs_yk_bp a
$this->filter and substring(a.periode,1,4)='$tahun'
group by a.kode_lokasi,SUBSTRING(a.periode,1,4)";
		
		$rs2 = $dbLib->execute($sql);
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
		
			$sql="select a.kode_lokasi,a.periode_obat,SUBSTRING(a.periode,1,4) as tahun,
		   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
		   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
		   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
		   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
		   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
		   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
		   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4,
		   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
		   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
		   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
		   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
		   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
		   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
		   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
		   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
		   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
		   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
		   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
		   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
		   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
		   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
		   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
		   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
		   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) else 0 end  as jd2,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) else 0 end  as nd2,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) else 0 end  as jd3,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) else 0 end  as nd3,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end) else 0 end as jd4,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04'then a.nilai else 0 end) else 0 end as nd4,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) else 0 end as jd5,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) else 0 end as nd5,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) else 0 end as jd6,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) else 0 end as nd6,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) else 0 end as jd7,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) else 0 end as nd7,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) else 0 end  as jd8,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) else 0 end  as nd8,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) else 0 end  as jd9,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) else 0 end  as nd9,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) else 0 end  as jd10,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd10,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) else 0 end  as jd11,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd11,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) else 0 end  as jd12,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) else 0 end  as nd12
	from exs_yk_bp a
	$this->filter and substring(a.periode,1,4)='$tahun' and a.jenis<>'AKRU'
	group by a.kode_lokasi,a.periode_obat,SUBSTRING(a.periode,1,4)
	order by a.periode_obat";
			$rs = $dbLib->execute($sql);
			while ($row = $rs->FetchNextObject($toupper=false))
			{
				
				if ($row2->j1!=0) {$a1=($row->j1/$row2->j1)*100;}
				if ($row2->n1!=0) {$b1=($row->n1/$row2->n1)*100;}
				if ($row2->j2!=0) {$a2=($row->j2/$row2->j2)*100;}
				if ($row2->n2!=0) {$b2=($row->n2/$row2->n2)*100;}
				if ($row2->j3!=0) {$a3=($row->j3/$row2->j3)*100;}
				if ($row2->n3!=0) {$b3=($row->n3/$row2->n3)*100;}
				if ($row2->j4!=0) {$a4=($row->j4/$row2->j4)*100;}
				if ($row2->n4!=0) {$b4=($row->n4/$row2->n4)*100;}
				if ($row2->j5!=0) {$a5=($row->j5/$row2->j5)*100;}
				if ($row2->n5!=0) {$b5=($row->n5/$row2->n5)*100;}
				if ($row2->j6!=0) {$a6=($row->j6/$row2->j6)*100;}
				if ($row2->n6!=0) {$b6=($row->n6/$row2->n6)*100;}
				if ($row2->j7!=0) {$a7=($row->j7/$row2->j7)*100;}
				if ($row2->n7!=0) {$b7=($row->n7/$row2->n7)*100;}
				if ($row2->j8!=0) {$a8=($row->j8/$row2->j8)*100;}
				if ($row2->n8!=0) {$b8=($row->n8/$row2->n8)*100;}
				if ($row2->j9!=0) {$a9=($row->j9/$row2->j9)*100;}
				if ($row2->n9!=0) {$b9=($row->n9/$row2->n9)*100;}
				if ($row2->j10!=0) {$a10=($row->j10/$row2->j10)*100;}
				if ($row2->n10!=0) {$b10=($row->n10/$row2->n10)*100;}
				if ($row2->j11!=0) {$a11=($row->j11/$row2->j11)*100;}
				if ($row2->n11!=0) {$b11=($row->n11/$row2->n11)*100;}
				if ($row2->j12!=0) {$a12=($row->j12/$row2->j12)*100;}
				if ($row2->n12!=0) {$b12=($row->n12/$row2->n12)*100;}
				
				if ($row2->jd1!=0) {$a13=($row->jd1/$row2->jd1)*100;}
				if ($row2->nd1!=0) {$b13=($row->nd1/$row2->nd1)*100;}
				if ($row2->jd2!=0) {$a14=($row->jd2/$row2->jd2)*100;}
				if ($row2->nd2!=0) {$b14=($row->nd2/$row2->nd2)*100;}
				if ($row2->jd3!=0) {$a15=($row->jd3/$row2->jd3)*100;}
				if ($row2->nd3!=0) {$b15=($row->nd3/$row2->nd3)*100;}
				if ($row2->jd4!=0) {$a16=($row->jd4/$row2->jd4)*100;}
				if ($row2->nd4!=0) {$b16=($row->nd4/$row2->nd4)*100;}
				if ($row2->jd5!=0) {$a17=($row->jd5/$row2->jd5)*100;}
				if ($row2->nd5!=0) {$b17=($row->nd5/$row2->nd5)*100;}
				if ($row2->jd6!=0) {$a18=($row->jd6/$row2->jd6)*100;}
				if ($row2->nd6!=0) {$b18=($row->nd6/$row2->nd6)*100;}
				if ($row2->jd7!=0) {$a19=($row->jd7/$row2->jd7)*100;}
				if ($row2->nd7!=0) {$b19=($row->nd7/$row2->nd7)*100;}
				if ($row2->jd8!=0) {$a20=($row->jd8/$row2->jd8)*100;}
				if ($row2->nd8!=0) {$b20=($row->nd8/$row2->nd8)*100;}
				if ($row2->jd9!=0) {$a21=($row->jd9/$row2->jd9)*100;}
				if ($row2->nd9!=0) {$b21=($row->nd9/$row2->nd9)*100;}
				if ($row2->jd10!=0) {$a22=($row->jd10/$row2->jd10)*100;}
				if ($row2->nd10!=0) {$b22=($row->nd10/$row2->nd10)*100;}
				if ($row2->jd11!=0) {$a23=($row->jd11/$row2->jd11)*100;}
				if ($row2->nd11!=0) {$b23=($row->nd11/$row2->nd11)*100;}
				if ($row2->jd12!=0) {$a24=($row->jd12/$row2->jd12)*100;}
				if ($row2->nd12!=0) {$b24=($row->nd12/$row2->nd12)*100;}
				
				
				
				echo " <tr>
				<td class='isi_laporan'>$row->tahun</td>
				<td class='isi_laporan'>$row->periode_obat</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				</tr>
				";
			}
			$sql="select a.kode_lokasi,SUBSTRING(a.periode,1,4) as tahun,
		   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
		   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
		   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
		   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
		   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
		   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
		   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
		   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
		   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
		   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
		   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
		   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
		   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
		   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
		   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
		   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
		   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
		   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
		   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
		   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
		   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
		   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
		   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) else 0 end as jd2,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) else 0 end  as nd2,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) else 0 end  as jd3,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) else 0 end  as nd3,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end) else 0 end  as jd4,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04'then a.nilai else 0 end) else 0 end  as nd4,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) else 0 end  as jd5,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) else 0 end  as nd5,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) else 0 end  as jd6,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) else 0 end  as nd6,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) else 0 end  as jd7,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) else 0 end  as nd7,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) else 0 end  as jd8,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) else 0 end  as nd8,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) else 0 end  as jd9,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) else 0 end  as nd9,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) else 0 end  as jd10,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd10,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) else 0 end  as jd11,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd11,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) else 0 end  as jd12,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) else 0 end  as nd12
	from exs_yk_bp a
	$this->filter and substring(a.periode,1,4)='$tahun' and a.jenis<>'AKRU'
	group by a.kode_lokasi,SUBSTRING(a.periode,1,4)";
			
			$rs3 = $dbLib->execute($sql);
			$tpjd12=0;
			$tpnd12=0;
			while ($row3 = $rs3->FetchNextObject($toupper=false))
			{
				if ($row2->j1!=0) {$a1=($row3->j1/$row2->j1)*100;}
				if ($row2->n1!=0) {$b1=($row3->n1/$row2->n1)*100;}
				if ($row2->j2!=0) {$a2=($row3->j2/$row2->j2)*100;}
				if ($row2->n2!=0) {$b2=($row3->n2/$row2->n2)*100;}
				if ($row2->j3!=0) {$a3=($row3->j3/$row2->j3)*100;}
				if ($row2->n3!=0) {$b3=($row3->n3/$row2->n3)*100;}
				if ($row2->j4!=0) {$a4=($row3->j4/$row2->j4)*100;}
				if ($row2->n4!=0) {$b4=($row3->n4/$row2->n4)*100;}
				if ($row2->j5!=0) {$a5=($row3->j5/$row2->j5)*100;}
				if ($row2->n5!=0) {$b5=($row3->n5/$row2->n5)*100;}
				if ($row2->j6!=0) {$a6=($row3->j6/$row2->j6)*100;}
				if ($row2->n6!=0) {$b6=($row3->n6/$row2->n6)*100;}
				if ($row2->j7!=0) {$a7=($row3->j7/$row2->j7)*100;}
				if ($row2->n7!=0) {$b7=($row3->n7/$row2->n7)*100;}
				if ($row2->j8!=0) {$a8=($row3->j8/$row2->j8)*100;}
				if ($row2->n8!=0) {$b8=($row3->n8/$row2->n8)*100;}
				if ($row2->j9!=0) {$a9=($row3->j9/$row2->j9)*100;}
				if ($row2->n9!=0) {$b9=($row3->n9/$row2->n9)*100;}
				if ($row2->j10!=0) {$a10=($row3->j10/$row2->j10)*100;}
				if ($row2->n10!=0) {$b10=($row3->n10/$row2->n10)*100;}
				if ($row2->j11!=0) {$a11=($row3->j11/$row2->j11)*100;}
				if ($row2->n11!=0) {$b11=($row3->n11/$row2->n11)*100;}
				if ($row2->j12!=0) {$a12=($row3->j12/$row2->j12)*100;}
				if ($row2->n12!=0) {$b12=($row3->n12/$row2->n12)*100;}
				
				if ($row2->jd1!=0) {$a13=($row3->jd1/$row2->jd1)*100;}
				if ($row2->nd1!=0) {$b13=($row3->nd1/$row2->nd1)*100;}
				if ($row2->jd2!=0) {$a14=($row3->jd2/$row2->jd2)*100;}
				if ($row2->nd2!=0) {$b14=($row3->nd2/$row2->nd2)*100;}
				if ($row2->jd3!=0) {$a15=($row3->jd3/$row2->jd3)*100;}
				if ($row2->nd3!=0) {$b15=($row3->nd3/$row2->nd3)*100;}
				if ($row2->jd4!=0) {$a16=($row3->jd4/$row2->jd4)*100;}
				if ($row2->nd4!=0) {$b16=($row3->nd4/$row2->nd4)*100;}
				if ($row2->jd5!=0) {$a17=($row3->jd5/$row2->jd5)*100;}
				if ($row2->nd5!=0) {$b17=($row3->nd5/$row2->nd5)*100;}
				if ($row2->jd6!=0) {$a18=($row3->jd6/$row2->jd6)*100;}
				if ($row2->nd6!=0) {$b18=($row3->nd6/$row2->nd6)*100;}
				if ($row2->jd7!=0) {$a19=($row3->jd7/$row2->jd7)*100;}
				if ($row2->nd7!=0) {$b19=($row3->nd7/$row2->nd7)*100;}
				if ($row2->jd8!=0) {$a20=($row3->jd8/$row2->jd8)*100;}
				if ($row2->nd8!=0) {$b20=($row3->nd8/$row2->nd8)*100;}
				if ($row2->jd9!=0) {$a21=($row3->jd9/$row2->jd9)*100;}
				if ($row2->nd9!=0) {$b21=($row3->nd9/$row2->nd9)*100;}
				if ($row2->jd10!=0) {$a22=($row3->jd10/$row2->jd10)*100;}
				if ($row2->nd10!=0) {$b22=($row3->nd10/$row2->nd10)*100;}
				if ($row2->jd11!=0) {$a23=($row3->jd11/$row2->jd11)*100;}
				if ($row2->nd11!=0) {$b23=($row3->nd11/$row2->nd11)*100;}
				if ($row2->jd12!=0) {$a24=($row3->jd12/$row2->jd12)*100;}
				if ($row2->nd12!=0) {$b24=($row3->nd12/$row2->nd12)*100;}
				
				$ta1+=$a1; $tb1+=$b1;
				$ta2+=$a2; $tb2+=$b2;
				$ta3+=$a3; $tb3+=$b3;
				$ta4+=$a4; $tb4+=$b4;
				$ta5+=$a5; $tb5+=$b5;
				$ta6+=$a6; $tb6+=$b6;
				$ta7+=$a7; $tb7+=$b7;
				$ta8+=$a8; $tb8+=$b8;
				$ta9+=$a9; $tb9+=$b9;
				$ta10+=$a10; $tb10+=$b10;
				$ta11+=$a11; $tb11+=$b11;
				$ta12+=$a12; $tb12+=$b12;
				$ta13+=$a13; $tb13+=$b13;
				$ta14+=$a14; $tb14+=$b14;
				$ta15+=$a15; $tb15+=$b15;
				$ta16+=$a16; $tb16+=$b16;
				$ta17+=$a17; $tb17+=$b17;
				$ta18+=$a18; $tb18+=$b18;
				$ta19+=$a19; $tb19+=$b19;
				$ta20+=$a20; $tb20+=$b20;
				$ta21+=$a21; $tb21+=$b21;
				$ta22+=$a22; $tb22+=$b22;
				$ta23+=$a23; $tb23+=$b23;
				$ta24+=$a24; $tb24+=$b24;
			echo "<tr>
				<td class='isi_laporan'>&nbsp;</td>
				<td class='isi_laporan'>TOTAL</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row3->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				</tr>";
			}
		
			$sql="select a.kode_lokasi,SUBSTRING(a.periode,1,4) as tahun,
		   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
		   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
		   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
		   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
		   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
		   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
		   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4,
		   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
		   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
		   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
		   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
		   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
		   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
		   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
		   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
		   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
		   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
		   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
		   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
		   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
		   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
		   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
		   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
		   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) else 0 end as jd2,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) else 0 end  as nd2,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) else 0 end  as jd3,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) else 0 end  as nd3,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end) else 0 end  as jd4,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04'then a.nilai else 0 end) else 0 end  as nd4,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) else 0 end  as jd5,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) else 0 end  as nd5,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) else 0 end  as jd6,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) else 0 end  as nd6,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) else 0 end  as jd7,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) else 0 end  as nd7,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) else 0 end  as jd8,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) else 0 end  as nd8,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) else 0 end  as jd9,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) else 0 end  as nd9,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) else 0 end  as jd10,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd10,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) else 0 end  as jd11,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd11,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) else 0 end  as jd12,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) else 0 end  as nd12
	from exs_yk_bp a
	$this->filter and substring(a.periode,1,4)='$tahun' and a.jenis='AKRU'
	group by a.kode_lokasi,SUBSTRING(a.periode,1,4)";
			
			$rs3 = $dbLib->execute($sql);
			while ($row3 = $rs3->FetchNextObject($toupper=false))
			{
				if ($row2->j1!=0) {$a1=($row3->j1/$row2->j1)*100;}
				if ($row2->n1!=0) {$b1=($row3->n1/$row2->n1)*100;}
				if ($row2->j2!=0) {$a2=($row3->j2/$row2->j2)*100;}
				if ($row2->n2!=0) {$b2=($row3->n2/$row2->n2)*100;}
				if ($row2->j3!=0) {$a3=($row3->j3/$row2->j3)*100;}
				if ($row2->n3!=0) {$b3=($row3->n3/$row2->n3)*100;}
				if ($row2->j4!=0) {$a4=($row3->j4/$row2->j4)*100;}
				if ($row2->n4!=0) {$b4=($row3->n4/$row2->n4)*100;}
				if ($row2->j5!=0) {$a5=($row3->j5/$row2->j5)*100;}
				if ($row2->n5!=0) {$b5=($row3->n5/$row2->n5)*100;}
				if ($row2->j6!=0) {$a6=($row3->j6/$row2->j6)*100;}
				if ($row2->n6!=0) {$b6=($row3->n6/$row2->n6)*100;}
				if ($row2->j7!=0) {$a7=($row3->j7/$row2->j7)*100;}
				if ($row2->n7!=0) {$b7=($row3->n7/$row2->n7)*100;}
				if ($row2->j8!=0) {$a8=($row3->j8/$row2->j8)*100;}
				if ($row2->n8!=0) {$b8=($row3->n8/$row2->n8)*100;}
				if ($row2->j9!=0) {$a9=($row3->j9/$row2->j9)*100;}
				if ($row2->n9!=0) {$b9=($row3->n9/$row2->n9)*100;}
				if ($row2->j10!=0) {$a10=($row3->j10/$row2->j10)*100;}
				if ($row2->n10!=0) {$b10=($row3->n10/$row2->n10)*100;}
				if ($row2->j11!=0) {$a11=($row3->j11/$row2->j11)*100;}
				if ($row2->n11!=0) {$b11=($row3->n11/$row2->n11)*100;}
				if ($row2->j12!=0) {$a12=($row3->j12/$row2->j12)*100;}
				if ($row2->n12!=0) {$b12=($row3->n12/$row2->n12)*100;}
				
				if ($row2->jd1!=0) {$a13=($row3->jd1/$row2->jd1)*100;}
				if ($row2->nd1!=0) {$b13=($row3->nd1/$row2->nd1)*100;}
				if ($row2->jd2!=0) {$a14=($row3->jd2/$row2->jd2)*100;}
				if ($row2->nd2!=0) {$b14=($row3->nd2/$row2->nd2)*100;}
				if ($row2->jd3!=0) {$a15=($row3->jd3/$row2->jd3)*100;}
				if ($row2->nd3!=0) {$b15=($row3->nd3/$row2->nd3)*100;}
				if ($row2->jd4!=0) {$a16=($row3->jd4/$row2->jd4)*100;}
				if ($row2->nd4!=0) {$b16=($row3->nd4/$row2->nd4)*100;}
				if ($row2->jd5!=0) {$a17=($row3->jd5/$row2->jd5)*100;}
				if ($row2->nd5!=0) {$b17=($row3->nd5/$row2->nd5)*100;}
				if ($row2->jd6!=0) {$a18=($row3->jd6/$row2->jd6)*100;}
				if ($row2->nd6!=0) {$b18=($row3->nd6/$row2->nd6)*100;}
				if ($row2->jd7!=0) {$a19=($row3->jd7/$row2->jd7)*100;}
				if ($row2->nd7!=0) {$b19=($row3->nd7/$row2->nd7)*100;}
				if ($row2->jd8!=0) {$a20=($row3->jd8/$row2->jd8)*100;}
				if ($row2->nd8!=0) {$b20=($row3->nd8/$row2->nd8)*100;}
				if ($row2->jd9!=0) {$a21=($row3->jd9/$row2->jd9)*100;}
				if ($row2->nd9!=0) {$b21=($row3->nd9/$row2->nd9)*100;}
				if ($row2->jd10!=0) {$a22=($row3->jd10/$row2->jd10)*100;}
				if ($row2->nd10!=0) {$b22=($row3->nd10/$row2->nd10)*100;}
				if ($row2->jd11!=0) {$a23=($row3->jd11/$row2->jd11)*100;}
				if ($row2->nd11!=0) {$b23=($row3->nd11/$row2->nd11)*100;}
				if ($row2->jd12!=0) {$a24=($row3->jd12/$row2->jd12)*100;}
				if ($row2->nd12!=0) {$b24=($row3->nd12/$row2->nd12)*100;}
				
				$ta1+=$a1; $tb1+=$b1;
				$ta2+=$a2; $tb2+=$b2;
				$ta3+=$a3; $tb3+=$b3;
				$ta4+=$a4; $tb4+=$b4;
				$ta5+=$a5; $tb5+=$b5;
				$ta6+=$a6; $tb6+=$b6;
				$ta7+=$a7; $tb7+=$b7;
				$ta8+=$a8; $tb8+=$b8;
				$ta9+=$a9; $tb9+=$b9;
				$ta10+=$a10; $tb10+=$b10;
				$ta11+=$a11; $tb11+=$b11;
				$ta12+=$a12; $tb12+=$b12;
				$ta13+=$a13; $tb13+=$b13;
				$ta14+=$a14; $tb14+=$b14;
				$ta15+=$a15; $tb15+=$b15;
				$ta16+=$a16; $tb16+=$b16;
				$ta17+=$a17; $tb17+=$b17;
				$ta18+=$a18; $tb18+=$b18;
				$ta19+=$a19; $tb19+=$b19;
				$ta20+=$a20; $tb20+=$b20;
				$ta21+=$a21; $tb21+=$b21;
				$ta22+=$a22; $tb22+=$b22;
				$ta23+=$a23; $tb23+=$b23;
				$ta24+=$a24; $tb24+=$b24;
			echo "<tr>
				<td class='isi_laporan'>&nbsp;</td>
				<td class='isi_laporan'>AKRU</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row3->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				</tr>";
			}
			echo "<tr>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>TOTAL1</td>
			<td class='isi_laporan' align='right'>".number_format($row2->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($ta24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($tb24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($ta1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($tb1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($ta2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($tb2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row2->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
			
			</tr>";
			
			$sql="select a.kode_lokasi,SUBSTRING(a.periode,1,4) as tahun,
		   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
		   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
		   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
		   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
		   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
		   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
		   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4,
		   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
		   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
		   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
		   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
		   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
		   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
		   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
		   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
		   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
		   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
		   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
		   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
		   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
		   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
		   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
		   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
		   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
		   sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) as jd2,
		   sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) as nd2,
		   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as jd3,
		   sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) as nd3,
		   sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end) as jd4,
		   sum(case when substring(a.periode,5,2) between '01' and '04'then a.nilai else 0 end) as nd4,
		   sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) as jd5,
		   sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) as nd5,
		   sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) as jd6,
		   sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) as nd6,
		   sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) as jd7,
		   sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) as nd7,
		   sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) as jd8,
		   sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) as nd8,
		   sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) as jd9,
		   sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) as nd9,
		   sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) as jd10,
		   sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) as nd10,
		   sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) as jd11,
		   sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) as nd11,
		   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) as jd12,
		   sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) as nd12
	from exs_yk_bp a
	$this->filter and substring(a.periode,1,4)='$tahun2' 
	group by a.kode_lokasi,SUBSTRING(a.periode,1,4)";
			
			$rs3 = $dbLib->execute($sql);
			while ($row3 = $rs3->FetchNextObject($toupper=false))
			{
				if ($row2->j1!=0) {$a1=($row3->j1/$row2->j1)*100;}
				if ($row2->n1!=0) {$b1=($row3->n1/$row2->n1)*100;}
				if ($row2->j2!=0) {$a2=($row3->j2/$row2->j2)*100;}
				if ($row2->n2!=0) {$b2=($row3->n2/$row2->n2)*100;}
				if ($row2->j3!=0) {$a3=($row3->j3/$row2->j3)*100;}
				if ($row2->n3!=0) {$b3=($row3->n3/$row2->n3)*100;}
				if ($row2->j4!=0) {$a4=($row3->j4/$row2->j4)*100;}
				if ($row2->n4!=0) {$b4=($row3->n4/$row2->n4)*100;}
				if ($row2->j5!=0) {$a5=($row3->j5/$row2->j5)*100;}
				if ($row2->n5!=0) {$b5=($row3->n5/$row2->n5)*100;}
				if ($row2->j6!=0) {$a6=($row3->j6/$row2->j6)*100;}
				if ($row2->n6!=0) {$b6=($row3->n6/$row2->n6)*100;}
				if ($row2->j7!=0) {$a7=($row3->j7/$row2->j7)*100;}
				if ($row2->n7!=0) {$b7=($row3->n7/$row2->n7)*100;}
				if ($row2->j8!=0) {$a8=($row3->j8/$row2->j8)*100;}
				if ($row2->n8!=0) {$b8=($row3->n8/$row2->n8)*100;}
				if ($row2->j9!=0) {$a9=($row3->j9/$row2->j9)*100;}
				if ($row2->n9!=0) {$b9=($row3->n9/$row2->n9)*100;}
				if ($row2->j10!=0) {$a10=($row3->j10/$row2->j10)*100;}
				if ($row2->n10!=0) {$b10=($row3->n10/$row2->n10)*100;}
				if ($row2->j11!=0) {$a11=($row3->j11/$row2->j11)*100;}
				if ($row2->n11!=0) {$b11=($row3->n11/$row2->n11)*100;}
				if ($row2->j12!=0) {$a12=($row3->j12/$row2->j12)*100;}
				if ($row2->n12!=0) {$b12=($row3->n12/$row2->n12)*100;}
				
				if ($row2->jd1!=0) {$a13=($row3->jd1/$row2->jd1)*100;}
				if ($row2->nd1!=0) {$b13=($row3->nd1/$row2->nd1)*100;}
				if ($row2->jd2!=0) {$a14=($row3->jd2/$row2->jd2)*100;}
				if ($row2->nd2!=0) {$b14=($row3->nd2/$row2->nd2)*100;}
				if ($row2->jd3!=0) {$a15=($row3->jd3/$row2->jd3)*100;}
				if ($row2->nd3!=0) {$b15=($row3->nd3/$row2->nd3)*100;}
				if ($row2->jd4!=0) {$a16=($row3->jd4/$row2->jd4)*100;}
				if ($row2->nd4!=0) {$b16=($row3->nd4/$row2->nd4)*100;}
				if ($row2->jd5!=0) {$a17=($row3->jd5/$row2->jd5)*100;}
				if ($row2->nd5!=0) {$b17=($row3->nd5/$row2->nd5)*100;}
				if ($row2->jd6!=0) {$a18=($row3->jd6/$row2->jd6)*100;}
				if ($row2->nd6!=0) {$b18=($row3->nd6/$row2->nd6)*100;}
				if ($row2->jd7!=0) {$a19=($row3->jd7/$row2->jd7)*100;}
				if ($row2->nd7!=0) {$b19=($row3->nd7/$row2->nd7)*100;}
				if ($row2->jd8!=0) {$a20=($row3->jd8/$row2->jd8)*100;}
				if ($row2->nd8!=0) {$b20=($row3->nd8/$row2->nd8)*100;}
				if ($row2->jd9!=0) {$a21=($row3->jd9/$row2->jd9)*100;}
				if ($row2->nd9!=0) {$b21=($row3->nd9/$row2->nd9)*100;}
				if ($row2->jd10!=0) {$a22=($row3->jd10/$row2->jd10)*100;}
				if ($row2->nd10!=0) {$b22=($row3->nd10/$row2->nd10)*100;}
				if ($row2->jd11!=0) {$a23=($row3->jd11/$row2->jd11)*100;}
				if ($row2->nd11!=0) {$b23=($row3->nd11/$row2->nd11)*100;}
				if ($row2->jd12!=0) {$a24=($row3->jd12/$row2->jd12)*100;}
				if ($row2->nd12!=0) {$b24=($row3->nd12/$row2->nd12)*100;}
				
			echo "<tr>
				<td class='isi_laporan'>&nbsp;</td>
				<td class='isi_laporan'>$tahun2</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row3->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				</tr>";
			}
			
			$sql="select a.kode_lokasi,SUBSTRING(a.periode,1,4) as tahun,
		   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
		   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
		   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
		   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
		   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
		   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
		   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4,
		   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
		   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
		   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
		   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
		   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
		   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
		   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
		   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
		   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
		   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
		   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
		   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
		   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
		   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
		   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
		   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
		   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
		   sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) as jd2,
		   sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) as nd2,
		   sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) as jd3,
		   sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) as nd3,
		   sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end) as jd4,
		   sum(case when substring(a.periode,5,2) between '01' and '04'then a.nilai else 0 end) as nd4,
		   sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) as jd5,
		   sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) as nd5,
		   sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) as jd6,
		   sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) as nd6,
		   sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) as jd7,
		   sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) as nd7,
		   sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) as jd8,
		   sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) as nd8,
		   sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) as jd9,
		   sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) as nd9,
		   sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) as jd10,
		   sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) as nd10,
		   sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) as jd11,
		   sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) as nd11,
		   sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) as jd12,
		   sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) as nd12
	from exs_yk_bp a
	$this->filter and substring(a.periode,1,4)='$tahun1' 
	group by a.kode_lokasi,SUBSTRING(a.periode,1,4)";
			
			$rs3 = $dbLib->execute($sql);
			while ($row3 = $rs3->FetchNextObject($toupper=false))
			{
				if ($row2->j1!=0) {$a1=($row3->j1/$row2->j1)*100;}
				if ($row2->n1!=0) {$b1=($row3->n1/$row2->n1)*100;}
				if ($row2->j2!=0) {$a2=($row3->j2/$row2->j2)*100;}
				if ($row2->n2!=0) {$b2=($row3->n2/$row2->n2)*100;}
				if ($row2->j3!=0) {$a3=($row3->j3/$row2->j3)*100;}
				if ($row2->n3!=0) {$b3=($row3->n3/$row2->n3)*100;}
				if ($row2->j4!=0) {$a4=($row3->j4/$row2->j4)*100;}
				if ($row2->n4!=0) {$b4=($row3->n4/$row2->n4)*100;}
				if ($row2->j5!=0) {$a5=($row3->j5/$row2->j5)*100;}
				if ($row2->n5!=0) {$b5=($row3->n5/$row2->n5)*100;}
				if ($row2->j6!=0) {$a6=($row3->j6/$row2->j6)*100;}
				if ($row2->n6!=0) {$b6=($row3->n6/$row2->n6)*100;}
				if ($row2->j7!=0) {$a7=($row3->j7/$row2->j7)*100;}
				if ($row2->n7!=0) {$b7=($row3->n7/$row2->n7)*100;}
				if ($row2->j8!=0) {$a8=($row3->j8/$row2->j8)*100;}
				if ($row2->n8!=0) {$b8=($row3->n8/$row2->n8)*100;}
				if ($row2->j9!=0) {$a9=($row3->j9/$row2->j9)*100;}
				if ($row2->n9!=0) {$b9=($row3->n9/$row2->n9)*100;}
				if ($row2->j10!=0) {$a10=($row3->j10/$row2->j10)*100;}
				if ($row2->n10!=0) {$b10=($row3->n10/$row2->n10)*100;}
				if ($row2->j11!=0) {$a11=($row3->j11/$row2->j11)*100;}
				if ($row2->n11!=0) {$b11=($row3->n11/$row2->n11)*100;}
				if ($row2->j12!=0) {$a12=($row3->j12/$row2->j12)*100;}
				if ($row2->n12!=0) {$b12=($row3->n12/$row2->n12)*100;}
				
				if ($row2->jd1!=0) {$a13=($row3->jd1/$row2->jd1)*100;}
				if ($row2->nd1!=0) {$b13=($row3->nd1/$row2->nd1)*100;}
				if ($row2->jd2!=0) {$a14=($row3->jd2/$row2->jd2)*100;}
				if ($row2->nd2!=0) {$b14=($row3->nd2/$row2->nd2)*100;}
				if ($row2->jd3!=0) {$a15=($row3->jd3/$row2->jd3)*100;}
				if ($row2->nd3!=0) {$b15=($row3->nd3/$row2->nd3)*100;}
				if ($row2->jd4!=0) {$a16=($row3->jd4/$row2->jd4)*100;}
				if ($row2->nd4!=0) {$b16=($row3->nd4/$row2->nd4)*100;}
				if ($row2->jd5!=0) {$a17=($row3->jd5/$row2->jd5)*100;}
				if ($row2->nd5!=0) {$b17=($row3->nd5/$row2->nd5)*100;}
				if ($row2->jd6!=0) {$a18=($row3->jd6/$row2->jd6)*100;}
				if ($row2->nd6!=0) {$b18=($row3->nd6/$row2->nd6)*100;}
				if ($row2->jd7!=0) {$a19=($row3->jd7/$row2->jd7)*100;}
				if ($row2->nd7!=0) {$b19=($row3->nd7/$row2->nd7)*100;}
				if ($row2->jd8!=0) {$a20=($row3->jd8/$row2->jd8)*100;}
				if ($row2->nd8!=0) {$b20=($row3->nd8/$row2->nd8)*100;}
				if ($row2->jd9!=0) {$a21=($row3->jd9/$row2->jd9)*100;}
				if ($row2->nd9!=0) {$b21=($row3->nd9/$row2->nd9)*100;}
				if ($row2->jd10!=0) {$a22=($row3->jd10/$row2->jd10)*100;}
				if ($row2->nd10!=0) {$b22=($row3->nd10/$row2->nd10)*100;}
				if ($row2->jd11!=0) {$a23=($row3->jd11/$row2->jd11)*100;}
				if ($row2->nd11!=0) {$b23=($row3->nd11/$row2->nd11)*100;}
				if ($row2->jd12!=0) {$a24=($row3->jd12/$row2->jd12)*100;}
				if ($row2->nd12!=0) {$b24=($row3->nd12/$row2->nd12)*100;}
				
				
			echo "<tr>
				<td class='isi_laporan'>&nbsp;</td>
				<td class='isi_laporan'>$tahun1</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row3->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				</tr>";
			}
			
		
		
		$sql="select a.kode_lokasi,SUBSTRING(a.periode,1,4) as tahun,
		   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
		   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
		   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
		   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
		   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
		   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
		   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
		   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
		   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
		   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
		   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
		   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
		   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
		   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
		   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
		   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
		   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
		   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
		   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
		   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
		   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
		   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
		   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) else 0 end as jd2,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) else 0 end  as nd2,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) else 0 end  as jd3,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) else 0 end  as nd3,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end) else 0 end  as jd4,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04'then a.nilai else 0 end) else 0 end  as nd4,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) else 0 end  as jd5,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) else 0 end  as nd5,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) else 0 end  as jd6,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) else 0 end  as nd6,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) else 0 end  as jd7,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) else 0 end  as nd7,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) else 0 end  as jd8,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) else 0 end  as nd8,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) else 0 end  as jd9,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) else 0 end  as nd9,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) else 0 end  as jd10,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd10,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) else 0 end  as jd11,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd11,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) else 0 end  as jd12,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) else 0 end  as nd12
	from exs_yk_bp a
	$this->filter and substring(a.periode,1,4)='$tahun' and a.jenis<>'AKRU'
	group by a.kode_lokasi,SUBSTRING(a.periode,1,4)";
			
			$rs3 = $dbLib->execute($sql);
			$tpjd12=0;
			$tpnd12=0;
			while ($row3 = $rs3->FetchNextObject($toupper=false))
			{
				if ($row2->j1!=0) {$a1=($row3->j1/$row2->j1)*100;}
				if ($row2->n1!=0) {$b1=($row3->n1/$row2->n1)*100;}
				if ($row2->j2!=0) {$a2=($row3->j2/$row2->j2)*100;}
				if ($row2->n2!=0) {$b2=($row3->n2/$row2->n2)*100;}
				if ($row2->j3!=0) {$a3=($row3->j3/$row2->j3)*100;}
				if ($row2->n3!=0) {$b3=($row3->n3/$row2->n3)*100;}
				if ($row2->j4!=0) {$a4=($row3->j4/$row2->j4)*100;}
				if ($row2->n4!=0) {$b4=($row3->n4/$row2->n4)*100;}
				if ($row2->j5!=0) {$a5=($row3->j5/$row2->j5)*100;}
				if ($row2->n5!=0) {$b5=($row3->n5/$row2->n5)*100;}
				if ($row2->j6!=0) {$a6=($row3->j6/$row2->j6)*100;}
				if ($row2->n6!=0) {$b6=($row3->n6/$row2->n6)*100;}
				if ($row2->j7!=0) {$a7=($row3->j7/$row2->j7)*100;}
				if ($row2->n7!=0) {$b7=($row3->n7/$row2->n7)*100;}
				if ($row2->j8!=0) {$a8=($row3->j8/$row2->j8)*100;}
				if ($row2->n8!=0) {$b8=($row3->n8/$row2->n8)*100;}
				if ($row2->j9!=0) {$a9=($row3->j9/$row2->j9)*100;}
				if ($row2->n9!=0) {$b9=($row3->n9/$row2->n9)*100;}
				if ($row2->j10!=0) {$a10=($row3->j10/$row2->j10)*100;}
				if ($row2->n10!=0) {$b10=($row3->n10/$row2->n10)*100;}
				if ($row2->j11!=0) {$a11=($row3->j11/$row2->j11)*100;}
				if ($row2->n11!=0) {$b11=($row3->n11/$row2->n11)*100;}
				if ($row2->j12!=0) {$a12=($row3->j12/$row2->j12)*100;}
				if ($row2->n12!=0) {$b12=($row3->n12/$row2->n12)*100;}
				
				if ($row2->jd1!=0) {$a13=($row3->jd1/$row2->jd1)*100;}
				if ($row2->nd1!=0) {$b13=($row3->nd1/$row2->nd1)*100;}
				if ($row2->jd2!=0) {$a14=($row3->jd2/$row2->jd2)*100;}
				if ($row2->nd2!=0) {$b14=($row3->nd2/$row2->nd2)*100;}
				if ($row2->jd3!=0) {$a15=($row3->jd3/$row2->jd3)*100;}
				if ($row2->nd3!=0) {$b15=($row3->nd3/$row2->nd3)*100;}
				if ($row2->jd4!=0) {$a16=($row3->jd4/$row2->jd4)*100;}
				if ($row2->nd4!=0) {$b16=($row3->nd4/$row2->nd4)*100;}
				if ($row2->jd5!=0) {$a17=($row3->jd5/$row2->jd5)*100;}
				if ($row2->nd5!=0) {$b17=($row3->nd5/$row2->nd5)*100;}
				if ($row2->jd6!=0) {$a18=($row3->jd6/$row2->jd6)*100;}
				if ($row2->nd6!=0) {$b18=($row3->nd6/$row2->nd6)*100;}
				if ($row2->jd7!=0) {$a19=($row3->jd7/$row2->jd7)*100;}
				if ($row2->nd7!=0) {$b19=($row3->nd7/$row2->nd7)*100;}
				if ($row2->jd8!=0) {$a20=($row3->jd8/$row2->jd8)*100;}
				if ($row2->nd8!=0) {$b20=($row3->nd8/$row2->nd8)*100;}
				if ($row2->jd9!=0) {$a21=($row3->jd9/$row2->jd9)*100;}
				if ($row2->nd9!=0) {$b21=($row3->nd9/$row2->nd9)*100;}
				if ($row2->jd10!=0) {$a22=($row3->jd10/$row2->jd10)*100;}
				if ($row2->nd10!=0) {$b22=($row3->nd10/$row2->nd10)*100;}
				if ($row2->jd11!=0) {$a23=($row3->jd11/$row2->jd11)*100;}
				if ($row2->nd11!=0) {$b23=($row3->nd11/$row2->nd11)*100;}
				if ($row2->jd12!=0) {$a24=($row3->jd12/$row2->jd12)*100;}
				if ($row2->nd12!=0) {$b24=($row3->nd12/$row2->nd12)*100;}
				
				$ta1+=$a1; $tb1+=$b1;
				$ta2+=$a2; $tb2+=$b2;
				$ta3+=$a3; $tb3+=$b3;
				$ta4+=$a4; $tb4+=$b4;
				$ta5+=$a5; $tb5+=$b5;
				$ta6+=$a6; $tb6+=$b6;
				$ta7+=$a7; $tb7+=$b7;
				$ta8+=$a8; $tb8+=$b8;
				$ta9+=$a9; $tb9+=$b9;
				$ta10+=$a10; $tb10+=$b10;
				$ta11+=$a11; $tb11+=$b11;
				$ta12+=$a12; $tb12+=$b12;
				$ta13+=$a13; $tb13+=$b13;
				$ta14+=$a14; $tb14+=$b14;
				$ta15+=$a15; $tb15+=$b15;
				$ta16+=$a16; $tb16+=$b16;
				$ta17+=$a17; $tb17+=$b17;
				$ta18+=$a18; $tb18+=$b18;
				$ta19+=$a19; $tb19+=$b19;
				$ta20+=$a20; $tb20+=$b20;
				$ta21+=$a21; $tb21+=$b21;
				$ta22+=$a22; $tb22+=$b22;
				$ta23+=$a23; $tb23+=$b23;
				$ta24+=$a24; $tb24+=$b24;
			echo "<tr>
				<td class='isi_laporan'>&nbsp;</td>
				<td class='isi_laporan'>JUMLAH</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row3->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				</tr>";
			}
			
		$sql="select a.kode_lokasi,SUBSTRING(a.periode,1,4) as tahun,
		   sum(case when substring(a.periode,5,2)='01' then a.jumlah else 0 end) as j1,
		   sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end) as n1,
		   sum(case when substring(a.periode,5,2)='02' then a.jumlah else 0 end) as j2,
		   sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end) as n2,
		   sum(case when substring(a.periode,5,2)='03' then a.jumlah else 0 end) as j3,
		   sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end) as n3,
		   sum(case when substring(a.periode,5,2)='04' then a.jumlah else 0 end) as j4,
		   sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end) as n4,
		   sum(case when substring(a.periode,5,2)='05' then a.jumlah else 0 end) as j5,
		   sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end) as n5,
		   sum(case when substring(a.periode,5,2)='06' then a.jumlah else 0 end) as j6,
		   sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end) as n6,
		   sum(case when substring(a.periode,5,2)='07' then a.jumlah else 0 end) as j7,
		   sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end) as n7,
		   sum(case when substring(a.periode,5,2)='08' then a.jumlah else 0 end) as j8,
		   sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end) as n8,
		   sum(case when substring(a.periode,5,2)='09' then a.jumlah else 0 end) as j9,
		   sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end) as n9,
		   sum(case when substring(a.periode,5,2)='10' then a.jumlah else 0 end) as j10,
		   sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end) as n10,
		   sum(case when substring(a.periode,5,2)='11' then a.jumlah else 0 end) as j11,
		   sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end) as n11,
		   sum(case when substring(a.periode,5,2)='12' then a.jumlah else 0 end) as j12,
		   sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end) as n12,
		   sum(case when substring(a.periode,5,2) between '01' and '01' then a.jumlah else 0 end) as jd1,
		   sum(case when substring(a.periode,5,2) between '01' and '01'then a.nilai else 0 end) as nd1,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02' then a.jumlah else 0 end) else 0 end as jd2,
		   case when '02'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '02'then a.nilai else 0 end) else 0 end  as nd2,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03' then a.jumlah else 0 end) else 0 end  as jd3,
		   case when '03'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '03'then a.nilai else 0 end) else 0 end  as nd3,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04' then a.jumlah else 0 end) else 0 end  as jd4,
		   case when '04'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '04'then a.nilai else 0 end) else 0 end  as nd4,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05' then a.jumlah else 0 end) else 0 end  as jd5,
		   case when '05'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '05'then a.nilai else 0 end) else 0 end  as nd5,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06' then a.jumlah else 0 end) else 0 end  as jd6,
		   case when '06'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '06'then a.nilai else 0 end) else 0 end  as nd6,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07' then a.jumlah else 0 end) else 0 end  as jd7,
		   case when '07'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '07'then a.nilai else 0 end) else 0 end  as nd7,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08' then a.jumlah else 0 end) else 0 end  as jd8,
		   case when '08'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '08'then a.nilai else 0 end) else 0 end  as nd8,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09' then a.jumlah else 0 end) else 0 end  as jd9,
		   case when '09'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '09'then a.nilai else 0 end) else 0 end  as nd9,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '10' then a.jumlah else 0 end) else 0 end  as jd10,
		   case when '10'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd10,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11' then a.jumlah else 0 end) else 0 end  as jd11,
		   case when '11'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '11'then a.nilai else 0 end) else 0 end  as nd11,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12' then a.jumlah else 0 end) else 0 end  as jd12,
		   case when '12'<'$bul' then sum(case when substring(a.periode,5,2) between '01' and '12'then a.nilai else 0 end) else 0 end  as nd12
	from exs_yk_bp a
	$this->filter and substring(a.periode,1,4)='$tahun' and a.jenis='AKRU'
	group by a.kode_lokasi,SUBSTRING(a.periode,1,4)";
			
			$rs3 = $dbLib->execute($sql);
			while ($row3 = $rs3->FetchNextObject($toupper=false))
			{
				if ($row2->j1!=0) {$a1=($row3->j1/$row2->j1)*100;}
				if ($row2->n1!=0) {$b1=($row3->n1/$row2->n1)*100;}
				if ($row2->j2!=0) {$a2=($row3->j2/$row2->j2)*100;}
				if ($row2->n2!=0) {$b2=($row3->n2/$row2->n2)*100;}
				if ($row2->j3!=0) {$a3=($row3->j3/$row2->j3)*100;}
				if ($row2->n3!=0) {$b3=($row3->n3/$row2->n3)*100;}
				if ($row2->j4!=0) {$a4=($row3->j4/$row2->j4)*100;}
				if ($row2->n4!=0) {$b4=($row3->n4/$row2->n4)*100;}
				if ($row2->j5!=0) {$a5=($row3->j5/$row2->j5)*100;}
				if ($row2->n5!=0) {$b5=($row3->n5/$row2->n5)*100;}
				if ($row2->j6!=0) {$a6=($row3->j6/$row2->j6)*100;}
				if ($row2->n6!=0) {$b6=($row3->n6/$row2->n6)*100;}
				if ($row2->j7!=0) {$a7=($row3->j7/$row2->j7)*100;}
				if ($row2->n7!=0) {$b7=($row3->n7/$row2->n7)*100;}
				if ($row2->j8!=0) {$a8=($row3->j8/$row2->j8)*100;}
				if ($row2->n8!=0) {$b8=($row3->n8/$row2->n8)*100;}
				if ($row2->j9!=0) {$a9=($row3->j9/$row2->j9)*100;}
				if ($row2->n9!=0) {$b9=($row3->n9/$row2->n9)*100;}
				if ($row2->j10!=0) {$a10=($row3->j10/$row2->j10)*100;}
				if ($row2->n10!=0) {$b10=($row3->n10/$row2->n10)*100;}
				if ($row2->j11!=0) {$a11=($row3->j11/$row2->j11)*100;}
				if ($row2->n11!=0) {$b11=($row3->n11/$row2->n11)*100;}
				if ($row2->j12!=0) {$a12=($row3->j12/$row2->j12)*100;}
				if ($row2->n12!=0) {$b12=($row3->n12/$row2->n12)*100;}
				
				if ($row2->jd1!=0) {$a13=($row3->jd1/$row2->jd1)*100;}
				if ($row2->nd1!=0) {$b13=($row3->nd1/$row2->nd1)*100;}
				if ($row2->jd2!=0) {$a14=($row3->jd2/$row2->jd2)*100;}
				if ($row2->nd2!=0) {$b14=($row3->nd2/$row2->nd2)*100;}
				if ($row2->jd3!=0) {$a15=($row3->jd3/$row2->jd3)*100;}
				if ($row2->nd3!=0) {$b15=($row3->nd3/$row2->nd3)*100;}
				if ($row2->jd4!=0) {$a16=($row3->jd4/$row2->jd4)*100;}
				if ($row2->nd4!=0) {$b16=($row3->nd4/$row2->nd4)*100;}
				if ($row2->jd5!=0) {$a17=($row3->jd5/$row2->jd5)*100;}
				if ($row2->nd5!=0) {$b17=($row3->nd5/$row2->nd5)*100;}
				if ($row2->jd6!=0) {$a18=($row3->jd6/$row2->jd6)*100;}
				if ($row2->nd6!=0) {$b18=($row3->nd6/$row2->nd6)*100;}
				if ($row2->jd7!=0) {$a19=($row3->jd7/$row2->jd7)*100;}
				if ($row2->nd7!=0) {$b19=($row3->nd7/$row2->nd7)*100;}
				if ($row2->jd8!=0) {$a20=($row3->jd8/$row2->jd8)*100;}
				if ($row2->nd8!=0) {$b20=($row3->nd8/$row2->nd8)*100;}
				if ($row2->jd9!=0) {$a21=($row3->jd9/$row2->jd9)*100;}
				if ($row2->nd9!=0) {$b21=($row3->nd9/$row2->nd9)*100;}
				if ($row2->jd10!=0) {$a22=($row3->jd10/$row2->jd10)*100;}
				if ($row2->nd10!=0) {$b22=($row3->nd10/$row2->nd10)*100;}
				if ($row2->jd11!=0) {$a23=($row3->jd11/$row2->jd11)*100;}
				if ($row2->nd11!=0) {$b23=($row3->nd11/$row2->nd11)*100;}
				if ($row2->jd12!=0) {$a24=($row3->jd12/$row2->jd12)*100;}
				if ($row2->nd12!=0) {$b24=($row3->nd12/$row2->nd12)*100;}
				
				$ta1+=$a1; $tb1+=$b1;
				$ta2+=$a2; $tb2+=$b2;
				$ta3+=$a3; $tb3+=$b3;
				$ta4+=$a4; $tb4+=$b4;
				$ta5+=$a5; $tb5+=$b5;
				$ta6+=$a6; $tb6+=$b6;
				$ta7+=$a7; $tb7+=$b7;
				$ta8+=$a8; $tb8+=$b8;
				$ta9+=$a9; $tb9+=$b9;
				$ta10+=$a10; $tb10+=$b10;
				$ta11+=$a11; $tb11+=$b11;
				$ta12+=$a12; $tb12+=$b12;
				$ta13+=$a13; $tb13+=$b13;
				$ta14+=$a14; $tb14+=$b14;
				$ta15+=$a15; $tb15+=$b15;
				$ta16+=$a16; $tb16+=$b16;
				$ta17+=$a17; $tb17+=$b17;
				$ta18+=$a18; $tb18+=$b18;
				$ta19+=$a19; $tb19+=$b19;
				$ta20+=$a20; $tb20+=$b20;
				$ta21+=$a21; $tb21+=$b21;
				$ta22+=$a22; $tb22+=$b22;
				$ta23+=$a23; $tb23+=$b23;
				$ta24+=$a24; $tb24+=$b24;
			echo "<tr>
				<td class='isi_laporan'>&nbsp;</td>
				<td class='isi_laporan'>AKRU</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row3->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row3->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
				</tr>";
			}
			
		echo "<tr>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>TOTAL</td>
			<td class='isi_laporan' align='right'>".number_format($row2->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($ta24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($tb24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($ta1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($tb1,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($ta2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($tb2,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b3,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b4,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b5,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b6,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b7,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b8,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b9,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b10,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b11,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->j12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->n12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a12,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b12,2,',','.')."</td>
				
				<td class='isi_laporan' align='right'>".number_format($row2->jd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b13,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b14,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b15,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b16,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b17,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b18,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b19,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b20,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b21,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b22,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b23,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->jd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($row2->nd12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($a24,2,',','.')."</td>
				<td class='isi_laporan' align='right'>".number_format($b24,2,',','.')."</td>
			
			</tr>";
			$ratad12=($row2->nd12/12)*1.07;
			$rata1=($row2->n1/12)*1.07;
			$rata2=($row2->n2/12)*1.07;
			$rata3=($row2->n3/12)*1.07;
			$rata4=($row2->n4/12)*1.07;
			$rata5=($row2->n5/12)*1.07;
			$rata6=($row2->n6/12)*1.07;
			$rata7=($row2->n7/12)*1.07;
			$rata8=($row2->n8/12)*1.07;
			$rata9=($row2->n9/12)*1.07;
			$rata10=($row2->n10/12)*1.07;
			$rata11=($row2->n11/12)*1.07;
			$rata12=($row2->n12/12)*1.07;
			
			$ratad1=($row2->nd1/12)*1.07;
			$ratad2=($row2->nd2/12)*1.07;
			$ratad3=($row2->nd3/12)*1.07;
			$ratad4=($row2->nd4/12)*1.07;
			$ratad5=($row2->nd5/12)*1.07;
			$ratad6=($row2->nd6/12)*1.07;
			$ratad7=($row2->nd7/12)*1.07;
			$ratad8=($row2->nd8/12)*1.07;
			$ratad9=($row2->nd9/12)*1.07;
			$ratad10=($row2->nd10/12)*1.07;
			$ratad11=($row2->nd11/12)*1.07;
		}	
		
		echo "<tr>
			<td class='isi_laporan'>&nbsp;</td>
			<td class='isi_laporan'>RATA - RATA</td>
			<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'></td>
				<td class='isi_laporan' align='right'>".number_format($rata4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($rata12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad1,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad2,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad3,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad4,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad5,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad6,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad7,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad8,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad9,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad10,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad11,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>".number_format($ratad12,0,',','.')."</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
				<td class='isi_laporan' align='right'>&nbsp;</td>
			
			</tr>";
		
		echo "</table>";
		echo "</div>";
		return "";
	}
	

	
}
?>
