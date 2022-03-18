<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptRSched
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
		
		$sql = "select count(distinct a.no_pinj) ".
			"from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi ".$this->filter;
		$rs = $dbLib->execute($sql);
		$totPage = 0;
		if ($rs)
		{
			$count = $rs->fields[0];
			$totPage = ceil($count / $this->rows);
		}
		return $totPage;
	}
	function getHtml($resultType = null)
	{
		$sql0="select distinct a.no_pinj ".
              "from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);		
		$result = new server_util_arrayList();
		while (!$page->EOF)
		{			
			$sql = "select distinct c.cicilan_ke,a.kode_agg,upper(b.nama) as nm,a.nilai,a.p_bunga,a.lama_bayar,a.nilai_tagihan, ifnull(d.no_bill,'-') as no_bill, 
				d.npokok,d.nbunga, date_format(c.tgl_angs, '%d/%m/%Y') as tgltagih,case when ifnull(aa.dc,'D') = 'D' then 1 else -1 end * ifnull(aa.npokok + aa.nbunga,0) as nangs, ifnull(aa.npokok,0) as angspokok, ifnull(aa.nbunga,0) as angsbunga,
				c.npokok as pokok, c.saldo,case when f.tanggal is null then '-' else date_format(f.tanggal,'%d/%m/%Y') end as tglangs,
				concat(substring(cast(monthname(f.tanggal) as char),1,3),'-',date_format(f.tanggal,'%y'))as bln, ifnull(f.no_angs, '-') as no_angs
				from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi
				left outer join kop_pinj_sch c on a.no_pinj=c.no_pinj and a.kode_lokasi=c.kode_lokasi 
				left outer join kop_pinjbill_d d on d.no_pinj = c.no_pinj and d.kode_lokasi = c.kode_lokasi and d.cicilan_ke = c.cicilan_ke
				left outer join kop_pinjbill_m e on e.no_bill = d.no_bill and e.kode_lokasi = d.kode_lokasi 
				left outer join kop_pinjangs_d aa on aa.no_kontrak = a.no_kontrak and aa.no_pinj = a.no_pinj and aa.kode_lokasi=a.kode_lokasi and (date_format(e.tanggal,'%Y%m') = date_format(aa.tanggal,'%Y%m') or (e.tanggal is null and aa.no_angs like '%PK%') )
				left outer join kop_pinjangs_m f on f.no_angs = aa.no_angs and f.kode_lokasi = aa.kode_lokasi
				".$this->filter.
				" and a.no_pinj='".$page->fields[0]."' order by c.cicilan_ke, f.no_angs ";
			$sqlAngs = "select no_kontrak,no_pinj, sum(case dc when 'D' then npokok+nbunga else -(npokok+nbunga) end) as nangs
					, sum(case dc when 'D' then npokok else -npokok end) npokok
					,sum(case dc when 'D' then nbunga else -nbunga end) nbunga 
				 from kop_pinjangs_d a 
				where a.no_kontrak='".$page->fields[0]."' and a.no_pinj='".$page->fields[0]."' group by no_kontrak,no_pinj ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);			
			$data0=$dbLib->execute($sql);
			$dataAngs=$dbLib->execute($sqlAngs);
			if ($dataA = $dataAngs->FetchNextObject(false) ){
				$AngsPokok = $dataA->npokok;
				$AngsBunga = $dataA->nbunga;
				$Angsur = $dataA->nangs;
			}
			$tpokok=0;
			$tmargin=0;
			$totAngs = 0;
			$totPokok = 0;
			$totByrAngs = 0;
			$totByrJs = 0;
			$firstPK = true;
			while ($tot = $data0->FetchNextObject($toupper=false))
			{
				$tpokok += $tot->npokok;
				$tmargin += $tot->nbunga;				
				$totPokok += $tot->pokok;
				if (strpos($tot->no_angs,"-PK")){
					if ($firstPK){
						$totAngs += $tot->nangs;
						$totByrAngs += $tot->angspokok;
						$totByrJs += $tot->angsbunga;				
					}
					$firstPK = false;
				}else {
					$totAngs += $tot->nangs;
					$totByrAngs += $tot->angspokok;
					$totByrJs += $tot->angsbunga;				
				}				
			}
			$total = $tpokok+$tmargin;
			$AddOnLib=new server_util_AddOnLib();
			$html="<br />";
			$html .= "<table width='650' border='1' align='center' cellpadding='0' cellspacing='0' style='border:2px solid #111111; border-collapse : collapse;'>
					  <tr>
					    <td valign='top'>";
			$html.=	"<table width='1024' border='0' align='center' cellpadding='2' cellspacing='0'>
					  <tr>
					    <td colspan='9' align='center' class='nstyle18'>REALISASI SCHEDULE ANGSURAN</td>
					  </tr>
					  <tr><td colspan='9' class='istyle16' align='center'>NOMOR: ".$page->fields[0]."</td>
					  </tr>
					  <tr>
						<td colspan='9' style='border-bottom:1px solid #111111; border-collapse:collapse'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='9'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td width='191' class='istyle16'>NAMA KONSUMEN</td>
					    <td width='32' class='istyle16' align='center'>:</td>
					    <td colspan='7' class='istyle16'>".$rs->nm." - ".$rs->kode_agg."</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Jumlah Pinjaman</td>
					    <td class='istyle15' align='center'>:</td>
					    <td class='istyle15' width='19'>Rp.</td>
					    <td class='istyle15' width='136' align='right'>".number_format($rs->nilai,0,",",".")."</td>
					    <td>&nbsp;</td>
					    <td colspan='3' >&nbsp;</td>					    
					    <td width='350' rowspan='4'>&nbsp;".($totAngs >= $totPokok + $tmargin ? "<img src='image/lunas.gif' />":"")."</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Suku Bunga Efektif / tahun</td>
					    <td class='istyle15' align='center'>:</td>
					    <td>&nbsp;</td>
					    <td class='istyle15' align='right'>".$rs->p_bunga."%</td>
					    <td class='istyle15' width='30'  align='center'>=</td>
					    <td class='istyle15' >".number_format($rs->p_bunga/12,3,",",".")."%</td>					    
					    <td class='istyle15' colspan='2'>per bulan</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Jangka Waktu (bulan)</td>
					    <td class='istyle15' align='center'>:</td>
					    <td>&nbsp;</td>
					    <td class='istyle15' align='right'>".$rs->lama_bayar."</td>
					    <td>&nbsp;</td>					    
					    <td>&nbsp;</td>				
					    <td>&nbsp;</td>						    						
					    <td>&nbsp;</td>		
					  </tr>
					  <tr>
					    <td class='istyle15'>Angsuran per Bulan</td>
					    <td align='center'>:</td>
					    <td class='istyle15'>Rp.</td>
					    <td class='istyle15'align='right'>".number_format($rs->nilai_tagihan,0,",",".")."</td>
					    <td>&nbsp;</td>
					    <td class='istyle15'>Denda harian</td>
					    <td class='istyle15' colspan='2'>0,15%</td>					    
					  </tr>
					  <tr>
					    <td class='istyle15'>Total Tagihan Pokok</td>
					    <td align='center'>:</td>
					    <td class='istyle15'>Rp.</td>
					    <td class='istyle15' align='right'>".number_format($tpokok,0,",",".")."</td>
					    <td>&nbsp;</td>
					    <td class='istyle15'>&nbsp;Terbayar</td>
					    <td class='istyle15'>Rp.</td>
					    <td class='istyle15' align='right'>&nbsp;".number_format($AngsPokok,0,",",".")."</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td class='istyle15'>Total Tagihan Bunga</td>
					    <td align='center'>:</td>
					    <td class='istyle15'>Rp.</td>
					    <td class='istyle15' align='right'>".number_format($tmargin,0,",",".")."</td>
					    <td >&nbsp;</td>
					    <td class='istyle15'>&nbsp;Terbayar</td>
					    <td class='istyle15'>Rp.</td>
					    <td class='istyle15' align='right'>&nbsp;".number_format($AngsBunga,0,",",".")."</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='9'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='9'><table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					      <tr align='center' bgcolor='#CCCCCC'>
					        <td width='5%' class='istyle18'>ANGS KE </td>
					        <td class='istyle18' >ANGS BLN</td>
					        <td class='istyle18' >TGL JTH TEMPO </td>
					        <td class='istyle18' >TAGIHAN POKOK</td>
					        <td class='istyle18' >TAGIHAN MARGIN </td>
					        <td class='istyle18' >TOTAL TAGIHAN</td>
					        <td class='istyle18' >ANGSURAN POKOK</td>
					        <td class='istyle18' >ANGSURAN MARGIN </td>
					        <td class='istyle18' >REALISASI ANGSURAN </td>
					        <td class='istyle18' width='100'>TANGGAL REALISASI </td>
					        <td class='istyle18' width='140'>No. ANGSURAN </td>
					        <td class='istyle18' width='80'>BAKI DEBET </td>
					        <td class='istyle18' >MARGIN TAKTERBAYAR</td>
					      </tr>";
				$baki = $rs->nilai;				
				$data=$dbLib->execute($sql);
				$cicilan_ke = -1;
				$saldo = 0;
				$totangs = 0;
				$saldoSblm = 0;
				$saldoJs = 0;
				$bungaTakTeByr = 0;
				$first = true;
				$beda = false;
				$firstPK = true;
				$firstNotBill = true;
				$lunas = false;	
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					if ($cicilan_ke != $dt->cicilan_ke){
						$saldoSblm = $saldo;
						$saldo = $dt->nbunga + $dt->npokok;
						$cicilan_ke = $dt->cicilan_ke;												
						$saldoJs = $dt->nbunga;
						$bungaTakTeByr += $dt->nbunga;
						$beda = true;
						$totAngs = 0;
						$bunga = $dt->nbunga;
					}else $beda = false;
					$saldo -= $dt->nangs;					
					$saldoJs -= $dt->angsbunga;			
					$bungaTakTeByr -= $dt->angsbunga;									
					
					$totAngs += $dt->nangs;				
					$Angsur -= $dt->nangs;					
					$AngsBunga -= $dt->angsbunga;
					$AngsPokok -= $dt->angspokok;
					
					if (!$beda && !$first)				
						$baki += $saldoJs - $dt->angspokok;// baki + ($nbunga - angsbunga) - angspokok										
					else if ($beda) $baki += $saldoJs - $dt->angspokok;
					
					if (strpos($dt->no_angs,"-PK")){						
						if (!$firstPK){
							$dt->angspokok = 0;
							$dt->angsbunga = 0;
							$dt->nangs = 0;							
							$lunas = true;
							$dt->no_angs = '-';
						}
						$firstPK = false;
					}
					
					if (($baki == $dt->nbunga || $baki <= 0) && $dt->no_bill == "-") {		
						if ($baki <= 0){							
							//$dt->angspokok = 0;
							//$dt->angsbunga = 0;
							//$dt->nangs = 0;
						}				
						//$baki = 0;
						//$saldo = 0;
						//$bungaTakTeByr = 0;
					}
					$denda = $bungaTakTeByr;
					$tgl1 = explode("/",$dt->tgltagih);
					$tgl3 = date("Ym", mktime(0,0,0,$tgl1[1], $tgl1[0], $tgl1[2]));
					$tgl2 = date("Ym");								
					if ($tgl3 >= $tgl2 && $dt->no_bill == "-" ) {
						$denda = 0;											
					}
					if ($dt->no_bill == "-" && $dt->no_angs == "-" && $baki != 0){
						
						$bungaTakTeByr -= $dt->nbunga;
						if ($baki >= $dt->saldo) $baki = $dt->saldo + $bungaTakTeByr;
					}
					if ($Angsur <= 0 && $AngsPokok == $totPokok) $lunas = true;
					if ($rs->lama_bayar == $dt->cicilan_ke && $Angsur > 0){
						$dt->angspokok = $AngsPokok;
						$dt->angsbunga = $AngsBunga;
						$dt->nangs = $Angsur;
					}
					if ($lunas) $baki = 0;
					
					$html.="<tr>
					        <td class='istyle15' align='center'>".$dt->cicilan_ke."</td>
					        <td class='istyle15' align='center'>".$dt->bln."</td>
					        <td class='istyle15' align='center'>".$dt->tgltagih."</td>
					        <td class='istyle15' align='right'>".number_format($dt->npokok,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->nbunga,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->nbunga+$dt->npokok,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->angspokok,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->angsbunga,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($dt->nangs,0,",",".")."</td>					        
					        <td class='istyle15' align='center'>".$dt->tglangs."</td>
					        <td class='istyle15' >$dt->no_angs</td>
					        <td class='istyle15' align='right'>".number_format($baki,0,",",".")."</td>					          
					        <td class='istyle15' align='right'>".number_format($denda,0,",",".")."</td>					        
					      </tr>";
					$first = false;
				}
				$html .= "</table></td>
					  </tr>
					</table>";
			$html .= "</td>
					  </tr>
					</table>";
			$html .= "<br />";
			$html .="<br><br><br><br>";
			if ($resultType){				
				$result->add(str_replace(chr(9),"",$html));				
				$result->add($this->dataSch($page->fields[0]));				
			}else {
				$html .= $this->dataSch($page->fields[0]);
			}			
			
			$page->MoveNext();			
		}
		$html = str_replace(chr(9),"",$html);
		if ($resultType){
			return $result;
		}else return $html;
	}
	function dataSch($pinj){
		global $dbLib;
		$sql = "select a.no_pinj,a.no_kontrak,a.keterangan,date_format(a.tanggal,'%d/%m/%Y') as tgl,date_format(a.tgl_tagih,'%d/%m/%Y') as tgltagih,
				a.kode_agg,upper(b.nama) as nm,case when a.jenis_angs='A' then 'Anuitas' else 'Flat' end as jnsangs,a.nilai,a.p_bunga,a.lama_bayar,a.nilai_bunga,a.nilai_pokok,
				a.nilai_tagihan,case when a.status_bayar='A' then 'Autodebet' else 'Cash' end as jnsbyr,
				date_format(c.tgl_angs,'%d/%m/%Y') as tglangs,c.cicilan_ke,c.npokok,c.nbunga,c.saldo,
				date_format(g.tanggal,'%d/%m/%Y') as tglcair
				from kop_pinj_m a inner join kop_pinj_sch c on a.no_pinj=c.no_pinj and a.kode_lokasi=c.kode_lokasi and a.no_kontrak=c.no_kontrak
				inner join kop_agg b on a.kode_agg= b.kode_agg and a.kode_lokasi=b.kode_lokasi
				left join kop_pinj_spb d on d.no_kontrak=a.no_kontrak and a.kode_lokasi=d.kode_lokasi and a.no_pinj=d.no_pinj
				left join spb_m e on d.no_spb=e.no_spb and e.kode_lokasi=d.kode_lokasi
				left join kas_d f on f.no_bukti=e.no_spb and f.kode_lokasi=e.kode_lokasi
				left join kas_m g on g.no_kas=f.no_kas and f.kode_lokasi=g.kode_lokasi ".$this->filter.
				" and a.no_pinj='".$pinj."' order by c.cicilan_ke ";
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
					        <td align='center' class='nstyle18'><u>SCHEDULE PENGAWASAN ANGSURAN PINJAMAN</u></td>
					      </tr>
					      <tr>
					        <td align='center' class='istyle16'>No. Pinjaman : ".$rs->no_pinj."</td>
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
					          <td class='istyle15'>Jumlah Pembiayaan</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>Rp. ".number_format($rs->nilai,0,",",".")."</td>
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
					          <td class='istyle15'>Suku Bunga (per tahun)</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".number_format($rs->p_bunga,2,",",".")."%</td>
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
					          <td class='istyle15'>Jangka Waktu (bulan)</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->lama_bayar."</td>
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
					          <td class='istyle15'>Tanggal Pencairan</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->tglcair."</td>
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
					          <td class='istyle15'>Jenis Pembiayaan</td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->jnsangs."</td>
					          <td class='istyle15'>Jenis Pembayaran </td>
					          <td class='istyle15' align='center'>:</td>
					          <td class='istyle15'>".$rs->jnsbyr."</td>
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
