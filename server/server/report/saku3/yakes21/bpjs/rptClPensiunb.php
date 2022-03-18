<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_bpjs_rptClPensiunb extends server_report_basic
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
		$sql="select a.kode_biaya,
		case when a.kode_biaya='1' then upper('RJTP')
			 when a.kode_biaya='2' then upper('RJTL')
			 when a.kode_biaya='3' then upper('RI')	
		else upper('Restitusi') end as nama_biaya,
		sum(case when substring(a.periode,5,2)='01' then a.total else 0 end) as n1,
		sum(case when substring(a.periode,5,2)='02' then a.total else 0 end) as n2,
		sum(case when substring(a.periode,5,2)='03' then a.total else 0 end) as n3,
		sum(case when substring(a.periode,5,2)='04' then a.total else 0 end) as n4,
		sum(case when substring(a.periode,5,2)='05' then a.total else 0 end) as n5,
		sum(case when substring(a.periode,5,2)='06' then a.total else 0 end) as n6,
		sum(case when substring(a.periode,5,2)='07' then a.total else 0 end) as n7,
		sum(case when substring(a.periode,5,2)='08' then a.total else 0 end) as n8,
		sum(case when substring(a.periode,5,2)='09' then a.total else 0 end) as n9,
		sum(case when substring(a.periode,5,2)='10' then a.total else 0 end) as n10,
		sum(case when substring(a.periode,5,2)='11' then a.total else 0 end) as n11,
		sum(case when substring(a.periode,5,2)='12' then a.total else 0 end) as n12
		from yk_bpjs_cob a
		$this->filter 	and a.jenis='pensiun'
		group by a.kode_biaya ";

		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan bpjs claim pensiun",$this->lokasi,"Tahun ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Layanan</td>
	 <td width='80' colspan='12' align='center' class='header_laporan'>Bulan</td>
	 <td rowspan='2' align='center' class='header_laporan'>Total</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
   <td width='90'  align='center' class='header_laporan'>1</td>
   <td width='90'  align='center' class='header_laporan'>2</td>
   <td width='90'  align='center' class='header_laporan'>3</td>
   <td width='90'  align='center' class='header_laporan'>4</td>
   <td width='90'  align='center' class='header_laporan'>5</td>
   <td width='90'  align='center' class='header_laporan'>6</td>
   <td width='90'  align='center' class='header_laporan'>7</td>
   <td width='90'  align='center' class='header_laporan'>8</td>
   <td width='90'  align='center' class='header_laporan'>9</td>
   <td width='90'  align='center' class='header_laporan'>10</td>
   <td width='90'  align='center' class='header_laporan'>11</td>
   <td width='90'  align='center' class='header_laporan'>12</td>
   <tr>
   <td  align='center' class='header_laporan'>Tagihan Awal</td>
   <td  colspan='13' align='center' class='header_laporan'>&nbsp;</td>
	</tr>
     </tr>  ";
		$total=0;$jumlah=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8+$row->n9+$row->n10+$row->n11+$row->n12;
			$t_n1+=$row->n1;
			$t_n2+=$row->n2;
			$t_n3+=$row->n3;
			$t_n4+=$row->n4;
			$t_n5+=$row->n5;
			$t_n6+=$row->n6;
			$t_n7+=$row->n7;
			$t_n8+=$row->n8;
			$t_n9+=$row->n9;
			$t_n10+=$row->n10;
			$t_n11+=$row->n11;
			$t_n12+=$row->n12;
			$jumlah+=$total;
			
			
		echo "<tr >
     <td class='isi_laporan' align='center'>$row->nama_biaya</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n6,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n8,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($total,0,",",".")."</td>

     </tr>";
			$i=$i+1;
		}
		echo "<tr bgcolor='#CCCCCC'>
    
	  <td class='header_laporan' align='center' >Total</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n1,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n2,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n3,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n4,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n5,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n6,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n7,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n8,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n9,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n10,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n11,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($t_n12,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>

	 </tr>";

	 echo" <tr>
	 <td  align='center' class='header_laporan'>Claim BPJS</td>
	 <td  colspan='13' align='center' class='header_laporan'>&nbsp;</td>
	  </tr>
	   </tr>  ";

	   $sql1="select a.kode_biaya,
	   case when a.kode_biaya='1' then upper('RJTP')
			when a.kode_biaya='2' then upper('RJTL')
			when a.kode_biaya='3' then upper('RI')	
	   else upper('Restitusi') end as nama_biayac,
	   sum(case when substring(a.periode,5,2)='01' then a.claim else 0 end) as c1,
	   sum(case when substring(a.periode,5,2)='02' then a.claim else 0 end) as c2,
	   sum(case when substring(a.periode,5,2)='03' then a.claim else 0 end) as c3,
	   sum(case when substring(a.periode,5,2)='04' then a.claim else 0 end) as c4,
	   sum(case when substring(a.periode,5,2)='05' then a.claim else 0 end) as c5,
	   sum(case when substring(a.periode,5,2)='06' then a.claim else 0 end) as c6,
	   sum(case when substring(a.periode,5,2)='07' then a.claim else 0 end) as c7,
	   sum(case when substring(a.periode,5,2)='08' then a.claim else 0 end) as c8,
	   sum(case when substring(a.periode,5,2)='09' then a.claim else 0 end) as c9,
	   sum(case when substring(a.periode,5,2)='10' then a.claim else 0 end) as c10,
	   sum(case when substring(a.periode,5,2)='11' then a.claim else 0 end) as c11,
	   sum(case when substring(a.periode,5,2)='12' then a.claim else 0 end) as c12
	   from yk_bpjs_cob a
	   $this->filter 	and a.jenis='pensiun'
	   group by a.kode_biaya ";
		   
			$rs1 = $dbLib->execute($sql1);
		  $total1=0;$sjumlah=0;
		  while ($row1 = $rs1->FetchNextObject($toupper=false))
		  {
			  $total2=$row1->c1+$row1->c2+$row1->c3+$row1->c4+$row1->c5+$row1->c6+$row1->c7+$row1->c8+$row1->c9+$row1->c10+$row1->c11+$row1->c12;
			  $ct_c1+=$row1->c1;
			  $ct_c2+=$row1->c2;
			  $ct_c3+=$row1->c3;
			  $ct_c4+=$row1->c4;
			  $ct_c5+=$row1->c5;
			  $ct_c6+=$row1->c6;
			  $ct_c7+=$row1->c7;
			  $ct_c8+=$row1->c8;
			  $ct_c9+=$row1->c9;
			  $ct_c10+=$row1->c10;
			  $ct_c11+=$row1->c11;
			  $ct_c12+=$row1->c12;
			  $cjumlah+=$total2;
			  
			  
		  echo "<tr >
	   <td class='isi_laporan' align='center'>$row1->nama_biayac</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c1,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c2,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c3,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c4,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c5,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c6,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c7,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c8,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c9,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c10,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c11,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->c12,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total2,0,",",".")."</td>
  
	   </tr>";
			  $i=$i+1;
		  }
		  echo "<tr bgcolor='#CCCCCC'>
	  
		<td class='header_laporan' align='center' >Total</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c1,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c2,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c3,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c4,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c5,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c6,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c7,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c8,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c9,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c10,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c11,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($ct_c12,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($cjumlah,0,",",".")."</td>
  
	   </tr>";

	   echo" <tr>
	 <td  align='center' class='header_laporan'>Dibayar YAKES</td>
	 <td  colspan='13' align='center' class='header_laporan'>&nbsp;</td>
	  </tr>
	   </tr>  ";
	 
	   $sql1="select a.kode_biaya,
	   case when a.kode_biaya='1' then upper('RJTP')
			when a.kode_biaya='2' then upper('RJTL')
			when a.kode_biaya='3' then upper('RI')	
	   else upper('Restitusi') end as nama_biayas,
	   sum(case when substring(a.periode,5,2)='01' then a.selisih else 0 end) as s1,
	   sum(case when substring(a.periode,5,2)='02' then a.selisih else 0 end) as s2,
	   sum(case when substring(a.periode,5,2)='03' then a.selisih else 0 end) as s3,
	   sum(case when substring(a.periode,5,2)='04' then a.selisih else 0 end) as s4,
	   sum(case when substring(a.periode,5,2)='05' then a.selisih else 0 end) as s5,
	   sum(case when substring(a.periode,5,2)='06' then a.selisih else 0 end) as s6,
	   sum(case when substring(a.periode,5,2)='07' then a.selisih else 0 end) as s7,
	   sum(case when substring(a.periode,5,2)='08' then a.selisih else 0 end) as s8,
	   sum(case when substring(a.periode,5,2)='09' then a.selisih else 0 end) as s9,
	   sum(case when substring(a.periode,5,2)='10' then a.selisih else 0 end) as s10,
	   sum(case when substring(a.periode,5,2)='11' then a.selisih else 0 end) as s11,
	   sum(case when substring(a.periode,5,2)='12' then a.selisih else 0 end) as s12
	   from yk_bpjs_cob a
		$this->filter 	and a.jenis='pensiun'
		group by a.kode_biaya ";
			
			$rs1 = $dbLib->execute($sql1);
		  $total1=0;$sjumlah=0;
		  while ($row1 = $rs1->FetchNextObject($toupper=false))
		  {
			  $total1=$row1->s1+$row1->s2+$row1->s3+$row1->s4+$row1->s5+$row1->s6+$row1->s7+$row1->s8+$row1->s9+$row1->s10+$row1->s11+$row1->s12;
			  $st_s1+=$row1->s1;
			  $st_s2+=$row1->s2;
			  $st_s3+=$row1->s3;
			  $st_s4+=$row1->s4;
			  $st_s5+=$row1->s5;
			  $st_s6+=$row1->s6;
			  $st_s7+=$row1->s7;
			  $st_s8+=$row1->s8;
			  $st_s9+=$row1->s9;
			  $st_s10+=$row1->s10;
			  $st_s11+=$row1->s11;
			  $st_s12+=$row1->s12;
			  $sjumlah+=$total1;
			  
			  
		  echo "<tr >
	   <td class='isi_laporan' align='center'>$row1->nama_biayas</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s1,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s2,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s3,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s4,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s5,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s6,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s7,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s8,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s9,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s10,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s11,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($row1->s12,0,",",".")."</td>
	   <td class='isi_laporan' align='right'>".number_format($total1,0,",",".")."</td>
  
	   </tr>";
			  $i=$i+1;
		  }
		  echo "<tr bgcolor='#CCCCCC'>
	  
		<td class='header_laporan' align='center' >Total</td>
		<td class='isi_laporan' align='right'>".number_format($st_s1,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s2,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s3,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s4,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s5,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s6,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s7,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s8,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s9,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s10,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s11,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($st_s12,0,",",".")."</td>
		<td class='isi_laporan' align='right'>".number_format($sjumlah,0,",",".")."</td>
  
	   </tr>";

		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
