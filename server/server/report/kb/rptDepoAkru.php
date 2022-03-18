<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptDepoAkru
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
		$sql="select count(a.no_kas) from kas_j a ".$this->filter;
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
		$sql="select a.no_akru,a.periode,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,a.kode_pp,a.kode_drk,a.nik_buat,a.nik_setuju,a.kode_lokasi,
       c.nama as nama_pp,c.nama as nama_drk,d.nama as nama_buat,e.nama as nama_setuju
from depo_akru_m a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
left join drk c on a.kode_drk=c.kode_drk and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi
where a.modul='DEPO_AKRU' ".$this->filter;
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='11' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
	<tr>
        <td colspan='2' class='judul_bukti' align='center'>PENGAKUAN BUNGA DEPOSITO</td>
        </tr>
	  <tr>	
      <tr>
        <td class='header_laporan'>Periode</td>
        <td class='header_laporan'>:&nbsp;$row->periode<td>
      </tr>
      <tr>
        <td class='header_laporan'>Tanggal</td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
      </tr>
      <tr>
        <td width='100' class='header_laporan'>No Akru </td>
        <td width='496' class='header_laporan'>:&nbsp;$row->no_akru</td>
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
        <td class='header_laporan'>PP</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp -&nbsp;$row->nama_pp</td>
        </tr>
      <tr>
        <td class='header_laporan'>Dibuat Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp;$row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_setuju -&nbsp;$row->nama_setuju</td>
      </tr>
      <tr>
        <td class='header_laporan'>RKM</td>
        <td class='header_laporan'>:&nbsp;$row->kode_drk -&nbsp;$row->nama_drk</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
    <td width='100' align='center' class='header_laporan'>No Deposito </td>
    <td width='100' align='center' class='header_laporan'>Bank  </td>
    <td width='150' align='center' class='header_laporan'>Cabang </td>
    <td width='100' align='center' class='header_laporan'>Penempatan</td>
    <td width='70' align='center' class='header_laporan'>Tanggal</td>
    <td width='50' align='center' class='header_laporan'>% Rate </td>
    <td width='50' align='center' class='header_laporan'>Jml Hari </td>
    <td width='80' align='center' class='header_laporan'>Nilai Bunga </td>
  </tr>";
	  $sql1="select a.no_depo,a.jml_hari,a.nilai,date_format(b.tanggal,'%d/%m/%Y') as tanggal,b.bank,b.cabang,b.rate,b.nilai as penempatan
from depo_akru_d a
inner join depo_m b on a.no_depo=b.no_depo and a.kode_lokasi=b.kode_lokasi

where a.no_akru='$row->no_akru'
order by a.no_depo ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$j=1;
		$tot_debet=0;
		$tot_kredit=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row1->nilai,0,",",".");
			$penempatan=number_format($row1->penempatan,0,",",".");
			$tot_debet=$tot_debet+$row1->debet;
			$tot_kredit=$tot_kredit+$row1->kredit;
			$html.="<tr>
    <td align='center' class='isi_laporan'>$j</td>
    <td align='left' class='isi_laporan'>$row1->no_depo</td>
    <td align='left' class='isi_laporan'>$row1->bank</td>
    <td align='left' class='isi_laporan'>$row1->cabang</td>
    <td align='right' class='isi_laporan'>$penempatan</td>
    <td align='center' class='isi_laporan'>$row1->tanggal</td>
    <td align='center' class='isi_laporan'>$row1->rate</td>
    <td align='center' class='isi_laporan'>$row1->jml_hari</td>
    <td align='right' class='isi_laporan'>$nilai</td>
  </tr>";
		$j=$j+1;
		}
		$tot_debet1=number_format($tot_debet,0,",",".");
		$tot_kredit1=number_format($tot_debet,0,",",".");
	  
			
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
