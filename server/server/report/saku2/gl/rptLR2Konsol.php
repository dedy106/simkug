<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptLR2Konsol extends server_report_basic
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
		$level_lap=$tmp[4];
		$periode2=$tmp[3];
		$nama_form=$tmp[5];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
				   case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2			from neraca_tmp 
			where modul='L' and nik_user='$nik_user' and level_lap<=$level_lap
			order by rowindex ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,"");
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='400' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td width='100' class='header_laporan'><div align='center'>".$AddOnLib->ubah_periode($periode)."</div></td>
<td width='100' class='header_laporan'><div align='center'>".$AddOnLib->ubah_periode($periode2)."</div></td>
<td width='100' class='header_laporan'><div align='center'>Difference</div></td>
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			$n1="";$n2="";$n3="";$n4="";$selisih="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$selisih=number_format($row->selisih,0,",",".");
			}
			
			echo "<tr>
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
    <td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n1 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTbKonsol('$row->kode_neraca','$row->kode_lokasi','$periode');\">$n1</a>";
			}
			else
			{
				echo "$n1";
			}
			echo "</td><td class='isi_laporan' align='right'>";
			if ($row->tipe=="Posting" && $n2 <> 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTbKonsol('$row->kode_neraca','$row->kode_lokasi','$periode2');\">$n2</a>";
			}
			else
			{
				echo "$n2";
			}
			echo "</td>
<td class='isi_laporan' align='right'>$selisih</td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
select a.kode_akun,a.nama,a.so_awal,a.debet-a.kredit as mutasi,a.so_akhir
from glma_tmp a
inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and nik_user='$nik_user' and so_akhir<>0
order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_awal=number_format($row1->so_awal,0,",",".");
					$mutasi=number_format($row1->mutasi,0,",",".");
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
<td class='detail_laporan'><div align='right'>$so_awal</div></td>
<td class='detail_laporan'><div align='right'>$mutasi</div></td>
<td class='detail_laporan'><div align='right'>$so_akhir</div></td>
  </tr>";
				}
			}
			$i=$i+1;
		}
		echo "<tr><td height='25' colspan='4' class='isi_laporan'>&nbsp;</td></tr>";
		
		echo "</table></div>";
		
		return "";
	}
	
}
?>
