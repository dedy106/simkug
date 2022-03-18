<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");
class server_report_budget_rptOutlook
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
		$bentuk=$tmp[3];
	
		$sql = "select kode_neraca,kode_lokasi,tipe,fn_spasi(nama,level_spasi) as nama,n0,n1,n2,n3,n4,n5,n6,n7 
from agg_neraca_tmp where modul='B' and nik_user='$nik_user' order by rowindex ";
		error_log($sql);
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan outlook per lokasi",$this->lokasi,"Tahun ".$tahun);
		echo "<center><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='40' height='25'  class='header_laporan' align='center'>Kode</td> 
    <td width='250' height='25'  class='header_laporan' align='center'>Deskripsi</td>
    <td width='90' class='header_laporan' align='center'>RKA</td>
	<td width='90' class='header_laporan' align='center'>REALISASI</td>
	<td width='90' class='header_laporan' align='center'>OUTLOOK</td>
	<td width='50' class='header_laporan' align='center'>PERSEN</td>
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n0="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";
			if ($row->tipe!="Header" && $row->nama!="." && $row->nama!="")
			{
				$n0=number_format($row->n0,0,",",".");
				$n1=number_format($row->n1,0,",",".");
				$n2=number_format($row->n2,0,",",".");
				$n3=number_format($row->n3,2,",",".");
				
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

  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,a.nama,isnull(d.rka,0) as rka,isnull(d.realisasi,0) as realisasi,isnull(d.outlook,0) as outlook,
				cast(case when d.rka=0 then 0 when d.outlook=0 then 0 else convert(decimal(10,2),d.outlook/d.rka*100,2) end as varchar) as penyerapan
	from agg_masakun a
	inner join agg_relakungar e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
	left join (select a.kode_akun,sum(a.rka) as rka,sum(a.realisasi) as realisasi,sum(a.outlook) as outlook
				from agg_outlook a
				inner join agg_relakungar b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				where a.kode_lokasi='$kode_lokasi' and a.tahun='$tahun' and b.kode_neraca='$row->kode_neraca' group by a.kode_akun
				)d on a.kode_akun=d.kode_akun 
	where a.kode_lokasi='$kode_lokasi' and e.kode_neraca='$row->kode_neraca'  and (isnull(d.rka,0)<>0 or isnull(d.realisasi,0)<>0 or isnull(d.outlook,0)<>0) order by a.kode_akun";

	error_log($sql1);
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$n0=number_format($row1->rka,0,",",".");
					$n1=number_format($row1->realisasi,0,",",".");
					$n2=number_format($row1->outlook,0,",",".");
					$n3=number_format($row1->penyerapan,2,",",".");
					
					$css="detail_laporan";
					echo "<tr>
	<td class='$css' align='left'>$row1->kode_akun</td>
	<td height='20' class='$css' align='left'>$row1->nama</td>
    <td class='$css' align='right'>$n0</td>
	<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	
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
