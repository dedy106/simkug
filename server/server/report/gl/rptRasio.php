<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_gl_rptRasio
{
	protected $caption;
	protected $filter;
	protected $filter2;
	
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $sql;
	function getTotalPage()
	{
		global $dbLib;
		$sql = "select 1 ";
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
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		
	    $this->sql = "select kode_rasio,fn_spasi(nama,level_spasi) as nama,rumus2,tipe from rasio_tmp where nik_user='$nik_user' order by rowindex";
		error_log($this->sql);
		$rs = $dbLib->execute($this->sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan rasio keuangan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='300' class='header_laporan'><div align='center'>Deskripsi</div></td>
    <td width='100' class='header_laporan'><div align='center'>Nilai</div></td>
</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai1="";
			$nilai2="";
			if ($row->tipe=="Posting" && $row->rumus2 != "")
			{
				$rumus='$nilai= ' . $row->rumus2 .';';
				eval($rumus);
				$nilai1=number_format(abs($nilai),2,",",".");
			}
			
			$html.="<tr>
    <td valign='middle' class='isi_laporan'>$row->nama</td>
     <td valign='middle' class='isi_laporan'><div align='right'>$nilai1</div></td>
   </tr>";
			$i=$i+1;
		}
		
		$html.="</table>";
		
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
		global $dbLib;
		$rs = $dbLib->execute($this->sql);
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
