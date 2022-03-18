<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_anggaran_rptAggRka
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
		$nik_user=$tmp[0];
		$sql = "select count(a.no_agg) as jum from anggsusun_d a ".$this->filter." and a.nilai>0 ";		
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql."/".$totPage."-".$count."-".$this->rows);
		return $totPage;
	}
	function getSumPage()
	{
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select count(a.no_agg) as jum,sum(a.nilai) as n1 from anggsusun_d a ".$this->filter." and a.nilai>0 ";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);	
			$n1=$rs->fields[1];
		}
		$result=$totPage."/".$n1;
		error_log($result);
		return $result;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$tahun=$tmp[0];
		$sql = "select a.kode_lokasi,a.kode_pp,a.kode_akun,a.kode_drk,a.volume,substring(a.periode,5,2) as bulan,a.nilai,a.nilai_sat,a.satuan,
       b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk
from anggsusun_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi ".$this->filter." and a.nilai>0 order by kode_pp,kode_drk";
		
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan rencana kerja dan anggaran","Tahun ".$this->lokasi,$tahun);
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
<td width='25' height='25'  class='header_laporan'><div align='center'>No</div></td>
<td width='50' align='center' class='header_laporan'>Kode Dept</td>
<td width='135' align='center' class='header_laporan'>Nama Dept</td>
<td width='70' align='center'  class='header_laporan'>Kode RKM</td>
<td width='190' align='center' class='header_laporan'>Nama RKM </td>
<td width='70' class='header_laporan'>Kode Akun </td>
<td width='200' align='center' class='header_laporan'>Nama Akun</td>
<td width='30' align='center' class='header_laporan'>Bulan</td>
<td width='30' align='center' class='header_laporan'>Volume</td>
<td width='70' align='center' class='header_laporan'>Satuan</td>
<td width='90' align='center' class='header_laporan'>Nilai Satuan  </td>
<td width='90' align='center' class='header_laporan'>Anggaran</td>
</tr>";
		$i=$start+1;
		$sisa=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<tr>
  <td height='23'  class='isi_laporan' align='center'>$i</td>
  <td class='isi_laporan'>$row->kode_pp</td>
  <td class='isi_laporan'>$row->nama_pp</td>
  <td  class='isi_laporan'>$row->kode_drk</td>
  <td class='isi_laporan'>$row->nama_drk</td>
  <td class='isi_laporan'>$row->kode_akun</td>
  <td class='isi_laporan'>$row->nama_akun</td>
  <td class='isi_laporan' align='center'>$row->bulan</td>
  <td class='isi_laporan' align='center'>$row->volume</td>
  <td class='isi_laporan'>$row->satuan</td>
  <td class='isi_laporan' align='right'>".number_format($row->nilai_sat,0,',','.')."</td>
  <td class='isi_laporan' align='right'>".number_format($row->nilai,0,',','.')."</td>
</tr>";
			
			$i=$i+1;
		}
		$result=$this->getSumPage();
		$tmp=explode("/",$result);
		$max=$tmp[0];
		$n1=$tmp[1];
	
		if ($this->page==$max)
		{
		$html.="<tr>
    <td height='23' colspan='7' align='right'  class='isi_laporan'>Total&nbsp;</td>
    <td class='isi_laporan' align='right'>".number_format($n1,0,',','.')."</td>
   
  </tr>";
		}
		
		$html.="</table>";
		$html = str_replace(chr(9),"",$html);
		return $html;
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
		$sql = "select * from glma_tmp ".$this->filter." order by kode_akun ";		global $dbLib;
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

