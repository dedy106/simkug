<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptKontrak
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
		
		$sql = "select count(distinct a.no_pbrg) ".
			"from kop_pbrg_m a ".$this->filter2;
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
		$sql0="select distinct a.no_pbrg ".
              "from kop_pbrg_m a ".$this->filter2;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select distinct a.no_pbrg,a.no_kontrak,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_tagih,'%d/%m/%Y') as tgltagih,
				a.nilai + a.nilai_um - a.nilai_asur as nominal, a.nilai- a.nilai_asur as nilai_awal,a.nilai_asur,a.nilai_um,
				a.kode_agg,upper(c.nama) as nm,case when a.jenis_angs='A' then 'Anuitas' else 'Flat' end as jnsangs,a.nilai,a.p_bunga,a.lama_bayar,
				a.nilai_bunga,a.nilai_pokok,a.nilai_tagihan,case when a.status_bayar='A' then 'Autodebet' else 'Cash' end as jnsbyr,
				date_format(b.tgl_angs,'%d/%m/%Y') as tglangs,b.cicilan_ke,b.npokok,b.nbunga,b.saldo,
				date_format(g.tanggal,'%d/%m/%Y') as tglcair
				from kop_pbrg_m a inner join kop_pbrg_sch b on a.no_pbrg=b.no_pbrg and a.kode_lokasi=b.kode_lokasi and a.no_kontrak=b.no_kontrak
				inner join kop_agg c on a.kode_agg=c.kode_agg and a.kode_lokasi=c.kode_lokasi
				left join kop_jual_d d on d.no_jual=a.no_jual and a.kode_lokasi=d.kode_lokasi 
				left join spb_m e on d.no_spb=e.no_spb and e.kode_lokasi=d.kode_lokasi
				left join kas_d f on f.no_bukti=e.no_spb and f.kode_lokasi=e.kode_lokasi
				left join kas_m g on g.no_kas=f.no_kas and f.kode_lokasi=g.kode_lokasi ".$this->filter.
				" and a.no_pbrg='".$page->fields[0]."' order by b.cicilan_ke ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$data0=$dbLib->execute($sql);
			$tpokok=0;
			$tmargin=0;
			while ($tot = $data0->FetchNextObject($toupper=false))
			{
				$tpokok+=$tot->npokok;
				$tmargin+=$tot->nbunga;
			}
			$total = $tpokok+$tmargin;
			$AddOnLib=new server_util_AddOnLib();
			/*$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";*/
			$html="<br />";
			$html.=	"<table width='650' border='1' align='center' cellpadding='0' cellspacing='0' style='border:2px solid #111111; border-collapse : collapse;'>
					  <tr>
					    <td valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td align='center'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td align='center' class='nstyle18'><u>SCHEDULE PENGAWASAN ANGSURAN KREDIT BARANG</u></td>
					      </tr>
					      <tr>
					        <td align='center' class='istyle16'>No. BUKTI : ".$rs->no_pbrg."</td>
					      </tr>
					      <tr>
					        <td style='border-bottom:1px solid #111111; border-collapse:collapse'>&nbsp;</td>
					      </tr>
					    </table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='2'>
					        <tr>
					          <td width='2%' rowspan='9'>&nbsp;</td>
					          <td colspan='6'>&nbsp;</td>
					          <td width='2%' rowspan='9'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td width='21%' class='istyle16'>Nama Nasabah/NIK</td>
					          <td width='3%' align='center' class='istyle16'>:</td>
					          <td colspan='4' class='istyle16'>".$rs->nm."/".$rs->kode_agg."</td>
					        </tr>
					        <tr>
					          <td>&nbsp;</td>
					          <td>&nbsp;</td>
					          <td width='30%'>&nbsp;</td>
					          <td width='19%'>&nbsp;</td>
					          <td width='3%'>&nbsp;</td>
					          <td width='20%'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Nominal</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nominal,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td class='istyle15'>Suku Bunga</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>$rs->p_bunga %</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Uang Muka</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_um,0,",",".")."</td>
					            </tr>
					          </table></td>
					           <td class='istyle15'>Jangka Waktu (bln) </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>$rs->lama_bayar</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Jumlah Sementara</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_awal,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td class='istyle15'>Angsuran per Bulan </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_tagihan,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Asuransi</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai_asur,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td class='istyle15'>Total Pokok</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($tpokok,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>Jumlah</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='60%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($rs->nilai,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td class='istyle15'>Total Margin </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($tmargin,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>					          
					          <td class='istyle15'>Jenis Pembayaran </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->jnsbyr."</td>					          
					          <td class='istyle15'>Total Pokok + Margin </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($total,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>
					        
					        <tr>
					          <td colspan='6'>&nbsp;</td>
					        </tr>
					      </table>
					      <table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					        <tr align='center' bgcolor='#CCCCCC'>
					          <td width='5%' class='istyle18'>No.</td>
					          <td width='13%' class='istyle18'>Tgl. Angsuran</td>
					          <td width='17%' class='istyle18'>Saldo Awal Pokok </td>
					          <td width='16%' class='istyle18'>Angsuran</td>
					          <td width='16%' class='istyle18'>Pokok</td>
					          <td width='15%' class='istyle18'>Margin</td>
					          <td width='18%' class='istyle18'>Saldo Akhir Pokok </td>
					        </tr>";
				$data=$dbLib->execute($sql);
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					$html.="<tr>
					          <td align='center' class='istyle15'>".$dt->cicilan_ke.".</td>
					          <td align='center' class='istyle15'>".$dt->tglangs."</td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->npokok+$dt->saldo,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->nilai_tagihan,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->npokok,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->nbunga,0,",",".")."</td>
					            </tr>
					          </table></td>
					          <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td class='istyle15' width='16%'>Rp.</td>
					              <td class='istyle15' align='right' width='84%'>".number_format($dt->saldo,0,",",".")."</td>
					            </tr>
					          </table></td>
					        </tr>";
				}
				$html .= "</table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='0'>
					        <tr>
					          <td>&nbsp;</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;Menyetujui,</td>
					        </tr>
					        <tr>
					          <td height='59'>&nbsp;</td>
					        </tr>
					        <tr>
					          <td class='istyle15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<u>".$rs->nm."</u></td>
					        </tr>
					        <tr>
					          <td class='istyle15'>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;".$rs->kode_agg."</td>
					        </tr>
					        <tr>
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
