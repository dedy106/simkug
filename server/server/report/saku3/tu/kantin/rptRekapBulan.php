<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_tu_kantin_rptRekapBulan extends server_report_basic
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
		$tahun=$tmp[1];
		
		$sql="select a.kode_kantin,a.kode_lokasi,a.nama from ktu_kantin a where a.kode_lokasi='$kode_lokasi' order by a.kode_kantin";
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("rekap pendapatan tenan",$this->lokasi,"Tahun $tahun");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='150'  align='center' class='header_laporan'>Kantin</td>
	  <td width='90'  align='center' class='header_laporan'>Januari</td>
	 <td width='90'  align='center' class='header_laporan'>Februari</td>
     <td width='90'  align='center' class='header_laporan'>Maret</td>
	 <td width='90'  align='center' class='header_laporan'>April</td>
	 <td width='90'  align='center' class='header_laporan'>Mei</td>
	 <td width='90'  align='center' class='header_laporan'>Juni</td>
	 <td width='90'  align='center' class='header_laporan'>Juli</td>
	 <td width='90'  align='center' class='header_laporan'>Agustus</td>
	 <td width='90'  align='center' class='header_laporan'>September</td>
	 <td width='90'  align='center' class='header_laporan'>Oktober</td>
	 <td width='90'  align='center' class='header_laporan'>November</td>
	 <td width='90'  align='center' class='header_laporan'>Desember</td>
	 <td width='90'  align='center' class='header_laporan'>Total</td>
	  </tr>  ";
	    $tn1=0; $tn2=0; $tn3=0; $tn4=0; $tn5=0; $tn6=0; $tn7=0; $tn8=0; $tn9=0; $tn10=0; $tn11=0; $tn12=0; $tnilai=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		echo "<tr >
     <td colspan='14' class='header_laporan'>$row->nama</td>
     </tr>";
		$sql="select a.kode_tenan,a.kode_lokasi,isnull(b.nilai,0) as nilai,a.nama,
	   isnull(b.n1,0) as n1,isnull(b.n2,0) as n2,isnull(b.n3,0) as n3,isnull(b.n4,0) as n4,
	   isnull(b.n5,0) as n5,isnull(b.n6,0) as n6,isnull(b.n7,0) as n7,isnull(b.n8,0) as n8,
	   isnull(b.n9,0) as n9,isnull(b.n10,0) as n10,isnull(b.n11,0) as n11,isnull(b.n12,0) as n12
from ktu_tenan a
inner join (select a.kode_lokasi,b.kode_tenan,sum(b.nilai) as nilai,
			      sum(case when substring(a.periode,5,2)='01' then b.nilai else 0 end) as n1,
				  sum(case when substring(a.periode,5,2)='02' then b.nilai else 0 end) as n2,
				  sum(case when substring(a.periode,5,2)='03' then b.nilai else 0 end) as n3,
				  sum(case when substring(a.periode,5,2)='04' then b.nilai else 0 end) as n4,
				  sum(case when substring(a.periode,5,2)='05' then b.nilai else 0 end) as n5,
				  sum(case when substring(a.periode,5,2)='06' then b.nilai else 0 end) as n6,
				  sum(case when substring(a.periode,5,2)='07' then b.nilai else 0 end) as n7,
				  sum(case when substring(a.periode,5,2)='08' then b.nilai else 0 end) as n8,
				  sum(case when substring(a.periode,5,2)='09' then b.nilai else 0 end) as n9,
				  sum(case when substring(a.periode,5,2)='10' then b.nilai else 0 end) as n10,
				  sum(case when substring(a.periode,5,2)='11' then b.nilai else 0 end) as n11,
				  sum(case when substring(a.periode,5,2)='12' then b.nilai else 0 end) as n12
		   from kantin_load a
		   inner join kantin_nota b on a.no_load=b.no_load and a.kode_lokasi=b.kode_lokasi
		   where substring(a.periode,1,4)='$tahun' and a.kode_lokasi='$kode_lokasi' and a.kode_kantin='$row->kode_kantin'
		   group by a.kode_lokasi,b.kode_tenan
		   )b on a.kode_tenan=b.kode_tenan and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_tenan
";
		$rs2 = $dbLib->execute($sql);
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; $n12=0; $nilai=0;
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
	 <td class='header_laporan' align='right'>".number_format($tnilai,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
