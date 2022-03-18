<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_anggaran_rptDrk
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$sql = "select count(*) from drk ".$this->filter;
		
		$rs = $dbLib->execute($sql);		
		//error_log($sql);
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
		global $dbLib;
		$sql = "select kode_drk,tahun,nama,block from drk ".$this->filter.
			   " order by kode_lokasi,kode_drk,tahun ";
				
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);

		//error_log($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan DRK",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>    
				<td width='80' class='header_laporan'><div align='center'>Kode RKM </div></td>
				<td width='400' class='header_laporan'><div align='center'>Nama</div></td>
				<td width='80' class='header_laporan'><div align='center'>Tahun</div></td>
				<td width='50' class='header_laporan'><div align='center'>Block</div></td>
				</tr>";		

		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<tr>
					 <td height='20' class='isi_laporan'>".$row->kode_drk."</td>
					 <td class='isi_laporan'>".$row->nama."</td>
					 <td class='isi_laporan' align='center'>".$row->tahun."</td>
					 <td class='isi_laporan' align='center'>".$row->block."</td>
					</tr>";
		}
		$html.="</table>";
		
		$html = str_replace(chr(9),"",$html);
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
		return "server/tmp/$name";
	}
	function createCSV()
	{
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
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
