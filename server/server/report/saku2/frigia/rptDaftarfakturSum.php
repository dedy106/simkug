<?php

uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");

class server_report_saku2_frigia_rptDaftarFakturSum extends server_report_basic
{	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$periode=$tmp[0];
		$sql="select count(a.kode_cust) from (select a.kode_cust
			from fp_invoice a 
			inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi $this->filter
			group by a.kode_cust) a ";
		error_log($sql);
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
		$sql="select a.kode_cust,b.nama as nama_cust,b.npwp,sum(a.nilai_dpp) as nilai_dpp,sum(a.nilai_ppn) as nilai_ppn
			from fp_invoice a 
			inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi $this->filter
			group by a.kode_cust,b.nama,b.npwp  ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
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
     <td class='header_laporan' width='80'>Nilai DPP </td>
    <td class='header_laporan' width='80'>Nilai PPN</td>
  </tr>";
	$nilai_ppn=0;$nilai_dpp=0;
	while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai_ppn=$nilai_ppn+$row->nilai_ppn;
			$nilai_dpp=$nilai_dpp+$row->nilai_dpp;
			echo "<tr>
    <td align='center' class='isi_laporan' >$i</td>
    <td class='isi_laporan'>$row->kode_cust</td>
    <td class='isi_laporan'>$row->nama_cust</td>
	<td class='isi_laporan'>$row->npwp</td>
	<td class='isi_laporan' align='right'>".number_format($row->nilai_dpp,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row->nilai_ppn,0,',','.')."</td>
     </tr>";

			$i=$i+1;
		}
		echo "<tr>
    <td class='isi_laporan' colspan='4' align='right'>Total</td>
  	<td class='isi_laporan' align='right'>".number_format($nilai_ppn,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($nilai_dpp,0,',','.')."</td>
     </tr>";
		echo "</table></div>";
		
		return "";
	}
	
}
?>
  
