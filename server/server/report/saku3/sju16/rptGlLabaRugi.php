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
class server_report_saku3_sju16_rptGlLabaRugi extends server_report_basic
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
		if (($bulan=="01") || ($bulan=="02") || ($bulan=="03")) {$tw="I";};
		if (($bulan=="04") || ($bulan=="05") || ($bulan=="06")) {$tw="II";};
		if (($bulan=="07") || ($bulan=="08") || ($bulan=="09")) {$tw="III";};
		if (($bulan=="010") || ($bulan=="11") || ($bulan=="12")) {$tw="IV";};
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
		$sql="exec sp_neraca_sju '$kode_fs','L','S','1','$periode','$periode_rev','$kode_lokasi','$nik_user' ";
		if ($pp=="=")
		{
			$sql="exec sp_neraca_sju_pp '$kode_fs','L','S','1','$periode','$periode_rev','$kode_lokasi','$nik_user','$kode_pp' ";
			$sql2="select nama from pp where kode_pp='$kode_pp' and kode_lokasi='$kode_lokasi'";
			$rs = $dbLib->execute($sql2);
			$row = $rs->FetchNextObject($toupper=false);
			$cabang="<br>".$row->nama;
		}
		if ($bidang=="=")
		{
			$sql="exec sp_neraca_sju_bidang '$kode_fs','L','S','1','$periode','$periode_rev','$kode_lokasi','$nik_user','$kode_bidang' ";
			$sql2="select nama from bidang where kode_bidang='$kode_bidang' and kode_lokasi='$kode_lokasi'";
			$rs = $dbLib->execute($sql2);
			$row = $rs->FetchNextObject($toupper=false);
			$cabang="<br>".$row->nama;
		}
		
		
		$rs = $dbLib->execute($sql);
		$sql="select nama from fs where kode_fs='$kode_fs' and kode_lokasi='$kode_lokasi'";
		$rs = $dbLib->execute($sql);
		$row = $rs->FetchNextObject($toupper=false);
		$nama_fs=$row->nama;
		if ($kode_fs=="FS1")
		{
			$nama_fs='LAPORAN LABA / RUGI';
		}
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				   case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
				   case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
				   case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
				   case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
				   case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
				   case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6
			from neraca_tmp 
			where nik_user='$nik_user' and modul='L'
			order by rowindex ";
		
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
    <td  class='lokasi_laporan2' align='center'>".strtoupper($nama_fs)." $cabang</td>
  </tr>
  <tr>
    <td class='lokasi_laporan' align='center'>Per $bulan $tahun dan $bulan $tahun_rev</td>
  </tr>
 
</table>";
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
    <td width='250' class='header_laporan' rowspan='2'>URAIAN</td>
    <td width='90' class='header_laporan'>REALISASI S/D $bulan $tahun_rev</td>	
    <td width='90' class='header_laporan'>ANGGARAN TAHUN $tahun (RKAP)</td>
    <td width='90' class='header_laporan'>ANGGARAN S/D TW $tw TAHUN $tahun</td>
	<td width='90' class='header_laporan'>ANGGARAN S/D $bulan $tahun</td>
    <td width='90' class='header_laporan'>REALISASI S/D $bulan $tahun</td>
    <td width='50' class='header_laporan' colspan='3'>(%) TASE</td>
	<td width='50' class='header_laporan' colspan='1'>GROWTH</td>
  </tr>
  <tr align='center' bgcolor='#dbeef3'>
  
    <td width='90' class='header_laporan'>(1)</td>
    <td width='90' class='header_laporan'>(2)</td>
    <td width='90' class='header_laporan'>(3)</td>
    <td width='90' class='header_laporan'>(4)</td>
	<td width='90' class='header_laporan'>(5)</td>
    <td width='50' class='header_laporan'>(5/2)</td>
	<td width='50' class='header_laporan'>(5/3)</td>
	<td width='50' class='header_laporan'>(5/4)</td>
	<td width='50' class='header_laporan'>(5/1)</td>
  </tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="'";$persen2="'";$persen3="'";$persen4="'";
			$n2="";	$n3="";	$n4="";	$n5=""; $n6="";
			if ($row->tipe!="Header" && $row->nama!="." )
			{
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				if ($row->n4 > 0)
				{
					$persen1=($row->n2 / $row->n4)*100;
				}
				if ($row->n4 < 0)
				{
					$persen1=($row->n2 / abs($row->n4))*100;
				}
				if ($row->n5 > 0)
				{
					$persen2=($row->n2 / $row->n5)*100;
				}
				if ($row->n5 < 0)
				{
					$persen2=($row->n2 / abs($row->n5))*100;
				}
				if ($row->n3 > 0)
				{
					$persen3=(($row->n2+(-$row->n3)) / $row->n3)*100;
				}
				if ($row->n3 < 0)
				{
					$persen3=(($row->n2+(-$row->n3)) / -$row->n3)*100;
				}
				if ($row->n6 > 0)
				{
					$persen4=($row->n2 / $row->n6)*100;
				}
				if ($row->n6 < 0)
				{
					$persen4=($row->n2 / abs($row->n6))*100;
				}
			}
		
			echo "<tr>
    <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
   <td  class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$kode_lokasi','$periode_rev');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td>			
     <td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_neraca','$kode_lokasi','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>
    <td  class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_neraca','$kode_lokasi','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td>
	<td  class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_neraca','$kode_lokasi','$periode');\">$n6</a>";
			}
			else
			{
				echo "$n6";
			}
			echo "</td>
   <td  class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $row->n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$kode_lokasi','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>

    <td  class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen4,0,',','.')."</td>
	<td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."</td>
  </tr>";
			$i=$i+1;
		}
	
	
		
		echo "</div>";
		return "";
	}
	
}
?>
