<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");
class server_report_budget_rptAggEstimasi
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
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$bentuk=$tmp[2];
		$sql = "select kode_neraca,tipe,fn_spasi(nama,level_spasi) as nama,n0,n1,n2,n3,n4,n5,n6,n7,n8,n9,n10,n11,n12 
from agg_neraca_tmp where modul='B' order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("laporan estimasi realisasi anggaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		echo "<center><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='40' height='25'  class='header_laporan' align='center'>Kode</td> 
    <td width='250' height='25'  class='header_laporan' align='center'>Deskripsi</td>
	<td width='90' class='header_laporan' align='center'>Total</td>
    <td width='90' class='header_laporan' align='center'>Januari</td>
    <td width='90' class='header_laporan' align='center'>Februari</td>
    <td width='90' class='header_laporan' align='center'>Maret</td>
    <td width='90' class='header_laporan' align='center'>April</td>
	<td width='90' class='header_laporan' align='center'>Mei</td>
    <td width='90' class='header_laporan' align='center'>Juni</td>
    <td width='90' class='header_laporan' align='center'>Juli</td>
    <td width='90' class='header_laporan' align='center'>Agustus</td>
	<td width='90' class='header_laporan' align='center'>September</td>
    <td width='90' class='header_laporan' align='center'>Oktober</td>
    <td width='90' class='header_laporan' align='center'>November</td>
    <td width='90' class='header_laporan' align='center'>Desember</td>	
</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n0="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";$n10="";$n11="";$n12="";
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
				$n8=number_format($row->n8,0,",",".");
				$n9=number_format($row->n9,0,",",".");
				$n10=number_format($row->n10,0,",",".");
				$n11=number_format($row->n11,0,",",".");
				$n12=number_format($row->n12,0,",",".");
			}
			$css="isi_laporan";
			if ($row->tipe!="Posting")
			{
				$css="isi_laporan2";
			}
			echo "<tr>
	<td class='$css' align='left'>$row->kode_neraca</td>
	<td height='20' class='$css' align='left'>".$AddOnLib->spasi($row->nama,$row->level_spasi)."</td>
	<td class='$css' align='right'>$n12</td>
    <td class='$css' align='right'>$n0</td>
	<td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right'>$n6</td>
	<td class='$css' align='right'>$n7</td>
	<td class='$css' align='right'>$n8</td>
	<td class='$css' align='right'>$n9</td>
	<td class='$css' align='right'>$n10</td>
	<td class='$css' align='right'>$n11</td>
  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,a.nama,d.n0,d.n1,d.n2,d.n3,d.n4,d.n5,d.n6,d.n7,d.n8,d.n9,d.n10,d.n11,d.n12	from agg_masakun a
	inner join agg_relakun e on a.kode_akun=e.kode_akun and a.kode_lokasi=e.kode_lokasi
	left join (select b.kode_akun,
		       sum(case when substring(a.periode,5,2) between '01' and '12' then nilai else 0 end ) as n0,
		       sum(case when substring(a.periode,5,2) between '01' and '01' then nilai else 0 end ) as n1,
		       sum(case when substring(a.periode,5,2) between '02' and '02' then nilai else 0 end ) as n2,
		       sum(case when substring(a.periode,5,2) between '03' and '03' then nilai else 0 end ) as n3,
			sum(case when substring(a.periode,5,2) between '04' and '04' then nilai else 0 end ) as n4,
			sum(case when substring(a.periode,5,2) between '05' and '05' then nilai else 0 end ) as n5,
			sum(case when substring(a.periode,5,2) between '06' and '06' then nilai else 0 end ) as n6,
			sum(case when substring(a.periode,5,2) between '07' and '07' then nilai else 0 end ) as n7,
			sum(case when substring(a.periode,5,2) between '08' and '08' then nilai else 0 end ) as n8,
		       sum(case when substring(a.periode,5,2) between '09' and '09' then nilai else 0 end ) as n9,
		       sum(case when substring(a.periode,5,2) between '10' and '10' then nilai else 0 end ) as n10,
			sum(case when substring(a.periode,5,2) between '11' and '11' then nilai else 0 end ) as n11,
			sum(case when substring(a.periode,5,2) between '12' and '12' then nilai else 0 end ) as n12
		from agg_gldt a
		inner join agg_relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='03' and substring(a.periode,1,4)='2009' and b.kode_neraca='$row->kode_neraca'
		group by b.kode_akun )d on a.kode_akun=d.kode_akun 
	where a.kode_lokasi='03' and e.kode_neraca='$row->kode_neraca' and d.n12>0 ";
			
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$n0="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";$n8="";$n9="";$n10="";$n11="";$n12="";
					$n0=number_format($row1->n0,0,",",".");
					$n1=number_format($row1->n1,0,",",".");
					$n2=number_format($row1->n2,0,",",".");
					$n3=number_format($row1->n3,0,",",".");
					$n4=number_format($row1->n4,0,",",".");
					$n5=number_format($row1->n5,0,",",".");
					$n6=number_format($row1->n6,0,",",".");
					$n7=number_format($row1->n7,0,",",".");
					$n8=number_format($row1->n8,0,",",".");
					$n9=number_format($row1->n9,0,",",".");
					$n10=number_format($row1->n10,0,",",".");
					$n11=number_format($row1->n11,0,",",".");
					$n12=number_format($row1->n12,0,",",".");
					$css="detail_laporan";
					echo "<tr>
	<td class='$css' align='left'>$row1->kode_akun</td>
	<td height='20' class='$css' align='left'>$row1->nama</td>
    <td class='$css' align='right'>$n0</td>
    <td class='$css' align='right'>$n1</td>
	<td class='$css' align='right'>$n2</td>
	<td class='$css' align='right'>$n3</td>
	<td class='$css' align='right'>$n4</td>
	<td class='$css' align='right'>$n5</td>
	<td class='$css' align='right'>$n6</td>
	<td class='$css' align='right'>$n7</td>
	<td class='$css' align='right'>$n8</td>
	<td class='$css' align='right'>$n9</td>
	<td class='$css' align='right'>$n10</td>
	<td class='$css' align='right'>$n11</td>
	<td class='$css' align='right'>$n12</td>

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
