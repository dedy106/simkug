<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_fa_rptFaProgressKlaim
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
		$sql="select count(a.no_klaimsts)
from faklaim_sts a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
inner join faklaim_m d on a.no_klaim=d.no_klaim and a.kode_lokasi=d.kode_lokasi
inner join fapolis_m e on d.no_polis=e.no_polis and d.kode_lokasi=e.kode_lokasi
inner join vendor f on e.kode_vendor=f.kode_vendor and e.kode_lokasi=f.kode_lokasi ".$this->filter;
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
		$sql="select a.no_klaimsts,a.kode_lokasi,a.no_klaim,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.periode,a.kode_lokasi,a.keterangan,a.no_dokumen,a.nik_buat,a.nik_setuju,d.no_polis,d.nilai,e.kode_vendor,
       b.nama as nama_buat,c.nama as nama_setuju,f.nama as nama_vendor,g.nama as nama_status
from faklaim_sts a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join karyawan c on a.nik_setuju=c.nik and a.kode_lokasi=c.kode_lokasi
inner join faklaim_m d on a.no_klaim=d.no_klaim and a.kode_lokasi=d.kode_lokasi
inner join fapolis_m e on d.no_polis=e.no_polis and d.kode_lokasi=e.kode_lokasi
inner join vendor f on e.kode_vendor=f.kode_vendor and e.kode_lokasi=f.kode_lokasi
inner join fa_status g on a.kode_status=g.kode_status  
 ".$this->filter." order by a.no_klaimsts";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan progress klaim asuransi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
		$html.="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='9' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='120' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tanggal</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Update </td>
        <td class='header_laporan'>:&nbsp;$row->no_klaimsts</td>
        </tr>
	  <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
	 
		<tr>
        <td class='header_laporan'>Deskripsi</td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Klaim  </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
	 
      <tr>
        <td class='header_laporan'>Nilai Klaim </td>
        <td class='header_laporan'>:&nbsp;$row->no_klaim</td>
      </tr>
      <tr>
        <td class='header_laporan'>No Polis </td>
        <td class='header_laporan'>:&nbsp;$row->no_polis</td>
      </tr>
      <tr>
        <td class='header_laporan'>Vendor</td>
        <td class='header_laporan'>:&nbsp;$row->kode_vendor -&nbsp;$row->nama_vendor</td>
      </tr>
      <tr>
        <td class='header_laporan'>Status</td>
        <td class='header_laporan'>:&nbsp;$row->nama_status</td>
      </tr>
      <tr>
        <td class='header_laporan'>Dibuat Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_setuju -&nbsp;$row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>Disetujui Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_setuju -&nbsp;$row->nama_setuju</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='100' align='center' class='header_laporan'>No Asset </td>
    <td width='100' align='center' class='header_laporan'>Barcode</td>
    <td width='200' align='center' class='header_laporan'>Deskripsi</td>
    <td width='60' align='center' class='header_laporan'>Kode Dept </td>
    <td width='150' align='center' class='header_laporan'>Lokasi </td>
    <td width='40' align='center' class='header_laporan'>Tgl Perolehan</td>
    <td width='100' align='center' class='header_laporan'>Nilai Perolehan</td>
    <td width='100' align='center' class='header_laporan'>Nilai Klaim</td>
   
  </tr>";
  
	  $sql1="select a.no_fa,b.barcode,b.nama,b.kode_pp,c.nama as nama_lokfa,date_format(b.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan,b.nilai,a.nilai as nilai_klaim
from faklaim_d a
inner join fa_asset b on a.no_fa=b.no_fa and a.kode_lokasi=b.kode_lokasi
inner join fa_lokasi c on b.kode_lokfa=c.kode_lokfa and b.kode_lokasi=c.kode_lokasi
where a.no_klaim='$row->no_klaim' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_klaim ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$vol=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row1->nilai,0,",",".");
			$nilai_klaim=number_format($row1->nilai_klaim,0,",",".");
			$nilai_residu=number_format($row1->nilai_residu,0,",",".");
			$tot=$tot+$row1->nilai;
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
    <td class='isi_laporan'>$row1->no_fa</td>
    <td class='isi_laporan'>$row1->barcode</td>
    <td  class='isi_laporan'>$row1->nama</td>
    <td  class='isi_laporan'>$row1->kode_pp</td>
    <td  class='isi_laporan'>$row1->nama_lokfa</td>
	<td  class='isi_laporan'>$row1->tgl_perolehan</td>
    <td  class='isi_laporan' align='right'>$nilai</td>
    <td  class='isi_laporan' align='right'>$nilai_klaim</td>

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
