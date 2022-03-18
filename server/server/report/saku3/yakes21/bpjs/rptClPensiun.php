<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes21_bpjs_rptClPensiun extends server_report_basic
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
		sum(case when a.kode_lokasi='01' then a.total else 0 end) as n1,
		sum(case when a.kode_lokasi='02' then a.total else 0 end) as n2,
		sum(case when a.kode_lokasi='03' then a.total else 0 end) as n3,
		sum(case when a.kode_lokasi='04' then a.total else 0 end) as n4,
		sum(case when a.kode_lokasi='05' then a.total else 0 end) as n5,
		sum(case when a.kode_lokasi='06' then a.total else 0 end) as n6,
		sum(case when a.kode_lokasi='07' then a.total else 0 end) as n7
		from yk_bpjs_cob a
		$this->filter and a.jenis='pensiun'
		group by a.kode_biaya ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan bpjs claim pensiun",$this->lokasi,"PERIODE s/d ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
	 <td width='80' rowspan='2' align='center' class='header_laporan'>Layanan</td>
	 <td width='80' colspan='7' align='center' class='header_laporan'>Area</td>
	 <td rowspan='2' align='center' class='header_laporan'>Total</td>
   </tr>
   <tr bgcolor='#CCCCCC'>
   <td width='90'  align='center' class='header_laporan'>I</td>
   <td width='90'  align='center' class='header_laporan'>II</td>
   <td width='90'  align='center' class='header_laporan'>III</td>
   <td width='90'  align='center' class='header_laporan'>IV</td>
   <td width='90'  align='center' class='header_laporan'>V</td>
   <td width='90'  align='center' class='header_laporan'>VI</td>
   <td width='90'  align='center' class='header_laporan'>VII</td>
   <tr>
   <td  align='center' class='header_laporan'>Tagihan Awal</td>
   <td  colspan='8' align='center' class='header_laporan'>&nbsp;</td>
	</tr>
     </tr>  ";
		$total=0;$jumalah=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7;
			$t_n1+=$row->n1;
			$t_n2+=$row->n2;
			$t_n3+=$row->n3;
			$t_n4+=$row->n4;
			$t_n5+=$row->n5;
			$t_n6+=$row->n6;
			$t_n7+=$row->n7;
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
	  <td class='isi_laporan' align='right'>".number_format($jumlah,0,",",".")."</td>

	 </tr>";

	 echo" <tr>
	 <td  align='center' class='header_laporan'>Claim BPJS</td>
	 <td  colspan='8' align='center' class='header_laporan'>&nbsp;</td>
	  </tr>
	   </tr>  ";

	   $sql1="select a.kode_biaya,
	   case when a.kode_biaya='1' then upper('RJTP')
	   when a.kode_biaya='2' then upper('RJTL')
	   when a.kode_biaya='3' then upper('RI')	
		else upper('Restitusi') end as nama_biayac,
		sum(case when a.kode_lokasi='01' then a.claim else 0 end) as c1,
		sum(case when a.kode_lokasi='02' then a.claim else 0 end) as c2,
		sum(case when a.kode_lokasi='03' then a.claim else 0 end) as c3,
		sum(case when a.kode_lokasi='04' then a.claim else 0 end) as c4,
		sum(case when a.kode_lokasi='05' then a.claim else 0 end) as c5,
		sum(case when a.kode_lokasi='06' then a.claim else 0 end) as c6,
		sum(case when a.kode_lokasi='07' then a.claim else 0 end) as c7
		from yk_bpjs_cob a
		$this->filter and a.jenis='pensiun'
		group by a.kode_biaya ";
			
			$rs1 = $dbLib->execute($sql1);
		  $total1=0;$sjumlah=0;
		  while ($row1 = $rs1->FetchNextObject($toupper=false))
		  {
			  $total2=$row1->c1+$row1->c2+$row1->c3+$row1->c4+$row1->c5+$row1->c6+$row1->c7;
			  $ct_c1+=$row1->c1;
			  $ct_c2+=$row1->c2;
			  $ct_c3+=$row1->c3;
			  $ct_c4+=$row1->c4;
			  $ct_c5+=$row1->c5;
			  $ct_c6+=$row1->c6;
			  $ct_c7+=$row1->c7;
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
		<td class='isi_laporan' align='right'>".number_format($cjumlah,0,",",".")."</td>
  
	   </tr>";
	 
	   echo" <tr>
	 <td  align='center' class='header_laporan'>Dibayar YAKES</td>
	 <td  colspan='8' align='center' class='header_laporan'>&nbsp;</td>
	  </tr>
	   </tr>  ";

	   $sql1="select a.kode_biaya,
	   case when a.kode_biaya='1' then upper('RJTP')
	   when a.kode_biaya='2' then upper('RJTL')
	   when a.kode_biaya='3' then upper('RI')	
  else upper('Restitusi') end as nama_biayas,
		sum(case when a.kode_lokasi='01' then a.selisih else 0 end) as s1,
		sum(case when a.kode_lokasi='02' then a.selisih else 0 end) as s2,
		sum(case when a.kode_lokasi='03' then a.selisih else 0 end) as s3,
		sum(case when a.kode_lokasi='04' then a.selisih else 0 end) as s4,
		sum(case when a.kode_lokasi='05' then a.selisih else 0 end) as s5,
		sum(case when a.kode_lokasi='06' then a.selisih else 0 end) as s6,
		sum(case when a.kode_lokasi='07' then a.selisih else 0 end) as s7
		from yk_bpjs_cob a
		$this->filter and a.jenis='pensiun'
		group by a.kode_biaya ";
			
			$rs1 = $dbLib->execute($sql1);
		  $total1=0;$sjumlah=0;
		  while ($row1 = $rs1->FetchNextObject($toupper=false))
		  {
			  $total1=$row1->s1+$row1->s2+$row1->s3+$row1->s4+$row1->s5+$row1->s6+$row1->s7;
			  $st_s1+=$row1->s1;
			  $st_s2+=$row1->s2;
			  $st_s3+=$row1->s3;
			  $st_s4+=$row1->s4;
			  $st_s5+=$row1->s5;
			  $st_s6+=$row1->s6;
			  $st_s7+=$row1->s7;
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
		<td class='isi_laporan' align='right'>".number_format($sjumlah,0,",",".")."</td>
  
	   </tr>";

		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
