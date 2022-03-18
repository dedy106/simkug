<?php
/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("server_util_Pdf");
uses("server_BasicObject");
uses("server_util_Map");
include_once("server/conf/dbSetting.php");

class server_report_report extends server_BasicObject
{
	protected $reportName;
	protected $filter;
	//protected $filter2;
	protected $classObj;
	protected $report;
	protected $config;
	function __construct($config = null)
	{
		parent::__construct();
		$this->config = $config;
	}
	protected function doSerialize()
	{
		parent::doSerialize();
		$this->serialize("config", "string",$this->config);
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}
	
//------------------------  
	function preview($classObj, $filter, $page, $rows, $showFilter, $perusahaan, $filter2, $dataFilter = null, $resultType = null)
	{				
		loadCSS("server_util_laporan");
		$this->setFilter($filter);			
	    uses($classObj);
	    eval("\$this->report = new ". $classObj."();");    
	    if (method_exists( $this->report,"setDBConnection") ) $this->report->setDBConnection($this->config);
 		$this->report->setFilter($filter);
		$this->report->setPage($page);
		$this->report->setRows($rows);
		$this->report->setShowFilter($showFilter);
		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);		
		if ($dataFilter != null) 
			$this->report->setDataFilter($dataFilter);
		return $this->report->getHtml($resultType);					
	}
    
	function getGroupHtml($classObj, $filter,$showFilter, $perusahaan, $filter2, $dataFilter = null)
	{		
		loadCSS("server_util_laporan");
		$this->setFilter($filter);			
	    uses($classObj);
	    eval("\$this->report = new ". $classObj."();");    
	    if (method_exists( $this->report,"setDBConnection") ) $this->report->setDBConnection($this->config);
 		$this->report->setFilter($filter);		
		$this->report->setShowFilter($showFilter);
		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null) 
			$this->report->setDataFilter($dataFilter);
		return $this->report->getGroupHtml();					
	}
	function getTotalPage($classObj,$filter, $rows, $filter2, $dataFilter = null)
	{
	    uses($classObj);
	    eval("\$this->report = new ".$classObj."();");    
	    if (method_exists( $this->report,"setDBConnection") ) $this->report->setDBConnection($this->config);
		$this->setFilter($filter);
		$this->report->setFilter($filter);
		$this->report->setRows($rows);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null)
			$this->report->setDataFilter($dataFilter);
		return $this->report->getTotalPage();		
	}
	//bk0809130
	//
	function createPdf($classObj, $filter, $page, $rows, $showFilter, $perusahaan, $filter2, $dataFilter = null, $connection = null)
	{		
		$this->setFilter($filter);
		uses($classObj);		
		eval('$this->report = new '.$classObj.'();');
		if (method_exists( $this->report,"setDBConnection") ) $this->report->setDBConnection($connection);
 		$this->report->setFilter($filter);
		$this->report->setPage($page);
		$this->report->setRows($rows);
		$this->report->setShowFilter($showFilter);
		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null)
			$this->report->setDataFilter($dataFilter);
		$ret = $this->report->createPdf();
		return $ret;					
	}
	function createXls2($classObj, $filter, $page, $rows, $showFilter, $perusahaan, $filter2, $dataFilter = null)
	{	
		$this->setFilter($filter);
		uses($classObj);
		eval('$this->report = new '.$classObj.'();');    
		if (method_exists( $this->report,"setDBConnection") ) $this->report->setDBConnection($this->config);
 		$this->report->setFilter($filter);
		$this->report->setPage($page);
		$this->report->setRows($rows);
		$this->report->setShowFilter($showFilter);
		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null)	
			$this->report->setDataFilter($dataFilter);
	  //$ret = $this->report->createXls();
		//return $ret;
		
		global $manager;
		$manager->setSendResponse(false);
		$html = $this->report->getHtml();		
		$name = md5(uniqid(rand(), true)) .".xls";
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
//		ob_end_clean();
//		error_log("server/tmp/$name");
//		return "server/tmp/$name";
		$filename = split("_",$classObj);
		$c = count($filename);
		$file = $filename[($c-1)]; 
		
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=". $file .".xls");
		header ("Content-Description: PHP/INTERBASE Generated Data" );
		readfile($save);
		unlink($save);
	  
		//return $ret;					
	}
	function createXls($classObj, $filter, $page, $rows, $showFilter, $perusahaan, $filter2, $dataFilter = null, $connection = null)
	{	
		$this->setFilter($filter);
		uses($classObj);
		eval('$this->report = new '.$classObj.'();');    
		if (method_exists( $this->report,"setDBConnection") ) $this->report->setDBConnection($connection || $this->config);
 		$this->report->setFilter($filter);
		$this->report->setPage($page);
		$this->report->setRows($rows);
		$this->report->setShowFilter($showFilter);
		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null)	
			$this->report->setDataFilter($dataFilter);
		global $manager;
		$manager->setSendResponse(false);
		$this->report->createXls();
	}
	function createCSV($classObj, $filter, $page, $rows, $showFilter, $perusahaan)
	{
		uses($classObj);
		eval('$this->report = new '.$classObj.'();');
		$this->report->setFilter($filter);
		$this->report->setPage($page);
		$this->report->setRows($rows);
		$this->report->setShowFilter($showFilter);
		$this->report->setPerusahaan($perusahaan);
		return $this->report->createCSV();		
	}
	function createTxt($classObj, $filter, $page, $rows, $showFilter, $perusahaan)
	{
	  uses($classObj);
		eval('$this->report = new '.$classObj.'();');  
		$this->report->setFilter($filter);
		$this->report->setPage($page);
		$this->report->setRows($rows);
		$this->report->setShowFilter($showFilter);
		$this->report->setPerusahaan($perusahaan);
		return $this->report->createTxt();		
	}
    function previewWithHeader2($classObj, $filter, $page, $rows, $showFilter, $perusahaan,$filter2, $dataFilter = null, $connection = null)
	{		
	  try
	  {
		error_log("clas ". $classObj);
  		$this->setFilter($filter);			
		uses($classObj);		
		eval("\$this->report = new ". $classObj."();");    		
		if (method_exists( $this->report,"setDBConnection") ) {
			if (isset($connection)){				
				$this->report->setDBConnection($connection);
			}else  $this->report->setDBConnection($this->config);
		}
   		$this->report->setFilter($filter);
		$this->report->setFilter2($filter2);
  		$this->report->setPage($page);
  		$this->report->setRows($rows);
  		$this->report->setShowFilter($showFilter);
  		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null)
			$this->report->setDataFilter($dataFilter);
  		$html = $this->report->getHtml();		
  		
        global $manager;
        $manager->setSendResponse(false);				
  		echo $html;
	   
      }catch(Exception $e)
	  {
	  	  error_log($e->getMessage());
	  }
	
	}
	function previewWithHeader($classObj, $filter, $page, $rows, $showFilter, $perusahaan,$filter2, $dataFilter = null, $connection = null)
	{		
	  try
	  {
		echo "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' />
<title>Preview</title>
</head>";
		
		loadCSS("server_util_laporan");
		
		
		echo "<body>";		
  		$this->setFilter($filter);			
		uses($classObj);		
		eval("\$this->report = new ". $classObj."();");    		
		if (method_exists( $this->report,"setDBConnection") ) {
			if (isset($connection)){				
				$this->report->setDBConnection($connection);
			}else  $this->report->setDBConnection($this->config);
		}
   		$this->report->setFilter($filter);
		$this->report->setFilter2($filter2);
  		$this->report->setPage($page);
  		$this->report->setRows($rows);
  		$this->report->setShowFilter($showFilter);
  		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null)
			$this->report->setDataFilter($dataFilter);
  		$html = $this->report->getHtml();		
  		
      global $manager;
      $manager->setSendResponse(false);				
  		//$name = md5(uniqid(rand(), true)) .".html";
  		//$save = $manager->getTempDir() . "/$name";
  		//$f=fopen($save,'w');
  		//fputs($f,$html);
  		//fclose($f);
  //		ob_end_clean();
  //		error_log("server/tmp/$name");
  //		return "server/tmp/$name";
       echo $html;
	   echo "</body>
</html>";
      //unlink($save); 
	  }catch(Exception $e)
	  {
	  	  error_log($e->getMessage());
	  }
		//return $html;					
	}
	function previewWithBs($classObj, $filter, $page, $rows, $showFilter, $perusahaan,$filter2, $dataFilter = null, $connection = null)
	{		
	  try
	  {
		echo "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'>
<html xmlns='http://www.w3.org/1999/xhtml'>
<head>
<title>Preview</title>
<meta charset='utf-8'>
<meta name='viewport' content='width=device-width, initial-scale=1'>
<link rel='stylesheet' type='text/css' href='bs/css/bootstrap.min.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/dataTables.bootstrap.min.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/buttons.datatables.min.css'>
<link rel='stylesheet' type='text/css' href='bs/css/AdminLTE.min.css'>
<link rel='stylesheet' type='text/css' href='bs/css/font-awesome.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/ionicons.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/jquery.treegrid.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/selectize.bootstrap3.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/sai.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/momen.min.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/daterangepicker.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/bootstrap-datepicker.min.css'/>
<link rel='stylesheet' type='text/css' href='bs/css/bootstrap-toggle.min.css'/>

<script type='text/javascript' src='bs/js/jquery.min.js'></script>
<script type='text/javascript' src='bs/js/jquery.treegrid.js'></script>
<script type='text/javascript' src='bs/js/jquery.treegrid.bootstrap3.js'></script>
<script type='text/javascript' src='bs/js/bootstrap.min.js'></script>
<script type='text/javascript' src='bs/js/inputmask.js'></script>
<!-- <script type='text/javascript' src='bs/js/highcharts2.js'></script>-->
<script src='https://code.highcharts.com/highcharts.js'></script>
<script src='https://code.highcharts.com/highcharts-more.js'></script>
<script type='text/javascript' src='bs/js/bullet.js'></script>
<!--<script type='text/javascript' src='bs/js/highcharts-more.js'></script>-->
<script type='text/javascript' src='bs/js/highcharts-3d.js'></script>
<script type='text/javascript' src='bs/js/jquery.dataTables.min.js'></script>
<script type='text/javascript' src='bs/js/dataTables.bootstrap.min.js'></script>
<script type='text/javascript' src='bs/js/selectize.min.js'></script>
<script type='text/javascript' src='bs/js/moment.min.js'></script>
<script type='text/javascript' src='bs/js/daterangepicker.js'></script>
<script type='text/javascript' src='bs/js/bootstrap-datepicker.min.js'></script>
<script type='text/javascript' src='bs/js/bootstrap-toggle.min.js'></script>
<script type='text/javascript' src='bs/js/dataTables.buttons.min.js'></script>
<script type='text/javascript' src='bs/js/jszip.min.js'></script>
<!-- <script type='text/javascript' src='bs/js/jquery.easing.1.3'></script>-->

<script type='text/javascript' src='bs/js/buttons.html5.min.js'></script>


<script type='text/javascript'>
    $(document).ready(function() {
        $('.tree').treegrid({
                    expanderExpandedClass: 'glyphicon glyphicon-minus',
                    expanderCollapsedClass: 'glyphicon glyphicon-plus'
                });
        $('.selectize').selectize();
	});
	
	function returnFalse(e) {        
		return false;
	}
	$(document).bind('contextmenu', returnFalse);
</script>


</head>


";
		
		//loadCSS("server_util_laporan");
		
		
		echo "<body style='overflow-x:scroll;'>";		
  		$this->setFilter($filter);			
		uses($classObj);		
		eval("\$this->report = new ". $classObj."();");    		
		if (method_exists( $this->report,"setDBConnection") ) {
			if (isset($connection)){				
				$this->report->setDBConnection($connection);
			}else  $this->report->setDBConnection($this->config);
		}
   		$this->report->setFilter($filter);
		$this->report->setFilter2($filter2);
  		$this->report->setPage($page);
  		$this->report->setRows($rows);
  		$this->report->setShowFilter($showFilter);
  		$this->report->setPerusahaan($perusahaan);
		$this->report->setFilter2($filter2);
		if ($dataFilter != null)
			$this->report->setDataFilter($dataFilter);
  		$html = $this->report->getHtml();		
  		
      global $manager;
      $manager->setSendResponse(false);				
  		
       echo $html;
	   echo "</body>
</html>";
      //unlink($save); 
	  }catch(Exception $e)
	  {
	  	  error_log($e->getMessage());
	  }
		//return $html;					
	}
	function previewHTML($id, $tipe, $file){
		try
	  {
		loadCSS("server_util_laporan");  		
		uses("server_DBConnection_dbLib");		
		global $manager;
		global $dbLib;				
		$rs = $dbLib->execute("select html from htmlrepo where tag = ". $id ."");
		if ($rs){			
			$manager->setSendResponse(false);			
			global $dbdriver;			
			if ($dbdriber == "mysqlt")
				$html = $rs->fields[0];
			else
				$html =$dbLib->BlobDecode(reset($rs->fields));	
			//$dbLib->execute("delete from htmlrepo where tag = ". $id ."");
			error_log($html ."\r\n" . $tipe . "\r\n" .$file);
			header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
			header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
			header ("Cache-Control: no-cache, must-revalidate");
			header ("Pragma: no-cache");
			if ($tipe == "xls"){
				header ("Content-type: application/x-msexcel");
				header ("Content-Disposition: attachment; filename=". $file .".". $tipe."");
				header ("Content-Description: PHP/INTERBASE Generated Data" );				
				echo $html;      	
			}else if ($tipe == "doc"){
				header ("Content-type: application/x-msword");
				header ("Content-Disposition: attachment; filename=". $file .".". $tipe."");
				header ("Content-Description: PHP/INTERBASE Generated Data" );				
				echo $html;      	
			}else{
				/*if(isset($HTTP_SERVER_VARS['HTTP_USER_AGENT']) and strpos($HTTP_SERVER_VARS['HTTP_USER_AGENT'],'MSIE'))
					header('Content-Type: application/force-download');
				else
					header('Content-Type: application/octet-stream');
				header('Content-Length: '.strlen($html));
				*/
				uses("server_pdf_Pdf");	
				$pdf = new server_pdf_Pdf();
				$ret = $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);
				return $ret;
			};					
			
		}
	  }catch(Exception $e)
	  {
	  	  error_log($e->getMessage());
	  }
	}
