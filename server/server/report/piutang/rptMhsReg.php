<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptMhsReg
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
				"from mhs m inner join armhs_m a on m.npm=a.ref1 and m.kode_lokasi=a.kode_lokasi ".
				           "inner join armhs_d b on a.no_invoice=b.no_invoice and a.kode_lokasi=b.kode_lokasi and m.semester=b.semester ".
				           "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur ".
						   "inner join produk p on b.kode_produk=p.kode_produk and b.kode_lokasi=p.kode_lokasi ".$this->filter;
		
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
		$sql =  "select m.npm,m.nama_mhs,c.kode_ang,c.nama_ang,a.no_invoice,a.periode,date_format(a.tanggal,'%e/%m/%y') as tgl,p.nama_produk,a.nilai,a.disc,b.periode_awal ".
				"from mhs m inner join armhs_m a on m.npm=a.ref1 and m.kode_lokasi=a.kode_lokasi ".
				           "inner join armhs_d b on a.no_invoice=b.no_invoice and a.kode_lokasi=b.kode_lokasi and m.semester=b.semester ".
				           "inner join angkatan c on m.kode_ang=c.kode_ang and m.kode_lokasi=c.kode_lokasi and m.kode_jur=c.kode_jur ".
						   "inner join produk p on b.kode_produk=p.kode_produk and b.kode_lokasi=p.kode_lokasi ".$this->filter.
				" order by m.npm,a.no_invoice ";
				
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);

		error_log($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("Laporan Daftar Mahasiswa Registrasi",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>    
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>NPM</div></td>
				<td class='header_laporan'><div align='center'>Nama Mahasiswa</div></td>
				<td class='header_laporan'><div align='center'>Angkatan</div></td>
				<td class='header_laporan'><div align='center'>No Invoice</div></td>
				<td class='header_laporan'><div align='center'>Periode</div></td>
				<td class='header_laporan'><div align='center'>Tgl Invoice</div></td>			
				<td class='header_laporan'><div align='center'>Produk</div></td>
				<td class='header_laporan'><div align='center'>Nilai</div></td>
				<td class='header_laporan'><div align='center'>Diskon</div></td>
				<td class='header_laporan'><div align='center'>Periode Awal</div></td>
				</tr>";		
		$i = $start+1;	
		$npm="";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			if ($npm=="")
			{
					$html.="<tr>
							<td height='20' class='isi_laporan'>".$i."</td>
							 <td class='isi_laporan'>".$row->npm."</td>
							 <td class='isi_laporan'>".$row->nama_mhs."</td>
							 <td class='isi_laporan'>".$row->kode_ang." ".$row->nama_ang."</td>
							 <td class='isi_laporan'>".$row->no_invoice."</td>			 
							 <td class='isi_laporan'>".$row->periode."</td>
							 <td class='isi_laporan'>".$row->tgl."</td>
							 <td class='isi_laporan'>".$row->nama_produk."</td>
							 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
							 <td class='isi_laporan' align='right'>".number_format($row->disc,0,",",".")."</td>
							 <td class='isi_laporan'>".$row->periode_awal."</td>
							</tr>";		
					$npm=$row->npm;		
					$i++;
			}else
			{
				if ($row->npm==$npm)
				{
					$html.="<tr>
							<td height='20' class='isi_laporan'>".$i."</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>&nbsp;</td>
							 <td class='isi_laporan'>".$row->kode_ang." ".$row->nama_ang."</td>
							 <td class='isi_laporan'>".$row->no_invoice."</td>			 
							 <td class='isi_laporan'>".$row->periode."</td>
							 <td class='isi_laporan'>".$row->tgl."</td>
							 <td class='isi_laporan'>".$row->nama_produk."</td>
							 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
							 <td class='isi_laporan' align='right'>".number_format($row->disc,0,",",".")."</td>
							 <td class='isi_laporan'>".$row->periode_awal."</td>
							</tr>";		
					$npm=$row->npm;		
					$i++;
				}else
				{
					$html.="<tr>
							<td height='20' class='isi_laporan'>".$i."</td>
							 <td class='isi_laporan'>".$row->npm."</td>
							 <td class='isi_laporan'>".$row->nama_mhs."</td>
							 <td class='isi_laporan'>".$row->kode_ang." ".$row->nama_ang."</td>
							 <td class='isi_laporan'>".$row->no_invoice."</td>			 
							 <td class='isi_laporan'>".$row->periode."</td>
							 <td class='isi_laporan'>".$row->tgl."</td>
							 <td class='isi_laporan'>".$row->nama_produk."</td>
							 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
							 <td class='isi_laporan' align='right'>".number_format($row->disc,0,",",".")."</td>
							 <td class='isi_laporan'>".$row->periode_awal."</td>
							</tr>";		
					$npm=$row->npm;		
					$i++;
				}
			}
		}
		
		$html.="</table>";
		$html .= '</div>';
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
