<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_anggaran_rptAggDis
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
		$sql="select count(a.no_agg)
from anggaran_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
".$this->filter." and a.jenis='DIST' ";
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
		$sql="select a.tahun,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_agg,a.kode_lokasi,a.no_dokumen,a.keterangan,a.nik_buat,b.nama as nama_buat,a.nik_setuju,c.nama as nama_setuju
from anggaran_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
".$this->filter." and a.jenis='DIST' order by a.no_agg";
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
    <td colspan='10' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	<tr>
        <td colspan='2' class='judul_bukti' align='center'>ANGGARAN RELOKASI</td>
        </tr>
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
        <td class='header_laporan'>:&nbsp;$row->no_agg</td>
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
    <td width='150' align='center' class='header_laporan'>Akun Asal </td>
    <td width='150' align='center' class='header_laporan'>Dept Asal </td>
    <td width='150' align='center' class='header_laporan'>RKM Asal </td>
    <td width='60' align='center' class='header_laporan'>Bulan Asal</td>
    <td width='150' align='center' class='header_laporan'>Akun Tujuan</td>
    <td width='150' align='center' class='header_laporan'>Dept Tujuan </td>
    <td width='150' align='center' class='header_laporan'>RKM Tujuan</td>
<td width='50' align='center' class='header_laporan'> Bulan Tujuan</td>
<td width='100' align='center' class='header_laporan'>Nilai</td>
  </tr>";
	  $sql1="select a.kode_akun1,a.kode_pp1,a.kode_drk1,a.periode1,a.periode2,a.nilai,
       a.kode_akun2,a.kode_pp2,a.kode_drk2,
       b.nama as nama_akun1,c.nama as nama_pp1,d.nama as nama_drk1,
       e.nama as nama_akun2,f.nama as nama_pp2,g.nama as nama_drk2
from anggdist_d a
inner join masakun b on a.kode_akun1=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp1=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk1=d.kode_drk and a.kode_lokasi=d.kode_lokasi
inner join masakun e on a.kode_akun2=e.kode_akun and a.kode_lokasi=e.kode_lokasi
inner join pp f on a.kode_pp2=f.kode_pp and a.kode_lokasi=f.kode_lokasi
inner join drk g on a.kode_drk2=g.kode_drk and a.kode_lokasi=g.kode_lokasi 
where a.no_agg='$row->no_agg' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_akun1 ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$vol=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row1->nilai,0,",",".");
			$tot=$tot+=$row1->nilai;
			$html.="<tr>
    <td align='center' class='isi_laporan'>$i</td>
    <td class='isi_laporan'>$row1->kode_akun1 - $row1->nama_akun1</td>
    <td class='isi_laporan'>$row1->kode_pp1 - $row1->nama_pp1</td>
    <td class='isi_laporan'>$row1->kode_drk1 - $row1->nama_drk1</td>
    <td align='center' class='isi_laporan'>$row1->periode1</td>
    <td class='isi_laporan'>$row1->kode_akun2 - $row1->nama_akun2</td>
    <td class='isi_laporan'>$row1->kode_pp2 - $row1->nama_akun2</td>
    <td class='isi_laporan'>$row1->kode_drk2 - $row1->nama_drk2</td>
    <td align='center' class='isi_laporan'>$row1->periode2</td>
    <td align='right' class='isi_laporan'>$nilai</td>
  </tr>";
		$i=$i+1;
		}
		$tot=number_format($tot,0,",",".");
		
	  $html.=" <tr>
    <td colspan='9' align='right' class='header_laporan'>Total</td>
    <td align='right' class='header_laporan'>$tot</td>
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
