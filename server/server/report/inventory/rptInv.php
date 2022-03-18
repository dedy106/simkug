<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_inventory_rptInv
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
		
		$sql = "select count(distinct a.no_inv) ".
			"from inv_invoice_m a ".$this->filter2;
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
		$sql0 = "select distinct a.no_inv ".
			"from inv_invoice_m a ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_inv,b.no_sj,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.term,date_format(a.tgl_jt,'%d/%m/%Y') as tgljt,
				c.nama as nmcust,concat(c.alamat,' ',c.kota) as almt,e.nama as nmbrg,d.jumlah,d.harga,d.jumlah*d.harga as subtot,d.satuan,
				a.nilai,a.nilai_diskon,a.nilai-a.nilai_diskon as disc,a.nilai_ppn,a.nilai-a.nilai_diskon+a.nilai_ppn as tot
				from inv_invoice_m a inner join inv_invoice_d b on a.no_inv=b.no_inv and a.kode_lokasi=b.kode_lokasi
				inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
				inner join inv_sj_d d on b.no_sj=d.no_sj and b.kode_lokasi=d.kode_lokasi
				inner join inv_brg e on d.kode_barang=e.kode_brg and d.kode_lokasi=e.kode_lokasi ".$this->filter.
				" and a.no_inv='".$page->fields[0]."' order by b.no_sj ";
			
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			/*$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";*/
			$html="<br />";
			$html.=	"<table width='700' border='0' align='center' cellpadding='3' cellspacing='0'>
					  <tr>
					    <td colspan='2' align='center' class='nstyle17'>PT. SAMUDERA INDUSTRI</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' class='istyle18'>Jln. Terusan Kopo Km. 11 No. 76 Cilampeni Kec. Katapang, Bandung <br />
					    Telp. 5891495 (Hunting) Fax. : 5891224</td>
					  </tr>
					  <tr>
					    <td height='20' colspan='2' style='border-bottom:3px solid #111111;'></td>
					  </tr>
					   <tr>
					    <td colspan='2' align='center' class='nstyle17'>INVOICE</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td width='350'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td width='27%' class='istyle15'>NO. INVOICE </td>
					        <td width='4%' align='center' class='istyle15'>:</td>
					        <td width='69%' class='istyle15'>".$rs->no_inv."</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>Date</td>
					        <td class='istyle15' align='center'>:</td>
					        <td class='istyle15'>".$rs->tgl."</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>Order Number </td>
					        <td class='istyle15' align='center'>:</td>
					        <td class='istyle15'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>Terms</td>
					        <td class='istyle15' align='center'>:</td>
					        <td class='istyle15'>".$rs->term."</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>Due Date</td>
					        <td class='istyle15' align='center'>:</td>
					        <td class='istyle15'>".$rs->tgljt."</td>
					      </tr>
					    </table></td>
					    <td width='350'><table width='100%' height='109' border='0' cellpadding='3' cellspacing='0'>
					      <tr>
					        <td height='98' style='border:1px solid #111111' valign='top' class='istyle15'>To :<br />
					          ".$rs->nmcust."<br />
					          ".$rs->almt."</td>
					      </tr>
						</table></td>
					  </tr>
					  <tr>
					    <td colspan='2' style='padding-top:10px;'><table width='100%' border='1' cellspacing='0' cellpadding='3' class='kotak'>
					      <tr align='center'>
					        <td class='istyle15' width='5%'>No.</td>
					        <td class='istyle15' width='17%'>Quantity</td>
					        <td class='istyle15' width='45%'>Description</td>
					        <td class='istyle15' width='15%'>Price/Unit</td>
					        <td class='istyle15' width='18%'>Amount</td>
					      </tr>
					      <tr>
					        <td height='382' valign='top'>";
				$l=1;
				$temp=$dbLib->execute($sql);
				while ($no = $temp->FetchNextObject($toupper=false)){
					$html.="<table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td class='istyle15' align='center'>".$l.".</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>&nbsp;</td>
					          </tr>
					        </table>";
					$l++;
				}
					$html.="</td>
					        <td valign='top'>";
				$temp2=$dbLib->execute($sql);
				while ($row = $temp2->FetchNextObject($toupper=false)){
					$html.="<table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td class='istyle15' align='center'>".$row->jumlah." ".$row->satuan."</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>&nbsp;</td>
					          </tr>
					        </table>";
				}
					$html.="</td>
					        <td valign='top'>";
				$temp3=$dbLib->execute($sql);
				while ($row1 = $temp3->FetchNextObject($toupper=false)){
					$html.="<table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td class='istyle15'>".$row1->nmbrg."</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>No. SJ : ".$row1->no_sj."</td>
					          </tr>
					        </table>";
				}
					$html.="</td>
					        <td valign='top'>";
				$temp4=$dbLib->execute($sql);
				while ($row2 = $temp4->FetchNextObject($toupper=false)){
					$html.="<table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td width='26%' class='istyle15'>Rp.</td>
					            <td width='74%' class='istyle15' align='right'>".number_format($row2->harga,0,",",".")."</td>
					          </tr>
					          <tr>
					            <td colspan='2' class='istyle15'>&nbsp;</td>
					          </tr>
					        </table>";
				}
					$html.="</td>
					        <td valign='top'>";
				$temp5=$dbLib->execute($sql);
				while ($row3 = $temp5->FetchNextObject($toupper=false)){
					$html.="<table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td width='21%' class='istyle15'>Rp.</td>
					            <td width='79%' class='istyle15' align='right'>".number_format($row3->subtot,0,",",".")."</td>
					          </tr>
					          <tr>
					            <td colspan='2' class='istyle15'>&nbsp;</td>
					          </tr>
					        </table>";
				}
					$html.="</td>
					      </tr>
					      <tr>
					        <td colspan='5'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td width='79%' class='istyle15'>Total</td>
					            <td width='3%' class='istyle15'>Rp.</td>
					            <td width='18%' class='istyle15' align='right'>".number_format($rs->nilai,0,",",".")."</td>
					          </tr>
					        </table></td>
					        </tr>
					      <tr>
					        <td colspan='5'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td width='79%' class='istyle15'>Discount</td>
					            <td width='3%' class='istyle15'>Rp.</td>
					            <td width='18%' class='istyle15' align='right'>".number_format($rs->nilai_diskon,0,",",".")."</td>
					          </tr>
					        </table></td>
					        </tr>
					      <tr>
					        <td colspan='5'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td width='79%' class='istyle15'>Total Amount Sales/Tax Base </td>
					            <td width='3%' class='istyle15'>Rp.</td>
					            <td width='18%' class='istyle15' align='right'>".number_format($rs->disc,0,",",".")."</td>
					          </tr>
					        </table></td>
					        </tr>
					      <tr>
					        <td colspan='5'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td width='79%' class='istyle15'>Value Add Tax 10% </td>
					            <td width='3%' class='istyle15'>Rp.</td>
					            <td width='18%' class='istyle15' align='right'>".number_format($rs->nilai_ppn,0,",",".")."</td>
					          </tr>
					        </table></td>
					        </tr>
					      <tr>
					        <td colspan='5'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td width='79%' class='istyle15'>Grand Total </td>
					            <td width='3%' class='istyle15'>Rp.</td>
					            <td width='18%' class='istyle15' align='right'>".number_format($rs->tot,0,",",".")."</td>
					          </tr>
					        </table></td>
					        </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					      <tr>
					        <td class='istyle15' width='69%' rowspan='2'>SAYS : ".$AddOnLib->terbilang($rs->tot)."</td>
					        <td class='istyle15' width='31%' align='center'>Authorized Signature </td>
					      </tr>
					      <tr>
					        <td align='center' valign='top' class='istyle18'>PT. SAMUDERA INDUSTRI </td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					        <tr>
					          <td width='69%'><table width='269' border='1' align='right' cellpadding='3' cellspacing='0' class='kotak2'>
					            <tr>
					              <td height='45' class='istyle14'>Please ensure goods are in good order and condition<br />
					                When receiving good sold are not returnable </td>
					            </tr>
					          </table></td>
					          <td width='31%'>&nbsp;</td>
					        </tr>
					      </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' align='center' class='istyle14'>Thank you for your continuous support </td>
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