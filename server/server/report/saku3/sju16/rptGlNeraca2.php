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
		$tmp=explode("/",$this->filter);
		$filter=$tmp[0];
		$urut=$tmp[1];
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
		$AddOnLib=new server_util_AddOnLib();	
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$jenis_pp=$tmp[2];
		$kode_pp=$tmp[3];
		$jenis_mutasi=$tmp[4];
		$jenis_lap=$tmp[5];
		
		$nama_periode="Periode ".$AddOnLib->ubah_periode($periode);
		
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
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		
		$sql = "select a.kode_neraca1,a.kode_neraca2,a.nama1,a.nama2,a.nilai1,a.nilai2,a.nilai3,a.nilai4,a.nilai5,a.nilai6,
					a.level_spasi1,a.level_spasi2,a.tipe1,a.tipe2
				from exs_neraca_skontro a
				$this->filter
				order by rowindex ";
		$rs = $dbLib->execute($sql);		
		
		$i=1;
		echo "<div class='container-fluid'>";
		echo "	<div class='row'>
					<div class='col-md-12 text-center'>$this->lokasi</div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'><h4>POSISI KEUANGAN</h4></div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'>$nama_periode</div>
				</div>";
		echo "<table class='table table-hover'>
				<thead>
				  <tr>
					<th class='col-md-3'>URAIAN</th>
					<th class='col-md-1'>REALISASI S/D $bulan $tahun</th>
					<th class='col-md-1'>REALISASI  S/D $bulan $tahun_rev</th>
					<th class='col-md-1'>GROWTH</th>
					<th class='col-md-3'>URAIAN</th>
					<th class='col-md-1'>REALISASI S/D $bulan $tahun</th>
					<th class='col-md-1'>REALISASI  S/D $bulan $tahun_rev</th>
					<th class='col-md-1'>GROWTH</th>
					
				  </tr>
				  </tr>
				   <tr >
					<th >(1)</td>
					<th >(2)</td>
					<th >(3)</td>
					<th >(2/3)</td>
					<th >(1)</td>
					<th >(2)</td>
					<th >(3)</td>
					<th>(2/3)</td>
				 
				  </tr>
				</thead>
				<tbody>
				  
				";
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai2=number_format($row->nilai2,0,",",".");
			$nilai3=number_format($row->nilai3,0,",",".");
			$nilai5=number_format($row->nilai5,0,",",".");
			$nilai6=number_format($row->nilai6,0,",",".");
				
			$persen1=0; $persen1=0;
			if ($row->nilai3 > 0)
			{
				$persen1=(($row->nilai2+(-$row->nilai3)) / $row->nilai3)*100;
			}
			if ($row->nilai3 < 0)
			{
				$persen1=(($row->nilai2+(-$row->nilai3)) / -$row->nilai3)*100;
			}
			if ($row->nilai6 > 0)
			{
				$persen2=(($row->nilai5+(-$row->nilai6)) / $row->nilai6)*100;
			}
			if ($row->nilai6 < 0)
			{
				$persen2=(($row->nilai5+(-$row->nilai6)) / -$row->nilai6)*100;
			}
				
			echo "<tr>
				<td >";
			echo fnSpasi($row->level_spasi1);
			echo "$row->nama1</td>
				<td class='text-right'>";
			if ($row->tipe1=="Posting" && $row->nilai2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$kode_lokasi','$periode');\">$nilai2</a>";
			}
			else
			{
				echo "$nilai2";
			}
			echo "</td>
				<td class='text-right'>";
			if ($row->tipe1=="Posting" && $row->nilai3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca1','$kode_lokasi','$periode_rev');\">$nilai3</a>";
			}
			else
			{
				echo "$nilai3";
			}
			echo "</td>
				<td class='text-right'>".number_format($persen1,0,',','.')."</td>
				<td>";
			echo fnSpasi($row->level_spasi2);
			echo "$row->nama2</td>
				<td class='text-right'>";
			if ($row->tipe2=="Posting" && $row->nilai5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$kode_lokasi','$periode');\">$nilai5</a>";
			}
			else
			{
				echo "$nilai5";
			}
			echo "</td>
				<td class='text-right'>";
			if ($row->tipe2=="Posting" && $row->nilai6 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca2','$kode_lokasi','$$periode_rev');\">$nilai6</a>";
			}
			else
			{
				echo "$nilai6";
			}
			echo "</td>
				<td class='text-right'>".number_format($persen2,0,',','.')."</td>
			  </tr>";
			
			$i=$i+1;
		}
		
		
		echo "</tbody>
			</table>	
			</div>";
		return "";
		
	}
	
}
?>
