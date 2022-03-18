<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptPosisiSpp
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
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select count(a.no_spb)
from spb_m a
left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi
left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi
left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi
left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi ".$this->filter." and a.modul='SPP'";
		$rs = $dbLib->execute($sql);		
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);		
		}
		error_log($sql);
		return $totPage;
	}
	function getHtml()
	{
		
		global $dbLib;
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$mutasi=$tmp[1];
		$periode=$tmp[2];
		$sql = "select a.no_spb,a.kode_pp,f.nama as nama_pp,date_format(a.tanggal,'%d/%m/%Y') as tanggal,a.keterangan,a.nilai,b.no_ver,date_format(c.tanggal,'%d/%m/%Y') as tgl_ver,d.no_kas,date_format(e.tanggal,'%d/%m/%Y') as tgl_kas
from spb_m a
left join ver_d b on a.no_spb=b.no_bukti and a.kode_lokasi=b.kode_lokasi
left join ver_m c on b.no_ver=c.no_ver and b.kode_lokasi=c.kode_lokasi
left join kas_d d on a.no_spb=d.no_bukti and a.kode_lokasi=d.kode_lokasi
left join kas_m e on d.no_kas=e.no_kas and d.kode_lokasi=e.kode_lokasi
left join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi ".$this->filter." and a.modul='SPP' order by a.no_spb";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan posisi surat permintaan pembayaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='2' style='border-collapse: collapse' bordercolor='#111111'>
  <tr bgcolor='#CCCCCC'>
    <td align='center'  class='header_laporan'>No</td>
    <td width='70' align='center' class='header_laporan'>Kode PP </td>
    <td width='150' align='center' class='header_laporan'>Nama PP </td>
    <td width='90' align='center' class='header_laporan'>No SPP</td>
    <td width='60' align='center' class='header_laporan'>Tgl SPP </td>
    <td width='200' align='center' class='header_laporan'>Keterangan</td>
    <td width='90' align='center' class='header_laporan'>Nilai</td>
    <td width='90' height='25' align='center' class='header_laporan'>No Ver </td>
    <td width='60' align='center' class='header_laporan'>Tgl Ver</td>
    <td width='90' align='center' class='header_laporan'>No Kas </td>
    <td width='60' align='center' class='header_laporan'>Tgl Kas </td>
  </tr>";
		$so_awal_debet=0;
		$so_awal_kredit=0;
		$debet=0;
		$kredit=0;
		$so_akhir_debet=0;
		$so_akhir_kredit=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$so_awal_debet=$so_awal_debet+$row->so_awal_debet;
			$so_awal_kredit=$so_awal_kredit+$row->so_awal_kredit;
			$debet=$debet+$row->debet;
			$kredit=$kredit+$row->kredit;
			$so_akhir_debet=$so_akhir_debet + $row->so_akhir_debet;
			$so_akhir_kredit=$so_akhir_kredit + $row->so_akhir_kredit;
			$html.="<tr>
	<td align='center' class='isi_laporan'>$i</td>
    <td  class='isi_laporan'>$row->kode_pp</td>
    <td class='isi_laporan'>$row->nama_pp</td>
    <td  class='isi_laporan'>$row->no_spb</td>
    <td class='isi_laporan'>$row->tanggal</td>
    <td  class='isi_laporan'>$row->keterangan</td>
    <td align='right' class='isi_laporan'>".number_format($row->nilai,0,',','.')."</td>
    <td class='isi_laporan'>$row->no_ver</td>
    <td height='25'class='isi_laporan'>$row->tgl_ver</td>
    <td class='isi_laporan'>$row->no_kas</td>
    <td class='isi_laporan'>$row->tgl_kas</td>
  </tr>";
			
			$i=$i+1;
		}
		$html.="</table>";
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
		$sql = "select kode_akun,nama,'*' as lokasi,debet,kredit,so_awal,so_akhir, 
       case when so_awal>0 then so_awal else 0 end as so_awal_debet,
       case when so_awal<0 then so_awal else 0 end as so_awal_kredit, 
       case when so_akhir>0 then so_akhir else 0 end as so_akhir_debet,
       case when so_akhir<0 then so_akhir else 0 end as so_akhir_kredit
from glma_tmp ".$this->filter." order by kode_akun ";
		global $dbLib;
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
