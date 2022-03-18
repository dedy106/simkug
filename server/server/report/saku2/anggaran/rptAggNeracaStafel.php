<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_anggaran_rptAggNeracaStafel extends server_report_basic
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
		$level_lap=$tmp[2];
		$bentuk=$tmp[3];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n4,n8,level_spasi,case when n4<>0 then ((n8-n4)/n4)*100 else 0 end as growth 
from agg_neraca_tmp 
where modul='A' and nik_user='$nik_user' and level_lap<=$level_lap 
order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan posisi keuangan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "$html";
		echo "<div align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='400' height='25'  class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td width='100' class='header_laporan'><div align='center'>TAHUN 2011</div></td>
	<td width='100' class='header_laporan'><div align='center'>RKA 2012</div></td>
	<td width='60' class='header_laporan'><div align='center'>GROWTH</div></td>
</tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
	if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
	{
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->growth,2,",",".")."</div></td>";

	}
	else
	{
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
	}
		
		echo "</tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,a.nama,isnull(b.so_awal,0)+isnull(c.so_awal_mutasi,0)+isnull(d.debet,0)-isnull(d.kredit,0) as so_akhir
    from agg_masakun a
	 left join (select kode_akun,so_akhir as so_awal
               from agg_glma
               where (kode_lokasi between '$kode_lokasi' and '$kode_lokasi') and substring(periode,1,4)=substring('$periode',1,4) and periode='$periode'
              )b on a.kode_akun=b.kode_akun
	inner join agg_relakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
    left join (select kode_akun,sum(case when dc='D' then nilai else -nilai end) so_awal_mutasi
               from agg_gldt
               where periode<'$periode' and (kode_lokasi between '$kode_lokasi' and '$kode_lokasi') and substring(periode,1,4)=substring('$periode',1,4)
               group by kode_akun) c on a.kode_akun=c.kode_akun
    left join  (select x.kode_akun,sum(case when x.dc='D' then x.nilai else 0 end) as debet,
                       sum(case when x.dc='C' then x.nilai else 0 end) as kredit
                from (select kode_lokasi,kode_akun,dc,nilai 
		      from agg_gldt 
		      where periode='$periode' and (kode_lokasi between '$kode_lokasi' and '$kode_lokasi') and substring(periode,1,4)=substring('$periode',1,4)
                     ) x
                group by x.kode_akun) d on a.kode_akun=d.kode_akun
    where a.kode_lokasi='$kode_lokasi' and e.kode_neraca='$kode_neraca' and e.kode_fs='$kode_fs' and (isnull(b.so_awal,0)+isnull(c.so_awal_mutasi,0)+isnull(d.debet,0)-isnull(d.kredit,0))<>0 order by a.kode_akun";

 
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
    <td class='detail_laporan'><div align='right'>$so_akhir</div></td>
	<td class='detail_laporan'><div align='right'>0</div></td>
	<td class='detail_laporan'><div align='right'>0</div></td>
  </tr>";
				}
			}
			$i=$i+1;
		}
		echo "<tr><td height='25' colspan='2' class='isi_laporan'>&nbsp;</td></tr>";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,n4*-1 as n4,n8*-1 as n8 ,level_spasi,case when n4<>0 then (n8-n4)/n4 else 0 end as growth 
from agg_neraca_tmp  
where modul='P' and nik_user='$nik_user' and level_lap<=$level_lap 
order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			
			echo "<tr><td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				echo "<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,",",".")."</div></td>";
				echo "<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,",",".")."</div></td>";
				echo "<td class='isi_laporan'><div align='right'>".number_format($row->growth,2,",",".")."</div></td>";

			}
			else
			{
				echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
				echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
				echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
			}
			echo "</tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,a.nama,isnull(b.so_awal,0)+isnull(c.so_awal_mutasi,0)+isnull(d.debet,0)-isnull(d.kredit,0) as so_akhir
    from agg_masakun a
	 left join (select kode_akun,so_akhir as so_awal
               from agg_glma
               where (kode_lokasi between '$kode_lokasi' and '$kode_lokasi') and substring(periode,1,4)=substring('$periode',1,4) and periode='$periode'
              )b on a.kode_akun=b.kode_akun
	inner join agg_relakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
    left join (select kode_akun,sum(case when dc='D' then nilai else -nilai end) so_awal_mutasi
               from agg_gldt
               where periode<'$periode' and (kode_lokasi between '$kode_lokasi' and '$kode_lokasi') and substring(periode,1,4)=substring('$periode',1,4)
               group by kode_akun) c on a.kode_akun=c.kode_akun
    left join  (select x.kode_akun,sum(case when x.dc='D' then x.nilai else 0 end) as debet,
                       sum(case when x.dc='C' then x.nilai else 0 end) as kredit
                from (select kode_lokasi,kode_akun,dc,nilai 
		      from agg_gldt 
		      where periode='$periode' and (kode_lokasi between '$kode_lokasi' and '$kode_lokasi') and substring(periode,1,4)=substring('$periode',1,4)
                     ) x
                group by x.kode_akun) d on a.kode_akun=d.kode_akun
    where a.kode_lokasi='$kode_lokasi' and e.kode_neraca='$kode_neraca' and e.kode_fs='$kode_fs' and (isnull(b.so_awal,0)+isnull(c.so_awal_mutasi,0)+isnull(d.debet,0)-isnull(d.kredit,0))<>0 order by a.kode_akun";

				error_log($sql1);
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
    <td class='detail_laporan'><div align='right'>$so_akhir</div></td>
	<td class='detail_laporan'><div align='right'>0</div></td>
	<td class='detail_laporan'><div align='right'>0</div></td>
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
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$nama="000 - Nilai Laporan Labarugi";
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
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
