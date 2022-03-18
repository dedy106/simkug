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
function getBulan($bln)
	{
		$tmp="";
		switch ($bln) 
		{
			case "01":
				$tmp="Januari";
				break;
			case "02":
				$tmp="Februari";
				break;
			case "03":
				$tmp="Maret";
				break;
			case "04":
				$tmp="April";
				break;
			case "05":
				$tmp="Mei";
				break;
			case "06":
				$tmp="Juni";
				break;
			case "07":
				$tmp="Juli";
				break;
			case "08":
				$tmp="Agustus";
				break;
			case "09":
				$tmp="September";
				break;
			case "10":
				$tmp="Oktober";
				break;
			case "11":
				$tmp="November";
				break;
			case "12":
				$tmp="Desember";
				break;
		} 
		return $tmp;
	}
class server_report_saku3_gl_rptYptLabaRugiGarKonsol3 extends server_report_basic
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
		
		$tahun=substr($periode,0,4);
		$bln=substr($periode,5,2);
		$bulan=getBulan($bln);
		$tahun_rev=$tahun-1;
		if ($bln=="01")
		{
			$bulan_rev=getBulan($bln);
		}
		else
		{
			$bulan_rev=getBulan($bln-1);
		}
		
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,kode_induk,
					case jenis_akun when 'Pendapatan' then -n1 else n1 end as n1, 
					case jenis_akun when 'Pendapatan' then -n2 else n2 end as n2, 
				    case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
					case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
					case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
					case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
					case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
					case jenis_akun when  'Pendapatan' then -n9 else n9 end as n9
			from exs_neraca 
			where modul='L' and kode_lokasi='$kode_lokasi' and kode_fs='$kode_fs' and periode='$periode'  
			order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		echo "<br><div class='col-md-12'><div class='panel panel-primary'>
		<div class='panel-heading'>Laporan Laba Rugi Anggaran</div>
		<div class='panel-body'>
		
		";
		echo "<table class='table tree table-bordered table-striped table-condensed ' >
			<thead class='thead-light'>
				<tr class='info'>
	<td width='60' rowspan='2' align='center' class='header_laporan'>Kode</td>
    <td width='200' rowspan='2' align='center' class='header_laporan'>P&L ITEMS</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Budget $tahun</td>
	<td width='90' rowspan='2' align='center' class='header_laporan'>Actual $bulan_rev $tahun</td>
    <td colspan='4' align='center' class='header_laporan'>$bulan $tahun</td>
    <td width='90' rowspan='2' align='center' class='header_laporan'>Actual Ytd $bulan $tahun_rev</td>
    <td colspan='4' align='center' class='header_laporan'>Ytd $bulan $tahun</td>
  </tr>
  <tr class='info'>
    <td width='90' align='center' class='header_laporan'>Budget</td>
    <td width='90' align='center' class='header_laporan'>Actual</td>
    <td width='60' align='center' class='header_laporan'>Ach.</td>
    <td width='60' align='center' class='header_laporan'>MoM Growth</td>
    <td width='90' align='center' class='header_laporan'>Budget</td>
    <td width='90' align='center' class='header_laporan'>Actual</td>
    <td width='60' align='center' class='header_laporan'>Ach.</td>
    <td width='60' align='center' class='header_laporan'>YoY Growth</td>
  </tr>
			</thead>
			<tbody>
		";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$persen1=0;$persen2=0;$persen3=0;$persen4=0;
			if ($row->n7!=0)
			{
				$persen1=($row->n6/$row->n7)*100;
			}
			if ($row->n9!=0)
			{
				$persen2=((($row->n6-$row->n9)/abs($row->n9)))*100;
			}
			if ($row->n2!=0)
			{
				$persen3=($row->n4/$row->n2)*100;
			}
			if ($row->n5!=0)
			{
				$persen4=($row->n4-$row->n5)/$row->n5;
			}
			
			if ($row->kode_induk=="00")
			{
				echo "<tr class='treegrid-$row->kode_neraca'>
					<td>$row->kode_neraca</td>
					<td>$row->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,0,',','.')."%</td>
				 </tr>";
			}
			else
			{
				echo "<tr class='treegrid-$row->kode_neraca treegrid-parent-$row->kode_induk'>
					<td>$row->kode_neraca</td>
					<td>$row->nama</td>
					<td class='isi_laporan' align='right'>".number_format($row->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,0,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,0,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,0,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,0,',','.')."%</td>
				 </tr>";
			}
			if ($row->tipe=="Posting")
			{
				
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql="select a.kode_akun,c.nama,a.n1,a.n2,a.n3,a.n4,a.n5,a.n6,a.n7,a.n8,a.n9
					from exs_glma_gar a
					inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
					inner join masakun c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
					where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and a.periode='$periode' 
					order by a.kode_akun ";
				
				$rs1 = $dbLib->execute($sql);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					$persen1=0;$persen2=0;$persen3=0;$persen4=0;
					if ($row1->n7!=0)
					{
						$persen1=$row1->n6/$row1->n7;
					}
					if ($row1->n9!=0)
					{
						$persen2=(($row1->n6/$row1->n9)-1)*100;
					}
					if ($row1->n2!=0)
					{
						$persen3=$row1->n4/$row1->n2;
					}
					if ($row1->n5!=0)
					{
						$persen4=(($row1->n4/$row1->n5)-1)*100;
					}
					$kode_akun=$row->kode_neraca+"-"+$row1->kode_akun;
					echo "<tr class='treegrid-$kode_akun treegrid-parent-$row->kode_neraca'>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n1,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n9,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n7,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n6,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen1,2,',','.')."%</td>
					<td class='isi_laporan' align='center'>".number_format($persen2,2,',','.')."%</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n5,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n2,0,',','.')."</td>
					<td class='isi_laporan' align='right'>".number_format($row1->n4,0,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen3,2,',','.')."</td>
					<td class='isi_laporan' align='center'>".number_format($persen4,2,',','.')."</td>
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
