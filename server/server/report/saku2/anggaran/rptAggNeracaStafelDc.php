<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_anggaran_rptAggNeracaStafelDc extends server_report_basic
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
		$tahun='2011';
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1,n2,n3,n4,n5,n6,n7,n8,case when n4<>0 then (n8-n4)/n4 else 0 end as growth 
from agg_neraca_tmp 
where modul='A' and nik_user='$nik_user' and level_lap<=$level_lap 
order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//$html=$AddOnLib->judul_laporan("laporan arus kas",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN POSISI KEUANGAN<br>TAHUN $tahun <br></div>$tanggal";
		echo "<div align='center'>$judul<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='250' rowspan='2'  class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td height='25' colspan='4' align='center' class='header_laporan'>TAHUN 2010</td>
    <td colspan='4' align='center' class='header_laporan'>RKA 2011</td>
    <td width='60' rowspan='2' class='header_laporan'><div align='center'>Growth</div></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' height='25' class='header_laporan'><div align='center'>Saldo Awal</div></td>
	 <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
	  <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
	   <td width='80' class='header_laporan'><div align='center'>Saldo Akhir</div></td>
	<td width='80' class='header_laporan'><div align='center'>Saldo Awal</div></td>
	 <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
	  <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
	   <td width='80' class='header_laporan'><div align='center'>Saldo Akhir</div></td>
	
</tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
	
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
	if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
	{
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n1,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n2,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n3,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n6,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n7,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->growth,2,",",".")."</div></td>";

	}
	else
	{
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
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
		echo "<<tr >
    <td height='25' colspan='10'  class='header_laporan'>&nbsp;</td>
  </tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,n1*-1 as n1,n2*-1 as n2,n3*-1 as n3,n4*-1 as n4,n5*-1 as n5,n6*-1 as n6,n7*-1 as n7,n8*-1 as n8,case when n4<>0 then (n8-n4)/n4 else 0 end as growth 
from agg_neraca_tmp 
where modul='P' and nik_user='$nik_user' and level_lap<=$level_lap 
order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
	
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
	if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
	{
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n1,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n2,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n3,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n6,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n7,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->growth,2,",",".")."</div></td>";

	}
	else
	{
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
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
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
