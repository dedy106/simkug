<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku3_tm_rptBillFakturDaftar extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
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
		$sql="select a.kode_cust,b.nama as nama_cust,b.npwp,a.no_faktur,a.no_bill,a.keterangan,a.nilai,a.nilai_ppn,date_format(a.tanggal,'%d/%m/%Y') as tgl
from bill_m a 
inner join cust2 b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
$this->filter 
order by a.no_faktur ";
		$rs = $dbLib->execute($sql);	
		$AddOnLib=new server_util_AddOnLib();
		$i = 1;
		$path = $_SERVER["SCRIPT_NAME"];				
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("DAFTAR FAKTUR PAJAK",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td class='header_laporan' width='20'>NO</td>
    <td class='header_laporan' width='50'>Kode Cust</td>
    <td class='header_laporan' width='250'>Nama Customer</td>
	 <td class='header_laporan' width='110'>NPWP</td>
    <td class='header_laporan' width='100'>No Faktur</td>
    <td class='header_laporan' width='60'>Tanggal</td>
    <td class='header_laporan' width='100'>No Invoice</td>
    <td class='header_laporan' width='200'>Keterangan</td>
    <td class='header_laporan' width='80'>Nilai DPP </td>
    <td class='header_laporan' width='80'>Nilai PPN</td>
  </tr>";
	$nilai=0;$nilai_dpp=0;
	while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->kode_cust</td>
    <td class='isi_laporan'>$row->nama_cust</td>
	<td class='isi_laporan'>$row->npwp</td>
	<td class='isi_laporan'>$row->no_faktur</td>
	<td class='isi_laporan'>$row->tgl</td>
	<td class='isi_laporan'>$row->no_bill</td>
	<td class='isi_laporan'>$row->keterangan</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,',','.')."</td>
     </tr>";

			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='8' align='right'>Total</td>
  	<td class='isi_laporan' align='right'>".number_format($nilai,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,',','.')."</td>
     </tr>";
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
