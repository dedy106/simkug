<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");
class server_report_budget_rptRkapJejer
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
		$kode_bidang=$tmp[3];
		$ver=$tmp[4];
		$lok=$tmp[5];
		$sql = "select nik_user,kode_neraca,kode_lokasi,tipe,level_spasi,nama,n0,n1,n2,n3,n4,n5,n6,n7,n8,n9
from agg_neraca_tmp where modul='B' and nik_user='$nik_user' order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		//echo $AddOnLib->judul_laporan("laporan rekapitulasi rkap",$this->lokasi,"TAHUN ".$tahun);
		$tanggal="<div style='font-family: Arial;font-size: 10px;'> Dicetak ".date("d/m/Y  H:m:s")."<div>";
		$lokasi="";
		if ($lok=="07") { $lokasi="SELURUH AREA [I - VII]";}
		if ($lok=="99") { $lokasi="KONSOLIDASI NASIONAL";}
		$judul="<div style='font-family: Arial;font-size: 12px;font-weight: bold;padding:3px;'>".$lokasi."<br>LAPORAN REKAPITULASI RKAP<br>TAHUN $tahun <br></div>$tanggal";
		
		echo "<center>$judul<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='40' height='25'  class='header_laporan' align='center'>Kode</td> 
    <td width='250' height='25'  class='header_laporan' align='center'>Deskripsi</td>";
		if ($lok=="99")
		{
			echo "<td width='90' class='header_laporan' align='center'>PUSAT</td>";
		}
		echo "<td width='90' class='header_laporan' align='center'>AREA 1</td>
	<td width='90' class='header_laporan' align='center'>AREA 2</td>
	<td width='90' class='header_laporan' align='center'>AREA 3</td>
	<td width='60' class='header_laporan' align='center'>AREA 4</td>
	<td width='80' class='header_laporan' align='center'>AREA 5</td>
	<td width='60' class='header_laporan' align='center'>AREA 6</td>
	<td width='60' class='header_laporan' align='center'>AREA 7</td>
	<td width='60' class='header_laporan' align='center'>TOTAL</td>
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n0="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";
			
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n0=number_format($row->n0,0,",",".");
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,0,",",".");
				$n4=number_format($row->n4,0,",",".");
				$n5=number_format($row->n5,0,",",".");
				$n6=number_format($row->n6,0,",",".");
				$n7=number_format($row->n7,0,",",".");
				if ($lok=="99")
				{
					$n8=number_format($row->n8,0,",",".");
				}
				else
				{
					$n8=number_format($row->n9,0,",",".");
				}
			}
			$css="isi_laporan";
			if ($row->tipe!="Posting")
			{
				$css="isi_laporan";
			}
			echo "<tr>
	<td class='$css' align='left'>$row->kode_neraca</td>
	<td height='20' class='$css' align='left'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>";
	if ($lok=="99")
	{
		echo "<td class='$css' align='right'>$n0</td>";
	}
	echo "<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right' >$n6</td>
	<td class='$css' align='right' >$n7</td>
	<td class='$css' align='right' >$n8</td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				if ($kode_bidang=="")
				{
				$sql1="select a.kode_akun,a.nama,isnull(f.g99,0) as g99,isnull(f.g01,0) as g01,isnull(f.g02,0) as g02,isnull(f.g03,0) as g03,
				isnull(f.g04,0) as g04,isnull(f.g05,0) as g05,isnull(f.g06,0) as g06,isnull(f.g07,0) as g07,isnull(f.g08,0) as g08,isnull(f.g09,0) as g09
	from agg_masakun a
	inner join agg_relakungar e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
	left join (select a.kode_akun,sum(case when a.kode_lokasi='01' then a.nilai else 0 end) as g01,
       sum(case when a.kode_lokasi='02' then a.nilai else 0 end) as g02,
       sum(case when a.kode_lokasi='03' then a.nilai else 0 end) as g03,
       sum(case when a.kode_lokasi='04' then a.nilai else 0 end) as g04,
       sum(case when a.kode_lokasi='05' then a.nilai else 0 end) as g05,
       sum(case when a.kode_lokasi='06' then a.nilai else 0 end) as g06,
       sum(case when a.kode_lokasi='07' then a.nilai else 0 end) as g07,
	   sum(case when a.kode_lokasi between '01' and '99' then a.nilai else 0 end) as g08,
       sum(case when a.kode_lokasi='99' then a.nilai else 0 end) as g99,
	   sum(case when a.kode_lokasi between '01' and '07' then a.nilai else 0 end) as g09
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' 
				group by a.kode_akun
				)f on a.kode_akun=f.kode_akun			
	where a.kode_lokasi='00' and e.kode_neraca='$row->kode_neraca' and 
	(isnull(f.g99,0)<>0 or isnull(f.g01,0)<>0 or isnull(f.g02,0)<>0 or isnull(f.g03,0)<>0 or isnull(f.g04,0)<>0 or
	isnull(f.g05,0)<>0 or isnull(f.g06,0)<>0 or isnull(f.g07,0)<>0 or isnull(f.g08,0)<>0) order by a.kode_akun ";
				}
				else
				{
				$sql1="select a.kode_akun,a.nama,isnull(f.g99,0) as g99,isnull(f.g01,0) as g01,isnull(f.g02,0) as g02,isnull(f.g03,0) as g03,
				isnull(f.g04,0) as g04,isnull(f.g05,0) as g05,isnull(f.g06,0) as g06,isnull(f.g07,0) as g07,isnull(f.g08,0) as g08,isnull(f.g09,0) as g09
	from agg_masakun a
	inner join agg_relakungar e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
	left join (select a.kode_akun,sum(case when a.kode_lokasi='01' then a.nilai else 0 end) as g01,
       sum(case when a.kode_lokasi='02' then a.nilai else 0 end) as g02,
       sum(case when a.kode_lokasi='03' then a.nilai else 0 end) as g03,
       sum(case when a.kode_lokasi='04' then a.nilai else 0 end) as g04,
       sum(case when a.kode_lokasi='05' then a.nilai else 0 end) as g05,
       sum(case when a.kode_lokasi='06' then a.nilai else 0 end) as g06,
       sum(case when a.kode_lokasi='07' then a.nilai else 0 end) as g07,
	   sum(case when a.kode_lokasi between '01' and '99' then a.nilai else 0 end) as g08,
       sum(case when a.kode_lokasi='99' then a.nilai else 0 end) as g99,
	   sum(case when a.kode_lokasi between '01' and '07' then a.nilai else 0 end) as g09
				from agg_d a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join agg_pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				where a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' and c.kode_bidang='$kode_bidang'
				group by a.kode_akun
				)f on a.kode_akun=f.kode_akun			
	where a.kode_lokasi='00' and e.kode_neraca='$row->kode_neraca' and 
	(isnull(f.g99,0)<>0 or isnull(f.g01,0)<>0 or isnull(f.g02,0)<>0 or isnull(f.g03,0)<>0 or isnull(f.g04,0)<>0 or
	isnull(f.g05,0)<>0 or isnull(f.g06,0)<>0 or isnull(f.g07,0)<>0 or isnull(f.g08,0)<>0) order by a.kode_akun ";

				}
				//echo($sql1);
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
					$n0=number_format($row1->g99,0,",",".");
					$n1=number_format($row1->g01,0,",",".");
					$n2=number_format($row1->g02,0,",",".");
					$n3=number_format($row1->g03,0,",",".");
					$n4=number_format($row1->g04,0,",",".");
					$n5=number_format($row1->g05,0,",",".");
					$n6=number_format($row1->g06,0,",",".");
					$n7=number_format($row1->g07,0,",",".");
					
					if ($lok=="99")
					{
						$n8=number_format($row1->g08,0,",",".");
					}
					else
					{
						$n8=number_format($row1->g09,0,",",".");
					}
					$css="detail_laporan";
					echo "<tr>
	<td class='$css' align='left'>$row1->kode_akun</td>
	<td height='20' class='$css' align='left'>$row1->nama</td>";
	if ($lok=="99")
	{
		echo "<td class='$css' align='right'>$n0</td>";
	}
	echo "<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right'>$n6</td>
	<td class='$css' align='right' >$n7</td>
	<td class='$css' align='right' >$n8</td>
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
