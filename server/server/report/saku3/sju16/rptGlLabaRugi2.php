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
		
		$sql = "select a.kode_neraca,a.kode_fs,a.kode_lokasi,a.nama,a.tipe,a.level_spasi,
				   case a.jenis_akun when  'Pendapatan' then -a.n1 else a.n1 end as n1,
				   case a.jenis_akun when  'Pendapatan' then -a.n2 else a.n2 end as n2,
				   case a.jenis_akun when  'Pendapatan' then -a.n3 else a.n3 end as n3,
				   case a.jenis_akun when  'Pendapatan' then -a.n4 else a.n4 end as n4,
				   case a.jenis_akun when  'Pendapatan' then -a.n5 else a.n5 end as n5
			from exs_neraca a 
			$this->filter and a.modul='L'
			order by a.rowindex ";
		
		$rs = $dbLib->execute($sql);		
		
		$i=1;
		echo "<div class='container-fluid'>";
		echo "	<div class='row'>
					<div class='col-md-12 text-center'>$this->lokasi</div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'><h4>LABA / RUGI</h4></div>
				</div>
				<div class='row'>
					<div class='col-md-12 text-center'>$nama_periode</div>
				</div>";
		echo "<table class='table table-hover'>
				<thead>
				  <tr>
					<th class='col-md-5'>URAIAN</th>
					<th class='col-md-1'>ANGGARAN TAHUN $tahun (RKAP)</th>
					<th class='col-md-1'>ANGGARAN s/d TW $tw TAHUN $tahun</th>
					<th class='col-md-1'>REALISASI S/D $bulan $tahun</th>
					<th class='col-md-1'>REALISASI  S/D $bulan $tahun_rev</th>
					<th class='col-md-1'>&nbsp;</th>
					<th class='col-md-1'>( % ) TASE</th>
					<th class='col-md-1'>&nbsp;</th>
				  </tr>
				  </tr>
				   <tr >
						<td width='90' >&nbsp;</td>
						<td width='90' >(1)</td>
						<td width='90' >(2)</td>
						<td width='90' >(3)</td>
						<td width='90' >(4)</td>
						<td width='50' >(3/1)</td>
						<td width='50' >(3/2)</td>
						<td width='50' >(3/4)</td>
				  </tr>
				</thead>
				<tbody>
				  
				";
		
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1="'";$persen2="'";$persen3="'";
			$n2="";	$n3="";	$n4="";	$n5="";
			if ($row->tipe!="Header" && $row->nama!="." )
			{
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				if ($row->n2 > 0)
				{
					$persen1=($row->n4 *100 )/ $row->n2;
				}
				if ($row->n3 > 0)
				{
					$persen2=($row->n4 *100 )/ $row->n3;
				}
				if ($row->n5 > 0)
				{
					$persen3=($row->n4 *100 )/ $row->n5;
				}
			}
		
			echo "<tr>
			<td >";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>
			<td class='text-right'>";
			if ($row->tipe=="Posting" && $row->n4 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_neraca','$kode_lokasi','$periode');\">$n4</a>";
			}
			else
			{
				echo "$n4";
			}
			echo "</td>
			<td class='text-right' >";
			if ($row->tipe=="Posting" && $row->n5 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenGar('$row->kode_neraca','$kode_lokasi','$periode');\">$n5</a>";
			}
			else
			{
				echo "$n5";
			}
			echo "</td>
			<td class='text-right' >";
			if ($row->tipe=="Posting" && $row->n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$kode_lokasi','$periode');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>
			<td class='text-right' >";
			if ($row->tipe=="Posting" && $row->n3 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$kode_lokasi','$periode_rev');\">$n3</a>";
			}
			else
			{
				echo "$n3";
			}
			echo "</td>
			<td class='text-right' >".number_format($persen1,0,',','.')."</td>
			<td class='text-right'>".number_format($persen2,0,',','.')."</td>
			<td class='text-right'>".number_format($persen3,0,',','.')."</td>
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
