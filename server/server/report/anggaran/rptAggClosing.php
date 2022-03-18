<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_anggaran_rptAggClosing
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
		$sql="select count(a.no_close)
from closeagg_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
".$this->filter." ";
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
		$sql="select a.tahun,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_close,a.kode_lokasi,a.no_dokumen,a.keterangan,a.nik_buat,b.nama as nama_buat,a.nik_app,c.nama as nama_app
from closeagg_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_app=c.nik and a.kode_lokasi=c.kode_lokasi
".$this->filter." order by a.no_close";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='6' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='110' class='header_laporan'>Tahun Anggaran</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->tahun</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Bukti </td>
        <td class='header_laporan'>:&nbsp;$row->no_close</td>
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
        <td class='header_laporan'>Dibuat Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp; $row->nama_buat </td>
      </tr>
      <tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_setuju -&nbsp; $row->nama_setuju</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='100' align='center' class='header_laporan'>No Bukti</td>
    <td width='100' align='center' class='header_laporan'>No Dokumen </td>
    <td width='70' align='center' class='header_laporan'>Tanggal</td>
    <td width='250' align='center' class='header_laporan'>Keterangan </td>
    <td width='100' align='center' class='header_laporan'>Nilai</td>
  </tr>";
	  $sql1="select a.no_bukti,b.no_agg,b.no_dokumen,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.keterangan," .
		"ifnull(c.nilai,0) as nilai from closeagg_d a ". 
		" inner join anggaran_m b on a.no_bukti=b.no_agg and a.kode_lokasi=b.kode_lokasi ".
		" left join (select no_agg,kode_lokasi,sum(nilai) as nilai from anggaran_d        ".
		"			 where kode_lokasi='$row->kode_lokasi'  ".
		" 			 group by no_agg,kode_lokasi) c on a.no_bukti=c.no_agg and a.kode_lokasi=c.kode_lokasi ".
		" where a.no_close='". $row->no_close."' and a.kode_lokasi='".$row->kode_lokasi."' order by a.no_bukti ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$vol=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
			{
				$nilai=number_format($row1->nilai,0,",",".");
				$tot=$tot+$row1->nilai;
				$html.="<tr>
<td class='isi_laporan' align='center'>$i</td>
<td class='isi_laporan'>$row1->no_bukti</td>
<td class='isi_laporan'>$row1->no_dokumen</td>
<td class='isi_laporan'>$row1->tanggal</td>
<td class='isi_laporan'>$row1->keterangan</td>
<td class='isi_laporan' align='right'>$nilai</td>
</tr>";
			$i=$i+1;
			}
		$tot=number_format($tot,0,",",".");
		
	  $html.=" <tr>
    <td colspan='5' class='header_laporan' align='right'>Total</td>
    <td class='header_laporan' align='right'>$tot</td>
  </tr></table><br>";
			
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
