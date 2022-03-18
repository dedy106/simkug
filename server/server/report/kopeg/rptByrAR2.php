<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptByrAR2
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
		$sql = "select count(distinct a.no_bukti) 
			from kop_arbayar_m a inner join kop_arbayar_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			inner join kop_ar_m c on b.no_ar=c.no_ar and b.kode_lokasi=c.kode_lokasi
			inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi ".$this->filter;
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
		$sql0="select distinct a.no_bukti 
			from kop_arbayar_m a inner join kop_arbayar_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			inner join kop_ar_m c on b.no_ar=c.no_ar and b.kode_lokasi=c.kode_lokasi
			inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_bukti,c.kode_cust,d.nama as nmcust,date_format(c.tanggal,'%d/%m/%Y') as tglakru,a.keterangan,a.nilai as tghn,a.nilai_pph,b.nilai
				from kop_arbayar_m a inner join kop_arbayar_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
				inner join kop_ar_m c on b.no_ar=c.no_ar and b.kode_lokasi=c.kode_lokasi
				inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi ".$this->filter.
				" and a.no_bukti='".$page->fields[0]."' order by a.no_bukti ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html=$AddOnLib->judul_laporan("LAPORAN DAFTAR PENERIMAAN PEMBAYARAN PIUTANG<br />NO. KWITANSI : ".$rs->no_bukti,$this->filter2,$AddOnLib->ubah_periode($periode));
			$html.=	"<table width='810' border='1' align='center' cellpadding='1' cellspacing='0' class='kotak'>
					  <tr align='center' bgcolor='#CCCCCC'>
					    <td class='istyle18'>No.</td>
						<td class='istyle18'>No. Bukti</td>
					    <td class='istyle18'>Customer</td>
					    <td class='istyle18'>Tgl Akru</td>
					    <td class='istyle18'>Keterangan</td>
					    <td class='istyle18'>Nilai Tagihan</td>
					    <td class='istyle18'>Nilai PPh</td>
						<td class='istyle18'>Nilai Bayar</td>
					  </tr>";
			$data=$dbLib->execute($sql);
			$tot1=$tot2=$tot3=$tot4=0;
			$l=1;
			while ($dt = $data->FetchNextObject($toupper=false))
			{
				$html.="<tr valign='top'>
					    <td class='istyle15' align='center'>".$l.".</td>
						<td class='istyle15'>".$dt->no_bukti."</td>
					    <td class='istyle15'>".$dt->kode_cust."-".$dt->nmcust."</td>
					    <td class='istyle15'>".$dt->tglakru."</td>
						<td class='istyle15'>".$dt->keterangan."</td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->tghn,0,",",".")."</td>
						      </tr>
						    </table></td>
						<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->nilai_pph,0,",",".")."</td>
						      </tr>
						    </table></td>
						<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>&nbsp;</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->nilai,0,",",".")."</td>
						      </tr>
						    </table></td>
					  </tr>";
				$tot2+=$dt->tghn;
				$tot3+=$dt->nilai_pph;
				$tot4+=$dt->nilai;
				$l++;
			}
			$html.="<tr bgcolor='#F5F5F5'>
					<td colspan='5' class='istyle18' align='right'>Total : </td>
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