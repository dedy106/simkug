<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_inventory_rptPL
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
		
		$sql = "select count(distinct a.no_pl) ".
			"from inv_pl_m a ".$this->filter2;
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
		$sql0 = "select distinct a.no_pl ".
			"from inv_pl_m a ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_pl,c.nama as nmcust,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.no_mobil,a.jam,
				d.nama as nmbrg,b.n1,b.n2,b.n3,b.n4,b.n5,b.jumlah,b.sat_rak,b.satuan
				from inv_pl_m a inner join inv_pl_d b on a.no_pl=b.no_pl and a.kode_lokasi=b.kode_lokasi
				inner join cust c on a.kode_cust=c.kode_cust and a.kode_lokasi=c.kode_lokasi
				inner join inv_brg d on b.kode_barang=d.kode_brg and b.kode_lokasi=d.kode_lokasi ".$this->filter.
				" and a.no_pl='".$page->fields[0]."' order by b.kode_barang ";
			
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
					    <td colspan='6' align='center' class='istyle17'>PACKING LIST</td>
					  </tr>
					  <tr>
					    <td width='64' class='istyle18'>PCH</td>
					    <td width='9' align='center' class='istyle15'>:</td>
					    <td colspan='4' class='istyle15'>".$rs->no_pl."</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>TUJUAN</td>
					    <td align='center' class='istyle15'>:</td>
					    <td width='263' class='istyle15'>".$rs->nmcust."</td>
					    <td width='83' class='istyle15'>TANGGAL</td>
					    <td width='10' align='center' class='istyle15'>:</td>
					    <td width='197' class='istyle15'>".$rs->tgl."</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>NO. MOBIL</td>
					    <td align='center' class='istyle15'>:</td>
					    <td class='istyle15'>".$rs->no_mobil."</td>
					    <td class='istyle15'>JAM</td>
					    <td align='center' class='istyle15'>:</td>
					    <td class='istyle15'>".$rs->jam."</td>
					  </tr>
					  <tr>
					    <td colspan='6'><table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					      <tr align='center'>
					        <td width='4%' rowspan='2' class='istyle15'>NO.</td>
					        <td width='22%' rowspan='2' class='istyle15'>JENIS BARANG</td>
					        <td width='6%' rowspan='2' class='istyle15'>01</td>
					        <td width='6%' rowspan='2' class='istyle15'>02</td>
					        <td width='6%' rowspan='2' class='istyle15'>03</td>
					        <td width='6%' rowspan='2' class='istyle15'>04</td>
					        <td width='6%' rowspan='2' class='istyle15'>05</td>
					        <td colspan='4' class='istyle15'>JUMLAH</td>
					        </tr>
					      <tr align='center'>
					        <td width='11%' class='istyle15'>ROLL/BALE</td>
					        <td width='11%' class='istyle15'>YARD/MTR</td>
					        <td width='11%' class='istyle15'>KGS</td>
					        <td width='11%' class='istyle15'>PCS/LBR</td>
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
					if ($row->satuan == "MTR"){
						$mtr=number_format($row->jumlah,0,",",".");
						$kgs="&nbsp;";
						$pcs="&nbsp;";
						$satM=$row->satuan;$satK="";$satP="";
					}else if ($row->satuan == "KGS"){
						$mtr="&nbsp;";
						$kgs=number_format($row->jumlah,0,",",".");
						$pcs="&nbsp;";
						$satM="";$satK=$row->satuan;$satP="";
					}else if ($row->satuan == "PCS"){
						$mtr="&nbsp;";
						$kgs="&nbsp;";
						$pcs=number_format($row->jumlah,0,",",".");
						$satM="";$satK="";$satP=$row->satuan;
					}
					$html.="<tr>
					        <td class='istyle15' align='center'>".$l.".</td>
					        <td class='istyle15'>".$row->nmbrg."</td>
					        <td class='istyle15' align='right'>".number_format($row->n1,0,",",".")."</td>
					        <td class='istyle15' align='right'>".number_format($row->n2,0,",",".")."</td>
					        <td class='istyle15' align='right'>".number_format($row->n3,0,",",".")."</td>
					        <td class='istyle15' align='right'>".number_format($row->n4,0,",",".")."</td>
					        <td class='istyle15' align='right'>".number_format($row->n5,0,",",".")."</td>
					        <td class='istyle15' align='right'>".number_format($roll,0,",",".")." ".$row->sat_rak."</td>
					        <td class='istyle15' align='right'>".$mtr." ".$satM."</td>
					        <td class='istyle15' align='right'>".$kgs." ".$satK."</td>
					        <td class='istyle15' align='right'>".$pcs." ".$satP."</td>
					      </tr>";
					$l++;
				}
				while ($l<=15){
					$html.="<tr>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>";
					$l++;
				}
					$html.="<tr>
					        <td>&nbsp;</td>
					        <td class='istyle15' align='center'>TOTAL</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  
					  <tr>
					    <td colspan='6' style='padding-top:10px'><table width='400' border='1' align='right' cellpadding='2' cellspacing='0' class='kotak'>
					      <tr align='center'>
					        <td width='133'>DELIVERY</td>
					        <td width='133'>SECURITY</td>
					        <td width='134'>SUPIR</td>
					      </tr>
					      <tr valign='bottom'>
					        <td height='65'>Nama :</td>
					        <td>Nama :</td>
					        <td>Nama :</td>
					      </tr>
					    </table></td>
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
