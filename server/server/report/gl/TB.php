<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
class server_report_GL_TB
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
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
		$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";
		$start = (($this->page-1) * $this->rows);
		//$sql .= " limit ". $start . "," . $this->rows;
		
		$html = "<label style='{font-size:20px;}'><b>Trial Balance</b></label><br>"; 		
		$html .= "<label style='{font-size:12px}'>$this->lokasi</label><br>"; 					
		$html .= "<label style='{font-size:10px}'>$this->showFilter</label></br></br>"; 					
		$html .= "<table width='900' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000'>".				
				"   <tr bgcolor='#666666' style='{font-size:13;color:#ffffff;}'>".	
				"   <th class = 'judul_laporan' width='30' nowrap='nowrap' scope='col'><font color='#ffffff'>No</font></th>".	
				"   <th class = 'judul_laporan' width='70' nowrap='nowrap' scope='col'><font color='#ffffff'>Akun</font></th>".	
				"   <th class = 'judul_laporan' width='400' nowrap='nowrap' scope='col'><font color='#ffffff'>Nama Akun</font></th>".
				"   <th class = 'judul_laporan' width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Saldo Awal</font></th>".
				"   <th class = 'judul_laporan' width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Debet</font></th>".
				"   <th class = 'judul_laporan' width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Kredit</font></th>".
				"   <th class = 'judul_laporan' width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Saldo Akhir</font></th>".
				"  </tr>";
		global $dbLib;
		$rs = $dbLib->execute($sql);		
		$i = $start + 1;

		if (!$rs)
		{
			$html .= "<tr>".
						"   <th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\" ><font color='#ffffff'>$i</font></th>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						"</tr>";
		}else
			while (!$rs->EOF)
			{
				$html .= "<tr>".
						"   <th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\" ><font color='#ffffff'>$i</font></th>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[0]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[1]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($rs->fields[2], 2, ',', '.')."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($rs->fields[3], 2, ',', '.')."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($rs->fields[4], 2, ',', '.')."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($rs->fields[5], 2, ',', '.')."&nbsp;</td>".
						"</tr>";
				$rs->MoveNext();
				$i++;	
			}
		$sql = "select sum(a.so_awal) as sawal, sum(a.debet)as debet, sum(a.kredit) as kredit, sum(a.so_akhir)as sakhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter;
		$rs = $dbLib->execute($sql);		
		if ($rs)
		{
			!$rs->EOF;
			$html .= "<tr bgcolor='#206A86' style='{font-size:10;color:#ffffff;}'>".
					"   <th bgcolor='#666666' style='{font-size:10;}' scope=\"row\"></th>".
					"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
					"   <td nowrap='nowrap' style='{font-size:10;}'><font color='#ffffff'>Total</font></td>".
					"   <td nowrap='nowrap' style='{font-size:10;}' align='right'><font color='#ffffff'>&nbsp;". 
								number_format($rs->fields[0], 2, ',', '.')."&nbsp;</font></td>".
					"   <td nowrap='nowrap' style='{font-size:10;}' align='right'><font color='#ffffff'>&nbsp;". 
								number_format($rs->fields[1], 2, ',', '.')."&nbsp;</font></td>".
					"   <td nowrap='nowrap' style='{font-size:10;}' align='right'><font color='#ffffff'>&nbsp;". 
								number_format($rs->fields[2], 2, ',', '.')."&nbsp;</font></td>".
					"   <td nowrap='nowrap' style='{font-size:10;}' align='right'><font color='#ffffff'>&nbsp;". 
								number_format($rs->fields[3], 2, ',', '.')."&nbsp;</font></td>".
					"</tr>";
		}		
		$html .= "</table>";
		$html .= "<br>";
//				"<label>Page : $this->page</label>"	;
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
//		ob_end_clean();
//		error_log("server/tmp/$name");
		return "server/tmp/$name";
/*		
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=TB.xls");
		header ("Content-Description: PHP/INTERBASE Generated Data" );
		readfile($save);
		unlink($save);
*/
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