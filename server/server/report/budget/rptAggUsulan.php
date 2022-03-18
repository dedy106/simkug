<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("yakes");
class server_report_budget_rptAggUsulan
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
		$sql = "select kode_neraca,kode_lokasi,tipe,fn_spasi(nama,level_spasi) as nama,n0,n1,n2,n3,n4,n5,n6,n7 
from agg_neraca_tmp where modul='B' and nik_user='$nik_user' order by rowindex ";
		
		$rs = $dbLib->execute($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		echo $AddOnLib->judul_laporan("Laporan Rekapitulasi Usulan Anggaran",$this->lokasi,'2010');
		echo "<center><table width='1318' border='1' cellpadding='0' cellspacing='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='40' align='center' class='header_laporan'>Kode</td>
    <td width='150' align='center' class='header_laporan'>Nama</td>
    <td width='80' align='center' class='header_laporan'>Agg Tahun </td>
    <td width='80' align='center' class='header_laporan'>Real SD </td>
    <td width='80' align='center' class='header_laporan'>Estimasi </td>
    <td width='80' align='center' class='header_laporan'>Simulasi Fixed </td>
    <td width='80' align='center' class='header_laporan'>Tamb Fixed </td>
    <td width='80' align='center' class='header_laporan'>TPKK</td>
    <td width='40' align='center' class='header_laporan'>TPKU</td>
    <td width='40' align='center' class='header_laporan'>TPKU FFS </td>
    <td width='40' align='center' class='header_laporan'>Total Fixed </td>
    <td width='40' align='center' class='header_laporan'>Var Yankesta </td>
    <td width='40' align='center' class='header_laporan'>Var KUG </td>
    <td width='40' align='center' class='header_laporan'>Var Umum </td>
    <td width='40' align='center' class='header_laporan'>Simulasi SPPD</td>
    <td width='40' align='center' class='header_laporan'>Simulasi Aktap</td>
    <td width='40' align='center' class='header_laporan'>Simulasi Renc Tamb </td>
    <td width='40' align='center' class='header_laporan'>Total Var </td>
    <td width='40' align='center' class='header_laporan'>Tamb Prog Baru </td>
    <td width='40' align='center' class='header_laporan'>Usulan RKA 2010 </td>
    <td width='40' align='center' class='header_laporan'>Growth RKA 10 vs RKA 09 </td>
    <td width='40' align='center' class='header_laporan'>Growth RKA 10 vs Est 09 </td>
    <td width='40' align='center' class='header_laporan'>Usulan RKA 10 vs Est RKA 09 </td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>1</td>
    <td align='center' class='header_laporan'>2</td>
    <td align='center' class='header_laporan'>3</td>
    <td align='center' class='header_laporan'>4</td>
    <td align='center' class='header_laporan'>5</td>

    <td align='center' class='header_laporan'>6</td>
    <td align='center' class='header_laporan'>7</td>
    <td align='center' class='header_laporan'>8</td>
    <td align='center' class='header_laporan'>9</td>
    <td align='center' class='header_laporan'>10</td>
    <td align='center' class='header_laporan'>11= 6 s/d 10</td>
    <td align='center' class='header_laporan'>12</td>
    <td align='center' class='header_laporan'>13</td>
    <td align='center' class='header_laporan'>14</td>
    <td align='center' class='header_laporan'>15</td>
    <td align='center' class='header_laporan'>16</td>
    <td align='center' class='header_laporan'>17</td>
    <td align='center' class='header_laporan'>18 = 12 s/d 17 </td>
    <td align='center' class='header_laporan'>19</td>
    <td align='center' class='header_laporan'>20</td>
    <td align='center' class='header_laporan'>21 = 20/5 </td>
    <td align='center' class='header_laporan'>22</td>
    <td align='center' class='header_laporan'>23</td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
    <td align='center' class='header_laporan'>&nbsp;</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n0="";$n1="";$n2="";$n3="";$n4="";$n5="";$n6="";$n7="";
			$n8="";$n9="";$n10="";$n11="";$n12="";$n13="";$n14="";$n15="";
			$n16="";$n17="";$n18="";$n19="";$n20="";$n21="";
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
				$n0=number_format($row->n9,0,",",".");
				$n1=number_format($row->n10,0,",",".");
				$n2=number_format($row->n11,0,",",".");
				$n3=number_format($row->n12,0,",",".");
				$n4=number_format($row->n13,0,",",".");
				$n5=number_format($row->n14,0,",",".");
				$n6=number_format($row->n15,0,",",".");
				$n7=number_format($row->n16,0,",",".");
				$n8=number_format($row->n17,0,",",".");
				$n5=number_format($row->n18,0,",",".");
				$n6=number_format($row->n19,0,",",".");
				$n7=number_format($row->n20,0,",",".");
				$n8=number_format($row->n21,0,",",".");
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
	<td class='$css' align='right'>$n7</td>
	<td class='$css' align='right'>$n</td>
	<td class='$css' align='right'>$n8</td>
	<td class='$css' align='right'>$n9</td>
	<td class='$css' align='right'>$n10</td>
	<td class='$css' align='right'>$n11</td>
	<td class='$css' align='right'>$n12</td>
	<td class='$css' align='right'>$n13</td>
	<td class='$css' align='right'>$n14</td>
	<td class='$css' align='right'>$n15</td>
	<td class='$css' align='right'>$n16</td>
	<td class='$css' align='right'>$n17</td>
	<td class='$css' align='right'>$n18</td>
	<td class='$css' align='right'>$n19</td>
	<td class='$css' align='right'>$n20</td>
	<td class='$css' align='right'>$n21</td>
X  </tr>";
			if ($bentuk=="Detail" && $row->tipe=="Posting")
			{
				$kode_neraca=$row->kode_neraca;
				$kode_fs=$row->kode_fs;
				$kode_lokasi=$row->kode_lokasi;
				$sql1="select a.kode_akun,a.nama,isnull(b.agg_thn,0) as agg_thn,isnull(b.agg_sd,0) as agg_sd,
        isnull(c.real_bln,0) as real_bln,isnull(c.real_sd,0) as real_sd,
       isnull(b.agg_sd-c.real_sd,0) as sisa_sd,isnull(b.agg_thn-c.real_sd,0) as sisa_thn,
       case when isnull(b.agg_sd,0)=0 then 0 else isnull(isnull(b.agg_sd-c.real_sd,0)/b.agg_sd,0) end as persen_sd,
       case when isnull(b.agg_thn,0)=0 then 0 else isnull(isnull(b.agg_sd-c.real_sd,0)/b.agg_thn,0) end as persen_thn
	from agg_masakun a  
        inner join agg_relakun d on a.kode_akun=d.kode_akun and a.kode_lokasi=d.kode_lokasi 
	left join (select b.kode_akun,
		       sum(case when substring(a.periode,5,2) between '01' and '12' then nilai else 0 end ) as agg_thn,
		       sum(case when substring(a.periode,5,2) between '01' and '09' then nilai else  0 end ) as agg_sd
		from agg_d a
		inner join agg_relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='03' and a.tahun='2009' and b.kode_neraca='$row->kode_neraca'
		group by b.kode_akun)b on a.kode_akun=b.kode_akun 
	left join (select b.kode_akun,
		       sum(case when substring(a.periode,5,2) between '09' and '09' then nilai else 0 end ) as real_bln,
		       sum(case when substring(a.periode,5,2) between '01' and '09' then nilai else 0 end ) as real_sd
		from agg_gldt a
		inner join agg_relakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
		where a.kode_lokasi='03' and substring(a.periode,1,4)='2009' and b.kode_neraca='$row->kode_neraca'
		group by b.kode_akun)c on a.kode_akun=c.kode_akun
	where a.kode_lokasi='03' and d.kode_neraca='$row->kode_neraca' and (isnull(b.agg_thn,0)<>0)";
				$rs1 = $dbLib->execute($sql1);
				while ($row1 = $rs1->FetchNextObject($toupper=false))
				{	
					$n0=number_format($row1->agg_thn,0,",",".");
					$n1=number_format($row1->agg_sd,0,",",".");
					$n2=number_format($row1->real_bln,0,",",".");
					$n3=number_format($row1->real_sd,0,",",".");
					$n4=number_format($row1->sisa_sd,0,",",".");
					$n5=number_format($row1->sisa_thn,0,",",".");
					$n6=number_format($row1->persen_sd,0,",",".");
					$n7=number_format($row1->persen_thn,0,",",".");
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
