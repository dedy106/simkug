<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_bpr_rptPinjSaldoAgg extends server_report_basic
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
		$sql="select a.no_agg,a.kode_lokasi,b.nama,
       sum(case when a.kode_param='INT' then a.npokok else 0 end) as n1,
       sum(case when a.kode_param='INT' then a.nbunga else 0 end) as n2,
	   sum(case when a.kode_param='INT' then a.jumlah else 0 end) as n3,
       sum(case when a.kode_param='PKK' then a.npokok else 0 end) as n4,
       sum(case when a.kode_param='PKK' then a.nbunga else 0 end) as n5,
	   sum(case when a.kode_param='PKK' then a.jumlah else 0 end) as n6,
       sum(case when a.kode_param='BANK' then a.npokok else 0 end) as n7,
	   sum(case when a.kode_param='BANK' then a.nbunga else 0 end) as n8,
       sum(case when a.kode_param='BANK' then a.jumlah else 0 end) as n9,
       sum(case when a.kode_param='LAIN' then a.npokok else 0 end) as n10,
       sum(case when a.kode_param='LAIN' then a.nbunga else 0 end) as n11,
	   sum(case when a.kode_param='LAIN' then a.jumlah else 0 end) as n12,
	   sum(a.npokok) as n13,
	   sum(a.nbunga) as n14,
	   sum(a.jumlah) as n15
from (select a.no_agg,a.kode_lokasi,a.kode_param,
		   ISNULL(b.npokok,0) as npokok,ISNULL(b.nbunga,0) as nbunga,ISNULL(b.npokok,0)+ISNULL(b.nbunga,0) as jumlah
	from (select a.kode_lokasi,a.no_agg,a.kode_param
		  from kop_pinj_m a
		  where a.kode_lokasi='$kode_lokasi'
		  group by a.kode_lokasi,a.no_agg,a.kode_param
		  )a
	left join (select a.no_agg,c.kode_param,a.kode_lokasi,sum(a.npokok) as npokok,sum(a.nbunga) as nbunga
				from kop_pinjangs_d a
				inner join kop_pinjangs_m b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi
				inner join kop_pinj_m c on a.no_pinj=c.no_pinj and a.kode_lokasi=c.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and a.periode<='$periode'
				group by a.no_agg,c.kode_param,a.kode_lokasi
			   )b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi and a.kode_param=b.kode_param
	where a.kode_lokasi='$kode_lokasi'
	)a
inner join kop_agg b on a.no_agg=b.no_agg and a.kode_lokasi=b.kode_lokasi
$this->filter
group by a.no_agg,a.kode_lokasi,a.kode_param,b.nama
order by a.no_agg";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("saldo pinjaman",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' >
  <tr bgcolor='#CCCCCC'>
    <td width='30' align='center' class='header_laporan' rowspan='2'>No</td>
    <td width='80' align='center' class='header_laporan' rowspan='2'>No Anggota</td>
    <td width='150' align='center' class='header_laporan' rowspan='2'>Nama</td>
	<td colspan='3' align='center' class='header_laporan'>Pinjaman Uang Internal </td>
	<td colspan='3' align='center' class='header_laporan'>Pinjaman uang Bank </td>
	<td colspan='3' align='center' class='header_laporan'>Pinjaman Barang </td>
	<td colspan='3' align='center' class='header_laporan'>Pinjaman Retail </td>
	<td colspan='3' align='center' class='header_laporan'>Total Pinjaman </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' align='center' class='header_laporan'>Pokok</td>
    <td width='80' align='center' class='header_laporan'>Jasa</td>
    <td width='80' align='center' class='header_laporan'>Jumlah</td>
   <td width='80' align='center' class='header_laporan'>Pokok</td>
    <td width='80' align='center' class='header_laporan'>Jasa</td>
    <td width='80' align='center' class='header_laporan'>Jumlah</td>
	<td width='80' align='center' class='header_laporan'>Pokok</td>
    <td width='80' align='center' class='header_laporan'>Jasa</td>
    <td width='80' align='center' class='header_laporan'>Jumlah</td>
	<td width='80' align='center' class='header_laporan'>Pokok</td>
    <td width='80' align='center' class='header_laporan'>Jasa</td>
    <td width='80' align='center' class='header_laporan'>Jumlah</td>
	<td width='80' align='center' class='header_laporan'>Pokok</td>
    <td width='80' align='center' class='header_laporan'>Jasa</td>
    <td width='80' align='center' class='header_laporan'>Jumlah</td>
  </tr>
 
    ";
		$n1=0; $n2=0; $n3=0; $n4=0; $n5=0; $n6=0; $n7=0; $n8=0; $n9=0; $n10=0; 
		$n11=0;$n12=0;$n13=0;$n14=0;$n15=0;
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
			echo "</td>
	 <td class='isi_laporan' align='center'>$i</td>
	 <td class='isi_laporan'>$row->no_agg</td>
	 <td class='isi_laporan'>$row->nama</td>
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
     </tr>";
			$i=$i+1;
		}
		echo "<tr>
    <td class='header_laporan'  colspan='3' align='right'>Total</td>
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
	<td class='header_laporan' align='right'>".number_format($n13,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n14,0,",",".")."</td>
	<td class='header_laporan' align='right'>".number_format($n15,0,",",".")."</td>
  </tr>
";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
