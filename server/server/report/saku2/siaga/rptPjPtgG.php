<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptPjPtgG
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
					        <td align='right' class='istyle15'>Nomor : </td>
					        <td align='center' class='istyle15' style='border:1px solid #111111'>&nbsp;</td>
					      </tr>
						  <tr>
					        <td colspan='2' height='7'></td>
					      </tr>
					      <tr>
					        <td width='69%' align='right' class='istyle15'>Nomor Pengajuan : </td>
					        <td width='31%' align='center' class='istyle15' style='border:1px solid #111111'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2' align='center' class='istyle17'>DAFTAR PERTANGGUNGJAWABAN PANJAR KERJA </td>
					      </tr>
					      <tr>
					        <td colspan='2' height='5'></td>
					      </tr>
					    </table></td>
					  </tr>
					  
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					      <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
					      <tr>
					        <td class='istyle15' style='padding:2px;'><span class='istyle15' style='padding:2px;'>Departemen</span></td>
					        <td colspan='2' class='istyle15' style='padding:2px; border:1px solid #111111;'>&nbsp;</td>
					      </tr>
						  <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
					      <tr>
					        <td class='istyle15' style='padding:2px;'>Program Kerja </td>
					        <td colspan='2' class='istyle15' style='padding:2px; border:1px solid #111111;'>&nbsp;</td>
					        </tr>
					       <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
						  <tr>
					        <td class='istyle15' style='padding:2px;'>Panjar yang Diterima  </td>
					        <td width='33%' class='istyle15' style='padding:2px; border:1px solid #111111;'>Rp</td>
					        <td width='48%' class='istyle15'>&nbsp;</td>
						  </tr>
					       <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
						  <tr>
					        <td class='istyle15' style='padding:2px;'>Sisa Panjar </td>
					        <td class='istyle15' style='padding:2px; border:1px solid #111111;'>Rp</td>
					        <td class='istyle15'>&nbsp;</td>
						  </tr>
					       <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
						  <tr>
					        <td class='istyle15' style='padding:2px;'>Panjar yang digunakan </td>
					        <td class='istyle15' style='padding:2px; border:1px solid #111111;'>Rp</td>
					        <td class='istyle15'>&nbsp;</td>
						  </tr>
					       <tr>
					        <td height='5' colspan='4'></td>
					      </tr>
					      <tr>
					        <td width='19%' class='istyle15' style='padding:2px;'>terbilang</td>
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
					            <td class='istyle15' width='25%'>Realisasi Biaya </td>
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
					          <tr>
					            <td colspan='3' align='center' class='istyle15'>T O T A L</td>
					            <td align='right' class='istyle15'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
					      
					      
					      <tr>
					        <td colspan='4' height='5'></td>
					      </tr>
					      <tr>
					        <td height='70' colspan='4' align='justify' valign='top' class='istyle15' style='border:1px solid #111111; padding:3px;'>Catatan : </td>
					      </tr>
					      <tr>
					        <td colspan='4' height='5'></td>
					      </tr>
					      <tr>
					        <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td width='49%'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					              <tr>
					                <td width='50%' align='center'>Dibuat Oleh :</td>
					                <td width='50%' align='center'>Disetujui Oleh : </td>
					              </tr>
					              <tr valign='bottom'>
					                <td height='115'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                    
					                    
					                    <tr>
					                      <td width='7%' height='100' align='center'>&nbsp;</td>
					                      <td width='87%' align='center' valign='bottom' style='border-bottom:1px solid #111111'><em>Manager/<br />
					                        General Manager/Director</em></td>
					                      <td width='6%' align='center'>&nbsp;</td>
					                    </tr>
					                    <tr>
					                      <td colspan='3' height='5'></td>
					                    </tr>
					                </table></td>
					                <td valign='bottom'><table width='100%' height='106' border='0' cellpadding='1' cellspacing='0'>
					                    <tr>
					                      <td width='7%' height='100' align='center'>&nbsp;</td>
					                      <td width='87%' align='center' valign='bottom' style='border-bottom:1px solid #111111'><em>General Manager/Director</em></td>
					                      <td width='6%' align='center'>&nbsp;</td>
					                    </tr>
					                    <tr>
					                      <td colspan='3' height='5'></td>
					                    </tr>
					                </table></td>
					              </tr>
					              <tr>
					                <td>Tanggal : </td>
					                <td>Tanggal : </td>
					              </tr>
					            </table></td>
					            <td width='2%'>&nbsp;</td>
					            <td width='49%'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					              <tr>
					                <td colspan='2' align='center'>VERIFIKASI</td>
					                </tr>
					              <tr>
					                <td width='50%' align='center'>Anggaran</td>
					                <td width='50%' align='center'>Keuangan</td>
					              </tr>
					              <tr valign='top'>
					                <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                    <tr>
					                      <td width='7%' height='87' align='center'>&nbsp;</td>
					                      <td width='87%' align='center' valign='bottom' style='border-bottom:1px solid #111111'><em>Budget Analyst </em></td>
					                      <td width='6%' align='center'>&nbsp;</td>
					                    </tr>
					                    <tr>
					                      <td colspan='3' height='5'></td>
					                    </tr>
					                </table></td>
					                <td valign='top'><table width='100%' height='84' border='0' cellpadding='1' cellspacing='0'>
					                    <tr>
					                      <td width='7%' height='87' align='center'>&nbsp;</td>
					                      <td width='87%' align='center' valign='bottom' style='border-bottom:1px solid #111111'><em>Verification Staff </em></td>
					                      <td width='6%' align='center'>&nbsp;</td>
					                    </tr>
					                    <tr>
					                      <td colspan='3' height='5'></td>
					                    </tr>
					                </table></td>
					              </tr>
					              <tr>
					                <td>Tanggal : </td>
					                <td>Tanggal : </td>
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