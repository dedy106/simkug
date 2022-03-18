<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptKasIn
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
		
		$sql = "select count(distinct a.no_kas) from kas_m a ".$this->filter;
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
		$sql0="select distinct a.no_kas from kas_m a ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_kas,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,c.no_bukti,d.no_dokumen,a.nilai,
				a.kurs,a.nilai*a.kurs as tot,a.no_bg,a.akun_kb,b.kode_akun,e.nama as nmakun,b.dc,b.nilai as nilai2,f.logo
				from kas_m a 
				inner join kas_j b on a.no_kas=b.no_kas and a.kode_lokasi=b.kode_lokasi and a.modul='KBO_ALL' and a.jenis='KAS'
				inner join kas_d c on a.no_kas=c.no_kas and a.kode_lokasi=c.kode_lokasi
				inner join spb_m d on c.no_bukti=d.no_spb and c.kode_lokasi=d.kode_lokasi
				inner join masakun e on b.kode_akun=e.kode_akun and b.kode_lokasi=e.kode_lokasi
				inner join lokasi f on a.kode_lokasi=f.kode_lokasi ".$this->filter.
				" and a.no_kas='".$page->fields[0]."' order by b.dc desc ";
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
					        <td width='31%' align='center' class='istyle15' style='border:1px solid #111111'>".$rs->no_kas."</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2' align='center' class='istyle17'>BUKTI KAS MASUK</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td colspan='6' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15'>Diterima kepada</td>
					        <td colspan='5' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					      </tr>
						  <tr>
					        <td colspan='6' height='5'></td>
					        </tr>
					      <tr valign='top'>
					        <td class='istyle15'>untuk keperluan</td>
					        <td height='50' colspan='5' class='istyle15' style='border:1px solid #111111;'>".$rs->keterangan."</td>
					      </tr>
						  <tr>
					        <td colspan='6' height='5'></td>
					        </tr>
					      <tr valign='top'>
					        <td class='istyle15'>sesuai dokumen </td>
					        <td colspan='3' class='istyle15' style='border:1px solid #111111;'><em>INVOICE</em></td>
					        <td width='12%' align='right' class='istyle15'>Nomor &nbsp;</td>
					        <td width='21%' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					      </tr>
						  <tr>
					        <td colspan='6' height='6'></td>
					        </tr>
					      <tr valign='top'>
					        <td width='16%' class='istyle15'>uang sejumlah </td>
					        <td width='37%' class='istyle15' style='border:1px solid #111111;'>".number_format($rs->nilai,0,",",".")."</td>
					        <td width='7%' class='istyle15' align='right'>kurs &nbsp;</td>
					        <td width='7%' class='istyle15' style='border:1px solid #111111;'>".number_format($rs->kurs,0,",",".")."</td>
					        <td width='12%' class='istyle15' align='right'>Total Rupiah &nbsp;</td>
					        <td width='21%' class='istyle15' style='border:1px solid #111111;'>".number_format($rs->tot,0,",",".")."</td>
					        </tr>
					      <tr>
					        <td colspan='6' height='5'></td>
					        </tr>
					      <tr>
					        <td class='istyle15' valign='top'>terbilang</td>
					        <td colspan='5' valign='top' class='istyle15' style='border:1px solid #111111; background-color:#CCCCCC;'>".$AddOnLib->terbilang($rs->tot)."</td>
					        </tr>
					      <tr>
					        <td colspan='6' height='5'></td>
					        </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					      <tr align='center'>
					        <td width='4%' rowspan='2' class='istyle15'>No.</td>
					        <td width='19%' rowspan='2' class='istyle15'>Nomor Akun</td>
					        <td width='43%' rowspan='2' class='istyle15'>Nama Akun</td>
					        <td colspan='2' class='istyle15'>Jumlah</td>
					      </tr>
					      <tr align='center'>
					        <td width='17%' class='istyle15'>Debet</td>
					        <td width='17%' class='istyle15'>Kredit</td>
					      </tr>";
				$i=1;
				$data=$dbLib->execute($sql);
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					$html.="<tr valign='top'>
					        <td class='istyle15' align='center'>$i</td>
					        <td class='istyle15'>".$dt->kode_akun."</td>
					        <td class='istyle15'>".$dt->nmakun."</td>";
					if ($dt->dc == "D")
						$html.="<td class='istyle15' align='right'>".number_format($dt->nilai2,0,",",".")."</td>
						        <td class='istyle15' align='right'>&nbsp;</td>";
					else $html.="<td class='istyle15' align='right'>&nbsp;</td>
						        <td class='istyle15' align='right'>".number_format($dt->nilai2,0,",",".")."</td>";
					$html.="</tr>";
					$i++;
				}
				while ($i<=4)
				{
					$html.="<tr valign='top'>
					        <td class='istyle15' align='center'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					        <td class='istyle15' align='right'>&nbsp;</td>
					      </tr>";
					$i++;
				}
				$html.= "</table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' style='padding:3px'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td width='73%' align='right' class='istyle15'>No. Jurnal &nbsp;</td>
					        <td width='27%' align='center' class='istyle15' style='border:1px solid #111111;'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' valign='top' align='right' style='padding:3px'><table width='85%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					      <tr>
					        <td width='33%' align='center'>Dibuat Oleh : </td>
					        <td width='33%' align='center'>Disetujui Oleh :</td>
					        <td width='33%' align='center'>Penjurnalan disetujui  Oleh : </td>
					      </tr>
					      <tr valign='top'>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					            <tr>
					              <td height='112' colspan='3'>&nbsp;</td>
					            </tr>
					            <tr>
					              <td width='7%' align='center'>&nbsp;</td>
					              <td width='87%' align='center' style='border-bottom:1px solid #111111'><em>Verification Staff </em></td>
					              <td width='6%' align='center'>&nbsp;</td>
					            </tr>
					        </table></td>
					        <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td height='98' colspan='3'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td width='7%' align='center'>&nbsp;</td>
					            <td width='87%' align='center' style='border-bottom:1px solid #111111'><em>Treasury Manager / <br />
					              GM Treasury &amp; Accounting </em></td>
					            <td width='6%' align='center'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td colspan='3' align='center' height='5'></td>
					            </tr>
					        </table></td>
					        <td valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					          <tr>
					            <td class='istyle15' align=''>&nbsp;</td>
					            <td align='right' class='istyle15'><em>General Accounting Staff </em></td>
					            <td class='istyle15' align=''>&nbsp;</td>
					          </tr>
					          <tr>
					            <td height='98' colspan='3'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td width='7%' align='center'>&nbsp;</td>
					            <td width='87%' align='center' style='border-bottom:1px solid #111111'><em>Accounting Manager</em></td>
					            <td width='6%' align='center'>&nbsp;</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td>Tanggal : </td>
					        <td>Tanggal : </td>
					        <td>Tanggal : </td>
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