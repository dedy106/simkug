<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_anggaran_rptAggAbt
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
".$this->filter." and a.jenis='ABT' ";
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
".$this->filter." and a.jenis='ABT' order by a.no_agg";
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
    <td colspan='12' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
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
  <tr>
    <td width='20' class='header_laporan'><div align='center'>No</div></td>
    <td width='50' class='header_laporan'><div align='center'>Akun</div></td>
    <td width='180' class='header_laporan'><div align='center'>Nama Akun </div></td>
    <td width='60' class='header_laporan'><div align='center'>Dept </div></td>
    <td width='150' class='header_laporan'><div align='center'>Nama Dept </div></td>
    <td width='60' class='header_laporan'>RKM</td>
    <td width='150' class='header_laporan'>Nama RKM </td>
    <td width='50' class='header_laporan'>Periode</td>
    <td width='40' class='header_laporan'><div align='center'>Satuan</div></td>
<td width='80' class='header_laporan'><div align='center'>Nilai Satuan </div></td>
<td width='40' class='header_laporan'><div align='center'>Volume</div></td>
<td width='90' class='header_laporan'><div align='center'>Total</div></td>
  </tr>";
	  $sql1="select a.kode_akun,a.kode_pp,a.kode_drk,a.periode,a.volume,a.satuan,a.nilai_sat,
       b.nama as nama_akun,c.nama as nama_pp,d.nama as nama_drk
from anggaran_d a
inner join masakun b on a.kode_akun=b.kode_akun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi 
where a.no_agg='$row->no_agg' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_akun ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$vol=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$volume=number_format($row1->volume,0,",",".");
			$nilai_sat=number_format($row1->nilai_sat,0,",",".");
			$total=number_format($row1->nilai_sat*$row1->volume,0,",",".");
			$tot=$tot+($row1->nilai_sat*$row1->volume);
			$vol=$vol+$row1->volume;
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->kode_akun</td>
    <td class='isi_laporan'>$row1->nama_akun</td>
    <td class='isi_laporan'>$row1->kode_pp</td>
    <td class='isi_laporan'>$row1->nama_pp</td>
    <td class='isi_laporan'>$row1->kode_drk</td>
    <td class='isi_laporan'>$row1->nama_drk</td>
    <td class='isi_laporan'>$row1->periode</td>
<td class='isi_laporan'>$row1->satuan</td>
<td class='isi_laporan' align='right'>$nilai_sat</td>
<td class='isi_laporan' align='right'>$volume</td>
<td class='isi_laporan' align='right'>$total</td>
  </tr>";
		$i=$i+1;
		}
		$tot=number_format($tot,0,",",".");
		$vol=number_format($vol,0,",",".");
	  $html.=" <tr>
    <td colspan='10' class='header_laporan' align='right'>Total</td>
    <td class='header_laporan' align='right'>$vol</td>
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
