<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_inventory_rptSO
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
		
		$sql = "select count(distinct a.no_so) ".
			"from inv_so_m a ".$this->filter2;
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
		$sql0="select distinct a.no_so ".
              "from inv_so_m a ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_so,date_format(a.tanggal,'%d/%m/%Y') as tgl,c.nama as nmcust,concat(c.alamat,' ',c.kota) as almt,
				c.no_telp,d.nama as nmbrg,b.harga,b.jumlah,b.diskon,b.keterangan,b.harga*b.jumlah as jmlh
				from inv_so_m a inner join inv_so_d b on a.no_so=b.no_so and a.kode_lokasi=b.kode_lokasi
				inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
				inner join inv_brg d on b.kode_barang=d.kode_brg and b.kode_lokasi=d.kode_lokasi ".$this->filter.
				" and a.no_so='".$page->fields[0]."' order by a.no_so ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			/*$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";*/
			$html="<br />";
			$html.=	"<table width='650' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
					    <td colspan='4' class='istyle17'>SALES ORDER</td>
					    <td class='istyle15' valign='bottom'>Tanggal</td>
					    <td class='istyle15' align='center' valign='bottom'>:</td>
					    <td class='istyle15' valign='bottom'>".$rs->tgl."</td>
					  </tr>
					  <tr>
					    <td colspan='4'>&nbsp;</td>
					    <td class='istyle15' width='150'>Jangka Waktu Pembayaran </td>
					    <td class='istyle15' width='8' align='center'>:</td>
					    <td class='istyle15' width='142'>-</td>
					  </tr>
					  <tr>
					    <td class='istyle15' width='69'>CUSTOMER</td>
					    <td class='istyle15' width='9' align='center'>:</td>
					    <td class='istyle15' width='240'>".$rs->nmcust."</td>
					    <td width='4'>&nbsp;</td>
					    <td class='istyle15'>No. SO </td>
					    <td class='istyle15' align='center'>:</td>
					    <td class='istyle15'>".$rs->no_so."</td>
					  </tr>
					  <tr>
					    <td class='istyle15' valign='top'>Alamat</td>
					    <td class='istyle15' align='center' valign='top'>:</td>
					    <td class='istyle15' valign='top'>".$rs->almt."</td>
					    <td>&nbsp;</td>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>No. Telepon</td>
					    <td class='istyle15' align='center'>:</td>
					    <td class='istyle15'>".$rs->no_telp."</td>
					    <td>&nbsp;</td>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='7' style='padding-top:6px;'><table width='100%' border='1' cellspacing='0' cellpadding='3' class='kotak'>
					      <tr align='center'>
					        <td class='istyle15' width='5%'>NO.</td>
					        <td class='istyle15' width='5%'>QTY</td>
					        <td class='istyle15' width='35%'>N a m a &nbsp;&nbsp;B a r a n g </td>
					        <td class='istyle15' width='9%'>Harga Satuan</td>
					        <td class='istyle15' width='9%'>Jumlah Harga</td>
					        <td class='istyle15' colspan='2'>K e t e r a n g a n</td>
					      </tr>";
				$l=1;
				$jum=0;
				$temp=$dbLib->execute($sql);
				while ($row = $temp->FetchNextObject($toupper=false)){
					$html.="<tr>
					        <td><div class='istyle15' align='center'>".$l.".</div></td>
					        <td><div class='istyle15' align='center'>".$row->jumlah."</div></td>
					        <td class='istyle15'>".$row->nmbrg."</td>
					        <td><div class='istyle15' align='right'>".number_format($row->harga,0,",",".")."</div></td>
					        <td><div class='istyle15' align='right'>".number_format($row->jmlh,0,",",".")."</div></td>
					        <td class='istyle15' colspan='2'>".$row->keterangan."</td>
					      </tr>";
					$l++;
					$jum+=$row->jmlh;
				}
				$disc=$rs->diskon*$jum/100;
				$tot=$jum-$disc;
				while ($l<=10){
					$html.="<tr>
					        <td><div align='center'></div></td>
					        <td><div align='center'></div></td>
					        <td>&nbsp;</td>
					        <td><div align='right'></div></td>
					        <td><div align='right'></div></td>
					        <td colspan='2'>&nbsp;</td>
					      </tr>";
					$l++;
				}
					$html.="<tr>
					        <td><div align='center'></div></td>
					        <td><div align='center'></div></td>
					        <td>&nbsp;</td>
					        <td><div align='right'></div></td>
					        <td><div align='right'></div></td>
					        <td class='istyle15' width='19%' rowspan='3' align='center' valign='top'>Pemesan/Customer</td>
					        <td class='istyle15' width='18%' rowspan='3' align='center' valign='top'>Pesanan Disetujui</td>
					      </tr>
					      <tr>
					        <td><div align='center'></div></td>
					        <td><div align='center'></div></td>
					        <td>&nbsp;</td>
					        <td><div align='right'></div></td>
					        <td><div align='right'></div></td>
					        </tr>
					      <tr>
					        <td><div align='center'></div></td>
					        <td><div align='center'></div></td>
					        <td>&nbsp;</td>
					        <td><div align='right'></div></td>
					        <td><div align='right'></div></td>
					        </tr>
					      <tr>
					        <td colspan='2' rowspan='3' style='border-left-width:0px; border-bottom-width:0px;'>&nbsp;</td>
					        <td class='istyle15'>Jumlah</td>
					        <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td class='istyle15' width='22%'>Rp.</td>
					            <td class='istyle15' width='78%' align='right'>".number_format($jum,0,",",".")."</td>
					          </tr>
					        </table></td>
					        <td class='istyle15' width='19%' rowspan='3' align='center' valign='top'>Kabag/Supervisor</td>
					        <td class='istyle15' width='18%' rowspan='3' align='center' valign='top'>Direktur</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>Diskon</td>
					        <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td class='istyle15' width='22%'>Rp.</td>
					            <td class='istyle15' width='78%' align='right'>".number_format($disc,0,",",".")."</td>
					          </tr>
					        </table></td>
					       </tr>
					      <tr>
					        <td class='istyle15'>Jumlah Bersih</td>
					        <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td class='istyle15' width='22%'>Rp.</td>
					            <td class='istyle15' width='78%' align='right'>".number_format($tot,0,",",".")."</td>
					          </tr>
					        </table></td>
					        </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='7'>&nbsp;</td>
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
