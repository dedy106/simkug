<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_yakes_inves_rptSPDevidenSaldo extends server_report_basic
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
		
		
		$sql="select a.no_spdev,convert(varchar,b.tanggal,103) as tanggal,c.kode_mitra,c.nama as saham,
a.nilai_dev as bruto,a.nilai_pph,a.nilai_kb as netto
from inv_spdev_d a 
inner join inv_spdev_m b on a.no_spdev=b.no_spdev
inner join inv_mitra c on a.kode_mitra=c.kode_mitra
$this->filter
order by a.no_spdev
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
    <td align='center' class='header_laporan' width='200'>Nama Mitra</td>	 
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
     <td class='isi_laporan'>$row->no_spdev</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->kode_mitra</td>
	 <td class='isi_laporan'>$row->saham</td>
	 
	  <td class='isi_laporan' align='right'>".number_format($row->bruto,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->nilai_pph,0,",",".")."</td>
	  <td class='isi_laporan' align='right'>".number_format($row->netto,0,",",".")."</td>
	    </tr>";
			$i=$i+1;
		}
		echo "<tr >
     <td class='header_laporan' align='center' colspan='5'>Total</td>
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
