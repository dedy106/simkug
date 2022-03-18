<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_egov_rptKK
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
		
		$sql = "select count(*) ".
			"from egov_kk_m a ".$this->filter;
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
		$sql0="select distinct a.no_kk ".
              "from egov_kk_m a ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$html="";
			$sql="select a.no_kk,c.nama as nmkk,a.alamat,a.kode_rt,a.kode_rw,d.nama as desa,e.nama as kec, ".
				"f.nama as kab,g.nama as prov,a.kode_pos,b.nik,c.gender,c.tempat as tmptlhr, ".
				"date_format(c.tgl_lahir,'%d/%m/%Y') as tgllhr,h.nama as agama,i.nama as pddk,j.nama as krj, ".
				"b.status,k.nama as hubkel,b.kode_wn,b.no_paspor,b.no_kitas,c.nama_ayah as ayah,c.nama_ibu as ibu ".
				"from egov_kk_m a inner join egov_kk_d b on a.no_kk=b.no_kk ".
								"inner join egov_akte c on b.no_akte=c.no_akte ".
								"inner join egov_kelurahan d on a.kode_kelurahan=d.kode_kelurahan ".
								"inner join egov_kecamatan e on d.kode_kecamatan=e.kode_kecamatan ".
								"inner join egov_kota f on e.kode_kota=f.kode_kota ".
								"inner join egov_propinsi g on f.kode_propinsi=g.kode_propinsi ".
								"inner join egov_agama h on b.kode_agama=h.kode_agama ".
								"inner join egov_pendidikan i on b.kode_pendidikan=i.kode_pendidikan ".
								"inner join egov_pekerjaan j on b.kode_pekerjaan=j.kode_pekerjaan ".
								"inner join egov_hubkel k on b.kode_hubkel=k.kode_hubkel ".$this->filter.
				" and a.no_kk='".$page->fields[0]."' order by b.no_urut ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			$temp = explode(" ",$rs->desa);
			$desa = $temp[1]." ".$temp[2]." ".$temp[3];
			$temp = explode(" ",$rs->kec);
			$kec = $temp[1]." ".$temp[2]." ".$temp[3];
			$temp = explode(" ",$rs->kab);
			$kab = $temp[1]." ".$temp[2]." ".$temp[3];
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html.=	"<table width='800' height='567' align='center' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
					    <td valign='top'><table width='800' border='0' align='center' cellpadding='0' cellspacing='0'>
					      <tr>
					        <td colspan='3'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					            <tr>
					              <td align='center' class='egov1'>KARTU KELUARGA</td>
					            </tr>
					            <tr>
					              <td align='center' class='egov2'>NO : ".$rs->no_kk."</td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td colspan='3'><table width='100%' border='0' cellspacing='3' cellpadding='0'>
					            <tr>
					              <td class='egov3' width='18%'>Nama Kepala Keluarga </td>
					              <td class='egov3' width='2%' align='center'>:</td>
					              <td class='egov3' width='52%'>".strtoupper($rs->nmkk)."</td>
					              <td class='egov3' width='9%'>Kecamatan</td>
					              <td class='egov3' width='2%' align='center'>:</td>
					              <td class='egov3' width='17%'>".strtoupper($kec)."</td>
					            </tr>
					            <tr>
					              <td class='egov3'>Alamat</td>
					              <td class='egov3' align='center'>:</td>
					              <td class='egov3'>".strtoupper($rs->alamat)."</td>
					              <td class='egov3'>Kota</td>
					              <td class='egov3' align='center'>:</td>
					              <td class='egov3'>".strtoupper($kab)."</td>
					            </tr>
					            <tr>
					              <td class='egov3'>RT/RW</td>
					              <td class='egov3' align='center'>:</td>
					              <td class='egov3'>".$rs->kode_rt."/".$rs->kode_rw."</td>
					              <td class='egov3'>Kode Pos </td>
					              <td class='egov3' align='center'>:</td>
					              <td class='egov3'>".strtoupper($rs->kode_pos)."</td>
					            </tr>
					            <tr>
					              <td class='egov3'>Kelurahan</td>
					              <td class='egov3' align='center'>:</td>
					              <td class='egov3'>".strtoupper($desa)."</td>
					              <td class='egov3'>Provinsi</td>
					              <td class='egov3' align='center'>:</td>
					              <td class='egov3'>".strtoupper($rs->prov)."</td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td height='176' colspan='3' valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					          <tr align='center'>
					            <td class='egov4' width='2%'>No</td>
					            <td class='egov4' width='22%'>Nama Lengkap</td>
					            <td class='egov4' width='14%'>NIK/NIKS</td>
					            <td class='egov4' width='3%'>L/P</td>
					            <td class='egov4' width='11%'>Tempat Lahir</td>
					            <td class='egov4' width='10%'>Tanggal Lahir </td>
					            <td class='egov4' width='9%'>Agama</td>
					            <td class='egov4' width='15%'>Pendidikan</td>
					            <td class='egov4' width='14%'>Pekerjaan</td>
					          </tr>
					          <tr align='center'>
					            <td class='egov4'>1</td>
					            <td class='egov4'>2</td>
					            <td class='egov4'>3</td>
					            <td class='egov4'>4</td>
					            <td class='egov4'>5</td>
					            <td class='egov4'>6</td>
					            <td class='egov4'>7</td>
					            <td class='egov4'>8</td>
					            <td class='egov4'>9</td>
					          </tr>
					          <tr valign='top'>
					            <td height='137'><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					$l=1;
					while ($urut = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
								<td class='egov5' align='center'>".$l."</td>
							  </tr>";
						$l++;
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($nama = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($nama->nmkk)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($nik = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($nik->nik)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->gender)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->tmptlhr)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->tgllhr)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->agama)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->pddk)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->krj)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td height='176' colspan='3' valign='top'><table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					          <tr align='center'>
					            <td class='egov4' width='2%'>No</td>
					            <td class='egov4' width='10%'>Status Kawin</td>
					            <td class='egov4' width='14%'>Status Hubungan Dalam Keluarga</td>
					            <td class='egov4' width='8%'>WNI/WNA</td>
					            <td class='egov4' width='14%'>No. Paspor </td>
					            <td class='egov4' width='14%'>No. KITAS/KITAP </td>
					            <td class='egov4' width='19%'>Nama Ayah </td>
					            <td class='egov4' width='19%'>Nama Ibu </td>
					            </tr>
					          <tr align='center'>
					            <td class='egov4'>&nbsp;</td>
					            <td class='egov4'>10</td>
					            <td class='egov4'>11</td>
					            <td class='egov4'>12</td>
					            <td class='egov4'>13</td>
					            <td class='egov4'>14</td>
					            <td class='egov4'>15</td>
					            <td class='egov4'>16</td>
					            </tr>
					          <tr valign='top'>
					            <td height='124'><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					$l=1;
					while ($urut = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
								<td class='egov5' align='center'>".$l."</td>
							  </tr>";
						$l++;
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->status)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->hubkel)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->kode_wn)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->no_paspor)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->no_kitas)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->ayah)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>";
					$data=$dbLib->execute($sql);
					while ($sex = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					                <td class='egov5'>".strtoupper($sex->ibu)."</td>
					              </tr>";
					}
						$html.= "</table></td>
					            </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td height='16' class='egov6'><em>Setiap Perubahan Biodata Kartu Keluarga Wajib Diganti</em></td>
					        <td width='251' rowspan='2' valign='top'><table width='89%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td class='egov6' height='27'>Kepala Keluarga,</td>
					          </tr>
					          <tr>
					            <td height='52'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td class='egov6'>".strtoupper($rs->nmkk)."</td>
					          </tr>
					        </table></td>
					        <td width='177' rowspan='2'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td class='egov6'>".$kec.", ".date("j/m/Y")."</td>
					          </tr>
					          <tr>
					            <td class='egov6'>Camat</td>
					          </tr>
					          <tr>
					            <td height='42'>&nbsp;</td>
					          </tr>
					          <tr>
					            <td class='egov7'><u>DRA. LUSI SUSILAYANI</u></td>
					          </tr>
					          <tr>
					            <td class='egov6'>NIP : 010181354</td>
					          </tr>
					        </table></td>
					      </tr>
					      <tr>
					        <td width='372' height='81' valign='top'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					          <tr>
					            <td class='egov6' width='16%'>Lembar</td>
					            <td class='egov6' width='3%'>:</td>
					            <td class='egov6' width='5%'>I</td>
					            <td class='egov6' width='76%'>Kepala Keluarga </td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='egov6'>II</td>
					            <td class='egov6'>RT</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='egov6'>III</td>
					            <td class='egov6'>Kelurahan</td>
					          </tr>
					          <tr>
					            <td>&nbsp;</td>
					            <td>&nbsp;</td>
					            <td class='egov6'>IV</td>
					            <td class='egov6'>Kecamatan</td>
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
