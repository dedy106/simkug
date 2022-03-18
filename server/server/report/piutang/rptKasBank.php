<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptKasBank
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
				"from arkb_m a inner join arkb_d b on a.no_buktikas=b.no_buktikas ".$this->filter;
		
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
		$sql =  "select a.no_buktikas,date_format(a.tanggal,'%e/%m/%y') as tgl,a.keterangan,a.akun_kasbank,a.nilai_kasbank,a.periode,a.modul,a.jenis,l.nama as nmlokasi,b.no_bukti ".
				"from arkb_m a inner join arkb_d b on a.no_buktikas=b.no_buktikas ".
				              "inner join lokasi l on a.kode_lokasi=l.kode_lokasi ".$this->filter.
				" order by a.no_buktikas ";
				
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);

		//error_log($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("Laporan Pembayaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>    
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>No Bukti</div></td>
				<td class='header_laporan'><div align='center'>Tanggal</div></td>
				<td class='header_laporan'><div align='center'>Keterangan</div></td>				
				<td class='header_laporan'><div align='center'>Akun Kas/Bank</div></td>
				<td class='header_laporan'><div align='center'>Periode</div></td>
				<td class='header_laporan'><div align='center'>Nilai Kas/Bank</div></td>
				<td class='header_laporan'><div align='center'>Lokasi</div></td>
				<td class='header_laporan'><div align='center'>No Bukti Bayar</div></td>
				<td class='header_laporan'><div align='center'>Modul</div></td>
				<td class='header_laporan'><div align='center'>Jenis</div></td>
				</tr>";		
		$i = $start+1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<tr>
					 <td height='20' class='isi_laporan'>".$i."</td>
					 <td class='isi_laporan'>".$row->no_buktikas."</td>
					 <td class='isi_laporan'>".$row->tgl."</td>
					 <td class='isi_laporan'>".$row->keterangan."</td>
					 <td class='isi_laporan'>".$row->akun_kasbank."</td>		 
					 <td class='isi_laporan'>".$row->periode."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->nilai_kasbank,0,",",".")."</td>
					 <td class='isi_laporan'>".$row->nmlokasi."</td>
					 <td class='isi_laporan'>".$row->no_bukti."</td>
					 <td class='isi_laporan'>".$row->modul."</td>
					 <td class='isi_laporan'>".$row->jenis."</td>
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
