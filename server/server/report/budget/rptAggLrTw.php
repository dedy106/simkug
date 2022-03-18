<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
class server_report_budget_rptAggLrTw extends server_report_basic
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
		$tahun='20110 & 2011';
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
		case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
		case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
		case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
		case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
		case jenis_akun when  'Pendapatan' then -n8 else n8 end as n8
from agg_neraca_tmp 
where modul='L' and nik_user='$nik_user' and level_lap<=$level_lap 
order by rowindex ";
		error_log($sql);
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//$html=$AddOnLib->judul_laporan("laporan arus kas",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN AKTIFITAS<br>TAHUN $tahun <br></div>$tanggal";
		echo "<div align='center'>$judul<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='250' class='header_laporan'><div align='center'>URAIAN</div></td>
	<td width='80' height='25' class='header_laporan'><div align='center'>TAHUN 2010</div></td>
	<td width='80' height='25' class='header_laporan'><div align='center'>RKA 2011</div></td>
    <td width='80' height='25' class='header_laporan'><div align='center'>TRIWULAN I</div></td>
	 <td width='80' class='header_laporan'><div align='center'>TRIWULAN II</div></td>
	  <td width='80' class='header_laporan'><div align='center'>TRIWULAN III</div></td>
	   <td width='80' class='header_laporan'><div align='center'>TRIWULAN IV</div></td>
</tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
	
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
	if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
	{
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n6,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n7,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,",",".")."</div></td>";
		
	}
	else
	{
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
	}
		
		echo "</tr>";
			$i=$i+1;
		}
		echo "<tr >
    </tr>";
		
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
