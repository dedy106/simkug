<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_RincianInves
{
	protected $caption;
	protected $filter;
	protected $filter2;
	protected $rows;
	protected $page;
	protected $showFilter;
	protected $lokasi;	
	
	function getTotalPage()
	{
		//$sql = "select count(*) from glma a ".
		//		" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter;
		$sql="select count(*) ".
             "from kkp_nego_m kn inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk ".
                   "inner join emiten e on kn.kode_emiten=e.kode_emiten ".$this->filter;
         
		global $dbLib;
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
		/*$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";*/
		$sql="select kb.nama as nmbentuk,e.nama+' Cabang '+e.cabang as nmbank,e.status_bank,substring(kb.nama,10,15) as jenisdep,kn.nilai, ".
			 "convert(varchar,kn.tgl_awal,103) as tglawal,convert(varchar,kn.tgl_akhir,103) as tglakhir,kn.jangka_waktu,kn.bunga,kn.no_kkp ".
			 "from kkp_nego_m kn inner join kkp_bentuk kb on kn.kode_bentuk=kb.kode_bentuk ".
                                "inner join emiten e on kn.kode_emiten=e.kode_emiten ".$this->filter." order by jenisdep desc";
		 
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$temp=$dbLib->LimitQuery($sql,$this->rows,$start);
        $i = $start + 1;	
        $total=0;
	    $html = "<br><br><br>";
	    $html .=
				"<div align='center'>
				  <table width='1500' border='0' cellspacing='1' cellpadding='0'>
					<tr class='style18'>
					  <td>RINCIAN PENEMPATAN DANA JAMKESPEN YAKES-TELKOM  </td>
					</tr>
					<tr class='style18'>
					  <td>INSTRUMEN INVESTASI : DEPOSITO </td>
					</tr>
					<tr class='style18'>
					  <td>PER ".$this->filter2."</td>
					</tr>
					<tr class='style18'>
					  <td align='right'></td>
					</tr>
				  </table>
				  <table width='1500' border='1' cellpadding='1' cellspacing='0' bordercolor='#CCCCCC' class='kotak'>
					
					
					<tr class='style18' bgcolor='#F4F4F4'>
					  <td width='45'><div align='center'>No</div></td>
					  <td width='598'><div align='center'>Nama Bank </div></td>
					  <td width='78'><div align='center'>Kategori Bank </div></td>
					  <td width='102'><div align='center'>Jenis Deposito </div></td>
					  <td width='140'><div align='center'>Nominal (Rp) </div></td>
					  <td width='86'><div align='center'>Tgl Mulai </div></td>
					  <td width='86'><div align='center'>Tgl Jatuh Tempo </div></td>
					  <td width='58'><div align='center'>Durasi (Bulan) </div></td>
					  <td width='70'><div align='center'>Tingkat Suku Bunga </div></td>
					  <td width='195'><div align='center'>Keterangan</div></td>
					</tr>
					<tr class='style18' bgcolor='#F4F4F4'>
					  <td><div align='center'><em>1</em></div></td>
					  <td><div align='center'><em>2</em></div></td>
					  <td><div align='center'><em>3</em></div></td>
					  <td><div align='center'><em>4</em></div></td>
					  <td><div align='center'><em>5</em></div></td>
					  <td><div align='center'><em>6</em></div></td>
					  <td><div align='center'><em>7</em></div></td>
					  <td><div align='center'><em>8</em></div></td>
					  <td><div align='center'><em>9</em></div></td>
					  <td><div align='center'><em>10</em></div></td>
					</tr>";
					$jnsdep="";
					$jum=false;
					
			while ($rs = $temp->FetchNextObject($toupper=false))
		    {	
				if ($rs->nmbentuk!=$jnsdep)
				{		
					if ($jnsdep=="Deposito On Call")
					{
						$tmp="DOC";
					}else
					{
						$tmp="DEPOSITO";
					}
					if ($jum)
					{						
					$html .="<tr class='style18'>
					  <td>&nbsp;</td>
					  <td><div align='left'><em>JUMLAH ".$tmp." SWAKELOLA </em></div></td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td align='right'><em>".number_format($jmlh,0,",",".")."</em></td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					</tr>";
					$total+=$jmlh;
					}
					$i=1;
					$jmlh=0;
					$jmlh+=$rs->nilai;
					$jnsdep=$rs->nmbentuk;
					$html .="<tr class='style18' bgcolor='#F4F4F4'>
					  <td>&nbsp;</td>
					  <td><em>".strtoupper($rs->nmbentuk)."</em> </td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					</tr>
					<tr>
					  <td valign='top' class='style18'>I.</td>
					  <td valign='top' class='style18'>SWAKELOLA</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					  <td>&nbsp;</td>
					</tr>
					<tr class='style15'>
					  <td><div align='right'>".$i."</div></td>
					  <td>".strtoupper($rs->nmbank)."</td>
					  <td align='center'>".$rs->status_bank."</td>
					  <td align='center'>".$rs->jenisdep."</td>
					  <td align='right'>".number_format($rs->nilai,0,",",".")."</td>
					  <td align='center'>".$rs->tglawal."</td>
					  <td align='center'>".$rs->tglakhir."</td>";
					if ($rs->nmbentuk!="Deposito On Call")
					{
					   $html.="<td align='center'>".$rs->jangka_waktu."</td>";	
  					}else 
					{
					   $html.="<td align='center'>0</td>";
					}
					$html.="<td align='center'>".number_format($rs->bunga,2,",",".")."%</td>
					  <td>".$rs->no_kkp."</td>
					</tr>";
					$jum=true;
					$i++;
				}else
				{
					$jmlh+=$rs->nilai;
					$jnsdep=$rs->nmbentuk;
					$html .="<tr class='style15'>
					  <td><div align='right'>".$i."</div></td>
					  <td>".strtoupper($rs->nmbank)."</td>
					  <td align='center'>".$rs->status_bank."</td>
					  <td align='center'>".$rs->jenisdep."</td>
					  <td align='right'>".number_format($rs->nilai,0,",",".")."</td>
					  <td align='center'>".$rs->tglawal."</td>
					  <td align='center'>".$rs->tglakhir."</td>";
					if ($rs->nmbentuk!="Deposito On Call")
					{
					   $html.="<td align='center'>".$rs->jangka_waktu."</td>";	
  					}else 
					{
					   $html.="<td align='center'>0</td>";
					}
					  $html.="<td align='center'>".number_format($rs->bunga,2,",",".")."%</td>
					  <td>".$rs->no_kkp."</td>
					</tr>";
					$i++;
					$jum=true;
				}							  
			}
		if ($jnsdep=="Deposito On Call")
		{
			$tmp="DOC";
		}else
		{
			$tmp="DEPOSITO";
		}
		$html .="<tr class='style18'>
		  <td>&nbsp;</td>
		  <td><div align='left'><em>JUMLAH ".$tmp." SWAKELOLA </em></div></td>
		  <td>&nbsp;</td>
		  <td>&nbsp;</td>
		  <td align='right'><em>".number_format($jmlh,0,",",".")."</em></td>
		  <td>&nbsp;</td>
		  <td>&nbsp;</td>
		  <td>&nbsp;</td>
		  <td>&nbsp;</td>
		  <td>&nbsp;</td>
		</tr>";
		$total+=$jmlh;
		$html .="<tr class='style18'>
	      <td>&nbsp;</td>
	      <td colspan='3'>TOTAL</td>
	      <td align='right'>".number_format($total,0,",",".")."</td>
	      <td colspan='5'>&nbsp;</td>
	    </tr>";
		$html .="</table></div>";
		$html .= "<br>";
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
//		ob_end_clean();
//		error_log("server/tmp/$name");
//		return "server/tmp/$name";
		
		header ("Expires: Mon, 26 Jul 1997 05:00:00 GMT");
		header ("Last-Modified: " . gmdate("D,d M YH:i:s") . " GMT");
		header ("Cache-Control: no-cache, must-revalidate");
		header ("Pragma: no-cache");
		header ("Content-type: application/x-msexcel");
		header ("Content-Disposition: attachment; filename=produk.xls");
		header ("Content-Description: PHP/INTERBASE Generated Data" );
		readfile($save);
		unlink($save);
	}
	function createCSV()
	{
		$sql = "select a.kode, b.nama, a.so_awal, a.debet, a.kredit, a.so_akhir from glma a ".
				" inner join masakun b on b.kode = a.kode and a.kode_lokasi = b.kode_lokasi ". $this->filter .
				" order by a.kode";
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
