<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kb_rptSpb2
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
			$sql = "select a.no_spb,a.no_dokumen,a.keterangan as ket1,date_format(a.tanggal,'%d/%m/%Y') as tgl,a.nilai as tot,
				b.kode_akun,c.nama as nmakun,b.keterangan as ket2,b.nilai,a.nik_setuju,upper(e.nama) as nmstju,b.dc,
				e.jabatan as jab1,a.nik_buat,upper(d.nama) as nmbuat,d.jabatan as jab2,a.kode_pp,f.nama as nmpp,b.kode_pp as pp,
				ifnull(g.nilai,0) as sisa,ifnull(h.nilai,0) as anggthn,ifnull(i.nilai,0) as anggbln
				from spb_m a inner join spb_j b on a.no_spb=b.no_spb and a.kode_lokasi=b.kode_lokasi
				inner join masakun c on b.kode_akun=c.kode_akun and b.kode_lokasi=c.kode_lokasi
				inner join karyawan d on a.nik_buat=d.nik and a.kode_lokasi=d.kode_lokasi
				inner join karyawan e on a.nik_setuju=e.nik and a.kode_lokasi=e.kode_lokasi
				left join pp f on a.kode_pp=f.kode_pp and a.kode_lokasi=f.kode_lokasi 
				left join angg_r g on b.kode_akun=g.kode_akun and b.no_spb=g.no_bukti and b.kode_lokasi=g.kode_lokasi
				left join (select date_format(tanggal,'%Y') as thn,kode_pp,kode_akun,sum(nilai) as nilai,kode_lokasi
					from angg_d group by date_format(tanggal,'%Y'),kode_pp,kode_akun order by date_format(tanggal,'%Y'),kode_pp,kode_akun
					) h on a.kode_pp=h.kode_pp and b.kode_akun=h.kode_akun and b.kode_lokasi=h.kode_lokasi and date_format(a.tanggal,'%Y')=h.thn
				left join (select periode,kode_pp,kode_akun,sum(nilai) as nilai,kode_lokasi
					from angg_d group by periode,kode_pp,kode_akun order by periode,kode_pp,kode_akun
					) i on a.kode_pp=i.kode_pp and b.kode_akun=i.kode_akun and b.kode_lokasi=i.kode_lokasi and a.periode=i.periode ".$this->filter.
				" and a.no_spb='".$page->fields[0]."' order by a.no_spb,b.dc desc ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html="<br />";
			$html.=	"<table width='750' border='0' align='center' cellpadding='0' cellspacing='0'>
					  <tr>
					    <td class='istyle12' align='center' style='padding-bottom:4px;'>LAMPIRAN SPP</td>
					  </tr>
					  <tr>
					    <td><table width='100%' border='1' cellspacing='0' cellpadding='0' class='kotak'>
					      <tr>
					        <td height='149'><table width='100%' border='0' cellspacing='0' cellpadding='3'>
					          <tr>
					            <td class='istyle14' width='17%'>No. Bukti </td>
					            <td class='istyle14' width='2%'>:</td>
					            <td class='istyle14' width='50%'>".$rs->no_spb."</td>
					            <td class='istyle14' width='12%'>No. SPB </td>
					            <td class='istyle14' width='2%'>:</td>
					            <td class='istyle14' width='17%'>".$rs->no_spb."</td>
					          </tr>
					          <tr>
					            <td class='istyle14'>Nama</td>
					            <td class='istyle14'>:</td>
					            <td class='istyle14'>".$rs->nik_buat." ".$rs->nmbuat."</td>
					            <td class='istyle14'>Nilai SPP </td>
					            <td class='istyle14'>:</td>
					            <td class='istyle14'>".number_format($rs->tot,2,",",".")."</td>
					          </tr>
					          <tr>
					            <td class='istyle14'>Unit</td>
					            <td class='istyle14'>:</td>
					            <td class='istyle14'>".$rs->kode_pp." ".$rs->nmpp."</td>
					            <td class='istyle14'>No. Dokumen </td>
					            <td class='istyle14'>:</td>
					            <td class='istyle14'>".$rs->no_dokumen."</td>
					          </tr>
					          <tr>
					            <td class='istyle14' valign='top'>Keterangan</td>
					            <td class='istyle14' valign='top'>:</td>
					            <td class='istyle14' valign='top'>".$rs->ket1."</td>
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
					$total=0;
					while ($dt = $data->FetchNextObject($toupper=false))
					{
						if ($dt->dc == "D") $total+=$dt->nilai;
						$html.="<tr>
					              <td valign='top' class='istyle14' align='center'>".$i."</td>
					              <td valign='top' class='istyle14'>".$dt->kode_akun."</td>
					              <td valign='top' class='istyle14'>".$dt->nmakun."</td>
					              <td valign='top' class='istyle14'>".$dt->ket2."</td>
								  <td valign='top' class='istyle14' align='right'>".number_format($dt->anggthn,2,",",".")."</td>
								  <td valign='top' class='istyle14' align='right'>".number_format($dt->anggbln,2,",",".")."</td>
					              <td valign='top' class='istyle14' align='right'>".number_format($dt->sisa,2,",",".")."</td>
								  <td valign='top' class='istyle14'>".$dt->pp."</td>
					              <td valign='top' class='istyle14'>".$dt->dc."</td>
					              <td valign='top' class='istyle14' align='right'>".number_format($dt->nilai,2,",",".")."</td>
					            </tr>";
						$i++;
					}
					    $html.="<tr bgcolor='#CCCCCC'>
					              <td class='istyle14' colspan='9' align='right'>Total : </td>
					              <td class='istyle14' align='right'>".number_format($total,2,",",".")."</td>
					            </tr>
					          </table></td>
					      </tr>
					    </table></td>
					  </tr>
					  <tr>
					    <td class='istyle14' style='padding-top:4px;'>&nbsp;&nbsp;&nbsp;&nbsp;Nilai SPP : ".$AddOnLib->terbilang($rs->tot)."</td>
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
					        <td class='istyle14'><u>".$rs->nmstju."</u></td>
					        <td class='istyle14'><u>".$rs->nmbuat."</u></td>
					      </tr>
					      <tr>
					        <td class='istyle14'>NIK : ".$rs->nik_setuju."</td>
					        <td class='istyle14'>NIK : ".$rs->nik_buat."</td>
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