<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
class server_report_GL_BB
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function filterStr ($filterFieldName, $filterTipe, $filterData1, $filterData2, $filterAddStr)
	{
	  $s = "";
	  if ($filterData1 == "" ) $filterData1 = ""; if ($filterData2 == "" ) $filterData2 = "";
	  if ($filterTipe == "=" ) $s = "(" + $filterFieldName + " = '" + $filterData1 + "')";
	  if ($filterTipe == "<=" ) $s = "(" + $filterFieldName + " <= '" + $filterData1 + "')";
	  if ($filterTipe == ">=" ) $s = "(" + $filterFieldName + " >= '" + $filterData1 + "')";
	  if ($filterTipe == "<" ) $s = "(" + $filterFieldName + "  < '" + $filterData1 + "')";
	  if ($filterTipe == "<>" ) $s = "(" + $filterFieldName + " <> '" + $filterData1 + "')";
	  if ($filterTipe == "Like" ) $s = "(" + $filterFieldName + " Like '" + $filterData1 + "%')";
	  if ($filterTipe == "All" ) $s = "(" + $filterFieldName + " LIKE '%" + "')";
	  if ($filterTipe == "Range" ) $s = "(" + $filterFieldName + " BETWEEN '" + $filterData1 + "' AND '" + $filterData2 + "')";
	
	  if ($s != "" ) $s = $filterAddStr + $s;
	  return $s;
	}
	function getTotalPage()
	{
		$sql = "select count(*) from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter;
		global $dbLib;
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
		$sql1 = "select distinct b.kode_akun, b.nama, '' as periode, 0 as so_awal, b.kode_lokasi, c.nama from masakun b ".
				" inner join lokasi c on c.kode_lokasi = b.kode_lokasi ".				
				" order by b.kode_akun";		
		
		$start = (($this->page-1) * $this->rows);
		//$sql1 .= " limit ". $start . "," . $this->rows;
		
		$html = "<label style='{font-size:20px;}'><b>Buku Besar</b></label><br>"; 		
		$html .= "<label style='{font-size:12px}'>$this->lokasi</label><br>"; 					
		$html .= "<label style='{font-size:10px}'>$this->showFilter</label><br><br>"; 					
		global $dbLib;				
		$rs = $dbLib->limitQuery($sql1,$this->rows, $start);
    $html .= "<table width='500' border='0' bgcolor='#aabbcc'>".
							 "        <tr>".
							 "           <td width='90'><font size='2'>Periode</td>".
							 "           <td width='10'>&nbsp;</td>".
							 "           <td class='judul_laporan' width='400'>Akun</td>".
							 "        </tr>".
							 "        <tr>".
							 "           <td width='90'><font size='2'>Akun</td>".
							 "           <td width='10'>&nbsp;</td>".
							 "           <td class='judul_laporan' width='400'>akun 2</td>".
							 "        </tr>".				 
							 "        <tr>".
							 "           <td width='90'><font size='2'>Lokasi</td>".
							 "           <td width='10'>&nbsp;</td>".
							 "           <td class='judul_laporan' width='400'>Nama</td>".
							 "        </tr>".				 				 
							 "</table><br>";
						 	
		if ($rs)
		{			
			$filter = explode(";",$this->showFilter);			
			$periode = explode(" ",$filter[0]);
			$lokasi = explode(" ",$filter[1]);
			$akun = explode(" ",$filter[2]);
			//periode
			//lokasi
			//akun
			$filter = $this->filterStr("periode",$periode[1],$periode[2],$periode[3], "where");			
			if (!$rs)
			{
				while (!$rs->EOF)
				{					
					
					$html .= "<table width='200' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000'>".										
							"  <tr bgcolor='#666666' style='{color:#ffffff;font-size:13;}'>".
							"   <th nowrap='nowrap' scope='col'><font color='#ffffff' size='1'>No</font></th>".	
							"   <th nowrap='nowrap' scope='col'><font color='#ffffff' size='1'>No Bukti</font></th>".	
							"   <th nowrap='nowrap' scope='col'><font color='#ffffff' size='1'>Keterangan</font></th>".
							"   <th nowrap='nowrap' scope='col'><font color='#ffffff' size='1'>DC</font></th>".
							"   <th nowrap='nowrap' scope='col'><font color='#ffffff' size='1'>Nilai</font></th>".
							"   <th nowrap='nowrap' scope='col'><font color='#ffffff' size='1'>Saldo</font></th>".
							"</font>".
							"  </tr>";		
							
					$saldo = $rs->fields[3];
					$html .= "<tr>".
								"   <th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\"></th>".
								"   <td nowrap='nowrap' style='{font-size:10;}'> Saldo Awal </td>".
								"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;</td>".
								"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;</td>".
								"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;</td>".
								"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($saldo, 2, ',', '.')."&nbsp;</td>".
								"</tr>";		
								
					$filter = " where kode_akun = '" . $rs->fields[0] ."' ".
							" and periode = '".$rs->fields[2]."' and kode_lokasi = '" . $rs->fields[4] ."'";			
					$sql = "select No_Bukti, Keterangan, dc, nilai from gldt ";						
					$rs->MoveNext();						
					$rs2 = $dbLib->execute($sql . $filter);				
					if ($rs2)
					{					
						$i = 1;
						while (!$rs2->EOF)
						{
							if ($rs2->fields[2] == "C")
								$saldo -= $rs2->fields[3];
							else $saldo += $rs2->fields[3];
							$html .= "<tr>".
									"   <th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\"><font color='#ffffff' size=1>$i</font></th>".
									"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs2->fields[0]."&nbsp;</td>".
									"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs2->fields[1]."&nbsp;</td>".
									"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". $rs2->fields[2] ."&nbsp;</td>".
									"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($rs2->fields[3], 2, ',', '.')."&nbsp;</td>".
									"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($saldo, 2, ',', '.')."&nbsp;</td>".
									"</tr>";
							$rs2->MoveNext();
							$i++;	
						}
						
						$sql = "select sum(case when dc = 'D' then nilai else -nilai end) as total from gldt ". $filter;
						$rs3 = $dbLib->execute($sql);		
						if ($rs3)
						{
							$html .= "<tr bgcolor='#206A86' style='{font-size:10;color:#ffffff;}'>".
										"   <th bgcolor='#666666' style='{font-size:10;}' scope=\"row\"></th>".
										"   <td nowrap='nowrap' style='{font-size:10;}'><font size='1' color='#ffffff'>Saldo Akhir</font></td>".
										"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
										"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;</td>".
										"   <td nowrap='nowrap' style='{font-size:10;}' align='right'><font size='1' color='#ffffff'>&nbsp;". 
														number_format($rs3->fields[0], 2, ',', '.') ."&nbsp;</font></td>".
										"   <td nowrap='nowrap' style='{font-size:10;}' align='right'><font size='1' color='#ffffff'>&nbsp;". 
														number_format($saldo, 2, ',', '.')."&nbsp;</font></td>".
										"</tr>";															
						}else
							return "Total SQL :" . $dbLib->db->ErrorMsg() . "\r\n : SQL : " . $sql . $filter;		
							
						$html .= "</table><br><br>";			
					}else
						return "Detail SQL :" . $dbLib->db->ErrorMsg() . "\r\n : SQL : " . $sql . $filter;													
				}				
			}
			$html .= "<br>".
					"<label>Page : $this->page</label>"	;
		}else 
			$html = "Akun SQL :" . $dbLib->db->ErrorMsg();
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
		return $pdf->createPdf($html, "L", "mm", "A4", 100, 7, 3);		
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
//		ob_end_clean();
		return $save;
	}
	function createCSV()
	{
		$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";
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