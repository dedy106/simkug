<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_KlpEmiten
{
	protected $caption;
	protected $filter;
	protected $filter2;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function getTotalPage()
	{
		//$sql = "select count(*) from glma a ".
		//		" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter;
		$sql="select count(*) from klp_emiten ".$this->filter;
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
		/*$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";*/
		$sql = "select * from klp_emiten ".$this->filter." order by klp_emiten";
		$start = (($this->page-1) * $this->rows);
		//$sql .= " limit ". $start . "," . $this->rows;
		
		$html = "<label style='{font-size:20px;}'><b>Data Kelompok Emiten</b></label><br>"; 		
		//$html .= "<label style='{font-size:12px}'>$this->lokasi</label><br>"; 					
		$html .= "<label style='{font-size:14px}'>$this->showFilter</label></br></br>"; 					
		$html .= "<table width='400' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000'>".				
				"  <tr bgcolor='#666666' style='{font-size:13;color:#ffffff;}'>".	
				"   <th width='30' nowrap='nowrap' scope='col'><font color='#ffffff'>No</font></th>".	
				"   <th width='70' nowrap='nowrap' scope='col'><font color='#ffffff'>Kode</font></th>".	
				"   <th width='250' nowrap='nowrap' scope='col'><font color='#ffffff'>Nama</font></th>".
				//"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>tes</font></th>".
				//"   <th width='150' nowrap='nowrap' scope='col'><font color='#ffffff'>Akun ar Bunga</font></th>".
				//"   <th width='150' nowrap='nowrap' scope='col'><font color='#ffffff'>Akun Pendapatan Bunga</font></th>".
				//"   <th width='150' nowrap='nowrap' scope='col'><font color='#ffffff'>Unit</font></th>".
				"  </tr>";
		global $dbLib;
		//$rs = $dbLib->execute($sql);		
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
    $i = $start + 1;

		if (!$rs)
		{
			$html .= "<tr>".
						"   <th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\" ><font color='#ffffff'>$i</font></th>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						//"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						//"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						//"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						//"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;&nbsp;</td>".
						"</tr>";
		}else
			while (!$rs->EOF)
			{
			  
        $html .= "<tr>".
						"   <th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\" ><font color='#ffffff'>$i</font></th>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[0]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[1]."&nbsp;</td>".
						//"   <td heigth='25' nowrap='nowrap' style='{font-size:10;}'>&nbsp;Coba&nbsp;</td>".
						//"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". $rs->fields[3]."&nbsp;</td>".
						//"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". $rs->fields[4]."&nbsp;</td>".
						//"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". $rs->fields[5]."&nbsp;</td>".
						"</tr>";
       
				$rs->MoveNext();
				$i++;	
			}
		/*$sql = "select sum(a.so_awal) as sawal, sum(a.debet)as debet, sum(a.kredit) as kredit, sum(a.so_akhir)as sakhir from glma a ".
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
		}		*/
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
//		return "server/tmp/$name";
		
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=produk.xls");
		header ("Content-Description: PHP/INTERBASE Generated Data" );
		readfile($save);
		unlink($save);
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
	function setFilter2($filter)
	{
		$this->filter2 = $filter;
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
