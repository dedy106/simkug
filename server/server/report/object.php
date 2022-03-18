<?php

interface server_report_object
{
	public function getTotalPage();
	public function getHtml();
	public function preview();
	public function createPdf();
	public function setFilter($filter);
	public function setFilter2($filter);
	public function setRows($data);
	public function setPage($page);
	public function setCaption($caption);
	public function setPerusahaan($perusahaan);
	public function setShowFilter($filter);
}

?>
