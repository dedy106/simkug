<?php
uses("server_pdf_Pdf");
uses("server_report_object");

class server_report_basic implements server_report_object
{
	public $caption;
	public $filter;
	public $filter2;
	
	public $rows;
	public $page;
	public $showFilter;
	public $lokasi;	
	public $dbConnection;
	
	public function getTotalPage(){
	}
	public function getHtml(){
	}
	public function preview()
	{
		return $this->getHtml();
	}
	public function createPdf()
	{		
		$html = $this->getHtml();		
		$pdf = new server_pdf_Pdf();
		$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
		return $ret;		
	}
	public function setFilter($filter)
	{
		$this->filter = $filter;
	}
	public function setFilter2($filter)
	{
		$this->filter2 = $filter;
	}
	public function setRows($data)
	{
		$this->rows = $data;
	}
	public function setPage($page)
	{
		$this->page = $page;
	}	
	public function setCaption($caption)
	{
		$this->caption = $caption; 
	}
	public function setPerusahaan($perusahaan)
	{
		$this->lokasi = $perusahaan; 
	}
	public function setShowFilter($filter)
	{
		$this->showFilter = $filter; 
	}
	public function setDBConnection($connection){
		$this->dbConnection = $connection;
	}
	
}

