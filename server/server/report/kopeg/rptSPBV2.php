<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_kopeg_rptSPBV2
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
			"from spb_m a ".$this->filter2." and a.modul='KP.SPB' and a.jenis='PBRG' and a.no_del='-' ";
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
              "from spb_m a ".$this->filter2." and a.modul='KP.SPB' and a.jenis='PBRG' and a.no_del='-' ";
		
		$start = (($this->page-1) * $this->rows);
		global $dbLib;
		$page=$dbLib->LimitQuery($sql0,$this->rows,$start);
		
		$filter=explode("/",$this->filter);
		while (!$page->EOF)
		{
			$sql = "select e.no_spb,concat(a.no_pbrg,'-',a.no_kontrak) as nobuk,concat(b.nama,'/',b.kode_agg) as nsbh,
				b.no_rek,concat(b.bank,'-',b.cabang) as cbg,b.nama_rek,a.nilai,a.nilai-(a.nilai_mat+a.nilai_adm+a.nilai_asur) as ntransfer
				from kop_pbrg_m a inner join kop_agg b on a.kode_agg=b.kode_agg and a.kode_lokasi=b.kode_lokasi and a.progress='1' and a.status_aktif='1'
				inner join kop_jual_d d on a.no_jual=d.no_jual and a.kode_lokasi=d.kode_lokasi
				inner join spb_m e on d.no_spb=e.no_spb and d.kode_lokasi=e.kode_lokasi and e.modul='KP.SPB' and e.jenis='PBRG' and e.no_del='-' ".$filter[0].
				" and e.no_spb='".$page->fields[0]."' order by a.no_pbrg ";
			$invc=$dbLib->execute($sql);
			$rs = $invc->FetchNextObject($toupper=false);
			//error_log($sql);
			$i = $start+1;
			$AddOnLib=new server_util_AddOnLib();
			$html=$AddOnLib->judul_laporan("LAMPIRAN DAFTAR PENGAJUAN KREDIT BARANG<br />NO. SPB : ".$rs->no_spb,$filter[1],$AddOnLib->ubah_periode($periode));
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