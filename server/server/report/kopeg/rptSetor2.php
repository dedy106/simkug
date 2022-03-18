<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptSetor2
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
		
		$sql = "select count(distinct a.no_setor) 
			from kop_pbrgsetor_m a inner join kop_pbrgsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi ".$this->filter;
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
		$sql0="select distinct a.no_setor 
            from kop_pbrgsetor_m a inner join kop_pbrgsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_setor,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.nilai,c.no_angs,
				date_format(c.tanggal,'%d/%m/%Y') as tglstr,c.nik_app,upper(d.nama) as nm,c.keterangan as ket,c.nilai as angs
				from kop_pbrgsetor_m a inner join kop_pbrgsetor_d b on a.no_setor=b.no_setor and a.kode_lokasi=b.kode_lokasi
				inner join kop_pbrgangs_m c on b.no_angs=c.no_angs and b.kode_lokasi=c.kode_lokasi
				inner join karyawan d on c.nik_app=d.nik and c.kode_lokasi=d.kode_lokasi ".$this->filter.
				" and a.no_setor='".$page->fields[0]."' order by a.no_setor ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html="<br />";
			$html.=	"<table width='800' border='1' align='center' cellpadding='0' cellspacing='0' style='border-collapse:collapse; border-color:#111111;'>
					  <tr>
					    <td height='149'><table width='100%' border='0' cellspacing='0' cellpadding='4'>
					      <tr>
					        <td colspan='6' align='center' class='nstyle18'><u>SETORAN</u></td>
					        </tr>
					      <tr>
					        <td width='9%'>Tanggal</td>
					        <td width='2%' align='center'>:</td>
					        <td width='60%'>".$rs->tgl."</td>
					        <td width='10%'>No. Setoran</td>
					        <td width='2%' align='center'>:</td>
					        <td width='17%'>".$rs->no_setor."</td>
					      </tr>
					      <tr>
					        <td>Keterangan</td>
					        <td align='center'>:</td>
					        <td>".$rs->keterangan."</td>
					        <td>Nilai Setoran </td>
					        <td align='center'>:</td>
					        <td align='right'>".number_format($rs->nilai,2,",",".")."</td>
					      </tr>
					    </table>
					      <table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					        <tr align='center' bgcolor='#CCCCCC'>
					          <td class='istyle18' width='4%'>No.</td>
					          <td class='istyle18' width='16%'>No. Angsuran</td>
					          <td class='istyle18' width='10%'>Tanggal</td>
					          <td class='istyle18' width='21%'>Penerima</td>
					          <td class='istyle18' width='33%'>Keterangan</td>
					          <td class='istyle18' width='16%'>Angsuran</td>
					        </tr>";
				$data=$dbLib->execute($sql);
				$l=1;
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					$html.="<tr>
					          <td align='center' class='istyle15'>".$l.".</td>
					          <td class='istyle15'>".$rs->no_angs."</td>
					          <td class='istyle15'>".$rs->tglstr."</td>
					          <td class='istyle15'>".$rs->nm."</td>
					          <td class='istyle15'>".$rs->ket."</td>
					          <td class='istyle15' align='right'>".number_format($rs->angs,2,",",".")."</td>
					        </tr>";
					$l++;
				}
				$html .= "</table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='2'>
					        <tr>
					          <td width='4%'>&nbsp;</td>
					          <td width='96%'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					          <td class='istyle15'>Mengetahui</td>
					        </tr>
					        
					        <tr>
					          <td height='65'>&nbsp;</td>
					          <td>&nbsp;</td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					          <td class='istyle15'><u>".$rs->nm."</u></td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					          <td class='istyle15'>".$rs->nik_app."</td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					          <td>&nbsp;</td>
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