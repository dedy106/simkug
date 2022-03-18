<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_inves2_rptSahamDevidenSaldo extends server_report_basic
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
		
		
		$sql="select a.no_shmdev,convert(varchar,b.tanggal,103) as tanggal,c.kode_saham,c.nama as saham,
d.kode_kelola,d.nama as mi,a.nilai_dev as bruto,a.nilai_pph,a.nilai_kb as netto
from inv_shmdev_d a 
inner join inv_shmdev_m b on a.no_shmdev=b.no_shmdev
inner join inv_saham c on b.kode_saham=c.kode_saham
inner join inv_kelola d on a.kode_kelola=d.kode_kelola
$this->filter
order by a.no_shmdev
";
	
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
    <td align='center' class='header_laporan' width='60'>Kode Saham </td>
    <td align='center' class='header_laporan' width='200'>Nama Saham</td>
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
     <td class='isi_laporan'>$row->no_shmdev</td>
	 <td class='isi_laporan'>$row->tanggal</td>
	 <td class='isi_laporan'>$row->kode_saham</td>
	 <td class='isi_laporan'>$row->saham</td>
	 <td class='isi_laporan'>$row->kode_kelola</td>
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
