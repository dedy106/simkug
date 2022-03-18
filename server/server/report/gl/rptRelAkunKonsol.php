<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_gl_rptRelAkunKonsol
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
		
		$sql = "select count(*) from konsol_relasi k ".$this->filter;
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
		global $dbLib;
		$sql = "select k.kode_lokkonsol,l2.nama as nmlokasikonsol,k.akun_konsol,m.nama as nmakunkonsol,k.kode_lokasi,l1.nama as nmlokasi, ".
				"k.kode_akun,m2.nama as nmakun,date_format(k.tgl_awal,'%d/%m/%Y') as tglawal,date_format(k.tgl_akhir,'%d/%m/%Y') as tglakhir ".
				"from konsol_relasi k inner join masakun m on k.akun_konsol=m.kode_akun ".
				                     "inner join masakun m2 on k.kode_akun=m2.kode_akun and k.kode_lokasi=m2.kode_lokasi ".
				                     "inner join lokasi l1 on k.kode_lokasi=l1.kode_lokasi ".
				                     "inner join lokasi l2 on k.kode_lokkonsol=l2.kode_lokasi ".$this->filter.
									 " order by k.kode_lokkonsol,k.akun_konsol ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		//error_log($sql);
		$i = 1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Relasi Akun Konsolidasi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td width='60' height='23' class='header_laporan'><div align='center'>Kode Konsolidasi</div></td>
				<td width='100' class='header_laporan'><div align='center'>Lokasi Konsolidasi</div></td>
				<td width='60' class='header_laporan'><div align='center'>Akun Konsolidasi</div></td>
				<td width='100' class='header_laporan'><div align='center'>Nama Akun</div></td>
				<td width='60' class='header_laporan'><div align='center'>Kode Lokasi</div></td>
				<td width='100' class='header_laporan'><div align='center'>Nama Lokasi</div></td>
				<td width='60' class='header_laporan'><div align='center'>Kode Akun</div></td>
				<td width='100' class='header_laporan'><div align='center'>Nama Akun</div></td>
				<td width='100' class='header_laporan'><div align='center'>Tanggal Awal</div></td>
				<td width='100' class='header_laporan'><div align='center'>Tanggal Akhir</div></td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
				    <td height='20' class='isi_laporan'>".$row->kode_lokkonsol."</td>
				    <td class='isi_laporan'>".$row->nmlokasikonsol."</td>
					<td class='isi_laporan'>".$row->akun_konsol."</td>
					<td class='isi_laporan'>".$row->nmakunkonsol."</td>
					<td class='isi_laporan'>".$row->kode_lokasi."</td>
					<td class='isi_laporan'>".$row->nmlokasi."</td>
					<td class='isi_laporan'>".$row->kode_akun."</td>
					<td class='isi_laporan'>".$row->nmakun."</td>
					<td class='isi_laporan'>".$row->tglawal."</td>
					<td class='isi_laporan'>".$row->tglakhir."</td>
				  </tr>";
			
			$i=$i+1;
		}
		$html.="</table>";
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
