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
class server_report_saku2_gl_rptNeracaMutasiDc extends server_report_basic
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
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$bentuk=$tmp[4];
		$level_lap=$tmp[5];
		$nama_form=$tmp[6];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n1,n2,n3,n4,level_spasi from neraca_tmp where modul='A' and level_lap<=$level_lap and nik_user='$nik_user' order by rowindex ";
		$rs = $dbLib->execute($sql);
		$i = 1;
		$resource = $_GET["resource"];
		$fullId = $_GET["fullId"];
		$AddOnLib=new server_util_AddOnLib();
		echo "<div align='center'>";
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='400' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td width='100' class='header_laporan'><div align='center'>So Awal</div></td>
<td width='100' class='header_laporan'><div align='center'>Debet</div></td>
<td width='100' class='header_laporan'><div align='center'>Kredit</div></td>
<td width='100' class='header_laporan'><div align='center'>So Akhir</div></td>
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			$n1="";$n2="";$n3="";$n4="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
			}
			
			echo "<tr>
    <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n4 > 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
    <td class='isi_laporan'><div align='right'>$n1</div></td>
<td class='isi_laporan'><div align='right'>$n2</div></td>
<td class='isi_laporan'><div align='right'>$n3</div></td>
<td class='isi_laporan'><div align='right'>$n4</div></td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
select a.kode_akun,a.nama,a.so_awal,a.debet,a.kredit,a.so_akhir
from glma_tmp a
inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and nik_user='$nik_user' and so_akhir<>0
order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_awal=number_format($row1->so_awal,0,",",".");
					$debet=number_format($row1->debet,0,",",".");
					$kredit=number_format($row1->kredit,0,",",".");
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
<td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
<td class='detail_laporan'><div align='right'>$so_awal</div></td>
<td class='detail_laporan'><div align='right'>$debet</div></td>
<td class='detail_laporan'><div align='right'>$kredit</div></td>
<td class='detail_laporan'><div align='right'>$so_akhir</div></td>
  </tr>";
				}
			}
			$i=$i+1;
		}
		echo "<tr><td height='25' colspan='2' class='isi_laporan'>&nbsp;</td></tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,jenis_akun,-n1 as n1,-n2 as n2,-n3 as n3,-n4 as n4,level_spasi from neraca_tmp where modul='P' and nik_user='$nik_user' order by rowindex ";

		error_log($sql);
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai="";
			$n1="";$n2="";$n3="";$n4="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
			}
			echo "<tr>
    <td height='20' class='isi_laporan'>";
			echo fnSpasi($row->level_spasi);
			if ($row->tipe=="Posting" && $row->n4 > 0)
			{
				echo "<a style='cursor:pointer;color:blue' onclick=\"window.parent.system.getResource(".$resource.").doOpenTb('$row->kode_neraca','$row->kode_lokasi');\">$row->nama</a>";
			}
			else
			{
				echo "$row->nama";
			}
			echo "</td>
    <td class='isi_laporan'><div align='right'>$n1</div></td>
<td class='isi_laporan'><div align='right'>$n2</div></td>
<td class='isi_laporan'><div align='right'>$n3</div></td>
<td class='isi_laporan'><div align='right'>$n4</div></td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
select a.kode_akun,a.nama,a.so_awal,a.debet,a.kredit,a.so_akhir
from glma_tmp a
inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
where b.kode_fs='$kode_fs' and b.kode_lokasi='$kode_lokasi' and b.kode_neraca='$kode_neraca' and nik_user='$nik_user' and so_akhir<>0
order by a.kode_akun ";
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_awal=number_format($row1->so_awal,0,",",".");
					$debet=number_format($row1->debet,0,",",".");
					$kredit=number_format($row1->kredit,0,",",".");
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
<td class='detail_laporan'><div align='right'>$so_awal</div></td>
<td class='detail_laporan'><div align='right'>$debet</div></td>
<td class='detail_laporan'><div align='right'>$kredit</div></td>
<td class='detail_laporan'><div align='right'>$so_akhir</div></td>
  </tr>";
				}
			}
			if ($bentuk=="Detail" && $row->tipe=="Posting" && $row->jenis_akun=="Labarugi")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select ifnull(sum(a.so_awal),0) as so_awal, ifnull(sum(a.debet),0) as debet, ifnull(sum(a.Kredit),0) as Kredit, 
ifnull(sum(a.so_akhir),0) as so_akhir  
                 from glma_tmp a
                 inner join relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
                 inner join neraca c on b.kode_neraca=c.kode_neraca and b.kode_fs=c.kode_fs and a.kode_lokasi=c.kode_lokasi
		         where c.modul='L' and a.periode='$periode' and b.kode_lokasi='$kode_lokasi' and nik_user='$nik_user' and so_akhir<>0 ";
				$rs1 = $dbLib->execute($sql1);
				$so_awal=0;$mutasi=0;$so_akhir=0;
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_awal=number_format($row1->so_awal,0,",",".");
					$debet=number_format($row1->debet,0,",",".");
					$kredit=number_format($row1->kredit,0,",",".");
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama="000 - Nilai Laporan Labarugi";
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
<td class='detail_laporan'><div align='right'>$so_awal</div></td>
<td class='detail_laporan'><div align='right'>$debet</div></td>
<td class='detail_laporan'><div align='right'>$kredit</div></td>
<td class='detail_laporan'><div align='right'>$so_akhir</div></td>
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
