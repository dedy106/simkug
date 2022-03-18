<?php 
/***********************************************************************************************
*	Copyright (c) 2008 SAI, PT and Salltanera Teknologi, PT   and Others 		
*	 All rights reserved. This program and the accompanying materials
*	 are made available under the terms of the Common Public License v1.0
*	 which accompanies this distribution, and is available at												
*	Contributors 
* 			SAI, PT											
***********************************************************************************************/
uses("server_jpgraph-2.3_src_jpgraph", false);
uses("server_jpgraph-2.3_src_jpg-config.inc", false);
include_once("server/jpgraph-2.3/src/jpgraph_pie.php");
include_once("server/jpgraph-2.3/src/jpgraph_pie3d.php");
include_once("server/jpgraph-2.3/src/jpgraph_bar.php");
uses("server_BasicObject");
uses("server_DBConnection_dbLib");

class server_graph_graph extends server_BasicObject
{
	protected $html;
	protected $sql;
	
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
	
//------------------------
	function createGraph($sql, $chartType, $title, $width, $height, $titleX = "Aktiva", $titleY = "Nilai" )
	{
		//ob_clean();              
		$first = true;
    
		global $dbLib;
		$resultSet = $dbLib->execute($sql);		
		if (!$resultSet)
		{
			$data = array();	
			$fieldname = array();
		}     	  	
		else
		{
			$r = 0;
			$data = array();	
			$fieldname = array();
			while (!$resultSet->EOF)
			{
  			  if ($first)
  				{
  					for ($i = 0; $i < $resultSet->FieldCount(); $i++)
  					{
  						$name = $resultSet->FetchField($i)->name;					
  						$data[$i] = array();
  						$fieldname[] = $name;
  					}					
  					$first = false;                          					
  				}
          for ($i = 0; $i < $resultSet->FieldCount(); $i++)
  				{
  				   $type = $resultSet->MetaType($resultSet->FetchField($i)->type);
             $value = $resultSet->fields[$i];
  					 $data[$i][] = $value;
  				}
  				$resultSet->MoveNext();
			}
		}
		$resultSet->close();
		$this->setSql($sql);			
    
    switch ($chartType)
    {
      case "pie" :
        $graph = new PieGraph($width,$height,"auto");
        // Setup the pie plot
        $p1 = new PiePlot($data[1]);
        
        // Adjust size and position of plot
        $p1->SetSize(0.35);
        $p1->SetCenter(0.5,0.52);
        $p1->SetLegends($data[0]);
        // Setup slice labels and move them into the plot
        $p1->value->SetFont(FF_FONT1,FS_BOLD);
        $p1->value->SetColor("darkred");
        $p1->SetLabelPos(0.65);
        
        // Explode all slices
        $p1->ExplodeAll(10);
        
        // Add drop shadow
        $p1->SetShadow();
        $graph->Add($p1);   
        break;
      case "bar" :
        $graph = new Graph($width,$height,"auto");
        $color = array_keys($graph->img->rgb->rgb_table);
        sort($color);
        $graph->img->SetMargin(70,30,20,100);
        $graph->SetScale("textlin");            
        for ($i=1;$i<count($fieldname);$i++)
        {
          $bar[] = new BarPlot($data[$i]);
          $bar[count($bar) - 1]->SetFillColor($color[$i]);
          $bar[count($bar) - 1]->SetLegend($fieldname[$i],$color[$i]);                    
        }  
                            
        $gbPlot = new GroupBarPlot($bar);
        $gbPlot->SetWidth(0.5);
        $graph->Add($gbPlot);
        // Setup font for axis
        $graph->xaxis->SetFont(FF_VERDANA,FS_NORMAL,8);
        $graph->yaxis->SetFont(FF_VERDANA,FS_NORMAL,8);
        
        // Show 0 label on Y-axis (default is not to show)
        $graph->yscale->ticks->SupressZeroLabel(false);
        
        // Setup X-axis labels
        $graph->xaxis->SetTickLabels($data[0]);
        $graph->xaxis->SetLabelAngle(50);
      
        $graph->xaxis->title->Set($titleX);
        $graph->yaxis->title->Set($titleY);                
        
        break;
    } 
    // Create the bar plots    
    $graph->SetShadow();            
      
    // Title setup
    $graph->title->Set($title);
    $graph->title->SetFont(FF_FONT1,FS_BOLD);        
    // Finally add the plot    
    
    // ... and stroke it
		$name = md5(uniqid(rand(), true)) .".gif";
		global $manager;
		$save = $manager->getTempDir() . "/$name";
		$graph->Stroke($save);
		//error_log($save);
		return $name;
	}	
//------------------------ setter getter

