<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptSdmLoker
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
		
		$sql = "select count(kode_lokasi) from hr_lokasi ".$this->filter;
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
		$sql = "select kode_lokasi,nama,alamat,kota,kodepos,no_telp,no_fax,email,website,pic from hr_lokasi ".$this->filter.
				" order by kode_lokasi";				
		uses("server_util_arrayList");
		$title = new server_util_arrayList();
		$width = new server_util_arrayList();
		$fieldType = new server_util_arrayList();		
		$title-> add("kode");$width->add(40);$fieldType->add("S");		
		$title-> add("nama");$width->add(100);$fieldType->add("S");		
		$title->add("alamat");$width->add(200);$fieldType->add("S");		
		$title->add("kota");$width->add(60);$fieldType->add("D");	
		$title->add("kodepos");$width->add(50);$fieldType->add("S");		
		$title->add("no_telp");$width->add(90);$fieldType->add("N");	
		$title->add("no_fax");$width->add(90);$fieldType->add("S");	
		$title->add("email");$width->add(60);$fieldType->add("D");	
		$title->add("website");$width->add(90);$fieldType->add("S");	
		$title->add("pic");$width->add(60);$fieldType->add("D");	
		
		$html=$dbLib->sqlToHtml($sql,$this->page,$this->rows,$title, $width, $fieldType,false);		
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
