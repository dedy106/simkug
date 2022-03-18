<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptRekapHari extends server_report_basic
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
		
		$sql="select a.kode_kantin,a.kode_lokasi,a.nama from ktu_kantin a where a.kode_lokasi='$kode_lokasi' order by a.kode_kantin";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap pendapatan tenan",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='1500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='150'  align='center' class='header_laporan'>Kantin</td>
	 <td width='90' align='center' class='header_laporan'>Tgl 1</td>
    <td width='90' align='center' class='header_laporan'>Tgl 2</td>
	<td width='90' align='center' class='header_laporan'>Tgl 3</td>
	<td width='90' align='center' class='header_laporan'>Tgl 4</td>
	<td width='90' align='center' class='header_laporan'>Tgl 5</td>
	<td width='90' align='center' class='header_laporan'>Tgl 6</td>
	<td width='90' align='center' class='header_laporan'>Tgl 7</td>
	<td width='90' align='center' class='header_laporan'>Tgl 8</td>
	<td width='90' align='center' class='header_laporan'>Tgl 9</td>
	<td width='90' align='center' class='header_laporan'>Tgl 10</td>
	<td width='90' align='center' class='header_laporan'>Tgl 11</td>
	<td width='90' align='center' class='header_laporan'>Tgl 12</td>
	<td width='90' align='center' class='header_laporan'>Tgl 13</td>
	<td width='90' align='center' class='header_laporan'>Tgl 14</td>
	<td width='90' align='center' class='header_laporan'>Tgl 15</td>
	<td width='90' align='center' class='header_laporan'>Tgl 16</td>
	<td width='90' align='center' class='header_laporan'>Tgl 17</td>
	<td width='90' align='center' class='header_laporan'>Tgl 18</td>
	<td width='90' align='center' class='header_laporan'>Tgl 19</td>
	<td width='90' align='center' class='header_laporan'>Tgl 20</td>
	<td width='90' align='center' class='header_laporan'>Tgl 21</td>
    <td width='90' align='center' class='header_laporan'>Tgl 22</td>
	<td width='90' align='center' class='header_laporan'>Tgl 23</td>
	<td width='90' align='center' class='header_laporan'>Tgl 24</td>
	<td width='90' align='center' class='header_laporan'>Tgl 25</td>
	<td width='90' align='center' class='header_laporan'>Tgl 26</td>
	<td width='90' align='center' class='header_laporan'>Tgl 27</td>
	<td width='90' align='center' class='header_laporan'>Tgl 28</td>
	<td width='90' align='center' class='header_laporan'>Tgl 29</td>
	<td width='90' align='center' class='header_laporan'>Tgl 30</td>
	<td width='90' align='center' class='header_laporan'>Tgl 31</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
	    $tn1=0; $tn2=0; $tn3=0; $tn4=0; $tn5=0; $tn6=0; $tn7=0; $tn8=0; $tn9=0; $tn10=0; $tn11=0; $tn12=0; $tnilai=0;
		$tn11=0; $tn12=0; $tn13=0; $tn14=0; $tn15=0; $tn16=0; $tn17=0; $tn18=0; $tn19=0; $tn20=0;
		$tn21=0; $tn22=0; $tn23=0; $tn24=0; $tn25=0; $tn26=0; $tn27=0; $tn28=0; $tn29=0; $tn30=0; $tn31=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td colspan='14' class='header_laporan'>$row->nama</td>
     </tr>";
		$sql="select a.kode_tenan,a.kode_lokasi,isnull(b.nilai,0) as nilai,a.nama,
	   isnull(b.n1,0) as n1,isnull(b.n2,0) as n2,isnull(b.n3,0) as n3,isnull(b.n4,0) as n4,
	   isnull(b.n5,0) as n5,isnull(b.n6,0) as n6,isnull(b.n7,0) as n7,isnull(b.n8,0) as n8,
	   isnull(b.n9,0) as n9,isnull(b.n10,0) as n10,isnull(b.n11,0) as n11,isnull(b.n12,0) as n12,
	   isnull(b.n13,0) as n13,isnull(b.n14,0) as n14,isnull(b.n15,0) as n15,isnull(b.n16,0) as n16,
	   isnull(b.n17,0) as n17,isnull(b.n18,0) as n18,isnull(b.n19,0) as n19,isnull(b.n20,0) as n20,
	   isnull(b.n21,0) as n21,isnull(b.n22,0) as n22,isnull(b.n23,0) as n23,isnull(b.n24,0) as n24,isnull(b.n25,0) as n25,
	   isnull(b.n26,0) as n26,isnull(b.n27,0) as n27,isnull(b.n28,0) as n28,isnull(b.n29,0) as n29,
	   isnull(b.n30,0) as n30,isnull(b.n31,0) as n31
