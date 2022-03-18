<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptFSCustom
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
		
		$sql = "select count(kode_fs) from fs ".$this->filter;
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
		global $dbLib;
		$sql = "select kode_fs,kode_lokasi,nama,date_format(tgl_awal,'%e/%m/%y') as tglawal,date_format(tgl_akhir,'%e/%m/%y') as tglakhir,date_format(tgl_input,'%e/%m/%y') as tglinput from fs ".$this->filter." order by kode_lokasi ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		//error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Finansial Statement Custom",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='60' height='23' class='header_laporan'><div align='center'>Kode FS</div></td>
				<td width='60' class='header_laporan'><div align='center'>Kode Lokasi</div></td>
				<td width='60' class='header_laporan'><div align='center'>Nama</div></td>
				<td width='60' class='header_laporan'><div align='center'>Tgl Awal</div></td>
				<td width='60' class='header_laporan'><div align='center'>Tgl Akhir</div></td>
				<td width='60' class='header_laporan'><div align='center'>Tgl Input</div></td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
				    <td height='20' class='isi_laporan'>".$row->kode_fs."</td>
				    <td class='isi_laporan'>".$row->kode_lokasi."</td>
					<td class='isi_laporan'>".$row->nama."</td>
					<td class='isi_laporan'>".$row->tglawal."</td>
					<td class='isi_laporan'>".$row->tglakhir."</td>
					<td class='isi_laporan'>".$row->tglinput."</td>
				  </tr>";
			
			$i=$i+1;
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
