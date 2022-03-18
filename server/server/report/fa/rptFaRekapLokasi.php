<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_fa_rptFaRekapLokasi
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$sql ="select 1 ";
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
		$periode=$tmp[1];
		$nik_user=$tmp[0];
		$sql = "select kode_fa,fn_spasi(nama,level_spasi) as nama,n1,n2,n3,n4,n5 from fa_tmp ".$this->filter.
				"and nik_user='$nik_user' order by kode_fa ";
		//$start = (($this->page-1) * $this->rows);
		//$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$rs = $dbLib->execute($sql);
		error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan rekap lokasi asset",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='50' rowspan='2' align='center' class='header_laporan'>Kode</td>
				<td width='200' rowspan='2' align='center' class='header_laporan'>Nama</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Perolehan</td>
				<td colspan='3' align='center' class='header_laporan'>Nilai Depresiasi </td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Buku</td>
				</tr>
				<tr bgcolor='#CCCCCC'>
				  <td width='100'  align='center' class='header_laporan'>S/D Bulan Lalu </td>
				  <td width='100' align='center' class='header_laporan'>Bulan Ini </td>
				  <td width='100' align='center' class='header_laporan'>S/D Bulan Ini </td>
  </tr>";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$n4=$n4+$row->n4;
			$n5=$n5+$row->n5;
		    $html.="<tr
				  <td class='isi_laporan'>$row->kode_fa</td>
				  <td class='isi_laporan'>$row->nama</td>
				  <td class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($row->n4,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($row->n5,0,",",".")."</td>
  </tr>";
			
			$i=$i+1;
		}
		$html.="<tr >
				  <td colspan='2'  class='isi_laporan' align='right'>Total</td>
				  <td  class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
				  <td class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($n4,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($n5,0,",",".")."</td>
  </tr></table>";
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
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
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
