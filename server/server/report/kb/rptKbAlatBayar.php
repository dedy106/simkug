<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_kb_rptKbAlatBayar
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
		$sql="select count(a.no_kas)
from kas_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi ".$this->filter." and a.modul='KBO_ALB' ";
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
		$sql="select a.periode,a.tanggal,a.kode_lokasi,a.no_kas,a.jenis,a.keterangan,a.no_dokumen,a.kode_curr,a.kurs,a.akun_kb,c.nama as nama_akun,a.nik_buat,a.no_bg,b.nama as nama_buat
from kas_m a
inner join karyawan b on a.nik_buat=b.nik and a.kode_lokasi=b.kode_lokasi
inner join masakun c on a.akun_kb=c.kode_akun and a.kode_lokasi=c.kode_lokasi ".$this->filter." and a.modul='KBO_ALB' order by a.no_kas";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan alat bayar",$this->lokasi,$AddOnLib->ubah_periode($periode));
		
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
        <td class='header_laporan'>No KasBank </td>
        <td class='header_laporan'>:&nbsp;$row->no_kas</td>
        </tr>
      <tr>
        <td class='header_laporan'>Deskripsi </td>
        <td class='header_laporan'>:&nbsp;$row->keterangan</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Dokumen </td>
        <td class='header_laporan'>: $row->no_dokumen </td>
      </tr>
      <tr>
        <td class='header_laporan'>Jenis</td>
        <td class='header_laporan'>: $row->jenis </td>
      </tr>
      <tr>
        <td class='header_laporan'>Akun KasBank </td>
        <td class='header_laporan'>: $row->akun_kb -&nbsp; $row->nama_akun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Currency</td>
        <td class='header_laporan'>: $row->kode_curr </td>
      </tr>
      <tr>
        <td class='header_laporan'>Dibuat Oleh </td>
        <td class='header_laporan'>:&nbsp;$row->nik_buat -&nbsp; $row->nama_buat</td>
      </tr>
      <tr>
        <td class='header_laporan'>No BG / Cheque  </td>
        <td class='header_laporan'>:&nbsp;$row->no_bg</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='40' align='center' class='header_laporan'>Modul </td>
    <td width='100' align='center' class='header_laporan'>No dokumen</td>
    <td width='60' align='center' class='header_laporan'>Kode PP </td>
    <td width='200' align='center' class='header_laporan'>Deskripsi</td>
	<td width='200' align='center' class='header_laporan'>Catatan</td>
    <td width='100' align='center' class='header_laporan'>Nilai</td>
  </tr>
";
  
	  $sql1="select a.catatan,a.modul,a.no_bukti,
       case a.modul when 'SPB' then b.kode_pp when 'kp.SPB' then b.kode_pp when 'PJR' then c.kode_pp when 'I/F' then d.kode_pp when 'SPP' then b.kode_pp end as kode_pp,       
case a.modul when 'SPB' then b.keterangan when  'kp.SPB' then b.keterangan when 'PJR' then c.keterangan when 'I/F' then d.keterangan when 'SPP' then b.keterangan end as keterangan,       
case a.modul when 'SPB' then b.nilai when 'kp.SPB' then b.nilai when 'PJR' then c.nilai when 'I/F' then d.nilai when 'SPP' then b.nilai end as nilai
 from kas_d a
left join spb_m b on a.no_bukti=b.no_spb and a.kode_lokasi=b.kode_lokasi
left join panjar_m c on a.no_bukti=c.no_pj and a.kode_lokasi=c.kode_lokasi
left join if_m d on a.no_bukti=d.no_if and a.kode_lokasi=d.kode_lokasi
where a.no_kas='$row->no_kas' and a.kode_lokasi='$row->kode_lokasi'
order by a.no_bukti ";
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
    <td class='isi_laporan'>$row1->modul</td>
    <td class='isi_laporan'>$row1->no_bukti</td>
	<td class='isi_laporan'>$row1->kode_pp</td>
	<td class='isi_laporan'>$row1->keterangan</td>
	<td class='isi_laporan'>$row1->catatan</td>
	<td class='isi_laporan' align='right'>$nilai</td>
  </tr>";
		$i=$i+1;
		}
		$tot=number_format($tot,0,",",".");
	  $html.=" <tr >
    <td colspan='6' align='right' class='isi_laporan'>Total</td>
    <td align='right' class='isi_laporan'>$tot</td>
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
