<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_fa_rptFaDetail
{
	protected $caption;
	protected $filter;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	protected $filter2;
	function getTotalPage()
	{
		global $dbLib;
		
		$tmp=explode("/",$this->filter2);
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$kode_klpakun=$tmp[3];
		
		$sql = "select count(a.no_fa)
from fa_asset a
inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join fa_lokasi d on a.kode_lokfa=d.kode_lokfa and a.kode_lokasi=d.kode_lokasi
inner join fa_susut_tmp e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi and e.nik_user='$nik_user'".$this->filter;
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
		$nik_user=$tmp[0];
		$periode=$tmp[1];
		$kode_lokasi=$tmp[2];
		$kode_klpakun=$tmp[3];
		$sql = "select a.kode_klpakun,b.nama as nama_klpakun,a.kode_pp,c.nama as nama_pp,d.nama as nama_lokfa,a.no_fa,a.nama,date_format(a.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan,
       a.umur,a.persen,a.nilai,e.n1,e.n2,e.n3,a.nilai-e.n3 as nilai_buku,f.nama as sts_brg,a.no_baps 
from fa_asset a
inner join fa_klpakun b on a.kode_klpakun=b.kode_klpakun and a.kode_lokasi=b.kode_lokasi
inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
inner join fa_lokasi d on a.kode_lokfa=d.kode_lokfa and a.kode_lokasi=d.kode_lokasi
inner join fa_susut_tmp e on a.no_fa=e.no_fa and a.kode_lokasi=e.kode_lokasi and e.nik_user='$nik_user'
inner join fa_status f on a.kode_status=f.kode_status ".$this->filter." order by a.kode_klpakun,a.kode_pp,a.kode_lokfa,a.no_fa ";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan detail asset",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table width='1500' border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='30' rowspan='2' align='center' class='header_laporan'>No</td>
				<td width='60' rowspan='2' align='center' class='header_laporan'>Klp Asset </td>
				<td width='200' rowspan='2' align='center' class='header_laporan'>Nama Klp Asset </td>
				<td width='60' rowspan='2' align='center' class='header_laporan'>Kode PP </td>
				<td width='200' rowspan='2' align='center' class='header_laporan'>Nama PP </td>
				<td width='150' rowspan='2' align='center' class='header_laporan'>Lokasi</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>No Asset </td>
				<td width='200' rowspan='2' align='center' class='header_laporan'>Keterangan</td>
				<td width='60' rowspan='2' align='center' class='header_laporan'>Tanggal</td>
				<td colspan='2' align='center' class='header_laporan'>Umur</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>No Approval </td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Kondisi</td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Perolehan </td>
				<td colspan='3' align='center' class='header_laporan'>Nilai Depresiasi </td>
				<td width='100' rowspan='2' align='center' class='header_laporan'>Nilai Buku </td>
				</tr>
				<tr bgcolor='#CCCCCC'>
				  <td width='40' align='center' class='header_laporan'>Bulan</td>
				  <td width='40' align='center' class='header_laporan'>%</td>
				  <td width='100' align='center' class='header_laporan'>S/D Bulan Lalu </td>
				  <td width='100' align='center' class='header_laporan'>Bulan Ini </td>
				  <td width='100' align='center' class='header_laporan'>S/D Bulan Ini </td>
  </tr>";
		$n1=0;$n2=0;$n3=0;$n4=0;$n5=0;$nilai=0;$nilai_buku=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=$nilai+$row->nilai;
			$n1=$n1+$row->n1;
			$n2=$n2+$row->n2;
			$n3=$n3+$row->n3;
			$nilai_buku=$nilai_buku+$row->nilai_buku;
		    $html.="<tr>
				<td align='center' class='isi_laporan'>$i</td>
				  <td  class='isi_laporan'>$row->kode_klpakun</td>
				  <td  class='isi_laporan'>$row->nama_klpakun</td>
				  <td  class='isi_laporan'>$row->kode_pp</td>
				  <td  class='isi_laporan'>$row->nama_pp</td>
				  <td  class='isi_laporan'>$row->nama_lokfa</td>
				  <td  class='isi_laporan'>$row->no_fa</td>
				  <td  class='isi_laporan'>$row->nama</td>
				  <td  class='isi_laporan'>$row->tgl_perolehan</td>
				  <td  class='isi_laporan'>$row->umur</td>
				  <td  class='isi_laporan'>$row->persen</td>
				  <td  class='isi_laporan'>$row->no_baps</td>
				  <td  class='isi_laporan'>$row->sts_brg</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->n1,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->n2,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->n3,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($row->nilai_buku,0,",",".")."</td>
  </tr>";
			
			$i=$i+1;
		}
		$html.="<tr>
				  <td colspan='13' align='right' class='isi_laporan'>Total</td>
				  <td align='right' class='isi_laporan'>".number_format($nilai,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($n1,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($n2,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($n3,0,",",".")."</td>
				  <td  class='isi_laporan' align='right'>".number_format($nilai_buku,0,",",".")."</td>
  </tr></table>";
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
		$sql = "select kode_neraca,nama,tipe from neraca ".$this->filter." order by rowindex ";
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
