<?php
uses("server_BasicObject");
uses("server_util_Map");
uses("server_DBConnection_dbLib");
class server_control_saiDataGrid extends server_BasicObject
{
	var $sql;
	var $page;
	var $rowPerPage;
	var $resource;
	var $colWidth = array();
	var $ctrlId;	
	function __construct($session = "")
	{
		parent::__construct();
		if (!empty($session)) {			
			$this->session = $session;
			$this->load();			
		}
	}
	protected function load() {		
		global $dirSeparator;
		global $serverDir;			
		$tmpDir = $serverDir. $dirSeparator . "tmp";		
		$fileName = $tmpDir . $dirSeparator . "ses_". $this->session;            
		$f = new server_util_File($fileName);
		$data = $f->getContents();				
		$obj = new server_control_saiDataGrid();		
		$obj->fromXML($data);
		$this->sql = $obj->sql;		
		$this->page = $obj->page;
		$this->rowPerPage = $obj->rowPerPage;
		$this->resource = $obj->resource;
		$this->ctrlId = $obj->ctrlId;
		$this->colWidth = explode(",",$obj->colWidth);
	}
	protected function doSerialize()
	{
		parent::doSerialize();
		$this->serialize("sql", "string",$this->sql);
		$this->serialize("page", "integer", $this->page);
		$this->serialize("rowPerPage", "integer", $this->rowPerPage);
		$this->serialize("resource", "integer", $this->resource);
		$this->serialize("ctrlId", "string", $this->ctrlId);
		$this->serialize("colWidth", "string",implode(",",$this->colWidth));
	}
	function init()
	{
		parent::init();
		$sesId = md5(date("r"));        
        $cont = true;        
        global $dirSeparator;
		global $serverDir;
        $tmpDir = $serverDir. $dirSeparator . "tmp";
        do
        {
            $fileName = $tmpDir . $dirSeparator . "ses_".$sesId;
            if (file_exists($fileName))
                $sesId = md5(date("r"));
            else $cont = false;            
                
        } while ($cont); 		
		$this->session = $sesId;
		$f = new server_util_File($fileName);
		$f->setContents($this->toXML());				
		return $sesId;
	}
	function deinit()
	{
		parent::deinit();		
		global $dirSeparator;
		global $serverDir;
        $tmpDir = $serverDir. $dirSeparator . "tmp";
        $fileName = $tmpDir . $dirSeparator . "ses_". $this->session;            
		$f = new server_util_File($fileName);		
		$f->setContents($this->toXML());		
	}	
	function setLinkCtrl($resource, $ctrlId,$colWidth) {
		$this->resource = $resource;
		if (gettype($colWidth) == "string") 
			$this->colWidth = array();
		else  $this->colWidth = $colWidth->getArray();
		$this->ctrlId = $ctrlId;		
	}
	function setSQL($sql, $page, $rowPerPage) {
		$this->sql = $sql;
		$this->page = $page;
		$this->rowPerPage = $rowPerPage;				
	}
	function getControl()
    {    
		try
		{  			
			global $dbLib;				
			$start = -1;	  
			if ($this->page > 0)
			{		
				$start = (($this->page-1) * $this->rowPerPage);							
			}else $this->rowPerPage = -1;									
			$resultSet = $dbLib->db->SelectLimit($this->sql, $this->rowPerPage, $start);			
			$f = new server_util_File("server/util/laporan.css");
			$htmlHeader = $f->getContents();
			$htmlHeader .= "<script language='javascript'>";			
			$htmlHeader .= "window.parent.showProgress();";						
			$htmlHeader .= "function doScroll(event){";			
			$htmlHeader .= "	window.parent.system.getResource(".$this->resource.").doScrollFrame(document.body);";
			$htmlHeader .= "}";
			$htmlHeader .= "function doLoad(event){";		
			$htmlHeader .= "	window.parent.system.getResource(".$this->resource.").doLoadFrame(event);";
			$htmlHeader .= "}";
			$htmlHeader .= "function getCell(col, row){";
			$htmlHeader .= "	return window.rowData.get(row)[col];";
			$htmlHeader .= "}";
			$htmlHeader .= "function setCell(col, row,value){";
			$htmlHeader .= "	window.rowData.get(row)[col] = value;";
			$htmlHeader .= "	var cell = document.getElementById('".$this->ctrlId . "__row' + row+'_cell'+col);";
			$htmlHeader .= "	if (cell) cell.innerHTML = value;";
			$htmlHeader .= "}";
			$htmlHeader .= "window.rowData = new window.parent.portalui_arrayMap();";			
			$htmlHeader .= "function eventMouseOver(event,row, col){".
				"var target = document.all ? event.srcElement : event.target; ".
				"var color = '#ffcc45';".		
				"target.style.background = color;}";
			$htmlHeader .= "function eventMouseOut(event,row, col){".
				"		var target = document.all ? event.srcElement : event.target;	".					
				"		var color = '#e1e2f7';".
				"		if (row % 2 == 0)".
				"			color = '#a0beff';".										
				"	target.style.background = color;}";
			$htmlHeader .= "function eventDoubleClick(event,row, col){".
				"	try{var owner= window.parent.system.getResource(".$this->resource.");".
				"	owner.doDblClick(this, col, row);".
				"	var top = document.all ? event.srcElement.parentNode.offsetTop : event.target.parentNode.offsetTop;".										
				"	top = top - document.body.scrollTop;".
				"	var colHeader = owner.columns.get(col);".					
				"	if (colHeader != undefined && !colHeader.readOnly && !colHeader.hideColumn && !owner.readOnly){".
				"		try{			".
				"			owner.showInplaceEdit(col,row);".
				"		}catch(e){".
				"			window.parent.systemAPI.alert(owner,e);".
				"		}".
				"	}".
				"	}catch(e){alert(e);}".
				"}";				
			$htmlHeader .= "function eventClick(event,row, col){".
					"var owner= window.parent.system.getResource(".$this->resource.");".
					"owner.getForm().setActiveControl(owner);".
					"owner.doClick(owner, col, row);".
					"owner.doSelectCell(owner, col, row);".
					"owner.setRowIndex(row, col);}";					
			//$htmlHeader .= "document.oncontextmenu = function(){return false;}";							
			if ($resultSet) {
				if (gettype($this->colWidth) == "string")
					$this->colWidth = explode(",", $this->colWidth);
				$width = 0;
				foreach($this->colWidth as $key => $value) $width += floatval($value);				
				$html .= "";
				$rowIndex = 0;
				$color = "";
				$top = 0;
				$rowHeight = 19;			
				$first = true;
				if ($resultSet->EOF) {
					$htmlHeader .= "</script>\r\n";
					$htmlHeader .= "<body onload='doLoad(event)' style=\"background:#d2dae5; font-family:Arial; font-size:11px;\" leftmargin=\"0px\" rightmargin=\"0px\" topmargin=\"0px\" bottommargin=\"0px\" onscroll='doScroll(event);'>\r\n";
					writeln($htmlHeader);
				}
				while (!$resultSet->EOF) {					
					if ($first) {
						if ($width == 0){
							$this->colWidth = array();												
							$colTitle = array();
							$column = array();
							for ($i = 0; $i < $resultSet->FieldCount(); $i++){
								if ($resultSet->FetchField($i)->type == "N" || $resultSet->FetchField($i)->type == "real")								
									$length = 100;
								else{
									$length = $resultSet->FetchField($i)->max_length * 6;
									if ($length < 80) $length = 80;
									if ($length > 250) $length = 250;					
								}	
								$colTitle[$i] = "'" . $resultSet->FetchField($i)->name . "'";
								$width += $length;
								$this->colWidth[$i] = $length;
								$column[$i] = $i;
							}						
							$htmlHeader .= "window.parent.system.getResource(".$this->resource.").setColCount(".$resultSet->FieldCount() .");";
							$htmlHeader .= "window.parent.system.getResource(".$this->resource.").setColTitle([".implode(",", $colTitle)."]);";						
							$htmlHeader .= "window.parent.system.getResource(".$this->resource.").setColWidth([".implode(",",$column) ."],[".implode(",", $this->colWidth)."]);";						
						}						
						$htmlHeader .= "</script>\r\n";
						$htmlHeader .= "<body onload='doLoad(event)' style=\"background:#d2dae5; font-family:Arial; font-size:11px;\" leftmargin=\"0px\" rightmargin=\"0px\" topmargin=\"0px\" bottommargin=\"0px\" onscroll='doScroll(event);'>\r\n";
						writeln($htmlHeader);
					}
					$first = false;
					$color = "#e1e2f7";				
					if ($rowIndex % 2 == 0)
						$color = "#a0beff";
					$rowID = $this->ctrlId."__row".$rowIndex;				
					writeln( "<div id='".$rowID."' style='background:".$color.";position:absolute;left:0;top:".$top.";width:".$width.";height:".$rowHeight."'>");
					$left = 0;
					$values = array();					
					for ($i = 0; $i < $resultSet->FieldCount(); $i++)
					{					
						$align = "left";
						if ($resultSet->FetchField($i)->type == "text" || $resultSet->FetchField($i)->type == "blob"){
							$value = addslashes($resultSet->fields[$i]);
							$value = str_replace("\n", "", $value);							
							$values[$i] = "'".$value."'";
						}else if ($resultSet->FetchField($i)->type == "N" || $resultSet->FetchField($i)->type == "real"){							
							$value = floatval($resultSet->fields[$i]);
							$values[$i] = $value;
							$value = number_format($value, 0, ',', '.');
							$align = "right";
						}else {
							$value = addslashes($resultSet->fields[$i]);
							if ($value == "") $value = "-";							
							$values[$i] = "'".$value."'";
						}							
						writeln("<div id='".$rowID."_cell".$i."' style='position:absolute;border:1px solid #919B9B;background:".$color.";overflow:hidden;left:".$left."; top:0; height:100%; width:".$this->colWidth[$i].";margin-right:0;white-space: nowrap;text-align:".$align ."' ".
								" onDblClick = 'eventDoubleClick(event, ".$rowIndex.", ".$i.")'; ".
								" onClick = 'eventClick(event, ".$rowIndex.", ".$i.")'; ".
								" onMouseOver = 'eventMouseOver(event, ".$rowIndex.",".$i.")'; ".
								" onMouseOut = 'eventMouseOut(event, ".$rowIndex.",".$i.")'; ".										
								">". $value ."</div>");
						$left += floatval($this->colWidth[$i]);
					}						
					writeln("</div>");
					$htmlHeader = "<script language='javascript'>";
					$htmlHeader .= "window.parent.system.getResource(".$this->resource.").addRowValues([".implode(",",$values)."], true);";						
					$htmlHeader .= "window.rowData.set(".$rowIndex.",[".implode(",", $values)."]);";					
					$htmlHeader .= "</script>";
					write($htmlHeader);
					$top += $rowHeight;
					$rowIndex++;
					$resultSet->MoveNext();
				}														
			}else {
				$htmlHeader .= "</script>\r\n";
				$htmlHeader .= "<body style=\"background:#d2dae5; font-family:Arial; font-size:11px;\" leftmargin=\"0px\" rightmargin=\"0px\" topmargin=\"0px\" bottommargin=\"0px\" onscroll='doScroll(event);'>\r\n";
				writeln($htmlHeader);
			}
			$htmlHeader = "<script language='javascript'>";
			$htmlHeader .= "window.parent.hideProgress();";						
			$htmlHeader .= "</script>\r\n";
			writeln($htmlHeader);
			writeln("</body>");
			return "";
		}catch(Exception $e)
		{
		   return $e->getMessage();
		}
	}	
}
?>
