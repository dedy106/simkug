<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");
class server_report_budget_rptRkapBidang
{
	protected $caption;
	protected $filter;
	protected $filter2;
	
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function getTotalPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$bentuk=$tmp[2];
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
		$tahun=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$nama_ver=$tmp[3];
		$ver=$tmp[4];
		$nama_bidang=$tmp[5];
		$kode_bidang=$tmp[6];
		$kode_lokasi1=$tmp[8];
		$kode_lokasi2=$tmp[9];
		$jenis=$tmp[10];
		$prog=$tmp[11];
		$tahun_rev=$tahun-1;
		$program="";
		$judul_prog="SELURUH PROGRAM";
		if ($prog=="Baru")
		{
			$program=" and a.jenis_agg='T' ";
			$judul_prog="PROGRAM BARU";
		}
		if ($prog=="Lama")
		{
			$program=" and a.jenis_agg<>'T' ";
			$judul_prog="PROGRAM LAMA";
		}
		$sql = "select nik_user,kode_neraca,kode_lokasi,tipe,nama,level_spasi,n0,n1,n2,n3,n4,n5,n6,n7,
       case when n0<>0 then (n2/n0)*100 else 0 end as g03,	
       case when n0<>0 then ((n5-n0)/n0)*100 else 0 end as g01,	
       case when n2<>0 then ((n5-n2)/n2)*100 else 0 end as g02
from agg_neraca_tmp where modul='B' and nik_user='$nik_user' order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//$judul=$nama_bidang.' Tahun '.$tahun.' [ Lokasi '.$kode_lokasi1.' - '.$kode_lokasi2.' ]';
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$lokasi="AREA [$kode_lokasi1 - $kode_lokasi2]";
		if ($kode_lokasi1=="01" and $kode_lokasi2=="01") { $lokasi="AREA I";}
		if ($kode_lokasi1=="02" and $kode_lokasi2=="02") { $lokasi="AREA II";}
		if ($kode_lokasi1=="03" and $kode_lokasi2=="03") { $lokasi="AREA III";}
		if ($kode_lokasi1=="04" and $kode_lokasi2=="04") { $lokasi="AREA IV";}
		if ($kode_lokasi1=="05" and $kode_lokasi2=="05") { $lokasi="AREA V";}
		if ($kode_lokasi1=="06" and $kode_lokasi2=="06") { $lokasi="AREA VI";}
		if ($kode_lokasi1=="07" and $kode_lokasi2=="07") { $lokasi="AREA VII";}
		if ($kode_lokasi1=="99" and $kode_lokasi2=="99") { $lokasi="PUSAT";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="07") { $lokasi="SELURUH AREA [I - VII]";}
		if ($kode_lokasi1=="01" and $kode_lokasi2=="99") { $lokasi="KONSOLIDASI NASIONAL";}
		if ($this->lokasi=="00")
		{
			$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN REKAPITULASI RKAP<br>$judul_prog<br>$nama_bidang <br>TAHUN $tahun [ Lokasi $kode_lokasi1 - $kode_lokasi2 ]<br></div>$tanggal";
		}
		else
		{
			$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN REKAPITULASI RKAP<br>$judul_prog<br>$nama_bidang <br>TAHUN $tahun <br></div>$tanggal";
		}
		//echo $AddOnLib->judul_laporan("laporan rekapitulasi rkap",$this->lokasi,$judul);
		echo "<center>$judul <table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='40' height='25'  class='header_laporan' align='center'>Kode</td> 
    <td width='250' height='25'  class='header_laporan' align='center'>Deskripsi</td>
    <td width='90' class='header_laporan' align='center'>RKA 2010</td>
	<td width='90' class='header_laporan' align='center'>REALISASI SD AGUSTUS 2010</td>
	<td width='90' class='header_laporan' align='center'>OUTLOOK 2010</td>
	<td width='90' class='header_laporan' align='center'>SELISIH RKA VS OUTLOOK 2010</td>
	<td width='60' class='header_laporan' align='center'>% PENYERAPAN</td>
	<td width='80' class='header_laporan' align='center'>USULAN RKA 2011</td>
	<td width='60' class='header_laporan' align='center'>GROWTH RKA.11 VS RKA.10</td>
	<td width='60' class='header_laporan' align='center'>GROWTH RKA.11 VS OUTLOOK.10</td>
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n0="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";
			$warna="style='color:#000000' ";
			$warna2="style='color:#000000' ";
			if ($row->g01 > 110)
			{
				$warna="style='color:#FF0000' ";
			}
			if ($row->g02 > 110)
			{
				$warna2="style='color:#FF0000' ";
			}
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n0=number_format($row->n0,0,",",".");
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->g03,2,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->g01,2,",",".");
				$n7=number_format($row->g02,2,",",".");
			}
			$css="isi_laporan";
			if ($row->tipe!="Posting")
			{
				$css="isi_laporan";
			}
			echo "<tr>
	<td class='$css' align='left'>$row->kode_neraca</td>
	<td height='20' class='$css' align='left'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
    <td class='$css' align='right'>$n0</td>
	<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right'>$n6</td>
	<td class='$css' align='right' $warna>$n7</td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				if ($jenis=="Akun" || $jenis=="")
				{
					$sql1="select a.kode_akun as kode_akunlok,a.nama,isnull(d.rka,0) as rka,isnull(d.realisasi,0) as realisasi,isnull(d.outlook,0) as outlook,
				isnull(d.rka,0)-isnull(d.outlook,0) as selisih,
				case when isnull(d.rka,0)<>0 then (isnull(d.outlook,0)/isnull(d.rka,0))*100 else 0 end as penyerapan,
				isnull(f.usulan,0) as usulan,
				case when isnull(d.rka,0)<>0 then ((isnull(f.usulan,0)-isnull(d.rka,0))/isnull(d.rka,0))*100 else 0 end as growth1,
				case when isnull(d.outlook,0)<>0 then ((isnull(f.usulan,0)-isnull(d.outlook,0))/isnull(d.outlook,0))*100 else 0 end as growth2
	from agg_masakun a
	inner join agg_relakungar e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
	left join (select a.kode_akun,isnull(sum(a.rka),0) as rka,isnull(sum(a.realisasi),0) as realisasi,isnull(sum(a.outlook),0) as outlook
				from agg_outlook a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun_rev' and b.kode_neraca='$row->kode_neraca' and c.kode_bidang='$kode_bidang'
				group by a.kode_akun
				)d on a.kode_akun=d.kode_akun 
	left join (select a.kode_akun,isnull(sum(a.nilai),0) as usulan
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' and c.kode_bidang='$kode_bidang' $program 
				group by a.kode_akun
				)f on a.kode_akun=f.kode_akun			
	where a.kode_lokasi='$kode_lokasi' and e.kode_neraca='$row->kode_neraca' and (isnull(d.rka,0)<>0 or isnull(d.realisasi,0)<>0 or isnull(d.outlook,0)<>0 or isnull(f.usulan,0)<>0) order by a.kode_akun";
				}
				if ($jenis=="Akun Lokasi")
				{
					$sql1="select a.kode_lokasi+'-'+a.kode_akun as kode_akunlok,b.nama,isnull(d.rka,0) as rka,isnull(d.realisasi,0) as realisasi,isnull(d.outlook,0) as outlook,
				isnull(d.rka,0)-isnull(d.outlook,0) as selisih,
				case when isnull(d.rka,0)<>0 then (isnull(d.outlook,0)/isnull(d.rka,0))*100 else 0 end as penyerapan,
				isnull(f.usulan,0) as usulan,
				case when isnull(d.rka,0)<>0 then ((isnull(f.usulan,0)-isnull(d.rka,0))/isnull(d.rka,0))*100 else 0 end as growth1,
				case when isnull(d.outlook,0)<>0 then ((isnull(f.usulan,0)-isnull(d.outlook,0))/isnull(d.outlook,0))*100 else 0 end as growth2
	from (select kode_lokasi,kode_akun
		  from agg_outlook
		  where (kode_lokasi between '01' and '99') and tahun='$tahun_rev'
		  group by kode_lokasi,kode_akun
		  union
		  select kode_lokasi,kode_akun
		  from agg_d
		  where (kode_lokasi between '01' and '99') and tahun='$tahun'
		  group by kode_lokasi,kode_akun) a
	inner join agg_masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
	left join (select a.kode_lokasi,a.kode_akun,isnull(sum(a.rka),0) as rka,isnull(sum(a.realisasi),0) as realisasi,isnull(sum(a.outlook),0) as outlook
				from agg_outlook a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun_rev' and b.kode_neraca='$row->kode_neraca' and c.kode_bidang='$kode_bidang'
				group by a.kode_lokasi,a.kode_akun
				)d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi
	left join (select a.kode_lokasi,a.kode_akun,isnull(sum(a.nilai),0) as usulan
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where (a.kode_lokasi between '$kode_lokasi1' and '$kode_lokasi2') and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' and c.kode_bidang='$kode_bidang' $program
				group by a.kode_lokasi,a.kode_akun
				)f on a.kode_akun=f.kode_akun and a.kode_lokasi=f.kode_lokasi			
	where (isnull(d.rka,0)<>0 or isnull(d.realisasi,0)<>0 or isnull(d.outlook,0)<>0 or isnull(f.usulan,0)<>0) order by a.kode_akun,a.kode_lokasi";

				}
				error_log($sql1);
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$warna1="style='color:#0000FF; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";
					$warna2="style='color:#0000FF; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";
					if ($row1->growth2 > 110)
					{
						$warna1="style='color:#FF0000; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";
					}
					if ($row1->growth1 > 110)
					{
						$warna2="style='color:#FF0000; font-family : Arial; font-size : 10px; text-decoration : none; padding:3px;'";
					}
					$n0=number_format($row1->rka,0,",",".");
					$n1=number_format($row1->realisasi,0,",",".");
					$n2=number_format($row1->outlook,0,",",".");
					$n3=number_format($row1->selisih,0,",",".");
					$n4=number_format($row1->penyerapan,2,",",".");
					$n5=number_format($row1->usulan,0,",",".");
					$n6=number_format($row1->growth1,2,",",".");
					$n7=number_format($row1->growth2,2,",",".");
					$css="detail_laporan";
					echo "<tr>
	<td class='$css' align='left'>$row1->kode_akunlok</td>
	<td height='20' class='$css' align='left'>$row1->nama</td>
    <td class='$css' align='right'>$n0</td>
	<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right' $warna2>$n6</td>
	<td class='$css' align='right' $warna1>$n7</td>
  </tr>";
				}
			}
			$i=$i+1;
		}
		echo "</table></center>";
		return "";
	}
	function preview()
	{
		return $this->getHtml();
	}
	function createPdf()
	{		
		$html = $this->getHtml();		
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
	}
	function createXls()
	{
		global $manager;
		$html = $this->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select kode_akun,nama,'*' as lokasi,debet,kredit,so_awal,so_akhir, 
       case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then so_awal else 0 end as so_awal_kredit, 
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then so_akhir else 0 end as so_akhir_kredit
from glma_tmp ".$this->filter." order by kode_akun ";
		global $dbLib;
		$rs = $dbLib->execute($sql);
		print rs2csv($rs);
	}
	function createTxt()
	{
	}
//--------------------------
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	function setRows($data)
	{
		$this->rows = $data;
	}
	function setPage($page)
	{
		$this->page = $page;
	}	
	function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}
	
}
?>
