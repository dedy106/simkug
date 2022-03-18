<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptPembayaran
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
				"from arbyrmhs_m a inner join arbyrmhs_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi ".
								  "left outer join ar_cd c on a.no_bukti=c.no_buktikas and a.kode_lokasi=c.kode_lokasi ".$this->filter;
		
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
		$sql =  "select a.no_bukti,date_format(a.tanggal,'%e/%m/%Y') as tgl,a.keterangan,a.nilai as nlbyr,a.periode,a.thn_ajar,l.nama as nmlokasi,a.jenis,".
				"a.ref1,m.nama_mhs,a.ref2,a.disc as discbyr,p.nama_produk,b.akun_piutang,b.akun_lawan,case when substring(b.akun_piutang,1,1) = '1' then 1 else -1 end * b.nilai as nlpake,b.disc as discpake,c.nilai as nldeposit,p2.nama as nmpp ".
				"from arbyrmhs_m a inner join arbyrmhs_d b on a.no_bukti=b.no_bukti and a.kode_lokasi=b.kode_lokasi ".				                  
				                  "inner join lokasi l on a.kode_lokasi=l.kode_lokasi ".
				                  "inner join mhs m on a.ref1=m.npm and a.kode_lokasi=m.kode_lokasi ".
				                  "inner join produk p on b.kode_produk=p.kode_produk and p.kode_lokasi = a.kode_lokasi ".
								  "left outer join pp p2 on p.kode_pp=p2.kode_pp and p.kode_lokasi=p2.kode_lokasi ".
								  "left outer join ar_cd c on a.no_bukti=c.no_buktikas and a.kode_lokasi=c.kode_lokasi ".
								  $this->filter.
				" order by a.no_bukti ";
				
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);

		error_log($sql);
		
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("Laporan Pembayaran",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html .= "<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td class='header_laporan'><div align='center'>No</div></td>    
				<td class='header_laporan'><div align='center'>No Bukti</div></td>
				<td class='header_laporan'><div align='center'>Tanggal</div></td>
				<td class='header_laporan'><div align='center'>NPM</div></td>
				<td class='header_laporan'><div align='center'>Nama Mahasiswa</div></td>
				<td class='header_laporan'><div align='center'>Periode</div></td>
				<td class='header_laporan'><div align='center'>Tahun Ajar</div></td>
				<td class='header_laporan'><div align='center'>No Invoice</div></td>
				<td class='header_laporan'><div align='center'>Nilai Bayar</div></td>
				<td class='header_laporan'><div align='center'>Diskon</div></td>
				<td class='header_laporan'><div align='center'>Nilai Pakai</div></td>
				<td class='header_laporan'><div align='center'>Diskon</div></td>
				<td class='header_laporan'><div align='center'>Nilai Deposit</div></td>
				<td class='header_laporan'><div align='center'>Lokasi</div></td>
				<td class='header_laporan'><div align='center'>Jenis</div></td>
				<td class='header_laporan'><div align='center'>Produk</div></td>
				<td class='header_laporan'><div align='center'>Akun Piutang</div></td>
				<td class='header_laporan'><div align='center'>Akun Lawan</div></td>
				<td class='header_laporan'><div align='center'>PP</div></td>
				</tr>";		
		$i = $start+1;
		while ($row = $rs->FetchNextObject($toupper=false))
		{
			$html.="<tr>
					 <td height='20' class='isi_laporan'>".$i."</td>
					 <td class='isi_laporan'>".$row->no_bukti."</td>
					 <td class='isi_laporan'>".$row->tgl."</td>
					 <td class='isi_laporan'>".$row->ref1."</td>
					 <td class='isi_laporan'>".$row->nama_mhs."</td>			 
					 <td class='isi_laporan'>".$row->periode."</td>
					 <td class='isi_laporan'>".$row->thn_ajar."</td>
					 <td class='isi_laporan'>".$row->ref2."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->nlbyr,0,",",".")."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->discbyr,0,",",".")."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->nlpake,0,",",".")."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->discpake,0,",",".")."</td>
					 <td class='isi_laporan' align='right'>".number_format($row->nldeposit,0,",",".")."</td>
					 <td class='isi_laporan'>".$row->nmlokasi."</td>
					 <td class='isi_laporan'>".$row->jenis."</td>
					 <td class='isi_laporan'>".$row->nama_produk."</td>
					 <td class='isi_laporan'>".$row->akun_piutang."</td>
					 <td class='isi_laporan'>".$row->akun_lawan."</td>
					 <td class='isi_laporan'>".$row->nmpp."</td>
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
