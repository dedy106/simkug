<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_kopeg_sju_rptPrFormA extends server_report_basic
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
		$periode=$tmp[0];
		$nama_cab=$tmp[1];
		$AddOnLib=new server_util_AddOnLib();
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		$i=1;
		echo "<div align='center'>"; 
		
		echo "<table width='800' border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table  border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='306' class='style16'>PT. Sarana Janesia Utama </td>
        <td width='668'>&nbsp;</td>
        <td width='212' align='right' class='style16'>ISPRD</td>
      </tr>
      <tr>
        <td class='style16'>$this->lokasi</td>
        <td>&nbsp;</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>Laporan Komparatif Dasar Pengenaan Pajak dan Perpajakan</td>
        <td>&nbsp;</td>
      </tr>
      <tr>
        <td>&nbsp;</td>
        <td align='center' class='style16'>$nama_periode</td>
        <td>&nbsp;</td>
      </tr>
    
    </table></td>
  </tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
        <tr bgcolor='#dbeef3'>
          <td width='30' align='center'  class='header_laporan'>No</td>
          <td width='300' align='center'  class='header_laporan'>Nama Penanggung </td>
          <td width='200' align='center' class='header_laporan'>No Polis / nota</td>
          <td width='100' align='center' class='header_laporan'>Brokerage </td>
          <td width='100' align='center' class='header_laporan'>PPN</td>
          <td width='100' align='center' class='header_laporan'>PPh</td>
        </tr>";
       
		$sql="select a.kode_vendor,a.kode_lokasi,c.no_dok,d.nama as nama_vendor,a.fee*a.kurs as fee,a.ppn*a.kurs as ppn,a.pph*a.kurs as pph
from sju_polis_termin a
inner join sju_bill_m b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
inner join sju_polis_m c on a.no_polis=c.no_polis and a.kode_lokasi=c.kode_lokasi
inner join sju_vendor d on a.kode_vendor=d.kode_vendor and a.kode_lokasi=d.kode_lokasi
$this->filter
order by a.kode_vendor ";
	
		$rs = $dbLib->execute($sql);		
		$fee=0;$ppn=0;$pph=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$fee+=$row->fee;
			$ppn+=$row->ppn;
			$pph+=$row->pph;
		echo "<tr >
     <td class='isi_laporan' align='center'>$i</td>
   	 <td class='isi_laporan'>$row->nama_vendor</td>
	 <td class='isi_laporan'>$row->no_dok</td>
	 <td class='isi_laporan' align='right'>".number_format($row->fee,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->ppn,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($row->pph,2,',','.')."</td>
	
    </tr>";
			$i=$i+1;
		}
	
		echo " <tr>
          <td colspan='3' align='center' class='header_laporan'>Total</td>
         <td class='isi_laporan' align='right'>".number_format($fee,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($ppn,2,',','.')."</td>
	<td class='isi_laporan' align='right'>".number_format($pph,2,',','.')."</td>
	 
        </tr>
    </table></td>
  </tr>
</table> ";
		echo "</div>";
		return "";
		
	}
	
}
?>
