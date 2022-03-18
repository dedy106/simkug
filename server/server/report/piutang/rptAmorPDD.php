<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptAmorPDD
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
		
		$sql =  "select count(*) ".
				"from mhs m inner join ar_amor a on m.npm=a.ref2 and m.kode_lokasi=a.kode_lokasi ".
				           "inner join armhs_d b on a.ref1=b.no_invoice and a.kode_lokasi=b.kode_lokasi ".
				           "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur ".
				           "inner join param_bpp p on b.kode_produk=p.kode_produk and m.kode_jur=p.kode_jur ".
				                                                                 "and b.kode_lokasi=p.kode_lokasi ".
				                                                                 "and c.kode_ang=p.kode_ang ".
				                                                                 "and b.semester=p.semester ".$this->filter;
		
		$rs = $dbLib->execute($sql);		
		//error_log($sql);
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
		$sql =  "select m.npm,m.nama_mhs,c.kode_ang,c.nama_ang,b.semester,m.kode_jur,a.ref1,p.jml_bulan,b.nilai,a.nilai as nlamor,b.nilai-a.nilai as saldo ".
				"from mhs m inner join ar_amor a on m.npm=a.ref2 and m.kode_lokasi=a.kode_lokasi ".
				           "inner join armhs_d b on a.ref1=b.no_invoice and a.kode_lokasi=b.kode_lokasi ".
				           "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur ".
				           "inner join param_bpp p on b.kode_produk=p.kode_produk and m.kode_jur=p.kode_jur ".
				                                                                 "and b.kode_lokasi=p.kode_lokasi ".
				                                                                 "and c.kode_ang=p.kode_ang ".
				                                                                 "and b.semester=p.semester ".$this->filter.
				" order by m.npm ";
				
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);

		//error_log($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("Laporan Amortisasi PDD",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>    
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>NPM</div></td>
				<td class='header_laporan'><div align='center'>Nama Mahasiswa</div></td>
				<td class='header_laporan'><div align='center'>Angkatan</div></td>
				<td class='header_laporan'><div align='center'>Semester</div></td>
				<td class='header_laporan'><div align='center'>Jurusan</div></td>
				<td class='header_laporan'><div align='center'>No Invoice/KTS</div></td>			
				<td class='header_laporan'><div align='center'>Bulan</div></td>
				<td class='header_laporan'><div align='center'>Nilai</div></td>
				<td class='header_laporan'><div align='center'>Nilai Amortisasi</div></td>
				<td class='header_laporan'><div align='center'>Saldo</div></td>
				</tr>";		
		$i = $start+1;		
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<tr>
					<td height='20' class='isi_laporan'>".$i."</td>
					 <td class='isi_laporan'>".$row->npm."</td>
					 <td class='isi_laporan'>".$row->nama_mhs."</td>
					 <td class='isi_laporan'>".$row->kode_ang." ".$row->nama_ang."</td>
					 <td class='isi_laporan'>".$row->semester."</td>			 
					 <td class='isi_laporan'>".$row->kode_jur."</td>
					 <td class='isi_laporan'>".$row->ref1."</td>
					 <td class='isi_laporan'>".$row->jml_bulan."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->nlamor,0,",",".")."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->saldo,0,",",".")."</td>
					</tr>";
			$i++;
		}
		$html.="</table>";
		$html .= "</div>";
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
