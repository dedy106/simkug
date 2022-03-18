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
class server_report_saku2_kopeg_ppbs_rptAggRkapOut extends server_report_basic
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
		$tahun=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$nama_form=$tmp[4];
		$lokasi=$tmp[5];
		$periode=$tmp[6];
		$tahun_rev=intval($tahun)-1;
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
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				case jenis_akun when  'Pendapatan' then -n0 else n0 end as n0,
				case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
				case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
				case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
				case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
				case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5
			from neraca_tmp 
			where nik_user='$nik_user' and level_lap<=$level_lap
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan("LAPORAN OUTLOOK ANGGARAN LABARUGI",$this->lokasi,"TAHUN $tahun");
		
		echo "<table border='0' cellspacing='2' cellpadding='1'>
  <tr>
    <td><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
		  <tr align='center' bgcolor='#CCCCCC'>
			<td width='500' height='25'  class='header_laporan'>Deskripsi</td>
			<td width='90' class='header_laporan'>PENETAPAN RKA $tahun_rev</td>
			<td width='90' class='header_laporan'>RKA setelah RRA / ABT $tahun_rev</td>
			<td width='90' class='header_laporan'>Selisih (-/+)</td>
			
    <td width='90' class='header_laporan'>REALISASI S.D $bulan $tahun_rev</td>
    <td width='90' class='header_laporan'>ESTIMASI $tahun_rev</td>
    <td width='90' class='header_laporan'>OUTLOOK RKA $tahun_rev</td>
<td width='90' class='header_laporan'>USULAN RKA TAHUN $tahun</td>
    <td width='60' class='header_laporan'>%</td>
    <td width='60' class='header_laporan'>%</td>
   
		</tr>
		  <tr align='center' bgcolor='#CCCCCC'>
		    <td height='25'  class='header_laporan'>1</td>
		    <td class='header_laporan'>2</td>
			 <td class='header_laporan'>2a</td>
			 <td class='header_laporan'>2b=2a-2</td>
			
		    <td class='header_laporan'>3</td>
		    <td class='header_laporan'>4</td>
		    <td class='header_laporan'>5</td>
		    <td class='header_laporan'>6</td>
		    <td class='header_laporan'>7=5/2</td>
		    <td class='header_laporan'>8=6/5</td>
  </tr>
";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="'";
			$persen2="'";$persen3="'";
			if ($row->n0 > 0)
			{
				$persen1=($row->n4 *100 )/ $row->n0;
			}
			if ($row->n3 > 0)
			{
				$persen2=($row->n4 *100 )/ $row->n3;
			}
			if ($row->n5-$row->n0 > 0)
			{
				$persen3=($row->n5-$row->n0 *100 )/ $row->n5;
			}
			echo "<tr><td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n0 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
				 <td class='isi_laporan' align='right'>".number_format($row->n0,0,',','.')."</td>
				 <td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
				 <td class='isi_laporan' align='right'>".number_format($row->n5-$row->n0,0,',','.')."</td>
				
				 <td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n3,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
  <td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."</td>
  <td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."</td>
 			  </tr>";
			
			
			$i=$i+1;
		}
		echo "</table></td>
  </tr>
  
</table>";
		
		echo "</div>";
		return "";
	}
	
}
?>
