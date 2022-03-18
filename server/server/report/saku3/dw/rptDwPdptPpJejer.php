<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku3_dw_rptDwPdptPpJejer extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_fs=$tmp[2];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan pencapaian pendapatan JEJER PP",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellspacing='0' cellpadding='0' class='kotak' width='2000'>
  <tr bgcolor='#CCCCCC'>
    <td rowspan='2' align='center' width='300'>Deskripsi</td>";
		$sql="select kode_pp,nama from exs_pp where kode_lokasi='$kode_lokasi' order by kode_pp";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
    echo "<td colspan='2' align='center'>$row->kode_pp - $row->nama</td>";
		}
  echo "</tr>
  <tr bgcolor='#CCCCCC'>";
		$sql="select nama from exs_pp where kode_lokasi='$kode_lokasi' order by kode_pp";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
    echo "<td align='center' width='80'>RKA s.d Bulan Berjalan</td>
    <td align='center' width='80'>Realisasi s.d Bulan Berjalan</td>";
		}
  echo "</tr>";
		$sql="select a.kode_akun,b.nama 
from exs_flag_akun a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' 
order by a.kode_akun";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr><td>$row->kode_akun - $row->nama</td>";
			
			$sql="select kode_pp,nama from exs_pp where kode_lokasi='$kode_lokasi' order by kode_pp";
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$sql="select a.kode_akun,sum(a.n2*-1) as n2,sum(a.n4*-1) as n4 
					from exs_glma_gar_pp a 
					  where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun'  and a.periode='$periode'
					  group by a.kode_akun";
				//echo $sql;
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					echo "<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>";
				}
			}
			echo "<tr>";
		}
  echo "</tr>";
		
		
		
			
			
			
		
		echo "</table> </div>";
		return "";
		
	}
	
	function getHtml2()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_fs=$tmp[2];
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$AddOnLib=new server_util_AddOnLib();	
		
		$content = "<div align='center' style='width:100%;overflow:auto'>"; 
		$content .= $AddOnLib->judul_laporan("laporan pencapaian pendapatan JEJER PP",$this->lokasi,"PERIODE ".$AddOnLib->ubah_periode($periode));
		$content .= "<table  border='1' cellspacing='0' cellpadding='0' class='table table-striped table-hover' style='border-collapse : collapse;bordercolor : #111111;'>
  <tr class='info'>
    <td rowspan='2' align='center' width='300'>Deskripsi</td>";
		$sql="select kode_pp,nama from exs_pp where kode_lokasi='$kode_lokasi' order by kode_pp";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
    $content .= "<td colspan='2' align='center'>$row->kode_pp - $row->nama</td>";
		}
  $content .= "</tr>
  <tr class='info'>";
		$sql="select nama from exs_pp where kode_lokasi='$kode_lokasi' order by kode_pp";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
    $content .= "<td align='center' width='80'>RKA s.d Bulan Berjalan</td>
    <td align='center' width='80'>Realisasi s.d Bulan Berjalan</td>";
		}
  $content .= "</tr>";
		$sql="select a.kode_akun,b.nama 
from exs_flag_akun a 
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where a.kode_lokasi='$kode_lokasi' 
order by a.kode_akun";
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$content .= "<tr><td>$row->kode_akun - $row->nama</td>";
			
			$sql="select kode_pp,nama from exs_pp where kode_lokasi='$kode_lokasi' order by kode_pp";
			$rs1 = $dbLib->execute($sql);
			while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$sql="select a.kode_akun,sum(a.n2*-1) as n2,sum(a.n4*-1) as n4 
					from exs_glma_gar_pp a 
					  where a.kode_lokasi='$kode_lokasi' and a.kode_akun='$row->kode_akun'  and a.periode='$periode'
					  group by a.kode_akun";
				//$content .= $sql;
				$rs2 = $dbLib->execute($sql);
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$content .= "<td class='isi_laporan' align='right'>".number_format($row2->n2,0,',','.')."</td>
    <td class='isi_laporan' align='right'>".number_format($row2->n4,0,',','.')."</td>";
				}
			}
			$content .= "<tr>";
		}
  $content .= "</tr>";
		
		
		
			
			
			
		
		$content .= "</table> </div>";
		return $content;
		
	}
}
?>
