<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_sdm_rptRekapBKes2
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
			$sql = "select b.nama as nmrs,c.nama as nmpoli,ifnull(e.sai,0) as total
from kes_provider_poli a 
inner join kes_provider b on a.kode_provider=b.kode_provider and a.kode_lokasi=b.kode_lokasi
inner join kes_poli c on a.kode_poli=c.kode_poli and a.kode_lokasi=c.kode_lokasi
inner join kes_klp_provider d on b.kode_klp=d.kode_klp and b.kode_lokasi=d.kode_lokasi          
left join (select x.kode_provider,x.kode_poli,
                  sum(case when y.kode_lokasi='30' then case when z.dc='D' then x.nilai else -x.nilai end else 0 end) as sai
           from kes_trans_d x
		   inner join karyawan y on x.nik=y.nik
           inner join kes_provider_poli s on x.kode_provider=s.kode_provider and x.kode_poli=s.kode_poli	   	   	   	   
           inner join kes_poli z on z.kode_poli=s.kode_poli		   ".$this->filter."
		   group by x.kode_provider,x.kode_poli
           )e on a.kode_provider=e.kode_provider and a.kode_poli=e.kode_poli
where b.kode_klp='".$provider."'
order by a.kode_provider,a.nu ";
			error_log($sql);
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			
			$html="<br />";
			$html.=	"<table width='400' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
					    <td align='center' class='istyle18'>REKAPITULASI BIAYA KESEHATAN PEGAWAI </td>
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
					        <td width='4%'  class='istyle12'>No</td>
					        <td colspan='3' class='istyle12'>Rumah Sakit</td>
					        <td width='12%'  class='istyle12'>T o t a l</td>
					      </tr>
						  <tr height='3'>
					        <td></td>
					        <td colspan='3'></td>
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
							      
							        <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJln,0,",",".")."</td>
							      </tr>
							      <tr>
							        <td>&nbsp;</td>
							        <td colspan='3' align='right' class='istyle14'>Jml : Rwt Inap + Rwt Jalan </td>
							      
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
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td width='3%' align='center' class='istyle14'>a.</td>
						        <td colspan='2' class='istyle14'>".$rs2->nmpoli."</td>
						       <td align='right' class='istyle14'>".number_format($rs2->total,0,",",".")."</td>
						      </tr>
						      <tr>
						        <td>&nbsp;</td>
						        <td align='center' class='istyle14'>b.</td>
						        <td colspan='2' class='istyle14'>Rawat Jalan</td>
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
					         <td align='right' class='istyle14' bgcolor='#F4F4F4'>".number_format($totJln,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td colspan='3' align='right' class='istyle14'>Jml : Rwt Inap + Rwt Jalan </td>
					       <td align='right' class='istyle14' bgcolor='#EAEAEA'>".number_format($totJln+$totInap,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td colspan='4'  style='padding:5px 5px 5px 5px;'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='55%' class='istyle14'>REKAP</td>
					            <td width='45%' class='istyle14'>RAWAT INAP</td>
					          </tr>
					        </table></td>
					        <td align='right' class='istyle14'>".number_format($totInap2,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td colspan='4' style='padding:5px 5px 5px 5px;'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='55%'>&nbsp;</td>
					            <td width='45%' class='istyle14'>RAWAT JALAN</td>
					          </tr>
					        </table></td>
					         <td align='right' class='istyle14'>".number_format($totJln2,0,",",".")."</td>
					      </tr>
					      <tr>
					        <td colspan='4' style='padding:5px 5px 5px 5px;' align='center' class='istyle12'>T O T A L</td>
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
