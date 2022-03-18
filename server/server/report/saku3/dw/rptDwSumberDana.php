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
class server_report_saku3_dw_rptDwSumberDana extends server_report_basic
{
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select 1";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$kode_lokasi=$tmp[0];
		$periode=$tmp[1];
		$bentuk=$tmp[2];
		$jenis=$tmp[3];
		
		$tahun=substr($periode,0,4);
		$tahun_rev=substr($periode,0,4)-1;
		$tahun_rev2=substr($periode,0,4)-2;
		$tahun_rev3=substr($periode,0,4)-3;
		$tahun_rev4=substr($periode,0,4)-4;
		if ($jenis=="Periode Aktif")
		{
			$periode_rev=$tahun_rev.substr($periode,4,2);
			$periode_rev2=$tahun_rev2.substr($periode,4,2);
			$periode_rev3=$tahun_rev3.substr($periode,4,2);
			$periode_rev4=$tahun_rev4.substr($periode,4,2);
		}
		else
		{
			$periode_rev=$tahun_rev."15";
			$periode_rev2=$tahun_rev2."15";
			$periode_rev3=$tahun_rev3."15";
			$periode_rev4=$tahun_rev4."15";
		}
		
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$judul1=$AddOnLib->ubah_periode($periode);
		$judul2=$AddOnLib->ubah_periode($periode_rev);
		$judul3=$AddOnLib->ubah_periode($periode_rev2);
		$judul4=$AddOnLib->ubah_periode($periode_rev3);
		$judul5=$AddOnLib->ubah_periode($periode_rev4);
		echo "<div align='center'>"; 
		echo $AddOnLib->judul_laporan("laporan sumber dana",$this->lokasi,"");
		echo "<table  border='1' cellpadding='0' cellspacing='0' class='kotak' >
    <tr bgcolor='#CCCCCC'>
    <td width='300' height='25'  class='header_laporan' align='center'>Keterangan</td>
    <td width='100' class='header_laporan' align='center'>$judul5</td>
	<td width='100' class='header_laporan' align='center'>$judul4</td>
	<td width='100' class='header_laporan' align='center'>$judul3</td>
	<td width='100' class='header_laporan' align='center'>$judul2</td>
	<td width='100' class='header_laporan' align='center'>$judul1</td>
    </tr>
	";
		$sql = "select a.kode_neraca,a.nama,a.level_spasi,a.tipe,a.kode_lokasi,a.tipe,a.kode_fs,
		ISNULL(case a.jenis_akun when  'Pendapatan' then -b.n4 else b.n4 end,0) as n1,
		ISNULL(case a.jenis_akun when  'Pendapatan' then -c.n4 else c.n4 end,0) as n2,
		ISNULL(case a.jenis_akun when  'Pendapatan' then -d.n4 else d.n4 end,0) as n3,
		ISNULL(case a.jenis_akun when  'Pendapatan' then -e.n4 else e.n4 end,0) as n4,
		ISNULL(case a.jenis_akun when  'Pendapatan' then -f.n4 else f.n4 end,0) as n5
from neraca a
left join exs_neraca b on a.kode_neraca=b.kode_neraca and a.kode_lokasi=b.kode_lokasi and a.kode_fs=b.kode_fs and b.periode='$periode'
left join exs_neraca c on a.kode_neraca=c.kode_neraca and a.kode_lokasi=c.kode_lokasi and a.kode_fs=c.kode_fs and c.periode='$periode_rev'
left join exs_neraca d on a.kode_neraca=d.kode_neraca and a.kode_lokasi=d.kode_lokasi and a.kode_fs=d.kode_fs and d.periode='$periode_rev2'
left join exs_neraca e on a.kode_neraca=e.kode_neraca and a.kode_lokasi=e.kode_lokasi and a.kode_fs=e.kode_fs and e.periode='$periode_rev3'
left join exs_neraca f on a.kode_neraca=f.kode_neraca and a.kode_lokasi=f.kode_lokasi and a.kode_fs=f.kode_fs and f.periode='$periode_rev4'
$this->filter and a.modul='L' 
order by a.rowindex ";
		
		$rs = $dbLib->execute($sql);	
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1="";$n2="";$n3="";$n4="";$n5="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
			}
			echo "<tr>
    
      <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			echo $row->nama;
			echo "</td>";
			
			if ($row->tipe=="Posting")
			{
		
			echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode_rev4','$row->kode_neraca');\">$n5</a>";
			echo "</td>
		<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode_rev3','$row->kode_neraca');\">$n4</a>";
			echo "</td>";
			echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode_rev2','$row->kode_neraca');\">$n3</a>";
			echo "</td>
		<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode_rev','$row->kode_neraca');\">$n2</a>";
			echo "</td>";
			echo "<td class='isi_laporan' align='right'>";
			echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_lokasi','$periode','$row->kode_neraca');\">$n1</a>";
			echo "</td>";
			}
			else
			{
			
			echo "<td class='isi_laporan' align='right'>$n5</td>
			<td class='isi_laporan' align='right'>$n4</td>
			<td class='isi_laporan' align='right'>$n3</td>
			<td class='isi_laporan' align='right'>$n2</td>
			<td class='isi_laporan' align='right'>$n1</td>";
			}
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,g.nama,
					ISNULL(b.so_akhir,0) as n1,ISNULL(c.so_akhir,0) as n2,ISNULL(d.so_akhir,0) as n3,
					ISNULL(e.so_akhir,0) as n4,ISNULL(f.so_akhir,0) as n5
					from relakun a
					left join exs_glma b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi and b.periode='$periode'
					left join exs_glma c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi and c.periode='$periode_rev'  
					left join exs_glma d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi and d.periode='$periode_rev2'
					left join exs_glma e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi and e.periode='$periode_rev3'
					left join exs_glma f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi and f.periode='$periode_rev4'
					inner join masakun g on a.kode_akun=g.kode_akun and a.kode_lokasi=g.kode_lokasi
					where a.kode_fs='$kode_fs' and a.kode_lokasi='$kode_lokasi' and a.kode_neraca='$kode_neraca'
					order by a.kode_akun";
				$rs1 = $dbLib->execute($sql1);
				
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
					<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n5,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n4,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n3,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n2,0,",",".")."</td>
					<td class='detail_laporan' align='right'>".number_format($row1->n1,0,",",".")."</td>
				  </tr>";
				}
			}
			$i=$i+1;
		}
		
		echo "</table></div>";
		return "";
	}
	
	
}
?>
