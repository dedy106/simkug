<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptByrPry
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
			from kop_proyekbayar_m a inner join kop_proyekbayar_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			inner join kop_arproyek_m c on b.no_ar=c.no_ar  and b.kode_lokasi=c.kode_lokasi
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
            from kop_proyekbayar_m a inner join kop_proyekbayar_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
			inner join kop_arproyek_m c on b.no_ar=c.no_ar  and b.kode_lokasi=c.kode_lokasi
			inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_bukti,c.kode_cust,d.nama as nmcust,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,b.nilai,
				e.nama as nmkop,concat(e.alamat,', ',e.kota,' ',e.kodepos) as almt,e.no_telp,e.logo
				from kop_proyekbayar_m a inner join kop_proyekbayar_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi
				inner join kop_arproyek_m c on b.no_ar=c.no_ar  and b.kode_lokasi=c.kode_lokasi
				inner join cust d on c.kode_cust=d.kode_cust and c.kode_lokasi=d.kode_lokasi
				inner join lokasi e on a.kode_lokasi=e.kode_lokasi ".$this->filter.
				" and a.no_bukti='".$page->fields[0]."' order by a.no_bukti ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/".$rs->logo;
			$html="<br />";
			for ($l=1;$l<3;$l++){
			$html.=	"<table width='800' border='2' align='center' cellpadding='0' cellspacing='0' style='border-collapse:collapse; border-color:#111111'>
					  <tr valign='top'>
					    <td height='356'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td width='11%' rowspan='6' valign='top'><img src=$pathfoto width='80' height='100' /></td>
					        <td width='62%' class='nstyle15'>".$rs->nmkop."</td>
					        <td width='27%' colspan='2' rowspan='6' valign='bottom'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td height='47' colspan='2' class='istyle17'>&nbsp;&nbsp;&nbsp;<u>KWITANSI</u></td>
					            </tr>
					          <tr>
					            <td width='27%' height='30' align='center' style='border:1px solid #CCCCCC' class='istyle15'>No.</td>
					            <td width='73%' style='border:1px solid #CCCCCC; border-left-width:0px;' class='istyle15'>".$rs->no_bukti."</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td width='62%' class='istyle15'>".$rs->almt."</td>
					        </tr>
					      <tr>
					        <td width='62%' class='istyle15'>No. Telepon : ".$rs->no_telp."</td>
					        </tr>
					      <tr>
					        <td width='62%'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td width='62%'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td width='62%'>&nbsp;</td>
					        </tr>
					    </table>
					      <table width='100%' border='1' cellspacing='0' cellpadding='2' style='border-color:#CCCCCC; border-collapse:collapse;'>
					        <tr>
					          <td width='16%' height='26' align='right' class='istyle15'>Terima dari&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</td>
					          <td width='84%' class='istyle15'>".$rs->nmcust." [".$rs->kode_cust."]</td>
					        </tr>
					        <tr valign='top'>
					          <td height='47' align='right' class='istyle15'>Sebanyak&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; :</td>
					          <td class='istyle15'>".$AddOnLib->terbilang($rs->nilai)."</td>
					        </tr>
					        <tr valign='top'>
					          <td align='right' class='istyle15'>Keterangan &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:</td>
					          <td class='istyle15'>".$rs->keterangan."</td>
					        </tr>
					      </table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='2'>
					        <tr>
					          <td width='4%' rowspan='6'>&nbsp;</td>
					          <td colspan='3'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td width='24%' rowspan='2' bgcolor='#999999' align='center'  class='nstyle18'>Rp. ".number_format($rs->nilai,0,",",".")."</td>
					          <td width='49%' rowspan='5'>&nbsp;</td>
					          <td width='23%' class='istyle15'>Bandung, ".$rs->tgl."</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Mengetahui,</td>
					        </tr>
					        <tr>
					          <td rowspan='3'>&nbsp;</td>
					          <td height='76'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td style='border-bottom:1px solid #CCCCCC; border-collapse:collapse;'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					        </tr>
					        <tr>
					          <td colspan='4' class='istyle14'><em>Halaman ".$l."</em></td>
					        </tr>
					      </table></td>
					  </tr>
					</table><br />";
			if ($l == 1)
			$html.= "<table width='800' border='0' align='center' cellpadding='2' cellspacing='2'>
					  <tr>
					    <td>- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - </td>
					  </tr>
					</table><br />";
			}
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