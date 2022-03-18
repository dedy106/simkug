<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptDroping
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
		global $dbLib;
		$sql="select count(a.no_pj)
from panjar_m a
inner join karyawan d on a.nik_pengaju=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi ".$this->filter;
		error_log($sql);
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($this->rows."/".$count."/".$totPage);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$sql="select a.no_alok,a.kode_lokasi,a.lok_tujuan,a.akun_tak,a.periode,a.nik_app,a.nik_buat,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,a.nilaix,
       c.nama as nama_akun,d.nama as nama_buat,e.nama as nama_app,b.nama as nama_lokasi
from alokasi_m a
inner join lokasi b on a.lok_tujuan=b.kode_lokasi
inner join masakun c on a.akun_tak=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_app=e.nik and a.kode_lokasi=e.kode_lokasi ".$this->filter." order by a.no_alok";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row->nilai,0,",",".");
			$nilaix=number_format($row->nilaix,0,",",".");
			$total=number_format($row->nilai+$row->nilaix,0,",",".");
			$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='8' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td colspan='2' class='judul_bukti' align='center'>ALOKASI DROPING</td>
        </tr>
		 <tr>
        <td class='header_laporan'>Kode Lokasi </td>
        <td class='header_laporan'>:&nbsp;$row->kode_lokasi</td>
      </tr>
		<tr>
        <td class='header_laporan'>Periode</td>
        <td class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
		
      <tr>
        <td width='120' class='header_laporan'>No Alokasi </td>
        <td width='476' class='header_laporan'>:&nbsp;$row->no_alok</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
     <tr>
        <td class='header_laporan'>Lokasi Tujuan </td>
        <td class='header_laporan'>:&nbsp;$row->lok_tujuan -&nbsp;$row->nama_lokasi</td>
        </tr>
		<tr>
        <td class='header_laporan'>Akun Mutasi</td>
        <td class='header_laporan'>:&nbsp;$row->akun_tak -&nbsp;$row->nama_akun</td>
        </tr>
		<tr>
        <td class='header_laporan'>Diajukan Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp;$row->nama_buat</td>
        </tr>
		<tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_app -&nbsp;$row->nama_app</td>
        </tr>
		<tr>
        <td class='header_laporan'>Total Droping Investasi</td>
        <td class='header_laporan'>:&nbsp;$nilai</td>
        </tr>
		<tr>
        <td class='header_laporan'>Total Droping Exploitasi</td>
        <td class='header_laporan'>:&nbsp;$nilaix</td>
        </tr>
		<tr>
        <td class='header_laporan'>Total Droping</td>
        <td class='header_laporan'>:&nbsp;$total </td>
        </tr>
    </table></td>
  </tr>
 </table><br>";
			
			$i=$i+1;
		}
		
		
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
		$sql = "select * from glma_tmp ".$this->filter." order by kode_akun ";		global $dbLib;
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
