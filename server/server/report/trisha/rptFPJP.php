<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_trisha_rptFPJP
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
		
		//$sql = "select count(*) ".
			//"from dmt_invoice a ".$this->filter;
		$sql = "select 1";
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
		//$sql0="select distinct a.no_invoice ".
              //"from dmt_invoice a ".$this->filter;
		$sql0 = "select 1";
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		$path = $_SERVER["SCRIPT_NAME"];				
		$path = substr($path,0,strpos($path,"server/serverApp.php"));		
		$pathfoto = $path . "classes/app/mede/image/logo_tsel_2.jpg";
		while (!$page->EOF)
		{
			$html="";
				$sql = "select a.no_invoice,a.no_dokumen,a.tanggal as tgl,a.periode,upper(b.nama) as nmcust,upper(b.alamat2) as almt,upper(b.kota) as kota, ".
						"b.kode_pos,date_format(c.tanggal,'%d-%m-%Y') as tglkon,e.no_fa,e.nama as nmfa,f.nilai, ".
						"g.nama as nmapp,g.jabatan,b.npwp ".
						"from dmt_invoice a left outer join dmt_cust b on a.kode_cust=b.kode_cust and a.kode_lokasi=b.kode_lokasi ".
						"left outer join dmt_kontrak c on a.no_kontrak=c.no_kontrak ".
						"left outer join dmt_billing d on c.no_kontrak=d.no_kontrak ".
						"left outer join dmt_billing_d f on d.no_bill=f.no_bill ".
						"left outer join fa_asset e on f.no_fa=e.no_fa ".
						"left outer join karyawan g on a.nik_app=g.nik and a.kode_lokasi=g.kode_lokasi ".$this->filter.
						" and a.no_invoice='".$page->fields[0]."' ";
				$invc=$dbLib->execute($sql);
				$rs = $invc->FetchNextObject($toupper=false);
				//error_log($sql);
				$i = $start+1;
				$AddOnLib=new server_util_AddOnLib();
				$html.= "<table width='650' border='0' align='center' cellpadding='0' cellspacing='0'>
						  <tr>
						    <td colspan='2'><img src='$pathfoto' width='140' height='26' /></td>
						  </tr>
						  <tr>
						    <td colspan='2' class='istyle16'>&nbsp;</td>
						  </tr>
						  <tr>
						    <td colspan='2' align='center' class='nstyle16'>FORMULIR PERTANGGUNGJAWABAN PENGELUARAN</td>
						  </tr>
						  <tr>
						    <td colspan='2' class='istyle15'>&nbsp; </td>
						  </tr>
						  <tr>
						    <td colspan='2' class='istyle15'>&nbsp;&nbsp;&nbsp;&nbsp;No. Jurnal : 929/FN-STPD/082004</td>
						  </tr>
						  <tr>
						    <td colspan='2'><table width='100%' border='1' cellspacing='0' class='kotak'>
						      <tr>
						        <td style='padding-left:10px; padding-right:10px; padding-bottom:10px; padding-top:7px'><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
						          <tr>
						            <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='5'>
						              <tr class='istyle18'>
						                <td width='14%'>Nama / NIK </td>
						                <td width='2%'>:</td>
						                <td width='40%'>Irvan Chandra Wardhana / 71233</td>
						                <td width='9%'>Tanggal</td>
						                <td width='2%'>:</td>
						                <td width='33%'>19-08-2004</td>
						              </tr>
						              <tr class='istyle18'>
						                <td>Bagian</td>
						                <td>:</td>
						                <td>FINANCE</td>
						                <td>Jabatan</td>
						                <td>:</td>
						                <td>Spe.</td>
						              </tr>
						            </table></td>
						          </tr>
						          <tr>
						            <td height='10' colspan='4'></td>
						          </tr>
						          <tr class='istyle15' align='center'>
						            <td width='5%'>NO</td>
						            <td width='20%'>AKUN</td>
						            <td width='58%'>URAIAN</td>
						            <td width='17%'>JUMLAH</td>
						          </tr>
						          <tr>
						            <td><table width='100%' border='0' cellspacing='0' cellpadding='2' class='istyle15'>
						              <tr>
						                <td>1.</td>
						              </tr>
						              <tr>
						                <td>2.</td>
						              </tr>
						              <tr>
						                <td>3.</td>
						              </tr>
						              <tr>
						                <td>4.</td>
						              </tr>
						              <tr>
						                <td>5.</td>
						              </tr>
						              <tr>
						                <td>6.</td>
						              </tr>
						              <tr>
						                <td>7.</td>
						              </tr>
						              <tr>
						                <td>8.</td>
						              </tr>
						              <tr>
						                <td>9.</td>
						              </tr>
						              <tr>
						                <td>10.</td>
						              </tr>
						              <tr>
						                <td>11.</td>
						              </tr>
						              <tr>
						                <td>12.</td>
						              </tr>
						              <tr>
						                <td>13.</td>
						              </tr>
						              <tr>
						                <td>14.</td>
						              </tr>
						              <tr>
						                <td>15.</td>
						              </tr>
						            </table></td>
						            <td><table width='100%' border='0' cellspacing='0' cellpadding='2' class='istyle15'>
						              <tr>
						                <td>401.550201.492702</td>
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
						            <td><table width='100%' border='0' cellspacing='0' cellpadding='2' class='istyle15'>
						              <tr>
						                <td>Perjalanan dinas ke Madiun 2 Agustus 2004 </td>
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
						            <td><table width='100%' border='0' cellspacing='0' cellpadding='2' class='istyle15'>
						              <tr>
						                <td width='20%'>Rp.</td>
						                <td width='80%' align='right'>192.500</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td>&nbsp;</td>
						                <td align='right'>&nbsp;</td>
						              </tr>
						            </table></td>
						          </tr>
						          <tr>
						            <td colspan='4'><table width='100%' border='0' cellspacing='0' cellpadding='2' class='istyle15'>
						              <tr>
						                <td width='58%'>&nbsp;</td>
						                <td width='25%'>Total Pengeluaran : </td>
						                <td width='4%'>Rp.</td>
						                <td width='13%' align='right'>192.500</td>
						              </tr>
						              <tr>
						                <td colspan='4'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td colspan='4'>Cara Pembayaran : Transfer ke Bank BNI Rekening : 121780138848901 </td>
						              </tr>
						              <tr>
						                <td colspan='4'><em>Dengan huruf : </em>&nbsp;&nbsp;&nbsp;&nbsp;SERATUS SEMBILAN PULUH RIBU LIMA RATUS RUPIAH</td>
						              </tr>
						              <tr>
						                <td colspan='4'>&nbsp;</td>
						              </tr>
						              <tr>
						                <td colspan='4'><em>Surabaya, 18-08-2004 </em></td>
						              </tr>
						            </table></td>
						          </tr>
						          <tr>
						            <td colspan='4'><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak' style='border-right-width:0px; border-bottom-width:0px'>
						              <tr align='center' class='istyle15'>
						                <td width='33%'>Diajukan Oleh</td>
						                <td width='34%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td align='center'>Disetujui Oleh</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>Manager .......................................... </td>
						                  </tr>
						                </table></td>
						                <td width='33%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td align='center'>Verifikasi</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>(Accounting)</td>
						                  </tr>
						                </table></td>
						              </tr>
						              <tr class='istyle15'>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td height='84' align='center'>&nbsp;</td>
						                  </tr>
						                  <tr>
						                    <td>(Irvan Chandra Wardhana)</td>
						                  </tr>
						                  <tr>
						                    <td>N.I.K : 71233</td>
						                  </tr>
						                </table></td>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td height='84' align='center'>&nbsp;</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>(...............................................................)</td>
						                  </tr>
						                  <tr>
						                    <td>N.I.K :</td>
						                  </tr>
						                </table></td>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td height='84' align='center'>&nbsp;</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>(...............................................................)</td>
						                  </tr>
						                  <tr>
						                    <td>N.I.K :</td>
						                  </tr>
						                </table></td>
						              </tr>
						              <tr align='center' class='istyle15'>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td align='center'>Diketahui Oleh</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>Manager Keuangan </td>
						                  </tr>
						                </table></td>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td align='center'>Mengetahui/Menyetujui</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>GM Regional/VP </td>
						                  </tr>
						                </table></td>
						                <td>Diterima Oleh </td>
						              </tr>
						              <tr class='istyle15'>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td height='84' align='center'>&nbsp;</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>(...............................................................)</td>
						                  </tr>
						                  <tr>
						                    <td>N.I.K :</td>
						                  </tr>
						                </table></td>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td height='84' align='center'>&nbsp;</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>(...............................................................)</td>
						                  </tr>
						                  <tr>
						                    <td>N.I.K :</td>
						                  </tr>
						                </table></td>
						                <td><table width='100%' border='0' cellspacing='0' cellpadding='2'>
						                  <tr>
						                    <td height='84' align='center'>&nbsp;</td>
						                  </tr>
						                  <tr>
						                    <td align='center'>(...............................................................)</td>
						                  </tr>
						                  <tr>
						                    <td>N.I.K :</td>
						                  </tr>
						                </table></td>
						              </tr>
						            </table></td>
						          </tr>
						          
						        </table></td>
						      </tr>
						    </table></td>
						  </tr>
						  <tr class='egov5'>
						    <td width='52'><em>Catatan :</em></td>
						    <td width='598'><em>1. Bukti yang dapat dipertanggungjawabkan adalah bukti asli (kecuali hal itu tidak dimungkinkan)</em></td>
						  </tr>
						  <tr class='egov5'>
						    <td>&nbsp;</td>
						    <td><em>2. Semua pengeluaran harus disertai dengan bukti-bukti tertulis </em></td>
						  </tr>
						</table>";
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
