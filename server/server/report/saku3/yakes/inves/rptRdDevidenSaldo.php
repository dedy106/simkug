<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptRdDevidenSaldo extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
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
		$tahun=$tmp[0];
		$nama_cab=$tmp[1];
		
		
		$sql="select a.no_rddev,convert(varchar,b.tanggal,103) as tanggal,c.kode_rd,c.nama as saham,
d.kode_rdkelola,d.nama as mi,a.nilai_dev as bruto,a.nilai_pph,a.nilai_kb as netto
from inv_rddev_d a 
inner join inv_rddev_m b on a.no_rddev=b.no_rddev
inner join inv_rd c on a.kode_rd=c.kode_rd
inner join inv_rdkelola d on b.kode_rdkelola=d.kode_rdkelola
$this->filter
order by a.no_rddev
";
		//echo $sql;
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();	
		$i=1;
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("list deviden",$this->lokasi,"TAHUN $tahun");
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan' width='30'>No</td>
	<td align='center' class='header_laporan' width='100'>No Bukti </td>
	<td align='center' class='header_laporan' width='60'>Tanggal </td>
    <td align='center' class='header_laporan' width='60'>Kode  </td>
    <td align='center' class='header_laporan' width='200'>Nama Reksadana</td>
	 <td align='center' class='header_laporan' width='60'>Kode Kelola </td>
    <td align='center' class='header_laporan' width='200'>Nama Kelola</td>
	<td  align='center' class='header_laporan' width='100'>Bruto</td>
	 <td width='90' align='center' class='header_laporan'>Pph</td>
    <td width='100' align='center' class='header_laporan'>Netto</td>
    </tr>
  
 ";
		$bruto=0 ; $nilai_pph=0; $netto=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$bruto+=$row->bruto;
			$nilai_pph+=$row->nilai_pph;
			$netto+=$row->netto;
			echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
     <td class='isi_laporan'>$row->no_rddev</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->kode_rd</td>
	 <td class='isi_laporan'>$row->saham</td>
	 <td class='isi_laporan'>$row->kode_rdkelola</td>
	 <td class='isi_laporan'>$row->mi</td>
	  <td class='isi_laporan' align='right'>".number_format($row->bruto,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->netto,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='7'>Total</td>
      <td class='header_laporan' align='right'>".number_format($bruto,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($nilai_pph,0,",",".")."</td>
	  <td class='header_laporan' align='right'>".number_format($netto,0,",",".")."</td>
	    </tr>";
		echo "</table><br>";
		echo "</div>";
		return "";
		
	}
	
}
?>