from ktu_tenan a
inner join (select a.kode_lokasi,b.kode_tenan,sum(b.nilai) as nilai,
			      sum(case when datepart(day, a.tanggal)=1 then b.nilai else 0 end) as n1,
				  sum(case when datepart(day, a.tanggal)=2 then b.nilai else 0 end) as n2,
				  sum(case when datepart(day, a.tanggal)=3 then b.nilai else 0 end) as n3,
				  sum(case when datepart(day, a.tanggal)=4 then b.nilai else 0 end) as n4,
				  sum(case when datepart(day, a.tanggal)=5 then b.nilai else 0 end) as n5,
				  sum(case when datepart(day, a.tanggal)=6 then b.nilai else 0 end) as n6,
				  sum(case when datepart(day, a.tanggal)=7 then b.nilai else 0 end) as n7,
				  sum(case when datepart(day, a.tanggal)=8 then b.nilai else 0 end) as n8,
				  sum(case when datepart(day, a.tanggal)=9 then b.nilai else 0 end) as n9,
				  sum(case when datepart(day, a.tanggal)=10 then b.nilai else 0 end) as n10,
				  sum(case when datepart(day, a.tanggal)=11 then b.nilai else 0 end) as n11,
				  sum(case when datepart(day, a.tanggal)=12 then b.nilai else 0 end) as n12,
				  sum(case when datepart(day, a.tanggal)=13 then b.nilai else 0 end) as n13,
				  sum(case when datepart(day, a.tanggal)=14 then b.nilai else 0 end) as n14,
				  sum(case when datepart(day, a.tanggal)=15 then b.nilai else 0 end) as n15,
				  sum(case when datepart(day, a.tanggal)=16 then b.nilai else 0 end) as n16,
				  sum(case when datepart(day, a.tanggal)=17 then b.nilai else 0 end) as n17,
				  sum(case when datepart(day, a.tanggal)=18 then b.nilai else 0 end) as n18,
				  sum(case when datepart(day, a.tanggal)=19 then b.nilai else 0 end) as n19,
				  sum(case when datepart(day, a.tanggal)=20 then b.nilai else 0 end) as n20,
				  sum(case when datepart(day, a.tanggal)=21 then b.nilai else 0 end) as n21,
				  sum(case when datepart(day, a.tanggal)=22 then b.nilai else 0 end) as n22,
				  sum(case when datepart(day, a.tanggal)=23 then b.nilai else 0 end) as n23,
				  sum(case when datepart(day, a.tanggal)=24 then b.nilai else 0 end) as n24,
				  sum(case when datepart(day, a.tanggal)=25 then b.nilai else 0 end) as n25,
				  sum(case when datepart(day, a.tanggal)=26 then b.nilai else 0 end) as n26,
				  sum(case when datepart(day, a.tanggal)=27 then b.nilai else 0 end) as n27,
				  sum(case when datepart(day, a.tanggal)=28 then b.nilai else 0 end) as n28,
				  sum(case when datepart(day, a.tanggal)=29 then b.nilai else 0 end) as n29,
				  sum(case when datepart(day, a.tanggal)=30 then b.nilai else 0 end) as n30,
				  sum(case when datepart(day, a.tanggal)=31 then b.nilai else 0 end) as n31
		   from kantin_load a
		   inner join kantin_nota b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi
		   where a.periode='$periode' and a.kode_lokasi='$kode_lokasi' and a.kode_kantin='$row->kode_kantin'
		   group by a.kode_lokasi,b.kode_tenan
		   )b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_tenan
