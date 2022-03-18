<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptBill
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
		$sql = "select count(distinct b.no_pbrg) 
			from kop_pbrgbill_m a inner join kop_pbrgbill_d b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
			inner join kop_pbrg_m c on b.no_pbrg=c.no_pbrg and b.no_kontrak=c.no_kontrak and b.kode_lokasi=c.kode_lokasi 
			inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi
			inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi ".$this->filter;
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
		$sql0="select distinct b.no_pbrg 
			from kop_pbrgbill_m a inner join kop_pbrgbill_d b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
			inner join kop_pbrg_m c on b.no_pbrg=c.no_pbrg and b.no_kontrak=c.no_kontrak and b.kode_lokasi=c.kode_lokasi 
			inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi
			inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		$filter2=explode(";;",$this->filter2);
		while (!$page->EOF)
		{
			$sql = "select concat(b.no_pbrg,' - ',b.no_kontrak,' / ',a.periode) as nobuk,c.kode_agg,upper(d.nama) as nm,
				d.kode_loker,upper(e.nama) as loker,concat(d.alamat,' ',d.kota,' ',d.kode_pos) as almt,b.npokok,b.nbunga,
				b.npokok+b.nbunga as tghn,ifnull(f.utang,0) as tunggak,ifnull(f.utang,0)+b.npokok+b.nbunga as total
				from kop_pbrgbill_m a inner join kop_pbrgbill_d b on a.no_bill=b.no_bill and a.kode_lokasi=b.kode_lokasi
				inner join kop_pbrg_m c on b.no_pbrg=c.no_pbrg and b.no_kontrak=c.no_kontrak and b.kode_lokasi=c.kode_lokasi
				inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi
				inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi
				left join (select aa.kode_lokasi,bb.no_pbrg,bb.no_kontrak,sum((ifnull(bb.npokok,0)+ifnull(bb.nbunga,0))-(ifnull(cc.npokok,0)+ifnull(cc.nbunga,0))) as utang
					from kop_pbrgbill_m aa inner join kop_pbrgbill_d bb on aa.no_bill=bb.no_bill and aa.kode_lokasi=bb.kode_lokasi
					left join kop_pbrgangs_d cc on bb.no_pbrg=cc.no_pbrg and bb.no_kontrak=cc.no_kontrak and bb.kode_lokasi=cc.kode_lokasi
					where aa.periode<'".$filter2[0]."' group by bb.no_pbrg) f on b.no_pbrg=f.no_pbrg and b.no_kontrak=f.no_kontrak and b.kode_lokasi=f.kode_lokasi ".$this->filter.
				" and b.no_pbrg='".$page->fields[0]."' order by c.no_pbrg ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";
			$html="<br />";
			$html.=	"<table width='800' border='2' align='center' cellpadding='2' cellspacing='0' style='border-collapse:collapse; border-color:#111111'>
					  <tr>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td height='35' valign='top' style='border-collapse:collapse; border-bottom:2px solid #999999;'><table width='100%' height='25' border='0' cellpadding='0' cellspacing='0'>
					          <tr>
					            <td width='10%' rowspan='4' valign='top'><img src=$pathfoto width='80' height='100' /></td>
					            <td width='90%' align='right' class='istyle17'>LEMBAR PENAGIHAN</td>
					          </tr>
					          <tr>
					            <td align='right' class='istyle16'>TAGIHAN PERIODE : ".$rs->nobuk."</td>
					          </tr>
					          <tr>
					            <td align='right'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td style='border-collapse:collapse; border-bottom:1px solid #999999;'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td width='3%' rowspan='5'>&nbsp;</td>
					            <td colspan='3' class='istyle15'>Kepada Yth,</td>
					            <td width='3%' rowspan='5'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td width='19%' class='istyle15'>Kode / Nama Nasabah</td>
					            <td width='2%' align='center' class='istyle15'>:</td>
					            <td width='73%' class='istyle15'>".$rs->kode_agg." - ".$rs->nm."</td>
					            </tr>
					          <tr>
					            <td class='istyle15'>Lokasi Kerja </td>
					            <td class='istyle15' align='center'>:</td>
					            <td class='istyle15'>".$rs->kode_loker." - ".$rs->loker."</td>
					            </tr>
					          <tr valign='top'>
					            <td class='istyle15'>Alamat Nasabah </td>
					            <td class='istyle15' align='center'>:</td>
					            <td class='istyle15'>".$rs->almt."</td>
					            </tr>
					          <tr valign='top'>
					            <td colspan='3'>&nbsp;</td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td style='border-collapse:collapse; border-bottom:1px solid #999999;'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td colspan='7' height='10'></td>
					            </tr>
					          <tr>
					            <td width='29%'>&nbsp;</td>
					            <td class='istyle15' colspan='2'>Tunggakan Tagihan bulan yang lalu</td>
					            <td class='istyle15' width='2%'>:</td>
					            <td width='7%'>&nbsp;</td>
					            <td width='34%'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					              <tr>
					                <td width='10%' class='istyle15'>Rp.</td>
					                <td width='90%' align='right' class='istyle15'>".number_format($rs->tunggak,0,",",".")."</td>
					              </tr>
					            </table></td>
					            <td width='1%'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td class='istyle15' colspan='2'>Tagihan bulan ini </td>
					            <td>:</td>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td width='13%'>&nbsp;</td>
					            <td class='istyle15' width='14%'>Pokok</td>
					            <td class='istyle15'>:</td>
					            <td>&nbsp;</td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					              <tr>
					                <td width='10%' class='istyle15'>Rp.</td>
					                <td width='90%' align='right' class='istyle15'>".number_format($rs->npokok,0,",",".")."</td>
					              </tr>
					            </table></td>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='istyle15'>Jasa/Margin</td>
					            <td class='istyle15'>:</td>
					            <td>&nbsp;</td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					              <tr>
					                <td width='10%' class='istyle15'>Rp.</td>
					                <td width='90%' align='right' class='istyle15'>".number_format($rs->nbunga,0,",",".")."</td>
					              </tr>
					            </table></td>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='istyle15'>Tagihan bulan ini</td>
					            <td class='istyle15'>:</td>
					            <td>&nbsp;</td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					              <tr>
					                <td width='10%' class='istyle15'>Rp.</td>
					                <td width='90%' align='right' class='istyle15'>".number_format($rs->tghn,0,",",".")."</td>
					              </tr>
					            </table></td>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='istyle15'>Interest [%] </td>
					            <td class='istyle15'>:</td>
					            <td>&nbsp;</td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					              <tr>
					                <td width='10%' class='istyle15'>Rp.</td>
					                <td width='90%' align='right' class='istyle15'>0</td>
					              </tr>
					            </table></td>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='istyle15'>Denda</td>
					            <td class='istyle15'>:</td>
					            <td>&nbsp;</td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					              <tr>
					                <td width='10%' class='istyle15'>Rp.</td>
					                <td width='90%' align='right' class='istyle15'>0</td>
					              </tr>
					            </table></td>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='7' height='10'></td>
					            </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='istyle16' colspan='3'>Tagihan s/d bulan ini</td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					              <tr>
					                <td width='10%' class='istyle16'>Rp.</td>
					                <td width='90%' align='right' class='istyle16'>".number_format($rs->total,0,",",".")."</td>
					              </tr>
					            </table></td>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='7' height='10'></td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td valign='top' class='istyle14'>&nbsp;&nbsp;<em>".$AddOnLib->terbilang($rs->total)."</em></td>
					          </tr>
					          <tr>
					            <td height='5'></td>
					          </tr>
					          <tr>
					            <td align='right' class='istyle13'>".$filter2[1]."</td>
					          </tr>
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					</table>";
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