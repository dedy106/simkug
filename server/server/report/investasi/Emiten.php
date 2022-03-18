<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_Emiten
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
		$sql="select count(*) from emiten ".$this->filter;
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
		$sql = "select * from emiten ".$this->filter." order by kode_emiten";
		$start = (($this->page-1) * $this->rows);
		//$sql .= " limit ". $start . "," . $this->rows;
		
		$html = "<label style='{font-size:20px;}'><b>Data Cabang/Emiten</b></label><br>"; 		
		//$html .= "<label style='{font-size:12px}'>$this->lokasi</label><br>"; 					
		$html .= "<label style='{font-size:14px}'>$this->showFilter</label></br></br>"; 					
		$html .= "<table width='2000' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000'>".				
				"  <tr bgcolor='#666666' style='{font-size:13;color:#ffffff;}'>".	
				"   <th width='30' nowrap='nowrap' scope='col'><font color='#ffffff'>No</font></th>".	
				"   <th width='50' nowrap='nowrap' scope='col'><font color='#ffffff'>Kode</font></th>".	
				"   <th width='150' nowrap='nowrap' scope='col'><font color='#ffffff'>Nama</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Cabang</font></th>".
				"   <th width='50' nowrap='nowrap' scope='col'><font color='#ffffff'>Status</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Atas Nama</font></th>".
        "   <th width='200' nowrap='nowrap' scope='col'><font color='#ffffff'>Alamat</font></th>".
        "   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Kota</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Negara</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Kode Pos</font></th>".	
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>No. Telepon</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>No. Faximile</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>No. Telex</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>e-mail</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Website</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>PIC</font></th>".
        "   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Jabatan</font></th>".
        "   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>no. Tlp PIC</font></th>".				
				"   <th width='50' nowrap='nowrap' scope='col'><font color='#ffffff'>Kode Perusahaan</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Kode Sub Bidang</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Rekening</font></th>".
				"   <th width='50' nowrap='nowrap' scope='col'><font color='#ffffff'>Hari</font></th>".
				"   <th width='50' nowrap='nowrap' scope='col'><font color='#ffffff'>Batas</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Tanggal Laporan</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Akun Deposito</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Akun Pendapatan</font></th>".
				"   <th width='100' nowrap='nowrap' scope='col'><font color='#ffffff'>Akun Piutang</font></th>".
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
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
            "   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
            "   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".						
            "   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
            "   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;&nbsp;</td>".
            "</tr>";
		}else
			while (!$rs->EOF)
			{
				$html .= "<tr>".
						"   <th bgcolor='#666666' style='{font-size:10;color:#ffffff;}' scope=\"row\" ><font color='#ffffff'>$i</font></th>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[0]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[1]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[23]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[25]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[24]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[2]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[3]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[4]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[5]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[6]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[7]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[8]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[9]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[10]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[11]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[18]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[22]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[12]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[13]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[14]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[15]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[16]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[17]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[19]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[20]."&nbsp;</td>".
            "   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[21]."&nbsp;</td>".						
						"</tr>";
				$rs->MoveNext();
				$i++;	
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
