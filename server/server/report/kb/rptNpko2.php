<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptNpko2
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
		
		$sql = "select count(distinct a.no_npko) 
			from npko_m a
			inner join npko_d b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi ".$this->filter;
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
		$sql0="select distinct a.no_npko 
            from npko_m a
			inner join npko_d b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_npko,c.nama as nmunit,a.kode_drk,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.lokasi,a.sarana,a.vol,
				a.lingkup,date_format(a.waktu,'%d/%m/%Y') as wkt,a.fasilitas,a.sasaran,a.uraian,b.kode_akun,b.gar_tahun,b.gar_bulan,b.gar_sd,
				(select nama from pp where kode_pp=c.kode_induk and kode_lokasi=a.kode_lokasi) as nmdept,e1.nama as nm1,e1.jabatan as jab1,
				e2.nama as nm2,e2.jabatan as jab2,e3.nama as nm3,e1.jabatan as jab3,e4.nama as nm4,e4.jabatan as jab4,f.logo
				from npko_m a
				inner join npko_d b on a.no_npko=b.no_npko and a.kode_lokasi=b.kode_lokasi
				inner join pp c on a.kode_pp=c.kode_pp and a.kode_lokasi=c.kode_lokasi
				inner join drk d on a.kode_drk=d.kode_drk and a.kode_lokasi=d.kode_lokasi
				inner join karyawan e1 on a.nik_buat=e1.nik and a.kode_lokasi=e1.kode_lokasi
				inner join karyawan e2 on a.nik_app=e2.nik and a.kode_lokasi=e2.kode_lokasi
				inner join karyawan e3 on a.nik_gar=e3.nik and a.kode_lokasi=e3.kode_lokasi
				inner join karyawan e4 on a.nik_fiat=e4.nik and a.kode_lokasi=e4.kode_lokasi
				inner join lokasi f on a.kode_lokasi=f.kode_lokasi ".$this->filter.
				" and a.no_npko='".$page->fields[0]."' order by a.no_npko ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$path = $_SERVER["SCRIPT_NAME"];				
			$path = substr($path,0,strpos($path,"server/serverApp.php"));		
			$pathfoto = $path . "image/banner/".$rs->logo;
			$html="<br />";
			$tgl=explode("/",$rs->tgl);
			$wkt=explode("/",$rs->wkt);
			$html.=	"<table width='750' border='1' align='center' cellpadding='5' cellspacing='0' class='kotak'>
					  <tr>
					    <td width='12%' valign='top' style='padding:3px'><img src=$pathfoto width='80' height='99' /></td>
					    <td width='88%'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td width='69%' align='right' class='istyle15'>Nomor : </td>
					        <td width='31%' align='center' class='istyle15' style='border:1px solid #111111'>".$rs->no_npko."</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					      <tr>
					        <td colspan='2' align='center' class='istyle17'>NOTA PROSES KEGIATAN OPERASIONAL</td>
					      </tr>
					      <tr>
					        <td colspan='2'>&nbsp;</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td width='50%' class='istyle15'>Departemen : ".$rs->nmdept."</td>
					              <td width='50%' class='istyle15'>Nomor Kegiatan : ".$rs->kode_drk."</td>
					            </tr>
					            <tr>
					              <td class='istyle15'>Unit Kerja : ".$rs->nmunit."</td>
					              <td class='istyle15'>Tanggal : ".$tgl[0]." ".$AddOnLib->ubah_periode($tgl[2].$tgl[1])."</td>
					            </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td class='istyle15' colspan='2' align='center'>INFO KEGIATAN UMUM</td>
					              <td class='istyle15' width='38%' align='center'>Lingkup Pekerjaan</td>
					              <td class='istyle15' width='12%' align='center'>Waktu</td>
					            </tr>
					            <tr>
					              <td class='istyle15' width='13%' align='center'>LOKASI</td>
					              <td class='istyle15' width='37%' align='center'>".$rs->lokasi."</td>
					              <td rowspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td class='istyle15'>".$rs->lingkup."</td>
					                </tr>
					              </table></td>
					              <td rowspan='3' align='center' class='istyle15'>".$wkt[0]."-".substr($AddOnLib->ubah_periode($wkt[2].$wkt[1]),0,3)."-".substr($wkt[2],2)."</td>
					            </tr>
					            <tr>
					              <td align='center' class='istyle15'>SARANA</td>
					              <td class='istyle15' align='center'>".$rs->sarana."</td>
					            </tr>
					            <tr>
					              <td align='center' class='istyle15'>VOLUME</td>
					              <td class='istyle15' align='center'>".$rs->vol."</td>
					            </tr>
					            <tr>
					              <td colspan='2' align='center' class='istyle15'>KONDISI SARANA/FASILITAS</td>
					              <td colspan='2' align='center' class='istyle15'>SASARAN KEGIATAN </td>
					            </tr>
					            <tr>
					              <td height='120' colspan='2' valign='top'><br /><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td class='istyle15'>".str_replace("\n","<br />",$rs->fasilitas)."</td>
					                </tr>
					              </table></td>
					              <td height='120' colspan='2' valign='top'><br />
					                <table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                  <tr>
					                    <td class='istyle15'>".str_replace("\n","<br />",$rs->sasaran)."</td>
					                  </tr>
					                </table></td>
					              </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td align='center' class='istyle15'>GAMBAR SITUASI/URAIAN PEKERJAAN </td>
					              </tr>
					            <tr>
					              <td height='150' valign='top'><br />
					                <table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                  <tr>
					                    <td class='istyle15'>".str_replace("\n","<br />",$rs->uraian)."</td>
					                  </tr>
					                </table></td>
					              </tr>
					          </table></td>
					        </tr>
					        <tr>
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td align='center'>Nomor Akun </td>
					              <td align='center'>Anggaran Tahun ini </td>
					              <td align='center'>Anggaran Bulan ini </td>
					              <td align='center'>Sisa s/d saat ini </td>
					            </tr>";
					$data=$dbLib->execute($sql);
					while ($dt = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					              <td>5105.02.01.01</td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td width='11%'>Rp.</td>
					                  <td width='89%' align='right'>".number_format($dt->gar_tahun,0,",",".")."</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td width='11%'>Rp.</td>
					                  <td width='89%' align='right'>".number_format($dt->gar_bulan,0,",",".")."</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					                <tr>
					                  <td width='11%'>Rp.</td>
					                  <td width='89%' align='right'>".number_format($dt->gar_sd,0,",",".")."</td>
					                </tr>
					              </table></td>
					            </tr>";
					}
					$html .= "</table></td>
					        </tr>
					        <tr>
					          <td height='5'></td>
					        </tr>
					        <tr>
					          <td><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					            <tr>
					              <td width='25%' align='center'>Direncanakan Oleh: </td>
					              <td width='25%' align='center'>Diperiksa Oleh:</td>
					              <td width='25%' align='center'>Disetujui Oleh:</td>
					              <td width='25%' align='center'>Verifikasi Anggaran Oleh : </td>
					            </tr>
					            <tr>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                  </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>".$rs->nm1."</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>".$rs->jab1."</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>".$rs->nm2."</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>".$rs->jab2."</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>".$rs->nm3."</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>".$rs->jab3."</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					              <td><table width='100%' border='0' cellspacing='0' cellpadding='1'>
					                <tr>
					                  <td height='69' colspan='3'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td width='7%' align='center'>&nbsp;</td>
					                  <td width='87%' align='center' style='border-bottom:1px solid #111111'>".$rs->nm4."</td>
					                  <td width='6%' align='center'>&nbsp;</td>
					                </tr>
					                <tr>
					                  <td align='center'>&nbsp;</td>
					                  <td align='center'><em>".$rs->jab4."</em></td>
					                  <td align='center'>&nbsp;</td>
					                </tr>
					              </table></td>
					            </tr>
					            <tr>
					              <td>Tanggal : ".$rs->tgl."</td>
					              <td>Tanggal : ".$rs->tgl."</td>
					              <td>Tanggal : ".$rs->tgl."</td>
					              <td>Tanggal : ".$rs->tgl."</td>
					            </tr>
					          </table></td>
					        </tr>
					      </table></td>
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