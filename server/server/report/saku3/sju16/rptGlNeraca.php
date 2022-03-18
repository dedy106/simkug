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
class server_report_saku3_sju16_rptGlNeraca extends server_report_basic
{
	function getTotalPage()
	{
		global $dbLib;
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
		$nik_user=$tmp[2];
		$kode_fs=$tmp[3];
		$pp=$tmp[4];
		$kode_pp=$tmp[5];
		$bidang=$tmp[6];
		$kode_bidang=$tmp[7];
		
		$tahun=substr($periode,0,4);
		$tahun_rev=strval(intval($tahun)-1);
		$bulan=substr($periode,4,2);
		$periode_rev=strval(intval($tahun)-1).$bulan;
		if ($bulan=="01") {$bulan="JANUARI";};
		if ($bulan=="02") {$bulan="FEBRUARI";};
		if ($bulan=="03") {$bulan="MARET";};
		if ($bulan=="04") {$bulan="APRIL";};
		if ($bulan=="05") {$bulan="MEI";};
		if ($bulan=="06") {$bulan="JUNI";};
		if ($bulan=="07") {$bulan="JULI";};
		if ($bulan=="08") {$bulan="AGUSTUS";};
		if ($bulan=="09") {$bulan="SEPTEMBER";};
		if ($bulan=="10") {$bulan="OKTOBER";};
		if ($bulan=="11") {$bulan="NOVEMBER";};
		if ($bulan=="12") {$bulan="DESEMBER";};
		if ($bulan=="13") {$bulan="DESEMBER";};
		
		$sql="exec sp_neraca_sju '$kode_fs','N','K','1','$periode','$periode_rev','$kode_lokasi','$nik_user' ";
		if ($pp=="=")
		{
			$sql="exec sp_neraca_sju_pp '$kode_fs','N','K','1','$periode','$periode_rev','$kode_lokasi','$nik_user','$kode_pp' ";
			$sql2="select nama from pp where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi'";
			$rs = $dbLib->execute($sql2);
			$row = $rs->FetchNextObject($toupper=false);
			$cabang="<br>".$row->nama;
		}
		if ($bidang=="=")
		{
			$sql="exec sp_neraca_sju_bidang '$kode_fs','N','K','1','$periode','$periode_rev','$kode_lokasi','$nik_user','$kode_bidang' ";
			$sql2="select nama from bidang where kode_bidang='$kode_bidang' and kode_lokasi='$kode_lokasi'";
			$rs = $dbLib->execute($sql2);
			$row = $rs->FetchNextObject($toupper=false);
			$cabang="<br>".$row->nama;
		}
		
		$rs = $dbLib->execute($sql);		
		$sql = "select kode_neraca1,kode_neraca2,nama1,tipe1,nilai1,level_spasi1,nama2,tipe2,nilai1,nilai2,level_spasi2,nilai3,nilai4,nilai5,nilai6 
				from neraca_skontro where nik_user='$nik_user' order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = $start+1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo "<table border='0' cellspacing='0' cellpadding='0' width ='100%'>
  <tr>
    <td colspan='2' class='lokasi_laporan' align='center'>PT SARANA JANESIA UTAMA</td>
  </tr>
  <tr>
    <td  class='lokasi_laporan2' align='center'>LAPORAN POSISI KEUANGAN $cabang</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Per $bulan $tahun dan $bulan $tahun_rev</td>
  </tr>
 
</table>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='250' class='header_laporan'>URAIAN</td>
    <td width='90' class='header_laporan'>REALISASI  S/D $bulan $tahun_rev</td>	
   <td width='90' class='header_laporan'>REALISASI S/D $bulan $tahun</td>
    <td width='50' class='header_laporan'>GROWTH</td>
     <td width='250' class='header_laporan'>URAIAN</td>
    <td width='90' class='header_laporan'>REALISASI  S/D $bulan $tahun_rev</td>	 
    <td width='90' class='header_laporan'>REALISASI S/D $bulan $tahun</td>
    <td width='50' class='header_laporan'>GROWTH</td>
  </tr>
   <tr align='center' bgcolor='#dbeef3'>
    <td width='250' class='header_laporan'>(1)</td>
    <td width='90' class='header_laporan'>(2)</td>
    <td width='90' class='header_laporan'>(3)</td>
    <td width='50' class='header_laporan'>(3/2)</td>
     <td width='250' class='header_laporan'>(1)</td>
    <td width='90' class='header_laporan'>(2)</td>
    <td width='90' class='header_laporan'>(3)</td>
    <td width='50' class='header_laporan'>(3/2)</td>
 
  </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="'";
			
			$persen2="'";
			
			$nilai1="";	$nilai2="";$nilai3="";	$nilai4="";$nilai5="";	$nilai6="";
			if ($row->tipe1!="Header" && $row->nama1!="." )
			{
				$nilai1=number_format($row->nilai1,0,",",".");
				$nilai2=number_format($row->nilai2,0,",",".");
				$nilai3=number_format($row->nilai3,0,",",".");
				if ($row->nilai3 > 0)
				{
					$persen1=(($row->nilai2+(-$row->nilai3)) / $row->nilai3)*100;
				}
				if ($row->nilai3 < 0)
				{
					$persen1=(($row->nilai2+(-$row->nilai3)) / -$row->nilai3)*100;
				}
			}
			if ($row->tipe2!="Header" && $row->nama2!=".")
			{ 
				$nilai4=number_format($row->nilai4,0,",",".");
				$nilai5=number_format($row->nilai5,0,",",".");
				$nilai6=number_format($row->nilai6,0,",",".");
				if ($row->nilai6 > 0)
				{
					$persen2=(($row->nilai5+(-$row->nilai6)) / $row->nilai6)*100;
				}
				if ($row->nilai6 < 0)
				{
					$persen2=(($row->nilai5+(-$row->nilai6)) / -$row->nilai6)*100;
				}
			}
			echo "<tr>
    <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi1);
			echo $row->nama1;
			echo "</td>
			
   <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe1=="Posting" && $row->nilai3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$kode_lokasi','$periode_rev');\">$nilai3</a>";
			}
			else
			{
				echo "$nilai3";
			}
			echo "</td>
			
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe1=="Posting" && $row->nilai2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$kode_lokasi','$periode');\">$nilai2</a>";
			}
			else
			{
				echo "$nilai2";
			}
			echo "</td>
			

			
    <td valign='top' class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
   <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi2);
			echo $row->nama2;
			echo "</td>
	  <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe2=="Posting" && $row->nilai6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$kode_lokasi','$$periode_rev');\">$nilai6</a>";
			}
			else
			{
				echo "$nilai6";
			}
			echo "</td>			
    <td valign='top' class='isi_laporan' align='right'>";
			if ($row->tipe2=="Posting" && $row->nilai5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$kode_lokasi','$periode');\">$nilai5</a>";
			}
			else
			{
				echo "$nilai5";
			}
			echo "</td>

	   <td valign='top' class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
	
	
		
		echo "</div>";
		return "";
	}
	
}
?>
