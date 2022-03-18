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
class server_report_saku2_kopeg_sju_rptNeraca extends server_report_basic
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
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$lokasi=$tmp[3];
		
	    $sql = "select '$lokasi' as kode_lokasi,kode_neraca1,kode_neraca2,nama1,tipe1,nilai1,level_spasi1,nama2,tipe2,nilai2,level_spasi2 from neraca_skontro where nik_user='$nik_user' order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$bln = substr($periode,4);
		$thn = substr($periode,0,4);
		if (floatval($bln) > 12) $bln = 12;
		$totime = date("d M Y",strtotime("-1 second",strtotime("+1 month",strtotime($bln.'/01/'.$thn.' 00:00:00'))));
		$now = strtotime(date("d M Y"));
		$time = strtotime($totime);
		$bln = $AddOnLib->ubah_bulan(substr($periode,4));
		$totime = explode(" ",$totime);
		if ($time > $now){
			 $now = date("d M Y");
			 $now = explode(" ",$now);
			 $totime[0] = $now[0];
		}		
		$totime = $totime[0] . " ". $bln ." ". $totime[2];
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("laporan Posisi Keuangan",$this->lokasi,"Per $totime");
		
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
			  <tr bgcolor='#CCCCCC'>
				<td width='340'  class='header_laporan' align='center'>Deskripsi</td>
				<td width='100' class='header_laporan' align='center'>Jumlah</td>
			<td width='340' height='25'  class='header_laporan' align='center'>Deskripsi</td>
			<td width='100' class='header_laporan' align='center'>Jumlah</td>
			  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai1="";
			$nilai2="";
			if ($row->tipe1!="Header" && $row->nama1!="." && $row->nama1!="")
			{
				$nilai1=number_format($row->nilai1,0,",",".");
			}
			if ($row->tipe2!="Header" && $row->nama2!="." && $row->nama2!="")
			{ 
				$nilai2=number_format($row->nilai2,0,",",".");
			}
			echo "<tr><td valign='middle' class='isi_laporan' >";
			echo fnSpasi($row->level_spasi1);
			if ($row->tipe1=="Posting" && $row->nilai1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$row->kode_lokasi');\">$row->nama1</a>";
			}
			else
			{
				echo "$row->nama1";
			}
			echo "</td>
				<td valign='middle' class='isi_laporan' align='right'>$nilai1</td>";
			echo "<td height='20' valign='middle' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi2);
			if ($row->tipe2=="Posting" && $row->nilai2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$row->kode_lokasi');\">$row->nama2</a>";
			}
			else
			{
				echo "$row->nama2";
			}
			echo "</td><td valign='middle' class='isi_laporan' align='right'>$nilai2</td>
  </tr>";
			$i=$i+1;
		}
		
		echo "</table></td>
  </tr>
  <tr>
    <td align='right'>";
		
		echo "</td>
  </tr>
</table>";
		
		echo "</div>";
		
		return "";
	}
	
}
?>