";
		
		$rs2 = $dbLib->execute($sql);
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0;  $nilai=0; $i=1;
		$n11=0; $n12=0; $n13=0; $n14=0; $n15=0; $n16=0; $n17=0; $n18=0; $n19=0; $n20=0; 
		$n21=0; $n22=0; $n23=0; $n24=0; $n25=0; $n26=0; $n27=0; $n28=0; $n29=0; $n30=0; $n31=0; 
		while ($row2 = $rs2->FetchNextObject($toupper=false))
		{
			$nilai+=$row2->nilai;
			$n1+=$row2->n1;
			$n2+=$row2->n2;
			$n3+=$row2->n3;
			$n4+=$row2->n4;
			$n5+=$row2->n5;
			$n6+=$row2->n6;
			$n7+=$row2->n7;
			$n8+=$row2->n8;
			$n9+=$row2->n9;
			$n10+=$row2->n10;
			$n11+=$row2->n11;
			$n12+=$row2->n12;
			$n13+=$row2->n13;
			$n14+=$row2->n14;
			$n15+=$row2->n15;
			$n16+=$row2->n16;
			$n17+=$row2->n17;
			$n18+=$row2->n18;
			$n19+=$row2->n19;
			$n20+=$row2->n20;
			$n21+=$row2->n21;
			$n22+=$row2->n22;
			$n23+=$row2->n23;
			$n24+=$row2->n24;
			$n25+=$row2->n25;
			$n26+=$row2->n26;
			$n27+=$row2->n27;
			$n28+=$row2->n28;
			$n29+=$row2->n29;
			$n30+=$row2->n30;
			$n31+=$row2->n31;
			
			$tnilai+=$row2->nilai;
			$tn1+=$row2->n1;
			$tn2+=$row2->n2;
			$tn3+=$row2->n3;
			$tn4+=$row2->n4;
			$tn5+=$row2->n5;
			$tn6+=$row2->n6;
			$tn7+=$row2->n7;
			$tn8+=$row2->n8;
			$tn9+=$row2->n9;
			$tn10+=$row2->n10;
			$tn11+=$row2->n11;
			$tn12+=$row2->n12;
			$tn13+=$row2->n13;
			$tn14+=$row2->n14;
			$tn15+=$row2->n15;
			$tn16+=$row2->n16;
			$tn17+=$row2->n17;
			$tn18+=$row2->n18;
			$tn19+=$row2->n19;
			$tn20+=$row2->n20;
			$tn21+=$row2->n21;
			$tn22+=$row2->n22;
			$tn23+=$row2->n23;
			$tn24+=$row2->n24;
			$tn25+=$row2->n25;
			$tn26+=$row2->n26;
			$tn27+=$row2->n27;
			$tn28+=$row2->n28;
			$tn29+=$row2->n29;
			$tn30+=$row2->n30;
			$tn31+=$row2->n31;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row2->nama</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n6,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n8,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n9,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n13,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n14,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n15,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n16,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n17,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n18,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n19,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n20,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n21,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n22,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n23,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n24,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n25,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n26,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n27,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n28,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n29,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n30,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->n31,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row2->nilai,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='2'>SUB TOTAL</td>
	 <td class='header_laporan' align='right'>".number_format($n1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n2,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n4,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n5,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n6,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n7,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n8,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n9,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n10,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n11,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($n12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n13,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n14,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n15,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n16,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n17,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n18,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n19,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n20,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n21,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n22,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n23,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n24,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n25,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n26,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n27,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n28,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n29,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n30,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n31,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($nilai,0,",",".")."</td>
     </tr>";
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='2'>TOTAL</td>
	 <td class='header_laporan' align='right'>".number_format($tn1,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn2,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn3,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn4,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn5,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn6,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn7,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn8,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn9,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn10,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn11,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tn12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn13,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn14,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn15,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn16,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn17,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn18,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn19,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn20,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn21,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn22,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn23,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn24,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn25,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn26,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn27,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn28,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn29,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn30,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn31,0,",",".")."</td>
	 <td class='header_laporan' align='right'>".number_format($tnilai,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