	function createHtml($sql)
	{
		global $dbLib;
		$resultSet = $dbLib->execute($sql);		
		$html = "<table width='900' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000'>".				
					"<tr bgcolor='#666666' style='{font-size:13;color:#ffffff;}'>".
					"<th width='10' nowrap='nowrap' scope='col'><font color='#ffffff'>&nbsp;No&nbsp;</font></th>";	
		$first = true;
		if (!$resultSet)
			$html .= "</tr>";	
		else
		{
			$r = 0;
			while (!$resultSet->EOF)
			{
				if ($first)
				{
					for ($i = 0; $i < $resultSet->FieldCount(); $i++)
					{
						$name = $resultSet->FetchField($i)->name;					
						$html .= "<th nowrap='nowrap' scope='col'><font color='#ffffff'>". $name ."</font></th>";
					}					
					$first = false;
					$html .= "</tr>";
				}
				$r++;
				$html .= "<tr>".
						 	"<th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\" ><font color='#ffffff'>$r</font></th>";
				for ($i = 0; $i < $resultSet->FieldCount(); $i++)
				{
					$value = $resultSet->fields[$i];											
					$type = $resultSet->MetaType($resultSet->FetchField($i)->type);
					if ($type == 'N')
						$html .= "<td nowrap='nowrap' style='{font-size:10;}' align=right>&nbsp;". number_format($value, 2, ',', '.')."&nbsp;</td>";
					else
						$html .= "<td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $value."&nbsp;</td>";
				}		
				$resultSet->MoveNext();
				$html .= "</tr>";
			}				
		}
		$resultSet->close();
		$html .= "</table>";
		$this->sethtml($html);
		return $html;
	}
	function getFullHtml($sql)
	{
		$this->createHtml($sql);		
		$html = "<!DOCTYPE html PUBLIC '-//W3C//DTD XHTML 1.0 Transitional//EN' 'http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd'><html xmlns='http://www.w3.org/1999/xhtml'><head><meta http-equiv='Content-Type' content='text/html; charset=iso-8859-1' /><title>Untitled Document</title></head><body><br>";
		$html .= $this->html;
		$html .="</body></html>";		
		return $html;		
	}
	function getXlsFromSQL($sql)
	{
		$this->createHtml($sql);
		$html = $this->html;
		$name = md5(uniqid(rand(), true)) .".xls";
		global $manager;
		$save = $manager->getTempDir() . "/$name";
		$f=fopen($save,'w');
		fputs($f,$html);
		fclose($f);
		return "server/tmp/$name";
	}
	function sethtml($data)
	{
		$this->html = $data;
	}	
	function gethtml($data)
	{
		return $this->html;
	}
	function setOrientation($data)
	{
		$this->orientation = $data;
	}
	function getOrientation($data)
	{
		return $this->orientation;
	}
	function setUnit($data)
	{
		$this->unit = $data;
	}
	function getUnit()
	{
		return $this->unit;
	}
	function setFormat($data)
	{
		$this->format = $data;
	}
	function getFormat()
	{
		return $this->format;
	}
	function setMaxPageRow($data)
	{
		$this->maxPageRow = $data;
	}
	function getMaxPageRow()
	{
		return $this->maxPageRow;
	}
	function setSql($sql)
	{
		$this->sql = $sql;
	}
}	
?>