<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptSPBPinj2
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
		$sql = "select count(distinct a.no_spb) ".
			"from spb_m a ".$this->filter2." and a.modul='KP.SPB' and a.jenis='PINJ' and a.no_del='-' ";
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
		$sql0="select distinct a.no_spb ".
              "from spb_m a ".$this->filter2." and a.modul='KP.SPB' and a.jenis='PINJ' and a.no_del='-' ";
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		$filter=explode("/",$this->filter);
		while (!$page->EOF)
		{
			$sql = "select e.no_spb,concat(a.no_pinj,'-',a.no_kontrak) as nobuk,concat(b.nama,'/',b.kode_agg) as nsbh,
				b.no_rek,concat(b.bank,'-',b.cabang) as cbg,b.nama_rek,
				a.nilai,a.nilai-(a.nilai_mat+a.nilai_prov+a.nilai_asur+d.ntitip+ifnull(c.nilai,0)) as ntransfer
				from kop_pinj_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi and a.progress='1' and a.status_aktif='1'
				left outer join (select z.kode_lokasi,z.kode_agg,sum(distinct x.nilai) as nilai 
					  from kop_pinjangs_m x inner join kop_pinjangs_d y on x.no_angs=y.no_angs and x.kode_lokasi=y.kode_lokasi 
											inner join kop_pinj_m z on y.no_kontrak=z.no_kontrak and y.no_pinj=z.no_pinj and y.kode_lokasi=z.kode_lokasi 
											inner join kop_pinj_komp zz on zz.no_pinjkomp=z.no_pinj and zz.no_kontkomp=z.no_kontrak and zz.kode_lokasi=z.kode_lokasi 
					  where z.status_aktif='L' and x.jenis='PINJKOMP' and x.no_del='-' and zz.no_spb='".$page->fields[0]."' 
					  group by z.kode_lokasi, z.kode_agg  ) c on c.kode_agg=a.kode_agg and c.kode_lokasi=a.kode_lokasi
				inner join kop_pinj_spb d on a.no_pinj=d.no_pinj and a.no_kontrak=d.no_kontrak and a.kode_lokasi=d.kode_lokasi
				inner join spb_m e on d.no_spb=e.no_spb and d.kode_lokasi=e.kode_lokasi and e.modul='KP.SPB' and e.jenis='PINJ' and e.no_del='-' ".$filter[0].
				" and e.no_spb='".$page->fields[0]."' order by a.no_pinj ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html=$AddOnLib->judul_laporan("LAMPIRAN DAFTAR PENGAJUAN PINJAMAN<br />NO. SPB : ".$rs->no_spb,$filter[1],$AddOnLib->ubah_periode($periode));
			$html.=	"<table width='810' border='1' align='center' cellpadding='1' cellspacing='0' class='kotak'>
					  <tr align='center' bgcolor='#CCCCCC'>
					    <td class='istyle18'>No.</td>
						<td class='istyle18'>No. Bukti</td>
					    <td class='istyle18'>Nama Nasabah</td>
					    <td class='istyle18'>No. Rekening</td>
					    <td class='istyle18'>Nama Bank</td>
					    <td class='istyle18'>Nama Rekening</td>
					    <td class='istyle18'>Nilai Pengajuan</td>
					    <td class='istyle18'>Nilai Transfer</td>
					  </tr>";
			$data=$dbLib->execute($sql);
			$tot1=$tot2=0;
			$l=1;
			while ($dt = $data->FetchNextObject($toupper=false))
			{
				$html.="<tr valign='top'>
					    <td class='istyle15' align='center'>".$l.".</td>
						<td class='istyle15'>".$dt->nobuk."</td>
					    <td class='istyle15'>".$dt->nsbh."</td>
					    <td class='istyle15'>".$dt->no_rek."</td>
					    <td class='istyle15'>".$dt->cbg."</td>
					    <td class='istyle15'>".$dt->nama_rek."</td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>Rp.</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->nilai,0,",",".")."</td>
						      </tr>
						    </table></td>
					    <td><table width='100%' border='0' cellspacing='0' cellpadding='0'>
						      <tr>
						        <td width='15%' class='istyle15'>Rp.</td>
						        <td width='85%' class='istyle15' align='right'>".number_format($dt->ntransfer,0,",",".")."</td>
						      </tr>
						    </table></td>
					  </tr>";
				$tot1+=$dt->nilai;
				$tot2+=$dt->ntransfer;
				$l++;
			}
			$html.="<tr bgcolor='#F5F5F5'>
					<td colspan='6' class='istyle18' align='right'>Total : </td>
					<td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
						<td width='15%' class='istyle15'>Rp.</td>
						<td width='85%' class='istyle15' align='right'>".number_format($tot1,0,",",".")."</td>
					  </tr>
					</table></td>
					<td class='istyle15'><table width='100%' border='0' cellspacing='0' cellpadding='0'>
					  <tr>
						<td width='15%' class='istyle15'>Rp.</td>
						<td width='85%' class='istyle15' align='right'>".number_format($tot2,0,",",".")."</td>
					  </tr>
					</table></td>
				  </tr></table>";
			$html.="<br />";
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
