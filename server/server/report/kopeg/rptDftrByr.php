<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptDftrByr
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
		
		$sql = "select count(*) 
			from kop_pinjangs_m a inner join kop_pinjangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi
			inner join kop_pinj_m c on b.no_pinj=c.no_pinj and b.kode_lokasi=c.kode_lokasi
			inner join kop_agg e on c.kode_agg=e.kode_agg and c.kode_lokasi=e.kode_lokasi ".$this->filter;
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
		$filter2=explode(";",$this->filter2);
		$sql = "select upper(e.nama) as nm,c.no_kontrak,ifnull(dd.nangs,0) as angs0,ifnull(dd.npokok,0) as pokok0,ifnull(dd.nbunga,0) as jasa0,
			b.npokok+b.nbunga as angs1,b.npokok as pokok1,b.nbunga as jasa1,ifnull(dd.nangs,0)+b.npokok+b.nbunga as angs2,
			ifnull(dd.npokok,0)+b.npokok as pokok2,ifnull(dd.nbunga,0)+b.nbunga as jasa2
			from kop_pinjangs_m a inner join kop_pinjangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi
			inner join kop_pinj_m c on b.no_pinj=c.no_pinj and b.kode_lokasi=c.kode_lokasi
			left join (select x.no_kontrak,x.no_pinj,x.kode_lokasi,x.npokok,x.nbunga,sum(x.npokok+x.nbunga) as nangs
				from kop_pinjangs_d x inner join kop_pinjangs_m y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi and y.no_del='-' 
				where y.periode<'".$filter2[1]."'
				group by x.no_kontrak,x.no_pinj,x.kode_lokasi) dd on b.no_pinj=dd.no_pinj and b.kode_lokasi=dd.kode_lokasi
			inner join kop_agg e on c.kode_agg=e.kode_agg and c.kode_lokasi=e.kode_lokasi ".$this->filter.
			" order by c.kode_agg ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		//error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("DAFTAR PEMBAYARAN<br />Periode : ".$filter2[1],$filter2[0],$AddOnLib->ubah_periode($filter[1]));
		$html.= "<table width='800' border='1' align='center' cellpadding='0' cellspacing='0' class='kotak'>
				  <tr bgcolor='#CCCCCC'>
				    <td class='istyle18' width='28' rowspan='2' align='center'>No. </td>
				    <td class='istyle18' width='111' rowspan='2' align='center'>Nama Anggota</td>
				    <td class='istyle18' width='95' rowspan='2' align='center'>Kontrak</td>
				    <td class='istyle18' colspan='3' align='center'>Pembayaran untuk bulan lalu</td>
				    <td class='istyle18' colspan='3' align='center'>Pembayaran untuk bulan ini</td>
				    <td class='istyle18' colspan='3' align='center'>Jumlah</td>
				  </tr>
				  <tr bgcolor='#CCCCCC'>
				    <td class='istyle18' width='60' align='center'>Angsuran</td>
				    <td class='istyle18' width='60' align='center'>Pokok</td>
				    <td class='istyle18' width='60' align='center'>Jasa</td>
				    <td class='istyle18' width='60' align='center'>Angsuran</td>
				    <td class='istyle18' width='60' align='center'>Pokok</td>
				    <td class='istyle18' width='60' align='center'>Jasa</td>
				    <td class='istyle18' width='60' align='center'>Angsuran</td>
				    <td class='istyle18' width='60' align='center'>Pokok</td>
				    <td class='istyle18' width='60' align='center'>Jasa</td>
				  </tr>";
		$angs0=$angs1=$angs2=$pokok0=$pokok1=$pokok2=$jasa0=$jasa1=$jasa2=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.= "<tr>
					    <td class='istyle14' align='center'>".$i."</td>
					    <td class='istyle14'>".$row->nm."</td>
					    <td class='istyle14'>".$row->no_kontrak."</td>
					    <td class='istyle14' align='right'>".number_format($row->angs0,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->pokok0,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->jasa0,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->angs1,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->pokok1,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->jasa1,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->angs2,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->pokok2,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->jasa2,0,",",".")."</td>
					  </tr>";
			$i=$i+1;
			$angs0+=$row->angs0;
			$angs1+=$row->angs1;
			$angs2+=$row->angs2;
			$pokok0+=$row->pokok0;
			$pokok1+=$row->pokok1;
			$pokok2+=$row->pokok2;
			$jasa0+=$row->jasa0;
			$jasa1+=$row->jasa1;
			$jasa2+=$row->jasa2;
		}
		$html.= "<tr>
				    <td class='istyle18' colspan='3' align='center'>Total</td>
				    <td class='istyle14' align='right'>".number_format($angs0,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($pokok0,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($jasa0,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($angs1,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($pokok1,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($jasa1,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($angs2,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($pokok2,0,",",".")."</td>
				    <td class='istyle14' align='right'>".number_format($jasa2,0,",",".")."</td>
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