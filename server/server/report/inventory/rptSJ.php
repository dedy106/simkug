<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_inventory_rptSJ
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
		
		$sql = "select count(distinct a.no_sj) ".
			"from inv_sj_m a ".$this->filter2;
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
		$sql0 = "select distinct a.no_sj ".
			"from inv_sj_m a ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_sj,date_format(a.tanggal,'%d-%m-%Y') as tgl,c.nama as pmesan,concat(c.alamat,' ',c.kota) as almt,
				a.no_mobil,e.nama as nmbrg,b.jumlah,b.harga,b.keterangan,b.satuan,b.sat_rak,d.n1,d.n2,d.n3,d.n4,d.n5
				from inv_sj_m a inner join inv_sj_d b on a.no_sj=b.no_sj and a.kode_lokasi=b.kode_lokasi
				inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
				inner join inv_pl_d d on a.no_pl=d.no_pl and a.kode_lokasi=d.kode_lokasi and b.kode_barang=d.kode_barang
				inner join inv_brg e on b.kode_barang=e.kode_brg and b.kode_lokasi=e.kode_lokasi ".$this->filter.
				" and a.no_sj='".$page->fields[0]."' order by a.no_pl,b.sat_rak ";
			
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			/*$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";*/
			$html="<br />";
			$html.=	"<table width='650' border='0' align='center' cellpadding='3' cellspacing='0'>
					  <tr>
					    <td colspan='2' class='istyle17'>PT. SAMUDERA INDUSTRI</td>
					    <td colspan='2' valign='bottom'  class='istyle15'>Bandung, ".$rs->tgl."</td>
					  </tr>
					  <tr>
					    <td width='361' class='istyle15'>Jln. Kopo Km 11 No. 76 Cilampeni Katapang - Bandung </td>
					    <td width='48' class='istyle15'>Pemesan</td>
					    <td width='6' align='center' class='istyle15'>:</td>
					    <td width='211' class='istyle15'>".$rs->pmesan."</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Telp. (022) 589-1405 (Hunting) Fax. (022) 589-1224</td>
					    <td class='istyle15'>Penerima</td>
					    <td class='istyle15' align='center'>:</td>
					    <td class='istyle15'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td valign='top' class='istyle15'>Alamat</td>
					    <td class='istyle15' align='center' valign='top'>:</td>
					    <td class='istyle15' valign='top'>".$rs->almt."</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='4' class='istyle15'>SURAT JALAN NO : ".$rs->no_sj."</td>
					  </tr>
					  <tr>
					    <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					      <tr>
					        <td class='istyle15' width='32%'>Bersama ini Kendaraan Kami : </td>
					        <td class='istyle15' width='23%'>No. Pol. : ".$rs->no_mobil."</td>
					        <td class='istyle15' width='45%'>Mengirimkan barang-barang tersebut di bawah ini : </td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='4'><table width='100%' border='1' cellspacing='0' cellpadding='3' class='kotak'>
					      <tr align='center'>
					        <td class='istyle15' width='5%'>No.</td>
					        <td class='istyle15' width='12%'>Banyaknya</td>
					        <td class='istyle15' width='9%'>Roll</td>
					        <td class='istyle15' width='33%'>Nama Barang</td>
					        <td class='istyle15' width='25%'>Keterangan</td>
					        <td class='istyle15' width='16%'>Harga</td>
					      </tr>";
				$l=1;
				$jum=0;
				$temp=$dbLib->execute($sql);
				while ($row = $temp->FetchNextObject($toupper=false)){
					$roll=0;
					if ($row->n1 != 0) $roll++;
					if ($row->n2 != 0) $roll++;
					if ($row->n3 != 0) $roll++;
					if ($row->n4 != 0) $roll++;
					if ($row->n5 != 0) $roll++;
					$html.="<tr>
					        <td class='istyle15' align='center'>".$l.".</td>
					        <td class='istyle15' align='center'>".number_format($row->jumlah,0,",",".")." ".$row->satuan."</td>
					        <td class='istyle15' align='center'>".$roll." ".$row->sat_rak."</td>
					        <td class='istyle15'>".$row->nmbrg."</td>
					        <td class='istyle15'>".$row->keterangan."</td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='21%' class='istyle15'>Rp.</td>
					            <td width='79%' class='istyle15' align='right'>".number_format($row->harga,0,",",".")."/".$row->satuan."</td>
					          </tr>
					        </table></td>
					      </tr>";
					$l++;
					$jum+=($row->jumlah*$row->harga);
				}
				while ($l<=8){
					$html.="<tr>
					        <td class='istyle15' align='center'>".$l.".</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					      </tr>";
					$l++;
				}
					$html.="<tr>
					        <td class='istyle15' align='center'>Total</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='21%' class='istyle15'>Rp.</td>
					            <td width='79%' class='istyle15' align='right'>".number_format($jum,0,",",".")."</td>
					          </tr>
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td class='istyle14' colspan='4'>Perhatian : Return barang maksimal 7 hari setelah tanggal penerimaan</td>
					  </tr>
					  <tr>
					    <td class='istyle14' colspan='4'>Pernyataan Penerima : Barang tersebut telah diterima dalam kondisi baik </td>
					  </tr>
					  <tr>
					    <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td class='istyle15' width='12%'>Tanggal</td>
					        <td class='istyle15' width='3%' align='center'>:</td>
					        <td class='istyle15' width='32%'>&nbsp;</td>
					        <td class='istyle15' width='17%' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;' align='center'>Supir</td>
					        <td class='istyle15' width='17%' style='border:1px solid #111111; border-bottom-width:0px;' align='center'>Satpam</td>
					        <td width='1%' align='center'>&nbsp;</td>
					        <td class='istyle15' width='18%' align='center'>Hormat Kami</td>
					      </tr>
					      <tr>
					        <td class='istyle15' height='22'>Jam</td>
					        <td class='istyle15' align='center'>:</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td rowspan='4' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;</td>
					        <td rowspan='4' style='border:1px solid #111111;'>&nbsp;</td>
					        <td rowspan='4'>&nbsp;</td>
					        <td rowspan='4' style='border-bottom:1px solid #111111'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>Ttd. Cap </td>
					        <td class='istyle15' align='center'>:</td>
					        <td class='istyle15'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td class='istyle15'>Nama Jelas</td>
					        <td class='istyle15' align='center'>:</td>
					        <td class='istyle15'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='3'>&nbsp;</td>
					        </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td class='istyle15' colspan='4'>Putih : Customer (Faktur)</td>
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