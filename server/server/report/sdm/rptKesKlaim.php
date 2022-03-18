<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_sdm_rptKesKlaim
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
		$sql="select count(distinct a.nik,b.nama,a.no_klaim,a.kode_lokasi,a.periode,a.tanggal,a.no_dokumen,a.pasien,a.status_pasien,a.keterangan)
from kes_klaim_m a
inner join karyawan b on a.nik=b.nik
 ".$this->filter;
		
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
		$sql="select distinct a.nik,b.nama,a.no_klaim,a.kode_lokasi,a.periode,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.no_dokumen,a.pasien,a.status_pasien,a.keterangan
from kes_klaim_m a
inner join karyawan b on a.nik=b.nik
 ".$this->filter;
		
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
    <td colspan='5' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td colspan='2' class='judul_bukti' align='center'>KLAIM KESEHATAN </td>
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
        <td width='120' class='header_laporan'>No Klaim </td>
        <td width='476' class='header_laporan'>:&nbsp;$row->no_klaim</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>:&nbsp;$row->no_dokumen</td>
        </tr>
      <tr>
        <td class='header_laporan'>Keterangan</td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
		<tr>
        <td class='header_laporan'>Pasien</td>
        <td class='header_laporan'>:&nbsp;$row->nik -&nbsp;$row->nama</td>
        </tr>
		<tr>
        <td class='header_laporan'>Jenis Plafon </td>
        <td class='header_laporan'>:&nbsp;$row->status_pasien</td>
        </tr>
		
    </table></td>
  </tr>
  <tr>
    <td width='20' class='header_laporan'><div align='center'>No</div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode</div></td>
    <td width='370' class='header_laporan'><div align='center'>Keterangan</div></td>
    <td width='80' class='header_laporan'><div align='center'>Plafon</div></td>
    <td width='80' class='header_laporan'><div align='center'>Nilai</div></td>
  </tr>";
	  $sql1="select distinct a.kode_jenis,b.tarif, ifnull(b.nama,'-') as nama,a.nilai
from kes_klaim_d a
inner join kes_klaim_m m on m.no_klaim = a.no_klaim
left outer join
  (select kode_jenis,nama, tarif from kes_rj
    union all
   select kode_jenis,nama, tarif from kes_ri
    union
   select kode_jenis,nama, tarif from kes_riop
    union
   select kode_jenis,nama, tarif from kes_alkes
    union
   select kode_jenis,nama, tarif from kes_gigi
  ) b on a.kode_jenis=b.kode_jenis
where a.no_klaim='$row->no_klaim'  ";
		
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot_debet=0;
		$tot_kredit=0;
		$tot_nilai=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row1->nilai,0,",",".");
			$tarif=number_format($row1->tarif,0,",",".");
			$tot_nilai=$tot_nilai+$tot_debet+$row1->nilai;
			
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->kode_jenis</td>
    <td class='isi_laporan'>$row1->nama</td>
    <td class='isi_laporan' align='right'>$tarif</td>
    <td class='isi_laporan' align='right'>$nilai</td>
  </tr>";
		$i=$i+1;
		}
		$tot_nilai1=number_format($tot_nilai,0,",",".");
	  $html.="<tr>
 
    <td class='header_laporan' align='Right' colspan='4'>Total</td>
    <td class='isi_laporan' align='right'>$tot_nilai1</td>
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
