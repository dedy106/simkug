<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptIFPtg2
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
		$sql = "select 1";
		//$sql = "select count(distinct a.no_ifptg) from ifptg_m a ".$this->filter;
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
		//$sql0="select distinct a.no_ifptg from ifptg_m a ".$this->filter;
		$sql0="select 'tes' ";
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			/*$sql = "select a.*,f.logo
				from ifptg_m a 
				inner join lokasi f on a.kode_lokasi=f.kode_lokasi ".$this->filter.
				" and a.no_kas='".$page->fields[0]."' order by b.dc desc ";*/
			$sql="select 'gratika.png' as logo ";
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
					        <td width='31%' align='center' class='istyle15' style='border:1px solid #111111'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2' align='center' class='istyle17'>PERTANGGUNGJAWABAN PENGGUNAAN KAS KECIL </td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td height='5' colspan='2'></td>
					      </tr>
					      <tr>
					        <td width='5%'>&nbsp;</td>
					        <td width='95%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td class='istyle15' width='9%'>Lokasi</td>
					            <td width='36%' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='13%'>Kode Lokasi </td>
					            <td width='3%' class='istyle15'>&nbsp;</td>
					            <td width='26%' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='13%'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td height='7' colspan='2'></td>
					      </tr>
					      <tr>
					        <td>&nbsp;</td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td class='istyle15' width='9%'>Periode</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
								<td width='4%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
								<td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='6%'>s.d</td>
								<td width='4%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
								<td width='4%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
								<td width='4%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
								<td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='4%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='13%'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td height='5' colspan='2'></td>
					      </tr>
					    </table></td>
					  </tr>
					  
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px; padding-bottom:0px;'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					      <tr align='center'>
					        <td width='4%' class='istyle15'>No.</td>
					        <td width='8%' class='istyle15'>Tanggal</td>
					        <td width='14%' class='istyle15'>No. BKKK </td>
					        <td width='37%' class='istyle15'>Uraian</td>
					        <td width='17%' class='istyle15'>Jumlah (Rp) </td>
					        <td width='20%' class='istyle15'>No. Akun </td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>Saldo awal </td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					      <tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>
					    </table>
					      <table width='100%' border='0' cellspacing='0' cellpadding='0'>
					        <tr>
					          <td width='80%'><table width='101%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td colspan='3' height='5'></td>
					              <td width='128' height='5' style='border:1px solid #111111; border-top-width:0px;'></td>
					            </tr>
					            <tr>
					              <td class='istyle15' width='191' valign='top' style='padding:2px; border:1px solid #111111; border-bottom-width:0px;'>Catatan : </td>
					              <td width='69' rowspan='7'>&nbsp;</td>
					              <td class='istyle15' width='204' style='padding:2px;'>Total Penggunaan Kas Kecil (*) </td>
					              <td class='istyle15' style='border:1px solid #111111; border-top-width:0px;' align='right'>&nbsp;</td>
					            </tr>
					            <tr>
					              <td width='191' valign='top' style='padding:2px; border-left:1px solid #111111; border-right:1px solid #111111;'></td>
					              <td height='5'></td>
					              <td height='5' style='border:1px solid #111111; border-top-width:0px;'></td>
					            </tr>
					            <tr>
					              <td class='istyle15' width='191' valign='top' style='padding:2px; border-left:1px solid #111111; border-right:1px solid #111111;'>(*) Pengisian kembali sejumlah </td>
					              <td class='istyle15' style='padding:2px;'>Saldo Kas Kecil </td>
					              <td class='istyle15' style='border:1px solid #111111; border-top-width:0px;' align='right'>&nbsp;</td>
					            </tr>
					            <tr>
					              <td width='191' valign='top' style='padding:2px; border-left:1px solid #111111; border-right:1px solid #111111;'></td>
					              <td height='5'></td>
					              <td height='5' style='border:1px solid #111111; border-top-width:0px;'></td>
					            </tr>
					            <tr>
					              <td class='istyle15' width='191' valign='top' style='padding:2px; border-left:1px solid #111111; border-right:1px solid #111111;'>total penggunaan kas kecil </td>
					              <td class='istyle15' style='padding:2px;'>Jumlah Pengisian Kas Kecil (*) </td>
					              <td class='istyle15' style='border:1px solid #111111; border-top-width:0px;' align='right'>&nbsp;</td>
					            </tr>
					            <tr>
					              <td width='191' valign='top' style='padding:2px; border:1px solid #111111; border-top-width:0px;'></td>
					              <td height='5'></td>
					              <td height='5' style='border:1px solid #111111; border-top-width:0px;'></td>
					            </tr>
					            <tr>
					              <td width='191' valign='top' style='padding:2px;'></td>
					              <td height='10'></td>
					              <td height='10' style='border:1px solid #111111; border-top-width:0px; border-bottom-width:0px;'></td>
					            </tr>
					          </table></td>
							  <td width='20%' align='right'><table width='95%' height='16%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td height='64' class='istyle15' valign='top'>Pengisian kembali telah dilakukan dan diterima oleh Pemegang Kas Kecil sesuai dengan Bukti Kas Keluar No : </td>
					            </tr>
					            <tr>
					              <td class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            </tr>
					            
					          </table></td>
					        </tr>
					      </table></td>
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
					                <td align='center' class='istyle15'><em><u>Pemegang Kas Kecil </u></em></td>
					                </tr>
					            </table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					              <tr>
					                <td height='87'>&nbsp;</td>
					              </tr>
					              <tr>
					                <td align='center' class='istyle15'><em><u>General Manager terkait  </u></em></td>
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
					        <td valign='top' align='center'><table width='94%' border='1' cellspacing='0' cellpadding='1' class='kotak4'>
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