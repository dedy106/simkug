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
class server_report_saku3_gl_rptYptLabaRugiKonsol3 extends server_report_basic
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
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$kode_fs=$tmp[2];
		$bentuk=$tmp[3];
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,kode_induk,tipe,
				   case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4
			from exs_neraca 
			where modul='L' and kode_lokasi='$kode_lokasi' and kode_fs='$kode_fs' and periode='$periode' 
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<br><div class='col-md-10 col-md-offset-1'><div class='panel panel-primary'>
		<div class='panel-heading'>Laporan Laba Rugi</div>
		<div class='panel-body'>
		
		";
		echo "<table class='table tree table-bordered table-striped table-condensed ' >
			<thead class='thead-light'>
				<tr>
				  <th >Kode</th>
				  <th >Keterangan</th>
				  <th align='right'>Nilai</th>
				</tr>
			</thead>
			<tbody>
		";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($row->kode_induk=="00")
			{
				echo "<tr class='treegrid-$row->kode_neraca'>
					<td>$row->kode_neraca</td>
					<td>$row->nama</td>
					<td align='right'>".number_format($row->n4,0,',','.')."</td>
				 </tr>";
			}
			else
			{
				echo "<tr class='treegrid-$row->kode_neraca treegrid-parent-$row->kode_induk'>
					<td>$row->kode_neraca</td>
					<td>$row->nama</td>
					<td align='right'>".number_format($row->n4,0,',','.')."</td>
				 </tr>";
			}
			if ($row->tipe=="Posting")
			{
				
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,c.nama,case when c.jenis='Pendapatan' then -a.so_akhir else a.so_akhir end as so_akhir
					from exs_glma a
					inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
					where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' and so_akhir<>0
					order by a.kode_akun ";
				
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{
					$kode_akun=$row->kode_neraca+"-"+$row1->kode_akun;
					echo "<tr class='treegrid-$kode_akun treegrid-parent-$row->kode_neraca'>
					<td>$row1->kode_akun</td>
					<td>$row1->nama</td>
					<td align='right'>".number_format($row1->so_akhir,0,',','.')."</td>
				 </tr>";
				}
			}
		}
		echo "</tbody></table>";
		echo "</div></div></div>";
		return "";
	}
	
}
?>
