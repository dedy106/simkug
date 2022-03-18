<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sla_rptPinjSummary extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$sql="select a.kode_cocd,a.periode,a.no_sla,a.subclass,a.detailcalss,a.classification,a.deskripsi,a.company,a.bank,a.mou,a.fasility,a.paid_curr,
		a.withdraw,a.tipe_rate,a.kode_rate,a.bunga,a.disc_factor,a.kode_curr,a.kurs,a.original_currency,a.principal_idr_gross,
		a.amortisasi_total,a.principal_idr_net,a.periode_bunga,a.jk_waktu,a.dari,a.sampai,a.tanggal,a.nik_user,a.tgl_input,a.no_gen,
		b.n1,b.n2,b.n3,b.n4,b.n5,b.n6,b.n7,b.n8,b.n9,b.n10,b.n11,b.n12,b.n13,b.n14,b.n15,b.n16,b.n17,b.n18,b.n19,b.n20,
		b.n21,b.n22,b.n23,b.n24,b.n25,b.n26,b.n27,b.n28,b.n29,b.n30,b.n31,b.n32,b.n33,b.n34,b.n35,b.n36
		from sla_master a
		left join sla_summary b on a.no_sla=b.no_sla ";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pinjaman",$this->lokasi,"");
	
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2500'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'  align='center' class='header_laporan'>No</td>
     <td width='80'  align='center' class='header_laporan'>No Bukti</td>
	 <td width='80'  align='center' class='header_laporan'>No MOU</td>
	 <td width='100'  align='center' class='header_laporan'>Sub Class</td>
	 <td width='100'  align='center' class='header_laporan'>Details	Classification</td>
	 <td width='100'  align='center' class='header_laporan'>Classification</td>
	 <td width='100'  align='center' class='header_laporan'>Description</td>
	 <td width='100'  align='center' class='header_laporan'>Company</td>
	 <td width='100'  align='center' class='header_laporan'>Bank (Institution)</td>
	 <td width='100'  align='center' class='header_laporan'>Facility</td>
	 <td width='100'  align='center' class='header_laporan'>Facility induk</td>
	 <td width='100'  align='center' class='header_laporan'>Paid in current year (2019)</td>
	 <td width='100'  align='center' class='header_laporan'>Withdrawal in current year (2019)</td>
	 <td width='100'  align='center' class='header_laporan'>Type of Interest </td>
	 <td width='100'  align='center' class='header_laporan'>Rate of interest</td>
	 <td width='100'  align='center' class='header_laporan'>Interest Rate (contractual)</td>
	 <td width='100'  align='center' class='header_laporan'>Discount Factor</td>
	 <td width='100'  align='center' class='header_laporan'>Curr</td>
	 <td width='100'  align='center' class='header_laporan'>Exch. Rate</td>
	 <td width='100'  align='center' class='header_laporan'>Original Currency</td>
	 <td width='100'  align='center' class='header_laporan'>Principal (Eq. IDR) Gross</td>
	 <td width='100'  align='center' class='header_laporan'>Unamortized Cost</td>
	 <td width='100'  align='center' class='header_laporan'>Principal (Eq. IDR) Net</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Gross YAJT</td>
	 <td width='100'  align='center' class='header_laporan'>Unamortized cost YAJT</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Net YAJT</td>
	 <td width='100'  align='center' class='header_laporan'>Interest YAJT</td>
	 <td width='100'  align='center' class='header_laporan'>Total Cashout YAJT</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Gross 2021</td>
	 <td width='100'  align='center' class='header_laporan'>Unamortized cost 2021</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Net 2021</td>
	 <td width='100'  align='center' class='header_laporan'>Interest 2021</td>
	 <td width='100'  align='center' class='header_laporan'>Total Cashout 2021</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Gross 2022</td>
	 <td width='100'  align='center' class='header_laporan'>Unamortized cost 2022</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Net 2022</td>
	 <td width='100'  align='center' class='header_laporan'>Interest 2022</td>
	 <td width='100'  align='center' class='header_laporan'>Total Cashout 2022</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Gross 2023</td>
	 <td width='100'  align='center' class='header_laporan'>Unamortized cost 2023</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Net 2023</td>
	 <td width='100'  align='center' class='header_laporan'>Interest 2023</td>
	 <td width='100'  align='center' class='header_laporan'>Total Cashout 2023</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Gross 2024</td>
	 <td width='100'  align='center' class='header_laporan'>Unamortized cost 2024</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Net 2024</td>
	 <td width='100'  align='center' class='header_laporan'>Interest 2024</td>
	 <td width='100'  align='center' class='header_laporan'>Total Cashout 2024</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Gross Thereafter</td>
	 <td width='100'  align='center' class='header_laporan'>Unamortized cost Thereafter</td>
	 <td width='100'  align='center' class='header_laporan'>Principal - Net Thereafter</td>
	 <td width='100'  align='center' class='header_laporan'>Interest Thereafter</td>
	 <td width='100'  align='center' class='header_laporan'>Total Cashout Thereafter</td>
	 <td width='100'  align='center' class='header_laporan'> Sum of Interest</td>
	 <td width='100'  align='center' class='header_laporan'> Sum of Total Cashout</td>
	 <td width='100'  align='center' class='header_laporan'>Fair Value (Gross)</td>
	 <td width='100'  align='center' class='header_laporan'>Fair Value (Net)</td>
	  </tr>  ";
		$tn1=0;$tn2=0;$tn3=0;$tn4=0;$vtn1=0;$vtn2=0;$vtn3=0;$vtn4=0;
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$n6=0;$n7=0;$n8=0;$n9=0;$n10=0;
		$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;$n16=0;$n17=0;$n18=0;$n19=0;$n20=0;
		$n21=0;$n22=0;$n23=0;$n24=0;$n25=0;$n26=0;$n27=0;$n28=0;$n29=0;$n30=0;
		$n31=0;$n32=0;$n33=0;$n34=0;$n35=0;$n36=0;
		$fasility=0;$paid_curr=0;$withdraw=0;
		$original_currency=0;$principal_idr_gross=0;$amortisasi_total=0;$principal_idr_net=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$tn1+=$row->n4+$row->n10+$row->n16+$row->n22+$row->n28+$row->n34;
			$tn2+=$row->n5+$row->n11+$row->n17+$row->n23+$row->n29+$row->n34;
			$tn3+=$row->n6+$row->n12+$row->n18+$row->n24+$row->n30+$row->n35;
			$tn4+=$row->n6+$row->n12+$row->n18+$row->n24+$row->n30+$row->n35;

			$vtn1+=$tn1;$vtn2+=$tn2;$vtn3+=$tn3;$vtn4+=$tn4;

			$n1+=$row->n1;$n2+=$row->n2;$n3+=$row->n3;$n4+=$row->n4;$n5+=$row->n5;
			$n6+=$row->n6;$n7+=$row->n7;$n8+=$row->n8;$n9+=$row->n9;$n10+=$row->n10;
			$n11+=$row->n11;$n12+=$row->n12;$n13+=$row->n13;$n14+=$row->n14;$n15+=$row->n15;
			$n16+=$row->n16;$n17+=$row->n17;$n8+=$row->n18;$n19+=$row->n19;$n20+=$row->n20;
			$n21+=$row->n21;$n22+=$row->n22;$n23+=$row->n23;$n24+=$row->n24;$n25+=$row->n25;
			$n26+=$row->n26;$n27+=$row->n27;$n28+=$row->n28;$n29+=$row->n29;$n30+=$row->n30;
			$n31+=$row->n31;$n32+=$row->n32;$n33+=$row->n33;$n34+=$row->n34;$n35+=$row->n35;

			$fasility+=$row->fasility;$paid_curr+=$row->paid_curr;$withdraw+=$row->withdraw;
			$original_currency+=$row->original_currency;$principal_idr_gross+=$row->principal_idr_gross;
			$amortisasi_total+=$row->amortisasi_total;$principal_idr_net+=$row->principal_idr_net;

		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
	 <td  class='isi_laporan'>";
	echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenKartu('$row->no_sla');\">$row->no_sla</a></td>
	<td class='isi_laporan'>$row->mou</td> 
	<td class='isi_laporan'>$row->subclass</td>
	 <td class='isi_laporan'>$row->detailcalss</td>
	 <td class='isi_laporan'>$row->classification</td>
	 <td class='isi_laporan'>$row->deskripsi</td>
	 <td class='isi_laporan'>$row->company</td>
	 <td class='isi_laporan'>$row->bank</td>
	 <td class='isi_laporan' align='right'>".number_format($row->fasility,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->fasility,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->paid_curr,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->withdraw,0,",",".")."</td>
	 <td class='isi_laporan'>$row->tipe_rate</td>
	 <td class='isi_laporan'>$row->kode_rate</td>
	 <td class='isi_laporan' align='right'>".number_format($row->bunga,2,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->disc_factor,2,",",".")."</td>
	 <td class='isi_laporan' >$row->kode_curr</td>
	 <td class='isi_laporan'>".number_format($row->kurs,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->original_currency,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->principal_idr_gross,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->amortisasi_total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->principal_idr_net,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n8,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n9,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n13,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n14,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n15,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n16,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n17,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n19,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n20,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n21,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n22,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n23,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n25,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n26,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n27,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n28,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n29,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n31,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n32,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n33,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n34,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($row->n35,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($tn4,0,",",".")."</td>
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='isi_laporan' align='center' colspan='9'>Total</td>
	 <td class='isi_laporan' align='right'>".number_format($fasility,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($fasility,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($paid_curr,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($withdraw,0,",",".")."</td>
	 <td class='isi_laporan' align='center' colspan='6'>&nbsp;</td>
	 <td class='isi_laporan' align='right'>".number_format($original_currency,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($principal_idr_gross,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($amortisasi_total,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($principal_idr_net,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n4,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n5,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n7,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n8,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n9,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n10,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n11,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n13,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n14,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n15,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n16,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n17,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n19,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n20,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n21,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n22,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n23,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n25,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n26,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n27,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n28,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n29,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n31,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n32,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n33,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n34,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($n35,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($vtn1,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($vtn2,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($vtn3,0,",",".")."</td>
	 <td class='isi_laporan' align='right'>".number_format($vtn4,0,",",".")."</td>
     </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
