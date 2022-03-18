<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
class server_report_saku2_anggaran_rptAggRasio extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$level_lap=$tmp[2];
		$bentuk=$tmp[3];
		$lokasi="KONSOLIDASI NASIONAL";
		$tahun="2011";
		$sql = "select kode_rasio,nama,n1,pembilang,penyebut 
from agg_rasio_tmp 
where nik_user='$nik_user' 
order by rowindex ";
		
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//$html=$AddOnLib->judul_laporan("laporan arus kas",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN PERFORMANSI KEUANGAN<br>TAHUN $tahun <br></div>$tanggal";
		echo "<div align='center'>$judul<table width='552' border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#CCCCCC'>
    <td width='44' height='30' class='header_laporan'>NO</td>
    <td width='256' class='header_laporan'>RASIO</td>
    <td colspan='2' class='header_laporan'>TAHUN 2011 </td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$pembilang=number_format($row->pembilang,0,",",".");
			$penyebut=number_format($row->penyebut,0,",",".");
			$persen=number_format($row->n1,2,",",".");
			echo " <tr>
    <td rowspan='2' align='center' class='isi_laporan'>$row->kode_rasio</td>
    <td rowspan='2' class='isi_laporan'>$row->nama</td>
    <td width='145' align='right' class='isi_laporan'>$pembilang</td>
    <td width='89' rowspan='2' align='center' class='isi_laporan'>$persen</td>
  </tr>
  <tr>
    <td align='right' class='isi_laporan'>$penyebut</td>
  </tr>";
			
			$i=$i+1;
		}
			
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
