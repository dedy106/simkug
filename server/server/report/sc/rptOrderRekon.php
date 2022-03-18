<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_sc_rptOrderRekon extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$sql="select count(a.no_rekon)
from sc_rekon_m a 
inner join sc_vendor b on a.kode_vendor=b.kode_vendor  ";
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
		$nama_ver=$tmp[0];
		$ver=$tmp[1];
		$tahun=$tmp[2];
		$bidang=$tmp[3];
		
		$sql="select a.no_rekon, date_format(a.tanggal,'%d/%m/%Y') as tanggal, a.keterangan, a.kode_vendor, b.nama as nama_vendor
from sc_rekon_m a 
inner join sc_vendor b on a.kode_vendor=b.kode_vendor
order by a.no_rekon ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("order",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		echo "<div align='center'>"; 
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<table   border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr>
    <td colspan='20' style='padding:5px'><table width='100%' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td class='header_laporan' width='114'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_rekon</td>
        </tr>
		<tr>
        <td class='header_laporan' width='114'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
	    <tr>
        <td class='header_laporan'>Vendor </td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor -&nbsp; $row->nama_vendor</td>
      </tr>
	  
      <tr>
        <td class='header_laporan'>Keterangan  </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
	 
    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='15' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>No PO</td>
    <td width='60' align='center' class='header_laporan'>Tanggal</td>
    <td width='150' align='center' class='header_laporan'>Keterangan</td>

	<td width='80' align='center' class='header_laporan'>Nilai</td>
	<td width='80' align='center' class='header_laporan'>PPN</td>
    <td width='90' align='center' class='header_laporan'>Total</td>
	
  </tr>";
			$sql1="select a.no_po,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,a.ppn,a.nilai+a.ppn as total
from sc_po_m a
inner join sc_vendor b on a.kode_vendor=b.kode_vendor
where a.no_rekon='$row->no_rekon' ";
			
			$rs1 = $dbLib->execute($sql1);
			$j=1;$nilai=0; $ppn=0; $total=0;
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=$nilai+$row1->nilai;
				$ppn=$tarif+$row1->ppn;
				$total=$total+$row1->total;
				echo "<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td  class='isi_laporan'>$row1->no_po</td>
    <td class='isi_laporan'>$row1->tanggal</td>
	<td class='isi_laporan'>$row1->keterangan</td>
	
   <td align='right' class='isi_laporan'>".number_format($row1->nilai,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->ppn,0,",",".")."</td>
    <td align='right' class='isi_laporan'>".number_format($row1->total,0,",",".")."</td>
  </tr>";		
				$j=$j+1;
			}
			echo "<tr>
    <td colspan='4' align='center'  class='header_laporan'>Total</td>
	<td align='right' class='header_laporan'>".number_format($nilai,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($ppn,0,",",".")."</td>
    <td align='right' class='header_laporan'>".number_format($total,0,",",".")."</td>
  </tr></table><br>";
		}
		echo "</div>";
		return "";
	}
	
}
?>
  
1