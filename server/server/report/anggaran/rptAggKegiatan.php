<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_anggaran_rptAggKegiatan
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
		$sql = "select count(kode_akun) as jum from glma_drk_tmp where nik_user='$nik_user' ".$this->filter;
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		
		
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$sql = "select * from glma_drk_tmp where nik_user='$nik_user' ".$this->filter." order by kode_drk";

		
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan anggaran kegiatan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table width='1445' border='1' cellspacing='0' cellpadding='0' class='kotak'>
<tr bgcolor='#CCCCCC'>
    <td width='25' rowspan='2'  class='header_laporan'><div align='center'>No</div></td>
    <td width='70' rowspan='2'  class='header_laporan'><div align='center'>Kode RKM</div></td>
    <td width='190' rowspan='2' class='header_laporan'><div align='center'>Nama RKM </div></td>
    <td width='70' rowspan='2' class='header_laporan'><div align='center'>Kode Akun </div></td>
    <td width='200' rowspan='2' class='header_laporan'><div align='center'>Nama Akun</div></td>
    <td width='50' rowspan='2' class='header_laporan'><div align='center'>Kode Dept</div></td>
<td width='150' rowspan='2' class='header_laporan'><div align='center'>Nama Dept</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target / Tahun </div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Target S.D Bulan Berjalan </div></td>
<td width='90' rowspan='2' class='header_laporan'><div align='center'>Target Bulan Berjalan </div></td>
    <td height='25' colspan='2' class='header_laporan'><div align='center'>Realisasi</div></td>
    <td width='90' rowspan='2' class='header_laporan'><div align='center'>Sisa Anggaran</div></td>
<td width='50' rowspan='2' class='header_laporan'><div align='center'>% Bln</div></td>
<td width='50' rowspan='2' class='header_laporan'><div align='center'>% SD Bln</div></td>
<td width='50' rowspan='2' class='header_laporan'><div align='center'>% SD Thn</div></td>
  </tr>
   <tr bgcolor='#CCCCCC'>
    <td width='90' height='25' class='header_laporan'><div align='center'>Bulan Berjalan </div></td>
    <td width='90' class='header_laporan'><div align='center'>S.D Bulan Berjalan </div></td>
  </tr>";
		$i=$start+1;
		$n1=0;$n2=0;$n3=0;$sisa=0;$n4=0;$n5=0;
		$sisa=0;$sisa_bln1=0;$sisa_sd1=0;$sisa_thn1=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
			$sisa=$sisa+$n1-$n5;
			if ($row->n3!=0)
				{$sisa_bln=($row->n4/$row->n3)*100;}
			if ($row->n4!=0)
				{$sisa_sd=($row->n5/$row->n2)*100;}
			if ($row->n1!=0)
				{$sisa_thn=($row->n5/$row->n1)*100;}
			$sisa_bln1=$sisa_bln1+$sisa_bln;
			$sisa_sd1=$sisa_sd1+$sisa_sd;
			$sisa_thn1=$sisa_thn1+$sisa_thn;
			
			$html.="<tr>
    <td class='isi_laporan'><div align='center'>$i</div></td>
    <td class='isi_laporan'>$row->kode_drk</td>
<td class='isi_laporan'>$row->nama_drk</td>
<td height='20' class='isi_laporan'>$row->kode_akun</td>
    <td class='isi_laporan'>$row->nama_akun</td>
<td class='isi_laporan'>$row->kode_pp</td>
<td class='isi_laporan'>$row->nama_pp</td>
<td class='isi_laporan'><div align='right'>".number_format($row->n1,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right' >".number_format($row->n2,0,',','.')."</div></td>
<td class='isi_laporan'><div align='right' >".number_format($row->n3,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n4,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n5,0,',','.')."</div></td>
    <td class='isi_laporan'><div align='right'>".number_format($row->n1-$row->n5,0,',','.')."</div></td>
<td class='isi_laporan'><div align='center'>".number_format($sisa_bln,0,',','.')."</div></td>
<td class='isi_laporan'><div align='center'>".number_format($sisa_sd,0,',','.')."</div></td>
<td class='isi_laporan'><div align='center'>".number_format($sisa_thn,0,',','.')."</div></td>
  </tr>";
			$i=$i+1;
		}
		
		$html.="<tr>
    <td height='20' colspan='7' class='sum_laporan'><div align='right'>Total</div></td>
    <td class='header_laporan'><div align='right'>".number_format($n1,0,',','.')."</div></td>
    <td class='header_laporan'><div align='right'>".number_format($n2,0,',','.')."</div></td>
<td class='header_laporan'><div align='right'>".number_format($n3,0,',','.')."</div></td>
    <td class='header_laporan'><div align='right'>".number_format($n4,0,',','.')."</div></td>
    <td class='header_laporan'><div align='right'>".number_format($n5,0,',','.')."</div></td>
    <td class='header_laporan'><div align='right'>".number_format($n1-$n5,0,',','.')."</div></td>
<td class='header_laporan'><div align='center'>".number_format($sisa_bln1,0,',','.')."</div></td>
<td class='header_laporan'><div align='center'>".number_format($sisa_sd1,0,',','.')."</div></td>
<td class='header_laporan'><div align='center'>".number_format($sisa_thn1,0,',','.')."</div></td>
  </tr>
</table>";
		
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

