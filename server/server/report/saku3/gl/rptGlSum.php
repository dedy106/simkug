<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_gl_rptGlSum extends server_report_basic
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
		$periode=$tmp[1];
		
			
		$sql = "select a.kode_pp,a.nama,isnull(b.jml,0) as n1,isnull(c.jml,0) as n2,isnull(d.jml,0) as n3,isnull(e.jml,0) as n4
from pp a
left join (select a.kode_pp,a.kode_lokasi,
			COUNT(a.no_ju) as jml
			from ju_m a
			$this->filter and posted='F'
			group by a.kode_pp,a.kode_lokasi
		   )b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,
			COUNT(a.no_ju) as jml
			from ju_m a
			$this->filter and posted='T'
			group by a.kode_pp,a.kode_lokasi
		   )c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,COUNT(a.no_kas) as jml
			from kas_m a
			$this->filter and posted='F'
			group by a.kode_pp,a.kode_lokasi
		   )d on a.kode_pp=d.kode_pp and a.kode_lokasi=d.kode_lokasi
left join (select a.kode_pp,a.kode_lokasi,COUNT(a.no_kas) as jml
			from kas_m a
			$this->filter and posted='T'
			group by a.kode_pp,a.kode_lokasi
		   )e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
where a.kode_lokasi='$kode_lokasi'
order by a.kode_pp";
		
		
		$rs = $dbLib->execute($sql);
		
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("MONITORING TRANSAKSI JURNAL",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak'>
    <tr bgcolor='#CCCCCC'>
		<td width='30' rowspan='2' align='center'  class='header_laporan'>No </td>
		<td width='60' rowspan='2' align='center'  class='header_laporan'>Kode </td>
      <td width='250' rowspan='2' align='center'  class='header_laporan'>Nama </td>
	   <td height='25' colspan='2' align='center' class='header_laporan'>General Ledger</td>
	   <td colspan='2' align='center' class='header_laporan'>Kas Bank</td>
    </tr>
    <tr bgcolor='#CCCCCC'>
      <td width='80'  align='center' class='header_laporan'>Belum Posting</td>
      <td width='80' align='center' class='header_laporan'>Posting</td>
      <td width='80' align='center' class='header_laporan'>Belum Posting</td>
      <td width='80' align='center' class='header_laporan'>Posting </td>
    </tr>";
		$n1=0; $n2=0; $n3=0; $n4=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1+=$row->n1;
			$n2+=$row->n2;
			$n3+=$row->n3;
			$n4+=$row->n4;
			echo "<tr>
				<td class='isi_laporan' align='center'>$i</td>
				<td class='isi_laporan' align='center'>$row->kode_pp</td>
				<td class='isi_laporan'>$row->nama</td>
				<td class='isi_laporan' align='center'>".number_format($row->n1,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($row->n2,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($row->n3,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($row->n4,0,",",".")."</td>
				</tr>";
			
			$i=$i+1;
		}
		echo "<tr>
				<td class='isi_laporan' align='center' colspan='3'>Total</td>
				<td class='isi_laporan' align='center'>".number_format($n1,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($n2,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($n3,0,",",".")."</td>
				<td class='isi_laporan' align='center'>".number_format($n4,0,",",".")."</td>
				</tr>";
		 echo " </table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
