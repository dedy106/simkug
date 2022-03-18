<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_logistik_rptPo
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
		$sql="select count(a.no_po) from po_m a ".$this->filter;
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
		$sql="select a.kode_lokasi,a.periode,a.tanggal,a.no_po,a.no_dokumen,a.tgl_mulai,a.tgl_selesai,a.keterangan,a.kode_vendor,b.nama as nama_vendor,a.nik_pnj,c.nama as nama_pnj
from po_m a
inner join vendor b on a.kode_vendor=b.kode_vendor and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_pnj=c.nik and a.kode_lokasi=c.kode_lokasi ".$this->filter." order by a.no_po";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan purchase order",$this->lokasi,$AddOnLib->ubah_periode($periode));
		error_log("aaaa");
		$html.="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='6' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
      <tr>
        <td class='header_laporan'>No PO </td>
        <td class='header_laporan'>:&nbsp;$row->no_po</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal Mulai </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_mulai </td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal Selesai </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_selesai</td>
      </tr>
      <tr>
        <td class='header_laporan'>Deskripsi</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Vendor</td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor -&nbsp; $row->nama_vendor</td>
      </tr>
      <tr>
        <td class='header_laporan'>Penanggung Jawab </td>
        <td class='header_laporan'>:&nbsp;$row->nik_pnj -&nbsp; $row->nama_pnj</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='70' align='center' class='header_laporan'>Kode</td>
    <td width='200' align='center' class='header_laporan'>Nama Barang </td>
    <td width='60' align='center' class='header_laporan'>Satuan </td>
    <td width='60' align='center' class='header_laporan'>Jumlah</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    
  </tr>";
  
	  $sql1="select a.kode_brg,b.nama as nama_brg,a.kode_sat,a.jumlah,a.nilai
from po_d a
inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_po='$row->no_po' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_brg ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$vol=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$jumlah=number_format($row1->jumlah,0,",",".");
			$nilai=number_format($row1->nilai,0,",",".");
			$tot=$tot+$row1->nilai;
			$vol=$vol+$row1->jumlah;
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->kode_brg</td>
    <td class='isi_laporan'>$row1->nama_brg</td>
    <td class='isi_laporan'>$row1->kode_sat</td>
	<td class='isi_laporan' align='right'>$jumlah</td>
    <td class='isi_laporan' align='right'>$nilai</td>
  </tr>";
		$i=$i+1;
		}
		$tot=number_format($tot,0,",",".");
		$vol=number_format($vol,0,",",".");
	  $html.=" <tr>
    <td colspan='4' class='header_laporan' align='right'>Total</td>
    <td class='header_laporan' align='right'>$vol</td>
    <td class='header_laporan' align='right'>$tot</td>
  </tr></table><br>";
			
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
