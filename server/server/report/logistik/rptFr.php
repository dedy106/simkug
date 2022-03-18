<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");

class server_report_logistik_rptFr
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
		$sql="select count(a.no_fa) from fa_asset a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join fa_klp c on a.kode_klpfa=c.kode_klpfa and a.kode_lokasi=c.kode_lokasi
inner join fa_klpakun d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi
inner join fa_lokasi e on a.kode_lokfa=e.kode_lokfa and a.kode_lokasi=e.kode_lokasi
inner join karyawan f on a.nik_pnj=f.nik and a.kode_lokasi=b.kode_lokasi ".$this->filter;
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
		$sql="select distinct a.periode,a.kode_lokasi,a.no_fa,a.nama,a.barcode,date_format(a.tgl_susut,'%d/%m/%Y') as tgl_susut,a.kode_pp,a.kode_klpfa,a.kode_klpakun,a.kode_lokfa,a.catatan,a.nik_pnj,a.nilai,a.nilai_residu,
       b.nama as nama_pp,c.nama as nama_klpfa,d.nama as nama_klpakun,e.nama as nama_lokfa,f.nama as nama_pnj,date_format(a.tgl_perolehan,'%d/%m/%Y') as tgl_perolehan,a.nilai_residu
from fa_asset a
inner join pp b on a.kode_pp=b.kode_pp and a.kode_lokasi=b.kode_lokasi
inner join fa_klp c on a.kode_klpfa=c.kode_klpfa and a.kode_lokasi=c.kode_lokasi
inner join fa_klpakun d on a.kode_klpakun=d.kode_klpakun and a.kode_lokasi=d.kode_lokasi
inner join fa_lokasi e on a.kode_lokfa=e.kode_lokfa and a.kode_lokasi=e.kode_lokasi
inner join karyawan f on a.nik_pnj=f.nik and a.kode_lokasi=b.kode_lokasi ".$this->filter." order by a.no_fa";
		error_log($sql);
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		
		$i = 1;
		$jum=$rs->recordcount();
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan final receive",$this->lokasi,$AddOnLib->ubah_periode($periode));
		error_log("aaaa");
		$html.="<br>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$nilai=number_format($row->nilai,0,",",".");
			$nilai_residu=number_format($row->nilai_residu,0,",",".");
			$html.="<table  border='1' cellspacing='0' cellpadding='0' class='kotak'>
  <tr>
    <td colspan='9' style='padding:5px'><table width='622' border='0' cellspacing='2' cellpadding='1'>
      <tr>
        <td width='110' class='header_laporan'>Periode</td>
        <td width='496' class='header_laporan'>:&nbsp;$row->periode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_perolehan</td>
        </tr>
      <tr>
        <td class='header_laporan'>No Asset </td>
        <td class='header_laporan'>:&nbsp;$row->no_fa</td>
        </tr>
      <tr>
        <td class='header_laporan'>Barcode </td>
        <td class='header_laporan'>:&nbsp;$row->barcode</td>
        </tr>
      <tr>
        <td class='header_laporan'>Tanggal Awal Susut </td>
        <td class='header_laporan'>:&nbsp;$row->tgl_susut </td>
      </tr>
      <tr>
        <td class='header_laporan'>Departemen</td>
        <td class='header_laporan'>:&nbsp;$row->kode_pp</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kelompok Asset </td>
        <td class='header_laporan'>:&nbsp;$row->kode_klpfa -&nbsp; $row->nama_klpfa</td>
      </tr>
      <tr>
        <td class='header_laporan'>Kelompok Akun </td>
        <td class='header_laporan'>:&nbsp;$row->kode_klpakun -&nbsp; $row->nama_klpakun</td>
      </tr>
      <tr>
        <td class='header_laporan'>Lokasi Asset </td>
        <td class='header_laporan'>:&nbsp;$row->kode_lokfa -&nbsp; $row->nama_lokfa</td>
      </tr>
      <tr>
        <td class='header_laporan'>Penanggung Jawab </td>
        <td class='header_laporan'>:&nbsp;$row->nik_pnj -&nbsp; $row->nama_pnj</td>
      </tr>
      <tr>
        <td class='header_laporan'>Catatan</td>
        <td class='header_laporan'>:&nbsp;$row->catatan</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nilai Asset </td>
        <td class='header_laporan'>:&nbsp;$nilai</td>
      </tr>
      <tr>
        <td class='header_laporan'>Nilai Residu </td>
        <td class='header_laporan'>:&nbsp;$nilai_residu</td>
      </tr>

    </table></td>
  </tr>
  <tr bgcolor='#CCCCCC'>
    <td width='20' align='center' class='header_laporan'>No</td>
	<td width='100' align='center' class='header_laporan'>No Tag TR </td>
    <td width='70' align='center' class='header_laporan'>Kode</td>
    <td width='200' align='center' class='header_laporan'>Nama Barang </td>
    <td width='60' align='center' class='header_laporan'>Satuan </td>
    <td width='100' align='center' class='header_laporan'>Merk </td>
    <td width='100' align='center' class='header_laporan'>Tipe</td>
    <td width='100' align='center' class='header_laporan'>No Seri </td>
    <td width='100' align='center' class='header_laporan'>Harga </td>  
  </tr>";
  
	  $sql1="select a.no_tag,b.kode_brg,c.nama as nama_brg,b.kode_sat,b.merk,b.tipe,b.no_seri,b.harga
from fa_d a
inner join tr_d b on a.no_tag=b.no_tag and a.kode_lokasi=b.kode_lokasi
inner join barang_m c on c.kode_brg=b.kode_brg and b.kode_lokasi=c.kode_lokasi
where a.no_fa='$row->no_fa' and a.kode_lokasi='$row->kode_lokasi'
order by b.kode_brg ";
		error_log($sql1);
		$rs1 = $dbLib->execute($sql1);
		$i=1;
		$tot=0;
		$vol=0;
		while ($row1 = $rs1->FetchNextObject($toupper=false))
		{
			$harga=number_format($row1->harga,0,",",".");
			$html.="<tr>
    <td class='isi_laporan' align='center'>$i</td>
	<td class='isi_laporan'>$row1->no_tag</td>
    <td class='isi_laporan'>$row1->kode_brg</td>
    <td class='isi_laporan'>$row1->nama_brg</td>
    <td class='isi_laporan'>$row1->kode_sat</td>
	<td class='isi_laporan'>$row1->merk</td>
    <td class='isi_laporan'>$row1->tipe</td>
    <td class='isi_laporan'>$row1->no_seri</td>
	<td class='isi_laporan' align='right'>$harga</td>
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
