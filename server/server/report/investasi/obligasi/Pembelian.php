<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");

class server_report_investasi_obligasi_Pembelian
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
		$sql="select count(distinct p.no_beli) ".
             "from pembelian p inner join pembelian_d pd on p.no_beli=pd.no_beli ".
			 "inner join broker b on pd.kode_broker=b.kode_broker ".
			 "inner join obligasi o on pd.no_seri=o.no_seri ".$this->filter;
								//" and a.progress not in ".$this->filter2;
		//error_log($sql);
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
		$sql0="select distinct p.no_beli ".
              "from pembelian p inner join pembelian_d pd on p.no_beli=pd.no_beli ".
			  "inner join broker b on pd.kode_broker=b.kode_broker ".
			  "inner join obligasi o on pd.no_seri=o.no_seri ".$this->filter;
		//error_log($sql);
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql= "select p.no_beli,b.nama as nmbroker,o.nama as nmobli,convert(varchar,o.due_date,103) as tgljthtempo,o.kupon,pd.nominal, ".
				"convert(varchar,pd.tgl_perolehan,103) as tglperolehan,pd.harga_beli,pd.holding_period,pd.hb_broker,pd.hb_yakes, ".
				"convert(varchar,pd.tgl_settlement,103) as tglsettlement,pd.ytm,pd.periode_kpn,convert(varchar,pd.tgl_byrkpn_akhir,103) as tglbyrakhir, ".
				"convert(varchar,pd.tgl_byrkpn_sblm,103) as tglbyrsblm,pd.jml_hari_kpn,pd.jml_kpn_prd_sblm,pd.hr_bunga_jln,pd.nb_yakes, ".
				"pd.nb_berjln,pd.ppjk_bunga,pd.pjk_bunga,pd.gain_sekuritas,pd.ppjk_capitalgain,pd.pjk_capital,pd.totalbayar ".
				"from pembelian p inner join pembelian_d pd on p.no_beli=pd.no_beli ".
						"inner join broker b on pd.kode_broker=b.kode_broker ".
						"inner join obligasi o on pd.no_seri=o.no_seri ".$this->filter.
						" and p.no_beli='".$page->fields[0]."' ";
	        //error_log($sql);
			//$start = (($this->page-1) * $this->rows);
			//global $dbLib;
			$temp=$dbLib->execute($sql);
			
			
			$nmbroker = array();$nmobli = array();$tgljthtempo = array();$kupon = array();$nominal= array();$tglperolehan = array();$harga_beli = array();
			$holding_period = array();$hb_broker = array();$hb_yakes = array();$tglsettlement = array();$ytm = array();$periode_kpn = array();$tglbyrakhir = array();
			$tglbyrsblm = array();$jml_hari_kpn = array();$jml_kpn_prd_sblm = array();$hr_bunga_jln = array();$nb_yakes = array();$nb_berjln = array();$ppjk_bunga = array();$pjk_bunga = array();
			$gain_sekuritas = array();$ppjk_capitalgain = array();$pjk_capital = array();$totalbayar = array();
			$i=0;
			$total=0;
			while ($rs = $temp->FetchNextObject($toupper=false))
			{
				$nmbroker[$i] = $rs->nmbroker;
				$nmobli[$i] = $rs->nmobli;
				$tgljthtempo[$i] = $rs->tgljthtempo;
				$kupon[$i] = $rs->kupon;
				$nominal[$i]= $rs->nominal;
				$tglperolehan[$i] = $rs->tglperolehan;
				$harga_beli[$i] = $rs->harga_beli;
				$holding_period[$i] = $rs->holding_period;
				$hb_broker[$i] = $rs->hb_broker;
				$hb_yakes[$i] = $rs->hb_yakes;
				$tglsettlement[$i] = $rs->tglsettlement;
				$ytm[$i] = $rs->ytm;
				$periode_kpn[$i] = $rs->periode_kpn;
				$tglbyrakhir[$i] = $rs->tglbyrakhir;
				$tglbyrsblm[$i] = $rs->tglbyrsblm;
				$jml_hari_kpn[$i] = $rs->jml_hari_kpn;
				$jml_kpn_prd_sblm[$i] = $rs->jml_kpn_prd_sblm;
				$hr_bunga_jln[$i] = $rs->hr_bunga_jln;
				$nb_yakes[$i] = $rs->nb_yakes;
				$nb_berjln[$i] = $rs->nb_berjln;
				$ppjk_bunga[$i] = $rs->ppjk_bunga;
				$pjk_bunga[$i] = $rs->pjk_bunga;
				$gain_sekuritas[$i] = $rs->gain_sekuritas;
				$ppjk_capitalgain[$i] = $rs->ppjk_capitalgain;
				$pjk_capital[$i] = $rs->pjk_capital;
				$totalbayar[$i] = $rs->totalbayar;
				$total=$total+$totalbayar[$i];
				$i++;
			}
			$jum=$i;
			if ($jum==1)
			{
				$fix=372;
				$width=140;				
			}else
			{
				$fix=372;
				$width=140*$jum;				
			}						
			//error_log($nmbroker[0]);
			//error_log($jum." ".$fix." ".$width);  
			$html = "<br><br><br>";
			$html .=
				"<div align='center'>
				<table width='".($fix+$width)."' border='0' cellspacing='0' cellpadding='0'>
				  <tr>
				    <td class='istyle13'>PEMBELIAN OBLIGASI </td>
				  </tr>
				</table><br>
				  <table width='".($fix+$width)."' border='1' cellpadding='0' cellspacing='0' bordercolor='#000000' class='kotak'>
				    <tr>
				      <td width='30' height='50' align='center' valign='top' class='istyle15'>1</td>
				      <td width='341' valign='top' class='istyle15'>Broker</td>";
				
				$j=0;
				while ($j<$jum)	
				{
					$html.="<td width='140' valign='top' class='istyle18'>".$nmbroker[$j]."</td>";
					$j++;
				}				
				$html.=	"</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>2</td>
				      <td width='341' valign='top' class='istyle15'>Nama Obligasi </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>".$nmobli[$j]."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>3</td>
				      <td width='341' valign='top' class='istyle15'>Tanggal Jatuh Tempo </td>";
				$j=0;
				while ($j<$jum)	
				{     
					$html.="<td width='140' valign='top' class='istyle18'>";if (substr($tgljthtempo[$j],0,1)!='0'){$html.=substr($tgljthtempo[$j],0,2);}else{$html.=substr($tgljthtempo[$j],1,1);}$html.=" ".namaBulan(substr($tgljthtempo[$j],3,2))." ".substr($tgljthtempo[$j],6)."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>4</td>
				      <td width='341' valign='top' class='istyle15'>Kupon (p.a.)</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>".number_format($kupon[$j],3,",",".")."%</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>5</td>
				      <td width='341' valign='top' class='istyle15'>Nominal Obligasi </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($nominal[$j],2,",",".")."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>6</td>
				      <td width='341' valign='top' class='istyle15'>Tanggal Perolehan Securities</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>";if (substr($tglperolehan[$j],0,1)!='0'){$html.=substr($tglperolehan[$j],0,2);}else{$html.=substr($tglperolehan[$j],1,1);}$html.=" ".namaBulan(substr($tglperolehan[$j],3,2))." ".substr($tglperolehan[$j],6)."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>7</td>
				      <td width='341'valign='top' class='istyle15'>Harga Beli Broker </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>".number_format($harga_beli[$j],3,",",".")."%</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>8</td>
				      <td width='341' valign='top' class='istyle15'>Holding Period (Hari) </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140'valign='top' class='istyle18'>".$holding_period[$j]."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>9</td>
				      <td width='341' valign='top' class='istyle15'>Nilai Beli Broker </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($hb_broker[$j],2,",",".")."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>10</td>
				      <td width='341' valign='top' class='istyle15'>Harga Beli YAKES-TELKOM </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>".number_format($hb_yakes[$j],3,",",".")."%</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>11</td>
				      <td width='341' valign='top' class='istyle15'>Tanggal Settlement</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>";if (substr($tglsettlement[$j],0,1)!='0'){$html.=substr($tglsettlement[$j],0,2);}else{$html.=substr($tglsettlement[$j],1,1);}$html.=" ".namaBulan(substr($tglsettlement[$j],3,2))." ".substr($tglsettlement[$j],6)."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>12</td>
				      <td width='341' valign='top' class='istyle15'>YTM</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>".number_format($ytm[$j],2,",",".")."%</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>13</td>
				      <td width='341' valign='top' class='istyle15'>Periode Kupon</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Tiap ".$periode_kpn[$j]."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>14</td>
				      <td width='341' valign='top' class='istyle15'>Tanggal Pembayaran Kupon Terakhir </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>";if (substr($tglbyrakhir[$j],0,1)!='0'){$html.=substr($tglbyrakhir[$j],0,2);}else{$html.=substr($tglbyrakhir[$j],1,1);}$html.=" ".namaBulan(substr($tglbyrakhir[$j],3,2))." ".substr($tglbyrakhir[$j],6)."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>15</td>
				      <td width='341' valign='top' class='istyle15'>Tanggal Pembayaran Kupon Berikutnya </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>";if (substr($tglbyrsblm[$j],0,1)!='0'){$html.=substr($tglbyrsblm[$j],0,2);}else{$html.=substr($tglbyrsblm[$j],1,1);}$html.=" ".namaBulan(substr($tglbyrsblm[$j],3,2))." ".substr($tglbyrsblm[$j],6)."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>16</td>
				      <td width='341' valign='top' class='istyle15'>Jumlah Hari Kupon </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>".$jml_hari_kpn[$j]."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>17</td>
				      <td width='341' valign='top' class='istyle15'>Jumlah Kupon Periode Berikutnya </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($jml_kpn_prd_sblm[$j],2,",",".")."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>18</td>
				      <td width='341' valign='top' class='istyle15'>Hari Bunga Berjalan </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>".$hr_bunga_jln[$j]."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>19</td>
				      <td width='341' valign='top' class='istyle15'>Nilai Beli YAKES-TELKOM</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($nb_yakes[$j],2,",",".")."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>20</td>
				      <td width='341' valign='top' class='istyle15'>Nilai Bunga Berjalan </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($nb_berjln[$j],2,",",".")."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>21</td>
				      <td width='341' valign='top' class='istyle15'>% Pajak Bunga Berjalan </td>";
				$j=0;
				while ($j<$jum)	
				{    
					if ($ppjk_bunga[$j]==0)
					{
						$html.="<td width='140' valign='top' class='istyle18'>".number_format($ppjk_bunga[$j],3,",",".")."%<br>
					        <em>(No Tax)</em></td>";
					}else
					{
						$html.="<td width='140' valign='top' class='istyle18'>".number_format($ppjk_bunga[$j],3,",",".")."%</td>";
					}
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>22</td>
				      <td width='341' valign='top' class='istyle15'>Pajak Bunga Berjalan</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($pjk_bunga[$j],2,",",".")."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>23</td>
				      <td width='341' valign='top' class='istyle15'>Gain Securitas </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($gain_sekuritas[$j],2,",",".")."</td>";
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>24</td>
				      <td width='341' valign='top' class='istyle15'>% Pajak Capital Gain </td>";
				$j=0;
				while ($j<$jum)	
				{    
					if ($ppjk_capitalgain[$j]==0)
					{
						$html.="<td width='140' valign='top' class='istyle18'>".number_format($ppjk_capitalgain[$j],3,",",".")."%<br/>
					        <em>(No Tax)</em></td>";
					}else
					{
						$html.="<td width='140' valign='top' class='istyle18'>".number_format($ppjk_capitalgain[$j],3,",",".")."%<br/>
					        <em>(Not Final)</em></td>";
					}
					$j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>25</td>
				      <td width='341' valign='top' class='istyle15'>Pajak Capital Gain Securitas </td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>(Rp".number_format($pjk_capital[$j],2,",",".").") </td>";
				    $j++;
				}
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>26</td>
				      <td width='341' valign='top' class='istyle15'>Jumlah yang Dibayar YAKES-TELKOM kepada setiap Broker</td>";
				$j=0;
				while ($j<$jum)	
				{    
					$html.="<td width='140' valign='top' class='istyle18'>Rp".number_format($totalbayar[$j],2,",",".")."</td>";
					$j++;
				}	
				$html.="</tr>
				    <tr>
				      <td width='30' align='center' valign='top' class='istyle15'>27</td>
				      <td width='341' valign='top' class='istyle15'>Total yang Dibayar YAKES-TELKOM kepada seluruh Broker </td>";
				if ($jum==1) 
				{
					$html.="<td width='140' align='center' valign='top' class='istyle18'>Rp".number_format($total,2,",",".")."</td>";
				}else
				{
					$html.="<td width='140' colspan='".$jum."' align='center' valign='top' class='istyle18'>Rp".number_format($total,2,",",".")."</td>";
				}
					
				$html.="</tr>
				  </table>
				</div><br>";
			
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
