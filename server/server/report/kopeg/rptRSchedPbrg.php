<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptRSchedPbrg
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
		
		$sql = "select count(distinct a.no_pbrg) ".
			"from kop_pbrg_m a   inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi ".$this->filter;
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
		$sql0="select distinct a.no_pbrg ".
              "from kop_pbrg_m a  inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi  ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);		
				
		while (!$page->EOF)
		{			
			$sql = "select distinct c.cicilan_ke,a.kode_agg,upper(b.nama) as nm,a.nilai,a.p_bunga,a.lama_bayar,a.nilai_tagihan, ifnull(d.no_bill,'-') as no_bill, 
				d.npokok,d.nbunga, date_format(c.tgl_angs, '%d/%m/%Y') as tgltagih, ifnull(aa.npokok + aa.nbunga,0) as nangs, ifnull(aa.npokok,0) as angspokok, ifnull(aa.nbunga,0) as angsbunga,
				c.saldo as saldo,case when f.tanggal is null then '-' else date_format(f.tanggal,'%d/%m/%Y') end as tglangs,
				concat(substring(cast(monthname(f.tanggal) as char),1,3),'-',date_format(f.tanggal,'%y'))as bln, ifnull(f.no_angs, '-') as no_angs
				from kop_pbrg_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
				left outer join kop_pbrg_sch c on a.no_pbrg=c.no_pbrg and a.kode_lokasi=c.kode_lokasi 
				left outer join kop_pbrgbill_d d on d.no_pbrg = c.no_pbrg and d.kode_lokasi = c.kode_lokasi and d.cicilan_ke = c.cicilan_ke
				left outer join kop_pbrgbill_m e on e.no_bill = d.no_bill and e.kode_lokasi = d.kode_lokasi 
				left outer join kop_pbrgangs_d aa on aa.no_kontrak = a.no_kontrak and aa.no_pbrg = a.no_pbrg and aa.kode_lokasi=a.kode_lokasi and (date_format(e.tanggal,'%Y%m') = date_format(aa.tanggal,'%Y%m') or (e.tanggal is null and aa.no_angs like '%PK%') )
				left outer join kop_pbrgangs_m f on f.no_angs = aa.no_angs and f.kode_lokasi = aa.kode_lokasi
				".$this->filter.
				" and a.no_pbrg='".$page->fields[0]."' order by c.cicilan_ke ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$data0=$dbLib->execute($sql);
			$tpokok=0;
			$tmargin=0;
			while ($tot = $data0->FetchNextObject($toupper=false))
			{
				$tpokok+=$tot->npokok;
				$tmargin+=$tot->nbunga;
			}
			$total = $tpokok+$tmargin;
			$AddOnLib=new server_util_AddOnLib();
			$html="<br />";
			$html.=	"<table width='900' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
					    <td colspan='6' align='center' class='nstyle18'>REALISASI SCHEDULE ANGSURAN</td>
					  </tr>
					  <tr><td colspan='6' class='istyle16' align='center'>NOMOR: ".$page->fields[0]."</td>
					  </tr>
					  <tr>
					    <td colspan='6'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td width='191' class='istyle16'>NAMA KONSUMEN</td>
					    <td width='32' class='istyle16' align='center'>:</td>
					    <td colspan='4' class='istyle16'>".$rs->nm." - ".$rs->kode_agg."</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Jumlah Pinjaman</td>
					    <td class='istyle15' align='center'>:</td>
					    <td class='istyle15' width='19'>Rp.</td>
					    <td class='istyle15' width='136' align='right'>".number_format($rs->nilai,0,",",".")."</td>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Suku Bunga Efektif / tahun</td>
					    <td class='istyle15' align='center'>:</td>
					    <td>&nbsp;</td>
					    <td class='istyle15' align='right'>".$rs->p_bunga."%</td>
					    <td class='istyle15' width='30'  align='center'>=</td>
					    <td class='istyle15' width='468'>".number_format($rs->p_bunga/12,3,",",".")."% &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;per bulan</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Jangka Waktu (bulan)</td>
					    <td class='istyle15' align='center'>:</td>
					    <td>&nbsp;</td>
					    <td class='istyle15' align='right'>".$rs->lama_bayar."</td>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td>Angsuran</td>
					    <td align='center'>:</td>
					    <td>Rp.</td>
					    <td align='right'>".number_format($rs->nilai_tagihan,0,",",".")."</td>
					    <td>&nbsp;</td>
					    <td>Denda harian &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;0,15%</td>
					  </tr>
					  <tr>
					    <td>Total angsuran</td>
					    <td align='center'>:</td>
					    <td>Rp.</td>
					    <td align='right'>".number_format($total,0,",",".")."</td>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td>Total Bunga</td>
					    <td align='center'>:</td>
					    <td>Rp.</td>
					    <td align='right'>".number_format($tmargin,0,",",".")."</td>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='6'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='6'><table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					      <tr align='center'>
					        <td width='5%' class='istyle18'>ANGS KE </td>
					        <td class='istyle18' width='5%'>ANGS BLN</td>
					        <td class='istyle18' width='7%'>TGL JTH TEMPO </td>
					        <td class='istyle18' width='13%'>TAGIHAN POKOK</td>
					        <td class='istyle18' width='13%'>TAGIHAN MARGIN </td>
					        <td class='istyle18' width='13%'>TOTAL TAGIHAN</td>
					        <td class='istyle18' width='13%'>ANGSURAN POKOK</td>
					        <td class='istyle18' width='13%'>ANGSURAN MARGIN </td>
					        <td class='istyle18' width='13%'>REALISASI ANGSURAN </td>
					        <td class='istyle18' width='8%'>TANGGAL REALISASI </td>
					        <td class='istyle18' width='13%'>No. ANGSURAN </td>
					        <td class='istyle18' width='14%'>BAKI DEBET </td>
					        <td class='istyle18' width='9%'>MARGIN TAKTERBAYAR</td>
					      </tr>";
				$baki = $rs->nilai;
				$data=$dbLib->execute($sql);
				$cicilan_ke = -1;
				$saldo = 0;
				$totangs = 0;
				$saldoSblm = 0;
				$saldoJs = 0;
				$bungaTakTeByr = 0;
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					if ($cicilan_ke != $dt->cicilan_ke){
						$saldoSblm = $saldo;
						$saldo = $dt->nbunga + $dt->npokok;
						$cicilan_ke = $dt->cicilan_ke;												
						$saldoJs = $dt->nbunga;
						$bungaTakTeByr += $dt->nbunga;
					}
					$saldo -= $dt->nangs;					
					$saldoJs -= $dt->angsbunga;								
					$bungaTakTeByr -= $dt->angsbunga;
					$baki += $saldoJs - $dt->angspokok;// baki + ($nbunga - angsbunga) - angspokok
					if (($baki == $dt->nbunga || $baki <= 0) && $dt->no_bill == "-") {		
						if ($baki <= 0){
							$dt->angspokok = 0;
							$dt->angsbunga = 0;
							$dt->nangs = 0;
						}				
						$baki = 0;
						$saldo = 0;
						$bungaTakTeByr = 0;
					}
					$denda = $bungaTakTeByr;
					$tgl1 = explode("/",$dt->tgltagih);
					$tgl3 = date("Ym", mktime(0,0,0,$tgl1[1], $tgl1[0], $tgl1[2]));
					$tgl2 = date("Ym");								
					if ($tgl3 >= $tgl2 && $dt->no_bill == "-" ) {
						$denda = 0;											
					}
					if ($dt->no_bill == "-" && $dt->no_angs == "-" && $baki != 0){						
						$bungaTakTeByr -= $dt->nbunga;						
						$baki = $dt->saldo + $bungaTakTeByr;
					}
					$html.="<tr>
					        <td class='istyle15' align='center'>".$dt->cicilan_ke."</td>
					        <td class='istyle15' align='center'>".$dt->bln."</td>
					        <td class='istyle15' align='center'>".$dt->tgltagih."</td>
					        <td class='istyle15' align='right'>".number_format($dt->npokok,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->nbunga,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->nbunga+$dt->npokok,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->angspokok,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->angsbunga,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->nangs,0,",",".")."</td>					        
					        <td class='istyle15' align='center' width='200' >".$dt->tglangs."</td>
					        <td class='istyle15' >$dt->no_angs</td>
					        <td class='istyle15' align='right'>".number_format($baki,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($denda,0,",",".")."</td>					        
					      </tr>";
				}
				$html .= "</table></td>
					  </tr>
					</table>";
			$html .= "<br />";
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
