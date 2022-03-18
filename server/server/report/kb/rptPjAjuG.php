<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptPjAjuG
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
					        <td colspan='2' align='center' class='istyle17'>PENGAJUAN PANJAR </td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td colspan='4' height='5'></td>
					        </tr>
					      <tr>
					        <td width='15%' class='istyle15'>Departemen</td>
					        <td colspan='3' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					        </tr>
					      
					      
					      <tr>
					        <td colspan='4' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>Program Kerja </td>
					        <td colspan='3' valign='top' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td colspan='4' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>Anggaran</td>
					        <td width='30%' valign='top' class='istyle15' style='border:1px solid #111111;'>Rp</td>
					        <td width='26%' align='center' valign='top' class='istyle15'>Sisa Anggaran s.d saat ini </td>
					        <td width='29%' valign='top' class='istyle15' style='border:1px solid #111111;'>Rp</td>
					      </tr>
						  <tr>
					        <td colspan='4' height='5'></td>
					        </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
					      <tr>
					        <td colspan='2' class='istyle15' style='padding:2px;'>Mohon diberikan dana panjar sebesar </td>
					        <td width='30%' class='istyle15' style='padding:2px; border:1px solid #111111;'>Rp</td>
					        <td width='38%'>&nbsp;</td>
					      </tr>
					       <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
					      <tr>
					        <td width='12%' class='istyle15' style='padding:2px;'>terbilang</td>
					        <td colspan='3' class='istyle15' style='padding:2px; border:1px solid #111111; background-color:#CCCCCC;'>&nbsp;</td>
					        </tr>
					      <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
					      <tr>
					        <td class='istyle15' colspan='4' style='padding:2px;'>dengan perincian sebagai berikut</td>
					      </tr>
					      <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
					      <tr>
					        <td colspan='4'><table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					          <tr align='center'>
					            <td class='istyle15' width='4%' height='32'>No.</td>
					            <td class='istyle15' width='21%'>Kode Akun </td>
					            <td class='istyle15' width='50%'>Uraian</td>
					            <td class='istyle15' width='25%'>Taksiran Biaya </td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td class='istyle15'>&nbsp;</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='4' height='5'></td>
					      </tr>
					      <tr>
					        <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td class='istyle15' width='30%'>Tanggal penerimaan panjar </td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='25%' class='istyle15' align='right'>T O T A L : &nbsp;&nbsp;</td>
					            <td width='25%' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					          </tr>
								<tr>
					            <td colspan='13' class='istyle15' height='5'></td>
					            </tr>
								<tr>
					            <td class='istyle15' width='30%'>Maksimal tanggal pertanggungjawaban </td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td class='istyle15' align='center' width='2%'>-</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td width='2%' align='center' class='istyle15' style='border:1px solid #111111; border-left-width:0px;'>&nbsp;</td>
					            <td colspan='2' align='center' class='istyle15'>&nbsp;</td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='4' height='5'></td>
					      </tr>
					      <tr>
					        <td colspan='4' style='border:1px solid #111111; padding:3px;' class='istyle14' valign='top' align='justify'>Untuk pertanggungan panjar tersebut kami sanggup dilakukan pemotongan gaji atau kompensasi lainnya dari jumlah yang belum dipertanggungkan apabila panjar ini belum diselesaikan selama-lamanya 14 (empat belas) hari sejak tanggal permintaan. </td>
					      </tr>
					      <tr>
					        <td colspan='4' height='5'></td>
					      </tr>
					      <tr>
					        <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td width='31%'><table width='100%' height='169' border='0' cellpadding='2' cellspacing='0'>
					              <tr>
					                <td valign='top' height='169' class='istyle15' style='padding:3px; border:1px solid #111111;'>Catatan :</td>
					              </tr>
					            </table></td>
					            <td width='1%'>&nbsp;</td>
					            <td width='68%'><table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					              <tr>
					                <td colspan='2' class='istyle15' align='center'>PENGAJUAN</td>
					                <td width='34%' class='istyle15' align='center'>PEMBAYARAN</td>
					              </tr>
					              
					              <tr>
					                <td width='33%' height='128'><table width='100%' height='117' border='0' cellpadding='2' cellspacing='0'>
					                  <tr>
					                    <td width='8%' height='99'>&nbsp;</td>
					                    <td align='center' class='istyle14' width='84%' valign='bottom' style='border-bottom:1px solid #111111;'><em>Manager / <br />
					                      General Manager/Director </em></td>
					                    <td width='8%'>&nbsp;</td>
					                  </tr>
					                  <tr>
					                    <td colspan='3' height='5'></td>
					                  </tr>
					                </table></td>
					                <td width='33%'><table width='100%' height='117' border='0' cellpadding='2' cellspacing='0'>
					                  <tr>
					                    <td width='8%' height='99'>&nbsp;</td>
					                    <td align='center' class='istyle14' width='84%' valign='bottom' style='border-bottom:1px solid #111111;'><em>General Manager/Director </em></td>
					                    <td width='8%'>&nbsp;</td>
					                  </tr>
					                  <tr>
					                    <td colspan='3' height='5'></td>
					                  </tr>
					                </table></td>
					                <td><table width='100%' height='117' border='0' cellpadding='2' cellspacing='0'>
					                  <tr>
					                    <td width='8%' height='99'>&nbsp;</td>
					                    <td align='center' class='istyle14' width='84%' valign='bottom' style='border-bottom:1px solid #111111;'><em>Treasury &amp; Accounting General Manager / Finance &amp; Administration Director </em></td>
					                    <td width='8%'>&nbsp;</td>
					                  </tr>
					                  <tr>
					                    <td colspan='3' height='5'></td>
					                    </tr>
					                </table></td>
					              </tr>
					              <tr>
					                <td class='istyle15'>Tanggal : </td>
					                <td class='istyle15'>Tanggal :</td>
					                <td class='istyle15'>Tanggal :</td>
					              </tr>
					            </table></td>
					          </tr>
					        </table></td>
					      </tr>
					     <tr>
					        <td colspan='4' height='5'></td>
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