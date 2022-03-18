<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptPryk
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
				from kop_proyek_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi ".$this->filter;
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
		//$filter2=explode(";",$this->filter2);
		$sql = "select a.no_proyek,date_format(a.tgl_mulai,'%d/%m/%Y') as tglawl,date_format(a.tgl_selesai,'%d/%m/%Y') as tglend,
			a.no_dokumen,a.keterangan,b.nama as nmcust,c.nama as nmpp,a.nilai,ifnull(d.tghn,0) as tghn,e.nspb,f.npj,f.nptg,
			(e.nspb+f.npj+f.nptg) as byr,((ifnull(d.tghn,0)-(e.nspb+f.npj+f.nptg))/ifnull(d.tghn,0))*100 as varians
			from kop_proyek_m a inner join cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi 
			inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi 
			left join (select no_proyek,kode_lokasi,sum(ifnull(nilai,0)+ifnull(nilai_ppn,0)) as tghn 
				from kop_arproyek_m group by no_proyek, kode_lokasi) d on a.no_proyek=d.no_proyek and a.kode_lokasi=d.kode_lokasi 
			left join (select no_spb,no_invoice,kode_lokasi,sum(ifnull(nilai,0)) as nspb 
				from spb_m group by no_invoice, kode_lokasi) e on a.no_proyek=e.no_invoice and a.kode_lokasi=e.kode_lokasi 
			left join (select z.kode_lokasi,z.catatan as no_proyek,sum(ifnull(z.nilai,0)-ifnull(y.nilai,0)) as npj,sum(ifnull(y.nilai,0)) as nptg 
				from panjar_m z left join ptg_m y on z.no_pj=y.no_pj group by z.catatan,z.kode_lokasi
				) f on a.no_proyek=f.no_proyek and a.kode_lokasi=f.kode_lokasi ".$this->filter.
			" order by a.tgl_mulai desc ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("LAPORAN PENGAWASAN PROYEK",$this->filter2,"");
		$html.= "<table border='1' align='center' cellpadding='1' cellspacing='0' class='kotak'>
				  <tr align='center' bgcolor='#999999'>
				    <td class='istyle12' rowspan='2'>No.</td>
				    <td class='istyle12' rowspan='2'>No. Proyek</td>
				    <td class='istyle12' rowspan='2'>Tgl Mulai</td>
				    <td class='istyle12' rowspan='2'>Tgl Selesai</td>
				    <td class='istyle12' rowspan='2'>No. Dokumen</td>
				    <td class='istyle12' rowspan='2'>Keterangan</td>
				    <td class='istyle12' rowspan='2'>Customer</td>
				    <td class='istyle12' rowspan='2'>PP/Unit Kerja</td>
				    <td class='istyle12' rowspan='2'>Nilai Proyek</td>
				    <td class='istyle12' rowspan='2'>Nilai Tagihan</td>
				    <td class='istyle12' colspan='4'>Nilai Bayar</td>
				    <td class='istyle12' rowspan='2'>Varian (%) </td>
				  </tr>
				  <tr align='center' bgcolor='#999999'>
				    <td class='istyle12'>SPB</td>
				    <td class='istyle12'>Panjar</td>
				    <td class='istyle12'>Ptg Pnjr </td>
				    <td class='istyle12'>Jml. Bayar </td>
				  </tr>";
		$tghn=$npry=$nspb=$npnj=$nptg=$nbyr=0;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.= "<tr>
					    <td class='istyle14' align='center'>$i</td>
					    <td class='istyle14'>".$row->no_proyek."</td>
					    <td class='istyle14'>".$row->tglawl."</td>
					    <td class='istyle14'>".$row->tglend."</td>
					    <td class='istyle14'>".$row->no_dokumen."</td>
					    <td class='istyle14'>".$row->keterangan."</td>
					    <td class='istyle14'>".$row->nmcust."</td>
					    <td class='istyle14'>".$row->nmpp."</td>
					    <td class='istyle14' align='right'>".number_format($row->nilai,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->tghn,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->nspb,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->npj,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->nptg,0,",",".")."</td>
					    <td class='istyle14' align='right'>".number_format($row->byr,0,",",".")."</td>
					    <td class='istyle14' align='center'>".number_format($row->varians,2,",",".")."</td>
					  </tr>";
			$i=$i+1;
			$npry+=$row->nilai;
			$tghn+=$row->tghn;
			$nspb+=$row->nspb;
			$npnj+=$row->npj;
			$nptg+=$row->nptg;
			$nbyr+=$row->byr;
		}
		$html.= "<tr bgcolor='#CCCCCC'>
				    <td class='istyle12' align='center' colspan='8'>T O T A L</td>
				    <td class='istyle12' align='right'>".number_format($npry,0,",",".")."</td>
				    <td class='istyle12' align='right'>".number_format($tghn,0,",",".")."</td>
				    <td class='istyle12' align='right'>".number_format($nspb,0,",",".")."</td>
				    <td class='istyle12' align='right'>".number_format($npnj,0,",",".")."</td>
				    <td class='istyle12' align='right'>".number_format($nptg,0,",",".")."</td>
				    <td class='istyle12' align='right'>".number_format($nbyr,0,",",".")."</td>
				    <td class='istyle12'>&nbsp;</td>
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
