<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_patrakom_rptSpb
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
			$sql = "select a.no_spb,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.keterangan,a.akun_hutang,a.kode_terima,a.nik_buat,a.nik_setuju,(a.nilai+a.nilai_pot) as nilai,a.nilai_pot,a.nilai as tot,c.alamat,c.bank,c.no_rek,
				b.nama as nama_akun,c.nama as nama_vendor,d.nama as nama_buat,e.nama as nama_setuju,d.jabatan as jabatan_buat,e.jabatan as jabatan_setuju,c.cabang,c.nama_rek,f.logo,
				g.kode_akun,g.kode_pp,g.keterangan as ket,g.dc,g.nilai as n2
				from spb_m a inner join spb_j g on a.no_spb=g.no_spb and a.kode_lokasi=g.kode_lokasi
				left join masakun b on a.akun_hutang=b.kode_akun and a.kode_lokasi=b.kode_lokasi
				inner join vendor c on a.kode_terima=c.kode_vendor and a.kode_lokasi=c.kode_lokasi
				inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
				inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi 
				inner join lokasi f on a.kode_lokasi=f.kode_lokasi ".$this->filter.
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
			$html.=	"<table width='700' border='0' align='center' cellpadding='0' cellspacing='0'>
					  <tr>
					    <td colspan='2'><img src=$pathfoto width='211' height='73' /></td>
					  </tr>
					  <tr>
					    <td colspan='2' align='right' class='istyle17' style='padding:1px;'>SURAT PERMINTAAN PEMBAYARAN</td>
					  </tr>
					  <tr>
					    <td colspan='2' align='right'><table width='45%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					      <tr>
					        <td width='23%' class='istyle15'>NOMOR</td>
					        <td width='77%' class='istyle15' align='center'>".$rs->no_spb."</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>TANGGAL</td>
					        <td class='istyle15' align='center'>".$rs->tgl."</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2' style='padding:2px 2px 2px 2px;'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' class='istyle15' style='padding:2px 2px 2px 2px;'>Harap diberikan uang sejumlah Rp. ".number_format($rs->tot,0,",",".").",00</td>
					  </tr>
					  <tr>
					    <td colspan='2' class='istyle15' style='padding:2px 2px 2px 2px;'>Terbilang : ".$AddOnLib->terbilang(round($rs->tot))."</td>
					  </tr>
					  <tr>
					    <td colspan='2' class='istyle15' style='padding:2px 2px 2px 2px;'>Untuk keperluan sbb :</td>
					  </tr>
					  <tr>
					    <td colspan='2' class='istyle15' style='padding:2px 2px 2px 2px;'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					      <tr>
					        <td width='5%' align='center' class='istyle15'>NO.</td>
					        <td width='11%' align='center' class='istyle15'>Kode Anggaran </td>
					        <td width='14%' align='center' class='istyle15'>Kode Lokasi </td>
					        <td width='50%' align='center' class='istyle15'>U r a i a n</td>
					        <td width='20%' align='center' class='istyle15'>Jumlah</td>
					      </tr>";
				$data=$dbLib->execute($sql);
				$i=1;
				$total=0;
				while ($dt = $data->FetchNextObject($toupper=false))
				{
					if ($dt->dc == "D"){
						$total+=$dt->n2;
						$html.="<tr>
						        <td class='istyle15' align='center' valign='top'>$i</td>
						        <td class='istyle15' valign='top'>$dt->kode_akun</td>
						        <td class='istyle15' valign='top'>$dt->kode_pp</td>
						        <td class='istyle15' valign='top'>$dt->ket</td>
						        <td class='istyle15' align='right' valign='top'>".number_format($dt->n2,0,",",".")."</td>
						      </tr>";
					}
					$i++;
				}
				while ($i <= 10)
				{
					$html.="<tr>
					        <td class='istyle15' align='center' valign='top'>$i</td>
					        <td class='istyle15' valign='top'>&nbsp;</td>
					        <td class='istyle15' valign='top'>&nbsp;</td>
					        <td class='istyle15' valign='top'>&nbsp;</td>
					        <td class='istyle15' align='right' valign='top'>&nbsp;</td>
					      </tr>";
					$i++;
				}
					$html.="<tr>
					        <td class='istyle15' align='center' valign='top'>&nbsp;</td>
					        <td class='istyle15' valign='top'>&nbsp;</td>
					        <td class='istyle15' valign='top'>&nbsp;</td>
					        <td class='istyle15' valign='top' align='right'>JUMLAH Rp. &nbsp;&nbsp;</td>
					        <td class='istyle15' align='right' valign='top'>".number_format($total,0,",",".")."</td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td width='52' rowspan='3' valign='top' class='istyle15' style='padding:2px 2px 2px 2px;'>Uraian:</td>
					    <td width='648' valign='top' class='istyle15' style='padding:2px 2px 2px 2px;'>.....................................................................................................................................................................................................</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15' style='padding:2px 2px 2px 2px;'>.....................................................................................................................................................................................................</td>
					  </tr>
					  <tr>
					    <td valign='top' class='istyle15' style='padding:2px 2px 2px 2px;'>.....................................................................................................................................................................................................</td>
					  </tr>
					  <tr>
					    <td colspan='2' style='padding:7px 2px 2px 2px;'><table width='100%' border='1' cellspacing='0' cellpadding='1' class='kotak'>
					      <tr>
					        <td width='20%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td align='center' class='istyle15'>Akuntansi</td>
					          </tr>
					          <tr>
					            <td height='90'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>(....................................)</td>
					          </tr>
					        </table></td>
					        <td width='20%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td align='center' class='istyle15'>Verifikasi</td>
					          </tr>
					          <tr>
					            <td height='90'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>(....................................)</td>
					          </tr>
					        </table></td>
					        <td width='20%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td align='center' class='istyle15'>Fiatur</td>
					          </tr>
					          <tr>
					            <td height='90'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>(....................................)</td>
					          </tr>
					        </table></td>
					        <td width='20%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td align='center' class='istyle15'>Disetujui</td>
					          </tr>
					          <tr>
					            <td height='90'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>(".$rs->nama_setuju.")</td>
					          </tr>
					        </table></td>
					        <td width='20%'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					          <tr>
					            <td align='center' class='istyle15'>Dipersiapkan</td>
					          </tr>
					          <tr>
					            <td height='90'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td align='center' class='istyle15'>(".$rs->nama_buat.")</td>
					          </tr>
					        </table></td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2' class='istyle15' style='padding:2px 2px 2px 2px;'>Telah diterima uang tunai / cek / giro, sebesar Rp. ".number_format($rs->tot,0,",",".").",00</td>
					  </tr>
					  <tr>
					    <td colspan='2' class='istyle15' style='padding:2px 2px 2px 2px;' valign='top'>Terbilang : ".$AddOnLib->terbilang(round($rs->tot))."</td>
					  </tr>
					  <tr>
					    <td colspan='2'>&nbsp;</td>
					  </tr>
					  <tr>
					    <td colspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='2'>
					      <tr>
					        <td colspan='2' rowspan='4'>&nbsp;</td>
					        <td width='36%' align='center' class='istyle15'>Jakarta, ......................................................</td>
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
					        <td width='17%' class='istyle15'>Nomor Cek/Giro/TT </td>
					        <td width='47%' class='istyle15'>: .....................................................................</td>
					        <td>&nbsp;</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>Bank</td>
					        <td class='istyle15'>: .....................................................................</td>
					        <td>&nbsp;</td>
					      </tr>
					      <tr>
					        <td class='istyle15'>TTD</td>
					        <td class='istyle15'>: .....................................................................</td>
					        <td align='center' class='istyle15'>(............................................................)</td>
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