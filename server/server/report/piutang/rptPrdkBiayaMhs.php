<?php

uses("server_DBConnection_dbLib");
uses("server_pdf_Pdf");
uses("server_util_AddOnLib");
class server_report_piutang_rptPrdkBiayaMhs
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
		
		$sql = "select count(*) from produk p ".$this->filter;
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
		$sql = "select p.kode_produk,p.nama_produk,p.kode_akun,p.jenis,p.nilai,p.akun_piutang,p.akun_pdd,p.status_modul,p.beban_susut, ".
				".p.akun_deprs,p.kode_drk_pdpt,p.kode_drk_beban,p.kode_pp,p.akun_beban,p.kode_jur,p.akun_pph,p.akun_ppn,p.kode_lokasi ".
				"from produk p ".$this->filter.
				" order by p.kode_produk ";
		$start = (($this->page-1) * $this->rows);
		$rs=$dbLib->LimitQuery($sql,$this->rows,$start);	
		//error_log($sql);
		$i = $start+1;
		$AddOnLib=new server_util_AddOnLib();
		$html=$AddOnLib->judul_laporan("laporan Produk Biaya Mahasiswa",$this->lokasi,$AddOnLib->ubah_periode($periode));
		$html.="<div align='center'>";
		$html.="<table border='1' cellspacing='0' cellpadding='0' class='kotak'>
				<tr bgcolor='#CCCCCC'>
				<td class='header_laporan'><div align='center'>No</div></td>
				<td class='header_laporan'><div align='center'>Kode</div></td>
				<td class='header_laporan'><div align='center'>Nama</div></td>
				<td class='header_laporan'><div align='center'>Kode Akun</div></td>
				<td class='header_laporan'><div align='center'>Jenis</div></td>
				<td class='header_laporan'><div align='center'>Nilai</div></td>
				<td class='header_laporan'><div align='center'>Akun Piutang</div></td>
				<td class='header_laporan'><div align='center'>Akun pdd</div></td>
				<td class='header_laporan'><div align='center'>Status Modul</div></td>
				<td class='header_laporan'><div align='center'>Beban Penyusutan</div></td>
				<td class='header_laporan'><div align='center'>Akun Depresiasi</div></td>
				<td class='header_laporan'><div align='center'>Kode DRK Pendapatan</div></td>
				<td class='header_laporan'><div align='center'>Kode DRK Beban</div></td>
				<td class='header_laporan'><div align='center'>Kode PP</div></td>
				<td class='header_laporan'><div align='center'>Akun Beban</div></td>
				<td class='header_laporan'><div align='center'>Kode Jurusan</div></td>
				<td class='header_laporan'><div align='center'>Akun PPh</div></td>
				<td class='header_laporan'><div align='center'>Akun PPN</div></td>
				<td class='header_laporan'><div align='center'>Kode Lokasi</div></td>
				</tr>";
		while ($row = $rs->FetchNextObject($toupper=false))
		{
		    $html.="<tr>
				    <td height='20' class='isi_laporan'>".$i."</td>
					<td class='isi_laporan'>".$row->kode_produk."</td>
				    <td class='isi_laporan'>".$row->nama_produk."</td>
					<td class='isi_laporan'>".$row->kode_akun."</td>
					<td class='isi_laporan'>".$row->jenis."</td>
					<td class='isi_laporan'>".$row->nilai."</td>
					<td class='isi_laporan'>".$row->akun_piutang."</td>
					<td class='isi_laporan'>".$row->akun_pdd."</td>
					<td class='isi_laporan'>".$row->status_modul."</td>
					<td class='isi_laporan'>".$row->beban_susut."</td>
					<td class='isi_laporan'>".$row->akun_deprs."</td>
					<td class='isi_laporan'>".$row->kode_drk_pdpt."</td>
					<td class='isi_laporan'>".$row->kode_drk_beban."</td>
					<td class='isi_laporan'>".$row->kode_pp."</td>
					<td class='isi_laporan'>".$row->akun_beban."</td>
					<td class='isi_laporan'>".$row->kode_jur."</td>
					<td class='isi_laporan'>".$row->akun_pph."</td>
					<td class='isi_laporan'>".$row->akun_ppn."</td>
					<td class='isi_laporan'>".$row->kode_lokasi."</td>
				  </tr>";
			
			$i=$i+1;
		}
		$html.="</table>";
		$html.="</div>";
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
