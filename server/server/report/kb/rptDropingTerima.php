<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptDropingTerima
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
		$sql="select count(a.no_terima)
from droptrm_m a
inner join masakun c on a.akun_tak=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi  ".$this->filter;
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
		$sql="select a.no_terima,a.no_kirim,a.kode_lokasi,a.akun_tak,a.periode,a.nik_buat,a.nik_setuju,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,
       c.nama as nama_akun,d.nama as nama_buat,e.nama as nama_setuju
from droptrm_m a
inner join masakun c on a.akun_tak=c.kode_akun and a.kode_lokasi=c.kode_lokasi
inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi ".$this->filter." order by a.no_terima";
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
    <td colspan='6' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
		<tr>
        <td colspan='2' class='judul_bukti' align='center'>DROPING DANA TERIMA</td>
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
        <td width='120' class='header_laporan'>No Terima </td>
        <td width='476' class='header_laporan'>:&nbsp;$row->no_terima</td>
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
        <td class='header_laporan'>No Kirim </td>
        <td class='header_laporan'>:&nbsp;$row->no_kirim</td>
        </tr>
		<tr>
        <td class='header_laporan'>Diajukan Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp;$row->nama_buat</td>
        </tr>
		<tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_setuju -&nbsp;$row->nama_setuju</td>
        </tr>
		<tr>
        <td class='header_laporan'>Akun Mutasi </td>
        <td class='header_laporan'>:&nbsp;$row->akun_tak -&nbsp;$row->nama_akun</td>
        </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' class='header_laporan'><div align='center'>No</div></td>
    <td width='70' class='header_laporan'><div align='center'>Status</div></td>
    <td width='60' class='header_laporan'><div align='center'>Kode PP </div></td>
    <td width='150' class='header_laporan'><div align='center'>Nama PP </div></td>
    <td width='250' class='header_laporan'><div align='center'>Uraian </div></td>
    <td width='90' class='header_laporan'><div align='center'>Jumlah</div></td>

  </tr>";
	  $sql1="select a.status,a.kode_pp,b.nama as nama_pp,a.keterangan,a.nilai  
from dropkrm_d a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
where a.no_kirim='$row->no_kirim'";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$inv=0;
		$exp=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row1->nilai,0,",",".");
			$tot=$tot+$row1->nilai;
			if ($row1->status=="EKSPLOITASI")
			{
				$exp=$exp+$row1->nilai;
			}
			else
			{
				$inv=$inv+$row1->nilai;
			}
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->status</td>
    <td class='isi_laporan'>$row1->kode_pp</td>
    <td class='isi_laporan'>$row1->nama_pp</td>
    <td class='isi_laporan'>$row1->keterangan</td>
    <td class='isi_laporan' align='right'>$nilai</td>
  </tr>";
		$i=$i+1;
		}
		$tot1=number_format($tot,0,",",".");
		$exp1=number_format($exp,0,",",".");
		$inv1=number_format($inv,0,",",".");
	  $html.="
	  <tr>
    <td colspan='4'>&nbsp;</td>
    <td class='header_laporan' align='right'>Droping Exploitasi</td>
    <td class='isi_laporan' align='right'>$exp1</td>
  </tr>
  <tr>
    <td colspan='4'>&nbsp;</td>
    <td class='header_laporan' align='right'>Droping Investasi</td>
    <td class='isi_laporan' align='right'>$inv1</td>
  </tr>
  <tr>
    <td colspan='4'>&nbsp;</td>
    <td class='header_laporan' align='right'>Total Droping</td>
    <td class='isi_laporan' align='right'>$tot1</td>
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
