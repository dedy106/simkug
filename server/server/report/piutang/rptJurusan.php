<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptJurusan
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
		
		$sql = "select count(*) from jurusan j inner join pp p on j.kode_proyek=p.kode_pp ".
				"inner join lokasi l on j.kode_lokasi=l.kode_lokasi and p.kode_lokasi=l.kode_lokasi ".$this->filter;
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
		$sql = "select j.kode_jur,j.nama_jur,j.kode_proyek,j.kode_lokasi,p.nama as nmpp,l.nama as nmlokasi ".
				"from jurusan j inner join pp p on j.kode_proyek=p.kode_pp ".
                "inner join lokasi l on j.kode_lokasi=l.kode_lokasi and p.kode_lokasi=l.kode_lokasi ".$this->filter.
				" order by j.kode_jur,j.kode_lokasi ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		//error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Jurusan",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center' >";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>Kode</div></td>
				<td class='header_laporan'><div align='center'>Jurusan</div></td>
				<td class='header_laporan'><div align='center'>Kode PP</div></td>
				<td class='header_laporan'><div align='center'>Nama PP</div></td>
				<td class='header_laporan'><div align='center'>Kode Lokasi</div></td>
				<td class='header_laporan'><div align='center'>Nama Lokasi</div></td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
				    <td height='20' class='isi_laporan'>".$i."</td>
					<td class='isi_laporan'>".$row->kode_jur."</td>
				    <td class='isi_laporan'>".$row->nama_jur."</td>
					<td class='isi_laporan'>".$row->kode_proyek."</td>
					<td class='isi_laporan'>".$row->nmpp."</td>
					<td class='isi_laporan'>".$row->kode_lokasi."</td>
					<td class='isi_laporan'>".$row->nmlokasi."</td>
				  </tr>";			
			$i++;
		}
		$html.="</table>";
		$html.="</div>";
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
