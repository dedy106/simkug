<?php
	
		global $dirSeparator;
		global $serverDir;
		if (!defined('NEW_LINE'))
		   define("NEW_LINE", "<br>\r\n");
		
		define("WIN", "win");
		define("LINUX", "linux");
		if (strtoupper(substr(PHP_OS, 0, 3)) === 'WIN')
		{
			$platform = WIN;
			$dirSeparator = "\\";
			$separator = ";";
		}
		else
		{
			$platform = LINUX;
			$dirSeparator = "/";
			$separator = ":";
		}
		error_reporting (E_ALL & ~E_NOTICE );
		
		$serverDir = __FILE__;
		
		global $rootDir;

		$pos = strrpos($serverDir, $dirSeparator);
		$serverDir = substr($serverDir, 0, $pos);
		$pos = strrpos($serverDir, $dirSeparator);
		$rootDir = substr($serverDir, 0, $pos);
		$pos = strrpos($rootDir, $dirSeparator);
		$path = $rootDir;
		$rootDir = substr($rootDir,$pos);

		
			include_once("library.php");
			uses("server_DBConnection_dbLib");
			$done = false;	
			$dbLib = new server_DBConnection_dbLib("mssql");	

            // header("Pragma: public");
			// header("Expires: 0");
			// header("Cache-Control: must-revalidate, post-check=0, pre-check=0"); 
			// header("Content-Type: application/force-download");
			// header("Content-Type: application/octet-stream");
			// header("Content-Type: application/download");;
			// header("Content-Disposition: attachment;filename=doc1.xls"); 
            // header("Content-Transfer-Encoding: binary ");
            

            // echo "<table border='1' style='border-collapse:collapse'>
            // <tr>
            //     <th width='90'  align='center' >Kode Lokasi</th>
            //     <th width='90'  align='center' >Periode</th>
            //     <th width='90'  align='center' >Nik</th>
			// 	<th width='90'  align='center' >Kode PP</th>
			// 	<th width='90'  align='center' >Jenis</th>
            //     <th width='90'  align='center' >Kunci</th>
            //     <th width='90'  align='center' >Nama</th>
			// 	<th width='90'  align='center' >Param</th>
			// 	<th width='90'  align='center' >Key</th>
            // </tr> 
            // <tr>
            //     <td width='90'  align='center' >".$_GET['kode_lok']."</td>
            //     <td width='90'  align='center' >".$_GET['periode']."</td>
            //     <td width='90'  align='center' >".$_GET['nik']."</td>
            //     <td width='90'  align='center' >".$_GET['kode_pp']."</td>
            //     <td width='90'  align='center' >".$_GET['jenis']."</td>
			// 	<td width='90'  align='center' >".$_GET['kunci']."</td>
			// 	<td width='90'  align='center' >".$_GET['nama']."</td>
            //     <td width='90'  align='center' >".$_GET['param']."</td>
            //     <td width='90'  align='center' >".$_GET['key']."</td>
            // </tr> 
			// </table>";

		
			//set the desired name of the excel file
			$fileName = 'c_exs';

			//prepare the records to be added on the excel file in an array
			$excelData = array(
				0 => array('Jackson','Barbara','27','F','Florida'),
				1 => array('Kimball','Andrew','25','M','Texas'),
				2 => array('Baker','John','28','M','Arkansas'),
				3 => array('Gamble','Edward','29','M','Virginia'),
				4 => array('Anderson','Kimberly','23','F','Tennessee'),
				5 => array('Houston','Franchine','25','F','Idaho'),
				6 => array('Franklin','Howard','24','M','California'),
				7 => array('Chen','Dan','26','M','Washington'),
				8 => array('Daniel','Carolyn','27','F','North Carolina'),
				9 => array('Englert','Grant','25','M','Delaware')
			);

			uses("server_xls_PHPExcel");

			// require_once $path ."/server/xls/PHPExcel.php";	

			// uses("server_xls_PHPExcel_PHPExcel"); 
			// Create new PHPExcel object
			$objPHPExcel = new server_xls_PHPExcel();	

			// Set document properties
			$objPHPExcel->getProperties()->setCreator("Me")->setLastModifiedBy("Me")->setTitle("My Excel Sheet")->setSubject("My Excel Sheet")->setDescription("Excel Sheet")->setKeywords("Excel Sheet")->setCategory("Me");

			// Set active sheet index to the first sheet, so Excel opens this as the first sheet
			$objPHPExcel->setActiveSheetIndex(0);

			// Add column headers
			$objPHPExcel->getActiveSheet()
						->setCellValue('A1', 'Last Name')
						->setCellValue('B1', 'First Name')
						->setCellValue('C1', 'Age')
						->setCellValue('D1', 'Sex')
						->setCellValue('E1', 'Location')
						;

			//Put each record in a new cell
			for($i=0; $i<count($excelData); $i++){
				$ii = $i+2;
				$objPHPExcel->getActiveSheet()->setCellValue('A'.$ii, $excelData[$i][0]);
				$objPHPExcel->getActiveSheet()->setCellValue('B'.$ii, $excelData[$i][1]);
				$objPHPExcel->getActiveSheet()->setCellValue('C'.$ii, $excelData[$i][2]);
				$objPHPExcel->getActiveSheet()->setCellValue('D'.$ii, $excelData[$i][3]);
				$objPHPExcel->getActiveSheet()->setCellValue('E'.$ii, $excelData[$i][4]);
			}

			// Set worksheet title
			$objPHPExcel->getActiveSheet()->setTitle($fileName);

			header('Content-Type: application/vnd.ms-excel');
			header('Content-Disposition: attachment;filename="' . $fileName . '.xls"');
			header('Cache-Control: max-age=0');

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'Excel5');
			$objWriter->save('php://output');

	
?>
