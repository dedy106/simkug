<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptIfAju2
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
		
		$sql = "select count(distinct a.no_if) from if_m a ".$this->filter;
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
		$sql0="select distinct a.no_if from if_m a ".$this->filter;
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		while (!$page->EOF)
		{
			$sql = "select a.no_if,a.nilai,a.keterangan,a.no_dokumen,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.nik_pengaju,upper(d.nama) as nmaju,
				d.jabatan as jab1,a.nik_setuju,upper(e.nama) as nmstju,e.jabatan as jab2,a.kode_pp,upper(f.nama) as nmpp,a.akun_if,c.nama as nmakun,
				ifnull(g.nilai,0) as sisa,ifnull(h.nilai,0) as anggthn,ifnull(i.nilai,0) as anggbln
				from if_m a inner join masakun c on a.akun_if=c.kode_akun and a.kode_lokasi=c.kode_lokasi
				inner join karyawan d on a.nik_pengaju=d.nik and a.kode_lokasi=d.kode_lokasi
				inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi
				inner join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi 
				left join angg_r g on c.kode_akun=g.kode_akun and a.no_if=g.no_bukti and c.kode_lokasi=g.kode_lokasi
				left join (select date_format(tanggal,'%Y') as thn,kode_pp,kode_akun,sum(nilai) as nilai,kode_lokasi
					from angg_d group by date_format(tanggal,'%Y'),kode_pp,kode_akun order by date_format(tanggal,'%Y'),kode_pp,kode_akun
					) h on a.kode_pp=h.kode_pp and c.kode_akun=h.kode_akun and c.kode_lokasi=h.kode_lokasi and date_format(a.tanggal,'%Y')=h.thn
				left join (select periode,kode_pp,kode_akun,sum(nilai) as nilai,kode_lokasi
					from angg_d group by periode,kode_pp,kode_akun order by periode,kode_pp,kode_akun
					) i on a.kode_pp=i.kode_pp and c.kode_akun=i.kode_akun and c.kode_lokasi=i.kode_lokasi and a.periode=i.periode ".$this->filter.
				" and a.no_if='".$page->fields[0]."' order by a.no_if,a.akun_if ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html="<br />";
			$html.=	"<table width='750' border='0' align='center' cellpadding='0' cellspacing='0'>
					  <tr>
					    <td class='istyle12' align='center' style='padding-bottom:4px;'>LAMPIRAN PENGAJUAN IMPREST FUND</td>
					  </tr>
					  <tr>
					    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
					      <tr>
					        <td height='149'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					          <tr>
					            <td class='istyle14' width='17%'>No. Bukti </td>
					            <td class='istyle14' width='2%'>:</td>
					            <td class='istyle14' width='50%'>".$rs->no_if."</td>
					            <td class='istyle14' width='12%'>No. SPB </td>
					            <td class='istyle14' width='2%'>:</td>
					            <td class='istyle14' width='17%'>".$rs->no_if."</td>
					          </tr>
					          <tr>
					            <td class='istyle14'>Nama</td>
					            <td class='istyle14'>:</td>
					            <td class='istyle14'>".$rs->nik_pengaju." ".$rs->nmaju."</td>
					            <td class='istyle14'>Nilai I/F</td>
					            <td class='istyle14'>:</td>
					            <td class='istyle14'>".number_format($rs->nilai,2,",",".")."</td>
					          </tr>
					          <tr>
					            <td class='istyle14' valign='top'>Unit</td>
					            <td class='istyle14' valign='top'>:</td>
					            <td class='istyle14' valign='top'>".$rs->kode_pp." ".$rs->nmpp."</td>
					            <td class='istyle14' valign='top'>No. Dokumen </td>
					            <td class='istyle14' valign='top'>:</td>
					            <td class='istyle14' valign='top'>".$rs->no_dokumen."</td>
					          </tr>
					          <tr>
					            <td class='istyle14' valign='top'>Keterangan</td>
					            <td class='istyle14' valign='top'>:</td>
					            <td class='istyle14' valign='top'>".$rs->keterangan."</td>
					            <td class='istyle14' valign='top'>Tanggal</td>
					            <td class='istyle14' valign='top'>:</td>
					            <td class='istyle14' valign='top'>".$rs->tgl."</td>
					          </tr>
					        </table>
					          <table width='100%' border='1' cellspacing='0' cellpadding='2' class='kotak'>
					            <tr align='center' bgcolor='#999999'>
					              <td class='istyle12' width='3%'>No.</td>
					              <td class='istyle12' width='8%'>Kode Akun</td>
					              <td class='istyle12' width='18%'>Nama Akun </td>
					              <td class='istyle12' width='16%'>Uraian</td>
								  <td class='istyle12' width='11%'>Angg. Thn Ini</td>
								  <td class='istyle12' width='11%'>Angg. Bln Ini</td>
								  <td class='istyle12' width='11%'>Sisa Angg.</td>
								  <td class='istyle12' width='8%'>Kode PP</td>
					              <td class='istyle12' width='3%'>DC</td>
					              <td class='istyle12' width='11%'>Nilai</td>
					            </tr>";
					$data=$dbLib->execute($sql);
					$i=1;
					while ($dt = $data->FetchNextObject($toupper=false))
					{
						$html.="<tr>
					              <td valign='top' class='istyle14' align='center'>".$i."</td>
					              <td valign='top' class='istyle14'>".$dt->akun_if."</td>
					              <td valign='top' class='istyle14'>".$dt->nmakun."</td>
					              <td valign='top' class='istyle14'>".$dt->keterangan."</td>
								  <td valign='top' class='istyle14' align='right'>".number_format($dt->anggthn,2,",",".")."</td>
								  <td valign='top' class='istyle14' align='right'>".number_format($dt->anggbln,2,",",".")."</td>
					              <td valign='top' class='istyle14' align='right'>".number_format($dt->sisa,2,",",".")."</td>
								  <td valign='top' class='istyle14'>".$dt->kode_pp."</td>
					              <td valign='top' class='istyle14'>D</td>
					              <td valign='top' class='istyle14' align='right'>".number_format($dt->nilai,2,",",".")."</td>
					            </tr>";
						$i++;
					}
					    $html.="<tr bgcolor='#CCCCCC'>
					              <td class='istyle14' colspan='9' align='right'>Total : </td>
					              <td class='istyle14' align='right'>".number_format($rs->nilai,2,",",".")."</td>
					            </tr>
					          </table></td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td class='istyle14' style='padding-top:4px;'>&nbsp;&nbsp;&nbsp;&nbsp;Nilai Imprest Fund : ".$AddOnLib->terbilang($rs->nilai)."</td>
					  </tr>
					  <tr>
					    <td>&nbsp;</td>
					  </tr>
					  <tr>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					      <tr>
					        <td class='istyle14' width='76%'>Mengetahui,</td>
					        <td class='istyle14' width='24%'>Bandung, ".$rs->tgl."</td>
					      </tr>
					      <tr>
					        <td class='istyle14'>".$rs->jab1."</td>
					        <td class='istyle14'>".$rs->jab2."</td>
					      </tr>
					      <tr>
					        <td height='67'>&nbsp;</td>
					        <td>&nbsp;</td>
					      </tr>
					      <tr>
					        <td class='istyle14'><u>".$rs->nmaju."</u></td>
					        <td class='istyle14'><u>".$rs->nmstju."</u></td>
					      </tr>
					      <tr>
					        <td class='istyle14'>NIK : ".$rs->nik_pengaju."</td>
					        <td class='istyle14'>NIK : ".$rs->nik_setuju."</td>
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