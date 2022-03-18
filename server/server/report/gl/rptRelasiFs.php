<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptRelasiFs
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
		
		$sql = "select count(a.kode_neraca)
from neraca a
cross join lokasi b ".$this->filter;
		error_log($sql);
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
		$sql = "select a.kode_neraca,a.nama,a.tipe,b.kode_lokasi,a.modul,a.kode_fs
from neraca a
cross join lokasi b ".$this->filter." order by a.rowindex ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan relasi master akun",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<table border='1' cellspacing='0' cellpadding='0' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td width='60' class='header_laporan'>".$row->kode_neraca."</td>
    <td width='680' colspan='7' class='header_laporan'>".$row->nama."</td>
  </tr>
";
			if ($row->tipe=="Posting")
			{
				$sql2="select a.kode_akun,a.nama,a.modul,a.jenis,a.kode_curr,a.block,a.akun_konsol,a.kode_flag
from masakun a
inner join relakun b on a.kode_akun=b.kode_akun
inner join neraca c on b.kode_neraca=c.kode_neraca
where b.kode_neraca='".$row->kode_neraca."' and b.kode_lokasi='".$row->kode_lokasi."' and c.modul='".$row->modul."' and b.kode_fs='".$row->kode_fs."' order by a.kode_akun ";
				error_log($sql2);
				$rs2=$dbLib->LimitQuery($sql2,10000,0);	
				$html.="<tr bgcolor='#CCCCCC'>
    
    <td width='60' class='header_laporan'><div align='center'>Kode</div></td>
    <td width='250' class='header_laporan'><div align='center'>Nama</div></td>
    <td width='50' class='header_laporan'><div align='center'>Modul</div></td>
    <td width='70' class='header_laporan'><div align='center'>Jenis</div></td>
    <td width='50' class='header_laporan'><div align='center'>Curr</div></td>
    <td width='50' class='header_laporan'><div align='center'>Block</div></td>
    <td width='100' class='header_laporan'><div align='center'>Akun Konsolidasi</div></td>
    <td width='50' class='header_laporan'><div align='center'>Flag</div></td>
  </tr>";
				while ($row2 = $rs2->FetchNextObject($toupper=false))
				{
					$html.="<tr>
<td class='isi_laporan'>".$row2->kode_akun."</td>
<td class='isi_laporan'>".$row2->nama."</td>
<td class='isi_laporan'><div align='center'>".$row2->modul."</div></td>
<td class='isi_laporan'>".$row2->jenis."</td>
<td class='isi_laporan'>".$row->kode_curr."</td>
<td class='isi_laporan'><div align='center'>".$row2->block."</div></td>
<td class='isi_laporan'>".$row2->akun_konsol."</td>
<td class='isi_laporan'>".$row2->kode_flag."</td>
  </tr>
";
					
				}
			}
			$html.="</table>";
			
			$i=$i+1;
		}
	
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
