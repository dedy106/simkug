<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptBill2
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
		$sql = "select count(distinct a.no_bill) ".
			"from kop_pbrgbill_m a ".$this->filter2;
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
		$sql0="select distinct a.no_bill ".
              "from kop_pbrgbill_m a ".$this->filter2;
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		$filter=explode("/",$this->filter);
		while (!$page->EOF)
		{
			$sql = "select a.no_bill,b.no_kontrak,c.kode_agg,upper(d.nama) as nm,c.nilai,c.lama_bayar,c.p_bunga,b.cicilan_ke,b.npokok,b.nbunga,b.npokok+b.nbunga as tghn 
				from kop_pbrgbill_m a inner join kop_pbrgbill_d b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi 
				inner join kop_pbrg_m c on b.no_pbrg=c.no_pbrg and b.no_kontrak=c.no_kontrak and b.kode_lokasi=c.kode_lokasi 
				inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi 
				inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi ".$filter[0].
				" and a.no_bill='".$page->fields[0]."' order by d.kode_loker,c.no_pbrg ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html=$AddOnLib->judul_laporan("LAPORAN DAFTAR AKRU KREDIT BARANG<br />NO. AKRU : ".$rs->no_bill,$filter[1],$AddOnLib->ubah_periode($periode));
			$html.=	"<table width='810' border='1' align='center' cellpadding='1' cellspacing='0' class='kotak'>
					  <tr align='center' bgcolor='#CCCCCC'>
					    <td class='istyle18'>No.</td>
						<td class='istyle18'>No. Kontrak</td>
					    <td class='istyle18'>Nama Nasabah</td>
					    <td class='istyle18'>Harga</td>
					    <td class='istyle18'>Jangka Waktu</td>
					    <td class='istyle18'>Bunga</td>
					    <td class='istyle18'>Cicilan Ke</td>
					    <td class='istyle18'>Pokok</td>
						<td class='istyle18'>Margin</td>
						<td class='istyle18'>Nilai Tagihan</td>
					  </tr>";
			$data=$dbLib->execute($sql);
			$tot1=$tot2=$tot3=$tot4=0;
			$l=1;
			while ($dt = $data->FetchNextObject($toupper=false))
			{
				$html.="<tr valign='top'>
					    <td class='istyle15' align='center'>".$l.".</td>
						<td class='istyle15'>".$dt->no_kontrak."</td>
					    <td class='istyle15'>".$dt->kode_agg."-".$dt->nm."</td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>Rp.</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->nilai,0,",",".")."</td>
						      </tr>
						    </table></td>
					    <td class='istyle15' align='center'>".$dt->lama_bayar."</td>
					    <td class='istyle15' align='center'>".$dt->p_bunga."%</td>
						<td class='istyle15' align='center'>".$dt->cicilan_ke."</td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>Rp.</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->npokok,0,",",".")."</td>
						      </tr>
						    </table></td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>Rp.</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->nbunga,0,",",".")."</td>
						      </tr>
						    </table></td>
						<td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>Rp.</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->tghn,0,",",".")."</td>
						      </tr>
						    </table></td>
					  </tr>";
				$tot1+=$dt->nilai;
				$tot2+=$dt->npokok;
				$tot3+=$dt->nbunga;
				$tot4+=$dt->tghn;
				$l++;
			}
			$html.="<tr bgcolor='#F5F5F5'>
					<td colspan='3' class='istyle18' align='right'>Total : </td>
					<td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
						<td width='15%' class='istyle15'>Rp.</td>
						<td width='85%' class='istyle15' align='right'>".number_format($tot1,0,",",".")."</td>
					  </tr>
					</table></td>
					<td colspan='3'>&nbsp;</td>
					<td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
						<td width='15%' class='istyle15'>Rp.</td>
						<td width='85%' class='istyle15' align='right'>".number_format($tot2,0,",",".")."</td>
					  </tr>
					</table></td>
					<td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
						<td width='15%' class='istyle15'>Rp.</td>
						<td width='85%' class='istyle15' align='right'>".number_format($tot3,0,",",".")."</td>
					  </tr>
					</table></td>
					<td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
						<td width='15%' class='istyle15'>Rp.</td>
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