<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_fa_rptFaApp
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
		$tmp=explode("/",$this->filter2);
		$tahun=substr($tmp[0],0,4);
		$sql="select count(a.no_faapp)
from fa_app a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$tahun'
inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi ".$this->filter;
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
		$tmp=explode("/",$this->filter2);
		$tahun=substr($tmp[0],0,4);
		$sql="select a.periode,a.tanggal,a.kode_lokasi,a.no_faapp,a.no_dokumen,a.keterangan,a.kode_curr,a.kurs,a.nik_buat,a.nik_setuju,a.kode_pp,a.kode_drk,no_fa,
       b.nama as nama_buat,c.nama as nama_setuju,d.nama as nama_drk,e.nama as nama_pp
from fa_app a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi and d.tahun='$tahun'
inner join pp e on a.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
 ".$this->filter." order by a.no_faapp";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan approve data asset",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$html.="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='12' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Approve </td>
        <td class='header_laporan'>:&nbsp;$row->no_faapp</td>
        </tr>
	  <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
      
      <tr>
        <td class='header_laporan'>Currency</td>
        <td class='header_laporan'>: $row->jenis </td>
      </tr>
      <tr>
        <td class='header_laporan'>Dibuat Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp; $row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp; $row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Departemen </td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp; $row->nama_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>RKM  </td>
        <td class='header_laporan'>:&nbsp;$row->kode_rkm -&nbsp; $row->nama_rkm</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='100' align='center' class='header_laporan'>No SPB </td>
    <td width='200' align='center' class='header_laporan'>Deskripsi</td>
    <td width='60' align='center' class='header_laporan'>Kode Akun  </td>
    <td width='200' align='center' class='header_laporan'>Nama Akun </td>
    <td width='60' align='center' class='header_laporan'>Kode PP </td>
    <td width='200' align='center' class='header_laporan'>Nama PP </td>
    <td width='60' align='center' class='header_laporan'>Kode DRK </td>
    <td width='200' align='center' class='header_laporan'>Nama DRK </td>
    <td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='30' align='center' class='header_laporan'>DC</td>
    <td width='90' align='center' class='header_laporan'>Nilai </td>
  </tr>";
  
	  $sql1="select a.no_spb,b.no_dokumen,b.kode_akun,b.kode_pp,b.kode_drk,b.keterangan,b.dc,b.nilai,
       c.nama as nama_akun,d.nama as nama_drk,e.nama as nama_pp
from fa_spb a
inner join fa_j b on a.no_faapp=b.no_faapp and a.kode_lokasi=b.kode_lokasi
inner join masakun c on b.kode_akun=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join drk d on b.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi
inner join pp e on b.kode_pp=e.kode_pp and a.kode_lokasi=e.kode_lokasi
where a.no_faapp='$row->no_faapp' and a.kode_lokasi='$row->kode_lokasi'
order by a.kode_akun ";
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
    <td class='isi_laporan'>$row1->no_spb</td>
    <td class='isi_laporan'>$row1->no_dokumen</td>
    <td  class='isi_laporan'>$row1->kode_akun</td>
    <td  class='isi_laporan'>$row1->nama_akun</td>
    <td  class='isi_laporan'>$row1->kode_pp</td>
    <td  class='isi_laporan'>$row1->nama_pp</td>
    <td  class='isi_laporan'>$row1->kode_drk</td>
    <td  class='isi_laporan'>$row1->nama_drk</td>
    <td  class='isi_laporan'>$row1->keterangan</td>
    <td  class='isi_laporan'>$row1->dc</td>
    <td  class='isi_laporan' align='right'>$nilai</td>
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
