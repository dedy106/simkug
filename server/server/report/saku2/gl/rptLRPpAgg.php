<?php
uses("server_DBConnection_dbLib");
uses("server_report_basic");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("mssql");
class server_report_saku2_gl_rptLRPpAgg extends server_report_basic
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
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$level_lap=$tmp[3];
		$nama_form=$tmp[4];
		$sql = "select kode_neraca,kode_fs,kode_lokasi,nama,tipe,level_spasi,
       case jenis_akun when  'Pendapatan' then -n1 else n1 end as n1,
       case jenis_akun when  'Pendapatan' then -n2 else n2 end as n2,
       case jenis_akun when  'Pendapatan' then -n3 else n3 end as n3,
       case jenis_akun when  'Pendapatan' then -n4 else n4 end as n4,
	   case jenis_akun when  'Pendapatan' then -n5 else n5 end as n5	
from neraca_tmp 
where modul='L' and nik_user='$nik_user' and level_lap<=$level_lap
order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		echo "<div align='center'>";
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan($nama_form,$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td width='300' rowspan='2' class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td colspan='3' class='header_laporan'><div align='center'>Target</div></td>
    <td colspan='2' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='100' rowspan='2' class='header_laporan'><div align='center'>Deviasi</div></td>
    <td width='30' class='header_laporan'><div align='center'>%</div></td>
    <td width='30' class='header_laporan'><div align='center'>%</div></td>
  </tr>
  <tr>
    <td width='100' class='header_laporan'><div align='center'>Tahun Ini </div></td>
    <td width='100' class='header_laporan'><div align='center'>Bulan Ini </div></td>
    <td width='100' class='header_laporan'><div align='center'>S/D Bulan Ini</div></td>
    <td width='100' class='header_laporan'><div align='center'>Bulan Ini </div></td>
    <td width='100' class='header_laporan'><div align='center'>S/D Bulan Ini </div></td>
    <td class='header_laporan'><div align='center'>6/2</div></td>
    <td class='header_laporan'><div align='center'>6/4</div></td>
  </tr>
  <tr>
    <td class='header_laporan'><div align='center'>1</div></td>
    <td class='header_laporan'><div align='center'>2</div></td>
    <td class='header_laporan'><div align='center'>3</div></td>
    <td class='header_laporan'><div align='center'>4</div></td>
    <td class='header_laporan'><div align='center'>5</div></td>
    <td class='header_laporan'><div align='center'>6</div></td>
    <td class='header_laporan'><div align='center'>7</div></td>
    <td class='header_laporan'><div align='center'>8</div></td>
    <td class='header_laporan'><div align='center'>9</div></td>
  </tr>";
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
				$deviasi=number_format($row->n1-$row->n5,0,",",".");
				if ($row->n1!=0)
				{$persen1=number_format(($row->n5/$row->n1)*100,0,",",".");}
				if ($row->n3!=0)
				{$persen2=number_format(($row->n5/$row->n3)*100,0,",",".");}
			}
			echo "<tr >
    <td  class='isi_laporan'>".$AddOnLib->spasi($row->nama,$row->level_spasi+1)."</td>
    <td height='23' class='isi_laporan'><div align='right'>$n1</div></td>
    <td class='isi_laporan'><div align='right'>$n2</div></td>
    <td class='isi_laporan'><div align='right'>$n3</div></td>
    <td class='isi_laporan'><div align='right'>$n4</div></td>
    <td class='isi_laporan'><div align='right'>$n5</div></td>
    <td class='isi_laporan'><div align='right'>$deviasi</div></td>
<td class='isi_laporan'><div align='center'>$persen1</div></td>
<td class='isi_laporan'><div align='center'>$persen2</div></td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$bulan=substr($periode,4,2);
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="
select a.kode_akun,a.nama,
case when a.jenis='Pendapatan' then ifnull(b.agg_thn,0)*-1 else ifnull(b.agg_thn,0) end as agg_thn,
case when a.jenis='Pendapatan' then ifnull(b.agg_bln,0)*-1 else ifnull(b.agg_bln,0) end as agg_bln,
case when a.jenis='Pendapatan' then ifnull(b.agg_sd,0)*-1 else ifnull(b.agg_sd,0) end as agg_sd,
       ifnull(c.mutasi,0) as mutasi,ifnull(c.so_akhir,0) as so_akhir
from masakun a
inner join relakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
inner join (select z.kode_akun,y.nama,y.kode_lokasi
	       , sum(case when substring(x.periode,5,2) between '01' and '12' then (case when y.jenis='Pendapatan' then nilai*-1 else nilai end) else 0 end ) as agg_thn
	       , sum(case when substring(x.periode,5,2) between '$bulan' and '$bulan' then (case when y.jenis='Pendapatan' then nilai*-1 else nilai end) else 0 end ) as agg_bln
	       , sum(case when substring(x.periode,5,2) between '01' and '$bulan' then (case when y.jenis='Pendapatan' then nilai*-1 else nilai end) else 0 end ) as agg_sd
	    from anggaran_d x
	    inner join masakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
	    inner join relakun z on x.kode_akun=z.kode_akun and x.kode_lokasi=z.kode_lokasi
	    where z.kode_neraca='$kode_neraca' and (x.kode_lokasi between '$kode_lokasi' and '$kode_lokasi')  and substring(x.periode,1,4)=substring('$periode',1,4)
	    group by z.kode_akun
           )b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
left join (select x.kode_akun,x.kode_lokasi,
                  case z.jenis_akun when 'Pendapatan' then (x.debet-x.kredit)*-1 else (x.debet-x.kredit) end as mutasi, 	
                  case z.jenis_akun when 'Pendapatan' then -x.so_akhir else x.so_akhir end as so_akhir 
           from glma_tmp x
           inner join relakun y on x.kode_akun=y.kode_akun and x.kode_lokasi=y.kode_lokasi
           inner join neraca z on y.kode_neraca=z.kode_neraca and y.kode_fs=z.kode_fs and x.kode_lokasi=z.kode_lokasi
	   where y.kode_fs='$kode_fs' and y.kode_lokasi='$kode_lokasi' and y.kode_neraca='$kode_neraca' and x.nik_user='$nik_user' and so_akhir<>0
           ) c on a.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
where a.kode_lokasi='$kode_lokasi' and d.kode_fs='$kode_fs' and d.kode_neraca='$kode_neraca' ";
				error_log($sql1);
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$so_akhir=number_format($row1->so_akhir,0,",",".");
					$mutasi=number_format($row1->mutasi,0,",",".");
					$agg_bln=number_format($row1->agg_bln,0,",",".");
					$agg_thn=number_format($row1->agg_thn,0,",",".");
					$agg_sd=number_format($row1->agg_sd,0,",",".");
					$deviasi=number_format($row1->agg_thn-$row1->so_akhir,0,",",".");
					$nama=$row1->kode_akun." - ".$row1->nama;
					echo "<tr>
    <td height='20' class='detail_laporan'>".$AddOnLib->spasi($nama,$row->level_spasi+1)."</td>
	 <td class='detail_laporan'><div align='right'>$agg_thn</div></td>
	  <td class='detail_laporan'><div align='right'>$agg_bln</div></td>
	   <td class='detail_laporan'><div align='right'>$agg_sd</div></td>
	    <td class='detail_laporan'><div align='right'>$mutasi</div></td>
    <td class='detail_laporan'><div align='right'>$so_akhir</div></td>
	<td class='detail_laporan'><div align='right'>$deviasi</div></td>
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
