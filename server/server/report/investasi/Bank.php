<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_Bank
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
		$sql="select count(*) from bank ".$this->filter;
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
		$sql = "select * from bank ".$this->filter." order by kode_bank";
		$start = (($this->page-1) * $this->rows);
		//$sql .= " limit ". $start . "," . $this->rows;
		
		$html = "<label style='{font-size:20px;}'><b>Data Perusahaan</b></label><br>"; 		
		//$html .= "<label style='{font-size:12px}'>$this->lokasi</label><br>"; 					
		$html .= "<label style='{font-size:14px}'>$this->showFilter</label></br></br>"; 					
		$html .= "<table  width='2500' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000'>".				
				"  <tr bgcolor='#cccccc' style='{font-size:13;color:#ffffff;}'>".	
				"   <th class='judul_laporan' width='30' nowrap='nowrap' scope='col'>No</th>".	
				"   <th class='judul_laporan' width='55' nowrap='nowrap' scope='col'>Kode</th>".	
				"   <th class='judul_laporan' width='150' nowrap='nowrap' scope='col'>Nama</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Cabang</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Atas Nama</th>".
				"   <th class='judul_laporan' width='110' nowrap='nowrap' scope='col'>No. Rekening</th>".
				"   <th class='judul_laporan' width='200' nowrap='nowrap' scope='col'>Alamat</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Kota</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Negara</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Kode Pos</th>".	
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>No. Telepon</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>No. Faximile</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>No. Telex</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>e-mail</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Website</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>PIC</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Jabatan</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Status Bank</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Maksimum Deposito</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Komposisi</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>CAR</th>".	
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Modal</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Total Asset</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>PER</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Kapitalisasi</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Jumlah Saham</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>Predikat</th>".	
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>NIM</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>BO_PO</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>PPAP</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>LDR</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>ROE</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>ROA</th>".
				"   <th class='judul_laporan' width='100' nowrap='nowrap' scope='col'>NPL</th>".
				"  </tr>";
		global $dbLib;
		//$rs = $dbLib->execute($sql);		
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
    $i = $start + 1;

		if (!$rs)
		{
			$html .= "<tr>".
						"   <th bgcolor='#cccccc' class='judul_laporan' scope=\"row\" >$i</th>".
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
						"   <th bgcolor='#cccccc' class='judul_laporan' scope=\"row\" >$i</th>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[0]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[1]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[12]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[13]."&nbsp;</td>".
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
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[28]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[29]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[31]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[30]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[32]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[14]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($rs->fields[15],0,",",".")."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}' align='right'>&nbsp;". number_format($rs->fields[16],0,",",".")."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[17]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[18]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[19]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[20]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[21]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[22]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[23]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[24]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[25]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[26]."&nbsp;</td>".
						"   <td nowrap='nowrap' style='{font-size:10;}'>&nbsp;". $rs->fields[27]."&nbsp;</td>".
						"</tr>";
				$rs->MoveNext();
				$i++;	
			}
		
		$html .= "</table>";
		$html .= "<br>";
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
