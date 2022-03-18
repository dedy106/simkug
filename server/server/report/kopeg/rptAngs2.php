<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptAngs2
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
		$sql = "select count(distinct a.no_angs) 
			from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi
			inner join kop_pbrgbill_d c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi
			inner join kop_pbrg_m d on d.no_pbrg=c.no_pbrg and d.kode_lokasi=c.kode_lokasi
			inner join kop_agg e on e.kode_agg=d.kode_agg and e.kode_lokasi=d.kode_lokasi
			inner join kop_pbrgbill_m f on f.no_bill=c.no_bill and f.kode_lokasi=c.kode_lokasi ".$this->filter;
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
		$sql0="select distinct a.no_angs 
			from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi
			inner join kop_pbrgbill_d c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi
			inner join kop_pbrg_m d on d.no_pbrg=c.no_pbrg and d.kode_lokasi=c.kode_lokasi
			inner join kop_agg e on e.kode_agg=d.kode_agg and e.kode_lokasi=d.kode_lokasi
			inner join kop_pbrgbill_m f on f.no_bill=c.no_bill and f.kode_lokasi=c.kode_lokasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_angs,e.nama,e.kode_agg,c.cicilan_ke,date_format(f.tanggal,'%d/%m/%Y') as tglakru,
				c.npokok,c.nbunga,ifnull(aa.nangs,0) as angs,d.nilai+c.nbunga-ifnull(aa.nangs,0) as baki
				from kop_pbrgangs_m a inner join kop_pbrgangs_d b on a.no_angs=b.no_angs and a.kode_lokasi=b.kode_lokasi and a.jenis='PBRGANGS' 
				inner join kop_pbrgbill_d c on b.no_pbrg=c.no_pbrg and b.kode_lokasi=c.kode_lokasi
				inner join kop_pbrg_m d on d.no_pbrg=c.no_pbrg and d.kode_lokasi=c.kode_lokasi
				inner join kop_agg e on e.kode_agg=d.kode_agg and e.kode_lokasi=d.kode_lokasi
				inner join kop_pbrgbill_m f on f.no_bill=c.no_bill and f.kode_lokasi=c.kode_lokasi
				left outer join (select no_kontrak,no_pbrg,kode_lokasi,date_format(tanggal,'%Y%m') as per, sum(npokok+nbunga) as nangs 
					from kop_pbrgangs_d group by no_kontrak,no_pbrg,kode_lokasi,date_format(tanggal,'%Y%m')) aa 
					on aa.no_kontrak=d.no_kontrak and aa.no_pbrg=c.no_pbrg and aa.kode_lokasi=d.kode_lokasi and date_format(f.tanggal,'%Y%m') = aa.per ".$this->filter.
				" and a.no_angs='".$page->fields[0]."' order by a.no_angs ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html=$AddOnLib->judul_laporan("LAPORAN DAFTAR ANGSURAN<br />NO. KWITANSI : ".$rs->no_angs,$this->filter2,$AddOnLib->ubah_periode($periode));
			$html.=	"<table width='810' border='1' align='center' cellpadding='1' cellspacing='0' class='kotak'>
					  <tr align='center' bgcolor='#CCCCCC'>
					    <td class='istyle18'>No.</td>
						<td class='istyle18'>No. Bukti</td>
					    <td class='istyle18'>Nama Nasabah</td>
					    <td class='istyle18'>Cicilan Ke</td>
					    <td class='istyle18'>Tgl Akru</td>
					    <td class='istyle18'>Pokok</td>
					    <td class='istyle18'>Jasa</td>
					    <td class='istyle18'>Angsuran</td>
						<td class='istyle18'>BAKI</td>
					  </tr>";
			$data=$dbLib->execute($sql);
			$tot1=$tot2=$tot3=$tot4=0;
			$l=1;
			while ($dt = $data->FetchNextObject($toupper=false))
			{
				$html.="<tr valign='top'>
					    <td class='istyle15' align='center'>".$l.".</td>
						<td class='istyle15'>".$dt->no_angs."</td>
					    <td class='istyle15'>".$dt->nama."-".$dt->kode_agg."</td>
					    <td class='istyle15' align='center'>".$dt->cicilan_ke."</td>
					    <td class='istyle15'>".$dt->tglakru."</td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->npokok,0,",",".")."</td>
						      </tr>
						    </table></td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->nbunga,0,",",".")."</td>
						      </tr>
						    </table></td>
						<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->angs,0,",",".")."</td>
						      </tr>
						    </table></td>
						<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->baki,0,",",".")."</td>
						      </tr>
						    </table></td>
					  </tr>";
				$tot1+=$dt->npokok;
				$tot2+=$dt->nbunga;
				$tot3+=$dt->angs;
				$tot4+=$dt->baki;
				$l++;
			}
			$html.="<tr bgcolor='#F5F5F5'>
					<td colspan='5' class='istyle18' align='right'>Total : </td>
					<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($tot1,0,",",".")."</td>
						      </tr>
						    </table></td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($tot2,0,",",".")."</td>
						      </tr>
						    </table></td>
						<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($tot3,0,",",".")."</td>
						      </tr>
						    </table></td>
						<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($tot4,0,",",".")."</td>
						      </tr>
						    </table></td>
				  </tr></table>";
			$html.="<br />";
			$page->MoveNext();
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