<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_logistik_rptTr
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
		$sql="select a.no_tr,a.periode,a.tanggal,a.kode_lokasi,a.keterangan,a.no_dokumen,a.no_po,a.nik_terima,b.nama as nama_terima,c.kode_vendor,d.nama as nama_vendor
from tr_m a
inner join karyawan b on a.nik_terima=b.nik and a.kode_lokasi=b.kode_lokasi
inner join po_m c on a.no_po=c.no_po and a.kode_lokasi=c.kode_lokasi
inner join vendor d on c.kode_vendor=d.kode_vendor and c.kode_lokasi=d.kode_lokasi ".$this->filter." order by a.no_tr";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan temporary receive",$this->lokasi,$AddOnLib->ubah_periode($periode));
		error_log("aaaa");
		$html.="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='8' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
      <tr>
        <td class='header_laporan'>No TR </td>
        <td class='header_laporan'>:&nbsp;$row->no_tr</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
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
        <td class='header_laporan'>Penerima </td>
        <td class='header_laporan'>:&nbsp;$row->nik_terima -&nbsp; $row->nama_terima</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='70' align='center' class='header_laporan'>Kode</td>
    <td width='200' align='center' class='header_laporan'>Nama Barang </td>
    <td width='60' align='center' class='header_laporan'>Satuan </td>
    <td width='100' align='center' class='header_laporan'>Merk </td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='100' align='center' class='header_laporan'>No Seri </td>
    <td width='100' align='center' class='header_laporan'>No Temp </td>
  </tr>";
  
	  $sql1="select a.kode_brg,b.nama as nama_brg,a.kode_sat,a.merk,a.tipe,a.no_seri,a.no_tag
from tr_d a
inner join barang_m b on a.kode_brg=b.kode_brg and a.kode_lokasi=b.kode_lokasi
where a.no_tr='$row->no_tr' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_brg ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$vol=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->kode_brg</td>
    <td class='isi_laporan'>$row1->nama_brg</td>
    <td class='isi_laporan'>$row1->kode_sat</td>
	<td class='isi_laporan'>$row1->merk</td>
    <td class='isi_laporan'>$row1->tipe</td>
    <td class='isi_laporan'>$row1->no_seri</td>
	<td class='isi_laporan'>$row1->no_tag</td>
  </tr>";
		$i=$i+1;
		}
		
	  $html.=" </table><br>";
			
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
