<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptLRJejerYakes extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1 ";
		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$nama_form=$tmp[2];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,
		case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1, 
		case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
		case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3, 
		case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
		case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
		case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
		case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
		case jenis_akun when  'Pendapatan' then -n8 else n8 end as n8,
		level_spasi 
from neraca_tmp where modul='L' and nik_user='$nik_user'  order by rowindex ";	
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table  border='1' cellpadding='0' cellspacing='0' bordercolor='#111111' style='border-collapse: collapse'>
    <tr bgcolor='#CCCCCC'>
      <td width='300' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
		<td width='90' class='header_laporan' align='center'>PUSAT</td>
      <td width='90' class='header_laporan' align='center'>AREA 1</td>
      <td width='90' class='header_laporan' align='center'>AREA 2</td>
      <td width='90' class='header_laporan' align='center'>AREA 3</td>
	  <td width='90' class='header_laporan' align='center'>AREA 4</td>
	  <td width='90' class='header_laporan' align='center'>AREA 5</td>
	  <td width='90' class='header_laporan' align='center'>AREA 6</td>
	  <td width='90' class='header_laporan' align='center'>AREA 7</td>
	<td width='100' class='header_laporan' align='center'>TOTAL</td>
    </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$total="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$total=$row->n1+$row->n2+$row->n3+$row->n4+$row->n5+$row->n6+$row->n7+$row->n8;
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				$n8=number_format($row->n8,0,",",".");
				$total=number_format($total,0,",",".");
			}
			
			echo "<tr>
      <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
<td class='isi_laporan' align='right'>";
			if ($n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','01','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','02','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','03','$periode');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','04','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','05','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n7 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n7</a>";
			}
			else
			{
				echo "$n7";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($n8 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','06','$periode');\">$n8</a>";
			}
			else
			{
				echo "$n8";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			echo "$total";
			echo "</td> </tr>";
			
			$i=$i+1;
		}
		
		echo "</table></div>";
		
		return "";
	}
	
}
?>
