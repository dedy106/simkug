<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
class server_report_budget_rptAggLrDc extends server_report_basic
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
		$tahun='2011';
		$lokasi="KONSOLIDASI NASIONAL";
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
		case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
		case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
		case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
		case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
		case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5,
		case jenis_akun when  'Pendapatan' then -n6 else n6 end as n6,
		case jenis_akun when  'Pendapatan' then -n7 else n7 end as n7,
		case jenis_akun when  'Pendapatan' then -n8 else n8 end as n8,
		case when n4<>0 then (n8-n4)/n4 else 0 end as growth 
from agg_neraca_tmp 
where modul='L' and nik_user='$nik_user' and level_lap<=$level_lap
order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//$html=$AddOnLib->judul_laporan("laporan arus kas",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN AKTIFITAS<br>TAHUN $tahun <br></div>$tanggal";
		echo "<div align='center'>$judul<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
  <td width='50' rowspan='2'  class='header_laporan'><div align='center'>Kode CF</div></td>
    <td width='250' rowspan='2'  class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td height='25' colspan='4' align='center' class='header_laporan'>TAHUN 2010</td>
    <td colspan='4' align='center' class='header_laporan'>RKA 2011</td>
    <td width='60' rowspan='2' class='header_laporan'><div align='center'>Growth</div></td>
    <td class='header_laporan'>&nbsp;</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='80' height='25' class='header_laporan'><div align='center'>Saldo Awal</div></td>
	 <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
	  <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
	   <td width='80' class='header_laporan'><div align='center'>Saldo Akhir</div></td>
	<td width='80' class='header_laporan'><div align='center'>Saldo Awal</div></td>
	 <td width='80' class='header_laporan'><div align='center'>Debet</div></td>
	  <td width='80' class='header_laporan'><div align='center'>Kredit</div></td>
	   <td width='80' class='header_laporan'><div align='center'>Saldo Akhir</div></td>
	
</tr>";
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			echo "<tr>
	<td height='20' class='isi_laporan' align='center'>$row->kode_neraca</td>	
    <td height='20' class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
	if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
	{
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n1,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n2,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n3,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n4,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n5,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n6,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n7,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->n8,0,",",".")."</div></td>";
		echo "<td class='isi_laporan'><div align='right'>".number_format($row->growth,2,",",".")."</div></td>";

	}
	else
	{
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
		echo "<td class='isi_laporan'><div align='right'>&nbsp;</div></td>";
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
				//echo $sql1;
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
			
		echo "</table></div>";
		
		return "";
	}
	
	
}
?>
