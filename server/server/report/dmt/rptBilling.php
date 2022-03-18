<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_dmt_rptBilling extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$sql="select count(a.no_akru)
from dmt_akru_m a $this->filter ";
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
		$sql="select a.no_akru,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.periode
from dmt_akru_m a $this->filter order by a.no_akru";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$i = 1;
		echo "<div align='center'>"; 
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan akru billing",$this->lokasi,$AddOnLib->ubah_periode($periode));
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		
			echo "<table border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='11' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_akru</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Periode</td>
        <td class='header_laporan'>:&nbsp;$row->periode</td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal   </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
	<tr>
        <td class='header_laporan'>Keterangan   </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='80' align='center' class='header_laporan'>No Site</td>
    <td width='200' align='center' class='header_laporan'>Nama Site</td>
	<td width='90' align='center' class='header_laporan'>Harga Sewa</td>
    <td width='90' align='center' class='header_laporan'>TARIF O &amp; M</td>
	<<td width='90' align='center' class='header_laporan'>Fee O &amp; M (5%)</td>
	<td width='90' align='center' class='header_laporan'>Total</td>
  </tr>";
	$sql1="select a.no_site,b.nama,a.rawat,a.sewa,a.fee,a.nilai_ar
from dmt_bill_d a
inner join dmt_site b on a.no_site=b.no_site
where no_akru='$row->no_akru'
order by a.no_site";
	
	$rs1 = $dbLib->execute($sql1);
	$j=1;
	$total=0;
	while ($row1 = $rs1->FetchNextObject($toupper=false))
	{
		$total=$total+$row1->nilai_ar;
		echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='left' class='isi_laporan'>$row1->no_site</td>
    <td align='left' class='isi_laporan'>$row1->nama</td>
	<td align='right' class='isi_laporan'>".number_format($row1->sewa,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->rawat,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->fee,0,",",".")."</td>
	<td align='right' class='isi_laporan'>".number_format($row1->nilai_ar,0,",",".")."</td>
  </tr>";
		$j=$j+1;
	}
	
  echo " <tr>
    <td colspan='6' align='right' class='header_laporan'>Total&nbsp;</td>
    <td align='right' class='isi_laporan'>".number_format($total,0,",",".")."</td>
  </tr></table><br>";
		 
			$i=$i+1;
		}
		echo "</div>";
		
		return "";
	}
	
}
?>
  
