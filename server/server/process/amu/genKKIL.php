<?php
uses("server_util_Pdf");
uses("server_BasicObject");
uses("server_util_Map");
uses("server_DBConnection_dbLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_process_amu_genKKIL extends server_BasicObject
{	
	
	var $filename;
	var $tmpfile;
	
	function __construct()
	{
		parent::__construct();
		
	}
	protected function doSerialize()
	{
		parent::doSerialize();		
	}
	function init()
	{
		parent::init();
	}
	function deinit()
	{
		parent::deinit();
	}
	function createData($no_bukti,$lokasi, $lokfa, $tgl, $periode){		
		global $dbLib;
		$rs = $dbLib->execute("select * from (select a.no_gabung, a.no_fa, a.no_sn, f.kode_lokfa as divisi, e.kode_lokfa as regional, d.kode_lokfa as area  from amu_asset a 
												  	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode 
												  	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa 
												    inner join amu_lokasi e on e.kode_lokfa = d.kode_induk 
												   inner join amu_lokasi f on f.kode_lokfa = e.kode_induk 
												  	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode 
												   where a.kode_lokasi = '".$lokasi."' and f.kode_lokfa = '".$lokfa."' and a.periode = '".$periode."' and b.no_gabung is null 
												   union 
												  select a.no_gabung, a.no_fa, a.no_sn, e.kode_lokfa as divisi, d.kode_lokfa as regional,'-' as area   from amu_asset a 
												  	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode 													  
												  	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa 
												   inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' 
												  	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode 
												   where a.kode_lokasi = '".$lokasi."' and e.kode_lokfa = '".$lokfa."' and a.periode = '".$periode."' and b.no_gabung is null 
												   union 
												  select a.no_gabung, a.no_fa, a.no_sn, d.kode_lokfa as divisi, '-' as regional, '-' as area  from amu_asset a 
												  	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'FISIK' and c.periode = a.periode 
												  	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa and d.kode_induk = '00' 			  
												  	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode 
												   where a.kode_lokasi = '".$lokasi."' and a.kode_lokfa = '".$lokfa."' and a.periode = '".$periode."' and b.no_gabung is null) a order by  divisi, regional, area ");
		$sql = new server_util_arrayList();
		$format = $lokfa .".".substr($periode,0,4).".";
		$numeric = substr($no_bukti,0,strlen($format));
		$nu = floatval(substr($no_bukti,strlen($format)));
		while ($row = $rs->FetchNextObject(true)){
			$sql->add("insert into amu_distaset_m (no_bukti,  kode_lokasi, kode_lokfa, tanggal,  periode, nik_user, tgl_input, jenis)values 
				('".$no_bukti."','".$lokasi ."', '". $lokfa."',".$tgl.", '".$periode."','-',sysdate,'-')");
			$sql->add("insert into amu_distaset_d (no_bukti, kode_lokasi, no_gabung,no_fa,no_sn, periode) values 
				('".$no_bukti."','".$lokasi."', '".$row->NO_GABUNG."' , '".$row->NO_FA."', '".$row->NO_SN."','".$periode."' )");		
			$nu++;
			$numeric = strval($nu);
			for ($i=strlen($numeric); $i < 6; $i++) $numeric = "0" . $numeric;
			$no_bukti = $format .$numeric;			
		}
		
		return $dbLib->execArraySQL($sql);			
	}
	function updatePlant(){
		global $dbLib;
		$rs = $dbLib->execute("select * from x002 b
						 inner join amu_asset a on concat(asset,sno) = a.no_gabung 
						where (b.plnt) <> (a.ref1) ");
		$sql = new server_util_arrayList();
		while ($row = $rs->FetchNextObject(true)){
			$sql->add("update amu_asset set ref1 = '".$row->PLNT."' where no_gabung = '". $row->NO_GABUNG."' ");
		}
		return $dbLib->execArraySQL($sql);
	}
	function updateLocation(){
		global $dbLib;
		$rs = $dbLib->execute("select * from x010 b
					 inner join amu_asset a on concat(asset,sno) = a.no_gabung 
					where (b.location) <> (a.ref2) ");
		$sql = new server_util_arrayList();
		while ($row = $rs->FetchNextObject(true)){
			$sql->add("update amu_asset set ref2 = '".$row->LOCATION."' where no_gabung = '". $row->NO_GABUNG."' ");
		}
		return $dbLib->execArraySQL($sql);			
	}
	function updateAlamat(){
		global $dbLib;
		$rs = $dbLib->execute("select * from xzcon b
					 inner join amu_asset a on concat(asset,sno) = a.no_gabung 
					where (b.descript2) <> (a.nama2) ");
		$sql = new server_util_arrayList();
		while ($row = $rs->FetchNextObject(true)){
			$sql->add("update amu_asset set ref2 = '".$row->LOCATION."' where no_gabung = '". $row->NO_GABUNG."' ");
		}
		return $dbLib->execArraySQL($sql);			
	}
	function createXls($divisi){
		uses("server_xls_Writer", false);		
		uses("server_util_AddOnLib");
		uses("server_util_Map");
		global $manager;
		
		$namafile2 = $manager->getTempDir()."/KKIL.html";						
						
		global $dbLib;		
		$sql1 = "select * from (select distinct aa.no_bukti, b.no_fa, b.no_sn, b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where e.kode_lokfa = '$divisi'
				union 
				select distinct aa.no_bukti, b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,'-' as nmarea, c.nama as nmsbis, d.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where d.kode_lokfa = '$divisi'
				union 
				select distinct aa.no_bukti, b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,'-' as nmarea, '-' as nmsbis, c.nama as nmubis,b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where c.kode_lokfa = '$divisi') a order by no_bukti, nmubis, nmsbis, nmarea, nmklp";				
		$rsplant = $dbLib->execute("select distinct plnt,plant_desc from xlocation ");
		$plant = new server_util_Map();
		while ($row = $rsplant->FetchNextObject(true)){
			$plant->set($row->PLNT, $row->PLANT_DESC);
		}
		$rsloc = $dbLib->execute("select distinct location,dcs_area from xlocation ");
		$dcs_loc = new server_util_Map();
		while ($row = $rsloc->FetchNextObject(true)){
			$dcs_loc->set($row->LOCATION, $row->DCS_AREA);
		}
		
		$rs1 = $dbLib->execute($sql1);				
		$no = "";
		$i = 1;
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$AddOnLib=new server_util_AddOnLib();		
		$html = "";
		$jenis = $this->filter2;		
		if (!file_exists($manager->getWorkingDir()."/media/amu"))
			mkdir($manager->getWorkingDir()."/media/amu");
		if (!file_exists($manager->getWorkingDir()."/media/amu/fisik"))
			mkdir($manager->getWorkingDir()."/media/amu/fisik");
		$rootFolder = $manager->getWorkingDir()."/media/amu/fisik";
		$nmdivisi = "";
		$nmregional = "";
		$nmarea = "";
		$coltitle = array("Asset", "SNo.","Descript.","Class Desc.","Descript2.","Cap.Date","Acquis.Val","Accum.val","Book.val","Quantity","Area","SBIS","UBIS","Dist.No","Class","APC","APC Desc","BA","Plant","Location");		
		$pdfFolder = "~/PDF/amu/fisik";
		
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{			
			$nmubis = $row1->NMUBIS;
			if (!file_exists($rootFolder."/".str_replace(" ","_",$nmubis))){				
				mkdir($rootFolder."/".str_replace(" ","_",$nmubis));
				$folderDiv = $rootFolder."/".str_replace(" ","_",$nmubis);				
			}else $folderDiv = $rootFolder."/".str_replace(" ","_",$nmubis);
			
			if (!file_exists($pdfFolder."/".str_replace(" ","_",$nmubis))){								
				$pdffolderDiv = $pdfFolder."/".str_replace(" ","_",$nmubis);				
			}else $pdffolderDiv = $pdfFolder."/".str_replace(" ","_",$nmubis);
			
			$nmsbis = $row1->NMSBIS;			
			if (substr($row1->KODE_LOKFA,0,2) == "T9" && $row1->PLANT != '-' && trim($row1->PLANT) != ''){
				$nmsbis = $row1->PLANT;
			}			
			if (substr($row1->KODE_LOKFA,0,3) == "T50" && $row1->KODE_LOKFA != "T503"){
				$nmsbis = "Kantor Divisi ". ucwords($row1->NMUBIS);
			}else if (trim($row1->KODE_LOKFA) == "T503"){
				$nmubis = "INFRATEL";
				$nmsbis = "Kantor Divisi Infratel";
			}
			if ($nmsbis != "-" && !file_exists($folderDiv."/".str_replace(" ","_",$nmsbis))){				
				mkdir($folderDiv."/".str_replace(" ","_",$nmsbis));
				$folderRegional = $folderDiv."/".str_replace(" ","_",$nmsbis);				
			}else if (file_exists($folderDiv."/".str_replace(" ","_",$nmsbis)))
				$folderRegional = $folderDiv."/".str_replace(" ","_",$nmsbis);
			else $folderRegional = "-";
			
			if ($nmsbis != "-" && !file_exists($pdffolderDiv."/".str_replace(" ","_",$nmsbis))){				
				$pdffolderRegional = $pdffolderDiv."/".str_replace(" ","_",$nmsbis);				
			}else if (file_exists($pdffolderDiv."/".str_replace(" ","_",$nmsbis)))
				$pdffolderRegional = $pdffolderDiv."/".str_replace(" ","_",$nmsbis);
			else $pdffolderRegional = "-";
			
			$nmlocation = $row1->NMAREA;
			if (substr($row1->KODE_LOKFA,0,2) == "T9" && $row1->LOCATION != '-' && trim($row1->LOCATION) != ''){
				$nmlocation = $dcs_loc->get( $row1->LOCATION );			
			}
			if ($nmlocation != "-" && $folderRegional != '-' && !file_exists($folderRegional."/".str_replace(" ","_",$nmlocation))){				
				mkdir($folderRegional."/".str_replace(" ","_",$nmlocation));
				$folderArea = $folderRegional."/".str_replace(" ","_",$nmlocation);						
			}else if (file_exists($folderRegional."/".str_replace(" ","_",$nmlocation)))
				$folderArea = $folderRegional."/".str_replace(" ","_",$nmlocation);		
			else $folderArea = "-";
			
			if ($nmlocation != "-" && $pdffolderRegional != '-' && !file_exists($pdffolderRegional."/".str_replace(" ","_",$nmlocation))){								
				$pdffolderArea = $pdffolderRegional."/".str_replace(" ","_",$nmlocation);						
			}else if (file_exists($pdffolderRegional."/".str_replace(" ","_",$nmlocation)))
				$pdffolderArea = $pdffolderRegional."/".str_replace(" ","_",$nmlocation);		
			else $pdffolderArea = "-";
			
			
			if ($nmdivisi != $row1->NMUBIS){
				$nmdivisi = $row1->NMUBIS;
				if ($excelDivisi != null)  $excelDivisi->close();
				$excelDivisi = new Spreadsheet_Excel_Writer($folderDiv."/List NKA.xls");
				$sheetdivisi =& $excelDivisi->addWorksheet($nmdivisi);								
				$numFormatD =& $excelDivisi->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top'));
				$normalFormatD =& $excelDivisi->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top'));
				$headerFormatD =& $excelDivisi->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1, 'pattern' => 1, 'fgcolor' => 'green'));	//, 
				$rowcountd = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetdivisi->write($rowcountd, $i,$rs1->FetchField($i)->name,$headerFormatD);
				$rowcountd = 1;
			}
			if ($nmregional != $nmsbis && $folderRegional != '-'){
				$nmregional = $nmsbis;
				if ($excelRegional != null)  $excelRegional->close();
				$excelRegional = new Spreadsheet_Excel_Writer($folderRegional."/List NKA.xls");															
				$sheetregional =& $excelRegional->addWorksheet($nmregional);
				$numFormatR =& $excelRegional->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top'));
				$normalFormatR =& $excelRegional->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top'));
				$headerFormatR =& $excelRegional->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1, 'pattern' => 1, 'fgcolor' => 'green'));	//, 
				$rowcountr = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetregional->write($rowcountr, $i,$rs1->FetchField($i)->name,$headerFormatR);
				$rowcountr = 1;
			}else if ($excelRegional != null && $nmregional != $nmsbis){
				$excelRegional->close();
				$rowcountr = 0;
			}
			
			if ($nmarea != $nmlocation && $folderArea != '-'){
				$nmarea = $nmlocation;
				if ($excelArea != null)  $excelArea->close();
				$excelArea = new Spreadsheet_Excel_Writer($folderArea."/List NKA.xls");					
				$sheetarea =& $excelArea->addWorksheet($nmarea);				
				$numFormatA =& $excelArea->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top'));
				$normalFormatA =& $excelArea->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top'));
				$headerFormatA =& $excelArea->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1, 'pattern' => 1, 'fgcolor' => 'green'));	//, 
				$rowcounta = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetarea->write($rowcounta, $i,$rs1->FetchField($i)->name,$headerFormatR);
				$rowcounta = 1;
			}else if ($excelArea != null) {
				$excelArea->close();
				$rowcounta = 0;
			}
			$line = (array) $row1;
			$i = 0;
			foreach ($line as $key => $value)
			{				
				if ($rs1->FetchField($i)->type == "N" || $rs1->FetchField($i)->type == "real" || $rs1->FetchField($i)->type == "float"){
					$sheetdivisi->write($rowcountd, $i, $value, $numFormatD);
					if ($nmregional != '-' && $nmregional != '')  $sheetregional->write($rowcountr, $i, $value, $numFormatR);					
					if ($nmarea != '-' && $nmarea != '') $sheetarea->write($rowcounta, $i, $value, $numFormatA);					
				}else{
					$sheetdivisi->writeString($rowcountd, $i, $value,$normalFormatD);				
					if ($nmregional != '-' && $nmregional != '') $sheetregional->writeString($rowcountr, $i, $value, $normalFormatR);					
					if ($nmarea != '-' && $nmarea != '') $sheetarea->writeString($rowcounta, $i, $value, $normalFormatA);					
				}
				$i++;
			}		
			$rowcountd++;
			$rowcountr++;
			$rowcounta++;
			if ($no != $row1->NO_BUKTI){
				if ($folderArea != '-')
					$namafile = $folderArea;		
				else if ($folderRegional != '-')
					$namafile = $folderRegional;		
				else $namafile = $folderDiv;		
				
				if ($pdffolderArea != '-')
					$namafile2 = $pdffolderArea;		
				else if ($pdffolderRegional != '-')
					$namafile2 = $pdffolderRegional;		
				else $namafile2 = $pdffolderDiv;		
				
				if (!file_exists($namafile."/".$row1->KODE_KLPFA))
					mkdir($namafile."/".$row1->KODE_KLPFA);
				
					
				$namafile .= "/".$row1->KODE_KLPFA ."/". $row1->NO_BUKTI .".xls";
				$namafile2 .= "/".$row1->KODE_KLPFA ."/". $row1->NO_BUKTI .".pdf";
				$excel = new Spreadsheet_Excel_Writer($namafile);		
				//$excel->send("kkil.xls");
				$excel->setCustomColor(14, 192,192,192); 
				
				$headerFormat =& $excel->addFormat(array('bold' => true, 'halign' => 'center','valign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1,'size' => 9));	//, 
				$numFormat =& $excel->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top','textwrap' => 1,'size' => 9));
				$normalFormat =& $excel->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top','textwrap' => 1,'size' => 9));
				$yellow =& $excel->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1,'size' => 9));		
				$green =& $excel->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	,'size' => 9));
				$format_top_center =& $excel->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
				$formatCatatan =& $excel->addFormat(array('size' => 8));		
				
				$sheet =& $excel->addWorksheet("Lampiran - ". (substr($row1->KODE_KLPFA,0,3) == "101" ? "1":"2"));				
				$sheet->protect("amu");
				$sheet->setMerge(4,0,4,19);
				$sheet->setMerge(1,18,1,19);$sheet->write(1,18,"Lampiran ". (substr($row1->KODE_KLPFA,0,3) == "101" ? "1":"2"));
				$sheet->setHeader("",0.19);
				$sheet->setFooter("",0.19);
				$sheet->setMargins("",0.30);
				//$sheet->setMarginLeft("",0.50);
				$sheet->setPrintScale(90);
				$sheet->setPaper(9); //A4
				$sheet->setLandscape();
				$sheet->setColumn(1,1,3); 
				$sheet->setColumn(2,2,6); 
				$sheet->setColumn(3,3,6); 
				$sheet->setColumn(4,4,8); 
				$sheet->setColumn(5,5,6); 
				$sheet->setColumn(8,8,8); 
				$sheet->setColumn(11,11,6); 
				$sheet->setColumn(12,12,5); 
				$sheet->setColumn(14,14,8); 
				$sheet->setColumn(16,16,8); 
				$sheet->setColumn(18,18,8); 
				$colStart = 4;
				$sheet->write($colStart,0, "KERTAS KERJA INVENTARISASI LAPANGAN (KKIL)",$format_top_center);
				for ($i=1;$i <= 19;$i++) $sheet->write($colStart,$i, "",$format_top_center);
				$sheet->setMerge($colStart + 2,1,$colStart + 2,2);$sheet->write($colStart + 2,1, "Divisi/UBIS");$sheet->setMerge($colStart + 2,3,$colStart + 2,14);$sheet->write($colStart + 2,3, ":".$nmubis);
				$sheet->setMerge($colStart + 3,1,$colStart + 3,2);$sheet->write($colStart + 3,1, "Regional");$sheet->setMerge($colStart + 3,3,$colStart + 3,14);$sheet->write($colStart + 3,3, ":".$nmsbis);
				$sheet->setMerge($colStart + 4,1,$colStart + 4,2);$sheet->write($colStart + 4,1, "Area");$sheet->setMerge($colStart + 4,3,$colStart + 4,14);$sheet->write($colStart + 4,3, ":");
				$sheet->setMerge($colStart + 5,1,$colStart + 5,2);$sheet->write($colStart + 5,1, "Group Aset");$sheet->setMerge($colStart + 5,3,$colStart + 5,14);$sheet->write($colStart + 5,3, ":".$row1->NMKLP." ".$row1->NMAPC);
				$sheet->write($colStart + 2,17, "Nomor");
				$sheet->setMerge($colStart + 2,18,$colStart + 2,19);$sheet->write($colStart + 2,18, ":".$row1->NO_BUKTI);
				
				$no = $row1->NO_BUKTI;				
				$sheet->setMerge($colStart + 7,0,$colStart + 7,19);
				$sheet->setMerge($colStart + 11,0,$colStart + 11,19);
				$sheet->write($colStart + 7,0,"DATA SAP AM", $yellow);for ($i=1;$i <= 19;$i++) $sheet->write($colStart + 7,$i, "",$yellow);				
				
				$sheet->setMerge(12,0,12,1);$sheet->write(12,0, "No Kartu", $headerFormat);$sheet->write(12,1, "", $headerFormat);
				$sheet->write(12,2, "SN", $headerFormat);
				$sheet->write(12,3, "BusA", $headerFormat);
				$sheet->write(12,4, "APC", $headerFormat);
				$sheet->write(12,5, "Class", $headerFormat);
				$sheet->setMerge(12,6,12,8);$sheet->write(12,6, "Deskripsi Aset", $headerFormat);for ($i=7;$i <= 8;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(12,9,12,10);$sheet->write(12,9, "Deskripsi Alamat", $headerFormat);for ($i=10;$i <= 10;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(12,11,12,12);$sheet->write(12,11, "Cap Date", $headerFormat);$sheet->write(12,12, "", $headerFormat);
				$sheet->setMerge(12,13,12,14);$sheet->write(12,13, "Harga Perolehan", $headerFormat);$sheet->write(12,14, "", $headerFormat);
				$sheet->setMerge(12,15,12,16);$sheet->write(12,15, "Akumulasi Penyusutan", $headerFormat);$sheet->write(12,16, "", $headerFormat);
				$sheet->setMerge(12,17,12,18);$sheet->write(12,17, "Nilai Buku", $headerFormat);$sheet->write(12,18, "", $headerFormat);
				$sheet->write(12,19, "Quantity SAP", $headerFormat);
				
				$sheet->setMerge(13,0,13,1);$sheet->write(13,0, "1", $headerFormat);$sheet->write(13,1, "", $headerFormat);
				$sheet->write(13,2, "2", $headerFormat);
				$sheet->write(13,3, "3", $headerFormat);
				$sheet->write(13,4, "4", $headerFormat);
				$sheet->write(13,5, "5", $headerFormat);
				$sheet->setMerge(13,6,13,8);$sheet->write(13,6, "6", $headerFormat);for ($i=7;$i <= 8;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->setMerge(13,9,13,10);$sheet->write(13,9, "7", $headerFormat);for ($i=10;$i <= 11;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->setMerge(13,11,13,12);$sheet->write(13,11, "8", $headerFormat);$sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(13,13,13,14);$sheet->write(13,13, "9", $headerFormat);$sheet->write(13,14, "", $headerFormat);
				$sheet->setMerge(13,15,13,16);$sheet->write(13,15, "10", $headerFormat);$sheet->write(13,16, "", $headerFormat);
				$sheet->setMerge(13,17,13,18);$sheet->write(13,17, "11", $headerFormat);$sheet->write(13,18, "", $headerFormat);
				$sheet->write(13,19, "12", $headerFormat);
				
				$sheet->setMerge(17,0,17,3);$sheet->write(17,0, "Alamat", $headerFormat);for ($i=1;$i <= 3;$i++) $sheet->write(17,$i, "", $headerFormat);
				$sheet->write(17,4, "Jml Fisik", $headerFormat);
				$sheet->setMerge(17,5,17,7);$sheet->write(17,5, "No Label", $headerFormat);$sheet->write(17,6,"", $headerFormat);$sheet->write(17,7,"", $headerFormat);								
				$sheet->setMerge(17,8,17,9);$sheet->write(17,8, "Keberadaan/Status", $headerFormat);$sheet->write(17,9,"", $headerFormat);				
				
				$sheet->setMerge(18,0,18,3);$sheet->write(18,0, "13", $headerFormat);for ($i=1;$i <= 3;$i++) $sheet->write(18,$i, "", $headerFormat);
				$sheet->write(18,4, "14", $headerFormat);
				$sheet->setMerge(18,5,18,7);$sheet->write(18,5, "15", $headerFormat);$sheet->write(18,6,"", $normalFormat);$sheet->write(18,7,"", $normalFormat);				
				$sheet->setMerge(18,8,18,9);$sheet->write(18,8, "16", $headerFormat);$sheet->write(18,9,"", $normalFormat);				
				
				$sheet->setMerge(19,0,19,3);$sheet->write(19,0,"", $normalFormat);for ($i=1;$i <= 3;$i++) $sheet->write(19,$i, "", $headerFormat);
				$sheet->write(19,4,"", $normalFormat);
				$sheet->setMerge(19,5,19,7);$sheet->write(19,5,"", $normalFormat);$sheet->write(19,6,"", $normalFormat);$sheet->write(19,7,"", $normalFormat);				
				$sheet->setMerge(19,8,19,9);$sheet->write(19,8,"", $normalFormat);$sheet->write(19,9,"", $normalFormat);
				$col = 10;
				if (substr($row1->KODE_KLPFA,0,3) == "101"){ 							
					$sheet->setMerge(17,$col,17,$col + 1);$sheet->write(17,$col, "No Sertifikat/ IMB/ PBB/ DLL", $headerFormat);$sheet->write(17,$col+1,"", $normalFormat);
					$sheet->setMerge(18,$col,18,$col + 1);$sheet->write(18,$col, ($col + 7), $headerFormat);$sheet->write(18,$col +1,"", $normalFormat);
					$sheet->setMerge(19,$col,19,$col + 1);$sheet->write(19,$col, "", $normalFormat);$sheet->write(19,$col + 1,"", $normalFormat);
					$col+= 2;
					$sheet->write(17,$col, "Luas (m2)", $headerFormat);
					$sheet->write(18,$col, ($col + 6), $headerFormat);
					$sheet->write(19,$col, "", $normalFormat);
					//$col--; 13 + 6 = 19, 20 = 13 + 3 + 6 - 2
					$addCol = 3;
					$colIdx = 6;
					$mins = 2;
				}else {
					$col--;//9 + 8 = 17, 10 + 3 + 7 - 2 = 18
					$addCol = 6;
					$colIdx = 7;
					$mins = 2;
				}
				$col++;
				$sheet->setMerge(17,$col,17,$col + 2);$sheet->write(17,$col, "Update Deskripsi & Lokasi", $headerFormat);for ($i=$col + 1;$i <= $col + 2;$i++) $sheet->write(17,$i, "", $headerFormat);	
				$sheet->setMerge(18,$col,18,$col + 2);$sheet->write(18,$col, ($col + $colIdx), $headerFormat);for ($i=$col + 1;$i <= $col + 2;$i++) $sheet->write(18,$i, "", $headerFormat);	
				$sheet->setMerge(19,$col,19,$col + 2);$sheet->write(19,$col, "", $normalFormat);for ($i=$col + 1;$i <= $col + 2;$i++) $sheet->write(19,$i, "", $headerFormat);	
				$col += 3;
				$sheet->setMerge(17,$col,17,$col + $addCol);$sheet->write(17,$col, "Ket.", $headerFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(17,$i, "", $headerFormat);	
				$sheet->setMerge(18,$col,18,$col + $addCol);$sheet->write(18,$col, ($col + ($colIdx - 2)), $headerFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(18,$i, "", $headerFormat);	
				$sheet->setMerge(19,$col,19,$col + $addCol);$sheet->write(19,$col, "", $normalFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(19,$i, "", $headerFormat);	
				
				$sheet->setRow(19,90);				
				$sheet->setMerge(16,0,16,19);
				$sheet->write($colStart + 12,0,"DATA INVENTARISASI LAPANGAN", $green);for ($i=1;$i <= 19;$i++) $sheet->write($colStart + 12,$i, "",$green);
			}
			$row = $row1;
			$sheet->setRow(14,90);				
			$sheet->setMerge(14,0,14,1);$sheet->writeString(14,0,$row->NO_FA, $normalFormat);$sheet->write(14,1, "", $normalFormat);
			$sheet->writeString(14,2,$row->NO_SN, $normalFormat);
			$sheet->write(14,3,$row->KODE_LOKFA, $normalFormat);
			$sheet->write(14,4,$row->KODE_KLPAKUN, $normalFormat);
			$sheet->write(14,5,$row->KODE_KLPFA, $normalFormat);
			$sheet->setMerge(14,6,14,8);$sheet->write(14,6,$row->NAMA, $normalFormat);for ($i=7;$i <= 8;$i++) $sheet->write(14,$i, "", $normalFormat);
			$sheet->setMerge(14,9,14,10);$sheet->write(14,9,$row->NAMA2, $normalFormat);for ($i=10;$i <= 10;$i++) $sheet->write(14,$i, "", $normalFormat);
			$sheet->setMerge(14,11,14,12);$sheet->write(14,11,$row->TGL_PEROLEHAN, $normalFormat);$sheet->write(14,12, "", $normalFormat);
			$sheet->setMerge(14,13,14,14);$sheet->write(14,13,$row->NILAI, $numFormat);$sheet->write(14,14, "", $normalFormat);
			$sheet->setMerge(14,15,14,16);$sheet->write(14,15,$row->NILAI_AP, $numFormat);$sheet->write(14,16, "", $normalFormat);
			$sheet->setMerge(14,17,14,18);$sheet->write(14,17,$row->NILAI_BUKU, $numFormat);$sheet->write(14,18, "", $normalFormat);
			$sheet->write(14,19,$row->JML_FISIK, $numFormat);
			$i=$i+1;
			$sheet->setMerge(22,1,22,4);$sheet->write(22,1,"Catatan:", $formatCatatan);
			$sheet->setMerge(23,1,23,8);$sheet->write(23,1,"Kolom 16 diisi dengan status:", $formatCatatan);		
			$rowcount = 24;
			$ix = 0;
			$temp = "";
			$jenis = (substr($row1->KODE_KLPFA,0,3) == "101" ? "TB":"NTB");
			$rs2 = $dbLib->execute("select kode_status, nama from amu_status where jenis = '$jenis' order by kode_status");				
			while ($line = $rs2->FetchNextObject(true)){
				$temp .= ($temp != "" ? ",":"") . $line->KODE_STATUS ."(".$line->NAMA .")";
				if ($ix == 3){
					$sheet->setMerge($rowcount, 1, $rowcount, 16);
					$sheet->write($rowcount,1,$temp, $formatCatatan);
					$rowcount++;	
					$temp = "";
				}
				$ix++;
			}	
			$sheet->setMerge($rowcount, 1, $rowcount, 16);
			$sheet->write($rowcount,1,$temp, $formatCatatan);
			$sheet->insertBitmap(0,1,"../image/telkom.bmp",0,0,1,1);
			$sheet->setMerge(26,17,26,19);$sheet->write(26,17,"............, .....................");
			$sheet->setMerge(28,3,28,8); $sheet->write(28,3,"KETUA TIM INVENTARISASI ASET TETAP");
			$sheet->setMerge(29,3,29,6); $sheet->write(29,3,"UBIS/SBIS");
			//$sheet->setMerge(28,9,28,10); $sheet->write(28,9,"Manager / Asman");
			$sheet->setMerge(28,16,28,18); $sheet->write(28,16,"TIM INVENTARISASI");
			$sheet->setMerge(34,3,34,4); $sheet->write(34,3,"______________________");
			//$sheet->setMerge(34,9,34,10); $sheet->write(34,9,"_____________________");
			$sheet->setMerge(34,16,34,18); $sheet->write(34,16,"____________________");
			$sheet->setMerge(35,3,35,4); $sheet->write(35,3,"NIK:.........................");
			//$sheet->setMerge(35,9,35,10); $sheet->write(35,9,"NIK:..........................");
			$sheet->setMerge(35,16,35,18); $sheet->write(35,16,"NIK:..........................");
			$sheet->hideScreenGridlines();
			$sheet->hideGridlines();
			$excel->close();		
			$respon;				
			
			//@exec("jodconverter ".$namafile." ".$namafile2."",$respon);
			
			//sleep(5000);
			//error_log(implode($respon));
		}				
		if ($excelDivisi != null)  $excelDivisi->close();		
		if ($excelRegional != null)  $excelRegional->close();		
		if ($excelArea != null)  $excelArea->close();		
		return $rowcountd;
	}			
	function createPdf($rootFolder = null, $pdfFolder = null){
		if ($rootFolder == null) {
			global $manager;
			$this->rootFolder = $manager->getWorkingDir()."/media/amu/fisik";
			$this->pdfFolder = "~/PDF/amu";
			$rootFolder = $this->rootFolder;
			$pdfFolder = $this->pdfFolder;
		}
		error_log($rootFolder." ".$pdfFolder);
		$list = scandir($rootFolder);
		foreach ($list as $key => $value)
		{
			if (($value != ".svn") && ($value != ".") && ($value != "..") && $value != "List NKA.xls")
			{			
				if (is_dir($rootFolder . "/" . $value))
					$this->createPdf($rootFolder . "/" . $value, $pdfFolder ."/". $value); 
				else {
					
					$namafile = $rootFolder . "/" . $value;
					$namafile2 = $pdfFolder . "/" . $value;
					$respond = array();
					if (!file_exists($namafile2)){
						error_log($namafile ." ".$namafile2);
						@exec("jodconverter ".$namafile." ".str_replace(".xls",".pdf",$namafile2)."",$respon);
						error_log(implode($respon));
					}
				}
				
			}
		}       
		return "";
	}
	function createXls2($divisi){
		uses("server_xls_Writer", false);		
		uses("server_util_AddOnLib");
		uses("server_util_Map");
		global $manager;
		
		$namafile2 = $manager->getTempDir()."/KKIL.html";						
						
		global $dbLib;		
		$sql1 = "select * from (select distinct aa.no_bukti, b.no_fa, b.no_sn, b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where e.kode_lokfa = '$divisi'
				union 
				select distinct aa.no_bukti, b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,'-' as nmarea, c.nama as nmsbis, d.nama as nmubis, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where d.kode_lokfa = '$divisi'
				union 
				select distinct aa.no_bukti, b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,'-' as nmarea, '-' as nmsbis, c.nama as nmubis,b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location
					from amu_asset b 					
				inner join amu_distaset_d aa on aa.no_gabung = b.no_gabung 
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_bagiklp_d cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'FISIK' and cc.periode = b.periode and cc.jenis_proc = 'FISIK'
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where c.kode_lokfa = '$divisi') a order by no_bukti, nmubis, nmsbis, nmarea, nmklp";				
		$rsplant = $dbLib->execute("select distinct plnt,plant_desc from xlocation ");
		$plant = new server_util_Map();
		while ($row = $rsplant->FetchNextObject(true)){
			$plant->set($row->PLNT, $row->PLANT_DESC);
		}
		$rsloc = $dbLib->execute("select distinct location,dcs_area from xlocation ");
		$dcs_loc = new server_util_Map();
		while ($row = $rsloc->FetchNextObject(true)){
			$dcs_loc->set($row->LOCATION, $row->DCS_AREA);
		}
		
		$rs1 = $dbLib->execute($sql1);				
		$no = "";
		$i = 1;
		$nilai=0;$nilai_ap=0;$nilai_buku=0;
		$AddOnLib=new server_util_AddOnLib();		
		$html = "";
		$jenis = $this->filter2;
		if (!file_exists($manager->getWorkingDir()."/media/amu/fisik"))
			mkdir($manager->getWorkingDir()."/media/amu/fisik");
		$rootFolder = $manager->getWorkingDir()."/media/amu/fisik";
		$nmdivisi = "";
		$nmregional = "";
		$nmarea = "";
		$coltitle = array("Asset", "SNo.","Descript.","Class Desc.","Descript2.","Cap.Date","Acquis.Val","Accum.val","Book.val","Quantity","Area","SBIS","UBIS","Dist.No","Class","APC","APC Desc","BA","Plant","Location");
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{			
			$nmubis = $row1->NMUBIS;
			if (!file_exists($rootFolder."/".str_replace(" ","_",$nmubis))){				
				mkdir($rootFolder."/".str_replace(" ","_",$nmubis));
				$folderDiv = $rootFolder."/".str_replace(" ","_",$nmubis);				
			}else $folderDiv = $rootFolder."/".str_replace(" ","_",$nmubis);
			
			$nmsbis = $row1->NMSBIS;			
			if (substr($row1->KODE_LOKFA,0,2) == "T9" && $row1->PLANT != '-' && trim($row1->PLANT) != ''){
				$nmsbis = $row1->PLANT;
			}			
			if (substr($row1->KODE_LOKFA,0,3) == "T50" && $row1->KODE_LOKFA != "T503"){
				$nmsbis = "Kantor Divisi ". ucwords($row1->NMUBIS);
			}else if (trim($row1->KODE_LOKFA) == "T503"){
				$nmubis = "INFRATEL";
				$nmsbis = "Kantor Divisi Infratel";
			}
			if ($nmsbis != "-" && !file_exists($folderDiv."/".str_replace(" ","_",$nmsbis))){				
				mkdir($folderDiv."/".str_replace(" ","_",$nmsbis));
				$folderRegional = $folderDiv."/".str_replace(" ","_",$nmsbis);				
			}else if (file_exists($folderDiv."/".str_replace(" ","_",$nmsbis)))
				$folderRegional = $folderDiv."/".str_replace(" ","_",$nmsbis);
			else $folderRegional = "-";
			
			$nmlocation = $row1->NMAREA;
			if (substr($row1->KODE_LOKFA,0,2) == "T9" && $row1->LOCATION != '-' && trim($row1->LOCATION) != ''){
				$nmlocation = $dcs_loc->get( $row1->LOCATION );			
			}
			if ($nmlocation != "-" && $folderRegional != '-' && !file_exists($folderRegional."/".str_replace(" ","_",$nmlocation))){				
				mkdir($folderRegional."/".str_replace(" ","_",$nmlocation));
				$folderArea = $folderRegional."/".str_replace(" ","_",$nmlocation);						
			}else if (file_exists($folderRegional."/".str_replace(" ","_",$nmlocation)))
				$folderArea = $folderRegional."/".str_replace(" ","_",$nmlocation);		
			else $folderArea = "-";
			
			if ($nmdivisi != $row1->NMUBIS){
				$nmdivisi = $row1->NMUBIS;
				if ($excelDivisi != null)  $excelDivisi->close();
				$excelDivisi = new Spreadsheet_Excel_Writer($folderDiv."/List NKA.xls");
				$sheetdivisi =& $excelDivisi->addWorksheet($nmdivisi);								
				$numFormatD =& $excelDivisi->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top'));
				$normalFormatD =& $excelDivisi->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top'));
				$headerFormatD =& $excelDivisi->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1, 'pattern' => 1, 'fgcolor' => 'green'));	//, 
				$rowcountd = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetdivisi->write($rowcountd, $i,$rs1->FetchField($i)->name,$headerFormatD);
				$rowcountd = 1;
			}
			if ($nmregional != $nmsbis && $folderRegional != '-'){
				$nmregional = $nmsbis;
				if ($excelRegional != null)  $excelRegional->close();
				$excelRegional = new Spreadsheet_Excel_Writer($folderRegional."/List NKA.xls");															
				$sheetregional =& $excelRegional->addWorksheet($nmregional);
				$numFormatR =& $excelRegional->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top'));
				$normalFormatR =& $excelRegional->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top'));
				$headerFormatR =& $excelRegional->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1, 'pattern' => 1, 'fgcolor' => 'green'));	//, 
				$rowcountr = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetregional->write($rowcountr, $i,$rs1->FetchField($i)->name,$headerFormatR);
				$rowcountr = 1;
			}else if ($excelRegional != null && $nmregional != $nmsbis){
				$excelRegional->close();
				$rowcountr = 0;
			}
			
			if ($nmarea != $nmlocation && $folderArea != '-'){
				$nmarea = $nmlocation;
				if ($excelArea != null)  $excelArea->close();
				$excelArea = new Spreadsheet_Excel_Writer($folderArea."/List NKA.xls");					
				$sheetarea =& $excelArea->addWorksheet($nmarea);				
				$numFormatA =& $excelArea->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top'));
				$normalFormatA =& $excelArea->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top'));
				$headerFormatA =& $excelArea->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1, 'pattern' => 1, 'fgcolor' => 'green'));	//, 
				$rowcounta = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetarea->write($rowcounta, $i,$rs1->FetchField($i)->name,$headerFormatR);
				$rowcounta = 1;
			}else if ($excelArea != null) {
				$excelArea->close();
				$rowcounta = 0;
			}
			$line = (array) $row1;
			$i = 0;
			foreach ($line as $key => $value)
			{				
				if ($rs1->FetchField($i)->type == "N" || $rs1->FetchField($i)->type == "real" || $rs1->FetchField($i)->type == "float"){
					$sheetdivisi->write($rowcountd, $i, $value, $numFormatD);
					if ($nmregional != '-' && $nmregional != '')  $sheetregional->write($rowcountr, $i, $value, $numFormatR);					
					if ($nmarea != '-' && $nmarea != '') $sheetarea->write($rowcounta, $i, $value, $numFormatA);					
				}else{
					$sheetdivisi->writeString($rowcountd, $i, $value,$normalFormatD);				
					if ($nmregional != '-' && $nmregional != '') $sheetregional->writeString($rowcountr, $i, $value, $normalFormatR);					
					if ($nmarea != '-' && $nmarea != '') $sheetarea->writeString($rowcounta, $i, $value, $normalFormatA);					
				}
				$i++;
			}		
			$rowcountd++;
			$rowcountr++;
			$rowcounta++;
			if ($no != $row1->NO_BUKTI){
				if ($folderArea != '-')
					$namafile = $folderArea;		
				else if ($folderRegional != '-')
					$namafile = $folderRegional;		
				else $namafile = $folderDiv;		
				
				if (!file_exists($namafile."/".$row1->KODE_KLPFA))
					mkdir($namafile."/".$row1->KODE_KLPFA);
				
				$namafile .= "/".$row1->KODE_KLPFA ."/". $row1->NO_BUKTI .".xls";
				
				$excel = new Spreadsheet_Excel_Writer($namafile);		
				//$excel->send("kkil.xls");
				$excel->setCustomColor(14, 192,192,192); 
				
				$headerFormat =& $excel->addFormat(array('bold' => true, 'halign' => 'center','valign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
				$numFormat =& $excel->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black','valign' => 'top','textwrap' => 1));		
				$normalFormat =& $excel->addFormat(array('border' => 1, 'bordercolor' => 'black','valign' => 'top','textwrap' => 1));				
				$yellow =& $excel->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
				$green =& $excel->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$format_top_center =& $excel->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
				
				$sheet =& $excel->addWorksheet("Lampiran - ". (substr($row1->KODE_KLPFA,0,3) == "101" ? "1":"2"));				
				$sheet->protect("nankninknonk");
				$sheet->setMerge(4,0,4,19);
				$sheet->setMerge(1,18,1,19);$sheet->write(1,18,"Lampiran ". (substr($row1->KODE_KLPFA,0,3) == "101" ? "1":"2"));
				$sheet->setHeader("",0.19);
				$sheet->setFooter("",0.19);
				$sheet->setMargins("",0.19);
				$sheet->setPrintScale(80);
				
				
				$sheet->setPaper(9); //A4
				$sheet->setLandscape();
				$colStart = 4;
				$sheet->write($colStart,0, "KERTAS KERJA INVENTARISASI LAPANGAN (KKIL)",$format_top_center);
				for ($i=1;$i <= 19;$i++) $sheet->write($colStart,$i, "",$format_top_center);
				$sheet->setMerge($colStart + 2,1,$colStart + 2,2);$sheet->write($colStart + 2,1, "Divisi/UBIS");$sheet->write($colStart + 2,3, ":".$nmubis);
				$sheet->setMerge($colStart + 3,1,$colStart + 3,2);$sheet->write($colStart + 3,1, "Regional");$sheet->write($colStart + 3,3, ":".$nmsbis);
				$sheet->setMerge($colStart + 4,1,$colStart + 4,2);$sheet->write($colStart + 4,1, "Area");$sheet->write($colStart + 4,3, ":");
				$sheet->setMerge($colStart + 5,1,$colStart + 5,2);$sheet->write($colStart + 5,1, "Group Aset");$sheet->write($colStart + 5,3, ":".$row1->NMKLP." ".$row1->NMAPC);
				$sheet->write($colStart + 2,17, "Nomor");
				$sheet->setMerge($colStart + 2,18,$colStart + 2,19);$sheet->write($colStart + 2,18, ":".$row1->NO_BUKTI);
				
				$no = $row1->NO_BUKTI;				
				$sheet->setMerge($colStart + 7,0,$colStart + 7,19);
				$sheet->setMerge($colStart + 11,0,$colStart + 11,19);
				$sheet->write($colStart + 7,0,"DATA SAP AM", $yellow);for ($i=1;$i <= 19;$i++) $sheet->write($colStart + 7,$i, "",$yellow);				
								
				$sheet->setMerge(12,0,12,1);$sheet->write(12,0, "No Kartu", $headerFormat);$sheet->write(12,1, "", $headerFormat);
				$sheet->write(12,2, "SN", $headerFormat);
				$sheet->write(12,3, "BusA", $headerFormat);
				$sheet->write(12,4, "APC", $headerFormat);
				$sheet->write(12,5, "Class", $headerFormat);
				$sheet->setMerge(12,6,12,8);$sheet->write(12,6, "Deskripsi Aset", $headerFormat);for ($i=7;$i <= 8;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(12,9,12,10);$sheet->write(12,9, "Deskripsi Alamat", $headerFormat);for ($i=10;$i <= 10;$i++) $sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(12,11,12,12);$sheet->write(12,11, "Cap Date", $headerFormat);$sheet->write(12,12, "", $headerFormat);
				$sheet->setMerge(12,13,12,14);$sheet->write(12,13, "Harga Perolehan", $headerFormat);$sheet->write(12,14, "", $headerFormat);
				$sheet->setMerge(12,15,12,16);$sheet->write(12,15, "Akumulasi Penyusutan", $headerFormat);$sheet->write(12,16, "", $headerFormat);
				$sheet->setMerge(12,17,12,18);$sheet->write(12,17, "Nilai Buku", $headerFormat);$sheet->write(12,18, "", $headerFormat);
				$sheet->write(12,19, "Quantity SAP", $headerFormat);
				
				$sheet->setMerge(13,0,13,1);$sheet->write(13,0, "1", $headerFormat);$sheet->write(13,1, "", $headerFormat);
				$sheet->write(13,2, "2", $headerFormat);
				$sheet->write(13,3, "3", $headerFormat);
				$sheet->write(13,4, "4", $headerFormat);
				$sheet->write(13,5, "5", $headerFormat);
				$sheet->setMerge(13,6,13,8);$sheet->write(13,6, "6", $headerFormat);for ($i=7;$i <= 8;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->setMerge(13,9,13,10);$sheet->write(13,9, "7", $headerFormat);for ($i=10;$i <= 11;$i++) $sheet->write(13,$i, "", $headerFormat);
				$sheet->setMerge(13,11,13,12);$sheet->write(13,11, "8", $headerFormat);$sheet->write(12,$i, "", $headerFormat);
				$sheet->setMerge(13,13,13,14);$sheet->write(13,13, "9", $headerFormat);$sheet->write(13,14, "", $headerFormat);
				$sheet->setMerge(13,15,13,16);$sheet->write(13,15, "10", $headerFormat);$sheet->write(13,16, "", $headerFormat);
				$sheet->setMerge(13,17,13,18);$sheet->write(13,17, "11", $headerFormat);$sheet->write(13,18, "", $headerFormat);
				$sheet->write(13,19, "12", $headerFormat);
				
				$sheet->setMerge(17,0,17,3);$sheet->write(17,0, "Alamat", $headerFormat);for ($i=1;$i <= 3;$i++) $sheet->write(17,$i, "", $headerFormat);
				$sheet->write(17,4, "Jml Fisik", $headerFormat);
				$sheet->setMerge(17,5,17,7);$sheet->write(17,5, "No Label", $headerFormat);$sheet->write(17,6,"", $headerFormat);$sheet->write(17,7,"", $headerFormat);								
				$sheet->setMerge(17,8,17,9);$sheet->write(17,8, "Keberadaan/Status", $headerFormat);$sheet->write(17,9,"", $headerFormat);				
				
				$sheet->setMerge(18,0,18,3);$sheet->write(18,0, "13", $headerFormat);for ($i=1;$i <= 3;$i++) $sheet->write(18,$i, "", $headerFormat);
				$sheet->write(18,4, "14", $headerFormat);
				$sheet->setMerge(18,5,18,7);$sheet->write(18,5, "15", $headerFormat);$sheet->write(18,6,"", $normalFormat);$sheet->write(18,7,"", $normalFormat);				
				$sheet->setMerge(18,8,18,9);$sheet->write(18,8, "16", $headerFormat);$sheet->write(18,9,"", $normalFormat);				
				
				$sheet->setMerge(19,0,19,3);$sheet->write(19,0,"", $normalFormat);for ($i=1;$i <= 3;$i++) $sheet->write(19,$i, "", $headerFormat);
				$sheet->write(19,4,"", $normalFormat);
				$sheet->setMerge(19,5,19,7);$sheet->write(19,5,"", $normalFormat);$sheet->write(19,6,"", $normalFormat);$sheet->write(19,7,"", $normalFormat);				
				$sheet->setMerge(19,8,19,9);$sheet->write(19,8,"", $normalFormat);$sheet->write(19,9,"", $normalFormat);
				$col = 10;
				if (substr($row1->KODE_KLPFA,0,3) == "101"){ 							
					$sheet->setMerge(17,$col,17,$col + 1);$sheet->write(17,$col, "No Sertifikat/ IMB/ PBB/ DLL", $headerFormat);$sheet->write(17,$col+1,"", $normalFormat);
					$sheet->setMerge(18,$col,18,$col + 1);$sheet->write(18,$col, ($col + 7), $headerFormat);$sheet->write(18,$col +1,"", $normalFormat);
					$sheet->setMerge(19,$col,19,$col + 1);$sheet->write(19,$col, "", $normalFormat);$sheet->write(19,$col + 1,"", $normalFormat);
					$col+= 2;
					$sheet->write(17,$col, "Luas (m2)", $headerFormat);
					$sheet->write(18,$col, ($col + 6), $headerFormat);
					$sheet->write(19,$col, "", $normalFormat);
					//$col--; 13 + 6 = 19, 20 = 13 + 3 + 6 - 2
					$addCol = 3;
					$colIdx = 6;
					$mins = 2;
				}else {
					$col--;//9 + 8 = 17, 10 + 3 + 7 - 2 = 18
					$addCol = 6;
					$colIdx = 7;
					$mins = 2;
				}
				$col++;
				$sheet->setMerge(17,$col,17,$col + 2);$sheet->write(17,$col, "Update Deskripsi & Lokasi", $headerFormat);for ($i=$col + 1;$i <= $col + 2;$i++) $sheet->write(17,$i, "", $headerFormat);	
				$sheet->setMerge(18,$col,18,$col + 2);$sheet->write(18,$col, ($col + $colIdx), $headerFormat);for ($i=$col + 1;$i <= $col + 2;$i++) $sheet->write(18,$i, "", $headerFormat);	
				$sheet->setMerge(19,$col,19,$col + 2);$sheet->write(19,$col, "", $normalFormat);for ($i=$col + 1;$i <= $col + 2;$i++) $sheet->write(19,$i, "", $headerFormat);	
				$col += 3;
				$sheet->setMerge(17,$col,17,$col + $addCol);$sheet->write(17,$col, "Ket.", $headerFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(17,$i, "", $headerFormat);	
				$sheet->setMerge(18,$col,18,$col + $addCol);$sheet->write(18,$col, ($col + ($colIdx - 2)), $headerFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(18,$i, "", $headerFormat);	
				$sheet->setMerge(19,$col,19,$col + $addCol);$sheet->write(19,$col, "", $normalFormat);for ($i=$col + 1;$i <= $col + $addCol;$i++) $sheet->write(19,$i, "", $headerFormat);	
				
				$sheet->setRow(19,100);				
				$sheet->setMerge(16,0,16,19);
				$sheet->write($colStart + 12,0,"DATA INVENTARISASI LAPANGAN", $green);for ($i=1;$i <= 19;$i++) $sheet->write($colStart + 12,$i, "",$green);
			}
			$row = $row1;
			$sheet->setRow(14,100);				
			$sheet->setMerge(14,0,14,1);$sheet->writeString(14,0,$row->NO_FA, $normalFormat);$sheet->write(14,1, "", $normalFormat);
			$sheet->writeString(14,2,$row->NO_SN, $normalFormat);
			$sheet->write(14,3,$row->KODE_LOKFA, $normalFormat);
			$sheet->write(14,4,$row->KODE_KLPAKUN, $normalFormat);
			$sheet->write(14,5,$row->KODE_KLPFA, $normalFormat);
			$sheet->setMerge(14,6,14,8);$sheet->write(14,6,$row->NAMA, $normalFormat);for ($i=7;$i <= 8;$i++) $sheet->write(14,$i, "", $normalFormat);
			$sheet->setMerge(14,9,14,10);$sheet->write(14,9,$row->NAMA2, $normalFormat);for ($i=10;$i <= 10;$i++) $sheet->write(14,$i, "", $normalFormat);
			$sheet->setMerge(14,11,14,12);$sheet->write(14,11,$row->TGL_PEROLEHAN, $normalFormat);$sheet->write(14,12, "", $normalFormat);
			$sheet->setMerge(14,13,14,14);$sheet->write(14,13,$row->NILAI, $numFormat);$sheet->write(14,14, "", $normalFormat);
			$sheet->setMerge(14,15,14,16);$sheet->write(14,15,$row->NILAI_AP, $numFormat);$sheet->write(14,16, "", $normalFormat);
			$sheet->setMerge(14,17,14,18);$sheet->write(14,17,$row->NILAI_BUKU, $numFormat);$sheet->write(14,18, "", $normalFormat);
			$sheet->write(14,19,$row->JML_FISIK, $numFormat);
			$i=$i+1;
			$sheet->write(22,1,"Catatan:");
			$sheet->write(23,1,"Kolom 16 diisi dengan status:");		
			$rowcount = 24;
			$ix = 0;
			$temp = "";
			$jenis = (substr($row1->KODE_KLPFA,0,3) == "101" ? "TB":"NTB");
			$rs2 = $dbLib->execute("select kode_status, nama from amu_status where jenis = '$jenis' order by kode_status");				
			while ($line = $rs2->FetchNextObject(true)){
				$temp .= ($temp != "" ? ",":"") . $line->KODE_STATUS ."(".$line->NAMA .")";
				if ($ix == 3){
					$sheet->setMerge($rowcount, 1, $rowcount, 16);
					$sheet->write($rowcount,1,$temp);								
					$rowcount++;	
					$temp = "";
				}
				$ix++;
			}	
			$sheet->setMerge($rowcount, 1, $rowcount, 16);
			$sheet->write($rowcount,1,$temp);
			$sheet->insertBitmap(0,1,"../image/telkom2.bmp",0,0,1,1);
			$sheet->write(26,14,"............, .....................");
			$sheet->setMerge(28,3,28,6); $sheet->write(28,3,"KETUA TIM INVENTARISASI ASET TETAP");
			$sheet->setMerge(29,3,29,6); $sheet->write(29,3,"UBIS/SBIS");
			//$sheet->setMerge(28,9,28,10); $sheet->write(28,9,"Manager / Asman");
			$sheet->setMerge(28,13,28,14); $sheet->write(28,13,"TIM INVENTARISASI");
			$sheet->setMerge(34,3,34,4); $sheet->write(34,3,"______________________");
			//$sheet->setMerge(34,9,34,10); $sheet->write(34,9,"_____________________");
			$sheet->setMerge(34,13,34,14); $sheet->write(34,13,"____________________");
			$sheet->setMerge(35,3,35,4); $sheet->write(35,3,"NIK:.........................");
			//$sheet->setMerge(35,9,35,10); $sheet->write(35,9,"NIK:..........................");
			$sheet->setMerge(35,13,35,14); $sheet->write(35,13,"NIK:..........................");
			$sheet->hideScreenGridlines();
			$excel->close();			
			
			/*
			$objPHPExcel = PHPExcel_IOFactory::load($namafile);
			$objPHPExcel->getActiveSheet()->getPageSetup()->setOrientation(PHPExcel_Worksheet_PageSetup::ORIENTATION_LANDSCAPE);
			$objPHPExcel->getActiveSheet()->getPageSetup()->setPaperSize(PHPExcel_Worksheet_PageSetup::PAPERSIZE_A4);
			$objPHPExcel->getActiveSheet()->getPageSetup()->setFitToWidth(1);
			$objPHPExcel->getActiveSheet()->getPageSetup()->setFitToHeight(1);

			$writer = PHPExcel_IOFactory::createWriter($objPHPExcel, 'HTML');
			$writer->setUseInlineCSS(true);
			$writer->save(str_replace('.xls', '.html', $namafile));

			$objWriter = PHPExcel_IOFactory::createWriter($objPHPExcel, 'PDF');
			$objWriter->save(str_replace('.xls', '.pdf', $namafile));
			
			*/

		}				
		if ($excelDivisi != null)  $excelDivisi->close();		
		if ($excelRegional != null)  $excelRegional->close();		
		if ($excelArea != null)  $excelArea->close();		
		return $rowcountd;
	}
}
?>
