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
class server_report_saku3_sju16_rptGlArusKas extends server_report_basic
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
		$kode_lokasi2=$tmp[3];
		$kode_fs=$tmp[4];
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
		$sql="exec sp_aruskas_sju '$kode_lokasi','$kode_fs','$periode','$nik_user'";
		
		$rs = $dbLib->execute($sql);		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi, 
					   case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
					   case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2
			from neraca_tmp 
			where nik_user='$nik_user' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$AddOnLib=new server_util_AddOnLib();
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan arus kas",$this->lokasi,"Periode ".$AddOnLib->ubah_periode($periode));
		
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr align='center' bgcolor='#dbeef3'>
   <td width='50' class='header_laporan' >KODE</td>
    <td width='300' class='header_laporan' >URAIAN</td>
    <td width='90' class='header_laporan'>REALISASI  S/D $bulan $tahun_rev</td>	
    <td width='90' class='header_laporan'>REALISASI S/D $bulan $tahun</td>
    <td width='50' class='header_laporan'>GROWTH</td>
  </tr>
 ";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="";$persen2="";$persen3="";
			$n1="";	
			if ($row->tipe!="Header" && $row->nama!="." )
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				
			}
			if ($row->n2 > 0)
			{
				
			}
			echo "<tr>
			<td class='isi_laporan' align='center'>$row->kode_neraca</td>
    <td class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo "$row->nama";
			
			echo "</td>
     <td valign='top' class='isi_laporan' align='right'>$n2</td>";
     
			if ($row->tipe=="Posting" && $row->n1 <> 0)
			{
				echo "<td valign='top' class='isi_laporan' align='right'><a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$n1</a></td>";
			}
			else
			{
				echo "<td valign='top' class='isi_laporan' align='right'>$n1</td>";
			}
		echo "<td valign='top' class='isi_laporan' align='right'>$persen1</td>
  </tr>";
			$i=$i+1;
		}
	
	
		
		echo "</table></div>";
		return "";
	}
	
}
?>
