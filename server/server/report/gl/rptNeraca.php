<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_gl_rptNeraca
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
		$periode=$tmp[1];
	    $this->sql = "select nama1,tipe1,nilai1,level_spasi1,nama2,tipe2,nilai2,level_spasi2 from neraca_skontro where nik_user='$nik_user' order by rowindex ";
		error_log($this->sql);
		$rs = $dbLib->execute($this->sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan neraca",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$html.="<div align='center'><table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr bgcolor='#CCCCCC'>
    <td width='340'  class='header_laporan' align='center'>Deskripsi</td>
    <td width='100' class='header_laporan' align='center'>Jumlah</td>
<td width='340' height='25'  class='header_laporan' align='center'>Deskripsi</td>
<td width='100' class='header_laporan' align='center'>Jumlah</td>
  </tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai1="";
			$nilai2="";
			if ($row->tipe1!="Header" && $row->nama1!="." && $row->nama1!="")
			{
				$nilai1=number_format($row->nilai1,0,",",".");
			}
			if ($row->tipe2!="Header" && $row->nama2!="." && $row->nama2!="")
			{ 
				$nilai2=number_format($row->nilai2,0,",",".");
			}
			$html.="<tr>
    <td valign='middle' class='isi_laporan' >".$AddOnLib->spasi($row->nama1,$row->level_spasi1)."</td>
     <td valign='middle' class='isi_laporan' align='right'>$nilai1</td>
    <td height='20' valign='middle' class='isi_laporan'>".$AddOnLib->spasi($row->nama2,$row->level_spasi2)."</td>
    <td valign='middle' class='isi_laporan' align='right'>$nilai2</td>
  </tr>";
			$i=$i+1;
		}
		
		$html.="</table></div>";
		
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
