<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sapyakes_rptUtilitas extends server_report_basic
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
		$sql="select sum(a.nilai) as premi,
		
				sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' then isnull(b.nilai,0) else 0 end)  as n1,
				sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' then isnull(b.nilai,0) else 0 end)  as n2,
				
sum(case when substring(a.periode,5,2)='01' then a.nilai else 0 end)  as n3,
sum(case when substring(a.periode,5,2)='02' then a.nilai else 0 end)  as n4,
sum(case when substring(a.periode,5,2)='03' then a.nilai else 0 end)  as n5,
sum(case when substring(a.periode,5,2)='04' then a.nilai else 0 end)  as n6,
sum(case when substring(a.periode,5,2)='05' then a.nilai else 0 end)  as n7,
sum(case when substring(a.periode,5,2)='06' then a.nilai else 0 end)  as n8,
sum(case when substring(a.periode,5,2)='07' then a.nilai else 0 end)  as n9,
sum(case when substring(a.periode,5,2)='08' then a.nilai else 0 end)  as n10,
sum(case when substring(a.periode,5,2)='09' then a.nilai else 0 end)  as n11,
sum(case when substring(a.periode,5,2)='10' then a.nilai else 0 end)  as n12,
sum(case when substring(a.periode,5,2)='11' then a.nilai else 0 end)  as n13,
sum(case when substring(a.periode,5,2)='12' then a.nilai else 0 end)  as n14,

sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='01' then isnull(b.nilai,0) else 0 end)  as n15,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='01' then isnull(b.nilai,0) else 0 end)  as n16,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='02' then isnull(b.nilai,0) else 0 end)  as n17,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='02' then isnull(b.nilai,0) else 0 end)  as n18,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='03' then isnull(b.nilai,0) else 0 end)  as n19,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='03' then isnull(b.nilai,0) else 0 end)  as n20,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='04' then isnull(b.nilai,0) else 0 end)  as n21,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='04' then isnull(b.nilai,0) else 0 end)  as n22,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='05' then isnull(b.nilai,0) else 0 end)  as n23,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='05' then isnull(b.nilai,0) else 0 end)  as n24,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='06' then isnull(b.nilai,0) else 0 end)  as n25,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='06' then isnull(b.nilai,0) else 0 end)  as n26,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='07' then isnull(b.nilai,0) else 0 end)  as n27,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='07' then isnull(b.nilai,0) else 0 end)  as n28,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='08' then isnull(b.nilai,0) else 0 end)  as n29,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='08' then isnull(b.nilai,0) else 0 end)  as n30,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='09' then isnull(b.nilai,0) else 0 end)  as n31,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='09' then isnull(b.nilai,0) else 0 end)  as n32,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='10' then isnull(b.nilai,0) else 0 end)  as n33,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='10' then isnull(b.nilai,0) else 0 end)  as n34,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='11' then isnull(b.nilai,0) else 0 end)  as n35,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='11' then isnull(b.nilai,0) else 0 end)  as n36,
sum(case when b.jenis='PENSIUN' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='12' then isnull(b.nilai,0) else 0 end)  as n37,
sum(case when b.jenis<>'pensiun' and b.jenis_tpkk='TPKK' and substring(b.periode,5,2)='12' then isnull(b.nilai,0) else 0 end)  as n38
		from yk_bpjs_iuran a 
		left join yk_bpjs_kapitasi b on a.kode_lokasi=b.kode_lokasi and a.periode=b.periode and a.jenis=b.jenis and a.jenis_tpkk=b.jenis_tpkk 

		$this->filter ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan bpjs - utilisasi total",$this->lokasi,"Tahun s/d ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
   <tr bgcolor='#CCCCCC'>
   <td  align='center' class='header_laporan'>No</td>
	 <td width='80' align='center' class='header_laporan'>Keterangan</td>
	 <td  align='center' class='header_laporan'>2018</td>
	 <td width='80' align='center' class='header_laporan'>Januari</td>
	 <td width='80' align='center' class='header_laporan'>Februari</td>
	 <td width='80' align='center' class='header_laporan'>Maret</td>
	 <td width='80' align='center' class='header_laporan'>April</td>
	 <td width='80' align='center' class='header_laporan'>Mei</td>
	 <td width='80' align='center' class='header_laporan'>Juni</td>
	 <td width='80' align='center' class='header_laporan'>Juli</td>
	 <td width='80' align='center' class='header_laporan'>Agustus</td>
	 <td width='80' align='center' class='header_laporan'>September</td>
	 <td width='80' align='center' class='header_laporan'>Oktober</td>
	 <td width='80' align='center' class='header_laporan'>November</td>
	 <td width='80' align='center' class='header_laporan'>Desember</td>

     </tr>  ";
		$t_n1=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$t_n1=$row->n1+$row->n2;
			$t_n2=$row->n15+$row->n16;
			$t_n3=$row->n17+$row->n18;
			$t_n4=$row->n19+$row->n20;
			$t_n5=$row->n21+$row->n22;
			$t_n6=$row->n23+$row->n24;
			$t_n7=$row->n25+$row->n26;
			$t_n8=$row->n27+$row->n28;
			$t_n9=$row->n29+$row->n30;
			$t_n10=$row->n31+$row->n32;
			$t_n11=$row->n33+$row->n34;
			$t_n12=$row->n35+$row->n36;
			$t_n13=$row->n37+$row->n38;
			$premi1=$row->premi;
			$n3=$row->n3;
			$n4=$row->n4;
			$n5=$row->n5;
			$n6=$row->n6;
			$n7=$row->n7;
			$n8=$row->n8;
			$n9=$row->n9;
			$n10=$row->n10;
			$n11=$row->n11;
			$n12=$row->n12;
			$n13=$row->n13;
			$n14=$row->n14;
		echo "<tr >
		<td align='center'>1</td>
		<td width='150' class='isi_laporan' align='left'>Iuran BPJS</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->premi,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n6,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n7,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n8,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n12,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n13,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row->n14,0,",",".")."</td>

     </tr>";
	 
	 
	 
	

		$sql3="select 
		sum(case when a.kode_lokasi=a.kode_lokasi then a.nilai else 0 end) as e0,
		 sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='01' then a.nilai else 0 end) as e1,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='02' then a.nilai else 0 end) as e2,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='03' then a.nilai else 0 end) as e3,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='04' then a.nilai else 0 end) as e4,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='05' then a.nilai else 0 end) as e5,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='06' then a.nilai else 0 end) as e6,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='07' then a.nilai else 0 end) as e7,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='08' then a.nilai else 0 end) as e8,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='09' then a.nilai else 0 end) as e9,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='10' then a.nilai else 0 end) as e10,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='11' then a.nilai else 0 end) as e11,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='12' then a.nilai else 0 end) as e12
			   from yk_bpjs_bpcc a
			   $this->filter  ";

			 $rs3 = $dbLib->execute($sql3);
		   $et_c1=0;$to_et=0;$ct_c1=0;
		   while ($row3 = $rs3->FetchNextObject($toupper=false))
		   {

	
		   echo "<tr >
		<td align='center'>2</td>
		<td width='150' class='isi_laporan' align='left'>BPCC</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e0,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e1,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e2,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e3,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e4,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e5,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e6,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e7,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e8,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e9,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e10,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e11,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($row3->e12,0,",",".")."</td>
 
		</tr>";
		   
		echo "<tr >
    
		<td align='center'>3</td>
		<td width='150' class='header_laporan' align='left'>Utilisasi BPJS :</td>
		<td width='150' class='isi_laporan' align='right' colspan='14'>&nbsp;</td>

	 </tr>";
	 
	 echo "<tr >
	 <td class='isi_laporan' align='right' >&nbsp;</td>
	 <td width='150' class='isi_laporan' align='left'>a. Kapitasi</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n1,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n2,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n3,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n4,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n5,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n6,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n7,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n8,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n9,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n10,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n11,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n12,0,",",".")."</td>
	 <td width='150' class='isi_laporan' align='right'>".number_format($t_n13,0,",",".")."</td>

	</tr>";

	   $sql1="select 
	   sum(case when a.kode_lokasi=a.kode_lokasi then a.claim else 0 end) as c0,
		sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='01' then a.claim else 0 end) as c1,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='02' then a.claim else 0 end) as c2,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='03' then a.claim else 0 end) as c3,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='04' then a.claim else 0 end) as c4,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='05' then a.claim else 0 end) as c5,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='06' then a.claim else 0 end) as c6,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='07' then a.claim else 0 end) as c7,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='08' then a.claim else 0 end) as c8,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='09' then a.claim else 0 end) as c9,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='10' then a.claim else 0 end) as c10,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='11' then a.claim else 0 end) as c11,
	   sum(case when a.kode_lokasi=a.kode_lokasi and substring(a.periode,5,2)='12' then a.claim else 0 end) as c12
			  from yk_bpjs_cob a
			  $this->filter  ";
			$rs1 = $dbLib->execute($sql1);
		  $ct_c1=0;$to_ut=0;
		  while ($row1 = $rs1->FetchNextObject($toupper=false))
		  {
			$ct_c1=$t_n1+$row1->c0;
			$ct_c2=$t_n2+$row1->c1;
			$ct_c3=$t_n3+$row1->c2;
			$ct_c4=$t_n4+$row1->c3;
			$ct_c5=$t_n5+$row1->c4;
			$ct_c6=$t_n6+$row1->c5;
			$ct_c7=$t_n7+$row1->c6;
			$ct_c8=$t_n8+$row1->c7;
			$ct_c9=$t_n9+$row1->c8;
			$ct_c10=$t_n10+$row1->c9;
			$ct_c11=$t_n11+$row1->c10;
			$ct_c12=$t_n12+$row1->c11;
			$ct_c13=$t_n13+$row1->c12;
			
			$to_ut=$ct_c1/$premi1*100;
			$to_ut1=$ct_c2/$n3*100;
			$to_ut2=$ct_c3/$n4*100;
			$to_ut3=$ct_c4/$n5*100;
			$to_ut4=$ct_c5/$n6*100;
			$to_ut5=$ct_c6/$n7*100;
			$to_ut6=$ct_c7/$n8*100;
			$to_ut7=$ct_c8/$n9*100;
			$to_ut8=$ct_c9/$n10*100;
			$to_ut9=$ct_c10/$n11*100;
			$to_ut10=$ct_c11/$n12*100;
			$to_ut11=$ct_c12/$n13*100;
			$to_ut12=$ct_c13/$n14*100;

			
			$to_et=$ct_c1/$row3->e0*100;
			$to_et1=$ct_c2/$row3->e1*100;
			$to_et2=$ct_c3/$row3->e2*100;
			$to_et3=$ct_c4/$row3->e3*100;
			$to_et4=$ct_c5/$row3->e4*100;
			$to_et5=$ct_c6/$row3->e5*100;
			$to_et6=$ct_c7/$row3->e6*100;
			$to_et7=$ct_c8/$row3->e7*100;
			$to_et8=$ct_c9/$row3->e8*100;
			$to_et9=$ct_c10/$row3->e9*100;
			$to_et10=$ct_c11/$row3->e10*100;
			$to_et11=$ct_c12/$row3->e11*100;
			$to_et12=$ct_c13/$row3->e12*100;

			$to_bt=$ct_c1/($row3->e0+$row->premi)*100;
			$to_bt1=$ct_c2/($row3->e1+$row->n3)*100;
			$to_bt2=$ct_c3/($row3->e2+$row->n4)*100;
			$to_bt3=$ct_c4/($row3->e3+$row->n5)*100;
			$to_bt4=$ct_c5/($row3->e4+$row->n6)*100;
			$to_bt5=$ct_c6/($row3->e5+$row->n7)*100;
			$to_bt6=$ct_c7/($row3->e6+$row->n8)*100;
			$to_bt7=$ct_c8/($row3->e7+$row->n9)*100;
			$to_bt8=$ct_c9/($row3->e8+$row->n10)*100;
			$to_bt9=$ct_c10/($row3->e9+$row->n11)*100;
			$to_bt10=$ct_c11/($row3->e10+$row->n12)*100;
			$to_bt11=$ct_c12/($row3->e11+$row->n13)*100;
			$to_bt12=$ct_c13/($row3->e12+$row->n14)*100;
  
		   
		  echo "<tr >
		  <td class='isi_laporan' align='right' >&nbsp;</td>
	   <td width='150' class='isi_laporan' align='left'>b. Claim BPJS</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c0,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c1,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c2,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c3,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c4,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c5,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c6,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c7,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c8,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c9,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c10,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c11,0,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($row1->c12,0,",",".")."</td>

	   </tr>";
			  $i=$i+1;
		  }
		  echo "<tr>
		  <td class='isi_laporan' align='right' >&nbsp;</td>
	   <td width='150' class='isi_laporan' align='left'>c. Total Utilisasi</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c1,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c2,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c3,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c4,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c5,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c6,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c7,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c8,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c9,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c10,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c11,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c12,0,",",".")."</td>
		<td width='150' class='isi_laporan' align='right'>".number_format($ct_c13,0,",",".")."</td>
  
	   </tr>";

	   echo "<tr>
	  
	   <td  align='center' >4</td>
	   <td width='150' class='header_laporan' align='left' >Utilisasi/Iuran</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut1,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut2,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut3,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut4,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut5,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut6,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut7,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut8,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut9,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut10,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut11,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_ut12,2,",",".")."</td>
  
	   </tr>";

	   echo "<tr>
	  
	   <td  align='center' >5</td>
	   <td width='150' class='header_laporan' align='left' >Utilisasi/BPCC</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et1,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et2,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et3,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et4,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et5,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et6,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et7,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et8,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et9,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et10,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et11,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_et12,2,",",".")."</td>
  
	   </tr>";

	   echo "<tr>
	  
	   <td  align='center' >6</td>
	   <td width='250' class='header_laporan' align='left' >Utilisasi/Iuran + BPCC</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt1,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt2,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt3,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt4,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt5,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt6,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt7,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt8,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt9,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt10,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt11,2,",",".")."</td>
	   <td width='150' class='isi_laporan' align='right'>".number_format($to_bt12,2,",",".")."</td>
  
	   </tr>";
		}
		}
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
