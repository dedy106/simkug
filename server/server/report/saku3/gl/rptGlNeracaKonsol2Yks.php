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
class server_report_saku3_gl_rptGlNeracaKonsol2Yks extends server_report_basic
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
		$kode_lokasi=$tmp[2];
		$periode2=$tmp[3];
		$sql="exec sp_neraca_konsol2 'FS1','N','K','1','$periode','$periode2','$kode_lokasi','$nik_user' ";
		
		$rs = $dbLib->execute($sql);	
	    $sql = "select '$lokasi' as kode_lokasi,kode_neraca1,kode_neraca2,nama1,tipe1,nilai1,level_spasi1,nama2,tipe2,nilai2,level_spasi2,nilai3,nilai4 
		from neraca_skontro where nik_user='$nik_user' order by rowindex ";
		
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
		//echo $AddOnLib->judul_laporan("laporan posisi keuangan",$this->lokasi,"Untuk Periode Yang Berakhir Pada Tanggal $totime");
		echo "<table border='0' cellspacing='0' cellpadding='0' >
  <tr>
    <td class='lokasi_laporan' align='center'>$this->lokasi</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN POSISI KEUANGAN</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Untuk Periode Yang Berakhir Pada Tanggal $totime</td>
  </tr>
  <tr>
    <td align='center'>";
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
			  <tr bgcolor='#CCCCCC'>
				<td width='340'  class='header_laporan' align='center'>Deskripsi</td>
				<td width='100' class='header_laporan' align='center'>$periode</td>
			<td width='100' class='header_laporan' align='center'>$periode2</td>
			<td width='340' height='25'  class='header_laporan' align='center'>Deskripsi</td>
			<td width='100' class='header_laporan' align='center'>$periode</td>
			<td width='100' class='header_laporan' align='center'>$periode2</td>
			  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai1="";
			$nilai2="";
			$nilai3="";
			$nilai4="";
			if ($row->tipe1!="Header" && $row->nama1!=".")
			{
				$nilai1=number_format($row->nilai1,0,",",".");
				$nilai3=number_format($row->nilai3,0,",",".");
			}
			if ($row->tipe2!="Header" && $row->nama2!="." )
			{ 
				$nilai2=number_format($row->nilai2,0,",",".");
				$nilai4=number_format($row->nilai4,0,",",".");
			}
			echo "<tr><td valign='middle' class='isi_laporan' >";
			echo fnSpasi($row->level_spasi1);
			echo $row->nama1;
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe1=="Posting" && $row->nilai1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$kode_lokasi','$periode');\">$nilai1</a>";
			}
			else
			{
				echo "$nilai1";
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe1=="Posting" && $row->nilai3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$kode_lokasi','$periode2');\">$nilai3</a>";
			}
			else
			{
				echo "$nilai3";
			}
			echo "</td>";
			echo "<td height='20' valign='middle' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi2);
			echo $row->nama2;
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe1=="Posting" && $row->nilai2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$kode_lokasi','$periode');\">$nilai2</a>";
			}
			else
			{
				echo "$nilai2";
			}
			echo "</td>
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe1=="Posting" && $row->nilai4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$kode_lokasi','$periode2');\">$nilai4</a>";
			}
			else
			{
				echo "$nilai4";
			}
			echo "</td>";
			echo "</tr>";
			$i=$i+1;
		}
		
		echo "</table></td>
  </tr>";
		echo "</td></tr>";
		echo "</table></div>";
		
		return "";
	}
	
}
?>