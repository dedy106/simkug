<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptSPBPinj
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
		
		$sql = "select count(distinct a.no_spb) ".
			"from spb_m a ".$this->filter2." and a.modul='KP.SPB' and a.jenis='PINJ' and a.no_del='-' ";
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
		$sql0="select distinct a.no_spb ".
              "from spb_m a ".$this->filter2." and a.modul='KP.SPB' and a.jenis='PINJ' and a.no_del='-' ";
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{			
			$sql = "select distinct a.no_spb,date_format(a.tanggal,'%e/%m/%Y') as tgl,upper(d.nama) as nsbh,upper(d.alamat) as almt,d.no_rek, 
				a.keterangan,d.nama as nm_agg, upper(d.bank) as bank,upper(d.cabang) as cabang,d.no_rek as norek,  upper(d.nama_rek) as nmrek,(a.nilai+a.nilai_pot) as nilai,a.nilai_pot,a.nilai as tot ,
				j.nama as nama_buat,
				g.nama as gm, h.nama as setuju,  i.initial as nmunit 
				from spb_m a inner join kop_pinj_spb b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi and a.modul='KP.SPB' and a.jenis='PINJ' and a.no_del='-' 
				inner join kop_pinj_m c on b.no_pinj=c.no_pinj and b.no_kontrak=c.no_kontrak and b.kode_lokasi=c.kode_lokasi 
				inner join kop_agg d on c.kode_agg=d.kode_agg and c.kode_lokasi=d.kode_lokasi 
				inner join kop_loker e on d.kode_loker=e.kode_loker and d.kode_lokasi=e.kode_lokasi 
				inner join  karyawan j on j.nik = a.nik_buat and j.kode_lokasi = a.kode_lokasi ".
				"inner join pp i on a.kode_lokasi= i.kode_lokasi and i.kode_pp = a.kode_pp ". 
				"left outer join karyawan g on g.jabatan = 'GENERAL MANAGER' and g.kode_lokasi = a.kode_lokasi ".  
				"left outer join karyawan h on h.jabatan like 'MANAGER%' and h.kode_lokasi = a.kode_lokasi and substring(h.kode_pp,1,4) = substring(a.kode_pp, 1, 4) ". 
				$this->filter.
				" and a.no_spb='".$page->fields[0]."' order by a.no_spb ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			error_log($invc->RecordCount());
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/kopeg.png";
			$html="<br />";
			$html.=	"<table width='700' align='center' cellpadding='0' cellspacing='0'>
					  <tr>
					    <td style='border:3px solid #111111; border-bottom-width:0px;'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td style='border-bottom:1px solid #111111;'><table width='100%' height='110' border='0' cellpadding='0' cellspacing='0'>
					          <tr>
					            <td width='12%' valign='top' style='padding:3px'><img src=$pathfoto width='80' height='99' /></td>
					            <td width='88%' valign='top' align='center'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					              <tr>
					                <td align='center' class='istyle17'><u>SURAT PERINTAH BAYAR</u></td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'>".$rs->no_spb."</td>
					              </tr>
					            </table></td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2' style='padding-left:4px;'>
					          <tr>
					            <td colspan='5'>Mohon bantuan Saudara untuk membayarkan uang sejumlah Rp. ".number_format($rs->tot,0,",",".").",00</td>
					            </tr>
					          <tr>
					            <td valign='top' width='17%'>Terbilang</td>
					            <td valign='top' width='1%'>:</td>
					            <td colspan='3'>".$AddOnLib->terbilang(round($rs->tot))." </td>
					            </tr>
					          <tr>
					            <td colspan='5'>&nbsp;</td>
					            </tr>
					          <tr>
					            <td>Kepada</td>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td colspan='2' align='center' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Verifikasi ".$rs->tgl."</td>
					            </tr>
					          <tr>
					            <td height='27'>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td width='19%' align='center' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Anggaran ".$rs->tgl."</td>
					            <td width='19%' align='center' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Pembayaran</td>
					          </tr>
					          <tr>
					            <td>Nama</td>
					            <td>:</td>
					            <td>".($invc->RecordCount() == 1 ? $rs->nm_agg : "--- TERLAMPIR ---") ."</td>
					            <td rowspan='4' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>
					            <td rowspan='4' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'><table width='100%' border='0' cellspacing='6' cellpadding='0'>
					              <tr>
					                <td width='16%' style='border:1px solid #111111'>&nbsp;</td>
					                <td width='84%'>Cash</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>Transfer</td>
					              </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td valign='top'>Alamat</td>
					            <td valign='top'>:</td>
					            <td>".($invc->RecordCount() == 1 ? $rs->almt : "&nbsp;") ."</td>
					            </tr>
					          <tr>
					            <td>No. Rekening </td>
					            <td>:</td>
					            <td valign='top'>".($invc->RecordCount() == 1 ? $rs->norek : "--- TERLAMPIR ---") ."</td>
					            </tr>
					          <tr>
					            <td>Untuk Pembayaran</td>
					            <td>:</td>
					            <td>$rs->keterangan</td>
					            </tr>
					          <tr>
					            <td>Nama Bank</td>
					            <td>:</td>
					            <td>".($invc->RecordCount() == 1 ? $rs->bank : "--- TERLAMPIR ---") ."</td>
					            <td colspan='2' rowspan='3' valign='top' style='border:1px solid #111111; border-right-width:0px;'>Manager Keuangan</td>
					            </tr>
					          <tr>
					            <td>Alamat Bank</td>
					            <td>:</td>
					            <td>".($invc->RecordCount() == 1 ? $rs->cabang : "--- TERLAMPIR ---") ."</td>
					            </tr>
					          <tr>
					            <td>Nama Rekening</td>
					            <td>:</td>
					            <td>".($invc->RecordCount() == 1 ? $rs->nmrek : "--- TERLAMPIR ---") ."</td>
					            </tr>
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td height='517' style='border:3px solid #111111' valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td width='600%' height='5' colspan='6' style='border-top:1px solid #111111'></td>
					      </tr>
					      <tr>
					        <td colspan='6' style='padding:0px' align='right'><table width='98%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='50%' style='border:1px solid #111111; border-right-width:0px;'><table width='93%' border='0' cellspacing='0' cellpadding='3'>
					              <tr>
					                <td width='2%'>&nbsp;</td>
					                <td width='29%' class='istyle18'>Perhitungan : </td>
					                <td width='4%'>&nbsp;</td>
					                <td width='8%'>&nbsp;</td>
					                <td width='52%'>&nbsp;</td>
					                <td width='2%'>&nbsp;</td>
					                <td width='3%'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr class='istyle15'>
					                <td>&nbsp;</td>
					                <td>Nilai Tagihan </td>
					                <td>:</td>
					                <td>Rp.</td>
					                <td align='right'>".number_format($rs->nilai,0,",",".").",00</td>
					                <td align='right'>&nbsp;</td>
					                <td align='right'>&nbsp;</td>
					              </tr>
					              <tr class='istyle15'>
					                <td>&nbsp;</td>
					                <td style='border-bottom:1px solid #111111;'>Nilai Potongan </td>
					                <td style='border-bottom:1px solid #111111;'>:</td>
					                <td style='border-bottom:1px solid #111111;'>Rp.</td>
					                <td style='border-bottom:1px solid #111111;' align='right'>".number_format($rs->nilai_pot,0,",",".").",00</td>
					                <td align='right'>&nbsp;</td>
					                <td style='border-bottom:1px solid #111111;' align='right'>&nbsp;</td>
					              </tr>
					              <tr class='istyle15'>
					                <td>&nbsp;</td>
					                <td>Ditransfer</td>
					                <td>:</td>
					                <td>Rp.</td>
					                <td align='right'>".number_format($rs->tot,0,",",".").",00</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					            </table></td>
					            <td width='50%' style='border:1px solid #111111; border-right-width:0px;'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					              <tr>
					                <td width='2%'>&nbsp;</td>
					                <td rowspan='6' valign='top' class='istyle18'>Catatan : </td>
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
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='6'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td height='127' colspan='6' align='right' style='padding:0px;' valign='top'><table width='98%' border='0' cellspacing='0' cellpadding='3'>
					          <tr align='center'>
					            <td class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Fiatur ***) </td>
					            <td colspan='2' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Mengetahui / Menyetujui **) </td>
					            <td width='25%' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Bandung, ".$rs->tgl."</td>
					          </tr>
					          <tr align='center' class='istyle15'>
					            <td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Ketua/Bdh/Sekr</td>";
					if ($rs->tot >= 5000000)
						$html .= " <td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>GM</td>
								<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Man UNIT $rs->nmunit</td>";
					else $html .= "<td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Man UNIT $rs->nmunit</td>";
					$html .= "<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Yang Mengajukan *)</td>
					          </tr>
					          <tr>
					            <td height='55' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>";
					if ($rs->tot >= 5000000)
					     $html .="<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>					            
					            <td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>";
					else $html .="<td colspan='2' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>";
					$html .= "<td style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>
					          </tr>
					          <tr align='center' class='istyle15'>
					            <td width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;</td>";
					if ($rs->tot >= 5000000)
					    $html .= "<td width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;$rs->gm</td>
					            <td width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;$rs->setuju</td>";
					else $html .= "<td colspan='2' width='25%' style='border:1px solid #111111; border-right-width:0px;'>&nbsp;$rs->setuju</td>";
					$html .="<td style='border:1px solid #111111; border-right-width:0px;'>&nbsp;$rs->nama_buat</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td height='162' colspan='6' align='right' style='padding:0px' valign='top'><table width='98%' border='0' cellspacing='0' cellpadding='3'>
					          <tr align='center'>
					            <td width='30%' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>&nbsp;</td>
					            <td width='20%' class='istyle15' style='border:1px solid #111111; border-right-width:0px;' align='left'>Tanggal</td>
					            <td colspan='2' class='istyle15' style='border:1px solid #111111; border-bottom-width:0px; border-right-width:0px;'>Kelengkapan Dokumen</td>
					            </tr>
					          <tr align='center' class='istyle15'>
					            <td colspan='2' style='border-left:1px solid #111111;'>Penerima</td>
					            <td width='51%' colspan='2' rowspan='3' style='border:1px solid #111111; border-top-width:0px; border-right-width:0px;'><table width='91%' border='0' cellspacing='3' cellpadding='2'>
					              <tr>
					                <td width='7%' style='border:1px solid #111111'>&nbsp;</td>
					                <td width='93%'>Kuitansi / Faktur </td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>SPK/PKS/ST/DO</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>BAST</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>AKI</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111'>&nbsp;</td>
					                <td>Faktur Pajak/SSP </td>
					              </tr>
					            </table></td>
					            </tr>
					          <tr>
					            <td height='90' colspan='2' style='border-left:1px solid #111111;'>&nbsp;</td>
					            </tr>
					          <tr align='center' class='istyle15'>
					            <td colspan='2' style='border-left:1px solid #111111; border-bottom:1px solid #111111'>(.............................................................................................)</td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='6' align='right' valign='top' style='padding:0px;'><table width='98%' border='0' cellspacing='0' cellpadding='3'>
					          <tr>
					            <td height='60' colspan='3' class='istyle15' style='border:1px solid #111111; border-right-width:0px;' valign='top'>Disposisi Manajemen </td>
					            </tr>
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					</table>
					<table width='700' border='0' align='center' cellpadding='0' cellspacing='2'>
					  <tr>
					    <td colspan='2' class='istyle14'>Catatan : </td>
					  </tr>
					  <tr>
					    <td class='istyle14' width='23'>*)</td>
					    <td class='istyle14' width='671'>Pemegang Imprest Fund/Panjar atau Petugas penanggung jawab pekerjaan. </td>
					  </tr>
					  <tr>
					    <td class='istyle14'>**)</td>
					    <td class='istyle14'>Dibawah Rp. 5.000.000 ditandatangani oleh Manajer. Diatas Rp. 5.000.000 ditandatangani oleh Manajer dan GM.</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle14'>***)</td>
					    <td valign='top' class='istyle14'>Dibawah Rp. 5.000.000 ditandatangani oleh Sekretaris. Diatas Rp. 5.000.000 s/d 50.000.000 ditandatangani oleh Bendahara. Diatas Rp.  50.000.000 ditandatangani oleh Ketua.</td>
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
