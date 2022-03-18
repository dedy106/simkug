<?php
uses("server_util_Pdf");
uses("server_BasicObject");
uses("server_util_Map");
uses("server_DBConnection_dbLib");
global $dbLib;
$dbLib = new server_DBConnection_dbLib("oraveat");
class server_process_amu_genAlternatif extends server_BasicObject
{	
	
	var $filename;
	var $tmpfile;
	var $xlAltArea;
	var $xlAltReg;
	var $xlAltDivisi;
	var $sheetA;
	var $sheetR;
	var $sheetD;
	var $headerFormatA;
	var $normalFormatA;
	var $numFormatA;
	var $format_top_centerA;
	var $yellowA;
	var $greenA;
	var $headerFormatR;
	var $normalFormatR;
	var $numFormatR;
	var $format_top_centerR;
	var $yellowR;
	var $greenR;
	var $headerFormatD;
	var $normalFormatD;
	var $numFormatD;
	var $format_top_centerD;
	var $yellowD;
	var $greenD;
	
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
	function createData($no_bukti,$lokasi, $procedur, $tgl, $periode){			
		global $dbLib;
		$rs = $dbLib->execute("select * from (select a.no_gabung, a.no_fa, a.no_sn, f.kode_lokfa as divisi, e.kode_lokfa as regional, d.kode_lokfa as area ,k.jenis_proc from amu_asset a 
												  	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'ALTERNATIF' and c.periode = a.periode 
												  	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa 
												    inner join amu_lokasi e on e.kode_lokfa = d.kode_induk 
												    inner join amu_lokasi f on f.kode_lokfa = e.kode_induk 
												    inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode
												  	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode 
												   where a.kode_lokasi = '".$lokasi."'  and k.jenis_proc = '". $procedur ."' and a.periode = '".$periode."' and b.no_gabung is null 
												   union 
												  select a.no_gabung, a.no_fa, a.no_sn, e.kode_lokfa as divisi, d.kode_lokfa as regional,'-' as area,k.jenis_proc   from amu_asset a 
												  	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'ALTERNATIF' and c.periode = a.periode 													  
												  	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa 
												    inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_induk = '00' 
												    inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode
												  	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode 
												   where a.kode_lokasi = '".$lokasi."'  and k.jenis_proc = '". $procedur ."' and a.periode = '".$periode."' and b.no_gabung is null 
												   union 
												  select a.no_gabung, a.no_fa, a.no_sn, d.kode_lokfa as divisi, '-' as regional, '-' as area,k.jenis_proc  from amu_asset a 
												  	inner join amu_bagiklp_d c on c.kode_klpfa = a.kode_klpfa and c.jenis_proc = 'ALTERNATIF' and c.periode = a.periode 
												  	inner join amu_lokasi d on d.kode_lokfa = a.kode_lokfa and d.kode_induk = '00' 			
												  	inner join amu_klp_alt k on k.kode_klpfa = a.kode_klpfa and k.periode = a.periode  
												  	left outer join amu_distaset_d b on b.no_gabung = a.no_gabung and b.periode = a.periode 
												   where a.kode_lokasi = '".$lokasi."' and k.jenis_proc = '". $procedur ."' and a.periode = '".$periode."' and b.no_gabung is null) a order by  jenis_proc, divisi, regional, area ");
		$sql = new server_util_arrayList();
		switch (strtolower($procedur)){
			case "sentral":
				$procedur = "STRL";
			break;
			case "rce & mux": $procedur = "RCE";
			break;
			case "rms": $procedur = "RMS";
			break;
			case "skkl / skso":$procedur = "SKKL";				
			break;
			case "modem data & imux":
				$procedur = "MDM";
			break;
			case "satelit":
				$procedur = "STLT";
			break;
			case "server": $procedur = "SVR";				
			break;
			case "rbs":$procedur = "RBS";				
			break;
			case "stm & ims": $procedur = "STM";				
			break;
			case "jaringan": $procedur = "JAR";
			break;
			case "lan & wan":
			case "lan&wan":	$procedur = "LAN";			
			break;
			case "tanah & bangunan": 
				$procedur = "TB";
			break;			
		}
		$format = $procedur .".".substr($periode,0,4).".";
		$numeric = substr($no_bukti,0,strlen($format));
		$nu = floatval(substr($no_bukti,strlen($format)));
		$divisi = "";
		while ($row = $rs->FetchNextObject(true)){
			if ($row->DIVISI != $divisi) {
				$numeric = strval($nu);
				for ($i=strlen($numeric); $i < 6; $i++) $numeric = "0" . $numeric;
				$no_bukti = $format .$numeric;			
				$sql->add("insert into amu_distaset_m (no_bukti,  kode_lokasi, kode_lokfa, tanggal,  periode, nik_user, tgl_input, jenis)values 
					('".$no_bukti."','".$lokasi ."', '". $row->DIVISI."',".$tgl.", '".$periode."','-',sysdate,'-')");
				$divisi = $row->DIVISI;							
				$nu++;
			}
			$sql->add("insert into amu_distaset_d (no_bukti, kode_lokasi, no_gabung,no_fa,no_sn, periode) values 
				('".$no_bukti."','".$lokasi."', '".$row->NO_GABUNG."' , '".$row->NO_FA."', '".$row->NO_SN."','".$periode."' )");					
		}
		
		return $dbLib->execArraySQL($sql);
		
	}	
	function createXls($procedur, $lokfa){	
		uses("server_xls_Writer", false);		
		uses("server_util_AddOnLib");
		$namafile = "ALTERNATIF.xls";				
		global $dbLib;				
		global $manager;
		$procedur = trim($procedur);
		$lokfa2 = ""; $lokfa3 = "";
		if ($lokfa == "-" || $lokfa == "") $lokfa = "";
		else {
			$temp = $lokfa;
			$lokfa = " and e.kode_lokfa = '$temp' ";		
			$lokfa2 = " and d.kode_lokfa = '$temp' ";		
			$lokfa3 = " and b.kode_lokfa = '$temp' ";		
		}		
		global $dbLib;		
		$sql1 = "select * from (select distinct b.no_fa, b.no_sn, b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,c.nama as nmarea, d.nama as nmsbis, e.nama as nmubis, '-' as no_bukti, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location,ifnull(x.dcs_area,'-') as dcs_area, k.jenis_proc
					from amu_asset b 									
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi e on e.kode_lokfa = d.kode_induk and e.kode_lokasi = b.kode_lokasi 
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode
				inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'ALTERNATIF'
				left outer join xlocation x on x.location = b.ref2 and  x.plnt = b.ref1
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where k.jenis_proc = '$procedur' ".$lokfa ." 
				union 
				select distinct b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,'-' as nmarea, c.nama as nmsbis, d.nama as nmubis, '-' as no_bukti, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant,b.ref2 as location,ifnull(x.dcs_area,'-') as dcs_area, k.jenis_proc
					from amu_asset b 									
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi 
				inner join amu_lokasi d on d.kode_lokfa = c.kode_induk and d.kode_lokasi = b.kode_lokasi and d.kode_induk = '00'				
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode
				inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'ALTERNATIF'
				left outer join xlocation x on x.location = b.ref2 and  x.plnt = b.ref1
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where k.jenis_proc = '$procedur' ".$lokfa2 ." 
				union 
				select distinct b.no_fa, b.no_sn,b.nama, f.nama as nmklp, b.nama2, date_format(b.tgl_perolehan,'%d-%m-%Y') as tgl_perolehan, b.nilai, b.nilai_ap, b.nilai_buku,b.jml_fisik
					,'-' as nmarea, '-' as nmsbis, c.nama as nmubis, '-' as no_bukti, b.kode_klpfa, b.kode_klpakun, g.nama as nmapc, b.kode_lokfa, b.ref1 as plant, b.ref2 as location,ifnull(x.dcs_area,'-') as dcs_area, k.jenis_proc
					from amu_asset b 									
				inner join amu_lokasi c on c.kode_lokfa = b.kode_lokfa and c.kode_lokasi = b.kode_lokasi and c.kode_induk = '00'
				inner join amu_klp f on f.kode_klpfa = b.kode_klpfa
				inner join amu_klp_alt k on k.kode_klpfa = b.kode_klpfa and k.periode = b.periode
				inner join (select distinct kode_klpfa, jenis_proc from amu_bagiklp_d ) cc on cc.kode_klpfa = b.kode_klpfa and cc.jenis_proc = 'ALTERNATIF'
				left outer join xlocation x on x.location = b.ref2 and  x.plnt = b.ref1
				left outer join amu_klpakun g on g.kode_klpakun = b.kode_klpakun
				where k.jenis_proc = '$procedur' ".$lokfa3 ." ) a order by nmubis, nmsbis, nmarea, plant, dcs_area";
		
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
		if (!file_exists($manager->getWorkingDir()."/media/amu/alternatif"))
			mkdir($manager->getWorkingDir()."/media/amu/alternatif");
		$rootFolder = $manager->getWorkingDir()."/media/amu/alternatif";
		$nmdivisi = "";
		$nmregional = "";
		$nmarea = "";		
		$nmproc = str_replace("/","&",$procedur);
		$rootFolder .= "/". str_replace(" ","_",$nmproc);					
		if (!file_exists($rootFolder)){								
			mkdir($rootFolder);
		}
		$jenis_proc = $nmproc;
		
		while ($row1 = $rs1->FetchNextObject($toupper=true))
		{			
			if (!file_exists($rootFolder."/".str_replace(" ","_",$row1->NMUBIS))){				
				mkdir($rootFolder."/".str_replace(" ","_",$row1->NMUBIS));
				$folderDiv = $rootFolder."/".str_replace(" ","_",$row1->NMUBIS);				
			}else $folderDiv = $rootFolder."/".str_replace(" ","_",$row1->NMUBIS);														
			
			$nmsbis = trim($row1->NMSBIS);	
			if (substr($row1->KODE_LOKFA,0,2) == "T9" && $row1->PLANT != '-' && trim($row1->PLANT) != ''){
				$nmsbis = $row1->PLANT;
			}
			
			if (substr($row1->KODE_LOKFA,0,3) == "T50" && $row1->KODE_LOKFA != "T503"){
				$nmsbis = "Kantor Divisi ". ucwords(strtolower($row1->NMUBIS));
			}else if (trim($row1->KODE_LOKFA) == "T503"){
				$nmubis = "INFRATEL";
				$nmsbis = "Kantor Divisi Infratel";
			}
			if ($nmsbis == "") $nmsbis = "-";
			if ($nmsbis != "-" && !file_exists($folderDiv."/".str_replace(" ","_",$nmsbis))){				
				mkdir($folderDiv."/".str_replace(" ","_",$nmsbis));
				$folderRegional = $folderDiv."/".str_replace(" ","_",$nmsbis);				
			}else if (file_exists($folderDiv."/".str_replace(" ","_",$nmsbis)))
				$folderRegional = $folderDiv."/".str_replace(" ","_",$nmsbis);
			else $folderRegional = "-";					
		
			$nmlocation = $row1->NMAREA;
			if (substr($row1->KODE_LOKFA,0,2) == "T9" && $row1->DCS_AREA != '-' && trim($row1->DCS_AREA) != ''){
				$nmlocation = $row1->DCS_AREA;//$dcs_loc->get( $row1->LOCATION );			
			}
			if ($nmlocation == "") $nmlocation = "-";
			else $nmlocation = ucwords(strtolower($nmlocation));
			
			if ($nmlocation != "-" && $folderRegional != '-' && !file_exists($folderRegional."/".str_replace(" ","_",$nmlocation))){				
				mkdir($folderRegional."/".str_replace(" ","_",$nmlocation));
				$folderArea = $folderRegional."/".str_replace(" ","_",$nmlocation);						
			}else if (file_exists($folderRegional."/".str_replace(" ","_",$nmlocation)))
				$folderArea = $folderRegional."/".str_replace(" ","_",$nmlocation);		
			else $folderArea = "-";
			
			if ($nmdivisi != $row1->NMUBIS){
				if ($excelDivisi != null)  $excelDivisi->close();				
				if ($this->xlAltDivisi != null) $this->closeExcel(1,$rowcountDivisi, $jenis_proc, $nmdivisi);
				$nmdivisi = $row1->NMUBIS;								
				
				$excelDivisi = new Spreadsheet_Excel_Writer($folderDiv."/list_nka.xls");
				$sheetdivisi =& $excelDivisi->addWorksheet($nmdivisi);	
				
				$greenList =& $excelDivisi->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$numformat1 =& $excelDivisi->addFormat(array('numformat' => '#,##.00'));		
				
				$rowcountd = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetdivisi->write($rowcountd, $i,$rs1->FetchField($i)->name, $greenList);
				$rowcountd = 1;				
									
				$namafile = $folderDiv. "/Lampiran2.xls";
				$this->xlAltDivisi = new Spreadsheet_Excel_Writer($namafile);
				$this->xlAltDivisi->setCustomColor(14, 192,192,192);
				
				$this->headerFormatD =& $this->xlAltDivisi->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
				$this->numFormatD =& $this->xlAltDivisi->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black'));		
				$this->normalFormatD =& $this->xlAltDivisi->addFormat(array('border' => 1, 'bordercolor' => 'black'));				
				$this->yellowD =& $this->xlAltDivisi->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
				$this->greenD =& $this->xlAltDivisi->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$this->format_top_centerD =& $this->xlAltDivisi->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
				
				$rowcountDivisi = 14;										
										
				$this->getHeader(1,$jenis_proc, $nmdivisi,'');								
				$countSheet = 0;
				
			}								
			if ($nmregional != trim($nmsbis) && $folderRegional != '-'){				
				
				if ($excelRegional != null)  $excelRegional->close();
				if ($this->xlAltReg != null) $this->closeExcel(2,$rowcountRegional, $jenis_proc, $nmregional);							
				
				$nmregional = trim($nmsbis);														
				error_log("enter regional " . $nmsbis);
				$excelRegional = new Spreadsheet_Excel_Writer($folderRegional."/list_nka.xls");
				$sheetregional =& $excelRegional->addWorksheet($nmregional);							
				
				$greenList2 =& $excelRegional->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$numformat2 =& $excelRegional->addFormat(array('numformat' => '#,##.00'));		
				
				$rowcountr = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetregional->write($rowcountr, $i,$rs1->FetchField($i)->name, $greenList2);
				$rowcountr = 1;				
				

				$namafile = $folderRegional . "/Lampiran2.xls";
				$this->xlAltReg = new Spreadsheet_Excel_Writer($namafile);									
				
				$this->headerFormatR =& $this->xlAltReg->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
				$this->numFormatR =& $this->xlAltReg->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black'));		
				$this->normalFormatR =& $this->xlAltReg->addFormat(array('border' => 1, 'bordercolor' => 'black'));				
				$this->yellowR =& $this->xlAltReg->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
				$this->greenR =& $this->xlAltReg->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$this->format_top_centerR =& $this->xlAltReg->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
												
				$rowcountRegional = 14;								
				$this->getHeader(2, $jenis_proc, $nmdivisi, $nmsbis);													
			}else if ($folderRegional == "-"){
				if ($excelRegional != null) $excelRegional->close();
				if ($this->xlAltReg != null && $nmregional != "-") $this->closeExcel(2, $rowcountRegional, $jenis_proc, $nmregional);
				$rowcountr = 0;
				$rowcountRegional = 14;												
				$nmregional = "-";								
			}							
																			
			if ($nmarea != $nmlocation && $folderArea != '-'){
				$nmarea = $nmlocation;
				error_log("enter Area " . $nmlocation);
				if ($excelArea != null)  $excelArea->close();
				if ($this->xlAltArea != null) $this->closeExcel(3,$rowcountArea, $jenis_proc, $nmarea);							
				
				$excelArea = new Spreadsheet_Excel_Writer($folderArea."/list_nka.xls");					
				$sheetarea =& $excelArea->addWorksheet($nmarea);				
				
				$greenList3 =& $excelArea->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$numformat3 =& $excelArea->addFormat(array('numformat' => '#,##.00'));		
				
				$rowcounta = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetarea->write($rowcounta, $i,$rs1->FetchField($i)->name,$greenList3);
				$rowcounta = 1;				
				
				$namafile = $folderArea . "/lampiran2.xls";
				$this->xlAltArea = new Spreadsheet_Excel_Writer($namafile);									
				
				$this->headerFormatA =& $this->xlAltArea->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
				$this->numFormatA =& $this->xlAltArea->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black'));		
				$this->normalFormatA =& $this->xlAltArea->addFormat(array('border' => 1, 'bordercolor' => 'black'));				
				$this->yellowA =& $this->xlAltArea->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
				$this->greenA =& $this->xlAltArea->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$this->format_top_centerA =& $this->xlAltArea->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
				
				$rowcountArea = 14;												
				$this->getHeader(3, $jenis_proc, $nmdivisi, $nmsbis);				
			}else if ($excelArea != null && $folderArea == '-') {								
				$excelArea->close();
				if ($this->xlAltArea != null && $nmarea != "-")  $this->closeExcel(3, $rowcountArea, $jenis_proc, $nmarea);										
				$rowcounta = 0;
				$rowcountArea = 14;		
				$nmarea = "-";		
			}
			
			
			$line = (array) $row1;			
			if ($rowcountd > 65535) {
				$countSheet++;
				$sheetdivisi =& $excelDivisi->addWorksheet($nmdivisi. "-" .$countSheet );	
				$rowcountd = 0; 
				$i = 0;
				foreach ($line as $key => $value)	{
					$sheetdivisi->writeString($rowcountd, $i,$key, $greenList);
					$i++;
				}
				$rowcountd = 1;				
			} 
			if ($rowcountr > 65535) {
				$sheetregional =& $excelRegional->addWorksheet($nmregional. "-" . round($rowcountr / 65535) );	
				$rowcountr = 0;
				$i = 0;
				foreach ($line as $key => $value)	{
					$sheetregional->writeString($rowcountr, $i,$key, $greenList2);
					$i++;
				}
				$rowcountr = 1;				
			} 
			if ($rowcounta > 65535) {
				$sheetarea =& $excelArea->addWorksheet($nmarea. "-" . round($rowcounta / 65535) );	
				$rowcounta = 0;
				$i = 0;
				foreach ($line as $key => $value)	{
					$sheetarea->writeString($rowcounta, $i,$key, $greenList3);
					$i++;
				}
				$rowcounta = 1;				
			}
			$i = 0;
			foreach ($line as $key => $value)
			{					
				if ($rs1->FetchField($i)->type == "N" || $rs1->FetchField($i)->type == "real" || $rs1->FetchField($i)->type == "NUMBER" || $rs1->FetchField($i)->type == "float"){
					$sheetdivisi->write($rowcountd, $i, $value, $numformat);
					if ($folderRegional != "-") $sheetregional->write($rowcountr, $i, $value, $numformat2);
					if ($folderArea != "-") $sheetarea->writeString($rowcounta, $i, $value, $numformat3);			
				}else{
					$sheetdivisi->writeString($rowcountd, $i, $value);						
					if ($folderRegional != "-") $sheetregional->writeString($rowcountr, $i, $value);			
					if ($folderArea != "-") $sheetarea->writeString($rowcounta, $i, $value);			
				}
				$i++;
			}
			$i = 0;
			$rowcountd++;
			$rowcountr++;
			$rowcounta++;								
			$row = $row1;			
			if ($folderArea != "-") {								
				$rowcount = $rowcountArea;				
				$this->sheetA->writeString($rowcount,0,$row->NO_FA, $this->normalFormatA);
				$this->sheetA->writeString($rowcount,1,$row->NO_SN, $this->normalFormatA);
				$this->sheetA->write($rowcount,2,$row->KODE_KLPFA, $this->normalFormatA);
				$this->sheetA->write($rowcount,3,$row->NAMA, $this->normalFormatA);
				$this->sheetA->write($rowcount,4,$row->NAMA2, $this->normalFormatA);
				$this->sheetA->write($rowcount,5,$row->KODE_LOKFA, $this->normalFormatA);
				$this->sheetA->write($rowcount,6,$row->TGL_PEROLEHAN, $this->normalFormatA);
				$this->sheetA->write($rowcount,7,$row->NILAI, $this->numFormatA);
				$this->sheetA->write($rowcount,8,$row->NILAI_AP, $this->numFormatA);
				$this->sheetA->write($rowcount,9,$row->NILAI_BUKU, $this->numFormatA);
				for ($f=0; $f < count($this->dbField);$f++){				
					$this->sheetA->write($rowcount,10 + $f, " ", $this->normalFormatA);
				}	
				$rowcountArea++;
			}else if ($folderRegional != "-" && $this->xlAltReg != null) {
				$rowcount = $rowcountRegional;				
				$this->sheetR->writeString($rowcount,0,$row->NO_FA, $this->normalFormatR);
				$this->sheetR->writeString($rowcount,1,$row->NO_SN, $this->normalFormatR);
				$this->sheetR->write($rowcount,2,$row->KODE_KLPFA, $this->normalFormatR);
				$this->sheetR->write($rowcount,3,$row->NAMA, $this->normalFormatR);
				$this->sheetR->write($rowcount,4,$row->NAMA2, $this->normalFormatR);
				$this->sheetR->write($rowcount,5,$row->KODE_LOKFA, $this->normalFormatR);
				$this->sheetR->write($rowcount,6,$row->TGL_PEROLEHAN, $this->normalFormatR);
				$this->sheetR->write($rowcount,7,$row->NILAI, $this->numFormatR);
				$this->sheetR->write($rowcount,8,$row->NILAI_AP, $this->numFormatR);
				$this->sheetR->write($rowcount,9,$row->NILAI_BUKU, $this->numFormatR);
				for ($f=0; $f < count($this->dbField);$f++){				
					$this->sheetR->write($rowcount,10 + $f, " ", $this->normalFormatR);
				}	
				$rowcountRegional++;
			}else if ($this->xlAltDivisi != null){
				$firstD = false;								
				$rowcount = $rowcountDivisi;												
				$this->sheetD->writeString($rowcount,0,$row->NO_FA, $this->normalFormatD);
				$this->sheetD->writeString($rowcount,1,$row->NO_SN, $this->normalFormatD);
				$this->sheetD->write($rowcount,2,$row->KODE_KLPFA, $this->normalFormatD);
				$this->sheetD->write($rowcount,3,$row->NAMA, $this->normalFormatD);
				$this->sheetD->write($rowcount,4,$row->NAMA2, $this->normalFormatD);
				$this->sheetD->write($rowcount,5,$row->KODE_LOKFA, $this->normalFormatD);
				$this->sheetD->write($rowcount,6,$row->TGL_PEROLEHAN, $this->normalFormatD);
				$this->sheetD->write($rowcount,7,$row->NILAI, $this->numFormatD);
				$this->sheetD->write($rowcount,8,$row->NILAI_AP, $this->numFormatD);
				$this->sheetD->write($rowcount,9,$row->NILAI_BUKU, $this->numFormatD);
				for ($f=0; $f < count($this->dbField);$f++){				
					$this->sheetD->write($rowcount,10 + $f, " ", $this->normalFormatD);
				}	
				$rowcountDivisi++;			
			}
		}								
		if ($excelDivisi != null) $excelDivisi->close();
		if ($excelRegional != null) $excelRegional->close();
		if ($excelArea != null) $excelArea->close();				
		if ($this->xlAltArea != null) $this->closeExcel(3, $rowcountArea, $jenis_proc, $nmarea);
		if ($this->xlAltReg != null) $this->closeExcel(2, $rowcountRegional, $jenis_proc, $nmregional);
		if ($this->xlAltDivisi != null) $this->closeExcel(1, $rowcountDivisi, $jenis_proc, $nmdivisi);									
	}			
	function closeExcel($lokasi, $rowcount, $jenis_proc, $nama){		
		$rowcount += 3;		
		$this->getTTD($lokasi, $jenis_proc, $rowcount);
		switch ($lokasi){
			case 1 : 												
				$this->sheetD->hideScreenGridlines();
				$this->xlAltDivisi->close();	
				error_log("close divisi ". $nama);
			break;
			case 2 : 												
				$this->sheetR->hideScreenGridlines();
				$this->xlAltReg->close();	
				error_log("close regional ". $nama);
			break;
			case 3 : 												
				$this->sheetA->hideScreenGridlines();
				$this->xlAltArea->close();	
				error_log("close area ". $nama);
			break;
		}
		
	}
	function getHeader($lokasi, $jns_proc, $ubis, $sbis){
		$rowStart = 4;
		switch ($lokasi){
			case 1:						
				$this->sheetD =& $this->xlAltDivisi->addWorksheet("Lampiran 2");									
				$this->sheetD->insertBitmap(0,1,"../image/telkom2.bmp",0,0,1,1);								
				$this->initColumnXls($lokasi,$jns_proc, $rowStart,$this->headerFormatD);
				$this->sheetD->setMerge(4,0,4,9 + count($this->dbField));
				$this->sheetD->setHeader("",0.18);
				$this->sheetD->setFooter("",0.18);
				$this->sheetD->setMargins("",0.18);
				$this->sheetD->setPrintScale(85);
				$this->sheetD->setPaper(9); //A4
				$this->sheetD->setLandscape();
				
				$this->sheetD->write($rowStart,0, "KERTAS KERJA KONVERSI ". strtoupper($jns_proc),$this->format_top_centerD);
				for ($i=1;$i <= 9 + count($this->dbField);$i++) $this->sheetD->write($rowStart,$i, "",$this->format_top_centerD);
				$this->sheetD->write($rowStart + 2,1, "Divisi/UBIS");$this->sheetD->write($rowStart + 2,2, ":".$ubis);
				$this->sheetD->write($rowStart + 3,1, "Sub UBIS");$this->sheetD->write($rowStart + 3,2, ":". $sbis);
						
				$this->sheetD->setMerge($rowStart + 7,0,$rowStart + 7,9);				
				$this->sheetD->setMerge($rowStart + 7,10,$rowStart + 7,9+count($this->dbField));				
				$this->sheetD->write($rowStart + 7,0,"DATA SAP AM", $this->yellowD);
				for ($i=1;$i <= 9;$i++) $this->sheetD->write($rowStart + 7,$i, "",$this->yellowD);				
				$this->sheetD->write($rowStart + 7,10,"DATA KONVERSI", $this->greenD);
				for ($i=11;$i <= (9+count($this->dbField));$i++) $this->sheetD->write($rowStart + 7,$i, "",$this->greenD);
								
				$this->sheetD->write(12,0, "No Kartu", $this->headerFormatD);
				$this->sheetD->write(12,1, "SN", $this->headerFormatD);
				$this->sheetD->write(12,2, "Jenis", $this->headerFormatD);
				$this->sheetD->write(12,3, "Deskripsi Aset", $this->headerFormatD);
				$this->sheetD->write(12,4, "Deskripsi Alamat", $this->headerFormatD);
				$this->sheetD->write(12,5, "BusA", $this->headerFormatD);
				$this->sheetD->write(12,6, "Cap Date", $this->headerFormatD);
				$this->sheetD->write(12,7, "Harga Perolehan", $this->headerFormatD);
				$this->sheetD->write(12,8, "Akumulasi Penyusutan", $this->headerFormatD);
				$this->sheetD->write(12,9, "Nilai Buku", $this->headerFormatD);
				
				$this->sheetD->write(13,0, "1", $this->headerFormatD);
				$this->sheetD->write(13,1, "2", $this->headerFormatD);
				$this->sheetD->write(13,2, "3", $this->headerFormatD);
				$this->sheetD->write(13,3, "4", $this->headerFormatD);
				$this->sheetD->write(13,4, "5", $this->headerFormatD);
				$this->sheetD->write(13,5, "6", $this->headerFormatD);
				$this->sheetD->write(13,6, "7", $this->headerFormatD);
				$this->sheetD->write(13,7, "8", $this->headerFormatD);
				$this->sheetD->write(13,8, "9", $this->headerFormatD);
				$this->sheetD->write(13,9, "10", $this->headerFormatD);
			break;
			case 2:
				$this->sheetR =& $this->xlAltReg->addWorksheet("Lampiran 2");									
				$this->sheetR->insertBitmap(0,1,"../image/telkom2.bmp",0,0,1,1);
				$this->initColumnXls($lokasi,$jns_proc, $rowStart,$this->headerFormatR);
				$this->sheetR->setMerge(4,0,4,9 + count($this->dbField));
				$this->sheetR->setHeader("",0.18);
				$this->sheetR->setFooter("",0.18);
				$this->sheetR->setMargins("",0.18);
				$this->sheetR->setPrintScale(85);
				$this->sheetR->setPaper(9); //A4
				$this->sheetR->setLandscape();
				
				$this->sheetR->write($rowStart,0, "KERTAS KERJA KONVERSI ". strtoupper($jns_proc),$this->format_top_centerR);
				for ($i=1;$i <= 9 + count($this->dbField);$i++) $this->sheetR->write($rowStart,$i, "",$this->format_top_centerR);
				$this->sheetR->write($rowStart + 2,1, "Divisi/UBIS");$this->sheetR->write($rowStart + 2,2, ":".$ubis);
				$this->sheetR->write($rowStart + 3,1, "Sub UBIS");$this->sheetR->write($rowStart + 3,2, ":". $sbis);
						
				$this->sheetR->setMerge($rowStart + 7,0,$rowStart + 7,9);				
				$this->sheetR->setMerge($rowStart + 7,10,$rowStart + 7,9+count($this->dbField));				
				$this->sheetR->write($rowStart + 7,0,"DATA SAP AM", $this->yellowR);
				for ($i=1;$i <= 9;$i++) $this->sheetR->write($rowStart + 7,$i, "",$this->yellowR);				
				$this->sheetR->write($rowStart + 7,10,"DATA KONVERSI", $this->greenR);
				for ($i=11;$i <= (9+count($this->dbField));$i++) $this->sheetR->write($rowStart + 7,$i, "",$this->greenR);
								
				$this->sheetR->write(12,0, "No Kartu", $this->headerFormatR);
				$this->sheetR->write(12,1, "SN", $this->headerFormatR);
				$this->sheetR->write(12,2, "Jenis", $this->headerFormatR);
				$this->sheetR->write(12,3, "Deskripsi Aset", $this->headerFormatR);
				$this->sheetR->write(12,4, "Deskripsi Alamat", $this->headerFormatR);
				$this->sheetR->write(12,5, "BusA", $this->headerFormatR);
				$this->sheetR->write(12,6, "Cap Date", $this->headerFormatR);
				$this->sheetR->write(12,7, "Harga Perolehan", $this->headerFormatR);
				$this->sheetR->write(12,8, "Akumulasi Penyusutan", $this->headerFormatR);
				$this->sheetR->write(12,9, "Nilai Buku", $this->headerFormatR);
				
				$this->sheetR->write(13,0, "1", $this->headerFormatR);
				$this->sheetR->write(13,1, "2", $this->headerFormatR);
				$this->sheetR->write(13,2, "3", $this->headerFormatR);
				$this->sheetR->write(13,3, "4", $this->headerFormatR);
				$this->sheetR->write(13,4, "5", $this->headerFormatR);
				$this->sheetR->write(13,5, "6", $this->headerFormatR);
				$this->sheetR->write(13,6, "7", $this->headerFormatR);
				$this->sheetR->write(13,7, "8", $this->headerFormatR);
				$this->sheetR->write(13,8, "9", $this->headerFormatR);
				$this->sheetR->write(13,9, "10", $this->headerFormatR);
			break;
			case 3:				
				$this->sheetA =& $this->xlAltArea->addWorksheet("Lampiran 2");									
				$this->sheetA->insertBitmap(0,1,"../image/telkom2.bmp",0,0,1,1);
				$this->initColumnXls($lokasi,$jns_proc, $rowStart,$this->headerFormatA);
				$this->sheetA->setMerge(4,0,4,9 + count($this->dbField));
				$this->sheetA->setHeader("",0.18);
				$this->sheetA->setFooter("",0.18);
				$this->sheetA->setMargins("",0.18);
				$this->sheetA->setPrintScale(85);
				$this->sheetA->setPaper(9); //A4
				$this->sheetA->setLandscape();
				
				$this->sheetA->write($rowStart,0, "KERTAS KERJA KONVERSI ". strtoupper($jns_proc),$this->format_top_centerA);
				for ($i=1;$i <= 9 + count($this->dbField);$i++) $this->sheetA->write($rowStart,$i, "",$this->format_top_centerA);
				$this->sheetA->write($rowStart + 2,1, "Divisi/UBIS");$this->sheetA->write($rowStart + 2,2, ":".$ubis);
				$this->sheetA->write($rowStart + 3,1, "Sub UBIS");$this->sheetA->write($rowStart + 3,2, ":". $sbis);
						
				$this->sheetA->setMerge($rowStart + 7,0,$rowStart + 7,9);				
				$this->sheetA->setMerge($rowStart + 7,10,$rowStart + 7,9+count($this->dbField));				
				$this->sheetA->write($rowStart + 7,0,"DATA SAP AM", $this->yellowA);
				for ($i=1;$i <= 9;$i++) $this->sheetA->write($rowStart + 7,$i, "",$this->yellowA);
				$this->sheetA->write($rowStart + 7,10,"DATA KONVERSI", $this->greenA);
				for ($i=11;$i <= (9+count($this->dbField));$i++) $this->sheetA->write($rowStart + 7,$i, "",$this->greenA);
								
				$this->sheetA->write(12,0, "No Kartu", $this->headerFormatA);
				$this->sheetA->write(12,1, "SN", $this->headerFormatA);
				$this->sheetA->write(12,2, "Jenis", $this->headerFormatA);
				$this->sheetA->write(12,3, "Deskripsi Aset", $this->headerFormatA);
				$this->sheetA->write(12,4, "Deskripsi Alamat", $this->headerFormatA);
				$this->sheetA->write(12,5, "BusA", $this->headerFormatA);
				$this->sheetA->write(12,6, "Cap Date", $this->headerFormatA);
				$this->sheetA->write(12,7, "Harga Perolehan", $this->headerFormatA);
				$this->sheetA->write(12,8, "Akumulasi Penyusutan", $this->headerFormatA);
				$this->sheetA->write(12,9, "Nilai Buku", $this->headerFormatA);
				
				$this->sheetA->write(13,0, "1", $this->headerFormatA);
				$this->sheetA->write(13,1, "2", $this->headerFormatA);
				$this->sheetA->write(13,2, "3", $this->headerFormatA);
				$this->sheetA->write(13,3, "4", $this->headerFormatA);
				$this->sheetA->write(13,4, "5", $this->headerFormatA);
				$this->sheetA->write(13,5, "6", $this->headerFormatA);
				$this->sheetA->write(13,6, "7", $this->headerFormatA);
				$this->sheetA->write(13,7, "8", $this->headerFormatA);
				$this->sheetA->write(13,8, "9", $this->headerFormatA);
				$this->sheetA->write(13,9, "10", $this->headerFormatA);
			break;
		}						
	}
	function initColumnXls($lokasi, $jnsProc, $rowStart, $headerFormat){				
		
		switch (strtolower($jnsProc)){
			case "sentral":				
				$this->dbField = "NMLOK,NMARNET,NMSENTRAL,LOKASI,KODE_AREA,FKN,FUNGSI,HOST,TIPE";
				$this->title = "Lokasi/Netre,ARNET,Sentral,Lokasi,Area Code,FKN,Fungsi,Host,Tipe Sentral";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lokasi
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";
				$this->dbSQLField = "";			
			break;
			case "rce & mux":
			case "rms":
			case "skkl & skso":
				$this->title = "Lokasi/Netre,Tipe,Komponen,Sistra/Proyek,Link/Point/Lokasi";				
				$this->dbField = "NMLOK,NMTIPE,NMKOMP,NMPROYEK,NMLINK";
				$this->dbSQLField = "l.nama as nmlok, t.nama as nmtipe, p.nama as nmproyek, ll.nama as nmlink, kk.nama as nmkomp";
				$this->dbSQL = "left outer join amu_lok l on l.kode_lok = k.kode_lok
					left outer join amu_tipe t on t.kode_tipe = k.kode_tipe
					left outer join amu_komp kk on kk.kode_komp = k.kode_komp
					left outer join amu_proyek p on p.kode_proyek = k.kode_proyek
					left outer join amu_link ll on ll.kode_link = k.kode_link";				
			break;
			case "modem data & imux":
				$this->title = "No Kontrak,Vendor,Crosscheck Kontrak,Nomor Seri";				
				$this->dbField = "KODE_KONTRAK,KODE_VENDOR,KODE_KONTRAK2,STATUS_SN";
			break;
			case "satelit":
				$this->title = "Satelit";				
				$this->tblHeader = "<td class='header_laporan'>Satelit</td>";
				$this->dbField = "NMSATELIT";
			break;
			case "server":
				$this->title = "UBIS,Sub UBIS,Aplikasi/Tools,Jenis,Lokasi";				
				$this->dbField = "NMUBIS,NMSBIS,NMAPLIKASI,JENIS,NMLOKASI";
			break;
			case "rbs":
				$this->title = "Level 1,Level 2,Lokasi BTS/BSC,Area Operasional,Vendor,Alat Monitoring,Status BTS/BSC";				
				$this->dbField = "LEVEL1,LEVEL2,LOKASI,AREAOP,VENDOR,ALAT,STATUS";
			break;
			case "stm & ims":
				$this->title = "Group,Kategori,Kelompok Aset, Merk,Vendor,Lokasi STO,Komponen,Peruntukam,Daerah,Nama,Jumlah,Satuan,Keterangan";							
				$this->dbField = "GROUP,KATEGORI,KLPFA,MERK,VENDOR,LOKASI,KOMPONEN,PERUNTUKAN,DAERAH,NAMA,JUMLAH,SATUAN,KETERANGAN";
			break;
			case "jaringan":
			case "lan & wan":
			case "lan&wan":
				$this->title = "DIV.REGIONAL,AREA,STO";				
				$this->dbField = "SBIS,BA,STO";
			break;
			case "tanah & bangunan":								
				$this->dbField = "NOSURAT,LOKASI,TNAH1,BANGUN1,STATUS,NOP,LOKPBB,TANAH2,BANGUN2,NKA1,STATUS2,JENIS,NOLAIN,LOKDOK,ID,NMCUST,NKA2,STATUS3";
				$this->title = "NOSURAT,LOKASI,TNAH1,BANGUN1,STATUS,NOP,LOKPBB,TANAH2,BANGUN2,NKA1,STATUS2,JENIS,NOLAIN,LOKDOK,ID,NMCUST,NKA2,STATUS3";
			break;			
		}
		$this->dbField = explode(",",$this->dbField);		
		$this->title = explode(",",$this->title);		
		$colStart = 10;
		switch ($lokasi){
			case 1: 
				for ($i=0; $i < count($this->title);$i++){
					$this->sheetD->setColumn($rowStart + 8,$colStart + $i,20);$this->sheetD->write($rowStart + 8,$colStart + $i, $this->title[$i], $this->headerFormatD);
					$this->sheetD->write($rowStart + 9,$colStart + $i, $i + 11, $this->headerFormatD);				
				}
			break;
			case 2: for ($i=0; $i < count($this->title);$i++){
					$this->sheetR->setColumn($rowStart + 8,$colStart + $i,20);$this->sheetR->write($rowStart + 8,$colStart + $i, $this->title[$i], $this->headerFormatR);
					$this->sheetR->write($rowStart + 9,$colStart + $i, $i + 11, $this->headerFormatR);				
				}
			break;
			case 3: for ($i=0; $i < count($this->title);$i++){
					$this->sheetA->setColumn($rowStart + 8,$colStart + $i,20);$this->sheetA->write($rowStart + 8,$colStart + $i, $this->title[$i], $this->headerFormatA);
					$this->sheetA->write($rowStart + 9,$colStart + $i, $i + 11, $this->headerFormatA);				
				}
			break;
		}		
	}
	function getTTD($lokasi,$jns_proc, $rowcount, $ubis = "", $sbis = "" ){		
		switch ($lokasi){
			case 1: $sheet = $this->sheetD;
			break;
			case 2: $sheet = $this->sheetR;
			break;
			case 3: $sheet = $this->sheetA;
			break;
		}		
		switch (strtolower($jns_proc)){
			case "sentral":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");
				$sheet->setMerge($rowcount,14,$rowcount,16); $sheet->write($rowcount,14,"Direview Pada Tanggal:");
				
				$sheet->setMerge($rowcount + 1,3,$rowcount,4); $sheet->write($rowcount + 1,3,"Officer Switching TS ");
				$sheet->setMerge($rowcount + 1,14,$rowcount,15); $sheet->write($rowcount + 1,14,"Manager Switching TS ");				
				$rowcount++;
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");				
				$sheet->setMerge($rowcount + 6,14,$rowcount + 6,15); $sheet->write($rowcount + 6,14,"____________________");
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");				
				$sheet->setMerge($rowcount + 7,14,$rowcount + 7,15); $sheet->write($rowcount + 7,14,"NIK:..........................");
			break;
			case "rce & mux":
			case "rms":
			case "skkl & skso":
			///free
			break;
			case "modem data & imux":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");
				$sheet->setMerge($rowcount,13,$rowcount,16); $sheet->write($rowcount,13,"Direview Pada Tanggal:");				
				$sheet->setMerge($rowcount + 1,3,$rowcount + 1,4); $sheet->write($rowcount + 1,3,"Off. 2 ASSET MGT");
				$sheet->setMerge($rowcount + 1,9,$rowcount + 1,10); $sheet->write($rowcount + 1,9,"Off. 1 ASSET MGT");
				$sheet->setMerge($rowcount + 1,13,$rowcount + 1,14); $sheet->write($rowcount + 1,13,"MANAGER ASSET MGT");
				$sheet->setMerge($rowcount + 1,18,$rowcount + 1,19); $sheet->write($rowcount + 1,18,"MANAGER RESOURCES MANAGEMENT OPERATION ");
				$rowcount++;
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");
				$sheet->setMerge($rowcount + 6,9,$rowcount + 6,10); $sheet->write($rowcount + 6,9,"_____________________");
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"____________________");
				$sheet->setMerge($rowcount + 6,18,$rowcount + 6,19); $sheet->write($rowcount + 6,18,"____________________");
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");
				$sheet->setMerge($rowcount + 7,9,$rowcount + 7,10); $sheet->write($rowcount + 7,9,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,18,$rowcount + 7,19); $sheet->write($rowcount + 7,18,"NIK:..........................");
			break;
			case "satelit":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");
				$sheet->setMerge($rowcount,13,$rowcount,16); $sheet->write($rowcount,13,"Direview Pada Tanggal:");
				$rowcount++;
				$sheet->setMerge($rowcount,3,$rowcount,4); $sheet->write($rowcount,3,"Officer Logistik & Umum");
				$sheet->setMerge($rowcount,13,$rowcount,14); $sheet->write($rowcount,13,"Manager Asset");
				$sheet->setMerge($rowcount,16,$rowcount,17); $sheet->write($rowcount,16,"Manager Pengendalian Satelit");
				$sheet->setMerge($rowcount,19,$rowcount,20); $sheet->write($rowcount,19,"Manager Admin ");
				
				$sheet->setMerge($rowcount + 1,3,$rowcount + 1,4); $sheet->write($rowcount + 1,3,"SubDiv Satelit- Infratel");
				$sheet->setMerge($rowcount + 1,13,$rowcount + 1,14); $sheet->write($rowcount + 1,13,"Divisi Infratel");
				$sheet->setMerge($rowcount + 1,16,$rowcount + 1, 17); $sheet->write($rowcount + 1,16,"SubDiv Satelit- Infratel");
				$sheet->setMerge($rowcount + 1,19,$rowcount + 1,20); $sheet->write($rowcount + 1,19,"SubDiv Satelit- Infratel");				
				$rowcount++;
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"_____________________");
				$sheet->setMerge($rowcount + 6,16,$rowcount + 6,17); $sheet->write($rowcount + 6,16,"____________________");
				$sheet->setMerge($rowcount + 6,19,$rowcount + 6,20); $sheet->write($rowcount + 6,19,"____________________");
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,16,$rowcount + 7,17); $sheet->write($rowcount + 7,16,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,21,$rowcount + 7,20); $sheet->write($rowcount + 7,19,"NIK:..........................");
			break;
			case "server":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");
				$sheet->setMerge($rowcount,13,$rowcount,15); $sheet->write($rowcount,13,"Direview Pada Tanggal:");
				$rowcount++;
				$sheet->setMerge($rowcount,3,$rowcount,4); $sheet->write($rowcount,3,"Off-1 Asset Management ");
				$sheet->setMerge($rowcount,9,$rowcount,10); $sheet->write($rowcount,9,"Asman IP Router Netre");
				$sheet->setMerge($rowcount,13,$rowcount,14); $sheet->write($rowcount,13,"Mgr Asset Mgt");
				$sheet->setMerge($rowcount,18,$rowcount,19); $sheet->write($rowcount,18,"POH Mgr.IP Network OAM");
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");
				$sheet->setMerge($rowcount + 6,9,$rowcount + 6,10); $sheet->write($rowcount + 6,9,"_____________________");
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"____________________");
				$sheet->setMerge($rowcount + 6,18,$rowcount + 6,19); $sheet->write($rowcount + 6,18,"____________________");
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");
				$sheet->setMerge($rowcount + 7,9,$rowcount + 7,10); $sheet->write($rowcount + 7,9,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,18,$rowcount + 7,19); $sheet->write($rowcount + 7,18,"NIK:..........................");
			break;
			case "rbs":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");				
				$rowcount++;
				$sheet->setMerge($rowcount,3,$rowcount,4); $sheet->write($rowcount,3,"Officer Asset Management ");
				$sheet->setMerge($rowcount,9,$rowcount,10); $sheet->write($rowcount,9,"OFF. OM & QoS BSS");
				$sheet->setMerge($rowcount,13,$rowcount,14); $sheet->write($rowcount,13,"OFF OPERATION & MAINTENANCE NETWORK");
				$sheet->setMerge($rowcount,18,$rowcount,19); $sheet->write($rowcount,18,"OFF OPERATION & MAINTENANCE NETWORK ");
				$sheet->setMerge($rowcount,21,$rowcount,22); $sheet->write($rowcount,21,"OFF OPERATION & MAINTENANCE NETWORK ");
				
				$sheet->setMerge($rowcount + 1,3,$rowcount + 1,4); $sheet->write($rowcount + 1,3,"DTF");
				$sheet->setMerge($rowcount + 1,9,$rowcount + 1,10); $sheet->write($rowcount + 1,9,"DTF");
				$sheet->setMerge($rowcount + 1,13,$rowcount + 1, 14); $sheet->write($rowcount + 1,13,"(N/W SERVICES TELKOMFLEXI REGIONAL I)");
				$sheet->setMerge($rowcount + 1,18,$rowcount + 1,19); $sheet->write($rowcount + 1,18,"(N/W SERVICES TELKOMFLEXI REGIONAL II)");
				$sheet->setMerge($rowcount + 1,21,$rowcount + 1,22); $sheet->write($rowcount + 1,21,"(N/W SERVICES TELKOMFLEXI REGIONAL III)");
				
				$sheet->setMerge($rowcount + 2,13,$rowcount + 2,14); $sheet->write($rowcount + 2,13,"DTF");
				$sheet->setMerge($rowcount + 2,18,$rowcount + 2,19); $sheet->write($rowcount + 2,18,"DTF");
				$sheet->setMerge($rowcount + 2,21,$rowcount + 2,22); $sheet->write($rowcount + 2,21,"DTF");
				
				
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");
				$sheet->setMerge($rowcount + 6,9,$rowcount + 6,10); $sheet->write($rowcount + 6,9,"_____________________");
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"____________________");
				$sheet->setMerge($rowcount + 6,18,$rowcount + 6,19); $sheet->write($rowcount + 6,18,"____________________");
				$sheet->setMerge($rowcount + 6,21,$rowcount + 6,22); $sheet->write($rowcount + 6,21,"____________________");
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");
				$sheet->setMerge($rowcount + 7,9,$rowcount + 7,10); $sheet->write($rowcount + 7,9,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,18,$rowcount + 7,19); $sheet->write($rowcount + 7,18,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,21,$rowcount + 7,22); $sheet->write($rowcount + 7,21,"NIK:..........................");
				$rowcount+= 12;
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Direview Pada Tanggal:");
				$rowcount++;
				$sheet->setMerge($rowcount,3,$rowcount,4); $sheet->write($rowcount,3,"Manager Asset Management ");
				$sheet->setMerge($rowcount,9,$rowcount,10); $sheet->write($rowcount,9,"MGR OM & QoS BSS");
				$sheet->setMerge($rowcount,13,$rowcount,14); $sheet->write($rowcount,13,"MGR OPERATION & MAINTENANCE NETWORK");
				$sheet->setMerge($rowcount,18,$rowcount,19); $sheet->write($rowcount,18,"MGR OPERATION & MAINTENANCE NETWORK");
				$sheet->setMerge($rowcount,21,$rowcount,22); $sheet->write($rowcount,21,"MGR OPERATION & MAINTENANCE NETWORK");
				
				$sheet->setMerge($rowcount + 1,3,$rowcount + 1,4); $sheet->write($rowcount + 1,3,"DTF");
				$sheet->setMerge($rowcount + 1,9,$rowcount + 1,10); $sheet->write($rowcount + 1,9,"DTF");
				$sheet->setMerge($rowcount + 1,13,$rowcount + 1, 14); $sheet->write($rowcount + 1,13,"(N/W SERVICES TELKOMFLEXI REGIONAL I)");
				$sheet->setMerge($rowcount + 1,18,$rowcount + 1,19); $sheet->write($rowcount + 1,18,"(N/W SERVICES TELKOMFLEXI REGIONAL II)");
				$sheet->setMerge($rowcount + 1,21,$rowcount + 1,22); $sheet->write($rowcount + 1,21,"(N/W SERVICES TELKOMFLEXI REGIONAL III)");
				
				$sheet->setMerge($rowcount + 2,13,$rowcount + 2,14); $sheet->write($rowcount + 2,13,"DTF");
				$sheet->setMerge($rowcount + 2,18,$rowcount + 2,19); $sheet->write($rowcount + 2,18,"DTF");
				$sheet->setMerge($rowcount + 2,21,$rowcount + 2,22); $sheet->write($rowcount + 2,21,"DTF");
				
				
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");
				$sheet->setMerge($rowcount + 6,9,$rowcount + 6,10); $sheet->write($rowcount + 6,9,"_____________________");
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"____________________");
				$sheet->setMerge($rowcount + 6,18,$rowcount + 6,19); $sheet->write($rowcount + 6,18,"____________________");
				$sheet->setMerge($rowcount + 6,21,$rowcount + 6,22); $sheet->write($rowcount + 6,21,"____________________");
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");
				$sheet->setMerge($rowcount + 7,9,$rowcount + 7,10); $sheet->write($rowcount + 7,9,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,18,$rowcount + 7,19); $sheet->write($rowcount + 7,18,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,21,$rowcount + 7,22); $sheet->write($rowcount + 7,21,"NIK:..........................");
			break;
			case "stm & ims":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");
				$sheet->setMerge($rowcount,13,$rowcount,15); $sheet->write($rowcount,13,"Direview Pada Tanggal:");
				
				$sheet->setMerge($rowcount + 1,3,$rowcount + 1,4); $sheet->write($rowcount + 1,3,"Officer Asset Management");
				$sheet->setMerge($rowcount + 1,9,$rowcount + 1,10); $sheet->write($rowcount + 1,9,"OFF 1 CARD PERSONALIZATION");
				$sheet->setMerge($rowcount + 1,13,$rowcount + 1,14); $sheet->write($rowcount + 1,13,"Manager Asset Management");
				$sheet->setMerge($rowcount + 1,18,$rowcount + 1,19); $sheet->write($rowcount + 1,18,"MGR CARD & CPE PERSONALIZATION MGT");
				$rowcount++;
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");
				$sheet->setMerge($rowcount + 6,9,$rowcount + 6,10); $sheet->write($rowcount + 6,9,"_____________________");
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"____________________");
				$sheet->setMerge($rowcount + 6,18,$rowcount + 6,19); $sheet->write($rowcount + 6,18,"____________________");
				
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");
				$sheet->setMerge($rowcount + 7,9,$rowcount + 7,10); $sheet->write($rowcount + 7,9,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,18,$rowcount + 7,19); $sheet->write($rowcount + 7,18,"NIK:..........................");
			break;
			case "jaringan":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");
				$sheet->setMerge($rowcount,13,$rowcount,15); $sheet->write($rowcount,13,"Direview Pada Tanggal:");
				
				$sheet->setMerge($rowcount + 1,3,$rowcount + 1,4); $sheet->write($rowcount + 1,3,"Officer");				
				$sheet->setMerge($rowcount + 1,13,$rowcount + 1,14); $sheet->write($rowcount + 1,13,"Manager");
				$rowcount++;
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");				
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"____________________");
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");				
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
			break;
			case "lan & wan":
				$sheet->setMerge($rowcount,3,$rowcount,5); $sheet->write($rowcount,3,"Disiapkan Pada Tanggal:");
				$sheet->setMerge($rowcount,13,$rowcount,15); $sheet->write($rowcount,13,"Direview Pada Tanggal:");
				
				$sheet->setMerge($rowcount + 1,3,$rowcount + 1,4); $sheet->write($rowcount + 1,3,"Off. 1 Ast Management");
				$sheet->setMerge($rowcount + 1,9,$rowcount + 1,10); $sheet->write($rowcount + 1,9,"Off. 1 Service Node");
				$sheet->setMerge($rowcount + 1,13,$rowcount + 1,14); $sheet->write($rowcount + 1,13,"Mgr Ast Management");
				$sheet->setMerge($rowcount + 1,18,$rowcount + 1,19); $sheet->write($rowcount + 1,18,"Mgr IP Network ");
				$rowcount++;
				$sheet->setMerge($rowcount + 6,3,$rowcount + 6,4); $sheet->write($rowcount + 6,3,"______________________");
				$sheet->setMerge($rowcount + 6,9,$rowcount + 6,10); $sheet->write($rowcount + 6,9,"_____________________");
				$sheet->setMerge($rowcount + 6,13,$rowcount + 6,14); $sheet->write($rowcount + 6,13,"____________________");
				$sheet->setMerge($rowcount + 6,18,$rowcount + 6,19); $sheet->write($rowcount + 6,18,"____________________");
				
				$sheet->setMerge($rowcount + 7,3,$rowcount + 7,4); $sheet->write($rowcount + 7,3,"NIK:.........................");
				$sheet->setMerge($rowcount + 7,9,$rowcount + 7,10); $sheet->write($rowcount + 7,9,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,13,$rowcount + 7,14); $sheet->write($rowcount + 7,13,"NIK:..........................");
				$sheet->setMerge($rowcount + 7,18,$rowcount + 7,19); $sheet->write($rowcount + 7,18,"NIK:..........................");
			break;
			case "tanah & bangunan":				
				
			break;
			
		}
		return $sheet;
	}
}
/*while ($row1 = $rs1->FetchNextObject($toupper=true))
		{			
			if (!file_exists($rootFolder."/".str_replace(" ","_",$row1->NMUBIS))){				
				mkdir($rootFolder."/".str_replace(" ","_",$row1->NMUBIS));
				$folderDiv = $rootFolder."/".str_replace(" ","_",$row1->NMUBIS);				
			}else $folderDiv = $rootFolder."/".str_replace(" ","_",$row1->NMUBIS);
			
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
				if ($xlAltDivisi != null)  $this->closeExcel($xlAltDivisi, $sheetD, $rowcountDivisi, $jenis_proc);		
				$excelDivisi = new Spreadsheet_Excel_Writer($folderDiv."/list_nka.xls");
				$sheetdivisi =& $excelDivisi->addWorksheet($nmdivisi);	
							
				$namafile = $folderDivisi . "/nka.xls";
				$xlAltDivisi = new Spreadsheet_Excel_Writer($namafile);
				$xlAltDivisi->setCustomColor(14, 192,192,192);				
				
				$headerFormatD =& $xlAltDivisi->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
				$numFormatD =& $xlAltDivisi->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black'));		
				$normalFormatD =& $xlAltDivisi->addFormat(array('border' => 1, 'bordercolor' => 'black'));				
				$yellowD =& $xlAltDivisi->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
				$greenD =& $xlAltDivisi->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$format_top_centerD =& $xlAltDivisi->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
												
				$rowcountd = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetdivisi->write($rowcountd, $i,$rs1->FetchField($i)->name,$headerFormatD);
				$rowcountd = 1;				
				$first = true;
				$rowcountDivisi = 14;
			}
			if ($nmregional != $nmsbis && $folderRegional != '-'){
				$nmregional = $nmsbis;
				if ($excelRegional != null)  $excelRegional->close();
				if ($xlAltReg != null) $this->closeExcel($xlAltReg, $sheetR, $rowcountRegional, $jenis_proc);
				$excelRegional = new Spreadsheet_Excel_Writer($folderRegional."/list_nka.xls");
				$sheetregional =& $excelRegional->addWorksheet($nmregional);
								
				$namafile = $folderRegional . "/nka.xls";
				$xlAltReg = new Spreadsheet_Excel_Writer($namafile);									
				
				$headerFormatR =& $xlAltReg->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
				$numFormatR =& $xlAltReg->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black'));		
				$normalFormatR =& $xlAltReg->addFormat(array('border' => 1, 'bordercolor' => 'black'));				
				$yellowR =& $xlAltReg->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
				$greenR =& $xlAltReg->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$format_top_centerR =& $xlAltReg->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
				
				$rowcountr = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetregional->write($rowcountr, $i,$rs1->FetchField($i)->name,$headerFormatR);
				$rowcountr = 1;				
				$first = true;
				$rowcountRegional = 14;
			}else if ($excelRegional != null && $nmregional != $nmsbis){
				$excelRegional->close();
				if ($xlAltReg != null) $this->closeExcel($xlAltReg, $sheetR, $rowcountRegional, $jenis_proc);
				$rowcountr = 0;
				$rowcountRegional = 14;				
			}
			
			if ($nmarea != $nmlocation && $folderArea != '-'){
				$nmarea = $nmlocation;
				if ($excelArea != null)  $excelArea->close();							
				if ($xlAltArea != null)  $this->closeExcel($xlAltArea, $sheetA, $rowcountArea, $jenis_proc);		
				$excelArea = new Spreadsheet_Excel_Writer($folderArea."/list_nka.xls");					
				$sheetarea =& $excelArea->addWorksheet($nmarea);				
								
				$namafile = $folderArea . "/nka.xls";
				$xlAltArea = new Spreadsheet_Excel_Writer($namafile);									
				
				$headerFormatR =& $xlAltArea->addFormat(array('bold' => true, 'halign' => 'center','border' => 1,'bordercolor' => 'black','textwrap' => 1));	//, 
				$numFormatA =& $xlAltArea->addFormat(array('numformat' => '#,##.00','border' => 1,'bordercolor' => 'black'));		
				$normalFormatA =& $xlAltArea->addFormat(array('border' => 1, 'bordercolor' => 'black'));				
				$yellowA =& $xlAltArea->addFormat(array('bold' => true, 'border' => 1, 'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'yellow','pattern' => 1));		
				$greenA =& $xlAltArea->addFormat(array('bold' => true, 'border' => 1,'halign' => 'center', 'bordercolor' => 'black','fgcolor' => 'green','pattern' => 1	));
				$format_top_centerA =& $xlAltArea->addFormat(array('halign' => 'center', 'bold' => true, 'size' => 13));		
				
				$rowcounta = 0;
				for ($i = 0; $i < $rs1->FieldCount(); $i++)	$sheetarea->write($rowcounta, $i,$rs1->FetchField($i)->name,$headerFormatR);
				$rowcounta = 1;				
				$first = true;
				$rowcountArea = 14;
			}else if ($excelArea != null) {
				$excelArea->close();
				if ($xlAltArea != null)  $this->closeExcel($xlAltArea, $sheet, $rowcountArea, $jenis_proc);						
				$rowcounta = 0;
				$rowcountArea = 14;				
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
					if ($nmregional != '-' && $nmregional != '') $sheetregional->write($rowcountr, $i, $value, $normalFormatR);					
					if ($nmarea != '-' && $nmarea != '') $sheetarea->write($rowcounta, $i, $value, $normalFormatA);					
				}
				$i++;
			}
			$rowcountd++;
			$rowcountr++;
			$rowcounta++;					
					
			if ($first){
				if ($folderArea != '-')
					$excel = $xlAltArea;		
				else if ($folderRegional != '-')
					$excel = $xlAltReg;		
				else $excel = $xlAltDivisi;										
				
				if ($nmarea != '-' && $nmarea != '') {
					$sheetA = $this->getHeader($xlAltArea, $jenis_proc,$headerFormatA, $normalFormatA, $numFormatA,$format_top_centerA, $yellowA, $greenA);
					$headerFormat = $headerFormatA;
					$numFormat = $numFormatA;
					$normalFormat = $normalFormatA;
					$yellow = $yellowA;
					$green = $greenA;
					$format_top_center = $format_top_centerA;
				}else if ($nmregional != '-' && $nmregional != '') {
					$sheetR = $this->getHeader($xlAltReg, $jenis_proc,$headerFormatR, $normalFormatR, $numFormatR,$format_top_centerR, $yellowR, $greenR);
					$headerFormat = $headerFormatR;
					$numFormat = $numFormatR;
					$normalFormat = $normalFormatR;
					$yellow = $yellowR;
					$green = $greenR;
					$format_top_center = $format_top_centerR;
				}else {
					$sheetD = $this->getHeader($xlAltDivisi, $jenis_proc,$headerFormatD, $normalFormatD, $numFormatD,$format_top_centerD, $yellowD, $greenD);
					$headerFormat = $headerFormatD;
					$numFormat = $numFormatD;
					$normalFormat = $normalFormatD;
					$yellow = $yellowD;
					$green = $greenD;
					$format_top_center = $format_top_centerD;
				}
			}
			$first = false;
			$row = $row1;
			if ($nmarea != '-' && $nmarea != '') {
				$rowCount = $rowcountArea;
				$sheet = $sheetA;
				$sheet->setMerge($rowcount,0,$rowcount,1);$sheet->writeString($rowcount,0,$row->NO_FA, $normalFormat);$sheet->write($rowcount,1, "", $normalFormat);
				$sheet->writeString($rowcount,2,$row->NO_SN, $normalFormat);
				$sheet->write($rowcount,3,$row->KODE_KLPFA, $normalFormat);
				$sheet->setMerge($rowcount,4,$rowcount,7);$sheet->write($rowcount,4,$row->NAMA, $normalFormat);for ($i=5;$i <= 7;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
				$sheet->setMerge($rowcount,8,$rowcount,10);$sheet->write($rowcount,8,$row->NAMA2, $normalFormat);for ($i=9;$i <= 10;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
				$sheet->write($rowcount,11,$row->KODE_LOKFA, $normalFormat);
				$sheet->write($rowcount,12,$row->TGL_PEROLEHAN, $normalFormat);
				$sheet->setMerge($rowcount,13,$rowcount,14);$sheet->write($rowcount,13,$row->NILAI, $numFormat);$sheet->write($rowcount,14, "", $normalFormat);
				$sheet->setMerge($rowcount,15,$rowcount,16);$sheet->write($rowcount,15,$row->NILAI_AP, $numFormat);$sheet->write($rowcount,16, "", $normalFormat);
				$sheet->setMerge($rowcount,17,$rowcount,18);$sheet->write($rowcount,17,$row->NILAI_BUKU, $numFormat);$sheet->write($rowcount,18, "", $normalFormat);			
				for ($f=0; $f < count($this->dbField);$f++){				
					$sheet->write($rowcount,19 + $f, " ", $normalFormat);
				}
				$rowcountArea++;
			}else if ($nmregional != '-' && $nmregional != '') {
				$rowCount = $rowcountRegional;
				$sheet = $sheetR;
				$sheet->setMerge($rowcount,0,$rowcount,1);$sheet->writeString($rowcount,0,$row->NO_FA, $normalFormat);$sheet->write($rowcount,1, "", $normalFormat);
				$sheet->writeString($rowcount,2,$row->NO_SN, $normalFormat);
				$sheet->write($rowcount,3,$row->KODE_KLPFA, $normalFormat);
				$sheet->setMerge($rowcount,4,$rowcount,7);$sheet->write($rowcount,4,$row->NAMA, $normalFormat);for ($i=5;$i <= 7;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
				$sheet->setMerge($rowcount,8,$rowcount,10);$sheet->write($rowcount,8,$row->NAMA2, $normalFormat);for ($i=9;$i <= 10;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
				$sheet->write($rowcount,11,$row->KODE_LOKFA, $normalFormat);
				$sheet->write($rowcount,12,$row->TGL_PEROLEHAN, $normalFormat);
				$sheet->setMerge($rowcount,13,$rowcount,14);$sheet->write($rowcount,13,$row->NILAI, $numFormat);$sheet->write($rowcount,14, "", $normalFormat);
				$sheet->setMerge($rowcount,15,$rowcount,16);$sheet->write($rowcount,15,$row->NILAI_AP, $numFormat);$sheet->write($rowcount,16, "", $normalFormat);
				$sheet->setMerge($rowcount,17,$rowcount,18);$sheet->write($rowcount,17,$row->NILAI_BUKU, $numFormat);$sheet->write($rowcount,18, "", $normalFormat);			
				for ($f=0; $f < count($this->dbField);$f++){				
					$sheet->write($rowcount,19 + $f, " ", $normalFormat);
				}	
				$rowcountRegional++;
			}else{
				$rowCount = $rowcountDivisi;
				$sheet = $sheetD;
				$sheet->setMerge($rowcount,0,$rowcount,1);$sheet->writeString($rowcount,0,$row->NO_FA, $normalFormat);$sheet->write($rowcount,1, "", $normalFormat);
				$sheet->writeString($rowcount,2,$row->NO_SN, $normalFormat);
				$sheet->write($rowcount,3,$row->KODE_KLPFA, $normalFormat);
				$sheet->setMerge($rowcount,4,$rowcount,7);$sheet->write($rowcount,4,$row->NAMA, $normalFormat);for ($i=5;$i <= 7;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
				$sheet->setMerge($rowcount,8,$rowcount,10);$sheet->write($rowcount,8,$row->NAMA2, $normalFormat);for ($i=9;$i <= 10;$i++) $sheet->write($rowcount,$i, "", $normalFormat);
				$sheet->write($rowcount,11,$row->KODE_LOKFA, $normalFormat);
				$sheet->write($rowcount,12,$row->TGL_PEROLEHAN, $normalFormat);
				$sheet->setMerge($rowcount,13,$rowcount,14);$sheet->write($rowcount,13,$row->NILAI, $numFormat);$sheet->write($rowcount,14, "", $normalFormat);
				$sheet->setMerge($rowcount,15,$rowcount,16);$sheet->write($rowcount,15,$row->NILAI_AP, $numFormat);$sheet->write($rowcount,16, "", $normalFormat);
				$sheet->setMerge($rowcount,17,$rowcount,18);$sheet->write($rowcount,17,$row->NILAI_BUKU, $numFormat);$sheet->write($rowcount,18, "", $normalFormat);			
				for ($f=0; $f < count($this->dbField);$f++){				
					$sheet->write($rowcount,19 + $f, " ", $normalFormat);
				}	
				$rowcountDivisi++;
			}			
		}*/
?>
