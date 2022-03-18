<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptKTS
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
				"from armhs_m a inner join armhs_d b on a.no_invoice=b.no_invoice and a.kode_lokasi=b.kode_lokasi ".
				               "inner join produk p on b.kode_produk=p.kode_produk and p.kode_lokasi = a.kode_lokasi ".
				               "inner join lokasi l on a.kode_lokasi=l.kode_lokasi ".
							   "inner join mhs m on a.ref1=m.npm and a.kode_lokasi=m.kode_lokasi ".   
							   "left outer join (select e.kode_lokasi, e.ref2, f.kode_produk, ".
							"   sum(case when substring(f.akun_piutang,1,1) = '1' or substring(f.akun_piutang,1,1) = '-' then 1 else 1 end * ifnull(f.nilai,0) + ifnull(f.disc,0)) as nilai_bayar ".
							"   from arbyrmhs_m e ".
							" 	inner join arbyrmhs_d f on f.kode_lokasi = e.kode_lokasi and f.no_bukti = e.no_bukti and f.nilai <> 0 ".
							"   group by e.kode_lokasi, e.ref2, f.kode_produk) f on f.kode_lokasi = b.kode_lokasi and f.kode_produk = b.kode_produk and f.ref2 = b.no_invoice ".
							   $this->filter;
		
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
		$sql =  "select a.no_invoice,date_format(a.tanggal,'%e/%m/%y') as tgl,a.keterangan,a.ref1,m.nama_mhs,b.jumlah,b.nilai,(b.jumlah * b.nilai) as subtotal, ".
				"a.periode,a.thn_ajar,l.nama as nmlokasi,p.nama_produk as nmprdk,b.semester,b.akun_piutang,b.akun_pdpt, ".
				"b.akun_pdd,b.periode_awal,b.periode_akhir, ifnull(f.nilai_bayar,0) as nilai_bayar ".
				"from armhs_m a inner join armhs_d b on a.no_invoice=b.no_invoice and a.kode_lokasi=b.kode_lokasi ".
				               "inner join produk p on b.kode_produk=p.kode_produk and p.kode_lokasi = a.kode_lokasi ".
				               "inner join lokasi l on a.kode_lokasi=l.kode_lokasi ".
							   "inner join mhs m on a.ref1=m.npm and a.kode_lokasi=m.kode_lokasi ".
							   "left outer join (select e.kode_lokasi, e.ref2, f.kode_produk, ".
							"   sum(case when substring(f.akun_piutang,1,1) = '1' or substring(f.akun_piutang,1,1) = '-' then 1 else 1 end * ifnull(f.nilai,0) + ifnull(f.disc,0)) as nilai_bayar ".
							"   from arbyrmhs_m e ".
							" 	inner join arbyrmhs_d f on f.kode_lokasi = e.kode_lokasi and f.no_bukti = e.no_bukti and f.nilai <> 0 ".
							"   group by e.kode_lokasi, e.ref2, f.kode_produk) f on f.kode_lokasi = b.kode_lokasi and f.kode_produk = b.kode_produk and f.ref2 = b.no_invoice ".
				$this->filter.
				" order by a.no_invoice ";
		
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan KTS",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>    
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>No Invoice</div></td>
				<td class='header_laporan'><div align='center'>Tanggal</div></td>
				<td class='header_laporan'><div align='center'>NPM</div></td>
				<td class='header_laporan'><div align='center'>Nama Mahasiswa</div></td>
				<td class='header_laporan'><div align='center'>Jumlah</div></td>
				<td class='header_laporan'><div align='center'>Nilai</div></td>
				<td class='header_laporan'><div align='center'>Sub Total</div></td>
				<td class='header_laporan'><div align='center'>Periode</div></td>
				<td class='header_laporan'><div align='center'>Thn Ajar</div></td>
				<td class='header_laporan'><div align='center'>Lokasi</div></td>
				<td class='header_laporan'><div align='center'>Produk</div></td>
				<td class='header_laporan'><div align='center'>Semester</div></td>
				<td class='header_laporan'><div align='center'>Akun Piutang</div></td>
				<td class='header_laporan'><div align='center'>Akun Pendapatan</div></td>
				<td class='header_laporan'><div align='center'>Akun PDD</div></td>
				<td class='header_laporan'><div align='center'>Periode Awal</div></td>
				<td class='header_laporan'><div align='center'>Periode Akhir</div></td>				
				<td class='header_laporan'><div align='center'>Nilai Pembayaran</div></td>				
				</tr>";		
		$i = $start+1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<tr>
					 <td height='20' class='isi_laporan'>".$i."</td>
					 <td class='isi_laporan'>".$row->no_invoice."</td>
					 <td class='isi_laporan'>".$row->tgl."</td>
					 <td class='isi_laporan'>".$row->ref1."</td>
					 <td class='isi_laporan'>".$row->nama_mhs."</td>
					 <td class='isi_laporan'>".$row->jumlah."</td>					 
					 <td class='isi_laporan' align='right'>".number_format($row->nilai,0,",",".")."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->subtotal,0,",",".")."</td>
					 <td class='isi_laporan'>".$row->periode."</td>
					 <td class='isi_laporan'>".$row->thn_ajar."</td>
					 <td class='isi_laporan'>".$row->nmlokasi."</td>
					 <td class='isi_laporan'>".$row->nmprdk."</td>
					 <td class='isi_laporan'>".$row->semester."</td>
					 <td class='isi_laporan'>".$row->akun_piutang."</td>
					 <td class='isi_laporan'>".$row->akun_pdpt."</td>
					 <td class='isi_laporan'>".$row->akun_pdd."</td>
					 <td class='isi_laporan'>".$row->periode_awal."</td>
					 <td class='isi_laporan'>".$row->periode_akhir."</td>		
					 <td class='isi_laporan' align='right'>".number_format($row->nilai_bayar,0,",",".")."</td>
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
