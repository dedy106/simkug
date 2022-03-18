<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_dmt_rptFormInvoice
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
		
		$sql = "select count(distinct a.no_invoice) ".
			"from dmt_invoice a ".$this->filter;
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
		$sql0="select distinct a.no_invoice ".
              "from dmt_invoice a ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_invoice,a.tanggal as tgl,a.periode,upper(b.nama) as nmcust,b.alamat,b.kota,b.kode_pos,c.no_po,a.tanggal_baps, ".
				"c.tanggal_po,c.no_kontrak,c.tanggal as tglkon,c.tanggal_akhir,e.no_fa,e.nama as nmfa,f.nilai,g.nama as nmapp,g.jabatan,h.alamat as almtsite ".
				"from dmt_invoice a left outer join dmt_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi ".
				"left outer join dmt_kontrak c on a.no_kontrak=c.no_kontrak ".
				"left outer join dmt_billing d on c.no_kontrak=d.no_kontrak ".
				"left outer join dmt_billing_d f on d.no_bill=f.no_bill ".
				"left outer join fa_asset e on f.no_fa=e.no_fa ".
				"left outer join dmt_site h on e.no_fa=h.siteid ".
				"left outer join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi ".$this->filter.
				" and a.no_invoice='".$page->fields[0]."' ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			
			$html="<br />";
			if ($this->filter2 == "Versi 1"){
			$html.=	"<table width='800' border='0' align='center' cellpadding='1' cellspacing='1'>
					  <tr>
						<td align='right'><table width='23%' border='0' cellspacing='0' cellpadding='0'>
						  <tr>
							<td align='center' class='istyle17' style='border-bottom:1px solid #000000'>INVOICE</td>
						  </tr>
						  <tr>
							<td align='center' class='istyle15'>No.INV. ".$rs->no_invoice."</td>
						  </tr>
						</table></td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
					  </tr>
					  <tr>
						<td class='istyle15'>Kepada Yth :</td>
					  </tr>
					  <tr>
						<td  class='istyle18'><table width='25%' border='0' cellspacing='0' cellpadding='0'>
						  <tr>
							<td>".$rs->nmcust."</td>
						  </tr>
						  <tr>
							<td>".$rs->alamat."</td>
						  </tr>
						  <tr>
							<td>".$rs->kota." ".$rs->kode_pos." </td>
						  </tr>
						</table></td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
					  </tr>
					  <tr>
						<td class='istyle15'>Berdasarkan</td>
					  </tr>
					  <tr>
						<td class='istyle15'>Surat Pesanan Penyediaan Supporting Facility CME/SITAC NO. ".$rs->no_po."</td>
					  </tr>
					  <tr>
						<td class='istyle15'>Tanggal ".substr($rs->tanggal_po,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tanggal_po),0,6))." dan Perjanjian/Kontrak Nomor : ".$rs->no_kontrak." Tanggal ".substr($rs->tglkon,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tglkon),0,6))." </td>
					  </tr>
					  <tr>
						<td class='istyle15'>tentang Penyediaan (sewa) Sarana Pendukung SITAC/CME Nasional </td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
					  </tr>
					  <tr>
						<td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						  <tr align='center' class='istyle15'>
							<td width='50%' height='30'>URAIAN</td>
							<td width='12%'>SATUAN</td>
							<td width='13%'>HARGA SATUAN </td>
							<td width='25%'>JUMLAH</td>
						  </tr>
						  <tr>
							<td style='border-bottom:2px solid #111111'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
							  <tr>
								<td class='istyle15' height='40'>Jasa Penyedian Sewa SITAC/CME Shelter masa : ".$AddOnLib->ubah_periode($rs->periode)." </td>
							  </tr>
							  <tr>
								<td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
						$data=$dbLib->execute($sql);
						$l=1;
						while ($kon = $data->FetchNextObject($toupper=false))
						{
							$html.="<tr class='istyle15'>
									<td width='6%' align='right'>".$l.".</td>
									<td width='53%'>".$kon->nmfa."</td>
									<td width='41%'>".$kon->no_fa."</td>
								  </tr>";
							$l++;
						}
						$html.= "<tr class='istyle15'>
									<td colspan='3' height='7'></td>
									</tr>
								</table></td>
							  </tr>
							</table></td>
							<td style='border-bottom:2px solid #111111'>&nbsp;</td>
							<td style='border-bottom:2px solid #111111'>&nbsp;</td>
							<td style='border-bottom:2px solid #111111'><table width='100%' border='0' cellspacing='1' cellpadding='1'>
							  <tr>
								<td height='40'>&nbsp;</td>
							  </tr>
							  <tr>
								<td><table width='100%' border='0' cellspacing='1' cellpadding='1'>";
						$data2=$dbLib->execute($sql);
						$tot=0;
						while ($kon2 = $data2->FetchNextObject($toupper=false))
						{
							$html.="<tr class='istyle15'>
									  <td width='13%'>Rp.</td>
									  <td width='87%' align='right'>".number_format($kon2->nilai,0,",",".")."</td>
									</tr>";
							$tot+=$kon2->nilai;
						}
						$ppn=0.1*$tot;
						$tot2=$ppn+$tot;
						$html.= "<tr class='istyle15'>
									  <td colspan='2' height='7'></td>
									  </tr>
								</table></td>
							  </tr>
							</table></td>
						  </tr>
						  <tr class='istyle15'>
							<td height='5'></td>
							<td height='5'></td>
							<td height='5'></td>
							<td height='5'></td>
						  </tr>
						  <tr class='istyle15'>
							<td align='center'>SUB TOTAL </td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
							  <tr class='istyle15'>
								<td width='13%'>Rp.</td>
								<td width='87%' align='right'>".number_format($tot,0,",",".")."</td>
							  </tr>
							</table></td>
						  </tr>
						  <tr class='istyle15'>
							<td align='center'>PPN 10% </td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
							  <tr class='istyle15'>
								<td width='13%'>Rp.</td>
								<td width='87%' align='right'>".number_format($ppn,0,",",".")."</td>
							  </tr>
							</table></td>
						  </tr>
						  <tr class='istyle15'>
							<td align='center'>TOTAL</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
							  <tr class='istyle15'>
								<td width='13%'>Rp.</td>
								<td width='87%' align='right'>".number_format($tot2,0,",",".")."</td>
							  </tr>
							</table></td>
						  </tr>
						  <tr class='istyle15'>
							<td align='center'>TOTAL (Pembulatan) </td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td><table width='100%' border='0' cellspacing='2' cellpadding='2'>
							  <tr class='istyle18'>
								<td width='13%'>Rp.</td>
								<td width='87%' align='right'>".number_format($tot2,0,",",".")."</td>
							  </tr>
							</table></td>
						  </tr>
						</table></td>
					  </tr>
					  <tr>
						<td class='istyle15'>Terbilang :</td>
					  </tr>
					  <tr>
						<td class='istyle15'># ".strtoupper(substr($AddOnLib->terbilang(round($tot2)),0,1))."".substr($AddOnLib->terbilang(round($tot2)),1)." # </td>
					  </tr>
					  <tr>
						<td>&nbsp;</td>
					  </tr>
					  <tr>
						<td><table width='100%' border='0' cellspacing='1' cellpadding='1'>
						  <tr>
							<td width='33%'>&nbsp;</td>
							<td width='33%'>&nbsp;</td>
							<td width='34%' class='istyle15'>Jakarta, ".substr($rs->tgl,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tgl),0,6))."</td>
						  </tr>
						  <tr>
							<td class='istyle15'>Pembayaran agar di transfer </td>
							<td>&nbsp;</td>
							<td class='istyle15'>Hormat kami,</td>
						  </tr>
						  <tr>
							<td class='istyle15'>ke Rekening PT. Dayamitra Telekomunikasi </td>
							<td>&nbsp;</td>
							<td class='istyle18'>PT. Dayamitra Telekomunikasi </td>
						  </tr>
						  <tr>
							<td class='istyle15'>No. 070-0004492349 </td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td class='istyle15'>pada Bank Mandiri </td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td class='istyle15'>Cabang Jakarta MT Haryono</td>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td class='istyle18'><u>".strtoupper($rs->nmapp)."</u></td>
						  </tr>
						  <tr>
							<td>&nbsp;</td>
							<td>&nbsp;</td>
							<td class='istyle15'>".strtoupper($rs->jabatan)."</td>
						  </tr>
						</table></td>
					  </tr>
					</table>";
			}else{
			$ppn=0.1*$rs->nilai;
			$tot=$ppn+$rs->nilai;
			$html.= "<table width='750' border='0' align='center' cellpadding='1' cellspacing='0'>
					  <tr>
					    <td width='293'>&nbsp;</td>
					    <td width='231'>&nbsp;</td>
					    <td width='220' align='center' class='nstyle16'>INVOICE / FAKTUR </td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td align='right' class='istyle18'>No. : </td>
					    <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>INV. ".$rs->no_invoice."</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td align='right' class='istyle18'>Date : </td>
					    <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>".substr($rs->tgl,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tgl),0,6))."</td>
					  </tr>
					  <tr>
					    <td class='istyle18'>To / Kepada Yth :</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>".$rs->nmcust."</td>
					    <td>&nbsp;</td>
					    <td class='istyle18' style='border-left:2px solid #111111; border-bottom:1px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>CONTRACT REF / NO. KONTRAK </td>
					  </tr>
					  <tr>
					    <td align='center' class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;'>".$rs->alamat." <br />".$rs->kota." ".$rs->kode_pos."</td>
					    <td>&nbsp;</td>
					    <td align='center' class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;'>PERJANJIAN INDUK <br />No. : ".$rs->no_kontrak." <br /> Tahun ".substr($rs->tgl,0,4)."</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='3'><table width='100%' border='2' cellspacing='0' cellpadding='1' style='border:2px solid #111111; border-collapse:collapse'>
					      <tr>
					        <td width='6%' class='istyle18' align='center'>NO<br />NO</td>
					        <td width='72%' class='istyle18' align='center'>DESCRIPTION<br />
					          URAIAN</td>
					        <td width='22%' class='istyle18' align='center'>AMOUNT<br />
					          JUMLAH </td>
					      </tr>
					      <tr valign='top'>
					        <td height='122'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>A</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					        </table></td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Biaya Sewa Tower / Menara Site <strong>".$rs->nmfa."</strong></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Nomor Site : ".$rs->no_fa."</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Alamat Site : ".$rs->almtsite."</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Periode Sewa : ".substr($rs->tglkon,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tglkon),0,6))." s/d ".substr($rs->tanggal_akhir,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tanggal_akhir),0,6))." </td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					          </tr>
					        </table></td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td width='15%' class='istyle18'>Rp.</td>
					            <td width='85%' class='istyle18' align='right'>".number_format($rs->nilai,0,",",".")."</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='2'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr style='border-left:0px solid'>
					        <td colspan='2' rowspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td width='7%'>&nbsp;</td>
					            <td width='75%' rowspan='3' valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					              <tr>
					                <td class='istyle18'>Terbilang : </td>
					              </tr>
					              <tr>
					                <td class='istyle18'># ".strtoupper(substr($AddOnLib->terbilang(round($tot)),0,1))."".substr($AddOnLib->terbilang(round($tot)),1)." # </td>
					              </tr>
					            </table></td>
					            <td width='18%' class='istyle18'>SUB TOTAL</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td class='istyle18'>PPN 10%</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td class='istyle18'>TOTAL</td>
					          </tr>
					        </table></td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr class='istyle18'>
					            <td width='17%'>Rp.</td>
					            <td width='83%' align='right'>".number_format($rs->nilai,0,",",".")."</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr class='istyle18'>
					            <td width='17%'>Rp.</td>
					            <td width='83%' align='right'>".number_format($ppn,0,",",".")."</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr class='istyle18'>
					            <td width='17%'>Rp.</td>
					            <td width='83%' align='right'>".number_format($tot,0,",",".")."</td>
					          </tr>
					        </table></td>
					      </tr>
					      
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td width='6%'>&nbsp;</td>
					        <td width='94%' class='istyle18'>Remittance to / Pembayaran ke : </td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>Rekening PT. Dayamitra Telekomunikasi </td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111; background:#F7F7F7' align='center'>Due Date/Jatuh Tempo</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>No. 0070-0004492349 </td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>".substr($rs->tanggal_baps,8,2)." ".$AddOnLib->ubah_periode(substr(str_replace("-","",$rs->tanggal_baps),0,6))."</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>Bank Mandiri</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>Cabang Jakarta MT. Haryono</td>
					        <td>&nbsp;</td>
					        <td class='istyle18'>Hormat Kami, </td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>( Rupiah )</td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-top:2px solid #111111; border-right:2px solid #111111;' align='center'>PT. DAYAMITRA TELEKOMUNIKASI </td>
					      </tr>
					      <tr>
					        <td height='97'>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td>&nbsp;</td>
					        <td class='istyle18' style='border-left:2px solid #111111; border-right:2px solid #111111;' align='center'><u>".strtoupper($rs->nmapp)."</u> </td>
					      </tr>
					      <tr>
					        <td width='6%'>&nbsp;</td>
					        <td width='33%'>&nbsp;</td>
					        <td width='25%'>&nbsp;</td>
					        <td width='36%' class='istyle15' style='border-left:2px solid #111111; border-right:2px solid #111111; border-bottom:2px solid #111111;' align='center'>".strtoupper($rs->jabatan)."</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='3'>&nbsp;</td>
					  </tr>
					</table>";
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
