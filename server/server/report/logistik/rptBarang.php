<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_logistik_rptBarang
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
		
		$sql = "select count(a.kode_brg)
from barang_m a
inner join barang_klp b on a.kode_klpbrg=b.kode_klpbrg and a.kode_lokasi=b.kode_lokasi ".$this->filter;
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
		$sql = "select a.kode_lokasi,a.kode_brg,a.kode_klpbrg,a.nama,a.kode_sat,a.kode_curr,a.kode_lokasi,a.merk,a.tipe,a.harga_ref,b.nama as nama_klp
from barang_m a
inner join barang_klp b on a.kode_klpbrg=b.kode_klpbrg and a.kode_lokasi=b.kode_lokasi ".$this->filter.
				" order by a.kode_brg ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan barang",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='40' height='23' class='header_laporan' align='center'>Lokasi</td>
				<td width='50' class='header_laporan' align='center'>Kode Klp</td>
				<td width='150' class='header_laporan' align='center'>nama Klp</td>
				<td width='60' class='header_laporan' align='center'>Kode Barang</td>
				<td width='200' class='header_laporan' align='center'>Nama Barang</td>
				<td width='60' class='header_laporan' align='center'>Satuan</td>
				<td width='40' class='header_laporan' align='center'>Curr</td>
				<td width='80' class='header_laporan' align='center'>Merk</td>
				<td width='70' class='header_laporan' align='center'>Tipe</td>
				<td width='80' class='header_laporan' align='center'>Harga</td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
					<td class='isi_laporan'>".$row->kode_lokasi."</td>
				    <td height='20' class='isi_laporan'>".$row->kode_klpbrg."</td>
				    <td class='isi_laporan'>".$row->nama_klp."</td>
					<td class='isi_laporan'>".$row->kode_brg."</td>
					<td class='isi_laporan'>".$row->nama."</td>
					<td class='isi_laporan'>".$row->kode_sat."</td>
					<td class='isi_laporan'>".$row->kode_curr."</td>
					<td class='isi_laporan'>".$row->merk."</td>
					<td class='isi_laporan'>".$row->tipe."</td>
					<td class='isi_laporan' align='right'>".number_format($row->harga_ref,0,',','.')."</td>
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
