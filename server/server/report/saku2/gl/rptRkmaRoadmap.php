<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
function fnSpasi($level)
{
	$tmp="";
	for ($i=1; $i<=$level; $i++)
	{
		$tmp=$tmp."&nbsp;&nbsp;&nbsp;&nbsp;";
	}
	return $tmp;
}
class server_report_saku2_gl_rptRkmaRoadmap extends server_report_basic
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
		//error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$lokasi=$tmp[1];
		$periode=$tmp[2];
		$level_lap=$tmp[3];
		$jenis_tahun=intval(substr($tmp[5],0,1));
		$tahun=substr($periode,0,4);
		$tahun2=$tahun-1;
		$tahun3=$tahun2-1;
		$tahun4=$tahun3-1;
		$tahun5=$tahun4-1;
		$periode1=$tmp[4];
		$periode2=$tahun2."15";
		$periode3=$tahun3."15";
		$periode4=$tahun4."15";
		$periode5=$tahun5."15";
		$sql="exec sp_neraca5 'FS1','L','S',1,'$periode1','$periode2','$periode3','$periode4','$periode5','$lokasi','$lokasi','$lokasi','$nik_user'";
		$rs = $dbLib->execute($sql);
	
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,
		case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1, 
		case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
		case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3, 
		case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
		case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5, level_spasi 
from neraca_tmp where  nik_user='$nik_user' and level_lap<=$level_lap and modul='L' order by rowindex ";		
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		//echo $AddOnLib->judul_laporan("RENCANA KERJA MANAJERIAL & ANGGARAN (RKMA) ","","TAHUN $tahun<br>$pp");
		echo "<table border='0' cellspacing='2' cellpadding='1'>
		<tr><td><table width='100%'  border='0' cellspacing='0' cellpadding='0'>
  <tr>
    <td align='center' class='lokasi_laporan2'>RENCANA PENCAPAIAN RKA IT TELKOM</td>
  </tr>
  <tr>
    <td align='center' class='lokasi_laporan'>TAHUN $tahun</td>
  </tr>
  <tr>
    <td align='center' class='lokasi_laporan'>$pp</td>
  </tr>
</table></td></tr>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr bgcolor='#CCCCCC'>
		    <td width='30'  align='center'  class='header_laporan'>NO</td>
			<td width='400'  align='center'  class='header_laporan'>Uraian</td>";
			if ($jenis_tahun>=5)
			{
				echo "<td width='90'  align='center'  class='header_laporan'>Realisasi Tahun $tahun5</td>";
			}
			if ($jenis_tahun>=4)
			{
				echo "<td width='90'  align='center'  class='header_laporan'>Realisasi Tahun $tahun4</td>";
			}
			if ($jenis_tahun>=3)
			{
				echo "<td width='90'  align='center'  class='header_laporan'>Realisasi Tahun $tahun3</td>";
			}
			if ($jenis_tahun>=2)
			{
				echo "<td width='90'  align='center'  class='header_laporan'>Realisasi Tahun $tahun2</td>";
			}
			if ($jenis_tahun>=1)
			{
				echo "<td width='90'  align='center'  class='header_laporan'>Realisasi Tahun $tahun</td>";
			}
			echo "</tr>
		";
		$i=1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$nilai=number_format($row->n4,0,",",".");
			}
			
			echo "<tr><td class='isi_laporan' align='center'>$i</td>";
			echo "<td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>";
			if ($jenis_tahun>=5)
			{
				echo "<td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>";
			}
			if ($jenis_tahun>=4)
			{	
				echo "<td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>";
			}		
			if ($jenis_tahun>=3)
			{
				echo "<td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>";
			}
			if ($jenis_tahun>=2)
			{	
				echo "<td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>";
			}
			if ($jenis_tahun>=1)
			{	
				echo "<td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>";
			}  
			echo "</tr>";
			
			$i=$i+1;
		}
		echo "</table></td></tr></table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
