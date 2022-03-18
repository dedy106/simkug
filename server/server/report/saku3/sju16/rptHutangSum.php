<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_sju16_rptHutangSum extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$modul=$tmp[1];
		$periode=$tmp[2];
		$filter2=$tmp[3];
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
		$periode=$tmp[1];
		$jenis=$tmp[2];
		
		$sql_jenis="";
		if ($jenis=="Polis")
		{
			$sql_jenis=" and a.no_bill='-' ";
		}
		if ($jenis=="OutStanding")
		{
			$sql_jenis=" and a.no_bill<>'-' and isnull(g.no_bukti,'-')='-' ";
		}
		if ($jenis=="Lunas Premi")
		{
			$sql_jenis=" and a.no_bill<>'-' and isnull(g.no_bukti,'-')<>'-' and isnull(g.no_kashut,'-')='-' ";
		}
		if ($jenis=="Lunas")
		{
			$sql_jenis=" and a.no_bill<>'-' and isnull(g.no_bukti,'-')<>'-' and isnull(g.no_kashut,'-')<>'-' ";
		}
		
		$sql="select a.kode_vendor,e.nama as nama_vendor,a.kode_lokasi,
	   sum(a.fee*a.kurs) as fee,sum((a.premi*a.kurs)+a.kurs*(a.p_cost+a.materai+a.diskon)) as premi,
	   sum((a.premi+a.p_cost+a.materai-a.fee-a.diskon-a.ppn+a.pph)*a.kurs) as hutang
from sju_polis_termin a
inner join sju_polis_m b on a.no_polis=b.no_polis and a.kode_lokasi=b.kode_lokasi
left join trans_m c on a.no_bill=c.no_bukti and a.kode_lokasi=c.kode_lokasi
inner join sju_cust d on b.kode_cust=d.kode_cust and b.kode_lokasi=d.kode_lokasi
inner join sju_vendor e on a.kode_vendor=e.kode_vendor and a.kode_lokasi=e.kode_lokasi
left join sju_polisbayar_d g on a.no_polis=g.no_polis and a.no_bill=g.no_bill and a.kode_lokasi=g.kode_lokasi and a.ke=g.ke and a.kode_vendor=g.kode_vendor
$this->filter and a.no_bill<>'-' and isnull(g.no_bukti,'-')='-' 
group by a.kode_vendor,e.nama,a.kode_lokasi
order by a.kode_vendor
 ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("Hutang Summary",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak' width='700'>
   <tr bgcolor='#CCCCCC'>
     <td width='30'   align='center' class='header_laporan'>No</td>
	 <td width='60'  align='center' class='header_laporan'>Kode</td>
	 <td width='200'  align='center' class='header_laporan'>Nama Asuradur</td>
	 <td width='100'  align='center' class='header_laporan'>Hutang Premi</td>
   </tr>
   ";
		$hutang=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$hutang+=$row->hutang;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
  	<td class='isi_laporan'>$row->kode_vendor</td>";
	echo "<td class='isi_laporan'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenDetail('$row->kode_vendor','$row->kode_lokasi');\">$row->nama_vendor</a></td>";
	echo "<td class='isi_laporan' align='right'>".number_format($row->hutang,2,",",".")."</td>
	
	
     </tr>";
			$i=$i+1;
		}
		echo "<tr >
    
	  <td class='header_laporan' align='center' colspan='3'>Total</td>
	     <td class='header_laporan' align='right'>".number_format($hutang,2,",",".")."</td>
	 </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
