<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptRekapBKes
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
		
		$sql = "select 1 ";
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
		$sql0="select 1 ";
		$tmp=explode("/",$this->filter2);
		$provider=$tmp[0];
		$periode=$tmp[1];
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		if ($provider=="RS")
		{$judul="RUMAH SAKIT (RAWAT INAP &amp; RAWAT JALAN)";}
		else
		{$judul="KIMIA FARMA (RAWAT JALAN)";}
		while (!$page->EOF)
		{
			$sql = "select b.nama as nmrs,c.nama as nmpoli,ifnull(e.itt,0) as itt,ifnull(e.imt,0) as imt,ifnull(e.ypt,0) as ypt, 
       ifnull(e.poltek,0) as poltek,ifnull(e.pdc,0) as pdc, 
       ifnull(e.itt,0)+ifnull(e.imt,0)+ifnull(e.ypt,0)+ifnull(e.poltek,0)+ifnull(e.pdc,0) as total
from kes_provider_poli a 
inner join kes_provider b on a.kode_provider=b.kode_provider and a.kode_lokasi=b.kode_lokasi
inner join kes_poli c on a.kode_poli=c.kode_poli and a.kode_lokasi=c.kode_lokasi
inner join kes_klp_provider d on b.kode_klp=d.kode_klp and b.kode_lokasi=d.kode_lokasi          
left join (SELECT x.kode_provider,x.kode_poli,
                  SUM(CASE WHEN y.kode_lokasi='11' THEN x.nilai ELSE 0 END) AS itt,
                  SUM(CASE WHEN y.kode_lokasi='12' THEN x.nilai ELSE 0 END) AS imt,
                  SUM(CASE WHEN y.kode_lokasi='13' THEN x.nilai ELSE 0 END) AS ypt,
                  SUM(CASE WHEN y.kode_lokasi='14' THEN x.nilai ELSE 0 END) AS poltek,
                  SUM(CASE WHEN y.kode_lokasi='15' THEN x.nilai ELSE 0 END) AS pdc
           FROM kes_trans_d X
		   INNER JOIN karyawan Y ON x.nik=y.nik and x.kode_lokasi = y.kode_lokasi
           INNER JOIN kes_provider_poli s ON x.kode_provider=s.kode_provider AND x.kode_poli=s.kode_poli and y.kode_lokasi = s.kode_lokasi
           INNER JOIN kes_poli z ON z.kode_poli=s.kode_poli	and z.kode_lokasi = y.kode_lokasi ". $this->filter."
		   GROUP BY x.kode_provider,x.kode_poli
           )e on a.kode_provider=e.kode_provider and a.kode_poli=e.kode_poli
where b.kode_klp='".$provider."'
order by a.kode_provider,a.nu ";
			
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			
			$html="<br />";
			$html.=	"<table width='700' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
					    <td align='center' class='istyle18'>REKAPITULASI BIAYA KESEHATAN PEGAWAI YPT</td>
					  </tr>
					  <tr>
					    <td align='center' class='istyle18'>".$judul."</td>
					  </tr>
					  <tr>
					    <td align='center' class='istyle18'>PERIODE : ".$AddOnLib->ubah_periode($periode)."</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
					      <tr align='center'>
					        <td width='4%' rowspan='2' class='istyle12'>No</td>
					        <td colspan='3' rowspan='2' class='istyle12'>Rumah Sakit</td>
					        <td colspan='5' class='istyle12'>U N I T</td>
					        <td width='12%' rowspan='2' class='istyle12'>T o t a l</td>
					      </tr>
					      <tr align='center'>
					        <td width='12%' class='istyle12'>ITT</td>
					        <td width='11%' class='istyle12'>IMT</td>
					        <td width='11%' class='istyle12'>YPT</td>
					        <td width='11%' class='istyle12'>POLTEK</td>
					        <td width='12%' class='istyle12'>TPDC</td>
					        </tr>
					      <tr height='3'>
					        <td></td>
					        <td colspan='3'></td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					        <td></td>
					      </tr>";
			$data=$dbLib->execute($sql);
			$no=1;
			$noPoli=1;
			$nmrs="";
			$first=true;
			$totJlnItt=0;$totJlnImt=0;$totJlnYpt=0;$totJlnPoltek=0;$totJlnPdc=0;$totJln=0;
			$totInapItt=0;$totInapImt=0;$totInapYpt=0;$totInapPoltek=0;$totInapPdc=0;$totInap=0;
			$totJlnItt2=0;$totJlnImt2=0;$totJlnYpt2=0;$totJlnPoltek2=0;$totJlnPdc2=0;$totJln2=0;
			$totInapItt2=0;$totInapImt2=0;$totInapYpt2=0;$totInapPoltek2=0;$totInapPdc2=0;$totInap2=0;
			while ($rs2 = $data->FetchNextObject($toupper=false))
			{
				if ($rs2->nmrs != $nmrs){
					$nmrs = $rs2->nmrs;
					if (!$first){
						$html.=  "<tr>
							        <td>&nbsp;</td>
							        <td colspan='3' align='right' class='istyle14'>Jml Rwt Jalan </td>
							        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnItt,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnImt,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnYpt,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnPoltek,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnPdc,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJln,0,",",".")."</td>
							      </tr>
							      <tr>
							        <td>&nbsp;</td>
							        <td colspan='3' align='right' class='istyle14'>Jml : Rwt Inap + Rwt Jalan </td>
							        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnItt+$totInapItt,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnImt+$totInapImt,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnYpt+$totInapYpt,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnPoltek+$totInapPoltek,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnPdc+$totInapPdc,0,",",".")."</td>
							        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJln+$totInap,0,",",".")."</td>
							      </tr>";
						$totInapItt2+=$totInapItt;
						$totInapImt2+=$totInapImt;
						$totInapYpt2+=$totInapYpt;
						$totInapPoltek2+=$totInapPoltek;
						$totInapPdc2+=$totInapPdc;
						$totInap2+=$totInap;
						$totJlnItt2+=$totJlnItt;
						$totJlnImt2+=$totJlnImt;
						$totJlnYpt2+=$totJlnYpt;
						$totJlnPoltek2+=$totJlnPoltek;
						$totJlnPdc2+=$totJlnPdc;
						$totJln2+=$totJln;
					}
					$html.=  "<tr>
						        <td class='istyle12' align='center'>".$no."</td>
						        <td class='istyle12' colspan='3'>".$rs2->nmrs."</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td width='3%' align='center' class='istyle14'>a.</td>
						        <td colspan='2' class='istyle14'>".$rs2->nmpoli."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->itt,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->imt,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->ypt,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->poltek,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->pdc,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->total,0,",",".")."</td>
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td align='center' class='istyle14'>b.</td>
						        <td colspan='2' class='istyle14'>Rawat Jalan</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						      </tr>";
					$first=false;
					$no++;
					$noPoli=1;
					$totInapItt=$rs2->itt;
					$totInapImt=$rs2->imt;
					$totInapYpt=$rs2->ypt;
					$totInapPoltek=$rs2->poltek;
					$totInapPdc=$rs2->pdc;
					$totInap=$rs2->total;
					$totJlnItt=0;$totJlnImt=0;$totJlnYpt=0;$totJlnPoltek=0;$totJlnPdc=0;$totJln=0;
				}else{
					$html.=  "<tr>
						        <td>&nbsp;</td>
						        <td>&nbsp;</td>
						        <td width='3%' align='center' class='istyle14'>".$noPoli.")</td>
						        <td width='21%' class='istyle14'>".$rs2->nmpoli."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->itt,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->imt,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->ypt,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->poltek,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->pdc,0,",",".")."</td>
						        <td align='right' class='istyle14'>".number_format($rs2->total,0,",",".")."</td>
						      </tr>";
					$noPoli++;
					$totJlnItt+=$rs2->itt;
					$totJlnImt+=$rs2->imt;
					$totJlnYpt+=$rs2->ypt;
					$totJlnPoltek+=$rs2->poltek;
					$totJlnPdc+=$rs2->pdc;
					$totJln+=$rs2->total;
				}
			}
				$totInapItt2+=$totInapItt;
				$totInapImt2+=$totInapImt;
				$totInapYpt2+=$totInapYpt;
				$totInapPoltek2+=$totInapPoltek;
				$totInapPdc2+=$totInapPdc;
				$totInap2+=$totInap;
				$totJlnItt2+=$totJlnItt;
				$totJlnImt2+=$totJlnImt;
				$totJlnYpt2+=$totJlnYpt;
				$totJlnPoltek2+=$totJlnPoltek;
				$totJlnPdc2+=$totJlnPdc;
				$totJln2+=$totJln;
				$html.=  "<tr>
					        <td>&nbsp;</td>
					        <td colspan='3' align='right' class='istyle14'>Jml Rwt Jalan </td>
					        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnItt,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnImt,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnYpt,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnPoltek,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJlnPdc,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJln,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td colspan='3' align='right' class='istyle14'>Jml : Rwt Inap + Rwt Jalan </td>
					        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnItt+$totInapItt,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnImt+$totInapImt,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnYpt+$totInapYpt,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnPoltek+$totInapPoltek,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJlnPdc+$totInapPdc,0,",",".")."</td>
					        <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJln+$totInap,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td colspan='4'  style='padding:5px 5px 5px 5px;'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='55%' class='istyle14'>REKAP</td>
					            <td width='45%' class='istyle14'>RAWAT INAP</td>
					          </tr>
					        </table></td>
					        <td align='right' class='istyle14'>".number_format($totInapItt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totInapImt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totInapYpt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totInapPoltek2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totInapPdc2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totInap2,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td colspan='4' style='padding:5px 5px 5px 5px;'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='55%'>&nbsp;</td>
					            <td width='45%' class='istyle14'>RAWAT JALAN</td>
					          </tr>
					        </table></td>
					        <td align='right' class='istyle14'>".number_format($totJlnItt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnImt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnYpt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnPoltek2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnPdc2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJln2,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td colspan='4' style='padding:5px 5px 5px 5px;' align='center' class='istyle12'>T O T A L</td>
					        <td align='right' class='istyle14'>".number_format($totJlnItt2+$totInapItt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnImt2+$totInapImt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnYpt2+$totInapYpt2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnPoltek2+$totInapPoltek2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJlnPdc2+$totInapPdc2,0,",",".")."</td>
					        <td align='right' class='istyle14'>".number_format($totJln2+$totInap2,0,",",".")."</td>
					      </tr>
					      
					    </table></td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td><table width='194' border='0' align='right' cellpadding='0' cellspacing='0'>
					      <tr>
					        <td width='159' align='center' class='istyle14'>Bandung, ".substr($rs->tgl,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tgl),0,6))."</td>
					      </tr>
					      <tr>
					        <td align='center' class='istyle14'>Pembuat Daftar</td>
					      </tr>
					      <tr>
					        <td height='60'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td align='center' class='istyle14'>(................................................)</td>
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
