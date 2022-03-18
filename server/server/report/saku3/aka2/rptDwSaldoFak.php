<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_aka2_rptDwSaldoFak extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
		$sql="select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="SELECT  a.kode_lokasi, a.kode_fak, b.nama,a.periode, a.n1, a.n2, a.n3, a.n4, a.n5, a.n6, a.n7, a.n8, a.n9, a.n10, 
a.n11, a.n12, a.n13, a.n14, a.n15, a.n16, a.n17, a.n18, a.n19, a.n20, a.n21, a.n22, a.n23, a.n24
FROM  exs_aka_saldo_fak a
inner join aka_fakultas b on a.kode_fak=b.kode_fakultas and a.kode_lokasi=b.kode_lokasi
$this->filter
order by a.kode_fak";
		//echo $sql;
		$rs = $dbLib->execute($sql);	
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo piutang fakultas",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='20' rowspan='2' class='header_laporan'>No</td>
    <td width='50' rowspan='2' class='header_laporan'>Kode</td>
    <td width='200' rowspan='2' class='header_laporan'>Nama Fakultas </td>
    <td colspan='6' class='header_laporan'>Saldo Awal </td>
    <td colspan='6' class='header_laporan'>Tagihan</td>
    <td colspan='6' class='header_laporan'>Pembayaran</td>
    <td colspan='6' class='header_laporan'>Saldo Akhir </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
    <td width='80' align='center' class='header_laporan'>BPP</td>
    <td width='80' align='center' class='header_laporan'>SDP2</td>
    <td width='80' align='center' class='header_laporan'>UP3</td>
	<td width='80' align='center' class='header_laporan'>SKS</td>
	<td width='80' align='center' class='header_laporan'>LAIN</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; $n11=0; $n12=0;
		$n13=0; $n14=0; $n15=0; $n16=0; $n17=0; $n18=0; $n19=0; $n20=0; $n21=0; $n22=0; $n23=0; $n24=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			$n5+=$row->n5;
			$n6+=$row->n6;
			$n7+=$row->n7;
			$n8+=$row->n8;
			$n9+=$row->n9;
			$n10+=$row->n10;
			$n11+=$row->n11;
			$n12+=$row->n12;
			$n13+=$row->n13;
			$n14+=$row->n14;
			$n15+=$row->n15;
			$n16+=$row->n16;
			$n17+=$row->n17;
			$n18+=$row->n18;
			$n19+=$row->n19;
			$n20+=$row->n20;
			$n21+=$row->n21;
			$n22+=$row->n22;
			$n23+=$row->n23;
			$n24+=$row->n24;
			echo "<tr>
   <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row->kode_fak</td>
    <td class='isi_laporan'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenSaldoJur('$row->kode_fakultas','$row->kode_lokasi');\">$row->nama</a>";
			echo "</td>
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
    <td class='isi_laporan' align='right'>".number_format($row->n13,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n14,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n15,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n16,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n17,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n18,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n19,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n20,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n21,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n22,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($row->n23,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($row->n24,0,",",".")."</td>
  </tr>";	 
			$i=$i+1;
		}
		echo "</td>
		<td class='isi_laporan' align='center' colspan='3'>Total</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($n4,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($n5,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($n6,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($n7,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($n8,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($n9,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($n10,0,",",".")."</td>
	<td class='isi_laporan' align='right'>".number_format($n11,0,",",".")."</td>
    <td class='isi_laporan' align='right'>".number_format($n12,0,",",".")."</td>
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
  </tr>";	 
		echo "</table></div>";
		return "";
	}
	
}
?>
  
