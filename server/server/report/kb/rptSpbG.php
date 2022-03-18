<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptSpbG
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
		
		$sql = "select count(distinct a.no_spb) from spb_m a ".$this->filter;
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
		$sql0="select distinct a.no_spb from spb_m a ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_spb,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.kode_pp,date_format(a.tanggal,'%Y') as thn,a.nilai,
				a.nilai_pot,(a.nilai-a.nilai_pot) as tot,a.no_dokumen,b.kode_akun,c.nama as nmakun,b.keterangan as ket,b.nilai as nilai2,d.logo
				from spb_m a
				inner join spb_j b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi and a.modul='SPP' 
				inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi 
				inner join lokasi d on a.kode_lokasi=d.kode_lokasi ".$this->filter.
				" and a.no_spb='".$page->fields[0]."' order by a.no_spb ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/".$rs->logo;
			$html="<br />";
			$html.=	"<table width='750' border='1' align='center' cellpadding='5' cellspacing='0' class='kotak'>
					  <tr>
					    <td width='12%' valign='top' style='padding:3px'><img src=$pathfoto width='80' height='99' /></td>
					    <td width='88%'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					      <tr>
					        <td width='69%' align='right' class='istyle15'>Nomor : </td>
					        <td width='31%' align='center' class='istyle15' style='border:1px solid #111111'>".$rs->no_spb."</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2' align='center' class='istyle17'>SURAT PERINTAH BAYAR </td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td width='19%' class='istyle15'>Kode Lokasi PP</td>
					        <td width='2%' class='istyle15'>:</td>
					        <td width='22%' class='istyle15' style='border:1px solid #111111;'>".$rs->kode_pp."</td>
					        <td width='5%'>&nbsp;</td>
					        <td width='22%' class='istyle15'>Beban Anggaran tahun </td>
					        <td width='22%' class='istyle15' style='border:1px solid #111111;'>".$rs->thn."</td>
					        <td width='8%'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td colspan='3' class='istyle15'>Mohon dibayarkan uang</td>
					        </tr>
					      <tr>
					        <td width='16%' class='istyle15'>sebesar</td>
					        <td width='27%' class='istyle15' style='border:1px solid #111111;'>Rp ".number_format($rs->nilai,0,",",".")."</td>
					        <td width='57%'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>terbilang</td>
					        <td class='istyle15' valign='top' colspan='2' style='border:1px solid #111111; background-color:#CCCCCC;'>".$AddOnLib->terbilang($rs->nilai)."</td>
					        </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>kepada</td>
					        <td class='istyle15' valign='top' colspan='2' style='border:1px solid #111111;'>".$rs->no_dokumen."</td>
					        </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>untuk pembayaran </td>
					        <td height='50' class='istyle15' colspan='2' valign='top' style='border:1px solid #111111;'>".$rs->keterangan."</td>
					        </tr>
						  <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					      <tr align='center'>
					        <td width='4%' class='istyle15'>No.</td>
					        <td width='16%' class='istyle15'>Nomor Akun </td>
					        <td width='28%' class='istyle15'>Nama Akun </td>
					        <td width='31%' class='istyle15'>Keterangan</td>
					        <td width='21%' class='istyle15'>Jumlah</td>
					      </tr>";
				$i=1;
				$data=$dbLib->execute($sql);
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					$html.="<tr valign='top'>
					        <td class='istyle15' align='center'>$i.</td>
					        <td class='istyle15'>".$dt->kode_akun."</td>
					        <td class='istyle15'>".$dt->nmakun."</td>
					        <td class='istyle15'>".$dt->ket."</td>
					        <td class='istyle15' align='right'>".number_format($dt->nilai2,0,",",".")."</td>
					      </tr>";
					$i++;
				}
				while ($i<=4)
				{
					$html.="<tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>";
					$i++;
				}
				$html.= "</table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td width='46%' valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='2' align='center' class='istyle15'>PENGAJUAN</td>
					            </tr>
					          <tr>
					            <td width='50%' align='center' class='istyle15'>Dibuat oleh :</td>
					            <td width='50%' align='center' class='istyle15'>Disetujui oleh :</td>
					          </tr>
					          <tr>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					              <tr>
					                <td height='87'>&nbsp;</td>
					              </tr>
					              
					              <tr>
					                <td align='center' class='istyle15'><em><u>Administration Staff</u></em></td>
					                </tr>
					            </table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					              <tr>
					                <td height='87'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'><em><u>General Manager / Director </u></em></td>
					              </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					        </table></td>
					        <td width='31%' align='center' valign='top'><table width='94%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='7'><table width='100%' border='0' cellspacing='1' cellpadding='2'>
					              <tr>
					                <td class='istyle15' colspan='3'>Dokumen Pendukung </td>
					                <td class='istyle15'>OK</td>
					                <td width='3%'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td colspan='5' height='5'></td>
					                </tr>
					              <tr>
					                <td class='istyle15'>1.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>2.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>3.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>4.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15'>5.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
					              <tr>
					                <td class='istyle15' width='10%'>6.</td>
					                <td class='istyle15' style='border-bottom:1px solid #111111;'>&nbsp;</td>
					                <td width='12%' style='border:1px solid #111111;'>&nbsp;</td>
					                <td width='12%' style='border:1px solid #111111;'>&nbsp;</td>
					                <td>&nbsp;</td>
					              </tr>
								  <tr>
					                <td colspan='5' height='5'></td>
					                </tr>
					            </table></td>
					            </tr>
					        </table></td>
					        <td width='23%' align='center' valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td class='istyle15' align='center'>VERIFIKASI</td>
					          </tr>
					          <tr>
					            <td class='istyle15' align='center'>Anggaran</td>
					          </tr>
					          <tr>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					              <tr>
					                <td height='87'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'><em><u>Budget Analyst </u></em></td>
					              </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					          <tr>
					            <td class='istyle15' align='center'>Keuangan</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='3' height='5'></td>
					        </tr>
					      <tr>
					        <td valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='2' align='center' class='istyle15'>PEMBAYARAN</td>
					          </tr>
					          
					          <tr>
					            <td width='50%' rowspan='2' valign='top'><table width='100%' border='0' cellspacing='3' cellpadding='1'>
					              <tr>
					                <td colspan='2' height='5'></td>
					                </tr>
					              <tr>
					                <td width='17%' style='border:1px solid #111111;'>&nbsp;</td>
					                <td width='83%' class='istyle15'>Kas</td>
					              </tr>
					              <tr>
					                <td style='border:1px solid #111111;'>&nbsp;</td>
					                <td class='istyle15'>Bank</td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td class='istyle15'>Nomor Akun Bank </td>
					              </tr>
					              <tr>
					                <td>&nbsp;</td>
					                <td class='istyle15' style='border:1px solid #111111;' height='28'>&nbsp;</td>
					              </tr>
					            </table></td>
					            <td width='50%'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='71'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center' class='istyle15'><em><u>Treasury Manager </u></em></td>
					                </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					        </table></td>
					        <td valign='top' align='center'><table width='94%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td colspan='7'><table width='100%' height='96' border='0' cellpadding='1' cellspacing='1'>
					              <tr>
					                <td class='istyle15'>Catatan :</td>
					              </tr>
					              <tr>
					                <td height='105' valign='top' class='istyle15'>&nbsp;</td>
					              </tr>
					            </table></td>
					          </tr>
					        </table></td>
					        <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					          <tr>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='90'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center' class='istyle15'><em><u>Verification Staff </u></em></td>
					                </tr>
					            </table></td>
					          </tr>
					          <tr>
					            <td class='istyle15'>Tanggal :</td>
					          </tr>
					          
					        </table></td>
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