//------------------------setter getter	
	function setReportName($data)
	{
		$this->reportName = $data;
	}
	function getReportName()
	{
		return $this->reportName;
	}
	function setFilter($filter)
	{
		$this->filter = $filter;
	}
	/*function setFilter($filter)
	{
		$this->filter2 = $filter;
	}*/
	function getFilter()
	{
		return $this->filter;
	}
	function setClassObj($classObj)
	{
	   try
	   {            
  	   uses($classObj);
  	   $this->classObj = $classObj;         	                   	   
  	 }catch(Exception $e)
  	 {
  	   error_log($e->getMessage());
     }
  	  
	}
	function downloadChart(){
		uses("PHPExcel_PHPExcel");
        uses("PHPExcel_Writer_Excel2007");        
		uses("PHPExcel_Worksheet_Drawing_Chart");
		$objPHPExcel = new PHPExcel_PHPExcel();

        $objPHPExcel->getProperties()->setCreator("Test");
        $objPHPExcel->getProperties()->setLastModifiedBy("Test");

        $objPHPExcel->setActiveSheetIndex(0);

        $sheet = $objPHPExcel->getActiveSheet();

        $sheet->setTitle("Test Chart");

        // -------------------------- Set Value --------------------------------
        
        $sheet->setCellValue("A1", "TestChart");
        
        $rowNo = 2;
        $first = true;
        
        $totalCol = 0;
		$values = array( 'Mg1' => array('rcn' => 0, 'prog' => 0, 'prog2' => 0), 
						 'Mg2' => array('rcn' => 10, 'prog' => 5, 'prog2' => 0), 
						 'Mg3' => array('rcn' => 20, 'prog' => 10, 'prog2' => 5), 
						 'Mg4' => array('rcn' => 50, 'prog' => 40, 'prog2' => 30) );
		
        foreach ($values as $groupKey => $groupList)
        {
            $sheet->setCellValue("A$rowNo", $groupKey);

            $colNo = 1;

            if ($first)
            {
                foreach ($groupList as $key => $value)
                {
                    $colString = PHPExcel_Cell::stringFromColumnIndex($colNo);
                    $sheet->setCellValue($colString . "1", $key);
                    $sheet->setCellValue($colString . $rowNo, $value);
                    
                    $totalCol++;
                    $colNo++;
                }
                
                $first = false;
            }
            else
            {
                foreach ($groupList as $key => $value)
                {

                    $colString = PHPExcel_Cell::stringFromColumnIndex($colNo);
                    $sheet->setCellValue($colString . $rowNo, $value);
                    $colNo++;
                }
            }
            
            $rowNo++;
        }
        
        // ---------------------------- Chart ----------------------------------
        
        uses("PHPExcel_Worksheet_Drawing_Chart");

        $objDrawing = new PHPExcel_Worksheet_Drawing_Chart();
        $objDrawing->setName('Chart 1');
        $objDrawing->setDescription('Chart');

        $objDrawing->setCoordinates("A" . ($rowNo + 2) . ":J" . ($rowNo + 24));
        $objDrawing->setDataWorksheet($sheet);
        
        $dataColString = PHPExcel_Cell::stringFromColumnIndex($totalCol);
        error_log("A1:$dataColString" . ($rowNo - 1) ." ".$totalCol);
        $objDrawing->setDataCoordinates("A1:$dataColString" . ($rowNo - 1));

        if ($chartType == 1)
            $objDrawing->setChartType(PHPExcel_Worksheet_Drawing_Chart::CHART_LINE);
        else
            $objDrawing->setChartType(PHPExcel_Worksheet_Drawing_Chart::CHART_BAR);
            
        $objDrawing->setWorksheet($sheet);
        
        // ------------------------- Temp File ---------------------------------
        
        $fileName = "tmp/" . md5(uniqid(rand(), true)) . ".xlsx";
        
        $objWriter = new PHPExcel_Writer_Excel2007($objPHPExcel);
		$objWriter->save($fileName);  
		$title2 = "TestFile";
        
        Header("Content-type: application/octet-stream");
        Header("Content-Disposition: attachment; filename=$title2.xlsx");
        readfile($fileName);
        
        unlink($fileName);
	}

}
?>
